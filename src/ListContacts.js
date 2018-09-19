import React from 'react'
import PropTypes from 'prop-types'

function ListContacts (props) {
    return(
        <ol className="contact-list">
            {props.contacts.map((contact) => {
                return (<li key={contact.id} className="contact-list-item">
                    <div>
                    <img className="contact-avatar" alt={`Face of ${contact.name}`} src={contact.avatarURL} />
                    </div>
                    <div className="contact-details">
                        <p>{contact.name}</p>
                        <p><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
                    </div>
                    <button onClick={() => props.onDeleteContact(contact)} className="contact-remove">
                        Remove
                    </button>
                </li>)
            })}
        </ol>
    )
}

ListContacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired
}


export default ListContacts
