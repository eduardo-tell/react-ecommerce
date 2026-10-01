import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCatalog } from "../features/catalog/catalogSlice";
import { selectCatalogProducts } from "../features/catalog/catalogSelectors";
import { fetchProductList } from "../services/productService";
import { PageHero } from "../shared/components/PageHero";
import { ProductGrid } from "../shared/components/ProductGrid";
import { useDocumentMeta } from "../shared/hooks/useDocumentMeta";

export function HomePage() {
  const dispatch = useDispatch();
  const products = useSelector(selectCatalogProducts);

  useDocumentMeta({
    title: "E-commerce | Loja online",
    description:
      "Confira nossa vitrine de produtos com ofertas, carrinho e lista de favoritos.",
  });

  useEffect(() => {
    fetchProductList(12)
      .then((items) => dispatch(setCatalog(items)))
      .catch(() => {
        /* falha de rede: vitrine permanece vazia ou com cache persistido */
      });
  }, [dispatch]);

  return (
    <main id="main-content">
      <PageHero />
      <section className="container mx-auto pb-12">
        <h2 className="text-center text-4xl font-bold mt-7 mb-5">Produtos</h2>
        <ProductGrid products={products} />
      </section>
    </main>
  );
}
