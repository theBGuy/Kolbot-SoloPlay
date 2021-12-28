/**
*	@filename	TownChicken.js
*	@author		kolton, theBGuy (modified for Kolbot-SoloPlay)
*	@desc		handle town chicken
*/

js_strict(true);

include("json2.js");
include("NTItemParser.dbl");
include("OOG.js");
include("Gambling.js");
include("CraftingSystem.js");
include("common/Attack.js");
include("common/Cubing.js");
include("common/Config.js");
include("common/CollMap.js");
include("common/Loader.js");
include("common/misc.js");
include("common/util.js");
include("common/Pickit.js");
include("common/Pather.js");
include("common/Precast.js");
include("common/Prototypes.js");
include("common/Runewords.js");
include("common/Town.js");

if (!isIncluded("SoloPlay/Tools/Developer.js")) { include("SoloPlay/Tools/Developer.js"); }
if (!isIncluded("SoloPlay/Tools/Tracker.js")) { include("SoloPlay/Tools/Tracker.js"); }
if (!isIncluded("SoloPlay/Functions/globals.js")) { include("SoloPlay/Functions/globals.js"); }

function main() {
	let townCheck = false;
	print("ÿc8Kolbot-SoloPlayÿc0: Start TownChicken thread");

	// Init config and attacks
	D2Bot.init();
	SetUp.include();
	Config.init();
	Pickit.init();
	Attack.init();
	Storage.Init();
	CraftingSystem.buildLists();
	Runewords.init();
	Cubing.init();

	let useHowl = me.barbarian && me.getSkill(sdk.skills.Howl, 0);
	let useTerror = me.necromancer && me.getSkill(sdk.skills.Terror, 0);

	this.togglePause = function () {
		let scripts = ["default.dbj", "tools/antihostile.js"];

		for (let i = 0; i < scripts.length; i += 1) {
			let script = getScript(scripts[i]);

			if (script) {
				if (script.running) {
					if (scripts[i] === "default.dbj") {
						print("ÿc1Pausing.");
					}

					script.pause();
				} else {
					if (scripts[i] === "default.dbj") {
						// don't resume if dclone walked
						if (!Events.cloneWalked) {
							print("ÿc2Resuming.");
							script.resume();
						}
					} else {
						script.resume();
					}
				}
			}
		}

		return true;
	};

	this.getNearestMonster = function () {
		let gid, distance,
			monster = getUnit(1),
			range = 30;

		if (monster) {
			do {
				if (monster.hp > 0 && Attack.checkMonster(monster) && !monster.getParent()) {
					distance = getDistance(me, monster);

					if (distance < range) {
						range = distance;
						gid = monster.gid;
					}
				}
			} while (monster.getNext());
		}

		if (gid) {
			monster = getUnit(1, -1, -1, gid);
		} else {
			monster = false;
		}

		if (monster) {
			print("ÿc9TownChickenÿc0 :: Closest monster to me: " + monster.name + " | Monster classid: " + monster.classid);
			return monster.classid;
		}

		return -1;
	};

	addEventListener("scriptmsg",
		function (msg) {
			if (msg === "townCheck") {
				switch (me.area) {
				case sdk.areas.ArreatSummit:
					print("Don't tp from Arreat Summit.");

					break;
				case sdk.areas.UberTristram:
					print("Can't tp from uber trist.");

					break;
				default:
					print("townCheck message recieved. First check passed.");
					townCheck = true;

					break;
				}
			}

			// Added from Autosorc/Sorc.js
			if (msg && typeof msg === "string" && msg !== "" && msg.substring(0, 8) === "config--") {
				Config = JSON.parse(msg.split("config--")[1]);
			}
		});

	while (true) {
		if (Town.canTpToTown() && (townCheck ||
			(Config.TownHP > 0 && me.hp < Math.floor(me.hpmax * Config.TownHP / 100)) ||
			(Config.TownMP > 0 && me.mp < Math.floor(me.mpmax * Config.TownMP / 100)))) {
			this.togglePause();

			while (!me.gameReady) {
				if (me.dead) { return false; }
				delay(100);
			}

			if (me.dead) { return false; }

			try {
				me.overhead("Going to town");
				print("Going to town");
				Attack.stopClear = true;
				Events.townChicken = true;
				
				if (useHowl || useTerror) {
					if ([156, 211, 242, 243, 544, 571, 345].indexOf(this.getNearestMonster()) === -1) {
						if (useHowl && Skill.getManaCost(130) < me.mp) {
							Skill.cast(130, 0);
						}

						if (useTerror && Skill.getManaCost(77) < me.mp) {
							Skill.cast(77, 0, Attack.getNearestMonster(true));
						}
					}
				}
				
				Town.visitTown();
			} catch (e) {
				Misc.errorReport(e, "TownChicken.js");
				scriptBroadcast("quit");

				return false;
			} finally {
				this.togglePause();

				Attack.stopClear = false;
				Events.townChicken = false;
				townCheck = false;
			}
		}

		delay(50);
	}
}
