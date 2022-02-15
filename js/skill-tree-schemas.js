/** @typedef {{name: string, dependency: string}} SkillTreeSchemaSkillWithDependency */
/** @typedef {string|SkillTreeSchemaSkillWithDependency} SkillTreeSchemaSkill */
/** @typedef {null|SkillTreeSchemaSkill} SkillTreeSchemaCell */
/** @typedef {SkillTreeSchemaCell[]} SkillTreeSchemaRow */
/** @typedef {{name: string, rows: SkillTreeSchemaRow[]}} SkillTreeSchemaBranch */
/**
 * @typedef {{name: string, green: SkillTreeSchemaBranch, blue: SkillTreeSchemaBranch, red: SkillTreeSchemaBranch}} SkillTreeSchema
 */

export const SkillTreeBranches = Object.freeze({
    green: 'green',
    blue: 'blue',
    red: 'red'
});

export const SkillTreeSkillDependencies = Object.freeze({
    vertical: 'vertical',
    vertical_double: 'vertical double',
    horizontal: 'horizontal',
    double_left: 'double-left'
});

export const SkillTreeClasses = {
    DK: 'DK',
    DW: 'DW',
    ELF: 'ELF',
    MG: 'MG',
    DL: 'DL',
    SUM: 'SUM',
    GL: 'GL',
    SLA: 'SLA',
    GUN: 'GUN'
};

/**
 * @type {Object.<string, SkillTreeSchema>}
 */
export const SkillTreeSchemas = {
    DK: null,
    DW: null,
    ELF: null,
    MG: null,
    DL: null,
    SUM: null,
    GL: null,
    SLA: null,
    GUN: null,

    /**
     * @param {string} skillTreeClass
     * @param {SkillTreeSchema} skillTreeSchema
     */
    set: function (skillTreeClass, skillTreeSchema) {
        this[skillTreeClass] = skillTreeSchema;
    },

    /**
     * @param {string} skillName
     */
    getSkillCode: function (skillName) {

    }
};
