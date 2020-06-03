function formatToPhone(value) {
  if (!value) return '';

  let formattedValue = `(${value.substring(0, 2)}) `;
  formattedValue += `${value.substring(2, 7)}-`;
  formattedValue += value.substring(7, 11);

  return formattedValue;
}

function formatToCpf(value) {
  if (!value) return '';

  let formattedValue = `${value.substring(0, 3)}.`;
  formattedValue += `${value.substring(3, 6)}.`;
  formattedValue += `${value.substring(6, 9)}-`;
  formattedValue += value.substring(9, 11);

  return formattedValue;
}

const { format: formatToCurrency } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const { format: formatToDecial } = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatToAddress(customer) {
  if (!customer) return '';

  let fullAddress = '';

  if (customer.address) {
    fullAddress += `${customer.address}, `;
  }

  if (customer.address_number) {
    fullAddress += `${customer.address_number}, `;
  }

  if (customer.district) {
    fullAddress += `${customer.district} - `;
  }

  if (customer.city) {
    fullAddress += `${customer.city}, `;
  }

  if (customer.state) {
    fullAddress += `${customer.state}`;
  }

  return fullAddress || 'Não informado';
}

export {
  formatToPhone,
  formatToCpf,
  formatToCurrency,
  formatToDecial,
  formatToAddress,
};
