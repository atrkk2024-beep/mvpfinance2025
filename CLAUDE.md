# CLAUDE.md - AI Assistant Guide for mvpfinance2025

This document serves as a comprehensive guide for AI assistants working on the mvpfinance2025 project.

## Project Overview

**mvpfinance2025** is a finance application MVP (Minimum Viable Product) repository. This is a new project currently in its initial setup phase.

### Repository Information
- **Name:** mvpfinance2025
- **Status:** Initial setup / New project
- **Current Branch:** `claude/claude-md-mir8zy0h5muuakzb-01SgHSwm4YbZ3724vseewh2V`
- **Last Updated:** 2025-12-04

## Current Repository State

This repository is in its initial state with minimal structure:
- `README.md` - Basic project identifier
- `.git/` - Git version control
- `CLAUDE.md` - This file (AI assistant guide)

## Project Structure (To Be Established)

As this is a new project, the following structure is recommended for a modern finance application:

```
mvpfinance2025/
├── .github/              # GitHub Actions workflows and templates
│   └── workflows/
├── src/                  # Source code
│   ├── components/       # Reusable UI components
│   ├── pages/           # Page components or views
│   ├── services/        # Business logic and API services
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript type definitions
│   ├── hooks/           # Custom React hooks (if React is used)
│   ├── contexts/        # React contexts (if React is used)
│   └── config/          # Configuration files
├── public/              # Static assets
├── tests/               # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/                # Documentation
├── scripts/             # Build and utility scripts
├── .gitignore           # Git ignore rules
├── package.json         # Node.js dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── README.md            # Project documentation
└── CLAUDE.md            # This file
```

## Technology Stack Recommendations

Based on the finance application nature, consider:

### Frontend
- **Framework:** React, Next.js, or Vue.js
- **Language:** TypeScript (strongly recommended for type safety in financial applications)
- **Styling:** Tailwind CSS, Material-UI, or CSS Modules
- **State Management:** React Context, Redux Toolkit, or Zustand
- **Charts/Visualization:** Chart.js, Recharts, or D3.js

### Backend (if applicable)
- **Runtime:** Node.js with Express or Fastify
- **Database:** PostgreSQL, MongoDB, or Supabase
- **Authentication:** JWT, OAuth 2.0, or Auth0
- **API:** REST or GraphQL

### Development Tools
- **Package Manager:** npm, yarn, or pnpm
- **Linting:** ESLint with TypeScript support
- **Formatting:** Prettier
- **Testing:** Jest, Vitest, React Testing Library
- **E2E Testing:** Playwright or Cypress
- **Version Control:** Git with conventional commits

## Development Workflow

### Branch Strategy
- **Development Branch:** Feature branches prefixed with `claude/`
- **Naming Convention:** `claude/claude-md-<unique-id>`
- **Main Branch:** To be established (typically `main` or `master`)

### Commit Guidelines
Follow conventional commits:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example:
```bash
git commit -m "feat: add transaction history component"
git commit -m "fix: resolve currency conversion rounding error"
```

### Git Operations
- Always push to designated feature branches
- Use: `git push -u origin <branch-name>`
- Branch names must start with `claude/` for AI assistant work
- Retry failed pushes up to 4 times with exponential backoff (2s, 4s, 8s, 16s)

## Coding Conventions

### General Principles
1. **Security First:** Finance applications require extra security considerations
   - Never expose sensitive data (API keys, secrets) in code
   - Validate all user inputs
   - Sanitize data before database operations
   - Implement proper authentication and authorization
   - Use HTTPS for all API calls
   - Follow OWASP security guidelines

2. **Type Safety:** Use TypeScript for all code
   - Define explicit types for financial data
   - Avoid `any` types
   - Use interfaces for complex objects
   - Define strict type checking in tsconfig.json

3. **Precision:** Financial calculations require special care
   - Never use floating-point arithmetic for money
   - Use libraries like `decimal.js` or `big.js` for currency calculations
   - Always round according to currency rules
   - Store amounts in smallest currency unit (cents, not dollars)

4. **Testing:** Comprehensive testing is critical
   - Unit tests for all business logic
   - Integration tests for API endpoints
   - E2E tests for critical user flows
   - Aim for >80% code coverage

5. **Error Handling:**
   - Always handle errors gracefully
   - Log errors with sufficient context
   - Display user-friendly error messages
   - Never expose stack traces to end users

### Code Style
- Use 2 or 4 spaces for indentation (be consistent)
- Maximum line length: 100 characters
- Use meaningful variable names
- Write self-documenting code
- Add comments only when logic is complex
- Use async/await over promises
- Prefer functional programming patterns

### Naming Conventions
- **Files:** kebab-case (`transaction-list.ts`)
- **Components:** PascalCase (`TransactionList.tsx`)
- **Functions:** camelCase (`calculateTotal()`)
- **Constants:** UPPER_SNAKE_CASE (`MAX_TRANSACTION_AMOUNT`)
- **Interfaces/Types:** PascalCase with `I` prefix optional (`Transaction` or `ITransaction`)

## Financial Application Best Practices

### Data Handling
```typescript
// Good: Using integers for currency amounts
interface Transaction {
  id: string;
  amountCents: number;  // Store in cents
  currency: string;     // ISO 4217 code (USD, EUR, etc.)
  timestamp: Date;
}

// Bad: Using floats for currency
interface Transaction {
  id: string;
  amount: number;  // ❌ Floating point precision issues
}
```

### Currency Formatting
```typescript
// Use Intl.NumberFormat for display
const formatCurrency = (amountCents: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amountCents / 100);
};
```

