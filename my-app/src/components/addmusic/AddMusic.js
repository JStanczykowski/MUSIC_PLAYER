import React, {useEffect, useState} from 'react';

const CLIENT_ID = '961838173429-idai5tfflf8vkd1oojua97qh2nbq8695.apps.googleusercontent.com';
const API_KEY = 'AIzaSyAsr6U6z-L5C-KxD2ZZESE_XxlDNpRmBwM';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

const useGoogleApi = (handleClientLoad) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.onload = () => handleClientLoad();
        document.body.appendChild(script);
    }, [handleClientLoad]);
};

const AddMusic = () => {

    const handleClientLoad = () => {
        window.gapi.load('client:auth2', initClient);
    }

    const initClient = () => {
        window.gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
        }).then(() => {
            console.log('Google API initialized');
        }).catch((error) => {
            console.log('Error initializing Google API', error);
        });
    };

    useGoogleApi(handleClientLoad);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = React.createRef();

    const audioUrl = 'https://www.googleapis.com/drive/v3/files/1iRct9k7Tba5RuWxvRNDFC-IVflfqqYsV?alt=media&key=AIzaSyCwAwTjI4pVK7FbxdAiH-xUWPzDGXDcnc4&v=.mp3';

    const playMusic = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };
    const uploadFile = async () => {
        const file = document.getElementById('file').files[0];
        const metadata = {
            name: file.name,
            mimeType: file.type
        };
        const accessToken = window.gapi.auth.getToken().access_token;
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${accessToken}`);
        headers.append('Content-Type', 'application/json');

        try {
            const response = await fetch(`https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(metadata)
            });

            const data = await response.json();
            const id = data.id;

            const fr = new FileReader();
            fr.onload = async () => {
                const media = {
                    mimeType: file.type,
                    body: fr.result
                };
                const headers = new Headers();
                headers.append('Authorization', `Bearer ${accessToken}`);
                headers.append('Content-Type', file.type);

                try {
                    const response = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${id}?uploadType=media`, {
                        method: 'PATCH',
                        headers: headers,
                        body: media.body
                    });
                    console.log(`File ${file.name} uploaded to Google Drive. File ID: ${id}`);
                } catch (error) {
                    console.log('Error uploading file to Google Drive', error);
                }
            };
            fr.readAsArrayBuffer(file);
        } catch (error) {
            console.log('Error creating file in Google Drive', error);
        }
    };

    return (
        <div>
            <h1>Upload File to Google Drive</h1>
            <input type="file" id="file" />
            <button onClick={uploadFile}>Upload</button>
            <img src="https://drive.google.com/uc?id=1IzelAnjKsDPtBv6DcDJjluhkPwZVCfTn" />

            <div>
                <button onClick={playMusic}>{isPlaying ? 'Pause' : 'Play'}</button>
                <audio ref={audioRef} src={audioUrl} />
            </div>
        </div>
    );
};

export default AddMusic;
