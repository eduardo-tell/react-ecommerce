# Atlas do projeto — Analisa Desenvolvedor Expert

Mapa para refatorar e criar feature sem quebrar os contratos atuais. Leia isto antes de desenhar pasta, slice ou fetch novos.

Stack: React 18, CRA (`react-scripts` 5), React Router 6 com flags `future.v7_*` em `src/app/routes.js`, Redux Toolkit 1.9, axios, react-hook-form só no checkout, Tailwind 3, styled-components, Sass em `src/styles/global.scss`. Node `24.x`. UI em pt-BR. Sem testes.

## Árvore que importa

```
src/index.js                 Provider + RouterProvider
src/store/index.js           configureStore + persistMiddleware
src/app/routes.js            createBrowserRouter
src/app/layout/              AppLayout, SiteHeader
src/pages/                   Home, Product, Search, Favorites, Checkout
src/features/cart/           slice, selectors, CartWidget, CartDrawer
src/features/catalog/        slice, selectors
src/features/favorites/      slice, selectors, FavoritesLink
src/features/product/        ProductCard, CartLineItem, *.styles.js
src/features/search/         SearchField
src/services/apiClient.js    axios, baseURL fixa, timeout 12s
src/services/productService.js
src/shared/constants/        api, routes, limits, storage
src/shared/hooks/            useProduct, useDebounce, useDocumentMeta, useOnEscape
src/shared/utils/            persist, sanitize, currency
src/shared/components/       ProductGrid, IconAction, BadgeCount, PageHero, SkipLink
```

`CartLineItem` vive em `features/product` e é usado pelo drawer e pelo checkout. Não mova sem atualizar os dois.

## Padrões para copiar

**Slice enxuto.** `initialState` é array. Reducer usa Immer (`push` / `splice` / `return []`). Payload sem `id` é ignorado. Carrinho grava um subconjunto de campos; favorito grava o objeto recebido.

**Selector puro no arquivo ao lado do slice.** Sem `createSelector` hoje. Só introduza memoização se um selector passar a alocar objeto/array novo e isso medir re-render real.

**Page busca ou lê, e compõe.** `HomePage` faz fetch no efeito e despacha `setCatalog`. `SearchPage` e `useProduct` guardam o resultado em `useState`. Não unifique os três no Redux numa refatoração “de limpeza”.

**Cancelamento lógico.**

```js
let active = true;
fetchAlgo().then((data) => {
  if (active) setData(data);
});
return () => {
  active = false;
};
```

**Debounce.** `useDebounce(value, delay = 400)` no `SearchField`. Autocomplete só com termo sanitizado de tamanho `>= SEARCH_MIN_AUTOCOMPLETE` (2). Limite do input e da sanitização: `SEARCH_MAX_LENGTH` (80). Sugestões pedem `limit` 6; a página de busca pede 20; a home pede 12.

**Acessibilidade já combinada.** `SkipLink` aponta para `#main-content` — toda page mantém esse id. `IconAction` recebe `as` (`button` ou `Link`) e `aria-label`. `BadgeCount` é `aria-hidden` (o número vai no label do ícone). Drawer: portal em `document.body`, `role="dialog"`, `aria-modal`, fecha com `useOnEscape`. Combobox da busca: `role="combobox"` / `listbox` / `option`.

**SEO de SPA.** `useDocumentMeta({ title, description })` por page. Não instale lib de head.

**Formulário.** `react-hook-form` com `register`, `maxLength`, `aria-invalid` e `role="alert"`. Checkout é o único form.

## Pontos de atenção

Não piore estes pontos. Não os “conserte” no meio de outra tarefa.

1. **Catálogo persistido não atualiza.** `setCatalog` ignora id que já está no array. Como `catalog` vai para o `localStorage`, a home pode mostrar preço, título ou thumbnail velhos para sempre. Trocar isso é mudança de comportamento: substituir a lista (ou o item) e decidir se o cache ainda deve ser persistido.

2. **`persistMiddleware` grava em toda action.** Inclusive action que não muda as três fatias. `savePersistedState` engole quota cheia. `loadPersistedState` só confere `Array.isArray`. Item sem `price` numérico quebra `selectCartTotal` (`price * quantity`). Validação nova de item exige `PERSIST_KEY` nova (`_v2`), senão o JSON antigo reidrata lixo.

3. **`quantity` é campo morto.** O total multiplica `item.quantity ?? 1`, mas o toggle não altera quantidade. Feature de quantidade é mudança de modelo: novo reducer, UI no `CartLineItem` (drawer e checkout) e chave de persistência.

4. **Favorito persiste o produto inteiro** (imagens, descrição, o que a API mandou). Carrinho persiste só cinco campos mais `quantity`. Ao adicionar campo que a UI precisa offline, escolha a fatia certa. Não passe a gravar o catálogo inteiro da API “por garantia”.

