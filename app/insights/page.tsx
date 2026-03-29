"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Insights() {
  const router = useRouter();

  const [dados, setDados] = useState({
    totalAnuncios: 0,
    totalLikes: 0,
    mediaLikes: 0,
    positivos: 0,
    negativos: 0
  });

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");

    const anuncios = JSON.parse(localStorage.getItem("anuncios") || "[]");

    const meus = anuncios.filter((a: any) => a.usuario === usuario);

    const totalAnuncios = meus.length;

    const totalLikes = meus.reduce(
      (acc: number, a: any) => acc + (a.likes || 0),
      0
    );

    const mediaLikes =
      totalAnuncios > 0 ? Math.floor(totalLikes / totalAnuncios) : 0;

    const positivos = meus.filter((a: any) => (a.likes || 0) >= 5).length;
    const negativos = meus.filter((a: any) => (a.likes || 0) < 5).length;

    setDados({
      totalAnuncios,
      totalLikes,
      mediaLikes,
      positivos,
      negativos
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center py-16">

      <div className="bg-white w-[900px] rounded-xl shadow p-8">

        <h1 className="text-2xl font-bold mb-6 text-[#1A1A1A]">
          Insights
        </h1>

        <div className="flex justify-between">

          {/* ESQUERDA */}
          <div className="flex flex-col gap-3 w-[400px] text-[#1A1A1A] text-xl">

            <div className="bg-cyan-400 px-4 py-2 rounded-md flex justify-between font-semibold shadow">
              <span>Total de anúncios</span>
              <span>{dados.totalAnuncios}</span>
            </div>

            <div className="bg-green-400 px-4 py-2 rounded-md flex justify-between font-semibold shadow">
              <span>🔥 Curtidas</span>
              <span>{dados.totalLikes}</span>
            </div>

            <div className="bg-yellow-400 px-4 py-2 rounded-md flex justify-between font-semibold shadow">
              <span>Média de curtidas</span>
              <span>{dados.mediaLikes}</span>
            </div>

            <div className="bg-purple-400 px-4 py-2 rounded-md flex justify-between font-semibold shadow">
              <span>Anúncios positivos</span>
              <span>{dados.positivos}</span>
            </div>

            <div className="bg-red-400 px-4 py-2 rounded-md flex justify-between font-semibold shadow">
              <span>Anúncios negativos</span>
              <span>{dados.negativos}</span>
            </div>

          </div>

          {/* DIREITA */}
          <div className="text-gray-800 leading-7 text-lg w-[350px]">

            <p><b>Total de anúncios:</b> {dados.totalAnuncios}</p>
            <p><b>Total de curtidas:</b> {dados.totalLikes}</p>
            <p><b>Média por anúncio:</b> {dados.mediaLikes}</p>

            <button
              className={`mt-6 w-[300px] px-6 py-2 rounded-md shadow font-semibold flex items-center gap-2
              ${dados.mediaLikes >= 5 ? "bg-green-500" : "bg-red-500"}`}
            >
              {dados.mediaLikes >= 5
                ? "Anúncio está positivo ✔"
                : "Anúncio precisa melhorar ⚠"}
            </button>

          </div>

        </div>
      </div>

      {/* VOLTAR */}
      <button
        onClick={() => router.back()}
        className="bg-orange-500 hover:bg-orange-600 transition px-6 py-2 rounded-md mt-8 font-semibold shadow"
      >
        ← Voltar
      </button>

    </div>
  );
}