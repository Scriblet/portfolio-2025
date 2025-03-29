import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";

type FormStatus = {
  type: "success" | "error" | "info";
  message: string;
};

const ContactForm = () => {
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
        display: "flex",
        justifyContent: "space-between",
        margin: "0 48px 0 56px",
        alignItems: "center",
      }}
    >
      <Box
        component={motion.div}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Vamos lá
        </Typography>

        <Typography
          sx={{
            fontSize: "16px",
            marginBottom: "48px",
            width: "60%",
            color: "rgb(132, 145, 160)",
            fontWeight: 400,
          }}
        >
          Se identificou? Minha caixa de entrada está aberta para oportunidades.
        </Typography>
      </Box>

      <Divider sx={{ marginBottom: "30px" }} />
      <Box
        component={motion.div}
        sx={{ width: "100%", maxWidth: "600px", margin: "0 0 32px" }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "16px",
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
              },
            }}
          />
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "16px",
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
              },
            }}
          />
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Mensagem
          </Typography>

          <TextField
            variant="outlined"
            multiline
            rows={4}
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
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{
              color: "#fff",
              padding: "10px 20px",
              fontWeight: "bold",
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

      <Divider sx={{ margin: "30px 0" }} />
    </Box>
  );
};

export default ContactForm;
