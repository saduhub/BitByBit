const express = require('express');
const fetch = require('node-fetch'); 
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
// console.log('PANTRY_URL:', process.env.PANTRY_URL);
const app = express();
const PORT = process.env.PORT || 3000;
// let responseBody;

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

app.post('/api', async (req, res) => {
    try {
        const { body } = req;
        const pantryUrl = process.env.PANTRY_URL; 
        const pantryResponse = await fetch(pantryUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.PANTRY_API_KEY}`  
            },
            body: JSON.stringify(body)
        });

        // responseBody = await pantryResponse.text();
        const contentType = pantryResponse.headers.get("content-type");

        if (pantryResponse.ok) {
            if (contentType && contentType.includes("application/json")) {
                const data = await pantryResponse.json();
                console.log("Data stored in Pantry:", data);
                res.status(200).json({ message: 'Data saved successfully', data });
            } else {
                const text = await pantryResponse.text();
                console.log("Response received:", text);
                res.status(200).json({ message: 'Data saved successfully', response: text });
            }
        } else {
            console.error(`Failed to save data to Pantry: ${pantryResponse.status}`);
            const errorText = await pantryResponse.text(); // Get the error message as text
            res.status(pantryResponse.status).json({ message: 'Failed to save data to Pantry', error: errorText });
        }
    } catch (error) {
        console.error("Error in /api:", error);
        // console.log(responseBody)
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});