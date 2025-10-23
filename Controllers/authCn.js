import { catchAsync, HandleERROR } from "vanta-api";
import User from "../Model/userModel.js";
import { sendAuthCode, verifyCode } from "../Utils/Utils/smsHandler.js";
import jwt from "jsonwebtoken";
import Cart from "../Model/cartModel.js";

export const login = catchAsync(async (req, res, next) => {
  const { phoneNumber } = req?.body;

  if (!phoneNumber) {
    return next(new HandleERROR("phone number is required", 400));
  }
  const existUser = await User.findOne({ phoneNumber });
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

export const checkCode = catchAsync(async (req, res, next) => {
  const { code } = req?.body;
  const { phoneNumber, type } = jwt.verify(
    req.headers?.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );
  const vaildate = await verifyCode(phoneNumber, code);

  if (vaildate.success) {
    if (type == "register") {
      const newUser = await User.create({ phoneNumber });
      const cart = await Cart.create({ userId: newUser._id })
      return res.status(201).json({
        success: true,
        message: "user created successfully",
      });
    } else if (type == "login") {
      const user = await User.findOne({ phoneNumber });
      const cart = await Cart.findOne({ userId: user._id });

      const token = jwt.sign(
        { phoneNumber: user.phoneNumber, id: user._id },
        process.env.JWT_SECRET
      );
      return res.status(200).json({
        success: true,
        token,
        user,
        cart
      });
    }
  } else {
    next(new HandleERROR("code is wrong", 401));
  }
});

export const register = catchAsync(async (req, res, next) => {
  const { phoneNumber } = req?.body;

  if (!phoneNumber) {
    return next(new HandleERROR("phone number is required", 400));
  }
  const existUser = await User.findOne({ phoneNumber });
  if (existUser) {
    return next(new HandleERROR("this phone number is already exist", 400));
  }
  const result = await sendAuthCode(phoneNumber);
  if (result.success) {
    const tempToken = jwt.sign(
      { phoneNumber, type: "register" },
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
});
