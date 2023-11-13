import { defineComponent, resolveComponent, openBlock, createElementBlock, Fragment, renderList, createBlock, createSlots, withCtx, createCommentVNode, renderSlot, ref, reactive, watch, resolveDirective, withDirectives, mergeProps, unref, createVNode, createTextVNode, toDisplayString, normalizeClass, createElementVNode, withModifiers, vShow, isRef } from "vue";
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
var freeGlobal$1 = freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal$1 || freeSelf || Function("return this")();
var root$1 = root;
var Symbol$1 = root$1.Symbol;
var Symbol$2 = Symbol$1;
var objectProto$d = Object.prototype;
var hasOwnProperty$a = objectProto$d.hasOwnProperty;
var nativeObjectToString$1 = objectProto$d.toString;
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty$a.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var objectProto$c = Object.prototype;
var nativeObjectToString = objectProto$c.toString;
function objectToString(value) {
  return nativeObjectToString.call(value);
}
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var isArray = Array.isArray;
var isArray$1 = isArray;
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
function identity(value) {
  return value;
}
var asyncTag = "[object AsyncFunction]", funcTag$2 = "[object Function]", genTag$1 = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}
var coreJsData = root$1["__core-js_shared__"];
var coreJsData$1 = coreJsData;
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var funcProto$2 = Function.prototype;
var funcToString$2 = funcProto$2.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$2.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto$1 = Function.prototype, objectProto$b = Object.prototype;
var funcToString$1 = funcProto$1.toString;
var hasOwnProperty$9 = objectProto$b.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString$1.call(hasOwnProperty$9).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
var WeakMap = getNative(root$1, "WeakMap");
var WeakMap$1 = WeakMap;
var objectCreate = Object.create;
var baseCreate = function() {
  function object() {
  }
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
}();
var baseCreate$1 = baseCreate;
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
function copyArray(source, array) {
  var index = -1, length = source.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
var HOT_COUNT = 800, HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut(func) {
  var count = 0, lastCalled = 0;
  return function() {
    var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(void 0, arguments);
  };
}
function constant(value) {
  return function() {
    return value;
  };
}
var defineProperty = function() {
  try {
    var func = getNative(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
}();
var defineProperty$1 = defineProperty;
var baseSetToString = !defineProperty$1 ? identity : function(func, string) {
  return defineProperty$1(func, "toString", {
    "configurable": true,
    "enumerable": false,
    "value": constant(string),
    "writable": true
  });
};
var baseSetToString$1 = baseSetToString;
var setToString = shortOut(baseSetToString$1);
var setToString$1 = setToString;
function arrayEach(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}
var MAX_SAFE_INTEGER$1 = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
function baseAssignValue(object, key, value) {
  if (key == "__proto__" && defineProperty$1) {
    defineProperty$1(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var objectProto$a = Object.prototype;
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$8.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1, length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}
var nativeMax = Math.max;
function overRest(func, start, transform) {
  start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
  return function() {
    var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}
function baseRest(func, start) {
  return setToString$1(overRest(func, start, identity), func + "");
}
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
    return eq(object[index], value);
  }
  return false;
}
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
    customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? void 0 : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}
var objectProto$9 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$9;
  return value === proto;
}
function baseTimes(n, iteratee) {
  var index = -1, result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
var argsTag$2 = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$2;
}
var objectProto$8 = Object.prototype;
var hasOwnProperty$7 = objectProto$8.hasOwnProperty;
var propertyIsEnumerable$1 = objectProto$8.propertyIsEnumerable;
var isArguments = baseIsArguments(function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$7.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
};
var isArguments$1 = isArguments;
function stubFalse() {
  return false;
}
var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;
var Buffer$1 = moduleExports$2 ? root$1.Buffer : void 0;
var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse;
var isBuffer$1 = isBuffer;
var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$2 = "[object Boolean]", dateTag$2 = "[object Date]", errorTag$1 = "[object Error]", funcTag$1 = "[object Function]", mapTag$4 = "[object Map]", numberTag$2 = "[object Number]", objectTag$3 = "[object Object]", regexpTag$2 = "[object RegExp]", setTag$4 = "[object Set]", stringTag$2 = "[object String]", weakMapTag$2 = "[object WeakMap]";
var arrayBufferTag$2 = "[object ArrayBuffer]", dataViewTag$3 = "[object DataView]", float32Tag$2 = "[object Float32Array]", float64Tag$2 = "[object Float64Array]", int8Tag$2 = "[object Int8Array]", int16Tag$2 = "[object Int16Array]", int32Tag$2 = "[object Int32Array]", uint8Tag$2 = "[object Uint8Array]", uint8ClampedTag$2 = "[object Uint8ClampedArray]", uint16Tag$2 = "[object Uint16Array]", uint32Tag$2 = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$2] = typedArrayTags[boolTag$2] = typedArrayTags[dataViewTag$3] = typedArrayTags[dateTag$2] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$4] = typedArrayTags[numberTag$2] = typedArrayTags[objectTag$3] = typedArrayTags[regexpTag$2] = typedArrayTags[setTag$4] = typedArrayTags[stringTag$2] = typedArrayTags[weakMapTag$2] = false;
function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
var freeProcess = moduleExports$1 && freeGlobal$1.process;
var nodeUtil = function() {
  try {
    var types = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e) {
  }
}();
var nodeUtil$1 = nodeUtil;
var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
var isTypedArray$1 = isTypedArray;
var objectProto$7 = Object.prototype;
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray$1(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer$1(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$6.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var nativeKeys = overArg(Object.keys, Object);
var nativeKeys$1 = nativeKeys;
var objectProto$6 = Object.prototype;
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys$1(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$5.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var objectProto$5 = Object.prototype;
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty$4.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
var nativeCreate = getNative(Object, "create");
var nativeCreate$1 = nativeCreate;
function hashClear() {
  this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
  this.size = 0;
}
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
var objectProto$4 = Object.prototype;
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate$1) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? void 0 : result;
  }
  return hasOwnProperty$3.call(data, key) ? data[key] : void 0;
}
var objectProto$3 = Object.prototype;
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate$1 ? data[key] !== void 0 : hasOwnProperty$2.call(data, key);
}
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate$1 && value === void 0 ? HASH_UNDEFINED : value;
  return this;
}
function Hash(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
function listCacheGet(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  return index < 0 ? void 0 : data[index][1];
}
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
function listCacheSet(key, value) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
function ListCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
var Map = getNative(root$1, "Map");
var Map$1 = Map;
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$1 || ListCache)(),
    "string": new Hash()
  };
}
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
function mapCacheDelete(key) {
  var result = getMapData(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
function mapCacheSet(key, value) {
  var data = getMapData(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
function MapCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
function arrayPush(array, values) {
  var index = -1, length = values.length, offset = array.length;
  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}
var getPrototype = overArg(Object.getPrototypeOf, Object);
var getPrototype$1 = getPrototype;
var objectTag$2 = "[object Object]";
var funcProto = Function.prototype, objectProto$2 = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
var objectCtorString = funcToString.call(Object);
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag$2) {
    return false;
  }
  var proto = getPrototype$1(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$1.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}
function stackDelete(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
function stackGet(key) {
  return this.__data__.get(key);
}
function stackHas(key) {
  return this.__data__.has(key);
}
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map$1 || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}
Stack.prototype.clear = stackClear;
Stack.prototype["delete"] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer = moduleExports ? root$1.Buffer : void 0, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
  buffer.copy(result);
  return result;
}
function arrayFilter(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
function stubArray() {
  return [];
}
var objectProto$1 = Object.prototype;
var propertyIsEnumerable = objectProto$1.propertyIsEnumerable;
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols$1 ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols$1(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
var getSymbols$1 = getSymbols;
function copySymbols(source, object) {
  return copyObject(source, getSymbols$1(source), object);
}
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols$1(object));
    object = getPrototype$1(object);
  }
  return result;
};
var getSymbolsIn$1 = getSymbolsIn;
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn$1(source), object);
}
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$1(object) ? result : arrayPush(result, symbolsFunc(object));
}
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols$1);
}
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn$1);
}
var DataView = getNative(root$1, "DataView");
var DataView$1 = DataView;
var Promise$1 = getNative(root$1, "Promise");
var Promise$2 = Promise$1;
var Set = getNative(root$1, "Set");
var Set$1 = Set;
var mapTag$3 = "[object Map]", objectTag$1 = "[object Object]", promiseTag = "[object Promise]", setTag$3 = "[object Set]", weakMapTag$1 = "[object WeakMap]";
var dataViewTag$2 = "[object DataView]";
var dataViewCtorString = toSource(DataView$1), mapCtorString = toSource(Map$1), promiseCtorString = toSource(Promise$2), setCtorString = toSource(Set$1), weakMapCtorString = toSource(WeakMap$1);
var getTag = baseGetTag;
if (DataView$1 && getTag(new DataView$1(new ArrayBuffer(1))) != dataViewTag$2 || Map$1 && getTag(new Map$1()) != mapTag$3 || Promise$2 && getTag(Promise$2.resolve()) != promiseTag || Set$1 && getTag(new Set$1()) != setTag$3 || WeakMap$1 && getTag(new WeakMap$1()) != weakMapTag$1) {
  getTag = function(value) {
    var result = baseGetTag(value), Ctor = result == objectTag$1 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag$2;
        case mapCtorString:
          return mapTag$3;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag$3;
        case weakMapCtorString:
          return weakMapTag$1;
      }
    }
    return result;
  };
}
var getTag$1 = getTag;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function initCloneArray(array) {
  var length = array.length, result = new array.constructor(length);
  if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}
