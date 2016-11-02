webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(8);
	
	__webpack_require__(32);
	__webpack_require__(36);
	__webpack_require__(38);
	__webpack_require__(40);
	
	__webpack_require__(42);
	__webpack_require__(44);
	
	//import 'babel-polyfill';

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _index = __webpack_require__(2);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _index3 = __webpack_require__(6);
	
	var _index4 = _interopRequireDefault(_index3);
	
	var _picker = __webpack_require__(7);
	
	var _picker2 = _interopRequireDefault(_picker);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//import dd from 'components/dialog/index';
	
	
	module.exports = {
	    cityComponent: _index2.default,
	    timeSelectComponent: _index4.default,
	    Picker: _picker2.default
	};
	/*
	export {
	    cityComponent,
	    timeSelectComponent,
	    dd
	}*/

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(3);
	
	var _dialog = __webpack_require__(4);
	
	var _dialog2 = _interopRequireDefault(_dialog);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var cityComponent = function () {
	    function cityComponent() {
	        _classCallCheck(this, cityComponent);
	
	        this.configMap = {
	            main_html: __webpack_require__(5),
	            succCb: null,
	            failCb: null,
	            allCities: null,
	            settable_map: {
	                succCb: true,
	                failCb: true,
	                allCities: true
	            }
	        };
	        this.stateMap = {
	            append_target: null,
	            province_id: null,
	            city_id: null,
	            district_id: null
	        };
	        this.DomMap = {};
	        this.choosedAreas = [];
	    }
	    //省份列表
	
	
	    _createClass(cityComponent, [{
	        key: 'generateCityList',
	        value: function generateCityList(cities) {
	            if (!_util.util.isArr(cities)) return '';
	            var _provinceList = '';
	            for (var i = 0; i < cities.length; i++) {
	                _provinceList += '<li class="list-item" data-id="' + cities[i]['id'] + '" data-name="' + cities[i]['name'] + '">' + cities[i]['name'] + '</li>';
	            }
	            return _provinceList;
	        }
	        //城市列表
	
	    }, {
	        key: 'getCityChilds',
	        value: function getCityChilds(id) {
	            var allCities = this.configMap.allCities;
	            for (var i = 0; i < allCities.length; i++) {
	                //判断存在 es6
	                if (allCities[i].id === id) {
	                    this.choosedAreas = allCities[i].childs;
	                    return allCities[i].childs;
	                }
	            }
	        }
	        //区域列表
	
	    }, {
	        key: 'getAreaChilds',
	        value: function getAreaChilds(id) {
	            for (var i = 0; i < this.choosedAreas.length; i++) {
	                if (this.choosedAreas[i].id === id) return this.choosedAreas[i].childs;
	            }
	        }
	
	        //注意各种this的指向.  city-active???
	        //省份选择
	
	    }, {
	        key: 'onProvinceListClick',
	        value: function onProvinceListClick(that) {
	            return function (e) {
	                var _target = e.target,
	                    _citiesList = that.getCityChilds(_target.dataset.id);
	
	                _util.util.removeClass(this.querySelector('.city-active'), 'city-active');
	                _util.util.addClass(_target, 'city-active');
	                that.DomMap.cityList.innerHTML = that.generateCityList(_citiesList);
	                _util.util.addClass(that.DomMap.cityListBox, 'city-box-show');
	            };
	        }
	
	        //城市选择
	
	    }, {
	        key: 'onCityListClick',
	        value: function onCityListClick(that) {
	            return function (e) {
	                var _target = e.target,
	                    _areaList = that.getAreaChilds(_target.dataset.id);
	
	                _util.util.removeClass(this.querySelector('.city-active'), 'city-active');
	                _util.util.addClass(_target, 'city-active');
	                that.DomMap.areaList.innerHTML = that.generateCityList(_areaList);
	                _util.util.addClass(that.DomMap.areaListBox, 'city-box-show');
	            };
	        }
	        //地区选择
	
	    }, {
	        key: 'onAreaListClick',
	        value: function onAreaListClick(that) {
	            return function (e) {
	                var _target = e.target,
	                    _province = that.DomMap.provinceList.querySelector('.city-active'),
	                    _city = that.DomMap.cityList.querySelector('.city-active'),
	                    _text = '',
	                    _params = {},
	                    cb = that.configMap.succCb; //通过回调来和外部业务逻辑进行通讯
	
	                if (_province === null || _city === null) return that.configMap.failCb();
	
	                this.querySelector('.city-active') && _util.util.removeClass(this.querySelector('.city-active'), 'city-active');
	                _util.util.addClass(_target, 'city-active');
	                _util.util.removeClass(that.DomMap.append_target, 'city-box-show');
	
	                _text = _province.dataset.name + '-' + _city.dataset.name + '-' + _target.dataset.name;
	
	                //TODO 1. 可利用订阅发布模式将数据传递出去
	                //TODO 2. 可通过接受回调函数的方法,对于业务逻辑进行处理
	                //城市选择回调
	
	                _params = {
	                    text: _text,
	                    id_map: {
	                        province_id: _province.dataset.id,
	                        city_id: _city.dataset.id,
	                        district_id: _target.dataset.id
	                    }
	                };
	
	                //
	                that.stateMap.province_id = _province.dataset.id;
	                that.stateMap.city_id = _province.dataset.id;
	                that.stateMap.district_id = _target.dataset.id;
	
	                typeof cb === 'function' && cb(_params);
	            };
	        }
	    }, {
	        key: 'onBackBtnClick',
	        value: function onBackBtnClick(that) {
	            return function () {
	                var targetDom = that.DomMap.append_target,
	                    stateMap = that.stateMap,
	                    DomMap = that.DomMap;
	                _util.util.removeClass(targetDom, 'city-box-show');
	
	                //未完成省市区所有选择时才进行处理
	                if (!(that.stateMap.province_id && that.stateMap.city_id && that.stateMap.district_id)) {
	
	                    // 城市区域列表消失
	                    _util.util.removeClass(that.DomMap.cityListBox, 'city-box-show');
	                    _util.util.removeClass(that.DomMap.areaListBox, 'city-box-show');
	
	                    //清除样式
	                    _util.util.removeClass(targetDom.getElementsByClassName('city-active')[0], 'city-active');
	                    _util.util.removeClass(targetDom.getElementsByClassName('city-active')[0], 'city-active');
	
	                    that.stateMap.province_id = null;
	                    that.stateMap.city_id = null;
	                    that.stateMap.district_id = null;
	                }
	            };
	        }
	    }, {
	        key: 'setDomMap',
	        value: function setDomMap() {
	            var append_target = this.stateMap.append_target;
	            this.DomMap = {
	                append_target: append_target,
	                provinceList: append_target.querySelector('.province-container .province-list'),
	                cityListBox: append_target.querySelector('.city-container'),
	                cityList: append_target.querySelector('.city-list'),
	                areaListBox: append_target.querySelector('.area-container'),
	                areaList: append_target.querySelector('.area-list'),
	                backBtn: append_target.querySelector('.city-header .btn-back')
	            };
	        }
	    }, {
	        key: 'configModule',
	        value: function configModule(input_map) {
	            _util.util.setConfigModule({
	                input_map: input_map,
	                settable_map: this.configMap.settable_map,
	                config_map: this.configMap
	            });
	        }
	    }, {
	        key: 'showCityBox',
	        value: function showCityBox() {
	            //TODO dialog组件
	            if (this.configModule.allCities.length === 0) return _dialog2.default.dialog.alert('网络异常');
	            _util.util.addClass(this.DomMap.append_target, 'city-box-show');
	        }
	    }, {
	        key: 'initModule',
	        value: function initModule(append_target) {
	            //将模板文件添加到目标DOM中
	            append_target.innerHTML = this.configMap.main_html;
	            this.stateMap.append_target = append_target;
	
	            //dom缓存
	            this.setDomMap();
	
	            var DomMap = this.DomMap;
	
	            DomMap.provinceList.innerHTML = this.generateCityList(this.configMap.allCities);
	
	            //DOM绑定事件
	            DomMap.provinceList.addEventListener('click', this.onProvinceListClick(this));
	            DomMap.cityList.addEventListener('click', this.onCityListClick(this));
	            DomMap.areaList.addEventListener('click', this.onAreaListClick(this));
	            //选择城市后退按钮
	            DomMap.backBtn.addEventListener('click', this.onBackBtnClick(this));
	        }
	    }]);
	
	    return cityComponent;
	}();
	
	exports.default = cityComponent;

