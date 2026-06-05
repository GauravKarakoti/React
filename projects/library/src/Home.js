import './Card.css';

const Home = () => {
    return (
        <>
            <h1 className="title">📚 My Library</h1>
            <div className="Home">
                <Library
                    Title="To Kill The Mockingbird"
                    Author="Harper Lee"
                    description="A novel about the serious issues of rape and racial inequality."
                    Date="1960"
                />
                <Library
                    Title="The Great Gatsby"
                    Author="F. Scott Fitzgerald"
                    description="A novel about the American dream and the disillusionment that comes with it."
                    Date="1925"
                />
                <Library
                    Title="1984"
                    Author="George Orwell"
                    description="A dystopian novel about totalitarianism and surveillance."
                    Date="1949"
                />
            </div>
        </>
    )
}
const Library = (props) => {
    return (
        <div className="Card">
            <h2>{props.Title}</h2>
            <h3>{props.Author}</h3>
            <p>{props.description}</p>
            <p>{props.Date}</p>
        </div>
    )
}

export default Home;