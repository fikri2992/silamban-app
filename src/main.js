import Vue from 'vue';
import io from 'socket.io-client';
import VueSocketio from 'vue-socket.io-extended';
import Notifications from 'vue-notification';
import VTooltip from 'v-tooltip';
import {
	MdField,
	MdButton,
	MdIcon,
	MdRadio,
	MdCheckbox,
	MdDatepicker,
	MdMenu,
	MdList,
	MdDivider,
	MdDialog,
	MdContent,
	MdSwitch,
	MdChips,
	MdTable,
	MdCard,
	MdRipple,
	MdToolbar,
	MdApp,
	MdDrawer,
	// MdMenuContent,
	// MdSubheader,
	// MdProgress,
} from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
// import 'vue-material/dist/theme/default.css';


// number input international
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

// tailwind
import '@/assets/scss/vendor/tailwind.css';

import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap';

import {
	i18n,
} from './setup/i18n-setup';
import './registerServiceWorker';

Vue.config.productionTip = false;

// const SOCKET_URL = process.env.VUE_APP_SOCKET_URL || 'http://localhost:3000';

// // Socket
// const socket = io(SOCKET_URL, {
// 	transports: ['websocket'],
// });

// Material Design Components
Vue.use(MdField);
Vue.use(MdButton);
Vue.use(MdIcon);
Vue.use(MdRadio);
Vue.use(MdCheckbox);
Vue.use(MdDatepicker);
Vue.use(MdMenu);
// Vue.use(MdMenuContent);
Vue.use(MdList);
Vue.use(MdDivider);
Vue.use(MdDialog);
Vue.use(MdContent);
Vue.use(MdSwitch);
Vue.use(MdChips);
Vue.use(MdTable);
Vue.use(MdCard);
Vue.use(MdRipple);
Vue.use(MdRipple);
Vue.use(MdToolbar);
Vue.use(MdApp);
Vue.use(MdDrawer);
// Vue.use(MdSubheader);
// Vue.use(MdProgress);

// Vue.use(VueSocketio, socket, { store });
Vue.use(Notifications);
Vue.use(VTooltip);

// phone input
Vue.component('vue-phone-number-input', VuePhoneNumberInput);

// Route Middleware
router.beforeEach((to, from, next) => {
	const { path } = to;
	const { isLoggingIn } = store.getters;

	const errors = [];

	const alreadyLoggedIn = path === '/login' && isLoggingIn;
	if (alreadyLoggedIn) errors.push('already_logged_in');

	const isNotAvailable = errors.length > 0;
	const allowedPaths = [
		'/',
		'/login',
		'/logout',
		'/reset-password',
		'/password/reset',
		'/register',
		'/register-advetiser',
		'/magic-link',
		'/change-password',
		'/auto_login',
		'/user/verify',
		'/confirmation-email',
		'/register-success',
		'PollingPreview',
		'pollingLive'
	];
	const hideNavbar = [
		'PollingPreview',
		'pollingLive'
	]
	console.log(hideNavbar.includes(to.name))
	if (path === '/callback') {
		next();
	} else if (!isLoggingIn && hideNavbar.includes(to.name)) {
		next();
	} else if (!isLoggingIn && path === '/' && !hideNavbar.includes(to.name)) {
		next('/login');
	} else if (!isLoggingIn && !allowedPaths.includes(path) && !hideNavbar.includes(to.name)) {
		next('/login');
	} else if (isNotAvailable) {
		next('/');
	} else {
		next();
	}
});

// Change Title
router.beforeEach((to, from, next) => {
	store.dispatch('navigate', { to });
	const title = to.meta.title || '';
	document.title = title;
	next();
});

// Change Title
router.beforeEach((to, from, next) => {
	store.dispatch('navigate', { to });
	const title = to.meta.title || '';
	document.title = title;
	next();
});




new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
}).$mount('#app');
