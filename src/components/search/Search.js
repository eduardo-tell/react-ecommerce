import React, { useState, useEffect } from 'react';
import ButtonCount from "../buttonCount/ButtonCount";
import { useDispatch, useSelector } from 'react-redux';

export default function Search({icon}) {
  const [search, setSearch] = useState('');
  const products = useSelector(state => state.products);

  const filteredProducts = search.length > 0
    ? products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()))
    : products;

  return (
    <>
      {/* onChange={e => setSearch(e.target.value)} value={search} */}
      <fieldset className='container m-auto hidden'>
        <input itemType='text' name='busca' placeholder='Buscar...'  className="border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-blue-600 block w-full rounded sm:text-xl focus:ring-1" />
      </fieldset>
      <ButtonCount src={icon} name="Pesquisar" />
    </>
  )
}
