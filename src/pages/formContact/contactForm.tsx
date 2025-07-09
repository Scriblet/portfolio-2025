import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";

type FormStatus = {
  type: "success" | "error" | "info";
  message: string;
};

const ContactForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [email, setEmail] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [status, setStatus] = useState<FormStatus | null>(null);

  const DISCORD_WEBHOOK: string =
    "https://discord.com/api/webhooks/1355261652236239302/bigEjdL2y0_Bd2EsZMMa6JljmiY70NsHwmkUKS2OKpxLTym9RmKSsIQD8pf29xt8aR9J";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      // Formatar a mensagem para o Discord
      const discordMessage = {
        content:
          "📬 <@197222374133727232> **Nova mensagem do formulário de contato!**",
        embeds: [
          {
            title: "Detalhes do Contato",
            fields: [
              { name: "👤 Nome", value: nome || "Não informado" },
              { name: "✉️ Email", value: email || "Não informado" },
              { name: "💬 Mensagem", value: message || "Não informada" },
            ],
            color: 5814783, // Cor roxa (opcional)
          },
        ],
      };

      const response = await fetch(DISCORD_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(discordMessage),
      });

      if (response.ok) {
        setStatus({
          type: "success",
          message: "✅ Mensagem enviada com sucesso!",
        });
        setNome("");
        setEmail("");
        setMessage("");
      } else {
        throw new Error("Falha ao enviar mensagem");
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "❌ Erro ao enviar mensagem. Tente novamente mais tarde.",
      });
      console.error("Erro ao enviar para Discord:", error);
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
            color: "rgb(132, 145, 160)",
            fontWeight: 400,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          Se identificou? Minha caixa de entrada está aberta para oportunidades.
        </Typography>
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
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: "16px", md: "20px" },
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "14px", md: "16px" },
            }}
          >
            Nome
          </Typography>

          <TextField
            variant="outlined"
            fullWidth
            value={nome}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNome(e.target.value)
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#333",
                },
                fontSize: { xs: "14px", md: "16px" },
              },
            }}
          />
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "14px", md: "16px" },
            }}
          >
            Email
          </Typography>

          <TextField
            variant="outlined"
            fullWidth
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#333",
                },
                fontSize: { xs: "14px", md: "16px" },
              },
            }}
          />
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "14px", md: "16px" },
            }}
          >
            Mensagem
          </Typography>

          <TextField
            variant="outlined"
            multiline
            rows={isMobile ? 3 : 4}
            fullWidth
            value={message}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMessage(e.target.value)
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#333",
                },
                fontSize: { xs: "14px", md: "16px" },
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
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

          {status && (
            <Alert severity={status.type} sx={{ mt: 2 }} component={motion.div}>
              {status.message}
            </Alert>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ContactForm;