var Uint8Array = root$1.Uint8Array;
var Uint8Array$1 = Uint8Array;
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer));
  return result;
}
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var reFlags = /\w*$/;
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
var symbolProto = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", mapTag$2 = "[object Map]", numberTag$1 = "[object Number]", regexpTag$1 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$1 = "[object String]", symbolTag$1 = "[object Symbol]";
var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag$1 = "[object Float32Array]", float64Tag$1 = "[object Float64Array]", int8Tag$1 = "[object Int8Array]", int16Tag$1 = "[object Int16Array]", int32Tag$1 = "[object Int32Array]", uint8Tag$1 = "[object Uint8Array]", uint8ClampedTag$1 = "[object Uint8ClampedArray]", uint16Tag$1 = "[object Uint16Array]", uint32Tag$1 = "[object Uint32Array]";
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$1:
      return cloneArrayBuffer(object);
    case boolTag$1:
    case dateTag$1:
      return new Ctor(+object);
    case dataViewTag$1:
      return cloneDataView(object, isDeep);
    case float32Tag$1:
    case float64Tag$1:
    case int8Tag$1:
    case int16Tag$1:
    case int32Tag$1:
    case uint8Tag$1:
    case uint8ClampedTag$1:
    case uint16Tag$1:
    case uint32Tag$1:
      return cloneTypedArray(object, isDeep);
    case mapTag$2:
      return new Ctor();
    case numberTag$1:
    case stringTag$1:
      return new Ctor(object);
    case regexpTag$1:
      return cloneRegExp(object);
    case setTag$2:
      return new Ctor();
    case symbolTag$1:
      return cloneSymbol(object);
  }
}
function initCloneObject(object) {
  return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate$1(getPrototype$1(object)) : {};
}
var mapTag$1 = "[object Map]";
function baseIsMap(value) {
  return isObjectLike(value) && getTag$1(value) == mapTag$1;
}
var nodeIsMap = nodeUtil$1 && nodeUtil$1.isMap;
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
var isMap$1 = isMap;
var setTag$1 = "[object Set]";
function baseIsSet(value) {
  return isObjectLike(value) && getTag$1(value) == setTag$1;
}
var nodeIsSet = nodeUtil$1 && nodeUtil$1.isSet;
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
var isSet$1 = isSet;
var CLONE_DEEP_FLAG$1 = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG$1 = 4;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result, isDeep = bitmask & CLONE_DEEP_FLAG$1, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG$1;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== void 0) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray$1(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag$1(value), isFunc = tag == funcTag || tag == genTag;
    if (isBuffer$1(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || isFunc && !object) {
      result = isFlat || isFunc ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  stack || (stack = new Stack());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);
  if (isSet$1(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap$1(value)) {
    value.forEach(function(subValue, key2) {
      result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
    });
  }
  var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
  var props = isArr ? void 0 : keysFunc(value);
  arrayEach(props || value, function(subValue, key2) {
    if (props) {
      key2 = subValue;
      subValue = value[key2];
    }
    assignValue(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
  });
  return result;
}
var CLONE_DEEP_FLAG = 1, CLONE_SYMBOLS_FLAG = 4;
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}
var baseFor = createBaseFor();
var baseFor$1 = baseFor;
function assignMergeValue(object, key, value) {
  if (value !== void 0 && !eq(object[key], value) || value === void 0 && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}
function safeGet(object, key) {
  if (key === "constructor" && typeof object[key] === "function") {
    return;
  }
  if (key == "__proto__") {
    return;
  }
  return object[key];
}
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
  var isCommon = newValue === void 0;
  if (isCommon) {
    var isArr = isArray$1(srcValue), isBuff = !isArr && isBuffer$1(srcValue), isTyped = !isArr && !isBuff && isTypedArray$1(srcValue);
    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray$1(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      } else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      } else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      } else {
        newValue = [];
      }
    } else if (isPlainObject(srcValue) || isArguments$1(srcValue)) {
      newValue = objValue;
      if (isArguments$1(objValue)) {
        newValue = toPlainObject(objValue);
      } else if (!isObject(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    } else {
      isCommon = false;
    }
  }
  if (isCommon) {
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack["delete"](srcValue);
  }
  assignMergeValue(object, key, newValue);
}
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor$1(source, function(srcValue, key) {
    stack || (stack = new Stack());
    if (isObject(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    } else {
      var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
      if (newValue === void 0) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}
var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});
var merge$1 = merge;
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$5 = defineComponent({
  name: "column-list",
  props: {
    columns: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    let { columns } = props;
    return {
      columns
    };
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_column_list = resolveComponent("column-list");
  const _component_el_table_column = resolveComponent("el-table-column");
  return openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.columns, (column) => {
    return openBlock(), createBlock(_component_el_table_column, {
      key: column.dataIndex,
      prop: column.dataIndex,
      label: column.title,
      width: column.width,
      fixed: column.fixed,
      sortable: column.sortable,
      resizable: column.resizable,
      align: column.align,
      "class-name": column["class-name"]
    }, createSlots({
      default: withCtx(() => [
        column.children && column.children.length ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          column.children ? (openBlock(), createBlock(_component_column_list, {
            key: 0,
            columns: column.children
          }, null, 8, ["columns"])) : createCommentVNode("", true)
        ], 64)) : createCommentVNode("", true)
      ]),
      _: 2
    }, [
      column.scopedSlots ? {
        name: "default",
        fn: withCtx((scope) => [
          renderSlot(_ctx.$slots, column.scopedSlots, { data: scope })
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["prop", "label", "width", "fixed", "sortable", "resizable", "align", "class-name"]);
  }), 128);
}
var ColumnList = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$1]]);
var index_vue_vue_type_style_index_0_scoped_true_lang$3 = "";
const _sfc_main$4 = defineComponent({
  __name: "index",
  props: {
    tableConfig: {
      type: Object,
      default: () => {
      }
    },
    tableData: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const props = __props;
    let baseConfig = {
      loading: false,
      height: null,
      "max-height": null,
      stripe: true,
      border: false,
      size: "default",
      "show-header": true,
      "highlight-current-row": false,
      "empty-text": "\u6682\u65E0\u6570\u636E",
      "show-summary": false,
      "sum-text": "\u603B\u8BA1",
      "table-layout": "fixed",
      "show-overflow-tooltip": false,
      pagination: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      background: true,
      functions: {}
    };
    let slotList = ref([]);
    let indexMethod = (index) => {
      let { pageSize, currentPage } = baseConfig;
      return pageSize * (currentPage - 1) + index + 1;
    };
    let paginationConfig = reactive({});
    let type = ref("");
    watch(
      () => [props.tableConfig, props.columns],
      (value) => {
        let [tableConfig, columns] = value;
        baseConfig = merge$1(baseConfig, tableConfig);
        type.value = baseConfig.type || "";
        if (type.value == "radio") {
          baseConfig["highlight-current-row"] = true;
        }
        if (baseConfig.pagination) {
          let { currentPage, pageSize, total, background, layout } = baseConfig;
          paginationConfig.currentPage = currentPage;
          paginationConfig.pageSize = pageSize;
          paginationConfig.total = total;
          paginationConfig.background = background;
          paginationConfig.layout = layout;
        }
        slotList.value = columns.filter((el) => el.scopedSlots).map((el) => el.scopedSlots);
      },
      {
        immediate: true,
        deep: true
      }
    );
    const tableRef = ref();
    const checkBoxValue = ref([]);
    const handleSelectionChange = (val) => {
      checkBoxValue.value = val;
      if (baseConfig.functions["selectChange"]) {
        baseConfig.functions["selectChange"](val);
      }
    };
    const radioValue = ref("");
    const handleCurrentChange = (val) => {
      if (type.value == "radio") {
        radioValue.value = val[baseConfig["row-key"]];
        if (baseConfig.functions["selectChange"]) {
          baseConfig.functions["selectChange"](val);
        }
      }
    };
    let tableRowClassName = (row) => {
      if (baseConfig.functions["tableRowClassName"]) {
        return baseConfig.functions["tableRowClassName"](row);
      } else {
        return baseConfig["row-class-name"];
      }
    };
    return (_ctx, _cache) => {
      const _component_el_table_column = resolveComponent("el-table-column");
      const _component_el_radio = resolveComponent("el-radio");
      const _component_el_table = resolveComponent("el-table");
      const _component_my_pagination = resolveComponent("my-pagination");
      const _directive_loading = resolveDirective("loading");
      return openBlock(), createElementBlock(Fragment, null, [
        withDirectives((openBlock(), createBlock(_component_el_table, mergeProps({
          ref_key: "tableRef",
          ref: tableRef
        }, _ctx.$attrs, {
          data: __props.tableData,
          height: unref(baseConfig).height,
          "max-height": unref(baseConfig)["max-height"],
          stripe: unref(baseConfig).stripe,
          border: unref(baseConfig).border,
          size: unref(baseConfig).size,
          "show-header": unref(baseConfig)["show-header"],
          "highlight-current-row": unref(baseConfig)["highlight-current-row"],
          "row-class-name": unref(tableRowClassName),
          "row-key": unref(baseConfig)["row-key"],
          "empty-text": unref(baseConfig)["empty-text"],
          "show-summary": unref(baseConfig)["show-summary"],
          "sum-text": unref(baseConfig)["sum-text"],
          "summary-method": unref(baseConfig)["summary-method"],
          "span-method": unref(baseConfig)["span-method"],
          "table-layout": unref(baseConfig)["table-layout"],
          "show-overflow-tooltip": unref(baseConfig)["show-overflow-tooltip"],
          style: { width: "100%" },
          onSelectionChange: handleSelectionChange,
          onCurrentChange: handleCurrentChange
        }), {
          default: withCtx(() => [
            unref(baseConfig).index ? (openBlock(), createBlock(_component_el_table_column, {
              key: 0,
              type: "index",
              index: unref(indexMethod),
              width: "50",
              align: "center"
            }, null, 8, ["index"])) : createCommentVNode("", true),
            unref(type) ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              unref(type) == "checkBox" ? (openBlock(), createBlock(_component_el_table_column, {
                key: 0,
                type: "selection",
                width: "50",
                align: "center"
              })) : (openBlock(), createBlock(_component_el_table_column, {
                key: 1,
                width: "50",
                align: "center"
              }, {
                header: withCtx(() => []),
                default: withCtx((scope) => [
                  createVNode(_component_el_radio, {
                    label: scope.row[unref(baseConfig)["row-key"]],
                    modelValue: radioValue.value,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => radioValue.value = $event),
                    class: "jw_radio"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(""))
                    ]),
                    _: 2
                  }, 1032, ["label", "modelValue"])
                ]),
                _: 1
              }))
            ], 64)) : createCommentVNode("", true),
            createVNode(ColumnList, { columns: __props.columns }, createSlots({ _: 2 }, [
              renderList(unref(slotList), (item) => {
                return {
                  name: item,
                  fn: withCtx((scope) => [
                    renderSlot(_ctx.$slots, item, {
                      data: scope.data
                    }, void 0, true)
                  ])
                };
              })
            ]), 1032, ["columns"])
          ]),
          _: 3
        }, 16, ["data", "height", "max-height", "stripe", "border", "size", "show-header", "highlight-current-row", "row-class-name", "row-key", "empty-text", "show-summary", "sum-text", "summary-method", "span-method", "table-layout", "show-overflow-tooltip"])), [
          [_directive_loading, unref(baseConfig).loading]
        ]),
        unref(baseConfig).pagination && __props.tableData.length ? (openBlock(), createBlock(_component_my_pagination, {
          key: 0,
          paginationConfig: unref(paginationConfig),
          functions: unref(baseConfig).functions,
          class: normalizeClass(["marginT24", unref(baseConfig).paginationClassName])
        }, null, 8, ["paginationConfig", "functions", "class"])) : createCommentVNode("", true)
      ], 64);
    };
  }
});
var Table = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-79e68bb9"]]);
const TablePlugin = {
  install(app) {
    app.component("my-table", Table);
  }
};
var index_vue_vue_type_style_index_0_scoped_true_lang$2 = "";
const _hoisted_1$1 = { class: "dialog-footer" };
const _sfc_main$3 = defineComponent({
  __name: "index",
  props: {
    dialogConfig: {
      type: Object,
      default: () => {
      }
    }
  },
  setup(__props) {
    const props = __props;
    let baseDialog = {
      visible: false,
      title: "",
      modal: true,
      "show-close": true,
      "align-center": true,
      "z-index": 2001,
      "destroy-on-close": true,
      type: "",
      footer: true
    };
    const visible = ref(false);
    const dialogRef = ref();
    watch(
      props.dialogConfig,
      (value) => {
        baseDialog = merge$1(baseDialog, value);
        visible.value = baseDialog.visible;
      }
    );
    const handleClose = () => {
      if (baseDialog.functions && baseDialog.functions.handleClose) {
        baseDialog.functions.handleClose();
      }
    };
    const handleSave = () => {
      if (baseDialog.functions && baseDialog.functions.handleSave) {
        baseDialog.functions.handleSave();
      }
    };
    return (_ctx, _cache) => {
      const _component_el_button = resolveComponent("el-button");
      const _component_el_dialog = resolveComponent("el-dialog");
      return openBlock(), createBlock(_component_el_dialog, mergeProps({
        ref_key: "dialogRef",
        ref: dialogRef,
        modelValue: visible.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => visible.value = $event)
      }, _ctx.$attrs, {
        title: unref(baseDialog).title,
        width: unref(baseDialog).width,
        fullscreen: unref(baseDialog).fullscreen,
        modal: unref(baseDialog).modal,
        "modal-class": unref(baseDialog)["modal-class"],
        draggable: unref(baseDialog).draggable,
        "align-center": unref(baseDialog)["align-center"],
        "destroy-on-close": unref(baseDialog)["destroy-on-close"],
        "z-index": unref(baseDialog)["z-index"],
        "custom-class": unref(baseDialog)["custom-class"],
        class: "jw_dialog",
        "append-to-body": false,
        "before-close": handleClose
      }), createSlots({
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "content", {}, void 0, true)
        ]),
        _: 2
      }, [
        unref(baseDialog).footer ? {
          name: "footer",
          fn: withCtx(() => [
            createElementVNode("span", _hoisted_1$1, [
              createVNode(_component_el_button, { onClick: handleClose }, {
                default: withCtx(() => [
                  createTextVNode(" \u53D6\u6D88 ")
                ]),
                _: 1
              }),
              unref(baseDialog).type == "del" ? (openBlock(), createBlock(_component_el_button, {
                key: 0,
                type: "danger",
                onClick: handleSave
              }, {
                default: withCtx(() => [
                  createTextVNode(" \u5220\u9664 ")
                ]),
                _: 1
              })) : (openBlock(), createBlock(_component_el_button, {
                key: 1,
                type: "primary",
                onClick: handleSave
              }, {
                default: withCtx(() => [
                  createTextVNode(" \u786E\u5B9A ")
                ]),
                _: 1
              }))
            ])
          ]),
          key: "0"
        } : void 0
      ]), 1040, ["modelValue", "title", "width", "fullscreen", "modal", "modal-class", "draggable", "align-center", "destroy-on-close", "z-index", "custom-class"]);
    };
  }
});
var Dialog = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-279e5f56"]]);
const DialogPlugin = {
  install(app) {
    app.component("my-dialog", Dialog);
  }
};
var index_vue_vue_type_style_index_0_scoped_true_lang$1 = "";
const _sfc_main$2 = defineComponent({
  __name: "index",
  props: {
    paginationConfig: {
      type: Object,
      default: () => {
      }
    },
    functions: {
      type: Object,
      default: () => {
      }
    }
  },
  setup(__props) {
    const props = __props;
    let baseConfig = reactive({
      currentPage: 1,
      pageSize: 10,
      total: 0,
      background: true,
      layout: "total, sizes, prev, pager, next, jumper"
    });
    watch(
      props.paginationConfig,
      (value) => {
        let { currentPage, pageSize, total, background, layout } = value;
        baseConfig.currentPage = currentPage || 1;
        baseConfig.pageSize = pageSize || 10;
        baseConfig.total = total || 0;
        baseConfig.background = background || true;
        baseConfig.layout = layout || baseConfig.layout;
      },
      {
        immediate: true,
        deep: true
      }
    );
    const handleCurrentChange = (val) => {
      if (props.functions && props.functions.handleCurrentChange) {
        props.functions.handleCurrentChange(val);
      }
    };
    const handleSizeChange = (val) => {
      if (props.functions && props.functions.handleCurrentChange) {
        props.functions.handleSizeChange(val);
      }
    };
    return (_ctx, _cache) => {
      const _component_el_pagination = resolveComponent("el-pagination");
      return openBlock(), createBlock(_component_el_pagination, mergeProps(_ctx.$attrs, {
        "current-page": unref(baseConfig).currentPage,
        "onUpdate:currentPage": _cache[0] || (_cache[0] = ($event) => unref(baseConfig).currentPage = $event),
        "page-size": unref(baseConfig).pageSize,
        "onUpdate:pageSize": _cache[1] || (_cache[1] = ($event) => unref(baseConfig).pageSize = $event),
        background: unref(baseConfig).background,
        layout: unref(baseConfig).layout,
        total: unref(baseConfig).total,
        onCurrentChange: handleCurrentChange,
        onSizeChange: handleSizeChange
      }), null, 16, ["current-page", "page-size", "background", "layout", "total"]);
    };
  }
});
var Pagination = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-9766214c"]]);
const PaginationPlugin = {
  install(app) {
    app.component("my-pagination", Pagination);
  }
};
var formItem_vue_vue_type_style_index_0_lang = "";
const _sfc_main$1 = defineComponent({
  props: {
    item: {
      type: Object,
      default: () => {
      }
    },
    formState: {
      type: Object,
      default: () => {
      }
    },
    methods: {
      type: Object,
      default: () => {
      }
    }
  },
  setup(props) {
    let { item, formState, methods } = props;
    return {
      item,
      formState,
      methods
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = resolveComponent("el-input");
  const _component_el_input_number = resolveComponent("el-input-number");
  const _component_el_radio = resolveComponent("el-radio");
  const _component_el_radio_group = resolveComponent("el-radio-group");
  const _component_el_checkbox = resolveComponent("el-checkbox");
  const _component_el_checkbox_group = resolveComponent("el-checkbox-group");
  const _component_el_option = resolveComponent("el-option");
  const _component_el_select = resolveComponent("el-select");
  const _component_el_tree_select = resolveComponent("el-tree-select");
  const _component_el_cascader = resolveComponent("el-cascader");
  const _component_el_switch = resolveComponent("el-switch");
  const _component_el_date_picker = resolveComponent("el-date-picker");
  const _component_el_time_picker = resolveComponent("el-time-picker");
  const _component_el_time_select = resolveComponent("el-time-select");
  return _ctx.item.type == "input" || _ctx.item.type == "hidden" ? (openBlock(), createBlock(_component_el_input, mergeProps({
    key: 0,
    class: "widthP100",
    modelValue: _ctx.formState[_ctx.item.code],
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.formState[_ctx.item.code] = $event),
    placeholder: _ctx.item.placeholder || "\u8BF7\u8F93\u5165",
    clearable: _ctx.item.clearable,
    disabled: _ctx.item.disabled
  }, _ctx.item.extra, {
    onChange: _cache[1] || (_cache[1] = (value) => _ctx.methods.formChange(value, _ctx.item)),
    onInput: _cache[2] || (_cache[2] = (value) => _ctx.methods.formChange(value, _ctx.item)),
    onBlur: _cache[3] || (_cache[3] = (event) => _ctx.methods.formBlur(event, _ctx.item)),
    onFocus: _cache[4] || (_cache[4] = (event) => _ctx.methods.formFocus(event, _ctx.item))
  }), createSlots({ _: 2 }, [
    _ctx.item.extra && _ctx.item.extra.prefix ? {
      name: "prefix",
      fn: withCtx(() => [
        createTextVNode(toDisplayString(_ctx.item.extra.prefix), 1)
      ]),
      key: "0"
    } : void 0,
    _ctx.item.extra && _ctx.item.extra.suffix ? {
      name: "suffix",
      fn: withCtx(() => [
        createTextVNode(toDisplayString(_ctx.item.extra.suffix), 1)
      ]),
      key: "1"
    } : void 0
  ]), 1040, ["modelValue", "placeholder", "clearable", "disabled"])) : _ctx.item.type == "number" || _ctx.item.type == "numberhidden" ? (openBlock(), createBlock(_component_el_input_number, mergeProps({
    key: 1,
    class: "widthP100",
    modelValue: _ctx.formState[_ctx.item.code],
    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.formState[_ctx.item.code] = $event),
    placeholder: _ctx.item.placeholder || "\u8BF7\u8F93\u5165",
    disabled: _ctx.item.disabled
  }, _ctx.item.extra, {
    onChange: _cache[6] || (_cache[6] = (value) => _ctx.methods.formChange(value, _ctx.item)),
    onBlur: _cache[7] || (_cache[7] = (event) => _ctx.methods.formBlur(event, _ctx.item)),
    onFocus: _cache[8] || (_cache[8] = (event) => _ctx.methods.formFocus(event, _ctx.item))
  }), null, 16, ["modelValue", "placeholder", "disabled"])) : _ctx.item.type == "textarea" ? (openBlock(), createBlock(_component_el_input, mergeProps({
    key: 2,
    class: "widthP100",
    modelValue: _ctx.formState[_ctx.item.code],
    "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => _ctx.formState[_ctx.item.code] = $event),
    type: "textarea",
    placeholder: _ctx.item.placeholder || "\u8BF7\u8F93\u5165",
    disabled: _ctx.item.disabled
  }, _ctx.item.extra, {
    onChange: _cache[10] || (_cache[10] = (value) => _ctx.methods.formChange(value, _ctx.item)),
    onInput: _cache[11] || (_cache[11] = (value) => _ctx.methods.formChange(value, _ctx.item)),
    onBlur: _cache[12] || (_cache[12] = (event) => _ctx.methods.formBlur(event, _ctx.item)),
    onFocus: _cache[13] || (_cache[13] = (event) => _ctx.methods.formFocus(event, _ctx.item))
  }), null, 16, ["modelValue", "placeholder", "disabled"])) : _ctx.item.type == "password" ? (openBlock(), createBlock(_component_el_input, mergeProps({
    key: 3,
    class: "widthP100",
    modelValue: _ctx.formState[_ctx.item.code],
    "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => _ctx.formState[_ctx.item.code] = $event),
    type: "password",
    placeholder: _ctx.item.placeholder || "\u8BF7\u8F93\u5165",
    disabled: _ctx.item.disabled,
    clearable: _ctx.item.clearable
  }, _ctx.item.extra, {
    onChange: _cache[15] || (_cache[15] = (value) => _ctx.methods.formChange(value, _ctx.item)),
    onInput: _cache[16] || (_cache[16] = (value) => _ctx.methods.formChange(value, _ctx.item)),
    onBlur: _cache[17] || (_cache[17] = (event) => _ctx.methods.formBlur(event, _ctx.item)),
    onFocus: _cache[18] || (_cache[18] = (event) => _ctx.methods.formFocus(event, _ctx.item))
  }), null, 16, ["modelValue", "placeholder", "disabled", "clearable"])) : _ctx.item.type == "radio" ? (openBlock(), createBlock(_component_el_radio_group, mergeProps({
    key: 4,
    modelValue: _ctx.formState[_ctx.item.code],
    "onUpdate:modelValue": _cache[19] || (_cache[19] = ($event) => _ctx.formState[_ctx.item.code] = $event),
    disabled: _ctx.item.disabled
  }, _ctx.item.extra, {
    onChange: _cache[20] || (_cache[20] = (value) => _ctx.methods.formChange(value, _ctx.item))
  }), {
    default: withCtx(() => [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.item.dataFormat, (dataFormat) => {
        return openBlock(), createBlock(_component_el_radio, {
          disabled: dataFormat.disabled,
          label: dataFormat[_ctx.item.fieldName ? _ctx.item.fieldName.value || "value" : "value"]
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(dataFormat[_ctx.item.fieldName ? _ctx.item.fieldName.label || "label" : "label"]), 1)
          ]),
          _: 2
        }, 1032, ["disabled", "label"]);
      }), 256))
    ]),
    _: 1
  }, 16, ["modelValue", "disabled"])) : _ctx.item.type == "checkbox" ? (openBlock(), createBlock(_component_el_checkbox_group, mergeProps({
    key: 5,
    modelValue: _ctx.formState[_ctx.item.code],
    "onUpdate:modelValue": _cache[21] || (_cache[21] = ($event) => _ctx.formState[_ctx.item.code] = $event),
    disabled: _ctx.item.disabled
  }, _ctx.item.extra, {
    onChange: _cache[22] || (_cache[22] = (value) => _ctx.methods.formChange(value, _ctx.item))
  }), {
    default: withCtx(() => [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.item.dataFormat, (dataFormat) => {
        return openBlock(), createBlock(_component_el_checkbox, {
          disabled: dataFormat.disabled,
          label: dataFormat[_ctx.item.fieldName ? _ctx.item.fieldName.value || "value" : "value"]
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(dataFormat[_ctx.item.fieldName ? _ctx.item.fieldName.label || "label" : "label"]), 1)
          ]),
          _: 2
        }, 1032, ["disabled", "label"]);
      }), 256))
    ]),
    _: 1
  }, 16, ["modelValue", "disabled"])) : _ctx.item.type == "select" ? (openBlock(), createBlock(_component_el_select, mergeProps({
    key: 6,
    class: "widthP100",
    modelValue: _ctx.formState[_ctx.item.code],
    "onUpdate:modelValue": _cache[23] || (_cache[23] = ($event) => _ctx.formState[_ctx.item.code] = $event),
    multiple: _ctx.item.multiple,
    "collapse-tags": "",
    "collapse-tags-tooltip": "",
    placeholder: _ctx.item.placeholder || "\u8BF7\u9009\u62E9",
    disabled: _ctx.item.disabled,
    clearable: _ctx.item.clearable
  }, _ctx.item.extra, {
    onChange: _cache[24] || (_cache[24] = (val) => _ctx.methods.formChange(val, _ctx.item))
  }), {
    default: withCtx(() => [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.item.dataFormat, (dataFormat) => {
        return openBlock(), createBlock(_component_el_option, {
          key: dataFormat[_ctx.item.fieldName ? _ctx.item.fieldName.value || "value" : "value"],
          label: dataFormat[_ctx.item.fieldName ? _ctx.item.fieldName.label || "label" : "label"],
          value: dataFormat[_ctx.item.fieldName ? _ctx.item.fieldName.value || "value" : "value"],
          disabled: dataFormat.disabled
        }, null, 8, ["label", "value", "disabled"]);
      }), 128))
    ]),
    _: 1
  }, 16, ["modelValue", "multiple", "placeholder", "disabled", "clearable"])) : _ctx.item.type == "treeSelect" ? (openBlock(), createBlock(_component_el_tree_select, mergeProps({
    key: 7,
    class: "widthP100",
    modelValue: _ctx.formState[_ctx.item.code],
    "onUpdate:modelValue": _cache[25] || (_cache[25] = ($event) => _ctx.formState[_ctx.item.code] = $event),
    multiple: _ctx.item.multiple,
    "show-checkbox": _ctx.item["show-checkbox"],
    data: _ctx.item.dataFormat,
    "render-after-expand": false,
    "check-strictly": true,
    "check-on-click-node": _ctx.item["show-checkbox"],
    filterable: "",
    "filter-node-method": _ctx.methods.filterNodeMethod
  }, _ctx.item.extra), null, 16, ["modelValue", "multiple", "show-checkbox", "data", "check-on-click-node", "filter-node-method"])) : _ctx.item.type == "cascader" ? (openBlock(), createBlock(_component_el_cascader, mergeProps({
    key: 8,
    class: "widthP100",
    modelValue: _ctx.formState[_ctx.item.code],
    "onUpdate:modelValue": _cache[26] || (_cache[26] = ($event) => _ctx.formState[_ctx.item.code] = $event),
    options: _ctx.item.dataFormat,
    props: { multiple: _ctx.item.multiple },
    placeholder: _ctx.item.placeholder || "\u8BF7\u9009\u62E9",
    disabled: _ctx.item.disabled,
    clearable: _ctx.item.clearable,
    filterable: "",
    "filter-method": _ctx.methods.filterMethod
  }, _ctx.item.extra, {
    onChange: _cache[27] || (_cache[27] = (val) => _ctx.methods.formChange(val, _ctx.item))
  }), null, 16, ["modelValue", "options", "props", "placeholder", "disabled", "clearable", "filter-method"])) : _ctx.item.type == "switch" ? (openBlock(), createBlock(_component_el_switch, mergeProps({
    key: 9,
    modelValue: _ctx.formState[_ctx.item.code],
    "onUpdate:modelValue": _cache[28] || (_cache[28] = ($event) => _ctx.formState[_ctx.item.code] = $event)
  }, _ctx.item.extra, {
    onChange: _cache[29] || (_cache[29] = (val) => _ctx.methods.formChange(val, _ctx.item))
  }), null, 16, ["modelValue"])) : _ctx.item.type == "datetime" || _ctx.item.type == "date" || _ctx.item.type == "week" || _ctx.item.type == "month" || _ctx.item.type == "year" || _ctx.item.type == "dates" ? (openBlock(), createBlock(_component_el_date_picker, {
    key: 10,
    class: "widthP100I",
    modelValue: _ctx.formState[_ctx.item.code],
    "onUpdate:modelValue": _cache[30] || (_cache[30] = ($event) => _ctx.formState[_ctx.item.code] = $event),
    type: _ctx.item.type,
    placeholder: _ctx.item.placeholder || "\u8BF7\u9009\u62E9",
    disabled: _ctx.item.disabled,
    clearable: _ctx.item.clearable,
    onChange: _cache[31] || (_cache[31] = (val) => _ctx.methods.formChange(val, _ctx.item)),
    onBlur: _cache[32] || (_cache[32] = (event) => _ctx.methods.formBlur(event, _ctx.item)),
    onFocus: _cache[33] || (_cache[33] = (event) => _ctx.methods.formFocus(event, _ctx.item))
  }, null, 8, ["modelValue", "type", "placeholder", "disabled", "clearable"])) : _ctx.item.type == "daterange" || _ctx.item.type == "monthrange" || _ctx.item.type == "datetimerange" ? (openBlock(), createBlock(_component_el_date_picker, {
    key: 11,
    class: "widthP100I",
    modelValue: _ctx.formState[_ctx.item.code],
    "onUpdate:modelValue": _cache[34] || (_cache[34] = ($event) => _ctx.formState[_ctx.item.code] = $event),
    type: _ctx.item.type,
    "range-separator": _ctx.item.extra && _ctx.item.extra["range-separator"] || "\u81F3",
    "start-placeholder": _ctx.item.extra && _ctx.item.extra["start-placeholder"] || "\u5F00\u59CB\u65F6\u95F4",
    "end-placeholder": _ctx.item.extra && _ctx.item.extra["end-placeholder"] || "\u7ED3\u675F\u65F6\u95F4",
    placeholder: _ctx.item.placeholder || "\u8BF7\u9009\u62E9",
    disabled: _ctx.item.disabled,
    clearable: _ctx.item.clearable,
    onChange: _cache[35] || (_cache[35] = (val) => _ctx.methods.formChange(val, _ctx.item)),
    onBlur: _cache[36] || (_cache[36] = (event) => _ctx.methods.formBlur(event, _ctx.item)),
    onFocus: _cache[37] || (_cache[37] = (event) => _ctx.methods.formFocus(event, _ctx.item))
  }, null, 8, ["modelValue", "type", "range-separator", "start-placeholder", "end-placeholder", "placeholder", "disabled", "clearable"])) : _ctx.item.type == "time" ? (openBlock(), createBlock(_component_el_time_picker, {
    key: 12,
    class: "widthP100I",
    modelValue: _ctx.formState[_ctx.item.code],
    "onUpdate:modelValue": _cache[38] || (_cache[38] = ($event) => _ctx.formState[_ctx.item.code] = $event),
    placeholder: _ctx.item.placeholder || "\u8BF7\u9009\u62E9",
    disabled: _ctx.item.disabled,
    clearable: _ctx.item.clearable,
    onChange: _cache[39] || (_cache[39] = (val) => _ctx.methods.formChange(val, _ctx.item))
  }, null, 8, ["modelValue", "placeholder", "disabled", "clearable"])) : _ctx.item.type == "timeRange" ? (openBlock(), createBlock(_component_el_time_picker, {
    key: 13,
    class: "widthP100I",
    modelValue: _ctx.formState[_ctx.item.code],
    "onUpdate:modelValue": _cache[40] || (_cache[40] = ($event) => _ctx.formState[_ctx.item.code] = $event),
    "is-range": "",
    "range-separator": _ctx.item.extra && _ctx.item.extra["range-separator"] || "\u81F3",
    "start-placeholder": _ctx.item.extra && _ctx.item.extra["start-placeholder"] || "\u5F00\u59CB\u65F6\u95F4",
    "end-placeholder": _ctx.item.extra && _ctx.item.extra["end-placeholder"] || "\u7ED3\u675F\u65F6\u95F4",
    placeholder: _ctx.item.placeholder || "\u8BF7\u9009\u62E9",
    disabled: _ctx.item.disabled,
    clearable: _ctx.item.clearable,
    onChange: _cache[41] || (_cache[41] = (val) => _ctx.methods.formChange(val, _ctx.item))
  }, null, 8, ["modelValue", "range-separator", "start-placeholder", "end-placeholder", "placeholder", "disabled", "clearable"])) : _ctx.item.type == "timeSelect" ? (openBlock(), createBlock(_component_el_time_select, {
    key: 14,
    class: "widthP100I",
    modelValue: _ctx.formState[_ctx.item.code],
    "onUpdate:modelValue": _cache[42] || (_cache[42] = ($event) => _ctx.formState[_ctx.item.code] = $event),
    start: _ctx.item.extra && _ctx.item.extra.start || "00:00",
    step: _ctx.item.extra && _ctx.item.extra.step || "00:15",
    end: _ctx.item.extra && _ctx.item.extra.end || "23:59",
    placeholder: _ctx.item.placeholder || "\u8BF7\u9009\u62E9",
    disabled: _ctx.item.disabled,
    clearable: _ctx.item.clearable,
    onChange: _cache[43] || (_cache[43] = (val) => _ctx.methods.formChange(val, _ctx.item))
  }, null, 8, ["modelValue", "start", "step", "end", "placeholder", "disabled", "clearable"])) : createCommentVNode("", true);
}
var EForm = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render]]);
/*! Element Plus Icons Vue v2.1.0 */
var export_helper_default = (sfc, props) => {
  let target = sfc.__vccOpts || sfc;
  for (let [key, val] of props)
    target[key] = val;
  return target;
};
var plus_vue_vue_type_script_lang_default = {
  name: "Plus"
};
var _hoisted_1201 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, _hoisted_2201 = /* @__PURE__ */ createElementVNode(
  "path",
  {
    fill: "currentColor",
    d: "M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"
  },
  null,
  -1
), _hoisted_3200 = [
  _hoisted_2201
];
function _sfc_render201(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1201, _hoisted_3200);
}
var plus_default = /* @__PURE__ */ export_helper_default(plus_vue_vue_type_script_lang_default, [["render", _sfc_render201], ["__file", "plus.vue"]]);
var index_vue_vue_type_style_index_0_scoped_true_lang = "";
var index_vue_vue_type_style_index_1_lang = "";
const _hoisted_1 = ["src"];
const _sfc_main = defineComponent({
  __name: "index",
  props: {
    formConfig: {
      type: Object,
      default: () => {
      }
    }
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    let base = reactive({
      inline: false,
      "label-position": "right",
      "label-width": "100px",
      grid: {
        xs: 24,
        sm: 24,
        md: 24,
        lg: 24,
        xl: 24
      },
      justify: "start",
      "item-bottom": "16px"
    });
    const modelRef = ref();
    const formState = reactive({});
    const rulesRef = reactive({});
    let configData = reactive([]);
    let fileList = ref([]);
    const dialogVisible = ref(false);
    const dialogImageUrl = ref("");
    let isRefresh = ref(true);
    watch(
      () => props.formConfig,
      (value) => {
        let { formConfigData, formConfigBase } = value;
        base = merge$1(base, formConfigBase);
        configData = cloneDeep(formConfigData);
        isRefresh.value = false;
        setTimeout(() => {
          isRefresh.value = true;
        }, 100);
        if (configData == null ? void 0 : configData.length) {
          configData.map((el) => {
            if (!el.code)
              return;
            formState[el.code] = el.defaultValue;
            rulesRef[el.code] = [];
            if (el.required) {
              rulesRef[el.code].push({
                required: true,
                message: el.help || (el.type == "input" || el.type == "number" || el.type == "password" || el.type == "textarea" ? "\u8BF7\u8F93\u5165" : "\u8BF7\u9009\u62E9") + el.label,
                trigger: el.trigger || "change"
              });
            }
            if (el.pattern) {
              rulesRef[el.code].push({
                pattern: el.pattern || null,
                message: el.help || (el.type == "input" || el.type == "number" || el.type == "password" || el.type == "textarea" ? "\u8BF7\u8F93\u5165" : "\u8BF7\u9009\u62E9") + el.label
              });
            }
            if (el.checkFunName) {
              rulesRef[el.code].push({
                validator: (rule, value2, callback) => methods.checkFunction(rule, value2, callback, el.checkFunName)
              });
            }
            if (rulesRef[el.code].length == 0) {
              delete rulesRef[el.code];
            }
          });
        }
      },
      {
        immediate: true,
        deep: true
      }
    );
    const methods = {
      checkFunction: (rule, value, callback, checkFunName) => {
        let functions = props.formConfig.functions;
        if (functions == null ? void 0 : functions[checkFunName]) {
          functions[checkFunName](rule, value, callback);
        }
      },
      formChange(e, item) {
        let functions = props.formConfig.functions;
        if (functions == null ? void 0 : functions[item.changeFunName]) {
          functions[item.changeFunName](e, item);
        }
      },
      formBlur(e, item) {
        let value = e.target ? e.target.value.trim() : e.trim();
        if (item.type == "input" || item.type == "textarea") {
          formState[item.code] = value;
        }
        let functions = props.formConfig.functions;
        if (functions == null ? void 0 : functions[item.blurFunName]) {
          functions[item.blurFunName](value, item);
        }
      },
      formFocus(e, item) {
        let functions = props.formConfig.functions;
        if (functions == null ? void 0 : functions[item.focusFunName]) {
          functions[item.focusFunName](e, item);
        }
      },
      filterNodeMethod: (value, data) => {
        return data.label.includes(value);
      },
      filterMethod(node, keyword) {
        return node.label.includes(keyword);
      },
      checkForm() {
        if (!modelRef.value)
          return;
        return new Promise((resolve) => {
          modelRef.value.validate((valid) => {
            resolve(valid ? true : false);
          });
        });
      },
      resetForm() {
        if (!modelRef.value)
          return;
        modelRef.value.resetFields();
      },
      setFieldsValue(datas) {
        for (let key in formState) {
          if (datas.hasOwnProperty(key)) {
            formState[key] = datas[key];
          }
        }
      },
      setFieldValue(key, data) {
        formState[key] = data[key];
      },
      beforeUpload(file, item) {
        let functions = props.formConfig.functions;
        if (functions) {
          functions[item.changeFunName](file, (list) => {
            fileList.value = [
              ...fileList.value,
              ...list
            ];
            isRefresh.value = false;
            setTimeout(() => {
              isRefresh.value = true;
            }, 0);
          });
        }
        return false;
      },
      handlePictureCardPreview(file) {
        dialogImageUrl.value = file.url;
        dialogVisible.value = true;
      }
    };
    __expose({
      fileList,
      formState,
      checkForm: methods.checkForm,
      resetForm: methods.resetForm,
      setFieldsValue: methods.setFieldsValue,
      setFieldValue: methods.setFieldValue
    });
    return (_ctx, _cache) => {
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_el_upload = resolveComponent("el-upload");
      const _component_el_col = resolveComponent("el-col");
      const _component_el_row = resolveComponent("el-row");
      const _component_el_form = resolveComponent("el-form");
      const _component_el_dialog = resolveComponent("el-dialog");
      return openBlock(), createElementBlock(Fragment, null, [
        unref(isRefresh) ? (openBlock(), createBlock(_component_el_form, mergeProps({
          key: 0,
          onSubmit: _cache[1] || (_cache[1] = withModifiers(() => {
          }, ["prevent"]))
        }, _ctx.$attrs, {
          model: formState,
          rules: rulesRef,
          inline: unref(base).inline,
          "label-position": unref(base)["label-position"],
          "label-width": unref(base)["label-width"],
          "label-suffix": unref(base)["label-suffix"],
          "hide-required-asterisk": unref(base)["hide-required-asterisk"],
          "require-asterisk-position": unref(base)["require-asterisk-position"],
          "inline-message": unref(base)["inline-message"],
          "status-icon": unref(base)["status-icon"],
          ref_key: "modelRef",
          ref: modelRef,
          style: { "--itemBottom": unref(base)["item-bottom"] }
        }), {
          default: withCtx(() => [
            unref(base).inline ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(unref(configData), (item) => {
              return withDirectives((openBlock(), createBlock(_component_el_form_item, {
                class: normalizeClass(item.formClassName),
                label: item.label,
                key: item.code,
                prop: item.code,
                "label-width": item["label-width"]
              }, {
                default: withCtx(() => [
                  item.slot ? renderSlot(_ctx.$slots, item.slot, {
                    key: 0,
                    data: item
                  }, void 0, true) : (openBlock(), createBlock(EForm, {
                    key: 1,
                    item,
                    formState,
                    methods
                  }, null, 8, ["item", "formState"]))
                ]),
                _: 2
              }, 1032, ["class", "label", "prop", "label-width"])), [
                [vShow, !item.type.includes("hidden")]
              ]);
            }), 128)) : (openBlock(), createBlock(_component_el_row, {
              key: 1,
              align: "middle",
              justify: unref(base).justify,
              gutter: unref(base).gutter
            }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(configData), (item) => {
                  return openBlock(), createBlock(_component_el_col, mergeProps(item.grid || unref(base).grid, {
                    key: item.code
                  }), {
                    default: withCtx(() => [
                      withDirectives(createVNode(_component_el_form_item, {
                        class: normalizeClass(item.formClassName),
                        label: item.label,
                        prop: item.code,
                        "label-width": item["label-width"]
                      }, {
                        default: withCtx(() => [
                          item.slot ? renderSlot(_ctx.$slots, item.slot, {
                            key: 0,
                            data: item
                          }, void 0, true) : item.type == "upload" ? (openBlock(), createBlock(_component_el_upload, mergeProps({
                            key: 1,
                            "file-list": unref(fileList),
                            "onUpdate:fileList": _cache[0] || (_cache[0] = ($event) => isRef(fileList) ? fileList.value = $event : fileList = $event),
                            action: "#",
                            "list-type": "picture-card",
                            disabled: item.disabled,
                            accept: item.accept
                          }, item.extra, {
                            "before-upload": (file) => methods.beforeUpload(file, item),
                            "on-preview": methods.handlePictureCardPreview,
                            class: { hide: unref(fileList).length >= (item.limit || 3) }
                          }), {
                            default: withCtx(() => [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(unref(plus_default))
                                ]),
                                _: 1
                              }),
                              createTextVNode(" \u4E0A\u4F20 ")
                            ]),
                            _: 2
                          }, 1040, ["file-list", "disabled", "accept", "before-upload", "on-preview", "class"])) : (openBlock(), createBlock(EForm, {
                            key: 2,
                            item,
                            formState,
                            methods
                          }, null, 8, ["item", "formState"]))
                        ]),
                        _: 2
                      }, 1032, ["class", "label", "prop", "label-width"]), [
                        [vShow, !item.type.includes("hidden")]
                      ])
                    ]),
                    _: 2
                  }, 1040);
                }), 128))
              ]),
              _: 3
            }, 8, ["justify", "gutter"]))
          ]),
          _: 3
        }, 16, ["model", "rules", "inline", "label-position", "label-width", "label-suffix", "hide-required-asterisk", "require-asterisk-position", "inline-message", "status-icon", "style"])) : createCommentVNode("", true),
        createVNode(_component_el_dialog, {
          title: "",
          modelValue: dialogVisible.value,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => dialogVisible.value = $event),
          class: "jw_dialogPreview"
        }, {
          default: withCtx(() => [
            createElementVNode("img", {
              "w-full": "",
              src: dialogImageUrl.value
            }, null, 8, _hoisted_1)
          ]),
          _: 1
        }, 8, ["modelValue"])
      ], 64);
    };
  }
});
var Form = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3797f345"]]);
const FormPlugin = {
  install(app) {
    app.component("my-form", Form);
  }
};
const MYUiPlugin = {
  install(app) {
    var _a, _b, _c, _d;
    (_a = TablePlugin.install) == null ? void 0 : _a.call(TablePlugin, app);
    (_b = DialogPlugin.install) == null ? void 0 : _b.call(DialogPlugin, app);
    (_c = PaginationPlugin.install) == null ? void 0 : _c.call(PaginationPlugin, app);
    (_d = FormPlugin.install) == null ? void 0 : _d.call(FormPlugin, app);
  }
};
export { Dialog, DialogPlugin, Form, FormPlugin, Pagination, PaginationPlugin, Table, TablePlugin, MYUiPlugin as default };
