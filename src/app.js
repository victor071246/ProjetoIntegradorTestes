import express from "express";
import mongoose from "mongoose";
import routes from "./routes";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

class App {
  constructor() {
    this.server = express();

    const mongoURI = process.env.MONGO_URI;

    mongoose.connect(mongoURI);

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
