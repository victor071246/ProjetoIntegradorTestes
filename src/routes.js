import { Router } from "express";
import ProductsController from "./controllers/ProductsController";

const routes = new Router();

routes.get("/products", ProductsController.index);
routes.get("/products/:product_id", ProductsController.show);
routes.post("/products", ProductsController.store);
routes.put("/products/:product_id", ProductsController.update);
routes.delete("/products/:product_id", ProductsController.destroy);

export default routes;
