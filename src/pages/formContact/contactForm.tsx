import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import DownloadCvButton from "../../components/DownloadCvButton";
import { useSnackbar } from "../../components/feedback/SnackbarProvider";

type FieldErrors = {
  nome?: string;
  email?: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const ContactForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { notify } = useSnackbar();

  const [email, setEmail] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [website, setWebsite] = useState<string>(""); // honeypot
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<FieldErrors>({});

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

      if (response.ok) {
        // Confere o contrato JSON: se a function não estiver publicada, o
        // fallback da SPA pode devolver index.html com status 200.
        let data: unknown = null;
        try {
          data = await response.json();
        } catch {
          data = null;
        }

        const accepted =
          typeof data === "object" &&
          data !== null &&
          (data as { ok?: unknown }).ok === true;

        if (accepted) {
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
      }

      if (response.status === 429) {
        notify({
          severity: "warning",
          message: "Muitas tentativas. Aguarde um minuto e tente novamente.",
          context: "contact",
        });
        return;
      }

      notify({
        severity: "error",
        message: "Não foi possível enviar. Tente novamente.",
        context: "contact",
      });
    } catch {
      // Falha de rede: mantém os campos preenchidos para permitir retry.
      notify({
        severity: "error",
        message: "Não foi possível enviar. Tente novamente.",
        context: "contact",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      id="contact"
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{
        "padding-top": { xs: "2rem", md: "4rem" },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        margin: {
          xs: "0 1rem 2rem",
          sm: "0 2rem 2rem",
          md: "0 48px 0 56px",
        },
        alignItems: { xs: "stretch", md: "center" },
        gap: { xs: 3, md: 0 },
      }}
    >
      <Box
        component={motion.div}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "flex-start" },
          width: { xs: "100%", md: "40%" },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "1.5rem", sm: "1.8rem", md: "24px" },
            fontWeight: "bold",
            textAlign: { xs: "center", md: "left" },
            marginBottom: { xs: "16px", md: "20px" },
          }}
        >
          Vamos lá
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: "14px", sm: "15px", md: "16px" },
            marginBottom: { xs: "32px", md: "48px" },
            width: { xs: "100%", md: "60%" },
            color: theme.palette.text.secondary,
            fontWeight: 400,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          Se identificou? Minha caixa de entrada está aberta para oportunidades.
        </Typography>

        <DownloadCvButton
          location="contact"
          align={isMobile ? "center" : "left"}
        />
      </Box>

      <Box
        component={motion.div}
        sx={{
          width: { xs: "100%", md: "55%" },
          maxWidth: { xs: "100%", md: "600px" },
          margin: { xs: "0", md: "0 0 32px" },
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          aria-busy={isSubmitting}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: "16px", md: "20px" },
            position: "relative",
          }}
        >
          {/* Honeypot: invisível para humanos, isca para bots. */}
          <Box
            aria-hidden="true"
            sx={{
              position: "absolute",
              left: "-9999px",
              top: 0,
              width: "1px",
              height: "1px",
              overflow: "hidden",
            }}
          >
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
          </Box>

          <TextField
            variant="outlined"
            fullWidth
            label="Nome"
            name="name"
            autoComplete="name"
            required
            value={nome}
            error={Boolean(errors.nome)}
            helperText={errors.nome}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNome(e.target.value);
              if (errors.nome) {
                setErrors((prev) => ({ ...prev, nome: undefined }));
              }
            }}
            inputProps={{ maxLength: 100 }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: theme.palette.divider,
                },
                fontSize: { xs: "14px", md: "16px" },
              },
            }}
          />

          <TextField
            variant="outlined"
            fullWidth
            type="email"
            label="Email"
            name="email"
            autoComplete="email"
            required
            value={email}
            error={Boolean(errors.email)}
            helperText={errors.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
              if (errors.email) {
                setErrors((prev) => ({ ...prev, email: undefined }));
              }
            }}
            inputProps={{ maxLength: 254 }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: theme.palette.divider,
                },
                fontSize: { xs: "14px", md: "16px" },
              },
            }}
          />

          <TextField
            variant="outlined"
            multiline
            rows={isMobile ? 3 : 4}
            fullWidth
            label="Mensagem"
            name="message"
            required
            value={message}
            error={Boolean(errors.message)}
            helperText={errors.message}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setMessage(e.target.value);
              if (errors.message) {
                setErrors((prev) => ({ ...prev, message: undefined }));
              }
            }}
            inputProps={{ maxLength: 2000 }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: theme.palette.divider,
                },
                fontSize: { xs: "14px", md: "16px" },
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
            sx={{
              color: "#fff",
              padding: { xs: "8px 16px", md: "10px 20px" },
              fontWeight: "bold",
              fontSize: { xs: "14px", md: "16px" },
            }}
            component={motion.button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactForm;
