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

    fieldsEqual(fields, e, d) {
        for(let j in fields) {
            if(e[fields[j]] != d[fields[j]]) {
                return false;
            }
        }
        return true;
    }

    filterEqual(filter, d) {
        for(let e in filter) {
            if(d[e] != filter[e]) return false;
        }
        return true;
    }

    inInterval(interval, d) {
        if(interval != []) {
            var date = moment(d["date"]);
            if(date >= moment(interval[0]) && date <= moment(interval[1])) return true;
            else return false;
        }
        return true;
    }

    getDataAggregate(fields, valueIndex, filters={}, type, interval=[]) {
        var results = [];

        for(let d in this.data) {
            let e = {};
            if(this.filterEqual(filters, this.data[d]) && this.inInterval(interval, this.data[d])) {
                for(let f in fields) {
                    e[fields[f]] = this.data[d][fields[f]];
                }
                e[valueIndex] = Number(this.data[d][valueIndex]);
                results.push(e);
            }
        }

        for(let f in filters) {
            results = results.filter(d => {return d[f] == filters[f]});
        }

        var results2 = [];

        while(results.length > 0) {
            var e = results.pop();
            var counter = 0;
            for(let i = results.length-1; i >= 0; i--) {
                if(this.fieldsEqual(fields, e, results[i])) {
                    counter++;
                    e[valueIndex] += results[i][valueIndex];
                    results.splice(i, 1);
                }
            }
            if(type == "mean") e[valueIndex] = e.valueIndex/counter;
            if(type == "freq") e["freq"] = counter;
            results2.push(e);
        }

        return results2;
        
    }

    getDataAggregateTime(valueIndex, filters={}, timeSteps="month", interval=[]) {
        var results = [];
        for(let d in this.data) {
            var e = {};
            if(this.filterEqual(filters, this.data[d]) && this.inInterval(interval, this.data[d])) {
                e[valueIndex] = Number(this.data[d][valueIndex]);
                e.date = this.data[d].date;
                results.push(e);
            }
        }

        results.sort((a, b) => {return moment(a.date) - moment(b.date)});

        
        for(var i = results.length-2; i >= 0; i--) {
            if(moment(results[i+1].date)[timeSteps]() == moment(results[i].date)[timeSteps]()) {
                results[i][valueIndex] += results[i+1][valueIndex];
                results.splice(i+1, 1);
            }
        }

        var format = "";
        if(timeSteps == "month") format = "YYYY-MM";
        else if(timeSteps == "year") format = "YYYY";
        else format = "YYYY-MM-DD HH:mm:ss";

        for(let e in results) {
            results[e].date = moment(results[e].date).format(format);
        }
        
        return results;
    }

    getDataPie(categoryIndex, valueIndex,  filter, interval) {
        var results = [];

        for(let d in this.data) {
            let e = {};
            if(this.filterEqual(filter, this.data[d]) && this.inInterval(interval, this.data[d])) {
                e[categoryIndex] = this.data[d][categoryIndex];
                e[valueIndex] = Number(this.data[d][valueIndex]);
                results.push(e);
            }
        }

        var results2 = [];
        var setList = this.getSetOfValues(categoryIndex, results);
        for(let v in setList) {
            let n = {}
            let value = 0;
            for(let i in results) {
                if(results[i][categoryIndex] === setList[v]) value += results[i][valueIndex];                
            }
            n[categoryIndex] = setList[v];
            n[valueIndex] = value;
            results2.push(n);
        }
        return results2;
    }

    getSetOfValues(field, data) {
        return Array.from(new Set(data.map(e => {return e[field]})));
    }

    generateTree(h, data, valueIndex) {
        var result = [];
        var hierarchy = Array.from(h);
        var field = hierarchy.shift();
        var setList = this.getSetOfValues(field, data);
        for(let v in setList) {
            var filteredData = data.filter(e => {return e[field] == setList[v]})
            if(hierarchy.length > 0) result.push({name: setList[v], children: this.generateTree(hierarchy, filteredData, valueIndex)});
            else result.push({name: setList[v], value: filteredData.map(e => {return Number(e[valueIndex])}).reduce((a,b) => {return a + b}, 0)})
        }
        return result;
    }

    getDataTree(valueIndex ,hierarchy, filters = {}, interval = [], ) {
        var results = [];
        for(let d in this.data) {
            var e = {};
            if(this.filterEqual(filters, this.data[d]) && this.inInterval(interval, this.data[d])) {
                e[valueIndex] = Number(this.data[d][valueIndex]);
                for(let h in hierarchy) {
                    e[hierarchy[h]] = this.data[d][hierarchy[h]];
                }
                results.push(e);
            }
        }

        var tree = this.generateTree(hierarchy, results, valueIndex);

        return tree;
    }

    sumFilter(filter, valueIndex, data) {
        var sum = 0;
        for(let d in data) {
            if(this.filterEqual(filter, data[d])) {
                sum += Number(data[d][valueIndex]);
            }
        }
        return sum;
    }

    getDataTable(interval, filter) {
        var results = [];
        for(let d in this.data) {
            var e = {};
            if(this.filterEqual(filter, this.data[d]) && this.inInterval(interval, this.data[d])) {
                e["Pair"] = this.data[d]["Pair"];
                e["status"] = this.data[d]["status"];
                e["riskAmount"] = this.data[d]["riskAmount"];
                e["earnings"] = this.data[d]["earnings"];
                results.push(e);
            }
        }

        var results2 = [];
        var setList = this.getSetOfValues("Pair", results);

        for(let s in setList) {
            var e = {};
            e.Pair = setList[s];
            e.deal = this.sumFilter({Pair: e.Pair, status: "OD"}, "riskAmount", results);
            e.NoDeal = this.sumFilter({Pair: e.Pair, status: "OC"}, "riskAmount", results);
            e.earnings = this.sumFilter({Pair: e.Pair}, "earnings", results);
            results2.push(e);
        }
        return results2;
    }

    getTrend(data) {
        function reducer(acc, c) {return acc + c}
        var meanX = data.map(d => {return d.x}).reduce(reducer)/(1.0*data.length)
        var meanY = data.map(d => {return d.y}).reduce(reducer)/(1.0*data.length)
        var ssXX = data.map(d => {return (d.x-meanX)**2}).reduce(reducer)
        var ssXY = data.map(d => {return (d.x - meanX)*(d.y-meanY)}).reduce(reducer)
        return ssXY/ssXX
    }

    getDataList(filter, interval) {
        var results = [];
        for(let d in this.data) {
            var e = {};
            if(this.filterEqual(filter, this.data[d]) && this.inInterval(interval, this.data[d])) {
                e["date"] = this.data[d]["date"];
                e["Pair"] = this.data[d]["Pair"];
                e["status"] = this.data[d]["status"];
                e["type"] = this.data[d]["type"];
                e["riskAmount"] = this.data[d]["riskAmount"];
                e["earnings"] = this.data[d]["earnings"];
                results.push(e);
            }
        }

        results.sort((a, b) => {return moment(a.date) - moment(b.date)});

        var volume = this.sumFilter({status:"OD"}, "riskAmount", results);
        var totalVolume = this.sumFilter({}, "riskAmount", results);
        var earningsTrend = this.getTrend(results.map(e => {return {x: moment(e.date).month(), y: Number(e.earnings)}}))
        var volumeTrend = this.getTrend(results.filter(e => {return e.status === "OD"}).map(e => {return {x: moment(e.date).month(), y: Number(e.riskAmount)}}))
        var askedVolumeTrend = this.getTrend(results.map(e => {return {x: moment(e.date).month(), y: Number(e.riskAmount)}}))
        var HRTrend = volumeTrend/askedVolumeTrend

        var results2 = [
            {name: "Earnings", value: this.sumFilter({}, "earnings", results), trend: earningsTrend},
            {name: "Volume", value: volume, trend: volumeTrend},
            {name: "Asked Volume", value: totalVolume, trend: askedVolumeTrend},
            {name: "Hit Ratio", value: Math.floor((volume/totalVolume)*100), trend: HRTrend},
        ];
        return results2;
    }


    getDataGraph(interval, filter) {
        var results = [];
        for(let d in this.data) {
            var e = {};
            if(this.filterEqual(filter, this.data[d]) && this.inInterval(interval, this.data[d])) {
                e["Pair"] = this.data[d]["Pair"];
                e["status"] = this.data[d]["status"];
                e["riskAmount"] = this.data[d]["riskAmount"];
                results.push(e);
            }
        }

        var results2 = {};
        var setList = this.getSetOfValues("Pair", results);
        results2.links = [];
        let stlist = [];

        for(let s in setList) {
            var e = {};
            e.volume = this.sumFilter({Pair: setList[s], status: "OD"}, "riskAmount", results);
            e.source = setList[s].substring(0,3)
            e.target = setList[s].substring(3, 6)
            stlist.push(e.source)
            stlist.push(e.target)
            results2.links.push(e);
        }

        setList = Array.from(new Set(stlist));
        results2.nodes = setList.map(e => {return {name: e}});

        return results2;
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