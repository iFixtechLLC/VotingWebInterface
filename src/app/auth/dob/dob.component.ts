import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DobService } from './dob.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateOption } from '../../core';

@Component({
    selector: 'auth-dob',
    templateUrl: './dob.component.html',
    styleUrls: [
        './dob.component.scss',
        './dob.component.hc.scss'
    ],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DobComponent),
        multi: true
    }]
})
export class DobComponent implements OnInit, ControlValueAccessor {
    private propagateChange: Function;
    private date: Date;

    @Input()
    format: string;

    months: DateOption[];
    days: DateOption[];
    years: DateOption[];

    selectedDay: number;
    selectedMonth: number;
    selectedYear: number;

    constructor(
        private _dobService: DobService,
        private _datePipe: DatePipe
    ) { }

    ngOnInit() {
        this.date = new Date();

        this.selectedDay = -1;
        this.selectedMonth = -1;
        this.selectedYear = -1;

        this.months = this._dobService.months;
        this.days = this._dobService.days;
        this.years = this._dobService.years;
    }

    onDateChange() {
        setTimeout(() => {
            if (this._valid) {
                this.date.setDate(this.selectedDay);
                this.date.setMonth(this.selectedMonth);
                this.date.setFullYear(this.selectedYear);
                if (this.propagateChange) {
                    this.propagateChange(this._formattedDate);
                }
            } else {
                if (this.propagateChange) {
                    this.propagateChange();
                }
            }
        }, 0);
    }

    registerOnChange(fn: Function) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: Function) { }

    writeValue(value: Date) {
        if (value) {
            this.selectedDay = this.date.getDay();
            this.selectedMonth = this.date.getMonth();
            this.selectedYear = this.date.getFullYear();
        } else {
            this.selectedDay = -1;
            this.selectedMonth = -1;
            this.selectedYear = -1;
        }
    }

    private get _formattedDate() {
        let dateString;
        if (this.format === 'little') {
            dateString = this._datePipe.transform(this.date, 'dd/MM/yyyy');
        } else if (this.format === 'middle') {
            dateString = this._datePipe.transform(this.date, 'MM/dd/yyyy');
        } else {
            dateString = this._datePipe.transform(this.date, 'yyyy/MM/dd');
        }

        return dateString;
    }

    private get _valid() {
        return (
            this.selectedMonth > -1 && this.selectedDay > -1 && this.selectedYear > -1
        );
    }

}
