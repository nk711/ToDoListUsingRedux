import wd from 'wd';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
const PORT = 4723;

const config = { 
    platformName: "Android",
    platformVersion: "9",
    deviceName: "Galaxy Tab Active2",
    app: "C:/React-Native/ToDoListUsingRecoil/android/app/build/outputs/apk/debug/app-debug.apk",
    automationName: "UiAutomator2"
}

const driver = wd.promiseChainRemote('localhost', PORT);

beforeAll(async () => {
    await driver.init(config);
})


test('Test Accessibilty Id', async () => {
    expect(await driver.elementById('AddCard-Button')).toBe(true);

});

test('Test Accessibilty Id2', async () => {
    expect(await driver.elementById('AddCard-Input')).toBe(true);

});