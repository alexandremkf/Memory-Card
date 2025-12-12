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
  const [clicked, setClicked] = useState([]);

  // Carregar as cartas ao montar o componente
  useEffect(() => {
    async function loadCards() {
      const pokemons = await getPokemons(8); // queremos 8 cartas
      setCards(pokemons);
    }
    loadCards();
  }, []);

  function handleCardClick(id) {
    // Se clicou repetido → reset
    if (clicked.includes(id)) {
      setScore(0);
      setClicked([]);
      return;
    }

    // Se clicou novo → soma score
    setScore((prev) => prev + 1);
    setClicked((prev) => [...prev, id]);

    // Atualizar best score
    setBest((prev) => Math.max(prev, score + 1));

    // Embaralhar cartas
    setCards((prev) => shuffleArray(prev));
  }

  return (
    <div className="app" style={{ textAlign: "center", padding: "20px" }}>
      <header>
        <h1>Memory Card Game</h1>
        <p>Clique nas cartas sem repetir!</p>
      </header>

      <section
        className="scoreboard"
        style={{
          marginTop: "10px",
          marginBottom: "20px",
          fontSize: "22px",
          color: "white",
        }}
      >
        <p>Score: {score}</p>
        <p>Best Score: {best}</p>
      </section>

      <main
        className="cards-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          maxWidth: "620px",
          margin: "0 auto",
        }}
      >
        {cards.length === 0 ? (
          <p style={{ opacity: 0.6 }}>Carregando cartas...</p>
        ) : (
          cards.map((card) => (
            <Card
              key={card.id}
              image={card.image}
              name={card.name}
              onClick={() => handleCardClick(card.id)}
            />
          ))
        )}
      </main>
    </div>
  );
}