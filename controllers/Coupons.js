import {
  getDatabase,
  ref,
  onValue,
  child,
  push,
  update,
} from "firebase/database";

export const checkoutFunction = async (req, res, next) => {
  const userID = req.body.userId || "";
  const couponID = req.body.couponId || "";
  const db = getDatabase();
  const starCountRef = ref(db, `user/${couponID}`);

  let couponData;
  onValue(starCountRef, (snapshot) => {
    couponData = snapshot.val();
    const userIndex = couponData.users.indexOf(userID);
    if (userIndex > -1) {
      // fixed typo here
      couponData.users.splice(userIndex, 1);
    }
    const updates = {};
    updates["user/" + couponID] = couponData;
    console.log(update(ref(db), updates));
    res.send("completed");
  });
  res.err("error");
};

export const validateCoupon = async (req, res, next) => {
  const ref = db.ref("user/data");
  ref.on(
    "value",
    (snapshot) => {
      const getData = console.log(snapshot.val());
    },
    (errorObject) => {
      console.log("The read failed: " + errorObject.name);
    }
  );
};
