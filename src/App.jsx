import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import ChooseAiModel from './Components/Pages/HomePage/ChooseAiModel';
import Footer from './Components/Pages/HomePage/Footer';
import Hero from './Components/Pages/HomePage/Hero';
import Nav from './Components/Pages/HomePage/Nav';

const App = () => {
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    const loadModels = async () => {
      try {
        const response = await fetch('/Data.json');

        if (!response.ok) {
          throw new Error('Unable to load the subscription plans right now.');
        }

        const data = await response.json();

        if (!ignore) {
          setModels(data);
        }
      } catch (loadError) {
        if (!ignore) {
          setError(loadError.message);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadModels();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <ChooseAiModel models={models} isLoading={isLoading} error={error} />
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={2600}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        draggable={false}
        theme="light"
      />
    </div>
  );
};

export default App;
