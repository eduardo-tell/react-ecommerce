import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFetch } from '../hooks/useFetch';
import { toggleCartProduct } from '../features/cart/cart';
import { selectIsProductInCart } from '../features/cart/selectors';
import { toggleFavorite } from '../features/favorites/favorites';
import { selectIsProductFavorite } from '../features/favorites/selectors';
import './productDetails.scss';

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: product } = useFetch(`https://dummyjson.com/products/${id}`);
  const [activeImage, setActiveImage] = useState(0);

  const isInCart = useSelector(state => product && selectIsProductInCart(state, product.id));
  const isFavorite = useSelector(state => product && selectIsProductFavorite(state, product.id));

  if (!product) {
    return (
      <main id="main-content" className="main-content p-6">
        <p className="container m-auto" role="status">Carregando produto...</p>
      </main>
    )
  }

  const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);

  return (
    <main id="main-content" className="main-content p-6 product-details">
      <div className="container m-auto">
        <nav aria-label="breadcrumb" className="text-sm mb-4">
          <Link to="/" className="underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600">Início</Link>
          <span aria-hidden="true"> / </span>
          <span>{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section aria-label="Galeria de imagens do produto">
            <div className="product-details__main-image">
              <img src={product.images[activeImage] || product.thumbnail} alt={product.title} />
            </div>
            <ul className="product-details__thumbnails">
              {product.images.map((image, index) => (
                <li key={image}>
                  <button
                    type="button"
                    className={`focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 ${index === activeImage ? 'active' : ''}`}
                    aria-pressed={index === activeImage}
                    aria-label={`Ver imagem ${index + 1} de ${product.title}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img src={image} alt="" />
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section aria-label="Informações do produto">
            <p className="uppercase text-sm text-gray-500">{product.brand} · {product.category}</p>
            <h1 className="text-3xl font-bold mt-1">{product.title}</h1>

            <p className="mt-2" aria-label={`Avaliação ${product.rating} de 5`}>
              {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
              <span className="ml-2 text-sm text-gray-500">({product.rating})</span>
            </p>

            <div className="mt-4">
              {product.discountPercentage > 0 && (
                <p className="text-gray-400 line-through" aria-hidden="true">R${product.price}</p>
              )}
              <p className="text-3xl font-bold">
                R${discountedPrice}
                {product.discountPercentage > 0 && (
                  <span className="ml-2 text-sm font-normal text-green-700">-{product.discountPercentage}%</span>
                )}
              </p>
            </div>

            <p className="mt-4">{product.description}</p>

            {product.tags?.length > 0 && (
              <ul className="flex gap-2 mt-4" aria-label="Categorias do produto">
                {product.tags.map(tag => (
                  <li key={tag} className="bg-gray-100 rounded-full px-3 py-1 text-sm">{tag}</li>
                ))}
              </ul>
            )}

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                className={`flex-1 py-3 rounded-md font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${isInCart ? 'bg-[#c83a3a] text-white' : 'bg-black text-white'}`}
                aria-pressed={isInCart}
                onClick={() => dispatch(toggleCartProduct(product))}
              >
                {isInCart ? 'Remover do carrinho' : 'Adicionar ao carrinho'}
              </button>
              <button
                type="button"
                className={`py-3 px-4 rounded-md border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${isFavorite ? 'bg-yellow-100' : ''}`}
                aria-pressed={isFavorite}
                aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                onClick={() => dispatch(toggleFavorite(product))}
              >
                ★
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
