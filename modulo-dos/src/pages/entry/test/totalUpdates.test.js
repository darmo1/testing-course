import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import { OrderDetailsProvider } from '../../../context/OrderDetails';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('Update scoop subtotal when scoop change' , async () => {

  //This provider could be a router provider, context or router
  render(<Options optionType="scoops" /> , { wrapper : OrderDetailsProvider });

  //make sure total start out $0.00
  const scoopsSubtotal = screen.getByText('Scoops total :$', {
    exact: false
  });
  expect(scoopsSubtotal).toHaveTextContent('0.00')
  //update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton',{
    name: 'Vanilla'
  });
  userEvent.clear(vanillaInput); //This when change input
  userEvent.type(vanillaInput, 1);
  expect(scoopsSubtotal).toHaveTextContent('2.00')

  //update chocolate scoops to 2 and check the subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name:'Chocolate'
  });

  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput,'2') //here we type the value
  expect(scoopsSubtotal).toHaveTextContent('6.00')
})


test('update toppings subtotal when toppings change', async () => {
  //render component - Here don't wrapper because we are already wrapping on the custom file
  render(<Options optionType="toppings" />);

  //make sure total starts out at $0.00
  const toppingsTotal = screen.getByText('Toppings total: $', {
    exact: false
  });
  expect(toppingsTotal).toHaveTextContent('0.00');

  //Add cherries and check subtotal
  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries'
  });

  userEvent.click(cherriesCheckbox)
  expect(toppingsTotal).toHaveTextContent('1.50');

  //add hot fudge and check subtotal
  const hotFudgeCheckbox = screen.getByRole('checkbox',{ name: 'Hot fudge'});
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent('3.00');

  //remove hot fudge and check subtotal
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent('1.50')
});

describe('grand total' , () => {

  // test.only('grand total starts at $0.00' , async () => {
  //   //test that the total starts out at $0.00
  //   render(<OrderEntry />);
  //   const grandTotal = screen.getByRole('heading', {
  //     name: /grand total: \$/i,
  //   });
    
  // });

  test('grand total updates properly if scooping is added first', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    // check that the grand total start out at $0.00
    expect(grandTotal).toHaveTextContent('0.00');

    //Update vanilla scoops to 2 and check grand total
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla'
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('4.00');
  });

  test('grand total updates properly if topping is added first', () => {
    render(<OrderEntry />);

    //Add cherries and check grand total
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries'
    });
    userEvent.click(cherriesCheckbox);
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    })
    expect(grandTotal).toHaveTextContent('1.50');

    //Update vanilla scoops to 2 and check grand total
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla'
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('5.50');
  });
  });

  test('grand total updates properly if item is removed', async () => {
    render(<OrderEntry />);

    //add cherries
    const cherriesCheckbox = await  screen.findeByRole('checkbox', {
      name: 'Cherries',
    });

    userEvent.click(cherriesCheckbox)
    //grand total $1.50

    //Update vanilla scoops to 2; grand total should be $5.50
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla'
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');

    //remove 1 scoop of vanilla and check grand total
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    //check grand total
    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/ });
    expect(grandTotal).toHaveTextContent('350');

    //remove cherries and check grand total
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('2.00');





  })
})