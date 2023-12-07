// Authentication untuk cek user apakah sudah login atau belum
import jwt from 'jsonwebtoken';

export const Authentication = (req, res, next) => {
    const authHeaders = req.headers['authorization'];
    const token = authHeaders && authHeaders.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.TOKEN, (err, decoded) => {
        if (err) {
            console.error('JWT Verification Error:', err);
            return res.status(403).json({ message: 'Invalid token or unauthorized.' });
        }

        req.userId = decoded.userId;
        next();
    });
}

export default Authentication;
