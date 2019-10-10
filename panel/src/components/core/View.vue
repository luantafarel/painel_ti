<template>
  <div>
    <login />
  </div>
</template>

<script>
export default {
  components: {
    Login: () => import('@/components/Login')
  }
}
</script>
