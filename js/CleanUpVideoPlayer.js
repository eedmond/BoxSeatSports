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

function CleanupIFirstrowsportsFrame()
{
	RemoveAllButElementIfFound($("#player"));
}

function CleanupIFirstrowEmbedFrame()
{
	RemoveAllButElementIfFound($("iframe[src*='04stream.com/ebb.php'"));
}

function Cleanup04StreamFrame()
{
	var videoPlayer = $("#div1");
	
	if (!videoPlayer.length) { return; }
	
	// Don't remove these objects because they provide scripts
	// for the video player to run correctly
	$.each(videoPlayer.siblings("object"), function()
	{
		$(this).addClass("PartOfCleanView");
		$(this).find("*").addClass("PartOfCleanView");
	});
	
	RemoveAllButElementIfFound(videoPlayer);
}

function FrameHandler(urlPortion, CleanUpFrame)
{
	this.urlPortion = urlPortion;
	this.CleanUpFrame = CleanUpFrame;
}

var ifirstrowMainPage = new FrameHandler("ifirstrowus.eu/watch", CleanupIFirstrowsportsFrame);
var ifirstrowEmbed = new FrameHandler("firstrowas.co/embed", CleanupIFirstrowEmbedFrame);
var _04StreamFrame = new FrameHandler("04stream.com/ebb.php", Cleanup04StreamFrame);

var frameHandlers = {ifirstrowMainPage, ifirstrowEmbed, _04StreamFrame};

function UrlContainsSubstring(substring)
{
	return window.location.href.indexOf(substring) > -1;
}

$(document).ready(function()
{
	$("script").remove();
	
	$.each(frameHandlers, function(i, frame)
	{
		if (UrlContainsSubstring(frame.urlPortion))
		{
			frame.CleanUpFrame();
		}
	});
	
	// Remove the possibility for any popups
	$("*").removeAttr("onclick");
});

$("script").remove();