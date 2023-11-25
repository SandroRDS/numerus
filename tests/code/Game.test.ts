import Game from '../../src/code/Game';
import { vi } from 'vitest';

describe('Testando correto funcionamento da classe Game, responsável por processar internamente a lógica do jogo e fornecer uma interface de interação com o usuário.', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('Ao instanciar um objeto Game, é possível acessar corretamente o valor do número sorteado através do método getDrawnNumber.', () => {
        const minLimit = 0;
        const maxLimit = 100;
        const numberAttempts = 5;
        const mockFloor = vi.spyOn(Math, 'floor');
        mockFloor.mockReturnValueOnce(0).mockReturnValueOnce(100);

        let game = new Game(minLimit, maxLimit, numberAttempts);
        expect(game.getDrawnNumber()).toBe(0);

        game = new Game(minLimit, maxLimit, numberAttempts);
        expect(game.getDrawnNumber()).toBe(100);
    });

    test('O número sorteado é aleatório e respeita os limites de máximo e mínimo informados por parâmetro.', () => {
        const minLimit = 0;
        const maxLimit = 100;
        const numberAttempts = 5;
        const numberOfTestLoops = 200;
        const listOfDrawnNumbers: number[] = [];

        for (let i = 1; i <= numberOfTestLoops; i += 1) {
            const game = new Game(minLimit, maxLimit, numberAttempts);
            const drawnNumber = game.getDrawnNumber();

            expect(drawnNumber).toBeGreaterThanOrEqual(0);
            expect(drawnNumber).toBeLessThanOrEqual(100);
            listOfDrawnNumbers.push(drawnNumber);
        }

        const setOfDrawnNumbers = new Set(listOfDrawnNumbers);
        expect(setOfDrawnNumbers.size).toBeGreaterThanOrEqual(2);
    });
});