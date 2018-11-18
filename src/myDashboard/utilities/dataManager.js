import dataMap from './dataMap';
import csv from 'csv';
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
            var content = e.target.result;
            csv.parse(e.target.result, (err, data) => {
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
        return this.data;
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
    }
}

function createLocalDataManager() {return new LocalDataManager();} 

var localDataManager = new LocalDataManager();
var remoteDataManager = new RemoteDataManager();

export var localDataManager;
export var remoteDataManager;