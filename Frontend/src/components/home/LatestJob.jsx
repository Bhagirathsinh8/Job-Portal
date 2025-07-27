import React, { useEffect, useState } from 'react'
import LatestJobCard from './LatestJobCard';

const job = [1, 2, 3, 4, 5, 6,7,8];

function LatestJob() {
      const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // sm and below
        setVisibleCount(2);
      } else if (width >= 640 && width < 768) {
        // md
        setVisibleCount(4);
      } else {
        // lg and above
        setVisibleCount(6);
      }
    };

    updateVisibleCount(); 
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <h1 className=" text-center text-2xl font-bold sm:text-center">
        <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-8">
        {job.slice(0, visibleCount).map((item, index) => (
          <LatestJobCard key={index} job={item} />
        ))}
      </div>
    </div>
  );
}

export default LatestJob;
