import React, { useState, useEffect } from 'react';
import CardProduct from '../components/cardProduct/CardProduct';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../features/products/products';
import { useFetch } from '../hooks/useFetch';
import HeroBanner from '../components/heroBanner/HeroBanner';

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const [search, setSearch] = useState('');
  const { data: productsStart } = useFetch('https://dummyjson.com/products?limit=8');

  useEffect(() => {
    if (productsStart) {
      dispatch(addProduct(productsStart));
    }
  }, [productsStart, dispatch]);

  const filteredProducts = search.length > 0
    ? products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()))
    : products;

  return (
    <>
      <main>
        <HeroBanner />
        <div className="main-content">
          <div className="container m-auto">
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7">
              {filteredProducts?.map(product => {
                return (
                  <CardProduct key={product.id} props={product} />
                )
              })}
            </div>
          </div>            
        </div>
      </main>
    </>
  );
}
