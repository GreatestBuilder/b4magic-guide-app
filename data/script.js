const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

const ipfsUrl = "http://109.123.238.216:5001/api/v0/add"; // Update to your IPFS URL

async function uploadImageToIPFS() {
  try {
    const form = new FormData();
    form.append("file", fs.createReadStream("./image.png"), {
      filename: "god_nft.png", // Use .png for PNG files
      contentType: "image/png", // Correct content type for PNG
    });

    const response = await axios.post(ipfsUrl, form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    console.log(`Image uploaded to IPFS. CID: ${response.data.Hash}`);
    return response.data.Hash;
  } catch (error) {
    console.error(`Error uploading to IPFS: ${error}`);
    return null;
  }
}

async function uploadToIPFS(jsonData, index) {
  try {
    const form = new FormData();
    form.append("file", Buffer.from(jsonData), {
      filename: `quote_${index}.json`, // Use .json for JSON files
      contentType: "application/json", // Correct content type for JSON
    });

    const response = await axios.post(ipfsUrl, form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    console.log(`Quote ${index} uploaded to IPFS. CID: ${response.data.Hash}`);
    return response.data.Hash;
  } catch (error) {
    console.error(`Failed to upload quote ${index} to IPFS`);
    console.error(`Error uploading to IPFS: ${error}`);
    return null;
  }
}

async function processCsv() {
  // Update this path to where your quotes.csv is located
  const csvFilePath = path.join(__dirname, "quotes.csv");
  const data = fs.readFileSync(csvFilePath, "utf-8");
  const rows = data.split("\n").slice(1); // Skip header

  const quoteIpfsMapping = {};

  // Upload image to IPFS
  const imageIpfsHash = await uploadImageToIPFS("image.png");

  for (const row of rows) {
    if (row.trim() === "") continue; // Skip empty lines

    const [index, quote] = row.split(",");
    const jsonData = JSON.stringify({
      name: "God NFT - Secret Book",
      description: "Nothing is random, everything is for granted",
      image: `https://ipfs.io/ipfs/${imageIpfsHash}`,
      attributes: [
        {
          trait_type: "Quote",
          value: quote,
        },
      ],
    }); // Convert the quote to JSON format
    const ipfsHash = await uploadToIPFS(jsonData, index);
    if (ipfsHash) {
      quoteIpfsMapping[index] = `https://ipfs.io/ipfs/${ipfsHash}`; // Update to match your IPFS gateway
    }
  }

  fs.writeFileSync(
    "quote_ipfs_mapping.json",
    JSON.stringify(quoteIpfsMapping, null, 2)
  );
}

processCsv();
