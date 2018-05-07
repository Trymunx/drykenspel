<template>
  <div id="login-window">
    <div id="login-dialogue">
      <div id="welcome-message">Welcome to Drykenspel</div>

      <div id="login-div" class="login-form" v-if="display === 'login'">
        <form id="login-form" class="login-form">
          <input name="email" id="login-email" type="email" autocomplete="email" placeholder="Email address" spellcheck="false">
          <input name="password" id="login-password" type="password" autocomplete="current-password">
          <a href="https:google.com/search?q=Define+unlucky" id="forgot-password">Forgotten your password?</a>
          <input type="submit" value="Login" class="login-button">
        </form>
        <hr>
        <div class="signup-question">New player?</div>
        <input class="signup-button" type="button" value="Sign up" @click="showSignUp">
      </div>

      <div id="signup-div" class="login-form" v-if="display === 'signUp'">
        <form id="signup-form" class="login-form">
          Sign up
          <input name="email" id="signup-email" type="email" placeholder="Email address" spellcheck="false">
          <input name="display-name" id="display-name" placeholder="Choose a display name" spellcheck="false" maxlength="20">
          <input name="password" id="signup-password" type="password" autocomplete="new-password" placeholder="Choose a password">
          <input type="submit" value="Sign up" class="signup-button">
        </form>
        <hr>
        <div class="signup-question">Already have an account?</div>
        <input class="login-button" type="button" value="Log in" @click="showLogin">
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      display: "login"
    };
  },
  methods: {
    showSignUp() {
      this.display = "signUp";
    },
    showLogin() {
      this.display = "login";
    }
  }
};
</script>

<style>
* {
  border: none;
  font-family: "Courier New", Courier, monospace;
  color: #d7d7d7;
  overflow: hidden;
}

body {
  display: flex;
  padding: 0;
  margin: 0;
}

hr {
  border-style: solid;
  border-width: 1px;
  border-color: #8b8b8b;
  width: 90%;
  margin: 25px 10px;
}

.signup-question {
  display: flex;
  align-content: center;
  font-size: 1.2em;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

#game {
  width: 100%;
  height: 100%;
  flex: 1 1;
}

#login-window {
  width: 100%;
  height: 100%;
  background-color: #e4e4e41c;
  display: hidden;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

#login-dialogue {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 16px;
  background-color: #191919;
  opacity: 0.92;
  border-radius: 2px;
  box-shadow: 0px 3px 12px -2px black;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#welcome-message {
  margin: 16px 10px 24px;
  font-size: 1.4em;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

#forgot-password {
  color: #8b8b8b;
  font-size: 0.75em;
  margin-left: auto;
  margin-right: 40px;
}

#forgot-password:link {
  text-decoration: none;
}

#forgot-password:hover {
  color: #6b6d6a;
}

input {
  padding: 10px;
  margin: 10px;
  background-color: #3f3f3f;
  width: 200px;
  border-radius: 2px;
}

input:focus {
  outline-color: #d7d7d7;
  background-color: #3a3a3a;
}

input::selection {
  background: #8cb98e;
}

.login-button {
  background-color: #5a5a5a;
}

.login-button:hover {
  background-color: #8b8b8b;
  cursor: pointer;
}

.signup-button:hover {
  cursor: pointer;
  background-color: #3c68199d;
  align-items: center;
}
</style>
