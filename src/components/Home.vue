

<template>
  <div class="home">
    <div class="record"><button @click="records()">Record</button></div>
    <div class="beats">
      <div class="for" v-for="items in player" :key="items.number">
        <AudioPlayer class="player-audio" :id="'player' + items.number" :option="items" />
      </div>
    </div>
  </div>
</template>

<script>
import AudioPlayer from 'vue3-audio-player'
import 'vue3-audio-player/dist/style.css'


export default {
  name: 'App',
  components: {
    AudioPlayer
  },

  data() {
    return {
      son: 0,
      record: false,
      recordArray: [],
      player: [
        {
          number: 1,
          src: '/src/assets/mp3/kick.mp3',
          title: 'your-audio-title',
        },
        {
          number: 2,
          src: '/src/assets/mp3/punch.mp3',
          title: 'your-audio-title',
        },
        {
          number: 3,
          src: '/src/assets/mp3/openHat.mp3',
          title: 'your-audio-title',
        },
        {
          number: 4,
          src: '/src/assets/mp3/openHat.mp3',
          title: 'your-audio-title',
        },
        {
          number: 5,
          src: '/src/assets/mp3/hitHat.mp3',
          title: 'your-audio-title',
        },
        {
          number: 6,
          src: '/src/assets/mp3/hitHat.mp3',
          title: 'your-audio-title',
        },
        {
          number: 7,
          src: '/src/assets/mp3/hitHat.mp3',
          title: 'your-audio-title',
        },
        {
          number: 8,
          src: '/src/assets/mp3/hitHat.mp3',
          title: 'your-audio-title',
        },
        {
          number: 9,
          src: '/src/assets/mp3/hitHat.mp3',
          title: 'your-audio-title',
        },
      ],
      selector: "",
      arr: []
    }
  },


  mounted() {

    this.receiveData();

    let audio = document.querySelectorAll('audio');
    audio.forEach(element => {
      element.volume = 0.1;
    });
  },

  methods: {

    records() {
      this.record = !this.record;

      if (this.record === false && this.arr.length > 0) {
        console.log()
      }

      const socket = new WebSocket("ws://172.20.10.3:3000");
      socket.addEventListener("message", (event) => {
        let parse = JSON.parse(event.data);

        if (this.record === true && parse.Board) {
          console.log('record')
          this.arr.push(parse);
        }
        console.log(this.arr)
      });

    },
  },

  receiveData() {
    // Create WebSocket connection.
    const socket = new WebSocket("ws://172.20.10.3:3000");

    // Connection opened
    socket.addEventListener("open", (event) => {
      socket.send("Hello Server!");
    });

    // Listen for messages
    socket.addEventListener("message", (event) => {
      let parse = JSON.parse(event.data);


      if (parse.Volume) {
        this.son = parse.Volume / 10;
        let audio = document.querySelectorAll('audio');
        audio.forEach(element => {
          element.volume = this.son;
        });
      }

      if (parse.Board) {
        console.log(parse.Board);
        let player = document.querySelectorAll('#player' + parse.Board + ' audio');
        player.forEach(element => {
          element.currentTime = 0;
          element.play();
        });
      }
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
