

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

