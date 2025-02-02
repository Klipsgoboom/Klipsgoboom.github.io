
if (typeof gdjs.evtsExt__ParticleEmitter3D__DefineHelperClasses !== "undefined") {
  gdjs.evtsExt__ParticleEmitter3D__DefineHelperClasses.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__ParticleEmitter3D__DefineHelperClasses = {};


gdjs.evtsExt__ParticleEmitter3D__DefineHelperClasses.userFunc0xd51768 = function GDJSInlineCode(runtimeScene, eventsFunctionContext) {
"use strict";
gdjs.__particleEmmiter3DExtension = gdjs.__particleEmmiter3DExtension || {};

/**
 * @param {string} colorString
 * @param {THREE.Vector4} threeColor
 */
const setThreeColor = (colorString, threeColor = new THREE.Vector4()) => {
    const integerColor = gdjs.rgbOrHexToRGBColor(colorString);
    threeColor.x = integerColor[0] / 255;
    threeColor.y = integerColor[1] / 255;
    threeColor.z = integerColor[2] / 255;
};

/**
 * @param {string} integerOpacity
 * @param {THREE.Vector4} threeColor
 */
const setThreeOpacity = (integerOpacity, threeColor = new THREE.Vector4()) => {
    threeColor.w = integerOpacity / 255;
};

class ParticleEmitterAdapter {
    /**
     * @param particleSystem {ParticleSystem}
     * @param colorOverLife {ColorOverLife}
     * @param sizeOverLife {SizeOverLife}
     * @param applyForce {ApplyForce}
     */
    constructor(particleSystem, colorOverLife, sizeOverLife, applyForce) {
        this.particleSystem = particleSystem;
        this.colorOverLife = colorOverLife;
        this.sizeOverLife = sizeOverLife;
        this.applyForce = applyForce;
    }

    /**
     * @param startColor {string}
     */
    setStartColor(startColor) {
        setThreeColor(startColor, this.colorOverLife.color.a);
    }

    /**
     * @param endColor {string}
     */
    setEndColor(endColor) {
        setThreeColor(endColor, this.colorOverLife.color.b);
    }

    /**
     * @param startOpacity {number}
     */
    setStartOpacity(startOpacity) {
        setThreeOpacity(startOpacity, this.colorOverLife.color.a);
    }

    /**
     * @param endOpacity {number}
     */
    setEndOpacity(endOpacity) {
        setThreeOpacity(endOpacity, this.colorOverLife.color.b);
    }

    /**
     * @param flow {number}
     */
    setFlow(flow) {
        this.particleSystem.emissionOverTime.value = flow;
    }

    /**
     * @param startMinSize {number}
     */
    setStartMinSize(startMinSize) {
        this.particleSystem.startSize.a = startMinSize;
    }

    /**
     * @param startMaxSize {number}
     */
    setStartMaxSize(startMaxSize) {
        this.particleSystem.startSize.b = startMaxSize;
    }

    /**
     * @param endScale {number}
     */
    setEndScale(endScale) {
        /** @type Bezier */
        const bezier = this.sizeOverLife.size.functions[0][0];
        bezier.p[0] = 1;
        bezier.p[1] = gdjs.evtTools.common.lerp(1, endScale, 1 / 3);
        bezier.p[2] = gdjs.evtTools.common.lerp(1, endScale, 2 / 3);
        bezier.p[3] = endScale;
    }

    /**
     * @param startSpeedMin {number}
     */
    setStartSpeedMin(startSpeedMin) {
        this.particleSystem.startSpeed.a = startSpeedMin;
    }

    /**
     * @param startSpeedMax {number}
     */
    setStartSpeedMax(startSpeedMax) {
        this.particleSystem.startSpeed.b = startSpeedMax;
    }

    /**
     * @param lifespanMin {number}
     */
    setLifespanMin(lifespanMin) {
        this.particleSystem.startLife.a = lifespanMin;
    }

    /**
     * @param lifespanMax {number}
     */
    setLifespanMax(lifespanMax) {
        this.particleSystem.startLife.b = lifespanMax;
    }

    /**
     * @param duration {number}
     */
    setDuration(duration) {
        this.particleSystem.duration = duration || Number.POSITIVE_INFINITY;
    }

    /**
     * @param areParticlesRelative {boolean}
     */
    setParticlesRelative(areParticlesRelative) {
        this.particleSystem.worldSpace = !areParticlesRelative;
    }

    /**
     * @param sprayConeAngle {number}
     */
    setSprayConeAngle(sprayConeAngle) {
        if (0 < sprayConeAngle && sprayConeAngle <= 180) {
            if (!this.particleSystem.emitterShape.angle) {
                this.particleSystem.emitterShape = new ConeEmitter({ radius: 0.1, angle: Math.PI / 8 });
            }
            this.particleSystem.emitterShape.angle = sprayConeAngle * Math.PI / 180;
        }
        else {
            if (this.particleSystem.emitterShape.angle) {
                this.particleSystem.emitterShape = new PointEmitter();
            }
        }
    }

    /**
     * @param blending {string}
     */
    setBlending(blendingString) {
        const blending =
            blendingString === "Additive" ? THREE.AdditiveBlending :
            blendingString === "Normal" ? THREE.NormalBlending :
            blendingString === "Subtractive" ? THREE.SubtractiveBlending :
            blendingString === "Multiply" ? THREE.MultiplyBlending :
            blendingString === "None" ? THREE.NoBlending :
            THREE.AdditiveBlending;
        // TODO This doesn't work.
        this.particleSystem.blending = blending;
    }
    
    /**
     * @param gravity {number}
     */
    setGravity(gravity) {
        this.applyForce.magnitude.value = gravity;
    }
    
    /**
     * @param gravityTop {string}
     */
    setGravityTop(gravityTop) {
        // TODO Make gravity absolute even when "relative" is enabled. 
        switch (gravityTop) {
            case "Z+":
                this.applyForce.direction.set(0, 0, -1);
                break;

            case "Y-":
                this.applyForce.direction.set(0, 1, 0);
                break;
        }
    }
}

gdjs.__particleEmmiter3DExtension.ParticleEmitterAdapter = ParticleEmitterAdapter;

/**
 * three.quarks v0.10.3 build Fri Jul 28 2023
 * https://github.com/Alchemist0823/three.quarks#readme
 * Copyright 2023 Alchemist0823 <the.forrest.sun@gmail.com>, MIT
 */
class ParticleEmitter extends THREE.Object3D {
    //interleavedBuffer: InterleavedBuffer;
    constructor(system) {
        super();
        this.type = "ParticleEmitter";
        this.system = system;
        // this.visible = false;
        // TODO: implement boundingVolume
    }
    clone() {
        const system = this.system.clone();
        system.emitter.copy(this, true);
        return system.emitter;
    }
    dispose() {
    }
    // extract data from the cache hash
    // remove metadata on each item
    // and return as array
    extractFromCache(cache) {
        const values = [];
        for (const key in cache) {
            const data = cache[key];
            delete data.metadata;
            values.push(data);
        }
        return values;
    }
    toJSON(meta, options = {}) {
        // meta is a string when called from JSON.stringify
        const isRootObject = (meta === undefined || typeof meta === 'string');
        const output = {};
        // meta is a hash used to collect geometries, materials.
        // not providing it implies that this is the root object
        // being serialized.
        if (isRootObject) {
            // initialize meta obj
            meta = {
                geometries: {},
                materials: {},
                textures: {},
                images: {},
                shapes: {},
                skeletons: {},
                animations: {},
                nodes: {}
            };
            output.metadata = {
                version: 4.5,
                type: 'Object',
                generator: 'Object3D.toJSON'
            };
        }
        // standard Object3D serialization
        const object = {};
        object.uuid = this.uuid;
        object.type = this.type;
        if (this.name !== '')
            object.name = this.name;
        if (this.castShadow === true)
            object.castShadow = true;
        if (this.receiveShadow === true)
            object.receiveShadow = true;
        if (this.visible === false)
            object.visible = false;
        if (this.frustumCulled === false)
            object.frustumCulled = false;
        if (this.renderOrder !== 0)
            object.renderOrder = this.renderOrder;
        if (JSON.stringify(this.userData) !== '{}')
            object.userData = this.userData;
        object.layers = this.layers.mask;
        object.matrix = this.matrix.toArray();
        if (this.matrixAutoUpdate === false)
            object.matrixAutoUpdate = false;
        // object specific properties
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (this.system !== null)
            object.ps = this.system.toJSON(meta, options);
        if (this.children.length > 0) {
            object.children = [];
            for (let i = 0; i < this.children.length; i++) {
                if (this.children[i].type !== "ParticleSystemPreview") {
                    object.children.push(this.children[i].toJSON(meta).object);
                }
            }
        }
        if (isRootObject) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const geometries = this.extractFromCache(meta.geometries);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const materials = this.extractFromCache(meta.materials);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const textures = this.extractFromCache(meta.textures);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const images = this.extractFromCache(meta.images);
            if (geometries.length > 0)
                output.geometries = geometries;
            if (materials.length > 0)
                output.materials = materials;
            if (textures.length > 0)
                output.textures = textures;
            if (images.length > 0)
                output.images = images;
        }
        output.object = object;
        return output;
    }
}

class LinkedListNode {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
    hasPrev() {
        return this.prev !== null;
    }
    hasNext() {
        return this.next !== null;
    }
}
class LinkedList {
    constructor() {
        this.length = 0;
        this.head = this.tail = null;
    }
    isEmpty() {
        return this.head === null;
    }
    clear() {
        this.length = 0;
        this.head = this.tail = null;
    }
    front() {
        if (this.head === null)
            return null;
        return this.head.data;
    }
    back() {
        if (this.tail === null)
            return null;
        return this.tail.data;
    }
    /**
     * remove at head in O(1)
     */
    dequeue() {
        if (this.head) {
            const value = this.head.data;
            this.head = this.head.next;
            if (!this.head) {
                this.tail = null;
            }
            else {
                this.head.prev = null;
            }
            this.length--;
            return value;
        }
        return undefined;
    }
    /**
     * remove at tail in O(1)
     */
    pop() {
        if (this.tail) {
            const value = this.tail.data;
            this.tail = this.tail.prev;
            if (!this.tail) {
                this.head = null;
            }
            else {
                this.tail.next = null;
            }
            this.length--;
            return value;
        }
        return undefined;
    }
    /**
     * add at head in O(1)
     */
    queue(data) {
        const node = new LinkedListNode(data);
        if (!this.tail) {
            this.tail = node;
        }
        if (this.head) {
            this.head.prev = node;
            node.next = this.head;
        }
        this.head = node;
        this.length++;
    }
    /**
     * add at tail in O(1)
     */
    push(data) {
        const node = new LinkedListNode(data);
        if (!this.head) {
            this.head = node;
        }
        if (this.tail) {
            this.tail.next = node;
            node.prev = this.tail;
        }
        this.tail = node;
        this.length++;
    }
    insertBefore(node, data) {
        const newNode = new LinkedListNode(data);
        newNode.next = node;
        newNode.prev = node.prev;
        if (newNode.prev !== null) {
            newNode.prev.next = newNode;
        }
        newNode.next.prev = newNode;
        if (node == this.head) {
            this.head = newNode;
        }
        this.length++;
    }
    remove(data) {
        if (this.head === null || this.tail === null) {
            return;
        }
        let tempNode = this.head;
        if (data === this.head.data) {
            this.head = this.head.next;
        }
        if (data === this.tail.data) {
            this.tail = this.tail.prev;
        }
        while (tempNode.next !== null && tempNode.data !== data) {
            tempNode = tempNode.next;
        }
        if (tempNode.data === data) {
            if (tempNode.prev !== null)
                tempNode.prev.next = tempNode.next;
            if (tempNode.next !== null)
                tempNode.next.prev = tempNode.prev;
            this.length--;
        }
    }
    /**
     * Returns an iterator over the values
     */
    *values() {
        let current = this.head;
        while (current !== null) {
            yield current.data;
            current = current.next;
        }
    }
}

class SpriteParticle {
    constructor() {
        // CPU
        this.startSpeed = 0;
        this.startColor = new THREE.Vector4();
        this.startSize = 1;
        this.position = new THREE.Vector3();
        this.velocity = new THREE.Vector3();
        this.age = 0;
        this.life = 1;
        this.size = 1;
        // GPU
        this.rotation = 0;
        this.color = new THREE.Vector4();
        this.uvTile = 0;
    }
    get died() {
        return this.age >= this.life;
    }
}
class RecordState {
    constructor(position, size, color) {
        this.position = position;
        this.size = size;
        this.color = color;
    }
}
class TrailParticle {
    constructor() {
        this.startSpeed = 0;
        this.startColor = new THREE.Vector4();
        this.startSize = 1;
        this.position = new THREE.Vector3();
        this.velocity = new THREE.Vector3();
        this.age = 0;
        this.life = 1;
        this.size = 1;
        this.length = 100;
        // GPU
        this.color = new THREE.Vector4();
        // use link list instead
        this.previous = new LinkedList();
        this.uvTile = 0;
    }
    update() {
        if (this.age <= this.life) {
            this.previous.push(new RecordState(this.position.clone(), this.size, this.color.clone()));
        }
        else {
            if (this.previous.length > 0) {
                this.previous.dequeue();
            }
        }
        while (this.previous.length > this.length) {
            this.previous.dequeue();
        }
    }
    get died() {
        return this.age >= this.life;
    }
    reset() {
        this.previous.clear();
    }
}

class ConstantValue {
    constructor(value) {
        this.value = value;
        this.type = 'value';
    }
    genValue() {
        return this.value;
    }
    toJSON() {
        return {
            type: "ConstantValue",
            value: this.value
        };
    }
    static fromJSON(json) {
        return new ConstantValue(json.value);
    }
    clone() {
        return new ConstantValue(this.value);
    }
}

class IntervalValue {
    constructor(a, b) {
        this.a = a;
        this.b = b;
        this.type = "value";
    }
    genValue() {
        return THREE.MathUtils.lerp(this.a, this.b, Math.random());
    }
    toJSON() {
        return {
            type: "IntervalValue",
            a: this.a,
            b: this.b,
        };
    }
    static fromJSON(json) {
        return new IntervalValue(json.a, json.b);
    }
    clone() {
        return new IntervalValue(this.a, this.b);
    }
}

class PiecewiseFunction {
    constructor() {
        this.functions = new Array();
    }
    findFunction(t) {
        let mid = 0;
        let left = 0, right = this.functions.length - 1;
        while (left + 1 < right) {
            mid = Math.floor((left + right) / 2);
            if (t < this.getStartX(mid))
                right = mid - 1;
            else if (t > this.getEndX(mid))
                left = mid + 1;
            else
                return mid;
        }
        for (let i = left; i <= right; i++) {
            if (t >= this.functions[i][1] && t <= this.getEndX(i))
                return i;
        }
        return -1;
    }
    getStartX(index) {
        return this.functions[index][1];
    }
    setStartX(index, x) {
        if (index > 0)
            this.functions[index][1] = x;
    }
    getEndX(index) {
        if (index + 1 < this.functions.length)
            return this.functions[index + 1][1];
        return 1;
    }
    setEndX(index, x) {
        if (index + 1 < this.functions.length)
            this.functions[index + 1][1] = x;
    }
    insertFunction(t, func) {
        const index = this.findFunction(t);
        this.functions.splice(index + 1, 0, [func, t]);
    }
    removeFunction(index) {
        return this.functions.splice(index, 1)[0][0];
    }
    getFunction(index) {
        return this.functions[index][0];
    }
    setFunction(index, func) {
        this.functions[index][0] = func;
    }
    get numOfFunctions() {
        return this.functions.length;
    }
}

class Bezier {
    constructor(p1, p2, p3, p4) {
        this.p = [p1, p2, p3, p4];
    }
    genValue(t) {
        const t2 = t * t;
        const t3 = t * t * t;
        const mt = 1 - t;
        const mt2 = mt * mt;
        const mt3 = mt2 * mt;
        return this.p[0] * mt3 + this.p[1] * mt2 * t * 3 + this.p[2] * mt * t2 * 3 + this.p[3] * t3;
    }
    // get the coefficients of the polynomial's derivatives
    derivativeCoefficients(points) {
        const dpoints = [];
        for (let p = points, c = p.length - 1; c > 0; c--) {
            const list = [];
            for (let j = 0; j < c; j++) {
                const dpt = c * (p[j + 1] - p[j]);
                list.push(dpt);
            }
            dpoints.push(list);
            p = list;
        }
        return dpoints;
    }
    // calculate the slope
    getSlope(t) {
        const p = this.derivativeCoefficients(this.p)[0];
        const mt = 1 - t;
        const a = mt * mt;
        const b = mt * t * 2;
        const c = t * t;
        return a * p[0] + b * p[1] + c * p[2];
        //return  a * (p[1] - p[0]) * 3 + b * (p[2] - p[1]) * 3 + c * (p[3] - p[2]) * 3;
    }
    // derivative(0) = (p[1] - p[0]) * 3
    // derivative(1) = (p[3] - p[2]) * 3
    controlCurve(d0, d1) {
        this.p[1] = d0 / 3 + this.p[0];
        this.p[2] = this.p[3] - d1 / 3;
    }
    hull(t) {
        let p = this.p;
        let _p = [], pt, idx = 0, i = 0, l = 0;
        const q = [];
        q[idx++] = p[0];
        q[idx++] = p[1];
        q[idx++] = p[2];
        q[idx++] = p[3];
        // we lerp between all points at each iteration, until we have 1 point left.
        while (p.length > 1) {
            _p = [];
            for (i = 0, l = p.length - 1; i < l; i++) {
                pt = t * p[i] + (1 - t) * p[i + 1];
                q[idx++] = pt;
                _p.push(pt);
            }
            p = _p;
        }
        return q;
    }
    split(t) {
        // no shortcut: use "de Casteljau" iteration.
        const q = this.hull(t);
        const result = {
            left: new Bezier(q[0], q[4], q[7], q[9]),
            right: new Bezier(q[9], q[8], q[6], q[3]),
            span: q
        };
        return result;
    }
    clone() {
        return new Bezier(this.p[0], this.p[1], this.p[2], this.p[3]);
    }
    toJSON() {
        return {
            p0: this.p[0],
            p1: this.p[1],
            p2: this.p[2],
            p3: this.p[3],
        };
    }
    static fromJSON(json) {
        return new Bezier(json.p0, json.p1, json.p2, json.p3);
    }
}

class PiecewiseBezier extends PiecewiseFunction {
    // default linear bezier
    constructor(curves = [[new Bezier(0, 1.0 / 3, 1.0 / 3 * 2, 1), 0]]) {
        super();
        this.type = "function";
        this.functions = curves;
    }
    genValue(t = 0) {
        const index = this.findFunction(t);
        if (index === -1) {
            return 0;
        }
        return this.functions[index][0].genValue((t - this.getStartX(index)) / (this.getEndX(index) - this.getStartX(index)));
    }
    toSVG(length, segments) {
        if (segments < 1)
            return "";
        let result = ["M", 0, this.functions[0][0].p[0]].join(" ");
        for (let i = 1.0 / segments; i <= 1; i += 1.0 / segments) {
            result = [result, "L", i * length, this.genValue(i)].join(" ");
        }
        return result;
    }
    toJSON() {
        return {
            type: "PiecewiseBezier",
            functions: this.functions.map(([bezier, start]) => ({ function: bezier.toJSON(), start: start })),
        };
    }
    static fromJSON(json) {
        return new PiecewiseBezier(json.functions.map((piecewiseFunction) => ([Bezier.fromJSON(piecewiseFunction.function), piecewiseFunction.start])));
    }
    clone() {
        return new PiecewiseBezier(this.functions.map(([bezier, start]) => ([bezier.clone(), start])));
    }
}

function ValueGeneratorFromJSON(json) {
    switch (json.type) {
        case 'ConstantValue':
            return ConstantValue.fromJSON(json);
        case 'IntervalValue':
            return IntervalValue.fromJSON(json);
        case 'PiecewiseBezier':
            return PiecewiseBezier.fromJSON(json);
        default:
            return new ConstantValue(0);
    }
}

const ColorToJSON = (color) => {
    return { r: color.x, g: color.y, b: color.z, a: color.w };
};
const JSONToColor = (json) => {
    return new THREE.Vector4(json.r, json.g, json.b, json.a);
};

class RandomColor {
    constructor(a, b) {
        this.a = a;
        this.b = b;
        this.type = "value";
    }
    genColor(color) {
        const rand = Math.random();
        return color.copy(this.a).lerp(this.b, rand);
    }
    toJSON() {
        return {
            type: "RandomColor",
            a: ColorToJSON(this.a),
            b: ColorToJSON(this.b),
        };
    }
    static fromJSON(json) {
        return new RandomColor(JSONToColor(json.a), JSONToColor(json.b));
    }
    clone() {
        return new RandomColor(this.a.clone(), this.b.clone());
    }
}

class ColorRange {
    constructor(a, b) {
        this.a = a;
        this.b = b;
        this.type = "function";
    }
    genColor(color, t) {
        return color.copy(this.a).lerp(this.b, t);
    }
    toJSON() {
        return {
            type: "ColorRange",
            a: ColorToJSON(this.a),
            b: ColorToJSON(this.b),
        };
    }
    static fromJSON(json) {
        return new ColorRange(JSONToColor(json.a), JSONToColor(json.b));
    }
    clone() {
        return new ColorRange(this.a.clone(), this.b.clone());
    }
}

class Gradient extends PiecewiseFunction {
    // default linear bezier
    constructor(functions = [[new ColorRange(new THREE.Vector4(0, 0, 0, 1), new THREE.Vector4(1, 1, 1, 1)), 0]]) {
        super();
        this.type = "function";
        this.functions = functions;
    }
    genColor(color, t) {
        const index = this.findFunction(t);
        if (index === -1) {
            return color.copy(this.functions[0][0].a);
        }
        return this.getFunction(index).genColor(color, (t - this.getStartX(index)) / (this.getEndX(index) - this.getStartX(index)));
    }
    toJSON() {
        return {
            type: "Gradient",
            functions: this.functions.map(([range, start]) => ({ function: range.toJSON(), start: start })),
        };
    }
    static fromJSON(json) {
        return new Gradient(json.functions.map((piecewiseFunction) => ([ColorRange.fromJSON(piecewiseFunction.function), piecewiseFunction.start])));
    }
    clone() {
        return new Gradient(this.functions.map(([range, start]) => ([range.clone(), start])));
    }
}

const tempColor = new THREE.Vector4();
// generate a random color from the start two gradients
class RandomColorBetweenGradient {
    constructor(gradient1, gradient2) {
        this.type = 'memorizedFunction';
        this.gradient1 = gradient1;
        this.gradient2 = gradient2;
    }
    startGen(memory) {
        memory.rand = Math.random();
    }
    genColor(color, t, memory) {
        this.gradient1.genColor(color, t);
        this.gradient2.genColor(tempColor, t);
        color.lerp(tempColor, memory.rand);
        return color;
    }
    toJSON() {
        return {
            type: 'RandomColorBetweenGradient',
            gradient1: this.gradient1.toJSON(),
            gradient2: this.gradient2.toJSON(),
        };
    }
    static fromJSON(json) {
        return new RandomColorBetweenGradient(Gradient.fromJSON(json.gradient1), Gradient.fromJSON(json.gradient2));
    }
    clone() {
        return new RandomColorBetweenGradient(this.gradient1.clone(), this.gradient2.clone());
    }
}

class ConstantColor {
    constructor(color) {
        this.color = color;
        this.type = 'value';
    }
    genColor(color) {
        return color.copy(this.color);
    }
    toJSON() {
        return {
            type: 'ConstantColor',
            color: ColorToJSON(this.color),
        };
    }
    static fromJSON(json) {
        return new ConstantColor(JSONToColor(json.color));
    }
    clone() {
        return new ConstantColor(this.color.clone());
    }
}
function ColorGeneratorFromJSON(json) {
    switch (json.type) {
        case 'ConstantColor':
            return ConstantColor.fromJSON(json);
        case 'ColorRange':
            return ColorRange.fromJSON(json);
        case 'RandomColor':
            return RandomColor.fromJSON(json);
        case 'Gradient':
            return Gradient.fromJSON(json);
        case 'RandomColorBetweenGradient':
            return RandomColorBetweenGradient.fromJSON(json);
        default:
            return new ConstantColor(new THREE.Vector4(1, 1, 1, 1));
    }
}

class RandomQuatGenerator {
    constructor() {
        this.type = "rotation";
    }
    genValue(quat, t) {
        let x, y, z, u, v, w;
        do {
            x = Math.random() * 2 - 1;
            y = Math.random() * 2 - 1;
            z = x * x + y * y;
        } while (z > 1);
        do {
            u = Math.random() * 2 - 1;
            v = Math.random() * 2 - 1;
            w = u * u + v * v;
        } while (w > 1);
        const s = Math.sqrt((1 - z) / w);
        quat.set(x, y, s * u, s * v);
        return quat;
    }
    toJSON() {
        return {
            type: "RandomQuat"
        };
    }
    static fromJSON(json) {
        return new RandomQuatGenerator();
    }
    clone() {
        return new RandomQuatGenerator();
    }
}

class AxisAngleGenerator {
    constructor(axis, angle) {
        this.axis = axis;
        this.angle = angle;
        this.type = "rotation";
    }
    genValue(quat, t) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return quat.setFromAxisAngle(this.axis, this.angle.genValue(t));
    }
    toJSON() {
        return {
            type: "AxisAngle",
            axis: { x: this.axis.x, y: this.axis.y, z: this.axis.z },
            angle: this.angle.toJSON(),
        };
    }
    static fromJSON(json) {
        return new AxisAngleGenerator(json.axis, ValueGeneratorFromJSON(json.angle));
    }
    clone() {
        return new AxisAngleGenerator(this.axis.clone(), this.angle.clone());
    }
}

