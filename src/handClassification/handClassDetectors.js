import { FLUSH, FOUR_OF_A_KIND, FULL_HOUSE, HIGH_CARD, PAIR, ROYAL_FLUSH, STRAIGHT, STRAIGHT_FLUSH, THREE_OF_A_KIND, TWO_PAIRS } from "../constants/handClasses";
import { byCardValue } from "../utils";

const starightPattern = '23456789TJQKA';
const lowStraightPattern = '2345A';
const lowStraightValue = 'A2345';


export function highCardDetector(valueOccurences) {
  const [highCard] = Object.keys(valueOccurences).sort(byCardValue).reverse();
  return { [HIGH_CARD]: highCard }
}

export function pairDetector(valueOccurences) {
  const pairs = Object.entries(valueOccurences)
    .filter(([, count]) => count === 2)
    .map(([value]) => value)
    .sort(byCardValue)
    .join('');

  if (pairs.length == 2) {
    return { [TWO_PAIRS]: pairs }
  }
  if (pairs.length == 1) {
    return { [PAIR]: pairs[0] }
  }
  return {};
}

export function threeOfAKindDetector(valueOccurences) {
  const tripple = Object.entries(valueOccurences).find(([, count]) => count === 3);
  return tripple ? { [THREE_OF_A_KIND]: tripple[0] } : {};
}

export function fourOfAKindDetector(valueOccurences) {
  const quad = Object.entries(valueOccurences).find(([, count]) => count === 4);
  return quad ? { [FOUR_OF_A_KIND]: quad[0] } : {};
}

export function straightDetector(valueOccurences) {
  const sortedCards = Object.keys(valueOccurences).sort(byCardValue).join('');

  if (sortedCards === lowStraightPattern) {
    return { [STRAIGHT]: lowStraightValue };
  }

  if (sortedCards.length === 5 && starightPattern.includes(sortedCards)) {
    return { [STRAIGHT]: sortedCards };
  }
  return {};
}

export function flushDetector(_, suitOccurences) {
  const suit = Object.entries(suitOccurences).find(([, count]) => count === 5);

  return suit ? { [FLUSH]: suit[0] } : {};
}


export function fullHouseDetector(previousDetection) {
  const { [THREE_OF_A_KIND]: threeOfKind, [PAIR]: pair } = previousDetection;

  if (threeOfKind && pair) {
    return { [FULL_HOUSE]: [pair, threeOfKind] }
  }
  return {};

}


export function straightFlushDetector(previousDetection) {
  const { [STRAIGHT]: straight, [FLUSH]: flush } = previousDetection;

  if (flush && straight === 'TJQKA') {
    return { [ROYAL_FLUSH]: straight };
  }
  if (flush && straight) {
    return { [STRAIGHT_FLUSH]: straight };
  }
  return {};
}


export const primaryDetectors = [straightDetector, fourOfAKindDetector, threeOfAKindDetector, pairDetector, flushDetector, highCardDetector];
export const secondaryDetectors = [fullHouseDetector, straightFlushDetector];