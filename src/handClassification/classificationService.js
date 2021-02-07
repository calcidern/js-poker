import { primaryDetectors, secondaryDetectors } from './handClassDetectors';
import { classValues } from '../constants/handClasses';
import { mergeObjects, toOccurenceCount } from '../utils';

function toHighestHandClass(current, next) {
  const [currentClass] = current;
  const [nextClass] = next;

  if (currentClass && classValues[currentClass] > classValues[nextClass]) {
    return current;
  }
  return next;
}

export function classify(hand) {
  const formattedHand = hand.toUpperCase().split(' ');

  const values = formattedHand.map(([value]) => value);
  const suits = formattedHand.map(([, suite]) => suite);

  const valueOccurences = values.reduce(toOccurenceCount, {});
  const suitOccurences = suits.reduce(toOccurenceCount, {});


  const primaryResuts = primaryDetectors
    .map(detect => detect(valueOccurences, suitOccurences))
    .reduce(mergeObjects, {});

  const secondaryResults = secondaryDetectors
    .map(detect => detect(primaryResuts))
    .reduce(mergeObjects, primaryResuts);

  const [ handClass, cards ] = Object.entries(secondaryResults).reduce(toHighestHandClass, []);


  return { handClass, cards };
}