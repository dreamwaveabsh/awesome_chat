import {check} from "express-validator/check";
import {transErrors, transValidation} from "./../../lang/vi";
let updateinfo =[
  check("username",transValidation.update_username).optional().isLength({min:3,max:10}).matches(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/),
  check("gender",transErrors.update_gender).optional().isIn(["male","female"]),
  check("address",transErrors.update_address).optional().isLength({min:3,max:30}),
  check("phone",transErrors.update_phone).optional().matches(/^(0)[0-9]{9,10}$/)
];
module.exports = {
  updateinfo:updateinfo
}