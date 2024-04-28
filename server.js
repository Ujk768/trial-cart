// sk_test_51PA77zSFBSOiJKoTbHViW2flkcgAypmULs1XmjGmHRWWaLKR4OpqQcwwsV7mVDRcgpXTIkBaDwiJgmwOEqGGzixx00fhtLBt0l

// coffee => price_1PA82XSFBSOiJKoTuUFGRc20
// tea => price_1PA83QSFBSOiJKoTowLGpfkJ
// hot chocolate => price_1PA83jSFBSOiJKoTFmwFxvS1

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51PA77zSFBSOiJKoTbHViW2flkcgAypmULs1XmjGmHRWWaLKR4OpqQcwwsV7mVDRcgpXTIkBaDwiJgmwOEqGGzixx00fhtLBt0l"
);

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity,
    });
  });
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

app.listen(4000, () => console.log("listening on 4000"));
