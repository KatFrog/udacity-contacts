import React, { Component } from 'react'
import ListContacts from './ListContacts'
import { Route } from 'react-router-dom'
import * as ContactsAPI from './ContactsAPI'
import CreateContact from './CreateContact'


class App extends Component {
    state = {
        contacts: [
            {
            "id": "test",
            "name": "My Test Person",
            "email": "anyone@gmail.com",
            "avatarURL": "icons/person.svg"
            },
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
