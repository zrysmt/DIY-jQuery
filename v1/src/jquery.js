//IIFE 独立作用域
    (function() {
        var version = '0.0.1';

        jQuery = function(selector) {
            return new jQuery.fn.init(selector); //jQuery实例的构造函数已经变成了 jQuery.fn.init 
        };

        /*冲突处理*/
        var _jQuery = window.jQuery,
            _$ = window.$;
        //deep 参数类型为 Boolean，若为真，表示要求连window.jQuery 变量都需要吐回去
        jQuery.noConflict = function(deep) {
            if (window.$ === jQuery) {
                window.$ = _$;
            }
            //确保window.jQuery没有再次被改写
            if (deep && window.jQuery === jQuery) {
                window.jQuery = _jQuery;
            }

            return jQuery; //返回 jQuery 接口引用
        };

        /*jQuery.fn   主要方法*/
        jQuery.fn = jQuery.prototype = {
            jquery: version,
            construct: jQuery,
            //方法
            setBackground: function(color) {
                this[0].style.background = color;
                console.warn(this);
                return this;
            },
        };

        var init = jQuery.fn.init = function(selector) {
            if (!selector) {
                return this;
            } else {
                var elem = document.querySelector(selector);
                if (elem) {
                    this[0] = elem;
                    this.length = 1;
                }
                console.info(this);
                return this;
            }
        };
        init.prototype = jQuery.prototype; //把 jQuery.fn.init 的原型指向 jQuery 的原型（jQuery.prototype / jQuery.fn）即可

        jQuery.extend = jQuery.fn.extend = function() {
            var isObject = function(obj) {
                return Object.prototype.toString.call(obj) === "[object Object]";
            };
            var isArray = function(obj) {
                return Object.prototype.toString.call(obj) === "[object Array]";
            };
            var options, i = 1,
                length = arguments.length,
                target = arguments[0] || {},
                deep = false; //默认为浅复制

            if (typeof target === "boolean") {
                deep = target;
                taeget = arguments[i] || {};
                i++;
            }
            if (typeof target !== "object" && typeof target !== "function") {
                target = {};
            }

            //target后面没有其他参数了(要拷贝的对象)，直接扩展jQuery自身，target并入jQuery
            if (i === length) {
                target = this;
                i--;
            }
            for (; i < length; i++) {
                if ((options = arguments[i]) != null) {
                    var name, clone, copy;
                    for (name in options) {
                        src = target[name]; //jQuery是否已经有该属性
                        copy = options[name];
                        if (target === copy) {
                            continue;
                        }
                        //深拷贝，且确保被拷属性为对象/数组
                        if (deep && copy && (isObject(copy) || (copyIsArray = isArray(copy)))) {
                            //被拷贝属性为数组
                            if (copyIsArray) {
                                copyIsArray = false;
                                //被合并属性
                                clone = src && isArray(src) ? src : [];
                            } else { //被拷贝属性为对象
                                clone = src && isArray(src) ? src : {};
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

        window.$ = window.jQuery = jQuery;
    })();

    //测试
    var $div = $('div');
    console.log($div);
    $div.setBackground('blue');
    console.log($div.jquery); //0.0.1
    console.log($.fn.jquery); //0.0.1
    console.log(jQuery.extend());
    console.log($.extend.jquery);
    //冲突
    /*var $$$ = jQuery.noConflict();
    $$$('div').setBackground('red');*/
    //
    jQuery.extend({
        min: function(a, b) {
            return a < b ? a : b;
        },
        max: function(a, b) {
            return a > b ? a : b;
        }

    });
    console.info(jQuery.prototype);
    console.info(jQuery);
    // console.log($().min(3,5));
    // console.log($.prototype.min(3, 5));
    console.log($.min(3, 5));