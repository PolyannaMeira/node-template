import query from '../config/db.js';
import dotenv from 'dotenv';


dotenv.config();

const createRecipeTable = async () => {
    const sql = 
            `CREATE TABLE IF NOT EXISTS recipes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255),
            ingredients TEXT,
            instructions TEXT)`;

            try {
                await query(sql);
                console.log('Recipes table created successfully');
            } catch (error) {
                console.error('Error creating recipes table:', error);
            }
        };


export default createRecipeTable;
