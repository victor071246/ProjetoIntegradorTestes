import User from "../models/User";

class LoginController {
  async store(req, res) {
    const { login, password } = req.body;

    // Verificando se o usuário existe
    const user = await User.findOne({ login });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Aqui estamos fazendo uma comparação direta (sem segurança)
    if (user.password !== password) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Retorna os dados do usuário
    return res.json({
      message: "Login successful",
      user: {
        email: user.email,
        id: user._id,
      },
    });
  }
}
