const { Firestore } = require("@google-cloud/firestore");
require("dotenv").config();

const db = new Firestore({ projectId: process.env.PROJECT_ID });

// fungsi untuk menyimpan data orediksi ke firestore
async function storeData(id, data) {
  const predictCollection = db.collection("predictions");

  return predictCollection.doc(id).set(data);
}

// Fungsi untuk mengambil semua data prediksi ke firestore
async function getAllData() {
  const predictCollection = db.collection("predictions");

  const snapshot = await predictCollection.get();

  if (snapshot.empty) {
    return [];
  }

  return snapshot.docs.map((doc) => ({ id: doc.id, history: doc.data() }));
}

module.exports = { storeData, getAllData };
