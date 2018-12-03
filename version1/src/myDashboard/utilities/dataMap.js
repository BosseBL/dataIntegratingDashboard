import moment from 'moment';

const dataMap = [
    {
        dname: "id", 
        name: "ID", 
        type: "ID", 
        get: (v) => {return v}
    },
    {
        dname: "cptyName", 
        name: "Name", 
        type: "ENTITY-IDENTIFIER", 
        get: (v) => {return v}
        // ”: ö, „: ä, †: å
    },
    {
        dname: "Pair", 
        name: "ccy1", 
        type: "CATEGORY",
        possibleValues: [
            "USD", "SEK", "EUR", "NOK", "DDK",
        ],
        get: (v) => {return v.substring(0,3)},
    },
    {
        dname: "Pair",
        name: "ccy2", 
        type: "CATEGORY",
        posibleValues: [
            "USD", "SEK", "EUR", "NOK", "DDK",
        ],
        get: (v) => {return v.substring(3, 5)},
    },
    {
        dname: "date", 
        name: "Date", 
        type: "TIME",
        get: (v) => {return moment(v)},
    },
    // yearmonth, month, time, 
    {
        dname: "channel",
        name: "Channel",
        type: "CATHEGORY",
        possibleValues: [
            "QUASAR",
            "BLOOMBERG",
        ],
        get: (v) => {return v},
    },
    {
        dname: "side", 
        name: "Side", 
        type: "CATEGORY", 
        posibleValues: [
            "Buy", 
            "Sell",
        ],
        get: (v) => {return v},
    },
    {
        dname: "riskAmount", 
        name: "Volume", 
        type: "NUMBER",
        get: (v) => {return v},
    },
    {
        dname: "status", 
        name: "Status", 
        type: "CATEGORY", 
        posibleValues: [
            "OD", 
            "OC"
        ],
        get: (v) => {return v},
    },
    {
        dname: "type", 
        name: "Type", 
        type: "CATEGORY",
        posibleValues: [
            "FWD", 
            "SP", 
            "SWAP",
        ],
        get: (v) => {return v},
    },
    {
        dname: "info", 
        name: "Info", 
        type: "TEXT",
        get: (v) => {return v},
    },
];


export default dataMap;