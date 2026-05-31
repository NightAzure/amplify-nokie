import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'myBucket',
  access: (allow) => ({
    'post-pictures/{entity_id}/*': [
      allow.authenticated.to(['read']),
      allow.entity('identity').to(['write', 'delete']),
    ]
  })
});