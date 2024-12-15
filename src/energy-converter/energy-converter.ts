import DistanceFormatter from './distance-formatter';
import VolumeFormatter from './volume-formatter';
import energyData, { EnergyEntry, EnergyType } from './data/energy';

export interface EnergyMatch {
  label: string;
  value: string;
}

class EnergyConverter {
  private readonly energyEntries: EnergyEntry[];
  private distanceFormatter: DistanceFormatter;
  private volumeFormatter: VolumeFormatter;

  constructor() {
    this.energyEntries = energyData;
    this.distanceFormatter = new DistanceFormatter();
    this.volumeFormatter = new VolumeFormatter();
  }

  convert(milliWattHour: number): EnergyMatch[] {
    const matches: EnergyMatch[] = [];
    const kiloWattHour = milliWattHour / 1_000_000;

    for (const entry of this.energyEntries) {
      const amount = kiloWattHour / entry.energy_capacity_kwh;
      const msg = this.format(entry, amount);
      matches.push({ label: entry.label, value: msg });
    }

    return matches;
  }

  private format(entry: EnergyEntry, value: number): string {
    switch (entry.type) {
      case EnergyType.VOLUME:
        return this.volumeFormatter.format(value);
      case EnergyType.DISTANCE:
        return this.distanceFormatter.format(value);
      default:
        throw new Error(`Unknown entry type: ${entry.type}`);
    }
  }
}

export default EnergyConverter;
