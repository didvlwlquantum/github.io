
import { GoogleGenAI } from "@google/genai";
import { Decision } from '../types';

// This file should not be committed to a public repository with the API key.
// In a real-world scenario, the API key would be stored in a secure backend
// or as an environment variable on the server. For this example, it's assumed
// to be available in process.env.
// IMPORTANT: The user must provide their own API_KEY in the environment.
const apiKey = process.env.API_KEY;
if (!apiKey) {
    console.warn("API_KEY environment variable not set. AI features will not work.");
}
const ai = new GoogleGenAI({ apiKey });

const chapterContexts: Record<string, any> = {
    "Chapter_1_Resources": {
        situation: "The empire's primary energy source, wood (biological resources), is depleted due to war and a harsh winter.",
        keywords: ["생물자원 (Biological Resources)", "생물다양성 (Biodiversity)"],
        choices: {
            A: "Control: Nationalize all lumber, ban private heating, and implement rationing.",
            B: "Exploration: Organize an expedition to find the 'black stone' (coal) deep underground."
        }
    },
    "Chapter_2_Kinetic": {
        situation: "Coal has been discovered, but the mines are flooding. Meanwhile, a strange power is observed in a boiling kettle.",
        keywords: ["열에너지 (Heat Energy)", "상태변화 (State Change)"],
        choices: {
            A: "Essence of Power: Focus on making more, hotter steam, believing the steam itself holds a mystical power.",
            B: "Particle Motion: Understand that the power comes from agitated water particles and design a device to efficiently gather this kinetic energy."
        }
    },
    "Chapter_3_4_Mechanism": {
        situation: "The empire has harnessed steam power, but production and transportation speeds are still slow.",
        keywords: ["힘의작용 (Action of Force)", "기체의성질 (Property of Gas)"],
        choices: {
            A: "Automated Loom: Apply steam power through gears and belts to create a machine that weaves automatically.",
            B: "Steam-powered Carriage: Increase gas pressure to its limits to make the engine itself move on wheels."
        }
    },
    "Chapter_5_Celestial": {
        situation: "The empire's ships are getting lost at sea, as compasses only show North/South, not East/West (longitude).",
        keywords: ["지구의자전 (Earth's Rotation)", "태양계 (Solar System)"],
        choices: {
            A: "Naval Expansion: Build hundreds of bigger, faster ships, hoping some will reach their destination by chance.",
            B: "Astronomical Research: Study the predictable movement of celestial bodies to create a 'cosmic clock' for determining position."
        }
    }
};

export async function getAIFeedback(decision: Decision): Promise<string> {
    if (!apiKey) {
        return "AI 튜터 기능이 비활성화되었습니다. API 키가 설정되지 않았습니다.";
    }
    
    const context = chapterContexts[decision.chapterId];
    if (!context) {
        return "챕터 컨텍스트를 찾을 수 없어 피드백을 생성할 수 없습니다.";
    }

    const model = 'gemini-2.5-flash-preview-04-17';
    
    const prompt = `
        You are an expert tutor specializing in teaching scientific principles through a historical simulation.
        Your student is the "Decision Maker" for an empire facing a crisis.
        
        **Chapter Context:**
        - **Situation:** ${context.situation}
        - **Core Scientific Concepts (Keywords):** ${context.keywords.join(', ')}
        
        **Student's Decision:**
        - **Chosen Path:** ${decision.selectedChoice} - "${context.choices[decision.selectedChoice]}"
        - **Student's Reasoning (Logbook Entry):** "${decision.reasoningText}"

        **Your Task:**
        Analyze the student's reasoning and provide concise, encouraging, and insightful feedback in KOREAN.
        The feedback should be 2-3 sentences long.
        
        1.  **Analyze Understanding:** Did the student correctly use and connect the core scientific concepts (${context.keywords.join(' and ')}) in their reasoning? Did they just list the words, or did they explain the causal relationship?
        2.  **Evaluate Logic:** Is their justification for their chosen path scientifically and logically sound, based on the provided context?
        3.  **Generate Feedback:** Based on your analysis, write a short feedback message.
            -   **If the reasoning is strong:** Praise their logical thinking. Specifically mention how they correctly linked the concepts. (e.g., "훌륭한 통찰입니다! [생물자원]의 한계를 명확히 인식하고, 새로운 자원 탐사가 [생물다양성] 보존에 어떻게 기여하는지 정확히 연결하셨군요.")
            -   **If the reasoning is weak or flawed:** Gently guide them. Point out the logical gap or misunderstanding without being discouraging. (e.g., "흥미로운 접근이지만, 두 키워드를 어떻게 연결할 수 있을지 조금 더 생각해보면 어떨까요? 현재의 [생물자원] 문제와 [생물다양성]이 어떤 관계에 있는지 설명해주시면 더 완벽한 보고서가 될 것 같습니다.")

        The feedback should feel personal and constructive, like a real tutor offering guidance. Be concise and use a supportive tone.
        
        **Generated Feedback (Korean):**
    `;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching AI feedback:", error);
        return "AI 튜터와 연결하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
    }
}
