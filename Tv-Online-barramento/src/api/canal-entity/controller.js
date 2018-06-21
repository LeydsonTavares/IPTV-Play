import { success, notFound } from '../../services/response/'
import { CanalEntity } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  CanalEntity.create(body)
    .then((canalEntity) => canalEntity.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  CanalEntity.find(query, select, cursor)
    .then((canalEntities) => canalEntities.map((canalEntity) => canalEntity.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  CanalEntity.findById(params.id)
    .then(notFound(res))
    .then((canalEntity) => canalEntity ? canalEntity.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  CanalEntity.findById(params.id)
    .then(notFound(res))
    .then((canalEntity) => canalEntity ? Object.assign(canalEntity, body).save() : null)
    .then((canalEntity) => canalEntity ? canalEntity.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  CanalEntity.findById(params.id)
    .then(notFound(res))
    .then((canalEntity) => canalEntity ? canalEntity.remove() : null)
    .then(success(res, 204))
    .catch(next)
