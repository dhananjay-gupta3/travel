const express = require('express');
const router = express.Router();

router.post('/auth', (req, res) => {
    const { username, password } = req.body;
    // Hardcoded credentials
    if (username === 'admin' && password === 'password') {
        const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');
        res.json({ credentials: `Basic ${encodedCredentials}` });
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
    }
});

module.exports = router;
