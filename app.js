
const fs =  require('fs');
const yargs = require('yargs');

const notes = require('./notes.js');

// ------------ Begin - command configuration -----------------


const custid = {
    describe: 'Customer Id',
    demand : true,
    alias : 'a'
}

const custname = {
    describe: 'Customer Name',
    demand : true,
    alias : 'b'
}
const custemail = {
    describe: 'Customer Email',
    demand : true,
    alias : 'c'
}

const argv =  yargs

    .command('add','Add a new note',{
      Id: custid,
      Name: custname,
        Email:custemail
    })
    .command('update','Add a new note',{
        Id: custid,
        Name: custname,
        Email:custemail
    })
    .command('list','List all notes')
    .command('read','Read a note',{
      Id: custid
    })
    .command('remove','Remove a Note',{
      Id: custid
    })
    .help()
    .argv;


// ------------ End - command configuration -----------------


var command = yargs.argv._[0];


if (command === 'add'){
    var note = notes.add(argv.Id,argv.Name,argv.Email);
    if (note){
      notes.logNote(note);                                //add a new note
    } else{
      console.log("Data already exists");
    }
}

else if (command === 'list') {
  var AllNotes = notes.getData();
  console.log(`Printing ${AllNotes.length} note(s).`);
  AllNotes.forEach((note)=>{                                //list all note(s)
    notes.logNote(note);
  });
}

else if (command === 'read') {
   var note = notes.getSingle(argv.Id);
   if(note){
    notes.logNote(note);                                //read a note
          }
   else{
    console.log("Data not found");
   }
}
else if (command === 'remove') {
    var noteRemoved = notes.remove(argv.Id);
    var message = noteRemoved ? 'Data removed' : 'Data not found';
    console.log(message);
}
else if (command === 'update'){
    var note = notes.update(argv.Id,argv.Name,argv.Email);
    if (note){
        notes.logNote(note);                                //add a new note
    } else{
        console.log("Data already exist");
    }
}


else{
  console.log('Error Notfound 404');
}
