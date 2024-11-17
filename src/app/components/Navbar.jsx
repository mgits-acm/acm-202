import React from 'react';

const Navbar = () => {
    return (
        <nav className="flex p-4">
            <img src="/icons/acmlogo.png" alt="logo" className="h-20 w-20" />
            <button className="ml-auto mr-4">
                <img src="/icons/menu.svg" alt="menu" className="h-20 w-20" />
            </button>
        </nav>
    );
};

export default Navbar;