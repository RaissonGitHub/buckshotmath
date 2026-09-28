import balazul from "../assets/balaazul.png";
import balavermelha from "../assets/balavermelha.png";
import balabranca from "../assets/balabranca.png";
import textura from "../assets/textura.png";
import { useState } from "react";

import type { Registro, Shell } from "../hooks/useContador";

type ListaBalasProp = {
  qtdBalas: number;
  marcarShell: (indice: number, cor: Shell) => boolean;
  balaAtirada: Registro[];
};

export default function ListaBalas({
  qtdBalas,
  balaAtirada,
  marcarShell,
}: ListaBalasProp) {
  const [cores, setCores] = useState<Record<number, "blank" | "live">>({});

  const definirCor = (indice: number, cor: "blank" | "live") => {
    const marcou = marcarShell(indice, cor === "blank" ? "black" : "live");

    if (marcou) {
      setCores((coresAtuais) => ({ ...coresAtuais, [indice]: cor }));
    }
  };

  return (
    <div
      className="flex h-43 w-[calc(100vw-2rem)] max-w-91 items-center border border-white bg-repeat lg:h-32"
      style={{ backgroundImage: `url(${textura})` }}
    >
      {Array.from({ length: qtdBalas }, (_, i) => (
        <div
          key={i}
          className="flex shrink-0 flex-col items-center justify-center border-2 border-white"
        >
          <img
            src={
              balaAtirada[i]
                ? balaAtirada[i].tipo === "black"
                  ? balazul
                  : balavermelha
                : cores[i]
                  ? cores[i] === "blank"
                    ? balazul
                    : balavermelha
                  : balabranca
            }
            alt=""
            className="h-30 w-auto object-contain lg:h-24"
          />
          <button
            className="hover:cursor-pointer"
            onClick={() => definirCor(i, "live")}
          >
            🟥
          </button>
          <button
            className="hover:cursor-pointer"
            onClick={() => definirCor(i, "blank")}
          >
            🟦
          </button>
        </div>
      ))}
    </div>
  );
}
