import { useEffect } from "react";

/** Fecha modais/drawers ao pressionar Escape */
export function useOnEscape(handler, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") handler();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handler, enabled]);
}
