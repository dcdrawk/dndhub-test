<template>
  <div v-if="item">
    <section v-if="!edit" class="spell-container">
      <div class="spell-info">
        <strong class="xen-color-primary">{{ item.level }} {{ item.school }}</strong><br>
        {{ item.class }}
      </div>
      <div class="spell-casting-time">
        <strong class="xen-color-primary">Casting Time</strong><br>
        {{ item.casting_time }}
      </div>
      <div class="spell-range">
        <strong class="xen-color-primary">Range</strong><br>
        {{ item.range }}
      </div>
      <div class="spell-components">
        <strong class="xen-color-primary">Components</strong><br>
        {{ item.components }}
      </div>
      <div class="spell-components">
        <strong class="xen-color-primary">Duration</strong><br>
        {{ item.duration }}
      </div>
      <div class="spell-description dnd-pre-line">{{ item.desc }}</div>
    </section>

    <section class="edit-spell xen-color-primary" v-if="edit">
      <!-- Name -->
      <xen-input label="Name"
      :value="item.name"
      @input="$emit('input', {
        prop: 'name',
        value: $event
      })"
      name="selected_spell_name"
      v-validate="'required'"
      data-vv-value-path="dataValue"
      :error="errors.first('selected_spell_name')"
      :disabled="edit === false">
      </xen-input>

      <!-- Level -->
      <xen-input label="Level"
      :value="item.level"
      :disabled="edit === false"
      @input="$emit('input', {
        prop: 'level',
        value: $event
      })">
      </xen-input>

      <!-- School -->
      <xen-input label="School"
      :value="item.school"
      :disabled="edit === false"
      @input="$emit('input', {
        prop: 'school',
        value: $event
      })">
      </xen-input>

      <!-- Class -->
      <xen-input label="Class"
      :value="item.class"
      :disabled="edit === false"
      @input="$emit('input', {
        prop: 'class',
        value: $event
      })">
      </xen-input>

      <!-- Casting Time -->
      <xen-input label="Casting Time"
      :value="item.casting_time"
      :disabled="edit === false"
      @input="$emit('input', {
        prop: 'casting_time',
        value: $event
      })">
      </xen-input>

      <!-- Range -->
      <xen-input label="Range"
      :value="item.range"
      :disabled="edit === false"
      @input="$emit('input', {
        prop: 'range',
        value: $event
      })">
      </xen-input>

      <!-- Duration -->
      <xen-input label="Duration"
      :value="item.duration"
      :disabled="edit === false"
      @input="$emit('input', {
        prop: 'duration',
        value: $event
      })">
      </xen-input>

      <!-- Description -->
      <xen-text-area label="Description"
      :value="item.desc"
      @input="$emit('input', {
        prop: 'desc',
        value: $event
      })"
      :disabled="edit === false">
      </xen-text-area>

    </section>
  </div>
</template>

<script>
export default {
  // Name
  name: 'weapon-inputs',

  props: [
    'item',
    'edit'
  ],

  mounted () {
    // this.$bus.$on('validate', () => {
    //   console.log('validate')
    //   this.$validator.validateAll()
    // })
    console.log('test')
    this.$bus.$on('validate', () => {
      // this.$validator.validateAll()
      this.validate()
    })
    // this.$validator.validateAll()
  },

  methods: {
    async validate () {
      console.log('try validate')
      try {
        this.$validator.validateAll()
        this.$bus.$emit('validated')

        // this.$bus.$emit('push_item', {
        //   key: this.field,
        //   value: this.item
        // })
        // this.$bus.$emit('toast', `${this.item.name} Added`)
        // this.$nextTick(() => {
        //   this.$bus.$emit('back')
        // })
      } catch (error) {
        console.warn(error)
      }
    }
  }
}
</script>

<style scoped lang="scss">
$box-shadow: inset 0px 0px 1px 0px rgba(0, 0, 0, 0.5);
.spell-container {
  display: flex;
  flex-wrap: wrap;
  .spell-info {
    box-shadow: $box-shadow;
    background-color: #f5f5f5;
  }
  > div {
    padding: 12px;
    text-align: center;
    // box-shadow: $box-shadow;
  }
  .spell-casting-time,
  .spell-range,
  .spell-components,
  .spell-components {
    width: 50%;
    background-color: #f5f5f5;
    box-shadow: $box-shadow;
    font-size: 14px;
    // box-shadow: inset 1px 1px 1px #000;
    // border: 1px solid #000;
    // display: table;
    border-collapse: collapse;
  }
  .spell-info,
  .spell-description {
    width: 100%;
  }

  .spell-description {
    text-align: left;
    font-size: 14px;
    padding: 16px;
  }
}

.edit-spell {
  padding: 32px 20px;
}
</style>
