import express from 'express';
import fs from 'fs';
import path from 'path';
import bodyParser  from 'body-parser';
import getUrl from './puppeteerScriptHotpot.js'
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to generate prompt
app.post('/generate-prompt', async (req, res) => {
    const data = req.body;

    // Extract data from the request
    const actor = data.actors[0];
    const backgroundAudience = data['Background Audience'];
    const backgroundSpecification = data['Background Specification'];
    const lightings = data.Lightings;
    const mood = data.Mood;
    const targetAudience = data.targetAudiance[0];
    const product = data.Product[0];

    // Generate the prompt
    const prompt = `Create image of ${actor['Resembling personality']} actor, aged ${actor.Age} with ${actor['Body Shape']} body shape and wearing ${actor.Atire}, doing ${actor.action}. The background consists ${backgroundAudience} at ${backgroundSpecification} with lightings like ${lightings} and mood ${mood}. The target audience is ${targetAudience.Gender}s aged ${targetAudience['Age group']}. The product is ${product.Discription}, aiming for ${product['Expected Impact']}.`;
    const url = await getUrl(prompt);
    // Send the prompt as a response
    res.json({ prompt, url });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
    
//     // Read JSON file and send POST request to the server
//     const dataPath = path.join(__dirname, './data.json');
//     fs.readFile(dataPath, 'utf8', (err, jsonData) => {
//         if (err) {
//             console.error('Error reading JSON file:', err);
//             return;
//         }

//         const axios = require('axios');
//         axios.post(`http://localhost:${port}/generate-prompt`, JSON.parse(jsonData))
//             .then(response => {

//                 console.log('Generated Prompt:', response.data.prompt);
//             })
//             .catch(error => {
//                 console.error('Error generating prompt:', error);
//             });
//     });
// });
