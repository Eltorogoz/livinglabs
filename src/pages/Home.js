import Header from "../components/Header";


function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      
      <Header />

      <section className="relative w-full h-[500px] overflow-hidden">
        <img 
          src="/images/livlab.jpg" 
          alt="Lab Work" 
          className="w-full h-full object-cover object-[center_32%]"
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
                <p>Project {item} description</p>
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