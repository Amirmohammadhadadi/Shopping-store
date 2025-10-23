import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Category from "../Model/categoryModel.js";

export const createCategory = catchAsync(async (req, res, next) => {
  const { title } = req?.body;
  const { filename } = req?.file;
  if (!filename || !title)
    return next(new HandleERROR("all fileds are required", 400));
  const category = await Category.create({ title, file: filename });
  return res.status(201).json({
    success: true,
    category,
  });
});

export const getAllCategory = catchAsync(async (req, res, next) => {
  const result = new ApiFeatures(Category, req.query, req.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate()
    .execute();
  return res.status(200).json(result);
});

export const updateCategory = catchAsync(async (req, res, next) => {
  const { id } = req?.params;
  const { title } = req?.body;
  const { filename } = req?.file;
  const updatedCat = await Category.findByIdAndUpdate(
    id,
    { title, file: filename },
    { new: true, runValidators: true }
  );
  return res.status(200).json({
    success:true,
    updatedCat
  })
});



