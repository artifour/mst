import {Skill, Skills} from '../skills.js';
import {SkillsTreeSchemas, SkillsTreeSkillDependencies} from '../skills-tree.js';

Skills.MG_WingofRuinDefensePowUp = new Skill(
    'Wing of Ruin Defense PowUp',
    'Defense increases by {value} while equipping the Wing of Ruin.',
    'XXX-wing-red',
    function (level) { return level; },
    20
);
Skills.MG_WingofRuinAttackPowUp = new Skill(
    'Wing of Ruin Attack PowUp',
    'Attack, Wizardy power increases by {value} while equipping the Wing of Ruin.',
    'XXX-wing-green',
    function (level) { return level; },
    20,
    {MG_WingofRuinDefensePowUp: 10}
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
                'MG_WingofRuinDefensePowUp',
                'WeaponBlock',
                'ProtectionShield'
            ],
            [
                null,
                {
                    name: 'MG_WingofRuinAttackPowUp',
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
                'PowerSlashStrengthener'
            ],
            [
                'FlameStrengthener',
                {
                    name: 'BlastStrengthener',
                    dependency: SkillsTreeSkillDependencies.vertical
                },
                null,
                {
                    name: 'WeaponMastery',
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
                'FireSlashStrengthener',
                'IceStrengthener',
                {
                    name: 'MaximumManaIncrease',
                    dependency: SkillsTreeSkillDependencies.vertical
                }
            ],
            [
                'FlameStrikeStrengthener',
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
                    name: 'FireSlashMastery',
                    dependency: SkillsTreeSkillDependencies.vertical_double
                },
                'GiganticStormStrengthener',
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
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null
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