class EulerGenerator {
    constructor(angleX, angleY, angleZ) {
        this.angleX = angleX;
        this.angleY = angleY;
        this.angleZ = angleZ;
        this.type = "rotation";
    }
    genValue(quat, t) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return quat.setFromEuler(new THREE.Euler(this.angleX.genValue(t), this.angleY.genValue(t), this.angleZ.genValue(t)));
    }
    toJSON() {
        return {
            type: "Euler",
            angleX: this.angleX.toJSON(),
            angleY: this.angleY.toJSON(),
            angleZ: this.angleZ.toJSON(),
        };
    }
    static fromJSON(json) {
        return new EulerGenerator(ValueGeneratorFromJSON(json.angleX), ValueGeneratorFromJSON(json.angleY), ValueGeneratorFromJSON(json.angleZ));
    }
    clone() {
        return new EulerGenerator(this.angleX, this.angleY, this.angleZ);
    }
}

function RotationGeneratorFromJSON(json) {
    switch (json.type) {
        case 'AxisAngle':
            return AxisAngleGenerator.fromJSON(json);
        case 'Euler':
            return EulerGenerator.fromJSON(json);
        case 'RandomQuat':
            return RandomQuatGenerator.fromJSON(json);
        default:
            return new RandomQuatGenerator();
    }
}

function GeneratorFromJSON(json) {
    switch (json.type) {
        case 'ConstantValue':
        case 'IntervalValue':
        case 'PiecewiseBezier':
            return ValueGeneratorFromJSON(json);
        case 'AxisAngle':
        case 'RandomQuat':
        case 'Euler':
            return RotationGeneratorFromJSON(json);
        default:
            return new ConstantValue(0);
    }
}

class ColorOverLife {
    constructor(color) {
        this.color = color;
        this.type = 'ColorOverLife';
    }
    initialize(particle) {
        if (this.color.type === 'memorizedFunction') {
            particle.colorOverLifeMemory = {};
            this.color.startGen(particle.colorOverLifeMemory);
        }
    }
    update(particle, delta) {
        if (this.color.type === 'memorizedFunction') {
            this.color.genColor(particle.color, particle.age / particle.life, particle.colorOverLifeMemory);
        }
        else {
            this.color.genColor(particle.color, particle.age / particle.life);
        }
        particle.color.x *= particle.startColor.x;
        particle.color.y *= particle.startColor.y;
        particle.color.z *= particle.startColor.z;
        particle.color.w *= particle.startColor.w;
    }
    frameUpdate(delta) { }
    toJSON() {
        return {
            type: this.type,
            color: this.color.toJSON(),
        };
    }
    static fromJSON(json) {
        return new ColorOverLife(ColorGeneratorFromJSON(json.color));
    }
    clone() {
        return new ColorOverLife(this.color.clone());
    }
    reset() { }
}

class RotationOverLife {
    constructor(angularVelocity, dynamic) {
        this.angularVelocity = angularVelocity;
        this.dynamic = dynamic;
        this.type = 'RotationOverLife';
        this.tempQuat = new THREE.Quaternion();
    }
    initialize(particle) {
        if (!this.dynamic && particle instanceof SpriteParticle) {
            particle.angularVelocity = this.angularVelocity.genValue();
        }
    }
    update(particle, delta) {
        if (!this.dynamic) {
            if (particle instanceof SpriteParticle) {
                particle.rotation += delta * particle.angularVelocity;
            }
        }
        else {
            particle.rotation += delta * this.angularVelocity.genValue(particle.age / particle.life);
        }
    }
    toJSON() {
        return {
            type: this.type,
            angularVelocity: this.angularVelocity.toJSON(),
            dynamic: this.dynamic,
        };
    }
    static fromJSON(json) {
        return new RotationOverLife(ValueGeneratorFromJSON(json.angularVelocity), json.dynamic);
    }
    frameUpdate(delta) {
    }
    clone() {
        return new RotationOverLife(this.angularVelocity.clone(), this.dynamic);
    }
    reset() {
    }
}

class SizeOverLife {
    initialize(particle) {
    }
    constructor(size) {
        this.size = size;
        this.type = 'SizeOverLife';
    }
    update(particle) {
        particle.size = particle.startSize * this.size.genValue(particle.age / particle.life);
    }
    toJSON() {
        return {
            type: this.type,
            size: this.size.toJSON(),
        };
    }
    static fromJSON(json) {
        return new SizeOverLife(ValueGeneratorFromJSON(json.size));
    }
    frameUpdate(delta) {
    }
    clone() {
        return new SizeOverLife(this.size.clone());
    }
    reset() {
    }
}

class SpeedOverLife {
    initialize(particle) {
    }
    constructor(speed) {
        this.speed = speed;
        this.type = 'SpeedOverLife';
    }
    update(particle) {
        particle.velocity.normalize().multiplyScalar(particle.startSpeed * this.speed.genValue(particle.age / particle.life));
    }
    toJSON() {
        return {
            type: this.type,
            speed: this.speed.toJSON(),
        };
    }
    static fromJSON(json) {
        return new SpeedOverLife(ValueGeneratorFromJSON(json.speed));
    }
    frameUpdate(delta) {
    }
    clone() {
        return new SpeedOverLife(this.speed.clone());
    }
    reset() {
    }
}

class FrameOverLife {
    constructor(frame) {
        this.frame = frame;
        this.type = 'FrameOverLife';
    }
    initialize(particle) {
    }
    update(particle, delta) {
        particle.uvTile = Math.floor(this.frame.genValue(particle.age / particle.life));
    }
    frameUpdate(delta) {
    }
    toJSON() {
        return {
            type: this.type,
            frame: this.frame.toJSON(),
        };
    }
    static fromJSON(json) {
        return new FrameOverLife(ValueGeneratorFromJSON(json.frame));
    }
    clone() {
        return new FrameOverLife(this.frame.clone());
    }
    reset() {
    }
}

new THREE.Vector3(0, 0, 1);
class OrbitOverLife {
    constructor(orbitSpeed, axis = new THREE.Vector3(0, 1, 0)) {
        this.orbitSpeed = orbitSpeed;
        this.axis = axis;
        this.type = 'OrbitOverLife';
        this.temp = new THREE.Vector3();
        this.rotation = new THREE.Quaternion();
        this.line = new THREE.Line3();
    }
    initialize(particle) {
    }
    update(particle, delta) {
        this.line.set(new THREE.Vector3(0, 0, 0), this.axis);
        this.line.closestPointToPoint(particle.position, false, this.temp);
        this.rotation.setFromAxisAngle(this.axis, this.orbitSpeed.genValue(particle.age / particle.life) * delta);
        particle.position.sub(this.temp);
        particle.position.applyQuaternion(this.rotation);
        particle.position.add(this.temp);
    }
    frameUpdate(delta) {
    }
    toJSON() {
        return {
            type: this.type,
            orbitSpeed: this.orbitSpeed.toJSON(),
            axis: [this.axis.x, this.axis.y, this.axis.z],
        };
    }
    static fromJSON(json) {
        return new OrbitOverLife(ValueGeneratorFromJSON(json.orbitSpeed), json.axis ? new THREE.Vector3(json.axis[0], json.axis[1], json.axis[2]) : undefined);
    }
    clone() {
        return new OrbitOverLife(this.orbitSpeed.clone());
    }
    reset() {
    }
}

class ApplyForce {
    constructor(direction, magnitude) {
        this.direction = direction;
        this.magnitude = magnitude;
        this.type = 'ApplyForce';
        this.magnitudeValue = this.magnitude.genValue();
    }
    initialize(particle) {
    }
    update(particle, delta) {
        particle.velocity.addScaledVector(this.direction, this.magnitudeValue * delta);
    }
    frameUpdate(delta) {
        this.magnitudeValue = this.magnitude.genValue();
    }
    toJSON() {
        return {
            type: this.type,
            direction: [this.direction.x, this.direction.y, this.direction.z],
            magnitude: this.magnitude.toJSON(),
        };
    }
    static fromJSON(json) {
        var _a;
        return new ApplyForce(new THREE.Vector3(json.direction[0], json.direction[1], json.direction[2]), ValueGeneratorFromJSON((_a = json.magnitude) !== null && _a !== void 0 ? _a : json.force));
    }
    clone() {
        return new ApplyForce(this.direction.clone(), this.magnitude.clone());
    }
    reset() {
    }
}

class GravityForce {
    constructor(center, magnitude) {
        this.center = center;
        this.magnitude = magnitude;
        this.type = 'GravityForce';
        this.temp = new THREE.Vector3();
    }
    initialize(particle) {
    }
    update(particle, delta) {
        this.temp.copy(this.center).sub(particle.position).normalize();
        particle.velocity.addScaledVector(this.temp, this.magnitude / particle.position.distanceToSquared(this.center) * delta);
    }
    frameUpdate(delta) {
    }
    toJSON() {
        return {
            type: this.type,
            center: [this.center.x, this.center.y, this.center.z],
            magnitude: this.magnitude,
        };
    }
    static fromJSON(json) {
        return new GravityForce(new THREE.Vector3(json.center[0], json.center[1], json.center[2]), json.magnitude);
    }
    clone() {
        return new GravityForce(this.center.clone(), this.magnitude);
    }
    reset() {
    }
}

class WidthOverLength {
    initialize(particle) {
    }
    constructor(width) {
        this.width = width;
        this.type = 'WidthOverLength';
    }
    update(particle) {
        if (particle instanceof TrailParticle) {
            const iter = particle.previous.values();
            for (let i = 0; i < particle.previous.length; i++) {
                const cur = iter.next();
                cur.value.size = this.width.genValue((particle.previous.length - i) / particle.length);
            }
        }
    }
    frameUpdate(delta) {
    }
    toJSON() {
        return {
            type: this.type,
            width: this.width.toJSON(),
        };
    }
    static fromJSON(json) {
        return new WidthOverLength(ValueGeneratorFromJSON(json.width));
    }
    clone() {
        return new WidthOverLength(this.width.clone());
    }
    reset() {
    }
}

new THREE.Vector3(0, 0, 1);
class ChangeEmitDirection {
    constructor(angle) {
        this.angle = angle;
        this.type = 'ChangeEmitDirection';
        this._temp = new THREE.Vector3();
        this._q = new THREE.Quaternion();
    }
    initialize(particle) {
        const len = particle.velocity.length();
        if (len == 0)
            return;
        particle.velocity.normalize();
        if (particle.velocity.x === 0 && particle.velocity.y === 0) {
            this._temp.set(0, particle.velocity.z, 0);
        }
        else {
            this._temp.set(-particle.velocity.y, particle.velocity.x, 0);
        }
        this._q.setFromAxisAngle(this._temp.normalize(), this.angle.genValue());
        this._temp.copy(particle.velocity);
        particle.velocity.applyQuaternion(this._q);
        this._q.setFromAxisAngle(this._temp, Math.random() * Math.PI * 2);
        particle.velocity.applyQuaternion(this._q);
        particle.velocity.setLength(len);
    }
    update(particle, delta) {
    }
    frameUpdate(delta) {
    }
    toJSON() {
        return {
            type: this.type,
            angle: this.angle.toJSON(),
        };
    }
    static fromJSON(json) {
        return new ChangeEmitDirection(ValueGeneratorFromJSON(json.angle));
    }
    clone() {
        return new ChangeEmitDirection(this.angle);
    }
    reset() {
    }
}

const VECTOR_ONE = new THREE.Vector3(1, 1, 1);
const VECTOR_Z = new THREE.Vector3(0, 0, 1);
class EmitSubParticleSystem {
    constructor(particleSystem, useVelocityAsBasis, subParticleSystem) {
        this.particleSystem = particleSystem;
        this.useVelocityAsBasis = useVelocityAsBasis;
        this.subParticleSystem = subParticleSystem;
        this.type = "EmitSubParticleSystem";
        //private matrix_ = new Matrix4();
        this.q_ = new THREE.Quaternion();
        this.v_ = new THREE.Vector3();
        this.v2_ = new THREE.Vector3();
        if (this.subParticleSystem && this.subParticleSystem.system) {
            this.subParticleSystem.system.onlyUsedByOther = true;
        }
    }
    initialize(particle) {
        particle.emissionState = {
            burstIndex: 0,
            burstWaveIndex: 0,
            time: 0,
            waitEmiting: 0,
            matrix: new THREE.Matrix4(),
        };
    }
    update(particle, delta) {
        if (!this.subParticleSystem || !particle.emissionState)
            return;
        const m = particle.emissionState.matrix;
        let rotation;
        if (particle.rotation === undefined || this.useVelocityAsBasis) {
            if (particle.velocity.x === 0 && particle.velocity.y === 0 && (particle.velocity.z === 1 || particle.velocity.z === 0)) {
                m.set(1, 0, 0, particle.position.x, 0, 1, 0, particle.position.y, 0, 0, 1, particle.position.z, 0, 0, 0, 1);
            }
            else {
                this.v_.copy(VECTOR_Z).cross(particle.velocity);
                this.v2_.copy(particle.velocity).cross(this.v_);
                const len = this.v_.length();
                const len2 = this.v2_.length();
                m.set(this.v_.x / len, this.v2_.x / len2, particle.velocity.x, particle.position.x, this.v_.y / len, this.v2_.y / len2, particle.velocity.y, particle.position.y, this.v_.z / len, this.v2_.z / len2, particle.velocity.z, particle.position.z, 0, 0, 0, 1);
            }
        }
        else {
            if (particle.rotation instanceof THREE.Quaternion) {
                rotation = particle.rotation;
            }
            else {
                this.q_.setFromAxisAngle(VECTOR_Z, particle.rotation);
                rotation = this.q_;
            }
            m.compose(particle.position, rotation, VECTOR_ONE);
        }
        if (!this.particleSystem.worldSpace) {
            m.multiplyMatrices(this.particleSystem.emitter.matrixWorld, m);
        }
        this.subParticleSystem.system.emit(delta, particle.emissionState, m);
    }
    frameUpdate(delta) {
    }
    toJSON() {
        return {
            type: this.type,
            subParticleSystem: this.subParticleSystem ? this.subParticleSystem.uuid : "",
            useVelocityAsBasis: this.useVelocityAsBasis
        };
    }
    static fromJSON(json, particleSystem) {
        return new EmitSubParticleSystem(particleSystem, json.useVelocityAsBasis, json.subParticleSystem);
    }
    clone() {
        return new EmitSubParticleSystem(this.particleSystem, this.useVelocityAsBasis, this.subParticleSystem);
    }
    reset() {
    }
}

/*
    * A fast javascript implementation of simplex noise by Jonas Wagner
Based on a speed-improved simplex noise algorithm for 2D, 3D and 4D in Java.
Which is based on example code by Stefan Gustavson (stegu@itn.liu.se).
With Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
Better rank ordering method by Stefan Gustavson in 2012.
    Copyright (c) 2021 Jonas Wagner
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    */
const F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
const G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
const F3 = 1.0 / 3.0;
const G3 = 1.0 / 6.0;
const F4 = (Math.sqrt(5.0) - 1.0) / 4.0;
const G4 = (5.0 - Math.sqrt(5.0)) / 20.0;
const grad3 = new Float32Array([1, 1, 0,
    -1, 1, 0,
    1, -1, 0,
    -1, -1, 0,
    1, 0, 1,
    -1, 0, 1,
    1, 0, -1,
    -1, 0, -1,
    0, 1, 1,
    0, -1, 1,
    0, 1, -1,
    0, -1, -1]);
const grad4 = new Float32Array([0, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1,
    0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1,
    1, 0, 1, 1, 1, 0, 1, -1, 1, 0, -1, 1, 1, 0, -1, -1,
    -1, 0, 1, 1, -1, 0, 1, -1, -1, 0, -1, 1, -1, 0, -1, -1,
    1, 1, 0, 1, 1, 1, 0, -1, 1, -1, 0, 1, 1, -1, 0, -1,
    -1, 1, 0, 1, -1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, -1,
    1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0,
    -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 0]);
