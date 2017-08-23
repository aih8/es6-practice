import $ from 'jquery';

console.log(' js file is done ... ', this, window);

(() => {
    let a = 5;
    console.log('a : ', a, this)
})();

console.log(new Set([1, 4, 5, 1, 4, 5]))