// enable offline data
        /*
        Offline Data
        jadi di browser chrome itu support kalo mau nyimpen data secara offline di IndexedDB. Jadi IndexedDB
        itu sebagai penengah antara app dan firebase / firestore(?)

        kalo offline, add data di indexed db itu dulu atau di firebase dulu. baru nanti kalo online di sync.

        nah dari firebase sendiri udah ada library nya buat biar ga ribet gitu tentang mediator ini. di bawah ini
        adalah kode untuk biar offline data itu berfungsi, dan bisa sync itu nantinya antara indexedDB dan firebase.
        
        liat sw.js juga
        */
db.enablePersistence()
  .catch(function(err) {
    if (err.code == 'failed-precondition') {
      // probably multible tabs open at once
      console.log('persistance failed');
    } else if (err.code == 'unimplemented') {
      // lack of browser support for the feature
      console.log('persistance not available');
    }
  });

// real-time listener
db.collection('recipes').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if(change.type === 'added'){
      renderRecipe(change.doc.data(), change.doc.id);
    }
    if(change.type === 'removed'){
      // remove the document data from the web page
    }
  });
});