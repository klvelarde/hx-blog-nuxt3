<template>
  <div class="wrapper">
    <header class="header">
      <a href="https://huxleysaga.com/" class="logo">
        <img src="@/assets/images/logo.png" alt="" />
      </a>
      <div
        class="header__nav-holder"
        :class="navIsOpen ? 'open' : ''"
        ref="navHolder"
      >
        <nav class="nav">
          <ul>
            <li
              class="nav-li"
              v-for="link of links.information"
              :key="link.link"
            >
              <a :href="link.url">
                {{ link.text }}
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <a
        href="#"
        class="nav-trigger"
        :class="navIsOpen ? 'is-active' : ''"
        @click.prevent="
          () => {
            navIsOpen = !navIsOpen
          }
        "
      >
        <span></span>
        <span></span>
        <span></span>
      </a>
    </header>

    <BlogDetail :id="Number($route.params.id)" />

    <footer class="footer">
      <div class="shell">
        <div class="footer__inner">
          <div class="footer__entry">
            <!--Logo :logo="logoHeader" modifier="footer__logo" /-->
            <div class="footer__feature">
              <p class="footer__feature__powered">Powered by</p>
              <a href="https://thefeature.io" class="footer__feature__feature">
                <img src="@/assets/icons/feature.svg" alt="Feature" />
              </a>
            </div>
          </div>

          <div class="footer__content">
            <div class="footer__links-holder">
              <div class="footer__links">
                <ul>
                  <li
                    v-for="link in footerLinks"
                    :key="link.url"
                    @click="scrollToTop"
                  >
                    <a :href="link.url">
                        {{ link.text }}
                    </a>
                  </li>
                </ul>
              </div>

              <div class="socials">
                <ul>
                    <li>
                        <a href="https://discord.gg/huxley" data-v-3c69300e="">
                            <svg class="svg-inline--fa fa-discord fa-w-20" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="discord" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-v-3c69300e=""><path class="" fill="currentColor" d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"></path></svg>
                        </a>
                    </li>
                    <li>
                        <a href="https://twitter.com/huxleysaga">
                            <svg class="svg-inline--fa fa-twitter fa-w-16" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-v-3c69300e=""><path class="" fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>
                        </a>
                    </li>
                    <li>
                        <a
                        href="https://opensea.io/category/huxley-universe"
                        style="background: transparent; border: none"
                        target="_blank"
                        >
                        <img
                            src="@/assets/icons/opensea.png"
                            class="os-img"
                            alt="opensea"
                        />
                        </a>
                    </li>
                </ul>
              </div>
            </div>
            <p>TM & © Huxley LLC All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
    </div>
</template>

<script>
  import BlogDetail from '@/components/BlogDetail'
  import { getHuxleyPostById } from '@/services/BlogService'

  export default {
    name: 'PageBlogDetail',
    components: { BlogDetail },
    data() {
      return {
        links: {
          information: [
            { text: 'Ecosystem', url: 'https://huxleysaga.com/ecosystem' },
            { text: 'Avatars', url: 'https://huxleysaga.com/avatars' },
            { text: 'About', url: 'https://huxleysaga.com/about' },
            { text: 'FAQ', url: 'https://huxleysaga.com/faq' },
          ],
        },
        footerLinks: [
          {
            text: 'FAQ',
            url: 'https://huxleysaga.com/faq',
          },
          {
            text: 'Terms of use',
            url: 'https://huxleysaga.com/terms',
          },
          {
            text: 'Privacy Policy',
            url: 'https://huxleysaga.com/privacy',
          },
        ],
      }
    }
  }
</script>
<script setup>
const navIsOpen = ref(false)
const route=useRoute()
const post = await getHuxleyPostById(Number(route.params.id))
useHead({
  title: post.attributes.title || 'HUXLEY POST',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  meta: [
    { name: 'author', content: post.attributes.metadata?.author || 'HUXLEY' },
    { name: 'description', content: post.attributes.metadata?.description || post.attributes.title },
    { name: 'keywords', content: post.attributes.metadata?.keywords || post.attributes.title },
  ]
})
</script>

<style lang="scss" scoped>
  .red-banner {
    background-color: #bd2820;
    color: white;
  }

  .yellow-banner {
    background-color: #e4c41c;
    color: black;
  }

  .banner {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 16px;
    @media (min-width: 767px) {
      height: 50px;
    }
  }
  .banner p {
    font-size: 1.1rem;
    @media (min-width: 767px) {
      font-size: 1.6rem;
    }
  }
  .banner:hover {
    cursor: default;
  }

  .banner img {
    width: 100%;
    height: inherit;
  }

  .banner .close-btn {
    position: absolute;
    right: 10px;
    top: 5px;
    border: none;
    font-size: 24px;
    background-color: transparent;
    @media (max-width: 767px) {
      font-size: 16px;
      right: 5px;
    }
  }

  .header {
    background-color: black;
  }
  .nav {
    display: flex;
    @media (max-width: 1023px) {
      display: block;
    }
    ul {
      margin-bottom: 0;
    }
  }
  .header-btn-login {
    margin-left: 15px;
    @media (max-width: 1023px) {
      display: none;
    }
  }
  .nav-secondary {
    display: none;
    text-align: center;
    @media (max-width: 1023px) {
      display: block;
    }
  }
  .nav-divisor {
    margin: auto 0;
    text-align: center;
    font-size: 26px;
    @media (max-width: 1023px) {
      display: none;
    }
  }
  .banner-button {
    background-color: transparent;
    border: solid 1px white;
    padding: 5px 10px;
    border-radius: 4px;
    transition: all 0.35s ease;
    cursor: pointer;
    &:hover {
      background-color: #b21b25;
    }
    &.desktop {
      @media (max-width: 767px) {
        display: none;
      }
    }
    &.mobile {
      @media (min-width: 768px) {
        display: none;
      }
    }
  }
  .footer__feature {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 4px;
    & &__powered {
      margin-bottom: 0;
      color: #888888;
    }
    &__feature {
      text-decoration: none;
      line-height: 1;
    }
    &__feature img {
      height: 13px;
      vertical-align: unset;
      margin-left: 6px;
    }
  }
  .os-img {
    opacity: 0.8;
  }
</style>
