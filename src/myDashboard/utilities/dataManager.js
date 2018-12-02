import dataMap from './dataMap';
import csv from 'csv';
import moment from 'moment';

class LocalDataManager {
    constructor() {
        this.data = [];
        this.dataMap = dataMap
    }

    loadData(files, andThen) {
        if(files.length > 1) console.log("too many files");
        var file = files[0];
        var fr = new FileReader();
        var newData = [];
        fr.onload = e => {
            csv.parse(e.target.result, (err, data) => {
                console.log(e);
                let names = data[0];
                for(var i = 1; i < data.length; i++) {
                    newData.push({});
                    for(var j = 0; j < names.length; j++) {
                        newData[i-1][names[j]] = data[i][j]; 
                    }
                }
                this.data = newData;
                andThen();
            });
        };
        fr.readAsText(file);
    }

    resetData() {
        this.data = [];
    }

    setData(d) {
        this.data = d;
    }
    getDataFields() {
        return this.dataMap.map((e) => {return e.name});
    }
    getNames() {
        return Array.from(new Set(this.getData(["cptyName"], [], []).map((e) => {return e.cptyName}))).sort();
    }
    getData(fields=this.getDataFields(), filters={}, sortList=["Date"]) {
        return this.data;
    }

    getDataFilter(fields=this.getDataFields(), filters={}, sortList=["date"], interval={}) {
        var result = [];

        // fields
        for(let d in this.data) {
            let e = {};
            for(let f in fields) {
                e[fields[f]] = this.data[d][fields[f]];
            }
            result.push(e);
        }

        console.log(result);

        // filters (if category filter, if number or time, interval)
        for(let f in filters) {
            result = result.filter(d => {return d[f] == filters[f]});
        }

        console.log(result);

        // sort (if date)
        for(let i in interval) {
            result.filter(d => {return moment(d.date) > moment(interval.start) && moment(d.date) < moment(interval.end)});
        }
        
        console.log(result);

        result.sort((a, b) => {return moment(a.date) - moment(b.date)});

        console.log(result);

        return result;
    }

    isLoaded() {
        if(this.data) return true;
        else return false; 
    }
}

class RemoteDataManager {
    constructor() {
        this.data = [];
        this.dataMap = dataMap
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
        return [
            {name: "alfa"},
            {name: "beta"},
            {name: "gama"},
            {name: "delta"},
        ];
    }
}

var localDataManager = new LocalDataManager();
var remoteDataManager = new RemoteDataManager();

export  {localDataManager, remoteDataManager};