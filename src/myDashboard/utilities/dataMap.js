

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
        get: (v) => {return v},
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
    },
    {
        dname: "side", 
        name: "Side", 
        type: "CATEGORY", 
        posibleValues: [
            "Buy", 
            "Sell",
        ],
    },
    {
        dname: "riskAmount", 
        name: "Volume", 
        type: "NUMBER",
    },
    {
        dname: "status", 
        name: "Status", 
        type: "CATEGORY", 
        posibleValues: [
            "OD", 
            "OC"
        ],
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
    },
    {
        dname: "info", 
        name: "Info", 
        type: "TEXT",
    },
];


export default dataMap;