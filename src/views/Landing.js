import React from 'react'
import MyAppBar from '../components/AppBar/AppBar'
import HomeCards from '../components/HomeCard/HomeCards'

function Landing() {
  return (
    <div>
      <MyAppBar description="Bem-Vindo" />
      <HomeCards />
    </div>
  )
}

export default Landing
