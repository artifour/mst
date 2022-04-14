import {SkillTreeClasses} from './skill-tree-schemas.js';
import {Skills} from './skills.js';

const VERSION = 1;

export class SkillTreeHashEncoder {
    /** @type string */
    skillTreeClass;
    /** @type {Object.<number, number>} */
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
        const id = Skills[skillName].getId();
        if (skillLevel < 1) {
            delete this.skills[id];
            return;
        }

        this.skills[id] = skillLevel;
    }

    /**
     * @return {string}
     */
    encode() {
        const writer = new BitWriter();
        writer.write(VERSION, 4);
        writer.write(SkillTreeClasses.getAll().indexOf(this.skillTreeClass), 4);

        for (const id in this.skills) {
            writer.write(id, 10);
            if (this.skills[id] === 10) {
                writer.write(1, 1);
            } else {
                writer.write(this.skills[id], 6);
            }
        }

        return btoa(writer.getData());
    }
}

export class SkillTreeHashDecoder {
    /** @type BaseSkillTreeVersionReader */
    skillTreeVersionReader;

    /**
     * @param {string} hash
     */
    constructor(hash) {
        const data = atob(hash);

        this.skillTreeVersionReader = (new SkillTreeHashVersionReaderFactory()).create(data);
    }

    /**
     * @return {string}
     */
    getSkillTreeClass() {
        return this.skillTreeVersionReader.getSkillTreeClass();
    }

    /**
     * @param {string} skillName
     * @return {number}
     */
    getSkillLevel(skillName) {
        return this.skillTreeVersionReader.getSkillLevel(skillName);
    }
}

class BaseSkillTreeVersionReader {
    /** @type string */
    skillTreeClass;
    /** @type {Object.<number, number>} */
    skills;

    /**
     * @param {BitReader} reader
     */
    constructor(reader) {
        this.skills = {};

        this._readData(reader);
    }

    /**
     * @return {string}
     */
    getSkillTreeClass() {
        return this.skillTreeClass;
    }

    /**
     * @param {string} skillName
     * @return {number}
     */
    getSkillLevel(skillName) {
        const id = Skills[skillName].getId();

        return this.skills[id] || 0;
    }

    /**
     * @param {BitReader} reader
     * @protected
     */
    _readData(reader) {
        this._readSkillTreeClass(reader);
        while (this._readNextSkill(reader)) {}
    }

    /**
     * @param {BitReader} reader
     * @protected
     * @abstract
     */
    _readSkillTreeClass(reader) {}

    /**
     * @param {BitReader} reader
     * @return {boolean}
     * @protected
     * @abstract
     */
    _readNextSkill(reader) {}
}

/**
 * 4 BYTES        Hash encoding version
 * 4 BYTES        Class index in SkillTreeClasses
 * SkillStruct[]  Array of learned skills
 * ZEROS
 *
 * SkillStruct:
 * 10 BITS        Skill Id
 * 1 BIT          1 - the skill level 10, else read level bites
 * 5 BITS         the skill level
 */
class SkillTreeVersion1Reader extends BaseSkillTreeVersionReader {
    /**
     * @inheritDoc
     */
    _readSkillTreeClass(reader) {
        const skillTreeClassIndex = reader.read(4);
        const skillTreeClasses = SkillTreeClasses.getAll();
        if (skillTreeClasses.length <= skillTreeClassIndex) {
            new Error(`Undefined skill tree class index ${skillTreeClassIndex}`);
        }

        this.skillTreeClass = skillTreeClasses[skillTreeClassIndex];
    }

    /**
     * @inheritDoc
     */
    _readNextSkill(reader) {
        const id = reader.read(10);
        if (id === 0) {
            return false;
        }

        this.skills[id] = reader.read(1) === 1 ? 10 : reader.read(5);
        return true;
    }
}

class SkillTreeHashVersionReaderFactory {
    /**
     * @param {string} data
     * @return {BaseSkillTreeVersionReader}
     */
    create(data) {
        const reader = new BitReader(data);
        const version = reader.read(4);

        return new SkillTreeVersion1Reader(reader);
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

        let value = (this.data[start] & (Math.pow(2,  leftBitsCount) - 1)) << rightBitsCount;
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
