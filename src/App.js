import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      
      <header className="flex items-center justify-between px-8 py-4 border-b">
        <div className="flex items-center gap-4">
          <img src="/purdue-logo.png" alt="Purdue University" className="h-12" />
          <span className="text-lg font-medium">Living Lab Purdue University</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-semibold">
          <a href="#" className="hover:text-gold-500">Home</a>
          <a href="/Mydocs.js" className="hover:text-gold-500">Documents</a>
          <a href="/projects.js" className="hover:text-gold-500">Projects</a>
          <a href="#" className="hover:text-gold-500">Frequently Asked</a>
          <a href="#" className="hover:text-gold-500">My Projects</a>
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
          <h1 className="text-white text-6xl font-light tracking-tight">Living Lab</h1>
        </div>
      </section>

      {/* 3. Projects Section */}
      <main className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-xl font-bold mb-8">Current Approved Projects:</h2>
        
        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-24">
          {[1, 2, 3].map((item) => (
            <>
              {/* Left Column: Explanation */}
              <div className="bg-gray-200 aspect-[2/1] flex items-center justify-center p-6 text-center">
                <p>what it is/ explanation</p>
              </div>
              {/* Right Column: Image placeholder */}
              <div className="bg-gray-200 aspect-[2/1] flex items-center justify-center p-6 text-center">
                <p>Images of project</p>
              </div>
            </>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
