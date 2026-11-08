import { useState } from "react";
import styles from "./immersive.module.scss";

type FieldErrors = {
  nome?: string;
  email?: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const ImmersiveContactForm = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(
    null,
  );

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    const cleanName = nome.trim();
    if (!cleanName) next.nome = "Informe seu nome.";
    else if (cleanName.length > 100) next.nome = "O nome deve ter no máximo 100 caracteres.";

    const cleanEmail = email.trim();
    if (!cleanEmail) next.email = "Informe seu email.";
    else if (cleanEmail.length > 254 || !EMAIL_RE.test(cleanEmail))
      next.email = "Informe um email válido.";

    const cleanMessage = message.trim();
    if (!cleanMessage) next.message = "Escreva sua mensagem.";
    else if (cleanMessage.length > 2000)
      next.message = "A mensagem deve ter no máximo 2000 caracteres.";

    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setFeedback(null);
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
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
        setFeedback({ type: "error", text: "Muitas tentativas. Aguarde um minuto." });
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
        setNome("");
        setEmail("");
        setMessage("");
        setErrors({});
        setFeedback({ type: "success", text: "Mensagem enviada. Responderei em breve." });
      } else {
        setFeedback({
          type: "error",
          text: "Não foi possível enviar. Tente pelo e-mail ou LinkedIn.",
        });
      }
    } catch {
      setFeedback({
        type: "error",
        text: "Erro de conexão. Tente pelo e-mail ou LinkedIn.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      id="immersive-contact-form"
      className={styles.contactForm}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className={styles.formField}>
        <label htmlFor="immersive-nome">Nome</label>
        <input
          id="immersive-nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          autoComplete="name"
          aria-invalid={!!errors.nome}
          aria-describedby={errors.nome ? "immersive-nome-error" : undefined}
        />
        {errors.nome && (
          <span id="immersive-nome-error" className={styles.formError}>
            {errors.nome}
          </span>
        )}
      </div>

      <div className={styles.formField}>
        <label htmlFor="immersive-email">E-mail</label>
        <input
          id="immersive-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "immersive-email-error" : undefined}
        />
        {errors.email && (
          <span id="immersive-email-error" className={styles.formError}>
            {errors.email}
          </span>
        )}
      </div>

      <div className={styles.formField}>
        <label htmlFor="immersive-message">Mensagem</label>
        <textarea
          id="immersive-message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "immersive-message-error" : undefined}
        />
        {errors.message && (
          <span id="immersive-message-error" className={styles.formError}>
            {errors.message}
          </span>
        )}
      </div>

      <div className={styles.formHoneypot} aria-hidden="true">
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
        />
      </div>

      {feedback && (
        <p
          className={
            feedback.type === "success" ? styles.formSuccess : styles.formError
          }
        >
          {feedback.text}
        </p>
      )}

      <button
        type="submit"
        className={styles.formSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Enviando..." : "Enviar mensagem"}
      </button>
    </form>
  );
};
