import * as React from 'react'
import { useOrderDetails } from '../../context/OrderDetails'
import  Button  from 'react-bootstrap/Button'
import axios from 'axios'


export default function OrderConfirmation({ setOrderPhase }) {
  const [ , , resetOrder ] = useOrderDetails();
  const [ orderNumber, setOrderNumber ] = React.useState(null);

  React.useEffect( () => {
    axios.
    post(`http://localhost:3030/order`)
    .then( res => setOrderNumber( res.data.orderNumber))
    .catch( err => {
      //TODO: handle error
    })
  }, [])

  function handleClick(){
    //clear the order details
    resetOrder();

    //send back to order Page
    setOrderPhase('inProgress');
  }

  if(orderNumber){
    return (
      <div style={{ textAlign: 'center'}}>
        <h1>Thank you!</h1>
        <p>Your order number is {orderNumber} </p>
        <p style={{ fontSize: '25%'}}>
          as per our terms and conditions, nothing will happen now
        </p>
        <Button onClick={handleClick}>Create a new Order</Button>
      </div>
    );
  }else {
    return <div>Loading</div>
  }
}
