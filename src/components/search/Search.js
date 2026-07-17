import { useEffect, useId, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDebounce } from '../../hooks/useDebounce';
import ButtonCount from "../buttonCount/ButtonCount";
import { MainSearch } from './styles.tsx';

export default function Search({ icon }) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const debouncedQuery = useDebounce(query)
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const listboxId = useId()

  useEffect(() => {
    if (debouncedQuery.trim().length === 0) {
      setResults([])
      return
    }

    let isCurrentRequest = true

    axios.get(`https://dummyjson.com/products/search?q=${encodeURIComponent(debouncedQuery)}&limit=6`)
      .then(response => {
        if (isCurrentRequest) setResults(response.data.products)
      })

    return () => { isCurrentRequest = false }
  }, [debouncedQuery])

  function openSearch() {
    setIsOpen(true)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  function closeSearch() {
    setIsOpen(false)
    setActiveIndex(-1)
  }

  function goToProduct(productId) {
    navigate(`/produto/${productId}`)
    setQuery('')
    closeSearch()
  }

  function goToSearchResults() {
    if (query.trim().length === 0) return
    navigate(`/busca?q=${encodeURIComponent(query.trim())}`)
    closeSearch()
  }

  function handleInputChange(event) {
    setQuery(event.target.value)
    setActiveIndex(-1)
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      closeSearch()
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex(index => Math.min(index + 1, results.length - 1))
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex(index => Math.max(index - 1, -1))
      return
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      if (activeIndex >= 0 && results[activeIndex]) {
        goToProduct(results[activeIndex].id)
      } else {
        goToSearchResults()
      }
    }
  }

  return (
    <MainSearch className="search">
      <ButtonCount src={icon} name="Pesquisar" />

      <fieldset className="search__panel w-[300px]">
        <label htmlFor="search-input" className="sr-only">Buscar produtos</label>
        <input
          id="search-input"
          ref={inputRef}
          type="search"
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls={listboxId}
          aria-activedescendant={activeIndex >= 0 ? `search-option-${activeIndex}` : undefined}
          autoComplete="off"
          name="busca"
          placeholder="Buscar..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base focus:outline-none border-2 placeholder:text-gray-500 border-[#29A29D] sm:text-sm/6"
        />

        {query.trim().length >= 3 ? (
          <div className="search__results p-1">
            {results.length > 0 && results.length <= 3 ? (
              <ul id={listboxId} className="mx-3" role="listbox">
                {results.map((product, index) => (
                  <li
                    key={product.id}
                    id={`search-option-${index}`}
                    role="option"
                    aria-selected={index === activeIndex}
                    className="flex gap-1 py-3 border-b-2 border-primary hover:bg-slate-100"
                    onClick={() => goToProduct(product.id)}
                  >
                    <picture className="flex-shrink-0 size-14 bg-[#D9D9D9]">
                      <img src={product.thumbnail} alt="Produto" className="size-14" width="32" height="32" />
                    </picture>
                    <div className="w-full1">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold text-ellipsis w-[213px] leading-none truncate">{product.title}</span>
                        <span className="text-xs text-gray-500 text-ellipsis w-[213px] leading-none truncate"> {product.description} </span>
                      </div>
                      <span className="text-sm leading-none text-primary"><b>R$ {product.price.toFixed(2)}</b></span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : results.length === 0 ? (
              <div className="search__no-results">
                <span>Nenhum resultado encontrado</span>
              </div>
            ) : null}
          </div>
        ) : null}
      </fieldset>
    </MainSearch>
  )
}
