export class DialogLevels {
    static get INFO(): string { return ''; };
    static get WARNING(): string { return 'warning'; };
    static get ERROR(): string { return 'error'; };

    static isValid(level) {
        return level === this.INFO ||
                level === this.WARNING ||
                level === this.ERROR;
    }
}
