import { Route, Routes } from 'react-router'
import { PhoneFrame } from './components/layout/PhoneFrame'
import { TabLayout } from './components/layout/TabLayout'
import { DirectionsPage } from './pages/DirectionsPage'
import { EventDetailsPage } from './pages/EventDetailsPage'
import { LoginPage } from './pages/LoginPage'
import { MapPage } from './pages/MapPage'
import { MyEventsPage } from './pages/MyEventsPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProfilePage } from './pages/ProfilePage'
import { ReportEventPage } from './pages/ReportEventPage'
import { UiKitPage } from './pages/UiKitPage'

export default function App() {
  return (
    <PhoneFrame>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/ui" element={<UiKitPage />} />

        <Route element={<TabLayout />}>
          <Route index element={<MapPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="events" element={<MyEventsPage />} />
          <Route path="events/:id" element={<EventDetailsPage />} />
          <Route path="events/:id/directions" element={<DirectionsPage />} />
          <Route path="events/:id/report" element={<ReportEventPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </PhoneFrame>
  )
}
