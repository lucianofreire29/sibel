// Protótipo local: não oferece segurança de autenticação em produção.
const ACCOUNTS = 'sibel_local_accounts_v1'
const SESSION = 'sibel_local_user_v1'
const normalize = value => value.trim().toLowerCase()

function accounts() {
  const raw = localStorage.getItem(ACCOUNTS)
  if (!raw) return []
  const result = JSON.parse(raw)
  if (!Array.isArray(result)) throw new Error('Dados locais inválidos.')
  return result
}

async function digest(password, salt) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: new TextEncoder().encode(salt), iterations: 100000, hash: 'SHA-256' }, key, 256)
  return Array.from(new Uint8Array(bits), byte => byte.toString(16).padStart(2, '0')).join('')
}

export async function registerAccount({ name, email, password, confirmation }) {
  if (!name.trim()) throw new Error('Informe seu nome.')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalize(email))) throw new Error('Informe um email válido.')
  if (password.length < 6) throw new Error('A senha deve ter pelo menos 6 caracteres.')
  if (password !== confirmation) throw new Error('As senhas não coincidem.')
  const salt = crypto.randomUUID()
  const hash = await digest(password, salt)
  const list = accounts()
  if (list.some(user => user.email === normalize(email))) throw new Error('Este email já está cadastrado neste navegador.')
  list.push({ id: crypto.randomUUID(), name: name.trim(), email: normalize(email), salt, hash })
  localStorage.setItem(ACCOUNTS, JSON.stringify(list))
  logout()
}

export async function loginAccount(email, password) {
  const user = accounts().find(user => user.email === normalize(email))
  if (!user || await digest(password, user.salt) !== user.hash) throw new Error('Email ou senha incorretos.')
  sessionStorage.setItem(SESSION, user.id)
}

export function currentUser() {
  try {
    const user = accounts().find(user => user.id === sessionStorage.getItem(SESSION))
    return user ? { id: user.id, name: user.name, email: user.email } : null
  } catch { return null }
}

export function logout() {
  sessionStorage.removeItem(SESSION)
  localStorage.removeItem('sibel_demo_session')
}

export function updateName(name) {
  if (!name.trim()) throw new Error('Informe seu nome.')
  const user = currentUser()
  if (!user) throw new Error('Entre novamente.')
  localStorage.setItem(ACCOUNTS, JSON.stringify(accounts().map(item => item.id === user.id ? { ...item, name: name.trim() } : item)))
  return currentUser()
}

export const initials = name => name.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase()
