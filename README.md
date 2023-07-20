# Sendgrid Dynamic Blocks

Build re-usable component blocks, and update multiple Sendgrid templates at once!

![Application screenshot](https://github.com/evanTheTerribleWarrior/sendgrid-dynamic-blocks/assets/54394422/efec0910-a5b3-4ab1-ac0e-4d1a1f5e1775)

## Key features
 * Create blocks based on Sendgrid drag-and-drop compatible code and components
 * Save your collection of blocks and fully manage the collection structure
 * Ability to import existing blocks created on Sendgrid Design Editor
 * Export/Import your collections
 * Easy to use interface to update multiple Sendgrid templates with your dynamic block
 * Upload your zip file with the HTML/CSS/IMG structure and automatically create a template out of it
 * Local storage to persist your collections on the browser
 * Twilio Functions middleware to call the Sendgrid APIs and therefore avoid exposing SG API Keys within the app
 * Authentication via JWT tokens and httpOnly cookies
 * (Optional) Segment CDP integration to send Web Vitals - or add your own metrics!


## Pre-requisites
1. Install the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart#install-twilio-cli)
2. Install the [serverless toolkit](https://www.twilio.com/docs/labs/serverless-toolkit/getting-started)
3. Create a [Sendgrid API Key](https://docs.sendgrid.com/ui/account-and-settings/api-keys). You don't need to give it full permissions. `Template Engine` should be enough
4. (Optional) Create a [Segment CDP Source](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/quickstart) If you want to send data like Web Vitals to Segment CDP, create a Javascript Source - we will use the Write Key below

## Setup
- Clone the repository and `cd` into it:
```shell
git clone https://github.com/evanTheTerribleWarrior/sendgrid-dynamic-blocks.git
cd sendgrid-dynamic-blocks
```

- Create .env file and set the SG_API_KEY env variable with the SG Key you created. Also add USERNAME, PASSWORD, JWT_SECRET that are used for authentication. Make them hard to guess if you deploy this!
Optionally, if you want to send Web Vitals to Segment CDP, add your Segment JS Write Key
```shell
cp .env.example .env
```

### Option 1: Build remote (Twilio account)
- Run the `setup-remote.sh` script (if you use other shell, use the equivalent command):
```shell
zsh setup-remote.sh
# View your app at https://[my-runtime-url].twil.io/index.html
```

### Option 2: Build local - same ports for backend and frontend
- Run the `setup-local-same-port.sh` script (if you use other shell, use the equivalent command):
```shell
zsh setup-local-same-port.sh
# View your app at http://localhost:3002/index.html (or set the port you want)
```

### Option 3: Run local - different ports for backend and frontend (easier for changing/testing code)
- Run the `setup-local-diff-port.sh` script (if you use other shell, use the equivalent command):
```shell
zsh setup-local-diff-port.sh
```
This will effectively use `npm run start` to start the frontend on the standard 3000 port and have it runninng in the background.
But in `package.json` we added `proxy: http://localhost:3002/` so that all requests are proxied to the same
port as the functions backend. This is important to be able to use the SameSite cookie that we set for the
JWT token

## Blog Post
The below blog post shows the app and the different sections in place:


## Considerations

- This is not an official Twilio Sendgrid repository.
- As this is a personal work, updates will be published at non-standard intervals. You are of course free to take the code and shape as you wish

## Limitations
- Currently, there is no signup / setting multiple users with a proper database. The logic is to start fast and simple only via your Twilio Account. A proper user login/signup management will need an external backend
- Because of the above, data is saved locally on the browser. Users can export their work and import it easily. But a backend integration would also require separation of each user's work to avoid conflicts

## TODO - Future
- Overall: Cleanup unused/redundant code 
- Overall: Review fail conditions / fail gracefully
- Overall: Comments!
- Update templates: How to exclude templates not valid for drag and drop editor
- Zip upload: When uploading images, utilise better promises or even exponential backoff?
- Block creation: Ability to move components up or down in the hierarchy?
- Block creation: When importing block, dropdowns are reset currently
- Block creation: validate the created block structure
- Settings: 2FA?
- Settings: More segment integration
- Security: Secondary token for navigation?
- Security: CSRF?
- Security: Zip check and rejection?

