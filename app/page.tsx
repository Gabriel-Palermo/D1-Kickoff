"use client";

import { CarCard } from "./components/features/CarCard";
import { useBusca } from "@/app/context/BuscaContext";
import { useEffect, useState } from "react";

export default function Home() {

  const { busca } = useBusca();
  const [carros, setCarros] = useState<any[]>([]);

  useEffect(() => {
    const anuncios = JSON.parse(localStorage.getItem("anuncios") || "[]");

    const aprovados = anuncios.filter((a: any) => a.status === "aprovado");

    const formatados = aprovados.map((a: any) => ({
      ...a, // Mantém TODOS os dados
      nome: a.modelo || "Sem nome",
      imagem: a.imagens?.[0] || "/images/sem-imagem.png",
      likes: a.likes || 0
    }));

    setCarros(formatados);
  }, []);

  const carrosFiltrados = carros.filter((carro) =>
    (carro.nome || "")
      .toLowerCase()
      .includes((busca || "").toLowerCase())
  );

  return (
    <div className="flex flex-col items-center">

      <div className="grid grid-cols-4 gap-6 mt-6">
        {carrosFiltrados.map((carro, i) => (
          <CarCard
            key={carro.id || i}
            index={i}
            carro={carro}
          />
        ))}
      </div>

      {carrosFiltrados.length === 0 && (
        <p className="text-gray-500 mt-4">Nenhum carro encontrado</p>
      )}

      {/* PAGINAÇÃO */}
      <div className="flex gap-4 mt-10 items-center">
        <button
          className="bg-[#FF6A00] text-black px-4 py-2 rounded hover:bg-[#FF6A00]/80"
          onClick={() => alert("Não possui mais páginas")}
        >
          Próximo
        </button>

        <span className="text-[#1A1A1A] hover:text-[#00C2CB]">1</span>
        <span className="text-[#1A1A1A] hover:text-[#00C2CB]">2</span>
        <span className="text-[#1A1A1A] hover:text-[#00C2CB]">3</span>

        <button className="bg-orange-500 text-[#1A1A1A] px-3 py-2 rounded hover:bg-orange-400">
          &gt;
        </button>
      </div>

    </div>
  );
}