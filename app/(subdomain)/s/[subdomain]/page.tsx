import { db } from '@db';
import { blogTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { clerkClient } from '@clerk/nextjs/server'; // Corrected import path from '@clerk.nextjs/server' to '@clerk/nextjs/server'

interface Params {
  subdomain: string;
}

// Corrected: params is directly an object, not a Promise. Removed 'await' from params destructuring.
// Corrected: Added 'async' keyword to the function as it performs awaits.
export default async function HomePage({ params }: { params: Params }) {
  const { subdomain } = params;
  
  // Corrected: clerkClient is an instance, no need to await it.
  const client = clerkClient; 
  
  const org = await client.organizations.getOrganization({ slug: subdomain });

  const orgID = org.id;
  const blogs = await db
    .select()
    .from(blogTable)
    .where(eq(blogTable.orgId, orgID));

  return (
    <div className="p-10">
      {blogs.map((blog) => {
        // Corrected: Added 'return' statement for JSX inside map's curly braces.
        // Corrected: Added a unique 'key' prop for list items. Assuming 'blog.id' is unique.
        return (
          <div key={blog.id} className="mt-4">
            <h3 className="text-2xl font-bold">{blog.title}</h3>
            <p>{blog.body}</p>
          </div>
        );
      })}
    </div>
  );
}