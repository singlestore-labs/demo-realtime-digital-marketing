# Aura Analyst Fixes Needed

## Issue 1: Multiple Previous Answers Appearing in Chat

**Problem:**
The Analyst API returns multiple results in the `results` array, and the UI displays ALL of them. This causes old conversation history to appear as separate messages in the chat.

Example API response:
```json
{
  "results": [
    {"text": "There are **3 r's** in strawberry..."},  // Current answer
    {"text": "There are **2 r's** in strawbery..."}   // Previous answer
  ]
}
```

**Root Cause:**
In `AnalystChat.tsx` lines 156-164, the code loops through ALL results:
```typescript
for (const result of response.results) {
  // Adds EVERY result as a separate message
  setMessages((prev) => [...prev, assistantMessage]);
}
```

**Fix Applied:**
Changed to only show the first/most recent result:
```typescript
// Only show the first result to avoid duplicates from conversation history
const result = response.results[0];
const formatted = formatAnalystResult(result);
setMessages((prev) => [...prev, assistantMessage]);
```

**File:** `web/src/components/AnalystChat.tsx`

---

## Issue 2: Chat Review Shows Duplicate Questions

**Problem:**
The Chat Review in SingleStore Portal shows the same question multiple times (e.g., "how many r's in strawberry" appears 10+ times).

**Likely Root Cause:**
This is happening on the **Analyst backend side**, not in the React app. Possible causes:
1. The app is sending multiple requests for the same question (retries?)
2. The session ID isn't being sent correctly, causing each request to create a new conversation
3. The Analyst backend is logging queries multiple times

**To investigate:**
1. Check network tab - are multiple API calls being made for one user question?
2. Check if `session_id` is being sent consistently in requests
3. Check if the Analyst backend has a bug in how it logs queries to Chat Review

**Current session_id handling:**
```typescript
const [sessionId] = React.useState<string>(() => crypto.randomUUID());
```

This creates a session ID once per component mount. If the component unmounts/remounts, a new session is created.

---

## Issue 3: API Key Obfuscation Needed

**Problem:**
The API key is displayed in plain text in the Configure page input field. Should be obfuscated with dots (•••) when not being edited.

**Implementation Plan:**

### Option A: Input type="password" (Simplest)
```typescript
<Input
  type={isEditing ? "text" : "password"}
  placeholder="eyJhbGciOiJFUzUxMiIsImtpZCI..."
  value={localApiKey}
  onFocus={() => setIsEditing(true)}
  onBlur={() => setIsEditing(false)}
/>
```

### Option B: InputGroup with show/hide button (Better UX)
```typescript
<InputGroup>
  <Input
    type={showApiKey ? "text" : "password"}
    value={localApiKey}
    onChange={(e) => setLocalApiKey(e.target.value)}
  />
  <InputRightElement>
    <IconButton
      icon={showApiKey ? <ViewOffIcon /> : <ViewIcon />}
      onClick={() => setShowApiKey(!showApiKey)}
    />
  </InputRightElement>
</InputGroup>
```

### Option C: Custom masking (Most control)
```typescript
const maskApiKey = (key: string) => {
  if (!key || key.length < 8) return key;
  return `${key.slice(0, 4)}${'•'.repeat(key.length - 8)}${key.slice(-4)}`;
};

// Display: eyJh••••••••••kpZCI
```

**Recommended:** Option B (InputGroup with toggle) - gives users control

**File to modify:** `web/src/pages/Configure.tsx` (AnalystConfigSection component)

---

## Fix Status

- [x] Issue 1: Multiple results bug - **FIXED** in AnalystChat.tsx (not committed)
- [ ] Issue 2: Chat Review duplicates - **NEEDS INVESTIGATION** (likely backend issue)
- [ ] Issue 3: API key obfuscation - **NOT IMPLEMENTED YET** (waiting for direction)

---

## Notes

- The current branch (`akwong/fix-analyst-issues`) has Issue 1 fixed
- Issue 3 requires changes to the Configure.tsx file with the Analyst UI config
- That config was added in PR #58 (commit c20cf46) which is already merged to main
- Need to rebase this branch on latest main to have both fixes together