/** Deterministic simplex noise generator suitable for 2D, 3D and 4D spaces. */
class SimplexNoise {
    /**
     * Creates a new `SimplexNoise` instance.
     * This involves some setup. You can save a few cpu cycles by reusing the same instance.
     * @param randomOrSeed A random number generator or a seed (string|number).
     * Defaults to Math.random (random irreproducible initialization).
     */
    constructor(randomOrSeed = Math.random) {
        const random = typeof randomOrSeed == 'function' ? randomOrSeed : alea(randomOrSeed);
        this.p = buildPermutationTable(random);
        this.perm = new Uint8Array(512);
        this.permMod12 = new Uint8Array(512);
        for (let i = 0; i < 512; i++) {
            this.perm[i] = this.p[i & 255];
            this.permMod12[i] = this.perm[i] % 12;
        }
    }
    /**
     * Samples the noise field in 2 dimensions
     * @param x
     * @param y
     * @returns a number in the interval [-1, 1]
     */
    noise2D(x, y) {
        const permMod12 = this.permMod12;
        const perm = this.perm;
        let n0 = 0; // Noise contributions from the three corners
        let n1 = 0;
        let n2 = 0;
        // Skew the input space to determine which simplex cell we're in
        const s = (x + y) * F2; // Hairy factor for 2D
        const i = Math.floor(x + s);
        const j = Math.floor(y + s);
        const t = (i + j) * G2;
        const X0 = i - t; // Unskew the cell origin back to (x,y) space
        const Y0 = j - t;
        const x0 = x - X0; // The x,y distances from the cell origin
        const y0 = y - Y0;
        // For the 2D case, the simplex shape is an equilateral triangle.
        // Determine which simplex we are in.
        let i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
        if (x0 > y0) {
            i1 = 1;
            j1 = 0;
        } // lower triangle, XY order: (0,0)->(1,0)->(1,1)
        else {
            i1 = 0;
            j1 = 1;
        } // upper triangle, YX order: (0,0)->(0,1)->(1,1)
        // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
        // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
        // c = (3-sqrt(3))/6
        const x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
        const y1 = y0 - j1 + G2;
        const x2 = x0 - 1.0 + 2.0 * G2; // Offsets for last corner in (x,y) unskewed coords
        const y2 = y0 - 1.0 + 2.0 * G2;
        // Work out the hashed gradient indices of the three simplex corners
        const ii = i & 255;
        const jj = j & 255;
        // Calculate the contribution from the three corners
        let t0 = 0.5 - x0 * x0 - y0 * y0;
        if (t0 >= 0) {
            const gi0 = permMod12[ii + perm[jj]] * 3;
            t0 *= t0;
            n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0); // (x,y) of grad3 used for 2D gradient
        }
        let t1 = 0.5 - x1 * x1 - y1 * y1;
        if (t1 >= 0) {
            const gi1 = permMod12[ii + i1 + perm[jj + j1]] * 3;
            t1 *= t1;
            n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1);
        }
        let t2 = 0.5 - x2 * x2 - y2 * y2;
        if (t2 >= 0) {
            const gi2 = permMod12[ii + 1 + perm[jj + 1]] * 3;
            t2 *= t2;
            n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2);
        }
        // Add contributions from each corner to get the final noise value.
        // The result is scaled to return values in the interval [-1,1].
        return 70.0 * (n0 + n1 + n2);
    }
    /**
     * Samples the noise field in 3 dimensions
     * @param x
     * @param y
     * @param z
     * @returns a number in the interval [-1, 1]
     */
    noise3D(x, y, z) {
        const permMod12 = this.permMod12;
        const perm = this.perm;
        let n0, n1, n2, n3; // Noise contributions from the four corners
        // Skew the input space to determine which simplex cell we're in
        const s = (x + y + z) * F3; // Very nice and simple skew factor for 3D
        const i = Math.floor(x + s);
        const j = Math.floor(y + s);
        const k = Math.floor(z + s);
        const t = (i + j + k) * G3;
        const X0 = i - t; // Unskew the cell origin back to (x,y,z) space
        const Y0 = j - t;
        const Z0 = k - t;
        const x0 = x - X0; // The x,y,z distances from the cell origin
        const y0 = y - Y0;
        const z0 = z - Z0;
        // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
        // Determine which simplex we are in.
        let i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
        let i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
        if (x0 >= y0) {
            if (y0 >= z0) {
                i1 = 1;
                j1 = 0;
                k1 = 0;
                i2 = 1;
                j2 = 1;
                k2 = 0;
            } // X Y Z order
            else if (x0 >= z0) {
                i1 = 1;
                j1 = 0;
                k1 = 0;
                i2 = 1;
                j2 = 0;
                k2 = 1;
            } // X Z Y order
            else {
                i1 = 0;
                j1 = 0;
                k1 = 1;
                i2 = 1;
                j2 = 0;
                k2 = 1;
            } // Z X Y order
        }
        else { // x0<y0
            if (y0 < z0) {
                i1 = 0;
                j1 = 0;
                k1 = 1;
                i2 = 0;
                j2 = 1;
                k2 = 1;
            } // Z Y X order
            else if (x0 < z0) {
                i1 = 0;
                j1 = 1;
                k1 = 0;
                i2 = 0;
                j2 = 1;
                k2 = 1;
            } // Y Z X order
            else {
                i1 = 0;
                j1 = 1;
                k1 = 0;
                i2 = 1;
                j2 = 1;
                k2 = 0;
            } // Y X Z order
        }
        // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
        // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
        // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
        // c = 1/6.
        const x1 = x0 - i1 + G3; // Offsets for second corner in (x,y,z) coords
        const y1 = y0 - j1 + G3;
        const z1 = z0 - k1 + G3;
        const x2 = x0 - i2 + 2.0 * G3; // Offsets for third corner in (x,y,z) coords
        const y2 = y0 - j2 + 2.0 * G3;
        const z2 = z0 - k2 + 2.0 * G3;
        const x3 = x0 - 1.0 + 3.0 * G3; // Offsets for last corner in (x,y,z) coords
        const y3 = y0 - 1.0 + 3.0 * G3;
        const z3 = z0 - 1.0 + 3.0 * G3;
        // Work out the hashed gradient indices of the four simplex corners
        const ii = i & 255;
        const jj = j & 255;
        const kk = k & 255;
        // Calculate the contribution from the four corners
        let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
        if (t0 < 0)
            n0 = 0.0;
        else {
            const gi0 = permMod12[ii + perm[jj + perm[kk]]] * 3;
            t0 *= t0;
            n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0 + grad3[gi0 + 2] * z0);
        }
        let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
        if (t1 < 0)
            n1 = 0.0;
        else {
            const gi1 = permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]] * 3;
            t1 *= t1;
            n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1 + grad3[gi1 + 2] * z1);
        }
        let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
        if (t2 < 0)
            n2 = 0.0;
        else {
            const gi2 = permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]] * 3;
            t2 *= t2;
            n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2 + grad3[gi2 + 2] * z2);
        }
        let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
        if (t3 < 0)
            n3 = 0.0;
        else {
            const gi3 = permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]] * 3;
            t3 *= t3;
            n3 = t3 * t3 * (grad3[gi3] * x3 + grad3[gi3 + 1] * y3 + grad3[gi3 + 2] * z3);
        }
        // Add contributions from each corner to get the final noise value.
        // The result is scaled to stay just inside [-1,1]
        return 32.0 * (n0 + n1 + n2 + n3);
    }
    /**
     * Samples the noise field in 4 dimensions
     * @param x
     * @param y
     * @param z
     * @returns a number in the interval [-1, 1]
     */
    noise4D(x, y, z, w) {
        const perm = this.perm;
        let n0, n1, n2, n3, n4; // Noise contributions from the five corners
        // Skew the (x,y,z,w) space to determine which cell of 24 simplices we're in
        const s = (x + y + z + w) * F4; // Factor for 4D skewing
        const i = Math.floor(x + s);
        const j = Math.floor(y + s);
        const k = Math.floor(z + s);
        const l = Math.floor(w + s);
        const t = (i + j + k + l) * G4; // Factor for 4D unskewing
        const X0 = i - t; // Unskew the cell origin back to (x,y,z,w) space
        const Y0 = j - t;
        const Z0 = k - t;
        const W0 = l - t;
        const x0 = x - X0; // The x,y,z,w distances from the cell origin
        const y0 = y - Y0;
        const z0 = z - Z0;
        const w0 = w - W0;
        // For the 4D case, the simplex is a 4D shape I won't even try to describe.
        // To find out which of the 24 possible simplices we're in, we need to
        // determine the magnitude ordering of x0, y0, z0 and w0.
        // Six pair-wise comparisons are performed between each possible pair
        // of the four coordinates, and the results are used to rank the numbers.
        let rankx = 0;
        let ranky = 0;
        let rankz = 0;
        let rankw = 0;
        if (x0 > y0)
            rankx++;
        else
            ranky++;
        if (x0 > z0)
            rankx++;
        else
            rankz++;
        if (x0 > w0)
            rankx++;
        else
            rankw++;
        if (y0 > z0)
            ranky++;
        else
            rankz++;
        if (y0 > w0)
            ranky++;
        else
            rankw++;
        if (z0 > w0)
            rankz++;
        else
            rankw++;
        // simplex[c] is a 4-vector with the numbers 0, 1, 2 and 3 in some order.
        // Many values of c will never occur, since e.g. x>y>z>w makes x<z, y<w and x<w
        // impossible. Only the 24 indices which have non-zero entries make any sense.
        // We use a thresholding to set the coordinates in turn from the largest magnitude.
        // Rank 3 denotes the largest coordinate.
        // Rank 2 denotes the second largest coordinate.
        // Rank 1 denotes the second smallest coordinate.
        // The integer offsets for the second simplex corner
        const i1 = rankx >= 3 ? 1 : 0;
        const j1 = ranky >= 3 ? 1 : 0;
        const k1 = rankz >= 3 ? 1 : 0;
        const l1 = rankw >= 3 ? 1 : 0;
        // The integer offsets for the third simplex corner
        const i2 = rankx >= 2 ? 1 : 0;
        const j2 = ranky >= 2 ? 1 : 0;
        const k2 = rankz >= 2 ? 1 : 0;
        const l2 = rankw >= 2 ? 1 : 0;
        // The integer offsets for the fourth simplex corner
        const i3 = rankx >= 1 ? 1 : 0;
        const j3 = ranky >= 1 ? 1 : 0;
        const k3 = rankz >= 1 ? 1 : 0;
        const l3 = rankw >= 1 ? 1 : 0;
        // The fifth corner has all coordinate offsets = 1, so no need to compute that.
        const x1 = x0 - i1 + G4; // Offsets for second corner in (x,y,z,w) coords
        const y1 = y0 - j1 + G4;
        const z1 = z0 - k1 + G4;
        const w1 = w0 - l1 + G4;
        const x2 = x0 - i2 + 2.0 * G4; // Offsets for third corner in (x,y,z,w) coords
        const y2 = y0 - j2 + 2.0 * G4;
        const z2 = z0 - k2 + 2.0 * G4;
        const w2 = w0 - l2 + 2.0 * G4;
        const x3 = x0 - i3 + 3.0 * G4; // Offsets for fourth corner in (x,y,z,w) coords
        const y3 = y0 - j3 + 3.0 * G4;
        const z3 = z0 - k3 + 3.0 * G4;
        const w3 = w0 - l3 + 3.0 * G4;
        const x4 = x0 - 1.0 + 4.0 * G4; // Offsets for last corner in (x,y,z,w) coords
        const y4 = y0 - 1.0 + 4.0 * G4;
        const z4 = z0 - 1.0 + 4.0 * G4;
        const w4 = w0 - 1.0 + 4.0 * G4;
        // Work out the hashed gradient indices of the five simplex corners
        const ii = i & 255;
        const jj = j & 255;
        const kk = k & 255;
        const ll = l & 255;
        // Calculate the contribution from the five corners
        let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0 - w0 * w0;
        if (t0 < 0)
            n0 = 0.0;
        else {
            const gi0 = (perm[ii + perm[jj + perm[kk + perm[ll]]]] % 32) * 4;
            t0 *= t0;
            n0 = t0 * t0 * (grad4[gi0] * x0 + grad4[gi0 + 1] * y0 + grad4[gi0 + 2] * z0 + grad4[gi0 + 3] * w0);
        }
        let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1 - w1 * w1;
        if (t1 < 0)
            n1 = 0.0;
        else {
            const gi1 = (perm[ii + i1 + perm[jj + j1 + perm[kk + k1 + perm[ll + l1]]]] % 32) * 4;
            t1 *= t1;
            n1 = t1 * t1 * (grad4[gi1] * x1 + grad4[gi1 + 1] * y1 + grad4[gi1 + 2] * z1 + grad4[gi1 + 3] * w1);
        }
        let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2 - w2 * w2;
        if (t2 < 0)
            n2 = 0.0;
        else {
            const gi2 = (perm[ii + i2 + perm[jj + j2 + perm[kk + k2 + perm[ll + l2]]]] % 32) * 4;
            t2 *= t2;
            n2 = t2 * t2 * (grad4[gi2] * x2 + grad4[gi2 + 1] * y2 + grad4[gi2 + 2] * z2 + grad4[gi2 + 3] * w2);
        }
        let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3 - w3 * w3;
        if (t3 < 0)
            n3 = 0.0;
        else {
            const gi3 = (perm[ii + i3 + perm[jj + j3 + perm[kk + k3 + perm[ll + l3]]]] % 32) * 4;
            t3 *= t3;
            n3 = t3 * t3 * (grad4[gi3] * x3 + grad4[gi3 + 1] * y3 + grad4[gi3 + 2] * z3 + grad4[gi3 + 3] * w3);
        }
        let t4 = 0.6 - x4 * x4 - y4 * y4 - z4 * z4 - w4 * w4;
        if (t4 < 0)
            n4 = 0.0;
        else {
            const gi4 = (perm[ii + 1 + perm[jj + 1 + perm[kk + 1 + perm[ll + 1]]]] % 32) * 4;
            t4 *= t4;
            n4 = t4 * t4 * (grad4[gi4] * x4 + grad4[gi4 + 1] * y4 + grad4[gi4 + 2] * z4 + grad4[gi4 + 3] * w4);
        }
        // Sum up and scale the result to cover the range [-1,1]
        return 27.0 * (n0 + n1 + n2 + n3 + n4);
    }
}
/**
 * Builds a random permutation table.
 * This is exported only for (internal) testing purposes.
 * Do not rely on this export.
 * @private
 */
function buildPermutationTable(random) {
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) {
        p[i] = i;
    }
    for (let i = 0; i < 255; i++) {
        const r = i + ~~(random() * (256 - i));
        const aux = p[i];
        p[i] = p[r];
        p[r] = aux;
    }
    return p;
}
/*
The ALEA PRNG and masher code used by simplex-noise.js
is based on code by Johannes Baagøe, modified by Jonas Wagner.
See alea.md for the full license.
*/
function alea(seed) {
    let s0 = 0;
    let s1 = 0;
    let s2 = 0;
    let c = 1;
    const mash = masher();
    s0 = mash(' ');
    s1 = mash(' ');
    s2 = mash(' ');
    s0 -= mash(seed);
    if (s0 < 0) {
        s0 += 1;
    }
    s1 -= mash(seed);
    if (s1 < 0) {
        s1 += 1;
    }
    s2 -= mash(seed);
    if (s2 < 0) {
        s2 += 1;
    }
    return function () {
        const t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
        s0 = s1;
        s1 = s2;
        return s2 = t - (c = t | 0);
    };
}
function masher() {
    let n = 0xefc8249d;
    return function (data) {
        data = data.toString();
        for (let i = 0; i < data.length; i++) {
            n += data.charCodeAt(i);
            let h = 0.02519603282416938 * n;
            n = h >>> 0;
            h -= n;
            h *= n;
            n = h >>> 0;
            h -= n;
            n += h * 0x100000000; // 2^32
        }
        return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
    };
}

class TurbulenceField {
    constructor(scale, octaves, velocityMultiplier, timeScale) {
        this.scale = scale;
        this.octaves = octaves;
        this.velocityMultiplier = velocityMultiplier;
        this.timeScale = timeScale;
        this.type = 'TurbulenceField';
        this.generator = new SimplexNoise();
        this.timeOffset = new THREE.Vector3();
        this.temp = new THREE.Vector3();
        this.temp2 = new THREE.Vector3();
        this.timeOffset.x = Math.random() / this.scale.x * this.timeScale.x;
        this.timeOffset.y = Math.random() / this.scale.y * this.timeScale.y;
        this.timeOffset.z = Math.random() / this.scale.z * this.timeScale.z;
    }
    initialize(particle) {
    }
    update(particle, delta) {
        const x = particle.position.x / this.scale.x;
        const y = particle.position.y / this.scale.y;
        const z = particle.position.z / this.scale.z;
        this.temp.set(0, 0, 0);
        let lvl = 1;
        for (let i = 0; i < this.octaves; i++) {
            this.temp2.set(this.generator.noise4D(x * lvl, y * lvl, z * lvl, this.timeOffset.x * lvl) / lvl, this.generator.noise4D(x * lvl, y * lvl, z * lvl, this.timeOffset.y * lvl) / lvl, this.generator.noise4D(x * lvl, y * lvl, z * lvl, this.timeOffset.z * lvl) / lvl);
            this.temp.add(this.temp2);
            lvl *= 2;
        }
        this.temp.multiply(this.velocityMultiplier);
        particle.velocity.addScaledVector(this.temp, delta);
    }
    toJSON() {
        return {
            type: this.type,
            scale: [this.scale.x, this.scale.y, this.scale.z],
            octaves: this.octaves,
            velocityMultiplier: [this.velocityMultiplier.x, this.velocityMultiplier.y, this.velocityMultiplier.z],
            timeScale: [this.timeScale.x, this.timeScale.y, this.timeScale.z],
        };
    }
    frameUpdate(delta) {
        this.timeOffset.x += delta * this.timeScale.x;
        this.timeOffset.y += delta * this.timeScale.y;
        this.timeOffset.z += delta * this.timeScale.z;
    }
    static fromJSON(json) {
        return new TurbulenceField(new THREE.Vector3(json.scale[0], json.scale[1], json.scale[2]), json.octaves, new THREE.Vector3(json.velocityMultiplier[0], json.velocityMultiplier[1], json.velocityMultiplier[2]), new THREE.Vector3(json.timeScale[0], json.timeScale[1], json.timeScale[2]));
    }
    clone() {
        return new TurbulenceField(this.scale.clone(), this.octaves, this.velocityMultiplier.clone(), this.timeScale.clone());
    }
    reset() {
    }
}

const IdentityQuaternion = new THREE.Quaternion();
class Rotation3DOverLife {
    constructor(angularVelocity, dynamic) {
        this.angularVelocity = angularVelocity;
        this.dynamic = dynamic;
        this.type = 'Rotation3DOverLife';
        this.tempQuat = new THREE.Quaternion();
    }
    initialize(particle) {
        if (!this.dynamic && particle instanceof SpriteParticle) {
            particle.angularVelocity = new THREE.Quaternion();
            this.angularVelocity.genValue(particle.angularVelocity);
        }
    }
    update(particle, delta) {
        if (!this.dynamic) {
            if (particle instanceof SpriteParticle) {
                this.tempQuat.slerpQuaternions(IdentityQuaternion, particle.angularVelocity, delta);
                particle.rotation.multiply(this.tempQuat);
            }
        }
        else {
            this.angularVelocity.genValue(this.tempQuat, particle.age / particle.life);
            this.tempQuat.slerpQuaternions(IdentityQuaternion, this.tempQuat, delta);
            particle.rotation.multiply(this.tempQuat);
        }
    }
    toJSON() {
        return {
            type: this.type,
            angularVelocity: this.angularVelocity.toJSON(),
            dynamic: this.dynamic,
        };
    }
    static fromJSON(json) {
        return new Rotation3DOverLife(RotationGeneratorFromJSON(json.angularVelocity), json.dynamic);
    }
    frameUpdate(delta) {
    }
    clone() {
        return new Rotation3DOverLife(this.angularVelocity.clone(), this.dynamic);
    }
    reset() {
    }
}

class ForceOverLife {
    initialize(particle) {
    }
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.type = 'ForceOverLife';
        this._temp = new THREE.Vector3();
    }
    update(particle) {
        this._temp.set(this.x.genValue(particle.age / particle.life), this.y.genValue(particle.age / particle.life), this.z.genValue(particle.age / particle.life));
        particle.velocity.add(this._temp);
    }
    toJSON() {
        return {
            type: this.type,
            x: this.x.toJSON(),
            y: this.y.toJSON(),
            z: this.z.toJSON(),
        };
    }
    static fromJSON(json) {
        return new ForceOverLife(ValueGeneratorFromJSON(json.x), ValueGeneratorFromJSON(json.y), ValueGeneratorFromJSON(json.z));
    }
    frameUpdate(delta) {
    }
    clone() {
        return new ForceOverLife(this.x.clone(), this.y.clone(), this.z.clone());
    }
    reset() {
    }
}

class Noise {
    constructor(frequency, power) {
        this.frequency = frequency;
        this.power = power;
        this.type = 'Noise';
        this.generator = new SimplexNoise();
        this.duration = 0;
        this.temp = new THREE.Vector3();
    }
    initialize(particle) {
        particle.startTime = this.duration;
    }
    update(particle, delta) {
        this.temp.set(this.generator.noise2D(particle.startTime * this.frequency.x, particle.life / particle.age * this.frequency.x), this.generator.noise2D(particle.startTime * this.frequency.y + 100.25, particle.life / particle.age * this.frequency.y + 100.154), this.generator.noise2D(particle.startTime * this.frequency.z + 200.89, particle.life / particle.age * this.frequency.z + 200.1)).multiply(this.power);
        particle.position.addScaledVector(this.temp, delta);
    }
    toJSON() {
        return {
            type: this.type,
            frequency: [this.frequency.x, this.frequency.y, this.frequency.z],
            power: [this.power.x, this.power.y, this.power.z],
        };
    }
    frameUpdate(delta) {
        this.duration += delta;
    }
    static fromJSON(json) {
        return new Noise(new THREE.Vector3(json.frequency[0], json.frequency[1], json.frequency[2]), new THREE.Vector3(json.power[0], json.power[1], json.power[2]));
    }
    clone() {
        return new Noise(this.frequency.clone(), this.power.clone());
    }
    reset() {
    }
}

const BehaviorTypes = {
    "ApplyForce": { type: "ApplyForce", constructor: ApplyForce, params: [["direction", "vec3"], ["magnitude", "value"]], loadJSON: ApplyForce.fromJSON },
    "Noise": { type: "Noise", constructor: Noise, params: [["frequency", "vec3"], ["power", "vec3"]], loadJSON: Noise.fromJSON },
    "TurbulenceField": { type: "TurbulenceField", constructor: TurbulenceField, params: [["scale", "vec3"], ["octaves", "number"], ["velocityMultiplier", "vec3"], ["timeScale", "vec3"]], loadJSON: TurbulenceField.fromJSON },
    "GravityForce": { type: "GravityForce", constructor: GravityForce, params: [["center", "vec3"], ["magnitude", "number"]], loadJSON: GravityForce.fromJSON },
    "ColorOverLife": { type: "ColorOverLife", constructor: ColorOverLife, params: [["color", "colorFunc"]], loadJSON: ColorOverLife.fromJSON },
    "RotationOverLife": { type: "RotationOverLife", constructor: RotationOverLife, params: [["angularVelocity", "valueFunc"], ["dynamic", "boolean"]], loadJSON: RotationOverLife.fromJSON },
    "Rotation3DOverLife": { type: "Rotation3DOverLife", constructor: Rotation3DOverLife, params: [["angularVelocity", "rotationFunc"], ["dynamic", "boolean"]], loadJSON: Rotation3DOverLife.fromJSON },
    "SizeOverLife": { type: "SizeOverLife", constructor: SizeOverLife, params: [["size", "valueFunc"]], loadJSON: SizeOverLife.fromJSON },
    "SpeedOverLife": { type: "SpeedOverLife", constructor: SpeedOverLife, params: [["speed", "valueFunc"]], loadJSON: SpeedOverLife.fromJSON },
    "FrameOverLife": { type: "FrameOverLife", constructor: FrameOverLife, params: [["frame", "valueFunc"]], loadJSON: FrameOverLife.fromJSON },
    "ForceOverLife": { type: "ForceOverLife", constructor: ForceOverLife, params: [["x", "valueFunc"], ["y", "valueFunc"], ["z", "valueFunc"]], loadJSON: ForceOverLife.fromJSON },
    "OrbitOverLife": { type: "OrbitOverLife", constructor: OrbitOverLife, params: [["orbitSpeed", "valueFunc"], ["axis", "vec3"],], loadJSON: OrbitOverLife.fromJSON },
    "WidthOverLength": { type: "WidthOverLength", constructor: WidthOverLength, params: [["width", "valueFunc"]], loadJSON: WidthOverLength.fromJSON },
    "ChangeEmitDirection": { type: "ChangeEmitDirection", constructor: ChangeEmitDirection, params: [["angle", "value"]], loadJSON: ChangeEmitDirection.fromJSON },
    "EmitSubParticleSystem": { type: "EmitSubParticleSystem", constructor: EmitSubParticleSystem, params: [["particleSystem", "self"], ['useVelocityAsBasis', 'boolean'], ["subParticleSystem", "particleSystem"]], loadJSON: EmitSubParticleSystem.fromJSON },
};
function BehaviorFromJSON(json, particleSystem) {
    return BehaviorTypes[json.type].loadJSON(json, particleSystem);
}

