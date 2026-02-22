import { Link } from "react-router-dom";
import Header from "../components/Header";

function Documents() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      
      
   <Header />

  
      <section className="text-center py-14">
        <h1 className="text-4xl font-medium">Documents</h1>
      </section>

      
      <div className="max-w-6xl mx-auto px-6 mb-14">
        <div className="bg-gray-300 h-14 flex items-center p-2">
          
          <input
            type="text"
            placeholder="Search documents..."
            className="flex-1 h-full px-4 bg-white outline-none text-sm"
          />

          <button className="w-16 h-full bg-[#CFB991] hover:bg-[#DAAA00] transition flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </button>

        </div>
      </div>

   
      <main className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 h-40 flex items-center justify-center shadow-sm hover:shadow-md hover:scale-[1.02] transition transform cursor-pointer"
            >
              <p className="text-sm font-medium">
                Document {index + 1}
              </p>
            </div>
          ))}
        </div>
      </main>   
      <footer className="text-center py-10 text-sm text-gray-600">
      </footer>

    </div>
  );
}

export default Documents;