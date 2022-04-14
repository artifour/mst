import {ClassSkill, FORMULA_17, FORMULA_22, FORMULA_3, FORMULA_4, FORMULA_7,  Skills} from '../skills.js';
import {SkillTreeClasses, SkillTreeSchemas, SkillTreeSkillDependencies} from '../skill-tree-schemas.js';

Skills.MG_WingOfRuinDefensePowUp = new ClassSkill(
    476,
    'Wing of Ruin Defense PowUp',
    'Defense increases by {value} while equipping the Wing of Ruin.',
    'XXX-wing-red',
    FORMULA_17, // TODO
    20
);
Skills.MG_WingOfRuinAttackPowUp = new ClassSkill(
    478,
    'Wing of Ruin Attack PowUp',
    'Attack, Wizardry power increases by {value} while equipping the Wing of Ruin.',
    'XXX-wing-green',
    FORMULA_17, // TODO
    20,
    {MG_WingOfRuinDefensePowUp: 10}
);
Skills.MG_PowerSlashStrengthener = new ClassSkill(
    482,
    'Power Slash Strengthener',
    'Power Slash skill damage increases by {value}.',
    'power-slash-strengthener',
    FORMULA_17,
    20
);
Skills.MG_WeaponMastery = new ClassSkill(
    335,
    'Weapon Mastery',
    'Attack power increases by {value}.',
    'weapon-mastery',
    FORMULA_22,
    20,
    {TwistingSlashStrengthener: 10, MG_PowerSlashStrengthener: 10}
);
Skills.MG_FireSlashStrengthener = new ClassSkill(
    490,
    'Fire Slash Strengthener',
    'Fire Slash damage increases by {value} and Skill range becomes 3',
    'fire-slash-strengthener',
    FORMULA_3,
    20
);
Skills.MG_FireSlashMastery = new ClassSkill(
    493,
    'Fire Slash Mastery',
    'Fire Slash skill\'s defense reduction increases by {value,}%.',
    'fire-slash-mastery',
    FORMULA_7,
    20,
    {MG_FireSlashStrengthener: 10}
);
Skills.MG_FlameStrikeStrengthener = new ClassSkill(
    492,
    'Flame Strike Strengthener',
    'Flame Strike damage increases by {value}.',
    'flame-strike-strengthener',
    FORMULA_4,
    20
);
Skills.MG_GiganticStormStrengthener = new ClassSkill(
    496,
    'Gigantic Storm Strengthener',
    'Gigantic Storm skill damage increases by {value}.',
    'gigantic-storm-strengthener',
    FORMULA_3,
    20
);

/**
 * @type SkillTreeSchema
 */
const MGSkillTreeSchema = {
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
                'MG_WingOfRuinDefensePowUp',
                'WeaponBlock',
                'ProtectionShield'
            ],
            [
                null,
                {
                    name: 'MG_WingOfRuinAttackPowUp',
                    dependency: SkillTreeSkillDependencies.vertical
                },
                'SteelArmor',
                {
                    name: 'ShieldBlock',
                    dependency: SkillTreeSkillDependencies.vertical
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
                    dependency: SkillTreeSkillDependencies.vertical
                },
                null,
                {
                    name: 'MG_WeaponMastery',
                    dependency: SkillTreeSkillDependencies.double_left
                }
            ],
            [
                {
                    name: 'InfernoStrengthener',
                    dependency: SkillTreeSkillDependencies.vertical
                },
                'EvilSpiritStrengthener',
                {
                    name: 'MagicMastery',
                    dependency: SkillTreeSkillDependencies.horizontal
                },
                'MaximumLifeIncrease'
            ],
            [
                null,
                'MG_FireSlashStrengthener',
                'IceStrengthener',
                {
                    name: 'MaximumManaIncrease',
                    dependency: SkillTreeSkillDependencies.vertical
                }
            ],
            [
                'MG_FlameStrikeStrengthener',
                null,
                null,
                {
                    name: 'MaximumAGIncrease',
                    dependency: SkillTreeSkillDependencies.vertical
                }
            ],
            [
                null,
                {
                    name: 'MG_FireSlashMastery',
                    dependency: SkillTreeSkillDependencies.vertical_double
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
                    dependency: SkillTreeSkillDependencies.vertical
                },
                {
                    name: 'EarthPrisonStrengthener',
                    dependency: SkillTreeSkillDependencies.vertical
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
                    dependency: SkillTreeSkillDependencies.vertical
                },
                {
                    name: 'OneHandedSwordMastery',
                    dependency: SkillTreeSkillDependencies.vertical
                },
                {
                    name: 'OneHandedStaffMastery',
                    dependency: SkillTreeSkillDependencies.vertical
                },
                {
                    name: 'TwoHandedStaffMastery',
                    dependency: SkillTreeSkillDependencies.vertical
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
                    dependency: SkillTreeSkillDependencies.vertical
                }
            ],
            [
                {
                    name: 'MaximumWizardryIncrease',
                    dependency: SkillTreeSkillDependencies.vertical
                },
                {
                    name: 'MaximumAttackPowerIncrease',
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

SkillTreeSchemas.set(SkillTreeClasses.MG, MGSkillTreeSchema);
