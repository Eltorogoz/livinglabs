import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const search = params.get("search")?.toLowerCase() || "";

    useEffect(() => {
        const url = `${process.env.REACT_APP_API_URL}/api/projects`;

        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                // Apply search filter if needed
                const filtered = search
                    ? data.filter(p =>
                        (p.group_name || "").toLowerCase().includes(search) ||
                        (p.description || "").toLowerCase().includes(search)
                    )
                    : data;

                setProjects(filtered);
                setLoading(false);
            })
            .catch(err => {
                console.error("Fetch error:", err);
                setError("Could not load projects.");
                setLoading(false);
            });
    }, [search]);

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            <Header />

            <main className="max-w-6xl mx-auto px-6 py-14">
                <section className="text-center mb-14">
                    <h1 className="text-4xl font-medium mb-8">
                        {search ? `Search results for "${search}"` : "Projects"}
                    </h1>
                </section>
                
                {loading && <p>Loading projects...</p>}
                {error && <p className="text-red-600">{error}</p>}

                {!loading && !error && (
                    projects.length === 0 ? (
                        <p className="text-gray-500 text-center">No matching projects found.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map(project => (
                                <Link
                                    to={`/projects/${project.projectID}`}
                                    key={project.projectID}
                                    className="block bg-gray-100 p-6 rounded-lg shadow hover:shadow-md hover:scale-[1.02] transition"
                                >
                                    <h2 className="text-2xl font-bold mb-2">{project.group_name}</h2>
                                    <p className="mb-2">{project.description}</p>
                                </Link>
                            ))}
                        </div>
                    )
                )}
            </main>

            <Footer />
        </div>
    );
}

export default ProjectsPage;
