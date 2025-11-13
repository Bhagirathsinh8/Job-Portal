import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../shared/Navbar";
import Job from "../job/Job";
import { ROUTES } from "@/utils/constant";

export default function Browse() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("search");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(ROUTES.SEARCH_JOB(query));
        setJobs(res.data.data || []);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    // Fetch all jobs if no query provided
    if (query) {
      fetchJobs();
    } else {
      // Optional: call API without search param to show all jobs
      const fetchAllJobs = async () => {
        try {
          setLoading(true);
          const res = await axios.get(ROUTES.SEARCH_JOB("")); // backend returns all if empty
          setJobs(res.data.data || []);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchAllJobs();
    }
  }, [query]);

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10 mx-1">
          Search Results ({jobs.length})
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job, index) => (
              <Job key={index} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
