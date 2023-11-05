const { query: sqlQuery } = require("../utils/mysql");

async function addShow(
  studio_id = 0,
  movie_id = 0,
  schedule = "",
  price = 0,
  date = "",
) {
  const input = { studio_id, movie_id, schedule, price, date };
  try {
    let error = {};

    if (studio_id < 1) {
      error["studio_id"] = "Studio ID is required";
    } else if (isNaN(studio_id)) {
      error["studio_id"] = "Studio ID must be a number";
    }

    if (movie_id < 1) {
      error["movie_id"] = "Movie ID is required";
    } else if (isNaN(movie_id)) {
      error["movie_id"] = "Movie ID must be a number";
    }

    if (schedule.length < 1) {
      error["schedule"] = "Schedule is required";
    } else if (schedule.length < 5) {
      error["schedule"] = "Schedule must be at least 5 characters";
    } else if (schedule.length > 5) {
      error["schedule"] = "Schedule maximum length is 5 characters";
    } else if (schedule.indexOf(":") !== 2) {
      error["schedule"] = "Schedule must contain ':'";
    } else if (isNaN(schedule.split(":")[0])) {
      error["schedule"] = "Schedule hour must be a number";
    } else if (isNaN(schedule.split(":")[1])) {
      error["schedule"] = "Schedule minute must be a number";
    } else if (
      Number(schedule.split(":")[0]) < 0 ||
      Number(schedule.split(":")[0]) > 23
    ) {
      error["schedule"] = "Schedule hour must be between 0 and 23";
    } else if (
      Number(schedule.split(":")[1]) < 0 ||
      Number(schedule.split(":")[1]) > 59
    ) {
      error["schedule"] = "Schedule minute must be between 0 and 59";
    }

    if (price < 1) {
      error["price"] = "Price must be a number";
    } else if (isNaN(price)) {
      error["price"] = "Price must be a number";
    }

    if (date.length < 1) {
      error["date"] = "Date is required";
    } else if (isNaN(new Date(date).getHours())) {
      error["date"] = "Date must be a valid date";
    }

    if (Object.keys(error).length > 0) {
      return {
        status: "error",
        statusCode: 400,
        input,
        error,
      };
    }

    const insertShow = await sqlQuery(
      `INSERT INTO seats (studio_id, movie_id, schedule, price, date) VALUES (${studio_id}, ${movie_id}, '${schedule}', ${price}, '${date}')`,
    );

    if (insertShow.affectedRows < 1) {
      error["message"] = "Show not added";
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

async function removeShow(id = 0) {
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

    const findShow = await getShowById(id);

    if (!findShow.data) {
      error["message"] = "Show not found";
      return {
        status: "error",
        statusCode: 404,
        input,
        error,
      };
    }

    const deleteShow = await sqlQuery(
      `DELETE FROM shows WHERE show_id = ${id}`,
    );
    if (deleteShow.affectedRows < 1) {
      error["message"] = "Failed to delete show";
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

async function updateShow(
  id = 0,
  studio_id = 0,
  movie_id = 0,
  schedule = "",
  price = 0,
  date = "",
) {
  const input = { studio_id, movie_id, schedule, price, date };
  try {
    let error = {};

    if (studio_id < 1) {
      error["studio_id"] = "Studio ID is required";
    } else if (isNaN(studio_id)) {
      error["studio_id"] = "Studio ID must be a number";
    }

    if (movie_id < 1) {
      error["movie_id"] = "Movie ID is required";
    } else if (isNaN(movie_id)) {
      error["movie_id"] = "Movie ID must be a number";
    }

    if (schedule.length < 1) {
      error["schedule"] = "Schedule is required";
    } else if (schedule.length < 5) {
      error["schedule"] = "Schedule must be at least 5 characters";
    } else if (schedule.length > 5) {
      error["schedule"] = "Schedule maximum length is 5 characters";
    } else if (schedule.indexOf(":") !== 2) {
      error["schedule"] = "Schedule must contain ':'";
    } else if (isNaN(schedule.split(":")[0])) {
      error["schedule"] = "Schedule hour must be a number";
    } else if (isNaN(schedule.split(":")[1])) {
      error["schedule"] = "Schedule minute must be a number";
    } else if (
      Number(schedule.split(":")[0]) < 0 ||
      Number(schedule.split(":")[0]) > 23
    ) {
      error["schedule"] = "Schedule hour must be between 0 and 23";
    } else if (
      Number(schedule.split(":")[1]) < 0 ||
      Number(schedule.split(":")[1]) > 59
    ) {
      error["schedule"] = "Schedule minute must be between 0 and 59";
    }

    if (price < 1) {
      error["price"] = "Price must be a number";
    } else if (isNaN(price)) {
      error["price"] = "Price must be a number";
    }

    if (date.length < 1) {
      error["date"] = "Date is required";
    } else if (isNaN(new Date(date).getHours())) {
      error["date"] = "Date must be a valid date";
    }

    if (Object.keys(error).length > 0) {
      return {
        status: "error",
        statusCode: 400,
        input,
        error,
      };
    }

    const findShow = await getShowById(id);
    if (!findShow.data) {
      error["message"] = "Show not found";
      return {
        status: "error",
        statusCode: 404,
        input,
        error,
      };
    }

    const update = await sqlQuery(
      `UPDATE shows SET studio_id = ${studio_id}, movie_id = ${movie_id}, schedule = '${schedule}', price = ${price}, date = '${date}' WHERE show_id = ${id}`,
    );
    if (update.affectedRows < 1) {
      error["message"] = "Failed to update show";
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

async function getShows() {
  try {
    const movies = await sqlQuery(`SELECT * FROM shows`);
    if (movies.length < 1) {
      return {
        status: "error",
        statusCode: 404,
        error: { message: "Show not found" },
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

async function getShowById(id = 0) {
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

    const findShow = await sqlQuery(
      `SELECT * FROM shows WHERE show_id = ${id}`,
    );
    if (findShow.length < 1) {
      error["message"] = "Show not found";
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
        data: findShow[0],
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

async function getShowByMovieId(id = 0) {
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

    const findShow = await sqlQuery(
      `SELECT * FROM shows WHERE movie_id = ${id}`,
    );
    if (findShow.length < 1) {
      error["message"] = "Show not found";
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
        data: findShow[0],
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

async function getShowByStudioId(id = 0) {
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

    const findShow = await sqlQuery(
      `SELECT * FROM shows WHERE studio_id = ${id}`,
    );
    if (findShow.length < 1) {
      error["message"] = "Show not found";
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
        data: findShow[0],
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
  getShows,
  getShowById,
  getShowByMovieId,
  getShowByStudioId,
  addShow,
  updateShow,
  removeShow,
};
