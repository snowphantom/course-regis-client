import { Course } from "./Course";

export class Registration {
    username: string;

    created_time: Date;

    last_modified: Date;

    enrolled: string[];

    enrolledCourse: Course[];
}