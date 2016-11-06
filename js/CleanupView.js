function RemoveAllButElementIfFound(element, name)
{
	if (!element.length) { alert("couldn't find " + name); return; }

	element.parents().addClass("Eric");
	element.find("*").addClass("Eric");
	element.addClass("Eric");
	
	$("*").not(".Eric").remove();
}

$(document).ready(function()
{
	RemoveAllButElementIfFound($("#player"), "player");
	RemoveAllButElementIfFound($("embed"), "embed");
});