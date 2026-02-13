import { Link } from "react-router-dom";

function Home() {
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
           <Link to="/faq" className="hover:text-yellow-600">Projects</Link>
           <Link to="help" className="hover:text-yellow-600">Projects</Link>
        </nav>

        <div className="w-6 h-6">🔍</div>
      </header>

     
      <section className="relative w-full h-[500px] overflow-hidden">
        <img 
          src="/hero-lab-image.jpg" 
          alt="Lab Work" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <h1 className="text-white text-6xl font-light tracking-tight">
            Living Lab
          </h1>
        </div>
      </section>

    
      <main className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-xl font-bold mb-8">
          Current Approved Projects:
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-24">
          {[1, 2, 3].map((item) => (
            <div key={item} className="contents">
              
              <div className="bg-gray-200 aspect-[2/1] flex items-center justify-center p-6 text-center">
                <p>what it is / explanation</p>
              </div>

              <div className="bg-gray-200 aspect-[2/1] flex items-center justify-center p-6 text-center">
                <p>Images of project</p>
              </div>

            </div>
          ))}
        </div>
      </main>

    </div>
  );
}

export default Home;