class ConeEmitter {
    constructor(parameters = {}) {
        var _a, _b, _c, _d;
        this.type = "cone";
        this.radius = (_a = parameters.radius) !== null && _a !== void 0 ? _a : 10;
        this.arc = (_b = parameters.arc) !== null && _b !== void 0 ? _b : 2.0 * Math.PI;
        this.thickness = (_c = parameters.thickness) !== null && _c !== void 0 ? _c : 1;
        this.angle = (_d = parameters.angle) !== null && _d !== void 0 ? _d : Math.PI / 6;
    }
    initialize(p) {
        const u = Math.random();
        const rand = THREE.MathUtils.lerp(1 - this.thickness, 1, Math.random());
        const theta = u * this.arc;
        const r = Math.sqrt(rand);
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);
        p.position.x = r * cosTheta;
        p.position.y = r * sinTheta;
        p.position.z = 0;
        const angle = this.angle * r;
        p.velocity.set(0, 0, Math.cos(angle)).addScaledVector(p.position, Math.sin(angle)).multiplyScalar(p.startSpeed);
        //const v = Math.random();
        p.position.multiplyScalar(this.radius);
    }
    toJSON() {
        return {
            type: "cone",
            radius: this.radius,
            arc: this.arc,
            thickness: this.thickness,
            angle: this.angle,
        };
    }
    static fromJSON(json) {
        return new ConeEmitter(json);
    }
    clone() {
        return new ConeEmitter({
            radius: this.radius,
            arc: this.arc,
            thickness: this.thickness,
            angle: this.angle,
        });
    }
}

class DonutEmitter {
    constructor(parameters = {}) {
        var _a, _b, _c, _d;
        this.type = "donut";
        this.radius = (_a = parameters.radius) !== null && _a !== void 0 ? _a : 10;
        this.arc = (_b = parameters.arc) !== null && _b !== void 0 ? _b : 2.0 * Math.PI;
        this.thickness = (_c = parameters.thickness) !== null && _c !== void 0 ? _c : 1;
        this.angle = (_d = parameters.angle) !== null && _d !== void 0 ? _d : Math.PI / 6;
    }
    initialize(p) {
        const u = Math.random();
        const rand = THREE.MathUtils.lerp(this.thickness, 1, Math.random());
        const theta = u * this.arc;
        const r = Math.sqrt(rand);
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);
        p.position.x = r * cosTheta;
        p.position.y = r * sinTheta;
        p.position.z = 0;
        const angle = this.angle * r;
        p.velocity.set(0, 0, Math.cos(angle)).addScaledVector(p.position, Math.sin(angle)).multiplyScalar(p.startSpeed);
        //const v = Math.random();
        p.position.multiplyScalar(this.radius);
    }
    toJSON() {
        return {
            type: "donut",
            radius: this.radius,
            arc: this.arc,
            thickness: this.thickness,
            angle: this.angle
        };
    }
    static fromJSON(json) {
        return new DonutEmitter(json);
    }
    clone() {
        return new DonutEmitter({
            radius: this.radius,
            arc: this.arc,
            thickness: this.thickness,
            angle: this.angle,
        });
    }
}

class PointEmitter {
    constructor() {
        this.type = "point";
    }
    initialize(p) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * Math.PI * 2;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = Math.cbrt(Math.random());
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);
        p.velocity.x = r * sinPhi * cosTheta;
        p.velocity.y = r * sinPhi * sinTheta;
        p.velocity.z = r * cosPhi;
        p.velocity.multiplyScalar(p.startSpeed);
        p.position.setScalar(0);
    }
    toJSON() {
        return {
            type: 'point',
        };
    }
    static fromJSON(json) {
        return new PointEmitter();
    }
    clone() {
        return new PointEmitter();
    }
}

class SphereEmitter {
    constructor(parameters = {}) {
        var _a, _b, _c;
        this.type = "sphere";
        this.radius = (_a = parameters.radius) !== null && _a !== void 0 ? _a : 10;
        this.arc = (_b = parameters.arc) !== null && _b !== void 0 ? _b : 2.0 * Math.PI;
        this.thickness = (_c = parameters.thickness) !== null && _c !== void 0 ? _c : 1;
    }
    initialize(p) {
        const u = Math.random();
        const v = Math.random();
        const rand = THREE.MathUtils.lerp(1 - this.thickness, 1, Math.random());
        const theta = u * this.arc;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = Math.cbrt(rand);
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);
        p.position.x = r * sinPhi * cosTheta;
        p.position.y = r * sinPhi * sinTheta;
        p.position.z = r * cosPhi;
        p.velocity.setScalar(0).addScaledVector(p.position, p.startSpeed);
        p.position.multiplyScalar(this.radius);
    }
    toJSON() {
        return {
            type: "sphere",
            radius: this.radius,
            arc: this.arc,
            thickness: this.thickness,
        };
    }
    static fromJSON(json) {
        return new SphereEmitter(json);
    }
    clone() {
        return new SphereEmitter({
            radius: this.radius,
            arc: this.arc,
            thickness: this.thickness,
        });
    }
}

class MeshSurfaceEmitter {
    get geometry() {
        return this._geometry;
    }
    set geometry(geometry) {
        this._geometry = geometry;
        if (geometry === undefined) {
            return;
        }
        if (typeof geometry === "string") {
            return;
        }
        // optimization
        /*if (mesh.userData.triangleIndexToArea) {
            this._triangleIndexToArea = mesh.userData.triangleIndexToArea;
            return;
        }*/
        const tri = new THREE.Triangle();
        this._triangleIndexToArea.length = 0;
        let area = 0;
        if (!geometry.getIndex()) {
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const array = geometry.getIndex().array;
        const triCount = array.length / 3;
        this._triangleIndexToArea.push(0);
        for (let i = 0; i < triCount; i++) {
            tri.setFromAttributeAndIndices(geometry.getAttribute("position"), array[i * 3], array[i * 3 + 1], array[i * 3 + 2]);
            area += tri.getArea();
            this._triangleIndexToArea.push(area);
        }
        geometry.userData.triangleIndexToArea = this._triangleIndexToArea;
    }
    constructor(geometry) {
        this.type = "mesh_surface";
        this._triangleIndexToArea = [];
        this._tempA = new THREE.Vector3();
        this._tempB = new THREE.Vector3();
        this._tempC = new THREE.Vector3();
        if (!geometry) {
            return;
        }
        this.geometry = geometry;
    }
    initialize(p) {
        const geometry = this._geometry;
        if (!geometry || geometry.getIndex() === null) {
            p.position.set(0, 0, 0);
            p.velocity.set(0, 0, 1).multiplyScalar(p.startSpeed);
            return;
        }
        const triCount = this._triangleIndexToArea.length - 1;
        let left = 0, right = triCount;
        const target = Math.random() * this._triangleIndexToArea[triCount];
        while (left + 1 < right) {
            const mid = Math.floor((left + right) / 2);
            if (target < this._triangleIndexToArea[mid]) {
                right = mid;
            }
            else {
                left = mid;
            }
        }
        //const area = this._triangleIndexToArea[left + 1] - this._triangleIndexToArea[left];
        //const percent = (target - this._triangleIndexToArea[left]) / area;
        let u1 = Math.random();
        let u2 = Math.random();
        if (u1 + u2 > 1) {
            u1 = 1 - u1;
            u2 = 1 - u2;
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const index1 = geometry.getIndex().array[left * 3];
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const index2 = geometry.getIndex().array[left * 3 + 1];
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const index3 = geometry.getIndex().array[left * 3 + 2];
        const positionBuffer = geometry.getAttribute("position");
        this._tempA.fromBufferAttribute(positionBuffer, index1);
        this._tempB.fromBufferAttribute(positionBuffer, index2);
        this._tempC.fromBufferAttribute(positionBuffer, index3);
        this._tempB.sub(this._tempA);
        this._tempC.sub(this._tempA);
        this._tempA.addScaledVector(this._tempB, u1).addScaledVector(this._tempC, u2);
        p.position.copy(this._tempA);
        // velocity based on tri normal
        this._tempA.copy(this._tempB).cross(this._tempC).normalize();
        p.velocity.copy(this._tempA).normalize().multiplyScalar(p.startSpeed);
        /*p.position.applyMatrix4(this._mesh.matrixWorld);
        p.velocity.applyMatrix3(this._mesh.normalMatrix);*/
    }
    toJSON() {
        return {
            type: 'mesh_surface',
            mesh: this._geometry ? this._geometry.uuid : "",
        };
    }
    static fromJSON(json, meta) {
        return new MeshSurfaceEmitter(meta.geometries[json.geometry]);
    }
    clone() {
        return new MeshSurfaceEmitter(this._geometry);
    }
}

class GridEmitter {
    constructor(parameters = {}) {
        var _a, _b, _c, _d;
        this.type = "grid";
        this.width = (_a = parameters.width) !== null && _a !== void 0 ? _a : 1;
        this.height = (_b = parameters.height) !== null && _b !== void 0 ? _b : 1;
        this.column = (_c = parameters.column) !== null && _c !== void 0 ? _c : 10;
        this.row = (_d = parameters.row) !== null && _d !== void 0 ? _d : 10;
    }
    initialize(p) {
        const r = Math.floor(Math.random() * this.row);
        const c = Math.floor(Math.random() * this.column);
        p.position.x = c * this.width / this.column - this.width / 2;
        p.position.y = r * this.height / this.row - this.height / 2;
        p.position.z = 0;
        p.velocity.set(0, 0, p.startSpeed);
    }
    toJSON() {
        return {
            type: "grid",
            width: this.width,
            height: this.height,
            column: this.column,
            row: this.row,
        };
    }
    static fromJSON(json) {
        return new GridEmitter(json);
    }
    clone() {
        return new GridEmitter({
            width: this.width,
            height: this.height,
            column: this.column,
            row: this.row,
        });
    }
}

const EmitterShapes = {
    "cone": { type: "cone", params: [["radius", "number"], ["arc", "radian"], ["thickness", "number"], ["angle", "radian"]], constructor: ConeEmitter, loadJSON: ConeEmitter.fromJSON },
    "donut": { type: "donut", params: [["radius", "number"], ["arc", "radian"], ["thickness", "number"], ["angle", "radian"]], constructor: DonutEmitter, loadJSON: DonutEmitter.fromJSON },
    "point": { type: "point", params: [], constructor: PointEmitter, loadJSON: PointEmitter.fromJSON },
    "sphere": { type: "sphere", params: [["radius", "number"], ["arc", "radian"], ["thickness", "number"], ["angle", "radian"]], constructor: SphereEmitter, loadJSON: SphereEmitter.fromJSON },
    "grid": { type: "grid", params: [["width", "number"], ["height", "number"], ["rows", "number"], ["column", "number"]], constructor: GridEmitter, loadJSON: GridEmitter.fromJSON },
    "mesh_surface": { type: "mesh_surface", params: [["geometry", "geometry"]], constructor: MeshSurfaceEmitter, loadJSON: MeshSurfaceEmitter.fromJSON },
};
function EmitterFromJSON(json, meta) {
    return EmitterShapes[json.type].loadJSON(json, meta);
}

(function (RenderMode) {
    RenderMode[RenderMode["BillBoard"] = 0] = "BillBoard";
    RenderMode[RenderMode["StretchedBillBoard"] = 1] = "StretchedBillBoard";
    RenderMode[RenderMode["Mesh"] = 2] = "Mesh";
    RenderMode[RenderMode["Trail"] = 3] = "Trail";
})(gdjs.__particleEmmiter3DExtension.RenderMode || (gdjs.__particleEmmiter3DExtension.RenderMode = {}));

class VFXBatch extends THREE.Mesh {
    constructor(settings) {
        super();
        this.type = "VFXBatch";
        this.maxParticles = 1000;
        this.systems = new Set();
        const layers = new THREE.Layers();
        layers.mask = settings.layers.mask;
        this.settings = {
            instancingGeometry: settings.instancingGeometry,
            renderMode: settings.renderMode,
            renderOrder: settings.renderOrder,
            material: settings.material,
            uTileCount: settings.uTileCount,
            vTileCount: settings.vTileCount,
            layers: layers,
        };
        this.frustumCulled = false;
        this.renderOrder = this.settings.renderOrder;
    }
    addSystem(system) {
        this.systems.add(system);
    }
    removeSystem(system) {
        this.systems.delete(system);
    }
}

const UP = new THREE.Vector3(0, 0, 1);
const tempQ = new THREE.Quaternion();
const tempV = new THREE.Vector3();
const tempV2 = new THREE.Vector3();
new THREE.Vector3();
const PREWARM_FPS = 60;
const DEFAULT_GEOMETRY = new THREE.PlaneGeometry(1, 1, 1, 1);
/**
 * ParticleSystem represents a system that generates and controls particles with similar attributes.
 *
 * @class
 */
class ParticleSystem {
    set time(time) {
        this.emissionState.time = time;
    }
    get time() {
        return this.emissionState.time;
    }
    // currently if you change the layers setting, you need manually set this.neededToUpdateRender = true;
    get layers() {
        return this.rendererSettings.layers;
    }
    get texture() {
        return this.rendererSettings.material.map;
    }
    set texture(texture) {
        this.rendererSettings.material.map = texture;
        this.neededToUpdateRender = true;
        //this.emitter.material.uniforms.map.value = texture;
    }
    get material() {
        return this.rendererSettings.material;
    }
    set material(material) {
        this.rendererSettings.material = material;
        this.neededToUpdateRender = true;
    }
    get uTileCount() {
        return this.rendererSettings.uTileCount;
    }
    set uTileCount(u) {
        this.rendererSettings.uTileCount = u;
        this.neededToUpdateRender = true;
        //this.emitter.material.uniforms.tileCount.value.x = u;
    }
    get vTileCount() {
        return this.rendererSettings.vTileCount;
    }
    set vTileCount(v) {
        this.rendererSettings.vTileCount = v;
        this.neededToUpdateRender = true;
    }
    get instancingGeometry() {
        return this.rendererSettings.instancingGeometry;
    }
    set instancingGeometry(geometry) {
        this.restart();
        this.particles.length = 0;
        this.rendererSettings.instancingGeometry = geometry;
        this.neededToUpdateRender = true;
    }
    get renderMode() {
        return this.rendererSettings.renderMode;
    }
    set renderMode(renderMode) {
        if ((this.rendererSettings.renderMode != gdjs.__particleEmmiter3DExtension.RenderMode.Trail && renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Trail) ||
            (this.rendererSettings.renderMode == gdjs.__particleEmmiter3DExtension.RenderMode.Trail && renderMode !== gdjs.__particleEmmiter3DExtension.RenderMode.Trail)) {
            this.restart();
            this.particles.length = 0;
        }
        if (this.rendererSettings.renderMode !== renderMode) {
            switch (renderMode) {
                case gdjs.__particleEmmiter3DExtension.RenderMode.Trail:
                    this.rendererEmitterSettings = {
                        startLength: new ConstantValue(30),
                        followLocalOrigin: false,
                    };
                    break;
                case gdjs.__particleEmmiter3DExtension.RenderMode.Mesh:
                    this.rendererEmitterSettings = {
                        geometry: new THREE.PlaneGeometry(1, 1),
                    };
                    this.startRotation = new AxisAngleGenerator(new THREE.Vector3(0, 1, 0), new ConstantValue(0));
                    break;
                case gdjs.__particleEmmiter3DExtension.RenderMode.BillBoard:
                case gdjs.__particleEmmiter3DExtension.RenderMode.StretchedBillBoard:
                    this.rendererEmitterSettings = {};
                    if (this.rendererSettings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Mesh) {
                        this.startRotation = new ConstantValue(0);
                    }
                    break;
            }
        }
        this.rendererSettings.renderMode = renderMode;
        this.neededToUpdateRender = true;
        //this.emitter.rebuildMaterial();
    }
    get renderOrder() {
        return this.rendererSettings.renderOrder;
    }
    set renderOrder(renderOrder) {
        this.rendererSettings.renderOrder = renderOrder;
        this.neededToUpdateRender = true;
        //this.emitter.rebuildMaterial();
    }
    get blending() {
        return this.rendererSettings.material.blending;
    }
    set blending(blending) {
        this.rendererSettings.material.blending = blending;
        this.neededToUpdateRender = true;
    }
    constructor(parameters) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
        this.temp = new THREE.Vector3();
        this.travelDistance = 0;
        this.normalMatrix = new THREE.Matrix3();
        this.autoDestroy = parameters.autoDestroy === undefined ? false : parameters.autoDestroy;
        this.duration = (_a = parameters.duration) !== null && _a !== void 0 ? _a : 1;
        this.looping = parameters.looping === undefined ? true : parameters.looping;
        this.prewarm = parameters.prewarm === undefined ? false : parameters.prewarm;
        this.startLife = (_b = parameters.startLife) !== null && _b !== void 0 ? _b : new ConstantValue(5);
        this.startSpeed = (_c = parameters.startSpeed) !== null && _c !== void 0 ? _c : new ConstantValue(0);
        this.startRotation = (_d = parameters.startRotation) !== null && _d !== void 0 ? _d : new ConstantValue(0);
        this.startSize = (_e = parameters.startSize) !== null && _e !== void 0 ? _e : new ConstantValue(1);
        this.startColor = (_f = parameters.startColor) !== null && _f !== void 0 ? _f : new ConstantColor(new THREE.Vector4(1, 1, 1, 1));
        //this.startLength = parameters.startLength ?? new ConstantValue(30);
        this.emissionOverTime = (_g = parameters.emissionOverTime) !== null && _g !== void 0 ? _g : new ConstantValue(10);
        this.emissionOverDistance = (_h = parameters.emissionOverDistance) !== null && _h !== void 0 ? _h : new ConstantValue(0);
        this.emissionBursts = (_j = parameters.emissionBursts) !== null && _j !== void 0 ? _j : [];
        this.onlyUsedByOther = (_k = parameters.onlyUsedByOther) !== null && _k !== void 0 ? _k : false;
        this.emitterShape = (_l = parameters.shape) !== null && _l !== void 0 ? _l : new SphereEmitter();
        this.behaviors = (_m = parameters.behaviors) !== null && _m !== void 0 ? _m : new Array();
        this.worldSpace = (_o = parameters.worldSpace) !== null && _o !== void 0 ? _o : false;
        this.speedFactor = (_p = parameters.speedFactor) !== null && _p !== void 0 ? _p : 0;
        this.rendererEmitterSettings = (_q = parameters.rendererEmitterSettings) !== null && _q !== void 0 ? _q : {};
        this.rendererSettings = {
            instancingGeometry: (_r = parameters.instancingGeometry) !== null && _r !== void 0 ? _r : DEFAULT_GEOMETRY,
            renderMode: (_s = parameters.renderMode) !== null && _s !== void 0 ? _s : gdjs.__particleEmmiter3DExtension.RenderMode.BillBoard,
            renderOrder: (_t = parameters.renderOrder) !== null && _t !== void 0 ? _t : 0,
            material: parameters.material,
            uTileCount: (_u = parameters.uTileCount) !== null && _u !== void 0 ? _u : 1,
            vTileCount: (_v = parameters.vTileCount) !== null && _v !== void 0 ? _v : 1,
            layers: (_w = parameters.layers) !== null && _w !== void 0 ? _w : new THREE.Layers(),
        };
        this.neededToUpdateRender = true;
        this.particles = new Array();
        this.startTileIndex = parameters.startTileIndex || new ConstantValue(0);
        this.emitter = new ParticleEmitter(this);
        this.paused = false;
        this.particleNum = 0;
        this.emissionState = {
            burstIndex: 0,
            burstWaveIndex: 0,
            time: 0,
            waitEmiting: 0,
        };
        this.emitEnded = false;
        this.markForDestroy = false;
        this.prewarmed = false;
    }
    pause() {
        this.paused = true;
    }
    play() {
        this.paused = false;
    }
    spawn(count, emissionState, matrix) {
        tempQ.setFromRotationMatrix(matrix);
        const translation = tempV;
        const quaternion = tempQ;
        const scale = tempV2;
        matrix.decompose(translation, quaternion, scale);
        for (let i = 0; i < count; i++) {
            this.particleNum++;
            while (this.particles.length < this.particleNum) {
                if (this.rendererSettings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Trail) {
                    this.particles.push(new TrailParticle());
                }
                else {
                    this.particles.push(new SpriteParticle());
                }
            }
            const particle = this.particles[this.particleNum - 1];
            this.startColor.genColor(particle.startColor, Math.random());
            particle.color.copy(particle.startColor);
            particle.startSpeed = this.startSpeed.genValue(emissionState.time / this.duration);
            particle.life = this.startLife.genValue(emissionState.time / this.duration);
            particle.age = 0;
            particle.startSize = this.startSize.genValue(emissionState.time / this.duration);
            particle.uvTile = Math.floor(this.startTileIndex.genValue());
            particle.size = particle.startSize;
            if (this.rendererSettings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Mesh ||
                this.rendererSettings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.BillBoard ||
                this.rendererSettings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.StretchedBillBoard) {
                const sprite = particle;
                if (this.rendererSettings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Mesh) {
                    if (!(sprite.rotation instanceof THREE.Quaternion)) {
                        sprite.rotation = new THREE.Quaternion();
                    }
                    if (this.startRotation.type === 'rotation') {
                        this.startRotation.genValue(sprite.rotation, emissionState.time / this.duration);
                    }
                    else {
                        sprite.rotation.setFromAxisAngle(UP, this.startRotation.genValue((emissionState.time / this.duration)));
                    }
                }
                else {
                    if (this.startRotation.type === 'rotation') {
                        sprite.rotation = 0;
                    }
                    else {
                        sprite.rotation = this.startRotation.genValue(emissionState.time / this.duration);
                    }
                }
            }
            else if (this.rendererSettings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Trail) {
                const trail = particle;
                trail.length = this.rendererEmitterSettings.startLength.genValue(emissionState.time / this.duration);
                trail.reset();
            }
            this.emitterShape.initialize(particle);
            if (this.rendererSettings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Trail &&
                this.rendererEmitterSettings.followLocalOrigin) {
                const trail = particle;
                trail.localPosition = new THREE.Vector3().copy(trail.position);
            }
            if (this.worldSpace) {
                particle.position.applyMatrix4(matrix);
                particle.startSize = (particle.startSize * (Math.abs(scale.x) + Math.abs(scale.y) + Math.abs(scale.z))) / 3;
                particle.size = particle.startSize;
                particle.velocity.multiply(scale).applyMatrix3(this.normalMatrix);
                if (particle.rotation && particle.rotation instanceof THREE.Quaternion) {
                    particle.rotation.multiplyQuaternions(tempQ, particle.rotation);
                }
            }
            else {
                if (this.onlyUsedByOther) {
                    particle.parentMatrix = matrix;
                }
            }
            for (let j = 0; j < this.behaviors.length; j++) {
                this.behaviors[j].initialize(particle);
            }
        }
    }
    endEmit() {
        this.emitEnded = true;
        if (this.autoDestroy) {
            this.markForDestroy = true;
        }
    }
    dispose() {
        if (this._renderer)
            this._renderer.deleteSystem(this);
        this.emitter.dispose();
        if (this.emitter.parent)
            this.emitter.parent.remove(this.emitter);
    }
    restart() {
        this.paused = false;
        this.particleNum = 0;
        this.emissionState.burstIndex = 0;
        this.emissionState.burstWaveIndex = 0;
        this.emissionState.time = 0;
        this.emissionState.waitEmiting = 0;
        this.behaviors.forEach((behavior) => {
            behavior.reset();
        });
        this.emitEnded = false;
        this.markForDestroy = false;
        this.prewarmed = false;
    }
    //firstTimeUpdate = true;
    update(delta) {
        /*if (this.firstTimeUpdate) {
            this.renderer.addSystem(this);
            this.firstTimeUpdate = false;
        }*/
        if (this.paused)
            return;
        let currentParent = this.emitter;
        while (currentParent.parent) {
            currentParent = currentParent.parent;
        }
        if (currentParent.type !== 'Scene') {
            this.dispose();
            return;
        }
        if (this.emitEnded && this.particleNum === 0) {
            if (this.markForDestroy && this.emitter.parent)
                this.dispose();
            return;
        }
        if (this.looping && this.prewarm && !this.prewarmed) {
            this.prewarmed = true;
            for (let i = 0; i < this.duration * PREWARM_FPS; i++) {
                this.update(1.0 / PREWARM_FPS);
            }
        }
        if (this.neededToUpdateRender) {
            if (this._renderer)
                this._renderer.updateSystem(this);
            this.neededToUpdateRender = false;
        }
        if (!this.onlyUsedByOther) {
            this.emit(delta, this.emissionState, this.emitter.matrixWorld);
        }
        // simulate
        for (let j = 0; j < this.behaviors.length; j++) {
            for (let i = 0; i < this.particleNum; i++) {
                if (!this.particles[i].died) {
                    this.behaviors[j].update(this.particles[i], delta);
                }
            }
            this.behaviors[j].frameUpdate(delta);
        }
        for (let i = 0; i < this.particleNum; i++) {
            if (this.rendererEmitterSettings.followLocalOrigin &&
                this.particles[i].localPosition) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                this.particles[i].position.copy(this.particles[i].localPosition);
                if (this.particles[i].parentMatrix) {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    this.particles[i].position.applyMatrix4(this.particles[i].parentMatrix);
                }
                else {
                    this.particles[i].position.applyMatrix4(this.emitter.matrixWorld);
                }
            }
            else {
                this.particles[i].position.addScaledVector(this.particles[i].velocity, delta);
            }
            this.particles[i].age += delta;
        }
        if (this.rendererSettings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Trail) {
            for (let i = 0; i < this.particleNum; i++) {
                const particle = this.particles[i];
                particle.update();
            }
        }
        // particle die
        for (let i = 0; i < this.particleNum; i++) {
            const particle = this.particles[i];
            if (particle.died && (!(particle instanceof TrailParticle) || particle.previous.length === 0)) {
                this.particles[i] = this.particles[this.particleNum - 1];
                this.particles[this.particleNum - 1] = particle;
                this.particleNum--;
                i--;
            }
        }
    }
    emit(delta, emissionState, emitterMatrix) {
        if (emissionState.time > this.duration) {
            if (this.looping) {
                emissionState.time -= this.duration;
                emissionState.burstIndex = 0;
                this.behaviors.forEach((behavior) => {
                    behavior.reset();
                });
            }
            else {
                if (!this.emitEnded && !this.onlyUsedByOther) {
                    this.endEmit();
                }
            }
        }
        this.normalMatrix.getNormalMatrix(emitterMatrix);
        // spawn
        const totalSpawn = Math.ceil(emissionState.waitEmiting);
        this.spawn(totalSpawn, emissionState, emitterMatrix);
        emissionState.waitEmiting -= totalSpawn;
        // spawn burst
        while (emissionState.burstIndex < this.emissionBursts.length &&
            this.emissionBursts[emissionState.burstIndex].time <= emissionState.time) {
            if (Math.random() < this.emissionBursts[emissionState.burstIndex].probability) {
                const count = this.emissionBursts[emissionState.burstIndex].count;
                this.spawn(count, emissionState, emitterMatrix);
            }
            emissionState.burstIndex++;
        }
        if (!this.emitEnded) {
            emissionState.waitEmiting += delta * this.emissionOverTime.genValue(emissionState.time / this.duration);
            if (this.previousWorldPos != undefined) {
                this.emitter.getWorldPosition(this.temp);
                this.travelDistance += this.previousWorldPos.distanceTo(this.temp);
                const emitPerMeter = this.emissionOverDistance.genValue(emissionState.time / this.duration);
                if (this.travelDistance * emitPerMeter > 0) {
                    const count = Math.floor(this.travelDistance * emitPerMeter);
                    this.travelDistance -= count / emitPerMeter;
                    emissionState.waitEmiting += count;
                }
            }
        }
        if (this.previousWorldPos === undefined)
            this.previousWorldPos = new THREE.Vector3();
        this.emitter.getWorldPosition(this.previousWorldPos);
        emissionState.time += delta;
    }
    toJSON(meta, options = {}) {
        const isRootObject = meta === undefined || typeof meta === 'string';
        if (isRootObject) {
            // initialize meta obj
            meta = {
                geometries: {},
                materials: {},
                textures: {},
                images: {},
                shapes: {},
                skeletons: {},
                animations: {},
                nodes: {},
            };
        }
        meta.materials[this.rendererSettings.material.uuid] = this.rendererSettings.material.toJSON(meta);
        if (options.useUrlForImage) {
            if (this.texture.source !== undefined) {
                const image = this.texture.source;
                meta.images[image.uuid] = {
                    uuid: image.uuid,
                    url: this.texture.image.url,
                };
            }
        }
        // TODO: support URL
        let rendererSettingsJSON;
        if (this.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Trail) {
            rendererSettingsJSON = {
                startLength: this.rendererEmitterSettings.startLength.toJSON(),
                followLocalOrigin: this.rendererEmitterSettings.followLocalOrigin,
            };
        }
        else if (this.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Mesh) {
            rendererSettingsJSON = {};
            /*;*/
        }
        else {
            rendererSettingsJSON = {};
        }
        const geometry = this.rendererSettings.instancingGeometry;
        if (meta.geometries && !meta.geometries[geometry.uuid]) {
            meta.geometries[geometry.uuid] = geometry.toJSON();
        }
        return {
            version: '2.0',
            autoDestroy: this.autoDestroy,
            looping: this.looping,
            prewarm: this.prewarm,
            duration: this.duration,
            shape: this.emitterShape.toJSON(),
            startLife: this.startLife.toJSON(),
            startSpeed: this.startSpeed.toJSON(),
            startRotation: this.startRotation.toJSON(),
            startSize: this.startSize.toJSON(),
            startColor: this.startColor.toJSON(),
            emissionOverTime: this.emissionOverTime.toJSON(),
            emissionOverDistance: this.emissionOverDistance.toJSON(),
            emissionBursts: this.emissionBursts,
            onlyUsedByOther: this.onlyUsedByOther,
            instancingGeometry: this.rendererSettings.instancingGeometry.uuid,
            renderOrder: this.renderOrder,
            renderMode: this.renderMode,
            rendererEmitterSettings: rendererSettingsJSON,
            speedFactor: this.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.StretchedBillBoard ? this.speedFactor : 0,
            //texture: this.texture.uuid,
            material: this.rendererSettings.material.uuid,
            layers: this.layers.mask,
            startTileIndex: this.startTileIndex.toJSON(),
            uTileCount: this.uTileCount,
            vTileCount: this.vTileCount,
            behaviors: this.behaviors.map((behavior) => behavior.toJSON()),
            worldSpace: this.worldSpace,
        };
    }
    static fromJSON(json, meta, dependencies) {
        var _a;
        const shape = EmitterFromJSON(json.shape, meta);
        let rendererEmitterSettings;
        if (json.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Trail) {
            rendererEmitterSettings = {
                startLength: json.rendererEmitterSettings.startLength != undefined
                    ? ValueGeneratorFromJSON(json.rendererEmitterSettings.startLength)
                    : new ConstantValue(30),
                followLocalOrigin: json.rendererEmitterSettings.followLocalOrigin,
            };
        }
        else if (json.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Mesh) {
            rendererEmitterSettings = {};
        }
        else {
            rendererEmitterSettings = {};
        }
        const layers = new THREE.Layers();
        if (json.layers) {
            layers.mask = json.layers;
        }
        const ps = new ParticleSystem({
            autoDestroy: json.autoDestroy,
            looping: json.looping,
            prewarm: json.prewarm,
            duration: json.duration,
            shape: shape,
            startLife: ValueGeneratorFromJSON(json.startLife),
            startSpeed: ValueGeneratorFromJSON(json.startSpeed),
            startRotation: GeneratorFromJSON(json.startRotation),
            startSize: ValueGeneratorFromJSON(json.startSize),
            startColor: ColorGeneratorFromJSON(json.startColor),
            emissionOverTime: ValueGeneratorFromJSON(json.emissionOverTime),
            emissionOverDistance: ValueGeneratorFromJSON(json.emissionOverDistance),
            emissionBursts: json.emissionBursts,
            onlyUsedByOther: json.onlyUsedByOther,
            instancingGeometry: meta.geometries[json.instancingGeometry],
            renderMode: json.renderMode,
            rendererEmitterSettings: rendererEmitterSettings,
            renderOrder: json.renderOrder,
            speedFactor: json.speedFactor,
            layers: layers,
            material: json.material
                ? meta.materials[json.material]
                : json.texture
                    ? new THREE.MeshBasicMaterial({
                        map: meta.textures[json.texture],
                        transparent: (_a = json.transparent) !== null && _a !== void 0 ? _a : true,
                        blending: json.blending,
                        side: THREE.DoubleSide,
                    })
                    : new THREE.MeshBasicMaterial({
                        color: 0xffffff,
                        transparent: true,
                        blending: THREE.AdditiveBlending,
                        side: THREE.DoubleSide,
                    }),
            startTileIndex: typeof json.startTileIndex === 'number'
                ? new ConstantValue(json.startTileIndex)
                : ValueGeneratorFromJSON(json.startTileIndex),
            uTileCount: json.uTileCount,
            vTileCount: json.vTileCount,
            behaviors: [],
            worldSpace: json.worldSpace,
        });
        ps.behaviors = json.behaviors.map((behaviorJson) => {
            const behavior = BehaviorFromJSON(behaviorJson, ps);
            if (behavior.type === 'EmitSubParticleSystem') {
                dependencies[behaviorJson.subParticleSystem] = behavior;
            }
            return behavior;
        });
        return ps;
    }
    addBehavior(behavior) {
        this.behaviors.push(behavior);
    }
    getRendererSettings() {
        return this.rendererSettings;
    }
    clone() {
        const newEmissionBursts = [];
        for (const emissionBurst of this.emissionBursts) {
            const newEmissionBurst = {};
            Object.assign(newEmissionBurst, emissionBurst);
            newEmissionBursts.push(newEmissionBurst);
        }
        const newBehaviors = [];
        for (const behavior of this.behaviors) {
            newBehaviors.push(behavior.clone());
        }
        let rendererEmitterSettings;
        if (this.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Trail) {
            rendererEmitterSettings = {
                startLength: this.rendererEmitterSettings.startLength.clone(),
                followLocalOrigin: this.rendererEmitterSettings.followLocalOrigin,
            };
        }
        else {
            rendererEmitterSettings = {};
        }
        const layers = new THREE.Layers();
        layers.mask = this.layers.mask;
        return new ParticleSystem({
            autoDestroy: this.autoDestroy,
            looping: this.looping,
            duration: this.duration,
            shape: this.emitterShape.clone(),
            startLife: this.startLife.clone(),
            startSpeed: this.startSpeed.clone(),
            startRotation: this.startRotation.clone(),
            startSize: this.startSize.clone(),
            startColor: this.startColor.clone(),
            emissionOverTime: this.emissionOverTime.clone(),
            emissionOverDistance: this.emissionOverDistance.clone(),
            emissionBursts: newEmissionBursts,
            onlyUsedByOther: this.onlyUsedByOther,
            instancingGeometry: this.rendererSettings.instancingGeometry,
            renderMode: this.renderMode,
            renderOrder: this.renderOrder,
            rendererEmitterSettings: rendererEmitterSettings,
            speedFactor: this.speedFactor,
            material: this.rendererSettings.material,
            startTileIndex: this.startTileIndex,
            uTileCount: this.uTileCount,
            vTileCount: this.vTileCount,
            behaviors: newBehaviors,
            worldSpace: this.worldSpace,
            layers: layers,
        });
    }
}

