'use client';

import * as React from 'react';
import {UserButton, OrganizationSwitcher} from '@clerk/nextjs';
const Nav:React.FC=()=>{
    return (
        <nav className="border-2 border-red-400 p-4 flex items-center justify-between">
            <div>
                <h1 className="font-semibold text-2xl">Blog Application</h1>
            </div>
            <div className="flex gap-4 justify-center items-center">
                <OrganizationSwitcher afterSelectOrganizationUrl={(org) => `/org/${org.slug}`}/>
                <UserButton/>
            </div>
        </nav>
    )
};
export default Nav;