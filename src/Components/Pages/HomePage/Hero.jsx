const bannerImage = '/assets/banner.png';

const Hero = () => {
  return (
    <div className="relative flex min-h-[42rem] items-center overflow-hidden px-4 py-12">
      <div className="containers grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2 text-sm font-medium text-red-500">
            Frontier AI Models
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tighter text-red-600 lg:text-5xl">
            One Subscription.
            <br />
            <span className="bg-gradient-to-r from-red-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
              All the AIs You Need
            </span>
          </h1>

          <p className="max-w-lg text-lg text-zinc-700">
            Experience the full spectrum of frontier intelligence with the most
            advanced AI models, all unified under a single subscription.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="group flex items-center gap-3 rounded-2xl bg-red-600 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-red-500/30 transition-all hover:bg-red-500">
              Get Unlimited Access
              <span className="transition group-hover:translate-x-1">-&gt;</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-6 text-sm text-zinc-600">
            <div>50+ Frontier Models</div>
            <div>No Usage Limits</div>
            <div>Cancel Anytime</div>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="relative">
            <img
              className="relative h-auto w-full max-w-xl rounded-3xl object-contain drop-shadow-2xl"
              src={bannerImage}
              alt="AI Models Banner"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
