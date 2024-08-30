import express from 'express';
import bodyParser from 'body-parser';
import getUrl from './puppeteerScriptHotpot.js';
import cors from 'cors'

const app = express();
const port = 8080;

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    withCredentials: true
}
app.use(cors(corsOptions));
// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to generate prompt
app.post('/experiment', async (req, res) => {
    const data = req.body;
    const imgUrls = [];

    // Generate prompt and URL for each context entry
    for (let i = 0; i < data.contextData.length; i++) {
        const prompt = await getPrompt(data, i);
        imgUrls.push(await getUrl(prompt));
    }
    // const validationResponse = await getImagesValidation(imageUrls)
    // console.log(validationResponse);
    // res.json({ imageUrls, validationResponse });
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


const getValidationPrompt = (data) =>{
    const params =  data.validationParamerters?data.validationParamerters:["Artistic Expression","Memorability","Demographic sensitivity","Emotion Elicitation"];
    return `Can you validate these images based on the following parameters: ${params.toString()}, categorize each parameter based on as Not Satisfying, Maybe, Strongly supporting`;
}