const logo = '/assets/logo.png';

const Footer = () => {
  return (
    <footer className="border-t border-red-900/50 bg-zinc-950 pt-16 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="mb-6 flex items-center gap-3">
              <img src={logo} alt="AI Hub Logo" className="h-10 w-auto" />
              <h2 className="text-3xl font-bold tracking-tighter text-white">
                AI Hub
              </h2>
            </div>

            <p className="max-w-md text-lg text-zinc-400">
              One subscription. Access to all frontier AI models in a single
              powerful platform.
            </p>
          </div>

          <div className="md:col-span-2">
            <h3 className="mb-6 text-lg font-semibold text-red-400">Product</h3>
            <ul className="space-y-4 text-zinc-400">
              <li>
                <a href="#" className="transition hover:text-white">
                  Models
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  API
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="mb-6 text-lg font-semibold text-red-400">Company</h3>
            <ul className="space-y-4 text-zinc-400">
              <li>
                <a href="#" className="transition hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="mb-6 text-lg font-semibold text-red-400">Legal</h3>
            <ul className="space-y-4 text-zinc-400">
              <li>
                <a href="#" className="transition hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  Cookie Settings
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 text-sm text-zinc-500 md:flex-row">
          <div>Copyright {new Date().getFullYear()} AI Hub. All rights reserved.</div>

          <div className="flex gap-6">
            <a href="#" className="transition hover:text-red-400">
              Made for AI enthusiasts
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
