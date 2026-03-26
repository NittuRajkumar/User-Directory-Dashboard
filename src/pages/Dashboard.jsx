import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

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

function SortIcon({ column, sortConfig }) {
  if (sortConfig.key !== column) {
    return <span className="sort-icon neutral">⇅</span>
  }
  return (
    <span className="sort-icon active">
      {sortConfig.direction === 'asc' ? '↑' : '↓'}
    </span>
  )
}

export default function Dashboard() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const navigate = useNavigate()

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch users')
        return res.json()
      })
      .then((data) => {
        setUsers(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase()
    let result = users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
    )

    if (sortConfig.key) {
      result = [...result].sort((a, b) => {
        const aVal =
          sortConfig.key === 'company' ? a.company.name : a[sortConfig.key]
        const bVal =
          sortConfig.key === 'company' ? b.company.name : b[sortConfig.key]
        return sortConfig.direction === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal)
      })
    }

    return result
  }, [users, searchQuery, sortConfig])

  if (loading) {
    return (
      <div className="center-screen">
        <div className="spinner" />
        <p className="loading-text">Loading users…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="center-screen">
        <span className="big-icon">⚠️</span>
        <h3 className="error-heading">Failed to load users</h3>
        <p className="muted">{error}</p>
      </div>
    )
  }

  return (
    <div className="page-wrapper">
      {/* ── Header ── */}
      <header className="app-header">
        <div className="header-inner">
          <div className="header-logo">
            <span className="logo-icon">👥</span>
            <h1>User Directory</h1>
          </div>
          <span className="header-badge">{filtered.length} of {users.length} Users</span>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="dashboard-main">
        {/* Search */}
        <div className="toolbar">
          <div className="search-wrapper">
            <span className="search-icon-prefix">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search by name or email…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
          {sortConfig.key && (
            <button
              className="clear-sort-btn"
              onClick={() => setSortConfig({ key: null, direction: 'asc' })}
            >
              ✕ Clear sort
            </button>
          )}
        </div>

        {/* Table */}
        <div className="table-card">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <span className="big-icon">🔍</span>
              <h3>No users found</h3>
              <p className="muted">Try a different search term</p>
            </div>
          ) : (
            <div className="table-scroll">
              <table className="users-table">
                <thead>
                  <tr>
                    <th className="th-num">#</th>
                    <th>
                      <button
                        className="sort-btn"
                        onClick={() => handleSort('name')}
                      >
                        Name <SortIcon column="name" sortConfig={sortConfig} />
                      </button>
                    </th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>
                      <button
                        className="sort-btn"
                        onClick={() => handleSort('company')}
                      >
                        Company{' '}
                        <SortIcon column="company" sortConfig={sortConfig} />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user, idx) => (
                    <tr
                      key={user.id}
                      onClick={() => navigate(`/user/${user.id}`)}
                      title="View full profile"
                    >
                      <td className="td-num">{idx + 1}</td>
                      <td>
                        <div className="user-cell">
                          <div
                            className="avatar"
                            style={{
                              background:
                                AVATAR_COLORS[(user.id - 1) % AVATAR_COLORS.length],
                            }}
                          >
                            {getInitials(user.name)}
                          </div>
                          <div>
                            <div className="user-name">{user.name}</div>
                            <div className="user-username">@{user.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="td-email">{user.email}</td>
                      <td className="td-phone">{user.phone}</td>
                      <td>
                        <span className="company-tag">{user.company.name}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
