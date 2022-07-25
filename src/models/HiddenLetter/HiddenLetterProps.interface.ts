import { InstructionByPressedKey } from "../PressedKeyValidator/PressedKeyStatement.enum";
import { LetterInfo } from "../Word/LetterInfo.model";

export interface IHiddenLetterProps {
    position?: number;
    letterInfo: LetterInfo
    setFocused: ((letterInfo: LetterInfo, statement: InstructionByPressedKey[]) => void);
    setReference: Function;
    defineWord: Function;
}
