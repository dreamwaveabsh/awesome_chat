let userAvatar = null;
let userInfo = {};
let originAvatarSrc=null;

function updateUserInfo(){
  $("#input-change-avatar").bind("change",function(){
    let fileData = $(this).prop("files")[0];
    let math = ["image/png",'image/jpg',"image/jpeg"];
    let limit = 1048576;
    if($.inArray(fileData.type,math) === -1){
      alertify.notify("Kiểu file không hợp lệ, chỉ nhập nhận jpg,png","error",5);
      $(this).val(null);
      return false;
    }    
    if(fileData.size > limit){
      alertify.notify("Chỉ cho up ảnh tối đa 1mb","error",5);
      $(this).val(null);
      return false;
    }    
    if(typeof (FileReader) != "undefined"){
      let imagePreview = $("#image-edit-profile");
      imagePreview.empty();
      let fileReader = new FileReader();
      fileReader.onload = function(element){
        $("<img>",{
          "src":element.target.result,
          "class":"avatar img-circle",
          "id":"user-modal-avatar",
          "alt":"avatar"
        }).appendTo(imagePreview);
      }
      imagePreview.show();
      fileReader.readAsDataURL(fileData);

      let formData = new FormData();
      formData.append("avatar",fileData);
      userAvatar= formData;
    }else{
      alertify("Trình duyệt của bạn không hỗ trợ file reader","error",7)
    }
  })
  $("#imput-change-username").bind("change",function(){
    userInfo.username = $(this).val();
  })
  $("#imput-change-gender-male").bind("click",function(){
    userInfo.gender = $(this).val();
  })
  $("#imput-change-gender-female").bind("click",function(){
    userInfo.gender = $(this).val();
  })
  $("#imput-change-address").bind("change",function(){
    userInfo.address = $(this).val();
  })
  $("#imput-change-phone").bind("change",function(){
    userInfo.phone = $(this).val();
  })
}
$(document).ready(function(){
  updateUserInfo();
  originAvatarSrc = $("#user-modal-avatar").attr("src");
  $("#input-btn-update-user").bind("click",function(){
    if($.isEmptyObject(userInfo)&&!userAvatar){
      alertify.notify("Bạn phải thay đổi thông tin trước khi cập nhật dữ liệu","error",5);
      return false;
    }
    $.ajax({
      url:"/user/update-avatar",
      type:"put",
      cache:false,
      contentType:false,
      processData:false,
      data:userAvatar,
      success:function(result){
        console.log(result)
        //display success
        $(".user-modal-alert-success").find("span").text(result.message);
        $(".user-modal-alert-success").css("display","block");
        $("#navbar-avatar").attr("src",result.imageSrc)
        originAvatarSrc = result.imageSrc;
        $("#input-btn-calcel-update-user").click();
      },
      error:function(error){
        //display error
        $(".user-modal-alert-error").find("span").text(error.responseText);
        $(".user-modal-alert-error").css("display","block");
        //reset all
        $("#input-btn-calcel-update-user").click();
      }
    })
  })
  $("#input-btn-calcel-update-user").bind("click",function(){
     userAvatar = null;
     userInfo = {};
     $("#imput-change-avatar").val(null);
     $("#user-modal-avatar").attr("src",originAvatarSrc)
  })
})