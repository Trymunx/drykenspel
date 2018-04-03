import GameClient from "./gameclient";

export default GameClient;

export function signUp(email, displayName, password) {
  firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
    .then(({user}) => user.updateProfile({ displayName: displayName }))
    .then(() => {
      let user = firebase.auth().currentUser;
      alert("Created account " + user.email + " with display name " + user.displayName);
      let db = firebase.firestore();
      db.collection("users").doc(user.displayName).set({
        id: user.uid,
        name: user.displayName
      });
    })
    .catch((error) => {
      console.log(error);
      alert("Sign up failed.\n" + error.message);
    });
}

export function signIn(email, password) {
  firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
    .then(({user}) => {
      alert("Logged in as " + user.displayName + " with email " + user.email);
    })
    .catch((error) => {
      console.log(error);
      alert("Login failed.\n" + error.message);
    });
}
