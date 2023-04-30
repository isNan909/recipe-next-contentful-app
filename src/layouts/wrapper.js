import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Navbar.module.css";

import Logo from "@/assets/cafe_logo.png";

const nextImageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const Wrapper = ({ children }) => {
  return (
    <>
      <header>
        <div className={styles.logoTop}>
          <Image
            loader={nextImageLoader}
            alt="Cafe logo"
            src={Logo}
            width={80}
            height={80}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
        <nav className={styles.navbarWrapper}>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <div className="container">{children}</div>
      </main>

      <footer></footer>
    </>
  );
};

export default Wrapper;
