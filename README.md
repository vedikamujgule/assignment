Zams Assignment Document
Zams UI-Assesment
Zams UI Assesment is a modern, responsive platform UI built using Next.js 15,
Tailwind CSS, TypeScript, and ShadCN. It includes a beautifully themed landing
page, a functional data dashboard with a table, dynamic interactions, and support
for scalable architecture and backed by Supabase for real-time data syncing and
storage.
Repo Link:
https://github.com/vedikamujgule/assignment.git
Vercel Deployment: https://assignment-sigma-olive.vercel.app/
Features
Landing Page
Gradient-rich design with elegant typography (GD Sherpa) and a smooth user
experience. Enabled Component routing to Dashboard
Custom Sidebar
Collapsible sidebar with icons and responsive across mobile and desktop
Dynamic Data Table
Sortable, paginated table with pagination, sorting and search functionality
enamed
Row selection with checkboxes
Sticky pagination controls on mobile and desktop at bottom of the screen.
Responsive layout for both desktop and mobile
Automatically update the table if new data is added
Enabled application routing between components
Zams Assignment Document 1
Add Data Dialog:
Form validation
Date picker with auto-close
Dropdowns for type and status using enums
Instant UI update after submission. Fully integrated with the data table
(instant updates)
Supabase Integration
Backed by Supabase for real-time data syncing and storage.
Deployed on Vercel
Ready for development with CI/CD via Vercel.
Technologies Used
Next.js 15 (App Router)
Tailwind CSS
ShadCN UI
Lucide Icons
TypeScript
Supabase
Deployed via Vercel
Getting Started
git clone https://github.com/vedikamujgule/assignment
cd assignment
npm install
npm run dev
Deployment
Zams Assignment Document 2
This app is optimized for Vercel:
npm run build
npm start
Future Enhancements
Export table data as CSV
Global dark mode support
Role-based access control (RBAC)
File upload support with file preview
REST API to delet and edit datasource table
Add filtering by created date (range)
Add filter optiosn to Type and status
Toast notifications for actions (add, delete,edit)
Zams Assignment Document 3

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
