import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CardProduct from '../components/cardProduct/CardProduct';
import { selectFavorites } from '../features/favorites/selectors';

export default function Favoritos() {
  const favorites = useSelector(selectFavorites);

  return (
    <main id="main-content" className="main-content p-6">
      <div className="container m-auto">
        <h1 className="w-full text-center mb-5 mt-1 text-4xl font-bold">Favoritos</h1>

        {favorites.length === 0 ? (
          <p className="text-center">
            Você ainda não adicionou produtos aos favoritos.{' '}
            <Link to="/" className="underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600">
              Ver produtos
            </Link>
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-4 lg:px-0 gap-7">
            {favorites.map(product => (
              <CardProduct key={product.id} props={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
