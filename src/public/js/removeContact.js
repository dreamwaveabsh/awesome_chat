
function removeContact(){
  $(".user-remove-contact").unbind("click").on("click",function(){
    let targetId = $(this).data("uid");
    let username = $(this).parent().find("div.user-name p").text();
    Swal.fire({
      title: `Bạn có chắc chăn muốn xóa ${username} khỏi danh bạ`,
      text: "Đổi rồi thôi đó nghe!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2ECC71',
      cancelButtonColor: '#ff7675',
      confirmButtonText: 'Xác nhận!',
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
      if(!result.value){
        return false;
      }
      $.ajax({
        url:"/contact/remove-contact",
        type:"delete",
        data:{uid:targetId},
        success:function(data){
          if(data.success){
            $("#contacts").find(`ul li[data-uid = ${targetId}]`).remove();
            decreaseNumberNotifContact("count-contacts")
            //sau này làm chức năng chat thì sẽ xóa tiếp user ở phần chat
            socket.emit("remove-contact",{contactId:targetId})
          }
        }
      })
    })
  })
}

socket.on("response-remove-contact",function(user){
  $("#contacts").find(`ul li[data-uid = ${user.id}]`).remove();
  decreaseNumberNotifContact("count-contacts")
  
});

$(document).ready(function(){
  removeContact();
})