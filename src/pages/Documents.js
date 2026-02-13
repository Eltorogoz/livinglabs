import { Link } from "react-router-dom";

function Documents() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      
      
      <header className="flex items-center justify-between px-8 py-4 border-b">
        <div className="flex items-center gap-4">
          <img src="/images/PurdueLogo.svg" alt="Purdue University" className="h-12" />
          <span className="text-lg font-medium">Living Lab Purdue University</span>
        </div>

        <nav className="hidden md:flex gap-8 text-sm font-semibold">
          <Link to="/" className="hover:text-yellow-600">Home</Link>
          <Link to="/documents" className="hover:text-yellow-600">Documents</Link>
          <Link to="/projects" className="hover:text-yellow-600">Projects</Link>
          <Link to="/faq" className="hover:text-yellow-600">FAQ</Link>
          <Link to="/help" className="hover:text-yellow-600">Help</Link>
        </nav>

        <div className="w-6 h-6">🔍</div>
      </header>

  
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