### Security Checklist
- [ ] Input validation on all forms
- [ ] SQL injection prevention (use parameterized queries)
- [ ] XSS prevention (sanitize outputs)
- [ ] CSRF protection
- [ ] Rate limiting on API endpoints
- [ ] Secure password storage (bcrypt with salt)
- [ ] Session management
- [ ] Audit logging for financial transactions

## AI Assistant Guidelines

### When Working on This Project

1. **Read Before Writing:**
   - Always read existing files before modifying
   - Understand the current architecture
   - Check for existing patterns and conventions

2. **Plan Complex Tasks:**
   - Use TodoWrite tool for multi-step tasks
   - Break down large features into smaller tasks
   - Mark tasks as in_progress and completed appropriately

3. **Security Focus:**
   - Never introduce security vulnerabilities
   - Review code for OWASP Top 10 issues
   - Validate and sanitize all inputs
   - Flag any security concerns immediately

4. **Financial Accuracy:**
   - Double-check all financial calculations
   - Use appropriate libraries for decimal arithmetic
   - Test edge cases (negative amounts, zero, very large numbers)
   - Verify currency conversion logic

5. **Code Quality:**
   - Avoid over-engineering
   - Don't add features beyond requirements
   - Keep solutions simple and focused
   - Delete unused code completely
   - No premature abstractions

6. **Testing Requirements:**
   - Write tests for new features
   - Update tests when modifying existing code
   - Ensure all tests pass before committing
   - Test financial calculations thoroughly

7. **Documentation:**
   - Update README.md when adding major features
   - Document complex business logic
   - Keep this CLAUDE.md file current
   - Add inline comments for non-obvious code

8. **Version Control:**
   - Make atomic commits (one logical change per commit)
   - Write clear commit messages
   - Push to the designated feature branch
   - Never force push without permission

### Tools Usage
- Prefer Read/Edit/Write tools over bash commands for file operations
- Use Task tool for complex multi-step explorations
- Run multiple independent commands in parallel when possible
- Use specialized tools (Grep, Glob) instead of bash find/grep

### Common Tasks

#### Setting Up a New Feature
1. Read relevant existing code
2. Plan the implementation with TodoWrite
3. Create necessary files and components
4. Write tests
5. Implement the feature
6. Run tests and verify
7. Commit and push

#### Fixing a Bug
1. Reproduce the issue
2. Identify the root cause
3. Write a failing test
4. Fix the bug
5. Verify the test passes
6. Check for similar issues elsewhere
7. Commit with descriptive message

#### Adding Tests
1. Identify untested code
2. Write test cases for happy path
3. Write test cases for edge cases
4. Write test cases for error conditions
5. Verify coverage improvement
6. Commit tests

## Project-Specific Considerations

### Financial Compliance
Depending on the jurisdiction and use case, consider:
- PCI DSS compliance for payment processing
- GDPR/CCPA for user data privacy
- SOC 2 for security controls
- Financial regulations (SEC, FINRA, etc.)

### Performance
- Optimize for fast load times
- Implement pagination for large datasets
- Use caching where appropriate
- Monitor and log performance metrics

### Accessibility
- Follow WCAG 2.1 AA guidelines
- Ensure keyboard navigation works
- Provide screen reader support
- Use semantic HTML
- Test with accessibility tools

### Internationalization (i18n)
- Support multiple currencies
- Handle different date formats
- Provide translations
- Consider RTL languages

## Resources and References

### Finance Libraries
- **decimal.js** - Arbitrary-precision decimal arithmetic
- **currency.js** - Lightweight currency formatting
- **dinero.js** - Library for working with monetary values
- **accounting.js** - Number, money, currency formatting

### Security Resources
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- OWASP Secure Coding Practices: https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/

### Testing Resources
- Jest Documentation: https://jestjs.io/
- React Testing Library: https://testing-library.com/react
- Playwright: https://playwright.dev/

## Getting Started (For New Developers)

Since this is a new project, here's the recommended setup process:

1. **Initialize the project:**
   ```bash
   npm init -y
   # or
   yarn init -y
   ```

2. **Install core dependencies:**
   ```bash
   npm install react react-dom next
   npm install -D typescript @types/react @types/node
   npm install -D eslint prettier
   npm install -D jest @testing-library/react
   ```

3. **Set up configuration files:**
   - Create `tsconfig.json`
   - Create `.eslintrc.js`
   - Create `.prettierrc`
   - Create `.gitignore`

4. **Create initial project structure:**
   - Set up src/ directory
   - Create initial components
   - Set up routing

5. **Set up development workflow:**
   - Configure npm scripts
   - Set up git hooks (husky + lint-staged)
   - Configure CI/CD

## Maintenance and Updates

### This Document
- Update this file when major architectural decisions are made
- Keep the technology stack section current
- Add new conventions as they are established
- Document lessons learned from bugs or issues

### Regular Tasks
- Keep dependencies updated
- Review and address security vulnerabilities
- Refactor code to reduce technical debt
- Update tests as code evolves
- Review and update documentation

## Questions or Issues?

When you encounter ambiguity or need clarification:
1. Review existing code for patterns
2. Check this CLAUDE.md file
3. Review commit history for context
4. Ask the user for clarification if still unclear

## Version History

- **2025-12-04:** Initial creation of CLAUDE.md
  - Established initial project guidelines
  - Defined recommended structure and conventions
  - Set up AI assistant guidelines

---

**Note to AI Assistants:** This document should be treated as the source of truth for development practices on this project. Always consult this file before making significant architectural or stylistic decisions. Keep it updated as the project evolves.
