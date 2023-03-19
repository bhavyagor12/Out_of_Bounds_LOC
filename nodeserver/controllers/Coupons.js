import {
  getDatabase,
  ref,
  onValue,
  child,
  push,
  update,
} from "firebase/database";
import { Engine } from "json-rules-engine";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const getCouponData = async (couponID) => {
  const firebaseConfig = {
    apiKey: "AIzaSyDfsrrs6RNQVJ9qaeOtGn837o4XToUWfP0",
    authDomain: "coupon-generator-a00eb.firebaseapp.com",
    databaseURL: "https://coupon-generator-a00eb-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "coupon-generator-a00eb",
    storageBucket: "coupon-generator-a00eb.appspot.com",
    messagingSenderId: "65962690018",
    appId: "1:65962690018:web:294b4ae789709339e0a5bb"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getDatabase();
  const starCountRef = ref(db, "/org/jinishshah08/Coupons/"+couponID);
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

const getCouponUsers = async (couponID) => {
  const firebaseConfig = {
    apiKey: "AIzaSyDfsrrs6RNQVJ9qaeOtGn837o4XToUWfP0",
    authDomain: "coupon-generator-a00eb.firebaseapp.com",
    databaseURL: "https://coupon-generator-a00eb-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "coupon-generator-a00eb",
    storageBucket: "coupon-generator-a00eb.appspot.com",
    messagingSenderId: "65962690018",
    appId: "1:65962690018:web:294b4ae789709339e0a5bb"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getDatabase();
  const starCountRef = ref(db, "/org/jinishshah08/Coupons/"+couponID+"/userIdList");
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
    const couponData = await getCouponUsers(couponID);
    const userIndex = couponData.indexOf(userID);
    if (userIndex > -1) {
      const db = getDatabase();
      couponData.splice(userIndex, 1);
      const updates = {};
      updates['/org/jinishshah08/Coupons/'+couponID+'/userIdList/'] = couponData;
      //updates[db, "/org/jinishshah08/users/"+userID+"/Coupons"];
      update(ref(db), updates);
      res.send("completed");
    } else {
      res.send("error1");
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
    country: "US",
  };
  engine
    .run(facts)
    .then((events) => {
      const results = events.results;
      results.map((r) => {
        console.log(r.result);
        res.send(r.result);
      });
      const failureResults = events.failureResults;
      failureResults.map((r) => {
        console.log(r.result);
        res.send(r.result);
      });
    })

    .catch((err) => console.log(err));
};

const getCouponArray = async (userID) => {
  const firebaseConfig = {
    apiKey: "AIzaSyDfsrrs6RNQVJ9qaeOtGn837o4XToUWfP0",
    authDomain: "coupon-generator-a00eb.firebaseapp.com",
    databaseURL: "https://coupon-generator-a00eb-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "coupon-generator-a00eb",
    storageBucket: "coupon-generator-a00eb.appspot.com",
    messagingSenderId: "65962690018",
    appId: "1:65962690018:web:294b4ae789709339e0a5bb"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getDatabase();
  const starCountRef = ref(db, "/org/jinishshah08/users/"+userID+"/Coupons");
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
    res.send(e);
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

export const getCouponsRules = async (req, res, next) => {
  const couponId = req.body.couponId || "";
  try {
    const couponData = await getCouponData(couponId);
    res.send(couponData.data.rule);
  } catch (e) {
    res.send(e);
  }
};

export const getCouponsDisc = async (req, res, next) => {
  const couponId = req.body.couponId || "";
  try {
    const couponData = await getCouponData(couponId);
    res.send(couponData.data.discountValue);
  } catch (e) {
    res.send(e);
  }
};

export const validateCoupon2 = async (req, res, next) => {
  const engine = new Engine();
  const rule = JSON.parse(req.body.rules) || "";
  const age = req.body.age || 0;
  const country = req.body.country || "";
  const cartItems = req.body.cartItems || 0;
  const cartValue = req.body.cartValue || 0;
  //console.log(rule);
  engine.addRule(rule);
  const facts = {
    age: age,
    country: country,
    cartValue: cartValue,
    cartItems: cartItems,
  };
  engine
    .run(facts)
    .then((events) => {
      const results = events.results;
      results.map((r) => {
        console.log(r.result);
        res.send(r.result);
      });
      const failureResults = events.failureResults;
      failureResults.map((r) => {
        console.log(r.result);
        res.send(r.result);
      });
    })

    .catch((err) => console.log(err));
};
