const { atTracking } = require('@keystonejs/list-plugins');
const { byTracking } = require('@keystonejs/list-plugins');
const { Uuid, Text, Checkbox, Password, Relationship } = require('@keystonejs/fields');
const { v4 } = require('uuid');
const access = require('../access');

const list = {
  name: 'User',
  schema: {
    fields: {
      id: { type: Uuid, defaultValue: v4, isRequired: true, isUnique: true },
      firstName: { type: Text },
      lastName: { type: Text },
      email: {
        type: Text,
        isUnique: true,
      },
      isAdmin: {
        type: Checkbox,
        defaultValue: false,
        // Field-level access controls
        // Here, we set more restrictive field access so a non-admin cannot make themselves admin.
        access: {
          update: access.userIsAdmin,
        },
      },
      tenants: {
        type: Relationship,
        ref: 'Tenant.users',
        many: true
      },
      password: {
        type: Password,
      },
    },
    // List-level access controls
    access: {
      read: access.userIsAdminOrOwner,
      update: access.userIsAdminOrOwner,
      create: access.userIsAdmin,
      delete: access.userIsAdmin,
      auth: true,
    },
    plugins: [
      atTracking(),
      byTracking()
    ]
  }
};

module.exports = list;