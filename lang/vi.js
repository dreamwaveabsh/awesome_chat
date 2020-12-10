export const transValidation ={
  email_incorrect:"Email phải có dạng example@email.com",
  gender_incorrect:"Tại sao trường giới tính lại không đúng, trang web này không dành cho bê đê nha ",
  password_incorrect:"Mật khẩu phải dài hơn 8 ký tự, bao gồm chữ thường, chữ im hoa và ký tự đặc biệt",
  confirmPassword_incorrect:"Nhập lại mật khẩu chưa chính xác",
  update_username:"User name giới hạn trong khoảng 3-20 ký tự và không được chứa ký tự đặt biệt",
  update_gender:"Giới tính chỉ được nam và nữ  thôi , ok ",
  update_address:"Địa chỉ giới hạn trong khoảng 3-30 ký tự",
  update_phone:"Số điện thoại Việt Nam bắt đầu bằng số 0 và giới hạn trong 10-11 ký tự",
  keyword_find_user:"Chỉ cho phép chữ cái và số",
  message_text_emoji_incorrect:"Tin nhắn không hợp lệ. Đảm bảo tối thiểu 1 ký tự, tối đa 400 ký tự"
}
export const transErrors = {
  account_in_use:"Email này đã được sử dụng",
  account_remove:"Tài khoản này đã bị xóa",
  account_not_active:"Tài khoản này đã đăng ký nhưng chưa active , vui lòng kiểm tra email để active tài khoản",
  account_undefined:"Tài khoản không tồn tại",
  token_null:"Token không tồn tại!",
  login_fail :"Sai tài khoản hoặc mật khẩu",
  server_error:"Có lỗi ở phía sever , vui lòng liên hệ admin để khắc phục",
  avatar_type:"Kiểu file không hợp lệ, chỉ nhập nhận jpg,png",
  avatar_size:"Ảnh tối đa 1mb",
  user_current_password_failed:"Mật khẩu hiện tại không chính xác",
  conversation_not_found:"Cuộc trò  chuyện không tồn tại"
}
export const transSuccess ={
  userCreated: (userEmail)=>{
    return `Tài khoản <strong>${userEmail}</strong> đã được tạo, vui lòng kiểm tra email của bạn để active tài khoản!!!`
  },
  account_active:"Kích hoạt tài khoản thành công , bạn có thể đăng nhập vào ứng dụng",
  login_success:(username)=>{
    return `Xin chào ${username} , Chúc bạn một ngày tốt lành!`
  },
  logout_success:"Đăng xuất thành công!",
  avatar_update:"Cập nhật ảnh đại diện thành công.",
  info_update:"Cập nhật thông tin thành công",
  user_password_updated:"Cập nhật mật khẩu thành công"

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
