import query from '../config/db.js';

const recipeControllers = {
    getAllRecipes: async (req, res, next) => {
        const allRecipes = 'SELECT * FROM recipes';
        try {           
            const recipes = await query(allRecipes);
            res.status(200).json(recipes);
        } catch (error) {
            console.error('Error fetching recipes:', error);
            res.status(500).json({ error: 'Error fetching recipes' });
        }
    
},

    getOneRecipe: async (req, res, next) => {
        const id = parseInt(req.params.id); 
        if (isNaN(id)) {
            const error = new Error('Invalid recipe ID');
            error.status = 400;
            return next(error);
        }
        try {
            const [recipe] = await query('SELECT * FROM recipes WHERE id = ?', [id]);

            if (!recipe) {
                const error = new Error(`A recipe with the id of ${id} was not found`);
                error.status = 404;
                return next(error);
            }

            res.status(200).json(recipe);
        } catch (error) {
            return next(error);
        }
    },

    postRecipe: async (req, res, next) => {
        const newRecipe = {
            title: req.body.title,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
        };

        if (!newRecipe.title || !newRecipe.ingredients || !newRecipe.instructions) {
            const error = new Error('Please include title, ingredients, and instructions');
            error.status = 400;
            return next(error);
        }

        try {
            await query('INSERT INTO recipes (title, ingredients, instructions) VALUES (?, ?, ?)', [newRecipe.title, newRecipe.ingredients, newRecipe.instructions]);
            res.status(201).json({ message: 'Recipe added successfully' });
        } catch (error) {
            return next(error);
        }
    },

    updateRecipe: async (req, res, next) => {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            const error = new Error('Invalid recipe ID');
            error.status = 400;
            return next(error);
        }

        const updatedRecipe = {
            title: req.body.title,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
        };

        try {
            const [result] = await query('UPDATE recipes SET title = ?, ingredients = ?, instructions = ? WHERE id = ?', [updatedRecipe.title, updatedRecipe.ingredients, updatedRecipe.instructions, id]);

            if (result.affectedRows === 0) {
                const error = new Error(`A recipe with the id of ${id} was not found`);
                error.status = 404;
                return next(error);
            }

            res.status(200).json({ message: 'Recipe updated successfully' });
        } catch (error) {
            return next(error);
        }
    },

    deleteRecipe: async (req, res, next) => {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            const error = new Error('Invalid recipe ID');
            error.status = 400;
            return next(error);
        }

        try {
            const [result] = await query('DELETE FROM recipes WHERE id = ?', [id]);

            if (result.affectedRows === 0) {
                const error = new Error(`A recipe with the id of ${id} was not found`);
                error.status = 404;
                return next(error);
            }

            res.status(200).json({ message: 'Recipe deleted successfully' });
        } catch (error) {
            return next(error);
        }
    },
};

export default recipeControllers;



