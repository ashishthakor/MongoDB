const {
  calcTip,
  celsiusToFahrenheit,
  fahrenheitToCelsius,
} = require('../src/math');

test('Should calculate total with tip', () => {
  const total = calcTip(10, 0.3);
  expect(total).toBe(13);
});

test('Should calculate total with tip with default', () => {
  const total = calcTip(10.4);
  expect(total).toBe(13);
});

test('Should calculate celsius 0 To Fahrenheit 32', () => {
  const temp = celsiusToFahrenheit(0);
  expect(temp).toBe(32);
});

test('Should calculate fahrenheit 32 To Celsius 0', () => {
  const temp = fahrenheitToCelsius(32);
  expect(temp).toBe(0);
});

//
// Goal: Test temperature conversion functions
//
// 1. Export both functions and load them into test suite
// 2. Create "Should convert 32 F to 0 C"
// 3. Create "Should convert 0 C to 32 F"
// 4. Run the Jest to test your work!
