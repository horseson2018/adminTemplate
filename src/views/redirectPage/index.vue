<script>
export default {
  name: 'RedirectPage',
  beforeCreate() {
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: `/${path}`, query })
  },
  render(h) {
    return h()
  }
}
</script>
