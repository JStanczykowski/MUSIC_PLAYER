import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from "react";
import api from "../../../api/axiosConfig";
import jwt_decode from "jwt-decode";
function ModalAdvancedSearch(props) {

    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("");


    useEffect(() => {
        setShow(props.setShow);

    }, show);
    const token = localStorage.getItem('accessToken');
    const decodedToken = jwt_decode(token);
    const username = decodedToken.sub;
    const [selectedGenre, setSelectedGenre] = useState('');
    const [response, setResponse] = useState(null);
    const [fullMusicData, setFullMusicData] = useState([]); // Dodanie stanu do przechowywania pełnych danych muzycznych

    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let url = '/api/v1/music';

            if (selectedGenre) {
                url = `/api/v1/music/getMusicByGenre?genres=${encodeURIComponent(selectedGenre)}`;
            }

            const response = await api.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            });

            if (response && response.data) {
                let filteredMusicData = response.data;

                // Jeśli wprowadzono frazę do filtra, stosujemy filtrację po tytule i wykonawcy
                if (filter) {
                    filteredMusicData = response.data.filter((item) => {
                        const formattedTitle = `${item.artysta.toLowerCase()} ${item.tytul.toLowerCase()}`;
                        return formattedTitle.includes(filter.toLowerCase());
                    });
                }

                props.setResponse(filteredMusicData);
                setShow(false);
            } else {
                console.log('Invalid response format');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };


    useEffect(() => {
        setShow(props.setShow);

        // Wywołanie logiki filtrowania po zmianie danych muzycznych
        let filteredMusicData = fullMusicData;
        if (filter) {
            filteredMusicData = fullMusicData.filter((item) => {
                const formattedTitle = `${item.artysta} - ${item.tytul}`;
                return (
                    formattedTitle.toLowerCase().includes(filter.toLowerCase()) &&
                    (!selectedGenre || item.gatunek === selectedGenre)
                );
            });
        }
        setData(filteredMusicData);
    }, [filter, selectedGenre, fullMusicData, props.setShow]);

    const handleClose = () => setShow(false);
    return(
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Advanced Search for music</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-2">
                            <Form.Label>Choose a music genre:</Form.Label>
                            <Form.Select  id="searchModel" value={selectedGenre} onChange={handleGenreChange}>
                                <option value="">Choose...</option>
                                <option value="rap">Rap</option>
                                <option value="pop">Pop</option>
                                <option value="hip-hop">Hip Hop</option>

                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Search by title or artist:</Form.Label>
                            <Form.Control
                                type="search"
                                placeholder="Enter title or artist"
                                class="form-control"
                                id="searchModel"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>{/* Dodaj dowolne treści do stopki modalu */}</Modal.Footer>
            </Modal></>
    )

}
export default ModalAdvancedSearch;
