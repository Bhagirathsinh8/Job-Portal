import React from 'react'
import Navbar from '../components/shared/Navbar'
import HeroSection from '@/components/home/HeroSection'
import CategoryCarosel from '@/components/home/CategoryCarosel'
import LatestJob from '@/components/home/LatestJob'
import Footer from '@/components/home/Footer'

function Home() {
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