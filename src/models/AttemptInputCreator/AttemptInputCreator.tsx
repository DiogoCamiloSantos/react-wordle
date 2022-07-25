import { HiddenLetter } from "../../components/HiddenLetter/HiddenLetter";
import { LetterInfo } from "../Word/LetterInfo.model";
import { Word } from "../Word/Word.model";

export class AttemptInputCreator {
    constructor(private word: Word, private attemptLimit: number) {}

    create() {
        const av = new AttemptView();

        for (let i = 0; i < this.attemptLimit; i++) {
            const lettersInfo = [];

            for (let j = 0; j < this.word.getExpectedLength(); j++) {
                lettersInfo.push(new LetterInfo("", (this.word.getExpectedLength() * i) + j));
            }

            av.addLine(lettersInfo);
        }

        return av;
    }
}


class AttemptView {

    addLine(line: Array<LetterInfo>) {
        this.lettersInfo.push(line);
    }

    getView() {
 
    } 
    
    public lettersInfo: Array<Array<LetterInfo>> = [];
}