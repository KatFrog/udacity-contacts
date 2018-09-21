import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    clearQuery = () => {
        this.setState({ query: '' })
    }

    render() {
        const { contacts, onDeleteContact } = this.props
        const { query } = this.state

        let showingContacts
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            showingContacts = contacts.filter(
                (contact) => match.test(contact.name))
        } else {
            showingContacts = contacts
        }

        showingContacts.sort(sortBy('name'))

        return(
            <div className="list-contacts">
                <div className="list-contacts-top">
                    <input
                        className="search-contacts"
                        type="text"
                        placeholder="Search contacts"
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                    <Link
                        to="/create"
                        className="add-contact"
                    >Add Contact</Link>
                </div>

                { showingContacts.length !== contacts.length &&
                    <div>
                        <span className="showing-contacts">Showing {showingContacts.length} contacts out of {contacts.length} in total.</span>
                        <button className="showing-contacts-button" onClick={this.clearQuery}>Show All</button>
                    </div>}

                <ol className="contact-list">
                    {showingContacts.map((contact) => {
                        return (<li key={contact.id} className="contact-list-item">
                            <div>
                            <img className="contact-avatar" alt={`Face of ${contact.name}`} src={contact.avatarURL} />
                            </div>
                            <div className="contact-details">
                                <p>{contact.name}</p>
                                <p><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
                            </div>
                            <button onClick={() => onDeleteContact(contact)} className="contact-remove">
                                Remove
                            </button>
                        </li>)
                    })}
                </ol>
            </div>
        )
    }
}

ListContacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired
}


export default ListContacts