var particle_frag = /* glsl */ `

#include <common>
#include <uv_pars_fragment>
#include <color_pars_fragment>
#include <map_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

#include <clipping_planes_fragment>

vec3 outgoingLight = vec3( 0.0 );
vec4 diffuseColor = vColor;

#include <logdepthbuf_fragment>

#ifdef USE_MAP
vec4 texelColor = texture2D( map, vUv);
diffuseColor *= texelColor;
#endif

outgoingLight = diffuseColor.rgb;

gl_FragColor = vec4( outgoingLight, diffuseColor.a );

#include <tonemapping_fragment>

}
`;
/*
    gl_FragColor = vec4(vUv.x, vUv.y, 1.0, 1.0);

    #ifdef USE_MAP
    vec4 texelColor = texture2D( map, vUv);
    diffuseColor *= texelColor;
    #endif

    outgoingLight = diffuseColor.rgb;

    gl_FragColor = vec4( outgoingLight, diffuseColor.a );
*/

var particle_physics_frag = /* glsl */ `
#define STANDARD
#ifdef PHYSICAL
#define IOR
#define SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
uniform float ior;
#endif
#ifdef SPECULAR
uniform float specularIntensity;
uniform vec3 specularColor;
#ifdef USE_SPECULARINTENSITYMAP
uniform sampler2D specularIntensityMap;
#endif
#ifdef USE_SPECULARCOLORMAP
uniform sampler2D specularColorMap;
#endif
#endif
#ifdef USE_CLEARCOAT
uniform float clearcoat;
uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
uniform float iridescence;
uniform float iridescenceIOR;
uniform float iridescenceThicknessMinimum;
uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
uniform vec3 sheenColor;
uniform float sheenRoughness;
#ifdef USE_SHEENCOLORMAP
uniform sampler2D sheenColorMap;
#endif
#ifdef USE_SHEENROUGHNESSMAP
uniform sampler2D sheenRoughnessMap;
#endif
#endif

varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
#include <clipping_planes_fragment>
vec4 diffuseColor = vec4( diffuse, opacity );
ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
vec3 totalEmissiveRadiance = emissive;
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <color_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <roughnessmap_fragment>
#include <metalnessmap_fragment>
#include <normal_fragment_begin>
#include <normal_fragment_maps>
#include <clearcoat_normal_fragment_begin>
#include <clearcoat_normal_fragment_maps>
#include <emissivemap_fragment>
// accumulation
#include <lights_physical_fragment>
#include <lights_fragment_begin>
#include <lights_fragment_maps>
#include <lights_fragment_end>
// modulation
#include <aomap_fragment>
vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
#include <transmission_fragment>
vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
#ifdef USE_SHEEN
// Sheen energy compensation approximation calculation can be found at the end of
    // https://drive.google.com/file/d/1T0D1VSyR4AllqIJTQAraEIzjlb5h4FKH/view?usp=sharing
    float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
    outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
#endif
#ifdef USE_CLEARCOAT
    float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
    vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
    outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
#endif
#include <output_fragment>
#include <tonemapping_fragment>
#include <encodings_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}`;

var particle_vert = /* glsl */ `
#include <common>
#include <color_pars_vertex>
#include <uv_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

attribute vec3 offset;
attribute float rotation;
attribute float size;
attribute float uvTile;

#ifdef UV_TILE
uniform vec2 tileCount;
#endif

void main() {

#ifdef UV_TILE
    vUv = vec2((mod(uvTile, tileCount.x) + uv.x) * (1.0 / tileCount.x), ((tileCount.y - floor(uvTile / tileCount.x) - 1.0) + uv.y) * (1.0 / tileCount.y));
#else
    #include <uv_vertex>
#endif

vec4 mvPosition = modelViewMatrix * vec4( offset, 1.0 );

vec2 alignedPosition = ( position.xy ) * size;

vec2 rotatedPosition;
rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;

mvPosition.xy += rotatedPosition;

vColor = color;

gl_Position = projectionMatrix * mvPosition;

#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>

}
`;
/*
    #ifndef USE_SIZEATTENUATION
        bool isPerspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );
        if ( isPerspective ) computedSize *= - mvPosition.z;
    #endif
    */

var local_particle_vert = /* glsl */ `
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

attribute vec3 offset;
attribute vec4 rotation;
attribute float size;
// attribute vec4 color;
attribute float uvTile;

#ifdef UV_TILE
uniform vec2 tileCount;
#endif

void main() {

#ifdef UV_TILE
    vUv = vec2((mod(uvTile, tileCount.x) + uv.x) * (1.0 / tileCount.x), ((tileCount.y - floor(uvTile / tileCount.x) - 1.0) + uv.y) * (1.0 / tileCount.y));
#else
    #include <uv_vertex>
#endif

float x2 = rotation.x + rotation.x, y2 = rotation.y + rotation.y, z2 = rotation.z + rotation.z;
float xx = rotation.x * x2, xy = rotation.x * y2, xz = rotation.x * z2;
float yy = rotation.y * y2, yz = rotation.y * z2, zz = rotation.z * z2;
float wx = rotation.w * x2, wy = rotation.w * y2, wz = rotation.w * z2;
float sx = size, sy = size, sz = size;

mat4 matrix = mat4(( 1.0 - ( yy + zz ) ) * sx, ( xy + wz ) * sx, ( xz - wy ) * sx, 0.0,  // 1. column
                    ( xy - wz ) * sy, ( 1.0 - ( xx + zz ) ) * sy, ( yz + wx ) * sy, 0.0,  // 2. column
                    ( xz + wy ) * sz, ( yz - wx ) * sz, ( 1.0 - ( xx + yy ) ) * sz, 0.0,  // 3. column
                    offset.x, offset.y, offset.z, 1.0);

vec4 mvPosition = modelViewMatrix * (matrix * vec4( position, 1.0 ));

vColor = color;

gl_Position = projectionMatrix * mvPosition;

#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>

}
`;

var local_particle_physics_vert = /* glsl */ `
#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>

attribute vec3 offset;
attribute vec4 rotation;
attribute float size;
attribute float uvTile;

#ifdef UV_TILE
uniform vec2 tileCount;
#endif

#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {
#ifdef UV_TILE
    vUv = vec2((mod(uvTile, tileCount.x) + uv.x) * (1.0 / tileCount.x), ((tileCount.y - floor(uvTile / tileCount.x) - 1.0) + uv.y) * (1.0 / tileCount.y));
#else
    #include <uv_vertex>
#endif

float x2 = rotation.x + rotation.x, y2 = rotation.y + rotation.y, z2 = rotation.z + rotation.z;
float xx = rotation.x * x2, xy = rotation.x * y2, xz = rotation.x * z2;
float yy = rotation.y * y2, yz = rotation.y * z2, zz = rotation.z * z2;
float wx = rotation.w * x2, wy = rotation.w * y2, wz = rotation.w * z2;
float sx = size, sy = size, sz = size;

mat4 particleMatrix = mat4(( 1.0 - ( yy + zz ) ) * sx, ( xy + wz ) * sx, ( xz - wy ) * sx, 0.0,  // 1. column
                    ( xy - wz ) * sy, ( 1.0 - ( xx + zz ) ) * sy, ( yz + wx ) * sy, 0.0,  // 2. column
                    ( xz + wy ) * sz, ( yz - wx ) * sz, ( 1.0 - ( xx + yy ) ) * sz, 0.0,  // 3. column
                    offset.x, offset.y, offset.z, 1.0);
                    
#include <color_vertex>
#include <morphcolor_vertex>
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>

// replace defaultnormal_vertex
vec3 transformedNormal = objectNormal;
mat3 m = mat3( particleMatrix );
transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
transformedNormal = m * transformedNormal;
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
    transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
    vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
    #ifdef FLIP_SIDED
    transformedTangent = - transformedTangent;
    #endif
#endif

#include <normal_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>

// replace include <project_vertex>
vec4 mvPosition = vec4( transformed, 1.0 );
mvPosition = modelViewMatrix * (particleMatrix * mvPosition);
gl_Position = projectionMatrix * mvPosition;

#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>

vViewPosition = - mvPosition.xyz;

#include <worldpos_vertex>
#include <shadowmap_vertex>
#include <fog_vertex>
#ifdef USE_TRANSMISSION
vWorldPosition = worldPosition.xyz;
#endif
}
`;

