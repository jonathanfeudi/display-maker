$(document).ready(function(){
  console.log('Link the Fire, O Chosen Undead.')
});

var frameCount = 0;
var gridIncrement = 0;
var frameContentDragLocked;
var frameContentResizeLocked;

function roundOff(position, grid){
  var remainder = position % grid;
  var afterSnap = position - remainder;
  if (((afterSnap + grid) - position) < (position - afterSnap)){
    return (afterSnap + grid);
  } else {
    return afterSnap;
  }
};

function normalizeSnap(ind, el){
  el.style.top = roundOff(el.style.top.split('px')[0], parseInt(gridIncrement))+'px';
  el.style.left = roundOff(el.style.left.split('px')[0], parseInt(gridIncrement))+'px';
};

function vacuumPack(){
  $("#frame"+($("#frameSelect").val())).width($("#frameImage"+($("#frameSelect").val())).width()+"px");
  $("#frame"+($("#frameSelect").val())).height($("#frameImage"+($("#frameSelect").val())).height()+"px");
};

$("#vacuumPack").click(vacuumPack);

$("#madsButton").click(function(){
  $("#frame0").append("<div class=frameContent><img id=madsPic src=img/mads.jpg></div>");
});

$("#loadImage").click(function(){
  $("#frame"+($("#frameSelect").val())).append("<div class=frameContent><img id=frameImage"+($("#frameSelect").val())+" src="+($("#imgInput").val())+"></div>")
  $("#imgInput").val('');
});

$("#frameContentResize").click(function(){
  if (frameContentResizeLocked){
    frameContentResizeLocked = false;
    $(".frameContent").children(["<img>"]).resizable("enable")
  } else {
    frameContentResizeLocked = false;
    $(".frameContent").children(["<img>"]).resizable({
      aspectRatio:true
    })
  }
});

$("#frameContentResizeLock").click(function(){
  if (frameContentResizeLocked == false){
    frameContentResizeLocked = true;
    $(".frameContent").children(["<img>"]).resizable({
      disabled:true
    })
  }
});

$("#frameContentDrag").click(function(){
  if (frameContentDragLocked){
    frameContentDragLocked = false;
    $(".frameContent").draggable("enable");
  } else {
    frameContentDragLocked = false;
    $(".frameContent").draggable();
  }
});

$("#frameContentLock").click(function(){
  if (frameContentDragLocked == false){
    frameContentDragLocked = true;
    $(".frameContent").draggable({
      disabled:true
    })
  }
});

$("#frameButton").click(function(){
  if ($("#heightInput").val() && $("#widthInput").val()){
    $("#container").append("<div id=frame"+frameCount+" style=height:"+$("#heightInput").val()+"px;width:"+$("#widthInput").val()+"px; class=frame></div>");
    $("#frame"+frameCount).draggable();
    $("#frame"+frameCount).resizable();
    $("#frameSelect").append("<option value="+frameCount+">Frame "+frameCount+"</option>")
    frameCount ++;
    $("#heightInput").val('');
    $("#widthInput").val('');
  }
});

$("#testFrame").click(function(){
  $("#container").append("<div id=frame"+frameCount+" style=height:100px;width:100px; class=frame></div>");
  $("#frame"+frameCount).draggable();
  $("#frame"+frameCount).resizable();
  $("#frameSelect").append("<option value="+frameCount+">Frame "+(frameCount+1)+"</option>")
  frameCount ++;
});

$("#gridButton").click(function(){
  gridIncrement = $("#gridInput").val();
  $(".frame").each(normalizeSnap);
  $(".frame").draggable( "option", "grid", [$("#gridInput").val(), $("#gridInput").val()]);
  $("#gridInput").val('');
})

$("#unlockButton").click(function(){
  $(".frame").draggable("enable");
});

$("#lockButton").click(function(){
  $(".frame").draggable({
    disabled: true
  });
});
