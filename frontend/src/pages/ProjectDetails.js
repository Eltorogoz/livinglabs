import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_URL;

    Promise.all([
      fetch(`${baseUrl}/api/projects/${id}`).then(res => {
        if (!res.ok) throw new Error("Failed to load project");
        return res.json();
      }),
      fetch(`${baseUrl}/api/projects/${id}/documents`).then(res => {
        if (!res.ok) throw new Error("Failed to load documents");
        return res.json();
      })
    ])
      .then(([projectData, documentsData]) => {
        setProject(projectData);
        setDocuments(documentsData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Could not load project details.");
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-14">
        {loading && <p>Loading project...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && project && (
          <>
            <h1 className="text-4xl font-medium mb-4">{project.group_name}</h1>
            <p className="text-lg text-gray-700 mb-2">{project.description}</p>
            

            <h2 className="text-2xl font-semibold mb-6">Documents</h2>

            {documents.length === 0 ? (
              <p>No documents found for this project.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {documents.map(doc => (
                  <div
                    key={doc.documentID}
                    className="border rounded-lg p-5 shadow-sm bg-gray-50"
                  >
                    <h3 className="text-xl font-semibold mb-2">{doc.title}</h3>

                    {doc.file_url ? (
                      <a
                        href={doc.file_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Open Document
                      </a>
                    ) : (
                      <p className="text-gray-500">No file available</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default ProjectDetails;