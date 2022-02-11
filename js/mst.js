import {Skills} from './skills.js';
import {} from './trees/mg.js';
import {SkillsTreeBranches, SkillsTreeClasses, SkillsTree} from './skills-tree.js';

const MST = (function () {
	class SkillTreeContainer {
	    /** @type HTMLDivElement */
	    container;
	    /** @type SkillsTree */
	    skillsTree;

		constructor(container) {
			this.container = container;
			this.skillsTree = new SkillsTree();
			this.init();
		}

		init() {
		    this.skillsTree.init(SkillsTreeClasses.MG);

		    this.container.innerHTML = '';
			this._initBranch(SkillsTreeBranches.green);
            this._initBranch(SkillsTreeBranches.blue);
            this._initBranch(SkillsTreeBranches.red);
		}

        /**
         * @param {string} branchName
         * @private
         */
		_initBranch(branchName) {
			const branchElem = this._createElement('table-column-container');
			branchElem.classList.add(branchName);

			const branchTitleElem = this._createElement('table-column-title');
			branchTitleElem.innerHTML = this.skillsTree.getBranchTitle(branchName);

			branchElem.appendChild(branchTitleElem);

			for (let i = 0; i < 9; i++) {
				const row = this.skillsTree.getBranchRank(branchName, i);
				const rowElem = this._createBranchRow(row);
				branchElem.appendChild(rowElem);
			}

			this.container.appendChild(branchElem);

			this._enableBranchRow(branchName, 1);
		}

        /**
         * @param {SkillTreeSchemaRow} row
         * @return {HTMLDivElement}
         * @private
         */
		_createBranchRow(row) {
			const rowElem = this._createElement('table-row');

			for (let i = 0; i < 4; i++) {
				const cellElem = this._createElement('table-cell');
				rowElem.appendChild(cellElem);

				if (!row[i]) {
					continue;
				}

				const skillElem = this._createSkillElem(row[i]);
				cellElem.appendChild(skillElem);
			}


			return rowElem;
		}

        /**
         * @param {SkillTreeSchemaSkill} skill
         * @return {HTMLDivElement}
         * @private
         */
		_createSkillElem(skill) {
			const skillName = typeof skill === 'object' ? skill.name : skill;

			const skillElem = this._createElement('skill');
			skillElem.classList.add('disabled');
			skillElem.onclick = this._increaseSkillLevel.bind(this);
			skillElem.oncontextmenu = this._decreaseSkillLevel.bind(this);
			skillElem.onmouseenter = this._displaySkillDescription.bind(this);
			skillElem.onmousemove = this._updateSkillDescriptionPosition.bind(this);
			skillElem.onmouseleave = this._hideSkillDescription.bind(this);
			skillElem.id = skillName;

			if (typeof skill === 'object') {
				const skillDependency = this._createElement('skill-connector');
				skillDependency.className = `skill-connector ${skill.dependency}`;
				skillElem.appendChild(skillDependency);
			}

			const iconElem = this._createElement('icon');
			iconElem.classList.add(Skills[skillName].getIcon());
			skillElem.appendChild(iconElem);

			const skillLevelElem = this._createElement('skill-level');
			skillLevelElem.innerHTML = '0';
			skillElem.appendChild(skillLevelElem);

			return skillElem;
		}

        /**
         * @param {string} className
         * @return {HTMLDivElement}
         * @private
         */
		_createElement(className) {
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
		_enableBranchRow(branchName, rank, enable = true) {
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

            this._updateSkillDescription(skillName);

			const skillLevelElem = skillElem.querySelector('.skill-level');
			skillLevelElem.innerHTML = skillLevel;

			const rank = this.skillsTree.getSkillRank(skillName);
			if (rank >= 9) {
				return;
			}

			const branchName = this.skillsTree.getSkillBranchName(skillName);
			const rowLevel = this.skillsTree.getBranchRankLevel(branchName, rank);
			if (rowLevel < 10) {
				return;
			}

			this._enableBranchRow(branchName, rank + 1);

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

            this._updateSkillDescription(skillName);

			const skillLevelElem = skillElem.querySelector('.skill-level');
			skillLevelElem.innerHTML = skillLevel;

            if (skillLevel >= 10) {
                return;
            }

			const dependentSkillNames = this.skillsTree.getSkillDependentSkillNames(skillName);
			for (const dependentSkillName of dependentSkillNames) {
			    this._enableSkill(dependentSkillName, false);
            }

            const branchName = this.skillsTree.getSkillBranchName(skillName);
            const rank = this.skillsTree.getSkillRank(skillName);
            const rowLevel = this.skillsTree.getBranchRankLevel(branchName, rank);
            if (rowLevel >= 10) {
                return;
            }

            this._enableBranchRow(branchName, rank + 1, false);
        }

        /**
         * @param {MouseEvent} e
         * @private
         */
        _displaySkillDescription(e) {
            e.preventDefault();

            const skillElem = e.currentTarget;
            const skillName = skillElem.id;

            this._updateSkillDescription(skillName);
        }

        /**
         * @param {string} skillName
         * @private
         */
        _updateSkillDescription(skillName) {
            const skillLevel = this.skillsTree.getSkillLevel(skillName);
            const skillMaxLevel = this.skillsTree.getSkillMaxLevel(skillName);
            const rank = this.skillsTree.getSkillRank(skillName);

            const skillDescriptionElem = document.getElementById('mst-skill-description');
            const skillDescriptionTitleElem = skillDescriptionElem.querySelector('.title');
            const skillDescriptionLevelElem = skillDescriptionElem.querySelector('.level');
            const skillDescriptionDescriptionElem = skillDescriptionElem.querySelector('.description');
            const skillDescriptionNextLevelElem = skillDescriptionElem.querySelector('.next-level');
            const skillDescriptionRequirementsElem = skillDescriptionElem.querySelector('.requirements');

            skillDescriptionTitleElem.innerHTML = Skills[skillName].getTitle();
            skillDescriptionLevelElem.innerHTML =
                `Rank ${rank}, Skill Level: ${skillLevel}/${skillMaxLevel}`;
            skillDescriptionDescriptionElem.innerHTML =
				Skills[skillName].getDescription(skillLevel === 0 ? skillLevel + 1 : skillLevel);

			if ((skillLevel > 0) && (skillLevel < skillMaxLevel)) {
				skillDescriptionNextLevelElem.hidden = false;
				skillDescriptionNextLevelElem.innerHTML = '';

				const nextLevelDescriptionElem = document.createElement('p');
				nextLevelDescriptionElem.innerHTML = Skills[skillName].getDescription(skillLevel + 1);
				skillDescriptionNextLevelElem.appendChild(nextLevelDescriptionElem);
			} else {
				skillDescriptionNextLevelElem.hidden = true;
			}

			this._fillSkillDescriptionRequirements(skillDescriptionRequirementsElem, skillName, rank);

			skillDescriptionElem.hidden = false;
        }

		/**
		 * @param {HTMLDivElement} skillDescriptionRequirementsElem
		 * @param {string} skillName
		 * @param {number} rank
		 * @private
		 */
		_fillSkillDescriptionRequirements(skillDescriptionRequirementsElem, skillName, rank) {
			skillDescriptionRequirementsElem.innerHTML = '';

			// всегда красный
			const requiredPointsElem = this._createParagraph('Required Points: 1');
			requiredPointsElem.classList.add('incomplete');
			skillDescriptionRequirementsElem.appendChild(requiredPointsElem);

			if (rank > 1) {
				const requiresRankElem =
					this._createParagraph(`Requires Rank ${rank} skill of Lv. 10 or higher.`);

				const skillBranch = this.skillsTree.getSkillBranchName(skillName);
				if (this.skillsTree.getBranchRankLevel(skillBranch, rank - 1) < 10) {
					requiresRankElem.classList.add('incomplete');
				}

				skillDescriptionRequirementsElem.appendChild(requiresRankElem);
			}

			const requirements = Skills[skillName].getRequirements();
			for (const requirementSkillName in requirements) {
				const requirementRank = this.skillsTree.getSkillRank(requirementSkillName);
				const requirementSkillTitle = Skills[requirementSkillName].getTitle();

				const requiresSkillElem = this._createParagraph(
					`Requires Rank ${requirementRank + 1} '${requirementSkillTitle}' skill of Lv. 10 or higher`
				);
				if (this.skillsTree.getSkillLevel(requirementSkillName) < 10) {
					requiresSkillElem.classList.add('incomplete');
				}

				skillDescriptionRequirementsElem.appendChild(requiresSkillElem);
			}

			skillDescriptionRequirementsElem.hidden = false;
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
        _updateSkillDescriptionPosition(e) {
            e.preventDefault();

            const skillDescriptionElem = document.getElementById('mst-skill-description');
            const skillDescriptionHeight = skillDescriptionElem.clientHeight;
            const pageHeight = document.body.scrollHeight;
            skillDescriptionElem.style.left = e.clientX + 10 + 'px';
            skillDescriptionElem.style.top = Math.min(pageHeight - skillDescriptionHeight - 15, document.body.scrollTop + e.clientY + 10) + 'px';
        }

        /**
         * @param {MouseEvent} e
         * @private
         */
        _hideSkillDescription (e) {
            e.preventDefault();

            const skillDescriptionElem = document.getElementById('mst-skill-description');
            skillDescriptionElem.hidden = true;
        }
	}

	const container = document.getElementById('master-skill-tree');
	const skillsTreeContainer = new SkillTreeContainer(container);

	return skillsTreeContainer.skillsTree;
})();

