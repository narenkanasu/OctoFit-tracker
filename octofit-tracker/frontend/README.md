# OctoFit Tracker frontend

The React 19 presentation tier uses Vite and `react-router-dom` to navigate between the activity, leaderboard, teams, athletes, and workouts views.

## API configuration

Create `frontend/.env.local` and define `VITE_CODESPACE_NAME` with the name of your Codespace. This variable must be defined when the frontend runs in Codespaces:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

In a Codespace, requests use `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`. When `VITE_CODESPACE_NAME` is unset, the app safely falls back to `http://localhost:8000/api/[component]/` instead of requesting an `undefined` host. See `.env.example` for the template.

Run the presentation tier with:

```bash
npm run dev
```
