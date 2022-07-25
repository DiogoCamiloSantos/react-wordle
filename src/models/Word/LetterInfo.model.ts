import { ResolvedColor } from "./ResolvedColor.type";

export class LetterInfo {

    public active: boolean = false;

    constructor(
        private character: string, 
        private positions: number, 
        private color?: ResolvedColor 
    ) {
        if (character.length > 1)
            throw new Error("is not a char");
    }

    getCharacter(): string {
        return this.character;
    }

    includePosition(position: number): void {
        this.positions = position;
    }

    getPosition(): number {
        return this.positions;
    }

    getResolvedColor(): ResolvedColor | undefined {
        return this.color;
    }

    isResolved(): boolean {
        return !!this.color;
    }

    setResolvedColor(color: ResolvedColor) {
        this.color = color;
    }

    setCharacter(character: string): void {
        this.character = character;
    }   
}
