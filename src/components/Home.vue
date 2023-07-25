

<template>
  <div class="home">
    <button @click="connect()">Connect</button>
    <button @click="disconnect()">Disconnect</button>
    <div class="change">
      <button @click="button">{{ change.change }}</button>
    </div>
    <div class="beats">
      <div class="for" v-for="items in player" :key="items.number">
        <AudioPlayer class="player-audio" :option="items" />
      </div>

    </div>

  </div>
</template>

<script>
import AudioPlayer from 'vue3-audio-player'
import 'vue3-audio-player/dist/style.css'
import axios from 'axios'
import { client } from "/src/socket";


export default {
  name: 'App',
  components: {
    AudioPlayer
  },

  data() {
    return {

      player: [
        {
          number: 1,
          src: '/src/assets/mp3/sasageyo.mp3',
          title: 'your-audio-title',
        },
        {
          number: 2,
          src: '/src/assets/mp3/sasageyo.mp3',
          title: 'your-audio-title',
        },
        {
          number: 3,
          src: '/src/assets/mp3/sasageyo.mp3',
          title: 'your-audio-title',
        },
        {
          number: 4,
          src: '/src/assets/mp3/sasageyo.mp3',
          title: 'your-audio-title',
        },
        {
          number: 5,
          src: '/src/assets/mp3/sasageyo.mp3',
          title: 'your-audio-title',
        },
        {
          number: 6,
          src: '/src/assets/mp3/sasageyo.mp3',
          title: 'your-audio-title',
        },
        {
          number: 7,
          src: '/src/assets/mp3/sasageyo.mp3',
          title: 'your-audio-title',
        },
        {
          number: 8,
          src: '/src/assets/mp3/sasageyo.mp3',
          title: 'your-audio-title',
        },
        {
          number: 9,
          src: '/src/assets/mp3/sasageyo.mp3',
          title: 'your-audio-title',
        },
      ],

      change: {
        change: 'Changer les boutons',
        selecting: false
      },

      selector: "",
    }
  },

  mounted() {
    console.log(client)
    let audio = document.querySelectorAll('audio');
    audio.forEach(element => {
      element.volume = 0.1;
    });
    // setInterval(() => {
    //   this.getVolume();
    // }, 500
    // )
    client.connect();
  },

  methods: {
    getVolume() {

      axios.get('http://192.168.197.121', {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((res) => {
        let son = res.data.analog_input / 10;

        let audio = document.querySelectorAll('audio');
        audio.forEach(element => {
          element.volume = son
            ;
        });

      });
    },

    button() {
      if (this.change.change == 'Changer les boutons') {
        this.change.change = 'Valider'
        this.change.selecting = true
      } else {
        this.change.change = 'Changer les boutons'
      }
    },

    selectSound(numbers) {
      if (this.change.selecting == true) {
        this.selector = numbers;

      }
    },


  }
}

</script>

<style scoped lang="scss">
.home {
  background-color: #1c1c1c;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 50px;

  .change {
    button {
      width: 150px;
      height: 60px;
    }
  }

  .beats {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .container-buttons {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    .buttons {
      button {
        width: 70px;
        height: 70px;
      }
    }
  }
}

.read-the-docs {
  color: #888;
}
</style>
