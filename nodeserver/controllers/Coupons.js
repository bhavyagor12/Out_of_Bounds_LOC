import {
  getDatabase,
  ref,
  onValue,
  child,
  push,
  update,
} from "firebase/database";
import { Engine } from "json-rules-engine";

const getCouponData = async (couponID) => {
  const db = getDatabase();
  const starCountRef = ref(db, `user/${couponID}`);
  return new Promise((resolve, reject) => {
    onValue(
      starCountRef,
      (snapshot) => {
        const couponData = snapshot.val();
        resolve(couponData);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export const checkoutFunction = async (req, res, next) => {
  const userID = req.body.userId || "";
  const couponID = req.body.couponId || "";
  try {
    const couponData = await getCouponData(couponID);
    const userIndex = couponData.users.indexOf(userID);
    if (userIndex > -1) {
      couponData.users.splice(userIndex, 1);
      const updates = {};
      updates["user/" + couponID] = couponData;
      console.log(update(ref(db), updates));
      res.send("completed");
    } else {
      res.send("error");
    }
  } catch (e) {
    res.send("error");
  }
};

export const validateCoupon = async (req, res, next) => {
  const engine = new Engine();
  const rule = {
    conditions: {
      all: [
        {
          fact: "age",
          operator: "greaterThanInclusive",
          value: 30,
        },
        {
          fact: "country",
          operator: "equal",
          value: "US",
        },
      ],
    },
    event: {
      type: "adult-content-blocked",
    },
  };
  engine.addRule(rule);
  const facts = {
    age: 40,
    country: "IN",
  };
  engine
    .run(facts)
    .then((events) => {
      const results = events.results;
      results.map((r) => {
        console.log(r.result);
      });
      const failureResults = events.failureResults;
      failureResults.map((r) => {
        console.log(r.result);
      });
    })

    .catch((err) => console.log(err));
};

const getCouponArray = async (userID) => {
  const db = getDatabase();
  const starCountRef = ref(db, `user/${userID}/Coupons`);
  return new Promise((resolve, reject) => {
    onValue(
      starCountRef,
      (snapshot) => {
        const couponData = snapshot.val();
        resolve(couponData);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export const getCouponsForUser = async (req, res, next) => {
  const userID = req.body.userId || "";
  try {
    const getCouponArr = (await getCouponArray(userID)) || [];
    let couponIds = [];
    getCouponArr.map((a) => {
      couponIds.push(a);
    });
    res.send(couponIds);
  } catch (e) {
    res.send("err");
  }
};

export const getCouponUI = async (req, res, next) => {
  const couponId = req.body.couponId || "";
  try {
    const couponData = await getCouponData(couponId);
    res.send(couponData);
  } catch (e) {
    res.send(e);
  }
};
