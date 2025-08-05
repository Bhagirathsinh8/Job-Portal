import React, { useEffect } from 'react'
import Navbar from '../components/shared/Navbar'
import HeroSection from '@/components/home/HeroSection'
import CategoryCarosel from '@/components/home/CategoryCarosel'
import LatestJob from '@/components/home/LatestJob'
import Footer from '@/components/home/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home() {
  useGetAllJobs();
  const {user} = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(()=>{
    if(user && user.role === 'recuiter'){
      navigate("/admin/companies");
    }
  },[navigate, user]);
  
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <CategoryCarosel/>
        <LatestJob/>
        <Footer/>
    </div>
  )
}

export default Home