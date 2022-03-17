import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { pricePerItem } from '../constant';
import formatCurrency from '../utilities';


const OrderDetails = createContext();

//create a custom hook to check wether we're inside a provider

export function useOrderDetails() {
  const context = useContext(OrderDetails);
  if (!context) {
    throw new Error(
      'userOrderDetail must be used within an OrderDetailsProvider'
    );
  }
  return context
}

function calculateSubtotal( optionType , optionCounts  ){

  let optionCount = 0;
  for ( const count of optionCounts[optionType].values()){
    optionCount += count
  }
  return optionCount * pricePerItem[optionType]
}

export function OrderDetailsProvider(props) {

  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    topings: new Map()
  })
  const zeroCurrency = formatCurrency(0);
  const [ totals, setTotals ] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency
  })

  useEffect( () => {
    const scoopSubtotal = calculateSubtotal("scoops", optionCounts);
    const toppingSubtotal = calculateSubtotal('toppings', optionCounts);
    const grandTotal =  scoopSubtotal + toppingSubtotal;
    setTotals({
      scoops: formatCurrency(scoopSubtotal),
      toppings: formatCurrency(toppingSubtotal),
      grandTotal: formatCurrency(grandTotal)
    })
  }, [optionCounts])

  const value = useMemo(() => {

    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionsCount = { ...optionCounts }

      // update option count for this item with the new value
      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionCounts(newOptionsCount)
    }

    function resetOrder(){
      setOptionCounts({
        scoops: new Map(),
        toppings: new Map()
      })
    }

    //getter: is going to be a value statement state 
    //Object containing options counts for scoops and topping , subtotal & total
    //setter: update Option Count
    return [{
      ...optionCounts, totals
    }, updateItemCount, resetOrder]
  }, [optionCounts])



  return <OrderDetails.Provider value={value} {...props} >
    {props.children}
  </OrderDetails.Provider>


  
}
