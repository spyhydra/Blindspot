export interface MCQuestion {
    id: string;
    text: string;
    options: [string, string, string, string, string];
    /**
     * 0–3 are valid correct answers. Look out! 
     * 4 is ALWAYS "I don't know / Need to study this" and is NEVER the correct index.
     */
    correctIndex: number;
    topic: string;
}

export interface UserAnswer {
    questionId: string;
    selectedIndex: number;
    timeTakenMs: number;
}

export interface QuizSession {
    prompt: string;          // The raw user prompt used to generate this session
    questions: MCQuestion[];
    answers: UserAnswer[];   // Populated as the user takes the quiz
}
