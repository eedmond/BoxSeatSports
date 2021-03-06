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
	
	// The Title of the page
	AddClassToElementFamily($("img[alt='FirstRowSports']"));
	
	// Sports selector
	AddClassToElementFamily(menu);
	
	// Events selector
	AddClassToElementFamily($("#accordion"));
	
	// CSS for the images in the sports selector
	AddClassToElementFamily($("link[href*='match.css'"));
	
	// Get rid of everything we don't approve of
	$("*").not(".PartOfCleanView").remove();
	
	// These are typically the "Watch in HD" links that are total bull crap
	$("a[href*='downloadplayer'").remove();
	
	// Get rid of all popup behavior, this doesn't work
	// perfectly, needs to be improved
	$("a").removeAttr("click");
	$("a").removeAttr("onclick");
	$("a").removeAttr("onmouseenter");
});
$("script").remove();