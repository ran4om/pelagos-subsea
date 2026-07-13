# Pelagos Subsea

An immersive one-page marine robotics concept for a fictional autonomous reef-survey company.

## Run locally

```bash
npm install
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

## Implementation notes

- React, Vite, and Three.js.
- Three.js is loaded dynamically after the page mounts, keeping essential DOM content independent of WebGL.
- The Asteria vehicle, reef, particles, and light volumes are built from procedural primitives. No external 3D assets are used.
- Pointer and scroll interactions write to plain transient values, not React state.
- Reduced-motion mode renders one calm frame and disables steering and continuous animation.
- A CSS illustration appears if WebGL or the Three.js module fails.
- Contact actions use fictional `.example` email addresses.

This is a fictional portfolio project. No scientific results, endorsements, or customer testimonials are claimed.
