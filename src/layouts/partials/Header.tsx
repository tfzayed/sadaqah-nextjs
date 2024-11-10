"use client";

import Logo from "@/components/Logo";
import config from "@/config/config.json";
import { slugSelector } from "@/lib/utils/slugSelector";
import { INavigationLink } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Header = ({
  lang,
  menu,
}: {
  lang: string;
  menu: { main: INavigationLink[] };
}) => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { main } = menu;
  const { navigation_button, settings } = config;

  // Scroll effect for background color change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`header z-30 ${
        settings.sticky_header && "fixed w-full top-0"
      } transition-colors duration-300 ${scrolled ? "bg-white" : "bg-transparent"}`}
    >
      <nav className="navbar">
        {/* Logo */}
        <div className="order-0">
          <Logo lang={lang} />
        </div>

        {/* Navbar toggler and menu */}
        <input id="nav-toggle" type="checkbox" className="hidden" />
        <label
          htmlFor="nav-toggle"
          className="order-3 cursor-pointer lg:hidden text-dark lg:order-1"
        >
          {/* SVGs for toggler */}
          <svg
            id="show-button"
            className="h-6 fill-current block"
            viewBox="0 0 20 20"
          >
            <title>Menu Open</title>
            <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z"></path>
          </svg>
          <svg
            id="hide-button"
            className="h-6 fill-current hidden"
            viewBox="0 0 20 20"
          >
            <title>Menu Close</title>
            <polygon
              points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
              transform="rotate(45 10 10)"
            ></polygon>
          </svg>
        </label>

        <ul
          id="nav-menu"
          className="navbar-nav hidden w-full pb-6 lg:flex lg:w-auto lg:space-x-2 lg:pb-0 xl:space-x-8"
        >
          {main.map((menu: any, i: any) => (
            <React.Fragment key={`menu-${i}`}>
              {menu.hasChildren ? (
                <li className="nav-item nav-dropdown group relative">
                  <span
                    className={`nav-link inline-flex items-center ${menu.children.map(({ url }: any) => url).includes(pathname) || menu.children.map(({ url }: any) => `${url}/`).includes(pathname) ? "active" : ""}`}
                  >
                    {menu.name}
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </span>
                  <ul className="nav-dropdown-list hidden group-hover:block lg:invisible lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:block lg:opacity-0 lg:group-hover:visible lg:group-hover:opacity-100">
                    {menu.children.map((child: any, i: number) => (
                      <li className="nav-dropdown-item" key={`children-${i}`}>
                        <Link
                          href={slugSelector(lang, child.url)}
                          className={`nav-dropdown-link block ${pathname === `${child.url}/` || pathname === child.url ? "active" : ""}`}
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <Link
                    href={slugSelector(lang, menu.url)}
                    className={`nav-link block ${pathname === `${menu.url}/` || pathname === menu.url ? "active" : ""}`}
                  >
                    {menu.name}
                  </Link>
                </li>
              )}
            </React.Fragment>
          ))}
          {navigation_button.enable && (
            <li className="mt-4 inline-block lg:hidden">
              <Link
                className="btn btn-outline-primary btn-sm"
                href={navigation_button.link}
              >
                {navigation_button.label}
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
