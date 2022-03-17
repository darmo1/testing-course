
import { render , screen } from '../../../test-utils/testing-library-utils';
import { OrderDetailsProvider } from '../../../context/OrderDetails';
import Options from '../Options'

test('displays image for each scoop option from server', async() => {
  render(<Options  optionType="scoops" /> , {wrapper: OrderDetailsProvider});

  //Find Images
  const scoopImages =  await screen.findAllByRole('img', { name: 'scoop'});
  expect(scoopImages).toHaveLength(2); //because we expect at least 2 flavors of ice-cream

  // confirm alt text of images
  const altText = scoopImages.map( el => el.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
})

test('displays image for each toppings option from server', async () => {
  render(<Options  optionType="toppings" />);

  //Find Images, expect 3 based on what msw returns
  const images = await screen.findAllByRole('img' , {name: /topping$/i});
  expect(images).toHaveLength(3);

  //Check the actual alt text for the images
  // @ts-ignore
  const imageTitle = images.map( img => img.alt);
  expect(imageTitle).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping'
  ])
""
})