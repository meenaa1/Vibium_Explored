# Vibium Demo 

A minimal synchronous browser automation demo using Vibium's "sync bridge" API. This repository demonstrates automation of the [Manan](https://manan.numpyninja.com/) medical dashboard, including login, navigation, screenshots, and element verification.

---

## Overview

This demo uses `MananDashboard.js` to:

- Launch a Chrome browser instance  
- Navigate to the Manan app  
- Log in using credentials from `.env`  
- Capture screenshots of key pages  
- Verify dashboard and profile elements  
- Start a new assessment and view previous assessments  
- Log out safely  

**Official Tutorial:** [Vibium Getting Started Guide](https://github.com/VibiumDev/vibium/blob/main/docs/tutorials/getting-started.md)
[Vibium GitHub Repository]

---

## Requirements

- Node.js 18 or newer  
- GUI-enabled environment with local Chrome installation  
- `.env` file with your credentials:

---

## Script Steps

### Launch Manan App
- Opens Chrome and navigates to [Manan](https://manan.numpyninja.com/)

### Login
- Click "Sign In"  
- Enter email & password from `.env`  
- Submit and wait for dashboard  
- Capture `SignedIn.png`

### Navigate Dashboard
- Verify UI elements:  
  - "Start New Assessment"  
  - "View Previous Assessments"  
  - "Usage Statistics"  
  - "Account Settings"  
  - "Subscription Plans"  
  - "Assessment History"  
- Capture `dashboard.png`

### Start New Assessment
- Click "Start New Assessment"  
- Capture `StartNewAssessment.png`

### View Previous Assessments
- Click "View Previous Assessments"  
- Capture `PreviousAssessments.png`

### Click Manan Logo
- Return to dashboard  
- Capture `ClickedManan.png`

### Profile Options & Logout
- Open Profile menu  
- Verify options:  
  - Settings  
  - Previous Assessments  
  - Subscription Plans  
  - Log out  
- Logout and capture `LoggedOut.png`

---

## Output Files

- `SignedIn.png`  
- `dashboard.png`  
- `StartNewAssessment.png`  
- `PreviousAssessments.png`  
- `ClickedManan.png`  
- `LoggedOut.png`
