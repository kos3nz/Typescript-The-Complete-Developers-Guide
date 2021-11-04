import { CsvFileReader } from './composition/CsvFileReader';
import { MatchReader } from './composition/MatchReader';
import { MatchResult } from './MatchResult';

// NOTE: Favor object composition over class inheritance, and do not misunderstand the concept!!

// Create an object that satisfies the 'DataReader' interface
const csvFileReader = new CsvFileReader('football.csv');

// Create an instance of MatchReader and pass in something satisfying
// the 'DataReader' interface
const matchReader = new MatchReader(csvFileReader);
matchReader.load();

let manUtdWins = 0;

for (let match of matchReader.matches) {
  if (match[1] === 'Man United' && match[5] === MatchResult.HomeWin)
    manUtdWins++;
  if (match[2] === 'Man United' && match[5] === MatchResult.AwayWin)
    manUtdWins++;
}

console.log(`Man United won ${manUtdWins} games`);
