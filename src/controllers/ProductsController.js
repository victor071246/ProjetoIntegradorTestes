import Products from "../models/Products";

class ProductsController {
  async index(req, res) {
    const products = await Products.find();

    return res.json(products);
  }

  async show(req, res) {
    const { product_id } = req.params;
    const product = await Products.findById(product_id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.json(product);
  }

  async store(req, res) {
    const {
      title,
      subtitle,
      shop_title,
      color1,
      color2,
      price,
      text,
      image_url,
    } = req.body;

    // Cria o produto com os dados recebidos
    const product = await Products.create({
      title,
      subtitle,
      shop_title,
      color1,
      color2,
      price,
      text,
      image_url,
    });

    console.log("Produto criado:", product);

    return res.json(product);
  }

  async update(req, res) {
    const { product_id } = req.params;
    const {
      title,
      subtitle,
      shop_title,
      color1,
      color2,
      price,
      text,
      image_url,
    } = req.body;

    const product = await Products.updateOne(
      { _id: product_id },
      {
        title,
        subtitle,
        shop_title,
        color1,
        color2,
        price,
        text,
        image_url,
      }
    );

    return res.json({ product });
  }

  async destroy(req, res) {
    const { product_id } = req.params;
    const product = await Products.findById(product_id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await product.deleteOne();
    return res
      .status(200)
      .json({ message: "Product deleted successfully", title: product.title });
  }
}

export default new ProductsController();
