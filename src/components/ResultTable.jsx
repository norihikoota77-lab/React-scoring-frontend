import { motion } from "framer-motion";

const HalfTable = ({ rows }) => (
  <div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 2fr 1fr", backgroundColor: "rgba(0,0,0,0.3)", padding: "6px 12px" }}>
      <span style={{ fontSize: "12px", color: "#94a3b8" }}>問題</span>
      <span style={{ fontSize: "12px", color: "#94a3b8" }}>解答</span>
      <span style={{ fontSize: "12px", color: "#94a3b8" }}>正解</span>
      <span style={{ fontSize: "12px", color: "#94a3b8", textAlign: "center" }}>判定</span>
    </div>
    {rows.map((row, index) => {
      const isCorrect = row[3] === "\u2b55";
      return (
        <div key={index} style={{ display: "grid", gridTemplateColumns: "1fr 2fr 2fr 1fr", padding: "6px 12px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <span style={{ color: "#94a3b8", fontWeight: "bold" }}>{row[0]}</span>
          <span style={{ color: "white" }}>{row[1]}</span>
          <span style={{ color: "white" }}>{row[2]}</span>
          <span style={{ textAlign: "center", fontWeight: "bold", color: isCorrect ? "#4ade80" : "#f87171" }}>{row[3]}</span>
        </div>
      );
    })}
  </div>
);

export default function ResultTable({ rowsData }) {
  const firstHalf = rowsData.slice(0, 20);
  const secondHalf = rowsData.slice(20);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        marginTop: "24px",
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: "16px",
        boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
        display: "flex",
        gap: "1px",
        overflow: "hidden",
      }}
    >
      <div style={{ width: "50%", borderRight: "1px solid rgba(255,255,255,0.1)" }}>
        <HalfTable rows={firstHalf} />
      </div>
      <div style={{ width: "50%" }}>
        <HalfTable rows={secondHalf} />
      </div>
    </motion.div>
  );
}