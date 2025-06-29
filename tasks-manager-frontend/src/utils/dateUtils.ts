export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};
