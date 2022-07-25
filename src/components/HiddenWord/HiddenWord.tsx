import React, { createRef, ReactElement, RefObject, useRef, useState } from 'react'
import { AnswerEvaluator } from '../../models/AnswerEvaluator/AnswerEvaluator';
import { LetterInfo } from '../../models/Word/LetterInfo.model';
import { Word } from '../../models/Word/Word.model';
import { HiddenLetter } from '../HiddenLetter/HiddenLetter';
import './HiddenWord.css'

interface HiddenWordProps {
  word: Word,
  currentAttempt: number;
  toNextAttempt: ((answeredWord: Word) => Word)
}

const HiddenWord = ({ word, toNextAttempt, currentAttempt }: HiddenWordProps) => {

}

export default HiddenWord;