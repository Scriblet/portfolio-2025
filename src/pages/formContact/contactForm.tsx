import { useRef, useState } from "react";
import { ArrowOutward, LocationOn } from "@mui/icons-material";
import DownloadCvButton from "../../components/DownloadCvButton";
import { useSnackbar } from "../../components/feedback/snackbarContext";
import { SOCIAL_LINKS, SITE_CONFIG, valuePropositions } from "../../data";
import { trackPortfolioEvents } from "../../services/analytics";
import { CONTACT_ENDPOINT } from "../../services/contactEndpoint";
import {
  GlassPanel,
  PillButton,
  SectionLabel,
} from "../../components/design-system";
import styles from "../pages.module.scss";

type FieldErrors = {
  nome?: string;
  email?: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const sectionContent = {
  label: "Contato",
  index: "07",
  headline: "Vamos resolver",
  accent: "algo real?",
  body: "Três frentes em que eu costumo entrar. Escolha a que dói mais hoje, ou escreva abaixo.",
};

const ContactForm = () => {
  const { notify } = useSnackbar();
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const handleProposalClick = (prompt: string) => {
    setMessage(prompt);
    setErrors((previous) => ({ ...previous, message: undefined }));

    const target = messageRef.current;
    if (!target) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    target.scrollIntoView?.({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "center",
    });
    target.focus({ preventScroll: true });
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};

    const cleanName = nome.trim();
    if (!cleanName) {
      next.nome = "Informe seu nome.";
    } else if (cleanName.length > 100) {
      next.nome = "O nome deve ter no máximo 100 caracteres.";
    }

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      next.email = "Informe seu email.";
    } else if (cleanEmail.length > 254 || !EMAIL_RE.test(cleanEmail)) {
      next.email = "Informe um email válido.";
    }

    const cleanMessage = message.trim();
    if (!cleanMessage) {
      next.message = "Escreva sua mensagem.";
    } else if (cleanMessage.length > 2000) {
      next.message = "A mensagem deve ter no máximo 2000 caracteres.";
    }

    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      notify({
        severity: "warning",
        message: "Você está offline. Verifique a conexão e tente novamente.",
        context: "contact",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nome.trim(),
          email: email.trim(),
          message: message.trim(),
          website,
        }),
      });

      if (response.status === 429) {
        notify({
          severity: "warning",
          message: "Muitas tentativas. Aguarde um minuto e tente novamente.",
          context: "contact",
        });
        return;
      }

      let data: unknown = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      const accepted =
        response.ok &&
        typeof data === "object" &&
        data !== null &&
        (data as { ok?: unknown }).ok === true;

      if (accepted) {
        trackPortfolioEvents.contactFormSubmit(true);
        notify({
          severity: "success",
          title: "Mensagem enviada",
          message: "Obrigado! Vou responder em breve.",
          context: "contact",
        });
        setNome("");
        setEmail("");
        setMessage("");
        setErrors({});
        return;
      }

      trackPortfolioEvents.contactFormSubmit(false);
      notify({
        severity: "error",
        message: "Não foi possível enviar. Tente novamente.",
        context: "contact",
      });
    } catch {
      const offline =
        typeof navigator !== "undefined" && navigator.onLine === false;

      trackPortfolioEvents.contactFormSubmit(false);
      notify({
        severity: "error",
        message: offline
          ? "Você está offline. Verifique a conexão e tente novamente."
          : "Não foi possível enviar. Tente novamente.",
        context: "contact",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className={`${styles.section} ${styles.void2Section} ${styles.contactSection}`}
      aria-labelledby="contact-title"
      data-testid="contact-section"
    >
      <header className={styles.contactIntro} data-reveal>
        <SectionLabel tone="dark">
          {sectionContent.label} / {sectionContent.index}
        </SectionLabel>
        <div className={styles.contactIntroGrid}>
          <h2 id="contact-title" className={styles.contactTitle}>
            {sectionContent.headline}{" "}
            <em className={styles.contactTitleAccent}>
              {sectionContent.accent}
            </em>
          </h2>
          <p className={styles.contactBody}>{sectionContent.body}</p>
        </div>
      </header>

      <div className={styles.contactProposals}>
        {valuePropositions.map((proposal) => (
          <button
            key={proposal.id}
            type="button"
            className={styles.contactProposal}
            onClick={() => handleProposalClick(proposal.prompt)}
            data-testid={`contact-proposal-${proposal.id}`}
            data-reveal
          >
            <span className={styles.contactProposalNumber} aria-hidden="true">
              {proposal.number}
            </span>
            <span className={styles.contactProposalTitle}>
              {proposal.title}
            </span>
            <span className={styles.contactProposalText}>
              {proposal.description}
            </span>
            <span className={styles.contactProposalBenefit}>
              {proposal.benefit}
            </span>
            <span className={styles.contactProposalCta}>
              {proposal.ctaLabel}
              <ArrowOutward fontSize="inherit" aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>

      <div className={styles.contactGrid}>
        <div className={styles.contactCopy} data-reveal>
          <h3 className={styles.contactAsideTitle}>Prefere ir direto?</h3>
          <p className={styles.contactAsideBody}>
            Me chame no LinkedIn. É só dizer qual das três frentes está mais
            perto do seu problema.
          </p>

          <div className={styles.contactActions}>
            <PillButton
              href={SOCIAL_LINKS.LINKEDIN}
              external
              variant="ghost-dark"
              testId="contact-linkedin"
            >
              LinkedIn
            </PillButton>
          </div>

          <div style={{ marginTop: 28 }}>
            <DownloadCvButton location="contact" align="left" />
          </div>
        </div>

        <GlassPanel tone="dark" className={styles.contactCard} data-reveal>
          <h3 className={styles.contactCardTitle}>Mande uma mensagem</h3>

          <form
            className={styles.contactForm}
            onSubmit={handleSubmit}
            noValidate
            aria-busy={isSubmitting}
          >
            <div className={styles.formHoneypot} aria-hidden="true">
              <label htmlFor="contact-website">Website</label>
              <input
                id="contact-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="contact-nome">Nome</label>
              <input
                id="contact-nome"
                type="text"
                name="name"
                autoComplete="name"
                maxLength={100}
                value={nome}
                aria-invalid={!!errors.nome}
                aria-describedby={errors.nome ? "contact-nome-error" : undefined}
                onChange={(e) => {
                  setNome(e.target.value);
                  if (errors.nome) setErrors((p) => ({ ...p, nome: undefined }));
                }}
                onFocus={() =>
                  trackPortfolioEvents.contactFormFieldFocus("name")
                }
              />
              {errors.nome && (
                <span id="contact-nome-error" className={styles.formError}>
                  {errors.nome}
                </span>
              )}
            </div>

            <div className={styles.formField}>
              <label htmlFor="contact-email">E-mail</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                autoComplete="email"
                maxLength={254}
                value={email}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email)
                    setErrors((p) => ({ ...p, email: undefined }));
                }}
                onFocus={() =>
                  trackPortfolioEvents.contactFormFieldFocus("email")
                }
              />
              {errors.email && (
                <span id="contact-email-error" className={styles.formError}>
                  {errors.email}
                </span>
              )}
            </div>

            <div className={styles.formField}>
              <label htmlFor="contact-message">Mensagem</label>
              <textarea
                id="contact-message"
                name="message"
                ref={messageRef}
                rows={4}
                maxLength={2000}
                value={message}
                aria-invalid={!!errors.message}
                aria-describedby={
                  errors.message ? "contact-message-error" : undefined
                }
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message)
                    setErrors((p) => ({ ...p, message: undefined }));
                }}
                onFocus={() =>
                  trackPortfolioEvents.contactFormFieldFocus("message")
                }
              />
              {errors.message && (
                <span id="contact-message-error" className={styles.formError}>
                  {errors.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className={styles.formSubmit}
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar mensagem"}
            </button>
          </form>
        </GlassPanel>
      </div>

      <div className={styles.contactFinePrint} data-reveal>
        <p>
          <LocationOn fontSize="small" sx={{ fontSize: 13, mr: 0.5 }} />
          {SITE_CONFIG.LOCATION}
        </p>
      </div>
    </section>
  );
};

export default ContactForm;
