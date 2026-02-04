
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const model = 'gemini-3-flash-preview';

export const generateMissionPage = async (transcript: string): Promise<string> => {
  const prompt = `
    You are an expert web developer and branding specialist. Your task is to generate a complete, single-file 'index.html' for a personal GitHub Page based on a user's voice-transcribed mission statement.
    The user's mission is: "${transcript}"

    Follow these instructions precisely:
    1.  **Analyze the Mission:** Understand the core themes, values, and goals from the user's transcript.
    2.  **Generate a Title:** Create a compelling, short title for the webpage that reflects the mission.
    3.  **Craft a Headline:** Write a strong, inspiring headline.
    4.  **Write a Mission Statement:** Refine the user's raw transcript into a polished, concise, and impactful mission statement (a few sentences).
    5.  **Structure the HTML:** Create a full HTML5 document.
    6.  **Use Tailwind CSS:** Style the page using Tailwind CSS via the CDN ('<script src="https://cdn.tailwindcss.com"></script>'). The design should be modern, professional, visually appealing, and reflective of the mission's tone. Use a dark theme with good contrast and readability. Feel free to use gradients or subtle background patterns.
    7.  **Single File Output:** The entire output MUST be a single block of HTML code for the 'index.html' file. Do not include any explanation, preamble, or markdown formatting around the code block. Start with \`<!DOCTYPE html>\` and end with \`</html>\`.
    8.  **Content:** Include the title, headline, and the polished mission statement in the HTML body. You can also add a simple footer.
    9.  **Responsiveness:** Ensure the page is fully responsive and looks great on both mobile and desktop screens.

    Example of a good structure:
    - A container div centered on the page.
    - A large, bold headline.
    - The mission statement paragraph below it.
    - A subtle footer with the current year.

    Now, generate the complete 'index.html' file based on the user's mission.
  `;

  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
    });
    
    let htmlContent = response.text || '';
    
    // Clean up the response to ensure it's just HTML
    if (htmlContent.startsWith('```html')) {
        htmlContent = htmlContent.substring(7);
    }
    if (htmlContent.endsWith('```')) {
        htmlContent = htmlContent.slice(0, -3);
    }

    return htmlContent.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
};
