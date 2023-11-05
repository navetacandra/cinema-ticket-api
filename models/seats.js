const { query: sqlQuery } = require("../utils/mysql");

async function addSeat(studio_id = 0, name = "") {
  const input = { studio_id, name };
  try {
    let error = {};
    if (studio_id < 1) {
      error["studio_id"] = "Studio ID is required";
    } else if (isNaN(studio_id)) {
      error["studio_id"] = "Studio ID must be a number";
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

    const insertSeat = await sqlQuery(
      `INSERT INTO seats (studio_id, name) VALUES (${studio_id}, '${name}')`
    );

    if (insertSeat.affectedRows < 1) {
      error["message"] = "Seat not added";
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

async function removeSeat(id = 0) {
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

    const findSeat = await getSeatById(id);

    if (!findSeat.data) {
      error["message"] = "Seat not found";
      return {
        status: "error",
        statusCode: 404,
        input,
        error,
      };
    }

    const deleteSeat = await sqlQuery(
      `DELETE FROM seats WHERE seat_id = ${id}`
    );
    if (deleteSeat.affectedRows < 1) {
      error["message"] = "Failed to delete seat";
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

async function updateSeat(id = 0, studio_id = 0, name = "") {
  const input = { studio_id, name };
  try {
    let error = {};
    if (id < 1) {
      error["id"] = "ID is required";
    } else if (isNaN(id)) {
      error["id"] = "ID must be a number";
    }
    if (studio_id < 1) {
      error["studio_id"] = "Studio ID is required";
    } else if (isNaN(studio_id)) {
      error["studio_id"] = "Studio ID must be a number";
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

    const findSeat = await getSeatById(id);
    if (!findSeat.data) {
      error["message"] = "Seat not found";
      return {
        status: "error",
        statusCode: 404,
        input,
        error,
      };
    }

    const update = await sqlQuery(
      `UPDATE seats SET studio_id = '${studio_id}', name = '${name}' WHERE seat_id = ${id}`
    );
    if (update.affectedRows < 1) {
      error["message"] = "Failed to update seat";
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

async function getSeats() {
  try {
    const movies = await sqlQuery(`SELECT * FROM seats`);
    if (movies.length < 1) {
      return {
        status: "error",
        statusCode: 404,
        error: { message: "Seat not found" },
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

async function getSeatById(id = 0) {
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

    const findSeat = await sqlQuery(
      `SELECT * FROM seats WHERE seat_id = ${id}`
    );
    if (findSeat.length < 1) {
      error["message"] = "Seat not found";
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
        data: findSeat[0],
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
  getSeats,
  getSeatById,
  addSeat,
  updateSeat,
  removeSeat,
};
