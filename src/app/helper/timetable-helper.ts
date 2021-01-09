import { NgZeeTimeTableData, NgZeeTimeTableDataElement, NgZeeTimeTableOptions } from "ng-zee-timetable";
import { DayOfWeek } from "../common/bunchOfEnum";
import { Registration } from "../models/Registration";

export function registration2TimetableData(regis: Registration) {
    let tableData: NgZeeTimeTableData = {};

    regis.enrolledCourse && regis.enrolledCourse.forEach(element => {
        let dataDay = tableData[`${DayOfWeek[element.day]}`] || {};
        let dataElement = {
            title: element.name,
            subTitle: 'abcd',
            endTime: element.end_time
        }
        let object = {};
        object[`${element.start_time}`] = dataElement;

        tableData[`${DayOfWeek[element.day]}`] = Object.assign({}, dataDay, object)
    });

    return tableData;
}