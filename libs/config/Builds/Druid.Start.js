/*
 *    @filename   	Druid.Start.js
 *	  @author	  	theBGuy
 *    @desc      	Druid Fire start build
 */


js_strict(true);

if (!isIncluded("SoloPlay/Functions/Globals.js")) { include("SoloPlay/Functions/Globals.js"); }
SetUp.include();

let AutoBuildTemplate = {

	1:	{
		//SkillPoints: [-1],			// This doesn't matter. We don't have skill points to spend at lvl 1
		//StatPoints: [-1,-1,-1,-1,-1],	// This doesn't matter. We don't have stat points to spend at lvl 1
		Update: function () {
			Config.AttackSkill = [-1, 0, 0, 0, 0, 0, 0];
			Config.LowManaSkill = [0, 0];
			Config.SkipImmune = ["fire"];
			Config.BeltColumn = ["hp", "hp", "hp", "hp"];
			Config.MinColumn[0] = Config.BeltColumn[0] !== "rv" ? Math.max(1, Storage.BeltSize() - 1) : 0;
			Config.MinColumn[1] = Config.BeltColumn[1] !== "rv" ? Math.max(1, Storage.BeltSize() - 1) : 0;
			Config.MinColumn[2] = Config.BeltColumn[2] !== "rv" ? Math.max(1, Storage.BeltSize() - 1) : 0;
			Config.MinColumn[3] = Config.BeltColumn[3] !== "rv" ? Math.max(1, Storage.BeltSize() - 1) : 0;
			Config.HPBuffer = 4;
			Config.MPBuffer = 4;
			Config.TownHP = me.playertype ? 0 : Config.TownCheck ? 35 : 0;
			Config.SummonVine = 1; // 0 = disabled, 1 / "Poison Creeper", 2 / "Carrion Vine", 3 / "Solar Creeper"
		}
	},

	2:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 0, 0, 0, 0, 0, 0];
			Config.TownHP = me.playertype ? 0 : Config.TownCheck ? 35 : 0;
		}
	},

	3:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 0, 0, 0, 0, 0, 0];
			Config.TownHP = me.playertype ? 0 : Config.TownCheck ? 35 : 0;
		}
	},

	4:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 225, -1, 225, -1, 0, 0];
			Config.TownHP = me.playertype ? 0 : Config.TownCheck ? 35 : 0;
		}
	},

	5:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 225, -1, 225, -1, 0, 0];
			Config.TownHP = me.playertype ? 0 : Config.TownCheck ? 35 : 0;
		}
	},

	6:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 225, -1, 225, -1, 0, 0];
			Config.TownHP = me.playertype ? 0 : Config.TownCheck ? 35 : 0;
			Config.BeltColumn = ["hp", "hp", "mp", "mp"];
			Config.MinColumn[0] = Config.BeltColumn[0] !== "rv" ? Math.max(1, Storage.BeltSize() - 1) : 0;
			Config.MinColumn[1] = Config.BeltColumn[1] !== "rv" ? Math.max(1, Storage.BeltSize() - 1) : 0;
			Config.MinColumn[2] = Config.BeltColumn[2] !== "rv" ? Math.max(1, Storage.BeltSize() - 1) : 0;
			Config.MinColumn[3] = Config.BeltColumn[3] !== "rv" ? Math.max(1, Storage.BeltSize() - 1) : 0;
			Config.HPBuffer = 2;
			Config.MPBuffer = 6;
		}
	},

	7:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 225, -1, 225, -1, 0, 0];
			Config.TownHP = me.playertype ? 0 : Config.TownCheck ? 35 : 0;
		}
	},

	8:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 225, -1, 225, -1, 0, 0];
			Config.TownHP = me.playertype ? 0 : Config.TownCheck ? 35 : 0;
		}
	},

	9:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 225, -1, 225, -1, 0, 0];
			Config.TownHP = me.playertype ? 0 : Config.TownCheck ? 35 : 0;
		}
	},

	10:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 225, -1, 225, -1, 0, 0];
			Config.TownHP = me.playertype ? 0 : Config.TownCheck ? 35 : 0;
		}
	},

	11:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 225, -1, 225, -1, 0, 0];
		}
	},

	12:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			if (me.getSkill(234, 0)) {
				Config.AttackSkill = [-1, 234, 225, 234, 225, 0, 0];
			} else {
				Config.AttackSkill = [-1, 225, -1, 225, -1, 0, 0];
			}

		}
	},

	13:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 234, 225, 234, 225, 0, 0];
			Config.SummonVine = 2; // 0 = disabled, 1 / "Poison Creeper", 2 / "Carrion Vine", 3 / "Solar Creeper"
		}
	},

	14:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 234, 225, 234, 225, 0, 0];

		}
	},

	15:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 234, 225, 234, 225, 0, 0];

		}
	},

	16:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 234, 225, 234, 225, 0, 0];

		}
	},

	17:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 234, 225, 234, 225, 0, 0];

		}
	},

	18:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 234, 225, 234, 225, 0, 0];

		}
	},

	19:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 234, 225, 234, 225, 0, 0];

		}
	},

	20:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 234, 225, 234, 225, 0, 0];

		}
	},

	21:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 234, 225, 234, 225, 0, 0];

		}
	},

	22:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 234, 225, 234, 225, 0, 0];

		}
	},

	23:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 234, 225, 234, 225, 0, 0];

		}
	},

	24:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 234, 225, 234, 225, 0, 0];

		}
	},

	25:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 234, 225, 234, 225, 0, 0];

		}
	},

	26:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 234, 225, 234, 225, 0, 0];

		}
	},

	27:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 234, 225, 234, 225, 0, 0];

		}
	},

	28:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 234, 225, 234, 225, 0, 0];

		}
	},

	29:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 234, 225, 234, 225, 0, 0];

		}
	},

	30:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 234, 225, 234, 225, 0, 0];

		}
	},

	31:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 234, 225, 234, 225, 0, 0];

		}
	},

	32:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 234, 225, 234, 225, 0, 0];

		}
	},

	33:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 234, 225, 234, 225, 0, 0];

		}
	},

	34:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 234, 225, 234, 225, 0, 0];

		}
	},

	35:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 234, 225, 234, 225, 0, 0];

		}
	},

	36:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 234, 225, 234, 225, 0, 0];

		}
	},
};
