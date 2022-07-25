import React, { useEffect, useState } from 'react'
import { AcceptedWord } from '../../mocks/AllowedWord'
import { AnswerEvaluator } from '../../models/AnswerEvaluator/AnswerEvaluator'
import { AttemptInputCreator } from '../../models/AttemptInputCreator/AttemptInputCreator'
import { InstructionByPressedKey } from '../../models/PressedKeyValidator/PressedKeyStatement.enum'
import { IWallOfAttemptsProps } from '../../models/WallOfAttempts/WallOfAttempts.interface'
import { LetterInfo } from '../../models/Word/LetterInfo.model'
import { Word } from '../../models/Word/Word.model'
import { HiddenLetter } from '../HiddenLetter/HiddenLetter'

const WallOfAttempts = ({ word, attempts }: IWallOfAttemptsProps) => {

    const cr = new AttemptInputCreator(word, attempts);
    const view = cr.create();

    const [lettersInfo, setLettersInfo] = useState(view.lettersInfo);
    const [target] = useState(word);
    const [inputReferences] = useState<HTMLInputElement[]>([]);
    const [currentAttempt, setCurrentAttempt] = useState(0);
    const [finishedGame, setFinishedGame] = useState(false);

    useEffect(() => {!finishedGame && inputReferences[(currentAttempt * word.getExpectedLength())].focus()}, [currentAttempt]);

    const toNextAttempt = (answeredWord: Word) => {
        const acceptedWord = new AcceptedWord();

        if (!acceptedWord.isAccepted(answeredWord)) {
            alert('Esta palavra não é válida!');
            return;
        }
        
        const evaluator = new AnswerEvaluator(answeredWord, target);
        const answeredLettersInfo = evaluator.getUpdatedAnsweredWord().getLettersInfo();
        const next = currentAttempt + 1;

        lettersInfo[currentAttempt].map((letter, i) => Object.assign(letter, answeredLettersInfo[i]));
        
        if (evaluator.isCorrectAnswer()) {
            setFinishedGame(true);
            return;
        }
        
        setCurrentAttempt(next);
    }

    const setInitial = () => {
        lettersInfo[currentAttempt].forEach(letter => letter.active = true);
    }

    const setReference = (ref: HTMLInputElement) => {
        if (!!ref && inputReferences.length < (word.getExpectedLength() * attempts)) {
            inputReferences.push(ref);
        }
    }

    const defineWord = () => {
        const answeredWord = lettersInfo[currentAttempt].map(char => char.getCharacter()).join('');

        if (answeredWord.length == word.getExpectedLength()) {
            toNextAttempt(new Word(answeredWord));
        }
    }

    const setFocused = (letterInfo: LetterInfo, statement: InstructionByPressedKey[]) => {

        if (statement.includes(InstructionByPressedKey.NextLetter)) {
            inputReferences[letterInfo.getPosition() + 1].focus();
        }

        if (statement.includes(InstructionByPressedKey.PreviousLetter)) {
            inputReferences[letterInfo.getPosition() - 1].focus();
        }

        if (statement.includes(InstructionByPressedKey.ClearLetter)) {
            clearLetter(letterInfo, false)
        }

        if (statement.includes(InstructionByPressedKey.ClearPreviousLetter)) {
            clearLetter(letterInfo, true);
        }

        if (statement.includes(InstructionByPressedKey.Answer)) {
            defineWord();
        }
    } 

    const clearLetter = (letterInfo: LetterInfo, thisPosition: boolean) => {
        const word = lettersInfo[currentAttempt];
        const index = lettersInfo[currentAttempt].findIndex((l) => l.getPosition() === letterInfo.getPosition());

        word[index - (thisPosition ? 1 : 0)].setCharacter('');

        setLettersInfo(lettersInfo.map((currentWord, i) => i === currentAttempt ? word : currentWord));
    }

    setInitial();

    const line = lettersInfo.map((line, i) => (
        <div className={"word-block"}>
            {
                line.map((letter, j) =>
                    <HiddenLetter
                        key={(word.getExpectedLength() * i) + j}
                        letterInfo={letter}
                        setFocused={setFocused}
                        setReference={setReference}
                        defineWord={defineWord}
                    />
                )
            }
        </div>
    ));

    return (
        <>
            {line}
        </>
    );
}

export default WallOfAttempts;
