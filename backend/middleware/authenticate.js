const authenticate = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied. No credentials provided.' });
    }

    const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString('ascii').split(':');
    const username = credentials[0];
    const password = credentials[1];

    // Hardcoded credentials
    if (username === 'admin' && password === 'password') {
        next();
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

module.exports = authenticate;
