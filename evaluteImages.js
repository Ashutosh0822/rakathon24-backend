import axios from 'axios';

// Replace with your OpenAI API key
const API_KEY = '';


async function evaluateImages(imageUrls, params) {
    // Define the prompt describing the evaluation criteria
    const prompt = `
    Evaluate the following image based on these parameters: ${params.toString()}

    Image URL: ${imageUrls.toString()}
    
    For each parameter, categorize as 'Not Satisfying', 'Maybe', or 'Strongly Supporting', and explain briefly.
    `;

    try {
        // Make a request to the OpenAI API
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                
                model: "gpt-3.5-turbo",
                // model: "gpt-4",
                messages: [{ role: "user", content: prompt }],
                max_tokens: 150 // Adjust this based on your needs
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                }
            }
        );

        // Log the response from the API
        console.log(response.data.choices[0].message.content);

    } catch (error) {
        console.error('Error evaluating image:', error.response ? error.response.data : error.message);
    }
}

export default evaluateImages;
