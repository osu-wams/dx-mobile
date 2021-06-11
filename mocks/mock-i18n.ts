jest.mock('i18n-js', () => {
  console.log('mocked i18n');
  return {
    t: (key) => `${key}.test`,
  };
});
