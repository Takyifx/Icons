# D4 Architecture and CI

## System architecture
The current solution is a frontend-only React application. It does not implement a backend, authentication flow, booking engine, database, or payment system.

## Core components
- App shell and page sections
- Service and gallery data
- WhatsApp link generation utility
- Modal gallery interaction logic
- Form validation for enquiry flow

## External interface
- WhatsApp for outbound enquiries
- Telephone links for local phone calls
- Static imagery stored in the frontend bundle

## Architecture decisions
1. Front-end only architecture is appropriate because no backend or persistent store is required in the current scope.
2. WhatsApp is used as the off-platform enquiry mechanism to avoid introducing backend infrastructure unnecessarily.
3. Vite and React were retained to preserve the existing technology stack and minimise rework.

## Repository engineering
- Makefile: included to cover common project commands
- CI workflow: included to install dependencies, run tests, and build the frontend
- PR template: included to guide review and evidence capture
- Issue templates: included for bugs and feature requests

## Client and lecturer note
This architecture is accurate to the current implementation. Any future expansion into backend systems would require formal requirements and client approval.
