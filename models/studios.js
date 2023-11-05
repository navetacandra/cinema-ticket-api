const { query: sqlQuery } = require("../utils/mysql");

async function addStudio(cinema_id = 0, name = "") {
  const input = { cinema_id, name };
  try {
    let error = {};
    if (cinema_id < 1) {
      error["cinema_id"] = "Studio ID is required";
    } else if (isNaN(cinema_id)) {
      error["cinema_id"] = "Studio ID must be a number";
    }
    if (name.length < 1) {
      error["name"] = "Name is required";
    }

    if (Object.keys(error).length > 0) {
      return {
        status: "error",
        statusCode: 400,
        input,
        error,
      };
    }

    const insertStudio = await sqlQuery(
      `INSERT INTO studios (cinema_id, name) VALUES (${cinema_id}, '${name}')`
    );

    if (insertStudio.affectedRows < 1) {
      error["message"] = "Studio not added";
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

async function removeStudio(id = 0) {
  const input = { id };
  try {
    let error = {};
    if (id < 1) {
      error["id"] = "ID is required";
    } else if (isNaN(id)) {
      error["id"] = "ID must be a number";
    }
    if (Object.keys(error).length > 0) {
      return {
        status: "error",
        statusCode: 400,
        input,
        error,
      };
    }

    const findStudio = await getStudioById(id);

    if (!findStudio.data) {
      error["message"] = "Studio not found";
      return {
        status: "error",
        statusCode: 404,
        input,
        error,
      };
    }

    const deleteStudio = await sqlQuery(
      `DELETE FROM studios WHERE studio_id = ${id}`
    );
    if (deleteStudio.affectedRows < 1) {
      error["message"] = "Failed to delete studio";
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

async function updateStudio(id = 0, cinema_id = 0, name = "") {
  const input = { cinema_id, name };
  try {
    let error = {};
    if (id < 1) {
      error["id"] = "ID is required";
    } else if (isNaN(id)) {
      error["id"] = "ID must be a number";
    }
    if (cinema_id < 1) {
      error["cinema_id"] = "Cinema ID is required";
    } else if (isNaN(cinema_id)) {
      error["cinema_id"] = "Studio ID must be a number";
    }
    if (name.length < 1) {
      error["name"] = "Name is required";
    }
    if (Object.keys(error).length > 0) {
      return {
        status: "error",
        statusCode: 400,
        input,
        error,
      };
    }

    const findStudio = await getStudioById(id);
    if (!findStudio.data) {
      error["message"] = "Studio not found";
      return {
        status: "error",
        statusCode: 404,
        input,
        error,
      };
    }

    const update = await sqlQuery(
      `UPDATE studios SET cinema_id = '${cinema_id}', name = '${name}' WHERE studio_id = ${id}`
    );
    if (update.affectedRows < 1) {
      error["message"] = "Failed to update studio";
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

async function getStudios() {
  try {
    const movies = await sqlQuery(`SELECT * FROM studios`);
    if (movies.length < 1) {
      return {
        status: "error",
        statusCode: 404,
        error: { message: "Studio not found" },
      };
    } else {
      return {
        status: "success",
        statusCode: 200,
        data: movies,
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

async function getStudioById(id = 0) {
  let input = { id };
  try {
    let error = {};
    if (id < 1) {
      error["id"] = "ID is required";
    } else if (isNaN(id)) {
      error["id"] = "ID must be a number";
    }
    if (Object.keys(error).length > 0) {
      return {
        status: "error",
        statusCode: 400,
        input,
        error,
      };
    }

    const findStudio = await sqlQuery(
      `SELECT * FROM studios WHERE studio_id = ${id}`
    );
    if (findStudio.length < 1) {
      error["message"] = "Studio not found";
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
        data: findStudio[0],
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
  getStudios,
  getStudioById,
  addStudio,
  updateStudio,
  removeStudio,
};
