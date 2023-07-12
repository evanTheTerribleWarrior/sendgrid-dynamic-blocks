# Sendgrid Dynamic Blocks

Build re-usable component blocks, and update multiple Sendgrid templates at once!

![Application screenshot](https://github.com/evanTheTerribleWarrior/sendgrid-dynamic-blocks/assets/54394422/d6a99c54-0660-414c-a282-67f73698083a)

## Key features
 * Create blocks based on Sendgrid drag-and-drop compatible code and components
 * Save your collection of blocks and fully manage the collection structure
 * Ability to import existing blocks created on Sendgrid Design Editor
 * Export/Import your collections
 * Easy to use interface to update multiple Sendgrid templates with your dynamic block
 * Upload your zip file with the HTML/CSS/IMG structure and automatically create a template out of it
 * Local storage to persist your collections on the browser
 * Twilio Functions middleware to call the Sendgrid APIs and therefore avoid exposing SG API Keys within the app


## Pre-requisites
1. Install the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart#install-twilio-cli)
2. Install the [serverless toolkit](https://www.twilio.com/docs/labs/serverless-toolkit/getting-started)
3. Create a [Sendgrid API Key](https://docs.sendgrid.com/ui/account-and-settings/api-keys). You don't need to give it full permissions. `Design Library` `Mail Send` and `Template Engine` should be enough

## Setup - Remote
- Clone the repository and `cd` into it:
```shell
git clone https://github.com/evanTheTerribleWarrior/sendgrid-dynamic-blocks.git

cd sendgrid-dynamic-blocks
```

- Create .env file and set the SG_API_KEY env variable with the SG Key you created:
```shell
cp .env.example .env
```

- Run the `setup-remote.sh` script (if you use other shell, use the equivalent command):
```shell
zsh setup-remote.sh
# View your app at https://[my-runtime-url].twil.io/index.html
```

## Setup - Local
-  Go to `variables.js`
- Search for `BASE_URL`
- Replace the following values so they look like this
```shell
PROTOCOL: 'http://',
BASE_URL: 'localhost:3002/',
``` 
- Run the `setup-local.sh` script (if you use other shell, use the equivalent command):
```shell
zsh setup-local.sh
```
Note: The script will send processes to the background. If you prefer to use them individually you can create multiple tabs in your terminal / split panes / use `screen` or any other way, and just run the commands one by one instead of the script (without the &)

## Example

1. 

2. 

3. 

4. 

5. 

## Test It!


## Considerations

- This is not an official Twilio Sendgrid repository.
- As this is a personal work, updates will be published at non-standard intervals. You are of course free to take the code and shape as you wish

## TODO


