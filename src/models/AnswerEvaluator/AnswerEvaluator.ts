import { AcceptedWord } from "../../mocks/AllowedWord";
import { Word } from "../Word/Word.model";

export class AnswerEvaluator {

    constructor(private answeredWord: Word, private targetWord: Word) {
        this.evaluate();
    }

    private evaluate() {
        this.answeredWord.setLettersInfo(this.answeredWord.getLettersInfo().map(letterInfo => {
            letterInfo.active = false;

            if (this.targetWord.letters.includes(letterInfo.getCharacter())) {
                letterInfo.setResolvedColor(this.targetWord.getCharPositions(letterInfo.getCharacter())
                    .includes(letterInfo.getPosition()) ? 'correct' : 'partial')
            }
            else {
                letterInfo.setResolvedColor("nonexistent");
            }
            return letterInfo;
        }));
    }

    getUpdatedAnsweredWord() {
        return this.answeredWord;
    }

    isCorrectAnswer(): boolean {
        return this.answeredWord.getLettersInfo().every(letter => letter.getResolvedColor() == "correct");
    }
}