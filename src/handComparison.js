import { classValues } from "./constants/handClasses";
import { cardValues } from "./constants/cards";
import { classify } from "./handClassification/classificationService";
import { Result } from "./constants/result";


// this function is used when hand classes are the same and it compares player hands
// by comparing card values e.g. 'TTT' vs 'KKK'
// it also covers the edgecase of players having very similar hands
// e.g. hand1: AAQQ, hand2: AAKK
function compareCards(playerCards, oponentCards){
  for (let i = 0; i < playerCards.length; i++) {
    const playerCard = playerCards[i];
    const oponentCard = oponentCards[i];
    if(cardValues[playerCard] > cardValues[oponentCard]){
      return Result.WIN
    }
    if(cardValues[playerCard] < cardValues[oponentCard]){
      return Result.LOSS;
    }
  }
  return Result.TIE;
}

export function compareHands(playerHand, opponentHand){
  const player = classify(playerHand);
  const opponent = classify(opponentHand);

  const playerClassValue = classValues[player.handClass];
  const opponentClassValue = classValues[opponent.handClass];

  const playerCards = player.cards.split('').reverse();
  const opponentCards = opponent.cards.split('').reverse();


  if(playerClassValue > opponentClassValue){
    return Result.WIN;
  }

  if(playerClassValue < opponentClassValue){
    return Result.LOSS;
  }

  return compareCards(playerCards, opponentCards);
  
}