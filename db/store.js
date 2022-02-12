const util = require("util");
const fs = require("fs");
const uuid = require("uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFileAsync("db/db.json", "utf8")
    }
    write(note) {
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

    //add note or post note
    //use .write function to add new notes to whats there
    //rewrite db file
    //delete note use .filter to filter through to find one that has matching id an rewrite db file without filtered notes
}

module.exports = new Store();