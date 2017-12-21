'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/todoListController');

  app.route('/member')
    .post(todoList.add_member)
    .get(todoList.get_list_member);

  app.route('/profil')
    .post(todoList.add_profil);

  app.route('/profil/:pseudo')
    .get(todoList.get_profil);

  app.route('/authentification')
    .post(todoList.sign_in);

  app.route('/image')
    .post(todoList.add_image);

  /*app.route('/member/:memberId')
    .get(todoList.get_member)
    .delete(todoList.delete_member)
    .put(todoList.update_member);*/

  app.route('/news')
    .get(todoList.list_news)
    .post(todoList.loginRequired, todoList.add_news);

  app.route('/news/:id')
    .get(todoList.get_one_news);

  app.route('/evenement')
    .post(todoList.add_evenement)
    .get(todoList.get_evenement);

  app.route('/messagerie')
    .post(todoList.add_message);

  app.route('/messagerie/:idReceiver')
    .get(todoList.get_user_message);

  app.route('/messagerie/idMessage/:idMessage')
    .get(todoList.get_one_message);

  app.route('/defi')
    .get(todoList.get_list_defi)
    .post(todoList.add_defi);
};
