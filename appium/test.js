import { remote } from 'webdriverio';

const capabilities = {
  platformName: 'iOS',
  platformVersion: '14.5',
  deviceName: 'iPhone 11', // Change this to the device you want to run
  automationName: 'XCUITest',
  bundleId: 'com.apple.mobilesafari',
  autoAcceptAlerts: true,
};

const options = {
  path: '/wd/hub/',
  port: 4723,
};

async function expoDeepLink13_6(client) {
  const urlFieldSelector = 'label == "Address"';
  const urlField = await client.$(`-ios predicate string:${urlFieldSelector}`);
  await urlField.setValue('exp://127.0.0.1:19000/\uE007');
}

async function handleFirstLaunch(client) {
  try {
    const gotItSelector = 'label == "Got it"';
    const gotIt = await client.$(`-ios predicate string:${gotItSelector}`);
    await gotIt.click();
    const reloadSelector = "type == 'XCUIElementTypeOther' && name CONTAINS 'Reload'";
    const reload = await client.$(`-ios predicate string:${reloadSelector}`);
    await reload.click();
  } catch (err) {
    console.log('No need to handle first launch');
  }
}

async function reloadExpo(client) {
  await client.shake();
  const reloadSelector = "type == 'XCUIElementTypeOther' && name CONTAINS 'Reload'";
  const reload = await client.$(`-ios predicate string:${reloadSelector}`);
  await reload.click();
}

async function launchExpoIOS() {
  const client = await remote({ ...options, capabilities });
  await client.execute('mobile: launchApp', { bundleId: 'com.apple.mobilesafari' });
  await expoDeepLink13_6(client);
  await handleFirstLaunch(client);
  await reloadExpo(client);
  return client;
}

xdescribe('Example Test', () => {
  let client;

  beforeAll(async () => {
    client = await launchExpoIOS();
  }, 120000);

  afterAll(async () => {
    await client.deleteSession();
  });

  // Add tests here
  it('passes', async () => {
    expect(true).toBeTruthy();
  });
});
