import IGame, { AttemptReturn } from "../interfaces/IGame";

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
    private isFinished: boolean = false;
    private possibilitiesSize: number;
    // private tips: String[];

    constructor(minLimit: number, maxLimit: number, numberAttempts: number, injectedNumber?: number) {
        if (minLimit > maxLimit) throw new RangeError('Valor do limite mínimo maior do que o limite máximo.');
        this.drawnNumber = injectedNumber ?? this.drawNumber(minLimit, maxLimit);
        this.attempts = numberAttempts;
        this.possibilitiesSize = maxLimit - minLimit + 1;
    }

    private drawNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    private calculateDistanceLevel(num: number) {
        const distanceToDrawnNumber = Math.abs(this.drawnNumber - num);
        const getPSPercent = (percent: number) => (percent / 100) * this.possibilitiesSize;

        if (distanceToDrawnNumber <= getPSPercent(1)) return 1;
        if (distanceToDrawnNumber <= getPSPercent(5)) return 2;
        if (distanceToDrawnNumber <= getPSPercent(10)) return 3;
        if (distanceToDrawnNumber <= getPSPercent(20)) return 4;
        if (distanceToDrawnNumber <= getPSPercent(40)) return 5;
        return 6;
    }

    private getPositionFromDrawnNumber(num: number) {
        return this.drawnNumber > num ? 'top' : this.drawnNumber < num ? 'down' : '';
    }

    makeAttempt(num: number): AttemptReturn {
        if (this.isFinished) {
            if (!this.attempts) throw new Error('O número de tentativas se esgotou.');
            else throw new Error('O número sorteado já foi encontrado.');
        }

        this.attempts -= 1
        const result = this.drawnNumber === num;
        if (this.attempts <= 0 || result) this.isFinished = true;

        return {
            attemptedNumber: num,
            distanceLevel: this.calculateDistanceLevel(num),
            isCorrect: result,
            remainingAttempts: this.attempts,
            positionToGo: this.getPositionFromDrawnNumber(num),
        };
    }

    getDrawnNumber() {
        return this.drawnNumber;
    }
}

export default Game;
