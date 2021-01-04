const fs = require('fs');
const {v4: uuidv4} = require("uuid")


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
   app.post("/api/notes", function(req, res){
       var currentNotes = []
       const {title, text } = req.body
       const newNote = {
           title, text, id: uuidv4
       }

       fs.readFile('db/db.json', function(err, data){
           if (err){
               console.log(err)
           }

           currentNotes = JSON.parse(data) || [];
           currentNotes.push(newNote);

           fs.writeFile('db/db.json', JSON.stringify(currentNotes), function(err){
               if(err){
                   console.log(err)
               }
           })

       })
   })

        // Deletes a note with specific id
        app.delete("/api/notes/:id", function(req, res) {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log("Deleted note with id "+req.params.id);
        });

}
