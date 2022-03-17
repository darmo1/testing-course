
import * as React from 'react'
import { Container } from 'react-bootstrap';
import OrderEntry from './pages/entry/OrderEntry';
import { OrderDetailsProvider } from './context/OrderDetails';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';
import OrderSummary from './pages/summary/OrderSummary';

function App() {

  const [orderPhase, setOrderPhase] = React.useState('inProgress')

  let Component = OrderEntry; //default to order page
  switch (orderPhase) {
    case 'inProgress':
      Component = OrderEntry;
      break;

    case 'review':
      Component = OrderSummary;
      break;

    case 'completed':
      Component = OrderConfirmation;
      break;

    default:


  }

  return (
    <OrderDetailsProvider>
      <Container >
        <Component setOrderPhase={setOrderPhase} />
      </Container>
    </OrderDetailsProvider>

  );
}

export default App;
