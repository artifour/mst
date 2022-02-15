import './trees/mg.js';
import {SkillTreeBranches, SkillTreeClasses} from './skill-tree-schemas.js';
import {MAX_TREE_LEVEL, SkillTree} from './skill-tree.js';
import {SkillTooltip} from './mst-tooltip.js';

const MST = (function () {
    class SkillTreeContainer {
        /** @type HTMLDivElement */
        container;
        /** @type SkillTree */
        skillTree;
        /** @type SkillTooltip */
        skillTooltip;

        /**
         * @param {HTMLElement} container
         */
        constructor(container) {
            this.container = container;
            this.skillTree = new SkillTree();
            this.skillTooltip = new SkillTooltip(document.getElementById('mst-skill-tooltip'));
            this.init();
        }

        init() {
            this.skillTree.init(SkillTreeClasses.MG);

            this.container.innerHTML = '';
            const pointsElem = this._createDiv('points');
            pointsElem.innerHTML = 'Points: ' + MAX_TREE_LEVEL;
            this.container.appendChild(pointsElem);
            this._initBranch(SkillTreeBranches.green);
            this._initBranch(SkillTreeBranches.blue);
            this._initBranch(SkillTreeBranches.red);
        }

        /**
         * @param {string} branchName
         * @private
         */
        _initBranch(branchName) {
            const branchElem = this._createDiv('table-column-container');
            branchElem.classList.add(branchName);

            const branchTitleElem = this._createDiv('table-column-title');
            const branchTitle = this.skillTree.getBranchTitle(branchName);
            branchTitleElem.innerHTML = `${branchTitle}: 0`;

            branchElem.appendChild(branchTitleElem);

            for (let i = 0; i < 9; i++) {
                const row = this.skillTree.getBranchRank(branchName, i);
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
            skillElem.onmouseenter = this._showSkillTooltip.bind(this);
            skillElem.onmousemove = this._updateSkillTooltipPosition.bind(this);
            skillElem.onmouseleave = this._hideSkillTooltip.bind(this);
            skillElem.id = skillName;

            if (typeof skill === 'object') {
                const skillDependency = this._createDiv('skill-connector');
                skillDependency.className = `skill-connector ${skill.dependency}`;
                skillElem.appendChild(skillDependency);
            }

            const iconElem = this._createDiv('icon');
            iconElem.classList.add(this.skillTree.getSkillIcon(skillName));
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
            const skillNames = this.skillTree.getBranchRankSkillNames(branchName, rank);
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

            if (enable && this.skillTree.isSkillLevelAccessible(skillName)) {
                skillElem.classList.remove('disabled');
                return;
            }

            if (!enable && (this.skillTree.getSkillLevel(skillName) === 0)) {
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

            if (!this.skillTree.isSkillLevelAccessible(skillName)) {
                return;
            }

            const currentSkillLevel = this.skillTree.getSkillLevel(skillName);
            const skillLevel = this.skillTree.increaseSkillLevel(skillName, e.ctrlKey ? 10 : 1);
            if (skillLevel === currentSkillLevel) {
                return;
            }

            const branchName = this.skillTree.getSkillBranchName(skillName);

            this.skillTooltip.show(this.skillTree, skillName);
            this._updateBranchLevel(branchName);
            this._updateTreeLevel();

            const skillLevelElem = skillElem.querySelector('.skill-level');
            skillLevelElem.innerHTML = skillLevel;

            const rank = this.skillTree.getSkillRank(skillName);
            if (rank >= 9) {
                return;
            }

            const rankLevel = this.skillTree.getBranchRankLevel(branchName, rank);
            if (rankLevel < 10) {
                return;
            }

            this._enableBranchRank(branchName, rank + 1);

            if (skillLevel < 10) {
                return;
            }

            const dependentSkillNames = this.skillTree.getSkillDependentSkillNames(skillName);
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

            const currentSkillLevel = this.skillTree.getSkillLevel(skillName);
            if (currentSkillLevel < 1) {
                return;
            }

            const skillLevel = this.skillTree.decreaseSkillLevel(skillName, e.ctrlKey ? 20 : 1);
            if (skillLevel === currentSkillLevel) {
                return;
            }

            const branchName = this.skillTree.getSkillBranchName(skillName);

            this.skillTooltip.show(this.skillTree, skillName);
            this._updateBranchLevel(branchName);
            this._updateTreeLevel();

            const skillLevelElem = skillElem.querySelector('.skill-level');
            skillLevelElem.innerHTML = skillLevel;

            if (skillLevel >= 10) {
                return;
            }

            const dependentSkillNames = this.skillTree.getSkillDependentSkillNames(skillName);
            for (const dependentSkillName of dependentSkillNames) {
                this._enableSkill(dependentSkillName, false);
            }

            const rank = this.skillTree.getSkillRank(skillName);
            const rankLevel = this.skillTree.getBranchRankLevel(branchName, rank);
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
            const branchTitle = this.skillTree.getBranchTitle(branchName);
            const branchLevel = this.skillTree.getBranchLevel(branchName);

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
            pointsElem.innerHTML = 'Points: ' + (MAX_TREE_LEVEL - this.skillTree.getTreeLevel());
        }

        /**
         * @param {MouseEvent} e
         * @private
         */
        _showSkillTooltip(e) {
            e.preventDefault();

            const skillElem = e.currentTarget;
            const skillName = skillElem.id;

            this.skillTooltip.show(this.skillTree, skillName);
            this.skillTooltip.setPosition(e.clientX, e.clientY);
        }

        /**
         * @param {MouseEvent} e
         * @private
         */
        _updateSkillTooltipPosition(e) {
            e.preventDefault();

            this.skillTooltip.setPosition(e.clientX, e.clientY);
        }

        /**
         * @param {MouseEvent} e
         * @private
         */
        _hideSkillTooltip(e) {
            e.preventDefault();

            this.skillTooltip.hide();
        }
    }

    const container = document.getElementById('master-skill-tree');
    const skillTreeContainer = new SkillTreeContainer(container);

    return skillTreeContainer.skillTree;
})();

