import { LetterInfo } from "./LetterInfo.model";

export class Word {

    private lettersInfo: LetterInfo[] = [];
     actual: boolean = false;

    constructor(private word: string) {
        this.buildLetterInfo();
    }

    get letters(): string[] {
        return this.word.toLocaleLowerCase().trim().split("");
    }

    get length(): number {
        return this.letters.length;
    }

    getExpectedLength(): number {
        return this.length || -1;
    }

    getLettersInfo(): LetterInfo[] {
        return this.lettersInfo;
    }

    setActual(actual: boolean) {
        this.actual = actual;
    }

    isActual() {
        return this.actual;
    }

    setLettersInfo(lettersInfo: LetterInfo[]) {
        lettersInfo = lettersInfo;
    }

    getWord() {
        return this.letters.join('');
    }

    getCharPositions(targetChar: string): number[] {
        let positions: number[] = [];
        this.letters.forEach((char, i) => char === targetChar && positions.push(i));

        return positions;
    }

    private buildLetterInfo() {
        this.lettersInfo = [];

        if (this.word.length > 0) {
            this.letters.map((letter, i) => {
                this.lettersInfo.push(new LetterInfo(letter, i));
            });
        } 
        else if (this.getExpectedLength() > 0) {
            for (let i = 0; i < this.getExpectedLength(); i++) { 
                this.lettersInfo.push(new LetterInfo("", i));
            }
        }
    }
}
