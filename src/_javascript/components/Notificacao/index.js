const notificacao = {
  bind: () => {
    let $notification = document.querySelector("[data-notification]");
    let $notificationDelete = document.querySelectorAll(
      ".notification .delete"
    );

    if ($notification) {
      let $notificationbody = document.querySelector(".column .notification")
        .parentNode;

      setTimeout(function () {
        $notificationbody.parentNode.removeChild(notificationbody);
      }, 5000);
    }

    if ($notificationDelete) {
      (document.querySelectorAll(".notification .delete") || []).forEach(
        function ($delete) {
          let $notification = $delete.parentNode;

          $delete.addEventListener("click", function () {
            $notification.parentNode.removeChild($notification);
          });
        }
      );
    }
  },
};

export default notificacao;
