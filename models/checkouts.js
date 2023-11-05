const { query: sqlQuery } = require("../utils/mysql");
const { getBookById } = require("./books");
const { getUserByUID } = require("./users");

async function addCheckout(uid = 0, book_id = 0) {
  const input = { uid, book_id };
  try {
    let error = {};
    if (uid < 1) {
      error["uid"] = "UID is required";
    } else if (isNaN(uid)) {
      error["uid"] = "UID must be a number";
    } else if ((await getUserByUID(uid).data) === null) {
      error["uid"] = "User not found";
    }

    if (book_id < 1) {
      error["book_id"] = "Book ID is required";
    } else if (isNaN(book_id)) {
      error["book_id"] = "Book ID must be a number";
    } else if ((await getBookById(book_id).data) === null) {
      error["book_id"] = "Book not found";
    }

    if (Object.keys(error).length > 0) {
      return {
        status: "error",
        statusCode: 400,
        input,
        error,
      };
    }

    const res = await sqlQuery(
      `INSERT INTO checkouts (uid, book_id, paid, status) VALUES (${uid}, ${book_id}, true, 'paid')`,
    );

    if (res.affectedRows < 1) {
      error["message"] = "Checkout not added";
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

async function cancelCheckout(uid = 0, book_id = 0) {
  const input = { uid, book_id };
  try {
    let error = {};
    if (uid < 1) {
      error["uid"] = "UID is required";
    } else if (isNaN(uid)) {
      error["uid"] = "UID must be a number";
    } else if ((await getUserByUID(uid).data) === null) {
      error["uid"] = "User not found";
    }

    if (book_id < 1) {
      error["book_id"] = "Book ID is required";
    } else if (isNaN(book_id)) {
      error["book_id"] = "Book ID must be a number";
    } else if ((await getBookById(book_id).data) === null) {
      error["book_id"] = "Book not found";
    }

    if (Object.keys(error).length > 0) {
      return {
        status: "error",
        statusCode: 400,
        input,
        error,
      };
    }

    const res = await sqlQuery();
  } catch (err) {}
}

async function getCheckouts(uid = 0) {
  const input = { uid };
  try {
    let error = {};
    if (uid < 1) {
      error["uid"] = "UID is required";
    } else if (isNaN(uid)) {
      error["uid"] = "UID must be a number";
    } else if ((await getUserByUID(uid).data) === null) {
      error["uid"] = "User not found";
    }

    if (Object.keys(error).length > 0) {
      return {
        status: "error",
        statusCode: 400,
        input,
        error,
      };
    }

    const res = await sqlQuery(
      `SELECT * FROM checkouts INNER JOIN books ON checkouts.book_id = books.book_id INNER JOIN users ON books.user_id = users.uid WHERE books.user_id = ${uid}`,
    );
    if (res.length < 1) {
      error["message"] = "Checkout not found";
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
        data: res,
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
  addCheckout,
  cancelCheckout,
  getCheckouts,
};
