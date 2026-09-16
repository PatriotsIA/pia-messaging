import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { HomePage } from './HomePage'

// Pre-render the full page at old URLs, then navigate to the canonical section.
export function LegacyLanding({ section }: { section: string }) {
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    void navigate(`/${location.search}#${section}`, { replace: true })
  }, [navigate, section, location.search])
  return <HomePage />
}
