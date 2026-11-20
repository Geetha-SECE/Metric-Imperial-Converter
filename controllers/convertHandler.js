
class ConvertHandler {
  constructor() {
    this.units = {
      gal: { name: 'gallons', returnUnit: 'L', factor: 3.78541 },
      L: { name: 'liters', returnUnit: 'gal', factor: 0.264172 },
      mi: { name: 'miles', returnUnit: 'km', factor: 1.60934 },
      km: { name: 'kilometers', returnUnit: 'mi', factor: 0.621371 },
      lbs: { name: 'pounds', returnUnit: 'kg', factor: 0.453592 },
      kg: { name: 'kilograms', returnUnit: 'lbs', factor: 2.20462 }
    };
  }

  getNum(input) {
    const firstLetter = input.search(/[a-zA-Z]/);
    const numString = firstLetter === -1
      ? input
      : input.substring(0, firstLetter);

    if (numString === '') return 1;

    const pattern =
      /^(\d+(\.\d*)?|\.\d+)(\/(\d+(\.\d*)?|\.\d+))?$/;

    if (!pattern.test(numString)) return 'invalid';

    if (numString.includes('/')) {
      const parts = numString.split('/');
      const numerator = Number(parts[0]);
      const denominator = Number(parts[1]);

      if (denominator === 0) return 'invalid';

      return numerator / denominator;
    }

    return Number(numString);
  }

  getUnit(input) {
    const match = input.match(/[a-zA-Z]+$/);

    if (!match) return 'invalid';

    const unit = match[0].toLowerCase();

    if (unit === 'l') return 'L';

    return this.units[unit] ? unit : 'invalid';
  }

  getReturnUnit(initUnit) {
    const unit = initUnit.toLowerCase() === 'l'
      ? 'L'
      : initUnit.toLowerCase();

    return this.units[unit]
      ? this.units[unit].returnUnit
      : 'invalid';
  }

  spellOutUnit(unit) {
    const normalized = unit.toLowerCase() === 'l'
      ? 'L'
      : unit.toLowerCase();

    return this.units[normalized]
      ? this.units[normalized].name
      : '';
  }

  convert(initNum, initUnit) {
    const unit = initUnit.toLowerCase() === 'l'
      ? 'L'
      : initUnit.toLowerCase();

    if (!this.units[unit]) return 'invalid';

    const result = initNum * this.units[unit].factor;

    return Number(result.toFixed(5));
  }

  getString(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  }
}

module.exports = ConvertHandler;
