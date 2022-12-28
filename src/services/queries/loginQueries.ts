import api from "..";
import { useMutation } from "react-query";

import { GetLoginData, PostLoginData } from "./interfaces/loginQueriesInterface";

export const useMutationLogin = () =>{
    return useMutation((data: PostLoginData) =>{
        return api.post<GetLoginData>('login', data)
    })
}