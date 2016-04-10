$(document).ready(function(){
  console.log('Link the Fire, O Chosen Undead.');
  $("#vacuumSeal").click(vacuumPack);
  $("#loadImage").click(loadImage);
  $("#nameFrame").click(nameFrame);
  $("#frameContentResize").click(enableContentResize);
  $("#frameContentResizeLock").click(disableContentResize);
  $("#frameContentDrag").click(enableContentDrag);
  $("#frameContentLock").click(disableContentDrag);
  $(".createFrame").click(createFrame);
  $("#deleteFrame").click(deleteFrame);
  $("#frameSelect").on('change', frameSelect);
  $("#gridButton").click(snapToGrid);
  $("#unlockButton").click(enableFrameDrag);
  $("#lockButton").click(disableFrameDrag);
  $("#generateHTML").click(generateHTML);
  $("#formSubmit").click(saveDisplay);
  $("#borderWidth").click(setBorderWidth);
  $("#borderColor").click(setBorderColor);
  $("#frameToolsButton").click(showFrameTools); $("#selectionToolsButton").click(showSelectionTools);
  $("#displayToolsButton").click(showDisplayTools);
  $("#backgroundColor").click(setBackgroundColor);
  $("#copyButton").click(copyToClipboard);
  $("#linkFrame").click(addLinkToFrame);
  $("#frameResize").click(enableFrameResize);
  $("#frameResizeLock").click(disableFrameResize);
  $("#constrainProportions").click(constrainProportions);
  appInitialization();
  prepLoadedDisplay();
});

var frameCount = 0;
var gridIncrement = 0;
var frameContentDragLocked;
var frameContentResizeLocked;
var borderWidthInitialized;
var borderColorInitialized;
var backgroundColorInitialized;
var lockProportions = false;
var noFrames = true;

//http://stackoverflow.com/questions/1144783/replacing-all-occurrences-of-a-string-in-javascript

function replaceAll(str, find, replace){
  return str.replace(new RegExp(find, 'g'), replace);
};

function appInitialization(){
  showFrameTools();
  $("#controlPanel").draggable();
  $("#controlPanel").attr("style", "left: 450px; top: 100px;")
  $("#unlockButton").hide();
  $("#frameResize").hide();
  $("#frameContentLock").hide();
  $("#frameContentResizeLock").hide();
};

function copyToClipboard(){
  try {
    $("#HTMLBox").select();
    document.execCommand('copy');
    window.alert("Copied to clipboard!");
  } catch(e){
    window.alert("Copy failed! Please highlight and copy the contents of the text field manually.")
  }
};

function showFrameTools(){
  $("#selectionTools").hide();
  $("#displayTools").hide();
  $("#frameTools").show();
};

function showDisplayTools(){
  $("#selectionTools").hide();
  $("#frameTools").hide();
  $("#displayTools").show();
};

function showSelectionTools(){
  $("#selectionTools").show();
  $("#displayTools").hide();
  $("#frameTools").hide();
};

function saveDisplay(){
  $(".frame").removeClass("selectedFrame");
  $("#display_html_string").val($("#container").prop('outerHTML'));
  $("#new_display").submit();
  $(".edit_display").submit();
};

function prepLoadedDisplay(){
  if ($(".frame").length > 0){
    noFrames = false;
  } else {
    $("#container").prop("style").minHeight = "500px";
  };
  createBottomMargin();
  $("#container").prop("style").backgroundColor = $("#display_background_color").val();
  for(var i = 0; i < $(".frame").length; i++){
    $("#frameSelect").append("<option id=option"+$(".frame")[i].id.split("frame")[1]+" value="+$(".frame")[i].id.split("frame")[1]+">Frame "+(frameCount+1)+"</option>");
    var frameNumber = $("#frameSelect").children()[i].value;
    $("#frame"+frameNumber).draggable({drag:function(event, ui){createBottomMargin()}});
    $("#frame"+frameNumber).resizable();
    $("#frame"+frameNumber).resizable("destroy");
    $("#frame"+frameNumber).resizable();
    //eww
    frameCount++;
  };
  var y = $("#display_frame_names").val().split(',');
  $("#frameSelect").children().each(function(ind,el){for(var i = 0; i < y.length; i++){if (y[i].includes(el.value)){el.text=y[i].split(el.value)[1]}}});
};

function roundOff(position, grid){
  var remainder = position % grid;
  var afterSnap = position - remainder;
  if (((afterSnap + grid) - position) < (position - afterSnap)){
    return (afterSnap + grid);
  } else {
    return afterSnap;
  }
};

