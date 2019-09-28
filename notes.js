const fs =  require('fs');


// ------------------Begin of Reusable functions ---------------------

var fetchcustmrNotes = () => {
  try {                          //if file won't exist
    var custmrString = fs.readFileSync('notes-data.json')
    return JSON.parse(custmrString);
  } catch(e){
    return [];
  }
};

var savecustmrNotes = (custmrnotes) => {
  fs.writeFileSync('notes-data.json',JSON.stringify(custmrnotes));
};


// ------------------End of Reusable functions ---------------------


//  to add a new note

var add = (Id,Name,Email) => {
    var custmrnotes = fetchcustmrNotes();
    var custmrnote = {Id,Name,Email}

    var duplicateNotes =  custmrnotes.filter((note) => { // to check if note already exists
      return note.Id === Id;
    });

    if (duplicateNotes.length === 0){
      custmrnotes.push(custmrnote);
      savecustmrNotes(custmrnotes);
      return custmrnote
    }

  };


//to list all the notes

var getData = () => {
    return fetchcustmrNotes();
};


// to read a note

var getSingle = (Id) => {
    
    var custmrnotes = fetchcustmrNotes();
    var getNotes =  custmrnotes.filter((note) => {  // to check if note exists and return note

        return note.Id === Id;
    });

    return getNotes[0]

};


// to delete a note

var remove = (Id) => {

    var custmrnotes = fetchcustmrNotes(); // reusable func

    var filteredNotes =  custmrnotes.filter((note) => { // will return all other notes other than "note to be removed"
      return note.Id !== Id;
    });

    savecustmrNotes(filteredNotes); //save new notes array

    return custmrnotes.length !== filteredNotes.length
    
};

// function just to print out note to screen

var logNote = (custmr) => {
  console.log('--');
  console.log(`Customer Id: ${custmr.Id}`);
  console.log(`Customer Name: ${custmr.Name}`);
    console.log(`Customer Email: ${custmr.Email}`);
};

var update = (Id,Name,Email) => {
    var custmrnotes = fetchcustmrNotes();
    var custmrnote = {Id,Name,Email}
    // console.log(notes);
    var duplicateNotes =  custmrnotes.filter((note) => { // to check if note already exists
        // console.log(note.Id);
        // console.log(Id);
        return note.Id === Id;
    });
    console.log(duplicateNotes.length);
    if (duplicateNotes.length === 1){
        remove(Id);
        var custmrnotes = fetchcustmrNotes();
        custmrnotes.push(custmrnote);
        savecustmrNotes(custmrnotes);
        return custmrnote
    }

};


// add new function names here to be accessible from other modules

module.exports = {
  add, getData, remove, getSingle,logNote,update
};
