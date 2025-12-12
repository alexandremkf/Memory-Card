import { useState, useEffect } from "react";
import { getPokemons } from "./api";
import Card from "./components/Card";

// Função para embaralhar (Fisher–Yates)
function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function App() {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  // Carregar as cartas ao montar o componente
  useEffect(() => {
    async function loadCards() {
      const pokemons = await getPokemons(8); // queremos 8 cartas
      setCards(pokemons);
    }
    loadCards();
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Memory Card Game</h1>
        <p>Clique nas cartas sem repetir!</p>
      </header>

      <section className="scoreboard">
        <p>Score: {score}</p>
        <p>Best Score: {best}</p>
      </section>

      <main className="cards-grid">
        {cards.length === 0 ? (
          <p style={{ opacity: 0.6 }}>Carregando cartas...</p>
        ) : (
          cards.map((card) => (
            <Card
              key={card.id}
              image={card.image}
              name={card.name}
              onClick={() => {
                // embaralhar cartas ao clicar
                setCards((prev) => shuffleArray(prev));
              }}
            />
          ))
        )}
      </main>
    </div>
  );
}