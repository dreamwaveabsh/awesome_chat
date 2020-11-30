let userAvatar = null;
let userInfo = {};
let originAvatarSrc=null;
let originUserInfo = {};

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
  $("#input-change-username").bind("change",function(){
    let username = $(this).val();;
    let regexUsername =  new RegExp("^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$");
    if(!regexUsername.test(username)||username.length<3||username.length>20){
      alertify.notify("User name giới hạn trong khoảng 3-20 ký tự và không được chứa ký tự đặt biệt","error",7)
      $(this).val(originUserInfo.username)
      delete userInfo.username
      return false
    }
    userInfo.username = username;
  })
  $("#input-change-gender-male").bind("click",function(){
    let gender = $(this).val();
    if(gender!=="male"){
      alertify.notify("Giới tính chỉ được nam và nữ  thôi , ok","error",7)
      $(this).val(originUserInfo.gender)
      delete userInfo.gender
      return false
    }

    userInfo.gender = gender;
  })
  $("#input-change-gender-female").bind("click",function(){
    let gender = $(this).val();
    if(gender!=="female"){
      alertify.notify("Giới tính chỉ được nam và nữ  thôi , ok","error",7)
      $(this).val(originUserInfo.gender)
      delete userInfo.gender
      return false
    }
    userInfo.gender = gender;
  })
  $("#input-change-address").bind("change",function(){
    let address = $(this).val();
    if(address.length<3||address.length>30){
      alertify.notify("Địa chỉ giới hạn trong khoảng 3-30 ký tự","error",7)
      $(this).val(originUserInfo.address)
      delete userInfo.address
      return false
    }


    userInfo.address = address;
  })
  $("#input-change-phone").bind("change",function(){
    let phone = $(this).val();
    let regexPhone = new RegExp("^(0)[0-9]{9,10}$");
    if(!regexPhone.test(phone)){
      alertify.notify("Số điện thoại Việt Nam bắt đầu bằng số 0 và giới hạn trong 10-11 ký tự","error",7)
      $(this).val(originUserInfo.phone)
      delete userInfo.phone
      return false
    }
    userInfo.phone = phone;
  })
}

function callUpdateAvatar(){
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

}
function callUpdateUserInfo(){
  $.ajax({
    url:"/user/update-info",
    type:"put",
    data:userInfo,
    success:function(result){
      console.log(result)
      //display success
      $(".user-modal-alert-success").find("span").text(result.message);
      $(".user-modal-alert-success").css("display","block");

      originUserInfo = Object.assign(originUserInfo,userInfo);
      $("#navbar-username").text(originUserInfo.username);



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

}

$(document).ready(function(){
  
  originAvatarSrc = $("#user-modal-avatar").attr("src");
  originUserInfo = {
    username: $("#input-change-username").val(),
    gender: ($("#input-change-gender-male").is(":checked")) ? $("#input-change-gender-male").val() : $("#input-change-gender-female").val(), 
    address: $("#input-change-address").val(),
    phone: $("#input-change-phone").val()
  }
  updateUserInfo();
  $("#input-btn-update-user").bind("click",function(){
    if($.isEmptyObject(userInfo)&&!userAvatar){
      alertify.notify("Bạn phải thay đổi thông tin trước khi cập nhật dữ liệu","error",5);
      return false;
    }
    if(userAvatar){
      callUpdateAvatar();
    }
    if(!$.isEmptyObject(userInfo)){
      callUpdateUserInfo();
    }

  })

  $("#input-btn-calcel-update-user").bind("click",function(){
     userAvatar = null;
     userInfo = {};
     $("#input-change-avatar").val(null);
     $("#user-modal-avatar").attr("src",originAvatarSrc);
     $("#input-change-username").val(originUserInfo.username);
     (originUserInfo.gender === "male") ? $("#input-change-gender-male").click() : $("#input-change-gender-female").click();
     $("#input-change-address").val(originUserInfo.address);
     $("#input-change-phone").val(originUserInfo.phone);
  })
})