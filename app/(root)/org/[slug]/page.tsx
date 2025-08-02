'use client';

import Nav from '../../../components/nav'; // Or '@/components/nav' if configured
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import * as React from 'react';
import { Input } from "@/components/ui/input";
import { useParams } from 'next/navigation'; // Import useParams hook
import {createBlog} from './action';
import {useOrganization} from '@clerk/nextjs';

export default function OrgLandingPage(){
    const [blogContent,setBlogContent]=React.useState('');
    const [blogTitle,setBlogTitle]=React.useState('');
    const params = useParams(); // Get URL parameters
    const organizationSlug = params.slug as string; // Access the slug from params
    const selectedOrg=useOrganization();

    const handleCreateBlog=async()=>{
        createBlog({
            body:blogContent.trim(),
            orgId:'selectedOrg.organization?.id',
            title:blogTitle,
        })
    }
    return(
        <main>
            <Nav/>
            <div className="p-10">
                <h1 className="text-3xl font-bold mb-4">
                    Create Blog Post for <span className="text-blue-600">{organizationSlug}</span>
                </h1>
                <Input
                    value={blogTitle}
                    onChange={(e)=>setBlogTitle(e.target.value)}
                    placeholder="Title"
                />
                <Textarea
                    placeholder="Write your Blog Content here"
                    value={blogContent}
                    onChange={(e)=>setBlogContent(e.target.value)}
                    className="mt-2"
                />
                <Button onClick={handleCreateBlog} className="mt-2">Create Blog</Button>
            </div>
        </main>
    );
}