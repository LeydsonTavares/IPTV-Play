import { CanalEntity } from '.'

let canalEntity

beforeEach(async () => {
  canalEntity = await CanalEntity.create({ nome: 'test', logo: 'test', iptv: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = canalEntity.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(canalEntity.id)
    expect(view.nome).toBe(canalEntity.nome)
    expect(view.logo).toBe(canalEntity.logo)
    expect(view.iptv).toBe(canalEntity.iptv)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = canalEntity.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(canalEntity.id)
    expect(view.nome).toBe(canalEntity.nome)
    expect(view.logo).toBe(canalEntity.logo)
    expect(view.iptv).toBe(canalEntity.iptv)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
