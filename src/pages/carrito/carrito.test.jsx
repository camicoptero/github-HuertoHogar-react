import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { Carrito } from './carrito'

const productos = [
  { nombre: 'Manzanas Fuji', precio: '1200 x kilo', imagen: 'manzana.png' },
  { nombre: 'Peras Williams', precio: '1500 x kilo', imagen: 'pera.png' },
]

const renderCarrito = () =>
  render(
    <MemoryRouter>
      <Carrito />
    </MemoryRouter>
  )

describe('Carrito', () => {
  beforeEach(() => localStorage.clear())
  afterEach(() => cleanup())

  it('muestra mensaje de carrito vacío cuando no hay productos', () => {
    renderCarrito()
    expect(screen.getByText('El carrito está vacío.')).toBeInTheDocument()
  })

  it('muestra los productos guardados en localStorage', async () => {
    localStorage.setItem('carrito', JSON.stringify(productos))
    renderCarrito()
    expect(await screen.findByText('Manzanas Fuji')).toBeInTheDocument()
    expect(screen.getByText('Peras Williams')).toBeInTheDocument()
    expect(screen.getByText('1200 x kilo')).toBeInTheDocument()
  })

  it('vacía el carrito al presionar "Vaciar Carrito"', async () => {
    localStorage.setItem('carrito', JSON.stringify(productos))
    renderCarrito()
    fireEvent.click(await screen.findByText('Vaciar Carrito'))
    expect(screen.getByText('El carrito está vacío.')).toBeInTheDocument()
    expect(localStorage.getItem('carrito')).toBeNull()
  })
})