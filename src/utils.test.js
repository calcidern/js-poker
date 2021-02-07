import { byCardValue, toOccurenceCount } from "./utils";

describe('utils', () => {

  describe('sort byCardValue()', () => {

    it(`should put higher cart at the end`, () => {
      const cards = ['3', '2'];

      expect(cards.sort(byCardValue)).toEqual(['2', '3']);
    });

    it(`should put Ace higher than any other card`, () => {
      const cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];

      expect(cards.sort(byCardValue)).toEqual(['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']);
    });

    it(`should put 2 lover than any other card`, () => {
      const cards = [ '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K','A', '2'];

      expect(cards.sort(byCardValue)).toEqual(['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']);
    });

  });

  describe('reduce toOccurenceCount()', ()=>{
    it('should count card occurence', ()=>{
      const cards = ['A', '2', '2', '3', '3', '3', '4', '4', '4', '4'];

      expect(cards.reduce(toOccurenceCount,{})).toEqual({
        A: 1,
        2: 2,
        3: 3,
        4: 4,
      })
    });

    it('should count suit occurence', ()=>{
      const cards = ['H', 'S', 'S', 'C', 'C', 'C'];

      expect(cards.reduce(toOccurenceCount,{})).toEqual({
        H: 1,
        S: 2,
        C: 3,
      })
    });
  });

});
