<template>
  <section id="login" class="hide-overflow">
    <v-layout>
      <v-flex md6>
        <v-img v-responsive.lg.xl v-bind="mainProps" src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
          height="100vh" min-width="900px" max-width="1%" alt="HEX shorthand color image (#777)"> </v-img>
      </v-flex>
      <div class="text-xs-center" row wrap align-center>
        <v-layout justify-center-space-between>
          <v-img v-responsive="['hidden-all','md','sm']" v-bind="mainProps" src="require('@/assets/fsfx.png')"
            alt="HEX shorthand color image (#777)"> </v-img>
          <v-flex xs10 class="pr-10 pl10">

            <v-alert class="login-failed" type="error" v-model="alert" dismissible>{{ loginErrorMsg }}
            </v-alert>
            <base-heading>Bem vindo!</base-heading>
            <base-text>
              Essa é a tela de login para acessar seu usuário no painel da tecnologia.<br>
              Insira seu usuário ad abaixo.
            </base-text>
            <div>
              <!-- Material form subscription -->
              <v-container fluid>
                <form>
                  <div class="grey-text">
                    <v-col cols="12" md="4">
                      <v-form>
                        <v-text-field id="username" v-model="username" label="Usuário Ad"></v-text-field>
                      </v-form>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field id="password" v-model="password"
                        :append-icon="show4 ? 'visibility' : 'visibility_off'" :rules="[required]"
                        :type="show4 ? 'text' : 'password'" label="Senha" name="input-10-1" counter
                        @click:append="show4 = !show4">
                      </v-text-field>
                    </v-col>

                  </div>
                  <div class="text-center">
                  </div>
                </form>
              </v-container>
              <!-- Material form subscription -->
              <v-app id="inspire" :elevation=24>
                <v-btn type="submit" class="ma-2" :loading="loading" :disabled="loading" color="info"
                  @click="loader = 'loading' ; loginAttempt()">
                  Log In!
                </v-btn>
              </v-app>

            </div>
          </v-flex>
        </v-layout>
        </v-flex>
      </div>
    </v-layout>
  </section>

</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'Basic',
    data() {
      return {
        loader: null,
        loading: false,
        show4: false,
        required: value => !!value || 'Required.',
        username: '',
        password: '',
        redirect: 'https://github.com/vuetifyjs/vuetify/issues/2083',
        alert: false,
        mainProps: { blank: true, width: 75, height: 75, class: 'm1' }
      }
    },
    watch: {
      loader() {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      },
    },
    computed: {
      ...mapState('auth', ['loginWait', 'loginErrorMsg']),
      passTextFieldType() {
        return this.passwordHidden ? 'password' : 'text'
      },
      passAppendIcon() {
        return this.passwordHidden ? 'mdi-eye' : 'mdi-eye-off'
      },
      credential() {
        let credentials = {}
        credentials['username'] = this.username
        credentials['password'] = this.password
        return credentials
      }
    },
    methods: {
      ...mapActions('auth', ['login']),
      loginAttempt() {
        this.login(this.credential).then(() => {
          this.$router.push({ path: this.redirect })
        })
      }
    }
  }

</script>
<style scoped>
  @media screen and (max-width: 1000px) {
    .mainProps {
      display: none !important;
    }
  }

  .hide-overflow {
    max-height: 100vh;
  }

  .text-xs-center {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 190vh;
    padding-left: 300px;
  }
</style>