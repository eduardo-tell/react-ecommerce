# REACT -> Ecommerce - https://kalles-5-2.myshopify.com/ pass - 4

Projeto de estudo em React com gerenciamento de estado global via **Redux Toolkit**, listagem de produtos, carrinho e favoritos. A aplicação foi criada com [Create React App](https://github.com/facebook/create-react-app) e utiliza roteamento, formulários, requisições HTTP e múltiplas abordagens de estilização.

---

## Tecnologias

### Core

| Pacote | Versão | Uso no projeto |
|--------|--------|----------------|
| [React](https://react.dev/) | ^18.2.0 | Biblioteca principal da interface |
| [React DOM](https://react.dev/) | ^18.2.0 | Renderização no navegador (`ReactDOM.createRoot`) |
| [react-scripts](https://create-react-app.dev/) | 5.0.1 | Build, dev server e configuração (CRA) |

### Gerenciamento de estado (Redux)

| Pacote | Versão | Uso no projeto |
|--------|--------|----------------|
| [Redux](https://redux.js.org/) | ^4.2.1 | Base do gerenciamento de estado global |
| [@reduxjs/toolkit](https://redux-toolkit.js.org/) | ^1.9.3 | `configureStore`, `createSlice` e Immer para reducers |
| [react-redux](https://react-redux.js.org/) | ^8.0.5 | `Provider`, `useDispatch` e `useSelector` |
| [redux-persist](https://github.com/rt2zz/redux-persist) | ^6.0.0 | Declarado no `package.json`, **não utilizado** no código |
| [redux-localstorage](https://www.npmjs.com/package/redux-localstorage) | ^0.4.1 | Declarado no `package.json`, **não utilizado** no código |

A persistência do estado é feita manualmente com um **middleware customizado** em `src/storage.js`, que grava o estado no `localStorage` após cada action.

### Roteamento

| Pacote | Versão | Uso no projeto |
|--------|--------|----------------|
| [react-router-dom](https://reactrouter.com/) | ^6.8.2 | `BrowserRouter`, `Routes`, `Route`, `Outlet`, `Link` |

### Requisições HTTP

| Pacote | Versão | Uso no projeto |
|--------|--------|----------------|
| [axios](https://axios-http.com/) | ^1.3.4 | Hook `useFetch` para consumo de APIs |

### Formulários

| Pacote | Versão | Uso no projeto |
|--------|--------|----------------|
| [react-hook-form](https://react-hook-form.com/) | ^7.43.9 | Formulário na página `/repositorio` |

### Estilização

| Pacote | Versão | Uso no projeto |
|--------|--------|----------------|
| [Tailwind CSS](https://tailwindcss.com/) | ^3.2.7 | Utilitários em layout, header, páginas e cards |
| [Sass](https://sass-lang.com/) | ^1.58.3 | Arquivos `.scss` em carrinho e favoritos |
| [styled-components](https://styled-components.com/) | ^6.0.0-rc.1 | Componentes estilizados em `CardProduct` e `ButtonCount` |
| [postcss](https://postcss.org/) | ^8.4.21 | Pipeline CSS (via CRA) |
| [autoprefixer](https://github.com/postcss/autoprefixer) | ^9.8.8 | Prefixos de vendor CSS |
| [postcss-preset-env](https://preset-env.cssdb.org/) | ^8.0.1 | Recursos CSS modernos |
| [postcss-flexbugs-fixes](https://github.com/luisrudge/postcss-flexbugs-fixes) | ^5.0.2 | Correções de bugs do Flexbox |

### Outros

| Pacote | Versão | Uso no projeto |
|--------|--------|----------------|
| [web-vitals](https://github.com/GoogleChrome/web-vitals) | ^2.1.4 | Métricas de performance (padrão CRA) |
| [gh-pages](https://github.com/tschaub/gh-pages) | — | Deploy estático (`npm run deploy`) |

---

## Estrutura do projeto (`src/`)

```
src/
├── index.js                 # Ponto de entrada: Provider Redux + rotas
├── storage.js               # Configuração da store Redux
├── Layout.js                # Layout com Header e Outlet
├── index.scss               # Diretivas Tailwind
├── pages/
│   ├── Home.js              # Listagem de produtos + busca
│   └── Repo.js              # Formulário de exemplo (react-hook-form)
├── components/
│   ├── header/Header.js     # Navegação, carrinho e favoritos
│   ├── card-product/        # Card de produto (dispatch Redux)
│   ├── cart/Cart.js         # Contador do carrinho (useSelector)
│   ├── favorites/Favorites.js # Contador de favoritos (useSelector)
│   └── buttonCount/         # Botão com badge de contagem
├── features/                # Slices Redux (Redux Toolkit)
│   ├── products/products.js
│   ├── cart/cart.js
│   └── favorites/favorites.js
└── hooks/
    ├── useFetch.js          # Hook para requisições com axios
    └── useCookie.js         # Hook em desenvolvimento (incompleto)
```

---

## Redux — como está sendo usado

O Redux é o **centro do estado global** da aplicação. Produtos carregados da API, itens do carrinho e favoritos vivem na store e são acessados ou alterados pelos componentes via `react-redux`.

### 1. Configuração da store (`storage.js`)

A store é criada com `configureStore` do Redux Toolkit e combina três reducers:

```javascript
reducer: {
  products: productsReducer,       // catálogo de produtos
  cartProducts: cartProductsReducer, // itens no carrinho
  favorites: favoritesReducer      // produtos favoritados
}
```

**Persistência:** em vez de `redux-persist`, o projeto usa um middleware próprio que, após cada action, serializa o estado inteiro em `localStorage` sob a chave `myReduxState`. Na inicialização, `preloadedState` restaura esse JSON, mantendo carrinho e favoritos entre recarregamentos da página.

### 2. Slices (Redux Toolkit)

Cada domínio é um **slice** criado com `createSlice`, que gera actions e reducers automaticamente. O Immer (interno ao Toolkit) permite mutação “direta” do `state` nos reducers de forma segura.

| Slice | Arquivo | Estado inicial | Action | Comportamento |
|-------|---------|----------------|--------|---------------|
| `products` | `features/products/products.js` | `[]` | `addProduct` | Adiciona produtos da API ao catálogo (evita duplicatas por `id`) |
| `cartProducts` | `features/cart/cart.js` | `[]` | `toggleCartProduct` | Adiciona ou remove produto do carrinho (toggle por `id`) |
| `favorites` | `features/favorites/favorites.js` | `[]` | `toggleFavorite` | Adiciona ou remove produto dos favoritos (toggle por `id`) |

### 3. Integração com React (`index.js`)

O componente raiz envolve toda a árvore com o `Provider` do `react-redux`, injetando a store:

```jsx
<Provider store={store}>
  <BrowserRouter>
    <Routes>...</Routes>
  </BrowserRouter>
</Provider>
```

Sem o `Provider`, `useDispatch` e `useSelector` não funcionariam nos componentes filhos.

### 4. Fluxo de dados nos componentes

```
                    ┌─────────────────┐
                    │   storage.js    │
                    │  (Redux Store)  │
                    └────────┬────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
    products            cartProducts          favorites
         │                   │                   │
         ▼                   ▼                   ▼
    Home.js              Cart.js            Favorites.js
  useSelector +        useSelector          useSelector
  useDispatch
  (addProduct)
         │
         ▼
   CardProduct.js
   useDispatch
   (toggleCartProduct, toggleFavorite)
```

| Componente | Hook Redux | O que faz |
|------------|------------|-----------|
| `Home.js` | `useSelector(state => state.products)` | Lê o catálogo para renderizar e filtrar por busca |
| `Home.js` | `useDispatch` + `addProduct` | Dispara action ao carregar dados da API |
| `CardProduct.js` | `useDispatch` | Botões disparam `toggleFavorite` e `toggleCartProduct` |
| `Cart.js` | `useSelector(state => state.cartProducts)` | Exibe contagem de itens no carrinho |
| `Favorites.js` | `useSelector(state => state.favorites)` | Exibe contagem de favoritos |

### 5. Exemplo de fluxo completo

1. **Carregar produtos:** `Home` busca dados (API local Strapi ou DummyJSON) e chama `dispatch(addProduct(payload))`.
2. **Reducer `products`:** o slice adiciona os itens ao array `state.products`.
3. **Renderização:** `useSelector` em `Home` re-renderiza a lista quando `products` muda.
4. **Favoritar / carrinho:** o usuário clica em `CardProduct` → `dispatch(toggleFavorite(props))` ou `dispatch(toggleCartProduct(props))`.
5. **Persistência:** o middleware grava o novo estado no `localStorage`.
6. **Contadores:** `Cart` e `Favorites` leem `cartProducts.length` e `favorites.length` via `useSelector`.

---

## Rotas

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/` | `Home` | Grid de produtos com campo de busca |
| `/repositorio` | `Repo` | Formulário de exemplo com validação |

O `Layout` renderiza o `Header` (links, carrinho e favoritos) e o conteúdo da rota ativa via `<Outlet />`.

---

## Scripts disponíveis

```bash
npm start      # Servidor de desenvolvimento (http://localhost:3000)
npm run build  # Build de produção na pasta build/
npm run deploy # Build + publicação via gh-pages
npm run eject  # Eject do CRA (irreversível)
```

---

## Estilização no projeto

A aplicação combina três abordagens:

- **Tailwind CSS** — classes utilitárias em páginas, header e layout (`darkMode: 'class'` no `tailwind.config.js`).
- **SCSS** — estilos em `cart/styles.scss` e `favorites/styles.scss`.
- **styled-components** — componentes `ContentBody`, `CardProductImage`, `Button`, `Count`, etc.

---

## Hooks customizados

- **`useFetch(url)`** — faz `GET` com axios e retorna `{ data }`; usado em `Home` para carregar produtos.
- **`useCookie`** — esboço incompleto (referências a `axios` e `url` sem import/definição).

---

## Observações

- `redux-persist` e `redux-localstorage` estão no `package.json`, mas a persistência implementada é o middleware manual em `storage.js`.
- Partes da UI de listagem do carrinho e favoritos estão comentadas; apenas os contadores no header estão ativos.
- A página `Home` mistura `fetch` nativo e o hook `useFetch`; o fluxo de dados para o Redux ainda está em evolução.

---

## Como executar

```bash
npm install
npm start
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.
