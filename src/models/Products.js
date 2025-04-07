import { model, Model, Schema } from "mongoose";

const ProductsSchema = new Schema({
  title: String,
  text: String,
  image_url: String,
});

export default model("Products", ProductsSchema);
