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
      <ButtonCount src={icon} name="Pesquisar" onClick={openSearch} />

      {isOpen && (
        <fieldset className="search__panel">
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
            onChange={event => { setQuery(event.target.value); setActiveIndex(-1) }}
            onKeyDown={handleKeyDown}
            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-[#29A29D] focus:outline-2 focus:outline-offset-2 focus:outline-[#29A29D] border-2 placeholder:text-gray-500 border-[#29A29D] sm:text-sm/6"
          />

          {results.length > 0 && (
            <ul id={listboxId} role="listbox" className="search__results">
              {results.map((product, index) => (
                <li
                  key={product.id}
                  id={`search-option-${index}`}
                  role="option"
                  aria-selected={index === activeIndex}
                  className={index === activeIndex ? 'active' : ''}
                  onClick={() => goToProduct(product.id)}
                >
                  <img src={product.thumbnail} alt="" width="32" height="32" />
                  <span>{product.title}</span>
                </li>
              ))}
            </ul>
          )}
        </fieldset>
      )}
    </MainSearch>
  )
}
