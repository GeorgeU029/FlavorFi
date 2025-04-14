const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//load recipe data
const recipes = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/recipes.json'), 'utf8'));

//Test route
app.get('/', (req, res) => {
    res.send('FlavorFI API is running');
});

//Get all recipes
app.get('/api/recipes', (req, res) => {
    res.json(recipes);
});

//Route to find recipes by ingredients
app.get('/api/recipes/byIngredients', (req, res) => {
    // Get ingredients from query params
    const ingredients = req.query.ingredients
        ? req.query.ingredients.split(',').map(item => item.trim().toLowerCase())
        : [];

    if (ingredients.length === 0) {
        return res.status(400).json({ message: 'Please provide at least one ingredient' });
    }

    // Filter recipes that contain at least one of the provided ingredients
    const matchedRecipes = recipes.filter(recipe => {
        const recipeIngredients = recipe.Ingredients.map(item => item.toLowerCase());

        // Check if any of the provided ingredients is in the recipe
        return ingredients.some(ingredient =>
            recipeIngredients.some(recipeIngredient => recipeIngredient.includes(ingredient))
        );
    });

    matchedRecipes.sort((a, b) => {
        const aMatches = countMatches(a.Ingredients, ingredients);
        const bMatches = countMatches(b.Ingredients, ingredients);
        return bMatches - aMatches;
    });
    
    res.json(matchedRecipes);
});

function countMatches(recipeIngredients, userIngredients) {
    return userIngredients.reduce((count, ingredient) => {
        const found = recipeIngredients.some(item =>
            item.toLowerCase().includes(ingredient.toLowerCase())
        );
        return found ? count + 1 : count;
    }, 0);
}

//Server start
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});