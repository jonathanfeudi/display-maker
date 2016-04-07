$(document).ready(function(){
  console.log('Link the Fire, O Chosen Undead.');
  $("#vacuumSeal").click(vacuumPack);
  $("#loadImage").click(loadImage);
  $("#nameFrame").click(nameFrame);
  $("#frameContentResize").click(enableContentResize);
  $("#frameContentResizeLock").click(disableContentResize);
  $("#frameContentDrag").click(enableContentDrag);
  $("#frameContentLock").click(disableContentDrag);
  $("#createFrame").click(createFrame);
  $("#deleteFrame").click(deleteFrame);
  $("#frameSelect").on('change', frameSelect);
  $("#gridButton").click(snapToGrid);
  $("#unlockButton").click(enableFrameDrag);
  $("#lockButton").click(disableFrameDrag);
  $("#generateHTML").click(generateHTML);
  $("#formSubmit").click(saveDisplay);
  $("#borderWidth").click(setBorderWidth);
  $("#borderColor").click(setBorderColor);
  prepLoadedDisplay();
});

var frameCount = 0;
var gridIncrement = 0;
var frameContentDragLocked;
var frameContentResizeLocked;
var borderWidthInitialized;
var borderColorInitialized;

//http://stackoverflow.com/questions/1144783/replacing-all-occurrences-of-a-string-in-javascript

function replaceAll(str, find, replace){
  return str.replace(new RegExp(find, 'g'), replace);
};

function saveDisplay(){
  $(".frame").removeClass("selectedFrame");
  $("#display_html_string").val($("#container").prop('outerHTML'));
  $("#new_display").submit();
  $(".edit_display").submit();
};

function prepLoadedDisplay(){
  for(var i = 0; i < $(".frame").length; i++){
    $("#frame"+i).draggable();
    $("#frame"+i).resizable();
    $("#frame"+i).resizable("destroy");
    $("#frame"+i).resizable();
    $("#frameSelect").append("<option id=option"+$(".frame")[i].id.split("frame")[1]+" value="+$(".frame")[i].id.split("frame")[1]+">Frame "+(frameCount+1)+"</option>");
    frameCount++;
  }
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
    $(".frame").each(function(ind,el){el.style["border-color"]="#"+$(".jscolor").val()});
  } else {
    $("#frameSelect").children().each(function(ind, el){var x = $("#frame"+el.id.split("option")[1]).attr("style"); $("#frame"+el.id.split("option")[1]).attr("style", x+" border-color:#"+$(".jscolor").val())});
    borderColorInitialized = true;
  }
};

function vacuumPack(){
  $("#frame"+($("#frameSelect").val())).width($("#frameImage"+($("#frameSelect").val())).width()+"px");
  $("#frame"+($("#frameSelect").val())).height($("#frameImage"+($("#frameSelect").val())).height()+"px");
};

function trimHTML(){
  $(".frame").removeClass("selectedFrame");
  $(".frame").draggable("destroy");
  $(".frame").resizable("destroy");
  $(".ui-wrapper").resizable("destroy");
  $(".frameContent").draggable("destroy");
};

function loadImage(){
  $("#frame"+($("#frameSelect").val())).append("<div class=frameContent><img id=frameImage"+($("#frameSelect").val())+" src="+($("#imgInput").val())+"></div>")
  $("#imgInput").val('');
};

function nameFrame(){
  $("#option"+$("#frameSelect").val()).text($("#frameName").val());
};

function enableContentResize(){
  if (frameContentResizeLocked){
    frameContentResizeLocked = false;
    $(".frameContent").children(["<img>"]).resizable("enable")
  } else {
    frameContentResizeLocked = false;
    $(".frameContent").children(["<img>"]).resizable({
      aspectRatio:true
    })
  }
};

function disableContentResize(){
  if (frameContentResizeLocked == false){
    frameContentResizeLocked = true;
    $(".frameContent").children(["<img>"]).resizable({
      disabled:true
    })
  }
};

function enableContentDrag(){
  if (frameContentDragLocked){
    frameContentDragLocked = false;
    $(".frameContent").draggable("enable");
  } else {
    frameContentDragLocked = false;
    $(".frameContent").draggable();
  }
};

function disableContentDrag(){
  if (frameContentDragLocked == false){
    frameContentDragLocked = true;
    $(".frameContent").draggable({
      disabled:true
    })
  }
};

function createFrame(){
  $("#container").append("<div id=frame"+frameCount+" style=height:100px;width:100px; class=frame></div>");
  $("#frame"+frameCount).draggable();
  $("#frame"+frameCount).resizable();
  $("#frameSelect").append("<option id=option"+frameCount+" value="+frameCount+">Frame "+(frameCount+1)+"</option>");
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
};


function disableFrameDrag(){
  $(".frame").draggable({
    disabled: true
  });
};

function generateHTML(){
  try {
    trimHTML();
    var reduction =$("#container")[0].innerHTML;
    var firstRender = replaceAll(reduction, '>', '&gt;');
    var secondRender = replaceAll(firstRender, '<', '&lt;');
    $("#deliciousReduction").append(secondRender);
  } catch(e) {
    var reduction ='<!DOCTYPE html><html><head><meta charset="utf-8"><title></title><style>#container {position: relative;}.frame {position: absolute;overflow: hidden;}</style></head><body><div id="container">'+$("#container")[0].innerHTML+'</div></body></html>';
    var firstRender = replaceAll(reduction, '>', '&gt;');
    var secondRender = replaceAll(firstRender, '<', '&lt;');
    $("#deliciousReduction").append(secondRender);
  }
};

//Weird viewport stuff starts here

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
};
