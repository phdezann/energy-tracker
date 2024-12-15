import powerData, { PowerEntry } from './data/power';
import TimeFormatter from './time-formatter';

export interface PowerMatch {
  label: string;
  message: string;
}

class PowerConverter {
  private readonly powerEntries: PowerEntry[];
  private timeFormatter: TimeFormatter;

  constructor() {
    this.powerEntries = powerData;
    this.timeFormatter = new TimeFormatter();
  }

  convert(milliWattHour: number): PowerMatch[] {
    const matches: PowerMatch[] = [];
    const wattHour = milliWattHour / 1000;

    for (const entry of this.powerEntries) {
      const hours = wattHour / entry.power_consumption_watt;
      const msg = this.timeFormatter.format(hours);
      matches.push({ label: entry.label, message: msg });
    }

    return matches;
  }
}

export default PowerConverter;
