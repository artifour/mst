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

export const SkillTreeClasses = Object.freeze({
    DK: 'DK',
    DW: 'DW',
    ELF: 'ELF',
    MG: 'MG',
    DL: 'DL',
    SUM: 'SUM',
    RF: 'RF',
    GL: 'GL',
    RW: 'RW',
    SL: 'SL',
    GC: 'GC',
    WM: 'WM',
    LM: 'LM',

    /**
     * @return {string[]}
     */
    getAll: function () {
        return [this.DK, this.DW, this.ELF, this.MG, this.DL, this.SUM, this.RF, this.GL, this.RW, this.SL, this.GC,
            this.WM, this.LM];
    },
});

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
    RF: null,
    GL: null,
    RW: null,
    SL: null,
    GC: null,
    WM: null,
    LM: null,

    /**
     * @param {string} skillTreeClass
     * @param {SkillTreeSchema} skillTreeSchema
     */
    set: function (skillTreeClass, skillTreeSchema) {
        console.log(`${skillTreeClass} skill tree loaded.`);
        this[skillTreeClass] = skillTreeSchema;
    },

    /**
     * @return {string[]}
     */
    getAvailableSkillTreeClasses: function () {
        return SkillTreeClasses.getAll().filter(skillTreeClass => SkillTreeSchemas[skillTreeClass]);
    }
};
