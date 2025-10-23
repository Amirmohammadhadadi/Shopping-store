import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "title is required"],
  },
  status: {
    type: String,
    enum: ["pending", "ananswered", "closed"],
  },
  messages: [
    {
      text: {
        type: String,
        required: [true, "text is required"],
      },
      time: {
        type: Date,
        default: Date.now,
      },
      senderType: {
        type: String,
        required: true,
        enum: ["User", "Admin"],
      },
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "messages.senderType",
      },
      seen: {
        type: Boolean,
        default: false
      }
    },
  ],
}, { timestamps: true });



const Ticket = mongoose.model("Ticket", ticketSchema)


export default Ticket 
