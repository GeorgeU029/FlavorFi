// src/services/api.js
const API_URL = 'http://localhost:3000/api';

export const getAllRecipes = async() => {
    try {
        const response = await fetch(`${API_URL}/recipes`);
        if(!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error){
        console.error('Error fetching recipes:', error);
        throw error;
    }
};

export const getRecipesByIngredients = async (ingredients) => {
    try{
        // Fixed: join() instead of json()
        const response = await fetch(`${API_URL}/recipes/byIngredients?ingredients=${ingredients.join(',')}`);
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching recipes by ingredients:', error);
        throw error;
    }
};