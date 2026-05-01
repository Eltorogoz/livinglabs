import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Projects() {
  const query = useQuery();
  const searchTerm = query.get("search") || "";

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, [searchTerm]);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/api/projects`);
      const data = await res.json();

      // filter based on search input
      const filtered = data.filter((p) =>
        (p.group_name || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );

      setProjects(filtered);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold mb-6">
          Project Results
        </h1>

        {searchTerm && (
          <p className="text-gray-600 mb-6">
            Searching for: <b>{searchTerm}</b>
          </p>
        )}

        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((project) => (
              <div
                key={project.projectID}
                className="bg-gray-200 p-6 flex flex-col justify-center text-center"
              >
                <h2 className="font-bold text-lg">
                  {project.group_name}
                </h2>
                <p className="mt-2 text-sm">
                  {project.description || "No description"}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Projects;