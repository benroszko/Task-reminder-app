export interface Task {
    id?: string;
    name: string;
    creation: Date;
    deletion?: Date;
    done: boolean;
}
