import { ListType } from "./ListType";

type UserType = {
    id: number, 
    name: string,
    password: string,
    tdlists: ListType[],
}

export type { UserType }