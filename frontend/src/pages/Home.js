import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

function Home() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {

    try {
      const res = await fetch(`${API_URL}/api/projects`);
      const data = await res.json();

      console.log("Projects response:", data);

      if (Array.isArray(data)) {
        setProjects(data);
      } else if (Array.isArray(data.projects)) {
        setProjects(data.projects);
      } else {
        console.error("Projects response was not an array:", data);
        setProjects([]);
      }
    } catch (err) {
        console.error("Failed to fetch projects:", err);
      setProjects([]);
    }
};

  const goSearch = () => {
    if (!search.trim()) return;
    navigate(`/projects?search=${encodeURIComponent(search.trim())}`);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Header />

      {/* HERO (unchanged visually, safe fix only) */}
      <section className="relative w-full h-[500px] overflow-hidden">
        <img
          src="/images/livlab.jpg"
          alt="Lab Work"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <h1 className="text-white text-6xl font-light tracking-tight">
            Living Lab
          </h1>
        </div>
      </section>

      {/* SEARCH */}
      <div className="max-w-4xl mx-auto px-6 mt-10">
        <div className="bg-gray-300 h-14 flex items-center p-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && goSearch()}
            placeholder="Search projects..."
            className="flex-1 h-full px-4 bg-white outline-none text-sm"
          />

          <button
            onClick={goSearch}
            className="w-16 h-full bg-[#CFB991] hover:bg-[#DAAA00] transition flex items-center justify-center text-white"
          >
            Search
          </button>
        </div>
      </div>

      {/* PROJECTS */}
      <main className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-xl font-bold mb-8">Current Approved Projects:</h2>

        {projects.length === 0 ? (
          <p className="text-gray-500">No projects available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-24">
            {projects.map((project) => (
              <div key={project.projectID} className="contents">

                {/* PROJECT IMAGE (fixed square) */}
                {/* PROJECT IMAGE */}
                  <div className="bg-gray-200 h-64 overflow-hidden rounded relative">
                    {project.image_path ? (
                      <img
                        src={`${API_URL}${project.image_path}`}
                        alt={project.group_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <p className="text-gray-500">No image available</p>
                      </div>
                    )}
                  </div>

                  {/* PROJECT INFO */}
                  <div className="bg-gray-200 h-64 flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-xl font-semibold mb-4">
                      {project.group_name || project.title || "Untitled Project"}
                    </h3>

                    <p className="text-sm leading-relaxed">
                      {project.description || "No description available"}
                    </p>
                  </div>

              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Home;