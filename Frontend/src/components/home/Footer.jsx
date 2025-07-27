import React from 'react'

function Footer() {
  return (
    <div>
      <footer className="bg-[#0C1425] px-8 py-10 mt-10 text-sm text-gray-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold mb-2">Job<span className='text-red-500'>Hunt</span></h3>
            <p>Great platform for the job seeker that passionate about startups. Find your dream job easier.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">About</h4>
            <ul className="space-y-1">
              <li>Companies</li>
              <li>Pricing</li>
              <li>Terms</li>
              <li>Advice</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Resources</h4>
            <ul className="space-y-1">
              <li>Help Docs</li>
              <li>Guide</li>
              <li>Updates</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Get job notifications</h4>
            <p className="mb-2">The latest job news, articles, sent to your inbox weekly.</p>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-3 py-2 rounded mb-2 text-black"
            />
            <button className="bg-[#6A38C2] px-4 py-2 rounded hover:bg-[#512E9B] text-white">
              Subscribe
            </button>
          </div>
        </div>
        <p className="text-center mt-10 text-gray-500 text-xs">
          2021 © JobHuntly. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default Footer
