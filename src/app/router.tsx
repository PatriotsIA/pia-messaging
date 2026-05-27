import { createRoutesFromElements, Route } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { SiteLayout } from '../components/layout/SiteLayout'
import { HomePage } from '../pages/HomePage'
import { MessagingPage } from '../pages/MessagingPage'
import { ContactPage } from '../pages/ContactPage'
import { PrivacyPage } from '../pages/PrivacyPage'
import { TermsPage } from '../pages/TermsPage'
import { NotFoundPage } from '../pages/NotFoundPage'

export const routes: RouteObject[] = createRoutesFromElements(
  <Route element={<SiteLayout />}>
    <Route index element={<HomePage />} />
    <Route path="/messaging" element={<MessagingPage />} />
    <Route path="/services" element={<MessagingPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/privacy" element={<PrivacyPage />} />
    <Route path="/terms" element={<TermsPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Route>,
)
