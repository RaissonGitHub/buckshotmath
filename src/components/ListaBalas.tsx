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
    const removendoCor = cores[indice] === cor;
    const marcou = marcarShell(indice, cor);

    if (marcou) {
      setCores((coresAtuais) => {
        if (removendoCor) {
          const novasCores = { ...coresAtuais };
          delete novasCores[indice];
          return novasCores;
        }

        return { ...coresAtuais, [indice]: cor };
      });
    }
  };

  return (
    <div
      className="flex h-43 w-[calc(100vw-2rem)] max-w-74   items-center md:h-37 border border-white bg-repeat lg:h-33"
      style={{ backgroundImage: `url(${textura})` }}
    >
      {Array.from({ length: qtdBalas }, (_, i) => (
        <div
          key={i}
          className="flex shrink-0 flex-col items-center justify-center border-2 border-white lg:gap-0"
        >
          <span className="text-black absolute text-3xl font-bold">
            {i + 1}
          </span>
          <img
            src={
              balaAtirada[i]
                ? balaAtirada[i].tipo === "blank"
                  ? balazul
                  : balavermelha
                : cores[i]
                  ? cores[i] === "blank"
                    ? balazul
                    : balavermelha
                  : balabranca
            }
            alt=""
            className="h-23 w-auto object-contain lg:h-24 md:h-24"
          />
          <button
            type="button"
            title="Mark as live shell"
            aria-label="Mark as live shell"
            className="hover:cursor-pointer lg:text-sm lg:leading-4 hover:text-[1em]"
            onClick={() => definirCor(i, "live")}
          >
            🟥
          </button>
          <button
            type="button"
            title="Mark as blank shell"
            aria-label="Mark as blank shell"
            className="hover:cursor-pointer lg:text-sm lg:leading-4 hover:text-[1em]"
            onClick={() => definirCor(i, "blank")}
          >
            🟦
          </button>
        </div>
      ))}
    </div>
  );
}
