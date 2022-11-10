import mongoose from "mongoose";
import validator from "validator";
const NewsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    text: { type: String, required: true },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (val) => validator.isEmail(val),
        message: (props) => `${props.value} is not an email`,
      },
    },
  },
  { versionKey: false }
);
const News = mongoose.model("News", NewsSchema);
export default News;
