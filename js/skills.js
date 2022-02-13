/**
 * @callback LevelCallback
 * @param {number} level
 * @returns {string|number}
 */

/**
 * @typedef {Object.<string, number>} Requirements
 */

export class Skill {
    /**
     * @param {string} title
     * @param {string|LevelCallback} description
     * @param {string|LevelCallback} icons
     * @param {string|LevelCallback} values
     * @param {number} maxLevel
     * @param {Requirements} requires
     */
    constructor(title, description, icons, values, maxLevel, requires = null) {
        this.title = title;
        this.description = description;
        this.icons = icons;
        this.values = values;
        this.maxLevel = maxLevel;
        this.requires = requires;
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

        return this.description.replace(/{value}/, this.getValue(level));
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

export const Skills = {
    DurabilityReduction1: new Skill(
        'Durability Reduction (1)',
        'Durability reduction speed of the weapons and armor equipped decreases by {value}%. (excluding Cash items)',
        'durability-reduction-1',
        function (level) { return level; },
        20
    ),
    DurabilityReduction2: new Skill(
        'Durability Reduction (2)',
        'Durability reduction speed of the weapons and armor equipped decreases by {value}%. (excluding Cash items)',
        'durability-reduction-2',
        function (level) { return level; },
        20,
        {DurabilityReduction1: 10}
    ),
    DurabilityReduction3: new Skill(
        'Durability Reduction (3)',
        'Durability reduction speed of the weapons and armor equipped decreases by {value}%. (excluding Cash items)',
        'durability-reduction-3',
        function (level) { return level; },
        20,
        {DurabilityReduction2: 10}
    ),
    PvPDefenceRateIncrease: new Skill(
        'PvP Defence Rate Increase',
        'PvP defense rate increases by {value}.',
        'pvp-defence-rate-increase',
        function (level) { return level; },
        20
    ),
    MaximumSDIncrease: new Skill(
        'Maximum SD Increase',
        'Max SD increases by {value}.',
        'maximum-sd-increase',
        function (level) { return level; },
        20
    ),
    SDRecoverySpeedIncrease: new Skill(
        'SD Recovery Speed Increase',
        'Automatic SD recovery increases be {value}%.',
        'sd-recovery-speed-increase',
        function (level) { return level; },
        20,
        {MaximumSDIncrease: 10}
    ),
    AutoManaRecoveryIncrease: new Skill(
        'Auto Mana Recovery Increase',
        'Automatic Mana regeneration increases by {value}%.',
        'auto-mana-recovery-increase',
        function (level) { return level; },
        20
    ),
    AutomaticHPRecoveryIncrease: new Skill(
        'Automatic HP Recovery Increase',
        'Automatic HP regeneration increases by {value}%.',
        'automatic-hp-recovery-increase',
        function (level) { return level; },
        20,
        {AutoManaRecoveryIncrease: 10}
    ),
    AutomaticAGRecoveryIncrease: new Skill(
        'Automatic AG Recovery Increase',
        'Automatic AG regeneration increases by {value}%.',
        'automatic-ag-recovery-increase',
        function (level) { return level; },
        20,
        {AutomaticHPRecoveryIncrease: 10}
    ),
    DefenseIncrease: new Skill(
        'Defense Increase',
        'Defense increases by {value}.',
        'defense-increase',
        function (level) { return level; },
        20
    ),
    DefenseSuccessRateIncrease: new Skill(
        'Defense Success Rate Increase',
        'Defense success rate increases by {value}.',
        'defense-success-rate-increase',
        function (level) { return level; },
        20,
        {DefenseIncrease: 10}
    ),
    ElementalDEFIncrease: new Skill(
        'Elemental DEF Increase',
        'Elemental DEF increases by {value}.',
        'elemental-def-increase',
        function (level) { return level; },
        20
    ),
    ArmorSetBonusIncrease: new Skill(
        'Armor Set Bonus Increase',
        'Defense increases by {value} when a full armor set (helmet, armor, pants, gloves and boots) is equipped.',
        'armor-set-bonus-increase',
        function (level) { return level; },
        20
    ),
    Vengeance: new Skill(
        'Vengeance',
        'Returns 1 incoming damage to the dealer with {value}% chance when hit.',
        'vengeance',
        function (level) { return level; },
        20,
        {ArmorSetBonusIncrease: 10}
    ),
    EnergyIncrease: new Skill(
        'Energy Increase',
        'Energy increases by {value}',
        'energy-increase',
        function (level) { return level; },
        20
    ),
    StaminaIncrease: new Skill(
        'Stamina Increase',
        'Stamina increases by {value}',
        'stamina-increase',
        function (level) { return level; },
        20
    ),
    AgilityIncrease: new Skill(
        'Agility Increase',
        'Agility increases by {value}',
        'agility-increase',
        function (level) { return level; },
        20
    ),
    StrengthIncrease: new Skill(
        'Strength Increase',
        'Strength increases by {value}',
        'strength-increase',
        function (level) { return level; },
        20
    ),
    WeaponBlock: new Skill(
        'Weapon Block',
        'While equipped with a Sword, Mace, Spear, Axe, etc, you have {value}% chance to block physical attack. You can\'t block magical attack, and when this passive is activated, it will be shown as Parry.',
        'weapon-block',
        function (level) { return level; },
        20
    ),
    ProtectionShield: new Skill(
        'Protection Shield',
        'While equipped with a shield, you have {value}% chance to reduce incoming damage by 1000% of shield block value. If all damage is blocked when this passive is activated, it will be shown as absorbed.',
        'protection-shield',
        function (level) { return level; },
        20
    ),
    SteelArmor: new Skill(
        'Steel Armor',
        'Has impenetrable basic {value} defense, and this defense can\'t be ignored.',
        'steel-armor',
        function (level) { return level; },
        20
    ),
    ShieldBlock: new Skill(
        'Shield Block',
        'While equipped with a shield, you have {value}% chance to block with a shield and reduce all incoming damage. When this passive is activated, it will be shown as Block.',
        'shield-block',
        function (level) { return level; },
        20,
        {ProtectionShield: 10}
    ),
    AttackSuccessRateIncrease: new Skill(
        'Attack Success Rate Increase',
        'Attack success rate increases by {value}.',
        'attack-success-rate-increase',
        function (level) { return level; },
        20
    ),
    CycloneStrengthener: new Skill(
        'Cyclone Strengthener',
        'Cyclone skill damage increases by {value}.',
        'cyclone-strengthener',
        function (level) { return level; },
        20
    ),
    LightningStrengthener: new Skill(
        'Lightning Strengthener',
        'Lightning skill damage increases by {value}.',
        'lightning-strengthener',
        function (level) { return level; },
        20
    ),
    TwistingSlashStrengthener: new Skill(
        'Twisting Slash Strengthener',
        'Twisting Slash skill damage increases by {value}.',
        'twisting-slash-strengthener',
        function (level) { return level; },
        20
    ),
    FlameStrengthener: new Skill(
        'Flame Strengthener',
        'Flame skill damage increases by {value}.',
        'flame-strengthener',
        function (level) { return level; },
        20
    ),
    BlastStrengthener: new Skill(
        'Blast Strengthener',
        'Blast skill damage increases by {value}.',
        'blast-strengthener',
        function (level) { return level; },
        20,
        {LightningStrengthener: 10}
    ),
    InfernoStrengthener: new Skill(
        'Inferno Strengthener',
        'Inferno skill damage increases by {value}.',
        'inferno-strengthener',
        function (level) { return level; },
        20,
        {FlameStrengthener: 10}
    ),
    EvilSpiritStrengthener: new Skill(
        'Evil Spirit Strengthener',
        'Evil Spirit skill damage increases by {value}.',
        'evil-spirit-strengthener',
        function (level) { return level; },
        20
    ),
    MagicMastery: new Skill(
        'Magic Mastery',
        'Wizardry increases by {value}.',
        'magic-mastery',
        function (level) { return level; },
        20,
        {EvilSpiritStrengthener: 10}
    ),
    MaximumHPIncrease: new Skill(
        'Maximum HP Increase',
        'Max HP increases by {value}.',
        'maximum-hp-increase',
        function (level) { return 250*level; },
        20
    ),
    IceStrengthener: new Skill(
        'Ice Strengthener',
        'Ice skill damage increases by {value}.',
        'ice-strengthener',
        function (level) { return level; },
        20
    ),
    MaximumManaIncrease: new Skill(
        'Maximum Mana Increase',
        'Max Mana increases by {value}.',
        'maximum-mana-increase',
        function (level) { return 125*level; },
        20
    ),
    MaximumAGIncrease: new Skill(
        'Maximum AG Increase',
        'Max AG increases by {value}.',
        'maximum-ag-increase',
        function (level) { return level; },
        20
    ),
    MaxHPBoost: new Skill(
        'Max HP Boost',
        'Boosts HP to increase Max HP by {value}.',
        'max-hp-boost',
        function (level) { return 500*level; },
        20
    ),
    BloodStorm: new Skill(
        'Blood Storm',
        'Learn \'Blood Storm\'. Inflict DMG to the target within 3 tiles from the caster and those around the target. This skill can be used again after 5 seconds. (Blade Master can be used as a combo and it is recommended for a melee-type character.).',
        'blood-storm',
        function (level) { return level; },
        10
    ),
    EarthPrison: new Skill(
        'Earth Prison',
        'Learn \'Earth Prison\'. Inflicts strong damage upon targets and immobilizes them for {value} sec.',
        'earth-prison',
        function (level) { return 4 + level; },
        10
    ),
    BloodStormStrengthener: new Skill(
        'Blood Storm Strengthener',
        'Increases Blood Storm\'s DMG by {value} and change the cooldown time to 3 seconds.',
        'blood-storm-strengthener',
        function (level) { return level; },
        20,
        {BloodStorm: 1}
    ),
    EarthPrisonStrengthener: new Skill(
        'Earth Prison Strengthener',
        'Increases Earth Prison damage by {value}, and changes Cooldown to 3 sec.',
        'earth-prison-strengthener',
        function (level) { return level; },
        20,
        {EarthPrison: 1}
    ),
    AttackRate: new Skill(
        'Attack Rate',
        'PvP attack success rate increases by {value}.',
        'attack-rate',
        function (level) { return level; },
        20
    ),
    TwoHandedSwordStrengthener: new Skill(
        'Two-handed Sword Strengthener',
        'Physical attack power increases by {value} while equipping Two-handed Sword.',
        'two-handed-sword-strengthener',
        function (level) { return level; },
        20
    ),
    TwoHandedSwordMastery: new Skill(
        'Two-handed Sword Mastery',
        '{value} PvP attack power bonus will be added while equipping Two-handed Sword.',
        'two-handed-sword-mastery',
        function (level) { return level; },
        20,
        {TwoHandedSwordStrengthener: 10}
    ),
    OneHandedSwordStrengthener: new Skill(
        'One-handed Sword Strengthener',
        'Physical attack power increases by {value} while equipping One-handed Sword.',
        'one-handed-sword-strengthener',
        function (level) { return level; },
        20
    ),
    OneHandedSwordMastery: new Skill(
        'One-handed Sword Mastery',
        'Attack speed increases by {value} while equipping One-handed Sword.',
        'one-handed-sword-mastery',
        function (level) { return level; },
        20,
        {OneHandedSwordStrengthener: 10}
    ),
    OneHandedStaffStrengthener: new Skill(
        'One-handed Staff Strengthener',
        'Wizardry increases by {value} while equipping One-handed Staff.',
        'one-handed-staff-strengthener',
        function (level) { return level; },
        20
    ),
    OneHandedStaffMastery: new Skill(
        'One-handed Sword Mastery',
        'Attack speed increases by {value} while equipping One-handed Staff.',
        'one-handed-staff-mastery',
        function (level) { return level; },
        20,
        {OneHandedStaffStrengthener: 10}
    ),
    TwoHandedStaffStrengthener: new Skill(
        'Two-handed Staff Strengthener',
        'Wizardry increases by {value} while equipping Two-handed Staff.',
        'two-handed-staff-strengthener',
        function (level) { return level; },
        20
    ),
    TwoHandedStaffMastery: new Skill(
        'Two-handed Staff Mastery',
        '{value} PvP attack power increases by additional {value} while equipping Two-handed Staff.',
        'two-handed-staff-mastery',
        function (level) { return level; },
        20,
        {TwoHandedStaffStrengthener: 10}
    ),
    ManaReduction: new Skill(
        'Mana Reduction',
        'Mana cost decreases by {value}.',
        'mana-reduction',
        function (level) { return level; },
        20
    ),
    MonsterAttackSDIncrement: new Skill(
        'Monster Attack SD Increment',
        'Recovers SD by max SD/{value} when killing a monster.',
        'monster-attack-sd-increment',
        function (level) { return level; },
        20
    ),
    MonsterAttackLifeIncrement: new Skill(
        'Monster Attack Life Increment',
        'Recovers HP by max HP/{value} when killing a monster.',
        'monster-attack-life-increment',
        function (level) { return level; },
        20
    ),
    MonsterAttackManaIncrement: new Skill(
        'Monster Attack Mana Increment',
        'Recovers Mana by max mana/{value} when killing a monster.',
        'monster-attack-mana-increment',
        function (level) { return level; },
        20,
        {MonsterAttackLifeIncrement: 10}
    ),
    MinimumWizardryIncrease: new Skill(
        'Minimum Wizardry Increase',
        'Min. Wizardry increase by {value}.',
        'minimum-wizardry-increase',
        function (level) { return level; },
        20
    ),
    MaximumWizardryIncrease: new Skill(
        'Maximum Wizardry Increase',
        'Max. Wizardry increase by {value}.',
        'maximum-wizardry-increase',
        function (level) { return level; },
        20,
        {MinimumWizardryIncrease: 10}
    ),
    MinimumAttackPowerIncrease: new Skill(
        'Minimum Attack Power Increase',
        'Min. attack power increases by {value}.',
        'minimum-attack-power-increase',
        function (level) { return level; },
        20
    ),
    MaximumAttackPowerIncrease: new Skill(
        'Maximum Attack Power Increase',
        'Max. attack power increases by {value}.',
        'maximum-attack-power-increase',
        function (level) { return level; },
        20,
        {MinimumAttackPowerIncrease: 10}
    ),
    IncreasesCriticalDamageRate: new Skill(
        'Increases critical damage rate',
        'Critical damage rate increases by {value}%.',
        'increases-critical-damage-rate',
        function (level) { return level; },
        20
    ),
    IncreasesExcellentDamageRate: new Skill(
        'Increases excellent damage rate',
        'Excellent damage rate increases by {value}%.',
        'increases-excellent-damage-rate',
        function (level) { return level; },
        20,
        {IncreasesCriticalDamageRate: 10}
    ),
    RestoresAllMana: new Skill(
        'Restores all Mana',
        'You have a {value}% chance to fully recover your mana any time you take damage.',
        'restores-all-mana',
        function (level) { return level; },
        20
    ),
    RestoresAllHP: new Skill(
        'Restores all HP',
        'You have a {value}% chance to fully recover your HP any time you take damage.',
        'restores-all-hp',
        function (level) { return level; },
        20
    ),
    RestoresAllSD: new Skill(
        'Restores all SD',
        '{value}% chance to fully recover your SD when attacking a target.',
        'restores-all-sd',
        function (level) { return level; },
        20,
        {RestoresAllHP: 10}
    ),
    AbsorbLife: new Skill(
        'Absorb Life',
        'Every successful attack on the enemy recovers HP by {value} with a 50% chance.',
        'absorb-life',
        function (level) { return level; },
        20
    ),
    IncreasesChanceOfIgnoreDEF: new Skill(
        'Increases change of ignore DEF',
        'Chance to inflict damage ignoring enemy\'s defense increases by {value}%.',
        'increases-chance-of-ignore-def',
        function (level) { return level; },
        20
    )
};
