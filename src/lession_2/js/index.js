

let mergeSort = (arr) => {
	let length = arr.length;
	if (length <= 1) {
		return arr;
	}
	let middle = arr.splice(Math.floor(length / 2), 1);
	let left = [], right = [], middleValue = middle[0];

	arr.forEach((v, i)=>{
		if (v < middleValue) {
			left.push(v);
		} else {
			right.push(v);
		}
	})

	console.log(left, middle, right);

	return mergeSort(left).concat(middle, mergeSort(right));

}

let sortArr = mergeSort([5,3,1,6,4,0,6,8,7]);
console.log(sortArr);

async function mergeSortAsync (arr) {
	if (arr instanceof Array){
		return await mergeSort(arr);
	} else {
	 throw Error('参数数据格式不正确，期望值为数组。。。');
	}
	
}
//1
console.log('11111111');

mergeSortAsync([3, 1, 2, 8, 5, 6, 9, 0]).then((res)=>{
	//5.
	console.log('done', res);
}, (err)=>{
	console.log('error', err)
});

//2
console.log(2222222222)

mergeSortAsync(3).then((res)=>{
	console.log('done', res);
}, (err)=>{
	//4.
	console.log('error', err)
});

//3
console.log(333333333)

