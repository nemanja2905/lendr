import moment from 'moment';

export default class EventDetails {
    constructor(fields) {
        this.racedate = fields.racedate;
        this.racetime = fields.racetime;
        this.racedistance = fields.racedistance;
        this.event = fields.event;
        this.trackcondition = fields.trackcondition;
        this.weather = fields.weather;
        this.racetimeutc = fields.racetimeutc;
        this.racenum = fields.racenum;
    }

    getRaceDateTime() {
        let raceTime = new Date(this.racetime);
        let raceDate = new Date(this.racedate);

        return new Date(
            raceDate.getFullYear(),
            raceDate.getMonth(),
            raceDate.getDate(),
            raceTime.getHours(),
            raceTime.getMinutes(),
            raceTime.getSeconds()
        );
    }

    getRaceDateUtc() {
        return moment.utc(this.racetimeutc).local().format();
    }

    getRaceTimeUtc() {
        return moment.utc(this.racetimeutc).local().format('HH:mm');
    }
}
