import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSpoonacularApi } from "../hooks/useSpoonacularApi";

const RecipeDetails = () => {
  const { id } = useParams();
  const { data, loading, error, fetchRecipeById } = useSpoonacularApi();

  useEffect(() => {
    fetchRecipeById(id);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="ml-4 text-xl font-semibold text-gray-600">
          Loading recipe details...
        </p>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }
  console.log(data);

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to Home
      </Link>
      {data && (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800">{data.title}</h1>
            <h2 className="text-xl font-semibold text-gray-700 mt-4">
              Ingredients:
            </h2>
            <ul className="list-disc ml-5 mt-2 text-gray-600">
              {data.extendedIngredients.map((ing) => (
                <li key={ing.id}>{ing.original}</li>
              ))}
            </ul>
            <h2 className="text-xl font-semibold text-gray-700 mt-4">
              Instructions:
            </h2>
            {data.instructions ? (
              <div
                className="mt-2 text-gray-600"
                dangerouslySetInnerHTML={{
                  __html: data.instructions,
                }}
              />
            ) : (
              <p className="text-gray-600 mt-2">No instructions available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
