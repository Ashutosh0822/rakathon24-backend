import express from 'express';
import bodyParser from 'body-parser';
import getUrl from './puppeteerScriptHotpot.js';
const app = express();
const port = 8080;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to generate prompt
app.post('/generate-prompt', async (req, res) => {
    const data = req.body;
    const urls = []; 
    // Generate prompt and URL for each actor
    for (let i = 0; i < data.actors.length; i++) {
        const prompt = await getPrompt(data, i);    
        urls.push(await getUrl(prompt));
    }
    
    res.json({ urls });
});

// Function to generate prompt
const getPrompt = async (data, ind) => {
    // Extract data from the request
    const actor = data.actors[ind];
    const backgroundAudience = data['Background Audience'];
    const backgroundSpecification = data['Background Specification'];
    const lightings = data.Lightings;
    const mood = data.Mood;
    const targetAudience = data.targetAudiance;
    const product = data.Products;

    // Generate the prompt
    const prompt = `Create an image of a ${actor['Resembling personality']} actor, aged ${actor.Age} with a ${actor['Body Shape']} body shape and wearing ${actor.Atire}, doing ${actor.action}. The background consists of ${backgroundAudience} at ${backgroundSpecification} with lighting like ${lightings} and mood ${mood}. The target audience is ${targetAudience.Gender}s aged ${targetAudience['Age group']}. The product is ${product.Discription}, aiming for ${product['Expected Impact']}.`;
    return prompt;
};

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
