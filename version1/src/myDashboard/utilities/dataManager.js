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

        // filters (if category filter, if number or time, interval)
        for(let f in filters) {
            result = result.filter(d => {return d[f] == filters[f]});
        }

        // sort (if date)
        for(let i in interval) {
            result.filter(d => {return moment(d.date) > moment(interval.start) && moment(d.date) < moment(interval.end)});
        }

        result.sort((a, b) => {return moment(a.date) - moment(b.date)});

        return result;
    }

    getDataAggregate(fields, valueIndex, filters={}, type) {
        var results = [];

        for(let d in this.data) {
            let e = {};
            for(let f in fields) {
                e[fields[f]] = this.data[d][fields[f]];
            }
            results.push(e);
        }

        for(let f in filters) {
            results = results.filter(d => {return d[f] == filters[f]});
        }

        var results2 = [];

        while(results) {
            var e = results.pop();
            var counter = 0;
            for(let i = results.length-1; i >= 0; i--) {
                if((e) => {
                    for(let j in fields) {
                        if(e[fields[j]] != results[i][fields[j]]) return false; 
                    }
                    return true
                }) {
                    counter++;
                    if(valueIndex) e[valueIndex] += results[i][valueIndex];
                    results.splice(i, 1);
                }
            }
            if(type == "mean") e[valueIndex] = e.valueIndex/counter;
            if(type == "freq") e["freq"] = counter;
            results2.push(e);
        }
        
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