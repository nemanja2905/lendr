import moment from 'moment';

export default class qMeeting {
    constructor(fields) {
        this.abandoned = fields.abandoned === 1 ? true : false;
        this.category = fields.category;
        this.countrylabel = fields.countrylabel;
        this.nextrace = fields.nextrace;
        this.racemeet = fields.racemeet.toLowerCase();
        this.racetype = fields.racetype;
    }

    getRaceType() {
        if (this.racetype === 'R') return 'racing';
        if (this.racetype === 'G') return 'greyhound';
        if (this.racetype === 'H') return 'harness';
    }

    getUpperCaseRaceMeet() {
        let rmeet =
            this.racemeet.toLowerCase().trim()[0].toUpperCase() +
            this.racemeet.substring(1).toLowerCase();

        return rmeet;
    }
}
