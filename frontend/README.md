# Sendgrid Dynamic Blocks

Build re-usable component blocks, and update multiple Sendgrid templates at once!

![Application screenshot](https://github.com/evanTheTerribleWarrior/sendgrid-dynamic-blocks/assets/54394422/208d02af-5751-4d16-bcbd-fedb0fe98532)

## Key features
 * Build Editor to easily create/view/save your dynamic blocks
 * Save your collection of blocks and fully manage the collection structure
 * Ability to import existing blocks created on Sendgrid Editor
 * Easy to use interface to update multiple Sendgrid templates with your dynamic block
 * Local storage to persist your collections on the browser
 * Twilio Functions to call the Sendgrid APIs and therefore avoid exposing SG API Keys within the app


## Pre-requisites
1. Install the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart#install-twilio-cli)
2. Install the [serverless toolkit](https://www.twilio.com/docs/labs/serverless-toolkit/getting-started)

## Setup

3. Clone the repository and `cd` into it:
```shell
git clone https://github.com/evanTheTerribleWarrior/sendgrid-dynamic-blocks.git

cd sendgrid-dynamic-blocks
```

4. Create .env file and set the USERNAME, PASSWORD, JWT_SECRET. Ensure they are not easy to guess:
```shell
cp .env.example .env
```

5. Using Twilio CLI, deploy code to your Twilio account:
```shell
twilio serverless:deploy
# View your app at https://[my-runtime-url].twil.io/index.html
```

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


