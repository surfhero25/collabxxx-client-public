import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";

function App() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const usersRef = collection(db, "users");
        onSnapshot(usersRef, (snapshot) => {
          setUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>CollabXXX</h1>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <h2>Users</h2>
          <ul>
            {users.map((u) => (
              <li key={u.id}>{u.email}</li>
            ))}
          </ul>
          <button onClick={() => auth.signOut()}>Sign Out</button>
        </div>
      ) : (
        <p>Please sign in.</p>
      )}
    </div>
  );
}

export default App;
