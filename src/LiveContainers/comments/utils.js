/**
 * @desc 函数防抖
 * @param {需要防抖的函数} func
 * @param {延迟时间} wait
 */
export function debounce(func, wait = 500) {
    // 缓存一个定时器id
    let timer = 0;
    // 这里返回的函数是每次用户实际调用的防抖函数
    // 如果已经设定过定时器了就清空上一次的定时器
    // 开始一个新的定时器，延迟执行用户传入的方法
    return function (...args) {
    	if (timer) clearTimeout(timer)
    	timer = setTimeout(() => {
    		func.apply(this, args)
    	}, wait)
    }
}

/**
 * @desc 是否滚到到容器底部
 * @param {滚动容器} ele 
 * @param {容器高度} wrapHeight 
 */
export function isScrollBottom(ele, wrapHeight, threshold = 60) {
    const h1 = ele.scrollHeight - ele.scrollTop;
    const h2 = wrapHeight + threshold;
    const isBottom = h1 <= h2;
    return isBottom;
}