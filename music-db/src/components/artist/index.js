import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AlbumList from "./albumList";

const REQ_URL = `${process.env.REACT_APP_DB_URL}/artists`;

const Artist = () => {
    const [artist, setArtist] = useState('');
    const { id } = useParams(); 
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${REQ_URL}/${id}`)
            .then(response => {
                setArtist(response.data);
            }).catch(error => {
                navigate('/');
            });
    }, [id, navigate]);
    
    return (
        <>
            <div className="artist_bio">
                <div className="avatar">
                    <span style={{
                        background: `url('/images/covers/${artist.cover}.jpg') no-repeat`
                    }}></span>
                </div>
                <div className="bio">
                    <h3>{artist.name}</h3>
                    <div className="bio_text">
                        {artist.bio}
                    </div>
                </div>
            </div>
            <AlbumList albumList={artist.albums}/>
        </>
    )
}
export default Artist;