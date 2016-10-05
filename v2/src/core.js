import { class2type, toString, getProto, hasOwn, fnToString, ObjectFunctionString } from './util.js';

var version = "0.0.1",
    jQuery = function(selector, context) {

        return new jQuery.fn.init(selector, context);
    };

jQuery.fn = jQuery.prototype = {
    jquery: version,
    constructor: jQuery,
    setBackground: function() {
        this[0].style.background = 'yellow';
        return this;
    },
    setColor: function() {
        this[0].style.color = 'blue';
        return this;
    }
};

jQuery.extend = jQuery.fn.extend = function() {
    /*var isObject = function(obj) {
        return Object.prototype.toString.call(obj) === "[object Object]";
    };
     var isArray = function(obj) {
         return Object.prototype.toString.call(obj) === "[object Array]";
     };*/
    var name, clone, copy, src, copyIsArray, options, i = 1,
        length = arguments.length,
        target = arguments[0] || {},
        deep = false; //默认为浅复制

    if (typeof target === "boolean") {
        deep = target;
        target = arguments[i] || {};
        i++;
    }
    if (typeof target !== "object" && !jQuery.isFunction(target)) { //修改1
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
                if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) { //修改2
                    //被拷贝属性为数组
                    if (copyIsArray) {
                        copyIsArray = false;
                        //被合并属性
                        clone = src && jQuery.isArray(src) ? src : []; //修改3
                    } else { //被拷贝属性为对象
                        clone = src && jQuery.isPlainObject(src) ? src : {}; //修改4
                    }
                    //右侧递归，直到内部属性值是非对象
                    target[name] = jQuery.extend(deep, clone, copy);
                } else if (copy !== undefined) { //非对象/数组，或者浅复制的情况
                    target[name] = copy; //递归结束
                }
            }
        }
    }

    //返回修改后的target

    return target;

};
//新增修改点1，class2type注入各JS类型键值对，配合 jQuery.type 使用，后面会用上
"Boolean Number String Function Array Date RegExp Object Error Symbol".split(" ").forEach(function(name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
});
//新增修改点2
jQuery.extend({
    isArray: Array.isArray || function( obj ) {
        return jQuery.type(obj) === "array";
    },
    isFunction: function( obj ) {
        return jQuery.type(obj) === "function";
    },
    isPainObject: function(obj) {
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

    type: function(obj) {
        if (obj == null) { //不能用 === 
            return obj + ""; //undefined or null
        }

        return typeof obj === "object" || typeof obj === "function" ?
            //兼容安卓2.3- 函数表达式类型不正确情况
            class2type[toString.call(obj)] || "object" :
            typeof obj;
    }


});

export default jQuery;
