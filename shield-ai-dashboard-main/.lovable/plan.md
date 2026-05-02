

# Chargeback Shield AI — Frontend Platform

## Overview
A modern, sophisticated SaaS dashboard for AI-powered fraud protection and chargeback management. Dark blue + cyan/purple accent palette, clean fintech aesthetic with Inter typography.

## Design System
- **Primary**: Dark navy (#0F1629) backgrounds, (#1E293B) cards
- **Accents**: Cyan (#06B6D4) for AI/tech elements, Purple (#8B5CF6) for highlights
- **Status**: Green (#10B981) safe, Yellow (#F59E0B) attention, Red (#EF4444) risk
- **Typography**: Inter font, generous spacing
- **Components**: Soft shadow cards, rounded corners, subtle hover animations

## Pages & Layout

### Sidebar Navigation
- Collapsible sidebar with icon-only mini mode
- Sections: Dashboard, Transactions, Risk Analysis, Disputes, Reports, Settings
- Shield logo + "Chargeback Shield AI" branding

### 1. Dashboard (/)
- **Top metrics row**: 4 KPI cards (Protected Value R$, Fraud Rate Avoided %, Transactions Analyzed, Chargebacks Prevented) with trend indicators
- **Charts section**: Line chart (transactions over time) + Bar chart (chargebacks by category) using Recharts
- **Recent alerts**: Color-coded risk alerts feed
- **Quick stats**: Donut chart for approval/block/review breakdown

### 2. Transaction Monitoring (/transactions)
- Smart data table with columns: Transaction ID, Amount, Risk Score (visual gauge), Status (badge), Date
- Status badges: Approved (green), Blocked (red), Under Review (yellow)
- Filter bar: date range, amount range, risk level, status
- Search input with instant filtering
- Pagination

### 3. AI Risk Analysis (/risk-analysis)
- Risk score breakdown panel with radar/spider chart
- AI insights cards with icons ("Unusual behavior pattern detected", "New device fingerprint")
- Risk factors list with weighted contributions
- Overall risk distribution histogram

### 4. Dispute Management (/disputes)
- Disputes table: ID, transaction ref, amount, status (Won/Lost/In Progress), date
- Status with color-coded badges
- "Generate Auto-Defense" button with AI icon
- Evidence upload area (drag & drop zone)
- Dispute detail view with timeline

### 5. Reports (/reports)
- ROI summary cards (money recovered, money protected, success rate)
- Performance history line chart
- Export buttons (PDF/CSV) 
- Date range selector
- Monthly/weekly breakdown table

### 6. Settings (/settings)
- Integration cards (Stripe, Mercado Pago, PagSeguro) with connect/disconnect status
- API keys management section (show/hide, copy, regenerate)
- Anti-fraud rules configuration with toggles and threshold sliders
- Notification preferences

## Technical Approach
- All data is mock/static (no backend)
- Recharts for all charts and visualizations
- React Router for navigation between pages
- Shadcn UI components as base
- Tailwind for custom styling
- Framer-like CSS transitions for subtle animations
- Fully responsive (desktop + tablet)

