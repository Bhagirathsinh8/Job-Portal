import React from 'react'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'

function HeroSection() {
  return (
    <div className='text-center my-2'>
      <div className='flex flex-col gap-5 '>
        <span className='mx-auto px-5 py-3 my-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm sm:text-base'>
          No. 1 Job Hunt Website
        </span>

        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold leading-tight'>
          Search, Apply & <br />
          Get your <span className='text-[#6A38C2]'>Dream Job</span>
        </h1>

        <p className='text-sm sm:text-base text-gray-700 max-w-xl mx-auto'>
          Connecting job seekers and employers with smart, fast, and reliable career opportunities — all in one place.
        </p>

        <div className='flex w-full sm:w-4/5 md:w-2/3 lg:w-1/2 shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-2 sm:gap-4 mx-auto bg-white'>
          <input
            type="text"
            placeholder='Find Your Dream Jobs'
            className='outline-none border-none w-full px-2 py-3 text-sm sm:text-base'
          />
          <Button className='rounded-r-full bg-[#6A38C2] px-2 py-3 h-12'>
            <Search className='h-20 w-10'/>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
