const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        📚
      </div>

      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/">Books</a></li>
        <li><a href="/">Authors</a></li>
        <li><a href="/">About</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;