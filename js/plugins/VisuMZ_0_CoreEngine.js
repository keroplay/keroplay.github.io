//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.28;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.28] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Actors ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 *
 * === Quality of Life ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 *
 * === Basic, X, and S Parameters ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the default battle system (DTB).
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 *
 * Misc
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
 * 
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 *
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** Bug Fixes!
 * *** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *     placed on a half pixel when a window's size is an odd number. This would
 *     cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","LargerResolution":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomNumber(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 0
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Misc
 * @text Misc
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Misc
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param LargerResolution
 * @text Larger Resolution
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent LargerResolution
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent LargerResolution
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
//=============================================================================

const _0x3cfd=['traitsPi','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','titles1','setWindowPadding','targetScaleX','LoadMenu','_number','sv_actors','DECIMAL','updateOpen','drawSegment','snapForBackground','sparamPlus1','createCommandWindow','drawFace','updateFauxAnimations','makeInputButtonString','EnableJS','drawText','areTileShadowsHidden','outbounce','vertJS','drawIconBySize','left','INOUTCUBIC','initialLevel','processMoveCommand','tpGaugeColor2','innerHeight','drawParamName','cursorUp','MRF','jsQuickFunc','processFauxAnimationRequests','Game_Picture_calcEasing','Linear','TitleCommandList','_buttonType','PAUSE','_playTestFastMode','Plus2','textColor','drawRightArrow','NUMPAD8','mpGaugeColor2','SideView','EscapeAlways','createFauxAnimation','itemHitImprovedAccuracy','shake','expGaugeColor1','ZOOM','ImgLoad','processTimingData','DimColor1','OptionsMenu','HRG','Rate1','_opening','isDying','onEscapeSuccess','UNDERSCORE','Game_Interpreter_command355','Scene_Base_createWindowLayer','clamp','match','translucentOpacity','OUTBOUNCE','startShake','IconParam7','_isButtonHidden','down','MCR','WIN_OEM_FJ_MASSHOU','select','buttonAssistWindowSideRect','CodeJS','IconXParam1','setEnemyAction','paramPlusJS','F14','MEV','ALT','Window_NumberInput_start','DTB','createCustomBackgroundImages','targetOpacity','deathColor','maxBattleMembers','expRate','IconParam4','Total','addLoadListener','encounterStepsMinimum','getColorDataFromPluginParameters','cursorDown','get','getBackgroundOpacity','advanced','animations','SParamVocab6','Scene_Boot_updateDocumentTitle','HYPHEN_MINUS','pictureButtons','value','startMove','_pageupButton','startAutoNewGame','open','changeClass','map','ctGaugeColor1','_digitGrouping','boxWidth','ParamChange','CustomParamNames','WIN_OEM_PA3','FunctionName','_goldWindow','titles2','option','_anchor','_data','showFauxAnimations','Flat2','Sprite_destroy','Window_Selectable_cursorDown','tilesets','ColorPowerUp','adjustPictureAntiZoom','numActions','ColorExpGauge1','ParseStateNotetags','isNextScene','markCoreEngineModified','adjustBoxSize','Input_shouldPreventDefault','commandWindowRows','OPEN_PAREN','reduce','getInputButtonString','IconSParam3','EndingID','isUseModernControls','_stored_normalColor','ItemStyle','OUTELASTIC','_cacheScaleX','_skillTypeWindow','mainAreaHeightSideButtonLayout','Sprite_Animation_processSoundTimings','img/%1/','makeFontSmaller','TPB\x20ACTIVE','NUMPAD3','_shakeSpeed','XParamVocab2','isRightInputMode','VisuMZ_1_OptionsCore','CNT','Scene_Map_updateScene','skillTypes','0.00','initDigitGrouping','END','Scene_Boot_startNormalGame','updateLastTarget','dashToggle','Game_Actor_changeClass','powerDownColor','Graphics_printError','escape','133akvAGc','OUTCIRC','updateMove','HelpRect','SLEEP','max','keyboard','level','strokeRect','IconXParam7','ColorHPGauge2','Window_NameInput_cursorLeft','yScrollLinkedOffset','itemWindowRect','ColorCrisis','makeActionList','setLastPluginCommandInterpreter','_stored_pendingColor','Scene_Skill_create','_gamepadWait','isCancelled','helpAreaHeight','isInputting','DrawIcons','Flat1','_screenY','Bitmap_drawText','paramRateJS','ItemBackColor1','eventsXyNt','buttonAssistWindowButtonRect','paramBase','Window_NameInput_cursorRight','Window_Selectable_itemRect','windowPadding','reserveNewGameCommonEvent','numberShowButton','PositionJS','ARRAYEVAL','LUK','setBattleSystem','ParseArmorNotetags','hpGaugeColor1','NUM_LOCK','createBackground','skillTypeWindowRect','GoldOverlap','CLOSE_CURLY_BRACKET','xparamRateJS','initialBattleSystem','NumberBgType','CallHandlerJS','WIN_OEM_ENLW','IconSParam6','_refreshArrows','isTpb','buttonAssistOffset4','WIN_OEM_PA2','substring','ColorGaugeBack','sparam','_windowLayer','key%1','guardSkillId','ColorMPGauge2','terms','playCursorSound','initCoreEngine','F10','_coreEasingType','contains','ColorTPGauge1','animationId','_stored_gaugeBackColor','ShowButtons','WIN_ICO_CLEAR','none','padding','F13','moveMenuButtonSideButtonLayout','font-smooth','ctrl','menuShowButton','missed','Renderer','GetParamIcon','targetScaleY','CEV','resize','DigitGroupingLocale','targetEvaRate','updateTransform','pagedown','INSERT','TRG','Bitmap_resize','processDigitChange','SParamVocab5','_context','ParseAllNotetags','Window_NameInput_cursorPageup','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','colSpacing','top','CLEAR','Scene_Options_create','isMapScrollLinked','command122','ARRAYFUNC','GoldRect','Keyboard','FadeSpeed','_stored_crisisColor','backspace','PreserveNumbers','setupValueFont','KeyboardInput','push','setAnchor','isPlaytest','paramWidth','ENTER_SPECIAL','_targetOffsetX','loadBitmap','button','ctGaugeColor2','processCursorHomeEndTrigger','SParamVocab4','toUpperCase','_shouldPreventDefault','F19','updateOrigin','_changingClass','setupButtonImage','helpWindowRect','OutlineColorGauge','TAB','sparamRate1','LevelUpFullMp','ProfileBgType','attackSkillId','isHandled','setAttack','equips','sparamPlusJS','SCALE_MODES','%2%1%3','SmartEventCollisionPriority','WIN_OEM_ATTN','Bitmap_measureTextWidth','setAction','measureTextWidth','buttonAssistOk','PictureEasingType','create','stypeId','Spriteset_Base_destroy','_hideTileShadows','makeDeepCopy','itemHit','_playtestF7Looping','createFauxAnimationSprite','Game_Actor_levelUp','startNormalGame','_movementDuration','BattleSystem','test','Window_Gold_refresh','Wait','isPhysical','pressed','up2','BgFilename1','displayX','Sprite_Button_initialize','usableSkills','_dimmerSprite','xparamPlus','_actor','setTargetAnchor','pageup','F7key','_stored_maxLvGaugeColor1','updateAnchor','FUNC','maxCols','CrisisRate','random','initMembersCoreEngine','DATABASE','CRI','filters','SellRect','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','opacity','stencilFunc','enableDigitGroupingEx','ARRAYSTR','drawParamText','showDevTools','_stored_mpGaugeColor2','playMiss','_drawTextShadow','drawActorExpGauge','getCustomBackgroundSettings','F12','cancel','Window_NameInput_processTouch','apply','Spriteset_Base_updatePosition','buttonAssistText%1','traitObjects','requestMotion','refresh','setMute','paramBaseAboveLevel99','IconParam0','loadSystem','moveCancelButtonSideButtonLayout','IconXParam8','_fauxAnimationSprites','CONVERT','switchModes','Scene_Map_createSpriteset','326346EkJIUF','command105','systemColor','NUMPAD7','animationBaseDelay','TCR','_hp','STR','terminate','hit','_windowskin','TimeProgress','ExtJS','anchor','currentExp','DIVIDE','Window_Selectable_drawBackgroundRect','getButtonAssistLocation','Game_Temp_initialize','dimColor1','popScene','startAnimation','useDigitGroupingEx','_animation','textWidth','length','ALTGR','paramName','CRSEL','drawActorClass','MenuLayout','TextStr','xparamPlus2','ButtonFadeSpeed','INOUTEXPO','ATK','_cancelButton','KeyTAB','drawCurrentParam','characters','description','iconWidth','buttonAssistText2','isGamepadTriggered','URL','EVAL','faces','_scene','canUse','clear','maxLevel','Game_Picture_show','Game_Picture_updateMove','isMaxLevel','item','getBattleSystem','SELECT','children','XParamVocab1','updatePositionCoreEngineShakeOriginal','IconSParam2','XParameterFormula','renderNoMask','isEnemy','Sprite_Battler_startMove','name','Layer','command355','PHA','bgmVolume','round','RepositionActors','BlurFilter','buttonY','xparamFlatBonus','paramFlatJS','ShowDevTools','itemLineRect','Scene_Shop_create','Title','buttonAssistOffset2','Game_Character_processMoveCommand','ApplyEasing','tpColor','TILDE','SystemLoadAudio','ENTER','Input_pollGamepads','ARRAYJSON','addChildToBack','MAT','ColorTPGauge2','mainAreaTopSideButtonLayout','PLUS','XParamVocab6','isActiveTpb','_slotWindow','en-US','Scene_Battle_createCancelButton','isCursorMovable','setHandler','Input_onKeyDown','xdg-open','integer','ShowJS','GREATER_THAN','WIN_OEM_WSCTRL','_upArrowSprite','cancelShowButton','ListRect','hide','StatusBgType','initialize','floor','WIN_OEM_FJ_JISHO','xparam','itypeId','Bitmap_fillRect','system','process_VisuMZ_CoreEngine_RegExp','clone','EISU','updateDocumentTitle','DELETE','BACK_SLASH','playBuzzer','enter','setSize','EncounterRateMinimum','animationNextDelay','Scene_MenuBase_mainAreaHeight','vertical','EnableNameInput','_index','drawGameSubtitle','boxHeight','_stored_powerDownColor','SCROLL_LOCK','OptionsRect','ACCEPT','applyEasing','CommandRect','gaugeBackColor','processKeyboardHome','setupNewGame','tileWidth','randomInt','226233zfUFYe','Symbol','OnLoadJS','_inputString','calcEasing','_forcedTroopView','center','_destroyInternalTextures','save','contentsOpacity','ShowItemBackground','CLOSE_PAREN','KANA','_width','Bitmap_strokeRect','Sprite_Picture_updateOrigin','Game_Interpreter_command122','paramFlat','abs','(\x5cd+)([%％])>','toFixed','isOpen','TextCodeClassNames','_sellWindow','F17','DataManager_setupNewGame','lineHeight','batch','PDR','setupCoreEasing','Window_StatusBase_drawActorSimpleStatus','TextJS','changeTextColor','VisuMZ_2_BattleSystemSTB','processKeyboardBackspace','_inputSpecialKeyCode','Duration','IconSParam8','HELP','Gold','resetTextColor','mev','_screenX','skills','cos','SParamVocab8','EREOF','#%1','volume','menu','StatusEquipRect','xScrollLinkedOffset','profileWindowRect','INQUART','CustomParamType','Untitled','trim','createPageButtons','DigitGroupingExText','Scene_MenuBase_createCancelButton','show','onClick','STB','number','evade','tab','_optionsWindow','_stored_maxLvGaugeColor2','LINEAR','updateMain','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','buttonAssistSwitch','seVolume','worldTransform','Window_EquipItem_isEnabled','buttonAssistKey1','7013xHGWOj','_onKeyPress','SceneManager_initialize','maxLvGaugeColor2','MenuBg','stringKeyMap','currentLevelExp','ColorMaxLvGauge2','render','initMembers','inbounce','isNumpadPressed','WIN_OEM_AUTO','win32','bgm','Manual','F18','mmp','itemBackColor2','OUTQUART','_height','AMPERSAND','EQUALS','canEquip','Scene_Menu_create','setBackgroundType','actor','calcCoreEasing','CommandBgType','Game_System_initialize','Page','Max','mainAreaTop','openness','BACK_QUOTE','updatePadding','onInputBannedWords','displayY','targetObjects','charAt','Plus','Window_NameInput_initialize','REC','QUOTE','ParseItemNotetags','OUTCUBIC','ColorHPGauge1','Scene_Status_create','SnapshotOpacity','easingType','openingSpeed','Game_Troop_setup','addCommand','ParseTilesetNotetags','randomJS','buttonAssistOffset1','isFullDocumentTitle','F22','log','Scene_Item_create','clearStencil','VisuMZ_2_BattleSystemBTB','ItemRect','drawTextEx','checkCacheKey','XParamVocab5','paramMax','isSideButtonLayout','QoL','_listWindow','helpAreaTop','INEXPO','parameters','TPB\x20WAIT','loadSystemImages','mpCostColor','_stored_hpGaugeColor2','TGR','cursorLeft','_actorWindow','SParamVocab9','defineProperty','levelUpRecovery','home','\x5c}❪SHIFT❫\x5c{','_pollGamepads','_stored_mpCostColor','TextManager_param','_pictureContainer','drawActorSimpleStatus','CategoryBgType','SellBgType','ImprovedAccuracySystem','LvExpGauge','LATIN1','isGamepadButtonPressed','WIN_OEM_CUSEL','drawCurrencyValue','parseForcedGameTroopSettingsCoreEngine','note','isWindowMaskingEnabled','_addShadow','update','Window_Selectable_processCursorMove','scaleMode','loadTitle1','WIN_ICO_00','MINUS','ListBgType','paramX','ActorHPColor','textSizeEx','OpenSpeed','Plus1','_mode','subject','getLevel','isSmartEventCollisionOn','OptionsBgType','subjectHitRate','blt','command111','DummyRect','Bitmap_clearRect','playCursor','CoreEngine','DocumentTitleFmt','doesNameContainBannedWords','_itemWindow','ColSpacing','createCustomParameter','_targetOffsetY','SaveMenu','DimColor2','innerWidth','image-rendering','CustomParamAbb','Sprite_Gauge_gaugeRate','backgroundBitmap','stencilOp','removeAllFauxAnimations','xparamFlat1','optSideView','Scene_MenuBase_mainAreaTop','RowSpacing','updatePositionCoreEngineShakeRand','Power','AccuracyBoost','buttonAssistOffset3','AntiZoomPictures','Graphics_centerElement','RegExp','isActor','_moveEasingType','_baseSprite','drawGameVersion','buttonAreaHeight','smallParamFontSize','INSINE','alwaysDash','MAXHP','active','Scene_Name_create','ActorMPColor','XParamVocab0','_categoryWindow','parse','Window_NameInput_cursorPagedown','addWindow','ItemMenu','_forcedBattleSys','IconXParam5','focus','gradientFillRect','text','SwitchActorText','itemHeight','createBuffer','defaultInputMode','SUBTRACT','buttonAssistText3','erasePicture','Spriteset_Base_initialize','updateBackOpacity','clearForcedGameTroopSettingsCoreEngine','SystemLoadImages','moveRelativeToResolutionChange','_spriteset','F11','_shakeDuration','dimColor2','processTouch','itemRect','buttons','start','Scene_Battle_createSpriteset','listWindowRect','mainAreaHeight','playTestF6','backOpacity','createMenuButton','valueOutlineColor','Game_Action_updateLastTarget','Rate2','Window_ShopSell_isEnabled','enable','_blank','sparamFlat1','ParseWeaponNotetags','call','_timerSprite','F24','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','scale','maxItems','initBasic','_customModified','stop','setCoreEngineUpdateWindowBg','F21','isRepeated','retrieveFauxAnimation','502377sgaHbH','IconParam1','duration','fillStyle','DigitGroupingDamageSprites','catchUnknownError','initCoreEasing','setCoreEngineScreenShakeStyle','_clickHandler','OUTBACK','ParseEnemyNotetags','uiAreaWidth','%1/','contents','useDigitGrouping','createSpriteset','MRG','ASTERISK','isKeyItem','initButtonHidden','Window_NameInput_cursorUp','_stored_hpGaugeColor1','inputWindowRect','rgba(0,\x200,\x200,\x201.0)','FDR','F20','Scene_Battle_update','2EyTkKm','isAlive','titleCommandWindow','process_VisuMZ_CoreEngine_jsQuickFunctions','framebuffer','Input_setupEventHandlers','isMagical','FINAL','7196StpASh','INBOUNCE','bitmapHeight','_list','createButtonAssistWindow','Window_Selectable_processTouch','isEnabled','_setupEventHandlers','itemEva','processHandling','OutlineColor','style','valueOutlineWidth','Window_StatusBase_drawActorLevel','allowShiftScrolling','Game_Picture_y','Tilemap_addShadow','_offsetX','forceStencil','Scene_Map_updateMainMultiply','Window_Selectable_cursorUp','getLastPluginCommandInterpreter','Sprite_AnimationMV_processTimingData','EQUAL','connected','horzJS','Game_Screen_initialize','isItem','TextFmt','ColorExpGauge2','makeFontBigger','drawAllParams','([\x5c+\x5c-]\x5cd+)([%％])>','buttonAssistOffset%1','targets','registerCommand','blockWidth','NUM','forceOutOfPlaytest','_stored_deathColor','getInputMultiButtonStrings','AutoStretch','GoldChange','_dummyWindow','determineSideButtonLayoutValid','eva','mpColor','_storedStack','buttonAssistWindowRect','_statusWindow','FontSmoothing','_sideButtonLayout','ColorMPGauge1','INCIRC','catchException','pop','enableDigitGrouping','Game_Action_itemEva','NUMPAD4','isOpenAndActive','sqrt','SkillMenu','MULTIPLY','RequireFocus','FontSize','SParamVocab7','Spriteset_Battle_createEnemies','RepositionEnemies','Window_Base_initialize','DOUBLE_QUOTE','parallaxes','result','pow','JSON','FTB','Game_Picture_initBasic','ButtonAssist','Game_Actor_paramBase','maxLvGaugeColor1','BattleManager_processEscape','powerUpColor','GroupDigits','commandWindowRect','fadeSpeed','statusEquipWindowRect','status','Scene_Map_initialize','xparamPlus1','onNameOk','updatePosition','createChildSprite','ModernControls','optionsWindowRect','MAX_SAFE_INTEGER','asin','BACKSPACE','drawActorNickname','KeyUnlisted','adjustSprite','text%1','NewGameCommonEvent','Window_Base_drawFace','MDR','_stored_powerUpColor','hpGaugeColor2','Game_Interpreter_command105','_pauseSignSprite','TextCodeNicknames','flush','altKey','INOUTCIRC','createFauxAnimationQueue','sparamFlatBonus','Control\x20Variables\x20Script\x20Error','updatePositionCoreEngineShakeHorz','Sprite_Gauge_currentValue','WASD','isAnimationForEach','_bitmap','buttonAssistKey4','getCombinedScrollingText','filter','paramchangeTextColor','min','_statusEquipWindow','layoutSettings','nw.gui','isPressed','sparamPlus2','itemPadding','outlineColorDmg','Input_clear','default','updateKeyText','reserveCommonEvent','currencyUnit','isBottomButtonMode','IconSParam4','Window_NameInput_processHandling','setFrame','VOLUME_DOWN','sparamRate2','processAlwaysEscape','performEscape','_lastPluginCommandInterpreter','GRD','CreateBattleSystemID','_backSprite2','process_VisuMZ_CoreEngine_Functions','processKeyboardDelete','targetContentsOpacity','Game_Event_isCollidedWithEvents','ConvertNumberToString','TRAIT_PARAM','gameTitle','enemy','_backSprite1','BannedWords','drawValue','mirror','BottomHelp','Speed','buttonAssistText1','MultiKeyFmt','drawCharacter','IconSParam5','ColorMaxLvGauge1','Game_Picture_move','subtitle','sparamPlus','isTriggered','members','clearRect','_shakePower','_CoreEngineSettings','buttonAssistKey5','ColorDeath','setActionState','categoryWindowRect','_realScale','PRINT','SystemSetWindowPadding','EnableMasking','_muteSound','playOk','ParseClassNotetags','Scene_Equip_create','Abbreviation','fillRect','WIN_OEM_CLEAR','HOME','ParseActorNotetags','_coreEasing','<%1\x20%2:[\x20]','isPlaying','visible','openURL','HASH','repositionCancelButtonSideButtonLayout','_movementWholeDuration','drawActorLevel','command357','index','faceWidth','NUMPAD1','targetY','Scene_Map_createMenuButton','RIGHT','_closing','isItemStyle','resetBattleSystem','Window_NumberInput_processDigitChange','SParamVocab1','mainFontSize','Color','INOUTELASTIC','KeySHIFT','_inputWindow','Scene_Title_drawGameTitle','processSoundTimings','StatusEquipBgType','string','_profileWindow','Scene_Unlisted','repositionEnemiesByResolution','PictureEraseAll','movePageButtonSideButtonLayout','_stored_tpGaugeColor1','_encounterCount','onMoveEnd','Game_Party_consumeItem','createWindowLayer','initVisuMZCoreEngine','_coreEngineShakeStyle','DefaultMode','slotWindowRect','_repositioned','ActorBgType','wait','_editWindow','fromCharCode','targetX','<JS\x20%1\x20%2:[\x20](.*)>','MAXMP','NUMPAD0','_refreshPauseSign','INCUBIC','helpAreaTopSideButtonLayout','BuyBgType','ScreenShake','makeTargetSprites','SkillTypeRect','Window_NameInput_refresh','STRUCT','ItemBackColor2','VisuMZ_2_BattleSystemFTB','nickname','_onKeyDown','REPLACE','_defaultStretchMode','ESC','Scene_Name_onInputOk','loadWindowskin','targetBackOpacity','drawGoldItemStyle','statusParamsWindowRect','_centerElement','sparamFlat2','_cacheScaleY','right','currentClass','OpenConsole','fillText','removeFauxAnimation','destroy','outlineColor','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','SlotBgType','isArrowPressed','hideButtonFromView','slice','ProfileRect','params','rowSpacing','SEMICOLON','isSideView','buttonAssistCancel','smoothSelect','nextLevelExp','MainMenu','areButtonsHidden','bind','Rate','Window_Base_drawIcon','Window_NameInput_cursorDown','keyMapper','disable','Game_Picture_x','SystemSetBattleSystem','IconXParam0','ConvertParams','_backgroundSprite','ONE_MINUS_SRC_ALPHA','width','NEAREST','setSideButtonLayout','_drawTextOutline','Spriteset_Base_update','StatusMenu','includes','processTouchModernControls','version','Window','IconXParam3','makeEncounterCount','hpColor','OutlineColorDmg','imageSmoothingEnabled','EXR','updatePositionCoreEngineShakeVert','resetFontSettings','removeChild','WIN_OEM_RESET','ShopMenu','_centerElementCoreEngine','iconHeight','touchUI','gaugeHeight','mainAreaBottom','VOLUME_UP','HIT','GoldBgType','_offsetY','goldWindowRect','battlebacks2','pagedownShowButton','MAX_GL_TEXTURES','SParamVocab0','itemSuccessRate','consumeItem','DEF','targetSpritePosition','loadGameImagesCoreEngine','CommandList','CTB','_registerKeyInput','524721IGMULn','_backgroundFilter','Bitmap_drawTextOutline','LESS_THAN','param','waiting','successRate','CANCEL','Scene_MenuBase_helpAreaTop','SystemSetFontSize','_isWindow','drawCircle','exp','NONCONVERT','onInputOk','CategoryRect','pictures','StartID','GoldIcon','ONE','updateCoreEasing','updateClose','Window_Base_drawText','ActorRect','onKeyDown','107zSSXvN','split','KEEP','ctrlKey','originalJS','mute','DisplayedParams','_commandWindow','BackOpacity','Bitmap_gradientFillRect','WIN_ICO_HELP','DOLLAR','([\x5c+\x5c-]\x5cd+)>','_paramPlus','toString','buttonAssistKey3','enemies','INBACK','_effectsContainer','Settings','statusWindowRect','_cache','createEnemies','applyForcedGameTroopSettingsCoreEngine','PixelateImageRendering','sin','format','mainCommandWidth','_buttonAssistWindow','_pagedownButton','drawGameTitle','xparamRate','processEscape','shift','createDimmerSprite','setBackgroundOpacity','NewGameCommonEventAll','MODECHANGE','meVolume','764609AOLTLf','isBusy','onKeyDownKeysF6F7','makeDocumentTitle','setActorHomeRepositioned','return\x200','_stored_tpCostColor','applyCoreEasing','SParameterFormula','_stored_tpGaugeColor2','processKeyboardDigitChange','evaluate','toLocaleString','Game_Map_setup','RevertPreserveNumbers','BaseTexture','AGI','evaded','battlebacks1','createDigits','BgFilename2','getCoreEngineScreenShakeStyle','PLAY','EXECUTE','process_VisuMZ_CoreEngine_Notetags','Game_BattlerBase_refresh','Subtitle','prototype','ItemBgType','COMMA','CustomParamIcons','NUMPAD6','Activated','platform','pictureId','Game_Action_itemHit','drawBackgroundRect','outlineColorGauge','IconParam2','ARRAYNUM','tpCostColor','mhp','VisuMZ_2_BattleSystemCTB','Param','DamageColor','Window_Base_drawCharacter','Version','isMaskingEnabled','setup','background','WIN_OEM_FINISH','exit','paramValueByName','WIN_OEM_FJ_ROYA','SParamVocab3','_baseTexture','height','_createInternalTextures','META','toLowerCase','BasicParameterFormula','updatePositionCoreEngine','processCursorMoveModernControls','original','DashToggleR','EditRect','getGamepads','IconSParam1','Scene_MenuBase_createPageButtons','buttonAssistKey%1','SkillTypeBgType','_digitGroupingEx','Flat','STENCIL_TEST','onDatabaseLoaded','Type','Bitmap_blt','makeCommandList','atbActive','_stored_expGaugeColor2','isOptionValid','Scene_Boot_onDatabaseLoaded','reservePlayTestNewGameCommonEvent','setupCoreEngine','MDF','DOWN','SideButtons','updateScene','KeyItemProtect','processCursorMove','replace','_mainSprite','Padding','PictureFilename','NameInputMessage','PERCENT','_hideButtons','Game_Interpreter_command111','onButtonImageLoad','setActorHome','RightMenus','makeCoreEngineCommandList','sparamFlatJS','expGaugeColor2','ATTN','refreshDimmerBitmap','xparamRate2','_fauxAnimationQueue','OUTQUAD','F15','MIN_SAFE_INTEGER','Game_BattlerBase_initMembers','_helpWindow','getColor','code','isTouchedInsideFrame','gaugeLineHeight','WIN_OEM_FJ_LOYA','paramPlus','WindowLayer_render','process_VisuMZ_CoreEngine_Settings','ColorCTGauge1','addChild','cursorPagedown','BgType','OpenURL','bgsVolume','transform','setEasingType','IconXParam4','editWindowRect','ColorManager_loadWindowskin','buyWindowRect','_numberWindow','sv_enemies','NameMenu','setMoveEasingType','endAnimation','_commandList','cursorRight','BTB','SceneManager_onKeyDown','pixelated','SceneManager_isGameActive','Bitmap_drawCircle','bitmap','DrawItemBackgroundJS','keyCode','createTitleButtons','printError','QUESTION_MARK','setClickHandler','isMenuButtonAssistEnabled','move','updateMainMultiply','cursorPageup','drawIcon','_maxDigits','createTextState','DigitGroupingGaugeSprites','isGamepadConnected','ColorTPCost','createCancelButton','1YSzCBg','setHome','inBattle','DefaultStyle','areButtonsOutsideMainUI','GameEnd','updateEffekseer','BoxMargin','updateDashToggle','isExpGaugeDrawn','setSideView','HelpBgType','buttonAssistText5','maxGold','isBottomHelpMode','ParseSkillNotetags','WIN_OEM_COPY','ARRAYSTRUCT','tileHeight','(\x5cd+)>','NUMPAD2','NUMPAD5','isNormalPriority','checkSmartEventCollision','StatusRect','_downArrowSprite','end','tpGaugeColor1','setMainFontSize','makeAutoBattleActions','PGUP','fontSize','IconSet','constructor','currentValue','levelUp','Window_Base_createTextState','_colorCache','_targetAnchor','blendFunc','updateOpacity'];const _0x281a=function(_0x434da3,_0x4aaa35){_0x434da3=_0x434da3-0x90;let _0x3cfd7e=_0x3cfd[_0x434da3];return _0x3cfd7e;};const _0x2fb0f3=_0x281a;(function(_0x2babd1,_0x350c46){const _0x40af0e=_0x281a;while(!![]){try{const _0x5a93f0=-parseInt(_0x40af0e(0x17f))+parseInt(_0x40af0e(0x509))*parseInt(_0x40af0e(0xec))+parseInt(_0x40af0e(0x2c4))*parseInt(_0x40af0e(0x2a9))+parseInt(_0x40af0e(0x1cb))*parseInt(_0x40af0e(0x43f))+parseInt(_0x40af0e(0x426))+-parseInt(_0x40af0e(0x466))+-parseInt(_0x40af0e(0x5de))*parseInt(_0x40af0e(0x2cc));if(_0x5a93f0===_0x350c46)break;else _0x2babd1['push'](_0x2babd1['shift']());}catch(_0x3e467e){_0x2babd1['push'](_0x2babd1['shift']());}}}(_0x3cfd,0xa0b7e));var label=_0x2fb0f3(0x248),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x3a1f1a){const _0x16fe3d=_0x2fb0f3;return _0x3a1f1a[_0x16fe3d(0x321)]&&_0x3a1f1a[_0x16fe3d(0x114)][_0x16fe3d(0x401)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0x4fd2d3,_0x16ceea){const _0x474c19=_0x2fb0f3;for(const _0x3eb635 in _0x16ceea){if(_0x3eb635['match'](/(.*):(.*)/i)){const _0x685f2c=String(RegExp['$1']),_0x1815c9=String(RegExp['$2'])[_0x474c19(0x65e)]()['trim']();let _0x3db98f,_0x10ad8a,_0x847e57;switch(_0x1815c9){case _0x474c19(0x2f1):_0x3db98f=_0x16ceea[_0x3eb635]!==''?Number(_0x16ceea[_0x3eb635]):0x0;break;case _0x474c19(0x48d):_0x10ad8a=_0x16ceea[_0x3eb635]!==''?JSON[_0x474c19(0x271)](_0x16ceea[_0x3eb635]):[],_0x3db98f=_0x10ad8a[_0x474c19(0x5a0)](_0x1a90d0=>Number(_0x1a90d0));break;case _0x474c19(0x119):_0x3db98f=_0x16ceea[_0x3eb635]!==''?eval(_0x16ceea[_0x3eb635]):null;break;case _0x474c19(0x604):_0x10ad8a=_0x16ceea[_0x3eb635]!==''?JSON[_0x474c19(0x271)](_0x16ceea[_0x3eb635]):[],_0x3db98f=_0x10ad8a[_0x474c19(0x5a0)](_0x2799e3=>eval(_0x2799e3));break;case _0x474c19(0x315):_0x3db98f=_0x16ceea[_0x3eb635]!==''?JSON[_0x474c19(0x271)](_0x16ceea[_0x3eb635]):'';break;case _0x474c19(0x144):_0x10ad8a=_0x16ceea[_0x3eb635]!==''?JSON[_0x474c19(0x271)](_0x16ceea[_0x3eb635]):[],_0x3db98f=_0x10ad8a[_0x474c19(0x5a0)](_0x4c3fdd=>JSON[_0x474c19(0x271)](_0x4c3fdd));break;case _0x474c19(0xc4):_0x3db98f=_0x16ceea[_0x3eb635]!==''?new Function(JSON[_0x474c19(0x271)](_0x16ceea[_0x3eb635])):new Function(_0x474c19(0x46b));break;case _0x474c19(0x64a):_0x10ad8a=_0x16ceea[_0x3eb635]!==''?JSON[_0x474c19(0x271)](_0x16ceea[_0x3eb635]):[],_0x3db98f=_0x10ad8a[_0x474c19(0x5a0)](_0x576096=>new Function(JSON[_0x474c19(0x271)](_0x576096)));break;case _0x474c19(0xf3):_0x3db98f=_0x16ceea[_0x3eb635]!==''?String(_0x16ceea[_0x3eb635]):'';break;case _0x474c19(0xd1):_0x10ad8a=_0x16ceea[_0x3eb635]!==''?JSON[_0x474c19(0x271)](_0x16ceea[_0x3eb635]):[],_0x3db98f=_0x10ad8a['map'](_0x342e33=>String(_0x342e33));break;case _0x474c19(0x3c9):_0x847e57=_0x16ceea[_0x3eb635]!==''?JSON['parse'](_0x16ceea[_0x3eb635]):{},_0x4fd2d3[_0x685f2c]={},VisuMZ[_0x474c19(0x3f8)](_0x4fd2d3[_0x685f2c],_0x847e57);continue;case _0x474c19(0x51a):_0x10ad8a=_0x16ceea[_0x3eb635]!==''?JSON[_0x474c19(0x271)](_0x16ceea[_0x3eb635]):[],_0x3db98f=_0x10ad8a[_0x474c19(0x5a0)](_0x221121=>VisuMZ['ConvertParams']({},JSON[_0x474c19(0x271)](_0x221121)));break;default:continue;}_0x4fd2d3[_0x685f2c]=_0x3db98f;}}return _0x4fd2d3;},(_0x2bcfc2=>{const _0x345331=_0x2fb0f3,_0x7bf596=_0x2bcfc2[_0x345331(0x12d)];for(const _0x4b7a48 of dependencies){if(!Imported[_0x4b7a48]){alert(_0x345331(0x643)[_0x345331(0x459)](_0x7bf596,_0x4b7a48)),SceneManager[_0x345331(0x499)]();break;}}const _0x460b03=_0x2bcfc2[_0x345331(0x114)];if(_0x460b03[_0x345331(0x573)](/\[Version[ ](.*?)\]/i)){const _0x234c3b=Number(RegExp['$1']);_0x234c3b!==VisuMZ[label][_0x345331(0x403)]&&(alert(_0x345331(0x533)[_0x345331(0x459)](_0x7bf596,_0x234c3b)),SceneManager['exit']());}if(_0x460b03[_0x345331(0x573)](/\[Tier[ ](\d+)\]/i)){const _0x48ec15=Number(RegExp['$1']);_0x48ec15<tier?(alert(_0x345331(0x3e0)[_0x345331(0x459)](_0x7bf596,_0x48ec15,tier)),SceneManager[_0x345331(0x499)]()):tier=Math[_0x345331(0x5e3)](_0x48ec15,tier);}VisuMZ[_0x345331(0x3f8)](VisuMZ[label][_0x345331(0x452)],_0x2bcfc2['parameters']);})(pluginData),VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x486)]={'PluginCommands':!![]},PluginManager[_0x2fb0f3(0x2ef)](pluginData[_0x2fb0f3(0x12d)],_0x2fb0f3(0x4e3),_0x184bdd=>{const _0x283e31=_0x2fb0f3;VisuMZ[_0x283e31(0x3f8)](_0x184bdd,_0x184bdd);const _0x3323bc=_0x184bdd[_0x283e31(0x118)];VisuMZ['openURL'](_0x3323bc);}),PluginManager[_0x2fb0f3(0x2ef)](pluginData[_0x2fb0f3(0x12d)],_0x2fb0f3(0x2f6),_0x1ec469=>{const _0x4ec5da=_0x2fb0f3;VisuMZ['ConvertParams'](_0x1ec469,_0x1ec469);const _0x4a41d4=_0x1ec469[_0x4ec5da(0x59a)]||0x0;$gameParty['gainGold'](_0x4a41d4);}),PluginManager[_0x2fb0f3(0x2ef)](pluginData['name'],_0x2fb0f3(0xa5),_0x96bb77=>{const _0x2bb936=_0x2fb0f3;VisuMZ['ConvertParams'](_0x96bb77,_0x96bb77);const _0x52f0ac=_0x96bb77[_0x2bb936(0x488)]||0x1,_0x4b6ba3=_0x96bb77[_0x2bb936(0x1fc)]||_0x2bb936(0x555),_0x55d3b6=$gameScreen['picture'](_0x52f0ac);_0x55d3b6&&_0x55d3b6['setEasingType'](_0x4b6ba3);}),PluginManager[_0x2fb0f3(0x2ef)](pluginData[_0x2fb0f3(0x12d)],_0x2fb0f3(0x3ad),_0x4335eb=>{const _0x198f27=_0x2fb0f3;for(let _0x5b579b=0x1;_0x5b579b<=0x64;_0x5b579b++){$gameScreen[_0x198f27(0x280)](_0x5b579b);}}),PluginManager[_0x2fb0f3(0x2ef)](pluginData[_0x2fb0f3(0x12d)],'PictureEraseRange',_0x528b08=>{const _0x3c6db5=_0x2fb0f3;VisuMZ['ConvertParams'](_0x528b08,_0x528b08);const _0x416286=Math[_0x3c6db5(0x347)](_0x528b08['StartID'],_0x528b08[_0x3c6db5(0x5c0)]),_0x29ff89=Math[_0x3c6db5(0x5e3)](_0x528b08[_0x3c6db5(0x437)],_0x528b08['EndingID']);for(let _0x3511c3=_0x416286;_0x3511c3<=_0x29ff89;_0x3511c3++){$gameScreen['erasePicture'](_0x3511c3);}}),PluginManager[_0x2fb0f3(0x2ef)](pluginData[_0x2fb0f3(0x12d)],'ScreenShake',_0x3526ef=>{const _0x1e3f7e=_0x2fb0f3;VisuMZ[_0x1e3f7e(0x3f8)](_0x3526ef,_0x3526ef);const _0x21ccfa=_0x3526ef[_0x1e3f7e(0x4b1)]||_0x1e3f7e(0xc7),_0x5d8b8a=_0x3526ef[_0x1e3f7e(0x25d)][_0x1e3f7e(0x572)](0x1,0x9),_0x439b33=_0x3526ef[_0x1e3f7e(0x36d)][_0x1e3f7e(0x572)](0x1,0x9),_0x1db43b=_0x3526ef[_0x1e3f7e(0x1a3)]||0x1,_0x4d0498=_0x3526ef[_0x1e3f7e(0xb4)];$gameScreen[_0x1e3f7e(0x2b0)](_0x21ccfa),$gameScreen[_0x1e3f7e(0x576)](_0x5d8b8a,_0x439b33,_0x1db43b);if(_0x4d0498){const _0x5dcc8d=$gameTemp[_0x1e3f7e(0x2e1)]();if(_0x5dcc8d)_0x5dcc8d[_0x1e3f7e(0x3ba)](_0x1db43b);}}),PluginManager['registerCommand'](pluginData[_0x2fb0f3(0x12d)],_0x2fb0f3(0x42f),_0x5f0053=>{const _0x57cde5=_0x2fb0f3;VisuMZ[_0x57cde5(0x3f8)](_0x5f0053,_0x5f0053);const _0x30bee4=_0x5f0053[_0x57cde5(0x5aa)]||0x1;$gameSystem[_0x57cde5(0x525)](_0x30bee4);}),PluginManager[_0x2fb0f3(0x2ef)](pluginData['name'],'SystemSetSideView',_0x5a8b02=>{const _0x4bfa67=_0x2fb0f3;if($gameParty['inBattle']())return;VisuMZ[_0x4bfa67(0x3f8)](_0x5a8b02,_0x5a8b02);const _0x243d6a=_0x5a8b02[_0x4bfa67(0x5aa)];if(_0x243d6a['match'](/Front/i))$gameSystem[_0x4bfa67(0x513)](![]);else _0x243d6a['match'](/Side/i)?$gameSystem[_0x4bfa67(0x513)](!![]):$gameSystem['setSideView'](!$gameSystem[_0x4bfa67(0x3e9)]());}),PluginManager['registerCommand'](pluginData['name'],_0x2fb0f3(0x141),_0x3e5bec=>{const _0x3bc0c3=_0x2fb0f3;if($gameParty[_0x3bc0c3(0x50b)]())return;VisuMZ[_0x3bc0c3(0x3f8)](_0x3e5bec,_0x3e5bec);const _0x5e5d47=[_0x3bc0c3(0x1d9),'bgs','me','se'];for(const _0x15fb0c of _0x5e5d47){const _0x186780=_0x3e5bec[_0x15fb0c],_0x16bcac=_0x3bc0c3(0x2b5)[_0x3bc0c3(0x459)](_0x15fb0c);for(const _0x48028d of _0x186780){console['log'](_0x16bcac,_0x48028d),AudioManager[_0x3bc0c3(0x27c)](_0x16bcac,_0x48028d);}}}),PluginManager[_0x2fb0f3(0x2ef)](pluginData[_0x2fb0f3(0x12d)],_0x2fb0f3(0x284),_0x21755c=>{const _0xd62fba=_0x2fb0f3;if($gameParty[_0xd62fba(0x50b)]())return;VisuMZ[_0xd62fba(0x3f8)](_0x21755c,_0x21755c);const _0xace48c=[_0xd62fba(0x595),_0xd62fba(0x478),_0xd62fba(0x41a),'characters',_0xd62fba(0x44f),_0xd62fba(0x11a),'parallaxes',_0xd62fba(0x436),_0xd62fba(0x539),'sv_enemies',_0xd62fba(0x162),_0xd62fba(0x5b1),_0xd62fba(0x534),'titles2'];for(const _0x466ad9 of _0xace48c){const _0x151aee=_0x21755c[_0x466ad9],_0x3372eb=_0xd62fba(0x5c9)[_0xd62fba(0x459)](_0x466ad9);for(const _0x5399ab of _0x151aee){ImageManager[_0xd62fba(0x659)](_0x3372eb,_0x5399ab);}}}),PluginManager['registerCommand'](pluginData[_0x2fb0f3(0x12d)],_0x2fb0f3(0x3f6),_0x3a1baa=>{const _0x232c78=_0x2fb0f3;if($gameParty[_0x232c78(0x50b)]())return;VisuMZ[_0x232c78(0x3f8)](_0x3a1baa,_0x3a1baa);const _0x442ac3=_0x3a1baa[_0x232c78(0x5aa)]['toUpperCase']()[_0x232c78(0x1b7)](),_0x4a78c3=VisuMZ['CoreEngine'][_0x232c78(0x35e)](_0x442ac3);$gameSystem[_0x232c78(0x606)](_0x4a78c3);}),VisuMZ[_0x2fb0f3(0x248)]['CreateBattleSystemID']=function(_0x4ff451){const _0x30ce1d=_0x2fb0f3;_0x4ff451=_0x4ff451||'DATABASE',_0x4ff451=String(_0x4ff451)[_0x30ce1d(0x65e)]()[_0x30ce1d(0x1b7)]();switch(_0x4ff451){case _0x30ce1d(0x586):return 0x0;case _0x30ce1d(0x5cb):Imported[_0x30ce1d(0x5d0)]&&(ConfigManager[_0x30ce1d(0x4b4)]=!![]);return 0x1;case _0x30ce1d(0x214):Imported[_0x30ce1d(0x5d0)]&&(ConfigManager[_0x30ce1d(0x4b4)]=![]);return 0x2;case _0x30ce1d(0x424):if(Imported['VisuMZ_2_BattleSystemCTB'])return'CTB';break;case _0x30ce1d(0x1bd):if(Imported[_0x30ce1d(0x1a0)])return _0x30ce1d(0x1bd);break;case _0x30ce1d(0x4f2):if(Imported[_0x30ce1d(0x208)])return _0x30ce1d(0x4f2);break;case _0x30ce1d(0x316):if(Imported[_0x30ce1d(0x3cb)])return'FTB';break;}return $dataSystem['battleSystem'];},PluginManager[_0x2fb0f3(0x2ef)](pluginData[_0x2fb0f3(0x12d)],_0x2fb0f3(0x381),_0x551a55=>{const _0x47235c=_0x2fb0f3;VisuMZ['ConvertParams'](_0x551a55,_0x551a55);const _0x35d70e=_0x551a55[_0x47235c(0x5aa)]||0x1;$gameSystem[_0x47235c(0x535)](_0x35d70e);}),VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x4b7)]=Scene_Boot['prototype'][_0x2fb0f3(0x4b0)],Scene_Boot[_0x2fb0f3(0x481)][_0x2fb0f3(0x4b0)]=function(){const _0x543968=_0x2fb0f3;VisuMZ[_0x543968(0x248)][_0x543968(0x4b7)][_0x543968(0x29c)](this),this[_0x543968(0x163)](),this[_0x543968(0x47e)](),this[_0x543968(0x4de)](),this['process_VisuMZ_CoreEngine_Functions'](),this['process_VisuMZ_CoreEngine_CustomParameters'](),VisuMZ[_0x543968(0x641)]();},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x262)]={},Scene_Boot['prototype'][_0x2fb0f3(0x163)]=function(){const _0xde7614=_0x2fb0f3,_0x3da416=[_0xde7614(0x26b),_0xde7614(0x3bf),'ATK','DEF',_0xde7614(0x146),_0xde7614(0x4ba),_0xde7614(0x476),_0xde7614(0x605)],_0xd7c774=[_0xde7614(0x416),'EVA',_0xde7614(0xca),_0xde7614(0x635),_0xde7614(0x583),_0xde7614(0x551),_0xde7614(0x5d1),_0xde7614(0x56a),_0xde7614(0x2b9),_0xde7614(0x63c)],_0x456ed4=['TGR',_0xde7614(0x35d),_0xde7614(0x1f5),_0xde7614(0x130),'MCR',_0xde7614(0xf1),'PDR',_0xde7614(0x332),_0xde7614(0x2c1),_0xde7614(0x40a)],_0xf7aee3=[_0x3da416,_0xd7c774,_0x456ed4],_0x107442=[_0xde7614(0x1f3),_0xde7614(0x23c),'Plus2',_0xde7614(0x1ea),_0xde7614(0x3f0),'Rate1',_0xde7614(0x296),_0xde7614(0x4ae),_0xde7614(0x5f6),_0xde7614(0x5ae)];for(const _0x242fd6 of _0xf7aee3){let _0x4c35ed='';if(_0x242fd6===_0x3da416)_0x4c35ed=_0xde7614(0x42a);if(_0x242fd6===_0xd7c774)_0x4c35ed=_0xde7614(0x15f);if(_0x242fd6===_0x456ed4)_0x4c35ed=_0xde7614(0x61a);for(const _0x340b40 of _0x107442){let _0x269adb='%1%2'[_0xde7614(0x459)](_0x4c35ed,_0x340b40);VisuMZ[_0xde7614(0x248)][_0xde7614(0x262)][_0x269adb]=[],VisuMZ[_0xde7614(0x248)][_0xde7614(0x262)][_0x269adb+'JS']=[];let _0x14d6d0=_0xde7614(0x38d);if([_0xde7614(0x1f3),_0xde7614(0x4ae)][_0xde7614(0x401)](_0x340b40))_0x14d6d0+=_0xde7614(0x44b);else{if([_0xde7614(0x23c),_0xde7614(0x5f6)][_0xde7614(0x401)](_0x340b40))_0x14d6d0+=_0xde7614(0x2ec);else{if([_0xde7614(0x55a),_0xde7614(0x5ae)][_0xde7614(0x401)](_0x340b40))_0x14d6d0+=_0xde7614(0xcd);else{if(_0x340b40===_0xde7614(0x1ea))_0x14d6d0+=_0xde7614(0x51c);else{if(_0x340b40===_0xde7614(0x56b))_0x14d6d0+=_0xde7614(0x192);else _0x340b40===_0xde7614(0x296)&&(_0x14d6d0+='(\x5cd+\x5c.?\x5cd+)>');}}}}for(const _0x334c36 of _0x242fd6){let _0x2dfdd1=_0x340b40[_0xde7614(0x4c0)](/[\d+]/g,'')[_0xde7614(0x65e)]();const _0x11ce96=_0x14d6d0[_0xde7614(0x459)](_0x334c36,_0x2dfdd1);VisuMZ[_0xde7614(0x248)][_0xde7614(0x262)][_0x269adb][_0xde7614(0x653)](new RegExp(_0x11ce96,'i'));const _0x11b767=_0xde7614(0x3be)['format'](_0x334c36,_0x2dfdd1);VisuMZ[_0xde7614(0x248)][_0xde7614(0x262)][_0x269adb+'JS']['push'](new RegExp(_0x11b767,'i'));}}}},Scene_Boot[_0x2fb0f3(0x481)][_0x2fb0f3(0x47e)]=function(){const _0x9e7cd7=_0x2fb0f3;if(VisuMZ[_0x9e7cd7(0x641)])return;},Scene_Boot['prototype'][_0x2fb0f3(0x4de)]=function(){const _0x24b1e6=_0x2fb0f3;VisuMZ[_0x24b1e6(0x248)][_0x24b1e6(0x452)]['QoL'][_0x24b1e6(0x3db)]&&VisuMZ[_0x24b1e6(0x138)](!![]);VisuMZ[_0x24b1e6(0x248)][_0x24b1e6(0x452)][_0x24b1e6(0x20f)][_0x24b1e6(0x327)]&&(Input['keyMapper'][0x23]=_0x24b1e6(0x523),Input[_0x24b1e6(0x3f3)][0x24]=_0x24b1e6(0x21e));if(VisuMZ['CoreEngine'][_0x24b1e6(0x452)][_0x24b1e6(0x318)]){const _0x31e7e6=VisuMZ[_0x24b1e6(0x248)][_0x24b1e6(0x452)][_0x24b1e6(0x318)];_0x31e7e6[_0x24b1e6(0x3a4)]=_0x31e7e6['KeySHIFT']||_0x24b1e6(0x21f),_0x31e7e6[_0x24b1e6(0x111)]=_0x31e7e6[_0x24b1e6(0x111)]||'\x5c}❪TAB❫\x5c{';}VisuMZ[_0x24b1e6(0x248)][_0x24b1e6(0x452)][_0x24b1e6(0x652)][_0x24b1e6(0x340)]&&(Input[_0x24b1e6(0x3f3)][0x57]='up',Input[_0x24b1e6(0x3f3)][0x41]=_0x24b1e6(0x549),Input[_0x24b1e6(0x3f3)][0x53]='down',Input['keyMapper'][0x44]='right',Input['keyMapper'][0x45]=_0x24b1e6(0x63a)),VisuMZ[_0x24b1e6(0x248)][_0x24b1e6(0x452)][_0x24b1e6(0x652)][_0x24b1e6(0x4a6)]&&(Input[_0x24b1e6(0x3f3)][0x52]=_0x24b1e6(0x5d9));},Scene_Boot[_0x2fb0f3(0x481)][_0x2fb0f3(0x360)]=function(){const _0x11a03e=_0x2fb0f3;this[_0x11a03e(0x2c7)]();},Scene_Boot[_0x2fb0f3(0x481)][_0x2fb0f3(0x2c7)]=function(){const _0x295e76=_0x2fb0f3,_0x408bcc=VisuMZ['CoreEngine'][_0x295e76(0x452)][_0x295e76(0x552)];for(const _0x3807e5 of _0x408bcc){const _0x417000=_0x3807e5[_0x295e76(0x5a7)]['replace'](/[ ]/g,''),_0x2105a6=_0x3807e5[_0x295e76(0x57e)];VisuMZ[_0x295e76(0x248)]['createJsQuickFunction'](_0x417000,_0x2105a6);}},VisuMZ[_0x2fb0f3(0x248)]['createJsQuickFunction']=function(_0x53a11a,_0x424f82){const _0xe75573=_0x2fb0f3;if(!!window[_0x53a11a]){if($gameTemp[_0xe75573(0x655)]())console[_0xe75573(0x205)](_0xe75573(0x1c5)[_0xe75573(0x459)](_0x53a11a));}const _0x362910=_0xe75573(0x29f)[_0xe75573(0x459)](_0x53a11a,_0x424f82);window[_0x53a11a]=new Function(_0x362910);},Scene_Boot['prototype']['process_VisuMZ_CoreEngine_CustomParameters']=function(){const _0x386b8c=_0x2fb0f3,_0x1989e1=VisuMZ[_0x386b8c(0x248)][_0x386b8c(0x452)]['CustomParam'];if(!_0x1989e1)return;for(const _0x395c16 of _0x1989e1){if(!_0x395c16)continue;VisuMZ[_0x386b8c(0x248)][_0x386b8c(0x24d)](_0x395c16);}},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x5a5)]={},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x484)]={},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x1b5)]={},VisuMZ[_0x2fb0f3(0x248)]['CustomParamAbb']={},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x24d)]=function(_0x1361d8){const _0xfb264e=_0x2fb0f3,_0x686b1=_0x1361d8[_0xfb264e(0x387)],_0x578236=_0x1361d8['ParamName'],_0x40b42e=_0x1361d8['Icon'],_0x3695df=_0x1361d8[_0xfb264e(0x4b1)],_0x1a7591=new Function(_0x1361d8['ValueJS']);VisuMZ[_0xfb264e(0x248)]['CustomParamNames'][_0x686b1[_0xfb264e(0x65e)]()[_0xfb264e(0x1b7)]()]=_0x578236,VisuMZ[_0xfb264e(0x248)]['CustomParamIcons'][_0x686b1[_0xfb264e(0x65e)]()[_0xfb264e(0x1b7)]()]=_0x40b42e,VisuMZ['CoreEngine'][_0xfb264e(0x1b5)][_0x686b1[_0xfb264e(0x65e)]()[_0xfb264e(0x1b7)]()]=_0x3695df,VisuMZ[_0xfb264e(0x248)][_0xfb264e(0x253)][_0x686b1['toUpperCase']()[_0xfb264e(0x1b7)]()]=_0x686b1,Object[_0xfb264e(0x21c)](Game_BattlerBase['prototype'],_0x686b1,{'get'(){const _0x3797d3=_0xfb264e,_0x1730ff=_0x1a7591['call'](this);return _0x3695df===_0x3797d3(0x153)?Math[_0x3797d3(0x132)](_0x1730ff):_0x1730ff;}});},VisuMZ[_0x2fb0f3(0x641)]=function(){const _0x4edcc8=_0x2fb0f3;for(const _0x794c42 of $dataActors){if(_0x794c42)VisuMZ[_0x4edcc8(0x38b)](_0x794c42);}for(const _0x52f159 of $dataClasses){if(_0x52f159)VisuMZ[_0x4edcc8(0x385)](_0x52f159);}for(const _0x24d917 of $dataSkills){if(_0x24d917)VisuMZ['ParseSkillNotetags'](_0x24d917);}for(const _0x327be9 of $dataItems){if(_0x327be9)VisuMZ[_0x4edcc8(0x1f7)](_0x327be9);}for(const _0x390c4e of $dataWeapons){if(_0x390c4e)VisuMZ[_0x4edcc8(0x29b)](_0x390c4e);}for(const _0x51ceeb of $dataArmors){if(_0x51ceeb)VisuMZ[_0x4edcc8(0x607)](_0x51ceeb);}for(const _0xb4d9e2 of $dataEnemies){if(_0xb4d9e2)VisuMZ[_0x4edcc8(0x2b3)](_0xb4d9e2);}for(const _0x20728b of $dataStates){if(_0x20728b)VisuMZ[_0x4edcc8(0x5b6)](_0x20728b);}for(const _0xbaf6b3 of $dataTilesets){if(_0xbaf6b3)VisuMZ['ParseTilesetNotetags'](_0xbaf6b3);}},VisuMZ[_0x2fb0f3(0x38b)]=function(_0x5b9785){},VisuMZ[_0x2fb0f3(0x385)]=function(_0x294137){},VisuMZ[_0x2fb0f3(0x518)]=function(_0x2b187e){},VisuMZ[_0x2fb0f3(0x1f7)]=function(_0x4241e7){},VisuMZ[_0x2fb0f3(0x29b)]=function(_0x4a1e59){},VisuMZ['ParseArmorNotetags']=function(_0x10fdc3){},VisuMZ[_0x2fb0f3(0x2b3)]=function(_0x14fcfb){},VisuMZ['ParseStateNotetags']=function(_0x418d06){},VisuMZ[_0x2fb0f3(0x200)]=function(_0x1ca234){},VisuMZ['CoreEngine'][_0x2fb0f3(0x38b)]=VisuMZ[_0x2fb0f3(0x38b)],VisuMZ[_0x2fb0f3(0x38b)]=function(_0xb3f2cf){const _0x100fad=_0x2fb0f3;VisuMZ[_0x100fad(0x248)][_0x100fad(0x38b)][_0x100fad(0x29c)](this,_0xb3f2cf);const _0x4ecfe0=_0xb3f2cf['note'];if(_0x4ecfe0['match'](/<MAX LEVEL:[ ](\d+)>/i)){_0xb3f2cf[_0x100fad(0x11e)]=Number(RegExp['$1']);if(_0xb3f2cf[_0x100fad(0x11e)]===0x0)_0xb3f2cf[_0x100fad(0x11e)]=Number[_0x100fad(0x329)];}_0x4ecfe0[_0x100fad(0x573)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0xb3f2cf[_0x100fad(0x54b)]=Math[_0x100fad(0x347)](Number(RegExp['$1']),_0xb3f2cf[_0x100fad(0x11e)]));},VisuMZ[_0x2fb0f3(0x248)]['ParseClassNotetags']=VisuMZ[_0x2fb0f3(0x385)],VisuMZ[_0x2fb0f3(0x385)]=function(_0x505965){const _0x287891=_0x2fb0f3;VisuMZ[_0x287891(0x248)][_0x287891(0x385)][_0x287891(0x29c)](this,_0x505965);if(_0x505965['learnings'])for(const _0x550046 of _0x505965['learnings']){_0x550046[_0x287891(0x22e)]['match'](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x550046[_0x287891(0x5e5)]=Math['max'](Number(RegExp['$1']),0x1));}},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x2b3)]=VisuMZ[_0x2fb0f3(0x2b3)],VisuMZ[_0x2fb0f3(0x2b3)]=function(_0x46a99f){const _0x277e59=_0x2fb0f3;VisuMZ['CoreEngine'][_0x277e59(0x2b3)][_0x277e59(0x29c)](this,_0x46a99f),_0x46a99f[_0x277e59(0x5e5)]=0x1;const _0x4254f6=_0x46a99f[_0x277e59(0x22e)];if(_0x4254f6[_0x277e59(0x573)](/<LEVEL:[ ](\d+)>/i))_0x46a99f['level']=Number(RegExp['$1']);if(_0x4254f6[_0x277e59(0x573)](/<MAXHP:[ ](\d+)>/i))_0x46a99f[_0x277e59(0x3e6)][0x0]=Number(RegExp['$1']);if(_0x4254f6[_0x277e59(0x573)](/<MAXMP:[ ](\d+)>/i))_0x46a99f[_0x277e59(0x3e6)][0x1]=Number(RegExp['$1']);if(_0x4254f6[_0x277e59(0x573)](/<ATK:[ ](\d+)>/i))_0x46a99f['params'][0x2]=Number(RegExp['$1']);if(_0x4254f6['match'](/<DEF:[ ](\d+)>/i))_0x46a99f['params'][0x3]=Number(RegExp['$1']);if(_0x4254f6[_0x277e59(0x573)](/<MAT:[ ](\d+)>/i))_0x46a99f[_0x277e59(0x3e6)][0x4]=Number(RegExp['$1']);if(_0x4254f6[_0x277e59(0x573)](/<MDF:[ ](\d+)>/i))_0x46a99f[_0x277e59(0x3e6)][0x5]=Number(RegExp['$1']);if(_0x4254f6[_0x277e59(0x573)](/<AGI:[ ](\d+)>/i))_0x46a99f[_0x277e59(0x3e6)][0x6]=Number(RegExp['$1']);if(_0x4254f6[_0x277e59(0x573)](/<LUK:[ ](\d+)>/i))_0x46a99f['params'][0x7]=Number(RegExp['$1']);if(_0x4254f6[_0x277e59(0x573)](/<EXP:[ ](\d+)>/i))_0x46a99f[_0x277e59(0x432)]=Number(RegExp['$1']);if(_0x4254f6[_0x277e59(0x573)](/<GOLD:[ ](\d+)>/i))_0x46a99f['gold']=Number(RegExp['$1']);},VisuMZ['CoreEngine']['Graphics_defaultStretchMode']=Graphics[_0x2fb0f3(0x3cf)],Graphics[_0x2fb0f3(0x3cf)]=function(){const _0x42558d=_0x2fb0f3;switch(VisuMZ[_0x42558d(0x248)]['Settings'][_0x42558d(0x20f)][_0x42558d(0x2f5)]){case'stretch':return!![];case'normal':return![];default:return VisuMZ['CoreEngine']['Graphics_defaultStretchMode']['call'](this);}},VisuMZ[_0x2fb0f3(0x248)]['Graphics_printError']=Graphics[_0x2fb0f3(0x4fb)],Graphics[_0x2fb0f3(0x4fb)]=function(_0x443c9e,_0x506e0e,_0x62bc9d=null){const _0x1c9100=_0x2fb0f3;VisuMZ[_0x1c9100(0x248)][_0x1c9100(0x5dc)][_0x1c9100(0x29c)](this,_0x443c9e,_0x506e0e,_0x62bc9d),VisuMZ[_0x1c9100(0x138)](![]);},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x261)]=Graphics[_0x2fb0f3(0x3d6)],Graphics[_0x2fb0f3(0x3d6)]=function(_0x5ea912){const _0xb78e33=_0x2fb0f3;VisuMZ[_0xb78e33(0x248)][_0xb78e33(0x261)]['call'](this,_0x5ea912),this[_0xb78e33(0x410)](_0x5ea912);},Graphics['_centerElementCoreEngine']=function(_0x56d9e7){const _0x5eb8d2=_0x2fb0f3;VisuMZ[_0x5eb8d2(0x248)][_0x5eb8d2(0x452)][_0x5eb8d2(0x20f)][_0x5eb8d2(0x2fe)]&&(_0x56d9e7['style'][_0x5eb8d2(0x62e)]=_0x5eb8d2(0x62a));VisuMZ[_0x5eb8d2(0x248)][_0x5eb8d2(0x452)][_0x5eb8d2(0x20f)]['PixelateImageRendering']&&(_0x56d9e7[_0x5eb8d2(0x2d7)][_0x5eb8d2(0x252)]=_0x5eb8d2(0x4f4));const _0x17e4e3=Math[_0x5eb8d2(0x5e3)](0x0,Math[_0x5eb8d2(0x15d)](_0x56d9e7['width']*this['_realScale'])),_0xc2b801=Math[_0x5eb8d2(0x5e3)](0x0,Math[_0x5eb8d2(0x15d)](_0x56d9e7[_0x5eb8d2(0x49e)]*this[_0x5eb8d2(0x37f)]));_0x56d9e7[_0x5eb8d2(0x2d7)][_0x5eb8d2(0x3fb)]=_0x17e4e3+'px',_0x56d9e7['style'][_0x5eb8d2(0x49e)]=_0xc2b801+'px';},Bitmap[_0x2fb0f3(0x481)][_0x2fb0f3(0x5b8)]=function(){const _0x11d645=_0x2fb0f3;this[_0x11d645(0x2a3)]=!![];},VisuMZ['CoreEngine'][_0x2fb0f3(0x5af)]=Sprite[_0x2fb0f3(0x481)]['destroy'],Sprite['prototype']['destroy']=function(){const _0x11ad2f=_0x2fb0f3;VisuMZ[_0x11ad2f(0x248)][_0x11ad2f(0x5af)][_0x11ad2f(0x29c)](this),this['destroyCoreEngineMarkedBitmaps']();},Sprite[_0x2fb0f3(0x481)]['destroyCoreEngineMarkedBitmaps']=function(){const _0x2f6e4f=_0x2fb0f3;if(!this[_0x2f6e4f(0x4f7)])return;if(!this['bitmap'][_0x2f6e4f(0x2a3)])return;this[_0x2f6e4f(0x4f7)][_0x2f6e4f(0x49d)]&&!this[_0x2f6e4f(0x342)][_0x2f6e4f(0x49d)]['destroyed']&&this[_0x2f6e4f(0x4f7)][_0x2f6e4f(0x3de)]();},VisuMZ[_0x2fb0f3(0x248)]['Bitmap_resize']=Bitmap['prototype'][_0x2fb0f3(0x636)],Bitmap[_0x2fb0f3(0x481)][_0x2fb0f3(0x636)]=function(_0x512b0b,_0x926159){const _0x2f7766=_0x2fb0f3;VisuMZ[_0x2f7766(0x248)][_0x2f7766(0x63d)][_0x2f7766(0x29c)](this,_0x512b0b,_0x926159),this[_0x2f7766(0x5b8)]();},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x4b2)]=Bitmap[_0x2fb0f3(0x481)][_0x2fb0f3(0x243)],Bitmap[_0x2fb0f3(0x481)][_0x2fb0f3(0x243)]=function(_0x40636e,_0x172d2e,_0x189c6f,_0x158713,_0x54b2e6,_0x280bfb,_0x2646a0,_0x39e0ab,_0x26a7c1){const _0x50c1f1=_0x2fb0f3;VisuMZ[_0x50c1f1(0x248)]['Bitmap_blt'][_0x50c1f1(0x29c)](this,_0x40636e,_0x172d2e,_0x189c6f,_0x158713,_0x54b2e6,_0x280bfb,_0x2646a0,_0x39e0ab,_0x26a7c1),this[_0x50c1f1(0x5b8)]();},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x246)]=Bitmap[_0x2fb0f3(0x481)][_0x2fb0f3(0x378)],Bitmap[_0x2fb0f3(0x481)][_0x2fb0f3(0x378)]=function(_0x2cc7b1,_0x1ec28b,_0x451fdf,_0x480610){const _0x42d5cd=_0x2fb0f3;VisuMZ[_0x42d5cd(0x248)]['Bitmap_clearRect'][_0x42d5cd(0x29c)](this,_0x2cc7b1,_0x1ec28b,_0x451fdf,_0x480610),this[_0x42d5cd(0x5b8)]();},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x161)]=Bitmap[_0x2fb0f3(0x481)]['fillRect'],Bitmap[_0x2fb0f3(0x481)]['fillRect']=function(_0x25d2ed,_0x747334,_0x103f0f,_0x26378b,_0x5362f3){const _0x2668cb=_0x2fb0f3;VisuMZ[_0x2668cb(0x248)][_0x2668cb(0x161)][_0x2668cb(0x29c)](this,_0x25d2ed,_0x747334,_0x103f0f,_0x26378b,_0x5362f3),this[_0x2668cb(0x5b8)]();},VisuMZ['CoreEngine'][_0x2fb0f3(0x18d)]=Bitmap[_0x2fb0f3(0x481)][_0x2fb0f3(0x5e6)],Bitmap[_0x2fb0f3(0x481)][_0x2fb0f3(0x5e6)]=function(_0x459af8,_0x5ad79c,_0x30d8f8,_0x41b60a,_0x99cdd7){const _0x1d2b43=_0x2fb0f3;VisuMZ[_0x1d2b43(0x248)][_0x1d2b43(0x18d)]['call'](this,_0x459af8,_0x5ad79c,_0x30d8f8,_0x41b60a,_0x99cdd7),this['markCoreEngineModified']();},VisuMZ['CoreEngine'][_0x2fb0f3(0x448)]=Bitmap['prototype'][_0x2fb0f3(0x278)],Bitmap[_0x2fb0f3(0x481)]['gradientFillRect']=function(_0x2d1d98,_0x5c9cb8,_0xd429b,_0x1c72ee,_0x406457,_0x38ab93,_0x1980c7){const _0x466829=_0x2fb0f3;VisuMZ[_0x466829(0x248)][_0x466829(0x448)][_0x466829(0x29c)](this,_0x2d1d98,_0x5c9cb8,_0xd429b,_0x1c72ee,_0x406457,_0x38ab93,_0x1980c7),this[_0x466829(0x5b8)]();},VisuMZ['CoreEngine'][_0x2fb0f3(0x4f6)]=Bitmap[_0x2fb0f3(0x481)][_0x2fb0f3(0x431)],Bitmap[_0x2fb0f3(0x481)][_0x2fb0f3(0x431)]=function(_0x3dd8a0,_0x24ee37,_0x518fc9,_0x585b26){const _0x501681=_0x2fb0f3;_0x3dd8a0=Math[_0x501681(0x132)](_0x3dd8a0),_0x24ee37=Math[_0x501681(0x132)](_0x24ee37),_0x518fc9=Math[_0x501681(0x132)](_0x518fc9),VisuMZ[_0x501681(0x248)]['Bitmap_drawCircle'][_0x501681(0x29c)](this,_0x3dd8a0,_0x24ee37,_0x518fc9,_0x585b26),this[_0x501681(0x5b8)]();},VisuMZ[_0x2fb0f3(0x248)]['Bitmap_measureTextWidth']=Bitmap['prototype'][_0x2fb0f3(0xa3)],Bitmap['prototype'][_0x2fb0f3(0xa3)]=function(_0x1c7fbf){const _0x119e9b=_0x2fb0f3;return Math[_0x119e9b(0x132)](VisuMZ[_0x119e9b(0x248)][_0x119e9b(0xa1)][_0x119e9b(0x29c)](this,_0x1c7fbf));},VisuMZ['CoreEngine']['Bitmap_drawText']=Bitmap[_0x2fb0f3(0x481)][_0x2fb0f3(0x544)],Bitmap[_0x2fb0f3(0x481)][_0x2fb0f3(0x544)]=function(_0x4c3dfc,_0x4c57f9,_0x1a7537,_0x4bd953,_0x3b3931,_0x496880){const _0x6824b1=_0x2fb0f3;_0x4c57f9=Math[_0x6824b1(0x132)](_0x4c57f9),_0x1a7537=Math[_0x6824b1(0x132)](_0x1a7537),_0x4bd953=Math[_0x6824b1(0x132)](_0x4bd953),_0x3b3931=Math[_0x6824b1(0x132)](_0x3b3931),VisuMZ['CoreEngine'][_0x6824b1(0x5f8)][_0x6824b1(0x29c)](this,_0x4c3dfc,_0x4c57f9,_0x1a7537,_0x4bd953,_0x3b3931,_0x496880),this[_0x6824b1(0x5b8)]();},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x428)]=Bitmap[_0x2fb0f3(0x481)][_0x2fb0f3(0x3fe)],Bitmap['prototype'][_0x2fb0f3(0x3fe)]=function(_0x4acb80,_0x467bec,_0x18eae1,_0x3359fe){const _0x5d9f74=_0x2fb0f3;VisuMZ[_0x5d9f74(0x248)][_0x5d9f74(0x452)]['QoL']['FontShadows']?this[_0x5d9f74(0xd6)](_0x4acb80,_0x467bec,_0x18eae1,_0x3359fe):VisuMZ[_0x5d9f74(0x248)][_0x5d9f74(0x428)]['call'](this,_0x4acb80,_0x467bec,_0x18eae1,_0x3359fe);},Bitmap[_0x2fb0f3(0x481)][_0x2fb0f3(0xd6)]=function(_0x33fbdc,_0x1c9e80,_0x1904b2,_0x113b88){const _0x4a5072=_0x2fb0f3,_0x194d04=this['context'];_0x194d04[_0x4a5072(0x2ac)]=this[_0x4a5072(0x3df)],_0x194d04[_0x4a5072(0x3dc)](_0x33fbdc,_0x1c9e80+0x2,_0x1904b2+0x2,_0x113b88);},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x34f)]=Input[_0x2fb0f3(0x11d)],Input[_0x2fb0f3(0x11d)]=function(){const _0xfbce02=_0x2fb0f3;VisuMZ[_0xfbce02(0x248)][_0xfbce02(0x34f)][_0xfbce02(0x29c)](this),this['_inputString']=undefined,this[_0xfbce02(0x1a2)]=undefined,this[_0xfbce02(0x5f1)]=Input['keyRepeatWait'];},VisuMZ[_0x2fb0f3(0x248)]['Input_update']=Input[_0x2fb0f3(0x231)],Input['update']=function(){const _0x4db5e1=_0x2fb0f3;VisuMZ[_0x4db5e1(0x248)]['Input_update']['call'](this);if(this[_0x4db5e1(0x5f1)])this[_0x4db5e1(0x5f1)]--;},VisuMZ['CoreEngine']['Input_pollGamepads']=Input['_pollGamepads'],Input[_0x2fb0f3(0x220)]=function(){const _0x42f899=_0x2fb0f3;if(this[_0x42f899(0x5f1)])return;VisuMZ[_0x42f899(0x248)][_0x42f899(0x143)]['call'](this);},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x2c9)]=Input['_setupEventHandlers'],Input[_0x2fb0f3(0x2d3)]=function(){const _0x2ae9ee=_0x2fb0f3;VisuMZ[_0x2ae9ee(0x248)]['Input_setupEventHandlers']['call'](this),document['addEventListener']('keypress',this[_0x2ae9ee(0x1cc)]['bind'](this));},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x151)]=Input[_0x2fb0f3(0x3cd)],Input[_0x2fb0f3(0x3cd)]=function(_0x2b743a){const _0x1e9d65=_0x2fb0f3;this[_0x1e9d65(0x1a2)]=_0x2b743a[_0x1e9d65(0x4f9)],VisuMZ[_0x1e9d65(0x248)][_0x1e9d65(0x151)][_0x1e9d65(0x29c)](this,_0x2b743a);},Input[_0x2fb0f3(0x1cc)]=function(_0x32b63f){const _0xbab8d1=_0x2fb0f3;this[_0xbab8d1(0x425)](_0x32b63f);},Input[_0x2fb0f3(0x425)]=function(_0x405efd){const _0x4d6423=_0x2fb0f3;this[_0x4d6423(0x1a2)]=_0x405efd['keyCode'];let _0x3cf8ad=String[_0x4d6423(0x3bc)](_0x405efd['charCode']);this['_inputString']===undefined?this[_0x4d6423(0x182)]=_0x3cf8ad:this[_0x4d6423(0x182)]+=_0x3cf8ad;},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x5ba)]=Input[_0x2fb0f3(0x65f)],Input['_shouldPreventDefault']=function(_0x25f9b4){const _0x468cc4=_0x2fb0f3;if(_0x25f9b4===0x8)return![];return VisuMZ['CoreEngine']['Input_shouldPreventDefault'][_0x468cc4(0x29c)](this,_0x25f9b4);},Input['isSpecialCode']=function(_0x1ac615){const _0x22954e=_0x2fb0f3;if(_0x1ac615[_0x22954e(0x573)](/backspace/i))return this[_0x22954e(0x1a2)]===0x8;if(_0x1ac615[_0x22954e(0x573)](/enter/i))return this[_0x22954e(0x1a2)]===0xd;if(_0x1ac615[_0x22954e(0x573)](/escape/i))return this[_0x22954e(0x1a2)]===0x1b;},Input[_0x2fb0f3(0x1d6)]=function(){const _0x1db136=_0x2fb0f3;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39]['contains'](this[_0x1db136(0x1a2)]);},Input[_0x2fb0f3(0x3e2)]=function(){const _0x13caff=_0x2fb0f3;return[0x25,0x26,0x27,0x28][_0x13caff(0x624)](this[_0x13caff(0x1a2)]);},Input[_0x2fb0f3(0x506)]=function(){const _0x46d0eb=_0x2fb0f3;if(navigator[_0x46d0eb(0x4a8)]){const _0x175103=navigator[_0x46d0eb(0x4a8)]();if(_0x175103)for(const _0x37ab98 of _0x175103){if(_0x37ab98&&_0x37ab98[_0x46d0eb(0x2e4)])return!![];}}return![];},Input[_0x2fb0f3(0x117)]=function(){const _0x48fcab=_0x2fb0f3;if(navigator['getGamepads']){const _0x4380c2=navigator[_0x48fcab(0x4a8)]();if(_0x4380c2)for(const _0x3fdc39 of _0x4380c2){if(_0x3fdc39&&_0x3fdc39['connected']){if(this['isGamepadButtonPressed'](_0x3fdc39))return!![];}}}return![];},Input[_0x2fb0f3(0x22a)]=function(_0x29a6c0){const _0x204448=_0x2fb0f3,_0x5b7c41=_0x29a6c0[_0x204448(0x28c)];for(let _0x14ac9a=0x0;_0x14ac9a<_0x5b7c41['length'];_0x14ac9a++){if(_0x5b7c41[_0x14ac9a][_0x204448(0xb6)])return!![];}return![];},VisuMZ['CoreEngine'][_0x2fb0f3(0x2dc)]=Tilemap[_0x2fb0f3(0x481)][_0x2fb0f3(0x230)],Tilemap[_0x2fb0f3(0x481)]['_addShadow']=function(_0xa00d85,_0x242331,_0x39bc99,_0x5d7587){const _0x2a81ba=_0x2fb0f3;if($gameMap&&$gameMap[_0x2a81ba(0x545)]())return;VisuMZ['CoreEngine'][_0x2a81ba(0x2dc)]['call'](this,_0xa00d85,_0x242331,_0x39bc99,_0x5d7587);},Tilemap[_0x2fb0f3(0x632)][_0x2fb0f3(0x481)][_0x2fb0f3(0x49f)]=function(){const _0x1a7fb6=_0x2fb0f3;this[_0x1a7fb6(0x186)]();for(let _0x312ab8=0x0;_0x312ab8<Tilemap[_0x1a7fb6(0x12e)][_0x1a7fb6(0x41c)];_0x312ab8++){const _0x2dd55c=new PIXI[(_0x1a7fb6(0x475))]();_0x2dd55c[_0x1a7fb6(0x16b)](0x800,0x800),VisuMZ[_0x1a7fb6(0x248)][_0x1a7fb6(0x452)][_0x1a7fb6(0x20f)][_0x1a7fb6(0x457)]&&(_0x2dd55c[_0x1a7fb6(0x233)]=PIXI[_0x1a7fb6(0x9d)][_0x1a7fb6(0x3fc)]),this['_internalTextures']['push'](_0x2dd55c);}},WindowLayer[_0x2fb0f3(0x481)][_0x2fb0f3(0x495)]=function(){const _0x859253=_0x2fb0f3;return SceneManager&&SceneManager[_0x859253(0x11b)]?SceneManager[_0x859253(0x11b)]['isWindowMaskingEnabled']():!![];},VisuMZ[_0x2fb0f3(0x248)]['WindowLayer_render']=WindowLayer['prototype'][_0x2fb0f3(0x1d3)],WindowLayer[_0x2fb0f3(0x481)][_0x2fb0f3(0x1d3)]=function render(_0x233758){const _0x57f19a=_0x2fb0f3;this['isMaskingEnabled']()?VisuMZ[_0x57f19a(0x248)][_0x57f19a(0x4dd)][_0x57f19a(0x29c)](this,_0x233758):this[_0x57f19a(0x12a)](_0x233758);},WindowLayer[_0x2fb0f3(0x481)]['renderNoMask']=function render(_0x413b49){const _0x582089=_0x2fb0f3;if(!this[_0x582089(0x38f)])return;const _0x37d161=new PIXI['Graphics'](),_0x5c3f03=_0x413b49['gl'],_0x5af10b=this[_0x582089(0x125)][_0x582089(0x164)]();_0x413b49[_0x582089(0x2c8)][_0x582089(0x2de)](),_0x37d161['transform']=this[_0x582089(0x4e5)],_0x413b49[_0x582089(0x19a)][_0x582089(0x338)](),_0x5c3f03[_0x582089(0x298)](_0x5c3f03[_0x582089(0x4af)]);while(_0x5af10b[_0x582089(0x105)]>0x0){const _0x24c547=_0x5af10b['shift']();_0x24c547[_0x582089(0x430)]&&_0x24c547[_0x582089(0x38f)]&&_0x24c547[_0x582089(0x1ec)]>0x0&&(_0x5c3f03[_0x582089(0xcf)](_0x5c3f03[_0x582089(0x2e3)],0x0,~0x0),_0x5c3f03[_0x582089(0x256)](_0x5c3f03[_0x582089(0x441)],_0x5c3f03[_0x582089(0x441)],_0x5c3f03['KEEP']),_0x24c547[_0x582089(0x1d3)](_0x413b49),_0x413b49['batch'][_0x582089(0x338)](),_0x37d161['clear'](),_0x5c3f03['stencilFunc'](_0x5c3f03['ALWAYS'],0x1,~0x0),_0x5c3f03[_0x582089(0x256)](_0x5c3f03[_0x582089(0x3ce)],_0x5c3f03['REPLACE'],_0x5c3f03[_0x582089(0x3ce)]),_0x5c3f03[_0x582089(0x530)](_0x5c3f03['ZERO'],_0x5c3f03['ONE']),_0x37d161['render'](_0x413b49),_0x413b49[_0x582089(0x19a)][_0x582089(0x338)](),_0x5c3f03[_0x582089(0x530)](_0x5c3f03[_0x582089(0x439)],_0x5c3f03[_0x582089(0x3fa)]));}_0x5c3f03[_0x582089(0x3f4)](_0x5c3f03[_0x582089(0x4af)]),_0x5c3f03[_0x582089(0x11d)](_0x5c3f03['STENCIL_BUFFER_BIT']),_0x5c3f03[_0x582089(0x207)](0x0),_0x413b49[_0x582089(0x19a)][_0x582089(0x338)]();for(const _0x3a0d41 of this[_0x582089(0x125)]){!_0x3a0d41[_0x582089(0x430)]&&_0x3a0d41[_0x582089(0x38f)]&&_0x3a0d41[_0x582089(0x1d3)](_0x413b49);}_0x413b49[_0x582089(0x19a)]['flush']();},DataManager['isKeyItem']=function(_0x1cc82e){const _0x4364ac=_0x2fb0f3;return this[_0x4364ac(0x2e7)](_0x1cc82e)&&_0x1cc82e[_0x4364ac(0x160)]===0x2;},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x198)]=DataManager[_0x2fb0f3(0x17c)],DataManager[_0x2fb0f3(0x17c)]=function(){const _0x160aab=_0x2fb0f3;VisuMZ[_0x160aab(0x248)][_0x160aab(0x198)][_0x160aab(0x29c)](this),this['reservePlayTestNewGameCommonEvent'](),this[_0x160aab(0x601)]();},DataManager[_0x2fb0f3(0x4b8)]=function(){const _0x1c6d38=_0x2fb0f3;if($gameTemp[_0x1c6d38(0x655)]()){const _0x419377=VisuMZ['CoreEngine'][_0x1c6d38(0x452)][_0x1c6d38(0x20f)][_0x1c6d38(0x330)];if(_0x419377>0x0)$gameTemp[_0x1c6d38(0x352)](_0x419377);}},DataManager[_0x2fb0f3(0x601)]=function(){const _0x42f77c=_0x2fb0f3,_0xc7d095=VisuMZ[_0x42f77c(0x248)][_0x42f77c(0x452)][_0x42f77c(0x20f)][_0x42f77c(0x463)]||0x0;if(_0xc7d095>0x0)$gameTemp[_0x42f77c(0x352)](_0xc7d095);},TextManager[_0x2fb0f3(0x1d0)]=['','','',_0x2fb0f3(0x42d),'','',_0x2fb0f3(0x1a5),'',_0x2fb0f3(0x32b),_0x2fb0f3(0x94),'','',_0x2fb0f3(0x646),_0x2fb0f3(0x142),_0x2fb0f3(0x657),'','SHIFT','CTRL',_0x2fb0f3(0x584),_0x2fb0f3(0x558),'CAPSLOCK',_0x2fb0f3(0x18b),_0x2fb0f3(0x165),'JUNJA',_0x2fb0f3(0x2cb),'HANJA','',_0x2fb0f3(0x3d0),_0x2fb0f3(0xe9),_0x2fb0f3(0x433),_0x2fb0f3(0x177),_0x2fb0f3(0x464),'SPACE',_0x2fb0f3(0x527),'PGDN',_0x2fb0f3(0x5d6),_0x2fb0f3(0x38a),'LEFT','UP',_0x2fb0f3(0x39b),_0x2fb0f3(0x4bb),_0x2fb0f3(0x124),_0x2fb0f3(0x380),_0x2fb0f3(0x47d),'PRINTSCREEN',_0x2fb0f3(0x63b),_0x2fb0f3(0x167),'','0','1','2','3','4','5','6','7','8','9','COLON',_0x2fb0f3(0x3e8),_0x2fb0f3(0x429),_0x2fb0f3(0x1e1),_0x2fb0f3(0x155),_0x2fb0f3(0x4fc),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','OS_KEY','','CONTEXT_MENU','',_0x2fb0f3(0x5e2),_0x2fb0f3(0x3c0),_0x2fb0f3(0x398),_0x2fb0f3(0x51d),_0x2fb0f3(0x5cc),_0x2fb0f3(0x306),_0x2fb0f3(0x51e),_0x2fb0f3(0x485),_0x2fb0f3(0xef),_0x2fb0f3(0x55d),'NUMPAD9',_0x2fb0f3(0x30a),'ADD','SEPARATOR',_0x2fb0f3(0x27e),_0x2fb0f3(0x53a),_0x2fb0f3(0xfb),'F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x2fb0f3(0x622),_0x2fb0f3(0x287),_0x2fb0f3(0xd9),_0x2fb0f3(0x62c),_0x2fb0f3(0x582),_0x2fb0f3(0x4d3),'F16',_0x2fb0f3(0x197),_0x2fb0f3(0x1db),_0x2fb0f3(0x660),_0x2fb0f3(0x2c2),_0x2fb0f3(0x2a6),_0x2fb0f3(0x204),'F23',_0x2fb0f3(0x29e),'','','','','','','','',_0x2fb0f3(0x609),_0x2fb0f3(0x175),_0x2fb0f3(0x15e),_0x2fb0f3(0x57b),'WIN_OEM_FJ_TOUROKU',_0x2fb0f3(0x4db),_0x2fb0f3(0x49b),'','','','','','','','','','CIRCUMFLEX','EXCLAMATION',_0x2fb0f3(0x311),_0x2fb0f3(0x391),_0x2fb0f3(0x44a),_0x2fb0f3(0x4c5),_0x2fb0f3(0x1e0),_0x2fb0f3(0x56f),_0x2fb0f3(0x5bc),_0x2fb0f3(0x18a),_0x2fb0f3(0x2ba),_0x2fb0f3(0x149),'PIPE',_0x2fb0f3(0x598),'OPEN_CURLY_BRACKET',_0x2fb0f3(0x60d),_0x2fb0f3(0x140),'','','','','VOLUME_MUTE',_0x2fb0f3(0x358),_0x2fb0f3(0x415),'','',_0x2fb0f3(0x3e8),_0x2fb0f3(0x1e1),_0x2fb0f3(0x483),_0x2fb0f3(0x236),'PERIOD','SLASH',_0x2fb0f3(0x1ed),'','','','','','','','','','','','','','','','','','','','','','','','','','','OPEN_BRACKET',_0x2fb0f3(0x168),'CLOSE_BRACKET',_0x2fb0f3(0x1f6),'',_0x2fb0f3(0x4a0),_0x2fb0f3(0x106),'',_0x2fb0f3(0x449),_0x2fb0f3(0x235),'',_0x2fb0f3(0x629),'','',_0x2fb0f3(0x40e),'WIN_OEM_JUMP','WIN_OEM_PA1',_0x2fb0f3(0x617),_0x2fb0f3(0x5a6),_0x2fb0f3(0x156),_0x2fb0f3(0x22b),_0x2fb0f3(0xa0),_0x2fb0f3(0x498),_0x2fb0f3(0x519),_0x2fb0f3(0x1d7),_0x2fb0f3(0x612),'WIN_OEM_BACKTAB',_0x2fb0f3(0x4ce),_0x2fb0f3(0x108),'EXSEL',_0x2fb0f3(0x1ad),_0x2fb0f3(0x47c),_0x2fb0f3(0x565),'','PA1',_0x2fb0f3(0x389),''],TextManager[_0x2fb0f3(0xa4)]=VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x452)][_0x2fb0f3(0x318)]['OkText'],TextManager[_0x2fb0f3(0x3ea)]=VisuMZ[_0x2fb0f3(0x248)]['Settings'][_0x2fb0f3(0x318)]['CancelText'],TextManager[_0x2fb0f3(0x1c6)]=VisuMZ['CoreEngine'][_0x2fb0f3(0x452)]['ButtonAssist'][_0x2fb0f3(0x27a)],VisuMZ['CoreEngine'][_0x2fb0f3(0x222)]=TextManager[_0x2fb0f3(0x42a)],TextManager[_0x2fb0f3(0x42a)]=function(_0x1e260e){const _0x23b5ad=_0x2fb0f3;return typeof _0x1e260e==='number'?VisuMZ[_0x23b5ad(0x248)][_0x23b5ad(0x222)][_0x23b5ad(0x29c)](this,_0x1e260e):this[_0x23b5ad(0x107)](_0x1e260e);},TextManager[_0x2fb0f3(0x107)]=function(_0x372498){const _0x57e834=_0x2fb0f3;_0x372498=String(_0x372498||'')[_0x57e834(0x65e)]();const _0x779746=VisuMZ[_0x57e834(0x248)][_0x57e834(0x452)][_0x57e834(0x491)];if(_0x372498===_0x57e834(0x26b))return $dataSystem[_0x57e834(0x61f)]['params'][0x0];if(_0x372498==='MAXMP')return $dataSystem[_0x57e834(0x61f)][_0x57e834(0x3e6)][0x1];if(_0x372498===_0x57e834(0x10f))return $dataSystem[_0x57e834(0x61f)][_0x57e834(0x3e6)][0x2];if(_0x372498===_0x57e834(0x420))return $dataSystem[_0x57e834(0x61f)][_0x57e834(0x3e6)][0x3];if(_0x372498===_0x57e834(0x146))return $dataSystem[_0x57e834(0x61f)][_0x57e834(0x3e6)][0x4];if(_0x372498==='MDF')return $dataSystem['terms'][_0x57e834(0x3e6)][0x5];if(_0x372498===_0x57e834(0x476))return $dataSystem[_0x57e834(0x61f)][_0x57e834(0x3e6)][0x6];if(_0x372498===_0x57e834(0x605))return $dataSystem[_0x57e834(0x61f)]['params'][0x7];if(_0x372498===_0x57e834(0x416))return _0x779746[_0x57e834(0x26f)];if(_0x372498==='EVA')return _0x779746[_0x57e834(0x126)];if(_0x372498===_0x57e834(0xca))return _0x779746[_0x57e834(0x5ce)];if(_0x372498==='CEV')return _0x779746['XParamVocab3'];if(_0x372498===_0x57e834(0x583))return _0x779746['XParamVocab4'];if(_0x372498===_0x57e834(0x551))return _0x779746[_0x57e834(0x20c)];if(_0x372498===_0x57e834(0x5d1))return _0x779746[_0x57e834(0x14a)];if(_0x372498===_0x57e834(0x56a))return _0x779746['XParamVocab7'];if(_0x372498==='MRG')return _0x779746['XParamVocab8'];if(_0x372498===_0x57e834(0x63c))return _0x779746['XParamVocab9'];if(_0x372498===_0x57e834(0x218))return _0x779746[_0x57e834(0x41d)];if(_0x372498===_0x57e834(0x35d))return _0x779746[_0x57e834(0x3a0)];if(_0x372498===_0x57e834(0x1f5))return _0x779746['SParamVocab2'];if(_0x372498===_0x57e834(0x130))return _0x779746[_0x57e834(0x49c)];if(_0x372498===_0x57e834(0x57a))return _0x779746[_0x57e834(0x65d)];if(_0x372498===_0x57e834(0xf1))return _0x779746[_0x57e834(0x63f)];if(_0x372498==='PDR')return _0x779746[_0x57e834(0x596)];if(_0x372498===_0x57e834(0x332))return _0x779746[_0x57e834(0x30d)];if(_0x372498===_0x57e834(0x2c1))return _0x779746[_0x57e834(0x1ac)];if(_0x372498===_0x57e834(0x40a))return _0x779746[_0x57e834(0x21b)];if(VisuMZ[_0x57e834(0x248)][_0x57e834(0x5a5)][_0x372498])return VisuMZ[_0x57e834(0x248)]['CustomParamNames'][_0x372498];return'';},TextManager['getInputButtonString']=function(_0x553aa9){const _0x2eed7f=_0x2fb0f3;if(_0x553aa9===_0x2eed7f(0xda))_0x553aa9=_0x2eed7f(0x5dd);let _0x2c742b=[];for(let _0x4fb6d5 in Input[_0x2eed7f(0x3f3)]){_0x4fb6d5=Number(_0x4fb6d5);if(_0x4fb6d5>=0x60&&_0x4fb6d5<=0x69)continue;if([0x12,0x20]['includes'](_0x4fb6d5))continue;_0x553aa9===Input[_0x2eed7f(0x3f3)][_0x4fb6d5]&&_0x2c742b[_0x2eed7f(0x653)](_0x4fb6d5);}for(let _0xcc5c5c=0x0;_0xcc5c5c<_0x2c742b['length'];_0xcc5c5c++){_0x2c742b[_0xcc5c5c]=TextManager['stringKeyMap'][_0x2c742b[_0xcc5c5c]];}return this[_0x2eed7f(0x542)](_0x2c742b);},TextManager[_0x2fb0f3(0x542)]=function(_0x19308f){const _0x3fee7f=_0x2fb0f3,_0x3665a7=VisuMZ[_0x3fee7f(0x248)]['Settings']['ButtonAssist'],_0xaf3d40=_0x3665a7[_0x3fee7f(0x32d)],_0x508e2d=_0x19308f[_0x3fee7f(0x303)](),_0x25b409='Key%1'[_0x3fee7f(0x459)](_0x508e2d);return _0x3665a7[_0x25b409]?_0x3665a7[_0x25b409]:_0xaf3d40['format'](_0x508e2d);},TextManager[_0x2fb0f3(0x2f4)]=function(_0x387ebf,_0x6adf17){const _0x11122e=_0x2fb0f3,_0x4ee3ff=VisuMZ['CoreEngine'][_0x11122e(0x452)][_0x11122e(0x318)],_0x52c2eb=_0x4ee3ff[_0x11122e(0x36f)],_0x41fccc=this['getInputButtonString'](_0x387ebf),_0x3a0a02=this[_0x11122e(0x5be)](_0x6adf17);return _0x52c2eb[_0x11122e(0x459)](_0x41fccc,_0x3a0a02);},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x4e9)]=ColorManager[_0x2fb0f3(0x3d2)],ColorManager[_0x2fb0f3(0x3d2)]=function(){const _0x59e062=_0x2fb0f3;VisuMZ[_0x59e062(0x248)]['ColorManager_loadWindowskin'][_0x59e062(0x29c)](this),this['_colorCache']=this[_0x59e062(0x52e)]||{};},ColorManager[_0x2fb0f3(0x590)]=function(_0x447fc2,_0x218e67){const _0x2d566f=_0x2fb0f3;return _0x218e67=String(_0x218e67),this['_colorCache']=this[_0x2d566f(0x52e)]||{},_0x218e67[_0x2d566f(0x573)](/#(.*)/i)?this[_0x2d566f(0x52e)][_0x447fc2]=_0x2d566f(0x1ae)['format'](String(RegExp['$1'])):this[_0x2d566f(0x52e)][_0x447fc2]=this[_0x2d566f(0x55b)](Number(_0x218e67)),this['_colorCache'][_0x447fc2];},ColorManager[_0x2fb0f3(0x4d7)]=function(_0x514e9e){const _0x3d23ab=_0x2fb0f3;return _0x514e9e=String(_0x514e9e),_0x514e9e[_0x3d23ab(0x573)](/#(.*)/i)?_0x3d23ab(0x1ae)[_0x3d23ab(0x459)](String(RegExp['$1'])):this[_0x3d23ab(0x55b)](Number(_0x514e9e));},ColorManager['clearCachedKeys']=function(){const _0x9a0d4b=_0x2fb0f3;this[_0x9a0d4b(0x52e)]={};},ColorManager['normalColor']=function(){const _0x59a5a4=_0x2fb0f3,_0x27ac4c=_0x59a5a4(0x5c2);this[_0x59a5a4(0x52e)]=this[_0x59a5a4(0x52e)]||{};if(this[_0x59a5a4(0x52e)][_0x27ac4c])return this[_0x59a5a4(0x52e)][_0x27ac4c];const _0x25ec0b=VisuMZ[_0x59a5a4(0x248)][_0x59a5a4(0x452)][_0x59a5a4(0x3a2)]['ColorNormal'];return this['getColorDataFromPluginParameters'](_0x27ac4c,_0x25ec0b);},ColorManager[_0x2fb0f3(0xee)]=function(){const _0xa624a9=_0x2fb0f3,_0x120960='_stored_systemColor';this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0x120960])return this[_0xa624a9(0x52e)][_0x120960];const _0x5d6808=VisuMZ[_0xa624a9(0x248)]['Settings'][_0xa624a9(0x3a2)]['ColorSystem'];return this['getColorDataFromPluginParameters'](_0x120960,_0x5d6808);},ColorManager['crisisColor']=function(){const _0x3d56a9=_0x2fb0f3,_0x43002d=_0x3d56a9(0x64e);this[_0x3d56a9(0x52e)]=this[_0x3d56a9(0x52e)]||{};if(this[_0x3d56a9(0x52e)][_0x43002d])return this[_0x3d56a9(0x52e)][_0x43002d];const _0x24ce47=VisuMZ[_0x3d56a9(0x248)]['Settings'][_0x3d56a9(0x3a2)][_0x3d56a9(0x5ec)];return this[_0x3d56a9(0x590)](_0x43002d,_0x24ce47);},ColorManager[_0x2fb0f3(0x589)]=function(){const _0x4f2e6b=_0x2fb0f3,_0x1d3496=_0x4f2e6b(0x2f3);this[_0x4f2e6b(0x52e)]=this[_0x4f2e6b(0x52e)]||{};if(this[_0x4f2e6b(0x52e)][_0x1d3496])return this[_0x4f2e6b(0x52e)][_0x1d3496];const _0x10a9b5=VisuMZ[_0x4f2e6b(0x248)][_0x4f2e6b(0x452)][_0x4f2e6b(0x3a2)][_0x4f2e6b(0x37c)];return this[_0x4f2e6b(0x590)](_0x1d3496,_0x10a9b5);},ColorManager[_0x2fb0f3(0x17a)]=function(){const _0x3d8038=_0x2fb0f3,_0x495b41=_0x3d8038(0x627);this[_0x3d8038(0x52e)]=this[_0x3d8038(0x52e)]||{};if(this[_0x3d8038(0x52e)][_0x495b41])return this['_colorCache'][_0x495b41];const _0x319da9=VisuMZ[_0x3d8038(0x248)]['Settings']['Color'][_0x3d8038(0x619)];return this[_0x3d8038(0x590)](_0x495b41,_0x319da9);},ColorManager[_0x2fb0f3(0x608)]=function(){const _0x3e02b4=_0x2fb0f3,_0x185ae9=_0x3e02b4(0x2be);this[_0x3e02b4(0x52e)]=this[_0x3e02b4(0x52e)]||{};if(this[_0x3e02b4(0x52e)][_0x185ae9])return this[_0x3e02b4(0x52e)][_0x185ae9];const _0x41c4a5=VisuMZ[_0x3e02b4(0x248)][_0x3e02b4(0x452)][_0x3e02b4(0x3a2)][_0x3e02b4(0x1f9)];return this[_0x3e02b4(0x590)](_0x185ae9,_0x41c4a5);},ColorManager[_0x2fb0f3(0x334)]=function(){const _0x1f2bb9=_0x2fb0f3,_0x2c6789=_0x1f2bb9(0x217);this[_0x1f2bb9(0x52e)]=this[_0x1f2bb9(0x52e)]||{};if(this['_colorCache'][_0x2c6789])return this[_0x1f2bb9(0x52e)][_0x2c6789];const _0xad935f=VisuMZ['CoreEngine'][_0x1f2bb9(0x452)][_0x1f2bb9(0x3a2)][_0x1f2bb9(0x5e8)];return this[_0x1f2bb9(0x590)](_0x2c6789,_0xad935f);},ColorManager['mpGaugeColor1']=function(){const _0x550400=_0x2fb0f3,_0x2fd6b0='_stored_mpGaugeColor1';this[_0x550400(0x52e)]=this[_0x550400(0x52e)]||{};if(this[_0x550400(0x52e)][_0x2fd6b0])return this['_colorCache'][_0x2fd6b0];const _0x15349b=VisuMZ[_0x550400(0x248)][_0x550400(0x452)][_0x550400(0x3a2)][_0x550400(0x300)];return this['getColorDataFromPluginParameters'](_0x2fd6b0,_0x15349b);},ColorManager[_0x2fb0f3(0x55e)]=function(){const _0x16e574=_0x2fb0f3,_0x2cccc0=_0x16e574(0xd4);this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0x2cccc0])return this['_colorCache'][_0x2cccc0];const _0x4d4453=VisuMZ[_0x16e574(0x248)][_0x16e574(0x452)][_0x16e574(0x3a2)][_0x16e574(0x61e)];return this[_0x16e574(0x590)](_0x2cccc0,_0x4d4453);},ColorManager[_0x2fb0f3(0x216)]=function(){const _0x4b5cde=_0x2fb0f3,_0x2c0e19=_0x4b5cde(0x221);this[_0x4b5cde(0x52e)]=this[_0x4b5cde(0x52e)]||{};if(this[_0x4b5cde(0x52e)][_0x2c0e19])return this[_0x4b5cde(0x52e)][_0x2c0e19];const _0x6d3e66=VisuMZ[_0x4b5cde(0x248)]['Settings'][_0x4b5cde(0x3a2)]['ColorMPCost'];return this[_0x4b5cde(0x590)](_0x2c0e19,_0x6d3e66);},ColorManager[_0x2fb0f3(0x31c)]=function(){const _0xd0b489=_0x2fb0f3,_0x2db3d3=_0xd0b489(0x333);this[_0xd0b489(0x52e)]=this[_0xd0b489(0x52e)]||{};if(this[_0xd0b489(0x52e)][_0x2db3d3])return this[_0xd0b489(0x52e)][_0x2db3d3];const _0x2585e7=VisuMZ[_0xd0b489(0x248)][_0xd0b489(0x452)][_0xd0b489(0x3a2)][_0xd0b489(0x5b2)];return this[_0xd0b489(0x590)](_0x2db3d3,_0x2585e7);},ColorManager[_0x2fb0f3(0x5db)]=function(){const _0x4f4a33=_0x2fb0f3,_0x1ca5ad=_0x4f4a33(0x174);this['_colorCache']=this[_0x4f4a33(0x52e)]||{};if(this[_0x4f4a33(0x52e)][_0x1ca5ad])return this['_colorCache'][_0x1ca5ad];const _0x5bb8a0=VisuMZ[_0x4f4a33(0x248)][_0x4f4a33(0x452)][_0x4f4a33(0x3a2)]['ColorPowerDown'];return this[_0x4f4a33(0x590)](_0x1ca5ad,_0x5bb8a0);},ColorManager[_0x2fb0f3(0x5a1)]=function(){const _0x432d1a=_0x2fb0f3,_0x239eb7='_stored_ctGaugeColor1';this[_0x432d1a(0x52e)]=this[_0x432d1a(0x52e)]||{};if(this[_0x432d1a(0x52e)][_0x239eb7])return this[_0x432d1a(0x52e)][_0x239eb7];const _0x1dc246=VisuMZ[_0x432d1a(0x248)][_0x432d1a(0x452)][_0x432d1a(0x3a2)][_0x432d1a(0x4df)];return this['getColorDataFromPluginParameters'](_0x239eb7,_0x1dc246);},ColorManager[_0x2fb0f3(0x65b)]=function(){const _0x101b98=_0x2fb0f3,_0x309ee4='_stored_ctGaugeColor2';this['_colorCache']=this['_colorCache']||{};if(this[_0x101b98(0x52e)][_0x309ee4])return this[_0x101b98(0x52e)][_0x309ee4];const _0x538df8=VisuMZ[_0x101b98(0x248)][_0x101b98(0x452)][_0x101b98(0x3a2)]['ColorCTGauge2'];return this[_0x101b98(0x590)](_0x309ee4,_0x538df8);},ColorManager[_0x2fb0f3(0x524)]=function(){const _0xd0d9bc=_0x2fb0f3,_0x290b6a=_0xd0d9bc(0x3af);this[_0xd0d9bc(0x52e)]=this[_0xd0d9bc(0x52e)]||{};if(this[_0xd0d9bc(0x52e)][_0x290b6a])return this['_colorCache'][_0x290b6a];const _0x3eb1f8=VisuMZ[_0xd0d9bc(0x248)][_0xd0d9bc(0x452)]['Color'][_0xd0d9bc(0x625)];return this['getColorDataFromPluginParameters'](_0x290b6a,_0x3eb1f8);},ColorManager[_0x2fb0f3(0x54d)]=function(){const _0xbbf30f=_0x2fb0f3,_0x371f90=_0xbbf30f(0x46f);this[_0xbbf30f(0x52e)]=this[_0xbbf30f(0x52e)]||{};if(this[_0xbbf30f(0x52e)][_0x371f90])return this['_colorCache'][_0x371f90];const _0x433e7b=VisuMZ[_0xbbf30f(0x248)][_0xbbf30f(0x452)][_0xbbf30f(0x3a2)][_0xbbf30f(0x147)];return this[_0xbbf30f(0x590)](_0x371f90,_0x433e7b);},ColorManager[_0x2fb0f3(0x48e)]=function(){const _0x1293c0=_0x2fb0f3,_0x58be2c=_0x1293c0(0x46c);this[_0x1293c0(0x52e)]=this[_0x1293c0(0x52e)]||{};if(this[_0x1293c0(0x52e)][_0x58be2c])return this[_0x1293c0(0x52e)][_0x58be2c];const _0x17d561=VisuMZ[_0x1293c0(0x248)][_0x1293c0(0x452)]['Color']['ColorTPCost'];return this['getColorDataFromPluginParameters'](_0x58be2c,_0x17d561);},ColorManager['pendingColor']=function(){const _0x3df431=_0x2fb0f3,_0x3f3f19=_0x3df431(0x5ef);this['_colorCache']=this[_0x3df431(0x52e)]||{};if(this[_0x3df431(0x52e)][_0x3f3f19])return this[_0x3df431(0x52e)][_0x3f3f19];const _0x53b2ca=VisuMZ['CoreEngine']['Settings'][_0x3df431(0x3a2)][_0x3df431(0x507)];return this['getColorDataFromPluginParameters'](_0x3f3f19,_0x53b2ca);},ColorManager['expGaugeColor1']=function(){const _0x5bd29c=_0x2fb0f3,_0x30e034='_stored_expGaugeColor1';this[_0x5bd29c(0x52e)]=this[_0x5bd29c(0x52e)]||{};if(this['_colorCache'][_0x30e034])return this[_0x5bd29c(0x52e)][_0x30e034];const _0x328e9e=VisuMZ['CoreEngine'][_0x5bd29c(0x452)]['Color'][_0x5bd29c(0x5b5)];return this[_0x5bd29c(0x590)](_0x30e034,_0x328e9e);},ColorManager[_0x2fb0f3(0x4cd)]=function(){const _0x17f96f=_0x2fb0f3,_0x2cc058=_0x17f96f(0x4b5);this[_0x17f96f(0x52e)]=this[_0x17f96f(0x52e)]||{};if(this[_0x17f96f(0x52e)][_0x2cc058])return this[_0x17f96f(0x52e)][_0x2cc058];const _0x2b55d3=VisuMZ[_0x17f96f(0x248)][_0x17f96f(0x452)][_0x17f96f(0x3a2)][_0x17f96f(0x2e9)];return this[_0x17f96f(0x590)](_0x2cc058,_0x2b55d3);},ColorManager[_0x2fb0f3(0x31a)]=function(){const _0x32702d=_0x2fb0f3,_0x49020f=_0x32702d(0xc2);this['_colorCache']=this[_0x32702d(0x52e)]||{};if(this['_colorCache'][_0x49020f])return this['_colorCache'][_0x49020f];const _0x4a8373=VisuMZ[_0x32702d(0x248)][_0x32702d(0x452)][_0x32702d(0x3a2)][_0x32702d(0x372)];return this[_0x32702d(0x590)](_0x49020f,_0x4a8373);},ColorManager['maxLvGaugeColor2']=function(){const _0x134640=_0x2fb0f3,_0x4d2da5=_0x134640(0x1c2);this[_0x134640(0x52e)]=this['_colorCache']||{};if(this['_colorCache'][_0x4d2da5])return this[_0x134640(0x52e)][_0x4d2da5];const _0x21c093=VisuMZ[_0x134640(0x248)][_0x134640(0x452)][_0x134640(0x3a2)][_0x134640(0x1d2)];return this['getColorDataFromPluginParameters'](_0x4d2da5,_0x21c093);},ColorManager[_0x2fb0f3(0x407)]=function(_0x14971b){const _0x54084e=_0x2fb0f3;return VisuMZ[_0x54084e(0x248)]['Settings'][_0x54084e(0x3a2)][_0x54084e(0x239)][_0x54084e(0x29c)](this,_0x14971b);},ColorManager[_0x2fb0f3(0x2fa)]=function(_0x4fbfce){const _0x22ef37=_0x2fb0f3;return VisuMZ[_0x22ef37(0x248)]['Settings'][_0x22ef37(0x3a2)][_0x22ef37(0x26e)][_0x22ef37(0x29c)](this,_0x4fbfce);},ColorManager[_0x2fb0f3(0x13f)]=function(_0x23ed6a){const _0x41b1b7=_0x2fb0f3;return VisuMZ[_0x41b1b7(0x248)][_0x41b1b7(0x452)][_0x41b1b7(0x3a2)]['ActorTPColor']['call'](this,_0x23ed6a);},ColorManager['paramchangeTextColor']=function(_0x4dd6eb){const _0x538446=_0x2fb0f3;return VisuMZ[_0x538446(0x248)][_0x538446(0x452)][_0x538446(0x3a2)][_0x538446(0x5a4)]['call'](this,_0x4dd6eb);},ColorManager['damageColor']=function(_0x28d689){const _0x13388c=_0x2fb0f3;return VisuMZ[_0x13388c(0x248)][_0x13388c(0x452)][_0x13388c(0x3a2)][_0x13388c(0x492)][_0x13388c(0x29c)](this,_0x28d689);},ColorManager[_0x2fb0f3(0x3df)]=function(){const _0x47aac9=_0x2fb0f3;return VisuMZ[_0x47aac9(0x248)][_0x47aac9(0x452)][_0x47aac9(0x3a2)][_0x47aac9(0x2d6)];},ColorManager[_0x2fb0f3(0x34e)]=function(){const _0x45a10a=_0x2fb0f3;return VisuMZ[_0x45a10a(0x248)][_0x45a10a(0x452)][_0x45a10a(0x3a2)][_0x45a10a(0x408)]||'rgba(0,\x200,\x200,\x200.7)';},ColorManager[_0x2fb0f3(0x48b)]=function(){const _0x17b126=_0x2fb0f3;return VisuMZ[_0x17b126(0x248)][_0x17b126(0x452)][_0x17b126(0x3a2)][_0x17b126(0x93)]||_0x17b126(0x2c0);},ColorManager[_0x2fb0f3(0xff)]=function(){const _0x5395a2=_0x2fb0f3;return VisuMZ['CoreEngine'][_0x5395a2(0x452)]['Color'][_0x5395a2(0x568)];},ColorManager[_0x2fb0f3(0x289)]=function(){const _0x488c36=_0x2fb0f3;return VisuMZ['CoreEngine'][_0x488c36(0x452)][_0x488c36(0x3a2)][_0x488c36(0x250)];},ColorManager['itemBackColor1']=function(){const _0x4ce8aa=_0x2fb0f3;return VisuMZ[_0x4ce8aa(0x248)][_0x4ce8aa(0x452)][_0x4ce8aa(0x3a2)][_0x4ce8aa(0x5fa)];},ColorManager[_0x2fb0f3(0x1dd)]=function(){const _0x1c2e2d=_0x2fb0f3;return VisuMZ['CoreEngine'][_0x1c2e2d(0x452)][_0x1c2e2d(0x3a2)][_0x1c2e2d(0x3ca)];},SceneManager[_0x2fb0f3(0x2fb)]=[],VisuMZ['CoreEngine'][_0x2fb0f3(0x1cd)]=SceneManager[_0x2fb0f3(0x15c)],SceneManager['initialize']=function(){const _0xaac966=_0x2fb0f3;VisuMZ[_0xaac966(0x248)][_0xaac966(0x1cd)]['call'](this),this[_0xaac966(0x3b4)]();},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x4f3)]=SceneManager[_0x2fb0f3(0x43e)],SceneManager[_0x2fb0f3(0x43e)]=function(_0x37f5fc){const _0x2ae707=_0x2fb0f3;if($gameTemp)this[_0x2ae707(0x468)](_0x37f5fc);VisuMZ[_0x2ae707(0x248)]['SceneManager_onKeyDown']['call'](this,_0x37f5fc);},SceneManager['onKeyDownKeysF6F7']=function(_0xca9c52){const _0x15451f=_0x2fb0f3;if(!_0xca9c52[_0x15451f(0x442)]&&!_0xca9c52[_0x15451f(0x339)])switch(_0xca9c52[_0x15451f(0x4f9)]){case 0x75:this['playTestF6']();break;case 0x76:if(Input[_0x15451f(0x34b)]('shift')||Input[_0x15451f(0x34b)](_0x15451f(0x62f)))return;this['playTestF7']();break;}},SceneManager[_0x2fb0f3(0x291)]=function(){const _0x2bfaec=_0x2fb0f3;if($gameTemp['isPlaytest']()&&VisuMZ['CoreEngine'][_0x2bfaec(0x452)][_0x2bfaec(0x20f)]['F6key']){ConfigManager['seVolume']!==0x0?(ConfigManager[_0x2bfaec(0x131)]=0x0,ConfigManager[_0x2bfaec(0x4e4)]=0x0,ConfigManager[_0x2bfaec(0x465)]=0x0,ConfigManager[_0x2bfaec(0x1c7)]=0x0):(ConfigManager[_0x2bfaec(0x131)]=0x64,ConfigManager[_0x2bfaec(0x4e4)]=0x64,ConfigManager['meVolume']=0x64,ConfigManager[_0x2bfaec(0x1c7)]=0x64);ConfigManager[_0x2bfaec(0x187)]();if(this['_scene'][_0x2bfaec(0x52a)]===Scene_Options){if(this[_0x2bfaec(0x11b)][_0x2bfaec(0x1c1)])this['_scene'][_0x2bfaec(0x1c1)][_0x2bfaec(0xe1)]();if(this['_scene'][_0x2bfaec(0x210)])this[_0x2bfaec(0x11b)][_0x2bfaec(0x210)][_0x2bfaec(0xe1)]();}}},SceneManager['playTestF7']=function(){const _0x40db66=_0x2fb0f3;$gameTemp[_0x40db66(0x655)]()&&VisuMZ[_0x40db66(0x248)]['Settings'][_0x40db66(0x20f)][_0x40db66(0xc1)]&&($gameTemp[_0x40db66(0x559)]=!$gameTemp[_0x40db66(0x559)]);},SceneManager[_0x2fb0f3(0x3b4)]=function(){const _0x479b3a=_0x2fb0f3;this[_0x479b3a(0x2ff)]=![],this[_0x479b3a(0x4c6)]=!VisuMZ[_0x479b3a(0x248)][_0x479b3a(0x452)]['UI'][_0x479b3a(0x628)];},SceneManager[_0x2fb0f3(0x3fd)]=function(_0xe41731){const _0x9a659c=_0x2fb0f3;VisuMZ[_0x9a659c(0x248)][_0x9a659c(0x452)]['UI'][_0x9a659c(0x4bc)]&&(this[_0x9a659c(0x2ff)]=_0xe41731);},SceneManager['isSideButtonLayout']=function(){const _0x241319=_0x2fb0f3;return this[_0x241319(0x2ff)];},SceneManager[_0x2fb0f3(0x3ee)]=function(){const _0xf513cd=_0x2fb0f3;return this[_0xf513cd(0x4c6)];},SceneManager[_0x2fb0f3(0x50d)]=function(){const _0x29a1b5=_0x2fb0f3;return this['areButtonsHidden']()||this[_0x29a1b5(0x20e)]();},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x4f5)]=SceneManager['isGameActive'],SceneManager['isGameActive']=function(){const _0xa0ecb6=_0x2fb0f3;return VisuMZ[_0xa0ecb6(0x248)][_0xa0ecb6(0x452)][_0xa0ecb6(0x20f)][_0xa0ecb6(0x30b)]?VisuMZ[_0xa0ecb6(0x248)][_0xa0ecb6(0x4f5)][_0xa0ecb6(0x29c)](this):!![];},SceneManager[_0x2fb0f3(0x302)]=function(_0x4f1913){const _0x4371c6=_0x2fb0f3;if(_0x4f1913 instanceof Error)this['catchNormalError'](_0x4f1913);else _0x4f1913 instanceof Array&&_0x4f1913[0x0]==='LoadError'?this['catchLoadError'](_0x4f1913):this[_0x4371c6(0x2ae)](_0x4f1913);this[_0x4371c6(0x2a4)]();},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x31b)]=BattleManager[_0x2fb0f3(0x45f)],BattleManager[_0x2fb0f3(0x45f)]=function(){const _0x23fd07=_0x2fb0f3;if(VisuMZ['CoreEngine'][_0x23fd07(0x452)][_0x23fd07(0x20f)][_0x23fd07(0x560)])this[_0x23fd07(0x35a)]();else return VisuMZ[_0x23fd07(0x248)][_0x23fd07(0x31b)][_0x23fd07(0x29c)](this);},BattleManager[_0x2fb0f3(0x35a)]=function(){const _0x405b0c=_0x2fb0f3;return $gameParty[_0x405b0c(0x35b)](),SoundManager['playEscape'](),this[_0x405b0c(0x56e)](),!![];},BattleManager[_0x2fb0f3(0x615)]=function(){const _0x4a66f8=_0x2fb0f3;return $gameSystem[_0x4a66f8(0x123)]()>=0x1;},BattleManager[_0x2fb0f3(0x14b)]=function(){const _0x33bc8f=_0x2fb0f3;return $gameSystem[_0x33bc8f(0x123)]()===0x1;},VisuMZ['CoreEngine'][_0x2fb0f3(0xfe)]=Game_Temp[_0x2fb0f3(0x481)][_0x2fb0f3(0x15c)],Game_Temp[_0x2fb0f3(0x481)]['initialize']=function(){const _0x400e09=_0x2fb0f3;VisuMZ[_0x400e09(0x248)][_0x400e09(0xfe)][_0x400e09(0x29c)](this),this[_0x400e09(0x2f2)](),this[_0x400e09(0x33b)]();},Game_Temp[_0x2fb0f3(0x481)]['forceOutOfPlaytest']=function(){const _0x20de05=_0x2fb0f3;VisuMZ[_0x20de05(0x248)][_0x20de05(0x452)][_0x20de05(0x20f)]['ForceNoPlayTest']&&(this['_isPlaytest']=![]);},Game_Temp['prototype'][_0x2fb0f3(0x33b)]=function(){this['_fauxAnimationQueue']=[];},Game_Temp['prototype']['requestFauxAnimation']=function(_0x31180c,_0x10cd3e,_0x1a2063,_0x57a269){const _0x3ef6a2=_0x2fb0f3;if(!this[_0x3ef6a2(0x5ad)]())return;_0x1a2063=_0x1a2063||![],_0x57a269=_0x57a269||![];if($dataAnimations[_0x10cd3e]){const _0xbed873={'targets':_0x31180c,'animationId':_0x10cd3e,'mirror':_0x1a2063,'mute':_0x57a269};this[_0x3ef6a2(0x4d1)][_0x3ef6a2(0x653)](_0xbed873);for(const _0x12bd91 of _0x31180c){_0x12bd91[_0x3ef6a2(0x101)]&&_0x12bd91[_0x3ef6a2(0x101)]();}}},Game_Temp[_0x2fb0f3(0x481)][_0x2fb0f3(0x5ad)]=function(){return!![];},Game_Temp['prototype']['retrieveFauxAnimation']=function(){const _0x223c84=_0x2fb0f3;return this['_fauxAnimationQueue'][_0x223c84(0x460)]();},Game_Temp[_0x2fb0f3(0x481)][_0x2fb0f3(0x5ee)]=function(_0x231665){this['_lastPluginCommandInterpreter']=_0x231665;},Game_Temp[_0x2fb0f3(0x481)][_0x2fb0f3(0x2e1)]=function(){const _0x198cb3=_0x2fb0f3;return this[_0x198cb3(0x35c)];},Game_Temp[_0x2fb0f3(0x481)][_0x2fb0f3(0x283)]=function(){const _0x2bdbef=_0x2fb0f3;this[_0x2bdbef(0x184)]=undefined,this['_forcedBattleSys']=undefined;},Game_Temp[_0x2fb0f3(0x481)]['applyForcedGameTroopSettingsCoreEngine']=function(_0x851a13){const _0x5c7aae=_0x2fb0f3;$gameMap&&$dataMap&&$dataMap[_0x5c7aae(0x22e)]&&this[_0x5c7aae(0x22d)]($dataMap[_0x5c7aae(0x22e)]);const _0x1db432=$dataTroops[_0x851a13];_0x1db432&&this[_0x5c7aae(0x22d)](_0x1db432[_0x5c7aae(0x12d)]);},Game_Temp[_0x2fb0f3(0x481)][_0x2fb0f3(0x22d)]=function(_0x258c8e){const _0x3422e0=_0x2fb0f3;if(!_0x258c8e)return;if(_0x258c8e[_0x3422e0(0x573)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x3422e0(0x184)]='FV';else{if(_0x258c8e[_0x3422e0(0x573)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this[_0x3422e0(0x184)]='SV';else{if(_0x258c8e['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x4856ff=String(RegExp['$1']);if(_0x4856ff[_0x3422e0(0x573)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x3422e0(0x184)]='FV';else _0x4856ff[_0x3422e0(0x573)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this['_forcedTroopView']='SV');}}}if(_0x258c8e[_0x3422e0(0x573)](/<(?:DTB)>/i))this[_0x3422e0(0x275)]=0x0;else{if(_0x258c8e[_0x3422e0(0x573)](/<(?:TPB|ATB)[ ]ACTIVE>/i))this['_forcedBattleSys']=0x1;else{if(_0x258c8e[_0x3422e0(0x573)](/<(?:TPB|ATB)[ ]WAIT>/i))this['_forcedBattleSys']=0x2;else{if(_0x258c8e[_0x3422e0(0x573)](/<(?:CTB)>/i))Imported['VisuMZ_2_BattleSystemCTB']&&(this['_forcedBattleSys']=_0x3422e0(0x424));else{if(_0x258c8e[_0x3422e0(0x573)](/<(?:STB)>/i))Imported[_0x3422e0(0x1a0)]&&(this[_0x3422e0(0x275)]=_0x3422e0(0x1bd));else{if(_0x258c8e[_0x3422e0(0x573)](/<(?:BTB)>/i))Imported[_0x3422e0(0x208)]&&(this['_forcedBattleSys']=_0x3422e0(0x4f2));else{if(_0x258c8e[_0x3422e0(0x573)](/<(?:FTB)>/i))Imported[_0x3422e0(0x3cb)]&&(this['_forcedBattleSys']=_0x3422e0(0x316));else{if(_0x258c8e[_0x3422e0(0x573)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0xca2cd3=String(RegExp['$1']);if(_0xca2cd3['match'](/DTB/i))this['_forcedBattleSys']=0x0;else{if(_0xca2cd3[_0x3422e0(0x573)](/(?:TPB|ATB)[ ]ACTIVE/i))this['_forcedBattleSys']=0x1;else{if(_0xca2cd3[_0x3422e0(0x573)](/(?:TPB|ATB)[ ]WAIT/i))this[_0x3422e0(0x275)]=0x2;else{if(_0xca2cd3[_0x3422e0(0x573)](/CTB/i))Imported[_0x3422e0(0x490)]&&(this['_forcedBattleSys']=_0x3422e0(0x424));else{if(_0xca2cd3[_0x3422e0(0x573)](/STB/i))Imported[_0x3422e0(0x1a0)]&&(this['_forcedBattleSys']='STB');else{if(_0xca2cd3[_0x3422e0(0x573)](/BTB/i))Imported[_0x3422e0(0x208)]&&(this['_forcedBattleSys']='BTB');else _0xca2cd3['match'](/FTB/i)&&(Imported['VisuMZ_2_BattleSystemFTB']&&(this[_0x3422e0(0x275)]=_0x3422e0(0x316)));}}}}}}}}}}}}}},VisuMZ['CoreEngine']['Game_System_initialize']=Game_System['prototype'][_0x2fb0f3(0x15c)],Game_System[_0x2fb0f3(0x481)][_0x2fb0f3(0x15c)]=function(){const _0x599677=_0x2fb0f3;VisuMZ[_0x599677(0x248)][_0x599677(0x1e8)]['call'](this),this[_0x599677(0x621)]();},Game_System['prototype'][_0x2fb0f3(0x621)]=function(){const _0x47faa5=_0x2fb0f3;this[_0x47faa5(0x37a)]={'SideView':$dataSystem[_0x47faa5(0x259)],'BattleSystem':this[_0x47faa5(0x60f)](),'FontSize':$dataSystem[_0x47faa5(0x594)][_0x47faa5(0x528)],'Padding':0xc};},Game_System[_0x2fb0f3(0x481)][_0x2fb0f3(0x3e9)]=function(){const _0x1652db=_0x2fb0f3;if($gameTemp[_0x1652db(0x184)]==='SV')return!![];else{if($gameTemp['_forcedTroopView']==='FV')return![];}if(this[_0x1652db(0x37a)]===undefined)this[_0x1652db(0x621)]();if(this['_CoreEngineSettings']['SideView']===undefined)this['initCoreEngine']();return this['_CoreEngineSettings'][_0x1652db(0x55f)];},Game_System[_0x2fb0f3(0x481)][_0x2fb0f3(0x513)]=function(_0x3cd29e){const _0x81ac2f=_0x2fb0f3;if(this['_CoreEngineSettings']===undefined)this[_0x81ac2f(0x621)]();if(this[_0x81ac2f(0x37a)][_0x81ac2f(0x55f)]===undefined)this[_0x81ac2f(0x621)]();this['_CoreEngineSettings'][_0x81ac2f(0x55f)]=_0x3cd29e;},Game_System['prototype'][_0x2fb0f3(0x39e)]=function(){const _0x4b5161=_0x2fb0f3;if(this[_0x4b5161(0x37a)]===undefined)this[_0x4b5161(0x621)]();this['_CoreEngineSettings'][_0x4b5161(0xb1)]=this[_0x4b5161(0x60f)]();},Game_System['prototype'][_0x2fb0f3(0x60f)]=function(){const _0xe3ea8c=_0x2fb0f3,_0xa33b10=(VisuMZ[_0xe3ea8c(0x248)][_0xe3ea8c(0x452)][_0xe3ea8c(0xb1)]||_0xe3ea8c(0xc9))[_0xe3ea8c(0x65e)]()[_0xe3ea8c(0x1b7)]();return VisuMZ[_0xe3ea8c(0x248)]['CreateBattleSystemID'](_0xa33b10);},Game_System[_0x2fb0f3(0x481)]['getBattleSystem']=function(){const _0x4e9a2c=_0x2fb0f3;if($gameTemp['_forcedBattleSys']!==undefined)return $gameTemp[_0x4e9a2c(0x275)];if(this[_0x4e9a2c(0x37a)]===undefined)this['initCoreEngine']();if(this[_0x4e9a2c(0x37a)][_0x4e9a2c(0xb1)]===undefined)this[_0x4e9a2c(0x39e)]();return this[_0x4e9a2c(0x37a)][_0x4e9a2c(0xb1)];},Game_System[_0x2fb0f3(0x481)][_0x2fb0f3(0x606)]=function(_0x5be9fd){const _0x2721f4=_0x2fb0f3;if(this[_0x2721f4(0x37a)]===undefined)this['initCoreEngine']();if(this[_0x2721f4(0x37a)][_0x2721f4(0xb1)]===undefined)this['resetBattleSystem']();this[_0x2721f4(0x37a)]['BattleSystem']=_0x5be9fd;},Game_System[_0x2fb0f3(0x481)][_0x2fb0f3(0x3a1)]=function(){const _0x5e753b=_0x2fb0f3;if(this['_CoreEngineSettings']===undefined)this[_0x5e753b(0x621)]();if(this[_0x5e753b(0x37a)]['FontSize']===undefined)this[_0x5e753b(0x621)]();return this[_0x5e753b(0x37a)]['FontSize'];},Game_System[_0x2fb0f3(0x481)][_0x2fb0f3(0x525)]=function(_0x11f1f0){const _0x4dc49b=_0x2fb0f3;if(this[_0x4dc49b(0x37a)]===undefined)this[_0x4dc49b(0x621)]();if(this[_0x4dc49b(0x37a)][_0x4dc49b(0xf7)]===undefined)this[_0x4dc49b(0x621)]();this[_0x4dc49b(0x37a)][_0x4dc49b(0x30c)]=_0x11f1f0;},Game_System[_0x2fb0f3(0x481)][_0x2fb0f3(0x600)]=function(){const _0x4be5ff=_0x2fb0f3;if(this['_CoreEngineSettings']===undefined)this[_0x4be5ff(0x621)]();if(this['_CoreEngineSettings'][_0x4be5ff(0x4c2)]===undefined)this['initCoreEngine']();return this['_CoreEngineSettings']['Padding'];},Game_System['prototype'][_0x2fb0f3(0x535)]=function(_0x2f0b6b){const _0x4ae4a6=_0x2fb0f3;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x4ae4a6(0x37a)][_0x4ae4a6(0xf7)]===undefined)this[_0x4ae4a6(0x621)]();this['_CoreEngineSettings']['Padding']=_0x2f0b6b;},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x2e6)]=Game_Screen['prototype'][_0x2fb0f3(0x15c)],Game_Screen[_0x2fb0f3(0x481)]['initialize']=function(){const _0x3e5255=_0x2fb0f3;VisuMZ[_0x3e5255(0x248)][_0x3e5255(0x2e6)][_0x3e5255(0x29c)](this),this['initCoreEngineScreenShake']();},Game_Screen[_0x2fb0f3(0x481)]['initCoreEngineScreenShake']=function(){const _0x225fcc=_0x2fb0f3,_0x443add=VisuMZ[_0x225fcc(0x248)][_0x225fcc(0x452)]['ScreenShake'];this['_coreEngineShakeStyle']=_0x443add?.[_0x225fcc(0x50c)]||_0x225fcc(0xc7);},Game_Screen[_0x2fb0f3(0x481)]['getCoreEngineScreenShakeStyle']=function(){const _0x42da59=_0x2fb0f3;if(this[_0x42da59(0x3b5)]===undefined)this['initCoreEngineScreenShake']();return this[_0x42da59(0x3b5)];},Game_Screen[_0x2fb0f3(0x481)][_0x2fb0f3(0x2b0)]=function(_0x2e363e){const _0x407923=_0x2fb0f3;if(this[_0x407923(0x3b5)]===undefined)this['initCoreEngineScreenShake']();this[_0x407923(0x3b5)]=_0x2e363e[_0x407923(0x4a1)]()['trim']();},Game_Picture[_0x2fb0f3(0x481)][_0x2fb0f3(0x648)]=function(){const _0x4126d2=_0x2fb0f3;if($gameParty[_0x4126d2(0x50b)]())return![];return this[_0x4126d2(0x12d)]()&&this[_0x4126d2(0x12d)]()[_0x4126d2(0x1f2)](0x0)==='!';},VisuMZ[_0x2fb0f3(0x248)]['Game_Picture_x']=Game_Picture[_0x2fb0f3(0x481)]['x'],Game_Picture[_0x2fb0f3(0x481)]['x']=function(){const _0x4227bb=_0x2fb0f3;return this['isMapScrollLinked']()?this[_0x4227bb(0x1b2)]():VisuMZ[_0x4227bb(0x248)][_0x4227bb(0x3f5)][_0x4227bb(0x29c)](this);},Game_Picture[_0x2fb0f3(0x481)][_0x2fb0f3(0x1b2)]=function(){const _0x1f66e8=_0x2fb0f3,_0x587d7d=$gameMap[_0x1f66e8(0xb9)]()*$gameMap[_0x1f66e8(0x17d)]();return this['_x']-_0x587d7d;},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x2db)]=Game_Picture[_0x2fb0f3(0x481)]['y'],Game_Picture[_0x2fb0f3(0x481)]['y']=function(){const _0x5eafd6=_0x2fb0f3;return this['isMapScrollLinked']()?this[_0x5eafd6(0x5ea)]():VisuMZ[_0x5eafd6(0x248)][_0x5eafd6(0x2db)]['call'](this);},Game_Picture['prototype'][_0x2fb0f3(0x5ea)]=function(){const _0x14291b=_0x2fb0f3,_0x4a1848=$gameMap[_0x14291b(0x1f0)]()*$gameMap[_0x14291b(0x51b)]();return this['_y']-_0x4a1848;},Game_Picture[_0x2fb0f3(0x481)][_0x2fb0f3(0x4e6)]=function(_0x3a7c4c){const _0xfb2e6c=_0x2fb0f3;this[_0xfb2e6c(0x623)]=_0x3a7c4c;},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x554)]=Game_Picture[_0x2fb0f3(0x481)][_0x2fb0f3(0x183)],Game_Picture[_0x2fb0f3(0x481)][_0x2fb0f3(0x183)]=function(_0x1dda30){const _0x1cf69b=_0x2fb0f3;return this[_0x1cf69b(0x623)]=this[_0x1cf69b(0x623)]||0x0,[0x0,0x1,0x2,0x3][_0x1cf69b(0x401)](this[_0x1cf69b(0x623)])?VisuMZ['CoreEngine']['Game_Picture_calcEasing'][_0x1cf69b(0x29c)](this,_0x1dda30):VisuMZ[_0x1cf69b(0x13e)](_0x1dda30,this[_0x1cf69b(0x623)]);},VisuMZ['CoreEngine'][_0x2fb0f3(0x489)]=Game_Action[_0x2fb0f3(0x481)]['itemHit'],Game_Action[_0x2fb0f3(0x481)][_0x2fb0f3(0xab)]=function(_0x2ff944){const _0x2dbf27=_0x2fb0f3;return VisuMZ['CoreEngine'][_0x2dbf27(0x452)][_0x2dbf27(0x20f)][_0x2dbf27(0x227)]?this[_0x2dbf27(0x562)](_0x2ff944):VisuMZ[_0x2dbf27(0x248)][_0x2dbf27(0x489)][_0x2dbf27(0x29c)](this,_0x2ff944);},Game_Action['prototype'][_0x2fb0f3(0x562)]=function(_0x55dec5){const _0x17e651=_0x2fb0f3,_0x244a58=this[_0x17e651(0x41e)](_0x55dec5),_0xae7a60=this[_0x17e651(0x242)](_0x55dec5),_0x5d2f5b=this['targetEvaRate'](_0x55dec5);return _0x244a58*(_0xae7a60-_0x5d2f5b);},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x305)]=Game_Action[_0x2fb0f3(0x481)][_0x2fb0f3(0x2d4)],Game_Action['prototype']['itemEva']=function(_0x2eeaae){const _0x1e0315=_0x2fb0f3;return VisuMZ[_0x1e0315(0x248)]['Settings'][_0x1e0315(0x20f)]['ImprovedAccuracySystem']?0x0:VisuMZ[_0x1e0315(0x248)]['Game_Action_itemEva'][_0x1e0315(0x29c)](this,_0x2eeaae);},Game_Action[_0x2fb0f3(0x481)][_0x2fb0f3(0x41e)]=function(_0x2ce8b8){const _0x1a64ee=_0x2fb0f3;return this[_0x1a64ee(0x122)]()[_0x1a64ee(0x42c)]*0.01;},Game_Action['prototype'][_0x2fb0f3(0x242)]=function(_0x12c9a0){const _0x5dfc18=_0x2fb0f3;if(VisuMZ['CoreEngine'][_0x5dfc18(0x452)][_0x5dfc18(0x20f)][_0x5dfc18(0x25e)]&&this[_0x5dfc18(0x2e7)]())return 0x1;return this[_0x5dfc18(0xb5)]()?VisuMZ[_0x5dfc18(0x248)][_0x5dfc18(0x452)][_0x5dfc18(0x20f)][_0x5dfc18(0x25e)]&&this[_0x5dfc18(0x23e)]()[_0x5dfc18(0x263)]()?this['subject']()[_0x5dfc18(0xf5)]+0.05:this['subject']()[_0x5dfc18(0xf5)]:0x1;},Game_Action[_0x2fb0f3(0x481)][_0x2fb0f3(0x638)]=function(_0x337378){const _0x579e74=_0x2fb0f3;if(this['subject']()[_0x579e74(0x263)]()===_0x337378['isActor']())return 0x0;if(this['isPhysical']())return VisuMZ[_0x579e74(0x248)][_0x579e74(0x452)][_0x579e74(0x20f)][_0x579e74(0x25e)]&&_0x337378[_0x579e74(0x12b)]()?_0x337378['eva']-0.05:_0x337378[_0x579e74(0x2f9)];else return this[_0x579e74(0x2ca)]()?_0x337378[_0x579e74(0x1a8)]:0x0;},VisuMZ['CoreEngine'][_0x2fb0f3(0x295)]=Game_Action[_0x2fb0f3(0x481)][_0x2fb0f3(0x5d8)],Game_Action['prototype'][_0x2fb0f3(0x5d8)]=function(_0x397f1){const _0x334713=_0x2fb0f3;VisuMZ[_0x334713(0x248)][_0x334713(0x295)][_0x334713(0x29c)](this,_0x397f1);if(VisuMZ[_0x334713(0x248)][_0x334713(0x452)][_0x334713(0x20f)][_0x334713(0x227)])return;const _0x1034ee=_0x397f1[_0x334713(0x313)]();_0x1034ee[_0x334713(0x631)]&&(0x1-this['itemEva'](_0x397f1)>this[_0x334713(0xab)](_0x397f1)&&(_0x1034ee[_0x334713(0x631)]=![],_0x1034ee[_0x334713(0x477)]=!![]));},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x4d5)]=Game_BattlerBase[_0x2fb0f3(0x481)][_0x2fb0f3(0x1d4)],Game_BattlerBase['prototype'][_0x2fb0f3(0x1d4)]=function(){const _0x15a747=_0x2fb0f3;this[_0x15a747(0x454)]={},VisuMZ['CoreEngine'][_0x15a747(0x4d5)]['call'](this);},VisuMZ['CoreEngine'][_0x2fb0f3(0x47f)]=Game_BattlerBase[_0x2fb0f3(0x481)]['refresh'],Game_BattlerBase['prototype']['refresh']=function(){const _0x2faa9e=_0x2fb0f3;this['_cache']={},VisuMZ['CoreEngine'][_0x2faa9e(0x47f)][_0x2faa9e(0x29c)](this);},Game_BattlerBase[_0x2fb0f3(0x481)][_0x2fb0f3(0x20b)]=function(_0x2edc0a){const _0x358e13=_0x2fb0f3;return this[_0x358e13(0x454)]=this['_cache']||{},this[_0x358e13(0x454)][_0x2edc0a]!==undefined;},Game_BattlerBase['prototype'][_0x2fb0f3(0x4dc)]=function(_0x5d19a9){const _0x5b21fd=_0x2fb0f3,_0x362197=(_0x16b927,_0x20e986)=>{const _0x21e9ec=_0x281a;if(!_0x20e986)return _0x16b927;if(_0x20e986[_0x21e9ec(0x22e)][_0x21e9ec(0x573)](VisuMZ['CoreEngine'][_0x21e9ec(0x262)]['paramPlus'][_0x5d19a9])){var _0x1fb795=Number(RegExp['$1']);_0x16b927+=_0x1fb795;}if(_0x20e986[_0x21e9ec(0x22e)][_0x21e9ec(0x573)](VisuMZ[_0x21e9ec(0x248)][_0x21e9ec(0x262)][_0x21e9ec(0x581)][_0x5d19a9])){var _0x270b2a=String(RegExp['$1']);try{_0x16b927+=eval(_0x270b2a);}catch(_0x5c7632){if($gameTemp['isPlaytest']())console[_0x21e9ec(0x205)](_0x5c7632);}}return _0x16b927;};return this[_0x5b21fd(0xdf)]()['reduce'](_0x362197,this[_0x5b21fd(0x44c)][_0x5d19a9]);},Game_BattlerBase[_0x2fb0f3(0x481)][_0x2fb0f3(0x20d)]=function(_0x4401fa){const _0x30775d=_0x2fb0f3;var _0x203b7f='Basic'+(this[_0x30775d(0x263)]()?'Actor':'Enemy')+'ParamMax'+_0x4401fa;if(this[_0x30775d(0x20b)](_0x203b7f))return this[_0x30775d(0x454)][_0x203b7f];this[_0x30775d(0x454)][_0x203b7f]=eval(VisuMZ[_0x30775d(0x248)]['Settings']['Param'][_0x203b7f]);const _0x3e6a03=(_0x430cde,_0x5a6ffb)=>{const _0x246672=_0x30775d;if(!_0x5a6ffb)return _0x430cde;if(_0x5a6ffb[_0x246672(0x22e)][_0x246672(0x573)](VisuMZ[_0x246672(0x248)][_0x246672(0x262)][_0x246672(0x20d)][_0x4401fa])){var _0x56e986=Number(RegExp['$1']);if(_0x56e986===0x0)_0x56e986=Number['MAX_SAFE_INTEGER'];_0x430cde=Math['max'](_0x430cde,_0x56e986);}if(_0x5a6ffb['note']['match'](VisuMZ[_0x246672(0x248)]['RegExp']['paramMaxJS'][_0x4401fa])){var _0x4c897f=String(RegExp['$1']);try{_0x430cde=Math['max'](_0x430cde,Number(eval(_0x4c897f)));}catch(_0x2a99c3){if($gameTemp[_0x246672(0x655)]())console[_0x246672(0x205)](_0x2a99c3);}}return _0x430cde;};if(this['_cache'][_0x203b7f]===0x0)this['_cache'][_0x203b7f]=Number[_0x30775d(0x329)];return this['_cache'][_0x203b7f]=this[_0x30775d(0xdf)]()[_0x30775d(0x5bd)](_0x3e6a03,this[_0x30775d(0x454)][_0x203b7f]),this[_0x30775d(0x454)][_0x203b7f];},Game_BattlerBase[_0x2fb0f3(0x481)]['paramRate']=function(_0x1350f2){const _0x373c95=_0x2fb0f3,_0x1d41bc=this[_0x373c95(0x532)](Game_BattlerBase[_0x373c95(0x365)],_0x1350f2),_0x14bf9f=(_0x41ea36,_0x471275)=>{const _0x872dfd=_0x373c95;if(!_0x471275)return _0x41ea36;if(_0x471275[_0x872dfd(0x22e)]['match'](VisuMZ[_0x872dfd(0x248)][_0x872dfd(0x262)]['paramRate1'][_0x1350f2])){var _0x4a036f=Number(RegExp['$1'])/0x64;_0x41ea36*=_0x4a036f;}if(_0x471275['note'][_0x872dfd(0x573)](VisuMZ[_0x872dfd(0x248)][_0x872dfd(0x262)]['paramRate2'][_0x1350f2])){var _0x4a036f=Number(RegExp['$1']);_0x41ea36*=_0x4a036f;}if(_0x471275['note'][_0x872dfd(0x573)](VisuMZ['CoreEngine'][_0x872dfd(0x262)][_0x872dfd(0x5f9)][_0x1350f2])){var _0x535bcc=String(RegExp['$1']);try{_0x41ea36*=eval(_0x535bcc);}catch(_0x35295e){if($gameTemp[_0x872dfd(0x655)]())console[_0x872dfd(0x205)](_0x35295e);}}return _0x41ea36;};return this[_0x373c95(0xdf)]()['reduce'](_0x14bf9f,_0x1d41bc);},Game_BattlerBase[_0x2fb0f3(0x481)]['paramFlatBonus']=function(_0xc15ed5){const _0x802206=_0x2fb0f3,_0x16b7f3=(_0x43ea52,_0x2e9745)=>{const _0x2eed9e=_0x281a;if(!_0x2e9745)return _0x43ea52;if(_0x2e9745[_0x2eed9e(0x22e)][_0x2eed9e(0x573)](VisuMZ['CoreEngine'][_0x2eed9e(0x262)][_0x2eed9e(0x190)][_0xc15ed5])){var _0x341e36=Number(RegExp['$1']);_0x43ea52+=_0x341e36;}if(_0x2e9745[_0x2eed9e(0x22e)][_0x2eed9e(0x573)](VisuMZ[_0x2eed9e(0x248)][_0x2eed9e(0x262)][_0x2eed9e(0x137)][_0xc15ed5])){var _0x1baacf=String(RegExp['$1']);try{_0x43ea52+=eval(_0x1baacf);}catch(_0x486bdb){if($gameTemp[_0x2eed9e(0x655)]())console['log'](_0x486bdb);}}return _0x43ea52;};return this[_0x802206(0xdf)]()[_0x802206(0x5bd)](_0x16b7f3,0x0);},Game_BattlerBase[_0x2fb0f3(0x481)][_0x2fb0f3(0x42a)]=function(_0x4e96c5){const _0xe196d4=_0x2fb0f3;let _0x5ce0b0=_0xe196d4(0x42a)+_0x4e96c5+'Total';if(this[_0xe196d4(0x20b)](_0x5ce0b0))return this[_0xe196d4(0x454)][_0x5ce0b0];return this[_0xe196d4(0x454)][_0x5ce0b0]=Math[_0xe196d4(0x132)](VisuMZ[_0xe196d4(0x248)][_0xe196d4(0x452)][_0xe196d4(0x491)][_0xe196d4(0x4a2)][_0xe196d4(0x29c)](this,_0x4e96c5)),this[_0xe196d4(0x454)][_0x5ce0b0];},Game_BattlerBase[_0x2fb0f3(0x481)][_0x2fb0f3(0xbd)]=function(_0x45ab94){const _0x291a8b=_0x2fb0f3,_0x24fbbd=(_0x55784f,_0x119bbd)=>{const _0x561c46=_0x281a;if(!_0x119bbd)return _0x55784f;if(_0x119bbd[_0x561c46(0x22e)][_0x561c46(0x573)](VisuMZ['CoreEngine'][_0x561c46(0x262)][_0x561c46(0x323)][_0x45ab94])){var _0xdbf848=Number(RegExp['$1'])/0x64;_0x55784f+=_0xdbf848;}if(_0x119bbd['note'][_0x561c46(0x573)](VisuMZ[_0x561c46(0x248)][_0x561c46(0x262)][_0x561c46(0x10c)][_0x45ab94])){var _0xdbf848=Number(RegExp['$1']);_0x55784f+=_0xdbf848;}if(_0x119bbd[_0x561c46(0x22e)][_0x561c46(0x573)](VisuMZ['CoreEngine'][_0x561c46(0x262)]['xparamPlusJS'][_0x45ab94])){var _0x2a6ed4=String(RegExp['$1']);try{_0x55784f+=eval(_0x2a6ed4);}catch(_0x48b74f){if($gameTemp[_0x561c46(0x655)]())console[_0x561c46(0x205)](_0x48b74f);}}return _0x55784f;};return this[_0x291a8b(0xdf)]()[_0x291a8b(0x5bd)](_0x24fbbd,0x0);},Game_BattlerBase[_0x2fb0f3(0x481)][_0x2fb0f3(0x45e)]=function(_0x58854e){const _0x212acd=_0x2fb0f3,_0x2c4f73=(_0x525bef,_0x536ef6)=>{const _0x2d5971=_0x281a;if(!_0x536ef6)return _0x525bef;if(_0x536ef6[_0x2d5971(0x22e)][_0x2d5971(0x573)](VisuMZ['CoreEngine'][_0x2d5971(0x262)]['xparamRate1'][_0x58854e])){var _0xb45717=Number(RegExp['$1'])/0x64;_0x525bef*=_0xb45717;}if(_0x536ef6[_0x2d5971(0x22e)][_0x2d5971(0x573)](VisuMZ[_0x2d5971(0x248)][_0x2d5971(0x262)][_0x2d5971(0x4d0)][_0x58854e])){var _0xb45717=Number(RegExp['$1']);_0x525bef*=_0xb45717;}if(_0x536ef6[_0x2d5971(0x22e)][_0x2d5971(0x573)](VisuMZ[_0x2d5971(0x248)]['RegExp'][_0x2d5971(0x60e)][_0x58854e])){var _0x31d51d=String(RegExp['$1']);try{_0x525bef*=eval(_0x31d51d);}catch(_0xf366f3){if($gameTemp[_0x2d5971(0x655)]())console[_0x2d5971(0x205)](_0xf366f3);}}return _0x525bef;};return this[_0x212acd(0xdf)]()[_0x212acd(0x5bd)](_0x2c4f73,0x1);},Game_BattlerBase[_0x2fb0f3(0x481)][_0x2fb0f3(0x136)]=function(_0x366f53){const _0x3b5822=_0x2fb0f3,_0x2e7ba1=(_0x468010,_0x249b3d)=>{const _0x4aa75c=_0x281a;if(!_0x249b3d)return _0x468010;if(_0x249b3d[_0x4aa75c(0x22e)][_0x4aa75c(0x573)](VisuMZ['CoreEngine'][_0x4aa75c(0x262)][_0x4aa75c(0x258)][_0x366f53])){var _0x4732ce=Number(RegExp['$1'])/0x64;_0x468010+=_0x4732ce;}if(_0x249b3d[_0x4aa75c(0x22e)]['match'](VisuMZ[_0x4aa75c(0x248)][_0x4aa75c(0x262)]['xparamFlat2'][_0x366f53])){var _0x4732ce=Number(RegExp['$1']);_0x468010+=_0x4732ce;}if(_0x249b3d[_0x4aa75c(0x22e)][_0x4aa75c(0x573)](VisuMZ[_0x4aa75c(0x248)][_0x4aa75c(0x262)]['xparamFlatJS'][_0x366f53])){var _0x5b804b=String(RegExp['$1']);try{_0x468010+=eval(_0x5b804b);}catch(_0x781b18){if($gameTemp[_0x4aa75c(0x655)]())console['log'](_0x781b18);}}return _0x468010;};return this[_0x3b5822(0xdf)]()[_0x3b5822(0x5bd)](_0x2e7ba1,0x0);},Game_BattlerBase[_0x2fb0f3(0x481)][_0x2fb0f3(0x15f)]=function(_0x53be66){const _0x31ca33=_0x2fb0f3;let _0x187f17='xparam'+_0x53be66+_0x31ca33(0x58d);if(this[_0x31ca33(0x20b)](_0x187f17))return this[_0x31ca33(0x454)][_0x187f17];return this[_0x31ca33(0x454)][_0x187f17]=VisuMZ[_0x31ca33(0x248)]['Settings']['Param'][_0x31ca33(0x129)][_0x31ca33(0x29c)](this,_0x53be66),this[_0x31ca33(0x454)][_0x187f17];},Game_BattlerBase[_0x2fb0f3(0x481)][_0x2fb0f3(0x375)]=function(_0x424cf2){const _0x4f7286=_0x2fb0f3,_0x887836=(_0x121341,_0x1a9023)=>{const _0x350539=_0x281a;if(!_0x1a9023)return _0x121341;if(_0x1a9023[_0x350539(0x22e)][_0x350539(0x573)](VisuMZ[_0x350539(0x248)][_0x350539(0x262)][_0x350539(0x53e)][_0x424cf2])){var _0x5523d4=Number(RegExp['$1'])/0x64;_0x121341+=_0x5523d4;}if(_0x1a9023[_0x350539(0x22e)][_0x350539(0x573)](VisuMZ[_0x350539(0x248)]['RegExp'][_0x350539(0x34c)][_0x424cf2])){var _0x5523d4=Number(RegExp['$1']);_0x121341+=_0x5523d4;}if(_0x1a9023['note'][_0x350539(0x573)](VisuMZ[_0x350539(0x248)][_0x350539(0x262)][_0x350539(0x9c)][_0x424cf2])){var _0x3eb64d=String(RegExp['$1']);try{_0x121341+=eval(_0x3eb64d);}catch(_0x17bfbb){if($gameTemp['isPlaytest']())console[_0x350539(0x205)](_0x17bfbb);}}return _0x121341;};return this[_0x4f7286(0xdf)]()['reduce'](_0x887836,0x0);},Game_BattlerBase[_0x2fb0f3(0x481)]['sparamRate']=function(_0x51e9e3){const _0x2ab15d=_0x2fb0f3,_0x180916=(_0x4ff70a,_0x30a278)=>{const _0xb454d7=_0x281a;if(!_0x30a278)return _0x4ff70a;if(_0x30a278[_0xb454d7(0x22e)]['match'](VisuMZ[_0xb454d7(0x248)]['RegExp'][_0xb454d7(0x95)][_0x51e9e3])){var _0x3a9382=Number(RegExp['$1'])/0x64;_0x4ff70a*=_0x3a9382;}if(_0x30a278[_0xb454d7(0x22e)][_0xb454d7(0x573)](VisuMZ[_0xb454d7(0x248)][_0xb454d7(0x262)][_0xb454d7(0x359)][_0x51e9e3])){var _0x3a9382=Number(RegExp['$1']);_0x4ff70a*=_0x3a9382;}if(_0x30a278['note']['match'](VisuMZ['CoreEngine']['RegExp']['sparamRateJS'][_0x51e9e3])){var _0x4bc3bf=String(RegExp['$1']);try{_0x4ff70a*=eval(_0x4bc3bf);}catch(_0x3a9ca9){if($gameTemp['isPlaytest']())console['log'](_0x3a9ca9);}}return _0x4ff70a;};return this[_0x2ab15d(0xdf)]()[_0x2ab15d(0x5bd)](_0x180916,0x1);},Game_BattlerBase['prototype'][_0x2fb0f3(0x33c)]=function(_0x599766){const _0x4dbcb8=(_0x182494,_0x464801)=>{const _0x4625f5=_0x281a;if(!_0x464801)return _0x182494;if(_0x464801[_0x4625f5(0x22e)]['match'](VisuMZ[_0x4625f5(0x248)][_0x4625f5(0x262)][_0x4625f5(0x29a)][_0x599766])){var _0x35ecb5=Number(RegExp['$1'])/0x64;_0x182494+=_0x35ecb5;}if(_0x464801[_0x4625f5(0x22e)][_0x4625f5(0x573)](VisuMZ[_0x4625f5(0x248)][_0x4625f5(0x262)][_0x4625f5(0x3d7)][_0x599766])){var _0x35ecb5=Number(RegExp['$1']);_0x182494+=_0x35ecb5;}if(_0x464801[_0x4625f5(0x22e)]['match'](VisuMZ['CoreEngine'][_0x4625f5(0x262)][_0x4625f5(0x4cc)][_0x599766])){var _0x44ae3a=String(RegExp['$1']);try{_0x182494+=eval(_0x44ae3a);}catch(_0x2eae7b){if($gameTemp[_0x4625f5(0x655)]())console['log'](_0x2eae7b);}}return _0x182494;};return this['traitObjects']()['reduce'](_0x4dbcb8,0x0);},Game_BattlerBase[_0x2fb0f3(0x481)][_0x2fb0f3(0x61a)]=function(_0x5263c0){const _0x2a05b1=_0x2fb0f3;let _0xae8ea4=_0x2a05b1(0x61a)+_0x5263c0+_0x2a05b1(0x58d);if(this['checkCacheKey'](_0xae8ea4))return this[_0x2a05b1(0x454)][_0xae8ea4];return this['_cache'][_0xae8ea4]=VisuMZ[_0x2a05b1(0x248)][_0x2a05b1(0x452)][_0x2a05b1(0x491)][_0x2a05b1(0x46e)][_0x2a05b1(0x29c)](this,_0x5263c0),this[_0x2a05b1(0x454)][_0xae8ea4];},Game_BattlerBase[_0x2fb0f3(0x481)]['paramValueByName']=function(_0x56047a,_0x22b9c2){const _0x46a2ba=_0x2fb0f3;if(typeof paramId===_0x46a2ba(0x1be))return this[_0x46a2ba(0x42a)](_0x56047a);_0x56047a=String(_0x56047a||'')['toUpperCase']();if(_0x56047a==='MAXHP')return this['param'](0x0);if(_0x56047a===_0x46a2ba(0x3bf))return this[_0x46a2ba(0x42a)](0x1);if(_0x56047a==='ATK')return this[_0x46a2ba(0x42a)](0x2);if(_0x56047a===_0x46a2ba(0x420))return this[_0x46a2ba(0x42a)](0x3);if(_0x56047a===_0x46a2ba(0x146))return this['param'](0x4);if(_0x56047a==='MDF')return this[_0x46a2ba(0x42a)](0x5);if(_0x56047a==='AGI')return this[_0x46a2ba(0x42a)](0x6);if(_0x56047a===_0x46a2ba(0x605))return this[_0x46a2ba(0x42a)](0x7);if(_0x56047a===_0x46a2ba(0x416))return _0x22b9c2?String(Math[_0x46a2ba(0x132)](this[_0x46a2ba(0x15f)](0x0)*0x64))+'%':this['xparam'](0x0);if(_0x56047a==='EVA')return _0x22b9c2?String(Math[_0x46a2ba(0x132)](this[_0x46a2ba(0x15f)](0x1)*0x64))+'%':this['xparam'](0x1);if(_0x56047a===_0x46a2ba(0xca))return _0x22b9c2?String(Math[_0x46a2ba(0x132)](this['xparam'](0x2)*0x64))+'%':this['xparam'](0x2);if(_0x56047a===_0x46a2ba(0x635))return _0x22b9c2?String(Math[_0x46a2ba(0x132)](this[_0x46a2ba(0x15f)](0x3)*0x64))+'%':this[_0x46a2ba(0x15f)](0x3);if(_0x56047a==='MEV')return _0x22b9c2?String(Math['round'](this[_0x46a2ba(0x15f)](0x4)*0x64))+'%':this['xparam'](0x4);if(_0x56047a==='MRF')return _0x22b9c2?String(Math[_0x46a2ba(0x132)](this[_0x46a2ba(0x15f)](0x5)*0x64))+'%':this[_0x46a2ba(0x15f)](0x5);if(_0x56047a==='CNT')return _0x22b9c2?String(Math['round'](this['xparam'](0x6)*0x64))+'%':this[_0x46a2ba(0x15f)](0x6);if(_0x56047a===_0x46a2ba(0x56a))return _0x22b9c2?String(Math[_0x46a2ba(0x132)](this['xparam'](0x7)*0x64))+'%':this[_0x46a2ba(0x15f)](0x7);if(_0x56047a==='MRG')return _0x22b9c2?String(Math[_0x46a2ba(0x132)](this[_0x46a2ba(0x15f)](0x8)*0x64))+'%':this['xparam'](0x8);if(_0x56047a===_0x46a2ba(0x63c))return _0x22b9c2?String(Math[_0x46a2ba(0x132)](this[_0x46a2ba(0x15f)](0x9)*0x64))+'%':this['xparam'](0x9);if(_0x56047a===_0x46a2ba(0x218))return _0x22b9c2?String(Math[_0x46a2ba(0x132)](this[_0x46a2ba(0x61a)](0x0)*0x64))+'%':this['sparam'](0x0);if(_0x56047a===_0x46a2ba(0x35d))return _0x22b9c2?String(Math[_0x46a2ba(0x132)](this['sparam'](0x1)*0x64))+'%':this[_0x46a2ba(0x61a)](0x1);if(_0x56047a===_0x46a2ba(0x1f5))return _0x22b9c2?String(Math[_0x46a2ba(0x132)](this['sparam'](0x2)*0x64))+'%':this[_0x46a2ba(0x61a)](0x2);if(_0x56047a==='PHA')return _0x22b9c2?String(Math[_0x46a2ba(0x132)](this[_0x46a2ba(0x61a)](0x3)*0x64))+'%':this[_0x46a2ba(0x61a)](0x3);if(_0x56047a===_0x46a2ba(0x57a))return _0x22b9c2?String(Math[_0x46a2ba(0x132)](this[_0x46a2ba(0x61a)](0x4)*0x64))+'%':this['sparam'](0x4);if(_0x56047a==='TCR')return _0x22b9c2?String(Math['round'](this[_0x46a2ba(0x61a)](0x5)*0x64))+'%':this['sparam'](0x5);if(_0x56047a===_0x46a2ba(0x19b))return _0x22b9c2?String(Math[_0x46a2ba(0x132)](this[_0x46a2ba(0x61a)](0x6)*0x64))+'%':this['sparam'](0x6);if(_0x56047a===_0x46a2ba(0x332))return _0x22b9c2?String(Math[_0x46a2ba(0x132)](this['sparam'](0x7)*0x64))+'%':this[_0x46a2ba(0x61a)](0x7);if(_0x56047a===_0x46a2ba(0x2c1))return _0x22b9c2?String(Math[_0x46a2ba(0x132)](this['sparam'](0x8)*0x64))+'%':this[_0x46a2ba(0x61a)](0x8);if(_0x56047a===_0x46a2ba(0x40a))return _0x22b9c2?String(Math[_0x46a2ba(0x132)](this[_0x46a2ba(0x61a)](0x9)*0x64))+'%':this['sparam'](0x9);if(VisuMZ[_0x46a2ba(0x248)]['CustomParamAbb'][_0x56047a]){const _0x484e=VisuMZ[_0x46a2ba(0x248)][_0x46a2ba(0x253)][_0x56047a],_0x1f45e1=this[_0x484e];return VisuMZ[_0x46a2ba(0x248)][_0x46a2ba(0x1b5)][_0x56047a]==='integer'?_0x1f45e1:_0x22b9c2?String(Math[_0x46a2ba(0x132)](_0x1f45e1*0x64))+'%':_0x1f45e1;}return'';},Game_BattlerBase[_0x2fb0f3(0x481)][_0x2fb0f3(0x56d)]=function(){const _0x5c8252=_0x2fb0f3;return this[_0x5c8252(0x2c5)]()&&this[_0x5c8252(0xf2)]<this['mhp']*VisuMZ[_0x5c8252(0x248)][_0x5c8252(0x452)]['Param'][_0x5c8252(0xc6)];},Game_Battler[_0x2fb0f3(0x481)]['performMiss']=function(){const _0x4db9e8=_0x2fb0f3;SoundManager[_0x4db9e8(0xd5)](),this[_0x4db9e8(0xe0)](_0x4db9e8(0x1bf));},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x319)]=Game_Actor[_0x2fb0f3(0x481)][_0x2fb0f3(0x5fd)],Game_Actor[_0x2fb0f3(0x481)][_0x2fb0f3(0x5fd)]=function(_0x4d7618){const _0x384d5a=_0x2fb0f3;if(this[_0x384d5a(0x5e5)]>0x63)return this['paramBaseAboveLevel99'](_0x4d7618);return VisuMZ['CoreEngine'][_0x384d5a(0x319)][_0x384d5a(0x29c)](this,_0x4d7618);},Game_Actor[_0x2fb0f3(0x481)][_0x2fb0f3(0xe3)]=function(_0x4911f9){const _0x43c847=_0x2fb0f3,_0x284ae3=this[_0x43c847(0x3da)]()[_0x43c847(0x3e6)][_0x4911f9][0x63],_0x292e2b=this[_0x43c847(0x3da)]()[_0x43c847(0x3e6)][_0x4911f9][0x62];return _0x284ae3+(_0x284ae3-_0x292e2b)*(this[_0x43c847(0x5e5)]-0x63);},VisuMZ['CoreEngine']['Game_Actor_changeClass']=Game_Actor[_0x2fb0f3(0x481)][_0x2fb0f3(0x59f)],Game_Actor['prototype'][_0x2fb0f3(0x59f)]=function(_0x5beaf4,_0x3b2b7f){const _0x674b1f=_0x2fb0f3;$gameTemp[_0x674b1f(0x90)]=!![],VisuMZ[_0x674b1f(0x248)][_0x674b1f(0x5da)][_0x674b1f(0x29c)](this,_0x5beaf4,_0x3b2b7f),$gameTemp[_0x674b1f(0x90)]=undefined;},VisuMZ['CoreEngine'][_0x2fb0f3(0xae)]=Game_Actor[_0x2fb0f3(0x481)][_0x2fb0f3(0x52c)],Game_Actor['prototype']['levelUp']=function(){const _0x13a662=_0x2fb0f3;VisuMZ[_0x13a662(0x248)]['Game_Actor_levelUp']['call'](this);if(!$gameTemp[_0x13a662(0x90)])this['levelUpRecovery']();},Game_Actor[_0x2fb0f3(0x481)][_0x2fb0f3(0x21d)]=function(){const _0x3fc234=_0x2fb0f3;this[_0x3fc234(0x454)]={};if(VisuMZ['CoreEngine'][_0x3fc234(0x452)]['QoL']['LevelUpFullHp'])this[_0x3fc234(0xf2)]=this[_0x3fc234(0x48f)];if(VisuMZ['CoreEngine'][_0x3fc234(0x452)][_0x3fc234(0x20f)][_0x3fc234(0x96)])this['_mp']=this[_0x3fc234(0x1dc)];},Game_Actor[_0x2fb0f3(0x481)]['expRate']=function(){const _0x38ab49=_0x2fb0f3;if(this[_0x38ab49(0x121)]())return 0x1;const _0xf7517c=this[_0x38ab49(0x3ec)]()-this[_0x38ab49(0x1d1)](),_0x32ed5f=this[_0x38ab49(0xfa)]()-this['currentLevelExp']();return(_0x32ed5f/_0xf7517c)[_0x38ab49(0x572)](0x0,0x1);},Game_Actor[_0x2fb0f3(0x481)][_0x2fb0f3(0xdf)]=function(){const _0x43e38f=_0x2fb0f3,_0x3fc1a0=Game_Battler[_0x43e38f(0x481)]['traitObjects']['call'](this);for(const _0x263c88 of this[_0x43e38f(0x9b)]()){_0x263c88&&_0x3fc1a0['push'](_0x263c88);}return _0x3fc1a0[_0x43e38f(0x653)](this[_0x43e38f(0x3da)](),this[_0x43e38f(0x1e5)]()),_0x3fc1a0;},Object['defineProperty'](Game_Enemy[_0x2fb0f3(0x481)],'level',{'get':function(){const _0x3dfb68=_0x2fb0f3;return this[_0x3dfb68(0x23f)]();},'configurable':!![]}),Game_Enemy['prototype'][_0x2fb0f3(0x23f)]=function(){const _0x41c42d=_0x2fb0f3;return this[_0x41c42d(0x367)]()[_0x41c42d(0x5e5)];},Game_Enemy[_0x2fb0f3(0x481)][_0x2fb0f3(0x285)]=function(){const _0x369bd3=_0x2fb0f3;!this[_0x369bd3(0x3b8)]&&(this[_0x369bd3(0x5f7)]+=Math[_0x369bd3(0x132)]((Graphics[_0x369bd3(0x49e)]-0x270)/0x2),this[_0x369bd3(0x5f7)]-=Math['floor']((Graphics[_0x369bd3(0x49e)]-Graphics[_0x369bd3(0x173)])/0x2),$gameSystem[_0x369bd3(0x3e9)]()?this[_0x369bd3(0x1a9)]-=Math['floor']((Graphics[_0x369bd3(0x3fb)]-Graphics[_0x369bd3(0x5a3)])/0x2):this[_0x369bd3(0x1a9)]+=Math[_0x369bd3(0x132)]((Graphics[_0x369bd3(0x5a3)]-0x330)/0x2)),this[_0x369bd3(0x3b8)]=!![];},Game_Party['prototype'][_0x2fb0f3(0x516)]=function(){return VisuMZ['CoreEngine']['Settings']['Gold']['GoldMax'];},VisuMZ['CoreEngine'][_0x2fb0f3(0x3b2)]=Game_Party[_0x2fb0f3(0x481)][_0x2fb0f3(0x41f)],Game_Party['prototype'][_0x2fb0f3(0x41f)]=function(_0x50b1f3){const _0x347183=_0x2fb0f3;if(VisuMZ[_0x347183(0x248)]['Settings'][_0x347183(0x20f)][_0x347183(0x4be)]&&DataManager[_0x347183(0x2bb)](_0x50b1f3))return;VisuMZ['CoreEngine'][_0x347183(0x3b2)][_0x347183(0x29c)](this,_0x50b1f3);},VisuMZ[_0x2fb0f3(0x248)]['Game_Troop_setup']=Game_Troop[_0x2fb0f3(0x481)][_0x2fb0f3(0x496)],Game_Troop[_0x2fb0f3(0x481)]['setup']=function(_0x4a58f1){const _0x25850b=_0x2fb0f3;$gameTemp[_0x25850b(0x283)](),$gameTemp[_0x25850b(0x456)](_0x4a58f1),VisuMZ[_0x25850b(0x248)][_0x25850b(0x1fe)][_0x25850b(0x29c)](this,_0x4a58f1);},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x473)]=Game_Map[_0x2fb0f3(0x481)][_0x2fb0f3(0x496)],Game_Map[_0x2fb0f3(0x481)]['setup']=function(_0x494d1f){const _0x4bd648=_0x2fb0f3;VisuMZ[_0x4bd648(0x248)]['Game_Map_setup'][_0x4bd648(0x29c)](this,_0x494d1f),this['setupCoreEngine'](_0x494d1f);},Game_Map[_0x2fb0f3(0x481)][_0x2fb0f3(0x4b9)]=function(){const _0xe7e56e=_0x2fb0f3;this['_hideTileShadows']=VisuMZ[_0xe7e56e(0x248)][_0xe7e56e(0x452)][_0xe7e56e(0x20f)]['NoTileShadows']||![];if($dataMap&&$dataMap[_0xe7e56e(0x22e)]){if($dataMap[_0xe7e56e(0x22e)][_0xe7e56e(0x573)](/<SHOW TILE SHADOWS>/i))this['_hideTileShadows']=![];if($dataMap['note'][_0xe7e56e(0x573)](/<HIDE TILE SHADOWS>/i))this[_0xe7e56e(0xa9)]=!![];}},Game_Map['prototype'][_0x2fb0f3(0x545)]=function(){const _0x444a28=_0x2fb0f3;if(this[_0x444a28(0xa9)]===undefined)this[_0x444a28(0x4b9)]();return this[_0x444a28(0xa9)];},VisuMZ[_0x2fb0f3(0x248)]['Game_Character_processMoveCommand']=Game_Character[_0x2fb0f3(0x481)]['processMoveCommand'],Game_Character[_0x2fb0f3(0x481)][_0x2fb0f3(0x54c)]=function(_0x4e0998){const _0x46ad57=_0x2fb0f3;try{VisuMZ['CoreEngine'][_0x46ad57(0x13d)]['call'](this,_0x4e0998);}catch(_0x5cdfec){if($gameTemp['isPlaytest']())console[_0x46ad57(0x205)](_0x5cdfec);}},Game_Player['prototype'][_0x2fb0f3(0x406)]=function(){const _0x11ad6c=_0x2fb0f3,_0x45166f=$gameMap['encounterStep']();this[_0x11ad6c(0x3b0)]=Math[_0x11ad6c(0x17e)](_0x45166f)+Math[_0x11ad6c(0x17e)](_0x45166f)+this[_0x11ad6c(0x58f)]();},Game_Player[_0x2fb0f3(0x481)][_0x2fb0f3(0x58f)]=function(){const _0x141883=_0x2fb0f3;return $dataMap&&$dataMap[_0x141883(0x22e)]&&$dataMap['note']['match'](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ[_0x141883(0x248)][_0x141883(0x452)][_0x141883(0x20f)][_0x141883(0x16c)];},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x363)]=Game_Event[_0x2fb0f3(0x481)]['isCollidedWithEvents'],Game_Event[_0x2fb0f3(0x481)]['isCollidedWithEvents']=function(_0x1309c9,_0x5acc8f){const _0x12a2ee=_0x2fb0f3;return this[_0x12a2ee(0x240)]()?this[_0x12a2ee(0x520)](_0x1309c9,_0x5acc8f):VisuMZ[_0x12a2ee(0x248)][_0x12a2ee(0x363)][_0x12a2ee(0x29c)](this,_0x1309c9,_0x5acc8f);},Game_Event[_0x2fb0f3(0x481)][_0x2fb0f3(0x240)]=function(){const _0x2bb8c2=_0x2fb0f3;return VisuMZ[_0x2bb8c2(0x248)]['Settings']['QoL'][_0x2bb8c2(0x9f)];},Game_Event[_0x2fb0f3(0x481)][_0x2fb0f3(0x520)]=function(_0x2e83de,_0x3e4876){const _0x562bd1=_0x2fb0f3;if(!this[_0x562bd1(0x51f)]())return![];else{const _0x5086cc=$gameMap[_0x562bd1(0x5fb)](_0x2e83de,_0x3e4876)['filter'](_0x19861c=>_0x19861c['isNormalPriority']());return _0x5086cc[_0x562bd1(0x105)]>0x0;}},VisuMZ['CoreEngine'][_0x2fb0f3(0x335)]=Game_Interpreter[_0x2fb0f3(0x481)][_0x2fb0f3(0xed)],Game_Interpreter[_0x2fb0f3(0x481)][_0x2fb0f3(0xed)]=function(_0x1aa4cd){const _0x4e0165=_0x2fb0f3,_0x44fdf4=this['getCombinedScrollingText']();return _0x44fdf4[_0x4e0165(0x573)](/\/\/[ ]SCRIPT[ ]CALL/i)?this['runCombinedScrollingTextAsCode'](_0x44fdf4):VisuMZ[_0x4e0165(0x248)][_0x4e0165(0x335)][_0x4e0165(0x29c)](this,_0x1aa4cd);},Game_Interpreter[_0x2fb0f3(0x481)][_0x2fb0f3(0x344)]=function(){const _0xc81551=_0x2fb0f3;let _0x37424e='',_0x38b7af=this[_0xc81551(0x171)]+0x1;while(this[_0xc81551(0x2cf)][_0x38b7af]&&this['_list'][_0x38b7af][_0xc81551(0x4d8)]===0x195){_0x37424e+=this[_0xc81551(0x2cf)][_0x38b7af][_0xc81551(0x213)][0x0]+'\x0a',_0x38b7af++;}return _0x37424e;},Game_Interpreter[_0x2fb0f3(0x481)]['runCombinedScrollingTextAsCode']=function(_0x334539){const _0x19620d=_0x2fb0f3;try{eval(_0x334539);}catch(_0x231090){$gameTemp[_0x19620d(0x655)]()&&(console[_0x19620d(0x205)]('Show\x20Scrolling\x20Text\x20Script\x20Error'),console[_0x19620d(0x205)](_0x231090));}return!![];},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x4c7)]=Game_Interpreter[_0x2fb0f3(0x481)]['command111'],Game_Interpreter[_0x2fb0f3(0x481)][_0x2fb0f3(0x244)]=function(_0x2d5c92){const _0x322e90=_0x2fb0f3;try{VisuMZ[_0x322e90(0x248)][_0x322e90(0x4c7)][_0x322e90(0x29c)](this,_0x2d5c92);}catch(_0x1b1189){$gameTemp[_0x322e90(0x655)]()&&(console[_0x322e90(0x205)]('Conditional\x20Branch\x20Script\x20Error'),console['log'](_0x1b1189)),this['skipBranch']();}return!![];},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x18f)]=Game_Interpreter[_0x2fb0f3(0x481)][_0x2fb0f3(0x649)],Game_Interpreter[_0x2fb0f3(0x481)][_0x2fb0f3(0x649)]=function(_0xbdbb9a){const _0x47394c=_0x2fb0f3;try{VisuMZ[_0x47394c(0x248)][_0x47394c(0x18f)]['call'](this,_0xbdbb9a);}catch(_0x57e2bd){$gameTemp['isPlaytest']()&&(console[_0x47394c(0x205)](_0x47394c(0x33d)),console[_0x47394c(0x205)](_0x57e2bd));}return!![];},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x570)]=Game_Interpreter['prototype'][_0x2fb0f3(0x12f)],Game_Interpreter[_0x2fb0f3(0x481)][_0x2fb0f3(0x12f)]=function(){const _0x308a3f=_0x2fb0f3;try{VisuMZ[_0x308a3f(0x248)]['Game_Interpreter_command355'][_0x308a3f(0x29c)](this);}catch(_0x8b44f0){$gameTemp[_0x308a3f(0x655)]()&&(console[_0x308a3f(0x205)]('Script\x20Call\x20Error'),console[_0x308a3f(0x205)](_0x8b44f0));}return!![];},VisuMZ[_0x2fb0f3(0x248)]['Game_Interpreter_PluginCommand']=Game_Interpreter[_0x2fb0f3(0x481)][_0x2fb0f3(0x395)],Game_Interpreter['prototype'][_0x2fb0f3(0x395)]=function(_0xdda788){const _0x1f88b5=_0x2fb0f3;return $gameTemp['setLastPluginCommandInterpreter'](this),VisuMZ['CoreEngine']['Game_Interpreter_PluginCommand'][_0x1f88b5(0x29c)](this,_0xdda788);},Scene_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x31f)]=function(){const _0xb15107=_0x2fb0f3;return VisuMZ[_0xb15107(0x248)][_0xb15107(0x452)]['UI'][_0xb15107(0x64d)];},Scene_Base['prototype'][_0x2fb0f3(0x517)]=function(){const _0x3f9a20=_0x2fb0f3;return VisuMZ[_0x3f9a20(0x248)][_0x3f9a20(0x452)]['UI'][_0x3f9a20(0x36c)];},Scene_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x354)]=function(){const _0x5899d4=_0x2fb0f3;return VisuMZ[_0x5899d4(0x248)]['Settings']['UI']['BottomButtons'];},Scene_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x5cf)]=function(){const _0x554a68=_0x2fb0f3;return VisuMZ[_0x554a68(0x248)]['Settings']['UI'][_0x554a68(0x4ca)];},Scene_Base['prototype'][_0x2fb0f3(0x45a)]=function(){const _0x2f8e27=_0x2fb0f3;return VisuMZ[_0x2f8e27(0x248)][_0x2f8e27(0x452)]['UI']['CommandWidth'];},Scene_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x267)]=function(){const _0x58a647=_0x2fb0f3;return VisuMZ[_0x58a647(0x248)][_0x58a647(0x452)]['UI']['ButtonHeight'];},Scene_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x22f)]=function(){const _0x3d9404=_0x2fb0f3;return VisuMZ[_0x3d9404(0x248)]['Settings']['Window'][_0x3d9404(0x382)];},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x571)]=Scene_Base['prototype']['createWindowLayer'],Scene_Base['prototype'][_0x2fb0f3(0x3b3)]=function(){const _0x4322d6=_0x2fb0f3;VisuMZ[_0x4322d6(0x248)][_0x4322d6(0x571)][_0x4322d6(0x29c)](this),this[_0x4322d6(0x2d0)](),this[_0x4322d6(0x61b)]['x']=Math[_0x4322d6(0x132)](this['_windowLayer']['x']),this['_windowLayer']['y']=Math[_0x4322d6(0x132)](this[_0x4322d6(0x61b)]['y']);},Scene_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x2d0)]=function(){},Scene_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x1ca)]=function(){const _0xff4269=_0x2fb0f3;return TextManager['getInputMultiButtonStrings'](_0xff4269(0xc0),_0xff4269(0x63a));},Scene_Base[_0x2fb0f3(0x481)]['buttonAssistKey2']=function(){return TextManager['getInputButtonString']('tab');},Scene_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x44e)]=function(){const _0x5cdbfc=_0x2fb0f3;return TextManager['getInputButtonString'](_0x5cdbfc(0x460));},Scene_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x343)]=function(){return TextManager['getInputButtonString']('ok');},Scene_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x37b)]=function(){const _0x228a22=_0x2fb0f3;return TextManager[_0x228a22(0x5be)](_0x228a22(0xda));},Scene_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x36e)]=function(){const _0x56dec9=_0x2fb0f3;return this['_pageupButton']&&this[_0x56dec9(0x59c)][_0x56dec9(0x38f)]?TextManager[_0x56dec9(0x1c6)]:'';},Scene_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x116)]=function(){return'';},Scene_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x27f)]=function(){return'';},Scene_Base[_0x2fb0f3(0x481)]['buttonAssistText4']=function(){const _0x37475b=_0x2fb0f3;return TextManager[_0x37475b(0xa4)];},Scene_Base['prototype'][_0x2fb0f3(0x515)]=function(){const _0x3b4f79=_0x2fb0f3;return TextManager[_0x3b4f79(0x3ea)];},Scene_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x202)]=function(){return 0x0;},Scene_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x13c)]=function(){return 0x0;},Scene_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x25f)]=function(){return 0x0;},Scene_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x616)]=function(){return 0x0;},Scene_Base[_0x2fb0f3(0x481)]['buttonAssistOffset5']=function(){return 0x0;},VisuMZ[_0x2fb0f3(0x248)]['Scene_Boot_loadSystemImages']=Scene_Boot[_0x2fb0f3(0x481)][_0x2fb0f3(0x215)],Scene_Boot[_0x2fb0f3(0x481)][_0x2fb0f3(0x215)]=function(){const _0x2d3d1b=_0x2fb0f3;VisuMZ[_0x2d3d1b(0x248)]['Scene_Boot_loadSystemImages']['call'](this),this[_0x2d3d1b(0x422)]();},Scene_Boot[_0x2fb0f3(0x481)][_0x2fb0f3(0x422)]=function(){const _0x51a9be=_0x2fb0f3,_0x150a64=['animations',_0x51a9be(0x478),'battlebacks2',_0x51a9be(0x113),'enemies','faces',_0x51a9be(0x312),_0x51a9be(0x436),_0x51a9be(0x539),_0x51a9be(0x4ec),'system',_0x51a9be(0x5b1),_0x51a9be(0x534),_0x51a9be(0x5a9)];for(const _0x359f6b of _0x150a64){const _0x5427a3=VisuMZ[_0x51a9be(0x248)][_0x51a9be(0x452)][_0x51a9be(0x566)][_0x359f6b],_0x2a3746='img/%1/'[_0x51a9be(0x459)](_0x359f6b);for(const _0x5d91de of _0x5427a3){ImageManager['loadBitmap'](_0x2a3746,_0x5d91de);}}},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x5d7)]=Scene_Boot[_0x2fb0f3(0x481)][_0x2fb0f3(0xaf)],Scene_Boot[_0x2fb0f3(0x481)][_0x2fb0f3(0xaf)]=function(){const _0x34b0ce=_0x2fb0f3;Utils[_0x34b0ce(0x4b6)](_0x34b0ce(0xb2))&&VisuMZ['CoreEngine'][_0x34b0ce(0x452)][_0x34b0ce(0x20f)]['NewGameBoot']?this[_0x34b0ce(0x59d)]():VisuMZ[_0x34b0ce(0x248)][_0x34b0ce(0x5d7)][_0x34b0ce(0x29c)](this);},Scene_Boot[_0x2fb0f3(0x481)][_0x2fb0f3(0x59d)]=function(){const _0x4928ea=_0x2fb0f3;DataManager[_0x4928ea(0x17c)](),SceneManager['goto'](Scene_Map);},Scene_Boot[_0x2fb0f3(0x481)][_0x2fb0f3(0x5b9)]=function(){const _0xde38af=_0x2fb0f3,_0x37aff4=$dataSystem[_0xde38af(0x594)][_0xde38af(0x2b4)],_0x41014d=$dataSystem['advanced']['uiAreaHeight'],_0x11817a=VisuMZ['CoreEngine']['Settings']['UI'][_0xde38af(0x510)];Graphics[_0xde38af(0x5a3)]=_0x37aff4-_0x11817a*0x2,Graphics[_0xde38af(0x173)]=_0x41014d-_0x11817a*0x2,this[_0xde38af(0x2f8)]();},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x597)]=Scene_Boot['prototype'][_0x2fb0f3(0x166)],Scene_Boot[_0x2fb0f3(0x481)]['updateDocumentTitle']=function(){const _0x14a376=_0x2fb0f3;this[_0x14a376(0x203)]()?this[_0x14a376(0x469)]():VisuMZ[_0x14a376(0x248)][_0x14a376(0x597)][_0x14a376(0x29c)](this);},Scene_Boot[_0x2fb0f3(0x481)][_0x2fb0f3(0x203)]=function(){const _0x446556=_0x2fb0f3;if(Scene_Title[_0x446556(0x374)]==='')return![];if(Scene_Title['subtitle']===_0x446556(0x480))return![];if(Scene_Title[_0x446556(0x403)]==='')return![];if(Scene_Title[_0x446556(0x403)]===_0x446556(0x5d4))return![];return!![];},Scene_Boot['prototype'][_0x2fb0f3(0x469)]=function(){const _0xe6050b=_0x2fb0f3,_0x338344=$dataSystem[_0xe6050b(0x366)],_0x2368d3=Scene_Title[_0xe6050b(0x374)]||'',_0x451121=Scene_Title[_0xe6050b(0x403)]||'',_0x564914=VisuMZ[_0xe6050b(0x248)][_0xe6050b(0x452)][_0xe6050b(0x10a)][_0xe6050b(0x13b)][_0xe6050b(0x249)],_0x3092b6=_0x564914[_0xe6050b(0x459)](_0x338344,_0x2368d3,_0x451121);document['title']=_0x3092b6;},Scene_Boot[_0x2fb0f3(0x481)]['determineSideButtonLayoutValid']=function(){const _0x2f2e6c=_0x2fb0f3;if(VisuMZ['CoreEngine'][_0x2f2e6c(0x452)]['UI'][_0x2f2e6c(0x4bc)]){const _0x567247=Graphics['width']-Graphics['boxWidth']-VisuMZ[_0x2f2e6c(0x248)][_0x2f2e6c(0x452)]['UI'][_0x2f2e6c(0x510)]*0x2,_0x2188a0=Sprite_Button[_0x2f2e6c(0x481)][_0x2f2e6c(0x2f0)][_0x2f2e6c(0x29c)](this)*0x4;if(_0x567247>=_0x2188a0)SceneManager[_0x2f2e6c(0x3fd)](!![]);}},Scene_Title[_0x2fb0f3(0x374)]=VisuMZ['CoreEngine'][_0x2fb0f3(0x452)][_0x2fb0f3(0x10a)][_0x2fb0f3(0x13b)][_0x2fb0f3(0x480)],Scene_Title[_0x2fb0f3(0x403)]=VisuMZ['CoreEngine'][_0x2fb0f3(0x452)][_0x2fb0f3(0x10a)][_0x2fb0f3(0x13b)][_0x2fb0f3(0x494)],Scene_Title[_0x2fb0f3(0x599)]=VisuMZ['CoreEngine'][_0x2fb0f3(0x452)]['TitlePicButtons'],VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x3a6)]=Scene_Title[_0x2fb0f3(0x481)]['drawGameTitle'],Scene_Title[_0x2fb0f3(0x481)][_0x2fb0f3(0x45d)]=function(){const _0x53ec92=_0x2fb0f3;VisuMZ[_0x53ec92(0x248)][_0x53ec92(0x452)][_0x53ec92(0x10a)][_0x53ec92(0x13b)][_0x53ec92(0x45d)][_0x53ec92(0x29c)](this);if(Scene_Title['subtitle']!==''&&Scene_Title[_0x53ec92(0x374)]!=='Subtitle')this['drawGameSubtitle']();if(Scene_Title[_0x53ec92(0x403)]!==''&&Scene_Title['version']!=='0.00')this[_0x53ec92(0x266)]();},Scene_Title['prototype'][_0x2fb0f3(0x172)]=function(){const _0x7cbc73=_0x2fb0f3;VisuMZ[_0x7cbc73(0x248)]['Settings']['MenuLayout'][_0x7cbc73(0x13b)]['drawGameSubtitle'][_0x7cbc73(0x29c)](this);},Scene_Title[_0x2fb0f3(0x481)][_0x2fb0f3(0x266)]=function(){const _0x3fe4c2=_0x2fb0f3;VisuMZ[_0x3fe4c2(0x248)][_0x3fe4c2(0x452)][_0x3fe4c2(0x10a)][_0x3fe4c2(0x13b)][_0x3fe4c2(0x266)][_0x3fe4c2(0x29c)](this);},Scene_Title['prototype'][_0x2fb0f3(0x53f)]=function(){const _0x5255c2=_0x2fb0f3;this[_0x5255c2(0x4fa)]();const _0x22d8f7=$dataSystem[_0x5255c2(0x2c6)][_0x5255c2(0x497)],_0x110009=this['commandWindowRect']();this['_commandWindow']=new Window_TitleCommand(_0x110009),this['_commandWindow'][_0x5255c2(0x1e4)](_0x22d8f7);const _0x28ed95=this[_0x5255c2(0x31e)]();this[_0x5255c2(0x446)][_0x5255c2(0x4ff)](_0x28ed95['x'],_0x28ed95['y'],_0x28ed95[_0x5255c2(0x3fb)],_0x28ed95['height']),this[_0x5255c2(0x273)](this['_commandWindow']);},Scene_Title[_0x2fb0f3(0x481)][_0x2fb0f3(0x5bb)]=function(){const _0x4c435f=_0x2fb0f3;return this[_0x4c435f(0x446)]?this['_commandWindow'][_0x4c435f(0x2a1)]():VisuMZ[_0x4c435f(0x248)]['Settings']['TitleCommandList']['length'];},Scene_Title[_0x2fb0f3(0x481)][_0x2fb0f3(0x31e)]=function(){const _0x302bac=_0x2fb0f3;return VisuMZ[_0x302bac(0x248)]['Settings'][_0x302bac(0x10a)]['Title']['CommandRect'][_0x302bac(0x29c)](this);},Scene_Title[_0x2fb0f3(0x481)]['createTitleButtons']=function(){const _0x35cb64=_0x2fb0f3;for(const _0x55383d of Scene_Title[_0x35cb64(0x599)]){const _0x2681b3=new Sprite_TitlePictureButton(_0x55383d);this[_0x35cb64(0x4e0)](_0x2681b3);}},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x322)]=Scene_Map[_0x2fb0f3(0x481)][_0x2fb0f3(0x15c)],Scene_Map['prototype'][_0x2fb0f3(0x15c)]=function(){const _0x5430b8=_0x2fb0f3;VisuMZ[_0x5430b8(0x248)]['Scene_Map_initialize'][_0x5430b8(0x29c)](this),$gameTemp[_0x5430b8(0x283)]();},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x2df)]=Scene_Map[_0x2fb0f3(0x481)][_0x2fb0f3(0x500)],Scene_Map['prototype'][_0x2fb0f3(0x500)]=function(){const _0x231e6c=_0x2fb0f3;VisuMZ[_0x231e6c(0x248)][_0x231e6c(0x2df)][_0x231e6c(0x29c)](this),$gameTemp[_0x231e6c(0x559)]&&!$gameMessage[_0x231e6c(0x467)]()&&(this[_0x231e6c(0x1c4)](),SceneManager[_0x231e6c(0x50f)]());},Scene_Map[_0x2fb0f3(0x481)][_0x2fb0f3(0xf4)]=function(){const _0x3ba71e=_0x2fb0f3;Scene_Message['prototype']['terminate'][_0x3ba71e(0x29c)](this),!SceneManager[_0x3ba71e(0x5b7)](Scene_Battle)&&(this[_0x3ba71e(0x286)][_0x3ba71e(0x231)](),this['_mapNameWindow'][_0x3ba71e(0x15a)](),this[_0x3ba71e(0x61b)][_0x3ba71e(0x38f)]=![],SceneManager[_0x3ba71e(0x53d)]()),$gameScreen['clearZoom']();},VisuMZ[_0x2fb0f3(0x248)]['Scene_Map_createMenuButton']=Scene_Map[_0x2fb0f3(0x481)][_0x2fb0f3(0x293)],Scene_Map[_0x2fb0f3(0x481)][_0x2fb0f3(0x293)]=function(){const _0x101bb6=_0x2fb0f3;VisuMZ['CoreEngine'][_0x101bb6(0x39a)]['call'](this),SceneManager[_0x101bb6(0x20e)]()&&this['moveMenuButtonSideButtonLayout']();},Scene_Map[_0x2fb0f3(0x481)][_0x2fb0f3(0x62d)]=function(){const _0x1de34b=_0x2fb0f3;this['_menuButton']['x']=Graphics[_0x1de34b(0x5a3)]+0x4;},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x5d2)]=Scene_Map[_0x2fb0f3(0x481)][_0x2fb0f3(0x4bd)],Scene_Map['prototype']['updateScene']=function(){const _0x33322e=_0x2fb0f3;VisuMZ[_0x33322e(0x248)][_0x33322e(0x5d2)][_0x33322e(0x29c)](this),this['updateDashToggle']();},Scene_Map[_0x2fb0f3(0x481)][_0x2fb0f3(0x511)]=function(){const _0x2949f1=_0x2fb0f3;Input['isTriggered'](_0x2949f1(0x5d9))&&(ConfigManager[_0x2949f1(0x26a)]=!ConfigManager[_0x2949f1(0x26a)],ConfigManager[_0x2949f1(0x187)]());},VisuMZ['CoreEngine'][_0x2fb0f3(0x42e)]=Scene_MenuBase[_0x2fb0f3(0x481)][_0x2fb0f3(0x211)],Scene_MenuBase['prototype'][_0x2fb0f3(0x211)]=function(){const _0x1b7c15=_0x2fb0f3;let _0x17b59d=0x0;return SceneManager[_0x1b7c15(0x50d)]()?_0x17b59d=this[_0x1b7c15(0x3c3)]():_0x17b59d=VisuMZ[_0x1b7c15(0x248)][_0x1b7c15(0x42e)]['call'](this),this[_0x1b7c15(0x4fe)]()&&this['getButtonAssistLocation']()===_0x1b7c15(0x645)&&(_0x17b59d+=Window_ButtonAssist[_0x1b7c15(0x481)][_0x1b7c15(0x199)]()),_0x17b59d;},Scene_MenuBase['prototype'][_0x2fb0f3(0x3c3)]=function(){const _0x518190=_0x2fb0f3;return this[_0x518190(0x517)]()?this[_0x518190(0x414)]():0x0;},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x25a)]=Scene_MenuBase[_0x2fb0f3(0x481)]['mainAreaTop'],Scene_MenuBase[_0x2fb0f3(0x481)][_0x2fb0f3(0x1eb)]=function(){const _0x18fa7e=_0x2fb0f3;return SceneManager[_0x18fa7e(0x50d)]()?this[_0x18fa7e(0x148)]():VisuMZ[_0x18fa7e(0x248)][_0x18fa7e(0x25a)][_0x18fa7e(0x29c)](this);},Scene_MenuBase[_0x2fb0f3(0x481)][_0x2fb0f3(0x148)]=function(){const _0x5121a5=_0x2fb0f3;return!this[_0x5121a5(0x517)]()?this['helpAreaBottom']():0x0;},VisuMZ['CoreEngine']['Scene_MenuBase_mainAreaHeight']=Scene_MenuBase['prototype'][_0x2fb0f3(0x290)],Scene_MenuBase[_0x2fb0f3(0x481)]['mainAreaHeight']=function(){const _0x473efa=_0x2fb0f3;let _0x124b92=0x0;return SceneManager[_0x473efa(0x50d)]()?_0x124b92=this['mainAreaHeightSideButtonLayout']():_0x124b92=VisuMZ['CoreEngine'][_0x473efa(0x16e)][_0x473efa(0x29c)](this),this[_0x473efa(0x4fe)]()&&this[_0x473efa(0xfd)]()!==_0x473efa(0x65a)&&(_0x124b92-=Window_ButtonAssist[_0x473efa(0x481)][_0x473efa(0x199)]()),_0x124b92;},Scene_MenuBase['prototype'][_0x2fb0f3(0x5c7)]=function(){const _0xca2ce3=_0x2fb0f3;return Graphics[_0xca2ce3(0x173)]-this[_0xca2ce3(0x5f3)]();},VisuMZ[_0x2fb0f3(0x248)]['Scene_MenuBase_createBackground']=Scene_MenuBase[_0x2fb0f3(0x481)][_0x2fb0f3(0x60a)],Scene_MenuBase[_0x2fb0f3(0x481)][_0x2fb0f3(0x60a)]=function(){const _0x58e1e0=_0x2fb0f3;this['_backgroundFilter']=new PIXI[(_0x58e1e0(0xcb))][(_0x58e1e0(0x134))](clamp=!![]),this['_backgroundSprite']=new Sprite(),this[_0x58e1e0(0x3f9)][_0x58e1e0(0x4f7)]=SceneManager[_0x58e1e0(0x255)](),this[_0x58e1e0(0x3f9)][_0x58e1e0(0xcb)]=[this[_0x58e1e0(0x427)]],this['addChild'](this[_0x58e1e0(0x3f9)]),this[_0x58e1e0(0x462)](0xc0),this['setBackgroundOpacity'](this['getBackgroundOpacity']()),this['createCustomBackgroundImages']();},Scene_MenuBase['prototype'][_0x2fb0f3(0x593)]=function(){const _0x4270af=_0x2fb0f3,_0x2b287c=String(this[_0x4270af(0x52a)]['name']),_0x1b4f11=this['getCustomBackgroundSettings'](_0x2b287c);return _0x1b4f11?_0x1b4f11[_0x4270af(0x1fb)]:0xc0;},Scene_MenuBase[_0x2fb0f3(0x481)][_0x2fb0f3(0x587)]=function(){const _0x3f96b2=_0x2fb0f3,_0x4f8940=String(this[_0x3f96b2(0x52a)][_0x3f96b2(0x12d)]),_0x350118=this[_0x3f96b2(0xd8)](_0x4f8940);_0x350118&&(_0x350118['BgFilename1']!==''||_0x350118[_0x3f96b2(0x47a)]!=='')&&(this[_0x3f96b2(0x368)]=new Sprite(ImageManager[_0x3f96b2(0x234)](_0x350118[_0x3f96b2(0xb8)])),this['_backSprite2']=new Sprite(ImageManager['loadTitle2'](_0x350118[_0x3f96b2(0x47a)])),this[_0x3f96b2(0x4e0)](this[_0x3f96b2(0x368)]),this[_0x3f96b2(0x4e0)](this['_backSprite2']),this['_backSprite1'][_0x3f96b2(0x4f7)]['addLoadListener'](this[_0x3f96b2(0x32e)]['bind'](this,this[_0x3f96b2(0x368)])),this[_0x3f96b2(0x35f)]['bitmap'][_0x3f96b2(0x58e)](this['adjustSprite'][_0x3f96b2(0x3ef)](this,this[_0x3f96b2(0x35f)])));},Scene_MenuBase[_0x2fb0f3(0x481)]['getCustomBackgroundSettings']=function(_0x3179ff){const _0x71b99b=_0x2fb0f3;return VisuMZ[_0x71b99b(0x248)]['Settings'][_0x71b99b(0x1cf)][_0x3179ff]||VisuMZ['CoreEngine']['Settings']['MenuBg'][_0x71b99b(0x3ab)];},Scene_MenuBase['prototype'][_0x2fb0f3(0x32e)]=function(_0x257e1b){this['scaleSprite'](_0x257e1b),this['centerSprite'](_0x257e1b);},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x1ba)]=Scene_MenuBase[_0x2fb0f3(0x481)]['createCancelButton'],Scene_MenuBase[_0x2fb0f3(0x481)][_0x2fb0f3(0x508)]=function(){const _0x1bf43c=_0x2fb0f3;VisuMZ[_0x1bf43c(0x248)][_0x1bf43c(0x1ba)][_0x1bf43c(0x29c)](this),SceneManager[_0x1bf43c(0x20e)]()&&this['moveCancelButtonSideButtonLayout']();},Scene_MenuBase[_0x2fb0f3(0x481)][_0x2fb0f3(0xe6)]=function(){const _0x531ebc=_0x2fb0f3;this[_0x531ebc(0x110)]['x']=Graphics['boxWidth']+0x4;},VisuMZ['CoreEngine'][_0x2fb0f3(0x4aa)]=Scene_MenuBase[_0x2fb0f3(0x481)]['createPageButtons'],Scene_MenuBase[_0x2fb0f3(0x481)][_0x2fb0f3(0x1b8)]=function(){const _0x264a71=_0x2fb0f3;VisuMZ[_0x264a71(0x248)][_0x264a71(0x4aa)][_0x264a71(0x29c)](this),SceneManager[_0x264a71(0x20e)]()&&this[_0x264a71(0x3ae)]();},Scene_MenuBase[_0x2fb0f3(0x481)][_0x2fb0f3(0x3ae)]=function(){const _0xdf7b76=_0x2fb0f3;this[_0xdf7b76(0x59c)]['x']=-0x1*(this[_0xdf7b76(0x59c)][_0xdf7b76(0x3fb)]+this[_0xdf7b76(0x45c)]['width']+0x8),this[_0xdf7b76(0x45c)]['x']=-0x1*(this[_0xdf7b76(0x45c)]['width']+0x4);},Scene_MenuBase[_0x2fb0f3(0x481)][_0x2fb0f3(0x4fe)]=function(){const _0x1c9a96=_0x2fb0f3;return VisuMZ[_0x1c9a96(0x248)]['Settings'][_0x1c9a96(0x318)]['Enable'];},Scene_MenuBase[_0x2fb0f3(0x481)]['getButtonAssistLocation']=function(){const _0x21c2cf=_0x2fb0f3;return SceneManager[_0x21c2cf(0x20e)]()||SceneManager[_0x21c2cf(0x3ee)]()?VisuMZ[_0x21c2cf(0x248)]['Settings'][_0x21c2cf(0x318)]['Location']:_0x21c2cf(0x65a);},Scene_MenuBase[_0x2fb0f3(0x481)]['createButtonAssistWindow']=function(){const _0x3a8b9a=_0x2fb0f3;if(!this[_0x3a8b9a(0x4fe)]())return;const _0x3accb6=this[_0x3a8b9a(0x2fc)]();this[_0x3a8b9a(0x45b)]=new Window_ButtonAssist(_0x3accb6),this['addWindow'](this[_0x3a8b9a(0x45b)]);},Scene_MenuBase[_0x2fb0f3(0x481)][_0x2fb0f3(0x2fc)]=function(){const _0x3bd80e=_0x2fb0f3;return this[_0x3bd80e(0xfd)]()==='button'?this['buttonAssistWindowButtonRect']():this[_0x3bd80e(0x57d)]();},Scene_MenuBase[_0x2fb0f3(0x481)][_0x2fb0f3(0x5fc)]=function(){const _0xf33ba9=_0x2fb0f3,_0x55c61b=ConfigManager[_0xf33ba9(0x412)]?(Sprite_Button[_0xf33ba9(0x481)][_0xf33ba9(0x2f0)]()+0x6)*0x2:0x0,_0xd94d9f=this[_0xf33ba9(0x135)](),_0x122974=Graphics[_0xf33ba9(0x5a3)]-_0x55c61b*0x2,_0x1ad9f6=this[_0xf33ba9(0x267)]();return new Rectangle(_0x55c61b,_0xd94d9f,_0x122974,_0x1ad9f6);},Scene_MenuBase[_0x2fb0f3(0x481)][_0x2fb0f3(0x57d)]=function(){const _0xb58909=_0x2fb0f3,_0x5c022a=Graphics[_0xb58909(0x5a3)],_0x519566=Window_ButtonAssist[_0xb58909(0x481)]['lineHeight'](),_0x24370=0x0;let _0x16febb=0x0;return this[_0xb58909(0xfd)]()===_0xb58909(0x645)?_0x16febb=0x0:_0x16febb=Graphics[_0xb58909(0x173)]-_0x519566,new Rectangle(_0x24370,_0x16febb,_0x5c022a,_0x519566);},Scene_Menu[_0x2fb0f3(0x349)]=VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x452)][_0x2fb0f3(0x10a)][_0x2fb0f3(0x3ed)],VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x1e3)]=Scene_Menu[_0x2fb0f3(0x481)][_0x2fb0f3(0xa6)],Scene_Menu[_0x2fb0f3(0x481)][_0x2fb0f3(0xa6)]=function(){const _0x6c0997=_0x2fb0f3;VisuMZ[_0x6c0997(0x248)][_0x6c0997(0x1e3)][_0x6c0997(0x29c)](this),this[_0x6c0997(0x2a5)]();},Scene_Menu[_0x2fb0f3(0x481)]['setCoreEngineUpdateWindowBg']=function(){const _0xfd76d9=_0x2fb0f3;this[_0xfd76d9(0x446)]&&this['_commandWindow'][_0xfd76d9(0x1e4)](Scene_Menu[_0xfd76d9(0x349)]['CommandBgType']),this['_goldWindow']&&this[_0xfd76d9(0x5a8)][_0xfd76d9(0x1e4)](Scene_Menu[_0xfd76d9(0x349)][_0xfd76d9(0x417)]),this['_statusWindow']&&this[_0xfd76d9(0x2fd)][_0xfd76d9(0x1e4)](Scene_Menu[_0xfd76d9(0x349)][_0xfd76d9(0x15b)]);},Scene_Menu['prototype'][_0x2fb0f3(0x31e)]=function(){const _0x514298=_0x2fb0f3;return Scene_Menu[_0x514298(0x349)]['CommandRect'][_0x514298(0x29c)](this);},Scene_Menu['prototype']['goldWindowRect']=function(){return Scene_Menu['layoutSettings']['GoldRect']['call'](this);},Scene_Menu[_0x2fb0f3(0x481)][_0x2fb0f3(0x453)]=function(){const _0x29921f=_0x2fb0f3;return Scene_Menu['layoutSettings'][_0x29921f(0x521)][_0x29921f(0x29c)](this);},Scene_Item[_0x2fb0f3(0x349)]=VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x452)][_0x2fb0f3(0x10a)][_0x2fb0f3(0x274)],VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x206)]=Scene_Item[_0x2fb0f3(0x481)][_0x2fb0f3(0xa6)],Scene_Item[_0x2fb0f3(0x481)]['create']=function(){const _0x533425=_0x2fb0f3;VisuMZ[_0x533425(0x248)][_0x533425(0x206)][_0x533425(0x29c)](this),this[_0x533425(0x2a5)]();},Scene_Item['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x2c27df=_0x2fb0f3;this[_0x2c27df(0x4d6)]&&this[_0x2c27df(0x4d6)][_0x2c27df(0x1e4)](Scene_Item[_0x2c27df(0x349)][_0x2c27df(0x514)]),this[_0x2c27df(0x270)]&&this['_categoryWindow']['setBackgroundType'](Scene_Item['layoutSettings'][_0x2c27df(0x225)]),this['_itemWindow']&&this[_0x2c27df(0x24b)][_0x2c27df(0x1e4)](Scene_Item[_0x2c27df(0x349)][_0x2c27df(0x482)]),this['_actorWindow']&&this[_0x2c27df(0x21a)][_0x2c27df(0x1e4)](Scene_Item[_0x2c27df(0x349)][_0x2c27df(0x3b9)]);},Scene_Item[_0x2fb0f3(0x481)][_0x2fb0f3(0x92)]=function(){const _0x114b46=_0x2fb0f3;return Scene_Item['layoutSettings'][_0x114b46(0x5e1)][_0x114b46(0x29c)](this);},Scene_Item[_0x2fb0f3(0x481)][_0x2fb0f3(0x37e)]=function(){const _0x4fbb4f=_0x2fb0f3;return Scene_Item['layoutSettings'][_0x4fbb4f(0x435)][_0x4fbb4f(0x29c)](this);},Scene_Item[_0x2fb0f3(0x481)][_0x2fb0f3(0x5eb)]=function(){const _0x41b189=_0x2fb0f3;return Scene_Item[_0x41b189(0x349)][_0x41b189(0x209)][_0x41b189(0x29c)](this);},Scene_Item[_0x2fb0f3(0x481)]['actorWindowRect']=function(){const _0x31e652=_0x2fb0f3;return Scene_Item[_0x31e652(0x349)][_0x31e652(0x43d)][_0x31e652(0x29c)](this);},Scene_Skill[_0x2fb0f3(0x349)]=VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x452)]['MenuLayout'][_0x2fb0f3(0x309)],VisuMZ['CoreEngine'][_0x2fb0f3(0x5f0)]=Scene_Skill['prototype']['create'],Scene_Skill[_0x2fb0f3(0x481)][_0x2fb0f3(0xa6)]=function(){const _0x2f5655=_0x2fb0f3;VisuMZ['CoreEngine'][_0x2f5655(0x5f0)][_0x2f5655(0x29c)](this),this[_0x2f5655(0x2a5)]();},Scene_Skill[_0x2fb0f3(0x481)][_0x2fb0f3(0x2a5)]=function(){const _0x2bd9a0=_0x2fb0f3;this[_0x2bd9a0(0x4d6)]&&this[_0x2bd9a0(0x4d6)][_0x2bd9a0(0x1e4)](Scene_Skill['layoutSettings']['HelpBgType']),this[_0x2bd9a0(0x5c6)]&&this[_0x2bd9a0(0x5c6)][_0x2bd9a0(0x1e4)](Scene_Skill['layoutSettings'][_0x2bd9a0(0x4ac)]),this[_0x2bd9a0(0x2fd)]&&this['_statusWindow']['setBackgroundType'](Scene_Skill[_0x2bd9a0(0x349)]['StatusBgType']),this[_0x2bd9a0(0x24b)]&&this[_0x2bd9a0(0x24b)][_0x2bd9a0(0x1e4)](Scene_Skill['layoutSettings'][_0x2bd9a0(0x482)]),this[_0x2bd9a0(0x21a)]&&this[_0x2bd9a0(0x21a)]['setBackgroundType'](Scene_Skill[_0x2bd9a0(0x349)][_0x2bd9a0(0x3b9)]);},Scene_Skill[_0x2fb0f3(0x481)][_0x2fb0f3(0x92)]=function(){const _0x5159f5=_0x2fb0f3;return Scene_Skill[_0x5159f5(0x349)][_0x5159f5(0x5e1)][_0x5159f5(0x29c)](this);},Scene_Skill[_0x2fb0f3(0x481)][_0x2fb0f3(0x60b)]=function(){const _0x96538e=_0x2fb0f3;return Scene_Skill['layoutSettings'][_0x96538e(0x3c7)][_0x96538e(0x29c)](this);},Scene_Skill[_0x2fb0f3(0x481)]['statusWindowRect']=function(){const _0x2ae6f5=_0x2fb0f3;return Scene_Skill[_0x2ae6f5(0x349)]['StatusRect'][_0x2ae6f5(0x29c)](this);},Scene_Skill[_0x2fb0f3(0x481)][_0x2fb0f3(0x5eb)]=function(){const _0x498106=_0x2fb0f3;return Scene_Skill['layoutSettings'][_0x498106(0x209)][_0x498106(0x29c)](this);},Scene_Skill[_0x2fb0f3(0x481)]['actorWindowRect']=function(){const _0x40b82a=_0x2fb0f3;return Scene_Skill['layoutSettings'][_0x40b82a(0x43d)][_0x40b82a(0x29c)](this);},Scene_Equip[_0x2fb0f3(0x349)]=VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x452)][_0x2fb0f3(0x10a)]['EquipMenu'],VisuMZ[_0x2fb0f3(0x248)]['Scene_Equip_create']=Scene_Equip[_0x2fb0f3(0x481)]['create'],Scene_Equip[_0x2fb0f3(0x481)][_0x2fb0f3(0xa6)]=function(){const _0x4465c9=_0x2fb0f3;VisuMZ[_0x4465c9(0x248)][_0x4465c9(0x386)][_0x4465c9(0x29c)](this),this[_0x4465c9(0x2a5)]();},Scene_Equip[_0x2fb0f3(0x481)][_0x2fb0f3(0x2a5)]=function(){const _0x55d511=_0x2fb0f3;this[_0x55d511(0x4d6)]&&this[_0x55d511(0x4d6)][_0x55d511(0x1e4)](Scene_Equip[_0x55d511(0x349)][_0x55d511(0x514)]),this[_0x55d511(0x2fd)]&&this[_0x55d511(0x2fd)][_0x55d511(0x1e4)](Scene_Equip['layoutSettings']['StatusBgType']),this[_0x55d511(0x446)]&&this[_0x55d511(0x446)][_0x55d511(0x1e4)](Scene_Equip[_0x55d511(0x349)]['CommandBgType']),this[_0x55d511(0x14c)]&&this[_0x55d511(0x14c)][_0x55d511(0x1e4)](Scene_Equip[_0x55d511(0x349)][_0x55d511(0x3e1)]),this[_0x55d511(0x24b)]&&this[_0x55d511(0x24b)][_0x55d511(0x1e4)](Scene_Equip['layoutSettings'][_0x55d511(0x482)]);},Scene_Equip[_0x2fb0f3(0x481)][_0x2fb0f3(0x92)]=function(){const _0x12db13=_0x2fb0f3;return Scene_Equip[_0x12db13(0x349)][_0x12db13(0x5e1)]['call'](this);},Scene_Equip[_0x2fb0f3(0x481)][_0x2fb0f3(0x453)]=function(){const _0x1f03c=_0x2fb0f3;return Scene_Equip[_0x1f03c(0x349)][_0x1f03c(0x521)]['call'](this);},Scene_Equip['prototype'][_0x2fb0f3(0x31e)]=function(){const _0x50436b=_0x2fb0f3;return Scene_Equip[_0x50436b(0x349)][_0x50436b(0x179)][_0x50436b(0x29c)](this);},Scene_Equip[_0x2fb0f3(0x481)][_0x2fb0f3(0x3b7)]=function(){const _0x247192=_0x2fb0f3;return Scene_Equip[_0x247192(0x349)]['SlotRect'][_0x247192(0x29c)](this);},Scene_Equip[_0x2fb0f3(0x481)][_0x2fb0f3(0x5eb)]=function(){const _0x11134e=_0x2fb0f3;return Scene_Equip['layoutSettings'][_0x11134e(0x209)][_0x11134e(0x29c)](this);},Scene_Status['layoutSettings']=VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x452)][_0x2fb0f3(0x10a)][_0x2fb0f3(0x400)],VisuMZ[_0x2fb0f3(0x248)]['Scene_Status_create']=Scene_Status[_0x2fb0f3(0x481)][_0x2fb0f3(0xa6)],Scene_Status[_0x2fb0f3(0x481)][_0x2fb0f3(0xa6)]=function(){const _0x1ddb7d=_0x2fb0f3;VisuMZ['CoreEngine'][_0x1ddb7d(0x1fa)][_0x1ddb7d(0x29c)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Status[_0x2fb0f3(0x481)]['setCoreEngineUpdateWindowBg']=function(){const _0x39c4fe=_0x2fb0f3;this[_0x39c4fe(0x3aa)]&&this[_0x39c4fe(0x3aa)][_0x39c4fe(0x1e4)](Scene_Status[_0x39c4fe(0x349)][_0x39c4fe(0x97)]),this[_0x39c4fe(0x2fd)]&&this['_statusWindow'][_0x39c4fe(0x1e4)](Scene_Status[_0x39c4fe(0x349)][_0x39c4fe(0x15b)]),this['_statusParamsWindow']&&this['_statusParamsWindow'][_0x39c4fe(0x1e4)](Scene_Status['layoutSettings']['StatusParamsBgType']),this[_0x39c4fe(0x348)]&&this[_0x39c4fe(0x348)][_0x39c4fe(0x1e4)](Scene_Status[_0x39c4fe(0x349)][_0x39c4fe(0x3a8)]);},Scene_Status['prototype'][_0x2fb0f3(0x1b3)]=function(){const _0x4896f7=_0x2fb0f3;return Scene_Status['layoutSettings'][_0x4896f7(0x3e5)]['call'](this);},Scene_Status[_0x2fb0f3(0x481)][_0x2fb0f3(0x453)]=function(){const _0x8be775=_0x2fb0f3;return Scene_Status['layoutSettings']['StatusRect'][_0x8be775(0x29c)](this);},Scene_Status[_0x2fb0f3(0x481)][_0x2fb0f3(0x3d5)]=function(){const _0x28c7d2=_0x2fb0f3;return Scene_Status['layoutSettings']['StatusParamsRect'][_0x28c7d2(0x29c)](this);},Scene_Status[_0x2fb0f3(0x481)][_0x2fb0f3(0x320)]=function(){const _0x41ba9d=_0x2fb0f3;return Scene_Status[_0x41ba9d(0x349)][_0x41ba9d(0x1b1)][_0x41ba9d(0x29c)](this);},Scene_Options[_0x2fb0f3(0x349)]=VisuMZ[_0x2fb0f3(0x248)]['Settings'][_0x2fb0f3(0x10a)][_0x2fb0f3(0x569)],VisuMZ[_0x2fb0f3(0x248)]['Scene_Options_create']=Scene_Options[_0x2fb0f3(0x481)][_0x2fb0f3(0xa6)],Scene_Options['prototype'][_0x2fb0f3(0xa6)]=function(){const _0x569948=_0x2fb0f3;VisuMZ[_0x569948(0x248)][_0x569948(0x647)][_0x569948(0x29c)](this),this[_0x569948(0x2a5)]();},Scene_Options[_0x2fb0f3(0x481)][_0x2fb0f3(0x2a5)]=function(){const _0x46affe=_0x2fb0f3;this['_optionsWindow']&&this['_optionsWindow']['setBackgroundType'](Scene_Options[_0x46affe(0x349)][_0x46affe(0x241)]);},Scene_Options[_0x2fb0f3(0x481)][_0x2fb0f3(0x328)]=function(){const _0x1fa42e=_0x2fb0f3;return Scene_Options[_0x1fa42e(0x349)][_0x1fa42e(0x176)][_0x1fa42e(0x29c)](this);},Scene_Save['layoutSettings']=VisuMZ[_0x2fb0f3(0x248)]['Settings']['MenuLayout'][_0x2fb0f3(0x24f)],Scene_Save[_0x2fb0f3(0x481)]['create']=function(){const _0x407a1a=_0x2fb0f3;Scene_File[_0x407a1a(0x481)][_0x407a1a(0xa6)][_0x407a1a(0x29c)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Save[_0x2fb0f3(0x481)]['setCoreEngineUpdateWindowBg']=function(){const _0x16ac9b=_0x2fb0f3;this['_helpWindow']&&this[_0x16ac9b(0x4d6)][_0x16ac9b(0x1e4)](Scene_Save[_0x16ac9b(0x349)][_0x16ac9b(0x514)]),this['_listWindow']&&this['_listWindow'][_0x16ac9b(0x1e4)](Scene_Save[_0x16ac9b(0x349)][_0x16ac9b(0x237)]);},Scene_Save[_0x2fb0f3(0x481)][_0x2fb0f3(0x92)]=function(){const _0x5c3db5=_0x2fb0f3;return Scene_Save['layoutSettings'][_0x5c3db5(0x5e1)][_0x5c3db5(0x29c)](this);},Scene_Save[_0x2fb0f3(0x481)][_0x2fb0f3(0x28f)]=function(){const _0x5a966b=_0x2fb0f3;return Scene_Save[_0x5a966b(0x349)][_0x5a966b(0x159)][_0x5a966b(0x29c)](this);},Scene_Load[_0x2fb0f3(0x349)]=VisuMZ[_0x2fb0f3(0x248)]['Settings'][_0x2fb0f3(0x10a)][_0x2fb0f3(0x537)],Scene_Load[_0x2fb0f3(0x481)][_0x2fb0f3(0xa6)]=function(){const _0x46a1c0=_0x2fb0f3;Scene_File['prototype'][_0x46a1c0(0xa6)][_0x46a1c0(0x29c)](this),this[_0x46a1c0(0x2a5)]();},Scene_Load[_0x2fb0f3(0x481)]['setCoreEngineUpdateWindowBg']=function(){const _0x2fa7a7=_0x2fb0f3;this[_0x2fa7a7(0x4d6)]&&this[_0x2fa7a7(0x4d6)][_0x2fa7a7(0x1e4)](Scene_Load[_0x2fa7a7(0x349)]['HelpBgType']),this['_listWindow']&&this[_0x2fa7a7(0x210)][_0x2fa7a7(0x1e4)](Scene_Load[_0x2fa7a7(0x349)]['ListBgType']);},Scene_Load[_0x2fb0f3(0x481)][_0x2fb0f3(0x92)]=function(){const _0x32593b=_0x2fb0f3;return Scene_Load[_0x32593b(0x349)][_0x32593b(0x5e1)][_0x32593b(0x29c)](this);},Scene_Load[_0x2fb0f3(0x481)][_0x2fb0f3(0x28f)]=function(){const _0x4c3926=_0x2fb0f3;return Scene_Load[_0x4c3926(0x349)][_0x4c3926(0x159)][_0x4c3926(0x29c)](this);},Scene_GameEnd[_0x2fb0f3(0x349)]=VisuMZ['CoreEngine'][_0x2fb0f3(0x452)][_0x2fb0f3(0x10a)][_0x2fb0f3(0x50e)],VisuMZ[_0x2fb0f3(0x248)]['Scene_GameEnd_createBackground']=Scene_GameEnd[_0x2fb0f3(0x481)][_0x2fb0f3(0x60a)],Scene_GameEnd[_0x2fb0f3(0x481)][_0x2fb0f3(0x60a)]=function(){const _0x161ab0=_0x2fb0f3;Scene_MenuBase[_0x161ab0(0x481)]['createBackground'][_0x161ab0(0x29c)](this);},Scene_GameEnd[_0x2fb0f3(0x481)]['createCommandWindow']=function(){const _0x478d58=_0x2fb0f3,_0x568ee6=this['commandWindowRect']();this['_commandWindow']=new Window_GameEnd(_0x568ee6),this['_commandWindow'][_0x478d58(0x150)](_0x478d58(0xda),this[_0x478d58(0x100)][_0x478d58(0x3ef)](this)),this[_0x478d58(0x273)](this[_0x478d58(0x446)]),this[_0x478d58(0x446)][_0x478d58(0x1e4)](Scene_GameEnd['layoutSettings'][_0x478d58(0x1e7)]);},Scene_GameEnd[_0x2fb0f3(0x481)][_0x2fb0f3(0x31e)]=function(){const _0x1c876a=_0x2fb0f3;return Scene_GameEnd[_0x1c876a(0x349)][_0x1c876a(0x179)]['call'](this);},Scene_Shop['layoutSettings']=VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x452)]['MenuLayout'][_0x2fb0f3(0x40f)],VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x13a)]=Scene_Shop[_0x2fb0f3(0x481)][_0x2fb0f3(0xa6)],Scene_Shop[_0x2fb0f3(0x481)][_0x2fb0f3(0xa6)]=function(){const _0x4fe145=_0x2fb0f3;VisuMZ[_0x4fe145(0x248)][_0x4fe145(0x13a)][_0x4fe145(0x29c)](this),this[_0x4fe145(0x2a5)]();},Scene_Shop['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x3b04cd=_0x2fb0f3;this[_0x3b04cd(0x4d6)]&&this[_0x3b04cd(0x4d6)][_0x3b04cd(0x1e4)](Scene_Shop[_0x3b04cd(0x349)]['HelpBgType']),this[_0x3b04cd(0x5a8)]&&this['_goldWindow'][_0x3b04cd(0x1e4)](Scene_Shop[_0x3b04cd(0x349)]['GoldBgType']),this['_commandWindow']&&this[_0x3b04cd(0x446)][_0x3b04cd(0x1e4)](Scene_Shop[_0x3b04cd(0x349)]['CommandBgType']),this[_0x3b04cd(0x2f7)]&&this['_dummyWindow'][_0x3b04cd(0x1e4)](Scene_Shop[_0x3b04cd(0x349)]['DummyBgType']),this[_0x3b04cd(0x4eb)]&&this[_0x3b04cd(0x4eb)][_0x3b04cd(0x1e4)](Scene_Shop[_0x3b04cd(0x349)][_0x3b04cd(0x610)]),this[_0x3b04cd(0x2fd)]&&this[_0x3b04cd(0x2fd)][_0x3b04cd(0x1e4)](Scene_Shop[_0x3b04cd(0x349)][_0x3b04cd(0x15b)]),this['_buyWindow']&&this['_buyWindow']['setBackgroundType'](Scene_Shop[_0x3b04cd(0x349)][_0x3b04cd(0x3c4)]),this[_0x3b04cd(0x270)]&&this[_0x3b04cd(0x270)][_0x3b04cd(0x1e4)](Scene_Shop[_0x3b04cd(0x349)]['CategoryBgType']),this[_0x3b04cd(0x196)]&&this['_sellWindow'][_0x3b04cd(0x1e4)](Scene_Shop['layoutSettings'][_0x3b04cd(0x226)]);},Scene_Shop[_0x2fb0f3(0x481)][_0x2fb0f3(0x92)]=function(){const _0x5b0b1e=_0x2fb0f3;return Scene_Shop['layoutSettings']['HelpRect'][_0x5b0b1e(0x29c)](this);},Scene_Shop[_0x2fb0f3(0x481)][_0x2fb0f3(0x419)]=function(){const _0x184bfa=_0x2fb0f3;return Scene_Shop[_0x184bfa(0x349)][_0x184bfa(0x64b)]['call'](this);},Scene_Shop[_0x2fb0f3(0x481)]['commandWindowRect']=function(){const _0x195f03=_0x2fb0f3;return Scene_Shop[_0x195f03(0x349)][_0x195f03(0x179)][_0x195f03(0x29c)](this);},Scene_Shop[_0x2fb0f3(0x481)]['dummyWindowRect']=function(){const _0x11b695=_0x2fb0f3;return Scene_Shop[_0x11b695(0x349)][_0x11b695(0x245)][_0x11b695(0x29c)](this);},Scene_Shop['prototype']['numberWindowRect']=function(){const _0x55dbaa=_0x2fb0f3;return Scene_Shop[_0x55dbaa(0x349)]['NumberRect'][_0x55dbaa(0x29c)](this);},Scene_Shop[_0x2fb0f3(0x481)][_0x2fb0f3(0x453)]=function(){const _0xa02f97=_0x2fb0f3;return Scene_Shop['layoutSettings']['StatusRect'][_0xa02f97(0x29c)](this);},Scene_Shop[_0x2fb0f3(0x481)][_0x2fb0f3(0x4ea)]=function(){return Scene_Shop['layoutSettings']['BuyRect']['call'](this);},Scene_Shop['prototype'][_0x2fb0f3(0x37e)]=function(){const _0x5ec7ec=_0x2fb0f3;return Scene_Shop[_0x5ec7ec(0x349)][_0x5ec7ec(0x435)][_0x5ec7ec(0x29c)](this);},Scene_Shop[_0x2fb0f3(0x481)]['sellWindowRect']=function(){const _0x2c5760=_0x2fb0f3;return Scene_Shop[_0x2c5760(0x349)][_0x2c5760(0xcc)][_0x2c5760(0x29c)](this);},Scene_Name[_0x2fb0f3(0x349)]=VisuMZ['CoreEngine']['Settings']['MenuLayout'][_0x2fb0f3(0x4ed)],VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x26d)]=Scene_Name[_0x2fb0f3(0x481)][_0x2fb0f3(0xa6)],Scene_Name[_0x2fb0f3(0x481)][_0x2fb0f3(0xa6)]=function(){const _0xc3304f=_0x2fb0f3;VisuMZ[_0xc3304f(0x248)][_0xc3304f(0x26d)][_0xc3304f(0x29c)](this),this[_0xc3304f(0x2a5)]();},Scene_Name[_0x2fb0f3(0x481)][_0x2fb0f3(0x2a5)]=function(){const _0x5b9e2e=_0x2fb0f3;this[_0x5b9e2e(0x3bb)]&&this[_0x5b9e2e(0x3bb)]['setBackgroundType'](Scene_Name[_0x5b9e2e(0x349)]['EditBgType']),this[_0x5b9e2e(0x3a5)]&&this[_0x5b9e2e(0x3a5)]['setBackgroundType'](Scene_Name[_0x5b9e2e(0x349)]['InputBgType']);},Scene_Name[_0x2fb0f3(0x481)][_0x2fb0f3(0x5f3)]=function(){return 0x0;},Scene_Name[_0x2fb0f3(0x481)][_0x2fb0f3(0x4e8)]=function(){const _0x409729=_0x2fb0f3;return Scene_Name[_0x409729(0x349)][_0x409729(0x4a7)][_0x409729(0x29c)](this);},Scene_Name['prototype'][_0x2fb0f3(0x2bf)]=function(){const _0x2073ff=_0x2fb0f3;return Scene_Name[_0x2073ff(0x349)]['InputRect'][_0x2073ff(0x29c)](this);},Scene_Name['prototype'][_0x2fb0f3(0x170)]=function(){const _0x30312e=_0x2fb0f3;if(!this[_0x30312e(0x3a5)])return![];return VisuMZ[_0x30312e(0x248)][_0x30312e(0x452)][_0x30312e(0x652)][_0x30312e(0x170)];},Scene_Name[_0x2fb0f3(0x481)][_0x2fb0f3(0x1ca)]=function(){const _0x52f319=_0x2fb0f3;return this[_0x52f319(0x170)]()?TextManager[_0x52f319(0x5be)](_0x52f319(0x1c0)):Scene_MenuBase[_0x52f319(0x481)][_0x52f319(0x1ca)][_0x52f319(0x29c)](this);},Scene_Name[_0x2fb0f3(0x481)][_0x2fb0f3(0x36e)]=function(){const _0x472e5f=_0x2fb0f3;if(this[_0x472e5f(0x170)]()){const _0x412db0=VisuMZ['CoreEngine'][_0x472e5f(0x452)][_0x472e5f(0x652)];return this[_0x472e5f(0x3a5)][_0x472e5f(0x23d)]==='keyboard'?_0x412db0[_0x472e5f(0x64c)]||_0x472e5f(0x64c):_0x412db0[_0x472e5f(0x1da)]||_0x472e5f(0x1da);}else return Scene_MenuBase['prototype'][_0x472e5f(0x36e)]['call'](this);},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x3d1)]=Scene_Name[_0x2fb0f3(0x481)][_0x2fb0f3(0x434)],Scene_Name[_0x2fb0f3(0x481)]['onInputOk']=function(){const _0x56280e=_0x2fb0f3;this['doesNameContainBannedWords']()?this[_0x56280e(0x1ef)]():VisuMZ[_0x56280e(0x248)][_0x56280e(0x3d1)][_0x56280e(0x29c)](this);},Scene_Name[_0x2fb0f3(0x481)][_0x2fb0f3(0x24a)]=function(){const _0x3c13e7=_0x2fb0f3,_0x553eea=VisuMZ['CoreEngine']['Settings'][_0x3c13e7(0x652)];if(!_0x553eea)return![];const _0x44ff7e=_0x553eea[_0x3c13e7(0x369)];if(!_0x44ff7e)return![];const _0xca7f5a=this[_0x3c13e7(0x3bb)][_0x3c13e7(0x12d)]()[_0x3c13e7(0x4a1)]();for(const _0x42998e of _0x44ff7e){if(_0xca7f5a[_0x3c13e7(0x401)](_0x42998e[_0x3c13e7(0x4a1)]()))return!![];}return![];},Scene_Name[_0x2fb0f3(0x481)][_0x2fb0f3(0x1ef)]=function(){const _0x1cd002=_0x2fb0f3;SoundManager[_0x1cd002(0x169)]();},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x2c3)]=Scene_Battle['prototype']['update'],Scene_Battle[_0x2fb0f3(0x481)][_0x2fb0f3(0x231)]=function(){const _0x47db21=_0x2fb0f3;VisuMZ[_0x47db21(0x248)][_0x47db21(0x2c3)][_0x47db21(0x29c)](this);if($gameTemp['_playTestFastMode'])this['updatePlayTestF7']();},Scene_Battle[_0x2fb0f3(0x481)]['updatePlayTestF7']=function(){const _0x43648e=_0x2fb0f3;!BattleManager[_0x43648e(0x5f4)]()&&!this['_playtestF7Looping']&&!$gameMessage[_0x43648e(0x467)]()&&(this['_playtestF7Looping']=!![],this[_0x43648e(0x231)](),SceneManager[_0x43648e(0x50f)](),this[_0x43648e(0xac)]=![]);},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x14e)]=Scene_Battle[_0x2fb0f3(0x481)]['createCancelButton'],Scene_Battle[_0x2fb0f3(0x481)][_0x2fb0f3(0x508)]=function(){const _0x331069=_0x2fb0f3;VisuMZ[_0x331069(0x248)][_0x331069(0x14e)][_0x331069(0x29c)](this),SceneManager[_0x331069(0x20e)]()&&this[_0x331069(0x392)]();},Scene_Battle[_0x2fb0f3(0x481)][_0x2fb0f3(0x392)]=function(){const _0x3539e7=_0x2fb0f3;this['_cancelButton']['x']=Graphics[_0x3539e7(0x5a3)]+0x4,this[_0x3539e7(0x354)]()?this[_0x3539e7(0x110)]['y']=Graphics['boxHeight']-this[_0x3539e7(0x267)]():this['_cancelButton']['y']=0x0;},VisuMZ[_0x2fb0f3(0x248)]['Sprite_Button_initialize']=Sprite_Button[_0x2fb0f3(0x481)]['initialize'],Sprite_Button[_0x2fb0f3(0x481)][_0x2fb0f3(0x15c)]=function(_0x175d59){const _0x25f6a7=_0x2fb0f3;VisuMZ[_0x25f6a7(0x248)][_0x25f6a7(0xba)]['call'](this,_0x175d59),this[_0x25f6a7(0x2bc)]();},Sprite_Button['prototype'][_0x2fb0f3(0x2bc)]=function(){const _0x42aa12=_0x2fb0f3,_0x1c0078=VisuMZ['CoreEngine'][_0x42aa12(0x452)]['UI'];this[_0x42aa12(0x578)]=![];switch(this[_0x42aa12(0x557)]){case _0x42aa12(0xda):this[_0x42aa12(0x578)]=!_0x1c0078[_0x42aa12(0x158)];break;case _0x42aa12(0xc0):case'pagedown':this[_0x42aa12(0x578)]=!_0x1c0078[_0x42aa12(0x41b)];break;case _0x42aa12(0x579):case'up':case'down2':case _0x42aa12(0xb7):case'ok':this[_0x42aa12(0x578)]=!_0x1c0078[_0x42aa12(0x602)];break;case _0x42aa12(0x1b0):this[_0x42aa12(0x578)]=!_0x1c0078[_0x42aa12(0x630)];break;}},VisuMZ[_0x2fb0f3(0x248)]['Sprite_Button_updateOpacity']=Sprite_Button['prototype'][_0x2fb0f3(0x531)],Sprite_Button[_0x2fb0f3(0x481)]['updateOpacity']=function(){const _0x144d96=_0x2fb0f3;SceneManager[_0x144d96(0x3ee)]()||this[_0x144d96(0x578)]?this[_0x144d96(0x3e3)]():VisuMZ[_0x144d96(0x248)]['Sprite_Button_updateOpacity']['call'](this);},Sprite_Button[_0x2fb0f3(0x481)]['hideButtonFromView']=function(){const _0xe54d83=_0x2fb0f3;this['visible']=![],this[_0xe54d83(0xce)]=0x0,this['x']=Graphics[_0xe54d83(0x3fb)]*0xa,this['y']=Graphics[_0xe54d83(0x49e)]*0xa;},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x12c)]=Sprite_Battler['prototype'][_0x2fb0f3(0x59b)],Sprite_Battler[_0x2fb0f3(0x481)][_0x2fb0f3(0x59b)]=function(_0x55107a,_0x1a9974,_0x18a897){const _0x51a87c=_0x2fb0f3;(this['_targetOffsetX']!==_0x55107a||this[_0x51a87c(0x24e)]!==_0x1a9974)&&(this[_0x51a87c(0x4ee)](_0x51a87c(0x555)),this['_movementWholeDuration']=_0x18a897),VisuMZ[_0x51a87c(0x248)]['Sprite_Battler_startMove']['call'](this,_0x55107a,_0x1a9974,_0x18a897);},Sprite_Battler[_0x2fb0f3(0x481)]['setMoveEasingType']=function(_0x561a7f){const _0x326090=_0x2fb0f3;this[_0x326090(0x264)]=_0x561a7f;},Sprite_Battler[_0x2fb0f3(0x481)]['updateMove']=function(){const _0x24418e=_0x2fb0f3;if(this['_movementDuration']<=0x0)return;const _0x23d70d=this[_0x24418e(0xb0)],_0x2d719e=this[_0x24418e(0x393)],_0x300f26=this[_0x24418e(0x264)];this[_0x24418e(0x2dd)]=this[_0x24418e(0x178)](this[_0x24418e(0x2dd)],this[_0x24418e(0x658)],_0x23d70d,_0x2d719e,_0x300f26),this['_offsetY']=this[_0x24418e(0x178)](this[_0x24418e(0x418)],this[_0x24418e(0x24e)],_0x23d70d,_0x2d719e,_0x300f26),this['_movementDuration']--;if(this[_0x24418e(0xb0)]<=0x0)this[_0x24418e(0x3b1)]();},Sprite_Battler[_0x2fb0f3(0x481)][_0x2fb0f3(0x178)]=function(_0x52ec9a,_0x2df5cf,_0x27626b,_0x155e2a,_0x44eb9d){const _0x5d6431=_0x2fb0f3,_0x5554b9=VisuMZ[_0x5d6431(0x13e)]((_0x155e2a-_0x27626b)/_0x155e2a,_0x44eb9d||'Linear'),_0x52aff4=VisuMZ[_0x5d6431(0x13e)]((_0x155e2a-_0x27626b+0x1)/_0x155e2a,_0x44eb9d||'Linear'),_0x36da6d=(_0x52ec9a-_0x2df5cf*_0x5554b9)/(0x1-_0x5554b9);return _0x36da6d+(_0x2df5cf-_0x36da6d)*_0x52aff4;},VisuMZ['CoreEngine']['Sprite_Actor_setActorHome']=Sprite_Actor[_0x2fb0f3(0x481)][_0x2fb0f3(0x4c9)],Sprite_Actor['prototype'][_0x2fb0f3(0x4c9)]=function(_0x52cc8a){const _0x18c7d7=_0x2fb0f3;VisuMZ[_0x18c7d7(0x248)][_0x18c7d7(0x452)]['UI'][_0x18c7d7(0x133)]?this[_0x18c7d7(0x46a)](_0x52cc8a):VisuMZ[_0x18c7d7(0x248)]['Sprite_Actor_setActorHome'][_0x18c7d7(0x29c)](this,_0x52cc8a);},Sprite_Actor[_0x2fb0f3(0x481)][_0x2fb0f3(0x46a)]=function(_0xd40997){const _0x619aee=_0x2fb0f3;let _0x4db0db=Math['round'](Graphics[_0x619aee(0x3fb)]/0x2+0xc0);_0x4db0db-=Math[_0x619aee(0x15d)]((Graphics[_0x619aee(0x3fb)]-Graphics[_0x619aee(0x5a3)])/0x2),_0x4db0db+=_0xd40997*0x20;let _0x21e310=Graphics[_0x619aee(0x49e)]-0xc8-$gameParty[_0x619aee(0x58a)]()*0x30;_0x21e310-=Math[_0x619aee(0x15d)]((Graphics[_0x619aee(0x49e)]-Graphics[_0x619aee(0x173)])/0x2),_0x21e310+=_0xd40997*0x30,this[_0x619aee(0x50a)](_0x4db0db,_0x21e310);},Sprite_Actor[_0x2fb0f3(0x481)]['retreat']=function(){const _0x1afd07=_0x2fb0f3;this[_0x1afd07(0x59b)](0x4b0,0x0,0x78);},Sprite_Animation[_0x2fb0f3(0x481)][_0x2fb0f3(0xe2)]=function(_0x5852bd){const _0x53c106=_0x2fb0f3;this[_0x53c106(0x383)]=_0x5852bd;},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x5c8)]=Sprite_Animation['prototype'][_0x2fb0f3(0x3a7)],Sprite_Animation['prototype'][_0x2fb0f3(0x3a7)]=function(){const _0x5d7fbf=_0x2fb0f3;if(this[_0x5d7fbf(0x383)])return;VisuMZ[_0x5d7fbf(0x248)]['Sprite_Animation_processSoundTimings'][_0x5d7fbf(0x29c)](this);},Sprite_Animation['prototype'][_0x2fb0f3(0x421)]=function(_0x30355c){const _0x2a73e4=_0x2fb0f3;if(_0x30355c[_0x2a73e4(0x4c1)]){}const _0x3b34ba=this[_0x2a73e4(0x103)][_0x2a73e4(0x12d)];let _0x403d13=_0x30355c[_0x2a73e4(0x49e)]*_0x30355c[_0x2a73e4(0x2a0)]['y'],_0x1c334a=0x0,_0x1bf901=-_0x403d13/0x2;if(_0x3b34ba[_0x2a73e4(0x573)](/<(?:HEAD|HEADER|TOP)>/i))_0x1bf901=-_0x403d13;if(_0x3b34ba[_0x2a73e4(0x573)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x1bf901=0x0;if(_0x3b34ba[_0x2a73e4(0x573)](/<(?:LEFT)>/i))_0x1c334a=-_0x30355c[_0x2a73e4(0x3fb)]/0x2;if(_0x3b34ba['match'](/<(?:RIGHT)>/i))_0x1bf901=_0x30355c[_0x2a73e4(0x3fb)]/0x2;if(_0x3b34ba[_0x2a73e4(0x573)](/<ANCHOR X:[ ](\d+\.?\d*)>/i))_0x1c334a=Number(RegExp['$1'])*_0x30355c[_0x2a73e4(0x3fb)];_0x3b34ba[_0x2a73e4(0x573)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x1bf901=(0x1-Number(RegExp['$1']))*-_0x403d13);_0x3b34ba['match'](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x1c334a=Number(RegExp['$1'])*_0x30355c[_0x2a73e4(0x3fb)],_0x1bf901=(0x1-Number(RegExp['$2']))*-_0x403d13);if(_0x3b34ba[_0x2a73e4(0x573)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x1c334a+=Number(RegExp['$1']);if(_0x3b34ba[_0x2a73e4(0x573)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x1bf901+=Number(RegExp['$1']);_0x3b34ba['match'](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x1c334a+=Number(RegExp['$1']),_0x1bf901+=Number(RegExp['$2']));const _0x2780eb=new Point(_0x1c334a,_0x1bf901);return _0x30355c[_0x2a73e4(0x639)](),_0x30355c[_0x2a73e4(0x1c8)][_0x2a73e4(0xdc)](_0x2780eb);},Sprite_AnimationMV['prototype'][_0x2fb0f3(0xe2)]=function(_0x3baed7){const _0x247b90=_0x2fb0f3;this[_0x247b90(0x383)]=_0x3baed7;},VisuMZ[_0x2fb0f3(0x248)]['Sprite_AnimationMV_processTimingData']=Sprite_AnimationMV[_0x2fb0f3(0x481)]['processTimingData'],Sprite_AnimationMV['prototype'][_0x2fb0f3(0x567)]=function(_0x350425){const _0x29f084=_0x2fb0f3;this[_0x29f084(0x383)]&&(_0x350425=JsonEx['makeDeepCopy'](_0x350425),_0x350425['se']&&(_0x350425['se'][_0x29f084(0x1af)]=0x0)),VisuMZ[_0x29f084(0x248)][_0x29f084(0x2e2)][_0x29f084(0x29c)](this,_0x350425);},Sprite_Damage[_0x2fb0f3(0x481)][_0x2fb0f3(0x479)]=function(_0x1a8aa6){const _0x30cbe4=_0x2fb0f3;let _0xb340d2=Math[_0x30cbe4(0x191)](_0x1a8aa6)[_0x30cbe4(0x44d)]();this[_0x30cbe4(0x2b7)]()&&(_0xb340d2=VisuMZ['GroupDigits'](_0xb340d2));const _0x42a1f9=this[_0x30cbe4(0x528)](),_0x384ee9=Math[_0x30cbe4(0x15d)](_0x42a1f9*0.75);for(let _0x14d9f4=0x0;_0x14d9f4<_0xb340d2[_0x30cbe4(0x105)];_0x14d9f4++){const _0x3edb4c=this[_0x30cbe4(0x326)](_0x384ee9,_0x42a1f9);_0x3edb4c['bitmap'][_0x30cbe4(0x544)](_0xb340d2[_0x14d9f4],0x0,0x0,_0x384ee9,_0x42a1f9,_0x30cbe4(0x185)),_0x3edb4c['x']=(_0x14d9f4-(_0xb340d2['length']-0x1)/0x2)*_0x384ee9,_0x3edb4c['dy']=-_0x14d9f4;}},Sprite_Damage[_0x2fb0f3(0x481)][_0x2fb0f3(0x2b7)]=function(){const _0x53a93c=_0x2fb0f3;return VisuMZ[_0x53a93c(0x248)][_0x53a93c(0x452)][_0x53a93c(0x20f)][_0x53a93c(0x2ad)];},Sprite_Damage[_0x2fb0f3(0x481)]['valueOutlineColor']=function(){const _0x12fd5c=_0x2fb0f3;return ColorManager[_0x12fd5c(0x34e)]();},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x254)]=Sprite_Gauge[_0x2fb0f3(0x481)]['gaugeRate'],Sprite_Gauge[_0x2fb0f3(0x481)]['gaugeRate']=function(){const _0x439fa3=_0x2fb0f3;return VisuMZ[_0x439fa3(0x248)][_0x439fa3(0x254)][_0x439fa3(0x29c)](this)[_0x439fa3(0x572)](0x0,0x1);},VisuMZ['CoreEngine'][_0x2fb0f3(0x33f)]=Sprite_Gauge[_0x2fb0f3(0x481)]['currentValue'],Sprite_Gauge[_0x2fb0f3(0x481)][_0x2fb0f3(0x52b)]=function(){const _0x16cf62=_0x2fb0f3;let _0x490482=VisuMZ['CoreEngine'][_0x16cf62(0x33f)][_0x16cf62(0x29c)](this);return _0x490482;},Sprite_Gauge[_0x2fb0f3(0x481)][_0x2fb0f3(0x36a)]=function(){const _0x46a0ac=_0x2fb0f3;let _0x3e315b=this['currentValue']();this[_0x46a0ac(0x2b7)]()&&(_0x3e315b=VisuMZ[_0x46a0ac(0x31d)](_0x3e315b));const _0x2bb5a7=this['bitmapWidth']()-0x1,_0x56b174=this[_0x46a0ac(0x2ce)]();this[_0x46a0ac(0x651)](),this[_0x46a0ac(0x4f7)][_0x46a0ac(0x544)](_0x3e315b,0x0,0x0,_0x2bb5a7,_0x56b174,_0x46a0ac(0x3d9));},Sprite_Gauge[_0x2fb0f3(0x481)][_0x2fb0f3(0x2d8)]=function(){return 0x3;},Sprite_Gauge[_0x2fb0f3(0x481)][_0x2fb0f3(0x2b7)]=function(){const _0x3620d9=_0x2fb0f3;return VisuMZ[_0x3620d9(0x248)]['Settings'][_0x3620d9(0x20f)][_0x3620d9(0x505)];},Sprite_Gauge[_0x2fb0f3(0x481)][_0x2fb0f3(0x294)]=function(){const _0x19acbc=_0x2fb0f3;return ColorManager[_0x19acbc(0x48b)]();};function Sprite_TitlePictureButton(){const _0x5bbfd7=_0x2fb0f3;this[_0x5bbfd7(0x15c)](...arguments);}Sprite_TitlePictureButton[_0x2fb0f3(0x481)]=Object[_0x2fb0f3(0xa6)](Sprite_Clickable[_0x2fb0f3(0x481)]),Sprite_TitlePictureButton['prototype']['constructor']=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x2fb0f3(0x481)][_0x2fb0f3(0x15c)]=function(_0x5c655b){const _0x49f026=_0x2fb0f3;Sprite_Clickable[_0x49f026(0x481)]['initialize']['call'](this),this[_0x49f026(0x5ac)]=_0x5c655b,this[_0x49f026(0x2b1)]=null,this[_0x49f026(0x496)]();},Sprite_TitlePictureButton['prototype'][_0x2fb0f3(0x496)]=function(){const _0x44a0bb=_0x2fb0f3;this['x']=Graphics[_0x44a0bb(0x3fb)],this['y']=Graphics[_0x44a0bb(0x49e)],this[_0x44a0bb(0x38f)]=![],this[_0x44a0bb(0x91)]();},Sprite_TitlePictureButton['prototype']['setupButtonImage']=function(){const _0x3c9e3c=_0x2fb0f3;this['bitmap']=ImageManager['loadPicture'](this[_0x3c9e3c(0x5ac)][_0x3c9e3c(0x4c3)]),this[_0x3c9e3c(0x4f7)]['addLoadListener'](this[_0x3c9e3c(0x4c8)][_0x3c9e3c(0x3ef)](this));},Sprite_TitlePictureButton[_0x2fb0f3(0x481)]['onButtonImageLoad']=function(){const _0x3b601e=_0x2fb0f3;this['_data'][_0x3b601e(0x181)]['call'](this),this[_0x3b601e(0x5ac)][_0x3b601e(0x603)][_0x3b601e(0x29c)](this),this[_0x3b601e(0x4fd)](this['_data'][_0x3b601e(0x611)][_0x3b601e(0x3ef)](this));},Sprite_TitlePictureButton[_0x2fb0f3(0x481)]['update']=function(){const _0x43f1d1=_0x2fb0f3;Sprite_Clickable[_0x43f1d1(0x481)]['update'][_0x43f1d1(0x29c)](this),this[_0x43f1d1(0x531)](),this[_0x43f1d1(0x28a)]();},Sprite_TitlePictureButton[_0x2fb0f3(0x481)][_0x2fb0f3(0x31f)]=function(){const _0x2b0907=_0x2fb0f3;return VisuMZ['CoreEngine']['Settings'][_0x2b0907(0x10a)]['Title'][_0x2b0907(0x10d)];},Sprite_TitlePictureButton[_0x2fb0f3(0x481)][_0x2fb0f3(0x531)]=function(){const _0x4d5c0b=_0x2fb0f3;this['_pressed']?this[_0x4d5c0b(0xce)]=0xff:(this['opacity']+=this[_0x4d5c0b(0x38f)]?this['fadeSpeed']():-0x1*this['fadeSpeed'](),this[_0x4d5c0b(0xce)]=Math[_0x4d5c0b(0x347)](0xc0,this[_0x4d5c0b(0xce)]));},Sprite_TitlePictureButton[_0x2fb0f3(0x481)]['setClickHandler']=function(_0xe2cd97){const _0x3bd053=_0x2fb0f3;this[_0x3bd053(0x2b1)]=_0xe2cd97;},Sprite_TitlePictureButton[_0x2fb0f3(0x481)][_0x2fb0f3(0x1bc)]=function(){const _0x4753f4=_0x2fb0f3;this['_clickHandler']&&this[_0x4753f4(0x2b1)]();},VisuMZ[_0x2fb0f3(0x248)]['Spriteset_Base_initialize']=Spriteset_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x15c)],Spriteset_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x15c)]=function(){const _0xcd92b1=_0x2fb0f3;VisuMZ[_0xcd92b1(0x248)][_0xcd92b1(0x281)]['call'](this),this[_0xcd92b1(0xc8)]();},Spriteset_Base['prototype'][_0x2fb0f3(0xc8)]=function(){const _0x14097e=_0x2fb0f3;this[_0x14097e(0xe8)]=[],this[_0x14097e(0x5c5)]=this['scale']['x'],this[_0x14097e(0x3d8)]=this[_0x14097e(0x2a0)]['y'];},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0xa8)]=Spriteset_Base[_0x2fb0f3(0x481)]['destroy'],Spriteset_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x3de)]=function(_0x484cd3){const _0x35f5d2=_0x2fb0f3;this[_0x35f5d2(0x257)](),VisuMZ[_0x35f5d2(0x248)][_0x35f5d2(0xa8)]['call'](this,_0x484cd3);},VisuMZ['CoreEngine'][_0x2fb0f3(0x3ff)]=Spriteset_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x231)],Spriteset_Base['prototype'][_0x2fb0f3(0x231)]=function(){const _0x23b52e=_0x2fb0f3;VisuMZ[_0x23b52e(0x248)][_0x23b52e(0x3ff)][_0x23b52e(0x29c)](this),this['updatePictureAntiZoom'](),this[_0x23b52e(0x541)]();},Spriteset_Base[_0x2fb0f3(0x481)]['updatePictureAntiZoom']=function(){const _0x1d4ba7=_0x2fb0f3;if(!VisuMZ[_0x1d4ba7(0x248)][_0x1d4ba7(0x452)]['QoL'][_0x1d4ba7(0x260)])return;if(this[_0x1d4ba7(0x5c5)]===this[_0x1d4ba7(0x2a0)]['x']&&this[_0x1d4ba7(0x3d8)]===this[_0x1d4ba7(0x2a0)]['y'])return;this[_0x1d4ba7(0x5b3)](),this['_cacheScaleX']=this[_0x1d4ba7(0x2a0)]['x'],this[_0x1d4ba7(0x3d8)]=this[_0x1d4ba7(0x2a0)]['y'];},Spriteset_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x5b3)]=function(){const _0x3a31d2=_0x2fb0f3;this[_0x3a31d2(0x2a0)]['x']!==0x0&&(this['_pictureContainer'][_0x3a31d2(0x2a0)]['x']=0x1/this[_0x3a31d2(0x2a0)]['x'],this['_pictureContainer']['x']=-(this['x']/this[_0x3a31d2(0x2a0)]['x'])),this[_0x3a31d2(0x2a0)]['y']!==0x0&&(this[_0x3a31d2(0x223)]['scale']['y']=0x1/this[_0x3a31d2(0x2a0)]['y'],this[_0x3a31d2(0x223)]['y']=-(this['y']/this[_0x3a31d2(0x2a0)]['y']));},Spriteset_Base[_0x2fb0f3(0x481)]['updateFauxAnimations']=function(){const _0x1ca9f1=_0x2fb0f3;for(const _0x352b8d of this[_0x1ca9f1(0xe8)]){!_0x352b8d[_0x1ca9f1(0x38e)]()&&this['removeFauxAnimation'](_0x352b8d);}this[_0x1ca9f1(0x553)]();},Spriteset_Base['prototype'][_0x2fb0f3(0x553)]=function(){const _0x289ca1=_0x2fb0f3;for(;;){const _0xbe71e8=$gameTemp[_0x289ca1(0x2a8)]();if(_0xbe71e8)this[_0x289ca1(0x561)](_0xbe71e8);else break;}},Spriteset_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x561)]=function(_0x3664e2){const _0x387340=_0x2fb0f3,_0x4e1b22=$dataAnimations[_0x3664e2[_0x387340(0x626)]],_0x2098a9=_0x3664e2[_0x387340(0x2ee)],_0x538d77=_0x3664e2[_0x387340(0x36b)],_0x55ee9d=_0x3664e2[_0x387340(0x444)];let _0xff88af=this[_0x387340(0xf0)]();const _0x2161a0=this[_0x387340(0x16d)]();if(this[_0x387340(0x341)](_0x4e1b22))for(const _0x284067 of _0x2098a9){this[_0x387340(0xad)]([_0x284067],_0x4e1b22,_0x538d77,_0xff88af,_0x55ee9d),_0xff88af+=_0x2161a0;}else this[_0x387340(0xad)](_0x2098a9,_0x4e1b22,_0x538d77,_0xff88af,_0x55ee9d);},Spriteset_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0xad)]=function(_0x54f38f,_0x5163e4,_0x19cea9,_0x5b82c9,_0x4994db){const _0x1f5d0d=_0x2fb0f3,_0x13983a=this['isMVAnimation'](_0x5163e4),_0x3e0f3d=new(_0x13983a?Sprite_AnimationMV:Sprite_Animation)(),_0x2c2664=this[_0x1f5d0d(0x3c6)](_0x54f38f);this['animationShouldMirror'](_0x54f38f[0x0])&&(_0x19cea9=!_0x19cea9),_0x3e0f3d[_0x1f5d0d(0x1f1)]=_0x54f38f,_0x3e0f3d[_0x1f5d0d(0x496)](_0x2c2664,_0x5163e4,_0x19cea9,_0x5b82c9),_0x3e0f3d[_0x1f5d0d(0xe2)](_0x4994db),this[_0x1f5d0d(0x451)][_0x1f5d0d(0x4e0)](_0x3e0f3d),this['_fauxAnimationSprites']['push'](_0x3e0f3d);},Spriteset_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x3dd)]=function(_0x4106aa){const _0xfe170e=_0x2fb0f3;this[_0xfe170e(0xe8)]['remove'](_0x4106aa),this[_0xfe170e(0x451)][_0xfe170e(0x40d)](_0x4106aa);for(const _0xc9c88c of _0x4106aa[_0xfe170e(0x1f1)]){_0xc9c88c['endAnimation']&&_0xc9c88c[_0xfe170e(0x4ef)]();}_0x4106aa['destroy']();},Spriteset_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x257)]=function(){const _0x4fb4fe=_0x2fb0f3;for(const _0x37afd8 of this[_0x4fb4fe(0xe8)]){this[_0x4fb4fe(0x3dd)](_0x37afd8);}},Spriteset_Base[_0x2fb0f3(0x481)]['isFauxAnimationPlaying']=function(){const _0x78a073=_0x2fb0f3;return this[_0x78a073(0xe8)][_0x78a073(0x105)]>0x0;},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0xdd)]=Spriteset_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x325)],Spriteset_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x325)]=function(){const _0x5073bf=_0x2fb0f3;VisuMZ[_0x5073bf(0x248)]['Spriteset_Base_updatePosition'][_0x5073bf(0x29c)](this),this[_0x5073bf(0x4a3)]();},Spriteset_Base['prototype']['updatePositionCoreEngine']=function(){const _0x1532a1=_0x2fb0f3;if(!$gameScreen)return;if($gameScreen[_0x1532a1(0x288)]<=0x0)return;this['x']-=Math[_0x1532a1(0x132)]($gameScreen[_0x1532a1(0x563)]());const _0x2bb1a9=$gameScreen[_0x1532a1(0x47b)]();switch($gameScreen[_0x1532a1(0x47b)]()){case _0x1532a1(0x4a5):this[_0x1532a1(0x127)]();break;case'horizontal':this['updatePositionCoreEngineShakeHorz']();break;case _0x1532a1(0x16f):this[_0x1532a1(0x40b)]();break;default:this[_0x1532a1(0x25c)]();break;}},Spriteset_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x127)]=function(){const _0x5190e9=_0x2fb0f3,_0x403ee3=VisuMZ[_0x5190e9(0x248)][_0x5190e9(0x452)][_0x5190e9(0x3c5)];if(_0x403ee3&&_0x403ee3[_0x5190e9(0x443)])return _0x403ee3[_0x5190e9(0x443)][_0x5190e9(0x29c)](this);this['x']+=Math[_0x5190e9(0x132)]($gameScreen['shake']());},Spriteset_Base[_0x2fb0f3(0x481)]['updatePositionCoreEngineShakeRand']=function(){const _0x28d6dc=_0x2fb0f3,_0x4f898c=VisuMZ[_0x28d6dc(0x248)][_0x28d6dc(0x452)]['ScreenShake'];if(_0x4f898c&&_0x4f898c[_0x28d6dc(0x201)])return _0x4f898c[_0x28d6dc(0x201)][_0x28d6dc(0x29c)](this);const _0x454777=$gameScreen['_shakePower']*0.75,_0xe4d99e=$gameScreen[_0x28d6dc(0x5cd)]*0.6,_0x2a81c7=$gameScreen[_0x28d6dc(0x288)];this['x']+=Math[_0x28d6dc(0x132)](Math[_0x28d6dc(0x17e)](_0x454777)-Math[_0x28d6dc(0x17e)](_0xe4d99e))*(Math['min'](_0x2a81c7,0x1e)*0.5),this['y']+=Math[_0x28d6dc(0x132)](Math['randomInt'](_0x454777)-Math['randomInt'](_0xe4d99e))*(Math[_0x28d6dc(0x347)](_0x2a81c7,0x1e)*0.5);},Spriteset_Base['prototype'][_0x2fb0f3(0x33e)]=function(){const _0x50e059=_0x2fb0f3,_0x47456a=VisuMZ[_0x50e059(0x248)]['Settings'][_0x50e059(0x3c5)];if(_0x47456a&&_0x47456a[_0x50e059(0x2e5)])return _0x47456a[_0x50e059(0x2e5)][_0x50e059(0x29c)](this);const _0x5c246c=$gameScreen[_0x50e059(0x379)]*0.75,_0x45d0bd=$gameScreen['_shakeSpeed']*0.6,_0x51e4b0=$gameScreen[_0x50e059(0x288)];this['x']+=Math[_0x50e059(0x132)](Math[_0x50e059(0x17e)](_0x5c246c)-Math[_0x50e059(0x17e)](_0x45d0bd))*(Math[_0x50e059(0x347)](_0x51e4b0,0x1e)*0.5);},Spriteset_Base['prototype'][_0x2fb0f3(0x40b)]=function(){const _0x45024c=_0x2fb0f3,_0x5001bd=VisuMZ[_0x45024c(0x248)][_0x45024c(0x452)][_0x45024c(0x3c5)];if(_0x5001bd&&_0x5001bd[_0x45024c(0x547)])return _0x5001bd['vertJS'][_0x45024c(0x29c)](this);const _0x5eaea9=$gameScreen[_0x45024c(0x379)]*0.75,_0x25851e=$gameScreen[_0x45024c(0x5cd)]*0.6,_0x280047=$gameScreen[_0x45024c(0x288)];this['y']+=Math[_0x45024c(0x132)](Math[_0x45024c(0x17e)](_0x5eaea9)-Math[_0x45024c(0x17e)](_0x25851e))*(Math[_0x45024c(0x347)](_0x280047,0x1e)*0.5);},Spriteset_Battle['prototype'][_0x2fb0f3(0x60a)]=function(){const _0x58b121=_0x2fb0f3;this['_backgroundFilter']=new PIXI[(_0x58b121(0xcb))]['BlurFilter'](clamp=!![]),this[_0x58b121(0x3f9)]=new Sprite(),this[_0x58b121(0x3f9)]['bitmap']=SceneManager[_0x58b121(0x255)](),this[_0x58b121(0x3f9)][_0x58b121(0xcb)]=[this[_0x58b121(0x427)]],this[_0x58b121(0x265)][_0x58b121(0x4e0)](this['_backgroundSprite']);},VisuMZ['CoreEngine'][_0x2fb0f3(0x30e)]=Spriteset_Battle[_0x2fb0f3(0x481)][_0x2fb0f3(0x455)],Spriteset_Battle[_0x2fb0f3(0x481)]['createEnemies']=function(){const _0x2601f9=_0x2fb0f3;VisuMZ[_0x2601f9(0x248)]['Settings']['UI'][_0x2601f9(0x30f)]&&this[_0x2601f9(0x3ac)](),VisuMZ[_0x2601f9(0x248)][_0x2601f9(0x30e)][_0x2601f9(0x29c)](this);},Spriteset_Battle[_0x2fb0f3(0x481)][_0x2fb0f3(0x3ac)]=function(){const _0x476971=_0x2fb0f3;for(member of $gameTroop[_0x476971(0x377)]()){member[_0x476971(0x285)]();}},VisuMZ['CoreEngine'][_0x2fb0f3(0x310)]=Window_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x15c)],Window_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x15c)]=function(_0x4dacf6){const _0x1abd88=_0x2fb0f3;_0x4dacf6['x']=Math[_0x1abd88(0x132)](_0x4dacf6['x']),_0x4dacf6['y']=Math[_0x1abd88(0x132)](_0x4dacf6['y']),_0x4dacf6[_0x1abd88(0x3fb)]=Math['round'](_0x4dacf6[_0x1abd88(0x3fb)]),_0x4dacf6[_0x1abd88(0x49e)]=Math['round'](_0x4dacf6[_0x1abd88(0x49e)]),this[_0x1abd88(0x5d5)](),VisuMZ['CoreEngine'][_0x1abd88(0x310)][_0x1abd88(0x29c)](this,_0x4dacf6),this[_0x1abd88(0x2af)]();},Window_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x5d5)]=function(){const _0x52acd1=_0x2fb0f3;this[_0x52acd1(0x5a2)]=VisuMZ[_0x52acd1(0x248)][_0x52acd1(0x452)][_0x52acd1(0x20f)]['DigitGroupingStandardText'],this[_0x52acd1(0x4ad)]=VisuMZ[_0x52acd1(0x248)][_0x52acd1(0x452)][_0x52acd1(0x20f)][_0x52acd1(0x1b9)];},Window_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x199)]=function(){const _0x2e199b=_0x2fb0f3;return VisuMZ[_0x2e199b(0x248)][_0x2e199b(0x452)][_0x2e199b(0x404)]['LineHeight'];},Window_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x34d)]=function(){const _0x40caae=_0x2fb0f3;return VisuMZ[_0x40caae(0x248)][_0x40caae(0x452)][_0x40caae(0x404)]['ItemPadding'];},Window_Base['prototype'][_0x2fb0f3(0x282)]=function(){const _0x1b21d4=_0x2fb0f3;this[_0x1b21d4(0x292)]=VisuMZ['CoreEngine'][_0x1b21d4(0x452)][_0x1b21d4(0x404)][_0x1b21d4(0x447)];},Window_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x574)]=function(){const _0x41c9ad=_0x2fb0f3;return VisuMZ[_0x41c9ad(0x248)][_0x41c9ad(0x452)][_0x41c9ad(0x404)]['TranslucentOpacity'];},Window_Base[_0x2fb0f3(0x481)]['openingSpeed']=function(){const _0x5a2f2a=_0x2fb0f3;return VisuMZ[_0x5a2f2a(0x248)][_0x5a2f2a(0x452)]['Window'][_0x5a2f2a(0x23b)];},VisuMZ['CoreEngine']['Window_Base_update']=Window_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x231)],Window_Base[_0x2fb0f3(0x481)]['update']=function(){const _0x2e7a75=_0x2fb0f3;VisuMZ[_0x2e7a75(0x248)]['Window_Base_update']['call'](this),this[_0x2e7a75(0x43a)]();},Window_Base['prototype'][_0x2fb0f3(0x53b)]=function(){const _0x5b20de=_0x2fb0f3;this[_0x5b20de(0x56c)]&&(this[_0x5b20de(0x1ec)]+=this[_0x5b20de(0x1fd)](),this[_0x5b20de(0x194)]()&&(this[_0x5b20de(0x56c)]=![]));},Window_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x43b)]=function(){const _0x282cff=_0x2fb0f3;this[_0x282cff(0x39c)]&&(this[_0x282cff(0x1ec)]-=this['openingSpeed'](),this['isClosed']()&&(this[_0x282cff(0x39c)]=![]));},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x43c)]=Window_Base['prototype']['drawText'],Window_Base[_0x2fb0f3(0x481)]['drawText']=function(_0x3d1853,_0xed3168,_0x349bd9,_0x44e60e,_0x4fb65e){const _0xb85c79=_0x2fb0f3;if(this[_0xb85c79(0x2b7)]())_0x3d1853=VisuMZ[_0xb85c79(0x31d)](_0x3d1853);VisuMZ[_0xb85c79(0x248)][_0xb85c79(0x43c)][_0xb85c79(0x29c)](this,_0x3d1853,_0xed3168,_0x349bd9,_0x44e60e,_0x4fb65e);},Window_Base['prototype'][_0x2fb0f3(0x2b7)]=function(){return this['_digitGrouping'];},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x52d)]=Window_Base[_0x2fb0f3(0x481)]['createTextState'],Window_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x504)]=function(_0x4f2866,_0x10609a,_0x200937,_0x45c155){const _0x91f7a4=_0x2fb0f3;var _0x35fd8b=VisuMZ[_0x91f7a4(0x248)][_0x91f7a4(0x52d)][_0x91f7a4(0x29c)](this,_0x4f2866,_0x10609a,_0x200937,_0x45c155);if(this[_0x91f7a4(0x102)]())_0x35fd8b[_0x91f7a4(0x279)]=VisuMZ['GroupDigits'](_0x35fd8b['text']);return _0x35fd8b;},Window_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x102)]=function(){const _0x214d56=_0x2fb0f3;return this[_0x214d56(0x4ad)];},Window_Base['prototype'][_0x2fb0f3(0x304)]=function(_0x3a87d2){const _0x1fa496=_0x2fb0f3;this[_0x1fa496(0x5a2)]=_0x3a87d2;},Window_Base['prototype'][_0x2fb0f3(0xd0)]=function(_0x1662a2){this['_digitGroupingEx']=_0x1662a2;},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x3f1)]=Window_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x502)],Window_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x502)]=function(_0x54eb1e,_0x3aa4a0,_0xfdef0a){const _0x193e1f=_0x2fb0f3;_0x3aa4a0=Math[_0x193e1f(0x132)](_0x3aa4a0),_0xfdef0a=Math[_0x193e1f(0x132)](_0xfdef0a),VisuMZ['CoreEngine']['Window_Base_drawIcon'][_0x193e1f(0x29c)](this,_0x54eb1e,_0x3aa4a0,_0xfdef0a);},VisuMZ['CoreEngine'][_0x2fb0f3(0x331)]=Window_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x540)],Window_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x540)]=function(_0x268e86,_0x427488,_0x527ecf,_0x2a02e1,_0x20a523,_0x189462){const _0x1ffe0d=_0x2fb0f3;_0x20a523=_0x20a523||ImageManager[_0x1ffe0d(0x397)],_0x189462=_0x189462||ImageManager['faceHeight'],_0x527ecf=Math[_0x1ffe0d(0x132)](_0x527ecf),_0x2a02e1=Math[_0x1ffe0d(0x132)](_0x2a02e1),_0x20a523=Math[_0x1ffe0d(0x132)](_0x20a523),_0x189462=Math[_0x1ffe0d(0x132)](_0x189462),VisuMZ[_0x1ffe0d(0x248)][_0x1ffe0d(0x331)][_0x1ffe0d(0x29c)](this,_0x268e86,_0x427488,_0x527ecf,_0x2a02e1,_0x20a523,_0x189462);},VisuMZ[_0x2fb0f3(0x248)]['Window_Base_drawCharacter']=Window_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x370)],Window_Base['prototype'][_0x2fb0f3(0x370)]=function(_0x4b74b2,_0x268456,_0x4ae51e,_0x3cfde3){const _0x464dc2=_0x2fb0f3;_0x4ae51e=Math[_0x464dc2(0x132)](_0x4ae51e),_0x3cfde3=Math[_0x464dc2(0x132)](_0x3cfde3),VisuMZ['CoreEngine'][_0x464dc2(0x493)]['call'](this,_0x4b74b2,_0x268456,_0x4ae51e,_0x3cfde3);},VisuMZ[_0x2fb0f3(0x248)]['Window_Selectable_itemRect']=Window_Selectable['prototype']['itemRect'],Window_Selectable['prototype'][_0x2fb0f3(0x28b)]=function(_0x21185a){const _0x1073f7=_0x2fb0f3;let _0x4b1817=VisuMZ[_0x1073f7(0x248)][_0x1073f7(0x5ff)][_0x1073f7(0x29c)](this,_0x21185a);return _0x4b1817['x']=Math[_0x1073f7(0x132)](_0x4b1817['x']),_0x4b1817['y']=Math[_0x1073f7(0x132)](_0x4b1817['y']),_0x4b1817[_0x1073f7(0x3fb)]=Math[_0x1073f7(0x132)](_0x4b1817[_0x1073f7(0x3fb)]),_0x4b1817[_0x1073f7(0x49e)]=Math[_0x1073f7(0x132)](_0x4b1817[_0x1073f7(0x49e)]),_0x4b1817;},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x19d)]=Window_StatusBase[_0x2fb0f3(0x481)]['drawActorSimpleStatus'],Window_StatusBase['prototype'][_0x2fb0f3(0x224)]=function(_0x345fdf,_0x3dcbac,_0x51f6c2){const _0x30aecb=_0x2fb0f3;_0x3dcbac=Math[_0x30aecb(0x132)](_0x3dcbac),_0x51f6c2=Math[_0x30aecb(0x132)](_0x51f6c2),VisuMZ[_0x30aecb(0x248)]['Window_StatusBase_drawActorSimpleStatus'][_0x30aecb(0x29c)](this,_0x345fdf,_0x3dcbac,_0x51f6c2);},Window_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x2af)]=function(){const _0xb91100=_0x2fb0f3;this['_coreEasing']={'duration':0x0,'wholeDuration':0x0,'type':_0xb91100(0x1c3),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0xb91100(0x2a0)]['x'],'targetScaleY':this[_0xb91100(0x2a0)]['y'],'targetOpacity':this[_0xb91100(0xce)],'targetBackOpacity':this[_0xb91100(0x292)],'targetContentsOpacity':this[_0xb91100(0x188)]};},Window_Base['prototype'][_0x2fb0f3(0x43a)]=function(){const _0x2d2abb=_0x2fb0f3;if(!this['_coreEasing'])return;if(this['_coreEasing'][_0x2d2abb(0x2ab)]<=0x0)return;this['x']=this['applyCoreEasing'](this['x'],this[_0x2d2abb(0x38c)][_0x2d2abb(0x3bd)]),this['y']=this['applyCoreEasing'](this['y'],this[_0x2d2abb(0x38c)][_0x2d2abb(0x399)]),this[_0x2d2abb(0x2a0)]['x']=this[_0x2d2abb(0x46d)](this['scale']['x'],this[_0x2d2abb(0x38c)][_0x2d2abb(0x536)]),this['scale']['y']=this[_0x2d2abb(0x46d)](this[_0x2d2abb(0x2a0)]['y'],this[_0x2d2abb(0x38c)][_0x2d2abb(0x634)]),this[_0x2d2abb(0xce)]=this['applyCoreEasing'](this['opacity'],this[_0x2d2abb(0x38c)]['targetOpacity']),this[_0x2d2abb(0x292)]=this[_0x2d2abb(0x46d)](this['backOpacity'],this[_0x2d2abb(0x38c)][_0x2d2abb(0x3d3)]),this[_0x2d2abb(0x188)]=this[_0x2d2abb(0x46d)](this[_0x2d2abb(0x188)],this['_coreEasing'][_0x2d2abb(0x362)]),this['_coreEasing']['duration']--;},Window_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x46d)]=function(_0x11e83e,_0x5b5a0e){const _0x4fdf9d=_0x2fb0f3;if(!this[_0x4fdf9d(0x38c)])return _0x5b5a0e;const _0x1a1f7b=this[_0x4fdf9d(0x38c)][_0x4fdf9d(0x2ab)],_0x40addd=this['_coreEasing']['wholeDuration'],_0xddc0a6=this[_0x4fdf9d(0x1e6)]((_0x40addd-_0x1a1f7b)/_0x40addd),_0xdffbfb=this[_0x4fdf9d(0x1e6)]((_0x40addd-_0x1a1f7b+0x1)/_0x40addd),_0x1fdd27=(_0x11e83e-_0x5b5a0e*_0xddc0a6)/(0x1-_0xddc0a6);return _0x1fdd27+(_0x5b5a0e-_0x1fdd27)*_0xdffbfb;},Window_Base[_0x2fb0f3(0x481)]['calcCoreEasing']=function(_0x5c6b19){const _0x452559=_0x2fb0f3;if(!this[_0x452559(0x38c)])return _0x5c6b19;return VisuMZ[_0x452559(0x13e)](_0x5c6b19,this['_coreEasing']['type']||_0x452559(0x1c3));},Window_Base[_0x2fb0f3(0x481)]['anchorCoreEasing']=function(_0x55c12f,_0x61047c){const _0x52e9a1=_0x2fb0f3;if(!this['_coreEasing'])return;this['x']=this[_0x52e9a1(0x38c)][_0x52e9a1(0x3bd)],this['y']=this['_coreEasing'][_0x52e9a1(0x399)],this[_0x52e9a1(0x2a0)]['x']=this[_0x52e9a1(0x38c)][_0x52e9a1(0x536)],this[_0x52e9a1(0x2a0)]['y']=this[_0x52e9a1(0x38c)]['targetScaleY'],this[_0x52e9a1(0xce)]=this[_0x52e9a1(0x38c)][_0x52e9a1(0x588)],this[_0x52e9a1(0x292)]=this[_0x52e9a1(0x38c)]['targetBackOpacity'],this[_0x52e9a1(0x188)]=this['_coreEasing']['targetContentsOpacity'],this[_0x52e9a1(0x19c)](_0x55c12f,_0x61047c,this['x'],this['y'],this[_0x52e9a1(0x2a0)]['x'],this[_0x52e9a1(0x2a0)]['y'],this[_0x52e9a1(0xce)],this['backOpacity'],this['contentsOpacity']);},Window_Base['prototype'][_0x2fb0f3(0x19c)]=function(_0x466c65,_0x545030,_0x1faf42,_0x96bc80,_0x497276,_0x5b7b1a,_0x1cefc2,_0x4ebde6,_0x5e352c){const _0x4fe380=_0x2fb0f3;this[_0x4fe380(0x38c)]={'duration':_0x466c65,'wholeDuration':_0x466c65,'type':_0x545030,'targetX':_0x1faf42,'targetY':_0x96bc80,'targetScaleX':_0x497276,'targetScaleY':_0x5b7b1a,'targetOpacity':_0x1cefc2,'targetBackOpacity':_0x4ebde6,'targetContentsOpacity':_0x5e352c};},Window_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x22c)]=function(_0x1d0f5c,_0x592f54,_0x2f4af0,_0x78cdb7,_0x428645){const _0xb48b53=_0x2fb0f3;this[_0xb48b53(0x40c)](),this[_0xb48b53(0x2b6)]['fontSize']=VisuMZ[_0xb48b53(0x248)][_0xb48b53(0x452)][_0xb48b53(0x1a6)]['GoldFontSize'];const _0x22a4b3=VisuMZ[_0xb48b53(0x248)]['Settings']['Gold'][_0xb48b53(0x438)];if(_0x22a4b3>0x0&&_0x592f54===TextManager['currencyUnit']){const _0x49a67c=_0x78cdb7+(this[_0xb48b53(0x199)]()-ImageManager[_0xb48b53(0x411)])/0x2;this[_0xb48b53(0x502)](_0x22a4b3,_0x2f4af0+(_0x428645-ImageManager[_0xb48b53(0x115)]),_0x49a67c),_0x428645-=ImageManager['iconWidth']+0x4;}else this[_0xb48b53(0x19f)](ColorManager[_0xb48b53(0xee)]()),this[_0xb48b53(0x544)](_0x592f54,_0x2f4af0,_0x78cdb7,_0x428645,'right'),_0x428645-=this[_0xb48b53(0x104)](_0x592f54)+0x6;this['resetTextColor']();const _0x42e731=this[_0xb48b53(0x104)](this[_0xb48b53(0x5a2)]?VisuMZ[_0xb48b53(0x31d)](_0x1d0f5c):_0x1d0f5c);_0x42e731>_0x428645?this[_0xb48b53(0x544)](VisuMZ['CoreEngine'][_0xb48b53(0x452)][_0xb48b53(0x1a6)][_0xb48b53(0x60c)],_0x2f4af0,_0x78cdb7,_0x428645,_0xb48b53(0x3d9)):this[_0xb48b53(0x544)](_0x1d0f5c,_0x2f4af0,_0x78cdb7,_0x428645,_0xb48b53(0x3d9)),this[_0xb48b53(0x40c)]();},Window_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x548)]=function(_0x208f26,_0x357a05,_0x29c05b,_0x4aa7c8,_0x313221){const _0x527275=_0x2fb0f3,_0x123718=ImageManager[_0x527275(0xe5)](_0x527275(0x529)),_0x340415=ImageManager[_0x527275(0x115)],_0x4d936b=ImageManager[_0x527275(0x411)],_0x39a34e=_0x208f26%0x10*_0x340415,_0x2a51fc=Math[_0x527275(0x15d)](_0x208f26/0x10)*_0x4d936b,_0x33245d=_0x4aa7c8,_0x32e2d9=_0x4aa7c8;this[_0x527275(0x2b6)]['_context'][_0x527275(0x409)]=_0x313221,this[_0x527275(0x2b6)][_0x527275(0x243)](_0x123718,_0x39a34e,_0x2a51fc,_0x340415,_0x4d936b,_0x357a05,_0x29c05b,_0x33245d,_0x32e2d9),this['contents'][_0x527275(0x640)]['imageSmoothingEnabled']=!![];},Window_Base[_0x2fb0f3(0x481)]['drawGauge']=function(_0x219316,_0x5ac5f0,_0x2e1700,_0x3b78f1,_0x22a6f4,_0x3f6516){const _0x239db6=_0x2fb0f3,_0x3c7ff6=Math['floor']((_0x2e1700-0x2)*_0x3b78f1),_0x4e7b8a=Sprite_Gauge['prototype'][_0x239db6(0x413)]['call'](this),_0x255e21=_0x5ac5f0+this[_0x239db6(0x199)]()-_0x4e7b8a-0x2;this[_0x239db6(0x2b6)][_0x239db6(0x388)](_0x219316,_0x255e21,_0x2e1700,_0x4e7b8a,ColorManager[_0x239db6(0x17a)]()),this[_0x239db6(0x2b6)][_0x239db6(0x278)](_0x219316+0x1,_0x255e21+0x1,_0x3c7ff6,_0x4e7b8a-0x2,_0x22a6f4,_0x3f6516);},Window_Selectable['prototype'][_0x2fb0f3(0x591)]=function(_0x473940){const _0x3667d4=_0x2fb0f3;let _0x53c845=this[_0x3667d4(0x396)]();const _0x4f74f3=this[_0x3667d4(0x2a1)](),_0x2c699e=this[_0x3667d4(0xc5)]();if(this[_0x3667d4(0x5c1)]()&&(_0x53c845<_0x4f74f3||_0x473940&&_0x2c699e===0x1)){_0x53c845+=_0x2c699e;if(_0x53c845>=_0x4f74f3)_0x53c845=_0x4f74f3-0x1;this['smoothSelect'](_0x53c845);}else!this['isUseModernControls']()&&((_0x53c845<_0x4f74f3-_0x2c699e||_0x473940&&_0x2c699e===0x1)&&this[_0x3667d4(0x3eb)]((_0x53c845+_0x2c699e)%_0x4f74f3));},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x5b0)]=Window_Selectable[_0x2fb0f3(0x481)]['cursorDown'],Window_Selectable[_0x2fb0f3(0x481)][_0x2fb0f3(0x591)]=function(_0x2a4c7d){const _0x14098c=_0x2fb0f3;this[_0x14098c(0x5c1)]()&&_0x2a4c7d&&this['maxCols']()===0x1&&this[_0x14098c(0x396)]()===this[_0x14098c(0x2a1)]()-0x1?this[_0x14098c(0x3eb)](0x0):VisuMZ[_0x14098c(0x248)]['Window_Selectable_cursorDown'][_0x14098c(0x29c)](this,_0x2a4c7d);},Window_Selectable[_0x2fb0f3(0x481)]['cursorUp']=function(_0x3752d6){const _0x48bad2=_0x2fb0f3;let _0x228223=Math[_0x48bad2(0x5e3)](0x0,this[_0x48bad2(0x396)]());const _0x384049=this[_0x48bad2(0x2a1)](),_0x3f08e1=this[_0x48bad2(0xc5)]();if(this['isUseModernControls']()&&_0x228223>0x0||_0x3752d6&&_0x3f08e1===0x1){_0x228223-=_0x3f08e1;if(_0x228223<=0x0)_0x228223=0x0;this[_0x48bad2(0x3eb)](_0x228223);}else!this[_0x48bad2(0x5c1)]()&&((_0x228223>=_0x3f08e1||_0x3752d6&&_0x3f08e1===0x1)&&this[_0x48bad2(0x3eb)]((_0x228223-_0x3f08e1+_0x384049)%_0x384049));},VisuMZ['CoreEngine'][_0x2fb0f3(0x2e0)]=Window_Selectable['prototype'][_0x2fb0f3(0x550)],Window_Selectable[_0x2fb0f3(0x481)][_0x2fb0f3(0x550)]=function(_0x573e3b){const _0x7617d6=_0x2fb0f3;this[_0x7617d6(0x5c1)]()&&_0x573e3b&&this[_0x7617d6(0xc5)]()===0x1&&this[_0x7617d6(0x396)]()===0x0?this[_0x7617d6(0x3eb)](this['maxItems']()-0x1):VisuMZ[_0x7617d6(0x248)][_0x7617d6(0x2e0)][_0x7617d6(0x29c)](this,_0x573e3b);},Window_Selectable[_0x2fb0f3(0x481)][_0x2fb0f3(0x5c1)]=function(){const _0x582dee=_0x2fb0f3;return VisuMZ[_0x582dee(0x248)][_0x582dee(0x452)][_0x582dee(0x20f)][_0x582dee(0x327)];},VisuMZ[_0x2fb0f3(0x248)]['Window_Selectable_processCursorMove']=Window_Selectable['prototype']['processCursorMove'],Window_Selectable[_0x2fb0f3(0x481)][_0x2fb0f3(0x4bf)]=function(){const _0x2f381d=_0x2fb0f3;this[_0x2f381d(0x5c1)]()?(this[_0x2f381d(0x4a4)](),this[_0x2f381d(0x65c)]()):VisuMZ['CoreEngine'][_0x2f381d(0x232)][_0x2f381d(0x29c)](this);},Window_Selectable['prototype']['allowShiftScrolling']=function(){return!![];},Window_Selectable['prototype'][_0x2fb0f3(0x4a4)]=function(){const _0x1ef82e=_0x2fb0f3;if(this[_0x1ef82e(0x14f)]()){const _0x5bb98a=this[_0x1ef82e(0x396)]();Input[_0x1ef82e(0x2a7)](_0x1ef82e(0x579))&&(Input[_0x1ef82e(0x34b)](_0x1ef82e(0x460))&&this['allowShiftScrolling']()?this['cursorPagedown']():this[_0x1ef82e(0x591)](Input[_0x1ef82e(0x376)](_0x1ef82e(0x579)))),Input['isRepeated']('up')&&(Input[_0x1ef82e(0x34b)](_0x1ef82e(0x460))&&this[_0x1ef82e(0x2da)]()?this[_0x1ef82e(0x501)]():this[_0x1ef82e(0x550)](Input[_0x1ef82e(0x376)]('up'))),Input['isRepeated']('right')&&this[_0x1ef82e(0x4f1)](Input[_0x1ef82e(0x376)](_0x1ef82e(0x3d9))),Input['isRepeated']('left')&&this['cursorLeft'](Input['isTriggered'](_0x1ef82e(0x549))),!this[_0x1ef82e(0x99)](_0x1ef82e(0x63a))&&Input[_0x1ef82e(0x2a7)](_0x1ef82e(0x63a))&&this[_0x1ef82e(0x4e1)](),!this[_0x1ef82e(0x99)](_0x1ef82e(0xc0))&&Input[_0x1ef82e(0x2a7)]('pageup')&&this[_0x1ef82e(0x501)](),this[_0x1ef82e(0x396)]()!==_0x5bb98a&&this['playCursorSound']();}},Window_Selectable[_0x2fb0f3(0x481)][_0x2fb0f3(0x65c)]=function(){const _0xaae232=_0x2fb0f3;if(this[_0xaae232(0x14f)]()){const _0x312f33=this['index']();Input['isTriggered'](_0xaae232(0x21e))&&this[_0xaae232(0x3eb)](Math[_0xaae232(0x347)](this[_0xaae232(0x396)](),0x0)),Input[_0xaae232(0x376)](_0xaae232(0x523))&&this[_0xaae232(0x3eb)](Math['max'](this[_0xaae232(0x396)](),this[_0xaae232(0x2a1)]()-0x1)),this[_0xaae232(0x396)]()!==_0x312f33&&this[_0xaae232(0x620)]();}},VisuMZ['CoreEngine']['Window_Selectable_processTouch']=Window_Selectable[_0x2fb0f3(0x481)]['processTouch'],Window_Selectable[_0x2fb0f3(0x481)]['processTouch']=function(){const _0x162096=_0x2fb0f3;this[_0x162096(0x5c1)]()?this[_0x162096(0x402)]():VisuMZ[_0x162096(0x248)][_0x162096(0x2d1)][_0x162096(0x29c)](this);},Window_Selectable['prototype']['processTouchModernControls']=function(){const _0x1fd40f=_0x2fb0f3;VisuMZ['CoreEngine'][_0x1fd40f(0x2d1)][_0x1fd40f(0x29c)](this);},Window_Selectable[_0x2fb0f3(0x481)][_0x2fb0f3(0x644)]=function(){const _0x581a03=_0x2fb0f3;return VisuMZ[_0x581a03(0x248)]['Settings'][_0x581a03(0x404)][_0x581a03(0x24c)];},Window_Selectable['prototype'][_0x2fb0f3(0x3e7)]=function(){const _0x10a4a1=_0x2fb0f3;return VisuMZ[_0x10a4a1(0x248)][_0x10a4a1(0x452)]['Window'][_0x10a4a1(0x25b)];},Window_Selectable[_0x2fb0f3(0x481)][_0x2fb0f3(0x27b)]=function(){const _0x135172=_0x2fb0f3;return Window_Scrollable['prototype'][_0x135172(0x27b)][_0x135172(0x29c)](this)+VisuMZ[_0x135172(0x248)]['Settings'][_0x135172(0x404)]['ItemHeight'];;},VisuMZ['CoreEngine'][_0x2fb0f3(0xfc)]=Window_Selectable['prototype'][_0x2fb0f3(0x48a)],Window_Selectable['prototype'][_0x2fb0f3(0x48a)]=function(_0x27e3f6){const _0x24ef7e=_0x2fb0f3,_0x17520e=VisuMZ['CoreEngine'][_0x24ef7e(0x452)]['Window'];if(_0x17520e[_0x24ef7e(0x189)]===![])return;_0x17520e[_0x24ef7e(0x4f8)]?_0x17520e[_0x24ef7e(0x4f8)][_0x24ef7e(0x29c)](this,_0x27e3f6):VisuMZ['CoreEngine'][_0x24ef7e(0xfc)]['call'](this,_0x27e3f6);},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0xb3)]=Window_Gold[_0x2fb0f3(0x481)][_0x2fb0f3(0xe1)],Window_Gold[_0x2fb0f3(0x481)]['refresh']=function(){const _0x1ae65e=_0x2fb0f3;this[_0x1ae65e(0x39d)]()?this[_0x1ae65e(0x3d4)]():VisuMZ[_0x1ae65e(0x248)][_0x1ae65e(0xb3)]['call'](this);},Window_Gold[_0x2fb0f3(0x481)]['isItemStyle']=function(){const _0x2c2ece=_0x2fb0f3;if(TextManager[_0x2c2ece(0x353)]!==this[_0x2c2ece(0x353)]())return![];return VisuMZ[_0x2c2ece(0x248)]['Settings']['Gold'][_0x2c2ece(0x5c3)];},Window_Gold['prototype']['drawGoldItemStyle']=function(){const _0x14d2b4=_0x2fb0f3;this['resetFontSettings'](),this['contents'][_0x14d2b4(0x11d)](),this[_0x14d2b4(0x2b6)][_0x14d2b4(0x528)]=VisuMZ[_0x14d2b4(0x248)][_0x14d2b4(0x452)][_0x14d2b4(0x1a6)]['GoldFontSize'];const _0x4551ee=VisuMZ[_0x14d2b4(0x248)]['Settings']['Gold'][_0x14d2b4(0x438)],_0x4395a8=this[_0x14d2b4(0x139)](0x0);if(_0x4551ee>0x0){const _0x42eea9=_0x4395a8['y']+(this[_0x14d2b4(0x199)]()-ImageManager['iconHeight'])/0x2;this['drawIcon'](_0x4551ee,_0x4395a8['x'],_0x42eea9);const _0x388ef5=ImageManager[_0x14d2b4(0x115)]+0x4;_0x4395a8['x']+=_0x388ef5,_0x4395a8[_0x14d2b4(0x3fb)]-=_0x388ef5;}this['changeTextColor'](ColorManager['systemColor']()),this['drawText'](this[_0x14d2b4(0x353)](),_0x4395a8['x'],_0x4395a8['y'],_0x4395a8['width'],'left');const _0x4f4546=this['textWidth'](this['currencyUnit']())+0x6;;_0x4395a8['x']+=_0x4f4546,_0x4395a8[_0x14d2b4(0x3fb)]-=_0x4f4546,this['resetTextColor']();const _0xea1525=this[_0x14d2b4(0x59a)](),_0x5e4502=this[_0x14d2b4(0x104)](this['_digitGrouping']?VisuMZ[_0x14d2b4(0x31d)](this['value']()):this[_0x14d2b4(0x59a)]());_0x5e4502>_0x4395a8[_0x14d2b4(0x3fb)]?this[_0x14d2b4(0x544)](VisuMZ['CoreEngine'][_0x14d2b4(0x452)][_0x14d2b4(0x1a6)][_0x14d2b4(0x60c)],_0x4395a8['x'],_0x4395a8['y'],_0x4395a8[_0x14d2b4(0x3fb)],'right'):this[_0x14d2b4(0x544)](this['value'](),_0x4395a8['x'],_0x4395a8['y'],_0x4395a8['width'],_0x14d2b4(0x3d9)),this[_0x14d2b4(0x40c)]();},Window_StatusBase['prototype'][_0x2fb0f3(0xd2)]=function(_0x46ad8f,_0x145c5f,_0x178406,_0x30b235,_0x1a1947){const _0x1a506b=_0x2fb0f3;_0x30b235=String(_0x30b235||'')['toUpperCase']();if(VisuMZ['CoreEngine'][_0x1a506b(0x452)]['Param'][_0x1a506b(0x5f5)]){const _0x3380dc=VisuMZ['GetParamIcon'](_0x30b235);_0x1a1947?(this['drawIconBySize'](_0x3380dc,_0x46ad8f,_0x145c5f,this[_0x1a506b(0x4da)]()),_0x178406-=this[_0x1a506b(0x4da)]()+0x2,_0x46ad8f+=this[_0x1a506b(0x4da)]()+0x2):(this[_0x1a506b(0x502)](_0x3380dc,_0x46ad8f+0x2,_0x145c5f+0x2),_0x178406-=ImageManager[_0x1a506b(0x115)]+0x4,_0x46ad8f+=ImageManager[_0x1a506b(0x115)]+0x4);}const _0x229496=TextManager[_0x1a506b(0x42a)](_0x30b235);this[_0x1a506b(0x40c)](),this[_0x1a506b(0x19f)](ColorManager[_0x1a506b(0xee)]()),_0x1a1947?(this[_0x1a506b(0x2b6)]['fontSize']=this[_0x1a506b(0x268)](),this[_0x1a506b(0x2b6)][_0x1a506b(0x544)](_0x229496,_0x46ad8f,_0x145c5f,_0x178406,this[_0x1a506b(0x4da)](),_0x1a506b(0x549))):this['drawText'](_0x229496,_0x46ad8f,_0x145c5f,_0x178406),this['resetFontSettings']();},Window_StatusBase[_0x2fb0f3(0x481)][_0x2fb0f3(0x268)]=function(){return $gameSystem['mainFontSize']()-0x8;},Window_StatusBase[_0x2fb0f3(0x481)][_0x2fb0f3(0x109)]=function(_0xa868ea,_0x209441,_0x13a29c,_0x2d2903){const _0x37cd52=_0x2fb0f3;_0x2d2903=_0x2d2903||0xa8,this[_0x37cd52(0x1a7)]();if(VisuMZ[_0x37cd52(0x248)]['Settings']['UI'][_0x37cd52(0x195)])this[_0x37cd52(0x20a)](_0xa868ea[_0x37cd52(0x3da)]()['name'],_0x209441,_0x13a29c,_0x2d2903);else{const _0x2c4e2c=_0xa868ea['currentClass']()['name']['replace'](/\\I\[(\d+)\]/gi,'');this[_0x37cd52(0x544)](_0x2c4e2c,_0x209441,_0x13a29c,_0x2d2903);}},Window_StatusBase['prototype'][_0x2fb0f3(0x32c)]=function(_0x1443e0,_0x382b36,_0x5aa600,_0x1b4ba0){const _0x3f5dbd=_0x2fb0f3;_0x1b4ba0=_0x1b4ba0||0x10e,this[_0x3f5dbd(0x1a7)]();if(VisuMZ[_0x3f5dbd(0x248)][_0x3f5dbd(0x452)]['UI'][_0x3f5dbd(0x337)])this[_0x3f5dbd(0x20a)](_0x1443e0['nickname'](),_0x382b36,_0x5aa600,_0x1b4ba0);else{const _0x437a7b=_0x1443e0[_0x3f5dbd(0x3cc)]()[_0x3f5dbd(0x4c0)](/\\I\[(\d+)\]/gi,'');this[_0x3f5dbd(0x544)](_0x1443e0['nickname'](),_0x382b36,_0x5aa600,_0x1b4ba0);}},VisuMZ['CoreEngine']['Window_StatusBase_drawActorLevel']=Window_StatusBase['prototype'][_0x2fb0f3(0x394)],Window_StatusBase[_0x2fb0f3(0x481)][_0x2fb0f3(0x394)]=function(_0x296d57,_0xfc833c,_0x589e8f){const _0x11ff0b=_0x2fb0f3;if(this[_0x11ff0b(0x512)]())this[_0x11ff0b(0xd7)](_0x296d57,_0xfc833c,_0x589e8f);VisuMZ['CoreEngine'][_0x11ff0b(0x2d9)][_0x11ff0b(0x29c)](this,_0x296d57,_0xfc833c,_0x589e8f);},Window_StatusBase[_0x2fb0f3(0x481)][_0x2fb0f3(0x512)]=function(){const _0x34dcba=_0x2fb0f3;return VisuMZ['CoreEngine'][_0x34dcba(0x452)]['UI'][_0x34dcba(0x228)];},Window_StatusBase[_0x2fb0f3(0x481)][_0x2fb0f3(0xd7)]=function(_0x17cf7c,_0x48520e,_0x425d8c){const _0x52706b=_0x2fb0f3;if(!_0x17cf7c)return;if(!_0x17cf7c[_0x52706b(0x263)]())return;const _0x45f7a9=0x80,_0x29ed32=_0x17cf7c[_0x52706b(0x58b)]();let _0x4b7891=ColorManager[_0x52706b(0x564)](),_0x33ecee=ColorManager[_0x52706b(0x4cd)]();_0x29ed32>=0x1&&(_0x4b7891=ColorManager['maxLvGaugeColor1'](),_0x33ecee=ColorManager[_0x52706b(0x1ce)]()),this['drawGauge'](_0x48520e,_0x425d8c,_0x45f7a9,_0x29ed32,_0x4b7891,_0x33ecee);},Window_EquipStatus[_0x2fb0f3(0x481)][_0x2fb0f3(0x2eb)]=function(){const _0x2c860d=_0x2fb0f3;let _0x45da9b=0x0;for(const _0x15e319 of VisuMZ['CoreEngine'][_0x2c860d(0x452)][_0x2c860d(0x491)][_0x2c860d(0x445)]){const _0x2ce72d=this[_0x2c860d(0x34d)](),_0x5b848b=this['paramY'](_0x45da9b);this['drawItem'](_0x2ce72d,_0x5b848b,_0x15e319),_0x45da9b++;}},Window_EquipStatus[_0x2fb0f3(0x481)][_0x2fb0f3(0x54f)]=function(_0x41d3b9,_0x294541,_0x32fb08){const _0x1cf8c9=_0x2fb0f3,_0x463c12=this[_0x1cf8c9(0x238)]()-this['itemPadding']()*0x2;this['drawParamText'](_0x41d3b9,_0x294541,_0x463c12,_0x32fb08,![]);},Window_EquipStatus['prototype'][_0x2fb0f3(0x112)]=function(_0x38048a,_0x52fd1c,_0x168f4a){const _0x31a179=_0x2fb0f3,_0x21b089=this[_0x31a179(0x656)]();this[_0x31a179(0x1a7)](),this['drawText'](this[_0x31a179(0xbe)][_0x31a179(0x49a)](_0x168f4a,!![]),_0x38048a,_0x52fd1c,_0x21b089,_0x31a179(0x3d9));},Window_EquipStatus[_0x2fb0f3(0x481)][_0x2fb0f3(0x55c)]=function(_0x3473bd,_0x3153df){const _0x190945=_0x2fb0f3,_0x4277f9=this['rightArrowWidth']();this[_0x190945(0x19f)](ColorManager['systemColor']());const _0x55bcdc=VisuMZ['CoreEngine'][_0x190945(0x452)]['UI']['ParamArrow'];this[_0x190945(0x544)](_0x55bcdc,_0x3473bd,_0x3153df,_0x4277f9,_0x190945(0x185));},Window_EquipStatus[_0x2fb0f3(0x481)]['drawNewParam']=function(_0x167379,_0x4c796a,_0x50c34c){const _0x1505e4=_0x2fb0f3,_0x1b742c=this[_0x1505e4(0x656)](),_0x2ef6d0=this['_tempActor'][_0x1505e4(0x49a)](_0x50c34c),_0x28fdda=_0x2ef6d0-this[_0x1505e4(0xbe)]['paramValueByName'](_0x50c34c);this[_0x1505e4(0x19f)](ColorManager[_0x1505e4(0x346)](_0x28fdda)),this[_0x1505e4(0x544)](VisuMZ[_0x1505e4(0x364)](_0x2ef6d0,0x0,_0x50c34c),_0x167379,_0x4c796a,_0x1b742c,_0x1505e4(0x3d9));},VisuMZ['CoreEngine'][_0x2fb0f3(0x1c9)]=Window_EquipItem[_0x2fb0f3(0x481)][_0x2fb0f3(0x2d2)],Window_EquipItem[_0x2fb0f3(0x481)][_0x2fb0f3(0x2d2)]=function(_0x58c759){const _0x321878=_0x2fb0f3;return _0x58c759&&this[_0x321878(0xbe)]?this['_actor'][_0x321878(0x1e2)](_0x58c759):VisuMZ[_0x321878(0x248)][_0x321878(0x1c9)]['call'](this,_0x58c759);},Window_StatusParams[_0x2fb0f3(0x481)]['maxItems']=function(){const _0x5c7732=_0x2fb0f3;return VisuMZ['CoreEngine']['Settings'][_0x5c7732(0x491)][_0x5c7732(0x445)][_0x5c7732(0x105)];},Window_StatusParams['prototype']['drawItem']=function(_0x3a4cb9){const _0x2bfb8d=_0x2fb0f3,_0xf04c3d=this['itemLineRect'](_0x3a4cb9),_0x42db3c=VisuMZ[_0x2bfb8d(0x248)]['Settings'][_0x2bfb8d(0x491)][_0x2bfb8d(0x445)][_0x3a4cb9],_0x4b3abc=TextManager[_0x2bfb8d(0x42a)](_0x42db3c),_0x36fc40=this[_0x2bfb8d(0xbe)]['paramValueByName'](_0x42db3c,!![]);this[_0x2bfb8d(0xd2)](_0xf04c3d['x'],_0xf04c3d['y'],0xa0,_0x42db3c,![]),this['resetTextColor'](),this[_0x2bfb8d(0x544)](_0x36fc40,_0xf04c3d['x']+0xa0,_0xf04c3d['y'],0x3c,_0x2bfb8d(0x3d9));};if(VisuMZ[_0x2fb0f3(0x248)]['Settings']['KeyboardInput'][_0x2fb0f3(0x170)]){VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x452)]['KeyboardInput']['QwertyLayout']&&(Window_NameInput[_0x2fb0f3(0x229)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x2fb0f3(0x1e9),'OK']);;VisuMZ['CoreEngine'][_0x2fb0f3(0x1f4)]=Window_NameInput[_0x2fb0f3(0x481)][_0x2fb0f3(0x15c)],Window_NameInput[_0x2fb0f3(0x481)][_0x2fb0f3(0x15c)]=function(_0x5afe4a){const _0x5434d5=_0x2fb0f3;this[_0x5434d5(0x23d)]=this['defaultInputMode'](),VisuMZ[_0x5434d5(0x248)]['Window_NameInput_initialize'][_0x5434d5(0x29c)](this,_0x5afe4a),this[_0x5434d5(0x23d)]==='default'?this[_0x5434d5(0x57c)](0x0):(Input[_0x5434d5(0x11d)](),this['deselect']());},Window_NameInput[_0x2fb0f3(0x481)][_0x2fb0f3(0x27d)]=function(){const _0x51a434=_0x2fb0f3;if(Input[_0x51a434(0x506)]())return _0x51a434(0x350);return VisuMZ[_0x51a434(0x248)][_0x51a434(0x452)]['KeyboardInput'][_0x51a434(0x3b6)]||_0x51a434(0x5e4);},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x356)]=Window_NameInput[_0x2fb0f3(0x481)][_0x2fb0f3(0x2d5)],Window_NameInput[_0x2fb0f3(0x481)][_0x2fb0f3(0x2d5)]=function(){const _0x3ac93c=_0x2fb0f3;if(!this[_0x3ac93c(0x194)]())return;if(!this[_0x3ac93c(0x26c)])return;if(this[_0x3ac93c(0x23d)]==='keyboard'&&Input['isGamepadTriggered']())this[_0x3ac93c(0xea)](_0x3ac93c(0x350));else{if(Input['isSpecialCode'](_0x3ac93c(0x64f)))Input[_0x3ac93c(0x11d)](),this['processBack']();else{if(Input['isTriggered'](_0x3ac93c(0x1c0)))Input[_0x3ac93c(0x11d)](),this[_0x3ac93c(0x23d)]===_0x3ac93c(0x5e4)?this[_0x3ac93c(0xea)](_0x3ac93c(0x350)):this[_0x3ac93c(0xea)](_0x3ac93c(0x5e4));else{if(this[_0x3ac93c(0x23d)]==='keyboard')this['processKeyboardHandling']();else Input['isSpecialCode']('escape')?(Input['clear'](),this[_0x3ac93c(0xea)](_0x3ac93c(0x5e4))):VisuMZ[_0x3ac93c(0x248)][_0x3ac93c(0x356)]['call'](this);}}}},VisuMZ[_0x2fb0f3(0x248)]['Window_NameInput_processTouch']=Window_NameInput[_0x2fb0f3(0x481)][_0x2fb0f3(0x28a)],Window_NameInput['prototype'][_0x2fb0f3(0x28a)]=function(){const _0x15d111=_0x2fb0f3;if(!this['isOpenAndActive']())return;if(this[_0x15d111(0x23d)]===_0x15d111(0x5e4)){if(TouchInput[_0x15d111(0x376)]()&&this[_0x15d111(0x4d9)]())this[_0x15d111(0xea)](_0x15d111(0x350));else TouchInput[_0x15d111(0x5f2)]()&&this[_0x15d111(0xea)]('default');}else VisuMZ['CoreEngine'][_0x15d111(0xdb)][_0x15d111(0x29c)](this);},Window_NameInput[_0x2fb0f3(0x481)]['processKeyboardHandling']=function(){const _0x417ee8=_0x2fb0f3;if(Input['isSpecialCode'](_0x417ee8(0x16a)))Input[_0x417ee8(0x11d)](),this[_0x417ee8(0x324)]();else{if(Input['_inputString']!==undefined){let _0x389a05=Input[_0x417ee8(0x182)],_0x29f794=_0x389a05[_0x417ee8(0x105)];for(let _0x7d6e4=0x0;_0x7d6e4<_0x29f794;++_0x7d6e4){this['_editWindow']['add'](_0x389a05[_0x7d6e4])?SoundManager[_0x417ee8(0x384)]():SoundManager[_0x417ee8(0x169)]();}Input[_0x417ee8(0x11d)]();}}},Window_NameInput[_0x2fb0f3(0x481)][_0x2fb0f3(0xea)]=function(_0x236408){const _0x1e052b=_0x2fb0f3;let _0x424e3a=this[_0x1e052b(0x23d)];this[_0x1e052b(0x23d)]=_0x236408,_0x424e3a!==this[_0x1e052b(0x23d)]&&(this['refresh'](),SoundManager[_0x1e052b(0x384)](),this['_mode']===_0x1e052b(0x350)?this[_0x1e052b(0x57c)](0x0):this[_0x1e052b(0x57c)](-0x1));},VisuMZ['CoreEngine'][_0x2fb0f3(0x3f2)]=Window_NameInput[_0x2fb0f3(0x481)][_0x2fb0f3(0x591)],Window_NameInput[_0x2fb0f3(0x481)][_0x2fb0f3(0x591)]=function(_0xd14e3a){const _0x52ea05=_0x2fb0f3;if(this[_0x52ea05(0x23d)]===_0x52ea05(0x5e4)&&!Input['isArrowPressed']())return;if(Input[_0x52ea05(0x1d6)]())return;VisuMZ[_0x52ea05(0x248)][_0x52ea05(0x3f2)][_0x52ea05(0x29c)](this,_0xd14e3a),this[_0x52ea05(0xea)](_0x52ea05(0x350));},VisuMZ['CoreEngine'][_0x2fb0f3(0x2bd)]=Window_NameInput[_0x2fb0f3(0x481)][_0x2fb0f3(0x550)],Window_NameInput[_0x2fb0f3(0x481)][_0x2fb0f3(0x550)]=function(_0x1da8ea){const _0x17895e=_0x2fb0f3;if(this[_0x17895e(0x23d)]===_0x17895e(0x5e4)&&!Input[_0x17895e(0x3e2)]())return;if(Input[_0x17895e(0x1d6)]())return;VisuMZ[_0x17895e(0x248)][_0x17895e(0x2bd)][_0x17895e(0x29c)](this,_0x1da8ea),this[_0x17895e(0xea)]('default');},VisuMZ['CoreEngine'][_0x2fb0f3(0x5fe)]=Window_NameInput['prototype'][_0x2fb0f3(0x4f1)],Window_NameInput[_0x2fb0f3(0x481)]['cursorRight']=function(_0x503404){const _0x18efc4=_0x2fb0f3;if(this['_mode']===_0x18efc4(0x5e4)&&!Input[_0x18efc4(0x3e2)]())return;if(Input[_0x18efc4(0x1d6)]())return;VisuMZ[_0x18efc4(0x248)][_0x18efc4(0x5fe)]['call'](this,_0x503404),this[_0x18efc4(0xea)](_0x18efc4(0x350));},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x5e9)]=Window_NameInput[_0x2fb0f3(0x481)][_0x2fb0f3(0x219)],Window_NameInput[_0x2fb0f3(0x481)][_0x2fb0f3(0x219)]=function(_0x381437){const _0x2fc52b=_0x2fb0f3;if(this['_mode']===_0x2fc52b(0x5e4)&&!Input['isArrowPressed']())return;if(Input[_0x2fc52b(0x1d6)]())return;VisuMZ[_0x2fc52b(0x248)][_0x2fc52b(0x5e9)][_0x2fc52b(0x29c)](this,_0x381437),this['switchModes']('default');},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x272)]=Window_NameInput[_0x2fb0f3(0x481)][_0x2fb0f3(0x4e1)],Window_NameInput['prototype'][_0x2fb0f3(0x4e1)]=function(){const _0x2a30e2=_0x2fb0f3;if(this[_0x2a30e2(0x23d)]===_0x2a30e2(0x5e4))return;if(Input[_0x2a30e2(0x1d6)]())return;VisuMZ[_0x2a30e2(0x248)][_0x2a30e2(0x272)]['call'](this),this['switchModes'](_0x2a30e2(0x350));},VisuMZ['CoreEngine'][_0x2fb0f3(0x642)]=Window_NameInput[_0x2fb0f3(0x481)][_0x2fb0f3(0x501)],Window_NameInput[_0x2fb0f3(0x481)][_0x2fb0f3(0x501)]=function(){const _0x3a98fe=_0x2fb0f3;if(this[_0x3a98fe(0x23d)]===_0x3a98fe(0x5e4))return;if(Input[_0x3a98fe(0x1d6)]())return;VisuMZ[_0x3a98fe(0x248)][_0x3a98fe(0x642)][_0x3a98fe(0x29c)](this),this[_0x3a98fe(0xea)](_0x3a98fe(0x350));},VisuMZ[_0x2fb0f3(0x248)]['Window_NameInput_refresh']=Window_NameInput[_0x2fb0f3(0x481)]['refresh'],Window_NameInput[_0x2fb0f3(0x481)]['refresh']=function(){const _0x4ccc0f=_0x2fb0f3;if(this[_0x4ccc0f(0x23d)]===_0x4ccc0f(0x5e4)){this[_0x4ccc0f(0x2b6)][_0x4ccc0f(0x11d)](),this['contentsBack'][_0x4ccc0f(0x11d)](),this[_0x4ccc0f(0x1a7)]();let _0xd29c9b=VisuMZ[_0x4ccc0f(0x248)]['Settings'][_0x4ccc0f(0x652)][_0x4ccc0f(0x4c4)][_0x4ccc0f(0x440)]('\x0a'),_0x39682f=_0xd29c9b['length'],_0x1cc1c6=(this[_0x4ccc0f(0x54e)]-_0x39682f*this[_0x4ccc0f(0x199)]())/0x2;for(let _0x39729d=0x0;_0x39729d<_0x39682f;++_0x39729d){let _0x3220b0=_0xd29c9b[_0x39729d],_0x12f33d=this[_0x4ccc0f(0x23a)](_0x3220b0)['width'],_0x3c76a7=Math[_0x4ccc0f(0x15d)]((this[_0x4ccc0f(0x2b6)][_0x4ccc0f(0x3fb)]-_0x12f33d)/0x2);this['drawTextEx'](_0x3220b0,_0x3c76a7,_0x1cc1c6),_0x1cc1c6+=this[_0x4ccc0f(0x199)]();}}else VisuMZ[_0x4ccc0f(0x248)][_0x4ccc0f(0x3c8)][_0x4ccc0f(0x29c)](this);};};VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x297)]=Window_ShopSell['prototype'][_0x2fb0f3(0x2d2)],Window_ShopSell[_0x2fb0f3(0x481)][_0x2fb0f3(0x2d2)]=function(_0x184db1){const _0x4e3b45=_0x2fb0f3;return VisuMZ[_0x4e3b45(0x248)][_0x4e3b45(0x452)][_0x4e3b45(0x20f)][_0x4e3b45(0x4be)]&&DataManager['isKeyItem'](_0x184db1)?![]:VisuMZ['CoreEngine'][_0x4e3b45(0x297)]['call'](this,_0x184db1);},Window_NumberInput[_0x2fb0f3(0x481)][_0x2fb0f3(0x5c1)]=function(){return![];};VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x452)]['KeyboardInput']['EnableNumberInput']&&(VisuMZ[_0x2fb0f3(0x248)]['Window_NumberInput_start']=Window_NumberInput[_0x2fb0f3(0x481)][_0x2fb0f3(0x28d)],Window_NumberInput[_0x2fb0f3(0x481)]['start']=function(){const _0x5471be=_0x2fb0f3;VisuMZ[_0x5471be(0x248)][_0x5471be(0x585)][_0x5471be(0x29c)](this),this['select'](this[_0x5471be(0x503)]-0x1);},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x39f)]=Window_NumberInput[_0x2fb0f3(0x481)]['processDigitChange'],Window_NumberInput[_0x2fb0f3(0x481)][_0x2fb0f3(0x63e)]=function(){const _0x46f6df=_0x2fb0f3;if(!this[_0x46f6df(0x307)]())return;if(Input[_0x46f6df(0x1d6)]())this[_0x46f6df(0x470)]();else{if(Input['isSpecialCode'](_0x46f6df(0x64f)))this['processKeyboardBackspace']();else{if(Input[_0x46f6df(0x1a2)]===0x2e)this[_0x46f6df(0x361)]();else{if(Input[_0x46f6df(0x1a2)]===0x24)this[_0x46f6df(0x17b)]();else Input[_0x46f6df(0x1a2)]===0x23?this['processKeyboardEnd']():(VisuMZ['CoreEngine'][_0x46f6df(0x39f)][_0x46f6df(0x29c)](this),Input[_0x46f6df(0x11d)]());}}}},Window_NumberInput['prototype']['processCursorMove']=function(){const _0x35f5dc=_0x2fb0f3;if(!this[_0x35f5dc(0x14f)]())return;Input['isNumpadPressed']()?this[_0x35f5dc(0x470)]():Window_Selectable[_0x35f5dc(0x481)]['processCursorMove'][_0x35f5dc(0x29c)](this);},Window_NumberInput[_0x2fb0f3(0x481)][_0x2fb0f3(0x65c)]=function(){},Window_NumberInput[_0x2fb0f3(0x481)]['processKeyboardDigitChange']=function(){const _0x47b05c=_0x2fb0f3;if(String(this[_0x47b05c(0x538)])[_0x47b05c(0x105)]>=this[_0x47b05c(0x503)])return;this[_0x47b05c(0x538)]=Number(String(this[_0x47b05c(0x538)])+Input[_0x47b05c(0x182)]);const _0x17129a='9'['repeat'](this[_0x47b05c(0x503)]);this['_number']=this[_0x47b05c(0x538)]['clamp'](0x0,_0x17129a),Input['clear'](),this[_0x47b05c(0xe1)](),SoundManager[_0x47b05c(0x247)](),this[_0x47b05c(0x57c)](this[_0x47b05c(0x503)]-0x1);},Window_NumberInput[_0x2fb0f3(0x481)][_0x2fb0f3(0x1a1)]=function(){const _0x533aea=_0x2fb0f3;this[_0x533aea(0x538)]=Number(String(this[_0x533aea(0x538)])[_0x533aea(0x3e4)](0x0,-0x1)),this[_0x533aea(0x538)]=Math[_0x533aea(0x5e3)](0x0,this[_0x533aea(0x538)]),Input[_0x533aea(0x11d)](),this[_0x533aea(0xe1)](),SoundManager[_0x533aea(0x247)](),this[_0x533aea(0x57c)](this[_0x533aea(0x503)]-0x1);},Window_NumberInput[_0x2fb0f3(0x481)][_0x2fb0f3(0x361)]=function(){const _0xbdbf1a=_0x2fb0f3;this[_0xbdbf1a(0x538)]=Number(String(this['_number'])[_0xbdbf1a(0x618)](0x1)),this[_0xbdbf1a(0x538)]=Math[_0xbdbf1a(0x5e3)](0x0,this['_number']),Input[_0xbdbf1a(0x11d)](),this[_0xbdbf1a(0xe1)](),SoundManager[_0xbdbf1a(0x247)](),this['select'](this[_0xbdbf1a(0x503)]-0x1);});;Window_TitleCommand[_0x2fb0f3(0x4f0)]=VisuMZ['CoreEngine']['Settings'][_0x2fb0f3(0x556)],Window_TitleCommand[_0x2fb0f3(0x481)]['makeCommandList']=function(){this['makeCoreEngineCommandList']();},Window_TitleCommand[_0x2fb0f3(0x481)]['makeCoreEngineCommandList']=function(){const _0xd98cf8=_0x2fb0f3;for(const _0x508793 of Window_TitleCommand[_0xd98cf8(0x4f0)]){if(_0x508793[_0xd98cf8(0x154)]['call'](this)){const _0x37842d=_0x508793[_0xd98cf8(0x180)];let _0x44202f=_0x508793[_0xd98cf8(0x10b)];if(['',_0xd98cf8(0x1b6)][_0xd98cf8(0x401)](_0x44202f))_0x44202f=_0x508793[_0xd98cf8(0x19e)][_0xd98cf8(0x29c)](this);const _0x27b02e=_0x508793['EnableJS']['call'](this),_0x466e29=_0x508793[_0xd98cf8(0xf8)][_0xd98cf8(0x29c)](this);this['addCommand'](_0x44202f,_0x37842d,_0x27b02e,_0x466e29),this[_0xd98cf8(0x150)](_0x37842d,_0x508793['CallHandlerJS'][_0xd98cf8(0x3ef)](this,_0x466e29));}}},Window_GameEnd[_0x2fb0f3(0x4f0)]=VisuMZ[_0x2fb0f3(0x248)]['Settings'][_0x2fb0f3(0x10a)]['GameEnd'][_0x2fb0f3(0x423)],Window_GameEnd[_0x2fb0f3(0x481)][_0x2fb0f3(0x4b3)]=function(){const _0x2c91ff=_0x2fb0f3;this[_0x2c91ff(0x4cb)]();},Window_GameEnd['prototype'][_0x2fb0f3(0x4cb)]=function(){const _0x283df0=_0x2fb0f3;for(const _0x4ac302 of Window_GameEnd['_commandList']){if(_0x4ac302[_0x283df0(0x154)]['call'](this)){const _0x46918d=_0x4ac302[_0x283df0(0x180)];let _0x363252=_0x4ac302['TextStr'];if(['','Untitled'][_0x283df0(0x401)](_0x363252))_0x363252=_0x4ac302['TextJS'][_0x283df0(0x29c)](this);const _0x2cbdf7=_0x4ac302[_0x283df0(0x543)]['call'](this),_0x264464=_0x4ac302['ExtJS'][_0x283df0(0x29c)](this);this[_0x283df0(0x1ff)](_0x363252,_0x46918d,_0x2cbdf7,_0x264464),this[_0x283df0(0x150)](_0x46918d,_0x4ac302[_0x283df0(0x611)][_0x283df0(0x3ef)](this,_0x264464));}}};function Window_ButtonAssist(){const _0x351c90=_0x2fb0f3;this[_0x351c90(0x15c)](...arguments);}Window_ButtonAssist[_0x2fb0f3(0x481)]=Object[_0x2fb0f3(0xa6)](Window_Base[_0x2fb0f3(0x481)]),Window_ButtonAssist['prototype'][_0x2fb0f3(0x52a)]=Window_ButtonAssist,Window_ButtonAssist[_0x2fb0f3(0x481)][_0x2fb0f3(0x15c)]=function(_0x27cba4){const _0x2a295f=_0x2fb0f3;this[_0x2a295f(0x5ac)]={},Window_Base[_0x2a295f(0x481)][_0x2a295f(0x15c)][_0x2a295f(0x29c)](this,_0x27cba4),this['setBackgroundType'](VisuMZ[_0x2a295f(0x248)][_0x2a295f(0x452)][_0x2a295f(0x318)][_0x2a295f(0x4e2)]||0x0),this[_0x2a295f(0xe1)]();},Window_ButtonAssist[_0x2fb0f3(0x481)][_0x2fb0f3(0x2ea)]=function(){const _0x9132e7=_0x2fb0f3;this[_0x9132e7(0x2b6)]['fontSize']<=0x60&&(this[_0x9132e7(0x2b6)]['fontSize']+=0x6);},Window_ButtonAssist[_0x2fb0f3(0x481)][_0x2fb0f3(0x5ca)]=function(){const _0x192110=_0x2fb0f3;this[_0x192110(0x2b6)][_0x192110(0x528)]>=0x18&&(this['contents'][_0x192110(0x528)]-=0x6);},Window_ButtonAssist[_0x2fb0f3(0x481)][_0x2fb0f3(0x231)]=function(){const _0x4186ab=_0x2fb0f3;Window_Base[_0x4186ab(0x481)][_0x4186ab(0x231)][_0x4186ab(0x29c)](this),this[_0x4186ab(0x351)]();},Window_ButtonAssist[_0x2fb0f3(0x481)][_0x2fb0f3(0x1ee)]=function(){const _0x31f730=_0x2fb0f3;this[_0x31f730(0x62b)]=SceneManager[_0x31f730(0x11b)]['getButtonAssistLocation']()!==_0x31f730(0x65a)?0x0:0x8;},Window_ButtonAssist[_0x2fb0f3(0x481)][_0x2fb0f3(0x351)]=function(){const _0x5d779b=_0x2fb0f3,_0x5d868d=SceneManager[_0x5d779b(0x11b)];for(let _0x196c98=0x1;_0x196c98<=0x5;_0x196c98++){if(this[_0x5d779b(0x5ac)][_0x5d779b(0x61c)[_0x5d779b(0x459)](_0x196c98)]!==_0x5d868d[_0x5d779b(0x4ab)[_0x5d779b(0x459)](_0x196c98)]())return this[_0x5d779b(0xe1)]();if(this[_0x5d779b(0x5ac)][_0x5d779b(0x32f)[_0x5d779b(0x459)](_0x196c98)]!==_0x5d868d[_0x5d779b(0xde)[_0x5d779b(0x459)](_0x196c98)]())return this[_0x5d779b(0xe1)]();}},Window_ButtonAssist[_0x2fb0f3(0x481)][_0x2fb0f3(0xe1)]=function(){const _0x1af192=_0x2fb0f3;this[_0x1af192(0x2b6)]['clear']();for(let _0x18711d=0x1;_0x18711d<=0x5;_0x18711d++){this['drawSegment'](_0x18711d);}},Window_ButtonAssist[_0x2fb0f3(0x481)][_0x2fb0f3(0x53c)]=function(_0x21073f){const _0x153e7c=_0x2fb0f3,_0x86db7a=this[_0x153e7c(0x251)]/0x5,_0x50b8ad=SceneManager['_scene'],_0x27a114=_0x50b8ad['buttonAssistKey%1'['format'](_0x21073f)](),_0x18f4a2=_0x50b8ad[_0x153e7c(0xde)[_0x153e7c(0x459)](_0x21073f)]();this[_0x153e7c(0x5ac)]['key%1'[_0x153e7c(0x459)](_0x21073f)]=_0x27a114,this[_0x153e7c(0x5ac)][_0x153e7c(0x32f)[_0x153e7c(0x459)](_0x21073f)]=_0x18f4a2;if(_0x27a114==='')return;if(_0x18f4a2==='')return;const _0x273fca=_0x50b8ad[_0x153e7c(0x2ed)[_0x153e7c(0x459)](_0x21073f)](),_0x475152=this['itemPadding'](),_0x318562=_0x86db7a*(_0x21073f-0x1)+_0x475152+_0x273fca,_0x27fe0b=VisuMZ['CoreEngine'][_0x153e7c(0x452)][_0x153e7c(0x318)][_0x153e7c(0x2e8)];this[_0x153e7c(0x20a)](_0x27fe0b[_0x153e7c(0x459)](_0x27a114,_0x18f4a2),_0x318562,0x0,_0x86db7a-_0x475152*0x2);},VisuMZ['ShowDevTools']=function(_0x31959a){const _0x18326f=_0x2fb0f3;if(Utils['isOptionValid']('test')){var _0xc57cee=require(_0x18326f(0x34a))[_0x18326f(0x404)][_0x18326f(0x592)]();SceneManager[_0x18326f(0xd3)]();if(_0x31959a)setTimeout(_0xc57cee[_0x18326f(0x277)][_0x18326f(0x3ef)](_0xc57cee),0x190);}},VisuMZ[_0x2fb0f3(0x13e)]=function(_0x133770,_0x1c6d0d){const _0x23af67=_0x2fb0f3;_0x1c6d0d=_0x1c6d0d[_0x23af67(0x65e)]();var _0x58d4db=1.70158,_0x3495f1=0.7;switch(_0x1c6d0d){case _0x23af67(0x1c3):return _0x133770;case _0x23af67(0x269):return-0x1*Math['cos'](_0x133770*(Math['PI']/0x2))+0x1;case'OUTSINE':return Math['sin'](_0x133770*(Math['PI']/0x2));case'INOUTSINE':return-0.5*(Math[_0x23af67(0x1ab)](Math['PI']*_0x133770)-0x1);case'INQUAD':return _0x133770*_0x133770;case _0x23af67(0x4d2):return _0x133770*(0x2-_0x133770);case'INOUTQUAD':return _0x133770<0.5?0x2*_0x133770*_0x133770:-0x1+(0x4-0x2*_0x133770)*_0x133770;case _0x23af67(0x3c2):return _0x133770*_0x133770*_0x133770;case _0x23af67(0x1f8):var _0x5b6a19=_0x133770-0x1;return _0x5b6a19*_0x5b6a19*_0x5b6a19+0x1;case _0x23af67(0x54a):return _0x133770<0.5?0x4*_0x133770*_0x133770*_0x133770:(_0x133770-0x1)*(0x2*_0x133770-0x2)*(0x2*_0x133770-0x2)+0x1;case _0x23af67(0x1b4):return _0x133770*_0x133770*_0x133770*_0x133770;case _0x23af67(0x1de):var _0x5b6a19=_0x133770-0x1;return 0x1-_0x5b6a19*_0x5b6a19*_0x5b6a19*_0x5b6a19;case'INOUTQUART':var _0x5b6a19=_0x133770-0x1;return _0x133770<0.5?0x8*_0x133770*_0x133770*_0x133770*_0x133770:0x1-0x8*_0x5b6a19*_0x5b6a19*_0x5b6a19*_0x5b6a19;case'INQUINT':return _0x133770*_0x133770*_0x133770*_0x133770*_0x133770;case'OUTQUINT':var _0x5b6a19=_0x133770-0x1;return 0x1+_0x5b6a19*_0x5b6a19*_0x5b6a19*_0x5b6a19*_0x5b6a19;case'INOUTQUINT':var _0x5b6a19=_0x133770-0x1;return _0x133770<0.5?0x10*_0x133770*_0x133770*_0x133770*_0x133770*_0x133770:0x1+0x10*_0x5b6a19*_0x5b6a19*_0x5b6a19*_0x5b6a19*_0x5b6a19;case _0x23af67(0x212):if(_0x133770===0x0)return 0x0;return Math['pow'](0x2,0xa*(_0x133770-0x1));case'OUTEXPO':if(_0x133770===0x1)return 0x1;return-Math[_0x23af67(0x314)](0x2,-0xa*_0x133770)+0x1;case _0x23af67(0x10e):if(_0x133770===0x0||_0x133770===0x1)return _0x133770;var _0x2eb932=_0x133770*0x2,_0x449b5e=_0x2eb932-0x1;if(_0x2eb932<0x1)return 0.5*Math['pow'](0x2,0xa*_0x449b5e);return 0.5*(-Math['pow'](0x2,-0xa*_0x449b5e)+0x2);case _0x23af67(0x301):var _0x2eb932=_0x133770/0x1;return-0x1*(Math[_0x23af67(0x308)](0x1-_0x2eb932*_0x133770)-0x1);case _0x23af67(0x5df):var _0x5b6a19=_0x133770-0x1;return Math['sqrt'](0x1-_0x5b6a19*_0x5b6a19);case _0x23af67(0x33a):var _0x2eb932=_0x133770*0x2,_0x449b5e=_0x2eb932-0x2;if(_0x2eb932<0x1)return-0.5*(Math[_0x23af67(0x308)](0x1-_0x2eb932*_0x2eb932)-0x1);return 0.5*(Math[_0x23af67(0x308)](0x1-_0x449b5e*_0x449b5e)+0x1);case _0x23af67(0x450):return _0x133770*_0x133770*((_0x58d4db+0x1)*_0x133770-_0x58d4db);case _0x23af67(0x2b2):var _0x2eb932=_0x133770/0x1-0x1;return _0x2eb932*_0x2eb932*((_0x58d4db+0x1)*_0x2eb932+_0x58d4db)+0x1;break;case'INOUTBACK':var _0x2eb932=_0x133770*0x2,_0x5e968a=_0x2eb932-0x2,_0x2437a9=_0x58d4db*1.525;if(_0x2eb932<0x1)return 0.5*_0x2eb932*_0x2eb932*((_0x2437a9+0x1)*_0x2eb932-_0x2437a9);return 0.5*(_0x5e968a*_0x5e968a*((_0x2437a9+0x1)*_0x5e968a+_0x2437a9)+0x2);case'INELASTIC':if(_0x133770===0x0||_0x133770===0x1)return _0x133770;var _0x2eb932=_0x133770/0x1,_0x449b5e=_0x2eb932-0x1,_0x55ccc8=0x1-_0x3495f1,_0x2437a9=_0x55ccc8/(0x2*Math['PI'])*Math[_0x23af67(0x32a)](0x1);return-(Math['pow'](0x2,0xa*_0x449b5e)*Math[_0x23af67(0x458)]((_0x449b5e-_0x2437a9)*(0x2*Math['PI'])/_0x55ccc8));case _0x23af67(0x5c4):var _0x55ccc8=0x1-_0x3495f1,_0x2eb932=_0x133770*0x2;if(_0x133770===0x0||_0x133770===0x1)return _0x133770;var _0x2437a9=_0x55ccc8/(0x2*Math['PI'])*Math[_0x23af67(0x32a)](0x1);return Math['pow'](0x2,-0xa*_0x2eb932)*Math['sin']((_0x2eb932-_0x2437a9)*(0x2*Math['PI'])/_0x55ccc8)+0x1;case _0x23af67(0x3a3):var _0x55ccc8=0x1-_0x3495f1;if(_0x133770===0x0||_0x133770===0x1)return _0x133770;var _0x2eb932=_0x133770*0x2,_0x449b5e=_0x2eb932-0x1,_0x2437a9=_0x55ccc8/(0x2*Math['PI'])*Math['asin'](0x1);if(_0x2eb932<0x1)return-0.5*(Math[_0x23af67(0x314)](0x2,0xa*_0x449b5e)*Math[_0x23af67(0x458)]((_0x449b5e-_0x2437a9)*(0x2*Math['PI'])/_0x55ccc8));return Math[_0x23af67(0x314)](0x2,-0xa*_0x449b5e)*Math[_0x23af67(0x458)]((_0x449b5e-_0x2437a9)*(0x2*Math['PI'])/_0x55ccc8)*0.5+0x1;case _0x23af67(0x575):var _0x2eb932=_0x133770/0x1;if(_0x2eb932<0x1/2.75)return 7.5625*_0x2eb932*_0x2eb932;else{if(_0x2eb932<0x2/2.75){var _0x5e968a=_0x2eb932-1.5/2.75;return 7.5625*_0x5e968a*_0x5e968a+0.75;}else{if(_0x2eb932<2.5/2.75){var _0x5e968a=_0x2eb932-2.25/2.75;return 7.5625*_0x5e968a*_0x5e968a+0.9375;}else{var _0x5e968a=_0x2eb932-2.625/2.75;return 7.5625*_0x5e968a*_0x5e968a+0.984375;}}}case _0x23af67(0x2cd):var _0x49e5ae=0x1-VisuMZ['ApplyEasing'](0x1-_0x133770,_0x23af67(0x546));return _0x49e5ae;case'INOUTBOUNCE':if(_0x133770<0.5)var _0x49e5ae=VisuMZ['ApplyEasing'](_0x133770*0x2,_0x23af67(0x1d5))*0.5;else var _0x49e5ae=VisuMZ[_0x23af67(0x13e)](_0x133770*0x2-0x1,_0x23af67(0x546))*0.5+0.5;return _0x49e5ae;default:return _0x133770;}},VisuMZ[_0x2fb0f3(0x633)]=function(_0x2d1f54){const _0x582f15=_0x2fb0f3;_0x2d1f54=String(_0x2d1f54)[_0x582f15(0x65e)]();const _0x565543=VisuMZ['CoreEngine'][_0x582f15(0x452)]['Param'];if(_0x2d1f54==='MAXHP')return _0x565543[_0x582f15(0xe4)];if(_0x2d1f54===_0x582f15(0x3bf))return _0x565543[_0x582f15(0x2aa)];if(_0x2d1f54===_0x582f15(0x10f))return _0x565543[_0x582f15(0x48c)];if(_0x2d1f54===_0x582f15(0x420))return _0x565543['IconParam3'];if(_0x2d1f54===_0x582f15(0x146))return _0x565543[_0x582f15(0x58c)];if(_0x2d1f54==='MDF')return _0x565543['IconParam5'];if(_0x2d1f54===_0x582f15(0x476))return _0x565543['IconParam6'];if(_0x2d1f54===_0x582f15(0x605))return _0x565543[_0x582f15(0x577)];if(_0x2d1f54==='HIT')return _0x565543[_0x582f15(0x3f7)];if(_0x2d1f54==='EVA')return _0x565543[_0x582f15(0x57f)];if(_0x2d1f54==='CRI')return _0x565543['IconXParam2'];if(_0x2d1f54===_0x582f15(0x635))return _0x565543[_0x582f15(0x405)];if(_0x2d1f54===_0x582f15(0x583))return _0x565543[_0x582f15(0x4e7)];if(_0x2d1f54===_0x582f15(0x551))return _0x565543[_0x582f15(0x276)];if(_0x2d1f54===_0x582f15(0x5d1))return _0x565543['IconXParam6'];if(_0x2d1f54==='HRG')return _0x565543[_0x582f15(0x5e7)];if(_0x2d1f54===_0x582f15(0x2b9))return _0x565543[_0x582f15(0xe7)];if(_0x2d1f54===_0x582f15(0x63c))return _0x565543['IconXParam9'];if(_0x2d1f54==='TGR')return _0x565543['IconSParam0'];if(_0x2d1f54===_0x582f15(0x35d))return _0x565543[_0x582f15(0x4a9)];if(_0x2d1f54===_0x582f15(0x1f5))return _0x565543[_0x582f15(0x128)];if(_0x2d1f54===_0x582f15(0x130))return _0x565543[_0x582f15(0x5bf)];if(_0x2d1f54===_0x582f15(0x57a))return _0x565543[_0x582f15(0x355)];if(_0x2d1f54===_0x582f15(0xf1))return _0x565543[_0x582f15(0x371)];if(_0x2d1f54===_0x582f15(0x19b))return _0x565543[_0x582f15(0x613)];if(_0x2d1f54===_0x582f15(0x332))return _0x565543['IconSParam7'];if(_0x2d1f54==='FDR')return _0x565543[_0x582f15(0x1a4)];if(_0x2d1f54==='EXR')return _0x565543['IconSParam9'];if(VisuMZ['CoreEngine'][_0x582f15(0x484)][_0x2d1f54])return VisuMZ[_0x582f15(0x248)][_0x582f15(0x484)][_0x2d1f54]||0x0;return 0x0;},VisuMZ[_0x2fb0f3(0x364)]=function(_0x280d69,_0x4cfd2c,_0x24ff00){const _0x13c90e=_0x2fb0f3;if(_0x24ff00===undefined&&_0x280d69%0x1===0x0)return _0x280d69;if(_0x24ff00!==undefined&&[_0x13c90e(0x26b),_0x13c90e(0x3bf),'ATK',_0x13c90e(0x420),_0x13c90e(0x146),_0x13c90e(0x4ba),_0x13c90e(0x476),_0x13c90e(0x605)][_0x13c90e(0x401)](String(_0x24ff00)[_0x13c90e(0x65e)]()[_0x13c90e(0x1b7)]()))return _0x280d69;return _0x4cfd2c=_0x4cfd2c||0x0,String((_0x280d69*0x64)[_0x13c90e(0x193)](_0x4cfd2c))+'%';},VisuMZ[_0x2fb0f3(0x31d)]=function(_0x3a81c5){const _0x5be826=_0x2fb0f3;_0x3a81c5=String(_0x3a81c5);if(!_0x3a81c5)return _0x3a81c5;if(typeof _0x3a81c5!==_0x5be826(0x3a9))return _0x3a81c5;const _0x30eac4=VisuMZ[_0x5be826(0x248)][_0x5be826(0x452)][_0x5be826(0x20f)][_0x5be826(0x637)]||_0x5be826(0x14d),_0x5068b4={'maximumFractionDigits':0x6};_0x3a81c5=_0x3a81c5[_0x5be826(0x4c0)](/\[(.*?)\]/g,(_0x3dbafc,_0x2363bf)=>{const _0x5ae1ac=_0x5be826;return VisuMZ[_0x5ae1ac(0x650)](_0x2363bf,'[',']');}),_0x3a81c5=_0x3a81c5[_0x5be826(0x4c0)](/<(.*?)>/g,(_0x1b304c,_0x237e5f)=>{const _0x2c5ca1=_0x5be826;return VisuMZ[_0x2c5ca1(0x650)](_0x237e5f,'<','>');}),_0x3a81c5=_0x3a81c5[_0x5be826(0x4c0)](/\{\{(.*?)\}\}/g,(_0x278c2c,_0x2e7ba5)=>{const _0x4ac659=_0x5be826;return VisuMZ[_0x4ac659(0x650)](_0x2e7ba5,'','');}),_0x3a81c5=_0x3a81c5[_0x5be826(0x4c0)](/(\d+\.?\d*)/g,(_0x43ea5e,_0x9e4dd8)=>{const _0x3d8ac3=_0x5be826;let _0x31adae=_0x9e4dd8;if(_0x31adae[0x0]==='0')return _0x31adae;if(_0x31adae[_0x31adae[_0x3d8ac3(0x105)]-0x1]==='.')return Number(_0x31adae)['toLocaleString'](_0x30eac4,_0x5068b4)+'.';else return _0x31adae[_0x31adae['length']-0x1]===','?Number(_0x31adae)[_0x3d8ac3(0x472)](_0x30eac4,_0x5068b4)+',':Number(_0x31adae)[_0x3d8ac3(0x472)](_0x30eac4,_0x5068b4);});let _0x38bfe7=0x3;while(_0x38bfe7--){_0x3a81c5=VisuMZ[_0x5be826(0x474)](_0x3a81c5);}return _0x3a81c5;},VisuMZ[_0x2fb0f3(0x650)]=function(_0x3b1a8d,_0x5ac718,_0x5a5cdb){const _0x2c95cd=_0x2fb0f3;return _0x3b1a8d=_0x3b1a8d[_0x2c95cd(0x4c0)](/(\d)/gi,(_0x2b8375,_0x3d72bd)=>'PRESERVCONVERSION(%1)'[_0x2c95cd(0x459)](Number(_0x3d72bd))),_0x2c95cd(0x9e)[_0x2c95cd(0x459)](_0x3b1a8d,_0x5ac718,_0x5a5cdb);},VisuMZ[_0x2fb0f3(0x474)]=function(_0x1e2a0c){return _0x1e2a0c=_0x1e2a0c['replace'](/PRESERVCONVERSION\((\d+)\)/gi,(_0x136709,_0x4fe2f1)=>Number(parseInt(_0x4fe2f1))),_0x1e2a0c;},VisuMZ[_0x2fb0f3(0x390)]=function(_0x3fd3c2){const _0x12afef=_0x2fb0f3;SoundManager[_0x12afef(0x384)]();if(!Utils['isNwjs']()){const _0x4aaea0=window[_0x12afef(0x59e)](_0x3fd3c2,_0x12afef(0x299));}else{const _0x4a4183=process[_0x12afef(0x487)]=='darwin'?_0x12afef(0x59e):process[_0x12afef(0x487)]==_0x12afef(0x1d8)?_0x12afef(0x28d):_0x12afef(0x152);require('child_process')['exec'](_0x4a4183+'\x20'+_0x3fd3c2);}},Game_Picture[_0x2fb0f3(0x481)][_0x2fb0f3(0xf9)]=function(){return this['_anchor'];},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x317)]=Game_Picture[_0x2fb0f3(0x481)][_0x2fb0f3(0x2a2)],Game_Picture[_0x2fb0f3(0x481)][_0x2fb0f3(0x2a2)]=function(){const _0xb0f471=_0x2fb0f3;VisuMZ[_0xb0f471(0x248)]['Game_Picture_initBasic'][_0xb0f471(0x29c)](this),this[_0xb0f471(0x5ab)]={'x':0x0,'y':0x0},this['_targetAnchor']={'x':0x0,'y':0x0};},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x120)]=Game_Picture[_0x2fb0f3(0x481)][_0x2fb0f3(0x5e0)],Game_Picture[_0x2fb0f3(0x481)]['updateMove']=function(){const _0x44c0f8=_0x2fb0f3;this[_0x44c0f8(0xc3)](),VisuMZ[_0x44c0f8(0x248)][_0x44c0f8(0x120)]['call'](this);},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x11f)]=Game_Picture['prototype']['show'],Game_Picture['prototype'][_0x2fb0f3(0x1bb)]=function(_0x2a30e4,_0x3d970e,_0x1cb306,_0x19c20f,_0x2ba3d3,_0x31aefc,_0xcd0976,_0x52829a){const _0x39c531=_0x2fb0f3;VisuMZ[_0x39c531(0x248)][_0x39c531(0x11f)]['call'](this,_0x2a30e4,_0x3d970e,_0x1cb306,_0x19c20f,_0x2ba3d3,_0x31aefc,_0xcd0976,_0x52829a),this[_0x39c531(0x654)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x3d970e]||{'x':0x0,'y':0x0});},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x373)]=Game_Picture[_0x2fb0f3(0x481)]['move'],Game_Picture[_0x2fb0f3(0x481)][_0x2fb0f3(0x4ff)]=function(_0x46d0a0,_0x1f9381,_0x21eec2,_0x24d140,_0xb7f10,_0x46ed21,_0x5da5c1,_0x599c36,_0x32f838){const _0x36bf7a=_0x2fb0f3;VisuMZ[_0x36bf7a(0x248)]['Game_Picture_move'][_0x36bf7a(0x29c)](this,_0x46d0a0,_0x1f9381,_0x21eec2,_0x24d140,_0xb7f10,_0x46ed21,_0x5da5c1,_0x599c36,_0x32f838),this[_0x36bf7a(0xbf)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x46d0a0]||{'x':0x0,'y':0x0});},Game_Picture[_0x2fb0f3(0x481)][_0x2fb0f3(0xc3)]=function(){const _0x41771b=_0x2fb0f3;this['_duration']>0x0&&(this[_0x41771b(0x5ab)]['x']=this['applyEasing'](this[_0x41771b(0x5ab)]['x'],this[_0x41771b(0x52f)]['x']),this[_0x41771b(0x5ab)]['y']=this['applyEasing'](this[_0x41771b(0x5ab)]['y'],this[_0x41771b(0x52f)]['y']));},Game_Picture[_0x2fb0f3(0x481)][_0x2fb0f3(0x654)]=function(_0x3c4543){const _0x2d7bfc=_0x2fb0f3;this[_0x2d7bfc(0x5ab)]=_0x3c4543,this['_targetAnchor']=JsonEx[_0x2d7bfc(0xaa)](this[_0x2d7bfc(0x5ab)]);},Game_Picture[_0x2fb0f3(0x481)][_0x2fb0f3(0xbf)]=function(_0x494cb8){const _0x92944=_0x2fb0f3;this[_0x92944(0x52f)]=_0x494cb8;},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x18e)]=Sprite_Picture[_0x2fb0f3(0x481)]['updateOrigin'],Sprite_Picture['prototype'][_0x2fb0f3(0x661)]=function(){const _0x1f105f=_0x2fb0f3,_0x2baad8=this['picture']();!_0x2baad8[_0x1f105f(0xf9)]()?VisuMZ[_0x1f105f(0x248)][_0x1f105f(0x18e)][_0x1f105f(0x29c)](this):(this[_0x1f105f(0xf9)]['x']=_0x2baad8[_0x1f105f(0xf9)]()['x'],this[_0x1f105f(0xf9)]['y']=_0x2baad8[_0x1f105f(0xf9)]()['y']);},Game_Action[_0x2fb0f3(0x481)][_0x2fb0f3(0x580)]=function(_0x597731){const _0x37d1d6=_0x2fb0f3;if(_0x597731){const _0x44cba3=_0x597731['skillId'];if(_0x44cba3===0x1&&this[_0x37d1d6(0x23e)]()[_0x37d1d6(0x98)]()!==0x1)this[_0x37d1d6(0x9a)]();else _0x44cba3===0x2&&this['subject']()[_0x37d1d6(0x61d)]()!==0x2?this['setGuard']():this['setSkill'](_0x44cba3);}else this[_0x37d1d6(0x11d)]();},Game_Actor[_0x2fb0f3(0x481)][_0x2fb0f3(0xbb)]=function(){const _0x175b8b=_0x2fb0f3;return this[_0x175b8b(0x1aa)]()[_0x175b8b(0x345)](_0x23b18d=>this[_0x175b8b(0x11c)](_0x23b18d)&&this[_0x175b8b(0x5d3)]()[_0x175b8b(0x401)](_0x23b18d[_0x175b8b(0xa7)]));},Window_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x461)]=function(){const _0x173fe3=_0x2fb0f3;this[_0x173fe3(0xbc)]=new Sprite(),this[_0x173fe3(0xbc)]['bitmap']=new Bitmap(0x0,0x0),this[_0x173fe3(0xbc)]['x']=0x0,this[_0x173fe3(0x145)](this[_0x173fe3(0xbc)]);},Window_Base[_0x2fb0f3(0x481)][_0x2fb0f3(0x4cf)]=function(){const _0x30197d=_0x2fb0f3;if(this[_0x30197d(0xbc)]){const _0x27a9b7=this[_0x30197d(0xbc)]['bitmap'],_0x3517ad=this[_0x30197d(0x3fb)],_0x58eeb6=this['height'],_0x382d8c=this['padding'],_0x501ed3=ColorManager[_0x30197d(0xff)](),_0x473100=ColorManager[_0x30197d(0x289)]();_0x27a9b7[_0x30197d(0x636)](_0x3517ad,_0x58eeb6),_0x27a9b7[_0x30197d(0x278)](0x0,0x0,_0x3517ad,_0x382d8c,_0x473100,_0x501ed3,!![]),_0x27a9b7[_0x30197d(0x388)](0x0,_0x382d8c,_0x3517ad,_0x58eeb6-_0x382d8c*0x2,_0x501ed3),_0x27a9b7[_0x30197d(0x278)](0x0,_0x58eeb6-_0x382d8c,_0x3517ad,_0x382d8c,_0x501ed3,_0x473100,!![]),this[_0x30197d(0xbc)][_0x30197d(0x357)](0x0,0x0,_0x3517ad,_0x58eeb6);}},Game_Actor[_0x2fb0f3(0x481)][_0x2fb0f3(0x526)]=function(){const _0x6998ff=_0x2fb0f3;for(let _0x22cfe1=0x0;_0x22cfe1<this[_0x6998ff(0x5b4)]();_0x22cfe1++){const _0x57d706=this[_0x6998ff(0x5ed)]();let _0x40db04=Number[_0x6998ff(0x4d4)];this['setAction'](_0x22cfe1,_0x57d706[0x0]);for(const _0x242999 of _0x57d706){const _0x5c86be=_0x242999[_0x6998ff(0x471)]();_0x5c86be>_0x40db04&&(_0x40db04=_0x5c86be,this[_0x6998ff(0xa2)](_0x22cfe1,_0x242999));}}this[_0x6998ff(0x37d)](_0x6998ff(0x42b));},Window_BattleItem[_0x2fb0f3(0x481)][_0x2fb0f3(0x2d2)]=function(_0x219ea2){const _0x3e17e4=_0x2fb0f3;return BattleManager[_0x3e17e4(0x1e5)]()?BattleManager[_0x3e17e4(0x1e5)]()[_0x3e17e4(0x11c)](_0x219ea2):Window_ItemList[_0x3e17e4(0x481)][_0x3e17e4(0x2d2)][_0x3e17e4(0x29c)](this,_0x219ea2);},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0xeb)]=Scene_Map[_0x2fb0f3(0x481)]['createSpriteset'],Scene_Map[_0x2fb0f3(0x481)][_0x2fb0f3(0x2b8)]=function(){const _0x3630bc=_0x2fb0f3;VisuMZ[_0x3630bc(0x248)]['Scene_Map_createSpriteset'][_0x3630bc(0x29c)](this);const _0x5cafbb=this[_0x3630bc(0x286)]['_timerSprite'];if(_0x5cafbb)this[_0x3630bc(0x4e0)](_0x5cafbb);},VisuMZ[_0x2fb0f3(0x248)][_0x2fb0f3(0x28e)]=Scene_Battle[_0x2fb0f3(0x481)][_0x2fb0f3(0x2b8)],Scene_Battle[_0x2fb0f3(0x481)][_0x2fb0f3(0x2b8)]=function(){const _0x40fdad=_0x2fb0f3;VisuMZ['CoreEngine'][_0x40fdad(0x28e)][_0x40fdad(0x29c)](this);const _0x1c38f7=this[_0x40fdad(0x286)][_0x40fdad(0x29d)];if(_0x1c38f7)this[_0x40fdad(0x4e0)](_0x1c38f7);},Window[_0x2fb0f3(0x481)][_0x2fb0f3(0x614)]=function(){const _0x2f7760=_0x2fb0f3,_0x3b12ae=this[_0x2f7760(0x18c)],_0x24b27b=this[_0x2f7760(0x1df)],_0x64610d=0x18,_0x4b1178=_0x64610d/0x2,_0x120ed2=0x60+_0x64610d,_0x1bf046=0x0+_0x64610d;this[_0x2f7760(0x522)]['bitmap']=this[_0x2f7760(0xf6)],this['_downArrowSprite'][_0x2f7760(0xf9)]['x']=0.5,this[_0x2f7760(0x522)][_0x2f7760(0xf9)]['y']=0.5,this['_downArrowSprite'][_0x2f7760(0x357)](_0x120ed2+_0x4b1178,_0x1bf046+_0x4b1178+_0x64610d,_0x64610d,_0x4b1178),this['_downArrowSprite'][_0x2f7760(0x4ff)](Math['round'](_0x3b12ae/0x2),Math[_0x2f7760(0x132)](_0x24b27b-_0x4b1178)),this[_0x2f7760(0x157)][_0x2f7760(0x4f7)]=this['_windowskin'],this[_0x2f7760(0x157)]['anchor']['x']=0.5,this[_0x2f7760(0x157)][_0x2f7760(0xf9)]['y']=0.5,this['_upArrowSprite'][_0x2f7760(0x357)](_0x120ed2+_0x4b1178,_0x1bf046,_0x64610d,_0x4b1178),this[_0x2f7760(0x157)][_0x2f7760(0x4ff)](Math[_0x2f7760(0x132)](_0x3b12ae/0x2),Math[_0x2f7760(0x132)](_0x4b1178));},Window[_0x2fb0f3(0x481)][_0x2fb0f3(0x3c1)]=function(){const _0x3c1af0=_0x2fb0f3,_0x2028d4=0x90,_0x2bd404=0x60,_0x4fcd29=0x18;this[_0x3c1af0(0x336)][_0x3c1af0(0x4f7)]=this[_0x3c1af0(0xf6)],this[_0x3c1af0(0x336)]['anchor']['x']=0.5,this[_0x3c1af0(0x336)][_0x3c1af0(0xf9)]['y']=0x1,this[_0x3c1af0(0x336)][_0x3c1af0(0x4ff)](Math[_0x3c1af0(0x132)](this['_width']/0x2),this['_height']),this[_0x3c1af0(0x336)][_0x3c1af0(0x357)](_0x2028d4,_0x2bd404,_0x4fcd29,_0x4fcd29),this[_0x3c1af0(0x336)]['alpha']=0x0;};