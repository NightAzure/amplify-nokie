import Posts from "./components/Posts"
import User from "./components/User"
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(outputs);

export default function App() {

  return (
    <Authenticator>
    <main>
      <User />
      <Posts />
    </main>
    </Authenticator>
  )
}
