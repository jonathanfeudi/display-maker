$(document).ready(function(){
  console.log('Link the Fire, O Chosen Undead.')
});

var frameCount = 0;

function roundSnap(position, grid){
  var remainder = position % grid;
  var afterSnap = position - remainder;
  if (((afterSnap + grid) - position) < (position - afterSnap)){
    return (afterSnap + grid);
  } else {
    return afterSnap;
  }
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

$("#gridButton").click(function(){
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