function constrainProportions(){
  $("#container").prop("style").height = ($("#displayHeight").val()+"px");
  $("#container").prop("style").minHeight = '';
  $("#container").prop("style").width = ($("#displayWidth").val()+"px");
  $("#displayWidth").val('');
  $("#displayHeight").val('');
  lockProportions = true;
};

function snapToGrid(){
  gridIncrement = $("#gridInput").val();
  $(".frame").each(normalizeSnap);
  $(".frame").draggable( "option", "grid", [$("#gridInput").val(), $("#gridInput").val()]);
  $("#gridInput").val('');
};

function normalizeSnap(ind, el){
  el.style.top = roundOff(el.style.top.split('px')[0], parseInt(gridIncrement))+'px';
  el.style.left = roundOff(el.style.left.split('px')[0], parseInt(gridIncrement))+'px';
};

function setBorderWidth(ind, el){
  if (borderWidthInitialized){
    $(".frame").each(function(ind,el){el.style["border-width"]=$("#borderWidthInput").val()+"px"});
    $("#borderWidthInput").val('');
  } else {
    $("#frameSelect").children().each(function(ind, el){var x = $("#frame"+el.id.split("option")[1]).attr("style"); $("#frame"+el.id.split("option")[1]).attr("style", x+" border-width:"+$("#borderWidthInput").val()+"px")});
    borderWidthInitialized = true;
    $("#borderWidthInput").val('');
  }
};

function setBorderColor(ind, el){
  if (borderColorInitialized){
    $(".frame").each(function(ind,el){el.style["border-color"]="#"+$("#borderColorInput").val()});
  } else {
    $("#frameSelect").children().each(function(ind, el){var x = $("#frame"+el.id.split("option")[1]).attr("style"); $("#frame"+el.id.split("option")[1]).attr("style", x+" border-color:#"+$(".jscolor").val())});
    borderColorInitialized = true;
  }
};

function setBackgroundColor(){
  document.getElementById("container").style.backgroundColor = "#"+$("#backgroundColorInput").val();
  $("#display_background_color").val("#"+$("#backgroundColorInput").val());
  backgroundColorInitialized = true;
};

function vacuumPack(){
  $("#frame"+($("#frameSelect").val())).width($("#frameImage"+($("#frameSelect").val())).width()+"px");
  $("#frame"+($("#frameSelect").val())).height($("#frameImage"+($("#frameSelect").val())).height()+"px");
  $("#frameSelect").val('');
};

function trimHTML(){
  // document.body.style.minHeight = '';
  $(".frame").removeClass("selectedFrame");
  $(".frame").draggable("destroy");
  $(".frame").resizable("destroy");
  $(".ui-wrapper").resizable("destroy");
  $(".frameContent").draggable("destroy");
};

function loadImage(){
  if ($("#frameSelect").val()){
    $("#frame"+($("#frameSelect").val())).append("<div class=frameContent><img id=frameImage"+($("#frameSelect").val())+" src="+($("#imgInput").val())+"></div>")
    $("#imgInput").val('');
    $("#frameSelect").val('');
  } else {
    window.alert("You must select a frame to place your image inside.");
  }
};

function addLinkToFrame(){
  if ($("#frameSelect").val()){
    if ($("#frame"+$("#frameSelect").val()).hasClass("linked")){
      $("#frame"+$("#frameSelect").val()).parent().attr("href", $("#linkInput").val());
      $("#frameSelect").val('');
      $(".frame").removeClass("selectedFrame");
      $("#linkInput").val('');
    } else {
      $("#frame"+$("#frameSelect").val()).wrap("<a href="+$("#linkInput").val()+"></a>");
      $("#frame"+$("#frameSelect").val()).addClass("linked");
      $("#frameSelect").val('');
      $(".frame").removeClass("selectedFrame");
      $("#linkInput").val('');
    }
  } else {
    window.alert("You must select a frame to add a hyperlink.")
  }
};

function nameFrame(){
  if ($("#frameSelect").val()){
    $("#option"+$("#frameSelect").val()).text($("#frameName").val());
    $("#display_frame_names").val().split(',').map(function(el, ind){
      var splitArray = $("#display_frame_names").val().split(','); if(el.includes($("#frameSelect").val())){
        splitArray.splice(ind, 1, $("#frameSelect").val()+$("#frameName").val()); $("#display_frame_names").val(splitArray.join(','))
      }
    });
    $("#frameName").val('');
    $("#frameSelect").val('');
    $(".frame").removeClass("selectedFrame");
  } else {
    window.alert("You must select a frame to rename.")
  }
};

