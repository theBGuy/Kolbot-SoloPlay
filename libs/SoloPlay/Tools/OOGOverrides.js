/*
*	@filename	OOGOverrides.js
*	@author		isid0re, theBGuy
*	@desc		OOG.js fixes to improve functionality
* 	@credits	kolton, D3STROY3R
*/

if (!isIncluded("OOG.js")) {
	include("OOG.js");
}

ControlAction.makeCharacter = function (info) {
	me.blockMouse = true;

	if (!info.charClass) {
		info.charClass = "barbarian";
	}

	let control,
		clickCoords = [];

	// cycle until in lobby
	while (getLocation() !== 1) {
		switch (getLocation()) {
		case 12: // character select
		case 23: // connecting
		case 42: // empty character select
			control = getControl(6, 33, 528, 168, 60);

			// Create Character greyed out
			if (control && control.disabled === 4) {
				me.blockMouse = false;

				return false;
			}

			this.click(6, 33, 528, 168, 60);

			break;
		case 25:
			D2Bot.restart(); // single player error on finding character

			break;
		case 29: // select character
			switch (info.charClass) {
			case "barbarian":
				clickCoords = [400, 280];

				break;
			case "amazon":
				clickCoords = [100, 280];

				break;
			case "necromancer":
				clickCoords = [300, 290];

				break;
			case "sorceress":
				clickCoords = [620, 270];

				break;
			case "assassin":
				clickCoords = [200, 280];

				break;
			case "druid":
				clickCoords = [700, 280];

				break;
			case "paladin":
				clickCoords = [521, 260];

				break;
			}

			// coords:
			// zon: 100, 280
			// barb: 400, 280
			// necro: 300, 290
			// sin: 200, 280
			// paladin: 521 260
			// sorc: 620, 270
			// druid: 700, 280

			getControl().click(clickCoords[0], clickCoords[1]);
			delay(500);

			break;
		case 15: // new character
			// hardcore char warning
			if (getControl(6, 421, 337, 96, 32)) {
				this.click(6, 421, 337, 96, 32);
			} else {
				this.setText(1, 318, 510, 157, 16, info.charName);

				if (!info.expansion) {
					switch (info.charClass) {
					case "druid":
					case "assassin":
						D2Bot.printToConsole("Error in profile name. Expansion characters cannot be made in classic", 9);
						D2Bot.stop();

						break;
					default:
						break;
					}

					this.click(6, 319, 540, 15, 16);
				}

				if (!info.ladder) {
					this.click(6, 319, 580, 15, 16);
				}

				if (info.hardcore) {
					this.click(6, 319, 560, 15, 16);
				}

				this.click(6, 627, 572, 128, 35);
			}

			break;
		case 30: // char name exists (text box 4, 268, 320, 264, 120)
			D2Bot.updateStatus("Character Name exists. Making new Name");
			D2Bot.printToConsole("Character Name exists. Making new Name");
			info.charName = NameGen();
			D2Bot.setProfile(null, null, info.charName, "Normal");
			delay(500);
			ControlAction.click(6, 351, 337, 96, 32);
			ControlAction.click(6, 33, 572, 128, 35);

			me.blockMouse = false;

			return false;
		default:
			break;
		}

		// Singleplayer loop break fix.
		if (me.ingame) {
			break;
		}

		delay(500);
	}

	me.blockMouse = false;

	return true;
};

ControlAction.findCharacter = function (info) {
	let control, text, tick,
		count = 0;

	tick = getTickCount();

	while (getLocation() !== 12) {
		if (getTickCount() - tick >= 5000) {
			break;
		}

		delay(25);
	}

	if (getLocation() === 23) {
		D2Bot.restart();
	}

	// start from beginning of the char list
	sendKey(0x24);

	while (getLocation() === 12 && count < 24) {
		control = getControl(4, 37, 178, 200, 92);

		if (control) {
			do {
				text = control.getText();

				if (text instanceof Array && typeof text[1] === "string") {
					count++;

					if (text[1].toLowerCase() === info.charName.toLowerCase()) {
						return true;
					}
				}
			} while (count < 24 && control.getNext());
		}

		// check for additional characters up to 24
		if (count === 8 || count === 16) {
			control = getControl(4, 237, 457, 72, 93);

			if (control) {
				me.blockMouse = true;

				control.click();
				sendKey(0x28);
				sendKey(0x28);
				sendKey(0x28);
				sendKey(0x28);

				me.blockMouse = false;
			}
		} else { // no further check necessary
			break;
		}
	}

	return false;
};

