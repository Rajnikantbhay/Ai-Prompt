'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {

  const {data: session} = useSession();
  const [userpost, setUserPost] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setUserPost(data);
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
    <div>
      <Profile name='My' description='Welcome to your personalized profile page'
      data={userpost} handleEdit={handleEdit}  handleDelete={handleDelete} />
    </div>
  )
}

export default MyProfile
