"use client";

import Link from "next/link";
import { ArrowLeft, User } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const router = useRouter();

  const handleLogin = () => {

    if (!usuario || !senha) {
      setErro("Preencha os campos");
      return;
    }

    // ADMIN
    if (usuario === "admin" && senha === "1234") {
      localStorage.setItem("tipo", "admin");
      localStorage.setItem("usuario", "Administrador");

      router.push("/admin");

      setTimeout(() => {
        window.location.reload();
      }, 100);

      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

    const userEncontrado = usuarios.find(
      (u: any) => u.usuario === usuario && u.senha === senha
    );

    if (!userEncontrado) {
      setErro("Usuário não possui cadastro");
      return;
    }

    localStorage.setItem("tipo", "user");
    localStorage.setItem("usuario", userEncontrado.nome);

    router.push("/");

    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] text-[#1A1A1A]">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 relative">

        {/* BOTÃO VOLTAR */}
        <Link href="/" className="absolute top-4 left-4 text-gray-600 hover:text-black">
          <ArrowLeft size={22} />
        </Link>

        {/* TÍTULO */}
        <div className="flex flex-col items-center mb-6">
          <User size={32} className="text-[#00C2CB] mb-2" />
          <h1 className="text-2xl font-bold text-[#1A1A1A]">LOGIN</h1>
        </div>

        {/* INPUT USUÁRIO */}
        <input
          value={usuario || ""}
          onChange={(e) => setUsuario(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded-lg text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#00C2CB]"
          placeholder="Usuário"
        />

        {/* INPUT SENHA */}
        <input
          type="password"
          value={senha || ""}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full mb-2 px-3 py-2 border rounded-lg text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#00C2CB]"
          placeholder="Senha"
        />

        {/* ERRO */}
        {erro && (
          <p className="text-red-500 text-sm mb-3">{erro}</p>
        )}

        {/* ESQUECI SENHA */}
        <p className="text-sm text-right text-gray-500 mb-4 hover:underline cursor-pointer">
          Esqueceu a senha?
        </p>

        {/* BOTÕES */}
        <div className="flex justify-between gap-3">
          <button
            onClick={handleLogin}
            className="bg-[#00C2CB] hover:bg-[#00aab3] text-white px-4 py-2 rounded-lg w-full transition text-[#1A1A1A]"
          >
            Entrar
          </button>

          <Link href="/cadastrar" className="w-full">
            <button className="bg-[#FF6A00] hover:bg-[#e65c00] text-white px-4 py-2 rounded-lg w-full transition text-[#1A1A1A] ">
              Cadastrar
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}