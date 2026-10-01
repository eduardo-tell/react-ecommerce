/** Formata número como preço em Real (pt-BR) */
export function formatBRL(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount)) return "R$0,00";
  return amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
