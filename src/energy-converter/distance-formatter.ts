import UnitFormatter from './unit-formatter';

class DistanceFormatter {
  format(valueInKilometers: number): string {
    return UnitFormatter.format(valueInKilometers * 1000) + 'm';
  }
}

export default DistanceFormatter;
