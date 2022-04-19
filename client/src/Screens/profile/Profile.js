import React from 'react'
import FooterComp from '../../Components/Footer/FooterComp'
import AuthHeader from '../../Components/navbar/AuthHeader'
import AuthProfile from '../../Components/profile/AuthProfile'

const Profile = () => {
  return (
    <div>
        
        <AuthHeader/>
        <AuthProfile/>
        <FooterComp/>
    </div>
  )
}

export default Profile