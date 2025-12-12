import { useState, useEffect } from "react";
import { getPokemons } from "./api";

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
            <div
              key={card.id}
              className="card"
              style={{
                background: "#161b22",
                padding: "12px",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <img
                src={card.image}
                alt={card.name}
                style={{ width: "100%", height: "100px", objectFit: "contain" }}
              />
              <p style={{ marginTop: "8px", textTransform: "capitalize" }}>
                {card.name}
              </p>
            </div>
          ))
        )}
      </main>
    </div>
  );
}