import { useState } from "react";

function IngredientInput ({onSearch}){
    const [ingredients,setIngredients] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const ingredientList = ingredients
        .split(',')
        .map(i => i.trim())
        .filter(i => i !== '');
       onSearch(ingredientList);   
    };

    return(
        <form onSubmit={handleSubmit} className="mb-6">
            <div className = "mb-4">
                <label htmlFor = "ingredients" className = "block text-lg font-medium mb-2">
                    Enter ingredients you have:
                </label>
                <input
                    type = "text"
                    id = "ingredients"
                    value = {ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    placeholder="e.g. butter, sugar, flour"
                    className="w-full p-3 border rounded-lg"
                    required
                />
                <p className="text-sm text-gray-500 mt-1">
                    Separate ingredients with commas
                </p>
            </div>
            <button
             type = "submit"
             className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg"
            >
                Find Recipes
            </button>
        </form>
    );
 }
 export default IngredientInput;