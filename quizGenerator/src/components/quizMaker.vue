<template>
  <h1>Create your own custom quiz using AI</h1>
  <div>
    Quiz categorie:
    <input type="text" />
  </div>
  <div>
    Any extra info for the quiz:
    <input type="text" />
  </div>
  <button v-on:click="getQuiz()">Create {{ jokes }}</button>
</template>

<style scoped></style>
<script>
import axios from "axios";
export default {
  methods: {
    async getQuiz() {
      axios
        .post("http://localhost:3000/api/query", {
          params: { prompt: "test" },
        })
        .then((response) => (this.responseData = response.data))
        .catch((error) => {});
    },
  },
};
</script>
