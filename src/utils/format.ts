// utils/formatters.ts

// Format currency in Qatari Riyal (QAR)
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-QA', {
    style: 'currency',
    currency: 'QAR',
    maximumFractionDigits: 2 // you can set to 0 if you don't want decimals
  }).format(amount);
};

// Format date in Qatar locale (short month, day, year)
export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-QA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
