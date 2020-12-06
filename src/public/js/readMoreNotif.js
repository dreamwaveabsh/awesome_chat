
$(document).ready(function(){
  $("#link-read-more-notif").bind("click",function(){
    let skipNumer = $("ul.list-notifications").find("li").length;

    $("#link-read-more-notif").css("display","none")
    $(".lds-hourglass").css("display","inline-block")

    
    $.get(`/notification/read-more?skipNumber=${skipNumer}`,function(notifications){
      if(!notifications.length){
        alertify.notify("Bạn không còn thông báo nào để xem nữa!","error",7);
        $("#link-read-more-notif").css("display","inline-block")
        $(".lds-hourglass").css("display","none")
        return false
      }
      notifications.forEach(element => {
        $("ul.list-notifications").append(`<li>${notifications}</li>`);
      });
      $("#link-read-more-notif").css("display","inline-block")
      $(".lds-hourglass").css("display","none")
    });
  })
})