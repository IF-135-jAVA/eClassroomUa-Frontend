import { User } from "./user";

export interface Classroom{
    id: number;
    title: string;
    session: string;
    description: string;
    code: string;
    owner: User;
}