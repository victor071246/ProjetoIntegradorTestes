import { model, Schema } from "mongoose";

const ProductsSchema = new Schema({
  title: String,
  subtitle: String,
  shop_title: String,
  color1: String,
  color2: String,
  price: String,
  text: String,
  image_url: String,
});

export default model("Products", ProductsSchema);
