import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Projects() {
  const Projects = [
    {
      name: "TEMP",
      description: "...",
      image: "/images/project1.jpg"
    },
    {
      name: "TEMP",
      description: "...",
      image: "/images/project2.jpg"
    },
    {
      name: "TEMP",
      description: "...",
      image: "/images/project3.jpg"
    },
    {
      name: "TEMP",
      description: "...",
      image: "/images/project4.jpg"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">

      <Header />

     
      <div className="text-center py-10">
        <h1 className="text-3xl font-semibold">Projects</h1>
      </div>

    
      <main className="max-w-6xl mx-auto px-6 pb-16 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-24">

          {Projects.map((project, index) => (
            <div key={index} className="contents">

             
              <div className="bg-gray-100 aspect-[2/1] p-6 flex flex-col justify-center">
                <h2 className="text-xl font-semibold mb-2">
                  {project.name}
                </h2>
                <p className="text-gray-700 text-sm">
                  {project.description}
                </p>
              </div>

              <div className="bg-gray-100 aspect-[2/1] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          ))}

        </div>
      </main>

      <Footer />

    </div>
  );
}

export default Projects;