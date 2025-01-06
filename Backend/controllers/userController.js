const asyncHandler = require("../utils/asyncHandler");
const STATUS = require("../utils/constants");
const {
  userRegisterServices,
  userLoginServices,
  logoutUserService,
  getUserDetails
} = require("../services/userService");
const {
  registerValidation,
  loginValidation,
} = require("../validation/userValidation");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");
const User = require("../models/userModels");
const isAdmin = require("../middlewares/isAdmin");
const CustomError=require('../utils/customError')
const { refreshAccessTokenService } = require("../services/userService");

exports.registerUser = asyncHandler(async (req, res) => {
  console.log("in registartion controll.....")
  const data = req.body;
  const { error } = registerValidation.validate(data);
  if (error) throw new CustomError(error.details[0].message, 400);
  await userRegisterServices(data);

  res.status(201).json({
    status: STATUS.SUCCESS,
    message: "user registerd successfully",
  });
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { error } = loginValidation.validate({ email, password });
  if (error) throw new CustomError(error.details[0].message, 400);
  const User = await userLoginServices(email, password);

  const accessToken = generateAccessToken(User);
  const refreshToken = generateRefreshToken(User);
  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 30 * 60 * 1000,
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({
      user:User,
      status: STATUS.SUCCESS,
      message: User.isAdmin
        ? "Admin Login sucessfully"
        : "User Login successfully",
    });
});

//create new accesstoken
exports.refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  const { newAccessToken } = await refreshAccessTokenService(refreshToken);
  res
    .cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 15 * 60 * 1000,
    })
    .status(200)
    .json({
      status: STATUS.SUCCESS,
      message: "Access token refereshed",
    });
});

// Logout User
exports.logoutUser = asyncHandler(async (req, res) => {
  await logoutUserService();

  res.clearCookie('accessToken', {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: '/'
  });
  res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: '/'
  });

  res.status(200).json({ message: 'Logged out successfully' });
});


exports.getLoggedInUser = asyncHandler(async(req, res) => {
  const user = await getUserDetails(req.user._id);  
  if (!user) {
    throw new CustomError('User not found', 404);
  }
  res.status(200).json({ user });
});