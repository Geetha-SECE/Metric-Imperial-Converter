class ConvertHandler {
  constructor() {
    this.units = {
      gal: { name: 'gallons', to: 'L', ratio: 3.78541 },
      L: { name: 'liters', to: 'gal', ratio: 1 / 3.78541 },
      mi: { name: 'miles', to: 'km', ratio: 1.60934 },
      km: { name: 'kilometers', to: 'mi', ratio: 1 / 1.60934 },
      lbs: { name: 'pounds', to: 'kg', ratio: 0.453592 },
      kg: { name: 'kilograms', to: 'lbs', ratio: 1 / 0.453592 }
    };
  }

  getNum(input) {
    const match = input.match(/^([\d\/\.]+)/);
    if (!match) return 1;
    
    const numStr = match[1];
    if (numStr.includes('/')) {
      const parts = numStr.split('/');
      if (parts.length !== 2) return 'invalid';
      const numerator = parseFloat(parts[0]);
      const denominator = parseFloat(parts[1]);
      if (isNaN(numerator) || isNaN(denominator) || denominator === 0) return 'invalid';
      return numerator / denominator;
    }
    
    const num = parseFloat(numStr);
    return isNaN(num) ? 'invalid' : num;
  }

  getUnit(input) {
    const match = input.match(/([a-zA-Z]+)$/);
    if (!match) return 'invalid';
    
    const unit = match[1].toLowerCase();
    if (unit === 'l') return 'L';
    return this.units[unit] ? unit : 'invalid';
  }

  getReturnUnit(initUnit) {
    const unit = initUnit.toLowerCase();
    if (unit === 'l') return 'gal';
    if (this.units[unit]) return this.units[unit].to;
    return 'invalid';
  }

  spellOutUnit(unit) {
    const u = unit.toLowerCase();
    if (u === 'l') return this.units.L.name;
    return this.units[u]?.name || '';
  }

  convert(initNum, initUnit) {
    let unit = initUnit.toLowerCase();
    if (unit === 'l') unit = 'L';
    const ratio = this.units[unit]?.ratio;
    if (!ratio) return 'invalid';
    return Math.round(initNum * ratio * 100000) / 100000;
  }

  getString(initNum, initUnit, returnNum, returnUnit) {
    const initUnitName = this.spellOutUnit(initUnit);
    const returnUnitName = this.spellOutUnit(returnUnit);
    return `${initNum} ${initUnitName} converts to ${returnNum} ${returnUnitName}`;
  }
}

module.exports = ConvertHandler;