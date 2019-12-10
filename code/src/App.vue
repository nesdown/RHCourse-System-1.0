<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {

}
</script>


<style lang="scss">

$prime-font: 'Montserrat', monospace;

* {
  margin: 0;
  padding: 0;
}

html, body {
  font-size: 62.5%; // 1rem = 10 px
  box-sizing: border-box;
  font-family: $prime-font;
  color: rgb(34, 32, 30);

  @media only screen and (max-width: 93.75em) {
    font-size: 55%;
  }

  @media only screen and (max-width: 84.375em) {
    font-size: 50%;
  }

  @media only screen and (max-width: 37.5em) {
    font-size: 40%;
  }
}

a,
a:visited,
a:active,
a:link {
  color: rgb(34, 32, 30);
  text-decoration: none;
}
</style>
