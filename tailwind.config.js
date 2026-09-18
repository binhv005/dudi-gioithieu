/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#EC1420',         // Màu chủ đạo từ logo image.png
          'primary-hover': '#C80F1B', // Sắc độ đậm hơn 12-15% cho hover & focus
          accent: '#FF2E3B',          // Màu bổ trợ / highlight viền & badge
          surface: '#FEF2F2',         // Tông nền nhạt 5-10% (tint)
          dark: '#0B0F19',
          navy: '#0F172A',
          slate: '#1E293B',
          light: '#F8FAFC',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      screens: {
        '3xl': '1920px',
        '4xl': '2560px',
      },
      maxWidth: {
        '8xl': '88rem',     // 1408px
        '9xl': '96rem',     // 1536px
        '10xl': '105rem',   // 1680px
        'fluid': 'min(100% - clamp(24px, 4vw, 80px), 1680px)',
      },
      boxShadow: {
        'bento': '0 2px 8px -2px rgba(15, 23, 42, 0.05), 0 8px 24px -4px rgba(15, 23, 42, 0.08)',
        'bento-hover': '0 12px 32px -4px rgba(236, 20, 32, 0.12), 0 4px 12px -2px rgba(15, 23, 42, 0.06)',
        'premium': '0 20px 40px -15px rgba(236, 20, 32, 0.25)',
      }
    },
  },
  plugins: [],
}
