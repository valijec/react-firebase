import React from "react";
import "./App.css";
import firebase from "./firebase";
import { SpellInput } from "./SpellInput";
import { Input, Button } from 'reactstrap';

function App() {
  const [spells, setSpells] = React.useState([]);
  const [username, setUsername] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("users").get();
      setSpells(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

  const onCreate = () => {
    const db = firebase.firestore();
    db.collection("users").add({ name: username });
  };

  return (
    <ul>
      <Input
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <Button onClick={onCreate}>Create</Button>
      {spells.map(spell => (
        <li key={spell.name}>
          <SpellInput spell={spell} />
        </li>
      ))}
    </ul>
  );
}

export default App;
