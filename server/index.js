const express = require('express');
const fetch = require('node-fetch'); 
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
// console.log('PANTRY_URL:', process.env.PANTRY_URL);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', async (req, res) => {
    try {
        const pantryResponse = await fetch(process.env.PANTRY_URL);
        if (pantryResponse.ok) {
            const data = await pantryResponse.json();  
            console.log("Data received from Pantry:", data);
            res.status(200).json(data);  
        } else {
            throw new Error(`Failed to fetch data from Pantry: ${pantryResponse.status}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});