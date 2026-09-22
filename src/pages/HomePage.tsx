import {
  ArrowRight,
  ChartNoAxesColumnIncreasing,
  Database,
  Mail,
  MessageCircle,
  Phone,
  Plus,
  Star,
  Users,
} from 'lucide-react'
import {
  aboutCopy,
  creativeCopy,
  creativeServices,
  heroCopy,
  pricingCopy,
  services,
  steps,
  textRates,
} from '../config/content'
import { siteConfig } from '../config/site'
import { PhonePreview } from '../components/home/PhonePreview'
import { ReferencePhoto } from '../components/home/ReferencePhoto'
import { QuoteForm } from '../components/forms/QuoteForm'
import { Seo } from '../lib/seo/Seo'
import { organizationJsonLd, websiteJsonLd } from '../lib/seo/structuredData'

const icons = {
  message: MessageCircle,
  mail: Mail,
  phone: Phone,
  chart: ChartNoAxesColumnIncreasing,
  users: Users,
  database: Database,
}

export function HomePage() {
  return (
    <>
      <Seo
        title="Texas roots. Nationwide reach."
        canonicalPath="/"
        jsonLd={[organizationJsonLd(), websiteJsonLd()]}
      />
      <section className="hero-section" id="top" aria-labelledby="hero-title">
        <img
          className="hero-background"
          src="/images/hero-capitol.webp"
          alt=""
          width={2172}
          height={724}
          fetchPriority="high"
          aria-hidden="true"
        />
        <div className="site-container hero-layout">
          <div className="hero-copy">
            <p className="eyebrow eyebrow-light">
              Texas roots. Nationwide reach.
            </p>
            <h1 id="hero-title">
              Reach every Texas voter you need, <span>on the phone</span> in
              their pocket.
            </h1>
            <p className="hero-intro">{heroCopy.intro}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">
                Get a quote <ArrowRight />
              </a>
              <a className="button button-outline" href="#pricing">
                See text &amp; email rates
              </a>
            </div>
          </div>
          <PhonePreview />
        </div>
      </section>

      <div className="reach-strip" aria-label="Voter reach">
        <dl className="site-container reach-grid">
          <div>
            <dt>Texas voter cell numbers</dt>
            <dd>6.98M</dd>
          </div>
          <div>
            <dt>verified voter emails</dt>
            <dd>6M+</dd>
          </div>
          <div>
            <dt>2024 general-election voters on file</dt>
            <dd>11M</dd>
          </div>
        </dl>
      </div>

      <section
        className="section services-section"
        id="services"
        aria-labelledby="services-title"
      >
        <div className="site-container">
          <div className="section-heading centered">
            <p className="eyebrow">Our services</p>
            <h2 id="services-title">
              Every way to contact a voter, from one shop
            </h2>
            <p>
              Pick one channel or run them together. Every service runs on the
              matched Texas voter file — statewide programs and 420-character
              texts include it.
            </p>
          </div>
          <div className="service-grid">
            {services.map((service) => {
              const Icon = icons[service.icon]
              return (
                <article
                  className={`service-card ${service.featured ? 'featured' : ''}`}
                  key={service.title}
                >
                  <Icon
                    className="service-icon"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                  <div className="service-body">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <a
                      className="rate-link"
                      href={
                        service.icon === 'message' || service.icon === 'mail'
                          ? '#pricing'
                          : '#contact'
                      }
                    >
                      {service.rate}
                    </a>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section
        className="section pricing-section"
        id="pricing"
        aria-labelledby="pricing-title"
      >
        <div className="site-container">
          <div className="section-heading">
            <p className="eyebrow">Simple pricing</p>
            <h2 id="pricing-title">Text and email rates</h2>
            <p>
              The same per-message rate at any volume, whether you’re working a
              county or the whole state. $500 minimum per program.
            </p>
          </div>
          <div className="pricing-grid">
            <article className="pricing-card">
              <h3>
                <MessageCircle aria-hidden="true" />
                Text messaging
              </h3>
              <table>
                <caption className="sr-only">
                  Text messaging rates per message
                </caption>
                <tbody>
                  {textRates.map((rate) => (
                    <tr key={rate.label}>
                      <th scope="row">{rate.label}</th>
                      <td>
                        {rate.rate}
                        <span> / message</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <details className="pricing-notes">
                <summary>
                  Which message is right for your campaign?{' '}
                  <Plus aria-hidden="true" />
                </summary>
                <div>
                  {textRates.map((rate) => (
                    <p key={rate.label}>
                      <strong>{rate.label}:</strong> {rate.use}
                    </p>
                  ))}
                  <p>{pricingCopy.textNote}</p>
                  <p>{pricingCopy.mmsNote}</p>
                </div>
              </details>
            </article>
            <article className="pricing-card">
              <h3>
                <Mail aria-hidden="true" />
                Email broadcasting
              </h3>
              <table>
                <caption className="sr-only">Email broadcasting rates</caption>
                <tbody>
                  <tr>
                    <th scope="row">
                      First full-database send
                      <small>8M+ addresses, 6M+ verified voters</small>
                    </th>
                    <td>$35,000</td>
                  </tr>
                  <tr>
                    <th scope="row">Second send, same campaign</th>
                    <td>$20,000</td>
                  </tr>
                  <tr>
                    <th scope="row">Two full waves</th>
                    <td>$55,000</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      Smaller universe
                      <small>Plus one-time $0.01 per record data charge</small>
                    </th>
                    <td>
                      $0.01<span> / email</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="pricing-footnote">{pricingCopy.emailNote}</p>
            </article>
          </div>
          <div className="pricing-accordions">
            <details>
              <summary>
                Setup and compliance <Plus aria-hidden="true" />
              </summary>
              <p>{pricingCopy.setup}</p>
            </details>
            <details>
              <summary>
                Voter data for smaller universes <Plus aria-hidden="true" />
              </summary>
              <p>{pricingCopy.data}</p>
            </details>
          </div>
        </div>
      </section>

      <section
        className="section creative-section"
        id="creative"
        aria-labelledby="creative-title"
      >
        <div className="site-container">
          <div className="section-heading">
            <p className="eyebrow">Creative &amp; digital</p>
            <h2 id="creative-title">
              Everything else a campaign needs, from the same building
            </h2>
            <p>
              The message needs something to link to, something to mail, and a
              sign in the yard. We make all of it here — one shop, one invoice.
            </p>
          </div>
          <div className="creative-grid">
            {creativeServices.map((service) => (
              <article
                key={service.title}
                className={`creative-card ${service.image === 'interview' ? 'featured' : ''}`}
              >
                <ReferencePhoto name={service.image} />
                <div className="creative-card-body">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <a className="rate-link" href="#contact">
                    {service.rate}
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className="creative-extras">
            <article className="extra-card">
              <ReferencePhoto name="print" />
              <div>
                <h3>Print, mail, and signage</h3>
                <p>{creativeCopy.print}</p>
              </div>
            </article>
            <article className="extra-card">
              <ReferencePhoto name="writing" />
              <div>
                <h3>We write the message</h3>
                <p>{creativeCopy.writing}</p>
              </div>
            </article>
            <article className="extra-card bundle-card">
              <Star aria-hidden="true" fill="currentColor" />
              <div>
                <h3>The bundle</h3>
                <p>{creativeCopy.bundle}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section
        className="section process-section"
        id="process"
        aria-labelledby="process-title"
      >
        <div className="site-container">
          <p className="eyebrow eyebrow-light">How it works</p>
          <h2 id="process-title">How a program comes together</h2>
          <ol className="steps-grid">
            {steps.map((step, index) => (
              <li key={step.title}>
                <span className="step-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="section about-section"
        id="about"
        aria-labelledby="about-title"
      >
        <div className="site-container about-grid">
          <figure>
            <ReferencePhoto name="amarillo" />
            <figcaption>Amarillo, Texas</figcaption>
          </figure>
          <div>
            <p className="eyebrow">About Patriot Messaging</p>
            <h2 id="about-title">
              Run by the guy who moved a county 44 points
            </h2>
            {aboutCopy.map((paragraph) => (
              <p className="about-paragraph" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section contact-section"
        id="contact"
        aria-labelledby="contact-title"
      >
        <div className="site-container contact-grid">
          <div className="contact-copy">
            <p className="eyebrow">Get a quote</p>
            <h2 id="contact-title">Get a quote</h2>
            <p>
              Tell us about the race and we’ll send a plan and a rate card. Most
              quotes go out the same day.
            </p>
            <address>
              <strong>Dan Rogers</strong>
              <a href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
              <span>Patriot Messaging, LLC</span>
              <span>1000 S. Jefferson Street</span>
              <span>Amarillo, TX 79101</span>
            </address>
          </div>
          <QuoteForm />
        </div>
      </section>
    </>
  )
}
