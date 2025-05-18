# 🧠 Grok 3 System Prompt Tracker

[![Update Prompt Workflow](https://github.com/Veeeetzzzz/grok-3-system-prompt/actions/workflows/update-prompt.yml/badge.svg)](https://github.com/Veeeetzzzz/grok-3-system-prompt/actions)
[![Last Commit](https://img.shields.io/github/last-commit/Veeeetzzzz/grok-3-system-prompt?logo=github)](https://github.com/Veeeetzzzz/grok-3-system-prompt/commits)
[![MIT License](https://img.shields.io/github/license/Veeeetzzzz/grok-3-system-prompt?color=blue)](./LICENSE)

> Automatically archives the system prompt used by Grok 3 (xAI) by querying its API and committing updates to `prompt.md`.

---

## 🚀 Overview

This project automates the retrieval and tracking of Grok 3’s system prompt. It fetches the latest version on a regular schedule and opens a pull request with changes, complete with timestamp and commit diff.

---

## ⚙️ How It Works

### 🧾 [Edge Function](https://grok-3-system-prompt.vercel.app/api/fetch-to-md) (Vercel) 

- Calls the Grok 3 API using a secure bearer token.
- Sends a crafted prompt designed to extract the system instructions.
- Converts the response to Markdown.
- Returns it as plain text.

### 🤖 [GitHub Action](https://github.com/Veeeetzzzz/grok-3-system-prompt/actions)

- Runs every 6 hours or via manual trigger.
- Calls the Edge Function endpoint.
- Aborts on API failure or unchanged content.
- Commits updates to `prompt.md`.
- Opens a PR from `prompt-update` branch to `main`.

### 🏷️ Tagging Strategy

Each merged PR can be auto-tagged (e.g. `grok-2025-05-18`) to allow historic comparison of prompt changes. (See below for setup.)

---

## 🗂 Repo Structure

```
.
├── prompt.md                      # Latest prompt from Grok 3
├── api/
│   └── fetch-to-md.ts            # Vercel Edge Function
├── .github/
│   └── workflows/
│       └── update-prompt.yml     # GitHub Actions automation
├── vercel.json                   # Vercel route config
└── README.md
```

---

## 🔐 Secrets Setup

### On Vercel

- `GROK_API_KEY` – Your Grok 3 API key for the Edge Function

### On GitHub

- `GH_PAT` – Personal Access Token with `repo` scope for PR creation

---

## 🛠 Setup Guide (For Forks)

1. **Deploy this repo to Vercel**
   - Framework: `Other`
   - Root directory: `/`
   - Add secret: `GROK_API_KEY`

2. **Add your GitHub token**
   - Go to your repo → Settings → Secrets → Actions
   - Add `GH_PAT`

3. **Enable the workflow**
   - Trigger manually or wait for scheduled run
   - Merges will show up as PRs when prompt changes

---

## 🏷️ Optional: Tag Updates with Date

To enable tagging each prompt update, add the following step after committing in your workflow:

```yaml
- name: Tag with date
  if: github.ref == 'refs/heads/prompt-update'
  run: |
    today=$(date +'%Y-%m-%d')
    git tag "grok-$today"
    git push origin "grok-$today"
```

---

## 🤝 Contributing

Pull requests welcome! You can:
- Improve prompt formatting or extraction
- Add support for other models (Claude, GPT-4, etc.)
- Add Slack/Discord alerts or comparison diffs

---

## 📄 License

This project is MIT licensed. See [LICENSE](./LICENSE) for details.
