import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const APP_NAME = process.env.VUE_APP_NAME;
// lazy load function
function loadView(view) {
    return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
}
export default new Router({
    mode: 'history',
	base: process.env.BASE_URL,
	scrollBehavior() {
		return { x: 0, y: 0 };
	},
	routes: [
        {
			path: '/',
			name: 'Home',
			component: loadView('Home'),
			meta: {
				title: `Home - ${APP_NAME}`,
				gtm: 'Home',
			},
		},
		{
			path: '/login',
			name: 'Login',
			component: loadView('Login'),
			meta: {
				title: `Login - ${APP_NAME}`,
				gtm: 'Login',
			},
		},
		{
			path: '/register',
			name: 'Register',
			component: loadView('Register'),
			meta: {
				title: `Register - ${APP_NAME}`,
				gtm: 'Register',
			},
		},
		{
			path: '/register-success',
			name: 'RegisterSuccess',
			component: loadView('RegisterSuccess'),
			meta: {
				title: `RegisterSuccess - ${APP_NAME}`,
				gtm: 'RegisterSuccess',
			},
		},
		{
			path: '/profiles',
			name: 'Profile',
			component: loadView('Profile'),
			meta: {
				title: 'Profiles',
				gtm: 'Profiles',
			},
		},
		{
			path: '/error-404',
			name: 'Error404',
			component: loadView('Error404'),
			meta: {
				title: '404',
				gtm: 'Error 404',
				hideSidebar: true,
			},
		},
		// Redirect to 404 page, if no match found
		{
			path: '*',
			redirect: '/error-404',
		},
	],
});