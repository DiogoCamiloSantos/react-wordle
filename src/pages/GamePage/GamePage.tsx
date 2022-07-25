import WallOfAttempts from '../../components/WallOfAttempts/WallOfAttempts';
import { AcceptedWord } from '../../mocks/AllowedWord';
import './GamePage.css';

const GamePage = () => {

    const targetWord = new AcceptedWord().getRandom();
    const attempts = 6;

    return (
        <div className='container'>
            <WallOfAttempts word={targetWord} attempts={attempts} />
        </div>
    )
}

export default GamePage;