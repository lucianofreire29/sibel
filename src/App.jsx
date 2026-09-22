import { useEffect, useMemo, useState } from 'react'
import {
  Bell, CalendarDays, Check, ChevronRight, Clock3, Mail, MapPin,
  Search, Sparkles, Star, UserRound,
} from 'lucide-react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { AppScreen, Avatar, BackTitle, Brand, Button, Field, Phone } from './components.jsx'
import { professionals, services } from './data.js'

function Splash() {
  const navigate = useNavigate()
  useEffect(() => {
    const timer = window.setTimeout(() => navigate('/login'), 1700)
    return () => window.clearTimeout(timer)
  }, [navigate])
  return (
    <Phone auth>
      <button className="splash" onClick={() => navigate('/login')} aria-label="Ir para o login">
        <Brand />
        <span className="loading"><i /></span>
      </button>
    </Phone>
  )
}

function Login() {
  const navigate = useNavigate()
  return (
    <Phone auth>
      <div className="auth-page login-page">
        <Brand compact />
        <form onSubmit={(event) => { event.preventDefault(); navigate('/home') }}>
          <Field type="email" aria-label="Email" placeholder="sibel@gmail.com" required />
          <Field type="password" aria-label="Senha" placeholder="••••••" required />
          <p className="auth-link">Esqueceu a senha? <button type="button" onClick={() => navigate('/recuperar-senha')}>Clique aqui</button></p>
          <Button type="submit">Entrar</Button>
          <p className="signup-link">Não possui uma conta?<button type="button" onClick={() => navigate('/cadastro')}>Clique Aqui</button></p>
        </form>
        <span className="loading"><i /></span>
      </div>
    </Phone>
  )
}

function Register() {
  const navigate = useNavigate()
  return (
    <Phone auth>
      <div className="auth-page form-page">
        <Brand compact />
        <BackTitle>Cadastro</BackTitle>
        <form onSubmit={(event) => { event.preventDefault(); navigate('/login') }}>
          <Field label="Nome" placeholder="Nome" required />
          <Field label="Email" type="email" placeholder="sibel@gmail.com" required />
          <Field label="Senha" type="password" placeholder="••••••" required />
          <Field label="Confirmar senha" type="password" placeholder="••••••" required />
          <Button type="submit">Confirmar cadastro</Button>
        </form>
      </div>
    </Phone>
  )
}

function RecoverPassword() {
  const navigate = useNavigate()
  return (
    <Phone auth>
      <div className="auth-page recover-page">
        <Brand compact />
        <BackTitle>Esqueci a senha</BackTitle>
        <form onSubmit={(event) => { event.preventDefault(); navigate('/nova-senha') }}>
          <Field label="Insira o email" type="email" placeholder="sibel@gmail.com" required />
          <Button type="submit">Enviar email</Button>
          <p className="helper-card"><Mail size={18} />Enviaremos um link para redefinir sua senha. Verifique também a caixa de spam.</p>
        </form>
      </div>
    </Phone>
  )
}

function NewPassword() {
  const navigate = useNavigate()
  return (
    <Phone auth>
      <div className="auth-page recover-page">
        <Brand compact />
        <BackTitle>Atualizar senha</BackTitle>
        <form onSubmit={(event) => { event.preventDefault(); navigate('/login') }}>
          <Field label="Insira a nova senha" type="password" placeholder="••••••" required />
          <Field label="Repita a nova senha" type="password" placeholder="••••••" required />
          <Button type="submit">Confirmar nova senha</Button>
        </form>
      </div>
    </Phone>
  )
}

