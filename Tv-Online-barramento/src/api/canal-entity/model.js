import mongoose, { Schema } from 'mongoose'

const canalEntitySchema = new Schema({
  nome: {
    type: String
  },
  logo: {
    type: String
  },
  iptv: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

canalEntitySchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      nome: this.nome,
      logo: this.logo,
      iptv: this.iptv,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('CanalEntity', canalEntitySchema)

export const schema = model.schema
export default model
