import { v4 as uuidv4 } from "uuid";
import { createClient } from "@supabase/supabase-js";
import resMange from "../Utilities/responseManagement.js";
import gatewayException from "../Response/gatewayException.js";
import errCode from "../Response/errorCode.js";
import checker from "../Utilities/checker.js";

export async function createRole(req) {
  let responseData;
  let responseObj;

  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    console.log("supabaseUrl :", supabaseUrl);
    console.log("supabaseKey :", supabaseKey);
    const supabase = createClient(supabaseUrl, supabaseKey);
    let verRequest = await checkRequest(req);
    const { role_name, user_id } = verRequest;
    const role_id = uuidv4().slice(0, 8);

    // no duplicate role_name
    const { data: existingData, error: existingError } = await supabase
      .from("role")
      .select("*")
      .eq("role_name", role_name);

    if (existingError) {
      console.log("error supabase :", existingError);
      throw new gatewayException(
        errCode.database_err,
        existingError.message,
        500
      );
    }

    if (existingData.length > 0) {
      throw new gatewayException(errCode.duplicate_data_err, "", 400);
    }

    // insert role
    const { data, error } = await supabase.from("role").insert([
      {
        role_id,
        role_name,
        create_user: user_id,
        update_user: user_id,
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
    checker.isNotEmpty(req.body, "body is required");
    checker.isNotEmpty(req.body.role_name, "role_name is required");
    checker.isNotEmpty(req.body.user_id, "user_id is required");
    checker.isAlphanumeric(8, 8, req.body.user_id, "user_id invalid format");

    return req.body;
  } catch (error) {
    throw error;
  }
}
