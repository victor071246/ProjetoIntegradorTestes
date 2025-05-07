import User from "../models/User";

class LoginController {
  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    const validPassword = await user.checkPassword(password);
    if (!validPassword) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    req.session.userId = user._id;
    // return res.redirect("/dashboard"); // ou sua rota de CRUD
    return res.status(200).json({ ok: "true" });
  }

  async createUser(req, res) {
    const { email, password } = req.body;

    // Cria o produto com os dados recebidos
    const user = await User.create({
      email,
      password,
    });

    console.log("Usuário criado", user);

    return res.json(user);
  }

  logout(req, res) {
    req.session.destroy(() => {
      res.clearCookie("connect.sid"); // limpa o cookie de sessão
      res.redirect("/loginView"); // uma página estática em view/login.html, por exemplo
    });
  }
}

export default new LoginController();
