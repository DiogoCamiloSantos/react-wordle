import { KeyboardEvent } from "react";
import { acceptedLetters } from "../AcceptedLetters/AcceptedLetters";
import { LetterInfo } from "../Word/LetterInfo.model";
import { NormalizeCharacterValidator } from "../Word/NormalizeCharValidator";
import { InstructionByPressedKey } from "./PressedKeyStatement.enum";

export class PressedKeyValidator {
    private accepted;
    private isTab;
    private isBackspace;
    private isEnter;
    private isLeftDirectionalKey;
    private isRightDirectionalKey;
    private actions: InstructionByPressedKey[] = [];
    private normalizeCharacterValidator: NormalizeCharacterValidator;

    constructor(event: KeyboardEvent<HTMLInputElement>, private currentLetterInfo: LetterInfo) {
        this.normalizeCharacterValidator = new NormalizeCharacterValidator(event.key);

        this.accepted = this.normalizeCharacterValidator.isValid();
        this.isTab = event.keyCode == 9 || event.keyCode == 11;
        this.isBackspace = event.keyCode == 8;
        this.isEnter = event.keyCode == 13;
        this.isLeftDirectionalKey = event.keyCode == 37
        this.isRightDirectionalKey = event.keyCode == 39;

        this.validateActions();
    }

    validateActions() {
        if (this.accepted || this.isTab) {
            this.actions.push(InstructionByPressedKey.NextLetter);
        }

        if (this.isLeftDirectionalKey) {
            this.actions.push(InstructionByPressedKey.PreviousLetter);
        }

        if (this.isRightDirectionalKey) {
            this.actions.push(InstructionByPressedKey.NextLetter);
        }

        if (this.accepted) {
            this.actions.push(InstructionByPressedKey.AcceptLetter);
        }

        if (this.isBackspace && !this.currentLetterInfo.getCharacter()) {
            this.actions.push(InstructionByPressedKey.PreviousLetter);
            this.actions.push(InstructionByPressedKey.ClearPreviousLetter);
        }

        if (this.isBackspace && !!this.currentLetterInfo.getCharacter()) {
            this.actions.push(InstructionByPressedKey.ClearLetter);
        }

        if (this.isEnter) {
            this.actions.push(InstructionByPressedKey.Answer);
        }

        if (this.actions.length == 0) {
            this.actions.push(InstructionByPressedKey.StopEvent);
        }
    }

    getActions() {
        return this.actions;
    }
}
