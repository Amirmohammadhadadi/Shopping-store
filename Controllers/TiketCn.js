import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Ticket from "../Model/ticketModel.js";

export const createTiket = catchAsync(async (req, res, next) => {
    const { title, text } = req?.body
    const { id } = req
    let now = new Date().toISOString()
    const tiket = await Ticket.create({
        userId: id,
        title,
        status: "pending",
        messages: [
            {
                text,
                time: now,
                senderType: req.role,
                sender: id,
                seen: false
            }
        ]
    })
    return res.status(200).json({
        success: true,
        messages: " crrate tiket successfuly",
        tiket
    })



})
export const updataTiket = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const { text } = req?.body
    const now = new Date().toISOString()
    const tiket = await Ticket.findByIdAndUpdate(id, {
        $push: {
            messages: {
                text,
                time: now,
                senderType: req.role,
                sender: req.id,
                seen: false
            }
        }
    }, { new: true, runValidators: true })

    return res.status(200).json({
        success: true,
        messages: " updata tiket successfuly",
        tiket
    })

})

export const getAllTiket = catchAsync(async (req, res, next) => {
    const { role } = req
    if (role == "user") {
        const result = new ApiFeatures(Ticket, req.qurey, req.role)
            .filter()
            .sort()
            .limitFields()
            .paginate()
            .populate()
            .execute()
            .addManualFilters({ userId: req.id })
        return res.status(200).json({ result })
    }
    if ((role == "admin" || role == "superAdmin") && req.permission.includes("ticket")) {
        const result = new ApiFeatures(Ticket, req.qurey, req.role)
            .filter()
            .sort()
            .limitFields()
            .paginate()
            .populate()
            .execute()
        return res.status(200).json({ result })

    }
    return next(new HandleERROR("you don't have permission ", 400))
})

export const getOneTiket = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const { role } = req

    const tiket = await Ticket.findById(id)
    if (!tiket) {
        return next(new HandleERROR("Ticket not found", 404))
    }

    if (tiket.userId.toString() === req.id) {
        tiket.messages = tiket.messages.map((e) => {
            if (e.sender.toString() !== req.id) {
                e.seen = true
            }
            return e
        })
        await tiket.save()
        return res.status(200).json({ success: true, tiket })
    }

    if ((role === "admin" || role === "superAdmin") && req.permission.includes("ticket")) {
        tiket.messages = tiket.messages.map((e) => {
            if (e.senderType === "User") {
                e.seen = true
            }
            return e
        })
        await tiket.save()
        return res.status(200).json({ success: true, tiket })
    }

    return next(new HandleERROR("you don't have permission", 400))
})

