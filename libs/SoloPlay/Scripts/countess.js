/*
*	@filename	countess.js
*	@author		isid0re, theBGuy
*	@desc		countess runs for rune based gear and Terror keys
*/

function countess () {
	let floors = [sdk.areas.ForgottenTower, sdk.areas.TowerCellarLvl1, sdk.areas.TowerCellarLvl2, sdk.areas.TowerCellarLvl3, sdk.areas.TowerCellarLvl4, sdk.areas.TowerCellarLvl5];
	Town.townTasks();
	print('ÿc8Kolbot-SoloPlayÿc0: starting countess');
	me.overhead("countess");

	Pather.checkWP(sdk.areas.BlackMarsh, true) ? Pather.useWaypoint(sdk.areas.BlackMarsh) : Pather.getWP(sdk.areas.BlackMarsh);
	Precast.doPrecast(true);

	try {
		if (me.charlvl < 15) {
			for (let i = 0; i < floors.length; i += 1) {
				Pather.moveToExit(floors[i], true);
				Attack.clear(0x7);
			}
		} else {
			Pather.moveToExit(floors, true);
		}

		Pather.moveToPreset(me.area, 2, 580);
		Attack.clear(20, 0, getLocaleString(2875));
	} catch (err) {
		print('ÿc8Kolbot-SoloPlayÿc0: Failed to kill Countess');
	}

	Pickit.pickItems();

	return true;
}
