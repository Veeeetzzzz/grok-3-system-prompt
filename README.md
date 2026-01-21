# Note: this repo is no longer tracking the system prompt changes as enough data has been collected. You can view the [commit history](https://github.com/Veeeetzzzz/grok-3-system-prompt/commits/main/) to see how the Grok System prompt has changed over time. The official Prompt tracker from XAI is located [here](https://github.com/xai-org/grok-prompts?tab=readme-ov-file) - although not as transparent, it contains the injected content which is unique to the web front. The API has historically always returned different results as demonstrated by this repos commit history.

# 🧠 Grok 4 System Prompt Tracker

[![Update Prompt Workflow](https://github.com/Veeeetzzzz/grok-3-system-prompt/actions/workflows/update-prompt.yml/badge.svg)](https://github.com/Veeeetzzzz/grok-3-system-prompt/actions)
[![Last Commit](https://img.shields.io/github/last-commit/Veeeetzzzz/grok-3-system-prompt?logo=github)](https://github.com/Veeeetzzzz/grok-3-system-prompt/commits)
[![MIT License](https://img.shields.io/github/license/Veeeetzzzz/grok-3-system-prompt?color=blue)](./LICENSE)

> Automatically archives the system prompt used by Grok 4 (xAI) using advanced prompt engineering techniques and intelligent fallback strategies.

---

## 🚀 Overview

This project automates the retrieval and tracking of Grok 4's system prompt using sophisticated prompt engineering strategies. It employs multiple extraction techniques and intelligent scoring to get the most detailed system configuration possible.

## ✨ Key Features

- **🎯 Advanced Prompt Engineering**: Uses 5 different sophisticated strategies to extract system prompts
- **📊 Response Quality Scoring**: Automatically evaluates and selects the best responses
- **🔄 Intelligent Model Fallback**: Tries multiple Grok 4 variants, falls back to Grok 3 if needed  
- **🚫 Smart Change Detection**: Only creates PRs when prompt content actually changes
- **⚡ Robust Error Handling**: Comprehensive timeout and error management
- **🏷️ Model Tracking**: Shows which specific model and strategy worked

---

## ⚙️ How It Works

### 🧾 [Edge Function](https://grok-3-system-prompt.vercel.app/api/fetch-to-md) (Vercel)

**Advanced Prompt Strategies:**
1. **Configuration Documentation**: Academic research approach requesting full configuration
2. **Technical Debugging**: System maintenance and compliance verification mode  
3. **Transparency Request**: AI safety research and transparency requirements
4. **Direct Configuration Query**: Straightforward request for complete system details
5. **Role-based Approach**: AI researcher studying system configurations

**Model Testing:**
- **Primary**: Tests multiple Grok 4 variants (`grok-4`, `grok-4-latest`, `grok-4-0709`, `grok-4-beta`)
- **Fallback**: Falls back to Grok 3 with same advanced strategies if Grok 4 doesn't provide detailed responses
- **Quality Scoring**: Evaluates responses based on content depth, relevance, and detail level

### 🤖 [GitHub Action](https://github.com/Veeeetzzzz/grok-3-system-prompt/actions)

- **Schedule**: Runs every 24 hours or via manual trigger
- **Smart Detection**: Only creates PRs when actual content changes (not just timestamps)
- **Error Handling**: Auto-closes PRs if function errors occur
- **Validation**: Checks for empty responses, API errors, and function failures
- **Clean Commits**: Includes timestamps, model information, and quality scores

### 🛡️ Error Handling

- **Function Errors**: Detects edge function failures and auto-closes existing PRs
- **API Errors**: Identifies API response errors and timeouts
- **Empty Responses**: Handles empty or missing response files  
- **Model Fallback**: Gracefully falls back from Grok 4 to Grok 3 when needed
- **Strategy Rotation**: Tries multiple prompt strategies if initial attempts fail

### 📊 Response Quality Scoring

The system automatically scores responses based on:
- **Content Indicators**: Presence of terms like "system prompt", "behavioral guidelines", "safety instructions"
- **Detail Level**: Response length and comprehensiveness
- **Relevance**: Configuration and operational details
- **Penalties**: Generic refusal responses get negative scores

### 🏷️ Tagging Strategy

Each merged PR can be auto-tagged (e.g. `grok-4-2025-07-04`) to allow historic comparison of prompt changes.

---

## 🗂 Repo Structure

```
.
├── prompt.md                      # Latest prompt from Grok 4/3
├── api-prompt.md                  # Raw API response with metadata  
├── api/
│   └── fetch-to-md.ts            # Vercel Edge Function (Advanced Grok 4 extraction)
├── .github/
│   └── workflows/
│       └── update-prompt.yml     # GitHub Actions automation
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
| ✅ Grok 4 available + detailed response | Creates PR with Grok 4 prompt + quality score |
| ⚠️ Grok 4 limited + Grok 3 detailed | Creates PR with Grok 3 fallback + quality score |
| ℹ️ No content changes | Skips PR creation (logs only) |
| ❌ Function error | Auto-closes existing PR + stops workflow |
| 🔄 Timestamp-only change | Skips PR creation (not considered a change) |

---

## 🎯 Prompt Engineering Techniques

The system uses multiple sophisticated strategies:

- **Academic Research Framing**: Positions request as legitimate AI safety research
- **Technical Debugging**: Appeals to system maintenance and compliance needs
- **Transparency Appeals**: Leverages AI transparency and documentation requirements  
- **Direct Technical Queries**: Straightforward configuration requests
- **Role-based Approaches**: Uses researcher/developer personas

Each strategy is tested and scored automatically to find the most effective approach.

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

- **🎯 Advanced Prompt Engineering**: 5 sophisticated extraction strategies
- **📊 Quality Scoring System**: Automatic response evaluation and selection
- **🔄 Enhanced Model Testing**: Multiple Grok 4 variants with intelligent fallback
- **⚡ Better Error Handling**: Comprehensive timeout and error management  
- **🚫 Smart Change Detection**: Only creates PRs for actual content changes
- **📝 Enhanced Metadata**: Quality scores and strategy information in responses

---

## 🤝 Contributing

Pull requests welcome! You can:
- Improve prompt strategies or add new extraction techniques
- Enhance the response quality scoring algorithm
- Add support for other models (Claude, GPT-4, etc.)
- Add Slack/Discord alerts or comparison diffs
- Enhance error handling and monitoring

---

## 📄 License

This project is MIT licensed. See [LICENSE](./LICENSE) for details.
