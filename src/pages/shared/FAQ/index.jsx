import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Ban,
  BusFront,
  CalendarDays,
  CreditCard,
  MapPin,
  Search,
  User,
  X,
} from "lucide-react";

import styles from "./faq.module.css";

const categories = [
  { id: "reservas", icon: <CalendarDays />, label: "Reservas" },
  { id: "pagamento", icon: <CreditCard />, label: "Pagamento" },
  { id: "cancelamento", icon: <Ban />, label: "Cancelamento" },
  { id: "rastreamento", icon: <MapPin />, label: "Rastreamento" },
  { id: "conta", icon: <User />, label: "Minha Conta" },
  { id: "motorista", icon: <BusFront />, label: "Motorista" },
];

const faqs = {
  reservas: [
    {
      question: "Como faço uma reserva?",
      answer:
        "Na tela inicial, selecione seu ponto de partida e destino, ou role a tela até achar a viagem desejada e clique em 'Reservar agora'. Você será redirecionado diretamente para o WhatsApp pra confirmação final.",
    },
    {
      question: "Posso agendar uma viagem com antecedência?",
      answer:
        "Sim! Você pode agendar viagens com até 7 dias de antecedência. Basta selecionar a opção 'Agendar' na tela de reserva e escolher a data e horário desejados.",
    },
    {
      question: "Posso fazer mais de uma reserva ao mesmo tempo?",
      answer:
        "Sim, porém atualmente todo o gerenciamento é feito diretamente pelo Whatsapp, o site funciona apenas para consulta de horários e rastreamento. Mais funcionalidades em breve",
    },
    {
      question: "Preciso criar uma conta para reservar?",
      answer:
        "Sim, para reservar diretamente pelo site é necessário realizar um cadastro, porém, é possível reservar diretamente pelo Whatsapp",
    },
    {
      question: "Como sei se ainda existem vagas disponíveis?",
      answer:
        "A disponibilidade é confirmada diretamente com o motorista durante o atendimento pelo WhatsApp.",
    },
  ],
  pagamento: [
    {
      question: "Quais formas de pagamento são aceitas?",
      answer:
        "Os métodos de pagamento aceitos são PIX, e dinheiro. Ambos disponíveis no embarque",
    },
    {
      question: "Como adiciono um cartão de crédito?",
      answer: "Cartão de débito e crédito por enquanto não está disponível",
    },
    {
      question: "Quando o pagamento é cobrado?",
      answer:
        "O pagamento pode ser feito tanto ao final, quanto no início da viagem.",
    },
    {
      question: "Como funciona o PIX no app?",
      answer:
        "Essa forma de pagamento direto pelo site ainda não está disponível, sendo possível o pagamento apenas em contato direto com o motorista",
    },
    {
      question: "Posso pagar na hora da viagem?",
      answer:
        "Sim. O pagamento pode ser realizado no embarque ou ao final da viagem, conforme combinado com o motorista.",
    },
  ],
  cancelamento: [
    {
      question: "Como cancelo uma reserva?",
      answer:
        "Todo gerenciamento de reserva, pagamento e cancelamento é feito diretamente pelo Whatsapp do motorista.",
    },
    {
      question: "Como solicito reembolso?",
      answer:
        "O cancelamento/reembolso é feito exclusivamente pelo Whatsapp do motorista",
    },
    {
      question: "O motorista pode cancelar minha reserva?",
      answer:
        "Em situações excepcionais, o motorista pode cancelar mediante aviso prévio via Whatsapp",
    },
  ],
  rastreamento: [
    {
      question: "Como acompanho a localização do motorista?",
      answer:
        "Acesse a opção 'Rastrear' no menu inferior. A localização é atualizada em tempo real a cada 5 segundos após o motorista iniciar a viagem.",
    },
    {
      question: "Posso compartilhar minha localização durante a viagem?",
      answer:
        "Sim! Na tela de rastreamento, toque em 'Compartilhar viagem'. Você pode enviar um link para amigos ou familiares acompanharem sua rota em tempo real.",
    },
    {
      question: "O rastreamento funciona sem internet?",
      answer:
        "O rastreamento requer conexão com a internet. Em áreas de baixo sinal, o mapa pode demorar mais para atualizar.",
    },
  ],
  conta: [
    {
      question: "Como altero minha senha?",
      answer:
        "Essas funcionalidades estarão disponíveis em futuras atualizações",
    },
    {
      question: "Como atualizo meu número de telefone?",
      answer:
        "Essas funcionalidades estarão disponíveis em futuras atualizações",
    },
    {
      question: "Posso excluir minha conta?",
      answer:
        "Essas funcionalidades estarão disponíveis em futuras atualizações",
    },
  ],
  motorista: [
    {
      question: "O que faço se esquecer algo no carro?",
      answer:
        "Você pode entrar em contato de forma imediata com o motorista informando o ocorrido",
    },
  ],
};

function AccordionItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${styles.accordionItem} ${open ? styles.open : ""}`}>
      <button
        className={styles.accordionTrigger}
        onClick={() => setOpen(!open)}
      >
        <span>{question}</span>
        <span className={styles.accordionIcon}>{open ? "−" : "+"}</span>
      </button>
      <div className={styles.accordionBody}>
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeCategory, setActiveCategory] = useState("reservas");
  const [searchQuery, setSearchQuery] = useState("");

  const allFaqs = Object.entries(faqs).flatMap(([cat, items]) =>
    items.map((item) => ({ ...item, category: cat })),
  );

  const message = encodeURIComponent(
    "Olá Paulo, vim do site Pab Viagens e preciso de ajuda.",
  );

  const filtered = searchQuery.trim()
    ? allFaqs.filter(
        (f) =>
          f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : faqs[activeCategory];

  const isSearching = searchQuery.trim().length > 0;

  const handleBackClick = () => {
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <button className={styles.backBtn} onClick={handleBackClick}>
            <ArrowLeft />
          </button>
          <h1 className={styles.headerTitle}>Central de Ajuda</h1>
          <div className={styles.headerAvatarPlaceholder} />
        </div>

        <div className={styles.heroArea}>
          <p className={styles.heroTagline}>Como podemos ajudar?</p>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} />
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Buscar dúvidas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className={styles.searchClear}
                onClick={() => setSearchQuery("")}
              >
                <X />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className={styles.main}>
        {!isSearching && (
          <>
            <h2 className={styles.sectionTitle}>Dúvidas Frequentes</h2>
            <div className={styles.categoryScroll}>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`${styles.categoryPill} ${activeCategory === cat.id ? styles.active : ""}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </>
        )}

        {isSearching && (
          <div className={styles.searchResultsHeader}>
            <h2 className={styles.sectionTitle}>
              {filtered.length} resultado{filtered.length !== 1 ? "s" : ""} para
              "{searchQuery}"
            </h2>
          </div>
        )}

        <div className={styles.accordionList}>
          {filtered.length === 0 ? (
            <div className={styles.emptyState}>
              <span>🔍</span>
              <p>Nenhum resultado encontrado.</p>
              <small>
                Tente outras palavras ou entre em contato com o suporte.
              </small>
            </div>
          ) : (
            filtered.map((faq, i) => (
              <AccordionItem
                key={i}
                question={faq.question}
                answer={faq.answer}
              />
            ))
          )}
        </div>

        <div className={styles.ctaBox}>
          <p className={styles.ctaText}>Não encontrou o que precisava?</p>
          <a
            href={`https://wa.me/5583981922611?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            Falar com o suporte
          </a>
        </div>
      </main>
    </div>
  );
}
