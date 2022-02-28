import {Skill, Skills} from '../skills.js';
import {SkillTreeClasses, SkillTreeSchemas, SkillTreeSkillDependencies} from '../skill-tree-schemas.js';

/**
 * @type SkillTreeSchema
 */
const DWSkillTreeSchema = {
    name: 'Soul Master',
    green: {
        name: 'Peace',
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
                    dependency: SkillTreeSkillDependencies.vertical_double
                },
                {
                    name: 'SDRecoverySpeedIncrease',
                    dependency: SkillTreeSkillDependencies.vertical
                },
                null,
                {
                    name: 'AutomaticHPRecoveryIncrease',
                    dependency: SkillTreeSkillDependencies.vertical
                }
            ],
            [
                null,
                'DefenseIncrease',
                'ElementalDEFIncrease',
                {
                    name: 'AutomaticAGRecoveryIncrease',
                    dependency: SkillTreeSkillDependencies.vertical
                }
            ],
            [
                {
                    name: 'DurabilityReduction3',
                    dependency: SkillTreeSkillDependencies.vertical_double
                },
                {
                    name: 'DefenseSuccessRateIncrease',
                    dependency: SkillTreeSkillDependencies.vertical
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
                    dependency: SkillTreeSkillDependencies.horizontal
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
                null,
                null,
                'ProtectionShield'
            ],
            [
                null,
                null,
                // {
                //     name: 'MG_WingOfRuinAttackPowUp',
                //     dependency: SkillTreeSkillDependencies.vertical
                // },
                'SteelArmor',
                {
                    name: 'ShieldBlock',
                    dependency: SkillTreeSkillDependencies.vertical
                }
            ]
        ]
    },
    blue: {
        name: 'Wisdom',
        rows: [
            [
                'AttackSuccessRateIncrease',
                null,
                null,
                null
            ],
            [
                'FlameStrengthener',
                'LightningStrengthener',
                null,
                null
            ],
            [
                {
                    name: 'InfernoStrengthener',
                    dependency: SkillTreeSkillDependencies.vertical
                },
                {
                    name: 'BlastStrengthener',
                    dependency: SkillTreeSkillDependencies.vertical
                },
                null,
                null
            ],
            [
                'EvilSpiritStrengthener',
                {
                    name: 'MagicMastery',
                    dependency: SkillTreeSkillDependencies.horizontal
                },
                'MaximumLifeIncrease',
                null
            ],
            [
                null,
                null,
                {
                    name: 'MaximumManaIncrease',
                    dependency: SkillTreeSkillDependencies.vertical
                },
                'IceStrengthener'
            ],
            [
                null,
                null,
                {
                    name: 'MaximumAGIncrease',
                    dependency: SkillTreeSkillDependencies.vertical
                },
                null
            ],
            [
                null,
                null,
                // {
                //     name: 'MG_FireSlashMastery',
                //     dependency: SkillTreeSkillDependencies.vertical_double
                // },
                'MaxHPBoost',
                null
            ],
            [
                null,
                'EarthPrison',
                null,
                null
            ],
            [
                null,
                {
                    name: 'EarthPrisonStrengthener',
                    dependency: SkillTreeSkillDependencies.vertical
                },
                null,
                null
            ]
        ]
    },
    red: {
        name: 'Overcome',
        rows: [
            [
                'AttackRate',
                null,
                null,
                null
            ],
            [
                'OneHandedStaffStrengthener',
                'TwoHandedStaffStrengthener',
                null,
                null
            ],
            [
                {
                    name: 'OneHandedStaffMastery',
                    dependency: SkillTreeSkillDependencies.vertical
                },
                {
                    name: 'TwoHandedStaffMastery',
                    dependency: SkillTreeSkillDependencies.vertical
                },
                null,
                null
            ],
            [
                null,
                'ManaReduction',
                'MonsterAttackSDIncrement',
                'MonsterAttackLifeIncrement'
            ],
            [
                null,
                'MinimumWizardryIncrease',
                null,
                {
                    name: 'MonsterAttackManaIncrement',
                    dependency: SkillTreeSkillDependencies.vertical
                }
            ],
            [
                null,
                {
                    name: 'MaximumWizardryIncrease',
                    dependency: SkillTreeSkillDependencies.vertical
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
                    dependency: SkillTreeSkillDependencies.vertical
                }
            ],
            [
                null,
                {
                    name: 'RestoresAllSD',
                    dependency: SkillTreeSkillDependencies.vertical
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

SkillTreeSchemas.set(SkillTreeClasses.DW, DWSkillTreeSchema);
