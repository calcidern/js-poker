import { compareHands } from "./handComparison";
import { Result } from "./constants/result";

describe('handComparison', () => {
	describe('compareHands()', () => {

		it(`should tie when the same class and card value`, () => {
			const acePairHand1 = 'AC 4S 5S 8C AH';
			const acePairHand2 = '4S 5S 8C AS AD';

			expect(compareHands(acePairHand1, acePairHand2)).toBe(Result.TIE);
    });

    it(`should loose when the same class and lower card value`, () => {
			const kingPairHand = 'KC 4S 5S 8C KH';
			const acePairHand = '4S 5S 8C AS AD';

			expect(compareHands(kingPairHand, acePairHand)).toBe(Result.LOSS);
    });

    it(`should win when the same class and higher card value`, () => {
			const kingPairHand = 'KC 4S 5S 8C KH';
			const acePairHand = '4S 5S 8C AS AD';

			expect(compareHands(acePairHand, kingPairHand)).toBe(Result.WIN);
    });
    
    it(`should win when higher hand class`, () => {
			const kingTrippleHand = 'KC 4S KS 8C KH';
			const acePairHand = '4S 5S 8C AS AD';

			expect(compareHands(kingTrippleHand, acePairHand)).toBe(Result.WIN);
    });
    
    it(`should loose when lower hand class`, () => {
			const kingTrippleHand = 'KC 4S KS 8C KH';
			const acePairHand = '4S 5S 8C AS AD';

			expect(compareHands(acePairHand, kingTrippleHand)).toBe(Result.LOSS);
    });
    
    it(`should win when the second pair is higher`, () => {
			const aceKingPairs = 'AC AS KS KC 4H';
			const aceQueenPairs = 'AS AS QC QS 5D';

			expect(compareHands(aceKingPairs, aceQueenPairs)).toBe(Result.WIN);
		});



	});

});