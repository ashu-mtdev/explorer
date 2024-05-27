const CustomResponse = require("./Responses");
const { JWT_SECRET } = process.env;
const authenticateJWT = async (req, res, next) => {
  const jwt = require("jsonwebtoken");
  try {
    const BearerToken = req.headers.authorization;
    if (BearerToken.startsWith("Bearer ")) {
      const token = BearerToken.slice(7);
      var decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    }
  } catch (error) {
    return CustomResponse.unauthorized(
      res,
      `Token Unauthorized ${error}`,
      error
    );
  }
};
module.exports = authenticateJWT;
