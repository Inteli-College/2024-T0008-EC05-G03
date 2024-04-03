import './ControleBR.css'
import React from 'react'
import { useState } from 'react'
import axios from "axios"

const [profileData, setProfileData] = useState(null)

function getData() {
  axios({
    method: "GET",
    url:"/profile",
  })
  .then((response) => {
    const res =response.data
    setProfileData(({
      profile_name: res.name,
      about_me: res.about}))
  }).catch((error) => {
    if (error.response) {
      console.log(error.response)
      console.log(error.response.status)
      console.log(error.response.headers)
      }
  })}

function ControleBR() {
  return (
    <>
      <div className='mainCBR'>
        <div className='titulo'></div>
        <div className='linhaHorizontal'></div>
        <div className='botoesCBR'>
        <form action='/home'><button className='botaoPadrao'></button></form>
          <form action='/posicaoatual'><button className='botaoPadrao'></button></form>
          <form action='/ligarferramenta'><button className='botaoPadrao'></button></form>
          <form action='/get_compartments/<int:id_layout>'><button className='botaoPadrao'></button></form>
        </div>
      </div>
      <p>To get your profile details: </p><button onClick={getData}>Click me</button>
        {profileData && <div>
              <p>Profile name: {profileData.profile_name}</p>
              <p>About me: {profileData.about_me}</p>
            </div>
        }
    </>
  )
}

export default ControleBR
