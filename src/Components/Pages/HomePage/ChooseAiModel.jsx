import Cards from "./Cards";

const loadingCards = Array.from({ length: 6 }, (_, index) => index);

const ChooseAiModel = ({ models, isLoading, error }) => {
  const freePlans = models.filter((item) => item.isFree).length;
  const premiumPlans = models.length - freePlans;
  const totalLabel = isLoading ? "--" : models.length;
  const freeLabel = isLoading ? "--" : freePlans;
  const premiumLabel = isLoading ? "--" : premiumPlans;

  return (
    <section className="containers px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-red-600">
          Subscription Plans
        </span>

        <h2 className="mt-5 text-4xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
          Choose Your AI Model
        </h2>

        <p className="mt-4 text-lg leading-8 text-zinc-600">
          Browse every plan from the data file in one clean grid. Each card
          shows the model type, pricing, and status without the clutter.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <div className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm">
          {totalLabel} total plans
        </div>
        <div className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm">
          {freeLabel} free options
        </div>
        <div className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm">
          {premiumLabel} paid subscriptions
        </div>
        {/* <div className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm">
          {categoryLabel} categories
        </div> */}
      </div>

      {error ? (
        <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-red-200 bg-red-50 px-6 py-5 text-center text-red-700 shadow-sm">
          {error}
        </div>
      ) : null}

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {isLoading
          ? loadingCards.map((card) => (
              <div
                key={card}
                className="h-[430px] animate-pulse rounded-[28px] border border-zinc-200 bg-white/70 p-5 shadow-sm"
              >
                <div className="h-7 w-24 rounded-full bg-zinc-200" />
                <div className="mt-6 h-28 rounded-[24px] bg-zinc-200" />
                <div className="mt-6 h-8 w-40 rounded-full bg-zinc-200" />
                <div className="mt-4 h-4 w-full rounded-full bg-zinc-200" />
                <div className="mt-3 h-4 w-11/12 rounded-full bg-zinc-200" />
                <div className="mt-8 h-10 w-32 rounded-full bg-zinc-200" />
                <div className="mt-10 h-12 rounded-2xl bg-zinc-200" />
              </div>
            ))
          : models.map((item) => <Cards key={item.id} itemData={item} />)}
      </div>
    </section>
  );
};

export default ChooseAiModel;
