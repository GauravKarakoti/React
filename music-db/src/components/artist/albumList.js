const AlbumList = ({ albumList }) => {
    const showList = (albums) => (
        albums ? 
            albums.map((item, i) => (
                <img key={i} alt="" src={`/images/albums/${item.cover}.jpg`}></img>
            )) : null
    )
    return (
        <div className="albums_list">
            {showList(albumList)}
        </div>
    )
}
export default AlbumList;