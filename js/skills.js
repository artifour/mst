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
        'Has impenetrable bacis {value} defense, and this defense can\'t be ignored.',
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
    )
};
