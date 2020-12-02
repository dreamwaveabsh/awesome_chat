import {check} from "express-validator/check";
import {transErrors, transValidation} from "./../../lang/vi";
let updateinfo =[
  check("username",transValidation.update_username).optional().isLength({min:3,max:10}).matches(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/),
  check("gender",transErrors.update_gender).optional().isIn(["male","female"]),
  check("address",transErrors.update_address).optional().isLength({min:3,max:30}),
  check("phone",transErrors.update_phone).optional().matches(/^(0)[0-9]{9,10}$/)
];
let updatePassword = [
  check("currentPassword",transValidation.password_incorrect).isLength({min:8}).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/),
  check("newPassword",transValidation.password_incorrect).isLength({min:8}).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/),
  check("confirmNewPassword",transValidation.password_incorrect).custom((value,{req})=>{
    return value === req.body.newPassword
  }),

]


module.exports = {
  updateinfo:updateinfo,
  updatePassword:updatePassword
}