import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema({
  email: String,
  password: String,
});

// Criptografa antes de salvar
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Método para comparar senha
UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export default model("User", UserSchema);
