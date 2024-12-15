class UnitFormatter {
  static format(value: number, showUnit: boolean): string {
    return showUnit ? `${value.toFixed(2)} units` : value.toFixed(2);
  }
}

class FormatterUtils {
  static toUnits(value: number, unit: string): string {
    return `${value.toFixed(2)} ${unit}`;
  }
}

class TimeFormatter {
  format(valueInHours: number): string {
    if (valueInHours >= 1) {
      return FormatterUtils.toUnits(valueInHours, 'h');
    } else if (valueInHours >= 1.0 / 60) {
      return FormatterUtils.toUnits(valueInHours * 60, 'm');
    } else {
      return UnitFormatter.format(valueInHours * 3600, false) + 's';
    }
  }
}

export default TimeFormatter;
