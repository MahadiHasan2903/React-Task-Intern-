import React, { useEffect, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";

import logo from "../assets/logo.png";

const Navbar = () => {
  const navData = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Products",
      link: "/products",
      children: [
        {
          label: "Toy",
          link: "/products/toy",
        },
        {
          label: "Cloths",
          link: "/products/cloths",
          children: [
            {
              label: "Men",
              link: "/products/cloths/mens",
            },
            {
              label: "Women",
              link: "/products/cloths/womens",
            },
          ],
        },
      ],
    },
    {
      label: "About Us",
      link: "/about",
    },
    {
      label: "Contact",
      link: "/contact",
    },
  ];

  const [subMenuOpen, setSubMenuOpen] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleSubMenu = (label, event) => {
    event.preventDefault();
    event.stopPropagation();
    setSubMenuOpen((prevState) => ({
      ...prevState,
      [label]: !prevState[label],
    }));
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 800) {
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderNavItems = (items) => {
    return (
      <ul className="items-center justify-around block py-4 800px:flex">
        {items.map((item, index) => (
          <li
            key={index}
            className="relative my-12 ml-5 text-white cursor-pointer group 800px:my-0 800px:ml-0 "
          >
            {item.children ? (
              <div className="relative group">
                <a href={item.link} className="flex group">
                  {item.label}
                  <MdArrowDropDown
                    onClick={(event) => toggleSubMenu(item.label, event)}
                    size={25}
                    className={`ml-1 transition-transform transform ${
                      subMenuOpen[item.label] ? "-rotate-180" : ""
                    }`}
                  />
                </a>
                {renderSubMenu(item)}
              </div>
            ) : (
              <a href={item.link}>{item.label}</a>
            )}
          </li>
        ))}
      </ul>
    );
  };

  const renderSubMenu = (item) => {
    if (!item.children) return null;

    const isOpen = subMenuOpen[item.label];

    return (
      <ul
        className={`absolute left-0 800px:mt-0  800px:left-20 ${
          isOpen ? "block z-40 mt-1" : "hidden"
        } bg-white text-black 800px:text-white 800px:bg-black `}
      >
        {item.children.map((child, childIndex) => (
          <li
            key={childIndex}
            className="relative ml-3 border-b border-white group 800px:my-0 800px:ml-0"
          >
            {child.children ? (
              <div className="relative group ">
                <a href={child.link} className="flex py-2 800px:px-4 group ">
                  {child.label}
                  <MdArrowDropDown
                    onClick={(event) => toggleSubMenu(child.label, event)}
                    size={25}
                    className={`ml-1 transition-transform transform ${
                      subMenuOpen[child.label] ? "-rotate-180" : ""
                    }`}
                  />
                </a>
                {renderSubMenu(child)}
              </div>
            ) : (
              <a href={child.link} className="block px-4 py-2 ">
                {child.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex bg-black ">
      <div className="w-[50%]">
        <img
          src={logo}
          alt="mh-logo"
          className="w-[20%] py-2 pl-4 1000px:w-[10%] 800px:py-2 800px:pl-12"
        />
      </div>
      <div className="hidden 800px:block w-[50%]">
        {renderNavItems(navData)}
      </div>
      <div className="w-[50%] block text-white 800px:hidden">
        <GiHamburgerMenu
          className="mt-3 ml-[200px] cursor-pointer hover:text-blue-700 transition duration-300"
          size={25}
          onClick={toggleDrawer}
        />
      </div>
      {isDrawerOpen && (
        <div className="fixed right-0 top-0 h-full bg-black w-[200px] z-10">
          <RxCross1
            className="absolute mt-5 text-white transition duration-300 cursor-pointer right-5 hover:text-blue-700"
            size={20}
            onClick={closeDrawer}
          />
          {renderNavItems(navData)}
        </div>
      )}
    </div>
  );
};

export default Navbar;
