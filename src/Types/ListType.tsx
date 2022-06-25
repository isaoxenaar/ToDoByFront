import { ToDoType } from "./ToDoType";

type ListType = {
    id: number, 
    title: string,
    totalcost: number, 
    todoitems: ToDoType[],
    userId: number
}

export type { ListType }