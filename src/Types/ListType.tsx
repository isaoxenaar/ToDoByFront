import { ToDoType } from "./ToDoType";

type ListType = {
    id: number, 
    title: string,
    totalcost: number, 
    todoitems: ToDoType[],
    userid: number
}

export type { ListType }