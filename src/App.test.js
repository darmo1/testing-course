import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { replaceCamelWithSpaces } from './App'
// test('renders learn react link', () => {
//   // //throw new Error('test filed')
//   // render(<App />);
//   // //const linkElement = screen.getByText(/learn react/i);
//   // const linkElement = screen.getByRole('link',{ name: /Learn react/i} );
//   // expect(linkElement).toBeInTheDocument();
// });

// test('button has correct initial color', () => {
//   render(<App />);
//   //find an element with role of button and text of 'Change to blue'
//   const colorButton = screen.getByRole('button', { name:'Change to blue'})

//   //expect the background color to be red
//   expect(colorButton).toHaveStyle({
//     backgroundColor: 'red'
//   })

//   //Click button
//   fireEvent.click(colorButton);

//   //expect the background color to be blue
//   expect(colorButton).toHaveStyle({ backgroundColor: 'blue'});

//   //expect the button text to be Change to red
//   expect(colorButton.textContent).toBe('Change to red')

// });


it('initial conditions', () =>{
  //rendering
  render(<App />);

  //Check that the button starts out enable
  const colorButton = screen.getByRole('button', { name: 'Change to blue'});
  expect(colorButton).toBeEnabled()

  //Check that the checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked()

});

//TODO: How can I check the checkbox??
it('Checkbox disables button on first click and enables on second click', () => {
  render(<App />)
  
  const checkBox = screen.getByRole('checkbox', { name: 'Disable button'});
  const button = screen.getByRole('button', { name: 'Change to blue'} )

  fireEvent.click(checkBox);
  expect(button).toBeDisabled();

  fireEvent.click(checkBox);
  expect(button).toBeEnabled()

});


test('Disabled button has gray background and reverts to red', () => {
  render(<App />);
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});
  const colorButton = screen.getByRole('button', { name: 'Change to blue'});

  //Disable button
  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle('background-color: gray');

  //re-enable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color: red')
});

test('Clicked disabled button has gray background and reverts to blue', () => {
  render(<App />);
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });

  //Change color to blue
  fireEvent.click(colorButton);

  //disable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color: gray');

  //re-enable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color: blue');

});


describe('Spaces before camel-case capital letters' , () => {
  test('Works for no inner capittal letter' , () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red')
  });

  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue')
  })

  test('Works for multiple inner capital letter', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red')
  })
})
