import {route as Router} from './lib/xRoute';
import {modelA} from './modules/pageA/a-model';
import {modelB} from './modules/pageB/b-model';

Router.addRoute('aaa', () => {
    modelA.pageInit();
    document.querySelector('#container').innerHTML = require('raw!modules/pageA/a.html');
});

Router.addRoute('bbb', () => {
    modelB.pageInit();
    document.querySelector('#container').innerHTML = require('raw!modules/pageB/b.html');
});