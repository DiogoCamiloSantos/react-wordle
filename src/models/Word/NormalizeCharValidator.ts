import { AcceptedCharacter, acceptedLetters } from "../AcceptedLetters/AcceptedLetters";

export class NormalizeCharacterValidator {

    constructor(
        private targetCharacter: string, 
        private characterToCompare?: string
    ) {
        this.targetCharacter = String(this.targetCharacter).toUpperCase();
        this.removeAccents();
    }


    private removeAccents(): void {
        this.targetCharacter = this.targetCharacter.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    isValid() {
        return acceptedLetters.includes(this.targetCharacter);
    }
}
