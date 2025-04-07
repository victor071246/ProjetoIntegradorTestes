import Products from "../models/Products";

class ProductsController {
  async index(req, res) {
    const products = await Products.find();

    return res.json(products);
  }

  async store(req, res) {
    const { title, text, img_url } = req.body;

    const product = await Products.create({ title, text, img_url });

    return res.json(product);
  }
}

export default new ProductsController();
