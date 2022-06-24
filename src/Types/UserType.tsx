import { ListType } from "./ListType";

type UserType = {
    id: number, 
    name: string,
    tdlists: ListType[],
}

export type { UserType }