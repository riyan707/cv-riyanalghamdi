const QRCode = require('qrcode');
const path = require('path');

QRCode.toFile(
  path.join(__dirname, '../public/qr.png'),
  'https://cv.riyanalghamdi.com',
  {
    width: 1000,
    color: {
      dark: '#FFFFFF',
      light: '#0D0D0D',
    },
    margin: 0,
  },
  (err) => {
    if (err) {
      console.error('Error generating QR code:', err);
      process.exit(1);
    }
    console.log('QR code generated: public/qr.png');
  }
);
