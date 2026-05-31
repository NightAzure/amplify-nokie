import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

// Define our data schema
const schema = a.schema({
  
Post: a.model({
  caption: a.string(),
  email: a.string(),
  userId: a.string(),
  date: a.string(),
  imagePath: a.string()
})
.authorization(allow => [
  allow.authenticated().to(['read']),
  allow.ownerDefinedIn("userId").to(['create', 'update', 'delete'])
])
});

// Create the data resource
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  }
});

// Export types for frontend use
export type Schema = ClientSchema<typeof schema>;