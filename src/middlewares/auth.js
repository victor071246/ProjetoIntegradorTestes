export default function auth(req, res, next) {
  if (!req.session.userId) {
    // Se não estiver logado, redireciona para o login
    return res.redirect("/loginView");
  }

  // Se estiver logado, continua
  next();
}
