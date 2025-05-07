import { Router } from "express";
import ProductsController from "./controllers/ProductsController.js";
import auth from "./middlewares/auth.js";
import SessionController from "./controllers/SessionController.js";
import path from "path";

const routes = new Router();

routes.get("/logout", SessionController.logout);
routes.get("/loginView", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "src", "view", "public", "login.html")
  );
});
routes.get("/dashboard", auth, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "src", "view", "add_product.html"));
});
routes.post("/login", SessionController.login);
// routes.post("/createUser", SessionController.createUser);

routes.get("/products", auth, ProductsController.index);
routes.get("/products/:product_id", auth, ProductsController.show);
routes.post("/products", auth, ProductsController.store);
routes.put("/products/:product_id", auth, ProductsController.update);
routes.delete("/products/:product_id", auth, ProductsController.destroy);

export default routes;
