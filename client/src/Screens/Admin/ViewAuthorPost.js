import React from 'react'
import ViewAuthorPostComp from '../../Components/Admin.js/ViewAuthorPostComp'
import FooterComp from '../../Components/Footer/FooterComp'
import AdminHeader from '../../Components/navbar/AdminHeader'

const ViewAuthorPost = () => {
  return (
    <div>
        <AdminHeader/>
        <ViewAuthorPostComp/>
        <FooterComp/>
    </div>
  )
}

export default ViewAuthorPost