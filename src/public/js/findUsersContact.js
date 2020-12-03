function callFindUsers(element){
  if(element.which === 13 ||element.type ==="click"){
    let keyword =  $("#input-find-users-contact").val();
    let regexKeyword = new RegExp(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/);


    if(!keyword.length){
      alertify.notify("Bạn chưa nhập nội dung tìm kiếm","error",7);
      return false
    }

    if(!regexKeyword.test(keyword)){
      alertify.notify("Lỗi từ khóa tìm kiếm , chỉ cho phép chữ cái hoặc số","error",7);
      return false
    }
    $.get(`/contact/find-users/${keyword}`,function(data){
      $("#find-user ul").html(data);
      addContact(); // js/contact.js
      removeRequestContact(); //js/removeRequestContact.js
    })
  }
}

$(document).ready(function(){
  $("#input-find-users-contact").bind("keypress",callFindUsers)

  $("#btn-find-users-contact").bind("click",callFindUsers)
});