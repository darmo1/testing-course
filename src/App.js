import * as React from 'react'
import './App.css';

function App() {

  const [ buttonColor, setButtonColor ] = React.useState('red')
  const newButtonColor = buttonColor === 'red' ? 'blue' : 'red'
  return (
<div>
  <button 
onClick={ () => {
  setButtonColor(newButtonColor)
}}
  style={{backgroundColor: buttonColor}}> 
  Change to {newButtonColor}
  </button>

  <input type="checkbox" />

</div>
  );
}

export default App;
