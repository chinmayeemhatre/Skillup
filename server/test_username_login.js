const http = require('http');

const body = JSON.stringify({ email: 'chinuu.05', password: 'password123' });

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body)
  }
};

const req = http.request(options, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const result = JSON.parse(data);
    console.log('Status:', res.statusCode);
    console.log('Success:', result.success);
    if (result.success) {
      console.log('User:', result.user.name, '(@' + result.user.username + ')');
    } else {
      console.log('Error:', result.message);
    }
  });
});

req.on('error', e => console.error('Request error:', e.message));
req.write(body);
req.end();
