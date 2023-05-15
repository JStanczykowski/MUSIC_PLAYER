import React, {useEffect, useState} from "react";
import api from "../../api/axiosConfig";
import "./ListMessage.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
const ListMessage = () =>{
    const [message,setMessage] = useState([]);
    const getMess = async () => {
        try {
            const response = await api.get("/api/v1/message",{
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                } });
            console.log(response.data)
            setMessage(response.data);

        } catch (error) {
            console.log('Error:', error);
        }
    };
    const replyMess = async (id) => {
        try {
            const response = await api.put(`/api/v1/message/${id}`, {reply:reply}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            });
            if (response.status === 200) {
                console.log("success reply ");
                window.location.reload();
            } else {
                console.log('Error delete playlist');
            }
        } catch (error) {
            console.log(error);
        }
        console.log(id)
    };


    useEffect(() => {
        getMess();

    }, []);
    const navigate = useNavigate();
    const back =async()=>{
        navigate('/admin');
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setId(id);
        setShow(true);
    };
    const [reply, setReply] = useState('');
    const [id, setId] = useState('');
    return(
        <div className="xd2" ><div className="container2">
            <ArrowBackIcon onClick={()=>{
                back();
            }}/>
            <Modal show={show} onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Form to reply to the message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => { e.preventDefault(); replyMess(id); }}>
                        <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                            <Form.Label>Reply to the message</Form.Label>
                            <Form.Control
                                className="contentClassName"
                                type="text"
                                placeholder="Enter name"
                                style={{ width: '450px', height: '80px', margin: '5px 5px 5px 5px' }}
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                                autoFocus
                            />
                            <small id="emailHelp" className="form-text text-muted">Make sure that the message makes sense.</small>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
                {message.map((mess)=>{
                    return(<div>
                            <h1 key={mess.id}>Username: {mess.username}</h1>
                            <h2 key={mess.id}>Title: {mess.title}</h2>
                            <p key={mess.id}>Message Body: <br/>
                                {mess.messageBody}</p>

                                <button type="button" className="btn btn-success"
                                        onClick={()=>{
                                            handleShow(mess.id);
                                        }}>Odpowiedz</button>

                            </div>
                        )
                })}
         </div>
        </div>
    )
}

export default ListMessage;