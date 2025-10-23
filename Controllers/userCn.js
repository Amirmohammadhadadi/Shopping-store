import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import User from "../Model/userModel.js";

export const getAllUser = catchAsync(async (req, res, next) => {
  const result = await new ApiFeatures(User, req?.query, req?.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate()
    .execute();
  return res.status(200).json(result);
});





export const updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { role, id: userId } = req;
  if ((role == "admin" && role == "superAdmin") || userId == id) {
    const updatedUser = await User.findByIdAndUpdate(id, req?.body, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json({
        success:true,
        message : "user updated successfuly",
        user: updatedUser
    });
  } else {
    return next(new HandleERROR("you dont have permission"));
  }
});





export const getOneUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { role, id: userId } = req;
  if ((role == "admin" && role == "superAdmin") || userId == id) {
    const result = await new ApiFeatures(User, {}, role)
      .populate(["popularProduct,lastSeenProduct"])
      .addManualFilters({ id });
    return res.status(200).json(result);
  } else {
    return next(new HandleERROR("you dont have permission"));
  }
});