5. **Erro de rede assimétrico.** `useProduct` expõe `error`. `HomePage` engole o `catch`. `SearchField` não tem `catch` — rejeição vira promise não tratada e a lista antiga pode permanecer. `SearchPage` zera `loading` no `finally`, mas também não mostra erro.

6. **Drawer sempre montado.** `CartWidget` renderiza `CartDrawer` mesmo fechado. O portal existe; `pointer-events` e `visibility` escondem. Não há focus trap. `onClose` inline faz `useOnEscape` reassinar o listener a cada render do widget.

7. **Chave da miniatura.** Na galeria, `key={src}`. URL repetida em `images` colide. Prefira índice só se for alterar essa lista.

8. **`styled-components` está em `devDependencies`.** Os componentes de card e drawer importam em runtime. Não mova mais UI de produção para styled-components sem tratar essa dependência.

9. **Supabase está no `package.json` e não existe no `src`.** Não há sessão, tabela nem client. Feature de conta ou pedido real começa do zero; não assuma helper escondido.

10. **Flags do Router.** `v7_startTransition` e as outras em `app/routes.js` ficam. Não remova ao adicionar rota.

11. **Cores hardcoded fora do token.** `#c83a3a` no remover do carrinho, `#393E46` na borda da busca, `#e5e5e5` no drawer. Ao mexer no mesmo bloco, pode usar o token existente; não abra uma reforma de paleta.

12. **Texto do topo** do header é placeholder (`Lorem ipsum siamet`).

## Escalonamento

Suba um degrau só quando o degrau atual não comporta o pedido. O degrau 0 é o padrão.

### Degrau 0 — estender o que existe

Cabe feature de UI, filtro em memória, campo novo de formulário, endpoint DummyJSON, rota, componente de domínio.

Toque típico:

- page em `src/pages/`
- rota em `src/app/routes.js` e `ROUTES`
- se o dado é compartilhado: slice + selector + `reducer` em `src/store/index.js`
- se o dado vem da rede: função em `productService.js` (ou `src/services/<recurso>Service.js` se não for produto) e entrada em `API_ENDPOINTS`
- estado de widget continua local

O middleware de persistência já grava `state.cart`, `state.favorites` e `state.catalog`. Fatia nova **não** persiste até alguém incluir a chave em `savePersistedState` e `loadPersistedState`.

### Degrau 1 — fetch repetido ou corrida

Quando duas telas precisarem do mesmo recurso assíncrono, ou o flag `active` começar a se repetir com tratamento de erro.

Primeiro: um hook em `src/shared/hooks/` no formato de `useProduct` (`{ data, loading, error }`), ainda chamando o service.

Se o resultado precisar estar no Redux (outra tela lê sem refetch), aí sim `createAsyncThunk` no slice dono do dado, com `pending` / `rejected` explícitos. A home hoje não tem status de loading; introduzir status no `catalog` muda o shape de array puro para objeto e quebra a reidratação. Isso já é degrau 2.

Não adicione RTK Query nem React Query neste degrau.

### Degrau 2 — shape persistido

Obrigatório quando o state deixa de ser array, quando o item ganha campo obrigatório, ou quando `setCatalog` passar a substituir itens.

- Nova `PERSIST_KEY` (`reactEcommerceNovo2_v2`).
- `loadPersistedState` descarta item inválido em vez de confiar no array.
- Confira home, drawer, checkout, favoritos e o reload.

### Degrau 3 — pedido explícito do usuário

TypeScript, testes, Vite, Supabase, auth, pagamento, RTK Query, normalização (`createEntityAdapter`), focus trap, quantidade no carrinho, refresh real do catálogo.

Cada um é um projeto próprio. Não misture com uma feature de tela.

## Checklist de superfície compartilhada

| Mudou | Conferir também |
| --- | --- |
| Item do carrinho | `CartDrawer`, `CheckoutPage`, `CartLineItem`, `selectCartTotal`, badge em `CartWidget`, reload |
| Favorito | `ProductCard`, `ProductPage`, `FavoritesPage`, `FavoritesLink`, reload |
| Card / grade | Home, busca, favoritos (`ProductGrid`) |
| Preço | `formatBRL`, detalhe (desconto), card (preço cheio, sem desconto), linha do carrinho |
| Busca | `SearchField`, `SearchPage`, `sanitize`, `ROUTES.search` |
| Rota | `routes.js`, `ROUTES`, links, `useDocumentMeta` |
| Header | `SiteHeader`, skip link, badges |

## Verificação manual mínima

`npm run dev` e, no fluxo tocado: ação do usuário, estado nas outras telas que leem a mesma fatia, id inválido ou lista vazia, e um reload se a fatia é persistida.
