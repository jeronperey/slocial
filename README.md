**CSC 4184 Project: Slocial**

High-fidelity, front-end-only prototype of *Events Around You*. No backend — all data is mocked.

Design source: [Figma – Events Around You (Prototype v2)](https://www.figma.com/design/NpR69IhZiiOXjVUGr4c2z0/Events-Around-You-–-Paper-Prototype?node-id=100-5)

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
npm run lint
```

## Stack

Vite · React · TypeScript · React Router · Tailwind CSS · lucide-react (icons)

## Project structure

```
src/
  pages/            one file per screen (route)
  components/
    layout/         AppHeader, BottomNav, PhoneFrame, TabLayout
    ui/             Button, TextInput, Checkbox, Radio, Chip, Tag, SectionLabel, Toast
    map/            MapView, MapBackground, EventPin
    events/         FilterBar, FilterPanel, EventPopup, EventSummary, EventInfo, EventCard
    Placeholder.tsx temporary stand-ins — delete once everything is built
  data/             mock data + shared types
  store/            AppStore: in-memory state (registered, saved, filters, reports)
  styles/theme.css  all colors live here as tokens
  index.css         Tailwind setup + maps theme tokens to Tailwind classes
  App.tsx           routes
```

## Pages → Figma frames

| Page | Route | Figma frames |
|---|---|---|
| LoginPage | `/login` | Login |
| ProfilePage | `/profile` | Profile |
| MapPage | `/` | Map – Home, Filter panel, Filter – Casual checked, Map – Casual filtered, Event popup – Corgi Meetup, Event popup – Registered |
| MyEventsPage | `/events` | Events – Going & Saved |
| EventDetailsPage | `/events/:id` | Event details – Corgi Meetup |
| DirectionsPage | `/events/:id/directions` | Map – Directions |
| ReportEventPage | `/events/:id/report` | Report event, Report event – Bullying checked, Report event – Submitted |
