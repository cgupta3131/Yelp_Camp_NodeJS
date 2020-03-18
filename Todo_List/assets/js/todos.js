//Check off Specific Todos by Clicking
$("ul").on("click","li", function(){ //this means that when a li is clicked inside a ul 										run this code
	$(this).toggleClass("completed");
});

//Click on X to delete Todo
$("ul").on("click","span", function(event){
	$(this).parent().fadeOut('1000', function() { //here this refers to span
		$(this).remove(); //here this refers to li and not span
	});

	event.stopPropagation(); //to be stop bubbling up!
});

$("input").on("keypress", function(event){
	if(event.which === 13){ //enter key is 
		var todoText = $(this).val();
		if(todoText.trim().length !== 0){ //empty string
			$("ul").append("<li><span><i class=\"fa fa-trash\"></i></span> " + todoText + "</li>");
		}
		$(this).val("");
	}
});

$(".fa-plus").on("click", function(){
	$("input").fadeToggle();
});