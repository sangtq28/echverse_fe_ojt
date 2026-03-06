import { http } from "../../../services/http";
import type { LoginRequest, LoginResponse } from "../types";

export async function loginApi(body: LoginRequest) {
  const res = await http.post<LoginResponse>("api/auth/login", body);
  return res.data;
}