function enableContentResize(){
  if (frameContentResizeLocked){
    frameContentResizeLocked = false;
    $("#frameContentResize").hide();
    $("#frameContentResizeLock").show();
    $(".frameContent").children(["<img>"]).resizable("enable")
    $("#imageResizeLockIndicator").text("Unlocked");
  } else {
    frameContentResizeLocked = false;
    $("#frameContentResize").hide();
    $("#frameContentResizeLock").show();
    $(".frameContent").children(["<img>"]).resizable({
      aspectRatio:true
    });
    $("#imageResizeLockIndicator").text("Unlocked");
  }
};

function disableContentResize(){
  if (frameContentResizeLocked == false){
    frameContentResizeLocked = true;
    $("#frameContentResize").show();
    $("#frameContentResizeLock").hide();
    $(".frameContent").children(["<img>"]).resizable({
      disabled:true
    });
    $("#imageResizeLockIndicator").text("Locked");
  }
};

function enableContentDrag(){
  if (frameContentDragLocked){
    frameContentDragLocked = false;
    $(".frameContent").draggable("enable");
    $("#frameContentDrag").hide();
    $("#frameContentLock").show();
    $("#imageLockIndicator").text("Unlocked");
  } else {
    frameContentDragLocked = false;
    $(".frameContent").draggable();
    $("#frameContentDrag").hide();
    $("#frameContentLock").show();
    $("#imageLockIndicator").text("Unlocked");
  }
};

function disableContentDrag(){
  if (frameContentDragLocked == false){
    frameContentDragLocked = true;
    $("#frameContentLock").hide();
    $("#frameContentDrag").show();
    $(".frameContent").draggable({
      disabled:true
    });
    $("#imageLockIndicator").text("Locked");
  }
};

function createFrame(){
  if (noFrames){
    $("#container").append("<div id=frame0 style=height:100px;width:100px; class=frame></div>");
    noFrames = false;
    $("#frame0").draggable({drag:function(event, ui){createBottomMargin()}});
    $("#frame0").resizable();
    $("#frameSelect").append("<option id=option0 value=0>Frame "+(frameCount+1)+"</option>");
  } else{
    $("#container").append("<div id=frame"+(parseInt($("#frameSelect").children().last().val())+1)+" style=height:100px;width:100px; class=frame></div>");
    $("#frame"+(parseInt($("#frameSelect").children().last().val())+1)).draggable({drag:function(event, ui){createBottomMargin()}});
    $("#frame"+(parseInt($("#frameSelect").children().last().val())+1)).resizable();
    $("#frameSelect").append("<option id=option"+(parseInt($("#frameSelect").children().last().val())+1)+" value="+(parseInt($("#frameSelect").children().last().val())+1)+">Frame "+(frameCount+1)+"</option>");
  };
  frameCount++;
};

function deleteFrame(){
  $("#frame"+($("#frameSelect").val())).remove();
  $("#option"+($("#frameSelect").val())).remove();
};

function frameSelect(){
  $(".frame").removeClass("selectedFrame");
  $("#frame"+($("#frameSelect").val()[0])).attr("class", $("#frame"+($("#frameSelect").val()[0])).attr("class")+" selectedFrame");
};

function enableFrameDrag(){
  $(".frame").draggable("enable");
  $("#unlockButton").hide();
  $("#lockButton").show();
  $("#frameLockIndicator").text("Unlocked");
};


function disableFrameDrag(){
  $("#unlockButton").show();
  $("#lockButton").hide();
  $(".frame").draggable({
    disabled: true
  });
  $("#frameLockIndicator").text("Locked");
};

function enableFrameResize(){
  $(".frame").resizable("enable");
  $("#frameResizeLock").show();
  $("#frameResize").hide();
  $("#frameResizeLockIndicator").text("Unlocked");
};

function disableFrameResize(){
  $(".frame").resizable("disable");
  $("#frameResizeLock").hide();
  $("#frameResize").show();
  $("#frameResizeLockIndicator").text("Locked");
};

