# D2 Software requirements specification

## 1. Purpose and scope
This project is a front-end enquiry website for a mobile crane service business in Madina, Ghana. The system presents the service offering and supports user enquiries via phone and WhatsApp.

## 2. Stakeholders
- Business owner / client representative
- Prospective clients
- Website maintainer / developer
- Lecturer / evaluator

## 3. Functional requirements
1. The site shall present the business and service offerings clearly.
2. The site shall provide navigation to service sections and contact information.
3. The site shall provide WhatsApp-based enquiry links for standard business contact.
4. The site shall accept enquiry details and prepare a message for WhatsApp.
5. The site shall show a gallery of relevant crane and construction imagery.
6. The site shall remain responsive across common mobile and desktop viewports.

## 4. User stories
1. As a potential client, I want to view the service list and contact details, so that I can understand the business offering.
2. As a prospective customer, I want to send a WhatsApp enquiry, so that I can request service support quickly.
3. As a site manager, I want to submit project details through the enquiry form, so that I can request a crane service.

## 5. Non-functional requirements
- Usability: clear navigation and readable content on mobile devices
- Performance: page should load quickly and avoid heavy unnecessary assets
- Accessibility: visible focus states, descriptive alt text, keyboard access to dialogs
- Maintainability: code organized by sections and testable UI interactions

## 6. Conceptual data and interfaces
- Contact number: 0248532224
- WhatsApp number: 233248532224
- External interface: WhatsApp linking to a pre-composed enquiry message
- Data handling: no persistent database or backend in the current architecture

## 7. Glossary
- crane support: the lifting or support work requested by a client
- WhatsApp enquiry: a pre-populated message opened in WhatsApp for the user to send

## 8. Validation evidence and open questions
This requirements baseline matches the current landing page implementation, but official business identity and service workflow remain subject to client confirmation.
