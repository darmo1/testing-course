import React from 'react'
import  Popover  from 'react-bootstrap/Popover';
import  OverlayTrigger  from 'react-bootstrap/OverlayTrigger';


const SummaryForm = ({setOrderPhase}) => {

  const [tcChecked, setTcChecked] = React.useState(false);

  function handleSubmit(event){
    event.preventDefault()

    //pass along to the next phase.
    //The next page will handle submitting order from context.
    setOrderPhase('completed')
  }

  const popover = (
    <Popover id="termsandconditions-popover">
     
      <Popover.Body>
        No ice cream will actually be delivered
      </Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger
        placement="right"
        overlay={popover}
      >
        <span style={{ color: 'blue' }}>
          Terms and conditions
        </span>
      </OverlayTrigger>
    </span>
  );

  


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          id="terms-and-conditions"
          type="checkbox"
          checked={tcChecked}
          onChange={e => setTcChecked(e.target.checked)}
        />
        <label htmlFor="terms-and-conditions">
          {checkboxLabel}
        </label>
      </div>

      <button
        type="submit"
        disabled={!tcChecked}
        variant="primary"
      >
        confirm order
      </button>
    </form>
  )
}

export default SummaryForm