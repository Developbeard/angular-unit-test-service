import { Calculator } from './calculator';

describe('Test for Calculator', () => {
    describe('Test for Multiply', () => {
        it('#Multiply should retrun ten', () => {
            //Arrange (Preparar)
            const calc = new Calculator();
            //Act (Actuar)
            const resp = calc.multiply(2, 5);
            //Assert (Impótesis)
            expect(resp).toBe(10);
        });
    
        it('#Multiply should retrun four', () => {
            //Arrange (Preparar)
            const calc = new Calculator();
            //Act (Actuar)
            const resp = calc.multiply(1, 4);
            //Assert (Impótesis)
            expect(resp).toEqual(4);
        });
    });

    describe('Test for Divide', () => {
        it('#Devide should retrun some numbers', () => {
            //Arrange (Preparar)
            const calc = new Calculator();
            //Assert (Impótesis)
            expect(calc.divide(24, 2)).toEqual(12);
            expect(calc.divide(5, 2)).toEqual(2.5);
        });
    
        it('#Devide for a zero', () => {
            //Arrange (Preparar)
            const calc = new Calculator();
            //Assert (Impótesis)
            expect(calc.divide(12, 0)).toBeNull();
            expect(calc.divide(123456789, 0)).toBeNull();
        });
    });
});

describe('Test Matches', () => {
    it('#toBeDefined', () => {
        const name = 'Alex';

        expect(name).toBeDefined();
    });

    it('#toBeUndefined', () => {
        let number;

        expect(number).toBeUndefined();
    });

    it('#toBeTruthy', () => {
        const a = 3;
        const b = 15;
        let resp;
        
        resp = 3 + 15;

        expect(resp === 18).toBeTruthy();
    });

    it('#toBeFalsy', () => {
        const a = 3;
        const b = 15;
        let resp;
        
        resp = 3 + 15;

        expect(resp === 33).toBeFalsy();
    });

    it('#toBeLessThan', () => {
        const a = 3;

        expect(a).toBeLessThan(10);
    });

    it('#toBeGreaterThan', () => {
        const a = 3;

        expect(a).toBeGreaterThan(1);
    });

    it('#toMatch string', () => {
        const a = 'Hola Mundo';

        expect(a).toMatch(/Mundo/);
    });

    it('#toMatch array', () => {
        const a = ['Shooter', 'Puzzle', 'MMO', 'RPG', 'Free World', 'Horror'];

        expect(a).toContain('MMO');
    });
});