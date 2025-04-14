function RecipeCard({recipe}){
    return (
        <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{recipe.Name}</h2>
                <p className="text-gray-700 mb-2">{recipe.Description}</p>
                <p className="text-sm text-gray-500 mb-4"> By {recipe.Author}</p>

                <div className="mb-4">
                    <h3 className="font-semibold mb-2">Ingredients:</h3>
                    <ul className="list-disc pl-5">
                        {recipe.Ingredients.slice(0,4).map((ingredient,index) => (
                            <li key={index} className="text-sm">{ingredient}</li>
                        ))}
                        {recipe.Ingredients.length > 4 && (
                            <li className="text-sm fond-semibold">
                                +{recipe.Ingredients.length-4} more ingredients
                            </li>
                        )}
                    </ul>
                </div>
                <a
                    href={recipe.url}
                    target="_blank"
                    rel = "noopener noreferrer"
                    className="text-blue-500 hover:underline text-sm"
                >
                    See full recipe
                </a>
            </div>
        </div>
    );
}
export default RecipeCard;