import Game from '../../src/code/Game';
import { vi } from 'vitest';

import { AttemptReturn } from '../../src/interfaces/IGame';

//minLimit, maxLimit, numberOfAttemps
const gameInfos = [0, 100, 5];

describe('Testando correto funcionamento da classe Game, responsável por processar internamente a lógica do jogo e fornecer uma interface de interação com o usuário.', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('Ao instanciar um objeto Game, é possível acessar corretamente o valor do número sorteado através do método getDrawnNumber.', () => {
        const mockFloor = vi.spyOn(Math, 'floor');
        mockFloor.mockReturnValueOnce(0).mockReturnValueOnce(100);

        // @ts-ignore
        let game = new Game(...gameInfos);
        expect(game.getDrawnNumber()).toBe(0);

        // @ts-ignore
        game = new Game(...gameInfos);
        expect(game.getDrawnNumber()).toBe(100);
    });

    test('O número sorteado é aleatório e respeita os limites de máximo e mínimo informados por parâmetro.', () => {
        const numberOfTestLoops = 200;
        const listOfDrawnNumbers: number[] = [];

        for (let i = 1; i <= numberOfTestLoops; i += 1) {
            //@ts-ignore
            const game = new Game(...gameInfos);
            const drawnNumber = game.getDrawnNumber();

            expect(drawnNumber).toBeGreaterThanOrEqual(0);
            expect(drawnNumber).toBeLessThanOrEqual(100);
            listOfDrawnNumbers.push(drawnNumber);
        }

        const setOfDrawnNumbers = new Set(listOfDrawnNumbers);
        expect(setOfDrawnNumbers.size).toBeGreaterThanOrEqual(2);
    });

    describe('O método makeAttempt retorna corretamente um objeto de informações do tipo AttemptReturn:', () => {
        const returnSimulation = (
            attemptedNumber: number, distanceLevel: number, isCorrect: boolean, remainingAttempts: number
        ): AttemptReturn => ({
            attemptedNumber,
            distanceLevel,
            isCorrect,
            remainingAttempts,
        });

        test('Quando a tentativa estiver incorreta.', () => {
            const mockFloor = vi.spyOn(Math, 'floor');
            mockFloor.mockReturnValueOnce(100);

            //@ts-ignore
            const game = new Game(...gameInfos);

            expect(game.makeAttempt(0)).toEqual(returnSimulation(0, 6, false, 4));
            expect(game.makeAttempt(60)).toEqual(returnSimulation(60, 5, false, 3));
            expect(game.makeAttempt(80)).toEqual(returnSimulation(80, 4, false, 2));
            expect(game.makeAttempt(90)).toEqual(returnSimulation(90, 3, false, 1));
            expect(game.makeAttempt(95)).toEqual(returnSimulation(95, 2, false, 0));
        });

        test('Quando a tentativa estiver correta.', () => {
            const mockFloor = vi.spyOn(Math, 'floor');
            mockFloor.mockReturnValueOnce(50);

            //@ts-ignore
            const game = new Game(...gameInfos);
            expect(game.makeAttempt(50)).toEqual(returnSimulation(50, 1, true, 4));
        });
    });

    describe('O método makeAttempt lança um erro:', () => {
        test('Quando é solicitado fazer uma nova tentativa após o número de tentativas ter se esgotado.', () => {
            const mockFloor = vi.spyOn(Math, 'floor');
            mockFloor.mockReturnValueOnce(55);

            //@ts-ignore
            const game = new Game(...gameInfos);

            for (let i = 1; i <= 5; i += 1) game.makeAttempt(49);
            expect(() => game.makeAttempt(55)).toThrow(new Error('O número de tentativas se esgotou.'));
        });

        test('Quando é solicitado fazer uma nova tentativa após ter encontrado o número sorteado.', () => {
            const mockFloor = vi.spyOn(Math, 'floor');
            mockFloor.mockReturnValueOnce(55);

            //@ts-ignore
            const game = new Game(...gameInfos);

            game.makeAttempt(55);
            expect(() => game.makeAttempt(55)).toThrow(new Error('O número sorteado já foi encontrado.'));
        });
    });
});