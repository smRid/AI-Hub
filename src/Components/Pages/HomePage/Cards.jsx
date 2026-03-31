import { useState } from 'react';

const statusStyles = {
  popular: {
    label: 'Popular',
    className: 'border-red-200 bg-red-50 text-red-600',
  },
  favourite: {
    label: 'Favorite',
    className: 'border-amber-200 bg-amber-50 text-amber-700',
  },
  trending: {
    label: 'Trending',
    className: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  },
};

const categoryLabels = {
  assistant: 'AI Assistant',
  model: 'Foundation Model',
  search: 'AI Search',
};

const accentStyles = {
  assistant: 'from-red-50 via-white to-orange-50',
  model: 'from-sky-50 via-white to-cyan-50',
  search: 'from-emerald-50 via-white to-teal-50',
};

const logoStyles = {
  chatgpt: 'from-emerald-500 to-teal-500 text-white',
  grok: 'from-zinc-900 to-zinc-700 text-white',
  deepseek: 'from-sky-500 to-cyan-500 text-white',
  gemini: 'from-indigo-500 to-fuchsia-500 text-white',
  claude: 'from-orange-500 to-amber-500 text-white',
  kimi: 'from-rose-500 to-pink-500 text-white',
  perplexity: 'from-emerald-500 to-lime-500 text-white',
  mistral: 'from-orange-600 to-red-500 text-white',
  'meta-ai': 'from-blue-600 to-cyan-500 text-white',
  qwen: 'from-violet-600 to-purple-500 text-white',
  copilot: 'from-cyan-500 to-blue-600 text-white',
};

const formatSlugLabel = slug =>
  slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const getInitials = title =>
  title
    .split(' ')
    .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase())
    .join('');

const getPriceLabel = (itemData, isSubscribed) => {
  if (itemData.isFree) {
    return {
      value: 'Free',
      suffix: 'Forever',
      action: isSubscribed ? 'Subscribed' : 'Subscribe Now',
      note: 'No monthly billing',
    };
  }

  return {
    value: `$${itemData.price}`,
    suffix: '/month',
    action: isSubscribed ? 'Subscribed' : 'Subscribe Now',
    note: 'Billed monthly',
  };
};

const LogoBadge = ({ image, slug, title }) => {
  const [hasError, setHasError] = useState(false);
  const fallbackStyle = logoStyles[slug] ?? 'from-zinc-700 to-zinc-500 text-white';

  if (!image || hasError) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center rounded-[18px] bg-gradient-to-br ${fallbackStyle} text-xl font-semibold tracking-wide`}
        aria-label={`${title} logo fallback`}
      >
        {getInitials(title)}
      </div>
    );
  }

  return (
    <img
      src={image}
      alt={title}
      className="h-full w-full object-contain"
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
    />
  );
};

const Cards = ({ itemData, isSubscribed, onSubscribe }) => {
  const status = statusStyles[itemData.status] ?? {
    label: 'Available',
    className: 'border-zinc-200 bg-zinc-100 text-zinc-700',
  };
  const category = categoryLabels[itemData.category] ?? 'AI Platform';
  const accent =
    accentStyles[itemData.category] ?? 'from-zinc-50 via-white to-zinc-100';
  const pricing = getPriceLabel(itemData, isSubscribed);

  return (
    <article className="group flex h-full flex-col rounded-[28px] border border-zinc-200 bg-white p-5 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_-34px_rgba(239,68,68,0.35)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-400">
            {category}
          </p>
          <h3 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">
            {itemData.title}
          </h3>
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${status.className}`}
        >
          {status.label}
        </span>
      </div>

      <div
        className={`mt-6 flex items-center gap-4 rounded-[24px] border border-white bg-gradient-to-br ${accent} p-4`}
      >
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[22px] bg-white/90 p-3 shadow-sm">
          <LogoBadge
            image={itemData.image}
            slug={itemData.slug}
            title={itemData.title}
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-zinc-500">{pricing.note}</p>
          <p className="text-sm leading-6 text-zinc-700">
            {itemData.description}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700">
          {formatSlugLabel(itemData.slug)}
        </span>
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700">
          {itemData.isFree ? 'Free access' : 'Premium plan'}
        </span>
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700">
          {category}
        </span>
      </div>

      <div className="mt-auto pt-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Price
            </p>
            <div className="mt-3 flex items-end gap-2">
              <span
                className={`text-4xl font-semibold tracking-tight ${
                  itemData.isFree ? 'text-emerald-500' : 'text-zinc-950'
                }`}
              >
                {pricing.value}
              </span>
              <span className="pb-1 text-lg text-zinc-400">{pricing.suffix}</span>
            </div>
          </div>

          <div className="rounded-full border border-zinc-200 px-3 py-1 text-sm font-medium text-zinc-600">
            {itemData.isFree ? 'Instant access' : 'Monthly plan'}
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSubscribe(itemData)}
          className={`mt-6 w-full rounded-2xl px-5 py-3.5 text-base font-semibold text-white transition ${
            isSubscribed
              ? 'bg-red-600'
              : 'bg-zinc-950 hover:bg-red-600'
          }`}
        >
          {pricing.action}
        </button>
      </div>
    </article>
  );
};

export default Cards;
