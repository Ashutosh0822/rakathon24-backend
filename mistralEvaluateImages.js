import axios from "axios";

const API_KEY = "7QCreBSW43IN5Gi7bBZtB8khAjXrclnh";
const evaluateImages = async (imageUrls, params) => {
  console.log(imageUrls);
  params = params
    ? params
    : [
        "Artistic Expression",
        "Memorability",
        "Demographic sensitivity",
        "Emotion Elicitation",
      ];
  const prompt = `Evaluate the following image based on these parameters: ${params.toString()}.Image URL: ${imageUrls.toString()} .For each parameter, result will be one of 'Not Satisfying', 'Maybe', or 'Strongly Supporting', and explain briefly. Response in json array of {category,result, description}}
    `;
//   console.log(prompt);

  const res = await axios.post(
    "https://api.mistral.ai/v1/chat/completions",
    {
      model: "open-mistral-nemo",
      temperature: 0.7,

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: {
        type: "json_object",
      },
      safe_prompt: false,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );

  console.log(res.status);
  if (res.status == 200) {
    return JSON.parse(res.data.choices[0].message.content);
  }
  return "Something went wrong with validation!";
};
export default evaluateImages;
