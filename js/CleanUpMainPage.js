function AddClassToElementFamily(element)
{
	element.parents().addClass("PartOfCleanView");
	element.find("*").addClass("PartOfCleanView");
	element.addClass("PartOfCleanView");
}

$(document).ready(function()
{
	$("script").remove();
	
	var menu = $("#matchmenu");
	if (!menu.length) { return; }
	menu.append("<br></br>");
	
	AddClassToElementFamily(menu);
	AddClassToElementFamily($("#accordion"));
	AddClassToElementFamily($("img[alt='FirstRowSports']"));
	AddClassToElementFamily($("link[href*='match.css'"));
	
	$("*").not(".PartOfCleanView").remove();
	$("a").removeAttr("onclick");
});
$("script").remove();