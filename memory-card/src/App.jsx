import { useState, useEffect } from "react";

export default function App() {
  // Estados que vamos usar no jogo
  const [cards, setCards] = useState([]); // cartas que serão renderizadas
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

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
        {/* Ainda não temos cartas — vamos adicionar no próximo passo */}
        <p style={{ opacity: 0.6 }}>Carregando cartas...</p>
      </main>
    </div>
  );
}