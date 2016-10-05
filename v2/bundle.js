(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.jQuery = factory());
}(this, (function () { 'use strict';

var class2type = {}; //在core.js中会被赋予各类型属性值

var toString = class2type.toString; //等同于 Object.prototype.toString

var getProto = Object.getPrototypeOf;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString; //等同于 Object.toString/Function.toString

var ObjectFunctionString = fnToString.call(Object); //顶层Object构造函数字符串"function Object() { [native code] }"，用于判断 plainObj

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var version = "0.0.1";
var jQuery$1 = function jQuery$1(selector, context) {

    return new jQuery$1.fn.init(selector, context);
};

jQuery$1.fn = jQuery$1.prototype = {
    jquery: version,
    constructor: jQuery$1,
    setBackground: function setBackground() {
        this[0].style.background = 'yellow';
        return this;
    },
    setColor: function setColor() {
        this[0].style.color = 'blue';
        return this;
    }
};

//新增修改点1，class2type注入各JS类型键值对，配合 jQuery.type 使用，后面会用上
"Boolean Number String Function Array Date RegExp Object Error Symbol".split(" ").forEach(function (name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
});

jQuery$1.extend = jQuery$1.fn.extend = function () {
    /*var isObject = function(obj) {
        return Object.prototype.toString.call(obj) === "[object Object]";
    };*/
    var isArray = function isArray(obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
    };
    var name,
        clone,
        copy,
        src,
        copyIsArray,
        options,
        i = 1,
        length = arguments.length,
        target = arguments[0] || {},
        deep = false; //默认为浅复制

    if (typeof target === "boolean") {
        deep = target;
        target = arguments[i] || {};
        i++;
    }
    if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== "object" && !jQuery$1.isFunction(target)) {
        //修改1
        target = {};
    }

    //target后面没有其他参数了(要拷贝的对象)，直接扩展jQuery自身，target并入jQuery
    if (i === length) {
        target = this;
        i--;
    }
    for (; i < length; i++) {
        if ((options = arguments[i]) != null) {
            for (name in options) {
                src = target[name]; //jQuery是否已经有该属性
                copy = options[name];
                if (target === copy) {
                    continue;
                }
                //深拷贝，且确保被拷属性为对象/数组
                if (deep && copy && jQuery$1.isPlainObject(copy) || (copyIsArray = isArray(copy))) {
                    //修改2
                    //被拷贝属性为数组
                    if (copyIsArray) {
                        copyIsArray = false;
                        //被合并属性
                        clone = src && isArray(src) ? src : []; //修改3
                    } else {
                        //被拷贝属性为对象
                        clone = src && jQuery$1.isPlainObject(src) ? src : {}; //修改4
                    }
                    //右侧递归，直到内部属性值是非对象
                    target[name] = jQuery$1.extend(deep, clone, copy);
                } else if (copy !== undefined) {
                    //非对象/数组，或者浅复制的情况
                    target[name] = copy; //递归结束
                }
            }
        }
    }

    //返回修改后的target

    return target;
};

//新增修改点2
jQuery$1.extend({
    isArray: Array.isArray,
    isPainObject: function isPainObject(obj) {
        var proto, Ctor;

        if (!obj || toString.call(obj) !== "[object Object]") {
            return false;
        }

        proto = getProto(obj);
        // 通过 Object.create( null ) 形式创建的 {} 是没有prototype的
        if (!proto) {
            return true;
        }

        //简单对象的构造函数等于最顶层Object构造
        Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
        return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
    },

    type: function type(obj) {
        if (obj == null) {
            //不能用 === 
            return obj + ""; //undefined or null
        }

        return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
    }

});

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var global = function global(jQuery) {
    //走模块化形式的直接绕过
    if ((typeof exports === 'undefined' ? 'undefined' : _typeof$1(exports)) === 'object' && typeof module !== 'undefined') return;

    var _jQuery = window.jQuery,
        _$ = window.$;

    jQuery.noConflict = function (deep) {
        //确保window.$没有再次被改写
        if (window.$ === jQuery) {
            window.$ = _$;
        }

        //确保window.jQuery没有再次被改写
        if (deep && window.jQuery === jQuery) {
            window.jQuery = _jQuery;
        }

        return jQuery; //返回 jQuery 接口引用
    };

    window.jQuery = window.$ = jQuery;
};

var init = function init(jQuery) {
    jQuery.fn.init = function (selector, context, root) {
        if (!selector) {
            return this;
        } else {
            var elem = document.querySelector(selector);
            if (elem) {
                this[0] = elem;
                this.length = 1;
            }
            return this;
        }
    };

    jQuery.fn.init.prototype = jQuery.fn;
};

// 出口
global(jQuery$1);
init(jQuery$1);

return jQuery$1;

})));
