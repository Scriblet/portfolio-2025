import InstallMobileIcon from "@mui/icons-material/InstallMobile";
import { IconButton, Tooltip } from "@mui/material";
import { useInstallPrompt } from "../../hooks/useInstallPrompt";

/**
 * Botão discreto de instalação do PWA.
 *
 * Só aparece quando o navegador oferece o prompt nativo
 * (`beforeinstallprompt`) e o app ainda não está instalado. Em navegadores sem
 * suporte, o componente não renderiza nada.
 */
const InstallButton = () => {
  const { canInstall, promptInstall } = useInstallPrompt();

  if (!canInstall) {
    return null;
  }

  return (
    <Tooltip title="Instalar o portfólio">
      <IconButton
        color="inherit"
        aria-label="Instalar o portfólio"
        data-testid="install-button"
        onClick={() => {
          void promptInstall();
        }}
        sx={{ minWidth: 44, minHeight: 44 }}
      >
        <InstallMobileIcon />
      </IconButton>
    </Tooltip>
  );
};

export default InstallButton;
