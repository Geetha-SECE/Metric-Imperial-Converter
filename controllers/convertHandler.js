
class ConvertHandler {
  constructor() {
    this.units = {
      gal: {
        name: 'gallons',
        returnUnit: 'L',
        factor: 3.78541
      },
      L: {
        name: 'liters',
        returnUnit: 'gal',
        factor: 0.264172
      },
      mi: {
        name: 'miles',
        returnUnit: 'km',
        factor: 1.60934
      },
      km: {
        name: 'kilometers',
        returnUnit: 'mi',
        factor: 0.621371
      },
      lbs: {
        name: 'pounds',
        returnUnit: 'kg',
        factor: 0.453592
      },
      kg: {
        name: 'kilograms',
        returnUnit: 'lbs',
        factor: 2.20462
      }
    };
  }

  // Extract and validate the numerical part
  getNum(input) {
    const firstLetter = input.search(/[a-zA-Z]/);

    let numString =
      firstLetter === -1
        ? input
        : input.substring(0, firstLetter);

    if (numString === '') {
      return 1;
    }

    const numberPattern =
      /^(\d+(\.\d*)?|\.\d+)(\/(\d+(\.\d*)?|\.\d+))?$/;

    if (!numberPattern.test(numString)) {
      return 'invalid';
    }

    if (numString.includes('/')) {
      const parts = numString.split('/');

      const numerator = Number(parts[0]);
      const denominator = Number(parts[1]);

      if (denominator === 0) {
        return 'invalid';
      }

      return numerator / denominator;
    }

    return Number(numString);
  }

  // Extract and validate the unit
  getUnit(input) {
    const match = input.match(/[a-zA-Z]+$/);

    if (!match) {
      return 'invalid';
    }

    const unit = match[0].toLowerCase();

    if (unit === 'l') {
      return 'L';
    }

    return this.units[unit] ? unit : 'invalid';
  }

  // Find the corresponding return unit
  getReturnUnit(initUnit) {
    const unit =
      initUnit.toLowerCase() === 'l' ? 'L' : initUnit.toLowerCase();

    return this.units[unit]
      ? this.units[unit].returnUnit
      : 'invalid';
  }

  // Convert unit abbreviation into its full name
  spellOutUnit(unit) {
    const normalized =
      unit.toLowerCase() === 'l' ? 'L' : unit.toLowerCase();

    return this.units[normalized]
      ? this.units[normalized].name
      : '';
  }

  // Perform conversion and round to 5 decimal places
  convert(initNum, initUnit) {
    const unit =
      initUnit.toLowerCase() === 'l' ? 'L' : initUnit.toLowerCase();

    if (!this.units[unit]) {
      return 'invalid';
    }

    const result = initNum * this.units[unit].factor;

    return Number(result.toFixed(5));
  }

  // Generate conversion result string
  getString(initNum, initUnit, returnNum, returnUnit) {
    const initUnitString = this.spellOutUnit(initUnit);
    const returnUnitString = this.spellOutUnit(returnUnit);

    return `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
  }
}

module.exports = ConvertHandler;
