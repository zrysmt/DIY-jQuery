// 出口
import jQuery from './core';
import global from './global';
import init from './init';
import sizzleInit from './sizzle/init';  //新增
 
global(jQuery);
init(jQuery);
sizzleInit(jQuery);  //新增
 
export default jQuery;
