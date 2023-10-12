import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

test('默认属性', () => {
  render(<Component />)
  const title = screen.getByText('单选标题')
  expect(title).toBeInTheDocument()

  for (let i = 1; i <= 3; i++) {
    const radio = screen.getByDisplayValue(`item${i}`)
    expect(radio).toBeInTheDocument()

    const label = screen.getByText(`选项${i}`)
    expect(label).toBeInTheDocument()
  }
})
