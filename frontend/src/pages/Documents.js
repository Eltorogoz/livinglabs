import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await fetch(`${API_URL}/api/documents`);
      const data = await res.json();
      setDocuments(data);
    } catch (err) {
      console.error("Error loading documents:", err);
    }
  };

  const filtered = documents.filter((doc) =>
    doc.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">

      <Header />

      <section className="text-center py-14">
        <h1 className="text-4xl font-medium">Documents</h1>
      </section>

      {/* SEARCH */}
      <div className="max-w-6xl mx-auto px-6 mb-14">
        <div className="bg-gray-300 h-14 flex items-center p-2">

          <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 h-full px-4 bg-white outline-none text-sm"
          />



        </div>
      </div>

      {/* DOCUMENT GRID */}
      <main className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {filtered.length === 0 ? (
            <p className="col-span-3 text-center text-gray-500">
              No documents found
            </p>
          ) : (
            filtered.map((doc) => (
              <a
                key={doc.documentID}
                href={doc.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-200 h-40 flex flex-col items-center justify-center shadow-sm hover:shadow-md hover:scale-[1.02] transition transform cursor-pointer"
              >
                <p className="text-sm font-medium">{doc.title}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Project: {doc.group_name || doc.project_name || doc.projectTitle || `Project ID: ${doc.projectID}`}
                </p>
              </a>
            ))
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Documents;