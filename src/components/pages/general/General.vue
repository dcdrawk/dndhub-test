<template>
  <div class="page-container">
    <xen-page-toolbar class="xen-theme-indigo" title="General">
    </xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Character" @change="$bus.$emit('autosize')">
      <div slot="Character">
        <character-tab></character-tab>
      </div>
      <div slot="Background">
        <background-tab></background-tab>
      </div>
    </xen-tabs>
  </div>
</template>

<script>
import CharacterTab from './CharacterTab'
import BackgroundTab from './BackgroundTab'

export default {
  // Name
  name: 'general',

  // Components
  components: {
    CharacterTab,
    BackgroundTab
  }
}
</script>

<style scoped lang="scss">
</style>
