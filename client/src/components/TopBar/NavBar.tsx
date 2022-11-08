import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

const NavBar = () => {
  return (
    <nav className="flex">
      <NavBarItem href="/">Home</NavBarItem>
      <NavBarItem href="/owned">Owned</NavBarItem>
      <NavBarItem href="/create">Create NFT</NavBarItem>
      <NavBarItem href="/send">Transfers</NavBarItem>
      <NavBarItem href="/historytransaction">History Transaction</NavBarItem>
      <NavBarItem href="/rate">Cryptocurrency Rates</NavBarItem>
    </nav>
  );
};

type NavbarItemProps = {
  href: string;
  children: ReactNode;
};

const NavBarItem = (props: NavbarItemProps) => {
  const { href, children } = props;
  const router = useRouter();
  const activeRoute = router.route.split("/")[1];
  const isActive = href == `/${activeRoute}`;

  return (
    <Link href={href}>
      <a
        className={classNames("mx-4 my-2 font-semibold button-navbar", {
          "btn-active-navbar": isActive,
        })}
        style={{display:"flex", justifyContent:"center", alignItems:"center", textAlign:"center"}}
      >
        {children}
      </a>
    </Link>
  );
};

export default NavBar;
