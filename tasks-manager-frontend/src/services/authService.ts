import api from "./api";
import type { User, RegisterUserDTO } from "../models/User";

const controller = "/auth";

const authService = {
  async login(username: string, password: string): Promise<User> {
    const response = await api.post(`${controller}/login`, {
      username,
      password,
    });

    if (response.status !== 200) throw new Error("Usuario e senha invalido");

    return response.data;
  },

  async register(user: RegisterUserDTO): Promise<boolean> {
    try {
      const response = await api.post(`${controller}/register`, user);

      if (response.status != 200) {
        throw new Error("Erro ao registrar o usuario");
      }

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
};

export default authService;
