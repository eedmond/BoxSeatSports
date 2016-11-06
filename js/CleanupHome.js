function AddClassesToElementFamily(element)
{
	element.parents().addClass("Eric");
	element.find("*").addClass("Eric");
	element.addClass("Eric");
}

window.onload=function()
{
	var menu = $("#matchmenu");
	if (!menu.length) { return; }
	menu.append("<br></br>");
	AddClassesToElementFamily(menu);
	AddClassesToElementFamily($("#accordion"));
	
	$("*").not(".Eric").remove();
	$("a").removeAttr("onclick");
}