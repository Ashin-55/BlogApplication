import React from 'react'
import FooterComp from '../../Components/Footer/FooterComp'
import Mypostdetails from '../../Components/MyPosts/Mypostdetails'
import AuthHeader from '../../Components/navbar/AuthHeader'

const OwnPostDetail = () => {
  return (
    <div>
        <AuthHeader/>
        <Mypostdetails/>
        <FooterComp/>
    </div>
  )
}

export default OwnPostDetail