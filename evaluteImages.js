import axios from 'axios';

// Replace with your OpenAI API key
const API_KEY = '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';


async function evaluateImages(imageUrls, params) {
    // Define the prompt describing the evaluation criteria
    params = params?params:["Artistic Expression","Memorability","Demographic sensitivity","Emotion Elicitation"];
    const prompt = `
    Evaluate the following image based on these parameters: ${params.toString()}

    Image URL: ${imageUrls.toString()}
    
    For each parameter, categorize as 'Not Satisfying', 'Maybe', or 'Strongly Supporting', and explain briefly.
    `;
    console.log(prompt);
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
