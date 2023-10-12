import React from 'react'
import Component from './Component'
import { render, screen } from '@testing-library/react'

test('默认属性', () => {
  render(<Component />)
  const p = screen.getByText('这是一个标题')

  expect(p).toBeInTheDocument()
})

test('传入属性', () => {
  render(<Component title="hello" level={3} isCenter={true} />)

  const p = screen.getByText('hello')
  expect(p).toBeInTheDocument()

  expect(p.matches('h3')).toBeTruthy()

  expect(p.style.textAlign).toBe('center')
})
