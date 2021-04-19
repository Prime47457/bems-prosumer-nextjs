import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_APP_FIREBASE_KEY,
  authDomain: process.env.NEXT_APP_FIREBASE_DOMAIN,
  projectId: process.env.NEXT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_APP_FIREBASE_SENDER_ID,
  appId: "1:1083389397572:web:1470b861f0c2209e9b8a11",
  measurementId: "G-JQXCS7B1JK",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();

export default function historicalAdminPriceData(date) {
  let status = "";
  db.ref("Market/admin")
    .child(date)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = Object.entries(snapshot.val()).map(([key, response]) => {
          let marketPrice = 0;
          if (response.clearing_method === "unikda") {
            const priceQuantity = response.results
              .filter((result) => {
                return (
                  result.buyerId.length > 12 && result.sellerId.length > 12
                );
              })
              .reduce(
                (acc, cur) => {
                  acc.sum = acc.sum + cur.price * cur.quantity;
                  acc.quantity = acc.quantity + cur.quantity;
                  return acc;
                },
                { sum: 0, quantity: 0 }
              );
            marketPrice = Number(
              Math.round(priceQuantity.sum / priceQuantity.quantity + "e2") +
                "e-2"
            );
          } else if (response.clearing_method === "diskda") {
            marketPrice = Number(
              Math.round(response.results[0].price + "e2") + "e-2"
            );
          } else {
            marketPrice = 1;
          }
          return { x: parseInt(key), y: marketPrice };
        });

        ApexCharts.exec("aggprice", "updateSeries", [{ data: data }]);
        status = "ok";
      } else {
        console.log("No data found");
        status = "No data found";
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return status;
}
