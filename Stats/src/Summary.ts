import { WinsAnalysis } from './composition/analyzers/WinsAnalysis';
import { ConsoleReport } from './composition/reporters/ConsoleReport';
import { HtmlReport } from './composition/reporters/HtmlReport';
import { MatchData } from './MatchData';

export interface Analyzer {
  run(matches: MatchData[]): string;
}

export interface OutputTarget {
  print(report: string): void;
}

export class Summary {
  constructor(public analyzer: Analyzer, public outputTarget: OutputTarget) {}

  buildAndPrintReport(matches: MatchData[]): void {
    const output = this.analyzer.run(matches);
    this.outputTarget.print(output);
  }

  static winsAnalysisWithHtmlReport(team: string, fileName: string): Summary {
    return new Summary(new WinsAnalysis(team), new HtmlReport(fileName));
  }

  static winsAnalysisWithLogReport(team: string): Summary {
    return new Summary(new WinsAnalysis(team), new ConsoleReport());
  }
}
