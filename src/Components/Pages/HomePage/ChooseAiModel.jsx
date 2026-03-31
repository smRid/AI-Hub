import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Cards from "./Cards";

const loadingCards = Array.from({ length: 6 }, (_, index) => index);
const CART_STORAGE_KEY = "ai-hub-cart";
const SUBSCRIPTIONS_STORAGE_KEY = "ai-hub-subscriptions";
const successToastOptions = {
  iconTheme: {
    primary: "#22c55e",
    secondary: "#ffffff",
  },
};
const errorToastOptions = {
  iconTheme: {
    primary: "#ef4444",
    secondary: "#ffffff",
  },
};

const ChooseAiModel = ({ models, isLoading, error }) => {
  const [activeTab, setActiveTab] = useState("models");
  const [cartItems, setCartItems] = useState([]);
  const [subscribedItems, setSubscribedItems] = useState([]);

  useEffect(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) ?? "[]");
      const storedSubscriptions = JSON.parse(
        localStorage.getItem(SUBSCRIPTIONS_STORAGE_KEY) ?? "[]"
      );

      setCartItems(Array.isArray(storedCart) ? storedCart : []);
      setSubscribedItems(Array.isArray(storedSubscriptions) ? storedSubscriptions : []);
    } catch {
      setCartItems([]);
      setSubscribedItems([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(
      SUBSCRIPTIONS_STORAGE_KEY,
      JSON.stringify(subscribedItems)
    );
  }, [subscribedItems]);

  const freePlans = models.filter((item) => item.isFree).length;
  const premiumPlans = models.length - freePlans;
  const totalLabel = isLoading ? "--" : models.length;
  const freeLabel = isLoading ? "--" : freePlans;
  const premiumLabel = isLoading ? "--" : premiumPlans;
  const cartModels = useMemo(
    () => models.filter((item) => cartItems.includes(item.id)),
    [cartItems, models]
  );
  const cartTotal = cartModels.reduce((sum, item) => sum + (item.price || 0), 0);

  const handleSubscribe = (item) => {
    if (item.isFree) {
      if (subscribedItems.includes(item.id)) {
        toast.error("Already subscribed!", errorToastOptions);
        return;
      }

      setSubscribedItems((current) => [...current, item.id]);
      toast.success("Subscription activated!", successToastOptions);
      return;
    }

    if (cartItems.includes(item.id)) {
      toast.error("Item already in cart!", errorToastOptions);
      return;
    }

    setSubscribedItems((current) =>
      current.includes(item.id) ? current : [...current, item.id]
    );
    setCartItems((current) => [...current, item.id]);
    toast.success("Item added to cart!", successToastOptions);
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems((current) => current.filter((id) => id !== itemId));
    setSubscribedItems((current) => current.filter((id) => id !== itemId));
    toast.success("Item deleted!", successToastOptions);
  };

  const handleCheckout = () => {
    if (!cartModels.length) {
      return;
    }

    setCartItems([]);
    toast.success("Payment successful!", successToastOptions);
  };

  return (
    <section className="containers px-4 py-16 lg:py-24">
      <div className="mx-auto flex max-w-xl justify-center rounded-full border border-red-100 bg-white p-1 shadow-sm">
        <button
          type="button"
          onClick={() => setActiveTab("models")}
          className={`min-w-[12rem] rounded-full px-8 py-3 text-sm font-semibold transition ${
            activeTab === "models"
              ? "bg-gradient-to-r from-fuchsia-500 via-pink-500 to-red-500 text-white shadow-lg shadow-pink-200"
              : "text-zinc-500"
          }`}
        >
          Models
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("cart")}
          className={`min-w-[12rem] rounded-full px-8 py-3 text-sm font-semibold transition ${
            activeTab === "cart"
              ? "bg-gradient-to-r from-fuchsia-500 via-pink-500 to-red-500 text-white shadow-lg shadow-pink-200"
              : "text-zinc-500"
          }`}
        >
          Cart({cartItems.length})
        </button>
      </div>

      {activeTab === "models" ? (
        <>
          <div className="mx-auto mt-16 max-w-3xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-zinc-950 md:text-6xl">
              Choose Your AI Model
            </h2>

            <p className="mt-5 text-lg leading-8 text-zinc-400">
              One subscription gives you access to all frontier AI models.
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
          </div>

          {error ? (
            <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-red-200 bg-red-50 px-6 py-5 text-center text-red-700 shadow-sm">
              {error}
            </div>
          ) : null}

          <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {isLoading
              ? loadingCards.map((card) => (
                  <div
                    key={card}
                    className="h-[430px] animate-pulse rounded-[28px] border border-zinc-200 bg-white/70 p-6 shadow-sm"
                  >
                    <div className="ml-auto h-7 w-24 rounded-full bg-zinc-200" />
                    <div className="mt-6 h-40 rounded-[24px] bg-zinc-200" />
                    <div className="mt-8 h-8 w-40 rounded-full bg-zinc-200" />
                    <div className="mt-4 h-4 w-full rounded-full bg-zinc-200" />
                    <div className="mt-3 h-4 w-11/12 rounded-full bg-zinc-200" />
                    <div className="mt-8 h-10 w-32 rounded-full bg-zinc-200" />
                    <div className="mt-10 h-12 rounded-2xl bg-zinc-200" />
                  </div>
                ))
              : models.map((item) => (
                  <Cards
                    key={item.id}
                    itemData={item}
                    isSubscribed={subscribedItems.includes(item.id)}
                    onSubscribe={handleSubscribe}
                  />
                ))}
          </div>
        </>
      ) : (
        <div className="mx-auto mt-16 max-w-6xl">
          <h2 className="text-4xl font-semibold tracking-tight text-zinc-950 md:text-6xl">
            Your Cart
          </h2>

          <div className="mt-10 space-y-5">
            {cartModels.length === 0 ? (
              <div className="rounded-[32px] border border-dashed border-zinc-200 bg-white px-8 py-16 text-center text-lg text-zinc-500 shadow-sm">
                Your cart is empty. Choose a paid model from the Models tab.
              </div>
            ) : (
              cartModels.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-6 rounded-[28px] border border-zinc-200 bg-white px-6 py-6 shadow-sm md:flex-row md:items-center"
                >
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[24px] bg-zinc-50 p-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-2xl font-semibold text-zinc-950">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-6 md:ml-auto">
                    <div className="text-right">
                      <div className="text-4xl font-semibold tracking-tight text-zinc-950">
                        ${item.price}
                      </div>
                      <div className="text-sm text-zinc-400">per month</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="text-3xl leading-none text-zinc-300 transition hover:text-red-500"
                      aria-label={`Remove ${item.title} from cart`}
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-10 rounded-[28px] bg-zinc-950 px-8 py-8 shadow-[0_25px_70px_-30px_rgba(15,23,42,0.75)]">
            <div className="flex items-center justify-between gap-4">
              <span className="text-3xl font-semibold text-white">Total</span>
              <span className="text-5xl font-semibold tracking-tight text-rose-400">
                ${cartTotal}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCheckout}
            disabled={cartModels.length === 0}
            className={`mt-10 w-full rounded-[24px] px-8 py-5 text-2xl font-semibold text-white transition ${
              cartModels.length === 0
                ? "cursor-not-allowed bg-red-300"
                : "bg-gradient-to-r from-red-600 to-red-500 shadow-lg shadow-red-200 hover:from-red-500 hover:to-red-500"
            }`}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </section>
  );
};

export default ChooseAiModel;
