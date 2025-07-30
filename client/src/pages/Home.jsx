import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import JobCard from "../components/JobCard";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // 🔹 Add loading state

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/jobs')
      .then(res => {
        setJobs(res.data);
        setLoading(false); // 🔹 Set loading false after data is fetched
      })
      .catch(err => {
        console.error("Failed to fetch jobs:", err);
        setLoading(false); // 🔹 Also handle error case
      });
  }, []);

  const term = searchTerm.toLowerCase().trim();

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(term) ||
    job.location.toLowerCase().includes(term)
  );

  return (
    <div>
      <div className="bg-white pt-6 px-6 lg:py-6 lg:mb-10 lg:px-36">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            MiniJobBoard
          </h1>
          <Link to="/add-job">
            <button className="border border-blue-700 rounded-full text-blue-700 font-semibold px-2 py-1 text-sm lg:text-lg lg:px-4 lg:py-2  hover:bg-blue-700 hover:text-white">
              + Add Job
            </button>
          </Link>
        </div>

        {/* 🔍 Search Input */}
        <input
          type="text"
          placeholder="Search by title or location"
          className="w-full  px-2 py-1 text-sm lg:text-lg lg:px-4 lg:py-2 border border-gray-300 rounded-full mb-4"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 🔄 Job List / Loading / Empty State */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 py-3 lg:px-36">
        {loading ? (
          <p className="text-gray-500 col-span-full text-center">Loading jobs...</p>
        ) : filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <JobCard key={job._id} job={job} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center text-2xl">No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
