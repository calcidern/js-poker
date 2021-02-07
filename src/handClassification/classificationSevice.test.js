import { classify } from "./classificationService";
import { FLUSH, FOUR_OF_A_KIND, FULL_HOUSE, HIGH_CARD, PAIR, ROYAL_FLUSH, STRAIGHT, STRAIGHT_FLUSH, THREE_OF_A_KIND, TWO_PAIRS } from "../constants/handClasses";

describe('classificationService', () => {

  describe('classify()', () => {
    it('should detect high card class', () => {
      const hand = '4C 3S JH TD 7H';
      const result = classify(hand);

      expect(result.handClass).toEqual(HIGH_CARD);
      expect(result.cards).toEqual('J');
    });

    it('should detect pair class', () => {
      const hand = '4C 3S TH TD 7H';
      const result = classify(hand);

      expect(result.handClass).toEqual(PAIR);
      expect(result.cards).toEqual('T');
    });

    it('should detect two pairs class', () => {
      const hand = '4C 3S TH TD 3H';
      const result = classify(hand);

      expect(result.handClass).toEqual(TWO_PAIRS);
      expect(result.cards).toEqual('3T');
    });

    it('should detect three of a kind class', () => {
      const hand = 'TC 4S TH TD 3H';
      const result = classify(hand);

      expect(result.handClass).toEqual(THREE_OF_A_KIND);
      expect(result.cards).toEqual('T');
    });
    
    it('should detect straight class', () => {
      const hand = '6C 5S 7H 4D 8H';
      const result = classify(hand);

      expect(result.handClass).toEqual(STRAIGHT);
      expect(result.cards).toEqual('45678');
    });

    it('should detect flush class', () => {
      const hand = '4H 3H JH TH 7H';
      const result = classify(hand);

      expect(result.handClass).toEqual(FLUSH);
      expect(result.cards).toEqual('H');
    });

    it('should detect full house class', () => {
      const hand = 'TC 3S TH TD 3H';
      const result = classify(hand);

      expect(result.handClass).toEqual(FULL_HOUSE);
      expect(result.cards).toEqual(['3', 'T']);
    });

    it('should detect four of a kind class', () => {
      const hand = 'TC TS TH TD 3H';
      const result = classify(hand);

      expect(result.handClass).toEqual(FOUR_OF_A_KIND);
      expect(result.cards).toEqual('T');
    });

    it('should detect straight flush class', () => {
      const hand = '6H 5H 7H 4H 8H';
      const result = classify(hand);

      expect(result.handClass).toEqual(STRAIGHT_FLUSH);
      expect(result.cards).toEqual('45678');
    });

    it('should detect royal flush class', () => {
      const hand = 'JH QH AH TH KH';
      const result = classify(hand);

      expect(result.handClass).toEqual(ROYAL_FLUSH);
      expect(result.cards).toEqual('TJQKA');
    });

  });
});