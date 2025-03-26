# Cloudflare Workers

```
➜  cloudflare-workers git:(main) npm create cloudflare -- .
Need to install the following packages:
create-cloudflare@2.43.0
Ok to proceed? (y) y


> npx
> create-cloudflare .


─────────────────────────────────────────────
👋 Welcome to create-cloudflare v2.43.0!
🧡 Let's get started.
📊 Cloudflare collects telemetry about your usage of Create-Cloudflare.

Learn more at: https://github.com/cloudflare/workers-sdk/blob/main/packages/create-cloudflare/telemetry.md
─────────────────────────────────────────────

╭ Create an application with Cloudflare Step 1 of 3
│
├ In which directory do you want to create your application?
│ dir ./.
│
├ What would you like to start with?
│ category Hello World Starter
│
├ Which template would you like to use?
│ type Worker only
│
├ Which language do you want to use?
│ lang TypeScript
│
├ Copying template files
│ files copied to project directory
│
├ Updating name in `package.json`
│ updated `package.json`
│
├ Installing dependencies
│ installed via `npm install`
│
╰ Application created

╭ Configuring your application for Cloudflare Step 2 of 3
│
├ Installing wrangler A command line tool for
 building Cloudflare Workers
│ installed via `npm install wrangler --save-
dev`
│
├ Installing @cloudflare/workers-types
│ installed via npm
│
├ Adding latest types to `tsconfig.json`
│ added @cloudflare/workers-types/2023-07-01
│
├ Retrieving current workerd compatibility da
te
│ compatibility date 2025-03-21
│
├ Do you want to use git for version control?
│ yes git
│
├ Initializing git repo
│ initialized git
│
├ Committing new files
│ git commit
│
╰ Application configured

╭ Deploy with Cloudflare Step 3 of 3
│
├ Do you want to deploy your application?
│ no deploy via `npm run deploy`
│
╰ Done

─────────────────────────────────────────────
🎉  SUCCESS  Application created successfully!

💻 Continue Developing
Start dev server: npm run start
Deploy: npm run deploy

📖 Explore Documentation
https://developers.cloudflare.com/workers

🐛 Report an Issue
https://github.com/cloudflare/workers-sdk/issues/new/choose

💬 Join our Community
https://discord.cloudflare.com
```

```
➜  cloudflare-workers git:(main) npm run dev
```