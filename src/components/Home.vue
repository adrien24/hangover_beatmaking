<template>
  <div class="home">
    <div class="record">
      <button @click="toggleRecord()">{{ isRecording ? "Recording" : "Record" }}</button>
    </div>
    <div class="beats">
      <div class="for" v-for="items in players" :key="items.key">
        <AudioPlayer class="player-audio" :id="'player' + items.key" :option="items"/>
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
      isRecording: false,
      loops: [],
      speed: 1,
      players: [
        {
          key: "1",
          src: '/src/assets/mp3/kick.mp3',
        },
        {
          key: "2",
          src: '/src/assets/mp3/punch.mp3',
        },
        {
          key: "3",
          src: '/src/assets/mp3/openHat.mp3',
        },
        {
          key: "4",
          src: '/src/assets/mp3/openHat.mp3',
        },
        {
          key: "5",
          src: '/src/assets/mp3/hitHat.mp3',
        },
        {
          key: "6",
          src: '/src/assets/mp3/hitHat.mp3',
        },
        {
          key: "7",
          src: '/src/assets/mp3/hitHat.mp3',
        },
        {
          key: "8",
          src: '/src/assets/mp3/hitHat.mp3',
        },
        {
          key: "9",
          src: '/src/assets/mp3/hitHat.mp3',
        },
      ],
      selector: "",
      arr: [],
      currentRecord : {
        startTime : null
      },
      recordsPlayState: {},
      playStartTime: Date.now()
    }
  },


  async mounted() {
    //await this.loadAudio();
    this.receiveData();

    let audio = document.querySelectorAll('audio');
    audio.forEach(element => {
      element.volume = 0.1;
    });

    this.playLoops();

    window.addEventListener("keyup", (e) => {
      if(e.key === 'r') this.toggleRecord()
    })
  },

  methods: {

   async loadAudio() {
     for (const player of this.players) {
       player.audio = await new Audio(player.src);
     }
   },
    toggleRecord() {
      this.isRecording = !this.isRecording;
      if (this.isRecording === true) {
        this.currentRecord.startTime = Date.now();
        this.arr = [];
      } else {
        console.log(this.arr);
        this.loops.push({
          sounds : this.arr,
          totalTime : Date.now() - this.currentRecord.startTime
        })
        console.log(this.loops)
        this.currentRecord.startTime = null;
      }
    },

    getCurrentRecordTime() {
      if(this.currentRecord.startTime === null) throw new Error('No record started');
      return Date.now() - this.currentRecord.startTime;
    },

    getRecordTime(startTime) {
      return Date.now() - startTime;
    },

    playLoop(loop, index) {
      if(!this.recordsPlayState[index] || this.recordsPlayState[index].previousLoopTime > loop.totalTime) {
        console.log('reset', index)
        this.recordsPlayState[index] = {
          startTime: Date.now(),
          indexPlayed: 0,
          previousLoopTime: 0
        };
      }
      const loopTime = this.getRecordTime(this.recordsPlayState[index].startTime) * this.speed ;
      for (const record of loop.sounds) {
        const i = loop.sounds.indexOf(record);
        if(i < this.recordsPlayState[index].indexPlayed) continue;
        if(record.time - loopTime < 10) {
          console.log('break', record.time, record.time - loopTime, loopTime)
          this.playSound(record.sound);
          this.recordsPlayState[index].indexPlayed = i + 1;
        }
      }
      this.recordsPlayState[index].previousLoopTime = loopTime;
    },

    playLoops() {
      this.playStartTime = this.getRecordTime(this.playStartTime)
      this.loops.forEach((loop, index) => {
        this.playLoop(loop, index);
      });
      requestAnimationFrame(this.playLoops.bind(this));
    },

    receiveData() {
      // Create WebSocket connection.
      const socket = new WebSocket("ws://localhost:3000");

      // Connection opened
      socket.addEventListener("open", (event) => {
        console.log("Connected to server");
      });

      // Listen for messages
      socket.addEventListener("message", (event) => {
        let parse = JSON.parse(event.data);


        if (parse.Volume) {
          console.log("volume", parse.Volume)
          this.son = parse.Volume / 10;
          let audio = document.querySelectorAll('audio');
          audio.forEach(element => {
            element.volume = this.son;
          });
        }

        if (parse.Board) {
          console.log(parse.Board);
          this.playSound(parse.Board)
          this.recordSound(parse.Board);

        }

        if (parse.Speed) {
          this.speed = 1 + (parse.Speed / 10) * 4;
        }
      });
    },

    playSound(sound) {
      const player = document.querySelector(`#player${sound} audio`)
      console.dir(player)
      player.currentTime = 0;
      player.play();
    },

    recordSound(sound) {
      if(this.isRecording) {
        this.arr.push({sound : sound, time: this.getCurrentRecordTime()});
        console.log(this.arr)
      }
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
