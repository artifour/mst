/**
 * @callback LevelCallback
 * @param {number} level
 * @returns {string|number}
 */

/**
 * @typedef {Object.<string, number>} Requirements
 */

let internalSkillId = 1;

class EmptySkill {
    /**
     * @return {number}
     * @private
     */
    static _generateId() {
        return internalSkillId++;
    }

    /** @type number internal ID */
    id;

    constructor() {
        this.id = EmptySkill._generateId();
    }

    /**
     * @return {number}
     */
    getId() {
        return this.id;
    }
}

export class Skill extends EmptySkill {
    /** @type number MU skill ID */
    skillId;
    /** @type string */
    title;
    /** @type string|LevelCallback */
    description;
    /** @type string|LevelCallback icon name (icons.css) */
    icons;
    /** @type {string|Object.<number, number>|LevelCallback} */
    values;
    /** @type number */
    maxLevel;
    /** @type Requirements|null dependent on skills */
    requires;
    /** @type number minimum amount of points to learn the skill */
    requiredPoints;

    /**
     * @param {number} skillId
     * @param {string} title
     * @param {string|LevelCallback} description
     * @param {string|LevelCallback} icons
     * @param {string|Object.<number, number>|LevelCallback} values
     * @param {number} maxLevel
     * @param {Requirements|null} requires
     * @param {number} requiredPoints
     */
    constructor(skillId, title, description, icons, values, maxLevel = 20, requires = null, requiredPoints = 1) {
        super();

        this.skillId = skillId;
        this.title = title;
        this.description = description;
        this.icons = icons;
        this.values = values;
        this.maxLevel = maxLevel;
        this.requires = requires;
        this.requiredPoints = requiredPoints;
    }

    /**
     * @return {string}
     */
    getTitle() {
        return this.title;
    }

    /**
     * @param {number} level
     * @return {string}
     */
    getDescription(level) {
        if (typeof this.description === 'function') {
            return this.description(level);
        }

        const value = this.getValue(level);

        return this.description
            .replace(/{value}/, Math.trunc(value))
            .replace(/{value,}/, value.toFixed(2));
    }

    /**
     * @param {number=} level
     * @return {number}
     */
    getValue(level) {
        return this._getDataByLevel(this.values, level);
    }

    /**
     * @param {number=} level
     * @return {string}
     */
    getIcon(level = 0) {
        return this._getDataByLevel(this.icons, level);
    }

    /**
     * @return {number}
     */
    getMaxLevel() {
        return this.maxLevel;
    }

    /**
     * @return {boolean}
     */
    hasRequirements() {
        return this.requires !== null;
    }

    /**
     * @return {Requirements|null}
     */
    getRequirements() {
        return this.requires;
    }

    /**
     * @return {number}
     */
    getRequiredPoints() {
        return this.requiredPoints;
    }

    /**
     * @param {string|number|string[]|number[]|LevelCallback} data
     * @param level
     * @return {string|number}
     * @private
     */
    _getDataByLevel(data, level) {
        if (typeof data === 'function') {
            return data(level);
        }

        if (typeof data !== 'object') {
            return data;
        }

        const keys = Object.keys(data).sort().reverse();
        for (const key of keys) {
            if (key <= level) {
                return data[key];
            }
        }

        return data[keys[0]];
    }
}

export class ClassSkill extends Skill {
}

const F = 1;

