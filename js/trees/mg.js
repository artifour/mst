import {Skill, Skills} from '../skills.js';
import {SkillsTreeSchemas, SkillsTreeSkillDependencies} from '../skills-tree.js';

Skills.MG_WingOfRuinDefensePowUp = new Skill(
    'Wing of Ruin Defense PowUp',
    'Defense increases by {value} while equipping the Wing of Ruin.',
    'XXX-wing-red',
    function (level) { return level; },
    20
);
Skills.MG_WingOfRuinAttackPowUp = new Skill(
    'Wing of Ruin Attack PowUp',
    'Attack, Wizardry power increases by {value} while equipping the Wing of Ruin.',
    'XXX-wing-green',
    function (level) { return level; },
    20,
    {MG_WingOfRuinDefensePowUp: 10}
);
Skills.MG_PowerSlashStrengthener = new Skill(
    'Power Slash Strengthener',
    'Power Slash skill damage increases by {value}.',
    'power-slash-strengthener',
    function (level) { return level; },
    20
);
Skills.MG_WeaponMastery = new Skill(
    'Weapon Mastery',
    'Attack power increases by {value}.',
    'weapon-mastery',
    function (level) { return level; },
    20,
    {TwistingSlashStrengthener: 10, MG_PowerSlashStrengthener: 10}
);
Skills.MG_FireSlashStrengthener = new Skill(
    'Fire Slash Strengthener',
    'Fire Slash damage increases by {value} and Skill range becomes 3',
    'fire-slash-strengthener',
    function (level) { return level; },
    20
);
Skills.MG_FireSlashMastery = new Skill(
    'Fire Slash Mastery',
    'Fire Slash skill\'s defense reduction increases by {value}%.',
    'fire-slash-mastery',
    function (level) { return level; },
    20,
    {MG_FireSlashStrengthener: 10}
);
Skills.MG_FlameStrikeStrengthener = new Skill(
    'Flame Strike Strengthener',
    'Flame Strike damage increases by {value}.',
    'flame-strike-strengthener',
    function (level) { return level; },
    20
);
Skills.MG_GiganticStormStrengthener = new Skill(
    'Gigantic Storm Strengthener',
    'Gigantic Storm skill damage increases by {value}.',
    'gigantic-storm-strengthener',
    function (level) { return level; },
    20
);

/**
 * @type SkillTreeSchema
 */
