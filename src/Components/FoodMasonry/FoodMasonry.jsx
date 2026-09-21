import FoodCard from "./FoodCard";

import "./FoodMasonry.css";

const FoodMasonry = ({ foods }) => {
  return (
    <section className="food-masonry">

      {foods.map((food) => (
        <FoodCard
          key={food.id}
          food={food}
        />
      ))}

    </section>
  );
};

export default FoodMasonry;