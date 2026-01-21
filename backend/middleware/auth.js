const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('Authorization');

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        // Split 'Bearer <token>' if user sends usually, but simple header 'Authorization: <token>' is easier for MVP, 
        // or standard 'Bearer <token>'
        // Let's support both or just pure token for simplicity if not specified.
        // Standard is Bearer. Let's assume the user sends just the token or handle Bearer split.
        // For this implementation, let's look for "Bearer " prefix or just token.

        let tokenString = token;
        if (token.startsWith('Bearer ')) {
            tokenString = token.slice(7, token.length).trimLeft();
        }

        const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