var stretched_bb_particle_vert = /* glsl */ `
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

attribute vec3 offset;
attribute float rotation;
attribute float size;
attribute vec3 velocity;
attribute float uvTile;

#ifdef UV_TILE
uniform vec2 tileCount;
#endif

uniform float speedFactor;

void main() {

#ifdef UV_TILE
    vUv = vec2((mod(uvTile, tileCount.x) + uv.x) * (1.0 / tileCount.x), ((tileCount.y - floor(uvTile / tileCount.x) - 1.0) + uv.y) * (1.0 / tileCount.y));
#else
    #include <uv_vertex>
#endif

vec4 mvPosition = modelViewMatrix * vec4( offset, 1.0 );
vec3 viewVelocity = normalMatrix * velocity;

vec3 scaledPos = vec3(position.xy * size, position.z);
mvPosition.xyz += scaledPos + dot(scaledPos, viewVelocity) * viewVelocity / length(viewVelocity) * speedFactor;

vColor = color;

gl_Position = projectionMatrix * mvPosition;

#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>

}
`;
/*

    vec3 instancePos = vec3(position.xy * size, position.z);
    instancePos += dot(instancePos, viewVelocity) * viewVelocity * speedFactor;
    mvPosition.xyz += instancePos;

    vColor = color; //vec4(1, 1, 1, 1); //color; //length(viewVelocity) * 0.1

    #ifndef USE_SIZEATTENUATION
        bool isPerspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );
        if ( isPerspective ) computedSize *= - mvPosition.z;
    #endif
    */

function getMaterialUVChannelName(value) {
    if (value === 0)
        return 'uv';
    return `uv${value}`;
}

new THREE.Vector3(0, 0, 1);
class SpriteBatch extends VFXBatch {
    constructor(settings) {
        super(settings);
        /*
        clone() {
            let system = this.system.clone();
            return system.emitter as any;
        }*/
        this.vector_ = new THREE.Vector3();
        this.vector2_ = new THREE.Vector3();
        this.vector3_ = new THREE.Vector3();
        this.quaternion_ = new THREE.Quaternion();
        this.quaternion2_ = new THREE.Quaternion();
        this.quaternion3_ = new THREE.Quaternion();
        this.rotationMat_ = new THREE.Matrix3();
        this.rotationMat2_ = new THREE.Matrix3();
        this.maxParticles = 1000;
        this.setupBuffers();
        this.rebuildMaterial();
        // TODO: implement boundingVolume
    }
    buildExpandableBuffers() {
        this.offsetBuffer = new THREE.InstancedBufferAttribute(new Float32Array(this.maxParticles * 3), 3);
        this.offsetBuffer.setUsage(THREE.DynamicDrawUsage);
        this.geometry.setAttribute('offset', this.offsetBuffer);
        this.colorBuffer = new THREE.InstancedBufferAttribute(new Float32Array(this.maxParticles * 4), 4);
        this.colorBuffer.setUsage(THREE.DynamicDrawUsage);
        this.geometry.setAttribute('color', this.colorBuffer);
        if (this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Mesh) {
            this.rotationBuffer = new THREE.InstancedBufferAttribute(new Float32Array(this.maxParticles * 4), 4);
            this.rotationBuffer.setUsage(THREE.DynamicDrawUsage);
            this.geometry.setAttribute('rotation', this.rotationBuffer);
        }
        else if (this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.BillBoard ||
            this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.StretchedBillBoard) {
            this.rotationBuffer = new THREE.InstancedBufferAttribute(new Float32Array(this.maxParticles), 1);
            this.rotationBuffer.setUsage(THREE.DynamicDrawUsage);
            this.geometry.setAttribute('rotation', this.rotationBuffer);
        }
        this.sizeBuffer = new THREE.InstancedBufferAttribute(new Float32Array(this.maxParticles), 1);
        this.sizeBuffer.setUsage(THREE.DynamicDrawUsage);
        this.geometry.setAttribute('size', this.sizeBuffer);
        this.uvTileBuffer = new THREE.InstancedBufferAttribute(new Float32Array(this.maxParticles), 1);
        this.uvTileBuffer.setUsage(THREE.DynamicDrawUsage);
        this.geometry.setAttribute('uvTile', this.uvTileBuffer);
        if (this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.StretchedBillBoard) {
            this.velocityBuffer = new THREE.InstancedBufferAttribute(new Float32Array(this.maxParticles * 3), 3);
            this.velocityBuffer.setUsage(THREE.DynamicDrawUsage);
            this.geometry.setAttribute('velocity', this.velocityBuffer);
        }
    }
    setupBuffers() {
        if (this.geometry)
            this.geometry.dispose();
        this.geometry = new THREE.InstancedBufferGeometry();
        this.geometry.setIndex(this.settings.instancingGeometry.getIndex());
        if (this.settings.instancingGeometry.hasAttribute('normal')) {
            this.geometry.setAttribute('normal', this.settings.instancingGeometry.getAttribute('normal'));
        }
        this.geometry.setAttribute('position', this.settings.instancingGeometry.getAttribute('position')); //new InterleavedBufferAttribute(this.interleavedBuffer, 3, 0, false));
        this.geometry.setAttribute('uv', this.settings.instancingGeometry.getAttribute('uv')); //new InterleavedBufferAttribute(this.interleavedBuffer, 2, 3, false));
        this.buildExpandableBuffers();
    }
    expandBuffers(target) {
        while (target >= this.maxParticles) {
            this.maxParticles *= 2;
        }
        this.setupBuffers();
    }
    rebuildMaterial() {
        this.layers.mask = this.settings.layers.mask;
        let uniforms;
        const defines = {};
        if (this.settings.material.type === 'MeshStandardMaterial' ||
            this.settings.material.type === 'MeshPhysicalMaterial') {
            const mat = this.settings.material;
            uniforms = THREE.UniformsUtils.merge([
                THREE.UniformsLib.common,
                THREE.UniformsLib.envmap,
                THREE.UniformsLib.aomap,
                THREE.UniformsLib.lightmap,
                THREE.UniformsLib.emissivemap,
                THREE.UniformsLib.bumpmap,
                THREE.UniformsLib.normalmap,
                THREE.UniformsLib.displacementmap,
                THREE.UniformsLib.roughnessmap,
                THREE.UniformsLib.metalnessmap,
                THREE.UniformsLib.fog,
                THREE.UniformsLib.lights,
                {
                    emissive: { value: /*@__PURE__*/ new THREE.Color(0x000000) },
                    roughness: { value: 1.0 },
                    metalness: { value: 0.0 },
                    envMapIntensity: { value: 1 }, // temporary
                },
            ]);
            uniforms['diffuse'].value = mat.color;
            uniforms['opacity'].value = mat.opacity;
            uniforms['emissive'].value = mat.emissive;
            uniforms['roughness'].value = mat.roughness;
            uniforms['metalness'].value = mat.metalness;
            if (mat.envMap) {
                uniforms['envMap'].value = mat.envMap;
                uniforms['envMapIntensity'].value = mat.envMapIntensity;
            }
            if (mat.normalMap) {
                uniforms['normalMap'].value = mat.normalMap;
                uniforms['normalScale'].value = mat.normalScale;
            }
            if (mat.roughnessMap) {
                uniforms['roughnessMap'].value = mat.roughnessMap;
            }
            if (mat.metalnessMap) {
                uniforms['metalnessMap'].value = mat.metalnessMap;
            }
        }
        else {
            uniforms = {};
            uniforms['map'] = new THREE.Uniform(this.settings.material.map);
        }
        if (this.settings.material.map) {
            defines['USE_MAP'] = '';
            defines['USE_UV'] = '';
            defines['UV_TILE'] = '';
            const uTileCount = this.settings.uTileCount;
            const vTileCount = this.settings.vTileCount;
            defines['MAP_UV'] = getMaterialUVChannelName(this.settings.material.map.channel);
            uniforms['uvTransform'] = new THREE.Uniform(new THREE.Matrix3().copy(this.settings.material.map.matrix));
            uniforms['tileCount'] = new THREE.Uniform(new THREE.Vector2(uTileCount, vTileCount));
        }
        defines['USE_COLOR_ALPHA'] = '';
        let needLights = false;
        if (this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.BillBoard || this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Mesh) {
            let vertexShader;
            let fragmentShader;
            if (this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Mesh) {
                if (this.settings.material.type === 'MeshStandardMaterial' ||
                    this.settings.material.type === 'MeshPhysicalMaterial') {
                    defines['USE_COLOR'] = '';
                    vertexShader = local_particle_physics_vert;
                    fragmentShader = particle_physics_frag;
                    needLights = true;
                }
                else {
                    vertexShader = local_particle_vert;
                    fragmentShader = particle_frag;
                }
            }
            else {
                vertexShader = particle_vert;
                fragmentShader = particle_frag;
            }
            this.material = new THREE.ShaderMaterial({
                uniforms: uniforms,
                defines: defines,
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                transparent: this.settings.material.transparent,
                depthWrite: !this.settings.material.transparent,
                blending: this.settings.material.blending,
                side: this.settings.material.side,
                lights: needLights,
            });
        }
        else if (this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.StretchedBillBoard) {
            uniforms['speedFactor'] = new THREE.Uniform(1.0);
            this.material = new THREE.ShaderMaterial({
                uniforms: uniforms,
                defines: defines,
                vertexShader: stretched_bb_particle_vert,
                fragmentShader: particle_frag,
                transparent: this.settings.material.transparent,
                depthWrite: !this.settings.material.transparent,
                blending: this.settings.material.blending,
                side: this.settings.material.side,
            });
        }
        else {
            throw new Error('render mode unavailable');
        }
    }
    update() {
        let index = 0;
        let particleCount = 0;
        this.systems.forEach((system) => {
            particleCount += system.particleNum;
        });
        if (particleCount > this.maxParticles) {
            this.expandBuffers(particleCount);
        }
        this.systems.forEach((system) => {
            const particles = system.particles;
            const particleNum = system.particleNum;
            const rotation = this.quaternion2_;
            const translation = this.vector2_;
            const scale = this.vector3_;
            system.emitter.matrixWorld.decompose(translation, rotation, scale);
            this.rotationMat_.setFromMatrix4(system.emitter.matrixWorld);
            for (let j = 0; j < particleNum; j++, index++) {
                const particle = particles[j];
                if (this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Mesh) {
                    //this.quaternion_.setFromAxisAngle(UP, particle.rotation as number);
                    let q;
                    if (system.worldSpace) {
                        q = particle.rotation;
                    }
                    else {
                        let parentQ;
                        if (particle.parentMatrix) {
                            parentQ = this.quaternion3_.setFromRotationMatrix(particle.parentMatrix);
                        }
                        else {
                            parentQ = rotation;
                        }
                        q = this.quaternion_;
                        q.copy(particle.rotation).multiply(parentQ);
                    }
                    this.rotationBuffer.setXYZW(index, q.x, q.y, q.z, q.w);
                }
                else if (this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.StretchedBillBoard ||
                    this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.BillBoard) {
                    this.rotationBuffer.setX(index, particle.rotation);
                }
                let vec;
                if (system.worldSpace) {
                    vec = particle.position;
                }
                else {
                    vec = this.vector_;
                    if (particle.parentMatrix) {
                        vec.copy(particle.position).applyMatrix4(particle.parentMatrix);
                    }
                    else {
                        vec.copy(particle.position).applyMatrix4(system.emitter.matrixWorld);
                    }
                }
                this.offsetBuffer.setXYZ(index, vec.x, vec.y, vec.z);
                this.colorBuffer.setXYZW(index, particle.color.x, particle.color.y, particle.color.z, particle.color.w);
                if (system.worldSpace) {
                    this.sizeBuffer.setX(index, particle.size);
                }
                else {
                    if (particle.parentMatrix) {
                        this.sizeBuffer.setX(index, particle.size);
                    }
                    else {
                        this.sizeBuffer.setX(index, (particle.size * (Math.abs(scale.x) + Math.abs(scale.y) + Math.abs(scale.z))) / 3);
                    }
                }
                this.uvTileBuffer.setX(index, particle.uvTile);
                if (this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.StretchedBillBoard && this.velocityBuffer) {
                    const speedFactor = system.speedFactor;
                    let vec;
                    if (system.worldSpace) {
                        vec = particle.velocity;
                    }
                    else {
                        vec = this.vector_;
                        if (particle.parentMatrix) {
                            this.rotationMat2_.setFromMatrix4(particle.parentMatrix);
                            vec.copy(particle.velocity).applyMatrix3(this.rotationMat2_);
                        }
                        else {
                            vec.copy(particle.velocity).applyMatrix3(this.rotationMat_);
                        }
                    }
                    this.velocityBuffer.setXYZ(index, vec.x * speedFactor, vec.y * speedFactor, vec.z * speedFactor);
                }
            }
        });
        this.geometry.instanceCount = index;
        if (index > 0) {
            this.offsetBuffer.updateRange.count = index * 3;
            this.offsetBuffer.needsUpdate = true;
            this.sizeBuffer.updateRange.count = index;
            this.sizeBuffer.needsUpdate = true;
            this.colorBuffer.updateRange.count = index * 4;
            this.colorBuffer.needsUpdate = true;
            this.uvTileBuffer.updateRange.count = index;
            this.uvTileBuffer.needsUpdate = true;
            if (this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.StretchedBillBoard && this.velocityBuffer) {
                this.velocityBuffer.updateRange.count = index * 3;
                this.velocityBuffer.needsUpdate = true;
            }
            if (this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Mesh) {
                this.rotationBuffer.updateRange.count = index * 4;
                this.rotationBuffer.needsUpdate = true;
            }
            else if (this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.StretchedBillBoard ||
                this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.BillBoard) {
                this.rotationBuffer.updateRange.count = index;
                this.rotationBuffer.needsUpdate = true;
            }
        }
    }
    dispose() {
        this.geometry.dispose();
    }
}

var trail_frag = /* glsl */ `

#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

uniform sampler2D alphaMap;
uniform float useAlphaMap;
uniform float visibility;
uniform float alphaTest;
uniform vec2 repeat;

varying vec4 vColor;

void main() {
#include <clipping_planes_fragment>
#include <logdepthbuf_fragment>

vec4 c = vColor;

#ifdef USE_MAP
c *= texture2D( map, vUv * repeat );
#endif
if( useAlphaMap == 1. ) c.a *= texture2D( alphaMap, vUv * repeat ).a;
if( c.a < alphaTest ) discard;
gl_FragColor = c;

#include <fog_fragment>
#include <tonemapping_fragment>
}`;

var trail_vert = /* glsl */ `
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <clipping_planes_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <fog_pars_vertex>

attribute vec3 previous;
attribute vec3 next;
attribute float side;
attribute float width;

uniform vec2 resolution;
uniform float lineWidth;
uniform float sizeAttenuation;

vec2 fix(vec4 i, float aspect) {
vec2 res = i.xy / i.w;
res.x *= aspect;
return res;
}

void main() {

#include <uv_vertex>

float aspect = resolution.x / resolution.y;

vColor = color;

mat4 m = projectionMatrix * modelViewMatrix;
vec4 finalPosition = m * vec4( position, 1.0 );
vec4 prevPos = m * vec4( previous, 1.0 );
vec4 nextPos = m * vec4( next, 1.0 );

vec2 currentP = fix( finalPosition, aspect );
vec2 prevP = fix( prevPos, aspect );
vec2 nextP = fix( nextPos, aspect );

float w = lineWidth * width;

vec2 dir;
if( nextP == currentP ) dir = normalize( currentP - prevP );
else if( prevP == currentP ) dir = normalize( nextP - currentP );
else {
    vec2 dir1 = normalize( currentP - prevP );
    vec2 dir2 = normalize( nextP - currentP );
    dir = normalize( dir1 + dir2 );

    vec2 perp = vec2( -dir1.y, dir1.x );
    vec2 miter = vec2( -dir.y, dir.x );
    //w = clamp( w / dot( miter, perp ), 0., 4., * lineWidth * width );

}

//vec2 normal = ( cross( vec3( dir, 0. ) vec3( 0., 0., 1. ) ) ).xy;
vec4 normal = vec4( -dir.y, dir.x, 0., 1. );
normal.xy *= .5 * w;
normal *= projectionMatrix;
if( sizeAttenuation == 0. ) {
    normal.xy *= finalPosition.w;
    normal.xy /= ( vec4( resolution, 0., 1. ) * projectionMatrix ).xy;
}

finalPosition.xy += normal.xy * side;

gl_Position = finalPosition;

#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>

vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

#include <fog_vertex>
}`;

