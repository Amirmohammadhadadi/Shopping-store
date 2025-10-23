import { catchAsync } from "vanta-api";
import Admin from "../Model/adminModel.js";
import { sendAuthCode, verifyCode } from "../Utils/Utils/smsHandler.js";
import jwt from "jsonwebtoken";

export const adminLogin = catchAsync(async (req, res, next) => {
  const { phoneNumber } = req?.body;
  if (!phoneNumber) {
    return next(new HandleERROR("phone number is required", 400));
  }
  const existUser = await Admin.findOne({ phoneNumber });
  if (existUser) {
    const result = await sendAuthCode(phoneNumber);
    if (result.success) {
      const tempToken = jwt.sign(
        { phoneNumber, type: "login" },
        process.env.JWT_SECRET
      );
      return res.status(200).json({
        success: true,
        message: "code sent successfuly",
        token: tempToken,
      });
    } else {
      return next(new HandleERROR(result.sessage, 400));
    }
  } else {
    return next(new HandleERROR("you should register first", 400));
  }
});

export const adminVerify = catchAsync(async (req, res, next) => {
  const { code } = req?.body;
  const { phoneNumber, type } = jwt.verify(
    req.headers?.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );
  const vaildate = await verifyCode(phoneNumber, code);

  if (vaildate.success) {
    const user = await Admin.findOne({ phoneNumber });
    const token = jwt.sign(
      {
        phoneNumber: user.phoneNumber,
        role: user.role,
        permission: user.permission,
        id: user._id
      },
      process.env.JWT_SECRET
    );
    return res.status(200).json({
      success: true,
      token,
      user,
    });
  } else {
    next(new HandleERROR("code is wrong", 401));
  }
});
