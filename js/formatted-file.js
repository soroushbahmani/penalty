/**
 * @param {number} params
 * @param {number} name
 * @param {?} walkers
 * @param {number} dataAndEvents
 * @return {?}
 */
function CGfxButton(params, name, walkers, dataAndEvents) {
    var data;
    var results;
    var target;
    var o;
    var scaleX;
    var scaleY;
    var pulseAnimation;
    var h;
    var p;
    /** @type {boolean} */
    var _ = false;
    return this._init = function(protoProps, keepData, obj) {
      /** @type {Array} */
      data = new Array;
      /** @type {Array} */
      results = new Array;
      /** @type {Array} */
      o = new Array;
      target = createBitmap(obj);
      /** @type {number} */
      target.x = protoProps;
      /** @type {number} */
      target.y = keepData;
      /** @type {number} */
      scaleX = 1;
      /** @type {number} */
      scaleY = 1;
      /** @type {number} */
      target.regX = obj.width / 2;
      /** @type {number} */
      target.regY = obj.height / 2;
      if (!s_bMobile) {
        /** @type {string} */
        target.cursor = "pointer";
      }
      p.addChild(target);
      this._initListener();
    }, this.unload = function() {
      target.off("mousedown", this.buttonDown);
      target.off("pressup", this.buttonRelease);
      p.removeChild(target);
    }, this.setVisible = function(recurring) {
      /** @type {boolean} */
      target.visible = recurring;
    }, this.setCursorType = function(value) {
      /** @type {string} */
      target.cursor = value;
    }, this._initListener = function() {
      target.on("mousedown", this.buttonDown);
      target.on("pressup", this.buttonRelease);
    }, this.addEventListener = function(type, listener, mayParseLabeledStatementInstead) {
      /** @type {Function} */
      data[type] = listener;
      /** @type {boolean} */
      results[type] = mayParseLabeledStatementInstead;
    }, this.addEventListenerWithParams = function(i, element, result, e) {
      data[i] = element;
      results[i] = result;
      o[i] = e;
    }, this.buttonRelease = function() {
      if (!_) {
        if (scaleX > 0) {
          /** @type {number} */
          target.scaleX = 1;
        } else {
          /** @type {number} */
          target.scaleX = -1;
        }
        /** @type {number} */
        target.scaleY = 1;
        playSound("click", 1, 0);
        if (data[ON_MOUSE_UP]) {
          data[ON_MOUSE_UP].call(results[ON_MOUSE_UP], o[ON_MOUSE_UP]);
        }
      }
    }, this.buttonDown = function() {
      if (!_) {
        if (scaleX > 0) {
          /** @type {number} */
          target.scaleX = 0.9;
        } else {
          /** @type {number} */
          target.scaleX = -0.9;
        }
        /** @type {number} */
        target.scaleY = 0.9;
        if (data[ON_MOUSE_DOWN]) {
          data[ON_MOUSE_DOWN].call(results[ON_MOUSE_DOWN], o[ON_MOUSE_DOWN]);
        }
      }
    }, this.rotation = function(value) {
      /** @type {number} */
      target.rotation = value;
    }, this.getButton = function() {
      return target;
    }, this.setPosition = function(x, y) {
      /** @type {number} */
      target.x = x;
      target.y = y;
    }, this.setX = function(x) {
      /** @type {number} */
      target.x = x;
    }, this.setY = function(y) {
      target.y = y;
    }, this.getButtonImage = function() {
      return target;
    }, this.block = function(dataAndEvents) {
      /** @type {boolean} */
      _ = dataAndEvents;
      target.scaleX = scaleX;
      target.scaleY = scaleY;
    }, this.setScaleX = function(value) {
      /** @type {number} */
      target.scaleX = value;
      /** @type {number} */
      scaleX = value;
    }, this.getX = function() {
      return target.x;
    }, this.getY = function() {
      return target.y;
    }, this.pulseAnimation = function() {
      h = createjs.Tween.get(target).to({
        scaleX : 0.9 * scaleX,
        scaleY : 0.9 * scaleY
      }, 850, createjs.Ease.quadOut).to({
        scaleX : scaleX,
        scaleY : scaleY
      }, 650, createjs.Ease.quadIn).call(function() {
        pulseAnimation.pulseAnimation();
      });
    }, this.trebleAnimation = function() {
      h = createjs.Tween.get(target).to({
        rotation : 5
      }, 75, createjs.Ease.quadOut).to({
        rotation : -5
      }, 140, createjs.Ease.quadIn).to({
        rotation : 0
      }, 75, createjs.Ease.quadIn).wait(750).call(function() {
        pulseAnimation.trebleAnimation();
      });
    }, this.removeAllTweens = function() {
      createjs.Tween.removeTweens(target);
    }, p = void 0 !== dataAndEvents ? dataAndEvents : s_oStage, this._init(params, name, walkers), pulseAnimation = this, this;
  }
  /**
   * @param {Object} options
   * @return {undefined}
   */
  function TimeSeries(options) {
    options = options || {};
    options.resetBoundsInterval = options.resetBoundsInterval || 3E3;
    options.resetBounds = void 0 === options.resetBounds ? true : options.resetBounds;
    /** @type {Object} */
    this.options = options;
    /** @type {Array} */
    this.data = [];
    this.label = options.label || "";
    this.maxDataLength = options.maxDataLength || 1E3;
    /** @type {Array} */
    this.dataPool = [];
    /** @type {number} */
    this.maxValue = Number.NaN;
    /** @type {number} */
    this.minValue = Number.NaN;
    if (options.resetBounds) {
      /** @type {number} */
      this.boundsTimer = setInterval(function(dataAndEvents) {
        return function() {
          dataAndEvents.resetBounds();
        };
      }(this), options.resetBoundsInterval);
    }
  }
  /**
   * @param {Object} options
   * @return {undefined}
   */
  function SmoothieChart(options) {
    options = options || {};
    options.grid = options.grid || {
      fillStyle : "#000000",
      strokeStyle : "#777777",
      lineWidth : 1,
      millisPerLine : 1E3,
      verticalSections : 2
    };
    options.millisPerPixel = options.millisPerPixel || 20;
    options.fps = options.fps || 50;
    options.maxValueScale = options.maxValueScale || 1;
    options.minValue = options.minValue;
    options.maxValue = options.maxValue;
    options.labels = options.labels || {
      fillStyle : "#ffffff"
    };
    options.interpolation = options.interpolation || "bezier";
    options.scaleSmoothing = options.scaleSmoothing || 0.125;
    options.maxDataSetLength = options.maxDataSetLength || 2;
    options.timestampFormatter = options.timestampFormatter || null;
    /** @type {Object} */
    this.options = options;
    /** @type {Array} */
    this.seriesSet = [];
    /** @type {number} */
    this.currentValueRange = 1;
    /** @type {number} */
    this.currentVisMinValue = 0;
  }
  /**
   * @param {?} m3
   * @return {?}
   */
  function CLaunchBoard(m3) {
    var box;
    var data;
    var p;
    var o;
    var m;
    var $cont;
    var c = m3;
    return this._init = function() {
      box = {
        x : CANVAS_WIDTH_HALF + 660,
        y : CANVAS_HEIGHT - 60
      };
      m = new createjs.Container;
      m.x = box.x;
      /** @type {number} */
      m.y = box.y;
      c.addChild(m);
      data = new createjs.Text("99" + TEXT_OF + NUM_OF_PENALTY, "50px " + FONT_GAME, TEXT_COLOR);
      /** @type {string} */
      data.textAlign = "right";
      /** @type {number} */
      data.y = -4;
      m.addChild(data);
      /** @type {number} */
      m.y = box.y;
      c.addChild(m);
      p = new createjs.Text("99" + TEXT_OF + NUM_OF_PENALTY, "50px " + FONT_GAME, TEXT_COLOR_STROKE);
      /** @type {string} */
      p.textAlign = "right";
      /** @type {number} */
      p.y = data.y;
      p.outline = OUTLINE_WIDTH;
      m.addChild(p);
      var proto = s_oSpriteLibrary.getSprite("shot_left");
      o = createBitmap(proto);
      /** @type {number} */
      o.x = 1.4 * -data.getBounds().width;
      /** @type {number} */
      o.regX = 0.5 * proto.width;
      /** @type {number} */
      o.regY = 10;
      m.addChild(o);
      $cont = m.getBounds();
      this.updateCache();
    }, this.updateCache = function() {
      m.cache(-$cont.width, -$cont.height, 2 * $cont.width, 2 * $cont.height);
    }, this.getStartPos = function() {
      return box;
    }, this.setPos = function(x, y) {
      /** @type {number} */
      m.x = x;
      /** @type {number} */
      m.y = y;
    }, this.refreshTextLaunch = function(name, value) {
      data.text = name + TEXT_OF + value;
      p.text = data.text;
      /** @type {number} */
      o.x = 1.4 * -data.getBounds().width;
      this.updateCache();
    }, this._init(), this;
  }
  /**
   * @param {number} params
   * @param {number} name
   * @param {?} computed
   * @return {?}
   */
  function CPlayer(params, name, computed) {
    var p;
    var c;
    /** @type {Array} */
    var items = new Array;
    var result = computed;
    /** @type {number} */
    var that = 0;
    /** @type {number} */
    var l = 0;
    return this._init = function(protoProps, keepData) {
      p = {
        x : protoProps,
        y : keepData
      };
      c = new createjs.Container;
      c.x = p.x;
      c.y = p.y;
      result.addChild(c);
      /** @type {number} */
      var i = 0;
      for (;NUM_SPRITE_PLAYER > i;i++) {
        items.push(createBitmap(s_oSpriteLibrary.getSprite("player_" + i)));
        /** @type {boolean} */
        items[i].visible = false;
        c.addChild(items[i]);
      }
      var topCanv = s_oSpriteLibrary.getSprite("player_0");
      c.cache(0, 0, topCanv.width, topCanv.height);
      /** @type {boolean} */
      items[0].visible = true;
    }, this.setPosition = function(x, y) {
      /** @type {number} */
      c.x = x;
      c.y = y;
    }, this.getX = function() {
      return c.x;
    }, this.getY = function() {
      return c.y;
    }, this.getStartPos = function() {
      return p;
    }, this.setVisible = function(recurring) {
      /** @type {boolean} */
      c.visible = recurring;
    }, this.animFade = function(a) {
      var target = this;
      createjs.Tween.get(c).to({
        alpha : a
      }, 250).call(function() {
        if (0 === a) {
          /** @type {boolean} */
          c.visible = false;
          target.hideCharacter(NUM_SPRITE_PLAYER - 1);
          target.viewCharacter(that);
        }
      });
    }, this.viewCharacter = function(slot) {
      /** @type {boolean} */
      items[slot].visible = true;
    }, this.hideCharacter = function(slot) {
      /** @type {boolean} */
      items[slot].visible = false;
    }, this.getFrame = function() {
      return that;
    }, this.animPlayer = function() {
      if (l += s_iTimeElaps, l > BUFFER_ANIM_PLAYER) {
        if (this.hideCharacter(that), !(NUM_SPRITE_PLAYER > that + 1)) {
          return this.viewCharacter(that), that = 0, l = 0, false;
        }
        this.viewCharacter(that + 1);
        that++;
        c.updateCache();
        /** @type {number} */
        l = 0;
      }
      return true;
    }, this._init(params, name), this;
  }
  /**
   * @param {Object} $attrs
   * @return {undefined}
   */
  function CGame($attrs) {
    var widget;
    var ctx;
    var self;
    var sprite;
    var actor;
    var p;
    var size;
    var p2;
    var shape;
    var e;
    var tt;
    var udataCur;
    var y;
    var id;
    var E;
    var f;
    var m;
    var sec;
    var result;
    var translate;
    /** @type {null} */
    var event = null;
    /** @type {null} */
    var target = null;
    /** @type {boolean} */
    var a = false;
    /** @type {boolean} */
    var isPaused = false;
    /** @type {boolean} */
    var b = false;
    /** @type {boolean} */
    var x = false;
    /** @type {boolean} */
    var O = false;
    /** @type {boolean} */
    var C = false;
    /** @type {boolean} */
    var c = false;
    /** @type {boolean} */
    var R = false;
    /** @type {boolean} */
    var N = false;
    /** @type {number} */
    var ins = 1;
    /** @type {number} */
    var oldconfig = 0;
    /** @type {number} */
    var i = 0;
    /** @type {number} */
    var P = 0;
    var arg2 = STATE_INIT;
    /** @type {null} */
    var object = null;
    /**
     * @return {undefined}
     */
    this._init = function() {
      $(s_oMain).trigger("start_session");
      this.pause(true);
      $(s_oMain).trigger("start_level", ins);
      /** @type {number} */
      y = 0;
      /** @type {number} */
      sec = 1;
      /** @type {Array} */
      result = new Array;
      p = new createjs.Container;
      s_oStage.addChild(p);
      ctx = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
      ctx.cache(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      p.addChild(ctx);
      self = new CScenario(ins);
      object = SHOW_3D_RENDER ? camera : createOrthoGraphicCamera();
      var goal = s_oSpriteLibrary.getSprite("goal");
      udataCur = new CGoal(291, 28, goal, p);
      event = new CGoalKeeper(CANVAS_WIDTH_HALF - 100, CANVAS_HEIGHT_HALF - 225, p);
      result.push(event);
      var ball = s_oSpriteLibrary.getSprite("ball");
      sprite = new CBall(0, 0, ball, self.ballBody(), p);
      result.push(sprite);
      this.ballPosition();
      sprite.setVisible(false);
      m = MS_TIME_SWIPE_START;
      actor = new CStartBall(CANVAS_WIDTH_HALF + 55, CANVAS_HEIGHT_HALF + 168, p);
      e = new CPlayer(CANVAS_WIDTH_HALF - 150, CANVAS_HEIGHT_HALF - 320, p);
      e.setVisible(false);
      /** @type {string} */
      var rvar = "cursor";
      if (s_bMobile) {
        /** @type {string} */
        rvar = "hand_touch";
      }
      tt = new CHandSwipeAnim(START_HAND_SWIPE_POS, END_HAND_SWIPE_POS, s_oSpriteLibrary.getSprite(rvar), s_oStage);
      tt.animAllSwipe();
      resizeCanvas3D();
      setVolume(s_oSoundTrack, 0.35);
      widget = new CInterface;
      widget.refreshTextScoreBoard(0, 0, 0, false);
      widget.refreshLaunchBoard(oldconfig, NUM_OF_PENALTY);
      translate = new CANNON.Vec3(0, 0, 0);
      this.onExitHelp();
    };
    /**
     * @return {undefined}
     */
    this.createControl = function() {
      if (SHOW_3D_RENDER) {
        window.addEventListener("mousedown", this.onMouseDown);
        window.addEventListener("mousemove", this.onPressMove);
        window.addEventListener("mouseup", this.onPressUp);
      } else {
        shape = new createjs.Shape;
        shape.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        p.addChild(shape);
        shape.on("mousedown", this.onMouseDown);
        shape.on("pressmove", this.onPressMove);
        shape.on("pressup", this.onPressUp);
      }
    };
    /**
     * @param {?} source
     * @param {?} value
     * @return {undefined}
     */
    this.sortDepth = function(source, value) {
      if (source.getDepthPos() > value.getDepthPos()) {
        if (p.getChildIndex(source.getObject()) > p.getChildIndex(value.getObject())) {
          p.swapChildren(source.getObject(), value.getObject());
        }
      } else {
        if (source.getDepthPos() < value.getDepthPos()) {
          if (p.getChildIndex(value.getObject()) > p.getChildIndex(source.getObject())) {
            p.swapChildren(value.getObject(), source.getObject());
          }
        }
      }
    };
    /**
     * @return {undefined}
     */
    this.onExitHelp = function() {
      this.createControl();
      this.pause(false);
    };
    /**
     * @return {undefined}
     */
    this.poleCollide = function() {
      f = TIME_POLE_COLLISION_RESET;
      /** @type {boolean} */
      N = true;
      playSound("pole", 0.4, 0);
    };
    /**
     * @return {undefined}
     */
    this.fieldCollision = function() {
      if (null === target) {
        if (isPaused) {
          target = playSound("drop_bounce_grass", 0.3, 0);
          target.on("complete", function() {
            target.removeAllEventListeners();
            /** @type {null} */
            target = null;
          });
        }
      }
    };
    /**
     * @return {undefined}
     */
    this.ballPosition = function() {
      var vertex = self.ballBody();
      var item = this.convert3dPosTo2dScreen(vertex.position, object);
      var scale = item.z * (BALL_SCALE_FACTOR - sprite.getStartScale()) + sprite.getStartScale();
      sprite.setPosition(item.x, item.y);
      sprite.scale(scale);
      this.refreshShadowCast(sprite, vertex, scale);
    };
    /**
     * @param {?} event
     * @return {undefined}
     */
    this.onMouseDown = function(event) {
      if (!isPaused) {
        m = MS_TIME_SWIPE_START;
        tt.removeTweens();
        tt.setVisible(false);
        size = {
          x : s_oStage.mouseX,
          y : s_oStage.mouseY
        };
      }
    };
    /**
     * @return {undefined}
     */
    this.onPressMove = function() {
      p2 = {
        x : s_oStage.mouseX,
        y : s_oStage.mouseY
      };
      P += s_iTimeElaps;
    };
    /**
     * @return {undefined}
     */
    this.onPressUp = function() {
      if (!isPaused) {
        /** @type {number} */
        var udataCur = Math.ceil(distanceV2(size, p2)) * FORCE_RATE;
        if (udataCur > FORCE_MAX) {
          udataCur = FORCE_MAX;
        }
        if (P > 1E3) {
          /** @type {number} */
          P = 1E3;
        }
        var vec = new CVector2(size.x - p2.x, size.y - p2.y);
        vec.scalarProduct(udataCur);
        var n = vec.length();
        if (n > HIT_BALL_MIN_FORCE) {
          if (n > HIT_BALL_MAX_FORCE) {
            vec.normalize();
            vec.scalarProduct(HIT_BALL_MAX_FORCE);
          }
          /** @type {boolean} */
          O = true;
          e.setVisible(true);
          /** @type {number} */
          var pdataOld = P / 10;
          if (pdataOld > MAX_FORCE_Y) {
            pdataOld = MAX_FORCE_Y;
          } else {
            if (MIN_FORCE_Y > pdataOld) {
              pdataOld = MIN_FORCE_Y;
            }
          }
          translate.set(-vec.getX() * FORCE_MULTIPLIER_AXIS.x, pdataOld, vec.getY() * FORCE_MULTIPLIER_AXIS.z);
          R = s_oGame.goalProbability();
        } else {
          console.log("TIRO NULLO");
        }
        /** @type {number} */
        p2.x = 0;
        /** @type {number} */
        p2.y = 0;
      }
    };
    /**
     * @param {?} sprite
     * @param {Object} vertex
     * @param {?} scale
     * @return {?}
     */
    this.refreshShadowCast = function(sprite, vertex, scale) {
      var light1 = self.getFieldBody();
      if (vertex.position.z < light1.position.z) {
        return void sprite.scaleShadow(0);
      }
      var g = {
        x : vertex.position.x,
        y : vertex.position.y,
        z : light1.position.z
      };
      var translate = this.convert3dPosTo2dScreen(g, object);
      var y = (vertex.position.z - BALL_RADIUS) * (light1.position.z - SHADOWN_FACTOR - light1.position.z) + light1.position.z;
      /** @type {number} */
      var udataCur = y * scale;
      sprite.scaleShadow(udataCur);
      if (!(0 > udataCur)) {
        sprite.setAlphaByHeight(y);
        sprite.setPositionShadow(translate.x, translate.y);
      }
    };
    /**
     * @param {number} value
     * @param {number} isXML
     * @return {undefined}
     */
    this.addScore = function(value, isXML) {
      y += value;
      widget.refreshTextScoreBoard(y, sec.toFixed(1), isXML, true);
    };
    /**
     * @return {?}
     */
    this.getLevel = function() {
      return ins;
    };
    /**
     * @return {undefined}
     */
    this.unload = function() {
      s_oStage.removeAllChildren();
      widget.unload();
      shape.removeAllEventListeners();
      self.destroyWorld();
      /** @type {null} */
      self = null;
    };
    /**
     * @return {undefined}
     */
    this.resetValues = function() {
      /** @type {number} */
      y = 0;
      widget.refreshTextScoreBoard(0, 0, 0, false);
      /** @type {number} */
      oldconfig = 0;
      /** @type {number} */
      sec = 1;
      widget.refreshLaunchBoard(oldconfig, NUM_OF_PENALTY);
    };
    /**
     * @return {undefined}
     */
    this.wallSoundCollision = function() {
      playSound("ball_collision", 1, 0);
    };
    /**
     * @return {undefined}
     */
    this.areaGoal = function() {
      if (!a) {
        if (!c) {
          if (R) {
            /** @type {boolean} */
            a = true;
            E = TIME_RESET_AFTER_GOAL;
            this.textGoal();
            this.calculateScore();
            playSound("goal", 1, 0);
          } else {
            this.goalKeeperSave();
          }
        }
      }
    };
    /**
     * @return {undefined}
     */
    this.goalKeeperSave = function() {
      /** @type {boolean} */
      c = true;
      E = TIME_RESET_AFTER_SAVE;
      widget.createAnimText(TEXT_SAVED, 80, false, TEXT_COLOR_1, TEXT_COLOR_STROKE);
      playSound("ball_saved", 1, 0);
      this.rejectBall();
      /** @type {number} */
      sec = 1;
      /** @type {number} */
      i = 0;
    };
    /**
     * @return {undefined}
     */
    this.rejectBall = function() {
      switch(sprite.getPhysics().velocity.negate(sprite.getPhysics().velocity), id) {
        case 12:
          sprite.getPhysics().velocity = sprite.getPhysics().velocity.vadd(new CANNON.Vec3(0.4 * sprite.getPhysics().velocity.x, 0.4 * sprite.getPhysics().velocity.y, 0.4 * sprite.getPhysics().velocity.z));
          break;
        default:
          sprite.getPhysics().velocity.vsub(new CANNON.Vec3(0, 50, 0));
      }
    };
    /**
     * @return {undefined}
     */
    this.calculateScore = function() {
      var clientTop = AREAS_INFO[id].probability;
      /** @type {number} */
      var top = MAX_PERCENT_PROBABILITY - clientTop;
      /** @type {number} */
      var tmpSet = MAX_PERCENT_PROBABILITY - top;
      this.addScore(tmpSet * sec, tmpSet);
      sec += MULTIPLIER_STEP;
    };
    /**
     * @return {?}
     */
    this.goalProbability = function() {
      /** @type {number} */
      id = -1;
      /** @type {number} */
      var num = 0;
      for (;num < CALCULATE_PROBABILITY.length;num++) {
        if (translate.z < CALCULATE_PROBABILITY[num].zMax) {
          if (translate.z > CALCULATE_PROBABILITY[num].zMin) {
            if (translate.x < CALCULATE_PROBABILITY[num].xMax) {
              if (translate.x > CALCULATE_PROBABILITY[num].xMin) {
                /** @type {number} */
                id = num;
              }
            }
          }
        }
      }
      if (-1 === id) {
        return false;
      }
      /** @type {Array} */
      var grafsOut = new Array;
      /** @type {number} */
      num = 0;
      for (;MAX_PERCENT_PROBABILITY > num;num++) {
        grafsOut.push(false);
      }
      /** @type {number} */
      num = 0;
      for (;num < AREAS_INFO[id].probability;num++) {
        /** @type {boolean} */
        grafsOut[num] = true;
      }
      /** @type {number} */
      var i = Math.floor(Math.random() * grafsOut.length);
      return grafsOut[i];
    };
    /**
     * @param {Object} b
     * @return {undefined}
     */
    this.addImpulseToBall = function(b) {
      if (!isPaused && arg2 === STATE_PLAY) {
        var sig = self.ballBody();
        self.addImpulse(sig, b);
        self.setElementAngularVelocity(sig, {
          x : 0,
          y : 0,
          z : 0
        });
        /** @type {boolean} */
        isPaused = true;
        sprite.setVisible(true);
        actor.setVisible(false);
        this.chooseDirectionGoalKeeper(b);
        playSound("kick", 1, 0);
      }
    };
    /**
     * @param {Object} v12
     * @return {undefined}
     */
    this.chooseDirectionGoalKeeper = function(v12) {
      if (R) {
        var r20 = event.getAnimType();
        switch(id) {
          case 2:
          ;
          case 7:
          ;
          case 12:
            this.chooseWrongDirGK(ANIM_GOAL_KEEPER_FAIL_ALT);
            break;
          default:
            this.chooseWrongDirGK(ANIM_GOAL_KEEPER_FAIL, r20);
        }
      } else {
        switch(id) {
          case -1:
            if (v12.x < GOAL_KEEPER_TOLLERANCE_LEFT) {
              event.runAnim(LEFT);
            } else {
              if (v12.y > GOAL_KEEPER_TOLLERANCE_RIGHT) {
                event.runAnim(RIGHT);
              }
            }
            break;
          default:
            event.runAnim(AREA_GOALS_ANIM[id]);
        }
      }
      /** @type {boolean} */
      C = true;
    };
    /**
     * @param {Array} special
     * @return {undefined}
     */
    this.chooseWrongDirGK = function(special) {
      /** @type {number} */
      var type = Math.floor(Math.random() * special.length);
      for (;type === AREA_GOALS_ANIM[id];) {
        /** @type {number} */
        type = Math.floor(Math.random() * special.length);
      }
      event.runAnim(special[type]);
    };
    /**
     * @param {boolean} recurring
     * @return {undefined}
     */
    this.pause = function(recurring) {
      arg2 = recurring ? STATE_PAUSE : STATE_PLAY;
      /** @type {boolean} */
      createjs.Ticker.paused = recurring;
    };
    /**
     * @return {undefined}
     */
    this.onExit = function() {
      this.unload();
      $(s_oMain).trigger("show_interlevel_ad");
      $(s_oMain).trigger("end_session");
      setVolume(s_oSoundTrack, 1);
      s_oMain.gotoMenu();
    };
    /**
     * @return {undefined}
     */
    this.restartLevel = function() {
      this.resetValues();
      this.resetScene();
      arg2 = STATE_PLAY;
      this.startOpponentShot();
      $(s_oMain).trigger("restart_level", ins);
    };
    /**
     * @return {undefined}
     */
    this.resetBallPosition = function() {
      var m = self.ballBody();
      m.position.set(POSITION_BALL.x, POSITION_BALL.y, POSITION_BALL.z);
      self.setElementVelocity(m, {
        x : 0,
        y : 0,
        z : 0
      });
      self.setElementAngularVelocity(m, {
        x : 0,
        y : 0,
        z : 0
      });
      sprite.fadeAnimation(1, 500, 0);
      sprite.setVisible(false);
      actor.setVisible(true);
      actor.setAlpha(0);
      actor.fadeAnim(1, 500, 0);
    };
    /**
     * @return {undefined}
     */
    this.ballFadeForReset = function() {
      if (c) {
        if (a) {
          if (b) {
            if (!x) {
              sprite.fadeAnimation(0, 300, 10);
              /** @type {boolean} */
              x = true;
            }
          }
        }
      }
    };
    /**
     * @return {undefined}
     */
    this._updateInit = function() {
      self.update();
      this._updateBall2DPosition();
      arg2 = STATE_PLAY;
    };
    /**
     * @param {?} d
     * @return {?}
     */
    this.convert2dScreenPosTo3d = function(d) {
      var Z = s_iCanvasResizeWidth;
      var sum = s_iCanvasResizeHeight;
      var vector = new THREE.Vector3(d.x / Z * 2 - 1, 2 * -(d.y / sum) + 1, -1);
      vector.unproject(object);
      vector.sub(object.position);
      vector.normalize();
      /** @type {number} */
      var posInterpolation = 0;
      return vector.multiply(new THREE.Vector3(posInterpolation, 1, posInterpolation)), vector;
    };
    /**
     * @param {?} target
     * @param {Array} object
     * @return {?}
     */
    this.convert3dPosTo2dScreen = function(target, object) {
      var that = new THREE.Vector3(target.x, target.y, target.z);
      var c = that.project(object);
      /** @type {number} */
      var width = 0.5 * Math.floor(s_iCanvasResizeWidth);
      /** @type {number} */
      var scale = 0.5 * Math.floor(s_iCanvasResizeHeight);
      return c.x = (c.x * width + width) * s_fInverseScaling, c.y = (-(c.y * scale) + scale) * s_fInverseScaling, c;
    };
    /**
     * @return {undefined}
     */
    this.timeReset = function() {
      if (E > 0) {
        E -= s_iTimeElaps;
      } else {
        this.endTurn();
      }
    };
    /**
     * @return {undefined}
     */
    this.restartGame = function() {
      this.resetValues();
      this.resetScene();
      arg2 = STATE_PLAY;
      /** @type {boolean} */
      isPaused = false;
    };
    /**
     * @return {undefined}
     */
    this.endTurn = function() {
      if (oldconfig < NUM_OF_PENALTY) {
        oldconfig++;
        widget.refreshLaunchBoard(oldconfig, NUM_OF_PENALTY);
        this.resetScene();
        /** @type {boolean} */
        isPaused = false;
        m = MS_TIME_SWIPE_START;
      } else {
        arg2 = STATE_FINISH;
        if (y > s_iBestScore) {
          /** @type {number} */
          s_iBestScore = Math.floor(y);
          saveItem(LOCALSTORAGE_STRING[LOCAL_BEST_SCORE], Math.floor(y));
        }
        widget.createWinPanel(Math.floor(y));
        $(s_oMain).trigger("end_level", ins);
      }
    };
    /**
     * @return {undefined}
     */
    this.textGoal = function() {
      if (i < TEXT_CONGRATULATION.length) {
        /** @type {boolean} */
        var recurring = false;
        if (i >= TEXT_CONGRATULATION.length - 1) {
          /** @type {boolean} */
          recurring = true;
        }
        widget.createAnimText(TEXT_CONGRATULATION[i], TEXT_SIZE[i], recurring, TEXT_COLOR, TEXT_COLOR_STROKE);
        i++;
      } else {
        /** @type {boolean} */
        recurring = false;
        /** @type {number} */
        var visible = Math.floor(Math.random() * (TEXT_CONGRATULATION.length - 1)) + 1;
        if (visible >= TEXT_CONGRATULATION.length - 1) {
          /** @type {boolean} */
          recurring = true;
        }
        widget.createAnimText(TEXT_CONGRATULATION[visible], TEXT_SIZE[visible], recurring, TEXT_COLOR, TEXT_COLOR_STROKE);
      }
    };
    /**
     * @param {?} value
     * @return {undefined}
     */
    this.goalAnimation = function(value) {
      if (value > FORCE_BALL_DISPLAY_SHOCK[0].min && value < FORCE_BALL_DISPLAY_SHOCK[0].max) {
        this.displayShock(INTENSITY_DISPLAY_SHOCK[0].time, INTENSITY_DISPLAY_SHOCK[0].x, INTENSITY_DISPLAY_SHOCK[0].y);
      } else {
        if (value > FORCE_BALL_DISPLAY_SHOCK[1].min && value < FORCE_BALL_DISPLAY_SHOCK[1].max) {
          this.displayShock(INTENSITY_DISPLAY_SHOCK[1].time, INTENSITY_DISPLAY_SHOCK[1].x, INTENSITY_DISPLAY_SHOCK[1].y);
        } else {
          if (value > FORCE_BALL_DISPLAY_SHOCK[2].min && value < FORCE_BALL_DISPLAY_SHOCK[2].max) {
            this.displayShock(INTENSITY_DISPLAY_SHOCK[2].time, INTENSITY_DISPLAY_SHOCK[2].x, INTENSITY_DISPLAY_SHOCK[2].y);
          } else {
            if (value > FORCE_BALL_DISPLAY_SHOCK[3].min) {
              this.displayShock(INTENSITY_DISPLAY_SHOCK[3].time, INTENSITY_DISPLAY_SHOCK[3].x, INTENSITY_DISPLAY_SHOCK[3].y);
            }
          }
        }
      }
    };
    /**
     * @param {?} time
     * @param {number} m3
     * @param {number} fromIndex
     * @return {undefined}
     */
    this.displayShock = function(time, m3, fromIndex) {
      /** @type {number} */
      var c = m3;
      /** @type {number} */
      var i = fromIndex;
      createjs.Tween.get(p).to({
        x : Math.round(Math.random() * c),
        y : Math.round(Math.random() * i)
      }, time).call(function() {
        createjs.Tween.get(p).to({
          x : Math.round(Math.random() * c * 0.8),
          y : -Math.round(Math.random() * i * 0.8)
        }, time).call(function() {
          createjs.Tween.get(p).to({
            x : Math.round(Math.random() * c * 0.6),
            y : Math.round(Math.random() * i * 0.6)
          }, time).call(function() {
            createjs.Tween.get(p).to({
              x : Math.round(Math.random() * c * 0.4),
              y : -Math.round(Math.random() * i * 0.4)
            }, time).call(function() {
              createjs.Tween.get(p).to({
                x : Math.round(Math.random() * c * 0.2),
                y : Math.round(Math.random() * i * 0.2)
              }, time).call(function() {
                createjs.Tween.get(p).to({
                  y : 0,
                  x : 0
                }, time).call(function() {
                });
              });
            });
          });
        });
      });
    };
    /**
     * @return {undefined}
     */
    this.resetScene = function() {
      /** @type {boolean} */
      a = false;
      /** @type {boolean} */
      b = false;
      /** @type {boolean} */
      c = false;
      /** @type {boolean} */
      R = false;
      /** @type {boolean} */
      N = false;
      /** @type {boolean} */
      x = false;
      event.setAlpha(0);
      event.fadeAnimation(1);
      event.runAnim(IDLE);
      this.resetBallPosition();
      this.sortDepth(sprite, udataCur);
    };
    /**
     * @return {undefined}
     */
    this._onEnd = function() {
      this.onExit();
    };
    /**
     * @return {undefined}
     */
    this.swapChildrenIndex = function() {
      /** @type {number} */
      var axis = 0;
      for (;axis < result.length - 1;axis++) {
        /** @type {number} */
        var i = axis + 1;
        for (;i < result.length;i++) {
          if (result[axis].getObject().visible) {
            if (result[i].getObject().visible) {
              this.sortDepth(result[axis], result[i]);
            }
          }
        }
      }
    };
    /**
     * @return {undefined}
     */
    this.ballOut = function() {
      if (!b && (!a && !c)) {
        var p = sprite.getPhysics().position;
        if (p.y > BALL_OUT_Y || (p.x > BACK_WALL_GOAL_SIZE.width || p.x < -BACK_WALL_GOAL_SIZE.width)) {
          /** @type {boolean} */
          b = true;
          E = TIME_RESET_AFTER_BALL_OUT;
          widget.createAnimText(TEXT_BALL_OUT, 90, false, TEXT_COLOR_1, TEXT_COLOR_STROKE);
          playSound("ball_saved", 1, 0);
          /** @type {number} */
          sec = 1;
          /** @type {number} */
          i = 0;
        }
      }
    };
    /**
     * @return {?}
     */
    this.animPlayer = function() {
      return O ? (O = e.animPlayer(), void(e.getFrame() === SHOOT_FRAME && (this.addImpulseToBall({
        x : translate.x,
        y : translate.y,
        z : translate.z
      }), P = 0, this.goalAnimation(translate.y), widget.unloadHelpText()))) : void e.setVisible(false);
    };
    /**
     * @return {undefined}
     */
    this.animGoalKeeper = function() {
      if (isPaused) {
        if (C) {
          C = event.update();
          if (!C) {
            event.viewFrame(event.getAnimArray(), event.getAnimArray().length - 1);
            event.hideFrame(event.getAnimArray(), 0);
            event.fadeAnimation(0);
          }
        }
      } else {
        event.update();
      }
    };
    /**
     * @return {undefined}
     */
    this.resetPoleCollision = function() {
      if (f > 0) {
        f -= s_iTimeElaps;
      } else {
        if (!(a && c)) {
          widget.createAnimText(TEXT_BALL_OUT, 80, false, TEXT_COLOR_1, TEXT_COLOR_STROKE);
          /** @type {number} */
          sec = 1;
          /** @type {number} */
          i = 0;
          playSound("ball_saved", 1, 0);
          this.endTurn();
          f = TIME_POLE_COLLISION_RESET;
        }
      }
    };
    /**
     * @return {undefined}
     */
    this.handSwipeAnim = function() {
      if (!tt.isAnimate()) {
        if (!isPaused) {
          if (m > 0) {
            m -= s_iTimeElaps;
          } else {
            tt.animAllSwipe();
            tt.setVisible(true);
            m = MS_TIME_SWIPE_START;
          }
        }
      }
    };
    /**
     * @return {undefined}
     */
    this.swapGoal = function() {
      if (sprite.getPhysics().position.z > GOAL_SPRITE_SWAP_Z) {
        this.sortDepth(sprite, udataCur);
      }
    };
    /**
     * @return {undefined}
     */
    this._updatePlay = function() {
      /** @type {number} */
      var e = 0;
      for (;PHYSICS_ACCURACY > e;e++) {
        self.update();
      }
      this.ballOut();
      if (a || (b || c)) {
        this.timeReset();
      } else {
        if (N) {
          this.resetPoleCollision();
        }
      }
      this.animGoalKeeper();
      this.animPlayer();
      this._updateBall2DPosition();
      this.handSwipeAnim();
      this.swapChildrenIndex();
      this.swapGoal();
    };
    /**
     * @return {undefined}
     */
    this.update = function() {
      switch(arg2) {
        case STATE_INIT:
          this._updateInit();
          break;
        case STATE_PLAY:
          this._updatePlay();
          break;
        case STATE_FINISH:
          break;
        case STATE_PAUSE:
        ;
      }
    };
    /**
     * @return {undefined}
     */
    this._updateBall2DPosition = function() {
      this.ballPosition();
      sprite.rolls();
      object.updateProjectionMatrix();
      object.updateMatrixWorld();
    };
    s_oGame = this;
    AREAS_INFO = $attrs.area_goal;
    NUM_OF_PENALTY = $attrs.num_of_penalty;
    MULTIPLIER_STEP = $attrs.multiplier_step;
    NUM_LEVEL_FOR_ADS = $attrs.num_levels_for_ads;
    ENABLE_FULLSCREEN = $attrs.fullscreen;
    this._init();
  }
  /**
   * @param {number} params
   * @return {?}
   */
  function CWinPanel(params) {
    var star;
    var style;
    var t;
    var o;
    var node;
    var p;
    var s;
    var item;
    var b;
    var context;
    var sprite;
    return this._init = function(protoProps) {
      /** @type {number} */
      var u = 50;
      item = new createjs.Container;
      /** @type {number} */
      item.alpha = 0;
      /** @type {boolean} */
      item.visible = false;
      var shape = new createjs.Shape;
      shape.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      /** @type {number} */
      shape.alpha = 0.5;
      item.addChild(shape);
      star = createBitmap(protoProps);
      star.x = CANVAS_WIDTH_HALF;
      star.y = CANVAS_HEIGHT_HALF;
      /** @type {number} */
      star.regX = 0.5 * protoProps.width;
      /** @type {number} */
      star.regY = 0.5 * protoProps.height;
      item.addChild(star);
      style = new createjs.Text("", "80px " + FONT_GAME, TEXT_COLOR_STROKE);
      /** @type {number} */
      style.x = CANVAS_WIDTH / 2;
      /** @type {number} */
      style.y = CANVAS_HEIGHT_HALF - 170;
      /** @type {string} */
      style.textAlign = "center";
      /** @type {number} */
      style.outline = 5;
      item.addChild(style);
      t = new createjs.Text("", "80px " + FONT_GAME, TEXT_COLOR);
      /** @type {number} */
      t.x = CANVAS_WIDTH / 2;
      /** @type {number} */
      t.y = style.y;
      /** @type {string} */
      t.textAlign = "center";
      item.addChild(t);
      o = new createjs.Text("", u + "px " + FONT_GAME, TEXT_COLOR_STROKE);
      /** @type {number} */
      o.x = CANVAS_WIDTH / 2;
      /** @type {number} */
      o.y = CANVAS_HEIGHT_HALF - 50;
      /** @type {string} */
      o.textAlign = "center";
      /** @type {number} */
      o.outline = 5;
      item.addChild(o);
      node = new createjs.Text("", u + "px " + FONT_GAME, TEXT_COLOR);
      /** @type {number} */
      node.x = CANVAS_WIDTH / 2;
      /** @type {number} */
      node.y = o.y;
      /** @type {string} */
      node.textAlign = "center";
      item.addChild(node);
      p = new createjs.Text("", u + "px " + FONT_GAME, TEXT_COLOR_STROKE);
      /** @type {number} */
      p.x = CANVAS_WIDTH / 2;
      p.y = CANVAS_HEIGHT_HALF + 50;
      /** @type {string} */
      p.textAlign = "center";
      /** @type {number} */
      p.outline = 5;
      item.addChild(p);
      s = new createjs.Text("", u + "px " + FONT_GAME, TEXT_COLOR);
      /** @type {number} */
      s.x = CANVAS_WIDTH / 2;
      s.y = p.y;
      /** @type {string} */
      s.textAlign = "center";
      item.addChild(s);
      var path = s_oSpriteLibrary.getSprite("but_restart");
      context = new CGfxButton(0.5 * CANVAS_WIDTH + 250, 0.5 * CANVAS_HEIGHT + 120, path, item);
      context.pulseAnimation();
      context.addEventListener(ON_MOUSE_DOWN, this._onRestart, this);
      var attackMode = s_oSpriteLibrary.getSprite("but_home");
      b = new CGfxButton(0.5 * CANVAS_WIDTH - 250, 0.5 * CANVAS_HEIGHT + 120, attackMode, item);
      b.addEventListener(ON_MOUSE_DOWN, this._onExit, this);
      sprite = new createjs.Container;
      item.addChild(sprite);
      item.on("click", function() {
      });
      s_oStage.addChild(item);
    }, this.unload = function() {
      item.removeAllEventListeners();
      s_oStage.removeChild(item);
      if (b) {
        b.unload();
        /** @type {null} */
        b = null;
      }
      if (context) {
        context.unload();
        /** @type {null} */
        context = null;
      }
    }, this.show = function(i) {
      style.text = TEXT_GAMEOVER;
      t.text = TEXT_GAMEOVER;
      o.text = TEXT_SCORE + ": " + i;
      node.text = TEXT_SCORE + ": " + i;
      p.text = TEXT_BEST_SCORE + ": " + s_iBestScore;
      s.text = TEXT_BEST_SCORE + ": " + s_iBestScore;
      /** @type {boolean} */
      item.visible = true;
      createjs.Tween.get(item).wait(MS_WAIT_SHOW_GAME_OVER_PANEL).to({
        alpha : 1
      }, 1250, createjs.Ease.cubicOut).call(function() {
        if (s_iAdsLevel === NUM_LEVEL_FOR_ADS) {
          $(s_oMain).trigger("show_interlevel_ad");
          /** @type {number} */
          s_iAdsLevel = 1;
        } else {
          s_iAdsLevel++;
        }
      });
      $(s_oMain).trigger("save_score", i);
      $(s_oMain).trigger("share_event", i);
    }, this._onContinue = function() {
      var widget = this;
      createjs.Tween.get(item, {
        override : true
      }).to({
        alpha : 0
      }, 750, createjs.Ease.cubicOut).call(function() {
        widget.unload();
      });
      _oButContinue.block(true);
      b.block(true);
      s_oGame.onContinue();
    }, this._onRestart = function() {
      context.block(true);
      this.unload();
      s_oGame.restartGame();
    }, this._onExit = function() {
      this.unload();
      s_oGame.onExit();
    }, this._init(params), this;
  }
  /**
   * @param {number} params
   * @param {number} name
   * @param {?} walkers
   * @param {number} html
   * @param {(number|string)} count
   * @return {undefined}
   */
  function CToggle(params, name, walkers, html, count) {
    var state;
    var data;
    var list;
    var p;
    var body;
    /**
     * @param {number} protoProps
     * @param {number} keepData
     * @param {?} obj
     * @param {number} arg
     * @param {number} params
     * @return {undefined}
     */
    this._init = function(protoProps, keepData, obj, arg, params) {
      body = void 0 !== params ? params : s_oStage;
      /** @type {Array} */
      data = new Array;
      /** @type {Array} */
      list = new Array;
      var spritesheetData = {
        images : [obj],
        frames : {
          width : obj.width / 2,
          height : obj.height,
          regX : obj.width / 2 / 2,
          regY : obj.height / 2
        },
        animations : {
          state_true : [0],
          state_false : [1]
        }
      };
      var entries = new createjs.SpriteSheet(spritesheetData);
      /** @type {number} */
      state = arg;
      p = createSprite(entries, "state_" + state, obj.width / 2 / 2, obj.height / 2, obj.width / 2, obj.height);
      /** @type {number} */
      p.x = protoProps;
      /** @type {number} */
      p.y = keepData;
      p.stop();
      if (!s_bMobile) {
        /** @type {string} */
        p.cursor = "pointer";
      }
      body.addChild(p);
      this._initListener();
    };
    /**
     * @return {undefined}
     */
    this.unload = function() {
      p.off("mousedown", this.buttonDown);
      p.off("pressup", this.buttonRelease);
      body.removeChild(p);
    };
    /**
     * @return {undefined}
     */
    this._initListener = function() {
      p.on("mousedown", this.buttonDown);
      p.on("pressup", this.buttonRelease);
    };
    /**
     * @param {string} type
     * @param {Function} listener
     * @param {boolean} mayParseLabeledStatementInstead
     * @return {undefined}
     */
    this.addEventListener = function(type, listener, mayParseLabeledStatementInstead) {
      /** @type {Function} */
      data[type] = listener;
      /** @type {boolean} */
      list[type] = mayParseLabeledStatementInstead;
    };
    /**
     * @param {string} start
     * @return {undefined}
     */
    this.setCursorType = function(start) {
      /** @type {string} */
      p.cursor = start;
    };
    /**
     * @param {boolean} active
     * @return {undefined}
     */
    this.setActive = function(active) {
      /** @type {boolean} */
      state = active;
      p.gotoAndStop("state_" + state);
    };
    /**
     * @return {undefined}
     */
    this.buttonRelease = function() {
      /** @type {number} */
      p.scaleX = 1;
      /** @type {number} */
      p.scaleY = 1;
      playSound("click", 1, 0);
      /** @type {boolean} */
      state = !state;
      p.gotoAndStop("state_" + state);
      if (data[ON_MOUSE_UP]) {
        data[ON_MOUSE_UP].call(list[ON_MOUSE_UP], state);
      }
    };
    /**
     * @return {undefined}
     */
    this.buttonDown = function() {
      /** @type {number} */
      p.scaleX = 0.9;
      /** @type {number} */
      p.scaleY = 0.9;
      if (data[ON_MOUSE_DOWN]) {
        data[ON_MOUSE_DOWN].call(list[ON_MOUSE_DOWN]);
      }
    };
    /**
     * @param {number} X
     * @param {?} y
     * @return {undefined}
     */
    this.setPosition = function(X, y) {
      /** @type {number} */
      p.x = X;
      p.y = y;
    };
    this._init(params, name, walkers, html, count);
  }
  /**
   * @param {?} subKey
   * @return {undefined}
   */
  function CAreYouSurePanel(subKey) {
    var shape;
    var c;
    var newNode;
    var elem;
    var p;
    var result;
    var item;
    /**
     * @return {undefined}
     */
    this._init = function() {
      p = new createjs.Container;
      /** @type {number} */
      p.alpha = 0;
      result.addChild(p);
      item = new createjs.Shape;
      item.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      /** @type {number} */
      item.alpha = 0.5;
      item.on("click", function() {
      });
      p.addChild(item);
      var rect = s_oSpriteLibrary.getSprite("msg_box");
      shape = createBitmap(rect);
      shape.x = CANVAS_WIDTH_HALF;
      shape.y = CANVAS_HEIGHT_HALF;
      /** @type {number} */
      shape.regX = 0.5 * rect.width;
      /** @type {number} */
      shape.regY = 0.5 * rect.height;
      p.addChild(shape);
      c = new createjs.Text(TEXT_ARE_SURE, "70px " + FONT_GAME, "#ffffff");
      /** @type {number} */
      c.x = CANVAS_WIDTH / 2;
      /** @type {number} */
      c.y = CANVAS_HEIGHT_HALF - 50;
      /** @type {string} */
      c.textAlign = "center";
      /** @type {string} */
      c.textBaseline = "middle";
      p.addChild(c);
      newNode = new CGfxButton(CANVAS_WIDTH / 2 + 250, 0.5 * CANVAS_HEIGHT + 120, s_oSpriteLibrary.getSprite("but_yes"), p);
      newNode.addEventListener(ON_MOUSE_UP, this._onButYes, this);
      elem = new CGfxButton(CANVAS_WIDTH / 2 - 250, 0.5 * CANVAS_HEIGHT + 120, s_oSpriteLibrary.getSprite("but_no"), p);
      elem.addEventListener(ON_MOUSE_UP, this._onButNo, this);
    };
    /**
     * @return {undefined}
     */
    this.show = function() {
      createjs.Tween.get(p).to({
        alpha : 1
      }, 150, createjs.quartOut).call(function() {
        s_oGame.pause(true);
      });
    };
    /**
     * @return {undefined}
     */
    this.unload = function() {
      createjs.Tween.get(p).to({
        alpha : 0
      }, 150, createjs.quartOut).call(function() {
        result.removeChild(p, item);
      });
    };
    /**
     * @return {undefined}
     */
    this._onButYes = function() {
      /** @type {boolean} */
      createjs.Ticker.paused = false;
      this.unload();
      s_oGame.onExit();
      item.removeAllEventListeners();
    };
    /**
     * @return {undefined}
     */
    this._onButNo = function() {
      s_oGame.pause(false);
      this.unload();
      /** @type {boolean} */
      p.visible = false;
      item.removeAllEventListeners();
    };
    result = subKey;
    this._init();
  }
  /**
   * @return {undefined}
   */
  function CSpriteLibrary() {
    var methods;
    var nstart;
    var nend;
    var ostring;
    var ret;
    var it;
    /**
     * @param {?} allBindingsAccessor
     * @param {?} array
     * @param {?} dataAndEvents
     * @return {undefined}
     */
    this.init = function(allBindingsAccessor, array, dataAndEvents) {
      /** @type {number} */
      nstart = 0;
      /** @type {number} */
      nend = 0;
      ostring = allBindingsAccessor;
      ret = array;
      it = dataAndEvents;
      methods = {};
    };
    /**
     * @param {string} property
     * @param {string} sprite
     * @return {undefined}
     */
    this.addSprite = function(property, sprite) {
      if (!methods.hasOwnProperty(property)) {
        methods[property] = {
          szPath : sprite,
          oSprite : new Image
        };
        nstart++;
      }
    };
    /**
     * @param {string} name
     * @return {?}
     */
    this.getSprite = function(name) {
      return methods.hasOwnProperty(name) ? methods[name].oSprite : null;
    };
    /**
     * @return {undefined}
     */
    this._onSpritesLoaded = function() {
      ret.call(it);
    };
    /**
     * @return {undefined}
     */
    this._onSpriteLoaded = function() {
      ostring.call(it);
      if (++nend == nstart) {
        this._onSpritesLoaded();
      }
    };
    /**
     * @return {undefined}
     */
    this.loadSprites = function() {
      var property;
      for (property in methods) {
        methods[property].oSprite.oSpriteLibrary = this;
        /**
         * @return {undefined}
         */
        methods[property].oSprite.onload = function() {
          this.oSpriteLibrary._onSpriteLoaded();
        };
        methods[property].oSprite.src = methods[property].szPath;
      }
    };
    /**
     * @return {?}
     */
    this.getNumSprites = function() {
      return nstart;
    };
  }
  /**
   * @param {number} params
   * @param {number} name
   * @param {?} walkers
   * @return {?}
   */
  function CGoalKeeper(params, name, walkers) {
    var data;
    var p;
    var codeSegments;
    var context;
    var progressValues;
    /** @type {number} */
    var l = 0;
    /** @type {number} */
    var newName = 0;
    var i = IDLE;
    return this._init = function(protoProps, keepData, obj) {
      context = obj;
      data = {
        x : protoProps,
        y : keepData
      };
      p = new createjs.Container;
      p.x = data.x;
      p.y = data.y;
      context.addChild(p);
      /** @type {boolean} */
      p.tickChildren = false;
      /** @type {Array} */
      progressValues = new Array;
      /** @type {Array} */
      codeSegments = new Array;
      /** @type {number} */
      var w = 0;
      /** @type {number} */
      var h = 0;
      /** @type {number} */
      var i = 0;
      for (;i < NUM_SPRITE_GOALKEEPER.length;i++) {
        codeSegments[i] = new createjs.Container;
        codeSegments[i].x = OFFSET_CONTAINER_GOALKEEPER[i].x;
        codeSegments[i].y = OFFSET_CONTAINER_GOALKEEPER[i].y;
        progressValues.push(this.loadAnim(SPRITE_NAME_GOALKEEPER[i], NUM_SPRITE_GOALKEEPER[i], codeSegments[i]));
        p.addChild(codeSegments[i]);
        var node = s_oSpriteLibrary.getSprite(SPRITE_NAME_GOALKEEPER[i] + 0);
        if (node.width > w) {
          w = node.width;
        }
        if (node.height > h) {
          h = node.height;
        }
      }
      p.cache(-w, -h, 2 * w, 2 * h);
      /** @type {boolean} */
      progressValues[IDLE][0].visible = true;
    }, this.getAnimType = function() {
      return i;
    }, this.getAnimArray = function() {
      return progressValues[i];
    }, this.loadAnim = function(_, l, root) {
      /** @type {Array} */
      var m = new Array;
      /** @type {number} */
      var i = 0;
      for (;l > i;i++) {
        m.push(createBitmap(s_oSpriteLibrary.getSprite(_ + i)));
        /** @type {boolean} */
        m[i].visible = false;
        root.addChild(m[i]);
      }
      return m;
    }, this.getX = function() {
      return p.x;
    }, this.getY = function() {
      return p.y;
    }, this.disableAllAnim = function() {
      /** @type {number} */
      var i = 0;
      for (;i < codeSegments.length;i++) {
        /** @type {boolean} */
        codeSegments[i].visible = false;
      }
    }, this.setPosition = function(X, y) {
      /** @type {number} */
      p.x = X;
      p.y = y;
    }, this.setVisible = function(recurring) {
      /** @type {boolean} */
      p.visible = recurring;
    }, this.fadeAnimation = function(recurring) {
      createjs.Tween.get(p, {
        override : true
      }).to({
        alpha : recurring
      }, 500);
    }, this.setAlpha = function(a) {
      /** @type {number} */
      p.alpha = a;
    }, this.getObject = function() {
      return p;
    }, this.getFrame = function() {
      return newName;
    }, this.viewFrame = function(s, newName) {
      /** @type {boolean} */
      s[newName].visible = true;
    }, this.hideFrame = function(s, newName) {
      /** @type {boolean} */
      s[newName].visible = false;
    }, this.getDepthPos = function() {
      return GOAL_KEEPER_DEPTH_Y;
    }, this.animGoalKeeper = function(jsonString, dataAndEvents) {
      if (l += s_iTimeElaps, l > BUFFER_ANIM_PLAYER) {
        if (this.hideFrame(jsonString, newName), !(dataAndEvents > newName + 1)) {
          return newName = 0, l = 0, this.viewFrame(jsonString, newName), false;
        }
        this.viewFrame(jsonString, newName + 1);
        newName++;
        /** @type {number} */
        l = 0;
        p.updateCache();
      }
      return true;
    }, this.resetAnimation = function(i) {
      this.resetAnimFrame(progressValues[i], NUM_SPRITE_GOALKEEPER[i]);
    }, this.resetAnimFrame = function($cookies, id) {
      /** @type {number} */
      var key = 1;
      for (;id > key;key++) {
        /** @type {boolean} */
        $cookies[key].visible = false;
      }
      /** @type {boolean} */
      $cookies[0].visible = true;
    }, this.setVisibleContainer = function(i, dataAndEvents) {
      /** @type {boolean} */
      codeSegments[i].visible = dataAndEvents;
    }, this.runAnim = function(dir) {
      this.disableAllAnim();
      this.resetAnimation(dir);
      this.setVisibleContainer(dir, true);
      /** @type {number} */
      i = dir;
      /** @type {number} */
      newName = 0;
    }, this.update = function() {
      return this.animGoalKeeper(progressValues[i], NUM_SPRITE_GOALKEEPER[i]);
    }, this._init(params, name, walkers), this;
  }
  /**
   * @return {?}
   */
  function CRollingScore() {
    /** @type {null} */
    var r20 = null;
    /** @type {null} */
    var restoreScript = null;
    return this.rolling = function(x, a, millis) {
      r20 = createjs.Tween.get(x, {
        override : true
      }).to({
        text : millis
      }, MS_ROLLING_SCORE, createjs.Ease.cubicOut).addEventListener("change", function() {
        /** @type {number} */
        x.text = Math.floor(x.text);
      }).call(function() {
        createjs.Tween.removeTweens(r20);
      });
      if (null !== a) {
        restoreScript = createjs.Tween.get(a, {
          override : true
        }).to({
          text : millis
        }, MS_ROLLING_SCORE, createjs.Ease.cubicOut).addEventListener("change", function() {
          /** @type {number} */
          a.text = Math.floor(a.text);
        }).call(function() {
          createjs.Tween.removeTweens(restoreScript);
        });
      }
    }, this;
  }
  /**
   * @param {?} fmt
   * @return {undefined}
   */
  function trace(fmt) {
    console.log(fmt);
  }
  /**
   * @return {?}
   */
  function isIOS() {
    /** @type {Array} */
    var braceStack = ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"];
    for (;braceStack.length;) {
      if (navigator.platform === braceStack.pop()) {
        return s_bIsIphone = true, true;
      }
    }
    return s_bIsIphone = false, false;
  }
  /**
   * @return {undefined}
   */
  function onOrientationChange() {
    if (window.matchMedia("(orientation: portrait)").matches) {
      sizeHandler();
    }
    if (window.matchMedia("(orientation: landscape)").matches) {
      sizeHandler();
    }
  }
  /**
   * @param {string} Name
   * @return {?}
   */
  function getSize(Name) {
    var size;
    var n = Name.toLowerCase();
    /** @type {Document} */
    var doc = window.document;
    /** @type {Element} */
    var documentElement = doc.documentElement;
    if (void 0 === window["inner" + Name]) {
      size = documentElement["client" + Name];
    } else {
      if (window["inner" + Name] != documentElement["client" + Name]) {
        /** @type {Element} */
        var bodyElement = doc.createElement("body");
        /** @type {string} */
        bodyElement.id = "vpw-test-b";
        /** @type {string} */
        bodyElement.style.cssText = "overflow:scroll";
        /** @type {Element} */
        var divElement = doc.createElement("div");
        /** @type {string} */
        divElement.id = "vpw-test-d";
        /** @type {string} */
        divElement.style.cssText = "position:absolute;top:-1000px";
        /** @type {string} */
        divElement.innerHTML = "<style>@media(" + n + ":" + documentElement["client" + Name] + "px){body#vpw-test-b div#vpw-test-d{" + n + ":7px!important}}</style>";
        bodyElement.appendChild(divElement);
        documentElement.insertBefore(bodyElement, doc.head);
        size = 7 == divElement["offset" + Name] ? documentElement["client" + Name] : window["inner" + Name];
        documentElement.removeChild(bodyElement);
      } else {
        size = window["inner" + Name];
      }
    }
    return size;
  }
  /**
   * @return {?}
   */
  function getIOSWindowHeight() {
    /** @type {number} */
    var zoomLevel = document.documentElement.clientWidth / window.innerWidth;
    return window.innerHeight * zoomLevel;
  }
  /**
   * @return {?}
   */
  function getHeightOfIOSToolbars() {
    /** @type {number} */
    var v = (0 === window.orientation ? screen.height : screen.width) - getIOSWindowHeight();
    return v > 1 ? v : 0;
  }
  /**
   * @return {undefined}
   */
  function sizeHandler() {
    if (window.scrollTo(0, 1), $("#canvas")) {
      var x;
      /** @type {boolean} */
      var swapX = !!navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
      x = swapX ? getIOSWindowHeight() : getSize("Height");
      var a = getSize("Width");
      /** @type {number} */
      s_iScaleFactor = Math.min(x / CANVAS_HEIGHT, a / CANVAS_WIDTH);
      /** @type {number} */
      var b = CANVAS_WIDTH * s_iScaleFactor;
      /** @type {number} */
      var y = CANVAS_HEIGHT * s_iScaleFactor;
      /** @type {number} */
      var d1 = 0;
      if (x > y) {
        /** @type {number} */
        d1 = x - y;
        y += d1;
        b += d1 * (CANVAS_WIDTH / CANVAS_HEIGHT);
      } else {
        if (a > b) {
          /** @type {number} */
          d1 = a - b;
          b += d1;
          y += d1 * (CANVAS_HEIGHT / CANVAS_WIDTH);
        }
      }
      /** @type {number} */
      var width = x / 2 - y / 2;
      /** @type {number} */
      var height = a / 2 - b / 2;
      /** @type {number} */
      var ratio = CANVAS_WIDTH / b;
      if (-EDGEBOARD_X > height * ratio || -EDGEBOARD_Y > width * ratio) {
        /** @type {number} */
        s_iScaleFactor = Math.min(x / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y), a / (CANVAS_WIDTH - 2 * EDGEBOARD_X));
        /** @type {number} */
        b = CANVAS_WIDTH * s_iScaleFactor;
        /** @type {number} */
        y = CANVAS_HEIGHT * s_iScaleFactor;
        /** @type {number} */
        width = (x - y) / 2;
        /** @type {number} */
        height = (a - b) / 2;
        /** @type {number} */
        ratio = CANVAS_WIDTH / b;
      }
      /** @type {number} */
      s_fInverseScaling = ratio;
      /** @type {number} */
      s_iOffsetX = -1 * height * ratio;
      /** @type {number} */
      s_iOffsetY = -1 * width * ratio;
      if (width >= 0) {
        /** @type {number} */
        s_iOffsetY = 0;
      }
      if (height >= 0) {
        /** @type {number} */
        s_iOffsetX = 0;
      }
      if (null !== s_oInterface) {
        s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
      }
      if (null !== s_oMenu) {
        s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
      }
      $("#canvas").css("width", b + "px");
      $("#canvas").css("height", y + "px");
      if (0 > width) {
        $("#canvas").css("top", width + "px");
        /** @type {number} */
        s_iCanvasOffsetHeight = width;
      } else {
        $("#canvas").css("top", "0px");
        /** @type {number} */
        s_iCanvasOffsetHeight = 0;
      }
      $("#canvas").css("left", height + "px");
      resizeCanvas3D();
      /** @type {number} */
      s_iCanvasResizeWidth = b;
      /** @type {number} */
      s_iCanvasResizeHeight = y;
      /** @type {number} */
      s_iCanvasOffsetWidth = height;
    }
  }
  /**
   * @param {?} obj
   * @param {boolean} w
   * @param {boolean} h
   * @return {?}
   */
  function createBitmap(obj, w, h) {
    var item = new createjs.Bitmap(obj);
    var shape = new createjs.Shape;
    return w && h ? shape.graphics.beginFill("#fff").drawRect(-w / 2, -h / 2, w, h) : shape.graphics.beginFill("#ff0").drawRect(0, 0, obj.width, obj.height), item.hitArea = shape, item;
  }
  /**
   * @param {?} x
   * @param {Object} y
   * @param {number} relative
   * @param {number} _args
   * @param {number} ctx
   * @param {number} paper
   * @return {?}
   */
  function createSprite(x, y, relative, _args, ctx, paper) {
    if (null !== y) {
      var p = new createjs.Sprite(x, y)
    } else {
      p = new createjs.Sprite(x);
    }
    var item = new createjs.Shape;
    return item.graphics.beginFill("#000000").drawRect(-relative, -_args, ctx, paper), p.hitArea = item, p;
  }
  /**
   * @param {number} from
   * @param {number} to
   * @param {number} precision
   * @return {?}
   */
  function randomFloatBetween(from, to, precision) {
    return "undefined" == typeof precision && (precision = 2), parseFloat(Math.min(from + Math.random() * (to - from), to).toFixed(precision));
  }
  /**
   * @param {Array} arr
   * @return {?}
   */
  function shuffle(arr) {
    var tmp1;
    var rnd;
    var total = arr.length;
    for (;0 !== total;) {
      /** @type {number} */
      rnd = Math.floor(Math.random() * total);
      total -= 1;
      tmp1 = arr[total];
      arr[total] = arr[rnd];
      arr[rnd] = tmp1;
    }
    return arr;
  }
  /**
   * @param {number} width
   * @return {?}
   */
  function formatTime(width) {
    width /= 1E3;
    /** @type {number} */
    var inset = Math.floor(width / 60);
    /** @type {number} */
    var n = width - 60 * inset;
    /** @type {string} */
    n = parseFloat(n).toFixed(1);
    /** @type {string} */
    var accumulator = "";
    return accumulator += 10 > inset ? "0" + inset + ":" : inset + ":", accumulator += 10 > n ? "0" + n : n;
  }
  /**
   * @param {number} degrees
   * @return {?}
   */
  function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }
  /**
   * @param {Object} bitmap2
   * @param {Object} bitmap1
   * @return {?}
   */
  function checkRectCollision(bitmap2, bitmap1) {
    var b1;
    var b2;
    return b1 = getBounds(bitmap2, 0.9), b2 = getBounds(bitmap1, 0.98), calculateIntersection(b1, b2);
  }
  /**
   * @param {Object} rect1
   * @param {Object} rect2
   * @return {?}
   */
  function calculateIntersection(rect1, rect2) {
    var dx;
    var dy;
    var r1 = {};
    var r2 = {};
    return r1.cx = rect1.x + (r1.hw = rect1.width / 2), r1.cy = rect1.y + (r1.hh = rect1.height / 2), r2.cx = rect2.x + (r2.hw = rect2.width / 2), r2.cy = rect2.y + (r2.hh = rect2.height / 2), dx = Math.abs(r1.cx - r2.cx) - (r1.hw + r2.hw), dy = Math.abs(r1.cy - r2.cy) - (r1.hh + r2.hh), 0 > dx && 0 > dy ? (dx = Math.min(Math.min(rect1.width, rect2.width), -dx), dy = Math.min(Math.min(rect1.height, rect2.height), -dy), {
      x : Math.max(rect1.x, rect2.x),
      y : Math.max(rect1.y, rect2.y),
      width : dx,
      height : dy,
      rect1 : rect1,
      rect2 : rect2
    }) : null;
  }
  /**
   * @param {Object} obj
   * @param {number} factor
   * @return {?}
   */
  function getBounds(obj, factor) {
    var bounds = {
      x : 1 / 0,
      y : 1 / 0,
      width : 0,
      height : 0
    };
    if (obj instanceof createjs.Container) {
      /** @type {number} */
      bounds.x2 = -(1 / 0);
      /** @type {number} */
      bounds.y2 = -(1 / 0);
      var cbounds;
      var c;
      var children = obj.children;
      var count = children.length;
      /** @type {number} */
      c = 0;
      for (;count > c;c++) {
        cbounds = getBounds(children[c], 1);
        if (cbounds.x < bounds.x) {
          bounds.x = cbounds.x;
        }
        if (cbounds.y < bounds.y) {
          bounds.y = cbounds.y;
        }
        if (cbounds.x + cbounds.width > bounds.x2) {
          bounds.x2 = cbounds.x + cbounds.width;
        }
        if (cbounds.y + cbounds.height > bounds.y2) {
          bounds.y2 = cbounds.y + cbounds.height;
        }
      }
      if (bounds.x == 1 / 0) {
        /** @type {number} */
        bounds.x = 0;
      }
      if (bounds.y == 1 / 0) {
        /** @type {number} */
        bounds.y = 0;
      }
      if (bounds.x2 == 1 / 0) {
        /** @type {number} */
        bounds.x2 = 0;
      }
      if (bounds.y2 == 1 / 0) {
        /** @type {number} */
        bounds.y2 = 0;
      }
      /** @type {number} */
      bounds.width = bounds.x2 - bounds.x;
      /** @type {number} */
      bounds.height = bounds.y2 - bounds.y;
      delete bounds.x2;
      delete bounds.y2;
    } else {
      var ul;
      var coord;
      var gp4;
      var gp2;
      var ev;
      var imgr = {};
      if (obj instanceof createjs.Bitmap) {
        ev = obj.sourceRect || obj.image;
        /** @type {number} */
        imgr.width = ev.width * factor;
        /** @type {number} */
        imgr.height = ev.height * factor;
      } else {
        if (obj instanceof createjs.Sprite) {
          if (obj.spriteSheet._frames && (obj.spriteSheet._frames[obj.currentFrame] && obj.spriteSheet._frames[obj.currentFrame].image)) {
            var cframe = obj.spriteSheet.getFrame(obj.currentFrame);
            imgr.width = cframe.rect.width;
            imgr.height = cframe.rect.height;
            imgr.regX = cframe.regX;
            imgr.regY = cframe.regY;
          } else {
            bounds.x = obj.x || 0;
            bounds.y = obj.y || 0;
          }
        } else {
          bounds.x = obj.x || 0;
          bounds.y = obj.y || 0;
        }
      }
      imgr.regX = imgr.regX || 0;
      imgr.width = imgr.width || 0;
      imgr.regY = imgr.regY || 0;
      imgr.height = imgr.height || 0;
      bounds.regX = imgr.regX;
      bounds.regY = imgr.regY;
      ul = obj.localToGlobal(0 - imgr.regX, 0 - imgr.regY);
      coord = obj.localToGlobal(imgr.width - imgr.regX, imgr.height - imgr.regY);
      gp4 = obj.localToGlobal(imgr.width - imgr.regX, 0 - imgr.regY);
      gp2 = obj.localToGlobal(0 - imgr.regX, imgr.height - imgr.regY);
      /** @type {number} */
      bounds.x = Math.min(Math.min(Math.min(ul.x, coord.x), gp4.x), gp2.x);
      /** @type {number} */
      bounds.y = Math.min(Math.min(Math.min(ul.y, coord.y), gp4.y), gp2.y);
      /** @type {number} */
      bounds.width = Math.max(Math.max(Math.max(ul.x, coord.x), gp4.x), gp2.x) - bounds.x;
      /** @type {number} */
      bounds.height = Math.max(Math.max(Math.max(ul.y, coord.y), gp4.y), gp2.y) - bounds.y;
    }
    return bounds;
  }
  /**
   * @param {HTMLElement} el
   * @return {undefined}
   */
  function NoClickDelay(el) {
    /** @type {HTMLElement} */
    this.element = el;
    if (window.Touch) {
      this.element.addEventListener("touchstart", this, false);
    }
  }
  /**
   * @param {string} name
   * @param {number} expectedNumberOfNonCommentArgs
   * @param {number} mayParseLabeledStatementInstead
   * @return {?}
   */
  function playSound(name, expectedNumberOfNonCommentArgs, mayParseLabeledStatementInstead) {
    if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
      var sound = createjs.Sound.play(name, {
        loop : mayParseLabeledStatementInstead,
        volume : expectedNumberOfNonCommentArgs
      });
      return sound;
    }
    return null;
  }
  /**
   * @param {Object} sound
   * @return {undefined}
   */
  function stopSound(sound) {
    if (!(DISABLE_SOUND_MOBILE !== false && s_bMobile !== false)) {
      sound.stop();
    }
  }
  /**
   * @param {(Object|string)} element
   * @param {number} value
   * @return {undefined}
   */
  function setVolume(element, value) {
    if (!(DISABLE_SOUND_MOBILE !== false && s_bMobile !== false)) {
      /** @type {number} */
      element.volume = value;
    }
  }
  /**
   * @param {?} isMuted
   * @param {?} isMute
   * @return {undefined}
   */
  function setMute(isMuted, isMute) {
    if (!(DISABLE_SOUND_MOBILE !== false && s_bMobile !== false)) {
      isMuted.setMute(isMute);
    }
  }
  /**
   * @return {undefined}
   */
  function ctlArcadeResume() {
    if (null !== s_oMain) {
      s_oMain.startUpdate();
    }
  }
  /**
   * @return {undefined}
   */
  function ctlArcadePause() {
    if (null !== s_oMain) {
      s_oMain.stopUpdate();
    }
  }
  /**
   * @param {string} key
   * @return {?}
   */
  function getParamValue(key) {
    /** @type {string} */
    var uHostName = window.location.search.substring(1);
    /** @type {Array.<string>} */
    var codeSegments = uHostName.split("&");
    /** @type {number} */
    var i = 0;
    for (;i < codeSegments.length;i++) {
      /** @type {Array.<string>} */
      var parts = codeSegments[i].split("=");
      if (parts[0] == key) {
        return parts[1];
      }
    }
  }
  /**
   * @param {?} angle
   * @param {?} a
   * @return {?}
   */
  function rotateVector2D(angle, a) {
    /** @type {number} */
    var moveX = a.x * Math.cos(angle) + a.y * Math.sin(angle);
    /** @type {number} */
    var moveY = a.x * -Math.sin(angle) + a.y * Math.cos(angle);
    return{
      x : moveX,
      y : moveY
    };
  }
  /**
   * @param {?} style
   * @param {number} x
   * @return {?}
   */
  function normalize(style, x) {
    return x > 0 && (style.x /= x, style.y /= x), style;
  }
  /**
   * @param {?} v
   * @return {?}
   */
  function length(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
  }
  /**
   * @param {?} t
   * @param {?} a
   * @param {?} key
   * @param {?} qs
   * @return {?}
   */
  function findNearestIntersectingObject(t, a, key, qs) {
    var d = CANVAS_RESIZE_WIDTH + 2 * OFFSET_WIDTH;
    var b = CANVAS_RESIZE_HEIGHT + 2 * OFFSET_HEIGHT;
    var Hash = new THREE.Raycaster;
    var vars = new THREE.Vector3;
    /** @type {number} */
    vars.x = t / d * 2 - 1;
    /** @type {number} */
    vars.y = 2 * -(a / b) + 1;
    /** @type {number} */
    vars.z = 0.5;
    Hash.setFromCamera(vars, key);
    var worlds = Hash.intersectObjects(qs, true);
    /** @type {boolean} */
    var world = false;
    return worlds.length > 0 && (world = worlds[0]), world;
  }
  /**
   * @param {number} to
   * @param {number} a
   * @param {number} from
   * @param {number} b
   * @return {?}
   */
  function distance(to, a, from, b) {
    /** @type {number} */
    var z0 = to - from;
    /** @type {number} */
    var z1 = a - b;
    return Math.sqrt(z0 * z0 + z1 * z1);
  }
  /**
   * @param {number} eyex
   * @param {number} eyey
   * @param {number} centerx
   * @param {number} centery
   * @return {?}
   */
  function distance2(eyex, eyey, centerx, centery) {
    /** @type {number} */
    var z0 = eyex - centerx;
    /** @type {number} */
    var z1 = eyey - centery;
    return z0 * z0 + z1 * z1;
  }
  /**
   * @return {undefined}
   */
  function resizeCanvas3D() {
    $("canvas").each(function() {
      if ("#canvas" != $(this).attr("id")) {
        $(this).css("width", $("#canvas").css("width"));
        $(this).css("height", $("#canvas").css("height"));
        $(this).css("position", $("#canvas").css("position"));
        $(this).css("left", $("#canvas").css("left"));
        $(this).css("top", $("#canvas").css("top"));
      }
    });
  }
  /**
   * @return {?}
   */
  function createOrthoGraphicCamera() {
    var camera = new THREE.PerspectiveCamera(FOV, CANVAS_WIDTH / CANVAS_HEIGHT, NEAR, FAR);
    return camera.rotation.x = 88.6 * (Math.PI / 180), camera.rotation.y = 0.03 * (Math.PI / 180), camera.position.set(CAMERA_POSITION.x, CAMERA_POSITION.y, CAMERA_POSITION.z), camera.updateProjectionMatrix(), camera.updateMatrixWorld(), camera;
  }
  /**
   * @param {?} angle
   * @param {?} a
   * @return {?}
   */
  function rotateVector2D(angle, a) {
    /** @type {number} */
    var moveX = a.x * Math.cos(angle) + a.y * Math.sin(angle);
    /** @type {number} */
    var moveY = a.x * -Math.sin(angle) + a.y * Math.cos(angle);
    return{
      x : moveX,
      y : moveY,
      z : 0
    };
  }
  /**
   * @param {number} eyex
   * @param {number} eyey
   * @param {number} far
   * @param {number} centerx
   * @param {number} centery
   * @param {number} near
   * @return {?}
   */
  function distanceV3(eyex, eyey, far, centerx, centery, near) {
    /** @type {number} */
    var z0 = eyex - centerx;
    /** @type {number} */
    var z1 = eyey - centery;
    /** @type {number} */
    var dz = far - near;
    return Math.sqrt(z0 * z0 + z1 * z1 + dz * dz);
  }
  /**
   * @param {?} size
   * @param {?} scroll
   * @return {?}
   */
  function distanceV2(size, scroll) {
    /** @type {number} */
    var z0 = size.x - scroll.x;
    /** @type {number} */
    var z1 = size.y - scroll.y;
    return Math.sqrt(z0 * z0 + z1 * z1);
  }
  /**
   * @param {?} item
   * @param {number} tabId
   * @return {undefined}
   */
  function saveItem(item, tabId) {
    localStorage.setItem(item, tabId);
  }
  /**
   * @param {?} key
   * @return {?}
   */
  function getItem(key) {
    return localStorage.getItem(key);
  }
  /**
   * @return {undefined}
   */
  function clearAllItem() {
    localStorage.clear();
  }
  /**
   * @return {?}
   */
  function inIframe() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }
  /**
   * @param {number} x
   * @param {?} newPosition
   * @param {?} c
   * @return {?}
   */
  function CStartBall(x, newPosition, c) {
    var p;
    var control = c;
    return this._init = function() {
      var win = s_oSpriteLibrary.getSprite("start_ball");
      p = createBitmap(win);
      /** @type {number} */
      p.regX = 0.5 * win.width;
      /** @type {number} */
      p.regY = 0.5 * win.height;
      this.setPosition(x, newPosition);
      control.addChild(p);
    }, this.setPosition = function(X, y) {
      /** @type {number} */
      p.x = X;
      p.y = y;
    }, this.fadeAnim = function(recurring, afterAmount, result) {
      createjs.Tween.get(p, {
        override : true
      }).wait(result).to({
        alpha : recurring
      }, afterAmount);
    }, this.setAlpha = function(a) {
      /** @type {number} */
      p.alpha = a;
    }, this.setVisible = function(recurring) {
      /** @type {boolean} */
      p.visible = recurring;
    }, this._init(), this;
  }
  /**
   * @param {?} computed
   * @return {?}
   */
  function CScoreBoard(computed) {
    var obj;
    var y;
    var c;
    var style;
    var stage;
    var p;
    var o;
    var node;
    var self;
    var box;
    var item;
    var result = computed;
    return this._init = function() {
      obj = {
        x : CANVAS_WIDTH_HALF - 660,
        y : CANVAS_HEIGHT - 64
      };
      box = new createjs.Container;
      /** @type {number} */
      box.x = obj.x;
      /** @type {number} */
      box.y = obj.y;
      result.addChild(box);
      c = new createjs.Text(TEXT_SCORE, "50px " + FONT_GAME, TEXT_COLOR);
      /** @type {string} */
      c.textAlign = "left";
      box.addChild(c);
      style = new createjs.Text(TEXT_SCORE, "50px " + FONT_GAME, TEXT_COLOR_STROKE);
      /** @type {string} */
      style.textAlign = "left";
      style.outline = OUTLINE_WIDTH;
      box.addChild(style);
      stage = new createjs.Text(999999, "50px " + FONT_GAME, TEXT_COLOR);
      /** @type {string} */
      stage.textAlign = "left";
      /** @type {number} */
      stage.x = 150;
      box.addChild(stage);
      p = new createjs.Text(999999, "50px " + FONT_GAME, TEXT_COLOR_STROKE);
      /** @type {string} */
      p.textAlign = "left";
      /** @type {number} */
      p.x = stage.x;
      p.outline = OUTLINE_WIDTH;
      box.addChild(p);
      item = new createjs.Container;
      /** @type {number} */
      item.x = 50;
      o = new createjs.Text("+5555 " + TEXT_MULTIPLIER + 1, "36px " + FONT_GAME, TEXT_COLOR);
      /** @type {string} */
      o.textAlign = "left";
      item.addChild(o);
      node = new createjs.Text("+5555 " + TEXT_MULTIPLIER + 1, "36px " + FONT_GAME, TEXT_COLOR_STROKE);
      /** @type {string} */
      node.textAlign = "left";
      node.outline = OUTLINE_WIDTH;
      item.addChild(node);
      /** @type {number} */
      item.y = y = -node.getBounds().height;
      /** @type {boolean} */
      item.visible = false;
      box.addChild(item);
      self = new CRollingScore;
    }, this.getStartPosScore = function() {
      return obj;
    }, this.setPosScore = function(x, y) {
      box.x = x;
      /** @type {number} */
      box.y = y;
    }, this.refreshTextScore = function(millis) {
      self.rolling(stage, p, millis);
    }, this.effectAddScore = function(isXML, recurring) {
      /** @type {boolean} */
      item.visible = true;
      o.text = "+" + isXML + " " + TEXT_MULTIPLIER + recurring;
      node.text = o.text;
      createjs.Tween.get(item).to({
        y : y - 50,
        alpha : 0
      }, MS_EFFECT_ADD, createjs.Ease.cubicOut).call(function() {
        /** @type {boolean} */
        item.visible = false;
        /** @type {number} */
        item.alpha = 1;
        item.y = y;
      });
    }, this._init(), this;
  }
  /**
   * @return {?}
   */
  function CInterface() {
    var position;
    var pos;
    var size;
    var lastCoords;
    var currentPoint;
    var that;
    var b;
    var ctx;
    var obj;
    var domTracker;
    var Math;
    var d;
    var widget;
    var i;
    /** @type {null} */
    var link = null;
    /** @type {null} */
    var matches = null;
    /** @type {null} */
    var test = null;
    return this._init = function() {
      lastCoords = {
        x : 0,
        y : 0
      };
      var containerSize = s_oSpriteLibrary.getSprite("but_exit");
      pos = {
        x : CANVAS_WIDTH - containerSize.height / 2 - 10,
        y : containerSize.height / 2 + 10
      };
      that = new CGfxButton(pos.x, pos.y, containerSize);
      that.addEventListener(ON_MOUSE_UP, this._onExit, this);
      containerSize = s_oSpriteLibrary.getSprite("but_pause");
      if (size = {
        x : pos.x - containerSize.height - 10,
        y : pos.y
      }, b = new CGfxButton(size.x, size.y, containerSize), b.addEventListener(ON_MOUSE_UP, this.onButPauseRelease, this), DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
        containerSize = s_oSpriteLibrary.getSprite("audio_icon");
        position = {
          x : size.x - containerSize.height - 10,
          y : pos.y
        };
        obj = new CToggle(position.x, position.y, containerSize, s_bAudioActive);
        obj.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
      }
      /** @type {Document} */
      var doc = window.document;
      /** @type {Element} */
      var element = doc.documentElement;
      /** @type {function (this:Element): ?} */
      matches = element.requestFullscreen || (element.mozRequestFullScreen || (element.webkitRequestFullScreen || element.msRequestFullscreen));
      /** @type {function (this:Document): ?} */
      test = doc.exitFullscreen || (doc.mozCancelFullScreen || (doc.webkitExitFullscreen || doc.msExitFullscreen));
      if (ENABLE_FULLSCREEN === false) {
        /** @type {boolean} */
        matches = false;
      }
      if (matches) {
        if (!inIframe()) {
          containerSize = s_oSpriteLibrary.getSprite("but_fullscreen");
          currentPoint = {
            x : containerSize.width / 4 + 10,
            y : containerSize.height / 2 + 10
          };
          ctx = new CToggle(currentPoint.x, currentPoint.y, containerSize, false, s_oStage);
          ctx.addEventListener(ON_MOUSE_UP, this._onFullscreen, this);
        }
      }
      Math = new CScoreBoard(s_oStage);
      d = new CLaunchBoard(s_oStage);
      widget = new CHelpText(s_oStage);
      widget.fadeAnim(1, null);
      this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    }, this.refreshButtonPos = function(offset, y) {
      that.setPosition(pos.x - offset, y + pos.y);
      b.setPosition(size.x - offset, y + size.y);
      if (!(DISABLE_SOUND_MOBILE !== false && s_bMobile !== false)) {
        obj.setPosition(position.x - offset, y + position.y);
      }
      var self = Math.getStartPosScore();
      Math.setPosScore(self.x + offset, self.y - y);
      var e = d.getStartPos();
      d.setPos(e.x - offset, e.y - y);
      if (matches) {
        if (!inIframe()) {
          ctx.setPosition(currentPoint.x + offset, currentPoint.y + y);
        }
      }
    }, this.unloadHelpText = function() {
      if (null !== widget) {
        widget.fadeAnim(0, widget.unload);
        /** @type {null} */
        widget = null;
      }
    }, this.unload = function() {
      that.unload();
      /** @type {null} */
      that = null;
      if (!(DISABLE_SOUND_MOBILE !== false && s_bMobile !== false)) {
        obj.unload();
        /** @type {null} */
        obj = null;
      }
      if (matches) {
        if (!inIframe()) {
          ctx.unload();
          /** @type {null} */
          ctx = null;
        }
      }
      /** @type {null} */
      s_oInterface = null;
    }, this.createWinPanel = function(delay) {
      link = new CWinPanel(s_oSpriteLibrary.getSprite("msg_box"));
      link.show(delay);
    }, this.refreshTextScoreBoard = function(millis, recurring, isXML, commas) {
      Math.refreshTextScore(millis);
      if (commas) {
        Math.effectAddScore(isXML, recurring);
      }
    }, this._onFullscreen = function() {
      if (s_bFullscreen) {
        test.call(window.document);
        /** @type {boolean} */
        s_bFullscreen = false;
      } else {
        matches.call(window.document.documentElement);
        /** @type {boolean} */
        s_bFullscreen = true;
      }
      sizeHandler();
    }, this.createAnimText = function(x, opt_attributes, recurring) {
      var p = new createjs.Container;
      var s = new createjs.Text(x, opt_attributes + "px " + SECONDARY_FONT, TEXT_COLOR_STROKE);
      /** @type {number} */
      s.x = 0;
      /** @type {number} */
      s.y = 0;
      /** @type {string} */
      s.textAlign = "center";
      /** @type {number} */
      s.outline = 4;
      p.addChild(s);
      var c = new createjs.Text(s.text, opt_attributes + "px " + SECONDARY_FONT, "#ffffff");
      /** @type {number} */
      c.x = 0;
      /** @type {number} */
      c.y = 0;
      /** @type {string} */
      c.textAlign = "center";
      p.addChild(c);
      p.x = CANVAS_WIDTH_HALF;
      /** @type {number} */
      p.y = -s.getBounds().height;
      if (recurring) {
        s_oInterface.strobeText(c);
      }
      s_oStage.addChild(p);
      createjs.Tween.get(p).to({
        y : CANVAS_HEIGHT_HALF
      }, 500, createjs.Ease.cubicOut).call(function() {
        createjs.Tween.get(p).wait(250).to({
          y : CANVAS_HEIGHT + s.getBounds().height
        }, 500, createjs.Ease.cubicIn).call(function() {
          if (recurring) {
            createjs.Tween.removeTweens(c);
          }
          s_oStage.removeChild(p);
        });
      });
    }, this.strobeText = function(p) {
      createjs.Tween.get(p).wait(30).call(function() {
        if (i < TEXT_EXCELLENT_COLOR.length - 1) {
          i++;
        } else {
          /** @type {number} */
          i = 0;
        }
        p.color = TEXT_EXCELLENT_COLOR[i];
        s_oInterface.strobeText(p);
      });
    }, this.refreshLaunchBoard = function(b, ctor) {
      d.refreshTextLaunch(b, ctor);
    }, this._onAudioToggle = function() {
      createjs.Sound.setMute(s_bAudioActive);
      /** @type {boolean} */
      s_bAudioActive = !s_bAudioActive;
    }, this._onExit = function() {
      var activeItem = new CAreYouSurePanel(s_oStage);
      activeItem.show();
    }, this.unloadPause = function() {
      domTracker.unload();
      /** @type {null} */
      domTracker = null;
    }, this.onButPauseRelease = function() {
      playSound("click", 1, 0);
      domTracker = new CPause;
    }, s_oInterface = this, this._init(), this;
  }
  /**
   * @param {?} computed
   * @return {?}
   */
  function CHelpText(computed) {
    var t;
    var s;
    var item;
    var result = computed;
    return this._init = function() {
      item = new createjs.Container;
      result.addChild(item);
      t = new createjs.Text(TEXT_HELP, "42px " + FONT_GAME, TEXT_COLOR);
      /** @type {number} */
      t.x = CANVAS_WIDTH / 2;
      t.y = CANVAS_HEIGHT_HALF;
      /** @type {string} */
      t.textAlign = "center";
      item.addChild(t);
      s = new createjs.Text(TEXT_HELP, "42px " + FONT_GAME, TEXT_COLOR_STROKE);
      /** @type {number} */
      s.x = CANVAS_WIDTH / 2;
      s.y = t.y;
      /** @type {string} */
      s.textAlign = "center";
      s.outline = OUTLINE_WIDTH;
      item.addChild(s);
      /** @type {number} */
      item.alpha = 0;
    }, this.fadeAnim = function(recurring, lab) {
      createjs.Tween.get(item, {
        override : true
      }).to({
        alpha : recurring
      }, MS_TIME_FADE_HELP_TEXT).call(function() {
        if (null !== lab) {
          lab();
        }
      }, null, this);
    }, this.unload = function() {
      createjs.Tween.removeTweens(item);
      result.removeChild(item);
    }, this._init(), this;
  }
  /**
   * @return {undefined}
   */
  function CScenario() {
    var self;
    var material;
    var geometry;
    var fn;
    var e;
    var group;
    var value;
    var rvar;
    var body;
    var spot;
    var arr;
    var map;
    var players;
    var pkt;
    var textShape;
    var entity;
    var progressValues;
    if (SHOW_3D_RENDER) {
      var that = new CANNON.Demo
    }
    /**
     * @return {?}
     */
    this.getDemo = function() {
      return that;
    };
    /**
     * @return {undefined}
     */
    this._init = function() {
      self = SHOW_3D_RENDER ? that.getWorld() : new CANNON.World;
      /** @type {Array} */
      progressValues = new Array;
      self.gravity.set(0, 0, -9.81);
      self.broadphase = new CANNON.NaiveBroadphase;
      /** @type {number} */
      self.solver.iterations = 50;
      /** @type {number} */
      self.solver.tolerance = 1E-5;
      material = new CANNON.Material;
      geometry = new CANNON.Material;
      fn = new CANNON.Material;
      var hook = new CANNON.ContactMaterial(geometry, fn, {
        friction : 0.1,
        restitution : 0.01
      });
      var mesh = new CANNON.ContactMaterial(geometry, material, {
        friction : 0.2,
        restitution : 0.3
      });
      self.addContactMaterial(hook);
      self.addContactMaterial(mesh);
      s_oScenario._createBallBody();
      s_oScenario._createFieldBody();
      s_oScenario._createGoal();
      s_oScenario.createBackGoalWall();
      if (SHOW_AREAS_GOAL) {
        s_oScenario.createAreasGoal();
      } else {
        s_oScenario.createAreaGoal(GOAL_LINE_POS, BACK_WALL_GOAL_SIZE, COLOR_AREA_GOAL[0], null);
      }
    };
    /**
     * @return {undefined}
     */
    this.createAreasGoal = function() {
      /** @type {number} */
      var unlock = 0;
      var newX = FIRST_AREA_GOAL_POS.x;
      var z = FIRST_AREA_GOAL_POS.z;
      /** @type {number} */
      var h = 0;
      for (;h < NUM_AREA_GOAL.h;h++) {
        /** @type {number} */
        var w = 0;
        for (;w < NUM_AREA_GOAL.w;w++) {
          s_oScenario.createAreaGoal({
            x : newX,
            y : FIRST_AREA_GOAL_POS.y,
            z : z
          }, AREA_GOAL_PROPERTIES, COLOR_AREA_GOAL[unlock], AREAS_INFO[unlock]);
          newX += 2 * AREA_GOAL_PROPERTIES.width;
          unlock++;
        }
        newX = FIRST_AREA_GOAL_POS.x;
        z -= 2 * AREA_GOAL_PROPERTIES.height;
      }
    };
    /**
     * @return {undefined}
     */
    this._createFieldBody = function() {
      if (rvar = new CANNON.Plane, body = new CANNON.Body({
        mass : 0,
        material : material
      }), body.addShape(rvar), body.position.z = -9, body.addEventListener("collide", function(dataAndEvents) {
        s_oScenario.fieldCollision();
      }), self.addBody(body), SHOW_3D_RENDER) {
        var h2 = new THREE.MeshPhongMaterial({
          color : 5803568,
          specular : 1118481,
          shininess : 10
        });
        that.addVisual(body, h2);
      }
    };
    /**
     * @return {undefined}
     */
    this._createGoal = function() {
      spot = new CANNON.Cylinder(POLE_RIGHT_LEFT_SIZE.radius_top, POLE_RIGHT_LEFT_SIZE.radius_bottom, POLE_RIGHT_LEFT_SIZE.height, POLE_RIGHT_LEFT_SIZE.segments);
      map = new CANNON.Body({
        mass : 0
      });
      arr = new CANNON.Cylinder(POLE_UP_SIZE.radius_top, POLE_UP_SIZE.radius_bottom, POLE_UP_SIZE.height, POLE_UP_SIZE.segments);
      var fromIndex = new CANNON.Quaternion;
      if (fromIndex.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 2), arr.transformAllPoints(new CANNON.Vec3, fromIndex), map.addShape(spot, new CANNON.Vec3(0.5 * POLE_UP_SIZE.height, 0, 0)), map.addShape(spot, new CANNON.Vec3(0.5 * -POLE_UP_SIZE.height, 0, 0)), map.addShape(arr, new CANNON.Vec3(0, 0, 0.5 * POLE_RIGHT_LEFT_SIZE.height)), map.position.set(BACK_WALL_GOAL_POSITION.x, BACK_WALL_GOAL_POSITION.y - UP_WALL_GOAL_SIZE.depth, BACK_WALL_GOAL_POSITION.z), map.addEventListener("collide", 
      function(dataAndEvents) {
        s_oScenario.poleCollision();
      }), self.addBody(map), SHOW_3D_RENDER) {
        var h2 = new THREE.MeshPhongMaterial({
          color : 16777215,
          specular : 1118481,
          shininess : 50
        });
        that.addVisual(map, h2);
      }
    };
    /**
     * @return {undefined}
     */
    this.createBackGoalWall = function() {
      players = new CANNON.Box(new CANNON.Vec3(BACK_WALL_GOAL_SIZE.width, BACK_WALL_GOAL_SIZE.depth, BACK_WALL_GOAL_SIZE.height));
      pkt = new CANNON.Box(new CANNON.Vec3(LEFT_RIGHT_WALL_GOAL_SIZE.width, LEFT_RIGHT_WALL_GOAL_SIZE.depth, LEFT_RIGHT_WALL_GOAL_SIZE.height));
      textShape = new CANNON.Box(new CANNON.Vec3(UP_WALL_GOAL_SIZE.width, UP_WALL_GOAL_SIZE.depth, UP_WALL_GOAL_SIZE.height));
      entity = new CANNON.Body({
        mass : 0,
        material : fn
      });
      entity.addShape(players);
      entity.addShape(pkt, new CANNON.Vec3(BACK_WALL_GOAL_SIZE.width, 0, 0));
      entity.addShape(pkt, new CANNON.Vec3(-BACK_WALL_GOAL_SIZE.width, 0, 0));
      entity.addShape(textShape, new CANNON.Vec3(0, 0, BACK_WALL_GOAL_SIZE.height));
      entity.position.set(BACK_WALL_GOAL_POSITION.x, BACK_WALL_GOAL_POSITION.y, BACK_WALL_GOAL_POSITION.z);
      self.addBody(entity);
      if (SHOW_3D_RENDER) {
        that.addVisual(entity);
      }
    };
    /**
     * @param {?} pos
     * @param {Object} two
     * @param {number} lc
     * @param {Object} recurring
     * @return {?}
     */
    this.createAreaGoal = function(pos, two, lc, recurring) {
      var rvar = new CANNON.Box(new CANNON.Vec3(two.width, two.depth, two.height));
      var body = new CANNON.Body({
        mass : 0,
        userData : recurring
      });
      if (body.addShape(rvar), body.position.set(pos.x, pos.y, pos.z), body.collisionResponse = 0, body.addEventListener("collide", function(deepDataAndEvents) {
        s_oScenario.lineGoalCollision(deepDataAndEvents);
      }), self.addBody(body), SHOW_3D_RENDER) {
        var h2 = new THREE.MeshPhongMaterial({
          color : lc,
          specular : 1118481,
          shininess : 70
        });
        that.addVisual(body, h2);
      }
      return body;
    };
    /**
     * @return {undefined}
     */
    this._createBallBody = function() {
      e = new CANNON.Sphere(BALL_RADIUS);
      group = new CANNON.Body({
        mass : BALL_MASS,
        material : geometry,
        linearDamping : BALL_LINEAR_DAMPING,
        angularDamping : 2 * BALL_LINEAR_DAMPING
      });
      var mergedBuffer = new CANNON.Vec3(POSITION_BALL.x, POSITION_BALL.y, POSITION_BALL.z);
      if (group.position.copy(mergedBuffer), group.addShape(e), self.add(group), SHOW_3D_RENDER) {
        var args = new THREE.MeshPhongMaterial({
          color : 16777215,
          specular : 1118481,
          shininess : 70
        });
        value = that.addVisual(group, args);
      }
    };
    /**
     * @param {?} s
     * @param {Object} v12
     * @return {undefined}
     */
    this.addImpulse = function(s, v12) {
      var r = new CANNON.Vec3(0, 0, BALL_RADIUS);
      var rSlash = new CANNON.Vec3(v12.x, v12.y, v12.z);
      s.applyImpulse(rSlash, r);
    };
    /**
     * @param {?} point
     * @param {?} direction
     * @return {undefined}
     */
    this.addForce = function(point, direction) {
      var rotationOrigin = new CANNON.Vec3(0, 0, 0);
      var correction = new CANNON.Vec3(direction.x, direction.y, direction.z);
      point.applyForce(correction, rotationOrigin);
    };
    /**
     * @param {Object} coords
     * @return {?}
     */
    this.getBodyVelocity = function(coords) {
      return coords.velocity;
    };
    /**
     * @return {?}
     */
    this.ballBody = function() {
      return group;
    };
    /**
     * @return {?}
     */
    this.ballMesh = function() {
      return value;
    };
    /**
     * @return {?}
     */
    this.getCamera = function() {
      return that.camera();
    };
    /**
     * @return {undefined}
     */
    this.fieldCollision = function() {
      s_oGame.fieldCollision();
      s_oGame.ballFadeForReset();
    };
    /**
     * @param {?} s
     * @param {?} pos
     * @return {undefined}
     */
    this.setElementAngularVelocity = function(s, pos) {
      s.angularVelocity.set(pos.x, pos.y, pos.z);
    };
    /**
     * @param {Object} event
     * @param {?} vars
     * @return {undefined}
     */
    this.setElementVelocity = function(event, vars) {
      var velocity = new CANNON.Vec3(vars.x, vars.y, vars.z);
      event.velocity = velocity;
    };
    /**
     * @param {Object} a
     * @param {number} e
     * @return {undefined}
     */
    this.setElementLinearDamping = function(a, e) {
      /** @type {number} */
      a.linearDamping = e;
    };
    /**
     * @return {?}
     */
    this.getFieldBody = function() {
      return body;
    };
    /**
     * @param {?} deepDataAndEvents
     * @return {undefined}
     */
    this.lineGoalCollision = function(deepDataAndEvents) {
      s_oGame.areaGoal(deepDataAndEvents.contact.bj.userData);
    };
    /**
     * @return {undefined}
     */
    this.update = function() {
      self.step(PHYSICS_STEP);
    };
    /**
     * @return {?}
     */
    this.getGoalBody = function() {
      return map;
    };
    /**
     * @return {undefined}
     */
    this.poleCollision = function() {
      s_oGame.poleCollide();
    };
    /**
     * @return {undefined}
     */
    this.destroyWorld = function() {
      var r = self.bodies;
      /** @type {number} */
      var j = 0;
      for (;j < r.length;j++) {
        self.remove(r[j]);
      }
      /** @type {null} */
      self = null;
    };
    s_oScenario = this;
    if (SHOW_3D_RENDER) {
      that.addScene("Test", this._init);
      that.start();
    } else {
      this._init();
    }
  }
  /**
   * @param {number} params
   * @param {number} name
   * @param {?} walkers
   * @param {Object} dataAndEvents
   * @param {?} subKey
   * @return {?}
   */
  function CBall(params, name, walkers, dataAndEvents, subKey) {
    var that;
    var result;
    var particle;
    var o;
    var s;
    /** @type {null} */
    var text = null;
    /** @type {number} */
    var scale = FOV * BALL_RADIUS;
    /** @type {number} */
    var udataCur = scale;
    /** @type {number} */
    var _ = 0;
    /** @type {number} */
    var frame = 0;
    /** @type {null} */
    var E = null;
    return this._init = function(protoProps, keepData, obj) {
      s = new createjs.Container;
      result.addChild(s);
      var spritesheetData = {
        images : [obj],
        frames : {
          width : obj.width / 7,
          height : obj.height,
          regX : obj.width / 2 / 7,
          regY : obj.height / 2
        }
      };
      var ll = new createjs.SpriteSheet(spritesheetData);
      that = createSprite(ll, 0, obj.width / 2 / 7, obj.height / 2, obj.width / 7, obj.height / 2);
      that.stop();
      this.scale(scale);
      var proto = s_oSpriteLibrary.getSprite("ball_shadow");
      o = createBitmap(proto);
      /** @type {number} */
      o.x = protoProps;
      /** @type {number} */
      o.y = keepData;
      /** @type {number} */
      o.regX = 0.5 * proto.width;
      /** @type {number} */
      o.regY = 0.5 * proto.height;
      this.scaleShadow(udataCur);
      s.addChild(o, that);
    }, this.rolls = function() {
      /** @type {number} */
      var rad = 0.15 * particle.velocity.x;
      /** @type {number} */
      var value = Math.sin(-rad);
      that.rotation = Math.degrees(value);
      /** @type {number} */
      var n = Math.abs(particle.angularVelocity.x);
      var throttledUpdate = this._goToPrevFrame;
      if (particle.angularVelocity.x < 0) {
        throttledUpdate = this._goToNextFrame;
      }
      if (n > 7) {
        throttledUpdate();
      } else {
        if (n > 3) {
          _++;
          if (_ > 2 / ROLL_BALL_RATE) {
            throttledUpdate();
            /** @type {number} */
            _ = 0;
          }
        } else {
          if (n > 1) {
            _++;
            if (_ > 3 / ROLL_BALL_RATE) {
              throttledUpdate();
              /** @type {number} */
              _ = 0;
            }
          } else {
            if (n > MIN_BALL_VEL_ROTATION) {
              _++;
              if (_ > 4 / ROLL_BALL_RATE) {
                throttledUpdate();
                /** @type {number} */
                _ = 0;
              }
            }
          }
        }
      }
    }, this._goToPrevFrame = function() {
      if (0 === frame) {
        /** @type {number} */
        frame = 6;
        that.gotoAndStop(frame);
      } else {
        frame--;
        that.gotoAndStop(frame);
      }
    }, this._goToNextFrame = function() {
      if (7 === frame) {
        /** @type {number} */
        frame = 1;
        that.gotoAndStop(frame);
      } else {
        frame++;
        that.gotoAndStop(frame);
      }
    }, this.unload = function() {
      that.removeAllEventListeners();
      result.removeChild(that);
    }, this.setVisible = function(recurring) {
      /** @type {boolean} */
      s.visible = recurring;
    }, this.getStartScale = function() {
      return udataCur;
    }, this.startPosShadowY = function(textAlt) {
      /** @type {null} */
      text = textAlt;
    }, this.getStartShadowYPos = function() {
      return text;
    }, this.fadeAnimation = function(recurring, opt_attributes, slide) {
      this.tweenFade(recurring, opt_attributes, slide);
    }, this.tweenFade = function(recurring, opt_attributes, result) {
      E = createjs.Tween.get(s, {
        override : true
      }).wait(result).to({
        alpha : recurring
      }, opt_attributes).call(function() {
        /** @type {null} */
        E = null;
      });
    }, this.setPositionShadow = function(lvl, i) {
      o.x = lvl;
      o.y = i;
    }, this.setPosition = function(x, y) {
      /** @type {number} */
      that.x = x;
      that.y = y;
    }, this.getPhysics = function() {
      return particle;
    }, this.setAngle = function(value) {
      /** @type {number} */
      that.rotation = value;
    }, this.getX = function() {
      return that.x;
    }, this.getY = function() {
      return that.y;
    }, this.getStartScale = function() {
      return scale;
    }, this.scale = function(scale) {
      /** @type {number} */
      that.scaleX = scale;
      /** @type {number} */
      that.scaleY = scale;
    }, this.scaleShadow = function(value) {
      if (value > 0.08) {
        /** @type {number} */
        o.scaleX = value;
        /** @type {number} */
        o.scaleY = value;
      } else {
        /** @type {number} */
        o.scaleX = 0.08;
        /** @type {number} */
        o.scaleY = 0.08;
      }
    }, this.setAlphaByHeight = function(val) {
      /** @type {Blob} */
      o.alpha = val;
    }, this.getScale = function() {
      return that.scaleX;
    }, this.getObject = function() {
      return s;
    }, this.getDepthPos = function() {
      return particle.position.y;
    }, particle = dataAndEvents, result = subKey, this._init(params, name, walkers), this;
  }
  /**
   * @param {number} step
   * @return {undefined}
   */
  function CMain(step) {
    var t;
    var n;
    var element;
    var o;
    var a;
    var line;
    /** @type {number} */
    var x = 0;
    /** @type {number} */
    var y = 0;
    var c = STATE_LOADING;
    /**
     * @return {undefined}
     */
    this.initContainer = function() {
      /** @type {(HTMLElement|null)} */
      var canvas = document.getElementById("canvas");
      s_oStage = new createjs.Stage(canvas);
      createjs.Touch.enable(s_oStage);
      /** @type {boolean} */
      s_oStage.preventSelection = false;
      s_bMobile = jQuery.browser.mobile;
      if (s_bMobile === false) {
        s_oStage.enableMouseOver(20);
        $("body").on("contextmenu", "#canvas", function(dataAndEvents) {
          return false;
        });
        FPS = FPS_DESKTOP;
        /** @type {number} */
        FPS_TIME = 1 / FPS;
        /** @type {number} */
        PHYSICS_STEP = 1 / (FPS * STEP_RATE);
        /** @type {number} */
        ROLL_BALL_RATE = 60 / FPS;
      } else {
        /** @type {number} */
        BALL_VELOCITY_MULTIPLIER = 0.8;
      }
      /** @type {number} */
      s_iPrevTime = (new Date).getTime();
      createjs.Ticker.addEventListener("tick", this._update);
      createjs.Ticker.setFPS(FPS);
      if (navigator.userAgent.match(/Windows Phone/i)) {
        /** @type {boolean} */
        DISABLE_SOUND_MOBILE = true;
      }
      s_oSpriteLibrary = new CSpriteLibrary;
      element = new CPreloader;
      /** @type {boolean} */
      t = true;
    };
    /**
     * @return {undefined}
     */
    this.soundLoaded = function() {
      x++;
      /** @type {number} */
      var tabIndex = Math.floor(x / y * 100);
      element.refreshLoader(tabIndex);
      if (x === y) {
        element.unload();
        if (!(DISABLE_SOUND_MOBILE !== false && s_bMobile !== false)) {
          s_oSoundTrack = createjs.Sound.play("soundtrack", {
            loop : -1
          });
        }
        this.gotoMenu();
      }
    };
    /**
     * @return {undefined}
     */
    this._initSounds = function() {
      if (createjs.Sound.initializeDefaultPlugins()) {
        if (navigator.userAgent.indexOf("Opera") > 0 || navigator.userAgent.indexOf("OPR") > 0) {
          /** @type {Array} */
          createjs.Sound.alternateExtensions = ["mp3"];
          createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));
          createjs.Sound.registerSound("./sounds/click.ogg", "click");
          createjs.Sound.registerSound("./sounds/drop_bounce_grass.ogg", "drop_bounce_grass");
          createjs.Sound.registerSound("./sounds/soundtrack.ogg", "soundtrack");
          createjs.Sound.registerSound("./sounds/goal.ogg", "goal");
          createjs.Sound.registerSound("./sounds/ball_saved.ogg", "ball_saved");
          createjs.Sound.registerSound("./sounds/kick.ogg", "kick");
          createjs.Sound.registerSound("./sounds/pole.ogg", "pole");
        } else {
          /** @type {Array} */
          createjs.Sound.alternateExtensions = ["ogg"];
          createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));
          createjs.Sound.registerSound("./sounds/click.mp3", "click");
          createjs.Sound.registerSound("./sounds/drop_bounce_grass.mp3", "drop_bounce_grass");
          createjs.Sound.registerSound("./sounds/soundtrack.mp3", "soundtrack");
          createjs.Sound.registerSound("./sounds/goal.mp3", "goal");
          createjs.Sound.registerSound("./sounds/ball_saved.mp3", "ball_saved");
          createjs.Sound.registerSound("./sounds/kick.mp3", "kick");
          createjs.Sound.registerSound("./sounds/pole.mp3", "pole");
        }
        y += 7;
      }
    };
    /**
     * @return {undefined}
     */
    this._loadImages = function() {
      s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
      s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
      s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
      s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
      s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
      s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
      s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
      s_oSpriteLibrary.addSprite("but_home", "./sprites/but_home.png");
      s_oSpriteLibrary.addSprite("but_restart", "./sprites/but_restart.png");
      s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");
      s_oSpriteLibrary.addSprite("ball", "./sprites/ball.png");
      s_oSpriteLibrary.addSprite("but_level", "./sprites/but_level.png");
      s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
      s_oSpriteLibrary.addSprite("but_continue", "./sprites/but_continue.png");
      s_oSpriteLibrary.addSprite("but_yes", "./sprites/but_yes.png");
      s_oSpriteLibrary.addSprite("but_no", "./sprites/but_no.png");
      s_oSpriteLibrary.addSprite("but_info", "./sprites/but_info.png");
      s_oSpriteLibrary.addSprite("logo_ctl", "./sprites/logo_ctl.png");
      s_oSpriteLibrary.addSprite("but_pause", "./sprites/but_pause.png");
      s_oSpriteLibrary.addSprite("arrow_right", "./sprites/arrow_right.png");
      s_oSpriteLibrary.addSprite("arrow_left", "./sprites/arrow_left.png");
      s_oSpriteLibrary.addSprite("ball_shadow", "./sprites/ball_shadow.png");
      s_oSpriteLibrary.addSprite("start_ball", "./sprites/start_ball.png");
      s_oSpriteLibrary.addSprite("hand_touch", "./sprites/hand_touch.png");
      s_oSpriteLibrary.addSprite("cursor", "./sprites/cursor.png");
      s_oSpriteLibrary.addSprite("shot_left", "./sprites/shot_left.png");
      s_oSpriteLibrary.addSprite("goal", "./sprites/goal.png");
      /** @type {number} */
      var ww = 0;
      for (;NUM_SPRITE_PLAYER > ww;ww++) {
        s_oSpriteLibrary.addSprite("player_" + ww, "./sprites/player/player_" + ww + ".png");
      }
      /** @type {number} */
      ww = 0;
      for (;ww < NUM_SPRITE_GOALKEEPER[IDLE];ww++) {
        s_oSpriteLibrary.addSprite(SPRITE_NAME_GOALKEEPER[IDLE] + ww, "./sprites/goalkeeper_idle/gk_idle_" + ww + ".png");
      }
      /** @type {number} */
      ww = 0;
      for (;ww < NUM_SPRITE_GOALKEEPER[RIGHT];ww++) {
        s_oSpriteLibrary.addSprite(SPRITE_NAME_GOALKEEPER[RIGHT] + ww, "./sprites/goalkeeper_save_right/gk_save_right_" + ww + ".png");
      }
      /** @type {number} */
      ww = 0;
      for (;ww < NUM_SPRITE_GOALKEEPER[LEFT];ww++) {
        s_oSpriteLibrary.addSprite(SPRITE_NAME_GOALKEEPER[LEFT] + ww, "./sprites/goalkeeper_save_left/gk_save_left_" + ww + ".png");
      }
      /** @type {number} */
      ww = 0;
      for (;ww < NUM_SPRITE_GOALKEEPER[CENTER_DOWN];ww++) {
        s_oSpriteLibrary.addSprite(SPRITE_NAME_GOALKEEPER[CENTER_DOWN] + ww, "./sprites/goalkeeper_save_center_down/gk_save_center_down_" + ww + ".png");
      }
      /** @type {number} */
      ww = 0;
      for (;ww < NUM_SPRITE_GOALKEEPER[CENTER_UP];ww++) {
        s_oSpriteLibrary.addSprite(SPRITE_NAME_GOALKEEPER[CENTER_UP] + ww, "./sprites/goalkeeper_save_center_up/gk_save_center_up_" + ww + ".png");
      }
      /** @type {number} */
      ww = 0;
      for (;ww < NUM_SPRITE_GOALKEEPER[LEFT_DOWN];ww++) {
        s_oSpriteLibrary.addSprite(SPRITE_NAME_GOALKEEPER[LEFT_DOWN] + ww, "./sprites/goalkeeper_save_down_left/gk_save_down_left_" + ww + ".png");
      }
      /** @type {number} */
      ww = 0;
      for (;ww < NUM_SPRITE_GOALKEEPER[RIGHT_DOWN];ww++) {
        s_oSpriteLibrary.addSprite(SPRITE_NAME_GOALKEEPER[RIGHT_DOWN] + ww, "./sprites/goalkeeper_save_down_right/gk_save_down_right_" + ww + ".png");
      }
      y += s_oSpriteLibrary.getNumSprites();
      s_oSpriteLibrary.loadSprites();
    };
    /**
     * @return {undefined}
     */
    this._onImagesLoaded = function() {
      x++;
      /** @type {number} */
      var tabIndex = Math.floor(x / y * 100);
      element.refreshLoader(tabIndex);
      if (x === y) {
        element.unload();
        if (!(DISABLE_SOUND_MOBILE !== false && s_bMobile !== false)) {
          s_oSoundTrack = createjs.Sound.play("soundtrack", {
            loop : -1
          });
        }
        this.gotoMenu();
      }
    };
    /**
     * @return {undefined}
     */
    this._onAllImagesLoaded = function() {
    };
    /**
     * @return {undefined}
     */
    this.onAllPreloaderImagesLoaded = function() {
      this._loadImages();
    };
    /**
     * @return {undefined}
     */
    this.preloaderReady = function() {
      if (!(DISABLE_SOUND_MOBILE !== false && s_bMobile !== false)) {
        this._initSounds();
        s_oSoundTrack = createjs.Sound.play("soundtrack", {
          loop : -1
        });
      }
      this._loadImages();
      /** @type {boolean} */
      t = true;
    };
    /**
     * @return {undefined}
     */
    this.gotoMenu = function() {
      o = new CMenu;
      c = STATE_MENU;
    };
    /**
     * @return {undefined}
     */
    this.gotoGame = function() {
      line = new CGame(n);
      c = STATE_GAME;
    };
    /**
     * @return {undefined}
     */
    this.gotoHelp = function() {
      a = new CHelp;
      c = STATE_HELP;
    };
    /**
     * @return {undefined}
     */
    this.stopUpdate = function() {
      /** @type {boolean} */
      t = false;
      /** @type {boolean} */
      createjs.Ticker.paused = true;
      $("#block_game").css("display", "block");
      createjs.Sound.setMute(true);
    };
    /**
     * @return {undefined}
     */
    this.startUpdate = function() {
      /** @type {number} */
      s_iPrevTime = (new Date).getTime();
      /** @type {boolean} */
      t = true;
      /** @type {boolean} */
      createjs.Ticker.paused = false;
      $("#block_game").css("display", "none");
      if (s_bAudioActive) {
        createjs.Sound.setMute(false);
      }
    };
    /**
     * @param {?} element
     * @return {undefined}
     */
    this._update = function(element) {
      if (t !== false) {
        /** @type {number} */
        var n = (new Date).getTime();
        /** @type {number} */
        s_iTimeElaps = n - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        /** @type {number} */
        s_iPrevTime = n;
        if (s_iCntTime >= 1E3) {
          s_iCurFps = s_iCntFps;
          s_iCntTime -= 1E3;
          /** @type {number} */
          s_iCntFps = 0;
        }
        if (c === STATE_GAME) {
          line.update();
        }
        s_oStage.update(element);
      }
    };
    s_oMain = this;
    /** @type {number} */
    n = step;
    this.initContainer();
  }
  /**
   * @param {number} params
   * @param {number} name
   * @param {?} walkers
   * @param {?} fragment
   * @return {?}
   */
  function CGoal(params, name, walkers, fragment) {
    var o;
    var node;
    return this._init = function(protoProps, message, obj) {
      o = createBitmap(obj);
      this.setPosition(protoProps, message);
      o.cache(0, 0, obj.width, obj.height);
      node.addChild(o);
    }, this.unload = function() {
      node.removeChild(o);
    }, this.setPosition = function(x, y) {
      /** @type {number} */
      o.x = x;
      o.y = y;
    }, this.getDepthPos = function() {
      return GOAL_SPRITE_SWAP_Y;
    }, this.getObject = function() {
      return o;
    }, node = fragment, this._init(params, name, walkers), this;
  }
  /**
   * @return {?}
   */
  function CPause() {
    var p;
    var item;
    return this._init = function() {
      p = new createjs.Container;
      /** @type {number} */
      p.alpha = 0;
      item = new createjs.Shape;
      item.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      /** @type {number} */
      item.alpha = 0.5;
      item.on("click", function() {
      });
      p.addChild(item);
      var c = new createjs.Text(TEXT_PAUSE, "70px " + FONT_GAME, TEXT_COLOR);
      /** @type {number} */
      c.x = 0.5 * CANVAS_WIDTH;
      /** @type {number} */
      c.y = 0.5 * CANVAS_HEIGHT - 100;
      /** @type {string} */
      c.textAlign = "center";
      p.addChild(c);
      var s = new createjs.Text(TEXT_PAUSE, "70px " + FONT_GAME, TEXT_COLOR_STROKE);
      /** @type {number} */
      s.x = 0.5 * CANVAS_WIDTH;
      /** @type {number} */
      s.y = 0.5 * CANVAS_HEIGHT - 100;
      s.outline = OUTLINE_WIDTH;
      /** @type {string} */
      s.textAlign = "center";
      p.addChild(s);
      var newNode;
      var parent = s_oSpriteLibrary.getSprite("but_continue");
      newNode = new CGfxButton(0.5 * CANVAS_WIDTH, 0.5 * CANVAS_HEIGHT + 70, parent, p);
      newNode.addEventListener(ON_MOUSE_UP, this._onLeavePause, this);
      s_oStage.addChild(p);
      var opts = this;
      createjs.Tween.get(p).to({
        alpha : 1
      }, 150, createjs.quartOut).call(function() {
        opts.onPause(true);
      });
    }, this.onPause = function(recurring) {
      s_oGame.pause(recurring);
    }, this.unload = function() {
      item.off("click", function() {
      });
      s_oStage.removeChild(p);
    }, this._onLeavePause = function() {
      playSound("click", 1, 0);
      /** @type {boolean} */
      createjs.Ticker.paused = false;
      createjs.Tween.removeTweens(p);
      var opts = this;
      createjs.Tween.get(p).to({
        alpha : 0
      }, 150, createjs.quartIn).call(function() {
        opts.onPause(false);
        s_oInterface.unloadPause();
      });
    }, this._init(), this;
  }
  /**
   * @return {undefined}
   */
  function CPreloader() {
    var width;
    var height;
    var stage;
    var context;
    var p;
    var _back;
    var me;
    var renderer;
    /**
     * @return {undefined}
     */
    this._init = function() {
      s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
      s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
      s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
      s_oSpriteLibrary.loadSprites();
      renderer = new createjs.Container;
      s_oStage.addChild(renderer);
    };
    /**
     * @return {undefined}
     */
    this.unload = function() {
      renderer.removeAllChildren();
    };
    /**
     * @return {undefined}
     */
    this.hide = function() {
      var widget = this;
      setTimeout(function() {
        createjs.Tween.get(me).to({
          alpha : 1
        }, 500).call(function() {
          widget.unload();
          s_oMain.gotoMenu();
        });
      }, 1E3);
    };
    /**
     * @return {undefined}
     */
    this._onImagesLoaded = function() {
    };
    /**
     * @return {undefined}
     */
    this._onAllImagesLoaded = function() {
      this.attachSprites();
      s_oMain.preloaderReady();
    };
    /**
     * @return {undefined}
     */
    this.attachSprites = function() {
      var sphere = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
      renderer.addChild(sphere);
      var win = s_oSpriteLibrary.getSprite("progress_bar");
      p = createBitmap(win);
      /** @type {number} */
      p.x = CANVAS_WIDTH / 2 - win.width / 2;
      /** @type {number} */
      p.y = CANVAS_HEIGHT - 200;
      renderer.addChild(p);
      width = win.width;
      height = win.height;
      _back = new createjs.Shape;
      _back.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(p.x, p.y, 1, height);
      renderer.addChild(_back);
      p.mask = _back;
      stage = new createjs.Text("", "30px " + FONT_GAME, "#fff");
      /** @type {number} */
      stage.x = CANVAS_WIDTH / 2;
      /** @type {number} */
      stage.y = CANVAS_HEIGHT - 200;
      /** @type {string} */
      stage.textBaseline = "alphabetic";
      /** @type {string} */
      stage.textAlign = "center";
      renderer.addChild(stage);
      context = new createjs.Text("", "30px " + SECONDARY_FONT, "#fff");
      context.x = CANVAS_WIDTH + 200;
      context.y = CANVAS_HEIGHT + 200;
      /** @type {string} */
      context.textBaseline = "alphabetic";
      /** @type {string} */
      context.textAlign = "center";
      renderer.addChild(context);
      me = new createjs.Shape;
      me.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      /** @type {number} */
      me.alpha = 0;
      renderer.addChild(me);
    };
    /**
     * @param {number} index
     * @return {undefined}
     */
    this.refreshLoader = function(index) {
      /** @type {string} */
      stage.text = index + "%";
      /** @type {string} */
      context.text = index + "%";
      _back.graphics.clear();
      /** @type {number} */
      var canvas_width = Math.floor(index * width / 100);
      _back.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(p.x, p.y, canvas_width, height);
    };
    this._init();
  }
  /**
   * @param {number} params
   * @param {number} name
   * @param {?} walkers
   * @param {number} html
   * @param {(number|string)} count
   * @param {string} deepDataAndEvents
   * @param {number} opt_e
   * @return {?}
   */
  function CTextButton(params, name, walkers, html, count, deepDataAndEvents, opt_e) {
    var data;
    var list;
    var target;
    return this._init = function(protoProps, keepData, obj, config, params, deepDataAndEvents, val) {
      /** @type {Array} */
      data = new Array;
      /** @type {Array} */
      list = new Array;
      var s = createBitmap(obj);
      /** @type {number} */
      var height = Math.ceil(val / 20);
      var stage = new createjs.Text(config, "bold " + val + "px " + params, "#000000");
      /** @type {string} */
      stage.textAlign = "center";
      /** @type {string} */
      stage.textBaseline = "alphabetic";
      var testNode = stage.getBounds();
      /** @type {number} */
      stage.x = obj.width / 2 + height;
      /** @type {number} */
      stage.y = Math.floor(obj.height / 2) + testNode.height / 3 + height;
      var context = new createjs.Text(config, "bold " + val + "px " + params, deepDataAndEvents);
      /** @type {string} */
      context.textAlign = "center";
      /** @type {string} */
      context.textBaseline = "alphabetic";
      testNode = context.getBounds();
      /** @type {number} */
      context.x = obj.width / 2;
      /** @type {number} */
      context.y = Math.floor(obj.height / 2) + testNode.height / 3;
      target = new createjs.Container;
      /** @type {number} */
      target.x = protoProps;
      /** @type {number} */
      target.y = keepData;
      /** @type {number} */
      target.regX = obj.width / 2;
      /** @type {number} */
      target.regY = obj.height / 2;
      target.addChild(s, stage, context);
      if (!s_bMobile) {
        /** @type {string} */
        target.cursor = "pointer";
      }
      s_oStage.addChild(target);
      this._initListener();
    }, this.unload = function() {
      target.off("mousedown");
      target.off("pressup");
      s_oStage.removeChild(target);
    }, this.setVisible = function(recurring) {
      /** @type {boolean} */
      target.visible = recurring;
    }, this._initListener = function() {
      oParent = this;
      target.on("mousedown", this.buttonDown);
      target.on("pressup", this.buttonRelease);
    }, this.addEventListener = function(type, listener, mayParseLabeledStatementInstead) {
      /** @type {Function} */
      data[type] = listener;
      /** @type {boolean} */
      list[type] = mayParseLabeledStatementInstead;
    }, this.buttonRelease = function() {
      /** @type {number} */
      target.scaleX = 1;
      /** @type {number} */
      target.scaleY = 1;
      playSound("click", 1, 0);
      if (data[ON_MOUSE_UP]) {
        data[ON_MOUSE_UP].call(list[ON_MOUSE_UP]);
      }
    }, this.buttonDown = function() {
      /** @type {number} */
      target.scaleX = 0.9;
      /** @type {number} */
      target.scaleY = 0.9;
      if (data[ON_MOUSE_DOWN]) {
        data[ON_MOUSE_DOWN].call(list[ON_MOUSE_DOWN]);
      }
    }, this.setPosition = function(x, y) {
      /** @type {number} */
      target.x = x;
      target.y = y;
    }, this.setX = function(x) {
      target.x = x;
    }, this.setY = function(y) {
      /** @type {number} */
      target.y = y;
    }, this.getButtonImage = function() {
      return target;
    }, this.getX = function() {
      return target.x;
    }, this.getY = function() {
      return target.y;
    }, this._init(params, name, walkers, html, count, deepDataAndEvents, opt_e), this;
  }
  /**
   * @return {undefined}
   */
  function CCreditsPanel() {
    var rvar;
    var pdataOld;
    var listenerObj;
    var restoreScript;
    var udataCur;
    var r20;
    var suiteView;
    var lastCoords;
    var rreturn;
    /** @type {number} */
    var c = 0;
    /**
     * @return {undefined}
     */
    this[_0x3619[0]] = function() {
      rreturn = new createjs.Container;
      s_oStage[_0x3619[1]](rreturn);
      var results = s_oSpriteLibrary[_0x3619[3]](_0x3619[2]);
      r20 = new createjs.Shape;
      r20[_0x3619[7]][_0x3619[6]](_0x3619[5])[_0x3619[4]](0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      /** @type {number} */
      r20[_0x3619[8]] = 0.5;
      r20[_0x3619[10]](_0x3619[9], this._onLogoButRelease);
      r20[_0x3619[11]] = _0x3619[12];
      rreturn[_0x3619[1]](r20);
      rvar = createBitmap(results);
      rvar[_0x3619[13]] = CANVAS_WIDTH_HALF;
      rvar[_0x3619[14]] = CANVAS_HEIGHT_HALF;
      /** @type {number} */
      rvar[_0x3619[15]] = 0.5 * results[_0x3619[16]];
      /** @type {number} */
      rvar[_0x3619[17]] = 0.5 * results[_0x3619[18]];
      rreturn[_0x3619[1]](rvar);
      udataCur = new createjs.Shape;
      udataCur[_0x3619[7]][_0x3619[6]](_0x3619[19])[_0x3619[4]](CANVAS_WIDTH - 2 * EDGEBOARD_X, CANVAS_HEIGHT - 2 * EDGEBOARD_Y, 2 * EDGEBOARD_X, 2 * EDGEBOARD_Y);
      /** @type {number} */
      udataCur[_0x3619[8]] = 0.01;
      udataCur[_0x3619[10]](_0x3619[9], this[_0x3619[20]]);
      udataCur[_0x3619[11]] = _0x3619[12];
      rreturn[_0x3619[1]](udataCur);
      var src = s_oSpriteLibrary[_0x3619[3]](_0x3619[21]);
      lastCoords = {
        x : 0.5 * CANVAS_WIDTH + 270,
        y : 181
      };
      listenerObj = new CGfxButton(lastCoords[_0x3619[13]], lastCoords[_0x3619[14]], src, rreturn);
      listenerObj[_0x3619[23]](ON_MOUSE_UP, this[_0x3619[22]], this);
      restoreScript = new createjs.Text(_0x3619[24], _0x3619[25] + FONT_GAME, _0x3619[26]);
      restoreScript[_0x3619[27]] = _0x3619[28];
      restoreScript[_0x3619[29]] = _0x3619[30];
      /** @type {number} */
      restoreScript[_0x3619[13]] = CANVAS_WIDTH / 2;
      /** @type {number} */
      restoreScript[_0x3619[14]] = 230;
      rreturn[_0x3619[1]](restoreScript);
      src = s_oSpriteLibrary[_0x3619[3]](_0x3619[31]);
      pdataOld = createBitmap(src);
      /** @type {number} */
      pdataOld[_0x3619[15]] = src[_0x3619[16]] / 2;
      /** @type {number} */
      pdataOld[_0x3619[17]] = src[_0x3619[18]] / 2;
      /** @type {number} */
      pdataOld[_0x3619[13]] = CANVAS_WIDTH / 2;
      /** @type {number} */
      pdataOld[_0x3619[14]] = 310;
      rreturn[_0x3619[1]](pdataOld);
      suiteView = new createjs.Text(_0x3619[32], _0x3619[33] + FONT_GAME, _0x3619[26]);
      suiteView[_0x3619[27]] = _0x3619[28];
      suiteView[_0x3619[29]] = _0x3619[30];
      /** @type {number} */
      suiteView[_0x3619[13]] = CANVAS_WIDTH / 2;
      /** @type {number} */
      suiteView[_0x3619[14]] = 420;
      rreturn[_0x3619[1]](suiteView);
    };
    /**
     * @return {undefined}
     */
    this[_0x3619[20]] = function() {
      if (5 === c) {
        var r20 = new createjs.Text(_0x3619[34], _0x3619[35] + FONT_GAME, TEXT_COLOR);
        r20[_0x3619[27]] = _0x3619[28];
        r20[_0x3619[29]] = _0x3619[36];
        /** @type {number} */
        r20[_0x3619[37]] = 500;
        var udataCur = new createjs.Text(_0x3619[34], _0x3619[35] + FONT_GAME, TEXT_COLOR_STROKE);
        udataCur[_0x3619[27]] = _0x3619[28];
        udataCur[_0x3619[29]] = _0x3619[36];
        /** @type {number} */
        udataCur[_0x3619[37]] = 500;
        /** @type {number} */
        udataCur[_0x3619[38]] = 1;
        var restoreScript = new createjs.Container;
        restoreScript[_0x3619[1]](r20);
        restoreScript[_0x3619[1]](udataCur);
        restoreScript[_0x3619[13]] = CANVAS_WIDTH_HALF;
        /** @type {number} */
        restoreScript[_0x3619[14]] = -r20[_0x3619[39]]()[_0x3619[18]];
        rreturn[_0x3619[1]](restoreScript);
        createjs[_0x3619[48]][_0x3619[47]](restoreScript)[_0x3619[44]]({
          y : CANVAS_HEIGHT_HALF + 200
        }, 1E3, createjs[_0x3619[43]][_0x3619[46]])[_0x3619[45]](3E3)[_0x3619[44]]({
          alpha : 0
        }, 1E3, createjs[_0x3619[43]][_0x3619[42]])[_0x3619[41]](function() {
          rreturn[_0x3619[40]](r20);
          /** @type {number} */
          c = 0;
        });
      }
      c++;
    };
    /**
     * @return {undefined}
     */
    this[_0x3619[22]] = function() {
      r20[_0x3619[49]](_0x3619[9], this._onLogoButRelease);
      listenerObj[_0x3619[22]]();
      /** @type {null} */
      listenerObj = null;
      udataCur[_0x3619[50]]();
      s_oStage[_0x3619[40]](rreturn);
    };
    /**
     * @return {undefined}
     */
    this[_0x3619[51]] = function() {
      window[_0x3619[54]](_0x3619[52], _0x3619[53]);
    };
    this._init();
  }
  /**
   * @param {number} params
   * @return {?}
   */
  function CLosePanel(params) {
    var shape;
    var c;
    var s;
    var p;
    var tile;
    var item;
    /** @type {null} */
    var obj = null;
    /** @type {boolean} */
    var l = false;
    return this._init = function(protoProps) {
      item = new createjs.Shape;
      item.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      /** @type {number} */
      item.alpha = 0;
      s_oStage.addChild(item);
      p = new createjs.Container;
      /** @type {number} */
      p.alpha = 1;
      /** @type {boolean} */
      p.visible = false;
      p.y = CANVAS_HEIGHT;
      shape = createBitmap(protoProps);
      shape.x = CANVAS_WIDTH_HALF;
      shape.y = CANVAS_HEIGHT_HALF;
      /** @type {number} */
      shape.regX = 0.5 * protoProps.width;
      /** @type {number} */
      shape.regY = 0.5 * protoProps.height;
      p.addChild(shape);
      c = new createjs.Text("", "45px " + FONT_GAME, "#ffffff");
      /** @type {number} */
      c.x = CANVAS_WIDTH / 2;
      c.y = CANVAS_HEIGHT_HALF;
      /** @type {string} */
      c.textAlign = "center";
      /** @type {string} */
      c.textBaseline = "middle";
      p.addChild(c);
      s = new createjs.Text("", "bold 100px " + FONT_GAME, "#ffffff");
      /** @type {number} */
      s.x = CANVAS_WIDTH / 2;
      /** @type {number} */
      s.y = CANVAS_HEIGHT_HALF - 210;
      /** @type {string} */
      s.textAlign = "center";
      p.addChild(s);
      s_oStage.addChild(p);
      var id = s_oSpriteLibrary.getSprite("but_home");
      obj = new CGfxButton(0.5 * CANVAS_WIDTH - 360, 0.5 * CANVAS_HEIGHT + 180, id, p);
      obj.addEventListener(ON_MOUSE_DOWN, this._onExit, this);
      var y = s_oSpriteLibrary.getSprite("but_restart");
      tile = new CGfxButton(0.5 * CANVAS_WIDTH + 360, 0.5 * CANVAS_HEIGHT + 180, y, p);
      tile.addEventListener(ON_MOUSE_DOWN, this._onRestart, this);
      tile.pulseAnimation();
    }, this.unload = function() {
      createjs.Tween.get(p).to({
        alpha : 0
      }, 500, createjs.Ease.cubicOut).call(function() {
        s_oStage.removeChild(p);
        if (null !== obj) {
          obj.unload();
          /** @type {null} */
          obj = null;
        }
        item.removeAllEventListeners();
        tile.unload();
        /** @type {null} */
        tile = null;
      });
    }, this.show = function(delay, positions) {
      c.text = TEXT_LOSE_RESULT + " " + delay + " " + TEXT_OF + " " + positions + " " + TEXT_BALLS;
      s.text = TEXT_LOSE;
      /** @type {boolean} */
      p.visible = true;
      createjs.Tween.get(item).to({
        alpha : 0.5
      }, 500, createjs.Ease.cubicOut);
      item.on("click", function() {
      });
      createjs.Tween.get(p).wait(250).to({
        y : 0
      }, 1250, createjs.Ease.elasticOut).call(function() {
        if (s_iAdsLevel === NUM_LEVEL_FOR_ADS) {
          $(s_oMain).trigger("show_interlevel_ad");
          /** @type {number} */
          s_iAdsLevel = 1;
        } else {
          s_iAdsLevel++;
        }
      });
    }, this._onRestart = function() {
      if (!l) {
        /** @type {boolean} */
        l = true;
        this.unload();
        createjs.Tween.get(item).to({
          alpha : 0
        }, 400, createjs.Ease.cubicOut).call(function() {
          s_oStage.removeChild(item);
        });
        s_oGame.restartLevel();
      }
    }, this._onExit = function() {
      if (!l) {
        /** @type {boolean} */
        l = true;
        this.unload();
        s_oGame.onExit();
      }
    }, this._init(params), this;
  }
  /**
   * @return {undefined}
   */
  function CMenu() {
    var pos;
    var lastCoords;
    var currentPoint;
    var demoWidget;
    var tile;
    var ctx;
    var item;
    var obj;
    /**
     * @return {undefined}
     */
    this._init = function() {
      demoWidget = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
      s_oStage.addChild(demoWidget);
      var star = s_oSpriteLibrary.getSprite("but_play");
      if (lastCoords = {
        x : CANVAS_WIDTH / 2 + 110,
        y : CANVAS_HEIGHT - 130
      }, tile = new CGfxButton(lastCoords.x, lastCoords.y, star), tile.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this), tile.pulseAnimation(), s_iBestScore = getItem(LOCALSTORAGE_STRING[LOCAL_BEST_SCORE]), null === s_iBestScore && (s_iBestScore = 0), DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
        star = s_oSpriteLibrary.getSprite("audio_icon");
        pos = {
          x : CANVAS_WIDTH - star.height / 2 - 10,
          y : star.height / 2 + 10
        };
        obj = new CToggle(pos.x, pos.y, star, s_bAudioActive);
        obj.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
      }
      var me = s_oSpriteLibrary.getSprite("but_info");
      currentPoint = {
        x : star.height / 2 + 10,
        y : star.height / 2 + 10
      };
      ctx = new CGfxButton(currentPoint.x, currentPoint.y, me, s_oStage);
      ctx.addEventListener(ON_MOUSE_UP, this._onButInfoRelease, this);
      item = new createjs.Shape;
      item.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      s_oStage.addChild(item);
      createjs.Tween.get(item).to({
        alpha : 0
      }, 1E3).call(function() {
        /** @type {boolean} */
        item.visible = false;
      });
      this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };
    /**
     * @param {number} offset
     * @param {number} y
     * @return {undefined}
     */
    this.refreshButtonPos = function(offset, y) {
      if (!(DISABLE_SOUND_MOBILE !== false && s_bMobile !== false)) {
        obj.setPosition(pos.x - offset, y + pos.y);
      }
      ctx.setPosition(currentPoint.x + offset, currentPoint.y + y);
    };
    /**
     * @return {undefined}
     */
    this.unload = function() {
      tile.unload();
      /** @type {null} */
      tile = null;
      if (!(DISABLE_SOUND_MOBILE !== false && s_bMobile !== false)) {
        obj.unload();
        /** @type {null} */
        obj = null;
      }
      s_oStage.removeAllChildren();
      /** @type {null} */
      s_oMenu = null;
    };
    /**
     * @return {undefined}
     */
    this._onButPlayRelease = function() {
      this.unload();
      playSound("click", 1, 0);
      s_oMain.gotoGame();
    };
    /**
     * @return {undefined}
     */
    this._onAudioToggle = function() {
      createjs.Sound.setMute(s_bAudioActive);
      /** @type {boolean} */
      s_bAudioActive = !s_bAudioActive;
    };
    /**
     * @return {undefined}
     */
    this._onButInfoRelease = function() {
      new CCreditsPanel;
    };
    s_oMenu = this;
    this._init();
  }
  /**
   * @param {number} params
   * @param {number} name
   * @return {undefined}
   */
  function CVector2(params, name) {
    var x;
    var y;
    /**
     * @param {number} protoProps
     * @param {number} keepData
     * @return {undefined}
     */
    this._init = function(protoProps, keepData) {
      /** @type {number} */
      x = protoProps;
      /** @type {number} */
      y = keepData;
    };
    /**
     * @param {?} name
     * @param {string} var_args
     * @return {undefined}
     */
    this.add = function(name, var_args) {
      x += name;
      y += var_args;
    };
    /**
     * @param {?} rect
     * @return {undefined}
     */
    this.addV = function(rect) {
      x += rect.getX();
      y += rect.getY();
    };
    /**
     * @param {?} n
     * @return {undefined}
     */
    this.scalarDivision = function(n) {
      x /= n;
      y /= n;
    };
    /**
     * @param {?} v
     * @return {undefined}
     */
    this.subtract = function(v) {
      x -= v.getX();
      y -= v.getY();
    };
    /**
     * @param {number} value
     * @return {undefined}
     */
    this.scalarProduct = function(value) {
      x *= value;
      y *= value;
    };
    /**
     * @return {undefined}
     */
    this.invert = function() {
      x *= -1;
      y *= -1;
    };
    /**
     * @param {?} b
     * @return {?}
     */
    this.dotProduct = function(b) {
      return x * b.getX() + y * b.getY();
    };
    /**
     * @param {number} recurring
     * @param {number} value
     * @return {undefined}
     */
    this.set = function(recurring, value) {
      /** @type {number} */
      x = recurring;
      /** @type {number} */
      y = value;
    };
    /**
     * @param {?} rect
     * @return {undefined}
     */
    this.setV = function(rect) {
      x = rect.getX();
      y = rect.getY();
    };
    /**
     * @return {?}
     */
    this.length = function() {
      return Math.sqrt(x * x + y * y);
    };
    /**
     * @return {?}
     */
    this.length2 = function() {
      return x * x + y * y;
    };
    /**
     * @return {undefined}
     */
    this.normalize = function() {
      var len = this.length();
      if (len > 0) {
        x /= len;
        y /= len;
      }
    };
    /**
     * @param {Array} direction
     * @return {?}
     */
    this.angleBetweenVectors = function(direction) {
      /** @type {number} */
      var chr2 = Math.acos(this.dotProduct(direction) / (this.length() * direction.length()));
      return isNaN(chr2) === true ? 0 : chr2;
    };
    /**
     * @param {Node} vec
     * @return {undefined}
     */
    this.getNormalize = function(vec) {
      this.length();
      vec.set(x, y);
      vec.normalize();
    };
    /**
     * @return {undefined}
     */
    this.rot90CCW = function() {
      var value = x;
      /** @type {number} */
      x = -y;
      y = value;
    };
    /**
     * @return {undefined}
     */
    this.rot90CW = function() {
      var tileU = x;
      x = y;
      /** @type {number} */
      y = -tileU;
    };
    /**
     * @param {(Node|string)} normals
     * @return {undefined}
     */
    this.getRotCCW = function(normals) {
      normals.set(x, y);
      normals.rot90CCW();
    };
    /**
     * @param {(Node|string)} normals
     * @return {undefined}
     */
    this.getRotCW = function(normals) {
      normals.set(x, y);
      normals.rot90CW();
    };
    /**
     * @return {undefined}
     */
    this.ceil = function() {
      /** @type {number} */
      x = Math.ceil(x);
      /** @type {number} */
      y = Math.ceil(y);
    };
    /**
     * @return {undefined}
     */
    this.round = function() {
      /** @type {number} */
      x = Math.round(x);
      /** @type {number} */
      y = Math.round(y);
    };
    /**
     * @return {?}
     */
    this.toString = function() {
      return "Vector2: " + x + ", " + y;
    };
    /**
     * @return {undefined}
     */
    this.print = function() {
      trace("Vector2: " + x + ", " + y);
    };
    /**
     * @return {?}
     */
    this.getX = function() {
      return x;
    };
    /**
     * @return {?}
     */
    this.getY = function() {
      return y;
    };
    /**
     * @param {?} radians
     * @return {undefined}
     */
    this.rotate = function(radians) {
      var tx = x;
      var ty = y;
      /** @type {number} */
      x = tx * Math.cos(radians) - ty * Math.sin(radians);
      /** @type {number} */
      y = tx * Math.sin(radians) + ty * Math.cos(radians);
    };
    this._init(params, name);
  }
  /**
   * @param {Function} dataAndEvents
   * @param {Array} m3
   * @param {number} params
   * @param {?} computed
   * @return {?}
   */
  function CHandSwipeAnim(dataAndEvents, m3, params, computed) {
    var target;
    var item;
    var result = computed;
    /** @type {Function} */
    var position = dataAndEvents;
    /** @type {Array} */
    var c = m3;
    /** @type {boolean} */
    var isAnimate = false;
    return this._init = function(protoProps) {
      item = new createjs.Container;
      target = createBitmap(protoProps);
      target.x = position.x;
      target.y = position.y;
      /** @type {number} */
      target.regX = 0.5 * protoProps.width;
      /** @type {number} */
      target.regY = 0.5 * protoProps.height;
      /** @type {number} */
      target.alpha = 0;
      result.addChild(item);
      item.addChild(target);
    }, this.animAllSwipe = function() {
      /** @type {boolean} */
      isAnimate = true;
      var animAllSwipe = this;
      createjs.Tween.get(target).to({
        alpha : 1
      }, 0.1 * MS_TIME_SWIPE_END).wait(0.3 * MS_TIME_SWIPE_END).to({
        alpha : 0
      }, 0.5 * MS_TIME_SWIPE_END, createjs.Ease.quartOut);
      createjs.Tween.get(target).to({
        x : c[0].x,
        y : c[0].y
      }, MS_TIME_SWIPE_END, createjs.Ease.quartOut).call(function() {
        target.x = position.x;
        target.y = position.y;
        createjs.Tween.get(target).to({
          alpha : 1
        }, 0.1 * MS_TIME_SWIPE_END).wait(0.3 * MS_TIME_SWIPE_END).to({
          alpha : 0
        }, 0.5 * MS_TIME_SWIPE_END, createjs.Ease.quartOut);
        createjs.Tween.get(target).to({
          x : c[1].x,
          y : c[1].y
        }, MS_TIME_SWIPE_END, createjs.Ease.quartOut).call(function() {
          target.x = position.x;
          target.y = position.y;
          createjs.Tween.get(target).to({
            alpha : 1
          }, 0.1 * MS_TIME_SWIPE_END).wait(0.3 * MS_TIME_SWIPE_END).to({
            alpha : 0
          }, 0.5 * MS_TIME_SWIPE_END, createjs.Ease.quartOut);
          createjs.Tween.get(target).to({
            x : c[2].x,
            y : c[2].y
          }, MS_TIME_SWIPE_END, createjs.Ease.quartOut).call(function() {
            target.x = position.x;
            target.y = position.y;
            animAllSwipe.animAllSwipe();
          });
        });
      });
    }, this.fadeAnim = function(recurring) {
      createjs.Tween.get(item, {
        override : true
      }).to({
        alpha : recurring
      }, 250);
    }, this.isAnimate = function() {
      return isAnimate;
    }, this.setVisible = function(recurring) {
      /** @type {boolean} */
      target.visible = recurring;
    }, this.removeTweens = function() {
      createjs.Tween.removeTweens(target);
      /** @type {boolean} */
      isAnimate = false;
    }, this._init(params), this;
  }
  /** @type {number} */
  var CANVAS_WIDTH = 1360;
  /** @type {number} */
  var CANVAS_HEIGHT = 640;
  /** @type {number} */
  var CANVAS_WIDTH_HALF = 0.5 * CANVAS_WIDTH;
  /** @type {number} */
  var CANVAS_HEIGHT_HALF = 0.5 * CANVAS_HEIGHT;
  /** @type {number} */
  var EDGEBOARD_X = 250;
  /** @type {number} */
  var EDGEBOARD_Y = 20;
  /** @type {boolean} */
  var DISABLE_SOUND_MOBILE = false;
  /** @type {string} */
  var FONT_GAME = "blackplotanregular";
  /** @type {string} */
  var SECONDARY_FONT = "blackplotanregular";
  /** @type {number} */
  var FPS = 30;
  /** @type {number} */
  var FPS_DESKTOP = 60;
  /** @type {number} */
  var FPS_TIME = 1 / FPS;
  /** @type {number} */
  var ROLL_BALL_RATE = 60 / FPS;
  /** @type {number} */
  var STATE_LOADING = 0;
  /** @type {number} */
  var STATE_MENU = 1;
  /** @type {number} */
  var STATE_HELP = 1;
  /** @type {number} */
  var STATE_GAME = 3;
  /** @type {number} */
  var ON_MOUSE_DOWN = 0;
  /** @type {number} */
  var ON_MOUSE_UP = 1;
  /** @type {number} */
  var ON_MOUSE_OVER = 2;
  /** @type {number} */
  var ON_MOUSE_OUT = 3;
  /** @type {number} */
  var ON_DRAG_START = 4;
  /** @type {number} */
  var ON_DRAG_END = 5;
  /** @type {number} */
  var ON_TWEEN_ENDED = 6;
  /** @type {number} */
  var ON_BUT_NO_DOWN = 7;
  /** @type {number} */
  var ON_BUT_YES_DOWN = 8;
  /** @type {number} */
  var STEP_RATE = 1.5;
  /** @type {Array} */
  var TEXT_SIZE = [80, 100, 130];
  /** @type {number} */
  var LOCAL_BEST_SCORE = 0;
  var START_HAND_SWIPE_POS = {
    x : CANVAS_WIDTH_HALF,
    y : CANVAS_HEIGHT_HALF + 200
  };
  /** @type {Array} */
  var END_HAND_SWIPE_POS = [{
    x : CANVAS_WIDTH_HALF - 250,
    y : CANVAS_HEIGHT_HALF - 200
  }, {
    x : CANVAS_WIDTH_HALF,
    y : CANVAS_HEIGHT_HALF - 200
  }, {
    x : CANVAS_WIDTH_HALF + 250,
    y : CANVAS_HEIGHT_HALF - 200
  }];
  /** @type {number} */
  var MS_TIME_SWIPE_END = 1E3;
  /** @type {number} */
  var MS_TIME_SWIPE_START = 3E3;
  /** @type {number} */
  var MS_TIME_FADE_HELP_TEXT = 500;
  /** @type {Array} */
  var LOCALSTORAGE_STRING = ["penalty_best_score"];
  /** @type {Array} */
  var TEXT_EXCELLENT_COLOR = ["#fff", "#5d96fe"];
  /** @type {string} */
  var TEXT_COLOR = "#ffffff";
  /** @type {string} */
  var TEXT_COLOR_1 = "#ff2222";
  /** @type {string} */
  var TEXT_COLOR_STROKE = "#002a59";
  /** @type {number} */
  var OUTLINE_WIDTH = 1.5;
  /** @type {number} */
  var TIME_INTERVAL_STROBE = 0.2;
  /** @type {number} */
  var PHYSICS_ACCURACY = 3;
  /** @type {number} */
  var MOBILE_OFFSET_GLOVES_X = -100;
  /** @type {number} */
  var BALL_VELOCITY_MULTIPLIER = 1;
  /** @type {number} */
  var PHYSICS_STEP = 1 / (FPS * STEP_RATE);
  /** @type {number} */
  var MS_WAIT_SHOW_GAME_OVER_PANEL = 250;
  /** @type {number} */
  var STATE_INIT = 0;
  /** @type {number} */
  var STATE_PLAY = 1;
  /** @type {number} */
  var STATE_FINISH = 2;
  /** @type {number} */
  var STATE_PAUSE = 3;
  /** @type {number} */
  var IDLE = 0;
  /** @type {number} */
  var RIGHT = 1;
  /** @type {number} */
  var LEFT = 2;
  /** @type {number} */
  var CENTER_DOWN = 3;
  /** @type {number} */
  var CENTER_UP = 4;
  /** @type {number} */
  var LEFT_DOWN = 5;
  /** @type {number} */
  var RIGHT_DOWN = 6;
  /** @type {Array} */
  var ANIM_GOAL_KEEPER_FAIL = [LEFT, RIGHT, CENTER_DOWN, CENTER_UP, LEFT_DOWN, RIGHT_DOWN];
  /** @type {Array} */
  var ANIM_GOAL_KEEPER_FAIL_ALT = [LEFT, RIGHT, LEFT_DOWN, RIGHT_DOWN];
  /** @type {number} */
  var NUM_SPRITE_PLAYER = 31;
  /** @type {Array} */
  var SPRITE_NAME_GOALKEEPER = ["gk_idle_", "gk_save_right_", "gk_save_left_", "gk_save_center_down_", "gk_save_center_up_", "gk_save_down_left_", "gk_save_down_right"];
  /** @type {Array} */
  var NUM_SPRITE_GOALKEEPER = [24, 34, 34, 51, 25, 34, 34];
  /** @type {Array} */
  var OFFSET_CONTAINER_GOALKEEPER = [{
    x : 0,
    y : 0
  }, {
    x : 15,
    y : -29
  }, {
    x : -360,
    y : -29
  }, {
    x : -15,
    y : -15
  }, {
    x : -20,
    y : -85
  }, {
    x : -355,
    y : 20
  }, {
    x : 21,
    y : 20
  }];
  /** @type {number} */
  var BALL_MASS = 0.5;
  /** @type {number} */
  var BALL_RADIUS = 0.64;
  /** @type {number} */
  var BALL_LINEAR_DAMPING = 0.2;
  var OBJECT;
  /** @type {number} */
  var TIME_TRY_TO_SHOT_BALL_OPPONENT = 0.7;
  var START_POS_FLAG = {
    x : 277,
    y : 268
  };
  var FLAG_ADDED_POS = {
    x : 61,
    y : 69
  };
  /** @type {number} */
  var FLAG_LIMIT_POS_X = 690;
  /** @type {number} */
  var TOT_TEAM = 32;
  /** @type {number} */
  var MIN_BALL_VEL_ROTATION = 0.1;
  /** @type {number} */
  var TIME_RESET_AFTER_GOAL = 1E3;
  /** @type {number} */
  var SHOOT_FRAME = 7;
  /** @type {number} */
  var HAND_KEEPER_ANGLE_RATE = 0.15;
  /** @type {number} */
  var TIME_POLE_COLLISION_RESET = 1E3;
  var LIMIT_HAND_RANGE_POS = {
    x : 16.8,
    zMax : 3.1,
    zMin : -8.5
  };
  var BACK_WALL_GOAL_SIZE = {
    width : 20.5,
    depth : 1,
    height : 7.5
  };
  var LEFT_RIGHT_WALL_GOAL_SIZE = {
    width : 0.1,
    depth : 25,
    height : 7.5
  };
  var UP_WALL_GOAL_SIZE = {
    width : 20.5,
    depth : 25,
    height : 0.1
  };
  var BACK_WALL_GOAL_POSITION = {
    x : 0,
    y : 155,
    z : -2.7
  };
  var GOAL_LINE_POS = {
    x : 0,
    y : BACK_WALL_GOAL_POSITION.y - UP_WALL_GOAL_SIZE.depth + 2,
    z : BACK_WALL_GOAL_POSITION.z
  };
  var POSITION_BALL = {
    x : 0.05,
    y : 15.4,
    z : -9 + BALL_RADIUS
  };
  var NUM_AREA_GOAL = {
    h : 3,
    w : 5
  };
  /** @type {Array} */
  var AREA_GOALS_ANIM = [LEFT, LEFT, CENTER_UP, RIGHT, RIGHT, LEFT, LEFT, CENTER_UP, RIGHT, RIGHT, LEFT_DOWN, LEFT_DOWN, CENTER_DOWN, RIGHT_DOWN, RIGHT_DOWN];
  /** @type {number} */
  var GOAL_SPRITE_SWAP_Y = GOAL_LINE_POS.y;
  /** @type {number} */
  var GOAL_SPRITE_SWAP_Z = BACK_WALL_GOAL_POSITION.z + LEFT_RIGHT_WALL_GOAL_SIZE.height;
  /** @type {number} */
  var BALL_OUT_Y = BACK_WALL_GOAL_POSITION.y + 3;
  /** @type {number} */
  var BUFFER_ANIM_PLAYER = FPS;
  /** @type {number} */
  var MS_EFFECT_ADD = 1500;
  /** @type {number} */
  var MS_ROLLING_SCORE = 500;
  /** @type {number} */
  var MAX_PERCENT_PROBABILITY = 100;
  /** @type {number} */
  var GOAL_KEEPER_TOLLERANCE_LEFT = -4;
  /** @type {number} */
  var GOAL_KEEPER_TOLLERANCE_RIGHT = 4;
  /** @type {number} */
  var TIME_RESET_AFTER_BALL_OUT = 250;
  /** @type {number} */
  var TIME_RESET_AFTER_SAVE = 500;
  var AREA_GOAL_PROPERTIES = {
    width : 4,
    depth : 1,
    height : 2.4
  };
  var FIRST_AREA_GOAL_POS = {
    x : -14 - 0.5 * AREA_GOAL_PROPERTIES.width,
    y : BACK_WALL_GOAL_POSITION.y - UP_WALL_GOAL_SIZE.depth + 1.1,
    z : 3.1 - 0.5 * AREA_GOAL_PROPERTIES.height
  };
  /** @type {number} */
  var GOAL_KEEPER_DEPTH_Y = BACK_WALL_GOAL_POSITION.y - UP_WALL_GOAL_SIZE.depth;
  var POLE_UP_SIZE = {
    radius_top : 0.5,
    radius_bottom : 0.5,
    height : 40.5,
    segments : 10
  };
  var POLE_RIGHT_LEFT_SIZE = {
    radius_top : 0.5,
    radius_bottom : 0.5,
    height : 15,
    segments : 10
  };
  /** @type {Array} */
  var COLOR_AREA_GOAL = [16711680, 65280, 255, 16776960, 16711935, 65535, 15790320, 986895, 16759705, 16777215, 5675280, 10083618, 1056896, 8392736, 9017449];
  /** @type {number} */
  var OFFSET_FIELD_Y = 35;
  /** @type {number} */
  var OFFSET_FIELD_X = 35;
  /** @type {number} */
  var HIT_BALL_MAX_FORCE = 130;
  /** @type {number} */
  var HIT_BALL_MIN_FORCE = 5;
  /** @type {number} */
  var FORCE_RATE = 0.0014;
  /** @type {boolean} */
  var SHOW_AREAS_GOAL = false;
  var FORCE_MULTIPLIER_AXIS = {
    x : 0.12,
    y : 0.4,
    z : 0.08
  };
  /** @type {number} */
  var FORCE_MAX = 0.5;
  var FIELD_POSITION;
  /** @type {number} */
  var MAX_FORCE_Y = 66;
  /** @type {number} */
  var MIN_FORCE_Y = 50;
  /** @type {Array} */
  var CALCULATE_PROBABILITY = [{
    xMax : -7,
    xMin : -11,
    zMax : 11,
    zMin : 8
  }, {
    xMax : -3.6,
    xMin : -7,
    zMax : 11,
    zMin : 8
  }, {
    xMax : 3.6,
    xMin : -3.6,
    zMax : 11,
    zMin : 8
  }, {
    xMax : 7,
    xMin : 3.6,
    zMax : 11,
    zMin : 8
  }, {
    xMax : 11,
    xMin : 7,
    zMax : 11,
    zMin : 8
  }, {
    xMax : -7,
    xMin : -7,
    zMax : 8,
    zMin : 5
  }, {
    xMax : -3.6,
    xMin : -7,
    zMax : 8,
    zMin : 5
  }, {
    xMax : 3.6,
    xMin : -3.6,
    zMax : 8,
    zMin : 5
  }, {
    xMax : 7,
    xMin : 3.6,
    zMax : 8,
    zMin : 5
  }, {
    xMax : 11,
    xMin : 7,
    zMax : 8,
    zMin : 5
  }, {
    xMax : -7,
    xMin : -11,
    zMax : 5,
    zMin : 0
  }, {
    xMax : -3.6,
    xMin : -7,
    zMax : 5,
    zMin : 0
  }, {
    xMax : 3.6,
    xMin : -3.6,
    zMax : 5,
    zMin : 0
  }, {
    xMax : 7,
    xMin : 3.6,
    zMax : 5,
    zMin : 0
  }, {
    xMax : 11,
    xMin : 7,
    zMax : 5,
    zMin : 0
  }];
  /** @type {boolean} */
  var SHOW_3D_RENDER = false;
  /** @type {boolean} */
  var CAMERA_TEST_TRACKBALL = false;
  /** @type {boolean} */
  var CAMERA_TEST_TRANSFORM = false;
  /** @type {number} */
  var CANVAS_3D_OPACITY = 0.5;
  /** @type {number} */
  var MOUSE_SENSIBILTY = 0.03;
  var CAMERA_TEST_LOOK_AT = {
    x : 0,
    y : -500,
    z : -100
  };
  /** @type {number} */
  var BALL_SCALE_FACTOR = 0.07;
  /** @type {number} */
  var SHADOWN_FACTOR = 1.1;
  /** @type {Array} */
  var INTENSITY_DISPLAY_SHOCK = [{
    x : 10,
    y : 7.5,
    time : 50
  }, {
    x : 20,
    y : 9,
    time : 50
  }, {
    x : 30,
    y : 12,
    time : 50
  }, {
    x : 33,
    y : 15,
    time : 50
  }];
  /** @type {Array} */
  var FORCE_BALL_DISPLAY_SHOCK = [{
    max : 55,
    min : MIN_FORCE_Y - 1
  }, {
    max : 58,
    min : 55
  }, {
    max : 62,
    min : 58
  }, {
    max : MAX_FORCE_Y,
    min : 62
  }];
  var CAMERA_POSITION = {
    x : 0,
    y : 0,
    z : -7
  };
  /** @type {number} */
  var FOV = 15;
  /** @type {number} */
  var NEAR = 1;
  /** @type {number} */
  var FAR = 2E3;
  var ENABLE_FULLSCREEN;
  TimeSeries.prototype.resetBounds = function() {
    /** @type {number} */
    this.maxValue = Number.NaN;
    /** @type {number} */
    this.minValue = Number.NaN;
    /** @type {number} */
    var dataIndex = 0;
    for (;dataIndex < this.data.length;dataIndex++) {
      this.maxValue = isNaN(this.maxValue) ? this.data[dataIndex][1] : Math.max(this.maxValue, this.data[dataIndex][1]);
      this.minValue = isNaN(this.minValue) ? this.data[dataIndex][1] : Math.min(this.minValue, this.data[dataIndex][1]);
    }
  }, TimeSeries.prototype.append = function(timestamp, value) {
    this.lastTimeStamp = timestamp;
    var data = this.dataPool.length ? this.dataPool.pop() : [timestamp, value];
    data[0] = timestamp;
    /** @type {number} */
    data[1] = value;
    this.data.push(data);
    this.maxValue = isNaN(this.maxValue) ? value : Math.max(this.maxValue, value);
    this.minValue = isNaN(this.minValue) ? value : Math.min(this.minValue, value);
    for (;this.data.length > this.maxDataLength;) {
      this.dataPool.push(this.data.shift());
    }
  }, SmoothieChart.prototype.addTimeSeries = function(timeSeries, options) {
    this.seriesSet.push({
      timeSeries : timeSeries,
      options : options || {}
    });
  }, SmoothieChart.prototype.removeTimeSeries = function(timeSeries) {
    this.seriesSet.splice(this.seriesSet.indexOf(timeSeries), 1);
  }, SmoothieChart.prototype.streamTo = function(canvas, delayMillis) {
    var self = this;
    /**
     * @return {undefined}
     */
    this.render_on_tick = function() {
      var timeSeries = self.seriesSet[0].timeSeries;
      timeSeries.data;
      self.render(canvas, timeSeries.lastTimeStamp);
    };
    this.start();
  }, SmoothieChart.prototype.start = function() {
    if (!this.timer) {
      /** @type {number} */
      this.timer = setInterval(this.render_on_tick, 1E3 / this.options.fps);
    }
  }, SmoothieChart.prototype.stop = function() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = void 0;
    }
  }, SmoothieChart.timeFormatter = function(date) {
    /**
     * @param {number} n
     * @return {?}
     */
    function pad2(n) {
      return(10 > n ? "0" : "") + n;
    }
    return pad2(date.getHours()) + ":" + pad2(date.getMinutes()) + ":" + pad2(date.getSeconds());
  }, SmoothieChart.prototype.render = function(canvas, time) {
    var context = canvas.getContext("2d");
    var options = this.options;
    var dimensions = {
      top : 0,
      left : 0,
      width : canvas.clientWidth,
      height : canvas.clientHeight
    };
    if (context.save(), time -= time % options.millisPerPixel, context.translate(dimensions.left, dimensions.top), context.beginPath(), context.rect(0, 0, dimensions.width, dimensions.height), context.clip(), context.save(), context.fillStyle = options.grid.fillStyle, context.clearRect(0, 0, dimensions.width, dimensions.height), context.fillRect(0, 0, dimensions.width, dimensions.height), context.restore(), context.save(), context.lineWidth = options.grid.lineWidth || 1, context.strokeStyle = options.grid.strokeStyle || 
    "#ffffff", options.grid.millisPerLine > 0) {
      /** @type {number} */
      var t = time - time % options.grid.millisPerLine;
      for (;t >= time - dimensions.width * options.millisPerPixel;t -= options.grid.millisPerLine) {
        context.beginPath();
        /** @type {number} */
        var gx = Math.round(dimensions.width - (time - t) / options.millisPerPixel);
        if (context.moveTo(gx, 0), context.lineTo(gx, dimensions.height), context.stroke(), options.timestampFormatter) {
          /** @type {Date} */
          var tx = new Date(t);
          var ts = options.timestampFormatter(tx);
          var txtwidth = context.measureText(ts).width / 2 + context.measureText(maxValueString).width + 4;
          if (gx < dimensions.width - txtwidth) {
            context.fillStyle = options.labels.fillStyle;
            context.fillText(ts, gx - context.measureText(ts).width / 2, dimensions.height - 2);
          }
        }
        context.closePath();
      }
    }
    /** @type {number} */
    var v = 1;
    for (;v < options.grid.verticalSections;v++) {
      /** @type {number} */
      var hly = Math.round(v * dimensions.height / options.grid.verticalSections);
      context.beginPath();
      context.moveTo(0, hly);
      context.lineTo(dimensions.width, hly);
      context.stroke();
      context.closePath();
    }
    context.beginPath();
    context.strokeRect(0, 0, dimensions.width, dimensions.height);
    context.closePath();
    context.restore();
    /** @type {number} */
    var maxValue = Number.NaN;
    /** @type {number} */
    var minValue = Number.NaN;
    /** @type {number} */
    var d = 0;
    for (;d < this.seriesSet.length;d++) {
      var timeSeries = this.seriesSet[d].timeSeries;
      if (!isNaN(timeSeries.maxValue)) {
        maxValue = isNaN(maxValue) ? timeSeries.maxValue : Math.max(maxValue, timeSeries.maxValue);
      }
      if (!isNaN(timeSeries.minValue)) {
        minValue = isNaN(minValue) ? timeSeries.minValue : Math.min(minValue, timeSeries.minValue);
      }
    }
    if (isNaN(maxValue) && isNaN(minValue)) {
      return void context.restore();
    }
    if (null != options.maxValue) {
      maxValue = options.maxValue;
    } else {
      maxValue *= options.maxValueScale;
    }
    if (null != options.minValue) {
      minValue = options.minValue;
    }
    /** @type {number} */
    var targetValueRange = maxValue - minValue;
    this.currentValueRange += options.scaleSmoothing * (targetValueRange - this.currentValueRange);
    this.currentVisMinValue += options.scaleSmoothing * (minValue - this.currentVisMinValue);
    var valueRange = this.currentValueRange;
    var from = this.currentVisMinValue;
    /** @type {number} */
    d = 0;
    for (;d < this.seriesSet.length;d++) {
      context.save();
      timeSeries = this.seriesSet[d].timeSeries;
      var dataSet = timeSeries.data;
      var seriesOptions = this.seriesSet[d].options;
      for (;dataSet.length >= options.maxDataSetLength && dataSet[1][0] < time - dimensions.width * options.millisPerPixel;) {
        dataSet.splice(0, 1);
      }
      context.lineWidth = seriesOptions.lineWidth || 1;
      context.fillStyle = seriesOptions.fillStyle;
      context.strokeStyle = seriesOptions.strokeStyle || "#ffffff";
      context.beginPath();
      /** @type {number} */
      var x = 0;
      /** @type {number} */
      var x1 = 0;
      /** @type {number} */
      var y = 0;
      /** @type {number} */
      var i = 0;
      for (;i < dataSet.length;i++) {
        /** @type {number} */
        var x0 = Math.round(dimensions.width - (time - dataSet[i][0]) / options.millisPerPixel);
        var to = dataSet[i][1];
        /** @type {number} */
        var offset = to - from;
        /** @type {number} */
        var delta = dimensions.height - (valueRange ? Math.round(offset / valueRange * dimensions.height) : 0);
        /** @type {number} */
        var y2 = Math.max(Math.min(delta, dimensions.height - 1), 1);
        if (0 == i) {
          /** @type {number} */
          x = x0;
          context.moveTo(x0, y2);
        } else {
          switch(options.interpolation) {
            case "line":
              context.lineTo(x0, y2);
              break;
            case "bezier":
            ;
            default:
              context.bezierCurveTo(Math.round((x1 + x0) / 2), y, Math.round(x1 + x0) / 2, y2, x0, y2);
          }
        }
        /** @type {number} */
        x1 = x0;
        /** @type {number} */
        y = y2;
      }
      if (dataSet.length > 0) {
        if (seriesOptions.fillStyle) {
          context.lineTo(dimensions.width + seriesOptions.lineWidth + 1, y);
          context.lineTo(dimensions.width + seriesOptions.lineWidth + 1, dimensions.height + seriesOptions.lineWidth + 1);
          context.lineTo(x, dimensions.height + seriesOptions.lineWidth);
          context.fill();
        }
      }
      context.stroke();
      context.closePath();
      context.restore();
    }
    if (!options.labels.disabled) {
      if (!options.labelOffsetY) {
        /** @type {number} */
        options.labelOffsetY = 0;
      }
      context.fillStyle = options.labels.fillStyle;
      /** @type {string} */
      var minValueString = parseFloat(maxValue).toFixed(2);
      /** @type {string} */
      var maxValueString = parseFloat(minValue).toFixed(2);
      context.fillText(minValueString, dimensions.width - context.measureText(minValueString).width - 2, 10);
      context.fillText(maxValueString, dimensions.width - context.measureText(maxValueString).width - 2, dimensions.height - 2);
      /** @type {number} */
      i = 0;
      for (;i < this.seriesSet.length;i++) {
        timeSeries = this.seriesSet[i].timeSeries;
        var label = timeSeries.label;
        context.fillStyle = timeSeries.options.fillStyle || "rgb(255,255,255)";
        if (label) {
          context.fillText(label, 2, 10 * (i + 1) + options.labelOffsetY);
        }
      }
    }
    context.restore();
  };
  var s_oGame;
  CANNON = CANNON || {};
  var camera;
  var scene;
  var renderer;
  /** @type {null} */
  var controls = null;
  var s_oRender;
  CANNON.Demo = function(details) {
    /**
     * @return {undefined}
     */
    function ready() {
      config.restart();
      config.hideCached();
      client.restart();
      client.hideCached();
      couchClient.restart();
      couchClient.hideCached();
      api.restart();
      api.hideCached();
    }
    /**
     * @return {undefined}
     */
    function info() {
      if (result) {
        var i;
        for (i in result.__controllers) {
          result.__controllers[i].updateDisplay();
        }
        var messageIndex;
        for (messageIndex in result.__folders) {
          for (i in result.__folders[messageIndex].__controllers) {
            result.__folders[messageIndex].__controllers[i].updateDisplay();
          }
        }
      }
    }
    /**
     * @param {string} type
     * @return {undefined}
     */
    function update(type) {
      /**
       * @param {Object} element
       * @param {?} value
       * @return {undefined}
       */
      function update(element, value) {
        if (element.material) {
          element.material = value;
        }
        /** @type {number} */
        var i = 0;
        for (;i < element.children.length;i++) {
          update(element.children[i], value);
        }
      }
      if (-1 === tokenTypes.indexOf(type)) {
        throw new Error("Render mode " + type + " not found!");
      }
      switch(type) {
        case "solid":
          target.currentMaterial = source;
          /** @type {number} */
          light.intensity = 1;
          object.color.setHex(2236962);
          break;
        case "wireframe":
          target.currentMaterial = footer1;
          /** @type {number} */
          light.intensity = 0;
          object.color.setHex(16777215);
      }
      /** @type {number} */
      var i = 0;
      for (;i < codeSegments.length;i++) {
        update(codeSegments[i], target.currentMaterial);
      }
      /** @type {string} */
      self.rendermode = type;
    }
    /**
     * @param {string} type
     * @param {Function} fn
     * @return {undefined}
     */
    function configure(type, fn) {
      if ("string" != typeof type) {
        throw new Error("1st argument of Demo.addScene(title,initfunc) must be a string!");
      }
      if ("function" != typeof fn) {
        throw new Error("2nd argument of Demo.addScene(title,initfunc) must be a function!");
      }
      timeouts.push(fn);
      /** @type {number} */
      var pdataCur = timeouts.length - 1;
      /**
       * @return {undefined}
       */
      paths[type] = function() {
        trigger(pdataCur);
      };
      h.add(paths, type);
    }
    /**
     * @return {undefined}
     */
    function addObjectChildren() {
      /** @type {number} */
      var l = bodies.length;
      /** @type {number} */
      var i = 0;
      for (;l > i;i++) {
        var body = bodies[i];
        body.position.copy(body.initPosition);
        body.velocity.copy(body.initVelocity);
        if (body.initAngularVelocity) {
          body.angularVelocity.copy(body.initAngularVelocity);
          body.quaternion.copy(body.initQuaternion);
        }
      }
    }
    /**
     * @param {?} origin
     * @return {undefined}
     */
    function scale(origin) {
      if (0 === origin.x) {
        /** @type {number} */
        origin.x = 1E-6;
      }
      if (0 === origin.y) {
        /** @type {number} */
        origin.y = 1E-6;
      }
      if (0 === origin.z) {
        /** @type {number} */
        origin.z = 1E-6;
      }
    }
    /**
     * @return {undefined}
     */
    function render() {
      /** @type {number} */
      var l = bodies.length;
      /** @type {number} */
      var i = 0;
      for (;l > i;i++) {
        var bi = bodies[i];
        var wheel = codeSegments[i];
        wheel.position.copy(bi.position);
        if (bi.quaternion) {
          wheel.quaternion.copy(bi.quaternion);
        }
      }
      if (config.restart(), self.contacts) {
        /** @type {number} */
        var id = 0;
        for (;id < params.contacts.length;id++) {
          /** @type {number} */
          var object = 0;
          for (;2 > object;object++) {
            var c = config.request();
            var item = params.contacts[id];
            bi = 0 === object ? item.bi : item.bj;
            var pos = 0 === object ? item.ri : item.rj;
            c.position.set(bi.position.x + pos.x, bi.position.y + pos.y, bi.position.z + pos.z);
          }
        }
      }
      if (config.hideCached(), client.restart(), self.cm2contact) {
        /** @type {number} */
        id = 0;
        for (;id < params.contacts.length;id++) {
          /** @type {number} */
          object = 0;
          for (;2 > object;object++) {
            var light = client.request();
            item = params.contacts[id];
            bi = 0 === object ? item.bi : item.bj;
            pos = 0 === object ? item.ri : item.rj;
            light.scale.set(pos.x, pos.y, pos.z);
            scale(light.scale);
            light.position.copy(bi.position);
          }
        }
      }
      if (client.hideCached(), couchClient.restart(), client2.restart(), self.constraints) {
        /** @type {number} */
        id = 0;
        for (;id < params.constraints.length;id++) {
          item = params.constraints[id];
          if (item instanceof CANNON.DistanceConstraint) {
            var a;
            var o = item.equations.normal;
            var target = o.bi;
            var args = o.bj;
            light = couchClient.request();
            i = target.id;
            args.id;
            a = args.position ? args.position : args;
            light.scale.set(a.x - target.position.x, a.y - target.position.y, a.z - target.position.z);
            scale(light.scale);
            light.position.copy(target.position);
          }
        }
        /** @type {number} */
        id = 0;
        for (;id < params.constraints.length;id++) {
          item = params.constraints[id];
          if (item instanceof CANNON.PointToPointConstraint) {
            var that = item.equations.normal;
            target = that.bi;
            args = that.bj;
            var marker = client2.request();
            var unit = client2.request();
            var particle = client2.request();
            i = target.id;
            args.id;
            marker.scale.set(that.ri.x, that.ri.y, that.ri.z);
            unit.scale.set(that.rj.x, that.rj.y, that.rj.z);
            particle.scale.set(-that.penetrationVec.x, -that.penetrationVec.y, -that.penetrationVec.z);
            scale(marker.scale);
            scale(unit.scale);
            scale(particle.scale);
            marker.position.copy(target.position);
            unit.position.copy(args.position);
            that.bj.position.vadd(that.rj, particle.position);
          }
        }
      }
      if (client2.hideCached(), couchClient.hideCached(), api.restart(), self.normals) {
        /** @type {number} */
        id = 0;
        for (;id < params.contacts.length;id++) {
          item = params.contacts[id];
          target = item.bi;
          args = item.bj;
          light = api.request();
          i = target.id;
          that = (args.id, item.ni);
          bi = target;
          light.scale.set(that.x, that.y, that.z);
          scale(light.scale);
          light.position.copy(bi.position);
          item.ri.vadd(light.position, light.position);
        }
      }
      if (api.hideCached(), engine.restart(), self.axes) {
        /** @type {number} */
        target = 0;
        for (;target < bodies.length;target++) {
          bi = bodies[target];
          c = engine.request();
          c.position.copy(bi.position);
          if (bi.quaternion) {
            c.quaternion.copy(bi.quaternion);
          }
        }
      }
      if (engine.hideCached(), con.restart(), self.aabbs) {
        /** @type {number} */
        i = 0;
        for (;i < bodies.length;i++) {
          bi = bodies[i];
          if (bi.computeAABB && (bi.aabbNeedsUpdate && bi.computeAABB(), isFinite(bi.aabb.lowerBound.x) && (isFinite(bi.aabb.lowerBound.y) && (isFinite(bi.aabb.lowerBound.z) && (isFinite(bi.aabb.upperBound.x) && (isFinite(bi.aabb.upperBound.y) && (isFinite(bi.aabb.upperBound.z) && (bi.aabb.lowerBound.x - bi.aabb.upperBound.x != 0 && (bi.aabb.lowerBound.y - bi.aabb.upperBound.y != 0 && bi.aabb.lowerBound.z - bi.aabb.upperBound.z != 0))))))))) {
            c = con.request();
            c.scale.set(bi.aabb.lowerBound.x - bi.aabb.upperBound.x, bi.aabb.lowerBound.y - bi.aabb.upperBound.y, bi.aabb.lowerBound.z - bi.aabb.upperBound.z);
            c.position.set(0.5 * (bi.aabb.lowerBound.x + bi.aabb.upperBound.x), 0.5 * (bi.aabb.lowerBound.y + bi.aabb.upperBound.y), 0.5 * (bi.aabb.lowerBound.z + bi.aabb.upperBound.z));
          }
        }
      }
      con.hideCached();
    }
    /**
     * @return {undefined}
     */
    function init() {
      /** @type {Element} */
      container = document.createElement("div");
      document.body.appendChild(container);
      if (CAMERA_TEST_TRACKBALL) {
        /** @type {number} */
        NEAR = 1;
        camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, NEAR, FAR);
        camera.lookAt(new THREE.Vector3(CAMERA_TEST_LOOK_AT.x, CAMERA_TEST_LOOK_AT.y, CAMERA_TEST_LOOK_AT.z));
        camera.position.set(0, 500, 500);
        camera.up.set(0, 0, 1);
      } else {
        camera = createOrthoGraphicCamera();
      }
      scene = target.scene = new THREE.Scene;
      scene.fog = new THREE.Fog(8306926, 0.5 * FAR, FAR);
      object = new THREE.AmbientLight(4473924);
      scene.add(object);
      light = new THREE.DirectionalLight(16777181, 1);
      light.position.set(180, 0, 180);
      light.target.position.set(0, 0, 0);
      /** @type {boolean} */
      light.castShadow = true;
      /** @type {number} */
      light.shadow.camera.near = 10;
      /** @type {number} */
      light.shadow.camera.far = 100;
      light.shadow.camera.fov = FOV;
      /** @type {number} */
      light.shadowMapBias = 0.0139;
      /** @type {number} */
      light.shadowMapDarkness = 0.1;
      /** @type {number} */
      light.shadow.mapSize.width = each_width;
      /** @type {number} */
      light.shadow.mapSize.height = tabPageHeight;
      new THREE.CameraHelper(light.shadow.camera);
      scene.add(light);
      scene.add(camera);
      renderer = SHOW_3D_RENDER ? new THREE.WebGLRenderer({
        clearColor : 0,
        clearAlpha : 0.5,
        antialias : true,
        alpha : true
      }) : new THREE.CanvasRenderer({
        clearColor : 0,
        clearAlpha : 0.5,
        antialias : false,
        alpha : true
      });
      renderer.setSize(canvasWidth, canvasHeight);
      /** @type {string} */
      renderer.domElement.style.position = "relative";
      /** @type {string} */
      renderer.domElement.style.top = $ + "px";
      renderer.domElement.style.opacity = CANVAS_3D_OPACITY;
      container.appendChild(renderer.domElement);
      /** @type {Element} */
      label = document.createElement("div");
      /** @type {string} */
      label.style.position = "absolute";
      /** @type {string} */
      label.style.top = "10px";
      /** @type {string} */
      label.style.width = "100%";
      /** @type {string} */
      label.style.textAlign = "center";
      /** @type {string} */
      label.innerHTML = '<a href="http://github.com/schteppe/cannon.js">cannon.js</a> - javascript 3d physics';
      container.appendChild(label);
      document.addEventListener("mousemove", completed);
      window.addEventListener("resize", onWindowResize);
      renderer.setClearColor(scene.fog.color, 1);
      /** @type {boolean} */
      renderer.autoClear = false;
      /** @type {Element} */
      canvas = document.createElement("canvas");
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      /** @type {number} */
      canvas.style.opacity = 0.5;
      /** @type {string} */
      canvas.style.position = "absolute";
      /** @type {string} */
      canvas.style.top = "0px";
      /** @type {number} */
      canvas.style.zIndex = 90;
      container.appendChild(canvas);
      timeline = new SmoothieChart({
        labelOffsetY : 50,
        maxDataSetLength : 100,
        millisPerPixel : 2,
        grid : {
          strokeStyle : "none",
          fillStyle : "none",
          lineWidth : 1,
          millisPerLine : 250,
          verticalSections : 6
        },
        labels : {
          fillStyle : "rgb(180, 180, 180)"
        }
      });
      timeline.streamTo(canvas);
      var cpuDataSets = {};
      /** @type {Array} */
      var parts = [[255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 0], [255, 0, 255], [0, 255, 255]];
      /** @type {number} */
      var key = 0;
      var i;
      for (i in params.profile) {
        var part = parts[key % parts.length];
        cpuDataSets[i] = new TimeSeries({
          label : i,
          fillStyle : "rgb(" + part[0] + "," + part[1] + "," + part[2] + ")",
          maxDataLength : 500
        });
        key++;
      }
      params.addEventListener("postStep", function(dataAndEvents) {
        var i;
        for (i in params.profile) {
          cpuDataSets[i].append(1E3 * params.time, params.profile[i]);
        }
      });
      /** @type {number} */
      key = 0;
      for (i in params.profile) {
        part = parts[key % parts.length];
        timeline.addTimeSeries(cpuDataSets[i], {
          strokeStyle : "rgb(" + part[0] + "," + part[1] + "," + part[2] + ")",
          lineWidth : 2
        });
        key++;
      }
      if (params.doProfiling = false, timeline.stop(), canvas.style.display = "none", stats = new Stats, stats.domElement.style.position = "absolute", stats.domElement.style.top = "0px", stats.domElement.style.zIndex = 100, container.appendChild(stats.domElement), void 0 != window.dat) {
        result = new dat.GUI;
        /** @type {number} */
        result.domElement.parentNode.style.zIndex = 120;
        var func = result.addFolder("Rendering");
        func.add(self, "rendermode", {
          Solid : "solid",
          Wireframe : "wireframe"
        }).onChange(function(cl) {
          update(cl);
        });
        func.add(self, "contacts");
        func.add(self, "cm2contact");
        func.add(self, "normals");
        func.add(self, "constraints");
        func.add(self, "axes");
        func.add(self, "particleSize").min(0).max(1).onChange(function(recurring) {
          /** @type {number} */
          var i = 0;
          for (;i < codeSegments.length;i++) {
            if (bodies[i] instanceof CANNON.Particle) {
              codeSegments[i].scale.set(recurring, recurring, recurring);
            }
          }
        });
        func.add(self, "shadows").onChange(function(dataAndEvents) {
          if (dataAndEvents) {
            /** @type {boolean} */
            renderer.shadowMapAutoUpdate = true;
          } else {
            /** @type {boolean} */
            renderer.shadowMapAutoUpdate = false;
            renderer.clearTarget(light.shadowMap);
          }
        });
        func.add(self, "aabbs");
        func.add(self, "profiling").onChange(function(dataAndEvents) {
          if (dataAndEvents) {
            /** @type {boolean} */
            params.doProfiling = true;
            timeline.start();
            /** @type {string} */
            canvas.style.display = "block";
          } else {
            /** @type {boolean} */
            params.doProfiling = false;
            timeline.stop();
            /** @type {string} */
            canvas.style.display = "none";
          }
        });
        var ctx = result.addFolder("World");
        ctx.add(self, "paused").onChange(function(dataAndEvents) {
        });
        ctx.add(self, "stepFrequency", 60, 600).step(60);
        /** @type {number} */
        var cx = 100;
        ctx.add(self, "gx", -cx, cx).onChange(function(recurring) {
          if (!isNaN(recurring)) {
            params.gravity.set(recurring, self.gy, self.gz);
          }
        });
        ctx.add(self, "gy", -cx, cx).onChange(function(buffer) {
          if (!isNaN(buffer)) {
            params.gravity.set(self.gx, buffer, self.gz);
          }
        });
        ctx.add(self, "gz", -cx, cx).onChange(function(val) {
          if (!isNaN(val)) {
            params.gravity.set(self.gx, self.gy, val);
          }
        });
        ctx.add(self, "quatNormalizeSkip", 0, 50).step(1).onChange(function(v) {
          if (!isNaN(v)) {
            params.quatNormalizeSkip = v;
          }
        });
        ctx.add(self, "quatNormalizeFast").onChange(function(dataAndEvents) {
          /** @type {boolean} */
          params.quatNormalizeFast = !!dataAndEvents;
        });
        var c = result.addFolder("Solver");
        c.add(self, "iterations", 1, 50).step(1).onChange(function(iterations) {
          /** @type {number} */
          params.solver.iterations = iterations;
        });
        c.add(self, "k", 10, 1E7).onChange(function(dataAndEvents) {
          target.setGlobalSpookParams(self.k, self.d, 1 / self.stepFrequency);
        });
        c.add(self, "d", 0, 20).step(0.1).onChange(function(dataAndEvents) {
          target.setGlobalSpookParams(self.k, self.d, 1 / self.stepFrequency);
        });
        c.add(self, "tolerance", 0, 10).step(0.01).onChange(function(dataAndEvents) {
          /** @type {Blob} */
          params.solver.tolerance = dataAndEvents;
        });
        h = result.addFolder("Scenes");
        h.open();
      }
      if (CAMERA_TEST_TRACKBALL) {
        controls = new THREE.TrackballControls(camera, renderer.domElement);
        /** @type {number} */
        controls.rotateSpeed = 1;
        /** @type {number} */
        controls.zoomSpeed = 1.2;
        /** @type {number} */
        controls.panSpeed = 0.2;
        /** @type {boolean} */
        controls.noZoom = false;
        /** @type {boolean} */
        controls.noPan = false;
        /** @type {boolean} */
        controls.staticMoving = false;
        /** @type {number} */
        controls.dynamicDampingFactor = 0.3;
        /** @type {number} */
        var maxDistance = 100;
        /** @type {number} */
        controls.minDistance = 0;
        /** @type {number} */
        controls.maxDistance = 1E3 * maxDistance;
        /** @type {Array} */
        controls.keys = [65, 83, 68];
        controls.screen.width = canvasWidth;
        controls.screen.height = canvasHeight;
      }
    }
    /**
     * @return {undefined}
     */
    function animate() {
      requestAnimationFrame(animate);
      if (!self.paused) {
        render();
        cancelAnimationFrame();
      }
      loop();
      stats.update();
    }
    /**
     * @return {undefined}
     */
    function cancelAnimationFrame() {
    }
    /**
     * @param {Event} e
     * @return {undefined}
     */
    function completed(e) {
      /** @type {number} */
      mouseX = e.clientX - halfWidth;
      /** @type {number} */
      mouseY = e.clientY - halfHeight;
    }
    /**
     * @param {?} event
     * @return {undefined}
     */
    function onWindowResize(event) {
      canvasWidth = s_iCanvasResizeWidth + 2 * s_iCanvasOffsetWidth;
      canvasHeight = s_iCanvasResizeHeight + 2 * s_iCanvasOffsetHeight;
      if (CAMERA_TEST_TRACKBALL) {
        controls.screen.width = canvasWidth;
        controls.screen.height = canvasHeight;
      }
    }
    /**
     * @return {undefined}
     */
    function loop() {
      if (CAMERA_TEST_TRACKBALL || CAMERA_TEST_TRANSFORM && null !== controls) {
        controls.update();
      }
      renderer.clear();
      renderer.render(target.scene, camera);
    }
    /**
     * @param {number} data
     * @return {undefined}
     */
    function trigger(data) {
      target.dispatchEvent({
        type : "destroy"
      });
      /** @type {boolean} */
      self.paused = false;
      info();
      setup(data);
    }
    /**
     * @return {undefined}
     */
    function start() {
      setup(0);
    }
    /**
     * @param {number} name
     * @return {undefined}
     */
    function setup(name) {
      /** @type {number} */
      var a = codeSegments.length;
      /** @type {number} */
      var b = 0;
      for (;a > b;b++) {
        params.remove(bodies.pop());
        var controller = codeSegments.pop();
        target.scene.remove(controller);
      }
      for (;params.constraints.length;) {
        params.removeConstraint(params.constraints[0]);
      }
      timeouts[name]();
      self.iterations = params.solver.iterations;
      self.gx = params.gravity.x + 0;
      self.gy = params.gravity.y + 0;
      self.gz = params.gravity.z + 0;
      self.quatNormalizeSkip = params.quatNormalizeSkip;
      self.quatNormalizeFast = params.quatNormalizeFast;
      info();
      ready();
    }
    /**
     * @param {?} forOwn
     * @return {undefined}
     */
    function Client(forOwn) {
      /** @type {Array} */
      var children = [];
      /** @type {Array} */
      var eventPath = [];
      /**
       * @return {?}
       */
      this.request = function() {
        return children.length ? geo = children.pop() : geo = forOwn(), scene.add(geo), eventPath.push(geo), geo;
      };
      /**
       * @return {undefined}
       */
      this.restart = function() {
        for (;eventPath.length;) {
          children.push(eventPath.pop());
        }
      };
      /**
       * @return {undefined}
       */
      this.hideCached = function() {
        /** @type {number} */
        var i = 0;
        for (;i < children.length;i++) {
          scene.remove(children[i]);
        }
      };
    }
    var target = this;
    /** @type {function (string, Function): undefined} */
    this.addScene = configure;
    /** @type {function (): undefined} */
    this.restartCurrentScene = addObjectChildren;
    /** @type {function (number): undefined} */
    this.changeScene = trigger;
    /** @type {function (): undefined} */
    this.start = start;
    var h;
    var self = this.settings = {
      stepFrequency : 60,
      quatNormalizeSkip : 2,
      quatNormalizeFast : true,
      gx : 0,
      gy : 0,
      gz : 0,
      iterations : 3,
      tolerance : 1E-4,
      k : 1E6,
      d : 3,
      scene : 0,
      paused : false,
      rendermode : "solid",
      constraints : false,
      contacts : false,
      cm2contact : false,
      normals : false,
      axes : false,
      particleSize : 0.1,
      shadows : false,
      aabbs : false,
      profiling : false,
      maxSubSteps : 3
    };
    details = details || {};
    var key;
    for (key in details) {
      if (key in self) {
        self[key] = details[key];
      }
    }
    if (self.stepFrequency % 60 !== 0) {
      throw new Error("stepFrequency must be a multiple of 60.");
    }
    /** @type {Array} */
    var bodies = this.bodies = [];
    /** @type {Array} */
    var codeSegments = this.visuals = [];
    /** @type {Array} */
    var timeouts = [];
    /** @type {null} */
    var result = null;
    /** @type {null} */
    var timeline = null;
    /** @type {null} */
    var canvas = null;
    var paths = {};
    var geometry = new THREE.SphereGeometry(0.1, 6, 6);
    /** @type {number} */
    var lc = (this.particleGeo = new THREE.SphereGeometry(1, 16, 8), 11184810);
    var source = new THREE.MeshPhongMaterial({
      color : lc,
      specular : 1118481,
      shininess : 50
    });
    var footer1 = new THREE.MeshLambertMaterial({
      color : 16777215,
      wireframe : true
    });
    this.currentMaterial = source;
    var legMaterial = new THREE.MeshPhongMaterial({
      color : 16711680
    });
    var config = (this.particleMaterial = new THREE.MeshLambertMaterial({
      color : 16711680
    }), new Client(function() {
      return new THREE.Mesh(geometry, legMaterial);
    }));
    var client = new Client(function() {
      var lineGeometry = new THREE.Geometry;
      return lineGeometry.vertices.push(new THREE.Vector3(0, 0, 0)), lineGeometry.vertices.push(new THREE.Vector3(1, 1, 1)), new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({
        color : 16711680
      }));
    });
    var beamGeometry = new THREE.BoxGeometry(1, 1, 1);
    var cubeMaterial = new THREE.MeshBasicMaterial({
      color : lc,
      wireframe : true
    });
    var con = new Client(function() {
      return new THREE.Mesh(beamGeometry, cubeMaterial);
    });
    var couchClient = new Client(function() {
      var lineGeometry = new THREE.Geometry;
      return lineGeometry.vertices.push(new THREE.Vector3(0, 0, 0)), lineGeometry.vertices.push(new THREE.Vector3(1, 1, 1)), new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({
        color : 16711680
      }));
    });
    var client2 = new Client(function() {
      var lineGeometry = new THREE.Geometry;
      return lineGeometry.vertices.push(new THREE.Vector3(0, 0, 0)), lineGeometry.vertices.push(new THREE.Vector3(1, 1, 1)), new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({
        color : 16711680
      }));
    });
    var api = new Client(function() {
      var lineGeometry = new THREE.Geometry;
      return lineGeometry.vertices.push(new THREE.Vector3(0, 0, 0)), lineGeometry.vertices.push(new THREE.Vector3(1, 1, 1)), new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({
        color : 65280
      }));
    });
    var engine = new Client(function() {
      var body = new THREE.Object3D;
      var copies = new THREE.Vector3(0, 0, 0);
      var lineGeometry = new THREE.Geometry;
      var options = new THREE.Geometry;
      var planeGeometry = new THREE.Geometry;
      lineGeometry.vertices.push(copies);
      options.vertices.push(copies);
      planeGeometry.vertices.push(copies);
      lineGeometry.vertices.push(new THREE.Vector3(1, 0, 0));
      options.vertices.push(new THREE.Vector3(0, 1, 0));
      planeGeometry.vertices.push(new THREE.Vector3(0, 0, 1));
      var rvar = new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({
        color : 16711680
      }));
      var chain = new THREE.Line(options, new THREE.LineBasicMaterial({
        color : 65280
      }));
      var eye = new THREE.Line(planeGeometry, new THREE.LineBasicMaterial({
        color : 255
      }));
      return body.add(rvar), body.add(chain), body.add(eye), body;
    });
    var params = this.world = new CANNON.World;
    params.broadphase = new CANNON.NaiveBroadphase;
    var light;
    var object;
    var stats;
    var label;
    /** @type {Array} */
    var tokenTypes = ["solid", "wireframe"];
    if (!Detector.webgl) {
      Detector.addGetWebGLMessage();
    }
    var container;
    /** @type {number} */
    var each_width = 1024;
    /** @type {number} */
    var tabPageHeight = 1024;
    /** @type {number} */
    var $ = 0;
    var canvasWidth = s_iCanvasResizeWidth + s_iCanvasOffsetWidth;
    var canvasHeight = s_iCanvasResizeHeight + s_iCanvasOffsetHeight;
    /** @type {number} */
    var halfWidth = canvasWidth / 2;
    /** @type {number} */
    var halfHeight = canvasHeight / 2;
    init();
    animate();
    /** @type {function (): undefined} */
    s_oRender = loop;
    document.addEventListener("keypress", function(event) {
      if (event.keyCode) {
        switch(event.keyCode) {
          case 32:
            addObjectChildren();
            break;
          case 104:
            if ("none" == stats.domElement.style.display) {
              /** @type {string} */
              stats.domElement.style.display = "block";
              /** @type {string} */
              label.style.display = "block";
            } else {
              /** @type {string} */
              stats.domElement.style.display = "none";
              /** @type {string} */
              label.style.display = "none";
            }
            break;
          case 97:
            /** @type {boolean} */
            self.aabbs = !self.aabbs;
            info();
            break;
          case 99:
            /** @type {boolean} */
            self.constraints = !self.constraints;
            info();
            break;
          case 112:
            /** @type {boolean} */
            self.paused = !self.paused;
            info();
            break;
          case 115:
            /** @type {number} */
            var stringOptions = 1 / self.stepFrequency;
            params.step(stringOptions);
            render();
            break;
          case 109:
            /** @type {number} */
            var i = tokenTypes.indexOf(self.rendermode);
            i++;
            i %= tokenTypes.length;
            update(tokenTypes[i]);
            info();
            break;
          case 49:
          ;
          case 50:
          ;
          case 51:
          ;
          case 52:
          ;
          case 53:
          ;
          case 54:
          ;
          case 55:
          ;
          case 56:
          ;
          case 57:
            if (timeouts.length > event.keyCode - 49) {
              if (!document.activeElement.localName.match(/input/)) {
                trigger(event.keyCode - 49);
              }
            }
          ;
        }
      }
    });
  }, CANNON.Demo.prototype = new CANNON.EventTarget, CANNON.Demo.constructor = CANNON.Demo, CANNON.Demo.prototype.setGlobalSpookParams = function(chunk, val, substr) {
    var world = this.world;
    /** @type {number} */
    var i = 0;
    for (;i < world.constraints.length;i++) {
      var line = world.constraints[i];
      /** @type {number} */
      var j = 0;
      for (;j < line.equations.length;j++) {
        var arr = line.equations[j];
        arr.setSpookParams(chunk, val, substr);
      }
    }
    /** @type {number} */
    i = 0;
    for (;i < world.contactmaterials.length;i++) {
      var response = world.contactmaterials[i];
      response.contactEquationStiffness = chunk;
      response.frictionEquationStiffness = chunk;
      response.contactEquationRelaxation = val;
      response.frictionEquationRelaxation = val;
    }
    world.defaultContactMaterial.contactEquationStiffness = chunk;
    world.defaultContactMaterial.frictionEquationStiffness = chunk;
    world.defaultContactMaterial.contactEquationRelaxation = val;
    world.defaultContactMaterial.frictionEquationRelaxation = val;
  }, CANNON.Demo.prototype.createTransformControl = function(view, opts) {
    controls = new THREE.TransformControls(camera, renderer.domElement);
    scene.add(view);
    controls.attach(view, opts);
    scene.add(controls);
    console.log("CREATE");
    window.addEventListener("keydown", function(event) {
      switch(event.keyCode) {
        case 81:
          controls.setSpace("local" === controls.space ? "world" : "local");
          break;
        case 17:
          controls.setTranslationSnap(100);
          controls.setRotationSnap(THREE.Math.degToRad(15));
          break;
        case 87:
          controls.setMode("translate");
          break;
        case 69:
          controls.setMode("rotate");
          break;
        case 82:
          controls.setMode("scale");
          break;
        case 187:
        ;
        case 107:
          controls.setSize(controls.size + 0.1);
          break;
        case 189:
        ;
        case 109:
          controls.setSize(Math.max(controls.size - 0.1, 0.1));
      }
    });
    window.addEventListener("keyup", function(event) {
      switch(event.keyCode) {
        case 17:
          controls.setTranslationSnap(null);
          controls.setRotationSnap(null);
      }
    });
  }, CANNON.Demo.prototype.getWorld = function() {
    return this.world;
  }, CANNON.Demo.prototype.addVisual = function(obj, el) {
    var node;
    this.settings;
    return obj instanceof CANNON.Body && (node = this.shape2mesh(obj, el)), node && (this.bodies.push(obj), this.visuals.push(node), obj.visualref = node, obj.visualref.visualId = this.bodies.length - 1, this.scene.add(node)), node;
  }, CANNON.Demo.prototype.addVisuals = function(codeSegments) {
    /** @type {number} */
    var i = 0;
    for (;i < codeSegments.length;i++) {
      this.addVisual(codeSegments[i]);
    }
  }, CANNON.Demo.prototype.removeVisual = function(item) {
    if (item.visualref) {
      var bodies = this.bodies;
      var methods = this.visuals;
      /** @type {Array} */
      var b = [];
      /** @type {Array} */
      var tests = [];
      var l = bodies.length;
      /** @type {number} */
      var i = 0;
      for (;l > i;i++) {
        b.unshift(bodies.pop());
        tests.unshift(methods.pop());
      }
      var y = item.visualref.visualId;
      /** @type {number} */
      var x = 0;
      for (;x < b.length;x++) {
        if (x !== y) {
          i = x > y ? x - 1 : x;
          bodies[i] = b[x];
          methods[i] = tests[x];
          bodies[i].visualref = b[x].visualref;
          bodies[i].visualref.visualId = i;
        }
      }
      /** @type {null} */
      item.visualref.visualId = null;
      this.scene.remove(item.visualref);
      /** @type {null} */
      item.visualref = null;
    }
  }, CANNON.Demo.prototype.removeAllVisuals = function() {
    for (;this.bodies.length;) {
      this.removeVisual(this.bodies[0]);
    }
  }, CANNON.Demo.prototype.shape2mesh = function(obj, m3) {
    var acc = ("wireframe" === this.settings.renderMode, new THREE.Object3D);
    /** @type {number} */
    var i = 0;
    for (;i < obj.shapes.length;i++) {
      var node;
      var data = obj.shapes[i];
      switch(data.type) {
        case CANNON.Shape.types.SPHERE:
          var beamGeometry = new THREE.SphereGeometry(data.radius, 8, 8);
          node = void 0 === m3 ? new THREE.Mesh(beamGeometry, this.currentMaterial) : new THREE.Mesh(beamGeometry, m3);
          /** @type {boolean} */
          node.castShadow = true;
          break;
        case CANNON.Shape.types.PARTICLE:
          node = new THREE.Mesh(this.particleGeo, this.particleMaterial);
          var settings = this.settings;
          node.scale.set(settings.particleSize, settings.particleSize, settings.particleSize);
          break;
        case CANNON.Shape.types.PLANE:
          var geometry = new THREE.PlaneGeometry(10, 10, 4, 4);
          node = new THREE.Object3D;
          var source;
          var path = new THREE.Object3D;
          source = void 0 === m3 ? new THREE.Mesh(geometry, this.currentMaterial) : new THREE.Mesh(geometry, m3);
          source.scale.set(100, 100, 100);
          path.add(source);
          /** @type {boolean} */
          source.castShadow = false;
          /** @type {boolean} */
          source.receiveShadow = true;
          node.add(path);
          break;
        case CANNON.Shape.types.BOX:
          var geo = new THREE.BoxGeometry(2 * data.halfExtents.x, 2 * data.halfExtents.y, 2 * data.halfExtents.z);
          node = void 0 === m3 ? new THREE.Mesh(geo, this.currentMaterial) : new THREE.Mesh(geo, m3);
          break;
        case CANNON.Shape.types.CONVEXPOLYHEDRON:
          var lineGeo = new THREE.Geometry;
          /** @type {number} */
          var c = 0;
          for (;c < data.vertices.length;c++) {
            var orgVertex = data.vertices[c];
            lineGeo.vertices.push(new THREE.Vector3(orgVertex.x, orgVertex.y, orgVertex.z));
          }
          /** @type {number} */
          c = 0;
          for (;c < data.faces.length;c++) {
            var buffer = data.faces[c];
            var a = buffer[0];
            /** @type {number} */
            var offset = 1;
            for (;offset < buffer.length - 1;offset++) {
              var v2 = buffer[offset];
              var aP4 = buffer[offset + 1];
              lineGeo.faces.push(new THREE.Face3(a, v2, aP4));
            }
          }
          lineGeo.computeBoundingSphere();
          lineGeo.computeFaceNormals();
          node = void 0 === m3 ? new THREE.Mesh(lineGeo, this.currentMaterial) : new THREE.Mesh(lineGeo, m3);
          break;
        case CANNON.Shape.types.HEIGHTFIELD:
          geometry = new THREE.Geometry;
          var target = new CANNON.Vec3;
          var vector = new CANNON.Vec3;
          var r = new CANNON.Vec3;
          /** @type {number} */
          var property = 0;
          for (;property < data.data.length - 1;property++) {
            /** @type {number} */
            var chunkEnd = 0;
            for (;chunkEnd < data.data[property].length - 1;chunkEnd++) {
              /** @type {number} */
              var w = 0;
              for (;2 > w;w++) {
                data.getConvexTrianglePillar(property, chunkEnd, 0 === w);
                target.copy(data.pillarConvex.vertices[0]);
                vector.copy(data.pillarConvex.vertices[1]);
                r.copy(data.pillarConvex.vertices[2]);
                target.vadd(data.pillarOffset, target);
                vector.vadd(data.pillarOffset, vector);
                r.vadd(data.pillarOffset, r);
                geometry.vertices.push(new THREE.Vector3(target.x, target.y, target.z), new THREE.Vector3(vector.x, vector.y, vector.z), new THREE.Vector3(r.x, r.y, r.z));
                /** @type {number} */
                c = geometry.vertices.length - 3;
                geometry.faces.push(new THREE.Face3(c, c + 1, c + 2));
              }
            }
          }
          geometry.computeBoundingSphere();
          geometry.computeFaceNormals();
          node = void 0 === m3 ? new THREE.Mesh(geometry, this.currentMaterial) : new THREE.Mesh(geometry, m3);
          break;
        case CANNON.Shape.types.TRIMESH:
          geometry = new THREE.Geometry;
          target = new CANNON.Vec3;
          vector = new CANNON.Vec3;
          r = new CANNON.Vec3;
          /** @type {number} */
          c = 0;
          for (;c < data.indices.length / 3;c++) {
            data.getTriangleVertices(c, target, vector, r);
            geometry.vertices.push(new THREE.Vector3(target.x, target.y, target.z), new THREE.Vector3(vector.x, vector.y, vector.z), new THREE.Vector3(r.x, r.y, r.z));
            /** @type {number} */
            offset = geometry.vertices.length - 3;
            geometry.faces.push(new THREE.Face3(offset, offset + 1, offset + 2));
          }
          geometry.computeBoundingSphere();
          geometry.computeFaceNormals();
          node = void 0 === m3 ? new THREE.Mesh(geometry, this.currentMaterial) : new THREE.Mesh(geometry, m3);
          break;
        default:
          throw "Visual type not recognized: " + data.type;;
      }
      if (node.receiveShadow = true, node.castShadow = true, node.children) {
        /** @type {number} */
        c = 0;
        for (;c < node.children.length;c++) {
          if (node.children[c].castShadow = true, node.children[c].receiveShadow = true, node.children[c]) {
            /** @type {number} */
            offset = 0;
            for (;offset < node.children[c].length;offset++) {
              /** @type {boolean} */
              node.children[c].children[offset].castShadow = true;
              /** @type {boolean} */
              node.children[c].children[offset].receiveShadow = true;
            }
          }
        }
      }
      var pos = obj.shapeOffsets[i];
      var v = obj.shapeOrientations[i];
      node.position.set(pos.x, pos.y, pos.z);
      node.quaternion.set(v.x, v.y, v.z, v.w);
      acc.add(node);
    }
    return this.camera = function() {
      return camera;
    }, this.getScene = function() {
      return scene;
    }, acc;
  };
  /** @type {number} */
  MS_ROLLING_SCORE = 750;
  /** @type {number} */
  var s_iOffsetX = 0;
  /** @type {number} */
  var s_iOffsetY = 0;
  /** @type {number} */
  var s_fInverseScaling = 0;
  !function(cssText) {
    /** @type {boolean} */
    (jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(cssText) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(cssText.substr(0, 
    4));
  }(navigator.userAgent || (navigator.vendor || window.opera)), $(window).resize(function() {
    sizeHandler();
  }), window.addEventListener("orientationchange", onOrientationChange), NoClickDelay.prototype = {
    /**
     * @param {Event} event
     * @return {undefined}
     */
    handleEvent : function(event) {
      switch(event.type) {
        case "touchstart":
          this.onTouchStart(event);
          break;
        case "touchmove":
          this.onTouchMove(event);
          break;
        case "touchend":
          this.onTouchEnd(event);
      }
    },
    /**
     * @param {Event} event
     * @return {undefined}
     */
    onTouchStart : function(event) {
      event.preventDefault();
      /** @type {boolean} */
      this.moved = false;
      this.element.addEventListener("touchmove", this, false);
      this.element.addEventListener("touchend", this, false);
    },
    /**
     * @param {Event} event
     * @return {undefined}
     */
    onTouchMove : function(event) {
      /** @type {boolean} */
      this.moved = true;
    },
    /**
     * @param {Event} event
     * @return {undefined}
     */
    onTouchEnd : function(event) {
      if (this.element.removeEventListener("touchmove", this, false), this.element.removeEventListener("touchend", this, false), !this.moved) {
        /** @type {(Element|null)} */
        var element = document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
        if (3 == element.nodeType) {
          /** @type {(Node|null)} */
          element = element.parentNode;
        }
        /** @type {(Event|null)} */
        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click", true, true);
        element.dispatchEvent(evt);
      }
    }
  }, function() {
    /**
     * @param {Element} e
     * @return {undefined}
     */
    function onchange(e) {
      /** @type {string} */
      var pageshow = "visible";
      /** @type {string} */
      var onBlur = "hidden";
      var handlers = {
        focus : pageshow,
        focusin : pageshow,
        pageshow : pageshow,
        blur : onBlur,
        focusout : onBlur,
        pagehide : onBlur
      };
      e = e || window.event;
      if (e.type in handlers) {
        document.body.className = handlers[e.type];
      } else {
        /** @type {string} */
        document.body.className = this[hidden] ? "hidden" : "visible";
        if ("hidden" === document.body.className) {
          s_oMain.stopUpdate();
        } else {
          s_oMain.startUpdate();
        }
      }
    }
    /** @type {string} */
    var hidden = "hidden";
    if (hidden in document) {
      document.addEventListener("visibilitychange", onchange);
    } else {
      if ((hidden = "mozHidden") in document) {
        document.addEventListener("mozvisibilitychange", onchange);
      } else {
        if ((hidden = "webkitHidden") in document) {
          document.addEventListener("webkitvisibilitychange", onchange);
        } else {
          if ((hidden = "msHidden") in document) {
            document.addEventListener("msvisibilitychange", onchange);
          } else {
            if ("onfocusin" in document) {
              /** @type {function (Element): undefined} */
              document.onfocusin = document.onfocusout = onchange;
            } else {
              /** @type {function (Element): undefined} */
              window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onchange;
            }
          }
        }
      }
    }
  }(), Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
  }, Math.degrees = function(rad) {
    return 180 * rad / Math.PI;
  }, Detector = {
    canvas : !!window.CanvasRenderingContext2D,
    webgl : function() {
      try {
        return!!window.WebGLRenderingContext && !!document.createElement("canvas").getContext("experimental-webgl");
      } catch (e) {
        return false;
      }
    }(),
    workers : !!window.Worker,
    fileapi : window.File && (window.FileReader && (window.FileList && window.Blob)),
    /**
     * @return {?}
     */
    getWebGLErrorMessage : function() {
      /** @type {Element} */
      var element = document.createElement("div");
      return element.id = "webgl-error-message", element.style.fontFamily = "monospace", element.style.fontSize = "13px", element.style.fontWeight = "normal", element.style.textAlign = "center", element.style.background = "#fff", element.style.color = "#000", element.style.padding = "1.5em", element.style.width = "400px", element.style.margin = "5em auto 0", this.webgl || (element.innerHTML = window.WebGLRenderingContext ? ['Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />', 
      'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'].join("\n") : ['Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>', 'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'].join("\n")), element;
    },
    /**
     * @param {Object} parameters
     * @return {undefined}
     */
    addGetWebGLMessage : function(parameters) {
      var toolbar;
      var id;
      var filter;
      parameters = parameters || {};
      toolbar = void 0 !== parameters.parent ? parameters.parent : document.body;
      id = void 0 !== parameters.id ? parameters.id : "oldie";
      filter = Detector.getWebGLErrorMessage();
      filter.id = id;
      toolbar.appendChild(filter);
    }
  }, THREE.TrackballControls = function(object, domElement) {
    /**
     * @param {?} e
     * @return {undefined}
     */
    function keydown(e) {
      if (_this.enabled !== false) {
        window.removeEventListener("keydown", keydown);
        _prevState = _state;
        if (_state === STATE.NONE) {
          if (e.keyCode !== _this.keys[STATE.ROTATE] || _this.noRotate) {
            if (e.keyCode !== _this.keys[STATE.ZOOM] || _this.noZoom) {
              if (!(e.keyCode !== _this.keys[STATE.PAN])) {
                if (!_this.noPan) {
                  /** @type {number} */
                  _state = STATE.PAN;
                }
              }
            } else {
              /** @type {number} */
              _state = STATE.ZOOM;
            }
          } else {
            /** @type {number} */
            _state = STATE.ROTATE;
          }
        }
      }
    }
    /**
     * @param {?} e
     * @return {undefined}
     */
    function keyup(e) {
      if (_this.enabled !== false) {
        _state = _prevState;
        window.addEventListener("keydown", keydown, false);
      }
    }
    /**
     * @param {Object} event
     * @return {undefined}
     */
    function mousedown(event) {
      if (_this.enabled !== false) {
        event.preventDefault();
        event.stopPropagation();
        if (_state === STATE.NONE) {
          _state = event.button;
        }
        if (_state !== STATE.ROTATE || _this.noRotate) {
          if (_state !== STATE.ZOOM || _this.noZoom) {
            if (!(_state !== STATE.PAN)) {
              if (!_this.noPan) {
                _panStart.copy(augment(event.pageX, event.pageY));
                _panEnd.copy(_panStart);
              }
            }
          } else {
            _zoomStart.copy(augment(event.pageX, event.pageY));
            _zoomEnd.copy(_zoomStart);
          }
        } else {
          _rotateStart.copy($(event.pageX, event.pageY));
          _rotateEnd.copy(_rotateStart);
        }
        document.addEventListener("mousemove", mousemove, false);
        document.addEventListener("mouseup", mouseup, false);
        _this.dispatchEvent(changeEvent);
      }
    }
    /**
     * @param {Object} e
     * @return {undefined}
     */
    function mousemove(e) {
      if (_this.enabled !== false) {
        e.preventDefault();
        e.stopPropagation();
        if (_state !== STATE.ROTATE || _this.noRotate) {
          if (_state !== STATE.ZOOM || _this.noZoom) {
            if (!(_state !== STATE.PAN)) {
              if (!_this.noPan) {
                _panEnd.copy(augment(e.pageX, e.pageY));
              }
            }
          } else {
            _zoomEnd.copy(augment(e.pageX, e.pageY));
          }
        } else {
          _rotateEnd.copy($(e.pageX, e.pageY));
        }
      }
    }
    /**
     * @param {?} event
     * @return {undefined}
     */
    function mouseup(event) {
      if (_this.enabled !== false) {
        event.preventDefault();
        event.stopPropagation();
        /** @type {number} */
        _state = STATE.NONE;
        document.removeEventListener("mousemove", mousemove);
        document.removeEventListener("mouseup", mouseup);
        _this.dispatchEvent(evt);
      }
    }
    /**
     * @param {Event} event
     * @return {undefined}
     */
    function mousewheel(event) {
      if (_this.enabled !== false) {
        event.preventDefault();
        event.stopPropagation();
        /** @type {number} */
        var y = 0;
        if (event.wheelDelta) {
          /** @type {number} */
          y = event.wheelDelta / 40;
        } else {
          if (event.detail) {
            /** @type {number} */
            y = -event.detail / 3;
          }
        }
        _zoomStart.y += 0.01 * y;
        _this.dispatchEvent(changeEvent);
        _this.dispatchEvent(evt);
      }
    }
    /**
     * @param {Object} event
     * @return {undefined}
     */
    function touchstart(event) {
      if (_this.enabled !== false) {
        switch(event.touches.length) {
          case 1:
            /** @type {number} */
            _state = STATE.TOUCH_ROTATE;
            _rotateStart.copy($(event.touches[0].pageX, event.touches[0].pageY));
            _rotateEnd.copy(_rotateStart);
            break;
          case 2:
            /** @type {number} */
            _state = STATE.TOUCH_ZOOM_PAN;
            /** @type {number} */
            var z0 = event.touches[0].pageX - event.touches[1].pageX;
            /** @type {number} */
            var z1 = event.touches[0].pageY - event.touches[1].pageY;
            /** @type {number} */
            _touchZoomDistanceEnd = _touchZoomDistanceStart = Math.sqrt(z0 * z0 + z1 * z1);
            /** @type {number} */
            var originalComputedStyles = (event.touches[0].pageX + event.touches[1].pageX) / 2;
            /** @type {number} */
            var inside = (event.touches[0].pageY + event.touches[1].pageY) / 2;
            _panStart.copy(augment(originalComputedStyles, inside));
            _panEnd.copy(_panStart);
            break;
          default:
            /** @type {number} */
            _state = STATE.NONE;
        }
        _this.dispatchEvent(changeEvent);
      }
    }
    /**
     * @param {Object} event
     * @return {undefined}
     */
    function touchmove(event) {
      if (_this.enabled !== false) {
        switch(event.preventDefault(), event.stopPropagation(), event.touches.length) {
          case 1:
            _rotateEnd.copy($(event.touches[0].pageX, event.touches[0].pageY));
            break;
          case 2:
            /** @type {number} */
            var z0 = event.touches[0].pageX - event.touches[1].pageX;
            /** @type {number} */
            var z1 = event.touches[0].pageY - event.touches[1].pageY;
            /** @type {number} */
            _touchZoomDistanceEnd = Math.sqrt(z0 * z0 + z1 * z1);
            /** @type {number} */
            var originalComputedStyles = (event.touches[0].pageX + event.touches[1].pageX) / 2;
            /** @type {number} */
            var inside = (event.touches[0].pageY + event.touches[1].pageY) / 2;
            _panEnd.copy(augment(originalComputedStyles, inside));
            break;
          default:
            /** @type {number} */
            _state = STATE.NONE;
        }
      }
    }
    /**
     * @param {Object} e
     * @return {undefined}
     */
    function touchend(e) {
      if (_this.enabled !== false) {
        switch(e.touches.length) {
          case 1:
            _rotateEnd.copy($(e.touches[0].pageX, e.touches[0].pageY));
            _rotateStart.copy(_rotateEnd);
            break;
          case 2:
            /** @type {number} */
            _touchZoomDistanceStart = _touchZoomDistanceEnd = 0;
            /** @type {number} */
            var originalComputedStyles = (e.touches[0].pageX + e.touches[1].pageX) / 2;
            /** @type {number} */
            var inside = (e.touches[0].pageY + e.touches[1].pageY) / 2;
            _panEnd.copy(augment(originalComputedStyles, inside));
            _panStart.copy(_panEnd);
        }
        /** @type {number} */
        _state = STATE.NONE;
        _this.dispatchEvent(evt);
      }
    }
    var _this = this;
    var STATE = {
      NONE : -1,
      ROTATE : 0,
      ZOOM : 1,
      PAN : 2,
      TOUCH_ROTATE : 3,
      TOUCH_ZOOM_PAN : 4
    };
    /** @type {Object} */
    this.object = object;
    this.domElement = void 0 !== domElement ? domElement : document;
    /** @type {boolean} */
    this.enabled = true;
    this.screen = {
      left : 0,
      top : 0,
      width : 0,
      height : 0
    };
    /** @type {number} */
    this.rotateSpeed = 1;
    /** @type {number} */
    this.zoomSpeed = 1.2;
    /** @type {number} */
    this.panSpeed = 0.3;
    /** @type {boolean} */
    this.noRotate = false;
    /** @type {boolean} */
    this.noZoom = false;
    /** @type {boolean} */
    this.noPan = false;
    /** @type {boolean} */
    this.noRoll = false;
    /** @type {boolean} */
    this.staticMoving = false;
    /** @type {number} */
    this.dynamicDampingFactor = 0.2;
    /** @type {number} */
    this.minDistance = 0;
    /** @type {number} */
    this.maxDistance = 1 / 0;
    /** @type {Array} */
    this.keys = [65, 83, 68];
    this.target = new THREE.Vector3;
    /** @type {number} */
    var _ = 1E-6;
    var lastPosition = new THREE.Vector3;
    /** @type {number} */
    var _state = STATE.NONE;
    /** @type {number} */
    var _prevState = STATE.NONE;
    var _eye = new THREE.Vector3;
    var _rotateStart = new THREE.Vector3;
    var _rotateEnd = new THREE.Vector3;
    var _zoomStart = new THREE.Vector2;
    var _zoomEnd = new THREE.Vector2;
    /** @type {number} */
    var _touchZoomDistanceStart = 0;
    /** @type {number} */
    var _touchZoomDistanceEnd = 0;
    var _panStart = new THREE.Vector2;
    var _panEnd = new THREE.Vector2;
    this.target0 = this.target.clone();
    this.position0 = this.object.position.clone();
    this.up0 = this.object.up.clone();
    var endEvent = {
      type : "change"
    };
    var changeEvent = {
      type : "start"
    };
    var evt = {
      type : "end"
    };
    /**
     * @return {undefined}
     */
    this.handleResize = function() {
      if (this.domElement === document) {
        /** @type {number} */
        this.screen.left = 0;
        /** @type {number} */
        this.screen.top = 0;
        /** @type {number} */
        this.screen.width = window.innerWidth;
        /** @type {number} */
        this.screen.height = window.innerHeight;
      } else {
        var obj = this.domElement.getBoundingClientRect();
        var doc = this.domElement.ownerDocument.documentElement;
        /** @type {number} */
        this.screen.left = obj.left + window.pageXOffset - doc.clientLeft;
        /** @type {number} */
        this.screen.top = obj.top + window.pageYOffset - doc.clientTop;
        this.screen.width = obj.width;
        this.screen.height = obj.height;
      }
    };
    /**
     * @param {Event} e
     * @return {undefined}
     */
    this.handleEvent = function(e) {
      if ("function" == typeof this[e.type]) {
        this[e.type](e);
      }
    };
    var augment = function() {
      var namespace = new THREE.Vector2;
      return function(width, height) {
        return namespace.set((width - _this.screen.left) / _this.screen.width, (height - _this.screen.top) / _this.screen.height), namespace;
      };
    }();
    var $ = function() {
      var input = new THREE.Vector3;
      var x = new THREE.Vector3;
      var mouseOnBall = new THREE.Vector3;
      return function(startX, dataAndEvents) {
        mouseOnBall.set((startX - 0.5 * _this.screen.width - _this.screen.left) / (0.5 * _this.screen.width), (0.5 * _this.screen.height + _this.screen.top - dataAndEvents) / (0.5 * _this.screen.height), 0);
        var length = mouseOnBall.length();
        return _this.noRoll ? length < Math.SQRT1_2 ? mouseOnBall.z = Math.sqrt(1 - length * length) : mouseOnBall.z = 0.5 / length : length > 1 ? mouseOnBall.normalize() : mouseOnBall.z = Math.sqrt(1 - length * length), _eye.copy(_this.object.position).sub(_this.target), input.copy(_this.object.up).setLength(mouseOnBall.y), input.add(x.copy(_this.object.up).cross(_eye).setLength(mouseOnBall.x)), input.add(_eye.setLength(mouseOnBall.z)), input;
      };
    }();
    this.rotateCamera = function() {
      var axis = new THREE.Vector3;
      var quaternion = new THREE.Quaternion;
      return function() {
        /** @type {number} */
        var angle = Math.acos(_rotateStart.dot(_rotateEnd) / _rotateStart.length() / _rotateEnd.length());
        if (angle) {
          axis.crossVectors(_rotateStart, _rotateEnd).normalize();
          angle *= _this.rotateSpeed;
          quaternion.setFromAxisAngle(axis, -angle);
          _eye.applyQuaternion(quaternion);
          _this.object.up.applyQuaternion(quaternion);
          _rotateEnd.applyQuaternion(quaternion);
          if (_this.staticMoving) {
            _rotateStart.copy(_rotateEnd);
          } else {
            quaternion.setFromAxisAngle(axis, angle * (_this.dynamicDampingFactor - 1));
            _rotateStart.applyQuaternion(quaternion);
          }
        }
      };
    }();
    /**
     * @return {undefined}
     */
    this.zoomCamera = function() {
      if (_state === STATE.TOUCH_ZOOM_PAN) {
        /** @type {number} */
        var factor = _touchZoomDistanceStart / _touchZoomDistanceEnd;
        _touchZoomDistanceStart = _touchZoomDistanceEnd;
        _eye.multiplyScalar(factor);
      } else {
        /** @type {number} */
        factor = 1 + (_zoomEnd.y - _zoomStart.y) * _this.zoomSpeed;
        if (1 !== factor) {
          if (factor > 0) {
            _eye.multiplyScalar(factor);
            if (_this.staticMoving) {
              _zoomStart.copy(_zoomEnd);
            } else {
              _zoomStart.y += (_zoomEnd.y - _zoomStart.y) * this.dynamicDampingFactor;
            }
          }
        }
      }
    };
    this.panCamera = function() {
      var mouseChange = new THREE.Vector2;
      var x = new THREE.Vector3;
      var from = new THREE.Vector3;
      return function() {
        mouseChange.copy(_panEnd).sub(_panStart);
        if (mouseChange.lengthSq()) {
          mouseChange.multiplyScalar(_eye.length() * _this.panSpeed);
          from.copy(_eye).cross(_this.object.up).setLength(mouseChange.x);
          from.add(x.copy(_this.object.up).setLength(mouseChange.y));
          _this.object.position.add(from);
          _this.target.add(from);
          if (_this.staticMoving) {
            _panStart.copy(_panEnd);
          } else {
            _panStart.add(mouseChange.subVectors(_panEnd, _panStart).multiplyScalar(_this.dynamicDampingFactor));
          }
        }
      };
    }();
    /**
     * @return {undefined}
     */
    this.checkDistances = function() {
      if (!(_this.noZoom && _this.noPan)) {
        if (_eye.lengthSq() > _this.maxDistance * _this.maxDistance) {
          _this.object.position.addVectors(_this.target, _eye.setLength(_this.maxDistance));
        }
        if (_eye.lengthSq() < _this.minDistance * _this.minDistance) {
          _this.object.position.addVectors(_this.target, _eye.setLength(_this.minDistance));
        }
      }
    };
    /**
     * @return {undefined}
     */
    this.update = function() {
      _eye.subVectors(_this.object.position, _this.target);
      if (!_this.noRotate) {
        _this.rotateCamera();
      }
      if (!_this.noZoom) {
        _this.zoomCamera();
      }
      if (!_this.noPan) {
        _this.panCamera();
      }
      _this.object.position.addVectors(_this.target, _eye);
      _this.checkDistances();
      _this.object.lookAt(_this.target);
      if (lastPosition.distanceToSquared(_this.object.position) > _) {
        _this.dispatchEvent(endEvent);
        lastPosition.copy(_this.object.position);
      }
    };
    /**
     * @return {undefined}
     */
    this.reset = function() {
      /** @type {number} */
      _state = STATE.NONE;
      /** @type {number} */
      _prevState = STATE.NONE;
      _this.target.copy(_this.target0);
      _this.object.position.copy(_this.position0);
      _this.object.up.copy(_this.up0);
      _eye.subVectors(_this.object.position, _this.target);
      _this.object.lookAt(_this.target);
      _this.dispatchEvent(endEvent);
      lastPosition.copy(_this.object.position);
    };
    this.domElement.addEventListener("contextmenu", function(types) {
      types.preventDefault();
    }, false);
    this.domElement.addEventListener("mousedown", mousedown, false);
    this.domElement.addEventListener("mousewheel", mousewheel, false);
    this.domElement.addEventListener("DOMMouseScroll", mousewheel, false);
    this.domElement.addEventListener("touchstart", touchstart, false);
    this.domElement.addEventListener("touchend", touchend, false);
    this.domElement.addEventListener("touchmove", touchmove, false);
    window.addEventListener("keydown", keydown, false);
    window.addEventListener("keyup", keyup, false);
    this.handleResize();
    this.update();
  }, THREE.TrackballControls.prototype = Object.create(THREE.EventDispatcher.prototype);
  /** @type {null} */
  var s_oInterface = null;
  var s_oScenario;
  var s_bMobile;
  /** @type {boolean} */
  var s_bAudioActive = true;
  /** @type {boolean} */
  var s_bFullscreen = false;
  /** @type {number} */
  var s_iCntTime = 0;
  /** @type {number} */
  var s_iTimeElaps = 0;
  /** @type {number} */
  var s_iPrevTime = 0;
  /** @type {number} */
  var s_iCntFps = 0;
  /** @type {number} */
  var s_iCurFps = 0;
  var s_oPhysicsController;
  var s_iCanvasResizeHeight;
  var s_iCanvasResizeWidth;
  var s_iCanvasOffsetHeight;
  var s_iCanvasOffsetWidth;
  /** @type {number} */
  var s_iAdsLevel = 1;
  /** @type {number} */
  var s_iBestScore = 0;
  var s_oDrawLayer;
  var s_oStage;
  var s_oMain;
  var s_oSpriteLibrary;
  var s_oSoundTrack;
  var dat = dat || {};
  dat.gui = dat.gui || {}, dat.utils = dat.utils || {}, dat.controllers = dat.controllers || {}, dat.dom = dat.dom || {}, dat.color = dat.color || {}, dat.utils.css = function() {
    return{
      /**
       * @param {string} path
       * @param {Element} doc
       * @return {undefined}
       */
      load : function(path, doc) {
        doc = doc || document;
        var el = doc.createElement("link");
        /** @type {string} */
        el.type = "text/css";
        /** @type {string} */
        el.rel = "stylesheet";
        /** @type {string} */
        el.href = path;
        doc.getElementsByTagName("head")[0].appendChild(el);
      },
      /**
       * @param {string} css
       * @param {Element} doc
       * @return {undefined}
       */
      inject : function(css, doc) {
        doc = doc || document;
        /** @type {Element} */
        var injected = document.createElement("style");
        /** @type {string} */
        injected.type = "text/css";
        /** @type {string} */
        injected.innerHTML = css;
        doc.getElementsByTagName("head")[0].appendChild(injected);
      }
    };
  }(), dat.utils.common = function() {
    /** @type {function (this:(Array.<T>|string|{length: number}), (function (this:S, T, number, Array.<T>): ?|null), S=): ?} */
    var ARR_EACH = Array.prototype.forEach;
    /** @type {function (this:(Array.<T>|string|{length: number}), *=, *=): Array.<T>} */
    var __slice = Array.prototype.slice;
    return{
      BREAK : {},
      /**
       * @param {CSSStyleDeclaration} object
       * @return {?}
       */
      extend : function(object) {
        return this.each(__slice.call(arguments, 1), function(iterable) {
          var key;
          for (key in iterable) {
            if (!this.isUndefined(iterable[key])) {
              object[key] = iterable[key];
            }
          }
        }, this), object;
      },
      /**
       * @param {Object} target
       * @return {?}
       */
      defaults : function(target) {
        return this.each(__slice.call(arguments, 1), function(source) {
          var key;
          for (key in source) {
            if (this.isUndefined(target[key])) {
              target[key] = source[key];
            }
          }
        }, this), target;
      },
      /**
       * @return {?}
       */
      compose : function() {
        /** @type {Array.<?>} */
        var toCall = __slice.call(arguments);
        return function() {
          /** @type {Array.<?>} */
          var args = __slice.call(arguments);
          /** @type {number} */
          var i = toCall.length - 1;
          for (;i >= 0;i--) {
            /** @type {Array} */
            args = [toCall[i].apply(this, args)];
          }
          return args[0];
        };
      },
      /**
       * @param {Array} obj
       * @param {Function} iterator
       * @param {?} context
       * @return {undefined}
       */
      each : function(obj, iterator, context) {
        if (ARR_EACH && obj.forEach === ARR_EACH) {
          obj.forEach(iterator, context);
        } else {
          if (obj.length === obj.length + 0) {
            /** @type {number} */
            var key = 0;
            var id = obj.length;
            for (;id > key;key++) {
              if (key in obj && iterator.call(context, obj[key], key) === this.BREAK) {
                return;
              }
            }
          } else {
            for (key in obj) {
              if (iterator.call(context, obj[key], key) === this.BREAK) {
                return;
              }
            }
          }
        }
      },
      /**
       * @param {Function} fnc
       * @return {undefined}
       */
      defer : function(fnc) {
        setTimeout(fnc, 0);
      },
      /**
       * @param {Object} args
       * @return {?}
       */
      toArray : function(args) {
        return args.toArray ? args.toArray() : __slice.call(args);
      },
      /**
       * @param {?} obj
       * @return {?}
       */
      isUndefined : function(obj) {
        return void 0 === obj;
      },
      /**
       * @param {number} value
       * @return {?}
       */
      isNull : function(value) {
        return null === value;
      },
      /**
       * @param {?} obj
       * @return {?}
       */
      isNaN : function(obj) {
        return obj !== obj;
      },
      /** @type {function (*): boolean} */
      isArray : Array.isArray || function(obj) {
        return obj.constructor === Array;
      },
      /**
       * @param {?} obj
       * @return {?}
       */
      isObject : function(obj) {
        return obj === Object(obj);
      },
      /**
       * @param {?} obj
       * @return {?}
       */
      isNumber : function(obj) {
        return obj === obj + 0;
      },
      /**
       * @param {?} obj
       * @return {?}
       */
      isString : function(obj) {
        return obj === obj + "";
      },
      /**
       * @param {boolean} obj
       * @return {?}
       */
      isBoolean : function(obj) {
        return obj === false || obj === true;
      },
      /**
       * @param {?} obj
       * @return {?}
       */
      isFunction : function(obj) {
        return "[object Function]" === Object.prototype.toString.call(obj);
      }
    };
  }(), dat.controllers.Controller = function(common) {
    /**
     * @param {Object} object
     * @param {Function} property
     * @return {undefined}
     */
    var Controller = function(object, property) {
      this.initialValue = object[property];
      /** @type {Element} */
      this.domElement = document.createElement("div");
      /** @type {Object} */
      this.object = object;
      /** @type {Function} */
      this.property = property;
      this.__onChange = void 0;
      this.__onFinishChange = void 0;
    };
    return common.extend(Controller.prototype, {
      /**
       * @param {Function} fnc
       * @return {?}
       */
      onChange : function(fnc) {
        return this.__onChange = fnc, this;
      },
      /**
       * @param {Function} fnc
       * @return {?}
       */
      onFinishChange : function(fnc) {
        return this.__onFinishChange = fnc, this;
      },
      /**
       * @param {Object} newValue
       * @return {?}
       */
      setValue : function(newValue) {
        return this.object[this.property] = newValue, this.__onChange && this.__onChange.call(this, newValue), this.updateDisplay(), this;
      },
      /**
       * @return {?}
       */
      getValue : function() {
        return this.object[this.property];
      },
      /**
       * @return {?}
       */
      updateDisplay : function() {
        return this;
      },
      /**
       * @return {?}
       */
      isModified : function() {
        return this.initialValue !== this.getValue();
      }
    }), Controller;
  }(dat.utils.common), dat.dom.dom = function(common) {
    /**
     * @param {string} val
     * @return {?}
     */
    function cssValueToPixels(val) {
      if ("0" === val || common.isUndefined(val)) {
        return 0;
      }
      var value = val.match(point);
      return common.isNull(value) ? 0 : parseFloat(value[1]);
    }
    var EVENT_MAP = {
      HTMLEvents : ["change"],
      MouseEvents : ["click", "mousemove", "mousedown", "mouseup", "mouseover"],
      KeyboardEvents : ["keydown"]
    };
    var EVENT_MAP_INV = {};
    common.each(EVENT_MAP, function(objs, k) {
      common.each(objs, function(e) {
        EVENT_MAP_INV[e] = k;
      });
    });
    /** @type {RegExp} */
    var point = /(\d+(\.\d+)?)px/;
    var dom = {
      /**
       * @param {HTMLElement} elem
       * @param {boolean} selectable
       * @return {undefined}
       */
      makeSelectable : function(elem, selectable) {
        if (void 0 !== elem) {
          if (void 0 !== elem.style) {
            /** @type {Function} */
            elem.onselectstart = selectable ? function() {
              return false;
            } : function() {
            };
            /** @type {string} */
            elem.style.MozUserSelect = selectable ? "auto" : "none";
            /** @type {string} */
            elem.style.KhtmlUserSelect = selectable ? "auto" : "none";
            /** @type {string} */
            elem.unselectable = selectable ? "on" : "off";
          }
        }
      },
      /**
       * @param {Element} elem
       * @param {boolean} horizontal
       * @param {boolean} vertical
       * @return {undefined}
       */
      makeFullscreen : function(elem, horizontal, vertical) {
        if (common.isUndefined(horizontal)) {
          /** @type {boolean} */
          horizontal = true;
        }
        if (common.isUndefined(vertical)) {
          /** @type {boolean} */
          vertical = true;
        }
        /** @type {string} */
        elem.style.position = "absolute";
        if (horizontal) {
          /** @type {number} */
          elem.style.left = 0;
          /** @type {number} */
          elem.style.right = 0;
        }
        if (vertical) {
          /** @type {number} */
          elem.style.top = 0;
          /** @type {number} */
          elem.style.bottom = 0;
        }
      },
      /**
       * @param {?} elem
       * @param {string} eventType
       * @param {Object} params
       * @param {?} aux
       * @return {undefined}
       */
      fakeEvent : function(elem, eventType, params, aux) {
        params = params || {};
        var className = EVENT_MAP_INV[eventType];
        if (!className) {
          throw new Error("Event type " + eventType + " not supported.");
        }
        /** @type {(Event|null)} */
        var evt = document.createEvent(className);
        switch(className) {
          case "MouseEvents":
            var clientX = params.x || (params.clientX || 0);
            var clientY = params.y || (params.clientY || 0);
            evt.initMouseEvent(eventType, params.bubbles || false, params.cancelable || true, window, params.clickCount || 1, 0, 0, clientX, clientY, false, false, false, false, 0, null);
            break;
          case "KeyboardEvents":
            var init = evt.initKeyboardEvent || evt.initKeyEvent;
            common.defaults(params, {
              cancelable : true,
              ctrlKey : false,
              altKey : false,
              shiftKey : false,
              metaKey : false,
              keyCode : void 0,
              charCode : void 0
            });
            init(eventType, params.bubbles || false, params.cancelable, window, params.ctrlKey, params.altKey, params.shiftKey, params.metaKey, params.keyCode, params.charCode);
            break;
          default:
            evt.initEvent(eventType, params.bubbles || false, params.cancelable || true);
        }
        common.defaults(evt, aux);
        elem.dispatchEvent(evt);
      },
      /**
       * @param {Element} elem
       * @param {string} event
       * @param {Function} func
       * @param {boolean} bool
       * @return {?}
       */
      bind : function(elem, event, func, bool) {
        return bool = bool || false, elem.addEventListener ? elem.addEventListener(event, func, bool) : elem.attachEvent && elem.attachEvent("on" + event, func), dom;
      },
      /**
       * @param {Object} elem
       * @param {string} event
       * @param {Function} func
       * @param {boolean} bool
       * @return {?}
       */
      unbind : function(elem, event, func, bool) {
        return bool = bool || false, elem.removeEventListener ? elem.removeEventListener(event, func, bool) : elem.detachEvent && elem.detachEvent("on" + event, func), dom;
      },
      /**
       * @param {Element} elem
       * @param {string} className
       * @return {?}
       */
      addClass : function(elem, className) {
        if (void 0 === elem.className) {
          /** @type {string} */
          elem.className = className;
        } else {
          if (elem.className !== className) {
            var classes = elem.className.split(/ +/);
            if (-1 == classes.indexOf(className)) {
              classes.push(className);
              elem.className = classes.join(" ").replace(/^\s+/, "").replace(/\s+$/, "");
            }
          }
        }
        return dom;
      },
      /**
       * @param {Element} elem
       * @param {string} className
       * @return {?}
       */
      removeClass : function(elem, className) {
        if (className) {
          if (void 0 === elem.className) {
          } else {
            if (elem.className === className) {
              elem.removeAttribute("class");
            } else {
              var classes = elem.className.split(/ +/);
              var index = classes.indexOf(className);
              if (-1 != index) {
                classes.splice(index, 1);
                elem.className = classes.join(" ");
              }
            }
          }
        } else {
          elem.className = void 0;
        }
        return dom;
      },
      /**
       * @param {Element} elem
       * @param {string} selector
       * @return {?}
       */
      hasClass : function(elem, selector) {
        return(new RegExp("(?:^|\\s+)" + selector + "(?:\\s+|$)")).test(elem.className) || false;
      },
      /**
       * @param {?} elem
       * @return {?}
       */
      getWidth : function(elem) {
        var style = getComputedStyle(elem);
        return cssValueToPixels(style["border-left-width"]) + cssValueToPixels(style["border-right-width"]) + cssValueToPixels(style["padding-left"]) + cssValueToPixels(style["padding-right"]) + cssValueToPixels(style.width);
      },
      /**
       * @param {?} elem
       * @return {?}
       */
      getHeight : function(elem) {
        var style = getComputedStyle(elem);
        return cssValueToPixels(style["border-top-width"]) + cssValueToPixels(style["border-bottom-width"]) + cssValueToPixels(style["padding-top"]) + cssValueToPixels(style["padding-bottom"]) + cssValueToPixels(style.height);
      },
      /**
       * @param {Element} elem
       * @return {?}
       */
      getOffset : function(elem) {
        var offset = {
          left : 0,
          top : 0
        };
        if (elem.offsetParent) {
          do {
            offset.left += elem.offsetLeft;
            offset.top += elem.offsetTop;
          } while (elem = elem.offsetParent);
        }
        return offset;
      },
      /**
       * @param {(Object|string)} elem
       * @return {?}
       */
      isActive : function(elem) {
        return elem === document.activeElement && (elem.type || elem.href);
      }
    };
    return dom;
  }(dat.utils.common), dat.controllers.OptionController = function(Controller, dom, common) {
    /**
     * @param {?} object
     * @param {?} property
     * @param {?} initial
     * @return {undefined}
     */
    var OptionController = function(object, property, initial) {
      OptionController.superclass.call(this, object, property);
      var _this = this;
      if (this.__select = document.createElement("select"), common.isArray(initial)) {
        var map = {};
        common.each(initial, function(element) {
          map[element] = element;
        });
        initial = map;
      }
      common.each(initial, function(value, key) {
        /** @type {Element} */
        var opt = document.createElement("option");
        opt.innerHTML = key;
        opt.setAttribute("value", value);
        _this.__select.appendChild(opt);
      });
      this.updateDisplay();
      dom.bind(this.__select, "change", function() {
        var desiredValue = this.options[this.selectedIndex].value;
        _this.setValue(desiredValue);
      });
      this.domElement.appendChild(this.__select);
    };
    return OptionController.superclass = Controller, common.extend(OptionController.prototype, Controller.prototype, {
      /**
       * @param {?} v
       * @return {?}
       */
      setValue : function(v) {
        var toReturn = OptionController.superclass.prototype.setValue.call(this, v);
        return this.__onFinishChange && this.__onFinishChange.call(this, this.getValue()), toReturn;
      },
      /**
       * @return {?}
       */
      updateDisplay : function() {
        return this.__select.value = this.getValue(), OptionController.superclass.prototype.updateDisplay.call(this);
      }
    }), OptionController;
  }(dat.controllers.Controller, dat.dom.dom, dat.utils.common), dat.controllers.NumberController = function(Controller, common) {
    /**
     * @param {Array} x
     * @return {?}
     */
    function numDecimals(x) {
      return x = x.toString(), x.indexOf(".") > -1 ? x.length - x.indexOf(".") - 1 : 0;
    }
    /**
     * @param {?} mapper
     * @param {?} property
     * @param {Object} params
     * @return {undefined}
     */
    var NumberController = function(mapper, property, params) {
      NumberController.superclass.call(this, mapper, property);
      params = params || {};
      this.__min = params.min;
      this.__max = params.max;
      this.__step = params.step;
      if (common.isUndefined(this.__step)) {
        if (0 == this.initialValue) {
          /** @type {number} */
          this.__impliedStep = 1;
        } else {
          /** @type {number} */
          this.__impliedStep = Math.pow(10, Math.floor(Math.log(this.initialValue) / Math.LN10)) / 10;
        }
      } else {
        this.__impliedStep = this.__step;
      }
      this.__precision = numDecimals(this.__impliedStep);
    };
    return NumberController.superclass = Controller, common.extend(NumberController.prototype, Controller.prototype, {
      /**
       * @param {number} v
       * @return {?}
       */
      setValue : function(v) {
        return void 0 !== this.__min && v < this.__min ? v = this.__min : void 0 !== this.__max && (v > this.__max && (v = this.__max)), void 0 !== this.__step && (v % this.__step != 0 && (v = Math.round(v / this.__step) * this.__step)), NumberController.superclass.prototype.setValue.call(this, v);
      },
      /**
       * @param {number} n
       * @return {?}
       */
      min : function(n) {
        return this.__min = n, this;
      },
      /**
       * @param {number} n
       * @return {?}
       */
      max : function(n) {
        return this.__max = n, this;
      },
      /**
       * @param {number} expectedNumberOfNonCommentArgs
       * @return {?}
       */
      step : function(expectedNumberOfNonCommentArgs) {
        return this.__step = expectedNumberOfNonCommentArgs, this;
      }
    }), NumberController;
  }(dat.controllers.Controller, dat.utils.common), dat.controllers.NumberControllerBox = function(NumberController, dom, common) {
    /**
     * @param {number} value
     * @param {?} decimals
     * @return {?}
     */
    function roundToDecimal(value, decimals) {
      /** @type {number} */
      var tenTo = Math.pow(10, decimals);
      return Math.round(value * tenTo) / tenTo;
    }
    /**
     * @param {?} mapper
     * @param {?} property
     * @param {?} capture
     * @return {undefined}
     */
    var NumberControllerBox = function(mapper, property, capture) {
      /**
       * @return {undefined}
       */
      function onChange() {
        /** @type {number} */
        var attempted = parseFloat(_this.__input.value);
        if (!common.isNaN(attempted)) {
          _this.setValue(attempted);
        }
      }
      /**
       * @return {undefined}
       */
      function onBlur() {
        onChange();
        if (_this.__onFinishChange) {
          _this.__onFinishChange.call(_this, _this.getValue());
        }
      }
      /**
       * @param {Event} e
       * @return {undefined}
       */
      function onMouseDown(e) {
        dom.bind(window, "mousemove", onMouseDrag);
        dom.bind(window, "mouseup", onMouseUp);
        prev_y = e.clientY;
      }
      /**
       * @param {Event} e
       * @return {undefined}
       */
      function onMouseDrag(e) {
        /** @type {number} */
        var diff = prev_y - e.clientY;
        _this.setValue(_this.getValue() + diff * _this.__impliedStep);
        prev_y = e.clientY;
      }
      /**
       * @return {undefined}
       */
      function onMouseUp() {
        dom.unbind(window, "mousemove", onMouseDrag);
        dom.unbind(window, "mouseup", onMouseUp);
      }
      /** @type {boolean} */
      this.__truncationSuspended = false;
      NumberControllerBox.superclass.call(this, mapper, property, capture);
      var prev_y;
      var _this = this;
      /** @type {Element} */
      this.__input = document.createElement("input");
      this.__input.setAttribute("type", "text");
      dom.bind(this.__input, "change", onChange);
      dom.bind(this.__input, "blur", onBlur);
      dom.bind(this.__input, "mousedown", onMouseDown);
      dom.bind(this.__input, "keydown", function(event) {
        if (13 === event.keyCode) {
          /** @type {boolean} */
          _this.__truncationSuspended = true;
          this.blur();
          /** @type {boolean} */
          _this.__truncationSuspended = false;
        }
      });
      this.updateDisplay();
      this.domElement.appendChild(this.__input);
    };
    return NumberControllerBox.superclass = NumberController, common.extend(NumberControllerBox.prototype, NumberController.prototype, {
      /**
       * @return {?}
       */
      updateDisplay : function() {
        return this.__input.value = this.__truncationSuspended ? this.getValue() : roundToDecimal(this.getValue(), this.__precision), NumberControllerBox.superclass.prototype.updateDisplay.call(this);
      }
    }), NumberControllerBox;
  }(dat.controllers.NumberController, dat.dom.dom, dat.utils.common), dat.controllers.NumberControllerSlider = function(NumberController, dom, css, common, styleSheet) {
    /**
     * @param {number} v
     * @param {number} i1
     * @param {number} i2
     * @param {number} o1
     * @param {number} o2
     * @return {?}
     */
    function map(v, i1, i2, o1, o2) {
      return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
    }
    /**
     * @param {?} mapper
     * @param {?} property
     * @param {number} min
     * @param {?} max
     * @param {number} step
     * @return {undefined}
     */
    var NumberControllerSlider = function(mapper, property, min, max, step) {
      /**
       * @param {Event} e
       * @return {undefined}
       */
      function onMouseDown(e) {
        dom.bind(window, "mousemove", onMouseDrag);
        dom.bind(window, "mouseup", onMouseUp);
        onMouseDrag(e);
      }
      /**
       * @param {Event} e
       * @return {?}
       */
      function onMouseDrag(e) {
        e.preventDefault();
        var offset = dom.getOffset(_this.__background);
        var width = dom.getWidth(_this.__background);
        return _this.setValue(map(e.clientX, offset.left, offset.left + width, _this.__min, _this.__max)), false;
      }
      /**
       * @return {undefined}
       */
      function onMouseUp() {
        dom.unbind(window, "mousemove", onMouseDrag);
        dom.unbind(window, "mouseup", onMouseUp);
        if (_this.__onFinishChange) {
          _this.__onFinishChange.call(_this, _this.getValue());
        }
      }
      NumberControllerSlider.superclass.call(this, mapper, property, {
        min : min,
        max : max,
        step : step
      });
      var _this = this;
      /** @type {Element} */
      this.__background = document.createElement("div");
      /** @type {Element} */
      this.__foreground = document.createElement("div");
      dom.bind(this.__background, "mousedown", onMouseDown);
      dom.addClass(this.__background, "slider");
      dom.addClass(this.__foreground, "slider-fg");
      this.updateDisplay();
      this.__background.appendChild(this.__foreground);
      this.domElement.appendChild(this.__background);
    };
    return NumberControllerSlider.superclass = NumberController, NumberControllerSlider.useDefaultStyles = function() {
      css.inject(styleSheet);
    }, common.extend(NumberControllerSlider.prototype, NumberController.prototype, {
      /**
       * @return {?}
       */
      updateDisplay : function() {
        /** @type {number} */
        var e = (this.getValue() - this.__min) / (this.__max - this.__min);
        return this.__foreground.style.width = 100 * e + "%", NumberControllerSlider.superclass.prototype.updateDisplay.call(this);
      }
    }), NumberControllerSlider;
  }(dat.controllers.NumberController, dat.dom.dom, dat.utils.css, dat.utils.common, ".slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 1em;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: '';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}"), 
  dat.controllers.FunctionController = function(Controller, dom, common) {
    /**
     * @param {?} mapper
     * @param {?} property
     * @param {Function} text
     * @return {undefined}
     */
    var FunctionController = function(mapper, property, text) {
      FunctionController.superclass.call(this, mapper, property);
      var notifier = this;
      /** @type {Element} */
      this.__button = document.createElement("div");
      this.__button.innerHTML = void 0 === text ? "Fire" : text;
      dom.bind(this.__button, "click", function(types) {
        return types.preventDefault(), notifier.fire(), false;
      });
      dom.addClass(this.__button, "button");
      this.domElement.appendChild(this.__button);
    };
    return FunctionController.superclass = Controller, common.extend(FunctionController.prototype, Controller.prototype, {
      /**
       * @return {undefined}
       */
      fire : function() {
        if (this.__onChange) {
          this.__onChange.call(this);
        }
        if (this.__onFinishChange) {
          this.__onFinishChange.call(this, this.getValue());
        }
        this.getValue().call(this.object);
      }
    }), FunctionController;
  }(dat.controllers.Controller, dat.dom.dom, dat.utils.common), dat.controllers.BooleanController = function(Controller, dom, common) {
    /**
     * @param {?} mapper
     * @param {?} property
     * @return {undefined}
     */
    var BooleanController = function(mapper, property) {
      /**
       * @return {undefined}
       */
      function onChange() {
        _this.setValue(!_this.__prev);
      }
      BooleanController.superclass.call(this, mapper, property);
      var _this = this;
      this.__prev = this.getValue();
      /** @type {Element} */
      this.__checkbox = document.createElement("input");
      this.__checkbox.setAttribute("type", "checkbox");
      dom.bind(this.__checkbox, "change", onChange, false);
      this.domElement.appendChild(this.__checkbox);
      this.updateDisplay();
    };
    return BooleanController.superclass = Controller, common.extend(BooleanController.prototype, Controller.prototype, {
      /**
       * @param {?} v
       * @return {?}
       */
      setValue : function(v) {
        var toReturn = BooleanController.superclass.prototype.setValue.call(this, v);
        return this.__onFinishChange && this.__onFinishChange.call(this, this.getValue()), this.__prev = this.getValue(), toReturn;
      },
      /**
       * @return {?}
       */
      updateDisplay : function() {
        return this.getValue() === true ? (this.__checkbox.setAttribute("checked", "checked"), this.__checkbox.checked = true) : this.__checkbox.checked = false, BooleanController.superclass.prototype.updateDisplay.call(this);
      }
    }), BooleanController;
  }(dat.controllers.Controller, dat.dom.dom, dat.utils.common), dat.color.toString = function(common) {
    return function(color) {
      if (1 == color.a || common.isUndefined(color.a)) {
        var lhs = color.hex.toString(16);
        for (;lhs.length < 6;) {
          /** @type {string} */
          lhs = "0" + lhs;
        }
        return "#" + lhs;
      }
      return "rgba(" + Math.round(color.r) + "," + Math.round(color.g) + "," + Math.round(color.b) + "," + color.a + ")";
    };
  }(dat.utils.common), dat.color.interpret = function(toString, common) {
    var result;
    var toReturn;
    /**
     * @return {?}
     */
    var interpret = function() {
      /** @type {boolean} */
      toReturn = false;
      var original = arguments.length > 1 ? common.toArray(arguments) : arguments[0];
      return common.each(INTERPRETATIONS, function(family) {
        return family.litmus(original) ? (common.each(family.conversions, function(conversion, conversionName) {
          return result = conversion.read(original), toReturn === false && result !== false ? (toReturn = result, result.conversionName = conversionName, result.conversion = conversion, common.BREAK) : void 0;
        }), common.BREAK) : void 0;
      }), toReturn;
    };
    /** @type {Array} */
    var INTERPRETATIONS = [{
      litmus : common.isString,
      conversions : {
        THREE_CHAR_HEX : {
          /**
           * @param {string} original
           * @return {?}
           */
          read : function(original) {
            var received = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
            return null === received ? false : {
              space : "HEX",
              hex : parseInt("0x" + received[1].toString() + received[1].toString() + received[2].toString() + received[2].toString() + received[3].toString() + received[3].toString())
            };
          },
          write : toString
        },
        SIX_CHAR_HEX : {
          /**
           * @param {string} original
           * @return {?}
           */
          read : function(original) {
            var received = original.match(/^#([A-F0-9]{6})$/i);
            return null === received ? false : {
              space : "HEX",
              hex : parseInt("0x" + received[1].toString())
            };
          },
          write : toString
        },
        CSS_RGB : {
          /**
           * @param {string} original
           * @return {?}
           */
          read : function(original) {
            var components = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
            return null === components ? false : {
              space : "RGB",
              r : parseFloat(components[1]),
              g : parseFloat(components[2]),
              b : parseFloat(components[3])
            };
          },
          write : toString
        },
        CSS_RGBA : {
          /**
           * @param {string} original
           * @return {?}
           */
          read : function(original) {
            var components = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
            return null === components ? false : {
              space : "RGB",
              r : parseFloat(components[1]),
              g : parseFloat(components[2]),
              b : parseFloat(components[3]),
              a : parseFloat(components[4])
            };
          },
          write : toString
        }
      }
    }, {
      litmus : common.isNumber,
      conversions : {
        HEX : {
          /**
           * @param {string} original
           * @return {?}
           */
          read : function(original) {
            return{
              space : "HEX",
              hex : original,
              conversionName : "HEX"
            };
          },
          /**
           * @param {string} color
           * @return {?}
           */
          write : function(color) {
            return color.hex;
          }
        }
      }
    }, {
      litmus : common.isArray,
      conversions : {
        RGB_ARRAY : {
          /**
           * @param {Array} original
           * @return {?}
           */
          read : function(original) {
            return 3 != original.length ? false : {
              space : "RGB",
              r : original[0],
              g : original[1],
              b : original[2]
            };
          },
          /**
           * @param {Node} color
           * @return {?}
           */
          write : function(color) {
            return[color.r, color.g, color.b];
          }
        },
        RGBA_ARRAY : {
          /**
           * @param {Array} original
           * @return {?}
           */
          read : function(original) {
            return 4 != original.length ? false : {
              space : "RGB",
              r : original[0],
              g : original[1],
              b : original[2],
              a : original[3]
            };
          },
          /**
           * @param {Node} color
           * @return {?}
           */
          write : function(color) {
            return[color.r, color.g, color.b, color.a];
          }
        }
      }
    }, {
      litmus : common.isObject,
      conversions : {
        RGBA_OBJ : {
          /**
           * @param {Node} original
           * @return {?}
           */
          read : function(original) {
            return common.isNumber(original.r) && (common.isNumber(original.g) && (common.isNumber(original.b) && common.isNumber(original.a))) ? {
              space : "RGB",
              r : original.r,
              g : original.g,
              b : original.b,
              a : original.a
            } : false;
          },
          /**
           * @param {Node} color
           * @return {?}
           */
          write : function(color) {
            return{
              r : color.r,
              g : color.g,
              b : color.b,
              a : color.a
            };
          }
        },
        RGB_OBJ : {
          /**
           * @param {Node} original
           * @return {?}
           */
          read : function(original) {
            return common.isNumber(original.r) && (common.isNumber(original.g) && common.isNumber(original.b)) ? {
              space : "RGB",
              r : original.r,
              g : original.g,
              b : original.b
            } : false;
          },
          /**
           * @param {Node} color
           * @return {?}
           */
          write : function(color) {
            return{
              r : color.r,
              g : color.g,
              b : color.b
            };
          }
        },
        HSVA_OBJ : {
          /**
           * @param {Object} original
           * @return {?}
           */
          read : function(original) {
            return common.isNumber(original.h) && (common.isNumber(original.s) && (common.isNumber(original.v) && common.isNumber(original.a))) ? {
              space : "HSV",
              h : original.h,
              s : original.s,
              v : original.v,
              a : original.a
            } : false;
          },
          /**
           * @param {Object} color
           * @return {?}
           */
          write : function(color) {
            return{
              h : color.h,
              s : color.s,
              v : color.v,
              a : color.a
            };
          }
        },
        HSV_OBJ : {
          /**
           * @param {Object} original
           * @return {?}
           */
          read : function(original) {
            return common.isNumber(original.h) && (common.isNumber(original.s) && common.isNumber(original.v)) ? {
              space : "HSV",
              h : original.h,
              s : original.s,
              v : original.v
            } : false;
          },
          /**
           * @param {Object} color
           * @return {?}
           */
          write : function(color) {
            return{
              h : color.h,
              s : color.s,
              v : color.v
            };
          }
        }
      }
    }];
    return interpret;
  }(dat.color.toString, dat.utils.common), dat.GUI = dat.gui.GUI = function(css, xhtml, styleSheet, matcherFunction, Controller, BooleanController, FunctionController, NumberControllerBox, NumberControllerSlider, dataAndEvents, ColorController, requestAnimationFrame, CenteredDiv, dom, common) {
    /**
     * @param {Object} gui
     * @param {Object} object
     * @param {string} property
     * @param {?} params
     * @return {?}
     */
    function add(gui, object, property, params) {
      if (void 0 === object[property]) {
        throw new Error("Object " + object + ' has no property "' + property + '"');
      }
      var controller;
      if (params.color) {
        controller = new ColorController(object, property);
      } else {
        /** @type {Array} */
        var applyArgs = [object, property].concat(params.factoryArgs);
        controller = matcherFunction.apply(gui, applyArgs);
      }
      if (params.before instanceof Controller) {
        params.before = params.before.__li;
      }
      recallSavedValue(gui, controller);
      dom.addClass(controller.domElement, "c");
      /** @type {Element} */
      var name = document.createElement("span");
      dom.addClass(name, "property-name");
      name.innerHTML = controller.property;
      /** @type {Element} */
      var container = document.createElement("div");
      container.appendChild(name);
      container.appendChild(controller.domElement);
      var li = addRow(gui, container, params.before);
      return dom.addClass(li, GUI.CLASS_CONTROLLER_ROW), dom.addClass(li, typeof controller.getValue()), augmentController(gui, li, controller), gui.__controllers.push(controller), controller;
    }
    /**
     * @param {Object} gui
     * @param {Element} text
     * @param {?} flet
     * @return {?}
     */
    function addRow(gui, text, flet) {
      /** @type {Element} */
      var el = document.createElement("li");
      return text && el.appendChild(text), flet ? gui.__ul.insertBefore(el, params.before) : gui.__ul.appendChild(el), gui.onResize(), el;
    }
    /**
     * @param {Object} gui
     * @param {Element} li
     * @param {Object} controller
     * @return {undefined}
     */
    function augmentController(gui, li, controller) {
      if (controller.__li = li, controller.__gui = gui, common.extend(controller, {
        /**
         * @param {?} options
         * @return {?}
         */
        options : function(options) {
          return arguments.length > 1 ? (controller.remove(), add(gui, controller.object, controller.property, {
            before : controller.__li.nextElementSibling,
            factoryArgs : [common.toArray(arguments)]
          })) : common.isArray(options) || common.isObject(options) ? (controller.remove(), add(gui, controller.object, controller.property, {
            before : controller.__li.nextElementSibling,
            factoryArgs : [options]
          })) : void 0;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        name : function(val) {
          return controller.__li.firstElementChild.firstElementChild.innerHTML = val, controller;
        },
        /**
         * @return {?}
         */
        listen : function() {
          return controller.__gui.listen(controller), controller;
        },
        /**
         * @return {?}
         */
        remove : function() {
          return controller.__gui.remove(controller), controller;
        }
      }), controller instanceof NumberControllerSlider) {
        var box = new NumberControllerBox(controller.object, controller.property, {
          min : controller.__min,
          max : controller.__max,
          step : controller.__step
        });
        common.each(["updateDisplay", "onChange", "onFinishChange"], function(method) {
          var pc = controller[method];
          var pb = box[method];
          /** @type {function (): ?} */
          controller[method] = box[method] = function() {
            /** @type {Array.<?>} */
            var args = Array.prototype.slice.call(arguments);
            return pc.apply(controller, args), pb.apply(box, args);
          };
        });
        dom.addClass(li, "has-slider");
        controller.domElement.insertBefore(box.domElement, controller.domElement.firstElementChild);
      } else {
        if (controller instanceof NumberControllerBox) {
          /**
           * @param {?} context
           * @return {?}
           */
          var r = function(context) {
            return common.isNumber(controller.__min) && common.isNumber(controller.__max) ? (controller.remove(), add(gui, controller.object, controller.property, {
              before : controller.__li.nextElementSibling,
              factoryArgs : [controller.__min, controller.__max, controller.__step]
            })) : context;
          };
          controller.min = common.compose(r, controller.min);
          controller.max = common.compose(r, controller.max);
        } else {
          if (controller instanceof BooleanController) {
            dom.bind(li, "click", function() {
              dom.fakeEvent(controller.__checkbox, "click");
            });
            dom.bind(controller.__checkbox, "click", function(event) {
              event.stopPropagation();
            });
          } else {
            if (controller instanceof FunctionController) {
              dom.bind(li, "click", function() {
                dom.fakeEvent(controller.__button, "click");
              });
              dom.bind(li, "mouseover", function() {
                dom.addClass(controller.__button, "hover");
              });
              dom.bind(li, "mouseout", function() {
                dom.removeClass(controller.__button, "hover");
              });
            } else {
              if (controller instanceof ColorController) {
                dom.addClass(li, "color");
                controller.updateDisplay = common.compose(function(dataAndEvents) {
                  return li.style.borderLeftColor = controller.__color.toString(), dataAndEvents;
                }, controller.updateDisplay);
                controller.updateDisplay();
              }
            }
          }
        }
      }
      controller.setValue = common.compose(function(dataAndEvents) {
        return gui.getRoot().__preset_select && (controller.isModified() && markPresetModified(gui.getRoot(), true)), dataAndEvents;
      }, controller.setValue);
    }
    /**
     * @param {Object} gui
     * @param {Object} controller
     * @return {undefined}
     */
    function recallSavedValue(gui, controller) {
      var root = gui.getRoot();
      var matched_index = root.__rememberedObjects.indexOf(controller.object);
      if (-1 != matched_index) {
        var controller_map = root.__rememberedObjectIndecesToControllers[matched_index];
        if (void 0 === controller_map && (controller_map = {}, root.__rememberedObjectIndecesToControllers[matched_index] = controller_map), controller_map[controller.property] = controller, root.load && root.load.remembered) {
          var preset;
          var preset_map = root.load.remembered;
          if (preset_map[gui.preset]) {
            preset = preset_map[gui.preset];
          } else {
            if (!preset_map[DEFAULT_DEFAULT_PRESET_NAME]) {
              return;
            }
            preset = preset_map[DEFAULT_DEFAULT_PRESET_NAME];
          }
          if (preset[matched_index] && void 0 !== preset[matched_index][controller.property]) {
            var value = preset[matched_index][controller.property];
            controller.initialValue = value;
            controller.setValue(value);
          }
        }
      }
    }
    /**
     * @param {Object} gui
     * @param {string} key
     * @return {?}
     */
    function getLocalStorageHash(gui, key) {
      return document.location.href + "." + key;
    }
    /**
     * @param {Object} gui
     * @return {undefined}
     */
    function addSaveMenu(gui) {
      /**
       * @return {undefined}
       */
      function showHideExplain() {
        /** @type {string} */
        explain.style.display = gui.useLocalStorage ? "block" : "none";
      }
      /** @type {Element} */
      var div = gui.__save_row = document.createElement("li");
      dom.addClass(gui.domElement, "has-save");
      gui.__ul.insertBefore(div, gui.__ul.firstChild);
      dom.addClass(div, "save-row");
      /** @type {Element} */
      var gears = document.createElement("span");
      /** @type {string} */
      gears.innerHTML = "&nbsp;";
      dom.addClass(gears, "button gears");
      /** @type {Element} */
      var button = document.createElement("span");
      /** @type {string} */
      button.innerHTML = "Save";
      dom.addClass(button, "button");
      dom.addClass(button, "save");
      /** @type {Element} */
      var button2 = document.createElement("span");
      /** @type {string} */
      button2.innerHTML = "New";
      dom.addClass(button2, "button");
      dom.addClass(button2, "save-as");
      /** @type {Element} */
      var button3 = document.createElement("span");
      /** @type {string} */
      button3.innerHTML = "Revert";
      dom.addClass(button3, "button");
      dom.addClass(button3, "revert");
      /** @type {Element} */
      var select = gui.__preset_select = document.createElement("select");
      if (gui.load && gui.load.remembered ? common.each(gui.load.remembered, function(dataAndEvents, key) {
        addPresetOption(gui, key, key == gui.preset);
      }) : addPresetOption(gui, DEFAULT_DEFAULT_PRESET_NAME, false), dom.bind(select, "change", function() {
        /** @type {number} */
        var index = 0;
        for (;index < gui.__preset_select.length;index++) {
          gui.__preset_select[index].innerHTML = gui.__preset_select[index].value;
        }
        gui.preset = this.value;
      }), div.appendChild(select), div.appendChild(gears), div.appendChild(button), div.appendChild(button2), div.appendChild(button3), _isSafari) {
        /** @type {(HTMLElement|null)} */
        var saveLocally = document.getElementById("dg-save-locally");
        /** @type {(HTMLElement|null)} */
        var explain = document.getElementById("dg-local-explain");
        /** @type {string} */
        saveLocally.style.display = "block";
        /** @type {(HTMLElement|null)} */
        var localStorageCheckBox = document.getElementById("dg-local-storage");
        if ("true" === localStorage.getItem(getLocalStorageHash(gui, "isLocal"))) {
          localStorageCheckBox.setAttribute("checked", "checked");
        }
        showHideExplain();
        dom.bind(localStorageCheckBox, "change", function() {
          /** @type {boolean} */
          gui.useLocalStorage = !gui.useLocalStorage;
          showHideExplain();
        });
      }
      /** @type {(HTMLElement|null)} */
      var newConstructorTextArea = document.getElementById("dg-new-constructor");
      dom.bind(newConstructorTextArea, "keydown", function(e) {
        if (!!e.metaKey) {
          if (!(67 !== e.which && 67 != e.keyCode)) {
            SAVE_DIALOGUE.hide();
          }
        }
      });
      dom.bind(gears, "click", function() {
        /** @type {string} */
        newConstructorTextArea.innerHTML = JSON.stringify(gui.getSaveObject(), void 0, 2);
        SAVE_DIALOGUE.show();
        newConstructorTextArea.focus();
        newConstructorTextArea.select();
      });
      dom.bind(button, "click", function() {
        gui.save();
      });
      dom.bind(button2, "click", function() {
        /** @type {(null|string)} */
        var presetName = prompt("Enter a new preset name.");
        if (presetName) {
          gui.saveAs(presetName);
        }
      });
      dom.bind(button3, "click", function() {
        gui.revert();
      });
    }
    /**
     * @param {Object} gui
     * @return {undefined}
     */
    function addResizeHandle(gui) {
      /**
       * @param {Event} e
       * @return {?}
       */
      function dragStart(e) {
        return e.preventDefault(), pmouseX = e.clientX, dom.addClass(gui.__closeButton, GUI.CLASS_DRAG), dom.bind(window, "mousemove", drag), dom.bind(window, "mouseup", dragStop), false;
      }
      /**
       * @param {Event} e
       * @return {?}
       */
      function drag(e) {
        return e.preventDefault(), gui.width += pmouseX - e.clientX, gui.onResize(), pmouseX = e.clientX, false;
      }
      /**
       * @return {undefined}
       */
      function dragStop() {
        dom.removeClass(gui.__closeButton, GUI.CLASS_DRAG);
        dom.unbind(window, "mousemove", drag);
        dom.unbind(window, "mouseup", dragStop);
      }
      /** @type {Element} */
      gui.__resize_handle = document.createElement("div");
      common.extend(gui.__resize_handle.style, {
        width : "6px",
        marginLeft : "-3px",
        height : "200px",
        cursor : "ew-resize",
        position : "absolute"
      });
      var pmouseX;
      dom.bind(gui.__resize_handle, "mousedown", dragStart);
      dom.bind(gui.__closeButton, "mousedown", dragStart);
      gui.domElement.insertBefore(gui.__resize_handle, gui.domElement.firstElementChild);
    }
    /**
     * @param {Object} gui
     * @param {number} w
     * @return {undefined}
     */
    function setWidth(gui, w) {
      /** @type {string} */
      gui.domElement.style.width = w + "px";
      if (gui.__save_row) {
        if (gui.autoPlace) {
          /** @type {string} */
          gui.__save_row.style.width = w + "px";
        }
      }
      if (gui.__closeButton) {
        /** @type {string} */
        gui.__closeButton.style.width = w + "px";
      }
    }
    /**
     * @param {?} gui
     * @param {boolean} useInitialValues
     * @return {?}
     */
    function getCurrentPreset(gui, useInitialValues) {
      var actual = {};
      return common.each(gui.__rememberedObjects, function(dataAndEvents, index) {
        var item = {};
        var controller_map = gui.__rememberedObjectIndecesToControllers[index];
        common.each(controller_map, function(controller, property) {
          item[property] = useInitialValues ? controller.initialValue : controller.getValue();
        });
        actual[index] = item;
      }), actual;
    }
    /**
     * @param {Object} gui
     * @param {string} name
     * @param {boolean} recurring
     * @return {undefined}
     */
    function addPresetOption(gui, name, recurring) {
      /** @type {Element} */
      var opt = document.createElement("option");
      /** @type {string} */
      opt.innerHTML = name;
      /** @type {string} */
      opt.value = name;
      gui.__preset_select.appendChild(opt);
      if (recurring) {
        /** @type {number} */
        gui.__preset_select.selectedIndex = gui.__preset_select.length - 1;
      }
    }
    /**
     * @param {Object} gui
     * @return {undefined}
     */
    function setPresetSelectIndex(gui) {
      /** @type {number} */
      var index = 0;
      for (;index < gui.__preset_select.length;index++) {
        if (gui.__preset_select[index].value == gui.preset) {
          /** @type {number} */
          gui.__preset_select.selectedIndex = index;
        }
      }
    }
    /**
     * @param {?} gui
     * @param {boolean} recurring
     * @return {undefined}
     */
    function markPresetModified(gui, recurring) {
      var opt = gui.__preset_select[gui.__preset_select.selectedIndex];
      if (recurring) {
        /** @type {string} */
        opt.innerHTML = opt.value + "*";
      } else {
        opt.innerHTML = opt.value;
      }
    }
    /**
     * @param {string} controllerArray
     * @return {undefined}
     */
    function updateDisplays(controllerArray) {
      if (0 != controllerArray.length) {
        requestAnimationFrame(function() {
          updateDisplays(controllerArray);
        });
      }
      common.each(controllerArray, function(c) {
        c.updateDisplay();
      });
    }
    css.inject(styleSheet);
    var SAVE_DIALOGUE;
    var auto_place_container;
    /** @type {string} */
    var CSS_NAMESPACE = "dg";
    /** @type {number} */
    var EEXIST = 72;
    /** @type {number} */
    var CLOSE_BUTTON_HEIGHT = 20;
    /** @type {string} */
    var DEFAULT_DEFAULT_PRESET_NAME = "Default";
    var _isSafari = function() {
      try {
        return "localStorage" in window && null !== window.localStorage;
      } catch (e) {
        return false;
      }
    }();
    /** @type {boolean} */
    var P = true;
    /** @type {boolean} */
    var hide = false;
    /** @type {Array} */
    var hideable_guis = [];
    /**
     * @param {Object} params
     * @return {undefined}
     */
    var GUI = function(params) {
      /**
       * @return {undefined}
       */
      function saveToLocalStorage() {
        localStorage.setItem(getLocalStorageHash(_this, "gui"), JSON.stringify(_this.getSaveObject()));
      }
      /**
       * @return {undefined}
       */
      function resetWidth() {
        var innerSize = _this.getRoot();
        innerSize.width += 1;
        common.defer(function() {
          innerSize.width -= 1;
        });
      }
      var _this = this;
      /** @type {Element} */
      this.domElement = document.createElement("div");
      /** @type {Element} */
      this.__ul = document.createElement("ul");
      this.domElement.appendChild(this.__ul);
      dom.addClass(this.domElement, CSS_NAMESPACE);
      this.__folders = {};
      /** @type {Array} */
      this.__controllers = [];
      /** @type {Array} */
      this.__rememberedObjects = [];
      /** @type {Array} */
      this.__rememberedObjectIndecesToControllers = [];
      /** @type {Array} */
      this.__listening = [];
      params = params || {};
      params = common.defaults(params, {
        autoPlace : true,
        width : GUI.DEFAULT_WIDTH
      });
      params = common.defaults(params, {
        resizable : params.autoPlace,
        hideable : params.autoPlace
      });
      if (common.isUndefined(params.load)) {
        params.load = {
          preset : DEFAULT_DEFAULT_PRESET_NAME
        };
      } else {
        if (params.preset) {
          params.load.preset = params.preset;
        }
      }
      if (common.isUndefined(params.parent)) {
        if (params.hideable) {
          hideable_guis.push(this);
        }
      }
      params.resizable = common.isUndefined(params.parent) && params.resizable;
      if (params.autoPlace) {
        if (common.isUndefined(params.scrollable)) {
          /** @type {boolean} */
          params.scrollable = true;
        }
      }
      var _tryInitOnFocus = _isSafari && "true" === localStorage.getItem(getLocalStorageHash(this, "isLocal"));
      if (Object.defineProperties(this, {
        parent : {
          /**
           * @return {?}
           */
          get : function() {
            return params.parent;
          }
        },
        scrollable : {
          /**
           * @return {?}
           */
          get : function() {
            return params.scrollable;
          }
        },
        autoPlace : {
          /**
           * @return {?}
           */
          get : function() {
            return params.autoPlace;
          }
        },
        preset : {
          /**
           * @return {?}
           */
          get : function() {
            return _this.parent ? _this.getRoot().preset : params.load.preset;
          },
          /**
           * @param {number} recurring
           * @return {undefined}
           */
          set : function(recurring) {
            if (_this.parent) {
              /** @type {number} */
              _this.getRoot().preset = recurring;
            } else {
              /** @type {number} */
              params.load.preset = recurring;
            }
            setPresetSelectIndex(this);
            _this.revert();
          }
        },
        width : {
          /**
           * @return {?}
           */
          get : function() {
            return params.width;
          },
          /**
           * @param {number} recurring
           * @return {undefined}
           */
          set : function(recurring) {
            /** @type {number} */
            params.width = recurring;
            setWidth(_this, recurring);
          }
        },
        name : {
          /**
           * @return {?}
           */
          get : function() {
            return params.name;
          },
          /**
           * @param {number} recurring
           * @return {undefined}
           */
          set : function(recurring) {
            /** @type {number} */
            params.name = recurring;
            if (title_row_name) {
              title_row_name.innerHTML = params.name;
            }
          }
        },
        closed : {
          /**
           * @return {?}
           */
          get : function() {
            return params.closed;
          },
          /**
           * @param {number} recurring
           * @return {undefined}
           */
          set : function(recurring) {
            /** @type {number} */
            params.closed = recurring;
            if (params.closed) {
              dom.addClass(_this.__ul, GUI.CLASS_CLOSED);
            } else {
              dom.removeClass(_this.__ul, GUI.CLASS_CLOSED);
            }
            this.onResize();
            if (_this.__closeButton) {
              /** @type {string} */
              _this.__closeButton.innerHTML = recurring ? GUI.TEXT_OPEN : GUI.TEXT_CLOSED;
            }
          }
        },
        load : {
          /**
           * @return {?}
           */
          get : function() {
            return params.load;
          }
        },
        useLocalStorage : {
          /**
           * @return {?}
           */
          get : function() {
            return _tryInitOnFocus;
          },
          /**
           * @param {number} recurring
           * @return {undefined}
           */
          set : function(recurring) {
            if (_isSafari) {
              /** @type {number} */
              _tryInitOnFocus = recurring;
              if (recurring) {
                dom.bind(window, "unload", saveToLocalStorage);
              } else {
                dom.unbind(window, "unload", saveToLocalStorage);
              }
              localStorage.setItem(getLocalStorageHash(_this, "isLocal"), recurring);
            }
          }
        }
      }), common.isUndefined(params.parent)) {
        if (params.closed = false, dom.addClass(this.domElement, GUI.CLASS_MAIN), dom.makeSelectable(this.domElement, false), _isSafari && _tryInitOnFocus) {
          /** @type {boolean} */
          _this.useLocalStorage = true;
          var saved_gui = localStorage.getItem(getLocalStorageHash(this, "gui"));
          if (saved_gui) {
            /** @type {*} */
            params.load = JSON.parse(saved_gui);
          }
        }
        /** @type {Element} */
        this.__closeButton = document.createElement("div");
        /** @type {string} */
        this.__closeButton.innerHTML = GUI.TEXT_CLOSED;
        dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BUTTON);
        this.domElement.appendChild(this.__closeButton);
        dom.bind(this.__closeButton, "click", function() {
          /** @type {boolean} */
          _this.closed = !_this.closed;
        });
      } else {
        if (void 0 === params.closed) {
          /** @type {boolean} */
          params.closed = true;
        }
        /** @type {Text} */
        var title_row_name = document.createTextNode(params.name);
        dom.addClass(title_row_name, "controller-name");
        var title_row = addRow(_this, title_row_name);
        /**
         * @param {?} e
         * @return {?}
         */
        var on_click_title = function(e) {
          return e.preventDefault(), _this.closed = !_this.closed, false;
        };
        dom.addClass(this.__ul, GUI.CLASS_CLOSED);
        dom.addClass(title_row, "title");
        dom.bind(title_row, "click", on_click_title);
        if (!params.closed) {
          /** @type {boolean} */
          this.closed = false;
        }
      }
      if (params.autoPlace) {
        if (common.isUndefined(params.parent)) {
          if (P) {
            /** @type {Element} */
            auto_place_container = document.createElement("div");
            dom.addClass(auto_place_container, CSS_NAMESPACE);
            dom.addClass(auto_place_container, GUI.CLASS_AUTO_PLACE_CONTAINER);
            document.body.appendChild(auto_place_container);
            /** @type {boolean} */
            P = false;
          }
          auto_place_container.appendChild(this.domElement);
          dom.addClass(this.domElement, GUI.CLASS_AUTO_PLACE);
        }
        if (!this.parent) {
          setWidth(_this, params.width);
        }
      }
      dom.bind(window, "resize", function() {
        _this.onResize();
      });
      dom.bind(this.__ul, "webkitTransitionEnd", function() {
        _this.onResize();
      });
      dom.bind(this.__ul, "transitionend", function() {
        _this.onResize();
      });
      dom.bind(this.__ul, "oTransitionEnd", function() {
        _this.onResize();
      });
      this.onResize();
      if (params.resizable) {
        addResizeHandle(this);
      }
      _this.getRoot();
      if (!params.parent) {
        resetWidth();
      }
    };
    return GUI.toggleHide = function() {
      /** @type {boolean} */
      hide = !hide;
      common.each(hideable_guis, function(gui) {
        /** @type {number} */
        gui.domElement.style.zIndex = hide ? -999 : 999;
        /** @type {number} */
        gui.domElement.style.opacity = hide ? 0 : 1;
      });
    }, GUI.CLASS_AUTO_PLACE = "a", GUI.CLASS_AUTO_PLACE_CONTAINER = "ac", GUI.CLASS_MAIN = "main", GUI.CLASS_CONTROLLER_ROW = "cr", GUI.CLASS_TOO_TALL = "taller-than-window", GUI.CLASS_CLOSED = "closed", GUI.CLASS_CLOSE_BUTTON = "close-button", GUI.CLASS_DRAG = "drag", GUI.DEFAULT_WIDTH = 245, GUI.TEXT_CLOSED = "Close Controls", GUI.TEXT_OPEN = "Open Controls", dom.bind(window, "keydown", function(e) {
      if (!("text" === document.activeElement.type)) {
        if (!(e.which !== EEXIST && e.keyCode != EEXIST)) {
          GUI.toggleHide();
        }
      }
    }, false), common.extend(GUI.prototype, {
      /**
       * @param {?} name
       * @param {string} type
       * @return {?}
       */
      add : function(name, type) {
        return add(this, name, type, {
          factoryArgs : Array.prototype.slice.call(arguments, 2)
        });
      },
      /**
       * @param {Object} object
       * @param {string} property
       * @return {?}
       */
      addColor : function(object, property) {
        return add(this, object, property, {
          color : true
        });
      },
      /**
       * @param {?} controller
       * @return {undefined}
       */
      remove : function(controller) {
        this.__ul.removeChild(controller.__li);
        this.__controllers.slice(this.__controllers.indexOf(controller), 1);
        var _this = this;
        common.defer(function() {
          _this.onResize();
        });
      },
      /**
       * @return {undefined}
       */
      destroy : function() {
        if (this.autoPlace) {
          auto_place_container.removeChild(this.domElement);
        }
      },
      /**
       * @param {string} name
       * @return {?}
       */
      addFolder : function(name) {
        if (void 0 !== this.__folders[name]) {
          throw new Error('You already have a folder in this GUI by the name "' + name + '"');
        }
        var new_gui_params = {
          name : name,
          parent : this
        };
        new_gui_params.autoPlace = this.autoPlace;
        if (this.load) {
          if (this.load.folders) {
            if (this.load.folders[name]) {
              new_gui_params.closed = this.load.folders[name].closed;
              new_gui_params.load = this.load.folders[name];
            }
          }
        }
        var gui = new GUI(new_gui_params);
        this.__folders[name] = gui;
        var li = addRow(this, gui.domElement);
        return dom.addClass(li, "folder"), gui;
      },
      /**
       * @return {undefined}
       */
      open : function() {
        /** @type {boolean} */
        this.closed = false;
      },
      /**
       * @return {undefined}
       */
      close : function() {
        /** @type {boolean} */
        this.closed = true;
      },
      /**
       * @return {undefined}
       */
      onResize : function() {
        var root = this.getRoot();
        if (root.scrollable) {
          var top = dom.getOffset(root.__ul).top;
          /** @type {number} */
          var h = 0;
          common.each(root.__ul.childNodes, function(node) {
            if (!(root.autoPlace && node === root.__save_row)) {
              h += dom.getHeight(node);
            }
          });
          if (window.innerHeight - top - CLOSE_BUTTON_HEIGHT < h) {
            dom.addClass(root.domElement, GUI.CLASS_TOO_TALL);
            /** @type {string} */
            root.__ul.style.height = window.innerHeight - top - CLOSE_BUTTON_HEIGHT + "px";
          } else {
            dom.removeClass(root.domElement, GUI.CLASS_TOO_TALL);
            /** @type {string} */
            root.__ul.style.height = "auto";
          }
        }
        if (root.__resize_handle) {
          common.defer(function() {
            /** @type {string} */
            root.__resize_handle.style.height = root.__ul.offsetHeight + "px";
          });
        }
        if (root.__closeButton) {
          /** @type {string} */
          root.__closeButton.style.width = root.width + "px";
        }
      },
      /**
       * @return {undefined}
       */
      remember : function() {
        if (common.isUndefined(SAVE_DIALOGUE) && (SAVE_DIALOGUE = new CenteredDiv, SAVE_DIALOGUE.domElement.innerHTML = xhtml), this.parent) {
          throw new Error("You can only call remember on a top level GUI.");
        }
        var _this = this;
        common.each(Array.prototype.slice.call(arguments), function(suite) {
          if (0 == _this.__rememberedObjects.length) {
            addSaveMenu(_this);
          }
          if (-1 == _this.__rememberedObjects.indexOf(suite)) {
            _this.__rememberedObjects.push(suite);
          }
        });
        if (this.autoPlace) {
          setWidth(this, this.width);
        }
      },
      /**
       * @return {?}
       */
      getRoot : function() {
        var gui = this;
        for (;gui.parent;) {
          gui = gui.parent;
        }
        return gui;
      },
      /**
       * @return {?}
       */
      getSaveObject : function() {
        var toReturn = this.load;
        return toReturn.closed = this.closed, this.__rememberedObjects.length > 0 && (toReturn.preset = this.preset, toReturn.remembered || (toReturn.remembered = {}), toReturn.remembered[this.preset] = getCurrentPreset(this)), toReturn.folders = {}, common.each(this.__folders, function(element, key) {
          toReturn.folders[key] = element.getSaveObject();
        }), toReturn;
      },
      /**
       * @return {undefined}
       */
      save : function() {
        if (!this.load.remembered) {
          this.load.remembered = {};
        }
        this.load.remembered[this.preset] = getCurrentPreset(this);
        markPresetModified(this, false);
      },
      /**
       * @param {string} presetName
       * @return {undefined}
       */
      saveAs : function(presetName) {
        if (!this.load.remembered) {
          this.load.remembered = {};
          this.load.remembered[DEFAULT_DEFAULT_PRESET_NAME] = getCurrentPreset(this, true);
        }
        this.load.remembered[presetName] = getCurrentPreset(this);
        /** @type {string} */
        this.preset = presetName;
        addPresetOption(this, presetName, true);
      },
      /**
       * @param {Array} gui
       * @return {undefined}
       */
      revert : function(gui) {
        common.each(this.__controllers, function(controller) {
          if (this.getRoot().load.remembered) {
            recallSavedValue(gui || this.getRoot(), controller);
          } else {
            controller.setValue(controller.initialValue);
          }
        }, this);
        common.each(this.__folders, function(folder) {
          folder.revert(folder);
        });
        if (!gui) {
          markPresetModified(this.getRoot(), false);
        }
      },
      /**
       * @param {Object} controller
       * @return {undefined}
       */
      listen : function(controller) {
        /** @type {boolean} */
        var t = 0 == this.__listening.length;
        this.__listening.push(controller);
        if (t) {
          updateDisplays(this.__listening);
        }
      }
    }), GUI;
  }(dat.utils.css, '<div id="dg-save" class="dg dialogue">\n\n  Here\'s the new load parameter for your <code>GUI</code>\'s constructor:\n\n  <textarea id="dg-new-constructor"></textarea>\n\n  <div id="dg-save-locally">\n\n    <input id="dg-local-storage" type="checkbox"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id="dg-local-explain">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>\'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>', 
  ".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear;border:0;position:absolute;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-x:hidden}.dg.a.has-save ul{margin-top:27px}.dg.a.has-save ul.closed{margin-top:0}.dg.a .save-row{position:fixed;top:0;z-index:1002}.dg li{-webkit-transition:height 0.1s ease-out;-o-transition:height 0.1s ease-out;-moz-transition:height 0.1s ease-out;transition:height 0.1s ease-out}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;overflow:hidden;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li > *{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:9px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2fa1d6}.dg .cr.number input[type=text]{color:#2fa1d6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2fa1d6}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n", 
  dat.controllers.factory = function(OptionController, NumberControllerBox, NumberControllerSlider, StringController, FunctionController, BooleanController, common) {
    return function(object, property) {
      var initialValue = object[property];
      return common.isArray(arguments[2]) || common.isObject(arguments[2]) ? new OptionController(object, property, arguments[2]) : common.isNumber(initialValue) ? common.isNumber(arguments[2]) && common.isNumber(arguments[3]) ? new NumberControllerSlider(object, property, arguments[2], arguments[3]) : new NumberControllerBox(object, property, {
        min : arguments[2],
        max : arguments[3]
      }) : common.isString(initialValue) ? new StringController(object, property) : common.isFunction(initialValue) ? new FunctionController(object, property, "") : common.isBoolean(initialValue) ? new BooleanController(object, property) : void 0;
    };
  }(dat.controllers.OptionController, dat.controllers.NumberControllerBox, dat.controllers.NumberControllerSlider, dat.controllers.StringController = function(Controller, dom, common) {
    /**
     * @param {?} mapper
     * @param {?} property
     * @return {undefined}
     */
    var StringController = function(mapper, property) {
      /**
       * @return {undefined}
       */
      function onChange() {
        _this.setValue(_this.__input.value);
      }
      /**
       * @return {undefined}
       */
      function onBlur() {
        if (_this.__onFinishChange) {
          _this.__onFinishChange.call(_this, _this.getValue());
        }
      }
      StringController.superclass.call(this, mapper, property);
      var _this = this;
      /** @type {Element} */
      this.__input = document.createElement("input");
      this.__input.setAttribute("type", "text");
      dom.bind(this.__input, "keyup", onChange);
      dom.bind(this.__input, "change", onChange);
      dom.bind(this.__input, "blur", onBlur);
      dom.bind(this.__input, "keydown", function(event) {
        if (13 === event.keyCode) {
          this.blur();
        }
      });
      this.updateDisplay();
      this.domElement.appendChild(this.__input);
    };
    return StringController.superclass = Controller, common.extend(StringController.prototype, Controller.prototype, {
      /**
       * @return {?}
       */
      updateDisplay : function() {
        return dom.isActive(this.__input) || (this.__input.value = this.getValue()), StringController.superclass.prototype.updateDisplay.call(this);
      }
    }), StringController;
  }(dat.controllers.Controller, dat.dom.dom, dat.utils.common), dat.controllers.FunctionController, dat.controllers.BooleanController, dat.utils.common), dat.controllers.Controller, dat.controllers.BooleanController, dat.controllers.FunctionController, dat.controllers.NumberControllerBox, dat.controllers.NumberControllerSlider, dat.controllers.OptionController, dat.controllers.ColorController = function(Controller, dom, Color, interpret, common) {
    /**
     * @param {Element} elem
     * @param {string} x
     * @param {string} a
     * @param {string} b
     * @return {undefined}
     */
    function linearGradient(elem, x, a, b) {
      /** @type {string} */
      elem.style.background = "";
      common.each(vendors, function(dataAndEvents) {
        elem.style.cssText += "background: " + dataAndEvents + "linear-gradient(" + x + ", " + a + " 0%, " + b + " 100%); ";
      });
    }
    /**
     * @param {Element} elem
     * @return {undefined}
     */
    function hueGradient(elem) {
      /** @type {string} */
      elem.style.background = "";
      elem.style.cssText += "background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);";
      elem.style.cssText += "background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
      elem.style.cssText += "background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
      elem.style.cssText += "background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
      elem.style.cssText += "background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
    }
    /**
     * @param {?} mapper
     * @param {?} property
     * @return {undefined}
     */
    var ColorController = function(mapper, property) {
      /**
       * @param {Event} e
       * @return {undefined}
       */
      function fieldDown(e) {
        setSV(e);
        dom.bind(window, "mousemove", setSV);
        dom.bind(window, "mouseup", unbindSV);
      }
      /**
       * @return {undefined}
       */
      function unbindSV() {
        dom.unbind(window, "mousemove", setSV);
        dom.unbind(window, "mouseup", unbindSV);
      }
      /**
       * @return {undefined}
       */
      function onBlur() {
        var i = interpret(this.value);
        if (i !== false) {
          _this.__color.__state = i;
          _this.setValue(_this.__color.toOriginal());
        } else {
          this.value = _this.__color.toString();
        }
      }
      /**
       * @return {undefined}
       */
      function unbindH() {
        dom.unbind(window, "mousemove", setH);
        dom.unbind(window, "mouseup", unbindH);
      }
      /**
       * @param {Event} e
       * @return {?}
       */
      function setSV(e) {
        e.preventDefault();
        var w = dom.getWidth(_this.__saturation_field);
        var pos = dom.getOffset(_this.__saturation_field);
        /** @type {number} */
        var s = (e.clientX - pos.left + document.body.scrollLeft) / w;
        /** @type {number} */
        var v = 1 - (e.clientY - pos.top + document.body.scrollTop) / w;
        return v > 1 ? v = 1 : 0 > v && (v = 0), s > 1 ? s = 1 : 0 > s && (s = 0), _this.__color.v = v, _this.__color.s = s, _this.setValue(_this.__color.toOriginal()), false;
      }
      /**
       * @param {Event} e
       * @return {?}
       */
      function setH(e) {
        e.preventDefault();
        var n = dom.getHeight(_this.__hue_field);
        var o = dom.getOffset(_this.__hue_field);
        /** @type {number} */
        var scale = 1 - (e.clientY - o.top + document.body.scrollTop) / n;
        return scale > 1 ? scale = 1 : 0 > scale && (scale = 0), _this.__color.h = 360 * scale, _this.setValue(_this.__color.toOriginal()), false;
      }
      ColorController.superclass.call(this, mapper, property);
      this.__color = new Color(this.getValue());
      this.__temp = new Color(0);
      var _this = this;
      /** @type {Element} */
      this.domElement = document.createElement("div");
      dom.makeSelectable(this.domElement, false);
      /** @type {Element} */
      this.__selector = document.createElement("div");
      /** @type {string} */
      this.__selector.className = "selector";
      /** @type {Element} */
      this.__saturation_field = document.createElement("div");
      /** @type {string} */
      this.__saturation_field.className = "saturation-field";
      /** @type {Element} */
      this.__field_knob = document.createElement("div");
      /** @type {string} */
      this.__field_knob.className = "field-knob";
      /** @type {string} */
      this.__field_knob_border = "2px solid ";
      /** @type {Element} */
      this.__hue_knob = document.createElement("div");
      /** @type {string} */
      this.__hue_knob.className = "hue-knob";
      /** @type {Element} */
      this.__hue_field = document.createElement("div");
      /** @type {string} */
      this.__hue_field.className = "hue-field";
      /** @type {Element} */
      this.__input = document.createElement("input");
      /** @type {string} */
      this.__input.type = "text";
      /** @type {string} */
      this.__input_textShadow = "0 1px 1px ";
      dom.bind(this.__input, "keydown", function(event) {
        if (13 === event.keyCode) {
          onBlur.call(this);
        }
      });
      dom.bind(this.__input, "blur", onBlur);
      dom.bind(this.__selector, "mousedown", function(dataAndEvents) {
        dom.addClass(this, "drag").bind(window, "mouseup", function(dataAndEvents) {
          dom.removeClass(_this.__selector, "drag");
        });
      });
      /** @type {Element} */
      var value_field = document.createElement("div");
      common.extend(this.__selector.style, {
        width : "122px",
        height : "102px",
        padding : "3px",
        backgroundColor : "#222",
        boxShadow : "0px 1px 3px rgba(0,0,0,0.3)"
      });
      common.extend(this.__field_knob.style, {
        position : "absolute",
        width : "12px",
        height : "12px",
        border : this.__field_knob_border + (this.__color.v < 0.5 ? "#fff" : "#000"),
        boxShadow : "0px 1px 3px rgba(0,0,0,0.5)",
        borderRadius : "12px",
        zIndex : 1
      });
      common.extend(this.__hue_knob.style, {
        position : "absolute",
        width : "15px",
        height : "2px",
        borderRight : "4px solid #fff",
        zIndex : 1
      });
      common.extend(this.__saturation_field.style, {
        width : "100px",
        height : "100px",
        border : "1px solid #555",
        marginRight : "3px",
        display : "inline-block",
        cursor : "pointer"
      });
      common.extend(value_field.style, {
        width : "100%",
        height : "100%",
        background : "none"
      });
      linearGradient(value_field, "top", "rgba(0,0,0,0)", "#000");
      common.extend(this.__hue_field.style, {
        width : "15px",
        height : "100px",
        display : "inline-block",
        border : "1px solid #555",
        cursor : "ns-resize"
      });
      hueGradient(this.__hue_field);
      common.extend(this.__input.style, {
        outline : "none",
        textAlign : "center",
        color : "#fff",
        border : 0,
        fontWeight : "bold",
        textShadow : this.__input_textShadow + "rgba(0,0,0,0.7)"
      });
      dom.bind(this.__saturation_field, "mousedown", fieldDown);
      dom.bind(this.__field_knob, "mousedown", fieldDown);
      dom.bind(this.__hue_field, "mousedown", function(e) {
        setH(e);
        dom.bind(window, "mousemove", setH);
        dom.bind(window, "mouseup", unbindH);
      });
      this.__saturation_field.appendChild(value_field);
      this.__selector.appendChild(this.__field_knob);
      this.__selector.appendChild(this.__saturation_field);
      this.__selector.appendChild(this.__hue_field);
      this.__hue_field.appendChild(this.__hue_knob);
      this.domElement.appendChild(this.__input);
      this.domElement.appendChild(this.__selector);
      this.updateDisplay();
    };
    /** @type {Function} */
    ColorController.superclass = Controller;
    common.extend(ColorController.prototype, Controller.prototype, {
      /**
       * @return {undefined}
       */
      updateDisplay : function() {
        var i = interpret(this.getValue());
        if (i !== false) {
          /** @type {boolean} */
          var t = false;
          common.each(Color.COMPONENTS, function(component) {
            return common.isUndefined(i[component]) || (common.isUndefined(this.__color.__state[component]) || i[component] === this.__color.__state[component]) ? void 0 : (t = true, {});
          }, this);
          if (t) {
            common.extend(this.__color.__state, i);
          }
        }
        common.extend(this.__temp.__state, this.__color.__state);
        /** @type {number} */
        this.__temp.a = 1;
        /** @type {number} */
        var flip = this.__color.v < 0.5 || this.__color.s > 0.5 ? 255 : 0;
        /** @type {number} */
        var _flip = 255 - flip;
        common.extend(this.__field_knob.style, {
          marginLeft : 100 * this.__color.s - 7 + "px",
          marginTop : 100 * (1 - this.__color.v) - 7 + "px",
          backgroundColor : this.__temp.toString(),
          border : this.__field_knob_border + "rgb(" + flip + "," + flip + "," + flip + ")"
        });
        /** @type {string} */
        this.__hue_knob.style.marginTop = 100 * (1 - this.__color.h / 360) + "px";
        /** @type {number} */
        this.__temp.s = 1;
        /** @type {number} */
        this.__temp.v = 1;
        linearGradient(this.__saturation_field, "left", "#fff", this.__temp.toString());
        common.extend(this.__input.style, {
          backgroundColor : this.__input.value = this.__color.toString(),
          color : "rgb(" + flip + "," + flip + "," + flip + ")",
          textShadow : this.__input_textShadow + "rgba(" + _flip + "," + _flip + "," + _flip + ",.7)"
        });
      }
    });
    /** @type {Array} */
    var vendors = ["-moz-", "-o-", "-webkit-", "-ms-", ""];
    return ColorController;
  }(dat.controllers.Controller, dat.dom.dom, dat.color.Color = function(matcherFunction, math, toString, common) {
    /**
     * @param {?} target
     * @param {string} component
     * @param {number} componentHexIndex
     * @return {undefined}
     */
    function defineRGBComponent(target, component, componentHexIndex) {
      Object.defineProperty(target, component, {
        /**
         * @return {?}
         */
        get : function() {
          return "RGB" === this.__state.space ? this.__state[component] : (recalculateRGB(this, component, componentHexIndex), this.__state[component]);
        },
        /**
         * @param {number} recurring
         * @return {undefined}
         */
        set : function(recurring) {
          if ("RGB" !== this.__state.space) {
            recalculateRGB(this, component, componentHexIndex);
            /** @type {string} */
            this.__state.space = "RGB";
          }
          /** @type {number} */
          this.__state[component] = recurring;
        }
      });
    }
    /**
     * @param {?} target
     * @param {string} component
     * @return {undefined}
     */
    function defineHSVComponent(target, component) {
      Object.defineProperty(target, component, {
        /**
         * @return {?}
         */
        get : function() {
          return "HSV" === this.__state.space ? this.__state[component] : (recalculateHSV(this), this.__state[component]);
        },
        /**
         * @param {number} recurring
         * @return {undefined}
         */
        set : function(recurring) {
          if ("HSV" !== this.__state.space) {
            recalculateHSV(this);
            /** @type {string} */
            this.__state.space = "HSV";
          }
          /** @type {number} */
          this.__state[component] = recurring;
        }
      });
    }
    /**
     * @param {?} color
     * @param {string} component
     * @param {number} componentHexIndex
     * @return {undefined}
     */
    function recalculateRGB(color, component, componentHexIndex) {
      if ("HEX" === color.__state.space) {
        color.__state[component] = math.component_from_hex(color.__state.hex, componentHexIndex);
      } else {
        if ("HSV" !== color.__state.space) {
          throw "Corrupted color state";
        }
        common.extend(color.__state, math.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));
      }
    }
    /**
     * @param {Node} color
     * @return {undefined}
     */
    function recalculateHSV(color) {
      var result = math.rgb_to_hsv(color.r, color.g, color.b);
      common.extend(color.__state, {
        s : result.s,
        v : result.v
      });
      if (common.isNaN(result.h)) {
        if (common.isUndefined(color.__state.h)) {
          /** @type {number} */
          color.__state.h = 0;
        }
      } else {
        color.__state.h = result.h;
      }
    }
    /**
     * @return {undefined}
     */
    var Color = function() {
      if (this.__state = matcherFunction.apply(this, arguments), this.__state === false) {
        throw "Failed to interpret color arguments";
      }
      this.__state.a = this.__state.a || 1;
    };
    return Color.COMPONENTS = ["r", "g", "b", "h", "s", "v", "hex", "a"], common.extend(Color.prototype, {
      /**
       * @return {?}
       */
      toString : function() {
        return toString(this);
      },
      /**
       * @return {?}
       */
      toOriginal : function() {
        return this.__state.conversion.write(this);
      }
    }), defineRGBComponent(Color.prototype, "r", 2), defineRGBComponent(Color.prototype, "g", 1), defineRGBComponent(Color.prototype, "b", 0), defineHSVComponent(Color.prototype, "h"), defineHSVComponent(Color.prototype, "s"), defineHSVComponent(Color.prototype, "v"), Object.defineProperty(Color.prototype, "a", {
      /**
       * @return {?}
       */
      get : function() {
        return this.__state.a;
      },
      /**
       * @param {number} recurring
       * @return {undefined}
       */
      set : function(recurring) {
        /** @type {number} */
        this.__state.a = recurring;
      }
    }), Object.defineProperty(Color.prototype, "hex", {
      /**
       * @return {?}
       */
      get : function() {
        return "HEX" !== !this.__state.space && (this.__state.hex = math.rgb_to_hex(this.r, this.g, this.b)), this.__state.hex;
      },
      /**
       * @param {number} recurring
       * @return {undefined}
       */
      set : function(recurring) {
        /** @type {string} */
        this.__state.space = "HEX";
        /** @type {number} */
        this.__state.hex = recurring;
      }
    }), Color;
  }(dat.color.interpret, dat.color.math = function() {
    var tmpComponent;
    return{
      /**
       * @param {number} h
       * @param {number} f
       * @param {number} s
       * @return {?}
       */
      hsv_to_rgb : function(h, f, s) {
        /** @type {number} */
        var unlock = Math.floor(h / 60) % 6;
        /** @type {number} */
        var y = h / 60 - Math.floor(h / 60);
        /** @type {number} */
        var b1 = s * (1 - f);
        /** @type {number} */
        var m = s * (1 - y * f);
        /** @type {number} */
        var c = s * (1 - (1 - y) * f);
        var cache = [[s, c, b1], [m, s, b1], [b1, s, c], [b1, m, s], [c, b1, s], [s, b1, m]][unlock];
        return{
          r : 255 * cache[0],
          g : 255 * cache[1],
          b : 255 * cache[2]
        };
      },
      /**
       * @param {number} r
       * @param {number} g
       * @param {number} b
       * @return {?}
       */
      rgb_to_hsv : function(r, g, b) {
        var ratio;
        var saturation;
        /** @type {number} */
        var min = Math.min(r, g, b);
        /** @type {number} */
        var max = Math.max(r, g, b);
        /** @type {number} */
        var delta = max - min;
        return 0 == max ? {
          h : NaN,
          s : 0,
          v : 0
        } : (saturation = delta / max, ratio = r == max ? (g - b) / delta : g == max ? 2 + (b - r) / delta : 4 + (r - g) / delta, ratio /= 6, 0 > ratio && (ratio += 1), {
          h : 360 * ratio,
          s : saturation,
          v : max / 255
        });
      },
      /**
       * @param {number} r
       * @param {number} g
       * @param {number} b
       * @return {?}
       */
      rgb_to_hex : function(r, g, b) {
        var hex = this.hex_with_component(0, 2, r);
        return hex = this.hex_with_component(hex, 1, g), hex = this.hex_with_component(hex, 0, b);
      },
      /**
       * @param {number} componentIndex
       * @param {number} dataAndEvents
       * @return {?}
       */
      component_from_hex : function(componentIndex, dataAndEvents) {
        return componentIndex >> 8 * dataAndEvents & 255;
      },
      /**
       * @param {number} hex
       * @param {number} componentIndex
       * @param {number} value
       * @return {?}
       */
      hex_with_component : function(hex, componentIndex, value) {
        return value << (tmpComponent = 8 * componentIndex) | hex & ~(255 << tmpComponent);
      }
    };
  }(), dat.color.toString, dat.utils.common), dat.color.interpret, dat.utils.common), dat.utils.requestAnimationFrame = function() {
    return window.webkitRequestAnimationFrame || (window.mozRequestAnimationFrame || (window.oRequestAnimationFrame || (window.msRequestAnimationFrame || function(after, dataAndEvents) {
      window.setTimeout(after, 1E3 / 60);
    })));
  }(), dat.dom.CenteredDiv = function(dom, common) {
    /**
     * @return {undefined}
     */
    var CenteredDiv = function() {
      /** @type {Element} */
      this.backgroundElement = document.createElement("div");
      common.extend(this.backgroundElement.style, {
        backgroundColor : "rgba(0,0,0,0.8)",
        top : 0,
        left : 0,
        display : "none",
        zIndex : "1000",
        opacity : 0,
        WebkitTransition : "opacity 0.2s linear"
      });
      dom.makeFullscreen(this.backgroundElement);
      /** @type {string} */
      this.backgroundElement.style.position = "fixed";
      /** @type {Element} */
      this.domElement = document.createElement("div");
      common.extend(this.domElement.style, {
        position : "fixed",
        display : "none",
        zIndex : "1001",
        opacity : 0,
        WebkitTransition : "-webkit-transform 0.2s ease-out, opacity 0.2s linear"
      });
      document.body.appendChild(this.backgroundElement);
      document.body.appendChild(this.domElement);
      var poster = this;
      dom.bind(this.backgroundElement, "click", function() {
        poster.hide();
      });
    };
    return CenteredDiv.prototype.show = function() {
      var _this = this;
      /** @type {string} */
      this.backgroundElement.style.display = "block";
      /** @type {string} */
      this.domElement.style.display = "block";
      /** @type {number} */
      this.domElement.style.opacity = 0;
      /** @type {string} */
      this.domElement.style.webkitTransform = "scale(1.1)";
      this.layout();
      common.defer(function() {
        /** @type {number} */
        _this.backgroundElement.style.opacity = 1;
        /** @type {number} */
        _this.domElement.style.opacity = 1;
        /** @type {string} */
        _this.domElement.style.webkitTransform = "scale(1)";
      });
    }, CenteredDiv.prototype.hide = function() {
      var _this = this;
      /**
       * @return {undefined}
       */
      var hide = function() {
        /** @type {string} */
        _this.domElement.style.display = "none";
        /** @type {string} */
        _this.backgroundElement.style.display = "none";
        dom.unbind(_this.domElement, "webkitTransitionEnd", hide);
        dom.unbind(_this.domElement, "transitionend", hide);
        dom.unbind(_this.domElement, "oTransitionEnd", hide);
      };
      dom.bind(this.domElement, "webkitTransitionEnd", hide);
      dom.bind(this.domElement, "transitionend", hide);
      dom.bind(this.domElement, "oTransitionEnd", hide);
      /** @type {number} */
      this.backgroundElement.style.opacity = 0;
      /** @type {number} */
      this.domElement.style.opacity = 0;
      /** @type {string} */
      this.domElement.style.webkitTransform = "scale(1.1)";
    }, CenteredDiv.prototype.layout = function() {
      /** @type {string} */
      this.domElement.style.left = window.innerWidth / 2 - dom.getWidth(this.domElement) / 2 + "px";
      /** @type {string} */
      this.domElement.style.top = window.innerHeight / 2 - dom.getHeight(this.domElement) / 2 + "px";
    }, CenteredDiv;
  }(dat.dom.dom, dat.utils.common), dat.dom.dom, dat.utils.common);
  /** @type {Array} */
  var _0x3619 = ["_init", "addChild", "msg_box", "getSprite", "drawRect", "#000", "beginFill", "graphics", "alpha", "click", "on", "cursor", "pointer", "x", "y", "regX", "width", "regY", "height", "#0f0f0f", "secret", "but_exit", "unload", "addEventListener", "DEVELOPED BY", " 50px ", "#ffffff", "textAlign", "center", "textBaseline", "middle", "logo_ctl", "WWW.CODETHISLAB.COM", "50px ", "CREATED BY GENNARO PALLADINO EX CODETHISLAB DEVELOPER", "40px ", "alphabetic", "lineWidth", "outline", "getBounds", 
  "removeChild", "call", "cubicOut", "Ease", "to", "wait", "bounceOut", "get", "Tween", "off", "removeAllEventListeners", "_onLogoButRelease", "http://www.codethislab.com/index.php?&l=en", "_blank", "open"];
  !function() {
    /**
     * @param {?} atts
     * @return {undefined}
     */
    var init = function(atts) {
      THREE.MeshBasicMaterial.call(this);
      /** @type {boolean} */
      this.depthTest = false;
      /** @type {boolean} */
      this.depthWrite = false;
      this.side = THREE.FrontSide;
      /** @type {boolean} */
      this.transparent = true;
      this.setValues(atts);
      this.oldColor = this.color.clone();
      this.oldOpacity = this.opacity;
      /**
       * @param {boolean} recurring
       * @return {undefined}
       */
      this.highlight = function(recurring) {
        if (recurring) {
          this.color.setRGB(1, 1, 0);
          /** @type {number} */
          this.opacity = 1;
        } else {
          this.color.copy(this.oldColor);
          this.opacity = this.oldOpacity;
        }
      };
    };
    /** @type {Object} */
    init.prototype = Object.create(THREE.MeshBasicMaterial.prototype);
    /** @type {function (?): undefined} */
    init.prototype.constructor = init;
    /**
     * @param {?} time
     * @return {undefined}
     */
    var update = function(time) {
      THREE.LineBasicMaterial.call(this);
      /** @type {boolean} */
      this.depthTest = false;
      /** @type {boolean} */
      this.depthWrite = false;
      /** @type {boolean} */
      this.transparent = true;
      /** @type {number} */
      this.linewidth = 1;
      this.setValues(time);
      this.oldColor = this.color.clone();
      this.oldOpacity = this.opacity;
      /**
       * @param {boolean} recurring
       * @return {undefined}
       */
      this.highlight = function(recurring) {
        if (recurring) {
          this.color.setRGB(1, 1, 0);
          /** @type {number} */
          this.opacity = 1;
        } else {
          this.color.copy(this.oldColor);
          this.opacity = this.oldOpacity;
        }
      };
    };
    /** @type {Object} */
    update.prototype = Object.create(THREE.LineBasicMaterial.prototype);
    /** @type {function (?): undefined} */
    update.prototype.constructor = update;
    var legMaterial = new init({
      visible : false,
      transparent : false
    });
    /**
     * @return {undefined}
     */
    THREE.TransformGizmo = function() {
      /**
       * @return {undefined}
       */
      this.init = function() {
        THREE.Object3D.call(this);
        this.handles = new THREE.Object3D;
        this.pickers = new THREE.Object3D;
        this.planes = new THREE.Object3D;
        this.add(this.handles);
        this.add(this.pickers);
        this.add(this.planes);
        var geometry = new THREE.PlaneBufferGeometry(50, 50, 2, 2);
        var legMaterial = new THREE.MeshBasicMaterial({
          visible : false,
          side : THREE.DoubleSide
        });
        var data = {
          XY : new THREE.Mesh(geometry, legMaterial),
          YZ : new THREE.Mesh(geometry, legMaterial),
          XZ : new THREE.Mesh(geometry, legMaterial),
          XYZE : new THREE.Mesh(geometry, legMaterial)
        };
        this.activePlane = data.XYZE;
        data.YZ.rotation.set(0, Math.PI / 2, 0);
        data.XZ.rotation.set(-Math.PI / 2, 0, 0);
        var i;
        for (i in data) {
          data[i].name = i;
          this.planes.add(data[i]);
          this.planes[i] = data[i];
        }
        /**
         * @param {Array} ctx
         * @param {?} col
         * @return {undefined}
         */
        var render = function(ctx, col) {
          var key;
          for (key in ctx) {
            i = ctx[key].length;
            for (;i--;) {
              var obj = ctx[key][i][0];
              var te = ctx[key][i][1];
              var s = ctx[key][i][2];
              /** @type {string} */
              obj.name = key;
              if (te) {
                obj.position.set(te[0], te[1], te[2]);
              }
              if (s) {
                obj.rotation.set(s[0], s[1], s[2]);
              }
              col.add(obj);
            }
          }
        };
        render(this.handleGizmos, this.handles);
        render(this.pickerGizmos, this.pickers);
        this.traverse(function(object) {
          if (object instanceof THREE.Mesh) {
            object.updateMatrix();
            var geometry = object.geometry.clone();
            geometry.applyMatrix(object.matrix);
            object.geometry = geometry;
            object.position.set(0, 0, 0);
            object.rotation.set(0, 0, 0);
            object.scale.set(1, 1, 1);
          }
        });
      };
      /**
       * @param {boolean} index
       * @return {undefined}
       */
      this.highlight = function(index) {
        this.traverse(function(self) {
          if (self.material) {
            if (self.material.highlight) {
              if (self.name === index) {
                self.material.highlight(true);
              } else {
                self.material.highlight(false);
              }
            }
          }
        });
      };
    };
    /** @type {Object} */
    THREE.TransformGizmo.prototype = Object.create(THREE.Object3D.prototype);
    /** @type {function (): undefined} */
    THREE.TransformGizmo.prototype.constructor = THREE.TransformGizmo;
    /**
     * @param {?} element
     * @param {?} v
     * @return {undefined}
     */
    THREE.TransformGizmo.prototype.update = function(element, v) {
      var vec = new THREE.Vector3(0, 0, 0);
      var up = new THREE.Vector3(0, 1, 0);
      var mat = new THREE.Matrix4;
      this.traverse(function(obj) {
        if (-1 !== obj.name.search("E")) {
          obj.quaternion.setFromRotationMatrix(mat.lookAt(v, vec, up));
        } else {
          if (!(-1 === obj.name.search("X") && (-1 === obj.name.search("Y") && -1 === obj.name.search("Z")))) {
            obj.quaternion.setFromEuler(element);
          }
        }
      });
    };
    /**
     * @return {undefined}
     */
    THREE.TransformGizmoTranslate = function() {
      THREE.TransformGizmo.call(this);
      var options = new THREE.Geometry;
      var obj = new THREE.Mesh(new THREE.CylinderGeometry(0, 0.05, 0.2, 12, 1, false));
      /** @type {number} */
      obj.position.y = 0.5;
      obj.updateMatrix();
      options.merge(obj.geometry, obj.matrix);
      var node = new THREE.BufferGeometry;
      node.addAttribute("position", new THREE.Float32Attribute([0, 0, 0, 1, 0, 0], 3));
      var object = new THREE.BufferGeometry;
      object.addAttribute("position", new THREE.Float32Attribute([0, 0, 0, 0, 1, 0], 3));
      var lineGeometry = new THREE.BufferGeometry;
      lineGeometry.addAttribute("position", new THREE.Float32Attribute([0, 0, 0, 0, 0, 1], 3));
      this.handleGizmos = {
        X : [[new THREE.Mesh(options, new init({
          color : 16711680
        })), [0.5, 0, 0], [0, 0, -Math.PI / 2]], [new THREE.Line(node, new update({
          color : 16711680
        }))]],
        Y : [[new THREE.Mesh(options, new init({
          color : 65280
        })), [0, 0.5, 0]], [new THREE.Line(object, new update({
          color : 65280
        }))]],
        Z : [[new THREE.Mesh(options, new init({
          color : 255
        })), [0, 0, 0.5], [Math.PI / 2, 0, 0]], [new THREE.Line(lineGeometry, new update({
          color : 255
        }))]],
        XYZ : [[new THREE.Mesh(new THREE.OctahedronGeometry(0.1, 0), new init({
          color : 16777215,
          opacity : 0.25
        })), [0, 0, 0], [0, 0, 0]]],
        XY : [[new THREE.Mesh(new THREE.PlaneBufferGeometry(0.29, 0.29), new init({
          color : 16776960,
          opacity : 0.25
        })), [0.15, 0.15, 0]]],
        YZ : [[new THREE.Mesh(new THREE.PlaneBufferGeometry(0.29, 0.29), new init({
          color : 65535,
          opacity : 0.25
        })), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]],
        XZ : [[new THREE.Mesh(new THREE.PlaneBufferGeometry(0.29, 0.29), new init({
          color : 16711935,
          opacity : 0.25
        })), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]]
      };
      this.pickerGizmos = {
        X : [[new THREE.Mesh(new THREE.CylinderBufferGeometry(0.2, 0, 1, 4, 1, false), legMaterial), [0.6, 0, 0], [0, 0, -Math.PI / 2]]],
        Y : [[new THREE.Mesh(new THREE.CylinderBufferGeometry(0.2, 0, 1, 4, 1, false), legMaterial), [0, 0.6, 0]]],
        Z : [[new THREE.Mesh(new THREE.CylinderBufferGeometry(0.2, 0, 1, 4, 1, false), legMaterial), [0, 0, 0.6], [Math.PI / 2, 0, 0]]],
        XYZ : [[new THREE.Mesh(new THREE.OctahedronGeometry(0.2, 0), legMaterial)]],
        XY : [[new THREE.Mesh(new THREE.PlaneBufferGeometry(0.4, 0.4), legMaterial), [0.2, 0.2, 0]]],
        YZ : [[new THREE.Mesh(new THREE.PlaneBufferGeometry(0.4, 0.4), legMaterial), [0, 0.2, 0.2], [0, Math.PI / 2, 0]]],
        XZ : [[new THREE.Mesh(new THREE.PlaneBufferGeometry(0.4, 0.4), legMaterial), [0.2, 0, 0.2], [-Math.PI / 2, 0, 0]]]
      };
      /**
       * @param {string} dataAndEvents
       * @param {?} vec
       * @return {undefined}
       */
      this.setActivePlane = function(dataAndEvents, vec) {
        var tempMatrix = new THREE.Matrix4;
        vec.applyMatrix4(tempMatrix.getInverse(tempMatrix.extractRotation(this.planes.XY.matrixWorld)));
        if ("X" === dataAndEvents) {
          this.activePlane = this.planes.XY;
          if (Math.abs(vec.y) > Math.abs(vec.z)) {
            this.activePlane = this.planes.XZ;
          }
        }
        if ("Y" === dataAndEvents) {
          this.activePlane = this.planes.XY;
          if (Math.abs(vec.x) > Math.abs(vec.z)) {
            this.activePlane = this.planes.YZ;
          }
        }
        if ("Z" === dataAndEvents) {
          this.activePlane = this.planes.XZ;
          if (Math.abs(vec.x) > Math.abs(vec.y)) {
            this.activePlane = this.planes.YZ;
          }
        }
        if ("XYZ" === dataAndEvents) {
          this.activePlane = this.planes.XYZE;
        }
        if ("XY" === dataAndEvents) {
          this.activePlane = this.planes.XY;
        }
        if ("YZ" === dataAndEvents) {
          this.activePlane = this.planes.YZ;
        }
        if ("XZ" === dataAndEvents) {
          this.activePlane = this.planes.XZ;
        }
      };
      this.init();
    };
    /** @type {Object} */
    THREE.TransformGizmoTranslate.prototype = Object.create(THREE.TransformGizmo.prototype);
    /** @type {function (): undefined} */
    THREE.TransformGizmoTranslate.prototype.constructor = THREE.TransformGizmoTranslate;
    /**
     * @return {undefined}
     */
    THREE.TransformGizmoRotate = function() {
      THREE.TransformGizmo.call(this);
      /**
       * @param {number} radius
       * @param {string} y
       * @param {number} arc
       * @return {?}
       */
      var Circle = function(radius, y, arc) {
        var me = new THREE.BufferGeometry;
        /** @type {Array} */
        var ctx = [];
        arc = arc ? arc : 1;
        /** @type {number} */
        var position = 0;
        for (;64 * arc >= position;++position) {
          if ("x" === y) {
            ctx.push(0, Math.cos(position / 32 * Math.PI) * radius, Math.sin(position / 32 * Math.PI) * radius);
          }
          if ("y" === y) {
            ctx.push(Math.cos(position / 32 * Math.PI) * radius, 0, Math.sin(position / 32 * Math.PI) * radius);
          }
          if ("z" === y) {
            ctx.push(Math.sin(position / 32 * Math.PI) * radius, Math.cos(position / 32 * Math.PI) * radius, 0);
          }
        }
        return me.addAttribute("position", new THREE.Float32Attribute(ctx, 3)), me;
      };
      this.handleGizmos = {
        X : [[new THREE.Line(new Circle(1, "x", 0.5), new update({
          color : 16711680
        }))]],
        Y : [[new THREE.Line(new Circle(1, "y", 0.5), new update({
          color : 65280
        }))]],
        Z : [[new THREE.Line(new Circle(1, "z", 0.5), new update({
          color : 255
        }))]],
        E : [[new THREE.Line(new Circle(1.25, "z", 1), new update({
          color : 13421568
        }))]],
        XYZE : [[new THREE.Line(new Circle(1, "z", 1), new update({
          color : 7895160
        }))]]
      };
      this.pickerGizmos = {
        X : [[new THREE.Mesh(new THREE.TorusBufferGeometry(1, 0.12, 4, 12, Math.PI), legMaterial), [0, 0, 0], [0, -Math.PI / 2, -Math.PI / 2]]],
        Y : [[new THREE.Mesh(new THREE.TorusBufferGeometry(1, 0.12, 4, 12, Math.PI), legMaterial), [0, 0, 0], [Math.PI / 2, 0, 0]]],
        Z : [[new THREE.Mesh(new THREE.TorusBufferGeometry(1, 0.12, 4, 12, Math.PI), legMaterial), [0, 0, 0], [0, 0, -Math.PI / 2]]],
        E : [[new THREE.Mesh(new THREE.TorusBufferGeometry(1.25, 0.12, 2, 24), legMaterial)]],
        XYZE : [[new THREE.Mesh(new THREE.Geometry)]]
      };
      /**
       * @param {string} dataAndEvents
       * @return {undefined}
       */
      this.setActivePlane = function(dataAndEvents) {
        if ("E" === dataAndEvents) {
          this.activePlane = this.planes.XYZE;
        }
        if ("X" === dataAndEvents) {
          this.activePlane = this.planes.YZ;
        }
        if ("Y" === dataAndEvents) {
          this.activePlane = this.planes.XZ;
        }
        if ("Z" === dataAndEvents) {
          this.activePlane = this.planes.XY;
        }
      };
      /**
       * @param {?} element
       * @param {?} node
       * @return {undefined}
       */
      this.update = function(element, node) {
        THREE.TransformGizmo.prototype.update.apply(this, arguments);
        var tempMatrix = ({
          handles : this.handles,
          pickers : this.pickers
        }, new THREE.Matrix4);
        var worldRotation = new THREE.Euler(0, 0, 1);
        var tempQuaternion = new THREE.Quaternion;
        var unitZ = new THREE.Vector3(1, 0, 0);
        var unitX = new THREE.Vector3(0, 1, 0);
        var unitY = new THREE.Vector3(0, 0, 1);
        var quaternionZ = new THREE.Quaternion;
        var quaternionX = new THREE.Quaternion;
        var quaternionY = new THREE.Quaternion;
        var eye = node.clone();
        worldRotation.copy(this.planes.XY.rotation);
        tempQuaternion.setFromEuler(worldRotation);
        tempMatrix.makeRotationFromQuaternion(tempQuaternion).getInverse(tempMatrix);
        eye.applyMatrix4(tempMatrix);
        this.traverse(function(body) {
          tempQuaternion.setFromEuler(worldRotation);
          if ("X" === body.name) {
            quaternionZ.setFromAxisAngle(unitZ, Math.atan2(-eye.y, eye.z));
            tempQuaternion.multiplyQuaternions(tempQuaternion, quaternionZ);
            body.quaternion.copy(tempQuaternion);
          }
          if ("Y" === body.name) {
            quaternionX.setFromAxisAngle(unitX, Math.atan2(eye.x, eye.z));
            tempQuaternion.multiplyQuaternions(tempQuaternion, quaternionX);
            body.quaternion.copy(tempQuaternion);
          }
          if ("Z" === body.name) {
            quaternionY.setFromAxisAngle(unitY, Math.atan2(eye.y, eye.x));
            tempQuaternion.multiplyQuaternions(tempQuaternion, quaternionY);
            body.quaternion.copy(tempQuaternion);
          }
        });
      };
      this.init();
    };
    /** @type {Object} */
    THREE.TransformGizmoRotate.prototype = Object.create(THREE.TransformGizmo.prototype);
    /** @type {function (): undefined} */
    THREE.TransformGizmoRotate.prototype.constructor = THREE.TransformGizmoRotate;
    /**
     * @return {undefined}
     */
    THREE.TransformGizmoScale = function() {
      THREE.TransformGizmo.call(this);
      var options = new THREE.Geometry;
      var obj = new THREE.Mesh(new THREE.BoxGeometry(0.125, 0.125, 0.125));
      /** @type {number} */
      obj.position.y = 0.5;
      obj.updateMatrix();
      options.merge(obj.geometry, obj.matrix);
      var node = new THREE.BufferGeometry;
      node.addAttribute("position", new THREE.Float32Attribute([0, 0, 0, 1, 0, 0], 3));
      var object = new THREE.BufferGeometry;
      object.addAttribute("position", new THREE.Float32Attribute([0, 0, 0, 0, 1, 0], 3));
      var lineGeometry = new THREE.BufferGeometry;
      lineGeometry.addAttribute("position", new THREE.Float32Attribute([0, 0, 0, 0, 0, 1], 3));
      this.handleGizmos = {
        X : [[new THREE.Mesh(options, new init({
          color : 16711680
        })), [0.5, 0, 0], [0, 0, -Math.PI / 2]], [new THREE.Line(node, new update({
          color : 16711680
        }))]],
        Y : [[new THREE.Mesh(options, new init({
          color : 65280
        })), [0, 0.5, 0]], [new THREE.Line(object, new update({
          color : 65280
        }))]],
        Z : [[new THREE.Mesh(options, new init({
          color : 255
        })), [0, 0, 0.5], [Math.PI / 2, 0, 0]], [new THREE.Line(lineGeometry, new update({
          color : 255
        }))]],
        XYZ : [[new THREE.Mesh(new THREE.BoxBufferGeometry(0.125, 0.125, 0.125), new init({
          color : 16777215,
          opacity : 0.25
        }))]]
      };
      this.pickerGizmos = {
        X : [[new THREE.Mesh(new THREE.CylinderBufferGeometry(0.2, 0, 1, 4, 1, false), legMaterial), [0.6, 0, 0], [0, 0, -Math.PI / 2]]],
        Y : [[new THREE.Mesh(new THREE.CylinderBufferGeometry(0.2, 0, 1, 4, 1, false), legMaterial), [0, 0.6, 0]]],
        Z : [[new THREE.Mesh(new THREE.CylinderBufferGeometry(0.2, 0, 1, 4, 1, false), legMaterial), [0, 0, 0.6], [Math.PI / 2, 0, 0]]],
        XYZ : [[new THREE.Mesh(new THREE.BoxBufferGeometry(0.4, 0.4, 0.4), legMaterial)]]
      };
      /**
       * @param {string} dataAndEvents
       * @param {?} vec
       * @return {undefined}
       */
      this.setActivePlane = function(dataAndEvents, vec) {
        var tempMatrix = new THREE.Matrix4;
        vec.applyMatrix4(tempMatrix.getInverse(tempMatrix.extractRotation(this.planes.XY.matrixWorld)));
        if ("X" === dataAndEvents) {
          this.activePlane = this.planes.XY;
          if (Math.abs(vec.y) > Math.abs(vec.z)) {
            this.activePlane = this.planes.XZ;
          }
        }
        if ("Y" === dataAndEvents) {
          this.activePlane = this.planes.XY;
          if (Math.abs(vec.x) > Math.abs(vec.z)) {
            this.activePlane = this.planes.YZ;
          }
        }
        if ("Z" === dataAndEvents) {
          this.activePlane = this.planes.XZ;
          if (Math.abs(vec.x) > Math.abs(vec.y)) {
            this.activePlane = this.planes.YZ;
          }
        }
        if ("XYZ" === dataAndEvents) {
          this.activePlane = this.planes.XYZE;
        }
      };
      this.init();
    };
    /** @type {Object} */
    THREE.TransformGizmoScale.prototype = Object.create(THREE.TransformGizmo.prototype);
    /** @type {function (): undefined} */
    THREE.TransformGizmoScale.prototype.constructor = THREE.TransformGizmoScale;
    /**
     * @param {?} monster
     * @param {Element} element
     * @return {undefined}
     */
    THREE.TransformControls = function(monster, element) {
      /**
       * @param {Object} e
       * @return {undefined}
       */
      function handler(e) {
        if (void 0 !== scope.object && (c !== true && (void 0 === e.button || 0 === e.button))) {
          var data = e.changedTouches ? e.changedTouches[0] : e;
          var a = update(data, current[type].pickers.children);
          /** @type {null} */
          var name = null;
          if (a) {
            name = a.object.name;
            e.preventDefault();
          }
          if (scope.axis !== name) {
            scope.axis = name;
            scope.update();
            scope.dispatchEvent(changeEvent);
          }
        }
      }
      /**
       * @param {Event} e
       * @return {undefined}
       */
      function onMouseDown(e) {
        if (void 0 !== scope.object && (c !== true && (void 0 === e.button || 0 === e.button))) {
          var event = e.changedTouches ? e.changedTouches[0] : e;
          if (0 === event.button || void 0 === event.button) {
            var a = update(event, current[type].pickers.children);
            if (a) {
              e.preventDefault();
              e.stopPropagation();
              scope.dispatchEvent(obj);
              scope.axis = a.object.name;
              scope.update();
              axis.copy(center).sub(vector).normalize();
              current[type].setActivePlane(scope.axis, axis);
              var planeIntersect = update(event, [current[type].activePlane]);
              if (planeIntersect) {
                oldPosition.copy(scope.object.position);
                scale.copy(scope.object.scale);
                oldRotationMatrix.extractRotation(scope.object.matrix);
                worldRotationMatrix.extractRotation(scope.object.matrixWorld);
                parentRotationMatrix.extractRotation(scope.object.parent.matrixWorld);
                parentScale.setFromMatrixScale(tempMatrix.getInverse(scope.object.parent.matrixWorld));
                offset.copy(planeIntersect.point);
              }
            }
          }
          /** @type {boolean} */
          c = true;
        }
      }
      /**
       * @param {Event} e
       * @return {undefined}
       */
      function onMouseMove(e) {
        if (void 0 !== scope.object && (null !== scope.axis && (c !== false && (void 0 === e.button || 0 === e.button)))) {
          var pos = e.changedTouches ? e.changedTouches[0] : e;
          var target = update(pos, [current[type].activePlane]);
          if (target !== false) {
            e.preventDefault();
            e.stopPropagation();
            point.copy(target.point);
            if ("translate" === type) {
              point.sub(offset);
              point.multiply(parentScale);
              if ("local" === scope.space) {
                point.applyMatrix4(tempMatrix.getInverse(worldRotationMatrix));
                if (-1 === scope.axis.search("X")) {
                  /** @type {number} */
                  point.x = 0;
                }
                if (-1 === scope.axis.search("Y")) {
                  /** @type {number} */
                  point.y = 0;
                }
                if (-1 === scope.axis.search("Z")) {
                  /** @type {number} */
                  point.z = 0;
                }
                point.applyMatrix4(oldRotationMatrix);
                scope.object.position.copy(oldPosition);
                scope.object.position.add(point);
                scope.body.position.copy(scope.object.position);
              }
              if (!("world" !== scope.space && -1 === scope.axis.search("XYZ"))) {
                if (-1 === scope.axis.search("X")) {
                  /** @type {number} */
                  point.x = 0;
                }
                if (-1 === scope.axis.search("Y")) {
                  /** @type {number} */
                  point.y = 0;
                }
                if (-1 === scope.axis.search("Z")) {
                  /** @type {number} */
                  point.z = 0;
                }
                point.applyMatrix4(tempMatrix.getInverse(parentRotationMatrix));
                scope.object.position.copy(oldPosition);
                scope.object.position.add(point);
                scope.body.position.copy(scope.object.position);
              }
              if (null !== scope.translationSnap) {
                if ("local" === scope.space) {
                  scope.object.position.applyMatrix4(tempMatrix.getInverse(worldRotationMatrix));
                }
                if (-1 !== scope.axis.search("X")) {
                  /** @type {number} */
                  scope.object.position.x = Math.round(scope.object.position.x / scope.translationSnap) * scope.translationSnap;
                }
                if (-1 !== scope.axis.search("Y")) {
                  /** @type {number} */
                  scope.object.position.y = Math.round(scope.object.position.y / scope.translationSnap) * scope.translationSnap;
                }
                if (-1 !== scope.axis.search("Z")) {
                  /** @type {number} */
                  scope.object.position.z = Math.round(scope.object.position.z / scope.translationSnap) * scope.translationSnap;
                }
                if ("local" === scope.space) {
                  scope.object.position.applyMatrix4(worldRotationMatrix);
                }
              }
            } else {
              if ("scale" === type) {
                point.sub(offset);
                point.multiply(parentScale);
                if ("local" === scope.space) {
                  if ("XYZ" === scope.axis) {
                    /** @type {number} */
                    recurring = 1 + point.y / Math.max(scale.x, scale.y, scale.z);
                    /** @type {number} */
                    scope.object.scale.x = scale.x * recurring;
                    /** @type {number} */
                    scope.object.scale.y = scale.y * recurring;
                    /** @type {number} */
                    scope.object.scale.z = scale.z * recurring;
                  } else {
                    point.applyMatrix4(tempMatrix.getInverse(worldRotationMatrix));
                    if ("X" === scope.axis) {
                      /** @type {number} */
                      scope.object.scale.x = scale.x * (1 + point.x / scale.x);
                    }
                    if ("Y" === scope.axis) {
                      /** @type {number} */
                      scope.object.scale.y = scale.y * (1 + point.y / scale.y);
                    }
                    if ("Z" === scope.axis) {
                      /** @type {number} */
                      scope.object.scale.z = scale.z * (1 + point.z / scale.z);
                    }
                  }
                }
              } else {
                if ("rotate" === type) {
                  point.sub(vector);
                  point.multiply(parentScale);
                  tempVector.copy(offset).sub(vector);
                  tempVector.multiply(parentScale);
                  if ("E" === scope.axis) {
                    point.applyMatrix4(tempMatrix.getInverse(lookAtMatrix));
                    tempVector.applyMatrix4(tempMatrix.getInverse(lookAtMatrix));
                    a.set(Math.atan2(point.z, point.y), Math.atan2(point.x, point.z), Math.atan2(point.y, point.x));
                    b.set(Math.atan2(tempVector.z, tempVector.y), Math.atan2(tempVector.x, tempVector.z), Math.atan2(tempVector.y, tempVector.x));
                    tempQuaternion.setFromRotationMatrix(tempMatrix.getInverse(parentRotationMatrix));
                    quaternionE.setFromAxisAngle(axis, a.z - b.z);
                    quaternionXYZ.setFromRotationMatrix(worldRotationMatrix);
                    tempQuaternion.multiplyQuaternions(tempQuaternion, quaternionE);
                    tempQuaternion.multiplyQuaternions(tempQuaternion, quaternionXYZ);
                    scope.object.quaternion.copy(tempQuaternion);
                    scope.body.quaternion.copy(tempQuaternion);
                  } else {
                    if ("XYZE" === scope.axis) {
                      quaternionE.setFromEuler(point.clone().cross(tempVector).normalize());
                      tempQuaternion.setFromRotationMatrix(tempMatrix.getInverse(parentRotationMatrix));
                      quaternionX.setFromAxisAngle(quaternionE, -point.clone().angleTo(tempVector));
                      quaternionXYZ.setFromRotationMatrix(worldRotationMatrix);
                      tempQuaternion.multiplyQuaternions(tempQuaternion, quaternionX);
                      tempQuaternion.multiplyQuaternions(tempQuaternion, quaternionXYZ);
                      scope.object.quaternion.copy(tempQuaternion);
                      scope.body.quaternion.copy(tempQuaternion);
                    } else {
                      if ("local" === scope.space) {
                        point.applyMatrix4(tempMatrix.getInverse(worldRotationMatrix));
                        tempVector.applyMatrix4(tempMatrix.getInverse(worldRotationMatrix));
                        a.set(Math.atan2(point.z, point.y), Math.atan2(point.x, point.z), Math.atan2(point.y, point.x));
                        b.set(Math.atan2(tempVector.z, tempVector.y), Math.atan2(tempVector.x, tempVector.z), Math.atan2(tempVector.y, tempVector.x));
                        quaternionXYZ.setFromRotationMatrix(oldRotationMatrix);
                        if (null !== scope.rotationSnap) {
                          quaternionX.setFromAxisAngle(unitX, Math.round((a.x - b.x) / scope.rotationSnap) * scope.rotationSnap);
                          quaternionZ.setFromAxisAngle(unitZ, Math.round((a.y - b.y) / scope.rotationSnap) * scope.rotationSnap);
                          quaternionY.setFromAxisAngle(unitY, Math.round((a.z - b.z) / scope.rotationSnap) * scope.rotationSnap);
                        } else {
                          quaternionX.setFromAxisAngle(unitX, a.x - b.x);
                          quaternionZ.setFromAxisAngle(unitZ, a.y - b.y);
                          quaternionY.setFromAxisAngle(unitY, a.z - b.z);
                        }
                        if ("X" === scope.axis) {
                          quaternionXYZ.multiplyQuaternions(quaternionXYZ, quaternionX);
                        }
                        if ("Y" === scope.axis) {
                          quaternionXYZ.multiplyQuaternions(quaternionXYZ, quaternionZ);
                        }
                        if ("Z" === scope.axis) {
                          quaternionXYZ.multiplyQuaternions(quaternionXYZ, quaternionY);
                        }
                        scope.object.quaternion.copy(quaternionXYZ);
                        scope.body.quaternion.copy(quaternionXYZ);
                      } else {
                        if ("world" === scope.space) {
                          a.set(Math.atan2(point.z, point.y), Math.atan2(point.x, point.z), Math.atan2(point.y, point.x));
                          b.set(Math.atan2(tempVector.z, tempVector.y), Math.atan2(tempVector.x, tempVector.z), Math.atan2(tempVector.y, tempVector.x));
                          tempQuaternion.setFromRotationMatrix(tempMatrix.getInverse(parentRotationMatrix));
                          if (null !== scope.rotationSnap) {
                            quaternionX.setFromAxisAngle(unitX, Math.round((a.x - b.x) / scope.rotationSnap) * scope.rotationSnap);
                            quaternionZ.setFromAxisAngle(unitZ, Math.round((a.y - b.y) / scope.rotationSnap) * scope.rotationSnap);
                            quaternionY.setFromAxisAngle(unitY, Math.round((a.z - b.z) / scope.rotationSnap) * scope.rotationSnap);
                          } else {
                            quaternionX.setFromAxisAngle(unitX, a.x - b.x);
                            quaternionZ.setFromAxisAngle(unitZ, a.y - b.y);
                            quaternionY.setFromAxisAngle(unitY, a.z - b.z);
                          }
                          quaternionXYZ.setFromRotationMatrix(worldRotationMatrix);
                          if ("X" === scope.axis) {
                            tempQuaternion.multiplyQuaternions(tempQuaternion, quaternionX);
                          }
                          if ("Y" === scope.axis) {
                            tempQuaternion.multiplyQuaternions(tempQuaternion, quaternionZ);
                          }
                          if ("Z" === scope.axis) {
                            tempQuaternion.multiplyQuaternions(tempQuaternion, quaternionY);
                          }
                          tempQuaternion.multiplyQuaternions(tempQuaternion, quaternionXYZ);
                          scope.object.quaternion.copy(tempQuaternion);
                          scope.body.quaternion.copy(tempQuaternion);
                        }
                      }
                    }
                  }
                }
              }
            }
            scope.update();
            scope.dispatchEvent(changeEvent);
            scope.dispatchEvent(event);
          }
        }
      }
      /**
       * @param {Object} e
       * @return {undefined}
       */
      function onKeyDown(e) {
        e.preventDefault();
        if (!(void 0 !== e.button && 0 !== e.button)) {
          if (c) {
            if (null !== scope.axis) {
              data.mode = type;
              scope.dispatchEvent(data);
            }
          }
          /** @type {boolean} */
          c = false;
          if (e instanceof TouchEvent) {
            /** @type {null} */
            scope.axis = null;
            scope.update();
            scope.dispatchEvent(changeEvent);
          } else {
            handler(e);
          }
        }
      }
      /**
       * @param {Event} e
       * @param {Array} bytes
       * @return {?}
       */
      function update(e, bytes) {
        var rect = element.getBoundingClientRect();
        /** @type {number} */
        var a = (e.clientX - rect.left) / rect.width;
        /** @type {number} */
        var s = (e.clientY - rect.top) / rect.height;
        prefix.set(2 * a - 1, -(2 * s) + 1);
        buf.setFromCamera(prefix, monster);
        var d = buf.intersectObjects(bytes, true);
        return d[0] ? d[0] : false;
      }
      THREE.Object3D.call(this);
      element = void 0 !== element ? element : document;
      this.body = void 0;
      this.object = void 0;
      /** @type {boolean} */
      this.visible = false;
      /** @type {null} */
      this.translationSnap = null;
      /** @type {null} */
      this.rotationSnap = null;
      /** @type {string} */
      this.space = "world";
      /** @type {number} */
      this.size = 1;
      /** @type {null} */
      this.axis = null;
      var scope = this;
      /** @type {string} */
      var type = "translate";
      /** @type {boolean} */
      var c = false;
      var current = {
        translate : new THREE.TransformGizmoTranslate,
        rotate : new THREE.TransformGizmoRotate,
        scale : new THREE.TransformGizmoScale
      };
      var i;
      for (i in current) {
        var node = current[i];
        /** @type {boolean} */
        node.visible = i === type;
        this.add(node);
      }
      var changeEvent = {
        type : "change"
      };
      var obj = {
        type : "mouseDown"
      };
      var data = {
        type : "mouseUp",
        mode : type
      };
      var event = {
        type : "objectChange"
      };
      var buf = new THREE.Raycaster;
      var prefix = new THREE.Vector2;
      var point = new THREE.Vector3;
      var offset = new THREE.Vector3;
      var a = new THREE.Vector3;
      var b = new THREE.Vector3;
      /** @type {number} */
      var recurring = 1;
      var lookAtMatrix = new THREE.Matrix4;
      var axis = new THREE.Vector3;
      var tempMatrix = new THREE.Matrix4;
      var tempVector = new THREE.Vector3;
      var tempQuaternion = new THREE.Quaternion;
      var unitX = new THREE.Vector3(1, 0, 0);
      var unitZ = new THREE.Vector3(0, 1, 0);
      var unitY = new THREE.Vector3(0, 0, 1);
      var quaternionXYZ = new THREE.Quaternion;
      var quaternionX = new THREE.Quaternion;
      var quaternionZ = new THREE.Quaternion;
      var quaternionY = new THREE.Quaternion;
      var quaternionE = new THREE.Quaternion;
      var oldPosition = new THREE.Vector3;
      var scale = new THREE.Vector3;
      var oldRotationMatrix = new THREE.Matrix4;
      var parentRotationMatrix = new THREE.Matrix4;
      var parentScale = new THREE.Vector3;
      var vector = new THREE.Vector3;
      var activeClassName = new THREE.Euler;
      var worldRotationMatrix = new THREE.Matrix4;
      var center = new THREE.Vector3;
      var camRotation = new THREE.Euler;
      element.addEventListener("mousedown", onMouseDown, false);
      element.addEventListener("touchstart", onMouseDown, false);
      element.addEventListener("mousemove", handler, false);
      element.addEventListener("touchmove", handler, false);
      element.addEventListener("mousemove", onMouseMove, false);
      element.addEventListener("touchmove", onMouseMove, false);
      element.addEventListener("mouseup", onKeyDown, false);
      element.addEventListener("mouseout", onKeyDown, false);
      element.addEventListener("touchend", onKeyDown, false);
      element.addEventListener("touchcancel", onKeyDown, false);
      element.addEventListener("touchleave", onKeyDown, false);
      /**
       * @return {undefined}
       */
      this.dispose = function() {
        element.removeEventListener("mousedown", onMouseDown);
        element.removeEventListener("touchstart", onMouseDown);
        element.removeEventListener("mousemove", handler);
        element.removeEventListener("touchmove", handler);
        element.removeEventListener("mousemove", onMouseMove);
        element.removeEventListener("touchmove", onMouseMove);
        element.removeEventListener("mouseup", onKeyDown);
        element.removeEventListener("mouseout", onKeyDown);
        element.removeEventListener("touchend", onKeyDown);
        element.removeEventListener("touchcancel", onKeyDown);
        element.removeEventListener("touchleave", onKeyDown);
      };
      /**
       * @param {Object} object
       * @param {Object} context
       * @return {undefined}
       */
      this.attach = function(object, context) {
        /** @type {Object} */
        this.body = context;
        /** @type {Object} */
        this.object = object;
        /** @type {boolean} */
        this.visible = true;
        this.update();
      };
      /**
       * @return {undefined}
       */
      this.detach = function() {
        this.body = void 0;
        this.object = void 0;
        /** @type {boolean} */
        this.visible = false;
        /** @type {null} */
        this.axis = null;
      };
      /**
       * @return {?}
       */
      this.getMode = function() {
        return type;
      };
      /**
       * @param {string} json
       * @return {undefined}
       */
      this.setMode = function(json) {
        type = json ? json : type;
        if ("scale" === type) {
          /** @type {string} */
          scope.space = "local";
        }
        var i;
        for (i in current) {
          /** @type {boolean} */
          current[i].visible = i === type;
        }
        this.update();
        scope.dispatchEvent(changeEvent);
      };
      /**
       * @param {number} outstandingDataSize
       * @return {undefined}
       */
      this.setTranslationSnap = function(outstandingDataSize) {
        /** @type {number} */
        scope.translationSnap = outstandingDataSize;
      };
      /**
       * @param {number} recurring
       * @return {undefined}
       */
      this.setRotationSnap = function(recurring) {
        /** @type {number} */
        scope.rotationSnap = recurring;
      };
      /**
       * @param {number} width
       * @return {undefined}
       */
      this.setSize = function(width) {
        /** @type {number} */
        scope.size = width;
        this.update();
        scope.dispatchEvent(changeEvent);
      };
      /**
       * @param {string} space
       * @return {undefined}
       */
      this.setSpace = function(space) {
        /** @type {string} */
        scope.space = space;
        this.update();
        scope.dispatchEvent(changeEvent);
      };
      /**
       * @return {undefined}
       */
      this.update = function() {
        if (void 0 !== scope.object) {
          scope.object.updateMatrixWorld();
          vector.setFromMatrixPosition(scope.object.matrixWorld);
          activeClassName.setFromRotationMatrix(tempMatrix.extractRotation(scope.object.matrixWorld));
          monster.updateMatrixWorld();
          center.setFromMatrixPosition(monster.matrixWorld);
          camRotation.setFromRotationMatrix(tempMatrix.extractRotation(monster.matrixWorld));
          /** @type {number} */
          recurring = vector.distanceTo(center) / 6 * scope.size;
          this.position.copy(vector);
          this.scale.set(recurring, recurring, recurring);
          axis.copy(center).sub(vector).normalize();
          if ("local" === scope.space) {
            current[type].update(activeClassName, axis);
          } else {
            if ("world" === scope.space) {
              current[type].update(new THREE.Euler, axis);
            }
          }
          current[type].highlight(scope.axis);
        }
      };
    };
    /** @type {Object} */
    THREE.TransformControls.prototype = Object.create(THREE.Object3D.prototype);
    /** @type {function (?, Element): undefined} */
    THREE.TransformControls.prototype.constructor = THREE.TransformControls;
  }();
  /** @type {null} */
  var s_oMenu = null;
  TEXT_GAMEOVER = "GAME OVER", TEXT_OF = "/", TEXT_SCORE = "SCORE", TEXT_BEST_SCORE = "BEST SCORE", TEXT_MULTIPLIER = "x", TEXT_BALLS = "BALLS", TEXT_LAUNCH = "KICK", TEXT_GOAL = "GOAL!", TEXT_ARE_SURE = "ARE YOU SURE?", TEXT_BALL_OUT = "OUT", TEXT_PAUSE = "PAUSE", TEXT_HOW_TO_PLAY = "HOW TO PLAY", TEXT_CONGRATULATION = ["GOOD!", "GREAT!", "EXCELLENT!!!"], TEXT_SAVED = "SAVED", TEXT_HELP = "SWIPE TO KICK THE BALL", TEXT_SHARE_IMAGE = "200x200.jpg", TEXT_SHARE_TITLE = "Congratulations!", TEXT_SHARE_MSG1 = 
  "You collected <strong>", TEXT_SHARE_MSG2 = " points</strong>!<br><br>Share your score with your friends!", TEXT_SHARE_SHARE1 = "My score is ", TEXT_SHARE_SHARE2 = " points! Can you do better?";
  