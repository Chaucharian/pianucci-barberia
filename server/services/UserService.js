// TODO MOVE EVERY LOGIC TO A SERVICE
class User {
  constructor(firebaseDB) {
    this.firebaseDB = firebaseDB;
  }

  async getUserData(userId) {
    const usersRef = this.firebaseDB.ref('/users');

    const snapshot = await usersRef.once('value');
    snapshot.forEach((user) => {
      if (user.val().id === userId) {
        return user.val();
      }
    });
    throw 'User not found';
  }
}

module.exports = User;