function Home() {
  const navigate = useNavigate()
  return (
    <AppScreen className="home-page">
      <header className="home-header">
        <strong>SIBEL</strong>
        <button className="mini-avatar" onClick={() => navigate('/perfil')} aria-label="Abrir perfil">JG</button>
      </header>
      <section className="greeting"><span>Olá,</span><h2>Juliana</h2></section>
      <section className="schedule-card">
        <h3>Agendar horário</h3><p>Escolha seu serviço.</p>
        <div className="schedule-picks"><span><CalendarDays size={16} />Hoje, 18 Out</span><span><Clock3 size={16} />Qualquer hora</span></div>
        <Button onClick={() => navigate('/profissionais')}>Iniciar agendamento</Button>
      </section>
      <section className="section-block">
        <h3>Próximo Agendamento</h3>
        <article className="appointment-card">
          <div className="appointment-person"><Avatar small person={professionals[0]} /><span><b>Allana Lima</b><small>Corte & Escova</small></span><em>Confirmado</em></div>
          <div className="appointment-time"><span><CalendarDays size={15} />Amanhã, 19 Out</span><span><Clock3 size={15} />14:30 - 15:30</span></div>
        </article>
      </section>
      <section className="section-block pros-preview">
        <div className="section-title"><h3>Profissionais</h3><button onClick={() => navigate('/profissionais')}>Ver todos</button></div>
        <div className="pros-scroll">
          {professionals.slice(0, 3).map(person => <article key={person.id}><Avatar person={person} /><b>{person.name}</b><small>{person.specialty}</small><span><Star size={12} fill="currentColor" />4.{10 - person.id}</span></article>)}
        </div>
      </section>
    </AppScreen>
  )
}

function Professionals() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const list = useMemo(() => professionals.filter(item => `${item.name} ${item.specialty}`.toLowerCase().includes(query.toLowerCase())), [query])
  return (
    <AppScreen className="professionals-page">
      <BackTitle>Profissionais</BackTitle>
      <label className="search-box"><Search size={20} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar por especialização" /></label>
      <section className="professionals-list">
        {list.map(person => (
          <article key={person.id}>
            <i className="online-dot" /><Avatar person={person} />
            <div><p><b>{person.name}</b><span>{person.days}</span></p><small>{person.specialty}</small></div>
            <Button onClick={() => navigate('/servicos')}>Adicionar</Button>
          </article>
        ))}
        {!list.length && <p className="empty-state">Nenhuma profissional encontrada.</p>}
      </section>
    </AppScreen>
  )
}

