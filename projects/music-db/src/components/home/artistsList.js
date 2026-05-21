import { Link } from "react-router-dom";

const ArtistsList = (props) => {
    const list = (values) => (
        values ?
            values.map(item => (
                <Link
                    to={`/artist/${item.id}`}
                    key={item.id}
                    className="artist_item"
                    style={{
                        background: `url('/images/covers/${item.cover}.jpg')`
                    }}
                >
                    <div>{item.name}</div>
                </Link>
            )) : null
    );
    
    return (
        <div className="artists_list">
            <h4>Browse the artists</h4>
            <div className="artist_container">
                {list(props.allArtists)}
            </div>
        </div>
    )
}

export default ArtistsList;