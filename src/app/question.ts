export class Questions {
    name: string;
    introText: string;
    questions:[{
        questionId: number;
        question: string;
        questionType:'';
        answers:[{
            answer:string;
            answerId: number;
            isCorrect: boolean;
        }]
        userAnswer: null;
    }]

}
