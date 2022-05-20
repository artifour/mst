import {
    ClassSkill,
    FORMULA_1,
    FORMULA_10,
    FORMULA_17,
    FORMULA_22,
    FORMULA_40,
    FORMULA_7,
    Skill,
    Skills
} from '../skills.js';
import {SkillTreeClasses, SkillTreeSchemas, SkillTreeSkillDependencies} from '../skill-tree-schemas.js';

Skills.DW_EternalWingsDefensePowUp = new ClassSkill(
    null,
    'Eternal Wings Defense PowUp',
    'Defense increase by {value} while equipping the Wing of Eternal.',
    'XXX-wing-red',
    FORMULA_17
);
Skills.DW_EternalWingsAttackPowUp = new ClassSkill(
    null,
    'Eternal Wings Defense PowUp',
    'Equipping the eternal wings increases your wizardry by {value}.',
    'XXX-wing-green',
    FORMULA_17,
    20,
    {DW_EternalWingsDefensePowUp: 10}
);
Skills.DW_ExpansionOfWizardryPowerUp = new ClassSkill(
    null,
    'Expansion of Wizardry Power Up',
    'Expansion of Wizardry increases max. Wizardry by {value,}%.',
    'expansion-of-wizardry-power-up',
    FORMULA_1
);
Skills.DW_ExpansionOfWizardryMastery = new ClassSkill(
    null,
    'Expansion of Wizardry Mastery',
    'Expansion of Wizardry increases critical damage rate by {value,}%.',
    'expansion-of-wizardry-mastery',
    FORMULA_1,
    20,
    {DW_ExpansionOfWizardryPowerUp: 10}
);
Skills.DW_DecayStrengthener = new ClassSkill(
    387,
    'Decay Strengthener',
    'Decay skill damage increases by {value}.',
    'decay-strengthener',
    FORMULA_17
);
Skills.DW_HellfireStrengthener = new ClassSkill(
    388,
    'Hellfire Strengthener',
    'Hellfire skill damage increases by {value}.',
    'hellfire-strengthener',
    FORMULA_40
);
Skills.DW_NovaStrengthener = new ClassSkill(
    null,
    'Nova Strengthener',
    'Nova skill damage increases by {value}.',
    'nova-strengthener',
    FORMULA_17,
    20,
    {DW_HellfireStrengthener: 10}
);
Skills.DW_MeteorStrengthener = new ClassSkill(
    null,
    'Meteor Strengthener',
    'Meteor skill damage increases by {value}.',
    'meteor-strengthener',
    FORMULA_40
);
Skills.DW_IceStormStrengthener = new ClassSkill(
    null,
    'Ice Storm Strengthener',
    'Ice Storm skill damage increases by {value}.',
    'ice-storm-strengthener',
    FORMULA_17,
    20,
    {IceStrengthener: 10}
);
Skills.DW_Illusion = new ClassSkill(
    null,
    'Illusion',
    'Learns Illusion.\nCreates the alter ago identical to yourself and attack together. Your alter ego has 30% chance to absorb the damage you receive.\nYour alter ego disappears after its HP is consumed or duration is over.\nCooldown-2 mins.',
    'illusion',
    FORMULA_1,
    10,
    null,
    10
);
Skills.DW_SoulBarrierStrengthener = new ClassSkill(
    null,
    'Soul Barrier Strengthener',
    'Damage Reduction increases by additional {value,}%.',
    'soul-barrier-strengthener',
    FORMULA_7
);
Skills.DW_SoulBarrierProficiency = new ClassSkill(
    null,
    'Soul Barrier Proficiency',
    'Skill duration increases by {value} second(s).',
    'soul-barrier-proficiency',
    FORMULA_10,
    20,
    {DW_SoulBarrierStrengthener: 10}
);
Skills.DW_SoulBarrierMastery = new ClassSkill(
    null,
    'Soul Barrier Mastery',
    'Soul Barrier skill increases max. Mana by additional {value,}%.',
    'soul-barrier-mastery',
    FORMULA_7,
    20,
    {DW_SoulBarrierProficiency: 10}
);
Skills.DW_GrandMagicPowUp = new ClassSkill(
    641,
    'Grand Magic PowUp',
    'Increases magical damage by {value} when attacking an enemy over 4 tiles away.',
    'grand-magic-powup',
    FORMULA_22
);

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
                null
            ],
            [
                'EnergyIncrease',
                'StaminaIncrease',
                'AgilityIncrease',
                'StrengthIncrease'
            ],
            [
                null,
                'DW_EternalWingsDefensePowUp',
                null,
                'ProtectionShield'
            ],
            [
                null,
                {
                    name: 'DW_EternalWingsAttackPowUp',
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
                'DW_ExpansionOfWizardryPowerUp',
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
                {
                    name: 'DW_ExpansionOfWizardryMastery',
                    dependency: SkillTreeSkillDependencies.vertical
                },
                null
            ],
            [
                'EvilSpiritStrengthener',
                {
                    name: 'MagicMastery',
                    dependency: SkillTreeSkillDependencies.horizontal
                },
                'MaximumLifeIncrease',
                'DW_DecayStrengthener'
            ],
            [
                null,
                'DW_HellfireStrengthener',
                {
                    name: 'MaximumManaIncrease',
                    dependency: SkillTreeSkillDependencies.vertical
                },
                'IceStrengthener'
            ],
            [
                'DW_MeteorStrengthener',
                null,
                {
                    name: 'MaximumAGIncrease',
                    dependency: SkillTreeSkillDependencies.vertical
                },
                {
                    name: 'DW_IceStormStrengthener',
                    dependency: SkillTreeSkillDependencies.vertical
                }
            ],
            [
                null,
                {
                    name: 'DW_NovaStrengthener',
                    dependency: SkillTreeSkillDependencies.vertical_double
                },
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
                'DW_Illusion',
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
                'ShieldStrengthener',
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
                {
                    name: 'ShieldMastery',
                    dependency: SkillTreeSkillDependencies.vertical
                },
                null
            ],
            [
                'DW_SoulBarrierStrengthener',
                'ManaReduction',
                'MonsterAttackSDIncrement',
                'MonsterAttackLifeIncrement'
            ],
            [
                {
                    name: 'DW_SoulBarrierProficiency',
                    dependency: SkillTreeSkillDependencies.vertical
                },
                'MinimumWizardryIncrease',
                null,
                {
                    name: 'MonsterAttackManaIncrement',
                    dependency: SkillTreeSkillDependencies.vertical
                }
            ],
            [
                {
                    name: 'DW_SoulBarrierMastery',
                    dependency: SkillTreeSkillDependencies.vertical
                },
                {
                    name: 'MaximumWizardryIncrease',
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
                'DW_GrandMagicPowUp',
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

SkillTreeSchemas.set(SkillTreeClasses.DW, DWSkillTreeSchema);
