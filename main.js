const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const categoryRouter = require('./routes/categoryRouter');
const postRouter = require('./routes/postRouter');
const userRouter = require('./routes/userRouter');

const app = express();

// Middleware to parse JSON request bodies
const corsOptions = {
    origin: 'http://localhost:3000', // Set to your frontend origin
    credentials: true // Allow cookies to be sent
};
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json({ type: 'application/*+json' }))

app.use('/api/category', categoryRouter);
app.use('/api/post', postRouter);
app.use('/api/user', userRouter);


app.get('/', (req, res) =>{
    res.json('Welcome')
});

app.post(
  '/api/webhooks',
  // This is a generic method to parse the contents of the payload.
  // Depending on the framework, packages, and configuration, this may be
  // different or not required.
  bodyParser.raw({ type: 'application/json' }),

  async (req, res) => {
    const SIGNING_SECRET = process.env.SIGNING_SECRET

    if (!SIGNING_SECRET) {
      throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env')
    }

    // Create new Svix instance with secret
    const wh = new Webhook(SIGNING_SECRET)

    // Get headers and body
    const headers = req.headers
    const payload = req.body

    // Get Svix headers for verification
    const svix_id = headers['svix-id']
    const svix_timestamp = headers['svix-timestamp']
    const svix_signature = headers['svix-signature']

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return void res.status(400).json({
        success: false,
        message: 'Error: Missing svix headers',
      })
    }

    let evt

    // Attempt to verify the incoming webhook
    // If successful, the payload will be available from 'evt'
    // If verification fails, error out and return error code
    try {
      evt = wh.verify(payload, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      })
    } catch (err) {
      console.log('Error: Could not verify webhook:', err.message)
      return void res.status(400).json({
        success: false,
        message: err.message,
      })
    }

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data
    const eventType = evt.type
    console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
    console.log('Webhook payload:', evt.data)

    return void res.status(200).json({
      success: true,
      message: 'Webhook received',
    })
  },
)

app.get('/api/webhook', (req, res) =>{
  res.json("This is webhook")
})


app.listen(8000, () =>{
    console.log("Server is running on PORT 8000...");
})