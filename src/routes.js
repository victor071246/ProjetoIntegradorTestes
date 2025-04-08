import { Router } from "express";
import ProductsController from "./controllers/ProductsController";

const routes = new Router();

routes.get("/products", ProductsController.index);
routes.post("/products", ProductsController.store);
routes.delete("/products/:product_id", ProductsController.destroy);

export default routes;
