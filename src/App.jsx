import OceanScene from './OceanScene.jsx'

function Arrow() {
  return <svg className="arrow" viewBox="0 0 32 14" aria-hidden="true"><path d="M1 7h27M23 2l5 5-5 5" /></svg>
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Pelagos Subsea home">
        <svg viewBox="0 0 38 38" aria-hidden="true"><circle cx="19" cy="19" r="17"/><path d="M8 21c5-6 8 6 13 0s8 6 10 0"/><circle cx="19" cy="19" r="3"/></svg>
        <span>Pelagos<small>Subsea systems</small></span>
      </a>
      <nav aria-label="Primary navigation">
        <a href="#mission">Mission</a>
        <a href="#system">Asteria</a>
        <a className="nav-cta" href="#expedition">Plan an expedition</a>
      </nav>
    </header>
  )
}

const missionSteps = [
  {
    number: '01',
    action: 'Map',
    title: 'Return to the same square metre.',
    body: 'Asteria combines visual odometry, multibeam sonar, and terrain-relative navigation to build survey lines researchers can repeat season after season.',
    detail: 'Photogrammetry · Multibeam · 0.4 m repeatability',
  },
  {
    number: '02',
    action: 'Sample',
    title: 'Collect context, not just images.',
    body: 'Modular payload bays pair habitat imagery with temperature, salinity, dissolved oxygen, fluorescence, and targeted water sampling.',
    detail: 'Four payload bays · Live sensor QA · Timed sampling',
  },
  {
    number: '03',
    action: 'Return',
    title: 'Bring back field-ready data.',
    body: 'Onboard processing checks coverage before recovery, so teams leave the water knowing the transect is complete and the data is usable.',
    detail: '18 h endurance · Edge processing · Open exports',
  },
]

function App() {
  return (
    <>
      <OceanScene />
      <Header />
      <main>
        <section className="hero section" id="top">
          <div className="depth-scale" aria-hidden="true"><span>000 M</span><i/><span>050 M</span><i/><span>100 M</span></div>
          <div className="hero-copy">
            <p className="signal">Autonomous reef survey system / Asteria 01</p>
            <h1>See what the reef<br />is becoming.</h1>
            <p className="hero-intro">Quiet autonomous vehicles for repeatable coastal science, from the shallows to 300 metres.</p>
            <div className="hero-actions">
              <a className="instrument-button" href="#mission">Begin descent <Arrow /></a>
              <span className="pointer-hint">Move to steer Asteria</span>
            </div>
          </div>
          <div className="mission-state" aria-hidden="true"><span>Vehicle</span><strong>ASTERIA / ACTIVE</strong><i /></div>
        </section>

        <section className="manifest section" id="system">
          <div className="manifest-copy">
            <p className="signal">The vehicle</p>
            <h2>Built to enter<br />without intruding.</h2>
            <p>Asteria is compact enough for a two-person launch, stable enough for close habitat work, and quiet enough to observe without turning the reef into a test chamber.</p>
          </div>
          <div className="vehicle-key" aria-label="Asteria vehicle features">
            <div><span>A</span><p><strong>Quiet vector thrusters</strong>Low acoustic signature around marine life.</p></div>
            <div><span>B</span><p><strong>Modular sensor rail</strong>Reconfigure in the field without specialist tools.</p></div>
            <div><span>C</span><p><strong>Optical survey eye</strong>Stable, calibrated imaging for 3D habitat models.</p></div>
          </div>
        </section>

        <section className="mission" id="mission">
          <div className="mission-heading">
            <p className="signal">One dive, a complete field loop</p>
            <h2>Map. Sample.<br />Return.</h2>
          </div>
          <div className="mission-steps">
            {missionSteps.map((step) => (
              <article className="mission-step" key={step.number}>
                <div className="step-number">{step.number}</div>
                <div className="step-action">{step.action}</div>
                <div className="step-copy"><h3>{step.title}</h3><p>{step.body}</p><span>{step.detail}</span></div>
              </article>
            ))}
          </div>
        </section>

        <section className="spec-section section">
          <div className="spec-intro"><p className="signal">Mission profile</p><p>Designed for shelf, reef, and mesophotic operations from small research vessels.</p></div>
          <div className="specs">
            <div><strong>300</strong><span>metres<br />rated depth</span></div>
            <div><strong>18</strong><span>hours<br />endurance</span></div>
            <div><strong>0.4</strong><span>metres<br />repeatability</span></div>
            <div><strong>42</strong><span>kilograms<br />launch mass</span></div>
          </div>
        </section>

        <section className="responsibility section">
          <div className="responsibility-mark" aria-hidden="true"><span>○</span><i/><span>○</span></div>
          <div className="responsibility-copy">
            <p className="signal">Responsible access</p>
            <h2>The ocean is not<br />an empty workspace.</h2>
            <p>Low-noise propulsion, replaceable modules, and repeatable routes reduce disturbance and equipment waste. We design for long field lives, local repair, and research that can be revisited.</p>
            <a className="plain-link" href="#expedition">Read our field principles <Arrow /></a>
          </div>
        </section>

        <section className="expedition section" id="expedition">
          <div className="surface-lines" aria-hidden="true"><i/><i/><i/><i/><i/></div>
          <div className="expedition-copy">
            <p className="signal">Start with the water</p>
            <h2>Tell us where<br />you need to look.</h2>
            <p>Share the habitat, operating depth, vessel, and research question. We will shape a practical mission profile with your field team.</p>
            <a className="instrument-button light" href="mailto:expeditions@pelagossubsea.example?subject=Expedition%20planning">Plan an expedition <Arrow /></a>
          </div>
          <div className="expedition-meta"><span>Split · Croatia</span><span>Field operations worldwide</span><span>expeditions@pelagossubsea.example</span></div>
        </section>
      </main>
      <footer>
        <a className="brand" href="#top"><svg viewBox="0 0 38 38" aria-hidden="true"><circle cx="19" cy="19" r="17"/><path d="M8 21c5-6 8 6 13 0s8 6 10 0"/><circle cx="19" cy="19" r="3"/></svg><span>Pelagos<small>Subsea systems</small></span></a>
        <p>A fictional marine robotics concept created as a portfolio showcase.</p>
        <a href="mailto:hello@pelagossubsea.example">hello@pelagossubsea.example</a>
      </footer>
    </>
  )
}

export default App
