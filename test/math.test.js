const {
  calcTip,
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  add,
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

// test('Async test Demo', (done) => {
//   setTimeout(() => {
//     expect(1).toBe(2);
//     done();
//   }, 2000);
// });

test('should add 2 number', (done) => {
  add(2, 3).then((sum) => {
    expect(sum).toBe(5);
    done();
  });
});

test('should add two numbers async/await', async () => {
  const sum = await add(10, 22);
  expect(sum).toBe(32);
});
