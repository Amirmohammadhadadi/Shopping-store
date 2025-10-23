import jwt from "jsonwebtoken";
export const isLogin = async (req, res, next) => {
    try {
        const token = req.headers?.authorization.split(" ")[1];
        const {
            role,
            phoneNumber,
            permission = false,
            id,
        } = jwt.verify(token, process.env.SECRET_JWT);
        req.phoneNumber = phoneNumber;
        req.role = role;
        req.id = id;
        if (permission) {
            req.permission = permission;
        }
        return next();
    } catch (error) {
        return res.status(401).json({
            message: "you dont have permission",
            success: false,
        });
    }
};

