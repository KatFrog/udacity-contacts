import React, { Component } from 'react'
import ListContacts from './ListContacts'
import './App.css';

class App extends Component {
    state = {
        contacts: [
            {
            "id": "jim",
            "name": "My Mutant Husband",
            "email": "jimp@wegrok.net",
            "avatarURL": "icons/jim2.jpg"
            },
            {
            "id": "terry",
            "name": "Portal Pirate",
            "email": "terryp@wegrok.net",
            "avatarURL": "icons/terry.jpg"
            },
            {
            "id": "rachel",
            "name": "Inez Blue Butterfly",
            "email": "rachelp@wegrok.net",
            "avatarURL": "icons/rachel.jpg"
            },
            {
            "id": "titan",
            "name": "My Dog",
            "email": "titan@wegrok.net",
            "avatarURL": "icons/titan.jpg"
            },
            {
              "id": "liz",
              "name": "Sister",
              "email": "noone@wegrok.net",
              "avatarURL": "icons/person.svg"
            }
        ]
    }

    removeContact = (contact) => {
        this.setState((state) => ({
            contacts: state.contacts.filter((c) => c.id !== contact.id)
        }))
    }
    render() {
        return (
            <div>
                <ListContacts
                    onDeleteContact={this.removeContact}
                    contacts={this.state.contacts}
                />
            </div>
        );
    }
}

export default App;
