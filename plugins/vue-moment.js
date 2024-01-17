import Vue from 'vue';
import VueMoment from 'vue-moment';
import moment from 'moment';
import 'moment/locale/ka';

if (!Vue.moment) {
  Vue.use(VueMoment, {
    moment,
  });
}
