import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import CardProduct from '../components/cardProduct/CardProduct';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (query.trim().length === 0) {
      setProducts([])
      return
    }

    let isCurrentRequest = true

    axios.get(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`)
      .then(response => {
        if (isCurrentRequest) setProducts(response.data.products)
      })

    return () => { isCurrentRequest = false }
  }, [query]);

  return (
    <main id="main-content" className="main-content p-6">
      <div className="container m-auto">
        <h1 className="w-full text-center mb-5 mt-1 text-4xl font-bold">
          Resultados para "{query}"
        </h1>

        {products.length === 0 ? (
          <p className="text-center" role="status">Nenhum produto encontrado.</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-4 lg:px-0 gap-7">
            {products.map(product => (
              <CardProduct key={product.id} props={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
