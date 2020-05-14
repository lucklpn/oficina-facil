function formatToPhone(value) {
  if (!value) return '';

  let formattedValue = `(${value.substring(0, 2)}) `;
  formattedValue += `${value.substring(2, 7)}-`;
  formattedValue += value.substring(7, 11);

  return formattedValue;
}

const { format: formatToCurrency } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export { formatToPhone, formatToCurrency };
