import express from "express";
import mongoose from "mongoose";
import routes from "./routes";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import session from "express-session";
import MongoStore from "connect-mongo";

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
    this.server.use(express.static(path.join(__dirname, "view", "public")));

    this.server.use(
      cors({
        origin: true, // reflexivo: pega o origin da requisição
        credentials: true, // permite cookies
      })
    );

    this.server.use(express.json());

    // Sessão
    this.server.use(
      session({
        secret: process.env.SESSION_SECRET || "umSegredoForte", // Troque por uma variável de ambiente real
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
          mongoUrl: process.env.MONGO_URI,
        }),
        cookie: {
          maxAge: 1000 * 60 * 60, // 1 hora
        },
      })
    );
  }

  routes() {
    // Rota para servir o arquivo index.html diretamente ao acessar a raiz '/'
    this.server.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "view", "index.html"));
    });

    this.server.use(routes);
  }
}

export default new App().server;
