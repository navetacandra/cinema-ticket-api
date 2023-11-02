const { encode: jwtEncode, decode: jwtDecode } = require("./jwt");
const { query: sqlQuery } = require("./mysql");

module.exports = {
  /**
   * Encodes the given user ID, user agent, and IP address into a JWT token.
   *
   * @param {string} uid - The user ID.
   * @param {string} user_agent - The user agent.
   * @param {string} ip - The IP address.
   * @return {Promise<string>} - The encoded JWT token.
   */
  tokenize: async (uid, user_agent, ip) => {
    return await jwtEncode({ user_id: uid, user_agent, ip });
  },
  /**
   * Verifies the token, user agent, and IP address for authentication.
   *
   * @param {string} token - The authentication token.
   * @param {string} user_agent - The user agent string.
   * @param {string} ip - The IP address.
   * @return {boolean} Returns true if the authentication is successful, false otherwise.
   */
  verify: async (token, user_agent, ip) => {
    const data = await jwtDecode(token);
    if (!data || typeof data !== "object") return false;
    if (!data.user_id || typeof user_id !== "number" || user_id < 1) {
      return false;
    }
    if (
      !data.user_agent ||
      typeof user_agent !== "string" ||
      user_agent.length < 1
    ) {
      return false;
    }
    if (!data.ip || typeof ip !== "string" || ip.length < 1) {
      return false;
    }

    const findToken = await sqlQuery(
      `SELECT * FROM user_token WHERE user_id = '${data.user_id}'`
    );

    if (findToken.length < 1) return false;
    if (findToken[0].user_agent !== user_agent) return false;
    if (findToken[0].ip !== ip) return false;

    const findUser = await sqlQuery(
      `SELECT * FROM users WHERE id = '${data.user_id}'`
    );
    if (findUser.length < 1) return false;

    return true;
  },
};
