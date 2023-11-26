import IGame from "../interfaces/IGame";

// Levels (Calculado a partir de quantos % a distância entre o número sorteado e o número da tentativa representam, levando em consideração o tamanho total da lista):
// <= 1% -> Lvl 1
// <= 5% -> Lvl 2
// <= 10% -> Lvl 3
// <= 20% -> Lvl 4
// <= 40% -> Lvl 5
// > 40% -> Lvl 6


class Game implements IGame {
    private drawnNumber: number;
    private attempts: number;
    // private tips: String[];

    constructor(minLimit: number, maxLimit: number, numberAttempts: number, injectedNumber?: number) {
        this.drawnNumber = injectedNumber ?? this.drawNumber(minLimit, maxLimit);
        this.attempts = numberAttempts;
    }

    private drawNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    makeAttempt (num: number) {
        const result = this.drawnNumber === num;
        if (!result) this.attempts -= 1;

        return {
            remainingAttempts: this.attempts,
            isCorrect: result,
        };
    }

    getDrawnNumber () {
        return this.drawnNumber;
    }
}

export default Game;
