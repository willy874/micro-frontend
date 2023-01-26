import crypto from 'crypto';

for (const key in crypto) {
  (window as any).crypto[key] = crypto[key];
}
