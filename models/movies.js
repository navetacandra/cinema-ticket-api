const { query: sqlQuery } = require("../utils/mysql");

async function addMovie(
  name = "",
  genre = "",
  poster_url = "",
  synopsis = "",
  rating = 0.0,
  duration = 0
) {
  const input = { name, genre, poster_url, synopsis, rating, duration };
  try {
    let error = {};
    if (name.length < 1) {
      error["name"] = "Name is required";
    }
    if (genre.length < 1) {
      error["genre"] = "Genre is required";
    }
    if (poster_url.length < 1) {
      error["poster_url"] = "Poster URL is required";
    }
    if (synopsis.length < 1) {
      error["synopsis"] = "Synopsis is required";
    }
    if (duration < 1) {
      error["duration"] = "Duration is required";
    }

    if (Object.keys(error).length > 0) {
      return {
        status: "error",
        statusCode: 400,
        input,
        error,
      };
    }

    const insertMovie = await sqlQuery(
      `INSERT INTO movies (name, genre, poster_url, synopsis, rating, duration) VALUES ('${name}', '${genre}', '${poster_url}', '${synopsis}', ${rating}, ${duration})`
    );
    if (insertMovie.affectedRows < 1) {
      error["message"] = "Failed to add movie";
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

async function removeMovie(id = 0) {
  const input = { id };
  try {
    let error = {};
    const findMovie = await getMovieById(id);
    if (!findMovie.data) {
      error["message"] = "Movie not found";
      return {
        status: "error",
        statusCode: 404,
        input,
        error,
      };
    }

    const deleteMovie = await sqlQuery(
      `DELETE FROM movies WHERE movie_id = ${id}`
    );
    if (deleteMovie.affectedRows < 1) {
      error["message"] = "Failed to delete movie";
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

async function getMovieById(id = 0) {
  const input = { id };
  try {
    let error = {};
    if (id < 1) {
      error["id"] = "ID is required";
    }
    if (Object.keys(error).length > 0) {
      return {
        status: "error",
        statusCode: 400,
        input,
        error,
      };
    }

    const findMovie = await sqlQuery(
      `SELECT * FROM movies WHERE movie_id = ${id}`
    );
    if (findMovie.length < 1) {
      error["message"] = "Movie not found";
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
        data: findMovie[0],
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

async function getMovies() {
  try {
    let error = {};

    const movies = await sqlQuery(`SELECT * FROM movies`);
    if (movies.length < 1) {
      error["message"] = "Movie not found";
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

async function findMovies(query = "") {
  const input = { query };
  try {
    let error = {};
    if (id < 1) {
      error["query"] = "Query is required";
    }
    if (Object.keys(error).length > 0) {
      return {
        status: "error",
        statusCode: 400,
        input,
        error,
      };
    }

    const movies = await sqlQuery(
      `SELECT movie_id, name, genre, synopsis, rating, duration, CONCAT(name, ',', genre, ',', synopsis) AS data_query FROM movies WHERE data_query LIKE '%${query}%'`
    );
    if (movies.length < 1) {
      error["message"] = "Movie not found";
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

async function updateMovie(
  id = 0,
  name = "",
  genre = "",
  poster_url = "",
  synopsis = "",
  rating = 0.0,
  duration = 0
) {
  const input = { id, name, genre, poster_url, synopsis, rating, duration };
  try {
    let error = {};
    if (id < 1) {
      error["id"] = "ID is required";
    }
    if (name.length < 1) {
      error["name"] = "Name is required";
    }
    if (genre.length < 1) {
      error["genre"] = "Genre is required";
    }
    if (poster_url.length < 1) {
      error["poster_url"] = "Poster URL is required";
    }
    if (synopsis.length < 1) {
      error["synopsis"] = "Synopsis is required";
    }

    if (Object.keys(error).length > 0) {
      return {
        status: "error",
        statusCode: 400,
        input,
        error,
      };
    }

    const movies = await getMovieById(id);
    if (!movies.data) {
      error["message"] = "Movie not found";
      return {
        status: "error",
        statusCode: 404,
        input,
        error,
      };
    }

    const update = await sqlQuery(
      `UPDATE movies SET name = '${name}', genre = '${genre}', poster_url = '${poster_url}', synopsis = '${synopsis}', rating = ${rating}, duration = ${duration} WHERE movie_id = ${id}`
    );
    if (update.affectedRows < 1) {
      error["message"] = "Failed to update movie";
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

module.exports = {
  getMovieById,
  getMovies,
  findMovies,
  addMovie,
  removeMovie,
  updateMovie,
}
