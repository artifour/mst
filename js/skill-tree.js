import {Skills} from './skills.js';
import {SkillTreeBranches, SkillTreeClasses, SkillTreeSchemas} from './skill-tree-schemas.js';
import {SkillTreeHashDecoder, SkillTreeHashEncoder} from './skill-tree-hash.js';

export const MAX_TREE_LEVEL = 399;

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

export class SkillTree {
    /** @type string */
    skillTreeClass;
    /** @type {SkillTreeSchema} */
    schema;
    /** @type {Object.<string, SkillInstance>} */
    skills;

    /**
     * @param {{skillTreeClass?: string, hash?: string}} args
     */
    init(args) {
        if (args.hasOwnProperty('skillTreeClass')) {
            this.skillTreeClass = args.skillTreeClass;
        }

        let skillTreeHashDecoder = null;
        if (args.hasOwnProperty('hash')) {
            skillTreeHashDecoder = new SkillTreeHashDecoder(args.hash);
            this.skillTreeClass = skillTreeHashDecoder.getSkillTreeClass();
        }

        this.schema = SkillTreeSchemas[this.skillTreeClass];
        this.skills = {};
        for (const branchName in SkillTreeBranches) {
            for (let i = 0; i < this.schema[branchName].rows.length; i++) {
                /** @type SkillTreeSchemaRow */
                const row = this.schema[branchName].rows[i];
                for (let j = 0; j < 4; j++) {
                    if (!row[j]) {
                        continue;
                    }

                    const skillName = (typeof row[j] === 'object') ? row[j].name : row[j];
                    if (!Skills.hasOwnProperty(skillName)) {
                        throw Error(`Skill ${skillName} not found`);
                    }

                    const requirementSkillLevels = Skills[skillName].getRequirements();
                    for (const requirementSkillName in requirementSkillLevels) {
                        if (!Skills.hasOwnProperty(requirementSkillName)) {
                            throw Error(`Skill ${requirementSkillName} not found`);
                        }

                        if (!this.skills.hasOwnProperty(requirementSkillName)) {
                            throw Error(`Skill ${requirementSkillName} order error`);
                        }

                        this.skills[requirementSkillName].dependentSkillNames.push(skillName);
                    }

                    if (skillTreeHashDecoder) {
                        this.skills[skillName] = new SkillInstance(
                            branchName,
                            i + 1,
                            skillTreeHashDecoder.getSkillLevel(skillName)
                        );
                    } else {
                        this.skills[skillName] = new SkillInstance(branchName, i + 1, 0);
                    }
                }
            }
        }
    }

    /**
     * @return {string}
     */
    getName() {
        return this.schema.name;
    }

    /**
     * @return {string}
     */
    getHash() {
        const skillTreeHashEncoder = new SkillTreeHashEncoder(this.skillTreeClass);
        for (const skillName in this.skills) {
            skillTreeHashEncoder.addSkill(skillName, this.skills[skillName].level);
        }

        return skillTreeHashEncoder.encode();
    }

    /**
     * @return {number}
     */
    getTreeLevel() {
        let level = 0;
        for (const skillName in this.skills) {
            level += this.skills[skillName].level;
        }

        return level;
    }

    /**
     * @return {number}
     */
    getPointsLeft() {
        return MAX_TREE_LEVEL - this.getTreeLevel();
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
        for (const skillName in this.skills) {
            if (this.skills[skillName].branchName !== branchName) {
                continue;
            }

            level += this.skills[skillName].level;
        }

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

        const treeLevel = this.getTreeLevel();
        if (treeLevel + increment > MAX_TREE_LEVEL) {
            increment = MAX_TREE_LEVEL - treeLevel;
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
     * @return {string}
     */
    getSkillTitle(skillName) {
        return Skills[skillName].getTitle();
    }

    /**
     * @param {string} skillName
     * @param {number|null=} skillLevel
     * @return {string}
     */
    getSkillDescription(skillName, skillLevel = null) {
        if (skillLevel !== null) {
            return Skills[skillName].getDescription(skillLevel);
        }

        const currentSkillLevel = this.getSkillLevel(skillName);
        if (currentSkillLevel > 0) {
            return Skills[skillName].getDescription(currentSkillLevel);
        }

        return Skills[skillName].getDescription(1);
    }

    /**
     * @param {string} skillName
     * @return {string}
     */
    getSkillIcon(skillName) {
        return Skills[skillName].getIcon(this.getSkillLevel(skillName));
    }

    /**
     * @param skillName
     * @return {Requirements}
     */
    getSkillRequirements(skillName) {
        return Skills[skillName].getRequirements() || {};
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
     * @return {number}
     */
    getSkillRequiredPoints(skillName) {
        return Skills[skillName].getRequiredPoints();
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

        const requirementSkillLevels = this.getSkillRequirements(skillName);
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
