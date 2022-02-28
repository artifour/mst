import {SkillTree} from './skill-tree.js';

export class SkillTooltip {
    /** @type HTMLDivElement */
    container;

    /**
     * @param {HTMLElement} container
     */
    constructor(container) {
        this.container = container;
    }

    /**
     * @param {SkillTree} skillTree
     * @param {string} skillName
     */
    show(skillTree, skillName) {
        const skillLevel = skillTree.getSkillLevel(skillName);
        const skillMaxLevel = skillTree.getSkillMaxLevel(skillName);
        const rank = skillTree.getSkillRank(skillName);

        const skillTooltipTitleElem = this.container.querySelector('.title');
        const skillTooltipLevelElem = this.container.querySelector('.level');
        const skillTooltipDescriptionElem = this.container.querySelector('.description');
        const skillTooltipNextLevelElem = this.container.querySelector('.next-level');
        const skillTooltipRequirementsElem = this.container.querySelector('.requirements');

        skillTooltipTitleElem.innerHTML = skillTree.getSkillTitle(skillName);
        skillTooltipLevelElem.innerHTML =
            `Rank ${rank}, Skill Level: ${skillLevel}/${skillMaxLevel}`;
        skillTooltipDescriptionElem.innerHTML = skillTree.getSkillDescription(skillName).replace(/\n/g, '<br>');

        if ((skillLevel > 0) && (skillLevel < skillMaxLevel)) {
            skillTooltipNextLevelElem.hidden = false;
            skillTooltipNextLevelElem.innerHTML = '';

            const nextLevelTooltipElem = document.createElement('p');
            nextLevelTooltipElem.innerHTML = skillTree.getSkillDescription(skillName, skillLevel + 1);
            skillTooltipNextLevelElem.appendChild(nextLevelTooltipElem);
        } else {
            skillTooltipNextLevelElem.hidden = true;
        }

        if (skillLevel < skillMaxLevel) {
            this._fillSkillTooltipRequirements(skillTree, skillTooltipRequirementsElem, skillName, rank);
        } else {
            skillTooltipRequirementsElem.hidden = true;
        }

        //  this.container.hidden = false;
    }

    hide() {
        this.container.hidden = true;
        this.container.style.left = '0';
        this.container.style.top = '0';
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    setPosition(x, y) {
        const skillTooltipHeight = this.container.clientHeight;
        const pageHeight = document.body.scrollHeight;
        this.container.style.left = x + 10 + 'px';
        this.container.style.top = Math.min(
            pageHeight - skillTooltipHeight - 15,
            document.body.scrollTop + y + 10
        ) + 'px';
        this.container.hidden = false;
    }

    /**
     * @param {SkillTree} skillTree
     * @param {HTMLDivElement} skillTooltipRequirementsElem
     * @param {string} skillName
     * @param {number} rank
     * @private
     */
    _fillSkillTooltipRequirements(skillTree, skillTooltipRequirementsElem, skillName, rank) {
        skillTooltipRequirementsElem.innerHTML = '';

        const skillRequiredPoints = skillTree.getSkillRequiredPoints(skillName);
        // всегда красный
        const requiredPointsElem = this._createParagraph(`Required Points: ${skillRequiredPoints}`);
        requiredPointsElem.classList.add('incomplete');
        skillTooltipRequirementsElem.appendChild(requiredPointsElem);

        if (rank > 1) {
            const requiresRankElem = this._createParagraph(`Requires Rank ${rank - 1} skill of Lv. 10 or higher.`);

            const skillBranch = skillTree.getSkillBranchName(skillName);
            if (skillTree.getBranchRankLevel(skillBranch, rank - 1) < 10) {
                requiresRankElem.classList.add('incomplete');
            }

            skillTooltipRequirementsElem.appendChild(requiresRankElem);
        }

        const requirements = skillTree.getSkillRequirements(skillName);
        for (const requirementSkillName in requirements) {
            const requirementRank = skillTree.getSkillRank(requirementSkillName);
            const requirementSkillTitle = skillTree.getSkillTitle(requirementSkillName);

            const requiresSkillElem = this._createParagraph(
                `Requires Rank ${requirementRank} '${requirementSkillTitle}' skill of Lv. 10 or higher`
            );
            if (skillTree.getSkillLevel(requirementSkillName) < 10) {
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
}
