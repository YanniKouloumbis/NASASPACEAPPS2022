// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const { Configuration, OpenAIApi } = require("openai");


const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function requestResearcherResponse(title, description, question) {
  //GTP3 OpenAI Call
  //set researcherResponse to the response from GPT3
  //multiline string
  const prompt = `You are a NASA expert responding to an inquiry by a single user whose knowledge of the natural
  sciences may be anywhere on a scale ranging from rudimentary to advanced, who wants to learn more
  about a particular dataset or field of NASA science.
  
  Dataset:
  ${title}
  
  Description:
  ${description}
  
  Below is the question, please answer it in JSON format. Only answer the question asked. Answer as
  specifically as possible. Prioritize direct answers in displaying information.
  
  {"question": "${question}", "answer":`;

  const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt,
      temperature: 0.7,
      max_tokens: 1400,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    //expected response: "answer from AI \n sadfsadfasfsf \n"}
    //create a variable called result that extracts from first right bracket and removes the quotes.
      let result = response.data.choices[0].text.split("}")[0];
      //stripe starting and ending spaces
      result = result.trim();
      result = result.substring(1, result.length-1);
      //remove all new lines
      result = result.replace(/\\n/g, "");
      //replace all spaces with a single space
      result = result.replace(/\s+/g, " ");
      //return  {answer: result}
      return result;
}


export default async (req, res) => {
  const { question, title, description } = req.body;
  const result = await requestResearcherResponse(title, description, question);
  res.status(200).json({ result });
}