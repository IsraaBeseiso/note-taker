const fs = require('fs');
const path = require('path');
const util = require('util')
const readFileAsync= util.promisify(fs.readFile)

module.exports = app => {
app.get('/api/notes', function(req, res){
    fs.readFile('db/db.json', function(err, data){
        var notes = []
        if(err){
            console.log(err)
        }

        notes = JSON.parse(data) || []
        res.send(notes)
    })
})
   

        // Setup the /api/notes post route
        app.post("/api/notes", function(req, res) {
            // Receives a new note, adds it to db.json, then returns the new note
            let newNote = req.body
    writeFileAsync('db/db.json', 'utf8', function(err, data){
        if(err) throw err
        return data
    }).then(
        notes => [...notes, newNote]
    ).then( updatedNotes => fs.writeFileSync('db/db.json', JSON.stringify(updatedNotes)))
    .then(()=> newNote)
           .catch((err) => res.status(500).json(err))
            // notes.push(newNote);
            // fs.writeFileSync('db/db.json', JSON.stringify(notes))
            // return console.log("Added new note: " + newNote.title);
        });

        // Retrieves a note with specific id
        app.get("/api/notes/:id", function(req,res) {
            // display json for the notes array indices of the provided id
            res.json(notes[req.params.id]);
        });

        // Deletes a note with specific id
        app.delete("/api/notes/:id", function(req, res) {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log("Deleted note with id "+req.params.id);
        });

        //updates the json file whenever a note is added or deleted
        function updateDb() {
            fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
                if (err) throw err;
                return true;
            });
        }

   

}
