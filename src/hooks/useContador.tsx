import { useState } from "react";

export type Shell = "black" | "live";

export type Registro = {
  balaN: number;
  tipo: Shell;
};
export function useContador() {
  const [blank, setBlank] = useState<number>(0);
  const [live, setLive] = useState<number>(0);
  const [balaAtirada, setBalaAtirada] = useState<Registro[]>([]);
  const [shoot, setShoot] = useState<number>(1);
  const [block, setBlock] = useState<boolean>(false);
  const [resetId, setResetId] = useState<number>(0);
  const [marcadas, setMarcadas] = useState<Record<number, Shell>>({});

  const marcarShell = (indice: number, cor: Shell): boolean => {
    const corAnterior = marcadas[indice];
    const quantidadeMarcada = Object.values(marcadas).filter(
      (corMarcada) => corMarcada === cor,
    ).length;
    const quantidadeDisponivel = cor === "live" ? live : blank;

    if (corAnterior !== cor && quantidadeMarcada >= quantidadeDisponivel) {
      return false;
    }

    setMarcadas((valoresAtuais) => ({ ...valoresAtuais, [indice]: cor }));
    return true;
  };

  const onClickUpVermelha = (): void => {
    if (live < 4 && !block) {
      setLive(live + 1);
    }
  };
  const onClickUpAzul = (): void => {
    if (blank < 4 && !block) {
      setBlank(blank + 1);
    }
  };

  const onClickDownVermelha = (): void => {
    if (live > 0) {
      setLive(live - 1);
      setShoot(shoot + 1);
      setBalaAtirada((a) => [...a, { balaN: shoot, tipo: "live" }]);
      console.log({ balaN: shoot, tipo: "live" });
      console.log(balaAtirada);
      setBlock(true);
    }
  };
  const onClickDownAzul = (): void => {
    if (blank > 0) {
      setBlank(blank - 1);
      setShoot(shoot + 1);
      setBalaAtirada((a) => [...a, { balaN: shoot, tipo: "black" }]);
      setBlock(true);
    }
  };

  const reset = (): void => {
    setBlank(0);
    setLive(0);
    setBalaAtirada([]);
    setShoot(1);
    setBlock(false);
    setMarcadas({});
    setResetId((valor) => valor + 1);
  };

  return {
    blank,
    live,
    shoot,
    reset,
    onClickDownAzul,
    onClickDownVermelha,
    onClickUpAzul,
    onClickUpVermelha,
    balaAtirada,
    marcarShell,
    resetId,
    marcadas,
  };
}
