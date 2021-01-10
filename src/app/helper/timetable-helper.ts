import { NgZeeTimeTableData, NgZeeTimeTableDataElement, NgZeeTimeTableOptions } from "ng-zee-timetable";
import { DayOfWeek } from "../common/bunchOfEnum";
import { Registration } from "../models/Registration";
import { getDayOfWeekVN } from "./date-helper";

export function registration2TimetableData(regis: Registration) {
    let tableData: NgZeeTimeTableData = {};

    regis && regis.enrolledCourse && regis.enrolledCourse.forEach(element => {
        let dataDay = tableData[`${getDayOfWeekVN(element.day)}`] || {};
        let dataElement = {
            title: element.name,
            subTitle: element.venue,
            endTime: element.end_time
        }
        let item = {};
        const startTime = element.start_time.length <= 4 ? `0${element.start_time}` : element.start_time;
        item[startTime] = dataElement;

        tableData[`${getDayOfWeekVN(element.day)}`] = Object.assign({}, dataDay, item)
    });

    return tableData;
}