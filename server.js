import express from 'express';
import bodyParser  from 'body-parser';
import getUrl from './puppeteerScriptHotpot.js'
const app = express();
const port = 8080;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to generate prompt
app.post('/generate-prompt', async (req, res) => {
    const data = req.body;
    const urls = [];
    for (let i = 0; i < data.actors.length(); i++){
        urls[i] = getImageUrl(data, i);
    }
    res.json({ prompt, urls });
});
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })


const getImageUrl= async (data, ind)=>{
    // Extract data from the request
    const actor = data.actors[ind];
    const backgroundAudience = data['Background Audience'];
    const backgroundSpecification = data['Background Specification'];
    const lightings = data.Lightings;
    const mood = data.Mood;
    const targetAudience = data.targetAudiance;
    const product = data.Product;

    // Generate the prompt
    const prompt = `Create image of ${actor['Resembling personality']} actor, aged ${actor.Age} with ${actor['Body Shape']} body shape and wearing ${actor.Atire}, doing ${actor.action}. The background consists ${backgroundAudience} at ${backgroundSpecification} with lightings like ${lightings} and mood ${mood}. The target audience is ${targetAudience.Gender}s aged ${targetAudience['Age group']}. The product is ${product.Discription}, aiming for ${product['Expected Impact']}.`;
    return  await getUrl(prompt);
    // Send the prompt as a response
}