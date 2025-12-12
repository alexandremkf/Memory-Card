// src/App.jsx
import { useState, useEffect, useRef } from "react";
import { getPokemons } from "./api";
import Card from "./components/Card";

// shuffle (Fisher–Yates)
function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function App() {
  const [cards, setCards] = useState([]);       // deck (array de pokémons)
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => {
    const v = localStorage.getItem("memory_best_score");
    return v ? Number(v) : 0;
  });
  const [clicked, setClicked] = useState([]);  // ids já clicados nesta rodada
  const [loading, setLoading] = useState(true);
  const [showWin, setShowWin] = useState(false);
  const lockRef = useRef(false); // evita cliques enquanto reset/vitória em progresso

  // Carregar cartas e embaralhar no mount
  useEffect(() => {
    async function loadAndShuffle() {
      setLoading(true);
      const pokemons = await getPokemons(8);
      const deck = shuffleArray(pokemons);
      setCards(deck);
      setLoading(false);
      // reinicia estado do jogo
      setScore(0);
      setClicked([]);
      setShowWin(false);
    }
    loadAndShuffle();
  }, []);

  // Atualiza localStorage quando best muda
  useEffect(() => {
    localStorage.setItem("memory_best_score", String(best));
  }, [best]);

  // Se o usuário alcançou todas as cartas únicas -> vitória
  useEffect(() => {
    if (cards.length > 0 && score === cards.length) {
      setShowWin(true);
      // atualiza best se necessário
      setBest((prev) => Math.max(prev, score));
      // trava cliques por um instante
      lockRef.current = true;
      setTimeout(() => {
        lockRef.current = false;
      }, 800);
    }
  }, [score, cards.length]);

  function resetGame() {
    if (lockRef.current) return;
    lockRef.current = true;
    setScore(0);
    setClicked([]);
    setShowWin(false);
    setCards((prev) => shuffleArray(prev));
    // desbloqueia em microtempo pra evitar clique duplo
    setTimeout(() => {
      lockRef.current = false;
    }, 150);
  }

  function handleCardClick(id) {
    if (lockRef.current) return;
    // já clicou antes -> perdeu (reset parcial)
    if (clicked.includes(id)) {
      setScore(0);
      setClicked([]);
      setCards((prev) => shuffleArray(prev));
      return;
    }

    // novo clique válido
    const newScore = score + 1;
    setScore(newScore);
    setClicked((prev) => [...prev, id]);

    // atualiza best imediatamente
    setBest((prev) => Math.max(prev, newScore));

    // embaralha cartas
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
        <button
          onClick={resetGame}
          style={{
            marginLeft: 12,
            padding: "8px 12px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            background: "#4f46e5",
            color: "white",
            fontWeight: "600",
          }}
        >
          Novo Jogo
        </button>
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
        {loading ? (
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

      {/* Modal/overlay simples de vitória */}
      {showWin && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.52)",
          }}
        >
          <div
            style={{
              background: "#0f1724",
              padding: 28,
              borderRadius: 12,
              border: "2px solid #4f46e5",
              color: "white",
              textAlign: "center",
              minWidth: 300,
            }}
          >
            <h2>Você venceu! 🎉</h2>
            <p style={{ margin: "10px 0" }}>
              Score final: <strong>{score}</strong>
            </p>
            <button
              onClick={() => {
                setShowWin(false);
                resetGame();
              }}
              style={{
                marginTop: 8,
                padding: "10px 14px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                background: "#4f46e5",
                color: "white",
                fontWeight: 600,
              }}
            >
              Jogar novamente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}