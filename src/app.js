import express from "express";
import mongoose from "mongoose";
import routes from "./routes";
import cors from "cors";
import dotenv from "dotenv";

// Carrega as variáveis de ambiente
dotenv.config();

// Verifique se a variável MONGO_URI foi carregada
console.log("MONGO_URI:", process.env.MONGO_URI); // Isso deve imprimir o valor da variável de ambiente

class App {
  constructor() {
    this.server = express();

    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      console.error("MONGO_URI não está definido!");
      process.exit(1); // Encerra o processo caso a variável não esteja definida
    }

    mongoose
      .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log("Conectado ao MongoDB com sucesso!"))
      .catch((err) => {
        console.error("Erro ao conectar ao MongoDB:", err);
        process.exit(1);
      });

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
