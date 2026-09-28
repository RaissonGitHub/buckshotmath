import "./App.css";
import Balas from "./components/Balas";
import balazul from "./assets/balaazul.png";
import balavermelha from "./assets/balavermelha.png";
import { useContador } from "./hooks/useContador";
import ListaBalas from "./components/ListaBalas";
function App() {
  const {
    blank,
    live,
    shoot,
    onClickDownAzul,
    onClickDownVermelha,
    onClickUpAzul,
    onClickUpVermelha,
    reset,
    balaAtirada,
    marcarShell,
    resetId,
    marcadas,
  } = useContador();
  const qtdBalas = blank + live + balaAtirada.length;
  const indiceAtual = balaAtirada.length;
  const corAtual = marcadas[indiceAtual];
  const marcadasFuturas = Object.entries(marcadas).filter(
    ([indice]) => Number(indice) >= indiceAtual,
  );
  const liveConhecidas = marcadasFuturas.filter(
    ([, cor]) => cor === "live",
  ).length;
  const blankConhecidas = marcadasFuturas.filter(
    ([, cor]) => cor === "black",
  ).length;
  const liveDesconhecidas = Math.max(live - liveConhecidas, 0);
  const blankDesconhecidas = Math.max(blank - blankConhecidas, 0);
  const totalDesconhecidas = liveDesconhecidas + blankDesconhecidas;
  const probLive = corAtual
    ? corAtual === "live"
      ? 100
      : 0
    : (liveDesconhecidas / totalDesconhecidas) * 100 || 0;
  const probBlank = corAtual
    ? corAtual === "black"
      ? 100
      : 0
    : (blankDesconhecidas / totalDesconhecidas) * 100 || 0;
  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-5 overflow-x-hidden bg-dark px-4 py-8 text-white sm:py-10">
        <h2 className="pt-2 text-center text-2xl font-bold sm:pt-6 sm:text-3xl">
          Informe as balas
        </h2>
        <div className='h-40 w-full max-w-3xl bg-[url("https://imgs.search.brave.com/yKsbBuVCwMziXmEZyB8RjymGmOpi_yYKBjvjYQI1tp4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnJl/ZGQuaXQvYmloZnBv/MWV2ejhlMS5wbmc")] bg-center sm:h-60'></div>
        <div className="flex w-full max-w-md flex-wrap items-center justify-center gap-4">
          <Balas
            imagem={balavermelha}
            quantidade={live}
            ladoBotoes="esquerdo"
            onClickUp={onClickUpVermelha}
            onClickDown={onClickDownVermelha}
          />
          <Balas
            imagem={balazul}
            quantidade={blank}
            ladoBotoes="direito"
            onClickUp={onClickUpAzul}
            onClickDown={onClickDownAzul}
          />
        </div>
        <span>Bala atual: {shoot}</span>
        <span>
          Prob <span className="text-red-600">live</span> {probLive.toFixed(2)}%
        </span>
        <span>
          Prob <span className="text-blue-600">blank</span>{" "}
          {probBlank.toFixed(2)} %
        </span>
        <button
          onClick={reset}
          className="h-16 w-30 border-4 border-[#2b211d] bg-[#d8c6ae] text-3xl leading-none text-[#241b18] shadow-[4px_5px_0_#241b18,0_0_0_2px_#8f7d6c_inset] transition-transform hover:-translate-y-0.5 hover:bg-[#e3d2bc] active:translate-y-1 active:shadow-[2px_2px_0_#241b18,0_0_0_2px_#8f7d6c_inset]
"
        >
          Limpar
        </button>
        <ListaBalas
          key={resetId}
          qtdBalas={qtdBalas}
          balaAtirada={balaAtirada}
          marcarShell={marcarShell}
        />
      </div>
    </>
  );
}

export default App;
