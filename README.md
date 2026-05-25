# 💖 RootOfMyHeart (Interactive Love Jar & 3D Birthday Cake) 🎂

Welcome to **RootOfMyHeart** - an ultra-premium, highly interactive romantic web application specially designed and crafted as a birthday tribute to the most extraordinary, precious, and special girl who holds my entire heart: **Ky Duyen** (May 26, 1997).

The live production application is hosted at: 👉 **[https://root-of-my-heart.vercel.app](https://root-of-my-heart.vercel.app)**

---

## 🌟 Interactive Key Features

1. **Romantic Welcome Screen Overlay:**
   - A gorgeous glassmorphic greeting screen with a pulsing heart button to seamlessly bypass modern mobile browsers' strict audio autoplay blockades (Safari/Chrome).
2. **Seamless Heart-Shaped Glass Jar:**
   - A stunning, custom hand-blown heart-shaped bottle rendered using a single unified SVG vector path with realistic glass reflections and a warm glowing pink liquid core inside.
   - Tap the oak cork lid to pop it off dynamically and automatically trigger the romantic grand piano background music.
3. **Drifting Fireflies & Floating Hearts (GPU 3D Accelerated):**
   - 16 glowing fireflies and 6 emerging interactive hearts floating from the jar center. Perfectly optimized with hardware acceleration (`translate3d` and `will-change`) for silky smooth 60fps - 120fps physics on iOS Safari and Android.
4. **Gold-Crimson Wax Seal Envelopes:**
   - Interactive love letters enclosed in custom glassmorphic modal windows, complete with an elegant **Crimson-Gold Wax Seal embossed with a 3D Heart** for a highly premium, classical romantic aesthetic.
5. **Physical Candle Blowing (Web Audio API):**
   - After reading all letters, a delicious 3D CSS strawberry birthday cake emerges.
   - She can **blow actual air directly into her phone's microphone** (using an integrated low-frequency audio frequency analyzer) or tap the cake directly to blow out the 3 flickering candles!
6. **Realistic Smoke & Confetti Fireworks Explosion:**
   - Once the candles are blown out, a realistic puff of grey smoke rises and drifts away, immediately followed by an explosive multi-colored paper confetti fireworks celebration (`canvas-confetti`), revealing the final letter card with no ugly scrollbars.

---

## 🛠 Tech Stack

- **Core Framework:** React (Vite 5)
- **Styling:** Vanilla CSS, HSL dynamic color palettes, Glassmorphism, Specular Reflection SVG vectors.
- **Audio Physics:** Web Audio API (Low-frequency decibel analyzer for real-time microphone breath detection).
- **Motion & Particle Effects:** `canvas-confetti` for fireworks, hardware-accelerated CSS Keyframes for drifting fireflies, shooting stars, rising smoke, and spring-physics bottle popping.

---

## 🚀 Local Development Guide

1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Run Local Development Server:**
   ```bash
   npm run dev
   ```
3. **Build Production Bundle:**
   ```bash
   npm run build
   ```

---

## ☁️ One-Click Vercel Deployment

The project is fully pre-configured for Vercel. Deploy the latest version instantly with a single command:
```bash
npx vercel --prod --yes
```

---

*Wishing my beautiful Ky Duyen—the light of my life and the rhythm of my heart—a birthday overflowing with endless sweetness, pure magic, and eternal joy! ❤️*
