import './trees/config.js';
import {SkillTreeBranches} from './skill-tree-schemas.js';
import {SkillTree} from './skill-tree.js';
import {SkillTooltip} from './mst-skill-tooltip.js';
import {ClassSelection} from './mst-class-selection.js';

(function () {
    class SkillTreeContainer {
        /** @type HTMLDivElement */
        container;
        /** @type SkillTree */
        skillTree;
        /** @type SkillTooltip */
        skillTooltip;
        /** @type boolean */
        initialized = false;

        /**
         * @param {HTMLElement} container
         * @param {string} hash
         */
        constructor(container, hash) {
            this.container = container;
            this.skillTree = new SkillTree();
            this.skillTooltip = new SkillTooltip(document.getElementById('mst-skill-tooltip'));

            this.init(hash);
        }

        /**
         * @param {string} hash
         */
        init(hash) {
            if (!hash || (hash.length < 1)) {
                this.container.innerHTML = "";

                new ClassSelection(this.container, function (skillTreeClass) {
                    this.skillTree.init({skillTreeClass: skillTreeClass});
                    this._rebuildTree();
                    this._buildHash();
                }.bind(this));

                return;
            }

            this.skillTree.init({hash: hash});

            if (this.initialized) {
                this._updateTree();
                return;
            }

            this._rebuildTree();
            this._updateTree();
            this._buildHash();
        }

        /**
         * @private
         */
        _rebuildTree() {
            this.container.innerHTML = '';

            const nameElem = this._createDiv('name');
            nameElem.innerHTML = 'Class: ' + this.skillTree.getName() + ' <a href=/>[change]</a>';
            this.container.appendChild(nameElem);

            const pointsElem = this._createDiv('points');
            pointsElem.innerHTML = 'Points: ';
            this.container.appendChild(pointsElem);

            this._initBranch(SkillTreeBranches.green);
            this._initBranch(SkillTreeBranches.blue);
            this._initBranch(SkillTreeBranches.red);

            this.initialized = true;
        }

        /**
         * @param {string} branchName
         * @private
         */
        _initBranch(branchName) {
            const branchElem = this._createDiv('table-column-container');
            branchElem.classList.add(branchName);

            const branchTitleElem = this._createDiv('table-column-title');
            branchElem.appendChild(branchTitleElem);

            for (let i = 0; i < 9; i++) {
                const row = this.skillTree.getBranchRow(branchName, i);
                if (!row) {
                    break;
                }

                const rowElem = this._createBranchRow(row);
                branchElem.appendChild(rowElem);
            }

            this.container.appendChild(branchElem);
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
            if (!this.skillTree.isSkillLevelAccessible(skillName)) {
                skillElem.classList.add('disabled');
            }

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
         * @private
         */
        _updateTree() {
            this._updateTreeLevel();
            this._updateBranch(SkillTreeBranches.green);
            this._updateBranch(SkillTreeBranches.blue);
            this._updateBranch(SkillTreeBranches.red);
        }

        /**
         * @param {string} branchName
         * @private
         */
        _updateBranch(branchName) {
            this._updateBranchLevel(branchName);

            for (let i = 1; i < 10; i++) {
                const skillNames = this.skillTree.getBranchRankSkillNames(branchName, i);

                for (const skillName of skillNames) {
                    this._updateSkill(skillName);
                }
            }
        }

        /**
         * @param {string} skillName
         * @private
         */
        _updateSkill(skillName) {
            const skillElem = document.getElementById(skillName);
            const skillLevelElem = skillElem.querySelector('.skill-level');

            const skillLevel = this.skillTree.getSkillLevel(skillName).toString();
            if (skillLevelElem.innerHTML !== skillLevel) {
                skillLevelElem.innerHTML = skillLevel;
            }

            const disabled = skillElem.classList.contains('disabled');

            if (this.skillTree.isSkillLevelAccessible(skillName)) {
                if (disabled) {
                    skillElem.classList.remove('disabled');
                }
            } else {
                if (!disabled) {
                    skillElem.classList.add('disabled');
                }
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

            let increment = e.ctrlKey ? 10 : 1;
            const currentSkillLevel = this.skillTree.getSkillLevel(skillName);
            const requiredPoints = this.skillTree.getSkillRequiredPoints(skillName);
            if ((currentSkillLevel === 0) && (requiredPoints > 1)) {
                const pointsLeft = this.skillTree.getPointsLeft();
                if (pointsLeft < requiredPoints) {
                    return;
                }

                increment = Math.max(increment, requiredPoints);
            }

            const skillLevel = this.skillTree.increaseSkillLevel(skillName, increment);
            if (skillLevel === currentSkillLevel) {
                return;
            }

            this.skillTooltip.show(this.skillTree, skillName);
            this._buildHash();
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

            let decrement = e.ctrlKey ? 20 : 1;
            const requiredPoints = this.skillTree.getSkillRequiredPoints(skillName);
            if ((currentSkillLevel - decrement) < requiredPoints) {
                decrement += requiredPoints;
            }

            const skillLevel = this.skillTree.decreaseSkillLevel(skillName, decrement);
            if (skillLevel === currentSkillLevel) {
                return;
            }

            this.skillTooltip.show(this.skillTree, skillName);
            this._buildHash();
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
            pointsElem.innerHTML = 'Points: ' + this.skillTree.getPointsLeft();
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

        /**
         * @private
         */
        _buildHash() {
            location.hash = this.skillTree.getHash();
        }
    }

    const container = document.getElementById('master-skill-tree');
    const hash = location.hash.slice(1);
    const skillTreeContainer = new SkillTreeContainer(container, hash);

    window.onhashchange = () => {
        const hash = location.hash.slice(1);
        skillTreeContainer.init(hash);
    }
})();
