import React from 'react'
import Navbar from './Navbar'
import { auth } from '../auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import AdminPage from '../admin/page'
import HeroSection from './HeroSection'






const Index = async () => {
  const  session = await auth()
  if(!session){
    return  redirect("/api/Login")
  }
  const fullname= session.user.name

  return (
    <div className="container">

 {  session.user.role === "user" && (
    <>
    <Navbar />
     
    <HeroSection/>

    
    
      </>
      

   )} {  session.user.role === "admin" && (
      <AdminPage />
   )}

    </div>
  )
}

export default Index