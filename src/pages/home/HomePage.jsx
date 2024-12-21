import React from 'react'
import PostsList from "../../features/posts/PostsList"
import TeamMembers from "../../features/team-members/TeamMembers"
function HomePage() {
  return (
    <>
      <PostsList />
      <TeamMembers />
    </>
  )
}

export default HomePage
