import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Address from "../Model/addressModel";

export const createAddress = catchAsync(async (req, res, next) => {
  const id = req.id;
  const { province, city, address, postalCode } = req?.body;
  const newAddress = await Address.create({
    userId: id,
    province,
    city,
    address,
    postalCode,
  });
  return res.status(201).json({
    success: true,
    message: "address created successfully",
  });
});

export const getAllAddress = catchAsync(async (req, res, next) => {
  const { role, id, permission = [] } = req;

  let manualFilters = {};

  if (!(role === "admin" || role === "superAdmin")) {
    manualFilters.userId = id;
  } else if (!permission.includes("address")) {
    return next(new HandleERROR("you dont have permission", 401));
  }

  const result = await new ApiFeatures(Address, req.query, role)
    .addManualFilters(manualFilters)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate("userId")
    .execute();

  return res.status(200).json(result);
});

export const updateAddress = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { province, city, address, postalCode } = req?.body;
  const { role, permission = [], id: userId } = req;
  if (
    ((role == "Admin" || role == "superAdmin") && permission.includes("address")) || userId == id

  ) {
    const updataAddres = await Address.findByIdAndUpdate(
      id,
      {
        province,
        city,
        address,
        postalCode,
      },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      success: true,
      updataAddres,
    });
  } else {
  }
});
