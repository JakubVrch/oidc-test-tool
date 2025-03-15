# OIDC Test Tool

A React-based debugging tool for OpenID Connect (OIDC) authentication flows. This application helps developers test and inspect OIDC authentication requests and responses.

## Features

- **Request Construction**
  - Build OIDC authentication requests with customizable parameters
  - Create pre-configured examples for common flows
  - Add custom parameters to requests
  - Real-time URL preview

- **Response Inspection**
  - Decode and display JWT tokens
  - Verify state parameter matches
  - Support for authorization code exchange

## Getting Started

### Prerequisites

- Node.js 22.x or higher
- npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/JakubVrch/oidc-test-tool.git
cd oidc-test-tool
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn dev
```

The application will be available at `http://localhost:5173`

### Configuration

The application is configured through `src/config/exampleConfig.ts`. This file contains pre-configured OIDC request examples and default settings.

## Roadmap

1. TODO: PKCE
2. TODO: Fully responsive layout (on mobile devices)
3. TODO: Token introspection
4. TODO: Logout
5. TODO: UserInfo
6. TODO: OpenID Connect discovery (.well-known/openid-configuration)
7. TODO: Form POST response mode support (requires backend)
8. TODO: Environment variable configuration and Docker image

