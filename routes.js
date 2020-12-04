const fs = require('fs');
const path = require('path');
const util = require('util')
const readFileAsync= util.promisify(fs.readFile)

module.exports = app => {
function getNotes(note){
    let newNote = note
    readFileAsync('db/db.json', 'utf8', function(err, data){
        if(err) throw err
        return data
    }).then(
        notes => [...notes, newNote]
    ).then( updatedNotes => fs.writeFileSync('db/db.json', JSON.stringify(updatedNotes)))
    .then(()=> newNote)
}
    // Setup notes variable
    // fs.readFile("db/db.json","utf8", (err, data) => {

    //     if (err) throw err;
    

    //     var notes = JSON.parse(data);
    // })
        // API ROUTES
        // ========================================================
    
        // Setup the /api/notes get route
        app.get("/api/notes", function(req, res) {
            var note = []
            fs.readFile("db/db.json","utf8", (err, data) => {

                if (err) throw err;
            
        
                 note = note.concat(JSON.parse(data));
            })
            res.json(note)
        });

        // Setup the /api/notes post route
        app.post("/api/notes", function(req, res) {
            // Receives a new note, adds it to db.json, then returns the new note
           getNotes(req.body)
           .then((note) => res.json(note))
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

        // VIEW ROUTES
        // ========================================================

        // Display notes.html when /notes is accessed
        app.get('/notes', function(req,res) {
            res.sendFile(path.join(__dirname, "./public/notes.html"));
        });
        
        // Display index.html when all other routes are accessed
        app.get('*', function(req,res) {
            res.sendFile(path.join(__dirname, "./public/index.html"));
        });

        //updates the json file whenever a note is added or deleted
        function updateDb() {
            fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
                if (err) throw err;
                return true;
            });
        }

   

}
