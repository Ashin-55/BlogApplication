import React from 'react'

import AuthHeader from "../../Components/navbar/AuthHeader"
import EditAuthorProfile from '../../Components/profile/EditAuthorProfile'
import FooterComp from "../../Components/Footer/FooterComp"
const EditAuth = () => {
  return (
    <div>
        <AuthHeader/>
        <EditAuthorProfile/>
        <FooterComp/>
    </div>
  )
}

export default EditAuth