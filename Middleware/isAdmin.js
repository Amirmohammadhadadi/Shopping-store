import jwt from "jsonwebtoken"
export const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split("")[1]
        const { role, phoneNumber, permission, id } = jwt.verify(token, process.env.JWT.SECRET)
        if (role == "admin" || role == "superAdmin") {
            req.role = role
            req.phoneNumber = phoneNumber
            req.permission = permission
            req.id = id
            return next()
        }
        return res.status(401).json({
            message: "you dont have permission",
            success: false,
        });
    } catch (error) {
        return res.status(401).json({
            message: "you dont have permission",
            success: false,
        });
    }
}