import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Hero from "../../Components/Hero/Hero";
import CategoryGrid from "../../Components/CategoryGrid/CategoryGrid";
import { getCategories } from "../../data/categoryStore";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("");
  const [categories, setCategories] = useState(getCategories);

  useEffect(() => {
    const refreshCategories = () => {
      const nextCategories = getCategories();
      setCategories(nextCategories);
      setActiveCategory((current) =>
        nextCategories.some((item) => item.id === current)
          ? current
          : nextCategories[0]?.id || ""
      );
    };
    window.addEventListener("tripwala-categories-updated", refreshCategories);
    window.addEventListener("storage", refreshCategories);

    const initialCategories = getCategories();
    if (initialCategories.length > 0) {
      setActiveCategory(initialCategories[0].id);
    }

    return () => {
      window.removeEventListener("tripwala-categories-updated", refreshCategories);
      window.removeEventListener("storage", refreshCategories);
    };
  }, []);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    navigate(`/listings?category=${categoryId}`);
  };

  return (
    <main className="home-page">
      <Header />
      <Hero
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      <CategoryGrid categories={categories} />
    </main>
  );
};

export default Home;