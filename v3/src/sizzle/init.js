import Sizzle from './sizzle.js';

var selectorInit  = function(jQuery){
	jQuery.find = Sizzle;  // Sizzle 赋予静态接口 jQuery.find
}

export default selectorInit;