function Services() {
  const navigate = useNavigate()
  const [category, setCategory] = useState('Todos')
  const categories = ['Todos', 'Cabelo', 'Estética', 'Unhas']
  const list = category === 'Todos' ? services : services.filter(service => service.category === category)
  return (
    <AppScreen className="services-page">
      <BackTitle>Serviços</BackTitle>
      <p className="page-subtitle">Selecione um serviço</p>
      <div className="filter-row">{categories.map(item => <button className={item === category ? 'active' : ''} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div>
      <section className="service-list">
        {list.map((service, index) => (
          <article key={service.id}>
            <span className="service-icon">{index + 1}</span>
            <div><h3>{service.title}</h3><p>{service.description}</p></div>
            <span className="service-price"><b>R$ {service.price}</b><small>{service.duration}</small></span>
            <button className="add-icon" onClick={() => navigate('/agendamento')} aria-label={`Adicionar ${service.title}`}><ChevronRight size={18} /></button>
          </article>
        ))}
      </section>
    </AppScreen>
  )
}

function Scheduling() {
  const navigate = useNavigate()
  return (
    <AppScreen nav={false} className="scheduling-page">
      <BackTitle>Agendamento</BackTitle>
      <p className="page-subtitle">Escolha os detalhes do seu horário</p>
      <form onSubmit={(event) => { event.preventDefault(); navigate('/confirmar') }}>
        <Field label="Profissional" defaultValue="Allana Lima" icon={<UserRound size={18} />} />
        <div className="form-grid"><Field label="Data" type="date" defaultValue="2026-10-19" /><Field label="Horário" type="time" defaultValue="14:30" /></div>
        <Field label="Serviço selecionado" defaultValue="Corte + Escova" icon={<Sparkles size={18} />} />
        <label className="field"><span>Observações (opcional)</span><textarea placeholder="Escreva alguma preferência ou observação" /></label>
        <div className="form-total"><span>Total</span><strong>R$ 120,00</strong></div>
        <Button type="submit">Continuar agendamento</Button>
      </form>
    </AppScreen>
  )
}

function ConfirmAppointment() {
  const navigate = useNavigate()
  return (
    <AppScreen nav={false} className="confirmation-page">
      <BackTitle>Confirmar agendamento</BackTitle>
      <section className="confirmation-intro"><CalendarDays size={28} /><h2>Quase tudo pronto!</h2><p>Revise os dados do seu agendamento.</p></section>
      <section className="summary-card">
        <h3>Corte + Escova</h3>
        <div><Avatar small person={professionals[0]} /><span><small>Profissional</small><b>Allana Lima</b></span></div>
        <div><CalendarDays size={19} /><span><small>Data e horário</small><b>19 de outubro, 14:30</b></span></div>
        <div><MapPin size={19} /><span><small>Localização</small><b>Studio Sibel</b><p>Fortaleza, Ceará</p></span></div>
      </section>
      <div className="sticky-actions"><Button onClick={() => navigate('/sucesso')}>Confirmar Agendamento</Button><Button secondary onClick={() => navigate('/agendamento')}>Editar agendamento</Button></div>
    </AppScreen>
  )
}

function Success() {
  const navigate = useNavigate()
  return (
    <AppScreen nav={false} className="success-page">
      <div className="success-content"><span className="success-check"><Check size={32} /></span><h2>Tudo pronto!</h2><p>Seu agendamento foi confirmado.</p></div>
      <p className="reassurance"><Bell size={20} />Enviaremos notificações de confirmação e instruções de preparação por WhatsApp e e-mail.</p>
      <Button onClick={() => navigate('/home')}>Voltar para o início</Button>
    </AppScreen>
  )
}

function Profile() {
  const [tab, setTab] = useState('Meus dados')
  const tabs = ['Meus dados', 'Endereço', 'Segurança', 'Aparência']
  return (
    <AppScreen className="profile-page">
      <BackTitle>Perfil</BackTitle>
      <div className="profile-identity"><span className="profile-avatar">GC</span><h2>Guilherme Campos</h2><p>guilherme@gmail.com</p></div>
      <div className="profile-tabs">{tabs.map(item => <button className={tab === item ? 'active' : ''} onClick={() => setTab(item)} key={item}>{item}</button>)}</div>
      {tab === 'Meus dados' && <form className="profile-form"><h3>Meus dados</h3><Field label="Nome*" defaultValue="Guilherme Campos" /><Field label="Data nascimento (opcional)" placeholder="Informe a data" /><Field label="Celular*" defaultValue="+55 85 9 9435-6543" /><fieldset><legend>Gênero (opcional)</legend>{['Feminino', 'Masculino', 'Outros'].map(item => <label key={item}><input type="radio" name="gender" />{item}</label>)}</fieldset><Button>Salvar</Button><Button secondary>Excluir conta</Button></form>}
      {tab === 'Endereço' && <form className="profile-form"><h3>Endereço</h3><Field label="CEP" placeholder="00000-000" /><Field label="Rua" placeholder="Nome da rua" /><Field label="Número" placeholder="Número" /><Button>Salvar endereço</Button></form>}
      {tab === 'Segurança' && <form className="profile-form"><h3>Segurança</h3><Field label="Senha atual*" type="password" placeholder="Senha atual" /><Field label="Nova senha*" type="password" placeholder="Nova senha" /><Field label="Confirmação de senha*" type="password" placeholder="Confirmação de senha" /><Button>Salvar</Button></form>}
      {tab === 'Aparência' && <section className="appearance-card"><h3>Aparência</h3><p>Escolha o estilo visual do aplicativo.</p><button className="theme-preview active"><i />Tema Sibel</button></section>}
    </AppScreen>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/recuperar-senha" element={<RecoverPassword />} />
      <Route path="/nova-senha" element={<NewPassword />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profissionais" element={<Professionals />} />
      <Route path="/servicos" element={<Services />} />
      <Route path="/agendamento" element={<Scheduling />} />
      <Route path="/confirmar" element={<ConfirmAppointment />} />
      <Route path="/sucesso" element={<Success />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

