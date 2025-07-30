import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/jobs/${id}`)
      .then((res) => setJob(res.data));
  }, [id]);

  if (!job) return <p className="p-4">Loading...</p>;

  return (
    <div className=" min-h-screen py-10 px-4 lg:px-48">
      {/* Job Card */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 lg:w-[90%] m-auto">
        <div>
          <h2 className="text-3xl lg:text-4xl text-blue-700 font-bold mb-1">{job.title}</h2>
          <div className="flex justify-between text-gray-600 font-medium ">
            <p className=" ">{job.company}</p>
            <div className="px-2">
              <span>{job.type}</span>
              <span>{job.location}</span>
            </div>
          </div>
        </div>

        <div className="my-4">
        <h2 className="text-xl lg:text-2xl text-gray-900 font-bold mb-1">Job description</h2>
         
         <p className="text-gray-600">
          {job.description}
          </p>
        </div>

        <div className="flex gap-2 mt-2 justify-end">
              <button className="border border-blue-600 text-blue-600 px-4 py-1 rounded-full">Save</button>
              <button className="bg-blue-600 text-white px-4 py-1 rounded-full">Apply</button>
            </div>
      </div>
    </div>
  );
};

export default JobDetails;
