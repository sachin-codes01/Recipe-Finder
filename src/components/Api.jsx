import { useEffect } from "react";

const KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

const Api = ({ setApiData, search, setLoading, setError, setNoData }) => {

  const fetchRecipes = async (query) => {
    try {
      setLoading(true);
      setError("");
      setNoData(false);

      if (!KEY) {
        setApiData([]);
        setError("API key is missing");
        return;
      }

      const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&addRecipeInformation=true&fillIngredients=true&apiKey=${KEY}`);

      if (!res.ok) {
        setApiData([]);
        setError("API is not responding");
        return;
      }

      const data = await res.json();

      if (data.status === "failure") {
        setApiData([]);
        setError(data.message || "API request failed");
        return;
      }

      if (!data.results || data.results.length === 0) {
        setApiData([]);
        setNoData(true);
        return;
      }

      setApiData(data.results);
    } catch (err) {
      console.error(err);
      setApiData([]);
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!search.trim()) return;
    const timer = setTimeout(() => fetchRecipes(search), 700);
    return () => clearTimeout(timer);
  }, [search]);

  return null;
};

export default Api;