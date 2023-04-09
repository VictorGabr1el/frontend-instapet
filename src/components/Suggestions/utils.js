export default function verifyIfFollowing(data, userId) {
  const ID = data.map((f) => f.followingId === userId);

  return new Promise(function (resolve) {
    for (const nun of ID) {
      if (nun === true) {
        return resolve(true);
      }
    }
  });
}
