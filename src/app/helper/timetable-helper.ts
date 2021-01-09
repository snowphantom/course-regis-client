import { NgZeeTimeTableData, NgZeeTimeTableDataElement, NgZeeTimeTableOptions } from "ng-zee-timetable";
import { DayOfWeek } from "../common/bunchOfEnum";
import { Registration } from "../models/Registration";

export function registration2TimetableData(regis: Registration) {
    let tableData: NgZeeTimeTableData = {};

    regis.enrolledCourse.forEach(element => {
        let dataDay = tableData[`${DayOfWeek[element.day]}`] || {};
        let dataElement = {
            title: element.name,
            subTitle: element.venue,
            endTime: element.end_time
        }
        let item = {};
        const startTime = element.start_time.length <= 4 ? `0${element.start_time}` : element.start_time;
        item[startTime] = dataElement;

        tableData[`${DayOfWeek[element.day]}`] = Object.assign({}, dataDay, item)
    });

    return tableData;
}