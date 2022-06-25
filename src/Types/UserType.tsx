import { ListType } from "./ListType";

type UserType = {
    id: number, 
    name: string,
    password: string,
    email: string,
    tdLists: ListType[],
}

export type { UserType }