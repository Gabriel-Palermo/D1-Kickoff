"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AnuncioDetalhe() {

  const [tipo, setTipo] = useState<string | null>(null);
  const router = useRouter();
  const [anuncio, setAnuncio] = useState<any>(null);
  const searchParams = useSearchParams();
  const [enviado, setEnviado] = useState(false);
  const [mostrarOfertas, setMostrarOfertas] = useState(false);

  useEffect(() => {
    const userTipo = localStorage.getItem("tipo");

    if (!userTipo) {
      alert("Você precisa estar logado para ver este anúncio!");
      router.push("/login");
      return;
    }

    setTipo(userTipo);

    const id = searchParams.get("id");

    if (id !== null) {
      const anuncios = JSON.parse(localStorage.getItem("anuncios") || "[]");
      const selecionado = anuncios[Number(id)];

      setAnuncio(selecionado);
    }

    const data = localStorage.getItem("anuncioSelecionado");

    if (data) {
      setAnuncio(JSON.parse(data));
    }

  }, [searchParams]);

  if (!tipo || !anuncio) return null;
  if (!anuncio) return null;

  return (
    <div className="flex flex-col items-center py-10 min-h-screen text-[#1A1A1A]">

      {/* CARD PRINCIPAL */}
      <div className="bg-white w-full max-w-[900px] rounded-2xl shadow-lg p-6 flex gap-8">

        {/* IMAGEM */}
        <img
          src={anuncio.imagem || "/images/default.jpg"}
          className="w-[400px] h-[260px] object-cover rounded-lg border"
        />

        {/* INFO */}
        <div className="flex flex-col justify-between">

          <div>
            <h1 className="text-3xl font-bold mb-4">
              {anuncio.nome}
            </h1>

            <div className="grid grid-cols-2 gap-x-20 gap-y-2 text-sm">
              <p><b>Ano:</b> {anuncio.ano}</p>
              <p><b>Km:</b> {anuncio.km}</p>
              <p><b>Cidade:</b> {anuncio.cidade} - {anuncio.uf}</p>
              <p><b>Cor:</b> {anuncio.cor}</p>
              <p><b>Combustível:</b> {anuncio.combustivel}</p>
              <p><b>Câmbio:</b> {anuncio.cambio}</p>
            </div>
          </div>

          {/* PREÇO */}
          <div className="mt-4">
            <div className="bg-[#00C2CB] text-center py-3 rounded-lg text-xl font-bold">
              R$ {anuncio.avista}
            </div>

            <button
              onClick={() => setMostrarOfertas(!mostrarOfertas)}
              className="mt-3 bg-yellow-400 hover:bg-yellow-500 w-full py-2 rounded font-semibold"
            >
              {mostrarOfertas ? "Ocultar ofertas" : "Ver mais ofertas do vendedor"}
            </button>

            {mostrarOfertas && (
              <div className="mt-3 space-y-2 text-sm">

                {anuncio.aprazo && (
                  <div className="bg-yellow-100 p-2 rounded">
                    <b>À prazo:</b> R$ {anuncio.aprazo}
                    {anuncio.parcelas && ` em ${anuncio.parcelas}x`}
                  </div>
                )}

                {anuncio.outros && (
                  <div className="bg-purple-100 p-2 rounded">
                    <b>Outros:</b> R$ {anuncio.outros}
                  </div>
                )}

              </div>
            )}

          </div>

        </div>
      </div>

      {/* CONTATO */}
      <div className="bg-white w-full max-w-[900px] mt-4 rounded-xl shadow-md p-4 flex gap-4">

        <div className="flex flex-col gap-2 w-1/3">
          <input placeholder="Nome*" className="border p-2 rounded" />
          <input placeholder="E-mail*" className="border p-2 rounded" />
          <input placeholder="Telefone*" className="border p-2 rounded" />
        </div>

        <textarea
          className="border p-2 border-black rounded w-2/3 text-sm text-gray-700"
          defaultValue="Olá, tenho interesse no veículo. Por favor entre em contato."
        />

        <button
          onClick={() => setEnviado(true)}
          className="bg-green-500 hover:bg-green-600 text-[#1A1A1A] px-6 rounded font-bold"
        >
          Enviar mensagem
        </button>

        {enviado && (
          <p className="text-green-600 font-semibold mt-2">
            Mensagem enviada para o vendedor!
          </p>
        )}

      </div>

      {/* VOLTAR */}
      <Link href="/" className="mt-6">
        <button className="bg-[#FF6A00] px-6 py-2 rounded flex items-center gap-2">
          <ArrowLeft size={18}/>
          Voltar
        </button>
      </Link>

    </div>
  );
}