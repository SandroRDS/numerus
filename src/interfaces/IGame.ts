export type AttemptReturn = {
    attemptedNumber: number;
    distanceLevel: number;
    positionToGo: 'top' | 'down' | '';
    remainingAttempts: number;
    isCorrect: boolean;
};

interface IGame {
    makeAttempt: (num: number) => AttemptReturn;
    getDrawnNumber: () => number;
}

export default IGame;
