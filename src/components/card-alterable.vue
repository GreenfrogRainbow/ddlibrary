<script setup>
import { baseURL } from '@/utils/request'
import { ref } from 'vue'

const props = defineProps({
  item: Object
})
import router from '@/router/index'

const goDetails = () => {
  router.push(`/details?id=${props.item.id}`)
}

const defaultPic = ref(baseURL + '/source/te.jpg')
const changeIntoDefault = (e) => {
  e.target.src = defaultPic.value
}
</script>

<template>
  <span class="content" @click="goDetails">
    <div class="card">
      <div class="show-wrapper">
        <div class="pic-wrapper">
          <img class="pic" :src="item.picLink" @error="changeIntoDefault($event)" />
        </div>
        <h2 class="title">
          {{ item.title }}
        </h2>
        <div class="show-info">
          <div class="info-item-scor">
            <span>{{ item.scor }}</span>
          </div>
          <div class="line"></div>
          <div class="info-item-author">
            <span>{{ item.author }}</span>
          </div>
        </div>
      </div>
      <div class="help-hover-back">
        <div class="hover-background"></div>
        <div class="hover-flex-infos">
          <div class="pic-wrapper">
            <img class="pic" :src="item.picLink" />
          </div>
          <div class="bookinfo">{{ item.author }}/{{ item.time }}/{{ item.publish }}</div>
          <div class="brief">
            <div class="bookBrief">
              {{ item.brief }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<style scoped>
.content {
  cursor: pointer;
  width: 270px;
  margin-left: 34px;
  border-radius: 20px;
  height: 404px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 10px 32px 1px rgb(221, 219, 219);
  .card {
    width: 100%;
    .show-wrapper {
      opacity: 1;
      z-index: 10;
      transition: 0.4s;
      display: flex;
      flex-direction: column;
      align-items: center;
      .pic-wrapper {
        width: 200px;
        height: 300px;
        transition: 0.4s;
        .pic {
          border-radius: 20px;
        }
      }
      .title {
        height: 30px;
        font-size: 20px;
        margin-top: 10px;
        margin-bottom: 10px;
        width: auto;
        max-width: 260px;
        text-align: center;
        overflow: hidden;
      }
      .show-info {
        display: flex;
        flex-direction: row;
        justify-content: center;
        height: 100%;
        font-size: 15px;
        .info-item-author {
          position: relative;
          height: 20px;
          top: -1px;
          width: 150px;
          overflow: hidden;
          justify-content: center;
          align-items: center;
          .info-item-title {
            font-size: 20px;
            color: #cccccc;
          }
        }
        .info-item-scor {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: crimson;
          .info-item-title {
            font-size: 20px;
            color: #cccccc;
          }
        }
        .line {
          width: 2px;
          height: 2vh;
          margin: 0 0.4vw;
          background: #cccccc;
        }
      }
    }
    .help-hover-back {
      opacity: 0;
      .hover-background {
        position: absolute;
        top: 0;
        left: 0;
        background-color: #fff;
        border-radius: 20px;
        z-index: -1;
        transition: 0.2s ease-out;
        width: 304px;
        height: 100%;
        box-shadow: 0 10px 32px 1px rgb(221, 219, 219);
        background-size: cover;
      }
      .hover-flex-infos {
        position: absolute;
        flex-direction: column;
        top: 0;
        left: 0;
        width: 404px;
        z-index: -1;
        .pic-wrapper {
          cursor: pointer;
          position: absolute;
          top: 0;
          left: 52px;
          width: 200px;
          height: 300px;
          transition: 0.4s;
          .pic {
            border-radius: 20px;
          }
        }
        .bookinfo {
          position: absolute;
          top: 60px;
          left: 12px;
          width: 280px;

          text-align: center;
          overflow: hidden;
        }
        .brief {
          position: absolute;
          top: 120px;
          left: 7px;
          width: 290px;
          height: 310px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: pre-wrap;
          font-size: 5px;
          text-indent: 4em;
        }
      }
    }
    &:hover {
      .show-wrapper {
        transform: translateY(-25%);
        transition-delay: 1.5s;
        .pic-wrapper {
          transform: scale(0.8);
          transition-delay: 1.5s;
        }
        .show-info {
          opacity: 0;
          transition-delay: 1.5s;
        }
      }
      .help-hover-back {
        opacity: 1;
        transition-delay: 1.5s;
        .hover-background {
          transform: scale(1.4);
          transition-delay: 1.5s;
          z-index: 20;
        }
        .hover-flex-infos {
          z-index: 25;
          .pic-wrapper {
            transform: scale(0.8) translateY(-280px);
            transition-delay: 1.5s;
          }
          .bookinfo {
            transform: scale(0.85);
            transition-delay: 1.5s;
          }
          .brief {
            z-index: 30;
            transform: scale(1.2);
            transition-delay: 1.5s;
          }
        }
      }
    }
  }
}
@keyframes nameAmt {
  0% {
    opacity: 0;
    text-align: center;
  }
  100% {
    opacity: 1;
    text-align: center;
    transform: translateY(-55%);
  }
}

@keyframes hoverWrapperAmt {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
