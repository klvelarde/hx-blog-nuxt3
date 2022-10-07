<template>
  <section class="blog-detail">
    <Markdown
      v-if="markdownSource"
      :source="markdownSource"
      html
      class="blog-detail__container"
      ref="markDownRef"
    />
    <div class="blog-detail__info" v-if="blog">
      <div class="blog-detail__info__item">
        <div class="blog-detail__info__item__title">IPFSHash</div>
        <div class="blog-detail__info__item__detail">{{blog.attributes.ipfsHash}}</div>
      </div>
      <div class="blog-detail__info__item">
        <div class="blog-detail__info__item__title">Wallet Address</div>
        <div class="blog-detail__info__item__detail">{{blog.attributes.walletAddress}}</div>
      </div>
      <div class="blog-detail__info__item last">
        <div class="blog-detail__info__item__title">Signature</div>
        <div class="blog-detail__info__item__detail">{{blog.attributes.signature}}</div>
      </div>
    </div>
  </section>
</template>

<script>
  import { ref, onMounted, nextTick, toRefs } from 'vue'
  import { useRuntimeConfig } from '#imports'
  import Markdown from 'vue3-markdown-it'

  import { getHuxleyPostById } from '@/services/BlogService'

  export default {
    name: 'BlogDetail',
    components: { Markdown },
    props: {
      id: Number
    },
    setup(props) {
      const runtimeConfig = useRuntimeConfig()
      const blog = ref(null)
      const markDownRef = ref(null)
      const markdownSource = ref(null)
      const BASE_IMAGE_URL = runtimeConfig.public.VUE_APP_STRAPI_IMAGE_URL
      const { id } = toRefs(props)

      onMounted(async () => {
        const postId = id.value ? id.value : window.location.pathname.split('/')[2]

        blog.value = await getHuxleyPostById(postId)
        markdownSource.value = blog.value
          ? blog.value.attributes.description.replace(
              /\/uploads\//g,
              `${BASE_IMAGE_URL}uploads/`
            )
          : null
        await nextTick()
        if (markDownRef.value && markDownRef.value.$el) {
          const childrenArr = Array.from(markDownRef.value.$el.children)

          const pWithImages = childrenArr.filter(
            (element) =>
              element.tagName === 'P' &&
              Array.from(element.children).some((el) => el.tagName === 'IMG')
          )
          pWithImages.forEach((element) => element.classList.add('hasImage'))

          const pWithFullImages = pWithImages.filter((element) =>
            Array.from(element.children).some(
              (el) => el.alt && el.alt.startsWith('full')
            )
          )
          pWithFullImages.forEach((element) =>
            element.classList.add('hasFullImage')
          )

          let divInfoTop = document.createElement('div')
          divInfoTop.className ='info-top'
          let elementID = document.createElement('div')
          elementID.className ='info-top__item'
          elementID.innerHTML = `<a href="/blogs/${blog.value.id}">${blog.value.id}</a>`
          divInfoTop.appendChild(elementID)

          let elementDate = document.createElement('div')
          const datePost = new Date(blog.value.attributes.publishedAt)
          let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(datePost)
          let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(datePost)
          let da = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(datePost)
          let daySuffix
          switch (Number(da)) {
              case 1:
              case 21:
              case 31:
                  daySuffix = "st"
                  break
              case 2:
              case 22:
                  daySuffix = "nd"
                  break
              case 3:
              case 23:
                  daySuffix = "rd"
                  break
              default:
                  daySuffix = "th"
                  break
          }
          elementDate.textContent=`${mo} ${da}${daySuffix}, ${ye}`
          elementDate.className='info-top__item'
          divInfoTop.appendChild(elementDate)
          const firstTitle = childrenArr.find((element) => element.tagName === 'H1')
          firstTitle.classList.add('main-title')
          firstTitle.after(divInfoTop)
          let closest = false
          const pFirstNote = childrenArr.find((element) => {
            if (element.className === 'main-title') closest = true
            if (element.tagName === 'P' && closest) {
              closest = false
              return true
            }
            return false
          })
          pFirstNote.classList.add('note')

          const pWithLinks = childrenArr.find((element) => {
            if (element.id === 'links') closest = true
            if (element.tagName === 'P' && Array.from(element.children).some((el) => el.tagName === 'A') && closest) {
              closest = false
              return true
            }
            return false
          })
          pWithLinks.classList.add('hasLinks')
          const linkElements = Array.from(pWithLinks.children).filter((el) => el.tagName === 'A')
          linkElements.forEach((a) => a.classList.add('link-container'))
        }
      })

      return { blog, markdownSource, markDownRef }
    },
  }
