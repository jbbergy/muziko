const fs = require('fs');

export function getfiles() {
  return fs.readdirSync('H:/MUSIQUE');
}