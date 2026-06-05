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
        "Na tela inicial, selecione seu ponto de partida e destino, escolha o tipo de veículo desejado e confirme a reserva. Você receberá uma confirmação por e-mail e notificação no app.",
    },
    {
      question: "Posso agendar uma viagem com antecedência?",
      answer:
        "Sim! Você pode agendar viagens com até 7 dias de antecedência. Basta selecionar a opção 'Agendar' na tela de reserva e escolher a data e horário desejados.",
    },
    {
      question: "Como altero o destino depois de fazer a reserva?",
      answer:
        "Após confirmar a reserva, acesse 'Minhas Reservas', selecione a viagem desejada e toque em 'Editar destino'. Alterações são permitidas até 10 minutos antes da partida.",
    },
    {
      question: "Posso fazer mais de uma reserva ao mesmo tempo?",
      answer:
        "Atualmente, o PAB Viagens permite apenas uma reserva ativa por vez. Após concluir ou cancelar a viagem em andamento, você pode fazer uma nova reserva.",
    },
  ],
  pagamento: [
    {
      question: "Quais formas de pagamento são aceitas?",
      answer:
        "Aceitamos cartão de crédito (Visa, Mastercard, Elo e Amex), cartão de débito, PIX e saldo na carteira do app. Parcelamento disponível para viagens acima de R$50.",
    },
    {
      question: "Como adiciono um cartão de crédito?",
      answer:
        "Acesse Perfil > Pagamentos > Adicionar novo cartão. Insira os dados do cartão e confirme com o código de segurança. O cartão será validado com uma cobrança temporária de R$1,00 que é estornada em até 24h.",
    },
    {
      question: "Quando o pagamento é cobrado?",
      answer:
        "O pagamento é processado ao final da viagem, com base na distância percorrida e tempo de viagem. Para reservas agendadas, o valor é pré-autorizado no cartão 1 hora antes do início.",
    },
    {
      question: "Como funciona o PIX no app?",
      answer:
        "Ao escolher PIX como forma de pagamento, um QR Code é gerado ao fim da viagem. Você tem 15 minutos para realizar o pagamento. Após confirmação, a viagem é finalizada automaticamente.",
    },
  ],
  cancelamento: [
    {
      question: "Como cancelo uma reserva?",
      answer:
        "Acesse 'Minhas Reservas', selecione a viagem e toque em 'Cancelar reserva'. Confirme a solicitação. O cancelamento é imediato e você receberá uma notificação de confirmação.",
    },
    {
      question: "Existe taxa de cancelamento?",
      answer:
        "Cancelamentos feitos com mais de 30 minutos de antecedência são gratuitos. Entre 10 e 30 minutos, há uma taxa de 20% do valor estimado. Abaixo de 10 minutos, a taxa é de 50%.",
    },
    {
      question: "Como solicito reembolso?",
      answer:
        "Em caso de cancelamento com direito a reembolso, o valor é devolvido automaticamente em até 5 dias úteis para o cartão utilizado, ou instantaneamente para a carteira do app.",
    },
    {
      question: "O motorista pode cancelar minha reserva?",
      answer:
        "Em situações excepcionais, o motorista pode cancelar. Nesse caso, você não é cobrado por nada e recebe um crédito de compensação automático na carteira do app.",
    },
  ],
  rastreamento: [
    {
      question: "Como acompanho a localização do motorista?",
      answer:
        "Após a confirmação da reserva, acesse a tela 'Rastreamento' no menu inferior. Você verá o mapa em tempo real com a posição do motorista e o tempo estimado de chegada.",
    },
    {
      question: "Posso compartilhar minha localização durante a viagem?",
      answer:
        "Sim! Na tela de rastreamento, toque em 'Compartilhar viagem'. Você pode enviar um link para amigos ou familiares acompanharem sua rota em tempo real sem precisar ter o app.",
    },
    {
      question: "O rastreamento funciona sem internet?",
      answer:
        "O rastreamento requer conexão com a internet. Em áreas de baixo sinal, o mapa pode demorar mais para atualizar. O motorista também tem acesso ao seu destino offline.",
    },
  ],
  conta: [
    {
      question: "Como altero minha senha?",
      answer:
        "Acesse Perfil > Configurações > Segurança > Alterar senha. Você precisará confirmar a senha atual e inserir a nova senha duas vezes. A mudança entra em vigor imediatamente.",
    },
    {
      question: "Como atualizo meu número de telefone?",
      answer:
        "Vá em Perfil > Editar perfil > Telefone. Insira o novo número e confirme com o código SMS enviado. Por segurança, esta ação requer verificação em dois fatores.",
    },
    {
      question: "Posso excluir minha conta?",
      answer:
        "Sim. Acesse Perfil > Configurações > Conta > Excluir conta. O processo leva até 30 dias para ser concluído. Durante esse período, você pode cancelar a exclusão entrando em contato com o suporte.",
    },
  ],
  motorista: [
    {
      question: "Como avaliamos o motorista?",
      answer:
        "Ao finalizar a viagem, uma tela de avaliação aparece automaticamente. Dê de 1 a 5 estrelas e deixe um comentário opcional. Sua avaliação ajuda a manter a qualidade do serviço.",
    },
    {
      question: "Posso solicitar um motorista específico?",
      answer:
        "Por enquanto, não é possível escolher um motorista específico. O sistema conecta automaticamente com o motorista disponível mais próximo com melhor avaliação.",
    },
    {
      question: "O que faço se esquecer algo no carro?",
      answer:
        "Acesse 'Minhas Reservas' > selecione a viagem concluída > 'Reportar item esquecido'. Entraremos em contato com o motorista. Também disponibilizamos o contato do motorista por 24h após a viagem.",
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
                ×
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
