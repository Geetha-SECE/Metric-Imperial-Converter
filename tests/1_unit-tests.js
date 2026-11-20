const chai = require('chai');
const ConvertHandler = require('../controllers/convertHandler');

const expect = chai.expect;
const convertHandler = new ConvertHandler();

describe('Unit Tests', () => {
  
  describe('getNum', () => {
    it('whole number input', () => {
      const result = convertHandler.getNum('10L');
      expect(result).to.equal(10);
    });
    
    it('decimal number input', () => {
      const result = convertHandler.getNum('2.5L');
      expect(result).to.equal(2.5);
    });
    
    it('fraction input', () => {
      const result = convertHandler.getNum('1/2L');
      expect(result).to.equal(0.5);
    });
    
    it('decimal fraction input', () => {
      const result = convertHandler.getNum('2.5/6kg');
      expect(result).to.be.closeTo(0.41667, 0.0001);
    });
    
    it('double fraction error', () => {
      const result = convertHandler.getNum('3/7.2/4kg');
      expect(result).to.equal('invalid');
    });
    
    it('missing number defaults to 1', () => {
      const result = convertHandler.getNum('kg');
      expect(result).to.equal(1);
    });
  });
  
  describe('getUnit', () => {
    it('every valid input unit', () => {
      const units = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      units.forEach(unit => {
        const input = `10${unit}`;
        const result = convertHandler.getUnit(input);
        if (unit === 'L') {
          expect(result).to.equal('L');
        } else {
          expect(result).to.equal(unit);
        }
      });
    });
    
    it('invalid input unit', () => {
      const result = convertHandler.getUnit('32g');
      expect(result).to.equal('invalid');
    });
  });
  
  describe('getReturnUnit', () => {
    it('correct return unit for each valid input', () => {
      const conversions = {
        gal: 'L',
        L: 'gal',
        mi: 'km',
        km: 'mi',
        lbs: 'kg',
        kg: 'lbs'
      };
      
      Object.entries(conversions).forEach(([input, expected]) => {
        const result = convertHandler.getReturnUnit(input);
        expect(result).to.equal(expected);
      });
    });
  });
  
  describe('spellOutUnit', () => {
    it('correct spelled-out unit for each valid input', () => {
      const spellings = {
        gal: 'gallons',
        L: 'liters',
        mi: 'miles',
        km: 'kilometers',
        lbs: 'pounds',
        kg: 'kilograms'
      };
      
      Object.entries(spellings).forEach(([unit, expected]) => {
        const result = convertHandler.spellOutUnit(unit);
        expect(result).to.equal(expected);
      });
    });
  });
  
  describe('convert', () => {
    it('gal to L', () => {
      const result = convertHandler.convert(1, 'gal');
      expect(result).to.equal(3.78541);
    });
    
    it('L to gal', () => {
      const result = convertHandler.convert(1, 'L');
      expect(result).to.be.closeTo(0.26417, 0.0001);
    });
    
    it('mi to km', () => {
      const result = convertHandler.convert(1, 'mi');
      expect(result).to.equal(1.60934);
    });
    
    it('km to mi', () => {
      const result = convertHandler.convert(1, 'km');
      expect(result).to.be.closeTo(0.62137, 0.0001);
    });
    
    it('lbs to kg', () => {
      const result = convertHandler.convert(1, 'lbs');
      expect(result).to.equal(0.45359);
    });
    
    it('kg to lbs', () => {
      const result = convertHandler.convert(1, 'kg');
      expect(result).to.be.closeTo(2.20462, 0.0001);
    });
  });
  
});