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
  - Support for authorization code exchange and PKCE

## Getting Started

You can try the application here: <https://calm-plant-0cc61d103.6.azurestaticapps.net/>

### Supported Environment

- Dev Container in VS Code (this is the only supported setup)

### Installation and Development Setup

There is no separate installation mode for this tool. Installation and development setup are the same process.

1. Clone the repository:

```bash
git clone https://github.com/JakubVrch/oidc-test-tool.git
cd oidc-test-tool
```

2. Open the folder in VS Code.
3. Install workspace-recommended extensions from `.vscode/extensions.json` (Command Palette: **Extensions: Show Recommended Extensions**).
4. Run **Dev Containers: Rebuild and Reopen in Container**.
5. After the container starts, install dependencies and run the app:

```bash
yarn install
yarn dev
```

The application will be available at `http://localhost:5173`

The dev container post-create step configures Corepack and installs the Yarn version pinned by `packageManager` in `package.json`.

### Useful Commands

```bash
yarn dev
yarn test
yarn lint
yarn build
```

### Configuration

The application is configured through `src/config/exampleConfig.ts`. This file contains pre-configured OIDC request examples and default settings.

## Roadmap

2. TODO: Fully responsive layout (on mobile devices)
3. TODO: Token introspection
4. TODO: Logout
5. TODO: UserInfo
6. TODO: OpenID Connect discovery (.well-known/openid-configuration)
7. TODO: Form POST response mode support (requires backend)
8. TODO: Environment variable configuration and Docker image
