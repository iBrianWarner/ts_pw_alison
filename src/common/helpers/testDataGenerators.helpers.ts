import { faker } from '@faker-js/faker';

export function generateIP(): string {
  const ip = faker.internet.ipv4({ cidrBlock: '192.168.0.0/16' });

  return ip;
}
