import express from "express";
import mongoose from "mongoose";
import routes from "./routes";
import cors from "cors";
import dotenv from "dotenv";
import path from "path"; // Importando o módulo 'path' para manipulação de caminhos

// Carrega as variáveis de ambiente
dotenv.config();

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
    // Serve arquivos estáticos da pasta 'view'
    this.server.use(express.static(path.join(__dirname, "view"))); // Atualize para o caminho correto da pasta 'view'

    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    // Rota para servir o arquivo index.html diretamente ao acessar a raiz '/'
    this.server.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "view", "index.html")); // Atualize para o caminho correto da pasta 'view'
    });

    this.server.use(routes);
  }
}

export default new App().server;
