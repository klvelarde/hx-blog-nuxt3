const VUE_APP_STRAPI_API_KEY="d7b8df296480f67bd9d8deb2334e257d8c14b5ce2293eee6b6a86923fac9c9c0ff48f18cd9d3fdcf7c21925456e531deb0d29d374aa3c89949cb5c038d68410ee6183c9ae22fa570e392f6ac7f47f1448a091f96239d4281204f647d85cabb23224ce3d500cf3fe3b1a6602b5698659cfacc3a0ffac82298e8d608f5b5d51c94"
const VUE_APP_STRAPI_API_URL="http://localhost:1337/api"

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${VUE_APP_STRAPI_API_KEY}`,
}
const huxleyPostsUrl = `${VUE_APP_STRAPI_API_URL}/huxley-posts`

export const getAllHuxleyPosts = async () => {
  try {
    const response = await fetch(huxleyPostsUrl, {
      method: "GET",
      headers
    })
    const result = await response.json()
    return result.data
  } catch (e) {
    console.error('An error occurred while getting the huxley posts.', e)
    throw e
  }
}

export const getHuxleyPostById = async (postId) => {
  try {
    const response = await fetch(`${huxleyPostsUrl}/${postId}`, {
      method: "GET",
      headers
    })
    const result = await response.json()
    return result.data
  } catch (e) {
    console.error(
      `An error occurred while getting the huxley post by id: ${postId}.`,
      e
    )
    throw e
  }
}
