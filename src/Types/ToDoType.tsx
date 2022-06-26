import { SubType } from "./SubType";

type ToDoType = {
    id: number, 
    title: string,
    text: string, 
    deadline: string, 
    cost: number, 
    subitems: SubType[],
    tdListId: number
}

export type { ToDoType }