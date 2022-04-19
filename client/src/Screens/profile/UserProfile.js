import React from 'react'
import Header from "../../Components/navbar/Header"
import FooterComp from "../../Components/Footer/FooterComp"
import UserProfileComp from '../../Components/profile/UserProfileComp'

const UserProfile = () => {
  return (
    <div>
       <Header/>
        <UserProfileComp/>
        <FooterComp/>
    </div>
  )
}

export default UserProfile