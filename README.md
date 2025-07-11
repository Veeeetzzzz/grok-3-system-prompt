# 🧠 Grok 4 System Prompt Tracker

[![Update Prompt Workflow](https://github.com/Veeeetzzzz/grok-3-system-prompt/actions/workflows/update-prompt.yml/badge.svg)](https://github.com/Veeeetzzzz/grok-3-system-prompt/actions)
[![Last Commit](https://img.shields.io/github/last-commit/Veeeetzzzz/grok-3-system-prompt?logo=github)](https://github.com/Veeeetzzzz/grok-3-system-prompt/commits)
[![MIT License](https://img.shields.io/github/license/Veeeetzzzz/grok-3-system-prompt?color=blue)](./LICENSE)

> Automatically archives the system prompt used by Grok 4 (xAI) by querying its API and committing updates to `prompt.md`.

---

## 🚀 Overview

This project automates the retrieval and tracking of Grok 4's system prompt. It fetches the latest version on a regular schedule and opens a pull request **only when the content actually changes**, with intelligent error handling and auto-close functionality.

## ✨ Key Features

- **🎯 Smart Change Detection**: Only creates PRs when prompt content actually changes (ignores timestamp-only updates)
- **🔄 Automatic Fallback**: Attempts Grok 4 first, falls back to Grok 3 if unavailable
- **🚫 Auto-Close on Errors**: Automatically closes PRs when function errors occur
- **⚡ Improved Error Handling**: Detects multiple types of API errors and responds appropriately
- **🏷️ Model Tracking**: Shows which specific model was used in each update

---

## ⚙️ How It Works

### 🧾 [Edge Function](https://grok-3-system-prompt.vercel.app/api/fetch-to-md) (Vercel) 

- **Primary**: Attempts to call Grok 4 API using multiple model variants (`grok-4-0709`, `grok-4`, `grok-4-latest`, `grok-4-beta`)
- **Fallback**: Falls back to Grok 3 if Grok 4 models are unavailable
- Sends a crafted prompt designed to extract the system instructions
- Converts the response to Markdown with model information
- Returns it as plain text with comprehensive error handling

### 🤖 [GitHub Action](https://github.com/Veeeetzzzz/grok-3-system-prompt/actions)

- **Schedule**: Runs every 24 hours or via manual trigger
- **Smart Detection**: Only creates PRs when actual content changes (not just timestamps)
- **Error Handling**: Auto-closes PRs if function errors occur
- **Validation**: Checks for empty responses, API errors, and function failures
- **Clean Commits**: Includes timestamps and model information in commit messages

### 🛡️ Error Handling

- **Function Errors**: Detects edge function failures and auto-closes existing PRs
- **API Errors**: Identifies API response errors (❌ markers in response)
- **Empty Responses**: Handles empty or missing response files
- **Model Fallback**: Gracefully falls back from Grok 4 to Grok 3 when needed

### 🏷️ Tagging Strategy

Each merged PR can be auto-tagged (e.g. `grok-4-2025-07-04`) to allow historic comparison of prompt changes.

---

## 🗂 Repo Structure

```
.
├── prompt.md                      # Latest prompt from Grok 4/3
├── api-prompt.md                  # Raw API response with metadata  
├── api/
│   └── fetch-to-md.ts            # Vercel Edge Function (Grok 4 + fallback)
├── .github/
│   └── workflows/
│       └── update-prompt.yml     # GitHub Actions automation (improved)
├── vercel.json                   # Vercel route config
└── README.md
```

---

## 🔐 Secrets Setup

### On Vercel

- `GROK_API_KEY` – Your xAI API key (works for both Grok 4 and Grok 3)

### On GitHub

- `GH_PAT` – Personal Access Token with `repo` scope for PR creation and management

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
   - PRs will only be created when prompt content actually changes
   - Failed runs will auto-close existing PRs

---

## 📊 Workflow Behavior

| Scenario | Action |
|----------|--------|
| ✅ Grok 4 available + content changed | Creates PR with Grok 4 prompt |
| ⚠️ Grok 4 unavailable + content changed | Creates PR with Grok 3 fallback |
| ℹ️ No content changes | Skips PR creation (logs only) |
| ❌ Function error | Auto-closes existing PR + stops workflow |
| 🔄 Timestamp-only change | Skips PR creation (not considered a change) |

---

## 🏷️ Optional: Tag Updates with Date

To enable tagging each prompt update, add the following step after committing in your workflow:

```yaml
- name: Tag with date
  if: github.ref == 'refs/heads/prompt-update'
  run: |
    today=$(date +'%Y-%m-%d')
    git tag "grok-4-$today"
    git push origin "grok-4-$today"
```

---

## 🆕 Recent Improvements

- **🎯 Smart Change Detection**: Only creates PRs for actual content changes
- **🔄 Grok 4 Migration**: Now tracks Grok 4 with automatic fallback to Grok 3
- **🚫 Auto-Close on Errors**: Automatically manages PR lifecycle on failures
- **⚡ Better Error Handling**: Comprehensive error detection and reporting
- **📝 Enhanced PR Details**: Better commit messages and PR descriptions

---

## 🤝 Contributing

Pull requests welcome! You can:
- Improve prompt formatting or extraction
- Add support for other models (Claude, GPT-4, etc.)
- Add Slack/Discord alerts or comparison diffs
- Enhance error handling and monitoring

---

## 📄 License

This project is MIT licensed. See [LICENSE](./LICENSE) for details.
