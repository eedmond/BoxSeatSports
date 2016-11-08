function AddClassToElementFamily(element)
{
	element.parents().addClass("PartOfCleanView");
	element.find("*").addClass("PartOfCleanView");
	element.addClass("PartOfCleanView");
}

function RemoveAllButElementIfFound(element)
{
	if (!element.length) { return; }
	
	AddClassToElementFamily(element);
	
	$("*").not(".PartOfCleanView").remove();
}

function CleanupVideoPlayerIfFound(element)
{
	if (!element.length) { return; }
	
	AddClassToElementFamily(element);
	
	$.each(element.siblings("object"), function()
	{
		$(this).addClass("PartOfCleanView");
		$(this).find("*").addClass("PartOfCleanView");
	});
	
	$("*").not(".PartOfCleanView").remove();
}

function CleanupMainPageIfFound(element)
{
	if (!element.length) { return; }
	
	AddClassToElementFamily(element);
	
	$("*").not(".PartOfCleanView").remove();
}

$(document).ready(function()
{
	$("script").remove();
	
	CleanupMainPageIfFound($("#player"));
	RemoveAllButElementIfFound($("iframe[src*='04stream.com/ebb.php'"), "iframe");
	CleanupVideoPlayerIfFound($("#div1"));
	
	$("*").removeAttr("onclick");
});

$("script").remove();