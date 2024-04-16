var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/lz-string/libs/lz-string.js
var require_lz_string = __commonJS({
  "node_modules/lz-string/libs/lz-string.js"(exports, module) {
    var LZString = function() {
      var f = String.fromCharCode;
      var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
      var baseReverseDic = {};
      function getBaseValue(alphabet, character) {
        if (!baseReverseDic[alphabet]) {
          baseReverseDic[alphabet] = {};
          for (var i = 0; i < alphabet.length; i++) {
            baseReverseDic[alphabet][alphabet.charAt(i)] = i;
          }
        }
        return baseReverseDic[alphabet][character];
      }
      var LZString2 = {
        compressToBase64: function(input) {
          if (input == null)
            return "";
          var res = LZString2._compress(input, 6, function(a) {
            return keyStrBase64.charAt(a);
          });
          switch (res.length % 4) {
            default:
            case 0:
              return res;
            case 1:
              return res + "===";
            case 2:
              return res + "==";
            case 3:
              return res + "=";
          }
        },
        decompressFromBase64: function(input) {
          if (input == null)
            return "";
          if (input == "")
            return null;
          return LZString2._decompress(input.length, 32, function(index) {
            return getBaseValue(keyStrBase64, input.charAt(index));
          });
        },
        compressToUTF16: function(input) {
          if (input == null)
            return "";
          return LZString2._compress(input, 15, function(a) {
            return f(a + 32);
          }) + " ";
        },
        decompressFromUTF16: function(compressed) {
          if (compressed == null)
            return "";
          if (compressed == "")
            return null;
          return LZString2._decompress(compressed.length, 16384, function(index) {
            return compressed.charCodeAt(index) - 32;
          });
        },
        //compress into uint8array (UCS-2 big endian format)
        compressToUint8Array: function(uncompressed) {
          var compressed = LZString2.compress(uncompressed);
          var buf = new Uint8Array(compressed.length * 2);
          for (var i = 0, TotalLen = compressed.length; i < TotalLen; i++) {
            var current_value = compressed.charCodeAt(i);
            buf[i * 2] = current_value >>> 8;
            buf[i * 2 + 1] = current_value % 256;
          }
          return buf;
        },
        //decompress from uint8array (UCS-2 big endian format)
        decompressFromUint8Array: function(compressed) {
          if (compressed === null || compressed === void 0) {
            return LZString2.decompress(compressed);
          } else {
            var buf = new Array(compressed.length / 2);
            for (var i = 0, TotalLen = buf.length; i < TotalLen; i++) {
              buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];
            }
            var result = [];
            buf.forEach(function(c) {
              result.push(f(c));
            });
            return LZString2.decompress(result.join(""));
          }
        },
        //compress into a string that is already URI encoded
        compressToEncodedURIComponent: function(input) {
          if (input == null)
            return "";
          return LZString2._compress(input, 6, function(a) {
            return keyStrUriSafe.charAt(a);
          });
        },
        //decompress from an output of compressToEncodedURIComponent
        decompressFromEncodedURIComponent: function(input) {
          if (input == null)
            return "";
          if (input == "")
            return null;
          input = input.replace(/ /g, "+");
          return LZString2._decompress(input.length, 32, function(index) {
            return getBaseValue(keyStrUriSafe, input.charAt(index));
          });
        },
        compress: function(uncompressed) {
          return LZString2._compress(uncompressed, 16, function(a) {
            return f(a);
          });
        },
        _compress: function(uncompressed, bitsPerChar, getCharFromInt) {
          if (uncompressed == null)
            return "";
          var i, value, context_dictionary = {}, context_dictionaryToCreate = {}, context_c = "", context_wc = "", context_w = "", context_enlargeIn = 2, context_dictSize = 3, context_numBits = 2, context_data = [], context_data_val = 0, context_data_position = 0, ii;
          for (ii = 0; ii < uncompressed.length; ii += 1) {
            context_c = uncompressed.charAt(ii);
            if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
              context_dictionary[context_c] = context_dictSize++;
              context_dictionaryToCreate[context_c] = true;
            }
            context_wc = context_w + context_c;
            if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
              context_w = context_wc;
            } else {
              if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                if (context_w.charCodeAt(0) < 256) {
                  for (i = 0; i < context_numBits; i++) {
                    context_data_val = context_data_val << 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                  }
                  value = context_w.charCodeAt(0);
                  for (i = 0; i < 8; i++) {
                    context_data_val = context_data_val << 1 | value & 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = value >> 1;
                  }
                } else {
                  value = 1;
                  for (i = 0; i < context_numBits; i++) {
                    context_data_val = context_data_val << 1 | value;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = 0;
                  }
                  value = context_w.charCodeAt(0);
                  for (i = 0; i < 16; i++) {
                    context_data_val = context_data_val << 1 | value & 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = value >> 1;
                  }
                }
                context_enlargeIn--;
                if (context_enlargeIn == 0) {
                  context_enlargeIn = Math.pow(2, context_numBits);
                  context_numBits++;
                }
                delete context_dictionaryToCreate[context_w];
              } else {
                value = context_dictionary[context_w];
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              }
              context_enlargeIn--;
              if (context_enlargeIn == 0) {
                context_enlargeIn = Math.pow(2, context_numBits);
                context_numBits++;
              }
              context_dictionary[context_wc] = context_dictSize++;
              context_w = String(context_c);
            }
          }
          if (context_w !== "") {
            if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
              if (context_w.charCodeAt(0) < 256) {
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                }
                value = context_w.charCodeAt(0);
                for (i = 0; i < 8; i++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              } else {
                value = 1;
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1 | value;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = 0;
                }
                value = context_w.charCodeAt(0);
                for (i = 0; i < 16; i++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              }
              context_enlargeIn--;
              if (context_enlargeIn == 0) {
                context_enlargeIn = Math.pow(2, context_numBits);
                context_numBits++;
              }
              delete context_dictionaryToCreate[context_w];
            } else {
              value = context_dictionary[context_w];
              for (i = 0; i < context_numBits; i++) {
                context_data_val = context_data_val << 1 | value & 1;
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
                value = value >> 1;
              }
            }
            context_enlargeIn--;
            if (context_enlargeIn == 0) {
              context_enlargeIn = Math.pow(2, context_numBits);
              context_numBits++;
            }
          }
          value = 2;
          for (i = 0; i < context_numBits; i++) {
            context_data_val = context_data_val << 1 | value & 1;
            if (context_data_position == bitsPerChar - 1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
          while (true) {
            context_data_val = context_data_val << 1;
            if (context_data_position == bitsPerChar - 1) {
              context_data.push(getCharFromInt(context_data_val));
              break;
            } else
              context_data_position++;
          }
          return context_data.join("");
        },
        decompress: function(compressed) {
          if (compressed == null)
            return "";
          if (compressed == "")
            return null;
          return LZString2._decompress(compressed.length, 32768, function(index) {
            return compressed.charCodeAt(index);
          });
        },
        _decompress: function(length, resetValue, getNextValue) {
          var dictionary = [], next, enlargeIn = 4, dictSize = 4, numBits = 3, entry = "", result = [], i, w, bits, resb, maxpower, power, c, data = { val: getNextValue(0), position: resetValue, index: 1 };
          for (i = 0; i < 3; i += 1) {
            dictionary[i] = i;
          }
          bits = 0;
          maxpower = Math.pow(2, 2);
          power = 1;
          while (power != maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          }
          switch (next = bits) {
            case 0:
              bits = 0;
              maxpower = Math.pow(2, 8);
              power = 1;
              while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              c = f(bits);
              break;
            case 1:
              bits = 0;
              maxpower = Math.pow(2, 16);
              power = 1;
              while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              c = f(bits);
              break;
            case 2:
              return "";
          }
          dictionary[3] = c;
          w = c;
          result.push(c);
          while (true) {
            if (data.index > length) {
              return "";
            }
            bits = 0;
            maxpower = Math.pow(2, numBits);
            power = 1;
            while (power != maxpower) {
              resb = data.val & data.position;
              data.position >>= 1;
              if (data.position == 0) {
                data.position = resetValue;
                data.val = getNextValue(data.index++);
              }
              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1;
            }
            switch (c = bits) {
              case 0:
                bits = 0;
                maxpower = Math.pow(2, 8);
                power = 1;
                while (power != maxpower) {
                  resb = data.val & data.position;
                  data.position >>= 1;
                  if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                  }
                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1;
                }
                dictionary[dictSize++] = f(bits);
                c = dictSize - 1;
                enlargeIn--;
                break;
              case 1:
                bits = 0;
                maxpower = Math.pow(2, 16);
                power = 1;
                while (power != maxpower) {
                  resb = data.val & data.position;
                  data.position >>= 1;
                  if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                  }
                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1;
                }
                dictionary[dictSize++] = f(bits);
                c = dictSize - 1;
                enlargeIn--;
                break;
              case 2:
                return result.join("");
            }
            if (enlargeIn == 0) {
              enlargeIn = Math.pow(2, numBits);
              numBits++;
            }
            if (dictionary[c]) {
              entry = dictionary[c];
            } else {
              if (c === dictSize) {
                entry = w + w.charAt(0);
              } else {
                return null;
              }
            }
            result.push(entry);
            dictionary[dictSize++] = w + entry.charAt(0);
            enlargeIn--;
            w = entry;
            if (enlargeIn == 0) {
              enlargeIn = Math.pow(2, numBits);
              numBits++;
            }
          }
        }
      };
      return LZString2;
    }();
    if (typeof define === "function" && define.amd) {
      define(function() {
        return LZString;
      });
    } else if (typeof module !== "undefined" && module != null) {
      module.exports = LZString;
    } else if (typeof angular !== "undefined" && angular != null) {
      angular.module("LZString", []).factory("LZString", function() {
        return LZString;
      });
    }
  }
});

