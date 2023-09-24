import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
const Home: FC = () => {
  const navigate = useNavigate()
  const clickToLoginHandler = () => {
    navigate('/login')
  }

  return (
    <p>
      Home<button onClick={clickToLoginHandler}>登录</button>
    </p>
  )
}

export default Home
