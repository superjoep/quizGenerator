<template>
  <h1>Create your own custom quiz using AI</h1>
  <div>
    Quiz category:
    <input v-model="inputQuiz" type="text" />
  </div>
  <button v-on:click="getQuiz()">Create</button>
  <div>
    <h1>{{ responseRef.title }}</h1>
    <div v-for="item in responseRef.questions">
      {{ item.question }}
      <div v-for="answer in item.options">
        <input type="radio" id="css" :name="item.question" value="CSS" />
        <label for="css">{{ answer }}</label
        ><br />
      </div>
    </div>
    <button v-if="responseRef">submit</button>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const inputQuiz = ref(""); // Make the input reactive
    const responseRef = ref(false); // Make the response reactive

    const getQuiz = async () => {
      try {
        const response = await axios.post("http://localhost:3000/api/query", {
          params: { prompt: inputQuiz.value }, // Access the value of inputQuiz
        });

        responseRef.value = JSON.parse(response.data.message); // Update the value of responseRef
      } catch (error) {
        console.error(error);
      }
    };

    return {
      inputQuiz,
      responseRef,
      getQuiz,
    };
  },
};
</script>
