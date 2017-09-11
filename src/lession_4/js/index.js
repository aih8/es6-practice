import $ from 'jquery';
import hash from 'object-hash';

console.log({ hash });


console.log(hash({url: 'a', data:{ a: 1, b:2 }}));

console.log(hash({ url: 'b', data:{ b:2, a: 1 }}));



$(()=>{
	//it is ready ...
	console.log('it is ready ...');

	// $(document)
	// 	.ajaxStart(
	// 		function(){
	// 			console.log(arguments)
	// 		}
	// 	)
	// 	.ajaxSend(
	// 		function(){
	// 			console.log('beforeSend', arguments)
	// 		}
	// 	)
	//     .ajaxError(
	//         function(event,xhr,options,exc){
	//             console.log('error');
	//         }
	//     )
	//     .ajaxSuccess(
	//         function(event){
	//             console.log('success');
	//         }
	//     )
	//     .ajaxComplete(
	//     	function(){
	//     		console.log('ajaxComplete', arguments)
	//     	}
	//     )
	//     .ajaxStop(
	//     	function(){
	//     		console.log('ajaxStop', arguments)
	//     	}
	//     )
	//     ;

		// 1: 放弃后触发的提交
		// 2: 放弃先触发的提交
		var Ajax_Unique_Status_Arr = [1, 2];

	    var pendingRequests = {};
        $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
        	var Ajax_Unique_Status = options.unique;
        	var Ajax_Url = options.url;
        	
        	// 若无需，直接return；
        	if (Ajax_Unique_Status_Arr.indexOf(Ajax_Unique_Status) === -1) {
        		return;
        	}

            // 去重处理
            if (!pendingRequests[Ajax_Url]) {
                pendingRequests[Ajax_Url] = jqXHR;
            }else{
            	if (Ajax_Unique_Status === Ajax_Unique_Status_Arr[0]) {
            		jqXHR.abort(); 
            		console.log('abort current request , url is : ', Ajax_Url);
            	} else if (Ajax_Unique_Status === Ajax_Unique_Status_Arr[1]) {
            		pendingRequests[Ajax_Url].abort();
            		console.warn('abort last request , url is : ', Ajax_Url);
            	}
            }

            // 后期处理
            var complete = options.complete;
            options.complete = function(jqXHR, textStatus) {
                pendingRequests[Ajax_Url] = null;
                if ($.isFunction(complete)) {
                	complete.apply(this, arguments);
                }
            };
        });


        var url = 'http://www.grycheng.com/2016/01/07/%E7%AE%80%E8%BF%B0jquery-ajax%E7%9A%84%E6%89%A7%E8%A1%8C%E9%A1%BA%E5%BA%8F/';

        $.ajax({
        	url,
        	type: 'GET',
        	unique: 1
        }).then((res)=>{
        	console.log('success 1')
        }, (err)=>{
        	console.log('error 1')
        })


		$.ajax({
        	url,
        	type: 'GET',
        	unique: 1
        }).then((res)=>{
        	console.log('success 2')
        }, (err)=>{
        	console.log('error 2')
        })
	/**
	
	1.ajaxStart(全局事件)
	2.beforeSend
	3.ajaxSend(全局事件)
	4.success
	5.ajaxSuccess(全局事件)
	6.error
	7.ajaxError (全局事件)
	8.complete
	9.ajaxComplete(全局事件)
	10.ajaxStop(全局事件)

	*/

})