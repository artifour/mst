import {ClassSkill, FORMULA_17, FORMULA_22, FORMULA_283, FORMULA_3, FORMULA_4, FORMULA_7, Skills} from '../skills.js';
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
    {MG_PowerSlashStrengthener: 10}
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
Skills.MG_SpiralChargeStrengthener = new ClassSkill(
    null,
    'Spiral Charge Strengthener',
    'The damage caused by using the two-handed sword\n skill tree times increases by {value}.',
    'spiral-charge-strengthener',
    FORMULA_3
);
Skills.MG_SpiralChargeMastery = new ClassSkill(
    null,
    'Spiral Charge Mastery',
    'Added {value} sword explosion damage that occurs when y\nou use two-handed sword skills tree times.',
    'spiral-charge-mastery',
    FORMULA_283,
    20,
    {MG_SpiralChargeStrengthener: 10}
);
Skills.MG_CrusherChargeStrengthener = new ClassSkill(
    null,
    'Crusher Charge Strengthener',
    'Increases the damage caused by explosion of sw\nords when using a one-handed sword skill tree time\ns by {value}.',
    'crusher-charge-strengthener',
    FORMULA_3
);
Skills.MG_CrusherChargeMastery = new ClassSkill(
    null,
    'Crusher Charge Mastery',
    '{value} additional sword damage that occurs when you use\na one-handed sword skill tree times.',
    'crusher-charge-mastery',
    FORMULA_283,
    20,
    {MG_CrusherChargeStrengthener: 10}
);
Skills.MG_ElementalChargeStrengthener = new ClassSkill(
    null,
    'Elemental Charge Strengthener',
    'Increases the damage caused by explosion of sw\nords when using a one-handed sword skill tree time\ns by {value}.',
    'elemental-charge-strengthener',
    FORMULA_3
);
Skills.MG_ElementalChargeMastery = new ClassSkill(
    null,
    'Elemental Charge Mastery',
    '{value} additional sword damage that occurs when you use\na one-handed sword skill tree times.',
    'elemental-charge-mastery',
    FORMULA_283,
    20,
    {MG_ElementalChargeStrengthener: 10}
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
                    dependency: SkillTreeSkillDependencies.vertical
                }
            ],
            [
                'MG_FireSlashStrengthener',
                'EvilSpiritStrengthener',
                {
                    name: 'MagicMastery',
                    dependency: SkillTreeSkillDependencies.horizontal
                },
                'MaximumLifeIncrease'
            ],
            [
                {
                    name: 'MG_FireSlashMastery',
                    dependency: SkillTreeSkillDependencies.vertical
                },
                null,
                'MG_GiganticStormStrengthener',
                {
                    name: 'MaximumManaIncrease',
                    dependency: SkillTreeSkillDependencies.vertical
                }
            ],
            [
                'MG_SpiralChargeStrengthener',
                'MG_CrusherChargeStrengthener',
                'MG_ElementalChargeStrengthener',
                {
                    name: 'MaximumAGIncrease',
                    dependency: SkillTreeSkillDependencies.vertical
                }
            ],
            [
                {
                    name: 'MG_SpiralChargeMastery',
                    dependency: SkillTreeSkillDependencies.vertical
                },
                {
                    name: 'MG_CrusherChargeMastery',
                    dependency: SkillTreeSkillDependencies.vertical
                },
                {
                    name: 'MG_ElementalChargeMastery',
                    dependency: SkillTreeSkillDependencies.vertical
                },
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
                null
            ],
            [
                'RestoresAllMana',
                null,
                'AbsorbLife',
                'IncreasesCriticalDamageRate'
            ],
            [
                null,
                'RestoresAllHP',
                null,
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
                null
            ]
        ]
    }
}

SkillTreeSchemas.set(SkillTreeClasses.MG, MGSkillTreeSchema);
