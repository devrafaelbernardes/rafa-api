export const System = () => ({
    random(initial, final) {
        initial = initial ? initial : 0;
        final = final ? final : 1000;
        return Math.floor((Math.random() * (+final - +initial)) + +initial);
    },
    round(value) {
        try {
            if (value) {
                return +(parseFloat(value).toFixed(2));
            }    
        } catch (error) {}
        return 0;
    },
    getBoolean(value) {
        switch (value) {
            case true:
            case "true":
            case 1:
            case "1":
            case "on":
            case "yes":
                return true;
            default:
                return false;
        }
    },
    getLastDate(days) {
        var date = new Date();
        const MILLISECONDS_ONE_DAY = 86400000; //86400000 = 24 * 60 * 60 * 1000
        return new Date(date.getTime() - (days * MILLISECONDS_ONE_DAY)); 
    },
    getDaysDate(days) {
        switch (days) {
            case "daily":
                return 1; // days
            case "weekly":
                return 7;
            case "monthly":
                return 30;
            case "quarter":
                return 90;
            case "semiannually":
                return 180;
            case "yearly":
                return 365;
            default:
                return 0;
        }
    }
});

export default System;