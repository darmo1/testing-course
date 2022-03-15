import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  // //throw new Error('test filed')
  // render(<App />);
  // //const linkElement = screen.getByText(/learn react/i);
  // const linkElement = screen.getByRole('link',{ name: /Learn react/i} );
  // expect(linkElement).toBeInTheDocument();
});

test('button has correct initial color', () => {
  render(<App />);
  //find an element with role of button and text of 'Change to blue'
  const colorButton = screen.getByRole('button', { name:'Change to blue'})

  //expect the background color to be red
  expect(colorButton).toHaveStyle({
    backgroundColor: 'red'
  })

  //Click button
  fireEvent.click(colorButton);

  //expect the background color to be blue
  expect(colorButton).toHaveStyle({ backgroundColor: 'blue'});

  //expect the button text to be Change to red
  expect(colorButton.textContent).toBe('Change to red')

});


it('initial conditions', () =>{
  //rendering
  render(<App />);

  //Check that the button starts out enable
  const colorButton = screen.getByRole('button', { name: 'Change to blue'});
  expect(colorButton).toBeEnabled()

  //Check that the checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked()
})
