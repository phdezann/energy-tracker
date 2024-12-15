export function randomPowerValueGenerator(valueMin: number, valueMax: number, valueVariation: number, valueGroupMin: number, valueGroupMax: number) {
  function generateValue() {
    return Math.floor(valueMin + Math.random() * (valueMax - valueMin));
  }

  function generateMaxCalls() {
    return Math.floor(valueGroupMin + Math.random() * (valueGroupMax - valueGroupMin));
  }

  let currentPowerValue = generateValue();
  let maxCalls = generateMaxCalls();
  let callCount = 0;

  return (): number => {
    if (callCount >= maxCalls) {
      currentPowerValue = generateValue();
      maxCalls = generateMaxCalls();
      callCount = 0;
    } else {
      const change = currentPowerValue * valueVariation;
      currentPowerValue += Math.random() < 0.5 ? -change : change;
      callCount++;
    }
    return Math.floor(currentPowerValue);
  };
}
