import { MatchReader } from './composition/MatchReader';
import { Summary } from './Summary';

// NOTE: Favor object composition over class inheritance, and do not misunderstand the concept!!

const matchReader = MatchReader.fromCsv('football.csv');
const summaryLog = Summary.winsAnalysisWithLogReport('Man United');
const summaryHtml = Summary.winsAnalysisWithHtmlReport(
  'Man United',
  'report.html'
);

matchReader.load();
summaryLog.buildAndPrintReport(matchReader.matches);
summaryHtml.buildAndPrintReport(matchReader.matches);
