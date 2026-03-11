import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0a0a0a',
      color: '#fff',
      fontFamily: 'sans-serif',
    }}>
      <h1 style={{ fontSize: '96px', fontWeight: '900', color: '#D4AF37', lineHeight: '1' }}>
        404
      </h1>
      <p style={{ fontSize: '18px', color: '#78716C', marginTop: '16px' }}>
        Page not found
      </p>
      <Link
        href="/english/training"
        style={{
          marginTop: '32px',
          padding: '12px 28px',
          backgroundColor: '#D4AF37',
          color: '#fff',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '600',
          textDecoration: 'none',
        }}
      >
        Back to Training
      </Link>
    </div>
  )
}