ControlAction.makeAccount = function (info) {
	me.blockMouse = true;

	let tick,
		realms = {
			"uswest": 0,
			"useast": 1,
			"asia": 2,
			"europe": 3
		};

	// cycle until in empty char screen
	while (getLocation() !== 42) {
		switch (getLocation()) {
		case 8: // main menu
			ControlAction.clickRealm(realms[info.realm]);
			this.click(6, 264, 366, 272, 35);

			break;
		case 9: // login screen
			this.click(6, 264, 572, 272, 35);

			break;
		case 10:
		case 11:
			return false;
		case 18: // splash
			this.click(2, 0, 599, 800, 600);

			break;
		case 21: // Main Menu - Connecting
			tick = getTickCount();

			while (getLocation() === 21) {
				if (getTickCount() - tick > 10000) {
					ControlAction.click(6, 330, 416, 128, 35);
				}

				delay(500);
			}

			break;
		case 29: // Char create
			this.click(6, 33, 572, 128, 35);

			break;
		case 30: // bnet disconnected
			info.account = "";
			info.password = "";
			D2Bot.setProfile(info.account, info.password);
			D2Bot.restart(true);

			break;
		case 31: // ToU
			this.click(6, 525, 513, 128, 35);

			break;
		case 32: // new account
			this.setText(1, 322, 342, 162, 19, info.account);
			this.setText(1, 322, 396, 162, 19, info.password);
			this.setText(1, 322, 450, 162, 19, info.password);
			this.click(6, 627, 572, 128, 35);

			break;
		case 33: // please read
			this.click(6, 525, 513, 128, 35);

			break;
		case 34: // e-mail
			if (getControl(6, 415, 412, 128, 35)) {
				this.click(6, 415, 412, 128, 35);
			} else {
				this.click(6, 265, 572, 272, 35);
			}

			break;
		default:
			break;
		}

		delay(100);
	}

	me.blockMouse = false;

	return true;
};

ControlAction.loginCharacter = function (info, startFromTop = true) {
	me.blockMouse = true;

	let control, text,
		count = 0;

	// start from beginning of the char list
	if (startFromTop) {
		sendKey(0x24);
	}

	MainLoop:
	// cycle until in lobby or in game
	while (getLocation() !== 1) {
		switch (getLocation()) {
		case 12: // character select
			control = getControl(4, 37, 178, 200, 92);

			if (control) {
				do {
					text = control.getText();

					if (text instanceof Array && typeof text[1] === "string") {
						count++;

						if (text[1].toLowerCase() === info.charName.toLowerCase()) {
							control.click();
							this.click(6, 627, 572, 128, 35);
							me.blockMouse = false;

							// select difficulty
							if (getLocation() !== 20) {
								return true;
							} else {
								try {
									login(info.profile);

									if (me.ingame) {
										return true;
									}
								} catch (err) {
									break MainLoop;
								}
							}
						}
					}
				} while (control.getNext());
			}

			// check for additional characters up to 24
			if (count === 8 || count === 16) {
				control = getControl(4, 237, 457, 72, 93);

				if (control) {
					control.click();
					sendKey(0x28);
					sendKey(0x28);
					sendKey(0x28);
					sendKey(0x28);
				}
			} else {
				// no further check necessary
				break MainLoop;
			}

			break;
		case 42: // empty character select
			this.click(6, 33, 572, 128, 35);

			break;
		case 14: // disconnected?
		case 30: // player not found?
			break MainLoop;
		default:
			break;
		}

		// Singleplayer loop break fix.
		if (me.ingame) {
			return true;
		}

		delay(100);
	}

	me.blockMouse = false;

	return false;
};
