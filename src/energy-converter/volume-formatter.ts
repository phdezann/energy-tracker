import UnitFormatter from './unit-formatter';

class VolumeFormatter {
  format(valueInLiters: number): string {
    return UnitFormatter.format(valueInLiters) + 'L';
  }
}

export default VolumeFormatter;
