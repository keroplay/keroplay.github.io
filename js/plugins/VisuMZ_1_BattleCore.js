//=============================================================================
// VisuStella MZ - Battle Core
// VisuMZ_1_BattleCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_BattleCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleCore = VisuMZ.BattleCore || {};
VisuMZ.BattleCore.version = 1.28;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.28] [BattleCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Battle Core plugin revamps the battle engine provided by RPG Maker MZ to
 * become more flexible, streamlined, and support a variety of features. The
 * updated battle engine allows for custom Action Sequences, battle layout
 * styles, and a lot of control over the battle mechanics, too.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Action Sequence Plugin Commands to give you full control over what happens
 *   during the course of a skill or item.
 * * Animated Sideview Battler support for enemies!
 * * Auto Battle options for party-wide and actor-only instances.
 * * Base Troop Events to quickly streamline events for all Troop events.
 * * Battle Command control to let you change which commands appear for actors.
 * * Battle Layout styles to change the way the battle scene looks.
 * * Casting animation support for skills.
 * * Critical Hit control over the success rate formula and damage multipliers.
 * * Custom target scopes added for skills and items.
 * * Damage formula control, including Damage Styles.
 * * Damage caps, both hard caps and soft caps.
 * * Damage traits such Armor Penetration/Reduction to bypass defenses.
 * * Elements & Status Menu Core support for traits.
 * * Multitude of JavaScript notetags and global Plugin Parameters to let you
 *   make a variety of effects across various instances during battle.
 * * Party Command window can be skipped/disabled entirely.
 * * Weather effects now show in battle.
 * * Streamlined Battle Log to remove redundant information and improve the
 *   flow of battle.
 * * Visual HP Gauges can be displayed above the heads of actors and/or enemies
 *   with a possible requirement for enemies to be defeated at least once first
 *   in order for them to show.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin will overwrite some core parts of the RPG Maker MZ base code in
 * order to ensure the Battle Core plugin will work at full capacity. The
 * following are explanations of what has been changed.
 *
 * ---
 *
 * Action Sequences
 *
 * - Action sequences are now done either entirely by the Battle Log Window or
 * through common events if the <Custom Action Sequence> notetag is used.
 * In RPG Maker MZ by default, Action Sequences would be a mixture of using the
 * Battle Log Window, the Battle Manager, and the Battle Scene, making it hard
 * to fully grab control of the situation.
 *
 * ---
 *
 * Action Speed
 *
 * - Action speeds determine the turn order in the default battle system. The
 * AGI of a battle unit is also taken into consideration. However, the random
 * variance applied to the action speed system makes the turn order extremely
 * chaotic and hard for the player to determine. Thus, the random variance
 * aspect of it has been turned off. This can be reenabled by default through
 * Plugin Parameters => Mechanics Settings => Allow Random Speed?
 *
 * ---
 *
 * Animated Sideview Battler Support For Enemies
 *
 * - Enemies can now use Sideview Actor sprites for themselves! They will
 * behave like actors and can even carry their own set of weapons for physical
 * attacks. These must be set up using notetags. More information can be found
 * in the notetag section.
 *
 * - As the sprites are normally used for actors, some changes have been made
 * to Sprite_Actor to be able to support both actors and enemies. These changes
 * should have minimal impact on other plugins.
 *
 * ---
 *
 * Battle Sprite Updates
 *
 * - A lot of functions in Sprite_Battler, Sprite_Actor, and Sprite_Enemy have
 * been overwritten to make the new Action Sequence system added by this plugin
 * possible. These changes make it possible for the sprites to move anywhere on
 * the screen, jump, float, change visibility, and more.
 *
 * ---
 *
 * Change Battle Back in Battle
 * 
 * - By default, the Change Battle Back event command does not work in battle.
 * Any settings made to it will only reflect in the following battle. Now, if
 * the battle back event command is used during battle, it will reflect upon
 * any new changes immediately.
 *
 * ---
 *
 * Critical Hit - LUK Influence
 *
 * - The LUK Buffs now affect the critical hit rate based off how the formula
 * is now calculated. Each stack of a LUK Buff will double the critical hit
 * rate and compound upon that. That means a x1 LUK Buff stack will raise it by
 * x2, a x2 LUK Buff stack will raise the critical hit rate by x4, a x3 LUK
 * Buff Stack will raise the critical hit rate stack by x8, and so on.
 *
 * - LUK also plays a role in how much damage is dealt with critical hits. The
 * default critical hit multiplier has been reduced from x3 to x2. However, a
 * percentage of LUK will added on (based off the user's CRI rate) onto the
 * finalized critical damage. If the user's CRI rate is 4%, then 4% of the user
 * LUK value will also be added onto the damage.
 *
 * - This change can be altered through Plugin Parameters => Damage Settings =>
 * Critical Hits => JS: Rate Formula and JS: Damage Formula.
 *
 * ---
 * 
 * Damage Popups
 * 
 * - Damage popups are now formatted with + and - to determine healing and
 * damage. MP Damage will also include "MP" at the back. This is to make it
 * clearer what each colored variant of the damage popup means as well as help
 * color blind players read the on-screen data properly.
 * 
 * - Damage popups have also been rewritten to show all changed aspects instead
 * of just one. Previously with RPG Maker MZ, if an action would deal both HP
 * and MP damage, only one of them would show. Now, everything is separated and
 * both HP and MP changes will at a time.
 * 
 * ---
 * 
 * Dual Wielding
 * 
 * - Previously, RPG Maker MZ had "Dual Wielding" attack using both weapon
 * animations at once, with the combined ATK of each weapon. It's confusing to
 * look at and does not portray the nature of "Dual Wielding".
 * 
 * - Dual Wielding, or in the case of users adding in third and fourth weapons,
 * Multi Wielding is now changed. Each weapon is displayed individually, each
 * producing its own attack animation, showing each weapon type, and applying
 * only that weapon's ATK, Traits, and related effects. It is no longer a
 * combined effect to display everything at once like RPG Maker MZ default.
 * 
 * - If an actor has multiple weapon slots but some of them are unequipped,
 * then the action will treat the attack as a single attack. There will be no
 * barehanded attack to add on top of it. This is to match RPG Maker MZ's
 * decision to omit a second animation if the same scenario is applied.
 * 
 * ---
 *
 * Force Action
 *
 * - Previously, Forced Actions would interrupt the middle of an event to
 * perform an action. However, with the addition of more flexible Action
 * Sequences, the pre-existing Force Action system would not be able to exist
 * and would require being remade.
 *
 * - Forced Actions now are instead, added to a separate queue from the action
 * battler list. Whenever an action and/or common event is completed, then if
 * there's a Forced Action battler queued, then the Forced Action battler will
 * have its turn. This is the cleanest method available and avoids the most
 * conflicts possible.
 *
 * - This means if you planned to make cinematic sequences with Forced Actions,
 * you will need to account for the queued Force Actions. However, in the case
 * of battle cinematics, we would highly recommend that you use the newly added
 * Action Sequence Plugin Commands instead as those give you more control than
 * any Force Action ever could.
 *
 * ---
 *
 * Random Scope
 *
 * - The skill and item targeting scopes for Random Enemy, 2 Random Enemies,
 * 3 Random Enemies, 4 Random Enemies will now ignore TGR and utilize true
 * randomness.
 *
 * ---
 *
 * Spriteset_Battle Update
 *
 * - The spriteset now has extra containers to separate battlers (actors and
 * enemies), animations, and damage. This is to make actors and enemy battler
 * sprites more efficient to sort (if enabled), so that animations won't
 * interfere with and cover damage sprites, and to make sure damage sprites are
 * unaffected by screen tints in order to ensure the player will always have a
 * clear read on the information relaying sprites.
 *
 * ---
 *
 * Weather Displayed in Battle
 *
 * - Previously, weather has not been displayed in battle. This means that any
 * weather effects placed on the map do not transfer over to battle and causes
 * a huge disconnect for players. The Battle Core plugin will add weather
 * effects to match the map's weather conditions. Any changes made to weather
 * through event commands midway through battle will also be reflected.
 *
 * ---
 *
 * ============================================================================
 * Base Troops
 * ============================================================================
 *
 * Base Troops can be found, declared, and modified in the Plugin Parameters =>
 * Mechanics Settings => Base Troop ID's. All of the listed Troop ID's here
 * will have their page events replicated and placed under all other troops
 * found in the database.
 *
 * ---
 *
 * This means that if you have an event that runs on Turn 1 of a Base Troop,
 * then for every troop out there, that same event will also run on Turn 1,
 * as well. This is useful for those who wish to customize their battle system
 * further and to reduce the amount of work needed to copy/paste said event
 * pages into every database troop object manually.
 *
 * ---
 *
 * ============================================================================
 * Damage Styles
 * ============================================================================
 *
 * Damage Styles are a new feature added through the Battle Core plugin. When
 * using certain Battle Styles, you can completely ignore typing in the whole
 * damage formula inside the damage formula input box, and instead, insert
 * either a power amount or a multiplier depending on the Damage Style. The
 * plugin will then automatically calculate damage using that value factoring
 * in ATK, DEF, MAT, MDF values.
 *
 * ---
 *
 * Here is a list of the Damage Styles that come with this plugin by default.
 * You can add in your own and even edit them to your liking.
 * Or just remove them if you want.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Style          Use Formula As   PH/MA Disparity   Stat Scale   Damage Scale
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Standard       Formula          No                Varies       Varies
 * ArmorScaling   Formula          No                Varies       Varies
 * CT             Multiplier       Yes               Low          Normal
 * D4             Multiplier       No                High         Normal
 * DQ             Multiplier       No                Low          Low
 * FF7            Power            Yes               Low          High
 * FF8            Power            Yes               Medium       Normal
 * FF9            Power            Yes               Low          Normal
 * FF10           Power            Yes               Medium       High
 * MK             Multiplier       No                Medium       Low
 * MOBA           Multiplier       No                Medium       Normal
 * PKMN           Power            No                Low          Normal
 *
 * Use the above chart to figure out which Damage Style best fits your game,
 * if you plan on using them.
 *
 * The 'Standard' style is the same as the 'Manual' formula input, except that
 * it allows for the support of <Armor Penetration> and <Armor Reduction>
 * notetags.
 *
 * The 'Armor Scaling' style allows you to type in the base damage calculation
 * without the need to type in any defending modifiers.
 *
 * NOTE: While these are based off the damage formulas found in other games,
 * not all of them are exact replicas. Many of them are adapted for use in
 * RPG Maker MZ since not all RPG's use the same set of parameters and not all
 * external multipliers function the same way as RPG Maker MZ.
 * 
 * ---
 *
 * Style:
 * - This is what the Damage Style is.
 *
 * Use Formula As:
 * - This is what you insert into the formula box.
 * - Formula: Type in the formula for the action just as you would normally.
 * - Multiplier: Type in the multiplier for the action.
 *     Use float values. This means 250% is typed out as 2.50
 * - Power: Type in the power constant for the action.
 *     Use whole numbers. Type in something like 16 for a power constant.
 * 
 * PH/MA Disparity:
 * - Is there a disparity between how Physical Attacks and Magical Attacks
 *   are calculated?
 * - If yes, then physical attacks and magical attacks will have different
 *   formulas used.
 * - If no, then physical attacks and magical attacks will share similar
 *   formulas for how they're calculated.
 *
 * Stat Scale:
 * - How much should stats scale throughout the game?
 * - Low: Keep them under 100 for the best results.
 * - Medium: Numbers work from low to mid 400's for best results.
 * - High: The numbers really shine once they're higher.
 *
 * Damage Scale:
 * - How much does damage vary depending on small parameter changes?
 * - Low: Very little increase from parameter changes.
 * - Normal: Damage scales close to proportionally with parameter changes.
 * - High: Damage can boost itself drastically with parameter changes.
 *
 * ---
 *
 * To determine what kind of parameters are used for the Damage Styles, they
 * will depend on two things: the action's 'Hit Type' (ie Physical Attack,
 * Magical Attack, and Certain Hit) and the action's 'Damage Type' (ie. Damage,
 * Recovery, or Drain).
 *
 * Certain Hit tends to use whichever value is higher: ATK or MAT, and then
 * ignores the target's defense values. Use Certain Hits for 'True Damage'.
 *
 * Use the chart below to figure out everything else:
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Hit Type      Damage Type   Attacker Parameter   Defender Parameter
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Physical      Damage        ATK                  DEF
 * Magical       Damage        MAT                  MDF
 * Certain Hit   Damage        Larger (ATK, MAT)    -Ignores-
 * Physical      Recover       DEF                  -Ignores-
 * Magical       Recover       MDF                  -Ignores-
 * Certain Hit   Recover       Larger (ATK, MAT)    -Ignores-
 * Physical      Drain         ATK                  DEF
 * Magical       Drain         MAT                  MDF
 * Certain Hit   Drain         Larger (ATK, MAT)    -Ignores-
 *
 * These can be modified within the Plugin Parameters in the individual
 * Damage Styles themselves.
 *
 * ---
 *
 * Skills and Items can use different Damage Styles from the setting you've
 * selected in the Plugin Parameters. They can be altered to have different
 * Damage Styles through the usage of a notetag:
 *
 * <Damage Style: name>
 *
 * This will use whichever style is found in the Plugin Parameters.
 *
 * If "Manual" is used, then no style will be used and all calculations will be
 * made strictly based off the formula found inside the formula box.
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
 * === HP Gauge-Related Notetags ===
 * 
 * The following notetags allow you to set whether or not HP Gauges can be
 * displayed by enemies regardless of Plugin Parameter settings.
 * 
 * ---
 *
 * <Show HP Gauge>
 *
 * - Used for: Enemy Notetags
 * - Will always show the HP Gauge for the enemy regardless of the defeat
 *   requirement setting.
 * - This does not bypass the player's Options preferences.
 * - This does not bypass disabling enemy HP Gauges as a whole.
 * 
 * ---
 *
 * <Hide HP Gauge>
 *
 * - Used for: Enemy Notetags
 * - Will always hide the HP Gauge for the enemy regardless of the defeat
 *   requirement setting.
 * - This does not bypass the player's Options preferences.
 * 
 * ---
 * 
 * <Battle UI Offset: +x, +y>
 * <Battle UI Offset: -x, -y>
 * 
 * <Battle UI Offset X: +x>
 * <Battle UI Offset X: -x>
 * 
 * <Battle UI Offset Y: +y>
 * <Battle UI Offset Y: -y>
 * 
 * - Used for: Actor and Enemy Notetags
 * - Adjusts the offset of HP Gauges and State Icons above the heads of actors
 *   and enemies.
 * - Replace 'x' with a number value that offsets the x coordinate.
 * - Negative x values offset left. Positive x values offset right.
 * - Replace 'y' with a number value that offsets the y coordinate.
 * - Negative y values offset up. Positive x values offset down.
 * 
 * ---
 *
 * === Animation-Related Notetags ===
 *
 * The following notetags allow you to set animations to play at certain
 * instances and/or conditions.
 *
 * ---
 *
 * <Slip Animation: x>
 *
 * - Requires VisuMZ_0_CoreEngine!
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - During the phase at which the user regenerates HP, MP, or TP, this
 *   animation will play as long as the user is alive and visible.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * <Cast Animation: x>
 *
 * - Used for: Skill Notetags
 * - Plays a battle animation at the start of the skill.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * <Attack Animation: x>
 *
 * - Used for: Enemy Notetags
 * - Gives an enemy an attack animation to play for its basic attack.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * === Battleback-Related Notetags ===
 *
 * You can apply these notetags to have some control over the battlebacks that
 * appear in different regions of the map for random or touch encounters.
 *
 * ---
 *
 * <Region x Battleback1: filename>
 * <Region x Battleback2: filename>
 * 
 * - Used for: Map Notetags
 * - If the player starts a battle while standing on 'x' region, then the
 *   'filename' battleback will be used.
 * - Replace 'x' with a number representing the region ID you wish to use.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Castle1.png' will be only inserted
 *   as 'Castle1' without the '.png' at the end.
 * - *NOTE: This will override any specified battleback settings.
 *
 * ---
 *
 * === Battle Command-Related Notetags ===
 *
 * You can use notetags to change how the battle commands of playable
 * characters appear in battle as well as whether or not they can be used.
 *
 * ---
 *
 * <Seal Attack>
 * <Seal Guard>
 * <Seal Item>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Prevents specific battle commands from being able to be used.
 *
 * ---
 *
 * <Battle Commands>
 *  Attack
 *  Skills
 *  SType: x
 *  SType: name
 *  All Skills
 *  Skill: x
 *  Skill: name
 *  Guard
 *  Item
 *  Party
 *  Escape
 *  Auto Battle
 *  Combat Log
 * </Battle Commands>
 *
 * - Used for: Class Notetags
 * - Changes which commands appear in the Actor Command Window in battle.
 *   If this notetag is not used, then the default commands determined in
 *   Plugin Parameters => Actor Command Window => Command List will be used.
 * - Add/remove/modify entries as needed.
 *
 * - Attack 
 *   - Adds the basic attack command.
 * 
 * - Skills
 *   - Displays all the skill types available to the actor.
 * 
 * - SType: x
 * - Stype: name
 *   - Adds in a specific skill type.
 *   - Replace 'x' with the ID of the skill type.
 *   - Replace 'name' with the name of the skill type (without text codes).
 *
 * - All Skills
 *   - Adds all usable battle skills as individual actions.
 * 
 * - Skill: x
 * - Skill: name
 *   - Adds in a specific skill as a usable action.
 *   - Replace 'x' with the ID of the skill.
 *   - Replace 'name' with the name of the skill.
 * 
 * - Guard
 *   - Adds the basic guard command.
 * 
 * - Item
 *   - Adds the basic item command.
 *
 * - Party
 *   - Requires VisuMZ_2_PartySystem.
 *   - Allows this actor to switch out with a different party member.
 * 
 * - Escape
 *   - Adds the escape command.
 * 
 * - Auto Battle
 *   - Adds the auto battle command.
 *
 * Example:
 *
 * <Battle Commands>
 *  Attack
 *  Skill: Heal
 *  Skills
 *  Guard
 *  Item
 *  Escape
 * </Battle Commands>
 *
 * ---
 *
 * <Command Text: x>
 *
 * - Used for: Skill Notetags
 * - When a skill is used in a <Battle Commands> notetag set, you can change
 *   the skill name text that appears to something else.
 * - Replace 'x' with the skill's name you want to shown in the Actor Battle
 *   Command window.
 * - Recommended Usage: Shorten skill names that are otherwise too big to fit
 *   inside of the Actor Battle Command window.
 *
 * ---
 *
 * <Command Icon: x>
 *
 * - Used for: Skill Notetags
 * - When a skill is used in a <Battle Commands> notetag set, you can change
 *   the skill icon that appears to something else.
 * - Replace 'x' with the ID of icon you want shown in the Actor Battle Command
 *   window to represent the skill.
 *
 * ---
 * 
 * <Command Show Switch: x>
 * 
 * <Command Show All Switches: x,x,x>
 * <Command Show Any Switches: x,x,x>
 * 
 * - Used for: Skill Notetags
 * - Determines if a battle command is visible or not through switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all
 *   switches are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 * - This can be applied to Attack and Guard commands, too.
 * 
 * ---
 * 
 * <Command Hide Switch: x>
 * 
 * <Command Hide All Switches: x,x,x>
 * <Command Hide Any Switches: x,x,x>
 * 
 * - Used for: Skill Notetags
 * - Determines if a battle command is visible or not through switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, item will be shown until all
 *   switches are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 * - This can be applied to Attack and Guard commands, too.
 * 
 * ---
 * 
 * <Battle Portrait: filename>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" Battle Layout.
 * - Sets the battle portrait image for the actor to 'filename'.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 * - This will override any menu images used for battle only.
 * 
 * ---
 * 
 * <Battle Portrait Offset: +x, +y>
 * <Battle Portrait Offset: -x, -y>
 * 
 * <Battle Portrait Offset X: +x>
 * <Battle Portrait Offset X: -x>
 * 
 * <Battle Portrait Offset Y: +y>
 * <Battle Portrait Offset Y: -y>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" and "Border" Battle Layouts.
 * - Offsets the X and Y coordinates for the battle portrait.
 * - Replace 'x' with a number value that offsets the x coordinate.
 * - Negative x values offset left. Positive x values offset right.
 * - Replace 'y' with a number value that offsets the y coordinate.
 * - Negative y values offset up. Positive x values offset down.
 * 
 * ---
 * 
 * === JavaScript Notetag: Battle Command-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if skill-based battle commands are visible or hidden.
 * 
 * ---
 * 
 * <JS Command Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Command Visible>
 * 
 * - Used for: Skill Notetags
 * - The 'visible' variable is the final returned variable to determine the
 *   skill's visibility in the Battle Command Window.
 * - Replace 'code' with JavaScript code to determine the skill's visibility in
 *   the Battle Command Window.
 * - The 'user' variable represents the user who will perform the skill.
 * - The 'skill' variable represents the skill to be used.
 * 
 * ---
 *
 * === Targeting-Related Notetags ===
 *
 * The following notetags are related to the targeting aspect of skills and
 * items and may adjust the scope of how certain skills/items work.
 *
 * ---
 *
 * <Always Hit>
 *
 * <Always Hit Rate: x%>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the action to always hit or to always have a hit rate of exactly
 *   the marked x%.
 * - Replace 'x' with a number value representing the hit success percentage.
 *
 * ---
 *
 * <Repeat Hits: x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the number of hits the action will produce.
 * - Replace 'x' with a number value representing the number of hits to incur.
 *
 * ---
 *
 * <Target: x Random Any>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets can be both actors and enemies.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: x Random Enemies>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets are only enemies.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: x Random Allies>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets are only actors.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: All Allies But User>
 *
 * - Used for: Skill, Item Notetags
 * - Targets all allies with the exception of the user.
 *
 * ---
 *
 * === JavaScript Notetag: Targeting-Related ===
 *
 * ---
 * 
 * <JS Targets>
 *  code
 *  code
 *  targets = [code];
 * </JS Targets>
 *
 * - Used for: Skill, Item Notetags
 * - The 'targets' variable is an array that is returned to be used as a
 *   container for all the valid action targets.
 * - Replace 'code' with JavaScript code to determine valid targets.
 *
 * ---
 *
 * === Damage-Related Notetags ===
 *
 * ---
 *
 * <Damage Style: name>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'name' with a Damage Style name to change the way calculations are
 *   made using the damage formula input box.
 * - Names can be found in Plugin Parameters => Damage Settings => Style List
 *
 * ---
 *
 * <Armor Reduction: x>
 * <Armor Reduction: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   reduction properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor reduction properties
 *   when calculating one's own armor.
 * - This applies to physical attacks.
 * - Use the 'x' notetag variant to determine a flat reduction value.
 * - Use the 'x%' notetag variant to determine a percentile reduction value.
 *
 * ---
 *
 * <Armor Penetration: x>
 * <Armor Penetration: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   penetration properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor penetration
 *   properties when calculating a target's armor.
 * - This applies to physical attacks.
 * - Use the 'x' notetag variant to determine a flat penetration value.
 * - Use the 'x%' notetag variant to determine a percentile penetration value.
 *
 * ---
 *
 * <Magic Reduction: x>
 * <Magic Reduction: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   reduction properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor reduction properties
 *   when calculating one's own armor.
 * - This applies to magical attacks.
 * - Use the 'x' notetag variant to determine a flat reduction value.
 * - Use the 'x%' notetag variant to determine a percentile reduction value.
 *
 * ---
 *
 * <Magic Penetration: x>
 * <Magic Penetration: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   penetration properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor penetration
 *   properties when calculating a target's armor.
 * - This applies to magical attacks.
 * - Use the 'x' notetag variant to determine a flat penetration value.
 * - Use the 'x%' notetag variant to determine a percentile penetration value.
 *
 * ---
 *
 * <Bypass Damage Cap>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will cause the action to never have
 *   its damage capped.
 * - If used on trait objects, this will cause the affected unit to never have
 *   its damage capped.
 *
 * ---
 *
 * <Damage Cap: x>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will declare the hard damage cap to
 *   be the 'x' value.
 * - If used on trait objects, this will raise the affect unit's hard damage
 *   cap to 'x' value. If another trait object has a higher value, use that
 *   value instead.
 *
 * ---
 *
 * <Bypass Soft Damage Cap>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will cause the action to never have
 *   its damage scaled downward to the soft cap.
 * - If used on trait objects, this will cause the affected unit to never have
 *   its damage scaled downward to the soft cap.
 *
 * ---
 *
 * <Soft Damage Cap: +x%>
 * <Soft Damage Cap: -x%>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will increase/decrease the action's
 *   soft cap by x% where 'x' is a percentage value representing the increment
 *   changed by the hard cap value.
 * - If used on trait objects, this will raise the affect unit's soft damage
 *   limit by x% where 'x' is a percentage value representing the increment
 *   changed by the hard cap value.
 *
 * ---
 *
 * <Unblockable>
 *
 * - Used for: Skill, Item Notetags
 * - Using "Guard" against this skill will not reduce any damage.
 *
 * ---
 *
 * === Critical-Related Notetags ===
 *
 * The following notetags affect skill and item critical hit rates and the
 * critical damage multiplier.
 *
 * ---
 *
 * <Always Critical>
 *
 * - Used for: Skill, Item Notetags
 * - This skill/item will always land a critical hit regardless of the
 *   user's CRI parameter value.
 *
 * ---
 *
 * <Set Critical Rate: x%>
 *
 * - Used for: Skill, Item Notetags
 * - This skill/item will always have a x% change to land a critical hit
 *   regardless of user's CRI parameter value.
 * - Replace 'x' with a percerntage value representing the success rate.
 *
 * ---
 *
 * <Modify Critical Rate: x%>
 * <Modify Critical Rate: +x%>
 * <Modify Critical Rate: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - Modifies the user's CRI parameter calculation for this skill/item.
 * - The 'x%' notetag variant will multiply the user's CRI parameter value
 *   for this skill/item.
 * - The '+x%' and '-x%' notetag variants will incremenetally increase/decrease
 *   the user's CRI parameter value for this skill/item.
 *
 * ---
 *
 * <Modify Critical Multiplier: x%>
 * <Modify Critical Multiplier: +x%>
 * <Modify Critical Multiplier: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - These notetags determine the damage multiplier when a critical hit lands.
 * - The 'x%' notetag variant multiply the multiplier to that exact percentage.
 * - The '+x%' and '-x%' notetag variants will change the multiplier with an
 *   incremenetal rate for this skill/item.
 *
 * ---
 *
 * <Modify Critical Bonus Damage: x%>
 * <Modify Critical Bonus Damage: +x%>
 * <Modify Critical Bonus Damage: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - These notetags determine the bonus damage added when a critical hit lands.
 * - The 'x%' notetag variant multiply the damage to that exact percentage.
 * - The '+x%' and '-x%' notetag variants will change the bonus damage with an
 *   incremenetal rate for this skill/item.
 *
 * ---
 *
 * === JavaScript Notetags: Critical-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine how critical hit-related aspects are calculated.
 *
 * ---
 *
 * <JS Critical Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Critical Rate>
 *
 * - Used for: Skill, Item Notetags
 * - The 'rate' variable is the final returned amount to determine the
 *   critical hit success rate.
 * - Replace 'code' with JavaScript code to determine the final 'rate' to be
 *   returned as the critical hit success rate.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Critical Damage>
 *  code
 *  code
 *  multiplier = code;
 *  bonusDamage = code;
 * </JS Critical Damage>
 *
 * - Used for: Skill, Item Notetags
 * - The 'multiplier' variable is returned later and used as the damage
 *   multiplier used to amplify the critical damage amount.
 * - The 'bonusDamage' variable is returned later and used as extra added
 *   damage for the critical damage amount.
 * - Replace 'code' with JavaScript code to determine how the 'multiplier' and
 *   'bonusDamage' variables are calculated.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * === Action Sequence-Related Notetags ===
 *
 * Action Sequences allow you full control over how a skill and/or item plays
 * through its course. These notetags give you control over various aspects of
 * those Action Sequences. More information is found in the Action Sequences
 * help section.
 *
 * ---
 *
 * <Custom Action Sequence>
 *
 * - Used for: Skill, Item Notetags
 * - Removes all automated Action Sequence parts from the skill.
 * - Everything Action Sequence-related will be done by Common Events.
 * - Insert Common Event(s) into the skill/item's effects list to make use of
 *   the Custom Action Sequences.
 * - This will prevent common events from loading in the Item Scene and Skill
 *   Scene when used outside of battle.
 *
 * ---
 * 
 * <Auto Action Sequence>
 * 
 * - Used for: Skill, Item Notetags
 * - If the Action Sequence Plugin Parameter "Auto Notetag" is enabled, this
 *   plugin will prevent custom action sequences from happening for the skill
 *   or item, and instead, use an Automatic Action Sequence instead.
 * - Ignore this if you have "Auto Notetag" disabled or set to false.
 * 
 * ---
 * 
 * <Common Event: name>
 *
 * - Used for: Skill, Item Notetags
 * - Battle only: calls forth a Common Event of a matching name.
 * - Replace 'name' with the name of a Common Event to call from when this
 *   skill/item is used in battle.
 *   - Remove any \I[x] in the name.
 * - Insert multiple notetags to call multiple Common Events in succession.
 * - This will occur after any Common Event Trait Effects for the skill/item's
 *   database entry.
 * - This is primarily used for users who are reorganizing around their Common
 *   Events and would still like to have their skills/items perform the correct
 *   Action Sequences in case the ID's are different.
 * 
 * ---
 *
 * <Display Icon: x>
 * <Display Text: string>
 *
 * - Used for: Skill, Item Notetags
 * - When displaying the skill/item name in the Action Sequence, determine the
 *   icon and/or text displayed.
 * - Replace 'x' with a number value representing the icon ID to be displayed.
 * - Replace 'string' with a text value representing the displayed name.
 *
 * ---
 *
 * === Animated Sideview Battler-Related Notetags ===
 *
 * Enemies can use Animated Sideview Actor graphics thanks to this plugin.
 * These notetags give you control over that aspect. Some of these also affect
 * actors in addition to enemies.
 *
 * ---
 *
 * <Sideview Battler: filename>
 *
 * <Sideview Battlers>
 *  filename: weight
 *  filename: weight
 *  filename: weight
 * </Sideview Battlers>
 *
 * - Used for: Enemy Notetags
 * - Replaces the enemy's battler graphic with an animated Sideview Actor
 *   graphic found in the img/sv_actors/ folder.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Actor1_1.png' will be only inserted
 *   as 'Actor1_1' without the '.png' at the end.
 * - If the multiple notetag vaiant is used, then a random filename is selected
 *   from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'filename'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'filename' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Battlers>
 *  Actor1_1: 25
 *  Actor1_3: 10
 *  Actor1_5
 *  Actor1_7
 * </Sideview Battlers>
 *
 * ---
 *
 * <Sideview Anchor: x, y>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets the sprite anchor positions for the sideview sprite.
 * - Replace 'x' and 'y' with numbers depicting where the anchors should be for
 *   the sideview sprite.
 * - By default, the x and y anchors are 0.5 and 1.0.
 *
 * ---
 * 
 * <Sideview Home Offset: +x, +y>
 * <Sideview Home Offset: -x, -y>
 * 
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Offsets the sideview actor sprite's home position by +/-x, +/-y.
 * - Replace 'x' and 'y' with numbers depicting how much to offset each of the
 *   coordinates by. For '0' values, use +0 or -0.
 * - This notetag will not work if you remove it from the JavaScript code in
 *   Plugin Parameters > Actor > JS:  Home Position
 * 
 * ---
 * 
 * <Sideview Weapon Offset: +x, +y>
 * <Sideview Weapon Offset: -x, -y>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy State Notetags
 * - Offsets the sideview weapon sprite's position by +/-x, +/-y.
 * - Replace 'x' and 'y' with numbers depicting how much to offset each of the
 *   coordinates by. For '0' values, use +0 or -0.
 * 
 * ---
 *
 * <Sideview Show Shadow>
 * <Sideview Hide Shadow>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets it so the sideview battler's shadow will be visible or hidden.
 *
 * ---
 *
 * <Sideview Collapse>
 * <Sideview No Collapse>
 *
 * - Used for: Enemy Notetags
 * - Either shows the collapse graphic or does not show the collapse graphic.
 * - Collapse graphic means the enemy will 'fade away' once it's defeated.
 * - No collapse graphic means the enemy's corpse will remain on the screen.
 *
 * ---
 *
 * <Sideview Idle Motion: name>
 *
 * <Sideview Idle Motions>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Sideview Idle Motions>
 *
 * - Used for: Enemy Notetags
 * - Changes the default idle motion for the enemy.
 * - Replace 'name' with any of the following motion names:
 *   - 'walk', 'wait', 'chant', 'guard', 'damage', 'evade', 'thrust', 'swing',
 *     'missile', 'skill', 'spell', 'item', 'escape', 'victory', 'dying',
 *     'abnormal', 'sleep', 'dead'
 * - If the multiple notetag vaiant is used, then a random motion name is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Idle Motions>
 *  walk: 25
 *  wait: 50
 *  guard
 *  victory
 *  abnormal
 * </Sideview Idle Motions>
 *
 * ---
 *
 * <Sideview Size: width, height>
 *
 * - Used for: Enemy Notetags
 * - When using a sideview battler, its width and height will default to the
 *   setting made in Plugin Parameters => Enemy Settings => Size: Width/Height.
 * - This notetag lets you change that value to something else.
 * - Replace 'width' and 'height' with numbers representing how many pixels
 *   wide/tall the sprite will be treated as.
 *
 * ---
 *
 * <Sideview Weapon: weapontype>
 *
 * <Sideview Weapons>
 *  weapontype: weight
 *  weapontype: weight
 *  weapontype: weight
 * </Sideview Weapons>
 *
 * - Used for: Enemy Notetags
 * - Give your sideview enemies weapons to use.
 * - Replace 'weapontype' with the name of the weapon type found under the
 *   Database => Types => Weapon Types list (without text codes).
 * - If the multiple notetag vaiant is used, then a random weapon type is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the weapontype
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'weapontype' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Weapons>
 *  Dagger: 25
 *  Sword: 25
 *  Axe
 * </Sideview Weapons>
 *
 * ---
 *
 * <traitname Sideview Battler: filename>
 *
 * <traitname Sideview Battlers>
 *  filename: weight
 *  filename: weight
 *  filename: weight
 * </traitname Sideview Battlers>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have a unique appearance.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Actor1_1.png' will be only inserted
 *   as 'Actor1_1' without the '.png' at the end.
 * - If the multiple notetag vaiant is used, then a random filename is selected
 *   from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'filename'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'filename' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Male Sideview Battlers>
 *  Actor1_1: 25
 *  Actor1_3: 10
 *  Actor1_5
 *  Actor1_7
 * </Male Sideview Battlers>
 *
 * <Female Sideview Battlers>
 *  Actor1_2: 25
 *  Actor1_4: 10
 *  Actor1_6
 *  Actor1_8
 * </Female Sideview Battlers>
 *
 * ---
 *
 * <traitname Sideview Idle Motion: name>
 *
 * <traitname Sideview Idle Motions>
 *  name: weight
 *  name: weight
 *  name: weight
 * </traitname Sideview Idle Motions>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have unique idle motions.
 * - Replace 'name' with any of the following motion names:
 *   - 'walk', 'wait', 'chant', 'guard', 'damage', 'evade', 'thrust', 'swing',
 *     'missile', 'skill', 'spell', 'item', 'escape', 'victory', 'dying',
 *     'abnormal', 'sleep', 'dead'
 * - If the multiple notetag vaiant is used, then a random motion name is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Jolly Sideview Idle Motions>
 *  wait: 25
 *  victory: 10
 *  walk
 * </Jolly Sideview Idle Motions>
 *
 * <Serious Sideview Idle Motions>
 *  walk: 25
 *  guard: 10
 *  wait
 * </Jolly Sideview Idle Motions>
 *
 * ---
 *
 * <traitname Sideview Weapon: weapontype>
 *
 * <traitname Sideview Weapons>
 *  weapontype: weight
 *  weapontype: weight
 *  weapontype: weight
 * </traitname Sideview Weapons>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have unique weapons.
 * - Replace 'weapontype' with the name of the weapon type found under the
 *   Database => Types => Weapon Types list (without text codes).
 * - If the multiple notetag vaiant is used, then a random weapon type is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the weapontype
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'weapontype' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Male Sideview Weapons>
 *  Dagger: 25
 *  Sword: 25
 *  Axe
 * </Male Sideview Weapons>
 *
 * <Female Sideview Weapons>
 *  Dagger: 25
 *  Spear: 25
 *  Cane
 * </Female Sideview Weapons>
 *
 * ---
 *
 * === Enemy-Related Notetags ===
 *
 * ---
 *
 * <Battler Sprite Cannot Move>
 *
 * - Used for: Enemy Notetags
 * - Prevents the enemy from being able to move, jump, and/or float due to
 *   Action Sequences. Useful for rooted enemies.
 *
 * ---
 * 
 * <Battler Sprite Grounded>
 *
 * - Used for: Enemy Notetags
 * - Prevents the enemy from being able to jumping and/or floating due to
 *   Action Sequences but still able to move. Useful for rooted enemies.
 * 
 * ---
 *
 * <Swap Enemies>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Swap Enemies>
 *
 * - Used for: Enemy Notetags
 * - Causes this enemy database object to function as a randomizer for any of
 *   the listed enemies inside the notetag. When the enemy is loaded into the
 *   battle scene, the enemy is immediately replaced with one of the enemies
 *   listed. The randomization is based off the 'weight' given to each of the
 *   enemy 'names'.
 * - Replace 'name' with the database enemy of the enemy you wish to replace
 *   the enemy with.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Swap Enemies>
 *  Bat: 50
 *  Slime: 25
 *  Orc
 *  Minotaur
 * </Swap Enemies>
 *
 * ---
 *
 * === JavaScript Notetags: Mechanics-Related ===
 *
 * These JavaScript notetags allow you to run code at specific instances during
 * battle provided that the unit has that code associated with them in a trait
 * object (actor, class, weapon, armor, enemy, or state). How you use these is
 * entirely up to you and will depend on your ability to understand the code
 * used and driven for each case.
 *
 * ---
 *
 * <JS Pre-Start Battle>
 *  code
 *  code
 *  code
 * </JS Pre-Start Battle>
 *
 * <JS Post-Start Battle>
 *  code
 *  code
 *  code
 * </JS Post-Start Battle>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of battle aimed at the function:
 *   BattleManager.startBattle()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Start Turn>
 *  code
 *  code
 *  code
 * </JS Pre-Start Turn>
 *
 * <JS Post-Start Turn>
 *  code
 *  code
 *  code
 * </JS Post-Start Turn>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of a turn aimed at the function:
 *   BattleManager.startTurn()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Start Action>
 *  code
 *  code
 *  code
 * </JS Pre-Start Action>
 *
 * <JS Post-Start Action>
 *  code
 *  code
 *  code
 * </JS Post-Start Action>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of an action aimed at the function:
 *   BattleManager.startAction()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Apply>
 *  code
 *  code
 *  code
 * </JS Pre-Apply>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code at the start of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Pre' runs before the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Apply as User>
 *  code
 *  code
 *  code
 * </JS Pre-Apply as User>
 *
 * <JS Pre-Apply as Target>
 *  code
 *  code
 *  code
 * </JS Pre-Apply as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Pre' runs before the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Damage>
 *  code
 *  code
 *  code
 * </JS Pre-Damage>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code before damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Pre' runs before the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Damage as User>
 *  code
 *  code
 *  code
 * </JS Pre-Damage as User>
 *
 * <JS Pre-Damage as Target>
 *  code
 *  code
 *  code
 * </JS Pre-Damage as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code before damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Pre' runs before the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Damage>
 *  code
 *  code
 *  code
 * </JS Post-Damage>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code after damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Damage as User>
 *  code
 *  code
 *  code
 * </JS Post-Damage as User>
 *
 * <JS Post-Damage as Target>
 *  code
 *  code
 *  code
 * </JS Post-Damage as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code after damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Apply>
 *  code
 *  code
 *  code
 * </JS Post-Apply>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code at the end of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Apply as User>
 *  code
 *  code
 *  code
 * </JS Post-Apply as User>
 *
 * <JS Post-Apply as Target>
 *  code
 *  code
 *  code
 * </JS Post-Apply as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 *
 * ---
 *
 * <JS Pre-End Action>
 *  code
 *  code
 *  code
 * </JS Pre-End Action>
 *
 * <JS Post-End Action>
 *  code
 *  code
 *  code
 * </JS Post-End Action>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of an action aimed at the function:
 *   BattleManager.endAction()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-End Turn>
 *  code
 *  code
 *  code
 * </JS Pre-End Turn>
 *
 * <JS Post-End Turn>
 *  code
 *  code
 *  code
 * </JS Post-End Turn>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of a turn aimed at the function:
 *   Game_Battler.prototype.onTurnEnd()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Regenerate>
 *  code
 *  code
 *  code
 * </JS Pre-Regenerate>
 *
 * <JS Post-Regenerate>
 *  code
 *  code
 *  code
 * </JS Post-Regenerate>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a unit regenerates HP/MP aimed at the function:
 *   Game_Battler.prototype.regenerateAll()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Battle Victory>
 *  code
 *  code
 *  code
 * </JS Battle Victory>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a battle is won aimed at the function:
 *   BattleManager.processVictory()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Escape Success>
 *  code
 *  code
 *  code
 * </JS Escape Success>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when escaping succeeds aimed at the function:
 *   BattleManager.onEscapeSuccess()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Escape Failure>
 *  code
 *  code
 *  code
 * </JS Escape Failure>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when escaping fails aimed at the function:
 *   BattleManager.onEscapeFailure()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Battle Defeat>
 *  code
 *  code
 *  code
 * </JS Battle Defeat>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a battle is lost aimed at the function:
 *   BattleManager.processDefeat()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-End Battle>
 *  code
 *  code
 *  code
 * </JS Pre-End Battle>
 *
 * <JS Post-End Battle>
 *  code
 *  code
 *  code
 * </JS Post-End Battle>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when the battle is over aimed at the function:
 *   BattleManager.endBattle()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 * 
 * === Battle Layout-Related Notetags ===
 * 
 * These tags will change the battle layout for a troop regardless of how the
 * plugin parameters are set up normally. Insert these tags in either the
 * noteboxes of maps or the names of troops for them to take effect. If both
 * are present for a specific battle, then priority goes to the setting found
 * in the troop name.
 * 
 * ---
 * 
 * <Layout: type>
 * <Battle Layout: type>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle layout style used for this specific map or battle.
 * - Replace 'type' with 'default', 'list', 'xp', 'portrait', or 'border'.
 * 
 * ---
 *
 * ============================================================================
 * Action Sequence - Plugin Commands
 * ============================================================================
 *
 * Skills and items, when used in battle, have a pre-determined series of
 * actions to display to the player as a means of representing what's going on
 * with the action. For some game devs, this may not be enough and they would
 * like to get more involved with the actions themselves.
 *
 * Action Sequences, added through this plugin, enable this. To give a skill or
 * item a Custom Action Sequence, a couple of steps must be followed:
 *
 * ---
 *
 * 1. Insert the <Custom Action Sequence> notetag into the skill or item's
 *    notebox (or else this would not work as intended).
 * 2. Give that skill/item a Common Event through the Effects box. The selected
 *    Common Event will contain all the Action Sequence data.
 * 3. Create the Common Event with Action Sequence Plugin Commands and/or event
 *    commands to make the skill/item do what you want it to do.
 *
 * ---
 *
 * The Plugin Commands added through the Battle Core plugin focus entirely on
 * Action Sequences. However, despite the fact that they're made for skills and
 * items, some of these Action Sequence Plugin Commands can still be used for
 * regular Troop events and Common Events.
 *
 * ---
 *
 * === Action Sequence - Action Sets ===
 *
 * Action Sequence Action Sets are groups of commonly used
 * Action Sequence Commands put together for more efficient usage.
 *
 * ---
 *
 * ACSET: Setup Action Set
 * - The generic start to most actions.
 *
 *   Display Action:
 *   Immortal: On:
 *   Battle Step:
 *   Wait For Movement:
 *   Cast Animation:
 *   Wait For Animation:
 *   - Use this part of the action sequence?
 *
 * ---
 *
 * ACSET: All Targets Action Set
 * - Affects all targets simultaneously performing the following.
 *
 *   Dual/Multi Wield?
 *   - Add times struck based on weapon quantity equipped?
 * 
 *   Perform Action:
 *   Wait Count:
 *   Action Animation:
 *   Wait For Animation:
 *   Action Effect:
 *   Immortal: Off:
 *   - Use this part of the action sequence?
 *   - Insert values for the Wait Count(s).
 *
 * ---
 *
 * ACSET: Each Target Action Set
 * - Goes through each target one by one to perform the following.
 *
 *   Dual/Multi Wield?
 *   - Add times struck based on weapon quantity equipped?
 *
 *   Perform Action:
 *   Wait Count:
 *   Action Animation:
 *   Wait Count:
 *   Action Effect:
 *   Immortal: Off:
 *   - Use this part of the action sequence?
 *   - Insert values for the Wait Count(s).
 *
 * ---
 *
 * ACSET: Finish Action
 * - The generic ending to most actions.
 *
 *   Wait For New Line:
 *   Wait For Effects:
 *   Clear Battle Log:
 *   Home Reset:
 *   Wait For Movement:
 *   - Use this part of the action sequence?
 *
 * ---
 * 
 * === Action Sequences - Angle ===
 * 
 * These action sequences allow you to have control over the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * ---
 *
 * ANGLE: Change Angle
 * - Changes the camera angle.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Angle:
 *   - Change the camera angle to this many degrees.
 *
 *   Duration:
 *   - Duration in frames to change camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Reset Angle
 * - Reset any angle settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Wait For Angle
 * - Waits for angle changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Animations ===
 *
 * These Action Sequences are related to the 'Animations' that can be found in
 * the Animations tab of the Database.
 *
 * ---
 *
 * ANIM: Action Animation
 * - Plays the animation associated with the action.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Attack Animation
 * - Plays the animation associated with the user's weapon.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Attack Animation 2+
 * - Plays the animation associated with the user's other weapons.
 * - Plays nothing if there is no other weapon equipped.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 * 
 *   Slot:
 *   - Which weapon slot to get this data from?
 *   - Main-hand weapon is weapon slot 1.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Cast Animation
 * - Plays the cast animation associated with the action.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Change Battle Portrait
 * - Changes the battle portrait of the actor (if it's an actor).
 * - Can be used outside of battle/action sequences.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *   - Valid units can only be actors.
 *
 *   Filename:
 *   - Select the file to change the actor's portrait to.
 *
 * ---
 *
 * ANIM: Show Animation
 * - Plays the a specific animation on unit(s).
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Animation ID:
 *   - Select which animation to play on unit(s).
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Wait For Animation
 * - Causes the interpreter to wait for any animation(s) to finish.
 *
 * ---
 *
 * === Action Sequences - Battle Log ===
 *
 * These Action Sequences are related to the Battle Log Window, the window
 * found at the top of the battle screen.
 *
 * ---
 *
 * BTLOG: Add Text
 * - Adds a new line of text into the Battle Log.
 *
 *   Text:
 *   - Add this text into the Battle Log.
 *   - Text codes allowed.
 * 
 *   Copy to Combat Log?:
 *   - Copies text to the Combat Log.
 *   - Requires VisuMZ_4_CombatLog
 * 
 *     Combat Log Icon:
 *     - What icon would you like to bind to this entry?
 *     - Requires VisuMZ_4_CombatLog
 *
 * ---
 *
 * BTLOG: Clear Battle Log
 * - Clears all the text in the Battle Log.
 *
 * ---
 *
 * BTLOG: Display Action
 * - plays the current action in the Battle Log.
 *
 * ---
 *
 * BTLOG: Pop Base Line
 * - Removes the Battle Log's last added base line and  all text up to its
 *   former location.
 *
 * ---
 *
 * BTLOG: Push Base Line
 * - Adds a new base line to where the Battle Log currently is at.
 *
 * ---
 *
 * BTLOG: Refresh Battle Log
 * - Refreshes the Battle Log.
 *
 * ---
 *
 * BTLOG: UI Show/Hide
 * - Shows or hides the Battle UI (including the Battle Log).
 *
 *   Show/Hide?:
 *   - Shows/hides the Battle UI.
 *
 * ---
 *
 * BTLOG: Wait For Battle Log
 * - Causes the interpreter to wait for the Battle Log to finish.
 *
 * ---
 *
 * BTLOG: Wait For New Line
 * - Causes the interpreter to wait for a new line in the Battle Log.
 *
 * ---
 *
 * === Action Sequences - Camera ===
 *
 * These Action Sequences are battle camera-related.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * CAMERA: Clamp ON/OFF
 * - Turns battle camera clamping on/off.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Setting:
 *   - Turns camera clamping on/off.
 *
 * ---
 *
 * CAMERA: Focus Point
 * - Focus the battle camera on a certain point in the screen.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   X Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Focus Target(s)
 * - Focus the battle camera on certain battler target(s).
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Targets:
 *   - Select unit(s) to focus the battle camera on.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Offset
 * - Offset the battle camera from the focus target.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Offset X:
 *   - How much to offset the camera X by.
 *   - Negative: left. Positive: right.
 *
 *   Offset Y:
 *   - How much to offset the camera Y by.
 *   - Negative: up. Positive: down.
 *
 *   Duration:
 *   - Duration in frames for offset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Reset
 * - Reset the battle camera settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Reset Focus?:
 *   - Reset the focus point?
 *
 *   Reset Offset?:
 *   - Reset the camera offset?
 *
 *   Duration:
 *   - Duration in frames for reset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Wait For Camera
 * - Waits for camera changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Dragonbones ===
 *
 * These Action Sequences are Dragonbones-related.
 * Requires VisuMZ_2_DragonbonesUnion!
 *
 * ---
 *
 * DB: Dragonbones Animation
 * - Causes the unit(s) to play a Dragonbones motion animation.
 * - Requires VisuMZ_2_DragonbonesUnion!
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion animation.
 *
 *   Motion Animation:
 *   - What is the name of the Dragonbones motion animation you wish to play?
 *
 * ---
 *
 * DB: Dragonbones Time Scale
 * - Causes the unit(s) to change their Dragonbones time scale.
 * - Requires VisuMZ_2_DragonbonesUnion!
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion animation.
 *
 *   Time Scale:
 *   - Change the value of the Dragonbones time scale to this.
 *
 * ---
 *
 * === Action Sequences - Elements ===
 *
 * These Action Sequences can change up the element(s) used for the action's
 * damage calculation midway through an action.
 *
 * They also require the VisuMZ_1_ElementStatusCore plugin to be present in
 * order for them to work.
 *
 * ---
 *
 * ELE: Add Elements
 * - Adds element(s) to be used when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 *   Elements:
 *   - Select which element ID to add onto the action.
 *   - Insert multiple element ID's to add multiple at once.
 *
 * ---
 *
 * ELE: Clear Element Changes
 * - Clears all element changes made through Action Sequences.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 * ---
 *
 * ELE: Force Elements
 * - Forces only specific element(s) when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 *   Elements:
 *   - Select which element ID to force in the action.
 *   - Insert multiple element ID's to force multiple at once.
 *
 * ---
 *
 * ELE: Null Element
 * - Forces no element to be used when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 * ---
 * 
 * === Action Sequences - Horror Effects ===
 * 
 * These Action Sequences are Horror Effects-related.
 * Requires VisuMZ_2_HorrorEffects!
 * 
 * ---
 *
 * HORROR: Clear All Filters
 * - Clear all Horror Effects filters on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove Horror Effects for.
 *
 * ---
 *
 * HORROR: Glitch Create
 * - Creates the glitch effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to create the Horror Effect for.
 *
 *   Glitch Slices:
 *   - Glitch slices to be used with the target.
 *
 *   Glitch Offset:
 *   - Default offset value.
 *
 *   Glitch Animated?:
 *   - Animate the glitch effect?
 *
 *   Glitch Frequency:
 *   - If animated, how frequent to make the glitch effect?
 *   - Lower = often     Higher = rarer
 *
 *   Glitch Strength:
 *   - If animated, how strong is the glitch effect?
 *   - Lower = weaker     Higher = stronger
 *
 * ---
 *
 * HORROR: Glitch Remove
 * - Removes the glitch effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove the Horror Effect for.
 *
 * ---
 *
 * HORROR: Noise Create
 * - Creates the noise effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to create the Horror Effect for.
 *
 *   Noise Rate:
 *   - Noise rate to be used with the target.
 *
 *   Noise Animated:
 *   - Animate the noise for the target?
 *
 * ---
 *
 * HORROR: Noise Remove
 * - Removes the noise effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove the Horror Effect for.
 *
 * ---
 *
 * HORROR: TV Create
 * - Creates the TV effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to create the Horror Effect for.
 *
 *   TV Line Thickness:
 *   - Default TV line thickness
 *   - Lower = thinner     Higher = thicker
 *
 *   TV Corner Size:
 *   - Default TV line corner size
 *   - Lower = smaller     Higher = bigger
 *
 *   TV Animated:
 *   - Animate the TV?
 *
 *   TV Speed:
 *   - Speed used to animate the TV if animated
 *   - Lower = slower     Higher = faster
 *
 * ---
 *
 * HORROR: TV Remove
 * - Removes the TV effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove the Horror Effect for.
 *
 * ---
 * 
 * === Action Sequences - Impact ===
 * 
 * These Action Sequences are related to creating impact.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * ---
 *
 * IMPACT: Color Break
 * - Breaks the colors on the screen before reassembling.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Intensity:
 *   - What is the intensity of the color break effect?
 *
 *   Duration:
 *   - What is the duration of the color break effect?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Blur Screen
 * - Creates a motion blur on the whole screen.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Angle:
 *   - Determine what angle to make the motion blur at.
 *
 *   Intensity Rate:
 *   - This determines intensity rate of the motion blur.
 *   - Use a number between 0 and 1.
 *
 *   Duration:
 *   - How many frames should the motion blur last?
 *   - What do you want to be its duration?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Blur Target(s)
 * - Creates a motion blur on selected target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to create motion blur effects for.
 *
 *   Angle:
 *   - Determine what angle to make the motion blur at.
 *
 *   Intensity Rate:
 *   - This determines intensity rate of the motion blur.
 *   - Use a number between 0 and 1.
 *
 *   Duration:
 *   - How many frames should the motion blur last?
 *   - What do you want to be its duration?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Trail Create
 * - Creates a motion trail effect for the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to create motion trail effects for.
 *
 *   Delay:
 *   - How many frames to delay by when creating a motion trail?
 *   - The higher the delay, the less motion trails there are.
 *
 *   Duration:
 *   - How many frames should the motion trail last?
 *   - What do you want to be its duration?
 *
 *   Hue:
 *   - What do you want to be the hue for the motion trail?
 *
 *   Starting Opacity:
 *   - What starting opacity value do you want for the motion trail?
 *   - Opacity values decrease over time.
 *
 *   Tone:
 *   - What tone do you want for the motion trail?
 *   - Format: [Red, Green, Blue, Gray]
 *
 * ---
 *
 * IMPACT: Motion Trail Remove
 * - Removes the motion trail effect from the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to clear motion trail effects for.
 *
 * ---
 *
 * IMPACT: Shockwave at Point
 * - Creates a shockwave at the designated coordinates.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Point: X:
 *   Point: Y:
 *   - What x/y coordinate do you want to create a shockwave at?
 *   - You can use JavaScript code.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Shockwave from Each Target(s)
 * - Creates a shockwave at each of the target(s) location(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a shockwave from.
 *
 *   Target Location:
 *   - Select which part target group to start a shockwave from.
 * 
 *     Offset X:
 *     Offset Y:
 *     - How much to offset the shockwave X/Y point by.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Shockwave from Target(s) Center
 * - Creates a shockwave from the center of the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a shockwave from.
 *
 *   Target Location:
 *   - Select which part target group to start a shockwave from.
 * 
 *     Offset X:
 *     Offset Y:
 *     - How much to offset the shockwave X/Y point by.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Zoom Blur at Point
 * - Creates a zoom blur at the designated coordinates.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Point: X:
 *   Point: Y:
 *   - What x/y coordinate do you want to focus the zoom at?
 *   - You can use JavaScript code.
 *
 *   Zoom Strength:
 *   - What is the strength of the zoom effect?
 *   - Use a number between 0 and 1.
 *
 *   Visible Radius:
 *   - How much of a radius should be visible from the center?
 *
 *   Duration:
 *   - What is the duration of the zoom blur?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Zoom Blur at Target(s) Center
 * - Creates a zoom blur at the center of targets.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a zoom blur from.
 *
 *   Target Location:
 *   - Select which part target group to start a zoom blur from.
 * 
 *     Offset X:
 *     Offset Y:
 *     - How much to offset the zoom blur X/Y point by.
 *
 *   Zoom Strength:
 *   - What is the strength of the zoom effect?
 *   - Use a number between 0 and 1.
 *
 *   Visible Radius:
 *   - How much of a radius should be visible from the center?
 *
 *   Duration:
 *   - What is the duration of the zoom blur?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * === Action Sequences - Mechanics ===
 *
 * These Action Sequences are related to various mechanics related to the
 * battle system.
 *
 * ---
 *
 * MECH: Action Effect
 * - Causes the unit(s) to take damage/healing from action and incurs any
 *   changes made such as buffs and states.
 *
 *   Targets:
 *   - Select unit(s) to receive the current action's effects.
 *
 * ---
 *
 * MECH: Add Buff/Debuff
 * - Adds buff(s)/debuff(s) to unit(s). 
 * - Determine which parameters are affected and their durations.
 *
 *   Targets:
 *   - Select unit(s) to receive the buff(s) and/or debuff(s).
 *
 *   Buff Parameters:
 *   - Select which parameter(s) to buff.
 *   - Insert a parameter multiple times to raise its stacks.
 *
 *   Debuff Parameters:
 *   - Select which parameter(s) to debuff.
 *   - Insert a parameter multiple times to raise its stacks.
 *
 *   Turns:
 *   - Number of turns to set the parameter(s) buffs to.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * MECH: Add State
 * - Adds state(s) to unit(s).
 *
 *   Targets:
 *   - Select unit(s) to receive the buff(s).
 *
 *   States:
 *   - Select which state ID(s) to add to unit(s).
 *   - Insert multiple state ID's to add multiple at once.
 *
 * ---
 * 
 * MECH: Analyze Weakness
 * - Reveal elemental weakness(es) from target(s).
 * - Requires VisuMZ_3_WeaknessDisplay!
 * 
 *   Targets:
 *   - Select unit(s) to reveal elemental weaknesses for.
 * 
 *   Reveal:
 *   - How many elemental weaknesses do you wish to reveal?
 *   - You may use JavaScript code.
 * 
 * ---
 *
 * MECH: Armor Penetration
 * - Adds an extra layer of defensive penetration/reduction.
 * - You may use JavaScript code for any of these.
 *
 *   Armor/Magic Penetration:
 *
 *     Rate:
 *     - Penetrates an extra multiplier of armor by this value.
 *
 *     Flat:
 *     - Penetrates a flat amount of armor by this value.
 *
 *   Armor/Magic Reduction:
 *
 *     Rate:
 *     - Reduces an extra multiplier of armor by this value.
 *
 *     Flat:
 *     - Reduces a flat amount of armor by this value.
 *
 * ---
 * 
 * MECH: ATB Gauge
 * - Alters the ATB/TPB Gauges.
 * - Requires VisuMZ_2_BattleSystemATB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the ATB/TPB Gauges for.
 * 
 *   Charging:
 *   
 *     Charge Rate:
 *     - Changes made to the ATB Gauge if it is currently charging.
 * 
 *   Casting:
 *   
 *     Cast Rate:
 *     - Changes made to the ATB Gauge if it is currently casting.
 *   
 *     Interrupt?:
 *     - Interrupt the ATB Gauge if it is currently casting?
 * 
 * ---
 * 
 * MECH: Boost Points Change
 * - Changes Boost Points for target(s).
 * - Requires VisuMZ_3_BoostAction!
 * 
 *   Targets:
 *   - Select unit(s) to alter the Boost Points for.
 * 
 *   Alter Boost Points By:
 *   - Alters the unit(s) Boost Points.
 *   - Positive for gaining points. Negative for losing points.
 * 
 * ---
 * 
 * MECH: Boost Store Data
 * - Stores the number of Boosts used this action inside a variable.
 * - Requires VisuMZ_3_BoostAction!
 * 
 *   Variable ID:
 *   - Which variable do you want to store the data inside?
 * 
 * ---
 * 
 * MECH: Break Shield Change
 * - Changes Break Shields for target(s) if not Break Stunned.
 * - Requires VisuMZ_4_BreakShields!
 * 
 *   Targets:
 *   - Select unit(s) to alter the Break Shields for.
 * 
 *   Alter Break Shields By:
 *   - Alters the unit(s) Break Shields.
 *   - Positive for gaining shields. Negative for losing shields.
 * 
 * ---
 * 
 * MECH: Break Shield Reset
 * - Resets Break Shields for target(s) if not Break Stunned.
 * - Requires VisuMZ_4_BreakShields!
 * 
 *   Targets:
 *   - Select unit(s) to reset the Break Shields for.
 * 
 * ---
 * 
 * MECH: BTB Brave Points
 * - Alters the target(s) Brave Points to an exact value.
 * - Requires VisuMZ_2_BattleSystemBTB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the ATB/TPB Gauges for.
 * 
 *   Alter Brave Points By:
 *   - Alters the target(s) Brave Points.
 *   - Positive for gaining BP.
 *   - Negative for losing BP.
 * 
 * ---
 *
 * MECH: Collapse
 * - Causes the unit(s) to perform its collapse animation if the unit(s)
 *   has died.
 *
 *   Targets:
 *   - Select unit(s) to process a death collapse.
 *
 *   Force Death:
 *   - Force death even if the unit has not reached 0 HP?
 *   - This will remove immortality.
 *
 *   Wait For Effect?:
 *   - Wait for the collapse effect to complete before performing next command?
 *
 * ---
 * 
 * MECH: CTB Order
 * - Alters the CTB Turn Order.
 * - Requires VisuMZ_2_BattleSystemCTB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the CTB Turn Order for.
 * 
 *   Change Order By:
 *   - Changes turn order for target(s) by this amount.
 *   - Positive increases wait. Negative decreases wait.
 * 
 * ---
 * 
 * MECH: CTB Speed
 * - Alters the CTB Speed.
 * - Requires VisuMZ_2_BattleSystemCTB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the CTB Speed for.
 * 
 *   Charge Rate:
 *   - Changes made to the CTB Speed if it is currently charging.
 * 
 *   Cast Rate:
 *   - Changes made to the CTB Speed if it is currently casting.
 * 
 * ---
 * 
 * MECH: Custom Damage Formula
 * - Changes the current action's damage formula to custom.
 * - This will assume the MANUAL damage style.
 * 
 *   Formula:
 *   - Changes the current action's damage formula to custom.
 *   - Use 'default' to revert the damage formula.
 * 
 * ---
 *
 * MECH: Damage Popup
 * - Causes the unit(s) to display the current state of damage received
 *   or healed.
 *
 *   Targets:
 *   - Select unit(s) to prompt a damage popup.
 *
 * ---
 *
 * MECH: Dead Label Jump
 * - If the active battler is dead, jump to a specific label in the
 *   common event.
 *
 *   Jump To Label:
 *   - If the active battler is dead, jump to this specific label in the
 *     common event.
 *
 * ---
 *
 * MECH: HP, MP, TP
 * - Alters the HP, MP, and TP values for unit(s).
 * - Positive values for healing. Negative values for damage.
 *
 *   Targets:
 *   - Select unit(s) to receive the current action's effects.
 *
 *   HP, MP, TP:
 *
 *     Rate:
 *     - Changes made to the parameter based on rate.
 *     - Positive values for healing. Negative values for damage.
 *
 *     Flat:
 *     - Flat changes made to the parameter.
 *     - Positive values for healing. Negative values for damage.
 *
 *   Damage Popup?:
 *   - Display a damage popup after?
 *
 * ---
 *
 * MECH: Immortal
 * - Changes the immortal flag of targets. If immortal flag is removed and a
 *   unit would die, collapse that unit.
 *
 *   Targets:
 *   - Alter the immortal flag of these groups. If immortal flag is removed and
 *     a unit would die, collapse that unit.
 *
 *   Immortal:
 *   - Turn immortal flag for unit(s) on/off?
 *
 * ---
 *
 * MECH: Multipliers
 * - Changes the multipliers for the current action.
 * - You may use JavaScript code for any of these.
 *
 *   Critical Hit%:
 *
 *     Rate:
 *     - Affects chance to land a critical hit by this multiplier.
 *
 *     Flat:
 *     - Affects chance to land a critical hit by this flat bonus.
 *
 *   Critical Damage
 *
 *     Rate:
 *     - Affects critical damage by this multiplier.
 *
 *     Flat:
 *     - Affects critical damage by this flat bonus.
 *
 *   Damage/Healing
 *
 *     Rate:
 *     - Sets the damage/healing multiplier for current action.
 *
 *     Flat:
 *     - Sets the damage/healing bonus for current action.
 *
 *   Hit Rate
 *
 *     Rate:
 *     - Affects chance to connect attack by this multiplier.
 *
 *     Flat:
 *     - Affects chance to connect attack by this flat bonus.
 *
 * ---
 *
 * MECH: Remove Buff/Debuff
 * - Removes buff(s)/debuff(s) from unit(s). 
 * - Determine which parameters are removed.
 *
 *   Targets:
 *   - Select unit(s) to have the buff(s) and/or debuff(s) removed.
 *
 *   Buff Parameters:
 *   - Select which buffed parameter(s) to remove.
 *
 *   Debuff Parameters:
 *   - Select which debuffed parameter(s) to remove.
 *
 * ---
 *
 * MECH: Remove State
 * - Remove state(s) from unit(s).
 *
 *   Targets:
 *   - Select unit(s) to have states removed from.
 *
 *   States:
 *   - Select which state ID(s) to remove from unit(s).
 *   - Insert multiple state ID's to remove multiple at once.
 *
 * ---
 * 
 * MECH: STB Exploit Effect
 * - Utilize the STB Exploitation mechanics!
 * - Requires VisuMZ_2_BattleSystemSTB!
 * 
 *   Target(s) Exploited?:
 *   - Exploit the below targets?
 * 
 *     Targets:
 *     - Select unit(s) to become exploited.
 * 
 *     Force Exploitation:
 *     - Force the exploited status?
 * 
 *   User Exploiter?:
 *   - Allow the user to become the exploiter?
 * 
 *     Force Exploitation:
 *     - Force the exploiter status?
 * 
 * ---
 * 
 * MECH: STB Extra Action
 * - Adds an extra action for the currently active battler.
 * - Requires VisuMZ_2_BattleSystemSTB!
 * 
 *   Extra Actions:
 *   - How many extra actions should the active battler gain?
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * MECH: STB Remove Excess Actions
 * - Removes excess actions from the active battler.
 * - Requires VisuMZ_2_BattleSystemSTB!
 * 
 *   Remove Actions:
 *   - How many actions to remove from the active battler?
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * MECH: Swap Weapon
 * - Causes the unit(s) to swap their weapon for another.
 * - Requires VisuMZ_2_WeaponSwapSystem!
 * 
 *   Targets:
 *   - Select unit(s) to swap weapons for.
 * 
 *   Weapon Type ID:
 *   - Which weapon type to swap to?
 *   - This is NOT the weapon's ID.
 *   - It's the weapon TYPE.
 * 
 * ---
 * 
 * MECH: Text Popup
 * - Causes the unit(s) to display a text popup.
 * 
 *   Targets:
 *   - Select unit(s) to prompt a text popup.
 * 
 *   Text:
 *   - What text do you wish to display?
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 * 
 * ---
 * 
 * MECH: Variable Popup
 * - Causes the unit(s) to display a popup using the data stored inside
 *   a variable.
 * 
 *   Targets:
 *   - Select unit(s) to prompt a text popup.
 * 
 *   Variable:
 *   - Get data from which variable to display as a popup?
 * 
 *   Digit Grouping:
 *   - Use digit grouping to separate numbers?
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 * 
 * ---
 *
 * MECH: Wait For Effect
 * - Waits for the effects to complete before performing next command.
 *
 * ---
 *
 * === Action Sequences - Motion ===
 *
 * These Action Sequences allow you the ability to control the motions of
 * sideview sprites.
 *
 * ---
 * 
 * MOTION: Clear Freeze Frame
 * - Clears any freeze frames from the unit(s).
 * 
 *   Targets:
 *   - Select which unit(s) to clear freeze frames for.
 * 
 * ---
 * 
 * MOTION: Freeze Motion Frame
 * - Forces a freeze frame instantly at the selected motion.
 * - Automatically clears with a new motion.
 * 
 *   Targets:
 *   - Select which unit(s) to freeze motions for.
 * 
 *   Motion Type:
 *   - Freeze this motion for the unit(s).
 * 
 *   Frame Index:
 *   - Which frame do you want to freeze the motion on?
 *   - Frame index values start at 0.
 * 
 *   Show Weapon?:
 *   - If using 'attack', 'thrust', 'swing', or 'missile', display the
 *     weapon sprite?
 * 
 * ---
 *
 * MOTION: Motion Type
 * - Causes the unit(s) to play the selected motion.
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion.
 *
 *   Motion Type:
 *   - Play this motion for the unit(s).
 *
 *   Show Weapon?:
 *   - If using 'attack', 'thrust', 'swing', or 'missile', display the
 *     weapon sprite?
 *
 * ---
 *
 * MOTION: Perform Action
 * - Causes the unit(s) to play the proper motion based on the current action.
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion.
 *
 * ---
 *
 * MOTION: Refresh Motion
 * - Cancels any set motions unit(s) has to do and use their most natural
 *   motion at the moment.
 *
 *   Targets:
 *   - Select which unit(s) to refresh their motion state.
 *
 * ---
 *
 * MOTION: Wait By Motion Frame
 * - Creates a wait equal to the number of motion frames passing.
 * - Time is based on Plugin Parameters => Actors => Motion Speed.
 *
 *   Motion Frames to Wait?:
 *   - Each "frame" is equal to the value found in 
 *     Plugin Parameters => Actors => Motion Speed
 *
 * ---
 *
 * === Action Sequences - Movement ===
 *
 * These Action Sequences allow you the ability to control the sprites of
 * actors and enemies in battle.
 *
 * ---
 *
 * MOVE: Battle Step
 * - Causes the unit(s) to move forward past their home position to prepare
 *   for action.
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Face Direction
 * - Causes the unit(s) to face forward or backward.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change direction.
 *
 *   Direction:
 *   - Select which direction to face.
 *
 * ---
 *
 * MOVE: Face Point
 * - Causes the unit(s) to face a point on the screen.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change direction.
 *
 *   Point:
 *   - Select which point to face.
 *     - Home
 *     - Center
 *     - Point X, Y
 *       - Replace 'x' and 'y' with coordinates
 *
 *   Face Away From?:
 *   - Face away from the point instead?
 *
 * ---
 *
 * MOVE: Face Target(s)
 * - Causes the unit(s) to face other targets on the screen.
 * - Sideview-only!
 *
 *   Targets (facing):
 *   - Select which unit(s) to change direction.
 *
 *   Targets (destination):
 *   - Select which unit(s) for the turning unit(s) to face.
 *
 *   Face Away From?:
 *   - Face away from the unit(s) instead?
 *
 * ---
 *
 * MOVE: Float
 * - Causes the unit(s) to float above the ground.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to make float.
 *
 *   Desired Height:
 *   - Vertical distance to float upward.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total float amount.
 *
 *   Float Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Float?:
 *   - Wait for floating to complete before performing next command?
 *
 * ---
 *
 * MOVE: Home Reset
 * - Causes the unit(s) to move back to their home position(s) and face back to
 *   their original direction(s).
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Jump
 * - Causes the unit(s) to jump into the air.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to make jump.
 *
 *   Desired Height:
 *   - Max jump height to go above the ground
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total jump amount.
 *
 *   Wait For Jump?:
 *   - Wait for jumping to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move Distance
 * - Moves unit(s) by a distance from their current position(s).
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Distance Adjustment:
 *   - Makes adjustments to distance values to determine which direction to
 *     move unit(s).
 *     - Normal - No adjustments made
 *     - Horizontal - Actors adjust left, Enemies adjust right
 *     - Vertical - Actors adjust Up, Enemies adjust down
 *     - Both - Applies both Horizontal and Vertical
 *
 *     Distance: X:
 *     - Horizontal distance to move.
 *     - You may use JavaScript code.
 *
 *     Distance: Y:
 *     - Vertical distance to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move To Point
 * - Moves unit(s) to a designated point on the screen.
 * - Sideview-only! Points based off Graphics.boxWidth/Height.
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Destination Point:
 *   - Select which point to face.
 *     - Home
 *     - Center
 *     - Point X, Y
 *       - Replace 'x' and 'y' with coordinates
 *
 *   Offset Adjustment:
 *   - Makes adjustments to offset values to determine which direction to
 *     adjust the destination by.
 *
 *     Offset: X:
 *     - Horizontal offset to move.
 *     - You may use JavaScript code.
 *
 *     Offset: Y:
 *     - Vertical offset to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move To Target(s)
 * - Moves unit(s) to another unit(s) on the battle field.
 * - Sideview-only!
 *
 *   Targets (Moving):
 *   - Select which unit(s) to move.
 *
 *   Targets (Destination):
 *   - Select which unit(s) to move to.
 *
 *     Target Location:
 *     - Select which part target group to move to.
 *       - front head
 *       - front center
 *       - front base
 *       - middle head
 *       - middle center
 *       - middle base
 *       - back head
 *       - back center
 *       - back base
 *
 *     Melee Distance:
 *     - The melee distance away from the target location in addition to the
 *       battler's width.
 *
 *   Offset Adjustment:
 *   - Makes adjustments to offset values to determine which direction to
 *     adjust the destination by.
 *
 *     Offset: X:
 *     - Horizontal offset to move.
 *     - You may use JavaScript code.
 *
 *     Offset: Y:
 *     - Vertical offset to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Opacity
 * - Causes the unit(s) to change opacity.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change opacity.
 *
 *   Desired Opacity:
 *   - Change to this opacity value.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for opacity change.
 *
 *   Opacity Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Opacity?:
 *   - Wait for opacity changes to complete before performing next command?
 *
 * ---
 *
 * MOVE: Scale/Grow/Shrink
 * - Causes the unit(s) to scale, grow, or shrink?.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change the scale of.
 *
 *   Scale X:
 *   Scale Y:
 *   - What target scale value do you want?
 *   - 1.0 is normal size.
 *
 *   Duration:
 *   - Duration in frames to scale for.
 *
 *   Scale Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Scale?:
 *   - Wait for scaling to complete before performing next command?
 *
 * ---
 *
 * MOVE: Skew/Distort
 * - Causes the unit(s) to skew.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to skew.
 *
 *   Skew X:
 *   Skew Y:
 *   - What variance to skew?
 *   - Use small values for the best results.
 *
 *   Duration:
 *   - Duration in frames to skew for.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew to complete before performing next command?
 *
 * ---
 *
 * MOVE: Spin/Rotate
 * - Causes the unit(s) to spin.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to spin.
 *
 *   Angle:
 *   - How many degrees to spin?
 *
 *   Duration:
 *   - Duration in frames to spin for.
 *
 *   Spin Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Revert Angle on Finish:
 *   - Upon finishing the spin, revert the angle back to 0.
 *
 *   Wait For Spin?:
 *   - Wait for spin to complete before performing next command?
 *
 * ---
 *
 * MOVE: Wait For Float
 * - Waits for floating to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Jump
 * - Waits for jumping to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Movement
 * - Waits for movement to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Opacity
 * - Waits for opacity changes to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Scale
 * - Waits for scaling to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Skew
 * - Waits for skewing to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Spin
 * - Waits for spinning to complete before performing next command.
 *
 * ---
 * 
 * === Action Sequences - Projectiles ===
 * 
 * Create projectiles on the screen and fire them off at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 * 
 * ---
 *
 * PROJECTILE: Animation
 * - Create an animation projectile and fire it at a target.
 * - Requires VisuMZ_3_ActSeqProjectiles!
 *
 *   Coordinates:
 *
 *     Start Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should start from.
 *         - Target - Start from battler target(s)
 *         - Point - Start from a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) to start the projectile from.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to start the projectile at.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *     Goal Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should go to.
 *         - Target - Goal is battler target(s)
 *         - Point - Goal is a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) for projectile to go to.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to send the projectile to.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *   Settings:
 *
 *     Animation ID:
 *     - Determine which animation to use as a projectile.
 *
 *     Duration:
 *     - Duration for the projectile(s) to travel.
 *
 *     Wait For Projectile?:
 *     - Wait for projectile(s) to reach their destination before going onto
 *       the next command?
 *
 *     Extra Settings:
 *     - Add extra settings to the projectile?
 *
 *       Auto Angle?:
 *       - Automatically angle the projectile to tilt the direction
 *         it's moving?
 *
 *       Angle Offset:
 *       - Alter the projectile's tilt by this many degrees.
 *
 *       Arc Peak:
 *       - This is the height of the project's trajectory arc in pixels.
 *
 *       Easing:
 *       - Select which easing type to apply to the projectile's trajectory.
 *
 *       Spin Speed:
 *       - Determine how much angle the projectile spins per frame.
 *       - Does not work well with "Auto Angle".
 *
 * ---
 *
 * PROJECTILE: Icon
 * - Create an icon projectile and fire it at a target.
 * - Requires VisuMZ_3_ActSeqProjectiles!
 *
 *   Coordinates:
 *
 *     Start Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should start from.
 *         - Target - Start from battler target(s)
 *         - Point - Start from a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) to start the projectile from.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to start the projectile at.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *     Goal Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should go to.
 *         - Target - Goal is battler target(s)
 *         - Point - Goal is a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) for projectile to go to.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to send the projectile to.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *   Settings:
 *
 *     Icon:
 *     - Determine which icon to use as a projectile.
 *       - You may use JavaScript code.
 *
 *     Duration:
 *     - Duration for the projectile(s) to travel.
 *
 *     Wait For Projectile?:
 *     - Wait for projectile(s) to reach their destination before going onto
 *       the next command?
 *
 *     Extra Settings:
 *     - Add extra settings to the projectile?
 *
 *       Auto Angle?:
 *       - Automatically angle the projectile to tilt the direction
 *         it's moving?
 *
 *       Angle Offset:
 *       - Alter the projectile's tilt by this many degrees.
 *
 *       Arc Peak:
 *       - This is the height of the project's trajectory arc in pixels.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the projectile?
 *         - Normal
 *         - Additive
 *         - Multiply
 *         - Screen
 *
 *       Easing:
 *       - Select which easing type to apply to the projectile's trajectory.
 *
 *       Hue:
 *       - Adjust the hue of the projectile.
 *       - Insert a number between 0 and 360.
 *
 *       Scale:
 *       - Adjust the size scaling of the projectile.
 *       - Use decimals for exact control.
 *
 *       Spin Speed:
 *       - Determine how much angle the projectile spins per frame.
 *       - Does not work well with "Auto Angle".
 *
 * ---
 *
 * PROJECTILE: Picture
 * - Create a picture projectile and fire it at a target.
 * - Requires VisuMZ_3_ActSeqProjectiles!
 *
 *   Coordinates:
 *
 *     Start Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should start from.
 *         - Target - Start from battler target(s)
 *         - Point - Start from a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) to start the projectile from.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to start the projectile at.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *     Goal Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should go to.
 *         - Target - Goal is battler target(s)
 *         - Point - Goal is a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) for projectile to go to.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to send the projectile to.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *   Settings:
 *
 *     Picture Filename:
 *     - Determine which picture to use as a projectile.
 *
 *     Duration:
 *     - Duration for the projectile(s) to travel.
 *
 *     Wait For Projectile?:
 *     - Wait for projectile(s) to reach their destination before going onto
 *       the next command?
 *
 *     Extra Settings:
 *     - Add extra settings to the projectile?
 *
 *       Auto Angle?:
 *       - Automatically angle the projectile to tilt the direction
 *         it's moving?
 *
 *       Angle Offset:
 *       - Alter the projectile's tilt by this many degrees.
 *
 *       Arc Peak:
 *       - This is the height of the project's trajectory arc in pixels.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the projectile?
 *         - Normal
 *         - Additive
 *         - Multiply
 *         - Screen
 *
 *       Easing:
 *       - Select which easing type to apply to the projectile's trajectory.
 *
 *       Hue:
 *       - Adjust the hue of the projectile.
 *       - Insert a number between 0 and 360.
 *
 *       Scale:
 *       - Adjust the size scaling of the projectile.
 *       - Use decimals for exact control.
 *
 *       Spin Speed:
 *       - Determine how much angle the projectile spins per frame.
 *       - Does not work well with "Auto Angle".
 *
 * ---
 * 
 * === Action Sequences - Skew ===
 * 
 * These action sequences allow you to have control over the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * ---
 *
 * SKEW: Change Skew
 * - Changes the camera skew.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Skew X:
 *   - Change the camera skew X to this value.
 *
 *   Skew Y:
 *   - Change the camera skew Y to this value.
 *
 *   Duration:
 *   - Duration in frames to change camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Reset Skew
 * - Reset any skew settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Wait For Skew
 * - Waits for skew changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Target ===
 *
 * If using a manual target by target Action Sequence, these commands will give
 * you full control over its usage.
 *
 * ---
 *
 * TARGET: Current Index
 * - Sets the current index to this value.
 * - Then decide to jump to a label (optional).
 *
 *   Set Index To:
 *   - Sets current targeting index to this value.
 *   - 0 is the starting index of a target group.
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Next Target
 * - Moves index forward by 1 to select a new current target.
 * - Then decide to jump to a label (optional).
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Previous Target
 * - Moves index backward by 1 to select a new current target.
 * - Then decide to jump to a label (optional).
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Random Target
 * - Sets index randomly to determine new currernt target.
 * - Then decide to jump to a label (optional).
 *
 *   Force Random?:
 *   - Index cannot be its previous index amount after random.
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * === Action Sequences - Weapon ===
 *
 * Allows for finer control over Dual/Multi Wielding actors.
 * Only works for Actors.
 *
 * ---
 *
 * WEAPON: Clear Weapon Slot
 * - Clears the active weapon slot (making others valid again).
 * - Only works for Actors.
 *
 *   Targets:
 *   - Select unit(s) to clear the active weapon slot for.
 *
 * ---
 *
 * WEAPON: Next Weapon Slot
 * - Goes to next active weapon slot (making others invalid).
 * - If next slot is weaponless, don't label jump.
 *
 *   Targets:
 *   - Select unit(s) to change the next active weapon slot for.
 *
 * ---
 *
 * WEAPON: Set Weapon Slot
 * - Sets the active weapon slot (making others invalid).
 * - Only works for Actors.
 *
 *   Targets:
 *   - Select unit(s) to change the active weapon slot for.
 *
 *   Weapon Slot ID:
 *   - Select weapon slot to make active (making others invalid).
 *   - Use 0 to clear and normalize. You may use JavaScript code.
 *
 * ---
 *
 * === Action Sequences - Zoom ===
 *
 * These Action Sequences are zoom-related.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * ZOOM: Change Scale
 * - Changes the zoom scale.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Scale:
 *   - The zoom scale to change to.
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Reset Zoom
 * - Reset any zoom settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Wait For Zoom
 * - Waits for zoom changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto Battle Settings
 * ============================================================================
 *
 * These Plugin Parameter settings allow you to change the aspects added by
 * this plugin that support Auto Battle and the Auto Battle commands.
 *
 * Auto Battle commands can be added to the Party Command Window and/or Actor
 * Command Window. The one used by the Party Command Window will cause the
 * whole party to enter an Auto Battle state until stopped by a button input.
 * The command used by the Actor Command Window, however, will cause the actor
 * to select an action based off the Auto Battle A.I. once for the current turn
 * instead.
 *
 * ---
 *
 * Battle Display
 * 
 *   Message:
 *   - Message that's displayed when Auto Battle is on.
 *     Text codes allowed. %1 - OK button, %2 - Cancel button
 * 
 *   OK Button:
 *   - Text used to represent the OK button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Cancel Button:
 *   - Text used to represent the Cancel button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Background Type:
 *   - Select background type for Auto Battle window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the Auto Battle options to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Startup Name:
 *   - Command name of the option.
 * 
 *   Style Name:
 *   - Command name of the option.
 * 
 *   OFF:
 *   - Text displayed when Auto Battle Style is OFF.
 * 
 *   ON:
 *   - Text displayed when Auto Battle Style is ON.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Damage Settings
 * ============================================================================
 *
 * These Plugin Parameters add a variety of things to how damage is handled in
 * battle. These range from hard damage caps to soft damage caps to how damage
 * popups appear, how the formulas for various aspects are handled and more.
 *
 * Damage Styles are also a feature added through this plugin. More information
 * can be found in the help section above labeled 'Damage Styles'.
 *
 * ---
 *
 * Damage Cap
 * 
 *   Enable Damage Cap?:
 *   - Put a maximum hard damage cap on how far damage can go?
 *   - This can be broken through the usage of notetags.
 * 
 *   Default Hard Cap:
 *   - The default hard damage cap used before applying damage.
 * 
 *   Enable Soft Cap?:
 *   - Soft caps ease in the damage values leading up to the  hard damage cap.
 *   - Requires hard Damage Cap enabled.
 * 
 *     Base Soft Cap Rate:
 *     - The default soft damage cap used before applying damage.
 * 
 *     Soft Scale Constant:
 *     - The default soft damage cap used before applying damage.
 *
 * ---
 *
 * Popups
 * 
 *   Popup Duration:
 *   - Adjusts how many frames a popup stays visible.
 * 
 *   Newest Popups Bottom:
 *   - Puts the newest popups at the bottom.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Sets how much to offset the sprites by horizontally/vertically.
 * 
 *   Shift X:
 *   Shift Y:
 *   - Sets how much to shift the sprites by horizontally/vertically.
 * 
 *   Shift Y:
 * 
 *   Critical Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Critical Duration:
 *   - Adjusts how many frames a the flash lasts.
 *
 * ---
 *
 * Formulas
 * 
 *   JS: Overall Formula:
 *   - The overall formula used when calculating damage.
 * 
 *   JS: Variance Formula:
 *   - The formula used when damage variance.
 * 
 *   JS: Guard Formula:
 *   - The formula used when damage is guarded.
 *
 * ---
 *
 * Critical Hits
 * 
 *   JS: Rate Formula:
 *   - The formula used to calculate Critical Hit Rates.
 * 
 *   JS: Damage Formula:
 *   - The formula used to calculate Critical Hit Damage modification.
 *
 * ---
 *
 * Damage Styles
 * 
 *   Default Style:
 *   - Which Damage Style do you want to set as default?
 *   - Use 'Manual' to not use any styles at all.
 *     - The 'Manual' style will not support <Armor Penetration> notetags.
 *     - The 'Manual' style will not support <Armor Reduction> notetags.
 * 
 *   Style List:
 *   - A list of the damage styles available.
 *   - These are used to calculate base damage.
 * 
 *     Name:
 *     - Name of this Damage Style.
 *     -Used for notetags and such.
 * 
 *     JS: Formula:
 *     - The base formula for this Damage Style.
 * 
 *     Items & Equips Core:
 * 
 *       HP Damage:
 *       MP Damage:
 *       HP Recovery:
 *       MP Recovery:
 *       HP Drain:
 *       MP Drain:
 *       - Vocabulary used for this data entry.
 * 
 *       JS: Damage Display:
 *       - Code used the data displayed for this category.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Some of the base settings for the various mechanics found in the battle
 * system can be altered here in these Plugin Parameters. Most of these will
 * involve JavaScript code and require you to have to good understanding of
 * how the RPG Maker MZ code works before tampering with it.
 *
 * ---
 *
 * Action Speed
 * 
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 * 
 *   JS: Calculate:
 *   - Code used to calculate action speed.
 *
 * ---
 *
 * Base Troop
 * 
 *   Base Troop ID's:
 *   - Select the Troop ID(s) to duplicate page events from for all
 *     other troops.
 *   - More information can be found in the dedicated Help section above.
 *
 * ---
 * 
 * Common Events (on Map)
 * 
 *   Pre-Battle Event:
 *   Post-Battle Event:
 *   Victory Event:
 *   Defeat Event:
 *   Escape Success Event:
 *   Escape Fail Event:
 *   - Queued Common Event to run upon meeting the condition.
 *   - Use to 0 to not run any Common Event at all.
 *   - "Post-Battle Event" will always run regardless.
 *   - If any events are running before the battle, they will continue running
 *     to the end first before the queued Common Events will run.
 *   - These common events only run on the map scene. They're not meant to run
 *     in the battle scene.
 *   - If the "Defeat Event" has a common event attached to it, then random
 *     encounters will be changed to allow defeat without being sent to the
 *     Game Over scene. Instead, the game will send the player to the map scene
 *     where the Defeat Event will run.
 *
 * ---
 *
 * Escape
 * 
 *   JS: Calc Escape Ratio:
 *   - Code used to calculate the escape success ratio.
 * 
 *   JS: Calc Escape Raise:
 *   - Code used to calculate how much the escape success ratio raises upon
 *     each failure.
 * 
 * ---
 * 
 * Switches
 * 
 *   Switch: Critical:
 *   - Turns switch ON if the action performs a critical hit.
 *   - Switch reverts to OFF whenever an action starts.
 *   - If multiple targets/hits are struck, as long as one hit lands a critical
 *     hit, then the switch will remain ON for the rest of the action.
 * 
 *   Switch: Miss/Evade:
 *   - Turns switch ON if the action misses/is evaded.
 *   - Switch reverts to OFF whenever an action starts.
 *   - If multiple targets/hits are struck, as long as one hit fails to land,
 *     then the switch will remain ON for the rest of the action.
 * 
 * ---
 * 
 * Variables
 * 
 *   Variable: Damage:
 *   - Variable records target damage during action.
 *   - Variable reverts to 0 whenever an action starts.
 *   - If multiple targets/hits are struck, the variable will record the total
 *     amount of damage done for the remainder of the action (unless manually
 *     reseting to 0 during an Action Sequence).
 * 
 *   Variable: Healing:
 *   - Variable records target healing during action.
 *   - Variable reverts to 0 whenever an action starts.
 *   - If multiple targets/hits are struck, the variable will record the total
 *     amount of healing done for the remainder of the action (unless manually
 *     reseting to 0 during an Action Sequence).
 * 
 * ---
 *
 * JS: Battle-Related
 * 
 *   JS: Pre-Start Battle:
 *   - Target function: BattleManager.startBattle()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Battle:
 *   - Target function: BattleManager.startBattle()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Battle Victory:
 *   - Target function: BattleManager.processVictory()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Escape Success:
 *   - Target function: BattleManager.onEscapeSuccess()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Escape Failure:
 *   - Target function: BattleManager.onEscapeFailure()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Battle Defeat:
 *   - Target function: BattleManager.processDefeat()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Pre-End Battle:
 *   - Target function: BattleManager.endBattle()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Battle:
 *   - Target function: BattleManager.endBattle()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * JS: Turn-Related
 * 
 *   JS: Pre-Start Turn:
 *   - Target function: BattleManager.startTurn()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Turn:
 *   - Target function: BattleManager.startTurn()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-End Turn:
 *   - Target function: Game_Battler.prototype.onTurnEnd()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Turn:
 *   - Target function: Game_Battler.prototype.onTurnEnd()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-Regenerate:
 *   - Target function: Game_Battler.prototype.regenerateAll()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Regenerate:
 *   - Target function: Game_Battler.prototype.regenerateAll()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * JS: Action-Related
 * 
 *   JS: Pre-Start Action:
 *   - Target function: BattleManager.startAction()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Action:
 *   - Target function: BattleManager.startAction()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-Apply:
 *   - Target function: Game_Action.prototype.apply()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Pre-Damage:
 *   - Target function: Game_Action.prototype.executeDamage()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Damage:
 *   - Target function: Game_Action.prototype.executeDamage()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Post-Apply:
 *   - Target function: Game_Action.prototype.apply()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-End Action:
 *   - Target function: BattleManager.endAction()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Action:
 *   - DescriTarget function: BattleManager.endAction()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Layout Settings
 * ============================================================================
 *
 * The Battle Layout Settings Plugin Parameter gives you control over the look,
 * style, and appearance of certain UI elements. These range from the way the
 * Battle Status Window presents its information to the way certain windows
 * like the Party Command Window and Actor Command Window appear.
 *
 * ---
 *
 * Battle Layout Style
 * - The style used for the battle layout.
 * 
 *   Default:
 *   - Shows actor faces in Battle Status.
 * 
 *   List:
 *   - Lists actors in Battle Status.
 * 
 *   XP:
 *   - Shows actor battlers in a stretched Battle Status.
 * 
 *   Portrait:
 *   - Shows portraits in a stretched Battle Status.
 * 
 *   Border:
 *   - Displays windows around the screen border.
 *
 * ---
 *
 * List Style
 * 
 *   Show Faces:
 *   - Shows faces in List Style?
 * 
 *   Command Window Width:
 *   - Determine the window width for the Party and Actor Command Windows.
 *   - Affects Default and List Battle Layout styles.
 *
 * ---
 *
 * XP Style
 * 
 *   Command Lines:
 *   - Number of action lines in the Actor Command Window for the XP Style.
 * 
 *   Sprite Height:
 *   - Default sprite height used when if the sprite's height has not been
 *     determined yet.
 * 
 *   Sprite Base Location:
 *   - Determine where the sprite is located on the Battle Status Window.
 *     - Above Name - Sprite is located above the name.
 *     - Bottom - Sprite is located at the bottom of the window.
 *     - Centered - Sprite is centered in the window.
 *     - Top - Sprite is located at the top of the window.
 *
 * ---
 *
 * Portrait Style
 * 
 *   Show Portraits?:
 *   - Requires VisuMZ_1_MainMenuCore.
 *   - Shows the actor's portrait instead of a face.
 * 
 *   Portrait Scaling:
 *   - If portraits are used, scale them by this much.
 *
 * ---
 *
 * Border Style
 * 
 *   Columns:
 *   - The total number of columns for Skill & Item Windows in the battle scene
 * 
 *   Show Portraits?:
 *   - Requires VisuMZ_1_MainMenuCore.
 *   - Shows the actor's portrait at the edge of the screen.
 * 
 *   Portrait Scaling:
 *   - If portraits are used, scale them by this much.
 *
 * ---
 *
 * Skill & Item Windows
 * 
 *   Middle Layout:
 *   - Shows the Skill & Item Windows in mid-screen?
 * 
 *   Columns:
 *   - The total number of columns for Skill & Item Windows in the battle scene
 *
 * ---
 * 
 * Status Window Elements
 * 
 *   Battler Name:
 *   Gauge 1 (HP):
 *   Gauge 2 (MP):
 *   Gauge 3 (TP):
 *   State Icon:
 *   TPB/ATB Gauge:
 * 
 *     Offset: X/Y:
 *     - Offset this Battle Status Window element's X/Y.
 *     - For X: Negative goes left. Positive goes right.
 *     - For Y: Negative goes up. Positive goes down.
 * 
 *   Window Skin:
 * 
 *     Filename:
 *     - Filename used for the Battle Status Window skin.
 *     - Leave this empty to use the default window skin.
 * 
 *     Hide Window Skin?:
 *     - Hide the window skin for the Battle Status Window?
 * 
 *   Selectable Background:
 * 
 *     Hide Selectable BG?:
 *     - Show/Hide the selectable background box for the Battle Status Window?
 * 
 *   Attachments:
 * 
 *     Back Attachment:
 * 
 *       Filename:
 *       - Filename used for an image to attach to the back of the Battle
 *         Status Window. Leave empty for none.
 * 
 *       Offset: X/Y:
 *       - Offset this Battle Status Window element's X/Y.
 *       - For X: Negative goes left. Positive goes right.
 *       - For Y: Negative goes up. Positive goes down.
 * 
 *     Front Attachment:
 * 
 *       Filename:
 *       - Filename used for an image to attach to the front of the Battle
 *         Status Window. Leave empty for none.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Log Settings
 * ============================================================================
 *
 * These Plugin Parameters give you control over how the Battle Log Window, the
 * window shown at the top of the screen in the battle layout, appears, its
 * various properties, and which text will be displayed.
 *
 * The majority of the text has been disabled by default with this plugin to
 * make the flow of battle progress faster.
 *
 * ---
 *
 * General
 * 
 *   Back Color:
 *   - Use #rrggbb for a hex color.
 * 
 *   Max Lines:
 *   - Maximum number of lines to be displayed.
 * 
 *   Message Wait:
 *   - Number of frames for a usual message wait.
 * 
 *   Text Align:
 *   - Text alignment for the Window_BattleLog.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the battle log.
 *
 * ---
 *
 * Start Turn
 * 
 *   Show Start Turn?:
 *   - Display turn changes at the start of the turn?
 * 
 *   Start Turn Message:
 *   - Message displayed at turn start.
 *   - %1 - Turn Count
 * 
 *   Start Turn Wait:
 *   - Number of frames to wait after a turn started.
 *
 * ---
 *
 * Display Action
 * 
 *   Show Centered Action?:
 *   - Display a centered text of the action name?
 * 
 *   Show Skill Message 1?:
 *   - Display the 1st skill message?
 * 
 *   Show Skill Message 2?:
 *   - Display the 2nd skill message?
 * 
 *   Show Item Message?:
 *   - Display the item use message?
 *
 * ---
 *
 * Action Changes
 * 
 *   Show Counter?:
 *   - Display counter text?
 * 
 *   Show Reflect?:
 *   - Display magic reflection text?
 * 
 *   Show Substitute?:
 *   - Display substitute text?
 *
 * ---
 *
 * Action Results
 * 
 *   Show No Effect?:
 *   - Display no effect text?
 * 
 *   Show Critical?:
 *   - Display critical text?
 * 
 *   Show Miss/Evasion?:
 *   - Display miss/evasion text?
 * 
 *   Show HP Damage?:
 *   - Display HP Damage text?
 * 
 *   Show MP Damage?:
 *   - Display MP Damage text?
 * 
 *   Show TP Damage?:
 *   - Display TP Damage text?
 *
 * ---
 *
 * Display States
 * 
 *   Show Added States?:
 *   - Display added states text?
 * 
 *   Show Removed States?:
 *   - Display removed states text?
 * 
 *   Show Current States?:
 *   - Display the currently affected state text?
 * 
 *   Show Added Buffs?:
 *   - Display added buffs text?
 * 
 *   Show Added Debuffs?:
 *   - Display added debuffs text?
 * 
 *   Show Removed Buffs?:
 *   - Display removed de/buffs text?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battleback Scaling Settings
 * ============================================================================
 *
 * By default, the battlebacks in RPG Maker MZ scale as if the screen size is
 * a static 816x624 resolution, which isn't always the case. These settings
 * here allow you to dictate how you want the battlebacks to scale for the
 * whole game. These settings CANNOT be changed midgame or per battle.
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default scaling style used for battlebacks.
 *   - MZ (MZ's default style)
 *   - 1:1 (No Scaling)
 *   - Scale To Fit (Scale to screen size)
 *   - Scale Down (Scale Downward if Larger than Screen)
 *   - Scale Up (Scale Upward if Smaller than Screen)
 * 
 *   JS: 1:1:
 *   JS: Scale To Fit:
 *   JS: Scale Down:
 *   JS: Scale Up:
 *   JS: 1:1:
 *   JS: 1:1:
 *   - This code gives you control over the scaling for this style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Party Command Window
 * ============================================================================
 *
 * These Plugin Parameters allow you control over how the Party Command Window
 * operates in the battle scene. You can turn disable it from appearing or make
 * it so that it doesn't 
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Party Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Party Command Window.
 * 
 *   Fight Icon:
 *   - The icon used for the Fight command.
 * 
 *   Add Auto Battle?:
 *   - Add the "Auto Battle" command to the Command Window?
 * 
 *     Auto Battle Icon:
 *     - The icon used for the Auto Battle command.
 * 
 *     Auto Battle Text:
 *     - The text used for the Auto Battle command.
 * 
 *   Add Options?:
 *   - Add the "Options" command to the Command Window?
 * 
 *     Options Icon:
 *     - The icon used for the Options command.
 * 
 *     Active TPB Message:
 *     - Message that will be displayed when selecting options during the
 *       middle of an action.
 * 
 *   Escape Icon:
 *   - The icon used for the Escape command.
 *
 * ---
 *
 * Access
 * 
 *   Skip Party Command:
 *   - DTB: Skip Party Command selection on turn start.
 *   - TPB: Skip Party Command selection at battle start.
 * 
 *   Disable Party Command:
 *   - Disable the Party Command Window entirely?
 *
 * ---
 *
 * Help Window
 * 
 *   Fight:
 *   - Text displayed when selecting a skill type.
 *   - %1 - Skill Type Name
 * 
 *   Auto Battle:
 *   - Text displayed when selecting the Auto Battle command.
 * 
 *   Options:
 *   - Text displayed when selecting the Options command.
 * 
 *   Escape:
 *   - Text displayed when selecting the escape command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Command Window
 * ============================================================================
 *
 * These Plugin Parameters allow you to change various aspects regarding the
 * Actor Command Window and how it operates in the battle scene. This ranges
 * from how it appears to the default battle commands given to all players
 * without a custom <Battle Commands> notetag.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Actor Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Actor Command Window.
 * 
 *   Item Icon:
 *   - The icon used for the Item command.
 * 
 *   Normal SType Icon:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * 
 *   Magic SType Icon:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - Ignore if VisuMZ_1_SkillsStatesCore is installed.
 *
 * ---
 *
 * Battle Commands
 * 
 *   Command List:
 *   - List of battle commands that appear by default if the <Battle Commands>
 *     notetag isn't present.
 *
 *     - Attack 
 *       - Adds the basic attack command.
 * 
 *     - Skills
 *       - Displays all the skill types available to the actor.
 * 
 *     - SType: x
 *     - Stype: name
 *       - Adds in a specific skill type.
 *       - Replace 'x' with the ID of the skill type.
 *       - Replace 'name' with the name of the skill type (without text codes).
 *
 *     - All Skills
 *       - Adds all usable battle skills as individual actions.
 * 
 *     - Skill: x
 *     - Skill: name
 *       - Adds in a specific skill as a usable action.
 *       - Replace 'x' with the ID of the skill.
 *       - Replace 'name' with the name of the skill.
 * 
 *     - Guard
 *       - Adds the basic guard command.
 * 
 *     - Item
 *       - Adds the basic item command.
 * 
 *     - Escape
 *       - Adds the escape command.
 * 
 *     - Auto Battle
 *       - Adds the auto battle command.
 *
 * ---
 *
 * Help Window
 * 
 *   Skill Types:
 *   - Text displayed when selecting a skill type.
 *   - %1 - Skill Type Name
 * 
 *   Items:
 *   - Text displayed when selecting the item command.
 * 
 *   Escape:
 *   - Text displayed when selecting the escape command.
 * 
 *   Auto Battle:
 *   - Text displayed when selecting the Auto Battle command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Battler Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust how the sideview battlers behave for
 * the actor sprites. Some of these settings are shared with enemies if they
 * use sideview battler graphics.
 *
 * ---
 *
 * Flinch
 * 
 *   Flinch Distance X:
 *   - The normal X distance when flinching.
 * 
 *   Flinch Distance Y:
 *   - The normal Y distance when flinching.
 * 
 *   Flinch Duration:
 *   - The number of frames for a flinch to complete.
 *
 * ---
 *
 * Sideview Battlers
 * 
 *   Anchor: X:
 *   - Default X anchor for Sideview Battlers.
 * 
 *   Anchor: Y:
 *   - Default Y anchor for Sideview Battlers.
 * 
 *   Chant Style:
 *   - What determines the chant motion?
 *   - Hit type or skill type?
 * 
 *   Offset X:
 *   - Offsets X position where actor is positioned.
 *   - Negative values go left. Positive values go right.
 * 
 *   Offset Y:
 *   - Offsets Y position where actor is positioned.
 *   - Negative values go up. Positive values go down.
 * 
 *   Motion Speed:
 *   - The number of frames in between each motion.
 * 
 *   Priority: Active:
 *   - Place the active actor on top of actor and enemy sprites.
 * 
 *   Priority: Actors:
 *   - Prioritize actors over enemies when placing sprites on top of each other
 * 
 *   Shadow Visible:
 *   - Show or hide the shadow for Sideview Battlers.
 * 
 *   Smooth Image:
 *   - Smooth out the battler images or pixelate them?
 * 
 *   JS: Home Position:
 *   - Code used to calculate the home position of actors.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Enemy Battler Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust how enemies appear visually in the
 * battle scene. Some of these settings will override the settings used for
 * actors if used as sideview battlers. Other settings include changing up the
 * default attack animation for enemies, how the enemy select window functions,
 * and more.
 *
 * ---
 *
 * Visual
 * 
 *   Attack Animation:
 *   - Default attack animation used for enemies.
 *   - Use <Attack Animation: x> for custom animations.
 * 
 *   Emerge Text:
 *   - Show or hide the 'Enemy emerges!' text at the start of battle.
 * 
 *   Offset X:
 *   - Offsets X position where enemy is positioned.
 *   - Negative values go left. Positive values go right.
 * 
 *   Offset Y:
 *   - Offsets Y position where enemy is positioned.
 *   - Negative values go up. Positive values go down.
 * 
 *   Smooth Image:
 *   - Smooth out the battler images or pixelate them?
 *
 * ---
 *
 * Select Window
 * 
 *   Any: Last Selected:
 *   - Prioritize last selected enemy over front view or sideview settings?
 * 
 *   FV: Right Priority:
 *   - If using frontview, auto select the enemy furthest right.
 * 
 *   SV: Right Priority:
 *   - If using sideview, auto select the enemy furthest right.
 * 
 * ---
 * 
 * Name:
 * 
 *   Name: Font Size:
 *   - Font size used for enemy names.
 * 
 *   Name: Offset X:
 *   Name: Offset Y:
 *   - Offset the enemy name's position by this much.
 *   - For X: Negative goes left. Positive goes right.
 *   - For Y: Negative goes up. Positive goes down.
 * 
 *   Name: Always Visible:
 *   - Determines if the enemy name will always be visible.
 * 
 *   Name: Attach States:
 *   - Attach the enemy's state icon to the enemy name?
 * 
 *     Attach: Offset X:
 *     Attach: Offset Y:
 *     - How much to offset the attached icon's X/Y position by?
 *     - For X: Negative goes left. Positive goes right.
 *     - For Y: Negative goes up. Positive goes down.
 *
 * ---
 *
 * Sideview Battlers
 * 
 *   Allow Collapse:
 *   - Causes defeated enemies with SV Battler graphics to "fade away"
 *     when defeated?
 * 
 *   Anchor: X:
 *   - Default X anchor for Sideview Battlers.
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Anchor: Y:
 *   - Default Y anchor for Sideview Battlers.
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Motion: Idle:
 *   - Sets default idle animation used by Sideview Battlers.
 * 
 *   Shadow Visible:
 *   - Show or hide the shadow for Sideview Battlers.
 * 
 *   Size: Width:
 *   - Default width for enemies that use Sideview Battlers.
 * 
 *   Size: Height:
 *   - Default height for enemies that use Sideview Battlers.
 * 
 *   Weapon Type:
 *   - Sets default weapon type used by Sideview Battlers.
 *   - Use 0 for Bare Hands.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: HP Gauge Settings
 * ============================================================================
 *
 * Settings that adjust the visual HP Gauge displayed in battle.
 *
 * ---
 *
 * Show Gauges For
 * 
 *   Actors:
 *   - Show HP Gauges over the actor sprites' heads?
 *   - Requires SV Actors to be visible.
 * 
 *   Enemies:
 *   - Show HP Gauges over the enemy sprites' heads?
 *   - Can be bypassed with <Hide HP Gauge> notetag.
 * 
 *     Requires Defeat?:
 *     - Requires defeating the enemy once to show HP Gauge?
 *     - Can be bypassed with <Show HP Gauge> notetag.
 * 
 *       Battle Test Bypass?:
 *       - Bypass the defeat requirement in battle test?
 *
 * ---
 *
 * Settings
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the HP Gauge sprite's anchor X/Y to be?
 *     Use values between 0 and 1 to be safe.
 * 
 *   Scale:
 *   - How large/small do you want the HP Gauge to be scaled?
 * 
 *   Offset X:
 *   Offset Y:
 *   - How many pixels to offset the HP Gauge's X/Y by?
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the 'Show HP Gauge' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Action Sequence Settings
 * ============================================================================
 *
 * Action Sequence Plugin Parameters allow you to decide if you want automatic
 * Action Sequences to be used for physical attacks, the default casting
 * animations used, how counters and reflects appear visually, and what the
 * default stepping distances are.
 *
 * ---
 *
 * Automatic Sequences
 * 
 *   Melee Single Target:
 *   - Allow this auto sequence for physical, single target actions?
 * 
 *   Melee Multi Target:
 *   - Allow this auto sequence for physical, multi-target actions?
 *
 * ---
 * 
 * Quality of Life
 * 
 *   Auto Notetag:
 *   - Automatically apply the <Custom Action Sequence> notetag effect to any
 *     item or skill that has a Common Event?
 *   - Any item or skill without a Common Event attached to it will use the
 *     Automatic Action Sequences instead.
 *   - The <Auto Action Sequence> notetag will disable this effect for that
 *     particular skill or item.
 * 
 * ---
 *
 * Cast Animations
 * 
 *   Certain Hit:
 *   - Cast animation for Certain Hit skills.
 * 
 *   Physical:
 *   - Cast animation for Physical skills.
 * 
 *   Magical:
 *   - Cast animation for Magical skills.
 *
 * ---
 *
 * Counter/Reflect
 * 
 *   Counter Back:
 *   - Play back the attack animation used?
 * 
 *   Reflect Animation:
 *   - Animation played when an action is reflected.
 * 
 *   Reflect Back:
 *   - Play back the attack animation used?
 *
 * ---
 *
 * Stepping
 * 
 *   Melee Distance:
 *   - Minimum distance in pixels for Movement Action Sequences.
 * 
 *   Step Distance X:
 *   - The normal X distance when stepping forward.
 * 
 *   Step Distance Y:
 *   - The normal Y distance when stepping forward.
 * 
 *   Step Duration:
 *   - The number of frames for a stepping action to complete.
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
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Actor Command > Show Command Costs
 * **** If you don't want to show skill costs for your commands in the Actor
 *      Command Window, you can now hide them.
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > Battle Layout Settings > Status Window Elements
 * *** Battle Layout Settings > Status Window Elements > Battler Name
 * *** Battle Layout Settings > Status Window Elements > Gauge 1 (HP)
 * *** Battle Layout Settings > Status Window Elements > Gauge 2 (MP)
 * *** Battle Layout Settings > Status Window Elements > Gauge 3 (TP)
 * *** Battle Layout Settings > Status Window Elements > State Icon
 * *** Battle Layout Settings > Status Window Elements > TPB/ATB Gauge
 * **** These new Plugin Parameters allow you to offset the positions of the
 *      various Battle Status Window elements. Their base positions will be
 *      calculated by the Battle Layout used and then offset from there.
 * *** Battle Layout Settings > Status Window Elements > Window Skin
 * **** These settings allow you to set a specific window skin for the
 *      Battle Status Window or hide it from view completely.
 * *** Battle Layout Settings > Status Window Elements > Selectable Background
 * **** This option allows you to hide the black box that comes with the
 *      majority of selectable elements found in RPG Maker MZ in case it does
 *      not fit with how you want the Battle Status Window to look.
 * *** Battle Layout Settings > Status Window Elements > Back Attachment
 * *** Battle Layout Settings > Status Window Elements > Front Attachment
 * **** These settings allow you to attach images to the back/front of the
 *      Battle Status Window from the img/system/ folder.
 * **** You may offset X and Y positions for them as well.
 * ** New Plugin Parameters added by Olivia:
 * *** Plugin Parameters > Enemy Settings > Name: Always Visible
 * **** Determines if the enemy name will always be visible.
 * *** Plugin Parameters > Enemy Settings > Name: Attach States
 * **** Attach the enemy's state icon to the enemy name?
 * *** Plugin Parameters > Enemy Settings > Attach: Offset X/Y
 * **** Offset the attached state icon's position.
 * * Feature Update!
 * ** Switched drawing enemy names on the screen from window to sprite to
 *    reduce lag and for better screen positioning accuracy especially during
 *    screen zooming. Update by Olivia.
 * 
 * Version 1.27: February 26, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Mechanics Settings > Switches > Switch: Critical
 * *** Plugin Parameters > Mechanics Settings > Switches > Switch: Miss/Evade
 * **** Turns Switches ON if the action performs a critical hit, misses, or is
 *      evaded at any point.
 * **** Switch reverts to OFF whenever an action starts.
 * **** If multiple targets/hits are struck, as long as one hit respectively
 *      lands a critical hit, fails to land, then the switch will remain ON for
 *      the rest of the action.
 * *** Plugin Parameters > Mechanics Settings > Variables > Variable: Damage
 * *** Plugin Parameters > Mechanics Settings > Variables > Variable: Healing
 * **** Variable records target damage/healing during action.
 * **** Variable reverts to 0 whenever an action starts.
 * **** If multiple targets/hits are struck, the variable will record the total
 *      amount of damage/healing done for the remainder of the action (unless
 *      manually reseting to 0 during an Action Sequence).
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Battles with branching event paths found within a conditional branch or
 *    choice tree will no longer be skipped over. Fix made by Arisu.
 * * Compatibility Update
 * ** Returning to the battle scene from the options scene in a Tpb-base battle
 *    system now links the current actor. Update by Irina.
 * 
 * Version 1.25: February 5, 2021
 * * Compatibility Update
 * ** Added compatibility update with VisuStella MZ Skills and States Core's
 *    Plugin Parameter > State Settings > Action End Update
 * * Feature Update!
 * ** <Common Event: name> notetag no longer requires <Custom Action Sequence>
 *    notetag if the Plugin Parameter: Auto Notetag is enabled.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** MOVE: Move To Point and MOVE: Move To Target(s) Action Sequences'
 *    "Offset Adjustment" normal setting will now factor in Offset X and
 *    Offset Y positions unlike before where it cancels them. Update by Irina.
 * * New Features!
 * ** New notetag added by Arisu:
 * *** <Common Event: name>
 * **** Battle only: calls forth a Common Event of a matching name.
 * **** This is primarily used for users who are reorganizing around their
 *      Common Events and would still like to have their skills/items perform
 *      the correct Action Sequences in case the ID's are different.
 * 
 * Version 1.23: January 22, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** ACSET: All Targets Action Set and ACSET: Each Target Action Set updated
 * *** New parameter added: Dual/Multi Wield?
 * **** Add times struck based on weapon quantity equipped?
 * * New Features!
 * ** Dual Wielding now functions differently. Made by Olivia.
 * *** Previously, RPG Maker MZ had "Dual Wielding" attack using both weapon
 *     animations at once, with the combined ATK of each weapon. It's confusing
 *     to look at and does not portray the nature of "Dual Wielding".
 * *** Dual Wielding, or in the case of users adding in third and fourth
 *     weapons, Multi Wielding is now changed. Each weapon is displayed
 *     individually, each producing its own attack animation, showing each
 *     weapon type, and applying only that weapon's ATK, Traits, and related
 *     effects. It is no longer a combined effect to display everything at once
 *     like RPG Maker MZ default.
 * *** If an actor has multiple weapon slots but some of them are unequipped,
 *     then the action will treat the attack as a single attack. There will be
 *     no barehanded attack to add on top of it. This is to match RPG Maker
 *     MZ's decision to omit a second animation if the same scenario is
 *     applied.
 * ** New Action Sequence Plugin Commands added by Yanfly
 * *** ANIM: Attack Animation 2+
 * **** Plays the animation associated with the user's 2nd weapon.
 *      Plays nothing if there is no 2nd weapon equipped.
 * ** New Action Sequence Plugin Commands added by Olivia
 * *** WEAPON: Clear Weapon Slot
 * *** WEAPON: Next Weapon Slot
 * *** WEAPON: Set Weapon Slot
 * **** These are Action Sequence Plugin Commands for devs who want finer
 *      control over Dual/Multi Wielding weapons.
 * 
 * Version 1.22: January 15, 2021
 * * Compatibility Update
 * ** Compatibility with "All Skills" Actor Command should now work with the
 *    Skills & States Core hide skill notetags.
 * 
 * Version 1.21: January 8, 2021
 * * Bug Fixes!
 * ** "MOVE: Home Reset" Plugin Command Action Sequence should work properly.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Notetag snuck in by Arisu
 * *** <Auto Action Sequence>
 * **** Used for those who have the "Auto Notetag" Plugin Parameter enabled and
 *      just want to use an automatic Action Sequence instead.
 * ** New Plugin Parameter snuck in by Arisu!
 * *** Plugin Parameters > Action Sequences > Quality of Life > Auto Notetag
 * **** Automatically apply the <Custom Action Sequence> notetag effect to any
 *      item or skill that has a Common Event?
 * **** Any item or skill without a Common Event attached to it will use the
 *      Automatic Action Sequences instead.
 * **** The <Auto Action Sequence> notetag will disable this effect for that
 *      particular skill or item.
 * ** Arisu, you're going to be responsible for any bugs these may cause.
 * *** Bring it!!!!
 * **** And handling any bug report emails that are sent because this was
 *      turned on by accident.
 * ***** Please read the documentation, guys!
 * 
 * Version 1.20: January 1, 2021
 * * Bug Fixes!
 * ** For TPB Active or ATB Active, inputting actors that have received damage
 *    will return back to place after flinching. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Battle Portrait Offset: +x, +y>
 * *** <Battle Portrait Offset X: +x>
 * *** <Battle Portrait Offset Y: +y>
 * **** This is used with the "Portrait" and "Border" Battle Layouts.
 * **** Offsets the X and Y coordinates for the battle portrait.
 * 
 * Version 1.19: December 25, 2020
 * * Bug Fixes!
 * ** Removing a state from a Sideview Enemy during the middle of their a non-
 *    looping motion will no longer reset their motion to neutral.
 *    Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** Action Sequence "PROJECTILE: Icon" now supports code for the "Icon"
 *    parameter. Update made by Yanfly.
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** For TPB Active or ATB Active, inputting actors will no longer step back
 *    after an enemy's action is finished. Fix made by Yanfly and Shiro.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** Action Sequence "BTLOG: Add Text" is updated for the convenience of a new
 *    option to quickly copy the displayed text to the VisuStella MZ Combat Log
 *    if that plugin is installed. Added by Yanfly.
 * 
 * Version 1.17: December 11, 2020
 * * Bug Fixes!
 * ** Common Events in TPB Active that cause forced actions will no longer
 *    cause currently inputting actors that match the forced action battler to
 *    crash the game. Fix made by Yanfly and Shiro.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Action Sequence Impact Action Sequences "Shockwave from Each Target(s)",
 *    "Shockwave from Target(s) Center", and "Zoom Blur at Target(s) Center"
 *    now have "Offset X" and "Offset Y" plugin parameters. Added by Yanfly.
 * ** Action Sequence "MOVE: Move To Target(s)" is now changed so that if the
 *    "Melee Distance" value is set to 0, battlers will no longer stand a half
 *    body distance away. Added by Yanfly.
 * 
 * Version 1.16: December 4, 2020
 * * Bug Fixes!
 * ** Bug fixes made for the RPG Maker MZ base code. If a battler has no
 *    actions, then their action speed will not be Infinity. Fix by Olivia.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Completely replacing the whole party at once will no longer cause the
 *    battle system to crash. Fix made by Olivia.
 * ** Pre-Battle Common Events will no longer cancel out any win/lose branches.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Custom Action Sequences will no longer close the Actor Command Input
 *    window unless absolutely necessary (like for Show Message events) during
 *    Active TPB/ATB. Change made by Arisu.
 * 
 * Version 1.14: November 22, 2020
 * * Feature Update!
 * ** Natural Miss and Evasion motions now have flinch distance.
 *    Added by Yanfly.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Bug Fixes!
 * ** Failsafes added to prevent common events from running if they're empty.
 *    Fix made by Irina.
 * ** Skip Party Command will now work properly with TPB-based battle systems.
 *    Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** In preparation for upcoming VisuStella MZ plugins.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added clarity for the Plugin Parameters for the Common Events settings
 *    found in the mechanics section. The common events are only meant to run
 *    in the map scene and not for the battle scene. Update made by Irina.
 * * Feature Update!
 * ** The Plugin Parameter for Mechanics, Common Events (on Map), Defeat Event
 *    now has updated functionality. If this has a common event attached to it,
 *    then losing to random encounters will no longer send the player to the
 *    Game Over scene, but instead, send the player back to the map scene,
 *    where the Defeat Common Event will run. Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Action Sequence Plugin Command added by Olivia:
 * *** MECH: Custom Damage Formula
 * **** Changes the current action's damage formula to custom.
 *      This will assume the MANUAL damage style.
 * ** New Notetag added by Irina:
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > Battleback Scaling Settings
 * **** These settings allow you to adjust how battlebacks scale to the screen
 *      in the game.
 * *** <Battler Sprite Grounded>
 * **** Prevents the enemy from being able to jumping and/or floating due to
 *      Action Sequences but still able to move. Useful for rooted enemies.
 * 
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** Exiting out of the Options menu scene or Party menu scene will no longer
 *    cause party members to reset their starting position. Fix made by Arisu
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** There was a documentation error with <JS Pre-Regenerate> and
 *    <JS Post-Regenerate>. Fix made by Yanfly.
 * *** Before, these were written as <JS Pre-Regenerate Turn> and
 *     <JS Post-Regenerate Turn>. The "Turn" part of the notetag has been
 *     removed in the documentation.
 * * Feature Update!
 * ** Damage sprites on actors are now centered relative to the actor's anchor.
 *    Change made by Yanfly.
 * * New Features!
 * ** New Action Sequence Plugin Command added by Yanfly:
 * *** MECH: Variable Popup
 * **** Causes the unit(s) to display a popup using the data stored inside
 *      a variable.
 * 
 * Version 1.08: October 11, 2020
 * * Bug Fixes!
 * ** Dead party members at the start of battle no longer start offscreen.
 *    Fix made by Arisu.
 * ** Removed party members from battle no longer count as moving battlers.
 *    Fix made by Yanfly.
 * ** Using specific motions should now have the weapons showing and not
 *    showing properly. Fix made by Yanfly.
 * 
 * Version 1.07: October 4, 2020
 * * Bug Fixes!
 * ** Adding and removing actors will now refresh the battle status display.
 *    Fix made by Irina.
 * ** Adding new states that would change the affected battler's state motion
 *    will automatically refresh the battler's motion. Fix made by Irina.
 * ** Boss Collapse animation fixed and will sink into the ground.
 *    Fix made by Irina.
 * ** Failsafes added for certain animation types. Fix made by Yanfly.
 * ** Freeze Motion for thrust, swing, and missile animations will now show the
 *    weapons properly. Fix made by Yanfly.
 * ** The Guard command will no longer display the costs of the Attack command.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Updated help file for newly added plugin parameters.
 * * Feature Updates!
 * ** When using the Change Battleback event command in battle, the game client
 *    will wait until both battlebacks are loaded before changing the both of
 *    them so that the appearance is synched together. Change made by Yanfly.
 * * New Features!
 * ** New plugin parameters added by Irina!
 * *** Plugin Parameters > Actor Battler Settings > Chant Style
 * **** What determines the chant motion? Hit type or skill type?
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Enemy Battler Plugin Parameter "Shadow Visible" should now work again.
 *    Fix made by Irina.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins. Added by Yanfly.
 * * Documentation Update!
 * ** Updated the help file for all the new plugin parameters.
 * * Feature Update!
 * ** Action Sequence "MECH: HP, MP, TP" will now automatically collapse an
 *    enemy if it has been killed by the effect.
 * ** All battle systems for front view will now have damage popups appear
 *    in front of the status window instead of just the Portrait battle layout.
 *    Update made by Yanfly.
 * * New Features!
 * ** New Action Sequence Plugin Commands from Irina!
 * *** MOTION: Clear Freeze Frame
 * *** MOTION: Freeze Motion Frame
 * **** You can freeze a battler's sprite's motion with a specific frame.
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Battle Layout: type> to change the battle layout style used for
 *     specific maps and/or troops.
 * ** New plugin parameters added by Yanfly!
 * *** Plugin Parameters > Battle Layout Settings > Command Window Width
 * **** This plugin parameter lets you adjust the window width for Party and
 *      Actor Command windows in the Default and List Battle Layout styles.
 * *** Plugin Parameters > Enemy Battler Settings > Name: Offset X
 * *** Plugin Parameters > Enemy Battler Settings > Name: Offset Y
 * **** These plugin parameters allow you to offset the position of the enemy
 *      name positions on the screen by a specific amount.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Actors now use their casting or charging animations again during TPB/ATB.
 *    Fix made by Yanfly.
 * ** Defeat requirement for enemies will no longer crash the game if turned on
 *    after creating
 * ** Escaping animation no longer has actors stay in place. Fixed by Yanfly.
 * ** Failsafes added for newly added weapon types that have not been adjusted
 *    in the Database > System 2 tab. Fixed by Irina.
 * ** Shadows now appear under the actor sprites. Fix made by Yanfly.
 * ** Victory during TPB will no longer cancel the victory animations of
 *    actors that will have their turn after. Fixed by Yanfly.
 * * Documentation Update!
 * ** All Anchor Plugin Parameter descriptions now state to use values between
 *    0 and 1 to be safe. Update made by Yanfly.
 * * Feature Update!
 * ** During Active TPB / ATB, canceling out of the actor command window will
 *    go directly into the party window without having to sort through all of
 *    the available active actors.
 * ** Going from the Party Command Window's Fight command will immediately
 *    return back to the actor command window that was canceled from.
 * * New Features!
 * ** Action Sequence Plugin Command "MOVE: Spin/Rotate" has been updated.
 * *** A new parameter has been added: "Revert Angle on Finish"
 * *** Added by Yanfly.
 * ** New plugin parameters have been added to Damage Settings.
 * *** Appear Position: Selects where you want popups to appear relative to the
 *     battler. Head, Center, Base. Added by Yanfly.
 * *** Offset X: Sets how much to offset the sprites by vertically.
 *     Added by Yanfly.
 * *** Offset Y: Sets how much to offset the sprites by horizontally.
 *     Added by Yanfly.
 * ** New plugin parameters have been added to Actor Battler Settings.
 * *** Priority: Active - Place the active actor on top of actor and
 *     enemy sprites. Added by Yanfly.
 * *** Priority: Actors - Prioritize actors over enemies when placing 
 *     sprites on top of each other. Added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Active Battler Sprites now remain on top and won't be hidden behind
 *    other sprites for better visual clarity. Fix made by Arisu.
 * ** Collapsing battlers will now show the dead motion properly. Fix made by
 *    Olivia.
 * ** Dead battlers can no longer be given immortality. Fix made by Olivia.
 * ** Going into the Options menu with no battleback set will no longer set a
 *    battle snapshot.
 * ** HP Gauges for Sideview Enemies are no longer flipped! Fix made by Yanfly.
 * ** Moving a dead battler would no longer reset their animation. Fix made by
 *    Olivia.
 * ** Pre-Battle Common Events now work with events instead of just random
 *    encounters. Fix made by Yanfly.
 * ** Sideview Enemy shadows no longer twitch. Fix made by Irina.
 * * Documentation Updates!
 * ** Added further explanations for Anchor X and Anchor Y plugin parameters.
 *    This is because there's a lot of confusion for users who aren't familiar
 *    with how sprites work. Added by Irina.
 * ** <Magic Reduction: x> notetag updated to say magical damage instead of
 *    physical damage. Fix made by Yanfly.
 * * New Features!
 * ** Additional Action Sequence Plugin Commands have been added in preparation
 *    of upcoming plugins! Additions made by Irina.
 * *** Action Sequences - Angle (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Camera (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Skew (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Zoom (for VisuMZ_3_ActSeqCamera)
 * ** Additional Action Sequence Plugin Commands have been made available now
 *    and added to Battle Core! Additions made by Irina.
 * *** MOVE: Scale/Grow/Shrink
 * *** MOVE: Skew/Distort
 * *** MOVE: Spin/Rotate
 * *** MOVE: Wait For Scale
 * *** MOVE: Wait For Skew
 * *** MOVE: Wait For Spin
 * ** Plugin Parameters Additions. Additions made by Irina.
 * *** Plugin Params > Actor Battler Settings > Offset X
 * *** Plugin Params > Actor Battler Settings > Offset Y
 * *** Plugin Params > Actor Battler Settings > Smooth Image
 * *** Plugin Params > Enemy Battler Settings > Offset X
 * *** Plugin Params > Enemy Battler Settings > Offset Y
 * *** Plugin Params > Enemy Battler Settings > Smooth Image
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Animated Battlers will refresh their motions from the death motion once
 *    they're revived instead of waiting for their next input phase. Fix made
 *    by Yanfly.
 * ** Battle Log speed sometimes went by too fast for certain enabled messages.
 *    Wait timers are now added to them, like state results, buff results, and
 *    debuff results. Fix made by Yanfly.
 * ** Boss Collapse animation now works properly. Fix made by Yanfly.
 * ** Freeze fix for TPB (Wait) if multiple actors get a turn at the same time.
 *    Fix made by Olivia.
 * ** Pressing cancel on a target window after selecting a single skill no
 *    longer causes the status window to twitch.
 * ** Sideview Enemies had a split frame of being visible if they were to start
 *    off hidden in battle. Fix made by Shaz.
 * * Compatibility Update:
 * ** Battle Core's Sprite_Damage.setup() function is now separated fro the
 *    default to allow for better compatibility. Made by Yanfly.
 * * Documentation Update:
 * ** Inserted more information for "Damage Popups" under "Major Changes"
 * * New Features!
 * ** <Magic Penetration: x>, <Magic Penetration: x%> notetags added.
 * ** <Magic Reduction: x>, <Magic Reduction: x%> notetags added.
 * ** <Battle UI Offset: +x, +y>, <Battle UI Offset X: +x>, and
 *    <Battle UI Offset Y: +y> notetags added for adjusting the positions of
 *    HP Gauges and State Icons.
 * *** Notetags added by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** Failsafes added for parsing battle targets. Fix made by Yanfly.
 * ** Immortality is no longer ignored by skills/items with the Normal Attack
 *    state effect. Fix made by Yanfly.
 * ** Miss and Evasion sound effects work again! Fix made by Yanfly.
 * ** Selecting "Escape" from the Actor Command Window will now have the
 *    Inputting Battler show its escape motion. Fix made by Yanfly.
 * ** Wait for Movement now applies to SV Enemies. Fix made by Yanfly.
 * * New Features!
 * ** Plugin Command "ACSET: Finish Action" now has an option to turn off the
 *    Immortality of targets. Feature added by Yanfly.
 * * Optimization Update
 * ** Uses less resources when making checks for Pre-Battle Battle Start events
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Plugin Parameters > Damage Settings > Damage Formats are now fixed.
 *    Fix made by Olivia.
 * ** TPB Battle System with Disable Party Command fixed. Fix made by Olivia.
 * ** States now show in list format if faces are disabled. Fix made by Yanfly.
 * ** The default damage styles were missing the 'v' variable to allow for
 *    variable data input. These are back now. Fix made by Yanfly.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Damage Settings > Style List > the style
 *     you want, and adding "const v = $gameVariables._data;" to JS: Formula
 * * New Notetags Added:
 * ** <Command Show Switch: x> added by Olivia
 * ** <Command Show All Switches: x,x,x> added by Olivia
 * ** <Command Show Any Switches: x,x,x> added by Olivia
 * ** <Command Hide Switch: x> added by Olivia
 * ** <Command Hide All Switches: x,x,x> added by Olivia
 * ** <Command Hide Any Switches: x,x,x> added by Olivia
 * ** <JS Command Visible> added by Olivia
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
 * @command ActionSequenceSpaceStart
 * @text -
 * @desc The following are Action Sequences commands/sets.
 * These Plugin Commands only work in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakSet
 * @text Action Sequence - Action Sets
 * @desc Action Sequence Action Sets are groups of commonly used
 * Action Sequence Commands put together for more efficient usage.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_SetupAction
 * @text ACSET: Setup Action Set
 * @desc The generic start to most actions.
 * 
 * @arg DisplayAction:eval
 * @text Display Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: On
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionStart:eval
 * @text Battle Step
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg CastAnimation:eval
 * @text Cast Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_WholeActionSet
 * @text ACSET: All Targets Action Set
 * @desc Affects all targets simultaneously performing the following.
 * 
 * @arg DualWield:eval
 * @text Dual/Multi Wield?
 * @type boolean
 * @on Apply
 * @off Don't
 * @desc Add times struck based on weapon quantity equipped?
 * @default false
 * 
 * @arg PerformAction:eval
 * @text Perform Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed
 * 
 * @arg ActionAnimation:eval
 * @text Action Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionEffect:eval
 * @text Action Effect
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_TargetActionSet
 * @text ACSET: Each Target Action Set
 * @desc Goes through each target one by one to perform the following.
 * 
 * @arg DualWield:eval
 * @text Dual/Multi Wield?
 * @type boolean
 * @on Apply
 * @off Don't
 * @desc Add times struck based on weapon quantity equipped?
 * @default false
 * 
 * @arg PerformAction:eval
 * @text Perform Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount1:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed
 * 
 * @arg ActionAnimation:eval
 * @text Action Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount2:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed * 2
 * 
 * @arg ActionEffect:eval
 * @text Action Effect
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_FinishAction
 * @text ACSET: Finish Action
 * @desc The generic ending to most actions.
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForNewLine:eval
 * @text Wait For New Line
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForEffect:eval
 * @text Wait For Effects
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ClearBattleLog:eval
 * @text Clear Battle Log
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionEnd:eval
 * @text Home Reset
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceAngle
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakAngle
 * @text Action Sequences - Angle
 * @desc Allows you to have control over the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_ChangeAngle
 * @text ANGLE: Change Angle
 * @desc Changes the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Angle:eval
 * @text Angle
 * @desc Change the camera angle to this many degrees.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change camera angle.
 * @default 60
 *
 * @arg EasingType:str
 * @text Angle Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForAngle:eval
 * @text Wait For Angle?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for angle changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Angle_Reset
 * @text ANGLE: Reset Angle
 * @desc Reset any angle settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset camera angle.
 * @default 60
 *
 * @arg EasingType:str
 * @text Angle Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForAngle:eval
 * @text Wait For Angle?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for angle changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Angle_WaitForAngle
 * @text ANGLE: Wait For Angle
 * @desc Waits for angle changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceAnimation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakAnimation
 * @text Action Sequences - Animations
 * @desc These Action Sequences are related to the 'Animations' that
 * can be found in the Animations tab of the Database.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ActionAnimation
 * @text ANIM: Action Animation
 * @desc Plays the animation associated with the action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_AttackAnimation
 * @text ANIM: Attack Animation
 * @desc Plays the animation associated with the user's 1st weapon.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_AttackAnimation2
 * @text ANIM: Attack Animation 2+
 * @desc Plays the animation associated with the user's other weapons.
 * Plays nothing if there is no other weapon equipped.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg Slot:eval
 * @text Slot
 * @desc Which weapon slot to get this data from?
 * Main-hand weapon is weapon slot 1.
 * @default 2
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default true
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_CastAnimation
 * @text ANIM: Cast Animation
 * @desc Plays the cast animation associated with the action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["user"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ChangeBattlePortrait
 * @text ANIM: Change Battle Portrait
 * @desc Changes the battle portrait of the actor (if it's an actor).
 * Can be used outside of battle/action sequences.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to change the portraits for.
 * Valid units can only be actors.
 * @default ["user"]
 * 
 * @arg Filename:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Select the file to change the actor's portrait to.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ShowAnimation
 * @text ANIM: Show Animation
 * @desc Plays the a specific animation on unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg AnimationID:num
 * @text Animation ID
 * @type animation
 * @desc Select which animation to play on unit(s).
 * @default 1
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_WaitForAnimation
 * @text ANIM: Wait For Animation
 * @desc Causes the interpreter to wait for any animation(s) to finish.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceBattleLog
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakBattleLog
 * @text Action Sequences - Battle Log
 * @desc These Action Sequences are related to the Battle Log Window,
 * the window found at the top of the battle screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_AddText
 * @text BTLOG: Add Text
 * @desc Adds a new line of text into the Battle Log.
 * 
 * @arg Text:str
 * @text Text
 * @desc Add this text into the Battle Log.
 * Text codes allowed.
 * @default Insert text here.
 * 
 * @arg CopyCombatLog:eval
 * @text Copy to Combat Log?
 * @type boolean
 * @on Copy Text
 * @off Don't Copy
 * @desc Copies text to the Combat Log.
 * Requires VisuMZ_4_CombatLog
 * @default true
 *
 * @arg CombatLogIcon:num
 * @text Combat Log Icon
 * @parent CopyCombatLog:eval
 * @desc What icon would you like to bind to this entry?
 * Requires VisuMZ_4_CombatLog
 * @default 87
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_Clear
 * @text BTLOG: Clear Battle Log
 * @desc Clears all the text in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_DisplayAction
 * @text BTLOG: Display Action
 * @desc Displays the current action in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_PopBaseLine
 * @text BTLOG: Pop Base Line
 * @desc Removes the Battle Log's last added base line and 
 * all text up to its former location.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_PushBaseLine
 * @text BTLOG: Push Base Line
 * @desc Adds a new base line to where the Battle Log currently is at.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_Refresh
 * @text BTLOG: Refresh Battle Log
 * @desc Refreshes the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_UI
 * @text BTLOG: UI Show/Hide
 * @desc Shows or hides the Battle UI (including the Battle Log).
 * 
 * @arg ShowHide:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides the Battle UI.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_WaitForBattleLog
 * @text BTLOG: Wait For Battle Log
 * @desc Causes the interpreter to wait for the Battle Log to finish.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_WaitForNewLine
 * @text BTLOG: Wait For New Line
 * @desc Causes the interpreter to wait for a new line in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceCamera
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakCamera
 * @text Action Sequences - Camera
 * @desc Allows you to have control over the camera.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Clamp
 * @text CAMERA: Clamp ON/OFF
 * @desc Turns battle camera clamping on/off.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Setting:eval
 * @text ON/OFF
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Turns camera clamping on/off.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_FocusPoint
 * @text CAMERA: Focus Point
 * @desc Focus the battle camera on a certain point in the screen.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg FocusX:eval
 * @text X Coordinate
 * @desc Insert the point to focus the camera on.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg FocusY:eval
 * @text Y Coordinate
 * @desc Insert the point to focus the camera on.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for camera focus change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_FocusTarget
 * @text CAMERA: Focus Target(s)
 * @desc Focus the battle camera on certain battler target(s).
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to focus the battle camera on.
 * @default ["user"]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for camera focus change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Offset
 * @text CAMERA: Offset
 * @desc Offset the battle camera from the focus target.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @desc How much to offset the camera X by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc How much to offset the camera Y by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for offset change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Reset
 * @text CAMERA: Reset
 * @desc Reset the battle camera settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg ResetFocus:eval
 * @text Reset Focus?
 * @type boolean
 * @on On
 * @off Off
 * @desc Reset the focus point?
 * @default true
 * 
 * @arg ResetOffset:eval
 * @text Reset Offset?
 * @type boolean
 * @on On
 * @off Off
 * @desc Reset the camera offset?
 * @default true
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for reset change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_WaitForCamera
 * @text CAMERA: Wait For Camera
 * @desc Waits for camera to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 *
 * @command ActionSequenceSpaceDragonbones
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreaDragonbones
 * @text Action Sequences - Dragonbones
 * @desc These Action Sequences are Dragonbones-related.
 * Requires VisuMZ_2_DragonbonesUnion!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_DB_DragonbonesMotionAni
 * @text DB: Dragonbones Animation
 * @desc Causes the unit(s) to play a Dragonbones motion animation.
 * Requires VisuMZ_2_DragonbonesUnion!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion animation.
 * @default ["user"]
 *
 * @arg MotionAni:str
 * @text Motion Animation
 * @desc What is the name of the Dragonbones motion animation you wish to play?
 * @default attack
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_DB_DragonbonesTimeScale
 * @text DB: Dragonbones Time Scale
 * @desc Causes the unit(s) to change their Dragonbones time scale.
 * Requires VisuMZ_2_DragonbonesUnion!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion animation.
 * @default ["user"]
 *
 * @arg TimeScale:num
 * @text Time Scale
 * @desc Change the value of the Dragonbones time scale to this.
 * @default 1.0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceElements
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakElements
 * @text Action Sequences - Elements
 * @desc These Action Sequences are related to elements.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_AddElements
 * @text ELE: Add Elements
 * @desc Adds element(s) to be used when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @arg Elements:arraynum
 * @text Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which element ID to add onto the action.
 * Insert multiple element ID's to add multiple at once.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_Clear
 * @text ELE: Clear Element Changes
 * @desc Clears all element changes made through Action Sequences.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_ForceElements
 * @text ELE: Force Elements
 * @desc Forces only specific element(s) when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @arg Elements:arraynum
 * @text Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which element ID to force in the action.
 * Insert multiple element ID's to force multiple at once.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_NullElements
 * @text ELE: Null Element
 * @desc Forces no element to be used when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceHorror
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakHorror
 * @text Action Sequences - Horror Effects
 * @desc These Action Sequences are Horror Effects-related.
 * Requires VisuMZ_2_HorrorEffects!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_Clear
 * @text HORROR: Clear All Filters
 * @desc Clear all Horror Effects filters on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove Horror Effects for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_GlitchCreate
 * @text HORROR: Glitch Create
 * @desc Creates the glitch effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create the Horror Effect for.
 * @default ["user"]
 *
 * @arg slices:num
 * @text Glitch Slices
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Glitch slices to be used with the target.
 * @default 10
 *
 * @arg offset:num
 * @text Glitch Offset
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Default offset value.
 * @default 100
 *
 * @arg animated:eval
 * @text Glitch Animated?
 * @parent FilterGlitch
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the glitch effect?
 * @default true
 *
 * @arg aniFrequency:num
 * @text Glitch Frequency
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @arg aniStrength:num
 * @text Glitch Strength
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_GlitchRemove
 * @text HORROR: Glitch Remove
 * @desc Removes the glitch effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove the Horror Effect for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_NoiseCreate
 * @text HORROR: Noise Create
 * @desc Creates the noise effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create the Horror Effect for.
 * @default ["user"]
 *
 * @arg noise:num
 * @text Noise Rate
 * @parent FilterNoise
 * @desc Noise rate to be used with the target.
 * @default 0.3
 *
 * @arg animated:eval
 * @text Noise Animated
 * @parent FilterNoise
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the noise for the target?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_NoiseRemove
 * @text HORROR: Noise Remove
 * @desc Removes the noise effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove the Horror Effect for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_TVCreate
 * @text HORROR: TV Create
 * @desc Creates the TV effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create the Horror Effect for.
 * @default ["user"]
 *
 * @arg lineWidth:num
 * @text TV Line Thickness
 * @parent FilterTV
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 *
 * @arg vignetting:num
 * @text TV Corner Size
 * @parent FilterTV
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @arg animated:eval
 * @text TV Animated
 * @parent FilterTV
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the TV?
 * @default true
 *
 * @arg aniSpeed:num
 * @text TV Speed
 * @parent FilterTV
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_TVRemove
 * @text HORROR: TV Remove
 * @desc Removes the TV effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove the Horror Effect for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceImpact
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakImpact
 * @text Action Sequences - Impact
 * @desc These Action Sequences are related to creating impact.
 * Requires VisuMZ_3_ActSeqImpact!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ColorBreak
 * @text IMPACT: Color Break
 * @desc Breaks the colors on the screen before reassembling.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Intensity:eval
 * @text Intensity
 * @desc What is the intensity of the color break effect?
 * @default 60
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the color break effect?
 * @default 60
 *
 * @arg EasingType:str
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
 * @default OutBack
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionBlurScreen
 * @text IMPACT: Motion Blur Screen
 * @desc Creates a motion blur on the whole screen.
 * Requires VisuMZ_3_ActSeqImpact!
 *
 * @arg Angle:eval
 * @text Angle
 * @desc Determine what angle to make the motion blur at.
 * @default Math.randomInt(360)
 *
 * @arg Rate:eval
 * @text Intensity Rate
 * @desc This determines intensity rate of the motion blur.
 * Use a number between 0 and 1.
 * @default 0.1
 *
 * @arg Duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion blur last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg EasingType:str
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
 * @default InOutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionBlurTarget
 * @text IMPACT: Motion Blur Target(s)
 * @desc Creates a motion blur on selected target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create motion blur effects for.
 * @default ["user"]
 *
 * @arg Angle:eval
 * @text Angle
 * @desc Determine what angle to make the motion blur at.
 * @default Math.randomInt(360)
 *
 * @arg Rate:eval
 * @text Intensity Rate
 * @desc This determines intensity rate of the motion blur.
 * Use a number between 0 and 1.
 * @default 0.5
 *
 * @arg Duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion blur last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg EasingType:str
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
 * @default InOutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionTrailCreate
 * @text IMPACT: Motion Trail Create
 * @desc Creates a motion trail effect for the target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create motion trail effects for.
 * @default ["user"]
 *
 * @arg delay:num
 * @text Delay
 * @type Number
 * @min 1
 * @desc How many frames to delay by when creating a motion trail?
 * The higher the delay, the less after images there are.
 * @default 1
 *
 * @arg duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion trail last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg hue:num
 * @text Hue
 * @type Number
 * @min 0
 * @max 255
 * @desc What do you want to be the hue for the motion trail?
 * @default 0
 *
 * @arg opacityStart:num
 * @text Starting Opacity
 * @type Number
 * @min 0
 * @max 255
 * @desc What starting opacity value do you want for the motion
 * trail? Opacity values decrease over time.
 * @default 200
 *
 * @arg tone:eval
 * @text Tone
 * @desc What tone do you want for the motion trail?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionTrailRemove
 * @text IMPACT: Motion Trail Remove
 * @desc Removes the motion trail effect from the target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to clear motion trail effects for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ShockwavePoint
 * @text IMPACT: Shockwave at Point
 * @desc Creates a shockwave at the designated coordinates.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Coordinates
 * 
 * @arg X:eval
 * @text Point: X
 * @parent Coordinates
 * @desc What x coordinate do you want to create a shockwave at?
 * You can use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg Y:eval
 * @text Point: Y
 * @parent Coordinates
 * @desc What y coordinate do you want to create a shockwave at?
 * You can use JavaScript code.
 * @default (Graphics.height - 200) / 2
 * 
 * @arg Amp:eval
 * @text Amplitude
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @arg Wave:eval
 * @text Wavelength
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the shockwave?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ShockwaveEachTargets
 * @text IMPACT: Shockwave from Each Target(s)
 * @desc Creates a shockwave at each of the target(s) location(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to start a shockwave from.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to start a shockwave from.
 * @default middle center
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @parent TargetLocation:str
 * @desc How much to offset the shockwave X point by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @parent TargetLocation:str
 * @desc How much to offset the shockwave Y point by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Amp:eval
 * @text Amplitude
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @arg Wave:eval
 * @text Wavelength
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the shockwave?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ShockwaveCenterTargets
 * @text IMPACT: Shockwave from Target(s) Center
 * @desc Creates a shockwave from the center of the target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to start a shockwave from.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to start a shockwave from.
 * @default middle center
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @parent TargetLocation:str
 * @desc How much to offset the shockwave X point by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @parent TargetLocation:str
 * @desc How much to offset the shockwave Y point by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Amp:eval
 * @text Amplitude
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @arg Wave:eval
 * @text Wavelength
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the shockwave?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ZoomBlurPoint
 * @text IMPACT: Zoom Blur at Point
 * @desc Creates a zoom blur at the designated coordinates.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Coordinates
 * 
 * @arg X:eval
 * @text Point: X
 * @parent Coordinates
 * @desc What x coordinate do you want to focus the zoom at?
 * You can use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg Y:eval
 * @text Point: Y
 * @parent Coordinates
 * @desc What y coordinate do you want to focus the zoom at?
 * You can use JavaScript code.
 * @default (Graphics.height - 200) / 2
 * 
 * @arg Strength:eval
 * @text Zoom Strength
 * @desc What is the strength of the zoom effect?
 * Use a number between 0 and 1.
 * @default 0.5
 * 
 * @arg Radius:eval
 * @text Visible Radius
 * @desc How much of a radius should be visible from the center?
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the zoom blur?
 * @default 60
 *
 * @arg EasingType:str
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
 * @default OutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ZoomBlurTargetCenter
 * @text IMPACT: Zoom Blur at Target(s) Center
 * @desc Creates a zoom blur at the center of targets.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to start a zoom blur from.
 * @default ["user"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to start a zoom blur from.
 * @default middle center
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @parent TargetLocation:str
 * @desc How much to offset the zoom blur X point by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @parent TargetLocation:str
 * @desc How much to offset the zoom blur Y point by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Strength:eval
 * @text Zoom Strength
 * @desc What is the strength of the zoom effect?
 * Use a number between 0 and 1.
 * @default 0.5
 * 
 * @arg Radius:eval
 * @text Visible Radius
 * @desc How much of a radius should be visible from the center?
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the zoom blur?
 * @default 60
 *
 * @arg EasingType:str
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
 * @default OutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMechanics
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMechanics
 * @text Action Sequences - Mechanics
 * @desc These Action Sequences are related to various mechanics
 * related to the battle system.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_ActionEffect
 * @text MECH: Action Effect
 * @desc Causes the unit(s) to take damage/healing from action and
 * incurs any changes made such as buffs and states.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the current action's effects.
 * @default ["all targets"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AddBuffDebuff
 * @text MECH: Add Buff/Debuff
 * @desc Adds buff(s)/debuff(s) to unit(s). 
 * Determine which parameters are affected and their durations.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the buff(s) and/or debuff(s).
 * @default ["user"]
 * 
 * @arg Buffs:arraystr
 * @text Buff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which parameter(s) to buff.
 * Insert a parameter multiple times to raise its stacks.
 * @default ["ATK"]
 *
 * @arg Debuffs:arraystr
 * @text Debuff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which parameter(s) to debuff.
 * Insert a parameter multiple times to raise its stacks.
 * @default ["DEF"]
 * 
 * @arg Turns:eval
 * @text Turns
 * @desc Number of turns to set the parameter(s) buffs to.
 * You may use JavaScript code.
 * @default 5
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AddState
 * @text MECH: Add State
 * @desc Adds state(s) to unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the buff(s).
 * @default ["user"]
 * 
 * @arg States:arraynum
 * @text States
 * @type state[]
 * @desc Select which state ID(s) to add to unit(s).
 * Insert multiple state ID's to add multiple at once.
 * @default ["4"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AnalyzeWeakness
 * @text MECH: Analyze Weakness
 * @desc Reveal elemental weakness(es) from target(s).
 * Requires VisuMZ_3_WeaknessDisplay!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to reveal elemental weaknesses for.
 * @default ["all targets"]
 * 
 * @arg Reveal:eval
 * @text Reveal
 * @desc How many elemental weaknesses do you wish to reveal?
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_ArmorPenetration
 * @text MECH: Armor Penetration
 * @desc Adds an extra layer of defensive penetration/reduction.
 * You may use JavaScript code for any of these.
 *
 * @arg ArmorPenetration
 * @text Armor/Magic Penetration
 * 
 * @arg ArPenRate:eval
 * @text Rate
 * @parent ArmorPenetration
 * @desc Penetrates an extra multiplier of armor by this value.
 * @default 0.00
 * 
 * @arg ArPenFlat:eval
 * @text Flat
 * @parent ArmorPenetration
 * @desc Penetrates a flat amount of armor by this value.
 * @default 0
 *
 * @arg ArmorReduction
 * @text Armor/Magic Reduction
 * 
 * @arg ArRedRate:eval
 * @text Rate
 * @parent ArmorReduction
 * @desc Reduces an extra multiplier of armor by this value.
 * @default 0.00
 * 
 * @arg ArRedFlat:eval
 * @text Flat
 * @parent ArmorReduction
 * @desc Reduces a flat amount of armor by this value.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AtbGauge
 * @text MECH: ATB Gauge
 * @desc Alters the ATB/TPB Gauges.
 * Requires VisuMZ_2_BattleSystemATB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the ATB/TPB Gauges for.
 * @default ["all targets"]
 *
 * @arg Charging
 * 
 * @arg ChargeRate:eval
 * @text Charge Rate
 * @parent Charging
 * @desc Changes made to the ATB Gauge if it is currently charging.
 * @default -0.00
 * 
 * @arg Casting
 * 
 * @arg CastRate:eval
 * @text Cast Rate
 * @parent Casting
 * @desc Changes made to the ATB Gauge if it is currently casting.
 * @default -0.00
 * 
 * @arg Interrupt:eval
 * @text Interrupt?
 * @parent Casting
 * @type boolean
 * @on Interrupt
 * @off Don't Interrupt
 * @desc Interrupt the ATB Gauge if it is currently casting?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_BoostPointsChange
 * @text MECH: Boost Points Change
 * @desc Changes Boost Points for target(s).
 * Requires VisuMZ_3_BoostAction!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the Boost Points for.
 * @default ["user"]
 * 
 * @arg BoostPoints:eval
 * @text Alter Boost Points By
 * @desc Alters the unit(s) Boost Points.
 * Positive for gaining points. Negative for losing points.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_BoostPointsStoreData
 * @text MECH: Boost Store Data
 * @desc Stores the number of Boosts used this action inside a variable.
 * Requires VisuMZ_3_BoostAction!
 * 
 * @arg VariableID:num
 * @text Variable ID
 * @type variable
 * @desc Which variable do you want to store the data inside?
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_BreakShieldChange
 * @text MECH: Break Shield Change
 * @desc Changes Break Shields for target(s) if not Break Stunned.
 * Requires VisuMZ_4_BreakShields!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the Break Shields for.
 * @default ["all targets"]
 * 
 * @arg BreakShields:eval
 * @text Alter Break Shields By
 * @desc Alters the unit(s) Break Shields.
 * Positive for gaining shields. Negative for losing shields.
 * @default -1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_BreakShieldReset
 * @text MECH: Break Shield Reset
 * @desc Resets Break Shields for target(s) if not Break Stunned.
 * Requires VisuMZ_4_BreakShields!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to reset the Break Shields for.
 * @default ["all targets"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_BtbGain
 * @text MECH: BTB Brave Points
 * @desc Alters the target(s) Brave Points to an exact value.
 * Requires VisuMZ_2_BattleSystemBTB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the ATB/TPB Gauges for.
 * @default ["all targets"]
 * 
 * @arg BravePoints:eval
 * @text Alter Brave Points By
 * @desc Alters the target(s) Brave Points.
 * Positive for gaining BP. Negative for losing BP.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Collapse
 * @text MECH: Collapse
 * @desc Causes the unit(s) to perform its collapse animation
 * if the unit(s) has died.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to process a death collapse.
 * @default ["all targets"]
 * 
 * @arg ForceDeath:eval
 * @text Force Death
 * @type boolean
 * @on On
 * @off Off
 * @desc Force death even if the unit has not reached 0 HP?
 * This will remove immortality.
 * @default false
 * 
 * @arg WaitForEffect:eval
 * @text Wait For Effect?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for the collapse effect to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_CtbOrder
 * @text MECH: CTB Order
 * @desc Alters the CTB Turn Order.
 * Requires VisuMZ_2_BattleSystemCTB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the CTB Turn Order for.
 * @default ["all targets"]
 *
 * @arg ChangeOrderBy:eval
 * @text Change Order By
 * @parent Charging
 * @desc Changes turn order for target(s) by this amount.
 * Positive increases wait. Negative decreases wait.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_CtbSpeed
 * @text MECH: CTB Speed
 * @desc Alters the CTB Speed.
 * Requires VisuMZ_2_BattleSystemCTB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the CTB Speed for.
 * @default ["all targets"]
 *
 * @arg ChargeRate:eval
 * @text Charge Rate
 * @parent Charging
 * @desc Changes made to the CTB Speed if it is currently charging.
 * @default -0.00
 * 
 * @arg CastRate:eval
 * @text Cast Rate
 * @parent Casting
 * @desc Changes made to the CTB Speed if it is currently casting.
 * @default -0.00
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_CustomDmgFormula
 * @text MECH: Custom Damage Formula
 * @desc Changes the current action's damage formula to custom.
 * This will assume the MANUAL damage style.
 * 
 * @arg Formula:str
 * @text Formula
 * @desc Changes the current action's damage formula to custom.
 * Use 'default' to revert the damage formula.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_DamagePopup
 * @text MECH: Damage Popup
 * @desc Causes the unit(s) to display the current state of
 * damage received or healed.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a damage popup.
 * @default ["all targets"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_DeathBreak
 * @text MECH: Dead Label Jump
 * @desc If the active battler is dead, jump to a specific label in the common event.
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If the active battler is dead, jump to this specific label in the common event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_FtbAction
 * @text MECH: FTB Action Count
 * @desc Alters the subject team's available Action Count.
 * Requires VisuMZ_2_BattleSystemFTB!
 * 
 * @arg ActionCount:eval
 * @text Action Count
 * @desc Alters the subject team's available Action Count.
 * Positive for gaining actions. Negative for losing actions.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_HpMpTp
 * @text MECH: HP, MP, TP
 * @desc Alters the HP, MP, and TP values for unit(s).
 * Positive values for healing. Negative values for damage.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the current action's effects.
 * @default ["user"]
 *
 * @arg HP
 * 
 * @arg HP_Rate:eval
 * @text HP Rate
 * @parent HP
 * @desc Changes made to HP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg HP_Flat:eval
 * @text HP Flat
 * @parent HP
 * @desc Flat changes made to HP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 * 
 * @arg MP
 * 
 * @arg MP_Rate:eval
 * @text MP Rate
 * @parent MP
 * @desc Changes made to MP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg MP_Flat:eval
 * @text MP Flat
 * @parent MP
 * @desc Flat changes made to MP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 *
 * @arg TP
 * 
 * @arg TP_Rate:eval
 * @text TP Rate
 * @parent TP
 * @desc Changes made to TP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg TP_Flat:eval
 * @text TP Flat
 * @parent TP
 * @desc Flat changes made to TP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 * 
 * @arg ShowPopup:eval
 * @text Damage Popup?
 * @type boolean
 * @on On
 * @off Off
 * @desc Display a damage popup after?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Immortal
 * @text MECH: Immortal
 * @desc Changes the immortal flag of targets. If immortal flag is
 * removed and a unit would die, collapse that unit.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Alter the immortal flag of these groups. If immortal flag
 * is removed and a unit would die, collapse that unit.
 * @default ["user","all targets"]
 * 
 * @arg Immortal:eval
 * @text Immortal
 * @type boolean
 * @on On
 * @off Off
 * @desc Turn immortal flag for unit(s) on/off?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Multipliers
 * @text MECH: Multipliers
 * @desc Changes the multipliers for the current action.
 * You may use JavaScript code for any of these.
 *
 * @arg CriticalHit
 * @text Critical Hit%
 * 
 * @arg CriticalHitRate:eval
 * @text Rate
 * @parent CriticalHit
 * @desc Affects chance to land a critical hit by this multiplier.
 * @default 1.00
 * 
 * @arg CriticalHitFlat:eval
 * @text Flat
 * @parent CriticalHit
 * @desc Affects chance to land a critical hit by this flat bonus.
 * @default +0.00
 *
 * @arg CriticalDmg
 * @text Critical Damage
 * 
 * @arg CriticalDmgRate:eval
 * @text Rate
 * @parent CriticalDmg
 * @desc Affects critical damage by this multiplier.
 * @default 1.00
 * 
 * @arg CriticalDmgFlat:eval
 * @text Flat
 * @parent CriticalDmg
 * @desc Affects critical damage by this flat bonus.
 * @default +0.00
 *
 * @arg Damage
 * @text Damage/Healing
 * 
 * @arg DamageRate:eval
 * @text Rate
 * @parent Damage
 * @desc Sets the damage/healing multiplier for current action.
 * @default 1.00
 * 
 * @arg DamageFlat:eval
 * @text Flat
 * @parent Damage
 * @desc Sets the damage/healing bonus for current action.
 * @default +0.00
 *
 * @arg HitRate
 * @text Hit Rate
 * 
 * @arg HitRate:eval
 * @text Rate
 * @parent HitRate
 * @desc Affects chance to connect attack by this multiplier.
 * @default 1.00
 * 
 * @arg HitFlat:eval
 * @text Flat
 * @parent HitRate
 * @desc Affects chance to connect attack by this flat bonus.
 * @default +0.00
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_RemoveBuffDebuff
 * @text MECH: Remove Buff/Debuff
 * @desc Removes buff(s)/debuff(s) from unit(s). 
 * Determine which parameters are removed.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to have the buff(s) and/or debuff(s) removed.
 * @default ["user"]
 * 
 * @arg Buffs:arraystr
 * @text Buff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which buffed parameter(s) to remove.
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @arg Debuffs:arraystr
 * @text Debuff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which debuffed parameter(s) to remove.
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_RemoveState
 * @text MECH: Remove State
 * @desc Remove state(s) from unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to have states removed from.
 * @default ["user"]
 * 
 * @arg States:arraynum
 * @text States
 * @type state[]
 * @desc Select which state ID(s) to remove from unit(s).
 * Insert multiple state ID's to remove multiple at once.
 * @default ["4"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_StbExploit
 * @text MECH: STB Exploit Effect
 * @desc Utilize the STB Exploitation mechanics!
 * Requires VisuMZ_2_BattleSystemSTB!
 * 
 * @arg Exploited:eval
 * @text Target(s) Exploited?
 * @type boolean
 * @on Exploit
 * @off Don't
 * @desc Exploit the below targets?
 * @default true
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to become exploited.
 * @default ["all targets"]
 * 
 * @arg ForceExploited:eval
 * @text Force Exploitation
 * @type boolean
 * @on Force
 * @off Don't
 * @desc Force the exploited status?
 * @default false
 * 
 * @arg Exploiter:eval
 * @text User Exploiter?
 * @type boolean
 * @on Exploit
 * @off Don't
 * @desc Allow the user to become the exploiter?
 * @default true
 * 
 * @arg ForceExploited:eval
 * @text Force Exploitation
 * @type boolean
 * @on Force
 * @off Don't
 * @desc Force the exploiter status?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_StbExtraAction
 * @text MECH: STB Extra Action
 * @desc Adds an extra action for the currently active battler.
 * Requires VisuMZ_2_BattleSystemSTB!
 * 
 * @arg Actions:eval
 * @text Extra Actions
 * @parent Charging
 * @desc How many extra actions should the active battler gain?
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_StbRemoveExcessActions
 * @text MECH: STB Remove Excess Actions
 * @desc Removes excess actions from the active battler.
 * Requires VisuMZ_2_BattleSystemSTB!
 * 
 * @arg Actions:eval
 * @text Remove Actions
 * @parent Charging
 * @desc How many actions to remove from the active battler?
 * You may use JavaScript code.
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_SwapWeapon
 * @text MECH: Swap Weapon
 * @desc Causes the unit(s) to swap their weapon for another.
 * Requires VisuMZ_2_WeaponSwapSystem!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to swap weapons for.
 * @default ["user"]
 * 
 * @arg WeaponTypeID:eval
 * @text Weapon Type ID
 * @desc Which weapon type to swap to?
 * This is NOT the weapon's ID. It's the weapon TYPE.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_TextPopup
 * @text MECH: Text Popup
 * @desc Causes the unit(s) to display a text popup.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a text popup.
 * @default ["target"]
 * 
 * @arg Text:str
 * @text Text
 * @desc What text do you wish to display?
 * @default Text
 * 
 * @arg TextColor:str
 * @text Text Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @arg FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @arg FlashDuration:num
 * @text Flash Duration
 * @parent FlashColor:eval
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_VariablePopup
 * @text MECH: Variable Popup
 * @desc Causes the unit(s) to display a popup using the data
 * stored inside a variable.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a text popup.
 * @default ["target"]
 * 
 * @arg Variable:num
 * @text Variable ID
 * @type variable
 * @desc Get data from which variable to display as a popup?
 * @default 1
 * 
 * @arg DigitGrouping:eval
 * @text Digit Grouping
 * @parent Variable:num
 * @type boolean
 * @on Group Digits
 * @off Don't Group
 * @desc Use digit grouping to separate numbers?
 * Requires VisuMZ_0_CoreEngine!
 * @default true
 * 
 * @arg TextColor:str
 * @text Text Color
 * @parent Variable:num
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @arg FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 0, 0, 0]
 * 
 * @arg FlashDuration:num
 * @text Flash Duration
 * @parent FlashColor:eval
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_WaitForEffect
 * @text MECH: Wait For Effect
 * @desc Waits for the effects to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMotion
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMotion
 * @text Action Sequences - Motion
 * @desc These Action Sequences allow you the ability to control
 * the motions of sideview sprites.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_ClearFreezeFrame
 * @text MOTION: Clear Freeze Frame
 * @desc Clears any freeze frames from the unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to clear freeze frames for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_FreezeMotionFrame
 * @text MOTION: Freeze Motion Frame
 * @desc Forces a freeze frame instantly at the selected motion.
 * Automatically clears with a new motion.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to freeze motions for.
 * @default ["user"]
 *
 * @arg MotionType:str
 * @text Motion Type
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Freeze this motion for the unit(s).
 * @default attack
 * 
 * @arg Frame:num
 * @text Frame Index
 * @desc Which frame do you want to freeze the motion on?
 * Frame index values start at 0.
 * @default 2
 *
 * @arg ShowWeapon:eval
 * @text Show Weapon?
 * @type combo
 * @type boolean
 * @on Show
 * @off Hide
 * @desc If using 'attack', 'thrust', 'swing', or 'missile',
 * display the weapon sprite?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_MotionType
 * @text MOTION: Motion Type
 * @desc Causes the unit(s) to play the selected motion.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion.
 * @default ["user"]
 *
 * @arg MotionType:str
 * @text Motion Type
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default attack
 *
 * @arg ShowWeapon:eval
 * @text Show Weapon?
 * @type combo
 * @type boolean
 * @on Show
 * @off Hide
 * @desc If using 'attack', 'thrust', 'swing', or 'missile',
 * display the weapon sprite?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_PerformAction
 * @text MOTION: Perform Action
 * @desc Causes the unit(s) to play the proper motion based
 * on the current action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_RefreshMotion
 * @text MOTION: Refresh Motion
 * @desc Cancels any set motions unit(s) has to do and use
 * their most natural motion at the moment.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to refresh their motion state.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_WaitMotionFrame
 * @text MOTION: Wait By Motion Frame
 * @desc Creates a wait equal to the number of motion frames passing.
 * Time is based on Plugin Parameters => Actors => Motion Speed.
 *
 * @arg MotionFrameWait:num
 * @text Motion Frames to Wait?
 * @type number
 * @min 1
 * @desc Each "frame" is equal to the value found in
 * Plugin Parameters => Actors => Motion Speed
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMovement
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMovement
 * @text Action Sequences - Movement
 * @desc These Action Sequences allow you the ability to control
 * the sprites of actors and enemies in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_BattleStep
 * @text MOVE: Battle Step
 * @desc Causes the unit(s) to move forward past their home position
 * to prepare for action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FaceDirection
 * @text MOVE: Face Direction
 * @desc Causes the unit(s) to face forward or backward.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Direction:str
 * @text Direction
 * @type combo
 * @option forward
 * @option backward
 * @option random
 * @desc Select which direction to face.
 * @default forward
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FacePoint
 * @text MOVE: Face Point
 * @desc Causes the unit(s) to face a point on the screen.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Point:str
 * @text Point
 * @type combo
 * @option home
 * @option center
 * @option point x, y
 * @desc Select which point to face.
 * Replace 'x' and 'y' with coordinates
 * @default home
 * 
 * @arg FaceAway:eval
 * @text Face Away From?
 * @type boolean
 * @on Turn Away
 * @off Face Directly
 * @desc Face away from the point instead?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FaceTarget
 * @text MOVE: Face Target(s)
 * @desc Causes the unit(s) to face other targets on the screen.
 * Sideview-only!
 * 
 * @arg Targets1:arraystr
 * @text Targets (facing)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Targets2:arraystr
 * @text Targets (destination)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) for the turning unit(s) to face.
 * @default ["current target"]
 * 
 * @arg FaceAway:eval
 * @text Face Away From?
 * @type boolean
 * @on Turn Away
 * @off Face Directly
 * @desc Face away from the unit(s) instead?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Float
 * @text MOVE: Float
 * @desc Causes the unit(s) to float above the ground.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to make float.
 * @default ["user"]
 * 
 * @arg Height:eval
 * @text Desired Height
 * @desc Vertical distance to float upward.
 * You may use JavaScript code.
 * @default 100
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total float amount.
 * @default 12
 *
 * @arg EasingType:str
 * @text Float Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForFloat:eval
 * @text Wait For Float?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for floating to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_HomeReset
 * @text MOVE: Home Reset
 * @desc Causes the unit(s) to move back to their home position(s)
 * and face back to their original direction(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["alive battlers"]
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Jump
 * @text MOVE: Jump
 * @desc Causes the unit(s) to jump into the air.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to make jump.
 * @default ["user"]
 * 
 * @arg Height:eval
 * @text Desired Height
 * @desc Max jump height to go above the ground
 * You may use JavaScript code.
 * @default 100
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total jump amount.
 * @default 12
 * 
 * @arg WaitForJump:eval
 * @text Wait For Jump?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for jumping to complete before performing next command?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveBy
 * @text MOVE: Move Distance
 * @desc Moves unit(s) by a distance from their current position(s).
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 *
 * @arg DistanceAdjust:str
 * @text Distance Adjustment
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to distance values to determine
 * which direction to move unit(s).
 * @default horz
 * 
 * @arg DistanceX:eval
 * @text Distance: X
 * @parent DistanceAdjust:str
 * @desc Horizontal distance to move.
 * You may use JavaScript code.
 * @default 48
 * 
 * @arg DistanceY:eval
 * @text Distance: Y
 * @parent DistanceAdjust:str
 * @desc Vertical distance to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveToPoint
 * @text MOVE: Move To Point
 * @desc Moves unit(s) to a designated point on the screen.
 * Sideview-only! Points based off Graphics.boxWidth/Height.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg Destination:str
 * @text Destination Point
 * @type combo
 * @option home
 * @option center
 * @option point x, y
 * @desc Select which point to face.
 * Replace 'x' and 'y' with coordinates
 * @default home
 *
 * @arg OffsetAdjust:str
 * @text Offset Adjustment
 * @parent Destination:str
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to offset values to determine
 * which direction to adjust the destination by.
 * @default horz
 * 
 * @arg OffsetX:eval
 * @text Offset: X
 * @parent OffsetAdjust:str
 * @desc Horizontal offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg OffsetY:eval
 * @text Offset: Y
 * @parent OffsetAdjust:str
 * @desc Vertical offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveToTarget
 * @text MOVE: Move To Target(s)
 * @desc Moves unit(s) to another unit(s) on the battle field.
 * Sideview-only!
 * 
 * @arg Targets1:arraystr
 * @text Targets (Moving)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg Targets2:arraystr
 * @text Targets (Destination)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move to.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to move to.
 * @default front base
 * 
 * @arg MeleeDistance:eval
 * @text Melee Distance
 * @parent TargetLocation:str
 * @desc The melee distance away from the target location
 * in addition to the battler's width.
 * @default 24
 *
 * @arg OffsetAdjust:str
 * @text Offset Adjustment
 * @parent Targets2:arraystr
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to offset values to determine
 * which direction to adjust the destination by.
 * @default horz
 * 
 * @arg OffsetX:eval
 * @text Offset: X
 * @parent OffsetAdjust:str
 * @desc Horizontal offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg OffsetY:eval
 * @text Offset: Y
 * @parent OffsetAdjust:str
 * @desc Vertical offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Opacity
 * @text MOVE: Opacity
 * @desc Causes the unit(s) to change opacity.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change opacity.
 * @default ["user"]
 * 
 * @arg Opacity:eval
 * @text Desired Opacity
 * @desc Change to this opacity value.
 * You may use JavaScript code.
 * @default 255
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for opacity change.
 * @default 12
 *
 * @arg EasingType:str
 * @text Opacity Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForOpacity:eval
 * @text Wait For Opacity?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for opacity changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Scale
 * @text MOVE: Scale/Grow/Shrink
 * @desc Causes the unit(s) to scale, grow, or shrink?.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change the scale of.
 * @default ["user"]
 * 
 * @arg ScaleX:eval
 * @text Scale X
 * @desc What target scale value do you want?
 * 1.0 is normal size.
 * @default 1.00
 * 
 * @arg ScaleY:eval
 * @text Scale Y
 * @desc What target scale value do you want?
 * 1.0 is normal size.
 * @default 1.00
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to scale for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Scale Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForScale:eval
 * @text Wait For Scale?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for scaling to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Skew
 * @text MOVE: Skew/Distort
 * @desc Causes the unit(s) to skew.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to skew.
 * @default ["user"]
 * 
 * @arg SkewX:eval
 * @text Skew X
 * @desc X variance to skew?
 * Use small values for the best results.
 * @default 0.00
 * 
 * @arg SkewY:eval
 * @text Skew Y
 * @desc Y variance to skew?
 * Use small values for the best results.
 * @default 0.00
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to skew for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Skew Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Spin
 * @text MOVE: Spin/Rotate
 * @desc Causes the unit(s) to spin.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to spin.
 * @default ["user"]
 * 
 * @arg Angle:eval
 * @text Angle
 * @desc How many degrees to spin?
 * @default 360
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to spin for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Spin Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg RevertAngle:eval
 * @text Revert Angle on Finish
 * @type boolean
 * @on Revert
 * @off Don't
 * @desc Revert angle after spinning?
 * @default true
 * 
 * @arg WaitForSpin:eval
 * @text Wait For Spin?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for spin to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForFloat
 * @text MOVE: Wait For Float
 * @desc Waits for floating to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForJump
 * @text MOVE: Wait For Jump
 * @desc Waits for jumping to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForMovement
 * @text MOVE: Wait For Movement
 * @desc Waits for movement to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForOpacity
 * @text MOVE: Wait For Opacity
 * @desc Waits for opacity changes to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForScale
 * @text MOVE: Wait For Scale
 * @desc Waits for scaling to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForSkew
 * @text MOVE: Wait For Skew
 * @desc Waits for skewing to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForSpin
 * @text MOVE: Wait For Spin
 * @desc Waits for spinning to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceProjectile
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakProjectile
 * @text Action Sequences - Projectiles
 * @desc Create projectiles on the screen and fire them off at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Projectile_Animation
 * @text PROJECTILE: Animation
 * @desc Create an animation projectile and fire it at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 * 
 * @arg Coordinates
 *
 * @arg Start:struct
 * @text Start Location
 * @parent Coordinates
 * @type struct<ProjectileStart>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"user\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 *
 * @arg Goal:struct
 * @text Goal Location
 * @parent Coordinates
 * @type struct<ProjectileGoal>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"all targets\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 * 
 * @arg Settings
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Settings
 * @type animation
 * @desc Determine which animation to use as a projectile.
 * @default 77
 * 
 * @arg Duration:eval
 * @text Duration
 * @parent Settings
 * @desc Duration for the projectile(s) to travel.
 * @default 20
 * 
 * @arg WaitForProjectile:eval
 * @text Wait For Projectile?
 * @parent Settings
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for projectile(s) to reach their destination before
 * going onto the next command?
 * @default true
 * 
 * @arg Extra:struct
 * @text Extra Settings
 * @type struct<ProjectileExAni>
 * @desc Add extra settings to the projectile?
 * @default {"AutoAngle:eval":"true","AngleOffset:eval":"+0","Arc:eval":"0","EasingType:str":"Linear","Spin:eval":"+0.0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Projectile_Icon
 * @text PROJECTILE: Icon
 * @desc Create an icon projectile and fire it at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 * 
 * @arg Coordinates
 *
 * @arg Start:struct
 * @text Start Location
 * @parent Coordinates
 * @type struct<ProjectileStart>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"user\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 *
 * @arg Goal:struct
 * @text Goal Location
 * @parent Coordinates
 * @type struct<ProjectileGoal>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"all targets\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 * 
 * @arg Settings
 *
 * @arg Icon:eval
 * @text Icon Index
 * @parent Settings
 * @desc Determine which icon to use as a projectile.
 * You may use JavaScript code.
 * @default 118
 * 
 * @arg Duration:eval
 * @text Duration
 * @parent Settings
 * @desc Duration for the projectile(s) to travel.
 * @default 20
 * 
 * @arg WaitForProjectile:eval
 * @text Wait For Projectile?
 * @parent Settings
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for projectile(s) to reach their destination before
 * going onto the next command?
 * @default true
 * 
 * @arg Extra:struct
 * @text Extra Settings
 * @type struct<ProjectileExtra>
 * @desc Add extra settings to the projectile?
 * @default {"AutoAngle:eval":"true","AngleOffset:eval":"+0","Arc:eval":"0","BlendMode:num":"0","EasingType:str":"Linear","Hue:eval":"0","Scale:eval":"1.0","Spin:eval":"+0.0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Projectile_Picture
 * @text PROJECTILE: Picture
 * @desc Create a picture projectile and fire it at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 * 
 * @arg Coordinates
 *
 * @arg Start:struct
 * @text Start Location
 * @parent Coordinates
 * @type struct<ProjectileStart>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"user\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 *
 * @arg Goal:struct
 * @text Goal Location
 * @parent Coordinates
 * @type struct<ProjectileGoal>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"all targets\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 * 
 * @arg Settings
 *
 * @arg Picture:str
 * @text Picture Filename
 * @parent Settings
 * @type file
 * @dir img/pictures/
 * @desc Determine which picture to use as a projectile.
 * @default Untitled
 * 
 * @arg Duration:eval
 * @text Duration
 * @parent Settings
 * @desc Duration for the projectile(s) to travel.
 * @default 20
 * 
 * @arg WaitForProjectile:eval
 * @text Wait For Projectile?
 * @parent Settings
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for projectile(s) to reach their destination before
 * going onto the next command?
 * @default true
 * 
 * @arg Extra:struct
 * @text Extra Settings
 * @type struct<ProjectileExtra>
 * @desc Add extra settings to the projectile?
 * @default {"AutoAngle:eval":"true","AngleOffset:eval":"+0","Arc:eval":"0","BlendMode:num":"0","EasingType:str":"Linear","Hue:eval":"0","Scale:eval":"1.0","Spin:eval":"+0.0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceSkew
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakSkew
 * @text Action Sequences - Skew
 * @desc Allows you to have control over the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_ChangeSkew
 * @text SKEW: Change Skew
 * @desc Changes the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg SkewX:eval
 * @text Skew X
 * @desc Change the camera skew X to this value.
 * @default 0
 * 
 * @arg SkewY:eval
 * @text Skew Y
 * @desc Change the camera skew Y to this value.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change camera skew.
 * @default 60
 *
 * @arg EasingType:str
 * @text Skew Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Skew_Reset
 * @text SKEW: Reset Skew
 * @desc Reset any skew settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset camera skew.
 * @default 60
 *
 * @arg EasingType:str
 * @text Skew Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Skew_WaitForSkew
 * @text SKEW: Wait For Skew
 * @desc Waits for skew changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceTarget
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakTarget
 * @text Action Sequences - Target
 * @desc If using a manual target by target Action Sequence,
 * these commands will give you full control over its usage.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_CurrentIndex
 * @text TARGET: Current Index
 * @desc Sets the current index to this value.
 * Then decide to jump to a label (optional).
 * 
 * @arg Index:eval
 * @text Set Index To
 * @desc Sets current targeting index to this value.
 * 0 is the starting index of a target group.
 * @default 0
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_NextTarget
 * @text TARGET: Next Target
 * @desc Moves index forward by 1 to select a new current target.
 * Then decide to jump to a label (optional).
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_PrevTarget
 * @text TARGET: Previous Target
 * @desc Moves index backward by 1 to select a new current target.
 * Then decide to jump to a label (optional).
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_RandTarget
 * @text TARGET: Random Target
 * @desc Sets index randomly to determine new currernt target.
 * Then decide to jump to a label (optional).
 * 
 * @arg ForceRandom:eval
 * @text Force Random?
 * @type boolean
 * @on On
 * @off Off
 * @desc Index cannot be its previous index amount after random.
 * @default false
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceWeapon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakWeapon
 * @text Action Sequences - Weapon
 * @desc Allows for finer control over Dual/Multi Wielding actors.
 * Only works for Actors.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Weapon_ClearActiveWeapon
 * @text WEAPON: Clear Weapon Slot
 * @desc Clears the active weapon slot (making others valid again).
 * Only works for Actors.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @desc Select unit(s) to clear the active weapon slot for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Weapon_NextActiveWeapon
 * @text WEAPON: Next Weapon Slot
 * @desc Goes to next active weapon slot (making others invalid).
 * If next slot is weaponless, don't label jump.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @desc Select unit(s) to change the next active weapon slot for.
 * @default ["user"]
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a weapon is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Weapon_SetActiveWeapon
 * @text WEAPON: Set Weapon Slot
 * @desc Sets the active weapon slot (making others invalid).
 * Only works for Actors.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @desc Select unit(s) to change the active weapon slot for.
 * @default ["user"]
 * 
 * @arg SlotID:eval
 * @text Weapon Slot ID
 * @desc Select weapon slot to make active (making others invalid).
 * Use 0 to clear and normalize. You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceZoom
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakZoom
 * @text Action Sequences - Zoom
 * @desc Allows you to have control over the screen zoom.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_Scale
 * @text ZOOM: Change Scale
 * @desc Changes the zoom scale.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Scale:eval
 * @text Scale
 * @desc The zoom scale to change to.
 * @default 1.0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change battle zoom.
 * @default 60
 *
 * @arg EasingType:str
 * @text Zoom Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForZoom:eval
 * @text Wait For Zoom?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for zoom changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_Reset
 * @text ZOOM: Reset Zoom
 * @desc Reset any zoom settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset battle zoom.
 * @default 60
 *
 * @arg EasingType:str
 * @text Zoom Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForZoom:eval
 * @text Wait For Zoom?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for zoom changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_WaitForZoom
 * @text ZOOM: Wait For Zoom
 * @desc Waits for zoom to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceEnd
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BattleCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param AutoBattle:struct
 * @text Auto Battle Settings
 * @type struct<AutoBattle>
 * @desc Settings pertaining to Auto Battle.
 * @default {"BattleDisplay":"","AutoBattleMsg:str":"Press %1 or %2 to stop Auto Battle","AutoBattleOK:str":"OK","AutoBattleCancel:str":"Cancel","AutoBattleBgType:num":"1","AutoBattleRect:func":"\"const width = Graphics.width;\\nconst height = this.calcWindowHeight(1, false);\\nconst x = 0;\\nconst y = (Graphics.height - height) / 2;\\nreturn new Rectangle(x, y, width, height);\"","Options":"","AddOption:eval":"true","AdjustRect:eval":"true","StartName:str":"Auto Battle Start","StyleName:str":"Auto Battle Style","StyleOFF:str":"Attack","StyleON:str":"Skills"}
 *
 * @param Damage:struct
 * @text Damage Settings
 * @type struct<Damage>
 * @desc Settings pertaining to damage calculations.
 * @default {"Cap":"","EnableDamageCap:eval":"false","DefaultHardCap:num":"9999","EnableSoftCap:eval":"false","DefaultSoftCap:num":"0.80","DefaultSoftScaler:num":"0.1275","Popups":"","PopupDuration:num":"128","NewPopupBottom:eval":"true","PopupPosition:str":"base","PopupOffsetX:num":"0","PopupOffsetY:num":"0","PopupShiftX:num":"8","PopupShiftY:num":"-28","hpDamageFmt:str":"-%1","hpHealingFmt:str":"+%1","mpDamageFmt:str":"-%1 %2","mpHealingFmt:str":"+%1 %2","CriticalColor:eval":"[255, 0, 0, 160]","CriticalDuration:num":"128","Formulas":"","OverallFormulaJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst critical = arguments[1];\\nconst item = this.item();\\n\\n// Get Base Damage\\nconst baseValue = this.evalDamageFormula(target);\\n\\n// Calculate Element Modifiers\\nlet value = baseValue * this.calcElementRate(target);\\n\\n// Calculate Physical and Magical Modifiers\\nif (this.isPhysical()) {\\n    value *= target.pdr;\\n}\\nif (this.isMagical()) {\\n    value *= target.mdr;\\n}\\n\\n// Apply Healing Modifiers\\nif (baseValue < 0) {\\n    value *= target.rec;\\n}\\n\\n// Apply Critical Modifiers\\nif (critical) {\\n    value = this.applyCritical(value);\\n}\\n\\n// Apply Variance and Guard Modifiers\\nvalue = this.applyVariance(value, item.damage.variance);\\nvalue = this.applyGuard(value, target);\\n\\n// Finalize Damage\\nvalue = Math.round(value);\\nreturn value;\"","VarianceFormulaJS:func":"\"// Declare Constants\\nconst damage = arguments[0];\\nconst variance = arguments[1];\\n\\n// Calculate Variance\\nconst amp = Math.floor(Math.max((Math.abs(damage) * variance) / 100, 0));\\nconst v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;\\n\\n// Return Damage\\nreturn damage >= 0 ? damage + v : damage - v;\"","GuardFormulaJS:func":"\"// Declare Constants\\nconst damage = arguments[0];\\nconst target = arguments[1];\\n\\n// Return Damage Early\\nconst note = this.item().note;\\nif (note.match(/<UNBLOCKABLE>/i)) return damage;\\nif (!target.isGuard()) return damage;\\nif (damage < 0) return damage;\\n\\n// Declare Guard Rate\\nlet guardRate = 0.5;\\nguardRate /= target.grd;\\n\\n// Return Damage\\nreturn damage * guardRate;\"","Critical":"","CriticalHitRateJS:func":"\"// Declare Constants\\nconst user = this.subject();\\nconst target = arguments[0];\\n\\n// Create Base Critical Rate\\nlet rate = this.subject().cri * (1 - target.cev);\\n\\n// Apply Notetags\\nconst note = this.item().note;\\nif (note.match(/<ALWAYS CRITICAL>/i)) {\\n    return 1;\\n}\\nif (note.match(/<SET CRITICAL RATE:[ ](\\\\d+)([%％])>/i)) {\\n    return Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL RATE:[ ](\\\\d+)([%％])>/i)) {\\n    rate *= Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL RATE:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    rate += Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<JS CRITICAL RATE>\\\\s*([\\\\s\\\\S]*)\\\\s*<\\\\/JS CRITICAL RATE>/i)) {\\n    const code = String(RegExp.$1);\\n    try {\\n        eval(code);\\n    } catch (e) {\\n        if ($gameTemp.isPlaytest()) console.log(e);\\n    }\\n}\\n\\n// Apply LUK Buffs/Debuffs\\nconst lukStack = this.subject().buff(7);\\nrate *= 2 ** lukStack;\\n\\n// Return Rate\\nreturn rate;\"","CriticalHitMultiplier:func":"\"// Declare Constants\\nconst user = this.subject();\\nlet damage = arguments[0];\\nlet multiplier = 2.0;\\nlet bonusDamage = this.subject().luk * this.subject().cri;\\n\\n// Apply Notetags\\nconst note = this.item().note;\\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ](\\\\d+)([%％])>/i)) {\\n    multiplier = Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    multiplier += Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ](\\\\d+)([%％])>/i)) {\\n    bonusDamage *= Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    bonusDamage += bonusDamage * (RegExp.$1) / 100;\\n}\\nif (note.match(/<JS CRITICAL DAMAGE>\\\\s*([\\\\s\\\\S]*)\\\\s*<\\\\/JS CRITICAL DAMAGE>/i)) {\\n    const code = String(RegExp.$1);\\n    try {\\n        eval(code);\\n    } catch (e) {\\n        if ($gameTemp.isPlaytest()) console.log(e);\\n    }\\n}\\n\\n// Return Damage\\nreturn damage * multiplier + bonusDamage;\"","DamageStyles":"","DefaultDamageStyle:str":"Standard","DamageStyleList:arraystruct":"[\"{\\\"Name:str\\\":\\\"Standard\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Declare Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Replace Formula\\\\\\\\nlet formula = item.damage.formula;\\\\\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 0)';\\\\\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = Math.max(eval(formula), 0);\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"return this.getItemDamageAmountTextOriginal();\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"Armor Scaling\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Declare Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Replace Formula\\\\\\\\nlet formula = item.damage.formula;\\\\\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = Math.max(eval(formula), 0);\\\\\\\\n\\\\\\\\n// Apply Defender's Defense Parameter\\\\\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\\\\\n\\\\\\\\n    // Calculate Base Armor\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\\\\\n\\\\\\\\n    // Apply Armor to Damage\\\\\\\\n    if (armor >= 0) {\\\\\\\\n        value *= 100 / (100 + armor);\\\\\\\\n    } else {\\\\\\\\n        value *= 2 - (100 / (100 - armor));\\\\\\\\n    }\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"return this.getItemDamageAmountTextOriginal();\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"CT\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\\\\\nlet attackStat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat =  a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nattackStat = (attackStat * 1.75) + (level ** 2 / 45.5);\\\\\\\\nvalue = attackStat * 4;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= Math.max(256 - armor, 0) / 256;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= Math.max(102.4 - armor, 0) / 128;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"D4\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nlet stat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n    armor = 0;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n    armor = 0;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage \\\\\\\\nlet value = 1.5 * Math.max(2 * stat * multiplier - armor, 1) * multiplier / 5;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"DQ\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nlet multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    let value = multiplier * Math.max(a.atk, a.mat);\\\\\\\\n    return (isNaN(value) ? 0 : value) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Get Primary Stats\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(b, armor);\\\\\\\\nlet stat = 1;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Check for Recovery\\\\\\\\nif (this.isRecover()) {\\\\\\\\n    let value = stat * multiplier * sign;\\\\\\\\n    return isNaN(value) ? 0 : value;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = 0;\\\\\\\\nif (stat < ((2 + armor) / 2)) {\\\\\\\\n    // Plink Damage\\\\\\\\n    let baseline = Math.max(stat - ((12 * (armor - stat + 1)) / stat), 5);\\\\\\\\n    value = baseline / 3;\\\\\\\\n} else {\\\\\\\\n    // Normal Damage\\\\\\\\n    let baseline = Math.max(stat - (armor / 2), 1);\\\\\\\\n    value = baseline / 2;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF7\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare base Damage\\\\\\\\nlet baseDamage = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    baseDamage = a.atk + ((a.atk + level) / 32) * ((a.atk * level) / 32);\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    baseDamage = 6 * (a.mat + level);\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    baseDamage = 6 * (a.def + level);\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    baseDamage = 6 * (a.mdf + level);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Final Damage\\\\\\\\nlet value = baseDamage;\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nif (this.isRecover()) {\\\\\\\\n    value += 22 * power;\\\\\\\\n} else {\\\\\\\\n    value = (power * Math.max(512 - armor, 1) * baseDamage) / (16 * 512);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF8\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Damage\\\\\\\\nlet Value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = a.atk ** 2 / 16 + a.atk;\\\\\\\\n    value *= Math.max(265 - armor, 1) / 256;\\\\\\\\n    value *= power / 16;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = a.mat + power;\\\\\\\\n    value *= Math.max(265 - armor, 1) / 4;\\\\\\\\n    value *= power / 256;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = (power + a.def) * power / 2;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = (power + a.mdf) * power / 2;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF9\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Constant\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Main Stats\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(b, armor);\\\\\\\\nlet stat = 1;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Base Damage\\\\\\\\nlet baseDamage = power;\\\\\\\\nif (this.isPhysical()) {\\\\\\\\n    baseDamage += stat;\\\\\\\\n}\\\\\\\\nif (this.isDamage() || this.isDrain()) {\\\\\\\\n    baseDamage -= armor;\\\\\\\\n    baseDamage = Math.max(1, baseDamage);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Bonus Damage\\\\\\\\nlet bonusDamage = stat + (((a.level || a.luk) + stat) / 8);\\\\\\\\n\\\\\\\\n// Declare Final Damage\\\\\\\\nlet value = baseDamage * bonusDamage * sign;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF10\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Constant\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Create Damage Offense Value\\\\\\\\nlet value = power;\\\\\\\\n\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = (((a.atk ** 3) / 32) + 32) * power / 16;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = power * ((a.mat ** 2 / 6) + power) / 4;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = power * ((a.def + power) / 2);\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = power * ((a.mdf + power) / 2);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Apply Damage Defense Value\\\\\\\\nif (this.isDamage() || this.isDrain()) {\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(b, armor);\\\\\\\\n    armor = Math.max(armor, 1);\\\\\\\\n    value *= ((((armor - 280.4) ** 2) / 110) / 16) / 730;\\\\\\\\n    value *= (730 - (armor * 51 - (armor ** 2) / 11) / 10) / 730;\\\\\\\\n} else if (this.isRecover()) {\\\\\\\\n    value *= -1;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"MK\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nconst denominator = Math.max(200 + armor, 1);\\\\\\\\n\\\\\\\\n// Calculate Damage \\\\\\\\nlet value = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = 200 * a.atk / denominator;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = 200 * a.mat / denominator;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = 200 * a.def / 200;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = 200 * a.mdf / 200;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"MOBA\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Value\\\\\\\\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\\\\\\\\n\\\\\\\\n// Apply Attacker's Offense Parameter\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value *= a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value *= a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Apply Defender's Defense Parameter\\\\\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\\\\\n\\\\\\\\n    // Calculate Base Armor\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\\\\\n\\\\\\\\n    // Apply Armor to Damage\\\\\\\\n    if (armor >= 0) {\\\\\\\\n        value *= 100 / (100 + armor);\\\\\\\\n    } else {\\\\\\\\n        value *= 2 - (100 / (100 - armor));\\\\\\\\n    }\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"PKMN\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\\\\\nlet attackStat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat =  a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nvalue = (((((2 * level) / 5) + 2) * power * (attackStat / armor)) / 50) + 2;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\"]"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Settings pertaining to various game mechanics.
 * @default {"ActionSpeed":"","AllowRandomSpeed:eval":"false","CalcActionSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\nif (this.item()) {\\n    speed += this.item().speed;\\n}\\nif (this.isAttack()) {\\n    speed += this.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\"","BaseTroop":"","BaseTroopIDs:arraynum":"[\"1\"]","CommonEvents":"","BattleStartEvent:num":"0","BattleEndEvent:num":"0","VictoryEvent:num":"0","DefeatEvent:num":"0","EscapeSuccessEvent:num":"0","EscapeFailEvent:num":"0","Escape":"","CalcEscapeRatioJS:func":"\"// Calculate Escape Ratio\\nlet ratio = 0.5;\\nratio *= $gameParty.agility();\\nratio /= $gameTroop.agility();\\n\\n// Return Ratio\\nreturn ratio;\"","CalcEscapeRaiseJS:func":"\"// Calculate Escape Ratio\\nlet value = 0.1;\\nvalue += $gameParty.aliveMembers().length;\\n\\n// Return Value\\nreturn value;\"","BattleJS":"","PreStartBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostStartBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","BattleVictoryJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","EscapeSuccessJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","EscapeFailureJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","BattleDefeatJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreEndBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostEndBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","TurnJS":"","PreStartTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostStartTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreEndTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostEndTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreRegenerateJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostRegenerateJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","ActionJS":"","PreStartActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PostStartActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PreApplyJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PreDamageJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PostDamageJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PostApplyJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PreEndActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PostEndActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\""}
 *
 * @param CmdWindows
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BattleLayout:struct
 * @text Battle Layout Settings
 * @type struct<BattleLayout>
 * @desc Settings that adjust how the battle layout appears.
 * @default {"Style:str":"default","ListStyle":"","ShowFacesListStyle:eval":"true","CommandWidth:num":"192","XPStyle":"","XPActorCommandLines:num":"4","XPActorDefaultHeight:num":"64","XPSpriteYLocation:str":"name","PotraitStyle":"","ShowPortraits:eval":"true","PortraitScale:num":"0.5","BorderStyle":"","SkillItemBorderCols:num":"1","ShowPortraitsBorderStyle:eval":"true","PortraitScaleBorderStyle:num":"1.25","SkillItemWindows":"","SkillItemMiddleLayout:eval":"false","SkillItemStandardCols:num":"2"}
 *
 * @param BattleLog:struct
 * @text Battle Log Settings
 * @type struct<BattleLog>
 * @desc Settings that adjust how Window_BattleLog behaves.
 * @default {"General":"","BackColor:str":"#000000","MaxLines:num":"10","MessageWait:num":"16","TextAlign:str":"center","BattleLogRectJS:func":"\"const wx = 0;\\nconst wy = 0;\\nconst ww = Graphics.boxWidth;\\nconst wh = this.calcWindowHeight(10, false);\\nreturn new Rectangle(wx, wy, ww, wh);\"","StartTurn":"","StartTurnShow:eval":"true","StartTurnMsg:str":"Turn %1","StartTurnWait:num":"40","DisplayAction":"","ActionCenteredName:eval":"true","ActionSkillMsg1:eval":"false","ActionSkillMsg2:eval":"true","ActionItemMsg:eval":"false","ActionChanges":"","ShowCounter:eval":"true","ShowReflect:eval":"true","ShowSubstitute:eval":"true","ActionResults":"","ShowFailure:eval":"false","ShowCritical:eval":"false","ShowMissEvasion:eval":"false","ShowHpDmg:eval":"false","ShowMpDmg:eval":"false","ShowTpDmg:eval":"false","DisplayStates":"","ShowAddedState:eval":"false","ShowRemovedState:eval":"false","ShowCurrentState:eval":"false","ShowAddedBuff:eval":"false","ShowAddedDebuff:eval":"false","ShowRemovedBuff:eval":"false"}
 *
 * @param Battleback:struct
 * @text Battleback Scaling
 * @type struct<Battleback>
 * @desc Settings that adjust how battlebacks scale.
 * @default {"DefaultStyle:str":"MZ","jsOneForOne:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst scale = 1.0;\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = 0;\\nthis.y = 0;\"","jsScaleToFit:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst ratioX = this.width / this.bitmap.width;\\nconst ratioY = this.height / this.bitmap.height;\\nconst scale = Math.max(ratioX, ratioY);\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = (Graphics.width - this.width) / 2;\\nthis.y = Graphics.height - this.height;\"","jsScaleDown:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst ratioX = Math.min(1, this.width / this.bitmap.width);\\nconst ratioY = Math.min(1, this.height / this.bitmap.height);\\nconst scale = Math.max(ratioX, ratioY);\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = (Graphics.width - this.width) / 2;\\nthis.y = Graphics.height - this.height;\"","jsScale Up:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst ratioX = Math.max(1, this.width / this.bitmap.width);\\nconst ratioY = Math.max(1, this.height / this.bitmap.height);\\nconst scale = Math.max(ratioX, ratioY);\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = (Graphics.width - this.width) / 2;\\nthis.y = Graphics.height - this.height;\""}
 *
 * @param PartyCmd:struct
 * @text Party Command Window
 * @type struct<PartyCmd>
 * @desc Settings that alter the Party Command Window in battle.
 * @default {"Cmd":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","CmdIconFight:num":"76","CommandAddAutoBattle:eval":"true","CmdIconAutoBattle:num":"78","CmdTextAutoBattle:str":"Auto","CommandAddOptions:eval":"true","CmdIconOptions:num":"83","ActiveTpbOptionsMessage:str":"Options Menu queued after action is complete.","CmdIconEscape:num":"82","Access":"","SkipPartyCmd:eval":"true","DisablePartyCmd:eval":"false","HelpWindow":"","HelpFight:str":"Select actions to fight.","HelpAutoBattle:str":"Sets party to Auto Battle mode.","HelpOptions:str":"Opens up the Options Menu.","HelpEscape:str":"Attempt to escape the battle."}
 *
 * @param ActorCmd:struct
 * @text Actor Command Window
 * @type struct<ActorCmd>
 * @desc Settings that alter the Actor Command Window in battle.
 * @default {"Cmd":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","CmdIconItem:num":"176","IconStypeNorm:num":"78","IconStypeMagic:num":"79","BattleCmd":"","BattleCmdList:arraystr":"[\"attack\",\"skills\",\"guard\",\"item\",\"escape\"]","HelpWindow":"","HelpSkillType:str":"Opens up a list of skills under the \\C[16]%1\\C[0] category.","HelpItem:str":"Opens up a list of items that you can use.","HelpEscape:str":"Attempt to escape the battle.","HelpAutoBattle:str":"Automatically choose an action suitable for combat."}
 *
 * @param VisualBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Actor:struct
 * @text Actor Battler Settings
 * @type struct<Actor>
 * @desc Settings that alter various properties for actors.
 * @default {"Flinch":"","FlinchDistanceX:num":"12","FlinchDistanceY:num":"0","FlinchDuration:num":"6","SvBattlers":"","AnchorX:num":"0.5","AnchorY:num":"1.0","ChantStyle:eval":"true","OffsetX:num":"0","OffsetY:num":"0","MotionSpeed:num":"12","PrioritySortActive:eval":"true","PrioritySortActors:eval":"false","Shadow:eval":"true","SmoothImage:eval":"true","HomePosJS:func":"\"// Declare Constants\\nconst sprite = this;\\nconst actor = this._actor;\\nconst index = arguments[0];\\n\\n// Make Calculations\\nlet x = Math.round((Graphics.width / 2) + 192)\\nx -= Math.floor((Graphics.width - Graphics.boxWidth) / 2);\\nx += index * 32;\\nlet y = (Graphics.height - 200) - ($gameParty.maxBattleMembers() * 48);\\ny -= Math.floor((Graphics.height - Graphics.boxHeight) / 2);\\ny += index * 48;\\n\\n// Home Position Offsets\\nconst offsetNote = /<SIDEVIEW HOME OFFSET:[ ]([\\\\+\\\\-]\\\\d+),[ ]([\\\\+\\\\-]\\\\d+)>/i;\\nconst xOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$1) : 0));\\nconst yOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$2) : 0));\\nx = xOffsets.reduce((r, offset) => r + offset, x);\\ny = yOffsets.reduce((r, offset) => r + offset, y);\\n\\n// Set Home Position\\nthis.setHome(x, y);\""}
 *
 * @param Enemy:struct
 * @text Enemy Battler Settings
 * @type struct<Enemy>
 * @desc Settings that alter various properties for enemies.
 * @default {"Visual":"","AttackAnimation:num":"1","EmergeText:eval":"false","OffsetX:num":"0","OffsetY:num":"0","SmoothImage:eval":"true","SelectWindow":"","FrontViewSelect:eval":"false","SideviewSelect:eval":"true","NameFontSize:num":"22","SvBattlers":"","AllowCollapse:eval":"false","AnchorX:num":"0.5","AnchorY:num":"1.0","MotionIdle:str":"walk","Shadow:eval":"true","Width:num":"64","Height:num":"64","WtypeId:num":"0"}
 *
 * @param HpGauge:struct
 * @text HP Gauge Settings
 * @type struct<HpGauge>
 * @desc Settings that adjust the visual HP Gauge displayed in battle.
 * @default {"Display":"","ShowActorGauge:eval":"false","ShowEnemyGauge:eval":"true","RequiresDefeat:eval":"false","BTestBypass:eval":"true","Settings":"","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"0","OffsetY:num":"-3","Options":"","AddHpGaugeOption:eval":"true","AdjustRect:eval":"true","Name:str":"Show HP Gauge"}
 *
 * @param ActionSequence:struct
 * @text Action Sequence Settings
 * @type struct<ActionSequence>
 * @desc Settings that adjust how certain Action Sequences work.
 * @default {"AutoSequences":"","AutoMeleeSolo:eval":"true","AutoMeleeAoE:eval":"true","CastAnimations":"","CastCertain:num":"120","CastPhysical:num":"52","CastMagical:num":"51","CounterReflection":"","CounterPlayback:eval":"true","ReflectAnimation:num":"1","ReflectPlayback:eval":"true","Stepping":"","MeleeDistance:num":"24","StepDistanceX:num":"48","StepDistanceY:num":"0","StepDuration:num":"12"}
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
 * Auto Battle Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoBattle:
 *
 * @param BattleDisplay
 * @text Battle Display
 *
 * @param AutoBattleMsg:str
 * @text Message
 * @parent BattleDisplay
 * @desc Message that's displayed when Auto Battle is on.
 * Text codes allowed. %1 - OK button, %2 - Cancel button
 * @default Press %1 or %2 to stop Auto Battle
 *
 * @param AutoBattleOK:str
 * @text OK Button
 * @parent BattleDisplay
 * @desc Text used to represent the OK button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default OK
 *
 * @param AutoBattleCancel:str
 * @text Cancel Button
 * @parent BattleDisplay
 * @desc Text used to represent the Cancel button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default Cancel
 *
 * @param AutoBattleBgType:num
 * @text Background Type
 * @parent BattleDisplay
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for Auto Battle window.
 * @default 1
 *
 * @param AutoBattleRect:func
 * @text JS: X, Y, W, H
 * @parent BattleDisplay
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.width;\nconst height = this.calcWindowHeight(1, false);\nconst x = 0;\nconst y = (Graphics.height - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the Auto Battle options to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param StartName:str
 * @text Startup Name
 * @parent Options
 * @desc Command name of the option.
 * @default Auto Battle Start
 *
 * @param StyleName:str
 * @text Style Name
 * @parent Options
 * @desc Command name of the option.
 * @default Auto Battle Style
 *
 * @param StyleOFF:str
 * @text OFF
 * @parent StyleName:str
 * @desc Text displayed when Auto Battle Style is OFF.
 * @default Attack
 *
 * @param StyleON:str
 * @text ON
 * @parent StyleName:str
 * @desc Text displayed when Auto Battle Style is ON.
 * @default Skills
 *
 */
/* ----------------------------------------------------------------------------
 * Damage Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Damage:
 *
 * @param Cap
 * @text Damage Cap
 *
 * @param EnableDamageCap:eval
 * @text Enable Damage Cap?
 * @parent Cap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Put a maximum hard damage cap on how far damage can go?
 * This can be broken through the usage of notetags.
 * @default false
 *
 * @param DefaultHardCap:num
 * @text Default Hard Cap
 * @parent EnableDamageCap:eval
 * @type number
 * @min 1
 * @desc The default hard damage cap used before applying damage.
 * @default 9999
 *
 * @param EnableSoftCap:eval
 * @text Enable Soft Cap?
 * @parent Cap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Soft caps ease in the damage values leading up to the 
 * hard damage cap. Requires hard Damage Cap enabled.
 * @default false
 *
 * @param DefaultSoftCap:num
 * @text Base Soft Cap Rate
 * @parent EnableSoftCap:eval
 * @desc The default soft damage cap used before applying damage.
 * @default 0.80
 *
 * @param DefaultSoftScaler:num
 * @text Soft Scale Constant
 * @parent EnableSoftCap:eval
 * @desc The default soft damage cap used before applying damage.
 * @default 0.1275
 *
 * @param Popups
 *
 * @param PopupDuration:num
 * @text Popup Duration
 * @parent Popups
 * @type number
 * @min 1
 * @desc Adjusts how many frames a popup stays visible.
 * @default 128
 *
 * @param NewPopupBottom:eval
 * @text Newest Popups Bottom
 * @parent Popups
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Puts the newest popups at the bottom.
 * @default true
 *
 * @param PopupPosition:str
 * @text Appear Position
 * @parent Popups
 * @type select
 * @option Head - At the top of the battler.
 * @value head
 * @option Center - At the center of the battler.
 * @value center
 * @option Base - At the foot of the battler.
 * @value base
 * @desc Selects where you want popups to appear relative to the battler.
 * @default base
 *
 * @param PopupOffsetX:num
 * @text Offset X
 * @parent Popups
 * @desc Sets how much to offset the sprites by horizontally.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param PopupOffsetY:num
 * @text Offset Y
 * @parent Popups
 * @desc Sets how much to offset the sprites by vertically.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param PopupShiftX:num
 * @text Shift X
 * @parent Popups
 * @desc Sets how much to shift the sprites by horizontally.
 * Negative values go left. Positive values go right.
 * @default 8
 *
 * @param PopupShiftY:num
 * @text Shift Y
 * @parent Popups
 * @desc Sets how much to shift the sprites by vertically.
 * Negative values go up. Positive values go down.
 * @default -28
 *
 * @param hpDamageFmt:str
 * @text HP Damage Format
 * @parent Popups
 * @desc Determines HP damage format for popup.
 * %1 - Value, %2 - HP Text
 * @default -%1
 *
 * @param hpHealingFmt:str
 * @text HP Healing Format
 * @parent Popups
 * @desc Determines HP healing format for popup.
 * %1 - Value, %2 - HP Text
 * @default +%1
 *
 * @param mpDamageFmt:str
 * @text MP Damage Format
 * @parent Popups
 * @desc Determines MP damage format for popup.
 * %1 - Value, %2 - MP Text
 * @default -%1 %2
 *
 * @param mpHealingFmt:str
 * @text MP Healing Format
 * @parent Popups
 * @desc Determines MP healing format for popup.
 * %1 - Value, %2 - MP Text
 * @default +%1 %2
 *
 * @param CriticalColor:eval
 * @text Critical Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 *
 * @param CriticalDuration:num
 * @text Critical Duration
 * @parent Popups
 * @type number
 * @min 1
 * @desc Adjusts how many frames a the flash lasts.
 * @default 128
 *
 * @param Formulas
 *
 * @param OverallFormulaJS:func
 * @text JS: Overall Formula
 * @parent Formulas
 * @type note
 * @desc The overall formula used when calculating damage.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst critical = arguments[1];\nconst item = this.item();\n\n// Get Base Damage\nconst baseValue = this.evalDamageFormula(target);\n\n// Calculate Element Modifiers\nlet value = baseValue * this.calcElementRate(target);\n\n// Calculate Physical and Magical Modifiers\nif (this.isPhysical()) {\n    value *= target.pdr;\n}\nif (this.isMagical()) {\n    value *= target.mdr;\n}\n\n// Apply Healing Modifiers\nif (baseValue < 0) {\n    value *= target.rec;\n}\n\n// Apply Critical Modifiers\nif (critical) {\n    value = this.applyCritical(value);\n}\n\n// Apply Variance and Guard Modifiers\nvalue = this.applyVariance(value, item.damage.variance);\nvalue = this.applyGuard(value, target);\n\n// Finalize Damage\nvalue = Math.round(value);\nreturn value;"
 *
 * @param VarianceFormulaJS:func
 * @text JS: Variance Formula
 * @parent Formulas
 * @type note
 * @desc The formula used when damage variance.
 * @default "// Declare Constants\nconst damage = arguments[0];\nconst variance = arguments[1];\n\n// Calculate Variance\nconst amp = Math.floor(Math.max((Math.abs(damage) * variance) / 100, 0));\nconst v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;\n\n// Return Damage\nreturn damage >= 0 ? damage + v : damage - v;"
 *
 * @param GuardFormulaJS:func
 * @text JS: Guard Formula
 * @parent Formulas
 * @type note
 * @desc The formula used when damage is guarded.
 * @default "// Declare Constants\nconst damage = arguments[0];\nconst target = arguments[1];\n\n// Return Damage Early\nconst note = this.item().note;\nif (note.match(/<UNBLOCKABLE>/i)) return damage;\nif (!target.isGuard()) return damage;\nif (damage < 0) return damage;\n\n// Declare Guard Rate\nlet guardRate = 0.5;\nguardRate /= target.grd;\n\n// Return Damage\nreturn damage * guardRate;"
 *
 * @param Critical
 * @text Critical Hits
 *
 * @param CriticalHitRateJS:func
 * @text JS: Rate Formula
 * @parent Critical
 * @type note
 * @desc The formula used to calculate Critical Hit Rates.
 * @default "// Declare Constants\nconst user = this.subject();\nconst target = arguments[0];\n\n// Create Base Critical Rate\nlet rate = this.subject().cri * (1 - target.cev);\n\n// Apply Notetags\nconst note = this.item().note;\nif (note.match(/<ALWAYS CRITICAL>/i)) {\n    return 1;\n}\nif (note.match(/<SET CRITICAL RATE:[ ](\\d+)([%％])>/i)) {\n    return Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL RATE:[ ](\\d+)([%％])>/i)) {\n    rate *= Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL RATE:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    rate += Number(RegExp.$1) / 100;\n}\nif (note.match(/<JS CRITICAL RATE>\\s*([\\s\\S]*)\\s*<\\/JS CRITICAL RATE>/i)) {\n    const code = String(RegExp.$1);\n    try {\n        eval(code);\n    } catch (e) {\n        if ($gameTemp.isPlaytest()) console.log(e);\n    }\n}\n\n// Apply LUK Buffs/Debuffs\nconst lukStack = this.subject().buff(7);\nrate *= 2 ** lukStack;\n\n// Return Rate\nreturn rate;"
 *
 * @param CriticalHitMultiplier:func
 * @text JS: Damage Formula
 * @parent Critical
 * @type note
 * @desc The formula used to calculate Critical Hit Damage modification.
 * @default "// Declare Constants\nconst user = this.subject();\nlet damage = arguments[0];\nlet multiplier = 2.0;\nlet bonusDamage = this.subject().luk * this.subject().cri;\n\n// Apply Notetags\nconst note = this.item().note;\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ](\\d+)([%％])>/i)) {\n    multiplier = Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    multiplier += Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ](\\d+)([%％])>/i)) {\n    bonusDamage *= Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    bonusDamage += bonusDamage * (RegExp.$1) / 100;\n}\nif (note.match(/<JS CRITICAL DAMAGE>\\s*([\\s\\S]*)\\s*<\\/JS CRITICAL DAMAGE>/i)) {\n    const code = String(RegExp.$1);\n    try {\n        eval(code);\n    } catch (e) {\n        if ($gameTemp.isPlaytest()) console.log(e);\n    }\n}\n\n// Return Damage\nreturn damage * multiplier + bonusDamage;"
 *
 * @param DamageStyles
 * @text Damage Styles
 *
 * @param DefaultDamageStyle:str
 * @text Default Style
 * @parent DamageStyles
 * @desc Which Damage Style do you want to set as default?
 * Use 'Manual' to not use any styles at all.
 * @default Standard
 *
 * @param DamageStyleList:arraystruct
 * @text Style List
 * @parent DamageStyles
 * @type struct<DamageStyle>[]
 * @desc A list of the damage styles available.
 * These are used to calculate base damage.
 * @default ["{\"Name:str\":\"Standard\",\"Formula:func\":\"\\\"// Declare Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Replace Formula\\\\nlet formula = item.damage.formula;\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 0)';\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = Math.max(eval(formula), 0);\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"return this.getItemDamageAmountTextOriginal();\\\"\"}","{\"Name:str\":\"Armor Scaling\",\"Formula:func\":\"\\\"// Declare Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Replace Formula\\\\nlet formula = item.damage.formula;\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = Math.max(eval(formula), 0);\\\\n\\\\n// Apply Defender's Defense Parameter\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\n\\\\n    // Calculate Base Armor\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\n\\\\n    // Apply Armor to Damage\\\\n    if (armor >= 0) {\\\\n        value *= 100 / (100 + armor);\\\\n    } else {\\\\n        value *= 2 - (100 / (100 - armor));\\\\n    }\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"return this.getItemDamageAmountTextOriginal();\\\"\"}","{\"Name:str\":\"CT\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\nlet attackStat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat =  a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    attackStat =  a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    attackStat =  a.mdf;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nattackStat = (attackStat * 1.75) + (level ** 2 / 45.5);\\\\nvalue = attackStat * 4;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= Math.max(256 - armor, 0) / 256;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= Math.max(102.4 - armor, 0) / 128;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"D4\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nlet stat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n    armor = 0;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n    armor = 0;\\\\n}\\\\n\\\\n// Calculate Damage \\\\nlet value = 1.5 * Math.max(2 * stat * multiplier - armor, 1) * multiplier / 5;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"DQ\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nlet multiplier = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    let value = multiplier * Math.max(a.atk, a.mat);\\\\n    return (isNaN(value) ? 0 : value) * sign;\\\\n}\\\\n\\\\n// Get Primary Stats\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(b, armor);\\\\nlet stat = 1;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n}\\\\n\\\\n// Check for Recovery\\\\nif (this.isRecover()) {\\\\n    let value = stat * multiplier * sign;\\\\n    return isNaN(value) ? 0 : value;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = 0;\\\\nif (stat < ((2 + armor) / 2)) {\\\\n    // Plink Damage\\\\n    let baseline = Math.max(stat - ((12 * (armor - stat + 1)) / stat), 5);\\\\n    value = baseline / 3;\\\\n} else {\\\\n    // Normal Damage\\\\n    let baseline = Math.max(stat - (armor / 2), 1);\\\\n    value = baseline / 2;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF7\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare base Damage\\\\nlet baseDamage = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    baseDamage = a.atk + ((a.atk + level) / 32) * ((a.atk * level) / 32);\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    baseDamage = 6 * (a.mat + level);\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    baseDamage = 6 * (a.def + level);\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    baseDamage = 6 * (a.mdf + level);\\\\n}\\\\n\\\\n// Calculate Final Damage\\\\nlet value = baseDamage;\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nif (this.isRecover()) {\\\\n    value += 22 * power;\\\\n} else {\\\\n    value = (power * Math.max(512 - armor, 1) * baseDamage) / (16 * 512);\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF8\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Damage\\\\nlet Value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = a.atk ** 2 / 16 + a.atk;\\\\n    value *= Math.max(265 - armor, 1) / 256;\\\\n    value *= power / 16;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = a.mat + power;\\\\n    value *= Math.max(265 - armor, 1) / 4;\\\\n    value *= power / 256;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = (power + a.def) * power / 2;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = (power + a.mdf) * power / 2;\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF9\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Constant\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\n}\\\\n\\\\n// Declare Main Stats\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(b, armor);\\\\nlet stat = 1;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n}\\\\n\\\\n// Declare Base Damage\\\\nlet baseDamage = power;\\\\nif (this.isPhysical()) {\\\\n    baseDamage += stat;\\\\n}\\\\nif (this.isDamage() || this.isDrain()) {\\\\n    baseDamage -= armor;\\\\n    baseDamage = Math.max(1, baseDamage);\\\\n}\\\\n\\\\n// Declare Bonus Damage\\\\nlet bonusDamage = stat + (((a.level || a.luk) + stat) / 8);\\\\n\\\\n// Declare Final Damage\\\\nlet value = baseDamage * bonusDamage * sign;\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF10\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Constant\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\n}\\\\n\\\\n// Create Damage Offense Value\\\\nlet value = power;\\\\n\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = (((a.atk ** 3) / 32) + 32) * power / 16;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = power * ((a.mat ** 2 / 6) + power) / 4;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = power * ((a.def + power) / 2);\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = power * ((a.mdf + power) / 2);\\\\n}\\\\n\\\\n// Apply Damage Defense Value\\\\nif (this.isDamage() || this.isDrain()) {\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(b, armor);\\\\n    armor = Math.max(armor, 1);\\\\n    value *= ((((armor - 280.4) ** 2) / 110) / 16) / 730;\\\\n    value *= (730 - (armor * 51 - (armor ** 2) / 11) / 10) / 730;\\\\n} else if (this.isRecover()) {\\\\n    value *= -1;\\\\n}\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"MK\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nconst denominator = Math.max(200 + armor, 1);\\\\n\\\\n// Calculate Damage \\\\nlet value = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = 200 * a.atk / denominator;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = 200 * a.mat / denominator;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = 200 * a.def / 200;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = 200 * a.mdf / 200;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"MOBA\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Value\\\\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\\\\n\\\\n// Apply Attacker's Offense Parameter\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value *= a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value *= a.mdf;\\\\n}\\\\n\\\\n// Apply Defender's Defense Parameter\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\n\\\\n    // Calculate Base Armor\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\n\\\\n    // Apply Armor to Damage\\\\n    if (armor >= 0) {\\\\n        value *= 100 / (100 + armor);\\\\n    } else {\\\\n        value *= 2 - (100 / (100 - armor));\\\\n    }\\\\n}\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"PKMN\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\nlet attackStat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat =  a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    attackStat =  a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    attackStat =  a.mdf;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nvalue = (((((2 * level) / 5) + 2) * power * (attackStat / armor)) / 50) + 2;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}"]
 *
 */
/* ----------------------------------------------------------------------------
 * Damage Formula Style
 * ----------------------------------------------------------------------------
 */
/*~struct~DamageStyle:
 *
 * @param Name:str
 * @text Name
 * @desc Name of this Damage Style.
 * Used for notetags and such.
 * @default Untitled
 *
 * @param Formula:func
 * @text JS: Formula
 * @parent Name:str
 * @type note
 * @desc The base formula for this Damage Style.
 * @default "// Define Constants\nconst item = this.item();\nconst a = this.subject();\nconst b = target;\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\n\n// Create Damage Value\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\n\n// Return Value\nreturn isNaN(value) ? 0 : value;"
 *
 * @param ItemsEquipsCore
 * @text Items & Equips Core
 *
 * @param DamageType
 * @text Damage Label
 * @parent ItemsEquipsCore
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Drain Multiplier
 *
 * @param DamageDisplay:func
 * @text JS: Damage Display
 * @parent ItemsEquipsCore
 * @type note
 * @desc Code used the data displayed for this category.
 * @default "// Define Constants\nconst item = this._item;\nconst formula = item.damage.formula;\nconst a = this._tempActorA;\nconst b = this._tempActorB;\nconst user = a;\nconst target = b;\n\n// Return Value\ntry {\n    const value = Math.max(eval(formula), 0);\n    return '%1%'.format(Math.round(value * 100));\n} catch (e) {\n    if ($gameTemp.isPlaytest()) {\n        console.log('Damage Formula Error for %1'.format(this._item.name));\n    }\n    return '?????';\n}"
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param ActionSpeed
 * @text Action Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent ActionSpeed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param CalcActionSpeedJS:func
 * @text JS: Calculate
 * @parent ActionSpeed
 * @type note
 * @desc Code used to calculate action speed.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\nif (this.item()) {\n    speed += this.item().speed;\n}\nif (this.isAttack()) {\n    speed += this.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param BaseTroop
 * @text Base Troop
 *
 * @param BaseTroopIDs:arraynum
 * @text Base Troop ID's
 * @parent BaseTroop
 * @type troop[]
 * @desc Select the Troop ID(s) to duplicate page events from for all other troops.
 * @default ["1"]
 *
 * @param CommonEvents
 * @text Common Events (on Map)
 *
 * @param BattleStartEvent:num
 * @text Pre-Battle Event
 * @parent CommonEvents
 * @type common_event
 * @desc Common Event to run before each battle on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param BattleEndEvent:num
 * @text Post-Battle Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run after each battle on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param VictoryEvent:num
 * @text Victory Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon victory on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param DefeatEvent:num
 * @text Defeat Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon defeat on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param EscapeSuccessEvent:num
 * @text Escape Success Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon escape success on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param EscapeFailEvent:num
 * @text Escape Fail Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon escape failure on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param Escape
 *
 * @param CalcEscapeRatioJS:func
 * @text JS: Calc Escape Ratio
 * @parent Escape
 * @type note
 * @desc Code used to calculate the escape success ratio.
 * @default "// Calculate Escape Ratio\nlet ratio = 0.5;\nratio *= $gameParty.agility();\nratio /= $gameTroop.agility();\n\n// Return Ratio\nreturn ratio;"
 *
 * @param CalcEscapeRaiseJS:func
 * @text JS: Calc Escape Raise
 * @parent Escape
 * @type note
 * @desc Code used to calculate how much the escape success ratio raises upon each failure.
 * @default "// Calculate Escape Ratio\nlet value = 0.1;\nvalue += $gameParty.aliveMembers().length;\n\n// Return Value\nreturn value;"
 *
 * @param Switches
 *
 * @param SwitchCritical:num
 * @text Switch: Critical
 * @parent Switches
 * @type switch
 * @desc Turns switch ON if the action performs a critical hit.
 * Switch reverts to OFF whenever an action starts.
 * @default 0
 *
 * @param SwitchMissEvade:num
 * @text Switch: Miss/Evade
 * @parent Switches
 * @type switch
 * @desc Turns switch ON if the action misses/is evaded.
 * Switch reverts to OFF whenever an action starts.
 * @default 0
 *
 * @param Variables
 *
 * @param VariableDmg:num
 * @text Variable: Damage
 * @parent Variables
 * @type variable
 * @desc Variable records target damage during action.
 * Variable reverts to 0 whenever an action starts.
 * @default 0
 *
 * @param VariableHeal:num
 * @text Variable: Healing
 * @parent Variables
 * @type variable
 * @desc Variable records target healing during action.
 * Variable reverts to 0 whenever an action starts.
 * @default 0
 *
 * @param BattleJS
 * @text JS: Battle-Related
 * 
 * @param PreStartBattleJS:func
 * @text JS: Pre-Start Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.startBattle()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostStartBattleJS:func
 * @text JS: Post-Start Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.startBattle()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param BattleVictoryJS:func
 * @text JS: Battle Victory
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.processVictory()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param EscapeSuccessJS:func
 * @text JS: Escape Success
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.onEscapeSuccess()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param EscapeFailureJS:func
 * @text JS: Escape Failure
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.onEscapeFailure()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param BattleDefeatJS:func
 * @text JS: Battle Defeat
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.processDefeat()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param PreEndBattleJS:func
 * @text JS: Pre-End Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.endBattle()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostEndBattleJS:func
 * @text JS: Post-End Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.endBattle()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param TurnJS
 * @text JS: Turn-Related
 *
 * @param PreStartTurnJS:func
 * @text JS: Pre-Start Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: BattleManager.startTurn()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostStartTurnJS:func
 * @text JS: Post-Start Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: BattleManager.startTurn()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PreEndTurnJS:func
 * @text JS: Pre-End Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.onTurnEnd()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostEndTurnJS:func
 * @text JS: Post-End Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.onTurnEnd()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PreRegenerateJS:func
 * @text JS: Pre-Regenerate
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.regenerateAll()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostRegenerateJS:func
 * @text JS: Post-Regenerate
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.regenerateAll()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param ActionJS
 * @text JS: Action-Related
 *
 * @param PreStartActionJS:func
 * @text JS: Pre-Start Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.startAction()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PostStartActionJS:func
 * @text JS: Post-Start Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.startAction()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PreApplyJS:func
 * @text JS: Pre-Apply
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.apply()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PreDamageJS:func
 * @text JS: Pre-Damage
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.executeDamage()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PostDamageJS:func
 * @text JS: Post-Damage
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.executeDamage()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PostApplyJS:func
 * @text JS: Post-Apply
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.apply()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PreEndActionJS:func
 * @text JS: Pre-End Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.endAction()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PostEndActionJS:func
 * @text JS: Post-End Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.endAction()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLayout:
 *
 * @param Style:str
 * @text Battle Layout Style
 * @type select
 * @option Default - Shows actor faces in Battle Status.
 * @value default
 * @option List - Lists actors in Battle Status.
 * @value list
 * @option XP - Shows actor battlers in a stretched Battle Status.
 * @value xp
 * @option Portrait - Shows portraits in a stretched Battle Status.
 * @value portrait
 * @option Border - Displays windows around the screen border.
 * @value border
 * @desc The style used for the battle layout.
 * @default default
 *
 * @param ListStyle
 * @text List Style
 * @parent Style:str
 *
 * @param ShowFacesListStyle:eval
 * @text Show Faces
 * @parent ListStyle
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows faces in List Style?
 * @default true
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent ListStyle
 * @type number
 * @min 1
 * @desc Determine the window width for the Party and Actor Command
 * Windows. Affects Default and List Battle Layout styles.
 * @default 192
 *
 * @param XPStyle
 * @text XP Style
 * @parent Style:str
 *
 * @param XPActorCommandLines:num
 * @text Command Lines
 * @parent XPStyle
 * @type number
 * @min 1
 * @desc Number of action lines in the Actor Command Window for the XP Style.
 * @default 4
 *
 * @param XPActorDefaultHeight:num
 * @text Sprite Height
 * @parent XPStyle
 * @type number
 * @min 1
 * @desc Default sprite height used when if the sprite's height has not been determined yet.
 * @default 64
 *
 * @param XPSpriteYLocation:str
 * @text Sprite Base Location
 * @parent XPStyle
 * @type select
 * @option Above Name - Sprite is located above the name.
 * @value name
 * @option Bottom - Sprite is located at the bottom of the window.
 * @value bottom
 * @option Centered - Sprite is centered in the window.
 * @value center
 * @option Top - Sprite is located at the top of the window.
 * @value top
 * @desc Determine where the sprite is located on the Battle Status Window.
 * @default name
 *
 * @param PotraitStyle
 * @text Portrait Style
 * @parent Style:str
 *
 * @param ShowPortraits:eval
 * @text Show Portraits?
 * @parent PotraitStyle
 * @type boolean
 * @on Portraits
 * @off Faces
 * @desc Requires VisuMZ_1_MainMenuCore.
 * Shows the actor's portrait instead of a face.
 * @default true
 *
 * @param PortraitScale:num
 * @text Portrait Scaling
 * @parent PotraitStyle
 * @desc If portraits are used, scale them by this much.
 * @default 0.5
 *
 * @param BorderStyle
 * @text Border Style
 * @parent Style:str
 *
 * @param SkillItemBorderCols:num
 * @text Columns
 * @parent BorderStyle
 * @type number
 * @min 1
 * @desc The total number of columns for Skill & Item Windows
 * in the battle scene.
 * @default 1
 *
 * @param ShowPortraitsBorderStyle:eval
 * @text Show Portraits?
 * @parent BorderStyle
 * @type boolean
 * @on Portraits
 * @off Faces
 * @desc Requires VisuMZ_1_MainMenuCore.
 * Shows the actor's portrait at the edge of the screen.
 * @default true
 *
 * @param PortraitScaleBorderStyle:num
 * @text Portrait Scaling
 * @parent BorderStyle
 * @desc If portraits are used, scale them by this much.
 * @default 1.0
 *
 * @param SkillItemWindows
 * @text Skill & Item Windows
 *
 * @param SkillItemMiddleLayout:eval
 * @text Middle Layout
 * @parent SkillItemWindows
 * @type boolean
 * @on Middle
 * @off Bottom
 * @desc Shows the Skill & Item Windows in mid-screen?
 * @default false
 *
 * @param SkillItemStandardCols:num
 * @text Columns
 * @parent SkillItemWindows
 * @type number
 * @min 1
 * @desc The total number of columns for Skill & Item Windows
 * in the battle scene.
 * @default 2
 *
 * @param StatusWindow
 * @text Status Window Elements
 *
 * @param StatusWindowName
 * @text Battler Name
 * @parent StatusWindow
 *
 * @param NameOffsetX:num
 * @text Offset: X
 * @parent StatusWindowName
 * @desc Offset this Battle Status Window element's X.
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param NameOffsetY:num
 * @text Offset: Y
 * @parent StatusWindowName
 * @desc Offset this Battle Status Window element's Y.
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param StatusWindowHpGauge
 * @text Gauge 1 (HP)
 * @parent StatusWindow
 *
 * @param HpGaugeOffsetX:num
 * @text Offset: X
 * @parent StatusWindowHpGauge
 * @desc Offset this Battle Status Window element's X.
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param HpGaugeOffsetY:num
 * @text Offset: Y
 * @parent StatusWindowHpGauge
 * @desc Offset this Battle Status Window element's Y.
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param StatusWindowMpGauge
 * @text Gauge 2 (MP)
 * @parent StatusWindow
 *
 * @param MpGaugeOffsetX:num
 * @text Offset: X
 * @parent StatusWindowMpGauge
 * @desc Offset this Battle Status Window element's X.
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param MpGaugeOffsetY:num
 * @text Offset: Y
 * @parent StatusWindowMpGauge
 * @desc Offset this Battle Status Window element's Y.
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param StatusWindowTpGauge
 * @text Gauge 3 (TP)
 * @parent StatusWindow
 *
 * @param TpGaugeOffsetX:num
 * @text Offset: X
 * @parent StatusWindowTpGauge
 * @desc Offset this Battle Status Window element's X.
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param TpGaugeOffsetY:num
 * @text Offset: Y
 * @parent StatusWindowTpGauge
 * @desc Offset this Battle Status Window element's Y.
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param StatusWindowStateIcon
 * @text State Icon
 * @parent StatusWindow
 *
 * @param StateIconOffsetX:num
 * @text Offset: X
 * @parent StatusWindowStateIcon
 * @desc Offset this Battle Status Window element's X.
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param StateIconOffsetY:num
 * @text Offset: Y
 * @parent StatusWindowStateIcon
 * @desc Offset this Battle Status Window element's Y.
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param StatusWindowTpbGauge
 * @text TPB/ATB Gauge
 * @parent StatusWindow
 *
 * @param TpbGaugeOffsetX:num
 * @text Offset: X
 * @parent StatusWindowTpbGauge
 * @desc Offset this Battle Status Window element's X.
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param TpbGaugeOffsetY:num
 * @text Offset: Y
 * @parent StatusWindowTpbGauge
 * @desc Offset this Battle Status Window element's Y.
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param StatusWindowSkin
 * @text Window Skin
 * @parent StatusWindow
 *
 * @param StatusWindowSkinFilename:str
 * @text Filename
 * @parent StatusWindowSkin
 * @type file
 * @dir img/system/
 * @desc Filename used for the Battle Status Window skin.
 * Leave this empty to use the default window skin.
 * @default 
 *
 * @param StatusWindowSkinHide:eval
 * @text Hide Window Skin?
 * @parent StatusWindowSkin
 * @type boolean
 * @on No Window Skin
 * @off Default Skin
 * @desc Show/Hide the window skin for the Battle Status Window?
 * @default false
 *
 * @param StatusWindowSelectBack
 * @text Selectable Background
 * @parent StatusWindow
 *
 * @param StatusWindowSelectableBackHide:eval
 * @text Hide Selectable BG?
 * @parent StatusWindowSelectBack
 * @type boolean
 * @on No Selectable BG
 * @off Default Selectable BG
 * @desc Show/Hide the selectable background box for the Battle Status Window?
 * @default false
 *
 * @param StatusWindowAttachments
 * @text Attachments
 * @parent StatusWindow
 *
 * @param StatusWindowBackAttachment
 * @text Back Attachment
 * @parent StatusWindowAttachments
 *
 * @param StatusWindowAttachmentBack:str
 * @text Filename
 * @parent StatusWindowBackAttachment
 * @type file
 * @dir img/system/
 * @desc Filename used for an image to attach to the back of the
 * Battle Status Window. Leave empty for none.
 * @default 
 *
 * @param StatusWindowAttachmentBackOffsetX:num
 * @text Offset: X
 * @parent StatusWindowBackAttachment
 * @desc Offset this Battle Status Window element's X.
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param StatusWindowAttachmentBackOffsetY:num
 * @text Offset: Y
 * @parent StatusWindowBackAttachment
 * @desc Offset this Battle Status Window element's Y.
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param StatusWindowFrontAttachment
 * @text Front Attachment
 * @parent StatusWindowAttachments
 *
 * @param StatusWindowAttachmentFront:str
 * @text Filename
 * @parent StatusWindowFrontAttachment
 * @type file
 * @dir img/system/
 * @desc Filename used for an image to attach to the front of the
 * Battle Status Window. Leave empty for none.
 * @default 
 *
 * @param StatusWindowAttachmentFrontOffsetX:num
 * @text Offset: X
 * @parent StatusWindowFrontAttachment
 * @desc Offset this Battle Status Window element's X.
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param StatusWindowAttachmentFrontOffsetY:num
 * @text Offset: Y
 * @parent StatusWindowFrontAttachment
 * @desc Offset this Battle Status Window element's Y.
 * Negative goes up. Positive goes down.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Log Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLog:
 *
 * @param General
 *
 * @param BackColor:str
 * @text Back Color
 * @parent General
 * @desc Use #rrggbb for a hex color.
 * @default #000000
 *
 * @param MaxLines:num
 * @text Max Lines
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of lines to be displayed.
 * @default 10
 *
 * @param MessageWait:num
 * @text Message Wait
 * @parent General
 * @type number
 * @min 1
 * @desc Number of frames for a usual message wait.
 * @default 16
 *
 * @param TextAlign:str
 * @text Text Align
 * @parent General
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Window_BattleLog.
 * @default center
 *
 * @param BattleLogRectJS:func
 * @text JS: X, Y, W, H
 * @parent General
 * @type note
 * @desc Code used to determine the dimensions for the battle log.
 * @default "const wx = 0;\nconst wy = 0;\nconst ww = Graphics.boxWidth;\nconst wh = this.calcWindowHeight(10, false);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StartTurn
 * @text Start Turn
 *
 * @param StartTurnShow:eval
 * @text Show Start Turn?
 * @parent StartTurn
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display turn changes at the start of the turn?
 * @default false
 *
 * @param StartTurnMsg:str
 * @text Start Turn Message
 * @parent StartTurn
 * @desc Message displayed at turn start.
 * %1 - Turn Count
 * @default Turn %1
 *
 * @param StartTurnWait:num
 * @text Start Turn Wait
 * @parent StartTurn
 * @type number
 * @min 1
 * @desc Number of frames to wait after a turn started.
 * @default 40
 *
 * @param DisplayAction
 * @text Display Action
 *
 * @param ActionCenteredName:eval
 * @text Show Centered Action?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display a centered text of the action name?
 * @default true
 *
 * @param ActionSkillMsg1:eval
 * @text Show Skill Message 1?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the 1st skill message?
 * @default false
 *
 * @param ActionSkillMsg2:eval
 * @text Show Skill Message 2?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the 2nd skill message?
 * @default true
 *
 * @param ActionItemMsg:eval
 * @text Show Item Message?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the item use message?
 * @default false
 *
 * @param ActionChanges
 * @text Action Changes
 *
 * @param ShowCounter:eval
 * @text Show Counter?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display counter text?
 * @default true
 *
 * @param ShowReflect:eval
 * @text Show Reflect?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display magic reflection text?
 * @default true
 *
 * @param ShowSubstitute:eval
 * @text Show Substitute?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display substitute text?
 * @default true
 *
 * @param ActionResults
 * @text Action Results
 *
 * @param ShowFailure:eval
 * @text Show No Effect?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display no effect text?
 * @default false
 *
 * @param ShowCritical:eval
 * @text Show Critical?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display critical text?
 * @default false
 *
 * @param ShowMissEvasion:eval
 * @text Show Miss/Evasion?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display miss/evasion text?
 * @default false
 *
 * @param ShowHpDmg:eval
 * @text Show HP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display HP Damage text?
 * @default false
 *
 * @param ShowMpDmg:eval
 * @text Show MP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display MP Damage text?
 * @default false
 *
 * @param ShowTpDmg:eval
 * @text Show TP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display TP Damage text?
 * @default false
 *
 * @param DisplayStates
 * @text Display States
 *
 * @param ShowAddedState:eval
 * @text Show Added States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added states text?
 * @default false
 *
 * @param ShowRemovedState:eval
 * @text Show Removed States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display removed states text?
 * @default false
 *
 * @param ShowCurrentState:eval
 * @text Show Current States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the currently affected state text?
 * @default false
 *
 * @param ShowAddedBuff:eval
 * @text Show Added Buffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added buffs text?
 * @default false
 *
 * @param ShowAddedDebuff:eval
 * @text Show Added Debuffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added debuffs text?
 * @default false
 *
 * @param ShowRemovedBuff:eval
 * @text Show Removed Buffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display removed de/buffs text?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Battleback Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Battleback:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option MZ (MZ's default style)
 * @value MZ
 * @option 1:1 (No Scaling)
 * @value 1:1
 * @option Scale To Fit (Scale to screen size)
 * @value ScaleToFit
 * @option Scale Down (Scale Downward if Larger than Screen)
 * @value ScaleDown
 * @option Scale Up (Scale Upward if Smaller than Screen)
 * @value ScaleUp
 * @desc The default scaling style used for battlebacks.
 * @default MZ
 *
 * @param jsOneForOne:func
 * @text JS: 1:1
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst scale = 1.0;\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = 0;\nthis.y = 0;"
 *
 * @param jsScaleToFit:func
 * @text JS: Scale To Fit
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst ratioX = this.width / this.bitmap.width;\nconst ratioY = this.height / this.bitmap.height;\nconst scale = Math.max(ratioX, ratioY);\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = (Graphics.width - this.width) / 2;\nthis.y = Graphics.height - this.height;"
 *
 * @param jsScaleDown:func
 * @text JS: Scale Down
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst ratioX = Math.min(1, this.width / this.bitmap.width);\nconst ratioY = Math.min(1, this.height / this.bitmap.height);\nconst scale = Math.max(ratioX, ratioY);\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = (Graphics.width - this.width) / 2;\nthis.y = Graphics.height - this.height;"
 *
 * @param jsScale Up:func
 * @text JS: Scale Up
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst ratioX = Math.max(1, this.width / this.bitmap.width);\nconst ratioY = Math.max(1, this.height / this.bitmap.height);\nconst scale = Math.max(ratioX, ratioY);\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = (Graphics.width - this.width) / 2;\nthis.y = Graphics.height - this.height;"
 *
 */
/* ----------------------------------------------------------------------------
 * Party Command Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PartyCmd:
 *
 * @param Cmd
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Cmd
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Party Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Cmd
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Party Command Window.
 * @default left
 *
 * @param CmdIconFight:num
 * @text Fight Icon
 * @parent Cmd
 * @desc The icon used for the Fight command.
 * @default 76
 *
 * @param CommandAddAutoBattle:eval
 * @text Add Auto Battle?
 * @parent Cmd
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Auto Battle" command to the Command Window?
 * @default true
 *
 * @param CmdIconAutoBattle:num
 * @text Auto Battle Icon
 * @parent CommandAddAutoBattle:eval
 * @desc The icon used for the Auto Battle command.
 * @default 78
 *
 * @param CmdTextAutoBattle:str
 * @text Auto Battle Text
 * @parent CommandAddAutoBattle:eval
 * @desc The text used for the Auto Battle command.
 * @default Auto
 *
 * @param CommandAddOptions:eval
 * @text Add Options?
 * @parent Cmd
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Options" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptions:num
 * @text Options Icon
 * @parent CommandAddOptions:eval
 * @desc The icon used for the Options command.
 * @default 83
 *
 * @param ActiveTpbOptionsMessage:str
 * @text Active TPB Message
 * @parent CommandAddOptions:eval
 * @desc Message that will be displayed when selecting options during the middle of an action.
 * @default Options Menu queued after action is complete.
 *
 * @param CmdIconEscape:num
 * @text Escape Icon
 * @parent Cmd
 * @desc The icon used for the Escape command.
 * @default 82
 *
 * @param Access
 *
 * @param SkipPartyCmd:eval
 * @text Skip Party Command
 * @parent Access
 * @type boolean
 * @on Skip
 * @off Don't
 * @desc DTB: Skip Party Command selection on turn start.
 * TPB: Skip Party Command selection at battle start.
 * @default true
 *
 * @param DisablePartyCmd:eval
 * @text Disable Party Command
 * @parent Access
 * @type boolean
 * @on Disable
 * @off Don't
 * @desc Disable the Party Command Window entirely?
 * @default false
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpFight:str
 * @text Fight
 * @parent HelpWindow
 * @desc Text displayed when selecting a skill type.
 * %1 - Skill Type Name
 * @default Select actions to fight.
 *
 * @param HelpAutoBattle:str
 * @text Auto Battle
 * @parent HelpWindow
 * @desc Text displayed when selecting the Auto Battle command.
 * @default Sets party to Auto Battle mode.
 *
 * @param HelpOptions:str
 * @text Options
 * @parent HelpWindow
 * @desc Text displayed when selecting the Options command.
 * @default Opens up the Options Menu.
 *
 * @param HelpEscape:str
 * @text Escape
 * @parent HelpWindow
 * @desc Text displayed when selecting the escape command.
 * @default Attempt to escape the battle.
 *
 */
/* ----------------------------------------------------------------------------
 * Actor Command Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActorCmd:
 *
 * @param Cmd
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Cmd
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Actor Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Cmd
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Actor Command Window.
 * @default left
 *
 * @param CmdIconItem:num
 * @text Item Icon
 * @parent Cmd
 * @desc The icon used for the Item command.
 * @default 176
 *
 * @param IconStypeNorm:num
 * @text Normal SType Icon
 * @parent Cmd
 * @desc Icon used for normal skill types that aren't assigned any
 * icons. Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Magic SType Icon
 * @parent Cmd
 * @desc Icon used for magic skill types that aren't assigned any
 * icons. Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * @default 79
 *
 * @param BattleCmd
 * @text Battle Commands
 *
 * @param BattleCmdList:arraystr
 * @text Command List
 * @parent BattleCmd
 * @type combo[]
 * @option attack
 * @option skills
 * @option guard
 * @option item
 * @option party
 * @option escape
 * @option auto battle
 * @option stypes
 * @option stype: x
 * @option stype: name
 * @option all skills
 * @option skill: x
 * @option skill: name
 * @option combat log
 * @desc List of battle commands that appear by default
 * if the <Battle Commands> notetag isn't present.
 * @default ["attack","skills","guard","party","item"]
 *
 * @param ShowCosts:eval
 * @text Show Command Costs
 * @parent BattleCmd
 * @type boolean
 * @on Show Costs
 * @off Hide Costs
 * @desc If a battle command has a resource cost, show it?
 * @default true
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpSkillType:str
 * @text Skill Types
 * @parent HelpWindow
 * @desc Text displayed when selecting a skill type.
 * %1 - Skill Type Name
 * @default Opens up a list of skills under the \C[16]%1\C[0] category.
 *
 * @param HelpItem:str
 * @text Items
 * @parent HelpWindow
 * @desc Text displayed when selecting the item command.
 * @default Opens up a list of items that you can use.
 *
 * @param HelpEscape:str
 * @text Escape
 * @parent HelpWindow
 * @desc Text displayed when selecting the escape command.
 * @default Attempt to escape the battle.
 *
 * @param HelpAutoBattle:str
 * @text Auto Battle
 * @parent HelpWindow
 * @desc Text displayed when selecting the Auto Battle command.
 * @default Automatically choose an action suitable for combat.
 *
 */
/* ----------------------------------------------------------------------------
 * Actor Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Actor:
 *
 * @param Flinch
 *
 * @param FlinchDistanceX:num
 * @text Flinch Distance X
 * @parent Flinch
 * @desc The normal X distance when flinching.
 * @default 12
 *
 * @param FlinchDistanceY:num
 * @text Flinch Distance Y
 * @parent Flinch
 * @desc The normal Y distance when flinching.
 * @default 0
 *
 * @param FlinchDuration:num
 * @text Flinch Duration
 * @parent Flinch
 * @desc The number of frames for a flinch to complete.
 * @default 6
 *
 * @param SvBattlers
 * @text Sideview Battlers
 *
 * @param AnchorX:num
 * @text Anchor: X
 * @parent SvBattlers
 * @desc Default X anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor: Y
 * @parent SvBattlers
 * @desc Default Y anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param ChantStyle:eval
 * @text Chant Style
 * @parent SvBattlers
 * @type boolean
 * @on Magical Hit Type
 * @off Magical Skill Type
 * @desc What determines the chant motion?
 * Hit type or skill type?
 * @default true
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent SvBattlers
 * @desc Offsets X position where actor is positioned.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent SvBattlers
 * @desc Offsets Y position where actor is positioned.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param MotionSpeed:num
 * @text Motion Speed
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc The number of frames in between each motion.
 * @default 12
 *
 * @param PrioritySortActive:eval
 * @text Priority: Active
 * @parent SvBattlers
 * @type boolean
 * @on Active Actor over All Else
 * @off Active Actor is Sorted Normally
 * @desc Place the active actor on top of actor and enemy sprites.
 * @default false
 *
 * @param PrioritySortActors:eval
 * @text Priority: Actors
 * @parent SvBattlers
 * @type boolean
 * @on Actors over Enemies
 * @off Sort by Y Position
 * @desc Prioritize actors over enemies when placing sprites on top
 * of each other.
 * @default true
 *
 * @param Shadow:eval
 * @text Shadow Visible
 * @parent SvBattlers
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Show or hide the shadow for Sideview Battlers.
 * @default true
 *
 * @param SmoothImage:eval
 * @text Smooth Image
 * @parent SvBattlers
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Smooth out the battler images or pixelate them?
 * @default false
 *
 * @param HomePosJS:func
 * @text JS: Home Position
 * @parent SvBattlers
 * @type note
 * @desc Code used to calculate the home position of actors.
 * @default "// Declare Constants\nconst sprite = this;\nconst actor = this._actor;\nconst index = arguments[0];\n\n// Make Calculations\nlet x = Math.round((Graphics.width / 2) + 192)\nx -= Math.floor((Graphics.width - Graphics.boxWidth) / 2);\nx += index * 32;\nlet y = (Graphics.height - 200) - ($gameParty.maxBattleMembers() * 48);\ny -= Math.floor((Graphics.height - Graphics.boxHeight) / 2);\ny += index * 48;\n\n// Home Position Offsets\nconst offsetNote = /<SIDEVIEW HOME OFFSET:[ ]([\\+\\-]\\d+),[ ]([\\+\\-]\\d+)>/i;\nconst xOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$1) : 0));\nconst yOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$2) : 0));\nx = xOffsets.reduce((r, offset) => r + offset, x);\ny = yOffsets.reduce((r, offset) => r + offset, y);\n\n// Set Home Position\nthis.setHome(x, y);"
 *
 */
/* ----------------------------------------------------------------------------
 * Enemy Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Enemy:
 *
 * @param Visual
 *
 * @param AttackAnimation:num
 * @text Attack Animation
 * @parent Visual
 * @type animation
 * @desc Default attack animation used for enemies.
 * Use <Attack Animation: x> for custom animations.
 * @default 1
 *
 * @param EmergeText:eval
 * @text Emerge Text
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show or hide the 'Enemy emerges!' text at the start of battle.
 * @default false
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent Visual
 * @desc Offsets X position where enemy is positioned.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent Visual
 * @desc Offsets Y position where enemy is positioned.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param SmoothImage:eval
 * @text Smooth Image
 * @parent Visual
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Smooth out the battler images or pixelate them?
 * @default true
 *
 * @param SelectWindow
 * @text Select Window
 *
 * @param LastSelected:eval
 * @text Any: Last Selected
 * @parent SelectWindow
 * @type boolean
 * @on Last Selected
 * @off FV/SV Priority
 * @desc Prioritize last selected enemy over front view or sideview settings?
 * @default true
 *
 * @param FrontViewSelect:eval
 * @text FV: Right Priority
 * @parent SelectWindow
 * @type boolean
 * @on Right
 * @off Normal
 * @desc If using frontview, auto select the enemy furthest right.
 * @default false
 *
 * @param SideviewSelect:eval
 * @text SV: Right Priority
 * @parent SelectWindow
 * @type boolean
 * @on Right
 * @off Normal
 * @desc If using sideview, auto select the enemy furthest right.
 * @default true
 * 
 * @param Name
 *
 * @param NameFontSize:num
 * @text Name: Font Size
 * @parent Name
 * @desc Font size used for enemy names.
 * @default 22
 *
 * @param NameOffsetX:num
 * @text Name: Offset X
 * @parent Name
 * @desc Offset the enemy name's X position by this much.
 * Negative goes left. Positive goes right.
 * @default 0
 *
 * @param NameOffsetY:num
 * @text Name: Offset Y
 * @parent Name
 * @desc Offset the enemy name's Y position by this much.
 * Negative goes up. Positive goes down.
 * @default 0
 *
 * @param NameAlwaysVisible:eval
 * @text Name: Always Visible
 * @parent Name
 * @type boolean
 * @on Always Visible
 * @off Hide when Unselected
 * @desc Determines if the enemy name will always be visible.
 * @default false
 *
 * @param NameAttachStateIcon:eval
 * @text Name: Attach States
 * @parent Name
 * @type boolean
 * @on Attach
 * @off Normal Position
 * @desc Attach the enemy's state icon to the enemy name?
 * @default false
 *
 * @param AttachStateOffsetX:num
 * @text Attach: Offset X
 * @parent NameAttachStateIcon:eval
 * @desc How much to offset the attached icon's X position by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param AttachStateOffsetY:num
 * @text Attach: Offset Y
 * @parent NameAttachStateIcon:eval
 * @desc How much to offset the attached icon's Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param SvBattlers
 * @text Sideview Battlers
 *
 * @param AllowCollapse:eval
 * @text Allow Collapse
 * @parent SvBattlers
 * @type boolean
 * @on Allow
 * @off Don't
 * @desc Causes defeated enemies with SV Battler graphics
 * to "fade away" when defeated?
 * @default false
 *
 * @param AnchorX:num
 * @text Anchor: X
 * @parent SvBattlers
 * @desc Default X anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor: Y
 * @parent SvBattlers
 * @desc Default Y anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param MotionIdle:str
 * @text Motion: Idle
 * @parent SvBattlers
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Sets default idle animation used by Sideview Battlers.
 * @default walk
 *
 * @param Shadow:eval
 * @text Shadow Visible
 * @parent SvBattlers
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Show or hide the shadow for Sideview Battlers.
 * @default true
 *
 * @param Width:num
 * @text Size: Width
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc Default width for enemies that use Sideview Battlers.
 * @default 64
 *
 * @param Height:num
 * @text Size: Height
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc Default height for enemies that use Sideview Battlers.
 * @default 64
 *
 * @param WtypeId:num
 * @text Weapon Type
 * @parent SvBattlers
 * @type number
 * @min 0
 * @desc Sets default weapon type used by Sideview Battlers.
 * Use 0 for Bare Hands.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * HP Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~HpGauge:
 *
 * @param Display
 * @text Show Gauges For
 *
 * @param ShowActorGauge:eval
 * @text Actors
 * @parent Display
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show HP Gauges over the actor sprites' heads?
 * Requires SV Actors to be visible.
 * @default true
 *
 * @param ShowEnemyGauge:eval
 * @text Enemies
 * @parent Display
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show HP Gauges over the enemy sprites' heads?
 * Can be bypassed with <Hide HP Gauge> notetag.
 * @default true
 *
 * @param RequiresDefeat:eval
 * @text Requires Defeat?
 * @parent ShowEnemyGauge:eval
 * @type boolean
 * @on Require Defeat First
 * @off No Requirement
 * @desc Requires defeating the enemy once to show HP Gauge?
 * Can be bypassed with <Show HP Gauge> notetag.
 * @default true
 *
 * @param BTestBypass:eval
 * @text Battle Test Bypass?
 * @parent RequiresDefeat:eval
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass the defeat requirement in battle test?
 * @default true
 *
 * @param Settings
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent Settings
 * @desc Where do you want the HP Gauge sprite's anchor X to be?
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent Settings
 * @desc Where do you want the HP Gauge sprite's anchor Y to be?
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent Settings
 * @desc How large/small do you want the HP Gauge to be scaled?
 * @default 0.5
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent Settings
 * @desc How many pixels to offset the HP Gauge's X by?
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent Settings
 * @desc How many pixels to offset the HP Gauge's Y by?
 * @default -3
 *
 * @param Options
 * @text Options
 *
 * @param AddHpGaugeOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show HP Gauge' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show HP Gauge
 *
 */
/* ----------------------------------------------------------------------------
 * Action Sequence Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActionSequence:
 *
 * @param AutoSequences
 * @text Automatic Sequences
 *
 * @param AutoMeleeSolo:eval
 * @text Melee Single Target
 * @parent AutoSequences
 * @type boolean
 * @on Allow
 * @off Ignore
 * @desc Allow this auto sequence for physical, single target actions?
 * @default true
 *
 * @param AutoMeleeAoE:eval
 * @text Melee Multi Target
 * @parent AutoSequences
 * @type boolean
 * @on Allow
 * @off Ignore
 * @desc Allow this auto sequence for physical, multi-target actions?
 * @default true
 *
 * @param QoL
 * @text Quality of Life
 *
 * @param AutoNotetag:eval
 * @text Auto Notetag
 * @parent QoL
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically apply the <Custom Action Sequence> notetag
 * effect to any item or skill that has a Common Event?
 * @default false
 *
 * @param CastAnimations
 * @text Cast Animations
 *
 * @param CastCertain:num
 * @text Certain Hit
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Certain Hit skills.
 * @default 120
 *
 * @param CastPhysical:num
 * @text Physical
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Physical skills.
 * @default 52
 *
 * @param CastMagical:num
 * @text Magical
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Magical skills.
 * @default 51
 *
 * @param CounterReflection
 * @text Counter/Reflect
 *
 * @param CounterPlayback:eval
 * @text Counter Back
 * @parent CounterReflection
 * @type boolean
 * @on Play Back
 * @off Ignore
 * @desc Play back the attack animation used?
 * @default true
 *
 * @param ReflectAnimation:num
 * @text Reflect Animation
 * @parent CounterReflection
 * @type animation
 * @desc Animation played when an action is reflected.
 * @default 1
 *
 * @param ReflectPlayback:eval
 * @text Reflect Back
 * @parent CounterReflection
 * @type boolean
 * @on Play Back
 * @off Ignore
 * @desc Play back the attack animation used?
 * @default true
 *
 * @param Stepping
 *
 * @param MeleeDistance:num
 * @text Melee Distance
 * @parent Stepping
 * @desc Minimum distance in pixels for Movement Action Sequences.
 * @default 24
 *
 * @param StepDistanceX:num
 * @text Step Distance X
 * @parent Stepping
 * @desc The normal X distance when stepping forward.
 * @default 48
 *
 * @param StepDistanceY:num
 * @text Step Distance Y
 * @parent Stepping
 * @desc The normal Y distance when stepping forward.
 * @default 0
 *
 * @param StepDuration:num
 * @text Step Duration
 * @parent Stepping
 * @desc The number of frames for a stepping action to complete.
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Projectile Start Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ProjectileStart:
 * 
 * @param Type:str
 * @text Type
 * @type select
 * @option Target - Start from battler target(s)
 * @value target
 * @option Point - Start from a point on the screen
 * @value point
 * @desc Select where the projectile should start from.
 * @default target
 * 
 * @param Targets:arraystr
 * @text Target(s)
 * @parent Type:str
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to start the projectile from.
 * @default ["user"]
 * 
 * @param TargetCenter:eval
 * @text Centralize
 * @parent Targets:arraystr
 * @type boolean
 * @on Center Projectile
 * @off Create Each
 * @desc Create one projectile at the center of the targets?
 * Or create a projectile for each target?
 * @default false
 * 
 * @param PointX:eval
 * @text Point X
 * @parent Type:str
 * @desc Insert the X coordinate to start the projectile at.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @param PointY:eval
 * @text Point Y
 * @parent Type:str
 * @desc Insert the Y coordinate to start the projectile at.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 * 
 * @param OffsetX:eval
 * @text Offset X
 * @desc Insert how many pixels to offset the X coordinate by.
 * You may use JavaScript code.
 * @default +0
 * 
 * @param OffsetY:eval
 * @text Offset Y
 * @desc Insert how many pixels to offset the Y coordinate by.
 * You may use JavaScript code.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * Projectile Goal Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ProjectileGoal:
 * 
 * @param Type:str
 * @text Type
 * @type select
 * @option Target - Goal is battler target(s)
 * @value target
 * @option Point - Goal is a point on the screen
 * @value point
 * @desc Select where the projectile should go to.
 * @default target
 * 
 * @param Targets:arraystr
 * @text Target(s)
 * @parent Type:str
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) for projectile to go to.
 * @default ["all targets"]
 * 
 * @param TargetCenter:eval
 * @text Centralize
 * @parent Targets:arraystr
 * @type boolean
 * @on Center Projectile
 * @off Create Each
 * @desc Set goal in the center of targets?
 * Or create a projectile to go to each target?
 * @default false
 * 
 * @param PointX:eval
 * @text Point X
 * @parent Type:str
 * @desc Insert the X coordinate to send the projectile to.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @param PointY:eval
 * @text Point Y
 * @parent Type:str
 * @desc Insert the Y coordinate to send the projectile to.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 * 
 * @param OffsetX:eval
 * @text Offset X
 * @desc Insert how many pixels to offset the X coordinate by.
 * You may use JavaScript code.
 * @default +0
 * 
 * @param OffsetY:eval
 * @text Offset Y
 * @desc Insert how many pixels to offset the Y coordinate by.
 * You may use JavaScript code.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * Projectile Extra Animation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ProjectileExAni:
 * 
 * @param AutoAngle:eval
 * @text Auto Angle?
 * @parent Settings
 * @type boolean
 * @on Automatically Angle
 * @off Normal
 * @desc Automatically angle the projectile to tilt the direction it's moving?
 * @default true
 * 
 * @param AngleOffset:eval
 * @text Angle Offset
 * @desc Alter the projectile's tilt by this many degrees.
 * @default +0
 * 
 * @param Arc:eval
 * @text Arc Peak
 * @parent Settings
 * @desc This is the height of the project's trajectory arc
 * in pixels.
 * @default 0
 *
 * @param EasingType:str
 * @text Easing
 * @parent Settings
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
 * @desc Select which easing type to apply to the projectile's trajectory.
 * @default Linear
 * 
 * @param Spin:eval
 * @text Spin Speed
 * @parent Settings
 * @desc Determine how much angle the projectile spins per frame.
 * Does not work well with "Auto Angle".
 * @default +0.0
 *
 */
/* ----------------------------------------------------------------------------
 * Projectile Extra Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ProjectileExtra:
 * 
 * @param AutoAngle:eval
 * @text Auto Angle?
 * @parent Settings
 * @type boolean
 * @on Automatically Angle
 * @off Normal
 * @desc Automatically angle the projectile to tilt the direction it's moving?
 * @default true
 * 
 * @param AngleOffset:eval
 * @text Angle Offset
 * @desc Alter the projectile's tilt by this many degrees.
 * @default +0
 * 
 * @param Arc:eval
 * @text Arc Peak
 * @parent Settings
 * @desc This is the height of the project's trajectory arc
 * in pixels.
 * @default 0
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the projectile?
 * @default 0
 *
 * @param EasingType:str
 * @text Easing
 * @parent Settings
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
 * @desc Select which easing type to apply to the projectile's trajectory.
 * @default Linear
 * 
 * @param Hue:eval
 * @text Hue
 * @parent Settings
 * @desc Adjust the hue of the projectile.
 * Insert a number between 0 and 360.
 * @default 0
 * 
 * @param Scale:eval
 * @text Scale
 * @parent Settings
 * @desc Adjust the size scaling of the projectile.
 * Use decimals for exact control.
 * @default 1.0
 * 
 * @param Spin:eval
 * @text Spin Speed
 * @parent Settings
 * @desc Determine how much angle the projectile spins per frame.
 * Does not work well with "Auto Angle".
 * @default +0.0
 *
 */
//=============================================================================

const _0x68cf=['ActSeq_DB_DragonbonesTimeScale','_createCursorArea','Scene_Battle_createHelpWindow','startTpbTurn','HP_Flat','damage','Window_ItemList_maxCols','BattleManager_onEscapeSuccess','refreshMotion','MAXMP','applyData','Skills','isSkill','_speed','ShowEnemyGauge','onActorCancel','JS\x20%1START\x20ACTION','critical','isSideButtonLayout','updateEventMain','Duration','FrontViewSelect','turnCount','BattleLayout','createUIContainer','moveBattlerDistance','startInput','battleCorePreBattleCommonEvent','checkTpbInputClose','103HzJHeD','createAttachmentSprites','checkShowHideSkillNotetags','_battlePortrait','updateFrame','removeBuff','updateHelp','_targetGrowY','Scene_Battle_onEnemyCancel','ArPenFlat','PopupDuration','_pattern','retreat','Sprite_Actor_moveToStartPosition','BackColor','updateCustomActionSequence','_homeX','ActionEffect','HpGaugeOffsetY','Angle','gainHp','updateAction','flashColor','updateVisibility','STR','Strength','initialize','addChildAt','displayReflection','subject','skillItemWindowRectMiddle','loadBattleback2','_baseLineStack','_freezeMotionData','CheckMapBattleEventValid','current\x20target','origin','SkillsStatesCore','notFocusValid','_weather','HpGaugeOffsetX','performCastAnimation','StartTurnWait','SkillItemStandardCols','State-%1-%2','isAttack','itemHeight','Sprite_Actor_setActorHome','placeGauge','battleMembers','Game_Enemy_setup','TpGaugeOffsetX','JS\x20BATTLE\x20VICTORY','filter','_currentActor','skillWindowRect','displayTpDamage','create','setBattlerFlip','push','PostApplyAsUserJS','initBattleCore','setVisibleUI','useItem','applySoftDamageCap','FlinchDistanceX','#%1','showNormalAnimation','isTickBased','Sprite_Battler_damageOffsetX','adjustPosition','Game_Action_needsSelection','alive\x20battlers','random','getItemDamageAmountLabelBattleCore','statusWindowRectDefaultStyle','addOptionsCommand','wtypeId','DistanceY','visibilityState','dead\x20battlers','ActionSkillMsg1','_item','actorCommandEscape','jump','%1StartBattleJS','ARRAYEVAL','reserveCommonEvent','onEscapeSuccess','PreStartActionJS','_updateClientArea','Scene_Battle_createAllWindows','hasSkill','isTriggered','Item-%1-%2','format','_forcing','isChangingOpacity','battleCommandName','itemRect','addActor','onEnemyCancel','applyEasing','ParseStateNotetags','displayActionResults','isAtbCastingState','isQueueOptionsMenu','isAnimationShownOnBattlePortrait','_motion','gainCurrentActionsFTB','isCharging','_floatHeight','setActionState','AUTO\x20BATTLE','svBattlerName','updateEffectContainers','Game_Action_itemEffectAddNormalState','isSpriteVisible','ForceExploited','ShowPortraitsBorderStyle','Scene_Battle_logWindowRect','attackMotions','includes','guard','placeActorName','actionEffect','_shake','commandOptions','registerDefeatedEnemy','isAnyoneJumping','onFloatEnd','Exploited','updateCommandNameWindow','Game_Battler_performDamage','_borderPortraitTargetX','updateCancel','DisablePartyCmd','Window_BattleLog_clear','AllowRandomSpeed','randomInt','_effectDuration','isAlwaysVisible','StartTurnShow','anchorY','attackAnimationIdSlot','removedStateObjects','type','iconText','isMagical','PARTY','weapons','QoL','CriticalColor','Game_Enemy_transform','makeActions','LUK','Formula','ActSeq_Movement_BattleStep','animationWait','setupChild','PreDamageJS','FlashDuration','iterateBattler','revealNewWeaknesses','Scene_Battle_onActorCancel','statusWindowRect','709258IKVBZj','Direction','loadWindowskin','ShowCounter','Skill-%1-%2','_action','skew','Window_BattleLog_performMiss','AsUser','addShowHpGaugeCommand','command301','BattleStartEvent','bitmap','AdjustRect','pow','loadSvActor','setMoveEasingType','walk','_weaponImageId','setActiveWeaponSet','PopupShiftX','mmp','Targets2','ActSeq_Skew_Reset','repositionEnemiesByResolution','AGI','ActionItemMsg','updateOpacity','ActSeq_Projectile_Picture','createAnimationSprite','skill','STRUCT','_enemyID','VisuMZ_3_ActSeqCamera','animationNextDelay','_svBattlerSprite','hpHealingFmt','_targetOpacity','ElementStatusCore','ActSeq_Movement_Jump','okButtonText','getItemDamageAmountTextOriginal','sortDamageSprites','logWindowRect','aliveMembers','Scene_Battle_skillWindowRect','isEnemy','WaitCount1','finishActionSet','Window_BattleLog_refresh','commandFight','adjustPosition_ScaleUp','ArRedRate','_regionBattleback2','isForFriend','_scene','_totalValue','hasBeenDefeatedBefore','statusText','blockWidth','criticalHitFlat','Setting','switchToWeaponType','addTextToCombatLog','%1Damage%2JS','ActSeq_Movement_WaitForOpacity','floor','alive\x20enemies\x20not\x20target','gainStoredBoostPoints','processAnimationRequests','weaponTypes','popupDamage','Victory','getSkillTypes','_phase','getLastPluginCommandInterpreter','ESCAPE','isHiddenSkill','_text','dimColor2','Sprite_Actor_update','Scene_Battle_updateBattleProcess','Game_Interpreter_command301','CoreEngine','StepDuration','needsSelection','currentExt','ActSeq_Element_ForceElements','applyBattleCoreJS','_regionBattleback1','addImmortal','SwitchMissEvade','onActorOk','ParseClassNotetags','drawText','createStateSprite','_tpbNeedsPartyCommand','CmdIconItem','currentAction','ParseActorNotetags','battleCamera','_visualHpGauge_JustDied','DigitGrouping','battleLayoutStyle','Window_BattleLog_performReflection','_indent','createActorCommandWindow','StatusWindowAttachmentFrontOffsetX','displayAddedStates','_baseY','front\x20center','CastAnimation','adjustPosition_ScaleDown','loop','toUpperCase','contentsOpacity','setBattleAngle','DistanceX','PostEndTurnJS','result','ParseArmorNotetags','Sprite_Enemy_initVisibility','EscapeFail','Game_BattlerBase_die','isImmortal','Name','addAutoBattleCommand','ActSeq_Camera_Clamp','updateBattleProcess','WaitForSkew','svAnchorX','ActSeq_Mechanics_StbExploit','CopyCombatLog','ReflectAnimation','AutoBattleRect','_growDuration','Targets','filterArea','canInput','setBattlerMotionTrailData','max','magicReflection','FaceDirection','CmdIconFight','updateBorderStyle','Game_Action_isForFriend','CriticalDmgRate','maxCommands','hardDamageCap','ActSeq_Set_FinishAction','_damagePopupArray','ShowPortraits','removeState','updateWeather','setAttack','updateShadow','ActionAnimation','targetObjects','Sprite_Enemy_setBattler','_activeWeaponSlot','ActSeq_Mechanics_CtbOrder','svBattlerAnchorY','_skewDuration','_helpWindow','Window_BattleStatus_drawItemImage','startMove','_target','_dimmerSprite','isVisualHpGaugeDisplayed','playCancel','clearBattlerMotionTrailData','setupHpGaugeSprite','version','_windowLayer','isFastForward','Class-%1-%2','onEscapeFailure','onGrowEnd','Game_Party_addActor','movement','Wave','getBattlePortraitFilename','Window_BattleLog_displayMiss','mainSprite','itemCri','BattleManager_processDefeat','Game_Map_setupBattleback','Window_BattleEnemy_initialize','setupMotionBlurImpactFilter','displayCritical','CriticalHitMultiplier','performWeaponAnimation','svBattlerAnchorX','noise','applyImmortal','_flashDuration','Point','MotionAni','ArRedFlat','attackAnimationId1','die','AnchorX','svAnchorY','ActSeq_Movement_WaitForJump','EnableSoftCap','call','command301_PreBattleEvent','AutoBattle','isEscapeCommandEnabled','ITEM','item','updateStateIconSprite','abs','_battlerName','WaitForSpin','addAutoBattleCommands','battleSpriteSkew','_skewWholeDuration','addGuardCommand','ActSeq_BattleLog_AddText','SvMotionIdleSolo-%1-%2','StatusWindowAttachmentFrontOffsetY','attack','UNTITLED','startFloat','performMoveToPoint','onDatabaseLoaded','clearFreezeMotionForWeapons','redraw','Game_Battler_startTpbTurn','_flashColor','isActing','setBattleZoom','isAnyoneSpinning','animationId','actions','command236','Debuffs','isOptionsCommandAdded','trim','ActiveTpbOptionsMessage','setEventCallback','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','WaitCount','updateTargetPosition','gaugeLineHeight','performJump','_isBattlerFlipped','ActSeq_Mechanics_AddState','clearRect','isMoving','process_VisuMZ_BattleCore_Notetags','_endBattle','HomePosJS','commandStyle','process_VisuMZ_BattleCore_jsFunctions','bgType','MP_Rate','Sprite_Battler_initMembers','setupBattlebackBattleCore','ActSeq_Movement_MoveBy','_baseX','gradientFillRect','performEvasion','ActSeq_DB_DragonbonesMotionAni','randomTargets','COMBATLOG','2833xUUShw','isDamagePopupRequested','Actor','bind','isItemCommandEnabled','setBackgroundType','command119','extraPositionX','clearResult','loadSystem','isEffecting','isDuringNonLoopingMotion','partyCommandWindowRectXPStyle','_wtypeIDs','CriticalHitFlat','WaitForCamera','getAttackMotion','STYPES','_effectsContainer','createDigits','ActionSequence','ActSeq_Movement_WaitForSpin','startTurn','DamageStyleList','getItemDamageAmountLabelOriginal','getColor','anchorX','isFrameVisible','updateShadowVisibility','VisuMZ_2_BattleSystemSTB','Window_BattleLog_performCollapse','friendsUnit','alive\x20friends\x20not\x20user','createActorCommandWindowBattleCore','WaitForAnimation','ActSeq_Camera_WaitForCamera','ActSeq_Horror_Clear','nextActiveWeaponSlot','canGuardBattleCore','_floatWholeDuration','updatePositionBattleCore','Window_BattleLog_displayFailure','checkShowHideSwitchNotetags','_opacityDuration','setupIconTextPopup','wait','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','refreshStatusWindow','PostDamageAsUserJS','compareEnemySprite','DistanceAdjust','NameFontSize','AutoNotetag','startSpin','repositionCancelButtonBorderStyle','battleZoom','createDamageContainer','calcWindowHeight','toString','NUM','updateShadowBattleCore','autoBattleWindowRect','isSkillItemWindowsMiddle','_preBattleCommonEvent','isBattlerFlipped','indexOf','Sprite_Actor_updateFrame','ShowAddedDebuff','makeData','clone','getInputButtonString','_surprise','spinBattler','battleCommandIcon','addSkillTypeCommand','TP_Flat','isStateResist','Scene_Battle_startActorSelection','StatusWindowAttachmentBackOffsetY','scope','drawSingleSkillCost','DefaultStyle','swing','FlashColor','CriticalHitRate','changeBattlebacks','battleCoreTpbMainPhase','waitForAnimation','onAllActionsEnd','ShowRemovedState','weaponImageId','_actorSprites','battleUIOffsetY','map','battleEnd','_battlerHue','_skewEasing','move','changeWeather','setImmortal','trueRandomTarget','_floatEasing','PreEndActionJS','PopupPosition','autoBattle','TargetLocation','startMotion','isBattleCoreTargetScope','onAngleEnd','\x5cI[%1]%2','XPActorCommandLines','createCommandNameWindow','JS\x20ESCAPE\x20SUCCESS','user','isLearnedSkill','removeAnimationFromContainer','Game_Action_evalDamageFormula','right','Scene_Battle_onActorOk','removedBuffs','_motionSpeed','linkSprite','onEnemyOk','setSkill','performAttack','PreApplyAsUserJS','launchBattle','_armorPenetration','ceil','setText','updateBorderSprite','currentClass','applyResultSwitches','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20','_statusWindow','ActSeq_Motion_RefreshMotion','displayCurrentState','getAttackMotionSlot','isAnyoneFloating','addGeneralOptions','autoMeleeSingleTargetActionSet','textColor','MaxLines','startSkew','_battleCoreNoElement','exit','Scene_Battle_stop','collapse','26909YUadKh','onTurnEnd','isForOpponent','isForRandomBattleCore','FocusX','makeActionOrders','effect','setCustomDamageFormula','updateSkew','_eventId','inputtingAction','performCounter','dying','displayMpDamage','getHardDamageCap','_skillIDs','Game_Action_isForOpponent','getWtypeIdWithName','setupBattleback','JumpToLabel','TpGaugeOffsetY','text\x20target','Mechanics','maxTp','PRE-','charging','BattleManager_endBattle','command283','%1EndTurnJS','processVictory','_enemyNameContainer','ScaleY','isSkewing','addSingleSkillCommand','iconIndex','ForceExploiter','checkShowHideBattleNotetags','_callSceneOptions','updateRefresh','refresh','isDying','clearActiveWeaponSlot','TpbGaugeOffsetX','isAutoBattle','_active','updatePadding','windowAreaHeight','VisuMZ_2_BattleSystemCTB','AlphaFilter','makeTargetsBattleCore','SvBattlerSolo-%1-%2','processRefresh','updateBattlerContainer','_colorType','startWeaponAnimation','Window_BattleLog_performAction','isSceneBattle','process_VisuMZ_BattleCore_Failsafes','allowCollapse','_autoBattle','finishActorInput','updateFlip','AnchorY','waitForJump','moveToStartPosition','Window_BattleStatus_initialize','_actionBattlers','drawEnemyName','_targetAngle','ActSeq_Movement_FacePoint','removeAnimation','ActSeq_Animation_ShowAnimation','isPartyTpbInputtable','canGuard','Scene_Battle_helpWindowRect','Window_BattleLog_displayTpDamage','message1','softDamageCap','VisuMZ_2_DragonbonesUnion','dead\x20enemies','clearElementChanges','speed','maxItems','updateStart','ConvertActionSequenceTarget','WtypeId','ConvertParams','_angleDuration','_attackAnimationId','skewBattler','Sprite_Battler_setBattler','isPartyCommandWindowDisabled','spell','Sprite_Actor_updateBitmap','RegExp','note','MANUAL','gainTp','updateStateSprite','ParseAllNotetags','updateShadowPosition','Game_Battler_clearMotion','isFightCommandEnabled','VisuMZ_3_ActSeqProjectiles','Game_Temp_requestAnimation','commandName','setupFont','ActSeq_Animation_AttackAnimation2','Mirror','debuffAdd','isJumping','refreshBattlerMotions','_targetIndex','enemyId','revertTpbCachedActor','addNewState','isShownOnBattlePortrait','param','createEnemyNameContainer','prepareBorderActor','hpAffected','PrioritySortActive','growBattler','ActSeq_Impact_ZoomBlurPoint','damageFlat','commandNameWindowDrawBackground','_battleField','_waitMode','FlinchDistanceY','States','repeatTargets','dimColor1','PreApplyJS','requestDragonbonesAnimation','ActSeq_Zoom_Scale','ShowMissEvasion','OffsetY','mainSpriteHeight','clearForcedGameTroopSettingsBattleCore','Parse_Notetags_TraitObjects','StatusWindowAttachmentBackOffsetX','Elements','setupDamagePopup','svBattlerShadowVisible','_battleCoreForcedElements','flashDuration','applyAngleChange','hue','parseForcedGameTroopSettingsBattleCore','Rate','Amp','placeTimeGauge','setBattleCameraTargets','isBusy','cameraOffsetDuration','Game_System_initialize','process_VisuMZ_BattleCore_DamageStyles','endAction','becomeSTBExploited','iconWidth','_actorCommandWindow','Enemy-%1-%2','_enemy','Window_BattleLog_performRecovery','Index','295843dmJIkN','sliceMax','members','displayBuffs','MDF','_actorWindow','delay','displayEvasion','ActSeq_Animation_AttackAnimation','Sprite_Battler_updateMain','CalcEscapeRaiseJS','_preemptive','isFloating','isMVAnimation','JS\x20%1START\x20BATTLE','Game_Interpreter_PluginCommand','commandNameWindowCenter','isBuffAffected','Sprite_Battler_setHome','AutoBattleBgType','StartTurnMsg','attackSkillId','PreEndTurnJS','ShowMpDmg','237986pWJYpY','MpGaugeOffsetY','isDead','_commonEventIDs','visualHpGauge','DamageRate','Scene_Battle_terminate','allBattleMembers','ActSeq_Animation_CastAnimation','canAttackBattleCore','ActSeq_Mechanics_VariablePopup','waitCount','playEnemyDamage','scale','_enemyId','updateForceAction','Spriteset_Battle_createBattleField','ReflectPlayback','Game_Interpreter_command283','playEnemyAttack','okTargetSelectionVisibility','arPenFlat','Game_Action_isForRandom','duration','Sprite_Enemy_createStateIconSprite','_animationSprites','stateMotionIndex','ActSeq_Motion_MotionType','createMiss','getSkillIdWithName','_lastPluginCommandInterpreter','_borderPortraitSprite','_offsetY','prototype','bitmapWidth','battlelog','_cache','isDebuffAffected','ActSeq_BattleLog_Clear','setHelpWindowItem','Enemy','onRegeneratePlayStateAnimation','updatePhase','Sprite_Actor_initMembers','AddOption','FUNC','itemLineRect','MeleeDistance','AutoMeleeSolo','PreStartTurnJS','ActSeq_Mechanics_RemoveState','createStateIconSprite','index','mainFontSize','traitObjects','removeChild','Game_Battler_clearDamagePopup','reduce','battleAngle','Window_BattleLog_performCounter','attachSpritesToDistortionSprite','actor%1-portrait','JS\x20%1END\x20BATTLE','createContents','selectNextCommandTpb','startGrow','mpDamage','faceRect','targetActionSet','ShowFacesListStyle','Sprite_Enemy_updateBossCollapse','ParseSkillNotetags','finalizeScale','alive\x20opponents','description','HitRate','MAT','getNextSubjectFromPool','setBattlerFacePoint','ActSeq_Mechanics_ArmorPenetration','changeAtbCastTime','_lastEnemy','drawIcon','createBattleUIOffsetX','#ffffff','updateGrow','_back1Sprite','forceWeaponAnimation','Parse_Notetags_Action','Scene_Battle_selectNextCommand','updateActors','addPartyCommand','AddHpGaugeOption','alterBreakShield','MIN_SAFE_INTEGER','processForcedAction','innerHeight','isAppeared','PartyCmd','ActionCount','ForceRandom','_escapeRatio','pop','_actions','Game_Action_makeTargets','getCommonEventIdWithName','findTargetSprite','mainSpriteWidth','_methods','isFlipped','commandNameWindowDrawText','moveBattlerToPoint','updateWaitMode','Game_Action_apply','performMagicEvasion','WaitForMovement','requestAnimation','faceWidth','Frame','resizeWindowXPStyle','JS\x20BATTLE\x20DEFEAT','maxBattleMembers','StatusWindowAttachmentFront','sleep','CriticalHitRateJS','battleStatusWindowAnimationContainer','NameOffsetY','clearFreezeMotion','displayHpDamage','isCustomBattleScope','skills','animationShouldMirror','JSON','ActSeq_Mechanics_Immortal','battleSys','DTB','portrait','CreateActionSequenceTargets','cameraDuration','onSkewEnd','alive\x20friends','Window_Options_statusText','SvMotionIdleMass-%1-%2','getNextSubject','close','Shadow','CombatLogIcon','%1RegenerateJS','HelpAutoBattle','createString','ActSeq_Mechanics_TextPopup','updateAngleCalculations','updateInterpreter','updateBossCollapse','isSpinning','battleGrow','code','ActSeq_Movement_HomeReset','ParseItemNotetags','substitute','Opacity','updateLink','ARRAYNUM','Game_Action_executeDamage','Sprite_Enemy_setHue','getAttackWeaponAnimationId','setFrame','startActorCommandSelection','updateStateSpriteBattleCore','createAllWindows','onEncounterBattleCore','requestMotionRefresh','partyCommandWindowRect','lineRect','DefaultSoftCap','ActSeq_Motion_FreezeMotionFrame','battler','_jumpHeight','dataId','_uiContainer','alive\x20friends\x20not\x20target','ActSeq_Mechanics_CtbSpeed','_targetSkewY','clearBattleCoreData','_padding','Linear','drawItemStyleIconText','ActSeq_Motion_PerformAction','freezeFrame','NameOffsetX','canUse','addCustomCommands','Spriteset_Battle_updateActors','drawItemStyleIcon','MotionType','ActSeq_Horror_TVCreate','lineHeight','shouldPopupDamage','ARRAYSTR','processBorderActor','getBattlePortraitOffsetX','PostEndActionJS','Variable','command357','customDamageFormula','performMiss','concat','setupActionSet','casting','_commonEventQueue','_jumpMaxHeight','ActSeq_ChangeAngle','Game_Battler_regenerateAll','EscapeSuccessJS','drawItemImageXPStyle','onJumpEnd','log','BattleLogRectJS','clearActiveWeaponSet','processRandomizedData','Window_ActorCommand_setup','createEnemyNames','ApplyImmortal','BattleManager_initMembers','round','IconStypeMagic','_multipliers','opponentsUnit','sortEnemies','message4','_growWholeDuration','ActSeq_Impact_MotionTrailCreate','isAnyoneChangingOpacity','Game_BattlerBase_eraseState','maxLines','ActSeq_BattleLog_DisplayAction','setWaitMode','ResetOffset','PrioritySortActors','callOptions','windowPadding','applyGuard','Sprite_StateIcon_updateFrame','PortraitScale','loadPicture','base','DamageStyles','drain','PerformAction','dead\x20actors','_itemWindow','onBattleStart','_updateFilterArea','initMembers','addSkillCommands','createHpGaugeSprite','maxCols','text','_jumpWholeDuration','dead\x20opponents','setupTextPopup','applyForcedGameTroopSettingsBattleCore','ActSeq_Projectile_Icon','checkAutoCustomActionSequenceNotetagEffect','fillRect','Spriteset_Battle_createLowerLayer','_iconIndex','isCustomActionSequence','stepFlinch','allowRandomSpeed','BattleManager_onEscapeFailure','visible','Immortal','_immortal','updateStyleOpacity','center','makeTargetSelectionMoreVisible','BreakShields','iconHeight','equips','forceAction','stepBack','active','_jumpDuration','_createEffectsContainer','+%1','forceMotion','Game_Troop_setup','uiInputPosition','COMBAT\x20LOG','addChildToBack','Scene_ItemBase_applyItem','updateCollapse','CheckSkillCommandShowSwitches','Window_BattleLog_popBaseLine','Turns','autoBattleStyle','3oLbiHY','ActSeq_Motion_ClearFreezeFrame','opacity','alive\x20battlers\x20not\x20target','missed','ActionStart','canUseItemCommand','transform','Sprite_Battler_updatePosition','LastSelected','PostApply%1JS','stop','Scene_Options_maxCommands','isBattlerGrounded','attackStates','processEscape','onSelectAction','HpGauge','occasion','ActSeq_BattleLog_WaitForBattleLog','hpDamageFmt','apply','Game_BattlerBase_canAttack','BattleManager_makeActionOrders','_enemies','ActSeq_Target_NextTarget','performRecovery','animation','CmdTextAutoBattle','itemTextAlign','reverse','_flinched','VisuMZ_3_BoostAction','SkipPartyCmd','_offsetX','isOkEnabled','ConfigManager_applyData','VariableID','Window_BattleLog_performSubstitute','changeInputWindow','commandStyleCheck','Game_Battler_performActionStart','hasSvBattler','Window_BattleLog_pushBaseLine','Game_Battler_performEvasion','BattleCmdList','_requestRefresh','isRightInputMode','_growEasing','createCommandVisibleJS','hide','WaitForAngle','makeTargetSprites','HelpItem','BattleManager_onEncounter','isBattleTest','VisuMZ_1_SkillsStatesCore','HelpEscape','canMove','PreDamageAsTargetJS','helpWindowRectBorderStyle','_inputting','Game_Actor_makeActionList','Post','drawItemImagePortraitStyle','setBattleCameraOffset','DefaultDamageStyle','victory','PreRegenerateJS','AutoBattleOK','softDamageCapRate','ActSeq_BattleLog_Refresh','OffsetX','actor','getDefeatedEnemies','JS\x20%1APPLY\x20%2','opacityStart','ActSeq_Impact_ShockwaveEachTargets','CounterPlayback','addEscapeCommand','Actor-%1-%2','applyTargetFilters','eraseState','Sprite_Actor_createStateSprite','isPhysical','_damageContainer','startAction','toUseBoostPoints','604209qQxpWD','_battleLayoutStyle','ShowHide','_battleCoreAddedElements','BattleLog','resetResultSwitches','PostStartActionJS','waitForEffect','ActSeq_Mechanics_CustomDmgFormula','addSingleSkillCommands','Scene_Battle_startEnemySelection','NewPopupBottom','VisuMZ_2_BattleSystemBTB','MessageWait','displayCounter','AttachStateOffsetX','Battleback','addItemCommand','_forcedBattleLayout','_index','prev\x20target','ActSeq_Mechanics_StbExtraAction','actorCommandCancelTPB','_autoBattleWindow','drawItemImage','gaugeX','Scene_Battle_startPartyCommandSelection','ActSeq_Camera_Offset','FaceAway','Window_BattleLog_performActionEnd','show','setBattlerBattleCore','adjustPosition_1for1','svShadow','706642mAkAwI','Window_BattleLog_displayMpDamage','ConfigManager_makeData','IconStypeNorm','Game_Actor_setup','skillTypes','createDistortionSprite','SvWeaponMass-%1-%2','ActSeq_Movement_FaceDirection','Scale','isFriendly','_cursorSprite','%1Event','all\x20targets','_hpGaugeSprite','isGuard','itemWindowRect','cancelActorInput','CmdStyle','_back2Sprite','placeStateIcon','_battlerContainer','onBattleStartBattleCore','startActorSelection','Sprite_Battler_isMoving','PreDamageAsUserJS','isForRandom','Scene_Battle_startActorCommandSelection','BoostPoints','hpDamage','performSubstitute','autoBattleAtStart','Sprite_Battleback_adjustPosition','forceEscapeSprite','Sprite_Battler_damageOffsetY','addDebuff','VisuMZ_3_ActSeqImpact','VisuMZ_1_MainMenuCore','initBattlePortrait','clearDamagePopup','battleAnimation','createBattleFieldContainer','isDeathStateAffected','ShowReflect','forceSelect','itemEffectAddNormalState','regenerateAllBattleCore','setBattlePortrait','getBattlePortrait','Exploiter','_dragonbonesSpriteContainer','itemHit','displayMiss','ResetFocus','damageRate','clamp','drawItem','_list','actionBattleCoreJS','TextColor','Scene_Battle_createActorCommandWindow','ActSeq_Horror_NoiseRemove','battleCommands','processDefeat','MpGaugeOffsetX','Buffs','getDualWieldTimes','createCancelButton','JS\x20%1END\x20TURN','ARRAYFUNC','ActSeq_Mechanics_BreakShieldReset','chant','process_VisuMZ_BattleCore_TraitObject_Notetags','NameAttachStateIcon','isPreviousSceneBattleTransitionable','isOpponent','PopupOffsetX','DamageDisplay','battlerSmoothImage','getItemDamageAmountTextBattleCore','isOptionsCommandEnabled','selectPreviousCommand','cameraClamp','addBuff','removeHorrorEffect','_weaponSprite','ScaleUp','processPostBattleCommonEvents','AsTarget','SkillItemMiddleLayout','EscapeSuccess','ActSeq_Horror_TVRemove','_opacityWholeDuration','battleEffect','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20obj\x20=\x20arguments[2];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x20arguments[3]\x20||\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20value;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Constants\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20action\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this\x20:\x20user.currentAction();\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20attacker\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20defender\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20healer\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20receiver\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20actor\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20currentClass\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this.item()\x20:\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20item\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this.item()\x20:\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20weapon\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20armor\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20enemy\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20obj;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Create\x20Compatibility\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20origin\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(Imported.VisuMZ_1_SkillsStatesCore\x20&&\x20$dataStates.includes(obj))\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20origin\x20=\x20target.getStateOrigin(obj.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(value)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20value\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20value\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20value\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','swapEnemyIDs','gainMp','ShowCritical','_motionCount','isDTB','_cursorArea','centerFrontViewSprite','ActSeq_Mechanics_Collapse','canAddSkillCommand','ForceDeath','itemEffectAddAttackState','Scene_Battle_createPartyCommandWindow','regenerateAll','isActiveTpb','battleMove','isAnyoneSkewing','TpbGaugeOffsetY','EscapeFailureJS','length','processBattleCoreJS','addText','changeTurnOrderByCTB','StyleON','battleCameraData','setActiveWeaponSlot','ActSeq_Movement_Opacity','angle','_battler','resizeWindowBorderStyle','Sprite_Battler_startMove','DEF','Sprite_Enemy_updateStateSprite','stbGainInstant','Shadow2','replace','criticalDmgRate','Window_BattleLog_displayCurrentState','_partyCommandWindow','setupBattleCore','Game_Interpreter_updateWaitMode','CastMagical','setLastPluginCommandInterpreter','performReflection','RequiresDefeat','updateBattlebackBitmap1','ActSeq_Element_NullElements','showHelpWindow','arPenRate','StatusWindowSkinFilename','TimeScale','dead\x20friends','DualWield','Game_Action_applyGlobal','ActSeq_Mechanics_ActionEffect','sort','makeAutoBattleActions','isAnyoneGrowing','Window_BattleLog_displayCritical','StyleName','Game_Battler_onBattleStart','statusTextAutoBattleStyle','ActSeq_Target_CurrentIndex','ActSeq_Horror_GlitchRemove','updateAttachmentSprites','name','makeDeepCopy','floatBattler','PreStartBattleJS','addAttackCommand','createKeyJS','updateBattlebackBitmap2','_motionType','hitRate','setupCriticalEffect','updateMotionCount','updateSpin','isBattleMember','_targetGrowX','BattleManager_cancelActorInput','inBattle','evalDamageFormula','_cancelButton','deadMembers','performCollapse','startEnemySelection','isAutoBattleCommandEnabled','ChargeRate','actorCommandSingleSkill','needsSelectionBattleCore','POST-','ActSeq_ChangeSkew','SideviewSelect','ShowWeapon','battleSpin','performMoveToTargets','autoSelectLastSelected','StateIconOffsetX','StyleOFF','displayReflectionPlayBack','ActionSkillMsg2','putActiveBattlerOnTop','default','focus','performFlinch','drawItemBackground','isHidden','commandEscape','isChanting','isAffectedByBreakShield','setupMotion','formula','criticalDmgFlat','join','rowSpacing','constructor','JS\x20%1START\x20TURN','start','isConfused','removeStatesAuto','_shadowSprite','PostStartBattleJS','ParseEnemyNotetags','hitFlat','BattleManager_startInput','Actions','commandSymbol','drawActorFace','helpWindowRect','Weapon-%1-%2','createShadowSprite','createDamageSprite','frontviewSpriteY','_actor','activate','setupZoomBlurImpactFilter','%1StartTurnJS','BattleManager_inputtingAction','clearHorrorEffects','parse','createAutoBattleWindow','_homeY','BattleManager_startAction','_stateIconSprite','bottom','Scene_Battle_itemWindowRect','boxHeight','update','performActionEndMembers','invokeAction','_enemySprites','actorCommandAutoBattle','slices','ActSeq_Movement_MoveToPoint','WaitForNewLine','ActSeq_Camera_Reset','isTpbMainPhase','_logWindow','emerge','snapForBackground','performActionMotions','ShowPopup','addDamageSprite','_enemyIDs','isAutoBattleCommandAdded','setHue','fontSize','autoMeleeMultiTargetActionSet','weatherPower','getMenuImage','setBattleSkew','Sprite_Enemy_update','Window_BattleLog_performMagicEvasion','ActSeq_Weapon_SetActiveWeapon','SkewX','terminate','PreApplyAsTargetJS','+%1\x20MP','process_VisuMZ_BattleCore_BaseTroops','createSeparateDamagePopups','updateHpGaugePosition','isAnyoneMoving','_tempEquipCheck','_subject','addBattleCoreAutoBattleStartupCommand','clear','AttachStateOffsetY','isMeleeMultiTargetAction','refreshRequest','_targetSkewX','MOTIONS','destroy','refreshActorPortrait','performActionEnd','EmergeText','drawTextEx','Parse_Notetags_Targets','Destination','fight','WaitForScale','partyCommandWindowRectBorderStyle','requestRefresh','_actionInputIndex','_borderPortraitDuration','_forcedBattlers','setup','isInputting','initMembersBattleCore','Settings','isNonSubmenuCancel','Game_Actor_equips','_targets','createPartyCommandWindowBattleCore','_angleRevertOnFinish','isCertainHit','ArPenRate','Sprite_Battler_update','ShowTpDmg','_growY','CommandVisible','updateFloat','VisuMZ_0_CoreEngine','splice','removeImmortal','battleDisplayText','initVisibility','waitForMovement','battleJump','autoSelect','extraPositionY','createWeather','createPartyCommandWindow','process_VisuMZ_BattleCore_Action_Notetags','prepareCustomActionSequence','criticalHitRate','ActSeq_Animation_WaitForAnimation','CmdIconEscape','addedDebuffs','getChildIndex','ActSeq_Angle_Reset','startAttackWeaponAnimation','ActionEndUpdate','ActSeq_Set_TargetActionSet','_damages','_distortionSprite','drawSkillCost','popBaseLine','isDisplayEmergedEnemies','battleCoreResumeLaunchBattle','_svBattlerData','DigitGroupingDamageSprites','freezeMotion','isNextSceneBattleTransitionable','_flipScaleX','createHelpWindow','Scene_Battle_createCancelButton','makeSpeed','uiMenuStyle','_enemyWindow','Game_BattlerBase_refresh','battleUIOffsetX','BattleManager_processVictory','ActSeq_Movement_WaitForScale','createMainSprite','optDisplayTp','updateAttachedSprites','initElementStatusCore','updatePosition','repeats','updateMain','Scene_Battle_onEnemyOk','_appeared','_checkOn','shift','_animationContainer','Game_Map_battleback2Name','isAlive','ActSeq_Animation_ActionAnimation','list','ShowFailure','adjustFlippedBattlefield','message2','open','makeActionListAutoAttack','regionId','escape','battleback1Name','_lineHeight','_stateSprite','Game_Action_itemEffectAddAttackState','callNextMethod','_cacheTextWidth','CastPhysical','createInnerPortrait','anchor','Scene_Map_initialize','_currentAngle','cancelTargetSelectionVisibility','filters','preemptive','CommandWidth','StatusWindowSelectableBackHide','performActionStart','spriteId','EnableDamageCap','isActionSelectionValid','makeBattleCommand','ActSeq_Target_PrevTarget','isForFriendBattleCore','ActSeq_Movement_WaitForMovement','makeCommandList','CmdTextAlign','thrust','createAnimationContainer','needsActorInputCancel','-%1','NameAlwaysVisible','DefaultHardCap','battleSkew','SkillItemBorderCols','ActSeq_Impact_ShockwaveCenterTargets','_emptyBitmap','float','-%1\x20MP','ActSeq_Projectile_Animation','VariableDmg','createTargetsJS','match','callUpdateHelp','EasingType','pushBaseLine','autoSelectPriority','Window_BattleEnemy_show','setupShockwaveImpactFilter','mpHealingFmt','isGrowing','updateJump','compareBattlerSprites','ActSeq_Mechanics_BoostPointsStoreData','selectNextActor','evade','ActSeq_Weapon_ClearActiveWeapon','MotionFrameWait','Window_BattleLog_displayEvasion','VisuMZ_2_WeaponSwapSystem','isBattleFlipped','showAnimation','Window_ActorCommand_initialize','Game_BattlerBase_isStateResist','evalDamageFormulaBattleCore','onEncounter','contents','HelpSkillType','Damage','statusWindowRectBorderStyle','remove','Scene_Battle_partyCommandWindowRect','_targetFloatHeight','Interrupt','top','setHorrorEffectSettings','BattleVictoryJS','ActSeq_Movement_WaitForFloat','createAttachedSprites','selectNextCommand','ActSeq_BattleLog_PushBaseLine','Scene_Battle_windowAreaHeight','createBattleField','_opacityEasing','JS\x20%1REGENERATE','_skillWindow','custom','isUndecided','svBattlerData','isCommandEnabled','ActSeq_Camera_FocusPoint','Game_BattlerBase_addNewState','addState','motionSpeed','ActSeq_Mechanics_AtbGauge','XPActorDefaultHeight','isGuardWaiting','setBattler','applyItem','createHelpWindowBattleCore','BattleManager_endAction','AS\x20TARGET','Sprite_Enemy_updateCollapse','width','startOpacity','smooth','Radius','border','Height','validTargets','WaitForJump','showPortraits','setHome','drawItemStatusListStyle','applyCritical','nameY','setSvBattlerSprite','Window_BattleLog_performDamage','addCommand','messageSpeed','ActSeq_Mechanics_BreakShieldChange','innerWidth','ActSeq_Impact_ColorBreak','_floatDuration','action','options','ActSeq_Movement_FaceTarget','PopupShiftY','atbInterrupt','isSideView','guardSkillId','wholeActionSet','endAnimation','stepForward','battleOpacity','RevertAngle','createBorderStylePortraitSprite','getBattlePortraitOffsetY','clearMotion','displayItemMessage','addAnimationSpriteToContainer','isMagicSkill','canBattlerMove','evaded','addChild','drawItemImageListStyle','traitSet','addedBuffs','addFightCommand','SwitchCritical','Game_BattlerBase_initMembers','PostDamageJS','enemy','makeTargets','process_VisuMZ_BattleCore_CreateRegExp','WaitForZoom','TPB','HP_Rate','Scene_Battle_start','value','textSizeEx','ParseWeaponNotetags','IconSet','applyFreezeMotionFrames','playReflection','HitFlat','displayAction','VariableHeal','drawGauge','waitForFloat','isAnyProjectilePresent','Scene_Map_launchBattle','BattleCore','JS\x20%1DAMAGE\x20%2','some','ActSeq_Mechanics_BtbGain','_animation','setValue','slice','displayRemovedStates','isTpb','SmoothImage','_angleEasing','makeEscapeRatio','applyGlobal','_lines','Window_BattleLog_performEvasion','PreEndBattleJS','_linkedSprite','_growX','performAction','updateBattlebackBitmap','SlotID','OffsetAdjust','Scene_Battle_commandFight','createBattleUIOffsetY','WaitForOpacity','autoBattleUseSkills','bitmapHeight','setHandler','isForOpponentBattleCore','DefaultSoftScaler','BattleDefeatJS','getDamageStyle','checkCacheKey','Game_Interpreter_terminate','isTurnBased','alive\x20actors\x20not\x20target','_customDamageFormula','cancel','callOkHandler','BattleManager_isTpbMainPhase','getTraitSetKeys','isAnimationPlaying','statusWindowRectXPStyle','Text','measureTextWidth','_skewY','applyHardDamageCap','icon','DamageFlat','MotionSpeed','mainSpriteScaleY','damageContainer','adjustPosition_ScaleToFit','_tpbState','turn','createLowerLayer','battleFloat','_handlers','addLoadListener','CommandAddAutoBattle','createActionSequenceProjectile','setActorHome','height','isSceneChanging','isClicked','PostRegenerateJS','_createClientArea','MotionIdle','process_VisuMZ_BattleCore_PluginParams','WaitForProjectile','applyDamageCaps','_defeatedEnemies','registerCommand','pattern','ScaleToFit','ActSeq_Target_RandTarget','CalcEscapeRatioJS','_updateCursorFilterArea','_spriteset','FocusY','updateBitmap','deathStateId','startPartyCommandSelection','magicSkills','changePaintOpacity','PostStartTurnJS','GUARD','startBattle','motionIdle','Scene_Boot_onDatabaseLoaded','preparePartyRefresh','_allTargets','Window_BattleLog_popupDamage','BravePoints','Game_BattlerBase_canGuard','chantStyle','parameters','_mainSprite','Window_SkillList_maxCols','VisuMZ_2_BattleSystemATB','split','Game_Battler_performMiss','isActor','TextAlign','_battleCoreBattleStartEvent','Sprite_Actor_updateShadow','Scene_Battle_selectPreviousCommand','parent','VisuMZ_4_CombatLog','toLowerCase','Game_Map_battleback1Name','ActSeq_Horror_NoiseCreate','isOnCurrentMap','ActSeq_Mechanics_HpMpTp','battleProjectiles','onOpacityEnd','drawItemStatus','PostEndBattleJS','_duration','unshift','_frontAttachmentSprite','createChildSprite','damageOffsetX','performAttackSlot','requestMotion','damageOffsetY','waitForNewLine','ALL\x20SKILLS','createJS','windowskin','padding','worldTransform','shadow','MAXHP','destroyDamageSprite','ActorCmd','PostApplyJS','SvBattlerMass-%1-%2','loadBitmap','currentSymbol','startJump','missile','_additionalSprites','StepDistanceX','RepositionEnemies','battleback2Name','ActSeq_Impact_ZoomBlurTargetCenter','isSkipPartyCommandWindow','_animationCount','startDamagePopup','mainSpriteScaleX','canEscape','textWidth','SkewY','loadEnemy','buffRemove','BattleManager_startTurn','resetFontSettings','moveToStartPositionBattleCore','_angleWholeDuration','singleSkill','_tpbSceneChangeCacheActor','StepDistanceY','BattleEndEvent','AllowCollapse','partyCommandWindowRectDefaultStyle','StateIconOffsetY','ActSeq_BattleLog_WaitForNewLine','performDamage','_executedValue','Game_Battler_onTurnEnd','Window_BattleLog_performActionStart','createEffectActionSet','skillItemWindowRectBorderStyle','executeDamage','actionSplicePoint','dead','ext','CmdIconAutoBattle','jumpBattler','isPlaytest','SceneManager_isSceneChanging','min','battlerSprites','autoBattleStart','abnormal','BattleManager_selectNextCommand','isBreakStunned','buffAdd','onDisabledPartyCommandSelection','ActSeq_Mechanics_AddBuffDebuff','boxWidth','Armor-%1-%2','getStypeIdWithName','createEmptyBitmap','Defeat','Pre','ActSeq_Skew_WaitForSkew','VisuMZ_2_HorrorEffects','CommandAddOptions','canAttack','animationBaseDelay','pages','VisuMZ_1_ElementStatusCore','_skewX','alive\x20battlers\x20not\x20user','isBattleSys','children','VisuMZ_4_BreakShields','power','_commandNameWindow','adjustWeaponSpriteOffset','EVAL','commandAutoBattle','arRedRate','Game_Battler_forceAction','useDigitGrouping','showEnemyAttackAnimation','TP_Rate','addCombatLogCommand','setupBattleCoreData','displayFailure','getEnemyIdWithName','Scene_Battle_updateStatusWindowPosition','currentValue','BattleManager_updatePhase','_stypeIDs','ActSeq_Mechanics_DamagePopup','OverallFormulaJS','extraHeight','setSTBExploited'];const _0x5d6e=function(_0x3fbf92,_0x478781){_0x3fbf92=_0x3fbf92-0x165;let _0x68cf06=_0x68cf[_0x3fbf92];return _0x68cf06;};const _0x421ee0=_0x5d6e;(function(_0x2b4c9f,_0x130df5){const _0x5714fc=_0x5d6e;while(!![]){try{const _0x76f0ff=-parseInt(_0x5714fc(0x292))+parseInt(_0x5714fc(0x1ed))*-parseInt(_0x5714fc(0x3d3))+parseInt(_0x5714fc(0x44d))+-parseInt(_0x5714fc(0x42b))+parseInt(_0x5714fc(0x81e))+-parseInt(_0x5714fc(0x2aa))+parseInt(_0x5714fc(0x929))*parseInt(_0x5714fc(0x778));if(_0x76f0ff===_0x130df5)break;else _0x2b4c9f['push'](_0x2b4c9f['shift']());}catch(_0x35deac){_0x2b4c9f['push'](_0x2b4c9f['shift']());}}}(_0x68cf,0x775e6));var label='BattleCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x421ee0(0x7ad)](function(_0x1535af){const _0x3ab05f=_0x421ee0;return _0x1535af['status']&&_0x1535af[_0x3ab05f(0x2f4)][_0x3ab05f(0x7f2)]('['+label+']');})[0x0];VisuMZ[label][_0x421ee0(0x57b)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x421ee0(0x243)]=function(_0x15a646,_0x19ea98){const _0x408a63=_0x421ee0;for(const _0x97ee3b in _0x19ea98){if(_0x97ee3b['match'](/(.*):(.*)/i)){const _0x5d472e=String(RegExp['$1']),_0x48a803=String(RegExp['$2'])[_0x408a63(0x890)]()['trim']();let _0xbcdb5,_0x6d7e7c,_0x2d340c;switch(_0x48a803){case _0x408a63(0x194):_0xbcdb5=_0x19ea98[_0x97ee3b]!==''?Number(_0x19ea98[_0x97ee3b]):0x0;break;case _0x408a63(0x34c):_0x6d7e7c=_0x19ea98[_0x97ee3b]!==''?JSON[_0x408a63(0x536)](_0x19ea98[_0x97ee3b]):[],_0xbcdb5=_0x6d7e7c[_0x408a63(0x1b6)](_0x33bf4a=>Number(_0x33bf4a));break;case _0x408a63(0x748):_0xbcdb5=_0x19ea98[_0x97ee3b]!==''?eval(_0x19ea98[_0x97ee3b]):null;break;case _0x408a63(0x7ce):_0x6d7e7c=_0x19ea98[_0x97ee3b]!==''?JSON[_0x408a63(0x536)](_0x19ea98[_0x97ee3b]):[],_0xbcdb5=_0x6d7e7c[_0x408a63(0x1b6)](_0x194d82=>eval(_0x194d82));break;case _0x408a63(0x32e):_0xbcdb5=_0x19ea98[_0x97ee3b]!==''?JSON[_0x408a63(0x536)](_0x19ea98[_0x97ee3b]):'';break;case'ARRAYJSON':_0x6d7e7c=_0x19ea98[_0x97ee3b]!==''?JSON[_0x408a63(0x536)](_0x19ea98[_0x97ee3b]):[],_0xbcdb5=_0x6d7e7c['map'](_0x46582b=>JSON[_0x408a63(0x536)](_0x46582b));break;case _0x408a63(0x2d7):_0xbcdb5=_0x19ea98[_0x97ee3b]!==''?new Function(JSON['parse'](_0x19ea98[_0x97ee3b])):new Function('return\x200');break;case _0x408a63(0x492):_0x6d7e7c=_0x19ea98[_0x97ee3b]!==''?JSON['parse'](_0x19ea98[_0x97ee3b]):[],_0xbcdb5=_0x6d7e7c['map'](_0x6e278d=>new Function(JSON[_0x408a63(0x536)](_0x6e278d)));break;case _0x408a63(0x790):_0xbcdb5=_0x19ea98[_0x97ee3b]!==''?String(_0x19ea98[_0x97ee3b]):'';break;case _0x408a63(0x370):_0x6d7e7c=_0x19ea98[_0x97ee3b]!==''?JSON[_0x408a63(0x536)](_0x19ea98[_0x97ee3b]):[],_0xbcdb5=_0x6d7e7c[_0x408a63(0x1b6)](_0x5d1337=>String(_0x5d1337));break;case _0x408a63(0x83d):_0x2d340c=_0x19ea98[_0x97ee3b]!==''?JSON[_0x408a63(0x536)](_0x19ea98[_0x97ee3b]):{},_0x15a646[_0x5d472e]={},VisuMZ[_0x408a63(0x243)](_0x15a646[_0x5d472e],_0x2d340c);continue;case'ARRAYSTRUCT':_0x6d7e7c=_0x19ea98[_0x97ee3b]!==''?JSON[_0x408a63(0x536)](_0x19ea98[_0x97ee3b]):[],_0xbcdb5=_0x6d7e7c[_0x408a63(0x1b6)](_0xe99e6a=>VisuMZ['ConvertParams']({},JSON[_0x408a63(0x536)](_0xe99e6a)));break;default:continue;}_0x15a646[_0x5d472e]=_0xbcdb5;}}return _0x15a646;},(_0xea5611=>{const _0x2f5d0d=_0x421ee0,_0x121780=_0xea5611[_0x2f5d0d(0x4ec)];for(const _0x4b3142 of dependencies){if(!Imported[_0x4b3142]){alert(_0x2f5d0d(0x910)[_0x2f5d0d(0x7d7)](_0x121780,_0x4b3142)),SceneManager[_0x2f5d0d(0x1ea)]();break;}}const _0x317c18=_0xea5611[_0x2f5d0d(0x2f4)];if(_0x317c18['match'](/\[Version[ ](.*?)\]/i)){const _0x476d78=Number(RegExp['$1']);_0x476d78!==VisuMZ[label][_0x2f5d0d(0x8ca)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x2f5d0d(0x7d7)](_0x121780,_0x476d78)),SceneManager['exit']());}if(_0x317c18[_0x2f5d0d(0x5f2)](/\[Tier[ ](\d+)\]/i)){const _0x5cd726=Number(RegExp['$1']);_0x5cd726<tier?(alert(_0x2f5d0d(0x187)[_0x2f5d0d(0x7d7)](_0x121780,_0x5cd726,tier)),SceneManager['exit']()):tier=Math[_0x2f5d0d(0x8aa)](_0x5cd726,tier);}VisuMZ[_0x2f5d0d(0x243)](VisuMZ[label][_0x2f5d0d(0x57b)],_0xea5611[_0x2f5d0d(0x6d4)]);})(pluginData),VisuMZ[_0x421ee0(0x333)]=function(_0x4c4836){const _0x5173a4=_0x421ee0;let _0x20c655=[];for(const _0x4017c4 of _0x4c4836){_0x20c655=_0x20c655[_0x5173a4(0x378)](VisuMZ[_0x5173a4(0x241)](_0x4017c4));}return _0x20c655[_0x5173a4(0x7ad)](_0xb00445=>_0xb00445);},VisuMZ['ConvertActionSequenceTarget']=function(_0x4936e4){const _0x6d543a=_0x421ee0,_0x38a162=BattleManager[_0x6d543a(0x2b1)]()['filter'](_0x14f8b9=>_0x14f8b9&&_0x14f8b9[_0x6d543a(0x30b)]()),_0x408ffd=BattleManager[_0x6d543a(0x562)],_0x1352b2=BattleManager[_0x6d543a(0x8c4)],_0x6fba93=BattleManager[_0x6d543a(0x6cf)]?BattleManager[_0x6d543a(0x6cf)][_0x6d543a(0x67a)](0x0):_0x38a162;_0x4936e4=_0x4936e4[_0x6d543a(0x6e1)]()[_0x6d543a(0x90d)]();if(_0x4936e4===_0x6d543a(0x1ca))return[_0x408ffd];else{if(_0x4936e4===_0x6d543a(0x79b))return[_0x1352b2];else{if(_0x4936e4===_0x6d543a(0x43f)){if(_0x1352b2){const _0x189a44=_0x6fba93[_0x6d543a(0x19a)](_0x1352b2);return _0x189a44>=0x0?[_0x6fba93[_0x189a44-0x1]||_0x1352b2]:[_0x1352b2];}}else{if(_0x4936e4===_0x6d543a(0x202)){if(_0x1352b2){const _0x2f9103=_0x6fba93[_0x6d543a(0x19a)](_0x1352b2);return _0x2f9103>=0x0?[_0x6fba93[_0x2f9103+0x1]||_0x1352b2]:[_0x1352b2];}}else{if(_0x4936e4===_0x6d543a(0x45a))return _0x6fba93;else{if(_0x4936e4===_0x6d543a(0x512))return[_0x408ffd][_0x6d543a(0x378)](_0x6fba93);else{if(_0x4936e4==='not\x20focus')return _0x38a162[_0x6d543a(0x7ad)](_0x472045=>_0x472045!==_0x408ffd&&!_0x6fba93['includes'](_0x472045)&&_0x472045['notFocusValid']());}}}}}}if(_0x408ffd){if(_0x4936e4===_0x6d543a(0x336))return _0x408ffd[_0x6d543a(0x178)]()[_0x6d543a(0x84a)]();else{if(_0x4936e4===_0x6d543a(0x179))return _0x408ffd['friendsUnit']()[_0x6d543a(0x84a)]()['filter'](_0x1f61f4=>_0x1f61f4!==_0x408ffd);else{if(_0x4936e4===_0x6d543a(0x35e))return _0x408ffd[_0x6d543a(0x178)]()[_0x6d543a(0x84a)]()['filter'](_0x3c731e=>_0x3c731e!==_0x1352b2);else{if(_0x4936e4===_0x6d543a(0x4de))return _0x408ffd['friendsUnit']()[_0x6d543a(0x4fe)]();else{if(_0x4936e4[_0x6d543a(0x5f2)](/FRIEND INDEX (\d+)/i)){const _0x404887=Number(RegExp['$1']);return[_0x408ffd[_0x6d543a(0x178)]()[_0x6d543a(0x294)]()[_0x404887]];}}}}}if(_0x4936e4===_0x6d543a(0x2f3))return _0x408ffd['opponentsUnit']()['aliveMembers']();else{if(_0x4936e4==='alive\x20opponents\x20not\x20target')return _0x408ffd['opponentsUnit']()[_0x6d543a(0x84a)]()[_0x6d543a(0x7ad)](_0x26ca8e=>_0x26ca8e!==_0x1352b2);else{if(_0x4936e4===_0x6d543a(0x3ad))return _0x408ffd[_0x6d543a(0x38d)]()[_0x6d543a(0x4fe)]();else{if(_0x4936e4['match'](/OPPONENT INDEX (\d+)/i)){const _0x4f361b=Number(RegExp['$1']);return[_0x408ffd['opponentsUnit']()[_0x6d543a(0x294)]()[_0x4f361b]];}}}}}if(_0x4936e4==='alive\x20actors')return $gameParty[_0x6d543a(0x84a)]();else{if(_0x4936e4==='alive\x20actors\x20not\x20user')return $gameParty[_0x6d543a(0x84a)]()['filter'](_0x11b4ce=>_0x11b4ce!==_0x408ffd);else{if(_0x4936e4===_0x6d543a(0x697))return $gameParty[_0x6d543a(0x84a)]()['filter'](_0x4fb91d=>_0x4fb91d!==_0x1352b2);else{if(_0x4936e4===_0x6d543a(0x3a3))return $gameParty[_0x6d543a(0x4fe)]();else{if(_0x4936e4[_0x6d543a(0x5f2)](/ACTOR INDEX (\d+)/i)){const _0x44f0d8=Number(RegExp['$1']);return[$gameParty[_0x6d543a(0x294)]()[_0x44f0d8]];}else{if(_0x4936e4[_0x6d543a(0x5f2)](/ACTOR ID (\d+)/i)){const _0x499a03=Number(RegExp['$1']);return[$gameActors[_0x6d543a(0x41c)](_0x499a03)];}}}}}}if(_0x4936e4==='alive\x20enemies')return $gameTroop[_0x6d543a(0x84a)]();else{if(_0x4936e4==='alive\x20enemies\x20not\x20user')return $gameTroop[_0x6d543a(0x84a)]()['filter'](_0x5722cf=>_0x5722cf!==_0x408ffd);else{if(_0x4936e4===_0x6d543a(0x861))return $gameTroop[_0x6d543a(0x84a)]()[_0x6d543a(0x7ad)](_0x50fb78=>_0x50fb78!==_0x1352b2);else{if(_0x4936e4===_0x6d543a(0x23c))return $gameTroop[_0x6d543a(0x4fe)]();else{if(_0x4936e4['match'](/ENEMY INDEX (\d+)/i)){const _0x549181=Number(RegExp['$1']);return[$gameTroop[_0x6d543a(0x294)]()[_0x549181]];}else{if(_0x4936e4['match'](/ENEMY ID (\d+)/i)){const _0x10067e=Number(RegExp['$1']);return $gameTroop[_0x6d543a(0x84a)]()['filter'](_0x2c82ad=>_0x2c82ad[_0x6d543a(0x25e)]()===_0x10067e);}}}}}}if(_0x4936e4===_0x6d543a(0x7c0))return _0x38a162[_0x6d543a(0x7ad)](_0x1e7afe=>_0x1e7afe[_0x6d543a(0x5bf)]());else{if(_0x4936e4===_0x6d543a(0x741))return _0x38a162[_0x6d543a(0x7ad)](_0x3affe5=>_0x3affe5[_0x6d543a(0x5bf)]()&&_0x3affe5!==_0x408ffd);else{if(_0x4936e4===_0x6d543a(0x3d6))return _0x38a162[_0x6d543a(0x7ad)](_0x354597=>_0x354597[_0x6d543a(0x5bf)]()&&_0x354597!==_0x1352b2);else{if(_0x4936e4===_0x6d543a(0x7c8))return _0x38a162[_0x6d543a(0x7ad)](_0x450345=>_0x450345[_0x6d543a(0x2ac)]());}}}return[];},PluginManager[_0x421ee0(0x6bc)](pluginData['name'],'ActSeq_Set_SetupAction',_0x2f2593=>{const _0xf096a0=_0x421ee0;if(!SceneManager[_0xf096a0(0x225)]())return;VisuMZ[_0xf096a0(0x243)](_0x2f2593,_0x2f2593);const _0x490b10=$gameTemp['getLastPluginCommandInterpreter'](),_0x464d8d=BattleManager[_0xf096a0(0x823)],_0x56efe0=BattleManager[_0xf096a0(0x562)],_0xccacde=BattleManager[_0xf096a0(0x6cf)]?BattleManager['_allTargets'][_0xf096a0(0x67a)](0x0):[],_0xa5151a=BattleManager[_0xf096a0(0x548)];if(!_0x490b10||!_0x464d8d||!_0x56efe0)return;if(!_0x464d8d[_0xf096a0(0x8f0)]())return;if(_0x2f2593['DisplayAction'])_0xa5151a['displayAction'](_0x56efe0,_0x464d8d['item']());_0x2f2593[_0xf096a0(0x388)]&&_0xa5151a[_0xf096a0(0x7b3)](_0xf096a0(0x8e0),_0x56efe0,_0xccacde,!![]);if(_0x2f2593[_0xf096a0(0x3d8)])_0xa5151a['push'](_0xf096a0(0x5d9),_0x56efe0,_0x464d8d);if(_0x2f2593[_0xf096a0(0x31d)])_0xa5151a[_0xf096a0(0x7b3)](_0xf096a0(0x58d));if(_0x2f2593[_0xf096a0(0x88d)])_0xa5151a[_0xf096a0(0x7b3)](_0xf096a0(0x7a1),_0x56efe0,_0x464d8d);if(_0x2f2593['WaitForAnimation'])_0xa5151a[_0xf096a0(0x7b3)](_0xf096a0(0x1b0));_0x490b10[_0xf096a0(0x396)](_0xf096a0(0x2cd));}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],'ActSeq_Set_WholeActionSet',_0x523b2c=>{const _0x27baf2=_0x421ee0;if(!SceneManager[_0x27baf2(0x225)]())return;VisuMZ[_0x27baf2(0x243)](_0x523b2c,_0x523b2c);const _0x34fee9=$gameTemp['getLastPluginCommandInterpreter'](),_0x411199=BattleManager['_action'],_0x1fcbe5=BattleManager[_0x27baf2(0x562)],_0x4cb84b=BattleManager[_0x27baf2(0x6cf)]?BattleManager[_0x27baf2(0x6cf)][_0x27baf2(0x67a)](0x0):[],_0x1a6e62=BattleManager[_0x27baf2(0x548)],_0x5492f7=_0x523b2c[_0x27baf2(0x4df)]??![];if(!_0x34fee9||!_0x411199||!_0x1fcbe5)return;if(!_0x411199[_0x27baf2(0x8f0)]())return;let _0x279f03=_0x5492f7?_0x1a6e62[_0x27baf2(0x48f)](_0x1fcbe5):0x1;for(let _0x248f20=0x0;_0x248f20<_0x279f03;_0x248f20++){_0x5492f7&&_0x1fcbe5[_0x27baf2(0x6da)]()&&_0x1a6e62[_0x27baf2(0x7b3)](_0x27baf2(0x831),_0x1fcbe5,_0x248f20);if(_0x523b2c[_0x27baf2(0x3a2)])_0x1a6e62[_0x27baf2(0x7b3)](_0x27baf2(0x686),_0x1fcbe5,_0x411199);if(_0x523b2c['WaitCount']>0x0)_0x1a6e62[_0x27baf2(0x7b3)]('waitCount',_0x523b2c[_0x27baf2(0x911)]);if(_0x523b2c['ActionAnimation'])_0x1a6e62[_0x27baf2(0x7b3)](_0x27baf2(0x605),_0x1fcbe5,_0x4cb84b,_0x411199[_0x27baf2(0x8f0)]()[_0x27baf2(0x908)]);if(_0x523b2c[_0x27baf2(0x17b)])_0x1a6e62['push'](_0x27baf2(0x1b0));for(const _0x374995 of _0x4cb84b){if(!_0x374995)continue;if(_0x523b2c[_0x27baf2(0x789)])_0x1a6e62[_0x27baf2(0x7b3)](_0x27baf2(0x7f5),_0x1fcbe5,_0x374995);}}_0x5492f7&&_0x1fcbe5[_0x27baf2(0x6da)]()&&_0x1a6e62['push']('clearActiveWeaponSet',_0x1fcbe5);if(_0x523b2c[_0x27baf2(0x388)])_0x1a6e62[_0x27baf2(0x7b3)](_0x27baf2(0x8e0),_0x1fcbe5,_0x4cb84b,![]);_0x34fee9[_0x27baf2(0x396)]('battlelog');}),PluginManager['registerCommand'](pluginData['name'],_0x421ee0(0x59d),_0x517150=>{const _0x3a9f4d=_0x421ee0;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x3a9f4d(0x243)](_0x517150,_0x517150);const _0x3eae83=$gameTemp[_0x3a9f4d(0x869)](),_0x3c8325=BattleManager[_0x3a9f4d(0x823)],_0x21c2f5=BattleManager[_0x3a9f4d(0x562)],_0x446abc=BattleManager['_allTargets']?BattleManager[_0x3a9f4d(0x6cf)][_0x3a9f4d(0x67a)](0x0):[],_0x1330b1=BattleManager[_0x3a9f4d(0x548)],_0x50a7d5=_0x517150[_0x3a9f4d(0x4df)]??![];if(!_0x3eae83||!_0x3c8325||!_0x21c2f5)return;if(!_0x3c8325[_0x3a9f4d(0x8f0)]())return;let _0x304cef=_0x50a7d5?_0x1330b1['getDualWieldTimes'](_0x21c2f5):0x1;for(let _0x5f19bf=0x0;_0x5f19bf<_0x304cef;_0x5f19bf++){for(const _0x250e7e of _0x446abc){if(!_0x250e7e)continue;_0x50a7d5&&_0x21c2f5[_0x3a9f4d(0x6da)]()&&_0x1330b1[_0x3a9f4d(0x7b3)](_0x3a9f4d(0x831),_0x21c2f5,_0x5f19bf);if(_0x517150['PerformAction'])_0x1330b1[_0x3a9f4d(0x7b3)](_0x3a9f4d(0x686),_0x21c2f5,_0x3c8325);if(_0x517150['WaitCount1']>0x0)_0x1330b1[_0x3a9f4d(0x7b3)]('waitCount',_0x517150[_0x3a9f4d(0x84d)]);if(_0x517150[_0x3a9f4d(0x8ba)])_0x1330b1[_0x3a9f4d(0x7b3)](_0x3a9f4d(0x605),_0x21c2f5,[_0x250e7e],_0x3c8325['item']()[_0x3a9f4d(0x908)]);if(_0x517150['WaitCount2']>0x0)_0x1330b1[_0x3a9f4d(0x7b3)](_0x3a9f4d(0x2b5),_0x517150['WaitCount2']);if(_0x517150[_0x3a9f4d(0x789)])_0x1330b1['push'](_0x3a9f4d(0x7f5),_0x21c2f5,_0x250e7e);}}_0x50a7d5&&_0x21c2f5[_0x3a9f4d(0x6da)]()&&_0x1330b1[_0x3a9f4d(0x7b3)](_0x3a9f4d(0x384),_0x21c2f5);if(_0x517150[_0x3a9f4d(0x388)])_0x1330b1[_0x3a9f4d(0x7b3)]('applyImmortal',_0x21c2f5,_0x446abc,![]);_0x3eae83[_0x3a9f4d(0x396)](_0x3a9f4d(0x2cd));}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x8b3),_0x33759c=>{const _0x57d542=_0x421ee0;if(!SceneManager[_0x57d542(0x225)]())return;VisuMZ[_0x57d542(0x243)](_0x33759c,_0x33759c);const _0x5bf15b=$gameTemp['getLastPluginCommandInterpreter'](),_0x436ffe=BattleManager['_action'],_0x222e48=BattleManager[_0x57d542(0x562)],_0x21af2b=BattleManager['_allTargets']?BattleManager[_0x57d542(0x6cf)][_0x57d542(0x67a)](0x0):[],_0x45afa6=BattleManager[_0x57d542(0x548)];if(!_0x5bf15b||!_0x436ffe||!_0x222e48)return;if(!_0x436ffe[_0x57d542(0x8f0)]())return;if(_0x33759c[_0x57d542(0x388)])_0x45afa6['push'](_0x57d542(0x8e0),_0x222e48,_0x21af2b,![]);if(_0x33759c[_0x57d542(0x545)])_0x45afa6['push'](_0x57d542(0x6f2));if(_0x33759c['WaitForEffect'])_0x45afa6[_0x57d542(0x7b3)](_0x57d542(0x432));if(_0x33759c['ClearBattleLog'])_0x45afa6[_0x57d542(0x7b3)](_0x57d542(0x564));if(_0x33759c['ActionEnd'])_0x45afa6['push'](_0x57d542(0x56c),_0x222e48);if(_0x33759c['WaitForMovement'])_0x45afa6[_0x57d542(0x7b3)]('waitForMovement');_0x5bf15b[_0x57d542(0x396)](_0x57d542(0x2cd));}),PluginManager['registerCommand'](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x37d),_0x36a67b=>{const _0x5bd5f0=_0x421ee0;if(!SceneManager[_0x5bd5f0(0x225)]())return;if(!Imported[_0x5bd5f0(0x83f)])return;VisuMZ[_0x5bd5f0(0x243)](_0x36a67b,_0x36a67b);const _0x1fc207=$gameTemp[_0x5bd5f0(0x869)](),_0x885ecb=_0x36a67b[_0x5bd5f0(0x406)];if(!_0x1fc207)return;$gameScreen['setBattleAngle'](_0x36a67b[_0x5bd5f0(0x78b)],_0x36a67b[_0x5bd5f0(0x76f)],_0x36a67b[_0x5bd5f0(0x5f4)]);if(_0x885ecb)_0x1fc207[_0x5bd5f0(0x396)](_0x5bd5f0(0x2e4));}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x59a),_0xe72536=>{const _0x3df278=_0x421ee0;if(!SceneManager[_0x3df278(0x225)]())return;if(!Imported[_0x3df278(0x83f)])return;VisuMZ['ConvertParams'](_0xe72536,_0xe72536);const _0x2650fb=$gameTemp[_0x3df278(0x869)](),_0x1fe3ad=_0xe72536['WaitForAngle'];if(!_0x2650fb)return;$gameScreen[_0x3df278(0x892)](0x0,_0xe72536['Duration'],_0xe72536[_0x3df278(0x5f4)]);if(_0x1fe3ad)_0x2650fb[_0x3df278(0x396)](_0x3df278(0x2e4));}),PluginManager[_0x421ee0(0x6bc)](pluginData['name'],'ActSeq_Angle_WaitForAngle',_0x36499e=>{const _0x16efb5=_0x421ee0;if(!SceneManager[_0x16efb5(0x225)]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;const _0x447d3b=$gameTemp[_0x16efb5(0x869)]();if(!_0x447d3b)return;_0x447d3b[_0x16efb5(0x396)](_0x16efb5(0x2e4));}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x5c0),_0x3580af=>{const _0x2eba46=_0x421ee0;if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0x3580af,_0x3580af);const _0x31d67c=$gameTemp[_0x2eba46(0x869)](),_0x3d909b=BattleManager['_action'],_0x296a44=BattleManager['_subject'],_0x260f70=VisuMZ['CreateActionSequenceTargets'](_0x3580af[_0x2eba46(0x8a6)]),_0x7029be=_0x3580af[_0x2eba46(0x259)],_0x45f010=BattleManager[_0x2eba46(0x548)];if(!_0x31d67c||!_0x3d909b||!_0x296a44)return;if(!_0x3d909b[_0x2eba46(0x8f0)]())return;let _0x3e032d=_0x3d909b[_0x2eba46(0x8f0)]()[_0x2eba46(0x908)];if(_0x3e032d<0x0)_0x3e032d=_0x296a44['attackAnimationId1']();$gameTemp['requestAnimation'](_0x260f70,_0x3e032d,_0x7029be),_0x3580af[_0x2eba46(0x17b)]&&_0x31d67c[_0x2eba46(0x396)](_0x2eba46(0x475));}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x29a),_0x102993=>{const _0x57ec73=_0x421ee0;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x57ec73(0x243)](_0x102993,_0x102993);const _0x1b6391=$gameTemp[_0x57ec73(0x869)](),_0x5e043e=BattleManager[_0x57ec73(0x562)],_0x422312=VisuMZ[_0x57ec73(0x333)](_0x102993[_0x57ec73(0x8a6)]),_0x13841d=_0x102993[_0x57ec73(0x259)],_0x5a99d3=BattleManager[_0x57ec73(0x548)];if(!_0x1b6391||!_0x5e043e)return;const _0x4dd96b=_0x5e043e[_0x57ec73(0x8e5)]();$gameTemp[_0x57ec73(0x31e)](_0x422312,_0x4dd96b,_0x13841d),_0x102993[_0x57ec73(0x17b)]&&_0x1b6391[_0x57ec73(0x396)](_0x57ec73(0x475));}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x258),_0x4e3fc6=>{const _0x5e7dfe=_0x421ee0;if(!SceneManager[_0x5e7dfe(0x225)]())return;VisuMZ['ConvertParams'](_0x4e3fc6,_0x4e3fc6);const _0x49e1a0=_0x4d1c64['attackAnimationIdSlot'](_0x4e3fc6['Slot']);if(_0x49e1a0<=0x0)return;const _0x30b488=$gameTemp['getLastPluginCommandInterpreter'](),_0x4d1c64=BattleManager[_0x5e7dfe(0x562)],_0x304c7f=VisuMZ[_0x5e7dfe(0x333)](_0x4e3fc6[_0x5e7dfe(0x8a6)]),_0x55c159=_0x4e3fc6[_0x5e7dfe(0x259)],_0x43edf6=BattleManager[_0x5e7dfe(0x548)];if(!_0x30b488||!_0x4d1c64)return;$gameTemp[_0x5e7dfe(0x31e)](_0x304c7f,_0x49e1a0,_0x55c159),_0x4e3fc6[_0x5e7dfe(0x17b)]&&_0x30b488['setWaitMode']('battleAnimation');}),PluginManager[_0x421ee0(0x6bc)](pluginData['name'],_0x421ee0(0x2b2),_0x11a572=>{const _0x1a3d43=_0x421ee0;if(!SceneManager[_0x1a3d43(0x225)]())return;VisuMZ[_0x1a3d43(0x243)](_0x11a572,_0x11a572);const _0x5c488e=$gameTemp[_0x1a3d43(0x869)](),_0x1565f1=BattleManager['_action'],_0x4b7298=_0x11a572[_0x1a3d43(0x259)],_0x55cea0=VisuMZ[_0x1a3d43(0x333)](_0x11a572[_0x1a3d43(0x8a6)]);if(!_0x5c488e||!_0x1565f1)return;if(!_0x1565f1[_0x1a3d43(0x8f0)]())return;for(const _0xf89da1 of _0x55cea0){if(!_0xf89da1)continue;_0xf89da1['performCastAnimation'](_0x1565f1,_0x4b7298);}if(_0x11a572[_0x1a3d43(0x17b)])_0x5c488e[_0x1a3d43(0x396)](_0x1a3d43(0x475));}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],'ActSeq_Animation_ChangeBattlePortrait',_0x2323b7=>{const _0x15f2fe=_0x421ee0;VisuMZ[_0x15f2fe(0x243)](_0x2323b7,_0x2323b7);const _0x1fba8e=$gameTemp[_0x15f2fe(0x869)](),_0x42d830=VisuMZ[_0x15f2fe(0x333)](_0x2323b7[_0x15f2fe(0x8a6)]),_0x39795f=_0x2323b7['Filename'];if(!_0x39795f)return;for(const _0x12e511 of _0x42d830){if(!_0x12e511)continue;if(!_0x12e511[_0x15f2fe(0x6da)]())continue;_0x12e511['setBattlePortrait'](_0x39795f);}}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x234),_0x3e0118=>{const _0x1e0d33=_0x421ee0;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x1e0d33(0x243)](_0x3e0118,_0x3e0118);const _0x586779=$gameTemp[_0x1e0d33(0x869)](),_0x28adf0=VisuMZ['CreateActionSequenceTargets'](_0x3e0118[_0x1e0d33(0x8a6)]),_0x5762a8=_0x3e0118['AnimationID'],_0x534a9c=_0x3e0118[_0x1e0d33(0x259)];if(!_0x586779)return;$gameTemp[_0x1e0d33(0x31e)](_0x28adf0,_0x5762a8,_0x534a9c);if(_0x3e0118[_0x1e0d33(0x17b)])_0x586779[_0x1e0d33(0x396)]('battleAnimation');}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x596),_0x424ed4=>{const _0x393bba=_0x421ee0;if(!SceneManager[_0x393bba(0x225)]())return;const _0x112cb6=$gameTemp[_0x393bba(0x869)]();if(!_0x112cb6)return;_0x112cb6[_0x393bba(0x396)](_0x393bba(0x475));}),PluginManager['registerCommand'](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x8f9),_0x117fc5=>{const _0x510e67=_0x421ee0;if(!SceneManager[_0x510e67(0x225)]())return;VisuMZ[_0x510e67(0x243)](_0x117fc5,_0x117fc5);const _0x40344c=BattleManager[_0x510e67(0x548)],_0x3abbb3=_0x117fc5[_0x510e67(0x8a2)]&&Imported['VisuMZ_4_CombatLog'];_0x40344c[_0x510e67(0x4c0)](_0x117fc5[_0x510e67(0x69f)]),_0x3abbb3&&Imported['VisuMZ_4_CombatLog']&&$gameSystem[_0x510e67(0x85d)](_0x117fc5[_0x510e67(0x69f)]||'',_0x117fc5[_0x510e67(0x33c)]||0x0);}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x2d0),_0x3392b0=>{const _0x17312e=_0x421ee0;if(!SceneManager[_0x17312e(0x225)]())return;const _0x18fd6d=BattleManager[_0x17312e(0x548)];_0x18fd6d[_0x17312e(0x564)]();}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x395),_0x5bde66=>{const _0x5ee70a=_0x421ee0;if(!SceneManager[_0x5ee70a(0x225)]())return;const _0x13da63=$gameTemp[_0x5ee70a(0x869)](),_0x1696a6=BattleManager['_action'],_0xf0cec7=BattleManager[_0x5ee70a(0x562)],_0x31ac63=BattleManager['_logWindow'];if(!_0x13da63||!_0x1696a6||!_0xf0cec7)return;if(!_0x1696a6[_0x5ee70a(0x8f0)]())return;_0x31ac63['displayAction'](_0xf0cec7,_0x1696a6['item']()),_0x13da63[_0x5ee70a(0x396)](_0x5ee70a(0x2cd));}),PluginManager['registerCommand'](pluginData[_0x421ee0(0x4ec)],'ActSeq_BattleLog_PopBaseLine',_0x5da963=>{const _0x42d75f=_0x421ee0;if(!SceneManager[_0x42d75f(0x225)]())return;const _0x208925=BattleManager[_0x42d75f(0x548)];_0x208925[_0x42d75f(0x5a1)]();}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x618),_0x37a660=>{const _0x5bd81a=_0x421ee0;if(!SceneManager['isSceneBattle']())return;const _0x24bb1b=BattleManager[_0x5bd81a(0x548)];_0x24bb1b[_0x5bd81a(0x5f5)]();}),PluginManager[_0x421ee0(0x6bc)](pluginData['name'],_0x421ee0(0x41a),_0x35346d=>{const _0x5c5ebc=_0x421ee0;if(!SceneManager[_0x5c5ebc(0x225)]())return;const _0x114496=BattleManager[_0x5c5ebc(0x548)];_0x114496[_0x5c5ebc(0x214)]();}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],'ActSeq_BattleLog_UI',_0x448222=>{const _0x2dd108=_0x421ee0;if(!SceneManager[_0x2dd108(0x225)]())return;VisuMZ[_0x2dd108(0x243)](_0x448222,_0x448222),SceneManager['_scene'][_0x2dd108(0x7b6)](_0x448222[_0x2dd108(0x42d)]);}),PluginManager[_0x421ee0(0x6bc)](pluginData['name'],_0x421ee0(0x3e6),_0x33f88d=>{const _0xc35e8a=_0x421ee0;if(!SceneManager[_0xc35e8a(0x225)]())return;const _0x47dc5a=$gameTemp['getLastPluginCommandInterpreter']();_0x47dc5a[_0xc35e8a(0x396)](_0xc35e8a(0x2cd));}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x71b),_0x50180c=>{const _0x533cbe=_0x421ee0;if(!SceneManager['isSceneBattle']())return;const _0x3c7eed=$gameTemp[_0x533cbe(0x869)](),_0x1ad167=BattleManager[_0x533cbe(0x548)];_0x1ad167[_0x533cbe(0x6f2)](),_0x3c7eed[_0x533cbe(0x396)](_0x533cbe(0x2cd));}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x89d),_0x167129=>{const _0x15dc1c=_0x421ee0;if(!SceneManager[_0x15dc1c(0x225)]())return;if(!Imported[_0x15dc1c(0x83f)])return;VisuMZ['ConvertParams'](_0x167129,_0x167129);const _0x548499=$gameScreen[_0x15dc1c(0x4c3)]();_0x548499[_0x15dc1c(0x49f)]=_0x167129[_0x15dc1c(0x85b)];}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x622),_0x5830ef=>{const _0x245874=_0x421ee0;if(!SceneManager[_0x245874(0x225)]())return;if(!Imported[_0x245874(0x83f)])return;VisuMZ[_0x245874(0x243)](_0x5830ef,_0x5830ef);const _0x376ecf=$gameTemp[_0x245874(0x869)](),_0x5d201f=_0x5830ef[_0x245874(0x168)];$gameScreen['setBattleCameraPoint'](_0x5830ef[_0x245874(0x1f1)],_0x5830ef[_0x245874(0x6c3)],_0x5830ef[_0x245874(0x76f)],_0x5830ef[_0x245874(0x5f4)]);if(_0x5d201f)_0x376ecf[_0x245874(0x396)](_0x245874(0x882));}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],'ActSeq_Camera_FocusTarget',_0x35819d=>{const _0x4b5440=_0x421ee0;if(!SceneManager[_0x4b5440(0x225)]())return;if(!Imported[_0x4b5440(0x83f)])return;VisuMZ[_0x4b5440(0x243)](_0x35819d,_0x35819d);const _0x5eb17a=$gameTemp[_0x4b5440(0x869)](),_0x847e8b=VisuMZ[_0x4b5440(0x333)](_0x35819d[_0x4b5440(0x8a6)]),_0xbdf4fe=_0x35819d['WaitForCamera'];$gameScreen[_0x4b5440(0x285)](_0x847e8b,_0x35819d[_0x4b5440(0x76f)],_0x35819d[_0x4b5440(0x5f4)]);if(_0xbdf4fe)_0x5eb17a[_0x4b5440(0x396)](_0x4b5440(0x882));}),PluginManager[_0x421ee0(0x6bc)](pluginData['name'],_0x421ee0(0x446),_0x32b660=>{const _0x1729e7=_0x421ee0;if(!SceneManager[_0x1729e7(0x225)]())return;if(!Imported[_0x1729e7(0x83f)])return;VisuMZ[_0x1729e7(0x243)](_0x32b660,_0x32b660);const _0x53dd36=$gameTemp[_0x1729e7(0x869)](),_0x502e5a=_0x32b660[_0x1729e7(0x168)];$gameScreen[_0x1729e7(0x414)](_0x32b660[_0x1729e7(0x41b)],_0x32b660[_0x1729e7(0x275)],_0x32b660[_0x1729e7(0x76f)],_0x32b660['EasingType']);if(_0x502e5a)_0x53dd36['setWaitMode'](_0x1729e7(0x882));}),PluginManager[_0x421ee0(0x6bc)](pluginData['name'],_0x421ee0(0x546),_0x128976=>{const _0x4f6a79=_0x421ee0;if(!SceneManager[_0x4f6a79(0x225)]())return;if(!Imported[_0x4f6a79(0x83f)])return;VisuMZ[_0x4f6a79(0x243)](_0x128976,_0x128976);const _0x391d26=$gameTemp[_0x4f6a79(0x869)](),_0x3c8e9f=_0x128976[_0x4f6a79(0x482)],_0x80340f=_0x128976[_0x4f6a79(0x397)],_0x5b5f15=_0x128976['WaitForCamera'];if(_0x3c8e9f){const _0x260628=Math['round'](Graphics[_0x4f6a79(0x62f)]/0x2),_0xa91fe6=Math['round'](Graphics[_0x4f6a79(0x6b2)]/0x2);$gameScreen['setBattleCameraPoint'](_0x260628,_0xa91fe6,_0x128976[_0x4f6a79(0x76f)],_0x128976['EasingType']);}_0x80340f&&$gameScreen[_0x4f6a79(0x414)](0x0,0x0,_0x128976[_0x4f6a79(0x76f)],_0x128976[_0x4f6a79(0x5f4)]);if(_0x5b5f15)_0x391d26['setWaitMode'](_0x4f6a79(0x882));}),PluginManager[_0x421ee0(0x6bc)](pluginData['name'],_0x421ee0(0x17c),_0x35426b=>{const _0x5250b0=_0x421ee0;if(!SceneManager[_0x5250b0(0x225)]())return;if(!Imported[_0x5250b0(0x83f)])return;const _0x151f1d=$gameTemp[_0x5250b0(0x869)]();if(!_0x151f1d)return;_0x151f1d['setWaitMode']('battleCamera');}),PluginManager['registerCommand'](pluginData['name'],_0x421ee0(0x926),_0x2c1a9e=>{const _0x5c59fd=_0x421ee0;if(!SceneManager[_0x5c59fd(0x225)]())return;if(!Imported['VisuMZ_2_DragonbonesUnion'])return;VisuMZ['ConvertParams'](_0x2c1a9e,_0x2c1a9e);const _0x1cf147=VisuMZ['CreateActionSequenceTargets'](_0x2c1a9e[_0x5c59fd(0x8a6)]),_0x27cab4=_0x2c1a9e[_0x5c59fd(0x8e3)][_0x5c59fd(0x6e1)]()[_0x5c59fd(0x90d)]();for(const _0x110163 of _0x1cf147){if(!_0x110163)continue;_0x110163[_0x5c59fd(0x272)](_0x27cab4);}}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x75b),_0x46d2c4=>{const _0xc9737d=_0x421ee0;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0xc9737d(0x23b)])return;VisuMZ[_0xc9737d(0x243)](_0x46d2c4,_0x46d2c4);const _0x38de73=VisuMZ['CreateActionSequenceTargets'](_0x46d2c4['Targets']),_0x258644=_0x46d2c4[_0xc9737d(0x4dd)];for(const _0x453aa4 of _0x38de73){if(!_0x453aa4)continue;_0x453aa4['dragonbonesData']()['timeScale']=_0x258644;}}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],'ActSeq_Element_AddElements',_0x33985d=>{const _0x1ea005=_0x421ee0;if(!SceneManager[_0x1ea005(0x225)]())return;if(!Imported[_0x1ea005(0x73f)])return;VisuMZ[_0x1ea005(0x243)](_0x33985d,_0x33985d);const _0x4c137a=BattleManager[_0x1ea005(0x823)],_0x13d15f=_0x33985d[_0x1ea005(0x27a)];if(!_0x4c137a)return;_0x4c137a[_0x1ea005(0x42e)]=_0x13d15f;}),PluginManager[_0x421ee0(0x6bc)](pluginData['name'],'ActSeq_Element_Clear',_0x25c50f=>{const _0x536be0=_0x421ee0;if(!SceneManager[_0x536be0(0x225)]())return;if(!Imported[_0x536be0(0x73f)])return;const _0x1cd31b=BattleManager[_0x536be0(0x823)];if(!_0x1cd31b)return;_0x1cd31b[_0x536be0(0x23d)]();}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x875),_0x5b0585=>{const _0x2f6362=_0x421ee0;if(!SceneManager[_0x2f6362(0x225)]())return;if(!Imported[_0x2f6362(0x73f)])return;VisuMZ[_0x2f6362(0x243)](_0x5b0585,_0x5b0585);const _0x167fe8=BattleManager[_0x2f6362(0x823)],_0x2c79ba=_0x5b0585[_0x2f6362(0x27a)];if(!_0x167fe8)return;_0x167fe8[_0x2f6362(0x27d)]=_0x2c79ba;}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x4d9),_0x15ff84=>{const _0x58cf23=_0x421ee0;if(!SceneManager[_0x58cf23(0x225)]())return;if(!Imported[_0x58cf23(0x73f)])return;const _0x2ea349=BattleManager[_0x58cf23(0x823)];if(!_0x2ea349)return;_0x2ea349[_0x58cf23(0x1e9)]=!![];}),PluginManager['registerCommand'](pluginData['name'],_0x421ee0(0x17d),_0x54926d=>{const _0x5c84bc=_0x421ee0;if(!Imported[_0x5c84bc(0x73a)])return;if(!SceneManager[_0x5c84bc(0x225)]())return;VisuMZ[_0x5c84bc(0x243)](_0x54926d,_0x54926d);const _0x1f4389=VisuMZ['CreateActionSequenceTargets'](_0x54926d[_0x5c84bc(0x8a6)]);for(const _0x519fe7 of _0x1f4389){if(!_0x519fe7)continue;_0x519fe7['removeHorrorEffect'](_0x5c84bc(0x8df)),_0x519fe7[_0x5c84bc(0x4a1)]('glitch'),_0x519fe7[_0x5c84bc(0x4a1)]('tv'),_0x519fe7[_0x5c84bc(0x535)]();}$gamePlayer[_0x5c84bc(0x214)]();}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],'ActSeq_Horror_GlitchCreate',_0x3c8e41=>{const _0x4f2795=_0x421ee0;if(!Imported[_0x4f2795(0x73a)])return;if(!SceneManager[_0x4f2795(0x225)]())return;VisuMZ[_0x4f2795(0x243)](_0x3c8e41,_0x3c8e41);const _0x309c9a=VisuMZ['CreateActionSequenceTargets'](_0x3c8e41['Targets']),_0x5321b7='glitch';_0x3c8e41['sliceMin']=Math[_0x4f2795(0x1d9)](_0x3c8e41['slices']/0x2),_0x3c8e41[_0x4f2795(0x293)]=_0x3c8e41[_0x4f2795(0x543)],_0x3c8e41[_0x4f2795(0x567)]=!![];for(const _0x155f33 of _0x309c9a){if(!_0x155f33)continue;_0x155f33['setHorrorEffectSettings'](_0x5321b7,_0x3c8e41);}$gamePlayer[_0x4f2795(0x214)]();}),PluginManager['registerCommand'](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x4ea),_0x28f8f1=>{const _0x26c463=_0x421ee0;if(!Imported[_0x26c463(0x73a)])return;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x26c463(0x243)](_0x28f8f1,_0x28f8f1);const _0x3dd8a7=VisuMZ['CreateActionSequenceTargets'](_0x28f8f1['Targets']);for(const _0x182077 of _0x3dd8a7){if(!_0x182077)continue;_0x182077[_0x26c463(0x4a1)]('glitch');}$gamePlayer['refresh']();}),PluginManager['registerCommand'](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x6e3),_0x179ca6=>{const _0x5a1c7b=_0x421ee0;if(!Imported[_0x5a1c7b(0x73a)])return;if(!SceneManager[_0x5a1c7b(0x225)]())return;VisuMZ[_0x5a1c7b(0x243)](_0x179ca6,_0x179ca6);const _0x4124e0=VisuMZ['CreateActionSequenceTargets'](_0x179ca6[_0x5a1c7b(0x8a6)]),_0x1fc4b9=_0x5a1c7b(0x8df);for(const _0x26676b of _0x4124e0){if(!_0x26676b)continue;_0x26676b[_0x5a1c7b(0x613)](_0x1fc4b9,_0x179ca6);}$gamePlayer[_0x5a1c7b(0x214)]();}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x48a),_0x57734e=>{const _0x2c134c=_0x421ee0;if(!Imported[_0x2c134c(0x73a)])return;if(!SceneManager[_0x2c134c(0x225)]())return;VisuMZ[_0x2c134c(0x243)](_0x57734e,_0x57734e);const _0x469663=VisuMZ[_0x2c134c(0x333)](_0x57734e['Targets']);for(const _0x5790b7 of _0x469663){if(!_0x5790b7)continue;_0x5790b7[_0x2c134c(0x4a1)](_0x2c134c(0x8df));}$gamePlayer[_0x2c134c(0x214)]();}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x36d),_0x19721f=>{const _0x247d0f=_0x421ee0;if(!Imported[_0x247d0f(0x73a)])return;if(!SceneManager[_0x247d0f(0x225)]())return;VisuMZ[_0x247d0f(0x243)](_0x19721f,_0x19721f);const _0x365271=VisuMZ[_0x247d0f(0x333)](_0x19721f[_0x247d0f(0x8a6)]),_0x2aa53e='tv';for(const _0x2b8cc9 of _0x365271){if(!_0x2b8cc9)continue;_0x2b8cc9[_0x247d0f(0x613)](_0x2aa53e,_0x19721f);}$gamePlayer[_0x247d0f(0x214)]();}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x4a8),_0x3a1a23=>{const _0x2f4ede=_0x421ee0;if(!Imported[_0x2f4ede(0x73a)])return;if(!SceneManager[_0x2f4ede(0x225)]())return;VisuMZ[_0x2f4ede(0x243)](_0x3a1a23,_0x3a1a23);const _0x21b9b6=VisuMZ['CreateActionSequenceTargets'](_0x3a1a23[_0x2f4ede(0x8a6)]);for(const _0x2df044 of _0x21b9b6){if(!_0x2df044)continue;_0x2df044[_0x2f4ede(0x4a1)]('tv');}$gamePlayer['refresh']();}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x642),_0xcbacc8=>{const _0x32454b=_0x421ee0;if(!SceneManager[_0x32454b(0x225)]())return;if(!Imported[_0x32454b(0x471)])return;const _0x215cd5=SceneManager[_0x32454b(0x855)]['_spriteset'];if(!_0x215cd5)return;VisuMZ[_0x32454b(0x243)](_0xcbacc8,_0xcbacc8);const _0x2b3d07=_0xcbacc8['Intensity']||0x1,_0x3272b2=_0xcbacc8['Duration']||0x1,_0x623e5=_0xcbacc8[_0x32454b(0x5f4)]||'Linear';_0x215cd5['setupRgbSplitImpactFilter'](_0x2b3d07,_0x3272b2,_0x623e5);}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],'ActSeq_Impact_MotionBlurScreen',_0x2a68fd=>{const _0x3b2540=_0x421ee0;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x3b2540(0x471)])return;const _0x1f9760=SceneManager[_0x3b2540(0x855)]['_spriteset'];if(!_0x1f9760)return;VisuMZ[_0x3b2540(0x243)](_0x2a68fd,_0x2a68fd);const _0x15b6c5=Number(_0x2a68fd[_0x3b2540(0x78b)])||0x0,_0x337350=Number(_0x2a68fd['Rate']),_0xf15e90=_0x2a68fd['Duration']||0x1,_0x3a99b2=_0x2a68fd['EasingType']||_0x3b2540(0x363);_0x1f9760[_0x3b2540(0x8da)](_0x15b6c5,_0x337350,_0xf15e90,_0x3a99b2);}),PluginManager['registerCommand'](pluginData[_0x421ee0(0x4ec)],'ActSeq_Impact_MotionBlurTarget',_0x571fcc=>{const _0x5db98e=_0x421ee0;if(!SceneManager[_0x5db98e(0x225)]())return;if(!Imported[_0x5db98e(0x471)])return;const _0x2bf1f0=SceneManager[_0x5db98e(0x855)][_0x5db98e(0x6c2)];if(!_0x2bf1f0)return;VisuMZ[_0x5db98e(0x243)](_0x571fcc,_0x571fcc);const _0x312cdf=Number(_0x571fcc[_0x5db98e(0x78b)])||0x0,_0x328cc5=Number(_0x571fcc[_0x5db98e(0x282)]),_0x295c4e=_0x571fcc[_0x5db98e(0x76f)]||0x1,_0xcf2444=_0x571fcc[_0x5db98e(0x5f4)]||_0x5db98e(0x363),_0x12e9f1=VisuMZ[_0x5db98e(0x333)](_0x571fcc[_0x5db98e(0x8a6)]);for(const _0x4d88e0 of _0x12e9f1){if(!_0x4d88e0)continue;if(!_0x4d88e0[_0x5db98e(0x35a)]())continue;_0x4d88e0[_0x5db98e(0x35a)]()['setupMotionBlurImpactFilter'](_0x312cdf,_0x328cc5,_0x295c4e,_0xcf2444);}}),PluginManager[_0x421ee0(0x6bc)](pluginData['name'],_0x421ee0(0x391),_0x539316=>{const _0x33305f=_0x421ee0;if(!SceneManager[_0x33305f(0x225)]())return;if(!Imported['VisuMZ_3_ActSeqImpact'])return;VisuMZ[_0x33305f(0x243)](_0x539316,_0x539316);const _0x1ca4d5={'delay':_0x539316[_0x33305f(0x298)],'duration':_0x539316[_0x33305f(0x2c1)],'hue':_0x539316[_0x33305f(0x280)],'opacityStart':_0x539316[_0x33305f(0x41f)],'tone':_0x539316['tone'],'visible':!![]},_0xf889f5=VisuMZ[_0x33305f(0x333)](_0x539316[_0x33305f(0x8a6)]);for(const _0x58f581 of _0xf889f5){if(!_0x58f581)continue;_0x58f581[_0x33305f(0x8a9)](_0x1ca4d5);}}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],'ActSeq_Impact_MotionTrailRemove',_0x2466e0=>{const _0x451c3c=_0x421ee0;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x451c3c(0x471)])return;VisuMZ[_0x451c3c(0x243)](_0x2466e0,_0x2466e0);const _0x1cdafd=VisuMZ[_0x451c3c(0x333)](_0x2466e0['Targets']);for(const _0x4b9e11 of _0x1cdafd){if(!_0x4b9e11)continue;_0x4b9e11[_0x451c3c(0x8c8)]();}}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],'ActSeq_Impact_ShockwavePoint',_0x27e1ee=>{const _0x4c3303=_0x421ee0;if(!Imported['VisuMZ_3_ActSeqImpact'])return;const _0x4038c3=SceneManager[_0x4c3303(0x855)]['_spriteset'];if(!_0x4038c3)return;VisuMZ['ConvertParams'](_0x27e1ee,_0x27e1ee);const _0x3d68fe=_0x27e1ee['X']||0x0,_0x1b9fbf=_0x27e1ee['Y']||0x0,_0xae4709=_0x27e1ee['Amp']||0x0,_0x502c76=_0x27e1ee['Wave']||0x0,_0x295f6d=_0x27e1ee['Duration']||0x1;_0x4038c3[_0x4c3303(0x5f8)](_0x3d68fe,_0x1b9fbf,_0xae4709,_0x502c76,_0x295f6d);}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x420),_0x289d72=>{const _0x81d44b=_0x421ee0;if(!SceneManager[_0x81d44b(0x225)]())return;if(!Imported[_0x81d44b(0x471)])return;const _0x3c6df3=SceneManager[_0x81d44b(0x855)]['_spriteset'];if(!_0x3c6df3)return;VisuMZ['ConvertParams'](_0x289d72,_0x289d72);const _0x2f6dc2=VisuMZ['CreateActionSequenceTargets'](_0x289d72[_0x81d44b(0x8a6)]),_0x3f8df6=_0x289d72['TargetLocation'],_0x3b5744=_0x289d72[_0x81d44b(0x41b)]||0x0,_0x3b5347=_0x289d72[_0x81d44b(0x275)]||0x0,_0x3eccd4=_0x289d72[_0x81d44b(0x283)]||0x0,_0x4d2994=_0x289d72[_0x81d44b(0x8d2)]||0x0,_0x55d19e=_0x289d72[_0x81d44b(0x76f)]||0x1;for(const _0x50e427 of _0x2f6dc2){if(!_0x50e427)continue;if(!_0x50e427[_0x81d44b(0x35a)]())continue;const _0x4843dc=_0x50e427[_0x81d44b(0x35a)]();let _0x5abb38=_0x4843dc[_0x81d44b(0x923)],_0x571fab=_0x4843dc[_0x81d44b(0x88b)];_0x5abb38+=(Graphics[_0x81d44b(0x62f)]-Graphics[_0x81d44b(0x733)])/0x2,_0x571fab+=(Graphics[_0x81d44b(0x6b2)]-Graphics['boxHeight'])/0x2;if(_0x3f8df6[_0x81d44b(0x5f2)](/front/i))_0x5abb38+=(_0x50e427[_0x81d44b(0x84c)]()?0x1:-0x1)*_0x4843dc['mainSpriteWidth']()/0x2;else _0x3f8df6['match'](/back/i)&&(_0x5abb38+=(_0x50e427['isEnemy']()?-0x1:0x1)*_0x4843dc[_0x81d44b(0x315)]()/0x2);if(_0x3f8df6['match'](/head/i))_0x571fab-=_0x4843dc[_0x81d44b(0x276)]();else _0x3f8df6[_0x81d44b(0x5f2)](/center/i)&&(_0x571fab-=_0x4843dc[_0x81d44b(0x276)]()/0x2);_0x5abb38+=_0x3b5744,_0x571fab+=_0x3b5347,_0x3c6df3[_0x81d44b(0x5f8)](_0x5abb38,_0x571fab,_0x3eccd4,_0x4d2994,_0x55d19e);}}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x5eb),_0x1d39d8=>{const _0x48e8bb=_0x421ee0;if(!SceneManager[_0x48e8bb(0x225)]())return;if(!Imported[_0x48e8bb(0x471)])return;const _0x1a6ed4=SceneManager[_0x48e8bb(0x855)]['_spriteset'];if(!_0x1a6ed4)return;VisuMZ['ConvertParams'](_0x1d39d8,_0x1d39d8);const _0x58983f=VisuMZ[_0x48e8bb(0x333)](_0x1d39d8[_0x48e8bb(0x8a6)]),_0x409cb8=_0x1d39d8['TargetLocation'],_0x49acfc=_0x1d39d8[_0x48e8bb(0x41b)]||0x0,_0x31567c=_0x1d39d8[_0x48e8bb(0x275)]||0x0,_0x54c5ef=_0x1d39d8[_0x48e8bb(0x283)]||0x0,_0x52468e=_0x1d39d8['Wave']||0x0,_0x2c477a=_0x1d39d8[_0x48e8bb(0x76f)]||0x1,_0x2bccd3=Math[_0x48e8bb(0x72a)](..._0x58983f[_0x48e8bb(0x1b6)](_0x177cd4=>_0x177cd4[_0x48e8bb(0x35a)]()['_baseX']-_0x177cd4[_0x48e8bb(0x35a)]()[_0x48e8bb(0x315)]()/0x2)),_0x47afa1=Math[_0x48e8bb(0x8aa)](..._0x58983f['map'](_0x3b5582=>_0x3b5582[_0x48e8bb(0x35a)]()['_baseX']+_0x3b5582[_0x48e8bb(0x35a)]()['mainSpriteWidth']()/0x2)),_0x506dce=Math['min'](..._0x58983f[_0x48e8bb(0x1b6)](_0x2afced=>_0x2afced[_0x48e8bb(0x35a)]()[_0x48e8bb(0x88b)]-_0x2afced[_0x48e8bb(0x35a)]()[_0x48e8bb(0x276)]())),_0x3f835a=Math[_0x48e8bb(0x8aa)](..._0x58983f[_0x48e8bb(0x1b6)](_0x2b8e58=>_0x2b8e58[_0x48e8bb(0x35a)]()[_0x48e8bb(0x88b)])),_0x9dc393=_0x58983f[_0x48e8bb(0x7ad)](_0x3c8bd8=>_0x3c8bd8[_0x48e8bb(0x6da)]())[_0x48e8bb(0x4be)],_0x3f7415=_0x58983f[_0x48e8bb(0x7ad)](_0x153020=>_0x153020[_0x48e8bb(0x84c)]())['length'];let _0x245c66=0x0,_0x27c482=0x0;if(_0x409cb8[_0x48e8bb(0x5f2)](/front/i))_0x245c66=_0x9dc393>=_0x3f7415?_0x2bccd3:_0x47afa1;else{if(_0x409cb8[_0x48e8bb(0x5f2)](/middle/i))_0x245c66=(_0x2bccd3+_0x47afa1)/0x2,melee=-0x1;else _0x409cb8['match'](/back/i)&&(_0x245c66=_0x9dc393>=_0x3f7415?_0x47afa1:_0x2bccd3);}if(_0x409cb8[_0x48e8bb(0x5f2)](/head/i))_0x27c482=_0x506dce;else{if(_0x409cb8[_0x48e8bb(0x5f2)](/center/i))_0x27c482=(_0x506dce+_0x3f835a)/0x2;else _0x409cb8[_0x48e8bb(0x5f2)](/base/i)&&(_0x27c482=_0x3f835a);}_0x245c66+=(Graphics[_0x48e8bb(0x62f)]-Graphics[_0x48e8bb(0x733)])/0x2,_0x27c482+=(Graphics[_0x48e8bb(0x6b2)]-Graphics[_0x48e8bb(0x53d)])/0x2,_0x245c66+=_0x49acfc,_0x27c482+=_0x31567c,_0x1a6ed4[_0x48e8bb(0x5f8)](_0x245c66,_0x27c482,_0x54c5ef,_0x52468e,_0x2c477a);}),PluginManager['registerCommand'](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x268),_0x2448aa=>{const _0x5f451d=_0x421ee0;if(!Imported[_0x5f451d(0x471)])return;const _0x5223a9=SceneManager[_0x5f451d(0x855)]['_spriteset'];if(!_0x5223a9)return;VisuMZ['ConvertParams'](_0x2448aa,_0x2448aa);const _0x53aa44=_0x2448aa['X']||0x0,_0x37c1e0=_0x2448aa['Y']||0x0,_0x1f9f1d=_0x2448aa[_0x5f451d(0x791)]||0x0,_0x517c35=_0x2448aa[_0x5f451d(0x632)]||0x0,_0x1d6c28=_0x2448aa[_0x5f451d(0x76f)]||0x1,_0x2d9d95=_0x2448aa[_0x5f451d(0x5f4)]||'Linear';_0x5223a9[_0x5f451d(0x532)](_0x1f9f1d,_0x53aa44,_0x37c1e0,_0x517c35,_0x1d6c28,_0x2d9d95);}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x706),_0x576fe8=>{const _0xcdd2e3=_0x421ee0;if(!Imported[_0xcdd2e3(0x471)])return;const _0x54b56a=SceneManager[_0xcdd2e3(0x855)][_0xcdd2e3(0x6c2)];if(!_0x54b56a)return;VisuMZ['ConvertParams'](_0x576fe8,_0x576fe8);const _0x59242c=VisuMZ[_0xcdd2e3(0x333)](_0x576fe8[_0xcdd2e3(0x8a6)]),_0x3c316c=_0x576fe8[_0xcdd2e3(0x1c2)],_0xcb0c1d=_0x576fe8[_0xcdd2e3(0x41b)]||0x0,_0x2efbb4=_0x576fe8[_0xcdd2e3(0x275)]||0x0,_0x374909=_0x576fe8[_0xcdd2e3(0x791)]||0x0,_0x1ea894=_0x576fe8[_0xcdd2e3(0x632)]||0x0,_0x1db386=_0x576fe8[_0xcdd2e3(0x76f)]||0x1,_0xefa3b9=_0x576fe8[_0xcdd2e3(0x5f4)]||_0xcdd2e3(0x363),_0x2e0b1a=Math[_0xcdd2e3(0x72a)](..._0x59242c['map'](_0x4e92d8=>_0x4e92d8[_0xcdd2e3(0x35a)]()[_0xcdd2e3(0x923)]-_0x4e92d8[_0xcdd2e3(0x35a)]()[_0xcdd2e3(0x315)]()/0x2)),_0x4abb88=Math[_0xcdd2e3(0x8aa)](..._0x59242c[_0xcdd2e3(0x1b6)](_0x27e0c2=>_0x27e0c2[_0xcdd2e3(0x35a)]()['_baseX']+_0x27e0c2[_0xcdd2e3(0x35a)]()[_0xcdd2e3(0x315)]()/0x2)),_0x410fc0=Math[_0xcdd2e3(0x72a)](..._0x59242c[_0xcdd2e3(0x1b6)](_0x1df3fd=>_0x1df3fd[_0xcdd2e3(0x35a)]()[_0xcdd2e3(0x88b)]-_0x1df3fd['battler']()[_0xcdd2e3(0x276)]())),_0xeeb21=Math[_0xcdd2e3(0x8aa)](..._0x59242c[_0xcdd2e3(0x1b6)](_0x5db373=>_0x5db373[_0xcdd2e3(0x35a)]()[_0xcdd2e3(0x88b)])),_0x1a563a=_0x59242c['filter'](_0xe25f7f=>_0xe25f7f[_0xcdd2e3(0x6da)]())[_0xcdd2e3(0x4be)],_0x19e8fc=_0x59242c['filter'](_0x2f65aa=>_0x2f65aa[_0xcdd2e3(0x84c)]())['length'];let _0x211d3d=0x0,_0x597144=0x0;if(_0x3c316c[_0xcdd2e3(0x5f2)](/front/i))_0x211d3d=_0x1a563a>=_0x19e8fc?_0x2e0b1a:_0x4abb88;else{if(_0x3c316c['match'](/middle/i))_0x211d3d=(_0x2e0b1a+_0x4abb88)/0x2,melee=-0x1;else _0x3c316c[_0xcdd2e3(0x5f2)](/back/i)&&(_0x211d3d=_0x1a563a>=_0x19e8fc?_0x4abb88:_0x2e0b1a);}if(_0x3c316c[_0xcdd2e3(0x5f2)](/head/i))_0x597144=_0x410fc0;else{if(_0x3c316c[_0xcdd2e3(0x5f2)](/center/i))_0x597144=(_0x410fc0+_0xeeb21)/0x2;else _0x3c316c[_0xcdd2e3(0x5f2)](/base/i)&&(_0x597144=_0xeeb21);}_0x211d3d+=(Graphics[_0xcdd2e3(0x62f)]-Graphics[_0xcdd2e3(0x733)])/0x2,_0x597144+=(Graphics[_0xcdd2e3(0x6b2)]-Graphics['boxHeight'])/0x2,_0x211d3d+=_0xcb0c1d,_0x597144+=_0x2efbb4,_0x54b56a[_0xcdd2e3(0x532)](_0x374909,_0x211d3d,_0x597144,_0x1ea894,_0x1db386,_0xefa3b9);}),PluginManager['registerCommand'](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x4e1),_0x356e24=>{const _0x184ce4=_0x421ee0;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x184ce4(0x243)](_0x356e24,_0x356e24);const _0x567d11=$gameTemp[_0x184ce4(0x869)](),_0x316245=BattleManager[_0x184ce4(0x823)],_0xc04415=BattleManager[_0x184ce4(0x562)],_0x20dd2b=BattleManager['_logWindow'];if(!_0x567d11||!_0x316245||!_0xc04415)return;if(!_0x316245[_0x184ce4(0x8f0)]())return;const _0xe683be=VisuMZ[_0x184ce4(0x333)](_0x356e24['Targets']);for(const _0x457ce1 of _0xe683be){if(!_0x457ce1)continue;_0x20dd2b[_0x184ce4(0x7b3)](_0x184ce4(0x7f5),_0xc04415,_0x457ce1);}_0x567d11['setWaitMode'](_0x184ce4(0x2cd));}),PluginManager['registerCommand'](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x732),_0x1eeb00=>{const _0x1e82bd=_0x421ee0;if(!SceneManager[_0x1e82bd(0x225)]())return;VisuMZ[_0x1e82bd(0x243)](_0x1eeb00,_0x1eeb00);const _0xac6bfc=['MAXHP',_0x1e82bd(0x764),'ATK',_0x1e82bd(0x4ca),_0x1e82bd(0x2f6),_0x1e82bd(0x296),_0x1e82bd(0x837),_0x1e82bd(0x813)],_0x14f78a=_0x1eeb00[_0x1e82bd(0x48e)],_0xe4f9f7=_0x1eeb00[_0x1e82bd(0x90b)],_0x176d22=_0x1eeb00[_0x1e82bd(0x3d1)],_0x1f7faf=VisuMZ[_0x1e82bd(0x333)](_0x1eeb00[_0x1e82bd(0x8a6)]);for(const _0x351d96 of _0x1f7faf){if(!_0x351d96)continue;for(const _0x4f0f37 of _0x14f78a){const _0x35b8ea=_0xac6bfc[_0x1e82bd(0x19a)](_0x4f0f37[_0x1e82bd(0x890)]()[_0x1e82bd(0x90d)]());_0x35b8ea>=0x0&&_0x35b8ea<=0x7&&_0x351d96[_0x1e82bd(0x4a0)](_0x35b8ea,_0x176d22);}for(const _0x2cbeab of _0xe4f9f7){const _0x463e37=_0xac6bfc[_0x1e82bd(0x19a)](_0x2cbeab[_0x1e82bd(0x890)]()[_0x1e82bd(0x90d)]());_0x463e37>=0x0&&_0x463e37<=0x7&&_0x351d96[_0x1e82bd(0x470)](_0x463e37,_0x176d22);}}}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x916),_0x40b81f=>{const _0x27d843=_0x421ee0;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x27d843(0x243)](_0x40b81f,_0x40b81f);const _0x112a55=_0x40b81f[_0x27d843(0x26e)],_0x3d6dc5=VisuMZ['CreateActionSequenceTargets'](_0x40b81f[_0x27d843(0x8a6)]);for(const _0x4f1741 of _0x3d6dc5){if(!_0x4f1741)continue;for(const _0x337496 of _0x112a55){_0x4f1741[_0x27d843(0x624)](_0x337496);}}}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x2f9),_0x560cc4=>{const _0x25c754=_0x421ee0;if(!SceneManager[_0x25c754(0x225)]())return;VisuMZ[_0x25c754(0x243)](_0x560cc4,_0x560cc4);const _0x13eb00=BattleManager[_0x25c754(0x823)],_0x10d8b2={'arPenRate':_0x560cc4[_0x25c754(0x582)],'arPenFlat':_0x560cc4[_0x25c754(0x781)],'arRedRate':_0x560cc4[_0x25c754(0x852)],'arRedFlat':_0x560cc4[_0x25c754(0x8e4)]};_0x13eb00[_0x25c754(0x1d8)]=_0x10d8b2;}),PluginManager['registerCommand'](pluginData[_0x421ee0(0x4ec)],'ActSeq_Mechanics_AnalyzeWeakness',_0x23ef4c=>{const _0x49f7a9=_0x421ee0;if(!SceneManager[_0x49f7a9(0x225)]())return;VisuMZ[_0x49f7a9(0x243)](_0x23ef4c,_0x23ef4c);const _0x4d26a5=VisuMZ[_0x49f7a9(0x333)](_0x23ef4c[_0x49f7a9(0x8a6)]),_0x4ffa2c=_0x23ef4c['Reveal']||0x1;for(const _0x2312be of _0x4d26a5){if(!_0x2312be)continue;if(!_0x2312be[_0x49f7a9(0x84c)]())continue;_0x2312be[_0x49f7a9(0x81b)](_0x4ffa2c);}}),PluginManager['registerCommand'](pluginData['name'],_0x421ee0(0x626),_0x3d6420=>{const _0x45755c=_0x421ee0;if(!SceneManager[_0x45755c(0x225)]())return;if(!Imported[_0x45755c(0x6d7)])return;VisuMZ[_0x45755c(0x243)](_0x3d6420,_0x3d6420);const _0x3eeccd=VisuMZ[_0x45755c(0x333)](_0x3d6420['Targets']),_0x1c723d=_0x3d6420['ChargeRate'],_0x80a4ef=_0x3d6420[_0x45755c(0x502)],_0x1cfd44=_0x3d6420[_0x45755c(0x611)];for(const _0x5598b7 of _0x3eeccd){if(!_0x5598b7)continue;if(_0x5598b7['isAtbChargingState']())_0x5598b7['changeAtbChargeTime'](_0x1c723d);else{if(_0x5598b7[_0x45755c(0x7e1)]()){_0x5598b7[_0x45755c(0x2fa)](_0x80a4ef);if(_0x1cfd44)_0x5598b7[_0x45755c(0x648)]();}}}}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],'ActSeq_Mechanics_BoostPointsChange',_0xba450d=>{const _0x38a229=_0x421ee0;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x38a229(0x3f3)])return;VisuMZ[_0x38a229(0x243)](_0xba450d,_0xba450d);const _0x39e7d0=VisuMZ[_0x38a229(0x333)](_0xba450d[_0x38a229(0x8a6)]),_0xe7247e=_0xba450d[_0x38a229(0x469)];for(const _0x389e1f of _0x39e7d0){if(!_0x389e1f)continue;_0x389e1f[_0x38a229(0x862)](_0xe7247e);}}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x5fd),_0x1c1276=>{const _0x1d27a7=_0x421ee0;if(!SceneManager[_0x1d27a7(0x225)]())return;if(!Imported[_0x1d27a7(0x3f3)])return;if(!BattleManager[_0x1d27a7(0x562)])return;VisuMZ[_0x1d27a7(0x243)](_0x1c1276,_0x1c1276);const _0x136403=_0x1c1276[_0x1d27a7(0x3f8)];$gameVariables[_0x1d27a7(0x679)](_0x136403,BattleManager[_0x1d27a7(0x562)][_0x1d27a7(0x42a)]());}),PluginManager[_0x421ee0(0x6bc)](pluginData['name'],_0x421ee0(0x640),_0x376f83=>{const _0x4b3ca3=_0x421ee0;if(!SceneManager[_0x4b3ca3(0x225)]())return;if(!Imported[_0x4b3ca3(0x744)])return;VisuMZ[_0x4b3ca3(0x243)](_0x376f83,_0x376f83);const _0x357d67=VisuMZ[_0x4b3ca3(0x333)](_0x376f83['Targets']),_0xbd9237=_0x376f83[_0x4b3ca3(0x3bf)];for(const _0x412874 of _0x357d67){if(!_0x412874)continue;if(_0x412874[_0x4b3ca3(0x72f)]())continue;if(!_0x412874[_0x4b3ca3(0x518)]())continue;_0x412874[_0x4b3ca3(0x307)](_0xbd9237);}}),PluginManager[_0x421ee0(0x6bc)](pluginData['name'],_0x421ee0(0x493),_0x14639e=>{const _0x421afe=_0x421ee0;if(!SceneManager[_0x421afe(0x225)]())return;if(!Imported['VisuMZ_4_BreakShields'])return;VisuMZ['ConvertParams'](_0x14639e,_0x14639e);const _0x5de3ab=VisuMZ[_0x421afe(0x333)](_0x14639e[_0x421afe(0x8a6)]);for(const _0x720c7c of _0x5de3ab){if(!_0x720c7c)continue;if(_0x720c7c[_0x421afe(0x72f)]())continue;if(!_0x720c7c[_0x421afe(0x518)]())continue;_0x720c7c['resetBreakShield']();}}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x677),_0x102c1b=>{const _0x4eda07=_0x421ee0;if(!SceneManager[_0x4eda07(0x225)]())return;if(!Imported[_0x4eda07(0x437)])return;VisuMZ[_0x4eda07(0x243)](_0x102c1b,_0x102c1b);const _0x32e3a0=VisuMZ[_0x4eda07(0x333)](_0x102c1b[_0x4eda07(0x8a6)]),_0x5dd4de=_0x102c1b[_0x4eda07(0x6d1)];for(const _0x2bfdaf of _0x32e3a0){if(!_0x2bfdaf)continue;_0x2bfdaf['gainBravePoints'](_0x5dd4de);}}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x4b3),_0x5b25c8=>{const _0x3311c1=_0x421ee0;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x3311c1(0x243)](_0x5b25c8,_0x5b25c8);const _0x4ac929=$gameTemp[_0x3311c1(0x869)](),_0x2111be=BattleManager[_0x3311c1(0x823)],_0x1c90f6=BattleManager[_0x3311c1(0x562)];if(!_0x4ac929||!_0x2111be||!_0x1c90f6)return;if(!_0x2111be[_0x3311c1(0x8f0)]())return;const _0x420a=VisuMZ[_0x3311c1(0x333)](_0x5b25c8['Targets']);for(const _0x13979f of _0x420a){if(!_0x13979f)continue;_0x5b25c8[_0x3311c1(0x4b5)]&&(_0x13979f['removeImmortal'](),_0x13979f[_0x3311c1(0x624)](_0x13979f[_0x3311c1(0x6c5)]())),_0x13979f[_0x3311c1(0x477)]()&&_0x13979f[_0x3311c1(0x4ff)]();}_0x4ac929[_0x3311c1(0x396)](_0x3311c1(0x4aa));}),PluginManager[_0x421ee0(0x6bc)](pluginData['name'],_0x421ee0(0x8be),_0x4d2b86=>{const _0x185e31=_0x421ee0;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x185e31(0x21c)])return;VisuMZ[_0x185e31(0x243)](_0x4d2b86,_0x4d2b86);const _0x302d91=VisuMZ[_0x185e31(0x333)](_0x4d2b86[_0x185e31(0x8a6)]),_0xb34a60=_0x4d2b86['ChangeOrderBy'];for(const _0x328deb of _0x302d91){if(!_0x328deb)continue;_0x328deb[_0x185e31(0x4c1)](_0xb34a60);}}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x35f),_0x2470d6=>{const _0xa693d2=_0x421ee0;if(!SceneManager[_0xa693d2(0x225)]())return;if(!Imported[_0xa693d2(0x21c)])return;VisuMZ[_0xa693d2(0x243)](_0x2470d6,_0x2470d6);const _0x118c02=VisuMZ[_0xa693d2(0x333)](_0x2470d6[_0xa693d2(0x8a6)]),_0x42b378=_0x2470d6[_0xa693d2(0x502)],_0x5cb96e=_0x2470d6[_0xa693d2(0x502)];for(const _0x3bf622 of _0x118c02){if(!_0x3bf622)continue;if(_0x3bf622['_tpbState']===_0xa693d2(0x206))_0x3bf622['changeCtbChargeTime'](_0x42b378);else _0x3bf622[_0xa693d2(0x6a9)]==='casting'&&_0x3bf622['changeCtbCastTime'](_0x5cb96e);}}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x433),_0x4201d4=>{const _0x5bb0f6=_0x421ee0;if(!SceneManager[_0x5bb0f6(0x225)]())return;VisuMZ['ConvertParams'](_0x4201d4,_0x4201d4);const _0x2a3fa8=BattleManager[_0x5bb0f6(0x823)];if(!_0x2a3fa8)return;let _0x425f30=_0x4201d4[_0x5bb0f6(0x814)];_0x2a3fa8[_0x5bb0f6(0x1f4)](_0x425f30);}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x757),_0x30f7be=>{const _0x5ad1c2=_0x421ee0;if(!SceneManager[_0x5ad1c2(0x225)]())return;VisuMZ[_0x5ad1c2(0x243)](_0x30f7be,_0x30f7be);const _0x4fadd5=VisuMZ[_0x5ad1c2(0x333)](_0x30f7be['Targets']);for(const _0x544e14 of _0x4fadd5){if(!_0x544e14)continue;if(_0x544e14[_0x5ad1c2(0x36f)]())_0x544e14[_0x5ad1c2(0x709)]();}}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],'ActSeq_Mechanics_DeathBreak',_0x50adbe=>{const _0x34bc5a=_0x421ee0;if(!SceneManager[_0x34bc5a(0x225)]())return;VisuMZ[_0x34bc5a(0x243)](_0x50adbe,_0x50adbe);const _0x31517c=$gameTemp[_0x34bc5a(0x869)](),_0x225042=BattleManager['_subject'],_0x1aeadc=_0x50adbe[_0x34bc5a(0x200)];if(!_0x31517c)return;if(!_0x225042)return;_0x225042&&_0x225042[_0x34bc5a(0x2ac)]()&&_0x1aeadc[_0x34bc5a(0x890)]()[_0x34bc5a(0x90d)]()!=='UNTITLED'&&_0x31517c[_0x34bc5a(0x92f)]([_0x1aeadc]);}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],'ActSeq_Mechanics_FtbAction',_0x199bb7=>{const _0x340c64=_0x421ee0;if(!SceneManager[_0x340c64(0x225)]())return;if(!Imported['VisuMZ_2_BattleSystemFTB'])return;VisuMZ[_0x340c64(0x243)](_0x199bb7,_0x199bb7);const _0x436347=_0x199bb7[_0x340c64(0x30d)];BattleManager[_0x340c64(0x562)]&&BattleManager[_0x340c64(0x562)][_0x340c64(0x178)]()[_0x340c64(0x7e5)](_0x436347);}),PluginManager[_0x421ee0(0x6bc)](pluginData['name'],_0x421ee0(0x6e5),_0x20ed49=>{const _0x1712ad=_0x421ee0;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x1712ad(0x243)](_0x20ed49,_0x20ed49);const _0x530102=VisuMZ[_0x1712ad(0x333)](_0x20ed49['Targets']),_0x538a16=_0x20ed49[_0x1712ad(0x665)],_0x2c6650=_0x20ed49[_0x1712ad(0x75f)],_0x13acae=_0x20ed49[_0x1712ad(0x91f)],_0x140854=_0x20ed49['MP_Flat'],_0x296e96=_0x20ed49[_0x1712ad(0x74e)],_0x5906b5=_0x20ed49[_0x1712ad(0x1a4)],_0xe49707=_0x20ed49[_0x1712ad(0x54c)];for(const _0x3bca58 of _0x530102){if(!_0x3bca58)continue;const _0x25b984=_0x3bca58[_0x1712ad(0x5bf)](),_0x38eb56=Math[_0x1712ad(0x38a)](_0x538a16*_0x3bca58['mhp']+_0x2c6650),_0x276ec1=Math[_0x1712ad(0x38a)](_0x13acae*_0x3bca58[_0x1712ad(0x833)]+_0x140854),_0x87e91d=Math[_0x1712ad(0x38a)](_0x296e96*_0x3bca58[_0x1712ad(0x204)]()+_0x5906b5);if(_0x38eb56!==0x0)_0x3bca58[_0x1712ad(0x78c)](_0x38eb56);if(_0x276ec1!==0x0)_0x3bca58[_0x1712ad(0x4ad)](_0x276ec1);if(_0x87e91d!==0x0)_0x3bca58[_0x1712ad(0x24e)](_0x87e91d);if(_0xe49707)_0x3bca58[_0x1712ad(0x709)]();_0x25b984&&_0x3bca58[_0x1712ad(0x2ac)]()&&_0x3bca58['performCollapse']();}}),PluginManager['registerCommand'](pluginData['name'],_0x421ee0(0x32f),_0x11a56a=>{const _0x179668=_0x421ee0;if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0x11a56a,_0x11a56a);const _0x1c83df=VisuMZ[_0x179668(0x333)](_0x11a56a[_0x179668(0x8a6)]);for(const _0x2d0b16 of _0x1c83df){if(!_0x2d0b16)continue;_0x2d0b16[_0x179668(0x1bc)](_0x11a56a[_0x179668(0x3ba)]);}}),PluginManager[_0x421ee0(0x6bc)](pluginData['name'],'ActSeq_Mechanics_Multipliers',_0x1c1d29=>{const _0x424074=_0x421ee0;if(!SceneManager[_0x424074(0x225)]())return;VisuMZ[_0x424074(0x243)](_0x1c1d29,_0x1c1d29);const _0x4234d7=BattleManager['_action'],_0x36e0c4={'criticalHitRate':_0x1c1d29[_0x424074(0x1ad)],'criticalHitFlat':_0x1c1d29[_0x424074(0x167)],'criticalDmgRate':_0x1c1d29[_0x424074(0x8b0)],'criticalDmgFlat':_0x1c1d29['CriticalDmgFlat'],'damageRate':_0x1c1d29[_0x424074(0x2af)],'damageFlat':_0x1c1d29[_0x424074(0x6a4)],'hitRate':_0x1c1d29[_0x424074(0x2f5)],'hitFlat':_0x1c1d29[_0x424074(0x66d)]};_0x4234d7[_0x424074(0x38c)]=_0x36e0c4;}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],'ActSeq_Mechanics_RemoveBuffDebuff',_0x4a2264=>{const _0x7b1030=_0x421ee0;if(!SceneManager[_0x7b1030(0x225)]())return;VisuMZ['ConvertParams'](_0x4a2264,_0x4a2264);const _0x6930d1=[_0x7b1030(0x6f9),_0x7b1030(0x764),'ATK','DEF',_0x7b1030(0x2f6),'MDF',_0x7b1030(0x837),'LUK'],_0x261c21=_0x4a2264[_0x7b1030(0x48e)],_0x1df480=_0x4a2264['Debuffs'],_0x358667=VisuMZ[_0x7b1030(0x333)](_0x4a2264[_0x7b1030(0x8a6)]);for(const _0x2bb975 of _0x358667){if(!_0x2bb975)continue;for(const _0x2ec0c5 of _0x261c21){const _0x23813f=_0x6930d1[_0x7b1030(0x19a)](_0x2ec0c5[_0x7b1030(0x890)]()[_0x7b1030(0x90d)]());_0x23813f>=0x0&&_0x23813f<=0x7&&_0x2bb975[_0x7b1030(0x2a3)](_0x23813f)&&_0x2bb975[_0x7b1030(0x77d)](_0x23813f);}for(const _0x586ba5 of _0x1df480){const _0x421b50=_0x6930d1[_0x7b1030(0x19a)](_0x586ba5[_0x7b1030(0x890)]()[_0x7b1030(0x90d)]());_0x421b50>=0x0&&_0x421b50<=0x7&&_0x2bb975[_0x7b1030(0x2cf)](_0x421b50)&&_0x2bb975[_0x7b1030(0x77d)](_0x421b50);}}}),PluginManager[_0x421ee0(0x6bc)](pluginData['name'],_0x421ee0(0x2dc),_0x4ed50b=>{const _0x43a7ee=_0x421ee0;if(!SceneManager[_0x43a7ee(0x225)]())return;VisuMZ[_0x43a7ee(0x243)](_0x4ed50b,_0x4ed50b);const _0x4c7e63=_0x4ed50b['States'],_0x55149b=VisuMZ[_0x43a7ee(0x333)](_0x4ed50b['Targets']);for(const _0x4e949c of _0x55149b){if(!_0x4e949c)continue;for(const _0x2447cf of _0x4c7e63){_0x4e949c[_0x43a7ee(0x8b6)](_0x2447cf);}}}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x8a1),_0x278dde=>{const _0x52d426=_0x421ee0;if(!SceneManager[_0x52d426(0x225)]())return;if(!Imported[_0x52d426(0x176)])return;VisuMZ[_0x52d426(0x243)](_0x278dde,_0x278dde);const _0x300bba=_0x278dde[_0x52d426(0x7fb)],_0xfed10f=VisuMZ[_0x52d426(0x333)](_0x278dde['Targets']),_0x15139d=_0x278dde[_0x52d426(0x7ee)],_0x1faa97=_0x278dde[_0x52d426(0x47e)],_0x127f8d=_0x278dde[_0x52d426(0x210)],_0x7aecfb=BattleManager[_0x52d426(0x823)];if(_0x300bba)for(const _0x39d9a9 of _0xfed10f){if(!_0x39d9a9)continue;if(_0x39d9a9===user)continue;if(_0x15139d)_0x39d9a9['setSTBExploited'](![]);_0x39d9a9[_0x52d426(0x28b)](BattleManager[_0x52d426(0x562)],_0x7aecfb);}if(_0x1faa97&&BattleManager['_subject']){if(_0x127f8d)BattleManager[_0x52d426(0x562)][_0x52d426(0x75a)](![]);const _0x31be9e=_0xfed10f[0x0];BattleManager['performSTBExploiter'](_0x31be9e,_0x7aecfb);}}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x440),_0x106573=>{const _0x27143c=_0x421ee0;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x27143c(0x176)])return;VisuMZ[_0x27143c(0x243)](_0x106573,_0x106573);const _0x34e88d=_0x106573['Actions'];BattleManager[_0x27143c(0x562)]&&BattleManager[_0x27143c(0x562)][_0x27143c(0x4cc)](_0x34e88d);}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],'ActSeq_Mechanics_StbRemoveExcessActions',_0x486020=>{const _0x41e3d3=_0x421ee0;if(!SceneManager[_0x41e3d3(0x225)]())return;if(!Imported[_0x41e3d3(0x176)])return;VisuMZ['ConvertParams'](_0x486020,_0x486020);let _0x4451b2=_0x486020[_0x41e3d3(0x528)];if(BattleManager['_subject']){BattleManager['_subject'][_0x41e3d3(0x311)]=BattleManager[_0x41e3d3(0x562)][_0x41e3d3(0x311)]||[];while(_0x4451b2--){if(BattleManager[_0x41e3d3(0x562)][_0x41e3d3(0x311)]['length']<=0x0)break;BattleManager[_0x41e3d3(0x562)][_0x41e3d3(0x311)]['shift']();}}}),PluginManager['registerCommand'](pluginData['name'],'ActSeq_Mechanics_SwapWeapon',_0x342525=>{const _0x3c334d=_0x421ee0;if(!SceneManager[_0x3c334d(0x225)]())return;if(!Imported[_0x3c334d(0x603)])return;VisuMZ[_0x3c334d(0x243)](_0x342525,_0x342525);const _0x1e06bd=VisuMZ[_0x3c334d(0x333)](_0x342525[_0x3c334d(0x8a6)]),_0x31b59d=_0x342525['WeaponTypeID'];for(const _0x6b6511 of _0x1e06bd){if(!_0x6b6511)continue;if(!_0x6b6511[_0x3c334d(0x6da)]())continue;_0x6b6511[_0x3c334d(0x85c)](_0x31b59d);}}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x340),_0x1985b4=>{const _0x1620a8=_0x421ee0;if(!SceneManager[_0x1620a8(0x225)]())return;VisuMZ[_0x1620a8(0x243)](_0x1985b4,_0x1985b4);const _0x592361=VisuMZ[_0x1620a8(0x333)](_0x1985b4['Targets']),_0x46faa7=_0x1985b4[_0x1620a8(0x69f)],_0x451ce8={'textColor':ColorManager[_0x1620a8(0x172)](_0x1985b4['TextColor']),'flashColor':_0x1985b4[_0x1620a8(0x1ac)],'flashDuration':_0x1985b4['FlashDuration']};for(const _0x15f7d2 of _0x592361){if(!_0x15f7d2)continue;_0x15f7d2[_0x1620a8(0x3ae)](_0x46faa7,_0x451ce8);}}),PluginManager[_0x421ee0(0x6bc)](pluginData['name'],_0x421ee0(0x2b4),_0x28d726=>{const _0x2804ad=_0x421ee0;if(!SceneManager[_0x2804ad(0x225)]())return;VisuMZ[_0x2804ad(0x243)](_0x28d726,_0x28d726);const _0x54950a=VisuMZ[_0x2804ad(0x333)](_0x28d726['Targets']);let _0x5888aa=$gameVariables[_0x2804ad(0x667)](_0x28d726[_0x2804ad(0x374)]);Imported[_0x2804ad(0x588)]&&_0x28d726[_0x2804ad(0x884)]&&(_0x5888aa=VisuMZ['GroupDigits'](_0x5888aa));const _0x5cd220=String(_0x5888aa),_0x4dcadc={'textColor':ColorManager['getColor'](_0x28d726[_0x2804ad(0x488)]),'flashColor':_0x28d726[_0x2804ad(0x1ac)],'flashDuration':_0x28d726[_0x2804ad(0x819)]};for(const _0x5d76d3 of _0x54950a){if(!_0x5d76d3)continue;_0x5d76d3[_0x2804ad(0x3ae)](_0x5cd220,_0x4dcadc);}}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],'ActSeq_Mechanics_WaitForEffect',_0x2256ec=>{const _0x11b963=_0x421ee0;if(!SceneManager[_0x11b963(0x225)]())return;const _0x408db0=$gameTemp[_0x11b963(0x869)]();if(!_0x408db0)return;_0x408db0[_0x11b963(0x396)](_0x11b963(0x4aa));}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x3d4),_0x3fba99=>{const _0x5103bf=_0x421ee0;if(!SceneManager[_0x5103bf(0x225)]())return;VisuMZ['ConvertParams'](_0x3fba99,_0x3fba99);const _0xabefda=VisuMZ[_0x5103bf(0x333)](_0x3fba99['Targets']);for(const _0x1267fa of _0xabefda){if(!_0x1267fa)continue;_0x1267fa[_0x5103bf(0x329)]();}}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x359),_0x3c9e3d=>{const _0x27bc29=_0x421ee0;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x27bc29(0x243)](_0x3c9e3d,_0x3c9e3d);const _0x4f8e2a=VisuMZ[_0x27bc29(0x333)](_0x3c9e3d['Targets']),_0x1218ab=_0x3c9e3d[_0x27bc29(0x36c)][_0x27bc29(0x6e1)]()[_0x27bc29(0x90d)](),_0x302439=_0x3c9e3d[_0x27bc29(0x508)],_0x21329d=_0x3c9e3d[_0x27bc29(0x320)];for(const _0x14fcde of _0x4f8e2a){if(!_0x14fcde)continue;_0x14fcde[_0x27bc29(0x5a6)](_0x1218ab,_0x302439,_0x21329d);}}),PluginManager['registerCommand'](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x2c5),_0x11d116=>{const _0x5ea856=_0x421ee0;if(!SceneManager[_0x5ea856(0x225)]())return;VisuMZ['ConvertParams'](_0x11d116,_0x11d116);const _0x5a6240=VisuMZ[_0x5ea856(0x333)](_0x11d116[_0x5ea856(0x8a6)]),_0x163b97=_0x11d116[_0x5ea856(0x36c)][_0x5ea856(0x6e1)]()[_0x5ea856(0x90d)](),_0x2835c4=_0x11d116[_0x5ea856(0x508)];for(const _0x5d92f6 of _0x5a6240){if(!_0x5d92f6)continue;if(_0x163b97[_0x5ea856(0x5f2)](/ATTACK[ ](\d+)/i))_0x5d92f6[_0x5ea856(0x6ef)](Number(RegExp['$1']));else _0x163b97==='attack'?_0x5d92f6['performAttack']():_0x5d92f6[_0x5ea856(0x6f0)](_0x163b97);if(!_0x2835c4)_0x5d92f6[_0x5ea856(0x223)](0x0);else{if(_0x2835c4&&['thrust',_0x5ea856(0x1ab),'missle'][_0x5ea856(0x7f2)](_0x163b97)){}}}}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x365),_0x492754=>{const _0x3308ed=_0x421ee0;if(!SceneManager[_0x3308ed(0x225)]())return;VisuMZ[_0x3308ed(0x243)](_0x492754,_0x492754);const _0x4a2194=BattleManager[_0x3308ed(0x823)];if(!_0x4a2194)return;if(!_0x4a2194['item']())return;const _0x18222a=VisuMZ[_0x3308ed(0x333)](_0x492754[_0x3308ed(0x8a6)]);for(const _0x3bd0b6 of _0x18222a){if(!_0x3bd0b6)continue;_0x3bd0b6['performAction'](_0x4a2194);}}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x1e0),_0x273bff=>{const _0xd4141a=_0x421ee0;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0xd4141a(0x243)](_0x273bff,_0x273bff);const _0x2edec0=VisuMZ[_0xd4141a(0x333)](_0x273bff[_0xd4141a(0x8a6)]);for(const _0x2f79a9 of _0x2edec0){if(!_0x2f79a9)continue;if(!_0x2f79a9[_0xd4141a(0x35a)]())continue;_0x2f79a9['battler']()[_0xd4141a(0x763)]();}}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],'ActSeq_Motion_WaitMotionFrame',_0x55b82=>{const _0x5dc0ac=_0x421ee0;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x5dc0ac(0x243)](_0x55b82,_0x55b82);const _0x5af946=$gameTemp['getLastPluginCommandInterpreter'](),_0x4592e3=_0x55b82[_0x5dc0ac(0x601)]*Sprite_Battler[_0x5dc0ac(0x1d1)];_0x5af946[_0x5dc0ac(0x186)](_0x4592e3);}),PluginManager['registerCommand'](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x815),_0xf1c026=>{const _0x58e75e=_0x421ee0;if(!SceneManager[_0x58e75e(0x225)]())return;VisuMZ['ConvertParams'](_0xf1c026,_0xf1c026);const _0x2b8f35=$gameTemp[_0x58e75e(0x869)](),_0x2d087a=BattleManager[_0x58e75e(0x823)];if(!_0x2b8f35||!_0x2d087a)return;if(!_0x2d087a['item']())return;const _0x622dc=VisuMZ[_0x58e75e(0x333)](_0xf1c026[_0x58e75e(0x8a6)]);for(const _0x5ebca3 of _0x622dc){if(!_0x5ebca3)continue;_0x5ebca3[_0x58e75e(0x5d9)](_0x2d087a);}if(_0xf1c026[_0x58e75e(0x31d)])_0x2b8f35[_0x58e75e(0x396)](_0x58e75e(0x4ba));}),PluginManager['registerCommand'](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x455),_0x18b7b1=>{const _0x245657=_0x421ee0;if(!SceneManager[_0x245657(0x225)]())return;if(!$gameSystem[_0x245657(0x649)]())return;VisuMZ[_0x245657(0x243)](_0x18b7b1,_0x18b7b1);const _0x1cd986=VisuMZ[_0x245657(0x333)](_0x18b7b1[_0x245657(0x8a6)]);let _0x32bdc7=_0x18b7b1[_0x245657(0x81f)][_0x245657(0x5f2)](/back/i);for(const _0x2b584d of _0x1cd986){if(!_0x2b584d)continue;if(_0x18b7b1[_0x245657(0x81f)]['match'](/rand/i))_0x32bdc7=Math[_0x245657(0x803)](0x2);_0x2b584d[_0x245657(0x7b2)](!!_0x32bdc7);}}),PluginManager[_0x421ee0(0x6bc)](pluginData['name'],_0x421ee0(0x232),_0x4f4d3f=>{const _0x3a5bc9=_0x421ee0;if(!SceneManager[_0x3a5bc9(0x225)]())return;if(!$gameSystem[_0x3a5bc9(0x649)]())return;VisuMZ[_0x3a5bc9(0x243)](_0x4f4d3f,_0x4f4d3f);const _0x4511f1=VisuMZ[_0x3a5bc9(0x333)](_0x4f4d3f['Targets']);let _0x3f7330=_0x4f4d3f[_0x3a5bc9(0x8e2)];const _0x5a25ea=_0x4f4d3f[_0x3a5bc9(0x447)];for(const _0x5a7749 of _0x4511f1){if(!_0x5a7749)continue;let _0x1c1346=_0x5a7749[_0x3a5bc9(0x35a)]()[_0x3a5bc9(0x923)],_0x483b3f=_0x5a7749['battler']()[_0x3a5bc9(0x88b)];if(_0x3f7330['match'](/home/i))_0x1c1346=_0x5a7749[_0x3a5bc9(0x35a)]()[_0x3a5bc9(0x788)],_0x483b3f=_0x5a7749[_0x3a5bc9(0x35a)]()[_0x3a5bc9(0x538)];else{if(_0x3f7330[_0x3a5bc9(0x5f2)](/center/i))_0x1c1346=Graphics[_0x3a5bc9(0x733)]/0x2,_0x483b3f=Graphics[_0x3a5bc9(0x53d)]/0x2;else _0x3f7330[_0x3a5bc9(0x5f2)](/point (\d+), (\d+)/i)&&(_0x1c1346=Number(RegExp['$1']),_0x483b3f=Number(RegExp['$2']));}_0x5a7749[_0x3a5bc9(0x2f8)](Math[_0x3a5bc9(0x38a)](_0x1c1346),Math[_0x3a5bc9(0x38a)](_0x483b3f),!!_0x5a25ea);}}),PluginManager['registerCommand'](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x646),_0x5c89f8=>{const _0x38befb=_0x421ee0;if(!SceneManager[_0x38befb(0x225)]())return;if(!$gameSystem[_0x38befb(0x649)]())return;VisuMZ[_0x38befb(0x243)](_0x5c89f8,_0x5c89f8);const _0x41b412=VisuMZ[_0x38befb(0x333)](_0x5c89f8['Targets1']),_0x577418=VisuMZ[_0x38befb(0x333)](_0x5c89f8[_0x38befb(0x834)]),_0x2e8f23=_0x577418['map'](_0x21d4b4=>_0x21d4b4&&_0x21d4b4[_0x38befb(0x35a)]()?_0x21d4b4[_0x38befb(0x35a)]()['_baseX']:0x0)/(_0x577418[_0x38befb(0x4be)]||0x1),_0x38423c=_0x577418[_0x38befb(0x1b6)](_0x10cbe5=>_0x10cbe5&&_0x10cbe5['battler']()?_0x10cbe5[_0x38befb(0x35a)]()['_baseY']:0x0)/(_0x577418['length']||0x1),_0x93e86a=_0x5c89f8[_0x38befb(0x447)];for(const _0x13d883 of _0x41b412){if(!_0x13d883)continue;_0x13d883[_0x38befb(0x2f8)](Math[_0x38befb(0x38a)](_0x2e8f23),Math['round'](_0x38423c),!!_0x93e86a);}}),PluginManager['registerCommand'](pluginData['name'],'ActSeq_Movement_Float',_0x35485c=>{const _0x10e347=_0x421ee0;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x10e347(0x243)](_0x35485c,_0x35485c);const _0x1ace97=$gameTemp[_0x10e347(0x869)](),_0x1ec3df=VisuMZ['CreateActionSequenceTargets'](_0x35485c[_0x10e347(0x8a6)]),_0x26aabd=_0x35485c[_0x10e347(0x634)],_0x38030d=_0x35485c[_0x10e347(0x76f)],_0xc8229f=_0x35485c['EasingType'],_0x427ad9=_0x35485c['WaitForFloat'];if(!_0x1ace97)return;for(const _0x365f99 of _0x1ec3df){if(!_0x365f99)continue;_0x365f99['floatBattler'](_0x26aabd,_0x38030d,_0xc8229f);}if(_0x427ad9)_0x1ace97['setWaitMode'](_0x10e347(0x6ac));}),PluginManager['registerCommand'](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x347),_0x12d413=>{const _0x921f5d=_0x421ee0;if(!SceneManager[_0x921f5d(0x225)]())return;VisuMZ['ConvertParams'](_0x12d413,_0x12d413);const _0x251589=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x251589)return;const _0x37a426=VisuMZ['CreateActionSequenceTargets'](_0x12d413['Targets']);for(const _0x35e0f7 of _0x37a426){if(!_0x35e0f7)continue;_0x35e0f7[_0x921f5d(0x56c)](),_0x35e0f7[_0x921f5d(0x53f)]();}if(_0x12d413[_0x921f5d(0x31d)])_0x251589[_0x921f5d(0x396)](_0x921f5d(0x4ba));}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x845),_0x28a7f5=>{const _0xb9c73b=_0x421ee0;if(!SceneManager[_0xb9c73b(0x225)]())return;VisuMZ[_0xb9c73b(0x243)](_0x28a7f5,_0x28a7f5);const _0x5c97f7=$gameTemp[_0xb9c73b(0x869)](),_0x5d944f=VisuMZ[_0xb9c73b(0x333)](_0x28a7f5[_0xb9c73b(0x8a6)]),_0x2e194a=_0x28a7f5[_0xb9c73b(0x634)],_0x286527=_0x28a7f5[_0xb9c73b(0x76f)],_0x140b24=_0x28a7f5[_0xb9c73b(0x636)];if(!_0x5c97f7)return;for(const _0x5e8333 of _0x5d944f){if(!_0x5e8333)continue;_0x5e8333[_0xb9c73b(0x727)](_0x2e194a,_0x286527);}if(_0x140b24)_0x5c97f7[_0xb9c73b(0x396)]('battleJump');}),PluginManager['registerCommand'](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x922),_0xa1dd27=>{const _0x27957e=_0x421ee0;if(!SceneManager[_0x27957e(0x225)]())return;if(!$gameSystem['isSideView']())return;VisuMZ['ConvertParams'](_0xa1dd27,_0xa1dd27);const _0x53b4ca=$gameTemp['getLastPluginCommandInterpreter'](),_0x159722=VisuMZ[_0x27957e(0x333)](_0xa1dd27[_0x27957e(0x8a6)]),_0x237a24=_0xa1dd27[_0x27957e(0x18b)],_0x37d77d=_0xa1dd27[_0x27957e(0x893)],_0x2a6648=_0xa1dd27[_0x27957e(0x7c6)],_0x483ea9=_0xa1dd27[_0x27957e(0x76f)],_0x1b807b=_0xa1dd27[_0x27957e(0x8ac)],_0x495168=_0xa1dd27[_0x27957e(0x5f4)],_0x27aac5=_0xa1dd27[_0x27957e(0x36c)],_0x201edd=_0xa1dd27['WaitForMovement'];if(!_0x53b4ca)return;for(const _0x5354ad of _0x159722){if(!_0x5354ad)continue;let _0x302947=_0x37d77d,_0x47132f=_0x2a6648;if(_0x237a24[_0x27957e(0x5f2)](/horz/i))_0x302947*=_0x5354ad[_0x27957e(0x6da)]()?-0x1:0x1;if(_0x237a24[_0x27957e(0x5f2)](/vert/i))_0x47132f*=_0x5354ad[_0x27957e(0x6da)]()?-0x1:0x1;_0x5354ad[_0x27957e(0x774)](_0x302947,_0x47132f,_0x483ea9,_0x1b807b,_0x495168),_0x5354ad[_0x27957e(0x6f0)](_0x27aac5);}if(_0x201edd)_0x53b4ca[_0x27957e(0x396)](_0x27957e(0x4ba));}),PluginManager['registerCommand'](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x544),_0x3241f7=>{const _0x10df83=_0x421ee0;if(!SceneManager['isSceneBattle']())return;if(!$gameSystem[_0x10df83(0x649)]())return;VisuMZ[_0x10df83(0x243)](_0x3241f7,_0x3241f7);const _0x2f3a18=$gameTemp[_0x10df83(0x869)](),_0x29378d=VisuMZ[_0x10df83(0x333)](_0x3241f7[_0x10df83(0x8a6)]),_0x3a3aaa=_0x3241f7[_0x10df83(0x570)],_0x4bcc08=_0x3241f7[_0x10df83(0x689)],_0x49f3b6=_0x3241f7[_0x10df83(0x41b)],_0x126439=_0x3241f7[_0x10df83(0x275)],_0x431948=_0x3241f7[_0x10df83(0x76f)],_0x1d110a=_0x3241f7[_0x10df83(0x8ac)],_0xeac957=_0x3241f7[_0x10df83(0x5f4)],_0x40c6eb=_0x3241f7[_0x10df83(0x36c)],_0x38cd95=_0x3241f7['WaitForMovement'];if(!_0x2f3a18)return;for(const _0x5f5a40 of _0x29378d){if(!_0x5f5a40)continue;let _0x6bce51=_0x5f5a40[_0x10df83(0x35a)]()['_baseX'],_0x3799e4=_0x5f5a40[_0x10df83(0x35a)]()[_0x10df83(0x88b)];if(_0x3a3aaa[_0x10df83(0x5f2)](/home/i))_0x6bce51=_0x5f5a40[_0x10df83(0x35a)]()[_0x10df83(0x788)],_0x3799e4=_0x5f5a40[_0x10df83(0x35a)]()[_0x10df83(0x538)];else{if(_0x3a3aaa[_0x10df83(0x5f2)](/center/i))_0x6bce51=Graphics[_0x10df83(0x733)]/0x2,_0x3799e4=Graphics[_0x10df83(0x53d)]/0x2;else _0x3a3aaa[_0x10df83(0x5f2)](/point (\d+), (\d+)/i)&&(_0x6bce51=Number(RegExp['$1']),_0x3799e4=Number(RegExp['$2']));}if(_0x4bcc08['match'](/none/i))_0x6bce51+=_0x49f3b6,_0x3799e4+=_0x126439;else{if(_0x4bcc08[_0x10df83(0x5f2)](/horz/i)&&_0x4bcc08[_0x10df83(0x5f2)](/vert/i))_0x6bce51+=_0x5f5a40[_0x10df83(0x6da)]()?-_0x49f3b6:_0x49f3b6,_0x3799e4+=_0x5f5a40[_0x10df83(0x6da)]()?-_0x126439:_0x126439;else{if(_0x4bcc08[_0x10df83(0x5f2)](/horz/i))_0x6bce51+=_0x5f5a40[_0x10df83(0x6da)]()?-_0x49f3b6:_0x49f3b6,_0x3799e4+=_0x126439;else _0x4bcc08[_0x10df83(0x5f2)](/vert/i)&&(_0x6bce51+=_0x49f3b6,_0x3799e4+=_0x5f5a40[_0x10df83(0x6da)]()?-_0x126439:_0x126439);}}_0x5f5a40[_0x10df83(0x319)](_0x6bce51,_0x3799e4,_0x431948,_0x1d110a,_0xeac957,-0x1),_0x5f5a40[_0x10df83(0x6f0)](_0x40c6eb);}if(_0x38cd95)_0x2f3a18[_0x10df83(0x396)](_0x10df83(0x4ba));}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],'ActSeq_Movement_MoveToTarget',_0x2feaf1=>{const _0x1614c1=_0x421ee0;if(!SceneManager[_0x1614c1(0x225)]())return;if(!$gameSystem[_0x1614c1(0x649)]())return;VisuMZ['ConvertParams'](_0x2feaf1,_0x2feaf1);const _0x19fc6c=$gameTemp[_0x1614c1(0x869)](),_0x5a328d=VisuMZ[_0x1614c1(0x333)](_0x2feaf1['Targets1']),_0x1c53c2=VisuMZ[_0x1614c1(0x333)](_0x2feaf1[_0x1614c1(0x834)]),_0x38518a=_0x2feaf1[_0x1614c1(0x1c2)];let _0x504067=_0x2feaf1[_0x1614c1(0x2d9)];const _0x4479b3=_0x2feaf1[_0x1614c1(0x689)],_0x4e2335=_0x2feaf1[_0x1614c1(0x41b)],_0x5ab85e=_0x2feaf1[_0x1614c1(0x275)],_0x1cf14c=_0x2feaf1['Duration'],_0x4117c6=_0x2feaf1[_0x1614c1(0x8ac)],_0xb80df5=_0x2feaf1[_0x1614c1(0x5f4)],_0x29b5c3=_0x2feaf1[_0x1614c1(0x36c)],_0x4a8e89=_0x2feaf1[_0x1614c1(0x31d)],_0x32fb18=Math[_0x1614c1(0x72a)](..._0x1c53c2['map'](_0x9d5dd9=>_0x9d5dd9[_0x1614c1(0x35a)]()[_0x1614c1(0x923)]-_0x9d5dd9[_0x1614c1(0x35a)]()[_0x1614c1(0x315)]()/0x2)),_0x177d9f=Math['max'](..._0x1c53c2[_0x1614c1(0x1b6)](_0x4a60c5=>_0x4a60c5[_0x1614c1(0x35a)]()[_0x1614c1(0x923)]+_0x4a60c5[_0x1614c1(0x35a)]()[_0x1614c1(0x315)]()/0x2)),_0x614e77=Math[_0x1614c1(0x72a)](..._0x1c53c2[_0x1614c1(0x1b6)](_0x3a25f0=>_0x3a25f0['battler']()[_0x1614c1(0x88b)]-_0x3a25f0[_0x1614c1(0x35a)]()['mainSpriteHeight']())),_0x5a9b48=Math[_0x1614c1(0x8aa)](..._0x1c53c2[_0x1614c1(0x1b6)](_0xc12015=>_0xc12015[_0x1614c1(0x35a)]()[_0x1614c1(0x88b)])),_0x28516a=_0x1c53c2['filter'](_0x3e1686=>_0x3e1686[_0x1614c1(0x6da)]())[_0x1614c1(0x4be)],_0x13c728=_0x1c53c2[_0x1614c1(0x7ad)](_0x2cf68a=>_0x2cf68a[_0x1614c1(0x84c)]())[_0x1614c1(0x4be)];let _0x340e0f=0x0,_0x5680fb=0x0;if(_0x38518a[_0x1614c1(0x5f2)](/front/i))_0x340e0f=_0x28516a>=_0x13c728?_0x32fb18:_0x177d9f;else{if(_0x38518a[_0x1614c1(0x5f2)](/middle/i))_0x340e0f=(_0x32fb18+_0x177d9f)/0x2,_0x504067=-0x1;else _0x38518a[_0x1614c1(0x5f2)](/back/i)&&(_0x340e0f=_0x28516a>=_0x13c728?_0x177d9f:_0x32fb18);}if(_0x38518a['match'](/head/i))_0x5680fb=_0x614e77;else{if(_0x38518a[_0x1614c1(0x5f2)](/center/i))_0x5680fb=(_0x614e77+_0x5a9b48)/0x2;else _0x38518a[_0x1614c1(0x5f2)](/base/i)&&(_0x5680fb=_0x5a9b48);}if(!_0x19fc6c)return;for(const _0xd970af of _0x5a328d){if(!_0xd970af)continue;let _0x4b8f30=_0x340e0f,_0x713aff=_0x5680fb;if(_0x4479b3['match'](/none/i))_0x4b8f30+=_0x4e2335,_0x713aff+=_0x5ab85e;else{if(_0x4479b3[_0x1614c1(0x5f2)](/horz/i)&&_0x4479b3[_0x1614c1(0x5f2)](/vert/i))_0x4b8f30+=_0xd970af[_0x1614c1(0x6da)]()?-_0x4e2335:_0x4e2335,_0x713aff+=_0xd970af[_0x1614c1(0x6da)]()?-_0x5ab85e:_0x5ab85e;else{if(_0x4479b3[_0x1614c1(0x5f2)](/horz/i))_0x4b8f30+=_0xd970af[_0x1614c1(0x6da)]()?-_0x4e2335:_0x4e2335,_0x713aff+=_0x5ab85e;else _0x4479b3[_0x1614c1(0x5f2)](/vert/i)&&(_0x4b8f30+=_0x4e2335,_0x713aff+=_0xd970af[_0x1614c1(0x6da)]()?-_0x5ab85e:_0x5ab85e);}}_0xd970af[_0x1614c1(0x319)](_0x4b8f30,_0x713aff,_0x1cf14c,_0x4117c6,_0xb80df5,_0x504067),_0xd970af[_0x1614c1(0x6f0)](_0x29b5c3);}if(_0x4a8e89)_0x19fc6c['setWaitMode'](_0x1614c1(0x4ba));}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x4c5),_0x590733=>{const _0x3963c8=_0x421ee0;if(!SceneManager[_0x3963c8(0x225)]())return;VisuMZ[_0x3963c8(0x243)](_0x590733,_0x590733);const _0x1bdbd1=$gameTemp[_0x3963c8(0x869)](),_0x413a9e=VisuMZ[_0x3963c8(0x333)](_0x590733['Targets']),_0x494917=_0x590733[_0x3963c8(0x34a)],_0x12d0f5=_0x590733[_0x3963c8(0x76f)],_0x6bef0f=_0x590733['EasingType'],_0x1af966=_0x590733[_0x3963c8(0x68c)];if(!_0x1bdbd1)return;for(const _0x104202 of _0x413a9e){if(!_0x104202)continue;_0x104202['changeBattlerOpacity'](_0x494917,_0x12d0f5,_0x6bef0f);}if(_0x1af966)_0x1bdbd1[_0x3963c8(0x396)]('battleOpacity');}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],'ActSeq_Movement_Scale',_0x588ba5=>{const _0x34049a=_0x421ee0;if(!SceneManager[_0x34049a(0x225)]())return;VisuMZ[_0x34049a(0x243)](_0x588ba5,_0x588ba5);const _0x31ff9b=$gameTemp[_0x34049a(0x869)](),_0x15bdf0=VisuMZ['CreateActionSequenceTargets'](_0x588ba5[_0x34049a(0x8a6)]),_0x17bcc7=_0x588ba5['ScaleX'],_0x1ac18d=_0x588ba5[_0x34049a(0x20c)],_0x2c2507=_0x588ba5[_0x34049a(0x76f)],_0x38320b=_0x588ba5[_0x34049a(0x5f4)],_0x31c080=_0x588ba5[_0x34049a(0x572)];if(!_0x31ff9b)return;for(const _0xd5a142 of _0x15bdf0){if(!_0xd5a142)continue;_0xd5a142[_0x34049a(0x267)](_0x17bcc7,_0x1ac18d,_0x2c2507,_0x38320b);}if(_0x31c080)_0x31ff9b['setWaitMode'](_0x34049a(0x345));}),PluginManager['registerCommand'](pluginData[_0x421ee0(0x4ec)],'ActSeq_Movement_Skew',_0x3ad1c3=>{const _0x1b0e26=_0x421ee0;if(!SceneManager[_0x1b0e26(0x225)]())return;VisuMZ[_0x1b0e26(0x243)](_0x3ad1c3,_0x3ad1c3);const _0x5277f0=$gameTemp[_0x1b0e26(0x869)](),_0x35238d=VisuMZ[_0x1b0e26(0x333)](_0x3ad1c3['Targets']),_0x31a822=_0x3ad1c3['SkewX'],_0x264f0a=_0x3ad1c3['SkewY'],_0xd0d3da=_0x3ad1c3[_0x1b0e26(0x76f)],_0xeced97=_0x3ad1c3[_0x1b0e26(0x5f4)],_0x549983=_0x3ad1c3['WaitForSkew'];if(!_0x5277f0)return;for(const _0x2f6d04 of _0x35238d){if(!_0x2f6d04)continue;_0x2f6d04[_0x1b0e26(0x246)](_0x31a822,_0x264f0a,_0xd0d3da,_0xeced97);}if(_0x549983)_0x5277f0[_0x1b0e26(0x396)](_0x1b0e26(0x8f6));}),PluginManager[_0x421ee0(0x6bc)](pluginData['name'],'ActSeq_Movement_Spin',_0x5c41e7=>{const _0xc98a70=_0x421ee0;if(!SceneManager[_0xc98a70(0x225)]())return;VisuMZ[_0xc98a70(0x243)](_0x5c41e7,_0x5c41e7);const _0x4f4f32=$gameTemp[_0xc98a70(0x869)](),_0x58bb92=VisuMZ[_0xc98a70(0x333)](_0x5c41e7[_0xc98a70(0x8a6)]),_0x4ddd61=_0x5c41e7['Angle'],_0x242618=_0x5c41e7[_0xc98a70(0x76f)],_0x5ea709=_0x5c41e7[_0xc98a70(0x5f4)],_0x42657f=_0x5c41e7[_0xc98a70(0x64f)],_0x3a24b8=_0x5c41e7[_0xc98a70(0x8f4)];if(!_0x4f4f32)return;for(const _0x5ed0c2 of _0x58bb92){if(!_0x5ed0c2)continue;_0x5ed0c2['spinBattler'](_0x4ddd61,_0x242618,_0x5ea709,_0x42657f);}if(_0x3a24b8)_0x4f4f32['setWaitMode'](_0xc98a70(0x509));}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x615),_0x38c2c9=>{const _0x209ee5=_0x421ee0;if(!SceneManager[_0x209ee5(0x225)]())return;const _0x4c5cc3=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x4c5cc3)return;_0x4c5cc3[_0x209ee5(0x396)]('battleFloat');}),PluginManager['registerCommand'](pluginData['name'],_0x421ee0(0x8e9),_0x50d043=>{const _0x254869=_0x421ee0;if(!SceneManager[_0x254869(0x225)]())return;const _0x482dfa=$gameTemp[_0x254869(0x869)]();if(!_0x482dfa)return;_0x482dfa[_0x254869(0x396)]('battleJump');}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x5e0),_0xc252d3=>{const _0x19315e=_0x421ee0;if(!SceneManager['isSceneBattle']())return;const _0x384333=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x384333)return;_0x384333[_0x19315e(0x396)](_0x19315e(0x4ba));}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x85f),_0x1ed0ed=>{const _0x28012a=_0x421ee0;if(!SceneManager[_0x28012a(0x225)]())return;const _0x68c926=$gameTemp[_0x28012a(0x869)]();if(!_0x68c926)return;_0x68c926['setWaitMode'](_0x28012a(0x64e));}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x5b1),_0x5664a9=>{const _0x1456a7=_0x421ee0;if(!SceneManager['isSceneBattle']())return;const _0x237afe=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x237afe)return;_0x237afe['setWaitMode'](_0x1456a7(0x345));}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],'ActSeq_Movement_WaitForSkew',_0x50e119=>{const _0x447d13=_0x421ee0;if(!SceneManager[_0x447d13(0x225)]())return;const _0x4466e8=$gameTemp[_0x447d13(0x869)]();if(!_0x4466e8)return;_0x4466e8[_0x447d13(0x396)]('battleSpriteSkew');}),PluginManager[_0x421ee0(0x6bc)](pluginData['name'],_0x421ee0(0x16e),_0x55c52b=>{const _0x380038=_0x421ee0;if(!SceneManager[_0x380038(0x225)]())return;const _0x52af03=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x52af03)return;_0x52af03[_0x380038(0x396)](_0x380038(0x509));}),PluginManager['registerCommand'](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x5ef),_0x40439a=>{const _0x44789c=_0x421ee0;if(!SceneManager[_0x44789c(0x225)]())return;if(!Imported[_0x44789c(0x254)])return;VisuMZ[_0x44789c(0x243)](_0x40439a,_0x40439a);const _0x58270d=$gameTemp[_0x44789c(0x869)](),_0x12d404=_0x40439a['WaitForProjectile'];if(!_0x58270d)return;const _0x2c1587=BattleManager[_0x44789c(0x6c2)];if(!_0x2c1587)return;_0x2c1587[_0x44789c(0x6b0)](_0x40439a);if(_0x12d404)_0x58270d[_0x44789c(0x396)](_0x44789c(0x6e6));}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x3b0),_0xbcf531=>{const _0x474fdf=_0x421ee0;if(!SceneManager[_0x474fdf(0x225)]())return;if(!Imported[_0x474fdf(0x254)])return;VisuMZ[_0x474fdf(0x243)](_0xbcf531,_0xbcf531);const _0xb90ff5=$gameTemp['getLastPluginCommandInterpreter'](),_0x4cb8b0=_0xbcf531['WaitForProjectile'];if(!_0xb90ff5)return;const _0x5975dd=BattleManager[_0x474fdf(0x6c2)];if(!_0x5975dd)return;_0x5975dd[_0x474fdf(0x6b0)](_0xbcf531);if(_0x4cb8b0)_0xb90ff5[_0x474fdf(0x396)](_0x474fdf(0x6e6));}),PluginManager[_0x421ee0(0x6bc)](pluginData['name'],_0x421ee0(0x83a),_0x473a45=>{const _0x340fd4=_0x421ee0;if(!SceneManager[_0x340fd4(0x225)]())return;if(!Imported['VisuMZ_3_ActSeqProjectiles'])return;VisuMZ[_0x340fd4(0x243)](_0x473a45,_0x473a45);const _0x4b8f8f=$gameTemp['getLastPluginCommandInterpreter'](),_0xff8450=_0x473a45[_0x340fd4(0x6b9)];if(!_0x4b8f8f)return;const _0x5a9eb1=BattleManager[_0x340fd4(0x6c2)];if(!_0x5a9eb1)return;_0x5a9eb1[_0x340fd4(0x6b0)](_0x473a45);if(_0xff8450)_0x4b8f8f['setWaitMode'](_0x340fd4(0x6e6));}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x506),_0x84104=>{const _0x45c67f=_0x421ee0;if(!SceneManager[_0x45c67f(0x225)]())return;if(!Imported[_0x45c67f(0x83f)])return;VisuMZ[_0x45c67f(0x243)](_0x84104,_0x84104);const _0x36b87b=$gameTemp[_0x45c67f(0x869)](),_0x2dc61c=_0x84104['WaitForSkew'];if(!_0x36b87b)return;$gameScreen[_0x45c67f(0x555)](_0x84104[_0x45c67f(0x559)],_0x84104[_0x45c67f(0x70d)],_0x84104[_0x45c67f(0x76f)],_0x84104['EasingType']);if(_0x2dc61c)_0x36b87b[_0x45c67f(0x396)]('battleSkew');}),PluginManager[_0x421ee0(0x6bc)](pluginData['name'],_0x421ee0(0x835),_0x3ba78f=>{const _0x3a8df3=_0x421ee0;if(!SceneManager[_0x3a8df3(0x225)]())return;if(!Imported[_0x3a8df3(0x83f)])return;VisuMZ[_0x3a8df3(0x243)](_0x3ba78f,_0x3ba78f);const _0x924a39=$gameTemp[_0x3a8df3(0x869)](),_0x573324=_0x3ba78f[_0x3a8df3(0x89f)];if(!_0x924a39)return;$gameScreen[_0x3a8df3(0x555)](0x0,0x0,_0x3ba78f[_0x3a8df3(0x76f)],_0x3ba78f[_0x3a8df3(0x5f4)]);if(_0x573324)_0x924a39['setWaitMode'](_0x3a8df3(0x5e9));}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x739),_0x526f8b=>{const _0x339a36=_0x421ee0;if(!SceneManager[_0x339a36(0x225)]())return;if(!Imported[_0x339a36(0x83f)])return;const _0x5a7e11=$gameTemp[_0x339a36(0x869)]();if(!_0x5a7e11)return;_0x5a7e11['setWaitMode'](_0x339a36(0x5e9));}),PluginManager[_0x421ee0(0x6bc)](pluginData['name'],_0x421ee0(0x4e9),_0x81fb84=>{const _0x53288d=_0x421ee0;if(!SceneManager[_0x53288d(0x225)]())return;VisuMZ[_0x53288d(0x243)](_0x81fb84,_0x81fb84);const _0xd7c8f7=$gameTemp[_0x53288d(0x869)](),_0x167210=_0x81fb84[_0x53288d(0x291)],_0x174545=_0x81fb84[_0x53288d(0x200)];if(!_0xd7c8f7)return;BattleManager[_0x53288d(0x25d)]=_0x167210,BattleManager[_0x53288d(0x8c4)]=BattleManager[_0x53288d(0x6cf)]?BattleManager[_0x53288d(0x6cf)][BattleManager[_0x53288d(0x25d)]]||null:null,BattleManager[_0x53288d(0x8c4)]&&_0x174545[_0x53288d(0x890)]()[_0x53288d(0x90d)]()!==_0x53288d(0x8fd)&&_0xd7c8f7['command119']([_0x174545]);}),PluginManager[_0x421ee0(0x6bc)](pluginData['name'],_0x421ee0(0x3ec),_0x912cb9=>{const _0x43bdc8=_0x421ee0;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x43bdc8(0x243)](_0x912cb9,_0x912cb9);const _0x10e316=$gameTemp[_0x43bdc8(0x869)](),_0x507673=_0x912cb9[_0x43bdc8(0x200)];if(!_0x10e316)return;BattleManager['_targetIndex']++,BattleManager[_0x43bdc8(0x8c4)]=BattleManager[_0x43bdc8(0x6cf)][BattleManager['_targetIndex']]||null,BattleManager['_target']&&_0x507673[_0x43bdc8(0x890)]()['trim']()!==_0x43bdc8(0x8fd)&&_0x10e316[_0x43bdc8(0x92f)]([_0x507673]);}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x5de),_0x18e252=>{const _0x2b3e95=_0x421ee0;if(!SceneManager[_0x2b3e95(0x225)]())return;VisuMZ[_0x2b3e95(0x243)](_0x18e252,_0x18e252);const _0x30cb25=$gameTemp[_0x2b3e95(0x869)](),_0x3feccc=_0x18e252[_0x2b3e95(0x200)];if(!_0x30cb25)return;BattleManager[_0x2b3e95(0x25d)]--,BattleManager[_0x2b3e95(0x8c4)]=BattleManager[_0x2b3e95(0x6cf)][BattleManager[_0x2b3e95(0x25d)]]||null,BattleManager['_target']&&_0x3feccc[_0x2b3e95(0x890)]()[_0x2b3e95(0x90d)]()!=='UNTITLED'&&_0x30cb25[_0x2b3e95(0x92f)]([_0x3feccc]);}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x6bf),_0x364b1c=>{const _0x3fa68d=_0x421ee0;if(!SceneManager[_0x3fa68d(0x225)]())return;VisuMZ[_0x3fa68d(0x243)](_0x364b1c,_0x364b1c);const _0x346a10=$gameTemp[_0x3fa68d(0x869)](),_0xbac6a0=_0x364b1c[_0x3fa68d(0x30e)],_0x57092f=_0x364b1c[_0x3fa68d(0x200)];if(!_0x346a10)return;const _0x1627d1=BattleManager[_0x3fa68d(0x25d)];for(;;){BattleManager[_0x3fa68d(0x25d)]=Math[_0x3fa68d(0x803)](BattleManager[_0x3fa68d(0x6cf)][_0x3fa68d(0x4be)]);if(!_0xbac6a0)break;if(BattleManager[_0x3fa68d(0x25d)]!==_0x1627d1)break;if(BattleManager[_0x3fa68d(0x6cf)][_0x3fa68d(0x4be)]<=0x1){BattleManager[_0x3fa68d(0x25d)]=0x0;break;}}BattleManager[_0x3fa68d(0x8c4)]=BattleManager[_0x3fa68d(0x6cf)][BattleManager[_0x3fa68d(0x25d)]]||null,BattleManager['_target']&&_0x57092f[_0x3fa68d(0x890)]()[_0x3fa68d(0x90d)]()!==_0x3fa68d(0x8fd)&&_0x346a10[_0x3fa68d(0x92f)]([_0x57092f]);}),PluginManager[_0x421ee0(0x6bc)](pluginData['name'],_0x421ee0(0x600),_0x43ea2e=>{const _0x26ef9a=_0x421ee0;if(!SceneManager[_0x26ef9a(0x225)]())return;VisuMZ['ConvertParams'](_0x43ea2e,_0x43ea2e);const _0x42d6c0=VisuMZ[_0x26ef9a(0x333)](_0x43ea2e[_0x26ef9a(0x8a6)]);for(const _0x2188a4 of _0x42d6c0){if(!_0x2188a4)continue;if(!_0x2188a4[_0x26ef9a(0x6da)]())continue;_0x2188a4['clearActiveWeaponSlot']();}}),PluginManager[_0x421ee0(0x6bc)](pluginData['name'],'ActSeq_Weapon_NextActiveWeapon',_0x583747=>{const _0x5f4242=_0x421ee0;if(!SceneManager[_0x5f4242(0x225)]())return;VisuMZ[_0x5f4242(0x243)](_0x583747,_0x583747);const _0x3d8ab2=$gameTemp[_0x5f4242(0x869)]();let _0x33da7f=![];const _0x3b63ba=_0x583747[_0x5f4242(0x200)],_0x586e7b=VisuMZ[_0x5f4242(0x333)](_0x583747[_0x5f4242(0x8a6)]);for(const _0x5f0503 of _0x586e7b){if(!_0x5f0503)continue;if(!_0x5f0503[_0x5f4242(0x6da)]())continue;_0x5f0503['nextActiveWeaponSlot'](),_0x5f0503[_0x5f4242(0x80e)]()[_0x5f4242(0x4be)]>0x0?_0x33da7f=!![]:_0x5f0503['clearActiveWeaponSlot']();}_0x33da7f&&_0x3b63ba[_0x5f4242(0x890)]()[_0x5f4242(0x90d)]()!==_0x5f4242(0x8fd)&&_0x3d8ab2[_0x5f4242(0x92f)]([_0x3b63ba]);}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x558),_0x9ab77b=>{const _0x5669ec=_0x421ee0;if(!SceneManager[_0x5669ec(0x225)]())return;VisuMZ[_0x5669ec(0x243)](_0x9ab77b,_0x9ab77b);let _0x320e4d=_0x9ab77b[_0x5669ec(0x688)];_0x320e4d--,_0x320e4d=Math['max'](_0x320e4d,0x0);const _0x2fb896=VisuMZ[_0x5669ec(0x333)](_0x9ab77b[_0x5669ec(0x8a6)]);for(const _0x21da99 of _0x2fb896){if(!_0x21da99)continue;if(!_0x21da99[_0x5669ec(0x6da)]())continue;_0x21da99[_0x5669ec(0x4c4)](_0x320e4d);}}),PluginManager[_0x421ee0(0x6bc)](pluginData[_0x421ee0(0x4ec)],_0x421ee0(0x273),_0x5822c9=>{const _0x4e8846=_0x421ee0;if(!SceneManager[_0x4e8846(0x225)]())return;if(!Imported[_0x4e8846(0x83f)])return;VisuMZ[_0x4e8846(0x243)](_0x5822c9,_0x5822c9);const _0x3cf584=$gameTemp[_0x4e8846(0x869)](),_0xaf6f22=_0x5822c9[_0x4e8846(0x663)];if(!_0x3cf584)return;$gameScreen[_0x4e8846(0x906)](_0x5822c9[_0x4e8846(0x456)],_0x5822c9[_0x4e8846(0x76f)],_0x5822c9['EasingType']);if(_0xaf6f22)_0x3cf584[_0x4e8846(0x396)](_0x4e8846(0x190));}),PluginManager['registerCommand'](pluginData[_0x421ee0(0x4ec)],'ActSeq_Zoom_Reset',_0x17b3b9=>{const _0x26ec45=_0x421ee0;if(!SceneManager[_0x26ec45(0x225)]())return;if(!Imported[_0x26ec45(0x83f)])return;VisuMZ[_0x26ec45(0x243)](_0x17b3b9,_0x17b3b9);const _0x47a443=$gameTemp[_0x26ec45(0x869)](),_0x40d0b8=_0x17b3b9[_0x26ec45(0x663)];if(!_0x47a443)return;$gameScreen['setBattleZoom'](0x1,_0x17b3b9['Duration'],_0x17b3b9[_0x26ec45(0x5f4)]);if(_0x40d0b8)_0x47a443['setWaitMode']('battleZoom');}),PluginManager['registerCommand'](pluginData['name'],'ActSeq_Zoom_WaitForZoom',_0x5e03b1=>{const _0x2ed3b9=_0x421ee0;if(!SceneManager[_0x2ed3b9(0x225)]())return;if(!Imported[_0x2ed3b9(0x83f)])return;const _0x2974ba=$gameTemp[_0x2ed3b9(0x869)]();if(!_0x2974ba)return;_0x2974ba[_0x2ed3b9(0x396)]('battleZoom');}),VisuMZ[_0x421ee0(0x674)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x421ee0(0x2cb)]['onDatabaseLoaded'],Scene_Boot[_0x421ee0(0x2cb)][_0x421ee0(0x900)]=function(){const _0x1abc80=_0x421ee0;this[_0x1abc80(0x226)](),this[_0x1abc80(0x6b8)](),this['process_VisuMZ_BattleCore_DamageStyles'](),this[_0x1abc80(0x662)](),VisuMZ[_0x1abc80(0x674)][_0x1abc80(0x6cd)]['call'](this),this[_0x1abc80(0x919)](),this[_0x1abc80(0x55d)]();},Scene_Boot[_0x421ee0(0x2cb)][_0x421ee0(0x919)]=function(){const _0x34f2d1=_0x421ee0;if(VisuMZ[_0x34f2d1(0x250)])return;this[_0x34f2d1(0x593)](),this['process_VisuMZ_BattleCore_TraitObject_Notetags'](),this['process_VisuMZ_BattleCore_jsFunctions']();},Scene_Boot[_0x421ee0(0x2cb)][_0x421ee0(0x226)]=function(){const _0x37c058=_0x421ee0,_0x5c18c7=$dataSystem[_0x37c058(0x864)][_0x37c058(0x4be)];for(let _0x5dc51b=0x0;_0x5dc51b<_0x5c18c7;_0x5dc51b++){const _0xdfebec=$dataSystem[_0x37c058(0x7f1)][_0x5dc51b];if(_0xdfebec)continue;$dataSystem['attackMotions'][_0x5dc51b]=JsonEx['makeDeepCopy']($dataSystem[_0x37c058(0x7f1)][0x0]);}},Scene_Boot[_0x421ee0(0x2cb)][_0x421ee0(0x6b8)]=function(){const _0x296b21=_0x421ee0,_0x1c97cf=VisuMZ[_0x296b21(0x674)][_0x296b21(0x57b)];_0x1c97cf[_0x296b21(0x60c)][_0x296b21(0x1c0)]===undefined&&(_0x1c97cf[_0x296b21(0x60c)]['PopupPosition']=_0x296b21(0x39f)),_0x1c97cf[_0x296b21(0x92b)][_0x296b21(0x67d)]===undefined&&(_0x1c97cf[_0x296b21(0x92b)]['SmoothImage']=![]),_0x1c97cf[_0x296b21(0x2d2)][_0x296b21(0x67d)]===undefined&&(_0x1c97cf[_0x296b21(0x2d2)][_0x296b21(0x67d)]=!![]),_0x1c97cf[_0x296b21(0x92b)][_0x296b21(0x266)]===undefined&&(_0x1c97cf['Actor'][_0x296b21(0x266)]=![]),_0x1c97cf[_0x296b21(0x92b)][_0x296b21(0x398)]===undefined&&(_0x1c97cf[_0x296b21(0x92b)][_0x296b21(0x398)]=!![]);},VisuMZ[_0x421ee0(0x3a0)]={},Scene_Boot[_0x421ee0(0x2cb)][_0x421ee0(0x289)]=function(){const _0x5c1ff1=_0x421ee0;for(const _0x921611 of VisuMZ[_0x5c1ff1(0x674)]['Settings'][_0x5c1ff1(0x60c)][_0x5c1ff1(0x170)]){if(!_0x921611)continue;const _0x3569db=_0x921611['Name'][_0x5c1ff1(0x890)]()[_0x5c1ff1(0x90d)]();VisuMZ[_0x5c1ff1(0x3a0)][_0x3569db]=_0x921611;}},VisuMZ[_0x421ee0(0x674)]['RegExp']={},Scene_Boot[_0x421ee0(0x2cb)][_0x421ee0(0x662)]=function(){const _0x5187c6=_0x421ee0,_0x313ef9=VisuMZ[_0x5187c6(0x674)]['RegExp'],_0x1e16db='<%1>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1>',_0x149014=[[_0x5187c6(0x738),_0x5187c6(0x205)],[_0x5187c6(0x412),_0x5187c6(0x505)]],_0x5d0ea2=[['%1Apply%2JS',_0x5187c6(0x41e)],[_0x5187c6(0x85e),_0x5187c6(0x675)]],_0x40b39b=[['',''],[_0x5187c6(0x826),'AS\x20USER'],[_0x5187c6(0x4a5),_0x5187c6(0x62d)]];for(const _0x2d3298 of _0x5d0ea2){for(const _0x300b3b of _0x40b39b){for(const _0x3515af of _0x149014){const _0x44a523=_0x2d3298[0x0][_0x5187c6(0x7d7)](_0x3515af[0x0],_0x300b3b[0x0]),_0x1ba388=_0x2d3298[0x1][_0x5187c6(0x7d7)](_0x3515af[0x1],_0x300b3b[0x1])[_0x5187c6(0x90d)](),_0x235b68=new RegExp(_0x1e16db['format'](_0x1ba388),'i');_0x313ef9[_0x44a523]=_0x235b68;}}}const _0x265763=[['%1StartActionJS',_0x5187c6(0x76b)],['%1EndActionJS','JS\x20%1END\x20ACTION']];for(const _0x1925df of _0x265763){for(const _0x5dc639 of _0x149014){const _0x3a0219=_0x1925df[0x0]['format'](_0x5dc639[0x0]),_0xe300e0=_0x1925df[0x1][_0x5187c6(0x7d7)](_0x5dc639[0x1]),_0x2dc8bb=new RegExp(_0x1e16db[_0x5187c6(0x7d7)](_0xe300e0),'i');_0x313ef9[_0x3a0219]=_0x2dc8bb;}}const _0x3ee576=[[_0x5187c6(0x7cd),_0x5187c6(0x2a0)],['%1EndBattleJS',_0x5187c6(0x2e8)],[_0x5187c6(0x614),_0x5187c6(0x7ac)],[_0x5187c6(0x692),_0x5187c6(0x322)],[_0x5187c6(0x37f),_0x5187c6(0x1c9)],[_0x5187c6(0x4bd),'JS\x20ESCAPE\x20FAILURE'],[_0x5187c6(0x533),_0x5187c6(0x51f)],[_0x5187c6(0x209),_0x5187c6(0x491)],[_0x5187c6(0x33d),_0x5187c6(0x61c)]];for(const _0x464c6a of _0x3ee576){for(const _0x1b11b2 of _0x149014){const _0x19a09a=_0x464c6a[0x0][_0x5187c6(0x7d7)](_0x1b11b2[0x0]),_0x4e58ad=_0x464c6a[0x1][_0x5187c6(0x7d7)](_0x1b11b2[0x1]),_0x4187ff=new RegExp(_0x1e16db[_0x5187c6(0x7d7)](_0x4e58ad),'i');_0x313ef9[_0x19a09a]=_0x4187ff;}}},Scene_Boot[_0x421ee0(0x2cb)][_0x421ee0(0x593)]=function(){const _0x3c1d7d=_0x421ee0,_0x2b1a6=$dataSkills['concat']($dataItems);for(const _0x104844 of _0x2b1a6){if(!_0x104844)continue;VisuMZ[_0x3c1d7d(0x674)][_0x3c1d7d(0x302)](_0x104844);}},Scene_Boot[_0x421ee0(0x2cb)][_0x421ee0(0x495)]=function(){const _0xeb1191=_0x421ee0,_0x35683c=$dataActors[_0xeb1191(0x378)]($dataClasses,$dataWeapons,$dataArmors,$dataEnemies,$dataStates);for(const _0x1dc90a of _0x35683c){if(!_0x1dc90a)continue;VisuMZ[_0xeb1191(0x674)]['Parse_Notetags_TraitObjects'](_0x1dc90a);}},Scene_Boot['prototype'][_0x421ee0(0x55d)]=function(){const _0x2cc52b=_0x421ee0,_0x593928=VisuMZ[_0x2cc52b(0x674)][_0x2cc52b(0x57b)][_0x2cc52b(0x203)]['BaseTroopIDs'],_0x26f12b=[];for(const _0x520bb6 of _0x593928){const _0x2f9e53=$dataTroops[_0x520bb6];if(_0x2f9e53)_0x26f12b[_0x2cc52b(0x7b3)](JsonEx[_0x2cc52b(0x4ed)](_0x2f9e53));}for(const _0x65d301 of $dataTroops){if(!_0x65d301)continue;for(const _0x36af92 of _0x26f12b){if(_0x36af92['id']===_0x65d301['id'])continue;_0x65d301[_0x2cc52b(0x73e)]=_0x65d301['pages']['concat'](_0x36af92['pages']);}}},Scene_Boot[_0x421ee0(0x2cb)][_0x421ee0(0x91d)]=function(){const _0x350e51=_0x421ee0,_0x99396a=$dataSkills['concat']($dataItems);for(const _0x86c8a0 of _0x99396a){if(!_0x86c8a0)continue;VisuMZ['BattleCore'][_0x350e51(0x56f)](_0x86c8a0);}},VisuMZ['BattleCore'][_0x421ee0(0x881)]=VisuMZ[_0x421ee0(0x881)],VisuMZ[_0x421ee0(0x881)]=function(_0x32541d){const _0x5488cc=_0x421ee0;VisuMZ['BattleCore'][_0x5488cc(0x881)]&&VisuMZ[_0x5488cc(0x674)][_0x5488cc(0x881)][_0x5488cc(0x8eb)](this,_0x32541d),VisuMZ[_0x5488cc(0x674)]['Parse_Notetags_TraitObjects'](_0x32541d);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x87b)]=VisuMZ[_0x421ee0(0x87b)],VisuMZ[_0x421ee0(0x87b)]=function(_0x2d5401){const _0x1b7c1a=_0x421ee0;VisuMZ[_0x1b7c1a(0x674)][_0x1b7c1a(0x87b)]&&VisuMZ[_0x1b7c1a(0x674)]['ParseClassNotetags'][_0x1b7c1a(0x8eb)](this,_0x2d5401),VisuMZ['BattleCore'][_0x1b7c1a(0x278)](_0x2d5401);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x2f1)]=VisuMZ[_0x421ee0(0x2f1)],VisuMZ[_0x421ee0(0x2f1)]=function(_0x457d8f){const _0x2cde78=_0x421ee0;VisuMZ[_0x2cde78(0x674)]['ParseSkillNotetags']&&VisuMZ['BattleCore']['ParseSkillNotetags'][_0x2cde78(0x8eb)](this,_0x457d8f),VisuMZ[_0x2cde78(0x674)][_0x2cde78(0x302)](_0x457d8f),VisuMZ['BattleCore'][_0x2cde78(0x56f)](_0x457d8f);},VisuMZ[_0x421ee0(0x674)]['ParseItemNotetags']=VisuMZ['ParseItemNotetags'],VisuMZ[_0x421ee0(0x348)]=function(_0x481f9f){const _0x276e46=_0x421ee0;VisuMZ['BattleCore']['ParseItemNotetags']&&VisuMZ[_0x276e46(0x674)][_0x276e46(0x348)][_0x276e46(0x8eb)](this,_0x481f9f),VisuMZ[_0x276e46(0x674)]['Parse_Notetags_Action'](_0x481f9f),VisuMZ[_0x276e46(0x674)][_0x276e46(0x56f)](_0x481f9f);},VisuMZ['BattleCore'][_0x421ee0(0x669)]=VisuMZ[_0x421ee0(0x669)],VisuMZ[_0x421ee0(0x669)]=function(_0x3bfb2c){const _0x3899ed=_0x421ee0;VisuMZ[_0x3899ed(0x674)][_0x3899ed(0x669)]&&VisuMZ[_0x3899ed(0x674)][_0x3899ed(0x669)][_0x3899ed(0x8eb)](this,_0x3bfb2c),VisuMZ['BattleCore']['Parse_Notetags_TraitObjects'](_0x3bfb2c);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x896)]=VisuMZ[_0x421ee0(0x896)],VisuMZ['ParseArmorNotetags']=function(_0x14a5d2){const _0x879f8d=_0x421ee0;VisuMZ[_0x879f8d(0x674)]['ParseArmorNotetags']&&VisuMZ[_0x879f8d(0x674)]['ParseArmorNotetags'][_0x879f8d(0x8eb)](this,_0x14a5d2),VisuMZ[_0x879f8d(0x674)][_0x879f8d(0x278)](_0x14a5d2);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x525)]=VisuMZ[_0x421ee0(0x525)],VisuMZ[_0x421ee0(0x525)]=function(_0x17ef17){const _0xb2b459=_0x421ee0;VisuMZ[_0xb2b459(0x674)][_0xb2b459(0x525)]&&VisuMZ[_0xb2b459(0x674)]['ParseEnemyNotetags'][_0xb2b459(0x8eb)](this,_0x17ef17),VisuMZ[_0xb2b459(0x674)]['Parse_Notetags_TraitObjects'](_0x17ef17);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x7df)]=VisuMZ[_0x421ee0(0x7df)],VisuMZ[_0x421ee0(0x7df)]=function(_0x4f6adf){const _0x2cec25=_0x421ee0;VisuMZ[_0x2cec25(0x674)]['ParseStateNotetags']&&VisuMZ[_0x2cec25(0x674)][_0x2cec25(0x7df)][_0x2cec25(0x8eb)](this,_0x4f6adf),VisuMZ[_0x2cec25(0x674)][_0x2cec25(0x278)](_0x4f6adf);},VisuMZ[_0x421ee0(0x674)]['Parse_Notetags_Action']=function(_0x32cb7c){const _0x582df7=_0x421ee0,_0x271882=[_0x582df7(0x271),_0x582df7(0x6fc),_0x582df7(0x818),_0x582df7(0x65f),_0x582df7(0x7d1),_0x582df7(0x431),_0x582df7(0x1bf),_0x582df7(0x373)];for(const _0x7fce6f of _0x271882){VisuMZ[_0x582df7(0x674)]['createJS'](_0x32cb7c,_0x7fce6f);}const _0x19d1d9=_0x32cb7c[_0x582df7(0x24c)];_0x19d1d9[_0x582df7(0x5f2)](/<ALWAYS CRITICAL/i)&&(_0x32cb7c[_0x582df7(0x760)][_0x582df7(0x76c)]=!![]),_0x19d1d9[_0x582df7(0x5f2)](/<(?:REPEAT|REPEATS|REPEAT HITS):[ ](\d+)/i)&&(_0x32cb7c[_0x582df7(0x5b7)]=Math['max'](0x1,Number(RegExp['$1']))),_0x19d1d9[_0x582df7(0x5f2)](/<TARGET:[ ](.*)>/i)&&(_0x32cb7c[_0x582df7(0x1a8)]=String(RegExp['$1'])[_0x582df7(0x890)]()[_0x582df7(0x90d)]());},VisuMZ['BattleCore'][_0x421ee0(0x278)]=function(_0x34d8e2){const _0x179a48=_0x421ee0,_0x4f36c6=[_0x179a48(0x1d6),_0x179a48(0x7b4),_0x179a48(0x466),_0x179a48(0x189),_0x179a48(0x55b),'PostApplyAsTargetJS',_0x179a48(0x40e),'PostDamageAsTargetJS',_0x179a48(0x7d1),_0x179a48(0x431),_0x179a48(0x1bf),_0x179a48(0x373),_0x179a48(0x4ef),_0x179a48(0x524),_0x179a48(0x683),_0x179a48(0x6e9),_0x179a48(0x614),_0x179a48(0x692),'EscapeSuccessJS','EscapeFailureJS',_0x179a48(0x2db),_0x179a48(0x6c9),_0x179a48(0x2a8),_0x179a48(0x894),_0x179a48(0x417),_0x179a48(0x6b5)];for(const _0x3dbb00 of _0x4f36c6){VisuMZ[_0x179a48(0x674)]['createJS'](_0x34d8e2,_0x3dbb00);}},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x56f)]=function(_0x554eb3){const _0x4f88f0=_0x421ee0,_0x436de8=_0x554eb3[_0x4f88f0(0x24c)];if(_0x436de8['match'](/<JS TARGETS>\s*([\s\S]*)\s*<\/JS TARGETS>/i)){const _0x550f94=String(RegExp['$1']),_0x4aeeab=VisuMZ['BattleCore'][_0x4f88f0(0x4f1)](_0x554eb3,_0x4f88f0(0x8a6));VisuMZ[_0x4f88f0(0x674)]['createTargetsJS'](_0x550f94,_0x4aeeab);}if(_0x436de8['match'](/<JS COMMAND (?:VISIBLE|SHOW|HIDE)>\s*([\s\S]*)\s*<\/JS COMMAND (?:VISIBLE|SHOW|HIDE)>/i)){const _0x2d03df=String(RegExp['$1']),_0x32e802=VisuMZ[_0x4f88f0(0x674)][_0x4f88f0(0x4f1)](_0x554eb3,_0x4f88f0(0x586));VisuMZ[_0x4f88f0(0x674)][_0x4f88f0(0x404)](_0x2d03df,_0x32e802);}},VisuMZ[_0x421ee0(0x674)]['JS']={},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x6f4)]=function(_0x52f4d7,_0x2969af){const _0x559bcd=_0x421ee0,_0x277c24=_0x52f4d7['note'];if(_0x277c24[_0x559bcd(0x5f2)](VisuMZ[_0x559bcd(0x674)][_0x559bcd(0x24b)][_0x2969af])){const _0x39b49e=RegExp['$1'],_0x442335=_0x559bcd(0x4ab)[_0x559bcd(0x7d7)](_0x39b49e),_0x41b11d=VisuMZ[_0x559bcd(0x674)][_0x559bcd(0x4f1)](_0x52f4d7,_0x2969af);VisuMZ[_0x559bcd(0x674)]['JS'][_0x41b11d]=new Function(_0x442335);}},VisuMZ[_0x421ee0(0x674)]['createKeyJS']=function(_0x501faa,_0x105491){const _0x2f18ab=_0x421ee0;let _0x2a9918='';if($dataActors['includes'](_0x501faa))_0x2a9918=_0x2f18ab(0x423)[_0x2f18ab(0x7d7)](_0x501faa['id'],_0x105491);if($dataClasses[_0x2f18ab(0x7f2)](_0x501faa))_0x2a9918=_0x2f18ab(0x8cd)[_0x2f18ab(0x7d7)](_0x501faa['id'],_0x105491);if($dataSkills[_0x2f18ab(0x7f2)](_0x501faa))_0x2a9918=_0x2f18ab(0x822)['format'](_0x501faa['id'],_0x105491);if($dataItems[_0x2f18ab(0x7f2)](_0x501faa))_0x2a9918=_0x2f18ab(0x7d6)[_0x2f18ab(0x7d7)](_0x501faa['id'],_0x105491);if($dataWeapons[_0x2f18ab(0x7f2)](_0x501faa))_0x2a9918=_0x2f18ab(0x52c)['format'](_0x501faa['id'],_0x105491);if($dataArmors['includes'](_0x501faa))_0x2a9918=_0x2f18ab(0x734)[_0x2f18ab(0x7d7)](_0x501faa['id'],_0x105491);if($dataEnemies[_0x2f18ab(0x7f2)](_0x501faa))_0x2a9918=_0x2f18ab(0x28e)[_0x2f18ab(0x7d7)](_0x501faa['id'],_0x105491);if($dataStates[_0x2f18ab(0x7f2)](_0x501faa))_0x2a9918=_0x2f18ab(0x7a4)[_0x2f18ab(0x7d7)](_0x501faa['id'],_0x105491);return _0x2a9918;},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x5f1)]=function(_0x2a91fb,_0x1df0c5){const _0x5bedce='\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20targets\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20targets\x20||\x20[];\x0a\x20\x20\x20\x20'['format'](_0x2a91fb);VisuMZ['BattleCore']['JS'][_0x1df0c5]=new Function(_0x5bedce);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x404)]=function(_0xe3d1ba,_0x356cd4){const _0x29e95b=_0x421ee0,_0x2dfa81=_0x29e95b(0x1de)['format'](_0xe3d1ba);VisuMZ['BattleCore']['JS'][_0x356cd4]=new Function(_0x2dfa81);},TextManager[_0x421ee0(0x1c1)]=VisuMZ['BattleCore'][_0x421ee0(0x57b)][_0x421ee0(0x30c)][_0x421ee0(0x3ef)],TextManager[_0x421ee0(0x72c)]=VisuMZ[_0x421ee0(0x674)]['Settings'][_0x421ee0(0x8ed)]['StartName'],TextManager[_0x421ee0(0x3d2)]=VisuMZ[_0x421ee0(0x674)]['Settings']['AutoBattle'][_0x421ee0(0x4e6)],TextManager['visualHpGauge']=VisuMZ['BattleCore']['Settings'][_0x421ee0(0x3e4)]['Name'],ColorManager[_0x421ee0(0x172)]=function(_0x21ed9d){const _0x30ba55=_0x421ee0;return _0x21ed9d=String(_0x21ed9d),_0x21ed9d['match'](/#(.*)/i)?_0x30ba55(0x7ba)['format'](String(RegExp['$1'])):this[_0x30ba55(0x1e6)](Number(_0x21ed9d));},DataManager[_0x421ee0(0x693)]=function(_0x2346b5){const _0x60d721=_0x421ee0;if(_0x2346b5[_0x60d721(0x24c)][_0x60d721(0x5f2)](/<DAMAGE STYLE:[ ](.*)>/i)){const _0x188368=String(RegExp['$1'])[_0x60d721(0x890)]()[_0x60d721(0x90d)]();if(_0x188368==='MANUAL')return'MANUAL';if(VisuMZ[_0x60d721(0x3a0)][_0x188368])return _0x188368;}const _0x42dfcc=VisuMZ[_0x60d721(0x674)][_0x60d721(0x57b)][_0x60d721(0x60c)][_0x60d721(0x415)][_0x60d721(0x890)]()['trim']();if(VisuMZ[_0x60d721(0x3a0)][_0x42dfcc])return _0x42dfcc;return _0x60d721(0x24d);},DataManager[_0x421ee0(0x735)]=function(_0x5a3014){const _0x4dacaf=_0x421ee0;_0x5a3014=_0x5a3014['toUpperCase']()['trim'](),this[_0x4dacaf(0x756)]=this[_0x4dacaf(0x756)]||{};if(this[_0x4dacaf(0x756)][_0x5a3014])return this[_0x4dacaf(0x756)][_0x5a3014];for(let _0x1f1fb8=0x1;_0x1f1fb8<0x64;_0x1f1fb8++){if(!$dataSystem['skillTypes'][_0x1f1fb8])continue;let _0xa48592=$dataSystem[_0x4dacaf(0x452)][_0x1f1fb8]['toUpperCase']()[_0x4dacaf(0x90d)]();_0xa48592=_0xa48592['replace'](/\x1I\[(\d+)\]/gi,''),_0xa48592=_0xa48592[_0x4dacaf(0x4ce)](/\\I\[(\d+)\]/gi,''),this[_0x4dacaf(0x756)][_0xa48592]=_0x1f1fb8;}return this[_0x4dacaf(0x756)][_0x5a3014]||0x0;},DataManager[_0x421ee0(0x2c7)]=function(_0x2f8ade){const _0x5c72a4=_0x421ee0;_0x2f8ade=_0x2f8ade['toUpperCase']()[_0x5c72a4(0x90d)](),this['_skillIDs']=this['_skillIDs']||{};if(this[_0x5c72a4(0x1fc)][_0x2f8ade])return this[_0x5c72a4(0x1fc)][_0x2f8ade];for(const _0x230342 of $dataSkills){if(!_0x230342)continue;this[_0x5c72a4(0x1fc)][_0x230342[_0x5c72a4(0x4ec)][_0x5c72a4(0x890)]()[_0x5c72a4(0x90d)]()]=_0x230342['id'];}return this['_skillIDs'][_0x2f8ade]||0x0;},DataManager[_0x421ee0(0x752)]=function(_0x21899b){const _0x28f80c=_0x421ee0;_0x21899b=_0x21899b[_0x28f80c(0x890)]()[_0x28f80c(0x90d)](),this[_0x28f80c(0x54e)]=this['_enemyIDs']||{};if(this[_0x28f80c(0x54e)][_0x21899b])return this[_0x28f80c(0x54e)][_0x21899b];for(const _0x2eddbe of $dataEnemies){if(!_0x2eddbe)continue;this[_0x28f80c(0x54e)][_0x2eddbe[_0x28f80c(0x4ec)][_0x28f80c(0x890)]()[_0x28f80c(0x90d)]()]=_0x2eddbe['id'];}return this[_0x28f80c(0x54e)][_0x21899b]||0x0;},DataManager[_0x421ee0(0x1fe)]=function(_0x2ec12f){const _0x303153=_0x421ee0;_0x2ec12f=_0x2ec12f[_0x303153(0x890)]()['trim'](),this[_0x303153(0x166)]=this[_0x303153(0x166)]||{};if(this['_wtypeIDs'][_0x2ec12f])return this[_0x303153(0x166)][_0x2ec12f];for(let _0x287def=0x1;_0x287def<0x64;_0x287def++){if(!$dataSystem[_0x303153(0x864)][_0x287def])continue;let _0x125d0c=$dataSystem['weaponTypes'][_0x287def][_0x303153(0x890)]()[_0x303153(0x90d)]();_0x125d0c=_0x125d0c['replace'](/\x1I\[(\d+)\]/gi,''),_0x125d0c=_0x125d0c[_0x303153(0x4ce)](/\\I\[(\d+)\]/gi,''),this[_0x303153(0x166)][_0x125d0c]=_0x287def;}return this[_0x303153(0x166)]['BARE\x20HANDS']=0x0,this['_wtypeIDs'][_0x2ec12f]||0x0;},DataManager['battleDisplayText']=function(_0x7d1d){const _0xfee459=_0x421ee0,_0x3efcbc='\x5cI[%1]%2';let _0x25ae8b=_0x7d1d[_0xfee459(0x20f)],_0x7fe3fd=_0x7d1d[_0xfee459(0x4ec)];const _0x4f9e67=_0x7d1d[_0xfee459(0x24c)];return _0x4f9e67[_0xfee459(0x5f2)](/<DISPLAY ICON: (\d+)>/i)&&(_0x25ae8b=Number(RegExp['$1'])),_0x4f9e67[_0xfee459(0x5f2)](/<DISPLAY TEXT: (.*)>/i)&&(_0x7fe3fd=String(RegExp['$1'])),_0x3efcbc[_0xfee459(0x7d7)](_0x25ae8b,_0x7fe3fd);},DataManager[_0x421ee0(0x7da)]=function(_0x59b39d){const _0x4e458d=_0x421ee0;return _0x59b39d['note'][_0x4e458d(0x5f2)](/<COMMAND TEXT: (.*)>/i)?String(RegExp['$1']):_0x59b39d['name'];},DataManager[_0x421ee0(0x1a2)]=function(_0x3e5dc8){const _0x17214f=_0x421ee0;return _0x3e5dc8[_0x17214f(0x24c)][_0x17214f(0x5f2)](/<COMMAND ICON: (\d+)>/i)?Number(RegExp['$1']):_0x3e5dc8['iconIndex'];},DataManager[_0x421ee0(0x4ac)]=function(_0x21e35f){const _0x9b8f00=_0x421ee0,_0x5702af=$dataEnemies[_0x21e35f];if(_0x5702af){if(_0x5702af[_0x9b8f00(0x24c)]['match'](/<SWAP ENEMIES>\s*([\s\S]*)\s*<\/SWAP ENEMIES>/i)){const _0x4e789b=String(RegExp['$1'])[_0x9b8f00(0x6d8)](/[\r\n]+/)[_0x9b8f00(0x60e)](''),_0x31f4bd=this['processRandomizedData'](_0x4e789b);_0x21e35f=this[_0x9b8f00(0x752)](_0x31f4bd)||_0x21e35f,_0x21e35f=DataManager[_0x9b8f00(0x4ac)](_0x21e35f);}}return _0x21e35f;},DataManager[_0x421ee0(0x385)]=function(_0x13b04d){const _0x5dd302=_0x421ee0;let _0x27f785=0x0;const _0x3811e0={};for(const _0xb69379 of _0x13b04d){if(_0xb69379['match'](/(.*):[ ](\d+)/i)){const _0x233ab2=String(RegExp['$1'])['trim'](),_0xe1b2e1=Number(RegExp['$2']);_0x3811e0[_0x233ab2]=_0xe1b2e1,_0x27f785+=_0xe1b2e1;}else{if(_0xb69379[_0x5dd302(0x5f2)](/(.*):[ ](\d+\.?\d+)/i)){const _0x4c8d1e=String(RegExp['$1'])[_0x5dd302(0x90d)](),_0x4dae72=Number(RegExp['$2']);_0x3811e0[_0x4c8d1e]=_0x4dae72,_0x27f785+=_0x4dae72;}else _0xb69379!==''&&(_0x3811e0[_0xb69379]=0x1,_0x27f785++);}}if(_0x27f785<=0x0)return'';let _0x4844b3=Math[_0x5dd302(0x7c1)]()*_0x27f785;for(const _0x48a4f3 in _0x3811e0){_0x4844b3-=_0x3811e0[_0x48a4f3];if(_0x4844b3<=0x0)return _0x48a4f3;}return'';},DataManager[_0x421ee0(0x3b1)]=function(_0x1c6e1f){const _0x3268ce=_0x421ee0;if(!_0x1c6e1f)return![];if(!VisuMZ[_0x3268ce(0x674)][_0x3268ce(0x57b)][_0x3268ce(0x16d)][_0x3268ce(0x18d)])return![];if(_0x1c6e1f[_0x3268ce(0x24c)][_0x3268ce(0x5f2)](/<AUTO ACTION SEQUENCE>/i))return![];if(_0x1c6e1f['note']['match'](/<COMMON (?:EVENT|EVENTS):[ ](.*)>/gi))return!![];for(const _0x3f6b6e of _0x1c6e1f['effects']){if(!_0x3f6b6e)continue;if(_0x3f6b6e[_0x3268ce(0x346)]===Game_Action['EFFECT_COMMON_EVENT'])return!![];}return![];},ConfigManager[_0x421ee0(0x46c)]=![],ConfigManager[_0x421ee0(0x68d)]=![],ConfigManager['visualHpGauge']=!![],VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x44f)]=ConfigManager[_0x421ee0(0x19d)],ConfigManager[_0x421ee0(0x19d)]=function(){const _0x7635bd=_0x421ee0,_0x50dce4=VisuMZ[_0x7635bd(0x674)]['ConfigManager_makeData']['call'](this);return _0x50dce4['autoBattleAtStart']=this[_0x7635bd(0x46c)],_0x50dce4[_0x7635bd(0x68d)]=this['autoBattleUseSkills'],_0x50dce4['visualHpGauge']=this[_0x7635bd(0x2ae)],_0x50dce4;},VisuMZ['BattleCore']['ConfigManager_applyData']=ConfigManager['applyData'],ConfigManager[_0x421ee0(0x765)]=function(_0x37b73d){const _0x315790=_0x421ee0;VisuMZ['BattleCore'][_0x315790(0x3f7)]['call'](this,_0x37b73d),_0x315790(0x46c)in _0x37b73d?this[_0x315790(0x46c)]=_0x37b73d[_0x315790(0x46c)]:this['autoBattleAtStart']=![],_0x315790(0x68d)in _0x37b73d?this[_0x315790(0x68d)]=_0x37b73d['autoBattleUseSkills']:this[_0x315790(0x68d)]=![],_0x315790(0x2ae)in _0x37b73d?this[_0x315790(0x2ae)]=_0x37b73d[_0x315790(0x2ae)]:this[_0x315790(0x2ae)]=!![];},VisuMZ['BattleCore'][_0x421ee0(0x389)]=BattleManager[_0x421ee0(0x3a7)],BattleManager[_0x421ee0(0x3a7)]=function(){const _0x2868b6=_0x421ee0;VisuMZ[_0x2868b6(0x674)][_0x2868b6(0x389)]['call'](this),this[_0x2868b6(0x577)]=[];},BattleManager['refreshStatusWindow']=function(){const _0x44edf4=_0x421ee0;if(!SceneManager[_0x44edf4(0x225)]())return;const _0x26cc0b=SceneManager[_0x44edf4(0x855)][_0x44edf4(0x1df)];if(_0x26cc0b)_0x26cc0b[_0x44edf4(0x574)]();},BattleManager[_0x421ee0(0x330)]=function(){const _0x136498=_0x421ee0;if(BattleManager['isTpb']())return _0x136498(0x664);return _0x136498(0x331);},BattleManager[_0x421ee0(0x742)]=function(_0x4b1aa4){const _0x394ff2=_0x421ee0;return _0x4b1aa4=_0x4b1aa4[_0x394ff2(0x890)]()[_0x394ff2(0x90d)](),this[_0x394ff2(0x330)]()===_0x4b1aa4;},BattleManager[_0x421ee0(0x4b0)]=function(){const _0x384583=_0x421ee0;return this['isBattleSys'](_0x384583(0x331));},BattleManager[_0x421ee0(0x696)]=function(){const _0x4398cc=_0x421ee0;return this[_0x4398cc(0x4b0)]();},BattleManager[_0x421ee0(0x7bc)]=function(){return!this['isTurnBased']();},BattleManager['isTeamBased']=function(){const _0x35042b=_0x421ee0;return!this[_0x35042b(0x696)]()&&!this[_0x35042b(0x7bc)]();},BattleManager[_0x421ee0(0x4bf)]=function(_0x4e8454){const _0x2e09a7=_0x421ee0;$gameParty[_0x2e09a7(0x4bf)](_0x4e8454),$gameTroop[_0x2e09a7(0x4bf)](_0x4e8454);},VisuMZ[_0x421ee0(0x674)]['BattleManager_startBattle']=BattleManager[_0x421ee0(0x6cb)],BattleManager[_0x421ee0(0x6cb)]=function(){const _0x400cef=_0x421ee0;this['_endBattle']=![],this[_0x400cef(0x228)]=ConfigManager[_0x400cef(0x46c)],this['processBattleCoreJS'](_0x400cef(0x4ef)),VisuMZ['BattleCore']['BattleManager_startBattle'][_0x400cef(0x8eb)](this),this[_0x400cef(0x4bf)]('PostStartBattleJS');},BattleManager[_0x421ee0(0x4a4)]=function(_0x1a8a20){const _0x4cd432=_0x421ee0,_0xe4d0c9=VisuMZ['BattleCore'][_0x4cd432(0x57b)][_0x4cd432(0x203)];_0xe4d0c9[_0x4cd432(0x717)]&&VisuMZ[_0x4cd432(0x674)][_0x4cd432(0x79a)](_0xe4d0c9[_0x4cd432(0x717)])&&$gameTemp[_0x4cd432(0x7cf)](_0xe4d0c9[_0x4cd432(0x717)]);const _0x224499=_0x4cd432(0x459)[_0x4cd432(0x7d7)](_0x1a8a20);_0xe4d0c9[_0x224499]&&VisuMZ[_0x4cd432(0x674)]['CheckMapBattleEventValid'](_0xe4d0c9[_0x224499])&&$gameTemp['reserveCommonEvent'](_0xe4d0c9[_0x224499]);},VisuMZ['BattleCore'][_0x421ee0(0x5b0)]=BattleManager[_0x421ee0(0x20a)],BattleManager[_0x421ee0(0x20a)]=function(){const _0x463278=_0x421ee0;this['processBattleCoreJS'](_0x463278(0x614)),VisuMZ[_0x463278(0x674)]['BattleManager_processVictory'][_0x463278(0x8eb)](this),this[_0x463278(0x4a4)](_0x463278(0x866));},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x8d7)]=BattleManager[_0x421ee0(0x48c)],BattleManager['processDefeat']=function(){const _0x2a921d=_0x421ee0;this['processBattleCoreJS']('BattleDefeatJS'),VisuMZ[_0x2a921d(0x674)][_0x2a921d(0x8d7)][_0x2a921d(0x8eb)](this),this[_0x2a921d(0x4a4)](_0x2a921d(0x737));},VisuMZ['BattleCore']['BattleManager_endBattle']=BattleManager['endBattle'],BattleManager['endBattle']=function(_0x4902fd){const _0x138c1b=_0x421ee0;this[_0x138c1b(0x91a)]=!![],this[_0x138c1b(0x228)]=![],this[_0x138c1b(0x4bf)](_0x138c1b(0x683)),VisuMZ[_0x138c1b(0x674)][_0x138c1b(0x207)]['call'](this,_0x4902fd),this['processBattleCoreJS'](_0x138c1b(0x6e9));},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x710)]=BattleManager[_0x421ee0(0x16f)],BattleManager[_0x421ee0(0x16f)]=function(){const _0x54369d=_0x421ee0;if(this[_0x54369d(0x696)]())this[_0x54369d(0x4bf)]('PreStartTurnJS');VisuMZ[_0x54369d(0x674)][_0x54369d(0x710)][_0x54369d(0x8eb)](this);if(this[_0x54369d(0x696)]())this[_0x54369d(0x4bf)](_0x54369d(0x6c9));},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x539)]=BattleManager[_0x421ee0(0x429)],BattleManager[_0x421ee0(0x429)]=function(){const _0x4c866b=_0x421ee0,_0x1a23b9=this[_0x4c866b(0x562)][_0x4c866b(0x880)]();if(_0x1a23b9)_0x1a23b9['actionBattleCoreJS'](_0x4c866b(0x7d1));VisuMZ['BattleCore'][_0x4c866b(0x539)][_0x4c866b(0x8eb)](this);if(_0x1a23b9)_0x1a23b9[_0x4c866b(0x487)]('PostStartActionJS');},VisuMZ[_0x421ee0(0x674)]['BattleManager_endAction']=BattleManager['endAction'],BattleManager[_0x421ee0(0x28a)]=function(){const _0x2fe9dd=_0x421ee0,_0x301a2f=this['_action'];_0x301a2f&&_0x301a2f[_0x2fe9dd(0x487)]('PreEndActionJS'),VisuMZ['BattleCore'][_0x2fe9dd(0x62c)][_0x2fe9dd(0x8eb)](this),_0x301a2f&&_0x301a2f[_0x2fe9dd(0x487)](_0x2fe9dd(0x373)),this['refreshBattlerMotions'](this[_0x2fe9dd(0x2b1)]());},BattleManager[_0x421ee0(0x25c)]=function(_0x3c62a9){const _0x4946c4=_0x421ee0;for(const _0x345cf1 of _0x3c62a9){if(!_0x345cf1)continue;if(!_0x345cf1['battler']())continue;_0x345cf1[_0x4946c4(0x35a)]()['refreshMotion']();}},BattleManager[_0x421ee0(0x78d)]=function(){const _0x5813f8=_0x421ee0;!this[_0x5813f8(0x548)]['isBusy']()&&this[_0x5813f8(0x28a)]();},Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x1b1)]=function(){const _0x3ed045=_0x421ee0;this[_0x3ed045(0x931)]();if(Imported[_0x3ed045(0x40b)]){const _0x3a6975=VisuMZ['SkillsStatesCore'][_0x3ed045(0x57b)][_0x3ed045(0x26e)];_0x3a6975&&_0x3a6975[_0x3ed045(0x59c)]===![]&&this[_0x3ed045(0x522)](0x1);}else this['removeStatesAuto'](0x1);this['removeBuffsAuto']();},BattleManager[_0x421ee0(0x67f)]=function(){const _0x13c76e=_0x421ee0;this[_0x13c76e(0x30f)]=VisuMZ['BattleCore'][_0x13c76e(0x57b)][_0x13c76e(0x203)][_0x13c76e(0x6c0)][_0x13c76e(0x8eb)](this);},VisuMZ[_0x421ee0(0x674)]['BattleManager_onEscapeSuccess']=BattleManager[_0x421ee0(0x7d0)],BattleManager[_0x421ee0(0x7d0)]=function(){const _0x5ac662=_0x421ee0;this['processBattleCoreJS']('EscapeSuccessJS'),BattleManager[_0x5ac662(0x6c2)][_0x5ac662(0x3e2)](),VisuMZ['BattleCore'][_0x5ac662(0x762)][_0x5ac662(0x8eb)](this),this[_0x5ac662(0x4a4)](_0x5ac662(0x4a7));},VisuMZ['BattleCore'][_0x421ee0(0x3b8)]=BattleManager[_0x421ee0(0x8ce)],BattleManager[_0x421ee0(0x8ce)]=function(){const _0x29019d=_0x421ee0;this[_0x29019d(0x4bf)](_0x29019d(0x4bd));const _0x391ee3=this[_0x29019d(0x30f)];VisuMZ['BattleCore'][_0x29019d(0x3b8)][_0x29019d(0x8eb)](this),this[_0x29019d(0x30f)]=_0x391ee3+VisuMZ[_0x29019d(0x674)]['Settings'][_0x29019d(0x203)][_0x29019d(0x29c)][_0x29019d(0x8eb)](this),this[_0x29019d(0x4a4)](_0x29019d(0x898));},BattleManager['displayStartMessages']=function(){const _0x32cb89=_0x421ee0;let _0x245a92=![];if(this[_0x32cb89(0x5a2)]())for(const _0x2a8cfd of $gameTroop['enemyNames']()){this[_0x32cb89(0x548)][_0x32cb89(0x7b3)](_0x32cb89(0x4c0),TextManager[_0x32cb89(0x549)][_0x32cb89(0x7d7)](_0x2a8cfd)),this[_0x32cb89(0x548)][_0x32cb89(0x7b3)]('wait'),_0x245a92=!![];}if(this[_0x32cb89(0x29d)])this[_0x32cb89(0x548)][_0x32cb89(0x7b3)](_0x32cb89(0x4c0),TextManager[_0x32cb89(0x5d6)][_0x32cb89(0x7d7)]($gameParty[_0x32cb89(0x4ec)]())),this[_0x32cb89(0x548)]['push']('wait');else this[_0x32cb89(0x1a0)]&&(this['_logWindow']['push'](_0x32cb89(0x4c0),TextManager['surprise']['format']($gameParty[_0x32cb89(0x4ec)]())),this['_logWindow'][_0x32cb89(0x7b3)](_0x32cb89(0x186)));_0x245a92&&(this[_0x32cb89(0x548)]['push'](_0x32cb89(0x186)),this['_logWindow']['push'](_0x32cb89(0x564))),this[_0x32cb89(0x67c)]()&&this[_0x32cb89(0x707)]()&&(this[_0x32cb89(0x87e)]=![]);},BattleManager[_0x421ee0(0x5a2)]=function(){const _0xac7dcb=_0x421ee0;if(BattleManager[_0xac7dcb(0x228)])return![];return VisuMZ['BattleCore']['Settings']['Enemy'][_0xac7dcb(0x56d)];},VisuMZ['BattleCore'][_0x421ee0(0x527)]=BattleManager[_0x421ee0(0x775)],BattleManager[_0x421ee0(0x775)]=function(){const _0x1d510c=_0x421ee0;VisuMZ[_0x1d510c(0x674)]['BattleManager_startInput'][_0x1d510c(0x8eb)](this),this[_0x1d510c(0x4b0)]()&&this['isSkipPartyCommandWindow']()&&!this['_surprise']&&$gameParty[_0x1d510c(0x8a8)]()&&this[_0x1d510c(0x617)]();},BattleManager[_0x421ee0(0x707)]=function(){const _0x3c2ba4=_0x421ee0;return VisuMZ[_0x3c2ba4(0x674)][_0x3c2ba4(0x57b)][_0x3c2ba4(0x30c)][_0x3c2ba4(0x3f4)];},BattleManager['checkTpbInputOpen']=function(){const _0x3fe866=_0x421ee0;this[_0x3fe866(0x235)]()&&this['selectNextCommand']();},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x468)]=Scene_Battle['prototype'][_0x421ee0(0x351)],Scene_Battle['prototype'][_0x421ee0(0x351)]=function(){const _0x2c758d=_0x421ee0;VisuMZ['BattleCore']['Scene_Battle_startActorCommandSelection'][_0x2c758d(0x8eb)](this),BattleManager['isTpb']()&&BattleManager[_0x2c758d(0x87e)]&&(BattleManager[_0x2c758d(0x87e)]=![],this[_0x2c758d(0x441)]());},BattleManager['invokeMagicReflection']=function(_0x3f51ec,_0x48adbc){const _0xc2f395=_0x421ee0;this[_0xc2f395(0x823)]['_reflectionTarget']=_0x48adbc,this[_0xc2f395(0x548)]['displayReflection'](_0x48adbc),this[_0xc2f395(0x548)][_0xc2f395(0x50e)](_0x3f51ec,this[_0xc2f395(0x823)]),this[_0xc2f395(0x823)][_0xc2f395(0x3e8)](_0x3f51ec),this[_0xc2f395(0x548)][_0xc2f395(0x7e0)](_0x3f51ec,_0x3f51ec);},VisuMZ[_0x421ee0(0x674)]['BattleManager_makeActionOrders']=BattleManager[_0x421ee0(0x1f2)],BattleManager['makeActionOrders']=function(){const _0x2227e8=_0x421ee0;VisuMZ[_0x2227e8(0x674)][_0x2227e8(0x3ea)][_0x2227e8(0x8eb)](this),this[_0x2227e8(0x22f)]=this[_0x2227e8(0x22f)]['filter'](_0x3091bb=>_0x3091bb&&_0x3091bb[_0x2227e8(0x30b)]());},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x755)]=BattleManager['updatePhase'],BattleManager[_0x421ee0(0x2d4)]=function(_0x428d42){const _0x2fbf27=_0x421ee0;if(this[_0x2fbf27(0x868)]===_0x2fbf27(0x61e))this[_0x2fbf27(0x787)]();else this[_0x2fbf27(0x868)]===_0x2fbf27(0x3c2)?this[_0x2fbf27(0x2b9)]():VisuMZ['BattleCore'][_0x2fbf27(0x755)][_0x2fbf27(0x8eb)](this,_0x428d42);},BattleManager[_0x421ee0(0x594)]=function(){const _0x1f1a7c=_0x421ee0;this[_0x1f1a7c(0x6cf)]=this[_0x1f1a7c(0x57e)][_0x1f1a7c(0x67a)](0x0),this[_0x1f1a7c(0x25d)]=0x0,this[_0x1f1a7c(0x8c4)]=this[_0x1f1a7c(0x6cf)][0x0]||null,this[_0x1f1a7c(0x868)]=_0x1f1a7c(0x61e);},BattleManager[_0x421ee0(0x787)]=function(){const _0x7045ed=_0x421ee0;!this[_0x7045ed(0x76e)]()&&!this['_logWindow'][_0x7045ed(0x286)]()&&(this[_0x7045ed(0x868)]=_0x7045ed(0x644));},BattleManager['forceAction']=function(_0x563668){const _0x2807bf=_0x421ee0;this['_actionBattlers'][_0x2807bf(0x60e)](_0x563668);if(_0x563668===this[_0x2807bf(0x562)])return;const _0x34efde=JsonEx[_0x2807bf(0x4ed)](_0x563668[_0x2807bf(0x880)]());this[_0x2807bf(0x577)]['push']([_0x563668,_0x34efde]);},BattleManager[_0x421ee0(0x309)]=function(){},BattleManager[_0x421ee0(0x240)]=function(){const _0x5be36a=_0x421ee0;if(this['isTpb']())this[_0x5be36a(0x868)]=_0x5be36a(0x6aa);else this[_0x5be36a(0x577)]['length']>0x0?this[_0x5be36a(0x868)]='turn':this[_0x5be36a(0x775)]();},BattleManager[_0x421ee0(0x339)]=function(){const _0x50f8a2=_0x421ee0,_0x145e41=this[_0x50f8a2(0x562)];_0x145e41&&this[_0x50f8a2(0x67c)]()&&_0x145e41[_0x50f8a2(0x7e8)]('undecided');for(;;){const _0x276bc1=this[_0x50f8a2(0x2f7)]();if(!_0x276bc1)return null;if(_0x276bc1[_0x50f8a2(0x4f8)]()&&_0x276bc1['isAlive']())return _0x276bc1;}},BattleManager[_0x421ee0(0x2f7)]=function(){const _0x390fc8=_0x421ee0;if(this[_0x390fc8(0x577)][_0x390fc8(0x4be)]>0x0){const _0xf0df9f=this[_0x390fc8(0x577)]['shift'](),_0x586a0f=_0xf0df9f[0x0];return _0x586a0f['_actions']=_0x586a0f[_0x390fc8(0x311)]||[],_0x586a0f[_0x390fc8(0x311)][0x0]=_0xf0df9f[0x1],_0x586a0f;}else return this[_0x390fc8(0x22f)][_0x390fc8(0x5bc)]();},VisuMZ['BattleCore'][_0x421ee0(0x74b)]=Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x3c2)],Game_Battler['prototype']['forceAction']=function(_0x3395fb,_0x54f5f2){const _0x434c53=_0x421ee0;VisuMZ[_0x434c53(0x674)][_0x434c53(0x74b)][_0x434c53(0x8eb)](this,_0x3395fb,_0x54f5f2),this[_0x434c53(0x311)][this[_0x434c53(0x311)]['length']-0x1]['_forceAction']=!![];},Game_Interpreter[_0x421ee0(0x2cb)]['command339']=function(_0x330de7){const _0x19637c=_0x421ee0;return this[_0x19637c(0x81a)](_0x330de7[0x0],_0x330de7[0x1],_0x4e1136=>{const _0x49161b=_0x19637c;!_0x4e1136[_0x49161b(0x477)]()&&(_0x4e1136[_0x49161b(0x3c2)](_0x330de7[0x2],_0x330de7[0x3]),BattleManager[_0x49161b(0x3c2)](_0x4e1136));}),!![];},VisuMZ[_0x421ee0(0x674)]['Game_Battler_makeSpeed']=Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x5ab)],Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x5ab)]=function(){const _0x5efc0d=_0x421ee0;VisuMZ[_0x5efc0d(0x674)]['Game_Battler_makeSpeed'][_0x5efc0d(0x8eb)](this),this[_0x5efc0d(0x311)]['length']<=0x0&&(this[_0x5efc0d(0x768)]=Number[_0x5efc0d(0x308)]);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x72e)]=BattleManager[_0x421ee0(0x617)],BattleManager[_0x421ee0(0x617)]=function(){const _0x3860b4=_0x421ee0;this['isTpb']()?this[_0x3860b4(0x2ea)]():VisuMZ['BattleCore']['BattleManager_selectNextCommand'][_0x3860b4(0x8eb)](this);},BattleManager[_0x421ee0(0x2ea)]=function(){const _0x2f94a4=_0x421ee0;if(this['_currentActor']){if(this['_currentActor']['selectNextCommand']())return;this[_0x2f94a4(0x229)](),this[_0x2f94a4(0x777)](),!this[_0x2f94a4(0x562)]&&!this['_currentActor']&&SceneManager[_0x2f94a4(0x855)][_0x2f94a4(0x89e)]();}else!this[_0x2f94a4(0x562)]&&this[_0x2f94a4(0x5fe)]();},BattleManager['checkTpbInputClose']=function(){const _0x398b03=_0x421ee0;(!this[_0x398b03(0x235)]()||this[_0x398b03(0x5e5)]())&&(this[_0x398b03(0x715)]&&(!$gameParty[_0x398b03(0x7a9)]()[_0x398b03(0x7f2)](this[_0x398b03(0x715)])&&(this[_0x398b03(0x715)]=null)),!this[_0x398b03(0x715)]?(this[_0x398b03(0x45e)](),this[_0x398b03(0x7ae)]=null,this[_0x398b03(0x410)]=![]):this[_0x398b03(0x25f)]());},BattleManager[_0x421ee0(0x25f)]=function(){const _0x375cd5=_0x421ee0;!$gameParty['battleMembers']()[_0x375cd5(0x7f2)](this[_0x375cd5(0x715)])&&(this[_0x375cd5(0x715)]=null),this[_0x375cd5(0x715)]?(this['_currentActor']=this[_0x375cd5(0x715)],this[_0x375cd5(0x7ae)][_0x375cd5(0x6a9)]='charged',this['_inputting']=!![],this[_0x375cd5(0x715)]=null):(this[_0x375cd5(0x45e)](),this['_currentActor']=null,this['_inputting']=![]);},VisuMZ['BattleCore'][_0x421ee0(0x69b)]=BattleManager[_0x421ee0(0x547)],BattleManager['isTpbMainPhase']=function(){const _0x303a63=_0x421ee0;return this[_0x303a63(0x868)]===_0x303a63(0x61e)?this['battleCoreTpbMainPhase']():VisuMZ[_0x303a63(0x674)][_0x303a63(0x69b)]['call'](this);},BattleManager[_0x421ee0(0x1af)]=function(){const _0x4e07f3=_0x421ee0;return this[_0x4e07f3(0x4b9)]();},VisuMZ[_0x421ee0(0x674)]['BattleManager_cancelActorInput']=BattleManager[_0x421ee0(0x45e)],BattleManager[_0x421ee0(0x45e)]=function(){const _0x7cd4a4=_0x421ee0;this[_0x7cd4a4(0x67c)]()&&this[_0x7cd4a4(0x868)]===_0x7cd4a4(0x1b7)&&(this['_currentActor']=null),VisuMZ['BattleCore'][_0x7cd4a4(0x4fa)][_0x7cd4a4(0x8eb)](this);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x534)]=BattleManager[_0x421ee0(0x1f7)],BattleManager[_0x421ee0(0x1f7)]=function(){const _0x1f826f=_0x421ee0,_0x2efb6a=this[_0x1f826f(0x7ae)];if(_0x2efb6a&&!_0x2efb6a[_0x1f826f(0x1f7)]()){const _0x1ec77d=_0x2efb6a[_0x1f826f(0x575)];_0x2efb6a[_0x1f826f(0x311)][_0x1ec77d]=new Game_Action(_0x2efb6a);}return VisuMZ[_0x1f826f(0x674)]['BattleManager_inputtingAction']['call'](this);},SceneManager['isSceneBattle']=function(){const _0x38ff40=_0x421ee0;return this[_0x38ff40(0x855)]&&this[_0x38ff40(0x855)][_0x38ff40(0x51e)]===Scene_Battle;},SceneManager[_0x421ee0(0x604)]=function(){const _0x554d2c=_0x421ee0;return Spriteset_Battle[_0x554d2c(0x2cb)][_0x554d2c(0x317)]();},SceneManager['isPreviousSceneBattleTransitionable']=function(){if(SceneManager['isPreviousScene'](Scene_Options))return!![];return![];},SceneManager[_0x421ee0(0x5a7)]=function(){if(SceneManager['isNextScene'](Scene_Options))return!![];return![];},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x255)]=Game_Temp[_0x421ee0(0x2cb)][_0x421ee0(0x31e)],Game_Temp[_0x421ee0(0x2cb)][_0x421ee0(0x31e)]=function(_0x4368ac,_0x4f1ef0,_0x13adeb){const _0x33e5b4=_0x421ee0;_0x4368ac=_0x4368ac[_0x33e5b4(0x7ad)]((_0x4d7dc4,_0x3846d0,_0x13446b)=>_0x13446b['indexOf'](_0x4d7dc4)===_0x3846d0),SceneManager[_0x33e5b4(0x225)]()&&SceneManager['isBattleFlipped']()&&(_0x13adeb=!_0x13adeb),VisuMZ['BattleCore'][_0x33e5b4(0x255)]['call'](this,_0x4368ac,_0x4f1ef0,_0x13adeb),SceneManager['isSceneBattle']()&&BattleManager[_0x33e5b4(0x6c2)][_0x33e5b4(0x863)]();},Game_Temp[_0x421ee0(0x2cb)][_0x421ee0(0x4d5)]=function(_0x1c9618){this['_lastPluginCommandInterpreter']=_0x1c9618;},Game_Temp[_0x421ee0(0x2cb)]['getLastPluginCommandInterpreter']=function(){const _0x1c4e86=_0x421ee0;return this[_0x1c4e86(0x2c8)];},Game_Temp[_0x421ee0(0x2cb)][_0x421ee0(0x277)]=function(){const _0x1f7be2=_0x421ee0;this[_0x1f7be2(0x43d)]=undefined;},Game_Temp[_0x421ee0(0x2cb)][_0x421ee0(0x3af)]=function(_0x38fceb){const _0x3748b4=_0x421ee0;$gameMap&&$dataMap&&$dataMap[_0x3748b4(0x24c)]&&this[_0x3748b4(0x281)]($dataMap['note']);const _0x3850c2=$dataTroops[_0x38fceb];_0x3850c2&&this['parseForcedGameTroopSettingsBattleCore'](_0x3850c2[_0x3748b4(0x4ec)]);},Game_Temp['prototype'][_0x421ee0(0x281)]=function(_0xc75215){const _0x105c59=_0x421ee0;if(!_0xc75215)return;if(_0xc75215[_0x105c59(0x5f2)](/<(?:BATTLELAYOUT|BATTLE LAYOUT|LAYOUT):[ ](.*)>/i)){const _0x43f576=String(RegExp['$1']);if(_0x43f576[_0x105c59(0x5f2)](/DEFAULT/i))this[_0x105c59(0x43d)]=_0x105c59(0x511);else{if(_0x43f576[_0x105c59(0x5f2)](/LIST/i))this[_0x105c59(0x43d)]=_0x105c59(0x5c1);else{if(_0x43f576[_0x105c59(0x5f2)](/XP/i))this[_0x105c59(0x43d)]='xp';else{if(_0x43f576[_0x105c59(0x5f2)](/PORTRAIT/i))this[_0x105c59(0x43d)]=_0x105c59(0x332);else _0x43f576[_0x105c59(0x5f2)](/BORDER/i)&&(this[_0x105c59(0x43d)]=_0x105c59(0x633));}}}}},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x288)]=Game_System[_0x421ee0(0x2cb)][_0x421ee0(0x792)],Game_System[_0x421ee0(0x2cb)]['initialize']=function(){const _0x408500=_0x421ee0;VisuMZ[_0x408500(0x674)][_0x408500(0x288)]['call'](this),this['initBattleCore']();},Game_System[_0x421ee0(0x2cb)][_0x421ee0(0x7b5)]=function(){const _0x4d6616=_0x421ee0;this[_0x4d6616(0x6bb)]=this[_0x4d6616(0x6bb)]||[];},Game_System[_0x421ee0(0x2cb)][_0x421ee0(0x41d)]=function(){const _0x20b8e0=_0x421ee0;if(this[_0x20b8e0(0x6bb)]===undefined)this[_0x20b8e0(0x7b5)]();return this[_0x20b8e0(0x6bb)];},Game_System[_0x421ee0(0x2cb)]['registerDefeatedEnemy']=function(_0x3e644c){const _0x154700=_0x421ee0;if(this[_0x154700(0x6bb)]===undefined)this[_0x154700(0x7b5)]();if(!_0x3e644c)return;if(this['_defeatedEnemies'][_0x154700(0x7f2)](_0x3e644c))return;this['_defeatedEnemies']['push'](_0x3e644c),this[_0x154700(0x6bb)][_0x154700(0x4e2)]((_0x42605c,_0x1eb802)=>_0x42605c-_0x1eb802);},VisuMZ['BattleCore'][_0x421ee0(0x623)]=Game_BattlerBase[_0x421ee0(0x2cb)]['addNewState'],Game_BattlerBase['prototype'][_0x421ee0(0x260)]=function(_0x47d94c){const _0x141f28=_0x421ee0,_0x59d9b7=this[_0x141f28(0x5bf)](),_0x5482fb=this[_0x141f28(0x2c4)]();VisuMZ[_0x141f28(0x674)]['Game_BattlerBase_addNewState'][_0x141f28(0x8eb)](this,_0x47d94c),this['isEnemy']()&&_0x59d9b7&&this['isDead']()&&(this['_visualHpGauge_JustDied']=!this[_0x141f28(0x857)](),$gameSystem[_0x141f28(0x7f8)](this[_0x141f28(0x25e)]())),SceneManager[_0x141f28(0x225)]()&&_0x5482fb!==this['stateMotionIndex']()&&(this[_0x141f28(0x35a)]()&&this[_0x141f28(0x35a)]()['refreshMotion']());},Game_Enemy[_0x421ee0(0x2cb)]['hasBeenDefeatedBefore']=function(){const _0x53a608=_0x421ee0;return $gameSystem[_0x53a608(0x41d)]()['includes'](this[_0x53a608(0x2b8)]);},VisuMZ['BattleCore'][_0x421ee0(0x393)]=Game_BattlerBase[_0x421ee0(0x2cb)][_0x421ee0(0x425)],Game_BattlerBase[_0x421ee0(0x2cb)][_0x421ee0(0x425)]=function(_0x92853a){const _0x1a5dbd=_0x421ee0;VisuMZ[_0x1a5dbd(0x674)][_0x1a5dbd(0x393)][_0x1a5dbd(0x8eb)](this,_0x92853a),this[_0x1a5dbd(0x84c)]()&&_0x92853a===this['deathStateId']()&&this[_0x1a5dbd(0x5bf)]()&&(this[_0x1a5dbd(0x883)]=![]),SceneManager['isSceneBattle']()&&this[_0x1a5dbd(0x355)]();},VisuMZ[_0x421ee0(0x674)]['Game_Action_clear']=Game_Action[_0x421ee0(0x2cb)][_0x421ee0(0x564)],Game_Action[_0x421ee0(0x2cb)][_0x421ee0(0x564)]=function(){const _0xf98f42=_0x421ee0;VisuMZ[_0xf98f42(0x674)]['Game_Action_clear']['call'](this),this[_0xf98f42(0x1d8)]={'arPenRate':0x0,'arPenFlat':0x0,'arRedRate':0x0,'arRedFlat':0x0},this[_0xf98f42(0x38c)]={'criticalHitRate':0x1,'criticalHitFlat':0x0,'criticalDmgRate':0x1,'criticalDmgFlat':0x0,'damageRate':0x1,'damageFlat':0x0,'hitRate':0x1,'hitFlat':0x0},this[_0xf98f42(0x698)]=_0xf98f42(0x511);},Game_Action[_0x421ee0(0x2cb)]['makeDamageValue']=function(_0x4539ab,_0x26b972){const _0xba3e75=_0x421ee0;return VisuMZ[_0xba3e75(0x674)][_0xba3e75(0x57b)][_0xba3e75(0x60c)][_0xba3e75(0x758)][_0xba3e75(0x8eb)](this,_0x4539ab,_0x26b972);},Game_Action[_0x421ee0(0x2cb)]['applyVariance']=function(_0x163100,_0x26fc0d){const _0x474dd3=_0x421ee0;return VisuMZ[_0x474dd3(0x674)]['Settings'][_0x474dd3(0x60c)]['VarianceFormulaJS'][_0x474dd3(0x8eb)](this,_0x163100,_0x26fc0d);},Game_Action[_0x421ee0(0x2cb)][_0x421ee0(0x39b)]=function(_0x192059,_0x4bee01){const _0xb7a110=_0x421ee0;return VisuMZ[_0xb7a110(0x674)][_0xb7a110(0x57b)]['Damage']['GuardFormulaJS'][_0xb7a110(0x8eb)](this,_0x192059,_0x4bee01);},VisuMZ[_0x421ee0(0x674)]['Game_Action_itemHit']=Game_Action[_0x421ee0(0x2cb)][_0x421ee0(0x480)],Game_Action[_0x421ee0(0x2cb)]['itemHit']=function(_0x79eb43){const _0x21673d=_0x421ee0,_0x14ff67=this[_0x21673d(0x8f0)]()[_0x21673d(0x24c)];if(_0x14ff67['match'](/<ALWAYS HIT>/i))return 0x1;else{if(_0x14ff67[_0x21673d(0x5f2)](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return Number(RegExp['$1'])/0x64;else{let _0x1f1ca3=VisuMZ[_0x21673d(0x674)]['Game_Action_itemHit'][_0x21673d(0x8eb)](this,_0x79eb43);return _0x1f1ca3=this['_multipliers'][_0x21673d(0x4f4)]*_0x1f1ca3+this[_0x21673d(0x38c)][_0x21673d(0x526)],_0x1f1ca3;}}},Game_Action[_0x421ee0(0x2cb)][_0x421ee0(0x8d6)]=function(_0x3cb2a2){const _0x324363=_0x421ee0;if(!this[_0x324363(0x8f0)]()[_0x324363(0x760)][_0x324363(0x76c)])return 0x0;let _0x844110=VisuMZ[_0x324363(0x674)]['Settings'][_0x324363(0x60c)][_0x324363(0x326)]['call'](this,_0x3cb2a2);return _0x844110=this['_multipliers'][_0x324363(0x595)]*_0x844110+this[_0x324363(0x38c)][_0x324363(0x85a)],_0x844110;},Game_Action['prototype'][_0x421ee0(0x63a)]=function(_0x31d597){const _0x485b47=_0x421ee0;return _0x31d597=VisuMZ[_0x485b47(0x674)][_0x485b47(0x57b)][_0x485b47(0x60c)][_0x485b47(0x8dc)][_0x485b47(0x8eb)](this,_0x31d597),_0x31d597=this[_0x485b47(0x38c)][_0x485b47(0x4cf)]*_0x31d597+this[_0x485b47(0x38c)][_0x485b47(0x51b)],_0x31d597;},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x1cd)]=Game_Action['prototype']['evalDamageFormula'],Game_Action[_0x421ee0(0x2cb)][_0x421ee0(0x4fc)]=function(_0x27639e){const _0x6ed8c4=_0x421ee0;if(this['_customDamageFormula']!==_0x6ed8c4(0x511))return this[_0x6ed8c4(0x376)](_0x27639e);else return DataManager[_0x6ed8c4(0x693)](this['item']())===_0x6ed8c4(0x24d)?VisuMZ[_0x6ed8c4(0x674)][_0x6ed8c4(0x1cd)]['call'](this,_0x27639e):this[_0x6ed8c4(0x608)](_0x27639e);},Game_Action[_0x421ee0(0x2cb)][_0x421ee0(0x1f4)]=function(_0x17c9d1){this['_customDamageFormula']=_0x17c9d1;},Game_Action['prototype'][_0x421ee0(0x376)]=function(_0x210e2f){const _0x2ed501=_0x421ee0,_0x1cd22c=this[_0x2ed501(0x8f0)](),_0x17ed5c=_0x1cd22c[_0x2ed501(0x760)][_0x2ed501(0x51a)];_0x1cd22c[_0x2ed501(0x760)][_0x2ed501(0x51a)]=this[_0x2ed501(0x698)];let _0x31b31b=VisuMZ[_0x2ed501(0x674)][_0x2ed501(0x1cd)][_0x2ed501(0x8eb)](this,_0x210e2f);return _0x1cd22c['damage'][_0x2ed501(0x51a)]=_0x17ed5c,_0x31b31b;},Game_Action[_0x421ee0(0x2cb)]['damageStyle']=function(){const _0x4d4954=_0x421ee0;if(this[_0x4d4954(0x8f0)]()[_0x4d4954(0x24c)][_0x4d4954(0x5f2)](/<DAMAGE STYLE:[ ](.*)>/i)){const _0x528d6d=String(RegExp['$1'])[_0x4d4954(0x890)]()[_0x4d4954(0x90d)]();return _0x528d6d;}return'MANUAL';},Game_Action[_0x421ee0(0x2cb)][_0x421ee0(0x608)]=function(_0x462a21){const _0x224cca=_0x421ee0,_0x381016=DataManager['getDamageStyle'](this[_0x224cca(0x8f0)]()),_0x908640=VisuMZ[_0x224cca(0x3a0)][_0x381016];try{return _0x908640[_0x224cca(0x814)][_0x224cca(0x8eb)](this,_0x462a21);}catch(_0x3dcb4e){if($gameTemp[_0x224cca(0x728)]())console[_0x224cca(0x382)](_0x3dcb4e);return VisuMZ[_0x224cca(0x674)][_0x224cca(0x1cd)][_0x224cca(0x8eb)](this);}},Game_Action[_0x421ee0(0x2cb)]['applyArmorModifiers']=function(_0x3a4a24,_0x35dfde){const _0x46f681=_0x421ee0;if(this[_0x46f681(0x581)]())return _0x35dfde;const _0xb8c276=this[_0x46f681(0x795)](),_0x2a223d=_0x3a4a24;let _0xaa5a97=[],_0x3b45ee=[];_0xaa5a97[_0x46f681(0x7b3)](this['_armorPenetration'][_0x46f681(0x2bf)],this['_armorPenetration']['arRedFlat']),_0x3b45ee[_0x46f681(0x7b3)](this[_0x46f681(0x1d8)][_0x46f681(0x4db)],this[_0x46f681(0x1d8)][_0x46f681(0x74a)]);const _0x507bc1=this['isPhysical']()?/<ARMOR REDUCTION:[ ](\d+\.?\d*)>/i:/<MAGIC REDUCTION:[ ](\d+\.?\d*)>/i,_0x4520a6=this[_0x46f681(0x427)]()?/<ARMOR REDUCTION:[ ](\d+\.?\d*)([%％])>/i:/<MAGIC REDUCTION:[ ](\d+\.?\d*)([%％])>/i,_0x2ee953=this['isPhysical']()?/<ARMOR PENETRATION:[ ](\d+\.?\d*)>/i:/<MAGIC PENETRATION:[ ](\d+\.?\d*)>/i,_0x346097=this['isPhysical']()?/<ARMOR PENETRATION:[ ](\d+\.?\d*)([%％])>/i:/<MAGIC PENETRATION:[ ](\d+\.?\d*)([%％])>/i;return _0xaa5a97=_0xaa5a97['concat'](_0x2a223d[_0x46f681(0x2e0)]()[_0x46f681(0x1b6)](_0x4db24d=>_0x4db24d&&_0x4db24d['note'][_0x46f681(0x5f2)](_0x507bc1)?Number(RegExp['$1']):0x0)),_0x3b45ee=_0x3b45ee[_0x46f681(0x378)](_0x2a223d[_0x46f681(0x2e0)]()['map'](_0x5ab264=>_0x5ab264&&_0x5ab264[_0x46f681(0x24c)][_0x46f681(0x5f2)](_0x4520a6)?Number(RegExp['$1'])/0x64:0x0)),_0xaa5a97=_0xaa5a97[_0x46f681(0x378)](_0xb8c276[_0x46f681(0x2e0)]()[_0x46f681(0x1b6)](_0x25550b=>_0x25550b&&_0x25550b[_0x46f681(0x24c)][_0x46f681(0x5f2)](_0x2ee953)?Number(RegExp['$1']):0x0)),_0x3b45ee=_0x3b45ee[_0x46f681(0x378)](_0xb8c276['traitObjects']()[_0x46f681(0x1b6)](_0x2c105c=>_0x2c105c&&_0x2c105c[_0x46f681(0x24c)][_0x46f681(0x5f2)](_0x346097)?Number(RegExp['$1'])/0x64:0x0)),this[_0x46f681(0x8f0)]()[_0x46f681(0x24c)]['match'](_0x2ee953)&&_0xaa5a97[_0x46f681(0x7b3)](Number(RegExp['$1'])),this[_0x46f681(0x8f0)]()[_0x46f681(0x24c)][_0x46f681(0x5f2)](_0x346097)&&_0x3b45ee[_0x46f681(0x7b3)](Number(RegExp['$1'])),_0x35dfde=_0xaa5a97[_0x46f681(0x2e3)]((_0x3293e9,_0x58db02)=>_0x3293e9-_0x58db02,_0x35dfde),_0x35dfde>0x0&&(_0x35dfde=_0x3b45ee[_0x46f681(0x2e3)]((_0x6cec8f,_0x199b4a)=>_0x6cec8f*(0x1-_0x199b4a),_0x35dfde)),_0x35dfde;},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x34d)]=Game_Action[_0x421ee0(0x2cb)][_0x421ee0(0x722)],Game_Action['prototype'][_0x421ee0(0x722)]=function(_0x5deb40,_0x7af1a7){const _0x53e015=_0x421ee0;_0x7af1a7=_0x7af1a7*this[_0x53e015(0x38c)][_0x53e015(0x483)],_0x7af1a7+=this[_0x53e015(0x38c)][_0x53e015(0x269)]*(_0x7af1a7>=0x0?0x1:-0x1),_0x7af1a7=this[_0x53e015(0x876)]('PreDamage%1JS',_0x5deb40,_0x7af1a7,![]),_0x7af1a7=this[_0x53e015(0x6ba)](_0x7af1a7),_0x7af1a7=Math[_0x53e015(0x38a)](_0x7af1a7),this[_0x53e015(0x71d)]=_0x7af1a7,this[_0x53e015(0x856)]=this[_0x53e015(0x856)]||0x0,this[_0x53e015(0x856)]+=_0x7af1a7,VisuMZ['BattleCore'][_0x53e015(0x34d)][_0x53e015(0x8eb)](this,_0x5deb40,_0x7af1a7),this[_0x53e015(0x876)]('PostDamage%1JS',_0x5deb40,_0x7af1a7,!![]);},Game_Action['prototype'][_0x421ee0(0x6ba)]=function(_0x17c9d6){const _0x21473d=_0x421ee0;if(this['isBypassDamageCap']())return _0x17c9d6;return _0x17c9d6=this[_0x21473d(0x7b8)](_0x17c9d6),_0x17c9d6=this[_0x21473d(0x6a2)](_0x17c9d6),_0x17c9d6;},Game_Action[_0x421ee0(0x2cb)]['isBypassDamageCap']=function(){const _0x4ccd36=_0x421ee0,_0x573499=/<BYPASS DAMAGE CAP>/i;if(this[_0x4ccd36(0x8f0)]()[_0x4ccd36(0x24c)]['match'](_0x573499))return!![];if(this['subject']()[_0x4ccd36(0x2e0)]()[_0x4ccd36(0x676)](_0x5a0428=>_0x5a0428&&_0x5a0428['note'][_0x4ccd36(0x5f2)](_0x573499)))return!![];return!VisuMZ[_0x4ccd36(0x674)]['Settings']['Damage'][_0x4ccd36(0x5db)];},Game_Action[_0x421ee0(0x2cb)][_0x421ee0(0x7b8)]=function(_0x5170cb){const _0xb5f5a4=_0x421ee0;if(!VisuMZ['BattleCore']['Settings'][_0xb5f5a4(0x60c)][_0xb5f5a4(0x8ea)])return _0x5170cb;const _0x422b64=/<BYPASS SOFT DAMAGE CAP>/i;if(this[_0xb5f5a4(0x8f0)]()['note']['match'](_0x422b64))return!![];if(this['subject']()[_0xb5f5a4(0x2e0)]()[_0xb5f5a4(0x676)](_0x3e74c0=>_0x3e74c0&&_0x3e74c0['note'][_0xb5f5a4(0x5f2)](_0x422b64)))return!![];const _0x56b2b1=_0x5170cb<0x0?-0x1:0x1;_0x5170cb=Math[_0xb5f5a4(0x8f2)](_0x5170cb);let _0x54d101=this[_0xb5f5a4(0x795)]()[_0xb5f5a4(0x419)]();this[_0xb5f5a4(0x8f0)]()[_0xb5f5a4(0x24c)][_0xb5f5a4(0x5f2)](/<SOFT DAMAGE CAP:[ ]([\+\-]\d+)([%％])>/i)&&(_0x54d101+=Number(RegExp['$1'])/0x64);_0x54d101=_0x54d101[_0xb5f5a4(0x484)](0.01,0x1);const _0x14d91e=this[_0xb5f5a4(0x1fb)](),_0x5d5087=_0x54d101*_0x14d91e;if(_0x5170cb>_0x5d5087&&_0x14d91e>_0x5d5087){_0x5170cb-=_0x5d5087;const _0x1cdc3a=VisuMZ[_0xb5f5a4(0x674)][_0xb5f5a4(0x57b)][_0xb5f5a4(0x60c)][_0xb5f5a4(0x691)],_0x427573=Math[_0xb5f5a4(0x8aa)](0x1-_0x5170cb/((_0x14d91e-_0x5d5087)*_0x1cdc3a+_0x5170cb),0.01);_0x5170cb*=_0x427573,_0x5170cb+=_0x5d5087;}return _0x5170cb*_0x56b2b1;},Game_Action[_0x421ee0(0x2cb)]['getHardDamageCap']=function(){const _0x36c71a=_0x421ee0;return this[_0x36c71a(0x8f0)]()[_0x36c71a(0x24c)][_0x36c71a(0x5f2)](/<DAMAGE CAP:[ ](\d+)>/i)?Number(RegExp['$1']):this[_0x36c71a(0x795)]()['hardDamageCap']();},Game_Action[_0x421ee0(0x2cb)][_0x421ee0(0x6a2)]=function(_0x3c86a5){const _0x2f172f=_0x421ee0;let _0x2287d7=this[_0x2f172f(0x1fb)]();return _0x3c86a5[_0x2f172f(0x484)](-_0x2287d7,_0x2287d7);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x31b)]=Game_Action[_0x421ee0(0x2cb)][_0x421ee0(0x3e8)],Game_Action['prototype'][_0x421ee0(0x3e8)]=function(_0x43e2b1){const _0x45f8de=_0x421ee0;this[_0x45f8de(0x876)]('PreApply%1JS',_0x43e2b1,0x0,!![]),VisuMZ[_0x45f8de(0x674)]['Game_Action_apply'][_0x45f8de(0x8eb)](this,_0x43e2b1),this['applyBattleCoreJS'](_0x45f8de(0x3dd),_0x43e2b1,this[_0x45f8de(0x71d)]||0x0,!![]),this['applyResultSwitches'](_0x43e2b1);},Game_Action[_0x421ee0(0x2cb)]['applyBattleCoreJS']=function(_0x45f579,_0x5e1bcd,_0x47f539,_0x2eb45b){const _0xbcd2b2=_0x421ee0;_0x47f539=_0x47f539||0x0;const _0x2c2cb3=_0x47f539,_0x5bede7=VisuMZ[_0xbcd2b2(0x674)][_0xbcd2b2(0x57b)][_0xbcd2b2(0x203)],_0x46267b=_0x45f579[_0xbcd2b2(0x7d7)]('');if(_0x5bede7[_0x46267b]){_0x47f539=_0x5bede7[_0x46267b][_0xbcd2b2(0x8eb)](this,_0x47f539,_0x5e1bcd);if(_0x2eb45b)_0x47f539=_0x2c2cb3;}let _0x4ce01d=VisuMZ[_0xbcd2b2(0x674)][_0xbcd2b2(0x4f1)](this['item'](),_0x45f579['format'](''));if(VisuMZ[_0xbcd2b2(0x674)]['JS'][_0x4ce01d]){_0x47f539=VisuMZ[_0xbcd2b2(0x674)]['JS'][_0x4ce01d][_0xbcd2b2(0x8eb)](this,this['subject'](),_0x5e1bcd,this[_0xbcd2b2(0x8f0)](),_0x47f539);if(_0x2eb45b)_0x47f539=_0x2c2cb3;}for(const _0x3e6d80 of this[_0xbcd2b2(0x795)]()[_0xbcd2b2(0x2e0)]()){if(!_0x3e6d80)continue;_0x4ce01d=VisuMZ[_0xbcd2b2(0x674)][_0xbcd2b2(0x4f1)](_0x3e6d80,_0x45f579['format'](_0xbcd2b2(0x826)));if(VisuMZ['BattleCore']['JS'][_0x4ce01d]){_0x47f539=VisuMZ[_0xbcd2b2(0x674)]['JS'][_0x4ce01d]['call'](this,this[_0xbcd2b2(0x795)](),_0x5e1bcd,_0x3e6d80,_0x47f539);if(_0x2eb45b)_0x47f539=_0x2c2cb3;}}for(const _0x8df33e of _0x5e1bcd[_0xbcd2b2(0x2e0)]()){if(!_0x8df33e)continue;_0x4ce01d=VisuMZ[_0xbcd2b2(0x674)][_0xbcd2b2(0x4f1)](_0x8df33e,_0x45f579[_0xbcd2b2(0x7d7)](_0xbcd2b2(0x4a5)));if(VisuMZ['BattleCore']['JS'][_0x4ce01d]){_0x47f539=VisuMZ[_0xbcd2b2(0x674)]['JS'][_0x4ce01d][_0xbcd2b2(0x8eb)](this,this[_0xbcd2b2(0x795)](),_0x5e1bcd,_0x8df33e,_0x47f539);if(_0x2eb45b)_0x47f539=_0x2c2cb3;}}return _0x47f539;},Game_Action[_0x421ee0(0x2cb)][_0x421ee0(0x487)]=function(_0x10544a){const _0x522de4=_0x421ee0,_0x352c7c=this[_0x522de4(0x856)]||0x0,_0x4761c0=VisuMZ[_0x522de4(0x674)][_0x522de4(0x57b)][_0x522de4(0x203)],_0x4a2747=_0x10544a[_0x522de4(0x7d7)]('');_0x4761c0[_0x4a2747]&&_0x4761c0[_0x4a2747][_0x522de4(0x8eb)](this,_0x352c7c);let _0x6a9806=VisuMZ['BattleCore'][_0x522de4(0x4f1)](this['item'](),_0x10544a);VisuMZ[_0x522de4(0x674)]['JS'][_0x6a9806]&&VisuMZ['BattleCore']['JS'][_0x6a9806][_0x522de4(0x8eb)](this,this[_0x522de4(0x795)](),this[_0x522de4(0x795)](),this[_0x522de4(0x8f0)](),_0x352c7c);for(const _0x3690f2 of this['subject']()['traitObjects']()){if(!_0x3690f2)continue;_0x6a9806=VisuMZ[_0x522de4(0x674)][_0x522de4(0x4f1)](_0x3690f2,_0x10544a),VisuMZ[_0x522de4(0x674)]['JS'][_0x6a9806]&&VisuMZ['BattleCore']['JS'][_0x6a9806][_0x522de4(0x8eb)](this,this[_0x522de4(0x795)](),this['subject'](),_0x3690f2,_0x352c7c);}},Game_Action[_0x421ee0(0x2cb)][_0x421ee0(0x23e)]=function(){const _0x163722=_0x421ee0;return VisuMZ[_0x163722(0x674)][_0x163722(0x57b)][_0x163722(0x203)]['CalcActionSpeedJS']['call'](this);},Game_Action[_0x421ee0(0x2cb)][_0x421ee0(0x3b7)]=function(){const _0x3ec6a0=_0x421ee0;return VisuMZ[_0x3ec6a0(0x674)][_0x3ec6a0(0x57b)][_0x3ec6a0(0x203)][_0x3ec6a0(0x802)];},Game_Action['prototype']['isCustomBattleScope']=function(){const _0x344dc9=_0x421ee0;return this[_0x344dc9(0x8f0)]()[_0x344dc9(0x24c)]['match'](/<JS TARGETS>/i);},Game_Action['prototype'][_0x421ee0(0x1c4)]=function(){const _0x2248a9=_0x421ee0;if(!this[_0x2248a9(0x7d8)]&&this[_0x2248a9(0x795)]()[_0x2248a9(0x521)]())return![];if(this[_0x2248a9(0x32b)]())return!![];return typeof this['item']()['scope']==='string';},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x1fd)]=Game_Action[_0x421ee0(0x2cb)][_0x421ee0(0x1ef)],Game_Action[_0x421ee0(0x2cb)][_0x421ee0(0x1ef)]=function(){const _0xb6172f=_0x421ee0;return this[_0xb6172f(0x1c4)]()&&!this[_0xb6172f(0x32b)]()?this[_0xb6172f(0x690)]():VisuMZ[_0xb6172f(0x674)]['Game_Action_isForOpponent'][_0xb6172f(0x8eb)](this);},Game_Action[_0x421ee0(0x2cb)]['isForOpponentBattleCore']=function(){const _0x5503f4=_0x421ee0,_0x3014bf=this[_0x5503f4(0x8f0)]()[_0x5503f4(0x1a8)];return _0x3014bf[_0x5503f4(0x5f2)](/(?:ENEMY|ENEMIES|FOE|FOES)/i);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x8af)]=Game_Action[_0x421ee0(0x2cb)][_0x421ee0(0x854)],Game_Action[_0x421ee0(0x2cb)][_0x421ee0(0x854)]=function(){const _0x41e2f7=_0x421ee0;return this[_0x41e2f7(0x1c4)]()&&!this[_0x41e2f7(0x32b)]()?this[_0x41e2f7(0x5df)]():VisuMZ[_0x41e2f7(0x674)][_0x41e2f7(0x8af)][_0x41e2f7(0x8eb)](this);},Game_Action[_0x421ee0(0x2cb)]['isForFriendBattleCore']=function(){const _0xc7f52d=_0x421ee0,_0x19e24e=this[_0xc7f52d(0x8f0)]()['scope'];return _0x19e24e[_0xc7f52d(0x5f2)](/(?:ALLY|ALLIES|FRIEND|FRIENDS)/i);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x2c0)]=Game_Action[_0x421ee0(0x2cb)][_0x421ee0(0x467)],Game_Action['prototype'][_0x421ee0(0x467)]=function(){const _0x398707=_0x421ee0;return this[_0x398707(0x1c4)]()&&!this['isCustomBattleScope']()?this['isForRandomBattleCore']():VisuMZ[_0x398707(0x674)][_0x398707(0x2c0)][_0x398707(0x8eb)](this);},Game_Action[_0x421ee0(0x2cb)][_0x421ee0(0x1f0)]=function(){const _0x21d36b=_0x421ee0,_0x36c9eb=this[_0x21d36b(0x8f0)]()[_0x21d36b(0x1a8)];return _0x36c9eb[_0x21d36b(0x5f2)](/(?:RAND|RANDOM)/i);},VisuMZ[_0x421ee0(0x674)]['Game_Action_needsSelection']=Game_Action[_0x421ee0(0x2cb)][_0x421ee0(0x873)],Game_Action[_0x421ee0(0x2cb)]['needsSelection']=function(){const _0x111b1b=_0x421ee0;return this[_0x111b1b(0x1c4)]()&&!this[_0x111b1b(0x32b)]()?this[_0x111b1b(0x504)]():VisuMZ[_0x111b1b(0x674)][_0x111b1b(0x7bf)][_0x111b1b(0x8eb)](this);},Game_Action[_0x421ee0(0x2cb)][_0x421ee0(0x504)]=function(){const _0x2e8c90=_0x421ee0,_0x530cf7=this[_0x2e8c90(0x8f0)]()[_0x2e8c90(0x1a8)];if(_0x530cf7[_0x2e8c90(0x5f2)](/RANDOM/i))return![];return VisuMZ[_0x2e8c90(0x674)][_0x2e8c90(0x7bf)][_0x2e8c90(0x8eb)](this);},VisuMZ['BattleCore']['Game_Action_makeTargets']=Game_Action[_0x421ee0(0x2cb)][_0x421ee0(0x661)],Game_Action[_0x421ee0(0x2cb)]['makeTargets']=function(){const _0x262eb8=_0x421ee0;let _0x2d09e0=[];return this['isBattleCoreTargetScope']()?_0x2d09e0=this[_0x262eb8(0x21e)]():_0x2d09e0=VisuMZ[_0x262eb8(0x674)]['Game_Action_makeTargets'][_0x262eb8(0x8eb)](this),_0x2d09e0=this[_0x262eb8(0x424)](_0x2d09e0),_0x2d09e0;},Game_Action[_0x421ee0(0x2cb)][_0x421ee0(0x21e)]=function(){const _0x20a909=_0x421ee0;let _0x29a2a3=[];const _0x44d09d=String(this['item']()[_0x20a909(0x1a8)]),_0x451708=VisuMZ[_0x20a909(0x674)][_0x20a909(0x4f1)](this['item'](),_0x20a909(0x8a6));if(VisuMZ[_0x20a909(0x674)]['JS'][_0x451708]){const _0x889edb=VisuMZ[_0x20a909(0x674)][_0x20a909(0x4f1)](this[_0x20a909(0x8f0)](),_0x20a909(0x8a6));return _0x29a2a3=VisuMZ[_0x20a909(0x674)]['JS'][_0x889edb][_0x20a909(0x8eb)](this,this[_0x20a909(0x795)](),_0x29a2a3),this[_0x20a909(0x26f)](_0x29a2a3);}if(_0x44d09d[_0x20a909(0x5f2)](/(\d+) RANDOM ANY/i)){let _0x431e00=Number(RegExp['$1']);while(_0x431e00--){const _0x2cdbc9=Math[_0x20a909(0x803)](0x2)===0x0?this[_0x20a909(0x38d)]():this[_0x20a909(0x178)]();_0x29a2a3['push'](_0x2cdbc9['trueRandomTarget']());}return this[_0x20a909(0x26f)](_0x29a2a3);}if(_0x44d09d[_0x20a909(0x5f2)](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i)){let _0x54839b=Number(RegExp['$1']);while(_0x54839b--){_0x29a2a3['push'](this[_0x20a909(0x38d)]()[_0x20a909(0x1bd)]());}return this[_0x20a909(0x26f)](_0x29a2a3);}if(_0x44d09d['match'](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i)){let _0x5c3115=Number(RegExp['$1']);while(_0x5c3115--){_0x29a2a3[_0x20a909(0x7b3)](this[_0x20a909(0x178)]()['trueRandomTarget']());}return this[_0x20a909(0x26f)](_0x29a2a3);}if(_0x44d09d[_0x20a909(0x5f2)](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i))return _0x29a2a3[_0x20a909(0x7b3)](...this['friendsUnit']()[_0x20a909(0x84a)]()[_0x20a909(0x7ad)](_0xa6dd51=>_0xa6dd51!==this['subject']())),this[_0x20a909(0x26f)](_0x29a2a3);return VisuMZ[_0x20a909(0x674)][_0x20a909(0x312)][_0x20a909(0x8eb)](this);},Game_Action[_0x421ee0(0x2cb)][_0x421ee0(0x927)]=function(_0x47f61f){const _0x293620=_0x421ee0,_0xafabef=[];for(let _0x5a9fe2=0x0;_0x5a9fe2<this['numTargets']();_0x5a9fe2++){_0xafabef[_0x293620(0x7b3)](_0x47f61f[_0x293620(0x1bd)]());}return _0xafabef;},Game_Action['prototype']['applyTargetFilters']=function(_0x4d69fa){const _0x1871b5=_0x421ee0;if(!this[_0x1871b5(0x8f0)]())return _0x4d69fa;const _0x22f521=this[_0x1871b5(0x8f0)]()[_0x1871b5(0x24c)];return _0x4d69fa;},VisuMZ['BattleCore'][_0x421ee0(0x5cc)]=Game_Action[_0x421ee0(0x2cb)]['itemEffectAddAttackState'],Game_Action['prototype'][_0x421ee0(0x4b6)]=function(_0x249512,_0x3636ba){const _0x3d24e4=_0x421ee0,_0x4f1ea1=_0x249512[_0x3d24e4(0x89a)]();this[_0x3d24e4(0x795)]()[_0x3d24e4(0x3e1)]()[_0x3d24e4(0x7f2)](_0x249512['deathStateId']())&&_0x249512[_0x3d24e4(0x1bc)](![]),VisuMZ[_0x3d24e4(0x674)][_0x3d24e4(0x5cc)][_0x3d24e4(0x8eb)](this,_0x249512,_0x3636ba),_0x249512[_0x3d24e4(0x1bc)](_0x4f1ea1);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x7ec)]=Game_Action[_0x421ee0(0x2cb)][_0x421ee0(0x47a)],Game_Action[_0x421ee0(0x2cb)][_0x421ee0(0x47a)]=function(_0x4ed0d5,_0x2e9372){const _0x3a09bb=_0x421ee0,_0xd7e338=_0x4ed0d5[_0x3a09bb(0x89a)]();_0x2e9372[_0x3a09bb(0x35c)]===_0x4ed0d5[_0x3a09bb(0x6c5)]()&&_0x4ed0d5[_0x3a09bb(0x1bc)](![]),VisuMZ['BattleCore'][_0x3a09bb(0x7ec)][_0x3a09bb(0x8eb)](this,_0x4ed0d5,_0x2e9372),_0x4ed0d5[_0x3a09bb(0x1bc)](_0xd7e338);},VisuMZ['BattleCore'][_0x421ee0(0x4e0)]=Game_Action['prototype'][_0x421ee0(0x680)],Game_Action['prototype'][_0x421ee0(0x680)]=function(){const _0x439001=_0x421ee0;VisuMZ['BattleCore'][_0x439001(0x4e0)][_0x439001(0x8eb)](this),this['applyGlobalCommonEventNotetags'](),this[_0x439001(0x430)]();},Game_Action['prototype']['applyGlobalCommonEventNotetags']=function(){const _0x21a5ac=_0x421ee0;if(!SceneManager[_0x21a5ac(0x225)]())return;const _0x418f9d=/<COMMON (?:EVENT|EVENTS):[ ](.*)>/gi,_0x1bfc97=this[_0x21a5ac(0x8f0)]()[_0x21a5ac(0x24c)][_0x21a5ac(0x5f2)](_0x418f9d);if(_0x1bfc97)for(const _0x16cf86 of _0x1bfc97){if(!_0x16cf86)continue;_0x16cf86[_0x21a5ac(0x5f2)](_0x418f9d);const _0x49406d=String(RegExp['$1'])[_0x21a5ac(0x6d8)](',')[_0x21a5ac(0x1b6)](_0x5943cc=>String(_0x5943cc)[_0x21a5ac(0x90d)]()),_0x19fc5a=_0x49406d[_0x21a5ac(0x1b6)](_0x5b3f9=>DataManager[_0x21a5ac(0x313)](_0x5b3f9));for(const _0xbd2948 of _0x19fc5a){const _0x3eec47=$dataCommonEvents[_0xbd2948];_0x3eec47&&$gameTemp[_0x21a5ac(0x7cf)](_0xbd2948);}}},DataManager['getCommonEventIdWithName']=function(_0x3cc98b){const _0x2f93fb=_0x421ee0;_0x3cc98b=_0x3cc98b[_0x2f93fb(0x890)]()['trim'](),this[_0x2f93fb(0x2ad)]=this['_commonEventIDs']||{};if(this[_0x2f93fb(0x2ad)][_0x3cc98b])return this[_0x2f93fb(0x2ad)][_0x3cc98b];for(const _0x55fa16 of $dataCommonEvents){if(!_0x55fa16)continue;let _0x33084c=_0x55fa16['name'];_0x33084c=_0x33084c[_0x2f93fb(0x4ce)](/\x1I\[(\d+)\]/gi,''),_0x33084c=_0x33084c['replace'](/\\I\[(\d+)\]/gi,''),this[_0x2f93fb(0x2ad)][_0x33084c['toUpperCase']()[_0x2f93fb(0x90d)]()]=_0x55fa16['id'];}return this[_0x2f93fb(0x2ad)][_0x3cc98b]||0x0;},Game_Action[_0x421ee0(0x2cb)]['resetResultSwitches']=function(){const _0x14002c=_0x421ee0;if(!SceneManager['isSceneBattle']())return;const _0x5a638b=VisuMZ[_0x14002c(0x674)][_0x14002c(0x57b)]['Mechanics'];_0x5a638b[_0x14002c(0x65d)]&&$gameSwitches[_0x14002c(0x679)](_0x5a638b[_0x14002c(0x65d)],![]),_0x5a638b[_0x14002c(0x879)]&&$gameSwitches[_0x14002c(0x679)](_0x5a638b[_0x14002c(0x879)],![]),_0x5a638b[_0x14002c(0x5f0)]&&$gameVariables[_0x14002c(0x679)](_0x5a638b[_0x14002c(0x5f0)],0x0),_0x5a638b[_0x14002c(0x66f)]&&$gameVariables[_0x14002c(0x679)](_0x5a638b[_0x14002c(0x66f)],0x0);},Game_Action[_0x421ee0(0x2cb)][_0x421ee0(0x1dd)]=function(_0x54f961){const _0x4835bf=_0x421ee0;if(!SceneManager[_0x4835bf(0x225)]())return;if(!_0x54f961)return;const _0x5124b0=_0x54f961[_0x4835bf(0x895)](),_0x4baa77=VisuMZ['BattleCore'][_0x4835bf(0x57b)][_0x4835bf(0x203)];_0x4baa77[_0x4835bf(0x65d)]&&_0x5124b0[_0x4835bf(0x76c)]&&$gameSwitches[_0x4835bf(0x679)](_0x4baa77['SwitchCritical'],!![]);_0x4baa77[_0x4835bf(0x879)]&&(_0x5124b0[_0x4835bf(0x3d7)]||_0x5124b0[_0x4835bf(0x657)])&&$gameSwitches[_0x4835bf(0x679)](_0x4baa77[_0x4835bf(0x879)],!![]);if(_0x4baa77[_0x4835bf(0x5f0)]){let _0x1e26e7=$gameVariables['value'](_0x4baa77['VariableDmg']);_0x5124b0['hpDamage']>0x0&&(_0x1e26e7+=Math[_0x4835bf(0x8f2)](_0x5124b0[_0x4835bf(0x46a)])),$gameVariables[_0x4835bf(0x679)](_0x4baa77[_0x4835bf(0x5f0)],_0x1e26e7);}if(_0x4baa77[_0x4835bf(0x66f)]){let _0x434780=$gameVariables[_0x4835bf(0x667)](_0x4baa77[_0x4835bf(0x66f)]);_0x5124b0[_0x4835bf(0x46a)]<0x0&&(_0x434780+=Math[_0x4835bf(0x8f2)](_0x5124b0[_0x4835bf(0x46a)])),$gameVariables[_0x4835bf(0x679)](_0x4baa77[_0x4835bf(0x66f)],_0x434780);}},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x65e)]=Game_BattlerBase[_0x421ee0(0x2cb)]['initMembers'],Game_BattlerBase[_0x421ee0(0x2cb)][_0x421ee0(0x3a7)]=function(){const _0x47719c=_0x421ee0;VisuMZ['BattleCore']['Game_BattlerBase_initMembers'][_0x47719c(0x8eb)](this),this['initMembersBattleCore']();},Game_BattlerBase[_0x421ee0(0x2cb)][_0x421ee0(0x57a)]=function(){this['_immortal']=![];},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x5ae)]=Game_BattlerBase['prototype'][_0x421ee0(0x214)],Game_BattlerBase['prototype'][_0x421ee0(0x214)]=function(){const _0x1e14ae=_0x421ee0;this[_0x1e14ae(0x2ce)]={},VisuMZ[_0x1e14ae(0x674)][_0x1e14ae(0x5ae)][_0x1e14ae(0x8eb)](this);},Game_BattlerBase['prototype'][_0x421ee0(0x694)]=function(_0x1520c0){const _0x460471=_0x421ee0;return this['_cache']=this[_0x460471(0x2ce)]||{},this[_0x460471(0x2ce)][_0x1520c0]!==undefined;},Game_BattlerBase['prototype']['hardDamageCap']=function(){const _0x330e32=_0x421ee0;if(this[_0x330e32(0x2ce)][_0x330e32(0x8b2)]!==undefined)return this['_cache'][_0x330e32(0x8b2)];const _0x5e9ef8=/<DAMAGE CAP:[ ](\d+)>/i,_0x5e3a64=this[_0x330e32(0x2e0)]()['map'](_0x56d55c=>_0x56d55c&&_0x56d55c[_0x330e32(0x24c)][_0x330e32(0x5f2)](_0x5e9ef8)?Number(RegExp['$1']):0x0);let _0x468e8f=_0x5e3a64[_0x330e32(0x4be)]>0x0?Math[_0x330e32(0x8aa)](..._0x5e3a64):0x0;if(_0x468e8f<=0x0)_0x468e8f=VisuMZ[_0x330e32(0x674)][_0x330e32(0x57b)]['Damage'][_0x330e32(0x5e8)];return this[_0x330e32(0x2ce)][_0x330e32(0x8b2)]=_0x468e8f,this[_0x330e32(0x2ce)][_0x330e32(0x8b2)];},Game_BattlerBase[_0x421ee0(0x2cb)][_0x421ee0(0x419)]=function(){const _0x37cbd7=_0x421ee0;if(this[_0x37cbd7(0x2ce)][_0x37cbd7(0x23a)]!==undefined)return this[_0x37cbd7(0x2ce)][_0x37cbd7(0x23a)];let _0x21f4ef=VisuMZ[_0x37cbd7(0x674)][_0x37cbd7(0x57b)][_0x37cbd7(0x60c)][_0x37cbd7(0x358)];const _0x5171e3=/<SOFT DAMAGE CAP:[ ]([\+\-]\d+)([%％])>/i,_0x13050d=this[_0x37cbd7(0x2e0)]()['map'](_0x546cb5=>_0x546cb5&&_0x546cb5[_0x37cbd7(0x24c)][_0x37cbd7(0x5f2)](_0x5171e3)?Number(RegExp['$1'])/0x64:0x0);return _0x21f4ef=_0x13050d[_0x37cbd7(0x2e3)]((_0x32b08a,_0xc66290)=>_0x32b08a+_0xc66290,_0x21f4ef),this[_0x37cbd7(0x2ce)][_0x37cbd7(0x23a)]=_0x21f4ef,this[_0x37cbd7(0x2ce)][_0x37cbd7(0x23a)][_0x37cbd7(0x484)](0.01,0x1);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x899)]=Game_BattlerBase['prototype'][_0x421ee0(0x8e6)],Game_BattlerBase[_0x421ee0(0x2cb)][_0x421ee0(0x8e6)]=function(){const _0x3eb453=_0x421ee0;VisuMZ['BattleCore'][_0x3eb453(0x899)]['call'](this),SceneManager[_0x3eb453(0x225)]()&&this[_0x3eb453(0x6f0)](_0x3eb453(0x724));},Game_BattlerBase[_0x421ee0(0x2cb)]['battler']=function(){const _0x5096cd=_0x421ee0;if(!SceneManager['isSceneBattle']())return null;if(!SceneManager[_0x5096cd(0x855)][_0x5096cd(0x6c2)])return null;return SceneManager[_0x5096cd(0x855)][_0x5096cd(0x6c2)][_0x5096cd(0x314)](this);},Game_BattlerBase[_0x421ee0(0x2cb)][_0x421ee0(0x8de)]=function(){const _0x34bfa0=_0x421ee0;return VisuMZ['BattleCore'][_0x34bfa0(0x57b)]['Actor'][_0x34bfa0(0x8e7)];},Game_BattlerBase[_0x421ee0(0x2cb)][_0x421ee0(0x8bf)]=function(){const _0x2536c1=_0x421ee0;return VisuMZ[_0x2536c1(0x674)][_0x2536c1(0x57b)][_0x2536c1(0x92b)]['AnchorY'];},Game_BattlerBase[_0x421ee0(0x2cb)][_0x421ee0(0x27c)]=function(){const _0x4bdcd3=_0x421ee0;return this[_0x4bdcd3(0x6da)]&&this[_0x4bdcd3(0x6da)]()?VisuMZ[_0x4bdcd3(0x674)][_0x4bdcd3(0x57b)][_0x4bdcd3(0x92b)]['Shadow']:VisuMZ[_0x4bdcd3(0x674)][_0x4bdcd3(0x57b)][_0x4bdcd3(0x2d2)][_0x4bdcd3(0x33b)];},Game_BattlerBase[_0x421ee0(0x2cb)]['battlerSmoothImage']=function(){return!![];},Game_BattlerBase['prototype'][_0x421ee0(0x5af)]=function(){return 0x0;},Game_BattlerBase[_0x421ee0(0x2cb)][_0x421ee0(0x1b5)]=function(){return 0x0;},Game_BattlerBase[_0x421ee0(0x2cb)][_0x421ee0(0x2fd)]=function(_0x57f90e){const _0x3aafef=_0x421ee0;if(!_0x57f90e)return 0x0;let _0x4e5785=0x0;const _0x387c97=_0x57f90e[_0x3aafef(0x24c)];return _0x387c97[_0x3aafef(0x5f2)](/<BATTLE UI OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x4e5785+=Number(RegExp['$1'])),_0x387c97[_0x3aafef(0x5f2)](/<BATTLE UI OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x4e5785+=Number(RegExp['$1'])),_0x4e5785;},Game_BattlerBase[_0x421ee0(0x2cb)][_0x421ee0(0x68b)]=function(_0x1e7b8c){const _0x47f541=_0x421ee0;if(!_0x1e7b8c)return 0x0;let _0x497ace=0x0;const _0x5b9e81=_0x1e7b8c[_0x47f541(0x24c)];return _0x5b9e81[_0x47f541(0x5f2)](/<BATTLE UI OFFSET Y:[ ]([\+\-]\d+)>/i)&&(_0x497ace+=Number(RegExp['$1'])),_0x5b9e81['match'](/<BATTLE UI OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x497ace+=Number(RegExp['$2'])),_0x497ace;},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x607)]=Game_BattlerBase['prototype'][_0x421ee0(0x1a5)],Game_BattlerBase[_0x421ee0(0x2cb)][_0x421ee0(0x1a5)]=function(_0x4c60a0){const _0x46671b=_0x421ee0;if(_0x4c60a0===this[_0x46671b(0x6c5)]()&&this[_0x46671b(0x89a)]())return!![];return VisuMZ[_0x46671b(0x674)][_0x46671b(0x607)][_0x46671b(0x8eb)](this,_0x4c60a0);},Game_BattlerBase['prototype']['isImmortal']=function(){const _0xf1079d=_0x421ee0;return this[_0xf1079d(0x3bb)];},Game_BattlerBase[_0x421ee0(0x2cb)]['setImmortal']=function(_0x4e6322){const _0x2eae15=_0x421ee0;_0x4e6322?this[_0x2eae15(0x878)]():this[_0x2eae15(0x58a)]();},Game_BattlerBase['prototype'][_0x421ee0(0x878)]=function(){const _0x4fc963=_0x421ee0;if(this[_0x4fc963(0x2ac)]())return;this['_immortal']=!![];},Game_BattlerBase['prototype'][_0x421ee0(0x58a)]=function(){const _0x433838=_0x421ee0,_0x3ee0e4=this[_0x433838(0x5bf)]();this[_0x433838(0x3bb)]=![],this['refresh'](),this[_0x433838(0x2ac)]()&&_0x3ee0e4&&(this[_0x433838(0x4ff)](),this['requestMotionRefresh']());},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x3e9)]=Game_BattlerBase[_0x421ee0(0x2cb)][_0x421ee0(0x73c)],Game_BattlerBase[_0x421ee0(0x2cb)][_0x421ee0(0x73c)]=function(){const _0x3a448f=_0x421ee0;if(!this[_0x3a448f(0x2b3)]())return![];return VisuMZ['BattleCore']['Game_BattlerBase_canAttack']['call'](this);},Game_BattlerBase[_0x421ee0(0x2cb)][_0x421ee0(0x2b3)]=function(){const _0x1ad374=_0x421ee0;for(const _0x11dcf3 of this[_0x1ad374(0x2e0)]()){if(!_0x11dcf3)continue;if(_0x11dcf3[_0x1ad374(0x24c)]['match'](/<(?:ATTACK SEAL|SEAL ATTACK)>/i))return![];}return!![];},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x6d2)]=Game_BattlerBase['prototype']['canGuard'],Game_BattlerBase[_0x421ee0(0x2cb)][_0x421ee0(0x236)]=function(){const _0x3fcd6f=_0x421ee0;if(!this[_0x3fcd6f(0x17f)]())return![];return VisuMZ[_0x3fcd6f(0x674)][_0x3fcd6f(0x6d2)][_0x3fcd6f(0x8eb)](this);},Game_BattlerBase[_0x421ee0(0x2cb)][_0x421ee0(0x17f)]=function(){const _0x4b5467=_0x421ee0;for(const _0x12c087 of this['traitObjects']()){if(!_0x12c087)continue;if(_0x12c087['note'][_0x4b5467(0x5f2)](/<(?:GUARD SEAL|SEAL GUARD)>/i))return![];}return!![];},Game_BattlerBase[_0x421ee0(0x2cb)][_0x421ee0(0x3d9)]=function(){const _0x185482=_0x421ee0;for(const _0x527316 of this[_0x185482(0x2e0)]()){if(!_0x527316)continue;if(_0x527316[_0x185482(0x24c)]['match'](/<(?:ITEM SEAL|SEAL ITEM|SEAL ITEMS)>/i))return![];}return!![];},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x37e)]=Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x4b8)],Game_Battler['prototype'][_0x421ee0(0x4b8)]=function(){const _0x4b7205=_0x421ee0;if(SceneManager[_0x4b7205(0x225)]()&&$gameTroop[_0x4b7205(0x771)]()<=0x0)return;this[_0x4b7205(0x4bf)](_0x4b7205(0x417)),VisuMZ[_0x4b7205(0x674)][_0x4b7205(0x37e)][_0x4b7205(0x8eb)](this),this[_0x4b7205(0x47b)](),this['processBattleCoreJS'](_0x4b7205(0x6b5));},Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x47b)]=function(){const _0x154ea8=_0x421ee0;if(SceneManager[_0x154ea8(0x225)]())for(const _0x4a374f of this['traitObjects']()){if(!_0x4a374f)continue;this[_0x154ea8(0x2d3)](_0x4a374f);}},Game_Battler['prototype'][_0x421ee0(0x2d3)]=function(_0xfb1208){const _0xfd076e=_0x421ee0;if(!Imported[_0xfd076e(0x588)])return;if(!SceneManager[_0xfd076e(0x225)]())return;if(this[_0xfd076e(0x2ac)]())return;if(this[_0xfd076e(0x515)]())return;if(_0xfb1208['note']['match'](/<(?:REGENERATE|REGEN|DEGEN|DOT|SLIP)[ ]ANIMATION:[ ](\d+)>/i)){const _0x28cdd6=Number(RegExp['$1']);$gameTemp['requestFauxAnimation']([this],_0x28cdd6,![],![]);}},VisuMZ['BattleCore'][_0x421ee0(0x903)]=Game_Battler[_0x421ee0(0x2cb)]['startTpbTurn'],Game_Battler['prototype'][_0x421ee0(0x75e)]=function(){const _0x130bcf=_0x421ee0;this[_0x130bcf(0x4bf)](_0x130bcf(0x2db)),VisuMZ[_0x130bcf(0x674)][_0x130bcf(0x903)][_0x130bcf(0x8eb)](this),this['processBattleCoreJS'](_0x130bcf(0x6c9));},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x71e)]=Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x1ee)],Game_Battler['prototype'][_0x421ee0(0x1ee)]=function(){const _0x38f535=_0x421ee0;this[_0x38f535(0x4bf)](_0x38f535(0x2a8)),VisuMZ[_0x38f535(0x674)][_0x38f535(0x71e)][_0x38f535(0x8eb)](this),this[_0x38f535(0x4bf)](_0x38f535(0x894));},Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x4bf)]=function(_0x721332){const _0x51bac6=_0x421ee0,_0x5f35a3=VisuMZ['BattleCore'][_0x51bac6(0x57b)][_0x51bac6(0x203)];if(_0x5f35a3[_0x721332])_0x5f35a3[_0x721332][_0x51bac6(0x8eb)](this);for(const _0x5c88cb of this[_0x51bac6(0x2e0)]()){if(!_0x5c88cb)continue;key=VisuMZ['BattleCore'][_0x51bac6(0x4f1)](_0x5c88cb,_0x721332),VisuMZ[_0x51bac6(0x674)]['JS'][key]&&VisuMZ[_0x51bac6(0x674)]['JS'][key][_0x51bac6(0x8eb)](this,this,this,_0x5c88cb,0x0);}},Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x6d3)]=function(){const _0x4393dd=_0x421ee0;return VisuMZ['BattleCore']['Settings'][_0x4393dd(0x92b)]['ChantStyle']||![];},Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x517)]=function(){const _0x18ebc1=_0x421ee0;if(this['isWaiting']()){if(this[_0x18ebc1(0x6d3)]()){if(this[_0x18ebc1(0x311)][_0x18ebc1(0x676)](_0x19e720=>_0x19e720[_0x18ebc1(0x8f0)]()&&_0x19e720[_0x18ebc1(0x80c)]()))return!![];}else{if(this[_0x18ebc1(0x311)][_0x18ebc1(0x676)](_0x25358d=>_0x25358d[_0x18ebc1(0x8f0)]()&&_0x25358d[_0x18ebc1(0x655)]()))return!![];}}if(BattleManager[_0x18ebc1(0x67c)]()&&this[_0x18ebc1(0x6a9)]===_0x18ebc1(0x37a))return this[_0x18ebc1(0x6d3)]()?this[_0x18ebc1(0x880)]()&&this['currentAction']()[_0x18ebc1(0x8f0)]()&&this[_0x18ebc1(0x880)]()[_0x18ebc1(0x80c)]():this[_0x18ebc1(0x880)]()&&this[_0x18ebc1(0x880)]()[_0x18ebc1(0x8f0)]()&&this[_0x18ebc1(0x880)]()[_0x18ebc1(0x655)]();return![];},Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x7e6)]=function(){const _0x29f9a2=_0x421ee0;if(BattleManager[_0x29f9a2(0x67c)]()&&this[_0x29f9a2(0x6a9)]==='casting')return this['chantStyle']()?this['currentAction']()&&this[_0x29f9a2(0x880)]()[_0x29f9a2(0x8f0)]()&&!this[_0x29f9a2(0x880)]()[_0x29f9a2(0x80c)]():this[_0x29f9a2(0x880)]()&&this['currentAction']()['item']()&&!this[_0x29f9a2(0x880)]()[_0x29f9a2(0x655)]();return![];},VisuMZ['BattleCore']['Game_Battler_clearDamagePopup']=Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x474)],Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x474)]=function(){const _0x590d45=_0x421ee0;VisuMZ['BattleCore'][_0x590d45(0x2e2)][_0x590d45(0x8eb)](this),this[_0x590d45(0x8b4)]=[];},Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x92a)]=function(){const _0x2f3197=_0x421ee0;if(!this[_0x2f3197(0x8b4)])this[_0x2f3197(0x474)]();return this[_0x2f3197(0x8b4)][_0x2f3197(0x4be)]>0x0;},Game_Battler['prototype'][_0x421ee0(0x709)]=function(){const _0x4d1b46=_0x421ee0;if(!SceneManager[_0x4d1b46(0x225)]())return;if(!this['_damagePopupArray'])this[_0x4d1b46(0x474)]();this[_0x4d1b46(0x55e)]();const _0x3fb9ba=this[_0x4d1b46(0x35a)]();if(_0x3fb9ba)_0x3fb9ba[_0x4d1b46(0x27b)]();},Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x55e)]=function(){const _0x383805=_0x421ee0,_0x2d93c7=this[_0x383805(0x895)]();if(_0x2d93c7['missed']||_0x2d93c7['evaded']){const _0x53b40f=JsonEx[_0x383805(0x4ed)](_0x2d93c7);_0x53b40f[_0x383805(0x265)]=![],_0x53b40f['mpDamage']=0x0,this['_damagePopupArray'][_0x383805(0x7b3)](_0x53b40f);}if(_0x2d93c7[_0x383805(0x265)]){const _0x306fe3=JsonEx[_0x383805(0x4ed)](_0x2d93c7);_0x306fe3[_0x383805(0x3d7)]=![],_0x306fe3['evaded']=![],_0x306fe3[_0x383805(0x2ec)]=0x0,this[_0x383805(0x8b4)][_0x383805(0x7b3)](_0x306fe3);}if(_0x2d93c7['mpDamage']!==0x0){const _0x1832d2=JsonEx[_0x383805(0x4ed)](_0x2d93c7);_0x1832d2['missed']=![],_0x1832d2['evaded']=![],_0x1832d2[_0x383805(0x265)]=![],this[_0x383805(0x8b4)][_0x383805(0x7b3)](_0x1832d2);}},Game_Battler[_0x421ee0(0x2cb)]['getNextDamagePopup']=function(){const _0x1dfefd=_0x421ee0;if(!this[_0x1dfefd(0x8b4)])this[_0x1dfefd(0x474)]();return VisuMZ[_0x1dfefd(0x674)]['Settings'][_0x1dfefd(0x60c)]['NewPopupBottom']?this[_0x1dfefd(0x8b4)][_0x1dfefd(0x5bc)]():this[_0x1dfefd(0x8b4)][_0x1dfefd(0x310)]();},Game_Battler[_0x421ee0(0x2cb)]['setupTextPopup']=function(_0x475eb2,_0x50e84c){const _0x5ca108=_0x421ee0;if(!SceneManager[_0x5ca108(0x225)]())return;if(!this[_0x5ca108(0x35a)]())return;if(_0x475eb2['length']<=0x0)return;_0x50e84c=_0x50e84c||{},_0x50e84c[_0x5ca108(0x1e6)]=_0x50e84c[_0x5ca108(0x1e6)]||_0x5ca108(0x2fe),_0x50e84c[_0x5ca108(0x78e)]=_0x50e84c[_0x5ca108(0x78e)]||[0x0,0x0,0x0,0x0],_0x50e84c[_0x5ca108(0x27e)]=_0x50e84c[_0x5ca108(0x27e)]||0x0,this[_0x5ca108(0x35a)]()['setupTextPopup'](_0x475eb2,_0x50e84c);},Game_Battler[_0x421ee0(0x2cb)]['setupIconTextPopup']=function(_0x5b5d8c,_0x1d3c03,_0x53d00e){const _0x211b16=_0x421ee0;if(!SceneManager['isSceneBattle']())return;if(!this[_0x211b16(0x35a)]())return;if(_0x1d3c03[_0x211b16(0x4be)]<=0x0)return;_0x53d00e=_0x53d00e||{},_0x53d00e[_0x211b16(0x1e6)]=_0x53d00e[_0x211b16(0x1e6)]||_0x211b16(0x2fe),_0x53d00e[_0x211b16(0x78e)]=_0x53d00e[_0x211b16(0x78e)]||[0x0,0x0,0x0,0x0],_0x53d00e[_0x211b16(0x27e)]=_0x53d00e['flashDuration']||0x0,this[_0x211b16(0x35a)]()['setupIconTextPopup'](_0x5b5d8c,_0x1d3c03,_0x53d00e);},Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x79e)]=function(){const _0x494894=_0x421ee0;if(this['isHidden']())return![];if(this[_0x494894(0x5bf)]()&&this['isAppeared']())return!![];if(this['isEnemy']()&&this[_0x494894(0x3fd)]()){if(this[_0x494894(0x2ac)]()&&this['allowCollapse']())return![];}else{if(this[_0x494894(0x2ac)]())return![];}return!![];},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x252)]=Game_Battler['prototype'][_0x421ee0(0x652)],Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x652)]=function(){const _0x26b4a7=_0x421ee0;VisuMZ[_0x26b4a7(0x674)][_0x26b4a7(0x252)][_0x26b4a7(0x8eb)](this),this['clearFreezeMotion']();},Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x656)]=function(){return!![];},Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x3e0)]=function(){return![];},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x4e7)]=Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x3a5)],Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x3a5)]=function(_0x145083){const _0x2dd606=_0x421ee0;VisuMZ[_0x2dd606(0x674)][_0x2dd606(0x4e7)][_0x2dd606(0x8eb)](this,_0x145083),this[_0x2dd606(0x463)](_0x145083);},Game_Battler['prototype'][_0x421ee0(0x463)]=function(_0x244e0d){const _0x584441=_0x421ee0;this[_0x584441(0x7b2)](![]);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x3fc)]=Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x5d9)],Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x5d9)]=function(_0xc364f){const _0x172df9=_0x421ee0;VisuMZ[_0x172df9(0x674)]['Game_Battler_performActionStart'][_0x172df9(0x8eb)](this,_0xc364f);if(!_0xc364f['isGuard']()){const _0x20cb19=this['battler']();if(_0x20cb19)_0x20cb19[_0x172df9(0x64d)]();}this[_0x172df9(0x7b2)](![]);},Game_Battler['prototype'][_0x421ee0(0x53f)]=function(){const _0xeec827=_0x421ee0,_0x344178=this[_0xeec827(0x3f2)];this['_flinched']=![];if(BattleManager[_0xeec827(0x4b9)]()&&this[_0xeec827(0x579)]()){const _0x3fa981=this[_0xeec827(0x35a)]();if(_0x3fa981&&_0x344178)_0x3fa981[_0xeec827(0x64d)]();return;}const _0x4d36e4=this[_0xeec827(0x35a)]();if(_0x4d36e4)_0x4d36e4[_0xeec827(0x3c3)]();this[_0xeec827(0x7b2)](![]),this[_0xeec827(0x355)]();},Game_Battler[_0x421ee0(0x2cb)]['performActionMotions']=function(_0xf617f7){const _0x421a8f=_0x421ee0;if(_0xf617f7[_0x421a8f(0x7a5)]())this[_0x421a8f(0x1d5)]();else{if(_0xf617f7['isGuard']())this[_0x421a8f(0x6f0)](_0x421a8f(0x7f3));else{if(_0xf617f7[_0x421a8f(0x80c)]())this[_0x421a8f(0x6f0)](_0x421a8f(0x249));else{if(_0xf617f7[_0x421a8f(0x767)]())_0xf617f7['item']()[_0x421a8f(0x760)]['type']>0x0?this[_0x421a8f(0x1d5)]():this[_0x421a8f(0x6f0)](_0x421a8f(0x83c));else _0xf617f7['isItem']()&&this['requestMotion'](_0x421a8f(0x8f0));}}}},Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x169)]=function(){const _0x1fe040=_0x421ee0;return $dataSystem[_0x1fe040(0x7f1)][0x0];},Game_Battler[_0x421ee0(0x2cb)]['getAttackWeaponAnimationId']=function(){const _0x181a5b=_0x421ee0,_0x4f7773=this['getAttackMotion']();return _0x4f7773?_0x4f7773[_0x181a5b(0x1b3)]:0x0;},Game_Battler[_0x421ee0(0x2cb)]['performSubstitute']=function(_0x72a87f){const _0x142b13=_0x421ee0;if(!$gameSystem['isSideView']())return;const _0x206957=this[_0x142b13(0x35a)](),_0xa72608=_0x72a87f[_0x142b13(0x35a)]();if(!_0x206957||!_0xa72608)return;const _0xf268b3=_0xa72608[_0x142b13(0x923)],_0x3d0992=_0xa72608[_0x142b13(0x88b)];this[_0x142b13(0x319)](_0xf268b3,_0x3d0992,0x0,![],_0x142b13(0x363),-0x1),_0x206957['updatePosition']();const _0x4e10e2=VisuMZ[_0x142b13(0x674)][_0x142b13(0x57b)][_0x142b13(0x16d)];let _0x566f0b=(_0xa72608['width']+_0x206957[_0x142b13(0x62f)])/0x2;_0x566f0b*=this[_0x142b13(0x6da)]()?0x1:-0x1;let _0x38949b=_0x4e10e2[_0x142b13(0x716)]*(this['isActor']()?0x1:-0x1);_0x72a87f[_0x142b13(0x774)](_0x566f0b,_0x38949b,0x0,![],_0x142b13(0x363)),_0xa72608[_0x142b13(0x5b6)]();},Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x6f0)]=function(_0x39064d){const _0x317932=_0x421ee0;if(SceneManager[_0x317932(0x225)]()){const _0x2725ac=this['battler']();_0x2725ac&&(_0x2725ac[_0x317932(0x3c8)](_0x39064d),['swing',_0x317932(0x5e3),'missile']['includes'](_0x39064d)&&this['performWeaponAnimation']());}this[_0x317932(0x329)]();},Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x8dd)]=function(){},Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x223)]=function(_0x1b4962){const _0x4bcc56=_0x421ee0;if(SceneManager['isSceneBattle']()){const _0x2a6690=this[_0x4bcc56(0x35a)]();if(_0x2a6690)_0x2a6690[_0x4bcc56(0x301)](_0x1b4962);}},Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x59b)]=function(){const _0x1f6bcd=_0x421ee0;if(SceneManager['isSceneBattle']()){const _0x3e3705=this[_0x1f6bcd(0x34f)]();this[_0x1f6bcd(0x223)](_0x3e3705);}},Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x7a1)]=function(_0x4fb3e9,_0x26f924){const _0x3e3372=_0x421ee0;if(!_0x4fb3e9)return;if(!_0x4fb3e9[_0x3e3372(0x8f0)]())return;if(_0x4fb3e9[_0x3e3372(0x7a5)]())return;if(_0x4fb3e9[_0x3e3372(0x45c)]())return;if(_0x4fb3e9['isItem']())return;let _0x3b146e=0x0;const _0x31af2d=VisuMZ[_0x3e3372(0x674)][_0x3e3372(0x57b)][_0x3e3372(0x16d)],_0x28c799=_0x4fb3e9[_0x3e3372(0x8f0)]()[_0x3e3372(0x24c)];if(_0x28c799['match'](/<CAST ANIMATION: (\d+)>/i))_0x3b146e=Number(RegExp['$1']);else{if(_0x28c799[_0x3e3372(0x5f2)](/<NO CAST ANIMATION>/i))return;else{if(_0x4fb3e9['isCertainHit']())_0x3b146e=_0x31af2d['CastCertain'];else{if(_0x4fb3e9[_0x3e3372(0x427)]())_0x3b146e=_0x31af2d[_0x3e3372(0x5cf)];else _0x4fb3e9['isMagical']()&&(_0x3b146e=_0x31af2d[_0x3e3372(0x4d4)]);}}}_0x3b146e>0x0&&$gameTemp[_0x3e3372(0x31e)]([this],_0x3b146e,!!_0x26f924);},Game_Battler['prototype'][_0x421ee0(0x4d6)]=function(){const _0x447a1a=_0x421ee0;SoundManager[_0x447a1a(0x66c)]();let _0x59ec4f=VisuMZ[_0x447a1a(0x674)][_0x447a1a(0x57b)][_0x447a1a(0x16d)][_0x447a1a(0x8a3)];_0x59ec4f>0x0&&$gameTemp['requestAnimation']([this],_0x59ec4f);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x7fd)]=Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x71c)],Game_Battler[_0x421ee0(0x2cb)]['performDamage']=function(){const _0x4c640c=_0x421ee0;VisuMZ[_0x4c640c(0x674)][_0x4c640c(0x7fd)]['call'](this),this[_0x4c640c(0x513)]();},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x6d9)]=Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x377)],Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x377)]=function(){const _0x478c4d=_0x421ee0;VisuMZ[_0x478c4d(0x674)][_0x478c4d(0x6d9)][_0x478c4d(0x8eb)](this),this[_0x478c4d(0x513)]();},VisuMZ['BattleCore'][_0x421ee0(0x3ff)]=Game_Battler['prototype'][_0x421ee0(0x925)],Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x925)]=function(){const _0xae826e=_0x421ee0;VisuMZ[_0xae826e(0x674)][_0xae826e(0x3ff)][_0xae826e(0x8eb)](this),this[_0xae826e(0x513)]();},Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x513)]=function(){const _0x190090=_0x421ee0;if(!$gameSystem[_0x190090(0x649)]())return;if(this['_flinched'])return;this[_0x190090(0x3f2)]=!![];const _0x317a69=this[_0x190090(0x35a)]();if(_0x317a69)_0x317a69[_0x190090(0x3b6)]();},Game_Battler[_0x421ee0(0x2cb)]['requestMotionRefresh']=function(){const _0x33b82a=_0x421ee0;if(this[_0x33b82a(0x2ac)]()&&this[_0x33b82a(0x4f3)]!==_0x33b82a(0x724)){this['requestMotion'](_0x33b82a(0x724));return;}if(this[_0x33b82a(0x2ac)]()&&this[_0x33b82a(0x4f3)]===_0x33b82a(0x724))return;if(!!this[_0x33b82a(0x799)])return;if(this['isEnemy']()){if(!this['isDuringNonLoopingMotion']())this[_0x33b82a(0x35a)]()['refreshMotion']();this['clearFreezeMotion']();return;}if(this[_0x33b82a(0x4f3)]===_0x33b82a(0x416))return;if(this[_0x33b82a(0x4f3)]===_0x33b82a(0x5c8)&&!BattleManager[_0x33b82a(0x579)]())return;if(this[_0x33b82a(0x4f3)]==='guard'&&!BattleManager[_0x33b82a(0x579)]())return;this[_0x33b82a(0x652)]();if(this[_0x33b82a(0x35a)]()&&BattleManager[_0x33b82a(0x579)]()){this[_0x33b82a(0x35a)]()[_0x33b82a(0x763)](),this[_0x33b82a(0x329)]();return;}},Game_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x934)]=function(){const _0x2ef4be=_0x421ee0;if(!this[_0x2ef4be(0x3fd)]())return![];const _0x374d8c=this[_0x2ef4be(0x35a)]();if(!_0x374d8c)return![];const _0x4c2712=_0x374d8c[_0x2ef4be(0x841)];if(!_0x4c2712)return![];const _0x1f8b94=_0x4c2712[_0x2ef4be(0x7e4)];return _0x1f8b94&&!_0x1f8b94[_0x2ef4be(0x88f)];},Game_Battler['prototype'][_0x421ee0(0x199)]=function(){const _0x18baec=_0x421ee0;return this[_0x18baec(0x915)];},Game_Battler['prototype'][_0x421ee0(0x7b2)]=function(_0x17a59c){const _0x42eca8=_0x421ee0;if(!$gameSystem[_0x42eca8(0x649)]())return;this[_0x42eca8(0x915)]=_0x17a59c;const _0x207f41=this['battler']();if(_0x207f41)_0x207f41[_0x42eca8(0x22a)]();},Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x2f8)]=function(_0x4d2341,_0x2a8d70,_0x5b7f9c){const _0x20b1b1=_0x421ee0;if(!$gameSystem[_0x20b1b1(0x649)]())return;const _0x238947=this[_0x20b1b1(0x35a)]();if(!_0x238947)return;if(_0x4d2341===_0x238947[_0x20b1b1(0x923)])return;let _0x11d5ee=![];if(this[_0x20b1b1(0x6da)]()){if(_0x4d2341>_0x238947['_baseX'])_0x11d5ee=!![];if(_0x4d2341<_0x238947[_0x20b1b1(0x923)])_0x11d5ee=![];}else{if(this[_0x20b1b1(0x84c)]()){if(_0x4d2341>_0x238947[_0x20b1b1(0x923)])_0x11d5ee=![];if(_0x4d2341<_0x238947['_baseX'])_0x11d5ee=!![];}};this[_0x20b1b1(0x7b2)](_0x5b7f9c?!_0x11d5ee:_0x11d5ee),_0x238947[_0x20b1b1(0x22a)]();},Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x774)]=function(_0x41cf5b,_0x4dc618,_0x228e2f,_0x1d5745,_0x28587b){const _0x156d90=_0x421ee0;if(!$gameSystem[_0x156d90(0x649)]())return;const _0x527a01=this[_0x156d90(0x35a)]();if(!_0x527a01)return;if(_0x1d5745)this[_0x156d90(0x2f8)](_0x41cf5b+_0x527a01[_0x156d90(0x923)],_0x4dc618+_0x527a01[_0x156d90(0x88b)],![]);_0x41cf5b+=_0x527a01[_0x156d90(0x923)]-_0x527a01[_0x156d90(0x788)],_0x4dc618+=_0x527a01[_0x156d90(0x88b)]-_0x527a01[_0x156d90(0x538)],_0x527a01[_0x156d90(0x8c3)](_0x41cf5b,_0x4dc618,_0x228e2f);if(Imported[_0x156d90(0x588)])_0x527a01[_0x156d90(0x82e)](_0x28587b||_0x156d90(0x363));},Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x319)]=function(_0x217df3,_0x305632,_0x41a88a,_0x36e101,_0x3f9b44,_0xf86a1f){const _0x79fad0=_0x421ee0;if(!$gameSystem['isSideView']())return;const _0x4acd80=this[_0x79fad0(0x35a)]();if(!_0x4acd80)return;_0xf86a1f=_0xf86a1f||0x0;if(_0xf86a1f>0x0){if(_0x4acd80['_baseX']>_0x217df3)_0x217df3+=_0x4acd80['width']/0x2+_0xf86a1f;if(_0x4acd80[_0x79fad0(0x923)]<_0x217df3)_0x217df3-=_0x4acd80[_0x79fad0(0x62f)]/0x2+_0xf86a1f;}if(_0x36e101)this[_0x79fad0(0x2f8)](_0x217df3,_0x305632,![]);_0x217df3-=_0x4acd80[_0x79fad0(0x788)],_0x305632-=_0x4acd80[_0x79fad0(0x538)],_0x4acd80[_0x79fad0(0x8c3)](_0x217df3,_0x305632,_0x41a88a);if(Imported['VisuMZ_0_CoreEngine'])_0x4acd80[_0x79fad0(0x82e)](_0x3f9b44||_0x79fad0(0x363));},Game_Battler['prototype'][_0x421ee0(0x4ee)]=function(_0x4df5d3,_0x8ec18b,_0x577149){const _0x5c9f71=_0x421ee0;if(!$gameSystem[_0x5c9f71(0x649)]())return;const _0x5dda9b=this['battler']();if(!_0x5dda9b)return;_0x5dda9b[_0x5c9f71(0x8fe)](_0x4df5d3,_0x8ec18b,_0x577149);},Game_Battler['prototype'][_0x421ee0(0x727)]=function(_0x27febd,_0x5bec7d){const _0x366093=_0x421ee0;if(!$gameSystem[_0x366093(0x649)]())return;const _0x3f8458=this[_0x366093(0x35a)]();if(!_0x3f8458)return;_0x3f8458['startJump'](_0x27febd,_0x5bec7d);},Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x1a1)]=function(_0x3e051e,_0x5bbdd0,_0x4e7de3,_0x4f3687){const _0x59e69a=_0x421ee0;if(!$gameSystem[_0x59e69a(0x649)]())return;const _0x37bc71=this['battler']();if(!_0x37bc71)return;_0x37bc71[_0x59e69a(0x18e)](_0x3e051e,_0x5bbdd0,_0x4e7de3,_0x4f3687);},Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x246)]=function(_0x269ca0,_0x3bdd13,_0x6dfe11,_0x157b2c){const _0x49ae04=_0x421ee0;if(!$gameSystem[_0x49ae04(0x649)]())return;const _0x5851e5=this[_0x49ae04(0x35a)]();if(!_0x5851e5)return;this[_0x49ae04(0x6da)]()&&(_0x269ca0*=-0x1,_0x3bdd13*=-0x1),_0x5851e5['startSkew'](_0x269ca0,_0x3bdd13,_0x6dfe11,_0x157b2c);},Game_Battler[_0x421ee0(0x2cb)]['growBattler']=function(_0x282d56,_0x577789,_0x25116f,_0x5bdc9a){const _0xe59bf1=_0x421ee0;if(!$gameSystem['isSideView']())return;const _0x2a4844=this[_0xe59bf1(0x35a)]();if(!_0x2a4844)return;_0x2a4844[_0xe59bf1(0x2eb)](_0x282d56,_0x577789,_0x25116f,_0x5bdc9a);},Game_Battler[_0x421ee0(0x2cb)]['changeBattlerOpacity']=function(_0x57cc77,_0x4b7fe9,_0x1d2dc7){const _0x36a7ad=_0x421ee0;if(!$gameSystem[_0x36a7ad(0x649)]())return;const _0x20a5d1=this[_0x36a7ad(0x35a)]();if(!_0x20a5d1)return;_0x20a5d1['startOpacity'](_0x57cc77,_0x4b7fe9,_0x1d2dc7);},Game_Battler['prototype'][_0x421ee0(0x329)]=function(){const _0x364980=_0x421ee0,_0x3a5c85=!!this[_0x364980(0x799)];this[_0x364980(0x799)]=undefined,_0x3a5c85&&(this['requestMotionRefresh'](),this['clearFreezeMotionForWeapons']());},Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x901)]=function(){const _0x4b5f10=_0x421ee0;if(!SceneManager[_0x4b5f10(0x225)]())return;const _0x22ac36=this['battler']();if(!_0x22ac36)return;let _0x5e8ca7=this[_0x4b5f10(0x6da)]()?_0x22ac36[_0x4b5f10(0x4a2)]:_0x22ac36[_0x4b5f10(0x841)][_0x4b5f10(0x4a2)];_0x5e8ca7&&_0x5e8ca7['setup'](0x0);},Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x5a6)]=function(_0x5507e3,_0x3cef14,_0x58b645){const _0x140f6c=_0x421ee0;if(this[_0x140f6c(0x84c)]()&&!this[_0x140f6c(0x3fd)]())return;let _0x4a62d1=0x0,_0x170555=0x0;_0x5507e3[_0x140f6c(0x5f2)](/ATTACK[ ](\d+)/i)&&(_0x170555=Number(RegExp['$1']),_0x170555--);if(this[_0x140f6c(0x6da)]()){const _0x1133a6=this['weapons']();_0x4a62d1=_0x1133a6[_0x170555]?_0x1133a6[_0x170555][_0x140f6c(0x7c5)]:0x0;}else this[_0x140f6c(0x84c)]()&&(_0x4a62d1=this[_0x140f6c(0x620)]()['wtypeId']||0x0);const _0x4f1cb8=$dataSystem['attackMotions'][_0x4a62d1];_0x5507e3[_0x140f6c(0x5f2)](/attack/i)&&(_0x5507e3=[_0x140f6c(0x5e3),'swing','missile'][_0x4f1cb8[_0x140f6c(0x80a)]]||_0x140f6c(0x1ab)),this['_freezeMotionData']={'motionType':_0x5507e3,'weaponImageId':_0x3cef14?_0x4f1cb8['weaponImageId']:0x0,'pattern':_0x58b645};},Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x457)]=function(_0x2b0571){const _0x13502e=_0x421ee0;if(!_0x2b0571)return![];return _0x2b0571[_0x13502e(0x178)]()===this[_0x13502e(0x178)]();},Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x498)]=function(_0x55d6b6){const _0x9dcb10=_0x421ee0;if(!_0x55d6b6)return![];return _0x55d6b6[_0x9dcb10(0x38d)]()===this[_0x9dcb10(0x178)]();},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x451)]=Game_Actor['prototype'][_0x421ee0(0x578)],Game_Actor[_0x421ee0(0x2cb)]['setup']=function(_0x2bf777){const _0x288bee=_0x421ee0;VisuMZ[_0x288bee(0x674)][_0x288bee(0x451)][_0x288bee(0x8eb)](this,_0x2bf777),this[_0x288bee(0x473)]();},Game_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x473)]=function(){const _0x1843c9=_0x421ee0;this['_battlePortrait']='',this[_0x1843c9(0x41c)]()&&this['actor']()[_0x1843c9(0x24c)][_0x1843c9(0x5f2)](/<BATTLE (?:IMAGE|PORTRAIT):[ ](.*)>/i)&&(this['_battlePortrait']=String(RegExp['$1']));},Game_Actor[_0x421ee0(0x2cb)]['getBattlePortraitFilename']=function(){const _0x4d60c5=_0x421ee0;if(this[_0x4d60c5(0x47d)]()!=='')return this[_0x4d60c5(0x47d)]();else{if(Imported[_0x4d60c5(0x472)]&&this[_0x4d60c5(0x554)]()!=='')return this[_0x4d60c5(0x554)]();}return'';},Game_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x47d)]=function(){const _0x44f8cb=_0x421ee0;if(this[_0x44f8cb(0x77b)]===undefined)this[_0x44f8cb(0x473)]();return this[_0x44f8cb(0x77b)];},Game_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x47c)]=function(_0x417878){const _0x431d7f=_0x421ee0;if(this[_0x431d7f(0x77b)]===undefined)this['initBattlePortrait']();this[_0x431d7f(0x77b)]=_0x417878;if(SceneManager[_0x431d7f(0x225)]()&&$gameParty[_0x431d7f(0x7a9)]()[_0x431d7f(0x7f2)](this)){const _0x475d8b=SceneManager[_0x431d7f(0x855)]['_statusWindow'];if(_0x475d8b)_0x475d8b[_0x431d7f(0x56b)](this);}},Game_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x7ed)]=function(){return!![];},Game_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x218)]=function(){const _0x50d04f=_0x421ee0;if(!this[_0x50d04f(0x521)]()&&BattleManager[_0x50d04f(0x228)])return!![];return Game_Battler['prototype'][_0x50d04f(0x218)]['call'](this);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x411)]=Game_Actor['prototype']['makeActionList'],Game_Actor[_0x421ee0(0x2cb)]['makeActionList']=function(){const _0x4ca307=_0x421ee0;if(BattleManager[_0x4ca307(0x228)]&&!ConfigManager['autoBattleUseSkills'])return this[_0x4ca307(0x5c6)]();else{return VisuMZ[_0x4ca307(0x674)][_0x4ca307(0x411)][_0x4ca307(0x8eb)](this);;}},Game_Actor['prototype']['makeActionListAutoAttack']=function(){const _0x1a0783=_0x421ee0,_0x1b98e7=[],_0x39f0bc=new Game_Action(this);return _0x39f0bc[_0x1a0783(0x8b8)](),_0x1b98e7[_0x1a0783(0x7b3)](_0x39f0bc),_0x1b98e7;},Game_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x48b)]=function(){const _0x447034=_0x421ee0;return this[_0x447034(0x1dc)]()['note']['match'](/<BATTLE COMMANDS>\s*([\s\S]*)\s*<\/BATTLE COMMANDS>/i)?String(RegExp['$1'])[_0x447034(0x6d8)](/[\r\n]+/):VisuMZ[_0x447034(0x674)][_0x447034(0x57b)]['ActorCmd'][_0x447034(0x400)];},Game_Actor['prototype'][_0x421ee0(0x8de)]=function(){const _0x4eb649=_0x421ee0;if(this[_0x4eb649(0x2ce)]['svAnchorX']!==undefined)return this[_0x4eb649(0x2ce)][_0x4eb649(0x8a0)];return this[_0x4eb649(0x41c)]()[_0x4eb649(0x24c)][_0x4eb649(0x5f2)](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)?(this[_0x4eb649(0x2ce)]['svAnchorX']=eval(RegExp['$1']),this[_0x4eb649(0x2ce)][_0x4eb649(0x8e8)]=eval(RegExp['$2'])):this['_cache'][_0x4eb649(0x8a0)]=Game_Battler[_0x4eb649(0x2cb)][_0x4eb649(0x8de)][_0x4eb649(0x8eb)](this),this['_cache'][_0x4eb649(0x8a0)];},Game_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x8bf)]=function(){const _0x6546d4=_0x421ee0;if(this[_0x6546d4(0x2ce)]['svAnchorY']!==undefined)return this[_0x6546d4(0x2ce)][_0x6546d4(0x8e8)];return this[_0x6546d4(0x41c)]()[_0x6546d4(0x24c)][_0x6546d4(0x5f2)](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)?(this[_0x6546d4(0x2ce)][_0x6546d4(0x8a0)]=eval(RegExp['$1']),this[_0x6546d4(0x2ce)][_0x6546d4(0x8e8)]=eval(RegExp['$2'])):this[_0x6546d4(0x2ce)][_0x6546d4(0x8e8)]=Game_Battler[_0x6546d4(0x2cb)][_0x6546d4(0x8bf)]['call'](this),this['_cache'][_0x6546d4(0x8e8)];},Game_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x27c)]=function(){const _0x23c29a=_0x421ee0;if(this['_cache']['svShadow']!==undefined)return this[_0x23c29a(0x2ce)][_0x23c29a(0x44c)];if(this['actor']()['note'][_0x23c29a(0x5f2)](/<SIDEVIEW SHOW SHADOW>/i))this[_0x23c29a(0x2ce)]['svShadow']=!![];else this['actor']()[_0x23c29a(0x24c)][_0x23c29a(0x5f2)](/<SIDEVIEW HIDE SHADOW>/i)?this[_0x23c29a(0x2ce)]['svShadow']=![]:this[_0x23c29a(0x2ce)]['svShadow']=Game_Battler[_0x23c29a(0x2cb)][_0x23c29a(0x27c)]['call'](this);return this[_0x23c29a(0x2ce)][_0x23c29a(0x44c)];},Game_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x49b)]=function(){const _0x4c1e90=_0x421ee0;return VisuMZ[_0x4c1e90(0x674)][_0x4c1e90(0x57b)][_0x4c1e90(0x92b)][_0x4c1e90(0x67d)];},Game_Actor['prototype'][_0x421ee0(0x8dd)]=function(){const _0x1d81e4=_0x421ee0,_0x50b2e3=this[_0x1d81e4(0x80e)](),_0x2f3f5b=_0x50b2e3[0x0]?_0x50b2e3[0x0][_0x1d81e4(0x7c5)]:0x0,_0xb3c668=$dataSystem[_0x1d81e4(0x7f1)][_0x2f3f5b];_0xb3c668&&this[_0x1d81e4(0x223)](_0xb3c668[_0x1d81e4(0x1b3)]);},Game_Actor[_0x421ee0(0x2cb)]['performAction']=function(_0x4b0473){const _0x1f7c2a=_0x421ee0;Game_Battler[_0x1f7c2a(0x2cb)][_0x1f7c2a(0x686)]['call'](this,_0x4b0473),this[_0x1f7c2a(0x54b)](_0x4b0473);},Game_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x169)]=function(){const _0x1d0794=_0x421ee0,_0x2cbfbc=this[_0x1d0794(0x80e)](),_0x4a0371=_0x2cbfbc[0x0]?_0x2cbfbc[0x0]['wtypeId']:0x0;return $dataSystem[_0x1d0794(0x7f1)][_0x4a0371];},Game_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x808)]=function(_0x3b26e1){const _0x5b0465=_0x421ee0;_0x3b26e1=_0x3b26e1||0x1,_0x3b26e1--;const _0x2a699e=this[_0x5b0465(0x80e)]();return _0x2a699e[_0x3b26e1]?_0x2a699e[_0x3b26e1][_0x5b0465(0x908)]:0x0;},Game_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x1e2)]=function(_0x3f0e1f){const _0x47bc62=_0x421ee0;_0x3f0e1f=_0x3f0e1f||0x1,_0x3f0e1f--;const _0x3c7022=this[_0x47bc62(0x80e)](),_0x308c04=_0x3c7022[_0x3f0e1f]?_0x3c7022[_0x3f0e1f]['wtypeId']:0x0;return $dataSystem[_0x47bc62(0x7f1)][_0x308c04];},Game_Actor['prototype'][_0x421ee0(0x6ef)]=function(_0x222b37){const _0xe6bb83=_0x421ee0;_0x222b37=_0x222b37||0x1,_0x222b37--;const _0x4c5698=this[_0xe6bb83(0x80e)](),_0x47f29f=_0x4c5698[_0x222b37]?_0x4c5698[_0x222b37]['wtypeId']:0x0,_0x541f80=$dataSystem[_0xe6bb83(0x7f1)][_0x47f29f];if(_0x541f80){if(_0x541f80[_0xe6bb83(0x80a)]===0x0)this['requestMotion']('thrust');else{if(_0x541f80['type']===0x1)this[_0xe6bb83(0x6f0)]('swing');else _0x541f80[_0xe6bb83(0x80a)]===0x2&&this[_0xe6bb83(0x6f0)](_0xe6bb83(0x701));}this[_0xe6bb83(0x223)](_0x541f80[_0xe6bb83(0x1b3)]);}},Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x4c4)]=function(_0x570f2b){const _0x2f7d4d=_0x421ee0;this[_0x2f7d4d(0x8bd)]=_0x570f2b||0x0;},Game_Battler['prototype'][_0x421ee0(0x17e)]=function(){const _0x2cfcb8=_0x421ee0;this[_0x2cfcb8(0x8bd)]=this[_0x2cfcb8(0x8bd)]||0x0,this['_activeWeaponSlot']++;},Game_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x216)]=function(){this['_activeWeaponSlot']=undefined;},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x57d)]=Game_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x3c1)],Game_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x3c1)]=function(){const _0xe586db=_0x421ee0;let _0x4b5f17=VisuMZ[_0xe586db(0x674)][_0xe586db(0x57d)][_0xe586db(0x8eb)](this);if(this[_0xe586db(0x561)])return _0x4b5f17;if(this['_activeWeaponSlot']!==undefined){this[_0xe586db(0x561)]=!![];const _0xdaff63=this['equipSlots']();for(let _0x3a3bee=0x0;_0x3a3bee<_0xdaff63[_0xe586db(0x4be)];_0x3a3bee++){_0xdaff63[_0x3a3bee]===0x1&&this[_0xe586db(0x8bd)]!==_0x3a3bee&&(_0x4b5f17[_0x3a3bee]=null);}this['_tempEquipCheck']=undefined;}return _0x4b5f17;},Window_BattleLog['prototype'][_0x421ee0(0x48f)]=function(_0xeda99){const _0x46dc66=_0x421ee0;return _0xeda99['isActor']()?_0xeda99['weapons']()[_0x46dc66(0x4be)]||0x1:0x1;},Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x831)]=function(_0x3088d8,_0x5a6a35){const _0x85eaf=_0x421ee0;_0x3088d8&&_0x3088d8[_0x85eaf(0x6da)]()&&_0x3088d8[_0x85eaf(0x4c4)](_0x5a6a35),this[_0x85eaf(0x5cd)]();},Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x384)]=function(_0x5a913f){const _0xc49edb=_0x421ee0;_0x5a913f&&_0x5a913f[_0xc49edb(0x6da)]()&&_0x5a913f['clearActiveWeaponSlot'](),this[_0xc49edb(0x5cd)]();},Game_Actor[_0x421ee0(0x2cb)]['battleUIOffsetX']=function(){const _0x215ea9=_0x421ee0;let _0x49dc3a=_0x215ea9(0x5af);if(this[_0x215ea9(0x694)](_0x49dc3a))return this['_cache'][_0x49dc3a];return this['_cache'][_0x49dc3a]=this[_0x215ea9(0x2fd)](this[_0x215ea9(0x41c)]()),this['_cache'][_0x49dc3a];},Game_Actor[_0x421ee0(0x2cb)]['battleUIOffsetY']=function(){const _0x1bd322=_0x421ee0;let _0x6bc1d9='battleUIOffsetY';if(this['checkCacheKey'](_0x6bc1d9))return this[_0x1bd322(0x2ce)][_0x6bc1d9];return this['_cache'][_0x6bc1d9]=this[_0x1bd322(0x68b)](this[_0x1bd322(0x41c)]()),this['_cache'][_0x6bc1d9];},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x7aa)]=Game_Enemy['prototype']['setup'],Game_Enemy[_0x421ee0(0x2cb)]['setup']=function(_0x33eeb9,_0x590932,_0xf1576b){const _0x4fc3cf=_0x421ee0;_0x33eeb9=DataManager[_0x4fc3cf(0x4ac)](_0x33eeb9),VisuMZ[_0x4fc3cf(0x674)][_0x4fc3cf(0x7aa)][_0x4fc3cf(0x8eb)](this,_0x33eeb9,_0x590932,_0xf1576b),Imported[_0x4fc3cf(0x73f)]&&this[_0x4fc3cf(0x5b5)](),this[_0x4fc3cf(0x361)](),this[_0x4fc3cf(0x750)](),Imported['VisuMZ_1_ElementStatusCore']&&this['recoverAll']();},Game_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x361)]=function(){const _0x925f33=_0x421ee0,_0x355897=VisuMZ[_0x925f33(0x674)]['Settings'][_0x925f33(0x2d2)];this[_0x925f33(0x245)]=_0x355897['AttackAnimation'],this['_svBattlerData']={};},Game_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x750)]=function(){const _0x59614d=_0x421ee0,_0x1c87f9=VisuMZ['BattleCore'][_0x59614d(0x57b)]['Enemy'],_0x4c4646=this['enemy']()[_0x59614d(0x24c)];this[_0x59614d(0x5a4)]={'name':'','wtypeId':_0x1c87f9[_0x59614d(0x242)],'collapse':_0x1c87f9[_0x59614d(0x718)],'motionIdle':_0x1c87f9[_0x59614d(0x6b7)],'width':_0x1c87f9['Width']||0x40,'height':_0x1c87f9[_0x59614d(0x634)]||0x40,'anchorX':_0x1c87f9[_0x59614d(0x8e7)]||0x0,'anchorY':_0x1c87f9['AnchorY']||0x0,'shadow':_0x1c87f9[_0x59614d(0x33b)]};_0x4c4646[_0x59614d(0x5f2)](/<ATTACK ANIMATION:[ ](\d+)>/i)&&(this[_0x59614d(0x245)]=Number(RegExp['$1']));const _0x6dfc5c=this['_svBattlerData'];if(_0x4c4646[_0x59614d(0x5f2)](/<SIDEVIEW BATTLER: (.*)>/i))_0x6dfc5c[_0x59614d(0x4ec)]=String(RegExp['$1']);else{if(_0x4c4646[_0x59614d(0x5f2)](/<SIDEVIEW BATTLERS>\s*([\s\S]*)\s*<\/SIDEVIEW BATTLERS>/i)){const _0x15a3a1=String(RegExp['$1'])[_0x59614d(0x6d8)](/[\r\n]+/)[_0x59614d(0x60e)]('');_0x6dfc5c[_0x59614d(0x4ec)]=DataManager[_0x59614d(0x385)](_0x15a3a1);}}_0x4c4646[_0x59614d(0x5f2)](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)&&(_0x6dfc5c[_0x59614d(0x173)]=eval(RegExp['$1']),_0x6dfc5c[_0x59614d(0x807)]=eval(RegExp['$2']));if(_0x4c4646['match'](/<SIDEVIEW COLLAPSE>/i))_0x6dfc5c[_0x59614d(0x1ec)]=!![];else _0x4c4646[_0x59614d(0x5f2)](/<SIDEVIEW NO COLLAPSE>/i)&&(_0x6dfc5c[_0x59614d(0x1ec)]=![]);if(_0x4c4646['match'](/<SIDEVIEW SHOW SHADOW>/i))_0x6dfc5c[_0x59614d(0x6f8)]=!![];else _0x4c4646['match'](/<SIDEVIEW HIDE SHADOW>/i)&&(_0x6dfc5c['shadow']=![]);if(_0x4c4646['match'](/<SIDEVIEW IDLE MOTION: (.*)>/i))_0x6dfc5c[_0x59614d(0x6cc)]=String(RegExp['$1'])[_0x59614d(0x6e1)]()[_0x59614d(0x90d)]();else{if(_0x4c4646[_0x59614d(0x5f2)](/<SIDEVIEW IDLE MOTIONS>\s*([\s\S]*)\s*<\/SIDEVIEW IDLE MOTIONS>/i)){const _0x5c0595=String(RegExp['$1'])[_0x59614d(0x6d8)](/[\r\n]+/)[_0x59614d(0x60e)]('');_0x6dfc5c[_0x59614d(0x6cc)]=DataManager[_0x59614d(0x385)](_0x5c0595);}}_0x4c4646[_0x59614d(0x5f2)](/<SIDEVIEW SIZE: (\d+), (\d+)>/i)&&(_0x6dfc5c[_0x59614d(0x62f)]=Number(RegExp['$1']),_0x6dfc5c[_0x59614d(0x6b2)]=Number(RegExp['$2']));if(_0x4c4646['match'](/<SIDEVIEW WEAPON: (.*)>/i))_0x6dfc5c['wtypeId']=DataManager[_0x59614d(0x1fe)](RegExp['$1']);else{if(_0x4c4646[_0x59614d(0x5f2)](/<SIDEVIEW WEAPONS>\s*([\s\S]*)\s*<\/SIDEVIEW WEAPONS>/i)){const _0x13aa55=String(RegExp['$1'])[_0x59614d(0x6d8)](/[\r\n]+/)[_0x59614d(0x60e)](''),_0x328a37=DataManager['processRandomizedData'](_0x13aa55);_0x6dfc5c[_0x59614d(0x7c5)]=DataManager[_0x59614d(0x1fe)](_0x328a37);}}if(Imported[_0x59614d(0x73f)]){const _0x2ed30d=this[_0x59614d(0x69c)]();for(const _0x1ebe98 of _0x2ed30d){const _0x5a3f14=this[_0x59614d(0x65a)](_0x1ebe98)[_0x59614d(0x89b)][_0x59614d(0x890)]()[_0x59614d(0x90d)](),_0x42ce55=_0x1ebe98[_0x59614d(0x890)]()['trim']();if(_0x4c4646[_0x59614d(0x5f2)](VisuMZ[_0x59614d(0x844)][_0x59614d(0x24b)][_0x59614d(0x21f)['format'](_0x42ce55,_0x5a3f14)]))_0x6dfc5c['name']=String(RegExp['$1']);else{if(_0x4c4646[_0x59614d(0x5f2)](VisuMZ[_0x59614d(0x844)][_0x59614d(0x24b)][_0x59614d(0x6fd)[_0x59614d(0x7d7)](_0x42ce55,_0x5a3f14)])){const _0x323231=String(RegExp['$1'])['split'](/[\r\n]+/)[_0x59614d(0x60e)]('');_0x6dfc5c[_0x59614d(0x4ec)]=DataManager[_0x59614d(0x385)](_0x323231);}}if(_0x4c4646[_0x59614d(0x5f2)](VisuMZ[_0x59614d(0x844)][_0x59614d(0x24b)]['SvWeaponSolo-%1-%2'[_0x59614d(0x7d7)](_0x42ce55,_0x5a3f14)]))_0x6dfc5c[_0x59614d(0x7c5)]=DataManager[_0x59614d(0x1fe)](RegExp['$1']);else{if(_0x4c4646['match'](VisuMZ['ElementStatusCore']['RegExp'][_0x59614d(0x454)[_0x59614d(0x7d7)](_0x42ce55,_0x5a3f14)])){const _0x3724da=String(RegExp['$1'])[_0x59614d(0x6d8)](/[\r\n]+/)[_0x59614d(0x60e)](''),_0x2b2fcf=DataManager[_0x59614d(0x385)](_0x3724da);_0x6dfc5c[_0x59614d(0x7c5)]=DataManager[_0x59614d(0x1fe)](_0x2b2fcf);}}if(_0x4c4646[_0x59614d(0x5f2)](VisuMZ['ElementStatusCore'][_0x59614d(0x24b)][_0x59614d(0x8fa)[_0x59614d(0x7d7)](_0x42ce55,_0x5a3f14)]))_0x6dfc5c['motionIdle']=String(RegExp['$1'])['toLowerCase']()['trim']();else{if(_0x4c4646['match'](VisuMZ[_0x59614d(0x844)]['RegExp'][_0x59614d(0x338)[_0x59614d(0x7d7)](_0x42ce55,_0x5a3f14)])){const _0x224b0b=String(RegExp['$1'])[_0x59614d(0x6d8)](/[\r\n]+/)[_0x59614d(0x60e)]('');_0x6dfc5c[_0x59614d(0x6cc)]=DataManager[_0x59614d(0x385)](_0x224b0b);}}}}},Game_Enemy['prototype']['attackAnimationId1']=function(){const _0x4c7011=_0x421ee0;return this[_0x4c7011(0x245)]||0x0;},Game_Enemy[_0x421ee0(0x2cb)]['attackAnimationId2']=function(){return this['attackAnimationId1']();},Game_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x808)]=function(_0x1ec5ee){const _0x3bc059=_0x421ee0;return this[_0x3bc059(0x8e5)]();},Game_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x656)]=function(){const _0x2bdb80=_0x421ee0;if(this[_0x2bdb80(0x660)]()[_0x2bdb80(0x24c)]['match'](/<BATTLER SPRITE CANNOT MOVE>/i))return![];return Game_Battler[_0x2bdb80(0x2cb)][_0x2bdb80(0x656)][_0x2bdb80(0x8eb)](this);},Game_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x3e0)]=function(){const _0x52297a=_0x421ee0;if(this[_0x52297a(0x660)]()[_0x52297a(0x24c)]['match'](/<BATTLER SPRITE GROUNDED>/i))return!![];return![];},Game_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x32c)]=function(){const _0x1596bb=_0x421ee0,_0x565064=[];for(const _0x567f51 of this[_0x1596bb(0x660)]()[_0x1596bb(0x909)]){const _0x415b95=$dataSkills[_0x567f51['skillId']];if(_0x415b95&&!_0x565064[_0x1596bb(0x7f2)](_0x415b95))_0x565064[_0x1596bb(0x7b3)](_0x415b95);}return _0x565064;},Game_Enemy['prototype'][_0x421ee0(0x5af)]=function(){const _0x5b99c0=_0x421ee0;let _0x2372db=_0x5b99c0(0x5af);if(this[_0x5b99c0(0x694)](_0x2372db))return this[_0x5b99c0(0x2ce)][_0x2372db];return this['_cache'][_0x2372db]=this[_0x5b99c0(0x2fd)](this[_0x5b99c0(0x660)]()),this[_0x5b99c0(0x2ce)][_0x2372db];},Game_Enemy['prototype']['battleUIOffsetY']=function(){const _0x5546cb=_0x421ee0;let _0x520525=_0x5546cb(0x1b5);if(this[_0x5546cb(0x694)](_0x520525))return this[_0x5546cb(0x2ce)][_0x520525];return this[_0x5546cb(0x2ce)][_0x520525]=this[_0x5546cb(0x68b)](this[_0x5546cb(0x660)]()),this[_0x5546cb(0x2ce)][_0x520525];},Game_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x620)]=function(){const _0x9d3aca=_0x421ee0;if(this['_svBattlerData']!==undefined)return this[_0x9d3aca(0x5a4)];return this['setupBattleCoreData'](),this['_svBattlerData'];},Game_Enemy['prototype'][_0x421ee0(0x3fd)]=function(){const _0x31b356=_0x421ee0;return this['svBattlerData']()[_0x31b356(0x4ec)]!=='';},Game_Enemy[_0x421ee0(0x2cb)]['svBattlerName']=function(){const _0xca375b=_0x421ee0;return this[_0xca375b(0x620)]()[_0xca375b(0x4ec)];},Game_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x49b)]=function(){const _0x4c59ef=_0x421ee0;return this['hasSvBattler']()?VisuMZ[_0x4c59ef(0x674)]['Settings'][_0x4c59ef(0x92b)][_0x4c59ef(0x67d)]:VisuMZ['BattleCore'][_0x4c59ef(0x57b)]['Enemy'][_0x4c59ef(0x67d)];},Game_Enemy['prototype'][_0x421ee0(0x686)]=function(_0x174a15){const _0x294e61=_0x421ee0;Game_Battler[_0x294e61(0x2cb)][_0x294e61(0x686)][_0x294e61(0x8eb)](this,_0x174a15);if(this['hasSvBattler']())this[_0x294e61(0x54b)](_0x174a15);},Game_Enemy['prototype']['performAttack']=function(){const _0x49da73=_0x421ee0,_0x39d3b2=this[_0x49da73(0x620)]()['wtypeId']||0x0,_0xffdb9b=$dataSystem[_0x49da73(0x7f1)][_0x39d3b2];if(_0xffdb9b){if(_0xffdb9b[_0x49da73(0x80a)]===0x0)this[_0x49da73(0x6f0)](_0x49da73(0x5e3));else{if(_0xffdb9b['type']===0x1)this[_0x49da73(0x6f0)]('swing');else _0xffdb9b['type']===0x2&&this[_0x49da73(0x6f0)](_0x49da73(0x701));}}},Game_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x8dd)]=function(){const _0x1c1f47=_0x421ee0,_0x2b0e7a=this[_0x1c1f47(0x620)]()['wtypeId']||0x0,_0x116b08=$dataSystem[_0x1c1f47(0x7f1)][_0x2b0e7a];_0x116b08&&this[_0x1c1f47(0x223)](_0x116b08[_0x1c1f47(0x1b3)]);},Game_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x169)]=function(){const _0x191c36=_0x421ee0,_0x1c4534=this[_0x191c36(0x620)]()['wtypeId']||0x0;return $dataSystem[_0x191c36(0x7f1)][_0x1c4534];},Game_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x1e2)]=function(_0x156e54){const _0x8c7eb1=_0x421ee0;return this[_0x8c7eb1(0x169)]();},Game_Enemy['prototype'][_0x421ee0(0x71c)]=function(){const _0x5526e8=_0x421ee0;Game_Battler[_0x5526e8(0x2cb)][_0x5526e8(0x71c)][_0x5526e8(0x8eb)](this),this[_0x5526e8(0x7ed)]()&&this[_0x5526e8(0x3fd)]()&&this[_0x5526e8(0x6f0)](_0x5526e8(0x760)),SoundManager[_0x5526e8(0x2b6)]();},Game_Enemy['prototype'][_0x421ee0(0x925)]=function(){const _0x1cf5dd=_0x421ee0;Game_Battler[_0x1cf5dd(0x2cb)][_0x1cf5dd(0x925)][_0x1cf5dd(0x8eb)](this),this[_0x1cf5dd(0x6f0)](_0x1cf5dd(0x5ff));},Game_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x31c)]=function(){const _0x2e5be6=_0x421ee0;Game_Battler[_0x2e5be6(0x2cb)][_0x2e5be6(0x31c)][_0x2e5be6(0x8eb)](this),this[_0x2e5be6(0x6f0)](_0x2e5be6(0x5ff));},Game_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x1f8)]=function(){const _0x2b7081=_0x421ee0;Game_Battler[_0x2b7081(0x2cb)]['performCounter'][_0x2b7081(0x8eb)](this),this['performAttack']();},Game_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x227)]=function(){const _0x2b2a98=_0x421ee0;if(this['hasSvBattler']()){if(this['collapseType']()>=0x1)return!![];return this['svBattlerData']()[_0x2b2a98(0x1ec)];}else return!![];},Game_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x8de)]=function(){const _0x56dabd=_0x421ee0;return this['svBattlerData']()[_0x56dabd(0x173)];},Game_Enemy[_0x421ee0(0x2cb)]['svBattlerAnchorY']=function(){const _0x474bdb=_0x421ee0;return this[_0x474bdb(0x620)]()[_0x474bdb(0x807)];},Game_Enemy[_0x421ee0(0x2cb)]['svBattlerShadowVisible']=function(){const _0x1b46db=_0x421ee0;return this[_0x1b46db(0x620)]()[_0x1b46db(0x6f8)];},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x811)]=Game_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x3da)],Game_Enemy['prototype']['transform']=function(_0x262bd6){const _0x7c616e=_0x421ee0;VisuMZ[_0x7c616e(0x674)]['Game_Enemy_transform'][_0x7c616e(0x8eb)](this,_0x262bd6),this[_0x7c616e(0x361)](),this[_0x7c616e(0x750)]();const _0x39bfe9=this[_0x7c616e(0x35a)]();if(_0x39bfe9)_0x39bfe9[_0x7c616e(0x629)](this);},Game_Unit['prototype'][_0x421ee0(0x4bf)]=function(_0xa222d){const _0x399e17=_0x421ee0;for(const _0x212cad of this[_0x399e17(0x294)]()){if(_0x212cad)_0x212cad[_0x399e17(0x4bf)](_0xa222d);}},Game_Unit['prototype']['trueRandomTarget']=function(){const _0x487014=_0x421ee0,_0x429493=this[_0x487014(0x84a)]();return _0x429493[Math[_0x487014(0x803)](_0x429493[_0x487014(0x4be)])];},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x8d0)]=Game_Party[_0x421ee0(0x2cb)][_0x421ee0(0x7dc)],Game_Party[_0x421ee0(0x2cb)][_0x421ee0(0x7dc)]=function(_0x3c1548){const _0x4e9367=_0x421ee0;VisuMZ[_0x4e9367(0x674)][_0x4e9367(0x8d0)][_0x4e9367(0x8eb)](this,_0x3c1548),BattleManager[_0x4e9367(0x188)]();},VisuMZ[_0x421ee0(0x674)]['Game_Party_removeActor']=Game_Party[_0x421ee0(0x2cb)]['removeActor'],Game_Party['prototype']['removeActor']=function(_0x42d3fe){const _0x5cb5dd=_0x421ee0;VisuMZ[_0x5cb5dd(0x674)]['Game_Party_removeActor']['call'](this,_0x42d3fe),BattleManager[_0x5cb5dd(0x188)]();},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x3c9)]=Game_Troop[_0x421ee0(0x2cb)]['setup'],Game_Troop['prototype']['setup']=function(_0x26162a){const _0x55bb0b=_0x421ee0;$gameTemp['clearForcedGameTroopSettingsBattleCore'](),$gameTemp[_0x55bb0b(0x3af)](_0x26162a),VisuMZ[_0x55bb0b(0x674)]['Game_Troop_setup']['call'](this,_0x26162a);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x8d8)]=Game_Map[_0x421ee0(0x2cb)][_0x421ee0(0x1ff)],Game_Map[_0x421ee0(0x2cb)][_0x421ee0(0x1ff)]=function(){const _0x5468c7=_0x421ee0;VisuMZ[_0x5468c7(0x674)]['Game_Map_setupBattleback'][_0x5468c7(0x8eb)](this),this[_0x5468c7(0x921)]();},Game_Map[_0x421ee0(0x2cb)]['setupBattlebackBattleCore']=function(){const _0x306d7a=_0x421ee0;this[_0x306d7a(0x877)]={},this['_regionBattleback2']={};if(!$dataMap)return;const _0x21cd3b=$dataMap[_0x306d7a(0x24c)];if(!_0x21cd3b)return;const _0x4a7ec8=_0x21cd3b[_0x306d7a(0x5f2)](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/gi);if(_0x4a7ec8)for(const _0x31ff95 of _0x4a7ec8){_0x31ff95['match'](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/i);const _0x257215=Number(RegExp['$1']),_0x4e49fe=Number(RegExp['$2']),_0x89aa26=_0x4e49fe===0x1?this[_0x306d7a(0x877)]:this['_regionBattleback2'],_0x334ad9=String(RegExp['$3']);_0x89aa26[_0x257215]=_0x334ad9;}},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x6e2)]=Game_Map[_0x421ee0(0x2cb)]['battleback1Name'],Game_Map[_0x421ee0(0x2cb)][_0x421ee0(0x5c9)]=function(){const _0x134393=_0x421ee0;if(!BattleManager[_0x134393(0x40a)]()){const _0x1bf001=$gamePlayer[_0x134393(0x5c7)]($gamePlayer['x'],$gamePlayer['y']);if(this['_regionBattleback1']&&this['_regionBattleback1'][_0x1bf001])return this[_0x134393(0x877)][_0x1bf001];}return VisuMZ['BattleCore']['Game_Map_battleback1Name'][_0x134393(0x8eb)](this);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x5be)]=Game_Map[_0x421ee0(0x2cb)][_0x421ee0(0x705)],Game_Map[_0x421ee0(0x2cb)][_0x421ee0(0x705)]=function(){const _0x275322=_0x421ee0;if(!BattleManager[_0x275322(0x40a)]()){const _0x147d29=$gamePlayer[_0x275322(0x5c7)]($gamePlayer['x'],$gamePlayer['y']);if(this[_0x275322(0x877)]&&this[_0x275322(0x853)][_0x147d29])return this[_0x275322(0x853)][_0x147d29];}return VisuMZ['BattleCore'][_0x275322(0x5be)][_0x275322(0x8eb)](this);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x2a1)]=Game_Interpreter['prototype'][_0x421ee0(0x375)],Game_Interpreter['prototype'][_0x421ee0(0x375)]=function(_0x1d3cb6){const _0x266559=_0x421ee0;return $gameTemp[_0x266559(0x4d5)](this),VisuMZ['BattleCore'][_0x266559(0x2a1)][_0x266559(0x8eb)](this,_0x1d3cb6);},VisuMZ['BattleCore'][_0x421ee0(0x4d3)]=Game_Interpreter[_0x421ee0(0x2cb)]['updateWaitMode'],Game_Interpreter['prototype'][_0x421ee0(0x31a)]=function(){const _0x20fa8d=_0x421ee0;if(SceneManager[_0x20fa8d(0x225)]())switch(this[_0x20fa8d(0x26c)]){case _0x20fa8d(0x2e4):if(Imported[_0x20fa8d(0x83f)]){if($gameScreen[_0x20fa8d(0x4c3)]()['angleDuration']>0x0)return!![];this[_0x20fa8d(0x26c)]='';}break;case'battleAnimation':if(BattleManager['_spriteset'][_0x20fa8d(0x69d)]())return!![];this[_0x20fa8d(0x26c)]='';break;case _0x20fa8d(0x882):if(Imported[_0x20fa8d(0x83f)]){if($gameScreen['battleCameraData']()[_0x20fa8d(0x334)]>0x0)return!![];if($gameScreen[_0x20fa8d(0x4c3)]()[_0x20fa8d(0x287)]>0x0)return!![];this[_0x20fa8d(0x26c)]='';}break;case _0x20fa8d(0x4aa):if(BattleManager['_spriteset'][_0x20fa8d(0x933)]())return!![];this[_0x20fa8d(0x26c)]='';break;case _0x20fa8d(0x6ac):if(BattleManager[_0x20fa8d(0x6c2)][_0x20fa8d(0x1e3)]())return!![];this[_0x20fa8d(0x26c)]='';break;case _0x20fa8d(0x58e):if(BattleManager[_0x20fa8d(0x6c2)][_0x20fa8d(0x7f9)]())return!![];this['_waitMode']='';break;case _0x20fa8d(0x2cd):if(BattleManager['_logWindow'][_0x20fa8d(0x286)]())return!![];this[_0x20fa8d(0x26c)]='';break;case'battleMove':if(BattleManager[_0x20fa8d(0x6c2)][_0x20fa8d(0x560)]())return!![];this[_0x20fa8d(0x26c)]='';break;case _0x20fa8d(0x64e):if(BattleManager[_0x20fa8d(0x6c2)][_0x20fa8d(0x392)]())return!![];this[_0x20fa8d(0x26c)]='';break;case _0x20fa8d(0x345):if(BattleManager[_0x20fa8d(0x6c2)][_0x20fa8d(0x4e4)]())return!![];this['_waitMode']='';break;case _0x20fa8d(0x8f6):if(BattleManager[_0x20fa8d(0x6c2)][_0x20fa8d(0x4bb)]())return!![];this[_0x20fa8d(0x26c)]='';break;case _0x20fa8d(0x6e6):if(Imported['VisuMZ_3_ActSeqProjectiles']){if(BattleManager[_0x20fa8d(0x6c2)][_0x20fa8d(0x672)]())return!![];this[_0x20fa8d(0x26c)]='';}break;case'battleSkew':if(Imported[_0x20fa8d(0x83f)]){if($gameScreen[_0x20fa8d(0x4c3)]()['skewDuration']>0x0)return!![];this['_waitMode']='';}break;case _0x20fa8d(0x509):if(BattleManager[_0x20fa8d(0x6c2)][_0x20fa8d(0x907)]())return!![];this[_0x20fa8d(0x26c)]='';break;case'battleZoom':if(Imported[_0x20fa8d(0x83f)]){if($gameScreen[_0x20fa8d(0x4c3)]()['zoomDuration']>0x0)return!![];this[_0x20fa8d(0x26c)]='';}break;}return VisuMZ[_0x20fa8d(0x674)]['Game_Interpreter_updateWaitMode']['call'](this);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x870)]=Game_Interpreter[_0x421ee0(0x2cb)][_0x421ee0(0x828)],Game_Interpreter['prototype'][_0x421ee0(0x828)]=function(_0x95a4bf){const _0x3128e9=_0x421ee0;return!$gameParty[_0x3128e9(0x4fb)]()?this['command301_PreBattleEvent'](_0x95a4bf):VisuMZ[_0x3128e9(0x674)][_0x3128e9(0x870)]['call'](this,_0x95a4bf);},Game_Interpreter[_0x421ee0(0x2cb)]['command3011']=function(_0x5072e2){const _0x27a6f5=_0x421ee0;return VisuMZ[_0x27a6f5(0x674)]['Game_Interpreter_command301']['call'](this,_0x5072e2),BattleManager[_0x27a6f5(0x90f)](_0x4fdb87=>{const _0x1e1af5=_0x27a6f5;this['_branch'][this[_0x1e1af5(0x887)]]=_0x4fdb87;}),!![];},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x79a)]=function(_0x200deb){const _0x471e0f=_0x421ee0,_0x2c54da=$dataCommonEvents[_0x200deb];if(!_0x2c54da)return![];if(_0x2c54da[_0x471e0f(0x5c1)][_0x471e0f(0x4be)]<=0x1)return![];return!![];},Game_Interpreter[_0x421ee0(0x2cb)][_0x421ee0(0x8ec)]=function(_0x1414e3){const _0x314773=_0x421ee0,_0x1b71dd=VisuMZ['BattleCore'][_0x314773(0x57b)]['Mechanics'],_0x3e6055=_0x1b71dd[_0x314773(0x829)],_0x3b758a=$dataCommonEvents[_0x3e6055];if(_0x3b758a&&VisuMZ[_0x314773(0x674)][_0x314773(0x79a)](_0x3e6055)){const _0x20acc7=this[_0x314773(0x6e4)]()?this[_0x314773(0x1f6)]:0x0,_0x37a965=_0x3b758a['list'];this[_0x314773(0x817)](_0x37a965,_0x20acc7),this[_0x314773(0x486)]=JsonEx[_0x314773(0x4ed)](this[_0x314773(0x486)]);const _0x3e5c17={'code':0xbc3,'indent':this[_0x314773(0x887)],'parameters':JsonEx[_0x314773(0x4ed)](_0x1414e3)};return this['_list'][_0x314773(0x589)](this[_0x314773(0x43e)]+0x1,0x0,_0x3e5c17),!![];}else return VisuMZ[_0x314773(0x674)][_0x314773(0x870)][_0x314773(0x8eb)](this,_0x1414e3);},VisuMZ['BattleCore'][_0x421ee0(0x409)]=BattleManager[_0x421ee0(0x609)],BattleManager[_0x421ee0(0x609)]=function(){const _0x4226d8=_0x421ee0;VisuMZ[_0x4226d8(0x674)][_0x4226d8(0x409)][_0x4226d8(0x8eb)](this),this[_0x4226d8(0x354)]();},BattleManager[_0x421ee0(0x354)]=function(){const _0x40a113=_0x421ee0,_0x497f5f=VisuMZ[_0x40a113(0x674)][_0x40a113(0x57b)][_0x40a113(0x203)],_0x30d3c3=_0x497f5f[_0x40a113(0x829)];_0x30d3c3&&VisuMZ[_0x40a113(0x674)][_0x40a113(0x79a)](_0x30d3c3)&&(this[_0x40a113(0x6dc)]=!![],$gameTemp['reserveCommonEvent'](_0x497f5f[_0x40a113(0x829)]),$gameMap[_0x40a113(0x342)](),$gameMap['_interpreter'][_0x40a113(0x198)]=!![]),_0x497f5f['DefeatEvent']>0x0&&(this['_canLose']=!![]);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x673)]=Scene_Map[_0x421ee0(0x2cb)][_0x421ee0(0x1d7)],Scene_Map[_0x421ee0(0x2cb)][_0x421ee0(0x1d7)]=function(){const _0x124d59=_0x421ee0;BattleManager[_0x124d59(0x6dc)]?this[_0x124d59(0x776)]():VisuMZ[_0x124d59(0x674)][_0x124d59(0x673)][_0x124d59(0x8eb)](this);},Scene_Map[_0x421ee0(0x2cb)][_0x421ee0(0x776)]=function(){const _0x43134f=_0x421ee0;this[_0x43134f(0x219)]=!![];},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x729)]=SceneManager[_0x421ee0(0x6b3)],SceneManager['isSceneChanging']=function(){const _0xe44bd=_0x421ee0;if(BattleManager['_battleCoreBattleStartEvent'])return![];return VisuMZ['BattleCore']['SceneManager_isSceneChanging'][_0xe44bd(0x8eb)](this);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x695)]=Game_Interpreter['prototype'][_0x421ee0(0x55a)],Game_Interpreter[_0x421ee0(0x2cb)]['terminate']=function(){const _0x35f64e=_0x421ee0;VisuMZ['BattleCore']['Game_Interpreter_terminate'][_0x35f64e(0x8eb)](this),this['_preBattleCommonEvent']&&(this['_preBattleCommonEvent']=undefined,SceneManager[_0x35f64e(0x855)]['battleCoreResumeLaunchBattle']());},Scene_Map[_0x421ee0(0x2cb)][_0x421ee0(0x5a3)]=function(){const _0x17eb6a=_0x421ee0;BattleManager[_0x17eb6a(0x6dc)]=undefined,this[_0x17eb6a(0x3de)]();},VisuMZ['BattleCore'][_0x421ee0(0x5d2)]=Scene_Map[_0x421ee0(0x2cb)]['initialize'],Scene_Map[_0x421ee0(0x2cb)][_0x421ee0(0x792)]=function(){const _0x3a8109=_0x421ee0;VisuMZ[_0x3a8109(0x674)][_0x3a8109(0x5d2)][_0x3a8109(0x8eb)](this),$gameTemp[_0x3a8109(0x277)]();},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x3cd)]=Scene_ItemBase['prototype'][_0x421ee0(0x62a)],Scene_ItemBase[_0x421ee0(0x2cb)][_0x421ee0(0x62a)]=function(){const _0x57239f=_0x421ee0;VisuMZ[_0x57239f(0x674)][_0x57239f(0x3cd)][_0x57239f(0x8eb)](this),this[_0x57239f(0x8f0)]()[_0x57239f(0x24c)]['match'](/<CUSTOM ACTION SEQUENCE>/i)&&($gameTemp['_commonEventQueue']=[]),DataManager[_0x57239f(0x3b1)](this['item']())&&($gameTemp[_0x57239f(0x37b)]=[]);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x3df)]=Scene_Options[_0x421ee0(0x2cb)][_0x421ee0(0x8b1)],Scene_Options[_0x421ee0(0x2cb)][_0x421ee0(0x8b1)]=function(){const _0x12fc4e=_0x421ee0;let _0x3b3883=VisuMZ['BattleCore']['Scene_Options_maxCommands']['call'](this);const _0x1c26c2=VisuMZ[_0x12fc4e(0x674)][_0x12fc4e(0x57b)];if(_0x1c26c2[_0x12fc4e(0x8ed)][_0x12fc4e(0x2d6)]&&_0x1c26c2['AutoBattle'][_0x12fc4e(0x82b)])_0x3b3883+=0x2;if(_0x1c26c2[_0x12fc4e(0x3e4)][_0x12fc4e(0x2d6)]&&_0x1c26c2[_0x12fc4e(0x3e4)]['AdjustRect'])_0x3b3883+=0x1;return _0x3b3883;},VisuMZ['BattleCore']['Scene_Battle_start']=Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x520)],Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x520)]=function(){const _0x2d145d=_0x421ee0;SceneManager['isPreviousSceneBattleTransitionable']()?(Scene_Message[_0x2d145d(0x2cb)][_0x2d145d(0x520)][_0x2d145d(0x8eb)](this),this['_spriteset']&&this['_spriteset'][_0x2d145d(0x53e)](),BattleManager[_0x2d145d(0x715)]&&BattleManager[_0x2d145d(0x25f)]()):VisuMZ[_0x2d145d(0x674)][_0x2d145d(0x666)][_0x2d145d(0x8eb)](this);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x1eb)]=Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x3de)],Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x3de)]=function(){const _0x3814ee=_0x421ee0;SceneManager[_0x3814ee(0x5a7)]()?Scene_Message[_0x3814ee(0x2cb)]['stop'][_0x3814ee(0x8eb)](this):VisuMZ['BattleCore']['Scene_Battle_stop'][_0x3814ee(0x8eb)](this);},VisuMZ[_0x421ee0(0x674)]['Scene_Battle_terminate']=Scene_Battle['prototype'][_0x421ee0(0x55a)],Scene_Battle[_0x421ee0(0x2cb)]['terminate']=function(){const _0x2f7776=_0x421ee0;SceneManager[_0x2f7776(0x5a7)]()?Scene_Message[_0x2f7776(0x2cb)][_0x2f7776(0x55a)]['call'](this):VisuMZ[_0x2f7776(0x674)][_0x2f7776(0x2b0)][_0x2f7776(0x8eb)](this);},Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x402)]=function(){const _0x1f09f3=_0x421ee0;if(ConfigManager[_0x1f09f3(0x5ac)]&&ConfigManager[_0x1f09f3(0x3ca)]!==undefined)return ConfigManager[_0x1f09f3(0x3ca)];else{if(this[_0x1f09f3(0x885)]()==='border')return![];else{return Scene_Message[_0x1f09f3(0x2cb)][_0x1f09f3(0x402)][_0x1f09f3(0x8eb)](this);;}}},VisuMZ['BattleCore'][_0x421ee0(0x7d3)]=Scene_Battle['prototype'][_0x421ee0(0x353)],Scene_Battle[_0x421ee0(0x2cb)]['createAllWindows']=function(){const _0x27382b=_0x421ee0;this['createEnemyNameContainer'](),VisuMZ[_0x27382b(0x674)]['Scene_Battle_createAllWindows'][_0x27382b(0x8eb)](this),this[_0x27382b(0x537)]();},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x5aa)]=Scene_Battle['prototype'][_0x421ee0(0x490)],Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x490)]=function(){const _0x3a73f0=_0x421ee0;VisuMZ['BattleCore'][_0x3a73f0(0x5aa)][_0x3a73f0(0x8eb)](this),this['battleLayoutStyle']()===_0x3a73f0(0x633)&&this['repositionCancelButtonBorderStyle']();},Scene_Battle[_0x421ee0(0x2cb)]['setVisibleUI']=function(_0x1eb7e6){const _0x5b83b1=_0x421ee0;_0x1eb7e6?(this['_windowLayer']['x']=(Graphics['width']-Graphics['boxWidth'])/0x2,this[_0x5b83b1(0x8cb)]['y']=(Graphics[_0x5b83b1(0x6b2)]-Graphics[_0x5b83b1(0x53d)])/0x2):(this[_0x5b83b1(0x8cb)]['x']=Graphics['width']*0xa,this[_0x5b83b1(0x8cb)]['y']=Graphics[_0x5b83b1(0x6b2)]*0xa);},VisuMZ['BattleCore'][_0x421ee0(0x303)]=Scene_Battle['prototype'][_0x421ee0(0x617)],Scene_Battle[_0x421ee0(0x2cb)]['selectNextCommand']=function(){const _0x108c4e=_0x421ee0,_0x102517=BattleManager['actor']();VisuMZ[_0x108c4e(0x674)]['Scene_Battle_selectNextCommand']['call'](this);if(_0x102517){if(_0x102517===BattleManager['actor']())return;if(_0x102517===BattleManager[_0x108c4e(0x562)])return;if(_0x102517[_0x108c4e(0x35a)]())_0x102517[_0x108c4e(0x35a)]()[_0x108c4e(0x3c3)]();}},VisuMZ['BattleCore']['Scene_Battle_selectPreviousCommand']=Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x49e)],Scene_Battle['prototype'][_0x421ee0(0x49e)]=function(){const _0x25cd03=_0x421ee0,_0x406e8f=BattleManager[_0x25cd03(0x41c)]();if(_0x406e8f&&_0x406e8f['battler'])_0x406e8f[_0x25cd03(0x35a)]()[_0x25cd03(0x3c3)]();VisuMZ[_0x25cd03(0x674)][_0x25cd03(0x6de)][_0x25cd03(0x8eb)](this);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x7f0)]=Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x849)],Scene_Battle['prototype'][_0x421ee0(0x849)]=function(){const _0xd93570=_0x421ee0;if(VisuMZ[_0xd93570(0x674)][_0xd93570(0x57b)][_0xd93570(0x42f)][_0xd93570(0x383)])return VisuMZ[_0xd93570(0x674)][_0xd93570(0x57b)]['BattleLog'][_0xd93570(0x383)][_0xd93570(0x8eb)](this);return VisuMZ['BattleCore'][_0xd93570(0x7f0)][_0xd93570(0x8eb)](this);},VisuMZ[_0x421ee0(0x674)]['Scene_Battle_createPartyCommandWindow']=Scene_Battle['prototype'][_0x421ee0(0x592)],Scene_Battle['prototype']['createPartyCommandWindow']=function(){const _0x1bc801=_0x421ee0;VisuMZ[_0x1bc801(0x674)][_0x1bc801(0x4b7)][_0x1bc801(0x8eb)](this),this[_0x1bc801(0x57f)]();},Scene_Battle['prototype'][_0x421ee0(0x57f)]=function(){const _0x329f5d=_0x421ee0,_0x2f4df4=this[_0x329f5d(0x4d1)];_0x2f4df4[_0x329f5d(0x68f)](_0x329f5d(0x1c1),this['commandAutoBattle'][_0x329f5d(0x92c)](this)),_0x2f4df4[_0x329f5d(0x68f)]('options',this[_0x329f5d(0x7f7)][_0x329f5d(0x92c)](this));const _0x59985f=this['battleLayoutStyle']();switch(_0x59985f){case'xp':case _0x329f5d(0x332):return this[_0x329f5d(0x4d1)][_0x329f5d(0x92e)](0x1);break;}},Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x749)]=function(){const _0x4e98d5=_0x421ee0;BattleManager['_autoBattle']=!![],$gameParty[_0x4e98d5(0x812)](),this[_0x4e98d5(0x617)](),BattleManager[_0x4e98d5(0x67c)]()&&(BattleManager['_inputting']=![]);},Scene_Battle[_0x421ee0(0x2cb)]['commandOptions']=function(){const _0x2ffde5=_0x421ee0;this[_0x2ffde5(0x7e2)]()?(this[_0x2ffde5(0x212)]=!![],this[_0x2ffde5(0x548)][_0x2ffde5(0x7b3)](_0x2ffde5(0x4c0),VisuMZ[_0x2ffde5(0x674)][_0x2ffde5(0x57b)]['PartyCmd'][_0x2ffde5(0x90e)])):this[_0x2ffde5(0x399)]();},Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x7e2)]=function(){const _0x32ca4b=_0x421ee0;return BattleManager[_0x32ca4b(0x4b9)]();},Scene_Battle[_0x421ee0(0x2cb)]['callOptions']=function(){const _0x3c1612=_0x421ee0;this['_callSceneOptions']=![],this[_0x3c1612(0x6c2)][_0x3c1612(0x53e)](),this['_windowLayer'][_0x3c1612(0x3b9)]=![];if(BattleManager[_0x3c1612(0x40a)]())($dataSystem[_0x3c1612(0x5c9)]||$dataSystem['battleback2Name'])&&SceneManager[_0x3c1612(0x54a)]();else($gameMap[_0x3c1612(0x5c9)]()||$gameMap[_0x3c1612(0x705)]())&&SceneManager[_0x3c1612(0x54a)]();SceneManager[_0x3c1612(0x7b3)](Scene_Options),BattleManager[_0x3c1612(0x67c)]()&&(BattleManager[_0x3c1612(0x715)]=BattleManager['actor']());},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x86f)]=Scene_Battle[_0x421ee0(0x2cb)]['updateBattleProcess'],Scene_Battle['prototype'][_0x421ee0(0x89e)]=function(){const _0x4d4aa8=_0x421ee0;VisuMZ[_0x4d4aa8(0x674)][_0x4d4aa8(0x86f)]['call'](this);if(this[_0x4d4aa8(0x212)]&&!BattleManager[_0x4d4aa8(0x562)])this['callOptions']();},Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x537)]=function(){const _0x12062b=_0x421ee0,_0x580a02=this[_0x12062b(0x196)]();this[_0x12062b(0x442)]=new Window_AutoBattleCancel(_0x580a02),this[_0x12062b(0x442)][_0x12062b(0x405)](),this[_0x12062b(0x658)](this[_0x12062b(0x442)]);},Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x196)]=function(){const _0x2f44e2=_0x421ee0;return VisuMZ[_0x2f44e2(0x674)][_0x2f44e2(0x57b)]['AutoBattle'][_0x2f44e2(0x8a4)]['call'](this);},Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x248)]=function(){const _0x4b74e0=_0x421ee0;return VisuMZ['BattleCore'][_0x4b74e0(0x57b)][_0x4b74e0(0x30c)][_0x4b74e0(0x800)];},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x445)]=Scene_Battle['prototype'][_0x421ee0(0x6c6)],Scene_Battle['prototype'][_0x421ee0(0x6c6)]=function(){const _0x35eaa4=_0x421ee0;this[_0x35eaa4(0x248)]()?this[_0x35eaa4(0x731)]():VisuMZ['BattleCore'][_0x35eaa4(0x445)][_0x35eaa4(0x8eb)](this);},Scene_Battle['prototype'][_0x421ee0(0x731)]=function(){const _0x479f8d=_0x421ee0;if(BattleManager[_0x479f8d(0x4b0)]())this[_0x479f8d(0x617)]();else BattleManager[_0x479f8d(0x67c)]()&&VisuMZ['BattleCore'][_0x479f8d(0x445)][_0x479f8d(0x8eb)](this);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x68a)]=Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x850)],Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x850)]=function(){const _0x511598=_0x421ee0;BattleManager[_0x511598(0x67c)]()?this['startActorCommandSelection']():VisuMZ[_0x511598(0x674)][_0x511598(0x68a)][_0x511598(0x8eb)](this);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x489)]=Scene_Battle['prototype'][_0x421ee0(0x888)],Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x888)]=function(){const _0x5a773b=_0x421ee0;VisuMZ[_0x5a773b(0x674)][_0x5a773b(0x489)]['call'](this),this[_0x5a773b(0x17a)]();},Scene_Battle[_0x421ee0(0x2cb)]['createActorCommandWindowBattleCore']=function(){const _0x57c5b8=_0x421ee0,_0x45427b=this[_0x57c5b8(0x28d)];_0x45427b['setHandler']('escape',this[_0x57c5b8(0x7cb)][_0x57c5b8(0x92c)](this)),_0x45427b[_0x57c5b8(0x68f)]('autoBattle',this[_0x57c5b8(0x542)][_0x57c5b8(0x92c)](this)),_0x45427b[_0x57c5b8(0x68f)]('singleSkill',this[_0x57c5b8(0x503)]['bind'](this)),BattleManager[_0x57c5b8(0x67c)]()&&(this['isPartyCommandWindowDisabled']()?delete _0x45427b[_0x57c5b8(0x6ad)]['cancel']:_0x45427b['setHandler'](_0x57c5b8(0x699),this['actorCommandCancelTPB'][_0x57c5b8(0x92c)](this)));},Scene_Battle[_0x421ee0(0x2cb)]['actorCommandEscape']=function(){const _0x3f95c5=_0x421ee0;this[_0x3f95c5(0x516)]();},Scene_Battle['prototype'][_0x421ee0(0x542)]=function(){const _0x14e61d=_0x421ee0;BattleManager[_0x14e61d(0x41c)]()[_0x14e61d(0x4e3)](),BattleManager[_0x14e61d(0x229)](),BattleManager[_0x14e61d(0x5fe)](),this[_0x14e61d(0x3fa)]();},Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x503)]=function(){const _0xebd400=_0x421ee0,_0x18c52c=BattleManager[_0xebd400(0x1f7)]();_0x18c52c[_0xebd400(0x1d4)](this['_actorCommandWindow']['currentExt']()),this[_0xebd400(0x3e3)]();},Scene_Battle['prototype']['actorCommandCancelTPB']=function(){const _0x1c83c9=_0x421ee0;this[_0x1c83c9(0x4d1)][_0x1c83c9(0x578)](),this['_actorCommandWindow'][_0x1c83c9(0x33a)]();},VisuMZ['BattleCore'][_0x421ee0(0x75d)]=Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x5a9)],Scene_Battle['prototype']['createHelpWindow']=function(){const _0x2822f0=_0x421ee0;VisuMZ[_0x2822f0(0x674)][_0x2822f0(0x75d)][_0x2822f0(0x8eb)](this),this[_0x2822f0(0x62b)]();},Scene_Battle[_0x421ee0(0x2cb)]['createHelpWindowBattleCore']=function(){const _0xfc9f0b=_0x421ee0;this[_0xfc9f0b(0x28d)]['setHelpWindow'](this['_helpWindow']),this[_0xfc9f0b(0x4d1)]['setHelpWindow'](this[_0xfc9f0b(0x8c1)]);},Scene_Battle['prototype']['battleLayoutStyle']=function(){const _0x4d868a=_0x421ee0;if($gameTemp[_0x4d868a(0x43d)]!==undefined)return $gameTemp[_0x4d868a(0x43d)];if(this[_0x4d868a(0x42c)])return this[_0x4d868a(0x42c)];return this[_0x4d868a(0x42c)]=VisuMZ[_0x4d868a(0x674)][_0x4d868a(0x57b)][_0x4d868a(0x772)]['Style'][_0x4d868a(0x6e1)]()[_0x4d868a(0x90d)](),this['_battleLayoutStyle'];},VisuMZ['BattleCore'][_0x421ee0(0x619)]=Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x21b)],Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x21b)]=function(){const _0x184e4e=_0x421ee0,_0x1682ed=this[_0x184e4e(0x885)]();switch(_0x1682ed){case _0x184e4e(0x5c1):return this['calcWindowHeight'](Math[_0x184e4e(0x8aa)](0x1,$gameParty[_0x184e4e(0x323)]()),!![]);break;default:return VisuMZ[_0x184e4e(0x674)][_0x184e4e(0x619)]['call'](this);break;}},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x237)]=Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x52b)],Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x52b)]=function(){const _0x21065d=_0x421ee0,_0x48a986=this[_0x21065d(0x885)]();switch(_0x48a986){case _0x21065d(0x633):return this[_0x21065d(0x40f)]();break;case _0x21065d(0x511):case _0x21065d(0x5c1):case'xp':case _0x21065d(0x332):default:return VisuMZ['BattleCore'][_0x21065d(0x237)][_0x21065d(0x8eb)](this);break;}},Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x81d)]=function(){const _0x175596=_0x421ee0,_0x32c34a=this[_0x175596(0x885)]();switch(_0x32c34a){case'xp':case _0x175596(0x332):return this[_0x175596(0x69e)]();break;case'border':return this[_0x175596(0x60d)]();break;case'default':case _0x175596(0x5c1):default:return this[_0x175596(0x7c3)]();break;}},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x60f)]=Scene_Battle['prototype'][_0x421ee0(0x356)],Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x356)]=function(){const _0xe1e3ce=_0x421ee0,_0x2267cc=this[_0xe1e3ce(0x885)]();switch(_0x2267cc){case'xp':case _0xe1e3ce(0x332):return this[_0xe1e3ce(0x165)]();break;case _0xe1e3ce(0x633):return this[_0xe1e3ce(0x573)]();case _0xe1e3ce(0x511):case _0xe1e3ce(0x5c1):default:return this[_0xe1e3ce(0x719)]();break;}},Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x719)]=function(){const _0x4b9c48=_0x421ee0,_0x510f51=VisuMZ[_0x4b9c48(0x674)][_0x4b9c48(0x57b)][_0x4b9c48(0x772)],_0x5e1df4=_0x510f51['CommandWidth']||0xc0,_0x1cbb95=this[_0x4b9c48(0x21b)](),_0x54306b=this[_0x4b9c48(0x402)]()?Graphics['boxWidth']-_0x5e1df4:0x0,_0x2dc0f6=Graphics[_0x4b9c48(0x53d)]-_0x1cbb95;return new Rectangle(_0x54306b,_0x2dc0f6,_0x5e1df4,_0x1cbb95);},Scene_Battle[_0x421ee0(0x2cb)]['actorCommandWindowRect']=function(){const _0x3d6750=_0x421ee0;return this[_0x3d6750(0x356)]();},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x753)]=Scene_Battle[_0x421ee0(0x2cb)]['updateStatusWindowPosition'],Scene_Battle[_0x421ee0(0x2cb)]['updateStatusWindowPosition']=function(){const _0x2ea9a6=_0x421ee0,_0x38d7ec=this[_0x2ea9a6(0x885)]();switch(_0x38d7ec){case'xp':case _0x2ea9a6(0x332):case _0x2ea9a6(0x633):break;case'default':case _0x2ea9a6(0x5c1):default:VisuMZ['BattleCore'][_0x2ea9a6(0x753)][_0x2ea9a6(0x8eb)](this);break;}},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x1a6)]=Scene_Battle['prototype'][_0x421ee0(0x464)],Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x464)]=function(){const _0x5d37b8=_0x421ee0;VisuMZ[_0x5d37b8(0x674)][_0x5d37b8(0x1a6)][_0x5d37b8(0x8eb)](this),this[_0x5d37b8(0x3be)]();},VisuMZ[_0x421ee0(0x674)]['Scene_Battle_startEnemySelection']=Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x500)],Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x500)]=function(){const _0x4e5ad0=_0x421ee0;VisuMZ[_0x4e5ad0(0x674)][_0x4e5ad0(0x435)][_0x4e5ad0(0x8eb)](this),this[_0x4e5ad0(0x5ad)][_0x4e5ad0(0x58f)](),this[_0x4e5ad0(0x3be)]();},Scene_Battle['prototype'][_0x421ee0(0x3be)]=function(){const _0x7239b4=_0x421ee0,_0x416eaf=this[_0x7239b4(0x885)]();['xp',_0x7239b4(0x332),_0x7239b4(0x633)][_0x7239b4(0x7f2)](_0x416eaf)&&this[_0x7239b4(0x28d)][_0x7239b4(0x33a)](),(_0x416eaf===_0x7239b4(0x633)||this[_0x7239b4(0x197)]())&&(this['_skillWindow']['close'](),this[_0x7239b4(0x3a4)][_0x7239b4(0x33a)]());},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x1cf)]=Scene_Battle[_0x421ee0(0x2cb)]['onActorOk'],Scene_Battle['prototype'][_0x421ee0(0x87a)]=function(){const _0x3a24a5=_0x421ee0;VisuMZ[_0x3a24a5(0x674)]['Scene_Battle_onActorOk'][_0x3a24a5(0x8eb)](this),this[_0x3a24a5(0x2be)]();},Scene_Battle[_0x421ee0(0x2cb)]['isNonSubmenuCancel']=function(){const _0x5ca22a=_0x421ee0;return[_0x5ca22a(0x8fc),_0x5ca22a(0x7f3),_0x5ca22a(0x714)][_0x5ca22a(0x7f2)](this[_0x5ca22a(0x28d)][_0x5ca22a(0x6ff)]());},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x81c)]=Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x76a)],Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x76a)]=function(){const _0x2198c7=_0x421ee0;this[_0x2198c7(0x57c)]()?(this[_0x2198c7(0x1df)][_0x2198c7(0x449)](),this[_0x2198c7(0x297)][_0x2198c7(0x405)](),this['_actorCommandWindow'][_0x2198c7(0x531)]()):VisuMZ['BattleCore'][_0x2198c7(0x81c)][_0x2198c7(0x8eb)](this),this[_0x2198c7(0x5d4)]();},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x5b9)]=Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x1d3)],Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x1d3)]=function(){const _0x2eacff=_0x421ee0;VisuMZ[_0x2eacff(0x674)][_0x2eacff(0x5b9)][_0x2eacff(0x8eb)](this),this[_0x2eacff(0x2be)]();},VisuMZ['BattleCore'][_0x421ee0(0x780)]=Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x7dd)],Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x7dd)]=function(){const _0x178384=_0x421ee0;this[_0x178384(0x57c)]()?(this['_statusWindow']['show'](),this['_enemyWindow'][_0x178384(0x405)](),this['_actorCommandWindow']['activate']()):VisuMZ[_0x178384(0x674)][_0x178384(0x780)][_0x178384(0x8eb)](this),this[_0x178384(0x5d4)]();},Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x2be)]=function(){const _0x1b0671=_0x421ee0,_0x1d6840=this[_0x1b0671(0x885)]();(_0x1d6840===_0x1b0671(0x633)||this[_0x1b0671(0x197)]())&&(this['_skillWindow'][_0x1b0671(0x5c5)](),this[_0x1b0671(0x61d)][_0x1b0671(0x3c4)]&&this['_skillWindow']['show'](),this[_0x1b0671(0x3a4)][_0x1b0671(0x5c5)](),this[_0x1b0671(0x3a4)]['active']&&this[_0x1b0671(0x3a4)][_0x1b0671(0x449)]());},Scene_Battle['prototype'][_0x421ee0(0x5d4)]=function(){const _0x556734=_0x421ee0,_0x1e3e33=this[_0x556734(0x885)]();['xp',_0x556734(0x332),_0x556734(0x633)][_0x556734(0x7f2)](_0x1e3e33)&&this[_0x556734(0x28d)][_0x556734(0x5c5)](),this['okTargetSelectionVisibility']();},Scene_Battle['prototype'][_0x421ee0(0x7c3)]=function(){const _0x1db3ad=_0x421ee0,_0xd740c=VisuMZ[_0x1db3ad(0x674)][_0x1db3ad(0x57b)][_0x1db3ad(0x772)],_0x2f50a2=Window_BattleStatus[_0x1db3ad(0x2cb)]['extraHeight'](),_0x5a98f2=Graphics[_0x1db3ad(0x733)]-(_0xd740c[_0x1db3ad(0x5d7)]||0xc0),_0xcc5b1b=this[_0x1db3ad(0x21b)]()+_0x2f50a2,_0x4d2caa=this['isRightInputMode']()?0x0:Graphics['boxWidth']-_0x5a98f2,_0x5510dd=Graphics['boxHeight']-_0xcc5b1b+_0x2f50a2;return new Rectangle(_0x4d2caa,_0x5510dd,_0x5a98f2,_0xcc5b1b);},Scene_Battle['prototype']['statusWindowRectXPStyle']=function(){const _0x190897=_0x421ee0,_0x5e0ffc=Window_BattleStatus['prototype']['extraHeight'](),_0x4ca90d=Graphics[_0x190897(0x733)],_0x37e855=this['windowAreaHeight']()+_0x5e0ffc,_0x248ce2=0x0,_0x25edda=Graphics[_0x190897(0x53d)]-_0x37e855+_0x5e0ffc;return new Rectangle(_0x248ce2,_0x25edda,_0x4ca90d,_0x37e855);},Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x165)]=function(){const _0x334138=_0x421ee0,_0x21fd2a=Graphics[_0x334138(0x733)]/0x2,_0x1dc630=this['calcWindowHeight'](VisuMZ[_0x334138(0x674)][_0x334138(0x57b)]['BattleLayout'][_0x334138(0x1c7)],!![]),_0x214f21=Math['round']((Graphics[_0x334138(0x733)]-_0x21fd2a)/0x2),_0x13bb4c=Graphics[_0x334138(0x53d)]-_0x1dc630-this[_0x334138(0x69e)]()[_0x334138(0x6b2)];return new Rectangle(_0x214f21,_0x13bb4c,_0x21fd2a,_0x1dc630);},Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x40f)]=function(){const _0x863087=_0x421ee0,_0x4621f6=Graphics[_0x863087(0x62f)],_0x7ef8c6=Math[_0x863087(0x38a)]((Graphics[_0x863087(0x733)]-_0x4621f6)/0x2),_0x4b7967=this['helpAreaHeight'](),_0x1365a0=(Graphics[_0x863087(0x6b2)]-Graphics[_0x863087(0x53d)])/-0x2;return new Rectangle(_0x7ef8c6,_0x1365a0,_0x4621f6,_0x4b7967);},Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x60d)]=function(){const _0x40fa7f=_0x421ee0,_0x535acf=Graphics['width'],_0x18cee7=Math[_0x40fa7f(0x38a)]((Graphics[_0x40fa7f(0x733)]-_0x535acf)/0x2),_0x3e7fcb=this[_0x40fa7f(0x192)](0x4,!![]),_0x2d14b9=Graphics['boxHeight']-_0x3e7fcb+(Graphics[_0x40fa7f(0x6b2)]-Graphics[_0x40fa7f(0x53d)])/0x2;return new Rectangle(_0x18cee7,_0x2d14b9,_0x535acf,_0x3e7fcb);},Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x573)]=function(){const _0x37fca2=_0x421ee0,_0x22fb5a=Math[_0x37fca2(0x860)](Graphics[_0x37fca2(0x62f)]/0x3),_0xb274c7=this[_0x37fca2(0x402)]()?(Graphics[_0x37fca2(0x62f)]+Graphics['boxWidth'])/0x2-_0x22fb5a:(Graphics[_0x37fca2(0x62f)]-Graphics[_0x37fca2(0x733)])/-0x2,_0x1279da=this[_0x37fca2(0x40f)](),_0x2bd086=_0x1279da['y']+_0x1279da[_0x37fca2(0x6b2)],_0x7063f4=this[_0x37fca2(0x60d)](),_0x44904d=_0x7063f4['y']-_0x2bd086;return new Rectangle(_0xb274c7,_0x2bd086,_0x22fb5a,_0x44904d);},Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x721)]=function(){const _0x1ab09d=_0x421ee0,_0x412076=Math['ceil'](Graphics[_0x1ab09d(0x62f)]/0x3),_0xdbfec0=Math[_0x1ab09d(0x38a)]((Graphics['boxWidth']-_0x412076)/0x2),_0x575c38=this['partyCommandWindowRectBorderStyle'](),_0x386d86=_0x575c38['y'],_0x391714=_0x575c38[_0x1ab09d(0x6b2)];return new Rectangle(_0xdbfec0,_0x386d86,_0x412076,_0x391714);},Scene_Battle['prototype'][_0x421ee0(0x18f)]=function(){const _0x4fc3e0=_0x421ee0;this['_cancelButton']['y']=this['_helpWindow']['y']+this[_0x4fc3e0(0x8c1)][_0x4fc3e0(0x6b2)],this[_0x4fc3e0(0x402)]()?this[_0x4fc3e0(0x885)]()===_0x4fc3e0(0x633)?this['_cancelButton']['x']=0x8:this[_0x4fc3e0(0x4fd)]['x']=-this['_cancelButton'][_0x4fc3e0(0x62f)]-0x4:this[_0x4fc3e0(0x4fd)]['x']=Graphics['width']-(Graphics[_0x4fc3e0(0x62f)]-Graphics[_0x4fc3e0(0x733)])/0x2-this[_0x4fc3e0(0x4fd)]['width']-0x4;},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x84b)]=Scene_Battle['prototype'][_0x421ee0(0x7af)],Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x7af)]=function(){const _0x170a30=_0x421ee0;if(this['battleLayoutStyle']()==='border')return this[_0x170a30(0x721)]();else return this['isSkillItemWindowsMiddle']()?this[_0x170a30(0x796)]():VisuMZ[_0x170a30(0x674)][_0x170a30(0x84b)][_0x170a30(0x8eb)](this);},VisuMZ['BattleCore'][_0x421ee0(0x53c)]=Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x45d)],Scene_Battle['prototype']['itemWindowRect']=function(){const _0x4bf239=_0x421ee0;if(this[_0x4bf239(0x885)]()===_0x4bf239(0x633))return this[_0x4bf239(0x721)]();else return this[_0x4bf239(0x197)]()?this[_0x4bf239(0x796)]():VisuMZ[_0x4bf239(0x674)][_0x4bf239(0x53c)]['call'](this);},Scene_Battle['prototype'][_0x421ee0(0x197)]=function(){const _0x1326be=_0x421ee0;return VisuMZ['BattleCore']['Settings'][_0x1326be(0x772)][_0x1326be(0x4a6)];},Scene_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x796)]=function(){const _0x1a1bcf=_0x421ee0,_0x38fc84=Sprite_Button[_0x1a1bcf(0x2cb)][_0x1a1bcf(0x859)]()*0x2+0x4;let _0x4ca2e4=Graphics[_0x1a1bcf(0x733)]-_0x38fc84;Imported['VisuMZ_0_CoreEngine']&&SceneManager[_0x1a1bcf(0x76d)]()&&(_0x4ca2e4+=_0x38fc84);const _0xd64ae6=this['helpAreaBottom'](),_0x5baf32=Graphics['boxHeight']-_0xd64ae6-this['statusWindowRect']()['height']+Window_BattleStatus[_0x1a1bcf(0x2cb)][_0x1a1bcf(0x759)](),_0xdc7a92=0x0;return new Rectangle(_0xdc7a92,_0xd64ae6,_0x4ca2e4,_0x5baf32);},Scene_Battle['prototype'][_0x421ee0(0x263)]=function(){const _0x2ea34a=_0x421ee0;return;this[_0x2ea34a(0x20b)]=new Sprite(),this[_0x2ea34a(0x20b)]['x']=this[_0x2ea34a(0x8cb)]['x'],this[_0x2ea34a(0x20b)]['y']=this[_0x2ea34a(0x8cb)]['y'];const _0x2b1965=this[_0x2ea34a(0x743)][_0x2ea34a(0x19a)](this['_windowLayer']);this[_0x2ea34a(0x793)](this[_0x2ea34a(0x20b)],_0x2b1965);for(let _0x1c63a5=0x0;_0x1c63a5<0x8;_0x1c63a5++){const _0x54ddd0=new Window_EnemyName(_0x1c63a5);this[_0x2ea34a(0x20b)][_0x2ea34a(0x658)](_0x54ddd0);}},Sprite_Battler['_motionSpeed']=VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x57b)][_0x421ee0(0x92b)][_0x421ee0(0x6a5)],VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x920)]=Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x3a7)],Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x3a7)]=function(){const _0x5838b8=_0x421ee0;VisuMZ[_0x5838b8(0x674)][_0x5838b8(0x920)]['call'](this),this['initMembersBattleCore']();if(this[_0x5838b8(0x51e)]===Sprite_Enemy)this['createShadowSprite']();this[_0x5838b8(0x453)]();},Sprite_Battler[_0x421ee0(0x2cb)]['initMembersBattleCore']=function(){const _0x56b0d9=_0x421ee0;this['_baseX']=0x0,this[_0x56b0d9(0x88b)]=0x0,this[_0x56b0d9(0x7e7)]=0x0,this[_0x56b0d9(0x610)]=0x0,this[_0x56b0d9(0x643)]=0x0,this[_0x56b0d9(0x180)]=0x0,this[_0x56b0d9(0x1be)]=_0x56b0d9(0x363),this[_0x56b0d9(0x35b)]=0x0,this['_jumpMaxHeight']=0x0,this[_0x56b0d9(0x3c5)]=0x0,this[_0x56b0d9(0x3ac)]=0x0,this[_0x56b0d9(0x843)]=0xff,this['_opacityDuration']=0x0,this['_opacityWholeDuration']=0x0,this['_opacityEasing']=_0x56b0d9(0x363),this[_0x56b0d9(0x5d3)]=0x0,this[_0x56b0d9(0x231)]=0x0,this[_0x56b0d9(0x244)]=0x0,this[_0x56b0d9(0x713)]=0x0,this[_0x56b0d9(0x67e)]=_0x56b0d9(0x363),this[_0x56b0d9(0x580)]=!![],this[_0x56b0d9(0x740)]=0x0,this[_0x56b0d9(0x6a1)]=0x0,this['_targetSkewX']=0x0,this['_targetSkewY']=0x0,this[_0x56b0d9(0x8c0)]=0x0,this['_skewWholeDuration']=0x0,this[_0x56b0d9(0x1b9)]=_0x56b0d9(0x363),this['_growX']=0x1,this[_0x56b0d9(0x585)]=0x1,this['_targetGrowX']=0x1,this[_0x56b0d9(0x77f)]=0x1,this[_0x56b0d9(0x8a5)]=0x0,this['_growWholeDuration']=0x0,this['_growEasing']=_0x56b0d9(0x363),this[_0x56b0d9(0x5a8)]=0x1;},Sprite_Battler['prototype'][_0x421ee0(0x52d)]=function(){const _0x3acfbf=_0x421ee0;this[_0x3acfbf(0x523)]=new Sprite(),this[_0x3acfbf(0x523)]['bitmap']=ImageManager['loadSystem'](_0x3acfbf(0x4cd)),this[_0x3acfbf(0x523)][_0x3acfbf(0x82a)][_0x3acfbf(0x631)]=VisuMZ[_0x3acfbf(0x674)][_0x3acfbf(0x57b)][_0x3acfbf(0x92b)][_0x3acfbf(0x67d)],this[_0x3acfbf(0x523)]['anchor']['x']=0.5,this[_0x3acfbf(0x523)]['anchor']['y']=0.5,this[_0x3acfbf(0x523)]['y']=-0x2,this['_shadowSprite'][_0x3acfbf(0x3b9)]=![],this[_0x3acfbf(0x658)](this[_0x3acfbf(0x523)]);},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x453)]=function(){const _0x555164=_0x421ee0;this[_0x555164(0x59f)]=new Sprite(),this['_distortionSprite'][_0x555164(0x5d1)]['x']=0.5,this[_0x555164(0x59f)]['anchor']['y']=0.5,this[_0x555164(0x658)](this[_0x555164(0x59f)]);},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x2e6)]=function(){const _0x1186a8=_0x421ee0;if(!this[_0x1186a8(0x59f)])return;if(this['_shadowSprite']){const _0x27926e=this[_0x1186a8(0x599)](this[_0x1186a8(0x59f)]);this[_0x1186a8(0x793)](this['_shadowSprite'],_0x27926e),this[_0x1186a8(0x175)]();}this[_0x1186a8(0x841)]&&this['_distortionSprite'][_0x1186a8(0x658)](this[_0x1186a8(0x841)]),this[_0x1186a8(0x4a2)]&&this['_distortionSprite'][_0x1186a8(0x658)](this[_0x1186a8(0x4a2)]),this['_mainSprite']&&this[_0x1186a8(0x59f)]['addChild'](this[_0x1186a8(0x6d5)]),this[_0x1186a8(0x47f)]&&this[_0x1186a8(0x59f)][_0x1186a8(0x658)](this['_dragonbonesSpriteContainer']);},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x175)]=function(){const _0x13c406=_0x421ee0;if(!this[_0x13c406(0x523)])return;if(this[_0x13c406(0x4c7)]&&this['_battler']['svBattlerShadowVisible']()){const _0xf7424=this[_0x13c406(0x523)][_0x13c406(0x82a)];this['_shadowSprite'][_0x13c406(0x350)](0x0,0x0,_0xf7424[_0x13c406(0x62f)],_0xf7424['height']);}else this[_0x13c406(0x523)][_0x13c406(0x350)](0x0,0x0,0x0,0x0);},Sprite_Battler['prototype']['damageContainer']=function(){const _0x4a46a0=_0x421ee0;return SceneManager[_0x4a46a0(0x225)]()?SceneManager[_0x4a46a0(0x855)][_0x4a46a0(0x6c2)][_0x4a46a0(0x428)]:this['parent'];},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x3ae)]=function(_0x15188c,_0x5c535c){const _0x3dde7d=_0x421ee0;if(!this[_0x3dde7d(0x4c7)]['isSpriteVisible']())return;const _0x41a4b1=VisuMZ[_0x3dde7d(0x674)]['Settings'][_0x3dde7d(0x60c)],_0x30eb85=new Sprite_Damage();_0x30eb85[_0x3dde7d(0x6ea)]=_0x41a4b1[_0x3dde7d(0x782)],this[_0x3dde7d(0x848)](_0x30eb85),_0x30eb85[_0x3dde7d(0x3ae)](_0x15188c,_0x5c535c),this[_0x3dde7d(0x54d)](_0x30eb85);},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x185)]=function(_0x4ef697,_0x2f1f5d,_0x268312){const _0x111ca0=_0x421ee0;if(!this[_0x111ca0(0x4c7)]['isSpriteVisible']())return;const _0xef6d9a=VisuMZ[_0x111ca0(0x674)][_0x111ca0(0x57b)][_0x111ca0(0x60c)],_0x30eaf2=new Sprite_Damage();_0x30eaf2[_0x111ca0(0x6ea)]=_0xef6d9a['PopupDuration'],this[_0x111ca0(0x848)](_0x30eaf2),_0x30eaf2[_0x111ca0(0x185)](_0x4ef697,_0x2f1f5d,_0x268312),this[_0x111ca0(0x54d)](_0x30eaf2);},Sprite_Battler[_0x421ee0(0x2cb)]['setupDamagePopup']=function(){const _0x1347cc=_0x421ee0;if(!this[_0x1347cc(0x4c7)][_0x1347cc(0x92a)]())return;while(this[_0x1347cc(0x4c7)]['isDamagePopupRequested']()){this[_0x1347cc(0x4c7)][_0x1347cc(0x7ed)]()&&this[_0x1347cc(0x52e)]();}this[_0x1347cc(0x4c7)][_0x1347cc(0x474)](),this[_0x1347cc(0x4c7)][_0x1347cc(0x931)]();},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x52e)]=function(){const _0x1a5636=_0x421ee0,_0x196d90=VisuMZ[_0x1a5636(0x674)][_0x1a5636(0x57b)][_0x1a5636(0x60c)],_0x352e25=new Sprite_Damage();_0x352e25[_0x1a5636(0x6ea)]=_0x196d90[_0x1a5636(0x782)],this[_0x1a5636(0x848)](_0x352e25),_0x352e25[_0x1a5636(0x578)](this[_0x1a5636(0x4c7)]),_0x352e25[_0x1a5636(0x4d2)](this[_0x1a5636(0x4c7)]),this[_0x1a5636(0x54d)](_0x352e25);},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x54d)]=function(_0x2f2c1b){const _0x20703f=_0x421ee0;this[_0x20703f(0x59e)][_0x20703f(0x7b3)](_0x2f2c1b);if(this[_0x20703f(0x261)]())SceneManager[_0x20703f(0x855)]['_statusWindow'][_0x20703f(0x54d)](_0x2f2c1b,this[_0x20703f(0x4c7)]);else{this[_0x20703f(0x6a7)]()[_0x20703f(0x658)](_0x2f2c1b);if(SceneManager[_0x20703f(0x604)]())_0x2f2c1b[_0x20703f(0x2b7)]['x']=-0x1;}},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x261)]=function(){const _0x289c8d=_0x421ee0;return!$gameSystem[_0x289c8d(0x649)]()&&this[_0x289c8d(0x4c7)]&&this[_0x289c8d(0x4c7)][_0x289c8d(0x6da)]();},Sprite_Battler[_0x421ee0(0x2cb)]['sortDamageSprites']=function(_0x310b3c){const _0x462485=_0x421ee0,_0xbada95=VisuMZ[_0x462485(0x674)][_0x462485(0x57b)][_0x462485(0x60c)],_0x5685a3=SceneManager['isBattleFlipped']()?-0x1:0x1;let _0x3edb56=this['x'],_0x50f71e=this['y'];const _0x430dba=SceneManager[_0x462485(0x855)][_0x462485(0x1df)];if(_0x430dba&&this[_0x462485(0x6df)]===_0x430dba){_0x3edb56+=_0x430dba['x']-this[_0x462485(0x6ee)]();const _0x26b6b9=_0x430dba[_0x462485(0x36e)]()*0x3/0x4;_0x50f71e=_0x430dba['y']+_0x26b6b9,_0x50f71e=Math['min'](_0x50f71e,_0x430dba['y']+this['y']-this[_0x462485(0x6b2)]+_0x26b6b9);}_0x310b3c['x']=Math[_0x462485(0x38a)](_0x3edb56+this['damageOffsetX']()*_0x5685a3),_0x310b3c['y']=Math[_0x462485(0x38a)](_0x50f71e+this[_0x462485(0x6f1)]());if(_0xbada95[_0x462485(0x436)])for(const _0x3493b7 of this[_0x462485(0x59e)]){_0x3493b7['x']+=_0xbada95[_0x462485(0x832)]*_0x5685a3,_0x3493b7['y']+=_0xbada95['PopupShiftY'];}else{const _0x1f84cf=this['_damages'][this['_damages'][_0x462485(0x4be)]-0x1];_0x1f84cf&&(_0x310b3c['x']=_0x1f84cf['x']+_0xbada95['PopupShiftX']*_0x5685a3,_0x310b3c['y']=_0x1f84cf['y']+_0xbada95[_0x462485(0x647)]);}},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x7bd)]=Sprite_Battler[_0x421ee0(0x2cb)]['damageOffsetX'],Sprite_Battler[_0x421ee0(0x2cb)]['damageOffsetX']=function(){const _0x5dca42=_0x421ee0;let _0x545d35=VisuMZ['BattleCore'][_0x5dca42(0x7bd)][_0x5dca42(0x8eb)](this),_0x167e24=VisuMZ[_0x5dca42(0x674)][_0x5dca42(0x57b)][_0x5dca42(0x60c)][_0x5dca42(0x499)]||0x0;return Math['round'](_0x545d35+_0x167e24);},VisuMZ['BattleCore'][_0x421ee0(0x46f)]=Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x6f1)],Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x6f1)]=function(){const _0x149be5=_0x421ee0;let _0x40e755=VisuMZ['BattleCore'][_0x149be5(0x46f)][_0x149be5(0x8eb)](this);switch(VisuMZ[_0x149be5(0x674)]['Settings'][_0x149be5(0x60c)][_0x149be5(0x1c0)]){case'head':_0x40e755-=this[_0x149be5(0x6b2)]*this[_0x149be5(0x2b7)]['y'];break;case'center':_0x40e755-=this[_0x149be5(0x6b2)]*this[_0x149be5(0x2b7)]['y']*0.5;break;}let _0x2dad6c=VisuMZ[_0x149be5(0x674)][_0x149be5(0x57b)][_0x149be5(0x60c)]['PopupOffsetY']||0x0;return Math[_0x149be5(0x38a)](_0x40e755+_0x2dad6c);},Sprite_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x6ee)]=function(){const _0x562d18=_0x421ee0;return Sprite_Battler[_0x562d18(0x2cb)][_0x562d18(0x6ee)]['call'](this);},Sprite_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x6f1)]=function(){const _0x285bd6=_0x421ee0;return Sprite_Battler[_0x285bd6(0x2cb)][_0x285bd6(0x6f1)]['call'](this);},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x6fa)]=function(_0x10d302){const _0x1f9b87=_0x421ee0;this[_0x1f9b87(0x261)]()?SceneManager[_0x1f9b87(0x855)][_0x1f9b87(0x1df)]['removeDamageSprite'](_0x10d302):(this[_0x1f9b87(0x6a7)]()[_0x1f9b87(0x2e1)](_0x10d302),this['_damages'][_0x1f9b87(0x60e)](_0x10d302),_0x10d302[_0x1f9b87(0x56a)]());},VisuMZ['BattleCore'][_0x421ee0(0x2a4)]=Sprite_Battler['prototype'][_0x421ee0(0x638)],Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x638)]=function(_0x5f540b,_0x1d0995){const _0x416b0a=_0x421ee0,_0x1c933e=VisuMZ['BattleCore']['Settings'];if(this[_0x416b0a(0x51e)]===Sprite_Actor)_0x5f540b+=_0x1c933e['Actor']['OffsetX']||0x0,_0x1d0995+=_0x1c933e['Actor']['OffsetY']||0x0;else this[_0x416b0a(0x51e)]===Sprite_Enemy&&(_0x5f540b+=_0x1c933e[_0x416b0a(0x2d2)][_0x416b0a(0x41b)]||0x0,_0x1d0995+=_0x1c933e[_0x416b0a(0x2d2)][_0x416b0a(0x275)]||0x0);VisuMZ[_0x416b0a(0x674)][_0x416b0a(0x2a4)]['call'](this,_0x5f540b,_0x1d0995);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x583)]=Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x53e)],Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x53e)]=function(){const _0x3585db=_0x421ee0;VisuMZ['BattleCore'][_0x3585db(0x583)][_0x3585db(0x8eb)](this),!this['_battler']&&this[_0x3585db(0x45b)]&&(this[_0x3585db(0x45b)][_0x3585db(0x3b9)]=![]);},VisuMZ[_0x421ee0(0x674)]['Sprite_Battler_updateMain']=Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x5b8)],Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x5b8)]=function(){const _0x14b242=_0x421ee0;this['updateScale'](),this['updateSkew'](),this[_0x14b242(0x4f7)](),this['updateFlip'](),this[_0x14b242(0x55f)](),VisuMZ['BattleCore'][_0x14b242(0x29b)][_0x14b242(0x8eb)](this);if(this[_0x14b242(0x51e)]===Sprite_Enemy)this['updateShadow']();},VisuMZ['BattleCore'][_0x421ee0(0x3db)]=Sprite_Battler[_0x421ee0(0x2cb)]['updatePosition'],Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x5b6)]=function(){const _0x537f4a=_0x421ee0;VisuMZ[_0x537f4a(0x674)][_0x537f4a(0x3db)][_0x537f4a(0x8eb)](this),this[_0x537f4a(0x181)](),this[_0x537f4a(0x839)]();},Sprite_Battler[_0x421ee0(0x2cb)]['updatePositionBattleCore']=function(){const _0x553e81=_0x421ee0;this[_0x553e81(0x923)]=this['x'],this[_0x553e81(0x88b)]=this['y'],this[_0x553e81(0x587)](),this[_0x553e81(0x5fb)](),this['x']+=this[_0x553e81(0x930)](),this['y']+=this[_0x553e81(0x590)](),this['x']=Math[_0x553e81(0x38a)](this['x']),this['y']=Math[_0x553e81(0x38a)](this['y']);},Sprite_Battler['prototype'][_0x421ee0(0x930)]=function(){let _0x5d2ee1=0x0;return _0x5d2ee1;},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x590)]=function(){const _0x39184c=_0x421ee0;let _0x1ba38f=0x0;this['_battler']&&!this[_0x39184c(0x4c7)][_0x39184c(0x3e0)]()&&(_0x1ba38f-=this[_0x39184c(0x7e7)],_0x1ba38f-=this[_0x39184c(0x35b)]);if(this[_0x39184c(0x59f)]&&this[_0x39184c(0x51e)]!==Sprite_SvEnemy){const _0x493759=this[_0x39184c(0x59f)]['scale']['y'];_0x1ba38f-=(_0x493759-0x1)*this[_0x39184c(0x6b2)];}return _0x1ba38f;},Sprite_Battler['prototype']['updateFlip']=function(){const _0x494bb5=_0x421ee0,_0x4cba25=this['_battler']&&this['_battler']['isBattlerFlipped']();this[_0x494bb5(0x5a8)]=(_0x4cba25?-0x1:0x1)*Math[_0x494bb5(0x8f2)](this[_0x494bb5(0x2b7)]['x']);},Sprite_Battler[_0x421ee0(0x2cb)]['startFloat']=function(_0x46f4fe,_0x443a5a,_0x2e9658){const _0x13fa63=_0x421ee0;if(!this[_0x13fa63(0x40d)]())return;if(this[_0x13fa63(0x610)]===_0x46f4fe)return;this[_0x13fa63(0x610)]=_0x46f4fe,this[_0x13fa63(0x643)]=_0x443a5a,this[_0x13fa63(0x180)]=_0x443a5a,this['_floatEasing']=_0x2e9658||'Linear';if(_0x443a5a<=0x0)this['_floatHeight']=_0x46f4fe;},Sprite_Battler['prototype']['updateFloat']=function(){const _0x2d558f=_0x421ee0;if(this[_0x2d558f(0x643)]<=0x0)return;const _0x2ea757=this[_0x2d558f(0x643)],_0x209567=this['_floatWholeDuration'],_0x2fabe9=this[_0x2d558f(0x1be)];Imported['VisuMZ_0_CoreEngine']?this['_floatHeight']=this[_0x2d558f(0x7de)](this[_0x2d558f(0x7e7)],this['_targetFloatHeight'],_0x2ea757,_0x209567,_0x2fabe9):this[_0x2d558f(0x7e7)]=(this[_0x2d558f(0x7e7)]*(_0x2ea757-0x1)+this['_targetFloatHeight'])/_0x2ea757;this[_0x2d558f(0x643)]--;if(this[_0x2d558f(0x643)]<=0x0)this[_0x2d558f(0x7fa)]();},Sprite_Battler['prototype'][_0x421ee0(0x7fa)]=function(){const _0x2e6ce1=_0x421ee0;this[_0x2e6ce1(0x7e7)]=this['_targetFloatHeight'];},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x29e)]=function(){return this['_floatDuration']>0x0;},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x700)]=function(_0x18a41d,_0x39e95b){const _0x1b7968=_0x421ee0;if(!this[_0x1b7968(0x40d)]())return;if(_0x39e95b<=0x0)return;this[_0x1b7968(0x37c)]=_0x18a41d,this['_jumpDuration']=_0x39e95b,this[_0x1b7968(0x3ac)]=_0x39e95b;},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x5fb)]=function(){const _0x19f5e8=_0x421ee0;if(this['_jumpDuration']<=0x0)return;const _0xf822f8=this[_0x19f5e8(0x3ac)]-this[_0x19f5e8(0x3c5)],_0x653a7e=this[_0x19f5e8(0x3ac)]/0x2,_0x3c1aec=this[_0x19f5e8(0x37c)],_0x4cca72=-_0x3c1aec/Math['pow'](_0x653a7e,0x2);this[_0x19f5e8(0x35b)]=_0x4cca72*Math[_0x19f5e8(0x82c)](_0xf822f8-_0x653a7e,0x2)+_0x3c1aec,this['_jumpDuration']--;if(this[_0x19f5e8(0x3c5)]<=0x0)return this[_0x19f5e8(0x381)]();},Sprite_Battler[_0x421ee0(0x2cb)]['onJumpEnd']=function(){const _0x48d928=_0x421ee0;this[_0x48d928(0x35b)]=0x0;},Sprite_Battler[_0x421ee0(0x2cb)]['isJumping']=function(){const _0x333197=_0x421ee0;return this[_0x333197(0x3c5)]>0x0;},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x630)]=function(_0x4f1415,_0x26d0e0,_0x2c7a5a){const _0x358c75=_0x421ee0;if(this[_0x358c75(0x843)]===_0x4f1415)return;this['_targetOpacity']=_0x4f1415,this[_0x358c75(0x184)]=_0x26d0e0,this[_0x358c75(0x4a9)]=_0x26d0e0,this[_0x358c75(0x61b)]=_0x2c7a5a||_0x358c75(0x363);if(_0x26d0e0<=0x0)this['opacity']=_0x4f1415;},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x839)]=function(){const _0x5ab8c4=_0x421ee0;if(this['_opacityDuration']<=0x0)return;const _0x4a428d=this['_opacityDuration'],_0x11e624=this['_opacityWholeDuration'],_0x273138=this[_0x5ab8c4(0x61b)];Imported[_0x5ab8c4(0x588)]?this[_0x5ab8c4(0x3d5)]=this[_0x5ab8c4(0x7de)](this[_0x5ab8c4(0x3d5)],this['_targetOpacity'],_0x4a428d,_0x11e624,_0x273138):this['opacity']=(this[_0x5ab8c4(0x3d5)]*(_0x4a428d-0x1)+this[_0x5ab8c4(0x843)])/_0x4a428d;this['_opacityDuration']--;if(this[_0x5ab8c4(0x184)]<=0x0)this[_0x5ab8c4(0x6e7)]();},Sprite_Battler['prototype'][_0x421ee0(0x6e7)]=function(){const _0x3f012e=_0x421ee0;this['opacity']=this[_0x3f012e(0x843)];},Sprite_Battler[_0x421ee0(0x2cb)]['isChangingOpacity']=function(){const _0x2aee86=_0x421ee0;return this[_0x2aee86(0x184)]>0x0;},Sprite_Battler[_0x421ee0(0x2cb)]['updateShadow']=function(){const _0x5083f7=_0x421ee0;this[_0x5083f7(0x523)][_0x5083f7(0x3b9)]=this['_battler'][_0x5083f7(0x3fd)](),this[_0x5083f7(0x251)]();},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x251)]=function(){const _0xa43ceb=_0x421ee0;if(!this[_0xa43ceb(0x523)])return;this['_shadowSprite']['y']=Math[_0xa43ceb(0x38a)](-this[_0xa43ceb(0x590)]()-0x2);},Sprite_Battler[_0x421ee0(0x2cb)]['updateScale']=function(){const _0x46dd99=_0x421ee0;if(this[_0x46dd99(0x51e)]===Sprite_SvEnemy)return;this[_0x46dd99(0x2ff)](),this['finalizeScale']();},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x2f2)]=function(){const _0x3c1ba9=_0x421ee0,_0x8347a6=this[_0x3c1ba9(0x59f)];_0x8347a6&&(_0x8347a6[_0x3c1ba9(0x2b7)]['x']=this['mainSpriteScaleX'](),_0x8347a6[_0x3c1ba9(0x2b7)]['y']=this['mainSpriteScaleY']());},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x70a)]=function(){let _0x186890=0x1;return _0x186890*=this['_flipScaleX'],_0x186890*=this['_growX'],_0x186890;},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x6a6)]=function(){return 0x1*this['_growY'];},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x315)]=function(){const _0x258423=_0x421ee0;return this[_0x258423(0x62f)]*this[_0x258423(0x70a)]();},Sprite_Battler[_0x421ee0(0x2cb)]['mainSpriteHeight']=function(){const _0x42271f=_0x421ee0;return this['height']*this[_0x42271f(0x6a6)]();},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x2eb)]=function(_0x1d03d4,_0x47c1e5,_0x5472f2,_0x344a97){const _0x3c3930=_0x421ee0;if(!this['canMove']())return;if(!this['_distortionSprite'])return;if(this[_0x3c3930(0x4f9)]===_0x1d03d4&&this['_targetGrowY']===_0x47c1e5)return;this[_0x3c3930(0x4f9)]=_0x1d03d4,this[_0x3c3930(0x77f)]=_0x47c1e5,this[_0x3c3930(0x8a5)]=_0x5472f2,this[_0x3c3930(0x390)]=_0x5472f2,this[_0x3c3930(0x403)]=_0x344a97||_0x3c3930(0x363),_0x5472f2<=0x0&&(this[_0x3c3930(0x685)]=this[_0x3c3930(0x4f9)],this[_0x3c3930(0x585)]=this[_0x3c3930(0x77f)]);},Sprite_Battler['prototype'][_0x421ee0(0x2ff)]=function(){const _0x11c36c=_0x421ee0;if(this[_0x11c36c(0x8a5)]<=0x0)return;if(!this[_0x11c36c(0x59f)])return;const _0x4d5fe1=this['_growDuration'],_0x136e7f=this[_0x11c36c(0x390)],_0x35ca6e=this[_0x11c36c(0x403)];Imported[_0x11c36c(0x588)]?(this[_0x11c36c(0x685)]=this[_0x11c36c(0x7de)](this[_0x11c36c(0x685)],this[_0x11c36c(0x4f9)],_0x4d5fe1,_0x136e7f,_0x35ca6e),this['_growY']=this['applyEasing'](this[_0x11c36c(0x585)],this[_0x11c36c(0x77f)],_0x4d5fe1,_0x136e7f,_0x35ca6e)):(this[_0x11c36c(0x685)]=(this['_growX']*(_0x4d5fe1-0x1)+this[_0x11c36c(0x4f9)])/_0x4d5fe1,this[_0x11c36c(0x585)]=(this[_0x11c36c(0x585)]*(_0x4d5fe1-0x1)+this['_targetGrowY'])/_0x4d5fe1);this[_0x11c36c(0x8a5)]--;if(this[_0x11c36c(0x8a5)]<=0x0)this[_0x11c36c(0x8cf)]();},Sprite_Battler[_0x421ee0(0x2cb)]['onGrowEnd']=function(){const _0x2bc407=_0x421ee0;this[_0x2bc407(0x685)]=this[_0x2bc407(0x4f9)],this[_0x2bc407(0x585)]=this['_targetGrowY'];},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x5fa)]=function(){return this['_growDuration']>0x0;},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x1e8)]=function(_0x424d3c,_0x1430c0,_0x57780a,_0x35ced6){const _0x12f704=_0x421ee0;if(!this[_0x12f704(0x40d)]())return;if(!this[_0x12f704(0x59f)])return;if(this['_targetSkewX']===_0x424d3c&&this[_0x12f704(0x360)]===_0x1430c0)return;this[_0x12f704(0x568)]=_0x424d3c,this['_targetSkewY']=_0x1430c0,this[_0x12f704(0x8c0)]=_0x57780a,this['_skewWholeDuration']=_0x57780a,this[_0x12f704(0x1b9)]=_0x35ced6||_0x12f704(0x363),_0x57780a<=0x0&&(this[_0x12f704(0x59f)]['skew']['x']=this[_0x12f704(0x568)],this['_distortionSprite'][_0x12f704(0x824)]['y']=this['_targetSkewY']);},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x1f5)]=function(){const _0x29cf52=_0x421ee0;if(this['_skewDuration']<=0x0)return;if(!this[_0x29cf52(0x59f)])return;const _0x1ab9a5=this['_skewDuration'],_0x453d92=this[_0x29cf52(0x8f7)],_0x1ecd4f=this[_0x29cf52(0x1b9)],_0x2e25e5=this[_0x29cf52(0x59f)];Imported[_0x29cf52(0x588)]?(_0x2e25e5[_0x29cf52(0x824)]['x']=this[_0x29cf52(0x7de)](_0x2e25e5[_0x29cf52(0x824)]['x'],this[_0x29cf52(0x568)],_0x1ab9a5,_0x453d92,_0x1ecd4f),_0x2e25e5[_0x29cf52(0x824)]['y']=this['applyEasing'](_0x2e25e5[_0x29cf52(0x824)]['y'],this[_0x29cf52(0x360)],_0x1ab9a5,_0x453d92,_0x1ecd4f)):(_0x2e25e5[_0x29cf52(0x824)]['x']=(_0x2e25e5[_0x29cf52(0x824)]['x']*(_0x1ab9a5-0x1)+this[_0x29cf52(0x568)])/_0x1ab9a5,_0x2e25e5[_0x29cf52(0x824)]['y']=(_0x2e25e5['skew']['y']*(_0x1ab9a5-0x1)+this[_0x29cf52(0x360)])/_0x1ab9a5);this[_0x29cf52(0x8c0)]--;if(this[_0x29cf52(0x8c0)]<=0x0)this[_0x29cf52(0x335)]();},Sprite_Battler[_0x421ee0(0x2cb)]['onSkewEnd']=function(){const _0x5ec09d=_0x421ee0;this[_0x5ec09d(0x59f)][_0x5ec09d(0x824)]['x']=this[_0x5ec09d(0x568)],this['_distortionSprite'][_0x5ec09d(0x824)]['y']=this[_0x5ec09d(0x360)];},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x20d)]=function(){const _0x195afa=_0x421ee0;return this[_0x195afa(0x8c0)]>0x0;},Sprite_Battler['prototype'][_0x421ee0(0x18e)]=function(_0x94040c,_0x5e06ee,_0x2ad144,_0x1d05c6){const _0x526625=_0x421ee0;if(!this['canMove']())return;if(!this[_0x526625(0x59f)])return;if(this['_targetAngle']===_0x94040c)return;this[_0x526625(0x231)]=_0x94040c,this[_0x526625(0x244)]=_0x5e06ee,this[_0x526625(0x713)]=_0x5e06ee,this['_angleEasing']=_0x2ad144||_0x526625(0x363),this[_0x526625(0x580)]=_0x1d05c6,this[_0x526625(0x580)]===undefined&&(this[_0x526625(0x580)]=!![]),_0x5e06ee<=0x0&&(this[_0x526625(0x5d3)]=_0x94040c,this[_0x526625(0x580)]&&(this[_0x526625(0x231)]=0x0,this[_0x526625(0x5d3)]=0x0));},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x4f7)]=function(){const _0x994315=_0x421ee0;this[_0x994315(0x341)](),this[_0x994315(0x27f)]();},Sprite_Battler[_0x421ee0(0x2cb)]['updateAngleCalculations']=function(){const _0x131ff6=_0x421ee0;if(this['_angleDuration']<=0x0)return;const _0x5427f8=this['_angleDuration'],_0x1d186b=this[_0x131ff6(0x713)],_0x4e7a50=this[_0x131ff6(0x67e)];Imported['VisuMZ_0_CoreEngine']?this[_0x131ff6(0x5d3)]=this[_0x131ff6(0x7de)](this['_currentAngle'],this['_targetAngle'],_0x5427f8,_0x1d186b,_0x4e7a50):this['_currentAngle']=(this[_0x131ff6(0x5d3)]*(_0x5427f8-0x1)+this[_0x131ff6(0x231)])/_0x5427f8;this['_angleDuration']--;if(this[_0x131ff6(0x244)]<=0x0)this['onAngleEnd']();},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x1c5)]=function(){const _0xe4be5f=_0x421ee0;this[_0xe4be5f(0x5d3)]=this[_0xe4be5f(0x231)],this[_0xe4be5f(0x580)]&&(this[_0xe4be5f(0x231)]=0x0,this[_0xe4be5f(0x5d3)]=0x0);},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x344)]=function(){return this['_angleDuration']>0x0;},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x27f)]=function(){const _0x570f07=_0x421ee0;if(!this[_0x570f07(0x59f)])return;const _0x4cc4a2=this[_0x570f07(0x5d3)],_0x748b16=this[_0x570f07(0x2b7)]['x'],_0x740845=this[_0x570f07(0x4c7)]['isActor']()?-0x1:0x1;this[_0x570f07(0x59f)][_0x570f07(0x4c6)]=_0x4cc4a2*_0x748b16*_0x740845;const _0x1f3955=this[_0x570f07(0x59f)][_0x570f07(0x2b7)]['y'];this[_0x570f07(0x59f)]['y']=this[_0x570f07(0x6b2)]*-0.5*(0x2-_0x1f3955);const _0x47ff5c=[this[_0x570f07(0x6d5)],this[_0x570f07(0x841)],this[_0x570f07(0x47f)]];for(const _0x141d51 of _0x47ff5c){if(!_0x141d51)continue;_0x141d51['y']=this[_0x570f07(0x6b2)]*0.5;}this[_0x570f07(0x523)]&&(this[_0x570f07(0x523)][_0x570f07(0x2b7)]['x']=this[_0x570f07(0x59f)][_0x570f07(0x2b7)]['x'],this[_0x570f07(0x523)][_0x570f07(0x2b7)]['y']=this[_0x570f07(0x59f)][_0x570f07(0x2b7)]['y']);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x426)]=Sprite_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x87d)],Sprite_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x87d)]=function(){const _0x1cd862=_0x421ee0;VisuMZ[_0x1cd862(0x674)][_0x1cd862(0x426)]['call'](this),VisuMZ[_0x1cd862(0x674)]['Settings'][_0x1cd862(0x3e4)]['ShowActorGauge']&&this['createHpGaugeSprite']();},VisuMZ['BattleCore'][_0x421ee0(0x2c2)]=Sprite_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x2dd)],Sprite_Enemy['prototype'][_0x421ee0(0x2dd)]=function(){const _0x54206b=_0x421ee0;VisuMZ[_0x54206b(0x674)][_0x54206b(0x57b)][_0x54206b(0x3e4)][_0x54206b(0x769)]&&this[_0x54206b(0x3a9)](),VisuMZ[_0x54206b(0x674)]['Sprite_Enemy_createStateIconSprite']['call'](this);},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x3a9)]=function(){const _0x2cbda9=_0x421ee0;if(!ConfigManager[_0x2cbda9(0x2ae)])return;if(this[_0x2cbda9(0x51e)]===Sprite_SvEnemy)return;const _0x32b4fb=VisuMZ[_0x2cbda9(0x674)][_0x2cbda9(0x57b)]['HpGauge'],_0x226cf3=new Sprite_HpGauge();_0x226cf3[_0x2cbda9(0x5d1)]['x']=_0x32b4fb[_0x2cbda9(0x8e7)],_0x226cf3[_0x2cbda9(0x5d1)]['y']=_0x32b4fb[_0x2cbda9(0x22b)],_0x226cf3[_0x2cbda9(0x2b7)]['x']=_0x226cf3[_0x2cbda9(0x2b7)]['y']=_0x32b4fb[_0x2cbda9(0x456)],this[_0x2cbda9(0x45b)]=_0x226cf3,this[_0x2cbda9(0x658)](this[_0x2cbda9(0x45b)]);},VisuMZ[_0x421ee0(0x674)]['Sprite_Battler_setBattler']=Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x629)],Sprite_Battler['prototype'][_0x421ee0(0x629)]=function(_0x333558){const _0x390bcc=_0x421ee0;VisuMZ[_0x390bcc(0x674)][_0x390bcc(0x247)][_0x390bcc(0x8eb)](this,_0x333558),this['setupHpGaugeSprite'](_0x333558);},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x8c9)]=function(_0x18933a){const _0x22e96e=_0x421ee0;if(!_0x18933a)return;if(!this[_0x22e96e(0x45b)])return;if(_0x18933a[_0x22e96e(0x6da)]()){}else{if(_0x18933a[_0x22e96e(0x84c)]()){if(this[_0x22e96e(0x51e)]===Sprite_SvEnemy&&!_0x18933a['hasSvBattler']())return;}}this[_0x22e96e(0x45b)]['setup'](_0x18933a,'hp');},Sprite_Battler['prototype'][_0x421ee0(0x55f)]=function(){const _0xc957ac=_0x421ee0;if(!this[_0xc957ac(0x4c7)])return;if(!this[_0xc957ac(0x45b)])return;const _0x38e856=VisuMZ['BattleCore'][_0xc957ac(0x57b)][_0xc957ac(0x3e4)],_0x58ae79=this[_0xc957ac(0x45b)];_0x58ae79[_0xc957ac(0x3b9)]=this[_0xc957ac(0x8c6)]();const _0x3c0139=_0x38e856[_0xc957ac(0x41b)],_0x28cc5b=_0x38e856['OffsetY'];_0x58ae79['x']=_0x3c0139,_0x58ae79['x']+=this['_battler'][_0xc957ac(0x5af)](),_0x58ae79['y']=-this[_0xc957ac(0x6b2)]+_0x28cc5b,_0x58ae79['y']+=this[_0xc957ac(0x4c7)]['battleUIOffsetY']();},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x8c6)]=function(){const _0x285225=_0x421ee0;if(!this[_0x285225(0x4c7)])return![];if(this[_0x285225(0x4c7)][_0x285225(0x6da)]())return!![];const _0xbdeb6c=this[_0x285225(0x4c7)][_0x285225(0x660)]()[_0x285225(0x24c)];if(_0xbdeb6c[_0x285225(0x5f2)](/<SHOW HP GAUGE>/i))return!![];if(_0xbdeb6c['match'](/<HIDE HP GAUGE>/i))return![];const _0x4542a8=VisuMZ[_0x285225(0x674)][_0x285225(0x57b)][_0x285225(0x3e4)];if(_0x4542a8[_0x285225(0x4d7)]){if(_0x4542a8['BTestBypass']&&BattleManager['isBattleTest']())return!![];if(this[_0x285225(0x4c7)]['_visualHpGauge_JustDied'])return![];return this[_0x285225(0x4c7)]['hasBeenDefeatedBefore']();}return!![];},VisuMZ[_0x421ee0(0x674)]['Sprite_Battler_isMoving']=Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x918)],Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x918)]=function(){const _0xf4f77b=_0x421ee0;if(!this[_0xf4f77b(0x4c7)])return![];return VisuMZ[_0xf4f77b(0x674)][_0xf4f77b(0x465)][_0xf4f77b(0x8eb)](this);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x4c9)]=Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x8c3)],Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x8c3)]=function(_0x46109a,_0x468ca9,_0x17062f){const _0x4563a5=_0x421ee0;this[_0x4563a5(0x40d)]()&&VisuMZ[_0x4563a5(0x674)][_0x4563a5(0x4c9)][_0x4563a5(0x8eb)](this,_0x46109a,_0x468ca9,_0x17062f);},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x40d)]=function(){const _0x386cdd=_0x421ee0;if(this[_0x386cdd(0x4c7)]&&this[_0x386cdd(0x4c7)][_0x386cdd(0x2ac)]())return![];if(this['_battler']&&!this[_0x386cdd(0x4c7)][_0x386cdd(0x656)]())return![];return $gameSystem['isSideView']();},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x64d)]=function(){},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x3c3)]=function(){const _0x3b01a2=_0x421ee0;this[_0x3b01a2(0x8c3)](0x0,0x0,0xc);},Sprite_Battler[_0x421ee0(0x2cb)][_0x421ee0(0x784)]=function(){},Sprite_Battler['prototype'][_0x421ee0(0x3b6)]=function(){const _0x1fbc61=_0x421ee0,_0x1aa69e=VisuMZ[_0x1fbc61(0x674)][_0x1fbc61(0x57b)][_0x1fbc61(0x92b)],_0x3f03fa=this[_0x1fbc61(0x4c7)]&&this[_0x1fbc61(0x4c7)][_0x1fbc61(0x6da)]()?0x1:-0x1,_0x4328e7=this['_baseX']-this[_0x1fbc61(0x788)]+_0x3f03fa*_0x1aa69e[_0x1fbc61(0x7b9)],_0x2b1c50=this[_0x1fbc61(0x88b)]-this[_0x1fbc61(0x538)]+_0x3f03fa*_0x1aa69e[_0x1fbc61(0x26d)],_0x49bbfe=_0x1aa69e['FlinchDuration'];this[_0x1fbc61(0x8c3)](_0x4328e7,_0x2b1c50,_0x49bbfe);},VisuMZ['BattleCore'][_0x421ee0(0x2d5)]=Sprite_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x3a7)],Sprite_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x3a7)]=function(){const _0x123637=_0x421ee0;VisuMZ[_0x123637(0x674)][_0x123637(0x2d5)]['call'](this),this['attachSpritesToDistortionSprite']();},Sprite_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x8d5)]=function(){const _0x3f7f85=_0x421ee0;return this['_distortionSprite']||this[_0x3f7f85(0x6d5)]||this;},VisuMZ['BattleCore'][_0x421ee0(0x785)]=Sprite_Actor['prototype'][_0x421ee0(0x22d)],Sprite_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x22d)]=function(){},Sprite_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x712)]=function(_0x2727f6){const _0x14f0df=_0x421ee0;if(SceneManager[_0x14f0df(0x497)]())return;if(!_0x2727f6)return;if(!_0x2727f6[_0x14f0df(0x40d)]())return;VisuMZ[_0x14f0df(0x674)][_0x14f0df(0x785)][_0x14f0df(0x8eb)](this);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x7a7)]=Sprite_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x6b1)],Sprite_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x6b1)]=function(_0x373b88){const _0x4624b2=_0x421ee0;VisuMZ[_0x4624b2(0x674)][_0x4624b2(0x57b)]['Actor'][_0x4624b2(0x91b)]?VisuMZ[_0x4624b2(0x674)][_0x4624b2(0x57b)][_0x4624b2(0x92b)][_0x4624b2(0x91b)][_0x4624b2(0x8eb)](this,_0x373b88):VisuMZ[_0x4624b2(0x674)][_0x4624b2(0x7a7)][_0x4624b2(0x8eb)](this,_0x373b88);},VisuMZ['BattleCore']['Sprite_Actor_setBattler']=Sprite_Actor['prototype']['setBattler'],Sprite_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x629)]=function(_0x344ab3){const _0x37f49a=_0x421ee0;VisuMZ[_0x37f49a(0x674)]['Sprite_Actor_setBattler'][_0x37f49a(0x8eb)](this,_0x344ab3),this[_0x37f49a(0x44a)](_0x344ab3);},Sprite_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x44a)]=function(_0x3af1dc){const _0x1c10ab=_0x421ee0;if(!_0x3af1dc)return;if(!this[_0x1c10ab(0x6d5)])return;this[_0x1c10ab(0x6d5)][_0x1c10ab(0x5d1)]['x']=this[_0x1c10ab(0x530)][_0x1c10ab(0x8de)](),this[_0x1c10ab(0x6d5)][_0x1c10ab(0x5d1)]['y']=this[_0x1c10ab(0x530)][_0x1c10ab(0x8bf)](),this['updateShadowVisibility']();},VisuMZ[_0x421ee0(0x674)]['Sprite_Actor_update']=Sprite_Actor[_0x421ee0(0x2cb)]['update'],Sprite_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x53e)]=function(){const _0x3a112a=_0x421ee0;VisuMZ[_0x3a112a(0x674)][_0x3a112a(0x86e)][_0x3a112a(0x8eb)](this),this[_0x3a112a(0x530)]&&(this[_0x3a112a(0x24f)](),this['updateStyleOpacity']());},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x24a)]=Sprite_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x6c4)],Sprite_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x6c4)]=function(){const _0x1c5293=_0x421ee0;VisuMZ[_0x1c5293(0x674)][_0x1c5293(0x24a)][_0x1c5293(0x8eb)](this),this[_0x1c5293(0x6d5)]&&this[_0x1c5293(0x6d5)]['bitmap']&&this['_battler']&&(this[_0x1c5293(0x6d5)][_0x1c5293(0x82a)][_0x1c5293(0x631)]!==this['_battler'][_0x1c5293(0x49b)]()&&(this[_0x1c5293(0x6d5)]['bitmap'][_0x1c5293(0x631)]=this[_0x1c5293(0x4c7)]['battlerSmoothImage']()));},VisuMZ['BattleCore'][_0x421ee0(0x6dd)]=Sprite_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x8b9)],Sprite_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x8b9)]=function(){const _0x54a04a=_0x421ee0;VisuMZ[_0x54a04a(0x674)]['Sprite_Actor_updateShadow'][_0x54a04a(0x8eb)](this),this[_0x54a04a(0x195)]();},Sprite_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x195)]=function(){const _0x469c00=_0x421ee0;if(!this[_0x469c00(0x6d5)])return;if(!this[_0x469c00(0x523)])return;this[_0x469c00(0x175)](),this['updateShadowPosition']();},Sprite_Actor['prototype'][_0x421ee0(0x24f)]=function(){const _0x44fa65=_0x421ee0;this[_0x44fa65(0x5cb)][_0x44fa65(0x2b7)]['x']=0x1/(this[_0x44fa65(0x2b7)]['x']||0.001),this[_0x44fa65(0x5cb)]['scale']['y']=0x1/(this['scale']['y']||0.001);},Sprite_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x3bc)]=function(){const _0x281704=_0x421ee0;if(!$gameSystem['isSideView']()&&this[_0x281704(0x51e)]===Sprite_Actor){const _0x587fc2=Scene_Battle['prototype'][_0x281704(0x885)]();['default',_0x281704(0x5c1),_0x281704(0x332),_0x281704(0x633)][_0x281704(0x7f2)](_0x587fc2)&&(this[_0x281704(0x3d5)]=0x0);}},Sprite_Actor['prototype'][_0x421ee0(0x763)]=function(){const _0x5d9561=_0x421ee0,_0x58bdda=this[_0x5d9561(0x530)];if(_0x58bdda){const _0x213ae8=_0x58bdda['stateMotionIndex']();if(_0x58bdda[_0x5d9561(0x579)]()||_0x58bdda[_0x5d9561(0x905)]())this[_0x5d9561(0x1c3)](_0x5d9561(0x82f));else{if(_0x213ae8===0x3)this['startMotion'](_0x5d9561(0x724));else{if(_0x213ae8===0x2)this[_0x5d9561(0x1c3)](_0x5d9561(0x325));else{if(this[_0x5d9561(0x46e)])this[_0x5d9561(0x1c3)]('escape');else{if(_0x58bdda['isCharging']())this['startMotion'](_0x5d9561(0x186));else{if(_0x58bdda[_0x5d9561(0x517)]())this[_0x5d9561(0x1c3)]('chant');else{if(_0x58bdda[_0x5d9561(0x45c)]()||_0x58bdda[_0x5d9561(0x628)]())this[_0x5d9561(0x1c3)](_0x5d9561(0x7f3));else{if(_0x213ae8===0x1)this[_0x5d9561(0x1c3)]('abnormal');else{if(_0x58bdda[_0x5d9561(0x215)]())this[_0x5d9561(0x1c3)](_0x5d9561(0x1f9));else{if(_0x58bdda[_0x5d9561(0x61f)]())this[_0x5d9561(0x1c3)](_0x5d9561(0x82f));else _0x58bdda[_0x5d9561(0x880)]()?this[_0x5d9561(0x1c3)](_0x5d9561(0x186)):this[_0x5d9561(0x1c3)](_0x5d9561(0x82f));}}}}}}}}}}},Sprite_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x784)]=function(){const _0x3b9526=_0x421ee0,_0xa00f98=0xa,_0x1b8926=0x12c*_0xa00f98,_0x2019cb=0x1e*_0xa00f98;this[_0x3b9526(0x8c3)](_0x1b8926,0x0,_0x2019cb);},Sprite_Actor[_0x421ee0(0x2cb)]['onMoveEnd']=function(){const _0x14091a=_0x421ee0;Sprite_Battler[_0x14091a(0x2cb)]['onMoveEnd']['call'](this);},Sprite_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x625)]=function(){const _0x2d7785=_0x421ee0;return Sprite_Battler[_0x2d7785(0x1d1)];},Sprite_Weapon['prototype'][_0x421ee0(0x816)]=function(){const _0x807f19=_0x421ee0;return Sprite_Battler[_0x807f19(0x1d1)];},Sprite_Actor['prototype'][_0x421ee0(0x519)]=function(){},Sprite_Actor[_0x421ee0(0x2cb)]['setupWeaponAnimation']=function(){},Sprite_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x4f6)]=function(){const _0x4eb9ae=_0x421ee0;if(this[_0x4eb9ae(0x7e4)]&&++this[_0x4eb9ae(0x4af)]>=this[_0x4eb9ae(0x625)]()){if(this[_0x4eb9ae(0x7e4)][_0x4eb9ae(0x88f)])this[_0x4eb9ae(0x783)]=(this['_pattern']+0x1)%0x4;else this['_pattern']<0x2?this[_0x4eb9ae(0x783)]++:this[_0x4eb9ae(0x763)]();this[_0x4eb9ae(0x4af)]=0x0;}},Sprite_Actor[_0x421ee0(0x2cb)]['forceMotion']=function(_0x40f3c4){const _0x44ed0a=_0x421ee0;if(_0x40f3c4==='victory')this[_0x44ed0a(0x5bb)]=!![];if(this[_0x44ed0a(0x4c7)]&&this['_battler'][_0x44ed0a(0x2ac)]()){this[_0x44ed0a(0x7e4)]=Sprite_Actor[_0x44ed0a(0x569)][_0x44ed0a(0x724)];return;}const _0x4ee0c8=Sprite_Actor[_0x44ed0a(0x569)][_0x40f3c4];this['_motion']=_0x4ee0c8,this[_0x44ed0a(0x4af)]=0x0,this[_0x44ed0a(0x783)]=0x0;},Sprite_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x301)]=function(_0x292858){const _0x3ee252=_0x421ee0;this['adjustWeaponSpriteOffset'](),this['_weaponSprite'][_0x3ee252(0x578)](_0x292858),this['_actor']['clearWeaponAnimation']();},Sprite_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x747)]=function(){const _0x3dbaef=_0x421ee0;let _0x5d7f13=-0x10,_0xa41a9c=this[_0x3dbaef(0x6b2)]*0.5;const _0x4113e4=/<SIDEVIEW WEAPON OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i,_0x2ecf64=this[_0x3dbaef(0x4c7)][_0x3dbaef(0x2e0)]()[_0x3dbaef(0x1b6)](_0x7a8eee=>_0x7a8eee&&_0x7a8eee['note'][_0x3dbaef(0x5f2)](_0x4113e4)?Number(RegExp['$1']):0x0),_0xba8140=this[_0x3dbaef(0x4c7)][_0x3dbaef(0x2e0)]()[_0x3dbaef(0x1b6)](_0x1a4893=>_0x1a4893&&_0x1a4893[_0x3dbaef(0x24c)][_0x3dbaef(0x5f2)](_0x4113e4)?Number(RegExp['$2']):0x0);_0x5d7f13=_0x2ecf64['reduce']((_0x501ea1,_0x5d59be)=>_0x501ea1+_0x5d59be,_0x5d7f13),_0xa41a9c=_0xba8140['reduce']((_0x513aa0,_0x425faf)=>_0x513aa0+_0x425faf,_0xa41a9c),this[_0x3dbaef(0x4a2)]['x']=_0x5d7f13,this[_0x3dbaef(0x4a2)]['y']=_0xa41a9c,this[_0x3dbaef(0x4a2)][_0x3dbaef(0x53e)]();},Sprite_Weapon[_0x421ee0(0x2cb)][_0x421ee0(0x578)]=function(_0x10ea25){const _0x2f77b9=_0x421ee0;this['_weaponImageId']=_0x10ea25,this[_0x2f77b9(0x708)]=-0x1,this[_0x2f77b9(0x783)]=0x0,this['loadBitmap'](),this[_0x2f77b9(0x77c)]();},Sprite_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x912)]=function(){},Sprite_Actor['prototype'][_0x421ee0(0x64d)]=function(){const _0x2a97b0=_0x421ee0,_0x20e152=VisuMZ[_0x2a97b0(0x674)]['Settings'][_0x2a97b0(0x16d)],_0x139279=_0x20e152[_0x2a97b0(0x703)],_0xc89fbe=_0x20e152[_0x2a97b0(0x716)],_0x4663ff=_0x20e152[_0x2a97b0(0x872)];this[_0x2a97b0(0x8c3)](-_0x139279,-_0xc89fbe,_0x4663ff);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x19b)]=Sprite_Actor['prototype'][_0x421ee0(0x77c)],Sprite_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x77c)]=function(){const _0x357a60=_0x421ee0;this['applyFreezeMotionFrames'](),VisuMZ[_0x357a60(0x674)][_0x357a60(0x19b)][_0x357a60(0x8eb)](this);},Sprite_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x66b)]=function(){const _0x48e9c9=_0x421ee0;if(this[_0x48e9c9(0x4c7)]&&this[_0x48e9c9(0x4c7)][_0x48e9c9(0x799)]){const _0xeb88ee=this[_0x48e9c9(0x4c7)][_0x48e9c9(0x799)];this[_0x48e9c9(0x7e4)]=Sprite_Actor[_0x48e9c9(0x569)][_0xeb88ee['motionType']],this[_0x48e9c9(0x783)]=_0xeb88ee[_0x48e9c9(0x6bd)];const _0x51bc26=this[_0x48e9c9(0x4a2)];_0x51bc26[_0x48e9c9(0x366)](_0xeb88ee['weaponImageId'],_0xeb88ee[_0x48e9c9(0x6bd)]),this[_0x48e9c9(0x747)]();}},Sprite_Weapon[_0x421ee0(0x2cb)][_0x421ee0(0x366)]=function(_0x17a8ec,_0x448dba){const _0xc46296=_0x421ee0;this[_0xc46296(0x830)]=_0x17a8ec,this['_animationCount']=-Infinity,this['_pattern']=_0x448dba,this['loadBitmap'](),this[_0xc46296(0x77c)]();},Sprite_Enemy['prototype'][_0x421ee0(0x3a7)]=function(){const _0x1885ae=_0x421ee0;Sprite_Battler['prototype'][_0x1885ae(0x3a7)][_0x1885ae(0x8eb)](this),this['_enemy']=null,this[_0x1885ae(0x5ba)]=![],this[_0x1885ae(0x8f3)]='',this[_0x1885ae(0x1b8)]=0x0,this['_effectType']=null,this[_0x1885ae(0x804)]=0x0,this[_0x1885ae(0x7f6)]=0x0,this[_0x1885ae(0x5b2)](),this[_0x1885ae(0x2dd)]();},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x556)]=Sprite_Enemy[_0x421ee0(0x2cb)]['update'],Sprite_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x53e)]=function(){const _0x814291=_0x421ee0;VisuMZ[_0x814291(0x674)][_0x814291(0x556)][_0x814291(0x8eb)](this),this[_0x814291(0x175)]();},Sprite_Enemy['prototype']['createMainSprite']=function(){const _0x3968be=_0x421ee0;this[_0x3968be(0x6d5)]=new Sprite(),this[_0x3968be(0x6d5)][_0x3968be(0x5d1)]['x']=0.5,this[_0x3968be(0x6d5)]['anchor']['y']=0x1,this[_0x3968be(0x658)](this[_0x3968be(0x6d5)]),this[_0x3968be(0x2e6)]();},Sprite_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x8d5)]=function(){const _0x2baa1b=_0x421ee0;return this['_distortionSprite']||this[_0x2baa1b(0x6d5)]||this;},Sprite_Enemy[_0x421ee0(0x2cb)]['loadBitmap']=function(_0xc5a1fb){const _0x8df447=_0x421ee0;this[_0x8df447(0x82a)]=new Bitmap(0x1,0x1),$gameSystem[_0x8df447(0x649)]()?this[_0x8df447(0x6d5)][_0x8df447(0x82a)]=ImageManager['loadSvEnemy'](_0xc5a1fb):this['_mainSprite']['bitmap']=ImageManager[_0x8df447(0x70e)](_0xc5a1fb),this[_0x8df447(0x6d5)][_0x8df447(0x82a)][_0x8df447(0x6ae)](this['createEmptyBitmap']['bind'](this));},Sprite_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x736)]=function(){const _0x2d62d5=_0x421ee0,_0x39ce0a=this[_0x2d62d5(0x6d5)][_0x2d62d5(0x82a)];_0x39ce0a&&(this[_0x2d62d5(0x82a)]=new Bitmap(_0x39ce0a[_0x2d62d5(0x62f)],_0x39ce0a[_0x2d62d5(0x6b2)]));},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x34e)]=Sprite_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x550)],Sprite_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x550)]=function(_0x24276d){const _0x2bee85=_0x421ee0;this[_0x2bee85(0x6d5)]&&this['_mainSprite'][_0x2bee85(0x550)](_0x24276d);},VisuMZ['BattleCore'][_0x421ee0(0x897)]=Sprite_Enemy['prototype'][_0x421ee0(0x58c)],Sprite_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x58c)]=function(){const _0x220993=_0x421ee0;this[_0x220993(0x227)]()?VisuMZ['BattleCore'][_0x220993(0x897)]['call'](this):(this[_0x220993(0x5ba)]=!this[_0x220993(0x28f)]['isHidden'](),!this[_0x220993(0x5ba)]&&(this[_0x220993(0x3d5)]=0x0));},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x62e)]=Sprite_Enemy['prototype'][_0x421ee0(0x3ce)],Sprite_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x3ce)]=function(){const _0x2cddb6=_0x421ee0;if(this[_0x2cddb6(0x227)]())VisuMZ['BattleCore'][_0x2cddb6(0x62e)][_0x2cddb6(0x8eb)](this);},Sprite_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x77c)]=function(){const _0x2a96d3=_0x421ee0;Sprite_Battler[_0x2a96d3(0x2cb)]['updateFrame'][_0x2a96d3(0x8eb)](this);const _0x403278=this[_0x2a96d3(0x8d5)]()||this;if(!_0x403278)return;!_0x403278[_0x2a96d3(0x82a)]&&(_0x403278[_0x2a96d3(0x82a)]=new Bitmap(this[_0x2a96d3(0x62f)],this[_0x2a96d3(0x6b2)])),this['_effectType']==='bossCollapse'?this[_0x2a96d3(0x6d5)]['setFrame'](0x0,0x0,this['_mainSprite'][_0x2a96d3(0x62f)],this[_0x2a96d3(0x804)]):_0x403278[_0x2a96d3(0x350)](0x0,0x0,_0x403278[_0x2a96d3(0x82a)]['width'],this[_0x2a96d3(0x82a)]['height']);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x2f0)]=Sprite_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x343)],Sprite_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x343)]=function(){const _0x399e2b=_0x421ee0;if(this[_0x399e2b(0x227)]())VisuMZ[_0x399e2b(0x674)][_0x399e2b(0x2f0)][_0x399e2b(0x8eb)](this);},Sprite_Enemy['prototype'][_0x421ee0(0x918)]=function(){const _0x545f18=_0x421ee0;return Sprite_Battler[_0x545f18(0x2cb)][_0x545f18(0x918)][_0x545f18(0x8eb)](this);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x4cb)]=Sprite_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x24f)],Sprite_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x24f)]=function(){const _0x213d95=_0x421ee0;VisuMZ[_0x213d95(0x674)][_0x213d95(0x4cb)][_0x213d95(0x8eb)](this),this[_0x213d95(0x352)]();},Sprite_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x352)]=function(){const _0xd6ebbf=_0x421ee0;if(VisuMZ[_0xd6ebbf(0x674)][_0xd6ebbf(0x57b)][_0xd6ebbf(0x2d2)][_0xd6ebbf(0x496)]){this['_stateIconSprite']['opacity']=0x0;return;}this[_0xd6ebbf(0x53a)]['x']=0x0,this['_stateIconSprite']['x']+=this[_0xd6ebbf(0x4c7)][_0xd6ebbf(0x5af)](),this[_0xd6ebbf(0x53a)]['y']=-this[_0xd6ebbf(0x82a)]['height']-this[_0xd6ebbf(0x53a)][_0xd6ebbf(0x6b2)],this[_0xd6ebbf(0x53a)]['y']+=this[_0xd6ebbf(0x4c7)][_0xd6ebbf(0x1b5)](),this[_0xd6ebbf(0x53a)]['scale']['x']=0x1/(this[_0xd6ebbf(0x2b7)]['x']||0.001),this['_stateIconSprite'][_0xd6ebbf(0x2b7)]['y']=0x1/(this[_0xd6ebbf(0x2b7)]['y']||0.001),this[_0xd6ebbf(0x3fd)]()&&(this['_svBattlerSprite'][_0xd6ebbf(0x5cb)][_0xd6ebbf(0x2b7)]['x']=-0x1/(this[_0xd6ebbf(0x2b7)]['x']||0.001),this[_0xd6ebbf(0x841)]['_stateSprite'][_0xd6ebbf(0x2b7)]['y']=0x1/(this[_0xd6ebbf(0x2b7)]['y']||0.001));},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x8bc)]=Sprite_Enemy['prototype'][_0x421ee0(0x629)],Sprite_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x629)]=function(_0x53c6df){const _0x35ce8c=_0x421ee0;VisuMZ[_0x35ce8c(0x674)]['Sprite_Enemy_setBattler'][_0x35ce8c(0x8eb)](this,_0x53c6df),this[_0x35ce8c(0x63c)](_0x53c6df);},Sprite_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x63c)]=function(_0x5c51fb){const _0x31e336=_0x421ee0;!this['_svBattlerSprite']&&(this[_0x31e336(0x841)]=new Sprite_SvEnemy(_0x5c51fb),this['attachSpritesToDistortionSprite']()),this[_0x31e336(0x841)]['setBattler'](_0x5c51fb);},Sprite_Enemy[_0x421ee0(0x2cb)]['hasSvBattler']=function(){const _0x9ddeba=_0x421ee0;return this[_0x9ddeba(0x28f)]&&this['_enemy'][_0x9ddeba(0x3fd)]();},VisuMZ[_0x421ee0(0x674)]['Sprite_Enemy_loadBitmap']=Sprite_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x6fe)],Sprite_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x6fe)]=function(_0x20f5b1){const _0xd9003b=_0x421ee0;if(this[_0xd9003b(0x3fd)]()){const _0x4391c2=this[_0xd9003b(0x28f)][_0xd9003b(0x620)]();this[_0xd9003b(0x82a)]=new Bitmap(_0x4391c2[_0xd9003b(0x62f)],_0x4391c2[_0xd9003b(0x6b2)]);}else VisuMZ[_0xd9003b(0x674)]['Sprite_Enemy_loadBitmap'][_0xd9003b(0x8eb)](this,_0x20f5b1);},Sprite_Enemy[_0x421ee0(0x2cb)]['allowCollapse']=function(){const _0x483e98=_0x421ee0;return this['hasSvBattler']()?this[_0x483e98(0x28f)]['allowCollapse']():!![];},Sprite_Enemy['prototype'][_0x421ee0(0x763)]=function(){const _0x2db763=_0x421ee0;this[_0x2db763(0x3fd)]()&&this['_svBattlerSprite'][_0x2db763(0x763)]();},Sprite_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x3c8)]=function(_0x3bbc0b){const _0x211173=_0x421ee0;if(this[_0x211173(0x3fd)]())this[_0x211173(0x841)][_0x211173(0x3c8)](_0x3bbc0b);},Sprite_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x301)]=function(_0x45f851){const _0x3097b7=_0x421ee0;if(this[_0x3097b7(0x3fd)]())this[_0x3097b7(0x841)][_0x3097b7(0x301)](_0x45f851);},Sprite_Enemy[_0x421ee0(0x2cb)][_0x421ee0(0x64d)]=function(){const _0x108ace=_0x421ee0,_0x5cf76e=VisuMZ[_0x108ace(0x674)]['Settings'][_0x108ace(0x16d)],_0x5e1123=_0x5cf76e[_0x108ace(0x703)],_0x414919=_0x5cf76e[_0x108ace(0x716)],_0x479acf=_0x5cf76e['StepDuration'];this[_0x108ace(0x8c3)](_0x5e1123,_0x414919,_0x479acf);};function Sprite_SvEnemy(){this['initialize'](...arguments);}Sprite_SvEnemy[_0x421ee0(0x2cb)]=Object[_0x421ee0(0x7b1)](Sprite_Actor['prototype']),Sprite_SvEnemy[_0x421ee0(0x2cb)][_0x421ee0(0x51e)]=Sprite_SvEnemy,Sprite_SvEnemy[_0x421ee0(0x2cb)][_0x421ee0(0x792)]=function(_0x4d72a8){const _0x502be3=_0x421ee0;Sprite_Actor[_0x502be3(0x2cb)][_0x502be3(0x792)][_0x502be3(0x8eb)](this,_0x4d72a8),this[_0x502be3(0x2b7)]['x']=-0x1,this[_0x502be3(0x5cb)]['scale']['x']=-0x1;},Sprite_SvEnemy[_0x421ee0(0x2cb)][_0x421ee0(0x52d)]=function(){},Sprite_SvEnemy['prototype']['moveToStartPosition']=function(){},Sprite_SvEnemy[_0x421ee0(0x2cb)][_0x421ee0(0x6b1)]=function(_0x41139b){},Sprite_SvEnemy['prototype']['updateShadow']=function(){},Sprite_SvEnemy['prototype'][_0x421ee0(0x251)]=function(){},Sprite_SvEnemy[_0x421ee0(0x2cb)][_0x421ee0(0x24f)]=function(){const _0x2115f7=_0x421ee0;this['_stateSprite'][_0x2115f7(0x3b9)]=![];},Sprite_SvEnemy[_0x421ee0(0x2cb)][_0x421ee0(0x6c4)]=function(){const _0x37f7f8=_0x421ee0;Sprite_Battler[_0x37f7f8(0x2cb)][_0x37f7f8(0x6c4)][_0x37f7f8(0x8eb)](this);const _0x16ea8e=this[_0x37f7f8(0x530)][_0x37f7f8(0x7ea)]();this[_0x37f7f8(0x8f3)]!==_0x16ea8e&&(this['_battlerName']=_0x16ea8e,this[_0x37f7f8(0x6d5)][_0x37f7f8(0x82a)]=ImageManager[_0x37f7f8(0x82d)](_0x16ea8e)),this[_0x37f7f8(0x6d5)]&&this[_0x37f7f8(0x6d5)][_0x37f7f8(0x82a)]&&this[_0x37f7f8(0x4c7)]&&(this['_mainSprite']['bitmap']['smooth']!==this['_battler'][_0x37f7f8(0x49b)]()&&(this[_0x37f7f8(0x6d5)][_0x37f7f8(0x82a)][_0x37f7f8(0x631)]=this[_0x37f7f8(0x4c7)]['battlerSmoothImage']()));},Sprite_SvEnemy['prototype']['retreat']=function(){},Sprite_SvEnemy[_0x421ee0(0x2cb)]['startMove']=function(_0x28fe9e,_0x13729a,_0x2bdd32){const _0x16ef8f=_0x421ee0;if(this[_0x16ef8f(0x6df)])this[_0x16ef8f(0x6df)][_0x16ef8f(0x8c3)](_0x28fe9e,_0x13729a,_0x2bdd32);},Sprite_SvEnemy[_0x421ee0(0x2cb)]['refreshMotion']=function(){const _0x437c80=_0x421ee0,_0x521c2b=this[_0x437c80(0x530)];if(_0x521c2b){const _0x13ab54=_0x521c2b[_0x437c80(0x2c4)]();if(_0x521c2b[_0x437c80(0x579)]()||_0x521c2b['isActing']())this[_0x437c80(0x1c3)](_0x437c80(0x82f));else{if(_0x13ab54===0x3)this[_0x437c80(0x1c3)]('dead');else{if(_0x13ab54===0x2)this[_0x437c80(0x1c3)]('sleep');else{if(_0x521c2b['isChanting']())this[_0x437c80(0x1c3)](_0x437c80(0x494));else{if(_0x521c2b[_0x437c80(0x45c)]()||_0x521c2b[_0x437c80(0x628)]())this[_0x437c80(0x1c3)]('guard');else{if(_0x13ab54===0x1)this['startMotion'](_0x437c80(0x72d));else{if(_0x521c2b[_0x437c80(0x215)]())this[_0x437c80(0x1c3)](_0x437c80(0x1f9));else _0x521c2b[_0x437c80(0x61f)]()?this[_0x437c80(0x1c3)]('walk'):this[_0x437c80(0x1c3)](_0x521c2b[_0x437c80(0x620)]()[_0x437c80(0x6cc)]||_0x437c80(0x82f));}}}}}}}},Sprite_SvEnemy[_0x421ee0(0x2cb)]['inHomePosition']=function(){const _0x5b41a8=_0x421ee0;return this[_0x5b41a8(0x6df)]?this[_0x5b41a8(0x6df)][_0x5b41a8(0x3f5)]===0x0&&this[_0x5b41a8(0x6df)][_0x5b41a8(0x2ca)]===0x0:!![];},Sprite_SvEnemy[_0x421ee0(0x2cb)]['updateFlip']=function(){},Sprite_Damage[_0x421ee0(0x2cb)]['setupBattleCore']=function(_0xa174ee){const _0x278be2=_0x421ee0,_0x35e39d=_0xa174ee['getNextDamagePopup']()||_0xa174ee[_0x278be2(0x895)]();if(_0x35e39d['missed']||_0x35e39d[_0x278be2(0x657)])this[_0x278be2(0x222)]=0x0,this[_0x278be2(0x2c6)]();else{if(_0x35e39d[_0x278be2(0x265)])this[_0x278be2(0x222)]=_0x35e39d[_0x278be2(0x46a)]>=0x0?0x0:0x1,this['createDigits'](_0x35e39d[_0x278be2(0x46a)]);else _0xa174ee['isAlive']()&&_0x35e39d[_0x278be2(0x2ec)]!==0x0&&(this['_colorType']=_0x35e39d['mpDamage']>=0x0?0x2:0x3,this[_0x278be2(0x16c)](_0x35e39d[_0x278be2(0x2ec)]));}_0x35e39d['critical']&&this[_0x278be2(0x4f5)]();},Sprite_Damage[_0x421ee0(0x2cb)][_0x421ee0(0x578)]=function(_0x35517a){},Sprite_Damage[_0x421ee0(0x2cb)][_0x421ee0(0x16c)]=function(_0x2459f5){const _0x2276cc=_0x421ee0;let _0x395221=this[_0x2276cc(0x33f)](_0x2459f5);const _0x2705c7=this['fontSize'](),_0x2024de=Math[_0x2276cc(0x860)](_0x2705c7*0.75);for(let _0x307923=0x0;_0x307923<_0x395221[_0x2276cc(0x4be)];_0x307923++){const _0x191e6e=this[_0x2276cc(0x6ed)](_0x2024de,_0x2705c7);_0x191e6e[_0x2276cc(0x82a)][_0x2276cc(0x87c)](_0x395221[_0x307923],0x0,0x0,_0x2024de,_0x2705c7,_0x2276cc(0x3bd)),_0x191e6e['x']=(_0x307923-(_0x395221[_0x2276cc(0x4be)]-0x1)/0x2)*_0x2024de,_0x191e6e['dy']=-_0x307923;}},Sprite_Damage[_0x421ee0(0x2cb)][_0x421ee0(0x33f)]=function(_0x32797a){const _0x291adf=_0x421ee0;let _0x5a69e0=Math[_0x291adf(0x8f2)](_0x32797a)[_0x291adf(0x193)]();this['useDigitGrouping']()&&(_0x5a69e0=VisuMZ['GroupDigits'](_0x5a69e0));const _0x5382d1=VisuMZ[_0x291adf(0x674)][_0x291adf(0x57b)][_0x291adf(0x60c)];let _0x604985='',_0x46ec25='';switch(this[_0x291adf(0x222)]){case 0x0:_0x604985=_0x5382d1[_0x291adf(0x3e7)]||_0x291adf(0x5e6),_0x46ec25=TextManager['hp'];if(_0x32797a===0x0)_0x604985='%1';break;case 0x1:_0x604985=_0x5382d1[_0x291adf(0x842)]||_0x291adf(0x3c7),_0x46ec25=TextManager['hp'];break;case 0x2:_0x604985=_0x5382d1['mpDamageFmt']||_0x291adf(0x5ee),_0x46ec25=TextManager['mp'];break;case 0x3:_0x604985=_0x5382d1[_0x291adf(0x5f9)]||_0x291adf(0x55c),_0x46ec25=TextManager['mp'];break;}return _0x604985[_0x291adf(0x7d7)](_0x5a69e0,_0x46ec25)[_0x291adf(0x90d)]();},Sprite_Damage[_0x421ee0(0x2cb)][_0x421ee0(0x74c)]=function(){const _0x118065=_0x421ee0;return Imported[_0x118065(0x588)]?VisuMZ[_0x118065(0x871)][_0x118065(0x57b)][_0x118065(0x80f)][_0x118065(0x5a5)]:![];},Sprite_Damage[_0x421ee0(0x2cb)][_0x421ee0(0x4f5)]=function(){const _0x391935=_0x421ee0,_0x5083bc=VisuMZ[_0x391935(0x674)][_0x391935(0x57b)]['Damage'];this[_0x391935(0x904)]=_0x5083bc[_0x391935(0x810)][_0x391935(0x67a)](0x0),this[_0x391935(0x8e1)]=_0x5083bc['CriticalDuration'];},Sprite_Damage[_0x421ee0(0x2cb)][_0x421ee0(0x3ae)]=function(_0x5b28ea,_0x1596c2){const _0x7b3fcd=_0x421ee0;this[_0x7b3fcd(0x904)]=_0x1596c2['flashColor']||[0x0,0x0,0x0,0x0],this[_0x7b3fcd(0x904)]=JsonEx[_0x7b3fcd(0x4ed)](this[_0x7b3fcd(0x904)]),this[_0x7b3fcd(0x8e1)]=_0x1596c2[_0x7b3fcd(0x27e)]||0x0;const _0x59d053=this[_0x7b3fcd(0x551)](),_0x4ed677=Math[_0x7b3fcd(0x860)](_0x59d053*0x1e),_0x19d1de=this[_0x7b3fcd(0x6ed)](_0x4ed677,_0x59d053);_0x19d1de[_0x7b3fcd(0x82a)][_0x7b3fcd(0x1e6)]=ColorManager[_0x7b3fcd(0x172)](_0x1596c2[_0x7b3fcd(0x1e6)]),_0x19d1de[_0x7b3fcd(0x82a)]['drawText'](_0x5b28ea,0x0,0x0,_0x4ed677,_0x59d053,_0x7b3fcd(0x3bd)),_0x19d1de['dy']=0x0;},Sprite_Damage[_0x421ee0(0x2cb)][_0x421ee0(0x185)]=function(_0x5ef6cf,_0x83bfcb,_0x27ad05){const _0x5c298e=_0x421ee0,_0x5c1bce=Math[_0x5c298e(0x8aa)](this['fontSize'](),ImageManager[_0x5c298e(0x3c0)]),_0x53f611=Math[_0x5c298e(0x860)](_0x5c1bce*0x1e),_0x1205ca=this['createChildSprite'](_0x53f611,_0x5c1bce),_0x2e4adc=ImageManager[_0x5c298e(0x28c)]/0x2,_0x384414=_0x1205ca['bitmap'][_0x5c298e(0x6a0)](_0x83bfcb+'\x20');_0x1205ca['bitmap'][_0x5c298e(0x1e6)]=ColorManager['getColor'](_0x27ad05['textColor']),_0x1205ca[_0x5c298e(0x82a)]['drawText'](_0x83bfcb,_0x2e4adc,0x0,_0x53f611-_0x2e4adc,_0x5c1bce,_0x5c298e(0x3bd));const _0x47f526=Math[_0x5c298e(0x38a)]((_0x5c1bce-ImageManager['iconHeight'])/0x2),_0x190aa0=_0x53f611/0x2-ImageManager['iconWidth']-_0x384414/0x2+_0x2e4adc/0x2,_0x1ddefe=ImageManager[_0x5c298e(0x932)](_0x5c298e(0x66a)),_0x55a4be=ImageManager[_0x5c298e(0x28c)],_0x50dafe=ImageManager['iconHeight'],_0x52bae0=_0x5ef6cf%0x10*_0x55a4be,_0x3bd738=Math[_0x5c298e(0x860)](_0x5ef6cf/0x10)*_0x50dafe;_0x1205ca['bitmap']['blt'](_0x1ddefe,_0x52bae0,_0x3bd738,_0x55a4be,_0x50dafe,_0x190aa0,_0x47f526),this[_0x5c298e(0x904)]=_0x27ad05[_0x5c298e(0x78e)]||[0x0,0x0,0x0,0x0],this[_0x5c298e(0x904)]=JsonEx['makeDeepCopy'](this[_0x5c298e(0x904)]),this['_flashDuration']=_0x27ad05['flashDuration']||0x0,_0x1205ca['dy']=0x0;},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x39c)]=Sprite_StateIcon[_0x421ee0(0x2cb)]['updateFrame'],Sprite_StateIcon[_0x421ee0(0x2cb)][_0x421ee0(0x77c)]=function(){const _0xa05ec=_0x421ee0;VisuMZ['BattleCore'][_0xa05ec(0x39c)][_0xa05ec(0x8eb)](this),this[_0xa05ec(0x3b9)]=this[_0xa05ec(0x3b4)]>0x0?!![]:![];},VisuMZ[_0x421ee0(0x674)]['Sprite_Weapon_loadBitmap']=Sprite_Weapon[_0x421ee0(0x2cb)]['loadBitmap'],Sprite_Weapon[_0x421ee0(0x2cb)]['loadBitmap']=function(){const _0x36e7b7=_0x421ee0;VisuMZ[_0x36e7b7(0x674)]['Sprite_Weapon_loadBitmap']['call'](this),this[_0x36e7b7(0x82a)]&&(this[_0x36e7b7(0x82a)][_0x36e7b7(0x631)]=VisuMZ[_0x36e7b7(0x674)][_0x36e7b7(0x57b)][_0x36e7b7(0x92b)]['SmoothImage']);};function Sprite_HpGauge(){this['initialize'](...arguments);}Sprite_HpGauge['prototype']=Object['create'](Sprite_Gauge['prototype']),Sprite_HpGauge[_0x421ee0(0x2cb)]['constructor']=Sprite_HpGauge,Sprite_HpGauge[_0x421ee0(0x2cb)][_0x421ee0(0x792)]=function(){const _0x1143c9=_0x421ee0;Sprite_Gauge['prototype']['initialize'][_0x1143c9(0x8eb)](this);},Sprite_HpGauge['prototype'][_0x421ee0(0x444)]=function(){return 0x0;},Sprite_HpGauge[_0x421ee0(0x2cb)][_0x421ee0(0x902)]=function(){const _0x57517b=_0x421ee0;this['bitmap'][_0x57517b(0x564)]();const _0x4e2a1f=this[_0x57517b(0x754)]();!isNaN(_0x4e2a1f)&&this[_0x57517b(0x670)]();};function Sprite_EnemyName(){const _0x3e9274=_0x421ee0;this[_0x3e9274(0x792)](...arguments);}Sprite_EnemyName[_0x421ee0(0x2cb)]=Object[_0x421ee0(0x7b1)](Sprite_Name[_0x421ee0(0x2cb)]),Sprite_EnemyName[_0x421ee0(0x2cb)][_0x421ee0(0x51e)]=Sprite_EnemyName,Sprite_EnemyName[_0x421ee0(0x2cb)]['initialize']=function(){const _0xc9d187=_0x421ee0;Sprite_Name['prototype']['initialize'][_0xc9d187(0x8eb)](this),this[_0xc9d187(0x616)]();},Sprite_EnemyName['prototype']['initMembers']=function(){const _0x3d65fc=_0x421ee0;Sprite_Name[_0x3d65fc(0x2cb)]['initMembers'][_0x3d65fc(0x8eb)](this),this[_0x3d65fc(0x3d5)]=0x0,this[_0x3d65fc(0x684)]=null,this['anchor']['x']=0.5,this[_0x3d65fc(0x5d1)]['y']=0x0;},Sprite_EnemyName[_0x421ee0(0x2cb)][_0x421ee0(0x616)]=function(){const _0x3a036c=_0x421ee0;VisuMZ[_0x3a036c(0x674)]['Settings'][_0x3a036c(0x2d2)][_0x3a036c(0x496)]&&(this[_0x3a036c(0x53a)]=new Sprite_StateIcon(),this[_0x3a036c(0x658)](this[_0x3a036c(0x53a)]));},Sprite_EnemyName[_0x421ee0(0x2cb)][_0x421ee0(0x2cc)]=function(){const _0x49cd3b=_0x421ee0;return Graphics[_0x49cd3b(0x733)];},Sprite_EnemyName['prototype'][_0x421ee0(0x68e)]=function(){const _0x5ae2db=_0x421ee0;return this[_0x5ae2db(0x5ca)]=this[_0x5ae2db(0x5ca)]||Window_Base[_0x5ae2db(0x2cb)][_0x5ae2db(0x36e)]()||0x24,this[_0x5ae2db(0x5ca)]*0x4;},Sprite_EnemyName[_0x421ee0(0x2cb)]['fontSize']=function(){const _0x2ee871=_0x421ee0;return VisuMZ[_0x2ee871(0x674)][_0x2ee871(0x57b)][_0x2ee871(0x2d2)][_0x2ee871(0x18c)]||$gameSystem[_0x2ee871(0x2df)]();},Sprite_EnemyName['prototype'][_0x421ee0(0x1d2)]=function(_0x5894f8){const _0x47b7c9=_0x421ee0;this[_0x47b7c9(0x684)]=_0x5894f8;},Sprite_EnemyName[_0x421ee0(0x2cb)]['update']=function(){const _0x3c310d=_0x421ee0;Sprite_Name[_0x3c310d(0x2cb)][_0x3c310d(0x53e)][_0x3c310d(0x8eb)](this),this['updateLink'](),this[_0x3c310d(0x5b6)](),this[_0x3c310d(0x5b4)](),this[_0x3c310d(0x839)]();},Sprite_EnemyName[_0x421ee0(0x2cb)]['redraw']=function(){const _0x4e3048=_0x421ee0;this[_0x4e3048(0x5ce)]=undefined;const _0x44a115=this[_0x4e3048(0x4ec)](),_0x4d4b79=this['bitmapWidth'](),_0x33d03b=Window_Base[_0x4e3048(0x2cb)][_0x4e3048(0x36e)]();this[_0x4e3048(0x257)](),this[_0x4e3048(0x82a)]['clear'](),this['bitmap'][_0x4e3048(0x87c)](_0x44a115,0x0,0x0,_0x4d4b79,_0x33d03b,'center');},Sprite_EnemyName[_0x421ee0(0x2cb)][_0x421ee0(0x34b)]=function(){const _0x1f1ed2=_0x421ee0;if(!this[_0x1f1ed2(0x684)])return;this[_0x1f1ed2(0x4c7)]!==this[_0x1f1ed2(0x684)][_0x1f1ed2(0x4c7)]&&this['setup'](this['_linkedSprite']['_battler']);},Sprite_EnemyName[_0x421ee0(0x2cb)][_0x421ee0(0x5b6)]=function(){const _0x25245f=_0x421ee0;if(!this[_0x25245f(0x684)])return;this[_0x25245f(0x5ca)]=this[_0x25245f(0x5ca)]||Window_Base[_0x25245f(0x2cb)][_0x25245f(0x36e)](),this['x']=this['_linkedSprite'][_0x25245f(0x923)],this['y']=this[_0x25245f(0x684)][_0x25245f(0x88b)]-this[_0x25245f(0x5ca)]*0.5;const _0x4dfa83=VisuMZ[_0x25245f(0x674)][_0x25245f(0x57b)][_0x25245f(0x2d2)];this['x']+=_0x4dfa83[_0x25245f(0x367)]||0x0,this['y']+=_0x4dfa83[_0x25245f(0x328)]||0x0;},Sprite_EnemyName[_0x421ee0(0x2cb)][_0x421ee0(0x5b4)]=function(){const _0xd1956d=_0x421ee0;this[_0xd1956d(0x8f1)]();},Sprite_EnemyName[_0x421ee0(0x2cb)][_0x421ee0(0x8f1)]=function(){const _0x8dc0ac=_0x421ee0;if(!this['_stateIconSprite'])return;this['_battler']!==this['_stateIconSprite'][_0x8dc0ac(0x4c7)]&&this[_0x8dc0ac(0x53a)]['setup'](this['_battler']);const _0x1ea7ea=this[_0x8dc0ac(0x70c)]();this[_0x8dc0ac(0x5ca)]=this[_0x8dc0ac(0x5ca)]||Window_Base[_0x8dc0ac(0x2cb)][_0x8dc0ac(0x36e)](),this[_0x8dc0ac(0x53a)]['x']=Math[_0x8dc0ac(0x38a)]((_0x1ea7ea+ImageManager[_0x8dc0ac(0x28c)])/0x2)+0x8,this[_0x8dc0ac(0x53a)]['y']=this['_lineHeight']/0x2;const _0x4f6e4b=VisuMZ[_0x8dc0ac(0x674)][_0x8dc0ac(0x57b)][_0x8dc0ac(0x2d2)];this[_0x8dc0ac(0x53a)]['x']+=_0x4f6e4b[_0x8dc0ac(0x43a)]||0x0,this[_0x8dc0ac(0x53a)]['y']+=_0x4f6e4b[_0x8dc0ac(0x565)]||0x0;},Sprite_EnemyName['prototype'][_0x421ee0(0x839)]=function(){const _0x407b4f=_0x421ee0,_0x1433a5=this[_0x407b4f(0x7c7)]();if(_0x1433a5&&this['opacity']<0xff)this['opacity']+=0x10;else!_0x1433a5&&this[_0x407b4f(0x3d5)]>0x0&&(this[_0x407b4f(0x3d5)]-=0x10);},Sprite_EnemyName[_0x421ee0(0x2cb)][_0x421ee0(0x7c7)]=function(){const _0x31fcb1=_0x421ee0;if(!this[_0x31fcb1(0x4c7)])return![];else{if(this[_0x31fcb1(0x4c7)]['isDead']())return![];else{if(!this[_0x31fcb1(0x4c7)][_0x31fcb1(0x30b)]())return![];else{if(this[_0x31fcb1(0x805)]())return!![];else{if(SceneManager[_0x31fcb1(0x855)][_0x31fcb1(0x5ad)]&&SceneManager[_0x31fcb1(0x855)][_0x31fcb1(0x5ad)][_0x31fcb1(0x3c4)]&&SceneManager[_0x31fcb1(0x855)]['_enemyWindow'][_0x31fcb1(0x3eb)][_0x31fcb1(0x7f2)](this[_0x31fcb1(0x4c7)]))return!![];else{if(this[_0x31fcb1(0x3d5)]>0x0)return![];}}}}}},Sprite_EnemyName[_0x421ee0(0x2cb)]['isAlwaysVisible']=function(){const _0x12cf87=_0x421ee0;return VisuMZ[_0x12cf87(0x674)][_0x12cf87(0x57b)][_0x12cf87(0x2d2)][_0x12cf87(0x5e7)];},Sprite_EnemyName[_0x421ee0(0x2cb)][_0x421ee0(0x70c)]=function(){const _0x5d2c0c=_0x421ee0;if(!this['_battler'])return 0x0;if(this['_cacheTextWidth'])return this[_0x5d2c0c(0x5ce)];const _0x10f79e=this[_0x5d2c0c(0x4ec)]();return this[_0x5d2c0c(0x257)](),this[_0x5d2c0c(0x5ce)]=this[_0x5d2c0c(0x82a)]['measureTextWidth'](_0x10f79e)||0x1,this[_0x5d2c0c(0x5ce)];},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x46d)]=Sprite_Battleback[_0x421ee0(0x2cb)][_0x421ee0(0x7be)],Sprite_Battleback[_0x421ee0(0x2cb)][_0x421ee0(0x7be)]=function(){const _0x50466c=_0x421ee0,_0x5494c9=VisuMZ['BattleCore'][_0x50466c(0x57b)][_0x50466c(0x43b)];if(!_0x5494c9)return VisuMZ['BattleCore']['Sprite_Battleback_adjustPosition'][_0x50466c(0x8eb)](this);const _0x28f8d1=String(_0x5494c9[_0x50466c(0x1aa)])||'MZ';switch(_0x28f8d1){case'MZ':VisuMZ['BattleCore'][_0x50466c(0x46d)]['call'](this);break;case'1:1':this['adjustPosition_1for1']();break;case _0x50466c(0x6be):this[_0x50466c(0x6a8)]();break;case'ScaleDown':this['adjustPosition_ScaleDown']();break;case _0x50466c(0x4a3):this[_0x50466c(0x851)]();break;}},Sprite_Battleback['prototype'][_0x421ee0(0x44b)]=function(){const _0x189bc9=_0x421ee0;this[_0x189bc9(0x62f)]=Graphics[_0x189bc9(0x62f)],this[_0x189bc9(0x6b2)]=Graphics[_0x189bc9(0x6b2)];const _0x4d5b8d=0x1;this['scale']['x']=_0x4d5b8d,this[_0x189bc9(0x2b7)]['y']=_0x4d5b8d,this['x']=0x0,this['y']=0x0;},Sprite_Battleback[_0x421ee0(0x2cb)][_0x421ee0(0x6a8)]=function(){const _0x5c6c76=_0x421ee0;this[_0x5c6c76(0x62f)]=Graphics[_0x5c6c76(0x62f)],this[_0x5c6c76(0x6b2)]=Graphics['height'];const _0x2d507f=this[_0x5c6c76(0x62f)]/this[_0x5c6c76(0x82a)][_0x5c6c76(0x62f)],_0x18fd40=this['height']/this[_0x5c6c76(0x82a)][_0x5c6c76(0x6b2)],_0x1d2b6e=Math['max'](_0x2d507f,_0x18fd40);this[_0x5c6c76(0x2b7)]['x']=_0x1d2b6e,this[_0x5c6c76(0x2b7)]['y']=_0x1d2b6e,this['x']=(Graphics[_0x5c6c76(0x62f)]-this['width'])/0x2,this['y']=Graphics[_0x5c6c76(0x6b2)]-this[_0x5c6c76(0x6b2)];},Sprite_Battleback[_0x421ee0(0x2cb)][_0x421ee0(0x88e)]=function(){const _0x38b658=_0x421ee0;this[_0x38b658(0x62f)]=Graphics[_0x38b658(0x62f)],this[_0x38b658(0x6b2)]=Graphics['height'];const _0x207848=Math[_0x38b658(0x72a)](0x1,this['width']/this['bitmap'][_0x38b658(0x62f)]),_0x41045c=Math['min'](0x1,this['height']/this[_0x38b658(0x82a)]['height']),_0x488570=Math[_0x38b658(0x8aa)](_0x207848,_0x41045c);this[_0x38b658(0x2b7)]['x']=_0x488570,this[_0x38b658(0x2b7)]['y']=_0x488570,this['x']=(Graphics[_0x38b658(0x62f)]-this[_0x38b658(0x62f)])/0x2,this['y']=Graphics[_0x38b658(0x6b2)]-this[_0x38b658(0x6b2)];},Sprite_Battleback[_0x421ee0(0x2cb)][_0x421ee0(0x851)]=function(){const _0x21a3f1=_0x421ee0;this[_0x21a3f1(0x62f)]=Graphics[_0x21a3f1(0x62f)],this[_0x21a3f1(0x6b2)]=Graphics[_0x21a3f1(0x6b2)];const _0x1dbf66=Math[_0x21a3f1(0x8aa)](0x1,this[_0x21a3f1(0x62f)]/this['bitmap'][_0x21a3f1(0x62f)]),_0x3483aa=Math['max'](0x1,this['height']/this[_0x21a3f1(0x82a)]['height']),_0x105011=Math['max'](_0x1dbf66,_0x3483aa);this['scale']['x']=_0x105011,this[_0x21a3f1(0x2b7)]['y']=_0x105011,this['x']=(Graphics['width']-this[_0x21a3f1(0x62f)])/0x2,this['y']=Graphics[_0x21a3f1(0x6b2)]-this['height'];},Spriteset_Battle[_0x421ee0(0x2cb)]['isFlipped']=function(){const _0x4a1a39=_0x421ee0;if(!$gameSystem[_0x4a1a39(0x649)]())return![];return![];},Spriteset_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x73d)]=function(){return 0x0;},Spriteset_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x840)]=function(){return 0x0;},VisuMZ['BattleCore'][_0x421ee0(0x3b3)]=Spriteset_Battle['prototype']['createLowerLayer'],Spriteset_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x6ab)]=function(){const _0xa3d88f=_0x421ee0;VisuMZ[_0xa3d88f(0x674)]['Spriteset_Battle_createLowerLayer'][_0xa3d88f(0x8eb)](this),this[_0xa3d88f(0x591)](),this[_0xa3d88f(0x773)](),this[_0xa3d88f(0x387)]();},VisuMZ[_0x421ee0(0x674)]['Spriteset_Battle_update']=Spriteset_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x53e)],Spriteset_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x53e)]=function(){const _0x50bd7d=_0x421ee0;VisuMZ['BattleCore']['Spriteset_Battle_update']['call'](this),this[_0x50bd7d(0x8b7)]();},Spriteset_Battle[_0x421ee0(0x2cb)]['createWeather']=function(){const _0xb32368=_0x421ee0;this['_weather']=new Weather(),this[_0xb32368(0x26b)][_0xb32368(0x658)](this['_weather']);},Spriteset_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x8b7)]=function(){const _0xfa3998=_0x421ee0;this[_0xfa3998(0x79f)][_0xfa3998(0x80a)]=$gameScreen['weatherType'](),this[_0xfa3998(0x79f)][_0xfa3998(0x745)]=$gameScreen[_0xfa3998(0x553)]();},Game_Interpreter[_0x421ee0(0x2cb)][_0x421ee0(0x90a)]=function(_0x1ed1b0){const _0x9879f9=_0x421ee0;$gameScreen[_0x9879f9(0x1bb)](_0x1ed1b0[0x0],_0x1ed1b0[0x1],_0x1ed1b0[0x2]);if(_0x1ed1b0[0x3])this[_0x9879f9(0x186)](_0x1ed1b0[0x2]);return!![];},VisuMZ[_0x421ee0(0x674)]['Game_Interpreter_command283']=Game_Interpreter['prototype']['command283'],Game_Interpreter[_0x421ee0(0x2cb)][_0x421ee0(0x208)]=function(_0x38923f){const _0x1ef1a7=_0x421ee0;return SceneManager['isSceneBattle']()?(SceneManager['_scene'][_0x1ef1a7(0x6c2)][_0x1ef1a7(0x1ae)](_0x38923f[0x0],_0x38923f[0x1]),!![]):VisuMZ[_0x1ef1a7(0x674)][_0x1ef1a7(0x2bc)]['call'](this,_0x38923f);},Spriteset_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x687)]=function(_0x448726,_0x3a1bfe){const _0x401b14=_0x421ee0;_0x448726[_0x401b14(0x82a)]=_0x3a1bfe;},Spriteset_Battle['prototype'][_0x421ee0(0x1ae)]=function(_0x36ed5d,_0x229ccf){const _0x2bbc01=_0x421ee0;_0x36ed5d=_0x36ed5d||'',_0x229ccf=_0x229ccf||'';_0x36ed5d===''&&_0x229ccf===''&&(_0x36ed5d=this['_back1Sprite'][_0x2bbc01(0x5c9)](),_0x229ccf=this[_0x2bbc01(0x460)][_0x2bbc01(0x705)]());const _0x3e310a=ImageManager['loadBattleback1'](_0x36ed5d),_0x594488=ImageManager[_0x2bbc01(0x797)](_0x229ccf);_0x3e310a[_0x2bbc01(0x6ae)](this[_0x2bbc01(0x4d8)][_0x2bbc01(0x92c)](this,this[_0x2bbc01(0x300)],this['_back2Sprite'],_0x3e310a,_0x594488));},Spriteset_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x4d8)]=function(_0x4941f6,_0x561273,_0xf82f80,_0x4fa1ed){const _0x4174fe=_0x421ee0;_0x4fa1ed[_0x4174fe(0x6ae)](this['updateBattlebackBitmap2']['bind'](this,_0x4941f6,_0x561273,_0xf82f80,_0x4fa1ed));},Spriteset_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x4f2)]=function(_0x13dcf9,_0x359065,_0x36b9fd,_0x3d2bb9){const _0x4b5968=_0x421ee0;_0x13dcf9[_0x4b5968(0x82a)]=_0x36b9fd,_0x359065['bitmap']=_0x3d2bb9,_0x13dcf9[_0x4b5968(0x7be)](),_0x359065[_0x4b5968(0x7be)]();},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x2ba)]=Spriteset_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x61a)],Spriteset_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x61a)]=function(){const _0x4a715d=_0x421ee0;VisuMZ['BattleCore']['Spriteset_Battle_createBattleField'][_0x4a715d(0x8eb)](this),this['createBattleFieldBattleCore']();},Spriteset_Battle['prototype']['createBattleFieldBattleCore']=function(){const _0x3b2ab7=_0x421ee0;this[_0x3b2ab7(0x476)](),this['createAnimationContainer'](),this[_0x3b2ab7(0x191)](),this[_0x3b2ab7(0x5c3)]();},Spriteset_Battle['prototype'][_0x421ee0(0x476)]=function(){const _0x133835=_0x421ee0;this['_battlerContainer']=new Sprite(),this['_battleField'][_0x133835(0x658)](this[_0x133835(0x462)]);},Spriteset_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x5e4)]=function(){const _0x1f5445=_0x421ee0;this['_animationContainer']=new Sprite(),this['_battleField'][_0x1f5445(0x658)](this['_animationContainer']);},Spriteset_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x191)]=function(){const _0x48d7c3=_0x421ee0;this['_damageContainer']=new Sprite(),this['_damageContainer']['x']=this[_0x48d7c3(0x26b)]['x'],this['_damageContainer']['y']=this['_battleField']['y'],this[_0x48d7c3(0x658)](this['_damageContainer']);},Spriteset_Battle[_0x421ee0(0x2cb)]['adjustFlippedBattlefield']=function(){const _0x4872fd=_0x421ee0;if(!this[_0x4872fd(0x317)]())return;this[_0x4872fd(0x462)][_0x4872fd(0x2b7)]['x']=-0x1,this['_battlerContainer']['x']=this[_0x4872fd(0x26b)]['width'],this[_0x4872fd(0x5bd)][_0x4872fd(0x2b7)]['x']=-0x1,this[_0x4872fd(0x5bd)]['x']=this[_0x4872fd(0x26b)][_0x4872fd(0x62f)],this[_0x4872fd(0x428)][_0x4872fd(0x2b7)]['x']=-0x1,this[_0x4872fd(0x428)]['x']=this[_0x4872fd(0x26b)]['x']+this[_0x4872fd(0x26b)][_0x4872fd(0x62f)];},Spriteset_Battle[_0x421ee0(0x2cb)]['createEnemies']=function(){const _0x5a08cb=_0x421ee0;Imported[_0x5a08cb(0x588)]&&VisuMZ[_0x5a08cb(0x871)]['Settings']['UI'][_0x5a08cb(0x704)]&&this[_0x5a08cb(0x836)]();const _0x5da7a8=$gameTroop[_0x5a08cb(0x294)](),_0x4e94cf=[];for(const _0x347b31 of _0x5da7a8){_0x4e94cf[_0x5a08cb(0x7b3)](new Sprite_Enemy(_0x347b31));}_0x4e94cf[_0x5a08cb(0x4e2)](this[_0x5a08cb(0x18a)][_0x5a08cb(0x92c)](this));for(const _0x3bf49b of _0x4e94cf){this[_0x5a08cb(0x462)][_0x5a08cb(0x658)](_0x3bf49b);}this[_0x5a08cb(0x541)]=_0x4e94cf;},Spriteset_Battle[_0x421ee0(0x2cb)]['createActors']=function(){const _0x214b75=_0x421ee0;this[_0x214b75(0x1b4)]=[];for(let _0x58dab6=0x0;_0x58dab6<$gameParty[_0x214b75(0x323)]();_0x58dab6++){const _0x60b6ca=$gameParty[_0x214b75(0x7a9)]()[_0x58dab6],_0x1334a9=new Sprite_Actor();_0x1334a9['moveToStartPositionBattleCore'](_0x60b6ca),_0x1334a9[_0x214b75(0x629)](_0x60b6ca),_0x1334a9[_0x214b75(0x53e)](),this[_0x214b75(0x1b4)][_0x214b75(0x7b3)](_0x1334a9),this[_0x214b75(0x462)][_0x214b75(0x658)](_0x1334a9);}},Spriteset_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x83b)]=function(_0x5b9232,_0xb8265b,_0x47f4fa,_0x486459){const _0x1f2a94=_0x421ee0,_0x3f0106=this[_0x1f2a94(0x29f)](_0xb8265b),_0x4ff3dc=new(_0x3f0106?Sprite_AnimationMV:Sprite_Animation)(),_0x3d554d=this[_0x1f2a94(0x407)](_0x5b9232);this[_0x1f2a94(0x32d)](_0x5b9232[0x0])&&(_0x47f4fa=!_0x47f4fa),_0x4ff3dc[_0x1f2a94(0x8bb)]=_0x5b9232,_0x4ff3dc['setup'](_0x3d554d,_0xb8265b,_0x47f4fa,_0x486459),this[_0x1f2a94(0x654)](_0x4ff3dc);},Spriteset_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x654)]=function(_0x1a7cf5){const _0x13502b=_0x421ee0;this[_0x13502b(0x7e3)](_0x1a7cf5)?this['battleStatusWindowAnimationContainer']()['addChild'](_0x1a7cf5):this['_animationContainer'][_0x13502b(0x658)](_0x1a7cf5),this['_animationSprites'][_0x13502b(0x7b3)](_0x1a7cf5);},Spriteset_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x7e3)]=function(_0x1f06c2){const _0x30c4d2=_0x421ee0;if(!_0x1f06c2)return![];if(!_0x1f06c2[_0x30c4d2(0x678)])return![];if(_0x1f06c2[_0x30c4d2(0x678)]['displayType']!==0x0)return![];if(!_0x1f06c2[_0x30c4d2(0x8bb)][0x0])return![];if(!_0x1f06c2[_0x30c4d2(0x8bb)][0x0][_0x30c4d2(0x6da)]())return![];if($gameSystem[_0x30c4d2(0x649)]())return![];if(!this[_0x30c4d2(0x327)]())return![];return Window_BattleStatus[_0x30c4d2(0x2cb)][_0x30c4d2(0x885)]()==='portrait';},Spriteset_Battle['prototype'][_0x421ee0(0x327)]=function(){const _0x11ed29=_0x421ee0;if(!SceneManager[_0x11ed29(0x855)])return;if(!SceneManager[_0x11ed29(0x855)][_0x11ed29(0x1df)])return;if(!SceneManager[_0x11ed29(0x855)][_0x11ed29(0x1df)]['_effectsContainer'])return;return SceneManager[_0x11ed29(0x855)][_0x11ed29(0x1df)]['_effectsContainer'];},Spriteset_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x233)]=function(_0x834e93){const _0x1cf38e=_0x421ee0;this['removeAnimationFromContainer'](_0x834e93);for(const _0x3bc646 of _0x834e93[_0x1cf38e(0x8bb)]){_0x3bc646[_0x1cf38e(0x64c)]&&_0x3bc646[_0x1cf38e(0x64c)]();}_0x834e93[_0x1cf38e(0x56a)]();},Spriteset_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x1cc)]=function(_0x1caeb5){const _0xec828a=_0x421ee0;this[_0xec828a(0x2c3)][_0xec828a(0x60e)](_0x1caeb5),this[_0xec828a(0x7e3)](_0x1caeb5)?this[_0xec828a(0x327)]()['removeChild'](_0x1caeb5):this[_0xec828a(0x5bd)]['removeChild'](_0x1caeb5);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x36a)]=Spriteset_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x304)],Spriteset_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x304)]=function(){const _0x426928=_0x421ee0;VisuMZ['BattleCore'][_0x426928(0x36a)][_0x426928(0x8eb)](this),this[_0x426928(0x221)]();},Spriteset_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x221)]=function(){const _0x551704=_0x421ee0;this[_0x551704(0x462)][_0x551704(0x743)][_0x551704(0x4e2)](this[_0x551704(0x5fc)][_0x551704(0x92c)](this)),this['putActiveBattlerOnTop']();},Spriteset_Battle['prototype'][_0x421ee0(0x5fc)]=function(_0x3387e9,_0x48c9b7){const _0x75c905=_0x421ee0;if(VisuMZ[_0x75c905(0x674)][_0x75c905(0x57b)][_0x75c905(0x92b)][_0x75c905(0x398)]){if(_0x3387e9[_0x75c905(0x4c7)]&&_0x48c9b7[_0x75c905(0x4c7)]){if(_0x3387e9[_0x75c905(0x4c7)][_0x75c905(0x6da)]()&&_0x48c9b7['_battler'][_0x75c905(0x84c)]())return 0x1;else{if(_0x48c9b7[_0x75c905(0x4c7)][_0x75c905(0x6da)]()&&_0x3387e9[_0x75c905(0x4c7)][_0x75c905(0x84c)]())return-0x1;}}}return _0x3387e9[_0x75c905(0x88b)]!==_0x48c9b7[_0x75c905(0x88b)]?_0x3387e9[_0x75c905(0x88b)]-_0x48c9b7['_baseY']:_0x48c9b7[_0x75c905(0x5da)]-_0x3387e9['spriteId'];},Spriteset_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x510)]=function(){const _0x516616=_0x421ee0;if(!VisuMZ[_0x516616(0x674)][_0x516616(0x57b)][_0x516616(0x92b)][_0x516616(0x266)])return;const _0x1a37d7=BattleManager['_subject'];if(_0x1a37d7){if(_0x1a37d7[_0x516616(0x6da)]()&&!$gameSystem[_0x516616(0x649)]())return;const _0x34c862=_0x1a37d7['battler']();if(_0x34c862&&_0x1a37d7[_0x516616(0x6da)]())this['_battlerContainer']['addChild'](_0x34c862);}},Spriteset_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x3e2)]=function(){const _0x3c08a4=_0x421ee0;for(const _0x1a47ba of $gameParty['aliveMembers']()){if(!_0x1a47ba)continue;if(!_0x1a47ba[_0x3c08a4(0x35a)]())continue;_0x1a47ba[_0x3c08a4(0x35a)]()[_0x3c08a4(0x46e)]=!![],_0x1a47ba[_0x3c08a4(0x35a)]()[_0x3c08a4(0x784)]();}},Spriteset_Battle[_0x421ee0(0x2cb)]['createUIContainer']=function(){const _0x1830a8=_0x421ee0;this['_uiContainer']=new Sprite(),this[_0x1830a8(0x26b)]['addChild'](this[_0x1830a8(0x35d)]);},Spriteset_Battle[_0x421ee0(0x2cb)]['createEnemyNames']=function(){const _0x2aaa1b=_0x421ee0;this[_0x2aaa1b(0x20b)]=new Sprite(),this['_uiContainer']['addChild'](this['_enemyNameContainer']);for(const _0x220adb of this[_0x2aaa1b(0x541)]){const _0x2e3817=new Sprite_EnemyName();this[_0x2aaa1b(0x20b)][_0x2aaa1b(0x658)](_0x2e3817),_0x2e3817['linkSprite'](_0x220adb);}},Spriteset_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x286)]=function(){return![];},Spriteset_Battle[_0x421ee0(0x2cb)]['isAnyoneFloating']=function(){const _0xcaa4c0=_0x421ee0;return this[_0xcaa4c0(0x72b)]()[_0xcaa4c0(0x676)](_0x2dca45=>_0x2dca45[_0xcaa4c0(0x29e)]());},Spriteset_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x7f9)]=function(){const _0x54a16d=_0x421ee0;return this[_0x54a16d(0x72b)]()[_0x54a16d(0x676)](_0x5b8f76=>_0x5b8f76[_0x54a16d(0x25b)]());},Spriteset_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x4e4)]=function(){const _0x3d5238=_0x421ee0;return this[_0x3d5238(0x72b)]()[_0x3d5238(0x676)](_0xfc15b8=>_0xfc15b8['isGrowing']());},Spriteset_Battle['prototype'][_0x421ee0(0x4bb)]=function(){return this['battlerSprites']()['some'](_0x4a7748=>_0x4a7748['isSkewing']());},Spriteset_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x907)]=function(){const _0x285175=_0x421ee0;return this['battlerSprites']()[_0x285175(0x676)](_0x47c95b=>_0x47c95b[_0x285175(0x344)]());},Spriteset_Battle[_0x421ee0(0x2cb)][_0x421ee0(0x392)]=function(){const _0x4f08ca=_0x421ee0;return this[_0x4f08ca(0x72b)]()['some'](_0x5d41ea=>_0x5d41ea[_0x4f08ca(0x7d9)]());},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x761)]=Window_ItemList[_0x421ee0(0x2cb)][_0x421ee0(0x3aa)],Window_ItemList['prototype'][_0x421ee0(0x3aa)]=function(){const _0x38d762=_0x421ee0;return SceneManager[_0x38d762(0x225)]()?SceneManager[_0x38d762(0x855)][_0x38d762(0x885)]()===_0x38d762(0x633)?VisuMZ[_0x38d762(0x674)][_0x38d762(0x57b)]['BattleLayout']['SkillItemBorderCols']:VisuMZ[_0x38d762(0x674)][_0x38d762(0x57b)]['BattleLayout'][_0x38d762(0x7a3)]:VisuMZ[_0x38d762(0x674)][_0x38d762(0x761)][_0x38d762(0x8eb)](this);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x6d6)]=Window_SkillList[_0x421ee0(0x2cb)][_0x421ee0(0x3aa)],Window_SkillList[_0x421ee0(0x2cb)]['maxCols']=function(){const _0xd57c82=_0x421ee0;return SceneManager[_0xd57c82(0x225)]()?SceneManager[_0xd57c82(0x855)][_0xd57c82(0x885)]()===_0xd57c82(0x633)?VisuMZ[_0xd57c82(0x674)][_0xd57c82(0x57b)][_0xd57c82(0x772)][_0xd57c82(0x5ea)]:VisuMZ[_0xd57c82(0x674)][_0xd57c82(0x57b)]['BattleLayout'][_0xd57c82(0x7a3)]:VisuMZ[_0xd57c82(0x674)]['Window_SkillList_maxCols'][_0xd57c82(0x8eb)](this);},VisuMZ[_0x421ee0(0x674)]['Window_Options_addGeneralOptions']=Window_Options[_0x421ee0(0x2cb)][_0x421ee0(0x1e4)],Window_Options['prototype'][_0x421ee0(0x1e4)]=function(){const _0x3652b0=_0x421ee0;VisuMZ[_0x3652b0(0x674)]['Window_Options_addGeneralOptions'][_0x3652b0(0x8eb)](this),this[_0x3652b0(0x8f5)](),this['addShowHpGaugeCommand']();},Window_Options[_0x421ee0(0x2cb)]['addAutoBattleCommands']=function(){const _0x8a43af=_0x421ee0;VisuMZ[_0x8a43af(0x674)][_0x8a43af(0x57b)][_0x8a43af(0x8ed)][_0x8a43af(0x2d6)]&&(this[_0x8a43af(0x563)](),this['addBattleCoreAutoBattleStyleCommand']());},Window_Options[_0x421ee0(0x2cb)][_0x421ee0(0x827)]=function(){const _0x3d5363=_0x421ee0;if(!VisuMZ[_0x3d5363(0x674)]['Settings']['HpGauge'][_0x3d5363(0x306)])return;const _0x17135c=TextManager['visualHpGauge'],_0x2065e5=_0x3d5363(0x2ae);this['addCommand'](_0x17135c,_0x2065e5);},Window_Options['prototype'][_0x421ee0(0x563)]=function(){const _0x9a3f77=_0x421ee0,_0x4978bd=TextManager[_0x9a3f77(0x72c)],_0x32a7a5=_0x9a3f77(0x46c);this['addCommand'](_0x4978bd,_0x32a7a5);},Window_Options[_0x421ee0(0x2cb)]['addBattleCoreAutoBattleStyleCommand']=function(){const _0x201dfe=_0x421ee0,_0x529e54=TextManager[_0x201dfe(0x3d2)],_0x422061=_0x201dfe(0x68d);this[_0x201dfe(0x63e)](_0x529e54,_0x422061);},VisuMZ[_0x421ee0(0x674)]['Window_Options_statusText']=Window_Options[_0x421ee0(0x2cb)]['statusText'],Window_Options['prototype'][_0x421ee0(0x858)]=function(_0x12f7cd){const _0x53b54e=_0x421ee0,_0x2b06c7=this[_0x53b54e(0x529)](_0x12f7cd);return _0x2b06c7===_0x53b54e(0x68d)?this[_0x53b54e(0x4e8)]():VisuMZ['BattleCore'][_0x53b54e(0x337)][_0x53b54e(0x8eb)](this,_0x12f7cd);},Window_Options[_0x421ee0(0x2cb)][_0x421ee0(0x4e8)]=function(){const _0x55ffdd=_0x421ee0,_0x698e0f=VisuMZ[_0x55ffdd(0x674)][_0x55ffdd(0x57b)][_0x55ffdd(0x8ed)],_0x1377a2=this['getConfigValue'](_0x55ffdd(0x68d));return _0x1377a2?_0x698e0f[_0x55ffdd(0x4c2)]:_0x698e0f[_0x55ffdd(0x50d)];},Window_ShopStatus['prototype'][_0x421ee0(0x7c2)]=function(){const _0x355098=_0x421ee0,_0x50ef3f=DataManager[_0x355098(0x693)](this[_0x355098(0x7ca)]),_0x1d76a6=VisuMZ[_0x355098(0x3a0)][_0x50ef3f];if(!_0x1d76a6)return this[_0x355098(0x171)]();const _0xf28937='DamageType%1'[_0x355098(0x7d7)](this[_0x355098(0x7ca)][_0x355098(0x760)]['type']),_0x1dd71b=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this[_0x355098(0x7ca)][_0x355098(0x760)][_0x355098(0x80a)]];return _0x1d76a6[_0xf28937]['format'](_0x1dd71b);},Window_ShopStatus[_0x421ee0(0x2cb)][_0x421ee0(0x49c)]=function(){const _0x524499=_0x421ee0,_0x1bfb1b=DataManager['getDamageStyle'](this[_0x524499(0x7ca)]),_0x5178b9=VisuMZ['DamageStyles'][_0x1bfb1b];if(!_0x5178b9)return this[_0x524499(0x847)]();return _0x5178b9[_0x524499(0x49a)][_0x524499(0x8eb)](this);},VisuMZ[_0x421ee0(0x674)]['Window_PartyCommand_initialize']=Window_PartyCommand['prototype'][_0x421ee0(0x792)],Window_PartyCommand['prototype'][_0x421ee0(0x792)]=function(_0x141b27){const _0x12993b=_0x421ee0;VisuMZ['BattleCore']['Window_PartyCommand_initialize']['call'](this,_0x141b27),this[_0x12993b(0x1c8)](_0x141b27);},Window_PartyCommand[_0x421ee0(0x2cb)][_0x421ee0(0x1c8)]=function(_0x2ba99d){const _0x8e0649=_0x421ee0,_0x5efc25=new Rectangle(0x0,0x0,_0x2ba99d['width'],_0x2ba99d[_0x8e0649(0x6b2)]);this[_0x8e0649(0x746)]=new Window_Base(_0x5efc25),this[_0x8e0649(0x746)]['opacity']=0x0,this[_0x8e0649(0x658)](this[_0x8e0649(0x746)]),this[_0x8e0649(0x7fc)]();},Window_PartyCommand[_0x421ee0(0x2cb)]['callUpdateHelp']=function(){const _0x2d2fab=_0x421ee0;Window_Command[_0x2d2fab(0x2cb)][_0x2d2fab(0x5f3)][_0x2d2fab(0x8eb)](this);if(this[_0x2d2fab(0x746)])this['updateCommandNameWindow']();},Window_PartyCommand[_0x421ee0(0x2cb)][_0x421ee0(0x7fc)]=function(){const _0x2e8665=_0x421ee0,_0x4130ee=this['_commandNameWindow'];_0x4130ee[_0x2e8665(0x60a)][_0x2e8665(0x564)]();const _0x2a362f=this[_0x2e8665(0x3fb)](this[_0x2e8665(0x2de)]());if(_0x2a362f==='icon'&&this[_0x2e8665(0x23f)]()>0x0){const _0x269ba6=this[_0x2e8665(0x2d8)](this['index']());let _0x24ff0a=this[_0x2e8665(0x256)](this[_0x2e8665(0x2de)]());_0x24ff0a=_0x24ff0a[_0x2e8665(0x4ce)](/\\I\[(\d+)\]/gi,''),_0x4130ee[_0x2e8665(0x711)](),this[_0x2e8665(0x26a)](_0x24ff0a,_0x269ba6),this[_0x2e8665(0x318)](_0x24ff0a,_0x269ba6),this[_0x2e8665(0x2a2)](_0x24ff0a,_0x269ba6);}},Window_PartyCommand[_0x421ee0(0x2cb)][_0x421ee0(0x26a)]=function(_0x5c39c2,_0x241df4){},Window_PartyCommand[_0x421ee0(0x2cb)]['commandNameWindowDrawText']=function(_0x2640dc,_0x2e3dd3){const _0x4e5259=_0x421ee0,_0x4ea037=this['_commandNameWindow'];_0x4ea037[_0x4e5259(0x87c)](_0x2640dc,0x0,_0x2e3dd3['y'],_0x4ea037[_0x4e5259(0x641)],'center');},Window_PartyCommand[_0x421ee0(0x2cb)]['commandNameWindowCenter']=function(_0x3eb931,_0x540393){const _0x2ffe4d=_0x421ee0,_0x57d713=this[_0x2ffe4d(0x746)],_0xe363bf=$gameSystem[_0x2ffe4d(0x39a)](),_0xb0a632=_0x540393['x']+Math[_0x2ffe4d(0x860)](_0x540393['width']/0x2)+_0xe363bf;_0x57d713['x']=_0x57d713[_0x2ffe4d(0x62f)]/-0x2+_0xb0a632,_0x57d713['y']=Math[_0x2ffe4d(0x860)](_0x540393[_0x2ffe4d(0x6b2)]/0x2);},Window_PartyCommand[_0x421ee0(0x2cb)][_0x421ee0(0x5e1)]=function(){const _0x420775=_0x421ee0;this[_0x420775(0x65c)](),this[_0x420775(0x89c)](),this[_0x420775(0x369)](),this[_0x420775(0x7c4)](),this[_0x420775(0x422)]();},Window_PartyCommand['prototype'][_0x421ee0(0x65c)]=function(){const _0x1cf682=_0x421ee0,_0x28e6b6=this[_0x1cf682(0x91c)](),_0xdc18bd=VisuMZ[_0x1cf682(0x674)][_0x1cf682(0x57b)][_0x1cf682(0x30c)][_0x1cf682(0x8ad)],_0x2bfd27=_0x28e6b6===_0x1cf682(0x3ab)?TextManager[_0x1cf682(0x571)]:_0x1cf682(0x1c6)[_0x1cf682(0x7d7)](_0xdc18bd,TextManager[_0x1cf682(0x571)]),_0x46dd08=this[_0x1cf682(0x253)]();this[_0x1cf682(0x63e)](_0x2bfd27,'fight',_0x46dd08);},Window_PartyCommand[_0x421ee0(0x2cb)][_0x421ee0(0x253)]=function(){return!![];},Window_PartyCommand['prototype'][_0x421ee0(0x89c)]=function(){const _0x143928=_0x421ee0;if(!this[_0x143928(0x54f)]())return;const _0x172a21=this[_0x143928(0x91c)](),_0x403fd3=VisuMZ['BattleCore'][_0x143928(0x57b)][_0x143928(0x30c)][_0x143928(0x726)],_0x53a0f4=_0x172a21===_0x143928(0x3ab)?TextManager[_0x143928(0x1c1)]:_0x143928(0x1c6)[_0x143928(0x7d7)](_0x403fd3,TextManager['autoBattle']),_0x405fe1=this[_0x143928(0x501)]();this['addCommand'](_0x53a0f4,_0x143928(0x1c1),_0x405fe1);},Window_PartyCommand[_0x421ee0(0x2cb)][_0x421ee0(0x54f)]=function(){const _0x14c7c2=_0x421ee0;return VisuMZ[_0x14c7c2(0x674)][_0x14c7c2(0x57b)][_0x14c7c2(0x30c)][_0x14c7c2(0x6af)];},Window_PartyCommand['prototype'][_0x421ee0(0x501)]=function(){return!![];},Window_PartyCommand[_0x421ee0(0x2cb)]['addCustomCommands']=function(){},Window_PartyCommand[_0x421ee0(0x2cb)][_0x421ee0(0x7c4)]=function(){const _0x4be19c=_0x421ee0;if(!this[_0x4be19c(0x90c)]())return;const _0x38f611=this['commandStyle'](),_0x68c94c=VisuMZ[_0x4be19c(0x674)]['Settings'][_0x4be19c(0x30c)]['CmdIconOptions'],_0x418a6e=_0x38f611===_0x4be19c(0x3ab)?TextManager[_0x4be19c(0x645)]:_0x4be19c(0x1c6)['format'](_0x68c94c,TextManager['options']),_0x4e22df=this['isOptionsCommandEnabled']();this[_0x4be19c(0x63e)](_0x418a6e,_0x4be19c(0x645),_0x4e22df);},Window_PartyCommand['prototype'][_0x421ee0(0x90c)]=function(){const _0x5db5d5=_0x421ee0;return VisuMZ[_0x5db5d5(0x674)][_0x5db5d5(0x57b)]['PartyCmd'][_0x5db5d5(0x73b)];},Window_PartyCommand['prototype'][_0x421ee0(0x49d)]=function(){return!![];},Window_PartyCommand[_0x421ee0(0x2cb)][_0x421ee0(0x422)]=function(){const _0x2fd778=_0x421ee0,_0x21aa94=this[_0x2fd778(0x91c)](),_0x48c6a0=VisuMZ[_0x2fd778(0x674)][_0x2fd778(0x57b)][_0x2fd778(0x30c)][_0x2fd778(0x597)],_0x2e1b69=_0x21aa94===_0x2fd778(0x3ab)?TextManager[_0x2fd778(0x5c8)]:_0x2fd778(0x1c6)[_0x2fd778(0x7d7)](_0x48c6a0,TextManager['escape']),_0x2709ac=this['isEscapeCommandEnabled']();this[_0x2fd778(0x63e)](_0x2e1b69,'escape',_0x2709ac);},Window_PartyCommand[_0x421ee0(0x2cb)][_0x421ee0(0x8ee)]=function(){const _0x3c1d0c=_0x421ee0;return BattleManager[_0x3c1d0c(0x70b)]();},Window_PartyCommand[_0x421ee0(0x2cb)][_0x421ee0(0x3f0)]=function(){const _0x17c4a0=_0x421ee0;return VisuMZ['BattleCore'][_0x17c4a0(0x57b)][_0x17c4a0(0x30c)][_0x17c4a0(0x5e2)];},Window_PartyCommand[_0x421ee0(0x2cb)][_0x421ee0(0x485)]=function(_0x2f1bb0){const _0x58765c=_0x421ee0,_0x21f529=this[_0x58765c(0x3fb)](_0x2f1bb0);if(_0x21f529===_0x58765c(0x80b))this[_0x58765c(0x364)](_0x2f1bb0);else _0x21f529===_0x58765c(0x6a3)?this[_0x58765c(0x36b)](_0x2f1bb0):Window_Command[_0x58765c(0x2cb)][_0x58765c(0x485)][_0x58765c(0x8eb)](this,_0x2f1bb0);},Window_PartyCommand[_0x421ee0(0x2cb)][_0x421ee0(0x91c)]=function(){const _0x1729c1=_0x421ee0;return VisuMZ[_0x1729c1(0x674)][_0x1729c1(0x57b)][_0x1729c1(0x30c)][_0x1729c1(0x45f)];},Window_PartyCommand[_0x421ee0(0x2cb)][_0x421ee0(0x3fb)]=function(_0x585fb8){const _0x42bfa0=_0x421ee0;if(_0x585fb8<0x0)return'text';const _0x404899=this['commandStyle']();if(_0x404899!=='auto')return _0x404899;else{if(this[_0x42bfa0(0x23f)]()>0x0){const _0x43350c=this[_0x42bfa0(0x256)](_0x585fb8);if(_0x43350c[_0x42bfa0(0x5f2)](/\\I\[(\d+)\]/i)){const _0x59ad47=this['itemLineRect'](_0x585fb8),_0x27032b=this['textSizeEx'](_0x43350c)['width'];return _0x27032b<=_0x59ad47['width']?_0x42bfa0(0x80b):_0x42bfa0(0x6a3);}}}return _0x42bfa0(0x3ab);},Window_PartyCommand[_0x421ee0(0x2cb)][_0x421ee0(0x364)]=function(_0x29cd94){const _0x117854=_0x421ee0,_0x479f05=this[_0x117854(0x2d8)](_0x29cd94),_0x3b1edf=this['commandName'](_0x29cd94),_0x2c7781=this[_0x117854(0x668)](_0x3b1edf)[_0x117854(0x62f)];this[_0x117854(0x6c8)](this[_0x117854(0x621)](_0x29cd94));const _0x5f50c1=this[_0x117854(0x3f0)]();if(_0x5f50c1==='right')this[_0x117854(0x56e)](_0x3b1edf,_0x479f05['x']+_0x479f05[_0x117854(0x62f)]-_0x2c7781,_0x479f05['y'],_0x2c7781);else{if(_0x5f50c1==='center'){const _0xb55b5d=_0x479f05['x']+Math[_0x117854(0x860)]((_0x479f05[_0x117854(0x62f)]-_0x2c7781)/0x2);this[_0x117854(0x56e)](_0x3b1edf,_0xb55b5d,_0x479f05['y'],_0x2c7781);}else this['drawTextEx'](_0x3b1edf,_0x479f05['x'],_0x479f05['y'],_0x2c7781);}},Window_PartyCommand[_0x421ee0(0x2cb)]['drawItemStyleIcon']=function(_0x45b370){const _0x2f6ca0=_0x421ee0;this[_0x2f6ca0(0x256)](_0x45b370)['match'](/\\I\[(\d+)\]/i);const _0x3a040e=Number(RegExp['$1'])||0x0,_0x46386b=this['itemLineRect'](_0x45b370),_0x7828bb=_0x46386b['x']+Math[_0x2f6ca0(0x860)]((_0x46386b[_0x2f6ca0(0x62f)]-ImageManager['iconWidth'])/0x2),_0x5caa48=_0x46386b['y']+(_0x46386b[_0x2f6ca0(0x6b2)]-ImageManager['iconHeight'])/0x2;this[_0x2f6ca0(0x2fc)](_0x3a040e,_0x7828bb,_0x5caa48);},Window_PartyCommand[_0x421ee0(0x2cb)][_0x421ee0(0x405)]=function(){},Window_PartyCommand['prototype'][_0x421ee0(0x531)]=function(){const _0x5651af=_0x421ee0;Window_Command[_0x5651af(0x2cb)][_0x5651af(0x531)][_0x5651af(0x8eb)](this);const _0x59ebc7=this[_0x5651af(0x885)]();_0x59ebc7===_0x5651af(0x633)&&this[_0x5651af(0x4da)]();},Window_PartyCommand[_0x421ee0(0x2cb)][_0x421ee0(0x885)]=function(){const _0x1be8b6=_0x421ee0;if(this[_0x1be8b6(0x42c)])return this[_0x1be8b6(0x42c)];return this[_0x1be8b6(0x42c)]=SceneManager[_0x1be8b6(0x855)]['battleLayoutStyle'](),this[_0x1be8b6(0x42c)];},Window_PartyCommand['prototype'][_0x421ee0(0x77e)]=function(){const _0x33b6cb=_0x421ee0,_0x47f827=VisuMZ[_0x33b6cb(0x674)]['Settings'][_0x33b6cb(0x30c)],_0x1419fe=this['currentSymbol']();switch(_0x1419fe){case _0x33b6cb(0x571):this[_0x33b6cb(0x8c1)][_0x33b6cb(0x1da)](_0x47f827['HelpFight']);break;case'autoBattle':this[_0x33b6cb(0x8c1)][_0x33b6cb(0x1da)](_0x47f827[_0x33b6cb(0x33e)]);break;case _0x33b6cb(0x645):this['_helpWindow'][_0x33b6cb(0x1da)](_0x47f827['HelpOptions']);break;case _0x33b6cb(0x5c8):this[_0x33b6cb(0x8c1)][_0x33b6cb(0x1da)](_0x47f827[_0x33b6cb(0x40c)]);break;default:this[_0x33b6cb(0x8c1)]['setText']('');break;}},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x606)]=Window_ActorCommand[_0x421ee0(0x2cb)][_0x421ee0(0x792)],Window_ActorCommand[_0x421ee0(0x2cb)][_0x421ee0(0x792)]=function(_0x58e352){const _0x451076=_0x421ee0;VisuMZ[_0x451076(0x674)]['Window_ActorCommand_initialize'][_0x451076(0x8eb)](this,_0x58e352),this[_0x451076(0x1c8)](_0x58e352);},Window_ActorCommand['prototype']['createCommandNameWindow']=function(_0x4deb5f){const _0x289205=_0x421ee0,_0x26c4a7=new Rectangle(0x0,0x0,_0x4deb5f[_0x289205(0x62f)],_0x4deb5f[_0x289205(0x6b2)]);this[_0x289205(0x746)]=new Window_Base(_0x26c4a7),this[_0x289205(0x746)]['opacity']=0x0,this[_0x289205(0x658)](this['_commandNameWindow']),this[_0x289205(0x7fc)]();},Window_ActorCommand[_0x421ee0(0x2cb)][_0x421ee0(0x5f3)]=function(){const _0x3c1fd6=_0x421ee0;Window_Command[_0x3c1fd6(0x2cb)][_0x3c1fd6(0x5f3)][_0x3c1fd6(0x8eb)](this);if(this[_0x3c1fd6(0x746)])this['updateCommandNameWindow']();},Window_ActorCommand['prototype'][_0x421ee0(0x7fc)]=function(){const _0x16b584=_0x421ee0,_0x280cb4=this['_commandNameWindow'];_0x280cb4[_0x16b584(0x60a)]['clear']();const _0x1a3c75=this[_0x16b584(0x3fb)](this['index']());if(_0x1a3c75===_0x16b584(0x6a3)&&this[_0x16b584(0x23f)]()>0x0){const _0x2fb304=this[_0x16b584(0x2d8)](this[_0x16b584(0x2de)]());let _0x3a1a0f=this[_0x16b584(0x256)](this[_0x16b584(0x2de)]());_0x3a1a0f=_0x3a1a0f['replace'](/\\I\[(\d+)\]/gi,''),_0x280cb4[_0x16b584(0x711)](),this[_0x16b584(0x26a)](_0x3a1a0f,_0x2fb304),this[_0x16b584(0x318)](_0x3a1a0f,_0x2fb304),this[_0x16b584(0x2a2)](_0x3a1a0f,_0x2fb304);}},Window_ActorCommand[_0x421ee0(0x2cb)]['commandNameWindowDrawBackground']=function(_0x2e9d28,_0x16a850){},Window_ActorCommand[_0x421ee0(0x2cb)][_0x421ee0(0x318)]=function(_0x1b4c59,_0x12c0b0){const _0x9b1f83=_0x421ee0,_0xfd0721=this['_commandNameWindow'];_0xfd0721[_0x9b1f83(0x87c)](_0x1b4c59,0x0,_0x12c0b0['y'],_0xfd0721[_0x9b1f83(0x641)],_0x9b1f83(0x3bd));},Window_ActorCommand[_0x421ee0(0x2cb)][_0x421ee0(0x2a2)]=function(_0xba8d7c,_0x26a05a){const _0x16da37=_0x421ee0,_0x3709a3=this[_0x16da37(0x746)],_0x4ecf89=$gameSystem['windowPadding'](),_0x3f8112=_0x26a05a['x']+Math[_0x16da37(0x860)](_0x26a05a[_0x16da37(0x62f)]/0x2)+_0x4ecf89;_0x3709a3['x']=_0x3709a3[_0x16da37(0x62f)]/-0x2+_0x3f8112,_0x3709a3['y']=Math['floor'](_0x26a05a[_0x16da37(0x6b2)]/0x2);},Window_ActorCommand[_0x421ee0(0x2cb)][_0x421ee0(0x5e1)]=function(){const _0x3f4f57=_0x421ee0;if(!this[_0x3f4f57(0x530)])return;const _0x1ed78a=this[_0x3f4f57(0x530)][_0x3f4f57(0x48b)]();for(const _0x4588a5 of _0x1ed78a){this[_0x3f4f57(0x5dd)](_0x4588a5['toUpperCase']()[_0x3f4f57(0x90d)]());}},Window_ActorCommand[_0x421ee0(0x2cb)][_0x421ee0(0x5dd)]=function(_0x3cd3bf){const _0x5ab0c5=_0x421ee0;_0x3cd3bf==='ATTACK'&&this[_0x5ab0c5(0x4f0)]();[_0x5ab0c5(0x16a),'SKILLS']['includes'](_0x3cd3bf)&&this[_0x5ab0c5(0x3a8)]();_0x3cd3bf===_0x5ab0c5(0x6ca)&&this[_0x5ab0c5(0x8f8)]();_0x3cd3bf===_0x5ab0c5(0x8ef)&&this[_0x5ab0c5(0x43c)]();_0x3cd3bf===_0x5ab0c5(0x86a)&&this['addEscapeCommand']();_0x3cd3bf===_0x5ab0c5(0x7e9)&&this[_0x5ab0c5(0x89c)]();if(_0x3cd3bf[_0x5ab0c5(0x5f2)](/STYPE: (\d+)/i)){const _0x44b78d=Number(RegExp['$1']);this[_0x5ab0c5(0x1a3)](_0x44b78d);}else{if(_0x3cd3bf[_0x5ab0c5(0x5f2)](/STYPE: (.*)/i)){const _0xf05958=DataManager[_0x5ab0c5(0x735)](RegExp['$1']);this['addSkillTypeCommand'](_0xf05958);}}_0x3cd3bf===_0x5ab0c5(0x6f3)&&this[_0x5ab0c5(0x434)]();if(_0x3cd3bf['match'](/SKILL: (\d+)/i)){const _0x147846=Number(RegExp['$1']);this[_0x5ab0c5(0x20e)]($dataSkills[_0x147846]);}else{if(_0x3cd3bf['match'](/SKILL: (.*)/i)){const _0x514c79=DataManager[_0x5ab0c5(0x2c7)](RegExp['$1']);this[_0x5ab0c5(0x20e)]($dataSkills[_0x514c79]);}}_0x3cd3bf===_0x5ab0c5(0x80d)&&Imported['VisuMZ_2_PartySystem']&&this[_0x5ab0c5(0x305)](),[_0x5ab0c5(0x928),_0x5ab0c5(0x3cb)][_0x5ab0c5(0x7f2)](_0x3cd3bf)&&Imported[_0x5ab0c5(0x6e0)]&&this[_0x5ab0c5(0x74f)]();},Window_ActorCommand[_0x421ee0(0x2cb)][_0x421ee0(0x4f0)]=function(){const _0x58dce0=_0x421ee0,_0x511151=$dataSkills[this[_0x58dce0(0x530)][_0x58dce0(0x2a7)]()];if(!_0x511151)return;if(!this['canAddSkillCommand'](_0x511151))return;const _0x5e7282=this['commandStyle'](),_0x1ad7b2=DataManager[_0x58dce0(0x7da)](_0x511151),_0x183c64=DataManager[_0x58dce0(0x1a2)](_0x511151),_0x101f0f=_0x5e7282===_0x58dce0(0x3ab)?_0x1ad7b2:_0x58dce0(0x1c6)['format'](_0x183c64,_0x1ad7b2);this[_0x58dce0(0x63e)](_0x101f0f,'attack',this[_0x58dce0(0x530)][_0x58dce0(0x73c)]());},Window_ActorCommand[_0x421ee0(0x2cb)]['addGuardCommand']=function(){const _0x50f043=_0x421ee0,_0x52de36=$dataSkills[this[_0x50f043(0x530)][_0x50f043(0x64a)]()];if(!_0x52de36)return;if(!this[_0x50f043(0x4b4)](_0x52de36))return;const _0x142cd1=this[_0x50f043(0x91c)](),_0x1f830b=DataManager[_0x50f043(0x7da)](_0x52de36),_0x4c82e2=DataManager['battleCommandIcon'](_0x52de36),_0x2a573d=_0x142cd1===_0x50f043(0x3ab)?_0x1f830b:_0x50f043(0x1c6)[_0x50f043(0x7d7)](_0x4c82e2,_0x1f830b);this[_0x50f043(0x63e)](_0x2a573d,_0x50f043(0x7f3),this[_0x50f043(0x530)][_0x50f043(0x236)]());},Window_ActorCommand['prototype']['addItemCommand']=function(){const _0x370344=_0x421ee0,_0x217f0f=this[_0x370344(0x91c)](),_0x5b580b=VisuMZ[_0x370344(0x674)][_0x370344(0x57b)]['ActorCmd'][_0x370344(0x87f)],_0x945f6d=_0x217f0f==='text'?TextManager['item']:'\x5cI[%1]%2'[_0x370344(0x7d7)](_0x5b580b,TextManager[_0x370344(0x8f0)]),_0xf72229=this[_0x370344(0x92d)]();this[_0x370344(0x63e)](_0x945f6d,_0x370344(0x8f0),_0xf72229);},Window_ActorCommand[_0x421ee0(0x2cb)][_0x421ee0(0x92d)]=function(){const _0x296059=_0x421ee0;return this['_actor']&&this[_0x296059(0x530)]['canUseItemCommand']();},Window_ActorCommand['prototype'][_0x421ee0(0x3a8)]=function(){const _0x460035=_0x421ee0,_0x393653=this[_0x460035(0x530)]['skillTypes']();for(const _0x19f12b of _0x393653){this[_0x460035(0x1a3)](_0x19f12b);}},Window_ActorCommand['prototype'][_0x421ee0(0x1a3)]=function(_0x2eae35){const _0x21cb0a=_0x421ee0;let _0x49c8f4=$dataSystem['skillTypes'][_0x2eae35];if(!_0x49c8f4)return;let _0x4ace34=_0x49c8f4;const _0x507d5a=this['commandStyle']();if(_0x507d5a===_0x21cb0a(0x3ab))_0x4ace34=_0x4ace34[_0x21cb0a(0x4ce)](/\x1I\[(\d+)\]/gi,''),_0x4ace34=_0x4ace34['replace'](/\\I\[(\d+)\]/gi,'');else{if(!_0x49c8f4['match'](/\\I\[(\d+)\]/i)){const _0x412108=Imported[_0x21cb0a(0x40b)]?VisuMZ[_0x21cb0a(0x79d)]['Settings'][_0x21cb0a(0x766)]:VisuMZ['BattleCore'][_0x21cb0a(0x57b)][_0x21cb0a(0x6fb)],_0x338fa2=$dataSystem[_0x21cb0a(0x6c7)][_0x21cb0a(0x7f2)](_0x2eae35),_0x1e48db=_0x338fa2?_0x412108[_0x21cb0a(0x38b)]:_0x412108[_0x21cb0a(0x450)];_0x4ace34=_0x21cb0a(0x1c6)['format'](_0x1e48db,_0x49c8f4);}}this[_0x21cb0a(0x63e)](_0x4ace34,_0x21cb0a(0x83c),!![],_0x2eae35);},Window_ActorCommand['prototype'][_0x421ee0(0x434)]=function(){const _0x1a22ba=_0x421ee0,_0x4b768f=this[_0x1a22ba(0x530)]['skillTypes'](),_0xdb6b39=this[_0x1a22ba(0x530)][_0x1a22ba(0x32c)]();for(const _0x58ac04 of _0xdb6b39){if(!_0x58ac04)continue;if(Imported['VisuMZ_1_SkillsStatesCore']){if(this['getSimilarSTypes'](_0x58ac04))continue;if(this[_0x1a22ba(0x86b)](_0x58ac04))continue;}else{if(!_0x4b768f[_0x1a22ba(0x7f2)](_0x58ac04['stypeId']))continue;}this[_0x1a22ba(0x20e)](_0x58ac04);}},Window_ActorCommand[_0x421ee0(0x2cb)]['getSimilarSTypes']=function(_0x5b6e9b){const _0x324301=_0x421ee0,_0x2f826e=this['_actor']['skillTypes'](),_0xb9f337=_0x2f826e[_0x324301(0x7ad)](_0x40f179=>DataManager[_0x324301(0x867)](_0x5b6e9b)['includes'](_0x40f179));return _0xb9f337[_0x324301(0x4be)]<=0x0;},Window_ActorCommand['prototype'][_0x421ee0(0x86b)]=function(_0x8c0338){const _0x5bd5ff=_0x421ee0;if(!Window_SkillList[_0x5bd5ff(0x2cb)][_0x5bd5ff(0x211)][_0x5bd5ff(0x8eb)](this,_0x8c0338))return!![];if(!Window_SkillList[_0x5bd5ff(0x2cb)][_0x5bd5ff(0x183)]['call'](this,_0x8c0338))return!![];if(!Window_SkillList[_0x5bd5ff(0x2cb)][_0x5bd5ff(0x77a)][_0x5bd5ff(0x8eb)](this,_0x8c0338))return!![];return![];},Window_ActorCommand['prototype'][_0x421ee0(0x20e)]=function(_0x510dd5){const _0x53b796=_0x421ee0;if(!_0x510dd5)return;if(!this[_0x53b796(0x4b4)](_0x510dd5))return;const _0x409aee=this[_0x53b796(0x91c)](),_0x4db10f=DataManager['battleCommandName'](_0x510dd5),_0x39d284=DataManager[_0x53b796(0x1a2)](_0x510dd5),_0x193915=_0x409aee===_0x53b796(0x3ab)?_0x4db10f:_0x53b796(0x1c6)['format'](_0x39d284,_0x4db10f),_0x3ac269=this['_actor'][_0x53b796(0x368)](_0x510dd5);this['addCommand'](_0x193915,_0x53b796(0x714),_0x3ac269,_0x510dd5['id']);},Window_ActorCommand[_0x421ee0(0x2cb)]['canAddSkillCommand']=function(_0x4dd293){const _0x33aa9a=_0x421ee0,_0x113d14=_0x4dd293['note'];if(_0x113d14[_0x33aa9a(0x5f2)](/<COMMAND REQUIRE LEARN>/i)){if(!this[_0x33aa9a(0x530)][_0x33aa9a(0x1cb)](_0x4dd293['id']))return![];}if(_0x113d14['match'](/<COMMAND REQUIRE ACCESS>/i)){if(!this[_0x33aa9a(0x530)][_0x33aa9a(0x7d4)](_0x4dd293['id']))return![];}const _0x3bad75=VisuMZ['BattleCore'][_0x33aa9a(0x4f1)](_0x4dd293,'CommandVisible');if(VisuMZ['BattleCore']['JS'][_0x3bad75]){if(!VisuMZ[_0x33aa9a(0x674)]['JS'][_0x3bad75]['call'](this,this[_0x33aa9a(0x530)],_0x4dd293))return![];}return VisuMZ['BattleCore'][_0x33aa9a(0x3cf)](_0x4dd293);},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x3cf)]=function(_0x33ffeb){const _0x593240=_0x421ee0,_0x5c4e68=_0x33ffeb[_0x593240(0x24c)];if(_0x5c4e68[_0x593240(0x5f2)](/<COMMAND SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x55df43=JSON[_0x593240(0x536)]('['+RegExp['$1'][_0x593240(0x5f2)](/\d+/g)+']');for(const _0x2a3d7e of _0x55df43){if(!$gameSwitches['value'](_0x2a3d7e))return![];}return!![];}if(_0x5c4e68[_0x593240(0x5f2)](/<COMMAND SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x37f5b2=JSON[_0x593240(0x536)]('['+RegExp['$1'][_0x593240(0x5f2)](/\d+/g)+']');for(const _0x49470a of _0x37f5b2){if(!$gameSwitches['value'](_0x49470a))return![];}return!![];}if(_0x5c4e68['match'](/<COMMAND SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1efc17=JSON[_0x593240(0x536)]('['+RegExp['$1'][_0x593240(0x5f2)](/\d+/g)+']');for(const _0x559113 of _0x1efc17){if($gameSwitches[_0x593240(0x667)](_0x559113))return!![];}return![];}if(_0x5c4e68['match'](/<COMMAND HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x53ab57=JSON['parse']('['+RegExp['$1'][_0x593240(0x5f2)](/\d+/g)+']');for(const _0xfbe36e of _0x53ab57){if(!$gameSwitches[_0x593240(0x667)](_0xfbe36e))return!![];}return![];}if(_0x5c4e68[_0x593240(0x5f2)](/<COMMAND HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2f0416=JSON[_0x593240(0x536)]('['+RegExp['$1'][_0x593240(0x5f2)](/\d+/g)+']');for(const _0x5e1431 of _0x2f0416){if(!$gameSwitches[_0x593240(0x667)](_0x5e1431))return!![];}return![];}if(_0x5c4e68[_0x593240(0x5f2)](/<COMMAND HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x597e7c=JSON['parse']('['+RegExp['$1'][_0x593240(0x5f2)](/\d+/g)+']');for(const _0x4daf5b of _0x597e7c){if($gameSwitches[_0x593240(0x667)](_0x4daf5b))return![];}return!![];}return!![];},Window_ActorCommand[_0x421ee0(0x2cb)]['addEscapeCommand']=function(){const _0x18e2e4=_0x421ee0,_0xc07380=this[_0x18e2e4(0x91c)](),_0x22c637=VisuMZ[_0x18e2e4(0x674)][_0x18e2e4(0x57b)][_0x18e2e4(0x30c)][_0x18e2e4(0x597)],_0x195be1=_0xc07380===_0x18e2e4(0x3ab)?TextManager[_0x18e2e4(0x5c8)]:_0x18e2e4(0x1c6)[_0x18e2e4(0x7d7)](_0x22c637,TextManager[_0x18e2e4(0x5c8)]),_0x598522=this['isEscapeCommandEnabled']();this[_0x18e2e4(0x63e)](_0x195be1,'escape',_0x598522);},Window_ActorCommand['prototype']['isEscapeCommandEnabled']=function(){const _0x4ca912=_0x421ee0;return BattleManager[_0x4ca912(0x70b)]();},Window_ActorCommand[_0x421ee0(0x2cb)][_0x421ee0(0x89c)]=function(){const _0x273341=_0x421ee0,_0x3dbdb6=this[_0x273341(0x91c)](),_0x2df0bc=VisuMZ['BattleCore'][_0x273341(0x57b)][_0x273341(0x30c)][_0x273341(0x726)],_0x46fd75=_0x3dbdb6===_0x273341(0x3ab)?TextManager[_0x273341(0x1c1)]:_0x273341(0x1c6)[_0x273341(0x7d7)](_0x2df0bc,TextManager[_0x273341(0x1c1)]),_0x3ae001=this[_0x273341(0x501)]();this[_0x273341(0x63e)](_0x46fd75,_0x273341(0x1c1),_0x3ae001);},Window_ActorCommand[_0x421ee0(0x2cb)][_0x421ee0(0x501)]=function(){return!![];},Window_ActorCommand[_0x421ee0(0x2cb)][_0x421ee0(0x3f0)]=function(){const _0xdd006a=_0x421ee0;return VisuMZ[_0xdd006a(0x674)][_0xdd006a(0x57b)][_0xdd006a(0x6fb)]['CmdTextAlign'];},Window_ActorCommand[_0x421ee0(0x2cb)]['drawItem']=function(_0x25b662){const _0x549ed2=_0x421ee0,_0x50ed2b=this[_0x549ed2(0x3fb)](_0x25b662);if(_0x50ed2b===_0x549ed2(0x80b))this[_0x549ed2(0x364)](_0x25b662);else _0x50ed2b===_0x549ed2(0x6a3)?this[_0x549ed2(0x36b)](_0x25b662):Window_Command[_0x549ed2(0x2cb)][_0x549ed2(0x485)][_0x549ed2(0x8eb)](this,_0x25b662);this[_0x549ed2(0x1a9)](_0x25b662);},Window_ActorCommand[_0x421ee0(0x2cb)][_0x421ee0(0x91c)]=function(){const _0x504fef=_0x421ee0;return VisuMZ[_0x504fef(0x674)][_0x504fef(0x57b)][_0x504fef(0x6fb)][_0x504fef(0x45f)];},Window_ActorCommand[_0x421ee0(0x2cb)][_0x421ee0(0x3fb)]=function(_0x5a1026){const _0x365ab9=_0x421ee0;if(_0x5a1026<0x0)return _0x365ab9(0x3ab);const _0x508999=this[_0x365ab9(0x91c)]();if(_0x508999!=='auto')return _0x508999;else{if(this[_0x365ab9(0x23f)]()>0x0){const _0x5d5511=this[_0x365ab9(0x256)](_0x5a1026);if(_0x5d5511[_0x365ab9(0x5f2)](/\\I\[(\d+)\]/i)){const _0xbbf25=this[_0x365ab9(0x2d8)](_0x5a1026),_0x4e18c6=this[_0x365ab9(0x668)](_0x5d5511)[_0x365ab9(0x62f)];return _0x4e18c6<=_0xbbf25['width']?_0x365ab9(0x80b):_0x365ab9(0x6a3);}}}return _0x365ab9(0x3ab);},Window_ActorCommand['prototype']['drawItemStyleIconText']=function(_0x3c7c28){const _0x24dc87=_0x421ee0,_0x2eb631=this[_0x24dc87(0x2d8)](_0x3c7c28),_0x467739=this['commandName'](_0x3c7c28),_0x245c26=this[_0x24dc87(0x668)](_0x467739)[_0x24dc87(0x62f)];this['changePaintOpacity'](this[_0x24dc87(0x621)](_0x3c7c28));const _0x3fcfb1=this[_0x24dc87(0x3f0)]();if(_0x3fcfb1==='right')this[_0x24dc87(0x56e)](_0x467739,_0x2eb631['x']+_0x2eb631[_0x24dc87(0x62f)]-_0x245c26,_0x2eb631['y'],_0x245c26);else{if(_0x3fcfb1===_0x24dc87(0x3bd)){const _0x5443e7=_0x2eb631['x']+Math['floor']((_0x2eb631[_0x24dc87(0x62f)]-_0x245c26)/0x2);this[_0x24dc87(0x56e)](_0x467739,_0x5443e7,_0x2eb631['y'],_0x245c26);}else this[_0x24dc87(0x56e)](_0x467739,_0x2eb631['x'],_0x2eb631['y'],_0x245c26);}},Window_ActorCommand[_0x421ee0(0x2cb)][_0x421ee0(0x36b)]=function(_0x384a4b){const _0x6b11b6=_0x421ee0;this['commandName'](_0x384a4b)[_0x6b11b6(0x5f2)](/\\I\[(\d+)\]/i);const _0x13b99c=Number(RegExp['$1'])||0x0,_0x154920=this[_0x6b11b6(0x2d8)](_0x384a4b),_0x1ec82d=_0x154920['x']+Math['floor']((_0x154920['width']-ImageManager[_0x6b11b6(0x28c)])/0x2),_0xbf26f3=_0x154920['y']+(_0x154920['height']-ImageManager[_0x6b11b6(0x3c0)])/0x2;this[_0x6b11b6(0x2fc)](_0x13b99c,_0x1ec82d,_0xbf26f3);},Window_ActorCommand['prototype'][_0x421ee0(0x1a9)]=function(_0x1f765d){const _0x50ae39=_0x421ee0;if(!(VisuMZ[_0x50ae39(0x674)][_0x50ae39(0x57b)][_0x50ae39(0x6fb)]['ShowCosts']??!![]))return;const _0x43ca01=this['commandSymbol'](_0x1f765d);if(![_0x50ae39(0x8fc),_0x50ae39(0x7f3),'singleSkill'][_0x50ae39(0x7f2)](_0x43ca01))return;const _0x55757e=this[_0x50ae39(0x2d8)](_0x1f765d);let _0xa7eb1e=null;if(_0x43ca01===_0x50ae39(0x8fc))_0xa7eb1e=$dataSkills[this[_0x50ae39(0x530)]['attackSkillId']()];else _0x43ca01===_0x50ae39(0x7f3)?_0xa7eb1e=$dataSkills[this['_actor'][_0x50ae39(0x64a)]()]:_0xa7eb1e=$dataSkills[this['_list'][_0x1f765d][_0x50ae39(0x725)]];this[_0x50ae39(0x5a0)](this['_actor'],_0xa7eb1e,_0x55757e['x'],_0x55757e['y'],_0x55757e['width']);},Window_ActorCommand['prototype'][_0x421ee0(0x5a0)]=function(_0x4ec40e,_0x31ed48,_0x358183,_0x46b1b2,_0x4b00d7){const _0x53d85e=_0x421ee0;if(!_0x31ed48)return;Imported[_0x53d85e(0x40b)]?Window_Command[_0x53d85e(0x2cb)]['drawSkillCost'][_0x53d85e(0x8eb)](this,_0x4ec40e,_0x31ed48,_0x358183,_0x46b1b2,_0x4b00d7):Window_SkillList[_0x53d85e(0x2cb)]['drawSkillCost'][_0x53d85e(0x8eb)](this,_0x31ed48,_0x358183,_0x46b1b2,_0x4b00d7);},Window_ActorCommand[_0x421ee0(0x2cb)][_0x421ee0(0x405)]=function(){},Window_ActorCommand[_0x421ee0(0x2cb)]['activate']=function(){const _0x49867d=_0x421ee0;Window_Command[_0x49867d(0x2cb)][_0x49867d(0x531)][_0x49867d(0x8eb)](this);const _0x3c8041=this['battleLayoutStyle']();_0x3c8041===_0x49867d(0x633)&&this['showHelpWindow']();},Window_ActorCommand[_0x421ee0(0x2cb)]['battleLayoutStyle']=function(){const _0x15e72c=_0x421ee0;if(this['_battleLayoutStyle'])return this[_0x15e72c(0x42c)];return this[_0x15e72c(0x42c)]=SceneManager[_0x15e72c(0x855)][_0x15e72c(0x885)](),this[_0x15e72c(0x42c)];},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x386)]=Window_ActorCommand['prototype'][_0x421ee0(0x578)],Window_ActorCommand['prototype'][_0x421ee0(0x578)]=function(_0x4bcbe1){const _0x59ff39=_0x421ee0,_0x20641e=this[_0x59ff39(0x885)]();if(_0x4bcbe1&&['xp','portrait'][_0x59ff39(0x7f2)](_0x20641e))this['resizeWindowXPStyle'](_0x4bcbe1);else _0x4bcbe1&&[_0x59ff39(0x633)][_0x59ff39(0x7f2)](_0x20641e)&&(this[_0x59ff39(0x4c8)](_0x4bcbe1),this[_0x59ff39(0x4da)]());VisuMZ[_0x59ff39(0x674)][_0x59ff39(0x386)][_0x59ff39(0x8eb)](this,_0x4bcbe1),_0x4bcbe1&&$gameTroop[_0x59ff39(0x84a)]()[_0x59ff39(0x4be)]>0x0&&_0x4bcbe1[_0x59ff39(0x35a)]()&&_0x4bcbe1[_0x59ff39(0x35a)]()['stepForward']();},Window_ActorCommand['prototype'][_0x421ee0(0x321)]=function(_0x2bcb9f){const _0x28087d=_0x421ee0,_0x5724b7=Math[_0x28087d(0x38a)](Graphics['boxWidth']/0x3),_0x4904a2=Math[_0x28087d(0x38a)](Graphics[_0x28087d(0x733)]/$gameParty[_0x28087d(0x7a9)]()[_0x28087d(0x4be)]),_0x5412a7=Math['min'](_0x5724b7,_0x4904a2),_0x1b79ad=this['fittingHeight'](VisuMZ[_0x28087d(0x674)][_0x28087d(0x57b)][_0x28087d(0x772)][_0x28087d(0x1c7)]),_0x10a1cd=_0x4904a2*_0x2bcb9f['index']()+(_0x4904a2-_0x5412a7)/0x2,_0x126bcb=SceneManager[_0x28087d(0x855)][_0x28087d(0x1df)]['y']-_0x1b79ad;this[_0x28087d(0x1ba)](_0x10a1cd,_0x126bcb,_0x5412a7,_0x1b79ad),this[_0x28087d(0x2e9)](),this['setBackgroundType'](0x1);},Window_ActorCommand[_0x421ee0(0x2cb)][_0x421ee0(0x4c8)]=function(_0x422430){const _0x54a965=_0x421ee0,_0x3dbe87=SceneManager[_0x54a965(0x855)][_0x54a965(0x573)]();this[_0x54a965(0x1ba)](_0x3dbe87['x'],_0x3dbe87['y'],_0x3dbe87[_0x54a965(0x62f)],_0x3dbe87[_0x54a965(0x6b2)]),this[_0x54a965(0x2e9)](),this['setBackgroundType'](0x0);},Window_ActorCommand[_0x421ee0(0x2cb)]['refreshDimmerBitmap']=function(){const _0x5a0540=_0x421ee0;if(this[_0x5a0540(0x8c5)]){const _0x31c218=this[_0x5a0540(0x8c5)][_0x5a0540(0x82a)],_0x211aae=this['width']-0x8,_0x3852a4=this[_0x5a0540(0x6b2)],_0x2d675e=this[_0x5a0540(0x6f6)],_0x20e077=ColorManager[_0x5a0540(0x270)](),_0x408868=ColorManager[_0x5a0540(0x86d)]();this[_0x5a0540(0x8c5)]['x']=0x4,_0x31c218['resize'](_0x211aae,_0x3852a4),_0x31c218[_0x5a0540(0x924)](0x0,0x0,_0x211aae,_0x2d675e,_0x408868,_0x20e077,!![]),_0x31c218[_0x5a0540(0x3b2)](0x0,_0x2d675e,_0x211aae,_0x3852a4-_0x2d675e*0x2,_0x20e077),_0x31c218[_0x5a0540(0x924)](0x0,_0x3852a4-_0x2d675e,_0x211aae,_0x2d675e,_0x20e077,_0x408868,!![]),this[_0x5a0540(0x8c5)][_0x5a0540(0x350)](0x0,0x0,_0x211aae,_0x3852a4);}},Window_ActorCommand[_0x421ee0(0x2cb)][_0x421ee0(0x77e)]=function(){const _0x14ce5e=_0x421ee0;if(!this[_0x14ce5e(0x530)])return;const _0xe5e948=VisuMZ['BattleCore'][_0x14ce5e(0x57b)]['ActorCmd'],_0x23d125=this['currentSymbol']();switch(_0x23d125){case'attack':this[_0x14ce5e(0x2d1)]($dataSkills[this[_0x14ce5e(0x530)][_0x14ce5e(0x2a7)]()]);break;case _0x14ce5e(0x7f3):this[_0x14ce5e(0x2d1)]($dataSkills[this[_0x14ce5e(0x530)][_0x14ce5e(0x64a)]()]);break;case'skill':const _0x1d8aed=_0xe5e948[_0x14ce5e(0x60b)],_0x851ca7=_0x1d8aed[_0x14ce5e(0x7d7)]($dataSystem[_0x14ce5e(0x452)][this[_0x14ce5e(0x874)]()]);this['_helpWindow'][_0x14ce5e(0x1da)](_0x851ca7);break;case _0x14ce5e(0x714):this[_0x14ce5e(0x2d1)]($dataSkills[this[_0x14ce5e(0x874)]()]);break;case _0x14ce5e(0x8f0):this[_0x14ce5e(0x8c1)][_0x14ce5e(0x1da)](_0xe5e948[_0x14ce5e(0x408)]);break;case _0x14ce5e(0x5c8):this[_0x14ce5e(0x8c1)][_0x14ce5e(0x1da)](_0xe5e948[_0x14ce5e(0x40c)]);break;case'autoBattle':this['_helpWindow'][_0x14ce5e(0x1da)](_0xe5e948['HelpAutoBattle']);break;default:this['_helpWindow']['setText']('');break;}},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x22e)]=Window_BattleStatus[_0x421ee0(0x2cb)][_0x421ee0(0x792)],Window_BattleStatus[_0x421ee0(0x2cb)][_0x421ee0(0x792)]=function(_0x34afdb){const _0x2f4f59=_0x421ee0;VisuMZ[_0x2f4f59(0x674)][_0x2f4f59(0x22e)][_0x2f4f59(0x8eb)](this,_0x34afdb),this['initBattleCore'](),this[_0x2f4f59(0x779)]();},Window_BattleStatus[_0x421ee0(0x2cb)]['battleLayoutStyle']=function(){const _0x22c3ba=_0x421ee0;if(this['_battleLayoutStyle'])return this[_0x22c3ba(0x42c)];return this[_0x22c3ba(0x42c)]=SceneManager[_0x22c3ba(0x855)]['battleLayoutStyle'](),this[_0x22c3ba(0x42c)];},Window_BattleStatus[_0x421ee0(0x2cb)][_0x421ee0(0x7b5)]=function(){const _0x14ef5e=_0x421ee0;this['frameVisible']=this[_0x14ef5e(0x174)]();const _0x343cc8=VisuMZ['BattleCore'][_0x14ef5e(0x57b)]['BattleLayout'];_0x343cc8['StatusWindowSkinHide']&&(this[_0x14ef5e(0x3d5)]=0x0);},Window_BattleStatus[_0x421ee0(0x2cb)]['isFrameVisible']=function(){const _0x33a142=_0x421ee0,_0x3465f7=VisuMZ['BattleCore'][_0x33a142(0x57b)][_0x33a142(0x772)];if(_0x3465f7['StatusWindowSkinFilename'])return!![];const _0x5f5884=this[_0x33a142(0x885)]();switch(_0x5f5884){case _0x33a142(0x5c1):case _0x33a142(0x633):return!![];break;case _0x33a142(0x511):case'xp':case _0x33a142(0x332):default:return![];break;}},Window_BattleStatus[_0x421ee0(0x2cb)][_0x421ee0(0x759)]=function(){const _0x4e9ad2=_0x421ee0;return this[_0x4e9ad2(0x174)]()?0x0:0xa;},Window_BattleStatus[_0x421ee0(0x2cb)]['maxCols']=function(){const _0x22fb50=_0x421ee0,_0xcffbbb=this[_0x22fb50(0x885)]();switch(_0xcffbbb){case _0x22fb50(0x5c1):return 0x1;break;case'xp':case _0x22fb50(0x332):return $gameParty[_0x22fb50(0x7a9)]()[_0x22fb50(0x4be)];break;case'default':default:return $gameParty[_0x22fb50(0x323)]();break;}},Window_BattleStatus['prototype']['itemHeight']=function(){const _0x5af6eb=_0x421ee0,_0x3f7f3b=this[_0x5af6eb(0x885)]();switch(_0x3f7f3b){case'list':return Window_StatusBase[_0x5af6eb(0x2cb)][_0x5af6eb(0x7a6)][_0x5af6eb(0x8eb)](this);break;case _0x5af6eb(0x511):case'xp':case'portrait':default:return this[_0x5af6eb(0x30a)];break;}},Window_BattleStatus[_0x421ee0(0x2cb)][_0x421ee0(0x51d)]=function(){const _0x53cbb0=_0x421ee0,_0x4cf45a=this[_0x53cbb0(0x885)]();switch(_0x4cf45a){case _0x53cbb0(0x5c1):return Window_StatusBase[_0x53cbb0(0x2cb)][_0x53cbb0(0x51d)]['call'](this);break;case'default':case'xp':case'portrait':default:return 0x0;break;}},Window_BattleStatus[_0x421ee0(0x2cb)][_0x421ee0(0x21a)]=function(){const _0x5cc99c=_0x421ee0;this[_0x5cc99c(0x174)]()?Window_StatusBase[_0x5cc99c(0x2cb)]['updatePadding'][_0x5cc99c(0x8eb)](this):this[_0x5cc99c(0x6f6)]=0x8;},Window_BattleStatus[_0x421ee0(0x2cb)]['loadWindowskin']=function(){const _0x1a24f5=_0x421ee0,_0x2804a5=VisuMZ[_0x1a24f5(0x674)]['Settings'][_0x1a24f5(0x772)];_0x2804a5[_0x1a24f5(0x4dc)]?this[_0x1a24f5(0x6f5)]=ImageManager[_0x1a24f5(0x932)](_0x2804a5[_0x1a24f5(0x4dc)]):Window_StatusBase[_0x1a24f5(0x2cb)][_0x1a24f5(0x820)][_0x1a24f5(0x8eb)](this);},Window_BattleStatus['prototype'][_0x421ee0(0x514)]=function(_0xd4fc18){const _0x19e88c=_0x421ee0,_0x4808f7=VisuMZ[_0x19e88c(0x674)][_0x19e88c(0x57b)]['BattleLayout'];if(_0x4808f7[_0x19e88c(0x5d8)])return;Window_StatusBase[_0x19e88c(0x2cb)][_0x19e88c(0x514)][_0x19e88c(0x8eb)](this,_0xd4fc18);},Window_BattleStatus[_0x421ee0(0x2cb)]['requestRefresh']=function(){this['_requestRefresh']=!![];},Window_BattleStatus['prototype'][_0x421ee0(0x53e)]=function(){const _0x10913d=_0x421ee0;Window_StatusBase[_0x10913d(0x2cb)][_0x10913d(0x53e)][_0x10913d(0x8eb)](this),this[_0x10913d(0x213)](),this[_0x10913d(0x7eb)]();if(this[_0x10913d(0x885)]()===_0x10913d(0x633))this[_0x10913d(0x8ae)]();},Window_BattleStatus[_0x421ee0(0x2cb)][_0x421ee0(0x213)]=function(){const _0x15d207=_0x421ee0;if($gameTemp['isBattleRefreshRequested']())this[_0x15d207(0x6ce)](),this['_requestRefresh']=![];else this[_0x15d207(0x401)]&&(this[_0x15d207(0x401)]=![],this['refresh'](),this[_0x15d207(0x4eb)]());},Window_BattleStatus[_0x421ee0(0x2cb)]['show']=function(){const _0x208aca=_0x421ee0;Window_StatusBase[_0x208aca(0x2cb)][_0x208aca(0x449)]['call'](this);if(!$gameSystem['isSideView']())this[_0x208aca(0x214)]();},Window_BattleStatus[_0x421ee0(0x2cb)][_0x421ee0(0x405)]=function(){const _0x13f100=_0x421ee0;if(this['constructor']===Window_BattleStatus)return;Window_StatusBase[_0x13f100(0x2cb)][_0x13f100(0x405)]['call'](this);},Window_BattleStatus[_0x421ee0(0x2cb)]['drawBackgroundRect']=function(_0x5dd249){const _0x2a973b=_0x421ee0,_0x491cbe=this[_0x2a973b(0x885)]();switch(_0x491cbe){case'xp':case _0x2a973b(0x332):break;case'default':case _0x2a973b(0x5c1):case _0x2a973b(0x633):default:return Window_StatusBase[_0x2a973b(0x2cb)]['drawBackgroundRect'][_0x2a973b(0x8eb)](this,_0x5dd249);break;}},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x8c2)]=Window_BattleStatus[_0x421ee0(0x2cb)][_0x421ee0(0x443)],Window_BattleStatus[_0x421ee0(0x2cb)][_0x421ee0(0x443)]=function(_0x3de56c){const _0x42bd78=_0x421ee0,_0x57dbba=this['battleLayoutStyle']();switch(_0x57dbba){case _0x42bd78(0x5c1):this['drawItemImageListStyle'](_0x3de56c);break;case'xp':this['drawItemImageXPStyle'](_0x3de56c);break;case _0x42bd78(0x332):this['drawItemImagePortraitStyle'](_0x3de56c);break;case _0x42bd78(0x511):case _0x42bd78(0x633):default:VisuMZ[_0x42bd78(0x674)][_0x42bd78(0x8c2)][_0x42bd78(0x8eb)](this,_0x3de56c);break;}},Window_BattleStatus['prototype'][_0x421ee0(0x6e8)]=function(_0x4b50df){const _0x5a3b5f=_0x421ee0,_0x16b6d7=this['battleLayoutStyle']();if(!$gameSystem['isSideView']())this['centerFrontViewSprite'](_0x4b50df);switch(_0x16b6d7){case _0x5a3b5f(0x5c1):this[_0x5a3b5f(0x639)](_0x4b50df);break;case'xp':case _0x5a3b5f(0x332):case _0x5a3b5f(0x511):case _0x5a3b5f(0x633):default:this['drawItemStatusXPStyle'](_0x4b50df);break;}},Window_BattleStatus[_0x421ee0(0x2cb)]['refreshCursor']=function(){const _0x56cce8=_0x421ee0,_0x1b6277=this[_0x56cce8(0x885)]();if(['xp'][_0x56cce8(0x7f2)](_0x1b6277)&&!$gameSystem[_0x56cce8(0x649)]()){this['setCursorRect'](0x0,0x0,0x0,0x0);return;}Window_StatusBase[_0x56cce8(0x2cb)]['refreshCursor'][_0x56cce8(0x8eb)](this);},Window_BattleStatus[_0x421ee0(0x2cb)][_0x421ee0(0x4b2)]=function(_0x409532){const _0x51bc34=_0x421ee0,_0x2bafef=this[_0x51bc34(0x41c)](_0x409532)[_0x51bc34(0x35a)]();if(!_0x2bafef)return;const _0x3bc81a=this[_0x51bc34(0x885)](),_0x46d7d6=this[_0x51bc34(0x7db)](_0x409532);let _0x59711a=Math[_0x51bc34(0x38a)](_0x46d7d6['x']+_0x46d7d6[_0x51bc34(0x62f)]/0x2);['list'][_0x51bc34(0x7f2)](_0x3bc81a)&&(_0x59711a=_0x46d7d6[_0x51bc34(0x62f)]/$gameParty[_0x51bc34(0x7a9)]()[_0x51bc34(0x4be)],_0x59711a*=_0x409532,_0x59711a+=_0x46d7d6[_0x51bc34(0x62f)]/$gameParty[_0x51bc34(0x7a9)]()[_0x51bc34(0x4be)]/0x2);let _0x1a5fb6=Math['round'](this[_0x51bc34(0x52f)](_0x409532,_0x2bafef,_0x46d7d6));_0x2bafef[_0x51bc34(0x638)](_0x59711a,_0x1a5fb6),this[_0x51bc34(0x793)](_0x2bafef,0x1),_0x2bafef[_0x51bc34(0x449)]();},Window_BattleStatus[_0x421ee0(0x2cb)][_0x421ee0(0x52f)]=function(_0x37b3ea,_0x273431,_0x1f3d95){const _0x253112=_0x421ee0,_0x41b440=VisuMZ[_0x253112(0x674)]['Settings'][_0x253112(0x772)],_0x57fbc9=this[_0x253112(0x885)]();if(_0x57fbc9==='xp'){const _0x24e1f3=_0x41b440['XPSpriteYLocation'];switch(_0x24e1f3['toLowerCase']()['trim']()){case _0x253112(0x53b):return _0x1f3d95[_0x253112(0x6b2)]-_0x273431[_0x253112(0x523)][_0x253112(0x6b2)]/0x4;break;case _0x253112(0x3bd):const _0x44ec88=_0x41b440[_0x253112(0x627)];return(_0x1f3d95[_0x253112(0x6b2)]+(_0x273431['height']||_0x44ec88))/0x2;break;case _0x253112(0x612):return 0x0;case _0x253112(0x4ec):default:return this[_0x253112(0x63b)](_0x1f3d95);break;}}else{if(_0x57fbc9===_0x253112(0x332)){}}return _0x273431[_0x253112(0x6b2)];},Window_BattleStatus['prototype'][_0x421ee0(0x659)]=function(_0x4c06e4){const _0x297ba3=_0x421ee0;if(!VisuMZ['BattleCore']['Settings'][_0x297ba3(0x772)][_0x297ba3(0x2ef)])return;const _0x18ad06=this['actor'](_0x4c06e4),_0x35e247=this[_0x297ba3(0x7db)](_0x4c06e4);_0x35e247['width']=ImageManager[_0x297ba3(0x31f)],_0x35e247['height']-=0x2,this[_0x297ba3(0x52a)](_0x18ad06,_0x35e247['x']+0x1,_0x35e247['y']+0x1,_0x35e247[_0x297ba3(0x62f)],_0x35e247[_0x297ba3(0x6b2)]);},Window_BattleStatus[_0x421ee0(0x2cb)][_0x421ee0(0x639)]=function(_0x58de68){const _0x3bb5dc=_0x421ee0,_0x4946dc=VisuMZ[_0x3bb5dc(0x674)][_0x3bb5dc(0x57b)][_0x3bb5dc(0x772)],_0x129cba=$dataSystem['optDisplayTp']?0x4:0x3,_0x409e5d=_0x129cba*0x80+(_0x129cba-0x1)*0x8+0x4,_0x114bbe=this[_0x3bb5dc(0x41c)](_0x58de68),_0x5e77ff=this[_0x3bb5dc(0x7db)](_0x58de68);let _0x2d914f=_0x5e77ff['x']+this[_0x3bb5dc(0x6f6)];_0x4946dc['ShowFacesListStyle']?_0x2d914f=_0x5e77ff['x']+ImageManager[_0x3bb5dc(0x31f)]+0x8:_0x2d914f+=ImageManager[_0x3bb5dc(0x28c)];const _0x34d09e=Math['round'](Math[_0x3bb5dc(0x72a)](_0x5e77ff['x']+_0x5e77ff[_0x3bb5dc(0x62f)]-_0x409e5d,_0x2d914f)),_0x4384ac=Math[_0x3bb5dc(0x38a)](_0x5e77ff['y']+(_0x5e77ff[_0x3bb5dc(0x6b2)]-Sprite_Name[_0x3bb5dc(0x2cb)]['bitmapHeight']())/0x2),_0x351105=Math[_0x3bb5dc(0x38a)](_0x34d09e-ImageManager['iconWidth']/0x2-0x4),_0x48bb6e=Math['round'](_0x5e77ff['y']+(_0x5e77ff['height']-ImageManager[_0x3bb5dc(0x3c0)])/0x2+ImageManager['iconHeight']/0x2);let _0x18beac=_0x34d09e+0x88;const _0x4bd24a=_0x4384ac;this[_0x3bb5dc(0x284)](_0x114bbe,_0x34d09e-0x4+(_0x4946dc[_0x3bb5dc(0x217)]||0x0),_0x4384ac+(_0x4946dc[_0x3bb5dc(0x4bc)]||0x0)),this[_0x3bb5dc(0x7f4)](_0x114bbe,_0x34d09e+(_0x4946dc['NameOffsetX']||0x0),_0x4384ac+(_0x4946dc[_0x3bb5dc(0x328)]||0x0)),this['placeStateIcon'](_0x114bbe,_0x351105+(_0x4946dc[_0x3bb5dc(0x50c)]||0x0),_0x48bb6e+(_0x4946dc[_0x3bb5dc(0x71a)]||0x0)),this['placeGauge'](_0x114bbe,'hp',_0x18beac+0x88*0x0+(_0x4946dc[_0x3bb5dc(0x7a0)]||0x0),_0x4bd24a+(_0x4946dc['HpGaugeOffsetY']||0x0)),this[_0x3bb5dc(0x7a8)](_0x114bbe,'mp',_0x18beac+0x88*0x1+(_0x4946dc[_0x3bb5dc(0x48d)]||0x0),_0x4bd24a+(_0x4946dc[_0x3bb5dc(0x2ab)]||0x0)),$dataSystem[_0x3bb5dc(0x5b3)]&&this['placeGauge'](_0x114bbe,'tp',_0x18beac+0x88*0x2+(_0x4946dc[_0x3bb5dc(0x7ab)]||0x0),_0x4bd24a+(_0x4946dc['TpGaugeOffsetY']||0x0));},Window_BattleStatus['prototype'][_0x421ee0(0x380)]=function(_0x4a5e83){const _0x49d63b=_0x421ee0;if(!$gameSystem[_0x49d63b(0x649)]())return;VisuMZ[_0x49d63b(0x674)]['Window_BattleStatus_drawItemImage']['call'](this,_0x4a5e83);},Window_BattleStatus[_0x421ee0(0x2cb)]['drawItemStatusXPStyle']=function(_0x26dab5){const _0x5dc439=_0x421ee0,_0x3f8def=VisuMZ[_0x5dc439(0x674)][_0x5dc439(0x57b)][_0x5dc439(0x772)],_0x7323c4=this[_0x5dc439(0x41c)](_0x26dab5),_0x20bd7e=this[_0x5dc439(0x7db)](_0x26dab5),_0xae5d3f=Math[_0x5dc439(0x38a)](_0x20bd7e['x']+(_0x20bd7e['width']-0x80)/0x2),_0x2a45d0=this[_0x5dc439(0x63b)](_0x20bd7e);let _0x2175c3=_0xae5d3f-ImageManager[_0x5dc439(0x28c)]/0x2-0x4,_0x1b942d=_0x2a45d0+ImageManager['iconHeight']/0x2;_0x2175c3-ImageManager['iconWidth']/0x2<_0x20bd7e['x']&&(_0x2175c3=_0xae5d3f+ImageManager['iconWidth']/0x2-0x4,_0x1b942d=_0x2a45d0-ImageManager['iconHeight']/0x2);const _0x17a15a=_0xae5d3f,_0x3a1ca1=this['basicGaugesY'](_0x20bd7e);this[_0x5dc439(0x284)](_0x7323c4,_0xae5d3f+(_0x3f8def[_0x5dc439(0x217)]||0x0),_0x2a45d0+(_0x3f8def[_0x5dc439(0x4bc)]||0x0)),this[_0x5dc439(0x7f4)](_0x7323c4,_0xae5d3f+(_0x3f8def[_0x5dc439(0x367)]||0x0),_0x2a45d0+(_0x3f8def[_0x5dc439(0x328)]||0x0)),this[_0x5dc439(0x461)](_0x7323c4,_0x2175c3+(_0x3f8def['StateIconOffsetX']||0x0),_0x1b942d+(_0x3f8def[_0x5dc439(0x71a)]||0x0)),this[_0x5dc439(0x7a8)](_0x7323c4,'hp',_0x17a15a+(_0x3f8def['HpGaugeOffsetX']||0x0),_0x3a1ca1+(_0x3f8def[_0x5dc439(0x78a)]||0x0)),this[_0x5dc439(0x7a8)](_0x7323c4,'mp',_0x17a15a+(_0x3f8def['MpGaugeOffsetX']||0x0),_0x3a1ca1+this[_0x5dc439(0x913)]()+(_0x3f8def['MpGaugeOffsetY']||0x0)),$dataSystem[_0x5dc439(0x5b3)]&&this[_0x5dc439(0x7a8)](_0x7323c4,'tp',_0x17a15a+(_0x3f8def[_0x5dc439(0x7ab)]||0x0),_0x3a1ca1+this[_0x5dc439(0x913)]()*0x2+(_0x3f8def[_0x5dc439(0x201)]||0x0));},Window_BattleStatus[_0x421ee0(0x2cb)]['showPortraits']=function(_0x5dfd70){const _0x1bc81d=_0x421ee0;if(!VisuMZ[_0x1bc81d(0x674)][_0x1bc81d(0x57b)]['BattleLayout'][_0x1bc81d(0x8b5)])return![];if(_0x5dfd70['getBattlePortrait']())return!![];return Imported[_0x1bc81d(0x472)]&&_0x5dfd70[_0x1bc81d(0x554)]();},Game_Actor[_0x421ee0(0x2cb)][_0x421ee0(0x372)]=function(){const _0x437051=_0x421ee0;if(this[_0x437051(0x41c)]()[_0x437051(0x24c)][_0x437051(0x5f2)](/<BATTLE (?:IMAGE|PORTRAIT) OFFSET X:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this['actor']()['note']['match'](/<BATTLE (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);}return 0x0;},Game_Actor[_0x421ee0(0x2cb)]['getBattlePortraitOffsetY']=function(){const _0x45eef5=_0x421ee0;if(this[_0x45eef5(0x41c)]()['note'][_0x45eef5(0x5f2)](/<BATTLE (?:IMAGE|PORTRAIT) OFFSET Y:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this[_0x45eef5(0x41c)]()['note'][_0x45eef5(0x5f2)](/<BATTLE (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return Number(RegExp['$2']);}return 0x0;},Window_BattleStatus[_0x421ee0(0x2cb)][_0x421ee0(0x413)]=function(_0x4d53cf){const _0x46e2c7=_0x421ee0,_0xac6a5f=this[_0x46e2c7(0x41c)](_0x4d53cf);if(this[_0x46e2c7(0x637)](_0xac6a5f)){const _0x53e188=_0x46e2c7(0x2e7)['format'](_0xac6a5f['actorId']()),_0x5f2693=this['createInnerPortrait'](_0x53e188,Sprite),_0x23bbdc=_0xac6a5f[_0x46e2c7(0x8d3)]();_0x23bbdc!==''?_0x5f2693[_0x46e2c7(0x82a)]=ImageManager[_0x46e2c7(0x39e)](_0x23bbdc):_0x5f2693[_0x46e2c7(0x82a)]=ImageManager['_emptyBitmap'];const _0x4d1414=this['itemRect'](_0x4d53cf);_0x5f2693[_0x46e2c7(0x5d1)]['x']=0.5,_0x5f2693[_0x46e2c7(0x5d1)]['y']=0x1;let _0x37e799=Math[_0x46e2c7(0x38a)](_0x4d1414['x']+_0x4d1414['width']/0x2)+this[_0x46e2c7(0x6f6)];_0x37e799+=_0xac6a5f[_0x46e2c7(0x372)]();let _0xd50f1e=Math[_0x46e2c7(0x38a)](this[_0x46e2c7(0x6b2)]);_0xd50f1e+=_0xac6a5f[_0x46e2c7(0x651)](),_0x5f2693[_0x46e2c7(0x1ba)](_0x37e799,_0xd50f1e);const _0x5b89de=VisuMZ[_0x46e2c7(0x674)][_0x46e2c7(0x57b)][_0x46e2c7(0x772)][_0x46e2c7(0x39d)];_0x5f2693[_0x46e2c7(0x2b7)]['x']=_0x5b89de,_0x5f2693['scale']['y']=_0x5b89de,_0x5f2693[_0x46e2c7(0x449)]();}else{const _0x1840f5=this[_0x46e2c7(0x2ed)](_0x4d53cf);this[_0x46e2c7(0x52a)](_0xac6a5f,_0x1840f5['x'],_0x1840f5['y'],_0x1840f5[_0x46e2c7(0x62f)],_0x1840f5[_0x46e2c7(0x6b2)]);}},Window_BattleStatus[_0x421ee0(0x2cb)][_0x421ee0(0x5d0)]=function(_0x36348f,_0x304280){const _0x2de69e=_0x421ee0,_0x3ce951=this[_0x2de69e(0x702)];if(_0x3ce951[_0x36348f])return _0x3ce951[_0x36348f];else{const _0x100f35=new _0x304280();return _0x3ce951[_0x36348f]=_0x100f35,this['addChildToBack'](_0x100f35),this['addChildToBack'](this['_cursorArea']),_0x100f35;}},Window_BattleStatus[_0x421ee0(0x2cb)][_0x421ee0(0x6b6)]=function(){const _0x40c2ff=_0x421ee0;this[_0x40c2ff(0x75c)](),this[_0x40c2ff(0x3c6)](),Window_StatusBase['prototype']['_createClientArea'][_0x40c2ff(0x8eb)](this),this['_createDamageContainer']();},Window_BattleStatus[_0x421ee0(0x2cb)][_0x421ee0(0x75c)]=function(){const _0x5d6f9f=_0x421ee0;this[_0x5d6f9f(0x4b1)]=new Sprite(),this['_cursorArea'][_0x5d6f9f(0x5d5)]=[new PIXI[(_0x5d6f9f(0x5d5))][(_0x5d6f9f(0x21d))]()],this[_0x5d6f9f(0x4b1)]['filterArea']=new Rectangle(),this[_0x5d6f9f(0x4b1)]['move'](this[_0x5d6f9f(0x362)],this[_0x5d6f9f(0x362)]),this[_0x5d6f9f(0x658)](this['_cursorArea']);},Window_BattleStatus[_0x421ee0(0x2cb)][_0x421ee0(0x3c6)]=function(){const _0x12ddad=_0x421ee0;this[_0x12ddad(0x16b)]=new Sprite(),this[_0x12ddad(0x658)](this['_effectsContainer']);},Window_BattleStatus[_0x421ee0(0x2cb)]['_createDamageContainer']=function(){const _0x46cfd9=_0x421ee0;this[_0x46cfd9(0x428)]=new Sprite(),this['addChild'](this[_0x46cfd9(0x428)]);},Window_BattleStatus[_0x421ee0(0x2cb)]['_createCursorSprite']=function(){const _0x392ef8=_0x421ee0;this[_0x392ef8(0x458)]=new Sprite();for(let _0x187a66=0x0;_0x187a66<0x9;_0x187a66++){this[_0x392ef8(0x458)][_0x392ef8(0x658)](new Sprite());}this[_0x392ef8(0x4b1)][_0x392ef8(0x658)](this[_0x392ef8(0x458)]);},Window_BattleStatus[_0x421ee0(0x2cb)][_0x421ee0(0x7d2)]=function(){const _0x18687f=_0x421ee0;Window_StatusBase[_0x18687f(0x2cb)][_0x18687f(0x7d2)][_0x18687f(0x8eb)](this),this['_updateCursorArea']();},Window_BattleStatus[_0x421ee0(0x2cb)]['_updateCursorArea']=function(){const _0x3435d5=_0x421ee0,_0xdadbab=this[_0x3435d5(0x362)];this['_cursorArea'][_0x3435d5(0x1ba)](_0xdadbab,_0xdadbab),this[_0x3435d5(0x4b1)]['x']=_0xdadbab-this[_0x3435d5(0x79c)]['x'],this[_0x3435d5(0x4b1)]['y']=_0xdadbab-this[_0x3435d5(0x79c)]['y'],this[_0x3435d5(0x641)]>0x0&&this[_0x3435d5(0x30a)]>0x0?this[_0x3435d5(0x4b1)][_0x3435d5(0x3b9)]=this['isOpen']():this[_0x3435d5(0x4b1)][_0x3435d5(0x3b9)]=![];},Window_BattleStatus['prototype']['_updateFilterArea']=function(){const _0x472473=_0x421ee0;Window_StatusBase[_0x472473(0x2cb)][_0x472473(0x3a6)][_0x472473(0x8eb)](this),this[_0x472473(0x6c1)]();},Window_BattleStatus['prototype'][_0x421ee0(0x6c1)]=function(){const _0x3fac64=_0x421ee0,_0x23132e=this['_cursorArea'][_0x3fac64(0x6f7)][_0x3fac64(0x3e8)](new Point(0x0,0x0)),_0x4c5e07=this[_0x3fac64(0x4b1)][_0x3fac64(0x8a7)];_0x4c5e07['x']=_0x23132e['x']+this[_0x3fac64(0x79c)]['x'],_0x4c5e07['y']=_0x23132e['y']+this[_0x3fac64(0x79c)]['y'],_0x4c5e07[_0x3fac64(0x62f)]=this['innerWidth'],_0x4c5e07[_0x3fac64(0x6b2)]=this[_0x3fac64(0x30a)];},Window_BattleStatus[_0x421ee0(0x2cb)][_0x421ee0(0x56b)]=function(_0x105356){const _0x1037d5=_0x421ee0;if(this['battleLayoutStyle']()!==_0x1037d5(0x332))return;this['drawItemImagePortraitStyle'](_0x105356[_0x1037d5(0x2de)]());},Window_BattleStatus[_0x421ee0(0x2cb)][_0x421ee0(0x54d)]=function(_0x10ffcc,_0xb91ae9){const _0x28175f=_0x421ee0;if(!this[_0x28175f(0x428)])return;if(!_0x10ffcc)return;if(!_0xb91ae9)return;const _0x543a5f=this[_0x28175f(0x7db)](_0xb91ae9[_0x28175f(0x2de)]());_0x543a5f['x']+=_0x543a5f[_0x28175f(0x62f)]/0x2+this[_0x28175f(0x6f6)],_0x10ffcc['x']=_0x543a5f['x'],_0x10ffcc['y']=_0x543a5f['y'],this['_damageContainer'][_0x28175f(0x658)](_0x10ffcc);},Window_BattleStatus['prototype']['removeDamageSprite']=function(_0x191790){const _0x2d2b41=_0x421ee0;if(!this[_0x2d2b41(0x428)])return;if(!_0x191790)return;this['_damageContainer'][_0x2d2b41(0x2e1)](_0x191790);},Window_BattleStatus['prototype'][_0x421ee0(0x8ae)]=function(){const _0x23cccd=_0x421ee0;if(!this['isBorderStylePortraitShown']())return;if(!this[_0x23cccd(0x2c9)])this[_0x23cccd(0x650)]();this[_0x23cccd(0x264)](),this[_0x23cccd(0x1db)]();},Window_BattleStatus[_0x421ee0(0x2cb)]['isBorderStylePortraitShown']=function(){const _0x1df83d=_0x421ee0;if(this[_0x1df83d(0x51e)]!==Window_BattleStatus)return![];if(!SceneManager[_0x1df83d(0x225)]())return![];return VisuMZ[_0x1df83d(0x674)][_0x1df83d(0x57b)][_0x1df83d(0x772)][_0x1df83d(0x7ef)];},Window_BattleStatus[_0x421ee0(0x2cb)]['createBorderStylePortraitSprite']=function(){const _0x25b35a=_0x421ee0;this[_0x25b35a(0x2c9)]=new Sprite();const _0x469c4c=SceneManager['_scene'],_0x1357ea=_0x469c4c[_0x25b35a(0x743)]['indexOf'](_0x469c4c[_0x25b35a(0x8cb)]);_0x469c4c['addChildAt'](this['_borderPortraitSprite'],_0x1357ea),this[_0x25b35a(0x2c9)][_0x25b35a(0x5d1)]['x']=0.5,this[_0x25b35a(0x2c9)][_0x25b35a(0x5d1)]['y']=0x1;const _0xa5755d=VisuMZ[_0x25b35a(0x674)][_0x25b35a(0x57b)][_0x25b35a(0x772)]['PortraitScaleBorderStyle'];this[_0x25b35a(0x2c9)][_0x25b35a(0x2b7)]['x']=_0xa5755d,this['_borderPortraitSprite'][_0x25b35a(0x2b7)]['y']=_0xa5755d,this[_0x25b35a(0x2c9)]['y']=this['y']+this['height'],this[_0x25b35a(0x576)]=0x0;},Window_BattleStatus[_0x421ee0(0x2cb)][_0x421ee0(0x264)]=function(){const _0xe015=_0x421ee0;this[_0xe015(0x2c9)][_0xe015(0x3b9)]=BattleManager[_0xe015(0x579)]();const _0x153bae=BattleManager[_0xe015(0x41c)]();if(_0x153bae===this[_0xe015(0x2c9)][_0xe015(0x41c)])return;this[_0xe015(0x2c9)][_0xe015(0x41c)]=_0x153bae||this[_0xe015(0x2c9)][_0xe015(0x41c)];if(!_0x153bae)return;else{if(_0x153bae['getBattlePortraitFilename']()===''){this[_0xe015(0x2c9)][_0xe015(0x82a)]=ImageManager[_0xe015(0x5ec)];return;}else{const _0x425a51=ImageManager['loadPicture'](_0x153bae[_0xe015(0x8d3)]());_0x425a51[_0xe015(0x6ae)](this[_0xe015(0x371)][_0xe015(0x92c)](this,_0x425a51));}}},Window_BattleStatus[_0x421ee0(0x2cb)][_0x421ee0(0x371)]=function(_0x344ce7){const _0x51dcdd=_0x421ee0;this['_borderPortraitDuration']=0x14,this[_0x51dcdd(0x2c9)][_0x51dcdd(0x82a)]=_0x344ce7;SceneManager[_0x51dcdd(0x855)][_0x51dcdd(0x402)]()?(this['_borderPortraitSprite']['x']=0x0,this['_borderPortraitTargetX']=Math[_0x51dcdd(0x1d9)](_0x344ce7[_0x51dcdd(0x62f)]/0x2)):(this[_0x51dcdd(0x2c9)]['x']=this[_0x51dcdd(0x62f)],this['_borderPortraitTargetX']=this[_0x51dcdd(0x62f)]*0x3/0x4);this[_0x51dcdd(0x2c9)][_0x51dcdd(0x3d5)]=0x0,this['_borderPortraitSprite']['y']=this['y']+this[_0x51dcdd(0x6b2)];const _0x44b463=BattleManager[_0x51dcdd(0x41c)]();_0x44b463&&(this[_0x51dcdd(0x7fe)]+=_0x44b463[_0x51dcdd(0x372)](),this[_0x51dcdd(0x2c9)]['y']+=_0x44b463[_0x51dcdd(0x651)]());},Window_BattleStatus[_0x421ee0(0x2cb)][_0x421ee0(0x1db)]=function(){const _0x348d1c=_0x421ee0;if(this['_borderPortraitDuration']>0x0){const _0x26a247=this[_0x348d1c(0x576)],_0x554247=this[_0x348d1c(0x2c9)];_0x554247['x']=(_0x554247['x']*(_0x26a247-0x1)+this[_0x348d1c(0x7fe)])/_0x26a247,_0x554247['opacity']=(_0x554247['opacity']*(_0x26a247-0x1)+0xff)/_0x26a247,this[_0x348d1c(0x576)]--;}},Window_BattleStatus[_0x421ee0(0x2cb)][_0x421ee0(0x7eb)]=function(){const _0x2f909b=_0x421ee0;return;this[_0x2f909b(0x16b)]&&(this[_0x2f909b(0x16b)]['x']=this['x'],this['_effectsContainer']['y']=this['y']),this[_0x2f909b(0x428)]&&(this[_0x2f909b(0x428)]['x']=this['x'],this['_damageContainer']['y']=this['y']);},Window_BattleStatus[_0x421ee0(0x2cb)]['createAttachmentSprites']=function(){const _0x2e6337=_0x421ee0,_0x3f2cf0=VisuMZ[_0x2e6337(0x674)]['Settings'][_0x2e6337(0x772)];if(_0x3f2cf0['StatusWindowAttachmentBack']){const _0x368afe=new Sprite();_0x368afe['bitmap']=ImageManager[_0x2e6337(0x932)](_0x3f2cf0['StatusWindowAttachmentBack']),_0x368afe['x']=_0x3f2cf0[_0x2e6337(0x279)]||0x0,_0x368afe['y']=_0x3f2cf0[_0x2e6337(0x1a7)]||0x0,this[_0x2e6337(0x3cc)](_0x368afe),this['_backAttachmentSprite']=_0x368afe;}if(_0x3f2cf0[_0x2e6337(0x324)]){const _0x120e3e=new Sprite();_0x120e3e[_0x2e6337(0x82a)]=ImageManager[_0x2e6337(0x932)](_0x3f2cf0[_0x2e6337(0x324)]),_0x120e3e['x']=_0x3f2cf0[_0x2e6337(0x889)]||0x0,_0x120e3e['y']=_0x3f2cf0[_0x2e6337(0x8fb)]||0x0,this[_0x2e6337(0x658)](_0x120e3e),this[_0x2e6337(0x6ec)]=_0x120e3e;}},Window_BattleStatus['prototype'][_0x421ee0(0x4eb)]=function(){const _0x3ec3d2=_0x421ee0;this['_frontAttachmentSprite']&&this[_0x3ec3d2(0x658)](this[_0x3ec3d2(0x6ec)]);},Window_BattleActor[_0x421ee0(0x2cb)][_0x421ee0(0x3f6)]=function(){const _0x2ce620=_0x421ee0;return Window_BattleStatus[_0x2ce620(0x2cb)]['isOkEnabled'][_0x2ce620(0x8eb)](this)&&this[_0x2ce620(0x5dc)]();},Window_BattleActor[_0x421ee0(0x2cb)][_0x421ee0(0x5dc)]=function(){const _0xd7f34e=_0x421ee0,_0x1e2970=BattleManager['inputtingAction'](),_0x2102ab=this[_0xd7f34e(0x41c)](this[_0xd7f34e(0x2de)]());if(!_0x1e2970)return!![];if(!_0x1e2970['item']())return!![];const _0x5e3567=_0x1e2970['item']()[_0xd7f34e(0x24c)];if(_0x5e3567[_0xd7f34e(0x5f2)](/<CANNOT TARGET (?:USER|SELF)>/i)){if(_0x2102ab===BattleManager[_0xd7f34e(0x41c)]())return![];}return!![];},VisuMZ['BattleCore'][_0x421ee0(0x8d9)]=Window_BattleEnemy[_0x421ee0(0x2cb)]['initialize'],Window_BattleEnemy[_0x421ee0(0x2cb)][_0x421ee0(0x792)]=function(_0x429476){const _0x4dd079=_0x421ee0;this[_0x4dd079(0x2fb)]=null,VisuMZ[_0x4dd079(0x674)][_0x4dd079(0x8d9)]['call'](this,_0x429476);},Window_BattleEnemy[_0x421ee0(0x2cb)][_0x421ee0(0x3aa)]=function(){const _0x49bffa=_0x421ee0;return this[_0x49bffa(0x23f)]();},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x5f7)]=Window_BattleEnemy['prototype']['show'],Window_BattleEnemy[_0x421ee0(0x2cb)][_0x421ee0(0x449)]=function(){const _0xbd0956=_0x421ee0;VisuMZ[_0xbd0956(0x674)]['Window_BattleEnemy_show'][_0xbd0956(0x8eb)](this),this['y']=Graphics[_0xbd0956(0x6b2)]*0xa;},Window_BattleEnemy[_0x421ee0(0x2cb)][_0x421ee0(0x635)]=function(){const _0x481de9=_0x421ee0;return $gameTroop[_0x481de9(0x84a)]()['slice'](0x0);},Window_BattleEnemy[_0x421ee0(0x2cb)][_0x421ee0(0x214)]=function(){const _0x3b0c9f=_0x421ee0;this[_0x3b0c9f(0x3eb)]=this[_0x3b0c9f(0x635)](),this[_0x3b0c9f(0x38e)](),Window_Selectable[_0x3b0c9f(0x2cb)][_0x3b0c9f(0x214)][_0x3b0c9f(0x8eb)](this);},Window_BattleEnemy[_0x421ee0(0x2cb)][_0x421ee0(0x38e)]=function(){const _0x2f0800=_0x421ee0;this[_0x2f0800(0x3eb)][_0x2f0800(0x4e2)]((_0x2b1952,_0x133bbc)=>{const _0x39907a=_0x2f0800;return _0x2b1952[_0x39907a(0x35a)]()['_baseX']===_0x133bbc[_0x39907a(0x35a)]()['_baseX']?_0x2b1952[_0x39907a(0x35a)]()[_0x39907a(0x88b)]-_0x133bbc[_0x39907a(0x35a)]()[_0x39907a(0x88b)]:_0x2b1952['battler']()[_0x39907a(0x923)]-_0x133bbc['battler']()['_baseX'];}),SceneManager[_0x2f0800(0x604)]()&&this[_0x2f0800(0x3eb)][_0x2f0800(0x3f1)]();},Window_BattleEnemy[_0x421ee0(0x2cb)][_0x421ee0(0x58f)]=function(){const _0x73a54e=_0x421ee0,_0x5066cf=VisuMZ[_0x73a54e(0x674)]['Settings'][_0x73a54e(0x2d2)];_0x5066cf[_0x73a54e(0x3dc)]?this[_0x73a54e(0x50b)]():this[_0x73a54e(0x5f6)]();},Window_BattleEnemy[_0x421ee0(0x2cb)]['autoSelectLastSelected']=function(){const _0x46596e=_0x421ee0;if(this[_0x46596e(0x2fb)]&&this[_0x46596e(0x3eb)][_0x46596e(0x7f2)](this[_0x46596e(0x2fb)])){const _0x1c0bf9=this[_0x46596e(0x3eb)][_0x46596e(0x19a)](this[_0x46596e(0x2fb)]);this[_0x46596e(0x479)](_0x1c0bf9);}else this[_0x46596e(0x5f6)]();},Window_BattleEnemy['prototype'][_0x421ee0(0x5f6)]=function(){const _0x211acc=_0x421ee0,_0x338c44=VisuMZ[_0x211acc(0x674)][_0x211acc(0x57b)][_0x211acc(0x2d2)];let _0x2a7922=![];$gameSystem[_0x211acc(0x649)]()?_0x2a7922=_0x338c44[_0x211acc(0x507)]:_0x2a7922=_0x338c44[_0x211acc(0x770)],this['forceSelect'](_0x2a7922?this[_0x211acc(0x23f)]()-0x1:0x0);},Window_BattleEnemy[_0x421ee0(0x2cb)][_0x421ee0(0x69a)]=function(){const _0x169144=_0x421ee0;Window_Selectable[_0x169144(0x2cb)][_0x169144(0x69a)][_0x169144(0x8eb)](this),this[_0x169144(0x2fb)]=this['enemy']();},Window_BattleItem['prototype']['includes']=function(_0x129541){const _0x5009fe=_0x421ee0;if(!_0x129541)return![];return _0x129541[_0x5009fe(0x3e5)]===0x0||_0x129541[_0x5009fe(0x3e5)]===0x1;};function Window_AutoBattleCancel(){const _0x342948=_0x421ee0;this[_0x342948(0x792)](...arguments);}Window_AutoBattleCancel[_0x421ee0(0x2cb)]=Object[_0x421ee0(0x7b1)](Window_Base['prototype']),Window_AutoBattleCancel['prototype']['constructor']=Window_AutoBattleCancel,Window_AutoBattleCancel[_0x421ee0(0x2cb)][_0x421ee0(0x792)]=function(_0xcdcbad){const _0x36f373=_0x421ee0;Window_Base[_0x36f373(0x2cb)][_0x36f373(0x792)][_0x36f373(0x8eb)](this,_0xcdcbad),this['setBackgroundType'](this[_0x36f373(0x91e)]()),this['refresh']();},Window_AutoBattleCancel[_0x421ee0(0x2cb)][_0x421ee0(0x91e)]=function(){const _0x102a15=_0x421ee0;return VisuMZ[_0x102a15(0x674)][_0x102a15(0x57b)][_0x102a15(0x8ed)][_0x102a15(0x2a5)];},Window_AutoBattleCancel['prototype'][_0x421ee0(0x214)]=function(){const _0xc9f87c=_0x421ee0;this[_0xc9f87c(0x60a)][_0xc9f87c(0x564)]();const _0x54234a=VisuMZ[_0xc9f87c(0x674)][_0xc9f87c(0x57b)][_0xc9f87c(0x8ed)]['AutoBattleMsg'],_0x1cc5fc=_0x54234a[_0xc9f87c(0x7d7)](this[_0xc9f87c(0x846)](),this['cancelButtonText']()),_0x12ebe0=this[_0xc9f87c(0x668)](_0x1cc5fc)['width'],_0x5156f4=Math[_0xc9f87c(0x860)]((this[_0xc9f87c(0x641)]-_0x12ebe0)/0x2);this[_0xc9f87c(0x56e)](_0x1cc5fc,_0x5156f4,0x0,_0x12ebe0);},Window_AutoBattleCancel[_0x421ee0(0x2cb)]['okButtonText']=function(){const _0x483fcd=_0x421ee0;return Imported[_0x483fcd(0x588)]?TextManager[_0x483fcd(0x19f)]('ok'):VisuMZ[_0x483fcd(0x674)][_0x483fcd(0x57b)][_0x483fcd(0x8ed)][_0x483fcd(0x418)];},Window_AutoBattleCancel[_0x421ee0(0x2cb)]['cancelButtonText']=function(){const _0x59d3f4=_0x421ee0;return Imported[_0x59d3f4(0x588)]?TextManager[_0x59d3f4(0x19f)](_0x59d3f4(0x699)):VisuMZ[_0x59d3f4(0x674)][_0x59d3f4(0x57b)][_0x59d3f4(0x8ed)]['AutoBattleCancel'];},Window_AutoBattleCancel['prototype'][_0x421ee0(0x53e)]=function(){const _0xa32dbd=_0x421ee0;Window_Base[_0xa32dbd(0x2cb)][_0xa32dbd(0x53e)][_0xa32dbd(0x8eb)](this),this[_0xa32dbd(0x78f)](),this['updateCancel']();},Window_AutoBattleCancel['prototype'][_0x421ee0(0x78f)]=function(){const _0xa10c8a=_0x421ee0;this['visible']=BattleManager[_0xa10c8a(0x228)];},Window_AutoBattleCancel[_0x421ee0(0x2cb)][_0x421ee0(0x7ff)]=function(){const _0x5bd52a=_0x421ee0;if(!BattleManager['_autoBattle'])return;(Input[_0x5bd52a(0x7d5)]('ok')||Input['isTriggered'](_0x5bd52a(0x699))||TouchInput[_0x5bd52a(0x6b4)]()||TouchInput['isCancelled']())&&(SoundManager[_0x5bd52a(0x8c7)](),BattleManager['_autoBattle']=![],Input['clear'](),TouchInput[_0x5bd52a(0x564)]());};function Window_EnemyName(){const _0x1a9889=_0x421ee0;this[_0x1a9889(0x792)](...arguments);}Window_EnemyName[_0x421ee0(0x2cb)]=Object['create'](Window_StatusBase[_0x421ee0(0x2cb)]),Window_EnemyName[_0x421ee0(0x2cb)]['constructor']=Window_EnemyName,Window_EnemyName[_0x421ee0(0x2cb)][_0x421ee0(0x792)]=function(_0x26f81b){const _0x30c403=_0x421ee0;this[_0x30c403(0x83e)]=_0x26f81b,this[_0x30c403(0x86c)]='';const _0xa0af2e=new Rectangle(0x0,0x0,Graphics['boxWidth'],this[_0x30c403(0x36e)]()*0x4);Window_StatusBase[_0x30c403(0x2cb)][_0x30c403(0x792)][_0x30c403(0x8eb)](this,_0xa0af2e),this[_0x30c403(0x92e)](0x2),this[_0x30c403(0x891)]=0x0;},Window_EnemyName[_0x421ee0(0x2cb)][_0x421ee0(0x21a)]=function(){const _0x562b04=_0x421ee0;this[_0x562b04(0x6f6)]=0x0;},Window_EnemyName[_0x421ee0(0x2cb)][_0x421ee0(0x660)]=function(){const _0x288e82=_0x421ee0;return $gameTroop[_0x288e82(0x294)]()[this['_enemyID']];},Window_EnemyName[_0x421ee0(0x2cb)][_0x421ee0(0x53e)]=function(){const _0x42f634=_0x421ee0;Window_StatusBase[_0x42f634(0x2cb)][_0x42f634(0x53e)][_0x42f634(0x8eb)](this),this['enemy']()&&this[_0x42f634(0x660)]()['name']()!==this[_0x42f634(0x86c)]&&(this['_text']=this[_0x42f634(0x660)]()[_0x42f634(0x4ec)](),this[_0x42f634(0x214)]()),this[_0x42f634(0x839)](),this[_0x42f634(0x5b6)]();},Window_EnemyName['prototype']['updateOpacity']=function(){const _0x5ee624=_0x421ee0;if(!this[_0x5ee624(0x660)]()){if(this[_0x5ee624(0x891)]>0x0)this[_0x5ee624(0x891)]-=0x10;}else{if(this[_0x5ee624(0x660)]()[_0x5ee624(0x2ac)]()){if(this[_0x5ee624(0x891)]>0x0)this[_0x5ee624(0x891)]-=0x10;}else{if(SceneManager[_0x5ee624(0x855)]['_enemyWindow']&&SceneManager[_0x5ee624(0x855)][_0x5ee624(0x5ad)][_0x5ee624(0x3c4)]&&SceneManager[_0x5ee624(0x855)][_0x5ee624(0x5ad)]['_enemies'][_0x5ee624(0x7f2)](this['enemy']())){if(this[_0x5ee624(0x891)]<0xff)this['contentsOpacity']+=0x10;}else this[_0x5ee624(0x891)]>0x0&&(this[_0x5ee624(0x891)]-=0x10);}}},Window_EnemyName[_0x421ee0(0x2cb)]['updatePosition']=function(){const _0x58a0af=_0x421ee0;if(!this[_0x58a0af(0x660)]())return;SceneManager[_0x58a0af(0x604)]()?this['x']=Graphics[_0x58a0af(0x733)]-this[_0x58a0af(0x660)]()[_0x58a0af(0x35a)]()['_baseX']:this['x']=this['enemy']()['battler']()['_baseX'];this['x']-=Math[_0x58a0af(0x38a)](this['width']/0x2),this['y']=this['enemy']()[_0x58a0af(0x35a)]()['_baseY']-Math[_0x58a0af(0x38a)](this['lineHeight']()*1.5);const _0x8f1f8a=VisuMZ[_0x58a0af(0x674)][_0x58a0af(0x57b)][_0x58a0af(0x2d2)];this['x']+=_0x8f1f8a[_0x58a0af(0x367)]||0x0,this['y']+=_0x8f1f8a[_0x58a0af(0x328)]||0x0;},Window_EnemyName[_0x421ee0(0x2cb)][_0x421ee0(0x711)]=function(){const _0x158557=_0x421ee0;Window_Base[_0x158557(0x2cb)]['resetFontSettings']['call'](this),this[_0x158557(0x60a)][_0x158557(0x551)]=VisuMZ[_0x158557(0x674)][_0x158557(0x57b)][_0x158557(0x2d2)][_0x158557(0x18c)];},Window_EnemyName[_0x421ee0(0x2cb)][_0x421ee0(0x214)]=function(){const _0x341886=_0x421ee0;Window_StatusBase[_0x341886(0x2cb)][_0x341886(0x214)][_0x341886(0x8eb)](this),this[_0x341886(0x60a)][_0x341886(0x564)]();if(!this[_0x341886(0x660)]())return;this[_0x341886(0x230)]();},Window_EnemyName[_0x421ee0(0x2cb)][_0x421ee0(0x230)]=function(){const _0x24572b=_0x421ee0;this[_0x24572b(0x86c)]=this[_0x24572b(0x660)]()[_0x24572b(0x4ec)]();const _0x944109=this[_0x24572b(0x668)](this[_0x24572b(0x86c)])[_0x24572b(0x62f)],_0x179d78=Math[_0x24572b(0x38a)]((this[_0x24572b(0x641)]-_0x944109)/0x2);this[_0x24572b(0x56e)](this['_text'],_0x179d78,0x0,_0x944109+0x8);},Window_BattleLog['prototype'][_0x421ee0(0x394)]=function(){const _0x4c1f00=_0x421ee0;return VisuMZ[_0x4c1f00(0x674)]['Settings']['BattleLog'][_0x4c1f00(0x1e7)];},Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x63f)]=function(){const _0xcc9aad=_0x421ee0;return VisuMZ[_0xcc9aad(0x674)][_0xcc9aad(0x57b)]['BattleLog'][_0xcc9aad(0x438)];},Window_BattleLog[_0x421ee0(0x2cb)]['backColor']=function(){const _0x51f294=_0x421ee0;return VisuMZ[_0x51f294(0x674)][_0x51f294(0x57b)][_0x51f294(0x42f)][_0x51f294(0x786)];},Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x8cc)]=function(){return![];},Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x7f5)]=function(_0x4884ae,_0x368e75){const _0x4dd0a4=_0x421ee0;this['unshift'](_0x4dd0a4(0x723)),BattleManager[_0x4dd0a4(0x540)](_0x4884ae,_0x368e75),this[_0x4dd0a4(0x5cd)]();},Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x723)]=function(){const _0x49739d=_0x421ee0;this[_0x49739d(0x5cd)]();},Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x7b3)]=function(_0x25804d){const _0x4e77ee=_0x421ee0,_0x21c0e2=Array[_0x4e77ee(0x2cb)][_0x4e77ee(0x67a)][_0x4e77ee(0x8eb)](arguments,0x1),_0x1779da={'name':_0x25804d,'params':_0x21c0e2},_0x241ecd=this[_0x4e77ee(0x316)][_0x4e77ee(0x1b6)](_0x5937ad=>_0x5937ad[_0x4e77ee(0x4ec)])[_0x4e77ee(0x19a)](_0x4e77ee(0x723));_0x241ecd>=0x0?this[_0x4e77ee(0x316)]['splice'](_0x241ecd,0x0,_0x1779da):this['_methods'][_0x4e77ee(0x7b3)](_0x1779da);},Window_BattleLog['prototype']['unshift']=function(_0x28b59a){const _0x436750=_0x421ee0,_0x500d3f=Array[_0x436750(0x2cb)][_0x436750(0x67a)]['call'](arguments,0x1);this[_0x436750(0x316)][_0x436750(0x6eb)]({'name':_0x28b59a,'params':_0x500d3f});},Window_BattleLog[_0x421ee0(0x2cb)]['logActionList']=function(){const _0x507179=_0x421ee0;if(!$gameTemp[_0x507179(0x728)]())return;console['log'](this[_0x507179(0x316)]['map'](_0x1fff53=>_0x1fff53[_0x507179(0x4ec)])[_0x507179(0x51c)]('\x0a'));},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x84f)]=Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x214)],Window_BattleLog[_0x421ee0(0x2cb)]['refresh']=function(){const _0x372927=_0x421ee0;this[_0x372927(0x401)]=!![];},VisuMZ['BattleCore']['Window_BattleLog_update']=Window_BattleLog['prototype']['update'],Window_BattleLog['prototype'][_0x421ee0(0x53e)]=function(){const _0x72a404=_0x421ee0;VisuMZ[_0x72a404(0x674)]['Window_BattleLog_update'][_0x72a404(0x8eb)](this);if(this['_requestRefresh'])this['processRefresh']();},Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x220)]=function(){const _0x389cdf=_0x421ee0;this[_0x389cdf(0x401)]=![],VisuMZ[_0x389cdf(0x674)][_0x389cdf(0x84f)][_0x389cdf(0x8eb)](this);},Window_BattleLog[_0x421ee0(0x2cb)]['drawLineText']=function(_0x2c219f){const _0x4775b4=_0x421ee0;let _0x48a25e=VisuMZ['BattleCore'][_0x4775b4(0x57b)]['BattleLog'][_0x4775b4(0x6db)][_0x4775b4(0x6e1)]()[_0x4775b4(0x90d)](),_0x968d59=this[_0x4775b4(0x681)][_0x2c219f];if(_0x968d59[_0x4775b4(0x5f2)](/<LEFT>/i))_0x48a25e='left';else{if(_0x968d59['match'](/<CENTER>/i))_0x48a25e=_0x4775b4(0x3bd);else _0x968d59[_0x4775b4(0x5f2)](/<RIGHT>/i)&&(_0x48a25e=_0x4775b4(0x1ce));}_0x968d59=_0x968d59[_0x4775b4(0x4ce)](/<(?:LEFT|CENTER|RIGHT)>/gi,''),_0x968d59=_0x968d59[_0x4775b4(0x4ce)](/\\I\[0\]/gi,'');const _0x23706c=this[_0x4775b4(0x357)](_0x2c219f);this[_0x4775b4(0x60a)][_0x4775b4(0x917)](_0x23706c['x'],_0x23706c['y'],_0x23706c[_0x4775b4(0x62f)],_0x23706c[_0x4775b4(0x6b2)]);const _0x427a65=this[_0x4775b4(0x668)](_0x968d59)['width'];let _0x2ff797=_0x23706c['x'];if(_0x48a25e===_0x4775b4(0x3bd))_0x2ff797+=(_0x23706c['width']-_0x427a65)/0x2;else _0x48a25e==='right'&&(_0x2ff797+=_0x23706c[_0x4775b4(0x62f)]-_0x427a65);this[_0x4775b4(0x56e)](_0x968d59,_0x2ff797,_0x23706c['y'],_0x427a65+0x8);},Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x4c0)]=function(_0x27b6e4){const _0x5ebe7c=_0x421ee0;this['_lines'][_0x5ebe7c(0x7b3)](_0x27b6e4),this['refresh'](),this[_0x5ebe7c(0x5cd)]();},Window_BattleLog[_0x421ee0(0x2cb)]['updateWaitMode']=function(){const _0x4ed0bd=_0x421ee0;let _0x4bf9cc=![];switch(this[_0x4ed0bd(0x26c)]){case _0x4ed0bd(0x1f3):_0x4bf9cc=this[_0x4ed0bd(0x6c2)][_0x4ed0bd(0x933)]();break;case _0x4ed0bd(0x8d1):_0x4bf9cc=this[_0x4ed0bd(0x6c2)][_0x4ed0bd(0x560)]();break;case _0x4ed0bd(0x3ee):_0x4bf9cc=this['_spriteset'][_0x4ed0bd(0x69d)]();break;case _0x4ed0bd(0x5ed):_0x4bf9cc=this[_0x4ed0bd(0x6c2)][_0x4ed0bd(0x1e3)]();break;case _0x4ed0bd(0x7cc):_0x4bf9cc=this[_0x4ed0bd(0x6c2)][_0x4ed0bd(0x7f9)]();break;case _0x4ed0bd(0x3d5):_0x4bf9cc=this['_spriteset'][_0x4ed0bd(0x392)]();break;}return!_0x4bf9cc&&(this[_0x4ed0bd(0x26c)]=''),_0x4bf9cc;},Window_BattleLog[_0x421ee0(0x2cb)]['waitForAnimation']=function(){const _0x474614=_0x421ee0;this[_0x474614(0x396)](_0x474614(0x3ee));},Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x671)]=function(){const _0x2be72a=_0x421ee0;this['setWaitMode'](_0x2be72a(0x5ed));},Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x22c)]=function(){const _0x354eba=_0x421ee0;this['setWaitMode'](_0x354eba(0x7cc));},Window_BattleLog['prototype']['waitForOpacity']=function(){const _0x3cd6a0=_0x421ee0;this[_0x3cd6a0(0x396)](_0x3cd6a0(0x3d5));},Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x16f)]=function(){const _0x3e6274=_0x421ee0,_0x1f0784=VisuMZ[_0x3e6274(0x674)]['Settings']['BattleLog'];if(!_0x1f0784[_0x3e6274(0x806)])return;this[_0x3e6274(0x7b3)]('addText',_0x1f0784[_0x3e6274(0x2a6)]['format']($gameTroop[_0x3e6274(0x771)]())),this[_0x3e6274(0x7b3)](_0x3e6274(0x2b5),_0x1f0784[_0x3e6274(0x7a2)]),this[_0x3e6274(0x7b3)](_0x3e6274(0x564));},Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x429)]=function(_0x592862,_0x166932,_0x421cbf){const _0x37d021=_0x421ee0;this[_0x37d021(0x3b5)](_0x166932)?BattleManager[_0x37d021(0x594)]():this['usePremadeActionSequence'](_0x592862,_0x166932,_0x421cbf);},Window_BattleLog['prototype'][_0x421ee0(0x3b5)]=function(_0x5957ba){const _0x1b43c1=_0x421ee0;if(!SceneManager[_0x1b43c1(0x225)]())return![];if(!_0x5957ba)return![];if(!_0x5957ba[_0x1b43c1(0x8f0)]())return![];if(_0x5957ba[_0x1b43c1(0x8f0)]()[_0x1b43c1(0x24c)]['match'](/<CUSTOM ACTION SEQUENCE>/i))return!![];if(DataManager[_0x1b43c1(0x3b1)](_0x5957ba[_0x1b43c1(0x8f0)]()))return!![];return![];},Window_BattleLog['prototype']['usePremadeActionSequence']=function(_0x1b5892,_0x4a473b,_0x2b2fba){const _0x5b0681=_0x421ee0,_0x23d4ff=_0x4a473b[_0x5b0681(0x8f0)]();this[_0x5b0681(0x379)](_0x1b5892,_0x4a473b,_0x2b2fba),this[_0x5b0681(0x720)](_0x1b5892,_0x4a473b,_0x2b2fba),this[_0x5b0681(0x84e)](_0x1b5892,_0x4a473b,_0x2b2fba);},Window_BattleLog['prototype']['displayAction']=function(_0x26d2c7,_0x1c0e7b){const _0x5a3849=_0x421ee0,_0x2c664e=VisuMZ['BattleCore'][_0x5a3849(0x57b)][_0x5a3849(0x42f)];_0x2c664e['ActionCenteredName']&&this[_0x5a3849(0x7b3)](_0x5a3849(0x4c0),'<CENTER>%1'[_0x5a3849(0x7d7)](DataManager[_0x5a3849(0x58b)](_0x1c0e7b)));if(DataManager['isSkill'](_0x1c0e7b)){if(_0x2c664e[_0x5a3849(0x7c9)])this['displayItemMessage'](_0x1c0e7b[_0x5a3849(0x239)],_0x26d2c7,_0x1c0e7b);if(_0x2c664e[_0x5a3849(0x50f)])this[_0x5a3849(0x653)](_0x1c0e7b[_0x5a3849(0x5c4)],_0x26d2c7,_0x1c0e7b);}else{if(_0x2c664e[_0x5a3849(0x838)])this[_0x5a3849(0x653)](TextManager[_0x5a3849(0x7b7)],_0x26d2c7,_0x1c0e7b);}},Window_BattleLog[_0x421ee0(0x2cb)]['setupActionSet']=function(_0x22f576,_0x5c3a4f,_0x34fe40){const _0x5eb164=_0x421ee0,_0x9253e5=_0x5c3a4f[_0x5eb164(0x8f0)]();this[_0x5eb164(0x66e)](_0x22f576,_0x9253e5),this['push']('applyImmortal',_0x22f576,_0x34fe40,!![]),this[_0x5eb164(0x7b3)](_0x5eb164(0x5d9),_0x22f576,_0x5c3a4f),this[_0x5eb164(0x7b3)](_0x5eb164(0x58d)),this[_0x5eb164(0x7b3)](_0x5eb164(0x7a1),_0x22f576,_0x5c3a4f),this[_0x5eb164(0x7b3)](_0x5eb164(0x1b0));},Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x720)]=function(_0x3fdac5,_0x2b57c5,_0x40b867){const _0x1cb5fe=_0x421ee0;if(this['isMeleeSingleTargetAction'](_0x2b57c5))this[_0x1cb5fe(0x1e5)](_0x3fdac5,_0x2b57c5,_0x40b867);else{if(this[_0x1cb5fe(0x566)](_0x2b57c5))this['autoMeleeMultiTargetActionSet'](_0x3fdac5,_0x2b57c5,_0x40b867);else _0x2b57c5[_0x1cb5fe(0x467)]()?this[_0x1cb5fe(0x2ee)](_0x3fdac5,_0x2b57c5,_0x40b867):this[_0x1cb5fe(0x64b)](_0x3fdac5,_0x2b57c5,_0x40b867);}},Window_BattleLog['prototype']['isMeleeSingleTargetAction']=function(_0x39822a){const _0x3dfabc=_0x421ee0;if(!_0x39822a[_0x3dfabc(0x427)]())return![];if(!_0x39822a['isForOne']())return![];if(!_0x39822a[_0x3dfabc(0x1ef)]())return![];return VisuMZ[_0x3dfabc(0x674)][_0x3dfabc(0x57b)][_0x3dfabc(0x16d)][_0x3dfabc(0x2da)];},Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x1e5)]=function(_0x2b07b2,_0xe539b3,_0x5964b6){const _0x4518e5=_0x421ee0,_0x747ca0=_0x2b07b2['getAttackMotion']()['type']<0x2,_0x2d404f=0x14,_0x5d41fb=0x30;_0x747ca0&&(this[_0x4518e5(0x7b3)]('performJump',[_0x2b07b2],_0x5d41fb,_0x2d404f),this['push'](_0x4518e5(0x50a),_0x2b07b2,_0x5964b6,'front\x20base',_0x2d404f,!![],_0x4518e5(0x363),!![]),this[_0x4518e5(0x7b3)]('requestMotion',[_0x2b07b2],_0x4518e5(0x82f)),this[_0x4518e5(0x7b3)]('waitForMovement'));let _0x48737d=_0xe539b3[_0x4518e5(0x7a5)]()?this[_0x4518e5(0x48f)](_0x2b07b2):0x1;for(let _0x4342f8=0x0;_0x4342f8<_0x48737d;_0x4342f8++){_0xe539b3[_0x4518e5(0x7a5)]()&&_0x2b07b2[_0x4518e5(0x6da)]()&&this[_0x4518e5(0x7b3)]('setActiveWeaponSet',_0x2b07b2,_0x4342f8),_0xe539b3[_0x4518e5(0x8f0)]()[_0x4518e5(0x908)]<0x0?this['targetActionSet'](_0x2b07b2,_0xe539b3,_0x5964b6):this[_0x4518e5(0x64b)](_0x2b07b2,_0xe539b3,_0x5964b6);}_0xe539b3[_0x4518e5(0x7a5)]()&&_0x2b07b2[_0x4518e5(0x6da)]()&&this['push']('clearActiveWeaponSet',_0x2b07b2);this[_0x4518e5(0x7b3)]('applyImmortal',_0x2b07b2,_0x5964b6,![]);if(_0x747ca0){const _0x1803b7=_0x2b07b2[_0x4518e5(0x35a)]();this[_0x4518e5(0x7b3)]('performJump',[_0x2b07b2],_0x5d41fb,_0x2d404f),this[_0x4518e5(0x7b3)](_0x4518e5(0x8ff),_0x2b07b2,_0x1803b7[_0x4518e5(0x788)],_0x1803b7[_0x4518e5(0x538)],_0x2d404f,![],_0x4518e5(0x363)),this[_0x4518e5(0x7b3)](_0x4518e5(0x6f0),[_0x2b07b2],_0x4518e5(0x5ff)),this[_0x4518e5(0x7b3)](_0x4518e5(0x58d)),this[_0x4518e5(0x7b3)](_0x4518e5(0x6f0),[_0x2b07b2],'walk');}},Window_BattleLog['prototype'][_0x421ee0(0x566)]=function(_0x337bef){const _0x4dc2b3=_0x421ee0;if(!_0x337bef['isPhysical']())return![];if(!_0x337bef['isForAll']())return![];if(!_0x337bef[_0x4dc2b3(0x1ef)]())return![];return VisuMZ[_0x4dc2b3(0x674)][_0x4dc2b3(0x57b)][_0x4dc2b3(0x16d)]['AutoMeleeAoE'];},Window_BattleLog['prototype'][_0x421ee0(0x552)]=function(_0x2c4dd1,_0x330568,_0x24add4){const _0x5a3ec0=_0x421ee0,_0x4fdd96=_0x2c4dd1[_0x5a3ec0(0x169)]()['type']<0x2,_0x4c26b9=0x14,_0x48e20c=0x30;_0x4fdd96&&(this[_0x5a3ec0(0x7b3)]('performJump',[_0x2c4dd1],_0x48e20c,_0x4c26b9),this[_0x5a3ec0(0x7b3)](_0x5a3ec0(0x50a),_0x2c4dd1,_0x24add4,_0x5a3ec0(0x88c),_0x4c26b9,!![],'Linear',!![]),this[_0x5a3ec0(0x7b3)](_0x5a3ec0(0x6f0),[_0x2c4dd1],_0x5a3ec0(0x82f)),this['push'](_0x5a3ec0(0x58d)));let _0x53f297=_0x330568['isAttack']()?this[_0x5a3ec0(0x48f)](_0x2c4dd1):0x1;for(let _0x29805a=0x0;_0x29805a<_0x53f297;_0x29805a++){_0x330568[_0x5a3ec0(0x7a5)]()&&_0x2c4dd1['isActor']()&&this[_0x5a3ec0(0x7b3)]('setActiveWeaponSet',_0x2c4dd1,_0x29805a),this[_0x5a3ec0(0x64b)](_0x2c4dd1,_0x330568,_0x24add4);}_0x330568[_0x5a3ec0(0x7a5)]()&&_0x2c4dd1[_0x5a3ec0(0x6da)]()&&this[_0x5a3ec0(0x7b3)]('clearActiveWeaponSet',_0x2c4dd1);this['push'](_0x5a3ec0(0x8e0),_0x2c4dd1,_0x24add4,![]);if(_0x4fdd96){const _0x4c7b3=_0x2c4dd1[_0x5a3ec0(0x35a)]();this[_0x5a3ec0(0x7b3)]('performJump',[_0x2c4dd1],_0x48e20c,_0x4c26b9),this[_0x5a3ec0(0x7b3)]('performMoveToPoint',_0x2c4dd1,_0x4c7b3[_0x5a3ec0(0x788)],_0x4c7b3['_homeY'],_0x4c26b9,![],_0x5a3ec0(0x363)),this[_0x5a3ec0(0x7b3)](_0x5a3ec0(0x6f0),[_0x2c4dd1],_0x5a3ec0(0x5ff)),this[_0x5a3ec0(0x7b3)](_0x5a3ec0(0x58d)),this[_0x5a3ec0(0x7b3)](_0x5a3ec0(0x6f0),[_0x2c4dd1],_0x5a3ec0(0x82f));}},Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x2ee)]=function(_0x5a72e2,_0x33efa8,_0x1d8e48){const _0x4d3b53=_0x421ee0,_0x4abdf1=_0x33efa8[_0x4d3b53(0x8f0)]();for(const _0x39ca90 of _0x1d8e48){if(!_0x39ca90)continue;this['push'](_0x4d3b53(0x686),_0x5a72e2,_0x33efa8),this[_0x4d3b53(0x7b3)]('waitCount',Sprite_Battler['_motionSpeed']),this['push'](_0x4d3b53(0x605),_0x5a72e2,[_0x39ca90],_0x4abdf1[_0x4d3b53(0x908)]),this['push']('waitCount',0x18),this['push'](_0x4d3b53(0x7f5),_0x5a72e2,_0x39ca90);}},Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x64b)]=function(_0x191375,_0x1c076e,_0x1fe29d){const _0x166b10=_0x421ee0,_0x65e617=_0x1c076e['item']();this[_0x166b10(0x7b3)](_0x166b10(0x686),_0x191375,_0x1c076e),this[_0x166b10(0x7b3)]('waitCount',Sprite_Battler['_motionSpeed']),this[_0x166b10(0x7b3)](_0x166b10(0x605),_0x191375,_0x1fe29d[_0x166b10(0x19e)](),_0x65e617[_0x166b10(0x908)]),this[_0x166b10(0x7b3)](_0x166b10(0x1b0));for(const _0x266f74 of _0x1fe29d){if(!_0x266f74)continue;this[_0x166b10(0x7b3)](_0x166b10(0x7f5),_0x191375,_0x266f74);}},Window_BattleLog[_0x421ee0(0x2cb)]['finishActionSet']=function(_0x2e8371,_0x428d5b,_0x2faf14){const _0xb6720e=_0x421ee0,_0x182563=_0x428d5b[_0xb6720e(0x8f0)]();this[_0xb6720e(0x7b3)](_0xb6720e(0x8e0),_0x2e8371,_0x2faf14,![]),this[_0xb6720e(0x7b3)]('waitForNewLine'),this[_0xb6720e(0x7b3)]('waitForEffect'),this['push'](_0xb6720e(0x564)),this[_0xb6720e(0x7b3)](_0xb6720e(0x56c),_0x2e8371),this[_0xb6720e(0x7b3)](_0xb6720e(0x58d));},Window_BattleLog['prototype'][_0x421ee0(0x28a)]=function(_0x536701){},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x4d0)]=Window_BattleLog[_0x421ee0(0x2cb)]['displayCurrentState'],Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x1e1)]=function(_0x4ab0e9){const _0x1710de=_0x421ee0;if(!VisuMZ[_0x1710de(0x674)]['Settings'][_0x1710de(0x42f)]['ShowCurrentState'])return;VisuMZ[_0x1710de(0x674)]['Window_BattleLog_displayCurrentState'][_0x1710de(0x8eb)](this,_0x4ab0e9);},Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x439)]=function(_0x880c89){const _0x5bdb11=_0x421ee0;this[_0x5bdb11(0x7b3)](_0x5bdb11(0x1f8),_0x880c89);VisuMZ[_0x5bdb11(0x674)][_0x5bdb11(0x57b)]['ActionSequence'][_0x5bdb11(0x421)]&&this['push'](_0x5bdb11(0x605),_0x880c89,[BattleManager['_subject']],-0x1);if(!VisuMZ['BattleCore']['Settings'][_0x5bdb11(0x42f)][_0x5bdb11(0x821)])return;this['push'](_0x5bdb11(0x4c0),TextManager['counterAttack'][_0x5bdb11(0x7d7)](_0x880c89[_0x5bdb11(0x4ec)]()));},Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x794)]=function(_0x204ed5){const _0x48c3d7=_0x421ee0;this[_0x48c3d7(0x7b3)]('performReflection',_0x204ed5);if(!VisuMZ['BattleCore'][_0x48c3d7(0x57b)][_0x48c3d7(0x42f)][_0x48c3d7(0x478)])return;this[_0x48c3d7(0x7b3)](_0x48c3d7(0x4c0),TextManager[_0x48c3d7(0x8ab)][_0x48c3d7(0x7d7)](_0x204ed5[_0x48c3d7(0x4ec)]()));},Window_BattleLog[_0x421ee0(0x2cb)]['displayReflectionPlayBack']=function(_0x167875,_0x3322aa){const _0x27c245=_0x421ee0;if(VisuMZ[_0x27c245(0x674)][_0x27c245(0x57b)][_0x27c245(0x16d)][_0x27c245(0x2bb)]){const _0x8bfed8=_0x3322aa[_0x27c245(0x8f0)]();this[_0x27c245(0x7b3)]('showAnimation',_0x167875,[_0x167875],_0x8bfed8['animationId']);}},Window_BattleLog[_0x421ee0(0x2cb)]['displaySubstitute']=function(_0xfc20d2,_0x5e4ac1){const _0x34655f=_0x421ee0;this[_0x34655f(0x7b3)](_0x34655f(0x46b),_0xfc20d2,_0x5e4ac1);if(!VisuMZ[_0x34655f(0x674)][_0x34655f(0x57b)][_0x34655f(0x42f)]['ShowSubstitute'])return;const _0xe97787=_0xfc20d2[_0x34655f(0x4ec)](),_0x286091=TextManager[_0x34655f(0x349)][_0x34655f(0x7d7)](_0xe97787,_0x5e4ac1['name']());this[_0x34655f(0x7b3)](_0x34655f(0x4c0),_0x286091);},VisuMZ['BattleCore'][_0x421ee0(0x182)]=Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x751)],Window_BattleLog[_0x421ee0(0x2cb)]['displayFailure']=function(_0x2ea180){const _0x1f6a13=_0x421ee0;if(!VisuMZ[_0x1f6a13(0x674)][_0x1f6a13(0x57b)][_0x1f6a13(0x42f)][_0x1f6a13(0x5c2)])return;VisuMZ['BattleCore']['Window_BattleLog_displayFailure'][_0x1f6a13(0x8eb)](this,_0x2ea180);},VisuMZ['BattleCore'][_0x421ee0(0x4e5)]=Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x8db)],Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x8db)]=function(_0x55674a){const _0x36191f=_0x421ee0;if(!VisuMZ[_0x36191f(0x674)][_0x36191f(0x57b)]['BattleLog'][_0x36191f(0x4ae)])return;VisuMZ[_0x36191f(0x674)]['Window_BattleLog_displayCritical']['call'](this,_0x55674a);},VisuMZ['BattleCore']['Window_BattleLog_displayMiss']=Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x481)],Window_BattleLog['prototype']['displayMiss']=function(_0x33c926){const _0x19330f=_0x421ee0;!VisuMZ[_0x19330f(0x674)][_0x19330f(0x57b)]['BattleLog'][_0x19330f(0x274)]?this[_0x19330f(0x7b3)](_0x19330f(0x377),_0x33c926):VisuMZ[_0x19330f(0x674)][_0x19330f(0x8d4)]['call'](this,_0x33c926);},VisuMZ['BattleCore'][_0x421ee0(0x602)]=Window_BattleLog['prototype'][_0x421ee0(0x299)],Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x299)]=function(_0xb1dd4){const _0xbd7d24=_0x421ee0;!VisuMZ['BattleCore'][_0xbd7d24(0x57b)][_0xbd7d24(0x42f)][_0xbd7d24(0x274)]?_0xb1dd4[_0xbd7d24(0x895)]()['physical']?this[_0xbd7d24(0x7b3)]('performEvasion',_0xb1dd4):this[_0xbd7d24(0x7b3)](_0xbd7d24(0x31c),_0xb1dd4):VisuMZ['BattleCore']['Window_BattleLog_displayEvasion'][_0xbd7d24(0x8eb)](this,_0xb1dd4);},Window_BattleLog['prototype'][_0x421ee0(0x32a)]=function(_0x1f8d5c){const _0x5b581e=_0x421ee0;_0x1f8d5c[_0x5b581e(0x895)]()[_0x5b581e(0x265)]&&(_0x1f8d5c['result']()[_0x5b581e(0x46a)]>0x0&&!_0x1f8d5c[_0x5b581e(0x895)]()[_0x5b581e(0x3a1)]&&this[_0x5b581e(0x7b3)]('performDamage',_0x1f8d5c),_0x1f8d5c[_0x5b581e(0x895)]()['hpDamage']<0x0&&this[_0x5b581e(0x7b3)](_0x5b581e(0x3ed),_0x1f8d5c),VisuMZ[_0x5b581e(0x674)]['Settings'][_0x5b581e(0x42f)]['ShowHpDmg']&&this[_0x5b581e(0x7b3)](_0x5b581e(0x4c0),this['makeHpDamageText'](_0x1f8d5c)));},VisuMZ['BattleCore'][_0x421ee0(0x44e)]=Window_BattleLog['prototype'][_0x421ee0(0x1fa)],Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x1fa)]=function(_0x4d83d5){const _0x76dc5a=_0x421ee0;if(!VisuMZ[_0x76dc5a(0x674)][_0x76dc5a(0x57b)]['BattleLog'][_0x76dc5a(0x2a9)])return;VisuMZ[_0x76dc5a(0x674)][_0x76dc5a(0x44e)]['call'](this,_0x4d83d5);},VisuMZ['BattleCore'][_0x421ee0(0x238)]=Window_BattleLog['prototype'][_0x421ee0(0x7b0)],Window_BattleLog[_0x421ee0(0x2cb)]['displayTpDamage']=function(_0x5ad32b){const _0x3c63a5=_0x421ee0;if(!VisuMZ[_0x3c63a5(0x674)][_0x3c63a5(0x57b)]['BattleLog'][_0x3c63a5(0x584)])return;VisuMZ['BattleCore'][_0x3c63a5(0x238)][_0x3c63a5(0x8eb)](this,_0x5ad32b);},Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x88a)]=function(_0x4a788b){const _0xf47098=_0x421ee0,_0x3c41ee=_0x4a788b['result'](),_0x4c2c43=_0x3c41ee['addedStateObjects']();for(const _0xbefb04 of _0x4c2c43){const _0x3a754b=_0x4a788b[_0xf47098(0x6da)]()?_0xbefb04[_0xf47098(0x239)]:_0xbefb04[_0xf47098(0x5c4)];_0x3a754b&&VisuMZ[_0xf47098(0x674)][_0xf47098(0x57b)][_0xf47098(0x42f)]['ShowAddedState']&&(this['push'](_0xf47098(0x5a1)),this[_0xf47098(0x7b3)](_0xf47098(0x5f5)),this[_0xf47098(0x7b3)](_0xf47098(0x4c0),_0x3a754b[_0xf47098(0x7d7)](_0x4a788b[_0xf47098(0x4ec)]())),this[_0xf47098(0x7b3)](_0xf47098(0x186))),_0xbefb04['id']===_0x4a788b[_0xf47098(0x6c5)]()&&this['push']('performCollapse',_0x4a788b);}},Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x67b)]=function(_0x5f4798){const _0x1182cf=_0x421ee0;if(!VisuMZ[_0x1182cf(0x674)][_0x1182cf(0x57b)][_0x1182cf(0x42f)][_0x1182cf(0x1b2)])return;const _0x229050=_0x5f4798[_0x1182cf(0x895)](),_0x24975d=_0x229050[_0x1182cf(0x809)]();for(const _0x3cbfb8 of _0x24975d){_0x3cbfb8[_0x1182cf(0x38f)]&&(this['push']('popBaseLine'),this['push']('pushBaseLine'),this[_0x1182cf(0x7b3)](_0x1182cf(0x4c0),_0x3cbfb8[_0x1182cf(0x38f)][_0x1182cf(0x7d7)](_0x5f4798[_0x1182cf(0x4ec)]())),this[_0x1182cf(0x7b3)](_0x1182cf(0x186)));}},Window_BattleLog[_0x421ee0(0x2cb)]['displayChangedBuffs']=function(_0x73287b){const _0x2d6880=_0x421ee0,_0x2af07d=VisuMZ[_0x2d6880(0x674)][_0x2d6880(0x57b)][_0x2d6880(0x42f)],_0x299076=_0x73287b['result']();if(_0x2af07d['ShowAddedBuff'])this[_0x2d6880(0x295)](_0x73287b,_0x299076[_0x2d6880(0x65b)],TextManager[_0x2d6880(0x730)]);if(_0x2af07d[_0x2d6880(0x19c)])this['displayBuffs'](_0x73287b,_0x299076[_0x2d6880(0x598)],TextManager[_0x2d6880(0x25a)]);if(_0x2af07d['ShowRemovedBuff'])this['displayBuffs'](_0x73287b,_0x299076[_0x2d6880(0x1d0)],TextManager[_0x2d6880(0x70f)]);},Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x295)]=function(_0x1589c8,_0xd26545,_0x380039){const _0x48184d=_0x421ee0;for(const _0x3d3926 of _0xd26545){const _0x451431=_0x380039[_0x48184d(0x7d7)](_0x1589c8[_0x48184d(0x4ec)](),TextManager[_0x48184d(0x262)](_0x3d3926));this[_0x48184d(0x7b3)](_0x48184d(0x5a1)),this['push']('pushBaseLine'),this[_0x48184d(0x7b3)](_0x48184d(0x4c0),_0x451431),this[_0x48184d(0x7b3)](_0x48184d(0x186));}},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x801)]=Window_BattleLog['prototype']['clear'],Window_BattleLog['prototype'][_0x421ee0(0x564)]=function(){const _0x243539=_0x421ee0;VisuMZ[_0x243539(0x674)]['Window_BattleLog_clear'][_0x243539(0x8eb)](this),this[_0x243539(0x5cd)]();},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x3fe)]=Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x5f5)],Window_BattleLog[_0x421ee0(0x2cb)]['pushBaseLine']=function(){const _0x2dcd11=_0x421ee0;VisuMZ[_0x2dcd11(0x674)][_0x2dcd11(0x3fe)]['call'](this),this[_0x2dcd11(0x5cd)]();},VisuMZ[_0x421ee0(0x674)]['Window_BattleLog_popBaseLine']=Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x5a1)],Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x5a1)]=function(){const _0x1a16d4=_0x421ee0;VisuMZ[_0x1a16d4(0x674)][_0x1a16d4(0x3d0)][_0x1a16d4(0x8eb)](this),this[_0x1a16d4(0x214)](),this[_0x1a16d4(0x5cd)]();},VisuMZ[_0x421ee0(0x674)]['Window_BattleLog_popupDamage']=Window_BattleLog[_0x421ee0(0x2cb)]['popupDamage'],Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x865)]=function(_0x3afa69){const _0x25050a=_0x421ee0;VisuMZ[_0x25050a(0x674)][_0x25050a(0x6d0)][_0x25050a(0x8eb)](this,_0x3afa69),this['callNextMethod']();},Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x6f2)]=function(){const _0x31ee53=_0x421ee0;let _0x194956=0x0;this[_0x31ee53(0x798)][_0x31ee53(0x4be)]>0x0&&(_0x194956=this['_baseLineStack'][this['_baseLineStack'][_0x31ee53(0x4be)]-0x1]),this['_lines'][_0x31ee53(0x4be)]>_0x194956?this[_0x31ee53(0x186)]():this[_0x31ee53(0x5cd)]();},VisuMZ['BattleCore'][_0x421ee0(0x71f)]=Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x5d9)],Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x5d9)]=function(_0x37a33f,_0x36b875){const _0x54ccd2=_0x421ee0;VisuMZ[_0x54ccd2(0x674)][_0x54ccd2(0x71f)][_0x54ccd2(0x8eb)](this,_0x37a33f,_0x36b875),this[_0x54ccd2(0x5cd)]();},VisuMZ['BattleCore'][_0x421ee0(0x224)]=Window_BattleLog['prototype'][_0x421ee0(0x686)],Window_BattleLog[_0x421ee0(0x2cb)]['performAction']=function(_0x12c9ca,_0x3f77c4){const _0x2d3366=_0x421ee0;VisuMZ[_0x2d3366(0x674)]['Window_BattleLog_performAction'][_0x2d3366(0x8eb)](this,_0x12c9ca,_0x3f77c4),this[_0x2d3366(0x5cd)]();},VisuMZ['BattleCore'][_0x421ee0(0x448)]=Window_BattleLog['prototype']['performActionEnd'],Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x56c)]=function(_0xe2f4b1){const _0x5ebf36=_0x421ee0;VisuMZ[_0x5ebf36(0x674)][_0x5ebf36(0x448)][_0x5ebf36(0x8eb)](this,_0xe2f4b1);for(const _0x4aaa0 of BattleManager[_0x5ebf36(0x2b1)]()){if(!_0x4aaa0)continue;if(_0x4aaa0[_0x5ebf36(0x2ac)]())continue;_0x4aaa0[_0x5ebf36(0x53f)]();}this[_0x5ebf36(0x5cd)]();},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x63d)]=Window_BattleLog['prototype'][_0x421ee0(0x71c)],Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x71c)]=function(_0x503b51){const _0x57e297=_0x421ee0;VisuMZ[_0x57e297(0x674)][_0x57e297(0x63d)][_0x57e297(0x8eb)](this,_0x503b51),this[_0x57e297(0x5cd)]();},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x825)]=Window_BattleLog[_0x421ee0(0x2cb)]['performMiss'],Window_BattleLog[_0x421ee0(0x2cb)]['performMiss']=function(_0x4e4856){const _0xc03d38=_0x421ee0;VisuMZ[_0xc03d38(0x674)][_0xc03d38(0x825)][_0xc03d38(0x8eb)](this,_0x4e4856),this[_0xc03d38(0x5cd)]();},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x290)]=Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x3ed)],Window_BattleLog['prototype'][_0x421ee0(0x3ed)]=function(_0x4538f3){const _0x14fe0f=_0x421ee0;VisuMZ[_0x14fe0f(0x674)]['Window_BattleLog_performRecovery'][_0x14fe0f(0x8eb)](this,_0x4538f3),this[_0x14fe0f(0x5cd)]();},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x682)]=Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x925)],Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x925)]=function(_0x5e77ed){const _0x2899d5=_0x421ee0;VisuMZ[_0x2899d5(0x674)][_0x2899d5(0x682)][_0x2899d5(0x8eb)](this,_0x5e77ed),this[_0x2899d5(0x5cd)]();},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x557)]=Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x31c)],Window_BattleLog['prototype'][_0x421ee0(0x31c)]=function(_0x34824d){const _0x5219f8=_0x421ee0;VisuMZ['BattleCore'][_0x5219f8(0x557)][_0x5219f8(0x8eb)](this,_0x34824d),this[_0x5219f8(0x5cd)]();},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x2e5)]=Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x1f8)],Window_BattleLog['prototype'][_0x421ee0(0x1f8)]=function(_0x2b68e4){const _0x1d5648=_0x421ee0;VisuMZ[_0x1d5648(0x674)][_0x1d5648(0x2e5)][_0x1d5648(0x8eb)](this,_0x2b68e4),this[_0x1d5648(0x5cd)]();},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x886)]=Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x4d6)],Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x4d6)]=function(_0x533870){const _0x2acfe0=_0x421ee0;VisuMZ['BattleCore'][_0x2acfe0(0x886)][_0x2acfe0(0x8eb)](this,_0x533870),this['callNextMethod']();},VisuMZ[_0x421ee0(0x674)]['Window_BattleLog_performSubstitute']=Window_BattleLog['prototype'][_0x421ee0(0x46b)],Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x46b)]=function(_0x4685b2,_0x32f10f){const _0x4779d9=_0x421ee0;VisuMZ[_0x4779d9(0x674)][_0x4779d9(0x3f9)][_0x4779d9(0x8eb)](this,_0x4685b2,_0x32f10f),this[_0x4779d9(0x5cd)]();},VisuMZ[_0x421ee0(0x674)][_0x421ee0(0x177)]=Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x4ff)],Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x4ff)]=function(_0x62ecd8){const _0x17dfef=_0x421ee0;VisuMZ['BattleCore'][_0x17dfef(0x177)]['call'](this,_0x62ecd8),this[_0x17dfef(0x5cd)]();},Window_BattleLog['prototype']['performCastAnimation']=function(_0x50004d,_0x504e43){const _0xaec03c=_0x421ee0;_0x50004d['performCastAnimation'](_0x504e43),this[_0xaec03c(0x5cd)]();},Window_BattleLog['prototype'][_0x421ee0(0x74d)]=function(_0xd98f4f,_0x20888f){const _0x21000b=_0x421ee0,_0x48b4ad=_0xd98f4f[_0x21000b(0x8e5)]();_0x48b4ad<=0x0?SoundManager[_0x21000b(0x2bd)]():this[_0x21000b(0x7bb)](_0x20888f,_0x48b4ad);},Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x8e0)]=function(_0x2b537e,_0xf97165,_0x189f08){const _0x20e271=_0x421ee0,_0x15ebe3=[_0x2b537e][_0x20e271(0x378)](_0xf97165);for(const _0x40a387 of _0x15ebe3){if(!_0x40a387)continue;_0x40a387[_0x20e271(0x1bc)](_0x189f08);}this['callNextMethod']();},Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x2b5)]=function(_0x34c260){this['_waitCount']=_0x34c260;},Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x6f0)]=function(_0x594eb8,_0x360787){const _0x51de61=_0x421ee0;for(const _0x3e027 of _0x594eb8){if(!_0x3e027)continue;_0x3e027[_0x51de61(0x6f0)](_0x360787);}this['callNextMethod']();},Window_BattleLog[_0x421ee0(0x2cb)]['performMoveToPoint']=function(_0x1f59a6,_0x48ccc8,_0x199de4,_0x3e601f,_0x5e1f94,_0x5284d8){const _0x10f81e=_0x421ee0;_0x1f59a6['moveBattlerToPoint'](_0x48ccc8,_0x199de4,_0x3e601f,_0x5e1f94,_0x5284d8,-0x1),this[_0x10f81e(0x5cd)]();},Window_BattleLog[_0x421ee0(0x2cb)][_0x421ee0(0x50a)]=function(_0xf1146f,_0xf701ed,_0x346405,_0x4ad749,_0x5e3ae8,_0x10c7ac,_0xe49e82){const _0x1c9b25=_0x421ee0,_0x5fb1c1=Math[_0x1c9b25(0x72a)](..._0xf701ed[_0x1c9b25(0x1b6)](_0x3429f5=>_0x3429f5[_0x1c9b25(0x35a)]()[_0x1c9b25(0x923)]-_0x3429f5[_0x1c9b25(0x35a)]()[_0x1c9b25(0x315)]()/0x2)),_0x1843ec=Math[_0x1c9b25(0x8aa)](..._0xf701ed[_0x1c9b25(0x1b6)](_0x63b686=>_0x63b686[_0x1c9b25(0x35a)]()[_0x1c9b25(0x923)]+_0x63b686[_0x1c9b25(0x35a)]()[_0x1c9b25(0x315)]()/0x2)),_0x329189=Math['min'](..._0xf701ed['map'](_0x59a8b5=>_0x59a8b5[_0x1c9b25(0x35a)]()[_0x1c9b25(0x88b)]-_0x59a8b5[_0x1c9b25(0x35a)]()[_0x1c9b25(0x276)]())),_0x33137c=Math[_0x1c9b25(0x8aa)](..._0xf701ed[_0x1c9b25(0x1b6)](_0xff19e1=>_0xff19e1[_0x1c9b25(0x35a)]()[_0x1c9b25(0x88b)])),_0x4659d2=_0xf701ed['filter'](_0x8c2920=>_0x8c2920[_0x1c9b25(0x6da)]())[_0x1c9b25(0x4be)],_0x5b91e7=_0xf701ed[_0x1c9b25(0x7ad)](_0x3a2ff4=>_0x3a2ff4[_0x1c9b25(0x84c)]())['length'];let _0x2d8f58=0x0,_0x5287e0=0x0;if(_0x346405['match'](/front/i))_0x2d8f58=_0x4659d2>=_0x5b91e7?_0x5fb1c1:_0x1843ec;else{if(_0x346405['match'](/middle/i))_0x2d8f58=(_0x5fb1c1+_0x1843ec)/0x2,_0xe49e82=-0x1;else _0x346405[_0x1c9b25(0x5f2)](/back/i)&&(_0x2d8f58=_0x4659d2>=_0x5b91e7?_0x1843ec:_0x5fb1c1);}if(_0x346405[_0x1c9b25(0x5f2)](/head/i))_0x5287e0=_0x329189;else{if(_0x346405[_0x1c9b25(0x5f2)](/center/i))_0x5287e0=(_0x329189+_0x33137c)/0x2;else _0x346405['match'](/base/i)&&(_0x5287e0=_0x33137c);}_0xf1146f[_0x1c9b25(0x319)](_0x2d8f58,_0x5287e0,_0x4ad749,_0x5e3ae8,_0x10c7ac,_0xe49e82),this[_0x1c9b25(0x5cd)]();},Window_BattleLog['prototype'][_0x421ee0(0x914)]=function(_0x5b4cb4,_0x18107f,_0x584c67){const _0x152d9c=_0x421ee0;for(const _0x99a6c5 of _0x5b4cb4){if(!_0x99a6c5)continue;_0x99a6c5[_0x152d9c(0x727)](_0x18107f,_0x584c67);}this[_0x152d9c(0x5cd)]();};