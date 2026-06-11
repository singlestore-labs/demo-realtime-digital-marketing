# Aura Analyst Integration Setup

This demo includes an embedded Aura Analyst chat interface that allows users to ask natural language questions about their MarTech campaign data.

## Prerequisites

1. **Analyst Domain**: You must have an Aura Analyst domain configured in your SingleStore project
2. **Domain Configuration**: The domain should be configured with:
   - Your MarTech database tables (offers, notifications, purchases, requests, etc.)
   - Custom instructions for MarTech context
   - Recommended FAQs about conversion rates, ROAS, CTR, and campaign performance

## Setup Instructions

### 1. Create an Analyst Domain

1. Go to [SingleStore Portal](https://portal.singlestore.com/)
2. Navigate to **Analyst** in the left sidebar
3. Click **Create Domain**
4. Select your workspace and the `martech` database
5. Configure the domain:
   - **Name**: "MarTech Campaign Analytics"
   - **Instructions**: Add context about the demo (see below)
   - **Tables**: Select all MarTech tables (offers, notifications, purchases, etc.)

**Recommended Custom Instructions:**
```
This is a real-time digital marketing demo showcasing campaign performance metrics.

Key metrics:
- Conversion Rate: (conversions / impressions) * 100
- ROAS: Return on Ad Spend
- CTR: Click-through rate from requests
- Impressions: Notifications sent
- Conversions: Purchases matched to notifications

Tables:
- offers: Ad campaigns with customer, bid price, notification zones
- notifications: Impressions sent to subscribers
- purchases: Conversion events with vendor and amount
- requests: Click/view events
- subscribers: Audience segments
- cities: Geographic locations for campaigns

Focus answers on campaign performance, conversion optimization, and audience targeting.
```

### 2. Create an API Key

1. In the Portal, go to **Analyst** → select your domain
2. Click **Domain Settings**
3. Go to the **API Keys** tab
4. Click **Create API Key**
5. Name it (e.g., "MarTech Demo")
6. Optionally set an expiration date
7. **Copy the API key immediately** (shown only once)

### 3. Get the Endpoint URL

1. In the **API Keys** tab, click **Copy Endpoint**
2. This copies the full endpoint URL to your clipboard
3. Example format: `https://apps.us-east-1.cloud.singlestore.com/v1/organizations/{orgID}/projects/{projectID}/analyst/chat`

### 4. Configure Environment Variables

**For local development:**

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp web/.env.example web/.env.local
   ```

2. Edit `web/.env.local` and add your values:
   ```
   VITE_ANALYST_API_KEY=your-actual-api-key
   VITE_ANALYST_ENDPOINT_URL=https://apps.us-east-1.cloud.singlestore.com/v1/organizations/.../analyst/chat
   ```

3. Restart the dev server to load the new variables

**For production deployment:**

Add the environment variables to your GitHub Actions workflow or deployment platform.

## Usage

Once configured, a chat icon will appear in the bottom-right corner of the **Analytics** page.

### Example Questions

- "What are the top performing campaigns?"
- "Show me conversion rates by city"
- "Which companies have the highest ROAS?"
- "What's the average conversion rate for purchases?"
- "Show me campaigns with more than 10 impressions"
- "Compare conversion rates between London and New York"

## Features

- **Natural language queries**: Ask questions in plain English
- **Structured responses**: Results displayed as tables with data
- **Session continuity**: Multi-turn conversations with context
- **MarTech context**: Grounded in campaign performance metrics
- **Real-time data**: Queries run against live database

## Architecture

- **API Endpoint**: Uses `/analyst/query` (structured JSON response)
- **Output Modes**: Requests `["data", "text"]` for tables and summaries
- **Session Management**: Each chat session maintains conversation context
- **Error Handling**: Graceful error messages for API issues

## Troubleshooting

**"Aura Analyst is not configured" error:**
- Check that environment variables are set correctly
- Restart the dev server after adding `.env.local`
- Verify the API key hasn't expired in the Portal

**"Invalid API Key" error:**
- Confirm the API key is copied correctly (no extra spaces)
- Check that the key is active in the Portal
- Verify the key is for the correct domain

**No results or empty responses:**
- Ensure your Analyst domain has been crawled (check Portal)
- Verify the database has data (run the simulator)
- Check domain configuration includes the correct tables

**"Table not found" errors:**
- Confirm domain is configured with all MarTech tables
- Re-crawl the domain schema in the Portal if tables were added recently

## API Reference

For full API documentation, see the [Analyst API Customer Guide](../docs/ANALYST_API_GUIDE.md).

Key concepts:
- **Structured Query Endpoint**: `/analyst/query` - returns single JSON response
- **Streaming Chat Endpoint**: `/analyst/chat` - returns SSE stream (not used in this demo)
- **Session Continuity**: Use `session_id` to maintain conversation context
- **Output Modes**: Control what fields are returned (`sql`, `data`, `chart`, `text`)
