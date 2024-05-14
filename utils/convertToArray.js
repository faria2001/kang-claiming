import fs from 'fs'
import {parseEther} from 'viem'
import { parse } from 'csv-parse';


const addressArray = []

fs.createReadStream('./utils/aaa.csv')
    .pipe(parse({delimiter: ','}))
    .on("data", row => {
        let parseRow = [row[0], parseEther(row[1]).toString()]
        addressArray.push(parseRow)
    })
    .on("end", () => {
        fs.writeFileSync('./utils/addresses.js', JSON.stringify(addressArray))
    })

