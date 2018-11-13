import React from "react";

class FileManager {    
        readFiles(files) {
            if(files.length > 1) console.log("too many files");
            else console.log(files);
            var file = files[0];
            var fr = new FileReader();
            var newData = [];
            fr.onload = e => {
                var content = e.target.result;
                csv.parse(e.target.result, (err, data) => {
                    console.log(err, data);
                    let names = data[0];
                    for(var i = 1; i < data.length; i++) {
                        newData.push({});
                        for(var j = 0; j < names.length; j++) {
                            newData[i-1][names[j]] = data[i][j]; 
                        }
                    }
                });
            };
            fr.readAsText(file);
            return newData;
        }
}

export default FileManager;