import {mutationOptions} from "@tanstack/react-query";
import {updateAccountDetails} from "../../services/user.service.ts";

export const userMutations = {
    update: mutationOptions({
        mutationFn: updateAccountDetails,
    })
}