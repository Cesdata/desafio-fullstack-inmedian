import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface Plan {
  id: number;
  description: string;
  price: number;
}

export const Checkout = () => {
  const { id } = useParams<{ id: string }>();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [showModal, setShowModal] = useState(false); // Controle do Modal

  const PLANO_ATUAL_VALOR = 87.00;
  const DIAS_TOTAIS = 30;
  const DIAS_RESTANTES = 15;

  useEffect(() => {
    fetch(`http://127.0.0.1:8085/api/plans`)
      .then((res) => res.json())
      .then((data: Plan[]) => {
        const selected = data.find((p) => p.id === Number(id));
        if (selected) setPlan(selected);
      });
  }, [id]);

  if (!plan) return <div style={{ color: '#fff', textAlign: 'center', padding: '50px' }}>Carregando...</div>;

  const valorCredito = (PLANO_ATUAL_VALOR / DIAS_TOTAIS) * DIAS_RESTANTES;
  const valorNovoPlano = Number(plan.price);
  const diferenca = valorNovoPlano - valorCredito;

  return (
    <div style={{ padding: '40px', backgroundColor: '#111', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif' }}>
      <Link to="/" style={{ color: '#fb923c', textDecoration: 'none' }}>← VOLTAR</Link>

      <div style={{ maxWidth: '600px', margin: '40px auto', backgroundColor: '#1a1a1a', padding: '30px', borderRadius: '12px', border: '1px solid #fb923c' }}>
        <h2>Resumo da Alteração</h2>
        <p>Novo Plano: <strong>{plan.description}</strong></p>
        <p>Valor a pagar: <strong style={{fontSize: '1.5rem', color: '#fb923c'}}>R$ {diferenca > 0 ? diferenca.toFixed(2) : "0,00"}</strong></p>

        <button 
          onClick={() => setShowModal(true)}
          style={{ width: '100%', backgroundColor: '#fb923c', padding: '15px', borderRadius: '8px', cursor: 'pointer', marginTop: '20px', fontWeight: 'bold' }}
        >
          {diferenca > 0 ? 'GERAR PIX DE PAGAMENTO' : 'CONFIRMAR ALTERAÇÃO GRÁTIS'}
        </button>
      </div>

      {/* --- ESTRUTURA DO MODAL --- */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#fff', color: '#000', padding: '30px', borderRadius: '16px', maxWidth: '400px', textAlign: 'center' }}>
            {diferenca > 0 ? (
              <>
                <h2 style={{ color: '#111' }}>Pagamento PIX</h2>
                <p>Escaneie o QR Code abaixo:</p>
                <div style={{ backgroundColor: '#eee', width: '200px', height: '200px', margin: '20px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* Simulando um QR Code */}
                  <div style={{ border: '8px solid #000', width: '150px', height: '150px', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '10px', left: '10px', width: '30px', height: '30px', backgroundColor: '#000' }}></div>
                  </div>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#666' }}>Chave Copia e Cola:</p>
                <input readOnly value="00020126580014BR.GOV.BCB.PIX..." style={{ width: '100%', padding: '10px', textAlign: 'center' }} />
              </>
            ) : (
              <>
                <h2 style={{ color: '#4ade80' }}>✓ Sucesso!</h2>
                <p>Seu plano foi alterado com sucesso. Como você tinha crédito, não houve custo adicional.</p>
              </>
            )}
            
            <button 
              onClick={() => setShowModal(false)}
              style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer', backgroundColor: '#111', color: '#fff', border: 'none', borderRadius: '5px' }}
            >
              FECHAR
            </button>
          </div>
        </div>
      )}
    </div>
  );
};