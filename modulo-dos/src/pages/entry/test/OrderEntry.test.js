import { render, screen, waitFor } from '../../../test-utils/testing-library-utils'
import { rest } from 'msw'
import { server } from '../../../mocks/server'
import OrderEntry from '../OrderEntry'

test('Handle error for scoops and toppings routes', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoopings', (req, res, ctx) => (
      res(ctx.status(500))
    )),

    rest.get('http://localhost:3030/toppings', (req, res, ctx) => (
      res(ctx.status(500))
    ))
  )

  render(<OrderEntry setOrderPhase={jest.fn()} />);
  await waitFor(async () => {
    const alert = await screen.findAllByRole('alert')
    expect(alert).toHaveLength(2)
  })
})