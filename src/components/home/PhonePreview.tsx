import {
  ArrowUp,
  BatteryFull,
  ChevronLeft,
  Signal,
  Video,
  Wifi,
} from 'lucide-react'
import { heroCopy } from '../../config/content'

export function PhonePreview() {
  return (
    <div className="phone-scene">
      <div className="signal-rings" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
      <span className="phone-tag">Text + Email + Creative</span>
      <div
        className="phone"
        role="group"
        aria-label="Sample voter text messages"
      >
        <div className="phone-screen">
          <div className="phone-status" aria-hidden="true">
            <span>9:41</span>
            <span className="phone-island" />
            <span>
              <Signal />
              <Wifi />
              <BatteryFull />
            </span>
          </div>
          <div className="phone-contact">
            <ChevronLeft aria-hidden="true" />
            <div>
              <span className="phone-avatar" aria-hidden="true">
                ★
              </span>
              <span>Patriot Messaging</span>
            </div>
            <Video aria-hidden="true" />
          </div>
          <div className="phone-messages">
            {heroCopy.messages.map((message) => (
              <div className="sample-message" key={message.label}>
                <p className="message-label">{message.label}</p>
                <p className="message-bubble">{message.text}</p>
              </div>
            ))}
          </div>
          <div className="phone-compose" aria-hidden="true">
            <span>Text message…</span>
            <ArrowUp />
          </div>
          <div className="phone-home" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
