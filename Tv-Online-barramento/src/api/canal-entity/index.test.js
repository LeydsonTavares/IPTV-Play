import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { CanalEntity } from '.'

const app = () => express(apiRoot, routes)

let canalEntity

beforeEach(async () => {
  canalEntity = await CanalEntity.create({})
})

test('POST /canal-entities 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ nome: 'test', logo: 'test', iptv: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.nome).toEqual('test')
  expect(body.logo).toEqual('test')
  expect(body.iptv).toEqual('test')
})

test('GET /canal-entities 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /canal-entities/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${canalEntity.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(canalEntity.id)
})

test('GET /canal-entities/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /canal-entities/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${canalEntity.id}`)
    .send({ nome: 'test', logo: 'test', iptv: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(canalEntity.id)
  expect(body.nome).toEqual('test')
  expect(body.logo).toEqual('test')
  expect(body.iptv).toEqual('test')
})

test('PUT /canal-entities/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ nome: 'test', logo: 'test', iptv: 'test' })
  expect(status).toBe(404)
})

test('DELETE /canal-entities/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${canalEntity.id}`)
  expect(status).toBe(204)
})

test('DELETE /canal-entities/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
