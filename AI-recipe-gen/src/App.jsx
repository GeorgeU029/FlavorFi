import { useState } from 'react';
import IngredientInput from './components/IngredientInput';
import RecipeCard from './components/RecipeCard';
import { getRecipesByIngredients } from './services/api';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (ingredients) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getRecipesByIngredients(ingredients);
      setRecipes(data);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-12 pt-6">
          <h1 className="text-5xl font-bold mb-3 text-amber-800">
            Flavor<span className="text-green-600">Fi</span>
          </h1>
          <p className="text-xl text-gray-600 italic">
            Discover delicious recipes with ingredients you already have
          </p>
        </header>

        <main className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <IngredientInput onSearch={handleSearch} />

          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200">
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            </div>
          )}

          {!loading && !error && recipes.length === 0 && (
            <div className="text-center py-12">
              <img 
                src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f373.svg" 
                alt="Cooking" 
                className="w-24 h-24 mx-auto mb-4"
              />
              <p className="text-lg text-gray-600">
                Enter ingredients to discover delicious recipes
              </p>
            </div>
          )}

          {recipes.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">
                Found {recipes.length} Recipes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe, index) => (
                  <RecipeCard key={index} recipe={recipe} />
                ))}
              </div>
            </div>
          )}
        </main>

        <footer className="text-center text-gray-500 text-sm pb-8">
          <p>© {new Date().getFullYear()} FlavorFi - Find recipes with what you have</p>
        </footer>
      </div>
    </div>
  );
}

export default App;