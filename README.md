Zams UI – Assessment
Zams UI Assessment is a modern, responsive platform UI built using Next.js 15, Tailwind CSS, TypeScript, and ShadCN. It features a gradient-themed landing page, a functional data dashboard with a dynamic table, instant interactions, and real-time data syncing via Supabase.

<br/>
🚀 Live Demo
Vercel Deployment: assignment-sigma-olive.vercel.app

GitHub Repo: vedikamujgule/assignment

✨ Features
🖼️ Landing Page
Gradient-rich layout with GD Sherpa typography.

Smooth scroll and navigation.

Component routing to Dashboard using Next.js App Router.

🧭 Custom Sidebar
Collapsible and responsive across mobile and desktop.

Built with Lucide icons and interactive tooltips.

Avatar section with user details.

📊 Dynamic Data Table
Sortable and paginated table view.

Search, filter, and sort capabilities.

Row selection with checkboxes.

Sticky pagination controls on all devices.

Fully responsive for mobile and desktop.

Auto-updates with new data entries.

Type and status filtering.

Routing support with reusable modular layout.

➕ Add Data Dialog
Form validation for all fields.

Name field restricted from numeric input.

Dropdowns for Type and Status using Enums.

Auto-closing date picker with calendar UI.

Instant data sync into the table after adding new entries.

🔄 Supabase Integration
Supabase handles data persistence and storage.

Real-time updates and scalable backend.

☁️ Vercel Deployment
Fully optimized for Vercel.

Production-ready with CI/CD support.

🧰 Technologies Used
Next.js 15 (App Router)

Tailwind CSS

ShadCN UI

Lucide Icons

TypeScript

Supabase

Vercel

🛠️ Getting Started
bash
Copy
Edit
# Clone the repository
git clone https://github.com/vedikamujgule/assignment
cd assignment

# Install dependencies
npm install

# Start the dev server
npm run dev
<br/>
📦 Deployment (Vercel-ready)
bash
Copy
Edit
# Build the app
npm run build

# Start the production server
npm start
🌱 Future Enhancements
 Export table data as CSV

 Add dark mode toggle

 Role-Based Access Control (RBAC)

 File upload support with preview

 REST API for editing & deleting datasources

 Created date range filtering

 Filter dropdowns for Type & Status

 Toast notifications for success and errors
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
