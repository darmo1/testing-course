import * as React from 'react'
import axios from "axios"
import ScoopOptions from './ScoopOptions';
import Row from 'react-bootstrap/Row';
import ToppingOptions from './ToppingOptions';
import AlertBanner from '../common/AlertBanner';
import { pricePerItem } from '../../constant';
import { useOrderDetails } from '../../context/OrderDetails';
import formatCurrency from '../../utilities';

export default function Options({ optionType }) {

  const [orderDetails, updateItemCount] = useOrderDetails()
  const [items, setItems] = React.useState([]);
  const [error, setError] = React.useState(false)

  React.useEffect(() => {
    //OptionType is 'scoops' or 'toppings'
    const url = `http://localhost:3030/${optionType}`
    console.log(url, '🥪')
    axios.get(url)
      .then(response => setItems(response.data))
      .cath(err =>  setError(true))
  }, [optionType])

  if (error) {
    return <AlertBanner />
  }

  const ItemComponent = optionType === 'scoops' ? ScoopOptions : ToppingOptions
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase()

  const optionItems = items.map(item => (
    <ItemComponent 
      key={item.name} 
      name={item.name} 
      imagePath={item.imagePath}
      updateItemCount = {(itemName, newItemCount) => updateItemCount(itemName, newItemCount, optionType)   }
    />
  ))

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each </p>
      <p>{title} total : {orderDetails.totals[optionType]}</p>
      <Row> {optionItems} </Row>
    </>
  )
}
