export interface Task {
    id?: string;
    name: string;
    creationDate: Date;
    doneDate?: Date;
    isDone: boolean;
}
