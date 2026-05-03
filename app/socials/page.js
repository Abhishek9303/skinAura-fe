export default function Home() {
  const links = [
  {
    name: "Personal Instagram",
    url: "https://instagram.com/yourpersonal",
  },
  {
    name: "Business Instagram",
    url: "https://instagram.com/yourbusiness",
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/8770348810",
  },
  {
    name: "Website",
    url: "https://yourwebsite.com",
  },
];


  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Title */}
       

        {/* Links Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 space-y-4">
         <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">
            Connect With Us
          </h1>
          <p className="text-sm text-gray-500 mt-1">
           Connect with us on social media and stay updated with our latest news and offers!
          </p>
        </div>
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center py-3 rounded-xl border border-gray-200 hover:border-black transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
            >
              {link.name}
            </a>
          ))}

        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          © 2026 Your Name
        </p>

      </div>
    </main>
  );
}