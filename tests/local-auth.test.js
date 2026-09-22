import { test } from 'node:test'
import assert from 'node:assert/strict'
import { registerAccount, loginAccount, currentUser, logout, updateName, initials } from '../src/local-auth.js'

const storage = () => {
  const data = new Map()
  return { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), removeItem: key => data.delete(key) }
}

test('cadastro, validação, sessão, nome e isolamento entre contas', async () => {
  globalThis.localStorage = storage()
  globalThis.sessionStorage = storage()
  const account = { name: ' Luciano Freire ', email: ' LUCIANO@example.com ', password: 'senha-local', confirmation: 'senha-local' }
  await assert.rejects(registerAccount({ ...account, name: ' ' }), /nome/)
  await assert.rejects(registerAccount({ ...account, confirmation: 'diferente' }), /coincidem/)
  await registerAccount(account)
  assert.equal(currentUser(), null)
  assert.ok(!localStorage.getItem('sibel_local_accounts_v1').includes('senha-local'))
  await assert.rejects(registerAccount(account), /cadastrado/)
  await assert.rejects(loginAccount('luciano@example.com', 'errada'), /incorretos/)
  await assert.rejects(loginAccount('teste@sibel.com', '123456'), /incorretos/)
  await loginAccount('LUCIANO@example.com', account.password)
  assert.equal(currentUser().name, 'Luciano Freire')
  assert.equal(initials(currentUser().name), 'LF')
  updateName('Luciano Alves')
  assert.equal(currentUser().name, 'Luciano Alves')
  logout()
  assert.equal(currentUser(), null)
  await registerAccount({ ...account, name: 'Karla', email: 'karla@example.com' })
  await loginAccount('karla@example.com', account.password)
  assert.equal(currentUser().name, 'Karla')
  logout()
  await loginAccount('luciano@example.com', account.password)
  assert.equal(currentUser().name, 'Luciano Alves')
})
