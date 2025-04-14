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
    <div className="container mx-auto px-4 py-8 max-w-6xl bg-red-100">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">FlavorFi</h1>
        <p className="text-xl text-green-600">Find recipes with ingredients you already have</p>
      </header>

      <main>
        <IngredientInput onSearch={handleSearch} />

        {loading && (
          <div className="text-center py-8">
            <p className="text-lg">Loading recipes...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {!loading && !error && recipes.length === 0 && (
          <div className="text-center py-8">
            <p className="text-lg">Enter ingredients to find recipes</p>
          </div>
        )}

        {recipes.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Found {recipes.length} Recipes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;