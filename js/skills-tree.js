import {Skills} from './skills.js';

/** @typedef {{name: string, dependency: string}} SkillTreeSchemaSkillWithDependency */
/** @typedef {string|SkillTreeSchemaSkillWithDependency} SkillTreeSchemaSkill */
/** @typedef {null|SkillTreeSchemaSkill} SkillTreeSchemaCell */
/** @typedef {SkillTreeSchemaCell[]} SkillTreeSchemaRow */
/** @typedef {{name: string, rows: SkillTreeSchemaRow[]}} SkillTreeSchemaBranch */
/**
 * @typedef {{green: SkillTreeSchemaBranch, blue: SkillTreeSchemaBranch, red: SkillTreeSchemaBranch}} SkillTreeSchema
 */

export const SkillsTreeBranches = Object.freeze({
    green: 'green',
    blue: 'blue',
    red: 'red'
});

export const SkillsTreeSkillDependencies = Object.freeze({
    vertical: 'vertical',
    vertical_double: 'vertical double',
    horizontal: 'horizontal',
});

export const SkillsTreeClasses = {
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
export const SkillsTreeSchemas = {
    DK: null,
    DW: null,
    ELF: null,
    MG: null,
    DL: null,
    SUM: null,
    GL: null,
    SLA: null,
    GUN: null
};

class SkillInstance {
    /** @type {string} */
    branchName;
    /** @type {number} */
    rank;
    /** @type {number} */
    level;
    /** @type {string[]} */
    dependentSkillNames;

    /**
     * @param {string} branchName
     * @param {number} rank
     * @param {number} level
     */
    constructor(branchName, rank, level) {
        this.branchName = branchName;
        this.rank = rank;
        this.level = level;
        this.dependentSkillNames = [];
    }
}

export class SkillsTree {
    /** @type {SkillTreeSchema} */
    schema;
    /** @type {Object.<string, SkillInstance>} */
    skills;

    /**
     * @param {string} skillsTreeClass
     */
    init(skillsTreeClass) {
        this.schema = SkillsTreeSchemas[skillsTreeClass];
        this.skills = {};
        for (let i = 0; i < this.schema[SkillsTreeBranches.green].rows.length; i++) {
            /** @type SkillTreeSchemaRow */
            const row = this.schema[SkillsTreeBranches.green].rows[i];
            for (let j = 0; j < 4; j++) {
                if (!row[j]) {
                    continue;
                }

                const skillName = (typeof row[j] === 'object') ? row[j].name : row[j];

                const requirementSkillLevels = Skills[skillName].getRequirements();
                for (const requirementSkillName in requirementSkillLevels) {
                    this.skills[requirementSkillName].dependentSkillNames.push(skillName);
                }

                this.skills[skillName] = new SkillInstance(SkillsTreeBranches.green, i + 1, 0);
            }
        }
    }

    /**
     * @param {string} branchName
     * @returns {string}
     */
    getBranchTitle(branchName) {
        return this.schema[branchName].name;
    }

    /**
     * @param {string} branchName
     * @param {number} rowIndex
     * @returns {SkillTreeSchemaRow}
     */
    getBranchRank(branchName, rowIndex) {
        return this.schema[branchName].rows[rowIndex];
    }

    /**
     * @param {string} branchName
     * @return {number}
     */
    getBranchLevel(branchName) {
        let level = 0;
        this.skills.forEach(function (skill) {
            if (skill.branchName !== branchName) {
                return;
            }

            level += skill.level;
        });

        return level;
    }

    /**
     * @param {string} branchName
     * @param {number} rank
     * @return {number}
     */
    getBranchRankLevel(branchName, rank) {
        let level = 0;
        for (const skillName in this.skills) {
            if ((this.skills[skillName].branchName !== branchName) || (this.skills[skillName].rank !== rank)) {
                continue;
            }

            level += this.skills[skillName].level;
        }

        return level;
    }

    /**
     * @param {string} branchName
     * @param {number} rank
     * @return {string[]}
     */
    getBranchRankSkillNames(branchName, rank) {
        let skillNames = [];
        for (const skillName in this.skills) {
            if ((this.skills[skillName].branchName !== branchName) || (this.skills[skillName].rank !== rank)) {
                continue;
            }

            skillNames.push(skillName);
        }

        return skillNames;
    }

    /**
     * @param {string} skillName
     * @param {number=} increment
     * @return {number}
     */
    increaseSkillLevel(skillName, increment = 1) {
        const level = this.getSkillLevel(skillName);
        const maxLevel = this.getSkillMaxLevel(skillName);
        if (level >= maxLevel) {
            return level;
        }

        return this.skills[skillName].level = Math.min(maxLevel, level + increment);
    }

    /**
     * @param {string} skillName
     * @param {number=} decrement
     * @return {number}
     */
    decreaseSkillLevel(skillName, decrement = 1) {
        const level = this.getSkillLevel(skillName);
        if (level === 0) {
            return level;
        }

        const planningLevel = Math.max(0, level - decrement);

        if ((planningLevel < 10) && this._hasLeveledDependentSkills(skillName)) {
            return this.skills[skillName].level = 10;
        }

        const branchName = this.getSkillBranchName(skillName);
        const rank = this.getSkillRank(skillName);
        const rankLevel = this.getBranchRankLevel(branchName, rank);
        const planningRankLevel = rankLevel - level + planningLevel;
        const nextRankLevel = this.getBranchRankLevel(branchName, rank + 1);
        if ((planningRankLevel < 10) && (nextRankLevel > 0)) {
            return this.skills[skillName].level = 10 - rankLevel + level;
        }

        return this.skills[skillName].level = planningLevel;
    }

    /**
     * @param {string} skillName
     * @return {number}
     */
    getSkillLevel(skillName) {
        return this.skills[skillName].level;
    }

    /**
     * @param {string} skillName
     * @return {number}
     */
    getSkillMaxLevel(skillName) {
        return Skills[skillName].getMaxLevel();
    }

    /**
     * @param {string} skillName
     * @return {number}
     */
    getSkillRank(skillName) {
        return this.skills[skillName].rank;
    }

    /**
     * @param {string} skillName
     * @return {string}
     */
    getSkillBranchName(skillName) {
        return this.skills[skillName].branchName;
    }

    /**
     * @param {string} skillName
     * @return {string[]}
     */
    getSkillDependentSkillNames(skillName) {
        return this.skills[skillName].dependentSkillNames;
    }

    /**
     * @param {string} skillName
     * @return {boolean}
     */
    isSkillLevelAccessible(skillName) {
        const rank = this.getSkillRank(skillName);
        if (rank <= 1) {
            return true;
        }

        const branchName = this.getSkillBranchName(skillName);
        const previousRankLevel = this.getBranchRankLevel(branchName, rank - 1);
        if (previousRankLevel < 10) {
            return false;
        }

        if (!Skills[skillName].hasRequirements()) {
            return true;
        }

        const requirementSkillLevels = Skills[skillName].getRequirements();
        for (const skillName in requirementSkillLevels) {
            if (this.getSkillLevel(skillName) < requirementSkillLevels[skillName]) {
                return false;
            }
        }

        return true;
    }

    /**
     * @param {string} skillName
     * @return {boolean}
     * @private
     */
    _hasLeveledDependentSkills(skillName) {
        const dependentSkillNames = this.getSkillDependentSkillNames(skillName);
        for (const dependentSkillName of dependentSkillNames) {
            if (this.getSkillLevel(dependentSkillName) > 0) {
                return true;
            }
        }

        return false;
    }
}
