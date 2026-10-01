import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleCartItem } from "../features/cart/cartSlice";
import { selectIsInCart } from "../features/cart/cartSelectors";
import { toggleFavorite } from "../features/favorites/favoritesSlice";
import { selectIsFavorite } from "../features/favorites/favoritesSelectors";
import { ROUTES } from "../shared/constants/routes";
import { useDocumentMeta } from "../shared/hooks/useDocumentMeta";
import { useProduct } from "../shared/hooks/useProduct";
import { parseProductId } from "../shared/utils/sanitize";
import { formatBRL } from "../shared/utils/currency";

export function ProductPage() {
  const { id: idParam } = useParams();
  const productId = parseProductId(idParam);
  const { product, loading, error } = useProduct(productId);
  const [imageIndex, setImageIndex] = useState(0);
  const dispatch = useDispatch();

  const inCart = useSelector((state) =>
    product ? selectIsInCart(state, product.id) : false
  );
  const favorite = useSelector((state) =>
    product ? selectIsFavorite(state, product.id) : false
  );

  useDocumentMeta({
    title: product ? `${product.title} | E-commerce` : "Produto | E-commerce",
    description: product?.description?.slice(0, 155) ?? "Detalhes do produto.",
  });

  if (!productId) {
    return (
      <main id="main-content" className="container mx-auto p-6">
        <p>Produto inválido.</p>
        <Link to={ROUTES.home} className="underline">Voltar</Link>
      </main>
    );
  }

  if (loading) {
    return (
      <main id="main-content" className="container mx-auto p-6" role="status">
        Carregando produto...
      </main>
    );
  }

  if (error || !product) {
    return (
      <main id="main-content" className="container mx-auto p-6">
        <p>{error ?? "Produto não encontrado."}</p>
        <Link to={ROUTES.home} className="underline">Voltar à loja</Link>
      </main>
    );
  }

  const discounted =
    product.price * (1 - (product.discountPercentage || 0) / 100);
  const images = product.images?.length ? product.images : [product.thumbnail];

  return (
    <main id="main-content" className="container mx-auto p-6">
      <nav aria-label="breadcrumb" className="text-sm mb-4">
        <Link to={ROUTES.home} className="underline">Início</Link>
        <span aria-hidden="true"> / </span>
        <span>{product.title}</span>
      </nav>

      <article className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section aria-label="Galeria de imagens">
          <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden">
            <img
              src={images[imageIndex]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <ul className="flex gap-2 mt-3 list-none p-0 m-0">
            {images.map((src, index) => (
              <li key={src}>
                <button
                  type="button"
                  className={`w-16 h-16 rounded overflow-hidden border-2 ${
                    index === imageIndex ? "border-black" : "border-transparent"
                  }`}
                  aria-pressed={index === imageIndex}
                  onClick={() => setImageIndex(index)}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section aria-label="Informações do produto">
          <p className="text-sm text-gray-500 uppercase">
            {product.brand} · {product.category}
          </p>
          <h1 className="text-3xl font-bold mt-1">{product.title}</h1>

          <p className="mt-4 text-3xl font-bold">{formatBRL(discounted)}</p>
          {product.discountPercentage > 0 && (
            <p className="text-gray-400 line-through">{formatBRL(product.price)}</p>
          )}

          <p className="mt-4">{product.description}</p>

          <div className="flex gap-2 mt-6">
            <button
              type="button"
              className={`flex-1 py-3 rounded-md transition-colors ${
                inCart
                  ? "bg-[#c83a3a] text-white"
                  : "bg-secundary hover:bg-primary hover:text-white"
              }`}
              aria-pressed={inCart}
              onClick={() => dispatch(toggleCartItem(product))}
            >
              {inCart ? "Remover do carrinho" : "Adicionar ao carrinho"}
            </button>

            <button
              type="button"
              className="p-3 rounded-md bg-white border"
              aria-pressed={favorite}
              aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              onClick={() => dispatch(toggleFavorite(product))}
            >
              <img
                src={favorite ? "/star-active.svg" : "/star.svg"}
                width={24}
                height={24}
                alt=""
              />
            </button>
          </div>
        </section>
      </article>
    </main>
  );
}
