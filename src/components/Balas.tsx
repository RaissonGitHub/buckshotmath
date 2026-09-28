type BalaProps = {
  imagem: string;
  quantidade: number;
  ladoBotoes: "esquerdo" | "direito";
  onClickUp: () => void;
  onClickDown: () => void;
};

export default function Balas({
  imagem,
  quantidade,
  ladoBotoes,
  onClickUp,
  onClickDown,
}: BalaProps) {
  const botoes = (
    <div className="flex flex-col w-1/2 justify-center items-center gap-3">
      <button
        className="h-16 w-16 border-4 border-[#2b211d] bg-[#d8c6ae] text-3xl leading-none text-[#241b18] shadow-[4px_5px_0_#241b18,0_0_0_2px_#8f7d6c_inset] transition-transform hover:-translate-y-0.5 hover:bg-[#e3d2bc] active:translate-y-1 active:shadow-[2px_2px_0_#241b18,0_0_0_2px_#8f7d6c_inset]"
        onClick={onClickUp}
        aria-label="Adicionar bala"
      >
        ↑
      </button>
      <button
        className="h-16 w-16 border-4 border-[#2b211d] bg-[#d8c6ae] text-3xl font-bold leading-none text-[#241b18] shadow-[4px_5px_0_#241b18,0_0_0_2px_#8f7d6c_inset] transition-transform hover:-translate-y-0.5 hover:bg-[#e3d2bc] active:translate-y-1 active:shadow-[2px_2px_0_#241b18,0_0_0_2px_#8f7d6c_inset]"
        onClick={onClickDown}
        aria-label="Remover bala"
      >
        ↓
      </button>
    </div>
  );

  const contador = (
    <div className="w-1/2 flex flex-col items-center justify-center">
      <img src={imagem} alt="" className="w-1/5" />
      <span>Contagem</span>
      <span>{quantidade}</span>
    </div>
  );

  return (
    <div className="flex min-w-[9rem] flex-1 items-center justify-center">
      {ladoBotoes === "esquerdo" ? botoes : contador}
      {ladoBotoes === "esquerdo" ? contador : botoes}
    </div>
  );
}
