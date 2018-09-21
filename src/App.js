import React, { Component } from 'react'
import ListContacts from './ListContacts'
import { Route } from 'react-router-dom'
import * as ContactsAPI from './ContactsAPI'
import CreateContact from './CreateContact'


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

    ComponentDidMount() {
        ContactsAPI.getAll().then((contacts) => {
            this.setState({ contacts: contacts })
        })
    }

    removeContact = (contact) => {
        this.setState((state) => ({
            contacts: state.contacts.filter((c) => c.id !== contact.id)
        }))

        ContactsAPI.remove(contact)
    }

    createContact(contact) {
        // ContactsAPI.create(contact).then(contact => {
        this.setState(state => ({
            contacts: state.contacts.concat([ contact ])
        }))
        // })
    }

    render() {
        return (
            <div>
                <Route exact path="/"
                    render={ () => (
                        <ListContacts
                            onDeleteContact={this.removeContact}
                            contacts={this.state.contacts}
                        />)
                    }
                />

                <Route path="/create"
                    render={ ({history}) => (
                        <CreateContact
                            onCreateContact={(newContact) => (
                                this.createContact(newContact),
                                history.push('/')
                            )}
                        />)

                    }
                />
            </div>
        );
    }
}

export default App;
