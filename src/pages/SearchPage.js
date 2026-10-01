import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchProducts } from "../services/productService";
import { ProductGrid } from "../shared/components/ProductGrid";
import { useDocumentMeta } from "../shared/hooks/useDocumentMeta";
import { sanitizeSearchQuery } from "../shared/utils/sanitize";

export function SearchPage() {
  const [params] = useSearchParams();
  const query = sanitizeSearchQuery(params.get("search") || "");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useDocumentMeta({
    title: query ? `Busca: ${query} | E-commerce` : "Busca | E-commerce",
    description: query
      ? `Resultados de produtos para "${query}".`
      : "Busque produtos na nossa loja.",
  });

  useEffect(() => {
    if (!query) {
      setProducts([]);
      return;
    }

    let active = true;
    setLoading(true);
    searchProducts(query)
      .then((items) => {
        if (active) setProducts(items);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [query]);

  return (
    <main id="main-content" className="container mx-auto px-4 py-6">
      <h1 className="text-center text-4xl font-bold mb-6">
        Resultados para &quot;{query}&quot;
      </h1>

      {loading && <p role="status" className="text-center">Carregando...</p>}

      {!loading && products.length === 0 && (
        <p role="status" className="text-center">Nenhum produto encontrado.</p>
      )}

      {!loading && products.length > 0 && <ProductGrid products={products} />}
    </main>
  );
}