// src/shared/utils/helpers.ts
var hasAllFlags = (a, b) => (a & b) === b;
var hasAnyFlag = (a, b) => b === 0 ? true : (a & b) !== 0;
var avg = (a, b) => (a + b) / 2;
var randomRange = (min, max) => Math.random() * (max - min) + min;
var randomRangeInt = (min, max) => Math.floor(randomRange(min, max));
var clamp = (value, min, max) => Math.max(min, Math.min(value, max));
var lerp = (a, b, t) => a + (b - a) * t;
var isNumber = (v) => typeof v === "number";
var isString = (v) => typeof v === "string";
var isDefined = (v) => v !== void 0;
var isNull = (v) => v === null;
var isNonNullable = (v) => isDefined(v) && !isNull(v);
var uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
};
function getRandomWeightedIndex(weights, nullWeight = 0) {
  const tempWeights = [nullWeight, ...weights];
  let sum = tempWeights.reduce((a, c) => a + c, 0);
  const random = Math.random() * sum;
  if (random === 0) {
    return -1;
  }
  for (const [i, v] of tempWeights.entries()) {
    sum -= v;
    if (sum <= random) {
      return i - 1;
    }
  }
  return -1;
}
function getRandomWeightedItem(items, nullWeight = 0) {
  const index = getRandomWeightedIndex(items.map((x) => x.weight), nullWeight);
  const item = items[index];
  return item;
}
function pickOneFromPickProbability(items) {
  for (const item of items) {
    const random = randomRangeInt(1, item.pickProbability + 1);
    const pick = item.pickProbability === random;
    if (pick) {
      return item;
    }
  }
  return void 0;
}
function pickManyFromPickProbability(items) {
  const result = [];
  for (const item of items) {
    const random = randomRangeInt(1, item.pickProbability + 1);
    const pick = item.pickProbability === random;
    if (pick) {
      result.push(item);
    }
  }
  return result;
}
function filterItemsFirstRank(items) {
  const numerals2 = ["II", "III", "IV", "V"];
  const regex = new RegExp(` (${numerals2.join("|")})?$`);
  return items.reduce((a, c) => {
    const nameWithoutNumeral = c.name.replace(regex, "");
    if (a.some((x) => x.name.replace(regex, "") === nameWithoutNumeral)) {
      return a;
    }
    a.push(c);
    return a;
  }, []);
}
function calcItemProbability(items) {
  const candidateList = filterItemsFirstRank(items.filter((x) => typeof x.unlocked === "boolean" && x.unlocked ? false : true));
  const item = pickOneFromPickProbability(candidateList);
  return item;
}
function toDecimals(value, decimals, rounding = Math.floor) {
  return rounding(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}
function calcTier(item, items, order = "descending") {
  const group = items || [item];
  const index = group.indexOf(item);
  if (index === -1) {
    return index;
  }
  switch (order) {
    case "ascending":
      return index + 1;
    case "descending":
      return Math.abs(index - group.length);
  }
}

// src/shared/utils/assert.ts
function assertDefined(value, msg) {
  if (!isDefined(value)) {
    throw new TypeError(msg ?? "value is undefined");
  }
}
function assertNullable(value, msg) {
  if (isNonNullable(value)) {
    throw new TypeError(msg ?? "value is not null or undefined");
  }
}
function assertNonNullable(value, msg) {
  if (!isNonNullable(value)) {
    throw new TypeError(msg ?? "value is null or undefined");
  }
}
function assertType(value, func, msg) {
  if (!func(value)) {
    throw new TypeError(msg);
  }
}
function assertUniqueStringList(stringList, msg) {
  const set = /* @__PURE__ */ new Set();
  for (const str of stringList) {
    if (set.has(str)) {
      throw new Error(`${msg}
Non-unique string: ${str}`);
    }
    set.add(str);
  }
}

// src/arrayExtensions.ts
Array.prototype.remove = function(item) {
  const index = this.indexOf(item);
  if (index === -1) {
    return false;
  }
  this.splice(index, 1);
  return true;
};
Array.prototype.clear = function() {
  this.splice(0);
};
Array.prototype.random = function() {
  const index = randomRangeInt(0, this.length);
  const value = this[index];
  assertDefined(value);
  return value;
};
Array.prototype.findStrict = function(predicate) {
  const item = this.find(predicate);
  assertDefined(item, "Item must exist when called with Array.findStrict()");
  return item;
};

// src/DOMExtensions.ts
if (typeof Document !== "undefined") {
  Document.prototype.querySelectorStrict = function(selectors) {
    const element = this.querySelector(selectors);
    if (!element) {
      throw new Error(`Element with selectors ${selectors} could not be found!`);
    }
    return element;
  };
}
if (typeof Element !== "undefined") {
  Element.prototype.querySelectorStrict = function(selectors) {
    const element = this.querySelector(selectors);
    if (!element) {
      throw new Error(`Element with selectors ${selectors} could not be found!`);
    }
    return element;
  };
  Element.prototype.getAttributeStrict = function(qualifiedName) {
    const attr = this.getAttribute(qualifiedName);
    assertType(attr, isString, `missing attribute: ${qualifiedName}`);
    return attr;
  };
}

// src/shared/utils/EventEmitter.ts
var EventEmitter = class {
  listeners = /* @__PURE__ */ new Map();
  listen(callback, opts) {
    const removeListener = () => this.removeListener(callback);
    const instance = { callback, opts, removeListener };
    this.listeners.set(callback, instance);
  }
  removeListener(callback) {
    this.listeners.delete(callback);
  }
  removeAllListeners() {
    this.listeners.clear();
  }
  invoke(value) {
    for (const [callback, listener] of this.listeners.entries()) {
      listener.callback(value, listener);
      if (listener.opts?.once) {
        this.listeners.delete(callback);
      }
    }
  }
};

// src/game/gameModule/moduleList.json
var moduleList_default = {
  $schema: "moduleList.schema.json",
  list: [
    {
      id: "1ea84a",
      name: "Demo",
      url: "./demo.module.jsonc",
      description: "This module acts as a demo. \nIt's made by the developer of this game.\nThe purpose of this module is to showcase the base game and may contain a lot of missing features."
    }
  ]
};

// src/shared/types/types.ts
var DamageTypes = ["Physical", "Elemental"];

// src/game/mods/types.ts
var Test = [
  ...DamageTypes.map((x) => `Min${x}Damage`),
  ...DamageTypes.map((x) => `Max${x}Damage`)
];
var ModifierFlags = /* @__PURE__ */ ((ModifierFlags2) => {
  ModifierFlags2[ModifierFlags2["None"] = 0] = "None";
  ModifierFlags2[ModifierFlags2["Attack"] = 1] = "Attack";
  ModifierFlags2[ModifierFlags2["Physical"] = 2] = "Physical";
  ModifierFlags2[ModifierFlags2["Elemental"] = 4] = "Elemental";
  ModifierFlags2[ModifierFlags2["Chaos"] = 8] = "Chaos";
  ModifierFlags2[ModifierFlags2["Skill"] = 16] = "Skill";
  ModifierFlags2[ModifierFlags2["Bleed"] = 32] = "Bleed";
  ModifierFlags2[ModifierFlags2["Burn"] = 64] = "Burn";
  ModifierFlags2[ModifierFlags2["DOT"] = 96] = "DOT";
  ModifierFlags2[ModifierFlags2["Ailment"] = 128] = "Ailment";
  return ModifierFlags2;
})(ModifierFlags || {});
var ModifierTags = [
  "Global",
  "Resource",
  "Damage",
  "Attack",
  "Physical",
  "Elemental",
  "Speed",
  "Mana",
  "Critical",
  "Ailment",
  "Bleed",
  "Burn",
  "Duration",
  "Skill",
  "Aura",
  "Attribute",
  "Life"
];

// src/game/calc/calcMod.ts
var isConditionTag = (tag) => tag.type === "Condition";
function calcModBase(modName, config) {
  return calcModSum("Base", modName, config);
}
function calcModInc(modName, config) {
  return Math.max(0, 1 + calcModSum("Inc", modName, config) / 100);
}
function calcModMore(modName, config) {
  return Math.max(0, calcModSum("More", modName, config));
}
function calcModIncMore(modName, base, config) {
  if (base <= 0)
    return 0;
  const inc = calcModInc(modName, config);
  const more = calcModMore(modName, config);
  return base * inc * more;
}
function calcModTotal(modName, config) {
  const base = calcModBase(modName, config);
  if (base === 0) {
    return 0;
  }
  const inc = calcModInc(modName, config);
  const more = calcModMore(modName, config);
  return base * inc * more;
}
function calcModFlag(modName, config) {
  return Math.min(calcModSum("Flag", modName, config), 1);
}
function calcModSum(valueType, names, config) {
  names = Array.isArray(names) ? names : [names];
  let result = valueType === "More" ? 1 : 0;
  const modDB = config.source?.modDB;
  assertDefined(modDB, "modDB is undefined");
  const modList = names.flatMap((x) => modDB.getModListByName(x)).filter(isDefined).filter((x) => x.valueType === valueType);
  const override = modList.find((x) => x.override);
  if (isDefined(override)) {
    return evalMod(override, config) || 0;
  }
  for (const mod of modList) {
    if (!evalMod(mod, config)) {
      continue;
    }
    const value = evalMod(mod, config);
    switch (valueType) {
      case "More":
        result *= 1 + value / 100;
        break;
      default:
        result += value;
    }
  }
  return result;
}
function evalMod(mod, config) {
  if (!hasAllFlags(config.flags || 0, mod.modFlagsAll || 0)) {
    return 0;
  }
  if (!hasAnyFlag(config.flags || 0, mod.modFlagsAny || 0)) {
    return 0;
  }
  const conditionsPassed = evalConditions(mod.tags?.filter(isConditionTag) || [], config);
  if (!conditionsPassed) {
    return 0;
  }
  let value = mod.negate ? -mod.value : mod.value;
  for (const tag of mod.tags || []) {
    if (tag.type === "Multiplier") {
      const multiplier = config.source?.stats?.[tag.statName] || 1;
      value *= multiplier;
    } else if (tag.type === "PerStat") {
      value /= tag.value || 1;
      value /= tag.div || 1;
      const statValue = config.source?.stats?.[tag.statName] || 0;
      value *= statValue;
    }
  }
  return value;
}
function evalConditions(conditions, config) {
  for (const condition of conditions) {
    let flag = condition.flagsAny || condition.flagsAll || 0;
    if (condition.negate) {
      flag = flag & ~flag;
    }
    let targetConditionFlags = 0;
    switch (condition.target) {
      case "Self":
        targetConditionFlags = config.source?.conditionFlags || 0;
        break;
      case "Other":
        targetConditionFlags = config.target?.conditionFlags || 0;
        break;
    }
    if (condition.flagsAny !== 0) {
      if (!hasAnyFlag(targetConditionFlags, flag)) {
        return false;
      }
    } else if (condition.flagsAll !== 0) {
      if (!hasAllFlags(targetConditionFlags, flag)) {
        return false;
      }
    }
  }
  return true;
}

// src/game/calc/calcDamage.ts
var DamageTypes2 = ["Physical", "Elemental"];
var DamageTypeFlags = {
  Physical: 1 << 0,
  Elemental: 1 << 1
};
var damageNamesMetaTable = (() => {
  const names = [];
  const length = Object.values(DamageTypeFlags).reduce((a, v) => a + v);
  for (let i = 0; i <= length; i++) {
    const flagList = ["Damage"];
    for (const [key, flag] of Object.entries(DamageTypeFlags)) {
      if (flag & i) {
        flagList.push(`${key}Damage`);
      }
    }
    names.push(flagList);
  }
  return names;
})();
function calcAttack(source, enemy) {
  const stats = extractStats(source.stats);
  const enemyStats = extractStats(enemy.stats);
  const hitChance = stats.hitChance;
  const hitFac = randomRange(0, 1);
  const hit = hitChance >= hitFac;
  if (!hit) {
    return;
  }
  const enemyEvade = enemyStats.evadeChance;
  const evadeFac = randomRange(0, 1);
  if (evadeFac < enemyEvade) {
    return;
  }
  const attackEffectiveness = randomRange(0, 1);
  const critChance = stats.criticalHitChance;
  const critFac = randomRange(0, 1);
  const crit = critChance >= critFac;
  let critMultiplier = 1;
  if (crit) {
    critMultiplier = stats.criticalHitMultiplier;
  }
  const finalMultiplier = critMultiplier;
  const minPhysicalDamage = stats.minPhysicalDamage;
  const maxPhysicalDamage = stats.maxPhysicalDamage;
  const physicalDamage = lerp(minPhysicalDamage, maxPhysicalDamage, attackEffectiveness);
  const minElementalDamage = stats.minElementalDamage;
  const maxElementalDamage = stats.maxElementalDamage;
  const elementalDamage = lerp(minElementalDamage, maxElementalDamage, attackEffectiveness);
  const totalDamage = (physicalDamage + elementalDamage) * finalMultiplier;
  const effects = [];
  {
    if (physicalDamage > 0) {
      const bleedChance = stats.bleedChanceOnHit;
      if (bleedChance >= randomRange(0, 1)) {
        effects.push({ type: "Bleed", effectivenessFactor: attackEffectiveness });
      }
    }
    if (elementalDamage > 0) {
      const burnChance = stats.burnChanceOnHit;
      if (burnChance >= randomRange(0, 1)) {
        effects.push({ type: "Burn", effectivenessFactor: attackEffectiveness });
      }
    }
  }
  return {
    hit,
    crit,
    physicalDamage,
    elementalDamage,
    totalDamage,
    effects
  };
}
function calcBaseAttackDamage(config, calcMinMax) {
  config.flags = config.flags || 0;
  const conversionTable = generateConversionTable(config);
  const output = {
    totalBaseDamage: 0,
    minPhysicalDamage: 0,
    maxPhysicalDamage: 0,
    minElementalDamage: 0,
    maxElementalDamage: 0
  };
  const damageMultiplier = config.source.stats.attackEffectiveness / 100;
  let totalBaseDamage = 0;
  for (const damageType of Object.keys(DamageTypeFlags)) {
    const bit = ModifierFlags[damageType];
    config.flags |= bit;
    let { min, max } = calcDamage(damageType, config, conversionTable);
    min *= damageMultiplier;
    max *= damageMultiplier;
    output[`min${damageType}Damage`] = min;
    output[`max${damageType}Damage`] = max;
    const baseDamage = calcMinMax(min, max);
    totalBaseDamage += baseDamage;
    config.flags &= ~bit;
  }
  output.totalBaseDamage = totalBaseDamage;
  return output;
}
function calcDamage(damageType, config, conversionTable, damageFlag = 0) {
  damageFlag |= DamageTypeFlags[damageType];
  let addMin = 0;
  let addMax = 0;
  for (const type of DamageTypes2) {
    if (type === damageType) {
      break;
    }
    const conversionValue = conversionTable[type] || {};
    const convMulti = conversionValue[damageType] || 0;
    if (convMulti > 0) {
      const { min: min2, max: max2 } = calcDamage(type, config, conversionTable, damageFlag);
      addMin += min2 * convMulti;
      addMax += max2 * convMulti;
    }
  }
  const baseMin = calcModBase("MinDamage", config);
  const baseMax = calcModBase("MaxDamage", config);
  const modNames = damageNamesMetaTable[damageFlag];
  assertDefined(modNames);
  const min = calcModIncMore(modNames, baseMin, config) + addMin;
  const max = calcModIncMore(modNames, baseMax, config) + addMax;
  return { min, max };
}
function calcAilmentBaseDamage(damageType, config, typeFlags = 0) {
  const conversionTable = generateConversionTable(config);
  let { min, max } = calcDamage(damageType, config, conversionTable, typeFlags);
  const convMulti = conversionTable[damageType]?.multi || 1;
  const attackEffectiveness = config.source.stats.attackEffectiveness / 100;
  min *= attackEffectiveness;
  max *= attackEffectiveness;
  return { min: min * convMulti, max: max * convMulti };
}
function generateConversionTable(config) {
  const conversionTable = {};
  const damageTypeFlagKeys = Object.keys(DamageTypeFlags);
  for (let i = 0; i < damageTypeFlagKeys.length; i++) {
    const damageType = damageTypeFlagKeys[i];
    assertDefined(damageType);
    const globalConv = {};
    const skillConv = {};
    const add = {};
    let globalTotal = 0;
    let skillTotal = 0;
    for (let j = i + 1; j < damageTypeFlagKeys.length; j++) {
      const otherDamageType = damageTypeFlagKeys[i];
      const convertedToName = `${damageType}ConvertedTo${otherDamageType}`;
      globalConv[otherDamageType] = calcModBase(convertedToName, config);
      globalTotal += globalConv[otherDamageType] || 0;
      skillConv[otherDamageType] = calcModBase(convertedToName, config);
      skillTotal += skillConv[otherDamageType] || 0;
      add[otherDamageType] = calcModBase(`${damageType}GainAs${otherDamageType}`, config);
    }
    const fac = skillTotal > 100 ? 100 / skillTotal : (100 - skillTotal) / globalTotal;
    for (const key of Object.keys(skillConv)) {
      skillConv[key] = (skillConv[key] || 0) * fac;
    }
    const conversionValues = { multi: 1 };
    for (const key of Object.keys(globalConv)) {
      const value = conversionValues[key];
      const skillConvValue = skillConv[key] || 0;
      const addValue = add[key] || 0;
      conversionValues[key] = ((value || 0) + skillConvValue + addValue) / 100;
    }
    conversionValues.multi = 1 - Math.min((globalTotal + skillTotal) / 100, 1);
    conversionTable[damageType] = conversionValues;
  }
  return conversionTable;
}

// src/shared/utils/Value.ts
var Value = class {
  constructor(defaultValue) {
    this.defaultValue = defaultValue;
    this._value = defaultValue;
  }
  _value;
  listeners = {
    change: new EventEmitter(),
    set: new EventEmitter(),
    add: new EventEmitter(),
    subtract: new EventEmitter()
  };
  mutated = false;
  get value() {
    return this._value;
  }
  set(v, silent = false) {
    if (v === this._value) {
      return;
    }
    this._value = v;
    if (!silent) {
      this.listeners.set.invoke({ curValue: this._value, change: v });
      this.listeners.change.invoke({ curValue: this._value, change: v });
    }
    this.mutated = true;
  }
  add(v) {
    if (v === 0) {
      return;
    }
    this._value += v;
    this.listeners.add.invoke({ curValue: this._value, change: v });
    this.listeners.change.invoke({ curValue: this._value, change: v });
    this.mutated = true;
  }
  subtract(v) {
    if (v === 0) {
      return;
    }
    this._value -= v;
    this.listeners.subtract.invoke({ curValue: this._value, change: v });
    this.listeners.change.invoke({ curValue: this._value, change: v });
    this.mutated = true;
  }
  reset() {
    this.mutated = false;
    this._value = this.defaultValue;
    Object.values(this.listeners).forEach((x) => x.removeAllListeners());
  }
  addListener(type, callback) {
    this.listeners[type].listen(callback);
  }
  removeListener(type, callback) {
    this.listeners[type].removeListener(callback);
  }
  registerTargetValueCallback(targetValue, callback) {
    if (this._value >= targetValue) {
      callback(this._value);
      return;
    }
    const listener = () => {
      if (this._value >= targetValue) {
        callback(this._value);
        this.removeListener("change", listener);
      }
    };
    this.addListener("change", listener);
  }
};

// src/game/statistics/Statistic.ts
var Statistic = class extends Value {
  constructor(options = {}) {
    super(options.defaultValue || 0);
    this.options = options;
    options.type = options.type || "number";
    this.sticky = options.sticky || false;
    this.mutated = false;
    this.options.accumulators?.forEach((x) => this.addAccumulator(x));
  }
  sticky;
  texts;
  get visible() {
    if (this.options.hiddenBeforeMutation && !this.mutated) {
      return false;
    }
    return isString(this.options.label);
  }
  setText(text) {
    this.texts = this.texts || [];
    if (!this.texts.includes(text)) {
      this.texts.push(text);
    }
    this.set((this.texts || []).indexOf(text));
  }
  getText() {
    return this.texts?.[this.value];
  }
  reset() {
    super.reset();
    this.sticky = this.options.sticky || false;
    this.mutated = false;
  }
  addAccumulator(stat) {
    this.options.accumulators = this.options.accumulators || [];
    this.addListener("add", ({ change }) => stat.add(change));
    this.options.accumulators.push(stat);
  }
};

// src/game/utils.ts
var compareValueTypes = (v1, v2) => typeof v1 === typeof v2;
function getFormattedTag(tag) {
  return `<span data-tag="${tag.toLowerCase()}">${tag}</span>`;
}
function executeRequirement(requirement, callback) {
  const requirements = [];
  if (requirement.curLevel) {
    requirements.push({ stat: player.stats.level, value: requirement.curLevel });
  }
  if (requirement.maxLevel) {
    requirements.push({ stat: game.stats.maxLevel, value: requirement.maxLevel });
  }
  if (requirement.ascensionCount) {
    requirements.push({ stat: game.stats.ascensionCount, value: requirement.ascensionCount });
  }
  let count = 0;
  if (count === requirements.length) {
    callback();
    return;
  }
  for (const requirement2 of requirements) {
    requirement2.stat.registerTargetValueCallback(requirement2.value, () => {
      count++;
      if (count === requirements.length) {
        callback();
      }
    });
  }
}

// src/game/calc/calcStats.ts
function extractStats(stats) {
  return Object.keys(stats).reduce((a, key) => {
    const value = stats[key]?.value;
    if (isNumber(value)) {
      a[key] = value;
    }
    return a;
  }, {});
}
function applyStatValues(stats, values) {
  for (const key of Object.keys(stats)) {
    const stat = stats[key];
    const value = values[key];
    if (!isDefined(value)) {
      continue;
    }
    if (compareValueTypes(value, stat.value)) {
      stat.set(value);
    }
  }
}
function calcPlayerStats(player2) {
  const stats = player2.stats;
  const enemy = player2.enemy;
  const config = {
    flags: 0,
    source: {
      type: "Player",
      stats,
      modDB: player2.modDB,
      conditionFlags: player2.conditionFlags || 0
    }
  };
  config.flags = config.flags || 0;
  stats.strength = calcModTotal(["Attribute", "Strength"], config);
  stats.dexterity = calcModTotal(["Attribute", "Dexterity"], config);
  stats.intelligence = calcModTotal(["Attribute", "Intelligence"], config);
  stats.maxMana = calcModTotal("MaxMana", config);
  stats.manaRegeneration = calcModTotal("ManaRegen", config);
  config.flags |= 16 /* Skill */;
  stats.attackManaCost = calcModTotal("AttackManaCost", config);
  config.flags &= ~16 /* Skill */;
  if (enemy) {
    config.target = { type: "Enemy", stats: extractStats(enemy.stats || {}), conditionFlags: enemy.conditionFlags, modDB: enemy.modDB };
  }
  config.flags = 1 /* Attack */;
  stats.hitChance = calcModBase("HitChance", config) / 100;
  const clampedHitChance = clamp(stats.hitChance, 0, 1);
  stats.attackSpeed = calcModTotal("AttackSpeed", config);
  stats.criticalHitChance = calcModBase("CriticalHitChance", config) / 100;
  const clampedCritChance = clamp(stats.criticalHitChance, 0, 1);
  stats.criticalHitMultiplier = (150 + calcModBase("CriticalHitMultiplier", config)) / 100;
  stats.criticalHitMultiplier = Math.min(stats.criticalHitMultiplier, 100);
  const reducedDamage = config.target?.stats?.reducedDamageTaken || 1;
  let attackDps = 0;
  {
    const baseDamageResult = calcBaseAttackDamage(config, avg);
    const critDamageMultiplier = 1 + clampedCritChance * (stats.criticalHitMultiplier - 1);
    attackDps = baseDamageResult.totalBaseDamage * clampedHitChance * stats.attackSpeed * critDamageMultiplier * reducedDamage;
    stats.minPhysicalDamage = baseDamageResult.minPhysicalDamage * reducedDamage * critDamageMultiplier;
    stats.maxPhysicalDamage = baseDamageResult.maxPhysicalDamage * reducedDamage * critDamageMultiplier;
    stats.minElementalDamage = baseDamageResult.minElementalDamage * reducedDamage * critDamageMultiplier;
    stats.maxElementalDamage = baseDamageResult.maxElementalDamage * reducedDamage * critDamageMultiplier;
  }
  let bleedDps = 0;
  {
    config.flags = 2 /* Physical */ | 32 /* Bleed */;
    stats.bleedChanceOnHit = calcModBase("BleedChance", config) / 100;
    stats.bleedDuration = calcModTotal(["BleedDuration", "AilmentDuration"], config);
    stats.maxBleedStackCount = calcModBase("BleedStack", config);
    const { min, max } = calcAilmentBaseDamage("Physical", config);
    const stacksPerSecond = clampedHitChance * stats.bleedChanceOnHit * stats.attackSpeed * stats.bleedDuration;
    const maxStacks = Math.min(stacksPerSecond, stats.maxBleedStackCount);
    stats.baseBleedDamageMultiplier = calcModTotal("BaseBleedDamageMultiplier", config) / 100;
    stats.bleedDamageMultiplier = 1 + calcModTotal("DamageOverTimeMultiplier", config) / 100;
    stats.minBleedDamage = min * reducedDamage * stats.baseBleedDamageMultiplier * stats.bleedDamageMultiplier;
    stats.maxBleedDamage = max * reducedDamage * stats.baseBleedDamageMultiplier * stats.bleedDamageMultiplier;
    const avgDamage = avg(stats.minBleedDamage, stats.maxBleedDamage);
    bleedDps = avgDamage * maxStacks;
  }
  let burnDps = 0;
  {
    config.flags = 4 /* Elemental */ | 64 /* Burn */;
    stats.burnChanceOnHit = calcModBase("BurnChance", config) / 100;
    stats.burnDuration = calcModBase("BurnDuration", config);
    stats.maxBurnStackCount = calcModBase("BurnStack", config);
    const { min, max } = calcAilmentBaseDamage("Elemental", config);
    const stacksPerSecond = clampedHitChance * stats.burnChanceOnHit * stats.attackSpeed * stats.burnDuration;
    const maxStacks = Math.min(stacksPerSecond, stats.maxBurnStackCount);
    stats.baseBurnDamageMultiplier = calcModTotal("BaseBurnDamageMultiplier", config) / 100;
    stats.burnDamageMultiplier = 1 + calcModTotal("DamageOverTimeMultiplier", config) / 100;
    stats.minBurnDamage = min * reducedDamage * stats.baseBurnDamageMultiplier * stats.burnDamageMultiplier;
    stats.maxBurnDamage = max * reducedDamage * stats.baseBurnDamageMultiplier * stats.burnDamageMultiplier;
    const baseDamage = avg(stats.minBurnDamage, stats.maxBurnDamage);
    burnDps = baseDamage * maxStacks * stats.baseBurnDamageMultiplier;
  }
  const ailmentDps = bleedDps + burnDps;
  stats.dps = attackDps + ailmentDps;
  config.flags = 0;
  stats.auraDurationMultiplier = calcModIncMore("AuraDuration", 1, config);
  stats.lingeringAilments = calcModFlag("LingeringAilments", config);
  stats.maxArtifacts = calcModBase("Artifact", config);
  stats.insightCapacity = calcModBase("Insight", config);
  return stats;
}
function calcZoneStats(zone) {
  const config = {
    flags: 0,
    source: { modDB: zone.modDB, stats: zone.stats }
  };
  const baseEnemyCount = zone.stats.maxEnemyCount + calcModBase("EnemyCount", config);
  zone.stats.maxEnemyCount = calcModIncMore("EnemyCount", baseEnemyCount, config);
}
function calcEnemyStats(enemy) {
  const stats = extractStats(enemy.stats || {});
  const config = {
    flags: 0,
    source: { type: "Enemy", conditionFlags: enemy.conditionFlags, stats, modDB: enemy.modDB }
  };
  const baseLife = stats.baseLife;
  stats.maxLife = calcModIncMore("Life", baseLife, config);
  stats.evadeChance = calcModBase("Evade", config) / 100;
  stats.reducedDamageTaken = calcModIncMore("DamageTaken", 1, config);
  applyStatValues(enemy.stats || {}, stats);
}

// src/game/mods/ModDB.ts
var ModDB = class {
  mods = /* @__PURE__ */ new Map();
  onChange = new EventEmitter();
  getModListByName(name) {
    if (!name) {
      return [...this.mods.values()].flatMap((x) => x);
    }
    return [...this.mods.get(name) || []];
  }
  add(source, statModList) {
    this.addModList(source, statModList);
    this.onChange.invoke(void 0);
  }
  removeBySource(source) {
    this.remove(source);
    this.onChange.invoke(void 0);
  }
  replace(source, statModList) {
    this.remove(source);
    this.add(source, statModList);
  }
  clear() {
    this.mods.clear();
    this.onChange.removeAllListeners();
  }
  addModList(source, statModList) {
    for (const mod of statModList) {
      let arr = this.mods.get(mod.name);
      if (!arr) {
        arr = [];
        this.mods.set(mod.name, arr);
      }
      arr.push({
        ...mod,
        source
      });
    }
  }
  remove(source) {
    for (const [name, arr] of this.mods) {
      this.mods.set(name, arr.filter((x) => x.source !== source));
    }
  }
};

// src/game/mods/modTemplates.ts
var playerModTemplates = [
  { desc: "#% Increased Damage", stats: [{ name: "Damage", valueType: "Inc" }], tags: ["Damage"], id: "45cb6e" },
  { desc: "#% Increased Attack Damage", stats: [{ name: "Damage", valueType: "Inc", modFlagsAll: 1 /* Attack */ }], tags: ["Attack", "Damage"], id: "090fda" },
  { desc: "#% Increased Physical Attack Damage", stats: [{ name: "Damage", valueType: "Inc", modFlagsAll: 1 /* Attack */ | 2 /* Physical */ }], tags: ["Attack", "Damage"], id: "b8fdf4" },
  { desc: "#% Increased Elemental Attack Damage", stats: [{ name: "Damage", valueType: "Inc", modFlagsAll: 1 /* Attack */ | 4 /* Elemental */ }], tags: ["Attack", "Damage"], id: "556d9d" },
  { desc: "#% Increased Physical Damage", stats: [{ name: "Damage", valueType: "Inc", modFlagsAll: 2 /* Physical */ }], tags: ["Damage", "Physical"], id: "230cba" },
  { desc: "#% Increased Elemental Damage", stats: [{ name: "Damage", valueType: "Inc", modFlagsAll: 4 /* Elemental */ }], tags: ["Damage", "Elemental"], id: "a2501d" },
  { desc: "#% More Attack Damage", stats: [{ name: "Damage", valueType: "More", modFlagsAll: 1 /* Attack */ }], tags: ["Attack", "Damage"], id: "a8c4ed" },
  { desc: "#% More Physical Attack Damage", stats: [{ name: "Damage", valueType: "More", modFlagsAll: 1 /* Attack */ | 2 /* Physical */ }], tags: ["Attack", "Damage"], id: "3f55a8" },
  { desc: "#% More Elemental Attack Damage", stats: [{ name: "Damage", valueType: "More", modFlagsAll: 1 /* Attack */ | 4 /* Elemental */ }], tags: ["Attack", "Damage"], id: "b7e353" },
  { desc: "#% More Physical Damage", stats: [{ name: "Damage", valueType: "More", modFlagsAll: 2 /* Physical */ }], tags: ["Damage", "Physical"], id: "1acbcd" },
  { desc: "#% More Elemental Damage", stats: [{ name: "Damage", valueType: "More", modFlagsAll: 4 /* Elemental */ }], tags: ["Damage", "Elemental"], id: "a67808" },
  { desc: "#% More Damage", stats: [{ name: "Damage", valueType: "More" }], tags: ["Damage"], id: "647b68" },
  { desc: "Adds # To # Physical Damage", stats: [{ name: "MinDamage", valueType: "Base", modFlagsAll: 2 /* Physical */ }, { name: "MaxDamage", valueType: "Base", modFlagsAll: 2 /* Physical */ }], tags: ["Damage", "Physical"], id: "35fe5d" },
  { desc: "Adds # To # Elemental Damage", stats: [{ name: "MinDamage", valueType: "Base", modFlagsAll: 4 /* Elemental */ }, { name: "MaxDamage", valueType: "Base", modFlagsAll: 4 /* Elemental */ }], tags: ["Damage", "Elemental"], id: "f798af" },
  { desc: "#% Increased Attack Speed", stats: [{ name: "AttackSpeed", valueType: "Inc" }], tags: ["Attack", "Speed"], id: "a9714e" },
  { desc: "#% Increased Maximum Mana", stats: [{ name: "MaxMana", valueType: "Inc" }], tags: ["Mana"], id: "29a502" },
  { desc: "+# Maximum Mana", stats: [{ name: "MaxMana", valueType: "Base" }], tags: ["Mana"], id: "a12998" },
  { desc: "+## Mana Regeneration", stats: [{ name: "ManaRegen", valueType: "Base" }], tags: ["Mana"], id: "b63646" },
  { desc: "#% Increased Mana Regeneration", stats: [{ name: "ManaRegen", valueType: "Inc" }], tags: ["Mana"], id: "012b35" },
  { desc: "+##% Of Maximum Mana Regeneration", stats: [{ name: "ManaRegen", valueType: "Base", tags: [{ type: "PerStat", statName: "maxMana", div: 100 }] }], tags: ["Mana"], id: "6214e1" },
  { desc: "#% Increased Aura Duration", stats: [{ name: "AuraDuration", valueType: "Inc" }], tags: ["Skill", "Aura", "Duration"], id: "9e1042" },
  { desc: "+#% Chance To Bleed", stats: [{ name: "BleedChance", valueType: "Base" }], tags: ["Attack", "Bleed", "Physical", "Ailment"], id: "8d66dc" },
  { desc: "#% Increased Bleed Damage", stats: [{ name: "Damage", valueType: "Inc", modFlagsAll: 32 /* Bleed */ }], tags: ["Damage", "Bleed", "Physical", "Ailment"], id: "3ef1f1" },
  { desc: "#% More Bleed Damage", stats: [{ name: "Damage", valueType: "More", modFlagsAll: 32 /* Bleed */ }], tags: ["Damage", "Bleed", "Physical", "Ailment"], id: "3fb3a5" },
  { desc: "#% Increased Bleed Duration", stats: [{ name: "BleedDuration", valueType: "Inc" }], tags: ["Duration", "Bleed", "Ailment"], id: "b2e5e2" },
  { desc: "+# Maximum Bleed Stack", stats: [{ name: "BleedStack", valueType: "Base" }], tags: ["Bleed", "Ailment"], id: "e9f87c" },
  { desc: "+#% Bleed Damage Multiplier", stats: [{ name: "DamageOverTimeMultiplier", valueType: "Base", modFlagsAll: 32 /* Bleed */ }], tags: ["Damage"], id: "aac96b" },
  { desc: "#% Increased Burn Damage", stats: [{ name: "Damage", valueType: "Inc", modFlagsAll: 64 /* Burn */ }], tags: ["Damage", "Burn", "Elemental", "Ailment"], id: "76a311" },
  { desc: "#% More Burn Damage", stats: [{ name: "Damage", valueType: "More", modFlagsAll: 64 /* Burn */ }], tags: ["Damage", "Burn", "Elemental", "Ailment"], id: "e04515" },
  { desc: "+#% Chance To Burn", stats: [{ name: "BurnChance", valueType: "Base" }], tags: ["Attack", "Burn", "Elemental", "Ailment"], id: "6fc5fb" },
  { desc: "#% Increased Burn Duration", stats: [{ name: "BurnDuration", valueType: "Inc" }], tags: ["Duration", "Burn", "Ailment", "Elemental"], id: "650378" },
  { desc: "+# Maximum Burn Stack", stats: [{ name: "BurnStack", valueType: "Base" }], tags: ["Burn", "Ailment", "Elemental"], id: "cb3565" },
  { desc: "+#% Burn Damage Multiplier", stats: [{ name: "DamageOverTimeMultiplier", valueType: "Base", modFlagsAll: 64 /* Burn */ }], tags: ["Damage"], id: "c1c53f" },
  { desc: "+#% Critical Hit Chance", stats: [{ name: "CriticalHitChance", valueType: "Base" }], tags: ["Critical", "Attack"], id: "71540b" },
  { desc: "+#% Critical Hit Multiplier", stats: [{ name: "CriticalHitMultiplier", valueType: "Base" }], tags: ["Critical", "Attack"], id: "3ba4ed" },
  { desc: "#% More Attack Speed", stats: [{ name: "AttackSpeed", valueType: "More" }], tags: ["Attack", "Speed"], id: "5fa13d" },
  { desc: "+#% Hit Chance", stats: [{ name: "HitChance", valueType: "Base" }], tags: ["Attack"], id: "796465" },
  { desc: "#% Increased Ailment Duration", stats: [{ name: "AilmentDuration", valueType: "Inc" }], tags: ["Ailment", "Duration"], id: "823b17" },
  { desc: "#% More Damage Over Time", stats: [{ name: "Damage", valueType: "More", modFlagsAny: 96 /* DOT */ }], id: "b07ed8" },
  { desc: "+# To All Attributes", stats: [{ name: "Attribute", valueType: "Base" }], tags: ["Attribute"], id: "1a540a" },
  { desc: "+# Strength", stats: [{ name: "Strength", valueType: "Base" }], tags: ["Physical", "Attribute"], id: "fa36b3" },
  { desc: "#% Increased Strength", stats: [{ name: "Strength", valueType: "Inc" }], tags: ["Attribute"], id: "30136a" },
  { desc: "#% More Attack Damage Per # Strength", stats: [{ name: "Damage", valueType: "More", modFlagsAll: 1 /* Attack */, tags: [{ type: "PerStat", statName: "strength", index: 1 }] }], tags: ["Attack", "Attribute"], id: "30330f" },
  { desc: "+# Dexterity", stats: [{ name: "Dexterity", valueType: "Base" }], tags: ["Physical", "Attribute"], id: "f15046" },
  { desc: "#% Increased Dexterity", stats: [{ name: "Dexterity", valueType: "Inc" }], tags: ["Attribute"], id: "ff267e" },
  { desc: "#% More Attack Speed Per # Dexterity", stats: [{ name: "AttackSpeed", valueType: "More", tags: [{ type: "PerStat", statName: "dexterity", index: 1 }] }], tags: ["Speed", "Attribute"], id: "de97b1" },
  { desc: "+# Intelligence", stats: [{ name: "Intelligence", valueType: "Base" }], tags: ["Physical", "Attribute"], id: "9382d2" },
  { desc: "#% Increased Intelligence", stats: [{ name: "Intelligence", valueType: "Inc" }], tags: ["Attribute"], id: "ed7c87" },
  { desc: "#% More Maximum Mana Per # Intelligence", stats: [{ name: "MaxMana", valueType: "Inc", tags: [{ type: "PerStat", statName: "intelligence", index: 1 }] }], tags: ["Attribute", "Mana"], id: "0f6507" },
  { desc: "+# Maximum Mana Per # Intelligence", stats: [{ name: "MaxMana", valueType: "Base", tags: [{ type: "PerStat", statName: "intelligence", index: 1 }] }], tags: ["Attribute", "Mana"], id: "e2fb4f" },
  { desc: "#% Reduced Mana Cost Of Skills", stats: [{ name: "AttackSkillCost", valueType: "Inc", negate: true }], tags: ["Skill"], id: "f8655d" },
  { desc: "+#% Damage Over Time Multiplier", stats: [{ name: "DamageOverTimeMultiplier", valueType: "Base" }], tags: ["Damage", "Ailment"], id: "142327" },
  { desc: "+# Maximum Artifacts", stats: [{ name: "Artifact", valueType: "Base" }], id: "51cc9c" },
  { desc: "+# Maximum Insight", stats: [{ name: "Insight", valueType: "Base" }], id: "419541" },
  { desc: "Ailments Linger", stats: [{ name: "LingeringAilments", valueType: "Flag" }], id: "5d6b21" }
];
var playerBaseModTemplates = [
  { desc: "#% Base Bleed Damage Multiplier", stats: [{ name: "BaseBleedDamageMultiplier", valueType: "Base", override: true }], id: "01f233" },
  { desc: "#% Base Burn Damage Multiplier", stats: [{ name: "BaseBurnDamageMultiplier", valueType: "Base", override: true }], id: "7519a5" },
  { desc: "# Base Bleed Duration", stats: [{ name: "BleedDuration", valueType: "Base", override: true }], id: "1ec53c" },
  { desc: "# Base Burn Duration", stats: [{ name: "BurnDuration", valueType: "Base", override: true }], id: "b56e1d" }
];
var globalPlayerModTemplates = [
  ...playerBaseModTemplates,
  { ...playerModTemplates.findStrict((x) => x.desc === "Adds # To # Physical Damage") },
  { ...playerModTemplates.findStrict((x) => x.desc === "+#% Critical Hit Chance") },
  { ...playerModTemplates.findStrict((x) => x.desc === "+# Maximum Bleed Stack") },
  { ...playerModTemplates.findStrict((x) => x.desc === "+# Maximum Burn Stack") },
  { ...playerModTemplates.findStrict((x) => x.desc === "+# To All Attributes") },
  { ...playerModTemplates.findStrict((x) => x.desc === "+# Strength") },
  { ...playerModTemplates.findStrict((x) => x.desc === "#% More Attack Damage Per # Strength") },
  { ...playerModTemplates.findStrict((x) => x.desc === "+# Dexterity") },
  { ...playerModTemplates.findStrict((x) => x.desc === "#% More Attack Speed Per # Dexterity") },
  { ...playerModTemplates.findStrict((x) => x.desc === "+# Intelligence") },
  { ...playerModTemplates.findStrict((x) => x.desc === "+# Maximum Mana Per # Intelligence") },
  { ...playerModTemplates.findStrict((x) => x.desc === "+# Maximum Mana") },
  { ...playerModTemplates.findStrict((x) => x.desc === "+##% Of Maximum Mana Regeneration") },
  { ...playerModTemplates.findStrict((x) => x.desc === "+## Mana Regeneration") },
  { ...playerModTemplates.findStrict((x) => x.desc === "+# Maximum Insight") },
  { ...playerModTemplates.findStrict((x) => x.desc === "+# Maximum Artifacts") }
];
var enemyModTemplates = [
  { desc: "#% Reduced Damage Taken", tags: ["Damage"], stats: [{ name: "DamageTaken", valueType: "Inc", negate: true }], id: "b1be9a" },
  { desc: "+#% Evade Chance", stats: [{ name: "Evade", valueType: "Base" }], id: "e2297b" },
  { desc: "#% Increased Life", tags: ["Life"], stats: [{ name: "Life", valueType: "Inc" }], id: "3d298b" },
  { desc: "#% Reduced Life", tags: ["Life"], stats: [{ name: "Life", valueType: "Inc", negate: true }], id: "7e6b87" }
];
var areaModTemplates = [
  { desc: "#% More Resources Found", stats: [{ name: "Resource", valueType: "More" }], target: "Enemy", id: "6ae302" },
  { desc: "#% More Enemy Life", stats: [{ name: "Life", valueType: "More" }], target: "Enemy", id: "0c0148" },
  { desc: "#% More Enemies", stats: [{ name: "EnemyCount", valueType: "More" }], target: "Area", id: "d4b6e5" }
];
var modTemplates = [
  ...playerModTemplates,
  ...playerBaseModTemplates,
  ...enemyModTemplates,
  ...areaModTemplates
];
assertUniqueStringList(modTemplates.map((x) => x.id), "modTemplates contains non-unique ids");
function sortModifiers(modList) {
  const descriptions = modTemplates.map((x) => x.desc);
  return modList.sort((a, b) => descriptions.indexOf(a.templateDesc) - descriptions.indexOf(b.templateDesc));
}

// src/shared/utils/textParsing.ts
var numerals = ["II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
var numberRangeRegex = /((?<min>[0-9]+(\.[0-9]+)?)([-](?<max>[0-9]+(\.[0-9]+)?))?)/;
var numberRegex = /([0-9]+(\.[0-9]+)?)/;
var integerRegex = /([0]|[1-9][0-9]+)/;
var referenceRegex = /(@\{(?<name>\w+)\})/;
var costRegex = new RegExp(`(?<value>${integerRegex.source}) (?<name>\\w+)`);
var rankNumeralsRegex = new RegExp(` (?<rank>${numerals.join("|")})$`);
var strToKebab = (str) => str.split(" ").join("-").toLowerCase();
function parseTextValues(text) {
  const matches = [...text.matchAll(new RegExp(numberRangeRegex, "g"))];
  const values = [];
  for (const match of matches) {
    assertDefined(match.groups, `failed matching groups on mod: (${text})`);
    const { min, max } = match.groups;
    if (!min) {
      throw `failed matching min value on mod: (${text})`;
    }
    values.push({
      min: parseFloat(min),
      max: parseFloat(max || min),
      value: parseFloat(min),
      startIndex: match.index || 0,
      text: match[0]
    });
  }
  return values;
}
function pluralizeWords(text) {
  text = text.replace(/\b(time)\b/gi, "$1s");
  return text;
}
function textContainsRankNumerals(text) {
  return rankNumeralsRegex.test(text);
}
function compareNamesWithNumerals(name1, name2) {
  return name1.replace(rankNumeralsRegex, "") === name2.replace(rankNumeralsRegex, "");
}

// src/game/mods/Modifier.ts
var Modifier = class _Modifier {
  constructor(text, template, rangeValues) {
    this.text = text;
    this.template = template;
    this.rangeValues = rangeValues;
  }
  weight = 0;
  get id() {
    return this.template.id;
  }
  get tags() {
    return this.template.tags;
  }
  get templateDesc() {
    return this.template.desc;
  }
  get desc() {
    return _Modifier.parseDescription(this.template.desc, this.rangeValues.map((x) => x.value));
  }
  get rawDesc() {
    return this.text.replace(/\{([^}]+)\}/g, "($1)");
  }
  extractStatModifiers() {
    const stats = [];
    for (const [index, stat] of this.template.stats.entries()) {
      const value = stat.valueType === "Flag" ? { value: 1, min: 1, max: 1, decimals: 0 } : this.rangeValues[index];
      if (!value) {
        continue;
      }
      const newStat = { ...stat, ...value };
      for (const tag of newStat.tags || []) {
        if (tag.type === "PerStat") {
          const value2 = this.rangeValues[tag.index || -1]?.value;
          tag.value = value2;
        }
      }
      stats.push(newStat);
    }
    return stats;
  }
  static extractStatModifierList(...items) {
    return items.flatMap((x) => x.extractStatModifiers());
  }
  static toDescription(text) {
    return this.modFromText(text).desc;
  }
  static parseDescription(desc, values) {
    let i = 0;
    return desc.replace(/#+/g, (x) => {
      let value = values[i++];
      assertType(value, isNumber);
      const decimals = x.length - 1;
      value = toDecimals(value, decimals);
      return value.toString() || "#";
    });
  }
  static modsFromTexts(texts) {
    return texts.map((text) => _Modifier.modFromText(text)).filter((x) => x instanceof _Modifier);
  }
  static modFromText(text) {
    const template = _Modifier.getTemplate(text);
    if (!template) {
      console.warn(`invalid mod: ${text}`);
      return _Modifier.empty();
    }
    const values = parseTextValues(text);
    const ranges = values.map((x, i) => ({ min: x.min, max: x.max, value: x.min, decimals: Math.max(0, (template.desc.match(/#+/g)?.[i]?.length || 0) - 1) }));
    return new _Modifier(text, template, ranges);
  }
  static getTemplate(text) {
    const desc = text.replace(/{[^}]+}/g, "#");
    return modTemplates.find((x) => x.desc.replace(/#+/g, "#") === desc);
  }
  sort(other) {
    return modTemplates.findIndex((x) => x.desc === this.templateDesc) - modTemplates.findIndex((x) => x.desc === other.templateDesc);
  }
  static sort(a, b) {
    return a.sort(b);
  }
  compare(other) {
    return this.templateDesc === other.templateDesc;
  }
  static compare(a, b) {
    return a.compare(b);
  }
  copy() {
    const copy = _Modifier.modFromText(this.text);
    copy.setValues(this.rangeValues.map((x) => x.value));
    return copy;
  }
  createHTMLElement(desc) {
    const li = document.createElement("li");
    li.classList.add("g-mod-desc");
    li.setAttribute("data-mod-desc", "");
    li.textContent = desc === "raw" ? this.rawDesc : this.desc;
    return li;
  }
  setValues(values) {
    if (values.length !== this.rangeValues.length) {
      console.error(`${this.templateDesc} has incompatible stats`);
      return;
    }
    for (let i = 0; i < this.rangeValues.length; i++) {
      const rangeValue = this.rangeValues[i];
      if (rangeValue) {
        rangeValue.value = values[i] || 0;
      }
    }
  }
  randomizeValues() {
    for (const rangeValue of this.rangeValues) {
      const pow = Math.pow(10, rangeValue.decimals + 1);
      const min = rangeValue.min * pow;
      const max = rangeValue.max * pow;
      rangeValue.value = randomRangeInt(min, max + 1) / pow;
    }
  }
  serialize() {
    return { text: this.text, id: this.template.id, values: this.rangeValues.map((x) => x.value) };
  }
  static empty() {
    const template = { desc: "[Removed]", stats: [], id: "" };
    return new _Modifier(template.desc, template, []);
  }
};

// src/game/statistics/stats.ts
function createGameStats(parent) {
  const statList = {
    timePlayed: new Statistic({ label: "Time Played", isTime: true }),
    maxLevel: new Statistic({ label: "Max Level", defaultValue: 1 }),
    ascensionCount: new Statistic({ label: "Ascensions", defaultValue: 0, hiddenBeforeMutation: true }),
    totalDamage: new Statistic(),
    totalAttackDamage: new Statistic(),
    totalDamageOverTime: new Statistic(),
    totalPhysicalAttackDamage: new Statistic(),
    totalPhysicalDamage: new Statistic(),
    totalElementalAttackDamage: new Statistic(),
    totalElementalDamage: new Statistic(),
    totalBleedDamage: new Statistic(),
    totalBurnDamage: new Statistic(),
    totalHitCount: new Statistic(),
    totalCriticalHitCount: new Statistic(),
    totalMana: new Statistic()
  };
  if (parent) {
    Object.entries(statList).forEach(([statName, stat]) => {
      const parentStat = parent[statName];
      assertDefined(parentStat);
      stat.addAccumulator(parentStat);
    });
  }
  return statList;
}
function createResourceStats(resourceList) {
  return resourceList.reduce((a, c) => {
    const propertyName = strToKebab(c.name);
    const total = a[`total-${propertyName}`] = new Statistic();
    a[propertyName] = new Statistic({ label: c.name, hiddenBeforeMutation: c.hiddenBeforeMutation, sticky: c.stickyByDefault, accumulators: [total] });
    return a;
  }, {});
}
function createCombatStats() {
  const maxEnemyCount = new Statistic({ computed: true });
  const enemyCount = new Statistic({ label: "Enemies", sticky: true, computed: true, statFormat: (self2) => [self2, "/", maxEnemyCount] });
  return { maxEnemyCount, enemyCount };
}
function createPlayerStats(gameStats) {
  const maxMana = new Statistic({ defaultValue: Infinity, computed: true });
  const minPhysicalDamage = new Statistic({ computed: true });
  const maxPhysicalDamage = new Statistic({ computed: true });
  const minElementalDamage = new Statistic({ computed: true });
  const maxElementalDamage = new Statistic({ computed: true });
  return {
    playerClass: new Statistic({ label: "Player Class", type: "text", defaultValue: -1, computed: true, hiddenBeforeMutation: true }),
    level: new Statistic({ label: "Level", sticky: true, defaultValue: 1 }),
    dps: new Statistic({ label: "DPS", sticky: true, computed: true, decimals: 1, hoverTip: "Damage Per Second" }),
    totalHitCount: new Statistic({ accumulators: [gameStats.totalHitCount] }),
    hitChance: new Statistic({ label: "Hit Chance", sticky: true, computed: true, multiplier: 100, suffix: "%" }),
    attackSpeed: new Statistic({ label: "Attack Speed", sticky: true, computed: true, decimals: 2, hoverTip: "Attacks Per Second" }),
    attackManaCost: new Statistic({ label: "Attack Mana Cost", computed: true }),
    attackEffectiveness: new Statistic({ computed: true }),
    attackTime: new Statistic({ computed: true }),
    //Mana
    maxMana,
    mana: new Statistic({ label: "Mana", sticky: true, defaultValue: Infinity, statFormat: (self2) => [self2, "/", maxMana], accumulators: [gameStats.totalMana] }),
    manaRegeneration: new Statistic({ label: "Mana Regeneration", "decimals": 1, computed: true, sticky: true }),
    //Physical
    physicalAttackDamage: new Statistic({ label: "Physical Attack Damage", computed: true, statFormat: () => [minPhysicalDamage, "-", maxPhysicalDamage] }),
    minPhysicalDamage,
    maxPhysicalDamage,
    //Elemental
    elementalAttackDamage: new Statistic({ label: "Elemental Attack Damage", computed: true, statFormat: () => [minElementalDamage, "-", maxElementalDamage] }),
    minElementalDamage,
    maxElementalDamage,
    //Crit
    criticalHitChance: new Statistic({ label: "Critical Hit Chance", computed: true, multiplier: 100, suffix: "%" }),
    criticalHitMultiplier: new Statistic({ label: "Critical Hit Multiplier", computed: true, multiplier: 100, suffix: "%" }),
    //Bleed
    bleedChanceOnHit: new Statistic({ label: "Bleed Chance", computed: true, multiplier: 100, suffix: "%" }),
    bleedDuration: new Statistic({ label: "Bleed Duration", computed: true, suffix: "s", decimals: 1 }),
    maxBleedStackCount: new Statistic({ label: "Maximum Bleed Stacks", computed: true }),
    minBleedDamage: new Statistic({ computed: true }),
    maxBleedDamage: new Statistic({ computed: true }),
    baseBleedDamageMultiplier: new Statistic({ computed: true }),
    bleedDamageMultiplier: new Statistic({ computed: true }),
    //Burn
    burnChanceOnHit: new Statistic({ label: "Burn Chance", computed: true, multiplier: 100, suffix: "%" }),
    burnDuration: new Statistic({ label: "Burn Duration", computed: true, decimals: 1, suffix: "s" }),
    maxBurnStackCount: new Statistic({ label: "Maximum Burn Stacks", computed: true }),
    baseBurnDamageMultiplier: new Statistic(),
    burnDamageMultiplier: new Statistic({ computed: true }),
    minBurnDamage: new Statistic({ computed: true }),
    maxBurnDamage: new Statistic({ computed: true }),
    //Attributes
    strength: new Statistic({ label: "Strength", computed: true }),
    dexterity: new Statistic({ label: "Dexterity", computed: true }),
    intelligence: new Statistic({ label: "Intelligence", computed: true }),
    //Skills
    auraDurationMultiplier: new Statistic({ computed: true }),
    insightCapacity: new Statistic({ computed: true }),
    maxArtifacts: new Statistic({ computed: true }),
    lingeringAilments: new Statistic({ computed: true, type: "boolean" })
  };
}
function createEnemyStats() {
  return {
    baseLife: new Statistic({}),
    maxLife: new Statistic({ label: "Max Life", sticky: true }),
    life: new Statistic({ label: "Life", sticky: true, valueColorTag: "life" }),
    evadeChance: new Statistic({ computed: true }),
    reducedDamageTaken: new Statistic({ computed: true })
  };
}
function serializeStats(stats) {
  const obj = /* @__PURE__ */ Object.create({});
  for (const [key, stat] of Object.entries(stats)) {
    const hasChanged = [stat.options.sticky || false !== stat.sticky, stat.value !== stat.defaultValue, !stat.options.computed && stat.mutated].some((x) => x);
    if (!hasChanged) {
      continue;
    }
    obj[key] = { sticky: stat.sticky, value: stat.value };
  }
  return obj;
}
function deserializeStats(statList, serializedStats) {
  for (const [key, serializedStat] of Object.entries(serializedStats)) {
    if (!isDefined(serializedStat?.value)) {
      continue;
    }
    const stat = statList[key];
    if (!isDefined(stat)) {
      continue;
    }
    if (compareValueTypes(serializedStat.value, stat.value)) {
      stat.set(serializedStat.value);
    }
    if (isDefined(serializedStat.sticky)) {
      stat.sticky = serializedStat.sticky;
    }
  }
}

// src/game/combat/Enemy.ts
var Enemy = class {
  constructor(enemyData) {
    this.enemyData = enemyData;
    this.stats.baseLife.set(combat.enemyBaseLife);
    this.modList = Modifier.modsFromTexts([...enemyData.enemyModList]);
    this.modDB.add("EnemyMod", Modifier.extractStatModifierList(...this.modList));
    this.modDB.add("AreaMod", Modifier.extractStatModifierList(...Modifier.modsFromTexts(enemyData.zoneModList)));
    this.updateStats();
    this.stats.life.set(this.stats.maxLife.value);
  }
  modDB = new ModDB();
  stats = createEnemyStats();
  modList;
  localRewards = {};
  get life() {
    return this.stats.life.value;
  }
  set life(v) {
    v = clamp(v, 0, this.maxLife);
    this.stats.life.set(v);
  }
  get maxLife() {
    return this.stats.maxLife.value;
  }
  updateStats() {
    calcEnemyStats(this);
  }
  getConditionFlags() {
    let flags = 0;
    if (combat.effectHandler.hasEffect("Bleed")) {
      flags |= 1 /* Bleed */;
    }
    if (combat.effectHandler.hasEffect("Burn")) {
      flags |= 2 /* Burn */;
    }
    return flags;
  }
  serialize() {
    return {
      lifeFraction: clamp(this.life / this.maxLife, 0, 1),
      modList: this.modList.map((x) => x.serialize())
    };
  }
  deserialize(save) {
    if (isNumber(save.lifeFraction)) {
      this.life = this.stats.maxLife.value * save.lifeFraction;
    }
    if (save.modList) {
      for (const serializedMod of save.modList.filter(isDefined)) {
        const mod = this.modList.find((x) => x.template.id === serializedMod.id);
        if (mod && serializedMod.values) {
          mod.setValues(serializedMod.values.filter(isNumber));
        }
      }
    }
    this.modDB.replace("EnemyMod", Modifier.extractStatModifierList(...this.modList));
    this.updateStats();
  }
};

// src/game/combat/Zone.ts
var Zone = class _Zone {
  constructor(data) {
    this.data = data;
    this.name = data.name;
    this.stats.maxEnemyCount = data.enemyBaseCount;
    this.localModList = Modifier.modsFromTexts(data.areaModList);
    this.modList = [...Modifier.modsFromTexts(_Zone.GlobalAreaModList), ...this.localModList];
    this.applyModifiers();
    this.calcStats();
    this._enemy = this.generateEnemy();
  }
  static GlobalAreaModList = [];
  active = false;
  name;
  modDB = new ModDB();
  stats = {
    maxEnemyCount: 0,
    enemyCount: 1
  };
  onComplete = new EventEmitter();
  _enemy;
  _completed = false;
  localModList;
  modList;
  get enemy() {
    return this._enemy;
  }
  get completed() {
    return this._completed;
  }
  set completed(v) {
    this._completed = v;
  }
  applyModifiers() {
    const areaModList = this.modList.filter((x) => x.template.target === "Area");
    const playerModList = this.modList.filter((x) => x.template.target === "Player");
    this.modDB.replace("Zone", Modifier.extractStatModifierList(...areaModList));
    player.modDB.replace("Zone", Modifier.extractStatModifierList(...playerModList));
  }
  calcStats() {
    calcZoneStats({ stats: this.stats, modDB: this.modDB });
  }
  next() {
    if (this.stats.enemyCount === this.stats.maxEnemyCount) {
      this.completed = true;
      this.onComplete.invoke(this);
      return;
    }
    this.stats.enemyCount++;
    this._enemy = this.generateEnemy();
  }
  generateEnemy() {
    const candidate = this.createEnemyCandidate();
    return this.createEnemyFromCandidate(candidate);
  }
  createEnemyCandidate() {
    const candidates = this.data.candidates || [];
    let candidate;
    if (candidates.length === 1) {
      candidate = candidates[0];
    } else {
      const weights = candidates.length === 1 ? [1] : candidates.map((x) => x.weight ?? 1);
      const weightedIndex = getRandomWeightedIndex(weights);
      candidate = candidates[weightedIndex];
    }
    assertDefined(candidate, "failed creating enemy");
    return candidate;
  }
  createEnemyFromCandidate(candidate) {
    const enemyData = {
      id: candidate.id,
      name: candidate.name ?? "Enemy",
      baseLife: this.data.enemyBaseLife,
      enemyModList: candidate.modList ?? [],
      zoneModList: this.modList.filter((x) => x.template.target === "Enemy").map((x) => x.text)
    };
    return new Enemy(enemyData);
  }
  serialize() {
    return {
      active: this.active,
      enemyId: this._enemy.enemyData.id,
      enemyCount: this.stats.enemyCount,
      enemy: this._enemy?.serialize()
    };
  }
  deserialize(save) {
    this.active = save.active ?? false;
    this.stats.enemyCount = Math.min(save.enemyCount || this.stats.maxEnemyCount, this.stats.maxEnemyCount);
    const enemyRef = this.data.candidates.find((x) => x.id === save.enemyId);
    if (save.enemy && enemyRef) {
      this._enemy = this.createEnemyFromCandidate({ ...enemyRef });
      this._enemy.deserialize(save.enemy);
    }
  }
};

// src/game/combat/World.ts
var World = class {
  _zone;
  createZoneAtSetup;
  get zone() {
    return this._zone;
  }
  get baseEnemyCount() {
    return game.module?.enemyBaseCountList[player.level - 1] ?? Infinity;
  }
  setup() {
    player.stats.level.addListener("change", () => {
      if (combat.zone?.name === "World") {
        this._zone = this.createZone();
        combat.startZone(this._zone);
      }
    });
    if (!this.createZoneAtSetup) {
      this._zone = this.createZone();
      this._zone.active = true;
    } else {
      this._zone = this.createZoneAtSetup();
    }
    if (this._zone.active) {
      combat.startZone(this._zone);
    }
  }
  restart() {
    this.reset();
    player.stats.level.set(1);
    if (!this._zone) {
      return;
    }
    const active = this._zone.active;
    this._zone = this.createZone();
    if (active) {
      combat.startZone(this._zone);
    }
  }
  reset() {
    combat.effectHandler.removeAllEffects();
    this._zone = void 0;
    this.createZoneAtSetup = void 0;
  }
  processZoneCompletion() {
    if (player.level < game.maxLevel) {
      player.stats.level.add(1);
    }
    this._zone = this.createZone();
    combat.startZone(this._zone);
  }
  createZone() {
    assertDefined(game.module, "no game module defined");
    const enemyList = game.module.enemyList;
    const zone = new Zone({
      name: "World",
      enemyBaseCount: this.baseEnemyCount,
      enemyBaseLife: combat.enemyBaseLife,
      candidates: enemyList,
      areaModList: []
    });
    if (Number.isFinite(this.baseEnemyCount)) {
      zone.onComplete.listen(this.processZoneCompletion.bind(this));
    }
    return zone;
  }
  serialize(save) {
    if (!this._zone) {
      return;
    }
    const zone = this._zone.serialize();
    save.world = { zone };
  }
  deserialize({ world: save }) {
    if (!save) {
      return;
    }
    const serializedZone = save.zone;
    if (serializedZone) {
      this.createZoneAtSetup = () => {
        const zone = this.createZone();
        zone.deserialize(serializedZone);
        return zone;
      };
    }
  }
};

// src/game/effects/effectSystems.ts
var sortByDamage = (a, b) => b.damage - a.damage;
var EffectSystems = class {
  systems = {
    Bleed: new BleedSystem(),
    Burn: new BurnSystem()
  };
  getSystem(type) {
    const system = this.systems[type];
    return system;
  }
  clear() {
    for (const system of this) {
      system.clear();
    }
  }
  updateValues() {
    for (const system of this) {
      system.update();
    }
  }
  updateElements() {
    for (const system of this) {
      system.updateElements();
    }
  }
  *[Symbol.iterator]() {
    for (const system of Object.values(this.systems)) {
      yield system;
    }
  }
};
var BaseEffectSystem = class {
  constructor(type) {
    this.type = type;
    this.element = this.createElement();
    this.timeSpan = this.element.querySelectorStrict("[data-time]");
    this.stackSpan = this.element.querySelectorStrict("[data-stacks]");
    this.progressBar = this.element.querySelectorStrict("progress");
  }
  element;
  timeSpan;
  stackSpan;
  progressBar;
  _effectInstances = [];
  time = 0;
  sort = (a, b) => b.time - a.time;
  get effectInstances() {
    return this._effectInstances;
  }
  update() {
    let maxTime = 0;
    for (const effectInstance of this._effectInstances) {
      effectInstance.time = this.duration * effectInstance.timePct;
      maxTime = Math.max(maxTime, effectInstance.time);
    }
  }
  addEffect(effect) {
    this.effectInstances.push(effect);
    this.time = effect.time;
    this.update();
    this.updateElements();
  }
  removeEffect(effect) {
    this._effectInstances.remove(effect);
    this.updateElements();
  }
  clear() {
    this._effectInstances = [];
  }
  updateElements() {
    const stacks = Math.min(this._effectInstances.length, this.maxStacks);
    const visible = stacks > 0 && this.time > 0;
    this.element.classList.toggle("hidden", !visible);
    if (!visible) {
      return;
    }
    this.timeSpan.textContent = `${this.time.toFixed()}s`;
    this.stackSpan.textContent = stacks.toFixed();
    const pct = this.time / this.duration;
    this.progressBar.value = Number.isFinite(pct) ? pct : 0;
  }
  dealDamageOverTime(effectInstances, dt) {
    const count = Math.min(effectInstances.length, this.maxStacks);
    for (let i = 0; i < count; i++) {
      const instance = effectInstances[i];
      if (!instance) {
        break;
      }
      const damage = instance.damage * dt;
      combat.dealDamageOverTime(damage, instance.type);
    }
  }
  tick(dt) {
    let maxTime = 0;
    for (let i = this._effectInstances.length - 1; i >= 0; i--) {
      const effectInstance = this._effectInstances[i];
      if (!effectInstance) {
        continue;
      }
      effectInstance.time -= dt;
      maxTime = Math.max(effectInstance.time, maxTime);
      if (effectInstance.time <= 0) {
        this.removeEffect(effectInstance);
      }
      effectInstance.timePct = effectInstance.time / this.duration;
    }
    this.time = Math.min(maxTime, this.duration);
  }
  createElement() {
    const li = document.createElement("li");
    li.classList.add("hidden", "s-effect");
    li.insertAdjacentHTML("beforeend", `<div><span>${this.type}</span> | Time: <span data-time></span> | Stacks: <span data-stacks></span></div>`);
    li.insertAdjacentHTML("beforeend", `<progress value="0" max="1"></progress>`);
    return li;
  }
  serialize() {
    return this._effectInstances.map((x) => ({ type: x.type, timePct: x.timePct, effectivenessFactor: x.effectivenessFactor }));
  }
};
var BleedSystem = class extends BaseEffectSystem {
  type = "Bleed";
  constructor() {
    super("Bleed");
    this.sort = sortByDamage;
  }
  get maxStacks() {
    return player.stats.maxBleedStackCount.value;
  }
  get duration() {
    return player.stats.bleedDuration.value;
  }
  update() {
    super.update();
    for (const instance of this._effectInstances) {
      instance.damage = lerp(player.stats.minBleedDamage.value, player.stats.maxBleedDamage.value, instance.effectivenessFactor);
    }
    this._effectInstances.sort(this.sort);
  }
  tick(dt) {
    this.dealDamageOverTime(this._effectInstances, dt);
    super.tick(dt);
  }
};
var BurnSystem = class extends BaseEffectSystem {
  type = "Burn";
  constructor() {
    super("Burn");
    this.sort = sortByDamage;
  }
  get maxStacks() {
    return player.stats.maxBurnStackCount.value;
  }
  get duration() {
    return player.stats.burnDuration.value;
  }
  update() {
    super.update();
    for (const instance of this._effectInstances) {
      instance.damage = lerp(player.stats.minBurnDamage.value, player.stats.maxBurnDamage.value, instance.effectivenessFactor);
    }
    this._effectInstances.sort(this.sort);
  }
  tick(dt) {
    this.dealDamageOverTime(this._effectInstances, dt);
    super.tick(dt);
  }
};

// src/game/effects/Effects.ts
var Effects = class {
  onEffectChanged = new EventEmitter();
  systems = new EffectSystems();
  init() {
    gameLoopAnim.registerCallback(() => this.systems.updateElements());
    gameLoop.registerCallback((dt) => this.tick(dt));
    player.onStatsChange.listen(() => this.updateInstances());
    const effectListContainer = combat.page.querySelectorStrict("[data-effect-list]");
    effectListContainer.replaceChildren();
    for (const system of this.systems) {
      effectListContainer.appendChild(system.element);
    }
  }
  setup() {
    this.systems.updateValues();
    this.systems.updateElements();
  }
  hasEffect(type) {
    return this.systems.getSystem(type).effectInstances.length > 0;
  }
  reset() {
    this.removeAllEffects();
  }
  addEffects(...effects) {
    for (const effectData of effects) {
      const system = this.systems.getSystem(effectData.type);
      const instance = {
        type: effectData.type,
        timePct: effectData.timePct || 1,
        time: 0,
        effectivenessFactor: effectData.effectivenessFactor
      };
      system.addEffect(instance);
      this.onEffectChanged.invoke(effectData.type);
    }
    this.updateInstances();
  }
  removeEffects(...effects) {
    for (const effect of effects) {
      const system = this.systems.getSystem(effect.type);
      system.removeEffect(effect);
      this.onEffectChanged.invoke(effect.type);
    }
    player.updateStats();
    combat.enemy?.updateStats();
  }
  removeAllEffects() {
    this.systems.clear();
    this.systems.updateElements();
  }
  updateInstances() {
    this.systems.updateValues();
  }
  tick(dt) {
    for (const system of this.systems) {
      const instanceCount = system.effectInstances.length;
      if (instanceCount === 0) {
        continue;
      }
      system.tick(dt);
      if (system.effectInstances.length !== instanceCount) {
        this.onEffectChanged.invoke(system.type);
      }
    }
  }
  serialize(save) {
    const effects = [];
    for (const system of this.systems) {
      const serializedEffects = system.serialize();
      effects.push(...serializedEffects);
    }
    save.effects = effects;
  }
  deserialize({ effects: save }) {
    if (!save) {
      return;
    }
    for (const serializedEffect of save || []) {
      if (!serializedEffect) {
        continue;
      }
      if (!isString(serializedEffect.type)) {
        continue;
      }
      const system = this.systems.getSystem(serializedEffect.type);
      system.effectInstances.push({
        type: serializedEffect.type,
        timePct: serializedEffect.timePct || 0,
        time: 0,
        effectivenessFactor: serializedEffect.effectivenessFactor
      });
    }
  }
};

// src/shared/customElements/customElements.ts
function createCustomElement(ctor) {
  const name = ctor.name;
  if (!customElements.get(name)) {
    customElements.define(name, ctor);
  }
  const element = document.createElement(name);
  element.init?.();
  return element;
}

// src/shared/customElements/CustomElement.ts
var CustomElement = class extends HTMLElement {
  cloneNode(deep) {
    super.cloneNode(deep);
    this.init?.();
    return this;
  }
};

// src/shared/customElements/PromptWindowElement.ts
var PromptWindowElement = class extends CustomElement {
  static name = "prompt-window-element";
  set minWidth(v) {
    this.querySelectorStrict("[data-body]").style.minWidth = v;
  }
  init() {
    const content = document.createElement("div");
    content.classList.add("s-content");
    this.appendChild(content);
    content.insertAdjacentHTML("beforeend", '<div class="title" data-title></div>');
    content.insertAdjacentHTML("beforeend", '<div class="s-body" data-body></div>');
    content.insertAdjacentHTML("beforeend", '<div class="s-buttons" data-buttons></div>');
    const backdrop = document.createElement("div");
    backdrop.classList.add("backdrop");
    backdrop.addEventListener("click", () => {
      this.remove();
    });
    this.appendChild(backdrop);
    document.body.appendChild(this);
  }
  setTitle(text) {
    this.querySelectorStrict("[data-title]").textContent = text;
  }
  setBodyText(text) {
    this.querySelectorStrict("[data-body]").textContent = text;
  }
  setBodyElement(element) {
    this.querySelectorStrict("[data-body]").appendChild(element);
  }
  async setButtons(buttons, align = "horizontal") {
    return new Promise((resolve) => {
      const buttonElements = [];
      for (const buttonData of buttons) {
        const button = document.createElement("button");
        button.setAttribute("type", "submit");
        if (buttonData.type) {
          button.setAttribute("data-role", buttonData.type);
        }
        button.textContent = buttonData.text;
        button.addEventListener("click", async () => {
          await buttonData.callback?.();
          this.remove();
          resolve(buttonData.waitId);
        });
        buttonElements.push(button);
      }
      const buttonsElement = this.querySelectorStrict("[data-buttons]");
      buttonsElement.replaceChildren(...buttonElements);
      buttonsElement.style.display = "flex";
      buttonsElement.style.flexDirection = align === "horizontal" ? "column" : "row";
    });
  }
};

// src/game/combat/Combat.ts
var Combat = class {
  enemyDeathEvent = new EventEmitter();
  stats = createCombatStats();
  page;
  lifebarElement;
  _zone;
  effectHandler;
  constructor() {
    this.page = document.createElement("div");
    this.page.classList.add("p-combat", "hidden");
    this.lifebarElement = game.page.querySelectorStrict("[data-combat-overview] [data-life-bar]");
    const enemyLabel = game.page.querySelectorStrict("[data-combat-overview] [data-enemy-name]");
    enemyLabel.addEventListener("click", () => {
      const body = document.createElement("ul");
      body.classList.add("g-mod-list");
      for (const mod of this._zone?.enemy.modList ?? []) {
        body.insertAdjacentHTML("beforeend", `<li>${mod.desc}</li>`);
      }
      const prompt = createCustomElement(PromptWindowElement);
      prompt.minWidth = "15em";
      prompt.setTitle("Enemy Modifiers");
      prompt.setBodyElement(body);
    });
    const effectsElement = document.createElement("div");
    effectsElement.classList.add("s-effects");
    effectsElement.insertAdjacentHTML("beforeend", '<div class="g-title">Effects</div>');
    effectsElement.insertAdjacentHTML("beforeend", '<ul class="effect-list" data-effect-list></ul>');
    this.page.appendChild(effectsElement);
    const areaMods = document.createElement("div");
    areaMods.classList.add("s-area-mods", "hidden");
    areaMods.setAttribute("data-area-mods", "");
    areaMods.insertAdjacentHTML("beforeend", '<div class="g-title">Area Modifiers</div>');
    areaMods.insertAdjacentHTML("beforeend", '<ul class="area-mod-list g-mod-list" data-area-mod-list></ul>');
    this.page.appendChild(areaMods);
    this.effectHandler = new Effects();
    game.addPage(this.page, "Combat", "combat", -10);
  }
  get zone() {
    return this._zone;
  }
  get enemy() {
    return this._zone?.enemy;
  }
  get enemyBaseLife() {
    const enemyBaseLifeList = game.module?.enemyBaseLifeList ?? [];
    const index = clamp(player.level - 1, 0, enemyBaseLifeList.length - 1);
    return enemyBaseLifeList[index] ?? Infinity;
  }
  init() {
    this._zone = void 0;
    statistics.createGroup("Combat", this.stats);
    this.effectHandler.init();
    gameLoopAnim.registerCallback(this.updateLifebar.bind(this), { delay: 100 });
    this.beginAutoAttack();
  }
  startZone(zone) {
    if (this._zone) {
      this._zone.active = false;
    }
    if (!zone) {
      zone = world.zone ?? null;
      assertNonNullable(zone);
    }
    this._zone = zone;
    this._zone.active = true;
    this.stats.maxEnemyCount.set(zone.stats.maxEnemyCount);
    this.stats.enemyCount.set(Number.isFinite(zone.stats.maxEnemyCount) ? zone.stats.enemyCount : Infinity);
    this.updateLifebarName();
    this.updateElements();
    statistics.updateStats("Combat");
  }
  stopZone(zone) {
    zone.active = false;
    assertDefined(world.zone);
    this.effectHandler.removeAllEffects();
    this.startZone(world.zone);
  }
  processEnemyDeath(enemy) {
    assertDefined(this._zone);
    if (player.stats.lingeringAilments.value === 0) {
      this.effectHandler.removeAllEffects();
    }
    this.enemyDeathEvent.invoke({ zone: this._zone, enemy });
    this._zone.next();
    if (this._zone.completed) {
      assertDefined(world.zone);
      this.startZone(world.zone);
      return;
    }
    player.updateStats();
    this.stats.enemyCount.set(this._zone.stats.enemyCount);
    this.updateElements();
    statistics.updateStats("Combat");
  }
  updateElements() {
    this.updateLifebar();
    game.page.querySelectorStrict("[data-combat-overview] [data-enemy-name]").textContent = this.zone?.enemy.enemyData.name ?? "unknown";
    this.updateAreaModListContainer();
  }
  beginAutoAttack() {
    const calcAttackTime = () => 1 / player.stats.attackSpeed.value;
    let attackWaitTime = calcAttackTime();
    player.stats.attackSpeed.addListener("change", () => {
      attackWaitTime = calcAttackTime();
    });
    const attackLoop = ((dt) => {
      player.stats.attackTime.add(dt);
      if (player.stats.attackTime.value >= attackWaitTime) {
        const manaCost = player.stats.attackManaCost.value;
        if (player.stats.mana.value < manaCost) {
          return;
        }
        player.stats.mana.subtract(manaCost);
        this.performAttack();
        player.stats.attackTime.set(0);
      }
    }).bind(this);
    gameLoop.registerCallback(attackLoop);
  }
  performAttack() {
    const enemy = this.enemy;
    assertDefined(enemy, "enemy is undefined");
    const result = calcAttack({ stats: player.stats, modDB: player.modDB }, enemy);
    if (!result) {
      return;
    }
    game.stats.totalPhysicalAttackDamage.add(result.physicalDamage);
    game.stats.totalElementalAttackDamage.add(result.elementalDamage);
    game.stats.totalHitCount.add(1);
    if (result.crit) {
      game.stats.totalCriticalHitCount.add(1);
    }
    this.dealDamage(result.totalDamage);
    if (result.effects.length > 0) {
      this.effectHandler.addEffects(...result.effects);
    }
  }
  dealDamage(damage) {
    if (!this._zone || !this._zone.enemy) {
      return;
    }
    const enemy = this._zone.enemy;
    enemy.life -= damage;
    if (enemy.life <= 0) {
      this.processEnemyDeath(enemy);
    }
  }
  dealDamageOverTime(damage, type) {
    this.dealDamage(damage);
    game.stats.totalDamage.add(damage);
    const damageType = type === "Bleed" ? "Physical" : "Elemental";
    game.stats[`total${damageType}Damage`].add(damage);
    game.stats[`total${type}Damage`].add(damage);
    game.stats.totalDamage.add(damage);
    game.stats[`total${type}Damage`].add(damage);
    game.stats[`total${damageType}Damage`].add(damage);
  }
  updateLifebar() {
    const life = this._zone?.enemy?.life ?? 0;
    const maxLife = this._zone?.enemy?.stats.maxLife.value ?? 0;
    const value = life / maxLife;
    this.lifebarElement.value = Number.isFinite(value) ? value : 1;
  }
  updateLifebarName() {
    assertDefined(this._zone);
    game.page.querySelectorStrict("[data-combat-overview] [data-enemy-name]").textContent = this._zone.enemy.enemyData.name;
  }
  updateAreaModListContainer() {
    assertDefined(this._zone);
    const container = this.page.querySelectorStrict("[data-area-mods]");
    const modList = this._zone.localModList;
    container.classList.toggle("hidden", modList.length === 0);
    if (!modList) {
      return;
    }
    const modListElement = container.querySelectorStrict("[data-area-mod-list]");
    modListElement.replaceChildren();
    for (const mod of modList ?? []) {
      modListElement.insertAdjacentHTML("beforeend", `<li>${mod.desc}</li>`);
    }
  }
  reset() {
    this._zone = void 0;
    this.effectHandler.reset();
    this.enemyDeathEvent.removeAllListeners();
    Zone.GlobalAreaModList.clear();
  }
};

// src/game/components/Component.ts
var Component = class {
  constructor(name) {
    this.name = name;
    this.page = document.createElement("div");
    this.page.classList.add(`p-${name}`, "hidden");
    game.page.querySelectorStrict("[data-main-view]").appendChild(this.page);
    this.page.setAttribute("data-page-content", name);
  }
  page;
};

// src/game/tasks/taskTemplates.ts
var taskTemplates = [
  { desc: "Reach Level #", progress: (data) => data.gameStats.maxLevel.value / data.value },
  { desc: "Ascend # Times", progress: (data) => data.gameStats.ascensionCount.value / data.value },
  { desc: "Obtain # @Resource", progress: (data) => (data.resourceStats[`total-${data.reference}`]?.value ?? 0) / data.value },
  { desc: "Deal # Total Physical Attack Damage", progress: (data) => data.gameStats.totalPhysicalAttackDamage.value / data.value },
  { desc: "Deal # Total Elemental Attack Damage", progress: (data) => data.gameStats.totalElementalAttackDamage.value / data.value },
  { desc: "Deal # Total Physical Damage", progress: (data) => data.gameStats.totalPhysicalDamage.value / data.value },
  { desc: "Deal # Total Elemental Damage", progress: (data) => data.gameStats.totalElementalDamage.value / data.value },
  { desc: "Deal # Total Bleed Damage", progress: (data) => data.gameStats.totalBleedDamage.value / data.value },
  { desc: "Deal # Total Burn Damage", progress: (data) => data.gameStats.totalBurnDamage.value / data.value },
  { desc: "Perform # Critical Hits", progress: (data) => data.gameStats.totalCriticalHitCount.value / data.value },
  { desc: "Regenerate # Mana", progress: (data) => data.gameStats.totalMana.value / data.value }
];

// src/game/tasks/Task.ts
var Task = class {
  text;
  desc;
  textData;
  constructor(text) {
    try {
      this.text = text;
      const extractValues = () => {
        const matches = [...text.matchAll(new RegExp(`\\{(${numberRegex.source})\\}`, "gd"))];
        return matches.map((match) => {
          const indices = match.indices?.[0];
          assertDefined(indices);
          assertDefined(match[1]);
          const value = parseFloat(match[1]);
          return { value, indices };
        });
      };
      const extractReferences = () => {
        const matches = [...text.matchAll(new RegExp(referenceRegex.source, "gd"))];
        return matches.map((match) => {
          const indices = match.indices?.[0];
          assertDefined(indices);
          assertDefined(match[2]);
          const value = match[2];
          return { value, indices };
        });
      };
      this.textData = {
        values: extractValues(),
        references: extractReferences()
      };
      this.desc = text.replace(/{[^}]+}/g, "#").replace(/@(\w+)({[^}]+})/g, "@$1");
    } catch (error) {
      console.error(error);
      throw new Error(`invalid task description: ${text}`);
    }
  }
  get completed() {
    return this.getProgess() >= 1;
  }
  get pct() {
    return Math.min(this.getProgess(), 1);
  }
  getProgess() {
    const template = taskTemplates.find((x) => x.desc === pluralizeWords(this.desc));
    assertDefined(template, "invalid description");
    const values = this.textData.values.map((x) => x.value);
    const references = this.textData.references.map((x) => x.value);
    const pct = template.progress({
      gameStats: game.stats,
      resourceStats: game.resources,
      playerStats: player.stats,
      value: values[0] ?? 0,
      values,
      reference: references[0] ?? "",
      references
    });
    return pct;
  }
  createHTML() {
    let offset = 0;
    const html = [...this.textData.values, ...this.textData.references].sort((a, b) => a.indices[0] - b.indices[0]).reduce((a, c) => {
      a += this.text.substring(offset, c.indices[0]).concat(`<var data-type="${typeof c.value}">${c.value.toString()}</var>`);
      offset = c.indices[1];
      return a;
    }, "").concat(this.text.substring(offset));
    return `<div>${html}</div>`;
  }
};

// src/shared/customElements/AccordionElement.ts
var AccordionElement = class extends CustomElement {
  static name = "accordion-element";
  header;
  contentParent;
  content;
  onToggle = new EventEmitter();
  _isOpen = false;
  constructor() {
    super();
    this.header = document.createElement("div");
    this.header.classList.add("header");
    this.header.setAttribute("data-header", "");
    this.header.insertAdjacentHTML("beforeend", '<div class="title" data-title></div>');
    this.header.addEventListener("click", () => {
      if (!this.content.firstChild?.hasChildNodes()) {
        return;
      }
      this.toggle(!this.open);
    });
    this.contentParent = document.createElement("div");
    this.contentParent.classList.add("content-parent");
    this.content = document.createElement("div");
    this.content.classList.add("s-content");
    this.content.setAttribute("data-content", "");
    this.contentParent.appendChild(this.content);
  }
  init() {
    this.replaceChildren(this.header, this.contentParent);
  }
  get open() {
    return this._isOpen;
  }
  setTitle(title) {
    this.header.querySelectorStrict("[data-title]").textContent = title;
  }
  setTitleElement(element) {
    this.header.querySelectorStrict("[data-title]").replaceWith(element);
  }
  setContentElements(...element) {
    this.content.replaceChildren(...element);
    this.header.classList.toggle("has-content", this.content.childElementCount > 0);
  }
  toggle(open) {
    this._isOpen = isDefined(open) ? open : !this._isOpen;
    this.header.classList.toggle("open", this.open);
    this.onToggle.invoke(this.open);
  }
};

// src/game/components/achievements/Achievements.ts
var Achievements = class extends Component {
  constructor(data) {
    super("achievements");
    this.data = data;
    this.page.insertAdjacentHTML("beforeend", "<ul data-achievement-list></ul>");
    const container = this.page.querySelectorStrict("[data-achievement-list]");
    for (const achievementData of data.achievementList) {
      const achievement = new Achievement(this, achievementData);
      container.appendChild(achievement.element);
      this.achievements.push(achievement);
    }
    setTimeout(() => {
      this.achievements.forEach((x) => {
        x.updateLabel();
        x.tryCompletion();
      });
    }, 1);
    game.tickSecondsEvent.listen(() => {
      const visible = !this.page.classList.contains("hidden");
      this.achievements.forEach((x) => {
        x.tryCompletion();
        if (visible) {
          x.updateLabel();
        }
      });
    });
  }
  achievements = [];
};
var Achievement = class {
  constructor(achievements, data) {
    this.achievements = achievements;
    this.data = data;
    this.task = new Task(data.description);
    this.element = this.createElement();
  }
  task;
  element;
  completed = false;
  get taskCompleted() {
    return this.task.completed;
  }
  tryCompletion() {
    if (!this.taskCompleted || this.completed) {
      return;
    }
    if (this.data.modList) {
      const modifiers = this.data.modList.flatMap((x) => Modifier.modFromText(x)?.extractStatModifiers() || []);
      const source = `Achievement/${this.data.description}`;
      player.modDB.add(source, modifiers);
    }
    this.updateLabel();
    this.completed = true;
    this.element.querySelectorStrict("[data-pct]").setAttribute("data-valid", "");
  }
  updateLabel() {
    if (this.completed) {
      return;
    }
    this.element.querySelectorStrict("[data-pct]").textContent = `${(this.task.pct * 100).toFixed()}%`;
  }
  createElement() {
    const accordion = createCustomElement(AccordionElement);
    accordion.classList.add("s-achievement");
    const textData = parseTextValues(this.task.text)[0];
    assertDefined(textData);
    const titleElement = document.createElement("div");
    titleElement.classList.add("title-content");
    const descHTML = this.task.createHTML();
    const progressElement = document.createElement("div");
    progressElement.insertAdjacentHTML("beforeend", "<var data-pct></var>");
    titleElement.insertAdjacentHTML("beforeend", descHTML);
    titleElement.insertAdjacentElement("beforeend", progressElement);
    accordion.setTitleElement(titleElement);
    if (this.data.modList) {
      const content = document.createElement("div");
      for (const modText of this.data.modList) {
        const mod = Modifier.modFromText(modText);
        content.insertAdjacentHTML("beforeend", `<li class="g-mod-desc">${mod.desc}</li>`);
      }
      accordion.setContentElements(content);
    }
    return accordion;
  }
};

// src/game/components/skills/AttackSkills.ts
var AttackSkills = class {
  page;
  _activeSkill;
  selectedSkill;
  skillList;
  constructor(data) {
    this.page = document.createElement("div");
    this.page.classList.add("p-attack-skills");
    this.page.insertAdjacentHTML("beforeend", '<div class="g-title">Skill List</div>');
    this.page.insertAdjacentHTML("beforeend", '<ul class="s-skill-list" data-skill-list></ul>');
    this.page.insertAdjacentHTML("beforeend", '<div class="s-skill-info" data-skill-info></div>');
    this.skillList = data.attackSkillList.map((data2) => {
      const element = document.createElement("li");
      element.classList.add("g-list-item");
      element.setAttribute("data-id", data2.id);
      element.toggleAttribute("disabled");
      element.textContent = "?????";
      element.addEventListener("click", () => this.selectSkillByName(data2.name));
      return { name: data2.name, data: data2, pickProbability: data2.pickProbability, unlocked: data2.pickProbability === 0, element };
    });
    this.skillList.forEach((x) => x.element.classList.toggle("hidden", textContainsRankNumerals(x.name)));
    this.page.querySelectorStrict("[data-skill-list]").append(...this.skillList.map((x) => x.element));
    this.skillList.filter((x) => x.data.pickProbability === 0).forEach((x) => {
      this.unlockSkill(x);
    });
    const firstSkill = this.skillList.findStrict((x) => x.pickProbability === 0);
    assertDefined(firstSkill, "no attack skill available, at least 1 attack skill must have a pickProbability of 0");
    this._activeSkill = firstSkill;
    this.assignSkill(this._activeSkill);
    this.selectedSkill = this._activeSkill;
    this.selectSkillByName(this._activeSkill.data.name);
    combat.enemyDeathEvent.listen((_, instance) => {
      this.processSkillUnlock();
      if (this.skillList.every((x) => x.unlocked)) {
        instance.removeListener();
      }
    });
  }
  get activeSkill() {
    return this._activeSkill;
  }
  get canAssignSkill() {
    return this.selectedSkill !== this._activeSkill;
  }
  assignSkill(skill) {
    this._activeSkill.element.removeAttribute("data-tag");
    this._activeSkill = skill;
    const statModList = [
      ...Modifier.extractStatModifierList(...Modifier.modsFromTexts(skill.data.modList)),
      { name: "AttackSpeed", valueType: "Base", value: skill.data.attackSpeed, override: true },
      { name: "AttackManaCost", value: skill.data.manaCost, valueType: "Base" }
    ];
    player.stats.attackEffectiveness.set(skill.data.attackEffectiveness);
    player.modDB.replace("AttackSkill", statModList);
    skill.element.setAttribute("data-tag", "valid");
  }
  selectSkillByName(name) {
    const skill = this.skillList.findStrict((x) => x.data.name === name);
    this.selectedSkill = skill;
    this.showSkill(skill);
    this.skillList.forEach((x) => x.element.classList.toggle("selected", x === skill));
  }
  showSkill(skill) {
    const element = this.page.querySelectorStrict("[data-skill-info]");
    element.replaceChildren();
    element.insertAdjacentHTML("beforeend", `<div class="g-title">${skill.data.name}</div>`);
    const propertyListElement = document.createElement("ul");
    propertyListElement.insertAdjacentHTML("beforeend", `<li class="g-field"><div>Attack Speed</div><div>${skill.data.attackSpeed.toFixed(2)}</div></li>`);
    propertyListElement.insertAdjacentHTML("beforeend", `<li class="g-field"><div>Attack Effectiveness</div><div>${skill.data.attackEffectiveness.toFixed()}%</div></li>`);
    propertyListElement.insertAdjacentHTML("beforeend", `<li class="g-field"><div>Mana Cost</div><div>${skill.data.manaCost.toFixed()}</div></li>`);
    element.appendChild(propertyListElement);
    const modListElement = document.createElement("ul");
    modListElement.classList.add("g-mod-list");
    for (const mod of skill.data.modList) {
      modListElement.insertAdjacentHTML("beforeend", `<li>${Modifier.toDescription(mod)}</li>`);
    }
    element.appendChild(modListElement);
    const button = document.createElement("button");
    button.textContent = "Assign";
    const updateButton = () => {
      button.toggleAttribute("disabled", skill === this._activeSkill);
    };
    button.addEventListener("click", () => {
      this.assignSkill(skill);
      updateButton();
    });
    updateButton();
    element.appendChild(button);
  }
  processSkillUnlock() {
    const skill = calcItemProbability(this.skillList);
    if (!skill) {
      return;
    }
    this.unlockSkill(skill);
    notifications.addNotification({
      title: `New Attack Skill: ${skill.name}`,
      description: "wow, a new attack skill. That's amazing!",
      elementId: skill.data.id
    });
  }
  unlockSkill(skill) {
    skill.unlocked = true;
    skill.element.textContent = skill.data.name;
    skill.element.removeAttribute("disabled");
    skill.element.classList.remove("hidden");
  }
  serialize() {
    return { skillName: this._activeSkill.data.name, skillNameList: this.skillList.filter((x) => x.unlocked).map((x) => x.data.name) };
  }
  deserialize(save) {
    const activeSkill = this.skillList.find((x) => x.data.name === save?.skillName);
    if (activeSkill) {
      this.assignSkill(activeSkill);
      this.selectSkillByName(activeSkill.data.name);
    }
    const skillList = this.skillList.filter((x) => save?.skillNameList?.includes(x.data.name));
    for (const skill of skillList) {
      this.unlockSkill(skill);
    }
  }
};

// src/game/components/skills/AuraSkills.ts
var AuraSkills = class {
  page;
  skillList;
  skillSlotList;
  selectedSkillSlot;
  constructor(data) {
    this.page = document.createElement("div");
    this.page.classList.add("p-aura-skills");
    this.page.insertAdjacentHTML("beforeend", '<div class="g-title">Skill Slots</div>');
    this.page.insertAdjacentHTML("beforeend", '<ul class="s-skill-slot-list" data-skill-slot-list></ul>');
    this.page.insertAdjacentHTML("beforeend", '<div class="g-title">Skill List</div>');
    this.page.insertAdjacentHTML("beforeend", '<ul class="s-skill-list" data-skill-list></ul>');
    this.page.insertAdjacentHTML("beforeend", '<div class="s-skill-info" data-skill-info></div>');
    this.skillList = data.auraSkillList.map((data2) => {
      const element = document.createElement("li");
      element.classList.add("g-list-item");
      element.setAttribute("data-id", data2.id);
      element.toggleAttribute("disabled");
      element.textContent = "?????";
      element.addEventListener("click", () => this.selectSkillByName(data2.name));
      return { name: data2.name, data: data2, pickProbability: data2.pickProbability, unlocked: data2.pickProbability === 0, element };
    });
    this.skillList.forEach((x) => x.element.classList.toggle("hidden", textContainsRankNumerals(x.name)));
    this.page.querySelectorStrict("[data-skill-list]").append(...this.skillList.map((x) => x.element));
    this.skillList.filter((x) => x.data.pickProbability === 0).forEach((x) => this.unlockSkill(x));
    this.skillSlotList = [];
    for (const skillSlot of data.auraSkillSlotList) {
      player.stats.level.registerTargetValueCallback(skillSlot.level, () => this.createSkillSlot());
    }
    this.skillSlotList[0]?.element.click();
    this.skillList.find((x) => x.unlocked)?.element.click();
    gameLoopAnim.registerCallback(() => {
      this.skillSlotList.forEach((x) => this.updateSkillSlotProgressBar(x));
    });
    combat.enemyDeathEvent.listen((_, instance) => {
      this.processSkillUnlock();
      if (this.skillList.every((x) => x.unlocked)) {
        instance.removeListener();
      }
    });
    player.stats.auraDurationMultiplier.addListener("change", ({ curValue }) => {
      this.skillSlotList.filter((x) => x.skill).forEach((x) => {
        const pct = x.time / x.duration;
        const duration = (x.skill?.data.baseDuration || 0) * (curValue / 100);
        x.time = duration * pct;
        x.duration = duration;
      });
    });
  }
  createSkillSlot() {
    const element = this.createSkillSlotElement();
    const progressBar = element.querySelectorStrict("progress");
    const slot = {
      element,
      progressBar,
      skill: null,
      time: 0,
      duration: 0
    };
    slot.element.addEventListener("click", () => this.selectSkillSlot(slot));
    this.skillSlotList.push(slot);
    this.page.querySelectorStrict("[data-skill-slot-list]").appendChild(element);
  }
  createSkillSlotElement() {
    const element = document.createElement("li");
    element.classList.add("skill-slot");
    element.setAttribute("data-skill-slot", "");
    const title = document.createElement("div");
    title.classList.add("s-title");
    title.insertAdjacentHTML("beforeend", "<span data-skill-name>[Empty Slot]</span>");
    element.appendChild(title);
    element.insertAdjacentHTML("beforeend", '<progress value="0" max="1"></progress>');
    return element;
  }
  selectSkillSlot(skillSlot) {
    const previousSkillSlot = this.selectedSkillSlot;
    this.selectedSkillSlot = skillSlot;
    this.skillSlotList.forEach((x) => x.element.classList.toggle("selected", x === skillSlot));
    if (!skillSlot.skill) {
      return;
    }
    if (previousSkillSlot !== skillSlot) {
      return;
    }
    this.selectSkillByName(skillSlot.skill.data.name);
  }
  updateSkillSlotProgressBar(skillSlot) {
    skillSlot.progressBar.value = (skillSlot.time || 0) / (skillSlot.skill?.data.baseDuration || 1);
  }
  clearSkillSlot(skillSlot) {
    if (!skillSlot.skill) {
      return;
    }
    this.stopActiveSkill(skillSlot);
    skillSlot.element.classList.remove("m-has-skill");
    skillSlot.element.querySelectorStrict("[data-skill-name]").textContent = "[Empty Slot]";
    skillSlot.skill.element.removeAttribute("data-tag");
    skillSlot.skill = null;
  }
  startActiveSkill(skillSlot) {
    assertNonNullable(skillSlot.skill, "skill slot contains no skill");
    assertNullable(skillSlot.unregisterLoopCallback);
    const unregisterLoopCallback = gameLoop.registerCallback(() => {
      if (!skillSlot.skill || skillSlot.unregisterLoopCallback) {
        unregisterLoopCallback();
        return;
      }
      const manaCost = skillSlot.skill.data.manaCost;
      const sufficientMana = manaCost <= player.stats.mana.value;
      if (!sufficientMana) {
        return;
      }
      unregisterLoopCallback();
      player.stats.mana.subtract(manaCost);
      skillSlot.time = skillSlot.skill.data.baseDuration * player.stats.auraDurationMultiplier.value;
      this.triggerSkillInSlot(skillSlot);
    });
  }
  triggerSkillInSlot(skillSlot) {
    assertNonNullable(skillSlot.skill);
    assertNullable(skillSlot.unregisterLoopCallback);
    this.applySkillModifiers(skillSlot.skill);
    skillSlot.unregisterLoopCallback = gameLoop.registerCallback(this.processActiveSkill.bind(this, skillSlot));
  }
  processActiveSkill(skillSlot, dt) {
    if (!skillSlot.skill) {
      return;
    }
    if (skillSlot.time <= 0) {
      skillSlot.time = 0;
      this.stopActiveSkill(skillSlot);
      this.startActiveSkill(skillSlot);
      return;
    }
    skillSlot.time -= dt;
  }
  stopActiveSkill(skillSlot) {
    skillSlot.unregisterLoopCallback?.();
    skillSlot.unregisterLoopCallback = null;
    if (skillSlot.skill) {
      this.removeSkillModifiers(skillSlot.skill);
    }
    skillSlot.time = 0;
    this.updateSkillSlotProgressBar(skillSlot);
  }
  selectSkillByName(skillName) {
    const skill = this.skillList.findStrict((x) => x.data.name === skillName);
    this.showSkill(skill);
    this.skillList.forEach((x) => x.element.classList.toggle("selected", x === skill));
  }
  showSkill(skill) {
    const element = this.page.querySelectorStrict("[data-skill-info]");
    element.replaceChildren();
    element.insertAdjacentHTML("beforeend", `<div class="g-title">${skill.data.name}</div>`);
    const propertyListElement = document.createElement("ul");
    propertyListElement.insertAdjacentHTML("beforeend", `<li class="g-field"><div>Duration</div><div>${skill.data.baseDuration.toFixed()}s</div></li>`);
    propertyListElement.insertAdjacentHTML("beforeend", `<li class="g-field"><div>Mana Cost</div><div>${skill.data.manaCost.toFixed()}</div></li>`);
    element.appendChild(propertyListElement);
    const modListElement = document.createElement("ul");
    modListElement.classList.add("g-mod-list");
    for (const mod of skill.data.modList) {
      modListElement.insertAdjacentHTML("beforeend", `<li>${Modifier.toDescription(mod)}</li>`);
    }
    element.appendChild(modListElement);
    const updateButton = () => {
      const conditions = [this.selectedSkillSlot?.skill && this.selectedSkillSlot.skill !== skill, this.selectedSkillSlot?.skill !== skill && this.skillSlotList.length > 0 && this.skillSlotList.some((x) => x.skill && compareNamesWithNumerals(x.skill?.name, skill.name))];
      const disabled = conditions.some((x) => x);
      button.textContent = this.selectedSkillSlot?.skill === skill ? "Remove" : "Assign";
      button.toggleAttribute("disabled", disabled && !(this.selectedSkillSlot?.skill === skill));
    };
    const button = document.createElement("button");
    button.addEventListener("click", () => {
      if (this.selectedSkillSlot?.skill === skill) {
        this.unassignSkill(this.selectedSkillSlot);
      } else if (this.selectedSkillSlot) {
        this.assignSkill(this.selectedSkillSlot, skill);
        this.startActiveSkill(this.selectedSkillSlot);
      }
      updateButton();
    });
    updateButton();
    element.appendChild(button);
  }
  assignSkill(skillSlot, skill) {
    if (skillSlot.skill) {
      this.clearSkillSlot(skillSlot);
    }
    skillSlot.skill = skill;
    skillSlot.duration = skill.data.baseDuration;
    skillSlot.element.querySelectorStrict("[data-skill-name]").textContent = skill.data.name;
    skillSlot.element.classList.add("m-has-skill");
    skill.element.setAttribute("data-tag", "valid");
  }
  unassignSkill(skillSlot) {
    assertDefined(skillSlot.skill);
    this.clearSkillSlot(skillSlot);
  }
  applySkillModifiers(skill) {
    const modList = Modifier.modsFromTexts(skill.data.modList);
    player.modDB.add(`Skill/${skill.data.name}`, Modifier.extractStatModifierList(...modList));
  }
  removeSkillModifiers(skill) {
    player.modDB.removeBySource(`Skill/${skill.data.name}`);
  }
  processSkillUnlock() {
    const skill = calcItemProbability(this.skillList);
    if (!skill) {
      return;
    }
    this.unlockSkill(skill);
    notifications.addNotification({
      title: `New Aura: ${skill.name}`,
      elementId: skill.data.id
    });
  }
  unlockSkill(skill) {
    skill.unlocked = true;
    skill.element.textContent = skill.data.name;
    skill.element.removeAttribute("disabled");
    skill.element.classList.remove("hidden");
  }
  serialize() {
    return {
      skillSlotList: this.skillSlotList.map((x) => x.skill ? { skillName: x.skill.data.name, timePct: x.time / x.duration } : void 0),
      skillNameList: this.skillList.filter((x) => x.unlocked).map((x) => x.data.name)
    };
  }
  deserialize(save) {
    for (const skillName of save?.skillNameList || []) {
      const skill = this.skillList.find((x) => x.data.name === skillName);
      if (skill) {
        this.unlockSkill(skill);
      }
    }
    for (const [i, skillSlotData] of save?.skillSlotList?.entries() || []) {
      if (!skillSlotData?.skillName) {
        continue;
      }
      const skillSlot = this.skillSlotList[i];
      const skill = this.skillList.find((x) => x.data.name === skillSlotData.skillName);
      if (skillSlot && skill) {
        this.assignSkill(skillSlot, skill);
        const timePct = skillSlotData.timePct || 0;
        if (timePct > 0) {
          skillSlot.time = skillSlot.duration * (skillSlotData.timePct || 0);
          this.triggerSkillInSlot(skillSlot);
        } else {
          this.startActiveSkill(skillSlot);
        }
      }
    }
    (this.skillSlotList.find((x) => x.skill)?.element ?? this.skillList.find((x) => !x.element.hasAttribute("data-highlight") && x.unlocked)?.element)?.click();
  }
};

// src/game/components/skills/Passives.ts
var Passives = class {
  page;
  passiveList;
  selectedPassive;
  insightCapacityEnhancerList;
  constructor(data) {
    this.page = document.createElement("div");
    this.page.classList.add("p-passive-skills");
    this.page.appendChild(this.createToolbar());
    this.page.insertAdjacentHTML("beforeend", '<ul class="s-skill-list" data-skill-list></ul>');
    this.page.insertAdjacentHTML("beforeend", '<div class="s-skill-info" data-skill-info></div>');
    this.insightCapacityEnhancerList = data.insightCapacityEnhancerList.map((x) => ({ ...x, data: x, curCount: x.pickProbability === 0 ? x.maxCount : 0 }));
    this.applyInsightCapacityEnhancersAsModifiers();
    this.passiveList = data.passiveSkillList.map((data2) => {
      const element = document.createElement("li");
      element.classList.add("g-list-item");
      element.setAttribute("data-id", data2.id);
      element.toggleAttribute("disabled");
      element.textContent = "?????";
      element.addEventListener("click", () => this.selectPassiveByName(data2.name));
      return { name: data2.name, data: data2, pickProbability: data2.pickProbability, unlocked: data2.pickProbability === 0, element, allocated: false };
    });
    this.passiveList.forEach((x) => x.element.classList.toggle("hidden", textContainsRankNumerals(x.name)));
    this.page.querySelectorStrict("[data-skill-list]").append(...this.passiveList.map((x) => x.element));
    this.passiveList.filter((x) => x.data.pickProbability === 0).forEach((x) => this.unlockPassive(x));
    this.passiveList.find((x) => x.unlocked)?.element.click();
    player.stats.insightCapacity.addListener("change", () => {
      if (this.insightRemaining < 0) {
        this.fixNegativeInsightRemaining();
      }
      this.updateInsightValueElement();
    });
    this.updateInsightValueElement();
    combat.enemyDeathEvent.listen((_, instance) => {
      this.processPassiveUnlock();
      if (this.passiveList.every((x) => x.unlocked)) {
        instance.removeListener();
      }
    });
    combat.enemyDeathEvent.listen((_, instance) => {
      this.processInsightCapacityEnhancer();
      if (this.insightCapacityEnhancerList.every((x) => x.curCount === x.data.maxCount)) {
        instance.removeListener();
      }
    });
  }
  get insightRemaining() {
    return player.stats.insightCapacity.value - this.insightAllocated;
  }
  get insightAllocated() {
    return this.passiveList.filter((x) => x.allocated).map((x) => x.data.insight).reduce((a, b) => a += b, 0);
  }
  updateInsightValueElement() {
    this.page.querySelectorStrict("[data-insight-counter] [data-value]").textContent = this.insightRemaining.toFixed();
  }
  createToolbar() {
    const element = document.createElement("div");
    element.classList.add("s-toolbar");
    const clearButton = document.createElement("button");
    clearButton.textContent = "Clear";
    clearButton.addEventListener("click", () => this.clearPassives());
    element.appendChild(clearButton);
    element.insertAdjacentHTML("beforeend", `<div class="s-insight-counter" data-insight-counter><span>Insight: <var data-value>0</var></span></div>`);
    return element;
  }
  selectPassiveByName(name) {
    const passive = this.passiveList.findStrict((x) => x.data.name === name);
    this.selectedPassive = passive;
    this.showPassive(passive);
    this.passiveList.forEach((x) => x.element.classList.toggle("selected", x.element === passive.element));
  }
  showPassive(passive) {
    const element = this.page.querySelectorStrict("[data-skill-info]");
    element.replaceChildren();
    element.insertAdjacentHTML("beforeend", `<div class="g-title">${passive.data.name}</div>`);
    const propertyListElement = document.createElement("ul");
    propertyListElement.insertAdjacentHTML("beforeend", `<li class="g-field"><div>Insight</div><div>${passive.data.insight.toFixed()}</div></li>`);
    element.appendChild(propertyListElement);
    const modListElement = document.createElement("ul");
    modListElement.classList.add("g-mod-list");
    for (const mod of passive.data.modList) {
      modListElement.insertAdjacentHTML("beforeend", `<li>${Modifier.toDescription(mod)}</li>`);
    }
    element.appendChild(modListElement);
    const button = document.createElement("button");
    const updateButton = () => {
      const allocatedPassiveList = this.passiveList.filter((x) => x.allocated);
      const conditions = [!passive.allocated && allocatedPassiveList.length > 0 && allocatedPassiveList.some((x) => compareNamesWithNumerals(x.name, passive.name)), this.insightRemaining < passive.data.insight];
      const disabled = conditions.some((x) => x);
      button.textContent = passive.allocated ? "Unallocate" : "Allocate";
      button.toggleAttribute("disabled", disabled && !passive.allocated);
    };
    button.addEventListener("click", () => {
      if (passive.allocated) {
        this.unallocatePassive(passive);
      } else {
        this.allocatePassive(passive);
      }
      updateButton();
    });
    updateButton();
    element.appendChild(button);
  }
  applyInsightCapacityEnhancersAsModifiers() {
    player.modDB.replace("Passive/InsightCapacityEnhancer", this.insightCapacityEnhancerList.map((x) => ({ name: "Insight", value: x.curCount * x.data.insight, valueType: "Base" })));
  }
  allocatePassive(passive) {
    passive.allocated = true;
    passive.element.classList.add("m-allocated");
    this.updateInsightValueElement();
    player.modDB.add(`Passive/${passive.data.name}`, Modifier.modsFromTexts(passive.data.modList).map((x) => x.extractStatModifiers()).flatMap((x) => x));
    passive.element.setAttribute("data-tag", "valid");
  }
  unallocatePassive(passive) {
    passive.allocated = false;
    passive.element.classList.remove("m-allocated");
    this.updateInsightValueElement();
    player.modDB.removeBySource(`Passive/${passive.data.name}`);
    passive.element.removeAttribute("data-tag");
  }
  fixNegativeInsightRemaining() {
    if (this.insightRemaining >= 0) {
      return;
    }
    const passive = this.passiveList.findLast((x) => x.allocated);
    assertDefined(passive, "cannot have negative insight without any allocated passives");
    this.unallocatePassive(passive);
    this.fixNegativeInsightRemaining();
  }
  processPassiveUnlock() {
    const skill = calcItemProbability(this.passiveList);
    if (!skill) {
      return;
    }
    this.unlockPassive(skill);
    notifications.addNotification({
      title: `New Passive: ${skill.name}`,
      elementId: skill.data.id
    });
  }
  processInsightCapacityEnhancer() {
    const insightCapacityEnhancer = calcItemProbability(this.insightCapacityEnhancerList.filter((x) => x.curCount < x.data.maxCount));
    if (!insightCapacityEnhancer) {
      return;
    }
    insightCapacityEnhancer.curCount++;
    this.applyInsightCapacityEnhancersAsModifiers();
    this.updateInsightValueElement();
    const skillsPage = this.page.closest('[data-page-content="skills"]');
    assertNonNullable(skillsPage);
    notifications.addNotification({
      title: `${insightCapacityEnhancer.name}`,
      description: "Your insight has been increased"
    });
  }
  unlockPassive(passive) {
    passive.unlocked = true;
    passive.element.textContent = passive.data.name;
    passive.element.removeAttribute("disabled");
    passive.element.classList.remove("hidden");
  }
  clearPassives() {
    this.passiveList.filter((x) => x.allocated).forEach((x) => this.unallocatePassive(x));
    if (this.selectedPassive) {
      this.showPassive(this.selectedPassive);
    }
  }
  serialize() {
    return {
      insightCapacityEnhancerList: this.insightCapacityEnhancerList.filter((x) => x.curCount > 0).map((x) => ({ name: x.data.name, count: x.curCount })),
      passiveList: this.passiveList.filter((x) => x.unlocked).map((x) => ({ name: x.data.name, allocated: x.allocated }))
    };
  }
  deserialize(save) {
    for (const data of save?.insightCapacityEnhancerList?.filter(isDefined) || []) {
      const insightCapacityEnhancer = this.insightCapacityEnhancerList.find((x) => x.data.name === data.name);
      if (!insightCapacityEnhancer || !data.count) {
        continue;
      }
      insightCapacityEnhancer.curCount = Math.min(data.count, insightCapacityEnhancer.data.maxCount);
    }
    this.applyInsightCapacityEnhancersAsModifiers();
    for (const data of save?.passiveList?.filter(isDefined) || []) {
      const passive = this.passiveList.find((x) => x.data.name === data?.name);
      if (!passive) {
        continue;
      }
      this.unlockPassive(passive);
      if (data.allocated) {
        this.allocatePassive(passive);
      }
    }
    this.passiveList.find((x) => !x.element.hasAttribute("data-highlight") && x.unlocked)?.element.click();
  }
};

// src/shared/customElements/TabMenuElement.ts
var TabMenuElement = class _TabMenuElement extends CustomElement {
  static name = "tab-menu-element";
  pageList = [];
  init() {
    this.setDirection("vertical");
  }
  setDirection(dir) {
    this.setAttribute("data-direction", dir);
  }
  appendMenuItem(menuItem, id) {
    menuItem.classList.add("g-list-item");
    this.appendChild(menuItem);
    menuItem.addEventListener("click", () => {
      this.querySelectorAll("[data-page-target]").forEach((x) => {
        x.classList.toggle("selected", x === menuItem);
        x.toggleAttribute("disabled", x === menuItem);
      });
      this.pageList.forEach((x) => x.classList.toggle("hidden", x.getAttribute("data-page-content") !== id));
    });
  }
  addMenuItem(label, id, index) {
    const element = document.createElement("li");
    element.textContent = label;
    element.setAttribute("data-page-target", id);
    index = index ?? this.children.length;
    element.setAttribute("data-index", index.toFixed());
    this.appendMenuItem(element, id);
    return element;
  }
  registerPageElement(pageElement, id) {
    pageElement.classList.add("hidden");
    pageElement.setAttribute("data-page-content", id);
    this.pageList.push(pageElement);
    if (!this.querySelector(".selected")) {
      this.querySelector(`[data-page-target="${id}"]`)?.click();
    }
  }
  sort(compare) {
    this.append(...[...this.querySelectorAll("li")].sort(compare));
  }
  *generateTabMenuAncestorList(from, targetPageName = "") {
    if (!from) {
      return;
    }
    let page = from?.hasAttribute("data-page-content") ? from : null;
    if (!page) {
      page = from?.closest("[data-page-content]");
      return yield* this.generateTabMenuAncestorList(page);
    }
    const menu = page?.querySelector(`:scope > ${_TabMenuElement.name}`);
    if (!menu) {
      const pageName = page.getAttribute("data-page-content");
      page = page.parentElement?.closest("[data-page-content]") ?? null;
      return yield* this.generateTabMenuAncestorList(page, pageName ?? "");
    }
    if (!targetPageName) {
      return;
    }
    const menuItem = menu.querySelector(`[data-page-target="${targetPageName}"]`);
    if (menuItem) {
      yield menuItem;
    }
    targetPageName = page?.getAttribute("data-page-content") ?? "";
    page = page.parentElement?.closest("[data-page-content]") ?? null;
    yield* this.generateTabMenuAncestorList(page, targetPageName);
  }
  *generateMenuItemListFromPageNameList(from, pageNameList) {
    for (const pageTargetName of pageNameList) {
      if (!from) {
        return;
      }
      const menu = from.querySelector(`:scope > ${_TabMenuElement.name}`);
      if (!menu) {
        return;
      }
      const menuItem = menu.querySelector(`[data-page-target="${pageTargetName}"]`);
      if (!menuItem) {
        return;
      }
      yield menuItem;
      from = from.querySelector(`[data-page-content="${pageTargetName}"]`);
    }
  }
};

// src/game/components/skills/Skills.ts
var Skills = class extends Component {
  constructor(data) {
    super("skills");
    this.data = data;
    const menu = createCustomElement(TabMenuElement);
    menu.setDirection("horizontal");
    this.page.appendChild(menu);
    if (data.attackSkills) {
      this.attackSkills = new AttackSkills(data.attackSkills);
      menu.addMenuItem("Attack", "attack");
      menu.registerPageElement(this.attackSkills.page, "attack");
      this.page.append(this.attackSkills.page);
    }
    if (data.auraSkills) {
      this.auraSkills = new AuraSkills(data.auraSkills);
      menu.addMenuItem("Aura", "aura");
      menu.registerPageElement(this.auraSkills.page, "aura");
      this.page.append(this.auraSkills.page);
    }
    if (data.passiveSkills) {
      this.passiveSkills = new Passives(data.passiveSkills);
      menu.addMenuItem("Passives", "passives");
      menu.registerPageElement(this.passiveSkills.page, "passives");
      this.page.appendChild(this.passiveSkills.page);
    }
  }
  attackSkills;
  auraSkills;
  passiveSkills;
  serialize(save) {
    save.skills = {
      attackSkills: this.attackSkills?.serialize(),
      auraSkills: this.auraSkills?.serialize(),
      passiveSkills: this.passiveSkills?.serialize()
    };
  }
  deserialize({ skills: save }) {
    if (save?.attackSkills) {
      this.attackSkills?.deserialize(save.attackSkills);
    }
    if (save?.auraSkills) {
      this.auraSkills?.deserialize(save.auraSkills);
    }
    if (save?.passiveSkills) {
      this.passiveSkills?.deserialize(save.passiveSkills);
    }
  }
};

// src/game/components/artifacts/Artifacts.ts
var Artifacts = class extends Component {
  selectedArtifact = null;
  artifactList;
  constructor(data) {
    super("artifacts");
    this.page.insertAdjacentHTML("beforeend", '<div class="s-artifact-counter" data-artifacts-counter><span>Artifacts: <var data-cur>0</var>/<var data-max></var></span></div>');
    this.page.insertAdjacentHTML("beforeend", '<div class="g-title">Artifact List</div>');
    this.page.insertAdjacentHTML("beforeend", '<ul class="s-artifact-list" data-artifact-list></ul>');
    this.page.insertAdjacentHTML("beforeend", '<div class="s-artifact-info" data-artifact-info></div>');
    this.artifactList = data.artifactList.map((data2) => {
      const element = document.createElement("li");
      element.classList.add("g-list-item");
      element.setAttribute("data-id", data2.id);
      element.toggleAttribute("disabled");
      element.textContent = "?????";
      element.addEventListener("click", () => this.selectArtifactByName(data2.name));
      return { name: data2.name, data: data2, pickProbability: data2.pickProbability, unlocked: data2.pickProbability === 0, assigned: false, element };
    });
    this.artifactList.forEach((x) => x.element.classList.toggle("hidden", textContainsRankNumerals(x.name)));
    this.page.querySelectorStrict("[data-artifact-list]").append(...this.artifactList.map((x) => x.element));
    this.artifactList.filter((x) => x.data.pickProbability === 0).forEach((x) => this.unlockArtifact(x));
    this.artifactList.find((x) => x.unlocked)?.element.click();
    this.updateArtifactsCounter();
    combat.enemyDeathEvent.listen((_, instance) => {
      this.processArtifactUnlock();
      if (this.artifactList.every((x) => x.unlocked)) {
        instance.removeListener();
      }
    });
    player.stats.maxArtifacts.addListener("change", this.updateArtifactsCounter.bind(this));
  }
  get artifactCount() {
    return this.artifactList.filter((x) => x.assigned).length;
  }
  updateArtifactsCounter() {
    const element = this.page.querySelectorStrict("[data-artifacts-counter]");
    element.querySelectorStrict("[data-cur]").textContent = this.artifactCount.toFixed();
    element.querySelectorStrict("[data-max]").textContent = player.stats.maxArtifacts.value.toFixed();
  }
  selectArtifactByName(artifactName) {
    const artifact = this.artifactList.findStrict((x) => x.data.name === artifactName);
    this.selectedArtifact = artifact;
    this.showArtifact(artifact);
    this.artifactList.forEach((x) => x.element.classList.toggle("selected", x === artifact));
  }
  assignArtifact(artifact) {
    artifact.assigned = true;
    player.modDB.add(`Artifact/${artifact.data.name}`, Modifier.modsFromTexts(artifact.data.modList).flatMap((x) => x.extractStatModifiers()));
    this.updateArtifactsCounter();
    artifact.element.setAttribute("data-tag", "valid");
  }
  unassignArtifact(artifact) {
    artifact.assigned = false;
    player.modDB.removeBySource(`Artifact/${artifact.data.name}`);
    this.updateArtifactsCounter();
    artifact.element.removeAttribute("data-tag");
  }
  unlockArtifact(artifact) {
    artifact.unlocked = true;
    artifact.element.textContent = artifact.data.name;
    artifact.element.removeAttribute("disabled");
    artifact.element.classList.remove("hidden");
  }
  showArtifact(artifact) {
    const element = this.page.querySelectorStrict("[data-artifact-info]");
    element.replaceChildren();
    element.insertAdjacentHTML("beforeend", `<div class="g-title">${artifact.data.name}</div>`);
    const modListElement = document.createElement("ul");
    modListElement.classList.add("g-mod-list");
    for (const mod of artifact.data.modList) {
      modListElement.insertAdjacentHTML("beforeend", `<li>${Modifier.toDescription(mod)}</li>`);
    }
    element.appendChild(modListElement);
    const button = document.createElement("button");
    const updateButton = () => {
      const assignedArtifacts = this.artifactList.filter((x) => x.assigned);
      const conditions = [assignedArtifacts.length > 0 && assignedArtifacts.some((x) => compareNamesWithNumerals(x.name, artifact.name)), this.artifactCount >= player.stats.maxArtifacts.value];
      const disabled = conditions.some((x) => x);
      button.textContent = artifact.assigned ? "Unassign" : "Assign";
      button.toggleAttribute("disabled", disabled && !artifact.assigned);
    };
    button.addEventListener("click", () => {
      if (artifact.assigned) {
        this.unassignArtifact(artifact);
      } else {
        this.assignArtifact(artifact);
      }
      updateButton();
    });
    updateButton();
    element.appendChild(button);
  }
  processArtifactUnlock() {
    const artifact = calcItemProbability(this.artifactList);
    if (!artifact) {
      return;
    }
    this.unlockArtifact(artifact);
    notifications.addNotification({
      title: `New Artifact: ${artifact.name}`,
      elementId: artifact.data.id
    });
  }
  serialize(save) {
    save.artifacts = {
      artifactNameList: this.artifactList.filter((x) => x.unlocked).map((x) => ({ name: x.data.name, assigned: x.assigned }))
    };
  }
  deserialize({ artifacts: save }) {
    for (const data of save?.artifactNameList?.filter(isDefined) || []) {
      const artifact = this.artifactList.find((x) => x.data.name === data.name);
      if (!artifact) {
        continue;
      }
      this.unlockArtifact(artifact);
      if (data.assigned) {
        this.assignArtifact(artifact);
        if (!this.selectedArtifact) {
          this.selectArtifactByName(artifact.data.name);
        }
      }
    }
    this.artifactList.find((x) => !x.element.hasAttribute("data-highlight") && x.unlocked)?.element.click();
  }
};

// src/game/crafting/CraftManager.ts
var CraftManager = class {
  groups;
  reforgeWeights;
  maxModifierCount;
  constructor(args) {
    this.groups = args.groups;
    this.reforgeWeights = args.reforgeWeights;
    this.maxModifierCount = args.maxModifierCount;
  }
  reforge(itemModList, candidateModList, tag) {
    const modList = [];
    if (tag) {
      const msg = this.addOne(itemModList, candidateModList, tag);
      if (msg) {
        return msg;
      }
    }
    const reforgeModCountOffset = modList.length;
    const modCount = this.generateReforgeModCount(this.reforgeWeights, reforgeModCountOffset);
    modList.push(...this.generateModList(itemModList, candidateModList, modCount));
    if (modList.length === 0) {
      return "No modifiers available";
    }
    return { type: "ModList", modList };
  }
  addOne(itemModList, candidateModList, tag) {
    if (itemModList.length >= this.maxModifierCount) {
      return "Item has maximum number of modifiers";
    }
    if (tag) {
      candidateModList = candidateModList.filter((x) => x.template.tags?.includes(tag));
      if (candidateModList.length === 0) {
        return `No modifier with tag: ${tag} available`;
      }
    }
    const mod = this.generateModList(itemModList, candidateModList, 1)[0];
    if (!mod) {
      return "No modifier available";
    }
    return { type: "ModList", modList: [...itemModList, mod] };
  }
  removeOne(itemModList, tag) {
    let modList = [...itemModList];
    if (tag) {
      modList = modList.filter((x) => x.tags?.includes(tag));
    }
    const index = randomRangeInt(0, modList.length);
    const target = modList[index];
    if (!target) {
      return tag ? `Item has no ${tag.toLowerCase()} modifiers` : "Item has no modifiers to remove";
    }
    if (!modList.remove(target)) {
      return "Failed to remove modifier. This was unexpected";
    }
    return { type: "ModList", modList: itemModList.filter((x) => x !== target) };
  }
  improveTierOfRandomMod(itemModList) {
    const modCandidate = itemModList[randomRangeInt(0, itemModList.length)];
    if (!modCandidate) {
      return "Item has no modifiers";
    }
    const groupIndex = this.groups.findIndex((x) => x.indexOf(modCandidate.text) !== -1);
    const group = this.groups[groupIndex] || [];
    const modIndex = group?.indexOf(modCandidate.text) + 1;
    if (group[modIndex]) {
      return "No modifier can be improved";
    }
    const modText = group[modIndex];
    assertDefined(modText);
    const mod = Modifier.modFromText(modText);
    mod.randomizeValues();
    return { type: "ModList", modList: [...itemModList.filter((x) => x !== modCandidate), mod] };
  }
  modifyNumericalValues(itemModList, type) {
    if (itemModList.length === 0) {
      return "No modifiers available";
    }
    const modList = itemModList.map((x) => x.copy());
    for (const mod of modList) {
      switch (type) {
        case "random":
          mod.setValues(mod.rangeValues.map((x) => randomRange(x.min, x.max)));
          break;
        case "max":
          mod.setValues(mod.rangeValues.map((x) => x.max));
          break;
      }
    }
    return { type: "ModList", modList };
  }
  generateModList(itemModList, candidateModList, count) {
    const newModList = [];
    for (let i = 0; i < count; i++) {
      candidateModList = candidateModList.filter((x) => !itemModList.concat(newModList).some((y) => x.template.desc === y.template.desc));
      if (candidateModList.length === 0) {
        console.warn(`failed to generate the expected amount of modifiers of (${count})`);
        return [];
      }
      const candidate = getRandomWeightedItem(candidateModList);
      if (!candidate) {
        continue;
      }
      const mod = Modifier.modFromText(candidate.text);
      mod.randomizeValues();
      newModList.push(mod);
    }
    return newModList;
  }
  generateReforgeModCount(weights, offset = 0) {
    return getRandomWeightedIndex(weights.slice(offset)) + 1;
  }
};

// src/game/crafting/craftTemplates.ts
var weaponCraftTemplates = [
  {
    desc: "Reforge item with new random modifiers",
    craft: (data) => data.crafter.reforge(data.itemModList, data.candidateModList),
    id: "ab8ed8"
  },
  {
    desc: "Reforge item with new random modifiers, including a physical modifier",
    craft: (data) => data.crafter.reforge(data.itemModList, data.candidateModList, "Physical"),
    id: "53dbb7"
  },
  {
    desc: "Add a random modifier",
    craft: (data) => data.crafter.addOne(data.itemModList, data.candidateModList),
    id: "167a65"
  },
  {
    desc: "Add a physical modifier",
    craft: (data) => data.crafter.addOne(data.itemModList, data.candidateModList, "Physical"),
    id: "7d9d53"
  },
  {
    desc: "Remove a random modifier",
    craft: (data) => data.crafter.removeOne(data.itemModList),
    id: "8a071c"
  },
  {
    desc: "Remove an attack modifier",
    craft: (data) => data.crafter.removeOne(data.itemModList, "Attack"),
    id: "f6b79e"
  },
  {
    desc: "Remove a mana modifier",
    craft: (data) => data.crafter.removeOne(data.itemModList, "Mana"),
    id: "72038a"
  },
  {
    desc: "Remove an ailment modifier",
    craft: (data) => data.crafter.removeOne(data.itemModList, "Ailment"),
    id: "1d3692"
  },
  {
    desc: "Remove a critical hit modifier",
    craft: (data) => data.crafter.removeOne(data.itemModList, "Critical"),
    id: "369ea2"
  },
  {
    desc: "Remove an attribute modifier",
    craft: (data) => data.crafter.removeOne(data.itemModList, "Attribute"),
    id: "d92037"
  },
  {
    desc: "Randomize numerical values",
    craft: (data) => data.crafter.modifyNumericalValues(data.itemModList, "random"),
    id: "f5e3cf"
  }
];
assertUniqueStringList(weaponCraftTemplates.map((x) => x.id), "weaponCrafTemplates contains non-unique ids");

// src/shared/customElements/CraftTableElement.ts
var CraftTableElement = class extends CustomElement {
  static name = "craft-table-element";
  confirmCraftCallback;
  cancelCraftCallback;
  craftCallback;
  selectCraftCallback;
  compareCallback;
  _craftMode = false;
  init() {
    this.insertAdjacentHTML("beforeend", '<div class="g-title">Craft Table</div>');
    const toolbar = document.createElement("ul");
    toolbar.classList.add("s-toolbar");
    toolbar.insertAdjacentHTML("beforeend", "<li><button data-compare-button>Compare</button></li>");
    toolbar.insertAdjacentHTML("beforeend", '<li><button data-confirm-button data-role="confirm">Confirm</button></li>');
    toolbar.insertAdjacentHTML("beforeend", '<li><button data-cancel-button data-role="cancel">Cancel</button></li>');
    this.appendChild(toolbar);
    const craftContainer = document.createElement("div");
    craftContainer.classList.add("s-craft-container");
    craftContainer.setAttribute("data-craft-container", "");
    craftContainer.insertAdjacentHTML("beforeend", '<button class="craft-button" data-craft-button disabled>Craft</button>');
    craftContainer.insertAdjacentHTML("beforeend", '<div class="craft-msg" data-msg>\u200B</div>');
    craftContainer.insertAdjacentHTML("beforeend", '<ul class="s-craft-list" data-craft-list></ul>');
    this.appendChild(craftContainer);
    toolbar.querySelectorStrict("[data-compare-button]").addEventListener("click", () => {
      this.compare();
    });
    toolbar.querySelectorStrict("[data-confirm-button]").addEventListener("click", () => {
      this.confirmCraftCallback?.();
      this.setCraftModeState(false);
    });
    toolbar.querySelectorStrict("[data-cancel-button]").addEventListener("click", () => {
      this.cancelCraftCallback?.();
      this.setCraftModeState(false);
    });
    craftContainer.querySelectorStrict("[data-craft-button]").addEventListener("click", () => {
      const element = this.querySelector("[data-craft-list] [data-id].selected");
      const id = element?.getAttribute("data-id");
      if (element && id) {
        this.craftCallback?.(id);
      }
    });
    this.setCraftModeState(false);
  }
  enableCraftMode() {
    if (this._craftMode) {
      return;
    }
    this.setCraftModeState(true);
  }
  setCraftModeState(on) {
    this._craftMode = on;
    this.querySelectorStrict("[data-compare-button]").toggleAttribute("disabled", !on);
    this.querySelectorStrict("[data-confirm-button]").toggleAttribute("disabled", !on);
    this.querySelectorStrict("[data-cancel-button]").toggleAttribute("disabled", !on);
  }
  setCraftMessage(msg) {
    this.querySelectorStrict("[data-msg]").textContent = msg || "\u200B";
  }
  setCraftButtonState(state) {
    this.querySelectorStrict("[data-craft-button]").toggleAttribute("disabled", state === "enabled" ? false : true);
  }
  registerCraft(desc, id) {
    const listElement = this.querySelectorStrict(`[data-craft-list]`);
    const li = document.createElement("li");
    li.classList.add("g-list-item", "g-field");
    li.setAttribute("data-id", id);
    desc = desc.replace(/\b\w+\b/g, (a) => {
      if (ModifierTags.some((x) => x.toLowerCase() == a.toLowerCase())) {
        return `<span data-tag="${a}">${a}</span>`;
      }
      return a;
    });
    li.insertAdjacentHTML("beforeend", `<div>${desc}</div><var data-count>0</var>`);
    li.addEventListener("click", () => this.selectCraft(id));
    listElement.appendChild(li);
  }
  updateCraftCount(id, count) {
    const element = this.querySelector(`[data-craft-list] [data-id="${id}"] [data-count]`);
    if (element) {
      element.textContent = Number.isFinite(count) ? count.toFixed() : "\u221E";
    }
  }
  addLog(message) {
    this.querySelectorStrict("[data-log-list]").insertAdjacentHTML("beforeend", `<li>${message}</li>`);
  }
  sortCraftList(comparer) {
    this.append(...[...this.querySelectorAll("[data-craft-list] [data-id]")].sort(comparer));
  }
  selectCraft(id) {
    this.querySelectorAll("[data-craft-list] [data-id]").forEach((x) => x.classList.toggle("selected", x.getAttribute("data-id") === id));
    this.selectCraftCallback?.(id);
  }
  compare() {
    if (!this.compareCallback) {
      return;
    }
    const [a, b] = this.compareCallback();
    const prompt = createCustomElement(PromptWindowElement);
    prompt.setTitle("Item Compare");
    const element = document.createElement("div");
    element.classList.add("s-compare");
    element.append(a.cloneNode(true), b.cloneNode(true));
    prompt.setBodyElement(element);
    this.append(prompt);
  }
};
document.createElement("craftTableElement");

// src/game/mods/ModifierInfoPopup.ts
var ModifierInfoPopup = class {
  constructor(mod, additionalProperties = []) {
    this.mod = mod;
    this.additionalProperties = additionalProperties;
    const modal = createCustomElement(PromptWindowElement);
    modal.minWidth = "10em";
    modal.setTitle("Modifier Info");
    const body = document.createElement("div");
    body.style.textAlign = "left";
    this.addTags(body, mod.tags ?? []);
    this.addAdditionalProperties(body, additionalProperties);
    this.addDesc(body, mod.rawDesc);
    modal.setBodyElement(body);
  }
  addTags(body, tags) {
    body.insertAdjacentHTML("beforeend", `<div>Tags: ${tags.reduce((a, c) => a += `[${getFormattedTag(c)}] `, "")}</div>`);
  }
  addAdditionalProperties(body, properties) {
    for (const [name, value] of properties) {
      body.insertAdjacentHTML("beforeend", `<div>${name}: ${value}</div>`);
    }
  }
  addDesc(body, desc) {
    body.insertAdjacentHTML("beforeend", `<div class="g-mod-desc" style="text-align: center; padding-top: 0.3em;">${desc}</div>`);
  }
};

// src/game/components/weapon/Weapon.ts
var Weapon = class extends Component {
  constructor(data) {
    super("weapon");
    this.data = data;
    this.page.insertAdjacentHTML("beforeend", '<div class="g-title">Weapon</div>');
    this.page.insertAdjacentHTML("beforeend", '<div class="s-weapon-info" data-weapon-info></div>');
    this.craftTableElement = createCustomElement(CraftTableElement);
    this.craftTableElement.craftCallback = this.performCraft.bind(this);
    this.craftTableElement.selectCraftCallback = this.selectCraft.bind(this);
    this.craftTableElement.confirmCraftCallback = this.applyCraft.bind(this);
    this.craftTableElement.cancelCraftCallback = this.cancelCraft.bind(this);
    this.craftTableElement.compareCallback = this.compareWeaponInstances.bind(this);
    this.page.appendChild(this.craftTableElement);
    this.activeWeaponInstance = { modList: [], weaponType: data.weaponTypeList?.[0] };
    this.craftList = this.data.crafting.craftList.map((x) => ({ template: weaponCraftTemplates.findStrict((template) => template.desc === x.desc), craftCount: 0 }));
    for (const craft of this.craftList) {
      this.craftTableElement.registerCraft(craft.template.desc, craft.template.id);
      this.craftTableElement.updateCraftCount(craft.template.id, craft.craftCount);
    }
    for (const modList of data.modLists) {
      const group = [];
      this.modGroupList.push(group);
      for (const modData of modList) {
        player.stats.level.registerTargetValueCallback(modData.level, () => {
          const template = modTemplates.findStrict((x) => x.desc === Modifier.getTemplate(modData.mod)?.desc);
          this.candidateModList.push({ text: modData.mod, template, weight: modData.weight, weaponTypeNameList: modData.weaponTypes });
          group.push({ text: modData.mod, weaponTypeNameList: modData.weaponTypes ?? [] });
        });
      }
    }
    this.crafter = new CraftManager({
      groups: this.modGroupList.map((x) => x.map((x2) => x2.text)),
      reforgeWeights: [0, 10, 30, 100, 30],
      maxModifierCount: 6
    });
    this.updateWeapon();
    combat.enemyDeathEvent.listen(() => {
      this.calcCraftReward();
    });
    this.craftTableElement.selectCraft(this.craftList[0]?.template.id ?? null);
    data.crafting.craftList.filter((x) => x.startCount).map((x) => ({ id: weaponCraftTemplates.findStrict((template) => template.desc === x.desc).id, count: x.startCount })).forEach(({ id, count }) => this.addCraftCount(id, count));
  }
  activeWeaponInstance;
  tempWeaponInstance = null;
  modGroupList = [];
  candidateModList = [];
  craftList = [];
  crafter;
  craftTableElement;
  get weaponInstance() {
    return this.tempWeaponInstance ?? this.activeWeaponInstance;
  }
  createCraftData() {
    const weaponInstance = this.weaponInstance;
    const filterByWeaponType = function* (candidateModList2) {
      for (const candidate of candidateModList2) {
        if (weaponInstance.weaponType && candidate.weaponTypeNameList && candidate.weaponTypeNameList.includes(weaponInstance.weaponType.name)) {
          yield candidate;
        } else if (!candidate.weaponTypeNameList) {
          yield candidate;
        }
      }
    };
    const candidateModList = [...filterByWeaponType(this.candidateModList)];
    return {
      crafter: this.crafter,
      itemModList: weaponInstance.modList,
      candidateModList
    };
  }
  addCraftCount(id, count = 1) {
    const craft = this.craftList.findStrict((x) => x.template.id === id);
    craft.craftCount += count;
    this.craftTableElement.updateCraftCount(id, craft.craftCount);
    this.selectCraft(null);
  }
  updateWeapon() {
    const element = this.createWeaponInfoElement(this.weaponInstance);
    this.page.querySelectorStrict("[data-weapon-info]").replaceChildren(...element.children);
  }
  setWeaponType(weaponType) {
    this.weaponInstance.weaponType = weaponType;
    this.weaponInstance.modList = [];
    this.updateWeapon();
  }
  async triggerChangeWeaponTypePopup() {
    const ul = document.createElement("ul");
    ul.style.textAlign = "center";
    for (const { name } of this.data.weaponTypeList ?? []) {
      const element = document.createElement("li");
      element.classList.add("g-list-item");
      element.setAttribute("data-name", name);
      element.textContent = name;
      element.addEventListener("click", () => {
        prompt.querySelector('[data-role="confirm"]')?.toggleAttribute("disabled", this.weaponInstance.weaponType?.name === name);
        ul.querySelectorAll("[data-name]").forEach((x) => x.classList.toggle("selected", x === element));
      });
      ul.appendChild(element);
    }
    ul.insertAdjacentHTML("beforeend", '<div class="g-text-mute g-text-small" style="text-align: center;">This will reset your weapon!</div>');
    const prompt = createCustomElement(PromptWindowElement);
    prompt.style.minWidth = "25em";
    prompt.setTitle("Pick a weapon type");
    prompt.setBodyElement(ul);
    const waitPromise = prompt.setButtons([{ text: "Confirm", type: "confirm", waitId: "confirm" }, { text: "Cancel", type: "cancel" }]);
    ul.querySelector(`[data-name="${this.weaponInstance.weaponType?.name}"]`)?.click();
    const waitId = await waitPromise;
    if (waitId === "confirm") {
      const weaponTypeName = ul.querySelectorStrict("[data-name].selected").getAttribute("data-name");
      assertNonNullable(weaponTypeName);
      assertNonNullable(this.data.weaponTypeList);
      const weaponType = this.data.weaponTypeList.findStrict((x) => x.name === weaponTypeName);
      this.setWeaponType(weaponType);
    }
  }
  createWeaponInfoElement(weaponInstance) {
    const element = document.createElement("div");
    element.classList.add("s-weapon-info");
    if (weaponInstance.weaponType) {
      const weaponTypeElement = document.createElement("div");
      weaponTypeElement.classList.add("s-weapon-type");
      weaponTypeElement.setAttribute("data-weapon-type", "");
      weaponTypeElement.insertAdjacentHTML("beforeend", `<span title="Weapon type">${weaponInstance.weaponType?.name}</span>`);
      const changeElement = document.createElement("span");
      changeElement.setAttribute("data-change-weapon-type", "");
      changeElement.classList.add("g-text-small", "g-text-mute", "change");
      changeElement.textContent = "(change)";
      changeElement.addEventListener("click", () => void this.triggerChangeWeaponTypePopup());
      weaponTypeElement.appendChild(changeElement);
      element.appendChild(weaponTypeElement);
    }
    const modListElement = document.createElement("ul");
    modListElement.classList.add("g-mod-list");
    sortModifiers(weaponInstance.modList);
    for (const mod of weaponInstance.modList) {
      const element2 = document.createElement("li");
      element2.setAttribute("data-info", "");
      element2.textContent = mod.desc;
      element2.addEventListener("click", () => {
        const group = this.findModGroup(mod)?.filter((x) => x.weaponTypeNameList.length === 0 || x.weaponTypeNameList.some((x2) => x2 === weaponInstance.weaponType?.name)) ?? [];
        const tier = calcTier(mod.text, group.map((x) => x.text));
        const additionalProperties = [["Tier", tier.toFixed()]];
        new ModifierInfoPopup(mod, additionalProperties);
      });
      modListElement.appendChild(element2);
    }
    element.appendChild(modListElement);
    return element;
  }
  createTempWeaponInstance() {
    return { weaponType: this.activeWeaponInstance.weaponType, modList: this.activeWeaponInstance.modList.map((x) => x.copy()) };
  }
  selectCraft(id) {
    id = id ?? this.craftTableElement.querySelector("[data-craft-list] [data-id].selected")?.getAttribute("data-id") ?? null;
    if (isNull(id)) {
      return;
    }
    const craft = this.craftList.findStrict((x) => x.template.id === id);
    if (!craft) {
      this.craftTableElement.setCraftMessage("No Craft Selected");
      this.craftTableElement.setCraftButtonState("disabled");
      return;
    }
    if (craft.craftCount <= 0) {
      this.craftTableElement.setCraftMessage("Insufficient Crafts");
      this.craftTableElement.setCraftButtonState("disabled");
      return;
    }
    const result = craft.template.craft(this.createCraftData());
    if (isString(result)) {
      this.craftTableElement.setCraftMessage(result);
      this.craftTableElement.setCraftButtonState("disabled");
      return;
    }
    this.craftTableElement.setCraftMessage();
    this.craftTableElement.setCraftButtonState("enabled");
  }
  performCraft(id) {
    this.tempWeaponInstance = this.tempWeaponInstance ?? this.createTempWeaponInstance();
    const craft = this.craftList.findStrict((x) => x.template.id === id);
    const template = craft.template;
    const result = template.craft(this.createCraftData());
    if (typeof result === "string") {
      throw new Error("Unexpected error.");
    }
    switch (result.type) {
      case "ModList":
        this.tempWeaponInstance.modList.splice(0, this.tempWeaponInstance.modList.length, ...result.modList);
        break;
    }
    craft.craftCount--;
    this.craftTableElement.updateCraftCount(id, craft.craftCount);
    this.selectCraft(id);
    this.craftTableElement.setCraftModeState(true);
    this.updateWeapon();
  }
  applyCraft() {
    assertNonNullable(this.tempWeaponInstance);
    this.activeWeaponInstance = this.tempWeaponInstance;
    this.tempWeaponInstance = null;
    this.applyMods();
    this.selectCraft(null);
  }
  cancelCraft() {
    this.tempWeaponInstance = null;
    this.updateWeapon();
    this.selectCraft(null);
  }
  applyMods() {
    player.modDB.replace("Weapon", Modifier.extractStatModifierList(...this.activeWeaponInstance.modList));
  }
  calcCraftReward() {
    const candidates = this.data.crafting.craftList;
    const crafts = pickManyFromPickProbability(candidates);
    for (const craft of crafts) {
      const craftDesc = craft.desc;
      const template = weaponCraftTemplates.findStrict((x) => x.desc === craftDesc);
      this.addCraftCount(template.id);
    }
  }
  compareWeaponInstances() {
    assertDefined(this.tempWeaponInstance);
    const a = this.createWeaponInfoElement(this.activeWeaponInstance);
    const b = this.createWeaponInfoElement(this.tempWeaponInstance);
    [a, b].forEach((x) => {
      x.querySelector("[data-weapon-type]")?.remove();
      x.querySelectorAll("li[data-info]").forEach((x2) => x2.removeAttribute("data-info"));
    });
    return [a, b];
  }
  findModGroup(mod) {
    return this.modGroupList.find((group) => group.some((x) => x.text === mod.text));
  }
  serialize(save) {
    const calcGroupIndex = (text) => this.modGroupList.findIndex((x) => x.some((x2) => x2.text === text));
    save.weapon = {
      activeWeaponInstance: {
        weaponTypeId: this.activeWeaponInstance.weaponType?.id,
        weaponModList: this.activeWeaponInstance.modList.map((mod) => {
          return { ...mod.serialize(), groupIndex: calcGroupIndex(mod.text) };
        })
      },
      tempWeaponInstance: this.tempWeaponInstance ? {
        weaponTypeId: this.tempWeaponInstance.weaponType?.id,
        weaponModList: this.tempWeaponInstance.modList.map((mod) => {
          return { ...mod.serialize(), groupIndex: calcGroupIndex(mod.text) };
        })
      } : void 0,
      craftList: this.craftList.map((x) => ({ id: x.template.id, craftCount: x.craftCount }))
    };
  }
  deserialize({ weapon: save }) {
    if (!save) {
      return;
    }
    const applySavedDataToWeaponInstance = (weaponInstance, data) => {
      weaponInstance.weaponType = this.data.weaponTypeList?.find((x) => x.id === data?.weaponTypeId) ?? this.data.weaponTypeList?.[0];
      for (const modData of data?.weaponModList || []) {
        if (!isString(modData?.id) || !isString(modData.text)) {
          continue;
        }
        const template = modTemplates.find((x) => x.id === modData.id);
        if (!template) {
          continue;
        }
        const mod = Modifier.modFromText(modData.text);
        if (modData.values) {
          mod.setValues(modData.values.filter(isNumber));
        }
        weaponInstance.modList.push(mod);
      }
    };
    this.activeWeaponInstance.modList.splice(0);
    applySavedDataToWeaponInstance(this.activeWeaponInstance, save.activeWeaponInstance);
    for (const craftData of save.craftList || []) {
      const id = craftData?.id;
      const craft = this.craftList.find((x) => x.template.id === id);
      if (!craft || !id) {
        continue;
      }
      craft.craftCount = craftData.craftCount === null ? Infinity : craftData.craftCount ?? 0;
      this.craftTableElement.updateCraftCount(id, craft.craftCount);
    }
    if (save.tempWeaponInstance) {
      this.craftTableElement.setCraftModeState(true);
      this.tempWeaponInstance = { modList: [] };
      applySavedDataToWeaponInstance(this.tempWeaponInstance, save.tempWeaponInstance);
      this.craftTableElement.selectCraft(this.craftList[0]?.template.id ?? null);
    }
    this.updateWeapon();
    this.applyMods();
    this.craftTableElement.selectCraft(this.craftList[0]?.template.id ?? null);
  }
};

// src/game/components/playerClasses/PlayerClasses.ts
var PlayerClasses = class extends Component {
  constructor(data) {
    super("playerClasses");
    this.data = data;
    this.page.insertAdjacentHTML("beforeend", '<div class="g-title title">Select Player Class</div>');
    this.page.insertAdjacentHTML("beforeend", '<ul class="s-playerClass-list" data-playerClass-list></ul>');
    this.page.insertAdjacentHTML("beforeend", '<div class="s-playerClass-info" data-playerClass-info></div>');
    this.playerClassList = data.classList.map((data2) => {
      const element = document.createElement("li");
      element.classList.add("g-list-item");
      element.textContent = data2.name;
      this.page.querySelectorStrict("[data-playerClass-list]").appendChild(element);
      element.addEventListener("click", () => this.selectClassByName(data2.name));
      return { data: data2, unlocked: true, element };
    });
    this.page.querySelectorStrict("[data-playerClass-list]").append(...this.playerClassList.map((x) => x.element));
    player.stats.playerClass.texts = this.playerClassList.map((x) => x.data.name);
    if (this.playerClassList[0]) {
      this.selectClassByName(this.playerClassList[0].data.name);
    }
  }
  playerClassList;
  selectClassByName(playerClassName) {
    const playerClass = this.playerClassList.findStrict((x) => x.data.name === playerClassName);
    this.showClass(playerClass);
    this.playerClassList.forEach((x) => x.element.classList.toggle("selected", x === playerClass));
  }
  async tryAssignPlayerClass(playerClass) {
    if (!player.stats.playerClass.getText()) {
      this.assignPlayerClass(playerClass);
      return;
    }
    const prompt = createCustomElement(PromptWindowElement);
    prompt.setBodyText("This will reset your progression in this ascension!\nAre you sure?");
    const id = await prompt.setButtons([{ text: "Yes", type: "confirm", waitId: "confirm" }, { text: "Cancel", type: "cancel" }]);
    if (id === "confirm") {
      void await game.resetAscension();
      this.assignPlayerClass(playerClass);
    }
  }
  assignPlayerClass(playerClass) {
    player.stats.playerClass.setText(playerClass.data.name);
    player.modDB.replace("PlayerClass", Modifier.extractStatModifierList(...Modifier.modsFromTexts(playerClass.data.modList)));
    this.playerClassList.forEach((x) => x.element.setAttribute("data-tag", x === playerClass ? "valid" : ""));
  }
  showClass(playerClass) {
    const element = this.page.querySelectorStrict("[data-playerClass-info]");
    element.replaceChildren();
    element.insertAdjacentHTML("beforeend", `<div class="g-title">${playerClass.data.name}</div>`);
    const modListElement = document.createElement("ul");
    modListElement.classList.add("g-mod-list");
    for (const mod of playerClass.data.modList) {
      modListElement.insertAdjacentHTML("beforeend", `<li>${Modifier.toDescription(mod)}</li>`);
    }
    element.appendChild(modListElement);
    const button = document.createElement("button");
    button.textContent = "Assign";
    const updateButton = () => {
      const disabled = player.stats.playerClass.getText() === playerClass.data.name;
      button.toggleAttribute("disabled", disabled);
    };
    button.addEventListener("click", async () => {
      await this.tryAssignPlayerClass(playerClass);
      updateButton();
    });
    updateButton();
    element.appendChild(button);
  }
  serialize(save) {
    save.playerClasses = {
      activePlayerClassName: player.stats.playerClass.getText() ?? "undefined",
      playerClassList: this.playerClassList.filter((x) => x.unlocked).map((x) => ({ name: x.data.name }))
    };
  }
  deserialize({ playerClasses: save }) {
    for (const data of save?.playerClassList || []) {
      const playerClass = this.playerClassList.find((x) => x.data.name === data?.name);
      if (playerClass) {
        playerClass.unlocked = true;
      }
    }
    if (save?.activePlayerClassName) {
      const playerClass = this.playerClassList.find((x) => x.data.name === save?.activePlayerClassName);
      if (playerClass) {
        player.stats.playerClass.setText("");
        this.assignPlayerClass(playerClass);
        this.selectClassByName(playerClass.data.name);
      }
    }
  }
};

// src/game/gameModule/GameModule.ts
var GAME_MODULE_VERSION = "v0";

// src/game/components/ascension/Ascend.ts
var states = ["invalid", "pendingText", "text", "pendingCombat", "combat", "cancelCombat", "finalText", "pendingAscend", "ascend", "complete"];
var Ascend = class {
  constructor(overlord) {
    this.overlord = overlord;
    this.page = document.createElement("div");
    this.page.classList.add("p-ascend");
    const button = document.createElement("button");
    button.textContent = "Begin Ascend";
    button.setAttribute("data-ascend-button", "");
    button.addEventListener("click", () => {
      switch (this._state) {
        case "pendingText":
          return this.executeState("text");
        case "pendingCombat":
          return this.executeState("combat");
        case "combat":
          return this.executeState("cancelCombat");
        case "pendingAscend":
          return this.executeState("ascend");
        default:
          throw `${this._state} is an invalid state here`;
      }
    });
    this.page.appendChild(button);
    this.page.insertAdjacentHTML("beforeend", '<div class="s-text-area" data-text-area></div>');
    player.stats.level.addListener("change", (e) => {
      if (this._state !== "invalid") {
        return;
      }
      if (e.curValue < game.maxLevel) {
        void this.executeState("invalid");
        return;
      }
      if (this._state !== "invalid") {
        return;
      }
      void this.executeState("pendingText");
    });
  }
  curAscension;
  onAscension = new EventEmitter();
  page;
  _zone;
  _state = "invalid";
  get state() {
    return this._state;
  }
  get zone() {
    return this._zone;
  }
  setAscension(instance) {
    this.curAscension = instance;
  }
  async executeState(state) {
    const updateBtn = async (btnDisabled, btnText) => {
      const btn = this.page.querySelectorStrict("[data-ascend-button]");
      btn.textContent = btnText ?? btn.textContent;
      btn.toggleAttribute("disabled", btnDisabled);
    };
    this._state = state;
    switch (state) {
      case "invalid":
        await updateBtn(true, "Begin Ascension");
        break;
      case "pendingText":
        await updateBtn(false, "Begin Ascension");
        break;
      case "text":
        await updateBtn(true);
        await this.beginPrintText(this.getTempTextLines());
        await this.executeState("pendingCombat");
        break;
      case "pendingCombat":
        await updateBtn(false, "Attack");
        break;
      case "combat":
        await updateBtn(false, "Abort");
        this.startCombat();
        break;
      case "cancelCombat":
        this.cancelCombat();
        await this.executeState("pendingCombat");
        break;
      case "finalText":
        await updateBtn(true, "Ascend");
        await this.beginPrintText(["Good Luck!"]);
        await this.executeState("pendingAscend");
        break;
      case "pendingAscend":
        await updateBtn(false, "Ascend");
        break;
      case "ascend":
        await this.ascend();
        break;
      case "complete":
        await updateBtn(true, "Ascend");
        break;
    }
  }
  async beginPrintText(lines) {
    await Promise.resolve(this.typeText(lines));
  }
  startCombat() {
    const zoneOptions = {
      name: "Overlord",
      enemyBaseCount: 1,
      candidates: [{ ...this.overlord, id: "overlord", weight: 1 }],
      areaModList: [],
      enemyBaseLife: combat.enemyBaseLife
    };
    this._zone = new Zone(zoneOptions);
    this._zone.onComplete.listen(async () => {
      await this.executeState("finalText");
      this._zone = null;
    });
    combat.startZone(this._zone);
  }
  cancelCombat() {
    assertNonNullable(this._zone);
    combat.stopZone(this._zone);
  }
  async ascend() {
    await this.executeState("invalid");
    game.stats.ascensionCount.add(1);
    if (!this.curAscension) {
      console.log("You have reached the end!");
      void this.executeState("complete");
      return;
    }
    assertNonNullable(this.curAscension);
    this.onAscension.invoke(this.curAscension);
    await game.saveGame();
    await game.resetAscension();
  }
  appendAllText(lines) {
    this.page.querySelectorStrict("[data-text-area]").textContent = lines.join("\n");
  }
  serialize() {
    return { ascendState: this._state, zone: this._zone?.serialize() };
  }
  deserialize(state, zone) {
    if (state && states.includes(state)) {
      const stateIndex = states.indexOf(state);
      if (stateIndex > states.indexOf("finalText")) {
        this.appendAllText(["Good Luck!"]);
      } else if (stateIndex > states.indexOf("text")) {
        this.appendAllText(this.getTempTextLines());
      }
      void this.executeState(state);
    }
    if (zone && state === "combat") {
      this.startCombat();
      this._zone?.deserialize(zone);
    }
  }
  getTempTextLines() {
    return `
            [Overlord] You've come far... Let's see how you fare against a real challenge...
            ...
            Prepare yourself!
        `.split(/\r?\n/m).filter((x) => x).map((x) => x.trim());
  }
  typeText(textLines) {
    const text = textLines.join("\n");
    return new Promise((resolve) => {
      const element = this.page.querySelectorStrict("[data-text-area]");
      element.textContent = "";
      let charIndex = 0;
      let timeTotal = 0;
      const cancel = gameLoop.registerCallback((dt) => {
        timeTotal += dt * 1e3;
        while (timeTotal > 50 && charIndex <= text.length) {
          element.innerHTML += text.charAt(charIndex++);
          timeTotal -= 50;
        }
        if (charIndex >= text.length) {
          cancel();
          resolve();
        }
      });
    });
  }
};

// src/game/components/ascension/Ascensions.ts
var Ascensions = class {
  page;
  ascensionInstanceList = [];
  constructor() {
    this.page = document.createElement("div");
    this.page.classList.add("p-ascensions");
    this.page.insertAdjacentHTML("beforeend", '<div class="g-title">Ascension List</div>');
    this.page.insertAdjacentHTML("beforeend", '<div class="s-ascension-info" data-ascension-info></div>');
    this.page.insertAdjacentHTML("beforeend", '<ul class="s-ascension-list" data-ascension-list></ul>');
  }
  get lastInstance() {
    return this.ascensionInstanceList[this.ascensionInstanceList.length - 1];
  }
  addAscension(ascensionInstance) {
    const element = document.createElement("li");
    element.classList.add("g-list-item");
    const name = `Ascension ${this.ascensionInstanceList.length + 1}`;
    element.textContent = name;
    element.addEventListener("click", () => {
      this.selectAscensionByName(name);
    });
    this.ascensionInstanceList.push({ data: ascensionInstance, name, element });
    this.page.querySelectorStrict("[data-ascension-list]").appendChild(element);
    if (!element.parentElement?.querySelector("li.selected")) {
      element.click();
    }
    Zone.GlobalAreaModList.push(...ascensionInstance.modList);
  }
  selectAscensionByName(name) {
    const instance = this.ascensionInstanceList.findStrict((x) => x.name === name);
    this.showAscensionInstance(instance);
    this.ascensionInstanceList.forEach((x) => x.element.classList.toggle("selected", x === instance));
  }
  showAscensionInstance(ascension) {
    const element = this.page.querySelectorStrict("[data-ascension-info]");
    element.replaceChildren();
    element.insertAdjacentHTML("beforeend", `<div class="g-title">${ascension.name}</div>`);
    const modListElement = document.createElement("ul");
    modListElement.classList.add("g-mod-list");
    for (const mod of ascension.data.modList) {
      modListElement.insertAdjacentHTML("beforeend", `<li>${Modifier.toDescription(mod)}</li>`);
    }
    element.appendChild(modListElement);
  }
};

// src/game/components/ascension/Ascension.ts
var Ascension = class extends Component {
  constructor(data) {
    super("ascension");
    this.data = data;
    const menu = createCustomElement(TabMenuElement);
    menu.style.visibility = "hidden";
    menu.setDirection("horizontal");
    this.page.appendChild(menu);
    {
      this.ascend = new Ascend(data.overLord);
      this.page.appendChild(this.ascend.page);
      menu.addMenuItem("Ascend", "ascend");
      menu.registerPageElement(this.ascend.page, "ascend");
      const ascension = this.getNextAscension();
      this.ascend.setAscension(ascension);
      this.ascend.onAscension.listen((instance) => {
        this.ascensions?.addAscension(instance);
        const nextAscension = this.getNextAscension();
        this.ascend.setAscension(nextAscension);
      });
    }
    executeRequirement({ ascensionCount: 1 }, () => {
      this.ascensions = new Ascensions();
      this.page.appendChild(this.ascensions.page);
      menu.addMenuItem("Ascensions", "ascensions");
      menu.registerPageElement(this.ascensions.page, "ascensions");
      menu.style.visibility = "visible";
    });
  }
  ascend;
  ascensions;
  getNextAscension() {
    const lastInstance = this.ascensions?.lastInstance;
    const nextInstance = this.data.ascensionInstanceList[this.data.ascensionInstanceList.findIndex((x) => x.id === lastInstance?.data.id) + 1];
    return nextInstance;
  }
  serialize(save) {
    const lastId = this.ascensions?.lastInstance?.data.id;
    save.ascension = { id: lastId, ...this.ascend.serialize() };
  }
  deserialize({ ascension: save }) {
    const ascensionInstance = this.data.ascensionInstanceList.find((x) => x.id === save?.id);
    const lastIndex = ascensionInstance ? this.data.ascensionInstanceList.indexOf(ascensionInstance) : -1;
    if (ascensionInstance) {
      if (lastIndex !== -1) {
        const ascensions = this.data.ascensionInstanceList.slice(0, lastIndex + 1);
        ascensions.forEach((x) => this.ascensions?.addAscension(x));
      }
    }
    this.ascend.setAscension(this.data.ascensionInstanceList[lastIndex + 1]);
    this.ascend.deserialize(save?.ascendState, save?.zone);
  }
};

// src/game/components/Components.ts
var Components = class {
  components = {
    playerClasses: { label: "Classes", constr: PlayerClasses },
    skills: { label: "Skills", constr: Skills },
    weapon: { label: "Weapon", constr: Weapon },
    artifacts: { label: "Artifacts", constr: Artifacts },
    ascension: { label: "Ascension", constr: Ascension },
    achievements: { label: "Achievements", constr: Achievements }
  };
  componentList = [];
  setupComplete = false;
  init() {
    assertNonNullable(game.module);
    for (const key of Object.keys(this.components)) {
      const data = game.module.components?.[key];
      if (!data) {
        continue;
      }
      let requirement;
      if (key === "ascension") {
        requirement = { maxLevel: game.module.enemyBaseLifeList.length + 1 };
      } else {
        requirement = "requirement" in data ? data.requirement : void 0;
      }
      if (!requirement) {
        this.addComponent(key);
        continue;
      }
      executeRequirement(requirement, () => {
        this.addComponent(key);
      });
    }
  }
  setup() {
    for (const component of this) {
      component.setup?.();
    }
    this.setupComplete = true;
  }
  addComponent(name) {
    const components = game.module?.components;
    const componentData = components?.[name];
    assertDefined(componentData, `game module does not contain the component: ${name}`);
    const instance = new this.components[name].constr(componentData);
    const label = this.components[name].label;
    const menuIndex = Object.keys(this.components).indexOf(name);
    const { menuItem } = game.addPage(instance.page, label, name, menuIndex);
    this.componentList.push(instance);
    if (this.setupComplete) {
      game.addElementHighlight(menuItem);
    }
  }
  reset() {
    this.setupComplete = false;
    this.componentList.forEach((x) => {
      game.page.querySelector(`[data-main-menu] [data-page-target="${x.name}"]`)?.remove();
      game.page.querySelector(`[data-main-view] [data-page-content="${x.name}"]`)?.remove();
    });
    this.componentList.clear();
  }
  serialize(save) {
    for (const component of this.componentList) {
      component.serialize?.(save);
    }
  }
  deserialize(save) {
    for (const component of this.componentList) {
      component.deserialize?.(save);
    }
  }
  *[Symbol.iterator]() {
    for (const component of this.componentList) {
      yield component;
    }
  }
};

// src/config.ts
var ENVIRONMENT = "production";
function resolveGamePathFromVersion(version, filename) {
  return `dist/game_${version}/${filename}`;
}

// src/game/Player.ts
var Player = class {
  onStatsChange = new EventEmitter();
  modDB = new ModDB();
  stats = createPlayerStats(game.stats);
  manaBar;
  statUpdatePending = false;
  constructor() {
    this.manaBar = game.page.querySelectorStrict("[data-combat-overview] [data-mana-bar]");
  }
  get level() {
    return this.stats.level.value;
  }
  init() {
    statistics.createGroup("Player", this.stats);
    this.modDB.onChange.listen(this.updateStats.bind(this));
    if (game.module?.player) {
      const startMods = game.module.player.modList.flatMap((x) => Modifier.modFromText(x).extractStatModifiers());
      this.modDB.add("Player", startMods);
    }
    this.stats.mana.addListener("change", (mana) => {
      const maxMana = this.stats.maxMana.value;
      if (mana.curValue > maxMana) {
        this.stats.mana.set(maxMana, true);
      }
    });
    gameLoop.registerCallback((dt) => {
      const manaRegen = this.stats.manaRegeneration.value * dt;
      this.stats.mana.add(manaRegen);
    });
    gameLoopAnim.registerCallback(() => this.updateManaBar());
  }
  reset() {
    this.statUpdatePending = false;
    this.onStatsChange.removeAllListeners();
    this.modDB.clear();
    Object.values(this.stats).forEach((x) => x.reset());
  }
  setup() {
    if (!this.stats.playerClass.texts) {
      this.stats.playerClass.options.label = void 0;
    }
    this.updateStatsDirect();
    if (this.stats.mana.value === Infinity) {
      this.stats.mana.set(this.stats.maxMana.value);
    }
    this.updateManaBar();
  }
  updateManaBar() {
    if (this.stats.maxMana.value <= 0) {
      return;
    }
    const value = this.stats.mana.value / this.stats.maxMana.value;
    this.manaBar.value = value;
  }
  updateStats() {
    if (this.statUpdatePending) {
      return;
    }
    this.statUpdatePending = true;
    if (ENVIRONMENT === "development" && gameLoop.state === "Stopped") {
      this.updateStatsDirect();
      statistics.updateStats("Player");
      this.statUpdatePending = false;
      return;
    }
    gameLoop.registerCallback(() => {
      this.statUpdatePending = false;
      this.updateStatsDirect();
      this.onStatsChange.invoke(void 0);
    }, { once: true });
  }
  updateStatsDirect() {
    const playerOptions = {
      modDB: this.modDB,
      stats: extractStats(this.stats),
      enemy: combat.enemy ? {
        stats: combat.enemy.stats,
        conditionFlags: combat.enemy.getConditionFlags(),
        modDB: combat.enemy.modDB
      } : void 0
    };
    const result = calcPlayerStats(playerOptions);
    applyStatValues(this.stats, result);
    statistics.updateStats("Player");
  }
  serialize(save) {
    save.player = { stats: serializeStats(this.stats) };
  }
  deserialize({ player: save }) {
    const stats = save?.stats;
    if (stats) {
      deserializeStats(this.stats, stats);
    }
    this.updateStatsDirect();
  }
};

// src/game/statistics/Statistics.ts
var Statistics = class {
  page;
  statisticsGroups = /* @__PURE__ */ new Map();
  constructor() {
    this.page = document.createElement("div");
    this.page.classList.add("p-statistics", "hidden");
    this.page.setAttribute("data-page-content", "statistics");
    this.page.insertAdjacentHTML("beforeend", "<ul data-stat-group-list></ul>");
    game.addPage(this.page, "Statistics", "statistics", 100);
  }
  init() {
    gameLoopAnim.registerCallback(this.updateAll.bind(this), { delay: 1e3 });
    const statList = [game.stats.maxLevel, player.stats.level];
    Object.entries(statList).forEach(([statName, stat]) => stat.addListener("change", () => {
      const group = [...this.statisticsGroups].find(([_, group2]) => group2.statCollection[statName])?.[1];
      if (group) {
        this.updateGroup(group, { [statName]: stat });
      }
    }));
  }
  updateAll() {
    for (const group of this.statisticsGroups.values()) {
      this.updateGroup(group);
    }
  }
  updateStats(name) {
    const group = this.statisticsGroups.get(name);
    if (!group) {
      console.error(`${name} has not been added to statistics`);
      return;
    }
    this.updateGroup(group);
  }
  createGroup(name, statCollection) {
    if (this.statisticsGroups.has(name)) {
      return this.statisticsGroups.get(name);
    }
    const pageGroup = createCustomElement(AccordionElement);
    pageGroup.setTitle(name);
    const body = document.createElement("ul");
    for (const [statName, stat] of Object.entries(statCollection).filter((x) => x[1].options.label)) {
      const li = this.createStatElement(statName, stat);
      body.appendChild(li);
    }
    pageGroup.setContentElements(body);
    pageGroup.toggle(true);
    const stickyGroup = createCustomElement(AccordionElement);
    stickyGroup.setTitle(name);
    this.page.querySelectorStrict("[data-stat-group-list]").appendChild(pageGroup);
    game.page.querySelectorStrict("[data-sticky-stat-group-list]").appendChild(stickyGroup);
    pageGroup.querySelectorAll("[data-stat]").forEach((element) => element.addEventListener("click", () => {
      const statName = element.getAttributeStrict("data-stat");
      const stat = statCollection[statName];
      if (!stat) {
        return;
      }
      stat.sticky = !stat.sticky;
      if (stat.sticky) {
        this.insertSideGroupStatElement(group, statName);
      } else {
        group.stickyGroup.querySelector(`[data-stat="${statName}"]`)?.remove();
      }
      this.updateGroup(group, { [statName]: stat });
    }));
    const group = { pageGroup, stickyGroup, statCollection };
    this.statisticsGroups.set(name, group);
    for (const [statName, stat] of Object.entries(group.statCollection)) {
      if (stat.sticky) {
        this.insertSideGroupStatElement(group, statName);
      }
    }
    this.updateGroup(group);
    stickyGroup.toggle(true);
    return group;
  }
  insertSideGroupStatElement(group, statName) {
    const stat = group.statCollection[statName];
    assertDefined(stat);
    const li = this.createStatElement(statName, stat);
    const statValueText = this.formatVariableText(stat);
    li.querySelectorStrict("[data-stat-value]").textContent = statValueText;
    const statNames = Object.keys(group.statCollection);
    const elements = [...group.stickyGroup.content.querySelectorAll("[data-stat]")];
    elements.push(li);
    elements.sort((a, b) => statNames.indexOf(a.getAttribute("data-stat") ?? "") - statNames.indexOf(b.getAttribute("data-stat") ?? ""));
    group.stickyGroup.setContentElements(...elements);
  }
  createStatElement(statName, stat) {
    const li = document.createElement("li");
    li.classList.add("g-field");
    li.setAttribute("data-stat", statName);
    li.insertAdjacentHTML("beforeend", `<div>${stat.options.label}</div><div class="value" data-stat-value data-tag="${stat.options.valueColorTag}"></div>`);
    li.title = stat.options.hoverTip || "";
    return li;
  }
  updateGroup(group, statCollection) {
    if (!group.pageGroup.open && !group.stickyGroup.open) {
      return;
    }
    statCollection = statCollection ?? group.statCollection;
    for (const [statName, stat] of Object.entries(statCollection)) {
      const visible = stat.visible;
      group.pageGroup.querySelector(`[data-stat="${statName}"]`)?.classList.toggle("hidden", !visible);
      group.stickyGroup.querySelector(`[data-stat="${statName}"]`)?.classList.toggle("hidden", !visible);
      if (!visible) {
        continue;
      }
      const label = stat.options.label;
      if (!isString(label)) {
        continue;
      }
      const statValueText = this.formatVariableText(stat);
      const pageGroupStatElement = group.pageGroup.querySelectorStrict(`[data-stat="${statName}"]`);
      pageGroupStatElement.classList.toggle("sticky", stat.sticky);
      pageGroupStatElement.querySelectorStrict("[data-stat-value]").textContent = statValueText;
      if (stat.sticky) {
        const sideElement = group.stickyGroup.content.querySelector(`[data-stat="${statName}"] [data-stat-value]`);
        if (!sideElement) {
          this.insertSideGroupStatElement(group, statName);
        }
        group.stickyGroup.content.querySelectorStrict(`[data-stat="${statName}"] [data-stat-value]`).textContent = statValueText;
      }
    }
    group.stickyGroup.classList.toggle("hidden", Object.values(group.statCollection).every((x) => !x.sticky));
  }
  formatVariableText(statistic) {
    const formatDate = (value) => {
      const date = /* @__PURE__ */ new Date(0);
      date.setSeconds(value);
      return date.toISOString().substring(11, 19);
    };
    const formatNumber = (statistic2, options) => {
      let value = statistic2.value;
      if (options.isTime) {
        return formatDate(value);
      }
      if (isNumber(options.multiplier)) {
        value *= 100;
      }
      if (isNumber(options.decimals)) {
        value = toDecimals(value, options.decimals);
      } else {
        value = Math.floor(value);
      }
      let string = value.toString();
      if (isString(options.suffix)) {
        string += options.suffix || "";
      }
      return string;
    };
    if (statistic.value === Infinity) {
      return "\u221E";
    }
    if (statistic.texts) {
      return statistic.getText() || "Error";
    }
    if (statistic.options.statFormat) {
      let string = "";
      for (const item of statistic.options.statFormat(statistic)) {
        if (isString(item)) {
          string += item;
          continue;
        }
        if (item === statistic) {
          string += formatNumber(item, item.options);
        } else {
          string += this.formatVariableText(item);
        }
      }
      return string;
    }
    switch (statistic.options.type) {
      case "number":
        return formatNumber(statistic, statistic.options);
      case "boolean":
        return statistic.value === 0 ? "False" : "True";
    }
    return statistic.value.toFixed();
  }
  reset() {
    this.statisticsGroups.forEach((x) => {
      x.pageGroup.remove();
      x.stickyGroup.remove();
    });
    this.statisticsGroups.clear();
  }
  serialize(save) {
    const groups = {};
    for (const [key, group] of this.statisticsGroups.entries()) {
      groups[key] = {
        pageHeaderOpenState: group.pageGroup.open,
        sideHeaderOpenState: group.stickyGroup.open
      };
    }
    save.statistics = { groups };
  }
  deserialize({ statistics: save }) {
    if (!save) {
      return;
    }
    if (save.groups) {
      for (const [groupName, states2] of Object.entries(save.groups)) {
        const group = this.statisticsGroups.get(groupName);
        if (group) {
          group.pageGroup.toggle(states2?.pageHeaderOpenState ?? true);
          group.stickyGroup.toggle(states2?.sideHeaderOpenState ?? true);
        }
      }
    }
  }
};

// src/shared/utils/LoopWorker.ts
var LoopWorker = class {
  worker;
  constructor() {
    const blob = new Blob([`(${workerScript.toString()})();`]);
    const blobURL = window.URL.createObjectURL(blob);
    this.worker = new Worker(blobURL);
    this.worker.addEventListener("message", () => this.onMessage());
    this.worker.onmessage = this.onMessage.bind(this);
  }
  postMessage(data) {
    this.worker.postMessage(data);
  }
  onMessage() {
  }
  terminate() {
    this.worker.terminate();
  }
};
var workerScript = () => {
  const WAIT_TIME = 1e3;
  let loopId;
  const loop = () => {
    let remainder = 0;
    let now = performance.now();
    clearTimeout(loopId);
    const loop2 = () => {
      loopId = self.setTimeout(() => {
        let time = performance.now() - now + remainder;
        now = performance.now();
        if (time >= WAIT_TIME) {
          self.postMessage(void 0);
          time -= 1e3;
        }
        remainder = time;
        loop2();
      }, WAIT_TIME);
    };
    loop2();
  };
  self.addEventListener("message", (e) => {
    switch (e.data.state) {
      case "start":
        loop();
        break;
      case "stop":
        clearTimeout(loopId);
        break;
    }
  });
};

// src/shared/utils/Loop.ts
var TARGET_TICK_RATE = 1e3 / 60;
var DELTA_TIME_SECONDS = TARGET_TICK_RATE / 1e3;
var Loop = class {
  _state = "Stopped";
  loop;
  constructor() {
    this.loop = new DefaultLoop();
  }
  get state() {
    return this._state;
  }
  get loopType() {
    return this.loop.type;
  }
  setLoopType(type) {
    if (this.loopType === type) {
      return;
    }
    const state = this._state;
    const instanceMap = this.loop.instanceMap;
    if (state === "Running") {
      this.stop();
    }
    this.loop?.dispose?.();
    switch (type) {
      case "WebWorker":
        this.loop = new WebWorkerLoop();
        break;
      case "Animation":
        this.loop = new AnimationLoop();
        break;
      default:
        this.loop = new DefaultLoop();
        break;
    }
    instanceMap.forEach((value, key) => this.loop.instanceMap.set(key, value));
    if (state === "Running") {
      this.start();
    }
  }
  registerCallback(callback, options) {
    const id = uuid();
    const instance = {
      time: 0,
      id,
      callback,
      options
    };
    this.loop.instanceMap.set(id, instance);
    return () => this.unregister(id);
  }
  unregister(id) {
    this.loop.unregister(id);
  }
  reset() {
    this.loop.instanceMap.clear();
  }
  toggleState() {
    switch (this._state) {
      case "Running":
        this.stop();
        break;
      case "Stopped":
        this.start();
        break;
    }
  }
  skipTime(time) {
    this.loop.skipTime(time);
  }
  start() {
    if (this._state === "Running") {
      return;
    }
    this._state = "Running";
    this.loop.start();
  }
  stop() {
    this._state = "Stopped";
    this.loop.stop();
  }
};
var BaseLoop = class {
  instanceMap = /* @__PURE__ */ new Map();
  lastTime = 0;
  remainder = 0;
  unregister(id) {
    this.instanceMap.delete(id);
  }
  start() {
    this.remainder = 0;
    this.lastTime = performance.now();
  }
  tick() {
    const frameTime = Math.min(performance.now() - this.lastTime, 2e3);
    let time = frameTime + this.remainder;
    while (time >= TARGET_TICK_RATE) {
      time -= TARGET_TICK_RATE;
      for (const instance of this.instanceMap.values()) {
        instance.time += TARGET_TICK_RATE;
        const targetWaitTime = instance.options?.delay ?? TARGET_TICK_RATE;
        if (instance.time < targetWaitTime) {
          continue;
        }
        instance.callback(DELTA_TIME_SECONDS, instance);
        if (instance.options?.once) {
          this.instanceMap.delete(instance.id);
        } else {
          instance.time -= targetWaitTime;
        }
      }
    }
    this.remainder = time;
    this.lastTime = performance.now();
  }
  skipTime(time) {
    this.remainder += time;
  }
};
var DefaultLoop = class extends BaseLoop {
  type = "Default";
  loopId = -1;
  start() {
    clearTimeout(this.loopId);
    super.start();
    const loop = () => {
      this.loopId = window.setTimeout(() => {
        super.tick();
        if (this.loopId) {
          loop();
        }
      }, TARGET_TICK_RATE);
    };
    loop();
  }
  stop() {
    window.clearTimeout(this.loopId);
    this.loopId = -1;
  }
};
var WebWorkerLoop = class extends BaseLoop {
  type = "WebWorker";
  worker;
  constructor() {
    super();
    this.worker = new LoopWorker();
    this.worker.onMessage = () => {
      super.tick();
    };
  }
  start() {
    this.worker.postMessage({ state: "start" });
    super.start();
  }
  stop() {
    this.worker.postMessage({ state: "stop" });
  }
  dispose() {
    this.worker.terminate();
  }
};
var AnimationLoop = class extends BaseLoop {
  type = "Animation";
  requestId = 0;
  start() {
    cancelAnimationFrame(this.requestId);
    super.start();
    const loop = () => {
      this.requestId = requestAnimationFrame(() => {
        super.tick();
        if (this.requestId > 0) {
          loop();
        }
      });
    };
    loop();
  }
  stop() {
    cancelAnimationFrame(this.requestId);
    this.requestId = 0;
  }
};

// src/shared/utils/saveManager.ts
var lzString = __toESM(require_lz_string(), 1);
function saveGame(data) {
  saveData("game", Object.fromEntries(data));
}
function loadGame(id) {
  const text = loadText("game");
  const map = new Map(Object.entries(JSON.parse(text)));
  return id ? map.get(id) : map;
}
function saveData(name, data) {
  const text = JSON.stringify(data);
  const compressed = lzString.compressToEncodedURIComponent(text);
  localStorage.setItem(name, compressed);
}
function loadText(name) {
  const compressed = localStorage.getItem(name);
  if (!compressed) {
    return "{}";
  }
  const uncompressed = lzString.decompressFromEncodedURIComponent(compressed);
  return uncompressed;
}

// src/game/Notifications.ts
var Notifications = class {
  page;
  notificationListElement;
  notificationList = [];
  constructor() {
    this.page = document.createElement("div");
    this.page.classList.add("p-notifications", "hidden");
    this.page.setAttribute("data-page-content", "notifications");
    this.page.insertAdjacentHTML("beforeend", '<div class="s-toolbar"><button data-mark-all-as-seen>Mark all as Seen</button></div>');
    this.notificationListElement = document.createElement("ul");
    this.notificationListElement.classList.add("s-notifications-list");
    this.notificationListElement.setAttribute("data-notifications-list", "");
    this.page.appendChild(this.notificationListElement);
    game.page.appendChild(this.page);
    game.addPage(this.page, "Notifications", "notifications", 200);
    new MutationObserver(() => {
      if (this.page.classList.contains("hidden")) {
        this.notificationList.forEach((x) => x.element.classList.remove("outline"));
        return;
      }
      for (const notification of this.notificationList.filter((x) => !x.elementId && !x.seen)) {
        notification.element.classList.add("outline");
        notification.seen = true;
      }
      this.updateMenuName();
    }).observe(this.page, { attributes: true, attributeFilter: ["class"] });
    this.page.querySelectorStrict("[data-mark-all-as-seen]").addEventListener("click", () => {
      for (const notification of this.notificationList) {
        if (notification.elementId) {
          game.removeHighlightElement(notification.elementId);
        }
        notification.seen = true;
      }
      this.updateMenuName();
    });
  }
  addNotification(entry) {
    const seen = !this.page.classList.contains("hidden");
    const element = this.createNotificationElement({ ...entry });
    this.notificationListElement.insertBefore(element, this.notificationListElement.firstElementChild);
    const notification = {
      ...entry,
      seen,
      time: entry.time ?? Date.now(),
      element
    };
    this.notificationList.push(notification);
    if (entry.elementId && !entry.seen) {
      game.addElementHighlight(entry.elementId, () => {
        notification.seen = true;
        this.updateMenuName();
      });
    }
    this.updateMenuName();
    return notification;
  }
  updateMenuName() {
    const unseenNotificationCount = this.notificationList.filter((x) => !x.seen).length;
    const menuItem = game.menu.querySelectorStrict('[data-page-target="notifications"]');
    menuItem.textContent = `Notifications${unseenNotificationCount > 0 ? ` (${unseenNotificationCount})` : ""}`;
  }
  createNotificationElement(entry) {
    const formattedDate = this.getFormattedDate(entry.time ?? Date.now());
    const element = document.createElement("li");
    element.insertAdjacentHTML("beforeend", `<div class="title"><span>${entry.title}</span><span class="date g-text-small g-text-mute">${formattedDate}</span></div>`);
    if (entry.description) {
      element.insertAdjacentHTML("beforeend", `<div class="description g-text-small">${entry.description}</div>`);
    }
    return element;
  }
  getFormattedDate(time) {
    const oldDate = new Date(time);
    const newDate = /* @__PURE__ */ new Date();
    let formattedDate = "";
    if (newDate.getFullYear() - oldDate.getFullYear() >= 1) {
      formattedDate = `${oldDate.getFullYear().toString()}, `;
    }
    if (newDate.getTime() - oldDate.getTime() >= 1e3 * 60 * 60 * 24) {
      const monthName = oldDate.toLocaleString("en-us", { month: "long" });
      const dateFormatter = new Intl.DateTimeFormat(navigator.language, { day: "2-digit", timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
      formattedDate += `${monthName} ${dateFormatter.format(oldDate)}, `;
    }
    const timeFormatter = new Intl.DateTimeFormat(navigator.language, { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
    formattedDate += `${timeFormatter.format(oldDate)}`;
    return formattedDate;
  }
  reset() {
    this.notificationList.splice(0);
    this.notificationListElement.replaceChildren();
  }
  serialize(save) {
    save.notifications = {
      notificationList: this.notificationList
    };
  }
  deserialize({ notifications: save }) {
    for (const serializedNotification of save?.notificationList ?? []) {
      if (!isString(serializedNotification?.title)) {
        continue;
      }
      const entry = {
        title: serializedNotification.title,
        description: serializedNotification.description,
        elementId: serializedNotification.elementSourceId,
        time: serializedNotification.time
      };
      const notification = this.addNotification(entry);
      notification.seen = serializedNotification.seen ?? false;
    }
    this.updateMenuName();
  }
};

// src/game/game.ts
var DOCUMENT_TITLE = "Idle Ascension";
var updateDocumentTitle = () => document.title = `${DOCUMENT_TITLE} (${gameLoop.state})`;
var Game = class {
  page;
  components = new Components();
  tickSecondsEvent = new EventEmitter();
  _module = null;
  _moduleId;
  stats = createGameStats();
  _resources = {};
  constructor() {
    this.page = this.createPage();
  }
  get menu() {
    return this.page.querySelectorStrict("[data-main-menu]");
  }
  get module() {
    return this._module;
  }
  get hasModule() {
    return !!this._module;
  }
  get moduleId() {
    return this._moduleId;
  }
  get resources() {
    return this._resources;
  }
  get maxLevel() {
    assertDefined(this._module);
    return this._module.enemyBaseLifeList.length + 1;
  }
  async init(module, moduleId, save) {
    if (this._module) {
      this.reset();
    }
    this._moduleId = moduleId;
    const moduleName = moduleList_default.list.findStrict((x) => x.id === moduleId).name;
    this._module = module;
    statistics.createGroup("General", this.stats);
    if (module.resourceList) {
      this._resources = createResourceStats(module.resourceList);
      statistics.createGroup("Resources", this.resources);
    }
    statistics.init();
    combat.init();
    player.init();
    this.components.init();
    this.page.querySelectorStrict("[data-module-name]").textContent = moduleName;
    this.page.querySelectorStrict('[data-page-target="combat"]').click();
    if (save) {
      this.deserialize(save);
    }
    player.setup();
    world.setup();
    combat.effectHandler.setup();
    this.components.setup();
    await this.saveGame();
    statistics.updateAll();
    player.stats.level.addListener("change", ({ curValue }) => this.stats.maxLevel.set(Math.max(curValue, this.stats.maxLevel.value)));
    gameLoop.registerCallback(() => {
      this.tickSecondsEvent.invoke(void 0);
    }, { delay: 1e3 });
    this.tickSecondsEvent.listen(() => {
      this.stats.timePlayed.add(1);
    });
    gameLoop.registerCallback(async () => {
      await this.saveGame();
    }, { delay: 1e3 * 10 });
    if (ENVIRONMENT !== "development") {
      gameLoop.start();
      gameLoopAnim.start();
    }
    document.body.appendChild(this.page);
    await this.createStyle();
  }
  createPage() {
    const element = document.createElement("main");
    element.classList.add("p-game", "hidden");
    element.setAttribute("data-page-content", "game");
    const homeButton = document.createElement("button");
    homeButton.textContent = "Home";
    homeButton.addEventListener("click", () => location.hash = "#home");
    element.appendChild(homeButton);
    const combatOverview = document.createElement("div");
    combatOverview.classList.add("s-combat-overview");
    combatOverview.setAttribute("data-combat-overview", "");
    combatOverview.insertAdjacentHTML("beforeend", '<span class="enemy-name" data-enemy-name></span>');
    combatOverview.insertAdjacentHTML("beforeend", '<progress class="s-life-bar" data-life-bar value="1" max="1"></progress>');
    combatOverview.insertAdjacentHTML("beforeend", '<span class="player-name" data-player-name>Player</span>');
    combatOverview.insertAdjacentHTML("beforeend", '<progress class="s-mana-bar" data-mana-bar value="1" max="1"></progress>');
    element.appendChild(combatOverview);
    element.insertAdjacentHTML("beforeend", '<span class="title" data-module-name>Idle Ascension</span>');
    const menu = createCustomElement(TabMenuElement);
    menu.classList.add("s-menu");
    menu.setAttribute("data-main-menu", "");
    element.appendChild(menu);
    element.insertAdjacentHTML("beforeend", "<div data-main-view></div>");
    element.insertAdjacentHTML("beforeend", '<ul class="sticky-stat-group-list" data-sticky-stat-group-list></ul>');
    return element;
  }
  createStyle() {
    this.page.querySelector("[data-game-style]")?.remove();
    return new Promise((resolve, error) => {
      const linkElement = document.createElement("link");
      linkElement.setAttribute("data-game-style", "");
      linkElement.setAttribute("rel", "stylesheet");
      linkElement.setAttribute("type", "text/css");
      linkElement.setAttribute("href", resolveGamePathFromVersion(GAME_MODULE_VERSION, "style.css"));
      linkElement.addEventListener("error", () => error());
      linkElement.addEventListener("load", () => resolve());
      this.page.appendChild(linkElement);
    });
  }
  reset() {
    this.components.reset();
    this.tickSecondsEvent.removeAllListeners();
    gameLoop.reset();
    gameLoopAnim.reset();
    Object.values(this.stats).forEach((x) => x.reset());
    Object.values(this.resources).forEach((x) => x.reset());
    world.restart();
    combat.reset();
    player.reset();
    statistics.reset();
    notifications.reset();
    updateDocumentTitle();
    game.page.remove();
  }
  async resetAscension() {
    assertNonNullable(game.module);
    assertDefined(game.moduleId);
    const save = loadGame(game.moduleId);
    assertDefined(save);
    const newSave = {
      ...save.meta,
      ascension: save.ascension,
      game: { stats: save.game?.stats }
    };
    void await game.init(game.module, game.moduleId, newSave);
  }
  addPage(pageElement, label, id, menuIndex) {
    const menuItem = this.menu.addMenuItem(label, id, menuIndex);
    this.menu.registerPageElement(pageElement, id);
    this.page.querySelectorStrict("[data-main-view]").appendChild(pageElement);
    const comparer = (a, b) => a.getAttribute("data-index")?.localeCompare(b.getAttribute("data-index") || "", void 0, { numeric: true }) || 0;
    this.menu.sort(comparer);
    return { menuItem };
  }
  addElementHighlight(arg, onRemove) {
    const element = arg instanceof HTMLElement ? arg : this.page.querySelector(`[data-id="${arg}"]`);
    if (!element) {
      return;
    }
    element.setAttribute("data-highlight", "");
    const removeHighlight = ((e) => {
      if (e.type === "mouseover" && !e.ctrlKey) {
        return;
      }
      element.removeAttribute("data-highlight");
      this.updateHighlightMenuItems(element);
      element.removeEventListener("click", removeHighlight);
      element.removeEventListener("mouseover", removeHighlight);
      onRemove?.();
    }).bind(this);
    element.addEventListener("click", removeHighlight);
    element.addEventListener("mouseover", removeHighlight);
    this.updateHighlightMenuItems(element);
  }
  removeHighlightElement(arg) {
    const element = arg instanceof HTMLElement ? arg : this.page.querySelector(`[data-id="${arg}"]`);
    if (!element) {
      return;
    }
    element.removeAttribute("data-highlight");
    this.updateHighlightMenuItems(element);
  }
  updateHighlightMenuItems(element) {
    for (const menuItem of this.menu.generateTabMenuAncestorList(element)) {
      const pageId = menuItem.getAttribute("data-page-target");
      const page = menuItem.closest("[data-page-content]");
      const highlightedElementsCount = page?.querySelector(`[data-page-content="${pageId}"]`)?.querySelectorAll("[data-highlight]").length ?? 0;
      menuItem.toggleAttribute("data-highlight", highlightedElementsCount > 0);
    }
  }
  async saveGame() {
    assertDefined(this._moduleId);
    const saves = loadGame();
    const oldSave = saves.get(this._moduleId);
    const serialization = {
      meta: { moduleId: this._moduleId, createdAt: oldSave?.meta?.createdAt || Date.now(), lastSavedAt: Date.now() }
    };
    this.serialize(serialization);
    saves.set(this._moduleId, serialization);
    saveGame(saves);
  }
  dispose() {
    this.page.remove();
  }
  serialize(save) {
    save.game = { stats: serializeStats(this.stats), resources: serializeStats(this.resources) };
    world.serialize(save);
    statistics.serialize(save);
    player.serialize(save);
    combat.effectHandler.serialize(save);
    notifications.serialize(save);
    this.components.serialize(save);
    const name = this.menu.querySelectorStrict(".selected")?.getAttribute("data-page-target");
    sessionStorage.setItem("main-menu", name || "");
    save.elementHighlightIdList = [...game.page.querySelectorAll("[data-highlight]")].map((x) => x.getAttribute("data-id")).filter(isNonNullable);
  }
  deserialize(save) {
    for (const id of save.elementHighlightIdList ?? []) {
      if (id) {
        this.addElementHighlight(id);
      }
    }
    statistics.deserialize(save);
    deserializeStats(game.stats, save.game?.stats || {});
    deserializeStats(game.resources, save.game?.resources || {});
    player.deserialize(save);
    world.deserialize(save);
    this.components.deserialize(save);
    combat.effectHandler.deserialize(save);
    notifications.deserialize(save);
    this.menu.querySelector(`[data-page-target="${sessionStorage.getItem("main-menu")}"]`)?.click();
  }
};
var gameLoop = new Loop();
var gameLoopAnim = new Loop();
gameLoopAnim.setLoopType("Animation");
var game = new Game();
var statistics = new Statistics();
var combat = new Combat();
var world = new World();
var player = new Player();
var notifications = new Notifications();
async function init(args) {
  await game.init(args[0], args[1], args[2]);
  setupGlobalScope(args[3]);
}
function dispose(globalScope) {
  game.page.remove();
  delete globalScope.game;
  document.body.removeEventListener("keydown", toggleLoop);
}
function setupGlobalScope(globalScope) {
  document.addEventListener("visibilitychange", toggleLoopType);
  if (ENVIRONMENT === "development") {
    console.log("Press Space to toggle GameLoop");
    document.body.addEventListener("keydown", toggleLoop);
    globalScope.game = {
      save: () => game.moduleId && game.saveGame(),
      printSave: () => game.moduleId && loadGame(game.moduleId),
      game,
      player,
      getEnemy: () => combat.enemy,
      setLevel: (level) => player.stats.level.set(level),
      addResource: (type, value) => {
        game.resources[type]?.add(value);
      },
      skipTime: (time, units = "ms") => {
        switch (units) {
          case "sec":
            time *= 1e3;
            break;
          case "min":
            time *= 1e3 * 60;
            break;
        }
        console.time("Skip Time");
        gameLoop.skipTime(time);
        console.timeEnd("Skip Time");
      }
    };
  }
}
function toggleLoopType() {
  if (document.hidden) {
    gameLoop.setLoopType("WebWorker");
  } else {
    gameLoop.setLoopType("Default");
  }
}
function toggleLoop(e) {
  if (e.code !== "Space") {
    return;
  }
  e.preventDefault();
  gameLoop.toggleState();
  gameLoopAnim.toggleState();
  updateDocumentTitle();
}
export {
  Game,
  combat,
  dispose,
  game,
  gameLoop,
  gameLoopAnim,
  init,
  notifications,
  player,
  statistics,
  world
};
