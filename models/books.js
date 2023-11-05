const { query: sqlQuery } = require("../utils/mysql");
const { getSeatById } = require("./seats");
const { getShowById } = require("./shows");
const { getUserByUID } = require("./users");
async function addBook(user_id = 0, show_id = 0, seat_id = 0, count = 0) {
  const input = { user_id, show_id, seat_id, count };
  try {
    let error = {};
    if (user_id < 1) {
      error["user_id"] = "User ID is required";
    } else if (isNaN(user_id)) {
      error["user_id"] = "User ID must be a number";
    }
    if (show_id < 1) {
      error["show_id"] = "Show ID is required";
    } else if (isNaN(show_id)) {
      error["show_id"] = "Show ID must be a number";
    } else if ((await getShowById(show_id).data) === null) {
      error["show_id"] = "Show ID not found";
    }
    if (seat_id < 1) {
      error["seat_id"] = "Seat ID is required";
    } else if (isNaN(seat_id)) {
      error["seat_id"] = "Seat ID must be a number";
    } else if ((await getSeatById(seat_id).data) === null) {
      error["seat_id"] = "Seat ID not found";
    }
    if (count < 1) {
      error["count"] = "Count is required";
    } else if (isNaN(count)) {
      error["count"] = "Count must be a number";
    }

    if (Object.keys(error).length > 0) {
      return {
        status: "error",
        statusCode: 400,
        input,
        error,
      };
    }

    const insertBook = await sqlQuery(
      `INSERT INTO books (user_id, show_id, seat_id, count) VALUES (${user_id}, ${show_id}, ${seat_id}, ${count})`
    );
    if (insertBook.affectedRows < 1) {
      return {
        status: "error",
        statusCode: 500,
        input,
        error: { message: "Failed to add book" },
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

async function removeBook(id = 0) {
  const input = { id };
  try {
    let error = {};

    if (id < 1) {
      error["id"] = "ID is required";
    } else if (isNaN(id)) {
      error["id"] = "ID must be a number";
    }

    const findBook = await getBookById(id);
    if (!findBook.data) {
      error["message"] = "Book not found";
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

async function getBookById(id) {
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

    const movies = await sqlQuery(`SELECT * FROM books WHERE id = ${id}`);
    if (movies.length < 1) {
      error["message"] = "Book not found";
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
        data: movies[0],
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

async function getUserBooks(uid = 0) {
  const input = { uid };
  try {
    let error = {};

    if (uid < 1) {
      error["uid"] = "User ID is required";
    } else if (isNaN(uid)) {
      error["uid"] = "User ID must be a number";
    }

    if (Object.keys(error).length > 0) {
      return {
        status: "error",
        statusCode: 400,
        input,
        error,
      };
    }

    const findUser = await getUserByUID(uid);
    if (!findUser.data) {
      error["message"] = "User not found";
      return {
        status: "error",
        statusCode: 403,
        input,
        error,
      };
    }

    const movies = await sqlQuery(`SELECT * FROM books WHERE user_id = ${uid}`);
    if (movies.length < 1) {
      error["message"] = "Book not found";
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

module.exports = {
  addBook,
  removeBook,
  getBookById,
  getUserBooks,
};
