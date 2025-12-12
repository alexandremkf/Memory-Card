export default function Card({ image, name, onClick }) {
  return (
    <div
      className="card"
      onClick={onClick}
      style={{
        background: "#161b22",
        padding: "12px",
        borderRadius: "8px",
        textAlign: "center",
        cursor: "pointer",
        transition: "transform 0.15s",
      }}
    >
      <img
        src={image}
        alt={name}
        style={{ width: "100%", height: "100px", objectFit: "contain" }}
      />
      <p style={{ marginTop: "8px", textTransform: "capitalize" }}>{name}</p>
    </div>
  );
}