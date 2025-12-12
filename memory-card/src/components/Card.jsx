export default function Card({ image, name, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: "140px",
        height: "180px",
        borderRadius: "12px",
        padding: "10px",
        background: "#1e1e1e",
        border: "2px solid #4f46e5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "0.25s",
      }}
    >
      <img
        src={image}
        alt={name}
        style={{
          width: "90px",
          height: "90px",
          objectFit: "contain",
        }}
      />
      <p style={{ marginTop: "10px", fontSize: "18px", color: "white" }}>
        {name}
      </p>
    </div>
  );
}