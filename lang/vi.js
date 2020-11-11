export const transValidation ={
  email_incorrect:"Email phải có dạng example@email.com",
  gender_incorrect:"Tại sao trường giới tính lại không đúng, trang web này không dành cho bê đê nha ",
  password_incorrect:"Mật khẩu phải dài hơn 8 ký tự, bao gồm chữ thường, chữ im hoa và ký tự đặc biệt",
  confirmPassword_incorrect:"Nhập lại mật khẩu chưa chính xác"
}
export const transErrors = {
  account_in_use:"Email này đã được sử dụng",
  account_remove:"Tài khoản này đã bị xóa",
  account_not_active:"Tài khoản này đã đăng ký nhưng chưa active , vui lòng kiểm tra email để active tài khoản"
}
export const transSuccess ={
  userCreated: (userEmail)=>{
    return `Tài khoản <strong>${userEmail}</strong> đã được tạo, vui lòng kiểm tra email của bạn để active tài khoản!!!`
  }
}
