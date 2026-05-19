import { useState, useEffect } from "react";
import Api from "./components/Api";
import Dashboard from "./components/Dashboard";
import Food_Page from "./components/Food_Page";
import Home from "./components/Home";
import { Navbar } from "./components/Home";

const App = () => {
  const [apiData, setApiData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [noData, setNoData] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleNavigate = (page) => {
    if (page === "home") { setSearch(""); setSelectedFood(null); }
  };

  const handleSelectFood = (food) => {
    setSelectedFood(food);
    window.history.pushState({ foodSelected: true }, "");
  };

  const handleBack = () => {
    setSelectedFood(null);
  };

  useEffect(() => {
    const onPopState = () => {
      if (selectedFood) {
        setSelectedFood(null);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [selectedFood]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-[#0e0e0e]" : "bg-white"}`}
      style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
    >
      {!selectedFood && (
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          search={search}
          onSearch={setSearch}
          onNavigate={handleNavigate}
        />
      )}

      <Api
        setApiData={setApiData}
        setLoading={setLoading}
        setError={setError}
        setNoData={setNoData}
        search={search}
      />

      {selectedFood ? (
        <Food_Page
          food={selectedFood}
          onBack={handleBack}
          darkMode={darkMode}
        />
      ) : search.trim() === "" ? (
        <Home setSearch={setSearch} darkMode={darkMode} />
      ) : (
        <Dashboard
          apiData={apiData}
          loading={loading}
          error={error}
          noData={noData}
          setSearch={setSearch}
          search={search}
          onSelectFood={handleSelectFood}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default App;