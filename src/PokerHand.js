import { compareHands } from "./handComparison";

export class PokerHand {

  constructor(hand){
    this.hand = hand;
  }

	compareWith(opponent) {
		return compareHands(this.hand, opponent.hand);
	}

}

export default PokerHand;
