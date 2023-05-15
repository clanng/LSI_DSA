(()=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(t,o){for(var r=0;r<o.length;r++){var n=o[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,i=function(t,o){if("object"!==e(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==e(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===e(i)?i:String(i)),n)}var i}function o(e,t){return o=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},o(e,t)}function r(e){return r=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},r(e)}const n=function(n){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&o(e,t)}(l,Phaser.Scene);var i,s,a,c,u=(a=l,c=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var t,o=r(a);if(c){var n=r(this).constructor;t=Reflect.construct(o,arguments,n)}else t=o.apply(this,arguments);return function(t,o){if(o&&("object"===e(o)||"function"==typeof o))return o;if(void 0!==o)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(t)}(this,t)});function l(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),u.call(this,{key:"StartScene"})}return i=l,(s=[{key:"preload",value:function(){this.load.image("startButton","assets/startButton.png"),this.load.image("startImage","assets/startImage.png"),this.load.audio("startMusic","assets/startMusic.m4a")}},{key:"create",value:function(){var e=this;this.add.image(400,300,"startImage"),this.add.image(400,480,"startButton").setInteractive().setScale(.5).on("pointerdown",(function(){e.sound.stopAll(),e.scene.start("GameScene")}));var t=this.add.text(-200,550,"a Lanng Space Industries production",{fontSize:"32px",fill:"#FFF"});this.tweens.add({targets:t,x:1e3,duration:5e3,ease:"Power1",repeat:-1,yoyo:!0,delay:1e3}),this.sound.add("startMusic",{loop:!0,volume:.5}).play()}}])&&t(i.prototype,s),Object.defineProperty(i,"prototype",{writable:!1}),l}();function i(e){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(e)}function s(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,p(r.key),r)}}function a(e,t){return a=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},a(e,t)}function c(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function u(e){return u=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},u(e)}function l(e,t,o){return(t=p(t))in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function p(e){var t=function(e,t){if("object"!==i(e)||null===e)return e;var o=e[Symbol.toPrimitive];if(void 0!==o){var r=o.call(e,"string");if("object"!==i(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===i(t)?t:String(t)}const f=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&a(e,t)}(f,Phaser.Scene);var t,o,r,n,p=(r=f,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=u(r);if(n){var o=u(this).constructor;e=Reflect.construct(t,arguments,o)}else e=t.apply(this,arguments);return function(e,t){if(t&&("object"===i(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return c(e)}(this,e)});function f(){var e;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,f),l(c(e=p.call(this,{key:"GameScene"})),"createAsteroid",(function(t){var o=e.asteroids.create(Phaser.Math.Between(0,800),Phaser.Math.Between(-200,0),t.key);return o.setVelocity(Phaser.Math.Between(-t.speed,t.speed),Phaser.Math.Between(t.speed,1.5*t.speed)),o.setScale(t.scale),o.setData("type",t.key),o.setData("scoreValue",t.points),o})),l(c(e),"generateAsteroids",(function(){for(var t=0,o=[{key:"largeAsteroid",points:5,speed:50,scale:.6,count:Math.round(.2*e.asteroidCount)},{key:"mediumAsteroid",points:10,speed:75,scale:.4,count:Math.round(.3*e.asteroidCount)},{key:"smallAsteroid",points:20,speed:100,scale:.2,count:Math.round(.5*e.asteroidCount)}];t<o.length;t++)for(var r=o[t],n=0;n<r.count;n++)e.createAsteroid(r);e.physics.add.collider(e.spaceship,e.asteroids,e.hitAsteroid,null,c(e)),e.physics.add.collider(e.rockets,e.asteroids,e.destroyAsteroid,null,c(e))})),l(c(e),"hitAsteroid",(function(t,o){e.lives--,e.livesText.setText("Lives: "+e.lives),e.spaceship.x=400,e.spaceship.y=300,e.spaceship.setVelocity(0,0),o.destroy(),e.explosionSound.play(),e.lives<=0&&(e.music.stop(),e.registry.set("score",e.score),e.asteroidGenerator.destroy(),e.scene.start("GameOverScene"))})),l(c(e),"destroyAsteroid",(function(t,o){t.destroy(),o.destroy(),e.explosionSound.play();var r=o.getData("scoreValue");console.log(r),r&&(e.score+=r,e.scoreText.setText("Score: "+e.score),e.score%100==0&&(e.asteroidCount++,e.generateAsteroids()))})),e.spaceship=null,e.cursors=null,e.asteroids=null,e.rockets=null,e.spacebar=null,e.score=0,e.scoreText=null,e.lives=3,e.livesText=null,e.music=null,e.explosionSound=null,e}return t=f,(o=[{key:"preload",value:function(){this.load.image("spaceship","assets/spaceship.png"),this.load.image("asteroid","assets/asteroid.png"),this.load.image("rocket","assets/rocket.png"),this.load.audio("backgroundMusic","assets/SpaceTripByErik.m4a"),this.load.image("background","assets/background.png"),this.load.audio("explosionSound","assets/explosionSound.ogg"),this.load.audio("shootSound","assets/shootSound.ogg"),this.load.image("largeAsteroid","assets/largeAsteroid.png"),this.load.image("mediumAsteroid","assets/mediumAsteroid.png"),this.load.image("smallAsteroid","assets/smallAsteroid.png")}},{key:"create",value:function(){var e=this;this.bg=this.add.tileSprite(400,300,800,600,"background"),this.spaceship=this.physics.add.sprite(400,300,"spaceship").setScale(.3),this.cursors=this.input.keyboard.createCursorKeys(),this.rockets=this.physics.add.group(),this.spacebar=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),this.spaceship.setCollideWorldBounds(!0),this.shootSound=this.sound.add("shootSound"),this.asteroids=this.physics.add.group(),this.asteroidCount=10,this.generateAsteroids(),this.spacebar=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),this.music=this.sound.add("backgroundMusic",{volume:.5,loop:!0}),this.music.play(),this.explosionSound=this.sound.add("explosionSound"),this.score=0,this.scoreText=this.add.text(16,16,"Score: 0",{fontSize:"32px",fill:"#FFF"}),this.lives=3,this.livesText=this.add.text(16,56,"Lives: 3",{fontSize:"32px",fill:"#FFF"}),this.asteroidGenerator=this.time.addEvent({delay:3e3,callback:this.generateAsteroids,callbackScope:this,loop:!0}),this.input.on("pointermove",(function(t){e.tweens.add({targets:e.spaceship,x:Phaser.Math.Clamp(t.x,0,e.sys.game.config.width),y:Phaser.Math.Clamp(t.y,0,e.sys.game.config.height),duration:200,ease:"Power1"})})),this.input.on("pointermove",(function(t){e.spaceship.x=Phaser.Math.Clamp(t.x,0,e.sys.game.config.width),e.spaceship.y=Phaser.Math.Clamp(t.y,0,e.sys.game.config.height)})),this.input.on("pointerdown",(function(){e.shootRocket()}))}},{key:"shootRocket",value:function(){this.rockets.create(this.spaceship.x,this.spaceship.y,"rocket").setScale(.3).setVelocityY(-200),this.shootSound.play()}},{key:"update",value:function(e,t){this.cursors.left.isDown?this.spaceship.setVelocityX(-200):this.cursors.right.isDown?this.spaceship.setVelocityX(200):this.spaceship.setVelocityX(0),this.cursors.up.isDown?this.spaceship.setVelocityY(-200):this.cursors.down.isDown?this.spaceship.setVelocityY(200):this.spaceship.setVelocityY(0),this.bg.tilePositionY-=2,Phaser.Input.Keyboard.JustDown(this.spacebar)&&this.shootRocket(t)}}])&&s(t.prototype,o),Object.defineProperty(t,"prototype",{writable:!1}),f}();function d(e){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d(e)}function h(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,n=function(e,t){if("object"!==d(e)||null===e)return e;var o=e[Symbol.toPrimitive];if(void 0!==o){var r=o.call(e,"string");if("object"!==d(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===d(n)?n:String(n)),r)}var n}function y(e,t){return y=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},y(e,t)}function b(e){return b=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},b(e)}const m=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&y(e,t)}(s,Phaser.Scene);var t,o,r,n,i=(r=s,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=b(r);if(n){var o=b(this).constructor;e=Reflect.construct(t,arguments,o)}else e=t.apply(this,arguments);return function(e,t){if(t&&("object"===d(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(this,e)});function s(){var e;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s),(e=i.call(this,{key:"GameOverScene"})).music=null,e}return t=s,(o=[{key:"preload",value:function(){this.load.image("retryButton","assets/retryButton.png"),this.load.image("gameOverBackground","assets/gameOverBackground.png"),this.load.audio("gameOverMusic","assets/gameOverMusic.m4a")}},{key:"create",value:function(){var e=this;this.add.image(400,300,"gameOverBackground");var t=this.add.text(-200,200,"Game Over!",{fontSize:"64px",fill:"#FFF"});this.tweens.add({targets:t,x:800,duration:5e3,ease:"Power1",repeat:-1});var o=this.registry.get("score");this.add.text(400,280,"Game Score: ".concat(o),{fontSize:"32px",fill:"#00FF00"}).setOrigin(.5),this.add.image(400,400,"retryButton").setInteractive().setScale(.6).on("pointerdown",(function(){e.music&&e.music.stop(),e.scene.start("StartScene")})),this.music=this.sound.add("gameOverMusic",{volume:.5,loop:!0}),this.music.play()}}])&&h(t.prototype,o),Object.defineProperty(t,"prototype",{writable:!1}),s}();var v={type:Phaser.AUTO,width:800,height:600,physics:{default:"arcade",arcade:{gravity:{y:0}}},scene:[n,f,m]};new Phaser.Game(v)})();