new THREE.Vector3(0, 0, 1);
class TrailBatch extends VFXBatch {
    constructor(settings) {
        super(settings);
        /*
        clone() {
            let system = this.system.clone();
            return system.emitter as any;
        }*/
        this.vector_ = new THREE.Vector3();
        this.vector2_ = new THREE.Vector3();
        this.vector3_ = new THREE.Vector3();
        this.quaternion_ = new THREE.Quaternion();
        this.maxParticles = 10000;
        this.setupBuffers();
        this.rebuildMaterial();
        // TODO: implement boundingVolume
    }
    setupBuffers() {
        if (this.geometry)
            this.geometry.dispose();
        this.geometry = new THREE.BufferGeometry();
        this.indexBuffer = new THREE.BufferAttribute(new Uint32Array(this.maxParticles * 6), 1);
        this.indexBuffer.setUsage(THREE.DynamicDrawUsage);
        this.geometry.setIndex(this.indexBuffer);
        this.positionBuffer = new THREE.BufferAttribute(new Float32Array(this.maxParticles * 6), 3);
        this.positionBuffer.setUsage(THREE.DynamicDrawUsage);
        this.geometry.setAttribute('position', this.positionBuffer);
        this.previousBuffer = new THREE.BufferAttribute(new Float32Array(this.maxParticles * 6), 3);
        this.previousBuffer.setUsage(THREE.DynamicDrawUsage);
        this.geometry.setAttribute('previous', this.previousBuffer);
        this.nextBuffer = new THREE.BufferAttribute(new Float32Array(this.maxParticles * 6), 3);
        this.nextBuffer.setUsage(THREE.DynamicDrawUsage);
        this.geometry.setAttribute('next', this.nextBuffer);
        this.widthBuffer = new THREE.BufferAttribute(new Float32Array(this.maxParticles * 2), 1);
        this.widthBuffer.setUsage(THREE.DynamicDrawUsage);
        this.geometry.setAttribute('width', this.widthBuffer);
        this.sideBuffer = new THREE.BufferAttribute(new Float32Array(this.maxParticles * 2), 1);
        this.sideBuffer.setUsage(THREE.DynamicDrawUsage);
        this.geometry.setAttribute('side', this.sideBuffer);
        this.uvBuffer = new THREE.BufferAttribute(new Float32Array(this.maxParticles * 4), 2);
        this.uvBuffer.setUsage(THREE.DynamicDrawUsage);
        this.geometry.setAttribute('uv', this.uvBuffer);
        this.colorBuffer = new THREE.BufferAttribute(new Float32Array(this.maxParticles * 8), 4);
        this.colorBuffer.setUsage(THREE.DynamicDrawUsage);
        this.geometry.setAttribute('color', this.colorBuffer);
    }
    expandBuffers(target) {
        while (target >= this.maxParticles) {
            this.maxParticles *= 2;
        }
        this.setupBuffers();
    }
    rebuildMaterial() {
        this.layers.mask = this.settings.layers.mask;
        const uniforms = {
            lineWidth: { value: 1 },
            map: { value: null },
            useMap: { value: 0 },
            alphaMap: { value: null },
            useAlphaMap: { value: 0 },
            resolution: { value: new THREE.Vector2(1, 1) },
            sizeAttenuation: { value: 1 },
            visibility: { value: 1 },
            alphaTest: { value: 0 },
            repeat: { value: new THREE.Vector2(1, 1) },
        };
        const defines = {};
        defines['USE_UV'] = '';
        defines['USE_COLOR_ALPHA'] = '';
        if (this.settings.material.map) {
            defines['USE_MAP'] = '';
            defines['MAP_UV'] = getMaterialUVChannelName(this.settings.material.map.channel);
            uniforms['map'] = new THREE.Uniform(this.settings.material.map);
            uniforms['mapTransform'] = new THREE.Uniform(new THREE.Matrix3().copy(this.settings.material.map.matrix));
        }
        if (this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Trail) {
            this.material = new THREE.ShaderMaterial({
                uniforms: uniforms,
                defines: defines,
                vertexShader: trail_vert,
                fragmentShader: trail_frag,
                transparent: this.settings.material.transparent,
                depthWrite: !this.settings.material.transparent,
                side: this.settings.material.side,
                blending: this.settings.material.blending || THREE.AdditiveBlending,
            });
        }
        else {
            throw new Error('render mode unavailable');
        }
    }
    update() {
        let index = 0;
        let triangles = 0;
        let particleCount = 0;
        this.systems.forEach((system) => {
            for (let j = 0; j < system.particleNum; j++) {
                particleCount += system.particles[j].previous.length * 2;
            }
        });
        if (particleCount > this.maxParticles) {
            this.expandBuffers(particleCount);
        }
        this.systems.forEach((system) => {
            const rotation = this.quaternion_;
            const translation = this.vector2_;
            const scale = this.vector3_;
            system.emitter.matrixWorld.decompose(translation, rotation, scale);
            const particles = system.particles;
            const particleNum = system.particleNum;
            const uTileCount = this.settings.uTileCount;
            const vTileCount = this.settings.vTileCount;
            const tileWidth = 1 / uTileCount;
            const tileHeight = 1 / vTileCount;
            for (let j = 0; j < particleNum; j++) {
                const particle = particles[j];
                const col = particle.uvTile % vTileCount;
                const row = Math.floor(particle.uvTile / vTileCount);
                const iter = particle.previous.values();
                let curIter = iter.next();
                let previous = curIter.value;
                let current = previous;
                if (!curIter.done)
                    curIter = iter.next();
                let next;
                if (curIter.value !== undefined) {
                    next = curIter.value;
                }
                else {
                    next = current;
                }
                for (let i = 0; i < particle.previous.length; i++, index += 2) {
                    this.positionBuffer.setXYZ(index, current.position.x, current.position.y, current.position.z);
                    this.positionBuffer.setXYZ(index + 1, current.position.x, current.position.y, current.position.z);
                    if (system.worldSpace) {
                        this.positionBuffer.setXYZ(index, current.position.x, current.position.y, current.position.z);
                        this.positionBuffer.setXYZ(index + 1, current.position.x, current.position.y, current.position.z);
                    }
                    else {
                        if (particle.parentMatrix) {
                            this.vector_.copy(current.position).applyMatrix4(particle.parentMatrix);
                        }
                        else {
                            this.vector_.copy(current.position).applyMatrix4(system.emitter.matrixWorld);
                        }
                        this.positionBuffer.setXYZ(index, this.vector_.x, this.vector_.y, this.vector_.z);
                        this.positionBuffer.setXYZ(index + 1, this.vector_.x, this.vector_.y, this.vector_.z);
                    }
                    if (system.worldSpace) {
                        this.previousBuffer.setXYZ(index, previous.position.x, previous.position.y, previous.position.z);
                        this.previousBuffer.setXYZ(index + 1, previous.position.x, previous.position.y, previous.position.z);
                    }
                    else {
                        if (particle.parentMatrix) {
                            this.vector_.copy(previous.position).applyMatrix4(particle.parentMatrix);
                        }
                        else {
                            this.vector_.copy(previous.position).applyMatrix4(system.emitter.matrixWorld);
                        }
                        this.previousBuffer.setXYZ(index, this.vector_.x, this.vector_.y, this.vector_.z);
                        this.previousBuffer.setXYZ(index + 1, this.vector_.x, this.vector_.y, this.vector_.z);
                    }
                    if (system.worldSpace) {
                        this.nextBuffer.setXYZ(index, next.position.x, next.position.y, next.position.z);
                        this.nextBuffer.setXYZ(index + 1, next.position.x, next.position.y, next.position.z);
                    }
                    else {
                        if (particle.parentMatrix) {
                            this.vector_.copy(next.position).applyMatrix4(particle.parentMatrix);
                        }
                        else {
                            this.vector_.copy(next.position).applyMatrix4(system.emitter.matrixWorld);
                        }
                        this.nextBuffer.setXYZ(index, this.vector_.x, this.vector_.y, this.vector_.z);
                        this.nextBuffer.setXYZ(index + 1, this.vector_.x, this.vector_.y, this.vector_.z);
                    }
                    this.sideBuffer.setX(index, -1);
                    this.sideBuffer.setX(index + 1, 1);
                    if (system.worldSpace) {
                        this.widthBuffer.setX(index, current.size);
                        this.widthBuffer.setX(index + 1, current.size);
                    }
                    else {
                        if (particle.parentMatrix) {
                            this.widthBuffer.setX(index, current.size);
                            this.widthBuffer.setX(index + 1, current.size);
                        }
                        else {
                            this.widthBuffer.setX(index, (current.size * (Math.abs(scale.x) + Math.abs(scale.y) + Math.abs(scale.z))) / 3);
                            this.widthBuffer.setX(index + 1, (current.size * (Math.abs(scale.x) + Math.abs(scale.y) + Math.abs(scale.z))) / 3);
                        }
                    }
                    this.uvBuffer.setXY(index, (i / particle.previous.length + col) * tileWidth, (vTileCount - row - 1) * tileHeight);
                    this.uvBuffer.setXY(index + 1, (i / particle.previous.length + col) * tileWidth, (vTileCount - row) * tileHeight);
                    this.colorBuffer.setXYZW(index, current.color.x, current.color.y, current.color.z, current.color.w);
                    this.colorBuffer.setXYZW(index + 1, current.color.x, current.color.y, current.color.z, current.color.w);
                    if (i + 1 < particle.previous.length) {
                        this.indexBuffer.setX(triangles * 3, index);
                        this.indexBuffer.setX(triangles * 3 + 1, index + 1);
                        this.indexBuffer.setX(triangles * 3 + 2, index + 2);
                        triangles++;
                        this.indexBuffer.setX(triangles * 3, index + 2);
                        this.indexBuffer.setX(triangles * 3 + 1, index + 1);
                        this.indexBuffer.setX(triangles * 3 + 2, index + 3);
                        triangles++;
                    }
                    previous = current;
                    current = next;
                    if (!curIter.done) {
                        curIter = iter.next();
                        if (curIter.value !== undefined) {
                            next = curIter.value;
                        }
                    }
                }
            }
        });
        this.positionBuffer.updateRange.count = index * 3;
        this.positionBuffer.needsUpdate = true;
        this.previousBuffer.updateRange.count = index * 3;
        this.previousBuffer.needsUpdate = true;
        this.nextBuffer.updateRange.count = index * 3;
        this.nextBuffer.needsUpdate = true;
        this.sideBuffer.updateRange.count = index;
        this.sideBuffer.needsUpdate = true;
        this.widthBuffer.updateRange.count = index;
        this.widthBuffer.needsUpdate = true;
        this.uvBuffer.updateRange.count = index * 2;
        this.uvBuffer.needsUpdate = true;
        this.colorBuffer.updateRange.count = index * 4;
        this.colorBuffer.needsUpdate = true;
        this.indexBuffer.updateRange.count = triangles * 3;
        this.indexBuffer.needsUpdate = true;
        this.geometry.setDrawRange(0, triangles * 3);
    }
    dispose() {
        this.geometry.dispose();
    }
}

class BatchedRenderer extends THREE.Object3D {
    constructor() {
        super();
        this.batches = [];
        this.systemToBatchIndex = new Map();
        this.type = "BatchedRenderer";
    }
    static equals(a, b) {
        return a.material.side === b.material.side &&
            a.material.blending === b.material.blending &&
            a.material.transparent === b.material.transparent &&
            a.material.map === b.material.map &&
            a.renderMode === b.renderMode &&
            a.uTileCount === b.uTileCount &&
            a.vTileCount === b.vTileCount &&
            a.instancingGeometry === b.instancingGeometry &&
            a.renderOrder === b.renderOrder &&
            a.layers.mask === b.layers.mask;
    }
    addSystem(system) {
        system._renderer = this;
        const settings = system.getRendererSettings();
        for (let i = 0; i < this.batches.length; i++) {
            if (BatchedRenderer.equals(this.batches[i].settings, settings)) {
                this.batches[i].addSystem(system);
                this.systemToBatchIndex.set(system, i);
                return;
            }
        }
        let batch;
        switch (settings.renderMode) {
            case gdjs.__particleEmmiter3DExtension.RenderMode.Trail:
                batch = new TrailBatch(settings);
                break;
            case gdjs.__particleEmmiter3DExtension.RenderMode.Mesh:
            case gdjs.__particleEmmiter3DExtension.RenderMode.BillBoard:
            case gdjs.__particleEmmiter3DExtension.RenderMode.StretchedBillBoard:
                batch = new SpriteBatch(settings);
                break;
        }
        batch.addSystem(system);
        this.batches.push(batch);
        this.systemToBatchIndex.set(system, this.batches.length - 1);
        this.add(batch);
    }
    deleteSystem(system) {
        const batchIndex = this.systemToBatchIndex.get(system);
        if (batchIndex != undefined) {
            this.batches[batchIndex].removeSystem(system);
            this.systemToBatchIndex.delete(system);
        }
        /*const settings = system.getRendererSettings();
        for (let i = 0; i < this.batches.length; i++) {
            if (BatchedParticleRenderer.equals(this.batches[i].settings, settings)) {
                this.batches[i].removeSystem(system);
                return;
            }
        }*/
    }
    updateSystem(system) {
        this.deleteSystem(system);
        this.addSystem(system);
    }
    update(delta) {
        this.systemToBatchIndex.forEach((value, ps) => {
            ps.update(delta);
        });
        for (let i = 0; i < this.batches.length; i++) {
            this.batches[i].update();
        }
    }
}

// deprecated
const BatchedParticleRenderer = BatchedRenderer;

class TextureSequencer {
    constructor(scaleX = 0, scaleY = 0, position = new THREE.Vector3()) {
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.position = position;
        this.locations = [];
    }
    transform(position, index) {
        position.x = this.locations[index % this.locations.length].x * this.scaleX + this.position.x;
        position.y = this.locations[index % this.locations.length].y * this.scaleY + this.position.y;
        position.z = this.position.z;
    }
    static fromJSON(json) {
        const textureSequencer = new TextureSequencer(json.scaleX, json.scaleY, new THREE.Vector3(json.position[0], json.position[1], json.position[2]));
        textureSequencer.locations = json.locations.map((loc) => new THREE.Vector2(loc.x, loc.y));
        return textureSequencer;
    }
    clone() {
        const textureSequencer = new TextureSequencer(this.scaleX, this.scaleY, this.position.clone());
        textureSequencer.locations = this.locations.map(loc => loc.clone());
        return textureSequencer;
    }
    toJSON() {
        return {
            scaleX: this.scaleX,
            scaleY: this.scaleY,
            position: this.position,
            locations: this.locations.map(loc => ({
                x: loc.x,
                y: loc.y,
            }))
        };
    }
    fromImage(img, threshold) {
        // Create an empty canvas element
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        // Copy the image contents to the canvas
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            return;
        }
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height, { colorSpace: "srgb" });
        canvas.remove();
        this.locations.length = 0;
        for (let i = 0; i < data.height; i++) {
            for (let j = 0; j < data.width; j++) {
                if (data.data[(i * data.width + j) * 4 + 3] > threshold) {
                    this.locations.push(new THREE.Vector2(j, data.height - i));
                }
            }
        }
        //return data;
        // Get the data-URL formatted image
        // Firefox supports PNG and JPEG. You could check img.src to
        // guess the original format, but be aware the using "image/jpg"
        // will re-encode the image.
        //var dataURL = canvas.toDataURL("image/png");
        //return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }
}

function SequencerFromJSON(json) {
    switch (json.type) {
        case 'TextureSequencer':
            return TextureSequencer.fromJSON(json);
        default:
            return new TextureSequencer();
    }
}

class ApplySequences {
    constructor(delayBetweenParticles) {
        this.type = 'ApplySequences';
        this.sequencers = [];
        this.time = 0;
        this.index = 0;
        this.pCount = 0;
        this.tempV = new THREE.Vector3();
        this.delay = delayBetweenParticles;
    }
    initialize(particle) {
        particle.id = this.pCount;
        particle.dst = new THREE.Vector3();
        particle.begin = new THREE.Vector3();
        particle.inMotion = false;
        this.pCount++;
    }
    reset() {
        this.time = 0;
        this.index = 0;
        this.pCount = 0;
    }
    update(particle, delta) {
        const sequencer = this.sequencers[this.index];
        const delay = particle.id * this.delay;
        if (this.time >= sequencer[0].a + delay && this.time <= sequencer[0].b + delay) {
            if (!particle.inMotion) {
                particle.inMotion = true;
                particle.begin.copy(particle.position);
                sequencer[1].transform(particle.dst, particle.id);
            }
            particle.position.lerpVectors(particle.begin, particle.dst, ApplySequences.BEZIER.genValue((this.time - sequencer[0].a - delay) / (sequencer[0].b - sequencer[0].a)));
        }
        else if (this.time > sequencer[0].b + delay) {
            particle.inMotion = false;
        }
    }
    frameUpdate(delta) {
        while (this.index + 1 < this.sequencers.length && this.time >= this.sequencers[this.index + 1][0].a) {
            this.index++;
        }
        this.time += delta;
    }
    appendSequencer(range, sequencer) {
        this.sequencers.push([range, sequencer]);
    }
    toJSON() {
        return {
            type: this.type,
            delay: this.delay,
            sequencers: this.sequencers.map(([range, sequencer]) => ({
                range: range.toJSON(),
                sequencer: sequencer.toJSON(),
            })),
        };
    }
    static fromJSON(json) {
        const seq = new ApplySequences(json.delay);
        json.sequencers.forEach((sequencerJson) => {
            seq.sequencers.push([ValueGeneratorFromJSON(sequencerJson.range), SequencerFromJSON(sequencerJson.sequencer)]);
        });
        return seq;
    }
    clone() {
        const applySequences = new ApplySequences(this.delay);
        applySequences.sequencers = this.sequencers.map(seq => [seq[0].clone(), seq[1].clone()]);
        return applySequences;
    }
}
ApplySequences.BEZIER = new Bezier(0, 0, 1, 1);

let physicsResolver;
function setPhysicsResolver(resolver) {
    physicsResolver = resolver;
}
function getPhysicsResolver() {
    return physicsResolver;
}
class ApplyCollision {
    constructor(resolver, bounce) {
        this.resolver = resolver;
        this.bounce = bounce;
        this.type = 'ApplyCollision';
        this.tempV = new THREE.Vector3();
    }
    initialize(particle) {
    }
    update(particle, delta) {
        if (this.resolver.resolve(particle.position, this.tempV)) {
            particle.velocity.reflect(this.tempV).multiplyScalar(this.bounce);
        }
    }
    frameUpdate(delta) {
    }
    toJSON() {
        return {
            type: this.type,
            bounce: this.bounce,
        };
    }
    static fromJSON(json) {
        return new ApplyCollision(getPhysicsResolver(), json.bounce);
    }
    clone() {
        return new ApplyCollision(this.resolver, this.bounce);
    }
    reset() {
    }
}

class QuarksLoader extends THREE.ObjectLoader {
    /*manager: LoadingManager;
    crossOrigin: string = "anonymous";
    path?: string;
    resourcePath: string;
*/
    constructor(manager) {
        super(manager);
        //this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;
        //this.resourcePath = '';
    }
    linkReference(object) {
        const objectsMap = {};
        object.traverse(function (child) {
            objectsMap[child.uuid] = child;
        });
        object.traverse(function (child) {
            if (child.type === "ParticleEmitter") {
                const system = child.system;
                system.emitterShape;
                /*if (shape instanceof MeshSurfaceEmitter) {
                    shape.geometry = objectsMap[shape.geometry as any] as Mesh;
                }*/
                for (let i = 0; i < system.behaviors.length; i++) {
                    if (system.behaviors[i] instanceof EmitSubParticleSystem) {
                        system.behaviors[i].subParticleSystem = objectsMap[system.behaviors[i].subParticleSystem];
                    }
                }
            }
        });
    }
    parse(json, onLoad) {
        const object = super.parse(json, onLoad);
        this.linkReference(object);
        return object;
    }
    // @ts-ignore
    parseObject(data, geometries, materials, textures, animations) {
        let object;
        function getGeometry(name) {
            if (geometries[name] === undefined) {
                console.warn('THREE.ObjectLoader: Undefined geometry', name);
            }
            return geometries[name];
        }
        function getMaterial(name) {
            if (name === undefined)
                return undefined;
            if (Array.isArray(name)) {
                const array = [];
                for (let i = 0, l = name.length; i < l; i++) {
                    const uuid = name[i];
                    if (materials[uuid] === undefined) {
                        console.warn('THREE.ObjectLoader: Undefined material', uuid);
                    }
                    array.push(materials[uuid]);
                }
                return array;
            }
            if (materials[name] === undefined) {
                console.warn('THREE.ObjectLoader: Undefined material', name);
            }
            return materials[name];
        }
        function getTexture(uuid) {
            if (textures[uuid] === undefined) {
                console.warn('THREE.ObjectLoader: Undefined texture', uuid);
            }
            return textures[uuid];
        }
        let geometry, material;
        const meta = {
            textures: textures,
            geometries: geometries,
            materials: materials,
        };
        const dependencies = {};
        switch (data.type) {
            case 'ParticleEmitter':
                object = ParticleSystem.fromJSON(data.ps, meta, dependencies).emitter;
                break;
            case 'Scene':
                object = new THREE.Scene();
                if (data.background !== undefined) {
                    if (Number.isInteger(data.background)) {
                        object.background = new THREE.Color(data.background);
                    }
                    else {
                        object.background = getTexture(data.background);
                    }
                }
                if (data.environment !== undefined) {
                    object.environment = getTexture(data.environment);
                }
                if (data.fog !== undefined) {
                    if (data.fog.type === 'Fog') {
                        object.fog = new THREE.Fog(data.fog.color, data.fog.near, data.fog.far);
                    }
                    else if (data.fog.type === 'FogExp2') {
                        object.fog = new THREE.FogExp2(data.fog.color, data.fog.density);
                    }
                }
                if (data.backgroundBlurriness !== undefined)
                    object.backgroundBlurriness = data.backgroundBlurriness;
                break;
            case 'PerspectiveCamera':
                object = new THREE.PerspectiveCamera(data.fov, data.aspect, data.near, data.far);
                if (data.focus !== undefined)
                    object.focus = data.focus;
                if (data.zoom !== undefined)
                    object.zoom = data.zoom;
                if (data.filmGauge !== undefined)
                    object.filmGauge = data.filmGauge;
                if (data.filmOffset !== undefined)
                    object.filmOffset = data.filmOffset;
                if (data.view !== undefined)
                    object.view = Object.assign({}, data.view);
                break;
            case 'OrthographicCamera':
                object = new THREE.OrthographicCamera(data.left, data.right, data.top, data.bottom, data.near, data.far);
                if (data.zoom !== undefined)
                    object.zoom = data.zoom;
                if (data.view !== undefined)
                    object.view = Object.assign({}, data.view);
                break;
            case 'AmbientLight':
                object = new THREE.AmbientLight(data.color, data.intensity);
                break;
            case 'DirectionalLight':
                object = new THREE.DirectionalLight(data.color, data.intensity);
                break;
            case 'PointLight':
                object = new THREE.PointLight(data.color, data.intensity, data.distance, data.decay);
                break;
            case 'RectAreaLight':
                object = new THREE.RectAreaLight(data.color, data.intensity, data.width, data.height);
                break;
            case 'SpotLight':
                object = new THREE.SpotLight(data.color, data.intensity, data.distance, data.angle, data.penumbra, data.decay);
                break;
            case 'HemisphereLight':
                object = new THREE.HemisphereLight(data.color, data.groundColor, data.intensity);
                break;
            case 'LightProbe':
                object = new THREE.LightProbe().fromJSON(data);
                break;
            case 'SkinnedMesh':
                geometry = getGeometry(data.geometry);
                material = getMaterial(data.material);
                object = new THREE.SkinnedMesh(geometry, material);
                if (data.bindMode !== undefined)
                    object.bindMode = data.bindMode;
                if (data.bindMatrix !== undefined)
                    object.bindMatrix.fromArray(data.bindMatrix);
                if (data.skeleton !== undefined)
                    object.skeleton = data.skeleton;
                break;
            case 'Mesh':
                geometry = getGeometry(data.geometry);
                material = getMaterial(data.material);
                object = new THREE.Mesh(geometry, material);
                break;
            case 'InstancedMesh': {
                geometry = getGeometry(data.geometry);
                material = getMaterial(data.material);
                const count = data.count;
                const instanceMatrix = data.instanceMatrix;
                const instanceColor = data.instanceColor;
                object = new THREE.InstancedMesh(geometry, material, count);
                object.instanceMatrix = new THREE.InstancedBufferAttribute(new Float32Array(instanceMatrix.array), 16);
                if (instanceColor !== undefined)
                    object.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(instanceColor.array), instanceColor.itemSize);
                break;
            }
            case 'LOD':
                object = new THREE.LOD();
                break;
            case 'Line':
                object = new THREE.Line(getGeometry(data.geometry), getMaterial(data.material));
                break;
            case 'LineLoop':
                object = new THREE.LineLoop(getGeometry(data.geometry), getMaterial(data.material));
                break;
            case 'LineSegments':
                object = new THREE.LineSegments(getGeometry(data.geometry), getMaterial(data.material));
                break;
            case 'PointCloud':
            case 'Points':
                object = new THREE.Points(getGeometry(data.geometry), getMaterial(data.material));
                break;
            case 'Sprite':
                object = new THREE.Sprite(getMaterial(data.material));
                break;
            case 'Group':
                object = new THREE.Group();
                break;
            case 'Bone':
                object = new THREE.Bone();
                break;
            default:
                object = new THREE.Object3D();
        }
        object.uuid = data.uuid;
        if (data.name !== undefined)
            object.name = data.name;
        if (data.matrix !== undefined) {
            object.matrix.fromArray(data.matrix);
            if (data.matrixAutoUpdate !== undefined)
                object.matrixAutoUpdate = data.matrixAutoUpdate;
            if (object.matrixAutoUpdate)
                object.matrix.decompose(object.position, object.quaternion, object.scale);
        }
        else {
            if (data.position !== undefined)
                object.position.fromArray(data.position);
            if (data.rotation !== undefined)
                object.rotation.fromArray(data.rotation);
            if (data.quaternion !== undefined)
                object.quaternion.fromArray(data.quaternion);
            if (data.scale !== undefined)
                object.scale.fromArray(data.scale);
        }
        if (data.castShadow !== undefined)
            object.castShadow = data.castShadow;
        if (data.receiveShadow !== undefined)
            object.receiveShadow = data.receiveShadow;
        if (data.shadow) {
            if (data.shadow.bias !== undefined)
                object.shadow.bias = data.shadow.bias;
            if (data.shadow.normalBias !== undefined)
                object.normalBias = data.shadow.normalBias;
            if (data.shadow.radius !== undefined)
                object.radius = data.shadow.radius;
            if (data.shadow.mapSize !== undefined)
                object.mapSize.fromArray(data.shadow.mapSize);
            if (data.shadow.camera !== undefined) { // @ts-ignore
                object.camera = this.parseObject(data.shadow.camera);
            }
        }
        if (data.visible !== undefined)
            object.visible = data.visible;
        if (data.frustumCulled !== undefined)
            object.frustumCulled = data.frustumCulled;
        if (data.renderOrder !== undefined)
            object.renderOrder = data.renderOrder;
        if (data.userData !== undefined)
            object.userData = data.userData;
        if (data.layers !== undefined)
            object.layers.mask = data.layers;
        if (data.children !== undefined) {
            const children = data.children;
            for (let i = 0; i < children.length; i++) {
                object.add(this.parseObject(children[i], geometries, materials, textures, animations));
            }
        }
        if (data.animations !== undefined) {
            const objectAnimations = data.animations;
            for (let i = 0; i < objectAnimations.length; i++) {
                const uuid = objectAnimations[i];
                object.animations.push(animations[uuid]);
            }
        }
        if (data.type === 'LOD') {
            if (data.autoUpdate !== undefined)
                object.autoUpdate = data.autoUpdate;
            const levels = data.levels;
            for (let l = 0; l < levels.length; l++) {
                const level = levels[l];
                const child = object.getObjectByProperty('uuid', level.object);
                if (child !== undefined) {
                    // @ts-ignore
                    object.addLevel(child, level.distance);
                }
            }
        }
        // @ts-ignore
        return object;
    }
}

