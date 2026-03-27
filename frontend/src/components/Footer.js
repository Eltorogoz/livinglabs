function Footer() {
  return (
    <footer className="relative w-full h-[260px] text-white">

     
      <img
        src="/images/Purdue-footer.jpg"
        alt="Purdue Campus"
        className="absolute inset-0 w-full h-full object-cover"
      />

     
      <div className="absolute inset-0 bg-black/70"></div>

      
      <div className="relative max-w-6xl mx-auto h-full flex items-center justify-between px-8">

        
        <div>
          <img
            src="/images/purdue-footer-logo.svg"
            alt="Purdue University"
            className="h-28"
          />
        </div>

        <div className="text-right space-y-2 text-lg">
          <p className="underline">Purdue University</p>
          <p className="underline">610 Purdue Mall</p>
          <p className="underline">West Lafayette, IN 47907</p>

          <p className="text-[#C4B07A] font-semibold mt-4">
            765-494-4600
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;