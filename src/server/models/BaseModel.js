const { Model, QueryBuilder, transaction } = require('objection');

class BaseQueryBuilder extends QueryBuilder {
  findOneOrInsert(query, insertPayload) {
    return transaction(this.modelClass(), async (BoundModel) => {
      const entity = await BoundModel.query().findOne(query);

      if (entity) {
        return entity;
      }

      return BoundModel.query().insert(insertPayload).returning('*');
    });
  }
}

class BaseModel extends Model {
  static timestamps = false;

  static get QueryBuilder() {
    return BaseQueryBuilder;
  }

  $beforeInsert() {
    if (BaseModel.timestamps) {
      this.createdAt = new Date().toISOString();
    }
  }

  $beforeUpdate() {
    if (BaseModel.timestamps) {
      this.updatedAt = new Date().toISOString();
    }
  }
}

module.exports = BaseModel;
