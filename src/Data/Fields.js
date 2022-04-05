export default class FieldsModel {
    constructor(fields) {
        this.actualcode = fields.actualcode;
        this.image = fields.image;
        this.fieldnum = +fields.fieldnum;
        this.fieldname = fields.fieldname;
        this.weight = fields.weight;
        this.jockey = fields.jockey;
        this.trainer = fields.trainer;
        this.win = fields.win ? +fields.win.toFixed(2) : null;
        this.place = fields.place ? +fields.place.toFixed(2) : null;
        this.scratching = fields.scratching === 'N' ? false : true;
        this.barrier = fields.barrier;
        this.racemeet = fields.racemeet;
        this.racetimeutc = fields.racetimeutc;
        this.racenum = fields.racenum;
        this.winchange = 0;
        this.placechange = 0;
        this.eventname = fields.eventname;
        this.fav = fields.fav;
        if (fields.lastten) {
            this.lastten = fields.lastten.substring(fields.lastten.length - 4);
        } else {
            this.lastten = null;
        }
        this.sprites = fields.sprites;
        this.flucs = fields.flucs;
        this.scratchtime = fields.scratchtime;
        this.winProduct = fields.winProduct ? fields.winProduct : 'TIP';
        this.placeProduct = fields.placeProduct ? fields.placeProduct : 'TIP';
    }
}
