import {
  highCardDetector,
  pairDetector, 
  threeOfAKindDetector, 
  fourOfAKindDetector, 
  straightDetector, 
  flushDetector,
  fullHouseDetector,
  straightFlushDetector
} from './handClassDetectors';
import { FLUSH, FOUR_OF_A_KIND, FULL_HOUSE, HIGH_CARD, PAIR, ROYAL_FLUSH, STRAIGHT, STRAIGHT_FLUSH, THREE_OF_A_KIND, TWO_PAIRS } from '../constants/handClasses';

describe('handClassDetectors', () => {

  describe('highCardDetector()', () => {
    it('should detect Ace as highest value card', () => {
      const valueOccurences = {
        2: 1,
        J: 1,
        A: 1,
        K: 1,
      };
      expect(highCardDetector(valueOccurences)).toEqual({ [HIGH_CARD]: 'A' });
    });

    it('should detect highest card regardless pairs present', () => {
      const valueOccurences = {
        2: 2,
        J: 2,
        K: 1,
      };
      expect(highCardDetector(valueOccurences)).toEqual({ [HIGH_CARD]: 'K' });
    });
  });

  describe('pairDetector()', () => {
    it('should detect no pairs when there are no duplicates', () => {
      const valueOccurences = {
        2: 1,
        J: 1,
        A: 1,
        K: 1,
        6: 1,
      };
      expect(pairDetector(valueOccurences)).toEqual({});
    });

    it('should detect no pairs when there is a tripple', () => {
      const valueOccurences = {
        2: 1,
        K: 3,
        A: 1,
      };
      expect(pairDetector(valueOccurences)).toEqual({});
    });

    it('should detect no pairs when there is a quadrupple', () => {
      const valueOccurences = {
        2: 4,
        A: 1,
      };
      expect(pairDetector(valueOccurences)).toEqual({});
    });

    it('should detect a single pair', () => {
      const valueOccurences = {
        2: 1,
        J: 2,
        K: 1,
        A: 1,
      };
      expect(pairDetector(valueOccurences)).toEqual({ [PAIR]: 'J' });
    });

    it('should detect two pairs', () => {
      const valueOccurences = {
        2: 2,
        J: 2,
        K: 1,
      };
      expect(pairDetector(valueOccurences)).toEqual({ [TWO_PAIRS]: '2J' });
    });

    it('should detect a single pair when there is a full house', () => {
      const valueOccurences = {
        2: 3,
        J: 2,
      };
      expect(pairDetector(valueOccurences)).toEqual({ [PAIR]: 'J' });
    });
  });

  describe('threeOfAKindDetector()', () => {
    it('should not detect a tripple when there is a pair', () => {
      const valueOccurences = {
        2: 1,
        J: 2,
        K: 1,
        A: 1,
      };
      expect(threeOfAKindDetector(valueOccurences)).toEqual({});
    });

    it('should not detect a tripple when there is a quadrupple', () => {
      const valueOccurences = {
        2: 4,
        A: 1,
      };
      expect(threeOfAKindDetector(valueOccurences)).toEqual({});
    });


    it('should detect a tripple', () => {
      const valueOccurences = {
        2: 1,
        K: 3,
        A: 1,
      };
      expect(threeOfAKindDetector(valueOccurences)).toEqual({ [THREE_OF_A_KIND]: 'K' });
    });
  });

  describe('fourOfAKindDetector()', () => {
    it('should not detect a quadrupples', () => {
      const valueOccurences = {
        2: 1,
        K: 3,
        A: 1,
      };
      expect(fourOfAKindDetector(valueOccurences)).toEqual({});
    });

    it('should detect a quadrupple', () => {
      const valueOccurences = {
        2: 4,
        A: 1,
      };
      expect(fourOfAKindDetector(valueOccurences)).toEqual({ [FOUR_OF_A_KIND]: '2' });
    });
  });

  describe('straightDetector()', () => {
    it('should not detect a straight', () => {
      const valueOccurences = {
        2: 1,
        K: 3,
        A: 1,
      };
      expect(straightDetector(valueOccurences)).toEqual({});
    });

    it('should detect a straight', () => {
      const valueOccurences = {
        6: 1,
        7: 1,
        8: 1,
        9: 1,
        T: 1
      };
      expect(straightDetector(valueOccurences)).toEqual({ [STRAIGHT]: '6789T' });
    });

    it('should detect a high straight', () => {
      const valueOccurences = {
        Q: 1,
        K: 1,
        A: 1,
        J: 1,
        T: 1
      };
      expect(straightDetector(valueOccurences)).toEqual({ [STRAIGHT]: 'TJQKA' });
    });

    it('should detect a low straight', () => {
      const valueOccurences = {
        2: 1,
        3: 1,
        A: 1,
        5: 1,
        4: 1
      };
      expect(straightDetector(valueOccurences)).toEqual({ [STRAIGHT]: 'A2345' });
    });
  });

  describe('flushDetector()', () => {
    it('should not detect a flush', () => {
      const suitOccurences = {
        H: 4,
        C: 1,
      };
      expect(flushDetector(null, suitOccurences)).toEqual({});
    });
    it('should detect a flush', () => {
      const suitOccurences = {
        C: 5
      };
      expect(flushDetector(null, suitOccurences)).toEqual({ [FLUSH]: 'C' });
    });
  });

  describe('fullHouseDetector()', () => {
    it('should not detect a full house when a tripple was not deteced', () => {
      const previousDetection = {
        [PAIR]: 'T',
      };
      expect(fullHouseDetector(previousDetection)).toEqual({});
    });
    it('should not detect a full house when a pair was not deteced', () => {
      const previousDetection = {
        [THREE_OF_A_KIND]: '4',
      };
      expect(fullHouseDetector(previousDetection)).toEqual({});
    });
    it('should detect a full house when both pair and a triple was detected', () => {
      const previousDetection = {
        [PAIR]: 'T',
        [THREE_OF_A_KIND]: '4',
      };
      expect(fullHouseDetector(previousDetection)).toEqual({ [FULL_HOUSE]: ['T', '4'] });
    });
  });

  describe('straightFlushDetector()', () => {
    it('should not detect a straight flush when a straight was not deteced', () => {
      const previousDetection = {
        [FLUSH]: 'C',
      };
      expect(straightFlushDetector(previousDetection)).toEqual({});
    });
    it('should not detect a straight flush when a flush was not deteced', () => {
      const previousDetection = {
        [STRAIGHT]: '34567',
      };
      expect(straightFlushDetector(previousDetection)).toEqual({});
    });
    it('should detect a straight flush when both straight and a flush was detected', () => {
      const previousDetection = {
        [FLUSH]: 'C',
        [STRAIGHT]: '34567',
      };
      expect(straightFlushDetector(previousDetection)).toEqual({ [STRAIGHT_FLUSH]: '34567' });
    });
    it('should detect a royal flush when a flush and high straight was detected', () => {
      const previousDetection = {
        [FLUSH]: 'C',
        [STRAIGHT]: 'TJQKA',
      };
      expect(straightFlushDetector(previousDetection)).toEqual({ [ROYAL_FLUSH]: 'TJQKA' });
    });
  });
});