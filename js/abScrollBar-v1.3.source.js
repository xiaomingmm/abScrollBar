/*!
 * abScrollBar v1.3 滚动条模拟插件
 * 更多详尽信息请看官网( http://ab.geshai.com/other-plus/abScrollBar )
 *
 * 有疑难问题可选择QQ群① 158544200 或QQ群② 790370978 进行反馈
 *
 * Copyright 2010-2022, Carlo,Cloud
 *
 * 请尊重原创，保留头部版权
 * 在保留版权的前提下可应用于个人或商业用途
 *
 */
;function abScrollBar(_opts) {
	/* fn */
	var __fns__ = {
		/* extend */
		"extend": function(__a, __b) {
			for(var __k in __b){
				__a[__k] = __b[__k];
			}
			return __a;
		},

		/* px */
		"px": function (__v) {
			return (__v.toString() + "px");
		},

		/* Is empty */
		"isEmpty": function (__v) {
			return (null == __v || "undefined" == typeof(__v) || "" == __v);
		},

		/* To bool */
		"toBool":function(__v) {
			return (__v === true);
		},

		/* To float */
		"toFloat": function (__v) {
			return parseFloat(__v);
		},

		/* Is init */
		"isInit": function () {
			return ("true" == _content.attr(_opts._iname));
		},

		/* Rand string */
		"randStr": function () {
			var __randData = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
			var __id = 0, __strArr = [];

			for(var __i = 0; __i < 10; __i++) {
				__id = Math.max(Math.ceil(Math.random() * 26), 1);
				__strArr.push(__randData[__id - 1]);
			}

			return __strArr.join("");
		},

		/* Is x */
		"isX": function () {
			return ("x" == _opts.scrollType.toString().toLowerCase());
		},

		/* arrow button class name */
		"btnClass": function (__name) {
			return "ab-scroll-bar-arrow-$1".replace("$1", _buttonClass[__name]);
		},

		/* Scroll do */
		"scrollDo": function () {
			var __isOver = false,
				__attr = "top";

			if(_scrollMove <= 0){
				_scrollMove = 0;
				__isOver = true;
			}

			if (__fns__.isX()) {
				__attr = "left";

				if(_scrollMove >= _barAllowWidth){
					_scrollMove = _barAllowWidth;
					__isOver = true;
				}
			} else {
				if(_scrollMove >= _barAllowHeight){
					_scrollMove = _barAllowHeight;
					__isOver = true;
				}
			}

			_bar.css(__attr, this.px(_scrollMove));
			_content.css(__attr, this.px(-(_scrollMove * _contentScrollStep)));
			return __isOver;
		},

		/* Bar button event */
		"barPnEvent": function () {
			var __timerID = null;
			var __timerMS = 100;
			var __clearTimerId = function () {
				clearInterval(__timerID);
			};

			_barPrev.mousedown(function () {
				__clearTimerId();
				_scrollMove -= _contentScrollStep;
				__fns__.scrollDo();

				__timerID = setInterval(function () {
					_scrollMove -= _contentScrollStep;
					__fns__.scrollDo();
				}, __timerMS);
			});

			_barPrev.mouseup(function () {
				__clearTimerId();
			});

			_barNext.mousedown(function () {
				__clearTimerId();
				_scrollMove += _contentScrollStep;
				__fns__.scrollDo();

				__timerID = setInterval(function () {
					_scrollMove += _contentScrollStep;
					__fns__.scrollDo();
				}, __timerMS);
			});

			_barNext.mouseup(function () {
				__clearTimerId();
			});
		},

		/* Bar event */
		"barEvent": function () {
			var __clickIsBar = false;

			// bar wrap
			_barWrap.click(function (__e) {
				_moveStatus = false;
				__e = (__e || window.event);
				__e.pageX = (__e.pageX || (__e.clientX + $(window).scrollLeft()));
				__e.pageY = (__e.pageY || (__e.clientY + $(window).scrollTop()));

				/* 阻止冒泡 */
				if (__e.preventDefault) { __e.preventDefault(); }
				if (__e.stopPropagation) { __e.stopPropagation(); }
				__e.cancelBubble = false;
				__e.returnValue = false;

				if (__clickIsBar) {
					return false;
				}

				if (__fns__.isX()) {
					_scrollMove = (__e.pageX - _barWrap.offset().left);
					_scrollMove -= (__e.pageX >= (_bar.offset().left + _bar.outerWidth()) ? _bar.outerWidth() : 0);
				} else {
					_scrollMove =  (__e.pageY - _barWrap.offset().top);
					_scrollMove -= (__e.pageY >= (_bar.offset().top + _bar.outerHeight()) ? _bar.outerHeight() : 0);
				}

				// scroll
				__fns__.scrollDo();
				return false;
			});

			// bar
			_bar.mousedown(function(__e) {
				_moveStatus = true;
				__clickIsBar = true;
				__e = (__e || window.event);
				__e.pageX = (__e.pageX || (__e.clientX + $(window).scrollLeft()));
				__e.pageY = (__e.pageY || (__e.clientY + $(window).scrollTop()));

				/* 阻止冒泡 */
				if (__e.preventDefault) { __e.preventDefault(); }
				if (__e.stopPropagation) { __e.stopPropagation(); }
				__e.cancelBubble = false;
				__e.returnValue = false;

				/* 计算鼠标在滑动条上的位置 */
				if (__fns__.isX()) {
					_mousePos = (__e.pageX - _bar.offset().left);
				} else {
					_mousePos = (__e.pageY - _bar.offset().top);
				}

				/* 移动事件 */
				document.onmousemove = function(__e2) {
					/* 停止移动状态 */
					if (!_moveStatus) { return true; }
					__e2 = (__e2 || window.event);
					__e2.pageX = (__e2.pageX || (__e2.clientX + $(window).scrollLeft()));
					__e2.pageY = (__e2.pageY || (__e2.clientY + $(window).scrollTop()));

					/* 阻止冒泡 */
					if (__e2.preventDefault) { __e2.preventDefault(); }
					if (__e2.stopPropagation) { __e2.stopPropagation(); }
					__e2.cancelBubble = false;
					__e2.returnValue = false;

					/* 移动运动 */
					if (__fns__.isX()) {
						_scrollMove = (__e2.pageX - _barWrap.offset().left) - _mousePos;
					} else {
						_scrollMove = (__e2.pageY - _barWrap.offset().top) - _mousePos;
					}

					// scroll
					__fns__.scrollDo();
					return false;
				};
				document.onmouseup = function() {
					_moveStatus = false;
					__clickIsBar = false;

					document.onselectstart = function() { return true; };

					if (_isMouseleave) {
						_barBox.stop(true, true).fadeOut(_speed);
					}
				};
				document.onselectstart = function() { return false; };
				return false;
			}).mouseup(function(__e) {
				__clickIsBar = true;
				__e = (__e || window.event);

				/* 阻止冒泡 */
				if (__e.preventDefault) { __e.preventDefault(); }
				if (__e.stopPropagation) { __e.stopPropagation(); }
				__e.cancelBubble = false;
				__e.returnValue = false;

				return false;
			});

			// button
			if (_isButton) {
				this.barPnEvent();
			}
		},

		/* Mousewheel event */
		"mousewheel": function () {
			var __mwEvent = ((/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll": "mousewheel");

			/* 滚动处理 */
			var __mousewheelFunc = function(__e){
				__e = (__e || window.event);
				var __d = (__e.detail ? (-__e.detail / 3): (__e.wheelDelta / 120));

				/* 滚动 */
				_scrollMove += (__d > 0 ? -_mousewheelStep : _mousewheelStep);
				var __isOver = __fns__.scrollDo();

				// 阻止滚动事件冒泡传播
				if (!_propagation && __isOver) {
					return true;
				}

				if (__e.preventDefault) { __e.preventDefault(); }
				if (__e.stopPropagation) { __e.stopPropagation(); }
				__e.cancelBubble = false;
				__e.returnValue = false;
			};

			/* 滚动事件添加 */
			var __mousewheelAddEvent = function(__o){
				if(__o.attachEvent) {
					__o.attachEvent("on" + __mwEvent, __mousewheelFunc);
				}else if(__o.addEventListener) {
					__o.addEventListener(__mwEvent, __mousewheelFunc, false);
				}
			};

			__mousewheelAddEvent(_contentBox[0]);
			__mousewheelAddEvent(_barWrap[0]);
		},

		/* Mouseleave hide bar */
		"hideBar": function () {
			if(!_isHideBar){
				return false;
			}

			/* mouseenter */
			_contentBox.bind("mouseenter", function(){
				clearTimeout(_mouseleave_timeID);
				_isMouseleave = false;
				_barBox.stop(true, true).fadeIn(_speed);
			});

			/* mouseleave */
			_contentBox.bind("mouseleave", function(){
				_mouseleave_timeID = setTimeout(function(){
					_isMouseleave = true;
					if(!_moveStatus){ _barBox.stop(true, true).fadeOut(_speed); }
				}, _mouseleaveTime);
			});
		},

		/* Compute */
		"computeContentWH": function () {
			var __cla = __fns__.randStr();
			var __wh = [0, 0, "10000%"];

			// inner
			_content.wrapInner("<div class=\"" + __cla + "\"></div>");
			// obj
			var __obj = $("." + __cla, _content);

			// x | y
			if (__fns__.isX()) {
				// each
				__obj.css("width", __wh[2]).children().each(function (__index, __el) {
					__wh[0] += $(__el).outerWidth(true) + 1;
				});

				_content.width(__fns__.px(__wh[0]));
			} else {
				// each
				__obj.css("height", __wh[2]).children().each(function (__index, __el) {
					__wh[1] += $(__el).outerHeight(true) + 1;
				});

				_content.height(__fns__.px(__wh[1]));
			}

			// unwrap
			__obj.contents().unwrap();
		},

		/* initialization */
		"init": function () {
			var __contentBox_ID = __fns__.randStr();
			var __barBox_ID = "$1-bar".replace("$1", __contentBox_ID);
			var __barWrap_ID = "$1-wrap".replace("$1", __contentBox_ID);

			var __barPrev_ID = "$1-prev".replace("$1", __contentBox_ID),
				__barNext_ID = "$1-next".replace("$1", __contentBox_ID),
				__barBtnStyle = "",
				__barPrevHtml = "",
				__barNextHtml = "";

			// Bar style
			var __barStyle = ["", "", "background:#fafafa;", "background:#ccc;"];
			if (!__fns__.isEmpty(_barBgClass)) {
				__barStyle[0] = _barBgClass;
				__barStyle[2] = "";
			}
			if (!__fns__.isEmpty(_barClass)) {
				__barStyle[1] = _barClass;
				__barStyle[3] = "";
			}

			/* 按钮 */
			if (_isButton) {
				__barBtnStyle = "position:absolute;line-height:100%;text-align:center;font-size:12px;color:#666666;overflow:hidden;display:block;";
				__barPrevHtml = "<a href=\"JavaScript:void(0);\" id=\"$1\" style=\"$2\"><span class=\"$3\"></span></a>"
					.replace("$1", __barPrev_ID)
					.replace("$2", __barBtnStyle)
					.replace("$3", this.isX() ? this.btnClass("left") : this.btnClass("up"));

				__barNextHtml = "<a href=\"JavaScript:void(0);\" id=\"$1\" style=\"$2\"><span class=\"$3\"></span></a>"
					.replace("$1", __barNext_ID)
					.replace("$2", __barBtnStyle)
					.replace("$3", this.isX() ? this.btnClass("right") : this.btnClass("down"));
			}

			/* 创建容器元素 */
			_content.wrap("<div id=\"" + __contentBox_ID + "\" style=\"position:relative;margin:0px;padding:0px;overflow:hidden;\"></div>");

			/* 容器盒子对象 */
			_contentBox = $("#" + __contentBox_ID).css({"width": __fns__.px(_width), "height": __fns__.px(_height)});

			/* 创建滚动条元素 */
			_contentBox.append("<div id=\"" + __barBox_ID + "\" class=\"" + __barStyle[0] + "\" style=\"position:absolute;z-index:2;overflow:hidden;display:none;" + __barStyle[2] + "\">" + __barPrevHtml + "<div id=\"" + __barWrap_ID + "\" style=\"position:absolute;left:0px;top:0px;height:100%;\"><a href=\"JavaScript:void(0);\" class=\"" + __barStyle[1] + "\" style=\"position:relative;left:0px;top:0px;width:100%;height:100%;overflow:hidden;border-radius:5px;outline:none;display:block;" + __barStyle[3] + "\"></a></div>" + __barNextHtml + "</div>");

			/* 滚动条盒子对象 */
			_barBox = $("#" + __barBox_ID);
			_barWrap = $("#" + __barWrap_ID);

			// button
			if (_isButton) {
				_barPrev = $("#" + __barPrev_ID);
				_barNext = $("#" + __barNext_ID);
			}

			/* x | y */
			if (__fns__.isX()) {
				_barBox.css({
					"left": __fns__.px(0),
					"bottom": __fns__.px(0),
					"width": __fns__.px(_width),
					"height": __fns__.px(_optBarHeight)
				});

				// button
				if (_isButton) {
					_width -= _optBarHeight * 2;
					_barWrap.css({
						"left": __fns__.px(_optBarHeight),
						"width": __fns__.px(_width),
						"height": __fns__.px(_optBarHeight)
					});

					_barPrev.css({
						"top": __fns__.px(0),
						"left": __fns__.px(0),
						"width": __fns__.px(_optBarHeight),
						"height": __fns__.px(_optBarHeight)
					});
					_barNext.css({
						"top": __fns__.px(0),
						"right": __fns__.px(0),
						"width": __fns__.px(_optBarHeight),
						"height": __fns__.px(_optBarHeight)
					});
				} else {
					_barWrap.css({
						"left": __fns__.px(0),
						"width": __fns__.px(_width),
						"height": __fns__.px(_optBarHeight)
					});
				}
			} else {
				_barBox.css({
					"top": __fns__.px(0),
					"right": __fns__.px(0),
					"width": __fns__.px(_optBarWidth),
					"height": __fns__.px(_height)
				});

				// button
				if (_isButton) {
					_height -= _optBarWidth * 2;
					_barWrap.css({
						"top": __fns__.px(_optBarWidth),
						"width": __fns__.px(_optBarWidth),
						"height": __fns__.px(_height)
					});

					_barPrev.css({
						"left": __fns__.px(0),
						"top": __fns__.px(0),
						"width": __fns__.px(_optBarWidth),
						"height": __fns__.px(_optBarWidth)
					});
					_barNext.css({
						"right": __fns__.px(0),
						"bottom": __fns__.px(0),
						"width": __fns__.px(_optBarWidth),
						"height": __fns__.px(_optBarWidth)
					});
				} else {
					_barWrap.css({
						"top": __fns__.px(0),
						"width": __fns__.px(_optBarWidth),
						"height": __fns__.px(_height)
					});
				}
			}

			/* 滚动条对象 */
			_bar = _barWrap.children().first();
			_content.css({"position": "absolute", "left": __fns__.px(0), "top": __fns__.px(0)});
		}
	};

	/* options */
	_opts = __fns__.extend({
		"scrollType": "y", /* 滚动方向: x=水平, y=垂直 */
		"contentEl": "", /* 滚动内容元素(如: .demo 或 #demo) */
		"barClass": "", /* 滚动条样式 */
		"barBgClass": "", /* 滚动条背景样式 */
		"barWidth": 6, /* 滚动条宽(当scrollType=y时, 生效) */
		"barHeight": 6, /* 滚动条高(当scrollType=x时, 生效) */
		"width": 300, /* 滚动可视区宽 */
		"height": 300, /* 滚动可视区高 */
		"mousewheelStep": 30, /* 滚动步长(建议设置30) */
		"speed": 350, /* 滚动条过去效果(毫秒) */
		"isHideBar": false, /* 是否隐藏滚动条(离开内容可视区) */
		"isButton": false, /* 是否启用滚动条按钮(默认=false) */
		"propagation": true, /* 阻止滚动事件冒泡传播(默认=true) */
		"buttonClass": {}, /* 箭头样式表 */

		"_version": 1.2,
		"_innerClass": "ab-scroll-wrap-inner",
		"_iname": "ab-scroll-init",
		"_ivalue": "yes",
		"_c": {
			"left": "left", /* x(箭头向左) */
			"right": "right" /* x(箭头向右) */,
			"up": "up", /* y(箭头向上) */
			"down": "down" /* y(箭头向下) */
		}
	}, _opts);

	/* 内容元素对象 */
	var _content = $(_opts.contentEl);
	// 元素是否存在或已初始化
	if(0 == _content.length || __fns__.isInit()) {
		return false;
	}
	/* 初始化标记 */
	_content.attr(_opts._iname, _opts._ivalue);

	/* 计算容器尺寸 */
	__fns__.computeContentWH();

	/* 定义变量 */
	var _contentBox, _barBox, _barWrap, _bar, _barPrev, _barNext;

	/* 设置变量参数 */
	var _moveStatus = false;
	var _isMouseleave = false;
	var _scrollMove = 0;
	var _mousePos = 0;

	var _buttonClass = __fns__.extend(_opts._c, _opts.buttonClass);
	var _barClass = _opts.barClass;
	var _barBgClass = _opts.barBgClass;
	var _optBarHeight = __fns__.toFloat(_opts.barHeight);
	var _optBarWidth = __fns__.toFloat(_opts.barWidth);
	var _width = __fns__.toFloat(_opts.width);
	var _height = __fns__.toFloat(_opts.height);
	var _speed = _opts.speed;
	var _isHideBar = __fns__.toBool(_opts.isHideBar);
	var _isButton = __fns__.toBool(_opts.isButton);
	var _propagation = __fns__.toBool(_opts.propagation);
	var _mousewheelStep = _opts.mousewheelStep;
	var _mouseleaveTime = 50;
	var _mouseleave_timeID;

	/* bar w|h */
	var _barHeight = _optBarHeight,
		_barWidth = _optBarWidth;

	/* 内容宽高度 */
	var _contentWidth = _content.outerWidth(),
		_contentHeight = _content.outerHeight();

	/* 初始化 */
	__fns__.init();

	/* 容器距 xy 部位置 */
	var _contentBoxLeft = _contentBox.offset().left,
		_contentBoxTop = _contentBox.offset().top;

	/* 内容超出的宽高 */
	var _contentOverWidth = (_contentWidth - _width),
		_contentOverHeight = (_contentHeight - _height);

	/* 滚动条需要的宽 */
	_barWidth = (_width / _contentWidth);
	/* 滚动条需要的高 */
	_barHeight = (_height / _contentHeight);

	/* 允许滚动的宽高 */
	var _barAllowWidth = (_width - (_barWidth * _width)),
		_barAllowHeight = (_height - (_barHeight * _height));

	/* 内容需要滚动的步伐 */
	var _contentScrollStep = 0;
	if (__fns__.isX()) {
		_contentScrollStep = (_contentOverWidth / _barAllowWidth);
		/* 设置滚动条宽 */
		_bar.width((_barWidth * 100) + "%");
		/* 获取滚动条宽度 */
		_barWidth = _bar.height();
	} else {
		_contentScrollStep = (_contentOverHeight / _barAllowHeight);
		/* 设置滚动条高 */
		_bar.height((_barHeight * 100) + "%");
		/* 获取滚动条高度 */
		_barHeight = _bar.height();
	}

	/* 内容超出区域创建滚动条 */
	if (__fns__.isX()) {
		if(_contentOverWidth > 0) {
			if(!_isHideBar){
				_barBox.stop(true, true).fadeIn(_speed);
			}
		}
	} else {
		if(_contentOverHeight > 0) {
			if(!_isHideBar){
				_barBox.stop(true, true).fadeIn(_speed);
			}
		}
	}

	/* Bind event */
	__fns__.barEvent();
	__fns__.mousewheel();
	__fns__.hideBar();
};