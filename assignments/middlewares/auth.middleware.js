import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const secretKey = process.env.JWT_SECRET;

const isAuthenticated = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).send({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).send({ error: 'Invalid token' });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).send({ error: 'Access denied' });
    }
};

export { isAuthenticated, isAdmin };