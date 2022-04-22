import Link from 'next/link'
const Header = () => {
  return <header >
      <div className="container"></div>
      <Link href="/">
          <h2>Dev blog</h2>
      </Link>
  </header>;
};

export default Header;
