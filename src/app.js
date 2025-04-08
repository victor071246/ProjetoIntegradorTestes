import express from "express";
import mongoose from "mongoose";
import routes from "./routes";
import cors from "cors";

class App {
  constructor() {
    this.server = express();

    mongoose.connect(
      "mongodb+srv://victor:1234@devhouse.q3nlofo.mongodb.net/ProjetoIntegrador?retryWrites=true&w=majority&appName=devhouse"
    );

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
