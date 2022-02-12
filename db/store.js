const util = require("util");
const fs = require("fs");
const {v4:uuidv4} = require("uuid");

//read and write
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//store reads and writes notes and checks for parsed notes
class Store {
    read() {
        return readFileAsync("db/db.json", "utf8")
    }
    write(notes) {
        return writeFileAsync("db/db.json", JSON.stringify(notes));
    }

    getNotes () {
        return this.read().then((notes) => {
            let parsedNotes
            try{
                parsedNotes = [].concat(JSON.parse(notes));
            } catch(error) {
                parsedNotes = [];
            }
            return parsedNotes;
        })
    }

    addNotes(notes) {
        const {title, text} = notes;

        const newNotes = {title, text, id:uuidv4()};

        return this.getNotes()
        .then((notes) => [...notes, newNotes])
        .then((newDatabaseNotes) => this.write(newDatabaseNotes))
        .then(() => newNotes)
    }

    deleteNotes(id) {
        return this.getNotes()
        .then((notes) => notes.filter((notes) => notes.id !== id))
        .then((newDatabaseNotes) => this.write(newDatabaseNotes))
    }
}

module.exports = new Store();