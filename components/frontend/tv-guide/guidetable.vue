<template>
  <b-container fluid>
    <b-row>
      <b-col md="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">
              {{ title }}
            </h4>
          </template>
          <template v-slot:body>
            <b-row v-if="rows.length > 0">
              <b-col md="12" class="table-responsive">
                <b-table bordered :items="rows" :fields="columns">
                  <template v-slot:cell(start)="data">
                    <span v-if="!data.item.editable">{{ data.item.start }}</span>
                    <input v-else v-model="data.item.start" type="text" class="form-control">
                  </template>
                  <template v-slot:cell(end)="data">
                    <span v-if="!data.item.editable">{{ data.item.end }}</span>
                    <input v-else v-model="data.item.end" type="text" class="form-control">
                  </template>
                  <template v-slot:cell(title)="data">
                    <span v-if="!data.item.editable">{{ data.item.title }}</span>
                    <input v-else v-model="data.item.title" type="text" class="form-control">
                  </template>
                </b-table>
              </b-col>
            </b-row>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '../../../assets/app/app'
export default {
  layout: 'BackendLayout',
  name: 'UiDataTable',
  props: {
    guiderows: {
      type: Array,
      required: false
    },
    channeltitle: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      channelTitle: '',
      columns: [
        { label: 'start', key: 'start', class: 'text-left' },
        { label: 'end', key: 'end', class: 'text-left' },
        { label: 'title', key: 'title', class: 'text-left' },
      ],
      rows: this.guiderows ? { ...this.guiderows } : [],
      title:this.channeltitle ? { ...this.channeltitle } : '',
    }
  },
  mounted () {
    core.index()
  },
  methods: {
  }
}
</script>
