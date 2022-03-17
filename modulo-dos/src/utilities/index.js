//Format number as currency
export default function formatCurrency( ammount ){
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(ammount)
}