function generateHTML(){
  try {
    trimHTML();
    $("#container div").removeAttr("id");
    $(".frameContent").removeAttr("class");
    $("img").removeAttr("id");
    var reduction;
    if (lockProportions && backgroundColorInitialized){
      reduction = '<!DOCTYPE html><html><head><meta charset="utf-8"><title></title><style>#container {position: relative;}.frame {position: absolute;overflow: hidden;}</style></head><body><div id="container" style="background-color: '+document.getElementById("container").style.backgroundColor+'; height:'+$("#container").prop("style").height+'; width:'+$("#container").prop("style").width+'">'+$("#container")[0].innerHTML+'</div></body></html>';
    } else if (backgroundColorInitialized){
      reduction = '<!DOCTYPE html><html><head><meta charset="utf-8"><title></title><style>#container {position: relative;}.frame {position: absolute;overflow: hidden;}</style></head><body><div id="container" style="background-color: '+document.getElementById("container").style.backgroundColor+'; height:'+(parseInt($("#container").prop("style").minHeight) - 250)+'px";>'+$("#container")[0].innerHTML+'</div></body></html>';
    } else if (lockProportions){
      reduction = '<!DOCTYPE html><html><head><meta charset="utf-8"><title></title><style>#container {position: relative;}.frame {position: absolute;overflow: hidden;}</style></head><body><div id="container" style="height:'+$("#container").prop("style").height+'; width:'+$("#container").prop("style").width+'">'+$("#container")[0].innerHTML+'</div></body></html>';
    } else {
      reduction = '<!DOCTYPE html><html><head><meta charset="utf-8"><title></title><style>#container {position: relative;}.frame {position: absolute;overflow: hidden;}</style></head><body><div id="container" style="height:'+(parseInt($("#container").prop("style").minHeight) - 250)+'px";>'+$("#container")[0].innerHTML+'</div></body></html>';
    };
    var firstRender = replaceAll(reduction, '>', '&gt;');
    var secondRender = replaceAll(firstRender, '<', '&lt;');
    $("#HTMLBox").text('');
    $("#HTMLBox").append(secondRender);
  } catch(e) {
    $("#container div").removeAttr("id");
    $(".frameContent").removeAttr("class");
    $("img").removeAttr("id");
    var reduction;
    if (lockProportions && backgroundColorInitialized){
      reduction = '<!DOCTYPE html><html><head><meta charset="utf-8"><title></title><style>#container {position: relative;}.frame {position: absolute;overflow: hidden;}</style></head><body><div id="container" style="background-color: '+document.getElementById("container").style.backgroundColor+'; height:'+$("#container").prop("style").height+'; width:'+$("#container").prop("style").width+'">'+$("#container")[0].innerHTML+'</div></body></html>';
    } else if (backgroundColorInitialized){
      reduction = '<!DOCTYPE html><html><head><meta charset="utf-8"><title></title><style>#container {position: relative;}.frame {position: absolute;overflow: hidden;}</style></head><body><div id="container" style="background-color: '+document.getElementById("container").style.backgroundColor+'; height:'+(parseInt($("#container").prop("style").minHeight) - 250)+'px";>'+$("#container")[0].innerHTML+'</div></body></html>';
    } else if (lockProportions){
      reduction = '<!DOCTYPE html><html><head><meta charset="utf-8"><title></title><style>#container {position: relative;}.frame {position: absolute;overflow: hidden;}</style></head><body><div id="container" style="height:'+$("#container").prop("style").height+'; width:'+$("#container").prop("style").width+'">'+$("#container")[0].innerHTML+'</div></body></html>';
    } else {
      reduction = '<!DOCTYPE html><html><head><meta charset="utf-8"><title></title><style>#container {position: relative;}.frame {position: absolute;overflow: hidden;}</style></head><body><div id="container" style="height:'+(parseInt($("#container").prop("style").minHeight) - 250)+'px";>'+$("#container")[0].innerHTML+'</div></body></html>';
    };
    var firstRender = replaceAll(reduction, '>', '&gt;');
    var secondRender = replaceAll(firstRender, '<', '&lt;');
    $("#HTMLBox").text('');
    $("#HTMLBox").append(secondRender);
  };
};

//Weird viewport stuff starts here

function createBottomMargin(){
  if (lockProportions == false){
    document.getElementById("container").style.minHeight = (findFrameBottomLocations()-100)+"px";
  };
};

function findFrameBottomLocations(){
  var frameBottomLocations = [];
  $(".frame").each(function(ind,el){frameBottomLocations.push($(this).offset().top + (parseInt(el.style.height.split("px")[0])))});
  return getMaxOfArray(frameBottomLocations);
};

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
};
