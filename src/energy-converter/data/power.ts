export interface PowerEntry {
  label: string;
  power_consumption_watt: number;
}

const powerData: PowerEntry[] = [
  {
    'label': 'Man digging',
    'power_consumption_watt': 10,
  },
  {
    'label': 'Man biking',
    'power_consumption_watt': 100,
  },
  {
    'label': 'Soup blender running',
    'power_consumption_watt': 100,
  },
  {
    'label': 'Vacuum cleaner running',
    'power_consumption_watt': 1000,
  },
  {
    'label': 'Horse at work',
    'power_consumption_watt': 1000,
  },
  {
    'label': 'Internal combustion car moving',
    'power_consumption_watt': 53400,
  },
  {
    'label': 'Electric car moving',
    'power_consumption_watt': 15000,
  },
  {
    'label': 'Elevator in operation',
    'power_consumption_watt': 50000,
  },
  {
    'label': 'Construction vehicle in operation',
    'power_consumption_watt': 100000,
  },
  {
    'label': 'Truck moving',
    'power_consumption_watt': 400000,
  },
  {
    'label': 'Train moving',
    'power_consumption_watt': 8800000,
  },
  {
    'label': 'Cruise ship moving',
    'power_consumption_watt': 180000000,
  },
  {
    'label': 'Wind turbine spinning',
    'power_consumption_watt': 20000000,
  },
  {
    'label': 'Plane flying',
    'power_consumption_watt': 100000000,
  },
];

export default powerData;
