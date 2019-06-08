import { Injectable } from '@angular/core';
import { DateOption } from '../../core';

// let months: DateOption[];

@Injectable()
export class DobService {
    private date: Date = new Date();

    days: DateOption[];
    months: DateOption[];
    years: DateOption[];

    constructor() {
        this.init();
    }

    init() {
        const dayNum: DateOption[] = [];
        const yearNum: DateOption[] = [];
        const startYear = 1900;
        const curYear = this.date.getFullYear();

        // push initial value/label
        dayNum.push({
            label: 'Day',
            value: -1
        });
        yearNum.push({
            label: 'Year',
            value: -1
        });

        // create days
        for (let i = 1; i <= 31; i++) {
            dayNum.push({
                label: i.toString(),
                value: i
            });
        }
        // create years
        for (let i = curYear; startYear <= i; i--) {
            yearNum.push({
                label: i.toString(),
                value: i
            });
        }

        // dob data
        this.days = dayNum;
        this.years = yearNum;
        this.months = [
            {
                label: 'Month',
                value: -1
            },
            {
                label: 'January',
                value: 0
            },
            {
                label: 'February',
                value: 1
            },
            {
                label: 'March',
                value: 2
            },
            {
                label: 'April',
                value: 3

            },
            {
                label: 'May',
                value: 4

            },
            {
                label: 'June',
                value: 5

            },
            {
                label: 'July',
                value: 6

            },
            {
                label: 'August',
                value: 7

            },
            {
                label: 'September',
                value: 8

            },
            {
                label: 'October',
                value: 9

            },
            {
                label: 'November',
                value: 10

            },
            {
                label: 'December',
                value: 11
            }
        ];
    }
}
