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

function CleanUpIFirstrowsportsFrame()
{
	RemoveAllButElementIfFound($("#player"));
}

function CleanUpIFirstrowEmbedFrame()
{
	RemoveAllButElementIfFound($("iframe[src*='04stream.com/ebb.php'"));
}

function CleanUp04StreamFrame()
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
	
	// Remove all click events in this frame because they usually create popups that adblock doesn't' catch
	var allElements = $("*");
	allElements.remoteAttr("click");
	allElements.removeAttr("onclick");
	
	if (videoPlayer.find("*").length === 0)
	{
		videoPlayer.bind("DOMSubtreeModified", function()
		{
			videoPlayer.parent().find(".helpText").remove();
		});
		videoPlayer.parent().append('<h1 class="helpText" style="color:white;">Looks like you need to enable Flash. Look for the puzzle piece in the top right and select "Run all plugins this time"</h1>');
	}
}

function CleanUpWizSportsFrame()
{
	RemoveAllButElementIfFound($("#frame"));
}

function CleanUpBroadcastFrame()
{
	RemoveAllButElementIfFound($("#player"));
}

function CleanUpLive9Frame()
{
	RemoveAllButElementIfFound($("#player"));
	RemoveAllButElementIfFound($("iframe[src*='sawlive.tv/embed/watch'"));
}

function JwPlayerStarted()
{
	RemoveAllButElementIfFound($("#jwplayer1"));
}

function CleanUpSawLiveFrame()
{
	// Wait for video to start, then we're free to remove everyone else
	$("#jwplayer1").bind("DOMSubtreeModified", JwPlayerStarted);
	
	// Manually fire this fellow's click event to start the video player
	$("#imgclose").trigger("click");
}

function FrameHandler(urlPortion, CleanUpFrame)
{
	this.urlPortion = urlPortion;
	this.CleanUpFrame = CleanUpFrame;
}

// Link 1
var ifirstrowMainPage = new FrameHandler("ifirstrowus.eu/watch", CleanUpIFirstrowsportsFrame);
var ifirstrowEmbed = new FrameHandler("firstrowas.co/embed", CleanUpIFirstrowEmbedFrame);
var _04StreamFrame = new FrameHandler("04stream.com/ebb.php", CleanUp04StreamFrame);

// Link 2
var live9Frame = new FrameHandler("live9.net", CleanUpLive9Frame);
var sawliveFrame = new FrameHandler("sawlive.tv/embed/watch", CleanUpSawLiveFrame);

// Obscure links
var wizhdFrame = new FrameHandler("wizhdsports.be", CleanUpWizSportsFrame);
var broadcastFrame = new FrameHandler("bro.adca.st/stream.php", CleanUpBroadcastFrame);

var frameHandlers =
{
	ifirstrowMainPage, ifirstrowEmbed, _04StreamFrame,
	live9Frame, sawliveFrame,
	wizhdFrame, broadcastFrame
};

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