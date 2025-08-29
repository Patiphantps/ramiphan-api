import { v4 as uuidv4 } from "uuid"
import { createClient } from "@supabase/supabase-js";
import resMange from "../Utilities/responseManagement.js"
import gatewayException from "../Response/gatewayException.js"
import errCode from "../Response/errorCode.js"

export async function createRole(req) {
    let responseData
    let responseObj

    try {
        const supabaseUrl = process.env.SUPABASE_URL
        const supabaseKey = process.env.SUPABASE_KEY
        console.log("supabaseUrl :", supabaseUrl)
        console.log("supabaseKey :", supabaseKey)
        const supabase = createClient(supabaseUrl, supabaseKey)
        let verRequest = await checkRequest(req)
        const { role_name, user_id } = verRequest
        const role_id = uuidv4().slice(0, 8)

        const { data, error } = await supabase.from("role").insert([
            {
                role_id,
                role_name,
                create_user: user_id,
                update_user: user_id,
            },
        ])

        if (error) {
            console.log("error supabase :", error)
            throw new gatewayException(errCode.database_err, error.message, 500)
        }

        if (data) {
            responseData = { ...data }
        } else {
            responseData = {}
        }

        responseObj = resMange.dataToResponse(responseData)
        console.log("responseObj :", responseObj)

        return responseObj
    } catch (error) {
        responseObj = resMange.exToResponse(error)
        console.log("responseObj :", responseObj)

        return responseObj
    }
}

async function checkRequest(req) {
    try {
        return req.body
    } catch (error) {
        throw error
    }
}