const MGSkillsTreeSchema = {
    name: 'Duel Master',
    green: {
        name: 'Solidity',
        rows: [
            [
                'DurabilityReduction1',
                null,
                null,
                'PvPDefenceRateIncrease'
            ],
            [
                null,
                'MaximumSDIncrease',
                null,
                'AutoManaRecoveryIncrease'
            ],
            [
                {
                    name: 'DurabilityReduction2',
                    dependency: SkillsTreeSkillDependencies.vertical_double
                },
                {
                    name: 'SDRecoverySpeedIncrease',
                    dependency: SkillsTreeSkillDependencies.vertical
                },
                null,
                {
                    name: 'AutomaticHPRecoveryIncrease',
                    dependency: SkillsTreeSkillDependencies.vertical
                }
            ],
            [
                null,
                'DefenseIncrease',
                'ElementalDEFIncrease',
                {
                    name: 'AutomaticAGRecoveryIncrease',
                    dependency: SkillsTreeSkillDependencies.vertical
                }
            ],
            [
                {
                    name: 'DurabilityReduction3',
                    dependency: SkillsTreeSkillDependencies.vertical_double
                },
                {
                    name: 'DefenseSuccessRateIncrease',
                    dependency: SkillsTreeSkillDependencies.vertical
                },
                null,
                null
            ],
            [
                null,
                null,
                'ArmorSetBonusIncrease',
                {
                    name: 'Vengeance',
                    dependency: SkillsTreeSkillDependencies.horizontal
                }
            ],
            [
                'EnergyIncrease',
                'StaminaIncrease',
                'AgilityIncrease',
                'StrengthIncrease'
            ],
            [
                null,
                'MG_WingOfRuinDefensePowUp',
                'WeaponBlock',
                'ProtectionShield'
            ],
            [
                null,
                {
                    name: 'MG_WingOfRuinAttackPowUp',
                    dependency: SkillsTreeSkillDependencies.vertical
                },
                'SteelArmor',
                {
                    name: 'ShieldBlock',
                    dependency: SkillsTreeSkillDependencies.vertical
                }
            ]
        ]
    },
    blue: {
        name: 'Fighting Spirit',
        rows: [
            [
                'AttackSuccessRateIncrease',
                null,
                null,
                null
            ],
            [
                'CycloneStrengthener',
                'LightningStrengthener',
                'TwistingSlashStrengthener',
                'MG_PowerSlashStrengthener'
            ],
            [
                'FlameStrengthener',
                {
                    name: 'BlastStrengthener',
                    dependency: SkillsTreeSkillDependencies.vertical
                },
                null,
                {
                    name: 'MG_WeaponMastery',
                    dependency: SkillsTreeSkillDependencies.double_left
                }
            ],
            [
                {
                    name: 'InfernoStrengthener',
                    dependency: SkillsTreeSkillDependencies.vertical
                },
                'EvilSpiritStrengthener',
                {
                    name: 'MagicMastery',
                    dependency: SkillsTreeSkillDependencies.horizontal
                },
                'MaximumHPIncrease'
            ],
            [
                null,
                'MG_FireSlashStrengthener',
                'IceStrengthener',
                {
                    name: 'MaximumManaIncrease',
                    dependency: SkillsTreeSkillDependencies.vertical
                }
            ],
            [
                'MG_FlameStrikeStrengthener',
                null,
                null,
                {
                    name: 'MaximumAGIncrease',
                    dependency: SkillsTreeSkillDependencies.vertical
                }
            ],
            [
                null,
                {
                    name: 'MG_FireSlashMastery',
                    dependency: SkillsTreeSkillDependencies.vertical_double
                },
                'MG_GiganticStormStrengthener',
                'MaxHPBoost'
            ],
            [
                null,
                'BloodStorm',
                'EarthPrison',
                null
            ],
            [
                null,
                {
                    name: 'BloodStormStrengthener',
                    dependency: SkillsTreeSkillDependencies.vertical
                },
                {
                    name: 'EarthPrisonStrengthener',
                    dependency: SkillsTreeSkillDependencies.vertical
                },
                null
            ]
        ]
    },
    red: {
        name: 'Ultimatum',
        rows: [
            [
                'AttackRate',
                null,
                null,
                null
            ],
            [
                'TwoHandedSwordStrengthener',
                'OneHandedSwordStrengthener',
                'OneHandedStaffStrengthener',
                'TwoHandedStaffStrengthener'
            ],
            [
                {
                    name: 'TwoHandedSwordMastery',
                    dependency: SkillsTreeSkillDependencies.vertical
                },
                {
                    name: 'OneHandedSwordMastery',
                    dependency: SkillsTreeSkillDependencies.vertical
                },
                {
                    name: 'OneHandedStaffMastery',
                    dependency: SkillsTreeSkillDependencies.vertical
                },
                {
                    name: 'TwoHandedStaffMastery',
                    dependency: SkillsTreeSkillDependencies.vertical
                }
            ],
            [
                null,
                'ManaReduction',
                'MonsterAttackSDIncrement',
                'MonsterAttackLifeIncrement'
            ],
            [
                'MinimumWizardryIncrease',
                'MinimumAttackPowerIncrease',
                null,
                {
                    name: 'MonsterAttackManaIncrement',
                    dependency: SkillsTreeSkillDependencies.vertical
                }
            ],
            [
                {
                    name: 'MaximumWizardryIncrease',
                    dependency: SkillsTreeSkillDependencies.vertical
                },
                {
                    name: 'MaximumAttackPowerIncrease',
                    dependency: SkillsTreeSkillDependencies.vertical
                },
                null,
                'IncreasesCriticalDamageRate'
            ],
            [
                'RestoresAllMana',
                'RestoresAllHP',
                'AbsorbLife',
                {
                    name: 'IncreasesExcellentDamageRate',
                    dependency: SkillsTreeSkillDependencies.vertical
                }
            ],
            [
                null,
                {
                    name: 'RestoresAllSD',
                    dependency: SkillsTreeSkillDependencies.vertical
                },
                null,
                'IncreasesChanceOfIgnoreDEF'
            ],
            [
                null,
                null,
                null,
                null
            ]
        ]
    }
}

SkillsTreeSchemas.MG = MGSkillsTreeSchema;
