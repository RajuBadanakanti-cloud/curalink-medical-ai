import { generateAnswer } from "./llm.service.js"

export const correctMedicalTerm = async (text) => {

        const prompt = `
            You are a medical terminology assistant.

            Correct spelling mistakes in the following medical term or query.

            Rules:
            - If the text is correct, return it unchanged.
            - If it contains spelling errors, return the corrected version.
            - Return ONLY the corrected text.
            - Do not add explanations.

            Input:
            ${text}

            Corrected:
            `

        const response = await generateAnswer(prompt) || []

        if (typeof response === "string") {
            return response.trim();
        } else {
            console.log("Invalid response:", response);
            return "";
        }

       
}