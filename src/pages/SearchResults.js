import { MouseEventHandleruseEffect, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import CardProduct from '../components/cardProduct/CardProduct';
// import Select, {
//   components,
//   ControlProps,
//   Props,
//   StylesConfig,
// } from 'react-select';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search') || '';
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

        <div class="w-full max-w-sm min-w-[200px]">
          <div class="relative">
            <select value="london" class="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
              <option value="brazil">Brazil</option>
              <option value="bucharest">Bucharest</option>
              <option value="london">London</option>
              <option value="washington">Washington</option>
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"/>
            </svg>
          </div>
        </div>

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
