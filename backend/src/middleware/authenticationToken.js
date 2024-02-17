const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const authenticateToken = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        if (token) {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: "User is not authenticated" });
                }
                req.user = decoded.user;
                return next();
            });
        } else {
            return res.status(401).json({ message: "User is not authenticated or token is missing" });
        }
    } else {
        return res.status(401).json({ message: "Authorization header is missing" });
    }
});

module.exports = authenticateToken;