$(document).ready(function(){
  console.log('Link the Fire, O Chosen Undead.')
});

var frameCount = 0;
var gridIncrement = 0;

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
  el.style.top = roundOff(el.style.top.split('px')[0], gridIncrement)+'px';
  el.style.left = roundOff(el.style.left.split('px')[0], gridIncrement)+'px';
};

$("#frameButton").click(function(){
  if ($("#heightInput").val() && $("#widthInput").val()){
    $("#container").append("<div id=frame"+frameCount+" style=height:"+$("#heightInput").val()+"px;width:"+$("#widthInput").val()+"px; class=frame>frame</div>");
    $("#frame"+frameCount).draggable();
    $("#frame"+frameCount).resizable();
    frameCount ++;
    $("#heightInput").val('');
    $("#widthInput").val('');
  }
});

$("#testFrame").click(function(){
  $("#container").append("<div id=frame"+frameCount+" style=height:100px;width:100px; class=frame>frame</div>");
  $("#frame"+frameCount).draggable();
  $("#frame"+frameCount).resizable();
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
  $( ".frame" ).draggable({
    disabled: true
  });
});