const Plugins = [];
function loadPlugin(plugin) {
    const existing = Plugins.find(item => item.id === plugin.id);
    if (!existing) {
        plugin.initialize();
        for (const emitterShape of plugin.emitterShapes) {
            if (!EmitterShapes[emitterShape.type]) {
                EmitterShapes[emitterShape.type] = emitterShape;
            }
        }
        for (const behavior of plugin.behaviors) {
            if (!BehaviorTypes[behavior.type]) {
                BehaviorTypes[behavior.type] = behavior;
            }
        }
    }
}
function unloadPlugin(pluginId) {
    const plugin = Plugins.find(item => item.id === pluginId);
    if (plugin) {
        for (const emitterShape of plugin.emitterShapes) {
            if (EmitterShapes[emitterShape.type]) {
                delete EmitterShapes[emitterShape.type];
            }
        }
        for (const behavior of plugin.behaviors) {
            if (BehaviorTypes[behavior.type]) {
                delete BehaviorTypes[behavior.type];
            }
        }
    }
}

gdjs.__particleEmmiter3DExtension.NodeValueType = void 0;
(function (NodeValueType) {
    NodeValueType[NodeValueType["Number"] = 0] = "Number";
    NodeValueType[NodeValueType["Vec2"] = 1] = "Vec2";
    NodeValueType[NodeValueType["Vec3"] = 2] = "Vec3";
    NodeValueType[NodeValueType["Vec4"] = 3] = "Vec4";
    NodeValueType[NodeValueType["Boolean"] = 4] = "Boolean";
    NodeValueType[NodeValueType["AnyType"] = 5] = "AnyType";
})(gdjs.__particleEmmiter3DExtension.NodeValueType || (gdjs.__particleEmmiter3DExtension.NodeValueType = {}));
const genDefaultForNodeValueType = (type) => {
    switch (type) {
        case gdjs.__particleEmmiter3DExtension.NodeValueType.Boolean:
            return false;
        case gdjs.__particleEmmiter3DExtension.NodeValueType.Number:
            return 0;
        case gdjs.__particleEmmiter3DExtension.NodeValueType.Vec2:
            return new THREE.Vector2();
        case gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3:
            return new THREE.Vector3();
        case gdjs.__particleEmmiter3DExtension.NodeValueType.Vec4:
            return new THREE.Vector4();
        case gdjs.__particleEmmiter3DExtension.NodeValueType.AnyType:
            return 0;
    }
};

class Node {
    constructor(type) {
        this.inputs = [];
        this.outputs = [];
        this.data = {};
        // display
        this.position = new THREE.Vector2();
        // execution
        this.outputValues = [];
        this.id = "" + Math.round(Math.random() * 100000); //TODO use real random
        this.type = type;
        for (let i = 0; i < type.inputTypes.length; i++) {
            this.inputs.push(undefined);
        }
        for (let i = 0; i < type.outputTypes.length; i++) {
            this.outputs.push(undefined);
            this.outputValues.push(genDefaultForNodeValueType(type.outputTypes[i]));
        }
    }
}
class Wire {
    constructor(input, inputIndex, output, outputIndex) {
        this.input = input;
        this.inputIndex = inputIndex;
        this.input.outputs[inputIndex] = this;
        this.output = output;
        this.outputIndex = outputIndex;
        this.output.inputs[outputIndex] = this;
    }
}

class Interpreter {
    constructor() {
        this.visited = new Set();
        Interpreter.Instance = this;
    }
    traverse(node) {
        if (this.context_ === undefined) {
            throw new Error("context is undefined");
        }
        if (this.graph_ === undefined) {
            throw new Error("graph is undefined");
        }
        this.visited.add(node.id);
        const inputValues = [];
        for (let i = 0; i < node.inputs.length; i++) {
            if (node.inputs[i] instanceof Wire) {
                const inputNode = node.inputs[i].input;
                //if (inputNode) {
                if (!this.visited.has(inputNode.id)) {
                    this.traverse(inputNode);
                }
                inputValues.push(inputNode.outputValues[node.inputs[i].inputIndex]);
                /*} else {
                    throw new Error(`Node ${node.id} has not inputs`);
                }*/
            }
            else {
                inputValues.push(node.inputs[i].getValue(this.context_));
            }
        }
        // calculation
        node.type.func(this.context_, inputValues, node.outputValues);
        this.graph_.nodesInOrder.push(node);
    }
    executeCompiledGraph() {
        if (this.context_ === undefined) {
            throw new Error("context is undefined");
        }
        if (this.graph_ === undefined) {
            throw new Error("graph is undefined");
        }
        const nodes = this.graph_.nodesInOrder;
        for (let i = 0; i < nodes.length; i++) {
            const inputValues = [];
            const node = nodes[i];
            for (let j = 0; j < node.inputs.length; j++) {
                if (node.inputs[j] instanceof Wire) {
                    inputValues.push(node.inputs[j].input.outputValues[node.inputs[j].inputIndex]);
                }
                else if (node.inputs[j] !== undefined) {
                    inputValues.push(node.inputs[j].getValue(this.context_));
                }
                else {
                    throw new Error(`miss input for node ${node.id}`);
                }
            }
            node.type.func(this.context_, inputValues, node.outputValues);
        }
    }
    run(graph, context) {
        this.graph_ = graph;
        this.context_ = context;
        if (graph.compiled) {
            this.executeCompiledGraph();
        }
        else {
            graph.nodesInOrder.length = 0;
            this.visited.clear();
            for (let i = 0; i < graph.outputNodes.length; i++) {
                const node = graph.outputNodes[i];
                this.traverse(node);
            }
            graph.compiled = true;
        }
    }
}

class NodeType {
    constructor(name, func, inputTypes, outputTypes) {
        this.inputTypes = [];
        this.outputTypes = [];
        this.name = name;
        this.func = func;
        this.inputTypes = inputTypes;
        this.outputTypes = outputTypes;
    }
}
class GraphNodeType extends NodeType {
    constructor(nodeGraph) {
        const inputTypes = [];
        for (let i = 0; i < nodeGraph.inputNodes.length; i++) {
            if (nodeGraph.inputNodes[i].type.name === 'input') {
                inputTypes.push(nodeGraph.inputNodes[i].data.type);
            }
        }
        const outputTypes = [];
        for (let i = 0; i < nodeGraph.outputNodes.length; i++) {
            if (nodeGraph.outputNodes[i].type.name === 'output') {
                outputTypes.push(nodeGraph.outputNodes[i].data.type);
            }
        }
        super(nodeGraph.name, (context, inputs, outputs) => {
            context.inputs = inputs;
            context.outputs = outputs;
            Interpreter.Instance.run(nodeGraph, context);
        }, inputTypes, outputTypes);
        this.nodeGraph = nodeGraph;
    }
}

const NodeTypes = {
    "add": new NodeType("add", (context, inputs, outputs) => {
        if (typeof inputs[0] === 'number') {
            outputs[0] = inputs[0] + inputs[1];
        }
        else if (inputs[0] instanceof THREE.Vector3 || inputs[0] instanceof THREE.Vector2 || inputs[0] instanceof THREE.Vector4) {
            outputs[0].addVectors(inputs[0], inputs[1]);
        }
    }, [gdjs.__particleEmmiter3DExtension.NodeValueType.AnyType, gdjs.__particleEmmiter3DExtension.NodeValueType.AnyType], [gdjs.__particleEmmiter3DExtension.NodeValueType.AnyType]),
    "sub": new NodeType("sub", (context, inputs, outputs) => {
        if (typeof inputs[0] === 'number') {
            outputs[0] = inputs[0] - inputs[1];
        }
        else if (inputs[0] instanceof THREE.Vector3 || inputs[0] instanceof THREE.Vector2 || inputs[0] instanceof THREE.Vector4) {
            outputs[0].subVectors(inputs[0], inputs[1]);
        }
    }, [gdjs.__particleEmmiter3DExtension.NodeValueType.AnyType, gdjs.__particleEmmiter3DExtension.NodeValueType.AnyType], [gdjs.__particleEmmiter3DExtension.NodeValueType.AnyType]),
    "mul": new NodeType("mul", (context, inputs, outputs) => {
        if (typeof inputs[0] === 'number') {
            outputs[0] = inputs[0] * inputs[1];
        }
        else if (inputs[0] instanceof THREE.Vector3 || inputs[0] instanceof THREE.Vector2 || inputs[0] instanceof THREE.Vector4) {
            outputs[0].multiplyVectors(inputs[0], inputs[1]);
        }
    }, [gdjs.__particleEmmiter3DExtension.NodeValueType.AnyType, gdjs.__particleEmmiter3DExtension.NodeValueType.AnyType], [gdjs.__particleEmmiter3DExtension.NodeValueType.AnyType]),
    "div": new NodeType("div", (context, inputs, outputs) => {
        if (typeof inputs[0] === 'number') {
            outputs[0] = inputs[0] / inputs[1];
        }
        else if (inputs[0] instanceof THREE.Vector3 || inputs[0] instanceof THREE.Vector2 || inputs[0] instanceof THREE.Vector4) {
            outputs[0].copy(inputs[0]).divide(inputs[1]);
        }
    }, [gdjs.__particleEmmiter3DExtension.NodeValueType.AnyType, gdjs.__particleEmmiter3DExtension.NodeValueType.AnyType], [gdjs.__particleEmmiter3DExtension.NodeValueType.AnyType]),
    "curve": new NodeType("curve", (context, inputs, outputs) => {
        //outputs[0] = inputs[0] + inputs[1];
    }, [], []),
    "vrand": new NodeType("vrand", (context, inputs, outputs) => {
        //outputs[0] = inputs[0] + inputs[1];
    }, [], []),
    "curveSample": new NodeType("curveSample", (context, inputs, outputs) => {
        //outputs[0] = inputs[0] + inputs[1];
    }, [], []),
    "random": new NodeType("random", (context, inputs, outputs) => {
        outputs[0] = Math.random() * (inputs[1] - inputs[0]) + inputs[0];
    }, [gdjs.__particleEmmiter3DExtension.NodeValueType.Number, gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number]),
    "input": new NodeType("input", (context, inputs, outputs) => {
        outputs[0] = inputs[0];
    }, [gdjs.__particleEmmiter3DExtension.NodeValueType.AnyType], [gdjs.__particleEmmiter3DExtension.NodeValueType.AnyType]),
    "output": new NodeType("output", (context, inputs, outputs) => {
        outputs[0] = inputs[0];
    }, [gdjs.__particleEmmiter3DExtension.NodeValueType.AnyType], [gdjs.__particleEmmiter3DExtension.NodeValueType.AnyType]),
};

class NodeGraph {
    constructor(name) {
        this.inputNodes = [];
        this.outputNodes = [];
        this.allNodes = new Map();
        this.wires = [];
        this.compiled = false;
        this.nodesInOrder = [];
        this.version = "1.0";
        this.id = "" + Math.round(Math.random() * 100000); //TODO use real random
        this.name = name;
    }
    addWire(wire) {
        this.wires.push(wire);
    }
    addNode(node) {
        //this.nodes.push(node);
        this.allNodes.set(node.id, node);
        if (node.type === NodeTypes['input']) {
            this.inputNodes.push(node);
        }
        else if (node.type === NodeTypes['output']) {
            this.outputNodes.push(node);
        }
    }
    getNode(id) {
        return this.allNodes.get(id);
    }
    deleteNode(node) {
        /*let index = this.nodes.indexOf(node);
        if (index != -1) {
            this.nodes[index] = this.nodes[this.nodes.length - 1];
            this.nodes.pop();
        }*/
        this.allNodes.delete(node.id);
    }
    deleteWire(wire) {
        wire.input.outputs[wire.inputIndex] = undefined;
        wire.output.inputs[wire.outputIndex] = undefined;
        const index = this.wires.indexOf(wire);
        if (index != -1) {
            this.wires[index] = this.wires[this.wires.length - 1];
            this.wires.pop();
        }
    }
    toJSON() {
        throw new Error("not implemented");
    }
    clone() {
        throw new Error("not implemented");
    }
}

gdjs.__particleEmmiter3DExtension.ApplyCollision = ApplyCollision;
gdjs.__particleEmmiter3DExtension.ApplyForce = ApplyForce;
gdjs.__particleEmmiter3DExtension.ApplySequences = ApplySequences;
gdjs.__particleEmmiter3DExtension.AxisAngleGenerator = AxisAngleGenerator;
gdjs.__particleEmmiter3DExtension.BatchedParticleRenderer = BatchedParticleRenderer;
gdjs.__particleEmmiter3DExtension.BatchedRenderer = BatchedRenderer;
gdjs.__particleEmmiter3DExtension.BehaviorFromJSON = BehaviorFromJSON;
gdjs.__particleEmmiter3DExtension.BehaviorTypes = BehaviorTypes;
gdjs.__particleEmmiter3DExtension.Bezier = Bezier;
gdjs.__particleEmmiter3DExtension.ChangeEmitDirection = ChangeEmitDirection;
gdjs.__particleEmmiter3DExtension.ColorGeneratorFromJSON = ColorGeneratorFromJSON;
gdjs.__particleEmmiter3DExtension.ColorOverLife = ColorOverLife;
gdjs.__particleEmmiter3DExtension.ColorRange = ColorRange;
gdjs.__particleEmmiter3DExtension.ConeEmitter = ConeEmitter;
gdjs.__particleEmmiter3DExtension.ConstantColor = ConstantColor;
gdjs.__particleEmmiter3DExtension.ConstantValue = ConstantValue;
gdjs.__particleEmmiter3DExtension.DonutEmitter = DonutEmitter;
gdjs.__particleEmmiter3DExtension.EmitSubParticleSystem = EmitSubParticleSystem;
gdjs.__particleEmmiter3DExtension.EmitterFromJSON = EmitterFromJSON;
gdjs.__particleEmmiter3DExtension.EmitterShapes = EmitterShapes;
gdjs.__particleEmmiter3DExtension.EulerGenerator = EulerGenerator;
gdjs.__particleEmmiter3DExtension.ForceOverLife = ForceOverLife;
gdjs.__particleEmmiter3DExtension.FrameOverLife = FrameOverLife;
gdjs.__particleEmmiter3DExtension.GeneratorFromJSON = GeneratorFromJSON;
gdjs.__particleEmmiter3DExtension.Gradient = Gradient;
gdjs.__particleEmmiter3DExtension.GraphNodeType = GraphNodeType;
gdjs.__particleEmmiter3DExtension.GravityForce = GravityForce;
gdjs.__particleEmmiter3DExtension.GridEmitter = GridEmitter;
gdjs.__particleEmmiter3DExtension.Interpreter = Interpreter;
gdjs.__particleEmmiter3DExtension.IntervalValue = IntervalValue;
gdjs.__particleEmmiter3DExtension.MeshSurfaceEmitter = MeshSurfaceEmitter;
gdjs.__particleEmmiter3DExtension.Node = Node;
gdjs.__particleEmmiter3DExtension.NodeGraph = NodeGraph;
gdjs.__particleEmmiter3DExtension.NodeType = NodeType;
gdjs.__particleEmmiter3DExtension.NodeTypes = NodeTypes;
gdjs.__particleEmmiter3DExtension.Noise = Noise;
gdjs.__particleEmmiter3DExtension.OrbitOverLife = OrbitOverLife;
gdjs.__particleEmmiter3DExtension.ParticleEmitter = ParticleEmitter;
gdjs.__particleEmmiter3DExtension.ParticleSystem = ParticleSystem;
gdjs.__particleEmmiter3DExtension.PiecewiseBezier = PiecewiseBezier;
gdjs.__particleEmmiter3DExtension.PiecewiseFunction = PiecewiseFunction;
gdjs.__particleEmmiter3DExtension.Plugins = Plugins;
gdjs.__particleEmmiter3DExtension.PointEmitter = PointEmitter;
gdjs.__particleEmmiter3DExtension.QuarksLoader = QuarksLoader;
gdjs.__particleEmmiter3DExtension.RandomColor = RandomColor;
gdjs.__particleEmmiter3DExtension.RandomColorBetweenGradient = RandomColorBetweenGradient;
gdjs.__particleEmmiter3DExtension.RandomQuatGenerator = RandomQuatGenerator;
gdjs.__particleEmmiter3DExtension.RecordState = RecordState;
gdjs.__particleEmmiter3DExtension.Rotation3DOverLife = Rotation3DOverLife;
gdjs.__particleEmmiter3DExtension.RotationGeneratorFromJSON = RotationGeneratorFromJSON;
gdjs.__particleEmmiter3DExtension.RotationOverLife = RotationOverLife;
gdjs.__particleEmmiter3DExtension.SequencerFromJSON = SequencerFromJSON;
gdjs.__particleEmmiter3DExtension.SizeOverLife = SizeOverLife;
gdjs.__particleEmmiter3DExtension.SpeedOverLife = SpeedOverLife;
gdjs.__particleEmmiter3DExtension.SphereEmitter = SphereEmitter;
gdjs.__particleEmmiter3DExtension.SpriteBatch = SpriteBatch;
gdjs.__particleEmmiter3DExtension.SpriteParticle = SpriteParticle;
gdjs.__particleEmmiter3DExtension.TextureSequencer = TextureSequencer;
gdjs.__particleEmmiter3DExtension.TrailBatch = TrailBatch;
gdjs.__particleEmmiter3DExtension.TrailParticle = TrailParticle;
gdjs.__particleEmmiter3DExtension.TurbulenceField = TurbulenceField;
gdjs.__particleEmmiter3DExtension.VFXBatch = VFXBatch;
gdjs.__particleEmmiter3DExtension.ValueGeneratorFromJSON = ValueGeneratorFromJSON;
gdjs.__particleEmmiter3DExtension.WidthOverLength = WidthOverLength;
gdjs.__particleEmmiter3DExtension.Wire = Wire;
gdjs.__particleEmmiter3DExtension.genDefaultForNodeValueType = genDefaultForNodeValueType;
gdjs.__particleEmmiter3DExtension.getPhysicsResolver = getPhysicsResolver;
gdjs.__particleEmmiter3DExtension.loadPlugin = loadPlugin;
gdjs.__particleEmmiter3DExtension.setPhysicsResolver = setPhysicsResolver;
gdjs.__particleEmmiter3DExtension.unloadPlugin = unloadPlugin;

};
gdjs.evtsExt__ParticleEmitter3D__DefineHelperClasses.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__ParticleEmitter3D__DefineHelperClasses.userFunc0xd51768(runtimeScene, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};gdjs.evtsExt__ParticleEmitter3D__DefineHelperClasses.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableBoolean(runtimeScene.getGame().getVariables().get("_ParticleEmmiter3DExtension_ClassesDefined"), false);
if (isConditionTrue_0) {
{gdjs.evtTools.variable.setVariableBoolean(runtimeScene.getGame().getVariables().get("_ParticleEmmiter3DExtension_ClassesDefined"), true);
}
{ //Subevents
gdjs.evtsExt__ParticleEmitter3D__DefineHelperClasses.eventsList0(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};

gdjs.evtsExt__ParticleEmitter3D__DefineHelperClasses.func = function(runtimeScene, parentEventsFunctionContext) {
var eventsFunctionContext = {
  _objectsMap: {
},
  _objectArraysMap: {
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("ParticleEmitter3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("ParticleEmitter3D"),
  localVariables: [],
  getObjects: function(objectName) {
    return eventsFunctionContext._objectArraysMap[objectName] || [];
  },
  getObjectsLists: function(objectName) {
    return eventsFunctionContext._objectsMap[objectName] || null;
  },
  getBehaviorName: function(behaviorName) {
    return eventsFunctionContext._behaviorNamesMap[behaviorName] || behaviorName;
  },
  createObject: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    if (objectsList) {
      const object = parentEventsFunctionContext ?
        parentEventsFunctionContext.createObject(objectsList.firstKey()) :
        runtimeScene.createObject(objectsList.firstKey());
      if (object) {
        objectsList.get(objectsList.firstKey()).push(object);
        eventsFunctionContext._objectArraysMap[objectName].push(object);
      }
      return object;    }
    return null;
  },
  getInstancesCountOnScene: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    let count = 0;
    if (objectsList) {
      for(const objectName in objectsList.items)
        count += parentEventsFunctionContext ?
parentEventsFunctionContext.getInstancesCountOnScene(objectName) :
        runtimeScene.getInstancesCountOnScene(objectName);
    }
    return count;
  },
  getLayer: function(layerName) {
    return runtimeScene.getLayer(layerName);
  },
  getArgument: function(argName) {
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};


gdjs.evtsExt__ParticleEmitter3D__DefineHelperClasses.eventsList1(runtimeScene, eventsFunctionContext);


return;
}

gdjs.evtsExt__ParticleEmitter3D__DefineHelperClasses.registeredGdjsCallbacks = [];