import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectFavorites } from "../features/favorites/favoritesSelectors";
import { ProductGrid } from "../shared/components/ProductGrid";
import { ROUTES } from "../shared/constants/routes";
import { useDocumentMeta } from "../shared/hooks/useDocumentMeta";

export function FavoritesPage() {
  const favorites = useSelector(selectFavorites);

  useDocumentMeta({
    title: "Favoritos | E-commerce",
    description: "Produtos que você marcou como favoritos.",
  });

  return (
    <main id="main-content" className="container mx-auto px-4 py-6">
      <h1 className="text-center text-4xl font-bold mb-6">Favoritos</h1>

      {favorites.length === 0 ? (
        <p className="text-center">
          Você ainda não adicionou produtos aos favoritos.{" "}
          <Link to={ROUTES.home} className="underline">Ver produtos</Link>
        </p>
      ) : (
        <ProductGrid products={favorites} />
      )}
    </main>
  );
}