</script>
<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Mulish:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300&display=swap');
  .blog-detail {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    margin-bottom: 100px;
    &__container {
      width: 100%;
      max-width: 1200px;
      margin: auto;
      :deep() {
        :not(img) {
          font-family: Inter;
          margin: auto;
          max-width: 768px;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-weight: 600;
        }
        h1 {
          font-size: 4.8rem;
        }
        p,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        ul,
        ol {
          padding: 0 2.4rem;
          margin: 2.4rem auto;
        }
        p,
        ul,
        ol {
          font-size: 1.76rem;
          color: #ffffffb3;
          line-height: 1.625;
        }
        p {
          word-break: break-word;
        }
        ul,
        ol {
          padding: 0 2.4rem 0 4rem;
        }
        li {
          margin-top: 0.8rem;
          padding-left: 1rem;
        }
        h2 {
          font-size: 29.6px;
          margin: 3.6rem auto 2.4rem;
        }
        h3 {
          font-size: 21.6px;
          margin: 3.6rem auto 2.4rem;
        }
        img {
          margin: 24px auto;
          border-radius: 4px;
        }
        a {
          color: #ffffff;
        }
        h6 {
          font-size: 1.6rem;
          color: #ffffff59;
          font-weight: 400;
        }
        p.hasFullImage {
          max-width: 976px;
        }
        div.info-top {
          justify-content: flex-start;
          gap: .75rem;
          flex-wrap: wrap;
          display: flex;
          padding: 0 2.4rem;
          margin: 2.4rem auto;
          &__item {
            background-color: #1d1d1d;
            color: #636363;
            border-radius: 9999px;
            padding: .3rem .5rem;
            font-size: 14px;
            margin: 0;
            a {
              text-decoration: none;
              color: inherit;
              &:hover {
                background-color: #2c2c2c;
                color: #b0b0b0;
                transition: background-color 150ms ease-in-out 0s, color 150ms ease-in-out 0s
              }
            }
          }
        }
        p.note {
          position: relative;
          font-style: italic;
          &::before {
            content: "";
            position: absolute;
            top: 0px;
            bottom: 0px;
            left: 0;
            background-color: white;
            width: 2px;
            border-radius: 999px;
          }
        }
        a.link-container {
          display: block;
          background: #100c0c;
          color: #787878;
          border-radius: 1.5rem;
          margin-left: auto;
          margin-right: auto;
          width: 100%;
          text-decoration: none;
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
          padding: 1.25rem 1.5rem;
          font-size: 16px;
          border: 0.4rem solid transparent;
          strong {
            font-weight: bold;
          }
          &:hover {
            border: 0.4rem solid #373737;
            transition: border 150ms ease-in-out 0s
          }
        }
        .hasImage {
          img {
            width: 100%;
          }
        }
        @media (max-width: 768px) {
          .hasImage {
            padding: 0;
          }
          h1 {
            font-size: 3rem;
          }
          h2 {
            font-size: 2.4rem;
          }
          h3 {
            font-size: 2.1rem;
          }
          p,
          ul,
          ol {
            font-size: 1.6rem;
          }
        }
      }
    }
    &__info {
      width: 100%;
      max-width: 720px;
      margin: 2.4rem auto;
      border: 1px solid #636363;
      border-radius: 0.5rem;
      color: #636363;
      &__item {
        display: flex;
        justify-content: space-between;
        padding: 15px 10px;
        font-size: 1.2rem;
        font-family: "iAWriter Mono",Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
        border-bottom: 1px solid #636363;
        &.last {
          border-bottom: none;
        }
        &__title {
          text-transform: uppercase;
          font-weight: bold;
          padding-right: 10px;
        }
        &__detail {
          text-align: right;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        &:hover {
          background-color: #2c2c2c;
          transition: background-color 150ms ease-in-out 0s
        }
      }
    }
  }
</style>
