import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Product from "../Model/productModel";
import jwt from "jsonwebtoken"

export const createProduct = catchAsync(async (req, res, next) => {
    const { title, catId, price, weight, desc, discount } = req?.body
    const { filename: image } = req?.file
    if (!title || !catId || !price || !weight) {
        return next(new HandleERROR("plese send All filds", 400))
    }
    const product = Product.create({
        title, catId, price, weight, desc, discount, image
    })
    return res.status(201).json({
        success: true,
        product
    })
})

export const getAllProduct = catchAsync(async (req, res, next) => {
    let manualFilters = {};

    if (!(role !== "admin" || role !== "superAdmin")) {
        manualFilters.isActive = true;
    }
    const result = new ApiFeatures(Product, req.qurey)
        .addManualFilters(manualFilters)
        .filter()
        .sort()
        .limitFields()
        .paginate()
        .populate()
        .execute()



    return res.status(200).json({ result })

})
export const getoneProduct = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const token = req.headers?.authorization.split(" ")[1];
    const {
        role,
    } = jwt.verify(token, process.env.SECRET_JWT);
    const product = await Product?.findOne({ id })
    if ((role !== "admin" || role !== "superAdmin") && !product.isActive) {
        return next(new HandleERROR("product not Found", 400))
    } else {
        return res.status(200).json({
            success: true,
            product
        })
    }


})
export const updateProduct = catchAsync(async (req, res, next) => {
    const { title, catId, price, weight, desc, discount } = req?.body
    const { id } = req.params
    const updataProduct = await Product.findByIdAndUpdate(id, { ...req.body }, { new: true, runValidators: true })
    return res.status(200).json({
        success: true,
        updataProduct

    })

})
