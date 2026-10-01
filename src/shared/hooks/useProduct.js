import { useEffect, useState } from "react";
import { fetchProductById } from "../../services/productService";

/**
 * Carrega um produto por id com cancelamento lógico (evita setState após unmount).
 */
export function useProduct(productId) {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(Boolean(productId));

  useEffect(() => {
    if (!productId) {
      setProduct(null);
      setLoading(false);
      return;
    }

    let active = true;
    setLoading(true);
    setError(null);

    fetchProductById(productId)
      .then((data) => {
        if (active) setProduct(data);
      })
      .catch(() => {
        if (active) setError("Não foi possível carregar o produto.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [productId]);

  return { product, loading, error };
}
