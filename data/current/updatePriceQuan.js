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

export default function updateBuyPriceQuan(uid) {
  const date = new Date()
    .toLocaleString("en-CA", { timeZone: "Asia/Bangkok" })
    .substring(0, 10);
  db.ref("Prosumer")
    .child(uid)
    .child(date)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        const buyPriceData = Object.entries(snapshot.val()).map(
          ([key, response]) => {
            const buyPrice = response.bought.reduce(
              (acc, cur) => {
                acc.sum += cur.price * cur.quantity;
                acc.quantity += cur.quantity;
                return acc;
              },
              { sum: 0, quantity: 0 }
            );
            const avgBuyPrice = Number(
              Math.round(buyPrice.sum / buyPrice.quantity + "e2") + "e-2"
            );
            return { x: parseInt(key), y: avgBuyPrice };
          }
        );
        const buyQuanData = Object.entries(snapshot.val()).map(
          ([key, response]) => {
            const buyQuantity = response.bought.reduce((acc, cur) => {
              return acc + cur.quantity;
            }, 0);
            return { x: parseInt(key), y: buyQuantity };
          }
        );
        ApexCharts.exec("buyprice", "updateOptions", {
          series: [
            {
              name: "Avg price bought(baht)",
              data: buyPriceData,
            },
            {
              name: "Quantity bought(kW)",
              data: buyQuanData,
            },
          ],
        });
      } else {
        console.log("No data found");
      }
    });
}

export function updateSellPriceQuan(uid) {
  const date = new Date()
    .toLocaleString("en-CA", { timeZone: "Asia/Bangkok" })
    .substring(0, 10);
  db.ref("Prosumer")
    .child(uid)
    .child(date)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        const sellPriceData = Object.entries(snapshot.val()).map(
          ([key, response]) => {
            const sellPrice = response.sold.reduce(
              (acc, cur) => {
                acc.sum += cur.price * cur.quantity;
                acc.quantity += cur.quantity;
                return acc;
              },
              { sum: 0, quantity: 0 }
            );
            const avgSellPrice = Number(
              Math.round(sellPrice.sum / sellPrice.quantity + "e2") + "e-2"
            );
            return { x: parseInt(key), y: avgSellPrice };
          }
        );
        const sellQuanData = Object.entries(snapshot.val()).map(
          ([key, response]) => {
            const sellQuantity = response.sold.reduce((acc, cur) => {
              return acc + cur.quantity;
            }, 0);
            return { x: parseInt(key), y: sellQuantity };
          }
        );
        ApexCharts.exec("sellprice", "updateOptions", {
          series: [
            {
              name: "Avg price sold(baht)",
              data: sellPriceData,
            },
            {
              name: "Quantity sold(kW)",
              data: sellQuanData,
            },
          ],
        });
      } else {
        console.log("No data found");
      }
    });
}

export function updateBarRankingPrice(uid) {
  const date = new Date()
    .toLocaleString("en-CA", { timeZone: "Asia/Bangkok" })
    .substring(0, 10);
  db.ref("Prosumer")
    .child(uid)
    .child(date)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        const sellPriceData = Object.entries(snapshot.val())
          .map(([key, response]) => {
            const sellPrice = response.sold.reduce(
              (acc, cur) => {
                acc.sum += cur.price * cur.quantity;
                acc.quantity += cur.quantity;
                return acc;
              },
              { sum: 0, quantity: 0 }
            );
            const avgSellPrice = Number(
              Math.round(sellPrice.sum / sellPrice.quantity + "e2") + "e-2"
            );
            return { x: parseInt(key), y: avgSellPrice };
          })
          .sort((a, b) => {
            parseFloat(a.y) - parseFloat(b.y);
          });

        const buyPriceData = Object.entries(snapshot.val())
          .map(([key, response]) => {
            const buyPrice = response.bought.reduce(
              (acc, cur) => {
                acc.sum += cur.price * cur.quantity;
                acc.quantity += cur.quantity;
                return acc;
              },
              { sum: 0, quantity: 0 }
            );
            const avgBuyPrice = Number(
              Math.round(buyPrice.sum / buyPrice.quantity + "e2") + "e-2"
            );
            return { x: parseInt(key), y: avgBuyPrice };
          })
          .sort((a, b) => {
            parseFloat(a.y) - parseFloat(b.y);
          });

        ApexCharts.exec("barranking", "updateOptions", {
          series: [
            {
              name: "Avg price bought(baht)",
              data: buyPriceData,
            },
            // {
            //   name: "Avg price sold(kW)",
            //   data: sellPriceData,
            // },
          ],
        });
      } else {
        console.log("No data found");
      }
    });
}

export function updateAggPriceQuan() {
  const date = new Date()
    .toLocaleString("en-CA", { timeZone: "Asia/Bangkok" })
    .substring(0, 10);
  db.ref("Market/admin")
    .child(date)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        const avgPrices = Object.entries(snapshot.val()).map(
          ([key, response]) => {
            let marketPrice = 0;
            // change back laew
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
              const priceQuantity = response.results
                .filter((result) => {
                  return (
                    result.buyerId === "cu_primary" ||
                    result.sellerId === "cu_primary"
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
            }
            return { x: parseInt(key), y: marketPrice };
          }
        );

        const totalQuantities = Object.entries(snapshot.val()).map(
          ([key, response]) => {
            const quantity = response.results.reduce((acc, cur) => {
              return acc + cur.quantity;
            }, 0);
            return { x: parseInt(key), y: quantity };
          }
        );

        ApexCharts.exec("aggprice", "updateSeries", [
          {
            data: avgPrices,
          },
        ]);
        ApexCharts.exec("aggquantity", "updateSeries", [
          {
            data: totalQuantities,
          },
        ]);
      } else {
        console.log("No data found");
      }
    });
}
