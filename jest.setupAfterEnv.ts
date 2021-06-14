import { server } from './mocks/server';
import './mocks/mock-async-storage';
import './mocks/mock-i18n';

declare global {
  let __TEST__;
}

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
