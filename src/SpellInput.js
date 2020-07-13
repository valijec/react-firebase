import React from "react";
import firebase from './firebase'
import { Input, Button } from 'reactstrap';


export const SpellInput = ({ spell }) => {
  const [name, setName] = React.useState(spell.name);

  const onUpdate = () => {
    const db = firebase.firestore()
    db.collection('users').doc(spell.id).set({...spell, name})
  }

  const onDelete = () => {
    const db = firebase.firestore()
    db.collection('users').doc(spell.id).delete()
  }

  return (
    <>
      <Input
        value={name}
        onChange={e => {
          setName(e.target.value);
        }}
      />
      <Button onClick={onUpdate}>Update</Button>
      <Button onClick={onDelete}>Delete</Button>
    </>
  );
};
