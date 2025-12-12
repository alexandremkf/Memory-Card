export default function Card({ image, name, onClick }) {
  return (
    <div
      className="card card-hover"
      style={{
        width: "140px",
        height: "180px",
        borderRadius: "12px",
        cursor: "pointer",
        background: "#1e1e1e",
        border: "2px solid #4f46e5",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClick}
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