import search from './search';

const install = function(Vue) {
  Vue.directive('search', search);
};

if (window.Vue) {
  window.search = search;
  Vue.use(install); // eslint-disable-line
}

search.install = install;
export default search;
