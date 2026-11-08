import { useEffect, useState } from "react";

/**
 * Estado de conectividade do navegador.
 *
 * Usa `navigator.onLine` como valor inicial e acompanha os eventos `online` /
 * `offline`. Em ambientes sem `navigator` (SSR/testes) assume online, para que
 * o comportamento padrão seja o da SPA normal.
 */
export function useOnlineStatus(): boolean {
  const [online, setOnline] = useState(() =>
    typeof navigator === "undefined" ? true : navigator.onLine,
  );

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return online;
}

export default useOnlineStatus;
