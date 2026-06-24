# Facility Data Export System

A web application for retrieving CMS nursing facility and claims data, allowing manual overrides, and exporting structured reports as PDF.


## Features

- Fetches live CMS Facility & Quality Claims data from data.cms.gov
- Dynamic field mapping system (API-driven schema)
- Manual override support (API vs user input toggle)
- Multi-record claims handling per facility
- Structured PDF export with tables and headers
- Input validation for CMS Certification Number (CCN)
- Warning system for missing API fields


## Tech Stack

- React (Frontend UI)
- JavaScript (ES6+)
- jsPDF + jspdf-autotable (PDF generation)
- Axios (API requests)
- React Router (navigation)


## Deployment

- Frontend: Vercel
  - Live URL: https://search-nursing-facility-data.vercel.app/

- Backend: Render
  - API Base URL: https://ccn-lookup.onrender.com


## Architecture

The application follows a data pipeline model:
CMS API → Data Fetch Layer → Field Mapping Layer → UI Form State → Export Normalization → PDF Generator


## Data Flow

1. User enters CCN
2. Facility + Claims data fetched from CMS API
3. Data is normalized into field-based structure
4. UI renders fields with API values
5. User optionally overrides values manually
6. On export:
   - Resolver determines final values (API vs manual)
   - Data is grouped into tables
   - PDF is generated with jsPDF


## Installation/Running

git clone https://github.com/Xur0s/CCN-Lookup
cd project

Run frontend:
1. cd frontend
   - Make .env (look at .env.example)
2. npm install
3. npm run dev

Run backend:
1. cd backend
   - Make .env (look at .env.example) [OPTIONAL]
2. npm install
3. node server.js


## Usage

1. Enter a valid 6-digit CMS Certification Number
2. View facility and claims data
3. Override values if needed
4. Click "Export PDF" to generate report


## Key Design Decisions

- Separated API data from form state to support manual overrides
- Used a resolver pattern to determine final export values
- Normalized claims into record-based structure for multi-entry support
- Used jsPDF autoTable for scalable tabular exports


## Comments/Issues

- Some CMS datasets require an additional API call to resolve the datastore UUID before querying data
- It was unclear what columns were needed from "Claims Quality" table, so field selection is currently based on available "measure code" and related attributes
- API response times may vary depending on CMS data service load and external hosting performance
- Large datasets may cause PDF pagination challenges in jsPDF autoTable rendering
- Invalid 6-digit CCN inputs are not fully validated server-side and may result in empty API responses
- Code structure is currently evolving and would benefit from additional modularization and inline documentation

