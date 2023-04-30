export default function verifyIfFollowing(data, userId) {
  if (data) {
    const ID = data.map((user) => user.followingId === userId);

    return new Promise(function (resolve) {
      for (const nun of ID) {
        if (nun === true) {
          return resolve(true);
        }
      }
    });
  }
}
