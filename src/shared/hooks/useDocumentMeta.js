import { useEffect } from "react";

/**
 * SEO básico em SPA: atualiza <title> e meta description por página.
 * (Sem dependência extra; compatível com CRA.)
 */
export function useDocumentMeta({ title, description }) {
  useEffect(() => {
    if (title) document.title = title;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    if (description) meta.setAttribute("content", description);
  }, [title, description]);
}
