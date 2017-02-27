// uses nodejs to read line by line
const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./data/ICD10_DX_Codes.txt')
})
const fs = require('fs');

// creates a json file to write to
const fd = fs.openSync('./data/ccdw_codes.json', 'w');

// calls a custom formater for the json notation
const jformat = require('./jformat');

// I copy and pasted the dx codes from the pdfs
// used sublime text editor to manually remove the periods
// create an array
const ccdw_codes = require('./ccdw_codes');

let i = 0;
lineReader.on('line', line => {
  console.log(`${line}`);
  if (line.length > 0) {
    i++;
    if (i < 2) { 
      fs.write(fd, '[', (err, written, string) => {
        if (err) {
          console.log(err);
        }
      })
    }
    // read downloaded text file with icd-10 codes
    // if the diagnosis code was in my array it got 
    // written to my json file as an json object
    if (ccdw_codes.indexOf(line.substring(0,8).trim()) !== -1) {
      fs.write(fd, jformat(line), (err, written, string) => {
        if (err) {
          console.log(err);
        }
      });
    }
  }
})
lineReader.on('close', () => {
  fs.write(fd, ']', (err, written, string) => {
    if (err) {
      console.log(err)
    }
  });
})
