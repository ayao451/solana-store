// This API endpoint will let users POST data to add records and GET to retrieve
import products from "./products.json";
import fs from "fs";

async function post(req, res) {
  try {
    console.log("body is ", req.body)
    const { name, price, image_url, description, filename, hash, quantity } = req.body;

    // Create new product ID based on last product ID
    const maxID = products.reduce((max, product) => Math.max(max, product.id), 0);
    products.push({
      id: maxID + 1,
      name,
      price,
      image_url,
      description,
      filename,
      hash,
      quantity,
    });
    fs.writeFileSync("./pages/api/products.json", JSON.stringify(products, null, 2));
    res.status(200).send({ status: "ok" });
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "error adding product"});
    return;
  }
}

async function put(req, res){
  console.log("PUT IS HERE");
  try {
    const { itemID } = req.body;
    var index = products.findIndex(function(item, _){
      return item.id === itemID
    });
    console.log(`Products[index], ${index}, ${products[index]}, ${itemID}`);
    products[index].quantity = (products[index].quantity - 1).toString();
    fs.writeFileSync("./pages/api/products.json", JSON.stringify(products, null, 2));
    res.status(200).send({ status: "ok" });
  } catch (err) {
    res.status(400).send(err);
  }
}

export default async function handler(req, res) {
  console.log("req method", req.method);
  switch (req.method) {
    case "PUT":
      put(req, res);
      break;
    case "POST":
      await post(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
  }
}
