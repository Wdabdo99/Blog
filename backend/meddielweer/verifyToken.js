const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
    const authtoken = req.headers.authorization;

    if (authtoken) {
        const token = authtoken.split(" ")[1];
        try {
            const decoded = await jwt.verify(token, process.env.KEY);
            req.user = decoded;
            next();
        } catch (error) {
            return res
                .status(401)
                .json({ message: "invalid token, access denied" });
        }
    } else {
        return res
            .status(401)
            .json({ message: "no token provided, access denied" });
    }
}

module.exports = {
    verifyToken
};
