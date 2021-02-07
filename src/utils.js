import {cardValues} from './constants/cards';

export function byCardValue(a, b) {
  if (cardValues[a] > cardValues[b]) {
    return 1;
  }
  if (cardValues[a] < cardValues[b]) {
    return -1;
  }
  return 0;
}

export function toOccurenceCount(acc, next) {
  return { ...acc, [next]: (acc[next] || 0) + 1 };
}

export function mergeObjects(obj1, obj2) {
  return { ...obj1, ...obj2 };
}
