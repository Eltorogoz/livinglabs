import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AddProject() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [concentration, setConcentration] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      name,
      description,
      concentration
    });

    // clear form
    setName("");
    setDescription("");
    setConcentration("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      <Header />

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow border">

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">
              Add Project
            </h2>
            <p className="text-gray-600 mt-2">
              Admin Project Submission Form
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Project Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-[#C4B07A] focus:border-[#C4B07A]"
                placeholder="Enter project name"
              />
            </div>

            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-[#C4B07A] focus:border-[#C4B07A]"
                placeholder="Enter project description"
              />
            </div>

          
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Concentration
              </label>
              <input
                type="text"
                required
                value={concentration}
                onChange={(e) => setConcentration(e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-[#C4B07A] focus:border-[#C4B07A]"
                placeholder="e.g. Web Dev, Database, etc"
              />
            </div>
        
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-md text-white bg-[#C4B07A] hover:bg-yellow-700 transition"
            >
              Submit Project
            </button>

          </form>

        </div>
      </main>

      <Footer />

    </div>
  );
}

export default AddProject;