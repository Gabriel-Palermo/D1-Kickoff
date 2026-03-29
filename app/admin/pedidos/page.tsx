"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, X, ArrowLeft } from "lucide-react";

type Pedido = {
  modelo: string;
  ano: number;
  km: string;
  avista: string;
  usuario: string;
  placa: string;
  imagens: string[];
  status: string;
};

export default function Pedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    const anuncios: Pedido[] = JSON.parse(
      localStorage.getItem("anuncios") || "[]"
    );

    const pendentes = anuncios.filter((a) => a.status === "pendente");

    setPedidos(pendentes);
  }, []);

  const atualizarStatus = (index: number, status: string) => {
    const anuncios: Pedido[] = JSON.parse(
      localStorage.getItem("anuncios") || "[]"
    );

    const pedido = pedidos[index];

    const iReal = anuncios.findIndex(
      (a) =>
        a.modelo === pedido.modelo &&
        a.usuario === pedido.usuario &&
        a.placa === pedido.placa
    );

    if (iReal !== -1) {
      anuncios[iReal].status = status;
      localStorage.setItem("anuncios", JSON.stringify(anuncios));
    }

    setPedidos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center py-10 min-h-screen text-[#1A1A1A]">
      {/* CARD PRINCIPAL */}
      <div className="bg-white w-full max-w-[900px] rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Conferir pedidos de anúncios
        </h1>

        {/* LISTA */}
        <div className="max-h-[400px] overflow-y-auto space-y-4 pr-2 text-xl">
          {pedidos.map((p, i) => (
            <div
              key={i}
              className="grid grid-cols-[300px_300px_1fr] items-center border-b pb-4"
            >
              {/* ESQUERDA */}
              <div className="flex items-center gap-5">
                <img
                  src={p.imagens?.[0] || "/images/default.jpg"}
                  className="w-32 h-24 object-cover rounded"
                  alt={p.modelo}
                />

                <div className="text-sm">
                  <p><b>Modelo:</b> {p.modelo}</p>
                  <p><b>Ano:</b> {p.ano}</p>
                  <p><b>Km:</b> {p.km}</p>
                </div>
              </div>

              {/* AÇÕES */}
              <div className="flex items-center gap-3 justify-center">
                <button
                  onClick={() => atualizarStatus(i, "aprovado")}
                  className="bg-green-500 hover:bg-green-600 p-2 rounded text-white"
                >
                  <Check size={18} />
                </button>

                <button
                  onClick={() => atualizarStatus(i, "rejeitado")}
                  className="bg-red-500 hover:bg-red-600 p-2 rounded text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* DIREITA */}
              <div className="text-sm">
                <p><b>Valor:</b> R$ {p.avista}</p>
                <p><b>Vendedor:</b> {p.usuario}</p>
                <p><b>Placa:</b> {p.placa}</p>
              </div>
            </div>
          ))}

          {pedidos.length === 0 && (
            <p className="text-center text-gray-500 mt-4">
              Nenhum pedido pendente
            </p>
          )}
        </div>
      </div>

      {/* CARD DE RESUMO */}
      <div className="bg-white w-full max-w-[900px] mt-6 rounded-xl shadow-md p-4 flex justify-between items-center">
        <div className="bg-[#00C2CB] px-6 py-2 rounded-lg font-semibold hover:bg-[#00B0B5] transition text-xl">
          Total solicitações de anúncios
          <span className="ml-4 font-bold">{pedidos.length}</span>
        </div>

        <span className="text-sm text-gray-600">
          {new Date().toLocaleDateString()}
        </span>
      </div>

      {/* BOTÃO VOLTAR */}
      <Link href="/" className="mt-8">
        <button className="bg-[#FF6A00] hover:bg-[#e65c00] px-6 py-2 rounded-lg flex items-center gap-2 text-white">
          <ArrowLeft size={18} />
          Voltar
        </button>
      </Link>
    </div>
  );
}