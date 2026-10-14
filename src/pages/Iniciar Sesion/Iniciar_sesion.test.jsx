import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { IniciarSesion } from './Iniciar_sesion'

const renderLogin = () =>
  render(
    <MemoryRouter>
      <IniciarSesion />
    </MemoryRouter>
  )

const campos = () => ({
  usuario: screen.getByPlaceholderText('Nombre de usuario'),
  correo: screen.getByPlaceholderText(/Correo electrónico/i),
  aceptar: screen.getByRole('button', { name: 'Aceptar' }),
})

describe('Validación del formulario de inicio de sesión', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.spyOn(window, 'alert').mockImplementation(() => {})
  })
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('rechaza el nombre de usuario vacío', () => {
    renderLogin()
    const { correo, aceptar } = campos()
    fireEvent.change(correo, { target: { value: 'javier' } })
    fireEvent.click(aceptar)
    expect(window.alert).toHaveBeenCalledWith('EL NOMBRE DE USUARIO NO DEBE ESTAR VACÍO')
    expect(localStorage.getItem('clave_storage')).toBeNull()
  })

  it('rechaza el nombre de usuario con solo espacios', () => {
    renderLogin()
    const { usuario, correo, aceptar } = campos()
    fireEvent.change(usuario, { target: { value: '   ' } })
    fireEvent.change(correo, { target: { value: 'javier' } })
    fireEvent.click(aceptar)
    expect(window.alert).toHaveBeenCalledWith('EL NOMBRE DE USUARIO NO DEBE ESTAR VACÍO')
  })

  it('rechaza el correo vacío', () => {
    renderLogin()
    const { usuario, aceptar } = campos()
    fireEvent.change(usuario, { target: { value: 'Javier' } })
    fireEvent.click(aceptar)
    expect(window.alert).toHaveBeenCalledWith('EL CORREO NO PUEDE ESTAR VACÍO')
    expect(localStorage.getItem('clave_storage')).toBeNull()
  })

  it('con datos válidos guarda el usuario y agrega @gmail.com', () => {
    renderLogin()
    const { usuario, correo, aceptar } = campos()
    fireEvent.change(usuario, { target: { value: 'Javier' } })
    fireEvent.change(correo, { target: { value: 'javier' } })
    fireEvent.click(aceptar)
    expect(window.alert).toHaveBeenCalledWith('Sesión iniciada con éxito')
    expect(JSON.parse(localStorage.getItem('clave_storage'))).toEqual({
      Nombre_usuario: 'Javier',
      correo_electronico: 'javier@gmail.com',
    })
  })
})