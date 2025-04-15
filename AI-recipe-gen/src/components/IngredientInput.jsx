import { useState } from "react";

function IngredientInput({ onSearch }) {
  const [ingredients, setIngredients] = useState('');
  const [tags, setTags] = useState([]);

  const handleInputChange = (e) => {
    setIngredients(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      e.preventDefault();
      addTag();
    } else if (e.key === ',' && e.target.value.trim() !== '') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const newIngredient = ingredients.trim();
    if (newIngredient && !tags.includes(newIngredient)) {
      setTags([...tags, newIngredient]);
      setIngredients('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ingredients.trim()) {
      addTag();
    }
    
    // Use the tags array for search
    if (tags.length > 0) {
      onSearch(tags);
    }
  };

  return (
    <div className="bg-white rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">What's in your kitchen?</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <div 
                key={index} 
                className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full flex items-center"
              >
                <span>{tag}</span>
                <button 
                  type="button" 
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-amber-600 hover:text-amber-800"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          
          <div className="relative">
            <input
              type="text"
              value={ingredients}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type ingredient and press Enter or comma"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 pl-10"
            />
            <span className="absolute left-3 top-4 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            Press Enter or comma after each ingredient
          </p>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={tags.length === 0 && ingredients.trim() === ''}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              Find Recipes
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default IngredientInput;