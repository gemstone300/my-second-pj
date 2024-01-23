import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  someId: mongoose.Schema.Types.ObjectId,
});

export default mongoose.model("ProductInfo", productSchema);
