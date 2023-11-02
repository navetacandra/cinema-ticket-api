const jwt = require("json-web-token");
const SECRET_KEY = process.env.SECRET_KEY || "CINEMATICKETING";

module.exports = {
  /**
   * Encodes a payload into a JWT token using the provided SECRET_KEY.
   *
   * @param {Object} payload - The payload to be encoded.
   * @return {Promise<string>} A promise that resolves to the encoded JWT token.
   */
  encode: (payload) => {
    return new Promise((resolve, reject) => {
      jwt.encode(payload, SECRET_KEY, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },
  /**
   * Decode a token and return a promise with the decoded value.
   *
   * @param {string} token - The token to be decoded.
   * @return {Promise<any>} A promise that resolves with the decoded value or rejects with an error.
   */
  decode: (token) => {
    return new Promise((resolve, reject) => {
      jwt.decode(token, SECRET_KEY, (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      });
    });
  },
};
