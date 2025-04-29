import app from "./app";

// Use a porta definida pelo Render ou 3333 localmente
const port = process.env.PORT || 3333;

const server = app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

server.on("error", (error) => {
  console.error("Erro ao iniciar o servidor:", error);
});

export default app;
