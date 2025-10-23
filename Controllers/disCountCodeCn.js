import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import DiscountCode from "../Model/discountCodeModel.js";
import isExpired from "../Utils/Utils/time.js";
import Cart from "../Model/cartModel.js";

export const createDisCount = catchAsync(async (req, res, next) => {
    const { code, persentage, expire, startTime } = req?.body
    if (!code || !persentage || !expire || !startTime) {
        return next(new HandleERROR("plese send All fildes", 400))
    }
    if (isExpired(expire, startTime)) {
        const newCode = await DiscountCode.create({ code, persentage, expire })
        return res.status(200).json({
            success: true,
            newCode
        })
    } else {
        return next(new HandleERROR("time is norCorrent", 400))
    }

})
export const getAllDisCount = catchAsync(async (req, res, next) => {
    const result = new ApiFeatures(DiscountCode, req.query, req.role)
        .filter()
        .sort()
        .limitFields()
        .paginate()
        .populate()
        .execute();
    return res.status(200).json(result)

})
export const getOneDisCount = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const disCountCode = await DiscountCode.findById(id)
    return res.status(200).json({
        success: true,
        disCountCode
    })
})
export const updataDisCount = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const updataCode = await DiscountCode.findByIdAndUpdate(id, { ...req?.body }, { new: true, runValidators: true })
    return res.status(200).json({
        success: true,
        updataCode
    })

})

export const checkCode = catchAsync(async (req, res, next) => {
    const { code } = req?.body
    const disCountCode = await DiscountCode.findOne({ code })
    const now = Date.now()

    if (!disCountCode || !disCountCode.isActive) {
        return next(new HandleERROR("code is valid", 400))
    }
    if (disCountCode.userUse.includes(req?.id)) {
        return next(new HandleERROR('you already used this discont Code ', 400))
    }
    if (disCountCode.expire.getTime() > now && disCountCode.startTime.getTime() < now) {
        const updataCart = await Cart.findOneAndUpdate({ userId: req.id }, {
            disConut: {
                code: disCountCode.code,
                percent: disCountCode.persentage

            }
        }, { new: true, runValidators: true })
        return res.status(200).json({
            success: true,
            Cart: updataCart
        })
    } else {
        return next(new HandleERROR('you not current this discont code ', 400))

    }

})