import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Coffee, ArrowRight } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';

export default function BaristaPopup() {
  const { products } = useProducts();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'prompt' | 'quiz' | 'result'>('prompt');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [recommendedProduct, setRecommendedProduct] = useState<string | null>(null);
  const [recommendedGrind, setRecommendedGrind] = useState<string>('Grano entero');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if user has already dismissed or completed the quiz in this session if needed
      // For now, just show it
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const questions = [
    {
      id: 1,
      text: "¿Qué tipo de sabores prefieres en tu café?",
      options: [
        { label: "Frutales / brillantes", value: "fruity" },
        { label: "Achocolatados / dulces", value: "chocolate" },
        { label: "Nueces / caramelo", value: "nutty" },
        { label: "Especiados / complejos", value: "spicy" }
      ]
    },
    {
      id: 2,
      text: "¿Qué tanta intensidad buscas?",
      options: [
        { label: "Suave", value: "mild" },
        { label: "Media", value: "medium" },
        { label: "Alta", value: "strong" }
      ]
    },
    {
      id: 3,
      text: "¿Qué nivel de amargor disfrutas o toleras?",
      options: [
        { label: "Bajo", value: "low" },
        { label: "Medio", value: "medium" },
        { label: "Alto", value: "high" }
      ]
    },
    {
      id: 4,
      text: "¿Cómo preparas tu café normalmente?",
      options: [
        { label: "Uso máquina espresso", value: "espresso" },
        { label: "Uso cafetera de filtro", value: "filter" },
        { label: "Uso prensa francesa", value: "french_press" },
        { label: "Lo compro en grano para moler en casa", value: "whole_bean" }
      ]
    }
  ];

  const handleStart = () => {
    setStep('quiz');
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<number, string>) => {
    const scores: Record<string, number> = {
      'kantutani-bolivia': 0,
      'pack-tres-origenes': 0,
      'huehuetenango-guatemala': 0,
      'huila-colombia': 0,
      'minas-gerais-brasil': 0
    };

    // Q1: Flavors
    const flavor = finalAnswers[1];
    if (flavor === 'fruity') {
      scores['huehuetenango-guatemala'] += 3;
      scores['huila-colombia'] += 1;
    } else if (flavor === 'chocolate') {
      scores['minas-gerais-brasil'] += 2;
      scores['kantutani-bolivia'] += 2;
      scores['huila-colombia'] += 1;
    } else if (flavor === 'nutty') {
      scores['kantutani-bolivia'] += 3;
      scores['huila-colombia'] += 2;
      scores['minas-gerais-brasil'] += 1;
    } else if (flavor === 'spicy') {
      scores['pack-tres-origenes'] += 3;
      scores['huehuetenango-guatemala'] += 1;
    }

    // Q2: Intensity
    const intensity = finalAnswers[2];
    if (intensity === 'mild') {
      scores['kantutani-bolivia'] += 2;
      scores['huehuetenango-guatemala'] += 2;
    } else if (intensity === 'medium') {
      scores['huila-colombia'] += 2;
      scores['pack-tres-origenes'] += 2;
      scores['kantutani-bolivia'] += 1;
      scores['minas-gerais-brasil'] += 1;
    } else if (intensity === 'strong') {
      scores['minas-gerais-brasil'] += 2; // Perceived strength
      scores['huila-colombia'] += 1;
    }

    // Q3: Bitterness
    const bitterness = finalAnswers[3];
    if (bitterness === 'low') {
      scores['kantutani-bolivia'] += 2;
      scores['huehuetenango-guatemala'] += 2;
    } else if (bitterness === 'medium') {
      scores['pack-tres-origenes'] += 2;
      scores['huila-colombia'] += 2;
    } else if (bitterness === 'high') {
      scores['minas-gerais-brasil'] += 3;
    }

    // Q4: Preparation
    const prep = finalAnswers[4];
    let grind = 'Grano entero';
    if (prep === 'espresso') {
      scores['minas-gerais-brasil'] += 2;
      scores['pack-tres-origenes'] += 1;
      grind = 'Molido fino';
    } else if (prep === 'filter') {
      scores['huehuetenango-guatemala'] += 2;
      scores['kantutani-bolivia'] += 2;
      scores['huila-colombia'] += 1;
      grind = 'Molido medio';
    } else if (prep === 'french_press') {
      scores['huila-colombia'] += 2;
      scores['minas-gerais-brasil'] += 1;
      grind = 'Molido grueso';
    } else if (prep === 'whole_bean') {
      scores['pack-tres-origenes'] += 3;
      grind = 'Grano entero';
    }
    setRecommendedGrind(grind);

    // Find winner
    let maxScore = -1;
    let winnerId = 'kantutani-bolivia'; // Default

    Object.entries(scores).forEach(([id, score]) => {
      if (score > maxScore) {
        maxScore = score;
        winnerId = id;
      }
    });

    setRecommendedProduct(winnerId);
    setStep('result');
  };

  if (!isOpen) return null;

  const product = products.find(p => p.id === recommendedProduct);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.6)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backdropFilter: 'blur(5px)'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '500px',
        width: '90%',
        position: 'relative',
        boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
        animation: 'fadeIn 0.5s ease-out'
      }}>
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#999'
          }}
        >
          <X size={24} />
        </button>

        {step === 'prompt' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'var(--primary-blue)',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0 auto 20px auto',
              color: 'white'
            }}>
              <Coffee size={40} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '15px', color: 'var(--text-heading)' }}>
              ¿Te ayudamos a elegir?
            </h2>
            <p style={{ color: '#666', marginBottom: '30px', lineHeight: '1.6' }}>
              Soy tu Barista Virtual. Responde unas breves preguntas y te recomendaré el café perfecto para tu paladar.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button
                onClick={handleClose}
                style={{
                  padding: '12px 25px',
                  borderRadius: '30px',
                  border: '1px solid #ddd',
                  background: 'transparent',
                  color: '#666',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                No, gracias
              </button>
              <button
                onClick={handleStart}
                style={{
                  padding: '12px 25px',
                  borderRadius: '30px',
                  border: 'none',
                  background: 'var(--primary-blue)',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Comenzar <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 'quiz' && (
          <div>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', color: '#999', fontWeight: 600 }}>
                Pregunta {currentQuestion + 1} de {questions.length}
              </span>
              <div style={{ display: 'flex', gap: '5px' }}>
                {questions.map((_, idx) => (
                  <div key={idx} style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: idx === currentQuestion ? 'var(--primary-blue)' : '#eee'
                  }}></div>
                ))}
              </div>
            </div>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '30px', color: 'var(--text-heading)' }}>
              {questions[currentQuestion].text}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {questions[currentQuestion].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  style={{
                    padding: '15px 20px',
                    borderRadius: '12px',
                    border: '1px solid #eee',
                    background: '#f9f9f9',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    color: '#444',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#e8eaf6';
                    e.currentTarget.style.borderColor = 'var(--primary-blue)';
                    e.currentTarget.style.color = 'var(--primary-blue)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = '#f9f9f9';
                    e.currentTarget.style.borderColor = '#eee';
                    e.currentTarget.style.color = '#444';
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'result' && product && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '20px' }}>
              <span style={{
                background: '#e8eaf6',
                color: 'var(--primary-blue)',
                padding: '5px 15px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: 600
              }}>
                Tu Match Perfecto
              </span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '10px', color: 'var(--text-heading)' }}>
              {product.name}
            </h2>

            <div style={{ margin: '20px auto', width: '200px', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={product.img} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))' }} />
            </div>

            <p style={{ color: '#666', marginBottom: '25px', fontSize: '0.95rem', lineHeight: '1.6' }}>
              {product.description}
            </p>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
              {product.tastingNotes?.map((note, i) => (
                <span key={i} style={{ fontSize: '0.8rem', background: '#f5f5f5', padding: '4px 10px', borderRadius: '4px', color: '#555' }}>
                  {note}
                </span>
              ))}
            </div>

            <div style={{ marginBottom: '30px', background: '#e8eaf6', padding: '10px', borderRadius: '8px', display: 'inline-block' }}>
              <span style={{ fontSize: '0.9rem', color: '#555' }}>Molienda recomendada: </span>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary-blue)' }}>{recommendedGrind}</span>
            </div>

            <button
              onClick={() => {
                setIsOpen(false);
                navigate(`/producto/${product.id}`);
              }}
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '30px',
                border: 'none',
                background: 'var(--primary-blue)',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '1rem'
              }}
            >
              Ver Producto
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
