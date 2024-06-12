import { useState } from "react";

interface Game {
  id: number;
  title: string;
  cover: string;
}

export default function Main() {

  const [games, setGames] = useState<Game[]>(() => {
    const storedGames = localStorage.getItem("obc-game-lib");
    if (!storedGames) return [];
    return JSON.parse(storedGames);
  });
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState("");

  const addGame = ({ title, cover }: { title: string; cover: string }) => {
    const id = Math.floor(Math.random() * 1000000);
    const game = { id, title, cover };
    setGames(state => {
      const newState = [...state, game];
      localStorage.setItem("obc-game-lib", JSON.stringify(newState));
      return newState;
    });
  };

  const removeGame = (id: number) => {
    setGames(state => {
      const newState = state.filter(game => game.id !== id);
      localStorage.setItem("obc-game-lib", JSON.stringify(newState));
      return newState;
    }
    )
  }

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    addGame({ title, cover });
    setTitle("");
    setCover("");
  };

  return (
    <div className={`pl-16 pt-10`}>
      <h1 className={`font-bold text-5xl text-white`}>Biblioteca de Jogos</h1>
      <form onSubmit={handleSubmit} className={`flex gap-6 mt-6 text-white font-semibold`}>
        <div className={`flex flex-col w-56 gap-2`}>
          <label htmlFor="">Título:</label>
          <input
            className={`bg-zinc-900 h-9 rounded-lg pl-1`}
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={`flex flex-col w-56 gap-2`}>
          <label htmlFor="cover">Capa:</label>
          <input
            className={`bg-zinc-900 h-9 rounded-lg pl-2`}
            type="text"
            name="cover"
            id="cover"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
          />
        </div>
        <div className={`flex flex-col justify-end h-18`}>
          <button className={`h-9 w-56 bg-zinc-900 rounded-lg hover:border border-green-400 hover:text-green-400`} type="submit">Adicionar à biblioteca</button>
        </div>
      </form>
      <div className={`mt-5 flex flex-wrap`}>
        {games.map((game) => (
          <div
            key={game.id}
            className={`flex h-32 w-full sm:w-1/3 lg:w-1/5 p-2`}
          >
            <img src={game.cover} alt={`${game.title} cover`} className="h-full" />
            <div className={`flex flex-col ml-5 items-center gap-1`}>
              <h2 className={`text-white font-bold`}>{game.title}</h2>
              <button
                onClick={() => removeGame(game.id)}
                className={`h-9 w-28 bg-zinc-900 rounded-lg hover:border text-red-300 border-red-400 hover:text-red-400`}
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
    </div >
  )
}