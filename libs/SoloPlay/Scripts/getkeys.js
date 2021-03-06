/**
*	@filename	getkeys.js
*	@author		theBGuy
*	@desc		Run key bosses
*/

function getkeys() {
	Town.doChores();

	if (!me.findItems(sdk.items.quest.KeyofTerror) || me.findItems(sdk.items.quest.KeyofTerror).length < 3) {
		try {
			if (!isIncluded("SoloPlay/Scripts/countess.js")) {
				include("SoloPlay/Scripts/countess.js");
			}

			if (isIncluded("SoloPlay/Scripts/countess.js")) {
				this.countess();
			}
		} catch (countessError) {
			print("ÿc8Kolbot-SoloPlayÿc0: Countess failed");
		}
	}

	if (!me.findItems(sdk.items.quest.KeyofHate) || me.findItems(sdk.items.quest.KeyofHate).length < 3) {
		try {
			if (!isIncluded("SoloPlay/Scripts/summoner.js")) {
				include("SoloPlay/Scripts/summoner.js");
			}

			if (isIncluded("SoloPlay/Scripts/summoner.js")) {
				this.summoner();
			}
		} catch (summonerError) {
			print("ÿc8Kolbot-SoloPlayÿc0: Summoner failed");
		}
	}

	if (!me.findItems(sdk.items.quest.KeyofDestruction) || me.findItems(sdk.items.quest.KeyofDestruction).length < 3) {
		try {
			if (!isIncluded("SoloPlay/Scripts/nith.js")) {
				include("SoloPlay/Scripts/nith.js");
			}

			if (isIncluded("SoloPlay/Scripts/nith.js")) {
				this.nith();
			}
		} catch (nihlathakError) {
			print("ÿc8Kolbot-SoloPlayÿc0: Nihlathak failed");
		}
	}

	return true;
}
