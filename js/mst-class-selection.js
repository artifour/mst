import {SkillTreeSchemas} from './skill-tree-schemas.js';

export class ClassSelection {
    /** @type HTMLDivElement */
    container;
    callback;

    constructor(container, callback) {
        this.container = container;
        this.callback = callback;

        this.init();
    }

    init() {
        const skillTreeClasses = SkillTreeSchemas.getAvailableSkillTreeClasses();
        for (let i = 0; i < skillTreeClasses.length; i++) {
            const classCard = this._createDiv('class');
            classCard.classList.add(skillTreeClasses[i]);
            classCard.onclick = () => this.callback(skillTreeClasses[i]);

            this.container.appendChild(classCard);
        }
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
}
