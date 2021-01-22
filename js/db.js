// real-time listener
      /*
      real time listener ketika ada data di database yang di add / di hapus (perubahan di database)
      onSnapshot merupakan method yang dapat me listen perubahan pada collection recipes. kemudian ada snaphot, yaitu perubahan2nya.
      */
db.collection('recipes').onSnapshot(snapshot => { // collection == table.
  //console.log(snapshot.docChanges());
  snapshot.docChanges().forEach(change => { // docChanges ngelist perubahan2 itu... change.doc.data (buat tau data)
                                            // change.doc.id buat tau id
    //console.log(change.type, change.doc.id, change.doc.data());
    if(change.type === 'added'){
      // add the document data to the web page
    }
    if(change.type === 'removed'){
      // remove the document data from the web page
    }
  });
});