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
    const imgUrls = []; 

    // Generate prompt and URL for each context entry
    for (let i = 0; i < data.contextData.length; i++) {
        const prompt = await getPrompt(data, i);    
        imgUrls.push(await getUrl(prompt));
    }
    
    res.json({ imgUrls });
});

// Function to generate prompt
const getPrompt = async (data, ind) => {
    // Extract data from the request
    const context = data.contextData[ind];
    const targetAudience = data.targetAudienceData;
    const product = data.productData;

    // Generate the prompt
    const prompt = `Create an image of an actor resembling ${context.actorResemblence}, aged ${context.actorAge} with a ${context.bodyShape} body shape and wearing ${context.actorAttire}, doing ${context.actorAction}. The background features ${context.backGroundAudience} at ${context.backGroundSpecification} with ${context.moodAndLightening} lighting. The target audience is ${targetAudience.gender}s aged ${targetAudience.targetAudienceAge}. The product description is ${product.description}, aiming for ${product.impact}.`;
    return prompt;
};

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
