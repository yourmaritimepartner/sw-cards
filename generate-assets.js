const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Employee data
const employees = [
  {
    firstName: 'John',
    lastName: 'Dixon',
    email: 'jdixon@shipwright.biz',
    phone: '954-249-0127',
    linkedin: 'https://www.linkedin.com/company/shipwright/',
    website: 'https://www.shipwright.biz'
  },
  {
    firstName: 'Lily',
    lastName: 'Fletcher',
    email: 'lfletcher@shipwright.biz',
    phone: '904-314-0904',
    linkedin: 'https://www.linkedin.com/company/shipwright/',
    website: 'https://www.shipwright.biz'
  },
  {
    firstName: 'Justin',
    lastName: 'Greenberg',
    email: 'jgreenberg@shipwright.biz',
    phone: '954-303-4432',
    linkedin: 'https://www.linkedin.com/company/shipwright/',
    website: 'https://www.shipwright.biz'
  },
  {
    firstName: 'Jakob',
    lastName: 'Michels',
    email: 'jmichels@shipwright.biz',
    phone: '772-485-6417',
    linkedin: 'https://www.linkedin.com/company/shipwright/',
    website: 'https://www.shipwright.biz'
  },
  {
    firstName: 'Corey',
    lastName: 'Page',
    email: 'cpage@shipwright.biz',
    phone: '239-450-0120',
    linkedin: 'https://www.linkedin.com/company/shipwright/',
    website: 'https://www.shipwright.biz'
  }
];

const BASE_URL = 'https://cards.shipwright.biz';
const COMPANY = 'Shipwright';

// Generate slug from name
function toSlug(firstName, lastName) {
  return `${firstName}-${lastName}`.toLowerCase();
}

// Generate vCard content
function generateVCard(employee) {
  const slug = toSlug(employee.firstName, employee.lastName);
  const fullName = `${employee.firstName} ${employee.lastName}`;
  const phoneDigits = employee.phone.replace(/\D/g, '');
  
  return `BEGIN:VCARD
VERSION:3.0
N:${employee.lastName};${employee.firstName};;;
FN:${fullName}
ORG:${COMPANY}
TEL;TYPE=CELL:+1${phoneDigits}
EMAIL;TYPE=WORK:${employee.email}
URL;TYPE=WORK:${employee.website}
URL;TYPE=PREF:${BASE_URL}/${slug}.html
END:VCARD`;
}

// Generate QR code
async function generateQR(employee) {
  const slug = toSlug(employee.firstName, employee.lastName);
  const url = `${BASE_URL}/${slug}.html`;
  const outputPath = path.join(__dirname, 'assets', 'qr', `${slug}-qr.png`);
  
  await QRCode.toFile(outputPath, url, {
    width: 300,
    margin: 2,
    color: {
      dark: '#1a3a5c',  // Navy color from brand
      light: '#ffffff'
    }
  });
  
  console.log(`Generated QR: ${outputPath}`);
}

// Generate vCard file
function generateVCardFile(employee) {
  const slug = toSlug(employee.firstName, employee.lastName);
  const outputPath = path.join(__dirname, 'assets', 'vcards', `${slug}.vcf`);
  const content = generateVCard(employee);
  
  fs.writeFileSync(outputPath, content);
  console.log(`Generated vCard: ${outputPath}`);
}

// Main
async function main() {
  console.log('Generating assets for Shipwright cards...\n');
  
  for (const employee of employees) {
    await generateQR(employee);
    generateVCardFile(employee);
  }
  
  console.log('\nDone! Assets generated in /assets folder.');
}

main().catch(console.error);
