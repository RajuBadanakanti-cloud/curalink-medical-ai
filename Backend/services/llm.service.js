
import Groq from "groq-sdk"


export const generateAnswer = async (prompt) => {

    try{
            
        const groq = new Groq({
            apiKey: process.env.MY_API_KEY
        })

        const response = await groq.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        })

        return response.choices[0].message.content

}catch(err){
    console.log("groq error: ", err)
}

}