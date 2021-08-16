const Popper = require('popper.js');

// any CSS you require will output into a single css file (app.css in this case)
require('../css/app.css');

// require('jquery-ui');
// require('../vendor/kevinpapst/adminlte-bundle/Resources/assets/admin-lte');

// require('@fortawesome/fontawesome-free/css/all.min.css');
// require('@fortawesome/fontawesome-free/js/all.js');

const routes = require('../../public/js/fos_js_routes.json');
import Routing from '../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.min.js';
Routing.setRoutingData(routes);
global.Routing = Routing;

const $ = require('jquery');
require('bootstrap');

global.$ = $;

require('admin-lte/dist/css/AdminLTE.min.css');
require('admin-lte/dist/css/skins/_all-skins.css');
require('../../vendor/kevinpapst/adminlte-bundle/Resources/assets/admin-lte.scss');
require('../../vendor/kevinpapst/adminlte-bundle/Resources/assets/admin-lte-extensions.scss');
global.jQuery = $;
global.$.AdminLTE = {};
global.$.AdminLTE.options = {};
require('admin-lte/dist/js/adminlte.min');


