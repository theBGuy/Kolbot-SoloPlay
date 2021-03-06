/*
*	@filename	hellforge.js
*	@author		isid0re, theBGuy
*	@desc		get the forge quest for rune drops for gear.
*/

function hellforge () {
	myPrint('starting hellforge');
	Town.townTasks();
	Town.buyPots(10, "Antidote", true);
	Town.buyPots(10, "Thawing", true);
	
	Pather.checkWP(sdk.areas.RiverofFlame, true) ? Pather.useWaypoint(sdk.areas.RiverofFlame) : Pather.getWP(sdk.areas.RiverofFlame);
	Precast.doPrecast(true);

	if (!Pather.moveToPreset(me.area, 2, 376)) {
		print("ÿc8Kolbot-SoloPlayÿc0: Failed to move to Hephasto");
	}

	try {
		Attack.clear(20, 0, getLocaleString(1067)); // Hephasto The Armorer
	} catch (err) {
		print('ÿc8Kolbot-SoloPlayÿc0: Failed to kill Hephasto');
	}

	Pickit.pickItems();
	let forge = getUnit(2, 376);
	!!forge && Attack.clearPos(forge.x, forge.y, 20);

	Town.doChores();
	Town.npcInteract("cain");

	let oldItem = me.getItemsEx().filter(function (item) {
		return item.isEquipped && item.bodylocation === 4 && !item.isOnSwap
	}).first();

	!!me.getItem(sdk.items.quest.HellForgeHammer) && Quest.equipItem(sdk.items.quest.HellForgeHammer, 4);
	
	Pather.usePortal(sdk.areas.RiverofFlame, me.name);

	if (!me.getItem(sdk.items.quest.HellForgeHammer)) {
		Pickit.pickItems();
		!!me.getItem(sdk.items.quest.HellForgeHammer) && Quest.equipItem(sdk.items.quest.HellForgeHammer, 4);
	}

	if (!Pather.moveToPreset(me.area, 2, 376)) {
		print('ÿc8Kolbot-SoloPlayÿc0: Failed to move to forge');
	}

	!!forge ? Attack.clearPos(forge.x, forge.y, 15) : Attack.clear(15);
	!forge && (forge = getUnit(2, 376));
	Misc.openChest(forge) && delay(250 + me.ping * 2);
	Quest.smashSomething(376) && delay(4500 + me.ping);
	!!oldItem && oldItem.isInInventory && oldItem.equip(4);
	Pickit.pickItems();
	Item.autoEquip();
	Town.npcInteract("cain");

	return true;
}
