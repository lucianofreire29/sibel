import { useState } from 'react'
import { ArrowLeft, CalendarDays, Eye, EyeOff, Home, Scissors, UserRound } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'

export function Phone({ children, auth = false }) {
  return <main className={`phone ${auth ? 'phone--auth' : ''}`}>{children}</main>
}

export function StatusBar() {
  return (
    <div className="status-bar" aria-hidden="true">
      <span>9:41</span>
      <span className="status-icons"><i /><i /><b /></span>
    </div>
  )
}

export function Brand({ compact = false }) {
  return (
    <div className={`brand ${compact ? 'brand--compact' : ''}`}>
      <div className="brand-mark" aria-hidden="true"><span>S</span></div>
      <h1>SIBEL</h1>
      <p>Studio de Beleza e Estilo</p>
    </div>
  )
}

export function BackTitle({ children }) {
  const navigate = useNavigate()
  return (
    <header className="back-title">
      <button className="round-button" onClick={() => navigate(-1)} aria-label="Voltar"><ArrowLeft size={20} /></button>
      <h2>{children}</h2>
      <span />
    </header>
  )
}

export function Button({ children, secondary = false, className = '', ...props }) {
  return <button className={`main-button ${secondary ? 'main-button--secondary' : ''} ${className}`} {...props}>{children}</button>
}

export function Field({ label, type = 'text', icon, ...props }) {
  const [visible, setVisible] = useState(false)
  const password = type === 'password'
  return (
    <label className="field">
      {label && <span>{label}</span>}
      <span className="field-control">
        {icon}
        <input type={password && visible ? 'text' : type} {...props} />
        {password && (
          <button type="button" className="eye-button" onClick={() => setVisible(!visible)} aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}>
            {visible ? <EyeOff size={19} /> : <Eye size={19} />}
          </button>
        )}
      </span>
    </label>
  )
}

export function BottomNav() {
  const items = [
    ['/home', Home, 'Home'],
    ['/agendamento', CalendarDays, 'Agendas'],
    ['/servicos', Scissors, 'Serviços'],
    ['/perfil', UserRound, 'Perfil'],
  ]
  return (
    <nav className="bottom-nav">
      {items.map(([to, Icon, label]) => (
        <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'active' : ''}>
          <Icon size={20} strokeWidth={2.2} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export function AppScreen({ children, nav = true, className = '' }) {
  return (
    <Phone>
      <StatusBar />
      <div className={`app-content ${className}`}>{children}</div>
      {nav && <BottomNav />}
    </Phone>
  )
}

export function Avatar({ person, small = false }) {
  return <span className={`avatar avatar--${person.tone} ${small ? 'avatar--small' : ''}`}>{person.initials}</span>
}

