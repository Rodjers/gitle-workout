"use strict";!function(a){function b(a,b){a=new Date(a||new Date),a=new Date(a.getFullYear(),a.getMonth(),a.getDate(),a.getHours());for(var c=[],d=a.getTime()+36e5;a.getTime()<d;)c.push(a),a=new Date(a.getTime()+1e3*60*b);return c}function c(a){a=new Date(a||new Date),a.setDate(1),a.setHours(0),a.setMinutes(0),a.setSeconds(0),a.setMilliseconds(0),0===a.getDay()?a.setDate(-5):a.setDate(a.getDate()-(a.getDay()-1)),1===a.getDate()&&a.setDate(-6);for(var b=[];b.length<6;){for(var c=[],d=0;7>d;d++)c.push(new Date(a)),a.setDate(a.getDate()+1);b.push(c)}return b}function d(a){var b=[];a=new Date(a||new Date),a.setFullYear(a.getFullYear()-a.getFullYear()%10);for(var c=0;12>c;c++)b.push(new Date(a.getFullYear()+(c-1),0,1));return b}function e(a){a=new Date(a||new Date),a=new Date(a.getFullYear(),a.getMonth(),a.getDate()),a.setDate(a.getDate()-(a.getDay()-1));for(var b=[],c=0;7>c;c++)b.push(new Date(a)),a.setDate(a.getDate()+1);return b}function f(a){a=new Date(a||new Date);for(var b=a.getFullYear(),c=[],d=0;12>d;d++)c.push(new Date(b,d,1));return c}function g(a){a=new Date(a||new Date),a.setHours(0),a.setMinutes(0),a.setSeconds(0),a.setMilliseconds(0);for(var b=[],c=0;24>c;c++)b.push(a),a=new Date(a.getTime()+36e5);return b}var h=a.module("datePicker",[]);h.constant("datePickerConfig",{template:"templates/datepicker.html",view:"month",views:["year","month","date","hours","minutes"],step:5}),h.directive("datePicker",["datePickerConfig",function(a){return{template:'<div ng-include="template"></div>',scope:{model:"=datePicker",after:"=?",before:"=?"},link:function(h,i,j){function k(){var a=h.view,i=h.date;switch(a){case"year":h.years=d(i);break;case"month":h.months=f(i);break;case"date":h.weekdays=h.weekdays||e(),h.weeks=c(i);break;case"hours":h.hours=g(i);break;case"minutes":h.minutes=b(i,m)}}function l(){return"date"!==h.view?h.view:h.model?h.model.getMonth():null}h.date=new Date(h.model||new Date),h.views=a.views.concat(),h.view=j.view||a.view,h.now=new Date,h.template=j.template||a.template;var m=parseInt(j.step||a.step,10);h.views=h.views.slice(h.views.indexOf(j.maxView||"year"),h.views.indexOf(j.minView||"minutes")+1),(1===h.views.length||-1===h.views.indexOf(h.view))&&(h.view=h.views[0]),h.setView=function(a){-1!==h.views.indexOf(a)&&(h.view=a)},h.setDate=function(a){h.date=a;var b=h.views[h.views.indexOf(h.view)+1];if(!b||h.model){switch(h.model=new Date(h.model||a),h.view){case"minutes":h.model.setMinutes(a.getMinutes());case"hours":h.model.setHours(a.getHours());case"date":h.model.setDate(a.getDate());case"month":h.model.setMonth(a.getMonth());case"year":h.model.setFullYear(a.getFullYear())}h.$emit("setDate",h.model,h.view)}b&&h.setView(b)},h.$watch(l,k),h.next=function(a){var b=h.date;switch(a=a||1,h.view){case"year":case"month":b.setFullYear(b.getFullYear()+a);break;case"date":b.setMonth(b.getMonth()+a);break;case"hours":case"minutes":b.setHours(b.getHours()+a)}k()},h.prev=function(a){return h.next(-a||-1)},h.isAfter=function(a){return h.after?h.after.getTime()<=a.getTime():!1},h.isBefore=function(a){return h.before?h.before.getTime()>=a.getTime():!1},h.isSameMonth=function(a){return h.isSameYear(a)&&h.model.getMonth()===a.getMonth()},h.isSameYear=function(a){return h.model?h.model.getFullYear()===a.getFullYear():!1},h.isSameDay=function(a){return h.isSameMonth(a)&&h.model.getDate()===a.getDate()},h.isSameHour=function(a){return h.isSameDay(a)&&h.model.getHours()===a.getHours()},h.isSameMinutes=function(a){return h.isSameHour(a)&&h.model.getMinutes()===a.getMinutes()},h.isNow=function(a){var b=!0,c=h.now;switch(h.view){case"minutes":b&=~~(a.getMinutes()/m)===~~(c.getMinutes()/m);case"hours":b&=a.getHours()===c.getHours();case"date":b&=a.getDate()===c.getDate();case"month":b&=a.getMonth()===c.getMonth();case"year":b&=a.getFullYear()===c.getFullYear()}return b}}}}]);var h=a.module("datePicker");h.directive("dateRange",function(){return{templateUrl:"templates/daterange.html",scope:{start:"=",end:"="},link:function(a){a.$watch("start.getTime()",function(b){b&&a.end&&b>a.end.getTime()&&(a.end=new Date(b))}),a.$watch("end.getTime()",function(b){b&&a.start&&b<a.start.getTime()&&(a.start=new Date(b))})}}});var i="ng-pristine",j="ng-dirty",h=a.module("datePicker");h.constant("dateTimeConfig",{template:function(a){return'<div date-picker="'+a.ngModel+'" '+(a.view?'view="'+a.view+'" ':"")+(a.maxView?'max-view="'+a.maxView+'" ':"")+(a.template?'template="'+a.template+'" ':"")+(a.minView?'min-view="'+a.minView+'" ':"")+'class="dropdown-menu"></div>'},format:"yyyy-MM-dd HH:mm",views:["date","year","month","hours","minutes"],dismiss:!1,position:"relative"}),h.directive("dateTimeAppend",function(){return{link:function(a,b){b.bind("click",function(){b.find("input")[0].focus()})}}}),h.directive("dateTime",["$compile","$document","$filter","dateTimeConfig","$parse",function(b,c,d,e,f){var g=c.find("body"),h=d("date");return{require:"ngModel",scope:!0,link:function(c,d,k,l){function m(a){return h(a,r)}function n(){return l.$modelValue}function o(a){a.stopPropagation(),l.$pristine&&(l.$dirty=!0,l.$pristine=!1,d.removeClass(i).addClass(j),s&&s.$setDirty(),l.$render())}function p(){x&&(x.remove(),x=null),z&&(z.remove(),z=null)}function q(){if(!x){if(x=b(A)(c),c.$digest(),c.$on("setDate",function(a,b,c){o(a),w&&t[t.length-1]===c&&p()}),c.$on("$destroy",p),"absolute"===y){var e=a.extend(d.offset(),{height:d[0].offsetHeight});x.css({top:e.top+e.height,left:e.left,display:"block",position:y}),g.append(x)}else z=a.element("<div date-picker-wrapper></div>"),d[0].parentElement.insertBefore(z[0],d[0]),z.append(x),x.css({top:d[0].offsetHeight+"px",display:"block"});x.bind("mousedown",function(a){a.preventDefault()})}}var r=k.format||e.format,s=d.inheritedData("$formController"),t=f(k.views)(c)||e.views.concat(),u=k.view||t[0],v=t.indexOf(u),w=k.dismiss?f(k.dismiss)(c):e.dismiss,x=null,y=k.position||e.position,z=null;-1===v&&t.splice(v,1),t.unshift(u),l.$formatters.push(m),l.$parsers.unshift(n);var A=e.template(k);d.bind("focus",q),d.bind("blur",p)}}}]),a.module("datePicker").run(["$templateCache",function(a){a.put("templates/datepicker.html",'<div ng-switch="view">\n  <div ng-switch-when="date">\n    <table>\n      <thead>\n      <tr>\n        <th ng-click="prev()">‹</th>\n        <th colspan="5" class="switch" ng-click="setView(\'month\')">{{date|date:"yyyy MMMM"}}</th>\n        <th ng-click="next()">›</i></th>\n      </tr>\n      <tr>\n        <th ng-repeat="day in weekdays" style="overflow: hidden">{{ day|date:"EEE" }}</th>\n      </tr>\n      </thead>\n      <tbody>\n      <tr ng-repeat="week in weeks">\n        <td ng-repeat="day in week">\n          <span\n            ng-class="{\'now\':isNow(day),\'active\':isSameDay(day),\'disabled\':(day.getMonth()!=date.getMonth()),\'after\':isAfter(day),\'before\':isBefore(day)}"\n            ng-click="setDate(day)" ng-bind="day.getDate()"></span>\n        </td>\n      </tr>\n      </tbody>\n    </table>\n  </div>\n  <div ng-switch-when="year">\n    <table>\n      <thead>\n      <tr>\n        <th ng-click="prev(10)">‹</th>\n        <th colspan="5" class="switch">{{years[0].getFullYear()}}-{{years[years.length-1].getFullYear()}}</th>\n        <th ng-click="next(10)">›</i></th>\n      </tr>\n      </thead>\n      <tbody>\n      <tr>\n        <td colspan="7">\n                    <span ng-class="{\'active\':isSameYear(year),\'now\':isNow(year)}"\n                          ng-repeat="year in years"\n                          ng-click="setDate(year)" ng-bind="year.getFullYear()"></span>\n\n\n        </td>\n      </tr>\n      </tbody>\n    </table>\n  </div>\n  <div ng-switch-when="month">\n    <table>\n      <thead>\n      <tr>\n        <th ng-click="prev()">‹</th>\n        <th colspan="5" class="switch" ng-click="setView(\'year\')">{{ date|date:"yyyy" }}</th>\n        <th ng-click="next()">›</i></th>\n      </tr>\n      </thead>\n      <tbody>\n      <tr>\n        <td colspan="7">\n                <span ng-repeat="month in months"\n                      ng-class="{\'active\':isSameMonth(month),\'after\':isAfter(month),\'before\':isBefore(month),\'now\':isNow(month)}"\n                      ng-click="setDate(month)">{{month|date:\'MMM\'}}</span>\n\n        </td>\n      </tr>\n      </tbody>\n    </table>\n  </div>\n  <div ng-switch-when="hours">\n    <table>\n      <thead>\n      <tr>\n        <th ng-click="prev(24)">‹</th>\n        <th colspan="5" class="switch" ng-click="setView(\'date\')">{{ date|date:"dd MMMM yyyy" }}</th>\n        <th ng-click="next(24)">›</i></th>\n      </tr>\n      </thead>\n      <tbody>\n      <tr>\n        <td colspan="7">\n                <span ng-repeat="hour in hours"\n                      ng-class="{\'now\':isNow(hour),\'active\':isSameHour(hour)}"\n                      ng-click="setDate(hour)" ng-bind="hour.getHours()+\':00\'"></span>\n        </td>\n      </tr>\n      </tbody>\n    </table>\n  </div>\n  <div ng-switch-when="minutes">\n    <table>\n      <thead>\n      <tr>\n        <th ng-click="prev()">‹</th>\n        <th colspan="5" class="switch" ng-click="setView(\'hours\')">{{ date|date:"dd MMMM yyyy" }}\n        </th>\n        <th ng-click="next()">›</i></th>\n      </tr>\n      </thead>\n      <tbody>\n      <tr>\n        <td colspan="7">\n                    <span ng-repeat="minute in minutes"\n                          ng-class="{active:isSameMinutes(minute),\'now\':isNow(minute)}"\n                          ng-click="setDate(minute)">{{minute|date:"HH:mm"}}</span>\n        </td>\n      </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n'),a.put("templates/daterange.html",'<div>\n    <table>\n        <tr>\n            <td valign="top">\n                <div date-picker="start" class="date-picker" date after="start" before="end" min-view="date" max-view="date"></div>\n            </td>\n            <td valign="top">\n                <div date-picker="end" class="date-picker" date after="start" before="end"  min-view="date" max-view="date"></div>\n            </td>\n        </tr>\n    </table>\n</div>\n')}])}(angular);