export const FORMULA_1 = level => 1 + ((Math.pow(level-30, 3)+25000)/499)/6;
export const FORMULA_2 = level => 0.8+(((((Math.pow(level-30, 3)+25000)/499)/6)));
export const FORMULA_3 = level => (0.85+(((((Math.pow(level-30, 3)+25000)/499)/6))))*6;
export const FORMULA_4 = level => (0.9+(((((Math.pow(level-30, 3)+25000)/499)/6))))*8;
export const FORMULA_5 = level => (0.95+(((((Math.pow(level-30, 3)+25000)/499)/6))))*10;
export const FORMULA_6 = level => 52/(1+(((((Math.pow(level-30, 3)+25000)/499)/6))));
export const FORMULA_7 = level => (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*1.5;
export const FORMULA_8 = level => (1+(((((Math.pow(level-30, 3)+25000)/499)/50)*100)/12))*23;
export const FORMULA_9 = level => (1+(((((Math.pow(level-30, 3)+25000)/499)/50)*100)/12))*85;
export const FORMULA_11 = level => 11/(1+(((((Math.pow(level-30, 3)+25000)/499)/50)*100)/12));
export const FORMULA_12 = level => (1+(((((Math.pow(level-30, 3)+25000)/499)/50)*100)/12))*85*6;
export const FORMULA_13 = level => (1+(((((Math.pow(level-30, 3)+25000)/499)/50)*100)/12))*85*5;
export const FORMULA_14 = level => (1+(((((Math.pow(level-30, 3)+25000)/499)/50)*100)/12))*85*8;
export const FORMULA_16 = level => (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*50;
export const FORMULA_17 = level => (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*10;
export const FORMULA_18 = level => (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*6;
export const FORMULA_22 = level => (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5;
export const FORMULA_23 = level => level*1.0;
export const FORMULA_25 = level => 170;
export const FORMULA_26 = level => 150;
export const FORMULA_35 = level => (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*28;
export const FORMULA_37 = level => (1+(((((Math.pow(level-30, 3)+25000)/499)/50)*100)/12))*15;
export const FORMULA_38 = level => 0.1+(((((Math.pow(level-47, 3)+120000)/600)/41)));
export const FORMULA_39 = level => 0.9+(((((Math.pow(level-30, 3)+25000)/499)/12)));
export const FORMULA_40 = level => (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*12;
export const FORMULA_41 = level => (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*13;
export const FORMULA_42 = level => (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*14;
export const FORMULA_162 = level => level*3.5;
export const FORMULA_283 = level => (1+(((Math.pow(level-30, 3)+25000)/499)/8))-0.07475;

export const Skills = {
    /* GREEN
     */
    DurabilityReduction1: new Skill(
        300,
        'Durability Reduction (1)',
        `Durability reduction speed\nof the weapons and armor equipped\ndecreases by {value,}%.\n(excluding Cash items)`,
        'durability-reduction-1',
        FORMULA_37,
        20
    ),
    DurabilityReduction2: new Skill(
        305,
        'Durability Reduction (2)',
        `Durability reduction speed\nof the equipped accessories (necklace & rings)\ndecreases by {value,}%.\n(excluding Cash items)`,
        'durability-reduction-2',
        FORMULA_17,
        20,
        {DurabilityReduction1: 10}
    ),
    DurabilityReduction3: new Skill(
        312,
        'Durability Reduction (3)',
        `Durability reduction speed\nof the consumable items\n(Satan, Guardian Angel, Dinorant & Penril)\ndecreases by {value,}%. \n(excluding Cash items)`,
        'durability-reduction-3',
        FORMULA_17,
        20,
        {DurabilityReduction2: 10}
    ),
    PvPDefenceRateIncrease: new Skill(
        301,
        'PvP Defence Rate Increase',
        `PvP defense rate increases by {value}.`,
        'pvp-defence-rate-increase',
        FORMULA_12,
        20
    ),
    MaximumSDIncrease: new Skill(
        302,
        'Maximum SD increase',
        `Increases maximum SD by {value}.`,
        'maximum-sd-increase',
        FORMULA_13, // TODO
        20
    ),
    SDRecoverySpeedIncrease: new Skill(
        306,
        'SD Recovery Speed Increase',
        `Automatic SD recovery increases by {value,}%.`,
        'sd-recovery-speed-increase',
        FORMULA_1,
        20,
        {MaximumSDIncrease: 10}
    ),
    AutoManaRecoveryIncrease: new Skill(
        303,
        'Auto Mana Recovery Increase',
        `Automatic Mana regeneration increases by {value,}%.`,
        'auto-mana-recovery-increase',
        FORMULA_7,
        20
    ),
    AutomaticHPRecoveryIncrease: new Skill(
        307,
        'Automatic HP Recovery Increase',
        `Automatic HP recovery increases by {value,}%.`,
        'automatic-hp-recovery-increase',
        FORMULA_1,
        20,
        {AutoManaRecoveryIncrease: 10}
    ),
    AutomaticAGRecoveryIncrease: new Skill(
        310,
        'Automatic AG Recovery Increase',
        `Automatic AG recovery increases by {value,}%.`,
        'automatic-ag-recovery-increase',
        FORMULA_1,
        20,
        {AutomaticHPRecoveryIncrease: 10}
    ),
    DefenseIncrease: new Skill(
        309,
        'Defense Increase',
        `Defense increases by {value}.`,
        'defense-increase',
        FORMULA_16, // TODO
        20
    ),
    ElementalDEFIncrease: new Skill(
        746,
        'Elemental DEF Increase',
        `Elemental DEF increases by {value}.`,
        'elemental-def-increase',
        FORMULA_162,
        10
    ),
    DefenseSuccessRateIncrease: new Skill(
        313,
        'Defense Success Rate Increase',
        `Defense success rate increases by {value,}%.`,
        'defense-success-rate-increase',
        FORMULA_1,
        20,
        {DefenseIncrease: 10}
    ),
    ArmorSetBonusIncrease: new Skill(
        315,
        'Armor Set Bonus Increase',
        `Defense increases by {value} when a full armor set\n(helmet, armor, pants, gloves and boots)\nis equipped.`,
        'armor-set-bonus-increase',
        FORMULA_3,
        20
    ),
    Vengeance: new Skill(
        316,
        'Vengeance',
        `Returns 1 incoming damage to the dealer\nwith {value,}% chance\nwhen hit.`,
        'vengeance',
        FORMULA_38,
        20,
        {ArmorSetBonusIncrease: 10}
    ),
    EnergyIncrease: new Skill(
        317,
        'Energy Increase',
        `Energy increases by {value}.`,
        'energy-increase',
        FORMULA_40, // TODO
        20
    ),
    StaminaIncrease: new Skill(
        318,
        'Stamina Increase',
        `Stamina increases by {value}.`,
        'stamina-increase',
        FORMULA_40, // TODO
        20
    ),
    AgilityIncrease: new Skill(
        319,
        'Agility Increase',
        `Agility increases by {value}.`,
        'agility-increase',
        FORMULA_40, // TODO
        20
    ),
    StrengthIncrease: new Skill(
        320,
        'Strength Increase',
        `Strength increases by {value}.`,
        'strength-increase',
        FORMULA_40, // TODO
        20
    ),
    WeaponBlock: new Skill(
        664,
        'Weapon Block',
        `While equipped with a Sword, Mace, Spear, Axe, etc, you have {value,}% chance to block physical attack.\nYou can't block magical attack, and \nwhen this passive is activated, it will be shown as Parry.`,
        'weapon-block',
        FORMULA_2,
        20
    ),
    ProtectionShield: new Skill(
        634,
        'Protection Shield',
        `While equipped with a shield, you have {value,}% chance to reduce incoming damage by 1000% of shield block value. If all damage is blocked when this passive is activated, it will be shown as absorbed.`,
        'protection-shield',
        FORMULA_2,
        20
    ),
    ShieldBlock: new Skill(
        636,
        'Shield Block',
        `While equipped with a shield, you have {value,}% chance to block with a shield and reduce all incoming damage. When this passive is activated, it will be shown as Block.`,
        'shield-block',
        FORMULA_39,
        20,
        {ProtectionShield: 10}
    ),
    SteelArmor: new Skill(
        626,
        'Steel Armor',
        `Has impenetrable basic {value} defense, and this defense can't be ignored.`,
        'steel-armor',
        FORMULA_35,
        20
    ),
    /* BLUE
     */
    AttackSuccessRateIncrease: new Skill(
        325,
        'Attack Success Rate Increase',
        `Attack success rate increases by {value}.`,
        'attack-success-rate-increase',
        FORMULA_13, // TODO
        20
    ),
    CycloneStrengthener: new Skill(
        479,
        'Cyclone Strengthener',
        `Cyclone skill damage increases by {value}.`,
        'cyclone-strengthener',
        FORMULA_4,
        20
    ),
    LightningStrengthener: new Skill(
        379,
        'Lightning Strengthener',
        `Lightning skill damage increases by {value}.`,
        'lightning-strengthener',
        FORMULA_40,
        20
    ),
    BlastStrengthener: new Skill(
        382,
        'Blast Strengthener',
        `Cometfall skill damage increases by {value}.`,
        'blast-strengthener',
        FORMULA_17,
        20,
        {LightningStrengthener: 10}
    ),
    TwistingSlashStrengthener: new Skill(
        481,
        'Twisting Slash Strengthener',
        `Twisting Slash skill damage increases by {value}.`,
        'twisting-slash-strengthener',
        FORMULA_40,
        20
    ),
    FlameStrengthener: new Skill(
        378,
        'Flame Strengthener',
        `Flame skill damage increases by {value}.`,
        'flame-strengthener',
        FORMULA_35, // TODO
        20
    ),
    InfernoStrengthener: new Skill(
        381,
        'Inferno Strengthener',
        `Inferno skill damage increases by {value}.`,
        'inferno-strengthener',
        FORMULA_4,
        20,
        {FlameStrengthener: 10}
    ),
    EvilSpiritStrengthener: new Skill(
        385,
        'Evil Spirit Strengthener',
        `Evil Spirit skill damage increases by {value}.`,
        'evil-spirit-strengthener',
        FORMULA_4,
        20
    ),
    MagicMastery: new Skill(
        386,
        'Magic Mastery',
        `Wizardry increases by {value}.`,
        'magic-mastery',
        FORMULA_22,
        20,
        {EvilSpiritStrengthener: 10}
    ),
    MaximumLifeIncrease: new Skill(
        334,
        'Maximum HP Increase',
        `Max HP increases by {value}.`,
        'maximum-hp-increase',
        function (level) { return level*250; },
        20
    ),
    MaximumManaIncrease: new Skill(
        338,
        'Maximum Mana Increase',
        `Max Mana increases by {value}.`,
        'maximum-mana-increase',
        FORMULA_9, // TODO
        20,
        {MaximumLifeIncrease: 10}
    ),
    MaximumAGIncrease: new Skill(
        341,
        'Maximum AG Increase',
        `Max AG increases by {value}.`,
        'maximum-ag-increase',
        FORMULA_8,
        20,
        {MaximumManaIncrease: 10}
    ),
    IceStrengthener: new Skill(
        389,
        'Ice Strengthener',
        `Ice skill damage increases by {value}.`,
        'ice-strengthener',
        FORMULA_40,
        20
    ),
    MaxHPBoost: new Skill(
        743,
        'Max HP Boost',
        `Boosts HP to increase Max HP by {value}.`,
        'max-hp-boost',
        function (level) { return level*500; },
        20
    ),
    BloodStorm: new Skill(
        344,
        'Blood Storm',
        `Learn 'Blood Storm'.\nInflict DMG to the target within 3 tiles from the caster and those around the target.\nThis skill can be used again after 5 seconds.\n(Blade Master can be used as a combo and it is recommended for a melee-type character.)`,
        'blood-storm',
        FORMULA_25,
        10,
        null,
        10
    ),
    BloodStormStrengthener: new Skill(
        346,
        'Blood Storm Strengthener',
        `Increase Blood Storm's DMG by {value} and\nchange the cooldown time to 3 seconds.`,
        'blood-storm-strengthener',
        FORMULA_5,
        20,
        {BloodStorm: 10}
    ),
    EarthPrison: new Skill(
        495,
        'Earth Prison',
        `Learn 'Earth Prison'.\nInflicts strong damage upon targets and immobilizes them for 5 sec.\nCooldown-5 sec.\nProper skill for sorcery-type characters.`,
        'earth-prison',
        FORMULA_26,
        10,
        null,
        10
    ),
    EarthPrisonStrengthener: new Skill(
        497,
        'Earth Prison Strengthener',
        `Increases Earth Prison damage by {value}, and \nchanges Cooldown to 3 sec.`,
        'earth-prison-strengthener',
        FORMULA_4,
        20,
        {EarthPrison: 10}
    ),
    /* RED
     */
    AttackRate: new Skill(
        347,
        'Attack Rate',
        `PvP attack success rate increases by {value}.`,
        'attack-rate',
        FORMULA_14,
        20
    ),
    TwoHandedSwordStrengthener: new Skill(
        348,
        'Two-handed Sword Strengthener',
        `Physical attack power increases by {value} while equipping Two-handed Sword.`,
        'two-handed-sword-strengthener',
        FORMULA_42,
        20
    ),
    TwoHandedSwordMastery: new Skill(
        352,
        'Two-handed Sword Mastery',
        `{value} PvP attack power bonus will be added while equipping Two-handed Sword.`,
        'two-handed-sword-mastery',
        FORMULA_41,
        20,
        {TwoHandedSwordStrengthener: 10}
    ),
    OneHandedSwordStrengthener: new Skill(
        349,
        'One-handed Sword Strengthener',
        `Physical attack power increases by {value} while equipping One-handed Sword.\n(When equipping 2 swords, 50% increment will be applied to each one.)`,
        'one-handed-sword-strengthener',
        FORMULA_22,
        20
    ),
    OneHandedSwordMastery: new Skill(
        353,
        'One-handed Sword Mastery',
        `Attack speed increases by {value} while equipping One-handed Sword.`,
        'one-handed-sword-mastery',
        FORMULA_283, // TODO
        10,
        {OneHandedSwordStrengthener: 10}
    ),
    OneHandedStaffStrengthener: new Skill(
        397,
        'One-handed Staff Strengthener',
        `Wizardry increases by {value} while equipping One-handed Staff.`,
        'one-handed-staff-strengthener',
        FORMULA_22,
        20
    ),
    OneHandedStaffMastery: new Skill(
        400,
        'One-handed Staff Mastery',
        `Attack speed increases by {value} while equipping One-handed Staff.`,
        'one-handed-staff-mastery',
        FORMULA_23,
        10,
        {OneHandedStaffStrengthener: 10}
    ),
    TwoHandedStaffStrengthener: new Skill(
        398,
        'Two-handed Staff Strengthener',
        `Wizardry increases by {value} while equipping Two-handed Staff.`,
        'two-handed-staff-strengthener',
        FORMULA_42,
        20
    ),
    TwoHandedStaffMastery: new Skill(
        401,
        'Two-handed Staff Mastery',
        `PvP attack power increases by additional {value} while equipping Two-handed Staff.`,
        'two-handed-staff-mastery',
        FORMULA_42,
        20,
        {TwoHandedStaffStrengthener: 10}
    ),
    ManaReduction: new Skill(
        357,
        'Mana Reduction',
        `Mana cost decreases by {value,}%.`,
        'mana-reduction',
        FORMULA_18,
        20
    ),
    MonsterAttackSDIncrement: new Skill(
        358,
        'Monster Attack SD Increment',
        `Recovers SD by max SD/{value,} when killing a monster.`,
        'monster-attack-sd-increment',
        FORMULA_11,
        20
    ),
    MonsterAttackLifeIncrement: new Skill(
        359,
        'Monster Attack Life Increment',
        `Restores HP by max HP/{value,} when killing a monster.`,
        'monster-attack-life-increment',
        FORMULA_6,
        20
    ),
    MonsterAttackManaIncrement: new Skill(
        362,
        'Monster Attack Mana Increment',
        `Recovers Mana by max mana/{value,} when killing a monster.`,
        'monster-attack-mana-increment',
        FORMULA_6,
        20,
        {MonsterAttackLifeIncrement: 10}
    ),
    MinimumWizardryIncrease: new Skill(
        405,
        'Minimum Wizardry Increase',
        `Min. Wizardry increases by {value}.`,
        'minimum-wizardry-increase',
        FORMULA_22,
        20
    ),
    MaximumWizardryIncrease: new Skill(
        407,
        'Maximum Wizardry Increase',
        `Max. Wizardry increases by {value}.`,
        'maximum-wizardry-increase',
        FORMULA_3,
        20,
        {MinimumWizardryIncrease: 10}
    ),
    MinimumAttackPowerIncrease: new Skill(
        361,
        'Minimum Attack Power Increase',
        `Min. attack power increases by {value}.`,
        'minimum-attack-power-increase',
        FORMULA_22, // TODO
        20
    ),
    MaximumAttackPowerIncrease: new Skill(
        364,
        'Maximum Attack Power Increase',
        `Max. attack power increases by {value}.`,
        'maximum-attack-power-increase',
        FORMULA_3, // TODO
        20,
        {MinimumAttackPowerIncrease: 10}
    ),
    IncreasesCriticalDamageRate: new Skill(
        366,
        'Increases critical damage rate',
        `Critical damage rate increases by {value,}%.`,
        'increases-critical-damage-rate',
        FORMULA_38,
        20
    ),
    IncreasesExcellentDamageRate: new Skill(
        369,
        'Increases excellent damage rate',
        `Excellent damage rate increases by {value,}%.`,
        'increases-excellent-damage-rate',
        FORMULA_38,
        20,
        {IncreasesCriticalDamageRate: 10}
    ),
    RestoresAllMana: new Skill(
        367,
        'Restores all Mana',
        `You have a {value,}% chance to fully recover your mana any time you take damage.`,
        'restores-all-mana',
        FORMULA_38,
        20
    ),
    RestoresAllHP: new Skill(
        368,
        'Restores all HP',
        `You have a {value,}% chance to fully recover your HP any time you take damage.`,
        'restores-all-hp',
        FORMULA_38, // TODO
        20
    ),
    RestoresAllSD: new Skill(
        372,
        'Restores all SD',
        `{value,}% chance to fully recover SD when attacking a target.`,
        'restores-all-sd',
        FORMULA_38, // TODO
        20,
        {RestoresAllHP: 10}
    ),
    AbsorbLife: new Skill(
        628,
        'Absorb Life',
        `Every successful attack on the enemy recovers HP by {value} with a 50% chance.`,
        'absorb-life',
        FORMULA_22,
        20
    ),
    IncreasesChanceOfIgnoreDEF: new Skill(
        371,
        'Increases Chance of Ignore DEF',
        `Chance to inflict damage ignoring enemy's defense increases by {value}%.`,
        'increases-chance-of-ignore-def',
        FORMULA_38,
        20
    ),




    MaceStrengthener: new Skill(
        350,
        'Mace Strengthener',
        `Physical attack power increases by {value} while equipping Mace.\n(When equipping 2 Maces, 50% increment will be applied to each one.)`,
        'mace-strengthener',
        function (level) { return level*(level/level); },
        20
    ),
    SpearStrengthener: new Skill(
        351,
        'Spear Strengthener',
        `Physical attack power increases by {value} while equipping Spear.`,
        'spear-strengthener',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*13; },
        20
    ),

    MaceMastery: new Skill(
        354,
        'Mace Mastery',
        `Increases a chance to ignore enemy defenses by {value}% while equipping Mace.`,
        'mace-mastery',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        20,
        {MaceStrengthener: 10}
    ),
    SpearMastery: new Skill(
        355,
        'Spear Mastery',
        `Double Damage rate increases by {value}% while equipping Spear.`,
        'spear-mastery',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        20,
        {SpearStrengthener: 10}
    ),
    SwellLifeStrengthener: new Skill(
        356,
        'Swell Life Strengthener',
        `Stamina buff effect increases by {value}%.`,
        'swell-life-strengthener',
        function (level) { return ((((level+700)*15)+(((((level+700)*15)*0.2)/500)*(level-(level+700))))-(((level-(level+700))*15)+(((((level-(level+700))*15)*0.2)/500)*(level-(level+700)))*((1+Math.pow(level-(level+700), 1.1)/1000))*0.3)); },
        20
    ),
    SwellLifeProficiency: new Skill(
        360,
        'Swell Life Proficiency',
        `Swell Life skill increases Max Mana by additional {value}%.`,
        'swell-life-proficiency',
        function (level) { return ((((level+700)*15)+(((((level+700)*15)*0.2)/500)*(level-(level+700))))-(((level-(level+700))*15)+(((((level-(level+700))*15)*0.2)/500)*(level-(level+700)))*((1+Math.pow(level-(level+700), 1.1)/1000))*0.3)); },
        20,
        {SwellLifeStrengthener: 10}
    ),
    SwellLifeMastery: new Skill(
        363,
        'Swell Life Mastery',
        `Swell Life additionally increases max. AG by {value}%.`,
        'swell-life-mastery',
        function (level) { return ((((level+700)*15)+(((((level+700)*15)*0.2)/500)*(level-(level+700))))-(((level-(level+700))*15)+(((((level-(level+700))*15)*0.2)/500)*(level-(level+700)))*((1+Math.pow(level-(level+700), 1.1)/1000))*0.3)); },
        20,
        {SwellLifeProficiency: 10}
    ),
    BattleMind: new Skill(
        630,
        'Battle Mind',
        `Increases damage by {value} when attacking an enemy within 2 tiles.`,
        'battle-mind',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),

    ExpansionOfWizardryStrengthen: new Skill(
        380,
        'Expansion of Wizardry Strengthen',
        `Expansion of Wizardry increases max. Wizardry by {value}%.`,
        'expansion-of-wizardry-strengthen',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        20
    ),
    StrongBeliefStrengthening: new Skill(
        810,
        'Strong Belief Strengthening',
        `When using a Strong Belief skill the basic defense is increased by {value}.`,
        'strong-belief-strengthening',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    RagefulBlowStrengthening: new Skill(
        812,
        'Rageful Blow Strengthening',
        `Anger Blow damage increased by {value}.`,
        'rageful-blow-strengthening',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    WeaponMastery: new Skill(
        335,
        'Weapon Mastery',
        `Physical attack power increases by {value}.`,
        'weapon-mastery',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    SolidProtectionStrengthening: new Skill(
        803,
        'Solid Protection Strengthening',
        `HP conversion rate increased by {value}% when using Solid Protection.`,
        'solid-protection-strengthening',
        function (level) { return 1.91+(Math.pow(level, 1.4)/3); },
        20
    ),
    SlashStrengthener: new Skill(
        336,
        'Slash Strengthener',
        `The blow skill's damage is increased by {value}, and the usable distance is increased to 4.`,
        'slash-strengthener',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    SolidProtectionSkill: new Skill(
        804,
        'Solid Protection Skill',
        `The damage taken instead of (Damage Conversion Rate) is increased by {value}%`,
        'solid-protection-skill',
        function (level) { return 1.01+(Math.pow(level, 1.3)/8.2); },
        20,
        {SolidProtectionStrengthening: 10}
    ),
    DeathStabProficiency: new Skill(
        339,
        'Death Stab Proficiency',
        `Death Stab skill damage is increased by {value}.`,
        'death-stab-proficiency',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20,
        {SlashStrengthener: 10}
    ),
    SolidProtectionMastery: new Skill(
        806,
        'Solid Protection Mastery',
        `Increases the attack damage/power of party members by {value}  when using Solid Protection.`,
        'solid-protection-mastery',
        function (level) { return 10+((Math.pow(level+10, 2)/4)-25)/2.5; },
        20,
        {SolidProtectionSkill: 10}
    ),
    StrikeOfDestructionStrengthening: new Skill(
        807,
        'Strike of Destruction Strengthening',
        `Strike of Destruction attack motion is shortened, and the damage increases according to the energy stat. The damage count is additionally increases by {value}.`,
        'strike-of-destruction-strengthening',
        function (level) { return level/10; },
        10,
        {SolidProtectionMastery: 10}
    ),
    StrikeOfDestructionMastery: new Skill(
        809,
        'Strike of Destruction Mastery',
        `Strike of Destruction damage range is increased and the ice effect is removed. Skill attack power is increased by {value}.`,
        'strike-of-destruction-mastery',
        function (level) { return (Math.pow(level+10, 2)/3); },
        20,
        {StrikeOfDestructionStrengthening: 10}
    ),
    ComboStrengthener: new Skill(
        345,
        'Combo Strengthener',
        `The combo DMG increases by {value}%.`,
        'combo-strengthener',
        function (level) { return ((((level+700)*15)+(((((level+700)*15)*0.2)/500)*(level-(level+700))))-(((level-(level+700))*15)+(((((level-(level+700))*15)*0.2)/500)*(level-(level+700)))*((1+Math.pow(level-(level+700), 1.1)/1000))*0.3)); },
        20
    ),
    Rush: new Skill(
        813,
        'Rush',
        `Learns the 'Rush' skill.\nQuickly rushes to an enemy target within 7 tiles, dealing damage with a powerful blow.\n Cooldown is 1 second.`,
        'rush',
        function (level) { return 300; },
        10
    ),
    WingsOfEternalPowerUp2: new Skill(
        375,
        'Wings of Eternal Power Up (2)',
        `Defense increase by {value} while equipping the Wing of Eternal.`,
        'wings-of-eternal-power-up-2',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*10; },
        20
    ),
    WingsOfEternalPowerUp3: new Skill(
        377,
        'Wings of Eternal Power Up (3)',
        `Equipping the eternal wings increases your wizardry by {value}.`,
        'wings-of-eternal-power-up-3',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*10; },
        20,
        {WingsOfEternalPowerUp2: 10}
    ),
    ExpansionOfWizardryMastery: new Skill(
        383,
        'Expansion of Wizardry Mastery',
        `Expansion of Wizardry skill increases critical damage rate by {value}%.`,
        'expansion-of-wizardry-mastery',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        20,
        {ExpansionOfWizardryStrengthen: 10}
    ),
    DecayStrengthener: new Skill(
        387,
        'Decay Strengthener',
        `Decay skill damage increases by {value}.`,
        'decay-strengthener',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*10; },
        20
    ),
    HellfireStrengthener: new Skill(
        388,
        'Hellfire Strengthener',
        `Hellfire skill damage increases by {value}.`,
        'hellfire-strengthener',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*12; },
        20
    ),
    MeteoriteStrengthener: new Skill(
        390,
        'Meteorite Strengthener',
        `Meteor skill damage increases by {value}.`,
        'meteorite-strengthener',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*12; },
        20
    ),
    IceStormStrengthener: new Skill(
        391,
        'Ice Storm Strengthener',
        `Ice Storm skill damage increases by {value}.`,
        'ice-storm-strengthener',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*10; },
        20
    ),
    NovaStrengthener: new Skill(
        392,
        'Nova Strengthener',
        `Nova skill damage increases by {value}.`,
        'nova-strengthener',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*10; },
        20,
        {HellfireStrengthener: 10}
    ),
    Illusion: new Skill(
        642,
        'Illusion',
        `Learns Illusion.\nCreates the alter ego identical to yourself and attack together.  Your alter ego has 30% chance to absorb the damage you receive.\nYour alter ego disappears after its HP is consumed or duration is over.\nCooldown-2 mins.`,
        'illusion',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        10
    ),
    ShieldStrengthener: new Skill(
        399,
        'Shield Strengthener',
        `Defense increases by {value} while equipping Shield.`,
        'shield-strengthener',
        function (level) { return level/20; },
        20
    ),
    ShieldMastery: new Skill(
        402,
        'Shield Mastery',
        `Defense increases by {value} while equipping a Shield.`,
        'shield-mastery',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*10; },
        20,
        {ShieldStrengthener: 10}
    ),
    ManaShieldStrengthener: new Skill(
        403,
        'Mana Shield Strengthener',
        `Damage Reduction increases by additional {value}%.`,
        'mana-shield-strengthener',
        function (level) { return ((((level+700)*15)+(((((level+700)*15)*0.2)/500)*(level-(level+700))))-(((level-(level+700))*15)+(((((level-(level+700))*15)*0.2)/500)*(level-(level+700)))*((1+Math.pow(level-(level+700), 1.1)/1000))*0.3)); },
        20
    ),
    ManaShieldProficiency: new Skill(
        404,
        'Mana Shield Proficiency',
        `Skill duration increases by {value} second(s).`,
        'mana-shield-proficiency',
        function (level) { return level/20; },
        20,
        {ManaShieldStrengthener: 10}
    ),
    ManaShieldMastery: new Skill(
        406,
        'Mana Shield Mastery',
        `Soul Barrier skill increases max. Mana by additional {value}%.`,
        'mana-shield-mastery',
        function (level) { return ((((level+700)*15)+(((((level+700)*15)*0.2)/500)*(level-(level+700))))-(((level-(level+700))*15)+(((((level-(level+700))*15)*0.2)/500)*(level-(level+700)))*((1+Math.pow(level-(level+700), 1.1)/1000))*0.3)); },
        20,
        {ManaShieldProficiency: 10}
    ),
    WingsOfStormPowerUp2: new Skill(
        322,
        'Wings of Storm Power Up (2)',
        `Defense increases by {value}\nwhile equipping the Wing of Storm.`,
        'wings-of-storm-power-up-2',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*10; },
        20
    ),
    WingsOfStormPowerUp3: new Skill(
        324,
        'Wings of Storm Power Up (3)',
        `Attack power increases by {value}\nwhile equipping the Wing of Storm.`,
        'wings-of-storm-power-up-3',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*10; },
        20,
        {WingsOfStormPowerUp2: 10}
    ),
    GrandMagicPowUp: new Skill(
        641,
        'Grand Magic PowUp',
        `Increases magical damage by {value} when attacking an enemy over 4 tiles away.`,
        'grand-magic-powup',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    AbsorbShield: new Skill(
        719,
        'Absorb Shield',
        `Every successful attack on the enemy recovers SD by {value} with a 50% chance.`,
        'absorb-shield',
        function (level) { return level*(level/level); },
        20,
        {AbsorbLife: 10}
    ),
    WingsOfIllusionPowerUp2: new Skill(
        410,
        'Wings of Illusion Power Up (2)',
        `Defense increases by {value} while equipping the Wing of Illusion.`,
        'wings-of-illusion-power-up-2',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*10; },
        20
    ),
    WingsOfIllusionPowerUp3: new Skill(
        412,
        'Wings of Illusion Power Up (3)',
        `Attack power increases by {value} while equipping the Wing of Illusion.`,
        'wings-of-illusion-power-up-3',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*10; },
        20,
        {WingsOfIllusionPowerUp2: 10}
    ),
    HealStrengthener: new Skill(
        413,
        'Heal Strengthener',
        `Healing increases by {value}%.`,
        'heal-strengthener',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    TripleShotStrengthener: new Skill(
        414,
        'Triple Shot Strengthener',
        `Triple Shot skill damage increases by {value}.`,
        'triple-shot-strengthener',
        function (level) { return level*F*level/level; },
        20
    ),
    SummonedMonsterStrengthener1: new Skill(
        415,
        'Summoned Monster Strengthener (1',
        `Summoned monster's HP increases by {value}%.`,
        'summoned-monster-strengthener-1',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*25; },
        20
    ),
    PenetrationStrengthener: new Skill(
        416,
        'Penetration Strengthener',
        `Penetration skill damage increases by {value}.`,
        'penetration-strengthener',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*10; },
        20
    ),
    GreatDefenseStrengthener: new Skill(
        417,
        'Great Defense Strengthener',
        `Defense buff effect increases by {value}%.`,
        'great-defense-strengthener',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    TripleShotMastery: new Skill(
        418,
        'Triple Shot Mastery',
        `One more arrow will be fired with Triple Shot skill.\n(Consumed at once by 10 points, you will learn this skill.)`,
        'triple-shot-mastery',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        10,
        {TripleShotStrengthener: 10}
    ),
    SummonedMonsterStrengthener2: new Skill(
        419,
        'Summoned Monster Strengthener (2',
        `Summoned monster's Defense increases by {value}%.`,
        'summoned-monster-strengthener-2',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*25; },
        20,
        {SummonedMonsterStrengthener1: 10}
    ),
    GreatDamageStrengthener: new Skill(
        420,
        'Great Damage Strengthener',
        `Damage buff effect increases by {value}%.`,
        'great-damage-strengthener',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    AttackIncreaseMastery: new Skill(
        422,
        'Attack Increase Mastery',
        `Attack Increase skill effect increases by {value}%, and skill duration increases per skill level.`,
        'attack-increase-mastery',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20,
        {GreatDamageStrengthener: 10}
    ),
    DefenseIncreaseMastery: new Skill(
        423,
        'Defense Increase Mastery',
        `Defense Increase skill effect increases by {value}%, and skill duration increases per skill level.`,
        'defense-increase-mastery',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20,
        {GreatDefenseStrengthener: 10}
    ),
    IceArrowStrengthener: new Skill(
        424,
        'Ice Arrow Strengthener',
        `Ice Arrow skill damage increases by {value}.`,
        'ice-arrow-strengthener',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    Cure: new Skill(
        425,
        'Cure',
        `Learns the skill 'Cure'.\nRemove status effect from the target with a certain chance. This skill can be used again after 3 seconds.`,
        'cure',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        10,
        {DefenseIncreaseMastery: 10}
    ),
    MultiShotStrengthener: new Skill(
        411,
        'Multi-Shot Strengthener',
        `Increases your multishot skill damage by {value}.`,
        'multishot-strengthener',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    PartyHealing: new Skill(
        426,
        'Party Healing',
        `Learns 'Party Healing'.\nAdditional 3 party members around the target gets healed. The amount healed decreases by 20% every time the target changes. Cooldown: 10 seconds`,
        'party-healing',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        10
    ),
    SummonedMonsterStrengthener3: new Skill(
        428,
        'Summoned Monster Strengthener (3)',
        `Summoned monster's attack power increases by {value}%.`,
        'summoned-monster-strengthener-3',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*25; },
        20
    ),
    PartyHealingStrengthener: new Skill(
        429,
        'Party Healing Strengthener',
        `Party Heal amount increases by {value}%.`,
        'party-healing-strengthener',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20,
        {PartyHealing: 10}
    ),
    Bless: new Skill(
        430,
        'Bless',
        `Learn the 'bless' skill. \nThis skill increases all of your target's stats.(By 1 for every 100 your energy)`,
        'bless',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        10
    ),
    PoisonArrow: new Skill(
        427,
        'Poison Arrow',
        `Learns 'Poison Arrow'.\nInflicts strong damage and poisons the target. \nPoison effect causes damage (Min. Damage/5) every second and \nlasts for 10 seconds.\nCooldown: 1 sec.`,
        'poison-arrow',
        function (level) { return 130; },
        10
    ),
    SummonSatyros: new Skill(
        432,
        'Summon Satyros',
        `Learns 'Summon Satyros'.\nSummons a Satyros to fight for the summoner.`,
        'summon-satyros',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        10,
        {SummonedMonsterStrengthener3: 10}
    ),
    ShadowStep: new Skill(
        651,
        'Shadow Step',
        `Learn 'Shadow Step'. \nMoves swiftly as far as 5 tiles toward the direction you've chosen.\nCooldown-3 sec.`,
        'shadow-step',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        10
    ),
    BlessStrengthener: new Skill(
        433,
        'Bless Strengthener',
        `Bless skill increases stats by {value}.`,
        'bless-strengthener',
        function (level) { return level/20; },
        20,
        {Bless: 10}
    ),
    PoisonArrowStrengthener: new Skill(
        434,
        'Poison Arrow Strengthener',
        `Increases Poison Arrow damage and poison damage by {value}, and changes Cooldown to 0.5 sec.`,
        'poison-arrow-strengthener',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*12; },
        20,
        {PoisonArrow: 10}
    ),
    Evasion: new Skill(
        652,
        'Evasion',
        `Learns the skill 'Evasion'.\nThe skill increases the basic defense success rate by 50% for 7 seconds.\nThis skill can be used again after 60 seconds.`,
        'evasion',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        10
    ),
    BowStrengthener: new Skill(
        435,
        'Bow Strengthener',
        `Damage increases by {value} while equipping Bow.`,
        'bow-strengthener',
        function (level) { return level*(level/level); },
        20
    ),
    CrossbowStrengthener: new Skill(
        436,
        'Crossbow Strengthener',
        `Damage increases by {value} while equipping Crossbow.`,
        'crossbow-strengthener',
        function (level) { return level*F*level/level; },
        20
    ),
    BowMastery: new Skill(
        438,
        'Bow Mastery',
        `Attack speed increases by {value} while equipping Bow.`,
        'bow-mastery',
        function (level) { return level*1.0; },
        10,
        {BowStrengthener: 10}
    ),
    CrossbowMastery: new Skill(
        439,
        'Crossbow Mastery',
        `PvP attack power increases by additional {value} while equipping Crossbow.`,
        'crossbow-mastery',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        20,
        {CrossbowStrengthener: 10}
    ),
    InfinityArrowStrengthener: new Skill(
        441,
        'Infinity Arrow Strengthener',
        `Infinity Arrow damage increases by {value}%.`,
        'infinity-arrow-strengthener',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        20
    ),
    Marksman: new Skill(
        650,
        'Marksman',
        `Increases damage by {value} when attacking an enemy over 4 tiles away.`,
        'marksman',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    WingsOfDimensionPowerUp2: new Skill(
        446,
        'Wings of Dimension Power Up (2)',
        `Defense increases by {value} while equipping the Wing of Dimension.`,
        'wings-of-dimension-power-up-2',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*10; },
        20
    ),
    WingsOfDimensionPowerUp3: new Skill(
        447,
        'Wings of Dimension Power Up (3)',
        `Wizardry and Curse increases by {value} while equipping the Wing of Dimension.`,
        'wings-of-dimension-power-up-3',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*10; },
        20,
        {WingsOfDimensionPowerUp2: 10}
    ),
    ExplosionEnhancement: new Skill(
        774,
        'Explosion Enhancement',
        `Increases damage of Explosion skill by {value}.`,
        'explosion-enhancement',
        function (level) { return level*(level/level); },
        20
    ),
    RequiemEnhancement: new Skill(
        775,
        'Requiem Enhancement',
        `Increases damage of Requiem skill by {value}.`,
        'requiem-enhancement',
        function (level) { return level*(level/level); },
        20
    ),
    PollutionEnhancement: new Skill(
        776,
        'Pollution Enhancement',
        `Increases damage of Pollution skill by {value}.`,
        'pollution-enhancement',
        function (level) { return level*(level/level); },
        20
    ),
    ChainLightningStrengthener: new Skill(
        455,
        'Chain Lightning Strengthener',
        `Chain Lightning skill damage increases by {value}.`,
        'chain-lightning-strengthener',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    Pollution: new Skill(
        777,
        'Pollution',
        `Increases attack distance of Pollution skill by 1 tile and increases its damage by {value}.`,
        'pollution',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20,
        {PollutionEnhancement: 10}
    ),
    SleepStrengthener: new Skill(
        454,
        'Sleep Strengthener',
        `The success rate of sleep skill increases by {value}%.`,
        'sleep-strengthener',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        20
    ),
    LightningShockStrengthener: new Skill(
        456,
        'Lightning Shock Strengthener',
        `Lightning Shock skill damage increases by {value}.`,
        'lightning-shock-strengthener',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    PollutionMastery: new Skill(
        778,
        'Pollution Mastery',
        `Increases number of targets of Pollution skill by 1 and increases its damage by {value}.`,
        'pollution-mastery',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20,
        {Pollution: 10}
    ),
    DrainLifeStrengthener: new Skill(
        458,
        'Drain Life Strengthener',
        `Drain Life skill damage and the amount of health absorbed increases by {value}.`,
        'drain-life-strengthener',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    WeaknessStrengthener: new Skill(
        459,
        'Weakness Strengthener',
        `The attack penalty is increased by {value} when using Weakness and its duration is increased in stages.`,
        'weakness-strengthener',
        function (level) { return level*(level/level); },
        20
    ),
    InnovationStrengthener: new Skill(
        460,
        'Innovation Strengthener',
        `Innovation skill's defense reduction increases by {value} and duration increase in stages.`,
        'innovation-strengthener',
        function (level) { return level*(level/level); },
        20
    ),
    WeaknessMastery: new Skill(
        772,
        'Weakness Mastery',
        `Elemental damage reduction is increased by {value} when using Weakness skill.`,
        'weakness-mastery',
        function (level) { return ((((Math.pow(4+level, 1.6)/7)*5.5)/5.5)*6); },
        20,
        {WeaknessStrengthener: 10}
    ),
    InnovationMastery: new Skill(
        773,
        'Innovation Mastery',
        `Elemental defense reduction effect is increased by {value} when using Innovation skill,`,
        'innovation-mastery',
        function (level) { return ((((Math.pow(4+level, 1.6)/7)*5.5)/5.5)*6); },
        20,
        {InnovationStrengthener: 10}
    ),
    Night: new Skill(
        461,
        'Night',
        `Learns the skill 'Blind'.\nThe skill Inflicts DMG to and blinds the target to block its view, greatly reducing its attack success rate with a certain chance.\nThis skill can be used again after 5 seconds.`,
        'night',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        10
    ),
    StickStrengthener: new Skill(
        465,
        'Stick Strengthener',
        `Wizardry increases by {value} while equipping Stick.`,
        'stick-strengthener',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    OtherWorldTomeStrengthener: new Skill(
        466,
        'Other World Tome Strengthener',
        `Curse increase by {value} while equipping the Other World Tome.`,
        'other-world-tome-strengthener',
        function (level) { return level*F*level/level; },
        20
    ),
    MagicGunStrengthener: new Skill(
        831,
        'Magic Gun Strengthener',
        `Magical power increased by {value} when equipped with a Magic Gun.`,
        'magic-gun-strengthener',
        function (level) { return (((Math.pow(level, 1.4)*3)/6)+8); },
        20
    ),
    StickMastery: new Skill(
        467,
        'Stick Mastery',
        `PvP attack power increases by additional {value} while equipping Stick.`,
        'stick-mastery',
        function (level) { return (1+(((Math.pow(level-30, 3)+25000)/499)/5.3))-0.07475; },
        10,
        {MagicGunStrengthener: 10}
    ),
    OtherWorldTomeMastery: new Skill(
        468,
        'Other World Tome Mastery',
        `Attack speed increases by {value} while equipping the Other World Tome.`,
        'other-world-tome-mastery',
        function (level) { return level*1.0; },
        10,
        {OtherWorldTomeStrengthener: 10}
    ),
    BerserkerStrengthener: new Skill(
        469,
        'Berserker Strengthener',
        `Berserker skill increases Wizardry by additional {value}.`,
        'berserker-strengthener',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    DarknessEnhancement: new Skill(
        770,
        'Darkness Enhancement',
        `Increases Curse Damage by {value} when using Darkness skill.`,
        'darkness-enhancement',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    BerserkerProficiency: new Skill(
        470,
        'Berserker Proficiency',
        `Berserker skill increases Attack Speed by {value}, additionally reduces HP and Defense Decreas effect.`,
        'berserker-proficiency',
        function (level) { return level*1; },
        10,
        {BerserkerStrengthener: 10}
    ),
    DarknessMastery: new Skill(
        771,
        'Darkness Mastery',
        `Increases Defense by {value} when using Darkness skill and removes HP drop effect.`,
        'darkness-mastery',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*33.3; },
        20,
        {DarknessEnhancement: 10}
    ),
    MinimumWizardryCurseIncrease: new Skill(
        471,
        'Minimum Wizardry/Curse Increase',
        `Minimum Wizardry and Curse increases by {value}.`,
        'minimum-wizardrycurse-increase',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    MaximumWizardryCurseIncrease: new Skill(
        473,
        'Maximum Wizardry/Curse Increase',
        `Maximum Wizardry and Curser increase by {value}.`,
        'maximum-wizardrycurse-increase',
        function (level) { return level*(level/level); },
        20,
        {MinimumWizardryCurseIncrease: 10}
    ),
    PainOfCurse: new Skill(
        660,
        'Pain of Curse',
        `Increases Magical Damage and Curse by {value} when attacking an enemy over 4 tiles away.`,
        'pain-of-curse',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    CommandIncreases: new Skill(
        506,
        'Command Increases',
        `Command stat increases by {value}.`,
        'command-increases',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*12; },
        20
    ),
    CapeOfEmperorPowerUp2: new Skill(
        505,
        'Cape of Emperor Power Up (2)',
        `Defense increases by {value} while equipping the Cape of Emperor.`,
        'cape-of-emperor-power-up-2',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*10; },
        20
    ),
    CapeOfEmperorPowerUp3: new Skill(
        507,
        'Cape of Emperor Power Up (3)',
        `Attack power increases by {value} while equipping the Cape of Emperor.`,
        'cape-of-emperor-power-up-3',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*10; },
        20,
        {CapeOfEmperorPowerUp2: 10}
    ),
    FireBurstStrengthener: new Skill(
        508,
        'Fire Burst Strengthener',
        `Fire Burst skill damage increases by {value}.`,
        'fire-burst-strengthener',
        function (level) { return level*F*level/level; },
        20
    ),
    ForceWaveStrengthener: new Skill(
        509,
        'Force Wave Strengthener',
        `Force Wave skill damage increases by {value}.`,
        'force-wave-strengthener',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*12; },
        20
    ),
    DarkHorseStrengthener1: new Skill(
        510,
        'Dark Horse Strengthener (1)',
        `Defense increases by {value} while equipping Dark Horse.`,
        'dark-horse-strengthener-1',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*10; },
        20
    ),
    CriticalDamageIncrease1: new Skill(
        511,
        'Critical Damage Increase (1)',
        `Critical Damage Increase skill increases critical damage by {value}.`,
        'critical-damage-increase-1',
        function (level) { return level*(level/level); },
        20
    ),
    EarthquakeStrengthener: new Skill(
        512,
        'Earthquake Strengthener',
        `Earthshake skill damage increases by {value}.`,
        'earthquake-strengthener',
        function (level) { return level*F*level/level; },
        20,
        {DarkHorseStrengthener1: 10}
    ),
    CriticalDamageIncrease2: new Skill(
        515,
        'Critical Damage Increase (2)',
        `Effect duration increases by {value}.`,
        'critical-damage-increase-2',
        function (level) { return level/20; },
        20,
        {CriticalDamageIncrease1: 10}
    ),
    CriticalDamageIncrease3: new Skill(
        517,
        'Critical Damage Increase (3)',
        `Critical Damage Increase skill increases Critical damage rate by additional {value}%.`,
        'critical-damage-increase-3',
        function (level) { return ((((level+700)*15)+(((((level+700)*15)*0.2)/500)*(level-(level+700))))-(((level-(level+700))*15)+(((((level-(level+700))*15)*0.2)/500)*(level-(level+700)))*((1+Math.pow(level-(level+700), 1.1)/1000))*0.3)); },
        20,
        {CriticalDamageIncrease2: 10}
    ),
    FireScreamStrengthener: new Skill(
        518,
        'Fire Scream Strengthener',
        `Fire Scream skill damage increases by {value}.`,
        'fire-scream-strengthener',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    ElectricSparkStrengthener: new Skill(
        519,
        'Electric Spark Strengthener',
        `Electric Spark skill damage increases by {value}.`,
        'electric-spark-strengthener',
        function (level) { return level*(level/level); },
        20
    ),
    FireScreamMastery: new Skill(
        520,
        'Fire Scream Mastery',
        `The explosive damage of Fire Scream skill increases by {value}.`,
        'fire-scream-mastery',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        20,
        {FireScreamStrengthener: 10}
    ),
    CriticalDamageIncreaseMastery: new Skill(
        522,
        'Critical Damage Increase Mastery',
        `Critical Damage Increase skill increases Excellent damage rate by additional {value}%.`,
        'critical-damage-increase-mastery',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        20,
        {CriticalDamageIncrease3: 10}
    ),
    ChaoticDiseierStrengthener: new Skill(
        523,
        'Chaotic Diseier Strengthener',
        `Chaotic Diseier skill damage increases by {value}.`,
        'chaotic-diseier-strengthener',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    DarkSpiritStrengthener: new Skill(
        526,
        'Dark Spirit Strengthener',
        `Dark Spirit's attack power increases by {value}.`,
        'dark-spirit-strengthener',
        function (level) { return level*(level/level); },
        20
    ),
    ScepterStrengthener: new Skill(
        527,
        'Scepter Strengthener',
        `Attack power increases by {value} while equipping Scepter.`,
        'scepter-strengthener',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    UseScepterPetStrengthener: new Skill(
        529,
        'Use Scepter: Pet Strengthener',
        `Dark Spirit's attack power increases by {value} while equipping Scepter.`,
        'use-scepter-pet-strengthener',
        function (level) { return level*(level/level); },
        20
    ),
    DarkSpiritStrengthener2: new Skill(
        530,
        'Dark Spirit Strengthener (2)',
        `Dark Spirit's critical damage rate increases by additional {value}%.`,
        'dark-spirit-strengthener-2',
        function (level) { return ((((level+700)*15)+(((((level+700)*15)*0.2)/500)*(level-(level+700))))-(((level-(level+700))*15)+(((((level-(level+700))*15)*0.2)/500)*(level-(level+700)))*((1+Math.pow(level-(level+700), 1.1)/1000))*0.3)); },
        20,
        {DarkSpiritStrengthener: 10}
    ),
    ScepterMastery: new Skill(
        531,
        'Scepter Mastery',
        `PvP attack power increases by additional {value} while equipping Scepter.`,
        'scepter-mastery',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        20,
        {ScepterStrengthener: 10}
    ),
    CommandAttackIncrease: new Skill(
        533,
        'Command Attack Increase',
        `When a scepter is equipped, DMG increases by 1 for every {value} Cmd stat.`,
        'command-attack-increase',
        function (level) { return 41/(1+(((((Math.pow(level-29, 3)+22333)/444)/10))))+0.8; },
        10,
        {UseScepterPetStrengthener: 10}
    ),
    DarkSpiritStrengthener3: new Skill(
        534,
        'Dark Spirit Strengthener (3)',
        `Dark Spirit's excellent damage rate increases by additional {value}%.`,
        'dark-spirit-strengthener-3',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        20,
        {DarkSpiritStrengthener2: 10}
    ),
    DarkSpiritStrengthener5: new Skill(
        538,
        'Dark Spirit Strengthener (5)',
        `Dark Spirit's double damage rate increases by additional {value}%.`,
        'dark-spirit-strengthener-5',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        20
    ),
    PetDurabilityStrengthener: new Skill(
        535,
        'Pet Durability Strengthener',
        `Pet's life reduction speed decreases by {value}%.`,
        'pet-durability-strengthener',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*10; },
        20
    ),
    SpiritLord: new Skill(
        539,
        'Spirit Lord',
        `Dark Spirit's chance to inflict dmg ignoring enemy's defense increases by additional {value}%.`,
        'spirit-lord',
        function (level) { return 0.1+(((((Math.pow(level-47, 3)+120000)/600)/41))); },
        20,
        {DarkSpiritStrengthener5: 10}
    ),
    DarkSpiritStrengthener4: new Skill(
        536,
        'Dark Spirit Strengthener (4)',
        `Dark Spirit's attack speed increases by additional {value}.`,
        'dark-spirit-strengthener-4',
        function (level) { return level*1.0; },
        20
    ),
    IncreasePvPDefenseRate: new Skill(
        579,
        'Increase PvP Defense Rate',
        `Increases pvp defense rate by {value}.`,
        'increase-pvp-defense-rate',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/50)*100)/12))*85*2.5; },
        20
    ),
    IncreaseManaRecoveryRate: new Skill(
        581,
        'Increase Mana Recovery Rate',
        `Increases automatic mana recovery by {value}%.`,
        'increase-mana-recovery-rate',
        function (level) { return ((((level+700)*15)+(((((level+700)*15)*0.2)/500)*(level-(level+700))))-(((level-(level+700))*15)+(((((level-(level+700))*15)*0.2)/500)*(level-(level+700)))*((1+Math.pow(level-(level+700), 1.1)/1000))*0.3)); },
        20
    ),
    IncreaseSDRecoveryRate: new Skill(
        584,
        'Increase SD Recovery Rate',
        `Increases SD recovery rate by {value}%.`,
        'increase-sd-recovery-rate',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        20,
        {MaximumSDIncrease: 10}
    ),
    IncreaseLifeRecoveryRate: new Skill(
        585,
        'Increase Life Recovery Rate',
        `Increases HP recovery rate by {value}%.`,
        'increase-life-recovery-rate',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        20,
        {IncreaseManaRecoveryRate: 10}
    ),
    IncreasesDefense: new Skill(
        587,
        'Increases Defense',
        `Increases defense rate by {value}.`,
        'increases-defense',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*28; },
        20
    ),
    IncreasesStaminaRecoveryRate: new Skill(
        588,
        'Increases Stamina Recovery Rate',
        `Increases AG recovery rate by {value}%.`,
        'increases-stamina-recovery-rate',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        20,
        {IncreaseLifeRecoveryRate: 10}
    ),
    IncreaseDefenseSuccessRate: new Skill(
        591,
        'Increase Defense Success Rate',
        `Increases defense success rate by {value}%.`,
        'increase-defense-success-rate',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        20,
        {IncreasesDefense: 10}
    ),
    IncreaseSetDefense: new Skill(
        593,
        'Increase Set Defense',
        `Set (helm, vest, pants, gloves, and boots) bonus: increases defense by {value}.`,
        'increase-set-defense',
        function (level) { return level*(level/level); },
        20
    ),
    IncreaseEnergy: new Skill(
        595,
        'Increase Energy',
        `Increases energy stat by {value}.`,
        'increase-energy',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*8; },
        20
    ),
    IncreaseVitality: new Skill(
        596,
        'Increase Vitality',
        `Stamina increases by {value}.`,
        'increase-vitality',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*8; },
        20
    ),
    IncreaseAgility: new Skill(
        597,
        'Increase Agility',
        `Increases agility stat by {value}.`,
        'increase-agility',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*8; },
        20
    ),
    IncreaseStrength: new Skill(
        598,
        'Increase Strength',
        `Increases strength stat by {value}.`,
        'increase-strength',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*8; },
        20
    ),
    CapeOfOverrulePowerUp2: new Skill(
        549,
        'Cape of Overrule Power Up (2)',
        `Equipping the reigning cloak increases your defense by {value}.`,
        'cape-of-overrule-power-up-2',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*10; },
        20
    ),
    CapeOfOverrulePowerUp3: new Skill(
        550,
        'Cape of Overrule Power Up (3)',
        `Equipping the reigning cloak increases your attack power by {value}.`,
        'cape-of-overrule-power-up-3',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*10; },
        20,
        {CapeOfOverrulePowerUp2: 10}
    ),
    IncreaseAttackSuccessRate: new Skill(
        599,
        'Increase Attack Success Rate',
        `Increases attack success rate by {value}.`,
        'increase-attack-success-rate',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/50)*100)/12))*85*2; },
        20
    ),
    KillingBlowStrengthener: new Skill(
        551,
        'Killing Blow Strengthener',
        `Increases killing blow attack power by {value}.`,
        'killing-blow-strengthener',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    BeastUppercutStrengthener: new Skill(
        552,
        'Beast Uppercut Strengthener',
        `Increases beast uppercut attack power by {value}.`,
        'beast-uppercut-strengthener',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    PhoenixShotStrengthener: new Skill(
        744,
        'Phoenix Shot Strengthener',
        `Increases the DMG of Phoenix Shot by {value}.`,
        'phoenix-shot-strengthener',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    KillingBlowMastery: new Skill(
        554,
        'Killing Blow Mastery',
        `The killing blow skill has a chance of reducing your target's attack rate by {value}.`,
        'killing-blow-mastery',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        20,
        {KillingBlowStrengthener: 10}
    ),
    BeastUppercutMastery: new Skill(
        555,
        'Beast Uppercut Mastery',
        `The beast uppercut skill has a chance of reducing the target's defense rate by {value}.`,
        'beast-uppercut-mastery',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        20,
        {BeastUppercutStrengthener: 10}
    ),
    PhoenixShotMastery: new Skill(
        745,
        'Phoenix Shot Mastery',
        `Phoenix Shot increases the defense success rate reduction effect by {value}%.`,
        'phoenix-shot-mastery',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        20,
        {PhoenixShotStrengthener: 10}
    ),
    IncreaseMaximumLife: new Skill(
        600,
        'Increase Maximum Life',
        `Increases maximum HP by {value}.`,
        'increase-maximum-life',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/50)*100)/12))*45; },
        20
    ),
    ChainDriveStrengthener: new Skill(
        558,
        'Chain Drive Strengthener',
        `Increases chain drive attack power by {value}.`,
        'chain-drive-strengthener',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    DarkSideStrengthener: new Skill(
        559,
        'Dark Side Strengthener',
        `Increases dark side attack power by {value}.`,
        'dark-side-strengthener',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    IncreaseMaximumMana: new Skill(
        601,
        'Increase Maximum Mana',
        `Increases maximum mana by {value}.`,
        'increase-maximum-mana',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/50)*100)/12))*45; },
        20,
        {IncreaseMaximumLife: 10}
    ),
    DragonRoarStrengthener: new Skill(
        560,
        'Dragon Roar Strengthener',
        `Increases dragon roar attack power by {value}.`,
        'dragon-roar-strengthener',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    IncreaseMaximumStamina: new Skill(
        602,
        'Increase Maximum Stamina',
        `Increases maximum AG by {value}.`,
        'increase-maximum-stamina',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/50)*100)/12))*15; },
        20,
        {IncreaseMaximumMana: 10}
    ),
    DarkSideMastery: new Skill(
        563,
        'Dark Side Mastery',
        `Increases the range of Dark side skill by 1 tile.\n10 points are required for skill investment.`,
        'dark-side-mastery',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        10,
        {DarkSideStrengthener: 10}
    ),
    DragonSlasherStrengthener: new Skill(
        564,
        'Dragon Slasher Strengthener',
        `Increases Dragon Slasher attack power by {value}.`,
        'dragon-slasher-strengthener',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    BloodHowling: new Skill(
        565,
        'Blood Howling',
        `Learns the skill 'Blood Howling'.\nWhen the skill is active, other attack skills inflict 200 bleed DMG to the target every 0.5 seconds for 10 seconds with a 1% chance. This skill can be used again after 2 minutes.`,
        'blood-howling',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        10
    ),
    BloodHowlingStrengthener: new Skill(
        567,
        'Blood Howling Strengthener',
        `Increases Blood Howling's bleeding effect by {value}%.`,
        'blood-howling-strengthener',
        function (level) { return 0.1+(((((Math.pow(level-47, 3)+120000)/600)/41))); },
        20,
        {BloodHowling: 10}
    ),
    IncreasePvPAttackRate: new Skill(
        603,
        'Increase PvP Attack Rate',
        `Increases pvp attack success rate by {value}.`,
        'increase-pvp-attack-rate',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/50)*100)/12))*85*3.2; },
        20
    ),
    EquippedWeaponStrengthener: new Skill(
        568,
        'Equipped Weapon Strengthener',
        `Equipping the fist weapon increases attack power by {value}.`,
        'equipped-weapon-strengthener',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    DefSuccessRateIncreasePowUp: new Skill(
        569,
        'Def SuccessRate Increase PowUp',
        `Increases defense success rate by {value}%.`,
        'def-successrate-increase-powup',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    DefSuccessRateIncreaseMastery: new Skill(
        572,
        'DefSuccessRate Increase Mastery',
        `The increase defense success rate skill increases your defense rate by {value}.`,
        'defsuccessrate-increase-mastery',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20,
        {DefSuccessRateIncreasePowUp: 10}
    ),
    StaminaIncreaseStrengthener: new Skill(
        573,
        'Stamina Increase Strengthener',
        `The increase HP skill increases 'STA' by {value}.`,
        'stamina-increase-strengthener',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        20
    ),
    DecreaseMana: new Skill(
        604,
        'Decrease Mana',
        `Reduces mana cost for skills by {value}%.`,
        'decrease-mana',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*6; },
        20
    ),
    RecoverSDFromMonsterKills: new Skill(
        605,
        'Recover SD from Monster Kills',
        `Restores SD by Max SD/{value} when killing a monster.`,
        'recover-sd-from-monster-kills',
        function (level) { return level/10; },
        20
    ),
    RecoverLifeFromMonsterKills: new Skill(
        606,
        'Recover Life from Monster Kills',
        `Restores HP by Max HP/{value} when killing a monster.`,
        'recover-life-from-monster-kills',
        function (level) { return (((1000*15)+((((1000*15)*0.2)/500)*(level-1000)))-(((level-1000)*15)+(((((level-1000)*15)*0.2)/500)*(level-1000))*((1+(Math.pow(level-1000, 1.1)/1000))*0.3))); },
        20
    ),
    IncreaseMinimumAttackPower: new Skill(
        607,
        'Increase Minimum Attack Power',
        `Increases attack power by {value}.`,
        'increase-minimum-attack-power',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    RecoverManaFromMonsterKills: new Skill(
        608,
        'Recover Mana from Monster Kills',
        `Restores MP by Max MP/{value} when killing a monster.`,
        'recover-mana-from-monster-kills',
        function (level) { return (((1000*15)+((((1000*15)*0.2)/500)*(level-1000)))-(((level-1000)*15)+(((((level-1000)*15)*0.2)/500)*(level-1000))*((1+(Math.pow(level-1000, 1.1)/1000))*0.3))); },
        20,
        {RecoverLifeFromMonsterKills: 10}
    ),
    IncreaseMaximumAttackPower: new Skill(
        609,
        'Increase Maximum Attack Power',
        `Increases maximum attack by {value}`,
        'increase-maximum-attack-power',
        function (level) { return level*(level/level); },
        20,
        {IncreaseMinimumAttackPower: 10}
    ),
    IncreasesCriticalDamageChance: new Skill(
        610,
        'Increases Critical Damage Chance',
        `Increases critical damage chance by {value}%.`,
        'increases-critical-damage-chance',
        function (level) { return 0.1+(((((Math.pow(level-47, 3)+120000)/600)/41))); },
        20
    ),
    RecoverManaFully: new Skill(
        611,
        'Recover Mana Fully',
        `{value}% chance to fully recover your mana.`,
        'recover-mana-fully',
        function (level) { return 0.1+(((((Math.pow(level-47, 3)+120000)/600)/41))); },
        20
    ),
    RecoversLifeFully: new Skill(
        612,
        'Recovers Life Fully',
        `{value}% chance to fully recover your HP.`,
        'recovers-life-fully',
        function (level) { return 0.1+(((((Math.pow(level-47, 3)+120000)/600)/41))); },
        20
    ),
    IncreaseExcellentDamageChance: new Skill(
        613,
        'Increase Excellent Damage Chance',
        `Increases the chance of doing excellent damage by {value}%`,
        'increase-excellent-damage-chance',
        function (level) { return 0.1+(((((Math.pow(level-47, 3)+120000)/600)/41))); },
        20,
        {IncreasesCriticalDamageChance: 10}
    ),
    RecoversShieldDefenseFully: new Skill(
        616,
        'Recovers Shield Defense Fully',
        `{value}% chance of fully recovering SD.`,
        'recovers-shield-defense-fully',
        function (level) { return 0.1+(((((Math.pow(level-47, 3)+120000)/600)/41))); },
        20,
        {RecoversLifeFully: 10}
    ),
    HPAbsorb: new Skill(
        792,
        'HP Absorb',
        `Every time successfully attacking an enemy, you have 50% chance to recover your HP by {value}.`,
        'hp-absorb',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    SDAbsorb: new Skill(
        793,
        'SD Absorb',
        `Every time successfully attacking an enemy, you have 50% chance to recover your Shield by {value}.`,
        'sd-absorb',
        function (level) { return level*(level/level); },
        20,
        {HPAbsorb: 10}
    ),
    CloakOfTranscendenceDefensePowUp: new Skill(
        685,
        'Cloak of Transcendence Defense PowUp',
        `Defense increases by {value} while equipping the Cloak of Transcendence.`,
        'cloak-of-transcendence-defense-powup',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*10; },
        20
    ),
    CloakOfTranscendenceAttackPowUp: new Skill(
        686,
        'Cloak of Transcendence Attack PowUp',
        `Attack power increases by {value} while equipping the Cloak of Transcendence.`,
        'cloak-of-transcendence-attack-powup',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*10; },
        20,
        {CloakOfTranscendenceDefensePowUp: 10}
    ),
    LungeStrengthener: new Skill(
        329,
        'Lunge Strengthener',
        `Lunge skill damage increases by {value}.`,
        'lunge-strengthener',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*10; },
        20
    ),
    SpinStepPowUp: new Skill(
        687,
        'Spin Step PowUp',
        `Spin Step skill damage increases by {value}.`,
        'spin-step-powup',
        function (level) { return level*(level/level); },
        20
    ),
    HarshStrikePowUp: new Skill(
        688,
        'Harsh Strike PowUp',
        `Harsh Strike skill damage increases by {value}.`,
        'harsh-strike-powup',
        function (level) { return level*F*level/level; },
        20
    ),
    SpinStepMastery: new Skill(
        690,
        'Spin Step Mastery',
        `The explosive damage of Spin Step skill increases by {value}.`,
        'spin-step-mastery',
        function (level) { return level*F*level/level; },
        20,
        {SpinStepPowUp: 10}
    ),
    HarshStrikeMastery: new Skill(
        691,
        'Harsh Strike Mastery',
        `Harsh Strike skill's hit damage increases once. \n(Spends 10 points at once to learn the skill.)`,
        'harsh-strike-mastery',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        10,
        {HarshStrikePowUp: 10}
    ),
    ObsidianPowUp: new Skill(
        693,
        'Obsidian PowUp',
        `Increases skill DMG boost effect by {value}%.`,
        'obsidian-powup',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*6; },
        20
    ),
    MagicPinPowUp: new Skill(
        692,
        'Magic Pin PowUp',
        `Magic Pin skill damage increases by {value}.`,
        'magic-pin-powup',
        function (level) { return level*F*level/level; },
        20
    ),
    BrechePowUp: new Skill(
        696,
        'Breche PowUp',
        `Breche skill damage increases by {value}.`,
        'breche-powup',
        function (level) { return level*F*level/level; },
        20
    ),
    ShiningPeakPowUp: new Skill(
        699,
        'Shining Peak PowUp',
        `Shining Peak skill damage increases by {value}.`,
        'shining-peak-powup',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        20
    ),
    MagicPinMastery: new Skill(
        695,
        'Magic Pin Mastery',
        `Increases the range of Magic Pin to 3.`,
        'magic-pin-mastery',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        10,
        {MagicPinPowUp: 10}
    ),
    BrecheMastery: new Skill(
        698,
        'Breche Mastery',
        `Increases the range of Breche to 4. \n(Spends 10 points at once to learn the skill.)`,
        'breche-mastery',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        10,
        {BrechePowUp: 10}
    ),
    Burst: new Skill(
        700,
        'Burst',
        `Learns 'Burst' skill.\nTemporarily increases the chance of True Damage by 5%.\nCooldown-60 sec. \n(Spends 10 points at once to learn the skill.)`,
        'burst',
        function (level) { return 0.1+(((((Math.pow(level-47, 3)+120000)/600)/41))); },
        10
    ),
    BurstPowUp: new Skill(
        701,
        'Burst PowUp',
        `Reduces the Cooldown time of Burst skill by {value} sec.`,
        'burst-powup',
        function (level) { return level*1.0; },
        20,
        {Burst: 10}
    ),
    LancePowUp: new Skill(
        702,
        'Lance PowUp',
        `Physical attack power increases by {value} while equipping Lance.`,
        'lance-powup',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    CircleShieldPowUp: new Skill(
        703,
        'Circle Shield PowUp',
        `Increase Enemy's AG reduction effect by {value}.`,
        'circle-shield-powup',
        function (level) { return level/20; },
        20
    ),
    ShieldPowUp: new Skill(
        704,
        'Shield PowUp',
        `Defense increases by {value} while equipping Shield.`,
        'shield-powup',
        function (level) { return level/20; },
        20
    ),
    CircleShieldMastery: new Skill(
        706,
        'Circle Shield Mastery',
        `Increase the chance of AG reduction effect by {value}% Point(s).`,
        'circle-shield-mastery',
        function (level) { return level*1.0; },
        20,
        {CircleShieldPowUp: 10}
    ),
    WrathPowUp: new Skill(
        708,
        'Wrath PowUp',
        `Skill duration increases by {value} second(s).`,
        'wrath-powup',
        function (level) { return level*1.0; },
        20
    ),
    WrathProficiency: new Skill(
        709,
        'Wrath Proficiency',
        `Reduces the Cooldown time of Wrath skill by {value} sec.`,
        'wrath-proficiency',
        function (level) { return level*1.0; },
        20,
        {WrathPowUp: 10}
    ),
    WrathMastery: new Skill(
        710,
        'Wrath Mastery',
        `Defense does not drop when Wrath skill is used. \n(Spends 10 points at once to learn the skill.)`,
        'wrath-mastery',
        function (level) { return 0.1+(((((Math.pow(level-47, 3)+120000)/600)/41))); },
        10,
        {WrathProficiency: 10}
    ),
    IncreasesRetaliationDMG: new Skill(
        711,
        'Increases Retaliation DMG',
        `Increases the DMG of Retribution by {value}%.`,
        'increases-retaliation-dmg',
        function (level) { return level*1.0; },
        10
    ),
    IncreasesRageDMG: new Skill(
        712,
        'Increases Rage DMG',
        `Increases the DMG of rage by {value}%.`,
        'increases-rage-dmg',
        function (level) { return level*1.0; },
        10
    ),
    WingsDefenseEnhancement: new Skill(
        754,
        'Wings Defense Enhancement',
        `Increase DEF by {value} when Wings of Disillusion are equipped.`,
        'wings-defense-enhancement',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*10; },
        20
    ),
    ShieldProtection: new Skill(
        758,
        'Shield Protection',
        `While equipped with a shield, you have {value}% chance to reduce incoming damage by 1000% of shield block value. If all damage is blocked when this passive is activated, it will be shown as absorbed.`,
        'shield-protection',
        function (level) { return level*F*level/level; },
        20
    ),
    WingsDamageEnhancement: new Skill(
        755,
        'Wings Damage Enhancement',
        `Wizardry increases by {value} when Wings of Disillusion are equipped.`,
        'wings-damage-enhancement',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*10; },
        20,
        {WingsDefenseEnhancement: 10}
    ),
    MagicArrowEnhancement: new Skill(
        748,
        'Magic Arrow Enhancement',
        `Magic Arrow skill damage increases by {value}.`,
        'magic-arrow-enhancement',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    MagicArrowMastery: new Skill(
        749,
        'Magic Arrow Mastery',
        `Magic Arrow skill damage increases by {value} and the projectile increases by 1.`,
        'magic-arrow-mastery',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20,
        {MagicArrowEnhancement: 10}
    ),
    BurstEnhancement: new Skill(
        765,
        'Burst Enhancement',
        `Increase the duration of Burst by {value}s.`,
        'burst-enhancement',
        function (level) { return level*1.0; },
        20
    ),
    HasteEnhancement: new Skill(
        768,
        'Haste Enhancement',
        `Increase the duration of Haste by {value}s.`,
        'haste-enhancement',
        function (level) { return level*1.0; },
        20
    ),
    BurstMastery: new Skill(
        766,
        'Burst Mastery',
        `Decrease the cooldown of Burst by {value}s.`,
        'burst-mastery',
        function (level) { return level*1.0; },
        20,
        {BurstEnhancement: 10}
    ),
    HasteMastery: new Skill(
        769,
        'Haste Mastery',
        `Decrease the cooldown of Haste by {value}s.`,
        'haste-mastery',
        function (level) { return level*1.0; },
        20,
        {HasteEnhancement: 10}
    ),
    PlasmaBallEnhancement: new Skill(
        750,
        'Plasma Ball Enhancement',
        `Plasma Ball skill damage increases by {value}.`,
        'plasma-ball-enhancement',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    PlasmaBallMastery: new Skill(
        751,
        'Plasma Ball Mastery',
        `Plasma Ball skill damage increases by {value} and the movement distance increases by 1 tile.`,
        'plasma-ball-mastery',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20,
        {PlasmaBallEnhancement: 10}
    ),
    RunicMaceEnhancement: new Skill(
        752,
        'Runic Mace Enhancement',
        `Wizardry increases by {value} when Rune Mace is equipped.`,
        'runic-mace-enhancement',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    SilenceWingDefenseEnhancement: new Skill(
        785,
        'Silence Wing Defense Enhancement',
        `Increases defense by {value}.`,
        'silence-wing-defense-enhancement',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*10; },
        20
    ),
    SilenceWingDamageEnhancement: new Skill(
        786,
        'Silence Wing Damage Enhancement',
        `Increases attack power by {value}.`,
        'silence-wing-damage-enhancement',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*10; },
        20,
        {SilenceWingDefenseEnhancement: 10}
    ),
    SwordInertiaEnhancement: new Skill(
        779,
        'Sword Inertia Enhancement',
        `Increases Sword Inertia damage by {value}.`,
        'sword-inertia-enhancement',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    RagefulBlowStrengthener: new Skill(
        331,
        'Rageful Blow Strengthener',
        `Anger Blow skill damage increases by {value}.`,
        'rageful-blow-strengthener',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    SwordInertiaMastery: new Skill(
        780,
        'Sword Inertia Mastery',
        `Sword Ineria skill range increased to 7. \n (Spends 10 points at once to learn the skill.)`,
        'sword-inertia-mastery',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        10,
        {SwordInertiaEnhancement: 10}
    ),
    BatFlockEnhancement: new Skill(
        781,
        'Bat Flock Enhancement',
        `Increases damage of Bat Flock skill by {value}.`,
        'bat-flock-enhancement',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    BatFlockMastery: new Skill(
        782,
        'Bat Flock Mastery',
        `Increases time a damage is dealt of Bat Flock by {value} seconds.\n (Spends 10 points at once to learn the skill.)`,
        'bat-flock-mastery',
        function (level) { return level*1.0; },
        10,
        {BatFlockEnhancement: 10}
    ),
    DetectionEnhancement: new Skill(
        794,
        'Detection Enhancement',
        `The range of the detection skill is extended to around 150 tiles. \n (Spends 10 points at once to learn the skill.)`,
        'detection-enhancement',
        function (level) { return (level*15)+((((level*15)*0.2)/500)*(level-level)); },
        10
    ),
    DemolishEnhancement: new Skill(
        787,
        'Demolish Enhancement',
        `Demolish skill cooldown reduced by {value} second(s).`,
        'demolish-enhancement',
        function (level) { return level*1.0; },
        20
    ),
    DemolishMastery: new Skill(
        788,
        'Demolish Mastery',
        `Demolish skill's ignore defensive effect increased by {value}.`,
        'demolish-mastery',
        function (level) { return (1+(((((Math.pow(level-30, 3)+25000)/490)/50)*100)/15))*20; },
        20,
        {DemolishEnhancement: 10}
    ),
    ShortSwordEnhancement: new Skill(
        783,
        'Short Sword Enhancement',
        `While equipped with a short sword the damage is increased by {value}.\nA 50% per two short swords.`,
        'short-sword-enhancement',
        function (level) { return (0.9+(((((Math.pow(level-35, 3)+40440)/600)/7.5))))*5; },
        20
    ),
    ShortSwordMastery: new Skill(
        784,
        'Short Sword Mastery',
        `While equipped with a short sword the attack speed is increased by {value}.`,
        'short-sword-mastery',
        function (level) { return level*1.0; },
        10,
        {ShortSwordEnhancement: 10}
    ),
    IncreasesWingsOfHitDefense: new Skill(
        818,
        'Increases Wings of Hit Defense',
        `Increases defense by {value} when equipped with Wings of Hit`,
        'increases-wings-of-hit-defense',
        function (level) { return ((1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*9.2); },
        20
    ),
    IncreasesWingsOfHitDamage: new Skill(
        819,
        'Increases Wings of Hit Damage',
        `Increases Magical Power by {value} when equipped with Wings of Hit`,
        'increases-wings-of-hit-damage',
        function (level) { return ((1+(((((Math.pow(level-30, 3)+25000)/499)/6))))*13); },
        20,
        {IncreasesWingsOfHitDefense: 10}
    ),
    DarkPlasmaStrengthener: new Skill(
        820,
        'Dark Plasma Strengthener',
        `Number of targets that can be attacked by Dark Plasma skills increased by {value}.`,
        'dark-plasma-strengthener',
        function (level) { return level/10; },
        10
    ),
    DarkPlasmaProficiency: new Skill(
        821,
        'Dark Plasma Proficiency',
        `Dark Plasma duration increased by {value} seconds.`,
        'dark-plasma-proficiency',
        function (level) { return level/10; },
        20,
        {DarkPlasmaStrengthener: 10}
    ),
    DarkPlasmaMastery: new Skill(
        822,
        'Dark Plasma Mastery',
        `Dark Plasma skill attack power increased by {value} and attack range increased by 1 tile.`,
        'dark-plasma-mastery',
        function (level) { return (((((Math.pow(5+level, 1.5)/6)*5)/4)*3.5)-3.5); },
        20,
        {DarkPlasmaProficiency: 10}
    ),
    IceBreakStrengthener: new Skill(
        823,
        'Ice Break Strengthener',
        `Ice Break skill attack power is increased by {value}.`,
        'ice-break-strengthener',
        function (level) { return (((Math.pow(level, 1.3)*4.1)/3.33))+3; },
        20
    ),
    IceBreakMastery: new Skill(
        824,
        'Ice Break Mastery',
        `Ice Break skill attack power increased by {value} and skill range increased by 1 tile.`,
        'ice-break-mastery',
        function (level) { return ((((Math.pow(level, 1.45)*4)/3)+3.5)*0.85); },
        20,
        {IceBreakStrengthener: 10}
    ),
    FireDeathStrengthener: new Skill(
        825,
        'Fire Death Strengthener',
        `Death Fire skill attack power increases by {value} and attack speed increases by 10. \n (It does not stack with the attack speed increase effect of Enhanced Death Fire.)`,
        'fire-death-strengthener',
        function (level) { return ((((Math.pow(level, 1.3)*4.1)/3.35)+3.1)*0.8); },
        20
    ),
    FireDeathMastery: new Skill(
        826,
        'Fire Death Mastery',
        `Death Fire skill attack power increases by {value}, and the range and distance used increase by 1 tile.`,
        'fire-death-mastery',
        function (level) { return ((((Math.pow(level, 1.45)*4)/3)+3.5)*0.85); },
        20,
        {FireDeathStrengthener: 10}
    ),
};
