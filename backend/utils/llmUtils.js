const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const openaiApiKey = 'AIzaSyCuHedq2c4Nox9UAzSGEE8lKROBt7_wXIg';// Replace with your actual OpenAI API key
const genAI = new GoogleGenerativeAI(openaiApiKey);

const getLLMResponse = async (content, question,mytext) => {

  try {
   
   const processVector = content.toString();

   const promptStart = "answer the question based on the context below: \n\n";
   const promptEnd = `\n\nQuestion: ${question} \n\nAnswer:`
   const prompt = `${promptStart} ${mytext} ${promptEnd}`
    // const response = await axios.post(
    //   'https://api.openai.com/v1/completions',
    //   {
    //     model: 'text-davinci-003', // Replace with the appropriate model name
    //     prompt: prompt,
    //     max_tokens: 150,
    //     n: 1,
    //     stop: null,
    //     temperature: 0.7,
    //   },
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${openaiApiKey}`,
    //     },
    //   }
    // );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return text;
  } catch (error) {
    console.error('Error getting response from OpenAI:', error);
    throw error;
  }
};

module.exports = { getLLMResponse };
