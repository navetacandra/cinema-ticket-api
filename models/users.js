const bcrypt = require("bcrypt");
const { query: sqlQuery } = require("../utils/mysql");

async function createUser(
  name = "",
  username = "",
  password = "",
  phone_number = "",
) {
  const input = { name, username, password, phone_number };
  try {
    let error = {};

    if (name.length < 1) {
      error["name"] = "Name is required";
    }

    if (username.length < 1) {
      error["username"] = "Username is required";
    } else if (username.length < 3) {
      error["username"] = "Username must be at least 3 characters";
    } else if (username.length > 24) {
      error["username"] = "Username must be less than 24 characters";
    } else if (username.includes(" ")) {
      error["username"] = "Username cannot contain spaces";
    } else if (!username.match(/^[a-zA-Z0-9]+$/)) {
      error["username"] = "Username must be alphanumeric";
    }

    if (password.length < 1) {
      error["password"] = "Password is required";
    } else if (password.length > 1 && password.length < 8) {
      error["password"] = "Password must be at least 8 characters";
    } else if (password.length > 24) {
      error["password"] = "Password must be less than 24 characters";
    }

    if (phone_number.length < 1) {
      error["phone_number"] = "Phone Number is required";
    } else if (phone_number.length > 1 && phone_number.length < 11) {
      error["phone_number"] = "Phone Number must be at least 11 characters";
    } else if (phone_number.length > 13) {
      error["phone_number"] = "Phone Number must be less than 13 characters";
    } else if (!phone_number.match(/^[0-9]+$/)) {
      error["phone_number"] = "Phone Number must be numeric";
    }

    if (Object.keys(error).length > 0) {
      return {
        status: "error",
        statusCode: 400,
        input,
        error,
      };
    }

    const findUser = await getUserByUsername(username);
    if (findUser.status === "success") {
      error["username"] = "Username already exists";
      return {
        status: "error",
        statusCode: 422,
        input,
        error,
      };
    }

    const hashPassword = bcrypt.hashSync(password, 15);
    const insertUser = await sqlQuery(
      `INSERT INTO users (name, username, password, phone_number) VALUES ('${name}', '${username}', '${hashPassword}', '${phone_number}')`,
    );
    if (insertUser.affectedRows < 1) {
      error["message"] = "Failed to create user";
      return {
        status: "error",
        statusCode: 500,
        input,
        error,
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

async function loginUser(username = "", password = "") {
  const input = { username, password };
  try {
    let error = {};

    if (username.length < 1) {
      error["username"] = "Username is required";
    } else if (username.length < 3) {
      error["username"] = "Username must be at least 3 characters";
    } else if (username.length > 24) {
      error["username"] = "Username must be less than 24 characters";
    } else if (username.includes(" ")) {
      error["username"] = "Username cannot contain spaces";
    } else if (!username.match(/^[a-zA-Z0-9]+$/)) {
      error["username"] = "Username must be alphanumeric";
    }

    if (password.length < 1) {
      error["password"] = "Password is required";
    } else if (password.length > 1 && password.length < 8) {
      error["password"] = "Password must be at least 8 characters";
    } else if (password.length > 24) {
      error["password"] = "Password must be less than 24 characters";
    }

    if (Object.keys(error).length > 0) {
      return {
        status: "error",
        statusCode: 400,
        input,
        error,
      };
    }

    const findUser = await getUserByUsername(username);
    if (findUser.statusCode === 404) {
      error["username"] = "User not found";
      return {
        status: "error",
        statusCode: 404,
        input,
        error,
      };
    }

    const verifyPassword = bcrypt.compareSync(password, findUser.data.password);
    if (!verifyPassword) {
      error["password"] = "Incorrect password";
      return {
        status: "error",
        statusCode: 401,
        input,
        error,
      };
    } else {
      return {
        status: "success",
        statusCode: 200,
        input,
        data: findUser.data,
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

async function getUserByUsername(username = "") {
  const input = { username };
  try {
    let error = {};

    if (username.length < 1) {
      error["username"] = "Username is required";
    } else if (username.length < 3) {
      error["username"] = "Username must be at least 3 characters";
    } else if (username.length > 24) {
      error["username"] = "Username must be less than 24 characters";
    } else if (username.includes(" ")) {
      error["username"] = "Username cannot contain spaces";
    } else if (!username.match(/^[a-zA-Z0-9]+$/)) {
      error["username"] = "Username must be alphanumeric";
    }

    if (Object.keys(error).length > 0) {
      return {
        status: "error",
        statusCode: 400,
        input,
        error,
      };
    }

    const findUser = await sqlQuery(
      `SELECT * FROM users WHERE username = '${username}'`,
    );
    if (findUser.length < 1) {
      error["username"] = "User not found";
      return {
        status: "error",
        statusCode: 404,
        input,
        error,
      };
    } else {
      return {
        status: "success",
        statusCode: 200,
        input,
        data: findUser[0],
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

async function getUserByUID(uid = 0) {
  let input = {};
  try {
    let error = {};

    if (uid < 1) {
      error["uid"] = "UID is required";
    } else if (isNaN(uid)) {
      error["uid"] = "UID must be a number";
    }

    if (Object.keys(error).length > 0) {
      return {
        status: "error",
        statusCode: 400,
        input,
        error,
      };
    }

    const findUser = await sqlQuery(`SELECT * FROM users WHERE uid = '${uid}'`);
    if (findUser.length < 1) {
      error["username"] = "User not found";
      return {
        status: "error",
        statusCode: 404,
        input,
        error,
      };
    } else {
      return {
        status: "success",
        statusCode: 200,
        input,
        data: findUser[0],
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
  createUser,
  loginUser,
  getUserByUsername,
  getUserByUID,
};
