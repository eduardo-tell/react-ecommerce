# react-ecommerce-novo2

Refatoração do e-commerce de estudo com **organização por features**, camada de **serviços HTTP**, persistência segura e **SEO/usabilidade** melhorados.

## Arquitetura

- `src/app` — layout e rotas
- `src/features` — domínio (cart, catalog, favorites, product, search)
- `src/services` — API DummyJSON via `apiClient`
- `src/shared` — hooks, utils, componentes reutilizáveis
- `src/pages` — telas (composição fina)

## Segurança (práticas aplicadas)

- Base URL fixa no cliente HTTP (sem URLs arbitrárias)
- Sanitização/limites na busca e validação de `id` na URL
- Estado persistido validado antes de hidratar o Redux
- Formulário com validação e `maxLength` nos campos

## Rodar

```bash
cd react-ecommerce-novo2
npm install
npm run dev
```

Persistência: `localStorage` chave `reactEcommerceNovo2_v1`.
