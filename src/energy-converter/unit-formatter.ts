class UnitFormatter {
  private static readonly ONE_KILO = 1e3;
  private static readonly ONE_CENTI = 1e-2;
  private static readonly ONE_MILLI = 1e-3;
  private static readonly ONE_MICRO = 1e-6;
  private static readonly ONE_NANO = 1e-9;
  private static readonly ONE_PICO = 1e-12;

  static format(value: number, supportCentiUnit: boolean = true): string {
    if (value >= UnitFormatter.ONE_KILO) {
      return (value / UnitFormatter.ONE_KILO).toFixed(0) + 'k';
    } else if (value >= 1) {
      return value.toFixed(0);
    } else if (value >= UnitFormatter.ONE_CENTI && supportCentiUnit) {
      return (value / UnitFormatter.ONE_CENTI).toFixed(0) + 'c';
    } else if (value >= UnitFormatter.ONE_MILLI) {
      return (value / UnitFormatter.ONE_MILLI).toFixed(0) + 'm';
    } else if (value >= UnitFormatter.ONE_MICRO) {
      return (value / UnitFormatter.ONE_MICRO).toFixed(0) + 'µ';
    } else if (value >= UnitFormatter.ONE_NANO) {
      return (value / UnitFormatter.ONE_NANO).toFixed(0) + 'n';
    } else if (value >= UnitFormatter.ONE_PICO) {
      return (value / UnitFormatter.ONE_PICO).toFixed(0) + 'p';
    } else {
      return '-';
    }
  }
}

export default UnitFormatter;
