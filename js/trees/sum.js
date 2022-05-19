import {ClassSkill, FORMULA_1, FORMULA_17, FORMULA_22, FORMULA_3, Skill, Skills} from '../skills.js';
import {SkillTreeClasses, SkillTreeSchemas, SkillTreeSkillDependencies} from '../skill-tree-schemas.js';

Skills.SUM_DimensionWingsDefensePowUp = new ClassSkill(
    null,
    'Dimension Wings Defense PowUp',
    'Defense increases by {value} while equipping the Wing of Dimension.',
    'XXX-wing-red',
    FORMULA_17, // TODO
    20
);
Skills.SUM_DimensionWingsAttackPowUp = new ClassSkill(
    478,
    'Dimension Wings Attack PowUp',
    'Wizardry and Curse power increases by {value} while equipping the Wing of Dimension.',
    'XXX-wing-yellow',
    FORMULA_17, // TODO
    20,
    {SUM_DimensionWingsDefensePowUp: 10}
);
Skills.SUM_ExplosionStrengthener = new ClassSkill(
    null,
    'Explosion Strengthener',
    'Increases damage of Explosion skill by {value}.',
    'explosion-strengthener',
    FORMULA_3 // TODO
);
Skills.SUM_RequiemStrengthener = new ClassSkill(
    null,
    'Requiem Strengthener',
    'Increases damage of Requiem skill by {value}.',
    'requiem-strengthener',
    FORMULA_3 // TODO
);
Skills.SUM_PollutionStrengthener = new ClassSkill(
    null,
    'Pollution Strengthener',
    'Increases damage of Pollution skill by {value}.',
    'pollution-strengthener',
    FORMULA_3 // TODO
);
Skills.SUM_PollutionStrengthener2 = new ClassSkill(
    null,
    'Pollution Strengthener',
    'Increases attack distance of Pollution skill by 1 tile and increases its damage by {value}.',
    'pollution-strengthener-2',
    FORMULA_22, // TODO
    20,
    {SUM_PollutionStrengthener: 10}
);
Skills.SUM_PollutionMastery = new ClassSkill(
    null,
    'Pollution Mastery',
    'Increases number of targets of Pollution skill by 1 and increases its damage by {value}.',
    'pollution-mastery',
    FORMULA_22, // TODO
    20,
    {SUM_PollutionStrengthener2: 10}
);
Skills.SUM_ChainLightningStrengthener = new ClassSkill(
    null,
    'Chain Lightning Strengthener',
    'Chain Lightning skill damage increases by {value}.',
    'chain-lightning-strengthener',
    FORMULA_22
);
Skills.SUM_SleepStrengthener = new ClassSkill(
    null,
    'Sleep Strengthener',
    'The success rate of sleep skill increases by {value,}%.',
    'sleep-strengthener',
    FORMULA_1
);
Skills.SUM_LightningShockStrengthener = new ClassSkill(
    null,
    'Lightning Shock Strengthener',
    'Lightning Shock skill damage increases by {value}.',
    'lightning-shock-strengthener',
    FORMULA_22
);
Skills.SUM_MagicMastery = new ClassSkill(
    null,
    Skills.MagicMastery.title,
    'Wizardry and Curse increase by {value}.',
    'sum-magic-mastery',
    Skills.MagicMastery.values,
    Skills.MagicMastery.maxLevel
);
Skills.SUM_DrainLifeStrengthener = new ClassSkill(
    null,
    'Drain Life Strengthener',
    'Drain Life skill damage and the amount of health absorbed increases by {value}.',
    'drain-life-strengthener',
    FORMULA_22
);
Skills.SUM_WeaknessStrengthener = new ClassSkill(
    null,
    'Weakness Strengthener',
    'The attack penalty is increased by {value} when using Weakness and its duration is increased in stages.',
    'weakness-strengthener',
    FORMULA_3 // TODO
);
Skills.SUM_GreatnessMastery = new ClassSkill(
    null,
    'Greatness Mastery',
    'Elemental damage reduction is increased by {value} when using Weakness skill.',
    'greatness-mastery',
    FORMULA_3, // TODO
    20,
    {SUM_WeaknessStrengthener: 10}
);
Skills.SUM_InnovationStrengthener = new ClassSkill(
    null,
    'Innovation Strengthener',
    'Innovation skill\'s defense reduction increased by {value} and duration increase in stages.',
    'innovation-strengthener',
    FORMULA_3 // TODO
);
Skills.SUM_InnovationMastery = new ClassSkill(
    null,
    'Innovation Mastery',
    'Elemental defence reduction effect is increased by {value} when using Innovation skill.',
    'innovation-mastery',
    FORMULA_3, // TODO
    20,
    {SUM_WeaknessStrengthener: 10}
);
Skills.SUM_Blind = new ClassSkill(
    null,
    'Blind',
    `Learn 'Blind'.\nThe skill Inflicts DMG to and blinds the target to block .`,
    'blind',
    FORMULA_1,
    10,
    null,
    10
);

/**
 * @type SkillTreeSchema
 */
const SUMSkillTreeSchema = {
    name: 'Dimension Summoner',
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
                'SUM_DimensionWingsDefensePowUp',
                null,
                null
            ],
            [
                null,
                {
                    name: 'SUM_DimensionWingsAttackPowUp',
                    dependency: SkillTreeSkillDependencies.vertical
                },
                'SteelArmor',
                null
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
                'SUM_ExplosionStrengthener',
                'SUM_RequiemStrengthener',
                'SUM_PollutionStrengthener',
                null
            ],
            [
                'SUM_ChainLightningStrengthener',
                null,
                {
                    name: 'SUM_PollutionStrengthener2',
                    dependency: SkillTreeSkillDependencies.vertical
                },
                'SUM_SleepStrengthener'
            ],
            [
                'SUM_LightningShockStrengthener',
                null,
                {
                    name: 'SUM_PollutionMastery',
                    dependency: SkillTreeSkillDependencies.vertical
                },
                'MaximumLifeIncrease'
            ],
            [
                'SUM_MagicMastery',
                null,
                'SUM_DrainLifeStrengthener',
                {
                    name: 'MaximumManaIncrease',
                    dependency: SkillTreeSkillDependencies.vertical
                }
            ],
            [
                'SUM_WeaknessStrengthener',
                'SUM_InnovationStrengthener',
                null,
                {
                    name: 'MaximumAGIncrease',
                    dependency: SkillTreeSkillDependencies.vertical
                }
            ],
            [
                {
                    name: 'SUM_GreatnessMastery',
                    dependency: SkillTreeSkillDependencies.vertical
                },
                {
                    name: 'SUM_InnovationMastery',
                    dependency: SkillTreeSkillDependencies.vertical
                },
                null,
                'MaxHPBoost'
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
                'ManaReduction',
                'MonsterAttackSDIncrement',
                'MonsterAttackLifeIncrement'
            ],
            [
                null,
                null,
                null,
                {
                    name: 'MonsterAttackManaIncrement',
                    dependency: SkillTreeSkillDependencies.vertical
                }
            ],
            [
                null,
                null,
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

SkillTreeSchemas.set(SkillTreeClasses.SUM, SUMSkillTreeSchema);
