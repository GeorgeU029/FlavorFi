const API_URL = 'http://localhost:5000/api';

export const getAllRecipes = async() => {
    try {
        const response = await fetch(`${API_URL}/recipes`);
        if(!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (erorr){
        console.error('Error fetching recipes:',error);
        throw error;
    }
};

export const getRecipesByIngredients = async (ingredients) => {
    try{
        const response = await fetch(`${API_URL}/recipes/byIngredients?ingredients=${ingredients.json(',')}`);
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error ('Error fetching recipes by ingredients:',error);
        throw error;
    }
};