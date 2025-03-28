import { useState } from "react";
import { Box, TextField, Button, Typography, Divider } from "@mui/material";
import { motion } from "framer-motion";

const ContactForm = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Substitua pelo seu webhook do Discord
  const DISCORD_WEBHOOK: string =
    "https://discord.com/api/webhooks/SEU_WEBHOOK_AQUI";

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(DISCORD_WEBHOOK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: `Nova mensagem de: ${email}\nMensagem: ${message}`,
        }),
      });

      if (response.ok) {
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{
        maxWidth: "400px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        color: "#333",
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
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        Ágoto que você sabe muito sobre mim, deixe-me saber se você tem
        interesse em trabalhar comigo.
      </Typography>

      <Divider sx={{ marginBottom: "30px" }} />

      <Typography
        variant="h2"
        sx={{
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Vamos lá
      </Typography>

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
          Email
        </Typography>

        <TextField
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#333",
              },
              "&:hover fieldset": {
                borderColor: "#555",
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
              "&:hover fieldset": {
                borderColor: "#555",
              },
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          sx={{
            backgroundColor: "#333",
            color: "#fff",
            padding: "10px 20px",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#555",
            },
          }}
          component={motion.button}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? "Enviando..." : "Enviar"}
        </Button>
      </Box>

      <Divider sx={{ margin: "30px 0" }} />
    </Box>
  );
};

export default ContactForm;
