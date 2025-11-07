# Toggl Track Reporter

A beautiful and modern web application to view and analyze your Toggl Track time entries by month. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 📊 View time entries filtered by month
- 📈 See total hours and summary statistics
- 🎨 Color-coded projects
- 🏷️ Display tags and descriptions
- 🔄 Real-time tracking indicator for running timers
- 📱 Responsive design
- 🌐 RTL support for Arabic descriptions

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure API Token

You have two options to set your Toggl API token:

**Option A: Environment Variable (Recommended)**

Create a `.env.local` file in the root directory:

```bash
TOGGL_API_TOKEN=your_api_token_here
```

**Option B: Direct in Code**

Edit `app/page.tsx` and replace `YOUR_API_TOKEN_HERE` with your actual token.

**Get Your API Token:**
1. Go to [https://track.toggl.com/profile](https://track.toggl.com/profile)
2. Scroll down to "API Token"
3. Copy your token

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
