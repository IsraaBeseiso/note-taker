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
      
      

       fs.readFile('db/db.json', function(err, data){
           if (err){
               console.log(err)
           }
           const newNote = {
            title, text, id: uuidv4()
        }

           currentNotes = JSON.parse(data) || [];
           currentNotes.push(newNote);

           fs.writeFile('db/db.json', JSON.stringify(currentNotes), function(err){
               if(err){
                   console.log(err)
               }
           })
res.send(currentNotes)
       })
   });

   app.delete("/api/notes/:id", function(req, res){
       var id =  parseInt(req.params.id)
       console.log(id)
       var currentNote = []

       fs.readFile('db/db.json', function(err, data){
        if (err){
            console.log(err)
        }

        currentNote = JSON.parse(data) || [];
        console.log(currentNote)
        var filteredNotes= []
        for(var i=0; currentNote.length; i++){
            var note = currentNote[i];
            if(note.id !== id){
                filteredNotes.push(note)
            }
        }

        fs.writeFile('db/db.json', JSON.stringify(filteredNotes), function(err){
            if(err){
                console.log(err)
            }
        })
res.send(currentNote)
    })
   })

}
