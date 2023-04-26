import mongoose from "mongoose";

const QuoteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const quoteModel = mongoose.model("Quote", QuoteSchema);

export default quoteModel;
