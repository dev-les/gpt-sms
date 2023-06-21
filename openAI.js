const { Configuration, OpenAIApi } =  require("openai");
const dotenv = require("dotenv");
dotenv.config();
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);

const askGPT = async (content) => {
        try {
            console.log(content);
            const complete = await openai.createChatCompletion({
                 model: "gpt-3.5-turbo",
                 messages: [{role: "user", content: content}],
            });
            return complete.data.choices[0].message;
            
        } catch (error) {
            console.log(error);
        }     
}
module.exports = {askGPT}