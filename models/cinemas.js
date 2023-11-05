const { query: sqlQuery } = require("../utils/mysql");

async function addCinema(name = "", address = "") {
  const input = { name, address };
  try {
    let error = {};
    if (name.length < 1) {
      error["name"] = "Name is required";
    }
    if (address.length < 1) {
      error["address"] = "Address is required";
    }

    if (Object.keys(error).length > 0) {
      return {
        status: "error",
        statusCode: 400,
        input,
        error,
      };
    }

    const insertCinema = await sqlQuery(
      `INSERT INTO cinemas (name, address) VALUES ('${name}', '${address}')`,
    );

    if (insertCinema.affectedRows < 1) {
      error["message"] = "Cinema not added";
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

async function removeCinema(id = 0) {
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

    const findCinema = await getCinemaById(id);

    if (!findCinema.data) {
      error["message"] = "Cinema not found";
      return {
        status: "error",
        statusCode: 404,
        input,
        error,
      };
    }

    const deleteCinema = await sqlQuery(`DELETE FROM cinemas WHERE id = ${id}`);
    if (deleteCinema.affectedRows < 1) {
      error["message"] = "Failed to delete cinema";
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

async function updateCinema(id = 0, name = "", address = "") {
  const input = { id, name, address };
  try {
    let error = {};
    if (id < 1) {
      error["id"] = "ID is required";
    } else if (isNaN(id)) {
      error["id"] = "ID must be a number";
    }
    if (name.length < 1) {
      error["name"] = "Name is required";
    }
    if (address.length < 1) {
      error["address"] = "Address is required";
    }
    if (Object.keys(error).length > 0) {
      return {
        status: "error",
        statusCode: 400,
        input,
        error,
      };
    }

    const findCinema = await getCinemaById(id);
    if (!findCinema.data) {
      error["message"] = "Cinema not found";
      return {
        status: "error",
        statusCode: 404,
        input,
        error,
      };
    }

    const update = await sqlQuery(
      `UPDATE cinemas SET name = '${name}', address = '${address}' WHERE id = ${id}`,
    );
    if (update.affectedRows < 1) {
      error["message"] = "Failed to update cinema";
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

async function getCinemas() {
  try {
    const movies = await sqlQuery(`SELECT * FROM cinemas`);
    if (movies.length < 1) {
      return {
        status: "error",
        statusCode: 404,
        error: { message: "Cinema not found" },
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

async function getCinemaById(id = 0) {
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

    const findCinema = await sqlQuery(`SELECT * FROM cinemas WHERE id = ${id}`);
    if (findCinema.length < 1) {
      error["message"] = "Cinema not found";
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
        data: findCinema[0],
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
  getCinemas,
  getCinemaById,
  addCinema,
  updateCinema,
  removeCinema,
};
