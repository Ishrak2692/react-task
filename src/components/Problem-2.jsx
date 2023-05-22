import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const Problem2 = () => {
  const [isModalAOpen, setIsModalAOpen] = useState(false);
  const [isModalBOpen, setIsModalBOpen] = useState(false);
  const [isModalCOpen, setIsModalCOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [filteredContactsA, setFilteredContactsA] = useState([]);
  const [filteredContactsB, setFilteredContactsB] = useState([]);
  const [searchInputA, setSearchInputA] = useState('');
  const [searchInputB, setSearchInputB] = useState('');
  const [onlyEvenA, setOnlyEvenA] = useState(false);
  const [onlyEvenB, setOnlyEvenB] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('https://contact.mediusware.com/api/contacts/');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const filterContactsA = () => {
    let filtered = contacts;

    if (onlyEvenA) {
      filtered = filtered.filter((contact) => contact.id % 2 === 0);
    }

    if (searchInputA.trim() !== '') {
      filtered = filtered.filter((contact) =>
        contact.phone.toLowerCase().includes(searchInputA.toLowerCase())
      );
    }

    setFilteredContactsA(filtered);
  };

  const filterContactsB = () => {
    let filtered = contacts.filter((contact) => contact.country === 'US');

    if (onlyEvenB) {
      filtered = filtered.filter((contact) => contact.id % 2 === 0);
    }

    if (searchInputB.trim() !== '') {
      filtered = filtered.filter((contact) =>
        contact.phone.toLowerCase().includes(searchInputB.toLowerCase())
      );
    }

    setFilteredContactsB(filtered);
  };

  const openModalA = () => {
    setIsModalAOpen(true);
    setFilteredContactsA(contacts);
  };

  const openModalB = () => {
    setIsModalBOpen(true);
    setFilteredContactsB(contacts.filter((contact) => contact.country === 'US'));
  };

  const closeModalA = () => {
    setIsModalAOpen(false);
    setSearchInputA('');
    setOnlyEvenA(false);
  };

  const closeModalB = () => {
    setIsModalBOpen(false);
    setSearchInputB('');
    setOnlyEvenB(false);
  };

  const closeModalC = () => {
    setIsModalCOpen(false);
  };

  const openModalC = () => {
    setIsModalCOpen(true);
  };

  const handleSearchInputChangeA = (e) => {
    setSearchInputA(e.target.value);
    setTimeout(filterContactsA, 300);
  };

  const handleSearchInputEnterA = (e) => {
    if (e.key === 'Enter') {
      filterContactsA();
    }
  };

  const handleSearchInputChangeB = (e) => {
    setSearchInputB(e.target.value);
    setTimeout(filterContactsB, 300);
  };

  const handleSearchInputEnterB = (e) => {
    if (e.key === 'Enter') {
      filterContactsB();
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-lg btn-outline-primary" type="button" onClick={openModalA}>
            All Contacts
          </button>
          <button className="btn btn-lg btn-outline-warning" type="button" onClick={openModalB}>
            US Contacts
          </button>
        </div>

        <Modal
          isOpen={isModalAOpen}
          onRequestClose={closeModalA}
          contentLabel="Modal A"
          ariaHideApp={false}
        >
          <div className="modal-header">
            <h5 className="modal-title">Modal A</h5>
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchInputA}
              onChange={handleSearchInputChangeA}
              onKeyDown={handleSearchInputEnterA}
            />
            <div>
              {filteredContactsA.map((contact) => (
                <div key={contact.id} onClick={openModalC}>
                  {contact.phone} ({contact.country})
                </div>
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="onlyEvenCheckboxA"
                checked={onlyEvenA}
                onChange={(e) => setOnlyEvenA(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="onlyEvenCheckboxA">
                Only even
              </label>
            </div>
            <button className="btn btn-primary" type="button" onClick={closeModalA}>
              Close
            </button>
          </div>
        </Modal>

        <Modal
          isOpen={isModalBOpen}
          onRequestClose={closeModalB}
          contentLabel="Modal B"
          ariaHideApp={false}
        >
          <div className="modal-header">
            <h5 className="modal-title">Modal B</h5>
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchInputB}
              onChange={handleSearchInputChangeB}
              onKeyDown={handleSearchInputEnterB}
            />
            <div>
              {filteredContactsB.map((contact) => (
                <div key={contact.id} onClick={openModalC}>
                  {contact.phone} ({contact.country})
                </div>
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="onlyEvenCheckboxB"
                checked={onlyEvenB}
                onChange={(e) => setOnlyEvenB(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="onlyEvenCheckboxB">
                Only even
              </label>
            </div>
            <button className="btn btn-primary" type="button" onClick={closeModalB}>
              Close
            </button>
          </div>
        </Modal>

        <Modal
          isOpen={isModalCOpen}
          onRequestClose={closeModalC}
          contentLabel="Modal C"
          ariaHideApp={false}
        >
          <div className="modal-header">
            <h5 className="modal-title">Modal C</h5>
          </div>
          <div className="modal-body">
            
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" type="button" onClick={closeModalC}>
              Close
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Problem2;

