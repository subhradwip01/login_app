firebase.auth().onAuthStateChanged((usercredential) => {
  if (!usercredential) {
    location.replace("index.html");
  } else {
    console.log(usercredential.uid);
    const dbRef = firebase.database().ref();
    dbRef
      .child("users")
      .child(usercredential.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data=snapshot.val()
          document.getElementById("usern").innerText="Welcome!! "+data.username;

        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

  }
});
function logout() {
  firebase.auth().signOut();
}

