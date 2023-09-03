'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import { DotSpinner } from '@uiball/loaders';

const MyProfile = () => {

  const {data: session} = useSession();
  const [userpost, setUserPost] = useState([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      if(!response.ok) {
        throw new error('network error please try again later')
      }
      const data = await response.json();
      setUserPost(data);
      setIsLoading(false)
    }
    if(session?.user.id) fetchData();

   },[])
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
   
  }

  const handleDelete = async(post) => {
    const hasConfirmed = confirm('Are you sure you want to delete it?');
    if(hasConfirmed) {
      try {
          
          await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
        });

        const filterPost = userpost.filter((p) => p._id.toString() !== post._id.toString());
        setUserPost(filterPost)
      } catch (error) {
        return error
      }
    }
  }

  return (
    <>
    {isLoading ? (<div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh', // 100% of the viewport height
          }}><DotSpinner /></div>) : (<div>
      <Profile name='My' description='Welcome to your personalized profile page'
      data={userpost} handleEdit={handleEdit}  handleDelete={handleDelete} />
    </div>)}
    
    </>
  )
}

export default MyProfile
