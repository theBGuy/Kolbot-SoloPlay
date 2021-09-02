/*
*	@filename	Barbarian.SoloPlay.js
*	@author		theBGuy
*	@desc		Config Settings for SoloPlay Barbarian
*
*	FinalBuild choices
*		To select your finalbuild.
*		1. Go into the D2BS console manager.
*		2. Select the Bots profile
*		3. In the info tag box enter one of the following choices:
*			Whirlwind
*			Immortalwhirl
*			Frenzy
*			Uberconc
*           Singer
*		4. Save the profile and start
*/

function LoadConfig () {
	if (!isIncluded("common/Storage.js")) {
		include("common/Storage.js");
	}

	if (!isIncluded("common/Misc.js")) {
		include("common/Misc.js");
	}

	if (!isIncluded("NTItemParser.dbl")) {
		include("NTItemParser.dbl");
	}

	if (!isIncluded("SoloPlay/Functions/Globals.js")) {
		include("SoloPlay/Functions/Globals.js");
	}

	SetUp.include();

	/* Script */
	Scripts.UserAddon = false;
	Scripts.SoloPlay = true;

	/* General configuration. */
	Config.MinGameTime = 400;
	Config.MaxGameTime = 7200;
	Config.MiniShopBot = true;
	Config.PacketShopping = true;
	Config.TownCheck = me.findItem("tbk", 0, 3);
	Config.LogExperience = false;
	Config.PingQuit = [{Ping: 600, Duration: 10}];
	Config.Silence = true;
	Config.OpenChests = true;
	Config.LowGold = me.normal ? 25000 : me.nightmare ? 50000 : 100000;
	Config.PrimarySlot = 0;
	Config.PacketCasting = 1;
	Config.WaypointMenu = true;
	Config.Cubing = !me.classic ? me.getItem(549) : false;
	Config.MakeRunewords = !me.classic ? true : false;

	/* General logging. */
	Config.ItemInfo = false;
	Config.LogKeys = false;
	Config.LogOrgans = false;
	Config.LogMiddleRunes = true;
	Config.LogHighRunes = true;
	Config.ShowCubingInfo = true;

	/* Town configuration. */
	Config.HealHP = 99;
	Config.HealMP = 99;
	Config.HealStatus = true;
	Config.UseMerc = true;
	Config.MercWatch = true;
	Config.StashGold = me.charlvl * 100;
	Config.ClearInvOnStart = false;

	/* Chicken configuration. */
	Config.LifeChicken = me.playertype ? 45 : 10;
	Config.ManaChicken = 0;
	Config.MercChicken = 0;
	Config.TownHP = me.playertype ? 0 : Config.TownCheck ? 35 : 0;
	Config.TownMP = 0;

	/* Potions configuration. */
	Config.UseHP = me.playertype ? 90 : 75;
	Config.UseRejuvHP = me.playertype ? 65 : 40;
	Config.UseMP = me.playertype ? 75 : 45;
	Config.UseMercHP = 75;

	/* Belt configuration. */
	Config.BeltColumn = ["hp", "mp", "mp", "rv"];
	Config.MinColumn[0] = Config.BeltColumn[0] !== "rv" ? Math.max(1, Storage.BeltSize() - 1) : 0;
	Config.MinColumn[1] = Config.BeltColumn[1] !== "rv" ? Math.max(1, Storage.BeltSize() - 1) : 0;
	Config.MinColumn[2] = Config.BeltColumn[2] !== "rv" ? Math.max(1, Storage.BeltSize() - 1) : 0;
	Config.MinColumn[3] = Config.BeltColumn[3] !== "rv" ? Math.max(1, Storage.BeltSize() - 1) : 0;

	/* Inventory buffers and lock configuration. */
	Config.HPBuffer = 0;
	Config.MPBuffer = 0;
	Config.RejuvBuffer = 4;
	Config.Inventory[0] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	Config.Inventory[1] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	Config.Inventory[2] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	Config.Inventory[3] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

	/* Pickit configuration. */
	Config.PickRange = 40;
	Config.FastPick = false;
	Config.CainID.Enable = false;
	Config.FieldID = false;
	//	Config.PickitFiles.push("kolton.nip");
	//	Config.PickitFiles.push("LLD.nip");

	/* Gambling configuration. */
	Config.Gamble = true;
	Config.GambleGoldStart = 1250000;
	Config.GambleGoldStop = 750000;
	Config.GambleItems.push("Amulet");
	Config.GambleItems.push("Ring");

	/* AutoMule configuration. */
	Config.AutoMule.Trigger = [];
	Config.AutoMule.Force = [];
	Config.AutoMule.Exclude = [
		"[name] >= elrune && [name] <= lemrune",
		"[Name] == Mephisto'sSoulstone",
		"[Name] == HellForgeHammer",
		"[Name] == ScrollOfInifuss",
		"[Name] == KeyToTheCairnStones",
		"[name] == BookOfSkill",
		"[Name] == HoradricCube",
		"[Name] == ShaftOfTheHoradricStaff",
		"[Name] == TopOfTheHoradricStaff",
		"[Name] == HoradricStaff",
		"[Name] == ajadefigurine",
		"[Name] == TheGoldenBird",
		"[Name] == potionoflife",
		"[Name] == lamesen'stome",
		"[Name] == Khalim'sEye",
		"[Name] == Khalim'sHeart",
		"[Name] == Khalim'sBrain",
		"[Name] == Khalim'sFlail",
		"[Name] == Khalim'sWill",
		"[Name] == ScrollofResistance",
	];

	/* AutoEquip configuration. */
	Config.AutoEquip = true;

	var levelingTiers = [ // autoequip setup
		//weapon
		"me.charlvl < 12 && [Type] == Sword && ([Quality] >= Normal || [flag] == runeword) && [flag] != ethereal && [wsm] <= 20 # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
		"[Type] == Sword && ([Quality] >= Magic || [flag] == runeword) && [flag] != ethereal && [wsm] <= 10 # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
		"[Name] == PhaseBlade && [Quality] == Unique && [flag] == ethereal # [EnhancedDamage] >= 100 && [IAS] == 30 && [MagicDamageReduction] >= 7 # [tier] == tierscore(item)",
		//Helmet
		"([type] == helm || [type] == primalhelm) && ([Quality] >= Magic || [flag] == runeword) && [flag] != ethereal # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
		//belt
		"[type] == belt && [Quality] >= Magic && [flag] != ethereal # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
		//boots
		"[Type] == Boots && [Quality] >= Magic && [Flag] != Ethereal # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
		//armor
		"[type] == armor && ([Quality] >= Magic || [flag] == runeword) && [Flag] != Ethereal # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
		//gloves
		"[Type] == Gloves && [Quality] >= Magic && [flag] != ethereal # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
		//ammy
		"[Type] == Amulet && [Quality] >= Magic # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
		//rings
		"[Type] == Ring && [Quality] >= Magic # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
		//Charms
		"[name] == smallcharm && [quality] == magic # # [invoquantity] == 8 && [charmtier] == charmscore(item)",
		//Special Charms
		"[name] == smallcharm && [quality] == unique # [itemallskills] == 1 # [charmtier] == 100000",
		"[name] == largecharm && [quality] == unique # [itemaddclassskills] == 3 # [charmtier] == 100000",
		"[name] == grandcharm && [quality] == unique # [itemmagicbonus] >= 30 || [itemgoldbonus] >= 150 # [charmtier] == 100000",
		//merc
		"([type] == circlet || [type] == helm) && ([Quality] >= Magic || [flag] == runeword) # [itemchargedskill] >= 0 # [Merctier] == mercscore(item)",
		"[Type] == armor && ([Quality] >= Magic || [flag] == runeword) # [itemchargedskill] >= 0 # [Merctier] == mercscore(item)",
		"me.charlvl > 14 && ([Type] == Polearm || [Type] == Spear) && ([Quality] >= Magic || [flag] == runeword) # [itemchargedskill] >= 0 # [Merctier] == mercscore(item)",
	];
	NTIP.arrayLooping(levelingTiers);

	var imbueables = [
		"me.diff == 0 && [name] == avengerguard && [quality] >= normal && [quality] <= superior && [flag] != ethereal # [Sockets] == 0 # [MaxQuantity] == 1",
		"me.diff == 1 && [name] == slayerguard && [quality] >= normal && [quality] <= superior && [flag] != ethereal # [Sockets] == 0 # [MaxQuantity] == 1",
		"me.diff == 2 && [name] == carnagehelm && [quality] >= normal && [quality] <= superior && [flag] != ethereal # [Sockets] == 0 # [MaxQuantity] == 1",
	];

	if (!me.getQuest(3, 0)) {
		NTIP.arrayLooping(imbueables);
	}

	NTIP.arrayLooping(nipItems.Gems);

	if (SetUp.currentBuild !== SetUp.finalBuild) {
		NTIP.addLine("[name] == perfectskull # # [MaxQuantity] == 2");
	}

	/* FastMod configuration. */
	Config.FCR = 0;
	Config.FHR = 0;
	Config.FBR = 0;
	Config.IAS = 0;

	/* Attack configuration. */
	Config.AttackSkill = [-1, 0, 0, 0, 0];
	Config.LowManaSkill = me.getSkill(133, 1) >= 9 ? [133, 0] : [0, -1];
	Config.MaxAttackCount = 1000;
	Config.BossPriority = me.normal ? true : false;
	Config.ClearType = 0;
	Config.ClearPath = {
		Range: 30,
		Spectype: 0xF,
	};

	/* Monster skip configuration. */
	Config.SkipException = [];
	Config.SkipEnchant = [];
	Config.SkipAura = [];

	/* Shrine scan configuration. */

	if (Check.currentBuild().caster) {
		Config.ScanShrines = [15, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14];
	} else {
		Config.ScanShrines = [15, 1, 2, 3, 4, 5, 7, 12, 6, 8, 9, 10, 11, 13, 14];
	}

	/* AutoStat configuration. */
	Config.AutoStat.Enabled = true;
	Config.AutoStat.Save = 0;
	Config.AutoStat.BlockChance = 57;
	Config.AutoStat.UseBulk = true;
	Config.AutoStat.Build = SetUp.specPush("stats");

	/* AutoSkill configuration. */
	Config.AutoSkill.Enabled = true;
	Config.AutoSkill.Save = 0;
	Config.AutoSkill.Build = SetUp.specPush("skills");

	/* AutoBuild configuration. */
	Config.AutoBuild.Enabled = true;
	Config.AutoBuild.Verbose = false;
	Config.AutoBuild.DebugMode = false;
	Config.AutoBuild.Template = SetUp.getBuild();

	// Class specific config
	Config.FindItem = false; // Use Find Item skill on corpses after clearing.
	Config.FindItemSwitch = false; // Switch to non-primary slot when using Find Item skills

	/* LOD gear */
	if (!me.classic) {
		let finalGear = Check.finalBuild().finalGear;
		NTIP.arrayLooping(finalGear);
		NTIP.addLine("[name] >= vexrune && [name] <= zodrune");

		if (["Immortalwhirl", "Singer"].indexOf(SetUp.finalBuild) === -1) {
			if ((me.ladder || Developer.addLadderRW) && !Check.haveItem("sword", "runeword", "Grief")) {
				var Grief = [
					"me.diff == 2 && [Name] == EthRune # # [MaxQuantity] == 1",
					"me.diff == 2 && [Name] == TirRune # # [MaxQuantity] == 1",
					"[Name] == LoRune",
					"[Name] == MalRune",
					"me.diff == 2 && [Name] == RalRune # # [MaxQuantity] == 1",
					"[Name] == PhaseBlade && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 5 # [MaxQuantity] == 1",
				];
				NTIP.arrayLooping(Grief);

				if (!Check.haveBase("PhaseBlade", 5)) {
					NTIP.addLine("[Name] == PhaseBlade && [Quality] == Normal # [Sockets] == 0 # [MaxQuantity] == 1");
				}

				if (!me.getItem(637)) {		// Lo Rune
					Config.Recipes.push([Recipe.Rune, "Ist Rune"]); // Ist to Gul
					Config.Recipes.push([Recipe.Rune, "Gul Rune"]); // Gul to Vex
					Config.Recipes.push([Recipe.Rune, "Vex Rune"]); // Vex to Ohm
					Config.Recipes.push([Recipe.Rune, "Ohm Rune"]); // Ohm to Lo
				}

				Config.Recipes.push([Recipe.Socket.Weapon, "Phase Blade"]);
				Config.Runewords.push([Runeword.Grief, "Phase Blade"]);

				Config.KeepRunewords.push("[Type] == sword # [ias] >= 30");
			}

			if ((me.ladder || Developer.addLadderRW) && SetUp.finalBuild !== "Uberconc" && Check.haveItem("sword", "runeword", "Grief") && !Check.haveItem("armor", "runeword", "Fortitude")) { // Fortitude
				var Fortitude = [
					"[Name] == ElRune # # [MaxQuantity] == 1",
					"[Name] == SolRune # # [MaxQuantity] == 1",
					"[Name] == DolRune # # [MaxQuantity] == 1",
					"[Name] == LoRune",
				];
				NTIP.arrayLooping(Fortitude);

				if (me.getItem(637)) {
					if (!Check.haveBase("armor", 4)) {
						NTIP.addLine("([Name] == ArchonPlate || [Name] == DuskShroud || [Name] == WyrmHide) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 0 # [MaxQuantity] == 1");
					}

					NTIP.addLine("([Name] == ArchonPlate || [Name] == DuskShroud || [Name] == WyrmHide) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 4 # [MaxQuantity] == 1");
				} else {
					NTIP.addLine("([Name] == ArchonPlate || [Name] == DuskShroud || [Name] == WyrmHide) && [Flag] != Ethereal && [Quality] == Superior # [enhanceddefense] >= 10 && [Sockets] == 4 # [MaxQuantity] == 1");
				}

				if (!me.getItem(637)) {		// Lo Rune
					Config.Recipes.push([Recipe.Rune, "Ist Rune"]); // Ist to Gul
					Config.Recipes.push([Recipe.Rune, "Gul Rune"]); // Gul to Vex
					Config.Recipes.push([Recipe.Rune, "Vex Rune"]); // Vex to Ohm
					Config.Recipes.push([Recipe.Rune, "Ohm Rune"]); // Ohm to Lo
				}

				Config.Recipes.push([Recipe.Socket.Armor, "Archon Plate", Roll.NonEth]);
				Config.Recipes.push([Recipe.Socket.Armor, "Dusk Shroud", Roll.NonEth]);
				Config.Recipes.push([Recipe.Socket.Armor, "WyrmHide", Roll.NonEth]);

				Config.Runewords.push([Runeword.Fortitude, "Archon Plate"]);
				Config.Runewords.push([Runeword.Fortitude, "Dusk Shroud"]);
				Config.Runewords.push([Runeword.Fortitude, "WyrmHide"]);

				Config.KeepRunewords.push("[type] == armor # [enhanceddefense] >= 200 && [enhanceddamage] >= 300");
			}

			if ((me.ladder || Developer.addLadderRW) && Item.getEquippedItemMerc(4).prefixnum !== 20532) { //Doom
				var Doom = [
					"[Name] == HelRune # # [MaxQuantity] == 1",
					"[Name] == OhmRune",
					"[Name] == LoRune",
					"[Name] == UmRune",
					"[Name] == ChamRune",
				];
				NTIP.arrayLooping(Doom);

				if (me.getItem(641) && me.getItem(637) && me.getItem(636)) {	// Cham, Lo, and Ohm Rune
					if (!Check.haveBase("polearm", 5)) {
						NTIP.addLine("([Name] == thresher || [Name] == crypticaxe || [Name] == greatpoleaxe || [Name] == giantthresher) && [Flag] == Ethereal && [Quality] == Normal # [Sockets] == 0 # [MaxQuantity] == 1");
					}

					NTIP.addLine("([Name] == thresher || [Name] == crypticaxe || [Name] == greatpoleaxe || [Name] == giantthresher) && [Flag] == Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 5 # [MaxQuantity] == 1");
				} else {
					NTIP.addLine("([Name] == thresher || [Name] == crypticaxe || [Name] == greatpoleaxe || [Name] == giantthresher) && [Flag] == Ethereal && [Quality] == Superior # [enhanceddamage] >= 10 && [Sockets] == 5 # [MaxQuantity] == 1");
				}

				if (!me.getItem(641)) {		// Cham Rune
					Config.Recipes.push([Recipe.Rune, "Mal Rune"]); // Mal to Ist
					Config.Recipes.push([Recipe.Rune, "Ist Rune"]); // Ist to Gul
					Config.Recipes.push([Recipe.Rune, "Gul Rune"]); // Gul to Vex
					Config.Recipes.push([Recipe.Rune, "Vex Rune"]); // Vex to Ohm
					Config.Recipes.push([Recipe.Rune, "Ohm Rune"]); // Ohm to Lo

					if (Check.haveItem("sword", "runeword", "Grief") && Check.haveItem("armor", "runeword", "Fortitude")) {
						Config.Recipes.push([Recipe.Rune, "Lo Rune"]); // Lo to Sur
					}

					Config.Recipes.push([Recipe.Rune, "Sur Rune"]); // Sur to Ber
					Config.Recipes.push([Recipe.Rune, "Ber Rune"]); // Ber to Jah
					Config.Recipes.push([Recipe.Rune, "Jah Rune"]); // Jah to Cham
				}

				if (!me.getItem(637)) {		// Lo Rune
					Config.Recipes.push([Recipe.Rune, "Mal Rune"]); // Mal to Ist
					Config.Recipes.push([Recipe.Rune, "Ist Rune"]); // Ist to Gul
					Config.Recipes.push([Recipe.Rune, "Gul Rune"]); // Gul to Vex
					Config.Recipes.push([Recipe.Rune, "Vex Rune"]); // Vex to Ohm
					Config.Recipes.push([Recipe.Rune, "Ohm Rune"]); // Ohm to Lo
				}

				if (!me.getItem(636)) {		// Ohm Rune
					Config.Recipes.push([Recipe.Rune, "Mal Rune"]); // Mal to Ist
					Config.Recipes.push([Recipe.Rune, "Ist Rune"]); // Ist to Gul
					Config.Recipes.push([Recipe.Rune, "Gul Rune"]); // Gul to Vex
					Config.Recipes.push([Recipe.Rune, "Vex Rune"]); // Vex to Ohm
				}

				Config.Recipes.push([Recipe.Socket.Weapon, "Giant Thresher"]);
				Config.Recipes.push([Recipe.Socket.Weapon, "Great Poleaxe"]);
				Config.Recipes.push([Recipe.Socket.Weapon, "Cryptic Axe"]);
				Config.Recipes.push([Recipe.Socket.Weapon, "thresher"]);

				Config.Runewords.push([Runeword.Doom, "Giant Thresher"]);
				Config.Runewords.push([Runeword.Doom, "Great Poleaxe"]);
				Config.Runewords.push([Runeword.Doom, "Cryptic Axe"]);
				Config.Runewords.push([Runeword.Doom, "Thresher"]);

				Config.KeepRunewords.push("[type] == polearm # [holyfreezeaura] == 12");
			}
		}

		switch (SetUp.finalBuild) { // finalbuild autoequip setup
		case 'Uberconc':
			if (Check.haveItem("sword", "runeword", "Grief") && SetUp.finalBuild === "Uberconc") {
				NTIP.addLine("[Name] == monarch && [Quality] == unique && [flag] != ethereal  # [damageresist] >= 35 # [tier] == 100000"); //Stormshield
			}

			if (!Check.haveItem("armor", "runeword", "Chains of Honor")) { // CoH
				var CoH = [
					"[Name] == DolRune # # [MaxQuantity] == 1",
					"[Name] == UmRune",
					"[Name] == BerRune",
					"[Name] == IstRune",
				];
				NTIP.arrayLooping(CoH);

				if (!me.getItem(639)) {		// Ber Rune
					Config.Recipes.push([Recipe.Rune, "Mal Rune"]); // Mal to Ist
					Config.Recipes.push([Recipe.Rune, "Ist Rune"]); // Ist to Gul
					Config.Recipes.push([Recipe.Rune, "Gul Rune"]); // Gul to Vex
					Config.Recipes.push([Recipe.Rune, "Vex Rune"]); // Vex to Ohm
					Config.Recipes.push([Recipe.Rune, "Ohm Rune"]); // Ohm to Lo

					if (Check.haveItem("sword", "runeword", "Grief")) {
						Config.Recipes.push([Recipe.Rune, "Lo Rune"]); // Lo to Sur
					}

					Config.Recipes.push([Recipe.Rune, "Sur Rune"]); // Sur to Ber
				}

				if (!me.getItem(631)) {
					Config.Recipes.push([Recipe.Rune, "Lem Rune"]);
					Config.Recipes.push([Recipe.Rune, "Pul Rune"]);	// Pul -> Um
				}

				if (me.getItem(639)) {
					if (!Check.haveBase("armor", 4)) {
						NTIP.addLine("([Name] == ArchonPlate || [Name] == DuskShroud || [Name] == WyrmHide) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 0 # [MaxQuantity] == 1");
					}

					NTIP.addLine("([Name] == ArchonPlate || [Name] == DuskShroud || [Name] == WyrmHide) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 4 # [MaxQuantity] == 1");
				} else {
					NTIP.addLine("([Name] == ArchonPlate || [Name] == DuskShroud || [Name] == WyrmHide) && [Flag] != Ethereal && [Quality] == Superior # [enhanceddefense] >= 10 && [Sockets] == 4 # [MaxQuantity] == 1");
				}

				Config.Recipes.push([Recipe.Socket.Armor, "Archon Plate", Roll.NonEth]);
				Config.Recipes.push([Recipe.Socket.Armor, "Dusk Shroud", Roll.NonEth]);
				Config.Recipes.push([Recipe.Socket.Armor, "WyrmHide", Roll.NonEth]);

				Config.Runewords.push([Runeword.ChainsofHonor, "Archon Plate"]);
				Config.Runewords.push([Runeword.ChainsofHonor, "Dusk Shroud"]);
				Config.Runewords.push([Runeword.ChainsofHonor, "WyrmHide"]);

				Config.KeepRunewords.push("[type] == armor # [fireresist] == 65 && [hpregen] == 7");
			}

			break;
		case 'Frenzy':
			if (!Check.haveItem("sword", "runeword", "Breath of the Dying")) {
				var BoTD = [
					"[Name] == VexRune",
					"me.diff == 2 && [Name] == HelRune # # [MaxQuantity] == 1",
					"[Name] == ElRune # # [MaxQuantity] == 1",
					"[Name] == EldRune # # [MaxQuantity] == 1",
					"[Name] == ZodRune",
					"me.diff == 2 && [Name] == EthRune # # [MaxQuantity] == 1",
					"[Name] == colossusblade && [Flag] == Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 6 # [MaxQuantity] == 1",
				];
				NTIP.arrayLooping(BoTD);

				if (!Check.haveBase("colossusblade", 6) && me.getItem(642)) {	// Zod Rune
					NTIP.addLine("[Name] == colossusblade && [Flag] == Ethereal && [Quality] == Normal # [Sockets] == 0 # [MaxQuantity] == 1");
				}

				Config.Recipes.push([Recipe.Socket.Weapon, "Colossus Blade", Roll.Eth]);
				Config.Runewords.push([Runeword.BreathoftheDying, "Colossus Blade"]);

				Config.KeepRunewords.push("[Type] == sword # [ias] >= 60 && [enhanceddamage] >= 350");
			}

			break;
		case 'Singer':
			if (Item.getEquippedItem(5).prefixnum !== 20557 && Check.haveItem("armor", "runeword", "Enigma")) {
				var HotO = [
					"[Name] == ThulRune # # [MaxQuantity] == 1",
					"[Name] == PulRune",
					"[Name] == KoRune # # [MaxQuantity] == 1",
					"[Name] == VexRune",
				];
				NTIP.arrayLooping(HotO);

				if (me.getItem(635)) {
					NTIP.addLine("([Name] == Flail || [Name] == Knout) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 4 # [MaxQuantity] == 1");
				}

				if (!me.getItem(635)) {
					Config.Recipes.push([Recipe.Rune, "Um Rune"]);
					Config.Recipes.push([Recipe.Rune, "Mal Rune"]);
					Config.Recipes.push([Recipe.Rune, "Ist Rune"]);
					Config.Recipes.push([Recipe.Rune, "Gul Rune"]);
				}

				Config.Runewords.push([Runeword.HeartoftheOak, "Knout"]);
				Config.Runewords.push([Runeword.HeartoftheOak, "Flail"]);
				Config.KeepRunewords.push("[type] == mace # [itemallskills] == 3");
			}

			if (!Check.haveItem("armor", "runeword", "Enigma")) { // Enigma
				var Enigma = [
					"[Name] == JahRune",
					"me.diff == 2 && [Name] == IthRune # # [MaxQuantity] == 1",
					"[Name] == BerRune",
				];
				NTIP.arrayLooping(Enigma);

				if (!me.getItem(639)) {
					Config.Recipes.push([Recipe.Rune, "Sur Rune"]); // sur to ber
				}

				if (!me.getItem(640)) {
					Config.Recipes.push([Recipe.Rune, "Ber Rune"]); // ber to jah
				}

				if (me.getItem(639) && me.getItem(640)) {
					Config.Runewords.push([Runeword.Enigma, "Archon Plate", Roll.NonEth]);
					Config.Runewords.push([Runeword.Enigma, "Mage Plate", Roll.NonEth]);
					Config.Runewords.push([Runeword.Enigma, "DuskShroud", Roll.NonEth]);
					Config.Runewords.push([Runeword.Enigma, "WyrmHide", Roll.NonEth]);
					Config.Runewords.push([Runeword.Enigma, "ScarabHusk", Roll.NonEth]);

					NTIP.addLine("([Name] == ArchonPlate || [Name] == MagePlate || [Name] == ScarabHusk || [Name] == WyrmHide || [Name] == DuskShroud) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 3 # [MaxQuantity] == 1");
				} else {
					NTIP.addLine("([Name] == ArchonPlate || [Name] == MagePlate || [Name] == ScarabHusk || [Name] == WyrmHide || [Name] == DuskShroud) && [Flag] != Ethereal && [Quality] == Superior # [enhanceddefense] >= 10 && [Sockets] == 3 # [MaxQuantity] == 1");
				}

				Config.KeepRunewords.push("[type] == armor # [itemallskills] == 2");
			}

			break;
		case 'Immortalwhirl':
			if ((me.ladder || Developer.addLadderRW) && Item.getEquippedItemMerc(4).prefixnum !== 20566) { //infinity
				var Inf = [
					"[Name] == BerRune",
					"[Name] == MalRune",
					"[Name] == IstRune",
					"([Name] == thresher || [Name] == crypticaxe || [Name] == greatpoleaxe || [Name] == giantthresher) && [Flag] == Ethereal && [Quality] == Normal # [Sockets] == 0 # [MaxQuantity] == 1",
					"([Name] == thresher || [Name] == crypticaxe || [Name] == greatpoleaxe || [Name] == giantthresher) && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 4 # [MaxQuantity] == 1",
				];
				NTIP.arrayLooping(Inf);

				if (Item.getQuantityOwned(me.getItem(639) < 2)) {		// Ber Rune
					Config.Recipes.push([Recipe.Rune, "Mal Rune"]); // Mal to Ist
					Config.Recipes.push([Recipe.Rune, "Ist Rune"]); // Ist to Gul
					Config.Recipes.push([Recipe.Rune, "Gul Rune"]); // Gul to Vex
					Config.Recipes.push([Recipe.Rune, "Vex Rune"]); // Vex to Ohm
					Config.Recipes.push([Recipe.Rune, "Ohm Rune"]); // Ohm to Lo
					Config.Recipes.push([Recipe.Rune, "Lo Rune"]); // Lo to Sur
					Config.Recipes.push([Recipe.Rune, "Sur Rune"]); // Sur to Ber
				}

				Config.Recipes.push([Recipe.Socket.Weapon, "Giant Thresher"]);
				Config.Recipes.push([Recipe.Socket.Weapon, "Great Poleaxe"]);
				Config.Recipes.push([Recipe.Socket.Weapon, "Cryptic Axe"]);
				Config.Recipes.push([Recipe.Socket.Weapon, "thresher"]);

				Config.Runewords.push([Runeword.Infinity, "Giant Thresher"]);
				Config.Runewords.push([Runeword.Infinity, "Great Poleaxe"]);
				Config.Runewords.push([Runeword.Infinity, "Cryptic Axe"]);
				Config.Runewords.push([Runeword.Infinity, "Thresher"]);

				Config.KeepRunewords.push("[type] == polearm # [convictionaura] >= 13");
			}

			if (Check.haveItemAndNotSocketed("mace", "set", "Immortal King's Stone Crusher")) {
				NTIP.addLine("[Name] == ShaelRune # # [MaxQuantity] == 2");
			}

			break;
		case 'Whirlwind':
			break;
		default:
			break;
		}

		if (me.rawStrength >= 150 && me.rawDexterity >= 88) {
			Config.Recipes.push([Recipe.Unique.Weapon.ToElite, "Gladius", Roll.NonEth]); // Upgrade Bloodletter to Elite
		}

		if (me.rawStrength >= 25 && me.rawDexterity >= 136) {
			Config.Recipes.push([Recipe.Unique.Weapon.ToElite, "Dimensional Blade", Roll.Eth]); // Upgrade Ginther's Rift to Elite
		}

		if (!Check.haveItem("falcata", "unique", "Bloodletter")) {
			NTIP.addLine("[name] == PulRune # # [MaxQuantity] == 1");
			NTIP.addLine("[name] == perfectemerald # # [MaxQuantity] == 1");
			NTIP.addLine("[name] == Gladius && [quality] == unique && [flag] != ethereal # [enhanceddamage] >= 140 && [ias] >= 20 # [MaxQuantity] == 1");	// Bloodletter
			NTIP.addLine("[name] == falcata && [quality] == unique && [flag] != ethereal # [enhanceddamage] >= 140 && [ias] >= 20 # [MaxQuantity] == 1");	// upped Bloodletter
		}

		if (!Check.haveItem("DimensionalBlade", "unique", "Ginther's Rift")) {
			NTIP.addLine("[name] == PulRune # # [MaxQuantity] == 1");
			NTIP.addLine("[name] == perfectemerald # # [MaxQuantity] == 1");

			if (me.getItem(630)) { 	// Pul Rune
				NTIP.addLine("[Name] == DimensionalBlade && [Quality] == Unique && [flag] == ethereal # [EnhancedDamage] >= 100 && [IAS] == 30 && [MagicDamageReduction] >= 7 # [MaxQuantity] == 1");	// Eth Ginther's Rift
			}

			NTIP.addLine("[Name] == PhaseBlade && [Quality] == Unique && [flag] == ethereal # [EnhancedDamage] >= 100 && [IAS] == 30 && [MagicDamageReduction] >= 7 # [MaxQuantity] == 1");	// upped Ginther's Rift
		}

		let helm = Item.getEquippedItem(1);
		let body = Item.getEquippedItem(3);
		let wep1 = Item.getEquippedItem(4);
		let wep2 = Item.getEquippedItem(5);

		if (!helm.isRuneword && [4, 6].indexOf(helm.quality) > -1 && helm.sockets > 0 && !helm.socketed) {
			if (Item.getQuantityOwned(me.getItem(581) < 2)) {
				Config.Recipes.push([Recipe.Gem, "Flawless Ruby"]);
			}
		}

		if (!body.isRuneword && [4, 6].indexOf(body.quality) > -1 && body.sockets > 0 && !body.socketed) {
			if (Item.getQuantityOwned(me.getItem(581) < 2)) {
				Config.Recipes.push([Recipe.Gem, "Flawless Ruby"]);
			}
		}

		if (!wep1.isRuneword && [4, 6].indexOf(wep1.quality) > -1 && wep1.sockets > 0 && !wep1.socketed) {
			if (Item.getQuantityOwned(me.getItem(601) < 2)) {
				Config.Recipes.push([Recipe.Gem, "Flawless Skull"]);
			}
		}

		if (!wep2.isRuneword && [4, 6].indexOf(wep2.quality) > -1 && wep2.sockets > 0 && !wep2.socketed) {
			if (Item.getQuantityOwned(me.getItem(601) < 2)) {
				Config.Recipes.push([Recipe.Gem, "Flawless Skull"]);
			}
		}

		if (Item.getEquippedItem(5).tier < 1370) {	//Lawbringer - Amn/Lem/Ko
			var Lawbringer = [
				"[Name] == AmnRune # # [MaxQuantity] == 1",
				"[Name] == LemRune",
				"[Name] == KoRune",
			];
			NTIP.arrayLooping(Lawbringer);

			if (me.getItem(629) && me.getItem(627)) {		// Lem and Ko rune
				NTIP.addLine("[Type] == Sword && [flag] != ethereal && [Quality] >= Normal && [Quality] <= Superior && [wsm] <= 10 && [strreq] <= 150 # [Sockets] == 3");
				NTIP.addLine("([name] == Legend Sword || [name] == Highland Blade || [name] == Balrog Blade || [name] == Champion Sword || [name] == Colossus Sword) && [flag] != ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 3");
			} else {
				NTIP.addLine("([name] == Legend Sword || [name] == Highland Blade || [name] == Balrog Blade || [name] == Champion Sword || [name] == Colossus Sword) && [flag] != ethereal && [Quality] == Superior # [enhanceddamage] >= 5 && [Sockets] == 3");
			}

			Config.Runewords.push([Runeword.Lawbringer, "Dimensional Blade"]);
			Config.Runewords.push([Runeword.Lawbringer, "Battle Sword"]);
			Config.Runewords.push([Runeword.Lawbringer, "Rune Sword"]);
			Config.Runewords.push([Runeword.Lawbringer, "Conquest Sword"]);
			Config.Runewords.push([Runeword.Lawbringer, "Cryptic Sword"]);
			Config.Runewords.push([Runeword.Lawbringer, "Phase Blade"]);
			Config.Runewords.push([Runeword.Lawbringer, "Espandon"]);
			Config.Runewords.push([Runeword.Lawbringer, "Tusk Sword"]);
			Config.Runewords.push([Runeword.Lawbringer, "Zweihander"]);
			Config.Runewords.push([Runeword.Lawbringer, "Legend Sword"]);
			Config.Runewords.push([Runeword.Lawbringer, "Highland Blade"]);
			Config.Runewords.push([Runeword.Lawbringer, "Balrog Blade"]);
			Config.Runewords.push([Runeword.Lawbringer, "Champion Sword"]);
			Config.Runewords.push([Runeword.Lawbringer, "Colossus Sword"]);

			Config.KeepRunewords.push("[type] == sword # [sanctuaryaura] >= 16");
		}

		if (Item.getEquippedItem(4).tier > 1100 && Item.getEquippedItem(5).tier < 1270 && !Check.haveItem("ring", "unique", "Raven Frost")) {	//Voice Of Reason - Lem/Ko/El/Eld
			var VoiceofReason = [
				"[Name] == LemRune",
				"[Name] == KoRune",
				"[Name] == ElRune # # [MaxQuantity] == 1",
				"[Name] == EldRune # # [MaxQuantity] == 1",
			];
			NTIP.arrayLooping(VoiceofReason);

			if (me.getItem(629) && me.getItem(627)) {		// Lem and Ko rune
				NTIP.addLine("[Type] == Sword && [flag] != ethereal && [Quality] >= Normal && [Quality] <= Superior && [wsm] <= 10 && [strreq] <= 150 # [Sockets] == 4")
				NTIP.addLine("([name] == Legend Sword || [name] == Highland Blade || [name] == Balrog Blade || [name] == Champion Sword || [name] == Colossus Sword) && [flag] != ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 4");
			} else {
				NTIP.addLine("([name] == Legend Sword || [name] == Highland Blade || [name] == Balrog Blade || [name] == Champion Sword || [name] == Colossus Sword) && [flag] != ethereal && [Quality] == Superior # [enhanceddamage] >= 5 && [Sockets] == 4");
			}

			Config.Runewords.push([Runeword.VoiceofReason, "Dimensional Blade"]);
			Config.Runewords.push([Runeword.VoiceofReason, "Battle Sword"]);
			Config.Runewords.push([Runeword.VoiceofReason, "Rune Sword"]);
			Config.Runewords.push([Runeword.VoiceofReason, "Conquest Sword"]);
			Config.Runewords.push([Runeword.VoiceofReason, "Cryptic Sword"]);
			Config.Runewords.push([Runeword.VoiceofReason, "Phase Blade"]);
			Config.Runewords.push([Runeword.VoiceofReason, "Tusk Sword"]);
			Config.Runewords.push([Runeword.VoiceofReason, "Zweihander"]);
			Config.Runewords.push([Runeword.VoiceofReason, "Highland Blade"]);
			Config.Runewords.push([Runeword.VoiceofReason, "Balrog Blade"]);
			Config.Runewords.push([Runeword.VoiceofReason, "Champion Sword"]);
			Config.Runewords.push([Runeword.VoiceofReason, "Colossus Sword"]);

			Config.KeepRunewords.push("[type] == sword # [passivecoldpierce] >= 24");
		}

		if (Item.getEquippedItem(5).tier < 1100) {	//Crescent Moon - Shael/Um/Tir
			var Crescent = [
				"[Name] == ShaelRune # # [MaxQuantity] == 2",
				"[Name] == UmRune",
				"[Name] == TirRune # # [MaxQuantity] == 1",
			];
			NTIP.arrayLooping(Crescent);

			if (!me.getItem(631)) {		// Um Rune
				Config.Recipes.push([Recipe.Rune, "Pul Rune"]); // Pul to Um
			}

			if (me.getItem(622) && me.getItem(631)) {		// Shael and Um rune
				NTIP.addLine("[Type] == Sword && [flag] != ethereal && [Quality] >= Normal && [Quality] <= Superior && [wsm] <= 10 && [strreq] <= 150 # [Sockets] == 3");
				NTIP.addLine("([name] == Legend Sword || [name] == Highland Blade || [name] == Balrog Blade || [name] == Champion Sword || [name] == Colossus Sword) && [flag] != ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 3");
			} else {
				NTIP.addLine("([name] == Legend Sword || [name] == Highland Blade || [name] == Balrog Blade || [name] == Champion Sword || [name] == Colossus Sword) && [flag] != ethereal && [Quality] == Superior # [enhanceddamage] >= 5 && [Sockets] == 3");
			}

			Config.Runewords.push([Runeword.CrescentMoon, "Dimensional Blade"]);
			Config.Runewords.push([Runeword.CrescentMoon, "Battle Sword"]);
			Config.Runewords.push([Runeword.CrescentMoon, "Rune Sword"]);
			Config.Runewords.push([Runeword.CrescentMoon, "Conquest Sword"]);
			Config.Runewords.push([Runeword.CrescentMoon, "Cryptic Sword"]);
			Config.Runewords.push([Runeword.CrescentMoon, "Phase Blade"]);
			Config.Runewords.push([Runeword.CrescentMoon, "Espandon"]);
			Config.Runewords.push([Runeword.CrescentMoon, "Tusk Sword"]);
			Config.Runewords.push([Runeword.CrescentMoon, "Zweihander"]);
			Config.Runewords.push([Runeword.CrescentMoon, "Legend Sword"]);
			Config.Runewords.push([Runeword.CrescentMoon, "Highland Blade"]);
			Config.Runewords.push([Runeword.CrescentMoon, "Balrog Blade"]);
			Config.Runewords.push([Runeword.CrescentMoon, "Champion Sword"]);
			Config.Runewords.push([Runeword.CrescentMoon, "Colossus Sword"]);

			Config.KeepRunewords.push("[Type] == sword # [ias] >= 20 && [passiveltngpierce] >= 35");
		}

		if (Item.getEquippedItem(5).tier < 1200) {
			if (!me.getItem(627)) {		// Ko Rune
				Config.Recipes.push([Recipe.Rune, "Hel Rune"]);	//Hel -> Io
				Config.Recipes.push([Recipe.Rune, "Io Rune"]);	//Io -> Lum
				Config.Recipes.push([Recipe.Rune, "Lum Rune"]);	//Lum -> Ko			
			}

			if (!me.getItem(629)) {		// Lem Rune
				Config.Recipes.push([Recipe.Rune, "Dol Rune"]);
				Config.Recipes.push([Recipe.Rune, "Io Rune"]);
				Config.Recipes.push([Recipe.Rune, "Lum Rune"]);
				Config.Recipes.push([Recipe.Rune, "Ko Rune"]);
				Config.Recipes.push([Recipe.Rune, "Fal Rune"]);
			}
		}

		if (Item.getEquippedItem(5).tier < 1050) {	//Honor - Amn/El/Ith/Tir/Sol
			var Honor = [
				"[Name] == AmnRune # # [MaxQuantity] == 1",
				"[Name] == ElRune # # [MaxQuantity] == 1",
				"[Name] == IthRune # # [MaxQuantity] == 1",
				"[Name] == TirRune # # [MaxQuantity] == 1",
				"[Name] == SolRune # # [MaxQuantity] == 1",
			];
			NTIP.arrayLooping(Honor);

			if (!me.getItem(620)) {		// Amn rune
				Config.Recipes.push([Recipe.Rune, "Thul Rune"]);
			}

			if (me.getItem(621)) {
				if (!Check.haveBase("sword", 5)) {
					if (Pather.accessToAct(5) && !me.getQuest(35, 0)) {
						NTIP.addLine("((me.diff == 0 && [name] == Flamberge) || (me.diff > 0 && [name] == Zweihander) || (me.diff == 2 && [Name] == ColossusSword)) && [flag] != ethereal && [Quality] >= Normal && [Quality] <= Superior && [level] >= 41 # [Sockets] == 0 # [MaxQuantity] == 1");
					} else {
						NTIP.addLine("([name] == Flamberge || [Name] == Zweihander || [Name] == DimensionalBlade || [Name] == PhaseBlade || [Name] == ColossusSword) && [flag] != ethereal && [Quality] == Normal && [level] >= 41 # [Sockets] == 0 # [MaxQuantity] == 1");
					}
				}

				NTIP.addLine("[Type] == Sword && [flag] != ethereal && [Quality] >= Normal && [Quality] <= Superior && [wsm] <= 10 && [strreq] <= 187 # [Sockets] == 5 # [MaxQuantity] == 1");
			}

			Config.Runewords.push([Runeword.Honor, "Dimensional Blade"]);
			Config.Runewords.push([Runeword.Honor, "Flamberge"]);
			Config.Runewords.push([Runeword.Honor, "Zweihander"]);
			Config.Runewords.push([Runeword.Honor, "Phase Blade"]);
			Config.Runewords.push([Runeword.Honor, "Colossus Sword"]);

			Config.Recipes.push([Recipe.Socket.Weapon, "Flamberge"]);
			Config.Recipes.push([Recipe.Socket.Weapon, "Zweihander"]);
			Config.Recipes.push([Recipe.Socket.Weapon, "Dimensional Blade"]);
			Config.Recipes.push([Recipe.Socket.Weapon, "Phase Blade"]);
			Config.Recipes.push([Recipe.Socket.Weapon, "Colossus Sword"]);

			Config.KeepRunewords.push("[type] == sword # [enhanceddamage] >= 160 && [tohit] >= 250 && [itemallskills] >= 1");
		}

		if ((me.ladder || Developer.addLadderRW) && Item.getEquippedItemMerc(4).tier < 3600) { // Merc Insight
			var Insight = [
				"([Name] == thresher || [Name] == crypticaxe || [Name] == greatpoleaxe || [Name] == giantthresher) && [Flag] == Ethereal && [Quality] == Normal # [Sockets] == 0 # [MaxQuantity] == 1",
				"!me.hell && ([Name] == voulge || [Name] == scythe || [Name] == poleaxe || [Name] == halberd || [Name] == warscythe || [Name] == bill || [Name] == battlescythe || [Name] == partizan || [Name] == grimscythe) && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 4 # [MaxQuantity] == 1",
				"([Name] == thresher || [Name] == crypticaxe || [Name] == greatpoleaxe || [Name] == giantthresher) && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 4 # [MaxQuantity] == 1",
			];

			if (me.getItem(621)) {	// Sol rune
				NTIP.arrayLooping(Insight);
			}

			Config.Recipes.push([Recipe.Socket.Weapon, "Giant Thresher"]);
			Config.Recipes.push([Recipe.Socket.Weapon, "Great Poleaxe"]);
			Config.Recipes.push([Recipe.Socket.Weapon, "Cryptic Axe"]);
			Config.Recipes.push([Recipe.Socket.Weapon, "thresher"]);

			Config.Runewords.push([Runeword.Insight, "Giant Thresher"]);
			Config.Runewords.push([Runeword.Insight, "Great Poleaxe"]);
			Config.Runewords.push([Runeword.Insight, "Cryptic Axe"]);
			Config.Runewords.push([Runeword.Insight, "Thresher"]);
			Config.Runewords.push([Runeword.Insight, "Grim Scythe"]);
			Config.Runewords.push([Runeword.Insight, "Partizan"]);
			Config.Runewords.push([Runeword.Insight, "Battle Scythe"]);
			Config.Runewords.push([Runeword.Insight, "Bill"]);
			Config.Runewords.push([Runeword.Insight, "War Scythe"]);
			Config.Runewords.push([Runeword.Insight, "Halberd"]);
			Config.Runewords.push([Runeword.Insight, "Poleaxe"]);
			Config.Runewords.push([Runeword.Insight, "Scythe"]);
			Config.Runewords.push([Runeword.Insight, "Voulge"]);

			Config.KeepRunewords.push("[type] == polearm # [meditationaura] >= 12");
		}

		if (Item.getEquippedItem(1).tier < 100000) { // Lore
			var lore = [
				"[Name] == OrtRune # # [MaxQuantity] == 1",
				"[Name] == SolRune # # [MaxQuantity] == 1",
				"[type] == primalhelm && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior && [strreq] <= 150 # [Sockets] == 2",
				"[type] == primalhelm && [Flag] != Ethereal && [Quality] == Normal && [strreq] <= 150 # ([barbarianskills]+[barbcombatskilltab]+[skillbattleorders]+[skillfrenzy]+[skilldoubleswing]+[skillnaturalresistance]) >= 1 && [Sockets] == 0",
			];
			NTIP.arrayLooping(lore);

			if (Item.getEquippedItem(1).tier < 150) {
				NTIP.addLine("!me.hell && ([Name] == Crown || [Name] == BoneHelm || [Name] == FullHelm) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 2 # [MaxQuantity] == 1");
				NTIP.addLine("([Name] == Casque || [Name] == Sallet || [Name] == DeathMask || [Name] == GrimHelm) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 2 # [MaxQuantity] == 1")
			}

			if (me.normal && !me.getItem(621)) {	// Sol rune 
				Config.Recipes.push([Recipe.Rune, "Ort Rune"]);
				Config.Recipes.push([Recipe.Rune, "Thul Rune"]);
				Config.Recipes.push([Recipe.Rune, "Amn Rune"]);
			} else {
				if (!me.getItem(621)) {	// Sol rune
					Config.Recipes.push([Recipe.Rune, "Amn Rune"]);
				}
			}

			Config.Runewords.push([Runeword.Lore, "Jawbone Cap"]);
			Config.Runewords.push([Runeword.Lore, "Fanged Helm"]);
			Config.Runewords.push([Runeword.Lore, "Horned Helm"]);
			Config.Runewords.push([Runeword.Lore, "Assault Helmet"]);
			Config.Runewords.push([Runeword.Lore, "Avenger Guard"]);
			Config.Runewords.push([Runeword.Lore, "Jawbone Visor"]);
			Config.Runewords.push([Runeword.Lore, "Lion Helm"]);
			Config.Runewords.push([Runeword.Lore, "Rage Mask"]);
			Config.Runewords.push([Runeword.Lore, "Savage Helmet"]);
			Config.Runewords.push([Runeword.Lore, "Slayer Guard"]);
			Config.Runewords.push([Runeword.Lore, "Carnage Helm"]);
			Config.Runewords.push([Runeword.Lore, "Fury Visor"]);

			Config.Recipes.push([Recipe.Socket.Helm, "Jawbone Cap"]);
			Config.Recipes.push([Recipe.Socket.Helm, "Fanged Helm"]);
			Config.Recipes.push([Recipe.Socket.Helm, "Horned Helm"]);
			Config.Recipes.push([Recipe.Socket.Helm, "Assault Helmet"]);
			Config.Recipes.push([Recipe.Socket.Helm, "Avenger Guard"]);
			Config.Recipes.push([Recipe.Socket.Helm, "Jawbone Visor"]);
			Config.Recipes.push([Recipe.Socket.Helm, "Lion Helm"]);
			Config.Recipes.push([Recipe.Socket.Helm, "Rage Mask"]);
			Config.Recipes.push([Recipe.Socket.Helm, "Savage Helmet"]);
			Config.Recipes.push([Recipe.Socket.Helm, "Slayer Guard"]);
			Config.Recipes.push([Recipe.Socket.Helm, "Carnage Helm"]);
			Config.Recipes.push([Recipe.Socket.Helm, "Fury Visor"]);

			Config.Runewords.push([Runeword.Lore, "Grim Helm"]);
			Config.Runewords.push([Runeword.Lore, "Bone Helm"]);
			Config.Runewords.push([Runeword.Lore, "Sallet"]);
			Config.Runewords.push([Runeword.Lore, "Casque"]);
			Config.Runewords.push([Runeword.Lore, "Death Mask"]);
			Config.Runewords.push([Runeword.Lore, "Full Helm"]);

			Config.KeepRunewords.push("([type] == circlet || [type] == helm || [type] == primalhelm) # [LightResist] >= 25");
		}

		if ((me.ladder || Developer.addLadderRW) && Item.getEquippedItemMerc(3).prefixnum !== 20547) { // Merc Fortitude
			var fort = [
				"[Name] == ElRune # # [MaxQuantity] == 1",
				"[Name] == SolRune # # [MaxQuantity] == 1",
				"[Name] == DolRune # # [MaxQuantity] == 1",
				"[Name] == LoRune",
				"([Name] == HellforgePlate || [Name] == KrakenShell || [Name] == ArchonPlate || [Name] == BalrogSkin || [Name] == BoneWeave || [Name] == GreatHauberk || [Name] == LoricatedMail || [Name] == DiamondMail || [Name] == WireFleece || [Name] == ScarabHusk || [Name] == WyrmHide || [Name] == DuskShroud) && [Quality] == Normal && [Flag] == Ethereal # [Defense] >= 1000 && [Sockets] == 4 # [MaxQuantity] == 1",
				"([Name] == HellforgePlate || [Name] == KrakenShell || [Name] == ArchonPlate || [Name] == BalrogSkin || [Name] == BoneWeave || [Name] == GreatHauberk || [Name] == LoricatedMail || [Name] == DiamondMail || [Name] == WireFleece || [Name] == ScarabHusk || [Name] == WyrmHide || [Name] == DuskShroud) && [Quality] == Normal && [Flag] == Ethereal # [Defense] >= 700 && [Sockets] == 0 # [MaxQuantity] == 1",
			];

			if (["Immortalwhirl", "Singer"].indexOf(SetUp.finalBuild) === -1) {
				if (Check.haveItem("sword", "runeword", "Grief")) {
					NTIP.arrayLooping(fort);	// Make Grief first, if using it for final build
				}
			} else {
				NTIP.arrayLooping(fort);
			}

			Config.Recipes.push([Recipe.Socket.Armor, "Hellforge Plate"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Kraken Shell"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Archon Plate"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Balrog Skin"]);
			Config.Recipes.push([Recipe.Socket.Armor, "BoneWeave"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Great Hauberk"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Loricated Mail"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Diamond Mail"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Wire Fleece"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Scarab Husk"]);
			Config.Recipes.push([Recipe.Socket.Armor, "WyrmHide"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Dusk Shroud"]);

			Config.Runewords.push([Runeword.Fortitude, "Hellforge Plate"]);
			Config.Runewords.push([Runeword.Fortitude, "Kraken Shell"]);
			Config.Runewords.push([Runeword.Fortitude, "Archon Plate"]);
			Config.Runewords.push([Runeword.Fortitude, "Balrog Skin"]);
			Config.Runewords.push([Runeword.Fortitude, "BoneWeave"]);
			Config.Runewords.push([Runeword.Fortitude, "Great Hauberk"]);
			Config.Runewords.push([Runeword.Fortitude, "Loricated Mail"]);
			Config.Runewords.push([Runeword.Fortitude, "Diamond Mail"]);
			Config.Runewords.push([Runeword.Fortitude, "Wire Fleece"]);
			Config.Runewords.push([Runeword.Fortitude, "Scarab Husk"]);
			Config.Runewords.push([Runeword.Fortitude, "WyrmHide"]);
			Config.Runewords.push([Runeword.Fortitude, "Dusk Shroud"]);

			Config.KeepRunewords.push("[type] == armor # [enhanceddefense] >= 200 && [enhanceddamage] >= 300");
		}

		if (Item.getEquippedItemMerc(3).tier < 15000 && Item.getEquippedItem(4).tier > 1100) { // Merc Treachery
			var Treachery = [
				"([Name] == BreastPlate || [Name] == MagePlate || [Name] == HellforgePlate || [Name] == KrakenShell || [Name] == ArchonPlate || [Name] == BalrogSkin || [Name] == BoneWeave || [Name] == GreatHauberk || [Name] == LoricatedMail || [Name] == DiamondMail || [Name] == WireFleece || [Name] == ScarabHusk || [Name] == WyrmHide || [Name] == DuskShroud) && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 3 # [MaxQuantity] == 1",
				"!me.normal && ([Name] == HellforgePlate || [Name] == KrakenShell || [Name] == ArchonPlate || [Name] == BalrogSkin || [Name] == BoneWeave || [Name] == GreatHauberk || [Name] == LoricatedMail || [Name] == DiamondMail || [Name] == WireFleece || [Name] == ScarabHusk || [Name] == WyrmHide || [Name] == DuskShroud) && [Quality] == Normal && [Flag] == Ethereal # [Sockets] == 0 # [MaxQuantity] == 1",
			];

			if (me.getItem(629)) { 		// Lem rune
				NTIP.arrayLooping(Treachery);
			}

			Config.Recipes.push([Recipe.Socket.Armor, "Hellforge Plate"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Kraken Shell"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Archon Plate"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Balrog Skin"]);
			Config.Recipes.push([Recipe.Socket.Armor, "BoneWeave"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Great Hauberk"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Loricated Mail"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Diamond Mail"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Wire Fleece"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Scarab Husk"]);
			Config.Recipes.push([Recipe.Socket.Armor, "WyrmHide"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Dusk Shroud"]);

			Config.Runewords.push([Runeword.Treachery, "Breast Plate"]);
			Config.Runewords.push([Runeword.Treachery, "Mage Plate"]);
			Config.Runewords.push([Runeword.Treachery, "Hellforge Plate"]);
			Config.Runewords.push([Runeword.Treachery, "Kraken Shell"]);
			Config.Runewords.push([Runeword.Treachery, "Archon Plate"]);
			Config.Runewords.push([Runeword.Treachery, "Balrog Skin"]);
			Config.Runewords.push([Runeword.Treachery, "BoneWeave"]);
			Config.Runewords.push([Runeword.Treachery, "Great Hauberk"]);
			Config.Runewords.push([Runeword.Treachery, "Loricated Mail"]);
			Config.Runewords.push([Runeword.Treachery, "Diamond Mail"]);
			Config.Runewords.push([Runeword.Treachery, "Wire Fleece"]);
			Config.Runewords.push([Runeword.Treachery, "Scarab Husk"]);
			Config.Runewords.push([Runeword.Treachery, "WyrmHide"]);
			Config.Runewords.push([Runeword.Treachery, "Dusk Shroud"]);

			Config.KeepRunewords.push("[Type] == armor # [ias] == 45 && [coldresist] == 30");
		}

		if (Item.getEquippedItem(3).tier < 634 && Item.getEquippedItem(4).tier > 1100) {	// Treachery
			var treach = [
				"[Name] == ShaelRune # # [MaxQuantity] == 1",
				"[Name] == ThulRune # # [MaxQuantity] == 1",
				"[Name] == LemRune # # [MaxQuantity] == 1",
			];
			NTIP.arrayLooping(treach);

			if (!me.getItem(629)) {		// Lem rune
				Config.Recipes.push([Recipe.Rune, "Io Rune"]);
				Config.Recipes.push([Recipe.Rune, "Lum Rune"]);
				Config.Recipes.push([Recipe.Rune, "Ko Rune"]);
				Config.Recipes.push([Recipe.Rune, "Fal Rune"]);
			}

			if (me.getItem(629)) {
				NTIP.addLine("([Name] == demonhidearmor || [Name] == DuskShroud || [Name] == GhostArmor || [Name] == LightPlate || [Name] == MagePlate || [Name] == SerpentskinArmor || [Name] == trellisedarmor || [Name] == WyrmHide) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 3 # [MaxQuantity] == 1");
			}

			Config.Runewords.push([Runeword.Treachery, "demonhide armor"]);
			Config.Runewords.push([Runeword.Treachery, "Dusk Shroud"]);
			Config.Runewords.push([Runeword.Treachery, "Ghost Armor"]);
			Config.Runewords.push([Runeword.Treachery, "Light Plate"]);
			Config.Runewords.push([Runeword.Treachery, "Mage Plate"]);
			Config.Runewords.push([Runeword.Treachery, "Serpentskin Armor"]);
			Config.Runewords.push([Runeword.Treachery, "trellised armor"]);
			Config.Runewords.push([Runeword.Treachery, "WyrmHide"]);

			Config.KeepRunewords.push("[Type] == armor # [ias] == 45 && [coldresist] == 30");
		}

		if (Item.getEquippedItem(3).tier < 350) { // Smoke
			if (!Check.haveItem("armor", "runeword", "Smoke") && !me.hell) {
				if (!me.getItem(626)) { // Cube to Lum Rune
					Config.Recipes.push([Recipe.Rune, "Io Rune"]); // cube Io to Lum
				}

				var smokeRunes = [
					"[Name] == NefRune # # [MaxQuantity] == 1",
					"[Name] == LumRune # # [MaxQuantity] == 1",
				];
				NTIP.arrayLooping(smokeRunes);
			}

			if (me.getItem(626)) {
				NTIP.addLine("([Name] == demonhidearmor || [Name] == DuskShroud || [Name] == GhostArmor || [Name] == LightPlate || [Name] == MagePlate || [Name] == SerpentskinArmor || [Name] == trellisedarmor || [Name] == WyrmHide) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 2 # [MaxQuantity] == 1");
			}

			Config.Runewords.push([Runeword.Smoke, "demonhide armor"]);
			Config.Runewords.push([Runeword.Smoke, "Dusk Shroud"]);
			Config.Runewords.push([Runeword.Smoke, "Ghost Armor"]);
			Config.Runewords.push([Runeword.Smoke, "Light Plate"]);
			Config.Runewords.push([Runeword.Smoke, "Mage Plate"]);
			Config.Runewords.push([Runeword.Smoke, "Serpentskin Armor"]);
			Config.Runewords.push([Runeword.Smoke, "trellised armor"]);
			Config.Runewords.push([Runeword.Smoke, "WyrmHide"]);

			Config.KeepRunewords.push("[type] == armor # [fireresist] == 50");
		}

		if (Item.getEquippedItem(3).tier < 600 && (Check.haveItem("sword", "runeword", "Crescent Moon") || Item.getEquippedItem(5).tier > 900)) {	// Duress
			var Duress = [
				"[Name] == ShaelRune # # [MaxQuantity] == 1",
				"[Name] == UmRune # # [MaxQuantity] == 1",
				"[Name] == ThulRune # # [MaxQuantity] == 1",
			];
			NTIP.arrayLooping(Duress);

			if (!me.getItem(631)) {		// Um rune
				Config.Recipes.push([Recipe.Rune, "Io Rune"]);
				Config.Recipes.push([Recipe.Rune, "Lum Rune"]);
				Config.Recipes.push([Recipe.Rune, "Ko Rune"]);
				Config.Recipes.push([Recipe.Rune, "Fal Rune"]);
				Config.Recipes.push([Recipe.Rune, "Lem Rune"]);
				Config.Recipes.push([Recipe.Rune, "Pul Rune"]);
			}

			if (me.getItem(631) && me.getItem(622)) {
				NTIP.addLine("([Name] == Archon Plate || [Name] == demonhidearmor || [Name] == DuskShroud || [Name] == GhostArmor || [Name] == BoneWeave || [Name] == SerpentskinArmor || [Name] == trellisedarmor || [Name] == WyrmHide) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 3 # [MaxQuantity] == 1");
			}

			Config.Runewords.push([Runeword.Duress, "Archon Plate"]);
			Config.Runewords.push([Runeword.Duress, "demonhide armor"]);
			Config.Runewords.push([Runeword.Duress, "Dusk Shroud"]);
			Config.Runewords.push([Runeword.Duress, "Ghost Armor"]);
			Config.Runewords.push([Runeword.Duress, "BoneWeave"]);
			Config.Runewords.push([Runeword.Duress, "Serpentskin Armor"]);
			Config.Runewords.push([Runeword.Duress, "trellised armor"]);
			Config.Runewords.push([Runeword.Duress, "WyrmHide"]);

			Config.KeepRunewords.push("[Type] == armor # [coldresist] == 45");
		}

		if (Item.getEquippedItem(3).tier < 340) {	// Myth
			var Myth = [
				"[Name] == HelRune # # [MaxQuantity] == 1",
				"[Name] == AmnRune # # [MaxQuantity] == 1",
				"[Name] == NefRune # # [MaxQuantity] == 1",
			];
			NTIP.arrayLooping(Myth);

			if (!me.getItem(624)) {		// Hel rune
				Config.Recipes.push([Recipe.Rune, "Dol Rune"]);
			}

			if (me.getItem(624)) {
				NTIP.addLine("([Name] == demonhidearmor || [Name] == DuskShroud || [Name] == GhostArmor || [Name] == LightPlate || [Name] == MagePlate || [Name] == SerpentskinArmor || [Name] == trellisedarmor || [Name] == WyrmHide) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 3 # [MaxQuantity] == 1");
			}

			if (me.getItem(624) && Item.getEquippedItem(3).tier < 200) {
				NTIP.addLine("[Name] == BreastPlate && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 3 # [MaxQuantity] == 1");
			}

			Config.Runewords.push([Runeword.Myth, "Breast Plate"]);
			Config.Runewords.push([Runeword.Myth, "demonhide armor"]);
			Config.Runewords.push([Runeword.Myth, "Dusk Shroud"]);
			Config.Runewords.push([Runeword.Myth, "Ghost Armor"]);
			Config.Runewords.push([Runeword.Myth, "Light Plate"]);
			Config.Runewords.push([Runeword.Myth, "Mage Plate"]);
			Config.Runewords.push([Runeword.Myth, "Serpentskin Armor"]);
			Config.Runewords.push([Runeword.Myth, "trellised armor"]);
			Config.Runewords.push([Runeword.Myth, "WyrmHide"]);

			Config.KeepRunewords.push("[Type] == armor # [barbarianskills] == 2");
		}

		if (Item.getEquippedItem(5).tier < 770) {	//Kings Grace - Amn/Ral/Thul
			var KingsGrace = [
				"[Name] == AmnRune # # [MaxQuantity] == 1",
				"[Name] == RalRune # # [MaxQuantity] == 1",
				"[Name] == ThulRune # # [MaxQuantity] == 1",
				"[Type] == Sword && [flag] != ethereal && [Quality] >= Normal && [Quality] <= Superior && [wsm] <= 10 && [strreq] <= 150 # [Sockets] == 3 # [MaxQuantity] == 1",
				"([name] == Legend Sword || [name] == Highland Blade || [name] == Balrog Blade || [name] == Colossus Sword) && [flag] != ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 3 # [MaxQuantity] == 1",
			];
			NTIP.arrayLooping(KingsGrace);

			Config.Runewords.push([Runeword.KingsGrace, "Broad Sword"]);
			Config.Runewords.push([Runeword.KingsGrace, "Long Sword"]);
			Config.Runewords.push([Runeword.KingsGrace, "War Sword"]);
			Config.Runewords.push([Runeword.KingsGrace, "Giant Sword"]);
			Config.Runewords.push([Runeword.KingsGrace, "Flamberge"]);
			Config.Runewords.push([Runeword.KingsGrace, "Dimensional Blade"]);
			Config.Runewords.push([Runeword.KingsGrace, "Battle Sword"]);
			Config.Runewords.push([Runeword.KingsGrace, "Rune Sword"]);
			Config.Runewords.push([Runeword.KingsGrace, "Ancient Sword"]);
			Config.Runewords.push([Runeword.KingsGrace, "Espandon"]);
			Config.Runewords.push([Runeword.KingsGrace, "Tusk Sword"]);
			Config.Runewords.push([Runeword.KingsGrace, "Zweihander"]);
			Config.Runewords.push([Runeword.KingsGrace, "Legend Sword"]);
			Config.Runewords.push([Runeword.KingsGrace, "Highland Blade"]);
			Config.Runewords.push([Runeword.KingsGrace, "Balrog Blade"]);
			Config.Runewords.push([Runeword.KingsGrace, "Colossus Sword"]);

			Config.KeepRunewords.push("[type] == sword # [enhanceddamage] >= 100 && [lifeleech] >= 7");
		}

		if (Item.getEquippedItem(5).tier < 500) {	//Steel - Tir/El
			var Steel = [
				"[Name] == TirRune # # [MaxQuantity] == 2",
				"[Name] == ElRune # # [MaxQuantity] == 2",
			];
			NTIP.arrayLooping(Steel);

			if (Item.getEquippedItem(5).tier < 500 && Item.getEquippedItem(5).tier > 395) {
				NTIP.addLine("[Type] == Sword && [flag] != ethereal && [Quality] >= Normal && [Quality] <= Superior && [wsm] <= 10 && [strreq] <= 150 && [class] == elite # [Sockets] == 2 # [MaxQuantity] == 1");
			} else if (Item.getEquippedItem(5).tier < 500 && Item.getEquippedItem(5).tier > 278) {
				NTIP.addLine("[Type] == Sword && [flag] != ethereal && [Quality] >= Normal && [Quality] <= Superior && [wsm] <= 10 && [strreq] <= 150 && [class] > normal # [Sockets] == 2 # [MaxQuantity] == 1");
			} else {
				NTIP.addLine("[Type] == Sword && [flag] != ethereal && [Quality] == Superior && [wsm] <= 10 && [strreq] <= 150 # [enhanceddamage] >= 10 && [Sockets] == 2 # [MaxQuantity] == 1");
			}

			Config.Runewords.push([Runeword.Steel, "Short Sword"]);
			Config.Runewords.push([Runeword.Steel, "Scimitar"]);
			Config.Runewords.push([Runeword.Steel, "Sabre"]);
			Config.Runewords.push([Runeword.Steel, "Crystal Sword"]);
			Config.Runewords.push([Runeword.Steel, "Broad Sword"]);
			Config.Runewords.push([Runeword.Steel, "Long Sword"]);
			Config.Runewords.push([Runeword.Steel, "War Sword"]);
			Config.Runewords.push([Runeword.Steel, "Giant Sword"]);
			Config.Runewords.push([Runeword.Steel, "Flamberge"]);
			Config.Runewords.push([Runeword.Steel, "Gladius"]);
			Config.Runewords.push([Runeword.Steel, "Cutlass"]);
			Config.Runewords.push([Runeword.Steel, "Shamshir"]);
			Config.Runewords.push([Runeword.Steel, "Dimensional Blade"]);
			Config.Runewords.push([Runeword.Steel, "Battle Sword"]);
			Config.Runewords.push([Runeword.Steel, "Rune Sword"]);
			Config.Runewords.push([Runeword.Steel, "Ancient Sword"]);
			Config.Runewords.push([Runeword.Steel, "Espandon"]);
			Config.Runewords.push([Runeword.Steel, "Tusk Sword"]);
			Config.Runewords.push([Runeword.Steel, "Zweihander"]);
			Config.Runewords.push([Runeword.Steel, "Falcata"]);
			Config.Runewords.push([Runeword.Steel, "Ataghan"]);
			Config.Runewords.push([Runeword.Steel, "Elegant Blade"]);
			Config.Runewords.push([Runeword.Steel, "Phase Blade"]);
			Config.Runewords.push([Runeword.Steel, "Conquest Sword"]);
			Config.Runewords.push([Runeword.Steel, "Cryptic Sword"]);
			Config.Runewords.push([Runeword.Steel, "Mythical Sword"]);

			Config.KeepRunewords.push("[type] == sword # [enhanceddamage] >= 20 && [ias] >= 25");
		}

		if ((me.ladder || Developer.addLadderRW) && Item.getEquippedItem(12).prefixnum !== 20635) { // Spirit Sword
			var SpiritSword = [
				"[Name] == TalRune # # [MaxQuantity] == 1",
				"[Name] == ThulRune # # [MaxQuantity] == 1",
				"[Name] == OrtRune # # [MaxQuantity] == 1",
				"[Name] == AmnRune # # [MaxQuantity] == 1",
			];
			NTIP.arrayLooping(SpiritSword);

			if (me.getItem(619) && me.getItem(620)) { 	// Thul and Amn
				NTIP.addLine("([Name] == BroadSword || [Name] == CrystalSword) && [flag] != ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 4 # [MaxQuantity] == 1");
			}

			Config.Runewords.push([Runeword.Spirit, "Crystal Sword"]);
			Config.Runewords.push([Runeword.Spirit, "Broad Sword"]);

			Config.KeepRunewords.push("[type] == sword # [fcr] >= 25 && [maxmana] >= 89");
		}

		if (Item.getEquippedItem(5).tier < 175) {	//Malice - IthElEth
			var Malice = [
				"[Name] == IthRune # # [MaxQuantity] == 1",
				"[Name] == ElRune # # [MaxQuantity] == 1",
				"[Name] == EthRune # # [MaxQuantity] == 1",
				"[Type] == Sword && [flag] != ethereal && [Quality] >= Normal && [Quality] <= Superior && [wsm] <= 10 && [strreq] <= 150 # [Sockets] == 3 # [MaxQuantity] == 1",
			];
			NTIP.arrayLooping(Malice);

			Config.Runewords.push([Runeword.Malice, "Crystal Sword"]);
			Config.Runewords.push([Runeword.Malice, "Broad Sword"]);
			Config.Runewords.push([Runeword.Malice, "Long Sword"]);
			Config.Runewords.push([Runeword.Malice, "War Sword"]);
			Config.Runewords.push([Runeword.Malice, "Giant Sword"]);
			Config.Runewords.push([Runeword.Malice, "Flamberge"]);
			Config.Runewords.push([Runeword.Malice, "Espandon"]);
			Config.Runewords.push([Runeword.Malice, "Tusk Sword"]);
			Config.Runewords.push([Runeword.Malice, "Zweihander"]);

			Config.KeepRunewords.push("[type] == sword # [enhanceddamage] >= 33 && [tohit] >= 50");
		}

		if (Item.getEquippedItem(3).tier < 233) { // Stealth
			if (!Check.haveItem("armor", "runeword", "Stealth") && me.normal) {
				var stealthRunes = [
					"[Name] == TalRune # # [MaxQuantity] == 1",
					"[Name] == EthRune # # [MaxQuantity] == 1",
				];
				NTIP.arrayLooping(stealthRunes);
			}

			var stealthArmor = [
				"!me.hell && ([Name] == StuddedLeather || [Name] == LightPlate) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 2 # [MaxQuantity] == 1",
				"([Name] == GhostArmor || [Name] == SerpentskinArmor || [Name] == MagePlate) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 2 # [MaxQuantity] == 1",
			];
			NTIP.arrayLooping(stealthArmor);

			if (Item.getEquippedItem(3).tier < 200) {
				NTIP.addLine("[Name] == BreastPlate && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 2 # [MaxQuantity] == 1");
			}

			Config.Runewords.push([Runeword.Stealth, "Mage Plate"]);
			Config.Runewords.push([Runeword.Stealth, "Serpentskin Armor"]);
			Config.Runewords.push([Runeword.Stealth, "Ghost Armor"]);
			Config.Runewords.push([Runeword.Stealth, "Light Plate"]);
			Config.Runewords.push([Runeword.Stealth, "Breast Plate"]);
			Config.Runewords.push([Runeword.Stealth, "Studded Leather"]);

			Config.KeepRunewords.push("[type] == armor # [frw] == 25");
		}

		/*if (Item.getEquippedItem(10).tier < 233) {
			NTIP.addLine("[name] == heavygloves && [flag] != ethereal && [Quality] == magic # [itemchargedskill] >= 0 # [MaxQuantity] == 1");
			Config.Recipes.push([Recipe.Blood.Gloves, "Heavy Gloves"]); // Craft Blood Gloves
		}*/

		if (Check.haveItemAndNotSocketed("sword", "unique", "Djinn Slayer")) {
			NTIP.addLine("[name] == AmnRune # # [MaxQuantity] == 2");
		}
	}
}