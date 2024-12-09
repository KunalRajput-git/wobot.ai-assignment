import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSpoonacularApi } from "../hooks/useSpoonacularApi"; // Adjust the path as needed

const Home = () => {
  const [recipes, setReciepes] = useState([]);
  const { data, loading, error, fetchAllRecipes } = useSpoonacularApi();

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-gray-600">
          Loading recipes...
        </p>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Recipes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-56 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-sm font-semibold text-gray-800 mb-2">
                {recipe.title}
              </h2>
              <p className="text-xs text-gray-600 mb-4 line-clamp-2">
                {recipe.summary ? recipe.summary : "No description available."}
              </p>
            </div>
            <div className="p-4 pt-0">
              <Link to={`/recipe/${recipe.id}`}>
                <button className="px-4 py-2 bg-blue-500 text-white text-xs font-semibold rounded-lg w-full hover:bg-blue-600">
                  View Recipe
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
