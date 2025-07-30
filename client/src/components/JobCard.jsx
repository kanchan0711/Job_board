import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  return (
    <div className="bg-white shadow p-4 rounded-2xl border hover:shadow-lg transition">
      <h2 className="text-xl font-bold">{job.title}</h2>
      <p>{job.company}</p>
      <p>{job.location}</p>
      <p className="text-sm text-gray-500">{job.type}</p>
      <Link to={`/job/${job._id}`} className="text-blue-600 mt-2 block">View Details</Link>
    </div>
  );
};

export default JobCard;
