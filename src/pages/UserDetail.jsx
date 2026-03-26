import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const AVATAR_COLORS = [
  '#4f46e5', '#7c3aed', '#db2777', '#dc2626',
  '#d97706', '#059669', '#0891b2', '#0284c7',
  '#6366f1', '#8b5cf6',
]

function getInitials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function InfoRow({ icon, label, value, link }) {
  return (
    <div className="info-row">
      <span className="info-icon">{icon}</span>
      <div className="info-content">
        <span className="info-label">{label}</span>
        {link ? (
          <a
            className="info-value info-link"
            href={link}
            target="_blank"
            rel="noreferrer noopener"
          >
            {value}
          </a>
        ) : (
          <span className="info-value">{value}</span>
        )}
      </div>
    </div>
  )
}

function InfoCard({ title, icon, children, fullWidth }) {
  return (
    <div className={`info-card${fullWidth ? ' info-card-full' : ''}`}>
      <h3 className="info-card-title">
        <span>{icon}</span> {title}
      </h3>
      {children}
    </div>
  )
}

export default function UserDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('User not found')
        return res.json()
      })
      .then((data) => {
        setUser(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div className="center-screen">
        <div className="spinner" />
        <p className="loading-text">Loading profile…</p>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="center-screen">
        <span className="big-icon">⚠️</span>
        <h3 className="error-heading">User not found</h3>
        <p className="muted">{error}</p>
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Back to Dashboard
        </button>
      </div>
    )
  }

  const avatarColor = AVATAR_COLORS[(user.id - 1) % AVATAR_COLORS.length]
  const fullAddress = `${user.address.street}, ${user.address.suite}, ${user.address.city} ${user.address.zipcode}`

  return (
    <div className="page-wrapper">
      {/* ── Header ── */}
      <header className="app-header">
        <div className="header-inner">
          <div className="header-logo">
            <span className="logo-icon">👥</span>
            <h1>User Directory</h1>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="detail-main">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Back to Dashboard
        </button>

        {/* Profile Hero */}
        <div className="profile-hero" style={{ background: `linear-gradient(135deg, #3730a3 0%, ${avatarColor} 100%)` }}>
          <div className="profile-avatar">
            {getInitials(user.name)}
          </div>
          <div className="profile-info">
            <h2>{user.name}</h2>
            <p className="profile-username">@{user.username}</p>
            <span className="profile-company-tag">{user.company.name}</span>
          </div>
        </div>

        {/* Detail Cards Grid */}
        <div className="detail-grid">
          {/* Contact */}
          <InfoCard title="Contact" icon="📬">
            <InfoRow icon="📧" label="Email" value={user.email} link={`mailto:${user.email}`} />
            <InfoRow icon="📞" label="Phone" value={user.phone} />
            <InfoRow icon="🌐" label="Website" value={user.website} link={`https://${user.website}`} />
          </InfoCard>

          {/* Address */}
          <InfoCard title="Address" icon="📍">
            <InfoRow icon="🏠" label="Street" value={`${user.address.street}, ${user.address.suite}`} />
            <InfoRow icon="🏙️" label="City" value={user.address.city} />
            <InfoRow icon="📮" label="Zipcode" value={user.address.zipcode} />
            <InfoRow
              icon="🗺️"
              label="Map"
              value="View on map"
              link={`https://www.google.com/maps?q=${user.address.geo.lat},${user.address.geo.lng}`}
            />
          </InfoCard>

          {/* Company */}
          <InfoCard title="Company" icon="🏢" fullWidth>
            <InfoRow icon="🏷️" label="Name" value={user.company.name} />
            <InfoRow icon="💼" label="Tagline" value={user.company.catchPhrase} />
            <InfoRow icon="📈" label="Strategy" value={user.company.bs} />
          </InfoCard>
        </div>
      </main>
    </div>
  )
}
