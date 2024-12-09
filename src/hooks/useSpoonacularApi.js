import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";

export const useSpoonacularApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(process.env);

  const fetchAllRecipes = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/complexSearch?apiKey=${API_KEY}`
      );
      setData(response.data.results);
      toast.success("Recipes loaded successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      console.log(err);
      toast.error(err.response?.data?.message || "Error loading recipes");
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipeById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${BASE_URL}/${id}/information?apiKey=${API_KEY}`
      );
      setData(response.data);
      console.log(response.data);
      toast.success("Recipe details loaded successfully!");
    } catch (err) {
      setError("Failed to fetch recipe details.");
      toast.error("Error fetching recipe details!");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetchAllRecipes,
    fetchRecipeById,
  };
};
