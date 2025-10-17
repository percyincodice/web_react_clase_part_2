import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
    return (
        <aside className="bg-light min-vh-100 border-end">
            <div className="p-3">
                <nav className="nav nav-pills flex-column">
                    <NavLink
                        to="/person"
                        end
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                        Personas
                    </NavLink>          
                    <NavLink
                        to="/user"
                        end
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                        Usuarios
                    </NavLink>
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar;