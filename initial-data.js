const crypto = require('crypto');
const randomString = () => crypto.randomBytes(6).hexSlice();

module.exports = async keystone => {
  // Count existing users
  const {
    data: {
      _allUsersMeta: { count: usersCount },
      _allTenantsMeta: { count: tenantsCount }
    },
  } = await keystone.executeQuery(
    `query {
      _allUsersMeta {
        count
      },
      _allTenantsMeta {
        count
      }
    }`
  );

  if (tenantsCount === 0) {
    await keystone.executeQuery(
      ``
    )
  }

  if (usersCount === 0) {
    const password = 'password';
    const email = 'benjibuiltit@gmail.com';

    await keystone.executeQuery(
      `mutation initialUser($password: String, $email: String) {
            createUser(data: {
              firstName: "Benji",
              lastName: "Speer",
              email: $email, isAdmin: true, password: $password}) {
              id
            }
          }`,
      {
        variables: {
          password,
          email,
        },
      }
    );

    console.log(`
No existing user found, creating one...

User created:
  email: ${email}
  password: ${password}
Please change these details after initial login.
`);
  }
};
