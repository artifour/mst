import {SkillTreeClasses} from './skill-tree-schemas.js';
import {Skills} from './skills.js';

const VERSION = 1;

export class SkillTreeHashEncoder {
    /** @type string */
    skillTreeClass;
    skills;

    /**
     * @param {string} skillTreeClass
     */
    constructor(skillTreeClass) {
        this.skillTreeClass = skillTreeClass;
        this.skills = {};
    }

    /**
     * @param {string} skillName
     * @param {number} skillLevel
     */
    addSkill(skillName, skillLevel) {
        const id = Skills[skillName].id;
        if (skillLevel < 1) {
            delete this.skills[id];
            return;
        }

        this.skills[id] = skillLevel;
    }

    encode() {
        const writer = new BitWriter();
        writer.write(VERSION, 4);
        writer.write(SkillTreeClasses.getAll().indexOf(this.skillTreeClass), 4);

        for (const id in this.skills) {
            writer.write(id, 12);
            writer.write(this.skills[id], 5);
        }

        return btoa(writer.getData());
    }
}

export class SkillTreeHashDecoder {
    /** @type BaseSkillTreeHashVersionDecoder */
    versionDecoder;

    /**
     * @param {string} hash
     */
    constructor(hash) {
        const data = atob(hash);

        this.versionDecoder = (new SkillTreeHashVersionDecoderFactory()).create(data);
    }

    /**
     * @return {string}
     */
    getSkillTreeClass() {
        return this.versionDecoder.getSkillTreeClass();
    }

    /**
     * @param {string} skillName
     * @return {number}
     */
    getSkillLevel(skillName) {
        return this.versionDecoder.getSkillLevel(skillName);
    }
}

class BaseSkillTreeHashVersionDecoder {
    /** @type string */
    data;
    skills;

    constructor(data) {
        this.data = data;
        this.skills = {};

        const reader = new BitReader(data);
        reader.seek(8);
        let id = reader.read(12);
        while (id > 0) {
            this.skills[id] = reader.read(5);
            id = reader.read(12);
        }
    }

    /**
     * @return {string}
     * @abstract
     */
    getSkillTreeClass() {}

    /**
     * @param {string} skillName
     * @return {number}
     * @abstract
     */
    getSkillLevel(skillName) {}
}

class SkillTreeHashVersion1Decoder extends BaseSkillTreeHashVersionDecoder {
    /**
     * @inheritDoc
     */
    getSkillTreeClass() {
        const skillTreeClassIndex = this.data.charCodeAt(0) & 0xF;
        const skillTreeClasses = SkillTreeClasses.getAll();
        if (skillTreeClasses.length <= skillTreeClassIndex) {
            new Error(`Undefined skill tree class index ${skillTreeClassIndex}`);
        }

        return skillTreeClasses[skillTreeClassIndex];
    }

    /**
     * @inheritDoc
     */
    getSkillLevel(skillName) {
        const id = Skills[skillName].id;

        return this.skills[id] || 0;
    }
}

class SkillTreeHashVersionDecoderFactory {
    create(data) {
        const version = data.charCodeAt(0) >> 4;

        return new SkillTreeHashVersion1Decoder(data);
    }
}

const ARRAY_SIZE = 8;

class BitReader {
    /** @type Uint8Array */
    data;
    /** @type number */
    position;

    /**
     * @param {string} data
     */
    constructor(data) {
        this.data = new Uint8Array(data.length);
        for (let i = 0; i < data.length; i++) {
            this.data[i] = data.charCodeAt(i);
        }
        this.position = 0;
    }

    /**
     * @param {number} bitsCount
     * @return {number}
     */
    read(bitsCount) {
        const start = Math.trunc(this.position/ARRAY_SIZE);
        const end = Math.trunc((this.position + bitsCount - 1)/ARRAY_SIZE);
        const offset = this.position % ARRAY_SIZE;
        this.position += bitsCount;

        if (start === end) {
            return (this.data[start] >>> (ARRAY_SIZE - offset - bitsCount)) & (Math.pow(2, bitsCount) - 1);
        }

        const leftBitsCount = ARRAY_SIZE - offset;
        let rightBitsCount = bitsCount - leftBitsCount;

        let value = ((this.data[start] & (Math.pow(2,  leftBitsCount) - 1)) << rightBitsCount);
        let i = 1;
        while (rightBitsCount > ARRAY_SIZE) {
            rightBitsCount -= ARRAY_SIZE;
            value |= this.data[start + i++] << rightBitsCount;
        }

        return value | ((this.data[end] >>> (ARRAY_SIZE - rightBitsCount)) & (Math.pow(2, rightBitsCount) - 1));
    }

    /**
     * @param {number} position
     * @param {string} from
     * @return {number}
     */
    seek(position, from = 'current') {
        if (from === 'current') {
            return this.position += position;
        }

        if (from === 'start') {
            return this.position = position;
        }
    }
}

class BitWriter {
    /** @type string output */
    data;
    /** @type number */
    position;
    /** @type number buffer byte */
    buffer;

    constructor() {
        this.data = '';
        this.position = 0;
        this.buffer = 0;
    }

    /**
     * @param {number} value
     * @param {number} bitsCount
     */
    write(value, bitsCount) {
        const start = Math.trunc(this.position/8);
        const end = Math.trunc((this.position + bitsCount - 1)/8);
        const offset = this.position % 8;

        if (start === end) {
            this.buffer |= (value << (8 - offset - bitsCount));
            this._incPosition(bitsCount);

            return;
        }

        const leftBitsCount = 8 - offset;
        let rightBitsCount = bitsCount - leftBitsCount;
        this.buffer |= (value >>> rightBitsCount);
        this._writeBuffer();

        while (rightBitsCount > 8) {
            rightBitsCount -= 8;
            this.buffer = (value >>> rightBitsCount) & 0xFF;
            this._writeBuffer();
        }

        this.buffer = (value & (Math.pow(2, rightBitsCount) - 1)) << (8 - rightBitsCount);
        this._incPosition(bitsCount);
    }

    /**
     * @return {string}
     */
    getData() {
        if (this.position % 8 !== 0) {
            this._writeBuffer();
        }

        return this.data;
    }

    /**
     * @param {number} inc
     * @private
     */
    _incPosition(inc) {
        this.position += inc;

        if (this.position % 8 === 0) {
            this._writeBuffer();
        }
    }

    /**
     * @private
     */
    _writeBuffer() {
        this.data += String.fromCharCode(this.buffer);
        this.buffer = 0;
    }
}
