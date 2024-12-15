import EquivalenceConverter from './equivalence-converter';
import { EnergyMatch } from './energy-converter';
import { PowerMatch } from './power-converter';

describe('EquivalenceConverter', () => {
  const equivalenceConverter: EquivalenceConverter = new EquivalenceConverter();

  it('should convert milliWattHour to energy and power matches', () => {
    const oneKWh = 1000;
    const result = equivalenceConverter.convert(oneKWh);
    const energyMatches: EnergyMatch[] = result.energy_matches;
    const powerMatches: PowerMatch[] = result.power_matches;

    expect(energyMatches).toBeDefined();
    expect(powerMatches).toBeDefined();

    expect(energyMatches.length).toEqual(2);
    expect(powerMatches.length).toEqual(14);

    expect(energyMatches[0]).toEqual({ label: 'Gasoline', value: '100µL' });
    expect(powerMatches[0]).toEqual({ label: 'Man digging', message: '6.00 m' });
  });
});
