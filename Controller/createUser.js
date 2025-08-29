import { v4 as uuidv4 } from "uuid";
import { createClient } from "@supabase/supabase-js";
import resMange from "../Utilities/responseManagement.js";
import gatewayException from "../Response/gatewayException.js";
import errCode from "../Response/errorCode.js";

export async function createUser(req) {
  let responseData;
  let responseObj;

  try {
    
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);
    let verRequest = await checkRequest(req);
    const { username, password, firstname, lastname, role_id,user_admin_id } = verRequest;
    const usergen_id = uuidv4().slice(0, 8);

    const { data, error } = await supabase.from("users").insert([
      {
        user_id: usergen_id,
        username,
        password,
        firstname,
        lastname,
        role_id,
        create_user: user_admin_id,
        update_user: user_admin_id,
      },
    ]);

    if (error) {
      console.log("error supabase :", error);
      throw new gatewayException(errCode.database_err, error.message, 500);
    }

    if (data) {
      responseData = { ...data };
    } else {
      responseData = {};
    }

    // จัด response
    responseObj = resMange.dataToResponse(responseData);
    console.log("responseObj :", responseObj);

    return responseObj;
  } catch (error) {
    responseObj = resMange.exToResponse(error);
    console.log("responseObj :", responseObj);

    return responseObj;
  }
}

async function checkRequest(req) {
  try {
    return req.body;
  } catch (error) {
    throw error;
  }
}
