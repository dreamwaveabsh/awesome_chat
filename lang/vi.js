export const transValidation ={
  email_incorrect:"Email phải có dạng example@email.com",
  gender_incorrect:"Tại sao trường giới tính lại không đúng, trang web này không dành cho bê đê nha ",
  password_incorrect:"Mật khẩu phải dài hơn 8 ký tự, bao gồm chữ thường, chữ im hoa và ký tự đặc biệt",
  confirmPassword_incorrect:"Nhập lại mật khẩu chưa chính xác"
}
export const transErrors = {
  account_in_use:"Email này đã được sử dụng",
  account_remove:"Tài khoản này đã bị xóa",
  account_not_active:"Tài khoản này đã đăng ký nhưng chưa active , vui lòng kiểm tra email để active tài khoản",
  token_null:"Token không tồn tại!",
  login_fail :"Sai tài khoản hoặc mật khẩu",
  server_error:"Có lỗi ở phía sever , vui lòng liên hệ admin để khắc phục"
}
export const transSuccess ={
  userCreated: (userEmail)=>{
    return `Tài khoản <strong>${userEmail}</strong> đã được tạo, vui lòng kiểm tra email của bạn để active tài khoản!!!`
  },
  account_active:"Kích hoạt tài khoản thành công , bạn có thể đăng nhập vào ứng dụng",
  login_success:(username)=>{
    return `Xin chào ${username} , Chúc bạn một ngày tốt lành!`
  }

}
export const transMail ={
  subject:"Active account Awesome Chat",
  template:(linkVerify)=>{
    return `
      <h2>Bạn nhận được email này vì đã đăng ký trên website Awesome Chat</h2>
      <h3>Vui lòng click vào link xác thực bên dưới để kích hoạt tài khoản</h3>
      <h3><a href="${linkVerify}" target="blank">${linkVerify}</a></h3>
      <h4>Cảm ơn mấy chú bé đần </h4>
    `;
  },
  sendFail:"Có lỗi trong quá trình đăng ký tài khoản. Vui lòng bật quyền truy cập cho ứng dụng <a href='https://www.google.com/settings/security/lesssecureapps' target='blank'>Link</a>"
}
