import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import AddJob from './pages/AddJob';
import JobDetails from './pages/JobDetails';

function App() {
  return (

    <div className=" min-h-screen bg-[#F8F9FA]">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-job" element={<AddJob />} />
        <Route path="/job/:id" element={<JobDetails />} />
        
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
