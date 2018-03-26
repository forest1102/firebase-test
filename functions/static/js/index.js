$(function ()
{
	console.log('start jquery, Hey')
	var IRCodeList=$('#IRCodeList')
	var TAG={
		memo_no:$('#memo_no'),
		name:   $('#name'),
		remoconBtn:$('.remocon-btn')

	}
	$.ajax({
		url:'https://morita.website/ir/codes'
	})
		.done(function(codes){
			for(let k in codes){
				if(codes.hasOwnProperty(k)){
					makeIRCodeli(k,codes[k])
				}
			}
		})			
	$('#addIRCode')
		.on('submit', function (e)
		{
			e.preventDefault()
			// console.log(TAG.name.val())
			// console.log('clicked ircode')

			$.ajax(
				{
					url: 'https://morita.website/ir/addcode-from/'+TAG.memo_no.val(),
					type: 'POST',
					data:
					{
						phrase: TAG.name.val(),
					}
				})
				.done(function (d)
				{
					makeIRCodeli(d.phrase,d.code)
					// console.log(d)
				})
		})
		
		
	TAG.remoconBtn
		.click(function(e){
			e.preventDefault()
			var phrase=$(this).val()
			// console.log($(this))
			// console.log(phrase)
			$.ajax({
				url:'https://morita.website/ir/code',
				type:'POST',
				data:{
					'phrase':phrase
				}
			})
			.done(function(d){
				// console.log(d);
			})
		})
		
	function makeIRCodeli(name,code){
		var IRli = $('<li><button type="button" class="btn btn-info">' + name+ '</button></li>')

		$('button', IRli)
			.click(
				function (event)
				{
					event.preventDefault()
					$.ajax(
						{
							url: 'https://morita.website/ir/code',
							type: 'POST',
							data:
							{
								'code': code
							}
						})
						.done(function (data)
						{
							// console.log(data)
						})
				})
		IRCodeList
			.append(IRli)
	}
	
})
