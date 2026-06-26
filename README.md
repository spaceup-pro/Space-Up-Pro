# Space Up - Admissions & Student Portal Web Application

A modern Next.js application for university admissions and student management with Supabase backend.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TailwindCSS, Framer Motion, Shadcn/ui
- **Backend**: Supabase (PostgreSQL), Redis for caching
- **Language**: TypeScript

## Features

### 1. Landing Page (Bento Grid Layout)
- Modern dark theme with gradient accents
- Full-screen overlay navigation with 60fps micro-interactions
- Interactive Program Finder (Khối thi → Ngành học → Học phí)
- Stats section, CTA, and responsive design

### 2. Admin Workspace (Task Isolation)
- Single-Page Dashboard with isolated Sandbox Workspace Panel
- Context-Aware with Redis debounce (300ms) caching
- Virtual Scrolling with TanStack Virtual for large tables
- Idempotency keys (X-Idempotency-Key) for data mutations

### 3. AI Chatbot Widget
- Floating button (bottom-right)
- Two choices: "Chat trực tiếp tại Website" and "Chat qua Messenger"
- Strict System Prompt guardrails (Lê Thành Chung roleplay)
- Anti-hallucination routing for out-of-scope questions

### 4. Database Schema (PostgreSQL/Supabase)
- RBAC with 4 roles: superadmin, admin, student, applicant
- Row Level Security (RLS) policies for all tables
- Triggers: auto "@email.com" suffix, auto GPA/pass-fail calculation, auto student ID generation
- Seed data for roles and SuperAdmin (SU@admin.com / thanhchung204)

## Getting Started

### Prerequisites
- Node.js 18+
- Supabase project
- Redis (optional, mock available)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/
│   │   └── chat/          # AI Chatbot API route
│   ├── admin/             # Admin workspace
│   ├── layout.tsx         # Root layout with chatbot
│   └── page.tsx           # Landing page
├── components/
│   ├── admin/            # Admin components
│   │   ├── forms/        # GradeInputForm, ApplicationReviewForm
│   │   └── tables/       # StudentListTable (virtual scroll)
│   ├── chat/             # AIChatWidget
│   ├── features/         # BentoGrid, ProgramFinder, etc.
│   └── layout/           # Navigation
├── database/
│   └── schema.sql        # PostgreSQL DDL
└── lib/
    ├── redis.ts          # Redis utilities
    └── utils.ts          # Helper functions
```

## Database Setup

Run the schema.sql in your Supabase SQL editor:

```bash
# The schema includes:
# - Tables: profiles, admission_info, majors, applications, courses, academic_records, schedules
# - Enums: user_role, application_status, course_status, admission_block, gender
# - Triggers: auto_email_suffix, calculate_gpa_and_pass, on_application_approved
# - RLS Policies for all 4 roles
# - Seed data for roles
```

## SuperAdmin Account

- Email: `SU@admin.com`
- Password: `thanhchung204`
- Role: `superadmin`

## Environment Variables

```env
# For AI Chatbot (optional)
LLM_API_KEY=your-api-key
LLM_API_ENDPOINT=https://api.openai.com/v1/chat/completions
```

## License

MIT