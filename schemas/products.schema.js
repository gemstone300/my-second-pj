import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      //enum: ["FOR SALE", "SOLD_OUT"],
      //default: "FOR_SALE",
    },
    password: {
      type: String,
      required: true,
    },

    createdAt: { type: Date, default: Date.now },
    someId: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true },
);

export default mongoose.model("ProductInfo", productSchema);