/***/ },
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	module.exports = "<div class=\"city-header\">\n    <span class=\"btn-back\">返回</span>\n    <span class=\"city-title\">选择城市</span>\n</div>\n<div class=\"province-container city-list-box\">\n    <ul class=\"province-list\">\n    </ul>\n</div>\n<div class=\"city-container city-list-box\">\n    <ul class=\"city-list\"></ul>\n</div>\n<div class=\"area-container city-list-box\">\n    <ul class=\"area-list\"></ul>\n</div>"

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(3);
	
	var _picker = __webpack_require__(7);
	
	var _picker2 = _interopRequireDefault(_picker);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var timeSelectComponent = function () {
	    function timeSelectComponent() {
	        _classCallCheck(this, timeSelectComponent);
	
	        this.configMap = {
	            settable_map: {
	                timeArr: true,
	                containerArr: true,
	                startYearArr: true,
	                callbackArr: true
	            },
	            timeArr: [],
	            containerArr: [],
	            startYearArr: [],
	            callbackArr: []
	        };
	        this.stateMap = {};
	        this.dateNum = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	    }
	
	    _createClass(timeSelectComponent, [{
	        key: 'generateYear',
	        value: function generateYear() {
	            var startYear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2000;
	
	            var _arr = [],
	                i = startYear;
	            for (; i < new Date().getFullYear(); i++) {
	                _arr[_arr.length] = {
	                    text: i,
	                    value: i
	                };
	            }
	            return _arr;
	        }
	    }, {
	        key: 'generateMonth',
	        value: function generateMonth() {
	            var _arr = [],
	                i = 1;
	            for (; i <= 12; i++) {
	                _arr[_arr.length] = {
	                    text: i,
	                    value: i
	                };
	            }
	            return _arr;
	        }
	    }, {
	        key: 'generateDate',
	        value: function generateDate(year, month) {
	            var _isLeapYear = _util.util.isLeapYear(year, month),
	                _arr = [],
	                _date = this.dateNum[month - 1],
	                i = 1;
	
	            if (_isLeapYear && month === 2) {
	                ++_date;
	            }
	
	            for (; i <= _date; i++) {
	                _arr[_arr.length] = {
	                    text: i,
	                    value: i
	                };
	            }
	            return _arr;
	        }
	    }, {
	        key: 'configModule',
	        value: function configModule(input_map) {
	            _util.util.setConfigModule({
	                input_map: input_map,
	                settable_map: this.configMap.settable_map,
	                config_map: this.configMap
	            });
	        }
	    }, {
	        key: 'deleteEventFn',
	        value: function deleteEventFn() {
	            //TODO  删除其所绑定的事件
	
	            var ele = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	        }
	    }, {
	        key: 'initAlphaModule',
	        value: function initAlphaModule() {
	            var itemArr = [],
	                element1 = document.querySelector(this.configMap.containerArr[0]),
	                element2 = document.querySelector(this.configMap.containerArr[1]);
	            for (var i = 65; i < 90; i++) {
	                var letter = String.fromCharCode(i);
	                itemArr.push({ text: letter, value: letter });
	            }
	            var picker = new _picker2.default({
	                data: [[], itemArr, []],
	                selectIndex: [0, 0, 0],
	                title: '请选择车牌'
	            });
	
	            element1.addEventListener('click', function () {
	                picker.show();
	            });
	
	            element2.addEventListener('click', function () {
	                picker.show();
	            });
	
	            picker.on('picker.change', function (index, selectIndex) {
	                picker.refill([{ text: 1, value: 1 }, { text: 2, value: 2 }], 2);
	            });
	
	            picker.on('picker.select', function (selectedVal, selectIndex) {});
	        }
	    }, {
	        key: 'initTimeModule',
	        value: function initTimeModule() {
	            var startYearArr = this.configMap.startYearArr,
	                timeArr = this.configMap.timeArr,
	                containerArr = this.configMap.containerArr,
	                cbArr = this.configMap.callbackArr,
	                that = this;
	
	            //时间控件初始化
	            startYearArr.forEach(function (item, index) {
	                var timeObj = timeArr[index] = {};
	
	                //初始化数据
	                timeObj.year = this.generateYear(item);
	                timeObj.month = this.generateMonth();
	                timeObj.date = this.generateDate(item, 1);
	                timeObj.selectedYear = item;
	                timeObj.selectedMonth = 1;
	                //timeObj.selectedDate = null;
	            }.bind(this));
	
	            containerArr.forEach(function (ele, index) {
	                var timeItem = timeArr[index],
	                    cb = cbArr[index],
	                    element = document.querySelector(ele);
	
	                var picker = new _picker2.default({
	                    data: [timeItem.year, timeItem.month, timeItem.date],
	                    selectIndex: [0, 0, 0],
	                    title: '请选择时间'
	                });
	
	                /* picker.on('picker.select', (selectedVal, selectIndex) => {
	                     let _str = timeItem.year[selectIndex[0]].text + '-' + timeItem.month[selectIndex[1]].text + '-' + timeItem.date[selectIndex[2]].text;
	                     cb(_str);
	                 });
	                  picker.on('picker.change', (index, selectIndex) => {
	                     if(index != 2) {
	                         index === 0 ? timeItem.selectedYear = timeItem.year[selectIndex].text : timeItem.selectedMonth = timeItem.month[selectIndex].text;
	                         picker.on('refill', that.generateDate(timeItem.selectedYear, timeItem.selectedMonth), 2);
	                     }
	                 });
	                  picker.on('picker.valuechange', () => {});*/
	
	                element.addEventListener('click', function () {
	                    picker.show();
	                });
	            });
	        }
	    }]);
	
	    return timeSelectComponent;
	}();
	
	exports.default = timeSelectComponent;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Picker=t():e.Picker=t()}(this,function(){return function(e){function t(n){if(i[n])return i[n].exports;var r=i[n]={exports:{},id:n,loaded:!1};return e[n].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var i={};return t.m=e,t.c=i,t.p="",t(0)}([function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var r=i(1),o=n(r);o["default"].version="1.0.1",t["default"]=o["default"],e.exports=t["default"]},function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),l=i(2),c=n(l),h=i(3),u=n(h),p=i(4),f=i(5),d=i(6),m=n(d),v=i(26),g=n(v);i(27);var y=function(e){function t(e){r(this,t);var i=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return i.options={data:[],title:"",selectedIndex:null,showCls:"show"},(0,p.extend)(i.options,e),i.data=i.options.data,i.pickerEl=(0,f.createDom)((0,m["default"])({data:i.data,title:i.options.title})),document.body.appendChild(i.pickerEl),i.maskEl=i.pickerEl.getElementsByClassName("mask-hook")[0],i.wheelEl=i.pickerEl.getElementsByClassName("wheel-hook"),i.panelEl=i.pickerEl.getElementsByClassName("panel-hook")[0],i.confirmEl=i.pickerEl.getElementsByClassName("confirm-hook")[0],i.cancelEl=i.pickerEl.getElementsByClassName("cancel-hook")[0],i.scrollEl=i.pickerEl.getElementsByClassName("wheel-scroll-hook"),i._init(),i}return s(t,e),a(t,[{key:"_init",value:function(){if(this.selectedIndex=[],this.selectedVal=[],this.options.selectedIndex)this.selectedIndex=this.options.selectedIndex;else for(var e=0;e<this.data.length;e++)this.selectedIndex[e]=0;this._bindEvent()}},{key:"_bindEvent",value:function(){var e=this;(0,f.addEvent)(this.pickerEl,"touchmove",function(e){e.preventDefault()}),(0,f.addEvent)(this.confirmEl,"click",function(){e.hide();for(var t=!1,i=0;i<e.data.length;i++){var n=e.wheels[i].getSelectedIndex();e.selectedIndex[i]=n;var r=null;e.data[i].length&&(r=e.data[i][n].value),e.selectedVal[i]!==r&&(t=!0),e.selectedVal[i]=r}e.trigger("picker.select",e.selectedVal,e.selectedIndex),t&&e.trigger("picker.valuechange",e.selectedVal,e.selectedIndex)}),(0,f.addEvent)(this.cancelEl,"click",function(){e.hide(),e.trigger("picker.cancel")})}},{key:"_createWheel",value:function(e,t){var i=this;return this.wheels[t]=new c["default"](e[t],{wheel:!0,selectedIndex:this.selectedIndex[t]}),function(e){i.wheels[e].on("scrollEnd",function(){i.trigger("picker.change",e,i.wheels[e].getSelectedIndex())})}(t),this.wheels[t]}},{key:"show",value:function(e){var t=this;this.pickerEl.style.display="block";var i=this.options.showCls;window.setTimeout(function(){if((0,f.addClass)(t.maskEl,i),(0,f.addClass)(t.panelEl,i),t.wheels)for(var n=0;n<t.data.length;n++)t.wheels[n].enable(),t.wheels[n].wheelTo(t.selectedIndex[n]);else{t.wheels=[];for(var r=0;r<t.data.length;r++)t._createWheel(t.wheelEl,r)}e&&e()},0)}},{key:"hide",value:function(){var e=this,t=this.options.showCls;(0,f.removeClass)(this.maskEl,t),(0,f.removeClass)(this.panelEl,t),window.setTimeout(function(){e.pickerEl.style.display="none";for(var t=0;t<e.length;t++)e.wheels[t].disable()},500)}},{key:"refill",value:function(e,t){var i=this.scrollEl[t],n=this.wheels[t];if(i&&n){var r=this.data[t];this.data[t]=e,i.innerHTML=(0,g["default"])(e);var o=n.getSelectedIndex(),s=0;if(r.length)for(var a=r[o].value,l=0;l<e.length;l++)if(e[l].value===a){s=l;break}return this.selectedIndex[t]=s,n.refresh(),n.wheelTo(s),s}}}]),t}(u["default"]);t["default"]=y,e.exports=t["default"]},function(e,t,i){!function(t,i){e.exports=i()}(this,function(){return function(e){function t(n){if(i[n])return i[n].exports;var r=i[n]={exports:{},id:n,loaded:!1};return e[n].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var i={};return t.m=e,t.c=i,t.p="",t(0)}([function(e,t,i){"use strict";var n=i(1);n.BScroll.Version="0.1.7",e.exports=n.BScroll},function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.BScroll=void 0;var s=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),a=i(2),l=1;t.BScroll=function(e){function t(e,i){n(this,t);var o=r(this,Object.getPrototypeOf(t).call(this));return o.wrapper="string"==typeof e?document.querySelector(e):e,o.scroller=o.wrapper.children[0],o.scrollerStyle=o.scroller.style,o.options={startX:0,startY:0,scrollY:!0,directionLockThreshold:5,momentum:!0,bounce:!0,selectedIndex:0,rotate:25,wheel:!1,snap:!1,snapLoop:!1,snapThreshold:.1,swipeTime:2500,bounceTime:700,adjustTime:400,swipeBounceTime:1200,deceleration:.001,momentumLimitTime:300,momentumLimitDistance:15,resizePolling:60,preventDefault:!0,preventDefaultException:{tagName:/^(INPUT|TEXTAREA|BUTTON|SELECT)$/},HWCompositing:!0,useTransition:!0,useTransform:!0},(0,a.extend)(o.options,i),o.translateZ=o.options.HWCompositing&&a.hasPerspective?" translateZ(0)":"",o.options.useTransition=o.options.useTransition&&a.hasTransition,o.options.useTransform=o.options.useTransform&&a.hasTransform,o.options.eventPassthrough=o.options.eventPassthrough===!0?"vertical":o.options.eventPassthrough,o.options.preventDefault=!o.options.eventPassthrough&&o.options.preventDefault,o.options.scrollX="horizontal"!==o.options.eventPassthrough&&o.options.scrollX,o.options.scrollY="vertical"!==o.options.eventPassthrough&&o.options.scrollY,o.options.freeScroll=o.options.freeScroll&&!o.options.eventPassthrough,o.options.directionLockThreshold=o.options.eventPassthrough?0:o.options.directionLockThreshold,o.options.tap===!0&&(o.options.tap="tap"),o._init(),o.options.snap&&o._initSnap(),o.refresh(),o.options.snap||o.scrollTo(o.options.startX,o.options.startY),o.enable(),o}return o(t,e),s(t,[{key:"_init",value:function(){this.x=0,this.y=0,this.directionX=0,this.directionY=0,this._addEvents()}},{key:"_initSnap",value:function(){var e=this;if(this.currentPage={},this.options.snapLoop){var t=this.scroller.children;t.length>0&&((0,a.prepend)(t[t.length-1].cloneNode(!0),this.scroller),this.scroller.appendChild(t[1].cloneNode(!0)))}"string"==typeof this.options.snap&&(this.options.snap=this.scroller.querySelectorAll(this.options.snap)),this.on("refresh",function(){if(e.pages=[],e.wrapperWidth&&e.wrapperHeight&&e.scrollerWidth&&e.scrollerHeight){var t=e.options.snapStepX||e.wrapperWidth,i=e.options.snapStepY||e.wrapperHeight,n=0,r=void 0,o=void 0,s=void 0,l=0,c=void 0,h=0,u=void 0,p=void 0,f=void 0;if(e.options.snap===!0)for(o=Math.round(t/2),s=Math.round(i/2);n>-e.scrollerWidth;){for(e.pages[l]=[],c=0,r=0;r>-e.scrollerHeight;)e.pages[l][c]={x:Math.max(n,e.maxScrollX),y:Math.max(r,e.maxScrollY),width:t,height:i,cx:n-o,cy:r-s},r-=i,c++;n-=t,l++}else for(p=e.options.snap,c=p.length,u=-1;c>l;l++)f=(0,a.getRect)(p[l]),(0===l||f.left<=(0,a.getRect)(p[l-1]).left)&&(h=0,u++),e.pages[h]||(e.pages[h]=[]),n=Math.max(-f.left,e.maxScrollX),r=Math.max(-f.top,e.maxScrollY),o=n-Math.round(f.width/2),s=r-Math.round(f.height/2),e.pages[h][u]={x:n,y:r,width:f.width,height:f.height,cx:o,cy:s},n>e.maxScrollX&&h++;var d=e.options.snapLoop?1:0;e.goToPage(e.currentPage.pageX||d,e.currentPage.pageY||0,0),e.options.snapThreshold%1===0?(e.snapThresholdX=e.options.snapThreshold,e.snapThresholdY=e.options.snapThreshold):(e.snapThresholdX=Math.round(e.pages[e.currentPage.pageX][e.currentPage.pageY].width*e.options.snapThreshold),e.snapThresholdY=Math.round(e.pages[e.currentPage.pageX][e.currentPage.pageY].height*e.options.snapThreshold))}}),this.on("scrollEnd",function(){e.options.snapLoop&&(0===e.currentPage.pageX&&e.goToPage(e.pages.length-2,e.currentPage.pageY,0),e.currentPage.pageX===e.pages.length-1&&e.goToPage(1,e.currentPage.pageY,0))}),this.on("flick",function(){var t=e.options.snapSpeed||Math.max(Math.max(Math.min(Math.abs(e.x-e.startX),1e3),Math.min(Math.abs(e.y-e.startY),1e3)),300);e.goToPage(e.currentPage.pageX+e.directionX,e.currentPage.pageY+e.directionY,t)})}},{key:"_nearestSnap",value:function(e,t){if(!this.pages.length)return{x:0,y:0,pageX:0,pageY:0};var i=0;if(Math.abs(e-this.absStartX)<this.snapThresholdX&&Math.abs(t-this.absStartY)<this.snapThresholdY)return this.currentPage;e>0?e=0:e<this.maxScrollX&&(e=this.maxScrollX),t>0?t=0:t<this.maxScrollY&&(t=this.maxScrollY);for(var n=this.pages.length;n>i;i++)if(e>=this.pages[i][0].cx){e=this.pages[i][0].x;break}n=this.pages[i].length;for(var r=0;n>r;r++)if(t>=this.pages[0][r].cy){t=this.pages[0][r].y;break}return i===this.currentPage.pageX&&(i+=this.directionX,0>i?i=0:i>=this.pages.length&&(i=this.pages.length-1),e=this.pages[i][0].x),r===this.currentPage.pageY&&(r+=this.directionY,0>r?r=0:r>=this.pages[0].length&&(r=this.pages[0].length-1),t=this.pages[0][r].y),{x:e,y:t,pageX:i,pageY:r}}},{key:"_addEvents",value:function(){var e=a.addEvent;this._handleEvents(e)}},{key:"_removeEvents",value:function(){var e=a.removeEvent;this._handleEvents(e)}},{key:"_handleEvents",value:function(e){var t=this.options.bindToWrapper?this.wrapper:window;e(window,"orientationchange",this),e(window,"resize",this),this.options.click&&e(this.wrapper,"click",this),this.options.disableMouse||(e(this.wrapper,"mousedown",this),e(t,"mousemove",this),e(t,"mousecancel",this),e(t,"mouseup",this)),a.hasTouch&&!this.options.disableTouch&&(e(this.wrapper,"touchstart",this),e(t,"touchmove",this),e(t,"touchcancel",this),e(t,"touchend",this)),e(this.scroller,a.style.transitionEnd,this)}},{key:"_start",value:function(e){var t=a.eventType[e.type];if((t===l||0===e.button)&&this.enabled&&(!this.initiated||this.initiated===t)){if(this.initiated=t,!this.options.preventDefault||a.isBadAndroid||(0,a.preventDefaultException)(e.target,this.options.preventDefaultException)||e.preventDefault(),this.moved=!1,this.distX=0,this.distY=0,this.directionX=0,this.directionY=0,this.directionLocked=0,this._transitionTime(),this.startTime=+new Date,this.options.wheel&&(this.target=e.target),this.options.useTransition&&this.isInTransition){this.isInTransition=!1;var i=this.getComputedPosition();this._translate(Math.round(i.x),Math.round(i.y)),this.options.wheel?this.target=this.items[Math.round(-i.y/this.itemHeight)]:this.trigger("scrollEnd")}var n=e.touches?e.touches[0]:e;this.startX=this.x,this.startY=this.y,this.absStartX=this.x,this.absStartY=this.y,this.pointX=n.pageX,this.pointY=n.pageY,this.trigger("beforeScrollStart")}}},{key:"_move",value:function(e){if(this.enabled&&a.eventType[e.type]===this.initiated){this.options.preventDefault&&e.preventDefault();var t=e.touches?e.touches[0]:e,i=t.pageX-this.pointX,n=t.pageY-this.pointY;this.pointX=t.pageX,this.pointY=t.pageY,this.distX+=i,this.distY+=n;var r=Math.abs(this.distX),o=Math.abs(this.distY),s=+new Date;if(!(s-this.endTime>this.options.momentumLimitTime&&o<this.options.momentumLimitDistance&&r<this.options.momentumLimitDistance)){if(this.directionLocked||this.options.freeScroll||(r>o+this.options.directionLockThreshold?this.directionLocked="h":o>=r+this.options.directionLockThreshold?this.directionLocked="v":this.directionLocked="n"),"h"===this.directionLocked){if("vertical"===this.options.eventPassthrough)e.preventDefault();else if("horizontal"===this.options.eventPassthrough)return void(this.initiated=!1);n=0}else if("v"===this.directionLocked){if("horizontal"===this.options.eventPassthrough)e.preventDefault();else if("vertical"===this.options.eventPassthrough)return void(this.initiated=!1);i=0}i=this.hasHorizontalScroll?i:0,n=this.hasVerticalScroll?n:0;var l=this.x+i,c=this.y+n;(l>0||l<this.maxScrollX)&&(l=this.x+i/3),(c>0||c<this.maxScrollY)&&(c=this.y+n/3),this.directionX=i>0?-1:0>i?1:0,this.directionY=n>0?-1:0>n?1:0,this.moved||(this.moved=!0,this.trigger("scrollStart")),this._translate(l,c),s-this.startTime>this.options.momentumLimitTime&&(this.startTime=s,this.startX=this.x,this.startY=this.y,1===this.options.probeType&&this.trigger("scroll",{x:this.x,y:this.y})),this.options.probeType>1&&this.trigger("scroll",{x:this.x,y:this.y});var h=document.documentElement.scrollLeft||window.pageXOffset||document.body.scrollLeft,u=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop,p=this.pointX-h,f=this.pointY-u;(p>document.documentElement.clientWidth-this.options.momentumLimitDistance||p<this.options.momentumLimitDistance||f<this.options.momentumLimitDistance||f>document.documentElement.clientHeight-this.options.momentumLimitDistance)&&this._end(e)}}}},{key:"_end",value:function(e){if(this.enabled&&a.eventType[e.type]===this.initiated&&(this.initiated=!1,this.options.preventDefault&&!(0,a.preventDefaultException)(e.target,this.options.preventDefaultException)&&e.preventDefault(),!this.resetPosition(this.options.bounceTime,a.ease.bounce))){this.isInTransition=!1;var t=Math.round(this.x),i=Math.round(this.y);if(!this.moved){if(this.options.wheel){if(this.target&&"wheel-scroll"===this.target.className){var n=Math.abs(Math.round(i/this.itemHeight)),r=Math.round((this.pointY+(0,a.offset)(this.target).top-this.itemHeight/2)/this.itemHeight);this.target=this.items[n+r]}this.scrollToElement(this.target,this.options.adjustTime,!0,!0,a.ease.swipe)}else this.options.tap&&(0,a.tap)(e,this.options.tap),this.options.click&&(0,a.click)(e);return void this.trigger("scrollCancel")}this.scrollTo(t,i),this.endTime=+new Date;var o=this.endTime-this.startTime,s=Math.abs(t-this.startX),l=Math.abs(i-this.startY);if(this._events.flick&&o<this.options.momentumLimitTime&&s<this.options.momentumLimitDistance&&l<this.options.momentumLimitDistance)return void this.trigger("flick");var c=0;if(this.options.momentum&&o<this.options.momentumLimitTime&&(l>this.options.momentumLimitDistance||s>this.options.momentumLimitDistance)){var h=this.hasHorizontalScroll?(0,a.momentum)(this.x,this.startX,o,this.maxScrollX,this.options.bounce?this.wrapperWidth:0,this.options):{destination:t,duration:0},u=this.hasVerticalScroll?(0,a.momentum)(this.y,this.startY,o,this.maxScrollY,this.options.bounce?this.wrapperHeight:0,this.options):{destination:i,duration:0};t=h.destination,i=u.destination,c=Math.max(h.duration,u.duration),this.isInTransition=1}else this.options.wheel&&(i=Math.round(i/this.itemHeight)*this.itemHeight,c=this.options.adjustTime);var p=a.ease.swipe;if(this.options.snap){var f=this._nearestSnap(t,i);this.currentPage=f,c=this.options.snapSpeed||Math.max(Math.max(Math.min(Math.abs(t-f.x),1e3),Math.min(Math.abs(i-f.y),1e3)),300),t=f.x,i=f.y,this.directionX=0,this.directionY=0,p=a.ease.bounce}if(t!==this.x||i!==this.y)return(t>0||t<this.maxScrollX||i>0||i<this.maxScrollY)&&(p=a.ease.swipeBounce),void this.scrollTo(t,i,c,p);this.options.wheel&&(this.selectedIndex=0|Math.abs(this.y/this.itemHeight)),this.trigger("scrollEnd")}}},{key:"_resize",value:function(){var e=this;this.enabled&&(clearTimeout(this.resizeTimeout),this.resizeTimeout=setTimeout(function(){e.refresh()},this.options.resizePolling))}},{key:"_startProbe",value:function(){function e(){var i=t.getComputedPosition();t.trigger("scroll",i),t.isInTransition&&(t.probeTimer=(0,a.requestAnimationFrame)(e))}(0,a.cancelAnimationFrame)(this.probeTimer),this.probeTimer=(0,a.requestAnimationFrame)(e);var t=this}},{key:"_transitionTime",value:function(){var e=this,t=arguments.length<=0||void 0===arguments[0]?0:arguments[0];if(this.scrollerStyle[a.style.transitionDuration]=t+"ms",this.options.wheel&&!a.isBadAndroid)for(var i=0;i<this.itemLen;i++)this.items[i].style[a.style.transitionDuration]=t+"ms";!t&&a.isBadAndroid&&(this.scrollerStyle[a.style.transitionDuration]="0.001s",(0,a.requestAnimationFrame)(function(){"0.0001ms"===e.scrollerStyle[a.style.transitionDuration]&&(e.scrollerStyle[a.style.transitionDuration]="0s")}))}},{key:"_transitionTimingFunction",value:function(e){if(this.scrollerStyle[a.style.transitionTimingFunction]=e,this.options.wheel&&!a.isBadAndroid)for(var t=0;t<this.itemLen;t++)this.items[t].style[a.style.transitionTimingFunction]=e}},{key:"_transitionEnd",value:function(e){e.target===this.scroller&&this.isInTransition&&(this._transitionTime(),this.resetPosition(this.options.bounceTime,a.ease.bounce)||(this.isInTransition=!1,this.trigger("scrollEnd")))}},{key:"_translate",value:function(e,t){if(this.options.useTransform?this.scrollerStyle[a.style.transform]="translate("+e+"px,"+t+"px)"+this.translateZ:(e=Math.round(e),t=Math.round(t),this.scrollerStyle.left=e+"px",this.scrollerStyle.top=t+"px"),this.options.wheel&&!a.isBadAndroid)for(var i=0;i<this.itemLen;i++){var n=this.options.rotate*(t/this.itemHeight+i);this.items[i].style[a.style.transform]="rotateX("+n+"deg)"}this.x=e,this.y=t}},{key:"enable",value:function(){this.enabled=!0}},{key:"disable",value:function(){this.enabled=!1}},{key:"refresh",value:function(){this.wrapper.offsetHeight,this.wrapperWidth=parseInt(this.wrapper.style.width)||this.wrapper.clientWidth,this.wrapperHeight=parseInt(this.wrapper.style.height)||this.wrapper.clientHeight,this.scrollerWidth=parseInt(this.scroller.style.width)||this.scroller.clientWidth,this.scrollerHeight=parseInt(this.scroller.style.height)||this.scroller.clientHeight,this.options.wheel?(this.items=this.scroller.children,this.options.itemHeight=this.itemHeight=this.items.length?this.items[0].clientHeight:0,void 0===this.selectedIndex&&(this.selectedIndex=this.options.selectedIndex),this.options.startY=-this.selectedIndex*this.itemHeight,this.itemLen=this.items.length,this.maxScrollX=0,this.maxScrollY=-this.itemHeight*(this.itemLen-1)):(this.maxScrollX=this.wrapperWidth-this.scrollerWidth,this.maxScrollY=this.wrapperHeight-this.scrollerHeight),this.hasHorizontalScroll=this.options.scrollX&&this.maxScrollX<0,this.hasVerticalScroll=this.options.scrollY&&this.maxScrollY<0,this.hasHorizontalScroll||(this.maxScrollX=0,this.scrollerWidth=this.wrapperWidth),this.hasVerticalScroll||(this.maxScrollY=0,this.scrollerHeight=this.wrapperHeight),this.endTime=0,this.directionX=0,this.directionY=0,this.wrapperOffset=(0,a.offset)(this.wrapper),this.trigger("refresh"),this.resetPosition()}},{key:"resetPosition",value:function(){var e=arguments.length<=0||void 0===arguments[0]?0:arguments[0],t=arguments.length<=1||void 0===arguments[1]?a.ease.bounce:arguments[1],i=this.x;!this.hasHorizontalScroll||i>0?i=0:i<this.maxScrollX&&(i=this.maxScrollX);var n=this.y;return!this.hasVerticalScroll||n>0?n=0:n<this.maxScrollY&&(n=this.maxScrollY),(i!==this.x||n!==this.y)&&(this.scrollTo(i,n,e,t),!0)}},{key:"wheelTo",value:function(e){this.options.wheel&&(this.y=-e*this.itemHeight,this.scrollTo(0,this.y))}},{key:"scrollBy",value:function(e,t){var i=arguments.length<=2||void 0===arguments[2]?0:arguments[2],n=arguments.length<=3||void 0===arguments[3]?a.ease.bounce:arguments[3];e=this.x+e,t=this.y+t,this.scrollTo(e,t,i,n)}},{key:"scrollTo",value:function(e,t,i){var n=arguments.length<=3||void 0===arguments[3]?a.ease.bounce:arguments[3];this.isInTransition=this.options.useTransition&&i>0&&(e!==this.x||t!==this.y),i&&!this.options.useTransition||(this._transitionTimingFunction(n.style),this._transitionTime(i),this._translate(e,t),i&&3===this.options.probeType&&this._startProbe(),this.options.wheel&&(t>0?this.selectedIndex=0:t<this.maxScrollY?this.selectedIndex=this.itemLen-1:this.selectedIndex=0|Math.abs(t/this.itemHeight)))}},{key:"getSelectedIndex",value:function(){return this.options.wheel&&this.selectedIndex}},{key:"getCurrentPage",value:function(){return this.options.snap&&this.currentPage}},{key:"scrollToElement",value:function(e,t,i,n,r){if(e&&(e=e.nodeType?e:this.scroller.querySelector(e),!this.options.wheel||"wheel-item"===e.className)){var o=(0,a.offset)(e);o.left-=this.wrapperOffset.left,o.top-=this.wrapperOffset.top,i===!0&&(i=Math.round(e.offsetWidth/2-this.wrapper.offsetWidth/2)),n===!0&&(n=Math.round(e.offsetHeight/2-this.wrapper.offsetHeight/2)),o.left-=i||0,o.top-=n||0,o.left=o.left>0?0:o.left<this.maxScrollX?this.maxScrollX:o.left,o.top=o.top>0?0:o.top<this.maxScrollY?this.maxScrollY:o.top,this.options.wheel&&(o.top=Math.round(o.top/this.itemHeight)*this.itemHeight),t=void 0===t||null===t||"auto"===t?Math.max(Math.abs(this.x-o.left),Math.abs(this.y-o.top)):t,this.scrollTo(o.left,o.top,t,r)}}},{key:"getComputedPosition",value:function(){var e=window.getComputedStyle(this.scroller,null),t=void 0,i=void 0;return this.options.useTransform?(e=e[a.style.transform].split(")")[0].split(", "),t=+(e[12]||e[4]),i=+(e[13]||e[5])):(t=+e.left.replace(/[^-\d.]/g,""),i=+e.top.replace(/[^-\d.]/g,"")),{x:t,y:i}}},{key:"goToPage",value:function(e,t,i){var n=arguments.length<=3||void 0===arguments[3]?a.ease.bounce:arguments[3];e>=this.pages.length?e=this.pages.length-1:0>e&&(e=0),t>=this.pages[e].length?t=this.pages[e].length-1:0>t&&(t=0);var r=this.pages[e][t].x,o=this.pages[e][t].y;i=void 0===i?this.options.snapSpeed||Math.max(Math.max(Math.min(Math.abs(r-this.x),1e3),Math.min(Math.abs(o-this.y),1e3)),300):i,this.currentPage={x:r,y:o,pageX:e,pageY:t},this.scrollTo(r,o,i,n)}},{key:"next",value:function(e,t){var i=this.currentPage.pageX,n=this.currentPage.pageY;i++,i>=this.pages.length&&this.hasVerticalScroll&&(i=0,n++),this.goToPage(i,n,e,t)}},{key:"prev",value:function(e,t){var i=this.currentPage.pageX,n=this.currentPage.pageY;i--,0>i&&this.hasVerticalScroll&&(i=0,n--),this.goToPage(i,n,e,t)}},{key:"destroy",value:function(){this._removeEvents(),this.trigger("destroy")}},{key:"handleEvent",value:function(e){switch(e.type){case"touchstart":case"mousedown":this._start(e);break;case"touchmove":case"mousemove":this._move(e);break;case"touchend":case"mouseup":case"touchcancel":case"mousecancel":this._end(e);break;case"orientationchange":case"resize":this._resize();break;case"transitionend":case"webkitTransitionEnd":case"oTransitionEnd":case"MSTransitionEnd":this._transitionEnd(e);break;case"click":e._constructed||(e.preventDefault(),e.stopPropagation())}}}]),t}(a.EventEmitter)},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(3);Object.keys(n).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return n[e]}})});var r=i(4);Object.keys(r).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return r[e]}})});var o=i(5);Object.keys(o).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return o[e]}})});var s=i(6);Object.keys(s).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return s[e]}})});var a=i(7);Object.keys(a).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return a[e]}})});var l=i(8);Object.keys(l).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return l[e]}})})},function(e,t){"use strict";function i(e){return f!==!1&&("standard"===f?e:f+e.charAt(0).toUpperCase()+e.substr(1))}function n(e,t,i,n){e.addEventListener(t,i,!!n)}function r(e,t,i,n){e.removeEventListener(t,i,!!n)}function o(e){for(var t=0,i=0;e;)t-=e.offsetLeft,i-=e.offsetTop,e=e.offsetParent;return{left:t,top:i}}function s(e){if(e instanceof window.SVGElement){var t=e.getBoundingClientRect();return{top:t.top,left:t.left,width:t.width,height:t.height}}return{top:e.offsetTop,left:e.offsetLeft,width:e.offsetWidth,height:e.offsetHeight}}function a(e,t){for(var i in t)if(t[i].test(e))return!0;return!1}function l(e,t){var i=document.createEvent("Event");i.initEvent(t,!0,!0),i.pageX=e.pageX,i.pageY=e.pageY,e.target.dispatchEvent(i)}function c(e){var t=e.target;if(!/(SELECT|INPUT|TEXTAREA)/i.test(t.tagName)){var i=document.createEvent(window.MouseEvent?"MouseEvents":"Event");i.initEvent("click",!0,!0),i._constructed=!0,t.dispatchEvent(i)}}function h(e,t){t.firstChild?u(e,t.firstChild):t.appendChild(e)}function u(e,t){t.parentNode.insertBefore(e,t)}Object.defineProperty(t,"__esModule",{value:!0}),t.addEvent=n,t.removeEvent=r,t.offset=o,t.getRect=s,t.preventDefaultException=a,t.tap=l,t.click=c,t.prepend=h,t.before=u;var p=document.createElement("div").style,f=function(){var e={webkit:"webkitTransform",Moz:"MozTransform",O:"OTransform",ms:"msTransform",standard:"transform"};for(var t in e)if(void 0!==p[e[t]])return t;return!1}(),d=i("transform"),m=(t.hasPerspective=i("perspective")in p,t.hasTouch="ontouchstart"in window,t.hasTransform=d!==!1,t.hasTransition=i("transition")in p,t.style={transform:d,transitionTimingFunction:i("transitionTimingFunction"),transitionDuration:i("transitionDuration"),transitionDelay:i("transitionDelay"),transformOrigin:i("transformOrigin"),transitionEnd:i("transitionEnd")},1),v=2;t.eventType={touchstart:m,touchmove:m,touchend:m,mousedown:v,mousemove:v,mouseup:v}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isBadAndroid=/Android /.test(window.navigator.appVersion)&&!/Chrome\/\d/.test(window.navigator.appVersion)},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ease={swipe:{style:"cubic-bezier(0.23, 1, 0.32, 1)",fn:function(e){return 1+--e*e*e*e*e}},swipeBounce:{style:"cubic-bezier(0.25, 0.46, 0.45, 0.94)",fn:function(e){return e*(2-e)}},bounce:{style:"cubic-bezier(0.165, 0.84, 0.44, 1)",fn:function(e){return 1- --e*e*e*e}}}},function(e,t){"use strict";function i(e){if(Array.isArray(e)){for(var t=0,i=Array(e.length);t<e.length;t++)i[t]=e[t];return i}return Array.from(e)}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){var i=[],n=!0,r=!1,o=void 0;try{for(var s,a=e[Symbol.iterator]();!(n=(s=a.next()).done)&&(i.push(s.value),!t||i.length!==t);n=!0);}catch(l){r=!0,o=l}finally{try{!n&&a["return"]&&a["return"]()}finally{if(r)throw o}}return i}return function(t,i){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),o=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}();t.EventEmitter=function(){function e(){n(this,e),this._events={}}return o(e,[{key:"on",value:function(e,t){var i=arguments.length<=2||void 0===arguments[2]?this:arguments[2];this._events[e]||(this._events[e]=[]),this._events[e].push([t,i])}},{key:"once",value:function(e,t){function i(){this.off(e,i),r||(r=!0,t.apply(n,arguments))}var n=arguments.length<=2||void 0===arguments[2]?this:arguments[2],r=!1;this.on(e,i)}},{key:"off",value:function(e,t){var i=this._events[e];if(i)for(var n=i.length;n--;)i[n][0]===t&&(i[n][0]=void 0)}},{key:"trigger",value:function(e){var t=this._events[e];if(t)for(var n=t.length,o=[].concat(i(t)),s=0;n>s;s++){var a=o[s],l=r(a,2),c=l[0],h=l[1];c&&c.apply(h,[].slice.call(arguments,1))}}}]),e}()},function(e,t){"use strict";function i(e,t,i,n,r,o){var s=e-t,a=Math.abs(s)/i,l=o.deceleration,c=o.itemHeight,h=o.swipeBounceTime,u=o.bounceTime,p=o.swipeTime,f=o.wheel?4:15,d=e+a/l*(0>s?-1:1);return o.wheel&&c&&(d=Math.round(d/c)*c),n>d?(d=r?n-r/f*a:n,p=h-u):d>0&&(d=r?r/f*a:0,p=h-u),{destination:Math.round(d),duration:p}}Object.defineProperty(t,"__esModule",{value:!0}),t.momentum=i},function(e,t){"use strict";function i(e,t){for(var i in t)e[i]=t[i]}Object.defineProperty(t,"__esModule",{value:!0}),t.extend=i;var n=100/60;t.requestAnimationFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||function(e){return window.setTimeout(e,(e.interval||n)/2)}}(),t.cancelAnimationFrame=function(){return window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||function(e){window.clearTimeout(e)}}()}])})},function(e,t){"use strict";function i(e){if(Array.isArray(e)){for(var t=0,i=Array(e.length);t<e.length;t++)i[t]=e[t];return i}return Array.from(e)}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){var i=[],n=!0,r=!1,o=void 0;try{for(var s,a=e[Symbol.iterator]();!(n=(s=a.next()).done)&&(i.push(s.value),!t||i.length!==t);n=!0);}catch(l){r=!0,o=l}finally{try{!n&&a["return"]&&a["return"]()}finally{if(r)throw o}}return i}return function(t,i){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),o=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),s=function(){function e(){n(this,e),this._events={}}return o(e,[{key:"on",value:function(e,t){var i=arguments.length<=2||void 0===arguments[2]?this:arguments[2];this._events[e]||(this._events[e]=[]),this._events[e].push([t,i])}},{key:"once",value:function(e,t){function i(){this.off(e,i),r||(r=!0,t.apply(n,arguments))}var n=arguments.length<=2||void 0===arguments[2]?this:arguments[2],r=!1;this.on(e,i)}},{key:"off",value:function(e,t){var i=this._events[e];if(i)for(var n=i.length;n--;)i[n][0]===t&&(i[n][0]=void 0)}},{key:"trigger",value:function(e){var t=this._events[e];if(t)for(var n=t.length,o=[].concat(i(t)),s=0;n>s;s++){var a=o[s],l=r(a,2),c=l[0],h=l[1];c&&c.apply(h,[].slice.call(arguments,1))}}}]),e}();t["default"]=s,e.exports=t["default"]},function(e,t){"use strict";function i(e,t){for(var i in t)e[i]=t[i]}Object.defineProperty(t,"__esModule",{value:!0}),t.extend=i},function(e,t){"use strict";function i(e){var t=document.createElement("div");return t.innerHTML=e,t.childNodes[0]}function n(e,t,i,n){e.addEventListener(t,i,!!n)}function r(e,t,i,n){e.removeEventListener(t,i,!!n)}function o(e,t){var i=new RegExp("(^|\\s)"+t+"(\\s|$)");return i.test(e.className)}function s(e,t){if(!o(e,t)){var i=e.className.split(" ");i.push(t),e.className=i.join(" ")}}function a(e,t){if(o(e,t)){var i=new RegExp("(^|\\s)"+t+"(\\s|$)","g");e.className=e.className.replace(i," ")}}Object.defineProperty(t,"__esModule",{value:!0}),t.createDom=i,t.addEvent=n,t.removeEvent=r,t.hasClass=o,t.addClass=s,
	t.removeClass=a},function(e,t,i){var n=i(7);e.exports=(n["default"]||n).template({1:function(e,t,i,n,r){var o;return'          <div class="wheel wheel-hook">\n            <ul class="wheel-scroll wheel-scroll-hook">\n'+(null!=(o=i.each.call(null!=t?t:{},t,{name:"each",hash:{},fn:e.program(2,r,0),inverse:e.noop,data:r}))?o:"")+"            </ul>\n          </div>\n"},2:function(e,t,i,n,r){var o,s=null!=t?t:{},a=i.helperMissing,l="function",c=e.escapeExpression;return'                <li class="wheel-item" data-val="'+c((o=null!=(o=i.value||(null!=t?t.value:t))?o:a,typeof o===l?o.call(s,{name:"value",hash:{},data:r}):o))+'">'+c((o=null!=(o=i.text||(null!=t?t.text:t))?o:a,typeof o===l?o.call(s,{name:"text",hash:{},data:r}):o))+"</li>\n"},compiler:[7,">= 4.0.0"],main:function(e,t,i,n,r){var o,s,a=null!=t?t:{};return'<div class="picker">\n  <div class="picker-mask mask-hook"></div>\n  <div class="picker-panel panel-hook">\n    <div class="picker-choose choose-hook">\n      <span class="cancel cancel-hook">取消</span>\n      <span class="confirm confirm-hook">确定</span>\n      <h1 class="picker-title">'+e.escapeExpression((s=null!=(s=i.title||(null!=t?t.title:t))?s:i.helperMissing,"function"==typeof s?s.call(a,{name:"title",hash:{},data:r}):s))+'</h1>\n    </div>\n    <div class="picker-content">\n      <div class="mask-top border-1px"></div>\n      <div class="mask-bottom border-1px"></div>\n      <div class="wheel-wrapper wheel-wrapper-hook">\n'+(null!=(o=i.each.call(a,null!=t?t.data:t,{name:"each",hash:{},fn:e.program(1,r,0),inverse:e.noop,data:r}))?o:"")+'      </div>\n    </div>\n    <div class="picker-footer footer-hook"></div>\n  </div>\n</div>'},useData:!0})},function(e,t,i){e.exports=i(8)["default"]},function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t["default"]=e,t}function o(){var e=new a.HandlebarsEnvironment;return f.extend(e,a),e.SafeString=c["default"],e.Exception=u["default"],e.Utils=f,e.escapeExpression=f.escapeExpression,e.VM=m,e.template=function(t){return m.template(t,e)},e}t.__esModule=!0;var s=i(9),a=r(s),l=i(23),c=n(l),h=i(11),u=n(h),p=i(10),f=r(p),d=i(24),m=r(d),v=i(25),g=n(v),y=o();y.create=o,g["default"](y),y["default"]=y,t["default"]=y,e.exports=t["default"]},function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t,i){this.helpers=e||{},this.partials=t||{},this.decorators=i||{},l.registerDefaultHelpers(this),c.registerDefaultDecorators(this)}t.__esModule=!0,t.HandlebarsEnvironment=r;var o=i(10),s=i(11),a=n(s),l=i(12),c=i(20),h=i(22),u=n(h),p="4.0.5";t.VERSION=p;var f=7;t.COMPILER_REVISION=f;var d={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1",7:">= 4.0.0"};t.REVISION_CHANGES=d;var m="[object Object]";r.prototype={constructor:r,logger:u["default"],log:u["default"].log,registerHelper:function(e,t){if(o.toString.call(e)===m){if(t)throw new a["default"]("Arg not supported with multiple helpers");o.extend(this.helpers,e)}else this.helpers[e]=t},unregisterHelper:function(e){delete this.helpers[e]},registerPartial:function(e,t){if(o.toString.call(e)===m)o.extend(this.partials,e);else{if("undefined"==typeof t)throw new a["default"]('Attempting to register a partial called "'+e+'" as undefined');this.partials[e]=t}},unregisterPartial:function(e){delete this.partials[e]},registerDecorator:function(e,t){if(o.toString.call(e)===m){if(t)throw new a["default"]("Arg not supported with multiple decorators");o.extend(this.decorators,e)}else this.decorators[e]=t},unregisterDecorator:function(e){delete this.decorators[e]}};var v=u["default"].log;t.log=v,t.createFrame=o.createFrame,t.logger=u["default"]},function(e,t){"use strict";function i(e){return h[e]}function n(e){for(var t=1;t<arguments.length;t++)for(var i in arguments[t])Object.prototype.hasOwnProperty.call(arguments[t],i)&&(e[i]=arguments[t][i]);return e}function r(e,t){for(var i=0,n=e.length;n>i;i++)if(e[i]===t)return i;return-1}function o(e){if("string"!=typeof e){if(e&&e.toHTML)return e.toHTML();if(null==e)return"";if(!e)return e+"";e=""+e}return p.test(e)?e.replace(u,i):e}function s(e){return e||0===e?!(!m(e)||0!==e.length):!0}function a(e){var t=n({},e);return t._parent=e,t}function l(e,t){return e.path=t,e}function c(e,t){return(e?e+".":"")+t}t.__esModule=!0,t.extend=n,t.indexOf=r,t.escapeExpression=o,t.isEmpty=s,t.createFrame=a,t.blockParams=l,t.appendContextPath=c;var h={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;","=":"&#x3D;"},u=/[&<>"'`=]/g,p=/[&<>"'`=]/,f=Object.prototype.toString;t.toString=f;var d=function(e){return"function"==typeof e};d(/x/)&&(t.isFunction=d=function(e){return"function"==typeof e&&"[object Function]"===f.call(e)}),t.isFunction=d;var m=Array.isArray||function(e){return e&&"object"==typeof e?"[object Array]"===f.call(e):!1};t.isArray=m},function(e,t){"use strict";function i(e,t){var r=t&&t.loc,o=void 0,s=void 0;r&&(o=r.start.line,s=r.start.column,e+=" - "+o+":"+s);for(var a=Error.prototype.constructor.call(this,e),l=0;l<n.length;l++)this[n[l]]=a[n[l]];Error.captureStackTrace&&Error.captureStackTrace(this,i),r&&(this.lineNumber=o,this.column=s)}t.__esModule=!0;var n=["description","fileName","lineNumber","message","name","number","stack"];i.prototype=new Error,t["default"]=i,e.exports=t["default"]},function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e){s["default"](e),l["default"](e),h["default"](e),p["default"](e),d["default"](e),v["default"](e),y["default"](e)}t.__esModule=!0,t.registerDefaultHelpers=r;var o=i(13),s=n(o),a=i(14),l=n(a),c=i(15),h=n(c),u=i(16),p=n(u),f=i(17),d=n(f),m=i(18),v=n(m),g=i(19),y=n(g)},function(e,t,i){"use strict";t.__esModule=!0;var n=i(10);t["default"]=function(e){e.registerHelper("blockHelperMissing",function(t,i){var r=i.inverse,o=i.fn;if(t===!0)return o(this);if(t===!1||null==t)return r(this);if(n.isArray(t))return t.length>0?(i.ids&&(i.ids=[i.name]),e.helpers.each(t,i)):r(this);if(i.data&&i.ids){var s=n.createFrame(i.data);s.contextPath=n.appendContextPath(i.data.contextPath,i.name),i={data:s}}return o(t,i)})},e.exports=t["default"]},function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var r=i(10),o=i(11),s=n(o);t["default"]=function(e){e.registerHelper("each",function(e,t){function i(t,i,o){c&&(c.key=t,c.index=i,c.first=0===i,c.last=!!o,h&&(c.contextPath=h+t)),l+=n(e[t],{data:c,blockParams:r.blockParams([e[t],t],[h+t,null])})}if(!t)throw new s["default"]("Must pass iterator to #each");var n=t.fn,o=t.inverse,a=0,l="",c=void 0,h=void 0;if(t.data&&t.ids&&(h=r.appendContextPath(t.data.contextPath,t.ids[0])+"."),r.isFunction(e)&&(e=e.call(this)),t.data&&(c=r.createFrame(t.data)),e&&"object"==typeof e)if(r.isArray(e))for(var u=e.length;u>a;a++)a in e&&i(a,a,a===e.length-1);else{var p=void 0;for(var f in e)e.hasOwnProperty(f)&&(void 0!==p&&i(p,a-1),p=f,a++);void 0!==p&&i(p,a-1,!0)}return 0===a&&(l=o(this)),l})},e.exports=t["default"]},function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var r=i(11),o=n(r);t["default"]=function(e){e.registerHelper("helperMissing",function(){if(1!==arguments.length)throw new o["default"]('Missing helper: "'+arguments[arguments.length-1].name+'"')})},e.exports=t["default"]},function(e,t,i){"use strict";t.__esModule=!0;var n=i(10);t["default"]=function(e){e.registerHelper("if",function(e,t){return n.isFunction(e)&&(e=e.call(this)),!t.hash.includeZero&&!e||n.isEmpty(e)?t.inverse(this):t.fn(this)}),e.registerHelper("unless",function(t,i){return e.helpers["if"].call(this,t,{fn:i.inverse,inverse:i.fn,hash:i.hash})})},e.exports=t["default"]},function(e,t){"use strict";t.__esModule=!0,t["default"]=function(e){e.registerHelper("log",function(){for(var t=[void 0],i=arguments[arguments.length-1],n=0;n<arguments.length-1;n++)t.push(arguments[n]);var r=1;null!=i.hash.level?r=i.hash.level:i.data&&null!=i.data.level&&(r=i.data.level),t[0]=r,e.log.apply(e,t)})},e.exports=t["default"]},function(e,t){"use strict";t.__esModule=!0,t["default"]=function(e){e.registerHelper("lookup",function(e,t){return e&&e[t]})},e.exports=t["default"]},function(e,t,i){"use strict";t.__esModule=!0;var n=i(10);t["default"]=function(e){e.registerHelper("with",function(e,t){n.isFunction(e)&&(e=e.call(this));var i=t.fn;if(n.isEmpty(e))return t.inverse(this);var r=t.data;return t.data&&t.ids&&(r=n.createFrame(t.data),r.contextPath=n.appendContextPath(t.data.contextPath,t.ids[0])),i(e,{data:r,blockParams:n.blockParams([e],[r&&r.contextPath])})})},e.exports=t["default"]},function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e){s["default"](e)}t.__esModule=!0,t.registerDefaultDecorators=r;var o=i(21),s=n(o)},function(e,t,i){"use strict";t.__esModule=!0;var n=i(10);t["default"]=function(e){e.registerDecorator("inline",function(e,t,i,r){var o=e;return t.partials||(t.partials={},o=function(r,o){var s=i.partials;i.partials=n.extend({},s,t.partials);var a=e(r,o);return i.partials=s,a}),t.partials[r.args[0]]=r.fn,o})},e.exports=t["default"]},function(e,t,i){"use strict";t.__esModule=!0;var n=i(10),r={methodMap:["debug","info","warn","error"],level:"info",lookupLevel:function(e){if("string"==typeof e){var t=n.indexOf(r.methodMap,e.toLowerCase());e=t>=0?t:parseInt(e,10)}return e},log:function(e){if(e=r.lookupLevel(e),"undefined"!=typeof console&&r.lookupLevel(r.level)<=e){var t=r.methodMap[e];console[t]||(t="log");for(var i=arguments.length,n=Array(i>1?i-1:0),o=1;i>o;o++)n[o-1]=arguments[o];console[t].apply(console,n)}}};t["default"]=r,e.exports=t["default"]},function(e,t){"use strict";function i(e){this.string=e}t.__esModule=!0,i.prototype.toString=i.prototype.toHTML=function(){return""+this.string},t["default"]=i,e.exports=t["default"]},function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t["default"]=e,t}function o(e){var t=e&&e[0]||1,i=g.COMPILER_REVISION;if(t!==i){if(i>t){var n=g.REVISION_CHANGES[i],r=g.REVISION_CHANGES[t];throw new v["default"]("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+n+") or downgrade your runtime to an older version ("+r+").")}throw new v["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+e[1]+").")}}function s(e,t){function i(i,n,r){r.hash&&(n=d.extend({},n,r.hash),r.ids&&(r.ids[0]=!0)),i=t.VM.resolvePartial.call(this,i,n,r);var o=t.VM.invokePartial.call(this,i,n,r);if(null==o&&t.compile&&(r.partials[r.name]=t.compile(i,e.compilerOptions,t),o=r.partials[r.name](n,r)),null!=o){if(r.indent){for(var s=o.split("\n"),a=0,l=s.length;l>a&&(s[a]||a+1!==l);a++)s[a]=r.indent+s[a];o=s.join("\n")}return o}throw new v["default"]("The partial "+r.name+" could not be compiled when running in runtime-only mode")}function n(t){function i(t){return""+e.main(r,t,r.helpers,r.partials,s,l,a)}var o=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],s=o.data;n._setup(o),!o.partial&&e.useData&&(s=u(t,s));var a=void 0,l=e.useBlockParams?[]:void 0;return e.useDepths&&(a=o.depths?t!==o.depths[0]?[t].concat(o.depths):o.depths:[t]),(i=p(e.main,i,r,o.depths||[],s,l))(t,o)}if(!t)throw new v["default"]("No environment passed to template");if(!e||!e.main)throw new v["default"]("Unknown template object: "+typeof e);e.main.decorator=e.main_d,t.VM.checkRevision(e.compiler);var r={strict:function(e,t){if(!(t in e))throw new v["default"]('"'+t+'" not defined in '+e);return e[t]},lookup:function(e,t){for(var i=e.length,n=0;i>n;n++)if(e[n]&&null!=e[n][t])return e[n][t]},lambda:function(e,t){return"function"==typeof e?e.call(t):e},escapeExpression:d.escapeExpression,invokePartial:i,fn:function(t){var i=e[t];return i.decorator=e[t+"_d"],i},programs:[],program:function(e,t,i,n,r){var o=this.programs[e],s=this.fn(e);return t||r||n||i?o=a(this,e,s,t,i,n,r):o||(o=this.programs[e]=a(this,e,s)),o},data:function(e,t){for(;e&&t--;)e=e._parent;return e},merge:function(e,t){var i=e||t;return e&&t&&e!==t&&(i=d.extend({},t,e)),i},noop:t.VM.noop,compilerInfo:e.compiler};return n.isTop=!0,n._setup=function(i){i.partial?(r.helpers=i.helpers,r.partials=i.partials,r.decorators=i.decorators):(r.helpers=r.merge(i.helpers,t.helpers),e.usePartial&&(r.partials=r.merge(i.partials,t.partials)),(e.usePartial||e.useDecorators)&&(r.decorators=r.merge(i.decorators,t.decorators)))},n._child=function(t,i,n,o){if(e.useBlockParams&&!n)throw new v["default"]("must pass block params");if(e.useDepths&&!o)throw new v["default"]("must pass parent depths");return a(r,t,e[t],i,0,n,o)},n}function a(e,t,i,n,r,o,s){function a(t){var r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],a=s;return s&&t!==s[0]&&(a=[t].concat(s)),i(e,t,e.helpers,e.partials,r.data||n,o&&[r.blockParams].concat(o),a)}return a=p(i,a,e,s,n,o),a.program=t,a.depth=s?s.length:0,a.blockParams=r||0,a}function l(e,t,i){return e?e.call||i.name||(i.name=e,e=i.partials[e]):e="@partial-block"===i.name?i.data["partial-block"]:i.partials[i.name],e}function c(e,t,i){i.partial=!0,i.ids&&(i.data.contextPath=i.ids[0]||i.data.contextPath);var n=void 0;if(i.fn&&i.fn!==h&&(i.data=g.createFrame(i.data),n=i.data["partial-block"]=i.fn,n.partials&&(i.partials=d.extend({},i.partials,n.partials))),void 0===e&&n&&(e=n),void 0===e)throw new v["default"]("The partial "+i.name+" could not be found");return e instanceof Function?e(t,i):void 0}function h(){return""}function u(e,t){return t&&"root"in t||(t=t?g.createFrame(t):{},t.root=e),t}function p(e,t,i,n,r,o){if(e.decorator){var s={};t=e.decorator(t,s,i,n&&n[0],r,o,n),d.extend(t,s)}return t}t.__esModule=!0,t.checkRevision=o,t.template=s,t.wrapProgram=a,t.resolvePartial=l,t.invokePartial=c,t.noop=h;var f=i(10),d=r(f),m=i(11),v=n(m),g=i(9)},function(e,t){(function(i){"use strict";t.__esModule=!0,t["default"]=function(e){var t="undefined"!=typeof i?i:window,n=t.Handlebars;e.noConflict=function(){return t.Handlebars===e&&(t.Handlebars=n),e}},e.exports=t["default"]}).call(t,function(){return this}())},function(e,t,i){var n=i(7);e.exports=(n["default"]||n).template({1:function(e,t,i,n,r){var o,s=null!=t?t:{},a=i.helperMissing,l="function",c=e.escapeExpression;return'  <li class="wheel-item" data-val="'+c((o=null!=(o=i.value||(null!=t?t.value:t))?o:a,typeof o===l?o.call(s,{name:"value",hash:{},data:r}):o))+'">'+c((o=null!=(o=i.text||(null!=t?t.text:t))?o:a,typeof o===l?o.call(s,{name:"text",hash:{},data:r}):o))+"</li>\n"},compiler:[7,">= 4.0.0"],main:function(e,t,i,n,r){var o;return null!=(o=i.each.call(null!=t?t:{},t,{name:"each",hash:{},fn:e.program(1,r,0),inverse:e.noop,data:r}))?o:""},useData:!0})},function(e,t,i){var n=i(28);"string"==typeof n&&(n=[[e.id,n,""]]);i(30)(n,{});n.locals&&(e.exports=n.locals)},function(e,t,i){t=e.exports=i(29)(),t.push([e.id,".picker{display:none;position:fixed;top:0;z-index:100;width:100%;height:100%;overflow:hidden;text-align:center;font-family:PingFang SC,STHeitiSC-Light,Helvetica-Light,arial,sans-serif;font-size:14px;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none}.picker .picker-mask{position:absolute;z-index:500;width:100%;height:100%;transition:all .5s;-webkit-transition:all .5s;background:transparent;opacity:0}.picker .picker-mask.show{background:rgba(0,0,0,.6);opacity:1}.picker .picker-panel{position:absolute;z-index:600;bottom:0;width:100%;height:243px;background:#fff;transform:translateY(243px);-webkit-transform:translateY(243px);transition:all .5s;-webkit-transition:all .5s}.picker .picker-panel.show{transform:translateY(0);-webkit-transform:translateY(0)}.picker .picker-panel .picker-choose{position:relative;height:50px;color:#878787;font-size:14px}.picker .picker-panel .picker-choose .picker-title{line-height:50px;font-size:19px;text-align:center;color:#333}.picker .picker-panel .picker-choose .cancel,.picker .picker-panel .picker-choose .confirm{position:absolute;padding:10px;top:6px}.picker .picker-panel .picker-choose .confirm{right:0;color:#fa8919}.picker .picker-panel .picker-choose .cancel{left:0}.picker .picker-panel .picker-content{position:relative}.picker .picker-panel .picker-content .mask-bottom,.picker .picker-panel .picker-content .mask-top{position:absolute;z-index:10;width:100%;height:68px;pointer-events:none;transform:translateZ(0);-webkit-transform:translateZ(0)}.picker .picker-panel .picker-content .mask-top{top:0;background:-webkit-gradient(linear,left bottom,left top,from(hsla(0,0%,100%,.4)),to(hsla(0,0%,100%,.8)));background:-o-linear-gradient(bottom,hsla(0,0%,100%,.4),hsla(0,0%,100%,.8))}.picker .picker-panel .picker-content .mask-top:after,.picker .picker-panel .picker-content .mask-top:before{display:block;position:absolute;border-top:1px solid #ccc;left:0;width:100%;content:' '}.picker .picker-panel .picker-content .mask-top:before{display:none;top:0}.picker .picker-panel .picker-content .mask-top:after{display:block;bottom:0}.picker .picker-panel .picker-content .mask-bottom{bottom:0;background:-webkit-gradient(linear,left top,left bottom,from(hsla(0,0%,100%,.4)),to(hsla(0,0%,100%,.8)));background:-o-linear-gradient(top,hsla(0,0%,100%,.4),hsla(0,0%,100%,.8))}.picker .picker-panel .picker-content .mask-bottom:after,.picker .picker-panel .picker-content .mask-bottom:before{display:block;position:absolute;border-top:1px solid #ccc;left:0;width:100%;content:' '}.picker .picker-panel .picker-content .mask-bottom:before{display:block;top:0}.picker .picker-panel .picker-content .mask-bottom:after{display:none;bottom:0}.picker .picker-panel .wheel-wrapper{display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:flex;padding:0 10px}.picker .picker-panel .wheel-wrapper .wheel{-ms-flex:1 1 1e-9px;-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-flex-basis:1e-9px;flex-basis:1e-9px;width:1%;height:173px;overflow:hidden;font-size:21px}.picker .picker-panel .wheel-wrapper .wheel .wheel-scroll{margin-top:68px;line-height:36px}.picker .picker-panel .wheel-wrapper .wheel .wheel-scroll .wheel-item{height:36px;overflow:hidden;white-space:nowrap;color:#333}.picker .picker-footer{height:20px}@media (-webkit-min-device-pixel-ratio:1.5),(min-device-pixel-ratio:1.5){.border-1px:after,.border-1px:before{-webkit-transform:scaleY(.7);-webkit-transform-origin:0 0;transform:scaleY(.7)}.border-1px:after{-webkit-transform-origin:left bottom}}@media (-webkit-min-device-pixel-ratio:2),(min-device-pixel-ratio:2){.border-1px:after,.border-1px:before{-webkit-transform:scaleY(.5);transform:scaleY(.5)}}",""])},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var i=this[t];i[2]?e.push("@media "+i[2]+"{"+i[1]+"}"):e.push(i[1])}return e.join("")},e.i=function(t,i){"string"==typeof t&&(t=[[null,t,""]]);for(var n={},r=0;r<this.length;r++){var o=this[r][0];"number"==typeof o&&(n[o]=!0)}for(r=0;r<t.length;r++){var s=t[r];"number"==typeof s[0]&&n[s[0]]||(i&&!s[2]?s[2]=i:i&&(s[2]="("+s[2]+") and ("+i+")"),e.push(s))}},e}},function(e,t,i){function n(e,t){for(var i=0;i<e.length;i++){var n=e[i],r=f[n.id];if(r){r.refs++;for(var o=0;o<r.parts.length;o++)r.parts[o](n.parts[o]);for(;o<n.parts.length;o++)r.parts.push(c(n.parts[o],t))}else{for(var s=[],o=0;o<n.parts.length;o++)s.push(c(n.parts[o],t));f[n.id]={id:n.id,refs:1,parts:s}}}}function r(e){for(var t=[],i={},n=0;n<e.length;n++){var r=e[n],o=r[0],s=r[1],a=r[2],l=r[3],c={css:s,media:a,sourceMap:l};i[o]?i[o].parts.push(c):t.push(i[o]={id:o,parts:[c]})}return t}function o(e,t){var i=v(),n=b[b.length-1];if("top"===e.insertAt)n?n.nextSibling?i.insertBefore(t,n.nextSibling):i.appendChild(t):i.insertBefore(t,i.firstChild),b.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");i.appendChild(t)}}function s(e){e.parentNode.removeChild(e);var t=b.indexOf(e);t>=0&&b.splice(t,1)}function a(e){var t=document.createElement("style");return t.type="text/css",o(e,t),t}function l(e){var t=document.createElement("link");return t.rel="stylesheet",o(e,t),t}function c(e,t){var i,n,r;if(t.singleton){var o=y++;i=g||(g=a(t)),n=h.bind(null,i,o,!1),r=h.bind(null,i,o,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(i=l(t),n=p.bind(null,i),r=function(){s(i),i.href&&URL.revokeObjectURL(i.href)}):(i=a(t),n=u.bind(null,i),r=function(){s(i)});return n(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;n(e=t)}else r()}}function h(e,t,i,n){var r=i?"":n.css;if(e.styleSheet)e.styleSheet.cssText=w(t,r);else{var o=document.createTextNode(r),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(o,s[t]):e.appendChild(o)}}function u(e,t){var i=t.css,n=t.media;t.sourceMap;if(n&&e.setAttribute("media",n),e.styleSheet)e.styleSheet.cssText=i;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(i))}}function p(e,t){var i=t.css,n=(t.media,t.sourceMap);n&&(i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(n))))+" */");var r=new Blob([i],{type:"text/css"}),o=e.href;e.href=URL.createObjectURL(r),o&&URL.revokeObjectURL(o)}var f={},d=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},m=d(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),v=d(function(){return document.head||document.getElementsByTagName("head")[0]}),g=null,y=0,b=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=m()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var i=r(e);return n(i,t),function(e){for(var o=[],s=0;s<i.length;s++){var a=i[s],l=f[a.id];l.refs--,o.push(l)}if(e){var c=r(e);n(c,t)}for(var s=0;s<o.length;s++){var l=o[s];if(0===l.refs){for(var h=0;h<l.parts.length;h++)l.parts[h]();delete f[l.id]}}}};var w=function(){var e=[];return function(t,i){return e[t]=i,e.filter(Boolean).join("\n")}}()}])});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _index = __webpack_require__(9);
	
	var _aController = __webpack_require__(15);
	
	//import {controllerB} from 'modules/pageB/b-controller';
	//import {controllerC} from 'modules/pageC/controller'
	
	var Router = new _index.Route();
	//model只涉及到数据模型,而controller即要和model同时还要和view进行交互.因此这里应该是引入controller
	
	
	var viewA = __webpack_require__(17);
	var viewB = __webpack_require__(18);
	var viewC = __webpack_require__(19);
	
	//require.ensure([], function() {}, str)  
	//这里接收的第三个参数用以将异步加载的模块都打包成一个文件.不同于entry和CommonChunkPlugin的作用
	Router.addRoute({
	    path: 'aaa',
	    viewInit: function viewInit() {
	        //modelA.pageInit();
	        var page = document.querySelector('#container');
	        //if (!controller.getInitedStatus) {
	        page.innerHTML = viewA;
	        _aController.controller.init();
	        //}
	    },
	
	    viewDestory: _aController.controller.viewDestory
	});
	
	Router.addRoute({
	    path: 'aaa.1',
	    viewInit: function viewInit() {
	        __webpack_require__.e/* nsure */(2, function () {
	            var controller = __webpack_require__(24);
	            var page = document.querySelector('#container');
	
	            page.innerHTML = __webpack_require__(26);
	            controller.init();
	        });
	    }
	});
	
	Router.addRoute({
	    path: 'bbb',
	    viewInit: function viewInit() {
	        //modelB.pageInit();
	        //require.ensure([], function() {
	        var controllerB = __webpack_require__(20);
	        var page = document.querySelector('#container');
	
	        //require('components/index');
	        page.innerHTML = viewB;
	        controllerB.init();
	        //});
	    }
	})
	
	/*Router.addRoute('aaa', function () {
	    //modelA.pageInit();
	    let page = document.querySelector('#container');
	    //if (!controller.getInitedStatus) {
	        page.innerHTML = viewA;
	        controller.init();
	    //}
	},{cache: 'on'}, controller.viewDestory, viewA);*/
	
	/*Router.addRoute('aaa.1', function() {
	    require.ensure([], function() {
	        let controller = require('modules/pageA/a-1/controller');
	        let page = document.querySelector('#container');
	
	        page.innerHTML = require('modules/pageA/a-1/index.html');
	        controller.init();
	    }, 'page-a')
	})*/;
	
	/*Router.addRoute('bbb', () => {
	    //modelB.pageInit();
	    //require.ensure([], function() {
	        let controllerB = require('modules/pageB/b-controller');
	        let page = document.querySelector('#container');
	
	        //require('components/index');
	        page.innerHTML = viewB;
	        controllerB.init();
	    //});
	},{cache: 'on'});*/
	
	Router.addRoute({
	    path: 'ccc',
	    viewInit: function viewInit() {
	        __webpack_require__.e/* nsure */(3, function () {
	            var controllerC = __webpack_require__(27);
	            var page = document.querySelector('#container');
	            page.innerHTML = viewC;
	            controllerC.init();
	        });
	    }
	});
	
	/*Router.addRoute('ccc', () => {
	    require.ensure([], function() {
	        let controllerC = require('modules/pageC/controller');
	        let page = document.querySelector('#container');
	        page.innerHTML = viewC;
	        controllerC.init();
	    }, 'page-c')
	});*/
	
	Router.addRoute({
	    path: 'ccc.1',
	    viewInit: function viewInit() {
	        var page = document.querySelector('.c-container');
	        page.innerHTML = __webpack_require__(22);
	        console.log('This\'s pagec-1');
	    }
	});
	
	/*
	Router.addRoute('ccc.1', () => {
	    let page = document.querySelector('.c-container');
	    page.innerHTML = require('modules/pageC/c-1/index.html');
	    console.log('This\'s pagec-1');
	});*/
	
	Router.addRoute({
	    path: 'ccc.2',
	    viewInit: function viewInit() {
	        var page = document.querySelector('.c-container');
	        page.innerHTML = __webpack_require__(23);
	        console.log('This\'s pagec-2');
	    }
	});
	
	/*Router.addRoute('ccc.2', () => {
	    let page = document.querySelector('.c-container');
	    page.innerHTML = require('modules/pageC/c-2/index.html');
	    console.log('This\'s pagec-2');
	});*/
	
	Router.addRoute({
	    path: 'password',
	    viewInit: function viewInit() {
	        __webpack_require__.e/* nsure */(4, function () {
	            var controller = __webpack_require__(29);
	            var page = document.querySelector('#container');
	            page.innerHTML = __webpack_require__(31);
	            controller.init();
	        });
	    }
	});
	
	/*Router.addRoute('password', () => {
	    require.ensure([], function() {
	        let controller = require('modules/password/controller');
	        let page = document.querySelector('#container');
	        page.innerHTML = require('modules/password/index.html');
	        controller.init();
	    }, 'password')
	})*/
	
	Router.bootstrap();
	
	exports.default = Router;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Route = exports.totalModel = exports.Controller = undefined;
	
	var _controller = __webpack_require__(10);
	
	var _model = __webpack_require__(11);
	
	var _xRoute = __webpack_require__(14);
	
	var _xRoute2 = _interopRequireDefault(_xRoute);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Controller = _controller.Controller;
	exports.totalModel = _model.totalModel;
	exports.Route = _xRoute2.default;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Controller = exports.Controller = function () {
	    function Controller(name, containerName, model) {
	        _classCallCheck(this, Controller);
	
	        this.name = name;
	        this.containerName = containerName || '';
	        this.containerBox = null;
	        this.domMap = {};
	        this.domMapCache = {};
	        this.eventCache = {};
	        this.model = model || {};
	        this.viewInit = null || function () {};
	        this.viewDestory = null || function () {};
	
	        this.inited = false;
	    }
	    //init函数
	
	
	    _createClass(Controller, [{
	        key: 'init',
	        value: function init() {
	            //console.log(this);
	            this.containerBox = document.querySelector(this.containerName);
	            this.setDomMap();
	            this.bindEvents();
	            this.model.pageInit();
	            this.viewInit();
	
	            this.inited = true;
	
	            return this;
	        }
	    }, {
	        key: 'setModelCache',
	        value: function setModelCache() {
	            var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	            this.model = obj;
	            return this;
	        }
	    }, {
	        key: 'getDomMap',
	        value: function getDomMap() {
	            var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	            this.domMapCache = obj;
	            return this;
	        }
	        //dom缓存
	
	    }, {
	        key: 'setDomMap',
	        value: function setDomMap() {
	            var obj = this.domMapCache;
	            for (var key in obj) {
	                this.domMap[key] = this.containerBox.querySelector(obj[key]);
	            }
	            return this;
	        }
	    }, {
	        key: 'getBindEvents',
	        value: function getBindEvents() {
	            var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	            this.eventCache = obj;
	            return this;
	        }
	        //事件绑定
	
	    }, {
	        key: 'bindEvents',
	        value: function bindEvents() {
	            var obj = this.eventCache;
	            for (var key in obj) {
	                var item = obj[key];
	                this.domMap[key].addEventListener(item.actionName, item.action.bind(this.domMap[key]));
	            }
	            return this;
	        }
	    }, {
	        key: 'unbindEvent',
	        value: function unbindEvent() {}
	
	        //钩子: 页面初始化(willAppear阶段)
	
	    }, {
	        key: 'getViewInit',
	        value: function getViewInit(fn) {
	            this.viewInit = fn.bind(this) || function () {};
	            return this;
	        }
	
	        //钩子: 页面销毁阶段(willDisappear阶段)
	
	    }, {
	        key: 'getViewDestory',
	        value: function getViewDestory(fn) {
	            this.viewDestory = fn.bind(this) || function () {};
	            return this;
	        }
	
	        //获取controller的初始化状态
	
	    }, {
	        key: 'getInitedStatus',
	        get: function get() {
	            return this.inited;
	        }
	    }]);

	    return Controller;
	}();

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.totalModel = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	__webpack_require__(12);
	
	var _controller = __webpack_require__(10);
	
	var _eventEmitter = __webpack_require__(13);
	
	var _eventEmitter2 = _interopRequireDefault(_eventEmitter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Model = Object.create(_eventEmitter2.default);
	
	//Model用以创建新模型,新模型用以创建实例
	Model = {
	    records: {},
	    //model创建后的回调
	    created: function created() {
	        this.records = {}; //创建新的model后,清空records,避免records被其他的model共享而发生副作用
	    },
	    extend: function extend() {
	        var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	        var extended = obj.extended;
	        for (var key in obj) {
	            this[key] = obj[key];
	        }
	        if (extended) extended.call(this);
	    },
	    include: function include() {
	        var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	        var included = obj.included;
	        for (var key in obj) {
	            this.prototype[key] = obj[key];
	        }
	        if (included) included.call(this);
	    },
	
	    prototype: {
	        init: function init() {}
	    },
	    create: function create() {
	        var object = Object.create(this); //新模型继承至Model,调用init方法产生新实例
	        object.parent = this; //新模型.parent = Model
	
	        object.prototype = object.fn = Object.create(this.prototype);
	
	        object.created();
	
	        return object;
	    },
	    init: function init() {
	        var instance = Object.create(this.prototype);
	        instance.parent = this; //实例.parent = 新模型
	        instance.init.apply(instance, arguments); //Model.prototype.init();
	        return instance;
	    }
	};
	
	//ajax  实例继承
	Model.include({
	    post: function post() {
	        var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	        var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	        return new Promise(function (resolve, reject) {
	            fetch(url, {
	                method: 'POST',
	                headers: {
	                    'Accept': 'application/json',
	                    'Content-Type': 'application/json'
	                },
	                body: JSON.stringify(obj)
	            }).then(function (data) {
	                return resolve(data.json());
	            });
	            /*.then((data) => {
	                //添加正确处理和错误处理的函数 reject
	                resolve(data.json());
	            })*/
	        });
	    },
	    get: function get() {
	        var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	        return new Promise(function (resolve, reject) {
	            fetch(url).then(function (data) {
	                return resolve(data.json());
	            });
	            /*fetch(url)
	                .then((data) => {
	                    //正确处理的方式
	                    resolve(data.json());
	                })*/
	        });
	    }
	});
	
	//hash值
	Model.include({
	    getHash: function getHash() {
	        return window.location.hash.slice(2);
	    }
	});
	
	//页面初始化model数据
	Model.include({
	    pageInit: function pageInit() {}
	});
	
	//Model对象记录
	Model.include({
	    newRecord: true,
	    create: function create() {
	        this.newRecord = false;
	        //新模型.records[this.name] = this;
	        this.parent.records[this.name] = this.dup();
	    },
	    destory: function destory() {
	        delete this.parent.records[this.name];
	    },
	    update: function update() {
	        this.parent.records[this.name] = this.dup();
	    },
	    dup: function dup() {
	        return Object.assign({}, this);
	    },
	    save: function save() {
	        this.newRecord ? this.create() : this.update();
	    }
	});
	
	Model.extend({
	    find: function find() {
	        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	        return this.records[name] || console.log('Unkonwn record');
	    }
	});
	
	//localstorage操作
	Model.include({
	    setLocItem: function setLocItem() {
	        var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	        var value = arguments[1];
	
	        var itemValue = void 0,
	            type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	        if (type === 'string' || type === 'number') {
	            itemValue = value;
	        } else if (Object.prototype.toString.call(value) === '[object Object]') {
	            itemValue = JSON.stringify(value);
	        } else {
	            itemValue = undefined;
	        }
	        localStorage.setItem(key, itemValue);
	    },
	    getLocItem: function getLocItem() {
	        var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	        return localStorage.getItem(key);
	    },
	    removeLocItem: function removeLocItem() {
	        var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	        return localStorage.removeItem(key);
	    }
	});
	
	//controller在Model上进行注册
	Model.include({
	    controllers: {},
	    //这里的controller不能使用容器的选择器确定
	    registerController: function registerController(name, containerName) {
	        return this.controllers[name] || (this.controllers[name] = new _controller.Controller(name, containerName, this));
	    }
	});
	
	var totalModel = Model.create();
	
	exports.totalModel = totalModel;

/***/ },
/* 12 */
/***/ function(module, exports) {

	(function(self) {
	  'use strict';
	
	  if (self.fetch) {
	    return
	  }
	
	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob()
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }
	
	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }
	
	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }
	
	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function() {
	        var value = items.shift()
	        return {done: value === undefined, value: value}
	      }
	    }
	
	    if (support.iterable) {
	      iterator[Symbol.iterator] = function() {
	        return iterator
	      }
	    }
	
	    return iterator
	  }
	
	  function Headers(headers) {
	    this.map = {}
	
	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)
	
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }
	
	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }
	
	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }
	
	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }
	
	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }
	
	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }
	
	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }
	
	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
	  }
	
	  Headers.prototype.keys = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push(name) })
	    return iteratorFor(items)
	  }
	
	  Headers.prototype.values = function() {
	    var items = []
	    this.forEach(function(value) { items.push(value) })
	    return iteratorFor(items)
	  }
	
	  Headers.prototype.entries = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push([name, value]) })
	    return iteratorFor(items)
	  }
	
	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
	  }
	
	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }
	
	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }
	
	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    reader.readAsArrayBuffer(blob)
	    return fileReaderReady(reader)
	  }
	
	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    reader.readAsText(blob)
	    return fileReaderReady(reader)
	  }
	
	  function Body() {
	    this.bodyUsed = false
	
	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString()
	      } else if (!body) {
	        this._bodyText = ''
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }
	
	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8')
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type)
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
	        }
	      }
	    }
	
	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }
	
	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }
	
	      this.arrayBuffer = function() {
	        return this.blob().then(readBlobAsArrayBuffer)
	      }
	
	      this.text = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }
	
	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text')
	        } else {
	          return Promise.resolve(this._bodyText)
	        }
	      }
	    } else {
	      this.text = function() {
	        var rejected = consumed(this)
	        return rejected ? rejected : Promise.resolve(this._bodyText)
	      }
	    }
	
	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }
	
	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }
	
	    return this
	  }
	
	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']
	
	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }
	
	  function Request(input, options) {
	    options = options || {}
	    var body = options.body
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = input
	    }
	
	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null
	
	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }
	
	  Request.prototype.clone = function() {
	    return new Request(this)
	  }
	
	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }
	
	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }
	
	  Body.call(Request.prototype)
	
	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }
	
	    this.type = 'default'
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
	    this.url = options.url || ''
	    this._initBody(bodyInit)
	  }
	
	  Body.call(Response.prototype)
	
	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }
	
	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }
	
	  var redirectStatuses = [301, 302, 303, 307, 308]
	
	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }
	
	    return new Response(null, {status: status, headers: {location: url}})
	  }
	
	  self.Headers = Headers
	  self.Request = Request
	  self.Response = Response
	
	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input
	      } else {
	        request = new Request(input, init)
	      }
	
	      var xhr = new XMLHttpRequest()
	
	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL
	        }
	
	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL')
	        }
	
	        return
	      }
	
	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
	        var body = 'response' in xhr ? xhr.response : xhr.responseText
	        resolve(new Response(body, options))
	      }
	
	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }
	
	      xhr.ontimeout = function() {
	        reject(new TypeError('Network request failed'))
	      }
	
	      xhr.open(request.method, request.url, true)
	
	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }
	
	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }
	
	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })
	
	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})(typeof self !== 'undefined' ? self : this);


