import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export CanalEntity, { schema } from './model'

const router = new Router()
const { nome, logo, iptv } = schema.tree

/**
 * @api {post} /canal-entities Create canal entity
 * @apiName CreateCanalEntity
 * @apiGroup CanalEntity
 * @apiParam nome Canal entity's nome.
 * @apiParam logo Canal entity's logo.
 * @apiParam iptv Canal entity's iptv.
 * @apiSuccess {Object} canalEntity Canal entity's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Canal entity not found.
 */
router.post('/',
  body({ nome, logo, iptv }),
  create)

/**
 * @api {get} /canal-entities Retrieve canal entities
 * @apiName RetrieveCanalEntities
 * @apiGroup CanalEntity
 * @apiUse listParams
 * @apiSuccess {Object[]} canalEntities List of canal entities.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /canal-entities/:id Retrieve canal entity
 * @apiName RetrieveCanalEntity
 * @apiGroup CanalEntity
 * @apiSuccess {Object} canalEntity Canal entity's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Canal entity not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /canal-entities/:id Update canal entity
 * @apiName UpdateCanalEntity
 * @apiGroup CanalEntity
 * @apiParam nome Canal entity's nome.
 * @apiParam logo Canal entity's logo.
 * @apiParam iptv Canal entity's iptv.
 * @apiSuccess {Object} canalEntity Canal entity's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Canal entity not found.
 */
router.put('/:id',
  body({ nome, logo, iptv }),
  update)

/**
 * @api {delete} /canal-entities/:id Delete canal entity
 * @apiName DeleteCanalEntity
 * @apiGroup CanalEntity
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Canal entity not found.
 */
router.delete('/:id',
  destroy)

export default router
