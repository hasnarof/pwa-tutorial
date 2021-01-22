// enable offline data
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

// add new recipe

          /*
            ini buat nambah recipe cuma pake code di bawah ini doang.
            bener bener simple. ga ada ribet2 di hubungan index db dengan fire store
            firestore udah mengatasi hal ini dgn library nya tadi yang enable persistence
          */
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
  evt.preventDefault(); // ini supaya ga berlaku default (refresh ketika submit)
  
  const recipe = {
    name: form.title.value,
    ingredients: form.ingredients.value
  };

  db.collection('recipes').add(recipe) // nambah di table recipes
    .catch(err => console.log(err));

  form.title.value = ''; // ini buat supaya abis submit form, value di form nya ilang.
  form.ingredients.value = '';
});