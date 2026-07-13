# Pelagos Subsea Design System

## Scene

A marine biologist stands in a research vessel observation bay before dawn. The cabin is dim, the sea beyond the glass is cobalt, and a warm instrument light picks out the Asteria vehicle descending toward a reef.

## Aesthetic Direction

Reference lane: oceanographic field instrument meets immersive natural-history exhibit. The ocean is volumetric and alive, but the typography and data presentation feel sturdy, calm, and legible. Avoid neon cyberpunk and floating software panels.

## Color Strategy

Drenched, with a deep mineral blue field and a small biological amber signal.

- Abyss: `oklch(0.13 0.055 244)`
- Pelagic blue: `oklch(0.25 0.09 235)`
- Kelp shadow: `oklch(0.25 0.055 174)`
- Sea glass: `oklch(0.78 0.075 184)`
- Instrument amber: `oklch(0.77 0.145 73)`
- Foam: `oklch(0.94 0.018 204)`
- Hull: `oklch(0.68 0.025 210)`

No pure black, pure white, or neon cyan. Amber is a navigational cue and should remain under 10 percent of the interface.

## Typography

- Display and instrument labels: Michroma, chosen for the machined lettering found on oceanographic equipment.
- Body: Manrope, open and highly legible over a moving field.
- Headlines are broad, geometric, and mostly sentence case.
- Numeric mission data uses tabular numerals.
- Body measure: maximum 70ch.

## Layout

- The WebGL canvas is fixed to the viewport and persists through the main narrative.
- DOM sections pass over and through the scene, each occupying at least one viewport.
- Hero copy sits in the lower-left observation area, leaving the vehicle visible to the right.
- Capabilities are arranged as a vertical mission sequence, not cards.
- Technical specifications form a single strong horizontal band.
- Final CTA rises into a lighter near-surface environment.

## 3D Scene

- Three.js scene with fog, directional water light, particle field, reef geometry, and a custom-built Asteria vehicle made from lightweight primitives.
- Pointer movement gently steers the vehicle and camera. Scroll moves the camera through the dive and changes vehicle orientation.
- The vehicle includes hull, side rails, thrusters, camera eye, and warm locator light.
- Reef forms use low-poly geometry and muted biological colors.
- No imported 3D assets are required, which avoids licensing and loading fragility.

## Motion

- Continuous render loop stores transient values in refs, outside React state.
- Pointer and scroll listeners are passive where applicable.
- Camera and vehicle movement use damped interpolation.
- Text sections reveal with opacity and transform only.
- Under reduced motion, the scene renders a calm fixed composition, particles stop, pointer steering is disabled, and all content remains visible.

## Components

- Fixed minimal navigation and expedition action.
- WebGL ocean stage with graceful non-WebGL fallback.
- Hero observation copy and interaction hint.
- Three-step mission sequence: map, sample, return.
- Technical mission band.
- Responsible-access statement.
- Expedition planning CTA and contact link.

## Interaction Details

- Pointer movement steers the vehicle within safe, subtle limits.
- Small crosshair cues react to active pointer input but are decorative.
- Buttons are compact instrument plates with clipped corners, never pills.
- Links reveal an amber line on hover and focus.
- Focus rings use foam and amber for high contrast.

## Responsive Behavior

- Mobile keeps the canvas but reduces reef and particle density.
- The vehicle shifts upward or behind a clear area so copy never competes with it.
- Numeric specifications stack at narrow widths.
- Pointer-only hints are hidden on touch-first devices.
- At 320px, all copy remains in flow and no content depends on hover.

