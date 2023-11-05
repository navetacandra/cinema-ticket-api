const jwt = require("../utils/jwt");
const { query: sqlQuery } = require("../utils/mysql");
const { tokenize } = require("../utils/token");

async function addUserToken(user_id = 0, user_agent = "", ip = "") {
  const input = { user_id, user_agent, ip };
  try {
    let error = {};

    if (!user_id || typeof user_id !== "number" || user_id < 1) {
      error["user_id"] = "User ID is required";
    }
    if (
      !user_agent ||
      typeof user_agent !== "string" ||
      user_agent.length < 1
    ) {
      error["user_agent"] = "User agent is required";
    }
    if (!ip || typeof ip !== "string" || ip.length < 1) {
      error["ip"] = "IP address is required";
    }

    if (Object.keys(error).length > 0) {
      return {
        status: "error",
        statusCode: 400,
        input,
        error,
      };
    }

    const token = await tokenize(user_id, user_agent, ip);
    const insertToken = await sqlQuery(
      `INSERT INTO user_tokens (user_id, user_agent, ip, token) VALUES ('${user_id}', '${user_agent}', '${ip}', '${token}')`
    );
    if (insertToken.affectedRows < 1) {
      return {
        status: "error",
        statusCode: 500,
        input,
        error: { message: "Failed to add user token" },
      };
    } else {
      return {
        status: "success",
        statusCode: 200,
        input,
        token,
      };
    }
  } catch (err) {
    return {
      status: "error",
      statusCode: 500,
      input,
      error: { message: err.sqlMessage || err.toString() },
    };
  }
}

async function removeUserToken(token = "") {
  const input = { token };
  try {
    if (!token || typeof token !== "string" || token.length < 1) {
      return {
        status: "error",
        statusCode: 400,
        input,
        error: { message: "Token is required" },
      };
    }

    const data = await jwt.decode(token);
    const user = await getUserByUserToken(token);

    if (
      typeof data !== "object" ||
      typeof data.user_id !== "number" ||
      typeof data.user_agent !== "string" ||
      typeof data.ip !== "string"
    ) {
      return {
        status: "error",
        statusCode: 400,
        input,
        error: { message: "Invalid token" },
      };
    }

    if (!user.data) {
      return {
        status: "error",
        statusCode: 404,
        input,
        error: { message: "User not found" },
      };
    }

    if (user.data.uid !== data.user_id) {
      return {
        status: "error",
        statusCode: 400,
        input,
        error: { message: "Invalid token" },
      };
    }

    const removeToken = await sqlQuery(
      `DELETE FROM user_tokens WHERE token = '${token}'`
    );
    if (removeToken.affectedRows < 1) {
      return {
        status: "error",
        statusCode: 500,
        input,
        error: { message: "Failed to remove user token" },
      };
    } else {
      return {
        status: "success",
        statusCode: 200,
        input,
      };
    }
  } catch (err) {
    return {
      status: "error",
      statusCode: 500,
      input,
      error: { message: err.sqlMessage || err.toString() },
    };
  }
}

async function getUserByUserToken(token = "") {
  const input = { token };
  try {
    if (!token || typeof token !== "string" || token.length < 1) {
      return {
        status: "error",
        statusCode: 400,
        input,
        error: { message: "Token is required" },
      };
    }

    const user = await sqlQuery(
      `SELECT * FROM user_tokens WHERE token = '${token}' INNER JOIN users ON user_tokens.user_id = users.uid`
    );
    if (user.length < 1) {
      return {
        status: "error",
        statusCode: 404,
        input,
        error: { message: "User not found" },
      };
    } else {
      return {
        status: "success",
        statusCode: 200,
        input,
        data: user[0],
      };
    }
  } catch (err) {
    return {
      status: "error",
      statusCode: 500,
      input,
      error: { message: err.sqlMessage || err.toString() },
    };
  }
}

module.exports = {
  addUserToken,
  removeUserToken,
  getUserByUserToken,
};
