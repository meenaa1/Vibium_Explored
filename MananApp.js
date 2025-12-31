const fs = require('fs');
const assert = require('assert');
const { browserSync } = require('vibium');
require('dotenv').config(); 

const vibe = browserSync.launch();

function sleep(ms) {
  const start = Date.now();
  while (Date.now() - start < ms) { }
}

// Read credentials from .env
const email = process.env.MANAN_EMAIL;
const password = process.env.MANAN_PASSWORD;
assert.ok(email, 'MANAN_EMAIL must be set in .env');
assert.ok(password, 'MANAN_PASSWORD must be set in .env');

// ----------------- Launch Manan App -----------------
vibe.go('https://manan.numpyninja.com');
console.log("Loaded Manan's website!");

// ----------------- Login -----------------
const signInButton = vibe.find('button', { text: 'Sign In' });
assert.ok(signInButton, 'Sign In button must be visible');
signInButton.click();
console.log('Clicked Sign In');

const emailInput = vibe.find('#login-username');
assert.ok(emailInput, 'Email input must be visible');
emailInput.type(email);

const passwordInput = vibe.find('#login-password');
assert.ok(passwordInput, 'Password input must be visible');
passwordInput.type(password);

const submitButton = vibe.find('button[type="submit"]');
assert.ok(submitButton, 'Submit button must be visible');
submitButton.click();

sleep(8000); // wait for login
console.log('Signed in!');
fs.writeFileSync('SignedIn.png', vibe.screenshot());
console.log('Saved SignedIn.png');

// ----------------- Navigate to Dashboard -----------------
const dashboardButton = vibe.find('button', { text: 'Dashboard' });
assert.ok(dashboardButton, 'Dashboard button must be visible');
dashboardButton.click();
sleep(3000);
console.log('Navigated to Dashboard!');

// ----------------- Check Dashboard UI Elements -----------------
const elementsToCheck = [
  'Welcome to Your Medical',
  'Access and manage your',
  'Start New Assessment',
  'View Previous Assessments',
  'Usage Statistics',
  'Track your AI analysis usage',
  'Analysis Usage',
  'Free tier allows 20 analyses',
  'Upgrade Now',
  'Recent Assessments',
  'You have no recent',
  'Start your first assessment →',
  'Account Settings',
  'Manage your account settings',
  'Update settings →',
  'Subscription Plans',
  'Upgrade to Premium for',
  'Upgrade now',
  'Assessment History',
  'View your previous medical',
  'View history →'
];

elementsToCheck.forEach(text => {
  const ele = vibe.find('*', { text });
  assert.ok(ele, `Dashboard element must be visible: ${text}`);
  console.log(`Element visible: ${text}`);
});

// ----------------- Start New Assessment -----------------
const startNewSelector = "button.bg-purple-600.h-10.rounded-lg";
const startNew = vibe.find(startNewSelector);

if (startNew) {
  startNew.click();
  console.log('Clicked Start New Assessment');
  fs.writeFileSync('StartNewAssessment.png', vibe.screenshot());
  console.log('Saved screenshot after clicking Start New Assessment');
} else {
  console.warn('Start New Assessment button not found!');
}
sleep(2000);
fs.writeFileSync('StartNewAssessment.png', vibe.screenshot());
console.log('Saved StartNewAssessment.png');

// Go back to Dashboard
const dashboardButton2 = vibe.find('button', { text: 'Dashboard' });
assert.ok(dashboardButton2, 'Dashboard button must be visible');
dashboardButton2.click();
sleep(2000);

// ----------------- View Previous Assessments -----------------
const prevAssessSelector = "button.border.bg-background.text-purple-600.h-10";
const prevAssess = vibe.find(prevAssessSelector);

if (prevAssess) {
  prevAssess.click();
  console.log('Clicked View Previous Assessments');
  fs.writeFileSync('PreviousAssessments.png', vibe.screenshot());
  console.log('Saved screenshot after clicking View Previous Assessments');
} else {
  console.warn('View Previous Assessments button not found!');
}
sleep(2000);
fs.writeFileSync('PreviousAssessments.png', vibe.screenshot());
console.log('Saved PreviousAssessments.png');

//------------------ Back to Dashboard ----------------
const mananLogoSelector = "h1.text-2xl.font-bold.cursor-pointer";
const mananLogo = vibe.find(mananLogoSelector);

if (mananLogo) {
  mananLogo.click();
  console.log('Clicked on Manan logo/title');
  fs.writeFileSync('ClickedManan.png', vibe.screenshot());
  console.log('Saved screenshot after clicking Manan logo');
} else {
  console.warn('Manan logo/title not found!');
}
const dashboardButton3 = vibe.find('button', { text: 'Dashboard' });
assert.ok(dashboardButton3, 'Dashboard button must be visible');
dashboardButton3.click();
sleep(2000);


// ----------------- Profile Options -----------------
const profileLink = vibe.find('button', { text: 'Profile' });
assert.ok(profileLink, 'Profile link must be visible');
profileLink.click();
sleep(1000);

const profileOptions = ['Settings', 'Previous Assessments', 'Subscription Plans', 'Log out'];
profileOptions.forEach(option => {
  const el = vibe.find('button', { text: option });
  assert.ok(el, `Profile option must be visible: ${option}`);
  console.log(`Profile option visible: ${option}`);
});

// ----------------- Logout -----------------

const logoutButton = vibe.find('div[role="menuitem"]', { containsText: 'Log out' });

if (logoutButton) {
  logoutButton.click();
  console.log('Clicked Log out menu item');
  sleep(3000);

  fs.writeFileSync('LoggedOut.png', vibe.screenshot());
  console.log('Saved screenshot after logout');

  const signInAgain = vibe.find('button', { text: 'Sign In' });
  if (signInAgain) console.log('Logout confirmed');
  else console.warn('Logout failed');
} else {
  console.warn('Log out menu item not found! Make sure Profile dropdown is open.');
}

// ----------------- Final Screenshot -----------------
fs.writeFileSync('dashboard.png', vibe.screenshot());
console.log('Saved dashboard.png');
sleep(2000);
// ----------------- Close Browser -----------------
vibe.quit();
console.log('Done!');
