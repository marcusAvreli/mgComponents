// var Notification = function(container, options) {
//
//   var self = this;
//
//   // Element collection
//   self.container = $(container); // 'body' recommended
//   self.notification = $('<div class="pgn push-on-sidebar-open"></div>');
//   self.options = $.extend(true, {}, $.fn.pgNotification.defaults, options);
//
//   if (!self.container.find('.pgn-wrapper[data-position=' + this.options.position + ']').length) {
//     self.wrapper = $('<div class="pgn-wrapper" data-position="' + this.options.position + '"></div>');
//     self.container.append(self.wrapper);
//   } else {
//     self.wrapper = $('.pgn-wrapper[data-position=' + this.options.position + ']');
//   }
//
//   self.alert = $('<div class="alert"></div>');
//   self.alert.addClass('alert-' + self.options.type);
//
//   if (self.options.style == 'bar') {
//     new BarNotification();
//   } else if (self.options.style == 'flip') {
//     new FlipNotification();
//   } else if (self.options.style == 'circle') {
//     new CircleNotification();
//   } else if (self.options.style == 'simple') {
//     new SimpleNotification();
//   } else { // default = 'simple'
//     new SimpleNotification();
//   }
//
//   self.notification.append(self.alert);
//
//   function alignWrapperToContainer(){
//     var containerPosition = $(".header").get(0);
//     var containerHeight = $(containerPosition).height();
//
//     if(/top/.test(self.options.position)){
//       self.wrapper.css('top', containerHeight)
//     }
//   }
//
//   alignWrapperToContainer()
//   $(window).on('resize', alignWrapperToContainer)
//
//
//   // bind to Bootstrap closed event for alerts
//   self.alert.on('closed.bs.alert', function() {
//     self.notification.remove();
//     self.options.onClosed();
//     // refresh layout after removal
//   });
//
//   return this; // enable chaining
// };


export const simple = (notification, alert, options) => {
  notification.classList.add('pgn-simple');

  alert.innerHTML = "<div>" + options.message + "</div>";

  if (options.showClose) {
    alert.appendChild(close());
  }
}

export const flip = (notification, alert, options) => {
  notification.classList.add('pgn-flip');
  alert.innerHTML = "<span>" + options.message + "</span>";
  if (options.showClose) {
    alert.appendChild(close());
  }
}

export const circle = (notification, alert, options) => {

  notification.classList.add('pgn-circle');

  let title = "";
  let message = "";

  if(options.title)
    title = `<p><b>${options.title}</b></p>`;

  if(options.message)
    message = `<p>${options.message}</p>`;

  alert.innerHTML = `<wj-avatar>
      <img alt="Silhouette of a person's head" src="/assets/img/avatar.svg" />
    </wj-avatar>
    <div>
      ${title + message}
  </div>`;

  if (options.showClose) {
    alert.appendChild(close());
  }
}

export const bar = (notification, alert, options) => {
  notification.classList.add('pgn-bar');
  alert.classList.add("alert-" + options.type);
  alert.innerHTML = "<div>" + options.message + "</div>";

  if (options.showClose) {
    alert.appendChild(close());
  }
}

const close = () => {
  let icon = document.createElement("wj-icon");
  icon.setAttribute("name", "x");
  icon.setAttribute("slot", "icon-only");

  let close = document.createElement("wj-button");
  close.setAttribute("fill", "link");
  close.setAttribute("size", "small");
  close.classList.add("close");
  close.appendChild(icon);

  return close;
}