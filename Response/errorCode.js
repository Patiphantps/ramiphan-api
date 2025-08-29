const success = {
  returnCode: "00000",
  returnDescTH: "ทำรายการสำเร็จ",
  returnDesc: "Success",
};

const invalid_data_err = {
  returnCode: "10001",
  returnDescTH: "ข้อมูลไม่ครบถ้วน กรุณากรอกใหม่อีกครั้ง",
  returnDesc: "Invalid Data",
};

const malformed_JSON = {
  returnCode: "10002",
  returnDesc: "Malformed JSON",
  returnDescTH: "ข้อมูลไม่ครบถ้วน กรุณากรอกใหม่อีกครั้ง",
};

const database_err = {
  returnCode: "10003",
  returnDescTH:
    "ขออภัยในความไม่สะดวก ขณะนี้ระบบขัดข้อง กรุณาลองใหม่ภายหลังภายหลัง",
  returnDesc: "Database error",
};

const internal_err = {
  returnCode: "10004",
  returnDescTH: "ขออภัยในความไม่สะดวก ขณะนี้ระบบขัดข้อง กรุณาลองใหม่ภายหลัง",
  returnDesc: "Internal error",
};

export default {
  success,
  invalid_data_err,
  malformed_JSON,
  database_err,
  internal_err,
};
