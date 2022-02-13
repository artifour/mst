import './trees/mg.js';
import {SkillsTreeBranches, SkillsTreeClasses, SkillsTree} from './skills-tree.js';

const MST = (function () {
    class SkillTreeContainer {
        /** @type HTMLDivElement */
        container;
        /** @type SkillsTree */
        skillsTree;

        /**
         * @param {HTMLElement} container
         */
        constructor(container) {
            this.container = container;
            this.skillsTree = new SkillsTree();
            this.init();
        }

        init() {
            this.skillsTree.init(SkillsTreeClasses.MG);

            this.container.innerHTML = '';
            const pointsElem = this._createDiv('points');
            pointsElem.innerHTML = 'Points: 399';
            this.container.appendChild(pointsElem);
            this._initBranch(SkillsTreeBranches.green);
            this._initBranch(SkillsTreeBranches.blue);
            this._initBranch(SkillsTreeBranches.red);
        }

        /**
         * @param {string} branchName
         * @private
         */
        _initBranch(branchName) {
            const branchElem = this._createDiv('table-column-container');
            branchElem.classList.add(branchName);

            const branchTitleElem = this._createDiv('table-column-title');
            const branchTitle = this.skillsTree.getBranchTitle(branchName);
            branchTitleElem.innerHTML = `${branchTitle}: 0`;

            branchElem.appendChild(branchTitleElem);

            for (let i = 0; i < 9; i++) {
                const row = this.skillsTree.getBranchRank(branchName, i);
                const rowElem = this._createBranchRow(row);
                branchElem.appendChild(rowElem);
            }

            this.container.appendChild(branchElem);

            this._enableBranchRank(branchName, 1);
        }

        /**
         * @param {SkillTreeSchemaRow} row
         * @return {HTMLDivElement}
         * @private
         */
        _createBranchRow(row) {
            const rowElem = this._createDiv('table-row');

            for (let i = 0; i < 4; i++) {
                const cellElem = this._createDiv('table-cell');
                rowElem.appendChild(cellElem);

                if (!row[i]) {
                    continue;
                }

                const skillElem = this._createSkill(row[i]);
                cellElem.appendChild(skillElem);
            }

            return rowElem;
        }

        /**
         * @param {SkillTreeSchemaSkill} skill
         * @return {HTMLDivElement}
         * @private
         */
        _createSkill(skill) {
            const skillName = typeof skill === 'object' ? skill.name : skill;

            const skillElem = this._createDiv('skill');
            skillElem.classList.add('disabled');
            skillElem.onclick = this._increaseSkillLevel.bind(this);
            skillElem.oncontextmenu = this._decreaseSkillLevel.bind(this);
            skillElem.onmouseenter = this._displaySkillTooltip.bind(this);
            skillElem.onmousemove = this._updateSkillTooltipPosition.bind(this);
            skillElem.onmouseleave = this._hideSkillTooltip.bind(this);
            skillElem.id = skillName;

            if (typeof skill === 'object') {
                const skillDependency = this._createDiv('skill-connector');
                skillDependency.className = `skill-connector ${skill.dependency}`;
                skillElem.appendChild(skillDependency);
            }

            const iconElem = this._createDiv('icon');
            iconElem.classList.add(this.skillsTree.getSkillIcon(skillName));
            skillElem.appendChild(iconElem);

            const skillLevelElem = this._createDiv('skill-level');
            skillLevelElem.innerHTML = '0';
            skillElem.appendChild(skillLevelElem);

            return skillElem;
        }

        /**
         * @param {string} className
         * @return {HTMLDivElement}
         * @private
         */
        _createDiv(className) {
            const element = document.createElement('div');
            element.classList.add(className);

            return element;
        }

        /**
         * @param {string} branchName
         * @param {number} rank
         * @param {boolean=} enable
         * @private
         */
        _enableBranchRank(branchName, rank, enable = true) {
            const skillNames = this.skillsTree.getBranchRankSkillNames(branchName, rank);
            for (let i = 0; i < skillNames.length; i++) {
                this._enableSkill(skillNames[i], enable);
            }
        }

        /**
         * @param {string} skillName
         * @param {boolean=} enable
         * @private
         */
        _enableSkill(skillName, enable = true) {
            const skillElem = document.getElementById(skillName);

            if (enable && this.skillsTree.isSkillLevelAccessible(skillName)) {
                skillElem.classList.remove('disabled');
                return;
            }

            if (!enable && (this.skillsTree.getSkillLevel(skillName) === 0)) {
                skillElem.classList.add('disabled');
            }
        }

        /**
         * @param {MouseEvent} e
         * @private
         */
        _increaseSkillLevel(e) {
            e.preventDefault();

            const skillElem = e.currentTarget;
            const skillName = skillElem.id;

            if (!this.skillsTree.isSkillLevelAccessible(skillName)) {
                return;
            }

            const currentSkillLevel = this.skillsTree.getSkillLevel(skillName);
            const skillLevel = this.skillsTree.increaseSkillLevel(skillName, e.ctrlKey ? 10 : 1);
            if (skillLevel === currentSkillLevel) {
                return;
            }

            const branchName = this.skillsTree.getSkillBranchName(skillName);

            this._updateSkillTooltip(skillName);
            this._updateBranchLevel(branchName);
            this._updateTreeLevel();

            const skillLevelElem = skillElem.querySelector('.skill-level');
            skillLevelElem.innerHTML = skillLevel;

            const rank = this.skillsTree.getSkillRank(skillName);
            if (rank >= 9) {
                return;
            }

            const rankLevel = this.skillsTree.getBranchRankLevel(branchName, rank);
            if (rankLevel < 10) {
                return;
            }

            this._enableBranchRank(branchName, rank + 1);

            if (skillLevel < 10) {
                return;
            }

            const dependentSkillNames = this.skillsTree.getSkillDependentSkillNames(skillName);
            for (const dependentSkillName of dependentSkillNames) {
                this._enableSkill(dependentSkillName);
            }
        }

        /**
         * @param {MouseEvent} e
         * @private
         */
        _decreaseSkillLevel(e) {
            e.preventDefault();

            const skillElem = e.currentTarget;
            const skillName = skillElem.id;

            const currentSkillLevel = this.skillsTree.getSkillLevel(skillName);
            if (currentSkillLevel < 1) {
                return;
            }

            const skillLevel = this.skillsTree.decreaseSkillLevel(skillName, e.ctrlKey ? 20 : 1);
            if (skillLevel === currentSkillLevel) {
                return;
            }

            const branchName = this.skillsTree.getSkillBranchName(skillName);

            this._updateSkillTooltip(skillName);
            this._updateBranchLevel(branchName);
            this._updateTreeLevel();

            const skillLevelElem = skillElem.querySelector('.skill-level');
            skillLevelElem.innerHTML = skillLevel;

            if (skillLevel >= 10) {
                return;
            }

            const dependentSkillNames = this.skillsTree.getSkillDependentSkillNames(skillName);
            for (const dependentSkillName of dependentSkillNames) {
                this._enableSkill(dependentSkillName, false);
            }

            const rank = this.skillsTree.getSkillRank(skillName);
            const rankLevel = this.skillsTree.getBranchRankLevel(branchName, rank);
            if (rankLevel >= 10) {
                return;
            }

            this._enableBranchRank(branchName, rank + 1, false);
        }

        /**
         * @param {string} branchName
         * @private
         */
        _updateBranchLevel(branchName) {
            const branchTitle = this.skillsTree.getBranchTitle(branchName);
            const branchLevel = this.skillsTree.getBranchLevel(branchName);

            const branchTitleElem = this.container.querySelector(
                `.table-column-container.${branchName} .table-column-title`
            );
            branchTitleElem.innerHTML = `${branchTitle}: ${branchLevel}`;
        }

        /**
         * @private
         */
        _updateTreeLevel() {
            const pointsElem = this.container.querySelector('.points');
            pointsElem.innerHTML = 'Points: ' + (399 - this.skillsTree.getTreeLevel());
        }

        /**
         * @param {MouseEvent} e
         * @private
         */
        _displaySkillTooltip(e) {
            e.preventDefault();

            const skillElem = e.currentTarget;
            const skillName = skillElem.id;

            this._updateSkillTooltip(skillName);
        }

        /**
         * @param {string} skillName
         * @private
         */
        _updateSkillTooltip(skillName) {
            const skillLevel = this.skillsTree.getSkillLevel(skillName);
            const skillMaxLevel = this.skillsTree.getSkillMaxLevel(skillName);
            const rank = this.skillsTree.getSkillRank(skillName);

            const skillTooltipElem = document.getElementById('mst-skill-tooltip');
            const skillTooltipTitleElem = skillTooltipElem.querySelector('.title');
            const skillTooltipLevelElem = skillTooltipElem.querySelector('.level');
            const skillTooltipDescriptionElem = skillTooltipElem.querySelector('.description');
            const skillTooltipNextLevelElem = skillTooltipElem.querySelector('.next-level');
            const skillTooltipRequirementsElem = skillTooltipElem.querySelector('.requirements');

            skillTooltipTitleElem.innerHTML = this.skillsTree.getSkillTitle(skillName);
            skillTooltipLevelElem.innerHTML =
                `Rank ${rank}, Skill Level: ${skillLevel}/${skillMaxLevel}`;
            skillTooltipDescriptionElem.innerHTML = this.skillsTree.getSkillDescription(skillName);

            if ((skillLevel > 0) && (skillLevel < skillMaxLevel)) {
                skillTooltipNextLevelElem.hidden = false;
                skillTooltipNextLevelElem.innerHTML = '';

                const nextLevelTooltipElem = document.createElement('p');
                nextLevelTooltipElem.innerHTML = this.skillsTree.getSkillDescription(skillName, skillLevel + 1);
                skillTooltipNextLevelElem.appendChild(nextLevelTooltipElem);
            } else {
                skillTooltipNextLevelElem.hidden = true;
            }

            if (skillLevel < skillMaxLevel) {
                this._fillSkillTooltipRequirements(skillTooltipRequirementsElem, skillName, rank);
            } else {
                skillTooltipRequirementsElem.hidden = true;
            }

            skillTooltipElem.hidden = false;
        }

        /**
         * @param {HTMLDivElement} skillTooltipRequirementsElem
         * @param {string} skillName
         * @param {number} rank
         * @private
         */
        _fillSkillTooltipRequirements(skillTooltipRequirementsElem, skillName, rank) {
            skillTooltipRequirementsElem.innerHTML = '';

            // всегда красный
            const requiredPointsElem = this._createParagraph('Required Points: 1');
            requiredPointsElem.classList.add('incomplete');
            skillTooltipRequirementsElem.appendChild(requiredPointsElem);

            if (rank > 1) {
                const requiresRankElem = this._createParagraph(`Requires Rank ${rank - 1} skill of Lv. 10 or higher.`);

                const skillBranch = this.skillsTree.getSkillBranchName(skillName);
                if (this.skillsTree.getBranchRankLevel(skillBranch, rank - 1) < 10) {
                    requiresRankElem.classList.add('incomplete');
                }

                skillTooltipRequirementsElem.appendChild(requiresRankElem);
            }

            const requirements = this.skillsTree.getSkillRequirements(skillName);
            for (const requirementSkillName in requirements) {
                const requirementRank = this.skillsTree.getSkillRank(requirementSkillName);
                const requirementSkillTitle = this.skillsTree.getSkillTitle(requirementSkillName);

                const requiresSkillElem = this._createParagraph(
                    `Requires Rank ${requirementRank} '${requirementSkillTitle}' skill of Lv. 10 or higher`
                );
                if (this.skillsTree.getSkillLevel(requirementSkillName) < 10) {
                    requiresSkillElem.classList.add('incomplete');
                }

                skillTooltipRequirementsElem.appendChild(requiresSkillElem);
            }

            skillTooltipRequirementsElem.hidden = false;
        }

        /**
         * @param {string} text
         * @return {HTMLParagraphElement}
         * @private
         */
        _createParagraph(text) {
            const element = document.createElement('p');
            element.innerHTML = text;

            return element;
        }

        /**
         * @param {MouseEvent} e
         * @private
         */
        _updateSkillTooltipPosition(e) {
            e.preventDefault();

            const skillTooltipElem = document.getElementById('mst-skill-tooltip');
            const skillTooltipHeight = skillTooltipElem.clientHeight;
            const pageHeight = document.body.scrollHeight;
            skillTooltipElem.style.left = e.clientX + 10 + 'px';
            skillTooltipElem.style.top = Math.min(pageHeight - skillTooltipHeight - 15, document.body.scrollTop + e.clientY + 10) + 'px';
        }

        /**
         * @param {MouseEvent} e
         * @private
         */
        _hideSkillTooltip(e) {
            e.preventDefault();

            const skillTooltipElem = document.getElementById('mst-skill-tooltip');
            skillTooltipElem.hidden = true;
        }
    }

    const container = document.getElementById('master-skill-tree');
    const skillsTreeContainer = new SkillTreeContainer(container);

    return skillsTreeContainer.skillsTree;
})();

