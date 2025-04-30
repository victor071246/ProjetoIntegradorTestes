import { model, Schema } from "mongoose";

const ProductsSchema = new Schema({
  title: String,
  subtitle: String,
  shop_title: String,
  price: String,
  text: String,
  image_url: String,
});

export default model("Products", ProductsSchema);
