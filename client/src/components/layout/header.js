import { React, useState } from 'react';
import Button from 'react-bootstrap/Button';
import img1 from './Ems_logo_PNG1.png'
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(prevShow => !prevShow);
  const auth = localStorage.getItem('alnasar')
  return (
    <div className='navigationBar'>
      <div className='container navigation'>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div className='imgDiv'>
            <img className='navImg'
              src={img1}
              alt="EMS"
              loading="lazy"
            />
          </div>
          <p>Expense Managemest System</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div>
            <i className="fa-solid fa-info" style={{ color: '#ffffff', cursor: 'pointer', fontSize: '15px', border: '1px solid white', padding: '2px 7px', borderRadius: '50%' }} onClick={toggleModal}></i>
          </div>
          {auth ? <strong style={{ cursor: 'pointer', textDecoration: 'underLine' }} onClick={() => { localStorage.removeItem('alnasar'); navigate('/') }}>Logout</strong> : ''}
        </div>
        <Modal show={showModal} onHide={() => { toggleModal(); }}>
          <Modal.Header closeButton>
            <Modal.Title>Website Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Welcome to Expense Management System,
              This platform is simply designed  exclusively for testing purposes. Please be advised that any content, data, or interactions on this website are part of ongoing testing activities and do not represent final or official information. We appreciate your participation and patience as we work towards enhancing the overall user experience.Your feedback is valuable to us, so if you encounter any issues, have suggestions,reset or update the Password or notice any anomalies, please feel free to share your thoughts with us. You can contact us at <a href="https://wa.me/923147381395" target="_blank">Whatsapp</a>.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={toggleModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};





export default Header;