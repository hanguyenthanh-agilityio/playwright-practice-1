# 🎭 Playwright Automation Training – SauceDemo

This repository is part of a structured **Playwright training program** designed to build practical knowledge of the Playwright framework through hands-on implementation and best practices.

The training focuses on real-world test automation scenarios using modern JavaScript/TypeScript standards.

---

# 📌 OVERVIEW

This document presents a comprehensive training plan for the Playwright framework, detailing key concepts, best practices, and step-by-step guidance to enhance proficiency in its implementation.

The plan highlights key focus areas to streamline training, primarily based on the official Playwright documentation.

---

# ⏳ TIMELINE

**Total Duration:** 1 Week

---

# 🎯 TARGETS

### 1. Codebase Structure
- Set up essential configurations for the testing environment
- Understand folder structure and config files
- Organize tests in a scalable structure

### 2. Test Case Development
- Create test cases using appropriate locators
- Simulate real user actions
- Cover positive and negative scenarios

### 3. Assertions
- Define clear and accurate expectations
- Validate UI states and behaviors
- Ensure reliable test verification

### 4. Tools for Debug & Troubleshooting
- Use Playwright Trace Viewer
- Use Playwright Inspector
- Analyze logs, screenshots, and video recordings

---

# ⚡ PLAYWRIGHT (Summary)

Playwright is a modern end-to-end testing framework for web applications.  
It supports multiple browsers (Chromium, Firefox, WebKit) and provides powerful features such as auto-waiting, built-in assertions, trace viewer, and parallel execution.

In this training, Playwright is used to:

- Automate UI workflows
- Validate user interactions
- Build maintainable test architecture
- Debug and analyze failures effectively

---

# 🚀 Getting Started

## 1️⃣ Clone the repository

```bash
git clone git@gitlab.asoft-python.com:ha.nguyenthanh/playwright-training.git
cd saucedemo
```

---

## 2️⃣ Install dependencies

```bash
pnpm install
```

---

## 3️⃣ Install Playwright browsers

```bash
npx playwright install
```

---

# ▶️ Running Tests

## ✅ Run all tests

```bash
npx playwright test
```

---

## ✅ Run a specific test file

```bash
npx playwright test tests/login.spec.ts
```

---

## ✅ Run a specific test by title

```bash
npx playwright test -g "User can login successfully"
```

---

## ✅ Run tests in headed mode (see browser UI)

```bash
npx playwright test --headed
```

---

## ✅ Run in debug mode

```bash
npx playwright test --debug
```

---

## ✅ Run on specific browser

```bash
npx playwright test --project=chromium
```

---

# 📊 Viewing Test Reports

After running tests, open the HTML report:

```bash
npx playwright show-report
```

---

# 🏁 Conclusion

This training provides a structured, practical roadmap to mastering Playwright within one week by combining:

- Theory
- Hands-on practice
- Real implementation
- Debugging exercises
- Best practices

The goal is to build a scalable, maintainable, and production-ready automation mindset.

Happy Testing 🚀