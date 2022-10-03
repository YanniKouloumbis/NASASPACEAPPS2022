const functions = require("firebase-functions");
const admin = require("firebase-admin")
admin.initializeApp()
const db = admin.firestore()
const auth = admin.auth()
const fetch = require('node-fetch');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

//when a new job is created in the jobs collection, send it off to an api to be processed
exports.processJob = functions.firestore.document('jobs/{jobId}').onCreate(async (snap, context) => {
    const data = snap.data();
    const link = "https://funny-nights-jog-34-142-216-60.loca.lt/"
    const response = await fetch(`${link}jobs`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: data.prompt,
            href: data.href,
            mask: data.mask,
            id: context.params.jobId,
            inProgress: data.inProgress,
        })
    })
    const result = await response.json();
    console.log(result);
    //end of function
    return result;
})