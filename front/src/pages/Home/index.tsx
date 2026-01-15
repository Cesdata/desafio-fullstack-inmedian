import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8085/api/plans")
      .then((res) => res.json())
      .then((data) => setPlans(data));
  }, []);

  return (
    <div style={{ padding: "40px", backgroundColor: "#111", minHeight: "100vh", color: "#fff" }}>
      <h1>Escolha seu novo Plano</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {plans.map((plan: any) => (
          <div key={plan.id} style={{ border: "1px solid #fb923c", padding: "20px", borderRadius: "8px" }}>
            <h3>{plan.description}</h3>
            <p>R$ {plan.price}</p>
            <Link to={`/checkout/${plan.id}`} style={{ color: "#fb923c" }}>Selecionar</Link>
          </div>
        ))}
      </div>
    </div>
  );
};