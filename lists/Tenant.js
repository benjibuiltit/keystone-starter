const { atTracking } = require('@keystonejs/list-plugins');
const { byTracking } = require('@keystonejs/list-plugins');
const { Uuid, Text, Relationship } = require('@keystonejs/fields');
const { v4 } = require('uuid');

const list = {
  name: 'Tenant',
  schema: {
    fields: {
      id: { 
        type: Uuid,
        defaultValue: v4,
        isRequired: true,
        isUnique: true
      },
      name: {
        type: Text,
        isRequired: true
      },
      users: {
        type: Relationship,
        ref: 'User.tenants',
        many: true
      }
    },
    plugins: [
      atTracking(),
      byTracking()
    ]
  }
};

module.exports = list;