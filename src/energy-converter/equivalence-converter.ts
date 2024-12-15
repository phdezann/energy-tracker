import EnergyConverter, { EnergyMatch } from './energy-converter';
import PowerConverter, { PowerMatch } from './power-converter';

export type EquivalenceResult = {
  energy_matches: EnergyMatch[];
  power_matches: PowerMatch[];
};

class EquivalenceConverter {
  private energyConverter: EnergyConverter;
  private powerConverter: PowerConverter;

  constructor() {
    this.energyConverter = new EnergyConverter();
    this.powerConverter = new PowerConverter();
  }

  convert(milliWattHour: number): EquivalenceResult {
    const energyMatches = this.energyConverter.convert(milliWattHour);
    const powerMatches = this.powerConverter.convert(milliWattHour);
    return { energy_matches: energyMatches, power_matches: powerMatches };
  }
}

export default EquivalenceConverter;
