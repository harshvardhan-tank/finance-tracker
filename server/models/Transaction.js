import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Type (income or expense) is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0.01, "Amount must be greater than 0"],
    },
    category: { type: String, required: [true, "Category is required"], trim: true },
    date: { type: Date, required: [true, "Date is required"], default: Date.now },
    notes: { type: String, trim: true, maxlength: 200, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
