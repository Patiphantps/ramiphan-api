import moment from "moment-timezone";
import gatewayException from "../Response/gatewayException.js";
import errCode from "../Response/errorCode.js";
const { invalid_data_err } = errCode;

function isLaserId(data, message) {
  const LASER_ID_REGEX = new RegExp(`(^([a-zA-Z]){2}(([0-9]){10}))$`);
  if (!LASER_ID_REGEX.test(data)) {
    throw new gatewayException(invalid_data_err, message, 400);
  }
}

function isEmail(String, message) {
  const IS_EMAIL = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
  if (!IS_EMAIL.test(String)) {
    throw new gatewayException(invalid_data_err, message, 400);
  }
}

function isUUIDV4(String, message) {
  const IS_UUID = new RegExp(
    "^[0-9A-Za-z]{8}-[0-9A-Za-z]{4}-4[0-9A-Za-z]{3}-[89ABab][0-9A-Za-z]{3}-[0-9A-Za-z]{12}$"
  );
  if (!IS_UUID.test(String)) {
    throw new gatewayException(invalid_data_err, message, 400);
  }
}

function isAlphanumeric(minChar, maxChar, String, message) {
  const ALPHA_NUMERIC_REGEX = new RegExp(
    `^[a-zA-Z0-9]{${minChar},${maxChar}}$`
  );
  if (!ALPHA_NUMERIC_REGEX.test(String)) {
    throw new gatewayException(invalid_data_err, message, 400);
  }
}

function isStringBoolean(String, message) {
  if (typeof String !== "string") {
    throw new gatewayException(invalid_data_err, message, 400);
  }
  if (String.toLowerCase() !== "true" && String.toLowerCase() !== "false") {
    throw new gatewayException(invalid_data_err, message, 400);
  }
}

function isNumeric(minDigit, maxDigit, String, message) {
  const NUMERIC_REGEX = new RegExp(`^[0-9]{${minDigit},${maxDigit}}$`);
  if (!NUMERIC_REGEX.test(String)) {
    throw new gatewayException(invalid_data_err, message, 400);
  }
}

function isCapitalAlpha(minChar, maxChar, String, message) {
  const ALPHA_REGEX = new RegExp(`^[A-Z]{${minChar},${maxChar}}$`);
  if (!ALPHA_REGEX.test(String)) {
    throw new gatewayException(invalid_data_err, message, 400);
  }
}

function isNumberAndNotAllZero(
  startInt,
  endInt,
  minDigit,
  maxDigit,
  INTEGER,
  message
) {
  const INTEGER_REGEX = new RegExp(
    `^((?!0+$)[${startInt}-${endInt}]{${minDigit},${maxDigit}})$`
  );
  if (!INTEGER_REGEX.test(INTEGER)) {
    throw new gatewayException(invalid_data_err, message, 400);
  }
}

function isDateFormat(value, format, message) {
  const dateIsExist = moment(value, format, true);
  if (!dateIsExist.isValid()) {
    throw new gatewayException(invalid_data_err, message, 400);
  }
}

function isNotEmpty(data, message) {
  if (typeof data === "object") {
    if (Object.keys(data).length === 0) {
      throw new gatewayException(invalid_data_err, message, 400);
    }
  } else if (
    typeof data === "undefined" ||
    data === null ||
    data === "" ||
    data === ""
  ) {
    throw new gatewayException(invalid_data_err, message, 400);
  }
}

function isEqual(value, compare, message) {
  if (typeof value === "object" && typeof compare === "object") {
    if (Array.isArray(value) && Array.isArray(compare)) {
      if (value.length !== compare.length) {
        throw new gatewayException(invalid_data_err, message, 400);
      }
      const sortValue = value.sort();
      const sortCompare = compare.sort();
      for (let index in sortValue) {
        if (sortValue[index] !== sortCompare[index]) {
          throw new gatewayException(invalid_data_err, message, 400);
        }
      }
    } else if (!Array.isArray(value) && !Array.isArray(compare)) {
      if (Object.keys(value).length !== Object.keys(compare).length) {
        throw new gatewayException(invalid_data_err, message, 400);
      }
      for (let key in value) {
        if (value[key] !== compare[key]) {
          throw new gatewayException(invalid_data_err, message, 400);
        }
      }
    } else {
      throw new gatewayException(invalid_data_err, message, 400);
    }
  } else if (typeof value === "string" && typeof compare === "string") {
    if (value != compare) {
      throw new gatewayException(invalid_data_err, message, 400);
    }
  } else {
    throw new gatewayException(invalid_data_err, message, 400);
  }
}

function isGreaterThan(value, compare, message) {
  if (isNaN(parseInt(value))) {
    throw new gatewayException(invalid_data_err, message, 400);
  }
  if (isNaN(parseInt(compare))) {
    throw new gatewayException(invalid_data_err, message, 400);
  }
  if (parseInt(value) <= parseInt(compare)) {
    throw new gatewayException(invalid_data_err, message, 400);
  }
}

function isGreaterThanEqual(value, compare, message) {
  if (isNaN(parseInt(value))) {
    throw new gatewayException(invalid_data_err, message, 400);
  }
  if (isNaN(parseInt(compare))) {
    throw new gatewayException(invalid_data_err, message, 400);
  }
  if (value < compare) {
    throw new gatewayException(invalid_data_err, message, 400);
  }
}

function isLessThan(value, compare, message) {
  if (isNaN(parseInt(value))) {
    throw new gatewayException(invalid_data_err, message, 400);
  }
  if (isNaN(parseInt(compare))) {
    throw new gatewayException(invalid_data_err, message, 400);
  }
  if (value >= compare) {
    throw new gatewayException(invalid_data_err, message, 400);
  }
}

function isLessThanEqual(value, compare, message) {
  if (isNaN(parseInt(value))) {
    throw new gatewayException(invalid_data_err, message, 400);
  }
  if (isNaN(parseInt(compare))) {
    throw new gatewayException(invalid_data_err, message, 400);
  }
  if (value > compare) {
    throw new gatewayException(invalid_data_err, message, 400);
  }
}

function isWithoutSpecialChar(minChar, maxChar, String, message) {
  const WITHOUT_SPECIAL_CHAR_REGEX = new RegExp(
    `^([^\\<\\> \\{\\}\\[\\]\\-\\\\\\/\`!?^&*$#()+=_%]{${minChar},${maxChar}})$`
  );
  if (!WITHOUT_SPECIAL_CHAR_REGEX.test(String)) {
    throw new gatewayException(invalid_data_err, message, 400);
  }
}

function customCheck(minChar, maxChar, String, message, regex) {
  const CUSTOM_REGEX = new RegExp(`^(${regex}{${minChar},${maxChar}})$`);
  if (!CUSTOM_REGEX.test(String)) {
    throw new gatewayException(invalid_data_err, message, 400);
  }
}

function isArray(object, message) {
  if (!Array.isArray(object)) {
    throw new gatewayException(invalid_data_err, message, 400);
  }
}

export default {
  isArray,
  isLaserId,
  isEmail,
  isUUIDV4,
  isAlphanumeric,
  isStringBoolean,
  isNumeric,
  isCapitalAlpha,
  isNumberAndNotAllZero,
  isDateFormat,
  isNotEmpty,
  isEqual,
  isGreaterThan,
  isGreaterThanEqual,
  isLessThan,
  isLessThanEqual,
  isWithoutSpecialChar,
  customCheck,
};
