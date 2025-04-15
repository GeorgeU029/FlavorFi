function RecipeCard({ recipe }) {
    // Generate a random pastel background color for cards without images
    const getRandomPastelColor = () => {
      const hue = Math.floor(Math.random() * 360);
      return `hsl(${hue}, 70%, 90%)`;
    };
  
    // Estimate cooking time based on number of ingredients (just for visual interest)
    const getCookingTime = () => {
      const baseTime = 15;
      const perIngredientTime = 3;
      return baseTime + recipe.Ingredients.length * perIngredientTime;
    };
  
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full">
        {/* Card Header/Image Area */}
        <div 
          className="h-40 bg-cover bg-center" 
          style={{ 
            backgroundColor: getRandomPastelColor(),
            backgroundImage: recipe.Image ? `url(${recipe.Image})` : 'none'
          }}
        >
          <div className="h-full w-full bg-gradient-to-t from-black/30 to-transparent flex items-end">
            <h2 className="text-xl font-bold p-4 text-white">{recipe.Name}</h2>
          </div>
        </div>
        
        {/* Card Body */}
        <div className="p-4 flex-grow">
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm text-gray-600">{recipe.Author ? `By ${recipe.Author}` : 'Unknown Author'}</p>
            <div className="flex items-center text-amber-600 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              {getCookingTime()} min
            </div>
          </div>
          
          <p className="text-gray-700 text-sm mb-4 line-clamp-2">
            {recipe.Description || "A delicious recipe waiting to be prepared."}
          </p>
          
          <div>
            <h3 className="font-medium text-gray-800 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              Ingredients:
            </h3>
            <ul className="space-y-1 mb-4">
              {recipe.Ingredients.slice(0, 4).map((ingredient, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-baseline">
                  <span className="h-1 w-1 rounded-full bg-amber-500 inline-block mr-2"></span>
                  {ingredient}
                </li>
              ))}
              {recipe.Ingredients.length > 4 && (
                <li className="text-sm font-medium text-amber-600">
                  +{recipe.Ingredients.length - 4} more ingredients
                </li>
              )}
            </ul>
          </div>
        </div>
        
        {/* Card Footer */}
        <div className="p-4 border-t border-gray-100">
          <a
            href={recipe.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-amber-50 hover:bg-amber-100 text-amber-800 font-medium py-2 rounded-md transition-colors"
          >
            View Full Recipe
          </a>
        </div>
      </div>
    );
  }
  
  export default RecipeCard;