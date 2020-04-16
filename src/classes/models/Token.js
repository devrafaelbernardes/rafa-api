import jwt from 'jsonwebtoken';
import { KEY_SECRET_JWT } from '../../config/server';

const structError = (message) => message;

const verifyToken = (authorization = "") => {
    if (!authorization) {
        throw new Error(structError("No token provided"));
    }

    const parts = authorization.split(' ');
    if (!(parts.length === 2)) {
        throw new Error(structError("Token error"));
    }

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        throw new Error(structError("Token malformatted"));
    }

    let tokenValid = jwt.verify(token, KEY_SECRET_JWT);
    if (!tokenValid) {
        throw new Error(structError("Invalid token"));
    }
    return tokenValid;
}

const getTokenAccess = (authorization) => {
    try {
        return verifyToken(authorization);
    } catch (error) {}
    return {};
}

export const Token = () => ({
    create(data = {}, expiresIn = "7d") {
        return jwt.sign(data, KEY_SECRET_JWT, { expiresIn });
    },
    verify(token) {
        try {
            return jwt.verify(token, KEY_SECRET_JWT);
        } catch (error) { }
        return null;
    },
    get(token) {
        return jwt.verify(token, KEY_SECRET_JWT);
    },
    getTokenAccess(token) {
        return getTokenAccess(token);
    },
});

export default Token;