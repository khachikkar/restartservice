interface PriceCheckResponse {
    question: string;
    answer: string;
    error?: string;
}

const translateArmenianTerms = (text: string): string => {
    return text
        .replace(/կգ/g, 'kg')
        .replace(/նոր/g, 'new')
        .replace(/քիչ օգտագործված/g, 'slightly used')
        .replace(/օգտագործված/g, 'used');
}

export const checkPrice = async (
    price: number,
    name: string,
    description: string,
): Promise<PriceCheckResponse> => {
    const HF_TOKEN = process.env.REACT_APP_HF_API_TOKEN;
    
    if (!HF_TOKEN) {
        console.error('Hugging Face API token not found in environment variables');
        return {
            question: '',
            answer: 'Sorry, there was a configuration error. Please try again later.',
            error: 'API token not configured'
        };
    }

    const translatedName = translateArmenianTerms(name);
    const translatedDescription = translateArmenianTerms(description);

    const staticPrompt = `Is ${price} AMD a good price for this ${translatedName} Washing Machine? answer short. 
The product details are:
- Name: ${translatedName}
- Description: ${translatedDescription}
- Price: ${price} AMD`;

    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/google/gemma-2-2b-it",
            {
                headers: {
                    Authorization: `Bearer ${HF_TOKEN}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ inputs: staticPrompt }),
            }
        );

        if (!response.ok) {
            const error = await response.json();
            console.error("API error:", error);
            return {
                question: staticPrompt,
                answer: "",
                error: "Failed to get response from AI"
            };
        }

        const result = await response.json();
        console.log('API Response:', result);

        if (!Array.isArray(result) || !result[0]?.generated_text) {
            console.error('Unexpected API response structure:', result);
            return {
                question: staticPrompt,
                answer: "Sorry, I couldn't analyze the price at this moment.",
                error: "Unexpected response format"
            };
        }

        const fullText = result[0].generated_text;
        const answer = fullText.includes(staticPrompt) 
            ? fullText.slice(staticPrompt.length).trim()
            : fullText.trim();

        return {
            question: staticPrompt,
            answer: answer || "Sorry, I couldn't analyze the price at this moment."
        };
    } catch (error) {
        console.error("Network or other error:", error);
        return {
            question: staticPrompt,
            answer: "Sorry, I couldn't analyze the price at this moment.",
            error: "Network error occurred"
        };
    }
}
