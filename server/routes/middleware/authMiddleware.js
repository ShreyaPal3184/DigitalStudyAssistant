/*import jwt from "jsonwebtoken"; 
import config from "../config.js";
import dotenv from "dotenv";

dotenv.config();

export const authenticateToken = async (req, res, next) => {
    try {
        const token = req.cookie.token;
        if(!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            })
        };

        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            })
        };

        req.id = {id: decode.userId};
        next();

    } catch (error) {
        console.log(error);        
    }
}*/


import jwt from "jsonwebtoken";
import config from "../config.js"; // Assuming you're using config for your secret
import dotenv from "dotenv";

dotenv.config();

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Getting Authorization header

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Get the token part after "Bearer"

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => { // Decode the token with the secret
            if (err) {
                return res.status(403).json({ message: "Invalid or expired token" });
            }
            req.user = user; // Attach the decoded user information to the request object
            next(); // Proceed to the next middleware or route handler
        });
    } else {
        return res.status(401).json({ message: "Access denied: No token provided." });
    }
};
