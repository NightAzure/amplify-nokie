import { useAuthenticator } from "@aws-amplify/ui-react";

export default function User() {
  const { user, signOut } = useAuthenticator();
  const email = user?.signInDetails?.loginId;

  return (
    <div className="user-container">
      <h1>Welcome, {email}!</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