/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EventEmitter = function () {
	    function EventEmitter() {
	        _classCallCheck(this, EventEmitter);
	
	        this.cache = [];
	    }
	
	    _createClass(EventEmitter, [{
	        key: "listen",
	        value: function listen(type, fn) {
	            var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;
	
	            !this.cache[type] && (this.cache[type] = []);
	            this.cache[type].push(fn);
	        }
	    }, {
	        key: "trigger",
	        value: function trigger() {
	            var type = [].shift.call(arguments),
	                fns = this.cache[type];
	
	            if (!fns || fns.length === 0) return false;
	
	            for (var i = 0, fn; fn = fns[i++];) {
	                fn[i].apply(this, [].slice.call(arguments, 1));
	            }
	        }
	
	        //fn参数不传时,默认清除所有绑定事件
	
	    }, {
	        key: "remove",
	        value: function remove(type, fn) {
	            var fns = this.cache[type];
	
	            if (!fns) return false;
	
	            if (!fn) {
	                fns && (fns.length = 0);
	            } else {
	                for (var i = 0, _fn; _f = fns[i++];) {
	                    if (_fn === fn) {
	                        fns.splice(i, 1);
	                    }
	                }
	            }
	        }
	    }]);
	
	    return EventEmitter;
	}();
	
	exports.default = EventEmitter;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(3);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Route = function () {
	    function Route() {
	        _classCallCheck(this, Route);
	
	        this.routes = [];
	        this.useHash = false;
	        this.pageCache = {}; //在内存中进行缓存
	    }
	
	    _createClass(Route, [{
	        key: 'addRoute',
	        value: function addRoute(_ref) {
	            var path = _ref.path;
	            var viewInit = _ref.viewInit;
	            var viewDestory = _ref.viewDestory;
	            var context = _ref.context;
	
	            path = path.split('.').join('/');
	
	            this.routes.push({
	                path: path,
	                viewInit: viewInit,
	                viewDestory: viewDestory,
	                context: context
	            });
	        }
	    }, {
	        key: 'handleRoute',
	        value: function handleRoute() {
	            var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	            var isFromHistory = arguments[1];
	
	            var curContext = void 0,
	                //上下文
	            oldPath = location.hash.slice(2);
	
	            //页面销毁
	            this.routes.forEach(function (route, index) {
	                if (route.path === oldPath) {
	                    route.viewDestory && route.viewDestory();
	                }
	            });
	
	            for (var i = 0, routeItem; routeItem = this.routes[i++];) {
	                if (routeItem.path === path) {
	                    //如果是嵌套内的路由被匹配,那么还应该还调用外层的路由回调
	                    curContext = routeItem.context ? routeItem.context : window;
	
	                    routeItem.viewInit.apply(curContext, [path]);
	
	                    if (!this.useHash) {
	                        //如果是从popstate中获取的状态,那么不应该将其加入历史状态栈中
	                        if (!isFromHistory) {
	                            history.pushState({ path: path }, null, '#/' + path);
	                        }
	                    } else {
	                        location.hash = '/' + path;
	                    }
	
	                    //激活状路由样式处理
	                    this.routeClassHandle(path);
	
	                    return true;
	                }
	            }
	            return false;
	        }
	    }, {
	        key: 'routeClassHandle',
	        value: function routeClassHandle(hash) {
	            hash = hash.split('/').join('-');
	            if (hash) {
	                document.querySelector('.route-active') && document.querySelector('.route-active').classList.remove('route-active');
	                document.querySelector('[data-href=' + hash + ']') && document.querySelector('[data-href=' + hash + ']').classList.add('route-active');
	            }
	        }
	    }, {
	        key: 'go',
	        value: function go(path) {
	            path = path.split('.').join('/');
	            this.handleRoute(path);
	        }
	    }, {
	        key: 'back',
	        value: function back() {}
	    }, {
	        key: 'bootstrap',
	        value: function bootstrap() {
	            var _this = this;
	
	            if (!history.pushState) this.useHash = true;
	
	            if (!this.useHash) {
	                window.addEventListener('popstate', function (e) {
	                    var state = e.state;
	
	                    if (state && state.path) _this.handleRoute(state.path, true);
	
	                    //TODO 添加对于state为空的情况的处理
	                });
	            } else {
	                window.addEventListener('hashchange', function (e) {
	                    _this.handleRoute(location.hash.slice(2));
	                });
	            }
	
	            document.addEventListener('click', function (e) {
	                var href = e.target.dataset.href || '',
	                    oldHash = location.hash.slice(2);
	
	                //将data-href数据形式转化为路由形式
	                href = href.split('-').join('/'); //将data-href='ccc-aaa' --->>> 转化为 ccc/aaa  外部写法可能存在出入,但是在内部统一转化为a/b/c/d的形式
	
	                if (href) {
	                    //添加钩子 路由进行跳转时模型model上数据的处理
	                    if (href === oldHash) return;
	
	                    if (_this.handleRoute(href)) {
	                        //阻止默认事件
	                        e.preventDefault();
	                    }
	                }
	            });
	
	            document.addEventListener('DOMContentLoaded', function (e) {
	                var router = _this.routes[0],
	                    currHash = location.hash.slice(2),
	                    flag = false;
	
	                var lastArr = currHash.split('/')[0];
	
	                //TODO 代码比较龊,可以优化的地方还很多
	                _this.routes.forEach(function (item, index) {
	                    if (item.path === lastArr) {
	                        flag = true;
	                        return item.viewInit.call(item.context || window);
	                    }
	                });
	
	                if (lastArr !== currHash) {
	                    _this.routes.forEach(function (item, index) {
	                        if (item.path === currHash) {
	                            return item.viewInit.call(item.context || window);
	                        }
	                    });
	                }
	
	                //初始化active.route样式处理
	                _this.routeClassHandle(currHash);
	
	                if (!flag) {
	                    router.viewInit.call(router.context || window);
	
	                    if (!_this.useHash) {
	                        history.pushState({ path: router.path }, null, '#/' + router.path);
	                    } else {
	                        location.hash = '/' + router.path;
	                    }
	                }
	
	                //!flag ? router.viewInit.call(router.context || window) : '';
	            });
	        }
	    }]);
	
	    return Route;
	}();
	
	exports.default = Route;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.controller = undefined;
	
	var _aModel = __webpack_require__(16);
	
	var _aModel2 = _interopRequireDefault(_aModel);
	
	var _util = __webpack_require__(3);
	
	var _index = __webpack_require__(9);
	
	var _route = __webpack_require__(8);
	
	var _route2 = _interopRequireDefault(_route);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*import {timeSelectComponent, cityComponent, dd} from 'components/index';*/
	/*import {canvasResize} from 'jsLib/imgResize';*/
	
	var controller = _aModel2.default.registerController('controlA', '#container');
	
	controller.getDomMap({
		phoneEle: '#phone',
		registerBtnEle: '.btn'
	}).getBindEvents({
		phoneEle: {
			actionName: 'blur',
			action: function action() {
				console.log(this.value);
			}
		},
		registerBtnEle: {
			actionName: 'click',
			action: function action() {
				console.log('btn');
				_route2.default.go('aaa.1');
			}
		}
	}).getViewInit(function () {
		document.title = '注册';
	});
	
	/*controller
		.getDomMap({
			aContainer: '.a-container',
			myName: '.myName',
			myPhone: '.myPhone'
		})
		.getBindEvents({
			aContainer: {
				actionName: 'click',
				action() {
					elementSet.css(this, { color: 'red' });
				}
			},
			myName: {
				actionName: 'input',
				action(e) {
					console.log(this.value);
				}
			},
			myPhone: {
				actionName: 'input',
				action(e) {
					console.log(this.value);
				}
			}
		})*/
	//页面状态初始化.从localstorage中获取
	/*	.getViewInit(function () {
			let doms = this.domMap;
			doms.myName.value = modelA.submitData.name;
	
			let timeSelect = new timeSelectComponent();
	
			var nameEl = document.getElementById('name');
	
			timeSelect.configModule({
				startYearArr: [1972],
				containerArr: ['#name', '#name-test'],
				callbackArr: [function (time) {
					console.log(time);
				}]
			});
			//timeSelect.initTimeModule();
			timeSelect.initAlphaModule();
	
			let json = require('../../components/city-select/city-json'),
				_cityComponent = new cityComponent();
	
	
	
			_cityComponent.configModule({
				allCities: json.data,
				succCb(data) {
					console.log(data);
				},
				failCb() {
					console.log('请选择城市');
				}
			});
	
	
			let cityWrapper = document.querySelector('.city-wrapper'),
				clickBtn = document.querySelector('.btn'),
				dialogBtn = document.querySelector('.alert-btn');
	
			let dialog = dd.dialog || {};
	
			_cityComponent.initModule(cityWrapper);
	
			//城市组件
			clickBtn.addEventListener('click', function () {
				util.addClass(cityWrapper, 'city-box-show');
			});
	
			//弹窗组件
			dialogBtn.addEventListener('click', function() {
				dialog.alert('It\'s a good job');
			});
	
			let imgContainer = document.getElementById('file');
			imgContainer.addEventListener('change', function (e) {
				let file = this.files[0];
				if (!file) return;
	
				//图片压缩
				canvasResize(file, {
					crop: false,
					quality: 0.1,
					rotate: 0,
					callback(baseStr) {
						let img = new Image();
						img.src = baseStr;
						document.body.appendChild(img);
					}
				})
			});
		})
		.getViewDestory(function() {
			//console.log('PageA is leaving now');
			//console.log(modelA.submitData);
			let pickerEl = document.querySelector('.picker');
			document.body.removeChild(pickerEl);
		});*/
	
	exports.controller = controller;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _model = __webpack_require__(11);
	
	var modelA = _model.totalModel.init();
	
	modelA.name = 'modelA';
	modelA.setLocItem(modelA.name, 'HELLO WORLD');
	modelA.submitData = {
	    name: '',
	    phone: null,
	    sex: ''
	};
	//数据模型初始化
	modelA.pageInit = function () {
	    this.submitData.name = modelA.getLocItem(this.name);
	};
	modelA.save();
	
	//console.log(totalModel);
	console.log(modelA.pageInit.valueOf());
	
	exports.default = modelA;

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = "<!--<div>This is pageA</div>\n\n<div class=\"a-container\" style=\"margin-top: 50px; height: 40px;line-height: 40px;\">\n    姓名: <input type=\"text\" class=\"myName\">\n    电话: <input type=\"number\" class=\"myPhone\">\n</div>\n\n\n<button id=\"name\">name</button>\n<button id=\"name-test\">name test</button>\n<button id=\"age\">点我</button>\n\n\n\n<div class=\"btn\" style=\"margin-top: 50px;\">\n    点击显示城市选择\n</div>\n\n\n<input type=\"file\" id=\"file\" style=\"margin-top: 20px;\"/>\n\n\n<div class=\"alert-btn\" style=\"margin-top: 30px;\">弹窗实验</div>\n\n\n\n<div class=\"city-wrapper\">\n</div>-->\n\n\n<input type=\"number\" maxlength=\"11\" placeholder=\"请输入手机号\" id=\"phone\">\n\n<a  class=\"btn btn-orange\">\n    获取验证码\n</a>\n\n"

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "<div>This is b.html</div>\n\n<button id=\"btn\">\n    点击我吧\n</button>"

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = "<ul table class=\"pagec-route\">\n    <li table=\"cell v-m h-c\">\n        <a data-href=\"ccc-1\">c-route-1</a>\n    </li>\n    <li table=\"cell v-m h-c\">\n        <a data-href=\"ccc-2\">c-route-2</a>\n    </li>\n</ul>\n\n<button id=\"btnc\">\n    按钮C\n</button>\n\n\n<div class=\"c-container\">\n\n</div>"

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _index = __webpack_require__(9);
	
	var _bModel = __webpack_require__(21);
	
	var _bModel2 = _interopRequireDefault(_bModel);
	
	var _index2 = __webpack_require__(1);
	
	var _util = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var controllerB = _bModel2.default.registerController('controlB', '#container');
	
	controllerB.getDomMap({
	    clickBtn: '#btn'
	}).getBindEvents({
	    clickBtn: {
	        actionName: 'click',
	        action: function action() {
	            console.log('Well done');
	        }
	    }
	}).getViewInit(function () {
	    //console.log(123);
	});
	
	/*export {
	    controllerB
	}*/
	
	module.exports = controllerB;
	
	//controllerB.init();

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _model = __webpack_require__(11);
	
	var modelB = _model.totalModel.init();
	modelB.name = 'modelB';
	modelB.pageInit = function () {
	    //console.log('This\'s is page B');
	};
	modelB.save();
	
	//console.log(modelB.pageInit.valueOf());
	
	//console.log(totalModel.find('modelA'), totalModel.find('modelB'));
	
	
	exports.default = modelB;

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = "<p>This is c-1 index.html</p>"

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = ""

/***/ },
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 37 */,
/* 38 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 39 */,
/* 40 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 41 */,
/* 42 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 43 */,
/* 44 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
]);
//# sourceMappingURL=index.js.map