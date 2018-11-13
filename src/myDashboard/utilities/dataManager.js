

class LocalDataManager {
    constructor() {
        this.data = [];
        this.dataMap = [
            {
                dname: "id", 
                name: "ID", 
                type: "ID", 
                get: (v) => {return v}
            },
            {
                dname: "name", 
                name: "Name", 
                type: "ENTITY-IDENTIFIER", 
                get: (v) => {return v}
            },
            {
                dname: "pair", 
                name: "From", 
                type: "CATEGORY",
                possibleValues: [
                    "USD", "SEK", "EUR",
                ],
                get: (v) => {return v.substring(0,3)},
            },
            {
                dname: "pair",
                name: "Too", 
                type: "CATEGORY",
                posibleValues: [
                    "USD", "SEK", "EUR",
                ],
                get: (v) => {return v.substring(3, 5)},
            },
            {
                dname: "date", 
                name: "Date", 
                type: "TIME",
            },
            {
                dname: "side", 
                name: "Side", 
                type: "CATEGORY", 
                posibleValues: [
                    "buy", 
                    "sell",
                ],
            },
            {
                dname: "volume", 
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
                posibleValues = [
                    "fwd", 
                    "sp", 
                    "swp"
                ],
            },
            {
                dname: "info", 
                name: "Info", 
                type: "CATEGORY",
                possibleValues: [
                    "",
                    "RULE",
                    "CANCELLED",
                ], 
            },
        ];
    }

    setData(d) {
        this.data = d;
    }

    getDataFields() {
        return this.dataMap.map((e) => {return e.name});
    }

    getNames() {
        return Array.from(new Set(this.getData(["name"], [], []).map((e) => {return e.name}))).sort();
    }

    getData(fields=this.getDataFields(), filters=[], sortList=["Date"]) {


    }

}