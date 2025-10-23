import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Comment from "../Model/commentModel.js"

export const createComment = catchAsync(async (req, res, next) => {
    const { desc, productId } = req?.body
    const { id: userId } = req

    const createComment = await Comment.create({
        desc,
        productId,
        userId
    })
    return res.status(200).json({
        success: true,
        createComment
    })
})

export const getAllComment = catchAsync(async (req, res, next) => {
    const { role, id: userId, permission = [] } = req
    if (
        (role == "admin" || role == "superAdmin") && permission.includes("comment")
    ) {
        const result = new ApiFeatures(Comment, req.query, role)
            .filter()
            .sort()
            .limitFields()
            .paginate()
            .populate()
            .execute();
        return res.status(200).json(result)
    } else if (role == "user") {
        const result = new ApiFeatures(Comment, req.query, role)
            .filter()
            .sort()
            .limitFields()
            .paginate()
            .populate()
            .execute()
            .addManualFilters({ isPublished: true })
        return res.status(200).json(result)
    } else {
        return next(new HandleERROR("you dont have permission "))
    }


})

export const getOneComment = catchAsync(async (req, res, next) => {
    const { id } = req?.params
    const { role, id: userid, permission = [] } = req
    const result = await Comment?.findById({ id }).populate(['userId', 'productId'])
    if (((role == "admin" || role == "superAdmin") && permission.includes("comment")) || userid == result?.userId) {
        return res.status(200).json({
            success: true,
            result
        })
    } else {
        return next(new HandleERROR("you dont have permission "))
    }
})

export const updateComment = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const { desc, isPublished } = req?.body

    const comment = await Comment.findByIdAndUpdate(id, { desc, isPublished }, { new: true, runValidators: true }).populate(["userId", "productId"])
    return res.status(200).json({
        success: true,
        comment
    })


})

export const deleteComment = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const comment = await Comment.findByIdAndDelete(id)
    return res.status(200).json({
        success: true,
        message: "comment is deleted "
    })
})

