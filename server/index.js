const express = require('express');
const fetch = require('node-fetch'); 
const { OpenAI } = require('openai');
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
// console.log('PANTRY_URL:', process.env.PANTRY_URL);
const app = express();
const PORT = process.env.PORT || 3000;
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
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
// Add data to Pantry
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
// Analyze efficiency using Open AI API
app.post('/openai', async (req, res) => {
    const { prompt, pastData } = req.body;
    const formattedPrompt = `Analyze this data: ${JSON.stringify(pastData)} with respect to the user query: ${prompt}`;
    const sentPrompt = [
        {"role": "system", "content": "Analyze my daily habits data from all recorded dates and provide a detailed efficiency analysis as my life coach. Focus on my adherence to routine tasks and my productivity. For each task, calculate the completion percentage to illustrate my efficiency over time. Your responses should be concise, under 100 words, and include percentages for all tasks to help me visualize improvements and areas needing attention. Ensure your analysis covers all available data."},
        {"role": "user", "content": formattedPrompt}
    ];
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            messages: sentPrompt,
            max_tokens: 150
        });
        res.json(completion.choices[0].message.content);
        console.log(completion.choices[0].message.content);
    } catch (error) {
        console.error("Error calling OpenAI API:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});